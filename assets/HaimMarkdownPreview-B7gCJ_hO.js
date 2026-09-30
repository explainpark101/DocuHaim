import { r as i, j as n } from "./vendor-react-BDjpSibw.js";
import { u as b, E as N } from "./vendor-tiptap-DQKtOH7v.js";
import { c as g } from "./style-0gLjTDh4.js";
import { m as R, s as w } from "./code-hljs-themes-yS7B1YIX.js";
import { a as C } from "./normalizeHaimPreviewForExportPdf-DGkJ0uIB.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-radix-DuLpLUUM.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-highlight-Cy0EGwO-.js";
import "./vendor-codemirror-0YdHorwW.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./index-De3wkM3r.js";
import "./index-C7uJeeaR.js";
import "./vendor-lucide-BXdwsXhs.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./Kbd-zJP-p1De.js";
import "./taskCheckboxStatus-DlXLsCJg.js";
import "./WikiImageSizeModal-DfzHdWmu.js";
import "./vendor-image-crop-BD82vq0Q.js";
import "./cropPadImage-xYJ-5dvK.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-nkZRr_oP.js";
import "./styleResolve-D5qPoHTz.js";
import "./haimCodeBlockLanguages-C4u7NjrS.js";
import "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./createAppMarkdownIt-CBgQe5F8.js";
import "./appMarkdownItPlugins-BQ4ZkNha.js";
import "./vendor-md-editor-DI-Txwtj.js";
import "./wikiImageResolver-CHRQxBJa.js";
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
