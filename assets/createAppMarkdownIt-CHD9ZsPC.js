import { M as d } from "./vendor-markdown-it-Dg5Isw3B.js";
import { a as m, b as f, c as k, d as w } from "./appMarkdownItPlugins-BM6zNQXV.js";
import "./vendor-md-editor-1ccdjpui.js";
import "./vendor-react-BPvvDyqO.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-aws-hJDgVEKM.js";
import "./index-CQMGs8de.js";
import "./vendor-lucide-AHEFQNv5.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-radix-BVXLG2Jn.js";
import "./wikiImageResolver-0EDmlb7T.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-BhZ6UzDa.js";
import "./styleResolve-tsxn7cpN.js";
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
