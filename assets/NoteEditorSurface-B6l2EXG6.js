const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-CbArQkKc.js","assets/vendor-aws-DKtg11UV.js","assets/vendor-react-BLJzfvPB.js","assets/mdEditorConfig-ChwSPgHF.js","assets/appMarkdownItPlugins-QF9zhSxr.js","assets/vendor-md-editor-aRP6UsDX.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CohftLwi.js","assets/index-RYdiX4QF.js","assets/vendor-lucide-XZJwJkMR.js","assets/bootSplash-Dmg87Il5.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-DSEw68MZ.js","assets/vendor-radix-DaZdH-oT.js","assets/index-CDdFNqYf.css","assets/wikiImageResolver-Bh7scVLU.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-L0CcV20b.js","assets/vendor-tiptap-BdDxwsAS.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-CyieoItt.js","assets/styleResolve-DPBnFsnB.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CG5sUD25.js","assets/cmMarkdownFormatKeymap-CU0WFuVJ.js","assets/WikiImageSizeModal-BejtpjZ7.js","assets/vendor-image-crop-BGPXj59i.js","assets/cropPadImage-Chs_wx2c.js","assets/index-Dj2EGo58.js","assets/haimCodeTabSettings-BI7a8VYQ.js","assets/codeBlockCommentTogglePlan-3lyEpRvG.js","assets/TableEditModal-BYR_Wfx7.js","assets/TableStyleTemplateEditor-A8npj_HB.js","assets/mdEditorSelectionWrap-DEEhCsbJ.js","assets/MdEditorToolbarTooltips-DHP6jQmN.js","assets/previewFootnoteScroll-BHXXzCck.js","assets/useLazyMermaidRender-CGreX7_U.js","assets/lazyMermaid-UVvEecII.js","assets/useWikiImageHydration-BN7WtIW5.js","assets/previewMirrorEdit-DEANsA5Q.js","assets/style-DaIsRrOV.css","assets/HaimEditor-poq8SLGS.js","assets/style-J1VWVgXI.js","assets/Kbd-9cV0YtE4.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-D2L17WzN.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-NQCk1_zL.css","assets/code-hljs-themes-tYV3jME0.js","assets/createAppMarkdownIt-BKRQST4i.js","assets/code-hljs-themes-BhXo3lwq.css","assets/settingsPageScroll-B8Cqlh2L.js","assets/SettingsCollapsibleHeading-RnpitYOf.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-DKtg11UV.js";
import { r, j as t, __tla as __tla_0 } from "./vendor-react-BLJzfvPB.js";
import { A as s, E as a, D as E, __tla as __tla_1 } from "./index-RYdiX4QF.js";
import { L as p } from "./vendor-lucide-XZJwJkMR.js";
import { __tla as __tla_2 } from "./bootSplash-Dmg87Il5.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-DaZdH-oT.js";
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
  const l = r.lazy(() => d(() => import("./MarkdownEditor-CbArQkKc.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]))), u = r.lazy(() => d(() => import("./HaimEditor-poq8SLGS.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([46,1,2,19,14,20,21,22,7,47,13,33,8,9,10,11,12,6,15,48,18,30,31,32,49,50,23,38,34,35,51,42,24,52,53,54,4,5,16,17,55,29,36,37,56,57,43,26])));
  function f() {
    return t.jsxs("div", {
      className: "flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-white dark:bg-odp-surface",
      children: [
        t.jsx(p, {
          size: 18,
          className: "animate-spin text-gray-400 dark:text-gray-500",
          "aria-hidden": true
        }),
        t.jsx("div", {
          className: "text-sm text-gray-500 dark:text-odp-muted",
          children: "\uC5D0\uB514\uD130 \uB85C\uB529 \uC911\u2026"
        })
      ]
    });
  }
  D = function({ engine: o, ...n }) {
    const [m, i] = r.useState(() => o ?? s());
    r.useEffect(() => {
      if (o) {
        i(o);
        return;
      }
      const e = () => i(s());
      return e(), window.addEventListener(a, e), window.addEventListener("storage", e), () => {
        window.removeEventListener(a, e), window.removeEventListener("storage", e);
      };
    }, [
      o
    ]);
    const c = m === E ? u : l;
    return t.jsx(r.Suspense, {
      fallback: t.jsx(f, {}),
      children: t.jsx(c, {
        ...n
      })
    });
  };
});
export {
  __tla,
  D as default
};
