import { r as i, j as n } from "./vendor-react-BPvvDyqO.js";
import { u as b, E as N } from "./vendor-tiptap-DxyadcB3.js";
import { c as g } from "./style-CMXP10cY.js";
import { m as R, s as w } from "./code-hljs-themes-DDv1LwRz.js";
import { a as C } from "./normalizeHaimPreviewForExportPdf-DGkJ0uIB.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-radix-8kjzYRrX.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-motion-Bv-XITR_.js";
import "./index-flVIUjar.js";
import "./index-BYVoYwQr.js";
import "./vendor-lucide-BnjwTb2j.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./downloadImageSrc-Bi9SPN-h.js";
import "./Kbd-Cnuyx3cZ.js";
import "./emojiShortcode-CZFZfFoz.js";
import "./WikiImageSizeModal-D7MjzOqH.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-DJj-DEqh.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-cH2hWJjX.js";
import "./styleResolve-FWe9FNWf.js";
import "./mdEditorSelectionWrap-DR6lJ0QV.js";
import "./haimCodeTabSettings-BI7a8VYQ.js";
import "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./createAppMarkdownIt-Mo9QSPt6.js";
import "./appMarkdownItPlugins-m-T7S_wy.js";
import "./vendor-md-editor-B8lrupGh.js";
import "./wikiImageResolver-BX0McZ8Q.js";
import "./wikiImageSettings-Cji60Ojw.js";
function M(s, u) {
  return s;
}
function lt({ id: s, value: u, modelValue: x, theme: k = "light", mdHeadingId: p, className: v = "" }) {
  const e = String(u ?? x ?? ""), c = i.useRef(""), d = i.useRef(null), a = k === "dark", h = i.useMemo(() => g({ placeholder: "", profile: "note" }), []), m = i.useMemo(() => R(e), []), t = b({ extensions: h, content: m.content, contentType: "markdown", editable: false, immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[2rem] py-1 px-0 ${a ? "haim-editor--dark" : ""}` } }, onCreate: ({ editor: r }) => {
    c.current = m.prefix, e !== M(m.prefix, m.content) && w(r, e, c, { emitUpdate: false });
  } }, [h]);
  return i.useEffect(() => {
    t && w(t, e, c, { emitUpdate: false });
  }, [t, e]), i.useEffect(() => {
    t && t.view.dom.classList.toggle("haim-editor--dark", a);
  }, [t, a]), i.useLayoutEffect(() => {
    const r = d.current;
    if (!r || !t) return;
    const f = () => C(r);
    f();
    const o = new MutationObserver(() => f());
    return o.observe(r, { childList: true, subtree: true }), () => o.disconnect();
  }, [t, e]), i.useLayoutEffect(() => {
    const r = d.current;
    if (!r || !p) return;
    r.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((o, E) => {
      const y = E + 1, j = Number(o.tagName.slice(1)) || 1, l = p({ text: o.textContent || "", level: j, index: y });
      l && o.id !== l && (o.id = l);
    });
  }, [t, e, p]), n.jsx("div", { id: s, className: `haim-markdown-preview-host ${v}`.trim(), children: n.jsx("div", { ref: d, className: "md-editor-preview haim-markdown-preview", "data-haim-markdown-preview": "", ...t ? { "data-haim-preview-ready": "" } : {}, children: n.jsx("div", { className: `haim-editor ${a ? "haim-editor--dark" : ""}`.trim(), "data-haim-preview-only": "", children: t ? n.jsx(N, { editor: t, className: "haim-editor-content" }) : n.jsx("pre", { className: "m-0 whitespace-pre-wrap break-words font-[inherit] text-[inherit] leading-[inherit]", children: e }) }) }) });
}
export {
  lt as default
};
