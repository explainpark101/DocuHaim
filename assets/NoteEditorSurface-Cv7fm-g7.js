const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-pYe0az2v.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/mdEditorConfig-BMRoLmYI.js","assets/appMarkdownItPlugins-BJo4o10i.js","assets/vendor-md-editor-1ccdjpui.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-codemirror-V7b8BJE-.js","assets/index-CWx1gBsv.js","assets/vendor-lucide-AHEFQNv5.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-radix-BVXLG2Jn.js","assets/index-B1R7OWEK.css","assets/wikiImageResolver-Dih7ZVVu.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-BgTJMOgR.js","assets/styleResolve-B-rz72sw.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-CeHOjxvR.css","assets/editor-image-align-CUEhFApg.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CR47qWxc.js","assets/Kbd-Cnuyx3cZ.js","assets/cmMarkdownFormatKeymap-d4e9sZPn.js","assets/WikiImageSizeModal-CEakYpiI.js","assets/vendor-image-crop-ROMAbiiY.js","assets/cropPadImage-zaxcevb9.js","assets/index-flVIUjar.js","assets/haimCodeTabSettings-B-S365oc.js","assets/codeBlockCommentTogglePlan-BW9JkcUa.js","assets/TableEditModal-DFyB22ZS.js","assets/TableStyleTemplateEditor-Pv-TrLTS.js","assets/mdEditorSelectionWrap-DiPZHaDp.js","assets/MdEditorToolbarTooltips-df2rKmef.js","assets/useHaimTableEdit-H6xjGWE1.js","assets/useLazyMermaidRender-BEGREvhj.js","assets/lazyMermaid-BcnyKPEC.js","assets/useWikiImageHydration-6BKBzWR_.js","assets/previewMirrorEdit-BgZ6X2Kk.js","assets/style-Dxkw9fjQ.css","assets/HaimEditor-DEAhJsYz.js","assets/vendor-tiptap-Yn3Z_JT2.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Dm7Q9DxH.js","assets/style-CNHRnqh6.js","assets/downloadImageSrc-WEjb9ipO.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-Cr5eT5v6.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-qZtj1I7f.css","assets/code-hljs-themes-DrZ8LehU.js","assets/createAppMarkdownIt-DcvXmRio.js","assets/code-hljs-themes-BhXo3lwq.css","assets/haimDualSyncDebounceSettings-BQZIsgtA.js","assets/SettingsCollapsibleHeading-Cov0WAHn.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { r as o, j as e, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { G as s, H as a, I as E, __tla as __tla_1 } from "./index-CWx1gBsv.js";
import { L as p } from "./vendor-lucide-AHEFQNv5.js";
import { __tla as __tla_2 } from "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-BVXLG2Jn.js";
let k;
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
  const l = o.lazy(() => d(() => import("./MarkdownEditor-pYe0az2v.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]))), u = o.lazy(() => d(() => import("./HaimEditor-DEAhJsYz.js").then(async (m) => {
    await m.__tla;
    return m;
  }).then((t) => t.H), __vite__mapDeps([43,1,2,7,44,14,45,46,47,48,13,30,8,9,10,11,12,6,15,49,25,32,24,31,27,28,29,18,50,51,19,35,52,39,20,53,54,55,4,5,16,17,56,26,33,34,57,58,40,22])));
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
  k = function({ engine: t, ...n }) {
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
  k as default
};
