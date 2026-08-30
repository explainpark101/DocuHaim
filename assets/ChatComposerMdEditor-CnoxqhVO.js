import { r as a, j as o } from "./vendor-react-BFxggocB.js";
import { c as d, v as m, K as n } from "./vendor-md-editor-DBlhBmzQ.js";
import { M as p } from "./MdEditorToolbarTooltips-DwBnOyDa.js";
import { M as u } from "./index-C9Mh46Eg.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-DqPs8f15.js";
import "./vendor-aws-DgBsOJ1a.js";
import "./vendor-lucide-C2HsvpdI.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-DGp6lEvQ.js";
m({ editorConfig: { languageUserDefined: { "ko-KR": n } } });
const c = ["bold", "underline", "italic", "-", "strikeThrough", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", "-", "revoke", "next"];
function T({ value: t, onChange: i, theme: s, showToolbar: e = true, onUploadImg: l }) {
  const r = a.useRef(null);
  return o.jsxs("div", { ref: r, className: "relative h-full w-full", children: [o.jsx(d, { editorId: "chat-with-myself-composer", modelValue: t, onChange: i, theme: s, language: "ko-KR", customIcon: u, preview: false, toolbars: e ? c : [], footers: [], placeholder: "\uBA54\uC2DC\uC9C0 \uC785\uB825\u2026", style: { height: "100%" }, onUploadImg: l }), e ? o.jsx(p, { containerRef: r }) : null] });
}
export {
  T as default
};
