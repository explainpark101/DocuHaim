const _ = "s3haim_haim_dual_sync_debounce_ms", a = "s3haim-haim-dual-sync-debounce", l = 150, D = 0, E = 2e3;
function c(t) {
  return Number.isFinite(t) ? Math.min(2e3, Math.max(0, Math.round(t))) : 150;
}
function M() {
  if (typeof window > "u") return 150;
  try {
    const t = window.localStorage.getItem(_);
    return t == null || t === "" ? 150 : c(Number(t));
  } catch {
  }
  return 150;
}
function A(t) {
  if (typeof window > "u") return;
  const n = c(t);
  try {
    window.localStorage.setItem(_, String(n)), window.dispatchEvent(new CustomEvent(a, { detail: { ms: n } }));
  } catch {
  }
}
function r(t, n) {
  const o = t.getBoundingClientRect(), e = n.getBoundingClientRect();
  return o.top - e.top + n.scrollTop;
}
function u(t, n, o) {
  const e = (o == null ? void 0 : o.behavior) ?? "smooth", i = Number.parseFloat(getComputedStyle(n).scrollMarginTop || "0") || 0, s = r(n, t) - i;
  t.scrollTo({ top: Math.max(0, s), behavior: e });
}
function S(t, n, o) {
  return n ? t ? (u(t, n, o), true) : (n.scrollIntoView({ block: "start", behavior: "smooth" }), true) : false;
}
export {
  l as H,
  a,
  E as b,
  D as c,
  A as d,
  S as e,
  M as l,
  u as s
};
