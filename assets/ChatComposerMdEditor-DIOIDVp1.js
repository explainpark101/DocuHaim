import { r as a, j as o } from "./vendor-react-BFxggocB.js";
import { c as d, v as m, K as n } from "./vendor-md-editor-DBPLPxUW.js";
import { M as p } from "./MdEditorToolbarTooltips-p8-wIBRL.js";
import { M as u } from "./index-B8fyV1rt.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-OEelIWXf.js";
import "./vendor-aws-DPoimvIa.js";
import "./vendor-lucide-CQHxb_M7.js";
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
