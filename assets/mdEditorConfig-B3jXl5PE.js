const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-X93Ii6bV.js","assets/vendor-react-BLJzfvPB.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-C7kLKAJE.js","assets/vendor-aws-Cvd3RhZI.js"])))=>i.map(i=>d[i]);
import { _ as i } from "./vendor-aws-Cvd3RhZI.js";
import { e as f, c } from "./appMarkdownItPlugins-DJ2paBRG.js";
import { aY as a, aZ as p, J as E, a_ as g, a$ as h, __tla as __tla_0 } from "./index-CSFc8FdZ.js";
import { __tla as __tla_1 } from "./vendor-md-editor-X93Ii6bV.js";
import { __tla as __tla_2 } from "./vendor-react-BLJzfvPB.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-codemirror-C7kLKAJE.js";
import "./wikiImageResolver-DO8anhS8.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-d5Fgeg8O.js";
import "./vendor-tiptap-B9z9WF3R.js";
import "./vendor-radix-4pFcYp0u.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-CyieoItt.js";
import "./styleResolve-dKeEaMKb.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-lucide--whUmDUa.js";
import { __tla as __tla_3 } from "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-DSEw68MZ.js";
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
        i(() => import("./vendor-md-editor-X93Ii6bV.js").then(async (m2) => {
          await m2.__tla;
          return m2;
        }).then((t) => t.i), __vite__mapDeps([0,1,2,3,4])),
        i(() => import("./vendor-codemirror-C7kLKAJE.js").then((t) => t.ak), __vite__mapDeps([3,4])),
        i(() => import("./vendor-codemirror-C7kLKAJE.js").then((t) => t.al), __vite__mapDeps([3,4])),
        i(() => import("./vendor-md-editor-X93Ii6bV.js").then(async (m2) => {
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
