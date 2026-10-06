const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-kHoxW4-r.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BLJzfvPB.js","assets/mdEditorConfig-BULepggO.js","assets/appMarkdownItPlugins-KK4pg1k-.js","assets/vendor-md-editor-X93Ii6bV.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-C7kLKAJE.js","assets/index-esaETAQy.js","assets/vendor-lucide-DPPF2CDs.js","assets/bootSplash-QPCcRCUR.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-DSEw68MZ.js","assets/vendor-radix-4pFcYp0u.js","assets/index-BAGktXsL.css","assets/wikiImageResolver-Nuz-2sph.js","assets/wikiImageSettings-Cji60Ojw.js","assets/taskCheckboxStatus-DlXLsCJg.js","assets/styleResolve-9JH0_4hF.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CeANqbO3.js","assets/cmMarkdownFormatKeymap-DyzcWQZl.js","assets/WikiImageSizeModal-BYHsD5Hu.js","assets/vendor-image-crop-BGPXj59i.js","assets/cropPadImage-Crgx9eR_.js","assets/index-Dj2EGo58.js","assets/TableEditModal-D_z0MBqO.js","assets/TableStyleTemplateEditor-BKx4G_Uv.js","assets/mdEditorSelectionWrap-Bd_xrT0X.js","assets/MdEditorToolbarTooltips-CQMS09hm.js","assets/previewFootnoteScroll-B0PydMIM.js","assets/useLazyMermaidRender-Bc-609LP.js","assets/lazyMermaid-rAP6XGht.js","assets/useWikiImageHydration-DXDsnNxE.js","assets/previewMirrorEdit-BdUGUicK.js","assets/style-DaIsRrOV.css","assets/HaimEditor-DEfAyHkD.js","assets/vendor-tiptap-jprfBBe2.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-CyieoItt.js","assets/style-X9N13u-Z.js","assets/Kbd-9cV0YtE4.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-CFAyX4Yf.js","assets/haimCodeBlockLanguages-C4u7NjrS.js","assets/style-NQCk1_zL.css","assets/code-hljs-themes-B1Y_sCKp.js","assets/createAppMarkdownIt-BxCJn9Jd.js","assets/code-hljs-themes-BhXo3lwq.css","assets/settingsPageScroll-B8Cqlh2L.js","assets/SettingsCollapsibleHeading-BhaIL-tj.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-Cvd3RhZI.js";
import { r, j as t, __tla as __tla_0 } from "./vendor-react-BLJzfvPB.js";
import { A as s, E as a, D as E, __tla as __tla_1 } from "./index-esaETAQy.js";
import { L as p } from "./vendor-lucide-DPPF2CDs.js";
import { __tla as __tla_2 } from "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-4pFcYp0u.js";
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
  const l = r.lazy(() => d(() => import("./MarkdownEditor-kHoxW4-r.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]))), u = r.lazy(() => d(() => import("./HaimEditor-DEfAyHkD.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([40,1,2,41,14,42,43,44,7,45,13,29,8,9,10,11,12,6,15,46,18,26,27,28,47,48,19,49,36,20,50,51,52,4,5,16,17,53,25,30,31,32,54,55,37,22])));
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
