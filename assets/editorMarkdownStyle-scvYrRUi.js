import { o as a } from "./vendor-codemirror-D25dVEXW.js";
import { s as x, a as T, p as F } from "./taskCheckboxStatus-DlXLsCJg.js";
import { M as L, N as E } from "./index-B8271DNI.js";
const h = /^(\s*)([-+*])(\s+)(.*)$/, m = /^(\s*)(\d+)([.)])(\s+)(.*)$/, d = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX~])\](.*)$/, C = /^(#{1,10})\s+(.*)$/;
function b(t) {
  if (!t) return false;
  const e = t[0];
  return [...t].every((n) => n === e);
}
function S(t, e, n, r, o) {
  const s = e - r.length, i = n + o.length;
  if (s < 0 || i > t.length || t.sliceString(s, e) !== r || t.sliceString(n, i) !== o) return false;
  if (r === o && b(r)) {
    const c = r[0] ?? "";
    if (s > 0 && t.sliceString(s - 1, s) === c || i < t.length && t.sliceString(i, i + 1) === c) return false;
  }
  return true;
}
function I(t, e, n, r) {
  const { from: o, to: s, empty: i } = e;
  if (i) {
    const l = `${n}${r}`;
    return { change: { from: o, to: s, insert: l }, next: a.cursor(o + n.length) };
  }
  const c = t.sliceString(o, s);
  if (c.length >= n.length + r.length && c.startsWith(n) && c.endsWith(r)) {
    const l = c.slice(n.length, c.length - r.length);
    return { change: { from: o, to: s, insert: l }, next: a.range(o, o + l.length) };
  }
  if (S(t, o, s, n, r)) {
    const l = o - n.length, p = s + r.length;
    return { change: { from: l, to: p, insert: c }, next: a.range(l, l + c.length) };
  }
  const k = `${n}${c}${r}`;
  return { change: { from: o, to: s, insert: k }, next: a.range(o + n.length, o + n.length + c.length) };
}
function _(t, e) {
  if (e.empty) return null;
  const n = t.sliceString(e.from, e.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const i = n.slice(r.length, n.length - r.length);
    return { change: { from: e.from, to: e.to, insert: i }, next: a.range(e.from, e.from + i.length) };
  }
  if (S(t, e.from, e.to, r, r)) {
    const i = e.from - r.length, c = e.to + r.length;
    return { change: { from: i, to: c, insert: n }, next: a.range(i, i + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: e.from, to: e.to, insert: s }, next: a.range(e.from + r.length, e.from + r.length + n.length) };
}
function $(t, e) {
  if (!e.length) return false;
  const n = e.map((o) => o.change).filter((o) => !!o).sort((o, s) => o.from - s.from);
  if (!n.length) return false;
  const r = e.map((o) => o.next);
  return t.dispatch({ changes: n, selection: a.create(r, t.state.selection.mainIndex) }), true;
}
function u(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.selection.ranges.map((o) => I(t.state.doc, o, e, n));
  return $(t, r);
}
function A(t) {
  return u(t, "**");
}
function O(t) {
  return u(t, "*");
}
function U(t) {
  return u(t, "~~");
}
function H(t) {
  return u(t, "<u>", "</u>");
}
function K(t) {
  return u(t, "^");
}
function X(t) {
  return u(t, "~");
}
function P(t) {
  if (!(t == null ? void 0 : t.state)) return false;
  const e = t.state.selection.ranges.map((n) => _(t.state.doc, n) ?? { next: n });
  return $(t, e);
}
function R(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t.state.selection.ranges) {
    const r = t.state.doc.lineAt(n.from).number, o = t.state.doc.lineAt(n.to).number;
    for (let s = r; s <= o; s += 1) e.add(s);
  }
  return [...e].sort((n, r) => n - r);
}
function g(t, e) {
  if (!(t == null ? void 0 : t.state)) return false;
  const n = [];
  for (const r of R(t)) {
    const o = t.state.doc.line(r), s = e(o.text);
    s !== null && s !== o.text && n.push({ from: o.from, to: o.to, insert: s });
  }
  return n.length ? (t.dispatch({ changes: n }), true) : false;
}
function N(t) {
  const e = t.match(h);
  if (e) return `${e[1] ?? ""}1. ${e[4] ?? ""}`;
  const n = t.match(m);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function B(t, e) {
  const n = t.match(d);
  if (!n) return null;
  const r = n[1] ?? "", o = n[2] ?? " ", s = n[3] ?? "", i = F(o), c = x(T(i, e), e);
  return `${r}[${c}]${s}`;
}
function Q(t) {
  return g(t, N);
}
function D(t, e) {
  const n = e ?? L(t.state.doc.toString()) ?? E;
  return g(t, (r) => B(r, n));
}
function j(t) {
  return (e) => D(e, t());
}
function q(t) {
  return g(t, (e) => {
    const n = e.match(h);
    if (n) {
      const o = n[1] ?? "", s = n[4] ?? "";
      return d.test(e) ? `${o}- ${s.replace(/^\[[ xX~]\]\s?/, "")}` : `${o}${s}`;
    }
    const r = e.match(m);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${e}`;
  });
}
function w(t) {
  return g(t, (e) => {
    const n = e.match(m);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = e.match(h);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${e}`;
  });
}
function z(t, e) {
  if (e < 1 || e > 10) return false;
  const n = "#".repeat(e);
  return g(t, (r) => {
    var _a;
    const o = r.match(C);
    return o ? ((_a = o[1]) == null ? void 0 : _a.length) === e ? o[2] ?? "" : `${n} ${o[2] ?? ""}` : `${n} ${r}`;
  });
}
function f(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.changeByRange((o) => {
    if (o.empty) return { range: o };
    const s = t.state.doc.sliceString(o.from, o.to), i = `${e}${s}${n}`;
    return { changes: { from: o.from, to: o.to, insert: i }, range: a.range(o.from + e.length, o.from + e.length + s.length) };
  });
  return r.changes.empty ? false : (t.dispatch(r), true);
}
function G(t) {
  return f(t, "$");
}
function J(t) {
  return f(t, "[", "]");
}
function V(t) {
  return f(t, "(", ")");
}
function Y(t) {
  return f(t, "{", "}");
}
function Z(t) {
  return f(t, "'");
}
function v(t) {
  return f(t, '"');
}
export {
  v as a,
  Z as b,
  Y as c,
  V as d,
  J as e,
  G as f,
  D as g,
  A as h,
  O as i,
  q as j,
  H as k,
  w as l,
  j as m,
  U as n,
  K as o,
  X as p,
  z as q,
  Q as t,
  P as w
};
