const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-Bqw2w2R5.js","assets/vendor-aws-DKtg11UV.js","assets/vendor-react-ChQ1w2We.js","assets/mdEditorConfig-Dnh1t-nx.js","assets/appMarkdownItPlugins-z7EMgt9C.js","assets/vendor-md-editor-Cx1MD3OH.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CohftLwi.js","assets/index-zMheq0Bi.js","assets/vendor-lucide-BB1m8XvN.js","assets/bootSplash-Dmg87Il5.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-L8D9Iqni.js","assets/vendor-radix-BQ9XceqC.js","assets/index-CSzqKx0w.css","assets/wikiImageResolver-B_6rnfNO.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-Dqx6Py2y.js","assets/vendor-tiptap-CEo_3qRU.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-C3cP4Xc_.js","assets/styleResolve-BREM_Ben.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CG5sUD25.js","assets/cmMarkdownFormatKeymap-Dp5l_PwC.js","assets/WikiImageSizeModal-B8Djg43H.js","assets/vendor-image-crop-DjbagF75.js","assets/cropPadImage-CpnFGGJk.js","assets/index-CKoETpyT.js","assets/haimCodeTabSettings-BI7a8VYQ.js","assets/codeBlockCommentTogglePlan-3lyEpRvG.js","assets/TableEditModal-DqVdRESU.js","assets/TableStyleTemplateEditor-DdsOLXuh.js","assets/mdEditorSelectionWrap-Z1gCA10K.js","assets/MdEditorToolbarTooltips-1E1s2ioU.js","assets/previewFootnoteScroll-Dbnpf_EI.js","assets/useLazyMermaidRender-DGltcr6x.js","assets/lazyMermaid-DNlwk8Oz.js","assets/useWikiImageHydration-B3VdBVDE.js","assets/previewMirrorEdit-B-ZyCUCK.js","assets/style-DaIsRrOV.css","assets/HaimEditor-AwPmIFTb.js","assets/style-ipqaJXkI.js","assets/Kbd-B19j6vi0.js","assets/copyImageToClipboard-CKuwKuUE.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-BRp2Hxlz.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-BAmLRHvr.css","assets/code-hljs-themes-ChSyjnB4.js","assets/createAppMarkdownIt-C9YsOyXf.js","assets/code-hljs-themes-BhXo3lwq.css","assets/settingsPageScroll-B8Cqlh2L.js","assets/SettingsCollapsibleHeading-sGPw9Uea.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-DKtg11UV.js";
import { r, j as t, __tla as __tla_0 } from "./vendor-react-ChQ1w2We.js";
import { A as s, E as a, D as E, __tla as __tla_1 } from "./index-zMheq0Bi.js";
import { L as p } from "./vendor-lucide-BB1m8XvN.js";
import { __tla as __tla_2 } from "./bootSplash-Dmg87Il5.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-L8D9Iqni.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-BQ9XceqC.js";
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
  const l = r.lazy(() => d(() => import("./MarkdownEditor-Bqw2w2R5.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]))), u = r.lazy(() => d(() => import("./HaimEditor-AwPmIFTb.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([46,1,2,19,14,20,21,22,7,47,13,33,8,9,10,11,12,6,15,48,49,18,30,31,32,50,51,23,38,34,35,52,42,24,53,54,55,4,5,16,17,56,29,36,37,57,58,43,26])));
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
