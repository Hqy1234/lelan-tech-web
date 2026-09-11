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

const PORT = Number(process.env.PORT || 8787);
const DIFY_API_KEY = process.env.DIFY_API_KEY || "";
const DIFY_API_BASE_URL =
  process.env.DIFY_API_BASE_URL || "https://api.dify.ai/v1";
const DIFY_TIMEOUT_MS = Number(process.env.DIFY_TIMEOUT_MS || 40000);
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const MAX_BODY_BYTES = 32 * 1024;

/* ── Helpers ────────────────────────────────────────────────────────────── */

/** Short, non-sensitive request id for correlating logs. */
function requestId() {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * CORS. Only origins explicitly listed are echoed back; if none are configured
 * we allow the request without credentials (the endpoint holds no session).
 */
function applyCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else if (origin && ALLOWED_ORIGINS.length === 0) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "600");
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

  let inputs, safe;
  try {
    ({ inputs, safe } = buildDifyInputs(payload));
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

const server = http.createServer(async (req, res) => {
  const id = requestId();
  applyCors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204).end();
    return;
  }

  const url = (req.url || "").split("?")[0];

  if (req.method === "GET" && url === "/health") {
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
    difyConfigured: Boolean(DIFY_API_KEY && DIFY_API_BASE_URL),
    allowedOrigins: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : "(any)",
    timeoutMs: DIFY_TIMEOUT_MS,
  });
});

module.exports = { server };
