import { M as d } from "./vendor-markdown-it-BSFfF5B5.js";
import { a as m, b as f, c as k, d as w } from "./appMarkdownItPlugins-BQ4ZkNha.js";
import "./vendor-md-editor-DI-Txwtj.js";
import "./vendor-react-BDjpSibw.js";
import "./vendor-codemirror-0YdHorwW.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./index-C7uJeeaR.js";
import "./vendor-lucide-BXdwsXhs.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-radix-DuLpLUUM.js";
import "./wikiImageResolver-CHRQxBJa.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./taskCheckboxStatus-DlXLsCJg.js";
import "./styleResolve-D5qPoHTz.js";
import "./mermaidTheme-Deyx0OD8.js";
let a = null, s = null, p = null, o = null;
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
function q(e = {}) {
  const r = e.preset ?? "preview";
  return t(r);
}
function l(e = "preview") {
  switch (e) {
    case "preview":
      return a ?? (a = t("preview")), a;
    case "search":
      return s ?? (s = t("search")), s;
    case "print-heading":
      return p ?? (p = t("print-heading")), p;
    case "inline":
      return o ?? (o = t("inline")), o;
    default:
      return e;
  }
}
function B(e, r = "preview", n = {}) {
  const u = l(r), i = String(e ?? ""), c = { ...n, srcLines: Array.isArray(n.srcLines) ? n.srcLines : i.split(`
`) };
  return u.render(i, c);
}
function D(e, r = {}) {
  return l("inline").renderInline(String(e ?? ""), r);
}
export {
  q as createAppMarkdownIt,
  l as getAppMarkdownIt,
  B as renderAppMarkdown,
  D as renderAppMarkdownInline
};
