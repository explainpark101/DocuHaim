var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as m, j as r, c as Nt } from "./vendor-react-BPvvDyqO.js";
import { A as St, m as wt, a as ce } from "./vendor-motion-Bv-XITR_.js";
import { p as We, s as Ct, a as Et } from "./emojiShortcode-CZFZfFoz.js";
import { am as Mt, F as Ft, T as Tt, eB as be, eC as ye, eD as It, eE as At, eF as ve, eG as Dt, eH as Lt, eI as X, aa as H, eJ as _t, eK as je, eL as Y, G as ke, eM as Pt, b6 as Rt, eN as Ne, eO as Ot, ex as Se, c as Bt, n as Q, C as we, eP as Ce, eQ as Ee, eR as Kt, eS as $t, aO as zt, eT as Ht, eU as Wt, eV as Ut, eW as Gt, eX as Vt, eY as qt, eZ as Xt } from "./index-DRAozU5b.js";
import { aN as Yt, g as Me, aO as Z, aP as J, aQ as Qt, m as Zt, aR as Ue, w as Jt, x as Ge, aS as Fe, X as ue, aT as er, j as W, aI as tr, aj as rr, av as nr, aU as sr, aV as or, aW as ar, L as lr } from "./vendor-lucide-BnjwTb2j.js";
import { v as Ve, J as ir, w as ne, x as se, K as dr, y as oe, z as ae, A as le, M as cr, N as ur, O as fr, p as ee, q as P, U as mr, V as xr, W as gr, X as hr, Y as pr, Z as br, _ as yr, a1 as vr, ag as jr, a2 as kr, S as Nr, t as Sr, B as wr, F as Cr, L as Er, D as Mr } from "./vendor-radix-8kjzYRrX.js";
import { N as Fr } from "./WikiImageSizeModal-DUtadAkN.js";
import { t as Tr, O as Ir } from "./index-flVIUjar.js";
import { C as fe, g as qe, E as me, S as Xe, D as Te, W as Ar, I as Ye, J as B, K as F, L as Qe, M as K, V as Ze, N as Je, P as U, k as G, n as Dr, o as L, O as Lr, y as _r, Q as Pr, T as Rr, U as Or } from "./vendor-codemirror-V7b8BJE-.js";
import { m as et } from "./appMarkdownItPlugins-Bqcmn7Ml.js";
import { r as Br, l as Kr } from "./haimCodeTabSettings-B-S365oc.js";
import { r as $r, p as zr, a as Hr } from "./codeBlockCommentTogglePlan-Dpfl-zi2.js";
import { C as Wr } from "./TableEditModal-CGcSQcU-.js";
import { t as Ur, a as Gr, b as Vr, c as qr, d as Xr, e as Yr, f as Qr, g as Zr, i as Ie, w as Jr, h as en } from "./mdEditorSelectionWrap-DxJzFoHE.js";
function tn(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let s = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, o = 0, a = 0;
  t.forEach((i, d) => {
    var _a;
    const h = i.match(/^(#{1,6})\s+(.*)/);
    if (h) {
      (s.tasks.length > 0 || s.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(s), s = { name: (h[2] ?? "").trim(), tasks: [] };
      return;
    }
    const f = i.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX~])\]\s+(.*)/);
    if (f) {
      const N = Math.floor((((_a = f[1]) == null ? void 0 : _a.length) ?? 0) / 2), p = We(f[3]), y = p === "done", b = (f[4] ?? "").trim();
      o += 1, y && (a += 1), s.tasks.push({ id: `line-${d}`, lineIndex: d, indent: N, completed: y, status: p, text: b, rawLine: i });
    }
  }), s.tasks.length > 0 && n.push(s);
  const l = o > 0 ? Math.round(a / o * 100) : 0;
  return { categories: n, totalTasks: o, completedTasks: a, pendingTasks: o - a, percentage: l };
}
function rn(e, t) {
  const n = String(e ?? "").split(`
`);
  if (t < 0 || t >= n.length) return e;
  const o = (n[t] ?? "").match(/^(\s*(?:[-*]|\d+\.)\s+)\[([ xX~])\](.*)$/);
  if (!o) return e;
  const a = Mt(e), l = Ct(Et(We(o[2]), a), a);
  return n[t] = `${o[1]}[${l}]${o[3] ?? ""}`, n.join(`
`);
}
function nn({ markdown: e = "", onMarkdownChange: t }) {
  const [n, s] = m.useState(""), [o, a] = m.useState("all"), [l, i] = m.useState({}), [d, h] = m.useState("dashboard"), f = m.useMemo(() => tn(e), [e]), N = m.useMemo(() => f.categories.map((x) => x.name).join("\0"), [f.categories]);
  m.useEffect(() => {
    const x = {};
    for (const v of N ? N.split("\0") : []) v && (x[v] = true);
    i(x);
  }, [N]);
  const p = (x) => {
    typeof t == "function" && t(rn(e, x));
  }, y = (x) => {
    i((v) => ({ ...v, [x]: !v[x] }));
  }, b = (x) => {
    const v = x.text.toLowerCase().includes(n.toLowerCase()), w = o === "all" ? true : o === "completed" ? x.completed : !x.completed;
    return v && w;
  };
  return r.jsxs("div", { className: "@container space-y-3 text-xs text-slate-100", children: [r.jsxs("div", { className: "grid grid-cols-2 gap-2 @[380px]:grid-cols-4", children: [r.jsxs("div", { className: "relative min-h-19 overflow-hidden rounded-xl border border-indigo-500/30 bg-linear-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [r.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: r.jsx(Yt, { className: "h-14 w-14 text-indigo-400 @[380px]:h-16 @[380px]:w-16" }) }), r.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), r.jsx("div", { className: "my-1 flex items-baseline gap-1", children: r.jsxs("span", { className: "text-2xl font-extrabold text-white @[380px]:text-3xl", children: [f.percentage, "%"] }) }), r.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: r.jsx("div", { className: "h-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${f.percentage}%` } }) })] }), r.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [r.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [r.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), r.jsx(Me, { className: "h-3.5 w-3.5 text-slate-500" })] }), r.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [f.totalTasks, " ", r.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), r.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [r.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [r.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), r.jsx(Z, { className: "h-3.5 w-3.5" })] }), r.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [f.completedTasks, " ", r.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), r.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [r.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [r.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), r.jsx(J, { className: "h-3.5 w-3.5" })] }), r.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [f.pendingTasks, " ", r.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), r.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [r.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [r.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [r.jsxs("button", { type: "button", onClick: () => h("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${d === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [r.jsx(Qt, { className: "h-3 w-3" }), r.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), r.jsxs("button", { type: "button", onClick: () => h("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${d === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [r.jsx(Me, { className: "h-3 w-3" }), r.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), r.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [r.jsxs("div", { className: "relative min-w-30 flex-1", children: [r.jsx(Zt, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), r.jsx("input", { type: "text", value: n, onChange: (x) => s(x.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), r.jsxs("select", { value: o, onChange: (x) => a(x.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [r.jsx("option", { value: "all", children: "\uC804\uCCB4" }), r.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), r.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), d === "dashboard" && r.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: f.categories.length === 0 ? r.jsxs("div", { className: "py-8 text-center text-slate-500", children: [r.jsx(Ue, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), r.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), r.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : f.categories.map((x, v) => {
    const w = x.tasks.length, S = x.tasks.filter((g) => g.completed).length, C = w > 0 ? Math.round(S / w * 100) : 0, E = !!l[x.name], u = x.tasks.filter(b);
    return n && u.length === 0 ? null : r.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [r.jsxs("button", { type: "button", onClick: () => y(x.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [r.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [r.jsx("span", { className: "shrink-0 text-slate-500", children: E ? r.jsx(Jt, { className: "h-3.5 w-3.5" }) : r.jsx(Ge, { className: "h-3.5 w-3.5" }) }), r.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: x.name })] }), r.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [r.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [r.jsx("strong", { className: "text-slate-200", children: S }), " /", " ", w] }), r.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${C === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [C, "%"] })] })] }), E ? r.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: u.length === 0 ? r.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : u.map((g) => r.jsxs("button", { type: "button", onClick: () => p(g.lineIndex), style: { paddingLeft: `${g.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [r.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: g.completed ? r.jsx(Z, { className: "h-3.5 w-3.5 text-emerald-400" }) : g.status === "doing" ? r.jsx(Fe, { className: "h-3.5 w-3.5 text-amber-400" }) : r.jsx(J, { className: "h-3.5 w-3.5 text-slate-600" }) }), r.jsx("span", { className: `leading-relaxed ${g.completed ? "text-slate-500 line-through" : g.status === "doing" ? "text-amber-200/90" : "text-slate-300"}`, children: g.text })] }, g.id)) }) : null] }, `${x.name}-${v}`);
  }) }), d === "checklist" ? r.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: f.categories.map((x, v) => {
    const w = x.tasks.filter(b);
    return w.length === 0 ? null : r.jsxs("div", { className: "space-y-1", children: [r.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [x.name, " (", w.length, ")"] }), w.map((S) => r.jsxs("button", { type: "button", onClick: () => p(S.lineIndex), style: { paddingLeft: `${S.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [r.jsx("span", { className: "mt-0.5 shrink-0", children: S.completed ? r.jsx(Z, { className: "h-3.5 w-3.5 text-emerald-400" }) : S.status === "doing" ? r.jsx(Fe, { className: "h-3.5 w-3.5 text-amber-400" }) : r.jsx(J, { className: "h-3.5 w-3.5 text-slate-600" }) }), r.jsx("span", { className: `leading-relaxed ${S.completed ? "text-slate-500 line-through" : S.status === "doing" ? "text-amber-200/90" : "text-slate-200"}`, children: S.text })] }, S.id))] }, `${x.name}-list-${v}`);
  }) }) : null] })] });
}
const sn = Tt, on = "s3haim_checklist_progress_sidebar_width", an = 360, ln = 260, dn = 560, cn = [0.32, 0.72, 0, 1], un = { type: "spring", stiffness: 420, damping: 36, mass: 0.85 };
function Cs({ open: e, onOpenChange: t, markdown: n, onMarkdownChange: s, overlay: o = false }) {
  const { width: a, isResizing: l, handleProps: i } = Ft({ storageKey: on, defaultWidth: an, minWidth: ln, maxWidth: dn, edge: "right", collapseBelowWidth: 180, onCollapseBelowMin: () => t == null ? void 0 : t(false) }), d = o ? ["absolute inset-y-0 right-0 z-30 flex flex-col overflow-hidden", "rounded-bl-md border border-slate-200/80 border-t-0 bg-white/95 shadow-lg", "dark:border-odp-borderStrong/80 dark:bg-odp-surface/95 dark:shadow-black/40"].join(" ") : "relative flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-300 bg-white/95 dark:border-odp-borderStrong dark:bg-odp-surface/95", h = () => t == null ? void 0 : t(false);
  return r.jsx(St, { initial: false, children: e ? r.jsx(wt.aside, { role: "complementary", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", className: d, style: o ? { width: a, willChange: "transform, opacity" } : { overflow: "hidden", willChange: "width, opacity" }, initial: o ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, animate: o ? { x: 0, opacity: 1 } : { width: a, opacity: 1 }, exit: o ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, transition: l ? { duration: 0 } : o ? { type: "tween", duration: 0.22, ease: cn } : un, children: r.jsxs("div", { className: "relative flex h-full min-h-0 w-full flex-col", style: o ? void 0 : { width: a }, children: [r.jsx(sn, { edge: "left", handleProps: i, isResizing: l, visibleOnHover: true, label: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), r.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-2.5 py-2 dark:border-odp-borderSoft", children: [r.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong", children: [r.jsx(Ue, { size: 14, className: "shrink-0 text-indigo-500 dark:text-indigo-300", "aria-hidden": true }), r.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), r.jsx("button", { type: "button", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB2EB\uAE30", onClick: h, className: "inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: r.jsx(ue, { size: 14 }) })] }), r.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-2.5", children: String(n ?? "").trim() ? r.jsx(nn, { markdown: n, onMarkdownChange: s }) : r.jsxs("p", { className: "rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted", children: ["\uBB38\uC11C\uC5D0 \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", r.jsx("br", {}), "`- [ ]` \uD56D\uBAA9\uC744 \uCD94\uAC00\uD574 \uBCF4\uC138\uC694."] }) })] }) }, o ? "checklist-overlay" : "checklist-dock") : null });
}
const fn = "flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 text-left text-sm outline-none data-highlighted:bg-gray-100 dark:data-highlighted:bg-odp-focusBg", mn = "z-100050 w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white p-1 text-gray-800 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg";
function xn(e) {
  return e === "haim" ? "inline-flex h-7 w-7 items-center justify-center rounded border border-transparent text-gray-700 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-bgSoft" : e === "md-toolbar" ? "md-editor-toolbar-item" : "inline-flex shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white p-1.5 text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong";
}
function gn(e) {
  return e === "pagedjs" ? tr : rr;
}
function Es({ disabled: e = false, onOpen: t, variant: n = "icon" }) {
  const [s, o] = m.useState(() => be());
  m.useEffect(() => {
    const l = () => o(be());
    return window.addEventListener(ye, l), window.addEventListener("storage", l), () => {
      window.removeEventListener(ye, l), window.removeEventListener("storage", l);
    };
  }, []);
  const a = n === "icon" ? 16 : 14;
  return r.jsx(Ve, { delayDuration: 250, skipDelayDuration: 0, children: r.jsxs(ir, { children: [r.jsxs(ne, { children: [r.jsx(se, { asChild: true, children: r.jsx(dr, { asChild: true, children: r.jsx("button", { type: "button", className: xn(n), disabled: e, "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", onMouseDown: (l) => {
    n === "haim" && l.preventDefault();
  }, children: r.jsx(er, { className: n === "md-toolbar" ? "md-editor-icon" : void 0, size: n === "md-toolbar" ? 16 : a, "aria-hidden": true }) }) }) }), r.jsx(oe, { children: r.jsxs(ae, { side: "bottom", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: ["PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", r.jsx(le, { className: "fill-white dark:fill-odp-surface" })] }) })] }), r.jsx(cr, { children: r.jsx(ur, { side: "bottom", align: "end", sideOffset: 6, className: mn, children: It.map((l) => {
    const i = gn(l.value), d = s === l.value;
    return r.jsxs(fr, { className: fn, onSelect: () => t(l.value), children: [r.jsx(i, { className: "mt-0.5 shrink-0", size: 14, "aria-hidden": true }), r.jsxs("span", { className: "min-w-0 flex-1", children: [r.jsxs("span", { className: "flex items-center gap-1 font-medium", children: [l.label, d ? r.jsx(W, { size: 12, "aria-hidden": true }) : null] }), r.jsx("span", { className: "mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: l.description })] })] }, l.value);
  }) }) })] }) });
}
const hn = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], pn = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], bn = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), yn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Ae = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function Ms({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: s, onApply: o }) {
  const a = n.length > 0, [l, i] = m.useState("document"), [d, h] = m.useState(1), [f, N] = m.useState(false), [p, y] = m.useState("nested"), [b, x] = m.useState("one"), [v, w] = m.useState(1), [S, C] = m.useState("1"), E = m.useRef(null), u = l === "selection" ? n : t, g = m.useMemo(() => At(u), [u]), A = b === "min" ? g ?? 1 : b === "custom" ? Ne(v) : 1;
  m.useEffect(() => {
    if (!e) return;
    const c = a ? "selection" : "document";
    i(c), h(ve(c === "selection" ? n : t)), N(false), y("nested"), x("one"), w(1), C("1");
  }, [e, t, n, a]), m.useEffect(() => {
    b === "min" && g == null && x("one");
  }, [b, g]), m.useEffect(() => {
    var _a;
    !f || b !== "custom" || ((_a = E.current) == null ? void 0 : _a.focus());
  }, [f, b]), m.useEffect(() => {
    if (!e) return;
    const c = (k) => {
      const D = k;
      return (D == null ? void 0 : D.closest) ? !!D.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, j = () => {
      const k = document.activeElement;
      k && c(k) && typeof k.blur == "function" && k.blur();
    };
    j();
    const M = (k) => {
      var _a, _b;
      if (k.metaKey || k.ctrlKey || k.altKey) return;
      const D = ((_b = (_a = k.target) == null ? void 0 : _a.tagName) == null ? void 0 : _b.toLowerCase()) ?? "";
      if (D === "input" || D === "textarea" || D === "select") return;
      const q = k.key;
      if (q >= "1" && q <= "9") {
        const pe = Number(q);
        je(pe) && (k.preventDefault(), k.stopPropagation(), k.stopImmediatePropagation(), h(pe));
        return;
      }
      k.key === "Escape" || k.key === "Enter" || c(k.target) && (k.preventDefault(), k.stopPropagation(), k.stopImmediatePropagation(), j());
    };
    return window.addEventListener("keydown", M, true), () => window.removeEventListener("keydown", M, true);
  }, [e]);
  const $ = m.useMemo(() => Dt(u, d, { maxLevel: Se, renumberOutline: f, outlineStyle: p, outlineStart: A }), [u, d, f, p, A]), bt = (c) => {
    if (c !== "selection" && c !== "document" || c === "selection" && !a) return;
    i(c), h(ve(c === "selection" ? n : t));
  }, ge = () => {
    if (!$.sourceMax) return;
    const c = Ot(u, d, { maxLevel: Se, renumberOutline: f, outlineStyle: p, outlineStart: A });
    c !== u && o(c, l), s();
  }, yt = Lt(p, d), vt = X(1, p, d), he = g == null ? null : X(g, p, d), jt = (c) => {
    const j = c.trim();
    if (j === "") {
      C("");
      return;
    }
    const M = Y(j, p, d);
    if (M != null) {
      if (/^\d+$/.test(j)) {
        C(j), w(M);
        return;
      }
      C(String(M)), w(M);
    }
  }, kt = () => {
    const c = Y(S, p, d), j = Ne(c ?? v);
    w(j), C(String(j));
  }, V = (c) => ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", c ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" ");
  return r.jsx(H, { isOpen: e, onClose: s, onConfirm: ge, ignoreEnterInFields: true, contentClassName: "max-w-3xl max-h-[90vh]", children: r.jsx(Ve, { delayDuration: 250, skipDelayDuration: 0, children: r.jsxs("div", { className: "flex min-h-0 flex-1 flex-col", role: "dialog", "aria-modal": "true", "aria-labelledby": "heading-remap-title", children: [r.jsxs("header", { className: "shrink-0 border-b border-gray-100 px-6 py-4 dark:border-odp-borderSoft", children: [r.jsx("h2", { id: "heading-remap-title", className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), r.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] })] }), r.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 py-4", children: [r.jsxs("div", { className: "mt-4", children: [r.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), r.jsx(ee, { className: "flex items-center gap-2", value: l, onValueChange: bt, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: hn.map((c) => {
    const j = l === c.value, M = c.value === "selection" && !a;
    return r.jsx(P, { value: c.value, disabled: M, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", j ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: r.jsxs("div", { className: j ? "" : "opacity-50", children: [r.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: c.title }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: c.value === "selection" && !a ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : c.description })] }) }, c.value);
  }) })] }), r.jsxs("div", { className: "mt-4", children: [r.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), r.jsxs(mr, { value: String(d), onValueChange: (c) => {
    const j = Number(c);
    je(j) && h(j);
  }, children: [r.jsxs(xr, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [r.jsx(gr, {}), r.jsx(hr, { className: "text-gray-500", children: r.jsx(Ge, { size: 14 }) })] }), r.jsx(pr, { children: r.jsx(br, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: r.jsx(yr, { className: "p-1", children: _t.map((c) => r.jsxs(vr, { value: String(c), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [r.jsx(jr, { className: "absolute left-1.5 inline-flex items-center", children: r.jsx(W, { size: 12 }) }), r.jsx(kr, { children: `h${c}` })] }, c)) }) }) })] })] }), r.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [r.jsxs("div", { className: "flex items-center justify-between gap-3", children: [r.jsxs("div", { className: "min-w-0", children: [r.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), r.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), r.jsx(Nr, { className: bn(f), checked: f, onCheckedChange: N, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: r.jsx(Sr, { className: yn }) })] }), f ? r.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [r.jsxs("div", { children: [r.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), r.jsx(ee, { className: "flex items-center gap-2", value: p, onValueChange: (c) => {
    (c === "flat" || c === "nested") && y(c);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: pn.map((c) => {
    const j = p === c.value;
    return r.jsx(P, { value: c.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", j ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: r.jsxs("div", { className: j ? "" : "opacity-50", children: [r.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: c.title }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: c.description })] }) }, c.value);
  }) })] }), r.jsxs("div", { children: [r.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), r.jsxs(ee, { className: "flex flex-col gap-2 sm:flex-row sm:items-stretch", value: b, onValueChange: (c) => {
    c !== "one" && c !== "min" && c !== "custom" || c === "min" && g == null || x(c);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: [r.jsx(P, { value: "one", className: V(b === "one"), children: r.jsxs("div", { className: b === "one" ? "" : "opacity-50", children: [r.jsxs("div", { className: "flex items-center gap-1.5 font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: [r.jsx(nr, { size: 14, "aria-hidden": true }), "1\uBD80\uD130"] }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: `\uCD5C\uB300 heading\uC774 ${vt} \uB85C \uC2DC\uC791` })] }) }), r.jsx(P, { value: "min", disabled: g == null, className: V(b === "min"), children: r.jsxs("div", { className: b === "min" ? "" : "opacity-50", children: [r.jsxs("div", { className: "flex items-center gap-1.5 font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: [r.jsx(sr, { size: 14, "aria-hidden": true }), "\uCD5C\uC18C \uBC88\uD638\uBD80\uD130"] }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: he ? `${l === "selection" ? "\uC120\uD0DD \uC601\uC5ED" : "\uBB38\uC11C"} \uBC88\uD638 \uC911 \uAC00\uC7A5 \uC791\uC740 ${he} \uBD80\uD130` : "\uBC88\uD638\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" })] }) }), r.jsx(P, { value: "custom", className: V(b === "custom"), children: r.jsxs("div", { className: b === "custom" ? "" : "opacity-50", children: [r.jsxs("div", { className: "flex items-center gap-1.5 font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: [r.jsx(or, { size: 14, "aria-hidden": true }), "\uC9C1\uC811 \uC785\uB825"] }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC785\uB825\uD55C \uBC88\uD638\uBD80\uD130 \uD604\uC7AC \uD615\uC2DD\uC5D0 \uB9DE\uCDA4" })] }) })] }), b === "custom" ? r.jsx(wr, { className: "mt-2", onSubmit: (c) => c.preventDefault(), children: r.jsxs(Cr, { name: "outline-custom-start", className: "flex flex-col gap-1", children: [r.jsx(Er, { className: "text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), r.jsxs("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1", children: [r.jsxs("div", { className: "inline-flex items-center gap-0.5", children: [r.jsx(Mr, { asChild: true, children: r.jsx("input", { ref: E, id: "heading-remap-outline-start", type: "text", inputMode: "numeric", autoComplete: "off", "aria-label": "\uC9C1\uC811 \uC785\uB825\uD55C \uC2DC\uC791 \uBC88\uD638", "aria-describedby": "heading-remap-outline-format", value: S, onChange: (c) => jt(c.target.value), onBlur: kt, className: "w-16 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-right text-sm tabular-nums text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong" }) }), r.jsx("span", { className: "font-mono text-sm text-gray-700 dark:text-odp-fg", "aria-hidden": true, children: yt })] }), r.jsx("span", { id: "heading-remap-outline-format", className: "text-[11px] text-gray-500 dark:text-odp-muted", children: `\uD615\uC2DD ${X(Y(S, p, d) ?? A, p, d)}` })] })] }) }) : null] })] }) : null] }), r.jsx("div", { className: "mt-4 min-h-0", children: $.rows.length ? r.jsx("div", { className: "rounded-md border border-gray-200 dark:border-odp-borderSoft", children: r.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [r.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: r.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [r.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), r.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), r.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), r.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), r.jsx("tbody", { children: $.rows.map((c, j) => r.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [r.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: r.jsxs(ne, { children: [r.jsx(se, { asChild: true, children: r.jsx("span", { className: "block truncate", children: c.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), r.jsx(oe, { children: r.jsxs(ae, { side: "top", sideOffset: 6, className: Ae, children: [c.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", r.jsx(le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), r.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: r.jsxs(ne, { children: [r.jsx(se, { asChild: true, children: r.jsx("span", { className: "block truncate", children: c.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), r.jsx(oe, { children: r.jsxs(ae, { side: "top", sideOffset: 6, className: Ae, children: [c.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", r.jsx(le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), r.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", c.from] }), r.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", c.to] })] }, `${c.from}-${j}-${c.text}`)) })] }) }) : r.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: l === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) })] }), r.jsxs("footer", { className: "flex shrink-0 justify-end gap-2 border-t border-gray-100 px-6 py-4 dark:border-odp-borderSoft", children: [r.jsxs(ke, { type: "button", variant: "secondary", size: "md", onClick: s, children: [r.jsx(Pt, { size: 16 }), "\uCDE8\uC18C"] }), r.jsxs(ke, { type: "button", variant: "primary", size: "md", onClick: ge, disabled: !$.sourceMax, children: [r.jsx(Rt, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function Fs({ isOpen: e, onClose: t, onConfirm: n }) {
  const [s, o] = m.useState(""), [a, l] = m.useState(""), [i, d] = m.useState("");
  m.useEffect(() => {
    e && (o(""), l(""), d(""));
  }, [e]);
  const h = () => {
    const f = a.trim();
    if (!f) {
      d("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: s.trim(), url: f }), t();
  };
  return r.jsx(H, { isOpen: e, onClose: t, onConfirm: h, ignoreEnterInFields: true, children: r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [r.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), r.jsxs("label", { className: "block", children: [r.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), r.jsx("input", { type: "text", value: s, onChange: (f) => o(f.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), r.jsxs("label", { className: "block", children: [r.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), r.jsx("input", { type: "text", value: a, onChange: (f) => l(f.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), i ? r.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: i }) : null, r.jsxs("div", { className: "flex justify-end gap-2", children: [r.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [r.jsx(ue, { size: 16 }), "\uCDE8\uC18C"] }), r.jsxs("button", { type: "button", onClick: h, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [r.jsx(W, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Ts({ isOpen: e, file: t, onClose: n, onConfirm: s }) {
  const [o, a] = m.useState("");
  return m.useEffect(() => {
    if (!e || !t) {
      a("");
      return;
    }
    const l = URL.createObjectURL(t);
    return a(l), () => {
      URL.revokeObjectURL(l);
    };
  }, [e, t]), r.jsx(H, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: o ? r.jsx(Fr, { imageSrc: o, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: s }) : null });
}
const vn = 8192, jn = 16;
function De(e) {
  return Math.min(vn, Math.max(jn, Math.round(e)));
}
function kn(e) {
  const t = (e || "#ffffff").trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(t) ? t : "#ffffff";
}
async function Le(e) {
  const t = De(e.width), n = De(e.height), s = kn(e.background ?? "#ffffff"), o = document.createElement("canvas");
  o.width = t, o.height = n;
  const a = o.getContext("2d");
  if (!a) throw new Error("Canvas 2D unavailable");
  a.clearRect(0, 0, t, n), a.fillStyle = s, a.fillRect(0, 0, t, n);
  const l = await new Promise((i) => {
    o.toBlob((d) => i(d), "image/png");
  });
  if (!l) throw new Error("Failed to encode whiteboard PNG");
  return new File([l], `whiteboard-${t}x${n}.png`, { type: "image/png" });
}
const Nn = [{ id: "hd", label: "1280\xD7720", width: 1280, height: 720 }, { id: "fhd", label: "1920\xD71080", width: 1920, height: 1080 }, { id: "sq", label: "1080\xD71080", width: 1080, height: 1080 }, { id: "a4", label: "A4~", width: 794, height: 1123 }], Sn = [{ id: "white", label: "\uD770\uC0C9", value: "#ffffffff" }, { id: "paper", label: "\uD06C\uB9BC", value: "#fff8e7ff" }, { id: "gray", label: "\uD68C\uC0C9", value: "#f3f4f6ff" }, { id: "black", label: "\uAC80\uC815", value: "#111827ff" }, { id: "clear", label: "\uD22C\uBA85", value: "#00000000" }];
function Is({ isOpen: e, onClose: t, onConfirm: n, disabled: s = false }) {
  const [o, a] = m.useState(1920), [l, i] = m.useState(1080), [d, h] = m.useState("#ffffffff"), [f, N] = m.useState(""), [p, y] = m.useState(false), [b, x] = m.useState("");
  m.useEffect(() => {
    e && (a(1920), i(1080), h("#ffffffff"), N(""), y(false));
  }, [e]);
  const v = Bt(Q(d) || "#ffffffff");
  m.useEffect(() => {
    if (!e) {
      x("");
      return;
    }
    let u = false, g = "";
    return (async () => {
      try {
        const A = await Le({ width: o, height: l, background: d });
        if (u) return;
        g = URL.createObjectURL(A), x(g);
      } catch {
        u || x("");
      }
    })(), () => {
      u = true, g && URL.revokeObjectURL(g);
    };
  }, [e, o, l, d]);
  const w = m.useMemo(() => {
    const g = Math.min(1, 220 / Math.max(o, l, 1));
    return { width: Math.max(24, Math.round(o * g)), height: Math.max(24, Math.round(l * g)) };
  }, [o, l]), S = async () => {
    if (!(s || p)) {
      if (o < 16 || l < 16) {
        N("\uD06C\uAE30\uB294 16px \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
        return;
      }
      y(true), N("");
      try {
        const u = await Le({ width: o, height: l, background: d });
        await n(u), t();
      } catch (u) {
        N(u instanceof Error ? u.message : "\uD654\uC774\uD2B8\uBCF4\uB4DC\uB97C \uB123\uB294 \uB370 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        y(false);
      }
    }
  }, C = (u) => {
    u.key === "Enter" && (!(u.metaKey || u.ctrlKey) || u.altKey || u.shiftKey || u.nativeEvent.isComposing || u.keyCode === 229 || (u.preventDefault(), u.stopPropagation(), S()));
  }, E = p || s;
  return r.jsx(H, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [r.jsxs("div", { className: "flex items-center gap-2", children: [r.jsx(ar, { size: 20, className: "text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }), r.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30" })] }), r.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uBE48 \uCE94\uBC84\uC2A4 PNG\uB97C \uB9CC\uB4E4\uC5B4 \uB178\uD2B8\uC5D0", " ", r.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "![[path]]" }), " ", "\uB85C \uB123\uC740 \uB4A4, \uD06C\uAC8C \uBCF4\uAE30(\uB354\uBE14\uD074\uB9AD)\uC5D0\uC11C \uC5F0\uD544 \uBC84\uD2BC\uC744 \uB204\uB974\uBA74 \uADF8\uB9B4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), r.jsx("div", { className: "flex flex-wrap gap-1.5", children: Nn.map((u) => r.jsx("button", { type: "button", disabled: E, className: `rounded-md border px-2 py-1 text-[11px] ${o === u.width && l === u.height ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200" : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`, onClick: () => {
    a(u.width), i(u.height);
  }, children: u.label }, u.id)) }), r.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [r.jsxs("label", { className: "block", children: [r.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB108\uBE44 (px)" }), r.jsx("input", { type: "number", min: 16, max: 8192, value: o, disabled: E, onChange: (u) => a(Number(u.target.value) || 16), onKeyDown: C, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), r.jsxs("label", { className: "block", children: [r.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB192\uC774 (px)" }), r.jsx("input", { type: "number", min: 16, max: 8192, value: l, disabled: E, onChange: (u) => i(Number(u.target.value) || 16), onKeyDown: C, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), r.jsxs("div", { className: "flex flex-col gap-2", children: [r.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uBC30\uACBD\uC0C9" }), r.jsx("div", { className: "flex flex-wrap gap-1.5", children: Sn.map((u) => r.jsxs("button", { type: "button", disabled: E, "aria-label": u.label, className: `inline-flex h-8 items-center gap-1.5 rounded-md border px-2 text-[11px] ${d.toLowerCase() === u.value ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40" : "border-gray-300 dark:border-odp-borderStrong"}`, onClick: () => h(u.value), children: [r.jsx("span", { className: "inline-block h-4 w-4 overflow-hidden rounded border border-black/10", style: we, children: r.jsx("span", { className: "block h-full w-full", style: { backgroundColor: u.value } }) }), u.label] }, u.id)) }), r.jsxs("div", { className: "rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong", children: [r.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: r.jsx(Tr, { color: v, onChange: (u) => {
    const g = Q(u.startsWith("#") ? u : `#${u}`);
    g && h(g);
  } }) }), r.jsx(Ir, { alpha: true, prefixed: true, color: v, onChange: (u) => {
    const g = Q(u.startsWith("#") ? u : `#${u}`);
    g && h(g);
  }, className: "mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), r.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 p-4 dark:border-odp-borderStrong", style: we, children: [b ? r.jsx("img", { src: b, alt: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uBBF8\uB9AC\uBCF4\uAE30", style: { width: w.width, height: w.height }, className: "object-contain shadow-sm" }) : r.jsx("div", { className: "flex h-28 w-40 items-center justify-center text-xs text-gray-400", children: "\uBBF8\uB9AC\uBCF4\uAE30" }), r.jsxs("span", { className: "text-[10px] text-gray-500 dark:text-odp-muted", children: [o, " \xD7 ", l, "px"] })] }), f ? r.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: f }) : null, r.jsxs("div", { className: "flex justify-end gap-2", children: [r.jsxs("button", { type: "button", onClick: t, disabled: p, className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: [r.jsx(ue, { size: 14, "aria-hidden": true }), "\uCDE8\uC18C"] }), r.jsxs("button", { type: "button", onClick: () => {
    S();
  }, disabled: E, className: "inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50", children: [p ? r.jsx(lr, { size: 14, className: "animate-spin", "aria-hidden": true }) : r.jsx(W, { size: 14, "aria-hidden": true }), "\uC0BD\uC785"] })] })] }) });
}
function As() {
  const [e, t] = m.useState(Ce);
  m.useEffect(() => {
    const s = () => t(Ce());
    return window.addEventListener(Ee, s), () => {
      window.removeEventListener(Ee, s);
    };
  }, []);
  const n = m.useCallback((s) => {
    t((o) => {
      const a = typeof s == "function" ? s(o) : !!s;
      return Kt(a), a;
    });
  }, []);
  return [e, n];
}
const wn = 48, _e = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, tt = Xe.define(), rt = Xe.define(), nt = new fe();
function Cn(e) {
  const t = [];
  _e.lastIndex = 0;
  let n;
  for (; (n = _e.exec(e)) !== null; ) {
    const s = n[1] ?? "image", o = n[2] ?? "";
    if (o.length < wn) continue;
    const a = n[0], l = a.length - o.length, i = n.index + l;
    t.push({ from: i, to: n.index + a.length, mime: s });
  }
  return t;
}
function En(e, t) {
  const n = Math.round(t * 3 / 4), s = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${s}\u2026`;
}
class Mn extends Ar {
  constructor(t, n, s) {
    super(), this.label = t, this.from = n, this.to = s;
  }
  toDOM(t) {
    const n = document.createElement("span");
    return n.textContent = this.label, n.className = "cm-base64-image-fold", n.title = "Click to expand base64 image data", n.addEventListener("mousedown", (s) => {
      s.preventDefault(), s.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: tt.of({ from: this.from, to: this.to }) }), t.focus();
    }), n.addEventListener("click", (s) => {
      s.preventDefault();
    }), n;
  }
  ignoreEvent() {
    return false;
  }
  eq(t) {
    return this.label === t.label && this.from === t.from && this.to === t.to;
  }
}
function Fn(e, t, n) {
  return e.some((s) => s.from === t && s.to === n);
}
function Pe(e, t) {
  const n = [], s = [];
  for (let o = 1; o <= e.doc.lines; o += 1) {
    const a = e.doc.line(o);
    for (const l of Cn(a.text)) {
      const i = a.from + l.from, d = a.from + l.to;
      if (Fn(t, i, d)) {
        s.push({ from: i, to: d });
        continue;
      }
      n.push(Te.replace({ widget: new Mn(En(l.mime, d - i), i, d) }).range(i, d));
    }
  }
  return { deco: Te.set(n, true), expanded: s };
}
const st = qe.define({ create(e) {
  return Pe(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: o, to: a }) => ({ from: t.changes.mapPos(o, 1), to: t.changes.mapPos(a, -1) })).filter(({ from: o, to: a }) => o < a));
  let s = n !== e.expanded;
  for (const o of t.effects) o.is(tt) ? (n = [{ from: o.value.from, to: o.value.to }], s = true) : o.is(rt) && n.length > 0 && (n = [], s = true);
  return t.docChanged || s ? Pe(t.state, n) : e;
}, provide: (e) => me.decorations.from(e, (t) => t.deco) }), Tn = me.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(st, false);
  if (!n || n.expanded.length === 0) return false;
  const s = e.target;
  if (!(s instanceof Node) || !t.dom.contains(s)) return false;
  const o = t.posAtDOM(s, 0);
  return o !== -1 && n.expanded.some(({ from: a, to: l }) => o >= a && o <= l) || t.dispatch({ effects: rt.of(null) }), false;
} });
function ot() {
  return [st, Tn];
}
function Ds(e) {
  return nt.of(e ? ot() : []);
}
function Ls(e, t) {
  if (e) try {
    e.dispatch({ effects: nt.reconfigure(t ? ot() : []) });
  } catch {
  }
}
const at = new fe();
function In(e, t, n) {
  let s = false;
  return Je(e).between(t, n, () => {
    s = true;
  }), s;
}
function An(e) {
  const t = [], n = e.doc.toString();
  return K(e).iterate({ enter(s) {
    if (s.name !== "FencedCode") return;
    const o = et(n, s.from, s.to);
    o && t.push(o);
  } }), t;
}
function lt(e, t, n) {
  return e.some((s) => s.from === t && s.to === n);
}
const it = qe.define({ create() {
  return [];
}, update(e, t) {
  let n = e;
  t.docChanged && n.length && (n = n.map(({ from: o, to: a }) => ({ from: t.changes.mapPos(o, 1), to: t.changes.mapPos(a, -1) })).filter(({ from: o, to: a }) => o < a));
  let s = n !== e;
  for (const o of t.effects) if (o.is(B)) lt(n, o.value.from, o.value.to) || (n = [...n, o.value], s = true);
  else if (o.is(F)) {
    const a = n.filter((l) => l.from !== o.value.from || l.to !== o.value.to);
    a.length !== n.length && (n = a, s = true);
  }
  return s ? n : e;
} });
function Re(e) {
  const t = e.state.field(it), n = [];
  for (const s of An(e.state)) lt(t, s.from, s.to) || In(e.state, s.from, s.to) || n.push(F.of(s));
  n.length > 0 && e.dispatch({ effects: n });
}
const Dn = Ze.fromClass(class {
  constructor(e) {
    Re(e);
  }
  update(e) {
    e.docChanged && Re(e.view);
  }
}), Ln = Qe.of((e, t) => {
  const n = e.doc.toString();
  let s = null;
  return K(e).iterate({ enter(o) {
    if (o.name !== "FencedCode" || e.doc.lineAt(o.from).from !== t) return;
    const l = et(n, o.from, o.to);
    if (l) return s = l, false;
  } }), s;
});
function dt() {
  return [it, Ye(), Ln, Dn];
}
function _s(e) {
  return at.of(e ? dt() : []);
}
function Ps(e, t) {
  if (e) try {
    e.dispatch({ effects: at.reconfigure(t ? dt() : []) });
  } catch {
  }
}
function _n(e) {
  var _a, _b;
  if (!(e == null ? void 0 : e.state)) return false;
  const t = (_b = (_a = e.state.selection) == null ? void 0 : _a.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return false;
  const n = e.state.doc.lineAt(t);
  return e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from }, scrollIntoView: true }), true;
}
function Rs(e) {
  return e.altKey || !e.shiftKey || !(e.ctrlKey || e.metaKey) ? false : (e.key || "").toLowerCase() === "enter" ? true : e.code === "Enter" || e.code === "NumpadEnter";
}
const Pn = { key: "Mod-Shift-Enter", preventDefault: true, run: _n }, Os = U.highest(G.of([Pn]));
function Rn(e, t, n) {
  var _a, _b;
  let s = "";
  if (K(e).iterate({ from: t, to: n, enter(l) {
    if (l.name === "CodeInfo") return s = e.doc.sliceString(l.from, l.to).trim(), false;
  } }), s) return s;
  const o = e.doc.lineAt(t).text;
  return ((_b = (_a = /^`{3,}\s*([^\s`]+)/.exec(o)) == null ? void 0 : _a[1]) == null ? void 0 : _b.trim()) ?? "";
}
function T(e, t) {
  let s = K(e).resolveInner(t, -1);
  for (let o = s; o; o = o.parent) {
    if (o.name !== "FencedCode") continue;
    let a = -1, l = -1;
    for (let i = o.firstChild; i; i = i.nextSibling) if (i.name === "CodeText") {
      a = i.from, l = i.to;
      break;
    }
    return a < 0 || l < a || t < a || t > l ? null : { language: Rn(e, o.from, o.to), bodyFrom: a, bodyTo: l };
  }
  return null;
}
function ct(e) {
  return Br(e, Kr());
}
function Oe(e, t) {
  var _a;
  const n = ((_a = e.match(/^ */)) == null ? void 0 : _a[0]) ?? "";
  return Math.min(n.length, t);
}
function xe(e, t, n, s, o) {
  const a = [], l = e.doc.lineAt(Math.max(s, t)), i = Math.max(s, Math.min(o, n)), d = e.doc.lineAt(Math.max(t, Math.min(i, n)));
  for (let h = l.number; h <= d.number; h += 1) {
    const f = e.doc.line(h);
    f.from >= n || f.to < t || f.from < t || f.from >= n || s < f.to && o > f.from && a.push(f.from);
  }
  return a;
}
function On(e, t) {
  const { from: n, to: s, empty: o } = e.selection.main, a = T(e, n);
  if (!a) return null;
  if (!o) {
    const p = T(e, Math.max(n, s - 1));
    if (!p || p.bodyFrom !== a.bodyFrom) return null;
  }
  const l = Math.max(1, Math.round(t)), i = " ".repeat(l);
  if (o) return { changes: { from: n, insert: i }, selection: L.cursor(n + i.length), userEvent: "input.indent" };
  const d = xe(e, a.bodyFrom, a.bodyTo, n, s);
  if (d.length === 0) return null;
  const h = d.map((p) => ({ from: p, insert: i })), f = d[0], N = s + d.length * i.length;
  return { changes: h, selection: L.range(f, N), userEvent: "input.indent" };
}
function Bn(e, t) {
  const { from: n, to: s, empty: o } = e.selection.main, a = T(e, n);
  if (!a) return null;
  if (!o) {
    const y = T(e, Math.max(n, s - 1));
    if (!y || y.bodyFrom !== a.bodyFrom) return null;
  }
  const l = Math.max(1, Math.round(t)), i = o ? (() => {
    const y = e.doc.lineAt(n);
    return y.from < a.bodyFrom || y.from >= a.bodyTo ? [] : [y.from];
  })() : xe(e, a.bodyFrom, a.bodyTo, n, s);
  if (i.length === 0) return null;
  const d = [];
  let h = 0, f = 0;
  for (let y = i.length - 1; y >= 0; y -= 1) {
    const b = i[y], x = e.doc.lineAt(b), v = Oe(x.text, l);
    v !== 0 && (d.push({ from: b, to: b + v, insert: "" }), f += v, b < n && (h += v));
  }
  if (f === 0) return { changes: [], userEvent: "delete.dedent" };
  if (o) {
    const y = i[0], b = n - y, x = Oe(e.doc.lineAt(y).text, l), v = b <= x ? y : n - x;
    return { changes: d, selection: L.cursor(v), userEvent: "delete.dedent" };
  }
  const N = Math.max(i[0], n - h), p = Math.max(N, s - f);
  return { changes: d, selection: L.range(N, p), userEvent: "delete.dedent" };
}
function ut(e) {
  const t = T(e, e.selection.main.from);
  return t ? ct(t.language) : null;
}
function Kn(e) {
  const t = ut(e.state);
  if (t == null) return false;
  const n = On(e.state, t);
  return n ? (e.dispatch(n), true) : false;
}
function $n(e) {
  const t = ut(e.state);
  if (t == null) return false;
  const n = Bn(e.state, t);
  return n ? (e.dispatch(n), true) : false;
}
const zn = { key: "Tab", run: Kn, shift: $n }, Bs = U.high(G.of([zn]));
function Ks() {
  return Dr.of(" ".repeat(ct("")));
}
function Hn(e) {
  const { from: t, to: n, empty: s } = e.selection.main, o = T(e, t);
  if (!o) return null;
  if (!s) {
    const i = T(e, Math.max(t, n - 1));
    if (!i || i.bodyFrom !== o.bodyFrom) return null;
  }
  const a = s ? (() => {
    const i = e.doc.lineAt(t);
    return i.from < o.bodyFrom || i.from >= o.bodyTo ? [] : [i.from];
  })() : xe(e, o.bodyFrom, o.bodyTo, t, n);
  if (a.length === 0) return null;
  const l = a.map((i) => {
    const d = e.doc.lineAt(i), h = Math.min(d.to, o.bodyTo);
    return { from: d.from, text: e.doc.sliceString(d.from, h) };
  });
  return { language: o.language, lines: l };
}
function Wn(e) {
  return e.map((t) => {
    var _a;
    const n = ((_a = /^\s*/.exec(t.text)) == null ? void 0 : _a[0].length) ?? 0, s = t.from + n, o = t.from + t.text.length;
    return { from: s, to: o, content: t.text.slice(n) };
  });
}
function Un(e) {
  return e.map((t) => t.to != null && t.to !== t.from ? { from: t.from, to: t.to, insert: t.insert } : { from: t.from, insert: t.insert });
}
function Gn(e) {
  const t = Hn(e);
  if (!t) return null;
  const n = $r(t.language);
  let s = null;
  if (n.line ? s = zr(t.lines, n.line) : n.block && (s = Hr(Wn(t.lines), n.block.open, n.block.close)), !s || s.length === 0) return null;
  const o = Un(s), { from: a, to: l, empty: i } = e.selection.main, d = e.changes(o);
  return i ? { changes: d, selection: L.cursor(d.mapPos(a, 1)), userEvent: "input.comment" } : { changes: d, selection: L.range(d.mapPos(a, -1), d.mapPos(l, 1)), userEvent: "input.comment" };
}
function Vn(e) {
  if (e.state.readOnly) return false;
  const t = Gn(e.state);
  return t ? (e.dispatch(t), true) : false;
}
const qn = { key: "Mod-/", run: Vn }, $s = U.high(G.of([qn])), ft = new zt("s3haim-note-cover-fold");
ft.version(1).stores({ folds: "key, updatedAt" });
const mt = ft.folds;
function Xn(e, t) {
  return `cover-fold:${$t(e, t)}`;
}
function zs(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Xn(e.type, e.id);
}
async function Yn(e) {
  if (!e) return null;
  const t = await mt.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function Qn(e, t) {
  e && await mt.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function _(e) {
  const t = Math.min(e.length, 2e6);
  return Ht(e.sliceString(0, t));
}
function I(e) {
  const t = _(e.doc);
  if (!t) return null;
  const n = e.doc.lineAt(t.from);
  return n.to >= t.to ? null : { from: n.to, to: t.to };
}
function R(e, t) {
  let n = false;
  return Je(e).between(t.from, t.to, () => {
    n = true;
  }), n;
}
function Zn(e, t) {
  return e.from === t.from && e.to === t.to;
}
function Jn(e, t) {
  const n = e.doc.lineAt(t);
  let s = false;
  return K(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(o) {
    const a = o.type.name;
    if (a.startsWith("ATXHeading") || a.startsWith("SetextHeading")) return s = true, false;
  } }), s;
}
function te(e, t) {
  const n = _(e.doc);
  if (n) {
    const a = e.doc.lineAt(n.from);
    if (t === a.from) {
      const l = I(e);
      if (l) return { ...l, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!Jn(e, t)) return null;
  const s = e.doc.lineAt(t), o = Or(e, s.from, s.to);
  return !o || o.from >= o.to ? null : { ...o, kind: "heading" };
}
const O = Rr.define({ combine: (e) => e[e.length - 1] ?? null }), xt = new fe();
function es(e) {
  return xt.of(O.of(e));
}
function Hs(e, t) {
  e.dispatch({ effects: xt.reconfigure(O.of(t)) });
}
function ts(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const s = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", s), n.title = s, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const o = n.querySelector("svg");
  return o && (o.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", o.style.transformOrigin = "50% 50%"), n;
}
class Be extends Pr {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return ts(this.open, this.kind);
  }
}
let ie = 0;
function gt(e, t) {
  const n = e.coordsAtPos(t.from), s = e.coordsAtPos(t.to);
  if (!n || !s) return null;
  const o = e.contentDOM.getBoundingClientRect(), a = Math.min(n.top, s.top), l = Math.max(n.bottom, s.bottom), i = Math.max(0, l - a);
  if (i < 2) return null;
  const d = document.createElement("div");
  return d.className = "cm-note-cover-fold-motion", d.style.cssText = ["position:fixed", `top:${a}px`, `left:${o.left}px`, `width:${Math.max(0, o.width)}px`, `height:${i}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(d), d;
}
async function rs(e, t) {
  const n = ++ie, s = gt(e, t);
  if (!s) {
    e.dispatch({ effects: F.of(t) });
    return;
  }
  try {
    await ce(s, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === ie && I(e.state) && e.dispatch({ effects: F.of(t) }), s.remove();
}
async function ns(e, t) {
  ++ie, e.dispatch({ effects: B.of(t) });
  const n = I(e.state);
  if (!n) return;
  const s = gt(e, n);
  if (s) {
    try {
      await ce(s, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    s.remove();
  }
}
function ht(e, t) {
  var _a;
  const n = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, "svg");
  n instanceof SVGElement && ce(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function Ke(e, t) {
  const n = R(e.state, t);
  return e.dispatch({ effects: n ? B.of(t) : F.of(t) }), true;
}
function $e(e) {
  const t = I(e.state);
  if (!t) return false;
  const s = !R(e.state, t), o = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return ht(o, !s), (async () => {
    s ? await rs(e, t) : await ns(e, t);
    const a = e.state.facet(O);
    a && Qn(a, s);
  })(), true;
}
function ze(e, t) {
  const n = I(e.state);
  if (!n) return;
  const s = R(e.state, n);
  t && !s ? e.dispatch({ effects: F.of(n) }) : !t && s && e.dispatch({ effects: B.of(n) });
}
function ss() {
  return Ze.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(O) !== this.lastKey, s = !!_(e.state.doc), o = s && !this.hadCover;
      this.hadCover = s, (t || o) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(O);
      this.lastKey = e;
      const t = _(this.view.state.doc);
      if (this.hadCover = !!t, !t) return;
      if (!e) {
        ze(this.view, true);
        return;
      }
      const n = ++this.loadGen;
      Yn(e).then((s) => {
        n === this.loadGen && ze(this.view, s !== false);
      });
    }
  });
}
function os(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(F) || n.is(B)));
}
function Ws() {
  return [es(null), Ye({ preparePlaceholder(e, t) {
    const n = I(e);
    return n && Zn(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const s = document.createElement("span");
    return s.className = "cm-foldPlaceholder", s.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", s.setAttribute("aria-hidden", "true"), s.onclick = t, s;
  } }), Qe.of((e, t) => {
    const n = _(e.doc);
    if (!n) return null;
    const s = e.doc.lineAt(n.from);
    return t !== s.from ? null : I(e);
  }), Lr({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = te(e.state, t.from);
    if (!n) return null;
    const s = !R(e.state, n);
    return new Be(s, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || os(e), initialSpacer: () => new Be(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const s = te(e.state, t.from);
    if (!s) return false;
    if (s.kind === "cover") {
      if (!$e(e)) return false;
    } else {
      const o = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      ht(o, R(e.state, s)), Ke(e, s);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), _r({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const s = _(e.state.doc);
    if (s && t.from >= s.from && t.from < s.to) return $e(e) ? (n.preventDefault(), true) : false;
    const o = te(e.state, t.from);
    return !o || o.kind !== "heading" ? false : (Ke(e, o), n.preventDefault(), true);
  } } }), ss(), me.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function as({ cover: e, getPresignedUrl: t }) {
  const n = Wt(e.pageSizeId) ? e.pageSizeId : Ut, s = m.useMemo(() => ({ ...Gt(), pageSizeId: n }), [n]), o = m.useMemo(() => Vt(n), [n]), a = m.useMemo(() => qt(s), [s]);
  return r.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: a, children: r.jsx(Wr, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${o.widthMm} / ${o.heightMm}` } }) });
}
const z = /* @__PURE__ */ new WeakMap(), pt = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", ls = "\uD45C\uC9C0";
function de(e) {
  const t = z.get(e);
  t && (t.unmount(), z.delete(e));
}
function He(e, t) {
  if (!e) return;
  const n = e.querySelector(".md-note-cover-placeholder__fallback");
  if (!n) return;
  const s = n.querySelector(".md-note-cover-placeholder__fallback-text");
  if (s) {
    s.textContent = t;
    return;
  }
  n.textContent = t;
}
function is(e) {
  if (!e) return;
  let t = e.querySelector(".md-note-cover-placeholder__fallback");
  if (t || (t = document.createElement("span"), t.className = "md-note-cover-placeholder__fallback", e.appendChild(t)), t.querySelector(".md-note-cover-placeholder__spinner")) return;
  t.replaceChildren();
  const n = document.createElement("span");
  n.className = "md-note-cover-placeholder__spinner", n.setAttribute("aria-hidden", "true");
  const s = document.createElement("span");
  s.className = "md-note-cover-placeholder__fallback-text", s.textContent = pt, t.append(n, s);
}
function re(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? (is(e), He(e, pt)) : t === "empty" && He(e, ls));
}
function ds(e, t, n) {
  let s = z.get(e);
  s || (s = Nt.createRoot(e), z.set(e, s)), s.render(m.createElement(as, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function Us(e, t, n, s) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const o = (s == null ? void 0 : s.load) !== false, { cover: a } = Xt(t ?? ""), l = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(a == null ? void 0 : a.enabled)) {
    for (const i of l) {
      de(i);
      const d = i.closest("[data-note-cover-placeholder]");
      re(d, "empty");
    }
    return 0;
  }
  if (!o) {
    for (const i of l) {
      de(i);
      const d = i.closest("[data-note-cover-placeholder]");
      re(d, "pending");
    }
    return 0;
  }
  for (const i of l) {
    const d = i.closest("[data-note-cover-placeholder]");
    re(d, "ready"), ds(i, a, n);
  }
  return l.length;
}
function Gs(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) de(n);
}
function Vs(e) {
  var _a, _b;
  if (!e) return [];
  const t = [], n = /* @__PURE__ */ new Set(), s = (o) => {
    if (!o || !o.size) return;
    const a = String(o.size);
    n.has(a) || (n.add(a), t.push(o));
  };
  if ((_a = e.files) == null ? void 0 : _a.length) for (const o of e.files) o && (((_b = o.type) == null ? void 0 : _b.startsWith("image/")) || !o.type && o.size > 0) && s(o);
  if (e.items) for (const o of e.items) {
    if (o.kind !== "file") continue;
    const a = o.type || "";
    (a.startsWith("image/") || a === "") && s(o.getAsFile());
  }
  return t;
}
function cs(e, t) {
  return t != null && e === t;
}
function qs(e) {
  const t = e.externalValue ?? "";
  return (e.liveMarkdown ?? "") === t ? false : e.userEdited ? !(!e.fileChanged && cs(t, e.lastEmittedMd) || !e.fileChanged && e.localInputActive) : true;
}
function Xs(e) {
  const t = e.markdown ?? "", n = e.parentMarkdown ?? "";
  return !(t === n || t === "" && n !== "" && !e.userEdited);
}
const us = [{ key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Ur }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: Gr }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: qr, shift: Vr }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: Xr }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: Yr }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Qr }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: Zr }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => ({ key: `Ctrl-${e}`, mac: `Cmd-${e}`, preventDefault: true, run: (t) => Ie(t, e) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (e) => Ie(e, 10) }, { any: (e, t) => (t.ctrlKey || t.metaKey) && t.altKey && t.code === "KeyC" ? Jr(e) : en(t, e) }], Ys = U.high(G.of(us));
export {
  Cs as C,
  Es as E,
  Ms as H,
  Fs as I,
  us as M,
  Is as W,
  Ts as a,
  Ls as b,
  Ps as c,
  Hs as d,
  _n as e,
  Vs as f,
  zs as g,
  Us as h,
  Rs as i,
  Os as j,
  $s as k,
  Ws as l,
  Ds as m,
  _s as n,
  T as o,
  Bs as p,
  Ys as q,
  Ks as r,
  Xs as s,
  Gs as t,
  As as u,
  qs as v
};
