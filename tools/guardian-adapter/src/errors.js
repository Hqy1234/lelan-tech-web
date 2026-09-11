/**
 * Guardian Analysis Adapter · error contract
 *
 * Phase 1F — Dify integration.
 *
 * The browser must NEVER see a Dify error, a stack trace, an Authorization
 * header or the API key. Every failure is collapsed into one of these codes plus
 * a safe, user-facing Chinese message. The real cause is logged server-side only
 * (see server.js), without any profile payload or credential.
 */

"use strict";

/** Machine-readable error codes exposed to the browser. */
const ERROR_CODES = {
  INVALID_INPUT: "INVALID_INPUT",
  ANALYSIS_TIMEOUT: "ANALYSIS_TIMEOUT",
  ANALYSIS_UNAVAILABLE: "ANALYSIS_UNAVAILABLE",
  INVALID_ANALYSIS_RESPONSE: "INVALID_ANALYSIS_RESPONSE",
  SERVER_ERROR: "SERVER_ERROR",
};

/** Safe, non-technical messages. No Dify wording, no codes, no stack. */
const SAFE_MESSAGES = {
  INVALID_INPUT: "提交的档案信息不完整或格式不正确，请返回修改后重试。",
  ANALYSIS_TIMEOUT: "智能分析暂时超时，请稍后重试。",
  ANALYSIS_UNAVAILABLE: "暂时无法生成智能分析，请稍后重试。",
  INVALID_ANALYSIS_RESPONSE: "暂时无法生成智能分析，请稍后重试。",
  SERVER_ERROR: "服务暂时不可用，请稍后重试。",
};

/** HTTP status paired with each code. */
const STATUS_FOR = {
  INVALID_INPUT: 400,
  ANALYSIS_TIMEOUT: 504,
  ANALYSIS_UNAVAILABLE: 503,
  INVALID_ANALYSIS_RESPONSE: 502,
  SERVER_ERROR: 500,
};

/**
 * Error carrying only a safe code + safe message.
 * `internal` is for server logs and is never serialized to the client.
 */
class AdapterError extends Error {
  constructor(code, internal) {
    super(SAFE_MESSAGES[code] || SAFE_MESSAGES.SERVER_ERROR);
    this.code = code;
    this.status = STATUS_FOR[code] || 500;
    /** Server-side diagnostic only — never sent to the browser. */
    this.internal = internal || "";
  }

  /** The ONLY shape the browser receives on failure. */
  toClientJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }
}

module.exports = { AdapterError, ERROR_CODES, SAFE_MESSAGES };
