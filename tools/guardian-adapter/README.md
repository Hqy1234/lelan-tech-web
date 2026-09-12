# Guardian Analysis Adapter

Server-side bridge between the LELAN official website and the published Dify
Workflow. It exists because the website is a **static export** (`output: "export"`),
so a Next.js Route Handler would not exist in production — and a Dify `blocking`
call must be made server-side, where the API key can stay secret.

```
Browser → this Adapter → Dify → normalize → GuardianAnalysisResult → Browser
```

The browser never contacts `api.dify.ai` and never sees the API key.

---

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | `{ ok, difyConfigured, timeoutMs }` — no secrets |
| `POST` | `/guardian/analyze` | `{ analysis: GuardianAnalysisResult }` |

### Request body (what the website sends)

Structured data — **real arrays**, real numbers. The Adapter stringifies the
`*_json` fields itself, so a compromised client cannot smuggle arbitrary strings
into the workflow.

```json
{
  "identity": { "age": 28, "gender": "male", "city": "杭州" },
  "stage":    { "id": "li-adolescent", "name": "离 · 青少年" },
  "scenario": { "id": "general", "name": "综合生活" },
  "completedTaskIds": ["general-t1", "general-t2"],
  "dimensionTags": {
    "wealth": ["budget"], "health": ["annual-checkup-pending"],
    "travel": [], "food": [], "housing": []
  },
  "progressCompleted": 2,
  "progressTotal": 5
}
```

### Response

```json
{ "analysis": { "summary": "…", "attentionItems": [], "dimensionNotes": { "wealth": "…", "health": "…", "travel": "…", "food": "…", "housing": "…" }, "disclaimer": "…" } }
```

This is exactly the existing `GuardianAnalysisResult` contract from
`content/guardian.ts`. The Dify field names (`summary2`, `attention2_items`,
`dimension_notes2`, `disclaimer2`) exist ONLY inside `src/normalize.js` and never
reach the UI.

### Errors

Every failure collapses to a safe code + safe message. No stack traces, no
upstream text, no `Authorization`, no key.

| code | HTTP | meaning |
|---|---|---|
| `INVALID_INPUT` | 400 | payload failed validation |
| `ANALYSIS_TIMEOUT` | 504 | overall budget exhausted |
| `ANALYSIS_UNAVAILABLE` | 503 | auth rejected / 5xx / workflow `status=failed` / transport failure |
| `INVALID_ANALYSIS_RESPONSE` | 502 | missing or malformed outputs, or forbidden content |
| `SERVER_ERROR` | 500 | unexpected internal failure |

```json
{ "error": { "code": "ANALYSIS_TIMEOUT", "message": "智能分析暂时超时，请稍后重试。" } }
```

---

## Environment

| variable | required | default | notes |
|---|---|---|---|
| `DIFY_API_KEY` | yes | — | **secret**, server-side only |
| `DIFY_API_BASE_URL` | yes | `https://api.dify.ai/v1` | |
| `PORT` | no | `8787` | |
| `ALLOWED_ORIGINS` | **yes in production** | *(none)* | comma-separated site origins |
| `DIFY_TIMEOUT_MS` | no | `40000` | **total** budget across attempts |

Copy `.env.example` to `.env` and fill in the key. `.env*` is gitignored.

### `ALLOWED_ORIGINS` is mandatory in production

When `NODE_ENV=production` and `ALLOWED_ORIGINS` is missing or empty, the service
**refuses to start** (exit 1) with a configuration error containing no secrets.
There is no safe default: allowing any origin — or echoing whatever `Origin`
arrives — would let any website drive this service with our Dify credential.

```bash
ALLOWED_ORIGINS=https://www.example.com,https://example.com
```

In development the variable may be omitted; an omitted list simply grants no
browser origin (server-to-server calls and `/health` still work).

`Access-Control-Allow-Origin` is emitted **only** for an allow-listed origin.
There is no `*` wildcard and no blind echo. The granted surface is minimal:
methods `POST, GET, OPTIONS` (GET is `/health` only) and the single header
`Content-Type`.

### Timeout budget

| layer | value | notes |
|---|---|---|
| server total budget (`DIFY_TIMEOUT_MS`) | **40 s** | shared across attempts, not per attempt |
| retry | **2 attempts max** | only when the workflow succeeds with empty text |
| worst case | **40 s** | bounded by the shared budget |
| client timeout (site) | **50 s** | deliberately > server budget |

