import { r as m, j as e } from "./vendor-react-BPvvDyqO.js";
import { u as s, E as a } from "./vendor-tiptap-rNZeEPKG.js";
import { c } from "./markdownCache-BH87898H.js";
import { m as n } from "./markdownIo-lkrZOuUP.js";
import "./vendor-radix-ClWfNC7b.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-motion-Bv-XITR_.js";
import "./index-flVIUjar.js";
import "./index-Bdv3Df6K.js";
import "./vendor-lucide-Bo8me5Pj.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./downloadImageSrc-DM3Sbpue.js";
import "./Kbd-Cnuyx3cZ.js";
import "./codeBlockCommentTogglePlan-DftFV4tc.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./haimCodeTabSettings-B-S365oc.js";
import "./WikiImageSizeModal-Dm51JekQ.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-C_zmab2M.js";
import "./emojiShortcode-DVLefTaM.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-SKQpzmFP.js";
import "./styleResolve-CG3y-hd2.js";
import "./mdEditorSelectionWrap-CZbdUOtT.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./createAppMarkdownIt-YBgN5Wdh.js";
import "./appMarkdownItPlugins-BME4Tvg2.js";
import "./vendor-md-editor-1ccdjpui.js";
import "./wikiImageResolver-XE0B9J6j.js";
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
