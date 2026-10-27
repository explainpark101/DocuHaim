function y(n, t) {
  const o = n.getBoundingClientRect(), e = t.getBoundingClientRect();
  return o.top - e.top + t.scrollTop;
}
function _(n, t, o) {
  const e = (o == null ? void 0 : o.behavior) ?? "smooth", i = Number.parseFloat(getComputedStyle(t).scrollMarginTop || "0") || 0, r = y(t, n) - i;
  n.scrollTo({ top: Math.max(0, r), behavior: e });
}
function H(n, t, o) {
  return t ? n ? (_(n, t, o), true) : (t.scrollIntoView({ block: "start", behavior: "smooth" }), true) : false;
}
const T = "s3haim-haim-code-tab", h = "s3haim_haim_code_tab", b = 1, g = 8, A = ["python", "python-repl", "mojo"], l = 2, p = 4, c = { defaultWidth: l, pythonFamilyWidth: p, byLanguage: {} }, f = new Set(A.map((n) => n.toLowerCase())), u = { js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", py: "python" };
function a(n) {
  return Number.isFinite(n) ? Math.min(g, Math.max(b, Math.round(n))) : l;
}
function m(n) {
  const t = n && typeof n == "object" ? n : {}, o = {};
  if (t.byLanguage && typeof t.byLanguage == "object") for (const [e, i] of Object.entries(t.byLanguage)) {
    const r = String(e || "").trim().toLowerCase();
    !r || typeof i != "number" || (o[r] = a(i));
  }
  return { defaultWidth: a(typeof t.defaultWidth == "number" ? t.defaultWidth : l), pythonFamilyWidth: a(typeof t.pythonFamilyWidth == "number" ? t.pythonFamilyWidth : p), byLanguage: o };
}
function C(n, t) {
  if (!t) return;
  if (n[t] != null) return n[t];
  const o = u[t];
  if (o && n[o] != null) return n[o];
  for (const [e, i] of Object.entries(u)) if (i === t && n[e] != null) return n[e];
}
function S(n, t = s()) {
  const o = String(n ?? "").trim().toLowerCase(), e = C(t.byLanguage, o);
  if (e != null) return e;
  const i = u[o] ?? o;
  return f.has(o) || f.has(i) ? t.pythonFamilyWidth : t.defaultWidth;
}
function s() {
  if (typeof window > "u") return { ...c, byLanguage: {} };
  try {
    const n = window.localStorage.getItem(h);
    return n ? m(JSON.parse(n)) : { ...c, byLanguage: {} };
  } catch {
    return { ...c, byLanguage: {} };
  }
}
function d(n) {
  if (typeof window > "u") return;
  const t = m(n);
  try {
    window.localStorage.setItem(h, JSON.stringify(t)), window.dispatchEvent(new CustomEvent(T, { detail: { settings: t } }));
  } catch {
  }
}
function W(n) {
  const t = s();
  d({ ...t, defaultWidth: a(n) });
}
function E(n) {
  const t = s();
  d({ ...t, pythonFamilyWidth: a(n) });
}
function v(n, t) {
  const o = String(n || "").trim().toLowerCase();
  if (!o) return;
  const e = s(), i = { ...e.byLanguage };
  t == null ? delete i[o] : i[o] = a(t), d({ ...e, byLanguage: i });
}
export {
  T as H,
  A as a,
  W as b,
  E as c,
  v as d,
  g as e,
  b as f,
  H as g,
  s as l,
  S as r,
  _ as s
};
