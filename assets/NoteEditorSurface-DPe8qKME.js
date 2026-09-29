const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-BfGXS88S.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BDjpSibw.js","assets/mdEditorConfig-DEavZdcU.js","assets/appMarkdownItPlugins-Db2NSas9.js","assets/vendor-md-editor-CNr2PGSh.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CmNIsAMQ.js","assets/index-BVEYTKrI.js","assets/vendor-lucide-CbEk5sea.js","assets/bootSplash-B8aCHT5v.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Dw-WnPM7.js","assets/vendor-radix-DuLpLUUM.js","assets/index-BEEcvm5P.css","assets/wikiImageResolver-7j44EdcB.js","assets/wikiImageSettings-Cji60Ojw.js","assets/taskCheckboxStatus-DlXLsCJg.js","assets/styleResolve-DS-cWVEC.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-EVhjTAmT.js","assets/clipboardImageFiles-Bt4kC96B.js","assets/WikiImageSizeModal-Bo9M9Z8L.js","assets/vendor-image-crop-BD82vq0Q.js","assets/cropPadImage-XcccZ7At.js","assets/index-De3wkM3r.js","assets/TableEditModal-BrOexANc.js","assets/TableStyleTemplateEditor-ix0pC4VN.js","assets/mdEditorSelectionWrap-ByP695JX.js","assets/editorMarkdownStyle-D50fNtKa.js","assets/previewFootnoteScroll-B2ibQN-7.js","assets/useLazyMermaidRender-CMWw-qPT.js","assets/lazyMermaid-CFU1x6wk.js","assets/useWikiImageHydration-12_BnYWH.js","assets/previewMirrorEdit-DHNUtTVM.js","assets/style-DaIsRrOV.css","assets/HaimEditor-D04muv3g.js","assets/vendor-tiptap-D1RdGcIA.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Cy0EGwO-.js","assets/style-CD03guUW.js","assets/Kbd-zJP-p1De.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-CiYaHWfI.js","assets/haimCodeBlockLanguages-C4u7NjrS.js","assets/style-BygV1Ee-.css","assets/code-hljs-themes-Duj_m5Ns.js","assets/createAppMarkdownIt-B2PPnG3Y.js","assets/code-hljs-themes-BhXo3lwq.css","assets/settingsPageScroll-CoAb6Sih.js","assets/SettingsCollapsibleHeading-wXmfU6hM.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-Cvd3RhZI.js";
import { r, j as t, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { E as s, F as a, G as E, __tla as __tla_1 } from "./index-BVEYTKrI.js";
import { L as p } from "./vendor-lucide-CbEk5sea.js";
import { __tla as __tla_2 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-DuLpLUUM.js";
let N;
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
  const l = r.lazy(() => d(() => import("./MarkdownEditor-BfGXS88S.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]))), u = r.lazy(() => d(() => import("./HaimEditor-D04muv3g.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([40,1,2,41,14,42,43,44,7,45,13,29,8,9,10,11,12,6,15,46,18,26,27,28,47,48,19,49,36,20,50,51,52,4,5,16,17,53,25,30,31,33,54,55,37,22])));
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
  N = function({ engine: o, ...n }) {
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
  N as default
};
