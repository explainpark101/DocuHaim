import { M as l } from "./vendor-markdown-it-BSFfF5B5.js";
import { a as c, b as d, c as m, d as w } from "./appMarkdownItPlugins-BdJoanPZ.js";
import "./vendor-md-editor-C-lRBXRc.js";
import "./vendor-react-BDjpSibw.js";
import "./vendor-codemirror-Cs6dUi8u.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./index-BF8EnhwI.js";
import "./vendor-lucide-DgRPSpKt.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./vendor-radix-qpbG9kXl.js";
import "./wikiImageResolver-KdXVQxAF.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import "./styleResolve-wfRpwUCS.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./mermaidBase64Fence-DMVvW2Zs.js";
let a = null, p = null, o = null;
function i(t) {
  const r = new l();
  switch (t) {
    case "preview":
      return m(r), w(r), r;
    case "search":
      return r.set({ html: false, breaks: true, linkify: true }), r.linkify && r.linkify.set({ fuzzyLink: true }), d(r), r;
    case "print-heading":
      return r.set({ html: true, linkify: false }), c(r), r;
    default:
      return t;
  }
}
function q(t = {}) {
  const r = t.preset ?? "preview";
  return i(r);
}
function k(t = "preview") {
  switch (t) {
    case "preview":
      return a ?? (a = i("preview")), a;
    case "search":
      return p ?? (p = i("search")), p;
    case "print-heading":
      return o ?? (o = i("print-heading")), o;
    default:
      return t;
  }
}
function B(t, r = "preview", e = {}) {
  const s = k(r), n = String(t ?? ""), u = { ...e, srcLines: Array.isArray(e.srcLines) ? e.srcLines : n.split(`
`) };
  return s.render(n, u);
}
export {
  q as createAppMarkdownIt,
  k as getAppMarkdownIt,
  B as renderAppMarkdown
};
