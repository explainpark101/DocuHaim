const u = /<!--\s*note-cover\b[\s\S]*?-->/i;
function l(e) {
  return u.test(String(e ?? ""));
}
function k() {
  return ['<div class="md-note-cover-placeholder md-note-cover-placeholder--pending" data-note-cover-placeholder="1" role="button" tabindex="0" title="\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9">', '<div class="md-note-cover-placeholder__mount" data-note-cover-mount="1"></div>', '<span class="md-note-cover-placeholder__fallback">', '<span class="md-note-cover-placeholder__spinner" aria-hidden="true"></span>', '<span class="md-note-cover-placeholder__fallback-text">\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026</span>', "</span>", "</div>"].join("");
}
function r(e) {
  const { tokens: n } = e;
  return (n == null ? void 0 : n.length) && (e.tokens = n.map((o) => {
    if ((o.type === "html_block" || o.type === "html_inline") && l(o.content)) {
      const t = new e.Token("html_block", "", 0);
      return t.content = k(), t.block = true, t;
    }
    return o;
  })), true;
}
function m(e) {
  try {
    e.core.ruler.before("xss", "note-cover-placeholder", r);
  } catch {
    e.core.ruler.push("note-cover-placeholder", r);
  }
}
const c = " ", s = "~", a = "x";
function i(e) {
  const n = String(e ?? " ");
  return n === s ? "doing" : n === "x" || n === "X" ? "done" : "todo";
}
function f(e) {
  return e === "doing" ? s : e === "done" ? a : c;
}
function h(e) {
  return i(e) === "doing" ? "status" : "check";
}
function d(e, n) {
  return n === "doing" || e === "status" ? "status" : "check";
}
function x(e) {
  return d(e == null ? void 0 : e.kind, b(e));
}
function p(e) {
  return e === "todo" ? "doing" : e === "doing" ? "done" : "todo";
}
function v(e) {
  return e === "done" ? "todo" : "done";
}
function C(e, n) {
  return d(n, e ?? void 0) === "status" ? p(e) : e === "doing" ? "done" : v(e);
}
function _(e) {
  const n = i(e), o = h(e);
  return { status: n, checked: n === "done", kind: n === "doing" ? "status" : o };
}
function g(e, n) {
  return n === "check" ? e === "done" ? a : c : f(e);
}
function b(e) {
  const n = e == null ? void 0 : e.status;
  return n === "todo" || n === "doing" || n === "done" ? n : (e == null ? void 0 : e.checked) ? "done" : "todo";
}
export {
  C as a,
  b,
  x as c,
  d,
  _ as e,
  k as f,
  m as n,
  i as p,
  g as s,
  h as t
};
