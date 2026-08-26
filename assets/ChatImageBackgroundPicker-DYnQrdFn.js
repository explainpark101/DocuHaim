import { r as N, j as t } from "./vendor-react-kfkzeLNk.js";
import { t as E, O } from "./index-DKf8xmDw.js";
import { n as h, o as $, p } from "./index-siMg0SyX.js";
import { h as I, i as T, j as _, k as z } from "./vendor-radix-CyZ5tkEq.js";
const P = "inline-flex max-w-full items-center justify-between gap-1 rounded-md border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-surface px-2 py-1 text-sm text-gray-800 dark:text-odp-fgStrong outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50", M = "z-100010 max-h-[min(280px,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", F = "relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-focusBg", K = "z-[220] min-w-[160px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", L = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-focusBg", X = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", V = "fixed inset-0 z-[200] bg-black/40", W = "fixed left-1/2 top-1/2 z-[201] w-[min(92vw,360px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft", Y = "w-full rounded-md border border-gray-300 bg-transparent px-2 py-1.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:text-odp-fgStrong", x = [{ id: "none", label: "\uC5C6\uC74C", value: null }, { id: "white", label: "\uD770\uC0C9", value: "#ffffff", swatch: "#ffffff" }, { id: "black", label: "\uAC80\uC815", value: "#000000", swatch: "#000000" }, { id: "gray", label: "\uD68C\uC0C9", value: "#e5e7eb", swatch: "#e5e7eb" }], H = "data-chat-color-picker";
function q({ value: f = null, onChange: n, compact: m = false, label: w = "\uBC30\uACBD\uC0C9", className: k = "", tone: y = "light", allowNone: v = true, noneLabel: C = "\uC5C6\uC74C" }) {
  const [d, l] = N.useState(false), r = h(f), s = $(r), i = v ? x : x.filter((e) => e.value != null), a = y === "dark", S = a ? "text-white/80" : "text-gray-600 dark:text-gray-300", c = m ? "h-7 min-w-7 px-1.5 text-[10px]" : "h-8 min-w-8 px-2 text-[11px]", b = a ? "border-white/25 text-white/80 hover:bg-white/10" : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-gray-300 dark:hover:bg-odp-focusBg", g = a ? "border-white bg-white/15 text-white" : "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200", j = !!r && !i.some((e) => e.value === r), u = (e) => {
    const o = h(e.startsWith("#") ? e : `#${e}`);
    o && (n == null ? void 0 : n(o));
  };
  return t.jsxs("div", { className: `flex flex-wrap items-center gap-1.5 ${k}`, children: [t.jsx("span", { className: `shrink-0 text-[11px] ${S}`, children: w }), i.map((e) => {
    const o = e.value == null ? !r : r === e.value;
    return t.jsxs("button", { type: "button", className: `${c} inline-flex items-center justify-center gap-1 rounded-md border ${o ? g : b}`, onClick: () => {
      l(false), n == null ? void 0 : n(e.value);
    }, "aria-pressed": o, children: [e.swatch ? t.jsx("span", { className: "h-3 w-3 rounded-sm border border-black/20", style: { backgroundColor: e.swatch } }) : t.jsx("span", { className: "h-3 w-3 rounded-sm border border-black/20", style: p }), e.value == null ? C : e.label] }, e.id);
  }), t.jsxs(I, { open: d, onOpenChange: l, modal: true, children: [t.jsx(T, { asChild: true, children: t.jsxs("button", { type: "button", className: `${c} inline-flex items-center justify-center gap-1 rounded-md border ${j || d ? g : b}`, "aria-label": "\uBC30\uACBD\uC0C9 \uC9C1\uC811 \uC120\uD0DD", "aria-expanded": d, children: [t.jsxs("span", { className: "relative h-3 w-3 overflow-hidden rounded-sm border border-black/20", children: [t.jsx("span", { "aria-hidden": true, className: "absolute inset-0", style: p }), t.jsx("span", { "aria-hidden": true, className: "absolute inset-0", style: { backgroundColor: s } })] }), "\uC9C1\uC811"] }) }), t.jsx(_, { children: t.jsxs(z, { [H]: "", side: "top", align: "start", sideOffset: 8, collisionPadding: 12, className: `z-[400] w-[13.5rem] rounded-xl border p-2.5 shadow-xl outline-none ${a ? "border-white/15 bg-[#1a2333] text-white" : "border-gray-200 bg-white text-gray-800 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg"}`, onOpenAutoFocus: (e) => e.preventDefault(), children: [t.jsx("div", { className: "[&_.react-colorful]:h-40 [&_.react-colorful]:w-full", children: t.jsx(E, { color: s, onChange: u }) }), t.jsx(O, { color: s, onChange: u, prefixed: true, alpha: true, "aria-label": "HEX \uC0C9\uC0C1", className: `mt-2 w-full rounded-md border px-2 py-1 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${a ? "border-white/20 bg-black/30 text-white" : "border-gray-300 bg-transparent dark:border-odp-borderStrong dark:text-odp-fgStrong"}` })] }) })] })] });
}
export {
  H as C,
  L as a,
  X as b,
  K as c,
  q as d,
  P as e,
  M as f,
  F as g,
  V as h,
  W as i,
  Y as j
};
