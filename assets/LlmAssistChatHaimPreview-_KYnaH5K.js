import { r as m, j as e } from "./vendor-react-BPvvDyqO.js";
import { u as s, E as a } from "./vendor-tiptap-rNZeEPKG.js";
import { c } from "./markdownCache-4Kwp3KEi.js";
import { m as n } from "./markdownIo-CMzvVFe2.js";
import "./vendor-radix-ClWfNC7b.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-motion-Bv-XITR_.js";
import "./index-flVIUjar.js";
import "./index-CWHwu_I1.js";
import "./vendor-lucide-Bo8me5Pj.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./downloadImageSrc-CrSy4xG_.js";
import "./Kbd-Cnuyx3cZ.js";
import "./codeBlockCommentTogglePlan-B6OaVP0I.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./haimCodeTabSettings-B-S365oc.js";
import "./WikiImageSizeModal-DwWsgE_Q.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-D24VIqra.js";
import "./emojiShortcode-BvGEFi1u.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-CbPsX8uI.js";
import "./styleResolve-zz3sxHEn.js";
import "./mdEditorSelectionWrap-B1cRcl2s.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./createAppMarkdownIt-DT1ZQJcb.js";
import "./appMarkdownItPlugins-DjfrhPtw.js";
import "./vendor-md-editor-1ccdjpui.js";
import "./wikiImageResolver-ELq19oJ8.js";
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
