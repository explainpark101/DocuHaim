import { j as e } from "./vendor-react-ChQ1w2We.js";
import { D as t } from "./vendor-tiptap-CEo_3qRU.js";
import { G as i } from "./vendor-lucide-BB1m8XvN.js";
import "./vendor-radix-BQ9XceqC.js";
import "./vendor-aws-DKtg11UV.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-C3cP4Xc_.js";
import "./vendor-codemirror-CohftLwi.js";
function u({ editor: r, onDraggingChange: a }) {
  return !r || r.isDestroyed ? null : e.jsx(t, { editor: r, className: "haim-drag-handle", onElementDragStart: () => a == null ? void 0 : a(true), onElementDragEnd: () => a == null ? void 0 : a(false), children: e.jsx("div", { role: "button", tabIndex: -1, "aria-label": "\uBE14\uB85D \uB4DC\uB798\uADF8", className: "haim-drag-handle__grip flex h-7 w-6 cursor-grab items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 active:cursor-grabbing dark:hover:bg-odp-bgSoft dark:hover:text-odp-fg", children: e.jsx(i, { size: 14, "aria-hidden": true }) }) });
}
export {
  u as default
};
