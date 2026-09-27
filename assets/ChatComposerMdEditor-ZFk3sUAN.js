const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ChatComposerLegacyMdEditor-BVittjdj.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BDjpSibw.js","assets/mdEditorConfig-DuB2ORHL.js","assets/appMarkdownItPlugins-BdJoanPZ.js","assets/vendor-md-editor-C-lRBXRc.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-Cs6dUi8u.js","assets/index-BF8EnhwI.js","assets/vendor-lucide-DgRPSpKt.js","assets/bootSplash-B8aCHT5v.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Djo_xQxQ.js","assets/vendor-radix-qpbG9kXl.js","assets/index-4pm0DzGn.css","assets/wikiImageResolver-KdXVQxAF.js","assets/wikiImageSettings-Cji60Ojw.js","assets/noteCoverPlaceholderMarkdownIt-JbOPnRKr.js","assets/styleResolve-wfRpwUCS.js","assets/mermaidTheme-Deyx0OD8.js","assets/mermaidBase64Fence-DMVvW2Zs.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/mdEditorSelectionWrap-Bc98AFRf.js","assets/useLazyMermaidRender-CMWw-qPT.js","assets/lazyMermaid-CFU1x6wk.js","assets/style-DaIsRrOV.css","assets/ChatComposerHaimEditor-fd1oR09e.js","assets/vendor-tiptap-Cwq5MbeS.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Cy0EGwO-.js","assets/style-C5R1jrH9.js","assets/index-CUaeQqoG.js","assets/Kbd-zJP-p1De.js","assets/WikiImageSizeModal-CFgFwQjh.js","assets/vendor-image-crop-BD82vq0Q.js","assets/cropPadImage-CpyUDqDt.js","assets/toHtml-C4jHCOXi.js","assets/style-Bb41sKvg.css"])))=>i.map(i=>d[i]);
import { _ as a } from "./vendor-aws-Cvd3RhZI.js";
import { r as e, j as t, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { E as s, F as i, G as E, __tla as __tla_1 } from "./index-BF8EnhwI.js";
import "./vendor-lucide-DgRPSpKt.js";
import { __tla as __tla_2 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-qpbG9kXl.js";
let L;
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
  const p = e.lazy(() => a(() => import("./ChatComposerLegacyMdEditor-BVittjdj.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]))), _ = e.lazy(() => a(() => import("./ChatComposerHaimEditor-fd1oR09e.js"), __vite__mapDeps([29,2,30,14,1,31,32,33,7,34,13,35,8,9,10,11,12,6,15,36,37,38,39,18,40,19,27,20,41])));
  function c() {
    return t.jsx("div", {
      className: "flex h-full items-center px-2.5 text-sm text-gray-400",
      children: "\uC5D0\uB514\uD130 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
    });
  }
  L = function(o) {
    const [n, m] = e.useState(() => s());
    e.useEffect(() => {
      const r = () => m(s());
      return window.addEventListener(i, r), window.addEventListener("storage", r), () => {
        window.removeEventListener(i, r), window.removeEventListener("storage", r);
      };
    }, []);
    const d = n === E;
    return t.jsx(e.Suspense, {
      fallback: t.jsx(c, {}),
      children: d ? t.jsx(_, {
        ...o
      }) : t.jsx(p, {
        ...o
      })
    });
  };
});
export {
  __tla,
  L as default
};
