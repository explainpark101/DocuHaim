var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as m, j as t, c as Qe } from "./vendor-react-BDjpSibw.js";
import { A as Ze, m as Je, a as U } from "./vendor-motion-Dw-WnPM7.js";
import { p as we, s as et, a as tt } from "./taskCheckboxStatus-DlXLsCJg.js";
import { aq as rt, H as st, T as at, el as Q, em as ot, ah as _, en as nt, eo as Z, I as J, ep as lt, b6 as it, eq as dt, eh as ee, c as ct, n as P, C as te, er as re, es as se, et as ut, eu as ft, aO as mt, ev as xt, ew as ht, ex as gt, ey as pt, ez as bt, eA as yt, eB as vt } from "./index-d5XqtiFz.js";
import { aB as jt, g as ae, aC as T, aD as R, aE as kt, n as Nt, aF as Se, j as wt, k as Ce, aG as oe, X as W, y as G, aH as St, L as Ct } from "./vendor-lucide-Cix55NOo.js";
import { h as Et, b as B, d as K, y as Mt, z as It, B as At, D as Ft, E as Lt, G as Dt, H as _t, K as Pt, a2 as Tt, M as Rt, S as Bt, g as Kt, i as ne, j as le, k as ie, l as de, A as ce } from "./vendor-radix-DuLpLUUM.js";
import { N as $t } from "./WikiImageSizeModal-7rcyeSK7.js";
import { t as zt, O as Ht } from "./index-De3wkM3r.js";
import { C as V, g as Ee, E as q, S as Me, D as ue, W as Ot, G as Ie, I as L, J as C, K as Ae, L as X, V as Fe, M as Le, P as De, k as _e, N as Ut, y as Wt, O as Gt, Q as Vt, T as qt } from "./vendor-codemirror-0YdHorwW.js";
import { m as Pe } from "./appMarkdownItPlugins-DEizoqTW.js";
import { C as Xt } from "./TableEditModal-sPET7LSz.js";
import { t as Yt, a as Qt, b as Zt, c as Jt, d as er, e as tr, f as rr, g as sr, i as fe, w as ar, j as or } from "./mdEditorSelectionWrap-R1Bj9Klg.js";
function nr(e) {
  const r = String(e ?? "").split(`
`), s = [];
  let a = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, o = 0, n = 0;
  r.forEach((u, c) => {
    var _a;
    const p = u.match(/^(#{1,6})\s+(.*)/);
    if (p) {
      (a.tasks.length > 0 || a.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && s.push(a), a = { name: (p[2] ?? "").trim(), tasks: [] };
      return;
    }
    const x = u.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX~])\]\s+(.*)/);
    if (x) {
      const k = Math.floor((((_a = x[1]) == null ? void 0 : _a.length) ?? 0) / 2), v = we(x[3]), w = v === "done", N = (x[4] ?? "").trim();
      o += 1, w && (n += 1), a.tasks.push({ id: `line-${c}`, lineIndex: c, indent: k, completed: w, status: v, text: N, rawLine: u });
    }
  }), a.tasks.length > 0 && s.push(a);
  const d = o > 0 ? Math.round(n / o * 100) : 0;
  return { categories: s, totalTasks: o, completedTasks: n, pendingTasks: o - n, percentage: d };
}
function lr(e, r) {
  const s = String(e ?? "").split(`
`);
  if (r < 0 || r >= s.length) return e;
  const o = (s[r] ?? "").match(/^(\s*(?:[-*]|\d+\.)\s+)\[([ xX~])\](.*)$/);
  if (!o) return e;
  const n = rt(e), d = et(tt(we(o[2]), n), n);
  return s[r] = `${o[1]}[${d}]${o[3] ?? ""}`, s.join(`
`);
}
function ir({ markdown: e = "", onMarkdownChange: r }) {
  const [s, a] = m.useState(""), [o, n] = m.useState("all"), [d, u] = m.useState({}), [c, p] = m.useState("dashboard"), x = m.useMemo(() => nr(e), [e]), k = m.useMemo(() => x.categories.map((f) => f.name).join("\0"), [x.categories]);
  m.useEffect(() => {
    const f = {};
    for (const b of k ? k.split("\0") : []) b && (f[b] = true);
    u(f);
  }, [k]);
  const v = (f) => {
    typeof r == "function" && r(lr(e, f));
  }, w = (f) => {
    u((b) => ({ ...b, [f]: !b[f] }));
  }, N = (f) => {
    const b = f.text.toLowerCase().includes(s.toLowerCase()), y = o === "all" ? true : o === "completed" ? f.completed : !f.completed;
    return b && y;
  };
  return t.jsxs("div", { className: "@container space-y-3 text-xs text-slate-100", children: [t.jsxs("div", { className: "grid grid-cols-2 gap-2 @[380px]:grid-cols-4", children: [t.jsxs("div", { className: "relative min-h-19 overflow-hidden rounded-xl border border-indigo-500/30 bg-linear-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [t.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: t.jsx(jt, { className: "h-14 w-14 text-indigo-400 @[380px]:h-16 @[380px]:w-16" }) }), t.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), t.jsx("div", { className: "my-1 flex items-baseline gap-1", children: t.jsxs("span", { className: "text-2xl font-extrabold text-white @[380px]:text-3xl", children: [x.percentage, "%"] }) }), t.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: t.jsx("div", { className: "h-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${x.percentage}%` } }) })] }), t.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [t.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [t.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), t.jsx(ae, { className: "h-3.5 w-3.5 text-slate-500" })] }), t.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [x.totalTasks, " ", t.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), t.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [t.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [t.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), t.jsx(T, { className: "h-3.5 w-3.5" })] }), t.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [x.completedTasks, " ", t.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), t.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [t.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [t.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), t.jsx(R, { className: "h-3.5 w-3.5" })] }), t.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [x.pendingTasks, " ", t.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), t.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [t.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [t.jsxs("button", { type: "button", onClick: () => p("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${c === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [t.jsx(kt, { className: "h-3 w-3" }), t.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), t.jsxs("button", { type: "button", onClick: () => p("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${c === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [t.jsx(ae, { className: "h-3 w-3" }), t.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), t.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [t.jsxs("div", { className: "relative min-w-30 flex-1", children: [t.jsx(Nt, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), t.jsx("input", { type: "text", value: s, onChange: (f) => a(f.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), t.jsxs("select", { value: o, onChange: (f) => n(f.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [t.jsx("option", { value: "all", children: "\uC804\uCCB4" }), t.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), t.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), c === "dashboard" && t.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: x.categories.length === 0 ? t.jsxs("div", { className: "py-8 text-center text-slate-500", children: [t.jsx(Se, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), t.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), t.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : x.categories.map((f, b) => {
    const y = f.tasks.length, j = f.tasks.filter((h) => h.completed).length, S = y > 0 ? Math.round(j / y * 100) : 0, i = !!d[f.name], l = f.tasks.filter(N);
    return s && l.length === 0 ? null : t.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [t.jsxs("button", { type: "button", onClick: () => w(f.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-slate-500", children: i ? t.jsx(wt, { className: "h-3.5 w-3.5" }) : t.jsx(Ce, { className: "h-3.5 w-3.5" }) }), t.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: f.name })] }), t.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [t.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [t.jsx("strong", { className: "text-slate-200", children: j }), " /", " ", y] }), t.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${S === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [S, "%"] })] })] }), i ? t.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: l.length === 0 ? t.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : l.map((h) => t.jsxs("button", { type: "button", onClick: () => v(h.lineIndex), style: { paddingLeft: `${h.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [t.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: h.completed ? t.jsx(T, { className: "h-3.5 w-3.5 text-emerald-400" }) : h.status === "doing" ? t.jsx(oe, { className: "h-3.5 w-3.5 text-amber-400" }) : t.jsx(R, { className: "h-3.5 w-3.5 text-slate-600" }) }), t.jsx("span", { className: `leading-relaxed ${h.completed ? "text-slate-500 line-through" : h.status === "doing" ? "text-amber-200/90" : "text-slate-300"}`, children: h.text })] }, h.id)) }) : null] }, `${f.name}-${b}`);
  }) }), c === "checklist" ? t.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: x.categories.map((f, b) => {
    const y = f.tasks.filter(N);
    return y.length === 0 ? null : t.jsxs("div", { className: "space-y-1", children: [t.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [f.name, " (", y.length, ")"] }), y.map((j) => t.jsxs("button", { type: "button", onClick: () => v(j.lineIndex), style: { paddingLeft: `${j.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [t.jsx("span", { className: "mt-0.5 shrink-0", children: j.completed ? t.jsx(T, { className: "h-3.5 w-3.5 text-emerald-400" }) : j.status === "doing" ? t.jsx(oe, { className: "h-3.5 w-3.5 text-amber-400" }) : t.jsx(R, { className: "h-3.5 w-3.5 text-slate-600" }) }), t.jsx("span", { className: `leading-relaxed ${j.completed ? "text-slate-500 line-through" : j.status === "doing" ? "text-amber-200/90" : "text-slate-200"}`, children: j.text })] }, j.id))] }, `${f.name}-list-${b}`);
  }) }) : null] })] });
}
const dr = at, cr = "s3haim_checklist_progress_sidebar_width", ur = 360, fr = 260, mr = 560, xr = [0.32, 0.72, 0, 1], hr = { type: "spring", stiffness: 420, damping: 36, mass: 0.85 };
function fs({ open: e, onOpenChange: r, markdown: s, onMarkdownChange: a, overlay: o = false }) {
  const { width: n, isResizing: d, handleProps: u } = st({ storageKey: cr, defaultWidth: ur, minWidth: fr, maxWidth: mr, edge: "right", collapseBelowWidth: 180, onCollapseBelowMin: () => r == null ? void 0 : r(false) }), c = o ? ["absolute inset-y-0 right-0 z-30 flex flex-col overflow-hidden", "rounded-bl-md border border-slate-200/80 border-t-0 bg-white/95 shadow-lg", "dark:border-odp-borderStrong/80 dark:bg-odp-surface/95 dark:shadow-black/40"].join(" ") : "relative flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-300 bg-white/95 dark:border-odp-borderStrong dark:bg-odp-surface/95", p = () => r == null ? void 0 : r(false);
  return t.jsx(Ze, { initial: false, children: e ? t.jsx(Je.aside, { role: "complementary", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", className: c, style: o ? { width: n, willChange: "transform, opacity" } : { overflow: "hidden", willChange: "width, opacity" }, initial: o ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, animate: o ? { x: 0, opacity: 1 } : { width: n, opacity: 1 }, exit: o ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, transition: d ? { duration: 0 } : o ? { type: "tween", duration: 0.22, ease: xr } : hr, children: t.jsxs("div", { className: "relative flex h-full min-h-0 w-full flex-col", style: o ? void 0 : { width: n }, children: [t.jsx(dr, { edge: "left", handleProps: u, isResizing: d, visibleOnHover: true, label: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-2.5 py-2 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong", children: [t.jsx(Se, { size: 14, className: "shrink-0 text-indigo-500 dark:text-indigo-300", "aria-hidden": true }), t.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), t.jsx("button", { type: "button", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB2EB\uAE30", onClick: p, className: "inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: t.jsx(W, { size: 14 }) })] }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-2.5", children: String(s ?? "").trim() ? t.jsx(ir, { markdown: s, onMarkdownChange: a }) : t.jsxs("p", { className: "rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted", children: ["\uBB38\uC11C\uC5D0 \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", t.jsx("br", {}), "`- [ ]` \uD56D\uBAA9\uC744 \uCD94\uAC00\uD574 \uBCF4\uC138\uC694."] }) })] }) }, o ? "checklist-overlay" : "checklist-dock") : null });
}
const gr = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], pr = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], br = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], yr = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), vr = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", me = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function ms({ isOpen: e, markdown: r, selectedMarkdown: s = "", onClose: a, onApply: o }) {
  const n = s.length > 0, [d, u] = m.useState("document"), [c, p] = m.useState(1), [x, k] = m.useState(false), [v, w] = m.useState("nested"), [N, f] = m.useState(1), b = d === "selection" ? s : r;
  m.useEffect(() => {
    if (!e) return;
    const i = n ? "selection" : "document";
    u(i), p(Q(i === "selection" ? s : r)), k(false), w("nested"), f(1);
  }, [e, r, s, n]), m.useEffect(() => {
    if (!e) return;
    const i = (g) => {
      const M = g;
      return (M == null ? void 0 : M.closest) ? !!M.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, l = () => {
      const g = document.activeElement;
      g && i(g) && typeof g.blur == "function" && g.blur();
    };
    l();
    const h = (g) => {
      if (g.metaKey || g.ctrlKey || g.altKey) return;
      const M = g.key;
      if (M >= "1" && M <= "9") {
        const Y = Number(M);
        Z(Y) && (g.preventDefault(), g.stopPropagation(), g.stopImmediatePropagation(), p(Y));
        return;
      }
      g.key === "Escape" || g.key === "Enter" || i(g.target) && (g.preventDefault(), g.stopPropagation(), g.stopImmediatePropagation(), l());
    };
    return window.addEventListener("keydown", h, true), () => window.removeEventListener("keydown", h, true);
  }, [e]);
  const y = m.useMemo(() => ot(b, c, { maxLevel: ee, renumberOutline: x, outlineStyle: v, outlineStart: N }), [b, c, x, v, N]), j = (i) => {
    if (i !== "selection" && i !== "document" || i === "selection" && !n) return;
    u(i), p(Q(i === "selection" ? s : r));
  }, S = () => {
    if (!y.sourceMax) return;
    const i = dt(b, c, { maxLevel: ee, renumberOutline: x, outlineStyle: v, outlineStart: N });
    i !== b && o(i, d), a();
  };
  return t.jsx(_, { isOpen: e, onClose: a, onConfirm: S, contentClassName: "max-w-3xl", children: t.jsx(Et, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [t.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), t.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), t.jsxs("div", { className: "mt-4", children: [t.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), t.jsx(B, { className: "flex items-center gap-2", value: d, onValueChange: j, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: gr.map((i) => {
    const l = d === i.value, h = i.value === "selection" && !n;
    return t.jsx(K, { value: i.value, disabled: h, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", l ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: t.jsxs("div", { className: l ? "" : "opacity-50", children: [t.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: i.title }), t.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: i.value === "selection" && !n ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : i.description })] }) }, i.value);
  }) })] }), t.jsxs("div", { className: "mt-4", children: [t.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), t.jsxs(Mt, { value: String(c), onValueChange: (i) => {
    const l = Number(i);
    Z(l) && p(l);
  }, children: [t.jsxs(It, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [t.jsx(At, {}), t.jsx(Ft, { className: "text-gray-500", children: t.jsx(Ce, { size: 14 }) })] }), t.jsx(Lt, { children: t.jsx(Dt, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(_t, { className: "p-1", children: nt.map((i) => t.jsxs(Pt, { value: String(i), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Tt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(G, { size: 12 }) }), t.jsx(Rt, { children: `h${i}` })] }, i)) }) }) })] })] }), t.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center justify-between gap-3", children: [t.jsxs("div", { className: "min-w-0", children: [t.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), t.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), t.jsx(Bt, { className: yr(x), checked: x, onCheckedChange: k, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: t.jsx(Kt, { className: vr }) })] }), x ? t.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [t.jsxs("div", { children: [t.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), t.jsx(B, { className: "flex items-center gap-2", value: v, onValueChange: (i) => {
    (i === "flat" || i === "nested") && w(i);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: pr.map((i) => {
    const l = v === i.value;
    return t.jsx(K, { value: i.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", l ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: t.jsxs("div", { className: l ? "" : "opacity-50", children: [t.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: i.title }), t.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: i.description })] }) }, i.value);
  }) })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), t.jsx(B, { className: "flex items-center gap-2", value: String(N), onValueChange: (i) => {
    i === "1" && f(1), i === "2" && f(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: br.map((i) => {
    const l = N === i.value;
    return t.jsx(K, { value: String(i.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", l ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: t.jsxs("div", { className: l ? "" : "opacity-50", children: [t.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: i.title }), t.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: i.description })] }) }, i.value);
  }) })] })] }) : null] }), t.jsx("div", { className: "mt-4 min-h-0", children: y.rows.length ? t.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: t.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [t.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: t.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [t.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), t.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), t.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), t.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), t.jsx("tbody", { children: y.rows.map((i, l) => t.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [t.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: t.jsxs(ne, { children: [t.jsx(le, { asChild: true, children: t.jsx("span", { className: "block truncate", children: i.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), t.jsx(ie, { children: t.jsxs(de, { side: "top", sideOffset: 6, className: me, children: [i.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", t.jsx(ce, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), t.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: t.jsxs(ne, { children: [t.jsx(le, { asChild: true, children: t.jsx("span", { className: "block truncate", children: i.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), t.jsx(ie, { children: t.jsxs(de, { side: "top", sideOffset: 6, className: me, children: [i.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", t.jsx(ce, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), t.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", i.from] }), t.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", i.to] })] }, `${i.from}-${l}-${i.text}`)) })] }) }) : t.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: d === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), t.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [t.jsxs(J, { type: "button", variant: "secondary", size: "md", onClick: a, children: [t.jsx(lt, { size: 16 }), "\uCDE8\uC18C"] }), t.jsxs(J, { type: "button", variant: "primary", size: "md", onClick: S, disabled: !y.sourceMax, children: [t.jsx(it, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function xs({ isOpen: e, onClose: r, onConfirm: s }) {
  const [a, o] = m.useState(""), [n, d] = m.useState(""), [u, c] = m.useState("");
  m.useEffect(() => {
    e && (o(""), d(""), c(""));
  }, [e]);
  const p = () => {
    const x = n.trim();
    if (!x) {
      c("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    s({ desc: a.trim(), url: x }), r();
  };
  return t.jsx(_, { isOpen: e, onClose: r, onConfirm: p, ignoreEnterInFields: true, children: t.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [t.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), t.jsx("input", { type: "text", value: a, onChange: (x) => o(x.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), t.jsx("input", { type: "text", value: n, onChange: (x) => d(x.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? t.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, t.jsxs("div", { className: "flex justify-end gap-2", children: [t.jsxs("button", { type: "button", onClick: r, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [t.jsx(W, { size: 16 }), "\uCDE8\uC18C"] }), t.jsxs("button", { type: "button", onClick: p, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [t.jsx(G, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function hs({ isOpen: e, file: r, onClose: s, onConfirm: a }) {
  const [o, n] = m.useState("");
  return m.useEffect(() => {
    if (!e || !r) {
      n("");
      return;
    }
    const d = URL.createObjectURL(r);
    return n(d), () => {
      URL.revokeObjectURL(d);
    };
  }, [e, r]), t.jsx(_, { isOpen: e && !!r, onClose: s, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: o ? t.jsx($t, { imageSrc: o, ...(r == null ? void 0 : r.name) ? { fileName: r.name } : {}, onCancel: s, onConfirm: a }) : null });
}
const jr = 8192, kr = 16;
function xe(e) {
  return Math.min(jr, Math.max(kr, Math.round(e)));
}
function Nr(e) {
  const r = (e || "#ffffff").trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(r) ? r : "#ffffff";
}
async function he(e) {
  const r = xe(e.width), s = xe(e.height), a = Nr(e.background ?? "#ffffff"), o = document.createElement("canvas");
  o.width = r, o.height = s;
  const n = o.getContext("2d");
  if (!n) throw new Error("Canvas 2D unavailable");
  n.clearRect(0, 0, r, s), n.fillStyle = a, n.fillRect(0, 0, r, s);
  const d = await new Promise((u) => {
    o.toBlob((c) => u(c), "image/png");
  });
  if (!d) throw new Error("Failed to encode whiteboard PNG");
  return new File([d], `whiteboard-${r}x${s}.png`, { type: "image/png" });
}
const wr = [{ id: "hd", label: "1280\xD7720", width: 1280, height: 720 }, { id: "fhd", label: "1920\xD71080", width: 1920, height: 1080 }, { id: "sq", label: "1080\xD71080", width: 1080, height: 1080 }, { id: "a4", label: "A4~", width: 794, height: 1123 }], Sr = [{ id: "white", label: "\uD770\uC0C9", value: "#ffffffff" }, { id: "paper", label: "\uD06C\uB9BC", value: "#fff8e7ff" }, { id: "gray", label: "\uD68C\uC0C9", value: "#f3f4f6ff" }, { id: "black", label: "\uAC80\uC815", value: "#111827ff" }, { id: "clear", label: "\uD22C\uBA85", value: "#00000000" }];
function gs({ isOpen: e, onClose: r, onConfirm: s, disabled: a = false }) {
  const [o, n] = m.useState(1920), [d, u] = m.useState(1080), [c, p] = m.useState("#ffffffff"), [x, k] = m.useState(""), [v, w] = m.useState(false), [N, f] = m.useState("");
  m.useEffect(() => {
    e && (n(1920), u(1080), p("#ffffffff"), k(""), w(false));
  }, [e]);
  const b = ct(P(c) || "#ffffffff");
  m.useEffect(() => {
    if (!e) {
      f("");
      return;
    }
    let l = false, h = "";
    return (async () => {
      try {
        const g = await he({ width: o, height: d, background: c });
        if (l) return;
        h = URL.createObjectURL(g), f(h);
      } catch {
        l || f("");
      }
    })(), () => {
      l = true, h && URL.revokeObjectURL(h);
    };
  }, [e, o, d, c]);
  const y = m.useMemo(() => {
    const h = Math.min(1, 220 / Math.max(o, d, 1));
    return { width: Math.max(24, Math.round(o * h)), height: Math.max(24, Math.round(d * h)) };
  }, [o, d]), j = async () => {
    if (!(a || v)) {
      if (o < 16 || d < 16) {
        k("\uD06C\uAE30\uB294 16px \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
        return;
      }
      w(true), k("");
      try {
        const l = await he({ width: o, height: d, background: c });
        await s(l), r();
      } catch (l) {
        k(l instanceof Error ? l.message : "\uD654\uC774\uD2B8\uBCF4\uB4DC\uB97C \uB123\uB294 \uB370 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        w(false);
      }
    }
  }, S = (l) => {
    l.key === "Enter" && (!(l.metaKey || l.ctrlKey) || l.altKey || l.shiftKey || l.nativeEvent.isComposing || l.keyCode === 229 || (l.preventDefault(), l.stopPropagation(), j()));
  }, i = v || a;
  return t.jsx(_, { isOpen: e, onClose: r, ignoreEnterInFields: true, children: t.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [t.jsxs("div", { className: "flex items-center gap-2", children: [t.jsx(St, { size: 20, className: "text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }), t.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30" })] }), t.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uBE48 \uCE94\uBC84\uC2A4 PNG\uB97C \uB9CC\uB4E4\uC5B4 \uB178\uD2B8\uC5D0", " ", t.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "![[path]]" }), " ", "\uB85C \uB123\uC740 \uB4A4, \uD06C\uAC8C \uBCF4\uAE30(\uB354\uBE14\uD074\uB9AD)\uC5D0\uC11C \uBC14\uB85C \uADF8\uB9B4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), t.jsx("div", { className: "flex flex-wrap gap-1.5", children: wr.map((l) => t.jsx("button", { type: "button", disabled: i, className: `rounded-md border px-2 py-1 text-[11px] ${o === l.width && d === l.height ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200" : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`, onClick: () => {
    n(l.width), u(l.height);
  }, children: l.label }, l.id)) }), t.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB108\uBE44 (px)" }), t.jsx("input", { type: "number", min: 16, max: 8192, value: o, disabled: i, onChange: (l) => n(Number(l.target.value) || 16), onKeyDown: S, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB192\uC774 (px)" }), t.jsx("input", { type: "number", min: 16, max: 8192, value: d, disabled: i, onChange: (l) => u(Number(l.target.value) || 16), onKeyDown: S, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), t.jsxs("div", { className: "flex flex-col gap-2", children: [t.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uBC30\uACBD\uC0C9" }), t.jsx("div", { className: "flex flex-wrap gap-1.5", children: Sr.map((l) => t.jsxs("button", { type: "button", disabled: i, "aria-label": l.label, className: `inline-flex h-8 items-center gap-1.5 rounded-md border px-2 text-[11px] ${c.toLowerCase() === l.value ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40" : "border-gray-300 dark:border-odp-borderStrong"}`, onClick: () => p(l.value), children: [t.jsx("span", { className: "inline-block h-4 w-4 overflow-hidden rounded border border-black/10", style: te, children: t.jsx("span", { className: "block h-full w-full", style: { backgroundColor: l.value } }) }), l.label] }, l.id)) }), t.jsxs("div", { className: "rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong", children: [t.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: t.jsx(zt, { color: b, onChange: (l) => {
    const h = P(l.startsWith("#") ? l : `#${l}`);
    h && p(h);
  } }) }), t.jsx(Ht, { alpha: true, prefixed: true, color: b, onChange: (l) => {
    const h = P(l.startsWith("#") ? l : `#${l}`);
    h && p(h);
  }, className: "mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), t.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 p-4 dark:border-odp-borderStrong", style: te, children: [N ? t.jsx("img", { src: N, alt: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uBBF8\uB9AC\uBCF4\uAE30", style: { width: y.width, height: y.height }, className: "object-contain shadow-sm" }) : t.jsx("div", { className: "flex h-28 w-40 items-center justify-center text-xs text-gray-400", children: "\uBBF8\uB9AC\uBCF4\uAE30" }), t.jsxs("span", { className: "text-[10px] text-gray-500 dark:text-odp-muted", children: [o, " \xD7 ", d, "px"] })] }), x ? t.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: x }) : null, t.jsxs("div", { className: "flex justify-end gap-2", children: [t.jsxs("button", { type: "button", onClick: r, disabled: v, className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: [t.jsx(W, { size: 14, "aria-hidden": true }), "\uCDE8\uC18C"] }), t.jsxs("button", { type: "button", onClick: () => {
    j();
  }, disabled: i, className: "inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50", children: [v ? t.jsx(Ct, { size: 14, className: "animate-spin", "aria-hidden": true }) : t.jsx(G, { size: 14, "aria-hidden": true }), "\uC0BD\uC785"] })] })] }) });
}
function ps() {
  const [e, r] = m.useState(re);
  m.useEffect(() => {
    const a = () => r(re());
    return window.addEventListener(se, a), () => {
      window.removeEventListener(se, a);
    };
  }, []);
  const s = m.useCallback((a) => {
    r((o) => {
      const n = typeof a == "function" ? a(o) : !!a;
      return ut(n), n;
    });
  }, []);
  return [e, s];
}
const Cr = 48, ge = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, Te = Me.define(), Re = Me.define(), Be = new V();
function Er(e) {
  const r = [];
  ge.lastIndex = 0;
  let s;
  for (; (s = ge.exec(e)) !== null; ) {
    const a = s[1] ?? "image", o = s[2] ?? "";
    if (o.length < Cr) continue;
    const n = s[0], d = n.length - o.length, u = s.index + d;
    r.push({ from: u, to: s.index + n.length, mime: a });
  }
  return r;
}
function Mr(e, r) {
  const s = Math.round(r * 3 / 4), a = s >= 1024 * 1024 ? `${(s / (1024 * 1024)).toFixed(1)}MB` : s >= 1024 ? `${Math.max(1, Math.round(s / 1024))}KB` : `${s}B`;
  return `\u2026${e} ${a}\u2026`;
}
class Ir extends Ot {
  constructor(r, s, a) {
    super(), this.label = r, this.from = s, this.to = a;
  }
  toDOM(r) {
    const s = document.createElement("span");
    return s.textContent = this.label, s.className = "cm-base64-image-fold", s.title = "Click to expand base64 image data", s.addEventListener("mousedown", (a) => {
      a.preventDefault(), a.stopPropagation(), r.dispatch({ selection: { anchor: this.from }, effects: Te.of({ from: this.from, to: this.to }) }), r.focus();
    }), s.addEventListener("click", (a) => {
      a.preventDefault();
    }), s;
  }
  ignoreEvent() {
    return false;
  }
  eq(r) {
    return this.label === r.label && this.from === r.from && this.to === r.to;
  }
}
function Ar(e, r, s) {
  return e.some((a) => a.from === r && a.to === s);
}
function pe(e, r) {
  const s = [], a = [];
  for (let o = 1; o <= e.doc.lines; o += 1) {
    const n = e.doc.line(o);
    for (const d of Er(n.text)) {
      const u = n.from + d.from, c = n.from + d.to;
      if (Ar(r, u, c)) {
        a.push({ from: u, to: c });
        continue;
      }
      s.push(ue.replace({ widget: new Ir(Mr(d.mime, c - u), u, c) }).range(u, c));
    }
  }
  return { deco: ue.set(s, true), expanded: a };
}
const Ke = Ee.define({ create(e) {
  return pe(e, []);
}, update(e, r) {
  let s = e.expanded;
  r.docChanged && s.length && (s = s.map(({ from: o, to: n }) => ({ from: r.changes.mapPos(o, 1), to: r.changes.mapPos(n, -1) })).filter(({ from: o, to: n }) => o < n));
  let a = s !== e.expanded;
  for (const o of r.effects) o.is(Te) ? (s = [{ from: o.value.from, to: o.value.to }], a = true) : o.is(Re) && s.length > 0 && (s = [], a = true);
  return r.docChanged || a ? pe(r.state, s) : e;
}, provide: (e) => q.decorations.from(e, (r) => r.deco) }), Fr = q.domEventHandlers({ mousedown(e, r) {
  const s = r.state.field(Ke, false);
  if (!s || s.expanded.length === 0) return false;
  const a = e.target;
  if (!(a instanceof Node) || !r.dom.contains(a)) return false;
  const o = r.posAtDOM(a, 0);
  return o !== -1 && s.expanded.some(({ from: n, to: d }) => o >= n && o <= d) || r.dispatch({ effects: Re.of(null) }), false;
} });
function $e() {
  return [Ke, Fr];
}
function bs(e) {
  return Be.of(e ? $e() : []);
}
function ys(e, r) {
  if (e) try {
    e.dispatch({ effects: Be.reconfigure(r ? $e() : []) });
  } catch {
  }
}
const ze = new V();
function Lr(e, r, s) {
  let a = false;
  return Le(e).between(r, s, () => {
    a = true;
  }), a;
}
function Dr(e) {
  const r = [], s = e.doc.toString();
  return X(e).iterate({ enter(a) {
    if (a.name !== "FencedCode") return;
    const o = Pe(s, a.from, a.to);
    o && r.push(o);
  } }), r;
}
function He(e, r, s) {
  return e.some((a) => a.from === r && a.to === s);
}
const Oe = Ee.define({ create() {
  return [];
}, update(e, r) {
  let s = e;
  r.docChanged && s.length && (s = s.map(({ from: o, to: n }) => ({ from: r.changes.mapPos(o, 1), to: r.changes.mapPos(n, -1) })).filter(({ from: o, to: n }) => o < n));
  let a = s !== e;
  for (const o of r.effects) if (o.is(L)) He(s, o.value.from, o.value.to) || (s = [...s, o.value], a = true);
  else if (o.is(C)) {
    const n = s.filter((d) => d.from !== o.value.from || d.to !== o.value.to);
    n.length !== s.length && (s = n, a = true);
  }
  return a ? s : e;
} });
function be(e) {
  const r = e.state.field(Oe), s = [];
  for (const a of Dr(e.state)) He(r, a.from, a.to) || Lr(e.state, a.from, a.to) || s.push(C.of(a));
  s.length > 0 && e.dispatch({ effects: s });
}
const _r = Fe.fromClass(class {
  constructor(e) {
    be(e);
  }
  update(e) {
    e.docChanged && be(e.view);
  }
}), Pr = Ae.of((e, r) => {
  const s = e.doc.toString();
  let a = null;
  return X(e).iterate({ enter(o) {
    if (o.name !== "FencedCode" || e.doc.lineAt(o.from).from !== r) return;
    const d = Pe(s, o.from, o.to);
    if (d) return a = d, false;
  } }), a;
});
function Ue() {
  return [Oe, Ie(), Pr, _r];
}
function vs(e) {
  return ze.of(e ? Ue() : []);
}
function js(e, r) {
  if (e) try {
    e.dispatch({ effects: ze.reconfigure(r ? Ue() : []) });
  } catch {
  }
}
function Tr(e) {
  var _a, _b;
  if (!(e == null ? void 0 : e.state)) return false;
  const r = (_b = (_a = e.state.selection) == null ? void 0 : _a.main) == null ? void 0 : _b.head;
  if (typeof r != "number") return false;
  const s = e.state.doc.lineAt(r);
  return e.dispatch({ changes: { from: s.from, to: s.from, insert: `
` }, selection: { anchor: s.from }, scrollIntoView: true }), true;
}
function ks(e) {
  return e.altKey || !e.shiftKey || !(e.ctrlKey || e.metaKey) ? false : (e.key || "").toLowerCase() === "enter" ? true : e.code === "Enter" || e.code === "NumpadEnter";
}
const Rr = { key: "Mod-Shift-Enter", preventDefault: true, run: Tr }, Ns = De.highest(_e.of([Rr])), We = new mt("s3haim-note-cover-fold");
We.version(1).stores({ folds: "key, updatedAt" });
const Ge = We.folds;
function Br(e, r) {
  return `cover-fold:${ft(e, r)}`;
}
function ws(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Br(e.type, e.id);
}
async function Kr(e) {
  if (!e) return null;
  const r = await Ge.get(e);
  return !r || typeof r.collapsed != "boolean" ? null : r.collapsed;
}
async function $r(e, r) {
  e && await Ge.put({ key: e, collapsed: !!r, updatedAt: Date.now() });
}
function I(e) {
  const r = Math.min(e.length, 2e6);
  return xt(e.sliceString(0, r));
}
function E(e) {
  const r = I(e.doc);
  if (!r) return null;
  const s = e.doc.lineAt(r.from);
  return s.to >= r.to ? null : { from: s.to, to: r.to };
}
function A(e, r) {
  let s = false;
  return Le(e).between(r.from, r.to, () => {
    s = true;
  }), s;
}
function zr(e, r) {
  return e.from === r.from && e.to === r.to;
}
function Hr(e, r) {
  const s = e.doc.lineAt(r);
  let a = false;
  return X(e).iterate({ from: s.from, to: Math.min(s.to, s.from + 1), enter(o) {
    const n = o.type.name;
    if (n.startsWith("ATXHeading") || n.startsWith("SetextHeading")) return a = true, false;
  } }), a;
}
function $(e, r) {
  const s = I(e.doc);
  if (s) {
    const n = e.doc.lineAt(s.from);
    if (r === n.from) {
      const d = E(e);
      if (d) return { ...d, kind: "cover" };
    }
    if (r >= s.from && r < s.to) return null;
  }
  if (!Hr(e, r)) return null;
  const a = e.doc.lineAt(r), o = qt(e, a.from, a.to);
  return !o || o.from >= o.to ? null : { ...o, kind: "heading" };
}
const F = Vt.define({ combine: (e) => e[e.length - 1] ?? null }), Ve = new V();
function Or(e) {
  return Ve.of(F.of(e));
}
function Ss(e, r) {
  e.dispatch({ effects: Ve.reconfigure(F.of(r)) });
}
function Ur(e, r) {
  const s = document.createElement("button");
  s.type = "button", s.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${r}`;
  const a = r === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  s.setAttribute("aria-label", a), s.title = a, s.dataset.foldKind = r, s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const o = s.querySelector("svg");
  return o && (o.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", o.style.transformOrigin = "50% 50%"), s;
}
class ye extends Gt {
  constructor(r, s) {
    super(), this.open = r, this.kind = s;
  }
  eq(r) {
    return this.open === r.open && this.kind === r.kind;
  }
  toDOM() {
    return Ur(this.open, this.kind);
  }
}
let H = 0;
function qe(e, r) {
  const s = e.coordsAtPos(r.from), a = e.coordsAtPos(r.to);
  if (!s || !a) return null;
  const o = e.contentDOM.getBoundingClientRect(), n = Math.min(s.top, a.top), d = Math.max(s.bottom, a.bottom), u = Math.max(0, d - n);
  if (u < 2) return null;
  const c = document.createElement("div");
  return c.className = "cm-note-cover-fold-motion", c.style.cssText = ["position:fixed", `top:${n}px`, `left:${o.left}px`, `width:${Math.max(0, o.width)}px`, `height:${u}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(c), c;
}
async function Wr(e, r) {
  const s = ++H, a = qe(e, r);
  if (!a) {
    e.dispatch({ effects: C.of(r) });
    return;
  }
  try {
    await U(a, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  s === H && E(e.state) && e.dispatch({ effects: C.of(r) }), a.remove();
}
async function Gr(e, r) {
  ++H, e.dispatch({ effects: L.of(r) });
  const s = E(e.state);
  if (!s) return;
  const a = qe(e, s);
  if (a) {
    try {
      await U(a, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    a.remove();
  }
}
function Xe(e, r) {
  var _a;
  const s = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, "svg");
  s instanceof SVGElement && U(s, { transform: r ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function ve(e, r) {
  const s = A(e.state, r);
  return e.dispatch({ effects: s ? L.of(r) : C.of(r) }), true;
}
function je(e) {
  const r = E(e.state);
  if (!r) return false;
  const a = !A(e.state, r), o = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return Xe(o, !a), (async () => {
    a ? await Wr(e, r) : await Gr(e, r);
    const n = e.state.facet(F);
    n && $r(n, a);
  })(), true;
}
function ke(e, r) {
  const s = E(e.state);
  if (!s) return;
  const a = A(e.state, s);
  r && !a ? e.dispatch({ effects: C.of(s) }) : !r && a && e.dispatch({ effects: L.of(s) });
}
function Vr() {
  return Fe.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const r = e.state.facet(F) !== this.lastKey, a = !!I(e.state.doc), o = a && !this.hadCover;
      this.hadCover = a, (r || o) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(F);
      this.lastKey = e;
      const r = I(this.view.state.doc);
      if (this.hadCover = !!r, !r) return;
      if (!e) {
        ke(this.view, true);
        return;
      }
      const s = ++this.loadGen;
      Kr(e).then((a) => {
        s === this.loadGen && ke(this.view, a !== false);
      });
    }
  });
}
function qr(e) {
  return e.transactions.some((r) => r.effects.some((s) => s.is(C) || s.is(L)));
}
function Cs() {
  return [Or(null), Ie({ preparePlaceholder(e, r) {
    const s = E(e);
    return s && zr(s, r) ? "cover" : "heading";
  }, placeholderDOM(e, r, s) {
    const a = document.createElement("span");
    return a.className = "cm-foldPlaceholder", a.textContent = s === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", a.setAttribute("aria-hidden", "true"), a.onclick = r, a;
  } }), Ae.of((e, r) => {
    const s = I(e.doc);
    if (!s) return null;
    const a = e.doc.lineAt(s.from);
    return r !== a.from ? null : E(e);
  }), Ut({ class: "cm-note-cover-fold-gutter", lineMarker(e, r) {
    const s = $(e.state, r.from);
    if (!s) return null;
    const a = !A(e.state, s);
    return new ye(a, s.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || qr(e), initialSpacer: () => new ye(true, "heading"), domEventHandlers: { mousedown(e, r, s) {
    if (!(s instanceof MouseEvent) || s.button !== 0) return false;
    const a = $(e.state, r.from);
    if (!a) return false;
    if (a.kind === "cover") {
      if (!je(e)) return false;
    } else {
      const o = s.target instanceof Element ? s.target.closest(".cm-note-cover-fold-chevron") : null;
      Xe(o, A(e.state, a)), ve(e, a);
    }
    return s.preventDefault(), s.stopPropagation(), true;
  } } }), Wt({ domEventHandlers: { mousedown(e, r, s) {
    if (!(s instanceof MouseEvent) || s.button !== 0) return false;
    const a = I(e.state.doc);
    if (a && r.from >= a.from && r.from < a.to) return je(e) ? (s.preventDefault(), true) : false;
    const o = $(e.state, r.from);
    return !o || o.kind !== "heading" ? false : (ve(e, o), s.preventDefault(), true);
  } } }), Vr(), q.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function Xr({ cover: e, getPresignedUrl: r }) {
  const s = ht(e.pageSizeId) ? e.pageSizeId : gt, a = m.useMemo(() => ({ ...pt(), pageSizeId: s }), [s]), o = m.useMemo(() => bt(s), [s]), n = m.useMemo(() => yt(a), [a]);
  return t.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": s, style: n, children: t.jsx(Xt, { cover: e, getPresignedUrl: r, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${o.widthMm} / ${o.heightMm}` } }) });
}
const D = /* @__PURE__ */ new WeakMap(), Ye = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", Yr = "\uD45C\uC9C0";
function O(e) {
  const r = D.get(e);
  r && (r.unmount(), D.delete(e));
}
function Ne(e, r) {
  if (!e) return;
  const s = e.querySelector(".md-note-cover-placeholder__fallback");
  if (!s) return;
  const a = s.querySelector(".md-note-cover-placeholder__fallback-text");
  if (a) {
    a.textContent = r;
    return;
  }
  s.textContent = r;
}
function Qr(e) {
  if (!e) return;
  let r = e.querySelector(".md-note-cover-placeholder__fallback");
  if (r || (r = document.createElement("span"), r.className = "md-note-cover-placeholder__fallback", e.appendChild(r)), r.querySelector(".md-note-cover-placeholder__spinner")) return;
  r.replaceChildren();
  const s = document.createElement("span");
  s.className = "md-note-cover-placeholder__spinner", s.setAttribute("aria-hidden", "true");
  const a = document.createElement("span");
  a.className = "md-note-cover-placeholder__fallback-text", a.textContent = Ye, r.append(s, a);
}
function z(e, r) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", r === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", r === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", r === "empty"), r === "pending" ? (Qr(e), Ne(e, Ye)) : r === "empty" && Ne(e, Yr));
}
function Zr(e, r, s) {
  let a = D.get(e);
  a || (a = Qe.createRoot(e), D.set(e, a)), a.render(m.createElement(Xr, { cover: r, getPresignedUrl: s ?? void 0 }));
}
function Es(e, r, s, a) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const o = (a == null ? void 0 : a.load) !== false, { cover: n } = vt(r ?? ""), d = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(n == null ? void 0 : n.enabled)) {
    for (const u of d) {
      O(u);
      const c = u.closest("[data-note-cover-placeholder]");
      z(c, "empty");
    }
    return 0;
  }
  if (!o) {
    for (const u of d) {
      O(u);
      const c = u.closest("[data-note-cover-placeholder]");
      z(c, "pending");
    }
    return 0;
  }
  for (const u of d) {
    const c = u.closest("[data-note-cover-placeholder]");
    z(c, "ready"), Zr(u, n, s);
  }
  return d.length;
}
function Ms(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const r = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const s of r) O(s);
}
function Is(e) {
  var _a, _b;
  if (!e) return [];
  const r = [], s = /* @__PURE__ */ new Set(), a = (o) => {
    if (!o || !o.size) return;
    const n = String(o.size);
    s.has(n) || (s.add(n), r.push(o));
  };
  if ((_a = e.files) == null ? void 0 : _a.length) for (const o of e.files) o && (((_b = o.type) == null ? void 0 : _b.startsWith("image/")) || !o.type && o.size > 0) && a(o);
  if (e.items) for (const o of e.items) {
    if (o.kind !== "file") continue;
    const n = o.type || "";
    (n.startsWith("image/") || n === "") && a(o.getAsFile());
  }
  return r;
}
const Jr = [{ key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Yt }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: Qt }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: Jt, shift: Zt }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: er }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: tr }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: rr }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: sr }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => ({ key: `Ctrl-${e}`, mac: `Cmd-${e}`, preventDefault: true, run: (r) => fe(r, e) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (e) => fe(e, 10) }, { any: (e, r) => (r.ctrlKey || r.metaKey) && r.altKey && r.code === "KeyC" ? ar(e) : or(e, r) }], As = De.high(_e.of(Jr));
export {
  fs as C,
  ms as H,
  Ns as I,
  As as M,
  gs as W,
  Is as a,
  bs as b,
  Cs as c,
  ys as d,
  js as e,
  xs as f,
  ws as g,
  hs as h,
  Es as i,
  ks as j,
  Tr as k,
  Jr as l,
  vs as m,
  Ss as s,
  Ms as t,
  ps as u
};
