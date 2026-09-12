/**
 * Guardian Analysis Adapter · HTTP entry point
 *
 * Phase 1F — Dify integration.
 *
 * A standalone Node service. It exists because the official site is a STATIC
 * EXPORT (`output: "export"`), so a Next.js Route Handler would not exist in
 * production — and a Dify `blocking` call must be made server-side, where the
 * API key can stay secret.
 *
 *   Browser → this Adapter → Dify → normalize → GuardianAnalysisResult → Browser
 *
 * The browser never talks to api.dify.ai and never sees the key.
 *
 * Endpoints
 *   GET  /health                 → { ok, difyConfigured }
 *   POST /guardian/analyze       → { analysis: GuardianAnalysisResult }
 *
 * Zero runtime dependencies (Node built-ins only).
 *
 * Run:  node server.js        (env from tools/guardian-adapter/.env or process env)
 */

"use strict";

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const { AdapterError, ERROR_CODES } = require("./src/errors");
const { buildDifyInputs } = require("./src/validate");
const { runAndNormalize } = require("./src/dify");


/* ── Minimal .env loader (no dependency) ─────────────────────────────────── */
/* Only used when the variables are not already in the process environment
   (i.e. local development). Never overwrites real deployment config.        */
function loadDotEnv(file) {
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}
loadDotEnv(path.join(__dirname, ".env"));

/* ── Config ─────────────────────────────────────────────────────────────── */

/**
 * Runtime environment.
 *
 * `NODE_ENV` is set to "production" by most hosts; it may also be set
 * explicitly. Anything else is treated as development, where a missing origin
 * allow-list is tolerated for local work.
 */
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const PORT = Number(process.env.PORT || 8787);
const DIFY_API_KEY = process.env.DIFY_API_KEY || "";
const DIFY_API_BASE_URL =
  process.env.DIFY_API_BASE_URL || "https://api.dify.ai/v1";
const DIFY_TIMEOUT_MS = Number(process.env.DIFY_TIMEOUT_MS || 40000);
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * FAIL FAST in production when the origin allow-list is missing.
 *
 * Without an allow-list there is no safe default: allowing any origin (or echoing
 * whatever Origin arrives) would let any site drive this service with our Dify
 * credential. Refusing to start is the only honest option.
 *
 * The message names the variable and the consequence — it contains no secret.
 */
if (IS_PRODUCTION && ALLOWED_ORIGINS.length === 0) {
  console.error(
    [
      "CONFIG ERROR: ALLOWED_ORIGINS is required in production.",
      "",
      "This service proxies Dify with a server-side API key. Without an origin",
      "allow-list it would accept requests from any website.",
      "",
      "Set ALLOWED_ORIGINS to a comma-separated list of the site origins that",
      "may call it, for example:",
      "  ALLOWED_ORIGINS=https://www.example.com,https://example.com",
      "",
      "Refusing to start.",
    ].join("\n")
  );
  process.exit(1);
}

const MAX_BODY_BYTES = 32 * 1024;

/* ── Helpers ────────────────────────────────────────────────────────────── */

/** Short, non-sensitive request id for correlating logs. */
function requestId() {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * CORS.
 *
 * The Access-Control-Allow-Origin header is emitted ONLY for an origin present
 * in the allow-list. There is no wildcard and no blind echo of the incoming
 * Origin — an unlisted origin simply receives no CORS grant, so the browser
 * blocks the response.
 *
 * Allowed surface is intentionally minimal:
 *   methods: POST, GET, OPTIONS   (GET is /health only)
 *   headers: Content-Type         (the only header the client sets)
 */
function applyCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "600");
  }
}

function sendJSON(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new AdapterError(ERROR_CODES.INVALID_INPUT, "body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", (err) =>
      reject(new AdapterError(ERROR_CODES.INVALID_INPUT, `read error: ${err.message}`))
    );
  });
}

/**
 * Structured server log. Records only: request id, route, outcome, timing and a
 * redacted summary. Never logs the profile payload, the key, the Authorization
 * header or the raw Dify response.
 */
function log(entry) {
  console.log(JSON.stringify(entry));
}

/* ── Route: POST /guardian/analyze ──────────────────────────────────────── */

