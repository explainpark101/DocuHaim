const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-DbP8R6CA.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BLJzfvPB.js","assets/mdEditorConfig-D0mjv_I9.js","assets/appMarkdownItPlugins-BWgvTGbM.js","assets/vendor-md-editor-X93Ii6bV.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-C7kLKAJE.js","assets/index-HPqAjFB5.js","assets/vendor-lucide--whUmDUa.js","assets/bootSplash-QPCcRCUR.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-DSEw68MZ.js","assets/vendor-radix-4pFcYp0u.js","assets/index-Dm0LnCwW.css","assets/wikiImageResolver-D5oT9BRH.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-d5Fgeg8O.js","assets/vendor-tiptap-B9z9WF3R.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-CyieoItt.js","assets/styleResolve-Cz_NQrQv.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CeANqbO3.js","assets/cmMarkdownFormatKeymap-DtoQGNbS.js","assets/WikiImageSizeModal-DinH6U1-.js","assets/vendor-image-crop-BGPXj59i.js","assets/cropPadImage-C18NZJSV.js","assets/index-Dj2EGo58.js","assets/haimCodeTabSettings-BI7a8VYQ.js","assets/codeBlockCommentTogglePlan-3lyEpRvG.js","assets/TableEditModal-CjTz1hbf.js","assets/TableStyleTemplateEditor-DACLZoN1.js","assets/mdEditorSelectionWrap-DyglqM97.js","assets/MdEditorToolbarTooltips-CQMS09hm.js","assets/previewFootnoteScroll-DX9dewZO.js","assets/useLazyMermaidRender-Bc-609LP.js","assets/lazyMermaid-rAP6XGht.js","assets/useWikiImageHydration-PpDiLg7T.js","assets/previewMirrorEdit-BcAyTMlo.js","assets/style-DaIsRrOV.css","assets/HaimEditor-C-_rd9dx.js","assets/style-D0zNct78.js","assets/Kbd-9cV0YtE4.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-B7cETzN5.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-NQCk1_zL.css","assets/code-hljs-themes-BhyvBWgw.js","assets/createAppMarkdownIt-BtehGiLK.js","assets/code-hljs-themes-BhXo3lwq.css","assets/settingsPageScroll-B8Cqlh2L.js","assets/SettingsCollapsibleHeading-DTzvr_SS.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-Cvd3RhZI.js";
import { r, j as t, __tla as __tla_0 } from "./vendor-react-BLJzfvPB.js";
import { A as s, E as a, D as E, __tla as __tla_1 } from "./index-HPqAjFB5.js";
import { L as p } from "./vendor-lucide--whUmDUa.js";
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
  const l = r.lazy(() => d(() => import("./MarkdownEditor-DbP8R6CA.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]))), u = r.lazy(() => d(() => import("./HaimEditor-C-_rd9dx.js").then(async (m) => {
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
