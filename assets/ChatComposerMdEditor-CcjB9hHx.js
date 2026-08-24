import { r as a, j as o } from "./vendor-react-SY5QCjFA.js";
import { P as m, v as d, K as n } from "./vendor-md-editor-D4hOzNKK.js";
import { M as p } from "./MdEditorToolbarTooltips-BIS5YQnD.js";
import { M as u } from "./useLazyMermaidRender-CWmT5pEt.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-radix-BgY9OwZN.js";
import "./vendor-aws-bxAUTq4h.js";
import "./index-BGi2DbIx.js";
import "./vendor-lucide-DyPOSMSJ.js";
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
