const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-DI-Txwtj.js","assets/vendor-react-BDjpSibw.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-0YdHorwW.js","assets/vendor-aws-Cvd3RhZI.js"])))=>i.map(i=>d[i]);
import { _ as i } from "./vendor-aws-Cvd3RhZI.js";
import { e as f, c } from "./appMarkdownItPlugins-DKQIH_5d.js";
import { aY as a, aZ as p, J as E, a_ as g, a$ as h, __tla as __tla_0 } from "./index-DqXcJFiU.js";
import { __tla as __tla_1 } from "./vendor-md-editor-DI-Txwtj.js";
import { __tla as __tla_2 } from "./vendor-react-BDjpSibw.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-codemirror-0YdHorwW.js";
import "./wikiImageResolver-CRvCKbjl.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./taskCheckboxStatus-DlXLsCJg.js";
import "./styleResolve-D4A7l-wW.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-lucide-Cix55NOo.js";
import { __tla as __tla_3 } from "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-radix-DuLpLUUM.js";
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
        i(() => import("./vendor-md-editor-DI-Txwtj.js").then(async (m2) => {
          await m2.__tla;
          return m2;
        }).then((t) => t.i), __vite__mapDeps([0,1,2,3,4])),
        i(() => import("./vendor-codemirror-0YdHorwW.js").then((t) => t.ak), __vite__mapDeps([3,4])),
        i(() => import("./vendor-codemirror-0YdHorwW.js").then((t) => t.al), __vite__mapDeps([3,4])),
        i(() => import("./vendor-md-editor-DI-Txwtj.js").then(async (m2) => {
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
