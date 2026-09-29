const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-DeZUbj2X.js","assets/vendor-react-BDjpSibw.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-D25dVEXW.js","assets/vendor-aws-Cvd3RhZI.js"])))=>i.map(i=>d[i]);
import { _ as E } from "./vendor-aws-Cvd3RhZI.js";
import { r as i, j as n, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { ensureMdEditorConfig as _, __tla as __tla_1 } from "./mdEditorConfig-CNVYQd5k.js";
import { M, h as R } from "./mdEditorSelectionWrap-CCjQF_q8.js";
import { M as O } from "./useLazyMermaidRender-CMWw-qPT.js";
import { O as v, __tla as __tla_2 } from "./index-Dwy7RB8K.js";
import "./appMarkdownItPlugins-B5A3Ornv.js";
import { __tla as __tla_3 } from "./vendor-md-editor-DeZUbj2X.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-codemirror-D25dVEXW.js";
import "./wikiImageResolver-DZBEADph.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./taskCheckboxStatus-DlXLsCJg.js";
import "./styleResolve-V9sqb-2T.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-radix-DuLpLUUM.js";
import "./editorMarkdownStyle-DXQ7jS9p.js";
import { __tla as __tla_4 } from "./lazyMermaid-CFU1x6wk.js";
import "./vendor-lucide-CbEk5sea.js";
import { __tla as __tla_5 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
let U;
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
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })()
]).then(async () => {
  await _();
  const { MdEditor: h } = await E(async () => {
    const { MdEditor: t } = await import("./vendor-md-editor-DeZUbj2X.js").then(async (m) => {
      await m.__tla;
      return m;
    }).then((e) => e.i);
    return {
      MdEditor: t
    };
  }, __vite__mapDeps([0,1,2,3,4])), C = [
    "bold",
    "underline",
    "italic",
    "-",
    "strikeThrough",
    "quote",
    "unorderedList",
    "orderedList",
    "task",
    "-",
    "codeRow",
    "code",
    "link",
    "-",
    "revoke",
    "next"
  ];
  U = function({ value: t, onChange: e, theme: c, showToolbar: a = true, onUploadImg: l }) {
    const s = i.useRef(null), m = i.useRef(null);
    return i.useEffect(() => {
      let p = false, r = null;
      const d = () => {
        const u = m.current;
        return (u == null ? void 0 : u.domEventHandlers) ? (u.domEventHandlers({
          keydown: (o, f) => {
            if (f && R(o, f)) return o.preventDefault(), o.stopPropagation(), true;
          }
        }), true) : false;
      };
      return d() || (r = setInterval(() => {
        p || d() && r && (clearInterval(r), r = null);
      }, 50)), () => {
        p = true, r && clearInterval(r);
      };
    }, []), n.jsxs("div", {
      ref: s,
      className: "relative h-full w-full",
      children: [
        n.jsx(h, {
          ref: m,
          editorId: v,
          modelValue: t,
          onChange: e,
          theme: c,
          language: "ko-KR",
          customIcon: {
            ...O
          },
          preview: false,
          toolbars: a ? [
            ...C
          ] : [],
          footers: [],
          placeholder: "\uCC44\uD305\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694",
          style: {
            height: "100%"
          },
          ...l ? {
            onUploadImg: l
          } : {}
        }),
        a ? n.jsx(M, {
          containerRef: s
        }) : null
      ]
    });
  };
});
export {
  __tla,
  U as default
};
