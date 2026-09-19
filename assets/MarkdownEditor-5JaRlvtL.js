var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { j as o, r as l, u as Un, c as ro, a as oo } from "./vendor-react-BwEIQNKH.js";
import { y as so, z as _t, S as Xn, j as Oe, A as Qn, D as tn, W as io, B as Zn, F as $e, G as Se, H as Jn, h as Ot, V as Bt, J as er, k as tr, M as ao, O as co, P as lo, Q as uo, R as fo, T as wt, U as nn, X as mo, Y as po, c as ho, Z as go, $ as nr, v as xo, a0 as bo, a1 as wo, K as yo, a2 as vo, a3 as ko, a4 as Eo, a5 as Co, a6 as So, a7 as No, a8 as jo, a9 as Mo, aa as Ro, ab as To, ac as Ao, ad as Po, ae as Lo, af as Do, ag as Io, ah as Fo, ai as Ho, aj as _o, ak as Oo, al as Bo, am as Vo } from "./vendor-md-editor-D3gQZdJY.js";
import { aG as je, cY as rn, cZ as Ko, c_ as rr, c$ as or, d0 as on, d1 as $o, a0 as ct, d2 as zo, d3 as sn, E as an, d4 as qo, d5 as Wo, d6 as Yo, d7 as cn, d8 as sr, d9 as Go, da as Uo, db as Xo, dc as Qo, dd as Zo, de as ir, df as Jo, dg as Vt, ag as Kt, dh as es, di as ts, dj as ns, dk as rs, dl as os, dm as ss, dn as ar, dp as yt, dq as is, dr as _e, ds as as, dt as cs, du as ls, dv as ds, dw as us, dx as cr, dy as fs, dz as ms, dA as ln, dB as ps, dC as hs, D as gs, dD as xs, dE as et, dF as bs, dG as ws, dH as He, dI as ys, dJ as vs, dK as ks, cv as dn, dL as vt, dM as kt, dN as Es, dO as un, dP as Cs, dQ as Ss, dR as Ns, aI as js, dS as Ms, dT as Rs, dU as Ts, T as As, M as Ps, dV as Ls, dW as Ds, at as fn, dX as Is, dY as Et, dZ as Ct, d_ as mn, d$ as pn, e0 as St, e1 as hn, e2 as Fs, e3 as gn, e4 as xn, aC as Hs, e5 as _s, e6 as Os, e7 as Bs, e8 as Vs, e9 as Ks, ea as $s, eb as zs, ec as bn, ed as we, ee as qs, ef as Nt, eg as jt, cm as Ws } from "./index-bQvC9Gon.js";
import { S as Ys, W as Gs, Y as wn, Z as Mt, _ as Rt, $ as Us, c as Xs, a0 as $t, a1 as Qs, O as lr, a2 as Zs, G as Js, X as zt, a3 as ei, a4 as ti, a5 as ni, k as qt, a6 as ri, a7 as oi, v as si, a8 as ii, a9 as ai, L as ci } from "./vendor-lucide-MLE-4ziu.js";
import { d as li, v as Tt, w as At, H as di, J as ui, K as fi, M as mi, N as pi, O as hi, Q as gi, U as xi, V as bi, W as wi, S as dr, a as ur, e as yn, f as vn, g as kn, h as En, A as Cn } from "./vendor-radix-DOgSp64j.js";
import { M as yi, h as vi, t as ki, a as Ei, b as Ci, c as Si, d as Ni, e as ji, f as Mi, g as Ri, i as Ti, j as Ai, k as Sn, w as Pi, l as Li } from "./mdEditorSelectionWrap-BdlG3g30.js";
import { N as Di, C as Ii, u as Fi, a as Hi, b as _i, P as Oi, W as Bi, T as Vi, c as Ki, H as $i } from "./useTocTitleWrap-eHCYRYgO.js";
import { a as lt } from "./vendor-motion-CLW0brs2.js";
import { u as zi } from "./useWikiImageHydration-CInHcJLA.js";
import "./vendor-aws-u6g9QQ6G.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-Bp0rxPXM.js";
import "./TableStyleTemplateEditor-Cysd-KtJ.js";
import "./index-T3CnG2ex.js";
import "./vendor-image-crop-BDK_XcHP.js";
import "./cropPadImage-CUan6XFO.js";
function qi(e) {
  return String(e || "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "doc";
}
function Wi(e) {
  return `md-ed-${qi(e)}`;
}
function Yi(e) {
  const t = `${e}-h`;
  return (n, r, a) => {
    const s = Number.isInteger(a) ? a : 0, m = typeof n == "object" && n !== null ? Number(n.index) : NaN, p = Number.isInteger(m) ? m : s;
    return `${t}-${p}`;
  };
}
const Nn = ".md-editor-catalog-link", Gi = "md-preview-heading-folded", jn = "md-preview-heading-section-hidden", Ui = 2;
function Xi(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Qi(e) {
  for (let t = 0; t < 8; t += 1) {
    const n = getComputedStyle(e);
    if (!(e.classList.contains(jn) || e.hasAttribute("hidden") || n.display === "none")) break;
    let a = false, s = e;
    for (; s && !a; ) {
      if (s instanceof HTMLElement && (s.classList.contains(jn) || s.hasAttribute("hidden"))) {
        let p = s.previousElementSibling;
        for (; p; ) {
          if (p instanceof HTMLElement && p.classList.contains(Gi)) {
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
    r.preventDefault(), r.stopPropagation(), typeof r.stopImmediatePropagation == "function" && r.stopImmediatePropagation(), Qi(y);
    const I = je(y);
    if (!I) {
      y.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const N = y.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(y).marginBlockStart || "0") || 0, j = Xi(y, I) - Ui - N;
    I.scrollTo({ top: Math.max(0, j), behavior: "smooth" });
  };
  return e.addEventListener("click", n, true), () => {
    e.removeEventListener("click", n, true);
  };
}
function Ji({ onToggle: e, active: t = false }) {
  return o.jsx("button", { type: "button", className: ["md-editor-toolbar-item", t ? "md-editor-toolbar-active bg-violet-200! hover:bg-violet-300! dark:bg-violet-800/85! dark:hover:bg-violet-700/90!" : ""].filter(Boolean).join(" "), onClick: () => e == null ? void 0 : e(), title: t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-label": t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-pressed": t, children: o.jsx(Ys, { className: "md-editor-icon", size: 16 }) });
}
function ea(e) {
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
      const I = Math.floor(y[1].length / 2), N = y[3].toLowerCase() === "x", j = y[4].trim();
      a += 1, N && (s += 1), r.tasks.push({ id: `line-${g}`, lineIndex: g, indent: I, completed: N, text: j, rawLine: p });
    }
  }), r.tasks.length > 0 && n.push(r);
  const m = a > 0 ? Math.round(s / a * 100) : 0;
  return { categories: n, totalTasks: a, completedTasks: s, pendingTasks: a - s, percentage: m };
}
function ta(e, t) {
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
function na({ markdown: e = "", onMarkdownChange: t }) {
  const [n, r] = l.useState(""), [a, s] = l.useState("all"), [m, p] = l.useState({}), [g, C] = l.useState("dashboard"), y = l.useMemo(() => ea(e), [e]);
  l.useEffect(() => {
    const k = {};
    y.categories.forEach((T) => {
      k[T.name] = true;
    }), p(k);
  }, [y.categories.length]);
  const I = (k) => {
    typeof t == "function" && t(ta(e, k));
  }, N = (k) => {
    p((T) => ({ ...T, [k]: !T[k] }));
  }, j = (k) => {
    const T = k.text.toLowerCase().includes(n.toLowerCase()), D = a === "all" ? true : a === "completed" ? k.completed : !k.completed;
    return T && D;
  };
  return o.jsxs("div", { className: "space-y-3 text-xs text-slate-100", children: [o.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [o.jsxs("div", { className: "col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [o.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: o.jsx(Gs, { className: "h-16 w-16 text-indigo-400" }) }), o.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), o.jsx("div", { className: "my-1.5 flex items-baseline gap-1", children: o.jsxs("span", { className: "text-3xl font-extrabold text-white", children: [y.percentage, "%"] }) }), o.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: o.jsx("div", { className: "h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${y.percentage}%` } }) })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), o.jsx(wn, { className: "h-3.5 w-3.5 text-slate-500" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [y.totalTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), o.jsx(Mt, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [y.completedTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), o.jsx(Rt, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [y.pendingTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), o.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [o.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [o.jsxs("button", { type: "button", onClick: () => C("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${g === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(Us, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), o.jsxs("button", { type: "button", onClick: () => C("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${g === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(wn, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), o.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [o.jsxs("div", { className: "relative min-w-[120px] flex-1", children: [o.jsx(Xs, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), o.jsx("input", { type: "text", value: n, onChange: (k) => r(k.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), o.jsxs("select", { value: a, onChange: (k) => s(k.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [o.jsx("option", { value: "all", children: "\uC804\uCCB4" }), o.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), o.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), g === "dashboard" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: y.categories.length === 0 ? o.jsxs("div", { className: "py-8 text-center text-slate-500", children: [o.jsx($t, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), o.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), o.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : y.categories.map((k, T) => {
    const D = k.tasks.length, H = k.tasks.filter((F) => F.completed).length, W = D > 0 ? Math.round(H / D * 100) : 0, L = !!m[k.name], w = k.tasks.filter(j);
    return n && w.length === 0 ? null : o.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [o.jsxs("button", { type: "button", onClick: () => N(k.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [o.jsx("span", { className: "shrink-0 text-slate-500", children: L ? o.jsx(Qs, { className: "h-3.5 w-3.5" }) : o.jsx(lr, { className: "h-3.5 w-3.5" }) }), o.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: k.name })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [o.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [o.jsx("strong", { className: "text-slate-200", children: H }), " / ", D] }), o.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${W === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [W, "%"] })] })] }), L && o.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: w.length === 0 ? o.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : w.map((F) => o.jsxs("button", { type: "button", onClick: () => I(F.lineIndex), style: { paddingLeft: `${F.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [o.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: F.completed ? o.jsx(Mt, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Rt, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${F.completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: F.text })] }, F.id)) })] }, `${k.name}-${T}`);
  }) }), g === "checklist" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: y.categories.map((k, T) => {
    const D = k.tasks.filter(j);
    return D.length === 0 ? null : o.jsxs("div", { className: "space-y-1", children: [o.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [k.name, " (", D.length, ")"] }), D.map((H) => o.jsxs("button", { type: "button", onClick: () => I(H.lineIndex), style: { paddingLeft: `${H.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [o.jsx("span", { className: "mt-0.5 shrink-0", children: H.completed ? o.jsx(Mt, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Rt, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${H.completed ? "text-slate-500 line-through" : "text-slate-200"}`, children: H.text })] }, H.id))] }, `${k.name}-list-${T}`);
  }) })] })] });
}
const fr = "s3haim-checklist-progress-modal-position", Pt = { leftVw: 58, topVh: 14 };
function ra() {
  try {
    const e = localStorage.getItem(fr);
    if (!e) return { ...Pt };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...Pt } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...Pt };
  }
}
function oa({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(fr, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
const mr = "(max-width: 768px)", sa = 5;
function Mn() {
  return typeof window < "u" && window.matchMedia(mr).matches;
}
function ia({ editorRef: e, onChange: t, open: n, onOpenChange: r }) {
  const [a, s] = l.useState(() => ra()), [m, p] = l.useState(""), [g, C] = l.useState({ from: 0, to: 0 }), y = l.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), I = l.useCallback(() => {
    const { text: T, from: D, to: H } = rn(e);
    return p(T), C({ from: D, to: H }), T;
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
    const T = window.matchMedia(mr), D = (H) => {
      H.matches && (r == null ? void 0 : r(false));
    };
    return T.addEventListener("change", D), () => T.removeEventListener("change", D);
  }, [n, r]);
  const N = l.useCallback((T) => {
    if (T.button !== 0) return;
    T.preventDefault();
    const D = T.clientX, H = T.clientY;
    y.current = { active: true, startX: D, startY: H, startLeftVw: a.leftVw, startTopVh: a.topVh };
    const W = (w) => {
      if (!y.current.active) return;
      Math.hypot(w.clientX - D, w.clientY - H) <= sa;
      const F = window.innerWidth || 1, te = window.innerHeight || 1, _ = (w.clientX - y.current.startX) / F * 100, ne = (w.clientY - y.current.startY) / te * 100;
      s({ leftVw: Math.min(92, Math.max(0, y.current.startLeftVw + _)), topVh: Math.min(90, Math.max(0, y.current.startTopVh + ne)) });
    }, L = () => {
      y.current.active && (y.current.active = false, document.removeEventListener("pointermove", W), document.removeEventListener("pointerup", L), s((w) => (oa(w), w)));
    };
    document.addEventListener("pointermove", W), document.addEventListener("pointerup", L);
  }, [a.leftVw, a.topVh]), j = l.useCallback((T) => {
    p(T);
    const { view: D } = rn(e), { from: H, to: W } = g;
    Ko(D, H, W, T, t) && C({ from: H, to: H + T.length });
  }, [e, g, t]), k = () => {
    r == null ? void 0 : r(false);
  };
  return !n || Mn() ? null : o.jsxs("div", { className: "fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md", style: { left: `${a.leftVw}vw`, top: `${a.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: [o.jsxs("div", { className: "flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing", onPointerDown: N, children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100", children: [o.jsx(Zs, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx($t, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsxs("button", { type: "button", onPointerDown: (T) => T.stopPropagation(), onClick: I, className: "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50", title: "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", "aria-label": "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", children: [o.jsx(Js, { size: 14 }), o.jsx("span", { className: "hidden sm:inline", children: "\uC0C8\uB85C\uACE0\uCE68" })] }), o.jsx("button", { type: "button", onPointerDown: (T) => T.stopPropagation(), onClick: k, className: "rounded p-1 text-indigo-200 hover:bg-indigo-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(zt, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(72vh,640px)] overflow-y-auto p-3", children: m.trim() ? o.jsx(na, { markdown: m, onMarkdownChange: j }) : o.jsxs("p", { className: "rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400", children: ["\uC5D0\uB514\uD130\uC5D0\uC11C \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uD3EC\uD568\uB41C \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD55C \uB4A4", o.jsx("br", {}), "\uD234\uBC14 \uBC84\uD2BC\uC744 \uB204\uB974\uAC70\uB098 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694."] }) })] });
}
const aa = "(max-width: 768px)";
function ca() {
  return typeof window < "u" && window.matchMedia(aa).matches;
}
function la({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item max-md:hidden", onClick: () => {
    ca() || (e == null ? void 0 : e());
  }, title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: o.jsx($t, { className: "md-editor-icon", size: 16 }) });
}
function da({ value: e = "", theme: t = "light", currentFile: n = null, disabled: r, trigger: a }) {
  const s = Un(), m = rr(), p = l.useCallback(() => {
    r || or({ currentFile: n, editorContent: e, theme: t, navigate: s, openInFocusedPane: (g) => {
      var _a2;
      return !!((m == null ? void 0 : m.workspaceTabsEnabled) && ((_a2 = m.openExportPdfInFocusedPane) == null ? void 0 : _a2.call(m, g)));
    } });
  }, [s, e, t, r, n, m]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: p, disabled: r, title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", children: a ?? o.jsx(ei, { className: "md-editor-icon", size: 16 }) });
}
function ua({ editorRef: e }) {
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
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: t, title: "Insert print page break (<pgbr/>)", "aria-label": "Insert print page break", children: o.jsx(ti, { className: "md-editor-icon", size: 16 }) });
}
function fa({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", title: "\uCD5C\uB300 heading \uBCC0\uACBD", "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD", onClick: () => e(), children: o.jsx(ni, { className: "md-editor-icon", size: 16 }) });
}
const ma = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], pa = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], ha = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], ga = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), xa = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Rn = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function ba({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: r, onApply: a }) {
  const s = n.length > 0, [m, p] = l.useState("document"), [g, C] = l.useState(1), [y, I] = l.useState(false), [N, j] = l.useState("nested"), [k, T] = l.useState(1), D = m === "selection" ? n : t;
  l.useEffect(() => {
    if (!e) return;
    const w = s ? "selection" : "document";
    p(w), C(on(w === "selection" ? n : t)), I(false), j("nested"), T(1);
  }, [e, t, n, s]), l.useEffect(() => {
    if (!e) return;
    const w = (_) => {
      const ne = _;
      return (ne == null ? void 0 : ne.closest) ? !!ne.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, F = () => {
      const _ = document.activeElement;
      _ && w(_) && typeof _.blur == "function" && _.blur();
    };
    F();
    const te = (_) => {
      if (_.metaKey || _.ctrlKey || _.altKey) return;
      const ne = _.key;
      if (ne >= "1" && ne <= "9") {
        const ce = Number(ne);
        sn(ce) && (_.preventDefault(), _.stopPropagation(), _.stopImmediatePropagation(), C(ce));
        return;
      }
      _.key === "Escape" || _.key === "Enter" || w(_.target) && (_.preventDefault(), _.stopPropagation(), _.stopImmediatePropagation(), F());
    };
    return window.addEventListener("keydown", te, true), () => window.removeEventListener("keydown", te, true);
  }, [e]);
  const H = l.useMemo(() => $o(D, g, { maxLevel: cn, renumberOutline: y, outlineStyle: N, outlineStart: k }), [D, g, y, N, k]), W = (w) => {
    if (w !== "selection" && w !== "document" || w === "selection" && !s) return;
    p(w), C(on(w === "selection" ? n : t));
  }, L = () => {
    if (!H.sourceMax) return;
    const w = Yo(D, g, { maxLevel: cn, renumberOutline: y, outlineStyle: N, outlineStart: k });
    w !== D && a(w, m), r();
  };
  return o.jsx(ct, { isOpen: e, onClose: r, onConfirm: L, contentClassName: "max-w-3xl", children: o.jsx(li, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), o.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), o.jsx(Tt, { className: "flex items-center gap-2", value: m, onValueChange: W, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: ma.map((w) => {
    const F = m === w.value, te = w.value === "selection" && !s;
    return o.jsx(At, { value: w.value, disabled: te, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", F ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: F ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: w.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: w.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : w.description })] }) }, w.value);
  }) })] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), o.jsxs(di, { value: String(g), onValueChange: (w) => {
    const F = Number(w);
    sn(F) && C(F);
  }, children: [o.jsxs(ui, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [o.jsx(fi, {}), o.jsx(mi, { className: "text-gray-500", children: o.jsx(lr, { size: 14 }) })] }), o.jsx(pi, { children: o.jsx(hi, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: o.jsx(gi, { className: "p-1", children: zo.map((w) => o.jsxs(xi, { value: String(w), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [o.jsx(bi, { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(qt, { size: 12 }) }), o.jsx(wi, { children: `h${w}` })] }, w)) }) }) })] })] }), o.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [o.jsxs("div", { className: "flex items-center justify-between gap-3", children: [o.jsxs("div", { className: "min-w-0", children: [o.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), o.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), o.jsx(dr, { className: ga(y), checked: y, onCheckedChange: I, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: o.jsx(ur, { className: xa }) })] }), y ? o.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), o.jsx(Tt, { className: "flex items-center gap-2", value: N, onValueChange: (w) => {
    (w === "flat" || w === "nested") && j(w);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: pa.map((w) => {
    const F = N === w.value;
    return o.jsx(At, { value: w.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", F ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: F ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: w.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: w.description })] }) }, w.value);
  }) })] }), o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), o.jsx(Tt, { className: "flex items-center gap-2", value: String(k), onValueChange: (w) => {
    w === "1" && T(1), w === "2" && T(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: ha.map((w) => {
    const F = k === w.value;
    return o.jsx(At, { value: String(w.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", F ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: F ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: w.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: w.description })] }) }, w.value);
  }) })] })] }) : null] }), o.jsx("div", { className: "mt-4 min-h-0", children: H.rows.length ? o.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: o.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [o.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: o.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), o.jsx("tbody", { children: H.rows.map((w, F) => o.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(yn, { children: [o.jsx(vn, { asChild: true, children: o.jsx("span", { className: "block truncate", children: w.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(kn, { children: o.jsxs(En, { side: "top", sideOffset: 6, className: Rn, children: [w.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Cn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(yn, { children: [o.jsx(vn, { asChild: true, children: o.jsx("span", { className: "block truncate", children: w.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(kn, { children: o.jsxs(En, { side: "top", sideOffset: 6, className: Rn, children: [w.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Cn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", w.from] }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", w.to] })] }, `${w.from}-${F}-${w.text}`)) })] }) }) : o.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: m === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), o.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [o.jsxs(an, { type: "button", variant: "secondary", size: "md", onClick: r, children: [o.jsx(qo, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs(an, { type: "button", variant: "primary", size: "md", onClick: L, disabled: !H.sourceMax, children: [o.jsx(Wo, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function dt({ checked: e = false, onChange: t, theme: n = "light", title: r, ariaLabel: a, icon: s }) {
  const m = n === "dark", p = a || r;
  return o.jsx("span", { className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1", title: r, children: o.jsxs("label", { className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1", onMouseDown: (g) => {
    g.preventDefault();
  }, children: [o.jsx(s, { className: `md-editor-icon shrink-0 ${m ? "text-odp-muted" : "text-gray-500"}`, size: 16, "aria-hidden": true }), o.jsx(dr, { checked: e, onCheckedChange: (g) => t == null ? void 0 : t(!!g), "aria-label": p, className: ["relative h-4 w-7 rounded-full border-0 outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-blue-400", e ? "bg-blue-600 dark:bg-blue-500" : m ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: o.jsx(ur, { className: ["block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform", "data-[state=checked]:translate-x-3.5"].join(" ") }) })] }) });
}
function wa({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(dt, { checked: e, onChange: t, theme: n, icon: ri, title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)", ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8" });
}
function ya({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(dt, { checked: e, onChange: t, theme: n, icon: oi, title: e ? "base64 \uC774\uBBF8\uC9C0 \uC811\uD798" : "base64 \uC774\uBBF8\uC9C0 \uD3BC\uCE68", ariaLabel: "base64 \uC774\uBBF8\uC9C0 \uC811\uAE30" });
}
function va({ checked: e = true, onChange: t, theme: n = "light" }) {
  return o.jsx(dt, { checked: e, onChange: t, theme: n, icon: si, title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0", ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C" });
}
function ka({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(dt, { checked: e, onChange: t, theme: n, icon: ii, title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off", ariaLabel: "Mirror Edit" });
}
function Ea({ onRequestLink: e, onRequestUpload: t, onRequestClip: n, disabled: r = false }) {
  const [a, s] = l.useState(false), m = l.useRef(null), p = l.useRef(null), g = l.useCallback(() => s(false), []);
  return o.jsxs(o.Fragment, { children: [o.jsx(so, { title: "\uC774\uBBF8\uC9C0", visible: a, onChange: s, disabled: r, overlay: o.jsxs("ul", { className: "md-editor-menu", role: "menu", onClick: g, children: [o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => e(), onKeyDown: (C) => {
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
  }, children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC" })] }), children: o.jsx(ai, { className: "md-editor-icon", size: 16, "aria-hidden": true }) }), o.jsx("input", { ref: m, type: "file", accept: "image/*", multiple: true, className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (C) => {
    const y = Array.from(C.target.files || []);
    C.target.value = "", y.length && t(y);
  } }), o.jsx("input", { ref: p, type: "file", accept: "image/*", className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (C) => {
    var _a2;
    const y = (_a2 = C.target.files) == null ? void 0 : _a2[0];
    C.target.value = "", y && n(y);
  } })] });
}
function Ca({ isOpen: e, onClose: t, onConfirm: n }) {
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
function Sa({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, a] = l.useState(""), [s, m] = l.useState(""), [p, g] = l.useState(""), C = l.useRef(null);
  l.useEffect(() => {
    if (!e) return;
    a(""), m(""), g("");
    const N = window.setTimeout(() => {
      var _a2;
      return (_a2 = C.current) == null ? void 0 : _a2.focus();
    }, 40);
    return () => window.clearTimeout(N);
  }, [e]);
  const y = () => {
    const N = r.trim(), j = s.trim();
    if (!N && !j) {
      g("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ line1: N, line2: j }), t();
  }, I = (N) => {
    N.key === "Enter" && (!(N.metaKey || N.ctrlKey) || N.altKey || N.shiftKey || N.nativeEvent.isComposing || N.keyCode === 229 || (N.preventDefault(), N.stopPropagation(), y()));
  };
  return o.jsx(ct, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uAC01\uC8FC \uC0BD\uC785" }), o.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0", " ", o.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "[^N]" }), "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uBAA9 (1\uC904)" }), o.jsx("input", { ref: C, type: "text", value: r, onChange: (N) => {
    a(N.target.value), p && g("");
  }, onKeyDown: I, placeholder: "\uC608: docs.docker.com - Compose services", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL (2\uC904)" }), o.jsx("input", { type: "text", value: s, onChange: (N) => {
    m(N.target.value), p && g("");
  }, onKeyDown: I, placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), p ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: p }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(zt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: y, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(qt, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Na({ isOpen: e, file: t, onClose: n, onConfirm: r }) {
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
  }, [e, t]), o.jsx(ct, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: a ? o.jsx(Di, { imageSrc: a, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: r }) : null });
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
function ja(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(pr, e ? "1" : "0");
  } catch {
  }
}
function Ma() {
  const [e, t] = l.useState(It), n = l.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return ja(s), s;
    });
  }, []);
  return [e, n];
}
function Ra() {
  const [e, t] = l.useState(sr);
  l.useEffect(() => Go((r) => {
    t(r);
  }), []);
  const n = l.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return Uo(s), s;
    });
  }, []);
  return [e, n];
}
function Ta() {
  const [e, t] = l.useState(Xo);
  l.useEffect(() => Qo((r) => {
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
const Aa = 48, Tn = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, hr = Qn.define(), gr = Qn.define(), xr = new _t();
function Pa(e) {
  const t = [];
  Tn.lastIndex = 0;
  let n;
  for (; (n = Tn.exec(e)) !== null; ) {
    const r = n[1] ?? "image", a = n[2] ?? "";
    if (a.length < Aa) continue;
    const s = n[0], m = s.length - a.length, p = n.index + m;
    t.push({ from: p, to: n.index + s.length, mime: r });
  }
  return t;
}
function La(e, t) {
  const n = Math.round(t * 3 / 4), r = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${r}\u2026`;
}
class Da extends io {
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
function Ia(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
function An(e, t) {
  const n = [], r = [];
  for (let a = 1; a <= e.doc.lines; a += 1) {
    const s = e.doc.line(a);
    for (const m of Pa(s.text)) {
      const p = s.from + m.from, g = s.from + m.to;
      if (Ia(t, p, g)) {
        r.push({ from: p, to: g });
        continue;
      }
      n.push(tn.replace({ widget: new Da(La(m.mime, g - p), p, g) }).range(p, g));
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
}, provide: (e) => Oe.decorations.from(e, (t) => t.deco) }), Fa = Oe.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(br, false);
  if (!n || n.expanded.length === 0) return false;
  const r = e.target;
  if (!(r instanceof Node) || !t.dom.contains(r)) return false;
  const a = t.posAtDOM(r, 0);
  return a !== -1 && n.expanded.some(({ from: s, to: m }) => a >= s && a <= m) || t.dispatch({ effects: gr.of(null) }), false;
} });
function wr() {
  return [br, Fa];
}
function Ha(e) {
  return xr.of(e ? wr() : []);
}
function _a(e, t) {
  if (e) try {
    e.dispatch({ effects: xr.reconfigure(t ? wr() : []) });
  } catch {
  }
}
const yr = new _t();
function Oa(e, t, n) {
  let r = false;
  return er(e).between(t, n, () => {
    r = true;
  }), r;
}
function Ba(e) {
  const t = [], n = e.doc.toString();
  return Ot(e).iterate({ enter(r) {
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
  else if (a.is(Se)) {
    const s = n.filter((m) => m.from !== a.value.from || m.to !== a.value.to);
    s.length !== n.length && (n = s, r = true);
  }
  return r ? n : e;
} });
function Pn(e) {
  const t = e.state.field(kr), n = [];
  for (const r of Ba(e.state)) vr(t, r.from, r.to) || Oa(e.state, r.from, r.to) || n.push(Se.of(r));
  n.length > 0 && e.dispatch({ effects: n });
}
const Va = Bt.fromClass(class {
  constructor(e) {
    Pn(e);
  }
  update(e) {
    e.docChanged && Pn(e.view);
  }
}), Ka = Jn.of((e, t) => {
  const n = e.doc.toString();
  let r = null;
  return Ot(e).iterate({ enter(a) {
    if (a.name !== "FencedCode" || e.doc.lineAt(a.from).from !== t) return;
    const m = ir(n, a.from, a.to);
    if (m) return r = m, false;
  } }), r;
});
function Er() {
  return [kr, Zn(), Ka, Va];
}
function $a(e) {
  return yr.of(e ? Er() : []);
}
function za(e, t) {
  if (e) try {
    e.dispatch({ effects: yr.reconfigure(t ? Er() : []) });
  } catch {
  }
}
const qa = `<br/>
`;
function Wa(e) {
  if (!Jo() || !(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.main, n = qa;
  return e.dispatch({ changes: { from: t.from, to: t.to, insert: n }, selection: tr.cursor(t.from + n.length), scrollIntoView: true }), true;
}
const Cr = new Kt("s3haim-note-cover-fold");
Cr.version(1).stores({ folds: "key, updatedAt" });
const Sr = Cr.folds;
function Ya(e, t) {
  return `cover-fold:${Vt(e, t)}`;
}
function Ga(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Ya(e.type, e.id);
}
async function Ua(e) {
  if (!e) return null;
  const t = await Sr.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function Xa(e, t) {
  e && await Sr.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function Me(e) {
  const t = Math.min(e.length, 2e6);
  return es(e.sliceString(0, t));
}
function Ne(e) {
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
function Qa(e, t) {
  return e.from === t.from && e.to === t.to;
}
function Za(e, t) {
  const n = e.doc.lineAt(t);
  let r = false;
  return Ot(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(a) {
    const s = a.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return r = true, false;
  } }), r;
}
function Lt(e, t) {
  const n = Me(e.doc);
  if (n) {
    const s = e.doc.lineAt(n.from);
    if (t === s.from) {
      const m = Ne(e);
      if (m) return { ...m, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!Za(e, t)) return null;
  const r = e.doc.lineAt(t), a = uo(e, r.from, r.to);
  return !a || a.from >= a.to ? null : { ...a, kind: "heading" };
}
const Ve = ao.define({ combine: (e) => e[e.length - 1] ?? null }), Nr = new _t();
function Ja(e) {
  return Nr.of(Ve.of(e));
}
function ec(e, t) {
  e.dispatch({ effects: Nr.reconfigure(Ve.of(t)) });
}
function tc(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const r = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", r), n.title = r, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const a = n.querySelector("svg");
  return a && (a.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", a.style.transformOrigin = "50% 50%"), n;
}
class Ln extends fo {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return tc(this.open, this.kind);
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
async function nc(e, t) {
  const n = ++Ft, r = jr(e, t);
  if (!r) {
    e.dispatch({ effects: Se.of(t) });
    return;
  }
  try {
    await lt(r, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === Ft && Ne(e.state) && e.dispatch({ effects: Se.of(t) }), r.remove();
}
async function rc(e, t) {
  ++Ft, e.dispatch({ effects: $e.of(t) });
  const n = Ne(e.state);
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
  return e.dispatch({ effects: n ? $e.of(t) : Se.of(t) }), true;
}
function In(e) {
  const t = Ne(e.state);
  if (!t) return false;
  const r = !Be(e.state, t), a = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return Mr(a, !r), (async () => {
    r ? await nc(e, t) : await rc(e, t);
    const s = e.state.facet(Ve);
    s && Xa(s, r);
  })(), true;
}
function oc(e, t) {
  const n = Ne(e.state);
  if (!n) return;
  const r = Be(e.state, n);
  t && !r ? e.dispatch({ effects: Se.of(n) }) : !t && r && e.dispatch({ effects: $e.of(n) });
}
function sc() {
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
      Ua(e).then((r) => {
        n === this.loadGen && r != null && oc(this.view, r);
      });
    }
  });
}
function ic(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(Se) || n.is($e)));
}
function ac() {
  return [Ja(null), Zn({ preparePlaceholder(e, t) {
    const n = Ne(e);
    return n && Qa(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const r = document.createElement("span");
    return r.className = "cm-foldPlaceholder", r.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", r.setAttribute("aria-hidden", "true"), r.onclick = t, r;
  } }), Jn.of((e, t) => {
    const n = Me(e.doc);
    if (!n) return null;
    const r = e.doc.lineAt(n.from);
    return t !== r.from ? null : Ne(e);
  }), co({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = Lt(e.state, t.from);
    if (!n) return null;
    const r = !Be(e.state, n);
    return new Ln(r, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || ic(e), initialSpacer: () => new Ln(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = Lt(e.state, t.from);
    if (!r) return false;
    if (r.kind === "cover") {
      if (!In(e)) return false;
    } else {
      const a = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      Mr(a, Be(e.state, r)), Dn(e, r);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), lo({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = Me(e.state.doc);
    if (r && t.from >= r.from && t.from < r.to) return In(e) ? (n.preventDefault(), true) : false;
    const a = Lt(e.state, t.from);
    return !a || a.kind !== "heading" ? false : (Dn(e, a), n.preventDefault(), true);
  } } }), sc(), Oe.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function cc({ cover: e, getPresignedUrl: t }) {
  const n = ts(e.pageSizeId) ? e.pageSizeId : ns, r = l.useMemo(() => ({ ...rs(), pageSizeId: n }), [n]), a = l.useMemo(() => os(n), [n]), s = l.useMemo(() => ss(r), [r]);
  return o.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: s, children: o.jsx(Ii, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${a.widthMm} / ${a.heightMm}` } }) });
}
const it = /* @__PURE__ */ new WeakMap(), lc = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", dc = "\uD45C\uC9C0";
function Rr(e) {
  const t = it.get(e);
  t && (t.unmount(), it.delete(e));
}
function Fn(e, t) {
  if (!e) return;
  const n = e.querySelector(".md-note-cover-placeholder__fallback");
  n && (n.textContent = t);
}
function Hn(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? Fn(e, lc) : t === "empty" && Fn(e, dc));
}
function uc(e, t, n) {
  let r = it.get(e);
  r || (r = ro.createRoot(e), it.set(e, r)), r.render(l.createElement(cc, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function fc(e, t, n, r) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const { cover: a } = ar(t ?? ""), s = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(a == null ? void 0 : a.enabled)) {
    for (const m of s) {
      Rr(m);
      const p = m.closest("[data-note-cover-placeholder]");
      Hn(p, "empty");
    }
    return 0;
  }
  for (const m of s) {
    const p = m.closest("[data-note-cover-placeholder]");
    Hn(p, "ready"), uc(m, a, n);
  }
  return s.length;
}
function mc(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) Rr(n);
}
const pc = "h1, h2, h3, h4, h5, h6", Tr = "md-preview-heading-fold-chevron", _n = "md-preview-heading-foldable", tt = "md-preview-heading-folded", hc = "md-preview-heading-section-hidden", st = "data-md-preview-heading-fold";
function gc(e) {
  if (!e) return false;
  const t = e.tagName;
  return t === "H1" || t === "H2" || t === "H3" || t === "H4" || t === "H5" || t === "H6";
}
function On(e) {
  const t = e.getAttribute("data-heading-level");
  if (t) {
    const r = Number(t);
    if (Number.isFinite(r) && r >= 1) return r;
  }
  const n = Number(e.tagName.slice(1));
  return Number.isFinite(n) && n >= 1 ? n : 6;
}
function xc(e, t) {
  return e.id || `md-preview-heading-${t}`;
}
function Ar(e) {
  const t = On(e), n = [];
  let r = e.nextElementSibling;
  for (; r && !(gc(r) && On(r) <= t || r.hasAttribute("data-note-cover-placeholder")); ) r instanceof HTMLElement && n.push(r), r = r.nextElementSibling;
  return n;
}
function bc(e) {
  return !!e.closest("[data-note-cover-placeholder], [data-note-cover-preview]");
}
function Pr(e) {
  return Array.from(e.querySelectorAll(pc)).filter((t) => !(!(t instanceof HTMLElement) || bc(t)));
}
function wc(e) {
  if (!e || typeof e.querySelectorAll != "function") return false;
  const t = Pr(e);
  for (const n of t) if (n.getAttribute(st) !== "1" && Ar(n).length > 0) return true;
  return false;
}
function yc(e) {
  const t = document.createElement("button");
  t.type = "button", t.className = `${Tr} cursor-pointer`, t.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), t.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const n = t.querySelector("svg");
  return n && (n.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", n.style.transformOrigin = "50% 50%"), t;
}
function vc(e, t) {
  const n = e.querySelector("svg");
  n instanceof SVGElement && (lt(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" }), e.setAttribute("aria-label", t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
}
function Dt(e, t) {
  for (const n of e) n.classList.toggle(hc, t), t ? n.setAttribute("hidden", "") : n.removeAttribute("hidden");
}
function kc(e, t = {}) {
  if (!e || typeof e.querySelectorAll != "function") return () => {
  };
  const n = new Set(Array.from(t.collapsedIds ?? []).filter((s) => typeof s == "string" && s)), r = [];
  return Pr(e).forEach((s, m) => {
    var _a2;
    if (s.getAttribute(st) === "1") return;
    const p = Ar(s);
    if (p.length === 0) return;
    const g = xc(s, m);
    s.id || (s.id = g), s.setAttribute(st, "1"), s.classList.add(_n), (_a2 = s.querySelector(`:scope > .${Tr}`)) == null ? void 0 : _a2.remove();
    const y = !n.has(g), I = yc(y);
    s.insertBefore(I, s.firstChild);
    const N = (k) => {
      s.classList.toggle(tt, k), Dt(p, k), vc(I, !k);
    };
    y || (s.classList.add(tt), Dt(p, true));
    const j = (k) => {
      var _a3;
      k.preventDefault(), k.stopPropagation();
      const T = !s.classList.contains(tt);
      N(T), T ? n.add(g) : n.delete(g), (_a3 = t.onCollapsedChange) == null ? void 0 : _a3.call(t, Array.from(n));
    };
    I.addEventListener("click", j), r.push(() => {
      I.removeEventListener("click", j), I.remove(), s.classList.remove(_n, tt), s.removeAttribute(st), Dt(p, false);
    });
  }), () => {
    for (const s of r) s();
  };
}
const Lr = new Kt("s3haim-preview-heading-fold");
Lr.version(1).stores({ folds: "key, updatedAt" });
const Dr = Lr.folds;
function Ec(e, t) {
  return `heading-fold:${Vt(e, t)}`;
}
function Cc(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Ec(e.type, e.id);
}
async function Sc(e) {
  if (!e) return null;
  const t = await Dr.get(e);
  return !t || !Array.isArray(t.collapsedIds) ? null : t.collapsedIds.filter((n) => typeof n == "string" && n.length > 0);
}
async function Nc(e, t) {
  e && await Dr.put({ key: e, collapsedIds: Array.from(new Set(t.filter(Boolean))), updatedAt: Date.now() });
}
function jc(e) {
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
  return yt("collect:result", { count: t.length, files: is(t) }), t;
}
const at = /* @__PURE__ */ new Set();
function Mc(e) {
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
function Tc() {
  return Bt.fromClass(class {
    constructor() {
      __publicField(this, "raf", 0);
    }
    update(e) {
      e.docChanged && (e.view.composing || e.view.compositionStarted || (this.raf && cancelAnimationFrame(this.raf), this.raf = requestAnimationFrame(() => {
        this.raf = 0, Ac(e.view);
      })));
    }
    destroy() {
      this.raf && cancelAnimationFrame(this.raf);
    }
  });
}
function Ac(e) {
  const t = e.contentDOM;
  t && t.offsetHeight;
}
const Pc = [0, 16, 48, 100, 180, 320];
function Lc(e) {
  let t = [], n = null, r = null, a = false, s = false;
  function m() {
    for (const j of t) clearTimeout(j);
    t = [];
  }
  function p() {
    if (s) return false;
    const j = e.getPreviewRoot(), k = e.getView();
    return !j || !k || _e(j) ? false : as(k, j, { allowCollapsed: true });
  }
  function g() {
    a || s || (a = true, requestAnimationFrame(() => {
      a = false, p();
    }));
  }
  function C(j) {
    n && r === j || (n == null ? void 0 : n.disconnect(), r = j, n = new MutationObserver((k) => {
      k.some((D) => {
        const H = [...D.addedNodes, ...D.removedNodes];
        return H.length === 0 ? D.type === "characterData" || D.type === "attributes" : H.some((W) => {
          var _a2, _b;
          return W instanceof Element ? !(W.hasAttribute("data-preview-caret-mirror") || W.hasAttribute("data-preview-sel-mirror") || ((_a2 = W.classList) == null ? void 0 : _a2.contains("s3haim-preview-caret-mirror")) || ((_b = W.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
        });
      }) && g();
    }), n.observe(j, { childList: true, subtree: true, characterData: true }));
  }
  function y(j) {
    if (s) return;
    const k = e.getPreviewRoot();
    if (k && C(k), p(), !!(j == null ? void 0 : j.withRetries)) {
      m();
      for (const T of Pc) t.push(setTimeout(() => {
        if (s) return;
        const D = e.getPreviewRoot();
        D && C(D), p();
      }, T));
    }
  }
  function I() {
    s = true, m(), n == null ? void 0 : n.disconnect(), n = null, r = null, a = false;
  }
  const N = e.getPreviewRoot();
  return N && C(N), y({ withRetries: true }), { schedule: y, stop: I };
}
const Bn = [0, 16, 48, 120, 280], Dc = 50, Ic = 40, Vn = 32, Fc = 32;
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
function Hc(e, t) {
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
function Oc(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.dom) == null ? void 0 : _a2.closest(".md-editor");
  if (n instanceof HTMLElement) return n;
  const r = t == null ? void 0 : t.closest(".md-editor");
  return r instanceof HTMLElement ? r : null;
}
function Bc(e) {
  let t = false, n = [], r = null, a = 0, s = null, m = 0, p = 0, g = null, C = null, y = null, I = null, N = null, j = "none", k = false;
  function T() {
    for (const R of n) clearTimeout(R);
    n = [];
  }
  function D() {
    r != null && (clearTimeout(r), r = null), a = 0;
  }
  function H() {
    s != null && (clearTimeout(s), s = null);
  }
  function W() {
    m && cancelAnimationFrame(m), p && cancelAnimationFrame(p), m = 0, p = 0;
  }
  function L(R) {
    H(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s = setTimeout(() => {
          s = null, j === R && (j = "none");
        }, Fc);
      });
    });
  }
  function w(R) {
    return R.scrollDOM;
  }
  function F(R) {
    return Kn(I) ? I : Kn(C) ? C : je(R);
  }
  function te(R) {
    if (!(R instanceof Node)) return null;
    const S = e.getView(), V = e.getPreviewRoot();
    if (S && (R === S.scrollDOM || S.dom.contains(R))) return "editor";
    if (V) {
      const G = V.closest(".md-editor-preview-wrapper") ?? V;
      if (R === G || G.contains(R)) return "preview";
    }
    return null;
  }
  function _(R, S) {
    if (R !== "preview" || !(S instanceof HTMLElement)) return;
    const V = e.getPreviewRoot();
    if (!V) return;
    const G = je(V);
    G && (S === G || S.contains(G)) && (I = S);
  }
  function ne(R, S) {
    if (!(S instanceof HTMLElement)) return false;
    if (R === "editor") {
      const se = e.getView();
      return !!(se && (S === se.scrollDOM || S.contains(se.scrollDOM)));
    }
    const V = e.getPreviewRoot(), G = V ? je(V) : null;
    return !!(G && (S === G || S.contains(G)));
  }
  function ce() {
    if (k) return false;
    const R = e.getPreviewRoot(), S = e.getView();
    if (!R || !S || j === "preview" || j !== "none" && j !== "follow") return false;
    j = "follow";
    const V = cs(S, R);
    return L("follow"), V;
  }
  function B() {
    t || k || (t = true, requestAnimationFrame(() => {
      t = false, ce();
    }));
  }
  function x() {
    const R = e.getPreviewRoot(), S = e.getView();
    if (!R || !S) return;
    const V = w(S), G = F(R);
    if (!G) return;
    const se = V.scrollTop, z = S.lineBlockAtHeight(se), ge = S.state.doc.lineAt(z.from).number - 1, ve = Hc(R, ge);
    if (!ve) return;
    const Pe = z.height > 0 ? Math.max(0, Math.min(1, (se - z.top) / z.height)) : 0, ke = Ht(ve, G) + ve.offsetHeight * Pe - Vn;
    $n(G, ke);
  }
  function A() {
    const R = e.getPreviewRoot(), S = e.getView();
    if (!R || !S) return;
    const V = w(S), G = F(R);
    if (!G) return;
    const se = G.scrollTop + Vn, z = _c(R, G, se);
    if (!z) return;
    const { el: ge, line0: ve } = z, Pe = Math.min(Math.max(1, ve + 1), S.state.doc.lines), qe = S.state.doc.line(Pe), ke = S.lineBlockAt(qe.from), ut = Ht(ge, G), We = ge.offsetHeight > 0 ? Math.max(0, Math.min(1, (se - ut) / ge.offsetHeight)) : 0;
    $n(V, ke.top + ke.height * We);
  }
  function ee() {
    if (!k && !(j === "preview" || j === "follow")) {
      j = "editor";
      try {
        x();
      } finally {
        L("editor");
      }
    }
  }
  function X() {
    if (!k && !(j === "editor" || j === "follow")) {
      j = "preview";
      try {
        A();
      } finally {
        L("preview");
      }
    }
  }
  function J() {
    k || j === "preview" || j === "follow" || m || (m = requestAnimationFrame(() => {
      m = 0, ee();
    }));
  }
  function U() {
    k || j === "editor" || j === "follow" || p || (p = requestAnimationFrame(() => {
      p = 0, X();
    }));
  }
  function re(R) {
    const S = te(R.target);
    !S || !ne(S, R.target) || (_(S, R.target), S === "editor" ? J() : U());
  }
  function le(R) {
    const S = te(R.target);
    S && requestAnimationFrame(() => {
      const V = e.getView(), G = e.getPreviewRoot();
      S === "editor" && V ? J() : S === "preview" && G && (_("preview", je(G)), U());
    });
  }
  function fe(R) {
    const S = R.target;
    if (S instanceof HTMLImageElement && (N == null ? void 0 : N.contains(S))) {
      B(), T();
      for (const V of Bn) n.push(setTimeout(() => ce(), V));
    }
  }
  function Re(R) {
    const S = R.scrollDOM;
    return S instanceof HTMLElement ? (g === S || (g && g.removeEventListener("scroll", re), g = S, S.addEventListener("scroll", re, { passive: true })), true) : false;
  }
  function K(R) {
    const S = je(R);
    return S ? (C === S || (C && C.removeEventListener("scroll", re), C = S, I = S, S.addEventListener("scroll", re, { passive: true })), true) : false;
  }
  function oe(R, S) {
    const V = Oc(R, S);
    return V ? (y === V || (y && (y.removeEventListener("scroll", re, true), y.removeEventListener("wheel", le, true), y.removeEventListener("touchmove", le, true)), y = V, V.addEventListener("scroll", re, { capture: true, passive: true }), V.addEventListener("wheel", le, { capture: true, passive: true }), V.addEventListener("touchmove", le, { capture: true, passive: true })), true) : false;
  }
  function Te(R) {
    N !== R && (N && (N.removeEventListener("load", fe, true), N.removeEventListener("error", fe, true)), N = R, R.addEventListener("load", fe, true), R.addEventListener("error", fe, true));
  }
  function he() {
    k || r != null || a >= Ic || (r = setTimeout(() => {
      if (r = null, a += 1, k) return;
      ye() || he();
    }, Dc));
  }
  function ye() {
    if (k) return false;
    const R = e.getView(), S = e.getPreviewRoot();
    let V = true;
    return R && Re(R) || (V = false), S ? (K(S) || (V = false), Te(S)) : V = false, oe(R, S) || (V = false), V;
  }
  function ze(R) {
    if (!k && (ye() || he(), ce(), !!(R == null ? void 0 : R.withRetries))) {
      T();
      for (const S of Bn) n.push(setTimeout(() => {
        k || (ye() || he(), ce());
      }, S));
    }
  }
  function Ae() {
    k = true, T(), D(), H(), W(), g && (g.removeEventListener("scroll", re), g = null), C && (C.removeEventListener("scroll", re), C = null), y && (y.removeEventListener("scroll", re, true), y.removeEventListener("wheel", le, true), y.removeEventListener("touchmove", le, true), y = null), N && (N.removeEventListener("load", fe, true), N.removeEventListener("error", fe, true), N = null), I = null, t = false, j = "none";
  }
  return D(), ye() || he(), ze({ withRetries: true }), { schedule: ze, stop: Ae };
}
const Ke = new Kt("s3haim-editor-undo-history");
Ke.version(1).stores({ histories: "key, updatedAt" });
const zn = 100, Fr = 10080 * 60 * 1e3, Vc = 500;
function Kc(e, t) {
  return Vt(e, t);
}
function $c(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" ? null : Kc(e.type, e.id);
}
async function zc(e) {
  if (!e) return null;
  const t = await Ke.histories.get(e);
  return t ? typeof t.updatedAt == "number" && Date.now() - t.updatedAt > Fr ? (await Ke.histories.delete(e), null) : !Array.isArray(t.stack) || t.stack.length === 0 ? null : t : null;
}
function Wt(e) {
  return Array.isArray(e) ? e.length <= zn ? e : e.slice(e.length - zn) : [""];
}
async function qn({ key: e, stack: t, index: n }) {
  if (!e) return;
  const r = Wt(t), a = Math.max(0, Math.min(n ?? r.length - 1, r.length - 1));
  await Ke.histories.put({ key: e, stack: r, index: a, updatedAt: Date.now() });
}
async function qc() {
  const e = Date.now() - Fr;
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
function Wc(e, t, n) {
  const r = n ?? "", a = Array.isArray(e) && e.length > 0 ? e : [""], s = Math.max(0, Math.min(t, a.length - 1));
  if (a[s] === r) return { stack: a, index: s, changed: false };
  for (let g = s - 1; g >= 0; g -= 1) if (a[g] === r) return { stack: a, index: g, changed: true };
  for (let g = s + 1; g < a.length; g += 1) if (a[g] === r) return { stack: a, index: g, changed: true };
  const m = a.slice(0, s + 1);
  m.push(r);
  const p = Wt(m);
  return { stack: p, index: p.length - 1, changed: true };
}
function Yc(e, t, n) {
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
function Gc(e) {
  var _a2;
  return e ? ((_a2 = e.getEditorView) == null ? void 0 : _a2.call(e)) ?? null : null;
}
function Yn(e) {
  const t = e == null ? void 0 : e.current;
  return (t == null ? void 0 : t.value) ?? t ?? null;
}
function Uc(e, t) {
  return e ?? "";
}
function Xc({ currentFile: e, value: t, onChange: n, editorRef: r, enabled: a = true }) {
  const s = a ? $c(e) : null, m = l.useRef([""]), p = l.useRef(0), g = l.useRef(null), C = l.useRef(t ?? ""), y = l.useRef(false), I = l.useRef(false), N = l.useRef(null), j = l.useRef(null), k = l.useRef(t), T = l.useRef(false), D = l.useRef(null), H = l.useRef(0), W = l.useRef(t);
  k.current = t;
  const L = l.useCallback(async (B, x, A) => {
    if (B) try {
      await qn({ key: B, stack: x, index: A });
    } catch (ee) {
      console.warn("[editor-undo-history] save failed:", ee);
    }
  }, []), w = l.useCallback((B, x, A) => {
    B && (j.current && clearTimeout(j.current), j.current = setTimeout(() => {
      j.current = null, L(B, x, A);
    }, 300));
  }, [L]), F = l.useCallback(() => {
    N.current && (clearTimeout(N.current), N.current = null);
  }, []), te = l.useCallback((B) => {
    const x = nt(m.current, p.current, B ?? "");
    return m.current = x.stack, p.current = x.index, x;
  }, []), _ = l.useCallback((B) => {
    const x = Yn(r), A = Gc(x), ee = Wn(x);
    if (!A) return false;
    const X = ++H.current;
    y.current = true, I.current = true;
    try {
      Yc(A, B, ee ?? void 0);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          H.current === X && (y.current = false, I.current = false);
        });
      });
    }
    return true;
  }, [r]), ne = l.useCallback((B, x) => {
    var _a2, _b;
    const A = k.current ?? "", ee = ((_a2 = x == null ? void 0 : x.stack) == null ? void 0 : _a2.length) ? x.stack : [A], X = ((_b = x == null ? void 0 : x.stack) == null ? void 0 : _b.length) ? x.index ?? x.stack.length - 1 : 0, J = nt(ee, X, A);
    m.current = J.stack, p.current = J.index, T.current = false, W.current = A, C.current = A;
    const U = J.stack.slice(0, J.index + 1), re = (le) => {
      if (g.current === B) {
        if (_(U)) {
          D.current = B;
          return;
        }
        if (le <= 0) {
          D.current = B, I.current = false, y.current = false;
          return;
        }
        setTimeout(() => re(le - 1), 50);
      }
    };
    re(40), w(B, J.stack, J.index);
  }, [_, w]);
  return l.useEffect(() => {
    a && qc().catch(() => {
    });
  }, [a]), l.useEffect(() => {
    g.current === s && (C.current = t ?? "");
  }, [t, s]), l.useEffect(() => {
    var _a2;
    if (!a) return;
    const B = g.current, x = s;
    if (F(), j.current && (clearTimeout(j.current), j.current = null), B === x) return;
    if (B) {
      const J = Uc(C.current, k.current ?? ""), U = te(J);
      L(B, U.stack, U.index);
    }
    g.current = x, D.current = null, T.current = false, I.current = true, C.current = k.current ?? "";
    const A = Yn(r);
    if ((_a2 = Wn(A)) == null ? void 0 : _a2(), !x) {
      m.current = [k.current ?? ""], p.current = 0, D.current = null, I.current = false;
      return;
    }
    const ee = ++H.current;
    let X = false;
    return (async () => {
      let J = null;
      try {
        J = await zc(x);
      } catch (U) {
        console.warn("[editor-undo-history] load failed:", U);
      }
      X || H.current !== ee || g.current === x && ne(x, J);
    })(), () => {
      X = true;
    };
  }, [a, s, r, F, te, L, ne]), l.useEffect(() => {
    if (!a || !s || D.current !== s || T.current || y.current || I.current || t === W.current) return;
    const B = t ?? "";
    W.current = B, C.current = B;
    const x = nt(m.current, p.current, B);
    m.current = x.stack, p.current = x.index, _(x.stack.slice(0, x.index + 1)), w(s, x.stack, x.index);
  }, [a, s, t, _, w]), l.useEffect(() => {
    if (a) return () => {
      F(), j.current && (clearTimeout(j.current), j.current = null);
      const B = g.current;
      if (!B) return;
      const x = nt(m.current, p.current, C.current ?? k.current ?? "");
      qn({ key: B, stack: x.stack, index: x.index }).catch(() => {
      });
    };
  }, [a, F]), { onChange: l.useCallback((B) => {
    y.current || I.current || D.current === g.current && (W.current = B, C.current = B, T.current = true, n == null ? void 0 : n(B), !(!a || !g.current) && (F(), N.current = setTimeout(() => {
      if (N.current = null, y.current || I.current) return;
      const x = g.current;
      if (!x) return;
      const A = Wc(m.current, p.current, B);
      A.changed && (m.current = A.stack, p.current = A.index, w(x, A.stack, A.index));
    }, Vc)));
  }, [a, n, F, w]) };
}
const Qc = "s3haim_md_editor_toc_width", Zc = 360;
function Gn(e) {
  const t = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), n = [];
  (t ? e.metaKey : e.ctrlKey) && n.push("mod"), e.altKey && n.push("alt"), e.shiftKey && n.push("shift");
  const r = (e.key || "").toLowerCase();
  return !r || r === "shift" || r === "control" || r === "alt" || r === "meta" || (n.push(r), n.length <= 1) ? null : n.join("+");
}
function rt(e) {
  return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
}
const Jc = wo({ nonTightLists: false });
function el(e) {
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
function tl(e) {
  return Jc(e) ? (el(e), true) : Wa(e) ? true : bo(e);
}
const nl = go.highest(nr.of([{ key: "Enter", run: tl }]));
function rl(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const t = (_b = (_a2 = e.state.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return;
  const n = e.state.doc.lineAt(t);
  e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from } });
}
function ot(e, t) {
  return Ws() ? t(e) : false;
}
const ol = [{ key: "Alt-h", preventDefault: true, run: (e) => ot(e, _o) }, { key: "Alt-j", preventDefault: true, run: (e) => ot(e, Oo) }, { key: "Alt-k", preventDefault: true, run: (e) => ot(e, Bo) }, { key: "Alt-l", preventDefault: true, run: (e) => ot(e, Vo) }];
xo({ editorConfig: { languageUserDefined: { "ko-KR": yo }, renderDelay: cr() ? 500 : 0 }, codeMirrorExtensions(e, { keyBindings: t }) {
  const n = [...e].filter((s) => s.type !== "keymap" && s.type !== "linkShortener" && s.type !== "lineNumbers"), r = (t || []).filter((s) => {
    const m = String((s == null ? void 0 : s.key) || "").toLowerCase(), p = String((s == null ? void 0 : s.mac) || "").toLowerCase();
    return m !== "mod-f" && m !== "ctrl-d" && m !== "mod-d" && p !== "cmd-d" && m !== "ctrl-b" && m !== "mod-b" && p !== "cmd-b" && m !== "ctrl-u" && m !== "mod-u" && p !== "cmd-u" && m !== "ctrl-o" && m !== "mod-o" && p !== "cmd-o" && m !== "ctrl-arrowup" && m !== "mod-arrowup" && p !== "cmd-arrowup" && m !== "ctrl-arrowdown" && m !== "mod-arrowdown" && p !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(m) && !/^mod-[0-9]$/.test(m) && !/^cmd-[0-9]$/.test(p);
  }), a = [{ key: "ArrowLeft", run: (s) => bn(s, -1) }, { key: "ArrowRight", run: (s) => bn(s, 1) }, { key: "Ctrl-ArrowLeft", mac: "Alt-ArrowLeft", run: (s) => we(s, -1, Ao), shift: (s) => we(s, -1, To) }, { key: "Ctrl-ArrowRight", mac: "Alt-ArrowRight", run: (s) => we(s, 1, Lo), shift: (s) => we(s, 1, Po) }, { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: (s) => we(s, -1, Io), shift: (s) => we(s, -1, Do) }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: (s) => we(s, 1, Ho), shift: (s) => we(s, 1, Fo) }, ...ol, { key: "Alt--", preventDefault: true, run: ki }, { key: "Ctrl-Tab", run: Ei }, { key: "Ctrl-f", mac: "Cmd-f", preventDefault: true, run: vo }, { key: "Ctrl-d", mac: "Cmd-d", preventDefault: true, run: (s) => (Co(s), true) }, { key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Ci }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: Si }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: ji, shift: Ni }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: Mi }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: Ri }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Ti }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: Ai }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => ({ key: `Ctrl-${s}`, mac: `Cmd-${s}`, preventDefault: true, run: (m) => Sn(m, s) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (s) => Sn(s, 10) }, { any: (s, m) => (m.ctrlKey || m.metaKey) && m.altKey && m.code === "KeyC" ? Pi(s) : Li(s, m) }, { key: "Mod-Alt-ArrowUp", run: ko }, { key: "Mod-Alt-ArrowDown", run: Eo }, ...r];
  return n.some((s) => s.type === "drawSelection") || n.push({ type: "drawSelection", extension: So() }), n.push({ type: "cmGlyphRepaintFix", extension: Tc() }), n.push({ type: "markdownSingleNewlineEnter", extension: nl }, { type: "lineNumbers", extension: ac() }, { type: "allowMultipleSelections", extension: No.allowMultipleSelections.of(true) }, { type: "clickAddsSelectionRange", extension: Oe.clickAddsSelectionRange.of((s) => {
    const m = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return s.altKey || (m ? s.metaKey : s.ctrlKey);
  }) }, { type: "multiCursorPreview", extension: jo({ minSelectionLength: 2, maxMatches: 200 }) }, { type: "keymap", extension: nr.of(a) }, { type: "base64ImageFold", extension: Ha(It()) }, { type: "mermaidBase64Fold", extension: $a(It()) }, { type: "autocompleteGate", extension: Oe.updateListener.of((s) => {
    Rc(s), !sr() && Mo(s.state) === "active" && Ro(s.view);
  }) }), n;
}, markdownItPlugins(e) {
  return zs(e);
} });
function vl({ value: e, onChange: t, onSave: n, theme: r = "light", currentFile: a = null, previewOnly: s = false, isMobileLayout: m = false, onUploadImage: p, isUploadingEditorImage: g = false, uploadImagePercent: C = 0, onCancelUploadImage: y, onResolveWikiImageUrl: I, snippetConfig: N = { snippets: [] }, llmProviderProfiles: j = [], getImgbbApiKey: k, onOpenViewPath: T, onRequestConvertAllImagesToWiki: D, onRegisterConvertAllImagesToWiki: H, isActiveFile: W = true, isSurfaceLive: L = true }) {
  var _a2, _b;
  const w = ls(), F = Un(), te = rr(), { showAlert: _ } = ds(), ne = l.useId(), ce = l.useMemo(() => Wi(ne), [ne]), B = l.useMemo(() => Yi(ce), [ce]), x = l.useRef(null), A = l.useRef(null), ee = l.useRef(null), X = l.useRef(null), J = l.useRef(N), U = l.useRef(e), re = l.useRef(a), le = l.useRef(r), fe = l.useRef("");
  l.useEffect(() => {
    U.current = e, re.current = a, le.current = r;
  }, [e, a, r]), l.useEffect(() => {
    const { issues: i } = ar(e ?? "");
    if (!i.length) {
      fe.current = "";
      return;
    }
    const c = us(i);
    c !== fe.current && (fe.current = c, _({ title: "Cover syntax error", message: `note-cover has invalid syntax.

${c}` }));
  }, [e, _]);
  const Re = l.useCallback((i = {}) => {
    const c = U.current ?? "", d = re.current;
    or({ currentFile: d, editorContent: c, theme: le.current === "dark" ? "dark" : "light", navigate: F, openCoverEdit: !!i.openCoverEdit, openInFocusedPane: (u) => {
      var _a3;
      return !!((te == null ? void 0 : te.workspaceTabsEnabled) && ((_a3 = te.openExportPdfInFocusedPane) == null ? void 0 : _a3.call(te, u)));
    } });
  }, [F, te]), { onChange: K } = Xc({ currentFile: a, value: e, onChange: t, editorRef: x, enabled: !s }), oe = Fi({ getMarkdown: () => U.current ?? "", setMarkdown: (i) => {
    typeof t == "function" && t(i);
  } }), Te = l.useRef(oe.openAtOffset), he = l.useRef(oe.openPreviewTable);
  l.useEffect(() => {
    Te.current = oe.openAtOffset, he.current = oe.openPreviewTable;
  }, [oe.openAtOffset, oe.openPreviewTable]);
  const ye = l.useRef(null), [ze, Ae] = l.useState(false), [R, S] = l.useState(null), V = l.useRef(() => {
  }), [G, se] = l.useState(false), [z, ge] = l.useState(null), [ve, Pe] = l.useState(0), [qe, ke] = l.useState(false), [ut, We] = l.useState(false), Yt = l.useRef({ from: 0, to: 0 }), ft = l.useRef(K);
  l.useEffect(() => {
    ft.current = K;
  }, [K]);
  const [Gt, Ye] = l.useState(null), [ie, Le] = l.useState(null), [Hr, Ee] = l.useState(false), [De, mt] = l.useState(null), [_r, pt] = l.useState(false), [pe, Ut] = l.useState(null), [Ge, ht] = l.useState(null), xe = l.useRef(null), [gt, Xt] = Hi(), [Ie, Qt] = Ma(), [Zt, Jt] = Ra(), [Or, Ue] = Ta(), ue = l.useMemo(() => cr(), []), ae = ue ? false : Or, xt = l.useRef(null);
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
    const d = fs(i);
    return () => {
      window.removeEventListener("keydown", c, true), d();
    };
  }, [s]), l.useEffect(() => {
    if (s || !L) return;
    const i = () => {
      var _a3;
      return ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current;
    }, c = () => {
      var _a3, _b2;
      const v = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3), M = xt.current;
      !v || !M || v.dispatch({ selection: M, scrollIntoView: true });
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
      const M = (_b2 = h.getEditorView) == null ? void 0 : _b2.call(h);
      M && (M.dispatch(M.state.replaceSelection(v)), (_c2 = M.focus) == null ? void 0 : _c2.call(M));
    }, f = (h = {}) => {
      Re(h);
    }, b = {};
    for (const h of ms) h.directive && (b[h.id] = () => d(h.directive));
    return b["editor-revoke"] = () => {
      var _a3, _b2;
      c();
      const h = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      h && (h.focus(), mo(h));
    }, b["editor-next"] = () => {
      var _a3, _b2;
      c();
      const h = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      h && (h.focus(), po(h));
    }, b["editor-llm-assist"] = () => {
      var _a3;
      return (_a3 = w == null ? void 0 : w.toggleAssist) == null ? void 0 : _a3.call(w);
    }, b["editor-export-pdf"] = f, b["editor-pgbr"] = () => {
      c(), u();
    }, b["editor-heading-remap"] = () => {
      c(), V.current();
    }, b["editor-checklist-progress"] = () => se(true), b["editor-table-edit"] = () => {
      var _a3, _b2;
      c();
      const h = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      if (!h) return;
      const { from: v, to: M } = h.state.selection.main;
      Te.current(v, M) || _({ title: "No table", message: "No haim-table found at the cursor or selection position." });
    }, b["editor-image-upload"] = () => {
      const h = document.createElement("input");
      h.type = "file", h.accept = "image/*", h.multiple = true, h.onchange = () => {
        var _a3;
        const v = Array.from(h.files || []);
        v.length && ((_a3 = ye.current) == null ? void 0 : _a3.call(ye, v));
      }, h.click();
    }, b["editor-image-clip"] = () => {
      const h = document.createElement("input");
      h.type = "file", h.accept = "image/*", h.onchange = () => {
        var _a3;
        const v = (_a3 = h.files) == null ? void 0 : _a3[0];
        v && Ye(v);
      }, h.click();
    }, b["editor-convert-all-images-to-wiki"] = () => {
      typeof D == "function" && D();
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
    }, ps(b);
  }, [s, L, Re, _, D, w]);
  const bt = w == null ? void 0 : w.registerEditorBridge;
  l.useEffect(() => {
    if (s || !W || !L || !bt) return;
    const i = () => {
      const c = x.current;
      if (!c) return null;
      if (typeof c.getEditorView == "function" || typeof c.getSelectedText == "function") return c;
      const d = c.value;
      return d && (typeof d.getEditorView == "function" || typeof d.getSelectedText == "function") ? d : null;
    };
    return bt({ editorRef: x, getEditorApi: i, onChange: K, getMarkdown: () => {
      var _a3, _b2, _c2, _d, _e2, _f;
      return ((_f = (_e2 = (_d = (_c2 = (_b2 = (_a3 = i()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3)) == null ? void 0 : _c2.state) == null ? void 0 : _d.doc) == null ? void 0 : _e2.toString) == null ? void 0 : _f.call(_e2)) ?? U.current ?? "";
    } });
  }, [s, W, L, bt, K]), l.useEffect(() => {
    if (s || !L) return;
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
    return hs({ getMarkdown: () => {
      var _a3;
      return ((_a3 = i()) == null ? void 0 : _a3.state.doc.toString()) ?? U.current ?? "";
    }, insertExisting: (u) => {
      c();
      const f = i(), b = (f == null ? void 0 : f.state.doc.toString()) ?? U.current ?? "", h = f == null ? void 0 : f.state.selection.main, v = qs(b, (h == null ? void 0 : h.from) ?? 0, (h == null ? void 0 : h.to) ?? 0, u);
      d(v.next, v.caret);
    }, openCompose: () => {
      var _a3;
      c();
      const f = (_a3 = i()) == null ? void 0 : _a3.state.selection.main;
      Yt.current = { from: (f == null ? void 0 : f.from) ?? 0, to: (f == null ? void 0 : f.to) ?? 0 }, We(true);
    } });
  }, [s, L]);
  const { width: Xe, isResizing: Br, handleProps: Vr } = gs({ storageKey: Qc, defaultWidth: Zc, minWidth: 160, collapseBelowWidth: 80, maxWidth: 640, edge: "right", onCollapseBelowMin: () => {
    var _a3, _b2, _c2;
    (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c2.call(_b2, false);
  } }), Qe = l.useMemo(() => {
    const { meta: i } = xs(e ?? "");
    return i;
  }, [e]), Kr = l.useMemo(() => {
    const i = Qe == null ? void 0 : Qe.fonts;
    if (!i) return {};
    const c = {}, d = et(i.body), u = et(i.heading), f = et(i.bold), b = et(i.code, "mono");
    return d && (c["--print-font-body"] = d), u && (c["--print-font-heading"] = u), f && (c["--print-font-bold"] = f), b && (c["--print-font-code"] = b), c;
  }, [Qe]);
  l.useEffect(() => {
    J.current = N || { snippets: [] };
  }, [N]), l.useEffect(() => {
    const i = () => {
      var _a3, _b2, _c2;
      const f = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return f ? (_a(f, Ie), za(f, Ie), true) : false;
    };
    if (i()) return;
    const c = window.setTimeout(i, 50), d = window.setTimeout(i, 250);
    return () => {
      window.clearTimeout(c), window.clearTimeout(d);
    };
  }, [Ie]), l.useEffect(() => {
    if (!L) {
      Ut(null);
      return;
    }
    const i = A.current;
    if (!i) return;
    const c = () => {
      const u = i.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
      Ut((f) => f === u ? f : u);
    };
    c();
    const d = new MutationObserver(c);
    return d.observe(i, { childList: true, subtree: true }), () => d.disconnect();
  }, [L]), l.useEffect(() => {
    const i = A.current;
    i && i.style.setProperty("--md-catalog-width", `${Xe}px`);
  }, [Xe]), l.useLayoutEffect(() => {
    if (!L || !pe) {
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
    const d = A.current;
    return d && c.observe(d), window.addEventListener("resize", i), window.addEventListener("scroll", i, true), () => {
      c.disconnect(), window.removeEventListener("resize", i), window.removeEventListener("scroll", i, true);
    };
  }, [pe, Xe, L]), l.useEffect(() => {
    if (!(!L || !pe)) return Zi(pe, { getEditorRoot: () => A.current, mdHeadingId: (i) => B(i) });
  }, [pe, B, L]), zi(A, e, I, (a == null ? void 0 : a.id) ?? null, { enabled: L }), bs(A, { layoutKey: r, enabled: L }), l.useEffect(() => {
    if (!L) return;
    const i = A.current;
    if (!i || !e) return;
    let c = 0;
    const d = () => {
      fc(i, e, I);
    }, u = () => {
      const M = i.querySelectorAll("[data-note-cover-mount]");
      !M.length || !(i.querySelector(".md-note-cover-placeholder--pending") || [...M].some((Z) => Z.childNodes.length === 0)) || c || (c = window.requestAnimationFrame(() => {
        c = 0, d();
      }));
    }, b = [0, 80, 280, 600, 1100, 2e3].map((M) => setTimeout(d, M)), h = i.querySelector(".md-editor-preview") || i, v = typeof MutationObserver < "u" ? new MutationObserver(u) : null;
    return v == null ? void 0 : v.observe(h, { childList: true, subtree: true }), () => {
      c && window.cancelAnimationFrame(c), b.forEach((M) => clearTimeout(M)), v == null ? void 0 : v.disconnect();
    };
  }, [e, I, a == null ? void 0 : a.id, L]), l.useEffect(() => {
    const i = A.current;
    return () => {
      mc(i);
    };
  }, []), l.useEffect(() => {
    if (s) return;
    const i = Ga(a), c = () => {
      var _a3, _b2, _c2;
      const f = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return f ? (ec(f, i), true) : false;
    };
    if (c()) return;
    const d = [50, 200, 500, 1e3].map((u) => setTimeout(c, u));
    return () => d.forEach((u) => clearTimeout(u));
  }, [a == null ? void 0 : a.id, a == null ? void 0 : a.type, s]), l.useEffect(() => {
    var _a3, _b2, _c2;
    if (s) return;
    const c = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    ws(c);
  }, [a == null ? void 0 : a.id, s]), l.useEffect(() => {
    if (s) return;
    let i = null, c = null;
    const d = () => {
      var _a3, _b2, _c2;
      const b = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return !b || b === c ? !!b : (i == null ? void 0 : i(), c = b, i = Is(b), true);
    };
    if (d()) return () => {
      i == null ? void 0 : i();
    };
    const u = [50, 200, 500, 1e3].map((f) => setTimeout(d, f));
    return () => {
      u.forEach((f) => clearTimeout(f)), i == null ? void 0 : i();
    };
  }, [s, a == null ? void 0 : a.id]), l.useEffect(() => {
    if (!L) return;
    const i = A.current;
    if (!i) return;
    const c = Cc(a), d = { current: [] };
    let u = false, f = null, b = null, h = [];
    const v = () => i.querySelector(".md-editor-preview"), M = () => {
      if (u) return;
      const $ = v();
      if (!$ || !wc($)) return;
      const de = kc($, { collapsedIds: d.current, onCollapsedChange: (P) => {
        d.current = P, c && Nc(c, P);
      } }), E = f;
      f = () => {
        E == null ? void 0 : E(), de();
      };
    }, O = ($) => {
      !$ || b || typeof MutationObserver > "u" || (b = new MutationObserver(M), b.observe($, { childList: true, subtree: true }));
    };
    return (async () => {
      if (c) {
        const $ = await Sc(c);
        if (u) return;
        $ && (d.current = $);
      }
      u || (O(v()), M(), h = [80, 250, 600].map(($) => setTimeout(() => {
        u || (O(v()), M());
      }, $)));
    })(), () => {
      u = true, h.forEach(($) => clearTimeout($)), b == null ? void 0 : b.disconnect(), b = null, f == null ? void 0 : f(), f = null;
    };
  }, [a == null ? void 0 : a.id, a == null ? void 0 : a.type, L]), l.useEffect(() => {
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
    if (s || ue || !L) return;
    const i = A.current;
    if (!i) return;
    const c = () => i.querySelector(".md-editor-preview"), d = () => ae;
    let u = null;
    const f = (E) => E instanceof Element ? Et(E) ? true : !!E.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, b = (E) => {
      var _a3, _b2, _c2, _d, _e2, _f;
      const P = c();
      if (!P || _e(P)) return;
      if (!d()) {
        const q = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window);
        (q == null ? void 0 : q.rangeCount) && P.contains(q.getRangeAt(0).commonAncestorContainer) && !q.getRangeAt(0).collapsed ? St(P, { allowCollapsed: false }) : He(P);
        return;
      }
      const Q = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
      if (!Q || Q.rangeCount === 0) {
        if (!(E instanceof Element) || !E.closest("td, th")) return;
      } else {
        const q = Q.getRangeAt(0);
        if (!P.contains(q.commonAncestorContainer) && !(E instanceof Element && E.closest("td, th"))) return;
      }
      const Y = (_e2 = (_d = ((_c2 = x.current) == null ? void 0 : _c2.value) ?? x.current) == null ? void 0 : _d.getEditorView) == null ? void 0 : _e2.call(_d);
      Y && ((Q == null ? void 0 : Q.rangeCount) && P.contains(Q.getRangeAt(0).commonAncestorContainer) && St(P, { allowCollapsed: true }), hn(Y, P, { focus: true, target: E }), Nt(), (_f = X.current) == null ? void 0 : _f.schedule({ withRetries: true }));
    }, h = (E) => E.button === 2 || E.button === 0 && E.ctrlKey, v = (E, P) => gn(P, E.clientX, E.clientY) ? true : xn(E.clientX, E.clientY) ? $s(P) : false, M = (E) => {
      var _a3, _b2, _c2, _d;
      const P = c();
      if (!P) return;
      const Q = E.target;
      if (!(Q instanceof Node)) return;
      if (P.contains(Q) && h(E)) {
        v(E, P);
        return;
      }
      if (P.contains(Q)) {
        u = { x: E.clientX, y: E.clientY }, !Et(Q) && !d() && He(P);
        return;
      }
      if (u = null, (_d = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d.dom.contains(Q)) {
        if (h(E)) return;
        jt(), d() || He(P);
      }
    }, O = (E) => {
      const P = c();
      !P || !(E.target instanceof Node) || !P.contains(E.target) || v(E, P);
    }, Z = (E) => {
      var _a3, _b2, _c2;
      if (h(E)) return;
      const P = c();
      if (!(!P || !(E.target instanceof Node) || !P.contains(E.target)) && !f(E.target)) {
        if (Ct(i)) {
          const Q = !!(u && Math.hypot(E.clientX - u.x, E.clientY - u.y) > 6);
          if (u = null, !d() || Q) return;
          const Y = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), q = E.target instanceof Element ? mn(E.target, P) : null;
          Y && q && (Nt(), pn(q, Y, P, E.clientX, E.clientY));
          return;
        }
        u = null, requestAnimationFrame(() => b(E.target));
      }
    }, $ = (E) => {
      var _a3, _b2, _c2, _d;
      const P = c();
      if (!(!P || !(E.target instanceof Node) || !P.contains(E.target)) && !f(E.target)) {
        if (Ct(i)) {
          if (!d()) return;
          const me = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), Y = (_d = E.changedTouches) == null ? void 0 : _d[0], q = E.target instanceof Element ? mn(E.target, P) : null;
          me && q && Y && (Nt(), pn(q, me, P, Y.clientX, Y.clientY));
          return;
        }
        requestAnimationFrame(() => b(E.target));
      }
    }, de = (E) => {
      var _a3, _b2, _c2, _d, _e2;
      if (!d() || E.isComposing || E.keyCode === 229 || E.key === "Process" || (E.metaKey || E.ctrlKey) && (E.key === "s" || E.key === "S" || E.code === "KeyS") || Et(E.target)) return;
      const P = c();
      if (!P || _e(P) || Ct(i)) return;
      const Q = E.target, me = Q instanceof Node && P.contains(Q), Y = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), q = (Y == null ? void 0 : Y.rangeCount) > 0 && P.contains(Y.getRangeAt(0).commonAncestorContainer);
      if (!me && !q) return;
      const Ce = (_d = (_c2 = ((_b2 = x.current) == null ? void 0 : _b2.value) ?? x.current) == null ? void 0 : _c2.getEditorView) == null ? void 0 : _d.call(_c2);
      Ce && (Ce.hasFocus || (q ? (St(P, { allowCollapsed: true }), hn(Ce, P, { focus: true }), (_e2 = X.current) == null ? void 0 : _e2.schedule({ withRetries: true })) : Ce.focus()));
    };
    return i.addEventListener("mousedown", M, true), i.addEventListener("contextmenu", O, true), i.addEventListener("mouseup", Z), i.addEventListener("touchend", $, { passive: true }), i.addEventListener("keydown", de, true), () => {
      He(c()), i.removeEventListener("mousedown", M, true), i.removeEventListener("contextmenu", O, true), i.removeEventListener("mouseup", Z), i.removeEventListener("touchend", $), i.removeEventListener("keydown", de, true);
    };
  }, [s, ae, ue, L]), l.useEffect(() => {
    var _a3, _b2, _c2, _d;
    if (s || !L) {
      (_a3 = ee.current) == null ? void 0 : _a3.stop(), ee.current = null, (_b2 = X.current) == null ? void 0 : _b2.stop(), X.current = null, jt();
      return;
    }
    const i = A.current, c = () => {
      var _a4;
      return (_a4 = i ?? A.current) == null ? void 0 : _a4.querySelector(".md-editor-preview");
    }, d = () => {
      var _a4, _b3, _c3;
      return (_c3 = (_b3 = ((_a4 = x.current) == null ? void 0 : _a4.value) ?? x.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c3.call(_b3);
    };
    (_c2 = ee.current) == null ? void 0 : _c2.stop();
    const u = Bc({ getPreviewRoot: c, getView: d });
    ee.current = u, (_d = X.current) == null ? void 0 : _d.stop(), X.current = null, ae ? X.current = Lc({ getPreviewRoot: c, getView: d }) : jt();
    const f = Mc((b, h) => {
      var _a4;
      const v = d();
      !v || b !== v || (u.schedule({ withRetries: h.docChanged }), ae && ((_a4 = X.current) == null ? void 0 : _a4.schedule({ withRetries: h.docChanged })));
    });
    return () => {
      var _a4, _b3;
      f(), (_a4 = X.current) == null ? void 0 : _a4.stop(), X.current = null, (_b3 = ee.current) == null ? void 0 : _b3.stop(), ee.current = null;
    };
  }, [s, ae, L]), l.useEffect(() => {
    if (s || ue || !ae || !L) {
      ys();
      return;
    }
    const i = A.current;
    if (i) return vs(i, { getPreviewRoot: () => i.querySelector(".md-editor-preview"), getView: () => {
      var _a3, _b2, _c2;
      return (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    }, isEnabled: () => ae && L });
  }, [s, ae, ue, L]), l.useEffect(() => {
    var _a3, _b2, _c2;
    const c = (_a3 = A.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
    if (ks(), !!c && ((_b2 = ee.current) == null ? void 0 : _b2.schedule({ withRetries: true }), !ue)) {
      if (ae && !_e(c)) {
        (_c2 = X.current) == null ? void 0 : _c2.schedule({ withRetries: true });
        return;
      }
      ae || He(c);
    }
  }, [e, a == null ? void 0 : a.id, ae, ue]), l.useEffect(() => {
    if (s) return;
    const i = () => {
      var _a3;
      const c = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current;
      return (c == null ? void 0 : c.domEventHandlers) ? (c.domEventHandlers({ paste: (d, u) => {
        const f = d.clipboardData;
        if (!f || !u) return;
        const b = jc(f);
        if (b.length && typeof p == "function") {
          if (g) return d.preventDefault(), false;
          d.preventDefault();
          const v = u;
          return p(b).then((M) => {
            var _a4, _b2, _c2;
            if (!(M == null ? void 0 : M.length)) return;
            const O = M.map((de) => `![[${de}]]`).join(`
`), $ = ((_c2 = (_b2 = ((_a4 = x.current) == null ? void 0 : _a4.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? v;
            $ && $.dispatch($.state.replaceSelection(O));
          }), false;
        }
        const h = f.getData("text/plain") ?? "";
        if (h) return d.preventDefault(), u.dispatch(u.state.replaceSelection(h)), false;
      }, keydown: (d, u) => {
        var _a4;
        if (!u) return;
        if (vi(d, u)) return d.preventDefault(), d.stopPropagation(), true;
        const f = Gn(d);
        if (!f) return;
        if (f === "mod+shift+enter") return d.preventDefault(), d.stopPropagation(), rl(u), false;
        if (f === "mod+s") return;
        const h = ((_a4 = J.current) == null ? void 0 : _a4.snippets) || [], v = rt(f), M = h.find((O) => rt(O.prefix) === v && (O.body || "").trim());
        if (M) return d.preventDefault(), d.stopPropagation(), u.dispatch(u.state.replaceSelection(M.body)), false;
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
      const b = A.current, h = c.target;
      if (!(b == null ? void 0 : b.contains(h)) && !((_d = f.dom) == null ? void 0 : _d.contains(h))) return;
      const M = ((_e2 = J.current) == null ? void 0 : _e2.snippets) || [], O = rt(d), Z = M.find(($) => rt($.prefix) === O && ($.body || "").trim());
      Z && (c.preventDefault(), c.stopPropagation(), (_f = c.stopImmediatePropagation) == null ? void 0 : _f.call(c), f.dispatch(f.state.replaceSelection(Z.body)));
    };
    return document.addEventListener("keydown", i, true), () => document.removeEventListener("keydown", i, true);
  }, [s, N]), l.useEffect(() => {
    if (typeof n != "function") return;
    const i = (c) => {
      var _a3, _b2, _c2, _d, _e2;
      if (!(c.ctrlKey || c.metaKey) || c.altKey || c.key !== "s" && c.key !== "S" && c.code !== "KeyS") return;
      const d = A.current;
      if (!d) return;
      const u = c.target, f = u instanceof Node && d.contains(u), b = d.querySelector(".md-editor-preview"), h = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), v = !!(b && (h == null ? void 0 : h.rangeCount) && b.contains(h.getRangeAt(0).commonAncestorContainer));
      if (!f && !v && !_e(b)) return;
      c.preventDefault(), c.stopPropagation(), (_b2 = c.stopImmediatePropagation) == null ? void 0 : _b2.call(c);
      const O = (_e2 = (_d = ((_c2 = x.current) == null ? void 0 : _c2.value) ?? x.current) == null ? void 0 : _d.getEditorView) == null ? void 0 : _e2.call(_d);
      Fs(O), n();
    };
    return document.addEventListener("keydown", i, true), () => document.removeEventListener("keydown", i, true);
  }, [n]), l.useEffect(() => {
    const i = A.current;
    if (!i) return;
    const c = (d) => {
      var _a3, _b2, _c2, _d, _e2, _f, _g, _h, _i2;
      const u = i.querySelector(".md-editor-preview"), f = (_b2 = (_a3 = d.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "table");
      if (f && u && u.contains(f) || u && (gn(u, d.clientX, d.clientY) || xn(d.clientX, d.clientY))) return;
      const b = (_d = (_c2 = d.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, ".cm-editor");
      if (b && i.contains(b)) {
        const Z = (_g = (_f = ((_e2 = x.current) == null ? void 0 : _e2.value) ?? x.current) == null ? void 0 : _f.getEditorView) == null ? void 0 : _g.call(_f);
        if (Z) {
          const { from: $, to: de } = Z.state.selection.main, E = U.current ?? "";
          if (Hs(E, $, de)) {
            d.preventDefault(), Te.current($, de);
            return;
          }
        }
      }
      const h = (_i2 = (_h = d.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
      if (!h || !i.contains(h)) return;
      const v = _s(h);
      if (!v.kind || !v.key) return;
      d.preventDefault();
      const M = v.kind === "wiki" ? Os(i, h, v.key) : Bs(i, h, v.key);
      ge({ kind: v.kind, key: v.key, width: v.width, height: v.height, occurrence: M, imageSrc: h.currentSrc || h.src || "" });
    };
    return i.addEventListener("contextmenu", c), () => i.removeEventListener("contextmenu", c);
  }, [_]), l.useEffect(() => {
    const i = A.current;
    if (!i) return;
    const c = (d) => {
      var _a3, _b2, _c2, _d;
      if ((_b2 = (_a3 = d.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const u = i.querySelector(".md-editor-preview"), f = (_d = (_c2 = d.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, "table");
      if (!f || !u || !u.contains(f)) return;
      d.preventDefault(), d.stopPropagation(), he.current(f, u) || _({ title: "No table", message: "No haim-table found at this position. Click inside a table cell and try again." });
    };
    return i.addEventListener("dblclick", c, true), () => i.removeEventListener("dblclick", c, true);
  }, [_]), l.useEffect(() => {
    const i = A.current;
    if (i) return _i(i);
  }, []), l.useEffect(() => {
    const i = () => {
      Pe((c) => c + 1);
    };
    return window.addEventListener(dn, i), () => {
      window.removeEventListener(dn, i);
    };
  }, []), l.useEffect(() => {
    const i = A.current;
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
        f.preventDefault(), f.stopPropagation(), F(Vs({ id: h.getAttribute("data-chat-id") || "", href: h.getAttribute("data-chat-href") || h.getAttribute("href") || "" }));
        return;
      }
      const v = (_f = (_e2 = f.target) == null ? void 0 : _e2.closest) == null ? void 0 : _f.call(_e2, "a[href]");
      if (!v || !i.contains(v) || f.metaKey || f.ctrlKey || f.shiftKey || f.altKey || typeof f.button == "number" && f.button !== 0 || v.hasAttribute("data-md-footnote-to")) return;
      const M = v.getAttribute("href") || "", O = Ks(M, { currentViewPath: (a == null ? void 0 : a.type) ? a.id : null });
      if (O.kind !== "app") return;
      if (f.preventDefault(), f.stopPropagation(), O.viewPath && typeof T == "function") {
        T(O.viewPath);
        return;
      }
      const Z = O.search || "", $ = O.hash || "";
      F(`${O.pathname || "/"}${Z}${$}`);
    }, u = (f) => {
      var _a3, _b2;
      if (f.key !== "Enter" && f.key !== " ") return;
      const b = (_b2 = (_a3 = f.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      !b || !i.contains(b) || (f.preventDefault(), f.stopPropagation(), c(b));
    };
    return i.addEventListener("click", d), i.addEventListener("keydown", u), () => {
      i.removeEventListener("click", d), i.removeEventListener("keydown", u);
    };
  }, [F, a == null ? void 0 : a.id, a == null ? void 0 : a.type, T]);
  const $r = l.useCallback(({ width: i, height: c }) => {
    const d = z;
    if (!(d == null ? void 0 : d.key) || typeof K != "function") return;
    const u = d.kind === "wiki" ? vt(e, { path: d.key, occurrence: d.occurrence ?? 0, width: i, height: c }) : kt(e, { src: d.key, occurrence: d.occurrence ?? 0, width: i, height: c });
    u.updated && u.markdown !== e && K(u.markdown);
  }, [z, K, e]), zr = l.useCallback(async ({ file: i }) => {
    var _a3;
    const c = z;
    if (!(c == null ? void 0 : c.key) || typeof p != "function") throw new Error("Upload handler not available.");
    const u = (_a3 = await p([i])) == null ? void 0 : _a3[0];
    if (!u) throw new Error("Upload succeeded but no path was returned.");
    if (typeof K != "function") return;
    const f = c.kind === "wiki" ? Es(e, { path: c.key, occurrence: c.occurrence ?? 0, nextPath: u }) : un(e, { src: c.key, occurrence: c.occurrence ?? 0, nextPath: u });
    f.updated && f.markdown !== e && K(f.markdown);
  }, [K, p, e, z]), qr = l.useCallback(async ({ width: i, height: c }) => {
    var _a3;
    const d = z;
    if (!(d == null ? void 0 : d.key) || d.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
    if (typeof K != "function") throw new Error("Cannot apply change.");
    const u = await Cs({ markdownSrc: d.key, displaySrc: d.imageSrc, currentNotePath: (a == null ? void 0 : a.id) ?? null });
    let f = "";
    if (u.mode === "path") f = u.path;
    else {
      if (typeof p != "function") throw new Error("Upload handler not available.");
      if (f = ((_a3 = await p([u.file])) == null ? void 0 : _a3[0]) || "", !f) throw new Error("Upload succeeded but no path was returned.");
    }
    const b = un(e, { src: d.key, occurrence: d.occurrence ?? 0, nextPath: f, width: i, height: c });
    b.updated && b.markdown !== e && K(b.markdown);
  }, [a == null ? void 0 : a.id, K, p, e, z]), Wr = l.useCallback(async ({ width: i, height: c }) => {
    const d = z;
    if (!(d == null ? void 0 : d.key) || !(d == null ? void 0 : d.kind)) throw new Error("Cannot convert: image target is missing.");
    if (typeof K != "function") throw new Error("Cannot apply change.");
    const u = typeof k == "function" ? String(await Promise.resolve(k()) || "").trim() : "";
    if (!u) throw new Error("ImgBB API key is missing. Please add it in settings.");
    const f = Ss({ path: d.key, imageSrc: d.imageSrc });
    if (!f) throw new Error("Cannot determine image source URL for upload.");
    const h = (await Ns({ apiKey: u, image: f, name: js(d.key) ? "image" : void 0 })).url, v = d.occurrence ?? 0;
    let M = e;
    const O = d.kind === "wiki" ? vt(M, { path: d.key, occurrence: v, width: i, height: c }) : kt(M, { src: d.key, occurrence: v, width: i, height: c });
    O.updated && (M = O.markdown);
    const Z = await Ms(M, { kind: d.kind === "wiki" ? "wiki" : "markdown", key: d.key, occurrence: v }, h);
    if (!Z.updated && M === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
    K(Z.markdown);
  }, [k, K, e, z]);
  l.useEffect(() => {
    if (typeof H == "function") return H(async () => {
      if (s) throw new Error("Cannot convert images in preview-only mode.");
      if (typeof K != "function") throw new Error("Cannot apply change.");
      if (!Rs(e)) return { markdown: e, converted: 0, failed: [] };
      const i = await Ts(e, { currentNotePath: (a == null ? void 0 : a.id) ?? null, uploadFiles: async (c) => {
        if (typeof p != "function") throw new Error("Upload handler not available.");
        return p(c);
      } });
      return i.markdown !== e && K(i.markdown), i;
    }), () => H(null);
  }, [a == null ? void 0 : a.id, K, H, p, s, e]);
  const be = l.useCallback((i) => {
    const c = A.current;
    if (!c || !(i == null ? void 0 : i.kind) || !(i == null ? void 0 : i.key)) return null;
    const d = i.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...c.querySelectorAll(d)].filter((b) => (i.kind === "wiki" ? b.getAttribute("data-wiki-path") : b.getAttribute("data-md-src")) === i.key)[i.occurrence ?? 0] ?? null;
  }, []), en = l.useCallback(({ kind: i, key: c, occurrence: d, widthPx: u, heightPx: f }) => {
    if (!c || typeof K != "function") return false;
    const b = Number.isFinite(u) ? `${Math.round(u)}px` : null, h = Number.isFinite(f) ? `${Math.round(f)}px` : null, v = i === "wiki" ? vt(e, { path: c, occurrence: d, width: b, height: h }) : kt(e, { src: c, occurrence: d, width: b, height: h });
    return v.updated && v.markdown !== e ? (K(v.markdown), true) : false;
  }, [K, e]), Yr = l.useCallback(() => {
    const i = z;
    if (!(i == null ? void 0 : i.kind) || !(i == null ? void 0 : i.key)) return;
    const c = be(i);
    if (!c) return;
    const d = c.getBoundingClientRect(), u = Math.max(24, Math.round(d.width)), f = Math.max(24, Math.round(d.height)), b = { kind: i.kind, key: i.key, occurrence: i.occurrence ?? 0, widthPx: u, heightPx: f, originalWidthPx: u, originalHeightPx: f };
    c.style.width = `${u}px`, c.style.height = `${f}px`, xe.current = b, Le(b), Ee(false);
  }, [be, z]);
  l.useEffect(() => {
    if (!ie) {
      mt(null);
      return;
    }
    const i = be(ie);
    if (!i) {
      Le(null), mt(null);
      return;
    }
    let c = 0;
    const d = () => {
      const u = i.getBoundingClientRect();
      mt({ left: u.left, top: u.top, width: u.width, height: u.height }), c = requestAnimationFrame(d);
    };
    return c = requestAnimationFrame(d), () => cancelAnimationFrame(c);
  }, [ie, be]), l.useEffect(() => {
    if (!ie) return;
    const i = be(ie);
    if (!i) return;
    const c = (f) => {
      var _a3, _b2;
      const b = (_b2 = (_a3 = f.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!b) return;
      f.preventDefault();
      const h = b.getAttribute("data-transform-handle");
      if (!h) return;
      const v = f.pointerType === "touch", M = xe.current || ie, O = f.clientX, Z = f.clientY, $ = M.heightPx > 0 ? M.widthPx / M.heightPx : 1, de = (P) => {
        const Q = P.clientX - O, me = P.clientY - Z;
        let Y = M.widthPx, q = M.heightPx;
        if (h.includes("e") && (Y = M.widthPx + Q), h.includes("w") && (Y = M.widthPx - Q), h.includes("s") && (q = M.heightPx + me), h.includes("n") && (q = M.heightPx - me), Y = Math.max(24, Y), q = Math.max(24, q), v || P.shiftKey) {
          const to = Math.abs((Y - M.widthPx) / Math.max(1, M.widthPx)), no = Math.abs((q - M.heightPx) / Math.max(1, M.heightPx));
          to >= no ? q = Math.max(24, Y / Math.max(1e-4, $)) : Y = Math.max(24, q * $);
        }
        Y = Math.max(24, Math.round(Y)), q = Math.max(24, Math.round(q)), i.style.width = `${Y}px`, i.style.height = `${q}px`;
        const Ce = { ...xe.current || M, widthPx: Y, heightPx: q };
        xe.current = Ce, Le(Ce);
      }, E = () => {
        document.removeEventListener("pointermove", de, true), document.removeEventListener("pointerup", E, true);
      };
      document.addEventListener("pointermove", de, true), document.addEventListener("pointerup", E, true);
    }, d = (f) => {
      f.key === "Enter" && (f.preventDefault(), Ee(true));
    }, u = (f) => {
      var _a3, _b2, _c2, _d;
      const b = (_b2 = (_a3 = f.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), h = (_d = (_c2 = f.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, "img[data-wiki-path], img[data-md-src]");
      b || h === i || Ee(true);
    };
    return document.addEventListener("pointerdown", c, true), document.addEventListener("pointerdown", u, true), document.addEventListener("keydown", d, true), () => {
      document.removeEventListener("pointerdown", c, true), document.removeEventListener("pointerdown", u, true), document.removeEventListener("keydown", d, true);
    };
  }, [ie, be]);
  const Gr = l.useCallback(() => {
    const i = xe.current || ie;
    i && (en(i), Le(null), xe.current = null, Ee(false));
  }, [en, ie]), Ur = l.useCallback(() => {
    const i = xe.current || ie;
    if (!i) return;
    const c = be(i);
    c && (c.style.width = `${i.originalWidthPx}px`, c.style.height = `${i.originalHeightPx}px`), Le(null), xe.current = null, Ee(false);
  }, [be, ie]), Fe = l.useCallback((i) => {
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
  }, []), Ze = l.useCallback(async (i) => {
    if (!(i == null ? void 0 : i.length) || typeof p != "function" || g) return;
    const c = await p(i);
    (c == null ? void 0 : c.length) && Fe(`${c.map((d) => `![[${d}]]`).join(`
`)}
`);
  }, [Fe, g, p]);
  l.useEffect(() => {
    ye.current = Ze;
  }, [Ze]);
  const Xr = l.useCallback(async (i) => {
    var _a3;
    if (!i || typeof p != "function") throw new Error("Upload handler not available.");
    const d = (_a3 = await p([i])) == null ? void 0 : _a3[0];
    if (!d) throw new Error("Upload succeeded but no path was returned.");
    Fe(`![[${d}]]
`), Ye(null);
  }, [Fe, p]), Je = l.useCallback(() => {
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
    V.current = Je;
  }, [Je]);
  const Qr = l.useMemo(() => [o.jsx(da, { value: e, theme: r, currentFile: a, language: "ko-KR" }, "export-pdf"), o.jsx(ua, { editorRef: x }, "insert-pgbr"), o.jsx(fa, { onOpen: Je }, "heading-remap"), o.jsx(Ji, { active: !!(w == null ? void 0 : w.open), onToggle: () => {
    var _a3;
    (_a3 = w == null ? void 0 : w.toggleAssist) == null ? void 0 : _a3.call(w);
  } }, "llm-assist"), o.jsx(la, { onOpen: () => {
    se(true);
  } }, "checklist-progress"), o.jsx(wa, { checked: gt, onChange: Xt, theme: r }, "toc-title-wrap"), o.jsx(ya, { checked: Ie, onChange: Qt, theme: r }, "base64-image-fold"), o.jsx(va, { checked: Zt, onChange: Jt, theme: r }, "editor-autocomplete"), ue ? null : o.jsx(ka, { checked: ae, onChange: Ue, theme: r }, "mirror-edit"), o.jsx(Ea, { disabled: typeof p != "function", onRequestLink: () => ke(true), onRequestUpload: (i) => {
    Ze(i);
  }, onRequestClip: (i) => Ye(i) }, "image-toolbar")], [e, r, a, gt, Xt, Ie, Qt, Zt, Jt, ue, ae, Ue, p, Ze, Je, w == null ? void 0 : w.open, w == null ? void 0 : w.toggleAssist]), Zr = l.useMemo(() => ["bold", "underline", "italic", "-", "strikeThrough", "sub", "sup", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", 9, "table", "mermaid", "katex", 1, 2, 3, 4, "-", "revoke", "next", 0, "=", 6, 7, ...ue ? [] : [8], "pageFullscreen", "fullscreen", "previewOnly", "preview", "htmlPreview", ...pe ? [5] : [], "catalog"], [pe, ue]), Jr = l.useMemo(() => {
    if (typeof p == "function") return async (i, c) => {
      if (g) return;
      const d = await p(i);
      (d == null ? void 0 : d.length) && c(d.map((u) => `![[${u}]]`));
    };
  }, [p, g]);
  return o.jsxs("div", { ref: A, className: `h-full w-full flex flex-col relative${gt ? " toc-titles-wrap" : ""}${L ? "" : " pointer-events-none"}`, style: { "--md-catalog-width": `${Xe}px`, ...Kr }, ...L ? {} : { inert: true }, "aria-hidden": L ? void 0 : true, children: [(Qe == null ? void 0 : Qe.webfontCss) ? o.jsx("style", { "data-s3haim-document-webfonts": "1", children: Qe.webfontCss }) : null, Ge && oo.createPortal(o.jsx(As, { handleProps: Vr, isResizing: Br, visibleOnHover: true, label: "TOC resize handle", style: { position: "fixed", top: Ge.top, left: Ge.left, height: Ge.height, bottom: "auto", zIndex: 10003 } }), document.body), g && o.jsxs("div", { className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20", "aria-live": "polite", children: [o.jsx(ci, { size: 16, className: "animate-spin shrink-0" }), o.jsxs("span", { children: ["Uploading image... ", Math.max(0, Math.min(100, Math.round(C))), "%"] }), typeof y == "function" && o.jsx("button", { type: "button", onClick: y, className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950", children: "Cancel" })] }), o.jsx(ho, { ref: x, id: ce, modelValue: e, onChange: K, mdHeadingId: B, className: "h-full! max-h-dvh", theme: r, language: "ko-KR", codeTheme: Ls, customIcon: Ps, previewOnly: s, noMermaid: true, autoDetectCode: true, scrollAuto: false, footers: ["markdownTotal"], toolbars: Zr, defToolbars: Qr, onUploadImg: Jr }, `footnotes-${ve}`), o.jsx(yi, { containerRef: A }), o.jsx(Oi, { containerRef: A }), o.jsx(Bi, { isOpen: !!z, onClose: () => ge(null), path: (z == null ? void 0 : z.key) ?? "", kind: (z == null ? void 0 : z.kind) ?? "wiki", initialWidth: (z == null ? void 0 : z.width) ?? "", initialHeight: (z == null ? void 0 : z.height) ?? "", imageSrc: (z == null ? void 0 : z.imageSrc) ?? "", onApply: $r, onStartFreeTransform: Yr, onCrop: zr, onConvertToWiki: qr, onConvertToImgbb: Wr }, z ? `${z.kind}|${z.key}|${z.width ?? ""}|${z.height ?? ""}|${z.occurrence ?? 0}` : "wiki-image-size-modal"), o.jsx(Ca, { isOpen: qe, onClose: () => ke(false), onConfirm: ({ desc: i, url: c }) => {
    Fe(`![${i || ""}](${c})
`);
  } }), o.jsx(Sa, { isOpen: ut, onClose: () => We(false), onConfirm: ({ line1: i, line2: c }) => {
    var _a3, _b2, _c2, _d, _e2;
    const u = (_c2 = (_b2 = ((_a3 = x.current) == null ? void 0 : _a3.value) ?? x.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), f = (u == null ? void 0 : u.state.doc.toString()) ?? U.current ?? "", { from: b, to: h } = Yt.current, v = Ds(f, b, h, i, c);
    u && (u.dispatch({ changes: { from: 0, to: u.state.doc.length, insert: v.next }, selection: { anchor: v.caret }, scrollIntoView: true }), (_d = u.focus) == null ? void 0 : _d.call(u)), (_e2 = ft.current) == null ? void 0 : _e2.call(ft, v.next);
  } }), o.jsx(Na, { isOpen: !!Gt, file: Gt, onClose: () => Ye(null), onConfirm: Xr }), o.jsx(Vi, { isOpen: oe.isOpen, initialMeta: ((_a2 = oe.editState) == null ? void 0 : _a2.meta) ?? null, initialGrid: ((_b = oe.editState) == null ? void 0 : _b.grid) ?? { rows: [[""]], aligns: [null] }, onClose: oe.close, onSave: oe.apply }), o.jsx(Ki, { containerRef: A, getMarkdown: () => U.current ?? "", setMarkdown: (i) => {
    typeof K == "function" ? K(i) : typeof t == "function" && t(i);
  }, onEditTable: (i, c) => he.current(i, c), onEditFailed: () => {
    _({ title: "? ??", message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???." });
  } }), o.jsx($i, { containerRef: A, getMarkdown: () => U.current ?? "", setMarkdown: (i) => {
    typeof K == "function" && K(i);
  }, enabled: !oe.isOpen }), ie && De && o.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500", style: { left: `${De.left}px`, top: `${De.top}px`, width: `${De.width}px`, height: `${De.height}px` }, children: ["nw", "ne", "sw", "se"].map((i) => o.jsx("button", { type: "button", "data-transform-handle": i, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: i.includes("w") ? "-7px" : "auto", right: i.includes("e") ? "-7px" : "auto", top: i.includes("n") ? "-7px" : "auto", bottom: i.includes("s") ? "-7px" : "auto", cursor: i === "nw" || i === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${i}` }, i)) }), ie && o.jsxs("button", { type: "button", onClick: () => Ee(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm", children: [o.jsx("span", { className: "block font-semibold mb-1", children: "Free transform guide" }), o.jsx("span", { className: "block", children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio" }), o.jsx("span", { className: "block", children: "- Touch drag: keeps aspect ratio" }), o.jsx("span", { className: "block", children: "- Click elsewhere (including this banner): confirm transform" })] }), o.jsx(fn, { isOpen: _r, title: "Cover export", message: "You need to open the Export PDF page to export the cover. Continue?", confirmLabel: "Continue", cancelLabel: "Cancel", onConfirm: () => {
    pt(false), Re({ openCoverEdit: true });
  }, onCancel: () => pt(false) }), o.jsx(fn, { isOpen: Hr, title: "Save transform", message: "How would you like to handle the current transform?", confirmLabel: "Apply", cancelLabel: "Keep editing", discardLabel: "Reset transform", onConfirm: Gr, onCancel: () => Ee(false), onDiscard: Ur }), o.jsx(ba, { isOpen: ze, markdown: e, selectedMarkdown: (R == null ? void 0 : R.text) ?? "", onClose: () => {
    Ae(false), S(null);
  }, onApply: (i, c) => {
    if (c === "selection" && R) {
      const { from: d, to: u } = R, f = U.current ?? e, b = `${f.slice(0, d)}${i}${f.slice(u)}`;
      b !== f && K(b);
    } else i !== e && K(i);
    Ae(false), S(null);
  } }), o.jsx(ia, { editorRef: x, onChange: K, open: G, onOpenChange: se })] });
}
export {
  vl as default
};
