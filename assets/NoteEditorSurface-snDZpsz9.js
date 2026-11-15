const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-C-vgFbTf.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/mdEditorConfig-RqsMzxVb.js","assets/appMarkdownItPlugins-BM6zNQXV.js","assets/vendor-md-editor-1ccdjpui.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-codemirror-V7b8BJE-.js","assets/index-CQMGs8de.js","assets/vendor-lucide-AHEFQNv5.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-radix-BVXLG2Jn.js","assets/index-B1R7OWEK.css","assets/wikiImageResolver-0EDmlb7T.js","assets/wikiImageSettings-Cji60Ojw.js","assets/emojiShortcode-BhZ6UzDa.js","assets/styleResolve-tsxn7cpN.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-CR47qWxc.js","assets/Kbd-Cnuyx3cZ.js","assets/cmMarkdownFormatKeymap-CRccZN3J.js","assets/WikiImageSizeModal-C3H0owX4.js","assets/vendor-image-crop-ROMAbiiY.js","assets/cropPadImage-D6553pg7.js","assets/index-flVIUjar.js","assets/haimCodeTabSettings-B-S365oc.js","assets/codeBlockCommentTogglePlan-CEAlOENl.js","assets/TableEditModal-4zFa3i_V.js","assets/TableStyleTemplateEditor-2Ygl1S-2.js","assets/mdEditorSelectionWrap-tzf_uN_m.js","assets/MdEditorToolbarTooltips-df2rKmef.js","assets/useHaimTableEdit-BKMggc2K.js","assets/useLazyMermaidRender-BEGREvhj.js","assets/lazyMermaid-BcnyKPEC.js","assets/useWikiImageHydration-BtlLJs9i.js","assets/previewMirrorEdit-DrqAWTHP.js","assets/style-Dxkw9fjQ.css","assets/HaimEditor-C6NbM1_L.js","assets/vendor-tiptap-Yn3Z_JT2.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Dm7Q9DxH.js","assets/style-QHca_yti.js","assets/downloadImageSrc-68YUI0EE.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-Dmx3z2zy.js","assets/haimCodeBlockLanguages-BStQPvla.js","assets/style-CWgpuOXw.css","assets/code-hljs-themes-DZ2E4rUS.js","assets/createAppMarkdownIt-CHD9ZsPC.js","assets/code-hljs-themes-BhXo3lwq.css","assets/haimDualSyncDebounceSettings-BQZIsgtA.js","assets/SettingsCollapsibleHeading-Cov0WAHn.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { r as o, j as e, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { G as s, H as a, I as E, __tla as __tla_1 } from "./index-CQMGs8de.js";
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
  const l = o.lazy(() => d(() => import("./MarkdownEditor-C-vgFbTf.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]))), u = o.lazy(() => d(() => import("./HaimEditor-C6NbM1_L.js").then(async (m) => {
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
