import { F as I, o as a } from "./vendor-codemirror-V7b8BJE-.js";
import { s as C, a as b, p as _ } from "./emojiShortcode-CZFZfFoz.js";
import { am as K, an as N } from "./index-BYVoYwQr.js";
const $ = /^(\s*)([-+*])(\s+)(.*)$/, p = /^(\s*)(\d+)([.)])(\s+)(.*)$/, m = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX~])\](.*)$/, R = /^(\s*)>\s?(.*)$/, k = /^(#{1,10})\s+(.*)$/;
function B(t) {
  if (!t) return false;
  const e = t[0];
  return [...t].every((n) => n === e);
}
function L(t, e, n, r, o) {
  const s = e - r.length, i = n + o.length;
  if (s < 0 || i > t.length || t.sliceString(s, e) !== r || t.sliceString(n, i) !== o) return false;
  if (r === o && B(r)) {
    const c = r[0] ?? "";
    if (s > 0 && t.sliceString(s - 1, s) === c || i < t.length && t.sliceString(i, i + 1) === c) return false;
  }
  return true;
}
function P(t, e, n, r) {
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
  if (L(t, o, s, n, r)) {
    const u = o - n.length, l = s + r.length;
    return { change: { from: u, to: l, insert: c }, next: a.range(u, u + c.length) };
  }
  const S = `${n}${c}${r}`;
  return { change: { from: o, to: s, insert: S }, next: a.range(o + n.length, o + n.length + c.length) };
}
function A(t, e) {
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
  if (L(t, e.from, e.to, r, r)) {
    const i = e.from - r.length, c = e.to + r.length;
    return { change: { from: i, to: c, insert: n }, next: a.range(i, i + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: e.from, to: e.to, insert: s }, next: a.range(e.from + r.length, e.from + r.length + n.length) };
}
function y(t, e) {
  if (!e.length) return false;
  const n = e.map((o) => o.change).filter((o) => !!o).sort((o, s) => o.from - s.from);
  if (!n.length) return false;
  const r = e.map((o) => o.next);
  return t.dispatch({ changes: n, selection: a.create(r, t.state.selection.mainIndex) }), true;
}
function g(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.selection.ranges.map((o) => P(t.state.doc, o, e, n));
  return y(t, r);
}
function et(t) {
  return g(t, "**");
}
function nt(t) {
  return g(t, "*");
}
function rt(t) {
  return g(t, "~~");
}
function ot(t) {
  return g(t, "<u>", "</u>");
}
function st(t) {
  return g(t, "^");
}
function it(t) {
  return g(t, "~");
}
function M(t) {
  if (!(t == null ? void 0 : t.state)) return false;
  const e = t.state.selection.ranges.map((n) => A(t.state.doc, n) ?? { next: n });
  return y(t, e);
}
function E(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t.selection.ranges) {
    const r = t.doc.lineAt(n.from).number, o = t.doc.lineAt(n.to).number;
    for (let s = r; s <= o; s += 1) e.add(s);
  }
  return [...e].sort((n, r) => n - r);
}
function O(t) {
  return (t == null ? void 0 : t.state) ? E(t.state) : [];
}
function h(t, e) {
  if (!(t == null ? void 0 : t.state)) return false;
  const n = [];
  for (const r of O(t)) {
    const o = t.state.doc.line(r), s = e(o.text);
    s !== null && s !== o.text && n.push({ from: o.from, to: o.to, insert: s });
  }
  return n.length ? (t.dispatch({ changes: n }), true) : false;
}
function W(t) {
  const e = t.match($);
  if (e) return `${e[1] ?? ""}1. ${e[4] ?? ""}`;
  const n = t.match(p);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function D(t, e) {
  const n = t.match(m);
  if (!n) return null;
  const r = n[1] ?? "", o = n[2] ?? " ", s = n[3] ?? "", i = _(o), c = C(b(i, e), e);
  return `${r}[${c}]${s}`;
}
function ct(t) {
  return h(t, W);
}
function H(t, e) {
  const n = e ?? K(t.state.doc.toString()) ?? N;
  return h(t, (r) => D(r, n));
}
function ut(t) {
  return (e) => H(e, t());
}
function at(t) {
  return h(t, (e) => {
    const n = e.match($);
    if (n) {
      const o = n[1] ?? "", s = n[4] ?? "";
      return m.test(e) ? `${o}- ${s.replace(/^\[[ xX~]\]\s?/, "")}` : `${o}${s}`;
    }
    const r = e.match(p);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${e}`;
  });
}
function lt(t) {
  return h(t, (e) => {
    const n = e.match(p);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = e.match($);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${e}`;
  });
}
function ft(t) {
  return h(t, (e) => {
    if (m.test(e)) return e.replace(m, (o, s, i, c) => `${s}${c.replace(/^\s/, "")}`);
    const n = e.match($);
    if (n) return `${n[1] ?? ""}${n[2] ?? "-"}${n[3] ?? " "}[ ] ${n[4] ?? ""}`;
    const r = e.match(p);
    return r ? `${r[1] ?? ""}${r[2] ?? "1"}${r[3] ?? "."}${r[4] ?? " "}[ ] ${r[5] ?? ""}` : `- [ ] ${e}`;
  });
}
function gt(t) {
  return h(t, (e) => {
    const n = e.match(R);
    return n ? `${n[1] ?? ""}${n[2] ?? ""}` : `> ${e}`;
  });
}
function U(t, e) {
  var _a;
  const n = "#".repeat(e), r = t.match(k);
  return r ? ((_a = r[1]) == null ? void 0 : _a.length) === e ? r[2] ?? "" : `${n} ${r[2] ?? ""}` : `${n} ${t}`;
}
function Q(t) {
  const e = t.match(k);
  return e ? (e[2] ?? "").trim() === "" : false;
}
function X(t) {
  const e = t.match(k);
  return e ? (e[2] ?? "").trim() !== "" : t.trim() !== "";
}
function q(t, e) {
  if (e < 1 || e > 10) return null;
  const n = E(t), r = n.length > 1, o = [], s = /* @__PURE__ */ new Set();
  for (const u of n) {
    const l = t.doc.line(u);
    if (r && !X(l.text)) continue;
    const f = U(l.text, e);
    f !== l.text && (o.push({ from: l.from, to: l.to, insert: f }), Q(f) && s.add(u));
  }
  if (!o.length) return null;
  const i = I.of(o, t.doc.length), c = t.selection.map(i), S = c.ranges.map((u, l) => {
    const f = t.selection.ranges[l];
    if (!(f == null ? void 0 : f.empty)) return u;
    const T = t.doc.lineAt(f.head);
    return s.has(T.number) ? a.cursor(i.mapPos(T.to, 1)) : u;
  });
  return t.update({ changes: o, selection: a.create(S, c.mainIndex), scrollIntoView: true });
}
function ht(t, e) {
  if (!(t == null ? void 0 : t.state)) return false;
  const n = q(t.state, e);
  return n ? (t.dispatch(n), true) : false;
}
function d(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.changeByRange((o) => {
    if (o.empty) return { range: o };
    const s = t.state.doc.sliceString(o.from, o.to), i = `${e}${s}${n}`;
    return { changes: { from: o.from, to: o.to, insert: i }, range: a.range(o.from + e.length, o.from + e.length + s.length) };
  });
  return r.changes.empty ? false : (t.dispatch(r), true);
}
function j(t) {
  return d(t, "$");
}
function z(t) {
  return d(t, "[", "]");
}
function G(t) {
  return d(t, "(", ")");
}
function V(t) {
  return d(t, "{", "}");
}
function F(t) {
  return d(t, "'");
}
function x(t) {
  return d(t, '"');
}
function J() {
  if (typeof navigator > "u") return false;
  const t = navigator.platform || "", e = navigator.userAgent || "";
  return !!(/iPhone|iPad|iPod/i.test(e) || /iPhone|iPad|iPod/i.test(t) || /Mac/i.test(t) || /Mac OS X/i.test(e));
}
function Y(t) {
  if (t.ctrlKey || t.metaKey || t.altKey) return false;
  const { key: e, code: n } = t;
  return e === "`" || n === "Backquote" ? true : J() ? e === "\u20A9" || e === "\\" || n === "IntlBackslash" : false;
}
function Z(t, e) {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return false;
  switch (e.key) {
    case "$":
      return j(t);
    case "[":
      return z(t);
    case "(":
      return G(t);
    case "{":
      return V(t);
    case "'":
      return F(t);
    case '"':
      return x(t);
    default:
      return e.code === "Quote" ? e.shiftKey ? x(t) : F(t) : false;
  }
}
function dt(t, e) {
  return !e || e.composing ? false : Y(t) && M(e) ? true : Z(e, t);
}
export {
  nt as a,
  at as b,
  ot as c,
  lt as d,
  rt as e,
  st as f,
  it as g,
  dt as h,
  ht as i,
  ct as j,
  H as k,
  gt as l,
  ut as m,
  ft as n,
  g as o,
  Y as p,
  et as t,
  M as w
};
