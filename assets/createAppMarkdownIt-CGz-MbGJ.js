import { M as d } from "./vendor-markdown-it-BSFfF5B5.js";
import { a as m, b as f, c as k, d as w } from "./appMarkdownItPlugins-XsxnGAjB.js";
import "./vendor-md-editor-Cx1MD3OH.js";
import "./vendor-react-ChQ1w2We.js";
import "./vendor-codemirror-CohftLwi.js";
import "./vendor-aws-DKtg11UV.js";
import "./index-CWtFHgS0.js";
import "./vendor-lucide-BB1m8XvN.js";
import "./bootSplash-Dmg87Il5.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-L8D9Iqni.js";
import "./vendor-radix-BQ9XceqC.js";
import "./wikiImageResolver-B76Jgn3W.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-Dqx6Py2y.js";
import "./vendor-tiptap-CEo_3qRU.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-C3cP4Xc_.js";
import "./styleResolve-Bb8U_86Q.js";
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
