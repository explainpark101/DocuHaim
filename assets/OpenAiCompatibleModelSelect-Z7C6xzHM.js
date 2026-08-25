import { r as f, j as d, __tla as __tla_0 } from "./vendor-react-SY5QCjFA.js";
import { fR as J, fX as W, fY as Y, fZ as Z, e0 as V, eZ as Q, f_ as M, eX as ee, eY as te, __tla as __tla_1 } from "./index-QBlKaQ6_.js";
import { _ as re, __tla as __tla_2 } from "./vendor-md-editor-CyUZNHY0.js";
import { v as $, ap as O } from "./vendor-lucide-DpPvFd8E.js";
import { a0 as ne, a1 as se, a2 as oe, a3 as ae, a4 as L } from "./vendor-radix--fTcLYkF.js";
let Oe, Pe, _e, $e, j;
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
  const ie = /* @__PURE__ */ new Set([
    "gemini-2.0-flash-lite"
  ]);
  j = function(e) {
    return ie.has(String(e || "").trim());
  };
  function P(e) {
    const r = String(e || "").match(/retry in ([\d.]+)s/i);
    if (!r) return null;
    const n = Math.ceil(Number(r[1]));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  function ce(e) {
    return /limit:\s*0/i.test(String(e || ""));
  }
  function G({ status: e, detail: t, modelId: r }) {
    const n = r ? ` (${r})` : "", s = P(t), o = ce(t), i = r && j(r);
    if (e === 429) {
      const a = [
        `\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`
      ];
      return o || i ? a.push("", "\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uAC70\uB098 \uD560\uB2F9\uB7C9\uC774 0\uC785\uB2C8\uB2E4.", "Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash \uAC19\uC740 \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC720\uB8CC \uD50C\uB79C\xB7\uACB0\uC81C \uC815\uBCF4\uB294 Google AI Studio\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.") : a.push("", "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098, \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC0AC\uC6A9\uB7C9: https://ai.dev/rate-limit"), s && a.push("", `\uC57D ${s}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), a.join(`
`);
    }
    return e === 403 ? `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${t}` : `Gemini API \uC624\uB958 (${e})${n}: ${t}`;
  }
  function v(e) {
    return new Promise((t) => {
      setTimeout(t, e);
    });
  }
  function D({ instruction: e, selectedText: t, hasImages: r }) {
    const n = (e || "").trim(), s = (t || "").trim(), o = [
      n,
      "",
      "---"
    ];
    return r && s ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uC640 \uC544\uB798 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : r ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.") : s ? o.push("\uC544\uB798\uB294 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uC785\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : o.push("\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694."), o.join(`
`);
  }
  const le = "/api/gemini", I = "/v1beta";
  function de(e) {
    if (!(e.split("?")[0] ?? e).startsWith(`${I}/`)) throw new Error("Invalid Gemini API path.");
  }
  function me(e) {
    const t = e instanceof Error ? e.message : String(e);
    return /failed to fetch|networkerror|load failed|cors/i.test(t) ? [
      "Gemini API\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      "",
      "\uC6F9 \uBC30\uD3EC\uC5D0\uC11C\uB294 /api/gemini \uD504\uB85D\uC2DC\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.",
      "Render \uB4F1 Node \uC11C\uBC84(start \uC2A4\uD06C\uB9BD\uD2B8)\uB85C \uC2E4\uD589 \uC911\uC778\uC9C0 \uD655\uC778\uD558\uC138\uC694."
    ].join(`
`) : t || "Gemini API \uB124\uD2B8\uC6CC\uD06C \uC624\uB958";
  }
  async function F(e, t) {
    de(e);
    const r = t.method ?? "GET";
    if (J()) {
      const { invoke: s } = await re(async () => {
        const { invoke: a } = await import("./core-DhEqZVGG.js");
        return {
          invoke: a
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
      return t.body && (s.body = t.body), await fetch(`${le}${e}`, s);
    } catch (s) {
      throw new Error(me(s));
    }
  }
  const ue = 1;
  function T(e) {
    return String(e || "").replace(/^models\//, "");
  }
  async function B(e) {
    var _a, _b;
    let t = e.statusText;
    try {
      t = ((_b = (_a = await e.json()) == null ? void 0 : _a.error) == null ? void 0 : _b.message) || t;
    } catch {
    }
    return t;
  }
  async function fe(e) {
    const t = [];
    let r;
    do {
      const n = new URLSearchParams({
        pageSize: "100"
      });
      r && n.set("pageToken", r);
      const s = `${I}/models?${n.toString()}`, o = await F(s, {
        apiKey: e
      });
      if (!o.ok) {
        const a = await B(o);
        throw new Error(G({
          status: o.status,
          detail: a
        }));
      }
      const i = await o.json();
      for (const a of i.models || []) (a.supportedGenerationMethods || []).includes("generateContent") && t.push({
        id: T(a.name),
        displayName: a.displayName || T(a.name)
      });
      r = i.nextPageToken;
    } while (r);
    return t.sort((n, s) => n.displayName.localeCompare(s.displayName, "ko"));
  }
  async function pe(e, t, r) {
    var _a, _b, _c, _d, _e2, _f;
    const n = `${I}/models/${encodeURIComponent(t)}:generateContent`, s = await F(n, {
      method: "POST",
      apiKey: e,
      body: JSON.stringify({
        contents: [
          {
            parts: r
          }
        ],
        generationConfig: {
          temperature: 0.4
        }
      })
    });
    if (!s.ok) {
      const a = await B(s), c = new Error(G({
        status: s.status,
        detail: a,
        modelId: t
      }));
      throw c.status = s.status, c.retryAfterSec = P(a), c;
    }
    const i = (_f = (_e2 = (_d = (_c = (_b = (_a = await s.json()) == null ? void 0 : _a.candidates) == null ? void 0 : _b[0]) == null ? void 0 : _c.content) == null ? void 0 : _d.parts) == null ? void 0 : _e2[0]) == null ? void 0 : _f.text;
    if (typeof i != "string" || !i.trim()) throw new Error("Gemini API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return i.trim();
  }
  function ye({ instruction: e, selectedText: t, images: r }) {
    const n = Array.isArray(r) ? r : [], s = n.length > 0, o = n.map((i) => ({
      inline_data: {
        mime_type: i.mimeType,
        data: i.dataBase64
      }
    }));
    return o.push({
      text: D({
        instruction: e,
        selectedText: t,
        hasImages: s
      })
    }), o;
  }
  async function he(e, t, r) {
    let n = 0;
    for (; ; ) try {
      return await pe(e, t, r);
    } catch (s) {
      if (!((s == null ? void 0 : s.status) === 429 && n < ue && s.retryAfterSec && s.retryAfterSec <= 120)) throw s;
      n += 1, await v(s.retryAfterSec * 1e3);
    }
  }
  _e = async function({ apiKey: e, model: t, instruction: r, selectedText: n, images: s }) {
    const o = (t || W()).trim() || Y, i = (r || "").trim(), a = (n || "").trim(), c = Array.isArray(s) ? s.filter((m) => (m == null ? void 0 : m.mimeType) && (m == null ? void 0 : m.dataBase64)) : [];
    if (c.length > 0, !i) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    const l = ye({
      instruction: i,
      selectedText: a,
      images: c
    });
    return he(e, o, l);
  };
  function U(e, t) {
    const r = Number.parseInt(String(t || "").trim(), 10);
    if (Number.isFinite(r) && r > 0) return r;
    const n = String(e || ""), s = n.match(/try again in ([\d.]+)\s*s/i) || n.match(/retry in ([\d.]+)s/i);
    if (!s) return null;
    const o = Math.ceil(Number(s[1]));
    return Number.isFinite(o) && o > 0 ? o : null;
  }
  function z({ status: e, detail: t, modelId: r }) {
    const n = r ? ` (${r})` : "", s = U(t);
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
  function ge(e) {
    const t = e instanceof Error ? e.message : String(e || "");
    return e instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(t) ? [
      "\uC11C\uBC84\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      "Endpoint URL\uACFC \uBE0C\uB77C\uC6B0\uC800 CORS \uD5C8\uC6A9 \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uC138\uC694.",
      "\uB85C\uCEEC \uC11C\uBC84(Ollama, LM Studio, vLLM \uB4F1)\uB294 \uBCF4\uD1B5 CORS\uB97C \uC9C1\uC811 \uC5F4\uC5B4\uC57C \uD569\uB2C8\uB2E4."
    ].join(`
`) : t || "OpenAI \uD638\uD658 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.";
  }
  const xe = 1;
  function K(e) {
    const t = {
      "Content-Type": "application/json"
    }, r = String(e || "").trim();
    return r && (t.Authorization = `Bearer ${r}`), t;
  }
  function X(e) {
    const t = V(e);
    if (!t) throw new Error("OpenAI \uD638\uD658 Endpoint\uB97C \uC785\uB825\uD558\uC138\uC694. \uC608: https://api.openai.com/v1 \uB610\uB294 http://localhost:11434/v1");
    return t;
  }
  async function q(e) {
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
  async function H(e, t) {
    try {
      return await fetch(e, t);
    } catch (r) {
      throw new Error(ge(r));
    }
  }
  function A(e) {
    return !e || typeof e != "object" || Array.isArray(e) ? null : e;
  }
  function be(e) {
    if (typeof e == "string") return e.trim();
    const t = A(e);
    if (!t) return "";
    const r = t.id ?? t.name ?? t.model;
    return typeof r == "string" ? r.trim() : "";
  }
  function we(e, t) {
    const r = A(e);
    if (!r) return t;
    const n = r.display_name ?? r.displayName ?? r.id ?? r.name;
    return typeof n == "string" && n.trim() ? n.trim() : t;
  }
  async function Ae(e, t = "") {
    const r = X(e), n = await H(`${r}/models`, {
      headers: K(t)
    });
    if (!n.ok) {
      const l = await q(n);
      throw new Error(z({
        status: n.status,
        detail: l
      }));
    }
    const s = await n.json(), o = A(s), i = o ? Array.isArray(o.data) ? o.data : Array.isArray(o.models) ? o.models : [] : Array.isArray(s) ? s : [], a = [], c = /* @__PURE__ */ new Set();
    for (const l of i) {
      const m = be(l);
      !m || c.has(m) || (c.add(m), a.push({
        id: m,
        displayName: we(l, m)
      }));
    }
    return a.sort((l, m) => l.displayName.localeCompare(m.displayName, "ko"));
  }
  function Se(e) {
    var _a;
    const t = A(e), r = t && Array.isArray(t.choices) ? t.choices : [], n = A(r[0]), o = ((_a = A(n == null ? void 0 : n.message)) == null ? void 0 : _a.content) ?? (n == null ? void 0 : n.text);
    if (typeof o == "string" && o.trim()) return o.trim();
    if (Array.isArray(o)) {
      const i = o.map((a) => {
        if (typeof a == "string") return a;
        const c = A(a);
        if (!c) return "";
        if (typeof c.text == "string") return c.text;
        const l = A(c.text);
        return typeof (l == null ? void 0 : l.value) == "string" ? l.value : "";
      }).filter(Boolean);
      if (i.length) return i.join(`
`).trim();
    }
    return "";
  }
  function Ee({ instruction: e, selectedText: t, images: r }) {
    const n = r.length > 0, s = D({
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
          ...r.map((i) => ({
            type: "image_url",
            image_url: {
              url: `data:${i.mimeType};base64,${i.dataBase64}`
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
  async function ke({ baseUrl: e, apiKey: t, modelId: r, messages: n }) {
    const s = await H(`${e}/chat/completions`, {
      method: "POST",
      headers: K(t),
      body: JSON.stringify({
        model: r,
        messages: n,
        temperature: 0.4
      })
    });
    if (!s.ok) {
      const a = await q(s), c = new Error(z({
        status: s.status,
        detail: a,
        modelId: r
      }));
      throw c.status = s.status, c.retryAfterSec = U(a, s.headers.get("retry-after")), c;
    }
    const o = await s.json(), i = Se(o);
    if (!i) throw new Error("OpenAI \uD638\uD658 API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return i;
  }
  async function Ce(e) {
    let t = 0;
    for (; ; ) try {
      return await ke(e);
    } catch (r) {
      const n = r;
      if (!((n == null ? void 0 : n.status) === 429 && t < xe && n.retryAfterSec && n.retryAfterSec <= 120)) throw r;
      t += 1, await v((n.retryAfterSec ?? 1) * 1e3);
    }
  }
  $e = async function({ baseUrl: e, apiKey: t, model: r, instruction: n, selectedText: s, images: o }) {
    const i = X(e), a = (r || Z()).trim(), c = (n || "").trim(), l = (s || "").trim(), m = Array.isArray(o) ? o.filter((h) => (h == null ? void 0 : h.mimeType) && (h == null ? void 0 : h.dataBase64)) : [];
    if (!a) throw new Error("\uBAA8\uB378 ID\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBAA9\uB85D\uC5D0\uC11C \uC120\uD0DD\uD558\uC138\uC694.");
    if (!c) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    const x = Ee({
      instruction: c,
      selectedText: l,
      images: m
    });
    return Ce({
      baseUrl: i,
      apiKey: t ?? "",
      modelId: a,
      messages: x
    });
  };
  let N = null, _ = null, S = null;
  function Ne(e) {
    return j(e.id) ? `${e.displayName} (\uBB34\uB8CC \uD50C\uB79C \uBBF8\uC9C0\uC6D0)` : e.displayName;
  }
  function E(e, t) {
    const r = /* @__PURE__ */ new Map();
    for (const n of e) r.set(n.id, n);
    return t && !r.has(t) && r.set(t, {
      id: t,
      displayName: t
    }), [
      ...r.values()
    ].sort((n, s) => n.displayName.localeCompare(s.displayName, "ko"));
  }
  Oe = function({ getGeminiApiKey: e, profileId: t = "gemini", value: r, onChange: n, autoLoad: s = false, className: o = "" }) {
    const i = f.useRef(e);
    i.current = e;
    const a = f.useRef(r);
    f.useEffect(() => {
      a.current = r;
    }, [
      r
    ]);
    const [c, l] = f.useState(() => E(M, r)), [m, x] = f.useState(false), [h, y] = f.useState(""), p = f.useCallback(async ({ force: u = false } = {}) => {
      var _a;
      const g = i.current;
      if (typeof g != "function") {
        y("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const b = (_a = await Promise.resolve(g())) == null ? void 0 : _a.trim();
      if (!b) {
        y("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return;
      }
      x(true), y("");
      try {
        if (!u && N && _ === b) {
          l(E(N, a.current));
          return;
        }
        if (S && S.key === b) {
          const C = await S.promise;
          l(E(C, a.current));
          return;
        }
        const k = Q(t, g, (C) => fe(C));
        S = {
          key: b,
          promise: k
        };
        const R = await k;
        N = R, _ = b, l(E(R, a.current));
      } catch (k) {
        y((k == null ? void 0 : k.message) || "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), l(E(M, a.current));
      } finally {
        x(false), S && S.key === b && (S = null);
      }
    }, [
      t
    ]);
    f.useEffect(() => {
      l((u) => E(u, r));
    }, [
      r
    ]), f.useEffect(() => {
      s && p();
    }, [
      s,
      p
    ]);
    const w = (u) => {
      ee(u), n == null ? void 0 : n(u);
    };
    return d.jsxs("div", {
      className: o,
      children: [
        d.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            d.jsx("select", {
              value: r,
              onChange: (u) => w(u.target.value),
              disabled: m,
              className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: c.map((u) => d.jsx("option", {
                value: u.id,
                children: Ne(u)
              }, u.id))
            }),
            d.jsxs("button", {
              type: "button",
              onClick: () => {
                p({
                  force: true
                });
              },
              disabled: m,
              className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
              title: "AI Studio \uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68",
              children: [
                m ? d.jsx($, {
                  size: 14,
                  className: "animate-spin"
                }) : d.jsx(O, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            })
          ]
        }),
        h && d.jsx("p", {
          className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300",
          children: h
        }),
        j(r) && d.jsx("p", {
          className: "mt-1.5 text-[11px] text-amber-700 dark:text-amber-300",
          children: "\uC774 \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uD560\uB2F9\uB7C9\uC774 0\uC77C \uC218 \uC788\uC2B5\uB2C8\uB2E4. Gemini 2.0 Flash \uC0AC\uC6A9\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4."
        })
      ]
    });
  };
  function je({ value: e, onChange: t, options: r, loading: n = false, placeholder: s = "", className: o = "", maxItems: i = 30 }) {
    const [a, c] = f.useState(false), l = (e || "").trim().toLowerCase(), m = f.useMemo(() => (l ? r.filter((w) => {
      const u = (w.id || "").toLowerCase(), g = (w.displayName || "").toLowerCase();
      return u.includes(l) || g.includes(l);
    }) : [
      ...r
    ]).slice(0, Math.max(1, i)), [
      r,
      l,
      i
    ]), x = f.useCallback((p) => {
      t == null ? void 0 : t(p), c(false);
    }, [
      t
    ]), h = !n && (l ? m.length === 0 : r.length === 0), y = l ? "\uC77C\uCE58\uD558\uB294 \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.";
    return d.jsxs(ne, {
      open: a,
      onOpenChange: c,
      modal: false,
      children: [
        d.jsx(se, {
          asChild: true,
          children: d.jsx("input", {
            type: "text",
            autoComplete: "off",
            spellCheck: false,
            value: e,
            onFocus: () => c(true),
            onClick: () => c(true),
            onChange: (p) => t == null ? void 0 : t(p.target.value),
            placeholder: s,
            "aria-label": "\uBAA8\uB378 ID",
            className: `min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft ${o}`.trim()
          })
        }),
        d.jsx(oe, {
          children: d.jsx(ae, {
            className: "z-100050 max-h-72 min-w-48 overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            side: "bottom",
            align: "start",
            sideOffset: 4,
            onCloseAutoFocus: (p) => p.preventDefault(),
            children: n ? d.jsx("div", {
              className: "px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
              children: "\uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            }) : h ? d.jsx(L, {
              disabled: true,
              className: "cursor-default select-none rounded px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
              children: y
            }) : m.map((p) => d.jsx(L, {
              onSelect: (w) => {
                w.preventDefault(), x(p.id);
              },
              className: "flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-left text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg",
              children: p.displayName
            }, p.id))
          })
        })
      ]
    });
  }
  Pe = function({ getBaseUrl: e, getApiKey: t, value: r, onChange: n, autoLoad: s = false, className: o = "" }) {
    const i = f.useRef(e), a = f.useRef(t);
    i.current = e, a.current = t;
    const [c, l] = f.useState([]), [m, x] = f.useState(false), [h, y] = f.useState(""), p = f.useCallback(async () => {
      var _a, _b;
      const u = (_a = await Promise.resolve(i.current())) == null ? void 0 : _a.trim();
      if (!u) {
        y("Endpoint URL\uC744 \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      x(true), y("");
      try {
        const g = ((_b = await Promise.resolve(a.current())) == null ? void 0 : _b.trim()) ?? "", b = await Ae(u, g);
        l(b), b.length || y("\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.");
      } catch (g) {
        y(g instanceof Error ? g.message : "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        x(false);
      }
    }, []);
    f.useEffect(() => {
      s && p();
    }, [
      s,
      p
    ]);
    const w = (u) => {
      te(u), n == null ? void 0 : n(u);
    };
    return d.jsxs("div", {
      className: o,
      children: [
        d.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            d.jsx(je, {
              value: r,
              onChange: w,
              options: c,
              loading: m,
              placeholder: "\uBAA8\uB378 ID \uC9C1\uC811 \uC785\uB825 (\uC608: gpt-4o-mini)"
            }),
            d.jsxs("button", {
              type: "button",
              onClick: () => {
                p();
              },
              disabled: m,
              className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
              "aria-label": "\uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68",
              children: [
                m ? d.jsx($, {
                  size: 14,
                  className: "animate-spin"
                }) : d.jsx(O, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            })
          ]
        }),
        d.jsx("p", {
          className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uC11C\uBC84 \uBAA8\uB378\uC744 \uAC00\uC838\uC624\uAC70\uB098, \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694."
        }),
        h ? d.jsx("p", {
          className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300",
          children: h
        }) : null
      ]
    });
  };
});
export {
  Oe as G,
  Pe as O,
  __tla,
  _e as a,
  $e as g,
  j as i
};
