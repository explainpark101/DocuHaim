import { o as a } from "./vendor-codemirror-0YdHorwW.js";
import { s as E, a as y, p as L } from "./taskCheckboxStatus-DlXLsCJg.js";
import { an as x, ao as C } from "./index-IR2VeToL.js";
const d = /^(\s*)([-+*])(\s+)(.*)$/, m = /^(\s*)(\d+)([.)])(\s+)(.*)$/, h = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX~])\](.*)$/, I = /^(\s*)>\s?(.*)$/, _ = /^(#{1,10})\s+(.*)$/;
function b(t) {
  if (!t) return false;
  const e = t[0];
  return [...t].every((n) => n === e);
}
function p(t, e, n, r, o) {
  const s = e - r.length, i = n + o.length;
  if (s < 0 || i > t.length || t.sliceString(s, e) !== r || t.sliceString(n, i) !== o) return false;
  if (r === o && b(r)) {
    const c = r[0] ?? "";
    if (s > 0 && t.sliceString(s - 1, s) === c || i < t.length && t.sliceString(i, i + 1) === c) return false;
  }
  return true;
}
function K(t, e, n, r) {
  const { from: o, to: s, empty: i } = e;
  if (i) {
    const u = `${n}${r}`;
    return { change: { from: o, to: s, insert: u }, next: a.cursor(o + n.length) };
  }
  const c = t.sliceString(o, s);
  if (c.length >= n.length + r.length && c.startsWith(n) && c.endsWith(r)) {
    const u = c.slice(n.length, c.length - r.length);
    return { change: { from: o, to: s, insert: u }, next: a.range(o, o + u.length) };
  }
  if (p(t, o, s, n, r)) {
    const u = o - n.length, F = s + r.length;
    return { change: { from: u, to: F, insert: c }, next: a.range(u, u + c.length) };
  }
  const T = `${n}${c}${r}`;
  return { change: { from: o, to: s, insert: T }, next: a.range(o + n.length, o + n.length + c.length) };
}
function R(t, e) {
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
  if (p(t, e.from, e.to, r, r)) {
    const i = e.from - r.length, c = e.to + r.length;
    return { change: { from: i, to: c, insert: n }, next: a.range(i, i + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: e.from, to: e.to, insert: s }, next: a.range(e.from + r.length, e.from + r.length + n.length) };
}
function k(t, e) {
  if (!e.length) return false;
  const n = e.map((o) => o.change).filter((o) => !!o).sort((o, s) => o.from - s.from);
  if (!n.length) return false;
  const r = e.map((o) => o.next);
  return t.dispatch({ changes: n, selection: a.create(r, t.state.selection.mainIndex) }), true;
}
function f(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.selection.ranges.map((o) => K(t.state.doc, o, e, n));
  return k(t, r);
}
function G(t) {
  return f(t, "**");
}
function J(t) {
  return f(t, "*");
}
function V(t) {
  return f(t, "~~");
}
function Y(t) {
  return f(t, "<u>", "</u>");
}
function Z(t) {
  return f(t, "^");
}
function w(t) {
  return f(t, "~");
}
function B(t) {
  if (!(t == null ? void 0 : t.state)) return false;
  const e = t.state.selection.ranges.map((n) => R(t.state.doc, n) ?? { next: n });
  return k(t, e);
}
function M(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t.state.selection.ranges) {
    const r = t.state.doc.lineAt(n.from).number, o = t.state.doc.lineAt(n.to).number;
    for (let s = r; s <= o; s += 1) e.add(s);
  }
  return [...e].sort((n, r) => n - r);
}
function l(t, e) {
  if (!(t == null ? void 0 : t.state)) return false;
  const n = [];
  for (const r of M(t)) {
    const o = t.state.doc.line(r), s = e(o.text);
    s !== null && s !== o.text && n.push({ from: o.from, to: o.to, insert: s });
  }
  return n.length ? (t.dispatch({ changes: n }), true) : false;
}
function N(t) {
  const e = t.match(d);
  if (e) return `${e[1] ?? ""}1. ${e[4] ?? ""}`;
  const n = t.match(m);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function P(t, e) {
  const n = t.match(h);
  if (!n) return null;
  const r = n[1] ?? "", o = n[2] ?? " ", s = n[3] ?? "", i = L(o), c = E(y(i, e), e);
  return `${r}[${c}]${s}`;
}
function v(t) {
  return l(t, N);
}
function W(t, e) {
  const n = e ?? x(t.state.doc.toString()) ?? C;
  return l(t, (r) => P(r, n));
}
function tt(t) {
  return (e) => W(e, t());
}
function et(t) {
  return l(t, (e) => {
    const n = e.match(d);
    if (n) {
      const o = n[1] ?? "", s = n[4] ?? "";
      return h.test(e) ? `${o}- ${s.replace(/^\[[ xX~]\]\s?/, "")}` : `${o}${s}`;
    }
    const r = e.match(m);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${e}`;
  });
}
function nt(t) {
  return l(t, (e) => {
    const n = e.match(m);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = e.match(d);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${e}`;
  });
}
function rt(t) {
  return l(t, (e) => {
    if (h.test(e)) return e.replace(h, (o, s, i, c) => `${s}${c.replace(/^\s/, "")}`);
    const n = e.match(d);
    if (n) return `${n[1] ?? ""}${n[2] ?? "-"}${n[3] ?? " "}[ ] ${n[4] ?? ""}`;
    const r = e.match(m);
    return r ? `${r[1] ?? ""}${r[2] ?? "1"}${r[3] ?? "."}${r[4] ?? " "}[ ] ${r[5] ?? ""}` : `- [ ] ${e}`;
  });
}
function ot(t) {
  return l(t, (e) => {
    const n = e.match(I);
    return n ? `${n[1] ?? ""}${n[2] ?? ""}` : `> ${e}`;
  });
}
function st(t, e) {
  if (e < 1 || e > 10) return false;
  const n = "#".repeat(e);
  return l(t, (r) => {
    var _a;
    const o = r.match(_);
    return o ? ((_a = o[1]) == null ? void 0 : _a.length) === e ? o[2] ?? "" : `${n} ${o[2] ?? ""}` : `${n} ${r}`;
  });
}
function g(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.changeByRange((o) => {
    if (o.empty) return { range: o };
    const s = t.state.doc.sliceString(o.from, o.to), i = `${e}${s}${n}`;
    return { changes: { from: o.from, to: o.to, insert: i }, range: a.range(o.from + e.length, o.from + e.length + s.length) };
  });
  return r.changes.empty ? false : (t.dispatch(r), true);
}
function A(t) {
  return g(t, "$");
}
function D(t) {
  return g(t, "[", "]");
}
function O(t) {
  return g(t, "(", ")");
}
function U(t) {
  return g(t, "{", "}");
}
function $(t) {
  return g(t, "'");
}
function S(t) {
  return g(t, '"');
}
function H() {
  if (typeof navigator > "u") return false;
  const t = navigator.platform || "", e = navigator.userAgent || "";
  return !!(/iPhone|iPad|iPod/i.test(e) || /iPhone|iPad|iPod/i.test(t) || /Mac/i.test(t) || /Mac OS X/i.test(e));
}
function Q(t) {
  if (t.ctrlKey || t.metaKey || t.altKey) return false;
  const { key: e, code: n } = t;
  return e === "`" || n === "Backquote" ? true : H() ? e === "\u20A9" || e === "\\" || n === "IntlBackslash" : false;
}
function X(t, e) {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return false;
  switch (e.key) {
    case "$":
      return A(t);
    case "[":
      return D(t);
    case "(":
      return O(t);
    case "{":
      return U(t);
    case "'":
      return $(t);
    case '"':
      return S(t);
    default:
      return e.code === "Quote" ? e.shiftKey ? S(t) : $(t) : false;
  }
}
function it(t, e) {
  return !e || e.composing ? false : Q(t) && B(e) ? true : X(e, t);
}
export {
  J as a,
  et as b,
  Y as c,
  nt as d,
  V as e,
  Z as f,
  w as g,
  it as h,
  st as i,
  X as j,
  ot as k,
  rt as l,
  tt as m,
  f as n,
  v as o,
  W as p,
  G as t,
  B as w
};
