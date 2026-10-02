import { r as s, j as e } from "./vendor-react-BDjpSibw.js";
import { Z as N } from "./index-IR2VeToL.js";
import { b as L } from "./SettingsCollapsibleHeading-sNq0Tj6k.js";
import { k as v, x as S, L as h, y as C, i as E, D as z } from "./vendor-lucide-Cix55NOo.js";
import { g as u, L as f, s as D } from "./localLlmModelAliases-EglLH-3U.js";
const A = 256;
function T({ title: t, subtitle: o, lines: a, emptyHint: c, open: r, onOpenChange: x, onClear: i, clearDisabled: n = false, headerExtra: d, beforeLog: b, className: j = "" }) {
  const p = s.useRef(null), m = s.useRef(true), k = s.useCallback((l) => {
    const g = p.current;
    if (!g) return;
    const w = g.scrollSize, y = g.viewportSize;
    m.current = w - l - y < 24;
  }, []);
  return s.useEffect(() => {
    var _a;
    !r || a.length === 0 || !m.current || ((_a = p.current) == null ? void 0 : _a.scrollToIndex(a.length - 1, { align: "end" }));
  }, [a, r]), e.jsxs("div", { className: ["overflow-hidden rounded border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft/40", j].filter(Boolean).join(" "), children: [e.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-x-2 gap-y-1 border-b border-gray-100 px-2.5 py-2 dark:border-odp-borderSoft", children: [e.jsxs("button", { type: "button", onClick: () => x(!r), "aria-expanded": r, className: "flex min-w-0 flex-1 items-start gap-1.5 text-left", children: [r ? e.jsx(v, { size: 14, className: "mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted" }) : e.jsx(S, { size: 14, className: "mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted" }), e.jsxs("span", { className: "min-w-0", children: [e.jsx("span", { className: "block text-[11px] font-semibold text-gray-700 dark:text-odp-fg", children: t }), o ? e.jsx("span", { className: "mt-0.5 block truncate text-[10px] text-gray-500 dark:text-odp-muted", children: o }) : null] })] }), e.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [d, i ? e.jsx("button", { type: "button", disabled: n || a.length === 0, onClick: () => {
    i(), m.current = true;
  }, className: "rounded border border-gray-200 px-2 py-0.5 text-[10px] text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: "Clear" }) : null] })] }), e.jsx(L, { open: r, contentKey: t, children: e.jsxs("div", { className: "space-y-2 p-2.5", children: [b, a.length === 0 ? e.jsx("p", { className: "font-mono text-[10px] text-gray-400 dark:text-odp-muted", children: c }) : e.jsx(N, { ref: p, className: "overscroll-contain rounded border border-gray-200 bg-gray-950/95 px-2.5 py-1.5 font-mono text-[10px] leading-relaxed text-emerald-100 dark:border-odp-borderStrong", style: { height: A }, data: a, onScroll: k, "aria-live": "polite", "aria-relevant": "additions", children: (l) => e.jsx("div", { className: ["whitespace-pre-wrap break-all", l.text.startsWith("[error]") ? "text-red-300" : ""].filter(Boolean).join(" "), children: l.text }, l.id) })] }) })] });
}
function I({ scope: t, modelId: o, disabled: a = false, className: c = "" }) {
  const r = o.trim(), [x, i] = s.useState(() => u(t, r));
  return s.useEffect(() => {
    i(u(t, r));
  }, [t, r]), s.useEffect(() => {
    const n = () => i(u(t, r));
    return window.addEventListener(f, n), () => window.removeEventListener(f, n);
  }, [t, r]), r ? e.jsx("input", { type: "text", value: x, disabled: a, placeholder: "\uBCC4\uCE6D (\uB85C\uCEEC)", "aria-label": `\uBAA8\uB378 \uBCC4\uCE6D: ${r}`, onClick: (n) => n.stopPropagation(), onPointerDown: (n) => n.stopPropagation(), onChange: (n) => {
    const d = n.target.value;
    i(d), D(t, r, d);
  }, className: ["mt-1 w-full rounded border border-gray-200 bg-white px-1.5 py-1 text-[11px] text-gray-700", "placeholder:text-gray-400 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:placeholder:text-odp-muted", c].filter(Boolean).join(" ") }) : null;
}
function V({ mode: t, progressLabel: o = "", paste: a = false }) {
  return t === "aborting" ? e.jsxs("span", { className: "inline-flex min-w-0 items-center gap-2 transition-none", children: [e.jsx(h, { size: 14, className: "shrink-0 animate-spin", "aria-hidden": true }), e.jsx("span", { children: "Aborting\u2026" })] }) : t === "downloading" ? e.jsxs("span", { className: "inline-flex min-w-0 items-center gap-2 transition-none", children: [e.jsx(h, { size: 14, className: "shrink-0 animate-spin", "aria-hidden": true }), e.jsx("span", { className: "truncate", children: o || "Downloading\u2026" })] }) : t === "downloaded" ? e.jsxs("span", { className: "inline-flex min-w-0 items-center gap-2 transition-none", children: [e.jsx(C, { size: 14, className: "shrink-0", "aria-hidden": true }), e.jsx("span", { children: "Downloaded" })] }) : e.jsxs("span", { className: "inline-flex min-w-0 items-center gap-2 transition-none", children: [a ? e.jsx(E, { size: 14, className: "shrink-0", "aria-hidden": true }) : e.jsx(z, { size: 14, className: "shrink-0", "aria-hidden": true }), e.jsx("span", { children: "Download" })] });
}
export {
  I as L,
  V as M,
  T as a
};
