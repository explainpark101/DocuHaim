import { r as i, j as n } from "./vendor-react-BLJzfvPB.js";
import { u as b, E as N } from "./vendor-tiptap-jprfBBe2.js";
import { c as g } from "./style-X9N13u-Z.js";
import { m as R, s as w } from "./code-hljs-themes-B1Y_sCKp.js";
import { a as C } from "./normalizeHaimPreviewForExportPdf-DGkJ0uIB.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-radix-4pFcYp0u.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-highlight-CyieoItt.js";
import "./vendor-codemirror-C7kLKAJE.js";
import "./vendor-motion-DSEw68MZ.js";
import "./index-Dj2EGo58.js";
import "./index-esaETAQy.js";
import "./vendor-lucide-DPPF2CDs.js";
import "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./Kbd-9cV0YtE4.js";
import "./taskCheckboxStatus-DlXLsCJg.js";
import "./WikiImageSizeModal-BYHsD5Hu.js";
import "./vendor-image-crop-BGPXj59i.js";
import "./cropPadImage-Crgx9eR_.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-CFAyX4Yf.js";
import "./styleResolve-9JH0_4hF.js";
import "./haimCodeBlockLanguages-C4u7NjrS.js";
import "./lazyMermaid-rAP6XGht.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./createAppMarkdownIt-BxCJn9Jd.js";
import "./appMarkdownItPlugins-KK4pg1k-.js";
import "./vendor-md-editor-X93Ii6bV.js";
import "./wikiImageResolver-Nuz-2sph.js";
import "./wikiImageSettings-Cji60Ojw.js";
function M(m, u) {
  return m;
}
function pt({ id: m, value: u, modelValue: x, theme: k = "light", mdHeadingId: p, className: v = "" }) {
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
  pt as default
};
