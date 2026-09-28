const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ChatComposerLegacyMdEditor-dwC6djpt.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BDjpSibw.js","assets/mdEditorConfig-ClK_5Fdz.js","assets/appMarkdownItPlugins-DXlXZr3U.js","assets/vendor-md-editor-CNr2PGSh.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CmNIsAMQ.js","assets/index-CfCFWUoL.js","assets/vendor-lucide-DgWK5x8G.js","assets/bootSplash-B8aCHT5v.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Dw-WnPM7.js","assets/vendor-radix-qpbG9kXl.js","assets/index-ClVhkmoB.css","assets/wikiImageResolver-ZDTE2Opu.js","assets/wikiImageSettings-Cji60Ojw.js","assets/noteCoverPlaceholderMarkdownIt-JbOPnRKr.js","assets/styleResolve-BCNHdBqL.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/mdEditorSelectionWrap-CPv5mmkq.js","assets/useLazyMermaidRender-CMWw-qPT.js","assets/lazyMermaid-CFU1x6wk.js","assets/style-DaIsRrOV.css","assets/ChatComposerHaimEditor-Ce2sBReU.js","assets/vendor-tiptap-D-NU6RLj.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Cy0EGwO-.js","assets/style-iKQsKBzO.js","assets/index-CUaeQqoG.js","assets/Kbd-zJP-p1De.js","assets/WikiImageSizeModal--zGJhe9P.js","assets/vendor-image-crop-BD82vq0Q.js","assets/cropPadImage-DABUHjpN.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-BGH46tCl.js","assets/haimCodeBlockLanguages-C4u7NjrS.js","assets/style-CWEhaOWy.css","assets/ChatWithMyselfPane-cq2cym9y.js","assets/ChatImageBackgroundPicker-CHXq-0Yu.js","assets/appStatusBar-COMHAiNk.js","assets/useDocumentTheme-CgA5PX6I.js","assets/useWikiImageHydration-DfIM0C7d.js","assets/vendor-emoji-CkoxFqjQ.js","assets/vendor-react-aria-Ca5SAAo0.js"])))=>i.map(i=>d[i]);
import { _ as a } from "./vendor-aws-Cvd3RhZI.js";
import { r as t, j as i, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { E as e, F as m, G as d, __tla as __tla_1 } from "./index-CfCFWUoL.js";
import { C as _, __tla as __tla_2 } from "./ChatWithMyselfPane-cq2cym9y.js";
import "./vendor-lucide-DgWK5x8G.js";
import { __tla as __tla_3 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-qpbG9kXl.js";
import "./vendor-codemirror-CmNIsAMQ.js";
import "./wikiImageResolver-ZDTE2Opu.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./ChatImageBackgroundPicker-CHXq-0Yu.js";
import "./index-CUaeQqoG.js";
import "./appStatusBar-COMHAiNk.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./useDocumentTheme-CgA5PX6I.js";
import "./vendor-image-crop-BD82vq0Q.js";
import "./cropPadImage-DABUHjpN.js";
import "./useWikiImageHydration-DfIM0C7d.js";
import "./useLazyMermaidRender-CMWw-qPT.js";
import { __tla as __tla_4 } from "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-emoji-CkoxFqjQ.js";
import "./vendor-react-aria-Ca5SAAo0.js";
let Y;
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
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })()
]).then(async () => {
  const l = t.lazy(() => a(() => import("./ChatComposerLegacyMdEditor-dwC6djpt.js").then(async (m2) => {
    await m2.__tla;
    return m2;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]))), c = t.lazy(() => a(() => import("./ChatComposerHaimEditor-Ce2sBReU.js"), __vite__mapDeps([28,2,29,14,1,30,31,32,7,33,13,34,8,9,10,11,12,6,15,35,36,37,38,18,39,40,19,41,26,20,42,43,16,17,44,45,46,47,25,48,49,23])));
  Y = function(o) {
    const [p, s] = t.useState(() => e());
    t.useEffect(() => {
      const r = () => s(e());
      return window.addEventListener(m, r), window.addEventListener("storage", r), () => {
        window.removeEventListener(m, r), window.removeEventListener("storage", r);
      };
    }, []);
    const n = p === d, E = i.jsx(_, {
      value: o.value,
      onChange: o.onChange,
      fillParent: true
    });
    return i.jsx(t.Suspense, {
      fallback: E,
      children: n ? i.jsx(c, {
        ...o
      }) : i.jsx(l, {
        ...o
      })
    });
  };
});
export {
  __tla,
  Y as default
};
