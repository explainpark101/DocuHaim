import { G as T, A as _ } from "./vendor-google-genai-BsvcYwA0.js";
import { aV as L, aW as R, aX as P, __tla as __tla_0 } from "./index-DBtagrQ1.js";
import { t as h, i as G, b as C, s as v, c as $ } from "./openaiCompatibleClient-DJu8S4oP.js";
import { _ as M } from "./vendor-aws-hJDgVEKM.js";
import { e as y, __tla as __tla_1 } from "./bootSplash-Z2krRgC9.js";
let ct, N, at;
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
  const k = /* @__PURE__ */ new Set([
    "gemini-2.0-flash-lite"
  ]);
  N = function(t) {
    return k.has(String(t || "").trim());
  };
  function b(t) {
    const r = String(t || "").match(/retry in ([\d.]+)s/i);
    if (!r) return null;
    const n = Math.ceil(Number(r[1]));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  function F(t) {
    return /limit:\s*0/i.test(String(t || ""));
  }
  function x({ status: t, detail: e, modelId: r }) {
    const n = r ? ` (${r})` : "", o = b(e), i = F(e), s = r && N(r);
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
  const I = "https://generativelanguage.googleapis.com", p = "/api/gemini", O = "/v1beta", A = typeof globalThis.fetch == "function" ? globalThis.fetch.bind(globalThis) : fetch;
  let w = false;
  function U(t) {
    if (!(t.split("?")[0] ?? t).startsWith(`${O}/`)) throw new Error("Invalid Gemini API path.");
  }
  function j(t) {
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
  function D(t) {
    return typeof t == "string" ? t : t instanceof URL ? t.href : t.url;
  }
  function B(t, e) {
    var _a;
    if (!(t == null ? void 0 : t.headers)) return;
    const r = t.headers;
    if (r instanceof Headers) return r.get(e) ?? void 0;
    if (Array.isArray(r)) return (_a = r.find(([o]) => o.toLowerCase() === e.toLowerCase())) == null ? void 0 : _a[1];
    for (const [n, o] of Object.entries(r)) if (n.toLowerCase() === e.toLowerCase()) return o;
  }
  function H(t) {
    var _a;
    try {
      const e = new URL(t, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost");
      return e.pathname === p || e.pathname.startsWith(`${p}/`);
    } catch {
      return t.startsWith(`${p}/`) || t.startsWith(`${p}?`);
    }
  }
  async function W(t) {
    if (t == null ? void 0 : t.body) {
      if (typeof t.body == "string") return t.body;
      if (t.body instanceof Blob) return t.body.text();
    }
  }
  function q() {
    var _a;
    const t = (_a = globalThis.location) == null ? void 0 : _a.origin;
    return typeof t == "string" && t.length > 0 ? t : "http://localhost";
  }
  function K() {
    return y() ? `${q()}${p}` : I;
  }
  function X() {
    w || !y() || (w = true, globalThis.fetch = Object.assign(async (t, e) => {
      var _a;
      const r = D(t);
      if (!H(r)) return A(t, e);
      const n = new URL(r, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost"), o = `${n.pathname.replace(/^\/api\/gemini/, "")}${n.search}`, i = (e == null ? void 0 : e.method) ?? "GET", s = B(e, "x-goog-api-key") ?? "", a = await W(e);
      return z(o, {
        method: i,
        apiKey: s,
        ...a ? {
          body: a
        } : {}
      });
    }, A));
  }
  async function z(t, e) {
    U(t);
    const r = e.method ?? "GET";
    if (y()) {
      const { invoke: o } = await M(async () => {
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
      return e.body && (o.body = e.body), await A(`${I}${t}`, o);
    } catch (o) {
      throw new Error(j(o));
    }
  }
  const V = 1;
  function J(t) {
    return String(t || "").replace(/^models\//, "");
  }
  function E(t) {
    return X(), new T({
      apiKey: t,
      httpOptions: {
        baseUrl: K()
      }
    });
  }
  function Z(t) {
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
  function S(t, e) {
    if (t instanceof _) {
      const r = Z(t), n = new Error(x({
        status: t.status,
        detail: r,
        modelId: e
      }));
      return n.status = t.status, n.retryAfterSec = b(r), n;
    }
    return t instanceof Error ? t : new Error(String(t));
  }
  function Q(t) {
    if ((t.supportedActions ?? []).includes("generateContent")) return true;
    const r = t.supportedGenerationMethods;
    return Array.isArray(r) && r.includes("generateContent");
  }
  at = async function(t) {
    const e = E(t), r = [], n = await e.models.list({
      config: {
        pageSize: 100
      }
    });
    for (; ; ) {
      for (const o of n.page) {
        if (!Q(o)) continue;
        const i = J(o.name);
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
  function Y({ instruction: t, selectedText: e, images: r }) {
    const n = Array.isArray(r) ? r : [], o = n.length > 0, i = n.map((s) => ({
      inlineData: {
        mimeType: s.mimeType,
        data: s.dataBase64
      }
    }));
    return i.push({
      text: C({
        instruction: t,
        selectedText: e,
        hasImages: o
      })
    }), i;
  }
  async function tt(t, e, r, n = "", o = {}, i, s) {
    h(s);
    const a = E(t), m = (n || "").trim(), c = $(o), f = await a.models.generateContentStream({
      model: e,
      contents: [
        {
          role: "user",
          parts: r
        }
      ],
      config: {
        ...c,
        ...m ? {
          systemInstruction: m
        } : {},
        ...s ? {
          abortSignal: s
        } : {}
      }
    });
    let l = "";
    for await (const g of f) {
      h(s);
      const u = g.text;
      typeof u != "string" || !u || (l = P(l, u), i == null ? void 0 : i(l));
    }
    h(s);
    const d = l.trim();
    if (!d) throw new Error("Gemini API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return d;
  }
  async function et(t, e, r, n = "", o = {}, i, s) {
    let a = 0;
    for (; ; ) {
      h(s);
      let m = false;
      try {
        return await tt(t, e, r, n, o, (c) => {
          m = true, i == null ? void 0 : i(c);
        }, s);
      } catch (c) {
        if (G(c)) throw c;
        const f = S(c, e);
        if (!(!m && f.status === 429 && a < V && f.retryAfterSec && f.retryAfterSec <= 120)) throw f;
        a += 1, await v((f.retryAfterSec ?? 1) * 1e3, s);
      }
    }
  }
  ct = async function({ apiKey: t, model: e, instruction: r, systemPrompt: n, selectedText: o, images: i, requestOptions: s, onChunk: a, signal: m }) {
    const c = (e || L()).trim() || R, f = (r || "").trim(), l = (o || "").trim(), d = Array.isArray(i) ? i.filter((u) => (u == null ? void 0 : u.mimeType) && (u == null ? void 0 : u.dataBase64)) : [];
    if (!f) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    h(m);
    const g = Y({
      instruction: f,
      selectedText: l,
      images: d
    });
    try {
      return await et(t, c, g, (n || "").trim(), s || {}, a, m);
    } catch (u) {
      throw G(u) ? u : S(u, c);
    }
  };
});
export {
  __tla,
  ct as g,
  N as i,
  at as l
};
