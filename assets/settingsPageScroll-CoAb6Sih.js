function c(t, o) {
  const n = t.getBoundingClientRect(), e = o.getBoundingClientRect();
  return n.top - e.top + o.scrollTop;
}
function s(t, o, n) {
  const e = (n == null ? void 0 : n.behavior) ?? "smooth", r = Number.parseFloat(getComputedStyle(o).scrollMarginTop || "0") || 0, i = c(o, t) - r;
  t.scrollTo({ top: Math.max(0, i), behavior: e });
}
function l(t, o, n) {
  return o ? t ? (s(t, o, n), true) : (o.scrollIntoView({ block: "start", behavior: "smooth" }), true) : false;
}
export {
  l as a,
  s
};
