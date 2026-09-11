/**
 * Guardian Analysis Adapter · test suite
 *
 * Phase 1F.
 *
 * Exercises the REAL adapter code over real HTTP, against a local FAKE Dify
 * server. This covers validation, the Dify contract, status handling, timeout
 * behaviour, output normalization and the error contract without needing a live
 * Dify account — so cases like "401", "500" and "timeout" are deterministic.
 *
 * Run:  node test/run-tests.js
 */

"use strict";

const http = require("node:http");
const { spawn } = require("node:child_process");
const path = require("node:path");

const ADAPTER_PORT = 8791;
const FAKE_DIFY_PORT = 8792;
const ADAPTER_DIR = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;
const failures = [];

function check(name, condition, detail) {
  if (condition) {
    passed += 1;
    console.log(`  PASS  ${name}`);
  } else {
    failed += 1;
    failures.push(name);
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

/* ── Fake Dify ──────────────────────────────────────────────────────────── */

/**
 * The fake inspects `inputs.__case` to decide which response to emit. Real
 * request/response shapes are preserved so the adapter's parsing is genuinely
 * exercised.
 */
function validOutputs(inputs) {
  return {
    summary2: `${inputs.age} 岁${inputs.gender === "male" ? "男性" : "女性"}的人生档案已整理完成。`,
    attention2_items: [
      {
        id: "budget",
        dimension: "wealth",
        status: "attention",
        title: "基础收支可先归档",
        explanation: "基础收支记录可作为长期档案的起点。",
      },
      {
        id: "annual-checkup-pending",
        dimension: "health",
        status: "attention",
        title: "年度体检待安排",
        explanation: "体检记录可纳入健康维度持续更新。",
      },
    ],
    dimension_notes2: {
      wealth: "本次已纳入财富维度。",
      health: "本次已纳入健康维度。",
      travel: "本次暂未纳入出行维度。",
      food: "本次暂未纳入饮食维度。",
      housing: "本次暂未纳入安居维度。",
    },
    disclaimer2: "本结果为演示内容，不构成医学诊断、投资建议或法律意见。",
  };
}

function startFakeDify() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let raw = "";
      req.on("data", (c) => (raw += c));
      req.on("end", () => {
        let body = {};
        try {
          body = JSON.parse(raw || "{}");
        } catch {
          /* ignore */
        }
        const inputs = body.inputs || {};
        /**
         * The failure case marker rides on the PAYLOAD, not inside `inputs`, so
         * the adapter's own validation never sees it and cannot normalise it
         * away. (An earlier version read it from `inputs`, which is stripped by
         * validation — every failure case then returned 400 instead of the
         * intended upstream error.)
         */
        const c = req.headers["x-adapter-test-case"] || "ok";

        const json = (status, payload) => {
          const s = JSON.stringify(payload);
          res.writeHead(status, { "Content-Type": "application/json" });
          res.end(s);
        };

        // Record what the adapter actually sent, for contract assertions.
        lastSeen = { path: req.url, auth: req.headers.authorization, body };
        seen.push({ path: req.url, auth: req.headers.authorization, body });

        switch (c) {
          case "http401":
            return json(401, { code: "unauthorized", message: "bad key" });
          case "http403":
            return json(403, { code: "forbidden", message: "no access" });
          case "http500":
            return json(500, { code: "server_error", message: "boom" });
          case "status_failed":
            return json(200, {
              data: { status: "failed", error: "workflow node failed", outputs: null },
            });
          case "no_outputs":
            return json(200, { data: { status: "succeeded" } });
          case "summary_wrong_type":
            return json(200, {
              data: { status: "succeeded", outputs: { ...validOutputs(inputs), summary2: 12345 } },
            });
          case "attention_malformed":
            return json(200, {
              data: {
                status: "succeeded",
                outputs: { ...validOutputs(inputs), attention2_items: "not json at all" },
              },
            });
          case "dimension_missing_key": {
            const o = validOutputs(inputs);
            delete o.dimension_notes2.travel;
            return json(200, { data: { status: "succeeded", outputs: o } });
          }
          case "forbidden_language":
            return json(200, {
              data: {
                status: "succeeded",
                outputs: { ...validOutputs(inputs), summary2: "你的risk_score为 82%" },
              },
            });
          case "not_json":
            res.writeHead(200, { "Content-Type": "text/plain" });
            return res.end("<html>not json</html>");
          case "empty_then_ok":
            emptyHits = (emptyHits || 0) + 1;
            if (emptyHits === 1) {
              const o = validOutputs(inputs);
              return json(200, { data: { status: "succeeded", outputs: { ...o, summary2: "   " } } });
            }
            return json(200, { data: { status: "succeeded", outputs: validOutputs(inputs) } });
          case "hang":
            // Never respond — drives the adapter's timeout path.
            return;
          case "json_string_outputs": {
            // Dify sometimes emits list outputs as JSON strings.
            const o = validOutputs(inputs);
            return json(200, {
              data: {
                status: "succeeded",
                outputs: {
                  ...o,
                  attention2_items: JSON.stringify(o.attention2_items),
                  dimension_notes2: JSON.stringify(o.dimension_notes2),
                },
              },
            });
          }
          default:
            return json(200, { data: { status: "succeeded", outputs: validOutputs(inputs) } });
        }
      });
    });
    server.listen(FAKE_DIFY_PORT, "127.0.0.1", () => resolve(server));
  });
}

