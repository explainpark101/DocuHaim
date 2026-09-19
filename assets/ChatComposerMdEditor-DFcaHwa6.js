import { r as t, j as o } from "./vendor-react-BwEIQNKH.js";
import { c as R, v as E, K as O } from "./vendor-md-editor-D3gQZdJY.js";
import { M as v, h as M } from "./mdEditorSelectionWrap-BdlG3g30.js";
import { M as _, G as h } from "./index-bQvC9Gon.js";
import "./vendor-motion-CLW0brs2.js";
import "./vendor-radix-DOgSp64j.js";
import "./vendor-aws-u6g9QQ6G.js";
import "./vendor-lucide-MLE-4ziu.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-Bp0rxPXM.js";
E({ editorConfig: { languageUserDefined: { "ko-KR": O } } });
const C = ["bold", "underline", "italic", "-", "strikeThrough", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", "-", "revoke", "next"];
function w({ value: c, onChange: m, theme: p, showToolbar: l = true, onUploadImg: n }) {
  const i = t.useRef(null), s = t.useRef(null);
  return t.useEffect(() => {
    let a = false, e = null;
    const u = () => {
      const d = s.current;
      return (d == null ? void 0 : d.domEventHandlers) ? (d.domEventHandlers({ keydown: (r, f) => {
        if (f && M(r, f)) return r.preventDefault(), r.stopPropagation(), true;
      } }), true) : false;
    };
    return u() || (e = setInterval(() => {
      a || u() && e && (clearInterval(e), e = null);
    }, 50)), () => {
      a = true, e && clearInterval(e);
    };
  }, []), o.jsxs("div", { ref: i, className: "relative h-full w-full", children: [o.jsx(R, { ref: s, editorId: h, modelValue: c, onChange: m, theme: p, language: "ko-KR", customIcon: { ..._ }, preview: false, toolbars: l ? [...C] : [], footers: [], placeholder: "\uBA54\uC2DC\uC9C0 \uC785\uB825\u2026", style: { height: "100%" }, ...n ? { onUploadImg: n } : {} }), l ? o.jsx(v, { containerRef: i }) : null] });
}
export {
  w as default
};
