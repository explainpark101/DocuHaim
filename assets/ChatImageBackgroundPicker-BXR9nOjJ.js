import { r as S, j as r } from "./vendor-react-BDjpSibw.js";
import { t as E, O as $ } from "./index-De3wkM3r.js";
import { n as h, c as O, C as g } from "./index-CCnkqbfe.js";
import { R, T, P as _, C as H } from "./vendor-radix-DuLpLUUM.js";
const p = [{ id: "none", label: "\uC5C6\uC74C", value: null }, { id: "white", label: "\uD770\uC0C9", value: "#ffffff", swatch: "#ffffff" }, { id: "black", label: "\uAC80\uC815", value: "#000000", swatch: "#000000" }, { id: "gray", label: "\uD68C\uC0C9", value: "#e5e7eb", swatch: "#e5e7eb" }], P = "data-chat-color-picker";
function D({ value: f = null, onChange: n, compact: m = false, label: w = "\uBC30\uACBD\uC0C9", className: k = "", tone: v = "light", allowNone: j = true, noneLabel: C = "\uC5C6\uC74C" }) {
  const [s, d] = S.useState(false), a = h(f), l = O(a), i = j ? p : p.filter((e) => e.value != null), t = v === "dark", y = t ? "text-white/80" : "text-gray-600 dark:text-gray-300", c = m ? "h-7 min-w-7 px-1.5 text-[10px]" : "h-8 min-w-8 px-2 text-[11px]", b = t ? "border-white/25 text-white/80 hover:bg-white/10" : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-gray-300 dark:hover:bg-odp-focusBg", u = t ? "border-white bg-white/15 text-white" : "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200", N = !!a && !i.some((e) => e.value === a), x = (e) => {
    const o = h(e.startsWith("#") ? e : `#${e}`);
    o && (n == null ? void 0 : n(o));
  };
  return r.jsxs("div", { className: `flex flex-wrap items-center gap-1.5 ${k}`, children: [r.jsx("span", { className: `shrink-0 text-[11px] ${y}`, children: w }), i.map((e) => {
    const o = e.value == null ? !a : a === e.value;
    return r.jsxs("button", { type: "button", className: `${c} inline-flex items-center justify-center gap-1 rounded-md border ${o ? u : b}`, onClick: () => {
      d(false), n == null ? void 0 : n(e.value);
    }, "aria-pressed": o, children: [e.swatch ? r.jsx("span", { className: "h-3 w-3 rounded-sm border border-black/20", style: { backgroundColor: e.swatch } }) : r.jsx("span", { className: "h-3 w-3 rounded-sm border border-black/20", style: g }), e.value == null ? C : e.label] }, e.id);
  }), r.jsxs(R, { open: s, onOpenChange: d, modal: true, children: [r.jsx(T, { asChild: true, children: r.jsxs("button", { type: "button", className: `${c} inline-flex items-center justify-center gap-1 rounded-md border ${N || s ? u : b}`, "aria-label": "\uBC30\uACBD\uC0C9 \uC9C1\uC811 \uC120\uD0DD", "aria-expanded": s, children: [r.jsxs("span", { className: "relative h-3 w-3 overflow-hidden rounded-sm border border-black/20", children: [r.jsx("span", { "aria-hidden": true, className: "absolute inset-0", style: g }), r.jsx("span", { "aria-hidden": true, className: "absolute inset-0", style: { backgroundColor: l } })] }), "\uC9C1\uC811"] }) }), r.jsx(_, { children: r.jsxs(H, { [P]: "", side: "top", align: "start", sideOffset: 8, collisionPadding: 12, className: `z-[400] w-[13.5rem] rounded-xl border p-2.5 shadow-xl outline-none ${t ? "border-white/15 bg-[#1a2333] text-white" : "border-gray-200 bg-white text-gray-800 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg"}`, onOpenAutoFocus: (e) => e.preventDefault(), children: [r.jsx("div", { className: "[&_.react-colorful]:h-40 [&_.react-colorful]:w-full", children: r.jsx(E, { color: l, onChange: x }) }), r.jsx($, { color: l, onChange: x, prefixed: true, alpha: true, "aria-label": "HEX \uC0C9\uC0C1", className: `mt-2 w-full rounded-md border px-2 py-1 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${t ? "border-white/20 bg-black/30 text-white" : "border-gray-300 bg-transparent dark:border-odp-borderStrong dark:text-odp-fgStrong"}` })] }) })] })] });
}
export {
  P as C,
  D as a
};
