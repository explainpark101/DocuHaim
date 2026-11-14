import { b7 as v, j as C, b8 as j } from "./index-BebLgvYF.js";
function P({ instruction: t, selectedText: e, hasImages: r }) {
  const n = (t || "").trim(), s = (e || "").trim(), o = [n, "", "---"];
  return r && s ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uC640 \uC544\uB798 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : r ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.") : s ? o.push("\uC544\uB798\uB294 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uC785\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : o.push("\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694."), o.join(`
`);
}
function b(t = "LLM generation aborted") {
  if (typeof DOMException < "u") return new DOMException(t, "AbortError");
  const e = new Error(t);
  return e.name = "AbortError", e;
}
function y(t) {
  return !t || typeof t != "object" ? false : t.name === "AbortError" ? true : typeof DOMException < "u" && t instanceof DOMException ? t.name === "AbortError" : false;
}
function d(t) {
  if (t == null ? void 0 : t.aborted) throw t.reason != null && y(t.reason) || t.reason instanceof Error ? t.reason : b();
}
function q(t, e) {
  return new Promise((r, n) => {
    if (e == null ? void 0 : e.aborted) {
      n(y(e.reason) ? e.reason : b());
      return;
    }
    const s = setTimeout(() => {
      e == null ? void 0 : e.removeEventListener("abort", o), r();
    }, t), o = () => {
      clearTimeout(s), n(y(e == null ? void 0 : e.reason) ? e == null ? void 0 : e.reason : b());
    };
    e == null ? void 0 : e.addEventListener("abort", o, { once: true });
  });
}
const A = { temperature: 0.4 }, _ = /* @__PURE__ */ new Set(["model", "messages", "stream", "stream_options", "systemInstruction", "system_instruction", "contents", "config"]), rt = ["temperature", "top_p", "top_k", "min_p", "typical_p", "max_tokens", "max_completion_tokens", "n", "frequency_penalty", "presence_penalty", "repetition_penalty", "seed", "min_tokens", "stop", "stop_token_ids", "ignore_eos", "logprobs", "top_logprobs", "prompt_logprobs", "verbosity", "reasoning_effort", "thinking_token_budget", "include_reasoning", "use_beam_search", "length_penalty", "response_format", "user", "truncate_prompt_tokens", "truncation_side", "skip_special_tokens", "echo"];
function E() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function k() {
  return [{ id: E(), key: "temperature", valueText: "0.4" }];
}
function nt(t = "") {
  return { id: E(), key: t, valueText: "" };
}
function $(t) {
  const e = t.trim();
  if (!e) return "";
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}
function D(t) {
  if (typeof t == "string") {
    try {
      const e = JSON.parse(t);
      if (typeof e == "string") return JSON.stringify(e);
    } catch {
    }
    return t;
  }
  try {
    return JSON.stringify(t);
  } catch {
    return String(t);
  }
}
function ot(t) {
  const e = {};
  for (const r of t) {
    const n = r.key.trim();
    !n || _.has(n) || (e[n] = $(r.valueText));
  }
  return e;
}
function st(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return k();
  const e = Object.entries(t).filter(([r]) => r.trim() && !_.has(r)).map(([r, n]) => ({ id: E(), key: r, valueText: D(n) }));
  return e.length ? e : k();
}
function O(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return { ...A };
  const e = {};
  for (const [r, n] of Object.entries(t)) {
    const s = r.trim();
    !s || _.has(s) || (e[s] = n);
  }
  return Object.keys(e).length ? e : { ...A };
}
function it(t) {
  try {
    return `${JSON.stringify(t, null, 2)}
`;
  } catch {
    return `{
  "temperature": 0.4
}
`;
  }
}
function at(t) {
  const e = t.trim();
  if (!e) return { ok: true, options: { ...A } };
  try {
    const r = JSON.parse(e);
    return !r || typeof r != "object" || Array.isArray(r) ? { ok: false, error: "JSON must be an object of key/value pairs." } : { ok: true, options: O(r) };
  } catch (r) {
    return { ok: false, error: r instanceof Error ? r.message : "Invalid JSON" };
  }
}
function g(t) {
  const e = O(t), r = {};
  for (const [n, s] of Object.entries(e)) _.has(n) || (r[n] = s);
  return r;
}
const J = { max_completion_tokens: "max_tokens", thinking_token_budget: "thinking_budget", include_reasoning: "enable_thinking" }, U = /* @__PURE__ */ new Set(["max_tokens", "temperature", "top_p", "min_p", "top_k", "typical_p", "repetition_penalty", "repetition_context_size", "logit_bias", "max_kv_size", "kv_bits", "kv_group_size", "kv_quant_scheme", "quantized_kv_start", "prefill_step_size", "skip_special_tokens", "thinking_budget", "thinking_end_token", "thinking_start_token", "enable_thinking", "verbose", "seed"]), z = { max_tokens: 512, temperature: 0.4, top_p: 1, min_p: 0 };
function ct(t) {
  const e = g(t), r = { ...z };
  for (const [n, s] of Object.entries(e)) {
    if (s === void 0) continue;
    const o = J[n] ?? n;
    U.has(o) && (r[o] = s);
  }
  return r;
}
const G = { temperature: "temperature", top_p: "topP", topP: "topP", top_k: "topK", topK: "topK", max_tokens: "maxOutputTokens", max_completion_tokens: "maxOutputTokens", maxOutputTokens: "maxOutputTokens", stop: "stopSequences", stopSequences: "stopSequences", seed: "seed", n: "candidateCount", candidateCount: "candidateCount", presence_penalty: "presencePenalty", presencePenalty: "presencePenalty", frequency_penalty: "frequencyPenalty", frequencyPenalty: "frequencyPenalty", response_mime_type: "responseMimeType", responseMimeType: "responseMimeType" };
function ut(t) {
  const e = O(t), r = {};
  for (const [n, s] of Object.entries(e)) {
    if (_.has(n)) continue;
    const o = G[n] ?? n;
    r[o] = s;
  }
  return r;
}
function w(t, e) {
  const r = Number.parseInt(String(e || "").trim(), 10);
  if (Number.isFinite(r) && r > 0) return r;
  const n = String(t || ""), s = n.match(/try again in ([\d.]+)\s*s/i) || n.match(/retry in ([\d.]+)s/i);
  if (!s) return null;
  const o = Math.ceil(Number(s[1]));
  return Number.isFinite(o) && o > 0 ? o : null;
}
function T({ status: t, detail: e, modelId: r }) {
  const n = r ? ` (${r})` : "", s = w(e);
  if (t === 401 || t === 403) return `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${e}`;
  if (t === 404) return `Endpoint \uB610\uB294 \uBAA8\uB378\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4${n}.
\uBCA0\uC774\uC2A4 URL\uC774 /v1 \uC744 \uD3EC\uD568\uD558\uB294\uC9C0, \uBAA8\uB378 ID\uAC00 \uB9DE\uB294\uC9C0 \uD655\uC778\uD558\uC138\uC694.

${e}`;
  if (t === 429) {
    const o = [`\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`, "", e];
    return s && o.push("", `\uC57D ${s}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), o.join(`
`);
  }
  return `OpenAI \uD638\uD658 API \uC624\uB958 (${t})${n}: ${e}`;
}
function K(t) {
  const e = t instanceof Error ? t.message : String(t || "");
  return t instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(e) ? ["\uC11C\uBC84\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", "Endpoint URL\uACFC \uBE0C\uB77C\uC6B0\uC800 CORS \uD5C8\uC6A9 \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uC138\uC694.", "\uB85C\uCEEC \uC11C\uBC84(Ollama, LM Studio, vLLM \uB4F1)\uB294 \uBCF4\uD1B5 CORS\uB97C \uC9C1\uC811 \uC5F4\uC5B4\uC57C \uD569\uB2C8\uB2E4."].join(`
`) : e || "OpenAI \uD638\uD658 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.";
}
const B = 1;
function x(t) {
  const e = { "Content-Type": "application/json" }, r = String(t || "").trim();
  return r && (e.Authorization = `Bearer ${r}`), e;
}
function L(t) {
  const e = C(t);
  if (!e) throw new Error("OpenAI \uD638\uD658 Endpoint\uB97C \uC785\uB825\uD558\uC138\uC694. \uC608: https://api.openai.com/v1 \uB610\uB294 http://localhost:11434/v1");
  return e;
}
async function M(t) {
  let e = t.statusText;
  try {
    const r = await t.json();
    if (r && typeof r == "object") {
      const n = r, s = n.error;
      if (typeof s == "string" && s.trim()) return s;
      if (s && typeof s == "object") {
        const o = s.message;
        if (typeof o == "string" && o.trim()) return o;
      }
      if (typeof n.message == "string" && n.message.trim()) return n.message;
      if (typeof n.description == "string" && n.description.trim()) return n.description.trim();
    }
  } catch {
  }
  return e;
}
async function I(t, e) {
  try {
    return await fetch(t, e);
  } catch (r) {
    throw y(r) ? r : new Error(K(r));
  }
}
function m(t) {
  return !t || typeof t != "object" || Array.isArray(t) ? null : t;
}
function F(t) {
  if (typeof t == "string") return t.trim();
  const e = m(t);
  if (!e) return "";
  const r = e.id ?? e.name ?? e.model;
  return typeof r == "string" ? r.trim() : "";
}
function V(t, e) {
  const r = m(t);
  if (!r) return e;
  const n = r.display_name ?? r.displayName ?? r.id ?? r.name;
  return typeof n == "string" && n.trim() ? n.trim() : e;
}
async function W(t, e = "") {
  const r = L(t), n = await I(`${r}/models`, { headers: x(e) });
  if (!n.ok) {
    const c = await M(n);
    throw new Error(T({ status: n.status, detail: c }));
  }
  const s = await n.json(), o = m(s), i = o ? Array.isArray(o.data) ? o.data : Array.isArray(o.models) ? o.models : [] : Array.isArray(s) ? s : [], p = [], u = /* @__PURE__ */ new Set();
  for (const c of i) {
    const a = F(c);
    !a || u.has(a) || (u.add(a), p.push({ id: a, displayName: V(c, a) }));
  }
  return p.sort((c, a) => c.displayName.localeCompare(a.displayName, "ko"));
}
function X({ instruction: t, systemPrompt: e, selectedText: r, images: n }) {
  const s = n.length > 0, o = P({ instruction: t, selectedText: r, hasImages: s }), i = [], p = (e || "").trim();
  if (p && i.push({ role: "system", content: p }), !s) return i.push({ role: "user", content: o }), i;
  const u = [{ type: "text", text: o }, ...n.map((c) => ({ type: "image_url", image_url: { url: `data:${c.mimeType};base64,${c.dataBase64}` } }))];
  return i.push({ role: "user", content: u }), i;
}
function Y(t) {
  var _a;
  const e = m(t), r = e && Array.isArray(e.choices) ? e.choices : [], n = m(r[0]), o = ((_a = m(n == null ? void 0 : n.delta)) == null ? void 0 : _a.content) ?? (n == null ? void 0 : n.text);
  return typeof o == "string" ? o : Array.isArray(o) ? o.map((i) => {
    if (typeof i == "string") return i;
    const p = m(i);
    if (!p) return "";
    if (typeof p.text == "string") return p.text;
    const u = m(p.text);
    return typeof (u == null ? void 0 : u.value) == "string" ? u.value : "";
  }).filter(Boolean).join("") : "";
}
async function Q(t, e, r) {
  if (!t.body) throw new Error("OpenAI \uD638\uD658 API\uAC00 \uC2A4\uD2B8\uB9AC\uBC0D \uBCF8\uBB38\uC744 \uBC18\uD658\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
  const n = t.body.getReader(), s = new TextDecoder();
  let o = "", i = "";
  const p = () => {
    n.cancel().catch(() => {
    });
  };
  r == null ? void 0 : r.addEventListener("abort", p, { once: true });
  const u = (c) => {
    const a = c.trim();
    if (!a || a === "[DONE]") return;
    let l;
    try {
      l = JSON.parse(a);
    } catch {
      return;
    }
    const f = Y(l);
    f && (i = j(i, f), e == null ? void 0 : e(i));
  };
  try {
    for (; ; ) {
      d(r);
      const { done: a, value: l } = await n.read();
      if (a) break;
      o += s.decode(l, { stream: true });
      let f = o.indexOf(`
`);
      for (; f >= 0; ) {
        const h = o.slice(0, f).replace(/\r$/, "");
        o = o.slice(f + 1), h.startsWith("data:") && u(h.slice(5)), f = o.indexOf(`
`);
      }
    }
    if (o.trim()) {
      const a = o.trim();
      a.startsWith("data:") && u(a.slice(5));
    }
    d(r);
    const c = i.trim();
    if (!c) throw new Error("OpenAI \uD638\uD658 API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return c;
  } finally {
    r == null ? void 0 : r.removeEventListener("abort", p);
  }
}
async function H({ baseUrl: t, apiKey: e, modelId: r, messages: n, requestOptions: s, onChunk: o, signal: i }) {
  d(i);
  const p = g(s), u = await I(`${t}/chat/completions`, { method: "POST", headers: { ...x(e), Accept: "text/event-stream" }, body: JSON.stringify({ ...p, model: r, messages: n, stream: true }), ...i ? { signal: i } : {} });
  if (!u.ok) {
    const c = await M(u), a = new Error(T({ status: u.status, detail: c, modelId: r }));
    throw a.status = u.status, a.retryAfterSec = w(c, u.headers.get("retry-after")), a;
  }
  return Q(u, o, i);
}
async function Z(t) {
  let e = 0;
  for (; ; ) {
    d(t.signal);
    let r = false;
    try {
      return await H({ ...t, onChunk: (n) => {
        var _a;
        r = true, (_a = t.onChunk) == null ? void 0 : _a.call(t, n);
      } });
    } catch (n) {
      if (y(n)) throw n;
      const s = n;
      if (!(!r && (s == null ? void 0 : s.status) === 429 && e < B && s.retryAfterSec && s.retryAfterSec <= 120)) throw n;
      e += 1, await q((s.retryAfterSec ?? 1) * 1e3, t.signal);
    }
  }
}
async function tt({ baseUrl: t, apiKey: e, model: r, instruction: n, systemPrompt: s, selectedText: o, images: i, requestOptions: p, onChunk: u, signal: c }) {
  const a = L(t), l = (r || v()).trim(), f = (n || "").trim(), h = (o || "").trim(), R = Array.isArray(i) ? i.filter((S) => (S == null ? void 0 : S.mimeType) && (S == null ? void 0 : S.dataBase64)) : [];
  if (!l) throw new Error("\uBAA8\uB378 ID\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBAA9\uB85D\uC5D0\uC11C \uC120\uD0DD\uD558\uC138\uC694.");
  if (!f) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
  d(c);
  const N = X({ instruction: f, systemPrompt: (s ?? "").trim(), selectedText: h, images: R });
  return Z({ baseUrl: a, apiKey: e ?? "", modelId: l, messages: N, requestOptions: p ?? {}, ...u ? { onChunk: u } : {}, ...c ? { signal: c } : {} });
}
const pt = Object.freeze(Object.defineProperty({ __proto__: null, generateOpenAiCompatibleTransform: tt, listOpenAiCompatibleModels: W }, Symbol.toStringTag, { value: "Module" }));
export {
  A as L,
  ct as a,
  P as b,
  b as c,
  ut as d,
  st as e,
  ot as f,
  tt as g,
  rt as h,
  y as i,
  k as j,
  nt as k,
  W as l,
  O as n,
  pt as o,
  at as p,
  it as r,
  q as s,
  d as t
};
