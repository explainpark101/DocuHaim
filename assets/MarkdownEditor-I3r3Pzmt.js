var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { j as o, r as l, u as Un, c as oo, a as so } from "./vendor-react-BwEIQNKH.js";
import { y as io, z as Ot, S as Xn, j as _e, A as Qn, D as tn, W as ao, B as Jn, F as $e, G as Ne, H as Zn, h as _t, V as Bt, J as er, k as tr, M as co, O as lo, P as uo, Q as fo, R as mo, T as wt, U as nn, X as po, Y as ho, c as go, Z as xo, $ as nr, v as bo, a0 as wo, a1 as yo, K as vo, a2 as ko, a3 as Eo, a4 as Co, a5 as So, a6 as No, a7 as jo, a8 as Mo, a9 as To, aa as Ro, ab as Ao, ac as Lo, ad as Po, ae as Do, af as Io, ag as Fo, ah as Ho, ai as Oo, aj as _o, ak as Bo, al as Vo, am as Ko } from "./vendor-md-editor-pmGM35s5.js";
import { aG as ye, d0 as rn, d1 as $o, d2 as rr, d3 as or, d4 as on, d5 as zo, a0 as ct, d6 as qo, d7 as sn, E as an, d8 as Wo, d9 as Yo, da as Go, db as cn, dc as sr, dd as Uo, de as Xo, df as Qo, dg as Jo, dh as Zo, di as ir, dj as es, dk as Vt, ag as Kt, dl as ts, dm as ns, dn as rs, dp as os, dq as ss, dr as is, ds as ar, dt as yt, du as as, dv as Oe, dw as cs, dx as ls, dy as ds, dz as us, dA as fs, dB as cr, dC as ms, dD as ps, dE as ln, dF as hs, dG as gs, D as xs, dH as bs, dI as et, dJ as ws, dK as ys, dL as He, dM as vs, dN as ks, dO as Es, cz as dn, dP as vt, dQ as kt, dR as Cs, dS as un, dT as Ss, dU as Ns, dV as js, aI as Ms, dW as Ts, dX as Rs, dY as As, T as Ls, M as Ps, dZ as Ds, d_ as Is, at as fn, d$ as Fs, e0 as Et, e1 as Ct, e2 as mn, e3 as pn, e4 as St, e5 as hn, e6 as Hs, e7 as gn, e8 as xn, aC as Os, e9 as _s, ea as Bs, eb as Vs, ec as Ks, ed as $s, ee as zs, ef as qs, eg as bn, eh as we, ei as Ws, ej as Nt, ek as jt, cq as Ys } from "./index-DgMMigqL.js";
import { S as Gs, W as Us, Y as wn, Z as Mt, _ as Tt, $ as Xs, c as Qs, a0 as $t, a1 as Js, O as lr, a2 as Zs, G as ei, X as zt, a3 as ti, a4 as ni, a5 as ri, k as qt, a6 as oi, a7 as si, v as ii, a8 as ai, a9 as ci, L as li } from "./vendor-lucide-B-9DwWUo.js";
import { d as di, v as Rt, w as At, H as ui, J as fi, K as mi, M as pi, N as hi, O as gi, Q as xi, U as bi, V as wi, W as yi, S as dr, a as ur, e as yn, f as vn, g as kn, h as En, A as Cn } from "./vendor-radix-krusovOJ.js";
import { M as vi, h as ki, t as Ei, a as Ci, b as Si, c as Ni, d as ji, e as Mi, f as Ti, g as Ri, i as Ai, j as Li, k as Sn, w as Pi, l as Di } from "./mdEditorSelectionWrap-i1oi7u0W.js";
import { N as Ii, C as Fi, u as Hi, a as Oi, b as _i, P as Bi, W as Vi, T as Ki, c as $i, H as zi } from "./useTocTitleWrap-CmuYPR1h.js";
import { a as lt } from "./vendor-motion-CLW0brs2.js";
import { u as qi } from "./useWikiImageHydration-DNoop3cv.js";
import "./vendor-aws-DI8kybWK.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-Bp0rxPXM.js";
import "./TableStyleTemplateEditor-Me6mMqrX.js";
import "./index-T3CnG2ex.js";
import "./vendor-image-crop-BDK_XcHP.js";
import "./cropPadImage-C1QpzVf6.js";
function Wi(e) {
  return String(e || "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "doc";
}
function Yi(e) {
  return `md-ed-${Wi(e)}`;
}
function Gi(e) {
  const t = `${e}-h`;
  return (n, r, a) => {
    const s = Number.isInteger(a) ? a : 0, m = typeof n == "object" && n !== null ? Number(n.index) : NaN, p = Number.isInteger(m) ? m : s;
    return `${t}-${p}`;
  };
}
const Nn = ".md-editor-catalog-link", Ui = "md-preview-heading-folded", jn = "md-preview-heading-section-hidden", Xi = 2;
function Qi(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Ji(e) {
  for (let t = 0; t < 8; t += 1) {
    const n = getComputedStyle(e);
    if (!(e.classList.contains(jn) || e.hasAttribute("hidden") || n.display === "none")) break;
    let a = false, s = e;
    for (; s && !a; ) {
      if (s instanceof HTMLElement && (s.classList.contains(jn) || s.hasAttribute("hidden"))) {
        let p = s.previousElementSibling;
        for (; p; ) {
          if (p instanceof HTMLElement && p.classList.contains(Ui)) {
            const g = p.querySelector(":scope > .md-preview-heading-fold-chevron");
            g instanceof HTMLButtonElement && (g.click(), a = true);
            break;
          }
          p = p.previousElementSibling;
        }
      }
      s = s.parentElement;
    }
    if (!a) break;
  }
}
function Zi(e, t) {
  const n = (r) => {
    var _a2;
    if (r.button !== 0) return;
    const a = r.target;
    if (!(a instanceof Element)) return;
    const s = a.closest(Nn);
    if (!(s instanceof HTMLElement) || !e.contains(s)) return;
    const p = Array.from(e.querySelectorAll(Nn)).indexOf(s);
    if (p < 0) return;
    const g = t.mdHeadingId({ index: p + 1 }), C = t.getEditorRoot(), y = ((_a2 = C == null ? void 0 : C.querySelector) == null ? void 0 : _a2.call(C, `#${CSS.escape(g)}`)) ?? null;
    if (!y || C && !C.contains(y)) return;
    r.preventDefault(), r.stopPropagation(), typeof r.stopImmediatePropagation == "function" && r.stopImmediatePropagation(), Ji(y);
    const I = ye(y);
    if (!I) {
      y.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const j = y.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(y).marginBlockStart || "0") || 0, M = Qi(y, I) - Xi - j;
    I.scrollTo({ top: Math.max(0, M), behavior: "smooth" });
  };
  return e.addEventListener("click", n, true), () => {
    e.removeEventListener("click", n, true);
  };
}
function ea({ onToggle: e, active: t = false }) {
  return o.jsx("button", { type: "button", className: ["md-editor-toolbar-item", t ? "md-editor-toolbar-active bg-violet-200! hover:bg-violet-300! dark:bg-violet-800/85! dark:hover:bg-violet-700/90!" : ""].filter(Boolean).join(" "), onClick: () => e == null ? void 0 : e(), title: t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-label": t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-pressed": t, children: o.jsx(Gs, { className: "md-editor-icon", size: 16 }) });
}
function ta(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let r = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, a = 0, s = 0;
  t.forEach((p, g) => {
    const C = p.match(/^(#{1,6})\s+(.*)/);
    if (C) {
      (r.tasks.length > 0 || r.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(r), r = { name: C[2].trim(), tasks: [] };
      return;
    }
    const y = p.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
    if (y) {
      const I = Math.floor(y[1].length / 2), j = y[3].toLowerCase() === "x", M = y[4].trim();
      a += 1, j && (s += 1), r.tasks.push({ id: `line-${g}`, lineIndex: g, indent: I, completed: j, text: M, rawLine: p });
    }
  }), r.tasks.length > 0 && n.push(r);
  const m = a > 0 ? Math.round(s / a * 100) : 0;
  return { categories: n, totalTasks: a, completedTasks: s, pendingTasks: a - s, percentage: m };
}
function na(e, t) {
  const n = String(e ?? "").split(`
`);
  if (t < 0 || t >= n.length) return e;
  const r = n[t];
  if (r.includes("[ ]")) n[t] = r.replace("[ ]", "[x]");
  else if (r.includes("[x]")) n[t] = r.replace("[x]", "[ ]");
  else if (r.includes("[X]")) n[t] = r.replace("[X]", "[ ]");
  else return e;
  return n.join(`
`);
}
function ra({ markdown: e = "", onMarkdownChange: t }) {
  const [n, r] = l.useState(""), [a, s] = l.useState("all"), [m, p] = l.useState({}), [g, C] = l.useState("dashboard"), y = l.useMemo(() => ta(e), [e]);
  l.useEffect(() => {
    const E = {};
    y.categories.forEach((R) => {
      E[R.name] = true;
    }), p(E);
  }, [y.categories.length]);
  const I = (E) => {
    typeof t == "function" && t(na(e, E));
  }, j = (E) => {
    p((R) => ({ ...R, [E]: !R[E] }));
  }, M = (E) => {
    const R = E.text.toLowerCase().includes(n.toLowerCase()), P = a === "all" ? true : a === "completed" ? E.completed : !E.completed;
    return R && P;
  };
  return o.jsxs("div", { className: "space-y-3 text-xs text-slate-100", children: [o.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [o.jsxs("div", { className: "col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [o.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: o.jsx(Us, { className: "h-16 w-16 text-indigo-400" }) }), o.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), o.jsx("div", { className: "my-1.5 flex items-baseline gap-1", children: o.jsxs("span", { className: "text-3xl font-extrabold text-white", children: [y.percentage, "%"] }) }), o.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: o.jsx("div", { className: "h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${y.percentage}%` } }) })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), o.jsx(wn, { className: "h-3.5 w-3.5 text-slate-500" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [y.totalTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), o.jsx(Mt, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [y.completedTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), o.jsx(Tt, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [y.pendingTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), o.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [o.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [o.jsxs("button", { type: "button", onClick: () => C("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${g === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(Xs, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), o.jsxs("button", { type: "button", onClick: () => C("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${g === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(wn, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), o.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [o.jsxs("div", { className: "relative min-w-[120px] flex-1", children: [o.jsx(Qs, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), o.jsx("input", { type: "text", value: n, onChange: (E) => r(E.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), o.jsxs("select", { value: a, onChange: (E) => s(E.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [o.jsx("option", { value: "all", children: "\uC804\uCCB4" }), o.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), o.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), g === "dashboard" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: y.categories.length === 0 ? o.jsxs("div", { className: "py-8 text-center text-slate-500", children: [o.jsx($t, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), o.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), o.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : y.categories.map((E, R) => {
    const P = E.tasks.length, _ = E.tasks.filter((H) => H.completed).length, W = P > 0 ? Math.round(_ / P * 100) : 0, F = !!m[E.name], w = E.tasks.filter(M);
    return n && w.length === 0 ? null : o.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [o.jsxs("button", { type: "button", onClick: () => j(E.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [o.jsx("span", { className: "shrink-0 text-slate-500", children: F ? o.jsx(Js, { className: "h-3.5 w-3.5" }) : o.jsx(lr, { className: "h-3.5 w-3.5" }) }), o.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: E.name })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [o.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [o.jsx("strong", { className: "text-slate-200", children: _ }), " / ", P] }), o.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${W === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [W, "%"] })] })] }), F && o.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: w.length === 0 ? o.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : w.map((H) => o.jsxs("button", { type: "button", onClick: () => I(H.lineIndex), style: { paddingLeft: `${H.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [o.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: H.completed ? o.jsx(Mt, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Tt, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${H.completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: H.text })] }, H.id)) })] }, `${E.name}-${R}`);
  }) }), g === "checklist" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: y.categories.map((E, R) => {
    const P = E.tasks.filter(M);
    return P.length === 0 ? null : o.jsxs("div", { className: "space-y-1", children: [o.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [E.name, " (", P.length, ")"] }), P.map((_) => o.jsxs("button", { type: "button", onClick: () => I(_.lineIndex), style: { paddingLeft: `${_.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [o.jsx("span", { className: "mt-0.5 shrink-0", children: _.completed ? o.jsx(Mt, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Tt, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${_.completed ? "text-slate-500 line-through" : "text-slate-200"}`, children: _.text })] }, _.id))] }, `${E.name}-list-${R}`);
  }) })] })] });
}
const fr = "s3haim-checklist-progress-modal-position", Lt = { leftVw: 58, topVh: 14 };
function oa() {
  try {
    const e = localStorage.getItem(fr);
    if (!e) return { ...Lt };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...Lt } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...Lt };
  }
}
function sa({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(fr, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
const mr = "(max-width: 768px)", ia = 5;
function Mn() {
  return typeof window < "u" && window.matchMedia(mr).matches;
}
function aa({ editorRef: e, onChange: t, open: n, onOpenChange: r }) {
  const [a, s] = l.useState(() => oa()), [m, p] = l.useState(""), [g, C] = l.useState({ from: 0, to: 0 }), y = l.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), I = l.useCallback(() => {
    const { text: R, from: P, to: _ } = rn(e);
    return p(R), C({ from: P, to: _ }), R;
  }, [e]);
  l.useEffect(() => {
    if (n) {
      if (Mn()) {
        r == null ? void 0 : r(false);
        return;
      }
      I();
    }
  }, [n, I, r]), l.useEffect(() => {
    if (!n) return;
    const R = window.matchMedia(mr), P = (_) => {
      _.matches && (r == null ? void 0 : r(false));
    };
    return R.addEventListener("change", P), () => R.removeEventListener("change", P);
  }, [n, r]);
  const j = l.useCallback((R) => {
    if (R.button !== 0) return;
    R.preventDefault();
    const P = R.clientX, _ = R.clientY;
    y.current = { active: true, startX: P, startY: _, startLeftVw: a.leftVw, startTopVh: a.topVh };
    const W = (w) => {
      if (!y.current.active) return;
      Math.hypot(w.clientX - P, w.clientY - _) <= ia;
      const H = window.innerWidth || 1, ne = window.innerHeight || 1, B = (w.clientX - y.current.startX) / H * 100, re = (w.clientY - y.current.startY) / ne * 100;
      s({ leftVw: Math.min(92, Math.max(0, y.current.startLeftVw + B)), topVh: Math.min(90, Math.max(0, y.current.startTopVh + re)) });
    }, F = () => {
      y.current.active && (y.current.active = false, document.removeEventListener("pointermove", W), document.removeEventListener("pointerup", F), s((w) => (sa(w), w)));
    };
    document.addEventListener("pointermove", W), document.addEventListener("pointerup", F);
  }, [a.leftVw, a.topVh]), M = l.useCallback((R) => {
    p(R);
    const { view: P } = rn(e), { from: _, to: W } = g;
    $o(P, _, W, R, t) && C({ from: _, to: _ + R.length });
  }, [e, g, t]), E = () => {
    r == null ? void 0 : r(false);
  };
  return !n || Mn() ? null : o.jsxs("div", { className: "fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md", style: { left: `${a.leftVw}vw`, top: `${a.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: [o.jsxs("div", { className: "flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing", onPointerDown: j, children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100", children: [o.jsx(Zs, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx($t, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsxs("button", { type: "button", onPointerDown: (R) => R.stopPropagation(), onClick: I, className: "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50", title: "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", "aria-label": "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", children: [o.jsx(ei, { size: 14 }), o.jsx("span", { className: "hidden sm:inline", children: "\uC0C8\uB85C\uACE0\uCE68" })] }), o.jsx("button", { type: "button", onPointerDown: (R) => R.stopPropagation(), onClick: E, className: "rounded p-1 text-indigo-200 hover:bg-indigo-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(zt, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(72vh,640px)] overflow-y-auto p-3", children: m.trim() ? o.jsx(ra, { markdown: m, onMarkdownChange: M }) : o.jsxs("p", { className: "rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400", children: ["\uC5D0\uB514\uD130\uC5D0\uC11C \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uD3EC\uD568\uB41C \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD55C \uB4A4", o.jsx("br", {}), "\uD234\uBC14 \uBC84\uD2BC\uC744 \uB204\uB974\uAC70\uB098 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694."] }) })] });
}
const ca = "(max-width: 768px)";
function la() {
  return typeof window < "u" && window.matchMedia(ca).matches;
}
function da({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item max-md:hidden", onClick: () => {
    la() || (e == null ? void 0 : e());
  }, title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: o.jsx($t, { className: "md-editor-icon", size: 16 }) });
}
function ua({ value: e = "", theme: t = "light", currentFile: n = null, disabled: r, trigger: a }) {
  const s = Un(), m = rr(), p = l.useCallback(() => {
    r || or({ currentFile: n, editorContent: e, theme: t, navigate: s, openInFocusedPane: (g) => {
      var _a2;
      return !!((m == null ? void 0 : m.workspaceTabsEnabled) && ((_a2 = m.openExportPdfInFocusedPane) == null ? void 0 : _a2.call(m, g)));
    } });
  }, [s, e, t, r, n, m]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: p, disabled: r, title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", children: a ?? o.jsx(ti, { className: "md-editor-icon", size: 16 }) });
}
function fa({ editorRef: e }) {
  const t = l.useCallback(() => {
    var _a2, _b, _c2, _d;
    const n = ((_a2 = e.current) == null ? void 0 : _a2.value) ?? e.current;
    if (!n) return;
    const r = `

<pgbr/>

`;
    if (typeof n.insert == "function") {
      n.insert(() => ({ targetValue: r, select: false, deviationStart: 0, deviationEnd: 0 })), (_b = n.focus) == null ? void 0 : _b.call(n);
      return;
    }
    const a = (_c2 = n.getEditorView) == null ? void 0 : _c2.call(n);
    a && (a.dispatch(a.state.replaceSelection(r)), (_d = a.focus) == null ? void 0 : _d.call(a));
  }, [e]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: t, title: "Insert print page break (<pgbr/>)", "aria-label": "Insert print page break", children: o.jsx(ni, { className: "md-editor-icon", size: 16 }) });
}
function ma({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", title: "\uCD5C\uB300 heading \uBCC0\uACBD", "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD", onClick: () => e(), children: o.jsx(ri, { className: "md-editor-icon", size: 16 }) });
}
const pa = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], ha = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], ga = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], xa = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), ba = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Tn = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function wa({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: r, onApply: a }) {
  const s = n.length > 0, [m, p] = l.useState("document"), [g, C] = l.useState(1), [y, I] = l.useState(false), [j, M] = l.useState("nested"), [E, R] = l.useState(1), P = m === "selection" ? n : t;
  l.useEffect(() => {
    if (!e) return;
    const w = s ? "selection" : "document";
    p(w), C(on(w === "selection" ? n : t)), I(false), M("nested"), R(1);
  }, [e, t, n, s]), l.useEffect(() => {
    if (!e) return;
    const w = (B) => {
      const re = B;
      return (re == null ? void 0 : re.closest) ? !!re.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, H = () => {
      const B = document.activeElement;
      B && w(B) && typeof B.blur == "function" && B.blur();
    };
    H();
    const ne = (B) => {
      if (B.metaKey || B.ctrlKey || B.altKey) return;
      const re = B.key;
      if (re >= "1" && re <= "9") {
        const le = Number(re);
        sn(le) && (B.preventDefault(), B.stopPropagation(), B.stopImmediatePropagation(), C(le));
        return;
      }
      B.key === "Escape" || B.key === "Enter" || w(B.target) && (B.preventDefault(), B.stopPropagation(), B.stopImmediatePropagation(), H());
    };
    return window.addEventListener("keydown", ne, true), () => window.removeEventListener("keydown", ne, true);
  }, [e]);
  const _ = l.useMemo(() => zo(P, g, { maxLevel: cn, renumberOutline: y, outlineStyle: j, outlineStart: E }), [P, g, y, j, E]), W = (w) => {
    if (w !== "selection" && w !== "document" || w === "selection" && !s) return;
    p(w), C(on(w === "selection" ? n : t));
  }, F = () => {
    if (!_.sourceMax) return;
    const w = Go(P, g, { maxLevel: cn, renumberOutline: y, outlineStyle: j, outlineStart: E });
    w !== P && a(w, m), r();
  };
  return o.jsx(ct, { isOpen: e, onClose: r, onConfirm: F, contentClassName: "max-w-3xl", children: o.jsx(di, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), o.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), o.jsx(Rt, { className: "flex items-center gap-2", value: m, onValueChange: W, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: pa.map((w) => {
    const H = m === w.value, ne = w.value === "selection" && !s;
    return o.jsx(At, { value: w.value, disabled: ne, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", H ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: H ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: w.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: w.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : w.description })] }) }, w.value);
  }) })] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), o.jsxs(ui, { value: String(g), onValueChange: (w) => {
    const H = Number(w);
    sn(H) && C(H);
  }, children: [o.jsxs(fi, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [o.jsx(mi, {}), o.jsx(pi, { className: "text-gray-500", children: o.jsx(lr, { size: 14 }) })] }), o.jsx(hi, { children: o.jsx(gi, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: o.jsx(xi, { className: "p-1", children: qo.map((w) => o.jsxs(bi, { value: String(w), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [o.jsx(wi, { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(qt, { size: 12 }) }), o.jsx(yi, { children: `h${w}` })] }, w)) }) }) })] })] }), o.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [o.jsxs("div", { className: "flex items-center justify-between gap-3", children: [o.jsxs("div", { className: "min-w-0", children: [o.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), o.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), o.jsx(dr, { className: xa(y), checked: y, onCheckedChange: I, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: o.jsx(ur, { className: ba }) })] }), y ? o.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), o.jsx(Rt, { className: "flex items-center gap-2", value: j, onValueChange: (w) => {
    (w === "flat" || w === "nested") && M(w);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: ha.map((w) => {
    const H = j === w.value;
    return o.jsx(At, { value: w.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", H ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: H ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: w.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: w.description })] }) }, w.value);
  }) })] }), o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), o.jsx(Rt, { className: "flex items-center gap-2", value: String(E), onValueChange: (w) => {
    w === "1" && R(1), w === "2" && R(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: ga.map((w) => {
    const H = E === w.value;
    return o.jsx(At, { value: String(w.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", H ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: H ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: w.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: w.description })] }) }, w.value);
  }) })] })] }) : null] }), o.jsx("div", { className: "mt-4 min-h-0", children: _.rows.length ? o.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: o.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [o.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: o.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), o.jsx("tbody", { children: _.rows.map((w, H) => o.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(yn, { children: [o.jsx(vn, { asChild: true, children: o.jsx("span", { className: "block truncate", children: w.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(kn, { children: o.jsxs(En, { side: "top", sideOffset: 6, className: Tn, children: [w.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Cn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(yn, { children: [o.jsx(vn, { asChild: true, children: o.jsx("span", { className: "block truncate", children: w.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(kn, { children: o.jsxs(En, { side: "top", sideOffset: 6, className: Tn, children: [w.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Cn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", w.from] }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", w.to] })] }, `${w.from}-${H}-${w.text}`)) })] }) }) : o.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: m === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), o.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [o.jsxs(an, { type: "button", variant: "secondary", size: "md", onClick: r, children: [o.jsx(Wo, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs(an, { type: "button", variant: "primary", size: "md", onClick: F, disabled: !_.sourceMax, children: [o.jsx(Yo, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function dt({ checked: e = false, onChange: t, theme: n = "light", title: r, ariaLabel: a, icon: s }) {
  const m = n === "dark", p = a || r;
  return o.jsx("span", { className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1", title: r, children: o.jsxs("label", { className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1", onMouseDown: (g) => {
    g.preventDefault();
  }, children: [o.jsx(s, { className: `md-editor-icon shrink-0 ${m ? "text-odp-muted" : "text-gray-500"}`, size: 16, "aria-hidden": true }), o.jsx(dr, { checked: e, onCheckedChange: (g) => t == null ? void 0 : t(!!g), "aria-label": p, className: ["relative h-4 w-7 rounded-full border-0 outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-blue-400", e ? "bg-blue-600 dark:bg-blue-500" : m ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: o.jsx(ur, { className: ["block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform", "data-[state=checked]:translate-x-3.5"].join(" ") }) })] }) });
}
function ya({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(dt, { checked: e, onChange: t, theme: n, icon: oi, title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)", ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8" });
}
function va({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(dt, { checked: e, onChange: t, theme: n, icon: si, title: e ? "base64 \uC774\uBBF8\uC9C0 \uC811\uD798" : "base64 \uC774\uBBF8\uC9C0 \uD3BC\uCE68", ariaLabel: "base64 \uC774\uBBF8\uC9C0 \uC811\uAE30" });
}
function ka({ checked: e = true, onChange: t, theme: n = "light" }) {
  return o.jsx(dt, { checked: e, onChange: t, theme: n, icon: ii, title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0", ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C" });
}
function Ea({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(dt, { checked: e, onChange: t, theme: n, icon: ai, title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off", ariaLabel: "Mirror Edit" });
}
function Ca({ onRequestLink: e, onRequestUpload: t, onRequestClip: n, disabled: r = false }) {
  const [a, s] = l.useState(false), m = l.useRef(null), p = l.useRef(null), g = l.useCallback(() => s(false), []);
  return o.jsxs(o.Fragment, { children: [o.jsx(io, { title: "\uC774\uBBF8\uC9C0", visible: a, onChange: s, disabled: r, overlay: o.jsxs("ul", { className: "md-editor-menu", role: "menu", onClick: g, children: [o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => e(), onKeyDown: (C) => {
    (C.key === "Enter" || C.key === " ") && (C.preventDefault(), e());
  }, children: "\uB9C1\uD06C \uCD94\uAC00" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = m.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (C) => {
    var _a2;
    (C.key === "Enter" || C.key === " ") && (C.preventDefault(), (_a2 = m.current) == null ? void 0 : _a2.click());
  }, children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = p.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (C) => {
    var _a2;
    (C.key === "Enter" || C.key === " ") && (C.preventDefault(), (_a2 = p.current) == null ? void 0 : _a2.click());
  }, children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC" })] }), children: o.jsx(ci, { className: "md-editor-icon", size: 16, "aria-hidden": true }) }), o.jsx("input", { ref: m, type: "file", accept: "image/*", multiple: true, className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (C) => {
    const y = Array.from(C.target.files || []);
    C.target.value = "", y.length && t(y);
  } }), o.jsx("input", { ref: p, type: "file", accept: "image/*", className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (C) => {
    var _a2;
    const y = (_a2 = C.target.files) == null ? void 0 : _a2[0];
    C.target.value = "", y && n(y);
  } })] });
}
function Sa({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, a] = l.useState(""), [s, m] = l.useState(""), [p, g] = l.useState("");
  l.useEffect(() => {
    e && (a(""), m(""), g(""));
  }, [e]);
  const C = () => {
    const y = s.trim();
    if (!y) {
      g("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: r.trim(), url: y }), t();
  };
  return o.jsx(ct, { isOpen: e, onClose: t, onConfirm: C, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), o.jsx("input", { type: "text", value: r, onChange: (y) => a(y.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), o.jsx("input", { type: "text", value: s, onChange: (y) => m(y.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), p ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: p }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(zt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: C, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(qt, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Na({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, a] = l.useState(""), [s, m] = l.useState(""), [p, g] = l.useState(""), C = l.useRef(null);
  l.useEffect(() => {
    if (!e) return;
    a(""), m(""), g("");
    const j = window.setTimeout(() => {
      var _a2;
      return (_a2 = C.current) == null ? void 0 : _a2.focus();
    }, 40);
    return () => window.clearTimeout(j);
  }, [e]);
  const y = () => {
    const j = r.trim(), M = s.trim();
    if (!j && !M) {
      g("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ line1: j, line2: M }), t();
  }, I = (j) => {
    j.key === "Enter" && (!(j.metaKey || j.ctrlKey) || j.altKey || j.shiftKey || j.nativeEvent.isComposing || j.keyCode === 229 || (j.preventDefault(), j.stopPropagation(), y()));
  };
  return o.jsx(ct, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uAC01\uC8FC \uC0BD\uC785" }), o.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0", " ", o.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "[^N]" }), "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uBAA9 (1\uC904)" }), o.jsx("input", { ref: C, type: "text", value: r, onChange: (j) => {
    a(j.target.value), p && g("");
  }, onKeyDown: I, placeholder: "\uC608: docs.docker.com - Compose services", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL (2\uC904)" }), o.jsx("input", { type: "text", value: s, onChange: (j) => {
    m(j.target.value), p && g("");
  }, onKeyDown: I, placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), p ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: p }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(zt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: y, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(qt, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function ja({ isOpen: e, file: t, onClose: n, onConfirm: r }) {
  const [a, s] = l.useState("");
  return l.useEffect(() => {
    if (!e || !t) {
      s("");
      return;
    }
    const m = URL.createObjectURL(t);
    return s(m), () => {
      URL.revokeObjectURL(m);
    };
  }, [e, t]), o.jsx(ct, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: a ? o.jsx(Ii, { imageSrc: a, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: r }) : null });
}
const pr = "s3haim_md_editor_base64_image_fold";
function It() {
  if (typeof window > "u") return true;
  try {
    const e = window.localStorage.getItem(pr);
    return e === null ? true : e === "1";
  } catch {
    return true;
  }
}
function Ma(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(pr, e ? "1" : "0");
  } catch {
  }
}
function Ta() {
  const [e, t] = l.useState(It), n = l.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return Ma(s), s;
    });
  }, []);
  return [e, n];
}
function Ra() {
  const [e, t] = l.useState(sr);
  l.useEffect(() => Uo((r) => {
    t(r);
  }), []);
  const n = l.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return Xo(s), s;
    });
  }, []);
  return [e, n];
}
function Aa() {
  const [e, t] = l.useState(Qo);
  l.useEffect(() => Jo((r) => {
    t(r);
  }), []);
  const n = l.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return Zo(s), s;
    });
  }, []);
  return [e, n];
}
const La = 48, Rn = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, hr = Qn.define(), gr = Qn.define(), xr = new Ot();
function Pa(e) {
  const t = [];
  Rn.lastIndex = 0;
  let n;
  for (; (n = Rn.exec(e)) !== null; ) {
    const r = n[1] ?? "image", a = n[2] ?? "";
    if (a.length < La) continue;
    const s = n[0], m = s.length - a.length, p = n.index + m;
    t.push({ from: p, to: n.index + s.length, mime: r });
  }
  return t;
}
function Da(e, t) {
  const n = Math.round(t * 3 / 4), r = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${r}\u2026`;
}
class Ia extends ao {
  constructor(t, n, r) {
    super(), this.label = t, this.from = n, this.to = r;
  }
  toDOM(t) {
    const n = document.createElement("span");
    return n.textContent = this.label, n.className = "cm-base64-image-fold", n.title = "Click to expand base64 image data", n.addEventListener("mousedown", (r) => {
      r.preventDefault(), r.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: hr.of({ from: this.from, to: this.to }) }), t.focus();
    }), n.addEventListener("click", (r) => {
      r.preventDefault();
    }), n;
  }
  ignoreEvent() {
    return false;
  }
  eq(t) {
    return this.label === t.label && this.from === t.from && this.to === t.to;
  }
}
function Fa(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
function An(e, t) {
  const n = [], r = [];
  for (let a = 1; a <= e.doc.lines; a += 1) {
    const s = e.doc.line(a);
    for (const m of Pa(s.text)) {
      const p = s.from + m.from, g = s.from + m.to;
      if (Fa(t, p, g)) {
        r.push({ from: p, to: g });
        continue;
      }
      n.push(tn.replace({ widget: new Ia(Da(m.mime, g - p), p, g) }).range(p, g));
    }
  }
  return { deco: tn.set(n, true), expanded: r };
}
const br = Xn.define({ create(e) {
  return An(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: a, to: s }) => ({ from: t.changes.mapPos(a, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: a, to: s }) => a < s));
  let r = n !== e.expanded;
  for (const a of t.effects) a.is(hr) ? (n = [{ from: a.value.from, to: a.value.to }], r = true) : a.is(gr) && n.length > 0 && (n = [], r = true);
  return t.docChanged || r ? An(t.state, n) : e;
}, provide: (e) => _e.decorations.from(e, (t) => t.deco) }), Ha = _e.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(br, false);
  if (!n || n.expanded.length === 0) return false;
  const r = e.target;
  if (!(r instanceof Node) || !t.dom.contains(r)) return false;
  const a = t.posAtDOM(r, 0);
  return a !== -1 && n.expanded.some(({ from: s, to: m }) => a >= s && a <= m) || t.dispatch({ effects: gr.of(null) }), false;
} });
function wr() {
  return [br, Ha];
}
function Oa(e) {
  return xr.of(e ? wr() : []);
}
function _a(e, t) {
  if (e) try {
    e.dispatch({ effects: xr.reconfigure(t ? wr() : []) });
  } catch {
  }
}
const yr = new Ot();
function Ba(e, t, n) {
  let r = false;
  return er(e).between(t, n, () => {
    r = true;
  }), r;
}
function Va(e) {
  const t = [], n = e.doc.toString();
  return _t(e).iterate({ enter(r) {
    if (r.name !== "FencedCode") return;
    const a = ir(n, r.from, r.to);
    a && t.push(a);
  } }), t;
}
function vr(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
const kr = Xn.define({ create() {
  return [];
}, update(e, t) {
  let n = e;
  t.docChanged && n.length && (n = n.map(({ from: a, to: s }) => ({ from: t.changes.mapPos(a, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: a, to: s }) => a < s));
  let r = n !== e;
  for (const a of t.effects) if (a.is($e)) vr(n, a.value.from, a.value.to) || (n = [...n, a.value], r = true);
  else if (a.is(Ne)) {
    const s = n.filter((m) => m.from !== a.value.from || m.to !== a.value.to);
    s.length !== n.length && (n = s, r = true);
  }
  return r ? n : e;
} });
function Ln(e) {
  const t = e.state.field(kr), n = [];
  for (const r of Va(e.state)) vr(t, r.from, r.to) || Ba(e.state, r.from, r.to) || n.push(Ne.of(r));
  n.length > 0 && e.dispatch({ effects: n });
}
const Ka = Bt.fromClass(class {
  constructor(e) {
    Ln(e);
  }
  update(e) {
    e.docChanged && Ln(e.view);
  }
}), $a = Zn.of((e, t) => {
  const n = e.doc.toString();
  let r = null;
  return _t(e).iterate({ enter(a) {
    if (a.name !== "FencedCode" || e.doc.lineAt(a.from).from !== t) return;
    const m = ir(n, a.from, a.to);
    if (m) return r = m, false;
  } }), r;
});
function Er() {
  return [kr, Jn(), $a, Ka];
}
function za(e) {
  return yr.of(e ? Er() : []);
}
function qa(e, t) {
  if (e) try {
    e.dispatch({ effects: yr.reconfigure(t ? Er() : []) });
  } catch {
  }
}
const Wa = `<br/>
`;
function Ya(e) {
  if (!es() || !(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.main, n = Wa;
  return e.dispatch({ changes: { from: t.from, to: t.to, insert: n }, selection: tr.cursor(t.from + n.length), scrollIntoView: true }), true;
}
const Cr = new Kt("s3haim-note-cover-fold");
Cr.version(1).stores({ folds: "key, updatedAt" });
const Sr = Cr.folds;
function Ga(e, t) {
  return `cover-fold:${Vt(e, t)}`;
}
function Ua(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Ga(e.type, e.id);
}
async function Xa(e) {
  if (!e) return null;
  const t = await Sr.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function Qa(e, t) {
  e && await Sr.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function Me(e) {
  const t = Math.min(e.length, 2e6);
  return ts(e.sliceString(0, t));
}
function je(e) {
  const t = Me(e.doc);
  if (!t) return null;
  const n = e.doc.lineAt(t.from);
  return n.to >= t.to ? null : { from: n.to, to: t.to };
}
function Be(e, t) {
  let n = false;
  return er(e).between(t.from, t.to, () => {
    n = true;
  }), n;
}
function Ja(e, t) {
  return e.from === t.from && e.to === t.to;
}
function Za(e, t) {
  const n = e.doc.lineAt(t);
  let r = false;
  return _t(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(a) {
    const s = a.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return r = true, false;
  } }), r;
}
function Pt(e, t) {
  const n = Me(e.doc);
  if (n) {
    const s = e.doc.lineAt(n.from);
    if (t === s.from) {
      const m = je(e);
      if (m) return { ...m, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!Za(e, t)) return null;
  const r = e.doc.lineAt(t), a = fo(e, r.from, r.to);
  return !a || a.from >= a.to ? null : { ...a, kind: "heading" };
}
const Ve = co.define({ combine: (e) => e[e.length - 1] ?? null }), Nr = new Ot();
function ec(e) {
  return Nr.of(Ve.of(e));
}
function tc(e, t) {
  e.dispatch({ effects: Nr.reconfigure(Ve.of(t)) });
}
function nc(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const r = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", r), n.title = r, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const a = n.querySelector("svg");
  return a && (a.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", a.style.transformOrigin = "50% 50%"), n;
}
class Pn extends mo {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return nc(this.open, this.kind);
  }
}
let Ft = 0;
function jr(e, t) {
  const n = e.coordsAtPos(t.from), r = e.coordsAtPos(t.to);
  if (!n || !r) return null;
  const a = e.contentDOM.getBoundingClientRect(), s = Math.min(n.top, r.top), m = Math.max(n.bottom, r.bottom), p = Math.max(0, m - s);
  if (p < 2) return null;
  const g = document.createElement("div");
  return g.className = "cm-note-cover-fold-motion", g.style.cssText = ["position:fixed", `top:${s}px`, `left:${a.left}px`, `width:${Math.max(0, a.width)}px`, `height:${p}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(g), g;
}
async function rc(e, t) {
  const n = ++Ft, r = jr(e, t);
  if (!r) {
    e.dispatch({ effects: Ne.of(t) });
    return;
  }
  try {
    await lt(r, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === Ft && je(e.state) && e.dispatch({ effects: Ne.of(t) }), r.remove();
}
async function oc(e, t) {
  ++Ft, e.dispatch({ effects: $e.of(t) });
  const n = je(e.state);
  if (!n) return;
  const r = jr(e, n);
  if (r) {
    try {
      await lt(r, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    r.remove();
  }
}
function Mr(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.querySelector) == null ? void 0 : _a2.call(e, "svg");
  n instanceof SVGElement && lt(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function Dn(e, t) {
  const n = Be(e.state, t);
  return e.dispatch({ effects: n ? $e.of(t) : Ne.of(t) }), true;
}
function In(e) {
  const t = je(e.state);
  if (!t) return false;
  const r = !Be(e.state, t), a = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return Mr(a, !r), (async () => {
    r ? await rc(e, t) : await oc(e, t);
    const s = e.state.facet(Ve);
    s && Qa(s, r);
  })(), true;
}
function sc(e, t) {
  const n = je(e.state);
  if (!n) return;
  const r = Be(e.state, n);
  t && !r ? e.dispatch({ effects: Ne.of(n) }) : !t && r && e.dispatch({ effects: $e.of(n) });
}
function ic() {
  return Bt.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(Ve) !== this.lastKey, r = !!Me(e.state.doc), a = r && !this.hadCover;
      this.hadCover = r, (t || a) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(Ve);
      this.lastKey = e;
      const t = Me(this.view.state.doc);
      if (this.hadCover = !!t, !e || !t) return;
      const n = ++this.loadGen;
      Xa(e).then((r) => {
        n === this.loadGen && r != null && sc(this.view, r);
      });
    }
  });
}
function ac(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(Ne) || n.is($e)));
}
function cc() {
  return [ec(null), Jn({ preparePlaceholder(e, t) {
    const n = je(e);
    return n && Ja(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const r = document.createElement("span");
    return r.className = "cm-foldPlaceholder", r.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", r.setAttribute("aria-hidden", "true"), r.onclick = t, r;
  } }), Zn.of((e, t) => {
    const n = Me(e.doc);
    if (!n) return null;
    const r = e.doc.lineAt(n.from);
    return t !== r.from ? null : je(e);
  }), lo({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = Pt(e.state, t.from);
    if (!n) return null;
    const r = !Be(e.state, n);
    return new Pn(r, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || ac(e), initialSpacer: () => new Pn(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = Pt(e.state, t.from);
    if (!r) return false;
    if (r.kind === "cover") {
      if (!In(e)) return false;
    } else {
      const a = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      Mr(a, Be(e.state, r)), Dn(e, r);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), uo({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = Me(e.state.doc);
    if (r && t.from >= r.from && t.from < r.to) return In(e) ? (n.preventDefault(), true) : false;
    const a = Pt(e.state, t.from);
    return !a || a.kind !== "heading" ? false : (Dn(e, a), n.preventDefault(), true);
  } } }), ic(), _e.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function lc({ cover: e, getPresignedUrl: t }) {
  const n = ns(e.pageSizeId) ? e.pageSizeId : rs, r = l.useMemo(() => ({ ...os(), pageSizeId: n }), [n]), a = l.useMemo(() => ss(n), [n]), s = l.useMemo(() => is(r), [r]);
  return o.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: s, children: o.jsx(Fi, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${a.widthMm} / ${a.heightMm}` } }) });
}
const it = /* @__PURE__ */ new WeakMap(), dc = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", uc = "\uD45C\uC9C0";
function Tr(e) {
  const t = it.get(e);
  t && (t.unmount(), it.delete(e));
}
function Fn(e, t) {
  if (!e) return;
  const n = e.querySelector(".md-note-cover-placeholder__fallback");
  n && (n.textContent = t);
}
function Hn(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? Fn(e, dc) : t === "empty" && Fn(e, uc));
}
function fc(e, t, n) {
  let r = it.get(e);
  r || (r = oo.createRoot(e), it.set(e, r)), r.render(l.createElement(lc, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function mc(e, t, n, r) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const { cover: a } = ar(t ?? ""), s = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(a == null ? void 0 : a.enabled)) {
    for (const m of s) {
      Tr(m);
      const p = m.closest("[data-note-cover-placeholder]");
      Hn(p, "empty");
    }
    return 0;
  }
  for (const m of s) {
    const p = m.closest("[data-note-cover-placeholder]");
    Hn(p, "ready"), fc(m, a, n);
  }
  return s.length;
}
function pc(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) Tr(n);
}
const hc = "h1, h2, h3, h4, h5, h6", Rr = "md-preview-heading-fold-chevron", On = "md-preview-heading-foldable", tt = "md-preview-heading-folded", gc = "md-preview-heading-section-hidden", st = "data-md-preview-heading-fold";
function xc(e) {
  if (!e) return false;
  const t = e.tagName;
  return t === "H1" || t === "H2" || t === "H3" || t === "H4" || t === "H5" || t === "H6";
}
function _n(e) {
  const t = e.getAttribute("data-heading-level");
  if (t) {
    const r = Number(t);
    if (Number.isFinite(r) && r >= 1) return r;
  }
  const n = Number(e.tagName.slice(1));
  return Number.isFinite(n) && n >= 1 ? n : 6;
}
function bc(e, t) {
  return e.id || `md-preview-heading-${t}`;
}
function Ar(e) {
  const t = _n(e), n = [];
  let r = e.nextElementSibling;
  for (; r && !(xc(r) && _n(r) <= t || r.hasAttribute("data-note-cover-placeholder")); ) r instanceof HTMLElement && n.push(r), r = r.nextElementSibling;
  return n;
}
function wc(e) {
  return !!e.closest("[data-note-cover-placeholder], [data-note-cover-preview]");
}
function Lr(e) {
  return Array.from(e.querySelectorAll(hc)).filter((t) => !(!(t instanceof HTMLElement) || wc(t)));
}
function yc(e) {
  if (!e || typeof e.querySelectorAll != "function") return false;
  const t = Lr(e);
  for (const n of t) if (n.getAttribute(st) !== "1" && Ar(n).length > 0) return true;
  return false;
}
function vc(e) {
  const t = document.createElement("button");
  t.type = "button", t.className = `${Rr} cursor-pointer`, t.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), t.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const n = t.querySelector("svg");
  return n && (n.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", n.style.transformOrigin = "50% 50%"), t;
}
function kc(e, t) {
  const n = e.querySelector("svg");
  n instanceof SVGElement && (lt(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" }), e.setAttribute("aria-label", t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
}
function Dt(e, t) {
  for (const n of e) n.classList.toggle(gc, t), t ? n.setAttribute("hidden", "") : n.removeAttribute("hidden");
}
function Ec(e, t = {}) {
  if (!e || typeof e.querySelectorAll != "function") return () => {
  };
  const n = new Set(Array.from(t.collapsedIds ?? []).filter((s) => typeof s == "string" && s)), r = [];
  return Lr(e).forEach((s, m) => {
    var _a2;
    if (s.getAttribute(st) === "1") return;
    const p = Ar(s);
    if (p.length === 0) return;
    const g = bc(s, m);
    s.id || (s.id = g), s.setAttribute(st, "1"), s.classList.add(On), (_a2 = s.querySelector(`:scope > .${Rr}`)) == null ? void 0 : _a2.remove();
    const y = !n.has(g), I = vc(y);
    s.insertBefore(I, s.firstChild);
    const j = (E) => {
      s.classList.toggle(tt, E), Dt(p, E), kc(I, !E);
    };
    y || (s.classList.add(tt), Dt(p, true));
    const M = (E) => {
      var _a3;
      E.preventDefault(), E.stopPropagation();
      const R = !s.classList.contains(tt);
      j(R), R ? n.add(g) : n.delete(g), (_a3 = t.onCollapsedChange) == null ? void 0 : _a3.call(t, Array.from(n));
    };
    I.addEventListener("click", M), r.push(() => {
      I.removeEventListener("click", M), I.remove(), s.classList.remove(On, tt), s.removeAttribute(st), Dt(p, false);
    });
  }), () => {
    for (const s of r) s();
  };
}
const Pr = new Kt("s3haim-preview-heading-fold");
Pr.version(1).stores({ folds: "key, updatedAt" });
const Dr = Pr.folds;
function Cc(e, t) {
  return `heading-fold:${Vt(e, t)}`;
}
function Sc(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Cc(e.type, e.id);
}
async function Nc(e) {
  if (!e) return null;
  const t = await Dr.get(e);
  return !t || !Array.isArray(t.collapsedIds) ? null : t.collapsedIds.filter((n) => typeof n == "string" && n.length > 0);
}
async function jc(e, t) {
  e && await Dr.put({ key: e, collapsedIds: Array.from(new Set(t.filter(Boolean))), updatedAt: Date.now() });
}
function Mc(e) {
  var _a2, _b, _c2, _d;
  if (yt("collect:incoming", { hasData: !!e, filesLength: ((_a2 = e == null ? void 0 : e.files) == null ? void 0 : _a2.length) ?? 0, itemsLength: ((_b = e == null ? void 0 : e.items) == null ? void 0 : _b.length) ?? 0 }), !e) return yt("collect:result", { count: 0, reason: "no data" }), [];
  const t = [], n = /* @__PURE__ */ new Set(), r = (a) => {
    if (!a || !a.size) return;
    const s = String(a.size);
    n.has(s) || (n.add(s), t.push(a));
  };
  if ((_c2 = e.files) == null ? void 0 : _c2.length) for (const a of e.files) a && (((_d = a.type) == null ? void 0 : _d.startsWith("image/")) || !a.type && a.size > 0) && r(a);
  if (e.items) for (const a of e.items) {
    if (a.kind !== "file") continue;
    const s = a.type || "";
    if (s.startsWith("image/") || s === "") {
      const m = a.getAsFile();
      m && r(m);
    }
  }
  return yt("collect:result", { count: t.length, files: as(t) }), t;
}
const at = /* @__PURE__ */ new Set();
function Tc(e) {
  return at.add(e), () => {
    at.delete(e);
  };
}
function Rc(e) {
  if (!(!e.selectionSet && !e.docChanged) && !(e.view.composing || e.view.compositionStarted) && at.size !== 0) for (const t of at) try {
    t(e.view, e);
  } catch {
  }
}
function Ac() {
  return Bt.fromClass(class {
    constructor() {
      __publicField(this, "raf", 0);
    }
    update(e) {
      e.docChanged && (e.view.composing || e.view.compositionStarted || (this.raf && cancelAnimationFrame(this.raf), this.raf = requestAnimationFrame(() => {
        this.raf = 0, Lc(e.view);
      })));
    }
    destroy() {
      this.raf && cancelAnimationFrame(this.raf);
    }
  });
}
function Lc(e) {
  const t = e.contentDOM;
  t && t.offsetHeight;
}
const Pc = [0, 16, 48, 100, 180, 320];
function Dc(e) {
  let t = [], n = null, r = null, a = false, s = false;
  function m() {
    for (const M of t) clearTimeout(M);
    t = [];
  }
  function p() {
    if (s) return false;
    const M = e.getPreviewRoot(), E = e.getView();
    return !M || !E || Oe(M) ? false : cs(E, M, { allowCollapsed: true });
  }
  function g() {
    a || s || (a = true, requestAnimationFrame(() => {
      a = false, p();
    }));
  }
  function C(M) {
    n && r === M || (n == null ? void 0 : n.disconnect(), r = M, n = new MutationObserver((E) => {
      E.some((P) => {
        const _ = [...P.addedNodes, ...P.removedNodes];
        return _.length === 0 ? P.type === "characterData" || P.type === "attributes" : _.some((W) => {
          var _a2, _b;
          return W instanceof Element ? !(W.hasAttribute("data-preview-caret-mirror") || W.hasAttribute("data-preview-sel-mirror") || ((_a2 = W.classList) == null ? void 0 : _a2.contains("s3haim-preview-caret-mirror")) || ((_b = W.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
        });
      }) && g();
    }), n.observe(M, { childList: true, subtree: true, characterData: true }));
  }
  function y(M) {
    if (s) return;
    const E = e.getPreviewRoot();
    if (E && C(E), p(), !!(M == null ? void 0 : M.withRetries)) {
      m();
      for (const R of Pc) t.push(setTimeout(() => {
        if (s) return;
        const P = e.getPreviewRoot();
        P && C(P), p();
      }, R));
    }
  }
  function I() {
    s = true, m(), n == null ? void 0 : n.disconnect(), n = null, r = null, a = false;
  }
  const j = e.getPreviewRoot();
  return j && C(j), y({ withRetries: true }), { schedule: y, stop: I };
}
const Bn = [0, 16, 48, 120, 280], Ic = 50, Fc = 40, Vn = 32, Hc = 32;
function Kn(e) {
  return !!(e == null ? void 0 : e.isConnected);
}
function Ht(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function $n(e, t) {
  const n = Math.max(0, t);
  Math.abs(e.scrollTop - n) < 0.5 || (e.scrollTop = n, Math.abs(e.scrollTop - n) > 1 && e.scrollTo(0, n));
}
function Ir(e) {
  const t = [];
  for (const r of e.querySelectorAll("[data-line]")) r instanceof HTMLElement && t.push(r);
  const n = t.filter((r) => {
    let a = r.parentElement;
    for (; a && a !== e; ) {
      if (a.hasAttribute("data-line")) return false;
      a = a.parentElement;
    }
    return true;
  });
  return n.length > 0 ? n : t;
}
function Oc(e, t) {
  let n = null, r = -1;
  for (const a of Ir(e)) {
    const s = Number(a.getAttribute("data-line"));
    Number.isFinite(s) && s <= t && s >= r && (n = a, r = s);
  }
  return n;
}
function _c(e, t, n) {
  let r = null, a = -1, s = -1 / 0;
  for (const m of Ir(e)) {
    const p = Number(m.getAttribute("data-line"));
    if (!Number.isFinite(p)) continue;
    const g = Ht(m, t);
    g <= n && g >= s && (r = m, a = p, s = g);
  }
  return !r || a < 0 ? null : { el: r, line0: a };
}
function Bc(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.dom) == null ? void 0 : _a2.closest(".md-editor");
  if (n instanceof HTMLElement) return n;
  const r = t == null ? void 0 : t.closest(".md-editor");
  return r instanceof HTMLElement ? r : null;
}
function Vc(e) {
  let t = false, n = [], r = null, a = 0, s = null, m = 0, p = 0, g = null, C = null, y = null, I = null, j = null, M = "none", E = false;
  function R() {
    for (const T of n) clearTimeout(T);
    n = [];
  }
  function P() {
    r != null && (clearTimeout(r), r = null), a = 0;
  }
  function _() {
    s != null && (clearTimeout(s), s = null);
  }
  function W() {
    m && cancelAnimationFrame(m), p && cancelAnimationFrame(p), m = 0, p = 0;
  }
  function F(T) {
    _(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s = setTimeout(() => {
          s = null, M === T && (M = "none");
        }, Hc);
      });
    });
  }
  function w(T) {
    return T.scrollDOM;
  }
  function H(T) {
    return Kn(I) ? I : Kn(C) ? C : ye(T);
  }
  function ne(T) {
    if (!(T instanceof Node)) return null;
    const S = e.getView(), K = e.getPreviewRoot();
    if (S && (T === S.scrollDOM || S.dom.contains(T))) return "editor";
    if (K) {
      const G = K.closest(".md-editor-preview-wrapper") ?? K;
      if (T === G || G.contains(T)) return "preview";
    }
    return null;
  }
  function B(T, S) {
    if (T !== "preview" || !(S instanceof HTMLElement)) return;
    const K = e.getPreviewRoot();
    if (!K) return;
    const G = ye(K);
    G && (S === G || S.contains(G)) && (I = S);
  }
  function re(T, S) {
    if (!(S instanceof HTMLElement)) return false;
    if (T === "editor") {
      const ie = e.getView();
      return !!(ie && (S === ie.scrollDOM || S.contains(ie.scrollDOM)));
    }
    const K = e.getPreviewRoot(), G = K ? ye(K) : null;
    return !!(G && (S === G || S.contains(G)));
  }
  function le() {
    if (E) return false;
    const T = e.getPreviewRoot(), S = e.getView();
    if (!T || !S || M === "preview" || M !== "none" && M !== "follow") return false;
    M = "follow";
    const K = ls(S, T);
    return F("follow"), K;
  }
  function V() {
    t || E || (t = true, requestAnimationFrame(() => {
      t = false, le();
    }));
  }
  function x() {
    const T = e.getPreviewRoot(), S = e.getView();
    if (!T || !S) return;
    const K = w(S), G = H(T);
    if (!G) return;
    const ie = K.scrollTop, z = S.lineBlockAtHeight(ie), ge = S.state.doc.lineAt(z.from).number - 1, ke = Oc(T, ge);
    if (!ke) return;
    const Le = z.height > 0 ? Math.max(0, Math.min(1, (ie - z.top) / z.height)) : 0, Ee = Ht(ke, G) + ke.offsetHeight * Le - Vn;
    $n(G, Ee);
  }
  function L() {
    const T = e.getPreviewRoot(), S = e.getView();
    if (!T || !S) return;
    const K = w(S), G = H(T);
    if (!G) return;
    const ie = G.scrollTop + Vn, z = _c(T, G, ie);
    if (!z) return;
    const { el: ge, line0: ke } = z, Le = Math.min(Math.max(1, ke + 1), S.state.doc.lines), qe = S.state.doc.line(Le), Ee = S.lineBlockAt(qe.from), ut = Ht(ge, G), We = ge.offsetHeight > 0 ? Math.max(0, Math.min(1, (ie - ut) / ge.offsetHeight)) : 0;
    $n(K, Ee.top + Ee.height * We);
  }
  function te() {
    if (!E && !(M === "preview" || M === "follow")) {
      M = "editor";
      try {
        x();
      } finally {
        F("editor");
      }
    }
  }
  function J() {
    if (!E && !(M === "editor" || M === "follow")) {
      M = "preview";
      try {
        L();
      } finally {
        F("preview");
      }
    }
  }
  function ee() {
    E || M === "preview" || M === "follow" || m || (m = requestAnimationFrame(() => {
      m = 0, te();
    }));
  }
  function Q() {
    E || M === "editor" || M === "follow" || p || (p = requestAnimationFrame(() => {
      p = 0, J();
    }));
  }
  function oe(T) {
    const S = ne(T.target);
    !S || !re(S, T.target) || (B(S, T.target), S === "editor" ? ee() : Q());
  }
  function de(T) {
    const S = ne(T.target);
    S && requestAnimationFrame(() => {
      const K = e.getView(), G = e.getPreviewRoot();
      S === "editor" && K ? ee() : S === "preview" && G && (B("preview", ye(G)), Q());
    });
  }
  function fe(T) {
    const S = T.target;
    if (S instanceof HTMLImageElement && (j == null ? void 0 : j.contains(S))) {
      V(), R();
      for (const K of Bn) n.push(setTimeout(() => le(), K));
    }
  }
  function Te(T) {
    const S = T.scrollDOM;
    return S instanceof HTMLElement ? (g === S || (g && g.removeEventListener("scroll", oe), g = S, S.addEventListener("scroll", oe, { passive: true })), true) : false;
  }
  function $(T) {
    const S = ye(T);
    return S ? (C === S || (C && C.removeEventListener("scroll", oe), C = S, I = S, S.addEventListener("scroll", oe, { passive: true })), true) : false;
  }
  function se(T, S) {
    const K = Bc(T, S);
    return K ? (y === K || (y && (y.removeEventListener("scroll", oe, true), y.removeEventListener("wheel", de, true), y.removeEventListener("touchmove", de, true)), y = K, K.addEventListener("scroll", oe, { capture: true, passive: true }), K.addEventListener("wheel", de, { capture: true, passive: true }), K.addEventListener("touchmove", de, { capture: true, passive: true })), true) : false;
  }
  function Re(T) {
    j !== T && (j && (j.removeEventListener("load", fe, true), j.removeEventListener("error", fe, true)), j = T, T.addEventListener("load", fe, true), T.addEventListener("error", fe, true));
  }
  function he() {
    E || r != null || a >= Fc || (r = setTimeout(() => {
      if (r = null, a += 1, E) return;
      ve() || he();
    }, Ic));
  }
  function ve() {
    if (E) return false;
    const T = e.getView(), S = e.getPreviewRoot();
    let K = true;
    return T && Te(T) || (K = false), S ? ($(S) || (K = false), Re(S)) : K = false, se(T, S) || (K = false), K;
  }
  function ze(T) {
    if (!E && (ve() || he(), le(), !!(T == null ? void 0 : T.withRetries))) {
      R();
      for (const S of Bn) n.push(setTimeout(() => {
        E || (ve() || he(), le());
      }, S));
    }
  }
  function Ae() {
    E = true, R(), P(), _(), W(), g && (g.removeEventListener("scroll", oe), g = null), C && (C.removeEventListener("scroll", oe), C = null), y && (y.removeEventListener("scroll", oe, true), y.removeEventListener("wheel", de, true), y.removeEventListener("touchmove", de, true), y = null), j && (j.removeEventListener("load", fe, true), j.removeEventListener("error", fe, true), j = null), I = null, t = false, M = "none";
  }
  return P(), ve() || he(), ze({ withRetries: true }), { schedule: ze, stop: Ae };
}
const Fr = /* @__PURE__ */ new Map();
function Kc(e) {
  return !(e == null ? void 0 : e.id) || !(e == null ? void 0 : e.type) ? null : `${e.type}:${e.id}`;
}
function $c(e, t) {
  e && Fr.set(e, { editorTop: Number.isFinite(t.editorTop) ? t.editorTop : 0, editorLeft: Number.isFinite(t.editorLeft) ? t.editorLeft : 0, previewTop: Number.isFinite(t.previewTop) ? t.previewTop : 0, previewLeft: Number.isFinite(t.previewLeft) ? t.previewLeft : 0 });
}
function zc(e) {
  return e ? Fr.get(e) ?? null : null;
}
const Ke = new Kt("s3haim-editor-undo-history");
Ke.version(1).stores({ histories: "key, updatedAt" });
const zn = 100, Hr = 10080 * 60 * 1e3, qc = 500;
function Wc(e, t) {
  return Vt(e, t);
}
function Yc(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" ? null : Wc(e.type, e.id);
}
async function Gc(e) {
  if (!e) return null;
  const t = await Ke.histories.get(e);
  return t ? typeof t.updatedAt == "number" && Date.now() - t.updatedAt > Hr ? (await Ke.histories.delete(e), null) : !Array.isArray(t.stack) || t.stack.length === 0 ? null : t : null;
}
function Wt(e) {
  return Array.isArray(e) ? e.length <= zn ? e : e.slice(e.length - zn) : [""];
}
async function qn({ key: e, stack: t, index: n }) {
  if (!e) return;
  const r = Wt(t), a = Math.max(0, Math.min(n ?? r.length - 1, r.length - 1));
  await Ke.histories.put({ key: e, stack: r, index: a, updatedAt: Date.now() });
}
async function Uc() {
  const e = Date.now() - Hr;
  await Ke.histories.where("updatedAt").below(e).delete();
}
function nt(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? [...e] : [""];
  let a = Math.max(0, Math.min(t, r.length - 1));
  const s = n ?? "";
  if (r[a] === s) return { stack: r, index: a };
  const m = r.lastIndexOf(s);
  if (m >= 0) return { stack: r, index: m };
  const p = r.slice(0, a + 1);
  p.push(s);
  const g = Wt(p);
  return { stack: g, index: g.length - 1 };
}
function Xc(e, t, n) {
  const r = n ?? "", a = Array.isArray(e) && e.length > 0 ? e : [""], s = Math.max(0, Math.min(t, a.length - 1));
  if (a[s] === r) return { stack: a, index: s, changed: false };
  for (let g = s - 1; g >= 0; g -= 1) if (a[g] === r) return { stack: a, index: g, changed: true };
  for (let g = s + 1; g < a.length; g += 1) if (a[g] === r) return { stack: a, index: g, changed: true };
  const m = a.slice(0, s + 1);
  m.push(r);
  const p = Wt(m);
  return { stack: p, index: p.length - 1, changed: true };
}
function Qc(e, t, n) {
  if (!(e == null ? void 0 : e.state) || !Array.isArray(t) || t.length === 0) return n == null ? void 0 : n(), false;
  const r = t[t.length - 1] ?? "";
  if (t.length === 1) return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [wt.addToHistory.of(false)] }), n == null ? void 0 : n(), true;
  e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: t[0] ?? "" }, annotations: [wt.addToHistory.of(false), nn.of("full")] }), n == null ? void 0 : n();
  for (let s = 1; s < t.length; s += 1) {
    const m = t[s] ?? "";
    e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: m }, annotations: [nn.of("full")] });
  }
  return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [wt.addToHistory.of(false)] }), true;
}
function Wn(e) {
  return e && typeof e.resetHistory == "function" ? () => e.resetHistory() : null;
}
function Jc(e) {
  var _a2;
  return e ? ((_a2 = e.getEditorView) == null ? void 0 : _a2.call(e)) ?? null : null;
}
function Yn(e) {
  const t = e == null ? void 0 : e.current;
  return (t == null ? void 0 : t.value) ?? t ?? null;
}
function Zc(e, t) {
  return e ?? "";
}
function el({ currentFile: e, value: t, onChange: n, editorRef: r, enabled: a = true }) {
  const s = a ? Yc(e) : null, m = l.useRef([""]), p = l.useRef(0), g = l.useRef(null), C = l.useRef(t ?? ""), y = l.useRef(false), I = l.useRef(false), j = l.useRef(null), M = l.useRef(null), E = l.useRef(t), R = l.useRef(false), P = l.useRef(null), _ = l.useRef(0), W = l.useRef(t);
  E.current = t;
  const F = l.useCallback(async (V, x, L) => {
    if (V) try {
      await qn({ key: V, stack: x, index: L });
    } catch (te) {
      console.warn("[editor-undo-history] save failed:", te);
    }
  }, []), w = l.useCallback((V, x, L) => {
    V && (M.current && clearTimeout(M.current), M.current = setTimeout(() => {
      M.current = null, F(V, x, L);
    }, 300));
  }, [F]), H = l.useCallback(() => {
    j.current && (clearTimeout(j.current), j.current = null);
  }, []), ne = l.useCallback((V) => {
    const x = nt(m.current, p.current, V ?? "");
    return m.current = x.stack, p.current = x.index, x;
  }, []), B = l.useCallback((V) => {
    const x = Yn(r), L = Jc(x), te = Wn(x);
    if (!L) return false;
    const J = ++_.current;
    y.current = true, I.current = true;
    try {
      Qc(L, V, te ?? void 0);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          _.current === J && (y.current = false, I.current = false);
        });
      });
    }
    return true;
  }, [r]), re = l.useCallback((V, x) => {
    var _a2, _b;
    const L = E.current ?? "", te = ((_a2 = x == null ? void 0 : x.stack) == null ? void 0 : _a2.length) ? x.stack : [L], J = ((_b = x == null ? void 0 : x.stack) == null ? void 0 : _b.length) ? x.index ?? x.stack.length - 1 : 0, ee = nt(te, J, L);
    m.current = ee.stack, p.current = ee.index, R.current = false, W.current = L, C.current = L;
    const Q = ee.stack.slice(0, ee.index + 1), oe = (de) => {
      if (g.current === V) {
        if (B(Q)) {
          P.current = V;
          return;
        }
        if (de <= 0) {
          P.current = V, I.current = false, y.current = false;
          return;
        }
        setTimeout(() => oe(de - 1), 50);
      }
    };
    oe(40), w(V, ee.stack, ee.index);
  }, [B, w]);
  return l.useEffect(() => {
    a && Uc().catch(() => {
    });
  }, [a]), l.useEffect(() => {
    g.current === s && (C.current = t ?? "");
  }, [t, s]), l.useEffect(() => {
    var _a2;
    if (!a) return;
    const V = g.current, x = s;
    if (H(), M.current && (clearTimeout(M.current), M.current = null), V === x) return;
    if (V) {
      const ee = Zc(C.current, E.current ?? ""), Q = ne(ee);
      F(V, Q.stack, Q.index);
    }
    g.current = x, P.current = null, R.current = false, I.current = true, C.current = E.current ?? "";
    const L = Yn(r);
    if ((_a2 = Wn(L)) == null ? void 0 : _a2(), !x) {
      m.current = [E.current ?? ""], p.current = 0, P.current = null, I.current = false;
      return;
    }
    const te = ++_.current;
    let J = false;
    return (async () => {
      let ee = null;
      try {
        ee = await Gc(x);
      } catch (Q) {
        console.warn("[editor-undo-history] load failed:", Q);
      }
      J || _.current !== te || g.current === x && re(x, ee);
    })(), () => {
      J = true;
    };
  }, [a, s, r, H, ne, F, re]), l.useEffect(() => {
    if (!a || !s || P.current !== s || R.current || y.current || I.current || t === W.current) return;
    const V = t ?? "";
    W.current = V, C.current = V;
    const x = nt(m.current, p.current, V);
    m.current = x.stack, p.current = x.index, B(x.stack.slice(0, x.index + 1)), w(s, x.stack, x.index);
  }, [a, s, t, B, w]), l.useEffect(() => {
    if (a) return () => {
      H(), M.current && (clearTimeout(M.current), M.current = null);
      const V = g.current;
      if (!V) return;
      const x = nt(m.current, p.current, C.current ?? E.current ?? "");
      qn({ key: V, stack: x.stack, index: x.index }).catch(() => {
      });
    };
  }, [a, H]), { onChange: l.useCallback((V) => {
    y.current || I.current || P.current === g.current && (W.current = V, C.current = V, R.current = true, n == null ? void 0 : n(V), !(!a || !g.current) && (H(), j.current = setTimeout(() => {
      if (j.current = null, y.current || I.current) return;
      const x = g.current;
      if (!x) return;
      const L = Xc(m.current, p.current, V);
      L.changed && (m.current = L.stack, p.current = L.index, w(x, L.stack, L.index));
    }, qc)));
  }, [a, n, H, w]) };
}
const tl = "s3haim_md_editor_toc_width", nl = 360;
function Gn(e) {
  const t = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), n = [];
  (t ? e.metaKey : e.ctrlKey) && n.push("mod"), e.altKey && n.push("alt"), e.shiftKey && n.push("shift");
  const r = (e.key || "").toLowerCase();
  return !r || r === "shift" || r === "control" || r === "alt" || r === "meta" || (n.push(r), n.length <= 1) ? null : n.join("+");
}
function rt(e) {
  return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
}
const rl = yo({ nonTightLists: false });
function ol(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const { state: t } = e, n = (_b = (_a2 = t.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof n != "number") return;
  const r = t.doc.lineAt(n);
  if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(r.text) || r.number < 2) return;
  const a = t.doc.line(r.number - 1);
  if (a.text.trim() !== "") return;
  const s = r.from - a.from;
  e.dispatch({ changes: { from: a.from, to: r.from, insert: "" }, selection: tr.cursor(n - s) });
}
function sl(e) {
  return rl(e) ? (ol(e), true) : Ya(e) ? true : wo(e);
}
const il = xo.highest(nr.of([{ key: "Enter", run: sl }]));
function al(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const t = (_b = (_a2 = e.state.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return;
  const n = e.state.doc.lineAt(t);
  e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from } });
}
function ot(e, t) {
  return Ys() ? t(e) : false;
}
const cl = [{ key: "Alt-h", preventDefault: true, run: (e) => ot(e, _o) }, { key: "Alt-j", preventDefault: true, run: (e) => ot(e, Bo) }, { key: "Alt-k", preventDefault: true, run: (e) => ot(e, Vo) }, { key: "Alt-l", preventDefault: true, run: (e) => ot(e, Ko) }];
bo({ editorConfig: { languageUserDefined: { "ko-KR": vo }, renderDelay: cr() ? 500 : 0 }, codeMirrorExtensions(e, { keyBindings: t }) {
  const n = [...e].filter((s) => s.type !== "keymap" && s.type !== "linkShortener" && s.type !== "lineNumbers"), r = (t || []).filter((s) => {
    const m = String((s == null ? void 0 : s.key) || "").toLowerCase(), p = String((s == null ? void 0 : s.mac) || "").toLowerCase();
    return m !== "mod-f" && m !== "ctrl-d" && m !== "mod-d" && p !== "cmd-d" && m !== "ctrl-b" && m !== "mod-b" && p !== "cmd-b" && m !== "ctrl-u" && m !== "mod-u" && p !== "cmd-u" && m !== "ctrl-o" && m !== "mod-o" && p !== "cmd-o" && m !== "ctrl-arrowup" && m !== "mod-arrowup" && p !== "cmd-arrowup" && m !== "ctrl-arrowdown" && m !== "mod-arrowdown" && p !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(m) && !/^mod-[0-9]$/.test(m) && !/^cmd-[0-9]$/.test(p);
  }), a = [{ key: "ArrowLeft", run: (s) => bn(s, -1) }, { key: "ArrowRight", run: (s) => bn(s, 1) }, { key: "Ctrl-ArrowLeft", mac: "Alt-ArrowLeft", run: (s) => we(s, -1, Lo), shift: (s) => we(s, -1, Ao) }, { key: "Ctrl-ArrowRight", mac: "Alt-ArrowRight", run: (s) => we(s, 1, Do), shift: (s) => we(s, 1, Po) }, { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: (s) => we(s, -1, Fo), shift: (s) => we(s, -1, Io) }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: (s) => we(s, 1, Oo), shift: (s) => we(s, 1, Ho) }, ...cl, { key: "Alt--", preventDefault: true, run: Ei }, { key: "Ctrl-Tab", run: Ci }, { key: "Ctrl-f", mac: "Cmd-f", preventDefault: true, run: ko }, { key: "Ctrl-d", mac: "Cmd-d", preventDefault: true, run: (s) => (So(s), true) }, { key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Si }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: Ni }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: Mi, shift: ji }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: Ti }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: Ri }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Ai }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: Li }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => ({ key: `Ctrl-${s}`, mac: `Cmd-${s}`, preventDefault: true, run: (m) => Sn(m, s) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (s) => Sn(s, 10) }, { any: (s, m) => (m.ctrlKey || m.metaKey) && m.altKey && m.code === "KeyC" ? Pi(s) : Di(s, m) }, { key: "Mod-Alt-ArrowUp", run: Eo }, { key: "Mod-Alt-ArrowDown", run: Co }, ...r];
  return n.some((s) => s.type === "drawSelection") || n.push({ type: "drawSelection", extension: No() }), n.push({ type: "cmGlyphRepaintFix", extension: Ac() }), n.push({ type: "markdownSingleNewlineEnter", extension: il }, { type: "lineNumbers", extension: cc() }, { type: "allowMultipleSelections", extension: jo.allowMultipleSelections.of(true) }, { type: "clickAddsSelectionRange", extension: _e.clickAddsSelectionRange.of((s) => {
    const m = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return s.altKey || (m ? s.metaKey : s.ctrlKey);
  }) }, { type: "multiCursorPreview", extension: Mo({ minSelectionLength: 2, maxMatches: 200 }) }, { type: "keymap", extension: nr.of(a) }, { type: "base64ImageFold", extension: Oa(It()) }, { type: "mermaidBase64Fold", extension: za(It()) }, { type: "autocompleteGate", extension: _e.updateListener.of((s) => {
    Rc(s), !sr() && To(s.state) === "active" && Ro(s.view);
  }) }), n;
}, markdownItPlugins(e) {
  return qs(e);
} });
function Sl({ value: e, onChange: t, onSave: n, theme: r = "light", currentFile: a = null, previewOnly: s = false, isMobileLayout: m = false, onUploadImage: p, isUploadingEditorImage: g = false, uploadImagePercent: C = 0, onCancelUploadImage: y, onResolveWikiImageUrl: I, snippetConfig: j = { snippets: [] }, llmProviderProfiles: M = [], getImgbbApiKey: E, onOpenViewPath: R, onRequestConvertAllImagesToWiki: P, onRegisterConvertAllImagesToWiki: _, isActiveFile: W = true, isSurfaceLive: F = true }) {
  var _a2, _b;
  const w = ds(), H = Un(), ne = rr(), { showAlert: B } = us(), re = l.useId(), le = l.useMemo(() => Yi(re), [re]), V = l.useMemo(() => Gi(le), [le]), x = l.useRef(null), L = l.useRef(null), te = l.useRef(null), J = l.useRef(null), ee = l.useRef(j), Q = l.useRef(e), oe = l.useRef(a), de = l.useRef(r), fe = l.useRef("");
  l.useEffect(() => {
    Q.current = e, oe.current = a, de.current = r;
  }, [e, a, r]), l.useEffect(() => {
    const { issues: i } = ar(e ?? "");
    if (!i.length) {
      fe.current = "";
      return;
    }
    const c = fs(i);
    c !== fe.current && (fe.current = c, B({ title: "Cover syntax error", message: `note-cover has invalid syntax.

${c}` }));
  }, [e, B]);
  const Te = l.useCallback((i = {}) => {
    const c = Q.current ?? "", d = oe.current;
    or({ currentFile: d, editorContent: c, theme: de.current === "dark" ? "dark" : "light", navigate: H, openCoverEdit: !!i.openCoverEdit, openInFocusedPane: (u) => {
      var _a3;
      return !!((ne == null ? void 0 : ne.workspaceTabsEnabled) && ((_a3 = ne.openExportPdfInFocusedPane) == null ? void 0 : _a3.call(ne, u)));
    } });
  }, [H, ne]), { onChange: $ } = el({ currentFile: a, value: e, onChange: t, editorRef: x, enabled: !s }), se = Hi({ getMarkdown: () => Q.current ?? "", setMarkdown: (i) => {
    typeof t == "function" && t(i);
  } }), Re = l.useRef(se.openAtOffset), he = l.useRef(se.openPreviewTable);
  l.useEffect(() => {
    Re.current = se.openAtOffset, he.current = se.openPreviewTable;
  }, [se.openAtOffset, se.openPreviewTable]);
  const ve = l.useRef(null), [ze, Ae] = l.useState(false), [T, S] = l.useState(null), K = l.useRef(() => {
  }), [G, ie] = l.useState(false), [z, ge] = l.useState(null), [ke, Le] = l.useState(0), [qe, Ee] = l.useState(false), [ut, We] = l.useState(false), Yt = l.useRef({ from: 0, to: 0 }), ft = l.useRef($);
  l.useEffect(() => {
    ft.current = $;
  }, [$]);
  const [Gt, Ye] = l.useState(null), [ae, Pe] = l.useState(null), [Or, Ce] = l.useState(false), [De, mt] = l.useState(null), [_r, pt] = l.useState(false), [pe, Ut] = l.useState(null), [Ge, ht] = l.useState(null), xe = l.useRef(null), [gt, Xt] = Oi(), [Ie, Qt] = Ta(), [Jt, Zt] = Ra(), [Br, Ue] = Aa(), ue = l.useMemo(() => cr(), []), ce = ue ? false : Br, xt = l.useRef(null);
  l.useEffect(() => {
    if (s) return;
    const i = () => {
      var _a3, _b2, _c2;
      const f = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      f && (xt.current = f.state.selection);
    }, c = (u) => {
      !(u.metaKey || u.ctrlKey) || u.altKey || u.shiftKey || u.key.toLowerCase() === "k" && i();
    };
    window.addEventListener("keydown", c, true);
    const d = ms(i);
    return () => {
      window.removeEventListener("keydown", c, true), d();
    };
  }, [s]), l.useEffect(() => {
    if (s || !F) return;
    const i = () => {
      var _a3;
      return ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current;
    }, c = () => {
      var _a3, _b2;
      const v = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3), N = xt.current;
      !v || !N || v.dispatch({ selection: N, scrollIntoView: true });
    }, d = (h) => {
      var _a3;
      const v = i();
      v && (c(), (_a3 = v.focus) == null ? void 0 : _a3.call(v), typeof v.execCommand == "function" && v.execCommand(h));
    }, u = () => {
      var _a3, _b2, _c2;
      const h = i();
      if (!h) return;
      const v = `

<pgbr/>

`;
      if (typeof h.insert == "function") {
        h.insert(() => ({ targetValue: v, select: false, deviationStart: 0, deviationEnd: 0 })), (_a3 = h.focus) == null ? void 0 : _a3.call(h);
        return;
      }
      const N = (_b2 = h.getEditorView) == null ? void 0 : _b2.call(h);
      N && (N.dispatch(N.state.replaceSelection(v)), (_c2 = N.focus) == null ? void 0 : _c2.call(N));
    }, f = (h = {}) => {
      Te(h);
    }, b = {};
    for (const h of ps) h.directive && (b[h.id] = () => d(h.directive));
    return b["editor-revoke"] = () => {
      var _a3, _b2;
      c();
      const h = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      h && (h.focus(), po(h));
    }, b["editor-next"] = () => {
      var _a3, _b2;
      c();
      const h = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      h && (h.focus(), ho(h));
    }, b["editor-llm-assist"] = () => {
      var _a3;
      return (_a3 = w == null ? void 0 : w.toggleAssist) == null ? void 0 : _a3.call(w);
    }, b["editor-export-pdf"] = f, b["editor-pgbr"] = () => {
      c(), u();
    }, b["editor-heading-remap"] = () => {
      c(), K.current();
    }, b["editor-checklist-progress"] = () => ie(true), b["editor-table-edit"] = () => {
      var _a3, _b2;
      c();
      const h = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      if (!h) return;
      const { from: v, to: N } = h.state.selection.main;
      Re.current(v, N) || B({ title: "No table", message: "No haim-table found at the cursor or selection position." });
    }, b["editor-image-upload"] = () => {
      const h = document.createElement("input");
      h.type = "file", h.accept = "image/*", h.multiple = true, h.onchange = () => {
        var _a3;
        const v = Array.from(h.files || []);
        v.length && ((_a3 = ve.current) == null ? void 0 : _a3.call(ve, v));
      }, h.click();
    }, b["editor-image-clip"] = () => {
      const h = document.createElement("input");
      h.type = "file", h.accept = "image/*", h.onchange = () => {
        var _a3;
        const v = (_a3 = h.files) == null ? void 0 : _a3[0];
        v && Ye(v);
      }, h.click();
    }, b["editor-convert-all-images-to-wiki"] = () => {
      typeof P == "function" && P();
    }, b["editor-insert-footnote"] = () => {
      ln({ mode: "footnote-insert" });
    }, b["editor-insert-circle-number"] = (h) => {
      var _a3, _b2, _c2;
      const v = typeof h == "string" ? h : "";
      if (!v) {
        ln({ mode: "circle-number" });
        return;
      }
      c();
      const O = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      O && (O.dispatch(O.state.replaceSelection(v)), (_c2 = O.focus) == null ? void 0 : _c2.call(O));
    }, b["editor-insert-snippet"] = (h) => {
      var _a3, _b2, _c2;
      const v = typeof h == "string" ? h : "";
      if (!v) return;
      c();
      const O = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      O && (O.dispatch(O.state.replaceSelection(v)), (_c2 = O.focus) == null ? void 0 : _c2.call(O));
    }, hs(b);
  }, [s, F, Te, B, P, w]);
  const bt = w == null ? void 0 : w.registerEditorBridge;
  l.useEffect(() => {
    if (s || !W || !F || !bt) return;
    const i = () => {
      const c = x.current;
      if (!c) return null;
      if (typeof c.getEditorView == "function" || typeof c.getSelectedText == "function") return c;
      const d = c.value;
      return d && (typeof d.getEditorView == "function" || typeof d.getSelectedText == "function") ? d : null;
    };
    return bt({ editorRef: x, getEditorApi: i, onChange: $, getMarkdown: () => {
      var _a3, _b2, _c2, _d, _e2, _f;
      return ((_f = (_e2 = (_d = (_c2 = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3)) == null ? void 0 : _c2.state) == null ? void 0 : _d.doc) == null ? void 0 : _e2.toString) == null ? void 0 : _f.call(_e2)) ?? Q.current ?? "";
    } });
  }, [s, W, F, bt, $]), l.useEffect(() => {
    if (s || !F) return;
    const i = () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? null;
    }, c = () => {
      const u = i(), f = xt.current;
      !u || !f || u.dispatch({ selection: f, scrollIntoView: true });
    }, d = (u, f) => {
      var _a3, _b2;
      const b = i();
      b && (b.dispatch({ changes: { from: 0, to: b.state.doc.length, insert: u }, selection: { anchor: f }, scrollIntoView: true }), (_a3 = b.focus) == null ? void 0 : _a3.call(b)), (_b2 = ft.current) == null ? void 0 : _b2.call(ft, u);
    };
    return gs({ getMarkdown: () => {
      var _a3;
      return ((_a3 = i()) == null ? void 0 : _a3.state.doc.toString()) ?? Q.current ?? "";
    }, insertExisting: (u) => {
      c();
      const f = i(), b = (f == null ? void 0 : f.state.doc.toString()) ?? Q.current ?? "", h = f == null ? void 0 : f.state.selection.main, v = Ws(b, (h == null ? void 0 : h.from) ?? 0, (h == null ? void 0 : h.to) ?? 0, u);
      d(v.next, v.caret);
    }, openCompose: () => {
      var _a3;
      c();
      const f = (_a3 = i()) == null ? void 0 : _a3.state.selection.main;
      Yt.current = { from: (f == null ? void 0 : f.from) ?? 0, to: (f == null ? void 0 : f.to) ?? 0 }, We(true);
    } });
  }, [s, F]);
  const { width: Xe, isResizing: Vr, handleProps: Kr } = xs({ storageKey: tl, defaultWidth: nl, minWidth: 160, collapseBelowWidth: 80, maxWidth: 640, edge: "right", onCollapseBelowMin: () => {
    var _a3, _b2, _c2;
    (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c2.call(_b2, false);
  } }), Qe = l.useMemo(() => {
    const { meta: i } = bs(e ?? "");
    return i;
  }, [e]), $r = l.useMemo(() => {
    const i = Qe == null ? void 0 : Qe.fonts;
    if (!i) return {};
    const c = {}, d = et(i.body), u = et(i.heading), f = et(i.bold), b = et(i.code, "mono");
    return d && (c["--print-font-body"] = d), u && (c["--print-font-heading"] = u), f && (c["--print-font-bold"] = f), b && (c["--print-font-code"] = b), c;
  }, [Qe]);
  l.useEffect(() => {
    ee.current = j || { snippets: [] };
  }, [j]), l.useEffect(() => {
    const i = () => {
      var _a3, _b2, _c2;
      const f = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return f ? (_a(f, Ie), qa(f, Ie), true) : false;
    };
    if (i()) return;
    const c = window.setTimeout(i, 50), d = window.setTimeout(i, 250);
    return () => {
      window.clearTimeout(c), window.clearTimeout(d);
    };
  }, [Ie]), l.useEffect(() => {
    if (!F) {
      Ut(null);
      return;
    }
    const i = L.current;
    if (!i) return;
    const c = () => {
      const u = i.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
      Ut((f) => f === u ? f : u);
    };
    c();
    const d = new MutationObserver(c);
    return d.observe(i, { childList: true, subtree: true }), () => d.disconnect();
  }, [F]), l.useEffect(() => {
    const i = L.current;
    i && i.style.setProperty("--md-catalog-width", `${Xe}px`);
  }, [Xe]), l.useLayoutEffect(() => {
    if (!F || !pe) {
      ht(null);
      return;
    }
    const i = () => {
      const u = pe.getBoundingClientRect();
      if (u.width <= 0 || u.height <= 0) {
        ht(null);
        return;
      }
      ht({ top: u.top, left: u.left, height: u.height });
    };
    i();
    const c = new ResizeObserver(i);
    c.observe(pe);
    const d = L.current;
    return d && c.observe(d), window.addEventListener("resize", i), window.addEventListener("scroll", i, true), () => {
      c.disconnect(), window.removeEventListener("resize", i), window.removeEventListener("scroll", i, true);
    };
  }, [pe, Xe, F]), l.useEffect(() => {
    if (!(!F || !pe)) return Zi(pe, { getEditorRoot: () => L.current, mdHeadingId: (i) => V(i) });
  }, [pe, V, F]), qi(L, e, I, (a == null ? void 0 : a.id) ?? null, { enabled: F }), ws(L, { layoutKey: r, enabled: F }), l.useEffect(() => {
    if (!F) return;
    const i = L.current;
    if (!i || !e) return;
    let c = 0;
    const d = () => {
      mc(i, e, I);
    }, u = () => {
      const N = i.querySelectorAll("[data-note-cover-mount]");
      !N.length || !(i.querySelector(".md-note-cover-placeholder--pending") || [...N].some((U) => U.childNodes.length === 0)) || c || (c = window.requestAnimationFrame(() => {
        c = 0, d();
      }));
    }, b = [0, 80, 280, 600, 1100, 2e3].map((N) => setTimeout(d, N)), h = i.querySelector(".md-editor-preview") || i, v = typeof MutationObserver < "u" ? new MutationObserver(u) : null;
    return v == null ? void 0 : v.observe(h, { childList: true, subtree: true }), () => {
      c && window.cancelAnimationFrame(c), b.forEach((N) => clearTimeout(N)), v == null ? void 0 : v.disconnect();
    };
  }, [e, I, a == null ? void 0 : a.id, F]), l.useEffect(() => {
    const i = L.current;
    return () => {
      pc(i);
    };
  }, []), l.useEffect(() => {
    if (s) return;
    const i = Ua(a), c = () => {
      var _a3, _b2, _c2;
      const f = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return f ? (tc(f, i), true) : false;
    };
    if (c()) return;
    const d = [50, 200, 500, 1e3].map((u) => setTimeout(c, u));
    return () => d.forEach((u) => clearTimeout(u));
  }, [a == null ? void 0 : a.id, a == null ? void 0 : a.type, s]), l.useEffect(() => {
    var _a3, _b2, _c2;
    if (s) return;
    const c = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    ys(c);
  }, [a == null ? void 0 : a.id, s]), l.useEffect(() => {
    if (s) return;
    let i = null, c = null;
    const d = () => {
      var _a3, _b2, _c2;
      const b = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return !b || b === c ? !!b : (i == null ? void 0 : i(), c = b, i = Fs(b), true);
    };
    if (d()) return () => {
      i == null ? void 0 : i();
    };
    const u = [50, 200, 500, 1e3].map((f) => setTimeout(d, f));
    return () => {
      u.forEach((f) => clearTimeout(f)), i == null ? void 0 : i();
    };
  }, [s, a == null ? void 0 : a.id]), l.useEffect(() => {
    if (!F) return;
    const i = L.current;
    if (!i) return;
    const c = Sc(a), d = { current: [] };
    let u = false, f = null, b = null, h = [];
    const v = () => i.querySelector(".md-editor-preview"), N = () => {
      if (u) return;
      const D = v();
      if (!D || !yc(D)) return;
      const X = Ec(D, { collapsedIds: d.current, onCollapsedChange: (A) => {
        d.current = A, c && jc(c, A);
      } }), k = f;
      f = () => {
        k == null ? void 0 : k(), X();
      };
    }, O = (D) => {
      !D || b || typeof MutationObserver > "u" || (b = new MutationObserver(N), b.observe(D, { childList: true, subtree: true }));
    };
    return (async () => {
      if (c) {
        const D = await Nc(c);
        if (u) return;
        D && (d.current = D);
      }
      u || (O(v()), N(), h = [80, 250, 600].map((D) => setTimeout(() => {
        u || (O(v()), N());
      }, D)));
    })(), () => {
      u = true, h.forEach((D) => clearTimeout(D)), b == null ? void 0 : b.disconnect(), b = null, f == null ? void 0 : f(), f = null;
    };
  }, [a == null ? void 0 : a.id, a == null ? void 0 : a.type, F]), l.useEffect(() => {
    var _a3, _b2, _c2;
    if (!s) return;
    (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
  }, [s]), l.useEffect(() => {
    if (!m || s || !(a == null ? void 0 : a.id)) return;
    Ue(false);
    const i = () => {
      var _a3, _b2, _c2;
      (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
    };
    i();
    const c = [80, 240, 600].map((d) => setTimeout(i, d));
    return () => {
      c.forEach((d) => clearTimeout(d));
    };
  }, [m, s, a == null ? void 0 : a.id, Ue]), l.useEffect(() => {
    if (s || ue || !F) return;
    const i = L.current;
    if (!i) return;
    const c = () => i.querySelector(".md-editor-preview"), d = () => ce;
    let u = null;
    const f = (k) => k instanceof Element ? Et(k) ? true : !!k.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, b = (k) => {
      var _a3, _b2, _c2, _d, _e2, _f;
      const A = c();
      if (!A || Oe(A)) return;
      if (!d()) {
        const q = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window);
        (q == null ? void 0 : q.rangeCount) && A.contains(q.getRangeAt(0).commonAncestorContainer) && !q.getRangeAt(0).collapsed ? St(A, { allowCollapsed: false }) : He(A);
        return;
      }
      const Z = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
      if (!Z || Z.rangeCount === 0) {
        if (!(k instanceof Element) || !k.closest("td, th")) return;
      } else {
        const q = Z.getRangeAt(0);
        if (!A.contains(q.commonAncestorContainer) && !(k instanceof Element && k.closest("td, th"))) return;
      }
      const Y = (_e2 = (_d = ((_c2 = x.current) == null ? void 0 : _c2.value) ?? x.current) == null ? void 0 : _d.getEditorView) == null ? void 0 : _e2.call(_d);
      Y && ((Z == null ? void 0 : Z.rangeCount) && A.contains(Z.getRangeAt(0).commonAncestorContainer) && St(A, { allowCollapsed: true }), hn(Y, A, { focus: true, target: k }), Nt(), (_f = J.current) == null ? void 0 : _f.schedule({ withRetries: true }));
    }, h = (k) => k.button === 2 || k.button === 0 && k.ctrlKey, v = (k, A) => gn(A, k.clientX, k.clientY) ? true : xn(k.clientX, k.clientY) ? zs(A) : false, N = (k) => {
      var _a3, _b2, _c2, _d;
      const A = c();
      if (!A) return;
      const Z = k.target;
      if (!(Z instanceof Node)) return;
      if (A.contains(Z) && h(k)) {
        v(k, A);
        return;
      }
      if (A.contains(Z)) {
        u = { x: k.clientX, y: k.clientY }, !Et(Z) && !d() && He(A);
        return;
      }
      if (u = null, (_d = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d.dom.contains(Z)) {
        if (h(k)) return;
        jt(), d() || He(A);
      }
    }, O = (k) => {
      const A = c();
      !A || !(k.target instanceof Node) || !A.contains(k.target) || v(k, A);
    }, U = (k) => {
      var _a3, _b2, _c2;
      if (h(k)) return;
      const A = c();
      if (!(!A || !(k.target instanceof Node) || !A.contains(k.target)) && !f(k.target)) {
        if (Ct(i)) {
          const Z = !!(u && Math.hypot(k.clientX - u.x, k.clientY - u.y) > 6);
          if (u = null, !d() || Z) return;
          const Y = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), q = k.target instanceof Element ? mn(k.target, A) : null;
          Y && q && (Nt(), pn(q, Y, A, k.clientX, k.clientY));
          return;
        }
        u = null, requestAnimationFrame(() => b(k.target));
      }
    }, D = (k) => {
      var _a3, _b2, _c2, _d;
      const A = c();
      if (!(!A || !(k.target instanceof Node) || !A.contains(k.target)) && !f(k.target)) {
        if (Ct(i)) {
          if (!d()) return;
          const me = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), Y = (_d = k.changedTouches) == null ? void 0 : _d[0], q = k.target instanceof Element ? mn(k.target, A) : null;
          me && q && Y && (Nt(), pn(q, me, A, Y.clientX, Y.clientY));
          return;
        }
        requestAnimationFrame(() => b(k.target));
      }
    }, X = (k) => {
      var _a3, _b2, _c2, _d, _e2;
      if (!d() || k.isComposing || k.keyCode === 229 || k.key === "Process" || (k.metaKey || k.ctrlKey) && (k.key === "s" || k.key === "S" || k.code === "KeyS") || Et(k.target)) return;
      const A = c();
      if (!A || Oe(A) || Ct(i)) return;
      const Z = k.target, me = Z instanceof Node && A.contains(Z), Y = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), q = (Y == null ? void 0 : Y.rangeCount) > 0 && A.contains(Y.getRangeAt(0).commonAncestorContainer);
      if (!me && !q) return;
      const Se = (_d = (_c2 = ((_b2 = x.current) == null ? void 0 : _b2.value) ?? x.current) == null ? void 0 : _c2.getEditorView) == null ? void 0 : _d.call(_c2);
      Se && (Se.hasFocus || (q ? (St(A, { allowCollapsed: true }), hn(Se, A, { focus: true }), (_e2 = J.current) == null ? void 0 : _e2.schedule({ withRetries: true })) : Se.focus()));
    };
    return i.addEventListener("mousedown", N, true), i.addEventListener("contextmenu", O, true), i.addEventListener("mouseup", U), i.addEventListener("touchend", D, { passive: true }), i.addEventListener("keydown", X, true), () => {
      He(c()), i.removeEventListener("mousedown", N, true), i.removeEventListener("contextmenu", O, true), i.removeEventListener("mouseup", U), i.removeEventListener("touchend", D), i.removeEventListener("keydown", X, true);
    };
  }, [s, ce, ue, F]), l.useEffect(() => {
    var _a3, _b2, _c2, _d;
    if (s || !F) {
      (_a3 = te.current) == null ? void 0 : _a3.stop(), te.current = null, (_b2 = J.current) == null ? void 0 : _b2.stop(), J.current = null, jt();
      return;
    }
    const i = L.current, c = () => {
      var _a4;
      return (_a4 = i ?? L.current) == null ? void 0 : _a4.querySelector(".md-editor-preview");
    }, d = () => {
      var _a4, _b3, _c3;
      return (_c3 = (_b3 = ((_a4 = x.current) == null ? void 0 : _a4.value) ?? x.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c3.call(_b3);
    };
    (_c2 = te.current) == null ? void 0 : _c2.stop();
    const u = Vc({ getPreviewRoot: c, getView: d });
    te.current = u, (_d = J.current) == null ? void 0 : _d.stop(), J.current = null, ce ? J.current = Dc({ getPreviewRoot: c, getView: d }) : jt();
    const f = Tc((b, h) => {
      var _a4;
      const v = d();
      !v || b !== v || (u.schedule({ withRetries: h.docChanged }), ce && ((_a4 = J.current) == null ? void 0 : _a4.schedule({ withRetries: h.docChanged })));
    });
    return () => {
      var _a4, _b3;
      f(), (_a4 = J.current) == null ? void 0 : _a4.stop(), J.current = null, (_b3 = te.current) == null ? void 0 : _b3.stop(), te.current = null;
    };
  }, [s, ce, F]), l.useEffect(() => {
    if (s) return;
    const i = Kc(a);
    if (!i) return;
    const c = L.current;
    let d = 0, u = 0;
    const f = () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? null;
    }, b = () => {
      const D = f();
      if (!(D == null ? void 0 : D.scrollDOM)) return null;
      const X = c == null ? void 0 : c.querySelector(".md-editor-preview"), k = X ? ye(X) : null;
      return { editorTop: D.scrollDOM.scrollTop, editorLeft: D.scrollDOM.scrollLeft, previewTop: (k == null ? void 0 : k.scrollTop) ?? 0, previewLeft: (k == null ? void 0 : k.scrollLeft) ?? 0 };
    }, h = (D) => {
      const X = f();
      if (!(X == null ? void 0 : X.scrollDOM)) return false;
      X.scrollDOM.scrollTop = D.editorTop, X.scrollDOM.scrollLeft = D.editorLeft;
      const k = c == null ? void 0 : c.querySelector(".md-editor-preview"), A = k ? ye(k) : null;
      return A && (A.scrollTop = D.previewTop, A.scrollLeft = D.previewLeft), true;
    }, v = () => {
      const D = b();
      D && $c(i, D);
    }, N = () => {
      d && window.clearTimeout(d), d = window.setTimeout(() => {
        d = 0, v();
      }, 80);
    }, O = zc(i);
    if (O) {
      const D = ++u, X = (k) => {
        u === D && (h(O) || k <= 0 || window.setTimeout(() => X(k - 1), 50));
      };
      X(40);
    }
    const U = () => N();
    return c == null ? void 0 : c.addEventListener("scroll", U, true), () => {
      u += 1, d && window.clearTimeout(d), c == null ? void 0 : c.removeEventListener("scroll", U, true), v();
    };
  }, [s, a == null ? void 0 : a.type, a == null ? void 0 : a.id, F]), l.useEffect(() => {
    if (s || ue || !ce || !F) {
      vs();
      return;
    }
    const i = L.current;
    if (i) return ks(i, { getPreviewRoot: () => i.querySelector(".md-editor-preview"), getView: () => {
      var _a3, _b2, _c2;
      return (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    }, isEnabled: () => ce && F });
  }, [s, ce, ue, F]), l.useEffect(() => {
    var _a3, _b2, _c2;
    const c = (_a3 = L.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
    if (Es(), !!c && ((_b2 = te.current) == null ? void 0 : _b2.schedule({ withRetries: true }), !ue)) {
      if (ce && !Oe(c)) {
        (_c2 = J.current) == null ? void 0 : _c2.schedule({ withRetries: true });
        return;
      }
      ce || He(c);
    }
  }, [e, a == null ? void 0 : a.id, ce, ue]), l.useEffect(() => {
    if (s) return;
    const i = () => {
      var _a3;
      const c = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current;
      return (c == null ? void 0 : c.domEventHandlers) ? (c.domEventHandlers({ paste: (d, u) => {
        const f = d.clipboardData;
        if (!f || !u) return;
        const b = Mc(f);
        if (b.length && typeof p == "function") {
          if (g) return d.preventDefault(), false;
          d.preventDefault();
          const v = u;
          return p(b).then((N) => {
            var _a4, _b2, _c2;
            if (!(N == null ? void 0 : N.length)) return;
            const O = N.map((X) => `![[${X}]]`).join(`
`), D = ((_c2 = (_b2 = ((_a4 = x.current) == null ? void 0 : _a4.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? v;
            D && D.dispatch(D.state.replaceSelection(O));
          }), false;
        }
        const h = f.getData("text/plain") ?? "";
        if (h) return d.preventDefault(), u.dispatch(u.state.replaceSelection(h)), false;
      }, keydown: (d, u) => {
        var _a4;
        if (!u) return;
        if (ki(d, u)) return d.preventDefault(), d.stopPropagation(), true;
        const f = Gn(d);
        if (!f) return;
        if (f === "mod+shift+enter") return d.preventDefault(), d.stopPropagation(), al(u), false;
        if (f === "mod+s") return;
        const h = ((_a4 = ee.current) == null ? void 0 : _a4.snippets) || [], v = rt(f), N = h.find((O) => rt(O.prefix) === v && (O.body || "").trim());
        if (N) return d.preventDefault(), d.stopPropagation(), u.dispatch(u.state.replaceSelection(N.body)), false;
      } }), true) : false;
    };
    if (!i()) {
      const c = setTimeout(i, 100);
      return () => clearTimeout(c);
    }
  }, [s, p, g]), l.useEffect(() => {
    if (s) return;
    const i = (c) => {
      var _a3, _b2, _c2, _d, _e2, _f;
      const d = Gn(c);
      if (!d || d === "mod+s") return;
      const f = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      if (!f) return;
      const b = L.current, h = c.target;
      if (!(b == null ? void 0 : b.contains(h)) && !((_d = f.dom) == null ? void 0 : _d.contains(h))) return;
      const N = ((_e2 = ee.current) == null ? void 0 : _e2.snippets) || [], O = rt(d), U = N.find((D) => rt(D.prefix) === O && (D.body || "").trim());
      U && (c.preventDefault(), c.stopPropagation(), (_f = c.stopImmediatePropagation) == null ? void 0 : _f.call(c), f.dispatch(f.state.replaceSelection(U.body)));
    };
    return document.addEventListener("keydown", i, true), () => document.removeEventListener("keydown", i, true);
  }, [s, j]), l.useEffect(() => {
    if (typeof n != "function") return;
    const i = (c) => {
      var _a3, _b2, _c2, _d, _e2;
      if (!(c.ctrlKey || c.metaKey) || c.altKey || c.key !== "s" && c.key !== "S" && c.code !== "KeyS") return;
      const d = L.current;
      if (!d) return;
      const u = c.target, f = u instanceof Node && d.contains(u), b = d.querySelector(".md-editor-preview"), h = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), v = !!(b && (h == null ? void 0 : h.rangeCount) && b.contains(h.getRangeAt(0).commonAncestorContainer));
      if (!f && !v && !Oe(b)) return;
      c.preventDefault(), c.stopPropagation(), (_b2 = c.stopImmediatePropagation) == null ? void 0 : _b2.call(c);
      const O = (_e2 = (_d = ((_c2 = x.current) == null ? void 0 : _c2.value) ?? x.current) == null ? void 0 : _d.getEditorView) == null ? void 0 : _e2.call(_d);
      Hs(O), n();
    };
    return document.addEventListener("keydown", i, true), () => document.removeEventListener("keydown", i, true);
  }, [n]), l.useEffect(() => {
    const i = L.current;
    if (!i) return;
    const c = (d) => {
      var _a3, _b2, _c2, _d, _e2, _f, _g, _h, _i2;
      const u = i.querySelector(".md-editor-preview"), f = (_b2 = (_a3 = d.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "table");
      if (f && u && u.contains(f) || u && (gn(u, d.clientX, d.clientY) || xn(d.clientX, d.clientY))) return;
      const b = (_d = (_c2 = d.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, ".cm-editor");
      if (b && i.contains(b)) {
        const U = (_g = (_f = ((_e2 = x.current) == null ? void 0 : _e2.value) ?? x.current) == null ? void 0 : _f.getEditorView) == null ? void 0 : _g.call(_f);
        if (U) {
          const { from: D, to: X } = U.state.selection.main, k = Q.current ?? "";
          if (Os(k, D, X)) {
            d.preventDefault(), Re.current(D, X);
            return;
          }
        }
      }
      const h = (_i2 = (_h = d.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
      if (!h || !i.contains(h)) return;
      const v = _s(h);
      if (!v.kind || !v.key) return;
      d.preventDefault();
      const N = v.kind === "wiki" ? Bs(i, h, v.key) : Vs(i, h, v.key);
      ge({ kind: v.kind, key: v.key, width: v.width, height: v.height, occurrence: N, imageSrc: h.currentSrc || h.src || "" });
    };
    return i.addEventListener("contextmenu", c), () => i.removeEventListener("contextmenu", c);
  }, [B]), l.useEffect(() => {
    const i = L.current;
    if (!i) return;
    const c = (d) => {
      var _a3, _b2, _c2, _d;
      if ((_b2 = (_a3 = d.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const u = i.querySelector(".md-editor-preview"), f = (_d = (_c2 = d.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, "table");
      if (!f || !u || !u.contains(f)) return;
      d.preventDefault(), d.stopPropagation(), he.current(f, u) || B({ title: "No table", message: "No haim-table found at this position. Click inside a table cell and try again." });
    };
    return i.addEventListener("dblclick", c, true), () => i.removeEventListener("dblclick", c, true);
  }, [B]), l.useEffect(() => {
    const i = L.current;
    if (i) return _i(i);
  }, []), l.useEffect(() => {
    const i = () => {
      Le((c) => c + 1);
    };
    return window.addEventListener(dn, i), () => {
      window.removeEventListener(dn, i);
    };
  }, []), l.useEffect(() => {
    const i = L.current;
    if (!i) return;
    const c = (f) => {
      (f.classList.contains("md-note-cover-placeholder--ready") || f.classList.contains("md-note-cover-placeholder--empty") || f.classList.contains("md-note-cover-placeholder--pending")) && pt(true);
    }, d = (f) => {
      var _a3, _b2, _c2, _d, _e2, _f;
      const b = (_b2 = (_a3 = f.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      if (b && i.contains(b)) {
        f.preventDefault(), f.stopPropagation(), c(b);
        return;
      }
      const h = (_d = (_c2 = f.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, "[data-chat-saved-note]");
      if (h && i.contains(h)) {
        f.preventDefault(), f.stopPropagation(), H(Ks({ id: h.getAttribute("data-chat-id") || "", href: h.getAttribute("data-chat-href") || h.getAttribute("href") || "" }));
        return;
      }
      const v = (_f = (_e2 = f.target) == null ? void 0 : _e2.closest) == null ? void 0 : _f.call(_e2, "a[href]");
      if (!v || !i.contains(v) || f.metaKey || f.ctrlKey || f.shiftKey || f.altKey || typeof f.button == "number" && f.button !== 0 || v.hasAttribute("data-md-footnote-to")) return;
      const N = v.getAttribute("href") || "", O = $s(N, { currentViewPath: (a == null ? void 0 : a.type) ? a.id : null });
      if (O.kind !== "app") return;
      if (f.preventDefault(), f.stopPropagation(), O.viewPath && typeof R == "function") {
        R(O.viewPath);
        return;
      }
      const U = O.search || "", D = O.hash || "";
      H(`${O.pathname || "/"}${U}${D}`);
    }, u = (f) => {
      var _a3, _b2;
      if (f.key !== "Enter" && f.key !== " ") return;
      const b = (_b2 = (_a3 = f.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      !b || !i.contains(b) || (f.preventDefault(), f.stopPropagation(), c(b));
    };
    return i.addEventListener("click", d), i.addEventListener("keydown", u), () => {
      i.removeEventListener("click", d), i.removeEventListener("keydown", u);
    };
  }, [H, a == null ? void 0 : a.id, a == null ? void 0 : a.type, R]);
  const zr = l.useCallback(({ width: i, height: c }) => {
    const d = z;
    if (!(d == null ? void 0 : d.key) || typeof $ != "function") return;
    const u = d.kind === "wiki" ? vt(e, { path: d.key, occurrence: d.occurrence ?? 0, width: i, height: c }) : kt(e, { src: d.key, occurrence: d.occurrence ?? 0, width: i, height: c });
    u.updated && u.markdown !== e && $(u.markdown);
  }, [z, $, e]), qr = l.useCallback(async ({ file: i }) => {
    var _a3;
    const c = z;
    if (!(c == null ? void 0 : c.key) || typeof p != "function") throw new Error("Upload handler not available.");
    const u = (_a3 = await p([i])) == null ? void 0 : _a3[0];
    if (!u) throw new Error("Upload succeeded but no path was returned.");
    if (typeof $ != "function") return;
    const f = c.kind === "wiki" ? Cs(e, { path: c.key, occurrence: c.occurrence ?? 0, nextPath: u }) : un(e, { src: c.key, occurrence: c.occurrence ?? 0, nextPath: u });
    f.updated && f.markdown !== e && $(f.markdown);
  }, [$, p, e, z]), Wr = l.useCallback(async ({ width: i, height: c }) => {
    var _a3;
    const d = z;
    if (!(d == null ? void 0 : d.key) || d.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
    if (typeof $ != "function") throw new Error("Cannot apply change.");
    const u = await Ss({ markdownSrc: d.key, displaySrc: d.imageSrc, currentNotePath: (a == null ? void 0 : a.id) ?? null });
    let f = "";
    if (u.mode === "path") f = u.path;
    else {
      if (typeof p != "function") throw new Error("Upload handler not available.");
      if (f = ((_a3 = await p([u.file])) == null ? void 0 : _a3[0]) || "", !f) throw new Error("Upload succeeded but no path was returned.");
    }
    const b = un(e, { src: d.key, occurrence: d.occurrence ?? 0, nextPath: f, width: i, height: c });
    b.updated && b.markdown !== e && $(b.markdown);
  }, [a == null ? void 0 : a.id, $, p, e, z]), Yr = l.useCallback(async ({ width: i, height: c }) => {
    const d = z;
    if (!(d == null ? void 0 : d.key) || !(d == null ? void 0 : d.kind)) throw new Error("Cannot convert: image target is missing.");
    if (typeof $ != "function") throw new Error("Cannot apply change.");
    const u = typeof E == "function" ? String(await Promise.resolve(E()) || "").trim() : "";
    if (!u) throw new Error("ImgBB API key is missing. Please add it in settings.");
    const f = Ns({ path: d.key, imageSrc: d.imageSrc });
    if (!f) throw new Error("Cannot determine image source URL for upload.");
    const h = (await js({ apiKey: u, image: f, name: Ms(d.key) ? "image" : void 0 })).url, v = d.occurrence ?? 0;
    let N = e;
    const O = d.kind === "wiki" ? vt(N, { path: d.key, occurrence: v, width: i, height: c }) : kt(N, { src: d.key, occurrence: v, width: i, height: c });
    O.updated && (N = O.markdown);
    const U = await Ts(N, { kind: d.kind === "wiki" ? "wiki" : "markdown", key: d.key, occurrence: v }, h);
    if (!U.updated && N === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
    $(U.markdown);
  }, [E, $, e, z]);
  l.useEffect(() => {
    if (typeof _ == "function") return _(async () => {
      if (s) throw new Error("Cannot convert images in preview-only mode.");
      if (typeof $ != "function") throw new Error("Cannot apply change.");
      if (!Rs(e)) return { markdown: e, converted: 0, failed: [] };
      const i = await As(e, { currentNotePath: (a == null ? void 0 : a.id) ?? null, uploadFiles: async (c) => {
        if (typeof p != "function") throw new Error("Upload handler not available.");
        return p(c);
      } });
      return i.markdown !== e && $(i.markdown), i;
    }), () => _(null);
  }, [a == null ? void 0 : a.id, $, _, p, s, e]);
  const be = l.useCallback((i) => {
    const c = L.current;
    if (!c || !(i == null ? void 0 : i.kind) || !(i == null ? void 0 : i.key)) return null;
    const d = i.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...c.querySelectorAll(d)].filter((b) => (i.kind === "wiki" ? b.getAttribute("data-wiki-path") : b.getAttribute("data-md-src")) === i.key)[i.occurrence ?? 0] ?? null;
  }, []), en = l.useCallback(({ kind: i, key: c, occurrence: d, widthPx: u, heightPx: f }) => {
    if (!c || typeof $ != "function") return false;
    const b = Number.isFinite(u) ? `${Math.round(u)}px` : null, h = Number.isFinite(f) ? `${Math.round(f)}px` : null, v = i === "wiki" ? vt(e, { path: c, occurrence: d, width: b, height: h }) : kt(e, { src: c, occurrence: d, width: b, height: h });
    return v.updated && v.markdown !== e ? ($(v.markdown), true) : false;
  }, [$, e]), Gr = l.useCallback(() => {
    const i = z;
    if (!(i == null ? void 0 : i.kind) || !(i == null ? void 0 : i.key)) return;
    const c = be(i);
    if (!c) return;
    const d = c.getBoundingClientRect(), u = Math.max(24, Math.round(d.width)), f = Math.max(24, Math.round(d.height)), b = { kind: i.kind, key: i.key, occurrence: i.occurrence ?? 0, widthPx: u, heightPx: f, originalWidthPx: u, originalHeightPx: f };
    c.style.width = `${u}px`, c.style.height = `${f}px`, xe.current = b, Pe(b), Ce(false);
  }, [be, z]);
  l.useEffect(() => {
    if (!ae) {
      mt(null);
      return;
    }
    const i = be(ae);
    if (!i) {
      Pe(null), mt(null);
      return;
    }
    let c = 0;
    const d = () => {
      const u = i.getBoundingClientRect();
      mt({ left: u.left, top: u.top, width: u.width, height: u.height }), c = requestAnimationFrame(d);
    };
    return c = requestAnimationFrame(d), () => cancelAnimationFrame(c);
  }, [ae, be]), l.useEffect(() => {
    if (!ae) return;
    const i = be(ae);
    if (!i) return;
    const c = (f) => {
      var _a3, _b2;
      const b = (_b2 = (_a3 = f.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!b) return;
      f.preventDefault();
      const h = b.getAttribute("data-transform-handle");
      if (!h) return;
      const v = f.pointerType === "touch", N = xe.current || ae, O = f.clientX, U = f.clientY, D = N.heightPx > 0 ? N.widthPx / N.heightPx : 1, X = (A) => {
        const Z = A.clientX - O, me = A.clientY - U;
        let Y = N.widthPx, q = N.heightPx;
        if (h.includes("e") && (Y = N.widthPx + Z), h.includes("w") && (Y = N.widthPx - Z), h.includes("s") && (q = N.heightPx + me), h.includes("n") && (q = N.heightPx - me), Y = Math.max(24, Y), q = Math.max(24, q), v || A.shiftKey) {
          const no = Math.abs((Y - N.widthPx) / Math.max(1, N.widthPx)), ro = Math.abs((q - N.heightPx) / Math.max(1, N.heightPx));
          no >= ro ? q = Math.max(24, Y / Math.max(1e-4, D)) : Y = Math.max(24, q * D);
        }
        Y = Math.max(24, Math.round(Y)), q = Math.max(24, Math.round(q)), i.style.width = `${Y}px`, i.style.height = `${q}px`;
        const Se = { ...xe.current || N, widthPx: Y, heightPx: q };
        xe.current = Se, Pe(Se);
      }, k = () => {
        document.removeEventListener("pointermove", X, true), document.removeEventListener("pointerup", k, true);
      };
      document.addEventListener("pointermove", X, true), document.addEventListener("pointerup", k, true);
    }, d = (f) => {
      f.key === "Enter" && (f.preventDefault(), Ce(true));
    }, u = (f) => {
      var _a3, _b2, _c2, _d;
      const b = (_b2 = (_a3 = f.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), h = (_d = (_c2 = f.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, "img[data-wiki-path], img[data-md-src]");
      b || h === i || Ce(true);
    };
    return document.addEventListener("pointerdown", c, true), document.addEventListener("pointerdown", u, true), document.addEventListener("keydown", d, true), () => {
      document.removeEventListener("pointerdown", c, true), document.removeEventListener("pointerdown", u, true), document.removeEventListener("keydown", d, true);
    };
  }, [ae, be]);
  const Ur = l.useCallback(() => {
    const i = xe.current || ae;
    i && (en(i), Pe(null), xe.current = null, Ce(false));
  }, [en, ae]), Xr = l.useCallback(() => {
    const i = xe.current || ae;
    if (!i) return;
    const c = be(i);
    c && (c.style.width = `${i.originalWidthPx}px`, c.style.height = `${i.originalHeightPx}px`), Pe(null), xe.current = null, Ce(false);
  }, [be, ae]), Fe = l.useCallback((i) => {
    var _a3, _b2, _c2, _d;
    const c = String(i || "");
    if (!c) return;
    const d = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current;
    if (typeof (d == null ? void 0 : d.insert) == "function") {
      d.insert(() => ({ targetValue: c, select: false, deviationStart: 0, deviationEnd: 0 })), (_b2 = d.focus) == null ? void 0 : _b2.call(d);
      return;
    }
    const u = (_c2 = d == null ? void 0 : d.getEditorView) == null ? void 0 : _c2.call(d);
    u && (u.dispatch(u.state.replaceSelection(c)), (_d = u.focus) == null ? void 0 : _d.call(u));
  }, []), Je = l.useCallback(async (i) => {
    if (!(i == null ? void 0 : i.length) || typeof p != "function" || g) return;
    const c = await p(i);
    (c == null ? void 0 : c.length) && Fe(`${c.map((d) => `![[${d}]]`).join(`
`)}
`);
  }, [Fe, g, p]);
  l.useEffect(() => {
    ve.current = Je;
  }, [Je]);
  const Qr = l.useCallback(async (i) => {
    var _a3;
    if (!i || typeof p != "function") throw new Error("Upload handler not available.");
    const d = (_a3 = await p([i])) == null ? void 0 : _a3[0];
    if (!d) throw new Error("Upload succeeded but no path was returned.");
    Fe(`![[${d}]]
`), Ye(null);
  }, [Fe, p]), Ze = l.useCallback(() => {
    var _a3, _b2, _c2;
    const c = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    let d = null;
    if (c) {
      const { from: u, to: f } = c.state.selection.main;
      u !== f && (d = { from: u, to: f, text: c.state.doc.sliceString(u, f) });
    }
    S(d), Ae(true);
  }, []);
  l.useEffect(() => {
    K.current = Ze;
  }, [Ze]);
  const Jr = l.useMemo(() => [o.jsx(ua, { value: e, theme: r, currentFile: a, language: "ko-KR" }, "export-pdf"), o.jsx(fa, { editorRef: x }, "insert-pgbr"), o.jsx(ma, { onOpen: Ze }, "heading-remap"), o.jsx(ea, { active: !!(w == null ? void 0 : w.open), onToggle: () => {
    var _a3;
    (_a3 = w == null ? void 0 : w.toggleAssist) == null ? void 0 : _a3.call(w);
  } }, "llm-assist"), o.jsx(da, { onOpen: () => {
    ie(true);
  } }, "checklist-progress"), o.jsx(ya, { checked: gt, onChange: Xt, theme: r }, "toc-title-wrap"), o.jsx(va, { checked: Ie, onChange: Qt, theme: r }, "base64-image-fold"), o.jsx(ka, { checked: Jt, onChange: Zt, theme: r }, "editor-autocomplete"), ue ? null : o.jsx(Ea, { checked: ce, onChange: Ue, theme: r }, "mirror-edit"), o.jsx(Ca, { disabled: typeof p != "function", onRequestLink: () => Ee(true), onRequestUpload: (i) => {
    Je(i);
  }, onRequestClip: (i) => Ye(i) }, "image-toolbar")], [e, r, a, gt, Xt, Ie, Qt, Jt, Zt, ue, ce, Ue, p, Je, Ze, w == null ? void 0 : w.open, w == null ? void 0 : w.toggleAssist]), Zr = l.useMemo(() => ["bold", "underline", "italic", "-", "strikeThrough", "sub", "sup", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", 9, "table", "mermaid", "katex", 1, 2, 3, 4, "-", "revoke", "next", 0, "=", 6, 7, ...ue ? [] : [8], "pageFullscreen", "fullscreen", "previewOnly", "preview", "htmlPreview", ...pe ? [5] : [], "catalog"], [pe, ue]), eo = l.useMemo(() => {
    if (typeof p == "function") return async (i, c) => {
      if (g) return;
      const d = await p(i);
      (d == null ? void 0 : d.length) && c(d.map((u) => `![[${u}]]`));
    };
  }, [p, g]);
  return o.jsxs("div", { ref: L, className: `h-full w-full flex flex-col relative${gt ? " toc-titles-wrap" : ""}`, style: { "--md-catalog-width": `${Xe}px`, ...$r }, children: [(Qe == null ? void 0 : Qe.webfontCss) ? o.jsx("style", { "data-s3haim-document-webfonts": "1", children: Qe.webfontCss }) : null, Ge && so.createPortal(o.jsx(Ls, { handleProps: Kr, isResizing: Vr, visibleOnHover: true, label: "TOC resize handle", style: { position: "fixed", top: Ge.top, left: Ge.left, height: Ge.height, bottom: "auto", zIndex: 10003 } }), document.body), g && o.jsxs("div", { className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20", "aria-live": "polite", children: [o.jsx(li, { size: 16, className: "animate-spin shrink-0" }), o.jsxs("span", { children: ["Uploading image... ", Math.max(0, Math.min(100, Math.round(C))), "%"] }), typeof y == "function" && o.jsx("button", { type: "button", onClick: y, className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950", children: "Cancel" })] }), o.jsx(go, { ref: x, id: le, modelValue: e, onChange: $, mdHeadingId: V, className: "h-full! max-h-dvh", theme: r, language: "ko-KR", codeTheme: Ds, customIcon: Ps, previewOnly: s, noMermaid: true, autoDetectCode: true, scrollAuto: false, footers: ["markdownTotal"], toolbars: Zr, defToolbars: Jr, onUploadImg: eo }, `footnotes-${ke}`), o.jsx(vi, { containerRef: L }), o.jsx(Bi, { containerRef: L }), o.jsx(Vi, { isOpen: !!z, onClose: () => ge(null), path: (z == null ? void 0 : z.key) ?? "", kind: (z == null ? void 0 : z.kind) ?? "wiki", initialWidth: (z == null ? void 0 : z.width) ?? "", initialHeight: (z == null ? void 0 : z.height) ?? "", imageSrc: (z == null ? void 0 : z.imageSrc) ?? "", onApply: zr, onStartFreeTransform: Gr, onCrop: qr, onConvertToWiki: Wr, onConvertToImgbb: Yr }, z ? `${z.kind}|${z.key}|${z.width ?? ""}|${z.height ?? ""}|${z.occurrence ?? 0}` : "wiki-image-size-modal"), o.jsx(Sa, { isOpen: qe, onClose: () => Ee(false), onConfirm: ({ desc: i, url: c }) => {
    Fe(`![${i || ""}](${c})
`);
  } }), o.jsx(Na, { isOpen: ut, onClose: () => We(false), onConfirm: ({ line1: i, line2: c }) => {
    var _a3, _b2, _c2, _d, _e2;
    const u = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), f = (u == null ? void 0 : u.state.doc.toString()) ?? Q.current ?? "", { from: b, to: h } = Yt.current, v = Is(f, b, h, i, c);
    u && (u.dispatch({ changes: { from: 0, to: u.state.doc.length, insert: v.next }, selection: { anchor: v.caret }, scrollIntoView: true }), (_d = u.focus) == null ? void 0 : _d.call(u)), (_e2 = ft.current) == null ? void 0 : _e2.call(ft, v.next);
  } }), o.jsx(ja, { isOpen: !!Gt, file: Gt, onClose: () => Ye(null), onConfirm: Qr }), o.jsx(Ki, { isOpen: se.isOpen, initialMeta: ((_a2 = se.editState) == null ? void 0 : _a2.meta) ?? null, initialGrid: ((_b = se.editState) == null ? void 0 : _b.grid) ?? { rows: [[""]], aligns: [null] }, onClose: se.close, onSave: se.apply }), o.jsx($i, { containerRef: L, getMarkdown: () => Q.current ?? "", setMarkdown: (i) => {
    typeof $ == "function" ? $(i) : typeof t == "function" && t(i);
  }, onEditTable: (i, c) => he.current(i, c), onEditFailed: () => {
    B({ title: "? ??", message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???." });
  } }), o.jsx(zi, { containerRef: L, getMarkdown: () => Q.current ?? "", setMarkdown: (i) => {
    typeof $ == "function" && $(i);
  }, enabled: !se.isOpen }), ae && De && o.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500", style: { left: `${De.left}px`, top: `${De.top}px`, width: `${De.width}px`, height: `${De.height}px` }, children: ["nw", "ne", "sw", "se"].map((i) => o.jsx("button", { type: "button", "data-transform-handle": i, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: i.includes("w") ? "-7px" : "auto", right: i.includes("e") ? "-7px" : "auto", top: i.includes("n") ? "-7px" : "auto", bottom: i.includes("s") ? "-7px" : "auto", cursor: i === "nw" || i === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${i}` }, i)) }), ae && o.jsxs("button", { type: "button", onClick: () => Ce(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm", children: [o.jsx("span", { className: "block font-semibold mb-1", children: "Free transform guide" }), o.jsx("span", { className: "block", children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio" }), o.jsx("span", { className: "block", children: "- Touch drag: keeps aspect ratio" }), o.jsx("span", { className: "block", children: "- Click elsewhere (including this banner): confirm transform" })] }), o.jsx(fn, { isOpen: _r, title: "Cover export", message: "You need to open the Export PDF page to export the cover. Continue?", confirmLabel: "Continue", cancelLabel: "Cancel", onConfirm: () => {
    pt(false), Te({ openCoverEdit: true });
  }, onCancel: () => pt(false) }), o.jsx(fn, { isOpen: Or, title: "Save transform", message: "How would you like to handle the current transform?", confirmLabel: "Apply", cancelLabel: "Keep editing", discardLabel: "Reset transform", onConfirm: Ur, onCancel: () => Ce(false), onDiscard: Xr }), o.jsx(wa, { isOpen: ze, markdown: e, selectedMarkdown: (T == null ? void 0 : T.text) ?? "", onClose: () => {
    Ae(false), S(null);
  }, onApply: (i, c) => {
    if (c === "selection" && T) {
      const { from: d, to: u } = T, f = Q.current ?? e, b = `${f.slice(0, d)}${i}${f.slice(u)}`;
      b !== f && $(b);
    } else i !== e && $(i);
    Ae(false), S(null);
  } }), o.jsx(aa, { editorRef: x, onChange: $, open: G, onOpenChange: ie })] });
}
export {
  Sl as default
};
