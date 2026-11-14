import { M as d } from "./vendor-markdown-it-Dg5Isw3B.js";
import { a as m, b as f, c as k, d as w } from "./appMarkdownItPlugins-I8vvO87V.js";
import "./vendor-md-editor-1ccdjpui.js";
import "./vendor-react-BPvvDyqO.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-aws-hJDgVEKM.js";
import "./index-BebLgvYF.js";
import "./vendor-lucide-B8TfEQX9.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-radix-CN5WtDh3.js";
import "./wikiImageResolver-Kn2kiZoN.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-BBwWj-Nq.js";
import "./vendor-tiptap-MFDL-V7S.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./styleResolve-D_dchqAE.js";
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
