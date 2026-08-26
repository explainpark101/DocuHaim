const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-siMg0SyX.js","assets/vendor-react-kfkzeLNk.js","assets/vendor-md-editor-DQ2k84v8.js","assets/vendor-aws-DjU81Y0s.js","assets/vendor-lucide-B9iB2q4-.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-9P87yVtW.js","assets/vendor-radix-CyZ5tkEq.js","assets/index-CqNGOs1m.css"])))=>i.map(i=>d[i]);
import { r as p, j as u, __tla as __tla_0 } from "./vendor-react-kfkzeLNk.js";
import { A as V, G as Z } from "./vendor-google-genai-BXoTgYIl.js";
import { K as N, a0 as Q, a1 as Y, a2 as ee, a3 as te, a4 as re, a5 as M, a6 as ne, a7 as se, __tla as __tla_1 } from "./index-siMg0SyX.js";
import { _ as oe, __tla as __tla_2 } from "./vendor-md-editor-DQ2k84v8.js";
import { L as O, R as $ } from "./vendor-lucide-B9iB2q4-.js";
import { h as ie, r as ae, j as ce, k as le } from "./vendor-radix-CyZ5tkEq.js";
let Ze, Qe, Je, Ve, G;
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
  const ue = /* @__PURE__ */ new Set([
    "gemini-2.0-flash-lite"
  ]);
  G = function(e) {
    return ue.has(String(e || "").trim());
  };
  function P(e) {
    const r = String(e || "").match(/retry in ([\d.]+)s/i);
    if (!r) return null;
    const n = Math.ceil(Number(r[1]));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  function de(e) {
    return /limit:\s*0/i.test(String(e || ""));
  }
  function fe({ status: e, detail: t, modelId: r }) {
    const n = r ? ` (${r})` : "", s = P(t), o = de(t), a = r && G(r);
    if (e === 429) {
      const i = [
        `\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`
      ];
      return o || a ? i.push("", "\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uAC70\uB098 \uD560\uB2F9\uB7C9\uC774 0\uC785\uB2C8\uB2E4.", "Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash \uAC19\uC740 \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC720\uB8CC \uD50C\uB79C\xB7\uACB0\uC81C \uC815\uBCF4\uB294 Google AI Studio\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.") : i.push("", "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098, \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC0AC\uC6A9\uB7C9: https://ai.dev/rate-limit"), s && i.push("", `\uC57D ${s}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), i.join(`
`);
    }
    return e === 403 ? `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${t}` : `Gemini API \uC624\uB958 (${e})${n}: ${t}`;
  }
  function _(e) {
    return new Promise((t) => {
      setTimeout(t, e);
    });
  }
  function F({ instruction: e, selectedText: t, hasImages: r }) {
    const n = (e || "").trim(), s = (t || "").trim(), o = [
      n,
      "",
      "---"
    ];
    return r && s ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uC640 \uC544\uB798 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : r ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.") : s ? o.push("\uC544\uB798\uB294 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uC785\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : o.push("\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694."), o.join(`
`);
  }
  const D = "https://generativelanguage.googleapis.com", I = "/api/gemini", me = "/v1beta", U = typeof globalThis.fetch == "function" ? globalThis.fetch.bind(globalThis) : fetch;
  let v = false;
  function pe(e) {
    if (!(e.split("?")[0] ?? e).startsWith(`${me}/`)) throw new Error("Invalid Gemini API path.");
  }
  function he(e) {
    const t = e instanceof Error ? e.message : String(e);
    return /failed to fetch|networkerror|load failed|cors/i.test(t) ? N() ? [
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
  function ye(e) {
    return typeof e == "string" ? e : e instanceof URL ? e.href : e.url;
  }
  function ge(e, t) {
    var _a;
    if (!(e == null ? void 0 : e.headers)) return;
    const r = e.headers;
    if (r instanceof Headers) return r.get(t) ?? void 0;
    if (Array.isArray(r)) return (_a = r.find(([s]) => s.toLowerCase() === t.toLowerCase())) == null ? void 0 : _a[1];
    for (const [n, s] of Object.entries(r)) if (n.toLowerCase() === t.toLowerCase()) return s;
  }
  function be(e) {
    var _a;
    try {
      const t = new URL(e, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost");
      return t.pathname === I || t.pathname.startsWith(`${I}/`);
    } catch {
      return e.startsWith(`${I}/`) || e.startsWith(`${I}?`);
    }
  }
  async function xe(e) {
    if (e == null ? void 0 : e.body) {
      if (typeof e.body == "string") return e.body;
      if (e.body instanceof Blob) return e.body.text();
    }
  }
  function we() {
    var _a;
    const e = (_a = globalThis.location) == null ? void 0 : _a.origin;
    return typeof e == "string" && e.length > 0 ? e : "http://localhost";
  }
  function Ae() {
    return N() ? `${we()}${I}` : D;
  }
  function Ee() {
    v || !N() || (v = true, globalThis.fetch = async (e, t) => {
      var _a;
      const r = ye(e);
      if (!be(r)) return U(e, t);
      const n = new URL(r, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost"), s = `${n.pathname.replace(/^\/api\/gemini/, "")}${n.search}`, o = (t == null ? void 0 : t.method) ?? "GET", a = ge(t, "x-goog-api-key") ?? "", i = await xe(t);
      return Se(s, {
        method: o,
        apiKey: a,
        ...i ? {
          body: i
        } : {}
      });
    });
  }
  async function Se(e, t) {
    pe(e);
    const r = t.method ?? "GET";
    if (N()) {
      const { invoke: s } = await oe(async () => {
        const { invoke: i } = await import("./index-siMg0SyX.js").then(async (m) => {
          await m.__tla;
          return m;
        }).then((c) => c.gt);
        return {
          invoke: i
        };
      }, __vite__mapDeps([0,1,2,3,4,5,6,7,8])), o = await s("gemini_api_fetch", {
        path: e,
        method: r,
        apiKey: t.apiKey,
        body: t.body ?? null
      }), a = new Headers();
      return o.contentType && a.set("content-type", o.contentType), new Response(o.body, {
        status: o.status,
        headers: a
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
      return t.body && (s.body = t.body), await U(`${D}${e}`, s);
    } catch (s) {
      throw new Error(he(s));
    }
  }
  const Ce = 1;
  function Ie(e) {
    return String(e || "").replace(/^models\//, "");
  }
  function B(e) {
    return Ee(), new Z({
      apiKey: e,
      httpOptions: {
        baseUrl: Ae()
      }
    });
  }
  function ke(e) {
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
  function z(e, t) {
    if (e instanceof V) {
      const r = ke(e), n = new Error(fe({
        status: e.status,
        detail: r,
        modelId: t
      }));
      return n.status = e.status, n.retryAfterSec = P(r), n;
    }
    return e instanceof Error ? e : new Error(String(e));
  }
  function Ne(e) {
    if ((e.supportedActions ?? []).includes("generateContent")) return true;
    const r = e.supportedGenerationMethods;
    return Array.isArray(r) && r.includes("generateContent");
  }
  async function Re(e) {
    const t = B(e), r = [], n = await t.models.list({
      config: {
        pageSize: 100
      }
    });
    for (; ; ) {
      for (const s of n.page) {
        if (!Ne(s)) continue;
        const o = Ie(s.name);
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
  function je({ instruction: e, selectedText: t, images: r }) {
    const n = Array.isArray(r) ? r : [], s = n.length > 0, o = n.map((a) => ({
      inlineData: {
        mimeType: a.mimeType,
        data: a.dataBase64
      }
    }));
    return o.push({
      text: F({
        instruction: e,
        selectedText: t,
        hasImages: s
      })
    }), o;
  }
  async function Ge(e, t, r) {
    const o = (await B(e).models.generateContent({
      model: t,
      contents: [
        {
          role: "user",
          parts: r
        }
      ],
      config: {
        temperature: 0.4
      }
    })).text;
    if (typeof o != "string" || !o.trim()) throw new Error("Gemini API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return o.trim();
  }
  async function Le(e, t, r) {
    let n = 0;
    for (; ; ) try {
      return await Ge(e, t, r);
    } catch (s) {
      const o = z(s, t);
      if (!(o.status === 429 && n < Ce && o.retryAfterSec && o.retryAfterSec <= 120)) throw o;
      n += 1, await _((o.retryAfterSec ?? 1) * 1e3);
    }
  }
  Je = async function({ apiKey: e, model: t, instruction: r, selectedText: n, images: s }) {
    const o = (t || Q()).trim() || Y, a = (r || "").trim(), i = (n || "").trim(), c = Array.isArray(s) ? s.filter((d) => (d == null ? void 0 : d.mimeType) && (d == null ? void 0 : d.dataBase64)) : [];
    if (!a) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    const l = je({
      instruction: a,
      selectedText: i,
      images: c
    });
    try {
      return await Le(e, o, l);
    } catch (d) {
      throw z(d, o);
    }
  };
  function K(e, t) {
    const r = Number.parseInt(String(t || "").trim(), 10);
    if (Number.isFinite(r) && r > 0) return r;
    const n = String(e || ""), s = n.match(/try again in ([\d.]+)\s*s/i) || n.match(/retry in ([\d.]+)s/i);
    if (!s) return null;
    const o = Math.ceil(Number(s[1]));
    return Number.isFinite(o) && o > 0 ? o : null;
  }
  function q({ status: e, detail: t, modelId: r }) {
    const n = r ? ` (${r})` : "", s = K(t);
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
  function Me(e) {
    const t = e instanceof Error ? e.message : String(e || "");
    return e instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(t) ? [
      "\uC11C\uBC84\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      "Endpoint URL\uACFC \uBE0C\uB77C\uC6B0\uC800 CORS \uD5C8\uC6A9 \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uC138\uC694.",
      "\uB85C\uCEEC \uC11C\uBC84(Ollama, LM Studio, vLLM \uB4F1)\uB294 \uBCF4\uD1B5 CORS\uB97C \uC9C1\uC811 \uC5F4\uC5B4\uC57C \uD569\uB2C8\uB2E4."
    ].join(`
`) : t || "OpenAI \uD638\uD658 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.";
  }
  const ve = 1;
  function H(e) {
    const t = {
      "Content-Type": "application/json"
    }, r = String(e || "").trim();
    return r && (t.Authorization = `Bearer ${r}`), t;
  }
  function W(e) {
    const t = te(e);
    if (!t) throw new Error("OpenAI \uD638\uD658 Endpoint\uB97C \uC785\uB825\uD558\uC138\uC694. \uC608: https://api.openai.com/v1 \uB610\uB294 http://localhost:11434/v1");
    return t;
  }
  async function X(e) {
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
  async function J(e, t) {
    try {
      return await fetch(e, t);
    } catch (r) {
      throw new Error(Me(r));
    }
  }
  function A(e) {
    return !e || typeof e != "object" || Array.isArray(e) ? null : e;
  }
  function Te(e) {
    if (typeof e == "string") return e.trim();
    const t = A(e);
    if (!t) return "";
    const r = t.id ?? t.name ?? t.model;
    return typeof r == "string" ? r.trim() : "";
  }
  function Oe(e, t) {
    const r = A(e);
    if (!r) return t;
    const n = r.display_name ?? r.displayName ?? r.id ?? r.name;
    return typeof n == "string" && n.trim() ? n.trim() : t;
  }
  async function $e(e, t = "") {
    const r = W(e), n = await J(`${r}/models`, {
      headers: H(t)
    });
    if (!n.ok) {
      const l = await X(n);
      throw new Error(q({
        status: n.status,
        detail: l
      }));
    }
    const s = await n.json(), o = A(s), a = o ? Array.isArray(o.data) ? o.data : Array.isArray(o.models) ? o.models : [] : Array.isArray(s) ? s : [], i = [], c = /* @__PURE__ */ new Set();
    for (const l of a) {
      const d = Te(l);
      !d || c.has(d) || (c.add(d), i.push({
        id: d,
        displayName: Oe(l, d)
      }));
    }
    return i.sort((l, d) => l.displayName.localeCompare(d.displayName, "ko"));
  }
  function Pe(e) {
    var _a;
    const t = A(e), r = t && Array.isArray(t.choices) ? t.choices : [], n = A(r[0]), o = ((_a = A(n == null ? void 0 : n.message)) == null ? void 0 : _a.content) ?? (n == null ? void 0 : n.text);
    if (typeof o == "string" && o.trim()) return o.trim();
    if (Array.isArray(o)) {
      const a = o.map((i) => {
        if (typeof i == "string") return i;
        const c = A(i);
        if (!c) return "";
        if (typeof c.text == "string") return c.text;
        const l = A(c.text);
        return typeof (l == null ? void 0 : l.value) == "string" ? l.value : "";
      }).filter(Boolean);
      if (a.length) return a.join(`
`).trim();
    }
    return "";
  }
  function _e({ instruction: e, selectedText: t, images: r }) {
    const n = r.length > 0, s = F({
      instruction: e,
      selectedText: t,
      hasImages: n
    });
    return n ? [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: s
          },
          ...r.map((a) => ({
            type: "image_url",
            image_url: {
              url: `data:${a.mimeType};base64,${a.dataBase64}`
            }
          }))
        ]
      }
    ] : [
      {
        role: "user",
        content: s
      }
    ];
  }
  async function Fe({ baseUrl: e, apiKey: t, modelId: r, messages: n }) {
    const s = await J(`${e}/chat/completions`, {
      method: "POST",
      headers: H(t),
      body: JSON.stringify({
        model: r,
        messages: n,
        temperature: 0.4
      })
    });
    if (!s.ok) {
      const i = await X(s), c = new Error(q({
        status: s.status,
        detail: i,
        modelId: r
      }));
      throw c.status = s.status, c.retryAfterSec = K(i, s.headers.get("retry-after")), c;
    }
    const o = await s.json(), a = Pe(o);
    if (!a) throw new Error("OpenAI \uD638\uD658 API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return a;
  }
  async function De(e) {
    let t = 0;
    for (; ; ) try {
      return await Fe(e);
    } catch (r) {
      const n = r;
      if (!((n == null ? void 0 : n.status) === 429 && t < ve && n.retryAfterSec && n.retryAfterSec <= 120)) throw r;
      t += 1, await _((n.retryAfterSec ?? 1) * 1e3);
    }
  }
  Ve = async function({ baseUrl: e, apiKey: t, model: r, instruction: n, selectedText: s, images: o }) {
    const a = W(e), i = (r || ee()).trim(), c = (n || "").trim(), l = (s || "").trim(), d = Array.isArray(o) ? o.filter((y) => (y == null ? void 0 : y.mimeType) && (y == null ? void 0 : y.dataBase64)) : [];
    if (!i) throw new Error("\uBAA8\uB378 ID\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBAA9\uB85D\uC5D0\uC11C \uC120\uD0DD\uD558\uC138\uC694.");
    if (!c) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    const h = _e({
      instruction: c,
      selectedText: l,
      images: d
    });
    return De({
      baseUrl: a,
      apiKey: t ?? "",
      modelId: i,
      messages: h
    });
  };
  let j = null, T = null, E = null;
  function Ue(e) {
    return G(e.id) ? `${e.displayName} (\uBB34\uB8CC \uD50C\uB79C \uBBF8\uC9C0\uC6D0)` : e.displayName;
  }
  function S(e, t) {
    const r = /* @__PURE__ */ new Map();
    for (const n of e) r.set(n.id, n);
    return t && !r.has(t) && r.set(t, {
      id: t,
      displayName: t
    }), [
      ...r.values()
    ].sort((n, s) => n.displayName.localeCompare(s.displayName, "ko"));
  }
  Ze = function({ getGeminiApiKey: e, profileId: t = "gemini", value: r, onChange: n, autoLoad: s = false, className: o = "" }) {
    var _a;
    const a = p.useRef(e);
    a.current = e;
    const i = p.useRef(r);
    p.useEffect(() => {
      i.current = r;
    }, [
      r
    ]);
    const [c, l] = p.useState(() => S(M, r)), [d, h] = p.useState(false), [y, b] = p.useState(""), f = p.useCallback(async ({ force: m = false } = {}) => {
      var _a2;
      const w = a.current;
      if (typeof w != "function") {
        b("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const x = (_a2 = await Promise.resolve(w())) == null ? void 0 : _a2.trim();
      if (!x) {
        b("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return;
      }
      h(true), b("");
      try {
        if (!m && j && T === x) {
          l(S(j, i.current));
          return;
        }
        if (E && E.key === x) {
          const R = await E.promise;
          l(S(R, i.current));
          return;
        }
        const k = re(t, w, (R) => Re(R));
        E = {
          key: x,
          promise: k
        };
        const L = await k;
        j = L, T = x, l(S(L, i.current));
      } catch (k) {
        b((k == null ? void 0 : k.message) || "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), l(S(M, i.current));
      } finally {
        h(false), E && E.key === x && (E = null);
      }
    }, [
      t
    ]);
    p.useEffect(() => {
      l((m) => S(m, r));
    }, [
      r
    ]), p.useEffect(() => {
      s && f();
    }, [
      s,
      f
    ]);
    const g = (m) => {
      ne(m), n == null ? void 0 : n(m);
    }, C = c.some((m) => m.id === r) ? r : ((_a = c[0]) == null ? void 0 : _a.id) ?? "";
    return u.jsxs("div", {
      className: o,
      children: [
        u.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            u.jsx("select", {
              value: C,
              onChange: (m) => g(m.target.value),
              className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: c.map((m) => u.jsx("option", {
                value: m.id,
                children: Ue(m)
              }, m.id))
            }),
            u.jsxs("button", {
              type: "button",
              onClick: () => {
                f({
                  force: true
                });
              },
              disabled: d,
              className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
              title: "AI Studio \uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68",
              children: [
                d ? u.jsx(O, {
                  size: 14,
                  className: "animate-spin"
                }) : u.jsx($, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            })
          ]
        }),
        y && u.jsx("p", {
          className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300",
          children: y
        }),
        G(r) && u.jsx("p", {
          className: "mt-1.5 text-[11px] text-amber-700 dark:text-amber-300",
          children: "\uC774 \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uD560\uB2F9\uB7C9\uC774 0\uC77C \uC218 \uC788\uC2B5\uB2C8\uB2E4. Gemini 2.0 Flash \uC0AC\uC6A9\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4."
        })
      ]
    });
  };
  function Be({ value: e, onChange: t, options: r, loading: n = false, placeholder: s = "", className: o = "", maxItems: a = 30 }) {
    const [i, c] = p.useState(false), l = (e || "").trim().toLowerCase(), d = p.useMemo(() => (l ? r.filter((g) => {
      const C = (g.id || "").toLowerCase(), m = (g.displayName || "").toLowerCase();
      return C.includes(l) || m.includes(l);
    }) : [
      ...r
    ]).slice(0, Math.max(1, a)), [
      r,
      l,
      a
    ]), h = p.useCallback((f) => {
      t == null ? void 0 : t(f), c(false);
    }, [
      t
    ]), y = !n && (l ? d.length === 0 : r.length === 0), b = l ? "\uC77C\uCE58\uD558\uB294 \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.";
    return u.jsxs(ie, {
      open: i,
      onOpenChange: c,
      modal: false,
      children: [
        u.jsx(ae, {
          asChild: true,
          children: u.jsx("input", {
            type: "text",
            autoComplete: "off",
            spellCheck: false,
            value: e,
            onFocus: () => c(true),
            onChange: (f) => {
              t == null ? void 0 : t(f.target.value), i || c(true);
            },
            placeholder: s,
            "aria-label": "\uBAA8\uB378 ID",
            "aria-expanded": i,
            "aria-haspopup": "listbox",
            className: `min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft ${o}`.trim()
          })
        }),
        u.jsx(ce, {
          children: u.jsx(le, {
            className: "z-100050 max-h-72 min-w-48 overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            side: "bottom",
            align: "start",
            sideOffset: 4,
            onOpenAutoFocus: (f) => f.preventDefault(),
            onCloseAutoFocus: (f) => f.preventDefault(),
            children: n ? u.jsx("div", {
              className: "px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
              children: "\uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            }) : y ? u.jsx("div", {
              className: "cursor-default select-none rounded px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
              children: b
            }) : u.jsx("ul", {
              role: "listbox",
              "aria-label": "\uBAA8\uB378 \uBAA9\uB85D",
              children: d.map((f) => u.jsx("li", {
                children: u.jsx("button", {
                  type: "button",
                  role: "option",
                  "aria-selected": f.id === e,
                  onMouseDown: (g) => g.preventDefault(),
                  onClick: () => h(f.id),
                  className: "flex w-full cursor-pointer select-none items-center rounded px-2 py-1.5 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg",
                  children: f.displayName
                })
              }, f.id))
            })
          })
        })
      ]
    });
  }
  Qe = function({ getBaseUrl: e, getApiKey: t, value: r, onChange: n, autoLoad: s = false, reloadKey: o = "", className: a = "" }) {
    const i = p.useRef(e), c = p.useRef(t);
    i.current = e, c.current = t;
    const [l, d] = p.useState([]), [h, y] = p.useState(false), [b, f] = p.useState(""), g = p.useCallback(async () => {
      var _a, _b;
      const m = (_a = await Promise.resolve(i.current())) == null ? void 0 : _a.trim();
      if (!m) {
        f("Endpoint URL\uC744 \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      y(true), f("");
      try {
        const w = ((_b = await Promise.resolve(c.current())) == null ? void 0 : _b.trim()) ?? "", x = await $e(m, w);
        d(x), x.length || f("\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.");
      } catch (w) {
        f(w instanceof Error ? w.message : "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        y(false);
      }
    }, []);
    p.useEffect(() => {
      d([]), f("");
    }, [
      o
    ]), p.useEffect(() => {
      s && g();
    }, [
      s,
      g,
      o
    ]);
    const C = (m) => {
      se(m), n == null ? void 0 : n(m);
    };
    return u.jsxs("div", {
      className: a,
      children: [
        u.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            u.jsx(Be, {
              value: r,
              onChange: C,
              options: l,
              loading: h,
              placeholder: "\uBAA8\uB378 ID \uC9C1\uC811 \uC785\uB825 (\uC608: gpt-4o-mini)"
            }),
            u.jsxs("button", {
              type: "button",
              onClick: () => {
                g();
              },
              disabled: h,
              className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
              "aria-label": "\uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68",
              children: [
                h ? u.jsx(O, {
                  size: 14,
                  className: "animate-spin"
                }) : u.jsx($, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            })
          ]
        }),
        u.jsx("p", {
          className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uC11C\uBC84 \uBAA8\uB378\uC744 \uAC00\uC838\uC624\uAC70\uB098, \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694."
        }),
        b ? u.jsx("p", {
          className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300",
          children: b
        }) : null
      ]
    });
  };
});
export {
  Ze as G,
  Qe as O,
  __tla,
  Je as a,
  Ve as g,
  G as i
};
