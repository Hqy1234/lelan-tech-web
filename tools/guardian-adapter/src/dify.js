/**
 * Guardian Analysis Adapter · Dify client
 *
 * Phase 1F — Dify integration.
 *
 * Calls the published Dify Workflow:
 *   POST ${DIFY_API_BASE_URL}/workflows/run
 *   Authorization: Bearer ${DIFY_API_KEY}
 *   { inputs, response_mode: "blocking", user }
 *
 * The key is read from the server environment ONLY. It is never logged, never
 * echoed in an error, and never returned to the browser.
 *
 * `user` is a stable, non-sensitive internal identifier. No PII (no name, phone,
 * ID number, email) is sent.
 */

"use strict";

const { AdapterError, ERROR_CODES } = require("./errors");

/** Stable internal caller id for Dify analytics. Contains no PII. */
const DIFY_USER = "lelan-guardian-web-demo";

/**
 * Build the Dify `outputs` extractor input.
 * Reads `data.outputs` from the blocking response as the brief specifies.
 */
function readOutputs(body) {
  const data = body && body.data;
  if (!data || typeof data !== "object") {
    throw new AdapterError(
      ERROR_CODES.INVALID_ANALYSIS_RESPONSE,
      "response missing data"
    );
  }
  if (data.status === "failed") {
    throw new AdapterError(
      ERROR_CODES.ANALYSIS_UNAVAILABLE,
      `dify workflow status=failed: ${String(data.error || "").slice(0, 200)}`
    );
  }
  const outputs = data.outputs;
  if (!outputs || typeof outputs !== "object") {
    throw new AdapterError(
      ERROR_CODES.INVALID_ANALYSIS_RESPONSE,
      "response missing data.outputs"
    );
  }
  return outputs;
}

/**
 * Run the workflow, NORMALIZE its outputs, and return a GuardianAnalysisResult.
 *
 * Normalization happens INSIDE the retry boundary on purpose. The live workflow
 * intermittently returns `status: succeeded` with an empty summary, and that is
 * only detectable after normalization — an earlier version normalized in the
 * caller, so the retry could never see the condition it exists to handle.
 *
 * @returns {import('../../../content/guardian').GuardianAnalysisResult}
 */
async function runAndNormalize(deps) {
  const { normalizeAnalysis } = require("./normalize");
  const { overallTimeoutMs } = deps;

  const deadline = Date.now() + overallTimeoutMs;
  const maxAttempts = deps.retryOnEmpty ? 2 : 1;
  let lastErr;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const remaining = deadline - Date.now();
    if (remaining <= 1000) {
      throw lastErr || new AdapterError(ERROR_CODES.ANALYSIS_TIMEOUT, "budget exhausted");
    }
    try {
      const outputs = await attemptWorkflow({ ...deps, timeoutMs: remaining });
      return normalizeAnalysis(outputs);
    } catch (err) {
      lastErr = err;
      /**
       * Only an EMPTY-but-successful response is worth a second attempt. Auth
       * errors, transport failures and timeouts are surfaced immediately — the
       * user retries those, we do not hammer the workflow.
       */
      const reusable =
        err instanceof AdapterError &&
        err.code === ERROR_CODES.INVALID_ANALYSIS_RESPONSE &&
        /empty/i.test(String(err.internal || ""));
      if (!reusable || attempt === maxAttempts) throw err;
    }
  }
  throw lastErr || new AdapterError(ERROR_CODES.SERVER_ERROR, "unreachable");
}

/**
 * A single attempt.
 *
 * RELIABILITY NOTE (measured against the live workflow)
 *   The published workflow is both SLOW and INTERMITTENTLY EMPTY: observed runs
 *   ranged 5.2s–22.4s, and one run returned `status: succeeded` with a
 *   zero-length `summary2`. That is why `runWorkflow` wraps this in a bounded
 *   retry with a shared overall budget rather than a per-attempt timeout.
 */
async function attemptWorkflow({
  apiKey,
  apiBaseUrl,
  timeoutMs,
  inputs,
  testCase,
  fetchImpl,
}) {
  if (!apiKey) {
    throw new AdapterError(
      ERROR_CODES.ANALYSIS_UNAVAILABLE,
      "DIFY_API_KEY not configured"
    );
  }
  if (!apiBaseUrl) {
    throw new AdapterError(
      ERROR_CODES.ANALYSIS_UNAVAILABLE,
      "DIFY_API_BASE_URL not configured"
    );
  }

  const doFetch = fetchImpl || globalThis.fetch;
  if (typeof doFetch !== "function") {
    throw new AdapterError(
      ERROR_CODES.SERVER_ERROR,
      "no fetch implementation available"
    );
  }

  const url = `${apiBaseUrl.replace(/\/+$/, "")}/workflows/run`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  /**
   * TEST-ONLY. Lets the adapter's own suite drive the fake Dify's failure mode.
   * It travels as a HEADER, never inside `inputs`, so the real workflow can never
   * receive it. The website never sets this.
   */
  if (testCase) headers["X-Adapter-Test-Case"] = String(testCase).slice(0, 40);

  let res;
  try {
    res = await doFetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        inputs,
        response_mode: "blocking",
        user: DIFY_USER,
      }),
      signal: controller.signal,
    });
  } catch (err) {
    // AbortError = our timeout; anything else = transport failure.
    if (err && (err.name === "AbortError" || err.code === "ABORT_ERR")) {
      throw new AdapterError(ERROR_CODES.ANALYSIS_TIMEOUT, `timeout after ${timeoutMs}ms`);
    }
    throw new AdapterError(
      ERROR_CODES.ANALYSIS_UNAVAILABLE,
      `transport error: ${String((err && err.message) || err).slice(0, 200)}`
    );
  } finally {
    clearTimeout(timer);
  }

  /* Non-2xx. The upstream status is kept for logs only. */
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new AdapterError(
        ERROR_CODES.ANALYSIS_UNAVAILABLE,
        `dify auth rejected (http ${res.status})`
      );
    }
    if (res.status >= 500) {
      throw new AdapterError(
        ERROR_CODES.ANALYSIS_UNAVAILABLE,
        `dify server error (http ${res.status})`
      );
    }
    throw new AdapterError(
      ERROR_CODES.ANALYSIS_UNAVAILABLE,
      `dify http ${res.status}`
    );
  }

  let body;
  try {
    body = await res.json();
  } catch (err) {
    throw new AdapterError(
      ERROR_CODES.INVALID_ANALYSIS_RESPONSE,
      `response was not JSON: ${String((err && err.message) || err).slice(0, 120)}`
    );
  }

  return readOutputs(body);
}

module.exports = { runAndNormalize, DIFY_USER };
