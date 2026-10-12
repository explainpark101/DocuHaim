const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-nMU3CJzi.js","assets/vendor-aws-DKtg11UV.js","assets/vendor-react-ChQ1w2We.js","assets/mdEditorConfig-D-Jx434c.js","assets/appMarkdownItPlugins-CgbQ8S0B.js","assets/vendor-md-editor-Cx1MD3OH.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CohftLwi.js","assets/index-CK4QjE3r.js","assets/vendor-lucide-Dbi0QnKF.js","assets/bootSplash-Dmg87Il5.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-L8D9Iqni.js","assets/vendor-radix-DFHhpIsj.js","assets/index-CDdFNqYf.css","assets/wikiImageResolver-CNr3Qg7c.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-DreUz_m0.js","assets/vendor-tiptap-BiD2it08.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-C3cP4Xc_.js","assets/styleResolve-DVo_jDsB.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CG5sUD25.js","assets/cmMarkdownFormatKeymap-CZgPs6TF.js","assets/WikiImageSizeModal-WBnJ2nV-.js","assets/vendor-image-crop-DjbagF75.js","assets/cropPadImage-BmR5HUFJ.js","assets/index-CKoETpyT.js","assets/haimCodeTabSettings-BI7a8VYQ.js","assets/codeBlockCommentTogglePlan-3lyEpRvG.js","assets/TableEditModal-BhCVSWAZ.js","assets/TableStyleTemplateEditor-DsaDngO0.js","assets/mdEditorSelectionWrap-BoGt58TM.js","assets/MdEditorToolbarTooltips-ogylncsh.js","assets/previewFootnoteScroll-Cc8ARXSp.js","assets/useLazyMermaidRender-DGltcr6x.js","assets/lazyMermaid-DNlwk8Oz.js","assets/useWikiImageHydration-D1eXZNgG.js","assets/previewMirrorEdit-DGXx4-rt.js","assets/style-DaIsRrOV.css","assets/HaimEditor-Dv4k4LCA.js","assets/style-Cj7wece_.js","assets/Kbd-B19j6vi0.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-Cgk444Lj.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-NQCk1_zL.css","assets/code-hljs-themes-DD5qzrVz.js","assets/createAppMarkdownIt-_33NbtYB.js","assets/code-hljs-themes-BhXo3lwq.css","assets/settingsPageScroll-B8Cqlh2L.js","assets/SettingsCollapsibleHeading-ReBvdl5J.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-DKtg11UV.js";
import { r, j as t, __tla as __tla_0 } from "./vendor-react-ChQ1w2We.js";
import { A as s, E as a, D as E, __tla as __tla_1 } from "./index-CK4QjE3r.js";
import { L as p } from "./vendor-lucide-Dbi0QnKF.js";
import { __tla as __tla_2 } from "./bootSplash-Dmg87Il5.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-L8D9Iqni.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-DFHhpIsj.js";
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
  const l = r.lazy(() => d(() => import("./MarkdownEditor-nMU3CJzi.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]))), u = r.lazy(() => d(() => import("./HaimEditor-Dv4k4LCA.js").then(async (m) => {
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
