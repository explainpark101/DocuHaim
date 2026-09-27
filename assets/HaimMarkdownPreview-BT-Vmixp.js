import { r as i, j as n } from "./vendor-react-BDjpSibw.js";
import { u as b, E as N } from "./vendor-tiptap-Cwq5MbeS.js";
import { c as g } from "./style-C5R1jrH9.js";
import { m as R, s as w } from "./code-hljs-themes-CD1oZZoA.js";
import { a as C } from "./normalizeHaimPreviewForExportPdf-hYAPvN5m.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-radix-qpbG9kXl.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-highlight-Cy0EGwO-.js";
import "./vendor-codemirror-Cs6dUi8u.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./index-CUaeQqoG.js";
import "./index-BF8EnhwI.js";
import "./vendor-lucide-DgRPSpKt.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./Kbd-zJP-p1De.js";
import "./WikiImageSizeModal-CFgFwQjh.js";
import "./vendor-image-crop-BD82vq0Q.js";
import "./cropPadImage-CpyUDqDt.js";
import "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import "./toHtml-C4jHCOXi.js";
import "./styleResolve-wfRpwUCS.js";
import "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
function M(m, u) {
  return m;
}
function re({ id: m, value: u, modelValue: x, theme: k = "light", mdHeadingId: p, className: v = "" }) {
  const t = String(u ?? x ?? ""), c = i.useRef(""), d = i.useRef(null), a = k === "dark", h = i.useMemo(() => g({ placeholder: "", profile: "note" }), []), s = i.useMemo(() => R(t), []), e = b({ extensions: h, content: s.content, contentType: "markdown", editable: false, immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[2rem] py-1 px-0 ${a ? "haim-editor--dark" : ""}` } }, onCreate: ({ editor: r }) => {
    c.current = s.prefix, t !== M(s.prefix, s.content) && w(r, t, c, { emitUpdate: false });
  } }, [h]);
  return i.useEffect(() => {
    e && w(e, t, c, { emitUpdate: false });
  }, [e, t]), i.useEffect(() => {
    e && e.view.dom.classList.toggle("haim-editor--dark", a);
  }, [e, a]), i.useLayoutEffect(() => {
    const r = d.current;
    if (!r || !e) return;
    const f = () => C(r);
    f();
    const o = new MutationObserver(() => f());
    return o.observe(r, { childList: true, subtree: true }), () => o.disconnect();
  }, [e, t]), i.useLayoutEffect(() => {
    const r = d.current;
    if (!r || !p) return;
    r.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((o, E) => {
      const y = E + 1, j = Number(o.tagName.slice(1)) || 1, l = p({ text: o.textContent || "", level: j, index: y });
      l && o.id !== l && (o.id = l);
    });
  }, [e, t, p]), n.jsx("div", { id: m, className: `haim-markdown-preview-host ${v}`.trim(), children: n.jsx("div", { ref: d, className: "md-editor-preview haim-markdown-preview", "data-haim-markdown-preview": "", ...e ? { "data-haim-preview-ready": "" } : {}, children: n.jsx("div", { className: `haim-editor ${a ? "haim-editor--dark" : ""}`.trim(), "data-haim-preview-only": "", children: e ? n.jsx(N, { editor: e, className: "haim-editor-content" }) : n.jsx("pre", { className: "m-0 whitespace-pre-wrap break-words font-[inherit] text-[inherit] leading-[inherit]", children: t }) }) }) });
}
export {
  re as default
};
