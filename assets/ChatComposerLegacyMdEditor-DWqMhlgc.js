const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-X93Ii6bV.js","assets/vendor-react-BLJzfvPB.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-C7kLKAJE.js","assets/vendor-aws-Cvd3RhZI.js"])))=>i.map(i=>d[i]);
import { _ as E } from "./vendor-aws-Cvd3RhZI.js";
import { r as i, j as n, __tla as __tla_0 } from "./vendor-react-BLJzfvPB.js";
import { ensureMdEditorConfig as _, __tla as __tla_1 } from "./mdEditorConfig-BULepggO.js";
import { M } from "./MdEditorToolbarTooltips-CQMS09hm.js";
import { M as R } from "./useLazyMermaidRender-Bc-609LP.js";
import { J as v, __tla as __tla_2 } from "./index-esaETAQy.js";
import { h as O } from "./mdEditorSelectionWrap-Bd_xrT0X.js";
import "./appMarkdownItPlugins-KK4pg1k-.js";
import { __tla as __tla_3 } from "./vendor-md-editor-X93Ii6bV.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-codemirror-C7kLKAJE.js";
import "./wikiImageResolver-Nuz-2sph.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./taskCheckboxStatus-DlXLsCJg.js";
import "./styleResolve-9JH0_4hF.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-radix-4pFcYp0u.js";
import { __tla as __tla_4 } from "./lazyMermaid-rAP6XGht.js";
import "./vendor-lucide-DPPF2CDs.js";
import { __tla as __tla_5 } from "./bootSplash-QPCcRCUR.js";
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
    const { MdEditor: t } = await import("./vendor-md-editor-X93Ii6bV.js").then(async (m) => {
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
            if (f && O(o, f)) return o.preventDefault(), o.stopPropagation(), true;
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
            ...R
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
