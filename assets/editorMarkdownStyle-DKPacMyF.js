import { o as a } from "./vendor-codemirror-0YdHorwW.js";
import { s as T, a as F, p as E } from "./taskCheckboxStatus-DlXLsCJg.js";
import { M as L, N as x } from "./index-Dog3fMs3.js";
const m = /^(\s*)([-+*])(\s+)(.*)$/, d = /^(\s*)(\d+)([.)])(\s+)(.*)$/, h = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX~])\](.*)$/, _ = /^(\s*)>\s?(.*)$/, C = /^(#{1,10})\s+(.*)$/;
function b(t) {
  if (!t) return false;
  const n = t[0];
  return [...t].every((e) => e === n);
}
function $(t, n, e, r, o) {
  const s = n - r.length, c = e + o.length;
  if (s < 0 || c > t.length || t.sliceString(s, n) !== r || t.sliceString(e, c) !== o) return false;
  if (r === o && b(r)) {
    const i = r[0] ?? "";
    if (s > 0 && t.sliceString(s - 1, s) === i || c < t.length && t.sliceString(c, c + 1) === i) return false;
  }
  return true;
}
function I(t, n, e, r) {
  const { from: o, to: s, empty: c } = n;
  if (c) {
    const l = `${e}${r}`;
    return { change: { from: o, to: s, insert: l }, next: a.cursor(o + e.length) };
  }
  const i = t.sliceString(o, s);
  if (i.length >= e.length + r.length && i.startsWith(e) && i.endsWith(r)) {
    const l = i.slice(e.length, i.length - r.length);
    return { change: { from: o, to: s, insert: l }, next: a.range(o, o + l.length) };
  }
  if ($(t, o, s, e, r)) {
    const l = o - e.length, p = s + r.length;
    return { change: { from: l, to: p, insert: i }, next: a.range(l, l + i.length) };
  }
  const k = `${e}${i}${r}`;
  return { change: { from: o, to: s, insert: k }, next: a.range(o + e.length, o + e.length + i.length) };
}
function R(t, n) {
  if (n.empty) return null;
  const e = t.sliceString(n.from, n.to);
  if (!e) return null;
  let r = "`";
  for (; e.includes(r); ) r += "`";
  if (!e.includes(`
`) && e.startsWith(r) && e.endsWith(r) && e.length > r.length * 2) {
    const c = e.slice(r.length, e.length - r.length);
    return { change: { from: n.from, to: n.to, insert: c }, next: a.range(n.from, n.from + c.length) };
  }
  if ($(t, n.from, n.to, r, r)) {
    const c = n.from - r.length, i = n.to + r.length;
    return { change: { from: c, to: i, insert: e }, next: a.range(c, c + e.length) };
  }
  const s = `${r}${e}${r}`;
  return { change: { from: n.from, to: n.to, insert: s }, next: a.range(n.from + r.length, n.from + r.length + e.length) };
}
function S(t, n) {
  if (!n.length) return false;
  const e = n.map((o) => o.change).filter((o) => !!o).sort((o, s) => o.from - s.from);
  if (!e.length) return false;
  const r = n.map((o) => o.next);
  return t.dispatch({ changes: e, selection: a.create(r, t.state.selection.mainIndex) }), true;
}
function f(t, n, e = n) {
  if (!(t == null ? void 0 : t.state) || !n) return false;
  const r = t.state.selection.ranges.map((o) => I(t.state.doc, o, n, e));
  return S(t, r);
}
function A(t) {
  return f(t, "**");
}
function U(t) {
  return f(t, "*");
}
function H(t) {
  return f(t, "~~");
}
function K(t) {
  return f(t, "<u>", "</u>");
}
function Q(t) {
  return f(t, "^");
}
function X(t) {
  return f(t, "~");
}
function q(t) {
  if (!(t == null ? void 0 : t.state)) return false;
  const n = t.state.selection.ranges.map((e) => R(t.state.doc, e) ?? { next: e });
  return S(t, n);
}
function N(t) {
  const n = /* @__PURE__ */ new Set();
  for (const e of t.state.selection.ranges) {
    const r = t.state.doc.lineAt(e.from).number, o = t.state.doc.lineAt(e.to).number;
    for (let s = r; s <= o; s += 1) n.add(s);
  }
  return [...n].sort((e, r) => e - r);
}
function u(t, n) {
  if (!(t == null ? void 0 : t.state)) return false;
  const e = [];
  for (const r of N(t)) {
    const o = t.state.doc.line(r), s = n(o.text);
    s !== null && s !== o.text && e.push({ from: o.from, to: o.to, insert: s });
  }
  return e.length ? (t.dispatch({ changes: e }), true) : false;
}
function B(t) {
  const n = t.match(m);
  if (n) return `${n[1] ?? ""}1. ${n[4] ?? ""}`;
  const e = t.match(d);
  return e ? `${e[1] ?? ""}- ${e[5] ?? ""}` : null;
}
function D(t, n) {
  const e = t.match(h);
  if (!e) return null;
  const r = e[1] ?? "", o = e[2] ?? " ", s = e[3] ?? "", c = E(o), i = T(F(c, n), n);
  return `${r}[${i}]${s}`;
}
function P(t) {
  return u(t, B);
}
function M(t, n) {
  const e = n ?? L(t.state.doc.toString()) ?? x;
  return u(t, (r) => D(r, e));
}
function j(t) {
  return (n) => M(n, t());
}
function w(t) {
  return u(t, (n) => {
    const e = n.match(m);
    if (e) {
      const o = e[1] ?? "", s = e[4] ?? "";
      return h.test(n) ? `${o}- ${s.replace(/^\[[ xX~]\]\s?/, "")}` : `${o}${s}`;
    }
    const r = n.match(d);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${n}`;
  });
}
function z(t) {
  return u(t, (n) => {
    const e = n.match(d);
    if (e) return `${e[1] ?? ""}${e[5] ?? ""}`;
    const r = n.match(m);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${n}`;
  });
}
function G(t) {
  return u(t, (n) => {
    if (h.test(n)) return n.replace(h, (o, s, c, i) => `${s}${i.replace(/^\s/, "")}`);
    const e = n.match(m);
    if (e) return `${e[1] ?? ""}${e[2] ?? "-"}${e[3] ?? " "}[ ] ${e[4] ?? ""}`;
    const r = n.match(d);
    return r ? `${r[1] ?? ""}${r[2] ?? "1"}${r[3] ?? "."}${r[4] ?? " "}[ ] ${r[5] ?? ""}` : `- [ ] ${n}`;
  });
}
function J(t) {
  return u(t, (n) => {
    const e = n.match(_);
    return e ? `${e[1] ?? ""}${e[2] ?? ""}` : `> ${n}`;
  });
}
function V(t, n) {
  if (n < 1 || n > 10) return false;
  const e = "#".repeat(n);
  return u(t, (r) => {
    var _a;
    const o = r.match(C);
    return o ? ((_a = o[1]) == null ? void 0 : _a.length) === n ? o[2] ?? "" : `${e} ${o[2] ?? ""}` : `${e} ${r}`;
  });
}
function g(t, n, e = n) {
  if (!(t == null ? void 0 : t.state) || !n) return false;
  const r = t.state.changeByRange((o) => {
    if (o.empty) return { range: o };
    const s = t.state.doc.sliceString(o.from, o.to), c = `${n}${s}${e}`;
    return { changes: { from: o.from, to: o.to, insert: c }, range: a.range(o.from + n.length, o.from + n.length + s.length) };
  });
  return r.changes.empty ? false : (t.dispatch(r), true);
}
function Y(t) {
  return g(t, "$");
}
function Z(t) {
  return g(t, "[", "]");
}
function v(t) {
  return g(t, "(", ")");
}
function tt(t) {
  return g(t, "{", "}");
}
function et(t) {
  return g(t, "'");
}
function nt(t) {
  return g(t, '"');
}
export {
  nt as a,
  et as b,
  tt as c,
  v as d,
  Z as e,
  Y as f,
  G as g,
  z as h,
  w as i,
  V as j,
  Q as k,
  X as l,
  j as m,
  f as n,
  H as o,
  K as p,
  U as q,
  A as r,
  P as s,
  J as t,
  M as u,
  q as w
};
