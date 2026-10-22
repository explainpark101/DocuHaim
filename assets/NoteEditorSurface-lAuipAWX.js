const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-7f85TMz1.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/mdEditorConfig-BDlsils6.js","assets/appMarkdownItPlugins-CpW4gajJ.js","assets/vendor-md-editor-B8lrupGh.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-V7b8BJE-.js","assets/index-qGWcX3Eh.js","assets/vendor-lucide-DQG_D8MC.js","assets/bootSplash-CNqesnab.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-radix-D1Cm_mSM.js","assets/index-B43cclHb.css","assets/wikiImageResolver-BH0jSxWb.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-VDyKA415.js","assets/vendor-tiptap-CC0lcdE4.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Dm7Q9DxH.js","assets/styleResolve-CvjZc5Zt.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CR47qWxc.js","assets/cmMarkdownFormatKeymap-DHFzBMsV.js","assets/WikiImageSizeModal-C8SbGTAp.js","assets/vendor-image-crop-ROMAbiiY.js","assets/cropPadImage-CgFvvhld.js","assets/index-flVIUjar.js","assets/haimCodeTabSettings-BI7a8VYQ.js","assets/codeBlockCommentTogglePlan-3lyEpRvG.js","assets/TableEditModal-BzCl1xos.js","assets/TableStyleTemplateEditor-ntTBAYNA.js","assets/mdEditorSelectionWrap-Bn-XD2PK.js","assets/MdEditorToolbarTooltips-DfNLcTWQ.js","assets/previewFootnoteScroll-DwWcKn_j.js","assets/useLazyMermaidRender-BEGREvhj.js","assets/lazyMermaid-BcnyKPEC.js","assets/useWikiImageHydration-DLPWOTsP.js","assets/previewMirrorEdit-ySRcprvm.js","assets/style-DaIsRrOV.css","assets/HaimEditor-n08CkP5M.js","assets/style-DCGAq1oI.js","assets/Kbd-Cnuyx3cZ.js","assets/copyImageToClipboard-CSIFGHOw.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-BsM3EwWg.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-DozejEcw.css","assets/code-hljs-themes-DfCfHy59.js","assets/createAppMarkdownIt-DzdnT201.js","assets/code-hljs-themes-BhXo3lwq.css","assets/settingsPageScroll-B8Cqlh2L.js","assets/SettingsCollapsibleHeading-BemWkmYJ.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { r as o, j as e, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as s, E as a, D as E, __tla as __tla_1 } from "./index-qGWcX3Eh.js";
import { L as p } from "./vendor-lucide-DQG_D8MC.js";
import { __tla as __tla_2 } from "./bootSplash-CNqesnab.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-D1Cm_mSM.js";
let D;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  const l = o.lazy(() => d(() => import("./MarkdownEditor-7f85TMz1.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]))), u = o.lazy(() => d(() => import("./HaimEditor-n08CkP5M.js").then(async (m) => {
    await m.__tla;
    return m;
  }).then((t) => t.H), __vite__mapDeps([46,1,2,7,19,14,20,21,22,47,13,33,8,9,10,11,12,6,15,48,49,18,30,31,32,50,51,23,38,34,35,52,42,24,53,54,55,4,5,16,17,56,29,36,37,57,58,43,26])));
  function f() {
    return e.jsxs("div", {
      className: "flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-white dark:bg-odp-surface",
      children: [
        e.jsx(p, {
          size: 18,
          className: "animate-spin text-gray-400 dark:text-gray-500",
          "aria-hidden": true
        }),
        e.jsx("div", {
          className: "text-sm text-gray-500 dark:text-odp-muted",
          children: "\uC5D0\uB514\uD130 \uB85C\uB529 \uC911\u2026"
        })
      ]
    });
  }
  D = function({ engine: t, ...n }) {
    const [m, i] = o.useState(() => t ?? s());
    o.useEffect(() => {
      if (t) {
        i(t);
        return;
      }
      const r = () => i(s());
      return r(), window.addEventListener(a, r), window.addEventListener("storage", r), () => {
        window.removeEventListener(a, r), window.removeEventListener("storage", r);
      };
    }, [
      t
    ]);
    const c = m === E ? u : l;
    return e.jsx(o.Suspense, {
      fallback: e.jsx(f, {}),
      children: e.jsx(c, {
        ...n
      })
    });
  };
});
export {
  __tla,
  D as default
};