The client timeout must stay above the server budget so the Adapter's structured
timeout error wins the race instead of the browser aborting first.

> **Workflow runs longer than ~20 s are a Dify-side optimization issue.** The
> published workflow measured 5.2 s–22.4 s per run. Raising the client timeout
> further would hide that rather than fix it.

---

## Dify caller id

`user` is derived per profile by the website (`getDifyUserId`) as
`guardian-${internalId}` — e.g. `guardian-demo-m28`, `guardian-demo-f36`. Dify
groups runs by `user`, so one shared constant would collapse every visitor into a
single identity.

The id must match `^[a-z0-9_-]{1,64}$` and contain at least one letter. That
pattern structurally cannot carry PII: no names (no CJK), no email (no `@`), no
phone or national id (no all-digit strings). Anything failing the check is
replaced by the constant `guardian-web-demo` rather than forwarded — and the
service re-validates it on arrival, so a compromised client cannot bypass this.

---

## Canonical stage names

The workflow receives the canonical business display name **"卦名 · 阶段名"**:

| stage id | canonical `stage_name` |
|---|---|
| `zhen-infant` | 震 · 婴儿期 |
| `xun-child` | 巽 · 少儿期 |
| `li-adolescent` | **离 · 青少年** |
| `dui-young-adult` | 兑 · 青年期 |
| `qian-adult` | 乾 · 壮年期 |
| `kan-middle-age` | 坎 · 中年期 |
| `gen-later-life` | 艮 · 中老年期 |
| `kun-elder` | 坤 · 老年期 |

Note `li-adolescent` is **离 · 青少年**, not "青少年期".

Legacy spellings (`青少年期`, `青年期`, …) are accepted as **input aliases only**
and are normalized to the canonical value before reaching Dify. Aliases are scoped
to exactly one stage id, so `青年期` is rejected for `li-adolescent`. The source of
truth is `content/guardian.ts` → `guardianStages[].displayName`.

---

## Run

```bash
cd tools/guardian-adapter
npm start                 # http://127.0.0.1:8787
npm test                  # 56 deterministic tests, against a fake Dify
node test/live-check.mjs  # optional: hits the REAL Dify workflow
```

The website points at this service with a single **public** variable (an address,
not a secret):

```
NEXT_PUBLIC_GUARDIAN_ADAPTER_URL=http://127.0.0.1:8787
```

If that variable is empty the site renders exactly as before with no analysis
block and no error.

---

## Production deployment

Deploy as its own Node web service (any Node 20+ host — Render Web Service,
Fly, Railway, a container, etc.). **Do not** deploy it into the static site's
host as a function; the site has no server runtime by design.

1. Create the service from this directory (`tools/guardian-adapter`).
2. Start command: `node server.js`.
3. Set `DIFY_API_KEY`, `DIFY_API_BASE_URL`, and `ALLOWED_ORIGINS` (the site's
   real origin) in the service environment.
4. Note the public HTTPS URL and set it as `NEXT_PUBLIC_GUARDIAN_ADAPTER_URL`
   **at the website's build time**, then rebuild and redeploy the static site.

`NEXT_PUBLIC_*` is inlined at build time, so changing the adapter URL requires a
site rebuild — it is not runtime-swappable.

---

## Reliability notes (measured against the live workflow)

The published workflow is **slow and intermittently empty**:

- observed run times **5.2 s – 22.4 s**
- one observed run returned `status: succeeded` with a **zero-length `summary2`**

Therefore `src/dify.js` performs a **single bounded retry** when the workflow
succeeds but produces empty text, under one shared overall budget. Auth errors,
transport failures and timeouts are surfaced immediately without retrying.

`DIFY_TIMEOUT_MS` should stay comfortably above the slowest expected run.
The website's client timeout is deliberately set above it (50 s) so the
Adapter's structured error wins the race.

---

## Content safety

`src/normalize.js` rejects results containing risk scoring, risk bands, disease
probabilities, diagnoses/treatment advice, cohort statistics, or bare
percentages. The five dimensions are treated strictly as **life dimensions**
(wealth / health / travel / food / housing), never as a causal or predictive
model.

---

## Security invariants

- The API key is read from the server environment only.
- It is never logged, never echoed in an error, and never returned to the client.
- Server logs record a request id, outcome, code, timing and a **redacted** input
  summary (stage/scenario/age/gender and counts) — never the full profile, never
  the key, never the raw Dify response.
- `user` sent to Dify is the stable, non-PII string `lelan-guardian-web-demo`.
