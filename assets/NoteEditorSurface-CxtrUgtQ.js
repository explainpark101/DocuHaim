const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-CYt6wCrN.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/mdEditorConfig-B3hmJePs.js","assets/appMarkdownItPlugins-Bqcmn7Ml.js","assets/vendor-md-editor-B8lrupGh.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-V7b8BJE-.js","assets/index-DRAozU5b.js","assets/vendor-lucide-BnjwTb2j.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-radix-8kjzYRrX.js","assets/index-wpTDHEW7.css","assets/wikiImageResolver-DwJ1DP9p.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-CZFZfFoz.js","assets/vendor-tiptap-DxyadcB3.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Dm7Q9DxH.js","assets/styleResolve-DAujLGFY.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CR47qWxc.js","assets/cmMarkdownFormatKeymap-CSclSOvK.js","assets/WikiImageSizeModal-DUtadAkN.js","assets/vendor-image-crop-ROMAbiiY.js","assets/cropPadImage-DVGv4Z4u.js","assets/index-flVIUjar.js","assets/haimCodeTabSettings-B-S365oc.js","assets/codeBlockCommentTogglePlan-Dpfl-zi2.js","assets/TableEditModal-CGcSQcU-.js","assets/TableStyleTemplateEditor-mYbeCXmw.js","assets/mdEditorSelectionWrap-DxJzFoHE.js","assets/MdEditorToolbarTooltips-DJ_Zamuo.js","assets/useHaimTableEdit-Buuv9V0r.js","assets/useLazyMermaidRender-BEGREvhj.js","assets/lazyMermaid-BcnyKPEC.js","assets/useWikiImageHydration-DnG9EYpW.js","assets/previewMirrorEdit-C4wnWGCU.js","assets/style-Dxkw9fjQ.css","assets/HaimEditor-DonOD-Zf.js","assets/style-BvfZMhHc.js","assets/downloadImageSrc-CZMxKG_A.js","assets/Kbd-Cnuyx3cZ.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-BXHU3IgU.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-CTZeiyY3.css","assets/code-hljs-themes-PojdV06i.js","assets/createAppMarkdownIt-IEDuvO-F.js","assets/code-hljs-themes-BhXo3lwq.css","assets/haimDualSyncDebounceSettings-BQZIsgtA.js","assets/SettingsCollapsibleHeading-BOtNCjO6.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { r as o, j as e, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as s, E as a, D as E, __tla as __tla_1 } from "./index-DRAozU5b.js";
import { L as p } from "./vendor-lucide-BnjwTb2j.js";
import { __tla as __tla_2 } from "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-8kjzYRrX.js";
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
  const l = o.lazy(() => d(() => import("./MarkdownEditor-CYt6wCrN.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]))), u = o.lazy(() => d(() => import("./HaimEditor-DonOD-Zf.js").then(async (m) => {
    await m.__tla;
    return m;
  }).then((t) => t.H), __vite__mapDeps([46,1,2,7,19,14,20,21,22,47,13,33,8,9,10,11,12,6,15,48,49,35,28,34,30,31,32,18,50,51,23,38,52,42,24,53,54,55,4,5,16,17,56,29,36,37,57,58,43,26])));
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
