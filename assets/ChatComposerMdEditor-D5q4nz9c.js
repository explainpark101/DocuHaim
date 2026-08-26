import { r as a, j as o } from "./vendor-react-kfkzeLNk.js";
import { c as m, v as d, K as n } from "./vendor-md-editor-DQ2k84v8.js";
import { M as p } from "./MdEditorToolbarTooltips-SJea2KfE.js";
import { M as u } from "./useLazyMermaidRender-0X9iJIqW.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-CyZ5tkEq.js";
import "./vendor-aws-DjU81Y0s.js";
import "./index-siMg0SyX.js";
import "./vendor-lucide-B9iB2q4-.js";
import "./vendor-zip-Bez6qchM.js";
d({ editorConfig: { languageUserDefined: { "ko-KR": n } } });
const c = ["bold", "underline", "italic", "-", "strikeThrough", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", "-", "revoke", "next"];
function _({ value: t, onChange: i, theme: s, showToolbar: e = true, onUploadImg: l }) {
  const r = a.useRef(null);
  return o.jsxs("div", { ref: r, className: "relative h-full w-full", children: [o.jsx(m, { editorId: "chat-with-myself-composer", modelValue: t, onChange: i, theme: s, language: "ko-KR", customIcon: u, preview: false, toolbars: e ? c : [], footers: [], placeholder: "\uBA54\uC2DC\uC9C0 \uC785\uB825\u2026", style: { height: "100%" }, onUploadImg: l }), e ? o.jsx(p, { containerRef: r }) : null] });
}
export {
  _ as default
};
