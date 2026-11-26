const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-urVHnnWY.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/mdEditorConfig-5yaLST7D.js","assets/appMarkdownItPlugins-BME4Tvg2.js","assets/vendor-md-editor-1ccdjpui.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-codemirror-V7b8BJE-.js","assets/index-Bdv3Df6K.js","assets/vendor-lucide-Bo8me5Pj.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-radix-ClWfNC7b.js","assets/index-B93fYrFN.css","assets/wikiImageResolver-XE0B9J6j.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-DVLefTaM.js","assets/styleResolve-CG3y-hd2.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-CeHOjxvR.css","assets/editor-image-align-CUEhFApg.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CR47qWxc.js","assets/Kbd-Cnuyx3cZ.js","assets/cmMarkdownFormatKeymap-C-XnEOud.js","assets/WikiImageSizeModal-Dm51JekQ.js","assets/vendor-image-crop-ROMAbiiY.js","assets/cropPadImage-C_zmab2M.js","assets/index-flVIUjar.js","assets/haimCodeTabSettings-B-S365oc.js","assets/codeBlockCommentTogglePlan-DftFV4tc.js","assets/TableEditModal-WGfUX3YK.js","assets/TableStyleTemplateEditor-C4pqq7Vy.js","assets/mdEditorSelectionWrap-CZbdUOtT.js","assets/MdEditorToolbarTooltips-BmI5bfEb.js","assets/useHaimTableEdit-BvfREP7t.js","assets/useLazyMermaidRender-BEGREvhj.js","assets/lazyMermaid-BcnyKPEC.js","assets/useWikiImageHydration-3eFVSo2W.js","assets/previewMirrorEdit-DycdLaph.js","assets/style-Dxkw9fjQ.css","assets/HaimEditor-CYlfKB4j.js","assets/vendor-tiptap-rNZeEPKG.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Dm7Q9DxH.js","assets/markdownCache-BH87898H.js","assets/downloadImageSrc-DM3Sbpue.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-SKQpzmFP.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/markdownIo-lkrZOuUP.js","assets/createAppMarkdownIt-YBgN5Wdh.js","assets/haimDualSyncDebounceSettings-BQZIsgtA.js","assets/SettingsCollapsibleHeading-DEoNLNk5.js","assets/style-Kef51fw0.css","assets/code-hljs-themes-BhXo3lwq.css"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { r as o, j as e, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { J as s, K as a, M as E, __tla as __tla_1 } from "./index-Bdv3Df6K.js";
import { L as p } from "./vendor-lucide-Bo8me5Pj.js";
import { __tla as __tla_2 } from "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-ClWfNC7b.js";
let H;
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
  const l = o.lazy(() => d(() => import("./MarkdownEditor-urVHnnWY.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]))), u = o.lazy(() => d(() => import("./HaimEditor-CYlfKB4j.js").then(async (m) => {
    await m.__tla;
    return m;
  }).then((t) => t.H), __vite__mapDeps([43,1,2,7,44,14,45,46,47,48,13,30,8,9,10,11,12,6,15,49,25,32,24,31,27,28,29,18,50,51,19,35,52,39,20,53,54,4,5,16,17,26,33,34,55,56,40,57,58,22])));
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
  H = function({ engine: t, ...n }) {
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
  H as default
};
