const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ChatComposerLegacyMdEditor-BwelZfUF.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BDjpSibw.js","assets/mdEditorConfig-6Gqf2rNe.js","assets/appMarkdownItPlugins-BF8bDacR.js","assets/vendor-md-editor-CNr2PGSh.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CmNIsAMQ.js","assets/index-ahe6T7wM.js","assets/vendor-lucide-DgWK5x8G.js","assets/bootSplash-B8aCHT5v.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Djo_xQxQ.js","assets/vendor-radix-qpbG9kXl.js","assets/index-C2cCZxw5.css","assets/wikiImageResolver-DH_I5p_N.js","assets/wikiImageSettings-Cji60Ojw.js","assets/noteCoverPlaceholderMarkdownIt-JbOPnRKr.js","assets/styleResolve-DPOTuGzn.js","assets/mermaidTheme-Deyx0OD8.js","assets/mdEditorConfig-B8N4e11t.css","assets/editor-image-align-CGVqnEy0.css","assets/code-copy-BP7T9DEM.css","assets/mdEditorSelectionWrap-BXgq-Ytc.js","assets/useLazyMermaidRender-CMWw-qPT.js","assets/lazyMermaid-CFU1x6wk.js","assets/style-DaIsRrOV.css","assets/ChatComposerHaimEditor-FFZxHQer.js","assets/vendor-tiptap-C36_9pH2.js","assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-highlight-Cy0EGwO-.js","assets/style-DTF_LxjG.js","assets/index-CUaeQqoG.js","assets/Kbd-zJP-p1De.js","assets/WikiImageSizeModal-AAI2QFEi.js","assets/vendor-image-crop-BD82vq0Q.js","assets/cropPadImage-B9GNOm3V.js","assets/pretextMeasure-CjJHEvjB.js","assets/toHtml-BDOu_V6c.js","assets/style-DFHpbRPl.css","assets/ChatWithMyselfPane-CWWLIN-U.js","assets/ChatImageBackgroundPicker-ByZgZpmE.js","assets/appStatusBar-COMHAiNk.js","assets/useDocumentTheme-Bhb50wvv.js","assets/useWikiImageHydration-DxrSNym3.js","assets/vendor-emoji-CkoxFqjQ.js","assets/vendor-react-aria-Ca5SAAo0.js"])))=>i.map(i=>d[i]);
import { _ as a } from "./vendor-aws-Cvd3RhZI.js";
import { r as t, j as e, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { E as i, F as m, G as d, __tla as __tla_1 } from "./index-ahe6T7wM.js";
import { C as _, __tla as __tla_2 } from "./ChatWithMyselfPane-CWWLIN-U.js";
import "./vendor-lucide-DgWK5x8G.js";
import { __tla as __tla_3 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-qpbG9kXl.js";
import "./vendor-codemirror-CmNIsAMQ.js";
import "./wikiImageResolver-DH_I5p_N.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./ChatImageBackgroundPicker-ByZgZpmE.js";
import "./index-CUaeQqoG.js";
import "./appStatusBar-COMHAiNk.js";
import "./useDocumentTheme-Bhb50wvv.js";
import "./vendor-image-crop-BD82vq0Q.js";
import "./cropPadImage-B9GNOm3V.js";
import "./useWikiImageHydration-DxrSNym3.js";
import "./useLazyMermaidRender-CMWw-qPT.js";
import { __tla as __tla_4 } from "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-emoji-CkoxFqjQ.js";
import "./vendor-react-aria-Ca5SAAo0.js";
let S;
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
  const l = t.lazy(() => a(() => import("./ChatComposerLegacyMdEditor-BwelZfUF.js").then(async (m2) => {
    await m2.__tla;
    return m2;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]))), c = t.lazy(() => a(() => import("./ChatComposerHaimEditor-FFZxHQer.js"), __vite__mapDeps([28,2,29,14,1,30,31,32,7,33,13,34,8,9,10,11,12,6,15,35,36,37,38,18,39,40,19,26,20,41,42,16,17,43,44,45,46,25,47,48,23])));
  S = function(o) {
    const [s, p] = t.useState(() => i());
    t.useEffect(() => {
      const r = () => p(i());
      return window.addEventListener(m, r), window.addEventListener("storage", r), () => {
        window.removeEventListener(m, r), window.removeEventListener("storage", r);
      };
    }, []);
    const n = s === d, E = e.jsx(_, {
      value: o.value,
      onChange: o.onChange,
      fillParent: true
    });
    return e.jsx(t.Suspense, {
      fallback: E,
      children: n ? e.jsx(c, {
        ...o
      }) : e.jsx(l, {
        ...o
      })
    });
  };
});
export {
  __tla,
  S as default
};
