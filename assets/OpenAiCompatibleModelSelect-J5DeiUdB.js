import { r as c, j as a, u as Fe, __tla as __tla_0 } from "./vendor-react-BLJzfvPB.js";
import { G as Ue, A as qe } from "./vendor-google-genai-CCGW7xFw.js";
import { dB as Be, dC as ze, dD as ge, c8 as Xe, dE as de, c6 as Ke, dF as Je, dx as He, dG as We, ca as Ye, cY as Qe, cb as ue, dl as me, dH as Ze, dv as et, dw as tt, dz as rt, d1 as fe, dI as pe, i as nt, h as st, dJ as ot, c7 as at, __tla as __tla_1 } from "./index-CzDTh_Dm.js";
import { _ as it } from "./vendor-aws-Cvd3RhZI.js";
import { d as Y, a as H, __tla as __tla_2 } from "./bootSplash-QPCcRCUR.js";
import { L as B, J as se, D as ct, y as lt, z as dt, H as ut } from "./vendor-lucide--whUmDUa.js";
import { r as R, L as W, l as mt, w as ke, g as ft } from "./localLlmModelAliases-EglLH-3U.js";
import { R as pt, Y as ht, P as yt, C as xt } from "./vendor-radix-4pFcYp0u.js";
let _r, re, wr, Sr, kr, _e, ve, te, Er, F, Ar, xr, oe, yr, pr, he, hr, ie, gr, br, T;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  const bt = /* @__PURE__ */ new Set([
    "gemini-2.0-flash-lite"
  ]);
  oe = function(e) {
    return bt.has(String(e || "").trim());
  };
  function Ee(e) {
    const r = String(e || "").match(/retry in ([\d.]+)s/i);
    if (!r) return null;
    const n = Math.ceil(Number(r[1]));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  function gt(e) {
    return /limit:\s*0/i.test(String(e || ""));
  }
  function kt({ status: e, detail: t, modelId: r }) {
    const n = r ? ` (${r})` : "", s = Ee(t), o = gt(t), i = r && oe(r);
    if (e === 429) {
      const d = [
        `\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`
      ];
      return o || i ? d.push("", "\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uAC70\uB098 \uD560\uB2F9\uB7C9\uC774 0\uC785\uB2C8\uB2E4.", "Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash \uAC19\uC740 \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC720\uB8CC \uD50C\uB79C\xB7\uACB0\uC81C \uC815\uBCF4\uB294 Google AI Studio\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.") : d.push("", "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098, \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC0AC\uC6A9\uB7C9: https://ai.dev/rate-limit"), s && d.push("", `\uC57D ${s}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), d.join(`
`);
    }
    return e === 403 ? `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${t}` : `Gemini API \uC624\uB958 (${e})${n}: ${t}`;
  }
  _e = function({ instruction: e, selectedText: t, hasImages: r }) {
    const n = (e || "").trim(), s = (t || "").trim(), o = [
      n,
      "",
      "---"
    ];
    return r && s ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uC640 \uC544\uB798 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : r ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.") : s ? o.push("\uC544\uB798\uB294 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uC785\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : o.push("\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694."), o.join(`
`);
  };
  te = function(e = "LLM generation aborted") {
    if (typeof DOMException < "u") return new DOMException(e, "AbortError");
    const t = new Error(e);
    return t.name = "AbortError", t;
  };
  F = function(e) {
    return !e || typeof e != "object" ? false : e.name === "AbortError" ? true : typeof DOMException < "u" && e instanceof DOMException ? e.name === "AbortError" : false;
  };
  T = function(e) {
    if (e == null ? void 0 : e.aborted) throw e.reason != null && F(e.reason) || e.reason instanceof Error ? e.reason : te();
  };
  function we(e, t) {
    return new Promise((r, n) => {
      if (t == null ? void 0 : t.aborted) {
        n(F(t.reason) ? t.reason : te());
        return;
      }
      const s = setTimeout(() => {
        t == null ? void 0 : t.removeEventListener("abort", o), r();
      }, e), o = () => {
        clearTimeout(s), n(F(t == null ? void 0 : t.reason) ? t == null ? void 0 : t.reason : te());
      };
      t == null ? void 0 : t.addEventListener("abort", o, {
        once: true
      });
    });
  }
  let J;
  re = {
    temperature: 0.4
  };
  J = /* @__PURE__ */ new Set([
    "model",
    "messages",
    "stream",
    "stream_options",
    "systemInstruction",
    "system_instruction",
    "contents",
    "config"
  ]);
  pr = [
    "temperature",
    "top_p",
    "top_k",
    "min_p",
    "typical_p",
    "max_tokens",
    "max_completion_tokens",
    "n",
    "frequency_penalty",
    "presence_penalty",
    "repetition_penalty",
    "seed",
    "min_tokens",
    "stop",
    "stop_token_ids",
    "ignore_eos",
    "logprobs",
    "top_logprobs",
    "prompt_logprobs",
    "verbosity",
    "reasoning_effort",
    "thinking_token_budget",
    "include_reasoning",
    "use_beam_search",
    "length_penalty",
    "response_format",
    "user",
    "truncate_prompt_tokens",
    "truncation_side",
    "skip_special_tokens",
    "echo"
  ];
  function ae() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
  he = function() {
    return [
      {
        id: ae(),
        key: "temperature",
        valueText: "0.4"
      }
    ];
  };
  hr = function(e = "") {
    return {
      id: ae(),
      key: e,
      valueText: ""
    };
  };
  function Et(e) {
    const t = e.trim();
    if (!t) return "";
    try {
      return JSON.parse(t);
    } catch {
      return e;
    }
  }
  function _t(e) {
    if (typeof e == "string") {
      try {
        const t = JSON.parse(e);
        if (typeof t == "string") return JSON.stringify(t);
      } catch {
      }
      return e;
    }
    try {
      return JSON.stringify(e);
    } catch {
      return String(e);
    }
  }
  yr = function(e) {
    const t = {};
    for (const r of e) {
      const n = r.key.trim();
      !n || J.has(n) || (t[n] = Et(r.valueText));
    }
    return t;
  };
  xr = function(e) {
    if (!e || typeof e != "object" || Array.isArray(e)) return he();
    const t = Object.entries(e).filter(([r]) => r.trim() && !J.has(r)).map(([r, n]) => ({
      id: ae(),
      key: r,
      valueText: _t(n)
    }));
    return t.length ? t : he();
  };
  ie = function(e) {
    if (!e || typeof e != "object" || Array.isArray(e)) return {
      ...re
    };
    const t = {};
    for (const [r, n] of Object.entries(e)) {
      const s = r.trim();
      !s || J.has(s) || (t[s] = n);
    }
    return Object.keys(t).length ? t : {
      ...re
    };
  };
  br = function(e) {
    try {
      return `${JSON.stringify(e, null, 2)}
`;
    } catch {
      return `{
  "temperature": 0.4
}
`;
    }
  };
  gr = function(e) {
    const t = e.trim();
    if (!t) return {
      ok: true,
      options: {
        ...re
      }
    };
    try {
      const r = JSON.parse(t);
      return !r || typeof r != "object" || Array.isArray(r) ? {
        ok: false,
        error: "JSON must be an object of key/value pairs."
      } : {
        ok: true,
        options: ie(r)
      };
    } catch (r) {
      return {
        ok: false,
        error: r instanceof Error ? r.message : "Invalid JSON"
      };
    }
  };
  function Ae(e) {
    const t = ie(e), r = {};
    for (const [n, s] of Object.entries(t)) J.has(n) || (r[n] = s);
    return r;
  }
  const wt = {
    max_completion_tokens: "max_tokens",
    thinking_token_budget: "thinking_budget",
    include_reasoning: "enable_thinking"
  }, At = /* @__PURE__ */ new Set([
    "max_tokens",
    "temperature",
    "top_p",
    "min_p",
    "top_k",
    "typical_p",
    "repetition_penalty",
    "repetition_context_size",
    "logit_bias",
    "max_kv_size",
    "kv_bits",
    "kv_group_size",
    "kv_quant_scheme",
    "quantized_kv_start",
    "prefill_step_size",
    "skip_special_tokens",
    "thinking_budget",
    "thinking_end_token",
    "thinking_start_token",
    "enable_thinking",
    "verbose",
    "seed"
  ]), St = {
    max_tokens: 512,
    temperature: 0.4,
    top_p: 1,
    min_p: 0
  };
  kr = function(e) {
    const t = Ae(e), r = {
      ...St
    };
    for (const [n, s] of Object.entries(t)) {
      if (s === void 0) continue;
      const o = wt[n] ?? n;
      At.has(o) && (r[o] = s);
    }
    return r;
  };
  const Mt = {
    temperature: "temperature",
    top_p: "topP",
    topP: "topP",
    top_k: "topK",
    topK: "topK",
    max_tokens: "maxOutputTokens",
    max_completion_tokens: "maxOutputTokens",
    maxOutputTokens: "maxOutputTokens",
    stop: "stopSequences",
    stopSequences: "stopSequences",
    seed: "seed",
    n: "candidateCount",
    candidateCount: "candidateCount",
    presence_penalty: "presencePenalty",
    presencePenalty: "presencePenalty",
    frequency_penalty: "frequencyPenalty",
    frequencyPenalty: "frequencyPenalty",
    response_mime_type: "responseMimeType",
    responseMimeType: "responseMimeType"
  };
  function Lt(e) {
    const t = ie(e), r = {};
    for (const [n, s] of Object.entries(t)) {
      if (J.has(n)) continue;
      const o = Mt[n] ?? n;
      r[o] = s;
    }
    return r;
  }
  const Se = "https://generativelanguage.googleapis.com", K = "/api/gemini", vt = "/v1beta", ne = typeof globalThis.fetch == "function" ? globalThis.fetch.bind(globalThis) : fetch;
  let ye = false;
  function Nt(e) {
    if (!(e.split("?")[0] ?? e).startsWith(`${vt}/`)) throw new Error("Invalid Gemini API path.");
  }
  function jt(e) {
    const t = e instanceof Error ? e.message : String(e);
    return /failed to fetch|networkerror|load failed|cors/i.test(t) ? Y() ? [
      "Gemini API\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      "",
      "\uB124\uD2B8\uC6CC\uD06C \uC5F0\uACB0\uC744 \uD655\uC778\uD558\uC138\uC694."
    ].join(`
`) : [
      "Gemini API\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      "",
      "Google AI Studio API \uD0A4\uC640 \uB124\uD2B8\uC6CC\uD06C \uC5F0\uACB0\uC744 \uD655\uC778\uD558\uC138\uC694.",
      "\uBE0C\uB77C\uC6B0\uC800 \uBCF4\uC548 \uC815\uCC45(CORS)\uC73C\uB85C \uCC28\uB2E8\uB41C \uACBD\uC6B0 Google API \uBB38\uC11C\uB97C \uD655\uC778\uD558\uC138\uC694."
    ].join(`
`) : t || "Gemini API \uB124\uD2B8\uC6CC\uD06C \uC624\uB958";
  }
  function It(e) {
    return typeof e == "string" ? e : e instanceof URL ? e.href : e.url;
  }
  function Ot(e, t) {
    var _a;
    if (!(e == null ? void 0 : e.headers)) return;
    const r = e.headers;
    if (r instanceof Headers) return r.get(t) ?? void 0;
    if (Array.isArray(r)) return (_a = r.find(([s]) => s.toLowerCase() === t.toLowerCase())) == null ? void 0 : _a[1];
    for (const [n, s] of Object.entries(r)) if (n.toLowerCase() === t.toLowerCase()) return s;
  }
  function Tt(e) {
    var _a;
    try {
      const t = new URL(e, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost");
      return t.pathname === K || t.pathname.startsWith(`${K}/`);
    } catch {
      return e.startsWith(`${K}/`) || e.startsWith(`${K}?`);
    }
  }
  async function Ct(e) {
    if (e == null ? void 0 : e.body) {
      if (typeof e.body == "string") return e.body;
      if (e.body instanceof Blob) return e.body.text();
    }
  }
  function Rt() {
    var _a;
    const e = (_a = globalThis.location) == null ? void 0 : _a.origin;
    return typeof e == "string" && e.length > 0 ? e : "http://localhost";
  }
  function Gt() {
    return Y() ? `${Rt()}${K}` : Se;
  }
  function Pt() {
    ye || !Y() || (ye = true, globalThis.fetch = Object.assign(async (e, t) => {
      var _a;
      const r = It(e);
      if (!Tt(r)) return ne(e, t);
      const n = new URL(r, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost"), s = `${n.pathname.replace(/^\/api\/gemini/, "")}${n.search}`, o = (t == null ? void 0 : t.method) ?? "GET", i = Ot(t, "x-goog-api-key") ?? "", d = await Ct(t);
      return Dt(s, {
        method: o,
        apiKey: i,
        ...d ? {
          body: d
        } : {}
      });
    }, ne));
  }
  async function Dt(e, t) {
    Nt(e);
    const r = t.method ?? "GET";
    if (Y()) {
      const { invoke: s } = await it(async () => {
        const { invoke: d } = await import("./core-DhEqZVGG.js");
        return {
          invoke: d
        };
      }, []), o = await s("gemini_api_fetch", {
        path: e,
        method: r,
        apiKey: t.apiKey,
        body: t.body ?? null
      }), i = new Headers();
      return o.contentType && i.set("content-type", o.contentType), new Response(o.body, {
        status: o.status,
        headers: i
      });
    }
    const n = {
      "x-goog-api-key": t.apiKey
    };
    t.body && (n["Content-Type"] = "application/json");
    try {
      const s = {
        method: r,
        headers: n
      };
      return t.body && (s.body = t.body), await ne(`${Se}${e}`, s);
    } catch (s) {
      throw new Error(jt(s));
    }
  }
  const Vt = 1;
  function $t(e) {
    return String(e || "").replace(/^models\//, "");
  }
  function Me(e) {
    return Pt(), new Ue({
      apiKey: e,
      httpOptions: {
        baseUrl: Gt()
      }
    });
  }
  function Ft(e) {
    try {
      const t = JSON.parse(e.message);
      if (t && typeof t == "object") {
        const n = t.error;
        if (n && typeof n == "object") {
          const s = n.message;
          if (typeof s == "string" && s.trim()) return s;
        }
      }
    } catch {
    }
    return e.message;
  }
  function Le(e, t) {
    if (e instanceof qe) {
      const r = Ft(e), n = new Error(kt({
        status: e.status,
        detail: r,
        modelId: t
      }));
      return n.status = e.status, n.retryAfterSec = Ee(r), n;
    }
    return e instanceof Error ? e : new Error(String(e));
  }
  function Ut(e) {
    if ((e.supportedActions ?? []).includes("generateContent")) return true;
    const r = e.supportedGenerationMethods;
    return Array.isArray(r) && r.includes("generateContent");
  }
  async function qt(e) {
    const t = Me(e), r = [], n = await t.models.list({
      config: {
        pageSize: 100
      }
    });
    for (; ; ) {
      for (const s of n.page) {
        if (!Ut(s)) continue;
        const o = $t(s.name);
        o && r.push({
          id: o,
          displayName: s.displayName || o
        });
      }
      if (!n.hasNextPage()) break;
      await n.nextPage();
    }
    return r.sort((s, o) => s.displayName.localeCompare(o.displayName, "ko"));
  }
  function Bt({ instruction: e, selectedText: t, images: r }) {
    const n = Array.isArray(r) ? r : [], s = n.length > 0, o = n.map((i) => ({
      inlineData: {
        mimeType: i.mimeType,
        data: i.dataBase64
      }
    }));
    return o.push({
      text: _e({
        instruction: e,
        selectedText: t,
        hasImages: s
      })
    }), o;
  }
  async function zt(e, t, r, n = "", s = {}, o, i) {
    T(i);
    const d = Me(e), m = (n || "").trim(), l = Lt(s), u = await d.models.generateContentStream({
      model: t,
      contents: [
        {
          role: "user",
          parts: r
        }
      ],
      config: {
        ...l,
        ...m ? {
          systemInstruction: m
        } : {},
        ...i ? {
          abortSignal: i
        } : {}
      }
    });
    let h = "";
    for await (const g of u) {
      T(i);
      const b = g.text;
      typeof b != "string" || !b || (h = ge(h, b), o == null ? void 0 : o(h));
    }
    T(i);
    const x = h.trim();
    if (!x) throw new Error("Gemini API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return x;
  }
  async function Xt(e, t, r, n = "", s = {}, o, i) {
    let d = 0;
    for (; ; ) {
      T(i);
      let m = false;
      try {
        return await zt(e, t, r, n, s, (l) => {
          m = true, o == null ? void 0 : o(l);
        }, i);
      } catch (l) {
        if (F(l)) throw l;
        const u = Le(l, t);
        if (!(!m && u.status === 429 && d < Vt && u.retryAfterSec && u.retryAfterSec <= 120)) throw u;
        d += 1, await we((u.retryAfterSec ?? 1) * 1e3, i);
      }
    }
  }
  Er = async function({ apiKey: e, model: t, instruction: r, systemPrompt: n, selectedText: s, images: o, requestOptions: i, onChunk: d, signal: m }) {
    const l = (t || Be()).trim() || ze, u = (r || "").trim(), h = (s || "").trim(), x = Array.isArray(o) ? o.filter((b) => (b == null ? void 0 : b.mimeType) && (b == null ? void 0 : b.dataBase64)) : [];
    if (!u) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    T(m);
    const g = Bt({
      instruction: u,
      selectedText: h,
      images: x
    });
    try {
      return await Xt(e, l, g, (n || "").trim(), i || {}, d, m);
    } catch (b) {
      throw F(b) ? b : Le(b, l);
    }
  };
  let ee = null, xe = null, $ = null;
  function Kt(e) {
    return oe(e.id) ? `${e.displayName} (\uBB34\uB8CC \uD50C\uB79C \uBBF8\uC9C0\uC6D0)` : e.displayName;
  }
  function q(e, t) {
    const r = /* @__PURE__ */ new Map();
    for (const n of e) r.set(n.id, n);
    return t && !r.has(t) && r.set(t, {
      id: t,
      displayName: t
    }), [
      ...r.values()
    ].sort((n, s) => n.displayName.localeCompare(s.displayName, "ko"));
  }
  _r = function({ getGeminiApiKey: e, profileId: t = "gemini", value: r, onChange: n, autoLoad: s = false, className: o = "" }) {
    var _a;
    const i = c.useRef(e);
    i.current = e;
    const d = c.useRef(r);
    c.useEffect(() => {
      d.current = r;
    }, [
      r
    ]);
    const [m, l] = c.useState(() => q(de, r)), [u, h] = c.useState(false), [x, g] = c.useState(""), b = c.useCallback(async ({ force: f = false } = {}) => {
      var _a2;
      const A = i.current;
      if (typeof A != "function") {
        g("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const L = (_a2 = await Promise.resolve(A())) == null ? void 0 : _a2.trim();
      if (!L) {
        g("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return;
      }
      h(true), g("");
      try {
        if (!f && ee && xe === L) {
          l(q(ee, d.current));
          return;
        }
        if ($ && $.key === L) {
          const j = await $.promise;
          l(q(j, d.current));
          return;
        }
        const E = Xe(t, A, (j) => qt(j));
        $ = {
          key: L,
          promise: E
        };
        const N = await E;
        ee = N, xe = L, l(q(N, d.current));
      } catch (E) {
        g((E == null ? void 0 : E.message) || "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), l(q(de, d.current));
      } finally {
        h(false), $ && $.key === L && ($ = null);
      }
    }, [
      t
    ]);
    c.useEffect(() => {
      l((f) => q(f, r));
    }, [
      r
    ]), c.useEffect(() => {
      s && b();
    }, [
      s,
      b
    ]);
    const S = (f) => {
      Ke(f), n == null ? void 0 : n(f);
    }, M = m.some((f) => f.id === r) ? r : ((_a = m[0]) == null ? void 0 : _a.id) ?? "";
    return a.jsxs("div", {
      className: o,
      children: [
        a.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            a.jsx("select", {
              value: M,
              onChange: (f) => S(f.target.value),
              className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: m.map((f) => a.jsx("option", {
                value: f.id,
                children: Kt(f)
              }, f.id))
            }),
            a.jsxs("button", {
              type: "button",
              onClick: () => {
                b({
                  force: true
                });
              },
              disabled: u,
              className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
              title: "AI Studio \uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68",
              children: [
                u ? a.jsx(B, {
                  size: 14,
                  className: "animate-spin"
                }) : a.jsx(se, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            })
          ]
        }),
        x && a.jsx("p", {
          className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300",
          children: x
        }),
        oe(r) && a.jsx("p", {
          className: "mt-1.5 text-[11px] text-amber-700 dark:text-amber-300",
          children: "\uC774 \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uD560\uB2F9\uB7C9\uC774 0\uC77C \uC218 \uC788\uC2B5\uB2C8\uB2E4. Gemini 2.0 Flash \uC0AC\uC6A9\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4."
        })
      ]
    });
  };
  ve = function({ value: e, onChange: t, onPick: r, onInputBlur: n, options: s, loading: o = false, placeholder: i = "", className: d = "", maxItems: m = 30, aliasScope: l }) {
    const [u, h] = c.useState(false), [x, g] = c.useState(false), [b, S] = c.useState(""), M = c.useRef(null), f = c.useMemo(() => R(l, e, s), [
      l,
      s,
      e
    ]), A = c.useMemo(() => s.find((p) => p.id === f), [
      f,
      s
    ]), L = (A == null ? void 0 : A.displayName) || f, E = x ? b : L, N = String(E || "").trim().toLowerCase(), j = c.useCallback((p) => {
      const _ = R(l, p, s);
      return _ !== f && (t == null ? void 0 : t(_)), _;
    }, [
      l,
      f,
      t,
      s
    ]), w = c.useMemo(() => (N ? s.filter((_) => {
      const Q = (_.id || "").toLowerCase(), Z = (_.displayName || "").toLowerCase();
      return Q.includes(N) || Z.includes(N);
    }) : [
      ...s
    ]).slice(0, Math.max(1, m)), [
      s,
      N,
      m
    ]), k = c.useCallback((p) => {
      const _ = R(l, p, s);
      S(_), g(false), _ !== f && (t == null ? void 0 : t(_)), r == null ? void 0 : r(_), h(false);
    }, [
      l,
      f,
      t,
      r,
      s
    ]), G = c.useCallback((p) => {
      var _a;
      return p instanceof Node ? !!((_a = M.current) == null ? void 0 : _a.contains(p)) : false;
    }, []), I = !o && (N ? w.length === 0 : s.length === 0), z = N ? "\uC77C\uCE58\uD558\uB294 \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.";
    return a.jsxs(pt, {
      open: u,
      onOpenChange: h,
      modal: false,
      children: [
        a.jsx(ht, {
          asChild: true,
          children: a.jsx("input", {
            ref: M,
            type: "text",
            autoComplete: "off",
            spellCheck: false,
            value: E,
            onFocus: () => {
              g(true), S(f), h(true);
            },
            onChange: (p) => {
              S(p.target.value), u || h(true);
            },
            onBlur: () => {
              g(false), j(b), S(""), n == null ? void 0 : n();
            },
            placeholder: i,
            "aria-label": (A == null ? void 0 : A.displayName) && A.displayName !== f ? "\uBAA8\uB378" : "\uBAA8\uB378 ID",
            "aria-expanded": u,
            "aria-haspopup": "listbox",
            className: `min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft ${d}`.trim()
          })
        }),
        a.jsx(yt, {
          children: a.jsx(xt, {
            className: "z-100050 max-h-72 min-w-48 overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            side: "bottom",
            align: "start",
            sideOffset: 4,
            onOpenAutoFocus: (p) => p.preventDefault(),
            onCloseAutoFocus: (p) => p.preventDefault(),
            onFocusOutside: (p) => {
              (document.activeElement === M.current || G(p.target)) && p.preventDefault();
            },
            onPointerDownOutside: (p) => {
              G(p.target) && p.preventDefault();
            },
            onInteractOutside: (p) => {
              G(p.target) && p.preventDefault();
            },
            children: o ? a.jsx("div", {
              className: "px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
              children: "\uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            }) : I ? a.jsx("div", {
              className: "cursor-default select-none rounded px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
              children: z
            }) : a.jsx("ul", {
              role: "listbox",
              "aria-label": "\uBAA8\uB378 \uBAA9\uB85D",
              children: w.map((p) => a.jsx("li", {
                children: a.jsx("button", {
                  type: "button",
                  role: "option",
                  "aria-selected": p.id === f,
                  onMouseDown: (_) => _.preventDefault(),
                  onClick: () => k(p.id),
                  className: "flex w-full cursor-pointer select-none items-center rounded px-2 py-1.5 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg",
                  children: p.displayName
                })
              }, p.id))
            })
          })
        })
      ]
    });
  };
  function Jt({ error: e, modelId: t = "", suggestRedownload: r = true, className: n = "" }) {
    const s = Fe(), o = t.trim(), i = r && Je(e), d = () => {
      He(o || void 0), s(We);
    };
    return a.jsxs("div", {
      className: n,
      children: [
        a.jsx("p", {
          className: "text-[11px] text-red-600 dark:text-red-400",
          children: e
        }),
        i ? a.jsxs("div", {
          className: "mt-1.5 rounded border border-amber-200 bg-amber-50/80 p-2 dark:border-amber-900/50 dark:bg-amber-950/30",
          children: [
            a.jsxs("p", {
              className: "text-[11px] leading-relaxed text-amber-900 dark:text-amber-100",
              children: [
                "\uCE90\uC2DC\uAC00 \uC190\uC0C1\uB418\uC5C8\uAC70\uB098 \uB2E4\uC6B4\uB85C\uB4DC\uAC00 \uB04A\uACBC\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uBAA8\uB378\uC744",
                " ",
                a.jsx("strong", {
                  className: "font-semibold",
                  children: "\uB2E4\uC2DC \uB2E4\uC6B4\uB85C\uB4DC"
                }),
                "\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD574 \uBCF4\uC138\uC694.",
                o ? a.jsxs(a.Fragment, {
                  children: [
                    a.jsx("br", {}),
                    a.jsxs("span", {
                      className: "text-amber-800/90 dark:text-amber-200/90",
                      children: [
                        "\uBAA8\uB378: ",
                        o
                      ]
                    })
                  ]
                }) : null
              ]
            }),
            a.jsxs("button", {
              type: "button",
              onClick: d,
              className: "mt-1.5 inline-flex items-center gap-1 rounded border border-amber-300 bg-white px-2 py-1 text-[11px] font-medium text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100 dark:hover:bg-amber-950/70",
              children: [
                a.jsx(ct, {
                  size: 12,
                  "aria-hidden": true
                }),
                "\uC124\uC815\uC5D0\uC11C \uBAA8\uB378 \uB2E4\uC2DC \uB2E4\uC6B4\uB85C\uB4DC"
              ]
            })
          ]
        }) : null
      ]
    });
  }
  function be(e, t) {
    const r = /* @__PURE__ */ new Set();
    for (const n of e) {
      const s = String(n.repoId || n.id || "").trim();
      s && r.add(s);
    }
    for (const n of t) {
      const s = String(n || "").trim();
      s && r.add(s);
    }
    return ke("mlx-vlm", [
      ...r
    ].sort((n, s) => n.localeCompare(s)).map((n) => ({
      id: n,
      displayName: n
    })));
  }
  wr = function({ value: e, onChange: t, autoLoad: r = true, autoLoadModelOnSelect: n = false, className: s = "" }) {
    const [o, i] = c.useState([]), [d, m] = c.useState(false), [l, u] = c.useState(false), [h, x] = c.useState(false), [g, b] = c.useState(""), [S, M] = c.useState(""), [f, A] = c.useState(""), [L, E] = c.useState(false), [N, j] = c.useState(false), w = c.useRef(0), k = c.useMemo(() => R("mlx-vlm", e, o), [
      o,
      e
    ]), G = c.useCallback((y) => {
      t == null ? void 0 : t(R("mlx-vlm", y, o));
    }, [
      t,
      o
    ]);
    c.useEffect(() => {
      !t || !k || k === e.trim() || t(k);
    }, [
      k,
      t,
      e
    ]);
    const I = c.useCallback(async () => {
      if (H()) {
        m(true), b("");
        try {
          const y = Ye(), [{ models: v }, C] = await Promise.all([
            Qe(),
            ue(y)
          ]);
          A(C.models[0] || ""), E(me());
          const O = be(v, [
            y.selectedModelId,
            ...C.models
          ]), U = R("mlx-vlm", e, O);
          i(be(v, [
            y.selectedModelId,
            U,
            ...C.models
          ])), !v.length && !y.selectedModelId.trim() && !U.trim() && b("\uC124\uCE58\uB41C MLX \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 > MLX-VLM\uC5D0\uC11C \uBAA8\uB378\uC744 \uCD94\uAC00\uD558\uC138\uC694.");
        } catch (y) {
          b(y instanceof Error ? y.message : "MLX \uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        } finally {
          m(false);
        }
      }
    }, [
      e
    ]), z = c.useCallback(async (y) => {
      if (!H()) return;
      const v = String(y || "").trim();
      if (!v) return;
      const C = await ue();
      if (C.running && C.models[0] === v) {
        A(v), M("");
        return;
      }
      const O = w.current + 1;
      w.current = O, u(true), M("");
      try {
        const U = await Ze(v);
        if (w.current !== O) return;
        A(U.model), et(), await I();
      } catch (U) {
        if (w.current !== O) return;
        M(tt(U).message);
      } finally {
        w.current === O && u(false);
      }
    }, [
      I
    ]), p = c.useCallback(async () => {
      if (H()) {
        x(true), M("");
        try {
          await rt(), A(""), E(false), await I();
        } catch (y) {
          M(y instanceof Error ? y.message : "MLX-VLM \uBAA8\uB378\uC744 \uC5B8\uB85C\uB4DC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        } finally {
          x(false);
        }
      }
    }, [
      I
    ]), _ = c.useCallback((y) => {
      n && z(y);
    }, [
      n,
      z
    ]);
    c.useEffect(() => {
      r && I();
    }, [
      r,
      I
    ]), c.useEffect(() => {
      const y = () => {
        I();
      };
      return window.addEventListener(fe, y), window.addEventListener(W, y), () => {
        window.removeEventListener(fe, y), window.removeEventListener(W, y);
      };
    }, [
      I
    ]), c.useEffect(() => {
      const y = (v) => {
        var _a;
        const C = (_a = v.detail) == null ? void 0 : _a.modelId;
        if (C == null) {
          A(""), E(false);
          return;
        }
        const O = String(C).trim();
        A(O), E(me()), !e.trim() && O && (t == null ? void 0 : t(O));
      };
      return window.addEventListener(pe, y), () => window.removeEventListener(pe, y);
    }, [
      t,
      e
    ]), c.useEffect(() => {
      !f || e.trim() || (t == null ? void 0 : t(f));
    }, [
      f,
      t,
      e
    ]), c.useEffect(() => {
      if (!n || d || l) return;
      const y = k.trim();
      y && o.some((v) => v.id === y) && _(y);
    }, [
      n,
      d,
      l,
      _,
      o,
      k
    ]);
    const Q = c.useCallback((y) => {
      const v = R("mlx-vlm", y, o);
      _(v);
    }, [
      _,
      o
    ]), Z = c.useCallback(() => {
      _(k);
    }, [
      k,
      _
    ]), Re = c.useCallback(() => {
      j(false), p();
    }, [
      p
    ]);
    if (!H()) return a.jsx("p", {
      className: "text-[11px] text-gray-500 dark:text-odp-muted",
      children: "MLX-VLM\uC740 Tauri macOS \uBE4C\uB4DC\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
    });
    const Ge = d || l || h, V = k.trim(), P = f.trim(), ce = !!(V && P && V === P), le = !!(P && V && P !== V), Pe = !!(P && (ce || le)), X = ce && !!(P && L), De = () => {
      if (X) {
        j(true);
        return;
      }
      z(V);
    }, Ve = h || !X && !V, $e = X ? "Unload MLX model" : "Load MLX model";
    return a.jsxs("div", {
      className: s,
      children: [
        a.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            a.jsx(ve, {
              value: k,
              options: o,
              loading: d,
              maxItems: 200,
              aliasScope: "mlx-vlm",
              onChange: G,
              onPick: Q,
              onInputBlur: Z,
              placeholder: "MLX model id",
              className: "min-w-0 flex-1"
            }),
            a.jsx("button", {
              type: "button",
              onClick: De,
              disabled: Ve,
              "aria-label": $e,
              className: [
                "group inline-flex shrink-0 items-center gap-1 rounded border px-2 py-1.5 text-[11px] font-medium",
                "disabled:cursor-not-allowed disabled:opacity-50",
                X ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:border-odp-borderStrong dark:hover:bg-odp-bgSoft dark:hover:text-odp-muted" : "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60"
              ].join(" "),
              children: h ? a.jsxs(a.Fragment, {
                children: [
                  a.jsx(B, {
                    size: 14,
                    className: "animate-spin",
                    "aria-hidden": true
                  }),
                  "\uC5B8\uB85C\uB4DC \uC911\u2026"
                ]
              }) : l ? a.jsxs(a.Fragment, {
                children: [
                  a.jsx(B, {
                    size: 14,
                    className: "animate-spin",
                    "aria-hidden": true
                  }),
                  "\uB85C\uB4DC \uC911\u2026"
                ]
              }) : X ? a.jsxs(a.Fragment, {
                children: [
                  a.jsxs("span", {
                    className: "inline-flex items-center gap-1 group-hover:hidden",
                    children: [
                      a.jsx(lt, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "\uB85C\uB4DC\uB428"
                    ]
                  }),
                  a.jsxs("span", {
                    className: "hidden items-center gap-1 group-hover:inline-flex",
                    children: [
                      a.jsx(dt, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "\uC5B8\uB85C\uB4DC"
                    ]
                  })
                ]
              }) : a.jsxs(a.Fragment, {
                children: [
                  a.jsx(ut, {
                    size: 14,
                    "aria-hidden": true
                  }),
                  "\uB85C\uB4DC"
                ]
              })
            }),
            a.jsx("button", {
              type: "button",
              onClick: () => {
                I();
              },
              disabled: Ge,
              "aria-label": "Refresh MLX models",
              className: "inline-flex shrink-0 items-center justify-center rounded border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft",
              children: d ? a.jsx(B, {
                size: 14,
                className: "animate-spin"
              }) : a.jsx(se, {
                size: 14
              })
            })
          ]
        }),
        g ? a.jsx("p", {
          className: "mt-1 text-[11px] text-amber-700 dark:text-amber-300",
          children: g
        }) : null,
        S ? a.jsx(Jt, {
          className: "mt-1",
          error: S,
          modelId: V
        }) : null,
        l ? a.jsxs("p", {
          className: "mt-1 inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted",
          children: [
            a.jsx(B, {
              size: 12,
              className: "animate-spin",
              "aria-hidden": true
            }),
            "\uBAA8\uB378 \uB85C\uB4DC \uC911\u2026"
          ]
        }) : Pe ? a.jsxs("div", {
          className: "mt-1 space-y-0.5",
          children: [
            a.jsxs("p", {
              className: "text-[11px] text-emerald-700 dark:text-emerald-300",
              children: [
                "\uB85C\uB4DC\uB428 \xB7 ",
                mt("mlx-vlm", P)
              ]
            }),
            le ? a.jsx("p", {
              className: "text-[11px] text-amber-700 dark:text-amber-300",
              children: "\uC120\uD0DD\uD55C \uBAA8\uB378\uACFC \uB2E4\uB985\uB2C8\uB2E4. \uB85C\uB4DC \uBC84\uD2BC\uC73C\uB85C \uC804\uD658\uD558\uC138\uC694."
            }) : null
          ]
        }) : P && !L ? a.jsx("p", {
          className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uC678\uBD80 MLX-VLM \uC6CC\uCEE4\uAC00 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC571\uC5D0\uC11C \uC2DC\uC791\uD55C \uBAA8\uB378\uB9CC \uC5B8\uB85C\uB4DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
        }) : a.jsx("p", {
          className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB85C\uB4DC \uBC84\uD2BC\uC744 \uB20C\uB7EC \uBA54\uBAA8\uB9AC\uC5D0 \uC62C\uB9AC\uC138\uC694."
        }),
        a.jsx(nt, {
          isOpen: N,
          title: "MLX-VLM \uBAA8\uB378 \uC5B8\uB85C\uB4DC",
          message: "\uB85C\uCEEC MLX-VLM \uC6CC\uCEE4\uC5D0\uC11C \uBAA8\uB378\uC744 \uBA54\uBAA8\uB9AC\uC5D0\uC11C \uB0B4\uB9B4\uAE4C\uC694?",
          confirmLabel: "\uC5B8\uB85C\uB4DC",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: Re,
          onCancel: () => j(false)
        })
      ]
    });
  };
  function Ne(e, t) {
    const r = Number.parseInt(String(t || "").trim(), 10);
    if (Number.isFinite(r) && r > 0) return r;
    const n = String(e || ""), s = n.match(/try again in ([\d.]+)\s*s/i) || n.match(/retry in ([\d.]+)s/i);
    if (!s) return null;
    const o = Math.ceil(Number(s[1]));
    return Number.isFinite(o) && o > 0 ? o : null;
  }
  function je({ status: e, detail: t, modelId: r }) {
    const n = r ? ` (${r})` : "", s = Ne(t);
    if (e === 401 || e === 403) return `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${t}`;
    if (e === 404) return `Endpoint \uB610\uB294 \uBAA8\uB378\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4${n}.
\uBCA0\uC774\uC2A4 URL\uC774 /v1 \uC744 \uD3EC\uD568\uD558\uB294\uC9C0, \uBAA8\uB378 ID\uAC00 \uB9DE\uB294\uC9C0 \uD655\uC778\uD558\uC138\uC694.

${t}`;
    if (e === 429) {
      const o = [
        `\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`,
        "",
        t
      ];
      return s && o.push("", `\uC57D ${s}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), o.join(`
`);
    }
    return `OpenAI \uD638\uD658 API \uC624\uB958 (${e})${n}: ${t}`;
  }
  function Ht(e) {
    const t = e instanceof Error ? e.message : String(e || "");
    return e instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(t) ? [
      "\uC11C\uBC84\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      "Endpoint URL\uACFC \uBE0C\uB77C\uC6B0\uC800 CORS \uD5C8\uC6A9 \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uC138\uC694.",
      "\uB85C\uCEEC \uC11C\uBC84(Ollama, LM Studio, vLLM \uB4F1)\uB294 \uBCF4\uD1B5 CORS\uB97C \uC9C1\uC811 \uC5F4\uC5B4\uC57C \uD569\uB2C8\uB2E4."
    ].join(`
`) : t || "OpenAI \uD638\uD658 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.";
  }
  const Wt = 1;
  function Ie(e) {
    const t = {
      "Content-Type": "application/json"
    }, r = String(e || "").trim();
    return r && (t.Authorization = `Bearer ${r}`), t;
  }
  function Oe(e) {
    const t = st(e);
    if (!t) throw new Error("OpenAI \uD638\uD658 Endpoint\uB97C \uC785\uB825\uD558\uC138\uC694. \uC608: https://api.openai.com/v1 \uB610\uB294 http://localhost:11434/v1");
    return t;
  }
  async function Te(e) {
    let t = e.statusText;
    try {
      const r = await e.json();
      if (r && typeof r == "object") {
        const n = r, s = n.error;
        if (typeof s == "string" && s.trim()) return s;
        if (s && typeof s == "object") {
          const o = s.message;
          if (typeof o == "string" && o.trim()) return o;
        }
        if (typeof n.message == "string" && n.message.trim()) return n.message;
      }
    } catch {
    }
    return t;
  }
  async function Ce(e, t) {
    try {
      return await fetch(e, t);
    } catch (r) {
      throw F(r) ? r : new Error(Ht(r));
    }
  }
  function D(e) {
    return !e || typeof e != "object" || Array.isArray(e) ? null : e;
  }
  function Yt(e) {
    if (typeof e == "string") return e.trim();
    const t = D(e);
    if (!t) return "";
    const r = t.id ?? t.name ?? t.model;
    return typeof r == "string" ? r.trim() : "";
  }
  function Qt(e, t) {
    const r = D(e);
    if (!r) return t;
    const n = r.display_name ?? r.displayName ?? r.id ?? r.name;
    return typeof n == "string" && n.trim() ? n.trim() : t;
  }
  async function Zt(e, t = "") {
    const r = Oe(e), n = await Ce(`${r}/models`, {
      headers: Ie(t)
    });
    if (!n.ok) {
      const l = await Te(n);
      throw new Error(je({
        status: n.status,
        detail: l
      }));
    }
    const s = await n.json(), o = D(s), i = o ? Array.isArray(o.data) ? o.data : Array.isArray(o.models) ? o.models : [] : Array.isArray(s) ? s : [], d = [], m = /* @__PURE__ */ new Set();
    for (const l of i) {
      const u = Yt(l);
      !u || m.has(u) || (m.add(u), d.push({
        id: u,
        displayName: Qt(l, u)
      }));
    }
    return d.sort((l, u) => l.displayName.localeCompare(u.displayName, "ko"));
  }
  function er({ instruction: e, systemPrompt: t, selectedText: r, images: n }) {
    const s = n.length > 0, o = _e({
      instruction: e,
      selectedText: r,
      hasImages: s
    }), i = [], d = (t || "").trim();
    if (d && i.push({
      role: "system",
      content: d
    }), !s) return i.push({
      role: "user",
      content: o
    }), i;
    const m = [
      {
        type: "text",
        text: o
      },
      ...n.map((l) => ({
        type: "image_url",
        image_url: {
          url: `data:${l.mimeType};base64,${l.dataBase64}`
        }
      }))
    ];
    return i.push({
      role: "user",
      content: m
    }), i;
  }
  function tr(e) {
    var _a;
    const t = D(e), r = t && Array.isArray(t.choices) ? t.choices : [], n = D(r[0]), o = ((_a = D(n == null ? void 0 : n.delta)) == null ? void 0 : _a.content) ?? (n == null ? void 0 : n.text);
    return typeof o == "string" ? o : Array.isArray(o) ? o.map((i) => {
      if (typeof i == "string") return i;
      const d = D(i);
      if (!d) return "";
      if (typeof d.text == "string") return d.text;
      const m = D(d.text);
      return typeof (m == null ? void 0 : m.value) == "string" ? m.value : "";
    }).filter(Boolean).join("") : "";
  }
  async function rr(e, t, r) {
    if (!e.body) throw new Error("OpenAI \uD638\uD658 API\uAC00 \uC2A4\uD2B8\uB9AC\uBC0D \uBCF8\uBB38\uC744 \uBC18\uD658\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    const n = e.body.getReader(), s = new TextDecoder();
    let o = "", i = "";
    const d = () => {
      n.cancel().catch(() => {
      });
    };
    r == null ? void 0 : r.addEventListener("abort", d, {
      once: true
    });
    const m = (l) => {
      const u = l.trim();
      if (!u || u === "[DONE]") return;
      let h;
      try {
        h = JSON.parse(u);
      } catch {
        return;
      }
      const x = tr(h);
      x && (i = ge(i, x), t == null ? void 0 : t(i));
    };
    try {
      for (; ; ) {
        T(r);
        const { done: u, value: h } = await n.read();
        if (u) break;
        o += s.decode(h, {
          stream: true
        });
        let x = o.indexOf(`
`);
        for (; x >= 0; ) {
          const g = o.slice(0, x).replace(/\r$/, "");
          o = o.slice(x + 1), g.startsWith("data:") && m(g.slice(5)), x = o.indexOf(`
`);
        }
      }
      if (o.trim()) {
        const u = o.trim();
        u.startsWith("data:") && m(u.slice(5));
      }
      T(r);
      const l = i.trim();
      if (!l) throw new Error("OpenAI \uD638\uD658 API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
      return l;
    } finally {
      r == null ? void 0 : r.removeEventListener("abort", d);
    }
  }
  async function nr({ baseUrl: e, apiKey: t, modelId: r, messages: n, requestOptions: s, onChunk: o, signal: i }) {
    T(i);
    const d = Ae(s), m = await Ce(`${e}/chat/completions`, {
      method: "POST",
      headers: {
        ...Ie(t),
        Accept: "text/event-stream"
      },
      body: JSON.stringify({
        ...d,
        model: r,
        messages: n,
        stream: true
      }),
      ...i ? {
        signal: i
      } : {}
    });
    if (!m.ok) {
      const l = await Te(m), u = new Error(je({
        status: m.status,
        detail: l,
        modelId: r
      }));
      throw u.status = m.status, u.retryAfterSec = Ne(l, m.headers.get("retry-after")), u;
    }
    return rr(m, o, i);
  }
  async function sr(e) {
    let t = 0;
    for (; ; ) {
      T(e.signal);
      let r = false;
      try {
        return await nr({
          ...e,
          onChunk: (n) => {
            var _a;
            r = true, (_a = e.onChunk) == null ? void 0 : _a.call(e, n);
          }
        });
      } catch (n) {
        if (F(n)) throw n;
        const s = n;
        if (!(!r && (s == null ? void 0 : s.status) === 429 && t < Wt && s.retryAfterSec && s.retryAfterSec <= 120)) throw n;
        t += 1, await we((s.retryAfterSec ?? 1) * 1e3, e.signal);
      }
    }
  }
  Ar = async function({ baseUrl: e, apiKey: t, model: r, instruction: n, systemPrompt: s, selectedText: o, images: i, requestOptions: d, onChunk: m, signal: l }) {
    const u = Oe(e), h = (r || ot()).trim(), x = (n || "").trim(), g = (o || "").trim(), b = Array.isArray(i) ? i.filter((M) => (M == null ? void 0 : M.mimeType) && (M == null ? void 0 : M.dataBase64)) : [];
    if (!h) throw new Error("\uBAA8\uB378 ID\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBAA9\uB85D\uC5D0\uC11C \uC120\uD0DD\uD558\uC138\uC694.");
    if (!x) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    T(l);
    const S = er({
      instruction: x,
      systemPrompt: (s ?? "").trim(),
      selectedText: g,
      images: b
    });
    return sr({
      baseUrl: u,
      apiKey: t ?? "",
      modelId: h,
      messages: S,
      requestOptions: d ?? {},
      ...m ? {
        onChunk: m
      } : {},
      ...l ? {
        signal: l
      } : {}
    });
  };
  Sr = function({ getBaseUrl: e, getApiKey: t, value: r, onChange: n, autoLoad: s = false, reloadKey: o = "", aliasScope: i, className: d = "" }) {
    const m = c.useRef(e), l = c.useRef(t);
    m.current = e, l.current = t;
    const [u, h] = c.useState([]), [x, g] = c.useState(false), [b, S] = c.useState(""), [M, f] = c.useState(0), A = c.useCallback(async () => {
      var _a, _b;
      const w = (_a = await Promise.resolve(m.current())) == null ? void 0 : _a.trim();
      if (!w) {
        S("Endpoint URL\uC744 \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      g(true), S("");
      try {
        const k = ((_b = await Promise.resolve(l.current())) == null ? void 0 : _b.trim()) ?? "", G = await Zt(w, k);
        h(G), G.length || S("\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.");
      } catch (k) {
        S(k instanceof Error ? k.message : "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        g(false);
      }
    }, []);
    c.useEffect(() => {
      h([]), S("");
    }, [
      o
    ]), c.useEffect(() => {
      s && A();
    }, [
      s,
      A,
      o
    ]), c.useEffect(() => {
      if (!i) return;
      const w = () => f((k) => k + 1);
      return window.addEventListener(W, w), () => window.removeEventListener(W, w);
    }, [
      i
    ]);
    const L = c.useMemo(() => i ? ke(i, u) : u, [
      i,
      M,
      u
    ]), E = c.useMemo(() => R(i, r, L), [
      i,
      L,
      r
    ]), N = c.useMemo(() => {
      if (!i) return "";
      const w = E;
      return w ? ft(i, w) : "";
    }, [
      i,
      M,
      E
    ]), j = (w) => {
      const k = R(i, w, L);
      at(k), n == null ? void 0 : n(k);
    };
    return c.useEffect(() => {
      !n || !E || E === r.trim() || n(E);
    }, [
      E,
      n,
      r
    ]), a.jsxs("div", {
      className: d,
      children: [
        a.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            a.jsx(ve, {
              value: E,
              onChange: j,
              options: L,
              loading: x,
              ...i ? {
                aliasScope: i
              } : {},
              placeholder: "\uBAA8\uB378 ID \uC9C1\uC811 \uC785\uB825 (\uC608: gpt-4o-mini)"
            }),
            a.jsxs("button", {
              type: "button",
              onClick: () => {
                A();
              },
              disabled: x,
              className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
              "aria-label": "\uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68",
              children: [
                x ? a.jsx(B, {
                  size: 14,
                  className: "animate-spin"
                }) : a.jsx(se, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            })
          ]
        }),
        N ? a.jsxs("p", {
          className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            "\uC6D0\uBCF8 ID \xB7 ",
            E
          ]
        }) : null,
        a.jsx("p", {
          className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uC11C\uBC84 \uBAA8\uB378\uC744 \uAC00\uC838\uC624\uAC70\uB098, \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694."
        }),
        b ? a.jsx("p", {
          className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300",
          children: b
        }) : null
      ]
    });
  };
});
export {
  _r as G,
  re as L,
  wr as M,
  Sr as O,
  __tla,
  kr as a,
  _e as b,
  ve as c,
  te as d,
  Er as e,
  F as f,
  Ar as g,
  xr as h,
  oe as i,
  yr as j,
  pr as k,
  he as l,
  hr as m,
  ie as n,
  gr as p,
  br as r,
  T as t
};
