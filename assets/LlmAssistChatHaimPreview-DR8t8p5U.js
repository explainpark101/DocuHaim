import { r as m, j as e } from "./vendor-react-BPvvDyqO.js";
import { u as s, E as a } from "./vendor-tiptap-rNZeEPKG.js";
import { c } from "./markdownCache-BVlf9dHc.js";
import { m as n } from "./markdownIo-CjqKgmTl.js";
import "./vendor-radix-ClWfNC7b.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-katex-NqpuB_gR.js";
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
function W({ markdown: r, className: i = "" }) {
  const p = m.useRef(null), t = s({ extensions: c({ placeholder: "", profile: "composer", isSourceLineEnabled: () => false }), content: n(r || "").content, contentType: "markdown", editable: false, immediatelyRender: false, editorProps: { attributes: { class: "haim-chat-readonly prose prose-sm max-w-none dark:prose-invert focus:outline-none text-[12px] leading-relaxed text-gray-800 dark:text-odp-fg" } } });
  return m.useEffect(() => {
    if (!t) return;
    const o = r || "";
    p.current !== o && (p.current = o, t.commands.setContent(n(o).content, { contentType: "markdown" }));
  }, [t, r]), t ? e.jsx("div", { className: `min-w-0 overflow-x-auto ${i}`, children: e.jsx(a, { editor: t }) }) : e.jsx("div", { className: `whitespace-pre-wrap break-words text-[12px] ${i}`, children: r });
}
export {
  W as default
};
