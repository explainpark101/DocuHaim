import { r as i, j as n } from "./vendor-react-ChQ1w2We.js";
import { u as b, E as N } from "./vendor-tiptap-BiD2it08.js";
import { c as g } from "./style-Cj7wece_.js";
import { m as R, s as w } from "./code-hljs-themes-DD5qzrVz.js";
import { a as C } from "./normalizeHaimPreviewForExportPdf-DGkJ0uIB.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-radix-DFHhpIsj.js";
import "./vendor-aws-DKtg11UV.js";
import "./vendor-highlight-C3cP4Xc_.js";
import "./vendor-codemirror-CohftLwi.js";
import "./vendor-motion-L8D9Iqni.js";
import "./index-CKoETpyT.js";
import "./index-CK4QjE3r.js";
import "./vendor-lucide-Dbi0QnKF.js";
import "./bootSplash-Dmg87Il5.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./Kbd-B19j6vi0.js";
import "./emojiShortcode-DreUz_m0.js";
import "./WikiImageSizeModal-WBnJ2nV-.js";
import "./vendor-image-crop-DjbagF75.js";
import "./cropPadImage-BmR5HUFJ.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-Cgk444Lj.js";
import "./styleResolve-DVo_jDsB.js";
import "./mdEditorSelectionWrap-BoGt58TM.js";
import "./haimCodeTabSettings-BI7a8VYQ.js";
import "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-DNlwk8Oz.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./createAppMarkdownIt-_33NbtYB.js";
import "./appMarkdownItPlugins-CgbQ8S0B.js";
import "./vendor-md-editor-Cx1MD3OH.js";
import "./wikiImageResolver-CNr3Qg7c.js";
import "./wikiImageSettings-Cji60Ojw.js";
function M(m, u) {
  return m;
}
function ft({ id: m, value: u, modelValue: x, theme: k = "light", mdHeadingId: p, className: v = "" }) {
  const e = String(u ?? x ?? ""), c = i.useRef(""), d = i.useRef(null), a = k === "dark", h = i.useMemo(() => g({ placeholder: "", profile: "note" }), []), s = i.useMemo(() => R(e), []), t = b({ extensions: h, content: s.content, contentType: "markdown", editable: false, immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[2rem] py-1 px-0 ${a ? "haim-editor--dark" : ""}` } }, onCreate: ({ editor: r }) => {
    c.current = s.prefix, e !== M(s.prefix, s.content) && w(r, e, c, { emitUpdate: false });
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
  }, [t, e, p]), n.jsx("div", { id: m, className: `haim-markdown-preview-host ${v}`.trim(), children: n.jsx("div", { ref: d, className: "md-editor-preview haim-markdown-preview", "data-haim-markdown-preview": "", ...t ? { "data-haim-preview-ready": "" } : {}, children: n.jsx("div", { className: `haim-editor ${a ? "haim-editor--dark" : ""}`.trim(), "data-haim-preview-only": "", children: t ? n.jsx(N, { editor: t, className: "haim-editor-content" }) : n.jsx("pre", { className: "m-0 whitespace-pre-wrap break-words font-[inherit] text-[inherit] leading-[inherit]", children: e }) }) }) });
}
export {
  ft as default
};
