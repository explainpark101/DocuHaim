const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-1ccdjpui.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-codemirror-V7b8BJE-.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { _ as i } from "./vendor-aws-hJDgVEKM.js";
import { e as f, c } from "./appMarkdownItPlugins-I8vvO87V.js";
import { ba as p, bb as a, U as E, bc as g, bd as h, __tla as __tla_0 } from "./index-BebLgvYF.js";
import { __tla as __tla_1 } from "./vendor-md-editor-1ccdjpui.js";
import { __tla as __tla_2 } from "./vendor-react-BPvvDyqO.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./wikiImageResolver-Kn2kiZoN.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-BBwWj-Nq.js";
import "./vendor-tiptap-MFDL-V7S.js";
import "./vendor-radix-CN5WtDh3.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./styleResolve-D_dchqAE.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-lucide-B8TfEQX9.js";
import { __tla as __tla_3 } from "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
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
        i(() => import("./vendor-md-editor-1ccdjpui.js").then(async (m2) => {
          await m2.__tla;
          return m2;
        }).then((t) => t.i), __vite__mapDeps([0,1,2,3,4])),
        i(() => import("./vendor-codemirror-V7b8BJE-.js").then((t) => t.an), __vite__mapDeps([3,4])),
        i(() => import("./vendor-codemirror-V7b8BJE-.js").then((t) => t.ao), __vite__mapDeps([3,4])),
        i(() => import("./vendor-md-editor-1ccdjpui.js").then(async (m2) => {
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
                light: a,
                dark: a
              },
              "one-light": {
                light: p,
                dark: p
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
