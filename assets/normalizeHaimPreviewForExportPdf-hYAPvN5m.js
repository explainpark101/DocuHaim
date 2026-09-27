const i = ".haim-code-block", l = ".haim-mermaid-block";
function a(e) {
  const t = e.querySelectorAll(i);
  for (const o of t) {
    o.classList.add("md-editor-code");
    const r = o.querySelector("pre code");
    r && r.classList.add("md-editor-code-block");
  }
  const c = e.querySelectorAll(l);
  for (const o of c) o.classList.add("md-editor-mermaid"), o.querySelector("svg") && o.setAttribute("data-processed", "");
}
function s(e) {
  if (e.querySelector(i) || e.querySelector(l) || e.querySelector(".haim-markdown-preview") || e.querySelector(".haim-editor")) {
    a(e);
    for (const c of e.querySelectorAll("[contenteditable]")) c.removeAttribute("contenteditable");
  }
}
export {
  a,
  s as n
};
