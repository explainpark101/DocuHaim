const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-B9RxuSBA.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/mdEditorConfig-BVcMOEJo.js","assets/appMarkdownItPlugins-kZbj9yqt.js","assets/vendor-md-editor-CUg06eqn.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CUfDzGPd.js","assets/index-BP7C--nq.js","assets/vendor-lucide-DBE8vF92.js","assets/bootSplash-BM1jVZSP.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-radix-D1Cm_mSM.js","assets/index-C_qElinZ.css","assets/wikiImageResolver-DD2lM78T.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-C6XCfD9g.js","assets/vendor-tiptap-BMlBKcBH.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Dm7Q9DxH.js","assets/styleResolve-C3Hh92Xw.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CN7NzbrU.js","assets/cmMarkdownFormatKeymap-VrlaXgCS.js","assets/WikiImageSizeModal-pTk6kyy-.js","assets/vendor-image-crop-ROMAbiiY.js","assets/cropPadImage-CH8u1dMv.js","assets/index-flVIUjar.js","assets/haimCodeTabSettings-BI7a8VYQ.js","assets/codeBlockCommentTogglePlan-3lyEpRvG.js","assets/TableEditModal-CfGf2BBd.js","assets/TableStyleTemplateEditor-ejqj6Trz.js","assets/mdEditorSelectionWrap-3SV9Zfha.js","assets/MdEditorToolbarTooltips-DfNLcTWQ.js","assets/previewFootnoteScroll-Q1nol_cz.js","assets/useLazyMermaidRender-BEGREvhj.js","assets/lazyMermaid-BcnyKPEC.js","assets/useWikiImageHydration-W0MN7yNW.js","assets/previewMirrorEdit-dlOpUH1O.js","assets/style-DaIsRrOV.css","assets/HaimEditor-CdXvTAtg.js","assets/style-CXG0OUgX.js","assets/Kbd-Cnuyx3cZ.js","assets/copyImageToClipboard-CSIFGHOw.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-IvBdkGZ5.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-CCb1jIlH.css","assets/code-hljs-themes-BcRjXa3M.js","assets/createAppMarkdownIt-CYgkk0eh.js","assets/code-hljs-themes-BhXo3lwq.css","assets/settingsPageScroll-B8Cqlh2L.js","assets/SettingsCollapsibleHeading-8JL8kIoz.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { r, j as t, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as s, E as a, D as E, __tla as __tla_1 } from "./index-BP7C--nq.js";
import { L as p } from "./vendor-lucide-DBE8vF92.js";
import { __tla as __tla_2 } from "./bootSplash-BM1jVZSP.js";
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
  const l = r.lazy(() => d(() => import("./MarkdownEditor-B9RxuSBA.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]))), u = r.lazy(() => d(() => import("./HaimEditor-CdXvTAtg.js").then(async (m) => {
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
