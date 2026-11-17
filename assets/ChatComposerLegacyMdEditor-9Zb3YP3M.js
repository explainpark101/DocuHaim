const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-1ccdjpui.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-codemirror-V7b8BJE-.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { _ as E } from "./vendor-aws-hJDgVEKM.js";
import { r as i, j as n, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { ensureMdEditorConfig as _, __tla as __tla_1 } from "./mdEditorConfig-BGs0lKMN.js";
import { M } from "./MdEditorToolbarTooltips-df2rKmef.js";
import { M as R } from "./useLazyMermaidRender-BEGREvhj.js";
import { X as h, __tla as __tla_2 } from "./index-DBtagrQ1.js";
import { h as v } from "./mdEditorSelectionWrap-Bres0rpE.js";
import "./appMarkdownItPlugins-B4Srxe8Z.js";
import { __tla as __tla_3 } from "./vendor-md-editor-1ccdjpui.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./wikiImageResolver-H1uq0InT.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-DO5We1_o.js";
import "./styleResolve-Djr73gTS.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-radix-BVXLG2Jn.js";
import { __tla as __tla_4 } from "./lazyMermaid-BcnyKPEC.js";
import "./vendor-lucide-B2dyHAgp.js";
import { __tla as __tla_5 } from "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
let Q;
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
  const { MdEditor: x } = await E(async () => {
    const { MdEditor: t } = await import("./vendor-md-editor-1ccdjpui.js").then(async (m) => {
      await m.__tla;
      return m;
    }).then((e) => e.i);
    return {
      MdEditor: t
    };
  }, __vite__mapDeps([0,1,2,3,4])), O = [
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
  Q = function({ value: t, onChange: e, theme: c, showToolbar: l = true, onUploadImg: a }) {
    const s = i.useRef(null), m = i.useRef(null);
    return i.useEffect(() => {
      let p = false, r = null;
      const d = () => {
        const u = m.current;
        return (u == null ? void 0 : u.domEventHandlers) ? (u.domEventHandlers({
          keydown: (o, f) => {
            if (f && v(o, f)) return o.preventDefault(), o.stopPropagation(), true;
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
      className: "relative flex h-full min-h-0 w-full flex-1 flex-col",
      children: [
        n.jsx(x, {
          ref: m,
          editorId: h,
          modelValue: t,
          onChange: e,
          theme: c,
          language: "ko-KR",
          customIcon: {
            ...R
          },
          preview: false,
          toolbars: l ? [
            ...O
          ] : [],
          footers: [],
          placeholder: "\uCC44\uD305\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694",
          style: {
            height: "100%"
          },
          ...a ? {
            onUploadImg: a
          } : {}
        }),
        l ? n.jsx(M, {
          containerRef: s
        }) : null
      ]
    });
  };
});
export {
  __tla,
  Q as default
};
