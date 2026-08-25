import { r as a, j as o } from "./vendor-react-SY5QCjFA.js";
import { P as m, v as d, K as n } from "./vendor-md-editor-CyUZNHY0.js";
import { M as p } from "./MdEditorToolbarTooltips-DhAcDm1s.js";
import { M as u } from "./useLazyMermaidRender-CN0M9QtN.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-radix-Do7C1uSR.js";
import "./vendor-aws-BNw5jQBi.js";
import "./index-B7Eblbsj.js";
import "./vendor-lucide-BWX_GyjE.js";
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
