const l = /<!--\s*note-cover\b[\s\S]*?-->/i;
function c(e) {
  return l.test(String(e ?? ""));
}
function a() {
  return ['<div class="md-note-cover-placeholder md-note-cover-placeholder--pending" data-note-cover-placeholder="1" role="button" tabindex="0" title="\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9">', '<div class="md-note-cover-placeholder__mount" data-note-cover-mount="1"></div>', '<span class="md-note-cover-placeholder__fallback">', '<span class="md-note-cover-placeholder__spinner" aria-hidden="true"></span>', '<span class="md-note-cover-placeholder__fallback-text">\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026</span>', "</span>", "</div>"].join("");
}
function r(e) {
  const { tokens: t } = e;
  return (t == null ? void 0 : t.length) && (e.tokens = t.map((o) => {
    if ((o.type === "html_block" || o.type === "html_inline") && c(o.content)) {
      const n = new e.Token("html_block", "", 0);
      return n.content = a(), n.block = true, n;
    }
    return o;
  })), true;
}
function s(e) {
  try {
    e.core.ruler.before("xss", "note-cover-placeholder", r);
  } catch {
    e.core.ruler.push("note-cover-placeholder", r);
  }
}
export {
  a as b,
  s as n
};
