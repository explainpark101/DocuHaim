const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-Cx1MD3OH.js","assets/vendor-react-ChQ1w2We.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CohftLwi.js","assets/vendor-aws-DKtg11UV.js"])))=>i.map(i=>d[i]);
import { _ as i } from "./vendor-aws-DKtg11UV.js";
import { e as f, c } from "./appMarkdownItPlugins-XsxnGAjB.js";
import { a_ as a, a$ as p, K as E, b0 as g, b1 as h, __tla as __tla_0 } from "./index-CWtFHgS0.js";
import { __tla as __tla_1 } from "./vendor-md-editor-Cx1MD3OH.js";
import { __tla as __tla_2 } from "./vendor-react-ChQ1w2We.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-codemirror-CohftLwi.js";
import "./wikiImageResolver-B76Jgn3W.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-Dqx6Py2y.js";
import "./vendor-tiptap-CEo_3qRU.js";
import "./vendor-radix-BQ9XceqC.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-C3cP4Xc_.js";
import "./styleResolve-Bb8U_86Q.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-lucide-BB1m8XvN.js";
import { __tla as __tla_3 } from "./bootSplash-Dmg87Il5.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-L8D9Iqni.js";
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
  function A(r) {
    return r === E ? g() : h();
  }
  let n = null;
  C = function() {
    return n || (n = (async () => {
      const [{ config: r }, { EditorView: m }, { closeCompletion: s, completionStatus: d }, l] = await Promise.all([
        i(() => import("./vendor-md-editor-Cx1MD3OH.js").then(async (m2) => {
          await m2.__tla;
          return m2;
        }).then((t) => t.i), __vite__mapDeps([0,1,2,3,4])),
        i(() => import("./vendor-codemirror-CohftLwi.js").then((t) => t.ak), __vite__mapDeps([3,4])),
        i(() => import("./vendor-codemirror-CohftLwi.js").then((t) => t.al), __vite__mapDeps([3,4])),
        i(() => import("./vendor-md-editor-Cx1MD3OH.js").then(async (m2) => {
          await m2.__tla;
          return m2;
        }).then((t) => t.k), __vite__mapDeps([0,1,2,3,4])).then((t) => t.default)
      ]);
      if (typeof r != "function") throw new Error("[mdEditorConfig] md-editor-rt config is not a function");
      r({
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
