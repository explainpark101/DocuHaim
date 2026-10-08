var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as h, j as n, c as nt } from "./vendor-react-BLJzfvPB.js";
import { A as ot, m as st, a as Y } from "./vendor-motion-DSEw68MZ.js";
import { p as Te, s as at, a as lt } from "./emojiShortcode-d5Fgeg8O.js";
import { an as it, F as dt, T as ct, eh as re, ei as ut, ae as R, ej as ft, ek as ne, G as oe, el as mt, b3 as ht, em as xt, ed as se, c as gt, n as O, C as ae, en as le, eo as ie, ep as pt, eq as bt, aL as yt, er as vt, es as kt, et as jt, eu as Nt, ev as St, ew as wt, ex as Ct } from "./index-DGTET6JD.js";
import { aB as Et, g as de, aC as $, aD as H, aE as Mt, n as Ft, aF as Ae, j as Tt, k as Ie, aG as ce, X, y as Q, aH as At, L as It } from "./vendor-lucide--whUmDUa.js";
import { h as Lt, b as z, d as G, y as _t, z as Dt, B as Pt, D as Rt, E as Bt, G as Kt, H as Ot, K as $t, a2 as Ht, M as zt, S as Gt, g as Ut, i as ue, j as fe, k as me, l as he, A as xe } from "./vendor-radix-4pFcYp0u.js";
import { N as Wt } from "./WikiImageSizeModal-B-ouW2RW.js";
import { t as Vt, O as qt } from "./index-Dj2EGo58.js";
import { C as Z, g as Le, E as J, S as _e, D as ge, W as Yt, G as De, I as _, J as C, K as Pe, L as D, V as Re, M as Be, P as B, k as K, n as Xt, o as T, N as Qt, y as Zt, O as Jt, Q as er, T as tr } from "./vendor-codemirror-C7kLKAJE.js";
import { m as Ke } from "./appMarkdownItPlugins-DX2-q6L2.js";
import { r as rr, l as nr } from "./haimCodeTabSettings-BI7a8VYQ.js";
import { r as or, p as sr, a as ar } from "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import { C as lr } from "./TableEditModal-YctaxpH4.js";
import { t as ir, a as dr, b as cr, c as ur, d as fr, e as mr, f as hr, g as xr, i as pe, w as gr, h as pr } from "./mdEditorSelectionWrap-BH3PjePc.js";
function br(e) {
  const t = String(e ?? "").split(`
`), r = [];
  let o = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, s = 0, a = 0;
  t.forEach((i, u) => {
    var _a;
    const x = i.match(/^(#{1,6})\s+(.*)/);
    if (x) {
      (o.tasks.length > 0 || o.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && r.push(o), o = { name: (x[2] ?? "").trim(), tasks: [] };
      return;
    }
    const f = i.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX~])\]\s+(.*)/);
    if (f) {
      const j = Math.floor((((_a = f[1]) == null ? void 0 : _a.length) ?? 0) / 2), y = Te(f[3]), p = y === "done", k = (f[4] ?? "").trim();
      s += 1, p && (a += 1), o.tasks.push({ id: `line-${u}`, lineIndex: u, indent: j, completed: p, status: y, text: k, rawLine: i });
    }
  }), o.tasks.length > 0 && r.push(o);
  const l = s > 0 ? Math.round(a / s * 100) : 0;
  return { categories: r, totalTasks: s, completedTasks: a, pendingTasks: s - a, percentage: l };
}
function yr(e, t) {
  const r = String(e ?? "").split(`
`);
  if (t < 0 || t >= r.length) return e;
  const s = (r[t] ?? "").match(/^(\s*(?:[-*]|\d+\.)\s+)\[([ xX~])\](.*)$/);
  if (!s) return e;
  const a = it(e), l = at(lt(Te(s[2]), a), a);
  return r[t] = `${s[1]}[${l}]${s[3] ?? ""}`, r.join(`
`);
}
function vr({ markdown: e = "", onMarkdownChange: t }) {
  const [r, o] = h.useState(""), [s, a] = h.useState("all"), [l, i] = h.useState({}), [u, x] = h.useState("dashboard"), f = h.useMemo(() => br(e), [e]), j = h.useMemo(() => f.categories.map((m) => m.name).join("\0"), [f.categories]);
  h.useEffect(() => {
    const m = {};
    for (const b of j ? j.split("\0") : []) b && (m[b] = true);
    i(m);
  }, [j]);
  const y = (m) => {
    typeof t == "function" && t(yr(e, m));
  }, p = (m) => {
    i((b) => ({ ...b, [m]: !b[m] }));
  }, k = (m) => {
    const b = m.text.toLowerCase().includes(r.toLowerCase()), N = s === "all" ? true : s === "completed" ? m.completed : !m.completed;
    return b && N;
  };
  return n.jsxs("div", { className: "@container space-y-3 text-xs text-slate-100", children: [n.jsxs("div", { className: "grid grid-cols-2 gap-2 @[380px]:grid-cols-4", children: [n.jsxs("div", { className: "relative min-h-19 overflow-hidden rounded-xl border border-indigo-500/30 bg-linear-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [n.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: n.jsx(Et, { className: "h-14 w-14 text-indigo-400 @[380px]:h-16 @[380px]:w-16" }) }), n.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), n.jsx("div", { className: "my-1 flex items-baseline gap-1", children: n.jsxs("span", { className: "text-2xl font-extrabold text-white @[380px]:text-3xl", children: [f.percentage, "%"] }) }), n.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: n.jsx("div", { className: "h-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${f.percentage}%` } }) })] }), n.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [n.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [n.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), n.jsx(de, { className: "h-3.5 w-3.5 text-slate-500" })] }), n.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [f.totalTasks, " ", n.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), n.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [n.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [n.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), n.jsx($, { className: "h-3.5 w-3.5" })] }), n.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [f.completedTasks, " ", n.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), n.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [n.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [n.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), n.jsx(H, { className: "h-3.5 w-3.5" })] }), n.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [f.pendingTasks, " ", n.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), n.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [n.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [n.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [n.jsxs("button", { type: "button", onClick: () => x("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${u === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [n.jsx(Mt, { className: "h-3 w-3" }), n.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), n.jsxs("button", { type: "button", onClick: () => x("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${u === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [n.jsx(de, { className: "h-3 w-3" }), n.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), n.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [n.jsxs("div", { className: "relative min-w-30 flex-1", children: [n.jsx(Ft, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), n.jsx("input", { type: "text", value: r, onChange: (m) => o(m.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), n.jsxs("select", { value: s, onChange: (m) => a(m.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [n.jsx("option", { value: "all", children: "\uC804\uCCB4" }), n.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), n.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), u === "dashboard" && n.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: f.categories.length === 0 ? n.jsxs("div", { className: "py-8 text-center text-slate-500", children: [n.jsx(Ae, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), n.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), n.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : f.categories.map((m, b) => {
    const N = m.tasks.length, S = m.tasks.filter((g) => g.completed).length, w = N > 0 ? Math.round(S / N * 100) : 0, c = !!l[m.name], d = m.tasks.filter(k);
    return r && d.length === 0 ? null : n.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [n.jsxs("button", { type: "button", onClick: () => p(m.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [n.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [n.jsx("span", { className: "shrink-0 text-slate-500", children: c ? n.jsx(Tt, { className: "h-3.5 w-3.5" }) : n.jsx(Ie, { className: "h-3.5 w-3.5" }) }), n.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: m.name })] }), n.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [n.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [n.jsx("strong", { className: "text-slate-200", children: S }), " /", " ", N] }), n.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${w === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [w, "%"] })] })] }), c ? n.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: d.length === 0 ? n.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : d.map((g) => n.jsxs("button", { type: "button", onClick: () => y(g.lineIndex), style: { paddingLeft: `${g.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [n.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: g.completed ? n.jsx($, { className: "h-3.5 w-3.5 text-emerald-400" }) : g.status === "doing" ? n.jsx(ce, { className: "h-3.5 w-3.5 text-amber-400" }) : n.jsx(H, { className: "h-3.5 w-3.5 text-slate-600" }) }), n.jsx("span", { className: `leading-relaxed ${g.completed ? "text-slate-500 line-through" : g.status === "doing" ? "text-amber-200/90" : "text-slate-300"}`, children: g.text })] }, g.id)) }) : null] }, `${m.name}-${b}`);
  }) }), u === "checklist" ? n.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: f.categories.map((m, b) => {
    const N = m.tasks.filter(k);
    return N.length === 0 ? null : n.jsxs("div", { className: "space-y-1", children: [n.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [m.name, " (", N.length, ")"] }), N.map((S) => n.jsxs("button", { type: "button", onClick: () => y(S.lineIndex), style: { paddingLeft: `${S.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [n.jsx("span", { className: "mt-0.5 shrink-0", children: S.completed ? n.jsx($, { className: "h-3.5 w-3.5 text-emerald-400" }) : S.status === "doing" ? n.jsx(ce, { className: "h-3.5 w-3.5 text-amber-400" }) : n.jsx(H, { className: "h-3.5 w-3.5 text-slate-600" }) }), n.jsx("span", { className: `leading-relaxed ${S.completed ? "text-slate-500 line-through" : S.status === "doing" ? "text-amber-200/90" : "text-slate-200"}`, children: S.text })] }, S.id))] }, `${m.name}-list-${b}`);
  }) }) : null] })] });
}
const kr = ct, jr = "s3haim_checklist_progress_sidebar_width", Nr = 360, Sr = 260, wr = 560, Cr = [0.32, 0.72, 0, 1], Er = { type: "spring", stiffness: 420, damping: 36, mass: 0.85 };
function Kn({ open: e, onOpenChange: t, markdown: r, onMarkdownChange: o, overlay: s = false }) {
  const { width: a, isResizing: l, handleProps: i } = dt({ storageKey: jr, defaultWidth: Nr, minWidth: Sr, maxWidth: wr, edge: "right", collapseBelowWidth: 180, onCollapseBelowMin: () => t == null ? void 0 : t(false) }), u = s ? ["absolute inset-y-0 right-0 z-30 flex flex-col overflow-hidden", "rounded-bl-md border border-slate-200/80 border-t-0 bg-white/95 shadow-lg", "dark:border-odp-borderStrong/80 dark:bg-odp-surface/95 dark:shadow-black/40"].join(" ") : "relative flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-300 bg-white/95 dark:border-odp-borderStrong dark:bg-odp-surface/95", x = () => t == null ? void 0 : t(false);
  return n.jsx(ot, { initial: false, children: e ? n.jsx(st.aside, { role: "complementary", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", className: u, style: s ? { width: a, willChange: "transform, opacity" } : { overflow: "hidden", willChange: "width, opacity" }, initial: s ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, animate: s ? { x: 0, opacity: 1 } : { width: a, opacity: 1 }, exit: s ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, transition: l ? { duration: 0 } : s ? { type: "tween", duration: 0.22, ease: Cr } : Er, children: n.jsxs("div", { className: "relative flex h-full min-h-0 w-full flex-col", style: s ? void 0 : { width: a }, children: [n.jsx(kr, { edge: "left", handleProps: i, isResizing: l, visibleOnHover: true, label: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), n.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-2.5 py-2 dark:border-odp-borderSoft", children: [n.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong", children: [n.jsx(Ae, { size: 14, className: "shrink-0 text-indigo-500 dark:text-indigo-300", "aria-hidden": true }), n.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), n.jsx("button", { type: "button", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB2EB\uAE30", onClick: x, className: "inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: n.jsx(X, { size: 14 }) })] }), n.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-2.5", children: String(r ?? "").trim() ? n.jsx(vr, { markdown: r, onMarkdownChange: o }) : n.jsxs("p", { className: "rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted", children: ["\uBB38\uC11C\uC5D0 \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", n.jsx("br", {}), "`- [ ]` \uD56D\uBAA9\uC744 \uCD94\uAC00\uD574 \uBCF4\uC138\uC694."] }) })] }) }, s ? "checklist-overlay" : "checklist-dock") : null });
}
const Mr = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], Fr = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], Tr = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], Ar = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Ir = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", be = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function On({ isOpen: e, markdown: t, selectedMarkdown: r = "", onClose: o, onApply: s }) {
  const a = r.length > 0, [l, i] = h.useState("document"), [u, x] = h.useState(1), [f, j] = h.useState(false), [y, p] = h.useState("nested"), [k, m] = h.useState(1), b = l === "selection" ? r : t;
  h.useEffect(() => {
    if (!e) return;
    const c = a ? "selection" : "document";
    i(c), x(re(c === "selection" ? r : t)), j(false), p("nested"), m(1);
  }, [e, t, r, a]), h.useEffect(() => {
    if (!e) return;
    const c = (v) => {
      const F = v;
      return (F == null ? void 0 : F.closest) ? !!F.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, d = () => {
      const v = document.activeElement;
      v && c(v) && typeof v.blur == "function" && v.blur();
    };
    d();
    const g = (v) => {
      if (v.metaKey || v.ctrlKey || v.altKey) return;
      const F = v.key;
      if (F >= "1" && F <= "9") {
        const te = Number(F);
        ne(te) && (v.preventDefault(), v.stopPropagation(), v.stopImmediatePropagation(), x(te));
        return;
      }
      v.key === "Escape" || v.key === "Enter" || c(v.target) && (v.preventDefault(), v.stopPropagation(), v.stopImmediatePropagation(), d());
    };
    return window.addEventListener("keydown", g, true), () => window.removeEventListener("keydown", g, true);
  }, [e]);
  const N = h.useMemo(() => ut(b, u, { maxLevel: se, renumberOutline: f, outlineStyle: y, outlineStart: k }), [b, u, f, y, k]), S = (c) => {
    if (c !== "selection" && c !== "document" || c === "selection" && !a) return;
    i(c), x(re(c === "selection" ? r : t));
  }, w = () => {
    if (!N.sourceMax) return;
    const c = xt(b, u, { maxLevel: se, renumberOutline: f, outlineStyle: y, outlineStart: k });
    c !== b && s(c, l), o();
  };
  return n.jsx(R, { isOpen: e, onClose: o, onConfirm: w, contentClassName: "max-w-3xl", children: n.jsx(Lt, { delayDuration: 250, skipDelayDuration: 0, children: n.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [n.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), n.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), n.jsxs("div", { className: "mt-4", children: [n.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), n.jsx(z, { className: "flex items-center gap-2", value: l, onValueChange: S, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: Mr.map((c) => {
    const d = l === c.value, g = c.value === "selection" && !a;
    return n.jsx(G, { value: c.value, disabled: g, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", d ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: n.jsxs("div", { className: d ? "" : "opacity-50", children: [n.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: c.title }), n.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: c.value === "selection" && !a ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : c.description })] }) }, c.value);
  }) })] }), n.jsxs("div", { className: "mt-4", children: [n.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), n.jsxs(_t, { value: String(u), onValueChange: (c) => {
    const d = Number(c);
    ne(d) && x(d);
  }, children: [n.jsxs(Dt, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [n.jsx(Pt, {}), n.jsx(Rt, { className: "text-gray-500", children: n.jsx(Ie, { size: 14 }) })] }), n.jsx(Bt, { children: n.jsx(Kt, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: n.jsx(Ot, { className: "p-1", children: ft.map((c) => n.jsxs($t, { value: String(c), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [n.jsx(Ht, { className: "absolute left-1.5 inline-flex items-center", children: n.jsx(Q, { size: 12 }) }), n.jsx(zt, { children: `h${c}` })] }, c)) }) }) })] })] }), n.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [n.jsxs("div", { className: "flex items-center justify-between gap-3", children: [n.jsxs("div", { className: "min-w-0", children: [n.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), n.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), n.jsx(Gt, { className: Ar(f), checked: f, onCheckedChange: j, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: n.jsx(Ut, { className: Ir }) })] }), f ? n.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [n.jsxs("div", { children: [n.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), n.jsx(z, { className: "flex items-center gap-2", value: y, onValueChange: (c) => {
    (c === "flat" || c === "nested") && p(c);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: Fr.map((c) => {
    const d = y === c.value;
    return n.jsx(G, { value: c.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", d ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: n.jsxs("div", { className: d ? "" : "opacity-50", children: [n.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: c.title }), n.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: c.description })] }) }, c.value);
  }) })] }), n.jsxs("div", { children: [n.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), n.jsx(z, { className: "flex items-center gap-2", value: String(k), onValueChange: (c) => {
    c === "1" && m(1), c === "2" && m(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: Tr.map((c) => {
    const d = k === c.value;
    return n.jsx(G, { value: String(c.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", d ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: n.jsxs("div", { className: d ? "" : "opacity-50", children: [n.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: c.title }), n.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: c.description })] }) }, c.value);
  }) })] })] }) : null] }), n.jsx("div", { className: "mt-4 min-h-0", children: N.rows.length ? n.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: n.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [n.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: n.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [n.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), n.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), n.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), n.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), n.jsx("tbody", { children: N.rows.map((c, d) => n.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [n.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: n.jsxs(ue, { children: [n.jsx(fe, { asChild: true, children: n.jsx("span", { className: "block truncate", children: c.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), n.jsx(me, { children: n.jsxs(he, { side: "top", sideOffset: 6, className: be, children: [c.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", n.jsx(xe, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), n.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: n.jsxs(ue, { children: [n.jsx(fe, { asChild: true, children: n.jsx("span", { className: "block truncate", children: c.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), n.jsx(me, { children: n.jsxs(he, { side: "top", sideOffset: 6, className: be, children: [c.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", n.jsx(xe, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), n.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", c.from] }), n.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", c.to] })] }, `${c.from}-${d}-${c.text}`)) })] }) }) : n.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: l === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), n.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [n.jsxs(oe, { type: "button", variant: "secondary", size: "md", onClick: o, children: [n.jsx(mt, { size: 16 }), "\uCDE8\uC18C"] }), n.jsxs(oe, { type: "button", variant: "primary", size: "md", onClick: w, disabled: !N.sourceMax, children: [n.jsx(ht, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function $n({ isOpen: e, onClose: t, onConfirm: r }) {
  const [o, s] = h.useState(""), [a, l] = h.useState(""), [i, u] = h.useState("");
  h.useEffect(() => {
    e && (s(""), l(""), u(""));
  }, [e]);
  const x = () => {
    const f = a.trim();
    if (!f) {
      u("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    r({ desc: o.trim(), url: f }), t();
  };
  return n.jsx(R, { isOpen: e, onClose: t, onConfirm: x, ignoreEnterInFields: true, children: n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [n.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), n.jsxs("label", { className: "block", children: [n.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), n.jsx("input", { type: "text", value: o, onChange: (f) => s(f.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), n.jsxs("label", { className: "block", children: [n.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), n.jsx("input", { type: "text", value: a, onChange: (f) => l(f.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), i ? n.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: i }) : null, n.jsxs("div", { className: "flex justify-end gap-2", children: [n.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [n.jsx(X, { size: 16 }), "\uCDE8\uC18C"] }), n.jsxs("button", { type: "button", onClick: x, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [n.jsx(Q, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Hn({ isOpen: e, file: t, onClose: r, onConfirm: o }) {
  const [s, a] = h.useState("");
  return h.useEffect(() => {
    if (!e || !t) {
      a("");
      return;
    }
    const l = URL.createObjectURL(t);
    return a(l), () => {
      URL.revokeObjectURL(l);
    };
  }, [e, t]), n.jsx(R, { isOpen: e && !!t, onClose: r, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: s ? n.jsx(Wt, { imageSrc: s, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: r, onConfirm: o }) : null });
}
const Lr = 8192, _r = 16;
function ye(e) {
  return Math.min(Lr, Math.max(_r, Math.round(e)));
}
function Dr(e) {
  const t = (e || "#ffffff").trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(t) ? t : "#ffffff";
}
async function ve(e) {
  const t = ye(e.width), r = ye(e.height), o = Dr(e.background ?? "#ffffff"), s = document.createElement("canvas");
  s.width = t, s.height = r;
  const a = s.getContext("2d");
  if (!a) throw new Error("Canvas 2D unavailable");
  a.clearRect(0, 0, t, r), a.fillStyle = o, a.fillRect(0, 0, t, r);
  const l = await new Promise((i) => {
    s.toBlob((u) => i(u), "image/png");
  });
  if (!l) throw new Error("Failed to encode whiteboard PNG");
  return new File([l], `whiteboard-${t}x${r}.png`, { type: "image/png" });
}
const Pr = [{ id: "hd", label: "1280\xD7720", width: 1280, height: 720 }, { id: "fhd", label: "1920\xD71080", width: 1920, height: 1080 }, { id: "sq", label: "1080\xD71080", width: 1080, height: 1080 }, { id: "a4", label: "A4~", width: 794, height: 1123 }], Rr = [{ id: "white", label: "\uD770\uC0C9", value: "#ffffffff" }, { id: "paper", label: "\uD06C\uB9BC", value: "#fff8e7ff" }, { id: "gray", label: "\uD68C\uC0C9", value: "#f3f4f6ff" }, { id: "black", label: "\uAC80\uC815", value: "#111827ff" }, { id: "clear", label: "\uD22C\uBA85", value: "#00000000" }];
function zn({ isOpen: e, onClose: t, onConfirm: r, disabled: o = false }) {
  const [s, a] = h.useState(1920), [l, i] = h.useState(1080), [u, x] = h.useState("#ffffffff"), [f, j] = h.useState(""), [y, p] = h.useState(false), [k, m] = h.useState("");
  h.useEffect(() => {
    e && (a(1920), i(1080), x("#ffffffff"), j(""), p(false));
  }, [e]);
  const b = gt(O(u) || "#ffffffff");
  h.useEffect(() => {
    if (!e) {
      m("");
      return;
    }
    let d = false, g = "";
    return (async () => {
      try {
        const v = await ve({ width: s, height: l, background: u });
        if (d) return;
        g = URL.createObjectURL(v), m(g);
      } catch {
        d || m("");
      }
    })(), () => {
      d = true, g && URL.revokeObjectURL(g);
    };
  }, [e, s, l, u]);
  const N = h.useMemo(() => {
    const g = Math.min(1, 220 / Math.max(s, l, 1));
    return { width: Math.max(24, Math.round(s * g)), height: Math.max(24, Math.round(l * g)) };
  }, [s, l]), S = async () => {
    if (!(o || y)) {
      if (s < 16 || l < 16) {
        j("\uD06C\uAE30\uB294 16px \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
        return;
      }
      p(true), j("");
      try {
        const d = await ve({ width: s, height: l, background: u });
        await r(d), t();
      } catch (d) {
        j(d instanceof Error ? d.message : "\uD654\uC774\uD2B8\uBCF4\uB4DC\uB97C \uB123\uB294 \uB370 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        p(false);
      }
    }
  }, w = (d) => {
    d.key === "Enter" && (!(d.metaKey || d.ctrlKey) || d.altKey || d.shiftKey || d.nativeEvent.isComposing || d.keyCode === 229 || (d.preventDefault(), d.stopPropagation(), S()));
  }, c = y || o;
  return n.jsx(R, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [n.jsxs("div", { className: "flex items-center gap-2", children: [n.jsx(At, { size: 20, className: "text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }), n.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30" })] }), n.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uBE48 \uCE94\uBC84\uC2A4 PNG\uB97C \uB9CC\uB4E4\uC5B4 \uB178\uD2B8\uC5D0", " ", n.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "![[path]]" }), " ", "\uB85C \uB123\uC740 \uB4A4, \uD06C\uAC8C \uBCF4\uAE30(\uB354\uBE14\uD074\uB9AD)\uC5D0\uC11C \uBC14\uB85C \uADF8\uB9B4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), n.jsx("div", { className: "flex flex-wrap gap-1.5", children: Pr.map((d) => n.jsx("button", { type: "button", disabled: c, className: `rounded-md border px-2 py-1 text-[11px] ${s === d.width && l === d.height ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200" : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`, onClick: () => {
    a(d.width), i(d.height);
  }, children: d.label }, d.id)) }), n.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [n.jsxs("label", { className: "block", children: [n.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB108\uBE44 (px)" }), n.jsx("input", { type: "number", min: 16, max: 8192, value: s, disabled: c, onChange: (d) => a(Number(d.target.value) || 16), onKeyDown: w, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), n.jsxs("label", { className: "block", children: [n.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB192\uC774 (px)" }), n.jsx("input", { type: "number", min: 16, max: 8192, value: l, disabled: c, onChange: (d) => i(Number(d.target.value) || 16), onKeyDown: w, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), n.jsxs("div", { className: "flex flex-col gap-2", children: [n.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uBC30\uACBD\uC0C9" }), n.jsx("div", { className: "flex flex-wrap gap-1.5", children: Rr.map((d) => n.jsxs("button", { type: "button", disabled: c, "aria-label": d.label, className: `inline-flex h-8 items-center gap-1.5 rounded-md border px-2 text-[11px] ${u.toLowerCase() === d.value ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40" : "border-gray-300 dark:border-odp-borderStrong"}`, onClick: () => x(d.value), children: [n.jsx("span", { className: "inline-block h-4 w-4 overflow-hidden rounded border border-black/10", style: ae, children: n.jsx("span", { className: "block h-full w-full", style: { backgroundColor: d.value } }) }), d.label] }, d.id)) }), n.jsxs("div", { className: "rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong", children: [n.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: n.jsx(Vt, { color: b, onChange: (d) => {
    const g = O(d.startsWith("#") ? d : `#${d}`);
    g && x(g);
  } }) }), n.jsx(qt, { alpha: true, prefixed: true, color: b, onChange: (d) => {
    const g = O(d.startsWith("#") ? d : `#${d}`);
    g && x(g);
  }, className: "mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), n.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 p-4 dark:border-odp-borderStrong", style: ae, children: [k ? n.jsx("img", { src: k, alt: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uBBF8\uB9AC\uBCF4\uAE30", style: { width: N.width, height: N.height }, className: "object-contain shadow-sm" }) : n.jsx("div", { className: "flex h-28 w-40 items-center justify-center text-xs text-gray-400", children: "\uBBF8\uB9AC\uBCF4\uAE30" }), n.jsxs("span", { className: "text-[10px] text-gray-500 dark:text-odp-muted", children: [s, " \xD7 ", l, "px"] })] }), f ? n.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: f }) : null, n.jsxs("div", { className: "flex justify-end gap-2", children: [n.jsxs("button", { type: "button", onClick: t, disabled: y, className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: [n.jsx(X, { size: 14, "aria-hidden": true }), "\uCDE8\uC18C"] }), n.jsxs("button", { type: "button", onClick: () => {
    S();
  }, disabled: c, className: "inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50", children: [y ? n.jsx(It, { size: 14, className: "animate-spin", "aria-hidden": true }) : n.jsx(Q, { size: 14, "aria-hidden": true }), "\uC0BD\uC785"] })] })] }) });
}
function Gn() {
  const [e, t] = h.useState(le);
  h.useEffect(() => {
    const o = () => t(le());
    return window.addEventListener(ie, o), () => {
      window.removeEventListener(ie, o);
    };
  }, []);
  const r = h.useCallback((o) => {
    t((s) => {
      const a = typeof o == "function" ? o(s) : !!o;
      return pt(a), a;
    });
  }, []);
  return [e, r];
}
const Br = 48, ke = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, Oe = _e.define(), $e = _e.define(), He = new Z();
function Kr(e) {
  const t = [];
  ke.lastIndex = 0;
  let r;
  for (; (r = ke.exec(e)) !== null; ) {
    const o = r[1] ?? "image", s = r[2] ?? "";
    if (s.length < Br) continue;
    const a = r[0], l = a.length - s.length, i = r.index + l;
    t.push({ from: i, to: r.index + a.length, mime: o });
  }
  return t;
}
function Or(e, t) {
  const r = Math.round(t * 3 / 4), o = r >= 1024 * 1024 ? `${(r / (1024 * 1024)).toFixed(1)}MB` : r >= 1024 ? `${Math.max(1, Math.round(r / 1024))}KB` : `${r}B`;
  return `\u2026${e} ${o}\u2026`;
}
class $r extends Yt {
  constructor(t, r, o) {
    super(), this.label = t, this.from = r, this.to = o;
  }
  toDOM(t) {
    const r = document.createElement("span");
    return r.textContent = this.label, r.className = "cm-base64-image-fold", r.title = "Click to expand base64 image data", r.addEventListener("mousedown", (o) => {
      o.preventDefault(), o.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: Oe.of({ from: this.from, to: this.to }) }), t.focus();
    }), r.addEventListener("click", (o) => {
      o.preventDefault();
    }), r;
  }
  ignoreEvent() {
    return false;
  }
  eq(t) {
    return this.label === t.label && this.from === t.from && this.to === t.to;
  }
}
function Hr(e, t, r) {
  return e.some((o) => o.from === t && o.to === r);
}
function je(e, t) {
  const r = [], o = [];
  for (let s = 1; s <= e.doc.lines; s += 1) {
    const a = e.doc.line(s);
    for (const l of Kr(a.text)) {
      const i = a.from + l.from, u = a.from + l.to;
      if (Hr(t, i, u)) {
        o.push({ from: i, to: u });
        continue;
      }
      r.push(ge.replace({ widget: new $r(Or(l.mime, u - i), i, u) }).range(i, u));
    }
  }
  return { deco: ge.set(r, true), expanded: o };
}
const ze = Le.define({ create(e) {
  return je(e, []);
}, update(e, t) {
  let r = e.expanded;
  t.docChanged && r.length && (r = r.map(({ from: s, to: a }) => ({ from: t.changes.mapPos(s, 1), to: t.changes.mapPos(a, -1) })).filter(({ from: s, to: a }) => s < a));
  let o = r !== e.expanded;
  for (const s of t.effects) s.is(Oe) ? (r = [{ from: s.value.from, to: s.value.to }], o = true) : s.is($e) && r.length > 0 && (r = [], o = true);
  return t.docChanged || o ? je(t.state, r) : e;
}, provide: (e) => J.decorations.from(e, (t) => t.deco) }), zr = J.domEventHandlers({ mousedown(e, t) {
  const r = t.state.field(ze, false);
  if (!r || r.expanded.length === 0) return false;
  const o = e.target;
  if (!(o instanceof Node) || !t.dom.contains(o)) return false;
  const s = t.posAtDOM(o, 0);
  return s !== -1 && r.expanded.some(({ from: a, to: l }) => s >= a && s <= l) || t.dispatch({ effects: $e.of(null) }), false;
} });
function Ge() {
  return [ze, zr];
}
function Un(e) {
  return He.of(e ? Ge() : []);
}
function Wn(e, t) {
  if (e) try {
    e.dispatch({ effects: He.reconfigure(t ? Ge() : []) });
  } catch {
  }
}
const Ue = new Z();
function Gr(e, t, r) {
  let o = false;
  return Be(e).between(t, r, () => {
    o = true;
  }), o;
}
function Ur(e) {
  const t = [], r = e.doc.toString();
  return D(e).iterate({ enter(o) {
    if (o.name !== "FencedCode") return;
    const s = Ke(r, o.from, o.to);
    s && t.push(s);
  } }), t;
}
function We(e, t, r) {
  return e.some((o) => o.from === t && o.to === r);
}
const Ve = Le.define({ create() {
  return [];
}, update(e, t) {
  let r = e;
  t.docChanged && r.length && (r = r.map(({ from: s, to: a }) => ({ from: t.changes.mapPos(s, 1), to: t.changes.mapPos(a, -1) })).filter(({ from: s, to: a }) => s < a));
  let o = r !== e;
  for (const s of t.effects) if (s.is(_)) We(r, s.value.from, s.value.to) || (r = [...r, s.value], o = true);
  else if (s.is(C)) {
    const a = r.filter((l) => l.from !== s.value.from || l.to !== s.value.to);
    a.length !== r.length && (r = a, o = true);
  }
  return o ? r : e;
} });
function Ne(e) {
  const t = e.state.field(Ve), r = [];
  for (const o of Ur(e.state)) We(t, o.from, o.to) || Gr(e.state, o.from, o.to) || r.push(C.of(o));
  r.length > 0 && e.dispatch({ effects: r });
}
const Wr = Re.fromClass(class {
  constructor(e) {
    Ne(e);
  }
  update(e) {
    e.docChanged && Ne(e.view);
  }
}), Vr = Pe.of((e, t) => {
  const r = e.doc.toString();
  let o = null;
  return D(e).iterate({ enter(s) {
    if (s.name !== "FencedCode" || e.doc.lineAt(s.from).from !== t) return;
    const l = Ke(r, s.from, s.to);
    if (l) return o = l, false;
  } }), o;
});
function qe() {
  return [Ve, De(), Vr, Wr];
}
function Vn(e) {
  return Ue.of(e ? qe() : []);
}
function qn(e, t) {
  if (e) try {
    e.dispatch({ effects: Ue.reconfigure(t ? qe() : []) });
  } catch {
  }
}
function qr(e) {
  var _a, _b;
  if (!(e == null ? void 0 : e.state)) return false;
  const t = (_b = (_a = e.state.selection) == null ? void 0 : _a.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return false;
  const r = e.state.doc.lineAt(t);
  return e.dispatch({ changes: { from: r.from, to: r.from, insert: `
` }, selection: { anchor: r.from }, scrollIntoView: true }), true;
}
function Yn(e) {
  return e.altKey || !e.shiftKey || !(e.ctrlKey || e.metaKey) ? false : (e.key || "").toLowerCase() === "enter" ? true : e.code === "Enter" || e.code === "NumpadEnter";
}
const Yr = { key: "Mod-Shift-Enter", preventDefault: true, run: qr }, Xn = B.highest(K.of([Yr]));
function Xr(e, t, r) {
  var _a, _b;
  let o = "";
  if (D(e).iterate({ from: t, to: r, enter(l) {
    if (l.name === "CodeInfo") return o = e.doc.sliceString(l.from, l.to).trim(), false;
  } }), o) return o;
  const s = e.doc.lineAt(t).text;
  return ((_b = (_a = /^`{3,}\s*([^\s`]+)/.exec(s)) == null ? void 0 : _a[1]) == null ? void 0 : _b.trim()) ?? "";
}
function E(e, t) {
  let o = D(e).resolveInner(t, -1);
  for (let s = o; s; s = s.parent) {
    if (s.name !== "FencedCode") continue;
    let a = -1, l = -1;
    for (let i = s.firstChild; i; i = i.nextSibling) if (i.name === "CodeText") {
      a = i.from, l = i.to;
      break;
    }
    return a < 0 || l < a || t < a || t > l ? null : { language: Xr(e, s.from, s.to), bodyFrom: a, bodyTo: l };
  }
  return null;
}
function Ye(e) {
  return rr(e, nr());
}
function Se(e, t) {
  var _a;
  const r = ((_a = e.match(/^ */)) == null ? void 0 : _a[0]) ?? "";
  return Math.min(r.length, t);
}
function ee(e, t, r, o, s) {
  const a = [], l = e.doc.lineAt(Math.max(o, t)), i = Math.max(o, Math.min(s, r)), u = e.doc.lineAt(Math.max(t, Math.min(i, r)));
  for (let x = l.number; x <= u.number; x += 1) {
    const f = e.doc.line(x);
    f.from >= r || f.to < t || f.from < t || f.from >= r || o < f.to && s > f.from && a.push(f.from);
  }
  return a;
}
function Qr(e, t) {
  const { from: r, to: o, empty: s } = e.selection.main, a = E(e, r);
  if (!a) return null;
  if (!s) {
    const y = E(e, Math.max(r, o - 1));
    if (!y || y.bodyFrom !== a.bodyFrom) return null;
  }
  const l = Math.max(1, Math.round(t)), i = " ".repeat(l);
  if (s) return { changes: { from: r, insert: i }, selection: T.cursor(r + i.length), userEvent: "input.indent" };
  const u = ee(e, a.bodyFrom, a.bodyTo, r, o);
  if (u.length === 0) return null;
  const x = u.map((y) => ({ from: y, insert: i })), f = u[0], j = o + u.length * i.length;
  return { changes: x, selection: T.range(f, j), userEvent: "input.indent" };
}
function Zr(e, t) {
  const { from: r, to: o, empty: s } = e.selection.main, a = E(e, r);
  if (!a) return null;
  if (!s) {
    const p = E(e, Math.max(r, o - 1));
    if (!p || p.bodyFrom !== a.bodyFrom) return null;
  }
  const l = Math.max(1, Math.round(t)), i = s ? (() => {
    const p = e.doc.lineAt(r);
    return p.from < a.bodyFrom || p.from >= a.bodyTo ? [] : [p.from];
  })() : ee(e, a.bodyFrom, a.bodyTo, r, o);
  if (i.length === 0) return null;
  const u = [];
  let x = 0, f = 0;
  for (let p = i.length - 1; p >= 0; p -= 1) {
    const k = i[p], m = e.doc.lineAt(k), b = Se(m.text, l);
    b !== 0 && (u.push({ from: k, to: k + b, insert: "" }), f += b, k < r && (x += b));
  }
  if (f === 0) return { changes: [], userEvent: "delete.dedent" };
  if (s) {
    const p = i[0], k = r - p, m = Se(e.doc.lineAt(p).text, l), b = k <= m ? p : r - m;
    return { changes: u, selection: T.cursor(b), userEvent: "delete.dedent" };
  }
  const j = Math.max(i[0], r - x), y = Math.max(j, o - f);
  return { changes: u, selection: T.range(j, y), userEvent: "delete.dedent" };
}
function Xe(e) {
  const t = E(e, e.selection.main.from);
  return t ? Ye(t.language) : null;
}
function Jr(e) {
  const t = Xe(e.state);
  if (t == null) return false;
  const r = Qr(e.state, t);
  return r ? (e.dispatch(r), true) : false;
}
function en(e) {
  const t = Xe(e.state);
  if (t == null) return false;
  const r = Zr(e.state, t);
  return r ? (e.dispatch(r), true) : false;
}
const tn = { key: "Tab", run: Jr, shift: en }, Qn = B.high(K.of([tn]));
function Zn() {
  return Xt.of(" ".repeat(Ye("")));
}
function rn(e) {
  const { from: t, to: r, empty: o } = e.selection.main, s = E(e, t);
  if (!s) return null;
  if (!o) {
    const i = E(e, Math.max(t, r - 1));
    if (!i || i.bodyFrom !== s.bodyFrom) return null;
  }
  const a = o ? (() => {
    const i = e.doc.lineAt(t);
    return i.from < s.bodyFrom || i.from >= s.bodyTo ? [] : [i.from];
  })() : ee(e, s.bodyFrom, s.bodyTo, t, r);
  if (a.length === 0) return null;
  const l = a.map((i) => {
    const u = e.doc.lineAt(i), x = Math.min(u.to, s.bodyTo);
    return { from: u.from, text: e.doc.sliceString(u.from, x) };
  });
  return { language: s.language, lines: l };
}
function nn(e) {
  return e.map((t) => {
    var _a;
    const r = ((_a = /^\s*/.exec(t.text)) == null ? void 0 : _a[0].length) ?? 0, o = t.from + r, s = t.from + t.text.length;
    return { from: o, to: s, content: t.text.slice(r) };
  });
}
function on(e) {
  return e.map((t) => t.to != null && t.to !== t.from ? { from: t.from, to: t.to, insert: t.insert } : { from: t.from, insert: t.insert });
}
function sn(e) {
  const t = rn(e);
  if (!t) return null;
  const r = or(t.language);
  let o = null;
  if (r.line ? o = sr(t.lines, r.line) : r.block && (o = ar(nn(t.lines), r.block.open, r.block.close)), !o || o.length === 0) return null;
  const s = on(o), { from: a, to: l, empty: i } = e.selection.main, u = e.changes(s);
  return i ? { changes: u, selection: T.cursor(u.mapPos(a, 1)), userEvent: "input.comment" } : { changes: u, selection: T.range(u.mapPos(a, -1), u.mapPos(l, 1)), userEvent: "input.comment" };
}
function an(e) {
  if (e.state.readOnly) return false;
  const t = sn(e.state);
  return t ? (e.dispatch(t), true) : false;
}
const ln = { key: "Mod-/", run: an }, Jn = B.high(K.of([ln])), Qe = new yt("s3haim-note-cover-fold");
Qe.version(1).stores({ folds: "key, updatedAt" });
const Ze = Qe.folds;
function dn(e, t) {
  return `cover-fold:${bt(e, t)}`;
}
function eo(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : dn(e.type, e.id);
}
async function cn(e) {
  if (!e) return null;
  const t = await Ze.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function un(e, t) {
  e && await Ze.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function A(e) {
  const t = Math.min(e.length, 2e6);
  return vt(e.sliceString(0, t));
}
function M(e) {
  const t = A(e.doc);
  if (!t) return null;
  const r = e.doc.lineAt(t.from);
  return r.to >= t.to ? null : { from: r.to, to: t.to };
}
function I(e, t) {
  let r = false;
  return Be(e).between(t.from, t.to, () => {
    r = true;
  }), r;
}
function fn(e, t) {
  return e.from === t.from && e.to === t.to;
}
function mn(e, t) {
  const r = e.doc.lineAt(t);
  let o = false;
  return D(e).iterate({ from: r.from, to: Math.min(r.to, r.from + 1), enter(s) {
    const a = s.type.name;
    if (a.startsWith("ATXHeading") || a.startsWith("SetextHeading")) return o = true, false;
  } }), o;
}
function U(e, t) {
  const r = A(e.doc);
  if (r) {
    const a = e.doc.lineAt(r.from);
    if (t === a.from) {
      const l = M(e);
      if (l) return { ...l, kind: "cover" };
    }
    if (t >= r.from && t < r.to) return null;
  }
  if (!mn(e, t)) return null;
  const o = e.doc.lineAt(t), s = tr(e, o.from, o.to);
  return !s || s.from >= s.to ? null : { ...s, kind: "heading" };
}
const L = er.define({ combine: (e) => e[e.length - 1] ?? null }), Je = new Z();
function hn(e) {
  return Je.of(L.of(e));
}
function to(e, t) {
  e.dispatch({ effects: Je.reconfigure(L.of(t)) });
}
function xn(e, t) {
  const r = document.createElement("button");
  r.type = "button", r.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const o = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  r.setAttribute("aria-label", o), r.title = o, r.dataset.foldKind = t, r.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const s = r.querySelector("svg");
  return s && (s.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", s.style.transformOrigin = "50% 50%"), r;
}
class we extends Jt {
  constructor(t, r) {
    super(), this.open = t, this.kind = r;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return xn(this.open, this.kind);
  }
}
let V = 0;
function et(e, t) {
  const r = e.coordsAtPos(t.from), o = e.coordsAtPos(t.to);
  if (!r || !o) return null;
  const s = e.contentDOM.getBoundingClientRect(), a = Math.min(r.top, o.top), l = Math.max(r.bottom, o.bottom), i = Math.max(0, l - a);
  if (i < 2) return null;
  const u = document.createElement("div");
  return u.className = "cm-note-cover-fold-motion", u.style.cssText = ["position:fixed", `top:${a}px`, `left:${s.left}px`, `width:${Math.max(0, s.width)}px`, `height:${i}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(u), u;
}
async function gn(e, t) {
  const r = ++V, o = et(e, t);
  if (!o) {
    e.dispatch({ effects: C.of(t) });
    return;
  }
  try {
    await Y(o, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  r === V && M(e.state) && e.dispatch({ effects: C.of(t) }), o.remove();
}
async function pn(e, t) {
  ++V, e.dispatch({ effects: _.of(t) });
  const r = M(e.state);
  if (!r) return;
  const o = et(e, r);
  if (o) {
    try {
      await Y(o, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    o.remove();
  }
}
function tt(e, t) {
  var _a;
  const r = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, "svg");
  r instanceof SVGElement && Y(r, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function Ce(e, t) {
  const r = I(e.state, t);
  return e.dispatch({ effects: r ? _.of(t) : C.of(t) }), true;
}
function Ee(e) {
  const t = M(e.state);
  if (!t) return false;
  const o = !I(e.state, t), s = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return tt(s, !o), (async () => {
    o ? await gn(e, t) : await pn(e, t);
    const a = e.state.facet(L);
    a && un(a, o);
  })(), true;
}
function Me(e, t) {
  const r = M(e.state);
  if (!r) return;
  const o = I(e.state, r);
  t && !o ? e.dispatch({ effects: C.of(r) }) : !t && o && e.dispatch({ effects: _.of(r) });
}
function bn() {
  return Re.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(L) !== this.lastKey, o = !!A(e.state.doc), s = o && !this.hadCover;
      this.hadCover = o, (t || s) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(L);
      this.lastKey = e;
      const t = A(this.view.state.doc);
      if (this.hadCover = !!t, !t) return;
      if (!e) {
        Me(this.view, true);
        return;
      }
      const r = ++this.loadGen;
      cn(e).then((o) => {
        r === this.loadGen && Me(this.view, o !== false);
      });
    }
  });
}
function yn(e) {
  return e.transactions.some((t) => t.effects.some((r) => r.is(C) || r.is(_)));
}
function ro() {
  return [hn(null), De({ preparePlaceholder(e, t) {
    const r = M(e);
    return r && fn(r, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, r) {
    const o = document.createElement("span");
    return o.className = "cm-foldPlaceholder", o.textContent = r === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", o.setAttribute("aria-hidden", "true"), o.onclick = t, o;
  } }), Pe.of((e, t) => {
    const r = A(e.doc);
    if (!r) return null;
    const o = e.doc.lineAt(r.from);
    return t !== o.from ? null : M(e);
  }), Qt({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const r = U(e.state, t.from);
    if (!r) return null;
    const o = !I(e.state, r);
    return new we(o, r.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || yn(e), initialSpacer: () => new we(true, "heading"), domEventHandlers: { mousedown(e, t, r) {
    if (!(r instanceof MouseEvent) || r.button !== 0) return false;
    const o = U(e.state, t.from);
    if (!o) return false;
    if (o.kind === "cover") {
      if (!Ee(e)) return false;
    } else {
      const s = r.target instanceof Element ? r.target.closest(".cm-note-cover-fold-chevron") : null;
      tt(s, I(e.state, o)), Ce(e, o);
    }
    return r.preventDefault(), r.stopPropagation(), true;
  } } }), Zt({ domEventHandlers: { mousedown(e, t, r) {
    if (!(r instanceof MouseEvent) || r.button !== 0) return false;
    const o = A(e.state.doc);
    if (o && t.from >= o.from && t.from < o.to) return Ee(e) ? (r.preventDefault(), true) : false;
    const s = U(e.state, t.from);
    return !s || s.kind !== "heading" ? false : (Ce(e, s), r.preventDefault(), true);
  } } }), bn(), J.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function vn({ cover: e, getPresignedUrl: t }) {
  const r = kt(e.pageSizeId) ? e.pageSizeId : jt, o = h.useMemo(() => ({ ...Nt(), pageSizeId: r }), [r]), s = h.useMemo(() => St(r), [r]), a = h.useMemo(() => wt(o), [o]);
  return n.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": r, style: a, children: n.jsx(lr, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${s.widthMm} / ${s.heightMm}` } }) });
}
const P = /* @__PURE__ */ new WeakMap(), rt = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", kn = "\uD45C\uC9C0";
function q(e) {
  const t = P.get(e);
  t && (t.unmount(), P.delete(e));
}
function Fe(e, t) {
  if (!e) return;
  const r = e.querySelector(".md-note-cover-placeholder__fallback");
  if (!r) return;
  const o = r.querySelector(".md-note-cover-placeholder__fallback-text");
  if (o) {
    o.textContent = t;
    return;
  }
  r.textContent = t;
}
function jn(e) {
  if (!e) return;
  let t = e.querySelector(".md-note-cover-placeholder__fallback");
  if (t || (t = document.createElement("span"), t.className = "md-note-cover-placeholder__fallback", e.appendChild(t)), t.querySelector(".md-note-cover-placeholder__spinner")) return;
  t.replaceChildren();
  const r = document.createElement("span");
  r.className = "md-note-cover-placeholder__spinner", r.setAttribute("aria-hidden", "true");
  const o = document.createElement("span");
  o.className = "md-note-cover-placeholder__fallback-text", o.textContent = rt, t.append(r, o);
}
function W(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? (jn(e), Fe(e, rt)) : t === "empty" && Fe(e, kn));
}
function Nn(e, t, r) {
  let o = P.get(e);
  o || (o = nt.createRoot(e), P.set(e, o)), o.render(h.createElement(vn, { cover: t, getPresignedUrl: r ?? void 0 }));
}
function no(e, t, r, o) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const s = (o == null ? void 0 : o.load) !== false, { cover: a } = Ct(t ?? ""), l = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(a == null ? void 0 : a.enabled)) {
    for (const i of l) {
      q(i);
      const u = i.closest("[data-note-cover-placeholder]");
      W(u, "empty");
    }
    return 0;
  }
  if (!s) {
    for (const i of l) {
      q(i);
      const u = i.closest("[data-note-cover-placeholder]");
      W(u, "pending");
    }
    return 0;
  }
  for (const i of l) {
    const u = i.closest("[data-note-cover-placeholder]");
    W(u, "ready"), Nn(i, a, r);
  }
  return l.length;
}
function oo(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const r of t) q(r);
}
function so(e) {
  var _a, _b;
  if (!e) return [];
  const t = [], r = /* @__PURE__ */ new Set(), o = (s) => {
    if (!s || !s.size) return;
    const a = String(s.size);
    r.has(a) || (r.add(a), t.push(s));
  };
  if ((_a = e.files) == null ? void 0 : _a.length) for (const s of e.files) s && (((_b = s.type) == null ? void 0 : _b.startsWith("image/")) || !s.type && s.size > 0) && o(s);
  if (e.items) for (const s of e.items) {
    if (s.kind !== "file") continue;
    const a = s.type || "";
    (a.startsWith("image/") || a === "") && o(s.getAsFile());
  }
  return t;
}
const Sn = [{ key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: ir }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: dr }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: ur, shift: cr }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: fr }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: mr }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: hr }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: xr }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => ({ key: `Ctrl-${e}`, mac: `Cmd-${e}`, preventDefault: true, run: (t) => pe(t, e) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (e) => pe(e, 10) }, { any: (e, t) => (t.ctrlKey || t.metaKey) && t.altKey && t.code === "KeyC" ? gr(e) : pr(t, e) }], ao = B.high(K.of(Sn));
export {
  Kn as C,
  On as H,
  $n as I,
  Sn as M,
  zn as W,
  Hn as a,
  Wn as b,
  qn as c,
  qr as d,
  so as e,
  Xn as f,
  eo as g,
  no as h,
  Yn as i,
  Jn as j,
  ro as k,
  Un as l,
  Vn as m,
  E as n,
  Qn as o,
  ao as p,
  Zn as q,
  to as s,
  oo as t,
  Gn as u
};
