import { G as R, A as C } from "./vendor-google-genai-BsvcYwA0.js";
import { aV as I, aW as E, aX as P, __tla as __tla_0 } from "./index-Cc1jKdr9.js";
import { t as h, i as A, b as v, s as $, c as M } from "./openaiCompatibleClient-DDjC_ayR.js";
import { _ as k } from "./vendor-aws-hJDgVEKM.js";
import { e as y, __tla as __tla_1 } from "./bootSplash-Z2krRgC9.js";
let ct, x, at, ft;
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
  })()
]).then(async () => {
  const N = /* @__PURE__ */ new Set([
    "gemini-2.0-flash-lite"
  ]);
  x = function(t) {
    return N.has(String(t || "").trim());
  };
  function S(t) {
    const r = String(t || "").match(/retry in ([\d.]+)s/i);
    if (!r) return null;
    const n = Math.ceil(Number(r[1]));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  function F(t) {
    return /limit:\s*0/i.test(String(t || ""));
  }
  function O({ status: t, detail: e, modelId: r }) {
    const n = r ? ` (${r})` : "", o = S(e), i = F(e), s = r && x(r);
    if (t === 429) {
      const a = [
        `\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`
      ];
      return i || s ? a.push("", "\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uAC70\uB098 \uD560\uB2F9\uB7C9\uC774 0\uC785\uB2C8\uB2E4.", "Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash \uAC19\uC740 \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC720\uB8CC \uD50C\uB79C\xB7\uACB0\uC81C \uC815\uBCF4\uB294 Google AI Studio\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.") : a.push("", "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098, \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC0AC\uC6A9\uB7C9: https://ai.dev/rate-limit"), o && a.push("", `\uC57D ${o}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), a.join(`
`);
    }
    return t === 403 ? `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${e}` : `Gemini API \uC624\uB958 (${t})${n}: ${e}`;
  }
  const T = "https://generativelanguage.googleapis.com", p = "/api/gemini", U = "/v1beta", w = typeof globalThis.fetch == "function" ? globalThis.fetch.bind(globalThis) : fetch;
  let b = false;
  function j(t) {
    if (!(t.split("?")[0] ?? t).startsWith(`${U}/`)) throw new Error("Invalid Gemini API path.");
  }
  function D(t) {
    const e = t instanceof Error ? t.message : String(t);
    return /failed to fetch|networkerror|load failed|cors/i.test(e) ? y() ? [
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
`) : e || "Gemini API \uB124\uD2B8\uC6CC\uD06C \uC624\uB958";
  }
  function B(t) {
    return typeof t == "string" ? t : t instanceof URL ? t.href : t.url;
  }
  function H(t, e) {
    var _a;
    if (!(t == null ? void 0 : t.headers)) return;
    const r = t.headers;
    if (r instanceof Headers) return r.get(e) ?? void 0;
    if (Array.isArray(r)) return (_a = r.find(([o]) => o.toLowerCase() === e.toLowerCase())) == null ? void 0 : _a[1];
    for (const [n, o] of Object.entries(r)) if (n.toLowerCase() === e.toLowerCase()) return o;
  }
  function W(t) {
    var _a;
    try {
      const e = new URL(t, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost");
      return e.pathname === p || e.pathname.startsWith(`${p}/`);
    } catch {
      return t.startsWith(`${p}/`) || t.startsWith(`${p}?`);
    }
  }
  async function q(t) {
    if (t == null ? void 0 : t.body) {
      if (typeof t.body == "string") return t.body;
      if (t.body instanceof Blob) return t.body.text();
    }
  }
  function K() {
    var _a;
    const t = (_a = globalThis.location) == null ? void 0 : _a.origin;
    return typeof t == "string" && t.length > 0 ? t : "http://localhost";
  }
  function X() {
    return y() ? `${K()}${p}` : T;
  }
  function z() {
    b || !y() || (b = true, globalThis.fetch = Object.assign(async (t, e) => {
      var _a;
      const r = B(t);
      if (!W(r)) return w(t, e);
      const n = new URL(r, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost"), o = `${n.pathname.replace(/^\/api\/gemini/, "")}${n.search}`, i = (e == null ? void 0 : e.method) ?? "GET", s = H(e, "x-goog-api-key") ?? "", a = await q(e);
      return V(o, {
        method: i,
        apiKey: s,
        ...a ? {
          body: a
        } : {}
      });
    }, w));
  }
  async function V(t, e) {
    j(t);
    const r = e.method ?? "GET";
    if (y()) {
      const { invoke: o } = await k(async () => {
        const { invoke: a } = await import("./core-BUhCcD2K.js");
        return {
          invoke: a
        };
      }, []), i = await o("gemini_api_fetch", {
        path: t,
        method: r,
        apiKey: e.apiKey,
        body: e.body ?? null
      }), s = new Headers();
      return i.contentType && s.set("content-type", i.contentType), new Response(i.body, {
        status: i.status,
        headers: s
      });
    }
    const n = {
      "x-goog-api-key": e.apiKey
    };
    e.body && (n["Content-Type"] = "application/json");
    try {
      const o = {
        method: r,
        headers: n
      };
      return e.body && (o.body = e.body), await w(`${T}${t}`, o);
    } catch (o) {
      throw new Error(D(o));
    }
  }
  const J = 1;
  function Z(t) {
    return String(t || "").replace(/^models\//, "");
  }
  function _(t) {
    return z(), new R({
      apiKey: t,
      httpOptions: {
        baseUrl: X()
      }
    });
  }
  function Q(t) {
    try {
      const e = JSON.parse(t.message);
      if (e && typeof e == "object") {
        const n = e.error;
        if (n && typeof n == "object") {
          const o = n.message;
          if (typeof o == "string" && o.trim()) return o;
        }
      }
    } catch {
    }
    return t.message;
  }
  function G(t, e) {
    if (t instanceof C) {
      const r = Q(t), n = new Error(O({
        status: t.status,
        detail: r,
        modelId: e
      }));
      return n.status = t.status, n.retryAfterSec = S(r), n;
    }
    return t instanceof Error ? t : new Error(String(t));
  }
  function Y(t) {
    if ((t.supportedActions ?? []).includes("generateContent")) return true;
    const r = t.supportedGenerationMethods;
    return Array.isArray(r) && r.includes("generateContent");
  }
  at = async function(t) {
    const e = _(t), r = [], n = await e.models.list({
      config: {
        pageSize: 100
      }
    });
    for (; ; ) {
      for (const o of n.page) {
        if (!Y(o)) continue;
        const i = Z(o.name);
        i && r.push({
          id: i,
          displayName: o.displayName || i
        });
      }
      if (!n.hasNextPage()) break;
      await n.nextPage();
    }
    return r.sort((o, i) => o.displayName.localeCompare(i.displayName, "ko"));
  };
  function tt({ instruction: t, selectedText: e, images: r }) {
    const n = Array.isArray(r) ? r : [], o = n.length > 0, i = n.map((s) => ({
      inlineData: {
        mimeType: s.mimeType,
        data: s.dataBase64
      }
    }));
    return i.push({
      text: v({
        instruction: t,
        selectedText: e,
        hasImages: o
      })
    }), i;
  }
  async function et(t, e, r, n = "", o = {}, i, s) {
    if (h(s), !r.length) throw new Error("\uCC44\uD305 \uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694.");
    const a = _(t), u = (n || "").trim(), c = M(o), f = await a.models.generateContentStream({
      model: e,
      contents: r,
      config: {
        ...c,
        ...u ? {
          systemInstruction: u
        } : {},
        ...s ? {
          abortSignal: s
        } : {}
      }
    });
    let l = "";
    for await (const g of f) {
      h(s);
      const m = g.text;
      typeof m != "string" || !m || (l = P(l, m), i == null ? void 0 : i(l));
    }
    h(s);
    const d = l.trim();
    if (!d) throw new Error("Gemini API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return d;
  }
  async function L(t, e, r, n = "", o = {}, i, s) {
    let a = 0;
    for (; ; ) {
      h(s);
      let u = false;
      try {
        return await et(t, e, r, n, o, (c) => {
          u = true, i == null ? void 0 : i(c);
        }, s);
      } catch (c) {
        if (A(c)) throw c;
        const f = G(c, e);
        if (!(!u && f.status === 429 && a < J && f.retryAfterSec && f.retryAfterSec <= 120)) throw f;
        a += 1, await $((f.retryAfterSec ?? 1) * 1e3, s);
      }
    }
  }
  ct = async function({ apiKey: t, model: e, instruction: r, systemPrompt: n, selectedText: o, images: i, requestOptions: s, onChunk: a, signal: u }) {
    const c = (e || I()).trim() || E, f = (r || "").trim(), l = (o || "").trim(), d = Array.isArray(i) ? i.filter((m) => (m == null ? void 0 : m.mimeType) && (m == null ? void 0 : m.dataBase64)) : [];
    if (!f) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    h(u);
    const g = tt({
      instruction: f,
      selectedText: l,
      images: d
    });
    try {
      return await L(t, c, [
        {
          role: "user",
          parts: g
        }
      ], (n || "").trim(), s || {}, a, u);
    } catch (m) {
      throw A(m) ? m : G(m, c);
    }
  };
  ft = async function({ apiKey: t, model: e, messages: r, systemPrompt: n, requestOptions: o, onChunk: i, signal: s }) {
    const a = (e || I()).trim() || E;
    if (!Array.isArray(r) || r.length === 0) throw new Error("\uCC44\uD305 \uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694.");
    h(s);
    const u = [];
    for (const c of r) {
      const f = String(c.content || "").trim();
      f && u.push({
        role: c.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: f
          }
        ]
      });
    }
    if (!u.length) throw new Error("\uCC44\uD305 \uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694.");
    try {
      return await L(t, a, u, (n || "").trim(), o || {}, i, s);
    } catch (c) {
      throw A(c) ? c : G(c, a);
    }
  };
});
export {
  __tla,
  ct as g,
  x as i,
  at as l,
  ft as s
};
