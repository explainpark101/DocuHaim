import { M as d } from "./vendor-markdown-it-BSFfF5B5.js";
import { a as m, b as f, c as k, d as w } from "./appMarkdownItPlugins-DlEjDaTx.js";
import "./vendor-md-editor-X93Ii6bV.js";
import "./vendor-react-BLJzfvPB.js";
import "./vendor-codemirror-C7kLKAJE.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./index-CzDTh_Dm.js";
import "./vendor-lucide--whUmDUa.js";
import "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-radix-4pFcYp0u.js";
import "./wikiImageResolver-MwaE9XgC.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-d5Fgeg8O.js";
import "./vendor-tiptap-B9z9WF3R.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-CyieoItt.js";
import "./styleResolve-_SN22zX0.js";
import "./mermaidTheme-Deyx0OD8.js";
let a = null, p = null, s = null, o = null;
function t(e) {
  const r = new d();
  switch (e) {
    case "preview":
      return k(r), w(r), r;
    case "search":
      return r.set({ html: false, breaks: true, linkify: true }), r.linkify && r.linkify.set({ fuzzyLink: true }), f(r), r;
    case "print-heading":
      return r.set({ html: true, linkify: false }), m(r), r;
    case "inline":
      return r.set({ html: false, breaks: false, linkify: true }), r.linkify && r.linkify.set({ fuzzyLink: true }), r;
    default:
      return e;
  }
}
function F(e = {}) {
  const r = e.preset ?? "preview";
  return t(r);
}
function l(e = "preview") {
  switch (e) {
    case "preview":
      return a ?? (a = t("preview")), a;
    case "search":
      return p ?? (p = t("search")), p;
    case "print-heading":
      return s ?? (s = t("print-heading")), s;
    case "inline":
      return o ?? (o = t("inline")), o;
    default:
      return e;
  }
}
function G(e, r = "preview", n = {}) {
  const u = l(r), i = String(e ?? ""), c = { ...n, srcLines: Array.isArray(n.srcLines) ? n.srcLines : i.split(`
`) };
  return u.render(i, c);
}
function J(e, r = {}) {
  return l("inline").renderInline(String(e ?? ""), r);
}
export {
  F as createAppMarkdownIt,
  l as getAppMarkdownIt,
  G as renderAppMarkdown,
  J as renderAppMarkdownInline
};
