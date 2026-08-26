import { j as e } from "./vendor-react-kfkzeLNk.js";
function s({ checked: t = false, onChange: o, isDark: a = false, className: r = "" }) {
  return e.jsxs("label", { className: `inline-flex items-center gap-1.5 shrink-0 cursor-pointer select-none ${r}`, title: t ? "\uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uC81C\uBAA9 \uB9D0\uC904\uC784(...)", children: [e.jsx("span", { className: `text-[10px] font-medium leading-none ${a ? "text-odp-muted" : "text-gray-500"}`, children: "\uBAA9\uCC28\uC81C\uBAA9 \uC904\uBC14\uAFC8" }), e.jsx("button", { type: "button", role: "switch", "aria-checked": t, "aria-label": "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8", onClick: (n) => {
    n.preventDefault(), n.stopPropagation(), o == null ? void 0 : o(!t);
  }, className: ["relative h-4 w-7 rounded-full transition-colors touch-manipulation", t ? "bg-blue-600 dark:bg-blue-500" : a ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: e.jsx("span", { className: ["absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform", t ? "translate-x-3" : "translate-x-0"].join(" "), "aria-hidden": true }) })] });
}
export {
  s as T
};