let lastSeen = null;
let emptyHits = 0;
const seen = [];

/* ── Helpers ────────────────────────────────────────────────────────────── */

/**
 * Persona A — the brief's demographic facts, expressed with the PROJECT'S real
 * internal ids, because the ids the brief lists do not exist in this codebase:
 *
 *   brief "career-direction"        → project "general-t1"   (档案基础信息)
 *   brief "social-security-check"   → project "general-t2"   (当前事项整理)
 *   brief "basic-budget-planned"    → project "budget"       (预算规划)
 *   brief scenario_name "综合生活场景" → project "综合生活"
 *
 * Age / gender / city / stage / scenario id and the completed count (2 of 5) are
 * exactly as specified.
 */
function personaA(case_) {
  return {
    identity: { age: 28, gender: "male", city: "杭州" },
    stage: { id: "li-adolescent", name: "离 · 青少年" },
    scenario: { id: "general", name: "综合生活" },
    completedTaskIds: ["general-t1", "general-t2"],
    dimensionTags: {
      wealth: ["budget"],
      health: ["annual-checkup-pending"],
      travel: [],
      food: [],
      housing: [],
    },
    progressCompleted: 2,
    progressTotal: 5,
    __testCase: case_ || "ok",
  };
}

/**
 * Persona B — same treatment. 4 of 8 startup tasks complete.
 *
 *   brief "company-name" → project "startup-t1"   (公司核名)
 *   brief "registration" → project "startup-t2"   (工商注册)
 *   brief "company-seal" → project "startup-t3"   (公章刻印)
 *   brief "bank-account" → project "startup-t4"   (银行开户)
 *   brief scenario_name "创业场景" → project "创业"
 */
function personaB(case_) {
  return {
    identity: { age: 36, gender: "female", city: "杭州" },
    stage: { id: "dui-young-adult", name: "兑 · 青年期" },
    scenario: { id: "startup", name: "创业" },
    completedTaskIds: ["startup-t1", "startup-t2", "startup-t3", "startup-t4"],
    dimensionTags: {
      wealth: ["business-account", "tax-attention"],
      health: ["sleep-attention"],
      travel: [],
      food: ["irregular-meals"],
      housing: [],
    },
    progressCompleted: 4,
    progressTotal: 8,
    __testCase: case_ || "ok",
  };
}

async function post(payload) {
  const { __testCase, ...clean } = payload;
  const body = __testCase ? { ...clean, __testCase } : clean;
  const res = await fetch(`http://127.0.0.1:${ADAPTER_PORT}/guardian/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let parsed = null;
  try {
    parsed = await res.json();
  } catch {
    /* ignore */
  }
  return { status: res.status, body: parsed };
}

function waitForServer(port, tries = 60) {
  return new Promise((resolve, reject) => {
    let n = 0;
    const tick = async () => {
      try {
        const r = await fetch(`http://127.0.0.1:${port}/health`);
        if (r.ok) return resolve();
      } catch {
        /* not up yet */
      }
      if (++n > tries) return reject(new Error(`adapter on ${port} did not start`));
      setTimeout(tick, 100);
    };
    tick();
  });
}

/* ── Main ───────────────────────────────────────────────────────────────── */

