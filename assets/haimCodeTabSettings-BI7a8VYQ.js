const T = "s3haim-haim-code-tab", A = "s3haim_haim_code_tab", m = 1, y = 8, h = ["python", "python-repl", "mojo"];
const s = { defaultWidth: 2, pythonFamilyWidth: 4, byLanguage: {} }, u = new Set(h.map((t) => t.toLowerCase())), c = { js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", py: "python" };
function i(t) {
  return Number.isFinite(t) ? Math.min(8, Math.max(1, Math.round(t))) : 2;
}
function f(t) {
  const n = t && typeof t == "object" ? t : {}, e = {};
  if (n.byLanguage && typeof n.byLanguage == "object") for (const [o, a] of Object.entries(n.byLanguage)) {
    const d = String(o || "").trim().toLowerCase();
    !d || typeof a != "number" || (e[d] = i(a));
  }
  return { defaultWidth: i(typeof n.defaultWidth == "number" ? n.defaultWidth : 2), pythonFamilyWidth: i(typeof n.pythonFamilyWidth == "number" ? n.pythonFamilyWidth : 4), byLanguage: e };
}
function l(t, n) {
  if (!n) return;
  if (t[n] != null) return t[n];
  const e = c[n];
  if (e && t[e] != null) return t[e];
  for (const [o, a] of Object.entries(c)) if (a === n && t[o] != null) return t[o];
}
function H(t, n = r()) {
  const e = String(t ?? "").trim().toLowerCase(), o = l(n.byLanguage, e);
  if (o != null) return o;
  const a = c[e] ?? e;
  return u.has(e) || u.has(a) ? n.pythonFamilyWidth : n.defaultWidth;
}
function r() {
  if (typeof window > "u") return { ...s, byLanguage: {} };
  try {
    const t = window.localStorage.getItem(A);
    return t ? f(JSON.parse(t)) : { ...s, byLanguage: {} };
  } catch {
    return { ...s, byLanguage: {} };
  }
}
function _(t) {
  if (typeof window > "u") return;
  const n = f(t);
  try {
    window.localStorage.setItem(A, JSON.stringify(n)), window.dispatchEvent(new CustomEvent(T, { detail: { settings: n } }));
  } catch {
  }
}
function p(t) {
  const n = r();
  _({ ...n, defaultWidth: i(t) });
}
function I(t) {
  const n = r();
  _({ ...n, pythonFamilyWidth: i(t) });
}
function E(t, n) {
  const e = String(t || "").trim().toLowerCase();
  if (!e) return;
  const o = r(), a = { ...o.byLanguage };
  n == null ? delete a[e] : a[e] = i(n), _({ ...o, byLanguage: a });
}
export {
  T as H,
  h as a,
  I as b,
  E as c,
  y as d,
  m as e,
  r as l,
  H as r,
  p as s
};