async function handleAnalyze(req, res, id) {
  const started = Date.now();

  let raw;
  try {
    raw = await readBody(req);
  } catch (err) {
    return finish(res, id, started, err, null);
  }

  let payload;
  try {
    payload = JSON.parse(raw || "{}");
  } catch {
    return finish(
      res,
      id,
      started,
      new AdapterError(ERROR_CODES.INVALID_INPUT, "body was not valid JSON"),
      null
    );
  }

  let inputs, safe, user;
  try {
    ({ inputs, safe, user } = buildDifyInputs(payload));
  } catch (err) {
    return finish(res, id, started, err, null);
  }

  try {
    /**
     * Fetch AND normalize in one retry boundary. Normalization must live inside
     * it: the workflow intermittently returns status=succeeded with an empty
     * summary, which is only detectable after normalization.
     */
    const analysis = await runAndNormalize({
      apiKey: DIFY_API_KEY,
      apiBaseUrl: DIFY_API_BASE_URL,
      overallTimeoutMs: DIFY_TIMEOUT_MS,
      /** One bounded retry when the workflow returns empty text. */
      retryOnEmpty: true,
      inputs,
      /** Stable non-sensitive caller id (validated in buildDifyInputs). */
      user,
      /** Test-only; travels as a header and never enters `inputs`. */
      testCase:
        typeof payload.__testCase === "string" ? payload.__testCase : undefined,
    });
    log({
      id,
      route: "/guardian/analyze",
      outcome: "ok",
      ms: Date.now() - started,
      input: safe,
      attentionItems: analysis.attentionItems.length,
    });
    return sendJSON(res, 200, { analysis });
  } catch (err) {
    return finish(res, id, started, err, safe);
  }
}

/** Single place that turns any error into a safe client response. */
function finish(res, id, started, err, safe) {
  const adapterErr =
    err instanceof AdapterError
      ? err
      : new AdapterError(ERROR_CODES.SERVER_ERROR, String((err && err.message) || err));

  log({
    id,
    route: "/guardian/analyze",
    outcome: "error",
    code: adapterErr.code,
    status: adapterErr.status,
    ms: Date.now() - started,
    input: safe,
    // Server-side diagnostic only. Redacted, truncated, never sent to browser.
    internal: String(adapterErr.internal || "").slice(0, 300),
  });

  return sendJSON(res, adapterErr.status, adapterErr.toClientJSON());
}

/* ── Server ─────────────────────────────────────────────────────────────── */

/**
 * True when the caller's Origin is permitted.
 *
 * A request with NO Origin header (curl, server-to-server, health checks) is
 * allowed through: the CORS allow-list exists to stop *other websites* from
 * driving this service with our Dify credential, and a browser always sends
 * Origin on the cross-origin fetch this service exists for.
 */
function isOriginAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  return ALLOWED_ORIGINS.includes(origin);
}

const server = http.createServer(async (req, res) => {
  const id = requestId();

  // Decide the CORS grant BEFORE anything else. A disallowed origin receives no
  // Access-Control-* headers at all, so the browser blocks the response.
  applyCors(req, res);

  const url = (req.url || "").split("?")[0];

  if (req.method === "OPTIONS") {
    // Preflight is only meaningful for an allowed origin and a real route.
    const knownRoute = url === "/guardian/analyze" || url === "/health";
    if (!knownRoute || !isOriginAllowed(req)) {
      res.writeHead(403).end();
      return;
    }
    res.writeHead(204).end();
    return;
  }

  if (!isOriginAllowed(req)) {
    // No CORS headers were set, so a browser cannot read this body; a non-browser
    // caller is simply refused. Same safe error shape as everywhere else.
    log({ id, route: url, outcome: "error", code: "ORIGIN_NOT_ALLOWED", status: 403 });
    return sendJSON(res, 403, {
      error: {
        code: "ANALYSIS_UNAVAILABLE",
        message: "暂时无法生成智能分析，请稍后重试。",
      },
    });
  }  if (req.method === "GET" && url === "/health") {
    return sendJSON(res, 200, {
      ok: true,
      difyConfigured: Boolean(DIFY_API_KEY && DIFY_API_BASE_URL),
      timeoutMs: DIFY_TIMEOUT_MS,
    });
  }

  if (req.method === "POST" && url === "/guardian/analyze") {
    return handleAnalyze(req, res, id);
  }

  return sendJSON(res, 404, {
    error: { code: "NOT_FOUND", message: "Not found." },
  });
});

server.listen(PORT, "0.0.0.0", () => {
  log({
    event: "listening",
    port: PORT,
    nodeEnv: IS_PRODUCTION ? "production" : "development",
    difyConfigured: Boolean(DIFY_API_KEY && DIFY_API_BASE_URL),
    /**
     * In production this is guaranteed non-empty (we exit above otherwise).
     * In development an empty list means no browser origin is granted, so the
     * value is reported as such rather than as "any".
     */
    allowedOrigins: ALLOWED_ORIGINS,
    timeoutMs: DIFY_TIMEOUT_MS,
  });
});

module.exports = { server };
