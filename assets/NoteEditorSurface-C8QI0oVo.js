const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MarkdownEditor-DvGvBcKl.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BDjpSibw.js","assets/mdEditorConfig-X3ZlxyM4.js","assets/appMarkdownItPlugins-BRP-7WaU.js","assets/vendor-md-editor-CNr2PGSh.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CmNIsAMQ.js","assets/index-Bi820a2m.js","assets/vendor-lucide-DgWK5x8G.js","assets/bootSplash-B8aCHT5v.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Djo_xQxQ.js","assets/vendor-radix-qpbG9kXl.js","assets/index-C2cCZxw5.css","assets/wikiImageResolver-BTpOjDAV.js","assets/wikiImageSettings-Cji60Ojw.js","assets/noteCoverPlaceholderMarkdownIt-JbOPnRKr.js","assets/styleResolve-DoqNWjkh.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/previewSelectionSync-EVhjTAmT.js","assets/editorSelection-BPupdmEH.js","assets/clipboardImageFiles-uyX2c7iD.js","assets/WikiImageSizeModal-CqFylg4e.js","assets/vendor-image-crop-BD82vq0Q.js","assets/cropPadImage-wnyK5ooF.js","assets/index-CUaeQqoG.js","assets/TableEditModal-Ck_3uQ1m.js","assets/TableStyleTemplateEditor-DZ5Q4qdp.js","assets/mdEditorSelectionWrap-BXgq-Ytc.js","assets/previewFootnoteScroll--5Q18xyn.js","assets/useLazyMermaidRender-CMWw-qPT.js","assets/lazyMermaid-CFU1x6wk.js","assets/useWikiImageHydration-h_4KoYXY.js","assets/style-DaIsRrOV.css","assets/HaimEditor-CBM7oIWf.js","assets/vendor-tiptap-C36_9pH2.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Cy0EGwO-.js","assets/style-Dhjn2fhV.js","assets/Kbd-zJP-p1De.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-CLUdBs2z.js","assets/style-DFHpbRPl.css","assets/code-hljs-themes-B2JUO8wX.js","assets/createAppMarkdownIt-C3nZAHPM.js","assets/code-hljs-themes-Bjbtd00J.css","assets/settingsPageScroll-CoAb6Sih.js","assets/SettingsCollapsibleHeading-Bf-Q8gfJ.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-Cvd3RhZI.js";
import { r, j as t, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { E as s, F as a, G as E, __tla as __tla_1 } from "./index-Bi820a2m.js";
import { L as p } from "./vendor-lucide-DgWK5x8G.js";
import { __tla as __tla_2 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-qpbG9kXl.js";
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
  const l = r.lazy(() => d(() => import("./MarkdownEditor-DvGvBcKl.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]))), u = r.lazy(() => d(() => import("./HaimEditor-CBM7oIWf.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([39,1,2,40,14,41,42,43,7,44,13,30,8,9,10,11,12,6,15,45,27,28,29,18,46,47,19,36,20,48,49,50,4,5,16,17,51,26,31,32,52,53,37,22])));
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
