const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-B8lrupGh.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-V7b8BJE-.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { _ as E } from "./vendor-aws-hJDgVEKM.js";
import { r as i, j as n, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { ensureMdEditorConfig as _, __tla as __tla_1 } from "./mdEditorConfig-DtyCSywe.js";
import { M } from "./MdEditorToolbarTooltips-DJ_Zamuo.js";
import { M as R } from "./useLazyMermaidRender-BEGREvhj.js";
import { K as h, __tla as __tla_2 } from "./index-BYVoYwQr.js";
import { h as v } from "./mdEditorSelectionWrap-DR6lJ0QV.js";
import "./appMarkdownItPlugins-m-T7S_wy.js";
import { __tla as __tla_3 } from "./vendor-md-editor-B8lrupGh.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./wikiImageResolver-BX0McZ8Q.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-CZFZfFoz.js";
import "./vendor-tiptap-DxyadcB3.js";
import "./vendor-radix-8kjzYRrX.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./styleResolve-FWe9FNWf.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-motion-Bv-XITR_.js";
import { __tla as __tla_4 } from "./lazyMermaid-BcnyKPEC.js";
import "./vendor-lucide-BnjwTb2j.js";
import { __tla as __tla_5 } from "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
let Z;
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
    const { MdEditor: t } = await import("./vendor-md-editor-B8lrupGh.js").then(async (m) => {
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
  Z = function({ value: t, onChange: e, theme: c, showToolbar: l = true, onUploadImg: a }) {
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
  Z as default
};
