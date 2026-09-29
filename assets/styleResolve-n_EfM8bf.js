import { aR as y, aS as m, aT as c, aU as b } from "./index-BpNs1tUw.js";
function w(e, t) {
  return e.noHeader ? 0 : Math.min(Math.max(0, e.headerRows), t);
}
function g(e, t, s, r) {
  const o = Math.min(Math.max(0, s), t), n = Math.min(Math.max(0, r), Math.max(0, t - o));
  return e < o ? "thead" : e >= t - n && n > 0 ? "tfoot" : "tbody";
}
function h(e, t) {
  if (e == null) return false;
  const s = String(e).trim().toLowerCase();
  if (!s) return false;
  if (s === "odd") return t % 2 === 1;
  if (s === "even") return t % 2 === 0;
  if (/^\d+$/.test(s)) return Number(s) === t;
  const r = /^(-?\d*)n([+-]\d+)?$/.exec(s);
  if (!r) return false;
  let o;
  r[1] === "" || r[1] === "+" ? o = 1 : r[1] === "-" ? o = -1 : o = Number(r[1]);
  const n = r[2] ? Number(r[2]) : 0;
  if (!Number.isFinite(o) || !Number.isFinite(n)) return false;
  if (o === 0) return t === n;
  if (o > 0) return t < n ? false : (t - n) % o === 0;
  for (let i = 0; i < 1e3; i += 1) {
    const l = o * i + n;
    if (l === t) return true;
    if (l <= 0 && i > 0) break;
  }
  return false;
}
function S(e, t, s) {
  const r = e.rows != null && String(e.rows).trim() !== "", o = e.cols != null && String(e.cols).trim() !== "";
  if (!r && !o) return false;
  let n = true, i = true;
  return r && (n = h(String(e.rows), t + 1)), o && (i = h(String(e.cols), s + 1)), n && i;
}
function N(e) {
  var _a, _b;
  const { row: t, col: s, rowCount: r, colCount: o, meta: n, template: i } = e, l = g(t, r, w(n, r), n.footerRows);
  let f = {};
  if ((_a = i == null ? void 0 : i.rules) == null ? void 0 : _a.length) for (const u of i.rules) S(u, t, s) && (f = y(f, m(u)));
  n.style && Object.keys(n.style).length && (f = c(f, m(n.style))), n.sections[l] ? f = c(f, n.sections[l]) : ((_b = i == null ? void 0 : i.sections) == null ? void 0 : _b[l]) && (f = c(f, i.sections[l]));
  const a = n.cells[b(t, s)];
  return a && (f = c(f, a)), f;
}
function R(e, t) {
  const s = { ...e.sections };
  if (t.sections) for (const r of ["thead", "tbody", "tfoot"]) t.sections[r] && (s[r] = c(s[r] ?? {}, t.sections[r]));
  return { ...e, sections: s, templateId: t.id };
}
export {
  R as a,
  w as e,
  N as r
};
