var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as m, j as t, c as qe } from "./vendor-react-BDjpSibw.js";
import { A as Xe, m as Ye, a as U } from "./vendor-motion-Dw-WnPM7.js";
import { p as Ne, s as Qe, a as Ze } from "./taskCheckboxStatus-DlXLsCJg.js";
import { M as Je, H as et, T as tt, el as Q, em as rt, aj as _, en as st, eo as Z, I as J, ep as at, b6 as ot, eq as nt, eh as ee, c as lt, n as T, C as te, er as re, es as se, et as dt, eu as it, aO as ct, ev as ut, ew as ft, ex as mt, ey as xt, ez as ht, eA as gt, eB as pt } from "./index-DSkvkTCg.js";
import { aB as bt, g as ae, aC as D, aD as R, aE as yt, n as vt, aF as we, j as jt, k as Se, aG as oe, X as G, y as W, aH as kt, L as Nt } from "./vendor-lucide-BXdwsXhs.js";
import { h as wt, b as B, d as $, y as St, z as Ct, B as Et, D as Mt, E as It, G as Lt, H as At, K as Ft, a2 as Pt, M as _t, S as Tt, g as Dt, i as ne, j as le, k as de, l as ie, A as ce } from "./vendor-radix-DuLpLUUM.js";
import { N as Rt } from "./WikiImageSizeModal-jDE_q_UJ.js";
import { t as Bt, O as $t } from "./index-De3wkM3r.js";
import { C as V, g as Ce, E as q, S as Ee, D as ue, W as Kt, G as Me, I as F, J as C, K as Ie, L as X, V as Le, M as Ae, P as zt, k as Ht, N as Ot, y as Ut, O as Gt, Q as Wt, T as Vt } from "./vendor-codemirror-0YdHorwW.js";
import { m as Fe } from "./appMarkdownItPlugins-dy_D6IrS.js";
import { C as qt } from "./TableEditModal-BU6guZga.js";
function Xt(e) {
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
      const k = Math.floor((((_a = x[1]) == null ? void 0 : _a.length) ?? 0) / 2), v = Ne(x[3]), w = v === "done", N = (x[4] ?? "").trim();
      o += 1, w && (n += 1), a.tasks.push({ id: `line-${c}`, lineIndex: c, indent: k, completed: w, status: v, text: N, rawLine: u });
    }
  }), a.tasks.length > 0 && s.push(a);
  const i = o > 0 ? Math.round(n / o * 100) : 0;
  return { categories: s, totalTasks: o, completedTasks: n, pendingTasks: o - n, percentage: i };
}
function Yt(e, r) {
  const s = String(e ?? "").split(`
`);
  if (r < 0 || r >= s.length) return e;
  const o = (s[r] ?? "").match(/^(\s*(?:[-*]|\d+\.)\s+)\[([ xX~])\](.*)$/);
  if (!o) return e;
  const n = Je(e), i = Qe(Ze(Ne(o[2]), n), n);
  return s[r] = `${o[1]}[${i}]${o[3] ?? ""}`, s.join(`
`);
}
function Qt({ markdown: e = "", onMarkdownChange: r }) {
  const [s, a] = m.useState(""), [o, n] = m.useState("all"), [i, u] = m.useState({}), [c, p] = m.useState("dashboard"), x = m.useMemo(() => Xt(e), [e]), k = m.useMemo(() => x.categories.map((f) => f.name).join("\0"), [x.categories]);
  m.useEffect(() => {
    const f = {};
    for (const b of k ? k.split("\0") : []) b && (f[b] = true);
    u(f);
  }, [k]);
  const v = (f) => {
    typeof r == "function" && r(Yt(e, f));
  }, w = (f) => {
    u((b) => ({ ...b, [f]: !b[f] }));
  }, N = (f) => {
    const b = f.text.toLowerCase().includes(s.toLowerCase()), y = o === "all" ? true : o === "completed" ? f.completed : !f.completed;
    return b && y;
  };
  return t.jsxs("div", { className: "@container space-y-3 text-xs text-slate-100", children: [t.jsxs("div", { className: "grid grid-cols-2 gap-2 @[380px]:grid-cols-4", children: [t.jsxs("div", { className: "relative min-h-19 overflow-hidden rounded-xl border border-indigo-500/30 bg-linear-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [t.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: t.jsx(bt, { className: "h-14 w-14 text-indigo-400 @[380px]:h-16 @[380px]:w-16" }) }), t.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), t.jsx("div", { className: "my-1 flex items-baseline gap-1", children: t.jsxs("span", { className: "text-2xl font-extrabold text-white @[380px]:text-3xl", children: [x.percentage, "%"] }) }), t.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: t.jsx("div", { className: "h-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${x.percentage}%` } }) })] }), t.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [t.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [t.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), t.jsx(ae, { className: "h-3.5 w-3.5 text-slate-500" })] }), t.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [x.totalTasks, " ", t.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), t.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [t.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [t.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), t.jsx(D, { className: "h-3.5 w-3.5" })] }), t.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [x.completedTasks, " ", t.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), t.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [t.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [t.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), t.jsx(R, { className: "h-3.5 w-3.5" })] }), t.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [x.pendingTasks, " ", t.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), t.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [t.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [t.jsxs("button", { type: "button", onClick: () => p("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${c === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [t.jsx(yt, { className: "h-3 w-3" }), t.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), t.jsxs("button", { type: "button", onClick: () => p("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${c === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [t.jsx(ae, { className: "h-3 w-3" }), t.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), t.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [t.jsxs("div", { className: "relative min-w-30 flex-1", children: [t.jsx(vt, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), t.jsx("input", { type: "text", value: s, onChange: (f) => a(f.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), t.jsxs("select", { value: o, onChange: (f) => n(f.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [t.jsx("option", { value: "all", children: "\uC804\uCCB4" }), t.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), t.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), c === "dashboard" && t.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: x.categories.length === 0 ? t.jsxs("div", { className: "py-8 text-center text-slate-500", children: [t.jsx(we, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), t.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), t.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : x.categories.map((f, b) => {
    const y = f.tasks.length, j = f.tasks.filter((h) => h.completed).length, S = y > 0 ? Math.round(j / y * 100) : 0, d = !!i[f.name], l = f.tasks.filter(N);
    return s && l.length === 0 ? null : t.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [t.jsxs("button", { type: "button", onClick: () => w(f.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-slate-500", children: d ? t.jsx(jt, { className: "h-3.5 w-3.5" }) : t.jsx(Se, { className: "h-3.5 w-3.5" }) }), t.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: f.name })] }), t.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [t.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [t.jsx("strong", { className: "text-slate-200", children: j }), " /", " ", y] }), t.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${S === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [S, "%"] })] })] }), d ? t.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: l.length === 0 ? t.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : l.map((h) => t.jsxs("button", { type: "button", onClick: () => v(h.lineIndex), style: { paddingLeft: `${h.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [t.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: h.completed ? t.jsx(D, { className: "h-3.5 w-3.5 text-emerald-400" }) : h.status === "doing" ? t.jsx(oe, { className: "h-3.5 w-3.5 text-amber-400" }) : t.jsx(R, { className: "h-3.5 w-3.5 text-slate-600" }) }), t.jsx("span", { className: `leading-relaxed ${h.completed ? "text-slate-500 line-through" : h.status === "doing" ? "text-amber-200/90" : "text-slate-300"}`, children: h.text })] }, h.id)) }) : null] }, `${f.name}-${b}`);
  }) }), c === "checklist" ? t.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: x.categories.map((f, b) => {
    const y = f.tasks.filter(N);
    return y.length === 0 ? null : t.jsxs("div", { className: "space-y-1", children: [t.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [f.name, " (", y.length, ")"] }), y.map((j) => t.jsxs("button", { type: "button", onClick: () => v(j.lineIndex), style: { paddingLeft: `${j.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [t.jsx("span", { className: "mt-0.5 shrink-0", children: j.completed ? t.jsx(D, { className: "h-3.5 w-3.5 text-emerald-400" }) : j.status === "doing" ? t.jsx(oe, { className: "h-3.5 w-3.5 text-amber-400" }) : t.jsx(R, { className: "h-3.5 w-3.5 text-slate-600" }) }), t.jsx("span", { className: `leading-relaxed ${j.completed ? "text-slate-500 line-through" : j.status === "doing" ? "text-amber-200/90" : "text-slate-200"}`, children: j.text })] }, j.id))] }, `${f.name}-list-${b}`);
  }) }) : null] })] });
}
const Zt = tt, Jt = "s3haim_checklist_progress_sidebar_width", er = 360, tr = 260, rr = 560, sr = [0.32, 0.72, 0, 1], ar = { type: "spring", stiffness: 420, damping: 36, mass: 0.85 };
function Jr({ open: e, onOpenChange: r, markdown: s, onMarkdownChange: a, overlay: o = false }) {
  const { width: n, isResizing: i, handleProps: u } = et({ storageKey: Jt, defaultWidth: er, minWidth: tr, maxWidth: rr, edge: "right", collapseBelowWidth: 180, onCollapseBelowMin: () => r == null ? void 0 : r(false) }), c = o ? ["absolute inset-y-0 right-0 z-30 flex flex-col overflow-hidden", "rounded-bl-md border border-slate-200/80 border-t-0 bg-white/95 shadow-lg", "dark:border-odp-borderStrong/80 dark:bg-odp-surface/95 dark:shadow-black/40"].join(" ") : "relative flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-300 bg-white/95 dark:border-odp-borderStrong dark:bg-odp-surface/95", p = () => r == null ? void 0 : r(false);
  return t.jsx(Xe, { initial: false, children: e ? t.jsx(Ye.aside, { role: "complementary", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", className: c, style: o ? { width: n, willChange: "transform, opacity" } : { overflow: "hidden", willChange: "width, opacity" }, initial: o ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, animate: o ? { x: 0, opacity: 1 } : { width: n, opacity: 1 }, exit: o ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, transition: i ? { duration: 0 } : o ? { type: "tween", duration: 0.22, ease: sr } : ar, children: t.jsxs("div", { className: "relative flex h-full min-h-0 w-full flex-col", style: o ? void 0 : { width: n }, children: [t.jsx(Zt, { edge: "left", handleProps: u, isResizing: i, visibleOnHover: true, label: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-2.5 py-2 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong", children: [t.jsx(we, { size: 14, className: "shrink-0 text-indigo-500 dark:text-indigo-300", "aria-hidden": true }), t.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), t.jsx("button", { type: "button", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB2EB\uAE30", onClick: p, className: "inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: t.jsx(G, { size: 14 }) })] }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-2.5", children: String(s ?? "").trim() ? t.jsx(Qt, { markdown: s, onMarkdownChange: a }) : t.jsxs("p", { className: "rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted", children: ["\uBB38\uC11C\uC5D0 \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", t.jsx("br", {}), "`- [ ]` \uD56D\uBAA9\uC744 \uCD94\uAC00\uD574 \uBCF4\uC138\uC694."] }) })] }) }, o ? "checklist-overlay" : "checklist-dock") : null });
}
const or = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], nr = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], lr = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], dr = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), ir = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", fe = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function es({ isOpen: e, markdown: r, selectedMarkdown: s = "", onClose: a, onApply: o }) {
  const n = s.length > 0, [i, u] = m.useState("document"), [c, p] = m.useState(1), [x, k] = m.useState(false), [v, w] = m.useState("nested"), [N, f] = m.useState(1), b = i === "selection" ? s : r;
  m.useEffect(() => {
    if (!e) return;
    const d = n ? "selection" : "document";
    u(d), p(Q(d === "selection" ? s : r)), k(false), w("nested"), f(1);
  }, [e, r, s, n]), m.useEffect(() => {
    if (!e) return;
    const d = (g) => {
      const M = g;
      return (M == null ? void 0 : M.closest) ? !!M.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, l = () => {
      const g = document.activeElement;
      g && d(g) && typeof g.blur == "function" && g.blur();
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
      g.key === "Escape" || g.key === "Enter" || d(g.target) && (g.preventDefault(), g.stopPropagation(), g.stopImmediatePropagation(), l());
    };
    return window.addEventListener("keydown", h, true), () => window.removeEventListener("keydown", h, true);
  }, [e]);
  const y = m.useMemo(() => rt(b, c, { maxLevel: ee, renumberOutline: x, outlineStyle: v, outlineStart: N }), [b, c, x, v, N]), j = (d) => {
    if (d !== "selection" && d !== "document" || d === "selection" && !n) return;
    u(d), p(Q(d === "selection" ? s : r));
  }, S = () => {
    if (!y.sourceMax) return;
    const d = nt(b, c, { maxLevel: ee, renumberOutline: x, outlineStyle: v, outlineStart: N });
    d !== b && o(d, i), a();
  };
  return t.jsx(_, { isOpen: e, onClose: a, onConfirm: S, contentClassName: "max-w-3xl", children: t.jsx(wt, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [t.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), t.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), t.jsxs("div", { className: "mt-4", children: [t.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), t.jsx(B, { className: "flex items-center gap-2", value: i, onValueChange: j, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: or.map((d) => {
    const l = i === d.value, h = d.value === "selection" && !n;
    return t.jsx($, { value: d.value, disabled: h, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", l ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: t.jsxs("div", { className: l ? "" : "opacity-50", children: [t.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: d.title }), t.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: d.value === "selection" && !n ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : d.description })] }) }, d.value);
  }) })] }), t.jsxs("div", { className: "mt-4", children: [t.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), t.jsxs(St, { value: String(c), onValueChange: (d) => {
    const l = Number(d);
    Z(l) && p(l);
  }, children: [t.jsxs(Ct, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [t.jsx(Et, {}), t.jsx(Mt, { className: "text-gray-500", children: t.jsx(Se, { size: 14 }) })] }), t.jsx(It, { children: t.jsx(Lt, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(At, { className: "p-1", children: st.map((d) => t.jsxs(Ft, { value: String(d), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Pt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(W, { size: 12 }) }), t.jsx(_t, { children: `h${d}` })] }, d)) }) }) })] })] }), t.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center justify-between gap-3", children: [t.jsxs("div", { className: "min-w-0", children: [t.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), t.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), t.jsx(Tt, { className: dr(x), checked: x, onCheckedChange: k, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: t.jsx(Dt, { className: ir }) })] }), x ? t.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [t.jsxs("div", { children: [t.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), t.jsx(B, { className: "flex items-center gap-2", value: v, onValueChange: (d) => {
    (d === "flat" || d === "nested") && w(d);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: nr.map((d) => {
    const l = v === d.value;
    return t.jsx($, { value: d.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", l ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: t.jsxs("div", { className: l ? "" : "opacity-50", children: [t.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: d.title }), t.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: d.description })] }) }, d.value);
  }) })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), t.jsx(B, { className: "flex items-center gap-2", value: String(N), onValueChange: (d) => {
    d === "1" && f(1), d === "2" && f(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: lr.map((d) => {
    const l = N === d.value;
    return t.jsx($, { value: String(d.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", l ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: t.jsxs("div", { className: l ? "" : "opacity-50", children: [t.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: d.title }), t.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: d.description })] }) }, d.value);
  }) })] })] }) : null] }), t.jsx("div", { className: "mt-4 min-h-0", children: y.rows.length ? t.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: t.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [t.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: t.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [t.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), t.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), t.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), t.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), t.jsx("tbody", { children: y.rows.map((d, l) => t.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [t.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: t.jsxs(ne, { children: [t.jsx(le, { asChild: true, children: t.jsx("span", { className: "block truncate", children: d.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), t.jsx(de, { children: t.jsxs(ie, { side: "top", sideOffset: 6, className: fe, children: [d.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", t.jsx(ce, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), t.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: t.jsxs(ne, { children: [t.jsx(le, { asChild: true, children: t.jsx("span", { className: "block truncate", children: d.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), t.jsx(de, { children: t.jsxs(ie, { side: "top", sideOffset: 6, className: fe, children: [d.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", t.jsx(ce, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), t.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", d.from] }), t.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", d.to] })] }, `${d.from}-${l}-${d.text}`)) })] }) }) : t.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: i === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), t.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [t.jsxs(J, { type: "button", variant: "secondary", size: "md", onClick: a, children: [t.jsx(at, { size: 16 }), "\uCDE8\uC18C"] }), t.jsxs(J, { type: "button", variant: "primary", size: "md", onClick: S, disabled: !y.sourceMax, children: [t.jsx(ot, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function ts({ isOpen: e, onClose: r, onConfirm: s }) {
  const [a, o] = m.useState(""), [n, i] = m.useState(""), [u, c] = m.useState("");
  m.useEffect(() => {
    e && (o(""), i(""), c(""));
  }, [e]);
  const p = () => {
    const x = n.trim();
    if (!x) {
      c("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    s({ desc: a.trim(), url: x }), r();
  };
  return t.jsx(_, { isOpen: e, onClose: r, onConfirm: p, ignoreEnterInFields: true, children: t.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [t.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), t.jsx("input", { type: "text", value: a, onChange: (x) => o(x.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), t.jsx("input", { type: "text", value: n, onChange: (x) => i(x.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? t.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, t.jsxs("div", { className: "flex justify-end gap-2", children: [t.jsxs("button", { type: "button", onClick: r, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [t.jsx(G, { size: 16 }), "\uCDE8\uC18C"] }), t.jsxs("button", { type: "button", onClick: p, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [t.jsx(W, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function rs({ isOpen: e, file: r, onClose: s, onConfirm: a }) {
  const [o, n] = m.useState("");
  return m.useEffect(() => {
    if (!e || !r) {
      n("");
      return;
    }
    const i = URL.createObjectURL(r);
    return n(i), () => {
      URL.revokeObjectURL(i);
    };
  }, [e, r]), t.jsx(_, { isOpen: e && !!r, onClose: s, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: o ? t.jsx(Rt, { imageSrc: o, ...(r == null ? void 0 : r.name) ? { fileName: r.name } : {}, onCancel: s, onConfirm: a }) : null });
}
const cr = 8192, ur = 16;
function me(e) {
  return Math.min(cr, Math.max(ur, Math.round(e)));
}
function fr(e) {
  const r = (e || "#ffffff").trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(r) ? r : "#ffffff";
}
async function xe(e) {
  const r = me(e.width), s = me(e.height), a = fr(e.background ?? "#ffffff"), o = document.createElement("canvas");
  o.width = r, o.height = s;
  const n = o.getContext("2d");
  if (!n) throw new Error("Canvas 2D unavailable");
  n.clearRect(0, 0, r, s), n.fillStyle = a, n.fillRect(0, 0, r, s);
  const i = await new Promise((u) => {
    o.toBlob((c) => u(c), "image/png");
  });
  if (!i) throw new Error("Failed to encode whiteboard PNG");
  return new File([i], `whiteboard-${r}x${s}.png`, { type: "image/png" });
}
const mr = [{ id: "hd", label: "1280\xD7720", width: 1280, height: 720 }, { id: "fhd", label: "1920\xD71080", width: 1920, height: 1080 }, { id: "sq", label: "1080\xD71080", width: 1080, height: 1080 }, { id: "a4", label: "A4~", width: 794, height: 1123 }], xr = [{ id: "white", label: "\uD770\uC0C9", value: "#ffffffff" }, { id: "paper", label: "\uD06C\uB9BC", value: "#fff8e7ff" }, { id: "gray", label: "\uD68C\uC0C9", value: "#f3f4f6ff" }, { id: "black", label: "\uAC80\uC815", value: "#111827ff" }, { id: "clear", label: "\uD22C\uBA85", value: "#00000000" }];
function ss({ isOpen: e, onClose: r, onConfirm: s, disabled: a = false }) {
  const [o, n] = m.useState(1920), [i, u] = m.useState(1080), [c, p] = m.useState("#ffffffff"), [x, k] = m.useState(""), [v, w] = m.useState(false), [N, f] = m.useState("");
  m.useEffect(() => {
    e && (n(1920), u(1080), p("#ffffffff"), k(""), w(false));
  }, [e]);
  const b = lt(T(c) || "#ffffffff");
  m.useEffect(() => {
    if (!e) {
      f("");
      return;
    }
    let l = false, h = "";
    return (async () => {
      try {
        const g = await xe({ width: o, height: i, background: c });
        if (l) return;
        h = URL.createObjectURL(g), f(h);
      } catch {
        l || f("");
      }
    })(), () => {
      l = true, h && URL.revokeObjectURL(h);
    };
  }, [e, o, i, c]);
  const y = m.useMemo(() => {
    const h = Math.min(1, 220 / Math.max(o, i, 1));
    return { width: Math.max(24, Math.round(o * h)), height: Math.max(24, Math.round(i * h)) };
  }, [o, i]), j = async () => {
    if (!(a || v)) {
      if (o < 16 || i < 16) {
        k("\uD06C\uAE30\uB294 16px \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
        return;
      }
      w(true), k("");
      try {
        const l = await xe({ width: o, height: i, background: c });
        await s(l), r();
      } catch (l) {
        k(l instanceof Error ? l.message : "\uD654\uC774\uD2B8\uBCF4\uB4DC\uB97C \uB123\uB294 \uB370 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        w(false);
      }
    }
  }, S = (l) => {
    l.key === "Enter" && (!(l.metaKey || l.ctrlKey) || l.altKey || l.shiftKey || l.nativeEvent.isComposing || l.keyCode === 229 || (l.preventDefault(), l.stopPropagation(), j()));
  }, d = v || a;
  return t.jsx(_, { isOpen: e, onClose: r, ignoreEnterInFields: true, children: t.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [t.jsxs("div", { className: "flex items-center gap-2", children: [t.jsx(kt, { size: 20, className: "text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }), t.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30" })] }), t.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uBE48 \uCE94\uBC84\uC2A4 PNG\uB97C \uB9CC\uB4E4\uC5B4 \uB178\uD2B8\uC5D0", " ", t.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "![[path]]" }), " ", "\uB85C \uB123\uC740 \uB4A4, \uD06C\uAC8C \uBCF4\uAE30(\uB354\uBE14\uD074\uB9AD)\uC5D0\uC11C \uBC14\uB85C \uADF8\uB9B4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), t.jsx("div", { className: "flex flex-wrap gap-1.5", children: mr.map((l) => t.jsx("button", { type: "button", disabled: d, className: `rounded-md border px-2 py-1 text-[11px] ${o === l.width && i === l.height ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200" : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`, onClick: () => {
    n(l.width), u(l.height);
  }, children: l.label }, l.id)) }), t.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB108\uBE44 (px)" }), t.jsx("input", { type: "number", min: 16, max: 8192, value: o, disabled: d, onChange: (l) => n(Number(l.target.value) || 16), onKeyDown: S, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB192\uC774 (px)" }), t.jsx("input", { type: "number", min: 16, max: 8192, value: i, disabled: d, onChange: (l) => u(Number(l.target.value) || 16), onKeyDown: S, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), t.jsxs("div", { className: "flex flex-col gap-2", children: [t.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uBC30\uACBD\uC0C9" }), t.jsx("div", { className: "flex flex-wrap gap-1.5", children: xr.map((l) => t.jsxs("button", { type: "button", disabled: d, "aria-label": l.label, className: `inline-flex h-8 items-center gap-1.5 rounded-md border px-2 text-[11px] ${c.toLowerCase() === l.value ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40" : "border-gray-300 dark:border-odp-borderStrong"}`, onClick: () => p(l.value), children: [t.jsx("span", { className: "inline-block h-4 w-4 overflow-hidden rounded border border-black/10", style: te, children: t.jsx("span", { className: "block h-full w-full", style: { backgroundColor: l.value } }) }), l.label] }, l.id)) }), t.jsxs("div", { className: "rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong", children: [t.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: t.jsx(Bt, { color: b, onChange: (l) => {
    const h = T(l.startsWith("#") ? l : `#${l}`);
    h && p(h);
  } }) }), t.jsx($t, { alpha: true, prefixed: true, color: b, onChange: (l) => {
    const h = T(l.startsWith("#") ? l : `#${l}`);
    h && p(h);
  }, className: "mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), t.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 p-4 dark:border-odp-borderStrong", style: te, children: [N ? t.jsx("img", { src: N, alt: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uBBF8\uB9AC\uBCF4\uAE30", style: { width: y.width, height: y.height }, className: "object-contain shadow-sm" }) : t.jsx("div", { className: "flex h-28 w-40 items-center justify-center text-xs text-gray-400", children: "\uBBF8\uB9AC\uBCF4\uAE30" }), t.jsxs("span", { className: "text-[10px] text-gray-500 dark:text-odp-muted", children: [o, " \xD7 ", i, "px"] })] }), x ? t.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: x }) : null, t.jsxs("div", { className: "flex justify-end gap-2", children: [t.jsxs("button", { type: "button", onClick: r, disabled: v, className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: [t.jsx(G, { size: 14, "aria-hidden": true }), "\uCDE8\uC18C"] }), t.jsxs("button", { type: "button", onClick: () => {
    j();
  }, disabled: d, className: "inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50", children: [v ? t.jsx(Nt, { size: 14, className: "animate-spin", "aria-hidden": true }) : t.jsx(W, { size: 14, "aria-hidden": true }), "\uC0BD\uC785"] })] })] }) });
}
function as() {
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
      return dt(n), n;
    });
  }, []);
  return [e, s];
}
const hr = 48, he = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, Pe = Ee.define(), _e = Ee.define(), Te = new V();
function gr(e) {
  const r = [];
  he.lastIndex = 0;
  let s;
  for (; (s = he.exec(e)) !== null; ) {
    const a = s[1] ?? "image", o = s[2] ?? "";
    if (o.length < hr) continue;
    const n = s[0], i = n.length - o.length, u = s.index + i;
    r.push({ from: u, to: s.index + n.length, mime: a });
  }
  return r;
}
function pr(e, r) {
  const s = Math.round(r * 3 / 4), a = s >= 1024 * 1024 ? `${(s / (1024 * 1024)).toFixed(1)}MB` : s >= 1024 ? `${Math.max(1, Math.round(s / 1024))}KB` : `${s}B`;
  return `\u2026${e} ${a}\u2026`;
}
class br extends Kt {
  constructor(r, s, a) {
    super(), this.label = r, this.from = s, this.to = a;
  }
  toDOM(r) {
    const s = document.createElement("span");
    return s.textContent = this.label, s.className = "cm-base64-image-fold", s.title = "Click to expand base64 image data", s.addEventListener("mousedown", (a) => {
      a.preventDefault(), a.stopPropagation(), r.dispatch({ selection: { anchor: this.from }, effects: Pe.of({ from: this.from, to: this.to }) }), r.focus();
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
function yr(e, r, s) {
  return e.some((a) => a.from === r && a.to === s);
}
function ge(e, r) {
  const s = [], a = [];
  for (let o = 1; o <= e.doc.lines; o += 1) {
    const n = e.doc.line(o);
    for (const i of gr(n.text)) {
      const u = n.from + i.from, c = n.from + i.to;
      if (yr(r, u, c)) {
        a.push({ from: u, to: c });
        continue;
      }
      s.push(ue.replace({ widget: new br(pr(i.mime, c - u), u, c) }).range(u, c));
    }
  }
  return { deco: ue.set(s, true), expanded: a };
}
const De = Ce.define({ create(e) {
  return ge(e, []);
}, update(e, r) {
  let s = e.expanded;
  r.docChanged && s.length && (s = s.map(({ from: o, to: n }) => ({ from: r.changes.mapPos(o, 1), to: r.changes.mapPos(n, -1) })).filter(({ from: o, to: n }) => o < n));
  let a = s !== e.expanded;
  for (const o of r.effects) o.is(Pe) ? (s = [{ from: o.value.from, to: o.value.to }], a = true) : o.is(_e) && s.length > 0 && (s = [], a = true);
  return r.docChanged || a ? ge(r.state, s) : e;
}, provide: (e) => q.decorations.from(e, (r) => r.deco) }), vr = q.domEventHandlers({ mousedown(e, r) {
  const s = r.state.field(De, false);
  if (!s || s.expanded.length === 0) return false;
  const a = e.target;
  if (!(a instanceof Node) || !r.dom.contains(a)) return false;
  const o = r.posAtDOM(a, 0);
  return o !== -1 && s.expanded.some(({ from: n, to: i }) => o >= n && o <= i) || r.dispatch({ effects: _e.of(null) }), false;
} });
function Re() {
  return [De, vr];
}
function os(e) {
  return Te.of(e ? Re() : []);
}
function ns(e, r) {
  if (e) try {
    e.dispatch({ effects: Te.reconfigure(r ? Re() : []) });
  } catch {
  }
}
const Be = new V();
function jr(e, r, s) {
  let a = false;
  return Ae(e).between(r, s, () => {
    a = true;
  }), a;
}
function kr(e) {
  const r = [], s = e.doc.toString();
  return X(e).iterate({ enter(a) {
    if (a.name !== "FencedCode") return;
    const o = Fe(s, a.from, a.to);
    o && r.push(o);
  } }), r;
}
function $e(e, r, s) {
  return e.some((a) => a.from === r && a.to === s);
}
const Ke = Ce.define({ create() {
  return [];
}, update(e, r) {
  let s = e;
  r.docChanged && s.length && (s = s.map(({ from: o, to: n }) => ({ from: r.changes.mapPos(o, 1), to: r.changes.mapPos(n, -1) })).filter(({ from: o, to: n }) => o < n));
  let a = s !== e;
  for (const o of r.effects) if (o.is(F)) $e(s, o.value.from, o.value.to) || (s = [...s, o.value], a = true);
  else if (o.is(C)) {
    const n = s.filter((i) => i.from !== o.value.from || i.to !== o.value.to);
    n.length !== s.length && (s = n, a = true);
  }
  return a ? s : e;
} });
function pe(e) {
  const r = e.state.field(Ke), s = [];
  for (const a of kr(e.state)) $e(r, a.from, a.to) || jr(e.state, a.from, a.to) || s.push(C.of(a));
  s.length > 0 && e.dispatch({ effects: s });
}
const Nr = Le.fromClass(class {
  constructor(e) {
    pe(e);
  }
  update(e) {
    e.docChanged && pe(e.view);
  }
}), wr = Ie.of((e, r) => {
  const s = e.doc.toString();
  let a = null;
  return X(e).iterate({ enter(o) {
    if (o.name !== "FencedCode" || e.doc.lineAt(o.from).from !== r) return;
    const i = Fe(s, o.from, o.to);
    if (i) return a = i, false;
  } }), a;
});
function ze() {
  return [Ke, Me(), wr, Nr];
}
function ls(e) {
  return Be.of(e ? ze() : []);
}
function ds(e, r) {
  if (e) try {
    e.dispatch({ effects: Be.reconfigure(r ? ze() : []) });
  } catch {
  }
}
function Sr(e) {
  var _a, _b;
  if (!(e == null ? void 0 : e.state)) return false;
  const r = (_b = (_a = e.state.selection) == null ? void 0 : _a.main) == null ? void 0 : _b.head;
  if (typeof r != "number") return false;
  const s = e.state.doc.lineAt(r);
  return e.dispatch({ changes: { from: s.from, to: s.from, insert: `
` }, selection: { anchor: s.from }, scrollIntoView: true }), true;
}
function is(e) {
  return e.altKey || !e.shiftKey || !(e.ctrlKey || e.metaKey) ? false : (e.key || "").toLowerCase() === "enter" ? true : e.code === "Enter" || e.code === "NumpadEnter";
}
const Cr = { key: "Mod-Shift-Enter", preventDefault: true, run: Sr }, cs = zt.highest(Ht.of([Cr])), He = new ct("s3haim-note-cover-fold");
He.version(1).stores({ folds: "key, updatedAt" });
const Oe = He.folds;
function Er(e, r) {
  return `cover-fold:${it(e, r)}`;
}
function us(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Er(e.type, e.id);
}
async function Mr(e) {
  if (!e) return null;
  const r = await Oe.get(e);
  return !r || typeof r.collapsed != "boolean" ? null : r.collapsed;
}
async function Ir(e, r) {
  e && await Oe.put({ key: e, collapsed: !!r, updatedAt: Date.now() });
}
function I(e) {
  const r = Math.min(e.length, 2e6);
  return ut(e.sliceString(0, r));
}
function E(e) {
  const r = I(e.doc);
  if (!r) return null;
  const s = e.doc.lineAt(r.from);
  return s.to >= r.to ? null : { from: s.to, to: r.to };
}
function L(e, r) {
  let s = false;
  return Ae(e).between(r.from, r.to, () => {
    s = true;
  }), s;
}
function Lr(e, r) {
  return e.from === r.from && e.to === r.to;
}
function Ar(e, r) {
  const s = e.doc.lineAt(r);
  let a = false;
  return X(e).iterate({ from: s.from, to: Math.min(s.to, s.from + 1), enter(o) {
    const n = o.type.name;
    if (n.startsWith("ATXHeading") || n.startsWith("SetextHeading")) return a = true, false;
  } }), a;
}
function K(e, r) {
  const s = I(e.doc);
  if (s) {
    const n = e.doc.lineAt(s.from);
    if (r === n.from) {
      const i = E(e);
      if (i) return { ...i, kind: "cover" };
    }
    if (r >= s.from && r < s.to) return null;
  }
  if (!Ar(e, r)) return null;
  const a = e.doc.lineAt(r), o = Vt(e, a.from, a.to);
  return !o || o.from >= o.to ? null : { ...o, kind: "heading" };
}
const A = Wt.define({ combine: (e) => e[e.length - 1] ?? null }), Ue = new V();
function Fr(e) {
  return Ue.of(A.of(e));
}
function fs(e, r) {
  e.dispatch({ effects: Ue.reconfigure(A.of(r)) });
}
function Pr(e, r) {
  const s = document.createElement("button");
  s.type = "button", s.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${r}`;
  const a = r === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  s.setAttribute("aria-label", a), s.title = a, s.dataset.foldKind = r, s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const o = s.querySelector("svg");
  return o && (o.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", o.style.transformOrigin = "50% 50%"), s;
}
class be extends Gt {
  constructor(r, s) {
    super(), this.open = r, this.kind = s;
  }
  eq(r) {
    return this.open === r.open && this.kind === r.kind;
  }
  toDOM() {
    return Pr(this.open, this.kind);
  }
}
let H = 0;
function Ge(e, r) {
  const s = e.coordsAtPos(r.from), a = e.coordsAtPos(r.to);
  if (!s || !a) return null;
  const o = e.contentDOM.getBoundingClientRect(), n = Math.min(s.top, a.top), i = Math.max(s.bottom, a.bottom), u = Math.max(0, i - n);
  if (u < 2) return null;
  const c = document.createElement("div");
  return c.className = "cm-note-cover-fold-motion", c.style.cssText = ["position:fixed", `top:${n}px`, `left:${o.left}px`, `width:${Math.max(0, o.width)}px`, `height:${u}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(c), c;
}
async function _r(e, r) {
  const s = ++H, a = Ge(e, r);
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
async function Tr(e, r) {
  ++H, e.dispatch({ effects: F.of(r) });
  const s = E(e.state);
  if (!s) return;
  const a = Ge(e, s);
  if (a) {
    try {
      await U(a, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    a.remove();
  }
}
function We(e, r) {
  var _a;
  const s = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, "svg");
  s instanceof SVGElement && U(s, { transform: r ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function ye(e, r) {
  const s = L(e.state, r);
  return e.dispatch({ effects: s ? F.of(r) : C.of(r) }), true;
}
function ve(e) {
  const r = E(e.state);
  if (!r) return false;
  const a = !L(e.state, r), o = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return We(o, !a), (async () => {
    a ? await _r(e, r) : await Tr(e, r);
    const n = e.state.facet(A);
    n && Ir(n, a);
  })(), true;
}
function je(e, r) {
  const s = E(e.state);
  if (!s) return;
  const a = L(e.state, s);
  r && !a ? e.dispatch({ effects: C.of(s) }) : !r && a && e.dispatch({ effects: F.of(s) });
}
function Dr() {
  return Le.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const r = e.state.facet(A) !== this.lastKey, a = !!I(e.state.doc), o = a && !this.hadCover;
      this.hadCover = a, (r || o) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(A);
      this.lastKey = e;
      const r = I(this.view.state.doc);
      if (this.hadCover = !!r, !r) return;
      if (!e) {
        je(this.view, true);
        return;
      }
      const s = ++this.loadGen;
      Mr(e).then((a) => {
        s === this.loadGen && je(this.view, a !== false);
      });
    }
  });
}
function Rr(e) {
  return e.transactions.some((r) => r.effects.some((s) => s.is(C) || s.is(F)));
}
function ms() {
  return [Fr(null), Me({ preparePlaceholder(e, r) {
    const s = E(e);
    return s && Lr(s, r) ? "cover" : "heading";
  }, placeholderDOM(e, r, s) {
    const a = document.createElement("span");
    return a.className = "cm-foldPlaceholder", a.textContent = s === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", a.setAttribute("aria-hidden", "true"), a.onclick = r, a;
  } }), Ie.of((e, r) => {
    const s = I(e.doc);
    if (!s) return null;
    const a = e.doc.lineAt(s.from);
    return r !== a.from ? null : E(e);
  }), Ot({ class: "cm-note-cover-fold-gutter", lineMarker(e, r) {
    const s = K(e.state, r.from);
    if (!s) return null;
    const a = !L(e.state, s);
    return new be(a, s.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || Rr(e), initialSpacer: () => new be(true, "heading"), domEventHandlers: { mousedown(e, r, s) {
    if (!(s instanceof MouseEvent) || s.button !== 0) return false;
    const a = K(e.state, r.from);
    if (!a) return false;
    if (a.kind === "cover") {
      if (!ve(e)) return false;
    } else {
      const o = s.target instanceof Element ? s.target.closest(".cm-note-cover-fold-chevron") : null;
      We(o, L(e.state, a)), ye(e, a);
    }
    return s.preventDefault(), s.stopPropagation(), true;
  } } }), Ut({ domEventHandlers: { mousedown(e, r, s) {
    if (!(s instanceof MouseEvent) || s.button !== 0) return false;
    const a = I(e.state.doc);
    if (a && r.from >= a.from && r.from < a.to) return ve(e) ? (s.preventDefault(), true) : false;
    const o = K(e.state, r.from);
    return !o || o.kind !== "heading" ? false : (ye(e, o), s.preventDefault(), true);
  } } }), Dr(), q.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function Br({ cover: e, getPresignedUrl: r }) {
  const s = ft(e.pageSizeId) ? e.pageSizeId : mt, a = m.useMemo(() => ({ ...xt(), pageSizeId: s }), [s]), o = m.useMemo(() => ht(s), [s]), n = m.useMemo(() => gt(a), [a]);
  return t.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": s, style: n, children: t.jsx(qt, { cover: e, getPresignedUrl: r, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${o.widthMm} / ${o.heightMm}` } }) });
}
const P = /* @__PURE__ */ new WeakMap(), Ve = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", $r = "\uD45C\uC9C0";
function O(e) {
  const r = P.get(e);
  r && (r.unmount(), P.delete(e));
}
function ke(e, r) {
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
function Kr(e) {
  if (!e) return;
  let r = e.querySelector(".md-note-cover-placeholder__fallback");
  if (r || (r = document.createElement("span"), r.className = "md-note-cover-placeholder__fallback", e.appendChild(r)), r.querySelector(".md-note-cover-placeholder__spinner")) return;
  r.replaceChildren();
  const s = document.createElement("span");
  s.className = "md-note-cover-placeholder__spinner", s.setAttribute("aria-hidden", "true");
  const a = document.createElement("span");
  a.className = "md-note-cover-placeholder__fallback-text", a.textContent = Ve, r.append(s, a);
}
function z(e, r) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", r === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", r === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", r === "empty"), r === "pending" ? (Kr(e), ke(e, Ve)) : r === "empty" && ke(e, $r));
}
function zr(e, r, s) {
  let a = P.get(e);
  a || (a = qe.createRoot(e), P.set(e, a)), a.render(m.createElement(Br, { cover: r, getPresignedUrl: s ?? void 0 }));
}
function xs(e, r, s, a) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const o = (a == null ? void 0 : a.load) !== false, { cover: n } = pt(r ?? ""), i = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(n == null ? void 0 : n.enabled)) {
    for (const u of i) {
      O(u);
      const c = u.closest("[data-note-cover-placeholder]");
      z(c, "empty");
    }
    return 0;
  }
  if (!o) {
    for (const u of i) {
      O(u);
      const c = u.closest("[data-note-cover-placeholder]");
      z(c, "pending");
    }
    return 0;
  }
  for (const u of i) {
    const c = u.closest("[data-note-cover-placeholder]");
    z(c, "ready"), zr(u, n, s);
  }
  return i.length;
}
function hs(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const r = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const s of r) O(s);
}
function gs(e) {
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
export {
  Jr as C,
  es as H,
  cs as I,
  ss as W,
  gs as a,
  os as b,
  ms as c,
  ns as d,
  ds as e,
  ts as f,
  us as g,
  rs as h,
  xs as i,
  is as j,
  Sr as k,
  ls as m,
  fs as s,
  hs as t,
  as as u
};
