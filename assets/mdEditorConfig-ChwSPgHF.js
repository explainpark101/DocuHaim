const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-aRP6UsDX.js","assets/vendor-react-BLJzfvPB.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-CohftLwi.js","assets/vendor-aws-DKtg11UV.js"])))=>i.map(i=>d[i]);
import { _ as i } from "./vendor-aws-DKtg11UV.js";
import { e as f, c } from "./appMarkdownItPlugins-QF9zhSxr.js";
import { aZ as a, a_ as p, K as E, a$ as g, b0 as h, __tla as __tla_0 } from "./index-RYdiX4QF.js";
import { __tla as __tla_1 } from "./vendor-md-editor-aRP6UsDX.js";
import { __tla as __tla_2 } from "./vendor-react-BLJzfvPB.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-codemirror-CohftLwi.js";
import "./wikiImageResolver-Bh7scVLU.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-L0CcV20b.js";
import "./vendor-tiptap-BdDxwsAS.js";
import "./vendor-radix-DaZdH-oT.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-CyieoItt.js";
import "./styleResolve-DPBnFsnB.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-lucide-XZJwJkMR.js";
import { __tla as __tla_3 } from "./bootSplash-Dmg87Il5.js";
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
        i(() => import("./vendor-md-editor-aRP6UsDX.js").then(async (m2) => {
          await m2.__tla;
          return m2;
        }).then((t) => t.i), __vite__mapDeps([0,1,2,3,4])),
        i(() => import("./vendor-codemirror-CohftLwi.js").then((t) => t.ak), __vite__mapDeps([3,4])),
        i(() => import("./vendor-codemirror-CohftLwi.js").then((t) => t.al), __vite__mapDeps([3,4])),
        i(() => import("./vendor-md-editor-aRP6UsDX.js").then(async (m2) => {
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
