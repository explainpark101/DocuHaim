const t = ".haim-code-block", a = ".haim-mermaid-block", l = [".haim-mermaid-block__source-hidden", ".haim-code-block__header", ".haim-code-block__action", ".haim-code-block__actions", ".haim-line-numbers", ".haim-prose-line-numbers"].join(", ");
function s(e) {
  const r = e.querySelectorAll(t);
  for (const o of r) {
    if (o.classList.contains("haim-mermaid-block")) continue;
    o.classList.add("md-editor-code");
    const c = o.querySelector("pre code");
    c && c.classList.add("md-editor-code-block");
  }
  const i = e.querySelectorAll(a);
  for (const o of i) {
    o.classList.add("md-editor-mermaid"), o.classList.remove("md-editor-code");
    for (const c of o.querySelectorAll(l)) c.remove();
    o.querySelector("svg") && o.setAttribute("data-processed", "");
  }
}
function d(e) {
  if (e.querySelector(t) || e.querySelector(a) || e.querySelector(".haim-markdown-preview") || e.querySelector(".haim-editor")) {
    s(e);
    for (const i of e.querySelectorAll("[contenteditable]")) i.removeAttribute("contenteditable");
  }
}
export {
  s as a,
  d as n
};
