var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as m, j as r, c as vt } from "./vendor-react-BPvvDyqO.js";
import { A as jt, m as kt, a as se } from "./vendor-motion-Bv-XITR_.js";
import { p as ze, s as Nt, a as St } from "./emojiShortcode-CsHTmfPL.js";
import { al as wt, F as Ct, T as Et, eA as Mt, eB as me, eC as Ft, eD as Tt, eE as q, ab as H, eF as At, eG as xe, eH as Y, G as he, eI as Lt, b5 as It, eJ as ge, eK as Dt, ew as pe, c as _t, n as X, C as be, eL as ye, eM as ve, eN as Pt, eO as Rt, aN as Bt, eP as Ot, eQ as Kt, eR as $t, eS as zt, eT as Ht, eU as Ut, eV as Wt } from "./index-BWRKY1kH.js";
import { aN as Vt, i as je, aO as Q, aP as Z, aQ as Gt, p as qt, aR as He, l as Yt, m as Ue, aS as ke, X as oe, C as ae, av as Xt, aT as Qt, aU as Zt, aV as Jt, L as er } from "./vendor-lucide-WaT9JbCs.js";
import { P as tr, w as J, x as P, U as rr, V as nr, W as sr, X as or, Y as ar, Z as lr, _ as ir, a1 as dr, ag as cr, a2 as ur, S as fr, z as mr, B as xr, F as hr, L as gr, D as pr, n as Ne, T as Se, p as we, C as Ce, A as Ee } from "./vendor-radix-D1Cm_mSM.js";
import { N as br } from "./WikiImageSizeModal-BwUb0in7.js";
import { t as yr, O as vr } from "./index-flVIUjar.js";
import { C as le, g as We, E as ie, S as Ve, D as Me, W as jr, I as Ge, J as O, K as F, L as qe, M as K, V as Ye, N as Xe, P as U, k as W, n as kr, o as D, O as Nr, y as Sr, Q as wr, T as Cr, U as Er } from "./vendor-codemirror-hMVyL7k-.js";
import { m as Qe } from "./appMarkdownItPlugins-BRT_0ER3.js";
import { r as Mr, l as Fr } from "./haimCodeTabSettings-BI7a8VYQ.js";
import { r as Tr, p as Ar, a as Lr } from "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import { C as Ir } from "./TableEditModal-BP6Vc6I_.js";
import { t as Dr, a as _r, b as Pr, c as Rr, d as Br, e as Or, f as Kr, g as $r, i as Fe, w as zr, h as Hr } from "./mdEditorSelectionWrap-Dw_M3bkD.js";
function Ur(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let s = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, o = 0, a = 0;
  t.forEach((i, d) => {
    var _a;
    const g = i.match(/^(#{1,6})\s+(.*)/);
    if (g) {
      (s.tasks.length > 0 || s.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(s), s = { name: (g[2] ?? "").trim(), tasks: [] };
      return;
    }
    const f = i.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX~])\]\s+(.*)/);
    if (f) {
      const N = Math.floor((((_a = f[1]) == null ? void 0 : _a.length) ?? 0) / 2), p = ze(f[3]), y = p === "done", b = (f[4] ?? "").trim();
      o += 1, y && (a += 1), s.tasks.push({ id: `line-${d}`, lineIndex: d, indent: N, completed: y, status: p, text: b, rawLine: i });
    }
  }), s.tasks.length > 0 && n.push(s);
  const l = o > 0 ? Math.round(a / o * 100) : 0;
  return { categories: n, totalTasks: o, completedTasks: a, pendingTasks: o - a, percentage: l };
}
function Wr(e, t) {
  const n = String(e ?? "").split(`
`);
  if (t < 0 || t >= n.length) return e;
  const o = (n[t] ?? "").match(/^(\s*(?:[-*]|\d+\.)\s+)\[([ xX~])\](.*)$/);
  if (!o) return e;
  const a = wt(e), l = Nt(St(ze(o[2]), a), a);
  return n[t] = `${o[1]}[${l}]${o[3] ?? ""}`, n.join(`
`);
}
function Vr({ markdown: e = "", onMarkdownChange: t }) {
  const [n, s] = m.useState(""), [o, a] = m.useState("all"), [l, i] = m.useState({}), [d, g] = m.useState("dashboard"), f = m.useMemo(() => Ur(e), [e]), N = m.useMemo(() => f.categories.map((x) => x.name).join("\0"), [f.categories]);
  m.useEffect(() => {
    const x = {};
    for (const v of N ? N.split("\0") : []) v && (x[v] = true);
    i(x);
  }, [N]);
  const p = (x) => {
    typeof t == "function" && t(Wr(e, x));
  }, y = (x) => {
    i((v) => ({ ...v, [x]: !v[x] }));
  }, b = (x) => {
    const v = x.text.toLowerCase().includes(n.toLowerCase()), w = o === "all" ? true : o === "completed" ? x.completed : !x.completed;
    return v && w;
  };
  return r.jsxs("div", { className: "@container space-y-3 text-xs text-slate-100", children: [r.jsxs("div", { className: "grid grid-cols-2 gap-2 @[380px]:grid-cols-4", children: [r.jsxs("div", { className: "relative min-h-19 overflow-hidden rounded-xl border border-indigo-500/30 bg-linear-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [r.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: r.jsx(Vt, { className: "h-14 w-14 text-indigo-400 @[380px]:h-16 @[380px]:w-16" }) }), r.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), r.jsx("div", { className: "my-1 flex items-baseline gap-1", children: r.jsxs("span", { className: "text-2xl font-extrabold text-white @[380px]:text-3xl", children: [f.percentage, "%"] }) }), r.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: r.jsx("div", { className: "h-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${f.percentage}%` } }) })] }), r.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [r.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [r.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), r.jsx(je, { className: "h-3.5 w-3.5 text-slate-500" })] }), r.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [f.totalTasks, " ", r.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), r.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [r.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [r.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), r.jsx(Q, { className: "h-3.5 w-3.5" })] }), r.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [f.completedTasks, " ", r.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), r.jsxs("div", { className: "flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [r.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [r.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), r.jsx(Z, { className: "h-3.5 w-3.5" })] }), r.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [f.pendingTasks, " ", r.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), r.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [r.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [r.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [r.jsxs("button", { type: "button", onClick: () => g("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${d === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [r.jsx(Gt, { className: "h-3 w-3" }), r.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), r.jsxs("button", { type: "button", onClick: () => g("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${d === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [r.jsx(je, { className: "h-3 w-3" }), r.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), r.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [r.jsxs("div", { className: "relative min-w-30 flex-1", children: [r.jsx(qt, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), r.jsx("input", { type: "text", value: n, onChange: (x) => s(x.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), r.jsxs("select", { value: o, onChange: (x) => a(x.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [r.jsx("option", { value: "all", children: "\uC804\uCCB4" }), r.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), r.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), d === "dashboard" && r.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: f.categories.length === 0 ? r.jsxs("div", { className: "py-8 text-center text-slate-500", children: [r.jsx(He, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), r.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), r.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : f.categories.map((x, v) => {
    const w = x.tasks.length, S = x.tasks.filter((h) => h.completed).length, C = w > 0 ? Math.round(S / w * 100) : 0, E = !!l[x.name], u = x.tasks.filter(b);
    return n && u.length === 0 ? null : r.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [r.jsxs("button", { type: "button", onClick: () => y(x.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [r.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [r.jsx("span", { className: "shrink-0 text-slate-500", children: E ? r.jsx(Yt, { className: "h-3.5 w-3.5" }) : r.jsx(Ue, { className: "h-3.5 w-3.5" }) }), r.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: x.name })] }), r.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [r.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [r.jsx("strong", { className: "text-slate-200", children: S }), " /", " ", w] }), r.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${C === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [C, "%"] })] })] }), E ? r.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: u.length === 0 ? r.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : u.map((h) => r.jsxs("button", { type: "button", onClick: () => p(h.lineIndex), style: { paddingLeft: `${h.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [r.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: h.completed ? r.jsx(Q, { className: "h-3.5 w-3.5 text-emerald-400" }) : h.status === "doing" ? r.jsx(ke, { className: "h-3.5 w-3.5 text-amber-400" }) : r.jsx(Z, { className: "h-3.5 w-3.5 text-slate-600" }) }), r.jsx("span", { className: `leading-relaxed ${h.completed ? "text-slate-500 line-through" : h.status === "doing" ? "text-amber-200/90" : "text-slate-300"}`, children: h.text })] }, h.id)) }) : null] }, `${x.name}-${v}`);
  }) }), d === "checklist" ? r.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: f.categories.map((x, v) => {
    const w = x.tasks.filter(b);
    return w.length === 0 ? null : r.jsxs("div", { className: "space-y-1", children: [r.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [x.name, " (", w.length, ")"] }), w.map((S) => r.jsxs("button", { type: "button", onClick: () => p(S.lineIndex), style: { paddingLeft: `${S.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [r.jsx("span", { className: "mt-0.5 shrink-0", children: S.completed ? r.jsx(Q, { className: "h-3.5 w-3.5 text-emerald-400" }) : S.status === "doing" ? r.jsx(ke, { className: "h-3.5 w-3.5 text-amber-400" }) : r.jsx(Z, { className: "h-3.5 w-3.5 text-slate-600" }) }), r.jsx("span", { className: `leading-relaxed ${S.completed ? "text-slate-500 line-through" : S.status === "doing" ? "text-amber-200/90" : "text-slate-200"}`, children: S.text })] }, S.id))] }, `${x.name}-list-${v}`);
  }) }) : null] })] });
}
const Gr = Et, qr = "s3haim_checklist_progress_sidebar_width", Yr = 360, Xr = 260, Qr = 560, Zr = [0.32, 0.72, 0, 1], Jr = { type: "spring", stiffness: 420, damping: 36, mass: 0.85 };
function us({ open: e, onOpenChange: t, markdown: n, onMarkdownChange: s, overlay: o = false }) {
  const { width: a, isResizing: l, handleProps: i } = Ct({ storageKey: qr, defaultWidth: Yr, minWidth: Xr, maxWidth: Qr, edge: "right", collapseBelowWidth: 180, onCollapseBelowMin: () => t == null ? void 0 : t(false) }), d = o ? ["absolute inset-y-0 right-0 z-30 flex flex-col overflow-hidden", "rounded-bl-md border border-slate-200/80 border-t-0 bg-white/95 shadow-lg", "dark:border-odp-borderStrong/80 dark:bg-odp-surface/95 dark:shadow-black/40"].join(" ") : "relative flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-300 bg-white/95 dark:border-odp-borderStrong dark:bg-odp-surface/95", g = () => t == null ? void 0 : t(false);
  return r.jsx(jt, { initial: false, children: e ? r.jsx(kt.aside, { role: "complementary", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", className: d, style: o ? { width: a, willChange: "transform, opacity" } : { overflow: "hidden", willChange: "width, opacity" }, initial: o ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, animate: o ? { x: 0, opacity: 1 } : { width: a, opacity: 1 }, exit: o ? { x: "100%", opacity: 0.88 } : { width: 0, opacity: 0.85 }, transition: l ? { duration: 0 } : o ? { type: "tween", duration: 0.22, ease: Zr } : Jr, children: r.jsxs("div", { className: "relative flex h-full min-h-0 w-full flex-col", style: o ? void 0 : { width: a }, children: [r.jsx(Gr, { edge: "left", handleProps: i, isResizing: l, visibleOnHover: true, label: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), r.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-2.5 py-2 dark:border-odp-borderSoft", children: [r.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong", children: [r.jsx(He, { size: 14, className: "shrink-0 text-indigo-500 dark:text-indigo-300", "aria-hidden": true }), r.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), r.jsx("button", { type: "button", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD328\uB110 \uB2EB\uAE30", onClick: g, className: "inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: r.jsx(oe, { size: 14 }) })] }), r.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-2.5", children: String(n ?? "").trim() ? r.jsx(Vr, { markdown: n, onMarkdownChange: s }) : r.jsxs("p", { className: "rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted", children: ["\uBB38\uC11C\uC5D0 \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", r.jsx("br", {}), "`- [ ]` \uD56D\uBAA9\uC744 \uCD94\uAC00\uD574 \uBCF4\uC138\uC694."] }) })] }) }, o ? "checklist-overlay" : "checklist-dock") : null });
}
const en = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], tn = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], rn = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), nn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Te = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function fs({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: s, onApply: o }) {
  const a = n.length > 0, [l, i] = m.useState("document"), [d, g] = m.useState(1), [f, N] = m.useState(false), [p, y] = m.useState("nested"), [b, x] = m.useState("one"), [v, w] = m.useState(1), [S, C] = m.useState("1"), E = m.useRef(null), u = l === "selection" ? n : t, h = m.useMemo(() => Mt(u), [u]), L = b === "min" ? h ?? 1 : b === "custom" ? ge(v) : 1;
  m.useEffect(() => {
    if (!e) return;
    const c = a ? "selection" : "document";
    i(c), g(me(c === "selection" ? n : t)), N(false), y("nested"), x("one"), w(1), C("1");
  }, [e, t, n, a]), m.useEffect(() => {
    b === "min" && h == null && x("one");
  }, [b, h]), m.useEffect(() => {
    var _a;
    !f || b !== "custom" || ((_a = E.current) == null ? void 0 : _a.focus());
  }, [f, b]), m.useEffect(() => {
    if (!e) return;
    const c = (k) => {
      const I = k;
      return (I == null ? void 0 : I.closest) ? !!I.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, j = () => {
      const k = document.activeElement;
      k && c(k) && typeof k.blur == "function" && k.blur();
    };
    j();
    const M = (k) => {
      var _a, _b;
      if (k.metaKey || k.ctrlKey || k.altKey) return;
      const I = ((_b = (_a = k.target) == null ? void 0 : _a.tagName) == null ? void 0 : _b.toLowerCase()) ?? "";
      if (I === "input" || I === "textarea" || I === "select") return;
      const G = k.key;
      if (G >= "1" && G <= "9") {
        const fe = Number(G);
        xe(fe) && (k.preventDefault(), k.stopPropagation(), k.stopImmediatePropagation(), g(fe));
        return;
      }
      k.key === "Escape" || k.key === "Enter" || c(k.target) && (k.preventDefault(), k.stopPropagation(), k.stopImmediatePropagation(), j());
    };
    return window.addEventListener("keydown", M, true), () => window.removeEventListener("keydown", M, true);
  }, [e]);
  const $ = m.useMemo(() => Ft(u, d, { maxLevel: pe, renumberOutline: f, outlineStyle: p, outlineStart: L }), [u, d, f, p, L]), ht = (c) => {
    if (c !== "selection" && c !== "document" || c === "selection" && !a) return;
    i(c), g(me(c === "selection" ? n : t));
  }, ce = () => {
    if (!$.sourceMax) return;
    const c = Dt(u, d, { maxLevel: pe, renumberOutline: f, outlineStyle: p, outlineStart: L });
    c !== u && o(c, l), s();
  }, gt = Tt(p, d), pt = q(1, p, d), ue = h == null ? null : q(h, p, d), bt = (c) => {
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
  }, yt = () => {
    const c = Y(S, p, d), j = ge(c ?? v);
    w(j), C(String(j));
  }, V = (c) => ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", c ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" ");
  return r.jsx(H, { isOpen: e, onClose: s, onConfirm: ce, ignoreEnterInFields: true, contentClassName: "max-w-3xl max-h-[90vh]", children: r.jsx(tr, { delayDuration: 250, skipDelayDuration: 0, children: r.jsxs("div", { className: "flex min-h-0 flex-1 flex-col", role: "dialog", "aria-modal": "true", "aria-labelledby": "heading-remap-title", children: [r.jsxs("header", { className: "shrink-0 border-b border-gray-100 px-6 py-4 dark:border-odp-borderSoft", children: [r.jsx("h2", { id: "heading-remap-title", className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), r.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] })] }), r.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 py-4", children: [r.jsxs("div", { className: "mt-4", children: [r.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), r.jsx(J, { className: "flex items-center gap-2", value: l, onValueChange: ht, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: en.map((c) => {
    const j = l === c.value, M = c.value === "selection" && !a;
    return r.jsx(P, { value: c.value, disabled: M, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", j ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: r.jsxs("div", { className: j ? "" : "opacity-50", children: [r.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: c.title }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: c.value === "selection" && !a ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : c.description })] }) }, c.value);
  }) })] }), r.jsxs("div", { className: "mt-4", children: [r.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), r.jsxs(rr, { value: String(d), onValueChange: (c) => {
    const j = Number(c);
    xe(j) && g(j);
  }, children: [r.jsxs(nr, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [r.jsx(sr, {}), r.jsx(or, { className: "text-gray-500", children: r.jsx(Ue, { size: 14 }) })] }), r.jsx(ar, { children: r.jsx(lr, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: r.jsx(ir, { className: "p-1", children: At.map((c) => r.jsxs(dr, { value: String(c), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [r.jsx(cr, { className: "absolute left-1.5 inline-flex items-center", children: r.jsx(ae, { size: 12 }) }), r.jsx(ur, { children: `h${c}` })] }, c)) }) }) })] })] }), r.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [r.jsxs("div", { className: "flex items-center justify-between gap-3", children: [r.jsxs("div", { className: "min-w-0", children: [r.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), r.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), r.jsx(fr, { className: rn(f), checked: f, onCheckedChange: N, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: r.jsx(mr, { className: nn }) })] }), f ? r.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [r.jsxs("div", { children: [r.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), r.jsx(J, { className: "flex items-center gap-2", value: p, onValueChange: (c) => {
    (c === "flat" || c === "nested") && y(c);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: tn.map((c) => {
    const j = p === c.value;
    return r.jsx(P, { value: c.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", j ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: r.jsxs("div", { className: j ? "" : "opacity-50", children: [r.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: c.title }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: c.description })] }) }, c.value);
  }) })] }), r.jsxs("div", { children: [r.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), r.jsxs(J, { className: "flex flex-col gap-2 sm:flex-row sm:items-stretch", value: b, onValueChange: (c) => {
    c !== "one" && c !== "min" && c !== "custom" || c === "min" && h == null || x(c);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: [r.jsx(P, { value: "one", className: V(b === "one"), children: r.jsxs("div", { className: b === "one" ? "" : "opacity-50", children: [r.jsxs("div", { className: "flex items-center gap-1.5 font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: [r.jsx(Xt, { size: 14, "aria-hidden": true }), "1\uBD80\uD130"] }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: `\uCD5C\uB300 heading\uC774 ${pt} \uB85C \uC2DC\uC791` })] }) }), r.jsx(P, { value: "min", disabled: h == null, className: V(b === "min"), children: r.jsxs("div", { className: b === "min" ? "" : "opacity-50", children: [r.jsxs("div", { className: "flex items-center gap-1.5 font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: [r.jsx(Qt, { size: 14, "aria-hidden": true }), "\uCD5C\uC18C \uBC88\uD638\uBD80\uD130"] }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: ue ? `${l === "selection" ? "\uC120\uD0DD \uC601\uC5ED" : "\uBB38\uC11C"} \uBC88\uD638 \uC911 \uAC00\uC7A5 \uC791\uC740 ${ue} \uBD80\uD130` : "\uBC88\uD638\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" })] }) }), r.jsx(P, { value: "custom", className: V(b === "custom"), children: r.jsxs("div", { className: b === "custom" ? "" : "opacity-50", children: [r.jsxs("div", { className: "flex items-center gap-1.5 font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: [r.jsx(Zt, { size: 14, "aria-hidden": true }), "\uC9C1\uC811 \uC785\uB825"] }), r.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC785\uB825\uD55C \uBC88\uD638\uBD80\uD130 \uD604\uC7AC \uD615\uC2DD\uC5D0 \uB9DE\uCDA4" })] }) })] }), b === "custom" ? r.jsx(xr, { className: "mt-2", onSubmit: (c) => c.preventDefault(), children: r.jsxs(hr, { name: "outline-custom-start", className: "flex flex-col gap-1", children: [r.jsx(gr, { className: "text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), r.jsxs("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1", children: [r.jsxs("div", { className: "inline-flex items-center gap-0.5", children: [r.jsx(pr, { asChild: true, children: r.jsx("input", { ref: E, id: "heading-remap-outline-start", type: "text", inputMode: "numeric", autoComplete: "off", "aria-label": "\uC9C1\uC811 \uC785\uB825\uD55C \uC2DC\uC791 \uBC88\uD638", "aria-describedby": "heading-remap-outline-format", value: S, onChange: (c) => bt(c.target.value), onBlur: yt, className: "w-16 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-right text-sm tabular-nums text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong" }) }), r.jsx("span", { className: "font-mono text-sm text-gray-700 dark:text-odp-fg", "aria-hidden": true, children: gt })] }), r.jsx("span", { id: "heading-remap-outline-format", className: "text-[11px] text-gray-500 dark:text-odp-muted", children: `\uD615\uC2DD ${q(Y(S, p, d) ?? L, p, d)}` })] })] }) }) : null] })] }) : null] }), r.jsx("div", { className: "mt-4 min-h-0", children: $.rows.length ? r.jsx("div", { className: "rounded-md border border-gray-200 dark:border-odp-borderSoft", children: r.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [r.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: r.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [r.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), r.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), r.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), r.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), r.jsx("tbody", { children: $.rows.map((c, j) => r.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [r.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: r.jsxs(Ne, { children: [r.jsx(Se, { asChild: true, children: r.jsx("span", { className: "block truncate", children: c.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), r.jsx(we, { children: r.jsxs(Ce, { side: "top", sideOffset: 6, className: Te, children: [c.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", r.jsx(Ee, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), r.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: r.jsxs(Ne, { children: [r.jsx(Se, { asChild: true, children: r.jsx("span", { className: "block truncate", children: c.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), r.jsx(we, { children: r.jsxs(Ce, { side: "top", sideOffset: 6, className: Te, children: [c.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", r.jsx(Ee, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), r.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", c.from] }), r.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", c.to] })] }, `${c.from}-${j}-${c.text}`)) })] }) }) : r.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: l === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) })] }), r.jsxs("footer", { className: "flex shrink-0 justify-end gap-2 border-t border-gray-100 px-6 py-4 dark:border-odp-borderSoft", children: [r.jsxs(he, { type: "button", variant: "secondary", size: "md", onClick: s, children: [r.jsx(Lt, { size: 16 }), "\uCDE8\uC18C"] }), r.jsxs(he, { type: "button", variant: "primary", size: "md", onClick: ce, disabled: !$.sourceMax, children: [r.jsx(It, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function ms({ isOpen: e, onClose: t, onConfirm: n }) {
  const [s, o] = m.useState(""), [a, l] = m.useState(""), [i, d] = m.useState("");
  m.useEffect(() => {
    e && (o(""), l(""), d(""));
  }, [e]);
  const g = () => {
    const f = a.trim();
    if (!f) {
      d("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: s.trim(), url: f }), t();
  };
  return r.jsx(H, { isOpen: e, onClose: t, onConfirm: g, ignoreEnterInFields: true, children: r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [r.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), r.jsxs("label", { className: "block", children: [r.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), r.jsx("input", { type: "text", value: s, onChange: (f) => o(f.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), r.jsxs("label", { className: "block", children: [r.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), r.jsx("input", { type: "text", value: a, onChange: (f) => l(f.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), i ? r.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: i }) : null, r.jsxs("div", { className: "flex justify-end gap-2", children: [r.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [r.jsx(oe, { size: 16 }), "\uCDE8\uC18C"] }), r.jsxs("button", { type: "button", onClick: g, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [r.jsx(ae, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function xs({ isOpen: e, file: t, onClose: n, onConfirm: s }) {
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
  }, [e, t]), r.jsx(H, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: o ? r.jsx(br, { imageSrc: o, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: s }) : null });
}
const sn = 8192, on = 16;
function Ae(e) {
  return Math.min(sn, Math.max(on, Math.round(e)));
}
function an(e) {
  const t = (e || "#ffffff").trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(t) ? t : "#ffffff";
}
async function Le(e) {
  const t = Ae(e.width), n = Ae(e.height), s = an(e.background ?? "#ffffff"), o = document.createElement("canvas");
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
const ln = [{ id: "hd", label: "1280\xD7720", width: 1280, height: 720 }, { id: "fhd", label: "1920\xD71080", width: 1920, height: 1080 }, { id: "sq", label: "1080\xD71080", width: 1080, height: 1080 }, { id: "a4", label: "A4~", width: 794, height: 1123 }], dn = [{ id: "white", label: "\uD770\uC0C9", value: "#ffffffff" }, { id: "paper", label: "\uD06C\uB9BC", value: "#fff8e7ff" }, { id: "gray", label: "\uD68C\uC0C9", value: "#f3f4f6ff" }, { id: "black", label: "\uAC80\uC815", value: "#111827ff" }, { id: "clear", label: "\uD22C\uBA85", value: "#00000000" }];
function hs({ isOpen: e, onClose: t, onConfirm: n, disabled: s = false }) {
  const [o, a] = m.useState(1920), [l, i] = m.useState(1080), [d, g] = m.useState("#ffffffff"), [f, N] = m.useState(""), [p, y] = m.useState(false), [b, x] = m.useState("");
  m.useEffect(() => {
    e && (a(1920), i(1080), g("#ffffffff"), N(""), y(false));
  }, [e]);
  const v = _t(X(d) || "#ffffffff");
  m.useEffect(() => {
    if (!e) {
      x("");
      return;
    }
    let u = false, h = "";
    return (async () => {
      try {
        const L = await Le({ width: o, height: l, background: d });
        if (u) return;
        h = URL.createObjectURL(L), x(h);
      } catch {
        u || x("");
      }
    })(), () => {
      u = true, h && URL.revokeObjectURL(h);
    };
  }, [e, o, l, d]);
  const w = m.useMemo(() => {
    const h = Math.min(1, 220 / Math.max(o, l, 1));
    return { width: Math.max(24, Math.round(o * h)), height: Math.max(24, Math.round(l * h)) };
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
  return r.jsx(H, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [r.jsxs("div", { className: "flex items-center gap-2", children: [r.jsx(Jt, { size: 20, className: "text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }), r.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30" })] }), r.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uBE48 \uCE94\uBC84\uC2A4 PNG\uB97C \uB9CC\uB4E4\uC5B4 \uB178\uD2B8\uC5D0", " ", r.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "![[path]]" }), " ", "\uB85C \uB123\uC740 \uB4A4, \uD06C\uAC8C \uBCF4\uAE30(\uB354\uBE14\uD074\uB9AD)\uC5D0\uC11C \uC5F0\uD544 \uBC84\uD2BC\uC744 \uB204\uB974\uBA74 \uADF8\uB9B4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), r.jsx("div", { className: "flex flex-wrap gap-1.5", children: ln.map((u) => r.jsx("button", { type: "button", disabled: E, className: `rounded-md border px-2 py-1 text-[11px] ${o === u.width && l === u.height ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200" : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`, onClick: () => {
    a(u.width), i(u.height);
  }, children: u.label }, u.id)) }), r.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [r.jsxs("label", { className: "block", children: [r.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB108\uBE44 (px)" }), r.jsx("input", { type: "number", min: 16, max: 8192, value: o, disabled: E, onChange: (u) => a(Number(u.target.value) || 16), onKeyDown: C, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), r.jsxs("label", { className: "block", children: [r.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB192\uC774 (px)" }), r.jsx("input", { type: "number", min: 16, max: 8192, value: l, disabled: E, onChange: (u) => i(Number(u.target.value) || 16), onKeyDown: C, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), r.jsxs("div", { className: "flex flex-col gap-2", children: [r.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uBC30\uACBD\uC0C9" }), r.jsx("div", { className: "flex flex-wrap gap-1.5", children: dn.map((u) => r.jsxs("button", { type: "button", disabled: E, "aria-label": u.label, className: `inline-flex h-8 items-center gap-1.5 rounded-md border px-2 text-[11px] ${d.toLowerCase() === u.value ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40" : "border-gray-300 dark:border-odp-borderStrong"}`, onClick: () => g(u.value), children: [r.jsx("span", { className: "inline-block h-4 w-4 overflow-hidden rounded border border-black/10", style: be, children: r.jsx("span", { className: "block h-full w-full", style: { backgroundColor: u.value } }) }), u.label] }, u.id)) }), r.jsxs("div", { className: "rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong", children: [r.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: r.jsx(yr, { color: v, onChange: (u) => {
    const h = X(u.startsWith("#") ? u : `#${u}`);
    h && g(h);
  } }) }), r.jsx(vr, { alpha: true, prefixed: true, color: v, onChange: (u) => {
    const h = X(u.startsWith("#") ? u : `#${u}`);
    h && g(h);
  }, className: "mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), r.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 p-4 dark:border-odp-borderStrong", style: be, children: [b ? r.jsx("img", { src: b, alt: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uBBF8\uB9AC\uBCF4\uAE30", style: { width: w.width, height: w.height }, className: "object-contain shadow-sm" }) : r.jsx("div", { className: "flex h-28 w-40 items-center justify-center text-xs text-gray-400", children: "\uBBF8\uB9AC\uBCF4\uAE30" }), r.jsxs("span", { className: "text-[10px] text-gray-500 dark:text-odp-muted", children: [o, " \xD7 ", l, "px"] })] }), f ? r.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: f }) : null, r.jsxs("div", { className: "flex justify-end gap-2", children: [r.jsxs("button", { type: "button", onClick: t, disabled: p, className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: [r.jsx(oe, { size: 14, "aria-hidden": true }), "\uCDE8\uC18C"] }), r.jsxs("button", { type: "button", onClick: () => {
    S();
  }, disabled: E, className: "inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50", children: [p ? r.jsx(er, { size: 14, className: "animate-spin", "aria-hidden": true }) : r.jsx(ae, { size: 14, "aria-hidden": true }), "\uC0BD\uC785"] })] })] }) });
}
function gs() {
  const [e, t] = m.useState(ye);
  m.useEffect(() => {
    const s = () => t(ye());
    return window.addEventListener(ve, s), () => {
      window.removeEventListener(ve, s);
    };
  }, []);
  const n = m.useCallback((s) => {
    t((o) => {
      const a = typeof s == "function" ? s(o) : !!s;
      return Pt(a), a;
    });
  }, []);
  return [e, n];
}
const cn = 48, Ie = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, Ze = Ve.define(), Je = Ve.define(), et = new le();
function un(e) {
  const t = [];
  Ie.lastIndex = 0;
  let n;
  for (; (n = Ie.exec(e)) !== null; ) {
    const s = n[1] ?? "image", o = n[2] ?? "";
    if (o.length < cn) continue;
    const a = n[0], l = a.length - o.length, i = n.index + l;
    t.push({ from: i, to: n.index + a.length, mime: s });
  }
  return t;
}
function fn(e, t) {
  const n = Math.round(t * 3 / 4), s = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${s}\u2026`;
}
class mn extends jr {
  constructor(t, n, s) {
    super(), this.label = t, this.from = n, this.to = s;
  }
  toDOM(t) {
    const n = document.createElement("span");
    return n.textContent = this.label, n.className = "cm-base64-image-fold", n.title = "Click to expand base64 image data", n.addEventListener("mousedown", (s) => {
      s.preventDefault(), s.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: Ze.of({ from: this.from, to: this.to }) }), t.focus();
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
function xn(e, t, n) {
  return e.some((s) => s.from === t && s.to === n);
}
function De(e, t) {
  const n = [], s = [];
  for (let o = 1; o <= e.doc.lines; o += 1) {
    const a = e.doc.line(o);
    for (const l of un(a.text)) {
      const i = a.from + l.from, d = a.from + l.to;
      if (xn(t, i, d)) {
        s.push({ from: i, to: d });
        continue;
      }
      n.push(Me.replace({ widget: new mn(fn(l.mime, d - i), i, d) }).range(i, d));
    }
  }
  return { deco: Me.set(n, true), expanded: s };
}
const tt = We.define({ create(e) {
  return De(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: o, to: a }) => ({ from: t.changes.mapPos(o, 1), to: t.changes.mapPos(a, -1) })).filter(({ from: o, to: a }) => o < a));
  let s = n !== e.expanded;
  for (const o of t.effects) o.is(Ze) ? (n = [{ from: o.value.from, to: o.value.to }], s = true) : o.is(Je) && n.length > 0 && (n = [], s = true);
  return t.docChanged || s ? De(t.state, n) : e;
}, provide: (e) => ie.decorations.from(e, (t) => t.deco) }), hn = ie.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(tt, false);
  if (!n || n.expanded.length === 0) return false;
  const s = e.target;
  if (!(s instanceof Node) || !t.dom.contains(s)) return false;
  const o = t.posAtDOM(s, 0);
  return o !== -1 && n.expanded.some(({ from: a, to: l }) => o >= a && o <= l) || t.dispatch({ effects: Je.of(null) }), false;
} });
function rt() {
  return [tt, hn];
}
function ps(e) {
  return et.of(e ? rt() : []);
}
function bs(e, t) {
  if (e) try {
    e.dispatch({ effects: et.reconfigure(t ? rt() : []) });
  } catch {
  }
}
const nt = new le();
function gn(e, t, n) {
  let s = false;
  return Xe(e).between(t, n, () => {
    s = true;
  }), s;
}
function pn(e) {
  const t = [], n = e.doc.toString();
  return K(e).iterate({ enter(s) {
    if (s.name !== "FencedCode") return;
    const o = Qe(n, s.from, s.to);
    o && t.push(o);
  } }), t;
}
function st(e, t, n) {
  return e.some((s) => s.from === t && s.to === n);
}
const ot = We.define({ create() {
  return [];
}, update(e, t) {
  let n = e;
  t.docChanged && n.length && (n = n.map(({ from: o, to: a }) => ({ from: t.changes.mapPos(o, 1), to: t.changes.mapPos(a, -1) })).filter(({ from: o, to: a }) => o < a));
  let s = n !== e;
  for (const o of t.effects) if (o.is(O)) st(n, o.value.from, o.value.to) || (n = [...n, o.value], s = true);
  else if (o.is(F)) {
    const a = n.filter((l) => l.from !== o.value.from || l.to !== o.value.to);
    a.length !== n.length && (n = a, s = true);
  }
  return s ? n : e;
} });
function _e(e) {
  const t = e.state.field(ot), n = [];
  for (const s of pn(e.state)) st(t, s.from, s.to) || gn(e.state, s.from, s.to) || n.push(F.of(s));
  n.length > 0 && e.dispatch({ effects: n });
}
const bn = Ye.fromClass(class {
  constructor(e) {
    _e(e);
  }
  update(e) {
    e.docChanged && _e(e.view);
  }
}), yn = qe.of((e, t) => {
  const n = e.doc.toString();
  let s = null;
  return K(e).iterate({ enter(o) {
    if (o.name !== "FencedCode" || e.doc.lineAt(o.from).from !== t) return;
    const l = Qe(n, o.from, o.to);
    if (l) return s = l, false;
  } }), s;
});
function at() {
  return [ot, Ge(), yn, bn];
}
function ys(e) {
  return nt.of(e ? at() : []);
}
function vs(e, t) {
  if (e) try {
    e.dispatch({ effects: nt.reconfigure(t ? at() : []) });
  } catch {
  }
}
function vn(e) {
  var _a, _b;
  if (!(e == null ? void 0 : e.state)) return false;
  const t = (_b = (_a = e.state.selection) == null ? void 0 : _a.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return false;
  const n = e.state.doc.lineAt(t);
  return e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from }, scrollIntoView: true }), true;
}
function js(e) {
  return e.altKey || !e.shiftKey || !(e.ctrlKey || e.metaKey) ? false : (e.key || "").toLowerCase() === "enter" ? true : e.code === "Enter" || e.code === "NumpadEnter";
}
const jn = { key: "Mod-Shift-Enter", preventDefault: true, run: vn }, ks = U.highest(W.of([jn]));
function kn(e, t, n) {
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
    return a < 0 || l < a || t < a || t > l ? null : { language: kn(e, o.from, o.to), bodyFrom: a, bodyTo: l };
  }
  return null;
}
function lt(e) {
  return Mr(e, Fr());
}
function Pe(e, t) {
  var _a;
  const n = ((_a = e.match(/^ */)) == null ? void 0 : _a[0]) ?? "";
  return Math.min(n.length, t);
}
function de(e, t, n, s, o) {
  const a = [], l = e.doc.lineAt(Math.max(s, t)), i = Math.max(s, Math.min(o, n)), d = e.doc.lineAt(Math.max(t, Math.min(i, n)));
  for (let g = l.number; g <= d.number; g += 1) {
    const f = e.doc.line(g);
    f.from >= n || f.to < t || f.from < t || f.from >= n || s < f.to && o > f.from && a.push(f.from);
  }
  return a;
}
function Nn(e, t) {
  const { from: n, to: s, empty: o } = e.selection.main, a = T(e, n);
  if (!a) return null;
  if (!o) {
    const p = T(e, Math.max(n, s - 1));
    if (!p || p.bodyFrom !== a.bodyFrom) return null;
  }
  const l = Math.max(1, Math.round(t)), i = " ".repeat(l);
  if (o) return { changes: { from: n, insert: i }, selection: D.cursor(n + i.length), userEvent: "input.indent" };
  const d = de(e, a.bodyFrom, a.bodyTo, n, s);
  if (d.length === 0) return null;
  const g = d.map((p) => ({ from: p, insert: i })), f = d[0], N = s + d.length * i.length;
  return { changes: g, selection: D.range(f, N), userEvent: "input.indent" };
}
function Sn(e, t) {
  const { from: n, to: s, empty: o } = e.selection.main, a = T(e, n);
  if (!a) return null;
  if (!o) {
    const y = T(e, Math.max(n, s - 1));
    if (!y || y.bodyFrom !== a.bodyFrom) return null;
  }
  const l = Math.max(1, Math.round(t)), i = o ? (() => {
    const y = e.doc.lineAt(n);
    return y.from < a.bodyFrom || y.from >= a.bodyTo ? [] : [y.from];
  })() : de(e, a.bodyFrom, a.bodyTo, n, s);
  if (i.length === 0) return null;
  const d = [];
  let g = 0, f = 0;
  for (let y = i.length - 1; y >= 0; y -= 1) {
    const b = i[y], x = e.doc.lineAt(b), v = Pe(x.text, l);
    v !== 0 && (d.push({ from: b, to: b + v, insert: "" }), f += v, b < n && (g += v));
  }
  if (f === 0) return { changes: [], userEvent: "delete.dedent" };
  if (o) {
    const y = i[0], b = n - y, x = Pe(e.doc.lineAt(y).text, l), v = b <= x ? y : n - x;
    return { changes: d, selection: D.cursor(v), userEvent: "delete.dedent" };
  }
  const N = Math.max(i[0], n - g), p = Math.max(N, s - f);
  return { changes: d, selection: D.range(N, p), userEvent: "delete.dedent" };
}
function it(e) {
  const t = T(e, e.selection.main.from);
  return t ? lt(t.language) : null;
}
function wn(e) {
  const t = it(e.state);
  if (t == null) return false;
  const n = Nn(e.state, t);
  return n ? (e.dispatch(n), true) : false;
}
function Cn(e) {
  const t = it(e.state);
  if (t == null) return false;
  const n = Sn(e.state, t);
  return n ? (e.dispatch(n), true) : false;
}
const En = { key: "Tab", run: wn, shift: Cn }, Ns = U.high(W.of([En]));
function Ss() {
  return kr.of(" ".repeat(lt("")));
}
function Mn(e) {
  const { from: t, to: n, empty: s } = e.selection.main, o = T(e, t);
  if (!o) return null;
  if (!s) {
    const i = T(e, Math.max(t, n - 1));
    if (!i || i.bodyFrom !== o.bodyFrom) return null;
  }
  const a = s ? (() => {
    const i = e.doc.lineAt(t);
    return i.from < o.bodyFrom || i.from >= o.bodyTo ? [] : [i.from];
  })() : de(e, o.bodyFrom, o.bodyTo, t, n);
  if (a.length === 0) return null;
  const l = a.map((i) => {
    const d = e.doc.lineAt(i), g = Math.min(d.to, o.bodyTo);
    return { from: d.from, text: e.doc.sliceString(d.from, g) };
  });
  return { language: o.language, lines: l };
}
function Fn(e) {
  return e.map((t) => {
    var _a;
    const n = ((_a = /^\s*/.exec(t.text)) == null ? void 0 : _a[0].length) ?? 0, s = t.from + n, o = t.from + t.text.length;
    return { from: s, to: o, content: t.text.slice(n) };
  });
}
function Tn(e) {
  return e.map((t) => t.to != null && t.to !== t.from ? { from: t.from, to: t.to, insert: t.insert } : { from: t.from, insert: t.insert });
}
function An(e) {
  const t = Mn(e);
  if (!t) return null;
  const n = Tr(t.language);
  let s = null;
  if (n.line ? s = Ar(t.lines, n.line) : n.block && (s = Lr(Fn(t.lines), n.block.open, n.block.close)), !s || s.length === 0) return null;
  const o = Tn(s), { from: a, to: l, empty: i } = e.selection.main, d = e.changes(o);
  return i ? { changes: d, selection: D.cursor(d.mapPos(a, 1)), userEvent: "input.comment" } : { changes: d, selection: D.range(d.mapPos(a, -1), d.mapPos(l, 1)), userEvent: "input.comment" };
}
function Ln(e) {
  if (e.state.readOnly) return false;
  const t = An(e.state);
  return t ? (e.dispatch(t), true) : false;
}
const In = { key: "Mod-/", run: Ln }, ws = U.high(W.of([In])), dt = new Bt("s3haim-note-cover-fold");
dt.version(1).stores({ folds: "key, updatedAt" });
const ct = dt.folds;
function Dn(e, t) {
  return `cover-fold:${Rt(e, t)}`;
}
function Cs(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Dn(e.type, e.id);
}
async function _n(e) {
  if (!e) return null;
  const t = await ct.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function Pn(e, t) {
  e && await ct.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function _(e) {
  const t = Math.min(e.length, 2e6);
  return Ot(e.sliceString(0, t));
}
function A(e) {
  const t = _(e.doc);
  if (!t) return null;
  const n = e.doc.lineAt(t.from);
  return n.to >= t.to ? null : { from: n.to, to: t.to };
}
function R(e, t) {
  let n = false;
  return Xe(e).between(t.from, t.to, () => {
    n = true;
  }), n;
}
function Rn(e, t) {
  return e.from === t.from && e.to === t.to;
}
function Bn(e, t) {
  const n = e.doc.lineAt(t);
  let s = false;
  return K(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(o) {
    const a = o.type.name;
    if (a.startsWith("ATXHeading") || a.startsWith("SetextHeading")) return s = true, false;
  } }), s;
}
function ee(e, t) {
  const n = _(e.doc);
  if (n) {
    const a = e.doc.lineAt(n.from);
    if (t === a.from) {
      const l = A(e);
      if (l) return { ...l, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!Bn(e, t)) return null;
  const s = e.doc.lineAt(t), o = Er(e, s.from, s.to);
  return !o || o.from >= o.to ? null : { ...o, kind: "heading" };
}
const B = Cr.define({ combine: (e) => e[e.length - 1] ?? null }), ut = new le();
function On(e) {
  return ut.of(B.of(e));
}
function Es(e, t) {
  e.dispatch({ effects: ut.reconfigure(B.of(t)) });
}
function Kn(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const s = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", s), n.title = s, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const o = n.querySelector("svg");
  return o && (o.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", o.style.transformOrigin = "50% 50%"), n;
}
class Re extends wr {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return Kn(this.open, this.kind);
  }
}
let re = 0;
function ft(e, t) {
  const n = e.coordsAtPos(t.from), s = e.coordsAtPos(t.to);
  if (!n || !s) return null;
  const o = e.contentDOM.getBoundingClientRect(), a = Math.min(n.top, s.top), l = Math.max(n.bottom, s.bottom), i = Math.max(0, l - a);
  if (i < 2) return null;
  const d = document.createElement("div");
  return d.className = "cm-note-cover-fold-motion", d.style.cssText = ["position:fixed", `top:${a}px`, `left:${o.left}px`, `width:${Math.max(0, o.width)}px`, `height:${i}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(d), d;
}
async function $n(e, t) {
  const n = ++re, s = ft(e, t);
  if (!s) {
    e.dispatch({ effects: F.of(t) });
    return;
  }
  try {
    await se(s, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === re && A(e.state) && e.dispatch({ effects: F.of(t) }), s.remove();
}
async function zn(e, t) {
  ++re, e.dispatch({ effects: O.of(t) });
  const n = A(e.state);
  if (!n) return;
  const s = ft(e, n);
  if (s) {
    try {
      await se(s, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    s.remove();
  }
}
function mt(e, t) {
  var _a;
  const n = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, "svg");
  n instanceof SVGElement && se(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function Be(e, t) {
  const n = R(e.state, t);
  return e.dispatch({ effects: n ? O.of(t) : F.of(t) }), true;
}
function Oe(e) {
  const t = A(e.state);
  if (!t) return false;
  const s = !R(e.state, t), o = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return mt(o, !s), (async () => {
    s ? await $n(e, t) : await zn(e, t);
    const a = e.state.facet(B);
    a && Pn(a, s);
  })(), true;
}
function Ke(e, t) {
  const n = A(e.state);
  if (!n) return;
  const s = R(e.state, n);
  t && !s ? e.dispatch({ effects: F.of(n) }) : !t && s && e.dispatch({ effects: O.of(n) });
}
function Hn() {
  return Ye.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(B) !== this.lastKey, s = !!_(e.state.doc), o = s && !this.hadCover;
      this.hadCover = s, (t || o) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(B);
      this.lastKey = e;
      const t = _(this.view.state.doc);
      if (this.hadCover = !!t, !t) return;
      if (!e) {
        Ke(this.view, true);
        return;
      }
      const n = ++this.loadGen;
      _n(e).then((s) => {
        n === this.loadGen && Ke(this.view, s !== false);
      });
    }
  });
}
function Un(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(F) || n.is(O)));
}
function Ms() {
  return [On(null), Ge({ preparePlaceholder(e, t) {
    const n = A(e);
    return n && Rn(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const s = document.createElement("span");
    return s.className = "cm-foldPlaceholder", s.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", s.setAttribute("aria-hidden", "true"), s.onclick = t, s;
  } }), qe.of((e, t) => {
    const n = _(e.doc);
    if (!n) return null;
    const s = e.doc.lineAt(n.from);
    return t !== s.from ? null : A(e);
  }), Nr({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = ee(e.state, t.from);
    if (!n) return null;
    const s = !R(e.state, n);
    return new Re(s, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || Un(e), initialSpacer: () => new Re(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const s = ee(e.state, t.from);
    if (!s) return false;
    if (s.kind === "cover") {
      if (!Oe(e)) return false;
    } else {
      const o = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      mt(o, R(e.state, s)), Be(e, s);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), Sr({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const s = _(e.state.doc);
    if (s && t.from >= s.from && t.from < s.to) return Oe(e) ? (n.preventDefault(), true) : false;
    const o = ee(e.state, t.from);
    return !o || o.kind !== "heading" ? false : (Be(e, o), n.preventDefault(), true);
  } } }), Hn(), ie.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function Wn({ cover: e, getPresignedUrl: t }) {
  const n = Kt(e.pageSizeId) ? e.pageSizeId : $t, s = m.useMemo(() => ({ ...zt(), pageSizeId: n }), [n]), o = m.useMemo(() => Ht(n), [n]), a = m.useMemo(() => Ut(s), [s]);
  return r.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: a, children: r.jsx(Ir, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${o.widthMm} / ${o.heightMm}` } }) });
}
const z = /* @__PURE__ */ new WeakMap(), xt = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", Vn = "\uD45C\uC9C0";
function ne(e) {
  const t = z.get(e);
  t && (t.unmount(), z.delete(e));
}
function $e(e, t) {
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
function Gn(e) {
  if (!e) return;
  let t = e.querySelector(".md-note-cover-placeholder__fallback");
  if (t || (t = document.createElement("span"), t.className = "md-note-cover-placeholder__fallback", e.appendChild(t)), t.querySelector(".md-note-cover-placeholder__spinner")) return;
  t.replaceChildren();
  const n = document.createElement("span");
  n.className = "md-note-cover-placeholder__spinner", n.setAttribute("aria-hidden", "true");
  const s = document.createElement("span");
  s.className = "md-note-cover-placeholder__fallback-text", s.textContent = xt, t.append(n, s);
}
function te(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? (Gn(e), $e(e, xt)) : t === "empty" && $e(e, Vn));
}
function qn(e, t, n) {
  let s = z.get(e);
  s || (s = vt.createRoot(e), z.set(e, s)), s.render(m.createElement(Wn, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function Fs(e, t, n, s) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const o = (s == null ? void 0 : s.load) !== false, { cover: a } = Wt(t ?? ""), l = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(a == null ? void 0 : a.enabled)) {
    for (const i of l) {
      ne(i);
      const d = i.closest("[data-note-cover-placeholder]");
      te(d, "empty");
    }
    return 0;
  }
  if (!o) {
    for (const i of l) {
      ne(i);
      const d = i.closest("[data-note-cover-placeholder]");
      te(d, "pending");
    }
    return 0;
  }
  for (const i of l) {
    const d = i.closest("[data-note-cover-placeholder]");
    te(d, "ready"), qn(i, a, n);
  }
  return l.length;
}
function Ts(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) ne(n);
}
function As(e) {
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
function Yn(e, t) {
  return t != null && e === t;
}
function Ls(e) {
  const t = e.externalValue ?? "";
  return (e.liveMarkdown ?? "") === t ? false : e.userEdited ? !(!e.fileChanged && Yn(t, e.lastEmittedMd) || !e.fileChanged && e.localInputActive) : true;
}
function Is(e) {
  const t = e.markdown ?? "", n = e.parentMarkdown ?? "";
  return !(t === n || t === "" && n !== "" && !e.userEdited);
}
const Xn = [{ key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Dr }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: _r }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: Rr, shift: Pr }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: Br }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: Or }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Kr }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: $r }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => ({ key: `Ctrl-${e}`, mac: `Cmd-${e}`, preventDefault: true, run: (t) => Fe(t, e) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (e) => Fe(e, 10) }, { any: (e, t) => (t.ctrlKey || t.metaKey) && t.altKey && t.code === "KeyC" ? zr(e) : Hr(t, e) }], Ds = U.high(W.of(Xn));
export {
  us as C,
  fs as H,
  ms as I,
  Xn as M,
  hs as W,
  xs as a,
  bs as b,
  vs as c,
  Es as d,
  vn as e,
  As as f,
  Cs as g,
  Fs as h,
  js as i,
  ks as j,
  ws as k,
  Ms as l,
  ps as m,
  ys as n,
  T as o,
  Ns as p,
  Ds as q,
  Ss as r,
  Is as s,
  Ts as t,
  gs as u,
  Ls as v
};
