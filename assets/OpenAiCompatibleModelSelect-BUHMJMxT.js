import { r as f, j as d } from "./vendor-react-SY5QCjFA.js";
import { fW as W, fX as Z, fY as q, e0 as Y, eZ as H, fZ as L, eX as Q, eY as V } from "./index-Ut6Cs96T.js";
import { v as O, ap as $ } from "./vendor-lucide-CbFAdz-T.js";
import { a0 as ee, a1 as te, a2 as re, a3 as ne, a4 as R } from "./vendor-radix-BgY9OwZN.js";
const se = /* @__PURE__ */ new Set(["gemini-2.0-flash-lite"]);
function N(e) {
  return se.has(String(e || "").trim());
}
function v(e) {
  const t = String(e || "").match(/retry in ([\d.]+)s/i);
  if (!t) return null;
  const n = Math.ceil(Number(t[1]));
  return Number.isFinite(n) && n > 0 ? n : null;
}
function oe(e) {
  return /limit:\s*0/i.test(String(e || ""));
}
function P({ status: e, detail: r, modelId: t }) {
  const n = t ? ` (${t})` : "", s = v(r), o = oe(r), a = t && N(t);
  if (e === 429) {
    const i = [`\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`];
    return o || a ? i.push("", "\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uAC70\uB098 \uD560\uB2F9\uB7C9\uC774 0\uC785\uB2C8\uB2E4.", "Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash \uAC19\uC740 \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC720\uB8CC \uD50C\uB79C\xB7\uACB0\uC81C \uC815\uBCF4\uB294 Google AI Studio\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.") : i.push("", "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098, \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC0AC\uC6A9\uB7C9: https://ai.dev/rate-limit"), s && i.push("", `\uC57D ${s}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), i.join(`
`);
  }
  return e === 403 ? `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${r}` : `Gemini API \uC624\uB958 (${e})${n}: ${r}`;
}
function G(e) {
  return new Promise((r) => {
    setTimeout(r, e);
  });
}
function _({ instruction: e, selectedText: r, hasImages: t }) {
  const n = (e || "").trim(), s = (r || "").trim(), o = [n, "", "---"];
  return t && s ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uC640 \uC544\uB798 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : t ? o.push("\uCCA8\uBD80\uB41C \uC774\uBBF8\uC9C0\uB97C \uCC38\uACE0\uD558\uC5EC \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.") : s ? o.push("\uC544\uB798\uB294 \uC0AC\uC6A9\uC790\uAC00 \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uC785\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694.", "", s) : o.push("\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC2DC\uC0AC\uD56D\uC5D0 \uB530\uB77C \uACB0\uACFC\uB9CC \uCD9C\uB825\uD558\uC138\uC694. \uC124\uBA85\uC774\uB098 \uBD80\uAC00 \uCF54\uBA58\uD2B8\uB294 \uCD5C\uC18C\uD654\uD558\uC138\uC694."), o.join(`
`);
}
const D = "https://generativelanguage.googleapis.com/v1beta", ae = 1;
function T(e) {
  return String(e || "").replace(/^models\//, "");
}
async function F(e) {
  var _a, _b;
  let r = e.statusText;
  try {
    r = ((_b = (_a = await e.json()) == null ? void 0 : _a.error) == null ? void 0 : _b.message) || r;
  } catch {
  }
  return r;
}
async function ie(e) {
  const r = [];
  let t;
  do {
    const n = new URL(`${D}/models`);
    n.searchParams.set("pageSize", "100"), t && n.searchParams.set("pageToken", t);
    const s = await fetch(n.toString(), { headers: { "x-goog-api-key": e } });
    if (!s.ok) {
      const a = await F(s);
      throw new Error(P({ status: s.status, detail: a }));
    }
    const o = await s.json();
    for (const a of o.models || []) (a.supportedGenerationMethods || []).includes("generateContent") && r.push({ id: T(a.name), displayName: a.displayName || T(a.name) });
    t = o.nextPageToken;
  } while (t);
  return r.sort((n, s) => n.displayName.localeCompare(s.displayName, "ko"));
}
async function ce(e, r, t) {
  var _a, _b, _c, _d, _e, _f;
  const n = `${D}/models/${encodeURIComponent(r)}:generateContent`, s = await fetch(n, { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": e }, body: JSON.stringify({ contents: [{ parts: t }], generationConfig: { temperature: 0.4 } }) });
  if (!s.ok) {
    const i = await F(s), c = new Error(P({ status: s.status, detail: i, modelId: r }));
    throw c.status = s.status, c.retryAfterSec = v(i), c;
  }
  const a = (_f = (_e = (_d = (_c = (_b = (_a = await s.json()) == null ? void 0 : _a.candidates) == null ? void 0 : _b[0]) == null ? void 0 : _c.content) == null ? void 0 : _d.parts) == null ? void 0 : _e[0]) == null ? void 0 : _f.text;
  if (typeof a != "string" || !a.trim()) throw new Error("Gemini API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
  return a.trim();
}
function le({ instruction: e, selectedText: r, images: t }) {
  const n = Array.isArray(t) ? t : [], s = n.length > 0, o = n.map((a) => ({ inline_data: { mime_type: a.mimeType, data: a.dataBase64 } }));
  return o.push({ text: _({ instruction: e, selectedText: r, hasImages: s }) }), o;
}
async function de(e, r, t) {
  let n = 0;
  for (; ; ) try {
    return await ce(e, r, t);
  } catch (s) {
    if (!((s == null ? void 0 : s.status) === 429 && n < ae && s.retryAfterSec && s.retryAfterSec <= 120)) throw s;
    n += 1, await G(s.retryAfterSec * 1e3);
  }
}
async function je({ apiKey: e, model: r, instruction: t, selectedText: n, images: s }) {
  const o = (r || W()).trim() || Z, a = (t || "").trim(), i = (n || "").trim(), c = Array.isArray(s) ? s.filter((m) => (m == null ? void 0 : m.mimeType) && (m == null ? void 0 : m.dataBase64)) : [];
  if (c.length > 0, !a) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
  const l = le({ instruction: a, selectedText: i, images: c });
  return de(e, o, l);
}
function B(e, r) {
  const t = Number.parseInt(String(r || "").trim(), 10);
  if (Number.isFinite(t) && t > 0) return t;
  const n = String(e || ""), s = n.match(/try again in ([\d.]+)\s*s/i) || n.match(/retry in ([\d.]+)s/i);
  if (!s) return null;
  const o = Math.ceil(Number(s[1]));
  return Number.isFinite(o) && o > 0 ? o : null;
}
function U({ status: e, detail: r, modelId: t }) {
  const n = t ? ` (${t})` : "", s = B(r);
  if (e === 401 || e === 403) return `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${r}`;
  if (e === 404) return `Endpoint \uB610\uB294 \uBAA8\uB378\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4${n}.
\uBCA0\uC774\uC2A4 URL\uC774 /v1 \uC744 \uD3EC\uD568\uD558\uB294\uC9C0, \uBAA8\uB378 ID\uAC00 \uB9DE\uB294\uC9C0 \uD655\uC778\uD558\uC138\uC694.

${r}`;
  if (e === 429) {
    const o = [`\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`, "", r];
    return s && o.push("", `\uC57D ${s}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), o.join(`
`);
  }
  return `OpenAI \uD638\uD658 API \uC624\uB958 (${e})${n}: ${r}`;
}
function me(e) {
  const r = e instanceof Error ? e.message : String(e || "");
  return e instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(r) ? ["\uC11C\uBC84\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", "Endpoint URL\uACFC \uBE0C\uB77C\uC6B0\uC800 CORS \uD5C8\uC6A9 \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uC138\uC694.", "\uB85C\uCEEC \uC11C\uBC84(Ollama, LM Studio, vLLM \uB4F1)\uB294 \uBCF4\uD1B5 CORS\uB97C \uC9C1\uC811 \uC5F4\uC5B4\uC57C \uD569\uB2C8\uB2E4."].join(`
`) : r || "OpenAI \uD638\uD658 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.";
}
const ue = 1;
function z(e) {
  const r = { "Content-Type": "application/json" }, t = String(e || "").trim();
  return t && (r.Authorization = `Bearer ${t}`), r;
}
function K(e) {
  const r = Y(e);
  if (!r) throw new Error("OpenAI \uD638\uD658 Endpoint\uB97C \uC785\uB825\uD558\uC138\uC694. \uC608: https://api.openai.com/v1 \uB610\uB294 http://localhost:11434/v1");
  return r;
}
async function X(e) {
  let r = e.statusText;
  try {
    const t = await e.json();
    if (t && typeof t == "object") {
      const n = t, s = n.error;
      if (typeof s == "string" && s.trim()) return s;
      if (s && typeof s == "object") {
        const o = s.message;
        if (typeof o == "string" && o.trim()) return o;
      }
      if (typeof n.message == "string" && n.message.trim()) return n.message;
    }
  } catch {
  }
  return r;
}
async function J(e, r) {
  try {
    return await fetch(e, r);
  } catch (t) {
    throw new Error(me(t));
  }
}
function A(e) {
  return !e || typeof e != "object" || Array.isArray(e) ? null : e;
}
function fe(e) {
  if (typeof e == "string") return e.trim();
  const r = A(e);
  if (!r) return "";
  const t = r.id ?? r.name ?? r.model;
  return typeof t == "string" ? t.trim() : "";
}
function pe(e, r) {
  const t = A(e);
  if (!t) return r;
  const n = t.display_name ?? t.displayName ?? t.id ?? t.name;
  return typeof n == "string" && n.trim() ? n.trim() : r;
}
async function he(e, r = "") {
  const t = K(e), n = await J(`${t}/models`, { headers: z(r) });
  if (!n.ok) {
    const l = await X(n);
    throw new Error(U({ status: n.status, detail: l }));
  }
  const s = await n.json(), o = A(s), a = o ? Array.isArray(o.data) ? o.data : Array.isArray(o.models) ? o.models : [] : Array.isArray(s) ? s : [], i = [], c = /* @__PURE__ */ new Set();
  for (const l of a) {
    const m = fe(l);
    !m || c.has(m) || (c.add(m), i.push({ id: m, displayName: pe(l, m) }));
  }
  return i.sort((l, m) => l.displayName.localeCompare(m.displayName, "ko"));
}
function ye(e) {
  var _a;
  const r = A(e), t = r && Array.isArray(r.choices) ? r.choices : [], n = A(t[0]), o = ((_a = A(n == null ? void 0 : n.message)) == null ? void 0 : _a.content) ?? (n == null ? void 0 : n.text);
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
function ge({ instruction: e, selectedText: r, images: t }) {
  const n = t.length > 0, s = _({ instruction: e, selectedText: r, hasImages: n });
  return n ? [{ role: "user", content: [{ type: "text", text: s }, ...t.map((a) => ({ type: "image_url", image_url: { url: `data:${a.mimeType};base64,${a.dataBase64}` } }))] }] : [{ role: "user", content: s }];
}
async function xe({ baseUrl: e, apiKey: r, modelId: t, messages: n }) {
  const s = await J(`${e}/chat/completions`, { method: "POST", headers: z(r), body: JSON.stringify({ model: t, messages: n, temperature: 0.4 }) });
  if (!s.ok) {
    const i = await X(s), c = new Error(U({ status: s.status, detail: i, modelId: t }));
    throw c.status = s.status, c.retryAfterSec = B(i, s.headers.get("retry-after")), c;
  }
  const o = await s.json(), a = ye(o);
  if (!a) throw new Error("OpenAI \uD638\uD658 API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
  return a;
}
async function be(e) {
  let r = 0;
  for (; ; ) try {
    return await xe(e);
  } catch (t) {
    const n = t;
    if (!((n == null ? void 0 : n.status) === 429 && r < ue && n.retryAfterSec && n.retryAfterSec <= 120)) throw t;
    r += 1, await G((n.retryAfterSec ?? 1) * 1e3);
  }
}
async function Ne({ baseUrl: e, apiKey: r, model: t, instruction: n, selectedText: s, images: o }) {
  const a = K(e), i = (t || q()).trim(), c = (n || "").trim(), l = (s || "").trim(), m = Array.isArray(o) ? o.filter((y) => (y == null ? void 0 : y.mimeType) && (y == null ? void 0 : y.dataBase64)) : [];
  if (!i) throw new Error("\uBAA8\uB378 ID\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBAA9\uB85D\uC5D0\uC11C \uC120\uD0DD\uD558\uC138\uC694.");
  if (!c) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
  const x = ge({ instruction: c, selectedText: l, images: m });
  return be({ baseUrl: a, apiKey: r ?? "", modelId: i, messages: x });
}
let j = null, I = null, S = null;
function we(e) {
  return N(e.id) ? `${e.displayName} (\uBB34\uB8CC \uD50C\uB79C \uBBF8\uC9C0\uC6D0)` : e.displayName;
}
function E(e, r) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.id, n);
  return r && !t.has(r) && t.set(r, { id: r, displayName: r }), [...t.values()].sort((n, s) => n.displayName.localeCompare(s.displayName, "ko"));
}
function Me({ getGeminiApiKey: e, profileId: r = "gemini", value: t, onChange: n, autoLoad: s = false, className: o = "" }) {
  const a = f.useRef(e);
  a.current = e;
  const i = f.useRef(t);
  f.useEffect(() => {
    i.current = t;
  }, [t]);
  const [c, l] = f.useState(() => E(L, t)), [m, x] = f.useState(false), [y, h] = f.useState(""), p = f.useCallback(async ({ force: u = false } = {}) => {
    var _a;
    const g = a.current;
    if (typeof g != "function") {
      h("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
      return;
    }
    const b = (_a = await Promise.resolve(g())) == null ? void 0 : _a.trim();
    if (!b) {
      h("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
      return;
    }
    x(true), h("");
    try {
      if (!u && j && I === b) {
        l(E(j, i.current));
        return;
      }
      if (S && S.key === b) {
        const k = await S.promise;
        l(E(k, i.current));
        return;
      }
      const C = H(r, g, (k) => ie(k));
      S = { key: b, promise: C };
      const M = await C;
      j = M, I = b, l(E(M, i.current));
    } catch (C) {
      h((C == null ? void 0 : C.message) || "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), l(E(L, i.current));
    } finally {
      x(false), S && S.key === b && (S = null);
    }
  }, [r]);
  f.useEffect(() => {
    l((u) => E(u, t));
  }, [t]), f.useEffect(() => {
    s && p();
  }, [s, p]);
  const w = (u) => {
    Q(u), n == null ? void 0 : n(u);
  };
  return d.jsxs("div", { className: o, children: [d.jsxs("div", { className: "flex items-center gap-2", children: [d.jsx("select", { value: t, onChange: (u) => w(u.target.value), disabled: m, className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: c.map((u) => d.jsx("option", { value: u.id, children: we(u) }, u.id)) }), d.jsxs("button", { type: "button", onClick: () => {
    p({ force: true });
  }, disabled: m, className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", title: "AI Studio \uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68", children: [m ? d.jsx(O, { size: 14, className: "animate-spin" }) : d.jsx($, { size: 14 }), "\uC0C8\uB85C\uACE0\uCE68"] })] }), y && d.jsx("p", { className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300", children: y }), N(t) && d.jsx("p", { className: "mt-1.5 text-[11px] text-amber-700 dark:text-amber-300", children: "\uC774 \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uD560\uB2F9\uB7C9\uC774 0\uC77C \uC218 \uC788\uC2B5\uB2C8\uB2E4. Gemini 2.0 Flash \uC0AC\uC6A9\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4." })] });
}
function Ae({ value: e, onChange: r, options: t, loading: n = false, placeholder: s = "", className: o = "", maxItems: a = 30 }) {
  const [i, c] = f.useState(false), l = (e || "").trim().toLowerCase(), m = f.useMemo(() => (l ? t.filter((w) => {
    const u = (w.id || "").toLowerCase(), g = (w.displayName || "").toLowerCase();
    return u.includes(l) || g.includes(l);
  }) : [...t]).slice(0, Math.max(1, a)), [t, l, a]), x = f.useCallback((p) => {
    r == null ? void 0 : r(p), c(false);
  }, [r]), y = !n && (l ? m.length === 0 : t.length === 0), h = l ? "\uC77C\uCE58\uD558\uB294 \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.";
  return d.jsxs(ee, { open: i, onOpenChange: c, modal: false, children: [d.jsx(te, { asChild: true, children: d.jsx("input", { type: "text", autoComplete: "off", spellCheck: false, value: e, onFocus: () => c(true), onClick: () => c(true), onChange: (p) => r == null ? void 0 : r(p.target.value), placeholder: s, "aria-label": "\uBAA8\uB378 ID", className: `min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft ${o}`.trim() }) }), d.jsx(re, { children: d.jsx(ne, { className: "z-100050 max-h-72 min-w-48 overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", side: "bottom", align: "start", sideOffset: 4, onCloseAutoFocus: (p) => p.preventDefault(), children: n ? d.jsx("div", { className: "px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026" }) : y ? d.jsx(R, { disabled: true, className: "cursor-default select-none rounded px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: h }) : m.map((p) => d.jsx(R, { onSelect: (w) => {
    w.preventDefault(), x(p.id);
  }, className: "flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-left text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: p.displayName }, p.id)) }) })] });
}
function Le({ getBaseUrl: e, getApiKey: r, value: t, onChange: n, autoLoad: s = false, className: o = "" }) {
  const a = f.useRef(e), i = f.useRef(r);
  a.current = e, i.current = r;
  const [c, l] = f.useState([]), [m, x] = f.useState(false), [y, h] = f.useState(""), p = f.useCallback(async () => {
    var _a, _b;
    const u = (_a = await Promise.resolve(a.current())) == null ? void 0 : _a.trim();
    if (!u) {
      h("Endpoint URL\uC744 \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    x(true), h("");
    try {
      const g = ((_b = await Promise.resolve(i.current())) == null ? void 0 : _b.trim()) ?? "", b = await he(u, g);
      l(b), b.length || h("\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.");
    } catch (g) {
      h(g instanceof Error ? g.message : "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      x(false);
    }
  }, []);
  f.useEffect(() => {
    s && p();
  }, [s, p]);
  const w = (u) => {
    V(u), n == null ? void 0 : n(u);
  };
  return d.jsxs("div", { className: o, children: [d.jsxs("div", { className: "flex items-center gap-2", children: [d.jsx(Ae, { value: t, onChange: w, options: c, loading: m, placeholder: "\uBAA8\uB378 ID \uC9C1\uC811 \uC785\uB825 (\uC608: gpt-4o-mini)" }), d.jsxs("button", { type: "button", onClick: () => {
    p();
  }, disabled: m, className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", "aria-label": "\uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68", children: [m ? d.jsx(O, { size: 14, className: "animate-spin" }) : d.jsx($, { size: 14 }), "\uC0C8\uB85C\uACE0\uCE68"] })] }), d.jsx("p", { className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uC11C\uBC84 \uBAA8\uB378\uC744 \uAC00\uC838\uC624\uAC70\uB098, \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694." }), y ? d.jsx("p", { className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300", children: y }) : null] });
}
export {
  Me as G,
  Le as O,
  je as a,
  Ne as g,
  N as i
};
