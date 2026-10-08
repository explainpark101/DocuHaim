import { s as c, g as i } from "./vendor-tiptap-B9z9WF3R.js";
const k = /<!--\s*note-cover\b[\s\S]*?-->/i;
function f(e) {
  return k.test(String(e ?? ""));
}
function h() {
  return ['<div class="md-note-cover-placeholder md-note-cover-placeholder--pending" data-note-cover-placeholder="1" role="button" tabindex="0" title="\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9">', '<div class="md-note-cover-placeholder__mount" data-note-cover-mount="1"></div>', '<span class="md-note-cover-placeholder__fallback">', '<span class="md-note-cover-placeholder__spinner" aria-hidden="true"></span>', '<span class="md-note-cover-placeholder__fallback-text">\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026</span>', "</span>", "</div>"].join("");
}
function r(e) {
  const { tokens: n } = e;
  return (n == null ? void 0 : n.length) && (e.tokens = n.map((o) => {
    if ((o.type === "html_block" || o.type === "html_inline") && f(o.content)) {
      const t = new e.Token("html_block", "", 0);
      return t.content = h(), t.block = true, t;
    }
    return o;
  })), true;
}
function C(e) {
  try {
    e.core.ruler.before("xss", "note-cover-placeholder", r);
  } catch {
    e.core.ruler.push("note-cover-placeholder", r);
  }
}
const s = " ", a = "~", u = "x";
function d(e) {
  const n = String(e ?? " ");
  return n === a ? "doing" : n === "x" || n === "X" ? "done" : "todo";
}
function m(e) {
  return e === "doing" ? a : e === "done" ? u : s;
}
function p(e) {
  return d(e) === "doing" ? "status" : "check";
}
function l(e, n) {
  return n === "doing" || e === "status" ? "status" : "check";
}
function x(e) {
  return l(e == null ? void 0 : e.kind, b(e));
}
function g(e) {
  return e === "todo" ? "doing" : e === "doing" ? "done" : "todo";
}
function v(e) {
  return e === "done" ? "todo" : "done";
}
function E(e, n) {
  return l(n, e ?? void 0) === "status" ? g(e) : e === "doing" ? "done" : v(e);
}
function S(e) {
  const n = d(e), o = p(e);
  return { status: n, checked: n === "done", kind: n === "doing" ? "status" : o };
}
function T(e, n) {
  return n === "check" ? e === "done" ? u : s : m(e);
}
function b(e) {
  const n = e == null ? void 0 : e.status;
  return n === "todo" || n === "doing" || n === "done" ? n : (e == null ? void 0 : e.checked) ? "done" : "todo";
}
const M = /:([a-zA-Z0-9_+-]+):/g;
function O(e) {
  var _a;
  const n = String(e ?? "").trim();
  if (!n) return null;
  const t = (_a = c(n, i)) == null ? void 0 : _a.emoji;
  return t ? String(t) : null;
}
function R(e) {
  const n = String(e ?? "").trim();
  if (!n) return null;
  const o = c(n, i);
  return (o == null ? void 0 : o.name) ? String(o.name) : null;
}
export {
  M as E,
  E as a,
  b,
  x as c,
  l as d,
  S as e,
  R as f,
  h as g,
  C as n,
  d as p,
  O as r,
  T as s,
  p as t
};
