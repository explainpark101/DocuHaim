import { bd as g, o as P, aY as j } from "./index-DD9YmsNw.js";
function q({ instruction: t, selectedText: e, hasImages: r }) {
  const n = (t || "").trim(), s = (e || "").trim(), o = [n, "", "---"];
  return r && s ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uC640 \uC544\uB798 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : r ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.") : s ? o.push("\uC544\uB798\uB294 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uC785\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : o.push("\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694."), o.join(`
`);
}
function b(t = "LLM generation aborted") {
  if (typeof DOMException < "u") return new DOMException(t, "AbortError");
  const e = new Error(t);
  return e.name = "AbortError", e;
}
function _(t) {
  return !t || typeof t != "object" ? false : t.name === "AbortError" ? true : typeof DOMException < "u" && t instanceof DOMException ? t.name === "AbortError" : false;
}
function d(t) {
  if (t == null ? void 0 : t.aborted) throw t.reason != null && _(t.reason) || t.reason instanceof Error ? t.reason : b();
}
function D(t, e) {
  return new Promise((r, n) => {
    if (e == null ? void 0 : e.aborted) {
      n(_(e.reason) ? e.reason : b());
      return;
    }
    const s = setTimeout(() => {
      e == null ? void 0 : e.removeEventListener("abort", o), r();
    }, t), o = () => {
      clearTimeout(s), n(_(e == null ? void 0 : e.reason) ? e == null ? void 0 : e.reason : b());
    };
    e == null ? void 0 : e.addEventListener("abort", o, { once: true });
  });
}
const A = { temperature: 0.4 }, h = /* @__PURE__ */ new Set(["model", "messages", "stream", "stream_options", "systemInstruction", "system_instruction", "contents", "config"]), nt = ["temperature", "top_p", "top_k", "min_p", "typical_p", "max_tokens", "max_completion_tokens", "n", "frequency_penalty", "presence_penalty", "repetition_penalty", "seed", "min_tokens", "stop", "stop_token_ids", "ignore_eos", "logprobs", "top_logprobs", "prompt_logprobs", "verbosity", "reasoning_effort", "thinking_token_budget", "include_reasoning", "use_beam_search", "length_penalty", "response_format", "user", "truncate_prompt_tokens", "truncation_side", "skip_special_tokens", "echo"];
function E() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function w() {
  return [{ id: E(), key: "temperature", valueText: "0.4" }];
}
function ot(t = "") {
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
function U(t) {
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
function st(t) {
  const e = {};
  for (const r of t) {
    const n = r.key.trim();
    !n || h.has(n) || (e[n] = $(r.valueText));
  }
  return e;
}
function it(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return w();
  const e = Object.entries(t).filter(([r]) => r.trim() && !h.has(r)).map(([r, n]) => ({ id: E(), key: r, valueText: U(n) }));
  return e.length ? e : w();
}
function O(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return { ...A };
  const e = {};
  for (const [r, n] of Object.entries(t)) {
    const s = r.trim();
    !s || h.has(s) || (e[s] = n);
  }
  return Object.keys(e).length ? e : { ...A };
}
function at(t) {
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
function ct(t) {
  const e = t.trim();
  if (!e) return { ok: true, options: { ...A } };
  try {
    const r = JSON.parse(e);
    return !r || typeof r != "object" || Array.isArray(r) ? { ok: false, error: "JSON must be an object of key/value pairs." } : { ok: true, options: O(r) };
  } catch (r) {
    return { ok: false, error: r instanceof Error ? r.message : "Invalid JSON" };
  }
}
function T(t) {
  const e = O(t), r = {};
  for (const [n, s] of Object.entries(e)) h.has(n) || (r[n] = s);
  return r;
}
const J = { max_completion_tokens: "max_tokens", thinking_token_budget: "thinking_budget", include_reasoning: "enable_thinking" }, K = /* @__PURE__ */ new Set(["max_tokens", "temperature", "top_p", "min_p", "top_k", "typical_p", "repetition_penalty", "repetition_context_size", "logit_bias", "max_kv_size", "kv_bits", "kv_group_size", "kv_quant_scheme", "quantized_kv_start", "prefill_step_size", "skip_special_tokens", "thinking_budget", "thinking_end_token", "thinking_start_token", "enable_thinking", "verbose", "seed"]), z = { max_tokens: 512, temperature: 0.4, top_p: 1, min_p: 0 };
function ut(t) {
  const e = T(t), r = { ...z };
  for (const [n, s] of Object.entries(e)) {
    if (s === void 0) continue;
    const o = J[n] ?? n;
    K.has(o) && (r[o] = s);
  }
  return r;
}
const G = { temperature: "temperature", top_p: "topP", topP: "topP", top_k: "topK", topK: "topK", max_tokens: "maxOutputTokens", max_completion_tokens: "maxOutputTokens", maxOutputTokens: "maxOutputTokens", stop: "stopSequences", stopSequences: "stopSequences", seed: "seed", n: "candidateCount", candidateCount: "candidateCount", presence_penalty: "presencePenalty", presencePenalty: "presencePenalty", frequency_penalty: "frequencyPenalty", frequencyPenalty: "frequencyPenalty", response_mime_type: "responseMimeType", responseMimeType: "responseMimeType" };
function pt(t) {
  const e = O(t), r = {};
  for (const [n, s] of Object.entries(e)) {
    if (h.has(n)) continue;
    const o = G[n] ?? n;
    r[o] = s;
  }
  return r;
}
function x(t, e) {
  const r = Number.parseInt(String(e || "").trim(), 10);
  if (Number.isFinite(r) && r > 0) return r;
  const n = String(t || ""), s = n.match(/try again in ([\d.]+)\s*s/i) || n.match(/retry in ([\d.]+)s/i);
  if (!s) return null;
  const o = Math.ceil(Number(s[1]));
  return Number.isFinite(o) && o > 0 ? o : null;
}
function L({ status: t, detail: e, modelId: r }) {
  const n = r ? ` (${r})` : "", s = x(e);
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
function B(t) {
  const e = t instanceof Error ? t.message : String(t || "");
  return t instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(e) ? ["\uC11C\uBC84\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", "Endpoint URL\uACFC \uBE0C\uB77C\uC6B0\uC800 CORS \uD5C8\uC6A9 \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uC138\uC694.", "\uB85C\uCEEC \uC11C\uBC84(Ollama, LM Studio, vLLM \uB4F1)\uB294 \uBCF4\uD1B5 CORS\uB97C \uC9C1\uC811 \uC5F4\uC5B4\uC57C \uD569\uB2C8\uB2E4."].join(`
`) : e || "OpenAI \uD638\uD658 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.";
}
const F = 1;
function I(t) {
  const e = { "Content-Type": "application/json" }, r = String(t || "").trim();
  return r && (e.Authorization = `Bearer ${r}`), e;
}
function S(t) {
  const e = P(t);
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
async function R(t, e) {
  try {
    return await fetch(t, e);
  } catch (r) {
    throw _(r) ? r : new Error(B(r));
  }
}
function l(t) {
  return !t || typeof t != "object" || Array.isArray(t) ? null : t;
}
function V(t) {
  if (typeof t == "string") return t.trim();
  const e = l(t);
  if (!e) return "";
  const r = e.id ?? e.name ?? e.model;
  return typeof r == "string" ? r.trim() : "";
}
function Y(t, e) {
  const r = l(t);
  if (!r) return e;
  const n = r.display_name ?? r.displayName ?? r.id ?? r.name;
  return typeof n == "string" && n.trim() ? n.trim() : e;
}
async function W(t, e = "") {
  const r = S(t), n = await R(`${r}/models`, { headers: I(e) });
  if (!n.ok) {
    const c = await M(n);
    throw new Error(L({ status: n.status, detail: c }));
  }
  const s = await n.json(), o = l(s), i = o ? Array.isArray(o.data) ? o.data : Array.isArray(o.models) ? o.models : [] : Array.isArray(s) ? s : [], p = [], u = /* @__PURE__ */ new Set();
  for (const c of i) {
    const a = V(c);
    !a || u.has(a) || (u.add(a), p.push({ id: a, displayName: Y(c, a) }));
  }
  return p.sort((c, a) => c.displayName.localeCompare(a.displayName, "ko"));
}
function X({ instruction: t, systemPrompt: e, selectedText: r, images: n }) {
  const s = n.length > 0, o = q({ instruction: t, selectedText: r, hasImages: s }), i = [], p = (e || "").trim();
  if (p && i.push({ role: "system", content: p }), !s) return i.push({ role: "user", content: o }), i;
  const u = [{ type: "text", text: o }, ...n.map((c) => ({ type: "image_url", image_url: { url: `data:${c.mimeType};base64,${c.dataBase64}` } }))];
  return i.push({ role: "user", content: u }), i;
}
function Q(t) {
  var _a;
  const e = l(t), r = e && Array.isArray(e.choices) ? e.choices : [], n = l(r[0]), o = ((_a = l(n == null ? void 0 : n.delta)) == null ? void 0 : _a.content) ?? (n == null ? void 0 : n.text);
  return typeof o == "string" ? o : Array.isArray(o) ? o.map((i) => {
    if (typeof i == "string") return i;
    const p = l(i);
    if (!p) return "";
    if (typeof p.text == "string") return p.text;
    const u = l(p.text);
    return typeof (u == null ? void 0 : u.value) == "string" ? u.value : "";
  }).filter(Boolean).join("") : "";
}
async function H(t, e, r) {
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
    let f;
    try {
      f = JSON.parse(a);
    } catch {
      return;
    }
    const m = Q(f);
    m && (i = j(i, m), e == null ? void 0 : e(i));
  };
  try {
    for (; ; ) {
      d(r);
      const { done: a, value: f } = await n.read();
      if (a) break;
      o += s.decode(f, { stream: true });
      let m = o.indexOf(`
`);
      for (; m >= 0; ) {
        const y = o.slice(0, m).replace(/\r$/, "");
        o = o.slice(m + 1), y.startsWith("data:") && u(y.slice(5)), m = o.indexOf(`
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
async function Z({ baseUrl: t, apiKey: e, modelId: r, messages: n, requestOptions: s, onChunk: o, signal: i }) {
  d(i);
  const p = T(s), u = await R(`${t}/chat/completions`, { method: "POST", headers: { ...I(e), Accept: "text/event-stream" }, body: JSON.stringify({ ...p, model: r, messages: n, stream: true }), ...i ? { signal: i } : {} });
  if (!u.ok) {
    const c = await M(u), a = new Error(L({ status: u.status, detail: c, modelId: r }));
    throw a.status = u.status, a.retryAfterSec = x(c, u.headers.get("retry-after")), a;
  }
  return H(u, o, i);
}
async function N(t) {
  let e = 0;
  for (; ; ) {
    d(t.signal);
    let r = false;
    try {
      return await Z({ ...t, onChunk: (n) => {
        var _a;
        r = true, (_a = t.onChunk) == null ? void 0 : _a.call(t, n);
      } });
    } catch (n) {
      if (_(n)) throw n;
      const s = n;
      if (!(!r && (s == null ? void 0 : s.status) === 429 && e < F && s.retryAfterSec && s.retryAfterSec <= 120)) throw n;
      e += 1, await D((s.retryAfterSec ?? 1) * 1e3, t.signal);
    }
  }
}
async function tt({ baseUrl: t, apiKey: e, model: r, instruction: n, systemPrompt: s, selectedText: o, images: i, requestOptions: p, onChunk: u, signal: c }) {
  const a = S(t), f = (r || g()).trim(), m = (n || "").trim(), y = (o || "").trim(), v = Array.isArray(i) ? i.filter((k) => (k == null ? void 0 : k.mimeType) && (k == null ? void 0 : k.dataBase64)) : [];
  if (!f) throw new Error("\uBAA8\uB378 ID\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBAA9\uB85D\uC5D0\uC11C \uC120\uD0DD\uD558\uC138\uC694.");
  if (!m) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
  d(c);
  const C = X({ instruction: m, systemPrompt: (s ?? "").trim(), selectedText: y, images: v });
  return N({ baseUrl: a, apiKey: e ?? "", modelId: f, messages: C, requestOptions: p ?? {}, ...u ? { onChunk: u } : {}, ...c ? { signal: c } : {} });
}
async function et({ baseUrl: t, apiKey: e, model: r, messages: n, systemPrompt: s, requestOptions: o, onChunk: i, signal: p }) {
  const u = S(t), c = (r || g()).trim();
  if (!c) throw new Error("\uBAA8\uB378 ID\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBAA9\uB85D\uC5D0\uC11C \uC120\uD0DD\uD558\uC138\uC694.");
  if (!Array.isArray(n) || n.length === 0) throw new Error("\uCC44\uD305 \uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694.");
  d(p);
  const a = (s ?? "").trim(), f = n.some((y) => y.role === "system"), m = a && !f ? [{ role: "system", content: a }, ...n] : n;
  return N({ baseUrl: u, apiKey: e ?? "", modelId: c, messages: m, requestOptions: o ?? {}, ...i ? { onChunk: i } : {}, ...p ? { signal: p } : {} });
}
const mt = Object.freeze(Object.defineProperty({ __proto__: null, generateOpenAiCompatibleTransform: tt, listOpenAiCompatibleModels: W, streamOpenAiCompatibleChat: et }, Symbol.toStringTag, { value: "Module" }));
export {
  A as L,
  ut as a,
  q as b,
  pt as c,
  b as d,
  it as e,
  st as f,
  tt as g,
  nt as h,
  _ as i,
  w as j,
  ot as k,
  W as l,
  et as m,
  O as n,
  mt as o,
  ct as p,
  at as r,
  D as s,
  d as t
};