(async () => {
  const fake = await startFakeDify();
  console.log(`fake dify listening on ${FAKE_DIFY_PORT}`);

  const adapter = spawn(process.execPath, ["server.js"], {
    cwd: ADAPTER_DIR,
    env: {
      ...process.env,
      PORT: String(ADAPTER_PORT),
      DIFY_API_KEY: "app-test-key-not-real",
      DIFY_API_BASE_URL: `http://127.0.0.1:${FAKE_DIFY_PORT}/v1`,
      DIFY_TIMEOUT_MS: "3000",
      ALLOWED_ORIGINS: "http://localhost:3000",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const adapterLogs = [];
  adapter.stdout.on("data", (d) => adapterLogs.push(d.toString()));
  adapter.stderr.on("data", (d) => adapterLogs.push("ERR:" + d.toString()));

  try {
    await waitForServer(ADAPTER_PORT);
    console.log("adapter listening\n");

    /* ── 1 & 2. Valid personas ──────────────────────────────────────────── */
    console.log("1-2. Valid personas");
    const a = await post(personaA());
    check("Persona A returns 200", a.status === 200, String(a.status));
    check("Persona A has analysis", !!a.body?.analysis);
    check("Persona A summary is string", typeof a.body?.analysis?.summary === "string");
    check("Persona A has 2 attention items", a.body?.analysis?.attentionItems?.length === 2);
    check(
      "Persona A dimensionNotes has all 5 keys",
      ["wealth", "health", "travel", "food", "housing"].every(
        (k) => typeof a.body?.analysis?.dimensionNotes?.[k] === "string"
      )
    );
    check("Persona A disclaimer present", typeof a.body?.analysis?.disclaimer === "string");
    check(
      "Persona A leaked NO Dify field names",
      !JSON.stringify(a.body).match(/summary2|attention2_items|dimension_notes2|disclaimer2/)
    );

    const b = await post(personaB());
    check("Persona B returns 200", b.status === 200, String(b.status));
    check("Persona B has analysis", !!b.body?.analysis);

    /* ── Dify request contract ──────────────────────────────────────────── */
    console.log("\n3. Dify request shape");
    /* Assert against Persona A's request (seen[0]), not the most recent one. */
    const firstReq = seen[0] || {};
    check("called /v1/workflows/run", firstReq.path === "/v1/workflows/run", String(firstReq.path));
    check("sent Bearer auth", /^Bearer app-test-key-not-real$/.test(firstReq.auth || ""));
    check("response_mode=blocking", firstReq.body?.response_mode === "blocking");
    check("user is stable non-PII id", firstReq.body?.user === "lelan-guardian-web-demo");
    const inp = firstReq.body?.inputs || {};
    check("age is a NUMBER", typeof inp.age === "number");
    check("progress_completed is a NUMBER", typeof inp.progress_completed === "number");
    check("progress_total is a NUMBER", typeof inp.progress_total === "number");
    check("gender is a string", typeof inp.gender === "string");
    check("stage_name preserved verbatim (brief variant)", inp.stage_name === "离 · 青少年", String(inp.stage_name));
    check("scenario_name preserved verbatim (project wording)", inp.scenario_name === "综合生活", String(inp.scenario_name));
    check("completed_tasks_json is a STRING", typeof inp.completed_tasks_json === "string");
    check("wealth_tags_json is a STRING", typeof inp.wealth_tags_json === "string");
    check(
      "empty travel array serialises to \"[]\"",
      inp.travel_tags_json === "[]",
      String(inp.travel_tags_json)
    );
    check(
      "completed_tasks_json parses back to the sent array",
      JSON.stringify(JSON.parse(inp.completed_tasks_json || "null")) ===
        JSON.stringify(["general-t1", "general-t2"])
    );
    check("no test marker inside Dify inputs", inp.__case === undefined && inp.__testCase === undefined);

    /* ── 4-5. Validation ────────────────────────────────────────────────── */
    console.log("\n4. Validation");
    const over = await post({ ...personaA(), progressCompleted: 9 });
    check("progressCompleted > progressTotal → 400", over.status === 400, String(over.status));
    check("error code INVALID_INPUT", over.body?.error?.code === "INVALID_INPUT");

    const zero = await post({ ...personaA(), progressTotal: 0 });
    check("progressTotal = 0 → 400", zero.status === 400, String(zero.status));

    const badArr = await post({
      ...personaA(),
      completedTaskIds: "not-an-array",
    });
    check("non-array completedTaskIds → 400", badArr.status === 400, String(badArr.status));

    const badTag = await post({
      ...personaA(),
      dimensionTags: { ...personaA().dimensionTags, wealth: ["totally-made-up"] },
    });
    check("unknown dimension tag → 400", badTag.status === 400, String(badTag.status));

    const badStage = await post({
      ...personaA(),
      stage: { id: "not-a-stage", name: "x" },
    });
    check("unknown stage id → 400", badStage.status === 400, String(badStage.status));

    const badGender = await post({
      ...personaA(),
      identity: { age: 28, gender: "other", city: "杭州" },
    });
    check("invalid gender → 400", badGender.status === 400, String(badGender.status));

    const neg = await post({ ...personaA(), progressCompleted: -1 });
    check("negative progressCompleted → 400", neg.status === 400, String(neg.status));

    /* ── 6-9. Dify failures ─────────────────────────────────────────────── */
    console.log("\n5. Dify failure handling");
    const t401 = await post(personaA("http401"));
    check("Dify 401 → 503 ANALYSIS_UNAVAILABLE", t401.status === 503 && t401.body?.error?.code === "ANALYSIS_UNAVAILABLE", `${t401.status}/${t401.body?.error?.code}`);

    const t403 = await post(personaA("http403"));
    check("Dify 403 → 503", t403.status === 503, String(t403.status));

    const t500 = await post(personaA("http500"));
    check("Dify 500 → 503", t500.status === 503, String(t500.status));

    const sFailed = await post(personaA("status_failed"));
    check(
      "data.status=failed → 503",
      sFailed.status === 503 && sFailed.body?.error?.code === "ANALYSIS_UNAVAILABLE",
      `${sFailed.status}/${sFailed.body?.error?.code}`
    );

    const noOut = await post(personaA("no_outputs"));
    check(
      "missing outputs → 502 INVALID_ANALYSIS_RESPONSE",
      noOut.status === 502 && noOut.body?.error?.code === "INVALID_ANALYSIS_RESPONSE",
      `${noOut.status}/${noOut.body?.error?.code}`
    );

    const notJson = await post(personaA("not_json"));
    check("non-JSON body → 502", notJson.status === 502, String(notJson.status));

    const started = Date.now();
    const to = await post(personaA("hang"));
    const elapsed = Date.now() - started;
    check(
      "timeout → 504 ANALYSIS_TIMEOUT",
      to.status === 504 && to.body?.error?.code === "ANALYSIS_TIMEOUT",
      `${to.status}/${to.body?.error?.code}`
    );
    check("timeout fired within the overall budget", elapsed >= 2500 && elapsed < 12000, `${elapsed}ms`);

    const emptyRetry = await post(personaA("empty_then_ok"));
    check(
      "empty output is retried once and then succeeds",
      emptyRetry.status === 200 && !!emptyRetry.body?.analysis,
      `${emptyRetry.status}`
    );

    /* ── 10-13. Normalization failures ──────────────────────────────────── */
    console.log("\n6. Output normalization");
    const wrongType = await post(personaA("summary_wrong_type"));
    check(
      "summary2 wrong type → 502",
      wrongType.status === 502 && wrongType.body?.error?.code === "INVALID_ANALYSIS_RESPONSE",
      `${wrongType.status}/${wrongType.body?.error?.code}`
    );

    const malformed = await post(personaA("attention_malformed"));
    check("attention2_items malformed → 502", malformed.status === 502, String(malformed.status));

    const missingKey = await post(personaA("dimension_missing_key"));
    check("dimension_notes2 missing key → 502", missingKey.status === 502, String(missingKey.status));

    const forbidden = await post(personaA("forbidden_language"));
    check(
      "forbidden risk/percentage language → 502",
      forbidden.status === 502,
      String(forbidden.status)
    );

    const jsonStr = await post(personaA("json_string_outputs"));
    check(
      "JSON-string outputs are accepted and normalized",
      jsonStr.status === 200 && jsonStr.body?.analysis?.attentionItems?.length === 2,
      String(jsonStr.status)
    );

    /* ── 14. No internal leakage ────────────────────────────────────────── */
    console.log("\n7. Security / leakage");
    const leakProbe = JSON.stringify([
      a.body,
      b.body,
      t401.body,
      t500.body,
      noOut.body,
      to.body,
      wrongType.body,
      malformed.body,
      missingKey.body,
      forbidden.body,
    ]);
    check("no API key in any response", !leakProbe.includes("app-test-key-not-real"));
    check("no 'Bearer' in any response", !/Bearer/i.test(leakProbe));
    check("no upstream code echoed (unauthorized)", !/unauthorized/i.test(leakProbe));
    check("no workflow node error echoed", !/workflow node failed/i.test(leakProbe));
    check("no 'risk_score' reached the client", !/risk_score/i.test(leakProbe));
    check("no stack traces in responses", !/\bat\s+\w+\s*\(/.test(leakProbe));
    check(
      "every failure uses only safe code+message",
      [t401, t500, noOut, to, wrongType].every(
        (r) =>
          r.body?.error &&
          typeof r.body.error.code === "string" &&
          typeof r.body.error.message === "string" &&
          Object.keys(r.body.error).length === 2
      )
    );

    /* ── Server logs must not contain the key ───────────────────────────── */
    const logs = adapterLogs.join("");
    check("server logs contain no API key", !logs.includes("app-test-key-not-real"));
    check("server logs contain no Authorization value", !/Bearer\s+app-/.test(logs));

    /* ── /health ────────────────────────────────────────────────────────── */
    const health = await (await fetch(`http://127.0.0.1:${ADAPTER_PORT}/health`)).json();
    check("health ok", health.ok === true && health.difyConfigured === true);
  } finally {
    adapter.kill();
    fake.close();
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed) {
    console.log("failures:\n  " + failures.join("\n  "));
    process.exit(1);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
