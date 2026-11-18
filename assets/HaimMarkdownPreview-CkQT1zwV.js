import { r as i, j as n } from "./vendor-react-BPvvDyqO.js";
import { u as b, E as N } from "./vendor-tiptap-rNZeEPKG.js";
import { c as g } from "./markdownCache-BVlf9dHc.js";
import { m as R, s as w } from "./markdownIo-CjqKgmTl.js";
import { a as C } from "./normalizeHaimPreviewForExportPdf-DGkJ0uIB.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-radix-ClWfNC7b.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-motion-Bv-XITR_.js";
import "./index-flVIUjar.js";
import "./index-BoYUXkF3.js";
import "./vendor-lucide-DfALnt4w.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./downloadImageSrc-Ur40YJhC.js";
import "./Kbd-Cnuyx3cZ.js";
import "./codeBlockCommentTogglePlan-C_-NXn-m.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./haimCodeTabSettings-B-S365oc.js";
import "./WikiImageSizeModal-qkb2PJdq.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-BR8ZJcBk.js";
import "./emojiShortcode-B-ELrzz3.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-By6glf2o.js";
import "./styleResolve-IsiXtoFH.js";
import "./mdEditorSelectionWrap-BosBLKu-.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./createAppMarkdownIt-CLyx6NYs.js";
import "./appMarkdownItPlugins-_Baz7YpR.js";
import "./vendor-md-editor-1ccdjpui.js";
import "./wikiImageResolver-BVvaavME.js";
import "./wikiImageSettings-Cji60Ojw.js";
function M(s, u) {
  return s;
}
function wt({ id: s, value: u, modelValue: x, theme: k = "light", mdHeadingId: p, className: v = "" }) {
  const r = String(u ?? x ?? ""), c = i.useRef(""), d = i.useRef(null), m = k === "dark", h = i.useMemo(() => g({ placeholder: "", profile: "note" }), []), a = i.useMemo(() => R(r), []), t = b({ extensions: h, content: a.content, contentType: "markdown", editable: false, immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[2rem] py-1 px-0 ${m ? "haim-editor--dark" : ""}` } }, onCreate: ({ editor: e }) => {
    c.current = a.prefix, r !== M(a.prefix, a.content) && w(e, r, c, { emitUpdate: false });
  } }, [h]);
  return i.useEffect(() => {
    t && w(t, r, c, { emitUpdate: false });
  }, [t, r]), i.useEffect(() => {
    t && t.view.dom.classList.toggle("haim-editor--dark", m);
  }, [t, m]), i.useLayoutEffect(() => {
    const e = d.current;
    if (!e || !t) return;
    const f = () => C(e);
    f();
    const o = new MutationObserver(() => f());
    return o.observe(e, { childList: true, subtree: true }), () => o.disconnect();
  }, [t, r]), i.useLayoutEffect(() => {
    const e = d.current;
    if (!e || !p) return;
    e.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((o, E) => {
      const y = E + 1, j = Number(o.tagName.slice(1)) || 1, l = p({ text: o.textContent || "", level: j, index: y });
      l && o.id !== l && (o.id = l);
    });
  }, [t, r, p]), n.jsx("div", { id: s, className: `haim-markdown-preview-host ${v}`.trim(), children: n.jsx("div", { ref: d, className: "md-editor-preview haim-markdown-preview", "data-haim-markdown-preview": "", ...t ? { "data-haim-preview-ready": "" } : {}, children: n.jsx("div", { className: `haim-editor ${m ? "haim-editor--dark" : ""}`.trim(), "data-haim-preview-only": "", children: t ? n.jsx(N, { editor: t, className: "haim-editor-content" }) : n.jsx("pre", { className: "m-0 whitespace-pre-wrap break-words font-[inherit] text-[inherit] leading-[inherit]", children: r }) }) }) });
}
export {
  wt as default
};
