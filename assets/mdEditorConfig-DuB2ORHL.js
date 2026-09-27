const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-C-lRBXRc.js","assets/vendor-react-BDjpSibw.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-Cs6dUi8u.js","assets/vendor-aws-Cvd3RhZI.js"])))=>i.map(i=>d[i]);
import { _ as r } from "./vendor-aws-Cvd3RhZI.js";
import { e as f, c } from "./appMarkdownItPlugins-BdJoanPZ.js";
import { b7 as a, b8 as p, M as E, b9 as g, ba as h, __tla as __tla_0 } from "./index-BF8EnhwI.js";
import { __tla as __tla_1 } from "./vendor-md-editor-C-lRBXRc.js";
import { __tla as __tla_2 } from "./vendor-react-BDjpSibw.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-codemirror-Cs6dUi8u.js";
import "./wikiImageResolver-KdXVQxAF.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import "./styleResolve-wfRpwUCS.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./mermaidBase64Fence-DMVvW2Zs.js";
import "./vendor-lucide-DgRPSpKt.js";
import { __tla as __tla_3 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./vendor-radix-qpbG9kXl.js";
let C;
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
  })()
]).then(async () => {
  function A(i) {
    return i === E ? g() : h();
  }
  let n = null;
  C = function() {
    return n || (n = (async () => {
      const [{ config: i }, { EditorView: m }, { closeCompletion: s, completionStatus: d }, l] = await Promise.all([
        r(() => import("./vendor-md-editor-C-lRBXRc.js").then(async (m2) => {
          await m2.__tla;
          return m2;
        }).then((t) => t.i), __vite__mapDeps([0,1,2,3,4])),
        r(() => import("./vendor-codemirror-Cs6dUi8u.js").then((t) => t.ai), __vite__mapDeps([3,4])),
        r(() => import("./vendor-codemirror-Cs6dUi8u.js").then((t) => t.aj), __vite__mapDeps([3,4])),
        r(() => import("./vendor-md-editor-C-lRBXRc.js").then(async (m2) => {
          await m2.__tla;
          return m2;
        }).then((t) => t.k), __vite__mapDeps([0,1,2,3,4])).then((t) => t.default)
      ]);
      if (typeof i != "function") throw new Error("[mdEditorConfig] md-editor-rt config is not a function");
      i({
        editorConfig: {
          languageUserDefined: {
            "ko-KR": l
          }
        },
        editorExtensions: {
          highlight: {
            css: {
              "one-dark": {
                light: p,
                dark: p
              },
              "one-light": {
                light: a,
                dark: a
              }
            }
          },
          cropper: {
            instance: {}
          }
        },
        mermaidConfig(t) {
          return {
            ...t,
            securityLevel: "loose",
            startOnLoad: false
          };
        },
        markdownItConfig(t) {
          c(t);
        },
        markdownItPlugins(t) {
          return f(t);
        },
        codeMirrorExtensions(t, _) {
          const u = _ == null ? void 0 : _.editorId, e = (t || []).filter((o) => (o == null ? void 0 : o.type) !== "linkShortener");
          return e.some((o) => (o == null ? void 0 : o.type) === "autocompleteGate") ? e : [
            ...e,
            {
              type: "autocompleteGate",
              extension: m.updateListener.of((o) => {
                A(u) || d(o.state) === "active" && s(o.view);
              })
            }
          ];
        }
      });
    })()), n;
  };
  await C();
});
export {
  __tla,
  C as ensureMdEditorConfig
};
