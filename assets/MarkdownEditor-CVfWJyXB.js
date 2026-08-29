var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { j as o, r as l, u as Jn, c as mo, a as po } from "./vendor-react-BFxggocB.js";
import { A as ho, B as Bt, S as er, l as Ke, D as tr, F as rn, W as go, G as nr, H as Ye, J as Se, M as rr, j as Ot, V as Vt, O as or, m as ce, P as xo, Q as bo, R as wo, T as yo, U as vo, X as kt, Y as on, Z as ko, $ as Eo, c as So, a0 as Co, a1 as sr, v as No, a2 as jo, a3 as Mo, K as Lo, a4 as To, a5 as Ro, a6 as Ao, a7 as Po, a8 as Do, a9 as Io, aa as Fo, ab as $o, ac as Ho, ad as _o, ae as Bo, af as Oo, ag as Vo, ah as Ko, ai as zo, aj as qo, ak as Wo, al as Yo, am as Uo, an as Go } from "./vendor-md-editor-BhV_TtV2.js";
import { b0 as Le, c$ as sn, d0 as Xo, al as ir, am as ar, d1 as an, d2 as Qo, a7 as mt, ah as Zo, d3 as cn, D as ln, d4 as Jo, d5 as es, d6 as ts, d7 as dn, d8 as cr, d9 as ns, da as rs, db as os, dc as ss, dd as is, de as lr, df as as, dg as Kt, ab as zt, dh as cs, di as ls, dj as ds, dk as us, dl as fs, dm as ms, dn as dr, dp as Ve, dq as ps, dr as hs, ds as gs, dt as xs, du as bs, dv as ur, dw as ws, dx as ys, dy as un, dz as vs, dA as ks, A as Es, dB as Ss, dC as st, dD as Cs, dE as Ns, dF as Oe, dG as js, dH as Ms, dI as Ls, cw as fn, ap as Et, dJ as St, aq as Ts, dK as mn, dL as Rs, ar as As, as as Ps, ad as Ds, at as Is, an as Fs, ao as $s, T as Hs, M as _s, dM as Bs, dN as Os, aP as pn, dO as Vs, dP as Ct, dQ as Nt, dR as hn, dS as gn, dT as jt, dU as xn, dV as Ks, dW as bn, dX as wn, aY as zs, dY as qs, av as Ws, dZ as Ys, d_ as Us, d$ as Gs, e0 as Xs, e1 as Qs, e2 as yn, e3 as be, e4 as Zs, e5 as Mt, e6 as Lt, co as Js } from "./index-D0f64dRg.js";
import { S as ei, ac as ti, ad as vn, ae as Tt, af as Rt, ag as ni, c as ri, ah as qt, ai as oi, a9 as fr, aj as si, a4 as ii, X as Wt, y as ai, ak as ci, al as li, k as Yt, am as di, an as ui, a0 as fi, ao as mi, D as pi, L as hi } from "./vendor-lucide-xJOxFrAB.js";
import { b as gi, M as At, N as Pt, U as xi, V as bi, W as wi, X as yi, Y as vi, Z as ki, _ as Ei, $ as Si, a0 as Ci, a1 as Ni, S as mr, g as pr, d as kn, T as En, e as Sn, f as Cn, A as Nn } from "./vendor-radix-D1IYqH78.js";
import { M as ji } from "./MdEditorToolbarTooltips-eHet59CZ.js";
import { C as Mi, u as Li, b as Ti, P as Ri, T as Ai, a as Pi, H as Di } from "./previewFootnoteScroll-DvKmMk6d.js";
import { N as Ii, u as Fi, W as $i } from "./useTocTitleWrap-Bjaaaqx3.js";
import { a as pt } from "./vendor-motion-b8oTnHK_.js";
import { c as Hi } from "./clipboardImageFiles-iv1hSQFE.js";
import { u as _i } from "./useWikiImageHydration-C3CtgYzh.js";
import "./vendor-aws-CqSEirea.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-DGp6lEvQ.js";
import "./TableStyleTemplateEditor-dFgObRVb.js";
import "./index-moa0c9-p.js";
import "./vendor-image-crop-2jwX4VUM.js";
import "./cropPadImage-B2zG3zti.js";
import "./storageImageHydration-DtsOH3MW.js";
function Bi(e) {
  return String(e || "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "doc";
}
function Oi(e) {
  return `md-ed-${Bi(e)}`;
}
function Vi(e) {
  const t = `${e}-h`;
  return (n, r, i) => {
    const s = Number.isInteger(i) ? i : 0, u = typeof n == "object" && n !== null ? Number(n.index) : NaN, f = Number.isInteger(u) ? u : s;
    return `${t}-${f}`;
  };
}
const jn = ".md-editor-catalog-link", Ki = "md-preview-heading-folded", Mn = "md-preview-heading-section-hidden", zi = 2;
function qi(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Wi(e) {
  for (let t = 0; t < 8; t += 1) {
    const n = getComputedStyle(e);
    if (!(e.classList.contains(Mn) || e.hasAttribute("hidden") || n.display === "none")) break;
    let i = false, s = e;
    for (; s && !i; ) {
      if (s instanceof HTMLElement && (s.classList.contains(Mn) || s.hasAttribute("hidden"))) {
        let f = s.previousElementSibling;
        for (; f; ) {
          if (f instanceof HTMLElement && f.classList.contains(Ki)) {
            const x = f.querySelector(":scope > .md-preview-heading-fold-chevron");
            x instanceof HTMLButtonElement && (x.click(), i = true);
            break;
          }
          f = f.previousElementSibling;
        }
      }
      s = s.parentElement;
    }
    if (!i) break;
  }
}
function Yi(e, t) {
  const n = (r) => {
    var _a2;
    if (r.button !== 0) return;
    const i = r.target;
    if (!(i instanceof Element)) return;
    const s = i.closest(jn);
    if (!(s instanceof HTMLElement) || !e.contains(s)) return;
    const f = Array.from(e.querySelectorAll(jn)).indexOf(s);
    if (f < 0) return;
    const x = t.mdHeadingId({ index: f + 1 }), k = t.getEditorRoot(), w = ((_a2 = k == null ? void 0 : k.querySelector) == null ? void 0 : _a2.call(k, `#${CSS.escape(x)}`)) ?? null;
    if (!w || k && !k.contains(w)) return;
    r.preventDefault(), r.stopPropagation(), typeof r.stopImmediatePropagation == "function" && r.stopImmediatePropagation(), Wi(w);
    const A = Le(w);
    if (!A) {
      w.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const N = w.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(w).marginBlockStart || "0") || 0, L = qi(w, A) - zi - N;
    A.scrollTo({ top: Math.max(0, L), behavior: "smooth" });
  };
  return e.addEventListener("click", n, true), () => {
    e.removeEventListener("click", n, true);
  };
}
function Ui({ onToggle: e, active: t = false }) {
  return o.jsx("button", { type: "button", className: ["md-editor-toolbar-item", t ? "md-editor-toolbar-active bg-violet-200! hover:bg-violet-300! dark:bg-violet-800/85! dark:hover:bg-violet-700/90!" : ""].filter(Boolean).join(" "), onClick: () => e == null ? void 0 : e(), title: t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-label": t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-pressed": t, children: o.jsx(ei, { className: "md-editor-icon", size: 16 }) });
}
function Gi(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let r = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, i = 0, s = 0;
  t.forEach((f, x) => {
    const k = f.match(/^(#{1,6})\s+(.*)/);
    if (k) {
      (r.tasks.length > 0 || r.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(r), r = { name: k[2].trim(), tasks: [] };
      return;
    }
    const w = f.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
    if (w) {
      const A = Math.floor(w[1].length / 2), N = w[3].toLowerCase() === "x", L = w[4].trim();
      i += 1, N && (s += 1), r.tasks.push({ id: `line-${x}`, lineIndex: x, indent: A, completed: N, text: L, rawLine: f });
    }
  }), r.tasks.length > 0 && n.push(r);
  const u = i > 0 ? Math.round(s / i * 100) : 0;
  return { categories: n, totalTasks: i, completedTasks: s, pendingTasks: i - s, percentage: u };
}
function Xi(e, t) {
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
function Qi({ markdown: e = "", onMarkdownChange: t }) {
  const [n, r] = l.useState(""), [i, s] = l.useState("all"), [u, f] = l.useState({}), [x, k] = l.useState("dashboard"), w = l.useMemo(() => Gi(e), [e]);
  l.useEffect(() => {
    const E = {};
    w.categories.forEach((T) => {
      E[T.name] = true;
    }), f(E);
  }, [w.categories.length]);
  const A = (E) => {
    typeof t == "function" && t(Xi(e, E));
  }, N = (E) => {
    f((T) => ({ ...T, [E]: !T[E] }));
  }, L = (E) => {
    const T = E.text.toLowerCase().includes(n.toLowerCase()), F = i === "all" ? true : i === "completed" ? E.completed : !E.completed;
    return T && F;
  };
  return o.jsxs("div", { className: "space-y-3 text-xs text-slate-100", children: [o.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [o.jsxs("div", { className: "col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [o.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: o.jsx(ti, { className: "h-16 w-16 text-indigo-400" }) }), o.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), o.jsx("div", { className: "my-1.5 flex items-baseline gap-1", children: o.jsxs("span", { className: "text-3xl font-extrabold text-white", children: [w.percentage, "%"] }) }), o.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: o.jsx("div", { className: "h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${w.percentage}%` } }) })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), o.jsx(vn, { className: "h-3.5 w-3.5 text-slate-500" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [w.totalTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), o.jsx(Tt, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [w.completedTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), o.jsx(Rt, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [w.pendingTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), o.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [o.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [o.jsxs("button", { type: "button", onClick: () => k("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${x === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(ni, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), o.jsxs("button", { type: "button", onClick: () => k("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${x === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(vn, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), o.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [o.jsxs("div", { className: "relative min-w-[120px] flex-1", children: [o.jsx(ri, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), o.jsx("input", { type: "text", value: n, onChange: (E) => r(E.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), o.jsxs("select", { value: i, onChange: (E) => s(E.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [o.jsx("option", { value: "all", children: "\uC804\uCCB4" }), o.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), o.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), x === "dashboard" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: w.categories.length === 0 ? o.jsxs("div", { className: "py-8 text-center text-slate-500", children: [o.jsx(qt, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), o.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), o.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : w.categories.map((E, T) => {
    const F = E.tasks.length, H = E.tasks.filter((D) => D.completed).length, q = F > 0 ? Math.round(H / F * 100) : 0, z = !!u[E.name], y = E.tasks.filter(L);
    return n && y.length === 0 ? null : o.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [o.jsxs("button", { type: "button", onClick: () => N(E.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [o.jsx("span", { className: "shrink-0 text-slate-500", children: z ? o.jsx(oi, { className: "h-3.5 w-3.5" }) : o.jsx(fr, { className: "h-3.5 w-3.5" }) }), o.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: E.name })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [o.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [o.jsx("strong", { className: "text-slate-200", children: H }), " / ", F] }), o.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${q === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [q, "%"] })] })] }), z && o.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: y.length === 0 ? o.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : y.map((D) => o.jsxs("button", { type: "button", onClick: () => A(D.lineIndex), style: { paddingLeft: `${D.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [o.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: D.completed ? o.jsx(Tt, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Rt, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${D.completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: D.text })] }, D.id)) })] }, `${E.name}-${T}`);
  }) }), x === "checklist" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: w.categories.map((E, T) => {
    const F = E.tasks.filter(L);
    return F.length === 0 ? null : o.jsxs("div", { className: "space-y-1", children: [o.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [E.name, " (", F.length, ")"] }), F.map((H) => o.jsxs("button", { type: "button", onClick: () => A(H.lineIndex), style: { paddingLeft: `${H.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [o.jsx("span", { className: "mt-0.5 shrink-0", children: H.completed ? o.jsx(Tt, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Rt, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${H.completed ? "text-slate-500 line-through" : "text-slate-200"}`, children: H.text })] }, H.id))] }, `${E.name}-list-${T}`);
  }) })] })] });
}
const hr = "s3haim-checklist-progress-modal-position", Dt = { leftVw: 58, topVh: 14 };
function Zi() {
  try {
    const e = localStorage.getItem(hr);
    if (!e) return { ...Dt };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...Dt } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...Dt };
  }
}
function Ji({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(hr, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
const gr = "(max-width: 768px)", ea = 5;
function Ln() {
  return typeof window < "u" && window.matchMedia(gr).matches;
}
function ta({ editorRef: e, onChange: t, open: n, onOpenChange: r }) {
  const [i, s] = l.useState(() => Zi()), [u, f] = l.useState(""), [x, k] = l.useState({ from: 0, to: 0 }), w = l.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), A = l.useCallback(() => {
    const { text: T, from: F, to: H } = sn(e);
    return f(T), k({ from: F, to: H }), T;
  }, [e]);
  l.useEffect(() => {
    if (n) {
      if (Ln()) {
        r == null ? void 0 : r(false);
        return;
      }
      A();
    }
  }, [n, A, r]), l.useEffect(() => {
    if (!n) return;
    const T = window.matchMedia(gr), F = (H) => {
      H.matches && (r == null ? void 0 : r(false));
    };
    return T.addEventListener("change", F), () => T.removeEventListener("change", F);
  }, [n, r]);
  const N = l.useCallback((T) => {
    if (T.button !== 0) return;
    T.preventDefault();
    const F = T.clientX, H = T.clientY;
    w.current = { active: true, startX: F, startY: H, startLeftVw: i.leftVw, startTopVh: i.topVh };
    const q = (y) => {
      if (!w.current.active) return;
      Math.hypot(y.clientX - F, y.clientY - H) <= ea;
      const D = window.innerWidth || 1, ee = window.innerHeight || 1, K = (y.clientX - w.current.startX) / D * 100, $ = (y.clientY - w.current.startY) / ee * 100;
      s({ leftVw: Math.min(92, Math.max(0, w.current.startLeftVw + K)), topVh: Math.min(90, Math.max(0, w.current.startTopVh + $)) });
    }, z = () => {
      w.current.active && (w.current.active = false, document.removeEventListener("pointermove", q), document.removeEventListener("pointerup", z), s((y) => (Ji(y), y)));
    };
    document.addEventListener("pointermove", q), document.addEventListener("pointerup", z);
  }, [i.leftVw, i.topVh]), L = l.useCallback((T) => {
    f(T);
    const { view: F } = sn(e), { from: H, to: q } = x;
    Xo(F, H, q, T, t) && k({ from: H, to: H + T.length });
  }, [e, x, t]), E = () => {
    r == null ? void 0 : r(false);
  };
  return !n || Ln() ? null : o.jsxs("div", { className: "fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md", style: { left: `${i.leftVw}vw`, top: `${i.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: [o.jsxs("div", { className: "flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing", onPointerDown: N, children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100", children: [o.jsx(si, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(qt, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsxs("button", { type: "button", onPointerDown: (T) => T.stopPropagation(), onClick: A, className: "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50", title: "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", "aria-label": "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", children: [o.jsx(ii, { size: 14 }), o.jsx("span", { className: "hidden sm:inline", children: "\uC0C8\uB85C\uACE0\uCE68" })] }), o.jsx("button", { type: "button", onPointerDown: (T) => T.stopPropagation(), onClick: E, className: "rounded p-1 text-indigo-200 hover:bg-indigo-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(Wt, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(72vh,640px)] overflow-y-auto p-3", children: u.trim() ? o.jsx(Qi, { markdown: u, onMarkdownChange: L }) : o.jsxs("p", { className: "rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400", children: ["\uC5D0\uB514\uD130\uC5D0\uC11C \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uD3EC\uD568\uB41C \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD55C \uB4A4", o.jsx("br", {}), "\uD234\uBC14 \uBC84\uD2BC\uC744 \uB204\uB974\uAC70\uB098 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694."] }) })] });
}
const na = "(max-width: 768px)";
function ra() {
  return typeof window < "u" && window.matchMedia(na).matches;
}
function oa({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item max-md:hidden", onClick: () => {
    ra() || (e == null ? void 0 : e());
  }, title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: o.jsx(qt, { className: "md-editor-icon", size: 16 }) });
}
function sa({ value: e = "", theme: t = "light", currentFile: n = null, disabled: r, trigger: i }) {
  const s = Jn(), u = l.useCallback(() => {
    r || (ir({ currentFile: n, editorContent: e }), s(ar(n == null ? void 0 : n.id), { state: { value: e, theme: t, currentFile: n } }));
  }, [s, e, t, r, n]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: u, disabled: r, title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", children: i ?? o.jsx(ai, { className: "md-editor-icon", size: 16 }) });
}
function ia({ editorRef: e }) {
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
    const i = (_c2 = n.getEditorView) == null ? void 0 : _c2.call(n);
    i && (i.dispatch(i.state.replaceSelection(r)), (_d = i.focus) == null ? void 0 : _d.call(i));
  }, [e]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: t, title: "Insert print page break (<pgbr/>)", "aria-label": "Insert print page break", children: o.jsx(ci, { className: "md-editor-icon", size: 16 }) });
}
function aa({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", title: "\uCD5C\uB300 heading \uBCC0\uACBD", "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD", onClick: () => e(), children: o.jsx(li, { className: "md-editor-icon", size: 16 }) });
}
const ca = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], la = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], da = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], ua = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), fa = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Tn = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function ma({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: r, onApply: i }) {
  const s = n.length > 0, [u, f] = l.useState("document"), [x, k] = l.useState(1), [w, A] = l.useState(false), [N, L] = l.useState("nested"), [E, T] = l.useState(1), F = u === "selection" ? n : t;
  l.useEffect(() => {
    if (!e) return;
    const y = s ? "selection" : "document";
    f(y), k(an(y === "selection" ? n : t)), A(false), L("nested"), T(1);
  }, [e, t, n, s]), l.useEffect(() => {
    if (!e) return;
    const y = (K) => {
      const $ = K;
      return ($ == null ? void 0 : $.closest) ? !!$.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, D = () => {
      const K = document.activeElement;
      K && y(K) && typeof K.blur == "function" && K.blur();
    };
    D();
    const ee = (K) => {
      if (K.metaKey || K.ctrlKey || K.altKey) return;
      const $ = K.key;
      if ($ >= "1" && $ <= "9") {
        const h = Number($);
        cn(h) && (K.preventDefault(), K.stopPropagation(), K.stopImmediatePropagation(), k(h));
        return;
      }
      K.key === "Escape" || K.key === "Enter" || y(K.target) && (K.preventDefault(), K.stopPropagation(), K.stopImmediatePropagation(), D());
    };
    return window.addEventListener("keydown", ee, true), () => window.removeEventListener("keydown", ee, true);
  }, [e]);
  const H = l.useMemo(() => Qo(F, x, { maxLevel: dn, renumberOutline: w, outlineStyle: N, outlineStart: E }), [F, x, w, N, E]), q = (y) => {
    if (y !== "selection" && y !== "document" || y === "selection" && !s) return;
    f(y), k(an(y === "selection" ? n : t));
  }, z = () => {
    if (!H.sourceMax) return;
    const y = ts(F, x, { maxLevel: dn, renumberOutline: w, outlineStyle: N, outlineStart: E });
    y !== F && i(y, u), r();
  };
  return o.jsx(mt, { isOpen: e, onClose: r, onConfirm: z, contentClassName: "max-w-3xl", children: o.jsx(gi, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), o.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), o.jsx(At, { className: "flex items-center gap-2", value: u, onValueChange: q, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: ca.map((y) => {
    const D = u === y.value, ee = y.value === "selection" && !s;
    return o.jsx(Pt, { value: y.value, disabled: ee, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", D ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: D ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: y.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: y.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : y.description })] }) }, y.value);
  }) })] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), o.jsxs(xi, { value: String(x), onValueChange: (y) => {
    const D = Number(y);
    cn(D) && k(D);
  }, children: [o.jsxs(bi, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [o.jsx(wi, {}), o.jsx(yi, { className: "text-gray-500", children: o.jsx(fr, { size: 14 }) })] }), o.jsx(vi, { children: o.jsx(ki, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: o.jsx(Ei, { className: "p-1", children: Zo.map((y) => o.jsxs(Si, { value: String(y), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [o.jsx(Ci, { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(Yt, { size: 12 }) }), o.jsx(Ni, { children: `h${y}` })] }, y)) }) }) })] })] }), o.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [o.jsxs("div", { className: "flex items-center justify-between gap-3", children: [o.jsxs("div", { className: "min-w-0", children: [o.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), o.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), o.jsx(mr, { className: ua(w), checked: w, onCheckedChange: A, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: o.jsx(pr, { className: fa }) })] }), w ? o.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), o.jsx(At, { className: "flex items-center gap-2", value: N, onValueChange: (y) => {
    (y === "flat" || y === "nested") && L(y);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: la.map((y) => {
    const D = N === y.value;
    return o.jsx(Pt, { value: y.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", D ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: D ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: y.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: y.description })] }) }, y.value);
  }) })] }), o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), o.jsx(At, { className: "flex items-center gap-2", value: String(E), onValueChange: (y) => {
    y === "1" && T(1), y === "2" && T(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: da.map((y) => {
    const D = E === y.value;
    return o.jsx(Pt, { value: String(y.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", D ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: D ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: y.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: y.description })] }) }, y.value);
  }) })] })] }) : null] }), o.jsx("div", { className: "mt-4 min-h-0", children: H.rows.length ? o.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: o.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [o.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: o.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), o.jsx("tbody", { children: H.rows.map((y, D) => o.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(kn, { children: [o.jsx(En, { asChild: true, children: o.jsx("span", { className: "block truncate", children: y.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(Sn, { children: o.jsxs(Cn, { side: "top", sideOffset: 6, className: Tn, children: [y.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Nn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(kn, { children: [o.jsx(En, { asChild: true, children: o.jsx("span", { className: "block truncate", children: y.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(Sn, { children: o.jsxs(Cn, { side: "top", sideOffset: 6, className: Tn, children: [y.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Nn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", y.from] }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", y.to] })] }, `${y.from}-${D}-${y.text}`)) })] }) }) : o.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: u === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), o.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [o.jsxs(ln, { type: "button", variant: "secondary", size: "md", onClick: r, children: [o.jsx(Jo, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs(ln, { type: "button", variant: "primary", size: "md", onClick: z, disabled: !H.sourceMax, children: [o.jsx(es, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function ht({ checked: e = false, onChange: t, theme: n = "light", title: r, ariaLabel: i, icon: s }) {
  const u = n === "dark", f = i || r;
  return o.jsx("span", { className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1", title: r, children: o.jsxs("label", { className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1", onMouseDown: (x) => {
    x.preventDefault();
  }, children: [o.jsx(s, { className: `md-editor-icon shrink-0 ${u ? "text-odp-muted" : "text-gray-500"}`, size: 16, "aria-hidden": true }), o.jsx(mr, { checked: e, onCheckedChange: (x) => t == null ? void 0 : t(!!x), "aria-label": f, className: ["relative h-4 w-7 rounded-full border-0 outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-blue-400", e ? "bg-blue-600 dark:bg-blue-500" : u ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: o.jsx(pr, { className: ["block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform", "data-[state=checked]:translate-x-3.5"].join(" ") }) })] }) });
}
function pa({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(ht, { checked: e, onChange: t, theme: n, icon: di, title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)", ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8" });
}
function ha({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(ht, { checked: e, onChange: t, theme: n, icon: ui, title: e ? "base64 \uC774\uBBF8\uC9C0 \uC811\uD798" : "base64 \uC774\uBBF8\uC9C0 \uD3BC\uCE68", ariaLabel: "base64 \uC774\uBBF8\uC9C0 \uC811\uAE30" });
}
function ga({ checked: e = true, onChange: t, theme: n = "light" }) {
  return o.jsx(ht, { checked: e, onChange: t, theme: n, icon: fi, title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0", ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C" });
}
function xa({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(ht, { checked: e, onChange: t, theme: n, icon: mi, title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off", ariaLabel: "Mirror Edit" });
}
function ba({ onRequestLink: e, onRequestUpload: t, onRequestClip: n, disabled: r = false }) {
  const [i, s] = l.useState(false), u = l.useRef(null), f = l.useRef(null), x = l.useCallback(() => s(false), []);
  return o.jsxs(o.Fragment, { children: [o.jsx(ho, { title: "\uC774\uBBF8\uC9C0", visible: i, onChange: s, disabled: r, overlay: o.jsxs("ul", { className: "md-editor-menu", role: "menu", onClick: x, children: [o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => e(), onKeyDown: (k) => {
    (k.key === "Enter" || k.key === " ") && (k.preventDefault(), e());
  }, children: "\uB9C1\uD06C \uCD94\uAC00" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = u.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (k) => {
    var _a2;
    (k.key === "Enter" || k.key === " ") && (k.preventDefault(), (_a2 = u.current) == null ? void 0 : _a2.click());
  }, children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = f.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (k) => {
    var _a2;
    (k.key === "Enter" || k.key === " ") && (k.preventDefault(), (_a2 = f.current) == null ? void 0 : _a2.click());
  }, children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC" })] }), children: o.jsx(pi, { className: "md-editor-icon", size: 16, "aria-hidden": true }) }), o.jsx("input", { ref: u, type: "file", accept: "image/*", multiple: true, className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (k) => {
    const w = Array.from(k.target.files || []);
    k.target.value = "", w.length && t(w);
  } }), o.jsx("input", { ref: f, type: "file", accept: "image/*", className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (k) => {
    var _a2;
    const w = (_a2 = k.target.files) == null ? void 0 : _a2[0];
    k.target.value = "", w && n(w);
  } })] });
}
function wa({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, i] = l.useState(""), [s, u] = l.useState(""), [f, x] = l.useState("");
  l.useEffect(() => {
    e && (i(""), u(""), x(""));
  }, [e]);
  const k = () => {
    const w = s.trim();
    if (!w) {
      x("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: r.trim(), url: w }), t();
  };
  return o.jsx(mt, { isOpen: e, onClose: t, onConfirm: k, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), o.jsx("input", { type: "text", value: r, onChange: (w) => i(w.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), o.jsx("input", { type: "text", value: s, onChange: (w) => u(w.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), f ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: f }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(Wt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: k, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(Yt, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function ya({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, i] = l.useState(""), [s, u] = l.useState(""), [f, x] = l.useState(""), k = l.useRef(null);
  l.useEffect(() => {
    if (!e) return;
    i(""), u(""), x("");
    const N = window.setTimeout(() => {
      var _a2;
      return (_a2 = k.current) == null ? void 0 : _a2.focus();
    }, 40);
    return () => window.clearTimeout(N);
  }, [e]);
  const w = () => {
    const N = r.trim(), L = s.trim();
    if (!N && !L) {
      x("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ line1: N, line2: L }), t();
  }, A = (N) => {
    N.key === "Enter" && (!(N.metaKey || N.ctrlKey) || N.altKey || N.shiftKey || N.nativeEvent.isComposing || N.keyCode === 229 || (N.preventDefault(), N.stopPropagation(), w()));
  };
  return o.jsx(mt, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uAC01\uC8FC \uC0BD\uC785" }), o.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0", " ", o.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "[^N]" }), "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uBAA9 (1\uC904)" }), o.jsx("input", { ref: k, type: "text", value: r, onChange: (N) => {
    i(N.target.value), f && x("");
  }, onKeyDown: A, placeholder: "\uC608: docs.docker.com - Compose services", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL (2\uC904)" }), o.jsx("input", { type: "text", value: s, onChange: (N) => {
    u(N.target.value), f && x("");
  }, onKeyDown: A, placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), f ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: f }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(Wt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: w, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(Yt, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function va({ isOpen: e, file: t, onClose: n, onConfirm: r }) {
  const [i, s] = l.useState("");
  return l.useEffect(() => {
    if (!e || !t) {
      s("");
      return;
    }
    const u = URL.createObjectURL(t);
    return s(u), () => {
      URL.revokeObjectURL(u);
    };
  }, [e, t]), o.jsx(mt, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: i ? o.jsx(Ii, { imageSrc: i, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: r }) : null });
}
const xr = "s3haim_md_editor_base64_image_fold";
function $t() {
  if (typeof window > "u") return true;
  try {
    const e = window.localStorage.getItem(xr);
    return e === null ? true : e === "1";
  } catch {
    return true;
  }
}
function ka(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(xr, e ? "1" : "0");
  } catch {
  }
}
function Ea() {
  const [e, t] = l.useState($t), n = l.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return ka(s), s;
    });
  }, []);
  return [e, n];
}
function Sa() {
  const [e, t] = l.useState(cr);
  l.useEffect(() => ns((r) => {
    t(r);
  }), []);
  const n = l.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return rs(s), s;
    });
  }, []);
  return [e, n];
}
function Ca() {
  const [e, t] = l.useState(os);
  l.useEffect(() => ss((r) => {
    t(r);
  }), []);
  const n = l.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return is(s), s;
    });
  }, []);
  return [e, n];
}
const Na = 48, Rn = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, br = tr.define(), wr = tr.define(), yr = new Bt();
function ja(e) {
  const t = [];
  Rn.lastIndex = 0;
  let n;
  for (; (n = Rn.exec(e)) !== null; ) {
    const r = n[1] ?? "image", i = n[2] ?? "";
    if (i.length < Na) continue;
    const s = n[0], u = s.length - i.length, f = n.index + u;
    t.push({ from: f, to: n.index + s.length, mime: r });
  }
  return t;
}
function Ma(e, t) {
  const n = Math.round(t * 3 / 4), r = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${r}\u2026`;
}
class La extends go {
  constructor(t, n, r) {
    super(), this.label = t, this.from = n, this.to = r;
  }
  toDOM(t) {
    const n = document.createElement("span");
    return n.textContent = this.label, n.className = "cm-base64-image-fold", n.title = "Click to expand base64 image data", n.addEventListener("mousedown", (r) => {
      r.preventDefault(), r.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: br.of({ from: this.from, to: this.to }) }), t.focus();
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
function Ta(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
function An(e, t) {
  const n = [], r = [];
  for (let i = 1; i <= e.doc.lines; i += 1) {
    const s = e.doc.line(i);
    for (const u of ja(s.text)) {
      const f = s.from + u.from, x = s.from + u.to;
      if (Ta(t, f, x)) {
        r.push({ from: f, to: x });
        continue;
      }
      n.push(rn.replace({ widget: new La(Ma(u.mime, x - f), f, x) }).range(f, x));
    }
  }
  return { deco: rn.set(n, true), expanded: r };
}
const vr = er.define({ create(e) {
  return An(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: i, to: s }) => ({ from: t.changes.mapPos(i, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: i, to: s }) => i < s));
  let r = n !== e.expanded;
  for (const i of t.effects) i.is(br) ? (n = [{ from: i.value.from, to: i.value.to }], r = true) : i.is(wr) && n.length > 0 && (n = [], r = true);
  return t.docChanged || r ? An(t.state, n) : e;
}, provide: (e) => Ke.decorations.from(e, (t) => t.deco) }), Ra = Ke.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(vr, false);
  if (!n || n.expanded.length === 0) return false;
  const r = e.target;
  if (!(r instanceof Node) || !t.dom.contains(r)) return false;
  const i = t.posAtDOM(r, 0);
  return i !== -1 && n.expanded.some(({ from: s, to: u }) => i >= s && i <= u) || t.dispatch({ effects: wr.of(null) }), false;
} });
function kr() {
  return [vr, Ra];
}
function Aa(e) {
  return yr.of(e ? kr() : []);
}
function Pa(e, t) {
  if (e) try {
    e.dispatch({ effects: yr.reconfigure(t ? kr() : []) });
  } catch {
  }
}
const Er = new Bt();
function Da(e, t, n) {
  let r = false;
  return or(e).between(t, n, () => {
    r = true;
  }), r;
}
function Ia(e) {
  const t = [], n = e.doc.toString();
  return Ot(e).iterate({ enter(r) {
    if (r.name !== "FencedCode") return;
    const i = lr(n, r.from, r.to);
    i && t.push(i);
  } }), t;
}
function Sr(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
const Cr = er.define({ create() {
  return [];
}, update(e, t) {
  let n = e;
  t.docChanged && n.length && (n = n.map(({ from: i, to: s }) => ({ from: t.changes.mapPos(i, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: i, to: s }) => i < s));
  let r = n !== e;
  for (const i of t.effects) if (i.is(Ye)) Sr(n, i.value.from, i.value.to) || (n = [...n, i.value], r = true);
  else if (i.is(Se)) {
    const s = n.filter((u) => u.from !== i.value.from || u.to !== i.value.to);
    s.length !== n.length && (n = s, r = true);
  }
  return r ? n : e;
} });
function Pn(e) {
  const t = e.state.field(Cr), n = [];
  for (const r of Ia(e.state)) Sr(t, r.from, r.to) || Da(e.state, r.from, r.to) || n.push(Se.of(r));
  n.length > 0 && e.dispatch({ effects: n });
}
const Fa = Vt.fromClass(class {
  constructor(e) {
    Pn(e);
  }
  update(e) {
    e.docChanged && Pn(e.view);
  }
}), $a = rr.of((e, t) => {
  const n = e.doc.toString();
  let r = null;
  return Ot(e).iterate({ enter(i) {
    if (i.name !== "FencedCode" || e.doc.lineAt(i.from).from !== t) return;
    const u = lr(n, i.from, i.to);
    if (u) return r = u, false;
  } }), r;
});
function Nr() {
  return [Cr, nr(), $a, Fa];
}
function Ha(e) {
  return Er.of(e ? Nr() : []);
}
function _a(e, t) {
  if (e) try {
    e.dispatch({ effects: Er.reconfigure(t ? Nr() : []) });
  } catch {
  }
}
const Ba = `<br/>
`;
function Oa(e) {
  if (!as() || !(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.main, n = Ba;
  return e.dispatch({ changes: { from: t.from, to: t.to, insert: n }, selection: ce.cursor(t.from + n.length), scrollIntoView: true }), true;
}
const jr = new zt("s3haim-note-cover-fold");
jr.version(1).stores({ folds: "key, updatedAt" });
const Mr = jr.folds;
function Va(e, t) {
  return `cover-fold:${Kt(e, t)}`;
}
function Ka(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Va(e.type, e.id);
}
async function za(e) {
  if (!e) return null;
  const t = await Mr.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function qa(e, t) {
  e && await Mr.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function Te(e) {
  const t = Math.min(e.length, 2e6);
  return cs(e.sliceString(0, t));
}
function Ce(e) {
  const t = Te(e.doc);
  if (!t) return null;
  const n = e.doc.lineAt(t.from);
  return n.to >= t.to ? null : { from: n.to, to: t.to };
}
function ze(e, t) {
  let n = false;
  return or(e).between(t.from, t.to, () => {
    n = true;
  }), n;
}
function Wa(e, t) {
  return e.from === t.from && e.to === t.to;
}
function Ya(e, t) {
  const n = e.doc.lineAt(t);
  let r = false;
  return Ot(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(i) {
    const s = i.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return r = true, false;
  } }), r;
}
function It(e, t) {
  const n = Te(e.doc);
  if (n) {
    const s = e.doc.lineAt(n.from);
    if (t === s.from) {
      const u = Ce(e);
      if (u) return { ...u, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!Ya(e, t)) return null;
  const r = e.doc.lineAt(t), i = yo(e, r.from, r.to);
  return !i || i.from >= i.to ? null : { ...i, kind: "heading" };
}
const qe = xo.define({ combine: (e) => e[e.length - 1] ?? null }), Lr = new Bt();
function Ua(e) {
  return Lr.of(qe.of(e));
}
function Ga(e, t) {
  e.dispatch({ effects: Lr.reconfigure(qe.of(t)) });
}
function Xa(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const r = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", r), n.title = r, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const i = n.querySelector("svg");
  return i && (i.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", i.style.transformOrigin = "50% 50%"), n;
}
class Dn extends vo {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return Xa(this.open, this.kind);
  }
}
let Ht = 0;
function Tr(e, t) {
  const n = e.coordsAtPos(t.from), r = e.coordsAtPos(t.to);
  if (!n || !r) return null;
  const i = e.contentDOM.getBoundingClientRect(), s = Math.min(n.top, r.top), u = Math.max(n.bottom, r.bottom), f = Math.max(0, u - s);
  if (f < 2) return null;
  const x = document.createElement("div");
  return x.className = "cm-note-cover-fold-motion", x.style.cssText = ["position:fixed", `top:${s}px`, `left:${i.left}px`, `width:${Math.max(0, i.width)}px`, `height:${f}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(x), x;
}
async function Qa(e, t) {
  const n = ++Ht, r = Tr(e, t);
  if (!r) {
    e.dispatch({ effects: Se.of(t) });
    return;
  }
  try {
    await pt(r, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === Ht && Ce(e.state) && e.dispatch({ effects: Se.of(t) }), r.remove();
}
async function Za(e, t) {
  ++Ht, e.dispatch({ effects: Ye.of(t) });
  const n = Ce(e.state);
  if (!n) return;
  const r = Tr(e, n);
  if (r) {
    try {
      await pt(r, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    r.remove();
  }
}
function Rr(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.querySelector) == null ? void 0 : _a2.call(e, "svg");
  n instanceof SVGElement && pt(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function In(e, t) {
  const n = ze(e.state, t);
  return e.dispatch({ effects: n ? Ye.of(t) : Se.of(t) }), true;
}
function Fn(e) {
  const t = Ce(e.state);
  if (!t) return false;
  const r = !ze(e.state, t), i = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return Rr(i, !r), (async () => {
    r ? await Qa(e, t) : await Za(e, t);
    const s = e.state.facet(qe);
    s && qa(s, r);
  })(), true;
}
function Ja(e, t) {
  const n = Ce(e.state);
  if (!n) return;
  const r = ze(e.state, n);
  t && !r ? e.dispatch({ effects: Se.of(n) }) : !t && r && e.dispatch({ effects: Ye.of(n) });
}
function ec() {
  return Vt.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(qe) !== this.lastKey, r = !!Te(e.state.doc), i = r && !this.hadCover;
      this.hadCover = r, (t || i) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(qe);
      this.lastKey = e;
      const t = Te(this.view.state.doc);
      if (this.hadCover = !!t, !e || !t) return;
      const n = ++this.loadGen;
      za(e).then((r) => {
        n === this.loadGen && r != null && Ja(this.view, r);
      });
    }
  });
}
function tc(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(Se) || n.is(Ye)));
}
function nc() {
  return [Ua(null), nr({ preparePlaceholder(e, t) {
    const n = Ce(e);
    return n && Wa(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const r = document.createElement("span");
    return r.className = "cm-foldPlaceholder", r.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", r.setAttribute("aria-hidden", "true"), r.onclick = t, r;
  } }), rr.of((e, t) => {
    const n = Te(e.doc);
    if (!n) return null;
    const r = e.doc.lineAt(n.from);
    return t !== r.from ? null : Ce(e);
  }), bo({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = It(e.state, t.from);
    if (!n) return null;
    const r = !ze(e.state, n);
    return new Dn(r, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || tc(e), initialSpacer: () => new Dn(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = It(e.state, t.from);
    if (!r) return false;
    if (r.kind === "cover") {
      if (!Fn(e)) return false;
    } else {
      const i = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      Rr(i, ze(e.state, r)), In(e, r);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), wo({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = Te(e.state.doc);
    if (r && t.from >= r.from && t.from < r.to) return Fn(e) ? (n.preventDefault(), true) : false;
    const i = It(e.state, t.from);
    return !i || i.kind !== "heading" ? false : (In(e, i), n.preventDefault(), true);
  } } }), ec(), Ke.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function rc({ cover: e, getPresignedUrl: t }) {
  const n = ls(e.pageSizeId) ? e.pageSizeId : ds, r = l.useMemo(() => ({ ...us(), pageSizeId: n }), [n]), i = l.useMemo(() => fs(n), [n]), s = l.useMemo(() => ms(r), [r]);
  return o.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: s, children: o.jsx(Mi, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${i.widthMm} / ${i.heightMm}` } }) });
}
const ut = /* @__PURE__ */ new WeakMap(), oc = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", sc = "\uD45C\uC9C0";
function Ar(e) {
  const t = ut.get(e);
  t && (t.unmount(), ut.delete(e));
}
function $n(e, t) {
  if (!e) return;
  const n = e.querySelector(".md-note-cover-placeholder__fallback");
  n && (n.textContent = t);
}
function Hn(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? $n(e, oc) : t === "empty" && $n(e, sc));
}
function ic(e, t, n) {
  let r = ut.get(e);
  r || (r = mo.createRoot(e), ut.set(e, r)), r.render(l.createElement(rc, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function ac(e, t, n, r) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const { cover: i } = dr(t ?? ""), s = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(i == null ? void 0 : i.enabled)) {
    for (const u of s) {
      Ar(u);
      const f = u.closest("[data-note-cover-placeholder]");
      Hn(f, "empty");
    }
    return 0;
  }
  for (const u of s) {
    const f = u.closest("[data-note-cover-placeholder]");
    Hn(f, "ready"), ic(u, i, n);
  }
  return s.length;
}
function cc(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) Ar(n);
}
const lc = "h1, h2, h3, h4, h5, h6", Pr = "md-preview-heading-fold-chevron", _n = "md-preview-heading-foldable", it = "md-preview-heading-folded", dc = "md-preview-heading-section-hidden", dt = "data-md-preview-heading-fold";
function uc(e) {
  if (!e) return false;
  const t = e.tagName;
  return t === "H1" || t === "H2" || t === "H3" || t === "H4" || t === "H5" || t === "H6";
}
function Bn(e) {
  const t = e.getAttribute("data-heading-level");
  if (t) {
    const r = Number(t);
    if (Number.isFinite(r) && r >= 1) return r;
  }
  const n = Number(e.tagName.slice(1));
  return Number.isFinite(n) && n >= 1 ? n : 6;
}
function fc(e, t) {
  return e.id || `md-preview-heading-${t}`;
}
function Dr(e) {
  const t = Bn(e), n = [];
  let r = e.nextElementSibling;
  for (; r && !(uc(r) && Bn(r) <= t || r.hasAttribute("data-note-cover-placeholder")); ) r instanceof HTMLElement && n.push(r), r = r.nextElementSibling;
  return n;
}
function mc(e) {
  return !!e.closest("[data-note-cover-placeholder], [data-note-cover-preview]");
}
function Ir(e) {
  return Array.from(e.querySelectorAll(lc)).filter((t) => !(!(t instanceof HTMLElement) || mc(t)));
}
function pc(e) {
  if (!e || typeof e.querySelectorAll != "function") return false;
  const t = Ir(e);
  for (const n of t) if (n.getAttribute(dt) !== "1" && Dr(n).length > 0) return true;
  return false;
}
function hc(e) {
  const t = document.createElement("button");
  t.type = "button", t.className = `${Pr} cursor-pointer`, t.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), t.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const n = t.querySelector("svg");
  return n && (n.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", n.style.transformOrigin = "50% 50%"), t;
}
function gc(e, t) {
  const n = e.querySelector("svg");
  n instanceof SVGElement && (pt(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" }), e.setAttribute("aria-label", t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
}
function Ft(e, t) {
  for (const n of e) n.classList.toggle(dc, t), t ? n.setAttribute("hidden", "") : n.removeAttribute("hidden");
}
function xc(e, t = {}) {
  if (!e || typeof e.querySelectorAll != "function") return () => {
  };
  const n = new Set(Array.from(t.collapsedIds ?? []).filter((s) => typeof s == "string" && s)), r = [];
  return Ir(e).forEach((s, u) => {
    var _a2;
    if (s.getAttribute(dt) === "1") return;
    const f = Dr(s);
    if (f.length === 0) return;
    const x = fc(s, u);
    s.id || (s.id = x), s.setAttribute(dt, "1"), s.classList.add(_n), (_a2 = s.querySelector(`:scope > .${Pr}`)) == null ? void 0 : _a2.remove();
    const w = !n.has(x), A = hc(w);
    s.insertBefore(A, s.firstChild);
    const N = (E) => {
      s.classList.toggle(it, E), Ft(f, E), gc(A, !E);
    };
    w || (s.classList.add(it), Ft(f, true));
    const L = (E) => {
      var _a3;
      E.preventDefault(), E.stopPropagation();
      const T = !s.classList.contains(it);
      N(T), T ? n.add(x) : n.delete(x), (_a3 = t.onCollapsedChange) == null ? void 0 : _a3.call(t, Array.from(n));
    };
    A.addEventListener("click", L), r.push(() => {
      A.removeEventListener("click", L), A.remove(), s.classList.remove(_n, it), s.removeAttribute(dt), Ft(f, false);
    });
  }), () => {
    for (const s of r) s();
  };
}
const Fr = new zt("s3haim-preview-heading-fold");
Fr.version(1).stores({ folds: "key, updatedAt" });
const $r = Fr.folds;
function bc(e, t) {
  return `heading-fold:${Kt(e, t)}`;
}
function wc(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : bc(e.type, e.id);
}
async function yc(e) {
  if (!e) return null;
  const t = await $r.get(e);
  return !t || !Array.isArray(t.collapsedIds) ? null : t.collapsedIds.filter((n) => typeof n == "string" && n.length > 0);
}
async function vc(e, t) {
  e && await $r.put({ key: e, collapsedIds: Array.from(new Set(t.filter(Boolean))), updatedAt: Date.now() });
}
const ft = /* @__PURE__ */ new Set();
function kc(e) {
  return ft.add(e), () => {
    ft.delete(e);
  };
}
function Ec(e) {
  if (!(!e.selectionSet && !e.docChanged) && !(e.view.composing || e.view.compositionStarted) && ft.size !== 0) for (const t of ft) try {
    t(e.view, e);
  } catch {
  }
}
function Sc() {
  return Vt.fromClass(class {
    constructor() {
      __publicField(this, "raf", 0);
    }
    update(e) {
      e.docChanged && (e.view.composing || e.view.compositionStarted || (this.raf && cancelAnimationFrame(this.raf), this.raf = requestAnimationFrame(() => {
        this.raf = 0, Cc(e.view);
      })));
    }
    destroy() {
      this.raf && cancelAnimationFrame(this.raf);
    }
  });
}
function Cc(e) {
  const t = e.contentDOM;
  t && t.offsetHeight;
}
const Nc = [0, 16, 48, 100, 180, 320];
function jc(e) {
  let t = [], n = null, r = null, i = false, s = false;
  function u() {
    for (const L of t) clearTimeout(L);
    t = [];
  }
  function f() {
    if (s) return false;
    const L = e.getPreviewRoot(), E = e.getView();
    return !L || !E || Ve(L) ? false : ps(E, L, { allowCollapsed: true });
  }
  function x() {
    i || s || (i = true, requestAnimationFrame(() => {
      i = false, f();
    }));
  }
  function k(L) {
    n && r === L || (n == null ? void 0 : n.disconnect(), r = L, n = new MutationObserver((E) => {
      E.some((F) => {
        const H = [...F.addedNodes, ...F.removedNodes];
        return H.length === 0 ? F.type === "characterData" || F.type === "attributes" : H.some((q) => {
          var _a2, _b;
          return q instanceof Element ? !(q.hasAttribute("data-preview-caret-mirror") || q.hasAttribute("data-preview-sel-mirror") || ((_a2 = q.classList) == null ? void 0 : _a2.contains("s3haim-preview-caret-mirror")) || ((_b = q.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
        });
      }) && x();
    }), n.observe(L, { childList: true, subtree: true, characterData: true }));
  }
  function w(L) {
    if (s) return;
    const E = e.getPreviewRoot();
    if (E && k(E), f(), !!(L == null ? void 0 : L.withRetries)) {
      u();
      for (const T of Nc) t.push(setTimeout(() => {
        if (s) return;
        const F = e.getPreviewRoot();
        F && k(F), f();
      }, T));
    }
  }
  function A() {
    s = true, u(), n == null ? void 0 : n.disconnect(), n = null, r = null, i = false;
  }
  const N = e.getPreviewRoot();
  return N && k(N), w({ withRetries: true }), { schedule: w, stop: A };
}
const On = [0, 16, 48, 120, 280], Mc = 50, Lc = 40, Vn = 32, Tc = 32;
function Kn(e) {
  return !!(e == null ? void 0 : e.isConnected);
}
function _t(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function zn(e, t) {
  const n = Math.max(0, t);
  Math.abs(e.scrollTop - n) < 0.5 || (e.scrollTop = n, Math.abs(e.scrollTop - n) > 1 && e.scrollTo(0, n));
}
function Hr(e) {
  const t = [];
  for (const r of e.querySelectorAll("[data-line]")) r instanceof HTMLElement && t.push(r);
  const n = t.filter((r) => {
    let i = r.parentElement;
    for (; i && i !== e; ) {
      if (i.hasAttribute("data-line")) return false;
      i = i.parentElement;
    }
    return true;
  });
  return n.length > 0 ? n : t;
}
function Rc(e, t) {
  let n = null, r = -1;
  for (const i of Hr(e)) {
    const s = Number(i.getAttribute("data-line"));
    Number.isFinite(s) && s <= t && s >= r && (n = i, r = s);
  }
  return n;
}
function Ac(e, t, n) {
  let r = null, i = -1, s = -1 / 0;
  for (const u of Hr(e)) {
    const f = Number(u.getAttribute("data-line"));
    if (!Number.isFinite(f)) continue;
    const x = _t(u, t);
    x <= n && x >= s && (r = u, i = f, s = x);
  }
  return !r || i < 0 ? null : { el: r, line0: i };
}
function Pc(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.dom) == null ? void 0 : _a2.closest(".md-editor");
  if (n instanceof HTMLElement) return n;
  const r = t == null ? void 0 : t.closest(".md-editor");
  return r instanceof HTMLElement ? r : null;
}
function Dc(e) {
  let t = false, n = [], r = null, i = 0, s = null, u = 0, f = 0, x = null, k = null, w = null, A = null, N = null, L = "none", E = false;
  function T() {
    for (const M of n) clearTimeout(M);
    n = [];
  }
  function F() {
    r != null && (clearTimeout(r), r = null), i = 0;
  }
  function H() {
    s != null && (clearTimeout(s), s = null);
  }
  function q() {
    u && cancelAnimationFrame(u), f && cancelAnimationFrame(f), u = 0, f = 0;
  }
  function z(M) {
    H(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s = setTimeout(() => {
          s = null, L === M && (L = "none");
        }, Tc);
      });
    });
  }
  function y(M) {
    return M.scrollDOM;
  }
  function D(M) {
    return Kn(A) ? A : Kn(k) ? k : Le(M);
  }
  function ee(M) {
    if (!(M instanceof Node)) return null;
    const C = e.getView(), O = e.getPreviewRoot();
    if (C && (M === C.scrollDOM || C.dom.contains(M))) return "editor";
    if (O) {
      const I = O.closest(".md-editor-preview-wrapper") ?? O;
      if (M === I || I.contains(M)) return "preview";
    }
    return null;
  }
  function K(M, C) {
    if (M !== "preview" || !(C instanceof HTMLElement)) return;
    const O = e.getPreviewRoot();
    if (!O) return;
    const I = Le(O);
    I && (C === I || C.contains(I)) && (A = C);
  }
  function $(M, C) {
    if (!(C instanceof HTMLElement)) return false;
    if (M === "editor") {
      const se = e.getView();
      return !!(se && (C === se.scrollDOM || C.contains(se.scrollDOM)));
    }
    const O = e.getPreviewRoot(), I = O ? Le(O) : null;
    return !!(I && (C === I || C.contains(I)));
  }
  function h() {
    if (E) return false;
    const M = e.getPreviewRoot(), C = e.getView();
    if (!M || !C || L === "preview" || L !== "none" && L !== "follow") return false;
    L = "follow";
    const O = hs(C, M);
    return z("follow"), O;
  }
  function P() {
    t || E || (t = true, requestAnimationFrame(() => {
      t = false, h();
    }));
  }
  function Z() {
    const M = e.getPreviewRoot(), C = e.getView();
    if (!M || !C) return;
    const O = y(C), I = D(M);
    if (!I) return;
    const se = O.scrollTop, ue = C.lineBlockAtHeight(se), we = C.state.doc.lineAt(ue.from).number - 1, ye = Rc(M, we);
    if (!ye) return;
    const Me = ue.height > 0 ? Math.max(0, Math.min(1, (se - ue.top) / ue.height)) : 0, ve = _t(ye, I) + ye.offsetHeight * Me - Vn;
    zn(I, ve);
  }
  function U() {
    const M = e.getPreviewRoot(), C = e.getView();
    if (!M || !C) return;
    const O = y(C), I = D(M);
    if (!I) return;
    const se = I.scrollTop + Vn, ue = Ac(M, I, se);
    if (!ue) return;
    const { el: we, line0: ye } = ue, Me = Math.min(Math.max(1, ye + 1), C.state.doc.lines), Xe = C.state.doc.line(Me), ve = C.lineBlockAt(Xe.from), Qe = _t(we, I), Fe = we.offsetHeight > 0 ? Math.max(0, Math.min(1, (se - Qe) / we.offsetHeight)) : 0;
    zn(O, ve.top + ve.height * Fe);
  }
  function Q() {
    if (!E && !(L === "preview" || L === "follow")) {
      L = "editor";
      try {
        Z();
      } finally {
        z("editor");
      }
    }
  }
  function J() {
    if (!E && !(L === "editor" || L === "follow")) {
      L = "preview";
      try {
        U();
      } finally {
        z("preview");
      }
    }
  }
  function me() {
    E || L === "preview" || L === "follow" || u || (u = requestAnimationFrame(() => {
      u = 0, Q();
    }));
  }
  function pe() {
    E || L === "editor" || L === "follow" || f || (f = requestAnimationFrame(() => {
      f = 0, J();
    }));
  }
  function ne(M) {
    const C = ee(M.target);
    !C || !$(C, M.target) || (K(C, M.target), C === "editor" ? me() : pe());
  }
  function le(M) {
    const C = ee(M.target);
    C && requestAnimationFrame(() => {
      const O = e.getView(), I = e.getPreviewRoot();
      C === "editor" && O ? me() : C === "preview" && I && (K("preview", Le(I)), pe());
    });
  }
  function B(M) {
    const C = M.target;
    if (C instanceof HTMLImageElement && (N == null ? void 0 : N.contains(C))) {
      P(), T();
      for (const O of On) n.push(setTimeout(() => h(), O));
    }
  }
  function te(M) {
    const C = M.scrollDOM;
    return C instanceof HTMLElement ? (x === C || (x && x.removeEventListener("scroll", ne), x = C, C.addEventListener("scroll", ne, { passive: true })), true) : false;
  }
  function Pe(M) {
    const C = Le(M);
    return C ? (k === C || (k && k.removeEventListener("scroll", ne), k = C, A = C, C.addEventListener("scroll", ne, { passive: true })), true) : false;
  }
  function De(M, C) {
    const O = Pc(M, C);
    return O ? (w === O || (w && (w.removeEventListener("scroll", ne, true), w.removeEventListener("wheel", le, true), w.removeEventListener("touchmove", le, true)), w = O, O.addEventListener("scroll", ne, { capture: true, passive: true }), O.addEventListener("wheel", le, { capture: true, passive: true }), O.addEventListener("touchmove", le, { capture: true, passive: true })), true) : false;
  }
  function Ge(M) {
    N !== M && (N && (N.removeEventListener("load", B, true), N.removeEventListener("error", B, true)), N = M, M.addEventListener("load", B, true), M.addEventListener("error", B, true));
  }
  function Ne() {
    E || r != null || i >= Lc || (r = setTimeout(() => {
      if (r = null, i += 1, E) return;
      he() || Ne();
    }, Mc));
  }
  function he() {
    if (E) return false;
    const M = e.getView(), C = e.getPreviewRoot();
    let O = true;
    return M && te(M) || (O = false), C ? (Pe(C) || (O = false), Ge(C)) : O = false, De(M, C) || (O = false), O;
  }
  function je(M) {
    if (!E && (he() || Ne(), h(), !!(M == null ? void 0 : M.withRetries))) {
      T();
      for (const C of On) n.push(setTimeout(() => {
        E || (he() || Ne(), h());
      }, C));
    }
  }
  function Ie() {
    E = true, T(), F(), H(), q(), x && (x.removeEventListener("scroll", ne), x = null), k && (k.removeEventListener("scroll", ne), k = null), w && (w.removeEventListener("scroll", ne, true), w.removeEventListener("wheel", le, true), w.removeEventListener("touchmove", le, true), w = null), N && (N.removeEventListener("load", B, true), N.removeEventListener("error", B, true), N = null), A = null, t = false, L = "none";
  }
  return F(), he() || Ne(), je({ withRetries: true }), { schedule: je, stop: Ie };
}
const We = new zt("s3haim-editor-undo-history");
We.version(1).stores({ histories: "key, updatedAt" });
const qn = 100, _r = 10080 * 60 * 1e3, Ic = 500;
function Fc(e, t) {
  return Kt(e, t);
}
function $c(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" ? null : Fc(e.type, e.id);
}
async function Hc(e) {
  if (!e) return null;
  const t = await We.histories.get(e);
  return t ? typeof t.updatedAt == "number" && Date.now() - t.updatedAt > _r ? (await We.histories.delete(e), null) : !Array.isArray(t.stack) || t.stack.length === 0 ? null : t : null;
}
function Ut(e) {
  return Array.isArray(e) ? e.length <= qn ? e : e.slice(e.length - qn) : [""];
}
async function Wn({ key: e, stack: t, index: n }) {
  if (!e) return;
  const r = Ut(t), i = Math.max(0, Math.min(n ?? r.length - 1, r.length - 1));
  await We.histories.put({ key: e, stack: r, index: i, updatedAt: Date.now() });
}
async function _c() {
  const e = Date.now() - _r;
  await We.histories.where("updatedAt").below(e).delete();
}
function at(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? [...e] : [""];
  let i = Math.max(0, Math.min(t, r.length - 1));
  const s = n ?? "";
  if (r[i] === s) return { stack: r, index: i };
  const u = r.lastIndexOf(s);
  if (u >= 0) return { stack: r, index: u };
  const f = r.slice(0, i + 1);
  f.push(s);
  const x = Ut(f);
  return { stack: x, index: x.length - 1 };
}
function Bc(e, t, n) {
  const r = n ?? "", i = Array.isArray(e) && e.length > 0 ? e : [""], s = Math.max(0, Math.min(t, i.length - 1));
  if (i[s] === r) return { stack: i, index: s, changed: false };
  for (let x = s - 1; x >= 0; x -= 1) if (i[x] === r) return { stack: i, index: x, changed: true };
  for (let x = s + 1; x < i.length; x += 1) if (i[x] === r) return { stack: i, index: x, changed: true };
  const u = i.slice(0, s + 1);
  u.push(r);
  const f = Ut(u);
  return { stack: f, index: f.length - 1, changed: true };
}
function Oc(e, t, n) {
  if (!(e == null ? void 0 : e.state) || !Array.isArray(t) || t.length === 0) return n == null ? void 0 : n(), false;
  const r = t[t.length - 1] ?? "";
  if (t.length === 1) return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [kt.addToHistory.of(false)] }), n == null ? void 0 : n(), true;
  e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: t[0] ?? "" }, annotations: [kt.addToHistory.of(false), on.of("full")] }), n == null ? void 0 : n();
  for (let s = 1; s < t.length; s += 1) {
    const u = t[s] ?? "";
    e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: u }, annotations: [on.of("full")] });
  }
  return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [kt.addToHistory.of(false)] }), true;
}
function Yn(e) {
  return e && typeof e.resetHistory == "function" ? () => e.resetHistory() : null;
}
function Vc(e) {
  var _a2;
  return e ? ((_a2 = e.getEditorView) == null ? void 0 : _a2.call(e)) ?? null : null;
}
function Un(e) {
  var _a2;
  return ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current) ?? null;
}
function Kc({ currentFile: e, value: t, onChange: n, editorRef: r, enabled: i = true }) {
  const s = i ? $c(e) : null, u = l.useRef([""]), f = l.useRef(0), x = l.useRef(null), k = l.useRef(false), w = l.useRef(null), A = l.useRef(null), N = l.useRef(t), L = l.useRef(false), E = l.useRef(null), T = l.useRef(0), F = l.useRef(t);
  N.current = t;
  const H = l.useCallback(async ($, h, P) => {
    if ($) try {
      await Wn({ key: $, stack: h, index: P });
    } catch (Z) {
      console.warn("[editor-undo-history] save failed:", Z);
    }
  }, []), q = l.useCallback(($, h, P) => {
    $ && (A.current && clearTimeout(A.current), A.current = setTimeout(() => {
      A.current = null, H($, h, P);
    }, 300));
  }, [H]), z = l.useCallback(() => {
    w.current && (clearTimeout(w.current), w.current = null);
  }, []), y = l.useCallback(() => {
    const $ = N.current ?? "", h = at(u.current, f.current, $);
    return u.current = h.stack, f.current = h.index, h;
  }, []), D = l.useCallback(($) => {
    const h = Un(r), P = Vc(h), Z = Yn(h);
    if (!P) return false;
    const U = ++T.current;
    k.current = true;
    try {
      Oc(P, $, Z ?? void 0);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          T.current === U && (k.current = false);
        });
      });
    }
    return true;
  }, [r]), ee = l.useCallback(($, h) => {
    var _a2, _b;
    const P = N.current ?? "", Z = ((_a2 = h == null ? void 0 : h.stack) == null ? void 0 : _a2.length) ? h.stack : [P], U = ((_b = h == null ? void 0 : h.stack) == null ? void 0 : _b.length) ? h.index ?? h.stack.length - 1 : 0, Q = at(Z, U, P);
    u.current = Q.stack, f.current = Q.index, E.current = $, L.current = false, F.current = P;
    const J = Q.stack.slice(0, Q.index + 1), me = (pe) => {
      x.current === $ && (D(J) || pe <= 0 || setTimeout(() => me(pe - 1), 50));
    };
    me(40), q($, Q.stack, Q.index);
  }, [D, q]);
  return l.useEffect(() => {
    i && _c().catch(() => {
    });
  }, [i]), l.useEffect(() => {
    var _a2;
    if (!i) return;
    const $ = x.current, h = s;
    if (z(), A.current && (clearTimeout(A.current), A.current = null), $ && $ !== h) {
      const Q = y();
      H($, Q.stack, Q.index);
    }
    x.current = h, E.current = null, L.current = false;
    const P = Un(r);
    if ((_a2 = Yn(P)) == null ? void 0 : _a2(), !h) {
      u.current = [N.current ?? ""], f.current = 0;
      return;
    }
    const Z = ++T.current;
    let U = false;
    return (async () => {
      let Q = null;
      try {
        Q = await Hc(h);
      } catch (J) {
        console.warn("[editor-undo-history] load failed:", J);
      }
      U || T.current !== Z || x.current === h && ee(h, Q);
    })(), () => {
      U = true;
    };
  }, [i, s, r, z, y, H, ee]), l.useEffect(() => {
    if (!i || !s || E.current !== s || L.current || k.current || t === F.current) return;
    const $ = t ?? "";
    F.current = $;
    const h = at(u.current, f.current, $);
    u.current = h.stack, f.current = h.index, D(h.stack.slice(0, h.index + 1)), q(s, h.stack, h.index);
  }, [i, s, t, D, q]), l.useEffect(() => {
    if (i) return () => {
      z(), A.current && (clearTimeout(A.current), A.current = null);
      const $ = x.current;
      if (!$) return;
      const h = at(u.current, f.current, N.current ?? "");
      Wn({ key: $, stack: h.stack, index: h.index }).catch(() => {
      });
    };
  }, [i, z]), { onChange: l.useCallback(($) => {
    k.current || (F.current = $, L.current = true, n == null ? void 0 : n($), !(!i || !x.current) && (z(), w.current = setTimeout(() => {
      if (w.current = null, k.current) return;
      const h = x.current;
      if (!h) return;
      const P = Bc(u.current, f.current, $);
      P.changed && (u.current = P.stack, f.current = P.index, q(h, P.stack, P.index));
    }, Ic)));
  }, [i, n, z, q]) };
}
const Gt = /^(\s*)([-+*])(\s+)(.*)$/, Xt = /^(\s*)(\d+)([.)])(\s+)(.*)$/, Br = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/, zc = /^(#{1,10})\s+(.*)$/;
function qc(e) {
  if (!e) return false;
  const t = e[0];
  return [...e].every((n) => n === t);
}
function Or(e, t, n, r, i) {
  const s = t - r.length, u = n + i.length;
  if (s < 0 || u > e.length || e.sliceString(s, t) !== r || e.sliceString(n, u) !== i) return false;
  if (r === i && qc(r)) {
    const f = r[0] ?? "";
    if (s > 0 && e.sliceString(s - 1, s) === f || u < e.length && e.sliceString(u, u + 1) === f) return false;
  }
  return true;
}
function Wc(e, t, n, r) {
  const { from: i, to: s, empty: u } = t;
  if (u) {
    const k = `${n}${r}`;
    return { change: { from: i, to: s, insert: k }, next: ce.cursor(i + n.length) };
  }
  const f = e.sliceString(i, s);
  if (f.length >= n.length + r.length && f.startsWith(n) && f.endsWith(r)) {
    const k = f.slice(n.length, f.length - r.length);
    return { change: { from: i, to: s, insert: k }, next: ce.range(i, i + k.length) };
  }
  if (Or(e, i, s, n, r)) {
    const k = i - n.length, w = s + r.length;
    return { change: { from: k, to: w, insert: f }, next: ce.range(k, k + f.length) };
  }
  const x = `${n}${f}${r}`;
  return { change: { from: i, to: s, insert: x }, next: ce.range(i + n.length, i + n.length + f.length) };
}
function Yc(e, t) {
  if (t.empty) return null;
  const n = e.sliceString(t.from, t.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const u = n.slice(r.length, n.length - r.length);
    return { change: { from: t.from, to: t.to, insert: u }, next: ce.range(t.from, t.from + u.length) };
  }
  if (Or(e, t.from, t.to, r, r)) {
    const u = t.from - r.length, f = t.to + r.length;
    return { change: { from: u, to: f, insert: n }, next: ce.range(u, u + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: t.from, to: t.to, insert: s }, next: ce.range(t.from + r.length, t.from + r.length + n.length) };
}
function Vr(e, t) {
  if (!t.length) return false;
  const n = t.map((i) => i.change).filter((i) => !!i).sort((i, s) => i.from - s.from);
  if (!n.length) return false;
  const r = t.map((i) => i.next);
  return e.dispatch({ changes: n, selection: ce.create(r, e.state.selection.mainIndex) }), true;
}
function Re(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.selection.ranges.map((i) => Wc(e.state.doc, i, t, n));
  return Vr(e, r);
}
function Uc(e) {
  return Re(e, "**");
}
function Gc(e) {
  return Re(e, "*");
}
function Xc(e) {
  return Re(e, "~~");
}
function Qc(e) {
  return Re(e, "<u>", "</u>");
}
function Zc(e) {
  return Re(e, "^");
}
function Jc(e) {
  return Re(e, "~");
}
function Kr(e) {
  if (!(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.ranges.map((n) => Yc(e.state.doc, n) ?? { next: n });
  return Vr(e, t);
}
function el(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e.state.selection.ranges) {
    const r = e.state.doc.lineAt(n.from).number, i = e.state.doc.lineAt(n.to).number;
    for (let s = r; s <= i; s += 1) t.add(s);
  }
  return [...t].sort((n, r) => n - r);
}
function Ue(e, t) {
  if (!(e == null ? void 0 : e.state)) return false;
  const n = [];
  for (const r of el(e)) {
    const i = e.state.doc.line(r), s = t(i.text);
    s !== null && s !== i.text && n.push({ from: i.from, to: i.to, insert: s });
  }
  return n.length ? (e.dispatch({ changes: n }), true) : false;
}
function tl(e) {
  const t = e.match(Gt);
  if (t) return `${t[1] ?? ""}1. ${t[4] ?? ""}`;
  const n = e.match(Xt);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function nl(e) {
  const t = e.match(Br);
  if (!t) return null;
  const n = t[1] ?? "", r = t[2] ?? " ", i = t[3] ?? "";
  return `${n}[${r === " " ? "x" : " "}]${i}`;
}
function rl(e) {
  return Ue(e, tl);
}
function ol(e) {
  return Ue(e, nl);
}
function sl(e) {
  return Ue(e, (t) => {
    const n = t.match(Gt);
    if (n) {
      const i = n[1] ?? "", s = n[4] ?? "";
      return Br.test(t) ? `${i}- ${s.replace(/^\[[ xX]\]\s?/, "")}` : `${i}${s}`;
    }
    const r = t.match(Xt);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${t}`;
  });
}
function il(e) {
  return Ue(e, (t) => {
    const n = t.match(Xt);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = t.match(Gt);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${t}`;
  });
}
function Gn(e, t) {
  if (t < 1 || t > 10) return false;
  const n = "#".repeat(t);
  return Ue(e, (r) => {
    var _a2;
    const i = r.match(zc);
    return i ? ((_a2 = i[1]) == null ? void 0 : _a2.length) === t ? i[2] ?? "" : `${n} ${i[2] ?? ""}` : `${n} ${r}`;
  });
}
function Ae(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.changeByRange((i) => {
    if (i.empty) return { range: i };
    const s = e.state.doc.sliceString(i.from, i.to), u = `${t}${s}${n}`;
    return { changes: { from: i.from, to: i.to, insert: u }, range: ce.range(i.from + t.length, i.from + t.length + s.length) };
  });
  return r.changes.empty ? false : (e.dispatch(r), true);
}
function al(e) {
  return Ae(e, "$");
}
function cl(e) {
  return Ae(e, "[", "]");
}
function ll(e) {
  return Ae(e, "(", ")");
}
function dl(e) {
  return Ae(e, "{", "}");
}
function Xn(e) {
  return Ae(e, "'");
}
function Qn(e) {
  return Ae(e, '"');
}
const ul = "s3haim_md_editor_toc_width", fl = 360;
function Zn(e) {
  const t = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), n = [];
  (t ? e.metaKey : e.ctrlKey) && n.push("mod"), e.altKey && n.push("alt"), e.shiftKey && n.push("shift");
  const r = (e.key || "").toLowerCase();
  return !r || r === "shift" || r === "control" || r === "alt" || r === "meta" || (n.push(r), n.length <= 1) ? null : n.join("+");
}
function ct(e) {
  return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
}
const ml = Mo({ nonTightLists: false });
function pl(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const { state: t } = e, n = (_b = (_a2 = t.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof n != "number") return;
  const r = t.doc.lineAt(n);
  if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(r.text) || r.number < 2) return;
  const i = t.doc.line(r.number - 1);
  if (i.text.trim() !== "") return;
  const s = r.from - i.from;
  e.dispatch({ changes: { from: i.from, to: r.from, insert: "" }, selection: ce.cursor(n - s) });
}
function hl(e) {
  return ml(e) ? (pl(e), true) : Oa(e) ? true : jo(e);
}
const gl = Co.highest(sr.of([{ key: "Enter", run: hl }]));
function xl(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const t = (_b = (_a2 = e.state.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return;
  const n = e.state.doc.lineAt(t);
  e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from } });
}
function bl(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const { key: t, code: n } = e;
  return t === "`" || t === "?" || t === "\\" || n === "Backquote" || n === "IntlBackslash";
}
function zr(e, t) {
  if (t.defaultPrevented || t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
  switch (t.key) {
    case "$":
      return al(e);
    case "[":
      return cl(e);
    case "(":
      return ll(e);
    case "{":
      return dl(e);
    case "'":
      return Xn(e);
    case '"':
      return Qn(e);
    default:
      return t.code === "Quote" ? t.shiftKey ? Qn(e) : Xn(e) : false;
  }
}
function lt(e, t) {
  return Js() ? t(e) : false;
}
const wl = [{ key: "Alt-h", preventDefault: true, run: (e) => lt(e, Wo) }, { key: "Alt-j", preventDefault: true, run: (e) => lt(e, Yo) }, { key: "Alt-k", preventDefault: true, run: (e) => lt(e, Uo) }, { key: "Alt-l", preventDefault: true, run: (e) => lt(e, Go) }];
No({ editorConfig: { languageUserDefined: { "ko-KR": Lo }, renderDelay: ur() ? 500 : 0 }, codeMirrorExtensions(e, { keyBindings: t }) {
  const n = [...e].filter((s) => s.type !== "keymap" && s.type !== "linkShortener" && s.type !== "lineNumbers"), r = (t || []).filter((s) => {
    const u = String((s == null ? void 0 : s.key) || "").toLowerCase(), f = String((s == null ? void 0 : s.mac) || "").toLowerCase();
    return u !== "ctrl-d" && u !== "mod-d" && f !== "cmd-d" && u !== "ctrl-b" && u !== "mod-b" && f !== "cmd-b" && u !== "ctrl-u" && u !== "mod-u" && f !== "cmd-u" && u !== "ctrl-o" && u !== "mod-o" && f !== "cmd-o" && u !== "ctrl-arrowup" && u !== "mod-arrowup" && f !== "cmd-arrowup" && u !== "ctrl-arrowdown" && u !== "mod-arrowdown" && f !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(u) && !/^mod-[0-9]$/.test(u) && !/^cmd-[0-9]$/.test(f);
  }), i = [{ key: "ArrowLeft", run: (s) => yn(s, -1) }, { key: "ArrowRight", run: (s) => yn(s, 1) }, { key: "Ctrl-ArrowLeft", mac: "Alt-ArrowLeft", run: (s) => be(s, -1, _o), shift: (s) => be(s, -1, Ho) }, { key: "Ctrl-ArrowRight", mac: "Alt-ArrowRight", run: (s) => be(s, 1, Oo), shift: (s) => be(s, 1, Bo) }, { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: (s) => be(s, -1, Ko), shift: (s) => be(s, -1, Vo) }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: (s) => be(s, 1, qo), shift: (s) => be(s, 1, zo) }, ...wl, { key: "Alt--", preventDefault: true, run: rl }, { key: "Ctrl-Tab", run: ol }, { key: "Ctrl-d", mac: "Cmd-d", preventDefault: true, run: (s) => (Ao(s), true) }, { key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Uc }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: Gc }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: Qc, shift: sl }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: il }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: Xc }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Zc }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: Jc }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => ({ key: `Ctrl-${s}`, mac: `Cmd-${s}`, preventDefault: true, run: (u) => Gn(u, s) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (s) => Gn(s, 10) }, { any: (s, u) => (u.ctrlKey || u.metaKey) && u.altKey && u.code === "KeyC" ? Kr(s) : zr(s, u) }, { key: "Mod-Alt-ArrowUp", run: To }, { key: "Mod-Alt-ArrowDown", run: Ro }, ...r];
  return n.some((s) => s.type === "drawSelection") || n.push({ type: "drawSelection", extension: Po() }), n.push({ type: "cmGlyphRepaintFix", extension: Sc() }), n.push({ type: "markdownSingleNewlineEnter", extension: gl }, { type: "lineNumbers", extension: nc() }, { type: "allowMultipleSelections", extension: Do.allowMultipleSelections.of(true) }, { type: "clickAddsSelectionRange", extension: Ke.clickAddsSelectionRange.of((s) => {
    const u = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return s.altKey || (u ? s.metaKey : s.ctrlKey);
  }) }, { type: "multiCursorPreview", extension: Io({ minSelectionLength: 2, maxMatches: 200 }) }, { type: "keymap", extension: sr.of(i) }, { type: "base64ImageFold", extension: Aa($t()) }, { type: "mermaidBase64Fold", extension: Ha($t()) }, { type: "autocompleteGate", extension: Ke.updateListener.of((s) => {
    Ec(s), !cr() && Fo(s.state) === "active" && $o(s.view);
  }) }), n;
}, markdownItPlugins(e) {
  return Qs(e);
} });
function _l({ value: e, onChange: t, onSave: n, theme: r = "light", currentFile: i = null, previewOnly: s = false, isMobileLayout: u = false, onUploadImage: f, isUploadingEditorImage: x = false, uploadImagePercent: k = 0, onCancelUploadImage: w, onResolveWikiImageUrl: A, snippetConfig: N = { snippets: [] }, llmProviderProfiles: L = [], getImgbbApiKey: E, onOpenViewPath: T, onRequestConvertAllImagesToWiki: F, onRegisterConvertAllImagesToWiki: H, isActiveFile: q = true }) {
  var _a2, _b;
  const z = gs(), y = Jn(), { showAlert: D } = xs(), ee = l.useId(), K = l.useMemo(() => Oi(ee), [ee]), $ = l.useMemo(() => Vi(K), [K]), h = l.useRef(null), P = l.useRef(null), Z = l.useRef(null), U = l.useRef(null), Q = l.useRef(N), J = l.useRef(e), me = l.useRef(i), pe = l.useRef(r), ne = l.useRef("");
  l.useEffect(() => {
    J.current = e, me.current = i, pe.current = r;
  }, [e, i, r]), l.useEffect(() => {
    const { issues: a } = dr(e ?? "");
    if (!a.length) {
      ne.current = "";
      return;
    }
    const c = bs(a);
    c !== ne.current && (ne.current = c, D({ title: "Cover syntax error", message: `note-cover has invalid syntax.

${c}` }));
  }, [e, D]);
  const le = l.useCallback((a = {}) => {
    const c = J.current ?? "", d = me.current;
    ir({ currentFile: d, editorContent: c }), y(ar(d == null ? void 0 : d.id), { state: { value: c, theme: pe.current === "dark" ? "dark" : "light", currentFile: d, ...a.openCoverEdit ? { openCoverEdit: true } : {} } });
  }, [y]), { onChange: B } = Kc({ currentFile: i, value: e, onChange: t, editorRef: h, enabled: !s }), te = Li({ getMarkdown: () => J.current ?? "", setMarkdown: (a) => {
    typeof t == "function" && t(a);
  } }), Pe = l.useRef(te.openAtOffset), De = l.useRef(te.openPreviewTable);
  l.useEffect(() => {
    Pe.current = te.openAtOffset, De.current = te.openPreviewTable;
  }, [te.openAtOffset, te.openPreviewTable]);
  const Ge = l.useRef(null), [Ne, he] = l.useState(false), [je, Ie] = l.useState(null), M = l.useRef(() => {
  }), [C, O] = l.useState(false), [I, se] = l.useState(null), [ue, we] = l.useState(0), [ye, Me] = l.useState(false), [Xe, ve] = l.useState(false), Qe = l.useRef({ from: 0, to: 0 }), Fe = l.useRef(B);
  l.useEffect(() => {
    Fe.current = B;
  }, [B]);
  const [Qt, Ze] = l.useState(null), [re, $e] = l.useState(null), [qr, ke] = l.useState(false), [He, gt] = l.useState(null), [Wr, xt] = l.useState(false), [fe, Yr] = l.useState(null), [Je, bt] = l.useState(null), ge = l.useRef(null), [wt, Zt] = Fi(), [_e, Jt] = Ea(), [en, tn] = Sa(), [Ur, et] = Ca(), ae = l.useMemo(() => ur(), []), oe = ae ? false : Ur, yt = l.useRef(null);
  l.useEffect(() => {
    if (s) return;
    const a = () => {
      var _a3, _b2, _c2;
      const p = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      p && (yt.current = p.state.selection);
    }, c = (m) => {
      !(m.metaKey || m.ctrlKey) || m.altKey || m.shiftKey || m.key.toLowerCase() === "k" && a();
    };
    window.addEventListener("keydown", c, true);
    const d = ws(a);
    return () => {
      window.removeEventListener("keydown", c, true), d();
    };
  }, [s]), l.useEffect(() => {
    if (s) return;
    const a = () => {
      var _a3;
      return ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current;
    }, c = () => {
      var _a3, _b2;
      const v = (_b2 = (_a3 = a()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3), j = yt.current;
      !v || !j || v.dispatch({ selection: j, scrollIntoView: true });
    }, d = (g) => {
      var _a3;
      const v = a();
      v && (c(), (_a3 = v.focus) == null ? void 0 : _a3.call(v), typeof v.execCommand == "function" && v.execCommand(g));
    }, m = () => {
      var _a3, _b2, _c2;
      const g = a();
      if (!g) return;
      const v = `

<pgbr/>

`;
      if (typeof g.insert == "function") {
        g.insert(() => ({ targetValue: v, select: false, deviationStart: 0, deviationEnd: 0 })), (_a3 = g.focus) == null ? void 0 : _a3.call(g);
        return;
      }
      const j = (_b2 = g.getEditorView) == null ? void 0 : _b2.call(g);
      j && (j.dispatch(j.state.replaceSelection(v)), (_c2 = j.focus) == null ? void 0 : _c2.call(j));
    }, p = (g = {}) => {
      le(g);
    }, b = {};
    for (const g of ys) g.directive && (b[g.id] = () => d(g.directive));
    return b["editor-revoke"] = () => {
      var _a3, _b2;
      c();
      const g = (_b2 = (_a3 = a()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      g && (g.focus(), ko(g));
    }, b["editor-next"] = () => {
      var _a3, _b2;
      c();
      const g = (_b2 = (_a3 = a()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      g && (g.focus(), Eo(g));
    }, b["editor-llm-assist"] = () => {
      var _a3;
      return (_a3 = z == null ? void 0 : z.toggleAssist) == null ? void 0 : _a3.call(z);
    }, b["editor-export-pdf"] = p, b["editor-pgbr"] = () => {
      c(), m();
    }, b["editor-heading-remap"] = () => {
      c(), M.current();
    }, b["editor-checklist-progress"] = () => O(true), b["editor-table-edit"] = () => {
      var _a3, _b2;
      c();
      const g = (_b2 = (_a3 = a()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      if (!g) return;
      const { from: v, to: j } = g.state.selection.main;
      Pe.current(v, j) || D({ title: "No table", message: "No haim-table found at the cursor or selection position." });
    }, b["editor-image-upload"] = () => {
      const g = document.createElement("input");
      g.type = "file", g.accept = "image/*", g.multiple = true, g.onchange = () => {
        var _a3;
        const v = Array.from(g.files || []);
        v.length && ((_a3 = Ge.current) == null ? void 0 : _a3.call(Ge, v));
      }, g.click();
    }, b["editor-image-clip"] = () => {
      const g = document.createElement("input");
      g.type = "file", g.accept = "image/*", g.onchange = () => {
        var _a3;
        const v = (_a3 = g.files) == null ? void 0 : _a3[0];
        v && Ze(v);
      }, g.click();
    }, b["editor-convert-all-images-to-wiki"] = () => {
      typeof F == "function" && F();
    }, b["editor-insert-footnote"] = () => {
      un({ mode: "footnote-insert" });
    }, b["editor-insert-circle-number"] = (g) => {
      var _a3, _b2, _c2;
      const v = typeof g == "string" ? g : "";
      if (!v) {
        un({ mode: "circle-number" });
        return;
      }
      c();
      const _ = (_b2 = (_a3 = a()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      _ && (_.dispatch(_.state.replaceSelection(v)), (_c2 = _.focus) == null ? void 0 : _c2.call(_));
    }, b["editor-insert-snippet"] = (g) => {
      var _a3, _b2, _c2;
      const v = typeof g == "string" ? g : "";
      if (!v) return;
      c();
      const _ = (_b2 = (_a3 = a()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      _ && (_.dispatch(_.state.replaceSelection(v)), (_c2 = _.focus) == null ? void 0 : _c2.call(_));
    }, vs(b);
  }, [s, le, D, F, z]);
  const vt = z == null ? void 0 : z.registerEditorBridge;
  l.useEffect(() => {
    if (s || !q || !vt) return;
    const a = () => {
      const c = h.current;
      if (!c) return null;
      if (typeof c.getEditorView == "function" || typeof c.getSelectedText == "function") return c;
      const d = c.value;
      return d && (typeof d.getEditorView == "function" || typeof d.getSelectedText == "function") ? d : null;
    };
    return vt({ editorRef: h, getEditorApi: a, onChange: B, getMarkdown: () => {
      var _a3, _b2, _c2, _d, _e2, _f;
      return ((_f = (_e2 = (_d = (_c2 = (_b2 = (_a3 = a()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3)) == null ? void 0 : _c2.state) == null ? void 0 : _d.doc) == null ? void 0 : _e2.toString) == null ? void 0 : _f.call(_e2)) ?? J.current ?? "";
    } });
  }, [s, q, vt, B]), l.useEffect(() => {
    if (s) return;
    const a = () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? null;
    }, c = () => {
      const m = a(), p = yt.current;
      !m || !p || m.dispatch({ selection: p, scrollIntoView: true });
    }, d = (m, p) => {
      var _a3, _b2;
      const b = a();
      b && (b.dispatch({ changes: { from: 0, to: b.state.doc.length, insert: m }, selection: { anchor: p }, scrollIntoView: true }), (_a3 = b.focus) == null ? void 0 : _a3.call(b)), (_b2 = Fe.current) == null ? void 0 : _b2.call(Fe, m);
    };
    return ks({ getMarkdown: () => {
      var _a3;
      return ((_a3 = a()) == null ? void 0 : _a3.state.doc.toString()) ?? J.current ?? "";
    }, insertExisting: (m) => {
      c();
      const p = a(), b = (p == null ? void 0 : p.state.doc.toString()) ?? J.current ?? "", g = p == null ? void 0 : p.state.selection.main, v = Zs(b, (g == null ? void 0 : g.from) ?? 0, (g == null ? void 0 : g.to) ?? 0, m);
      d(v.next, v.caret);
    }, openCompose: () => {
      var _a3;
      c();
      const p = (_a3 = a()) == null ? void 0 : _a3.state.selection.main;
      Qe.current = { from: (p == null ? void 0 : p.from) ?? 0, to: (p == null ? void 0 : p.to) ?? 0 }, ve(true);
    } });
  }, [s]);
  const { width: tt, isResizing: Gr, handleProps: Xr } = Es({ storageKey: ul, defaultWidth: fl, minWidth: 160, collapseBelowWidth: 80, maxWidth: 640, edge: "right", onCollapseBelowMin: () => {
    var _a3, _b2, _c2;
    (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c2.call(_b2, false);
  } }), nt = l.useMemo(() => {
    const { meta: a } = Ss(e ?? "");
    return a;
  }, [e]), Qr = l.useMemo(() => {
    const a = nt == null ? void 0 : nt.fonts;
    return a ? { "--print-font-body": st(a.body), "--print-font-heading": st(a.heading), "--print-font-bold": st(a.bold), "--print-font-code": st(a.code, "mono") } : {};
  }, [nt]);
  l.useEffect(() => {
    Q.current = N || { snippets: [] };
  }, [N]), l.useEffect(() => {
    const a = () => {
      var _a3, _b2, _c2;
      const p = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return p ? (Pa(p, _e), _a(p, _e), true) : false;
    };
    if (a()) return;
    const c = window.setTimeout(a, 50), d = window.setTimeout(a, 250);
    return () => {
      window.clearTimeout(c), window.clearTimeout(d);
    };
  }, [_e]), l.useEffect(() => {
    const a = P.current;
    if (!a) return;
    const c = () => {
      const m = a.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
      Yr((p) => p === m ? p : m);
    };
    c();
    const d = new MutationObserver(c);
    return d.observe(a, { childList: true, subtree: true }), () => d.disconnect();
  }, []), l.useEffect(() => {
    const a = P.current;
    a && a.style.setProperty("--md-catalog-width", `${tt}px`);
  }, [tt]), l.useLayoutEffect(() => {
    if (!fe) {
      bt(null);
      return;
    }
    const a = () => {
      const m = fe.getBoundingClientRect();
      if (m.width <= 0 || m.height <= 0) {
        bt(null);
        return;
      }
      bt({ top: m.top, left: m.left, height: m.height });
    };
    a();
    const c = new ResizeObserver(a);
    c.observe(fe);
    const d = P.current;
    return d && c.observe(d), window.addEventListener("resize", a), window.addEventListener("scroll", a, true), () => {
      c.disconnect(), window.removeEventListener("resize", a), window.removeEventListener("scroll", a, true);
    };
  }, [fe, tt]), l.useEffect(() => {
    if (fe) return Yi(fe, { getEditorRoot: () => P.current, mdHeadingId: (a) => $(a) });
  }, [fe, $]), _i(P, e, A, (i == null ? void 0 : i.id) ?? null), Cs(P, { layoutKey: r }), l.useEffect(() => {
    const a = P.current;
    if (!a || !e) return;
    let c = 0;
    const d = () => {
      ac(a, e, A);
    }, m = () => {
      const j = a.querySelectorAll("[data-note-cover-mount]");
      !j.length || !(a.querySelector(".md-note-cover-placeholder--pending") || [...j].some((X) => X.childNodes.length === 0)) || c || (c = window.requestAnimationFrame(() => {
        c = 0, d();
      }));
    }, b = [0, 80, 280, 600, 1100, 2e3].map((j) => setTimeout(d, j)), g = a.querySelector(".md-editor-preview") || a, v = typeof MutationObserver < "u" ? new MutationObserver(m) : null;
    return v == null ? void 0 : v.observe(g, { childList: true, subtree: true }), () => {
      c && window.cancelAnimationFrame(c), b.forEach((j) => clearTimeout(j)), v == null ? void 0 : v.disconnect();
    };
  }, [e, A, i == null ? void 0 : i.id]), l.useEffect(() => {
    const a = P.current;
    return () => {
      cc(a);
    };
  }, []), l.useEffect(() => {
    if (s) return;
    const a = Ka(i), c = () => {
      var _a3, _b2, _c2;
      const p = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return p ? (Ga(p, a), true) : false;
    };
    if (c()) return;
    const d = [50, 200, 500, 1e3].map((m) => setTimeout(c, m));
    return () => d.forEach((m) => clearTimeout(m));
  }, [i == null ? void 0 : i.id, i == null ? void 0 : i.type, s]), l.useEffect(() => {
    var _a3, _b2, _c2;
    if (s) return;
    const c = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    Ns(c);
  }, [i == null ? void 0 : i.id, s]), l.useEffect(() => {
    if (s) return;
    let a = null, c = null;
    const d = () => {
      var _a3, _b2, _c2;
      const b = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return !b || b === c ? !!b : (a == null ? void 0 : a(), c = b, a = Vs(b), true);
    };
    if (d()) return () => {
      a == null ? void 0 : a();
    };
    const m = [50, 200, 500, 1e3].map((p) => setTimeout(d, p));
    return () => {
      m.forEach((p) => clearTimeout(p)), a == null ? void 0 : a();
    };
  }, [s, i == null ? void 0 : i.id]), l.useEffect(() => {
    const a = P.current;
    if (!a) return;
    const c = wc(i), d = { current: [] };
    let m = false, p = null, b = null, g = [];
    const v = () => a.querySelector(".md-editor-preview"), j = () => {
      if (m) return;
      const V = v();
      if (!V || !pc(V)) return;
      const ie = xc(V, { collapsedIds: d.current, onCollapsedChange: (R) => {
        d.current = R, c && vc(c, R);
      } }), S = p;
      p = () => {
        S == null ? void 0 : S(), ie();
      };
    }, _ = (V) => {
      !V || b || typeof MutationObserver > "u" || (b = new MutationObserver(j), b.observe(V, { childList: true, subtree: true }));
    };
    return (async () => {
      if (c) {
        const V = await yc(c);
        if (m) return;
        V && (d.current = V);
      }
      m || (_(v()), j(), g = [80, 250, 600].map((V) => setTimeout(() => {
        m || (_(v()), j());
      }, V)));
    })(), () => {
      m = true, g.forEach((V) => clearTimeout(V)), b == null ? void 0 : b.disconnect(), b = null, p == null ? void 0 : p(), p = null;
    };
  }, [i == null ? void 0 : i.id, i == null ? void 0 : i.type]), l.useEffect(() => {
    var _a3, _b2, _c2;
    if (!s) return;
    (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
  }, [s]), l.useEffect(() => {
    if (!u || s || !(i == null ? void 0 : i.id)) return;
    et(false);
    const a = () => {
      var _a3, _b2, _c2;
      (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
    };
    a();
    const c = [80, 240, 600].map((d) => setTimeout(a, d));
    return () => {
      c.forEach((d) => clearTimeout(d));
    };
  }, [u, s, i == null ? void 0 : i.id, et]), l.useEffect(() => {
    if (s || ae) return;
    const a = P.current;
    if (!a) return;
    const c = () => a.querySelector(".md-editor-preview"), d = () => oe;
    let m = null;
    const p = (S) => S instanceof Element ? Ct(S) ? true : !!S.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, b = (S) => {
      var _a3, _b2, _c2, _d, _e2, _f;
      const R = c();
      if (!R || Ve(R)) return;
      if (!d()) {
        const W = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window);
        (W == null ? void 0 : W.rangeCount) && R.contains(W.getRangeAt(0).commonAncestorContainer) && !W.getRangeAt(0).collapsed ? jt(R, { allowCollapsed: false }) : Oe(R);
        return;
      }
      const G = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
      if (!G || G.rangeCount === 0) {
        if (!(S instanceof Element) || !S.closest("td, th")) return;
      } else {
        const W = G.getRangeAt(0);
        if (!R.contains(W.commonAncestorContainer) && !(S instanceof Element && S.closest("td, th"))) return;
      }
      const Y = (_e2 = (_d = ((_c2 = h.current) == null ? void 0 : _c2.value) ?? h.current) == null ? void 0 : _d.getEditorView) == null ? void 0 : _e2.call(_d);
      Y && ((G == null ? void 0 : G.rangeCount) && R.contains(G.getRangeAt(0).commonAncestorContainer) && jt(R, { allowCollapsed: true }), xn(Y, R, { focus: true, target: S }), Mt(), (_f = U.current) == null ? void 0 : _f.schedule({ withRetries: true }));
    }, g = (S) => S.button === 2 || S.button === 0 && S.ctrlKey, v = (S, R) => bn(R, S.clientX, S.clientY) ? true : wn(S.clientX, S.clientY) ? Xs(R) : false, j = (S) => {
      var _a3, _b2, _c2, _d;
      const R = c();
      if (!R) return;
      const G = S.target;
      if (!(G instanceof Node)) return;
      if (R.contains(G) && g(S)) {
        v(S, R);
        return;
      }
      if (R.contains(G)) {
        m = { x: S.clientX, y: S.clientY }, !Ct(G) && !d() && Oe(R);
        return;
      }
      if (m = null, (_d = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d.dom.contains(G)) {
        if (g(S)) return;
        Lt(), d() || Oe(R);
      }
    }, _ = (S) => {
      const R = c();
      !R || !(S.target instanceof Node) || !R.contains(S.target) || v(S, R);
    }, X = (S) => {
      var _a3, _b2, _c2;
      if (g(S)) return;
      const R = c();
      if (!(!R || !(S.target instanceof Node) || !R.contains(S.target)) && !p(S.target)) {
        if (Nt(a)) {
          const G = !!(m && Math.hypot(S.clientX - m.x, S.clientY - m.y) > 6);
          if (m = null, !d() || G) return;
          const Y = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), W = S.target instanceof Element ? hn(S.target, R) : null;
          Y && W && (Mt(), gn(W, Y, R, S.clientX, S.clientY));
          return;
        }
        m = null, requestAnimationFrame(() => b(S.target));
      }
    }, V = (S) => {
      var _a3, _b2, _c2, _d;
      const R = c();
      if (!(!R || !(S.target instanceof Node) || !R.contains(S.target)) && !p(S.target)) {
        if (Nt(a)) {
          if (!d()) return;
          const de = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), Y = (_d = S.changedTouches) == null ? void 0 : _d[0], W = S.target instanceof Element ? hn(S.target, R) : null;
          de && W && Y && (Mt(), gn(W, de, R, Y.clientX, Y.clientY));
          return;
        }
        requestAnimationFrame(() => b(S.target));
      }
    }, ie = (S) => {
      var _a3, _b2, _c2, _d, _e2;
      if (!d() || S.isComposing || S.keyCode === 229 || S.key === "Process" || (S.metaKey || S.ctrlKey) && (S.key === "s" || S.key === "S" || S.code === "KeyS") || Ct(S.target)) return;
      const R = c();
      if (!R || Ve(R) || Nt(a)) return;
      const G = S.target, de = G instanceof Node && R.contains(G), Y = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), W = (Y == null ? void 0 : Y.rangeCount) > 0 && R.contains(Y.getRangeAt(0).commonAncestorContainer);
      if (!de && !W) return;
      const Ee = (_d = (_c2 = ((_b2 = h.current) == null ? void 0 : _b2.value) ?? h.current) == null ? void 0 : _c2.getEditorView) == null ? void 0 : _d.call(_c2);
      Ee && (Ee.hasFocus || (W ? (jt(R, { allowCollapsed: true }), xn(Ee, R, { focus: true }), (_e2 = U.current) == null ? void 0 : _e2.schedule({ withRetries: true })) : Ee.focus()));
    };
    return a.addEventListener("mousedown", j, true), a.addEventListener("contextmenu", _, true), a.addEventListener("mouseup", X), a.addEventListener("touchend", V, { passive: true }), a.addEventListener("keydown", ie, true), () => {
      Oe(c()), a.removeEventListener("mousedown", j, true), a.removeEventListener("contextmenu", _, true), a.removeEventListener("mouseup", X), a.removeEventListener("touchend", V), a.removeEventListener("keydown", ie, true);
    };
  }, [s, oe, ae]), l.useEffect(() => {
    var _a3, _b2, _c2, _d;
    if (s) {
      (_a3 = Z.current) == null ? void 0 : _a3.stop(), Z.current = null, (_b2 = U.current) == null ? void 0 : _b2.stop(), U.current = null, Lt();
      return;
    }
    const a = P.current, c = () => {
      var _a4;
      return (_a4 = a ?? P.current) == null ? void 0 : _a4.querySelector(".md-editor-preview");
    }, d = () => {
      var _a4, _b3, _c3;
      return (_c3 = (_b3 = ((_a4 = h.current) == null ? void 0 : _a4.value) ?? h.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c3.call(_b3);
    };
    (_c2 = Z.current) == null ? void 0 : _c2.stop();
    const m = Dc({ getPreviewRoot: c, getView: d });
    Z.current = m, (_d = U.current) == null ? void 0 : _d.stop(), U.current = null, oe ? U.current = jc({ getPreviewRoot: c, getView: d }) : Lt();
    const p = kc((b, g) => {
      var _a4;
      const v = d();
      !v || b !== v || (m.schedule({ withRetries: g.docChanged }), oe && ((_a4 = U.current) == null ? void 0 : _a4.schedule({ withRetries: g.docChanged })));
    });
    return () => {
      var _a4, _b3;
      p(), (_a4 = U.current) == null ? void 0 : _a4.stop(), U.current = null, (_b3 = Z.current) == null ? void 0 : _b3.stop(), Z.current = null;
    };
  }, [s, oe]), l.useEffect(() => {
    if (s || ae || !oe) {
      js();
      return;
    }
    const a = P.current;
    if (a) return Ms(a, { getPreviewRoot: () => a.querySelector(".md-editor-preview"), getView: () => {
      var _a3, _b2, _c2;
      return (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    }, isEnabled: () => oe });
  }, [s, oe, ae]), l.useEffect(() => {
    var _a3, _b2, _c2;
    const c = (_a3 = P.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
    if (Ls(), !!c && ((_b2 = Z.current) == null ? void 0 : _b2.schedule({ withRetries: true }), !ae)) {
      if (oe && !Ve(c)) {
        (_c2 = U.current) == null ? void 0 : _c2.schedule({ withRetries: true });
        return;
      }
      oe || Oe(c);
    }
  }, [e, i == null ? void 0 : i.id, oe, ae]), l.useEffect(() => {
    if (s) return;
    const a = () => {
      var _a3;
      const c = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current;
      return (c == null ? void 0 : c.domEventHandlers) ? (c.domEventHandlers({ paste: (d, m) => {
        const p = d.clipboardData;
        if (!p || !m) return;
        const b = Hi(p);
        if (b.length && typeof f == "function") {
          if (x) return d.preventDefault(), false;
          d.preventDefault();
          const v = m;
          return f(b).then((j) => {
            var _a4, _b2, _c2;
            if (!(j == null ? void 0 : j.length)) return;
            const _ = j.map((ie) => `![[${ie}]]`).join(`
`), V = ((_c2 = (_b2 = ((_a4 = h.current) == null ? void 0 : _a4.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? v;
            V && V.dispatch(V.state.replaceSelection(_));
          }), false;
        }
        const g = p.getData("text/plain") ?? "";
        if (g) return d.preventDefault(), m.dispatch(m.state.replaceSelection(g)), false;
      }, keydown: (d, m) => {
        var _a4;
        if (!m) return;
        if (!m.composing && bl(d) && Kr(m) || !m.composing && zr(m, d)) return d.preventDefault(), d.stopPropagation(), true;
        const p = Zn(d);
        if (!p) return;
        if (p === "mod+shift+enter") return d.preventDefault(), d.stopPropagation(), xl(m), false;
        if (p === "mod+s") return;
        const g = ((_a4 = Q.current) == null ? void 0 : _a4.snippets) || [], v = ct(p), j = g.find((_) => ct(_.prefix) === v && (_.body || "").trim());
        if (j) return d.preventDefault(), d.stopPropagation(), m.dispatch(m.state.replaceSelection(j.body)), false;
      } }), true) : false;
    };
    if (!a()) {
      const c = setTimeout(a, 100);
      return () => clearTimeout(c);
    }
  }, [s, f, x]), l.useEffect(() => {
    if (s) return;
    const a = (c) => {
      var _a3, _b2, _c2, _d, _e2, _f;
      const d = Zn(c);
      if (!d || d === "mod+s") return;
      const p = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      if (!p) return;
      const b = P.current, g = c.target;
      if (!(b == null ? void 0 : b.contains(g)) && !((_d = p.dom) == null ? void 0 : _d.contains(g))) return;
      const j = ((_e2 = Q.current) == null ? void 0 : _e2.snippets) || [], _ = ct(d), X = j.find((V) => ct(V.prefix) === _ && (V.body || "").trim());
      X && (c.preventDefault(), c.stopPropagation(), (_f = c.stopImmediatePropagation) == null ? void 0 : _f.call(c), p.dispatch(p.state.replaceSelection(X.body)));
    };
    return document.addEventListener("keydown", a, true), () => document.removeEventListener("keydown", a, true);
  }, [s, N]), l.useEffect(() => {
    if (typeof n != "function") return;
    const a = (c) => {
      var _a3, _b2, _c2, _d, _e2;
      if (!(c.ctrlKey || c.metaKey) || c.altKey || c.key !== "s" && c.key !== "S" && c.code !== "KeyS") return;
      const d = P.current;
      if (!d) return;
      const m = c.target, p = m instanceof Node && d.contains(m), b = d.querySelector(".md-editor-preview"), g = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), v = !!(b && (g == null ? void 0 : g.rangeCount) && b.contains(g.getRangeAt(0).commonAncestorContainer));
      if (!p && !v && !Ve(b)) return;
      c.preventDefault(), c.stopPropagation(), (_b2 = c.stopImmediatePropagation) == null ? void 0 : _b2.call(c);
      const _ = (_e2 = (_d = ((_c2 = h.current) == null ? void 0 : _c2.value) ?? h.current) == null ? void 0 : _d.getEditorView) == null ? void 0 : _e2.call(_d);
      Ks(_), n();
    };
    return document.addEventListener("keydown", a, true), () => document.removeEventListener("keydown", a, true);
  }, [n]), l.useEffect(() => {
    const a = P.current;
    if (!a) return;
    const c = (d) => {
      var _a3, _b2, _c2, _d, _e2, _f, _g, _h, _i2;
      const m = a.querySelector(".md-editor-preview"), p = (_b2 = (_a3 = d.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "table");
      if (p && m && m.contains(p) || m && (bn(m, d.clientX, d.clientY) || wn(d.clientX, d.clientY))) return;
      const b = (_d = (_c2 = d.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, ".cm-editor");
      if (b && a.contains(b)) {
        const X = (_g = (_f = ((_e2 = h.current) == null ? void 0 : _e2.value) ?? h.current) == null ? void 0 : _f.getEditorView) == null ? void 0 : _g.call(_f);
        if (X) {
          const { from: V, to: ie } = X.state.selection.main, S = J.current ?? "";
          if (zs(S, V, ie)) {
            d.preventDefault(), Pe.current(V, ie);
            return;
          }
        }
      }
      const g = (_i2 = (_h = d.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
      if (!g || !a.contains(g)) return;
      const v = qs(g);
      if (!v.kind || !v.key) return;
      d.preventDefault();
      const j = v.kind === "wiki" ? Ws(a, g, v.key) : Ys(a, g, v.key);
      se({ kind: v.kind, key: v.key, width: v.width, height: v.height, occurrence: j, imageSrc: g.currentSrc || g.src || "" });
    };
    return a.addEventListener("contextmenu", c), () => a.removeEventListener("contextmenu", c);
  }, [D]), l.useEffect(() => {
    const a = P.current;
    if (!a) return;
    const c = (d) => {
      var _a3, _b2, _c2, _d;
      if ((_b2 = (_a3 = d.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const m = a.querySelector(".md-editor-preview"), p = (_d = (_c2 = d.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, "table");
      if (!p || !m || !m.contains(p)) return;
      d.preventDefault(), d.stopPropagation(), De.current(p, m) || D({ title: "No table", message: "No haim-table found at this position. Click inside a table cell and try again." });
    };
    return a.addEventListener("dblclick", c, true), () => a.removeEventListener("dblclick", c, true);
  }, [D]), l.useEffect(() => {
    const a = P.current;
    if (a) return Ti(a);
  }, []), l.useEffect(() => {
    const a = () => {
      we((c) => c + 1);
    };
    return window.addEventListener(fn, a), () => {
      window.removeEventListener(fn, a);
    };
  }, []), l.useEffect(() => {
    const a = P.current;
    if (!a) return;
    const c = (p) => {
      (p.classList.contains("md-note-cover-placeholder--ready") || p.classList.contains("md-note-cover-placeholder--empty") || p.classList.contains("md-note-cover-placeholder--pending")) && xt(true);
    }, d = (p) => {
      var _a3, _b2, _c2, _d, _e2, _f;
      const b = (_b2 = (_a3 = p.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      if (b && a.contains(b)) {
        p.preventDefault(), p.stopPropagation(), c(b);
        return;
      }
      const g = (_d = (_c2 = p.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, "[data-chat-saved-note]");
      if (g && a.contains(g)) {
        p.preventDefault(), p.stopPropagation(), y(Us({ id: g.getAttribute("data-chat-id") || "", href: g.getAttribute("data-chat-href") || g.getAttribute("href") || "" }));
        return;
      }
      const v = (_f = (_e2 = p.target) == null ? void 0 : _e2.closest) == null ? void 0 : _f.call(_e2, "a[href]");
      if (!v || !a.contains(v) || p.metaKey || p.ctrlKey || p.shiftKey || p.altKey || typeof p.button == "number" && p.button !== 0 || v.hasAttribute("data-md-footnote-to")) return;
      const j = v.getAttribute("href") || "", _ = Gs(j, { currentViewPath: (i == null ? void 0 : i.type) ? i.id : null });
      if (_.kind !== "app") return;
      if (p.preventDefault(), p.stopPropagation(), _.viewPath && typeof T == "function") {
        T(_.viewPath);
        return;
      }
      const X = _.search || "", V = _.hash || "";
      y(`${_.pathname || "/"}${X}${V}`);
    }, m = (p) => {
      var _a3, _b2;
      if (p.key !== "Enter" && p.key !== " ") return;
      const b = (_b2 = (_a3 = p.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      !b || !a.contains(b) || (p.preventDefault(), p.stopPropagation(), c(b));
    };
    return a.addEventListener("click", d), a.addEventListener("keydown", m), () => {
      a.removeEventListener("click", d), a.removeEventListener("keydown", m);
    };
  }, [y, i == null ? void 0 : i.id, i == null ? void 0 : i.type, T]);
  const Zr = l.useCallback(({ width: a, height: c }) => {
    const d = I;
    if (!(d == null ? void 0 : d.key) || typeof B != "function") return;
    const m = d.kind === "wiki" ? Et(e, { path: d.key, occurrence: d.occurrence ?? 0, width: a, height: c }) : St(e, { src: d.key, occurrence: d.occurrence ?? 0, width: a, height: c });
    m.updated && m.markdown !== e && B(m.markdown);
  }, [I, B, e]), Jr = l.useCallback(async ({ file: a }) => {
    var _a3;
    const c = I;
    if (!(c == null ? void 0 : c.key) || typeof f != "function") throw new Error("Upload handler not available.");
    const m = (_a3 = await f([a])) == null ? void 0 : _a3[0];
    if (!m) throw new Error("Upload succeeded but no path was returned.");
    if (typeof B != "function") return;
    const p = c.kind === "wiki" ? Ts(e, { path: c.key, occurrence: c.occurrence ?? 0, nextPath: m }) : mn(e, { src: c.key, occurrence: c.occurrence ?? 0, nextPath: m });
    p.updated && p.markdown !== e && B(p.markdown);
  }, [B, f, e, I]), eo = l.useCallback(async ({ width: a, height: c }) => {
    var _a3;
    const d = I;
    if (!(d == null ? void 0 : d.key) || d.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
    if (typeof B != "function") throw new Error("Cannot apply change.");
    const m = await Rs({ markdownSrc: d.key, displaySrc: d.imageSrc, currentNotePath: (i == null ? void 0 : i.id) ?? null });
    let p = "";
    if (m.mode === "path") p = m.path;
    else {
      if (typeof f != "function") throw new Error("Upload handler not available.");
      if (p = ((_a3 = await f([m.file])) == null ? void 0 : _a3[0]) || "", !p) throw new Error("Upload succeeded but no path was returned.");
    }
    const b = mn(e, { src: d.key, occurrence: d.occurrence ?? 0, nextPath: p, width: a, height: c });
    b.updated && b.markdown !== e && B(b.markdown);
  }, [i == null ? void 0 : i.id, B, f, e, I]), to = l.useCallback(async ({ width: a, height: c }) => {
    const d = I;
    if (!(d == null ? void 0 : d.key) || !(d == null ? void 0 : d.kind)) throw new Error("Cannot convert: image target is missing.");
    if (typeof B != "function") throw new Error("Cannot apply change.");
    const m = typeof E == "function" ? String(await Promise.resolve(E()) || "").trim() : "";
    if (!m) throw new Error("ImgBB API key is missing. Please add it in settings.");
    const p = As({ path: d.key, imageSrc: d.imageSrc });
    if (!p) throw new Error("Cannot determine image source URL for upload.");
    const g = (await Ps({ apiKey: m, image: p, name: Ds(d.key) ? "image" : void 0 })).url, v = d.occurrence ?? 0;
    let j = e;
    const _ = d.kind === "wiki" ? Et(j, { path: d.key, occurrence: v, width: a, height: c }) : St(j, { src: d.key, occurrence: v, width: a, height: c });
    _.updated && (j = _.markdown);
    const X = await Is(j, { kind: d.kind === "wiki" ? "wiki" : "markdown", key: d.key, occurrence: v }, g);
    if (!X.updated && j === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
    B(X.markdown);
  }, [E, B, e, I]);
  l.useEffect(() => {
    if (typeof H == "function") return H(async () => {
      if (s) throw new Error("Cannot convert images in preview-only mode.");
      if (typeof B != "function") throw new Error("Cannot apply change.");
      if (!Fs(e)) return { markdown: e, converted: 0, failed: [] };
      const a = await $s(e, { currentNotePath: (i == null ? void 0 : i.id) ?? null, uploadFiles: async (c) => {
        if (typeof f != "function") throw new Error("Upload handler not available.");
        return f(c);
      } });
      return a.markdown !== e && B(a.markdown), a;
    }), () => H(null);
  }, [i == null ? void 0 : i.id, B, H, f, s, e]);
  const xe = l.useCallback((a) => {
    const c = P.current;
    if (!c || !(a == null ? void 0 : a.kind) || !(a == null ? void 0 : a.key)) return null;
    const d = a.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...c.querySelectorAll(d)].filter((b) => (a.kind === "wiki" ? b.getAttribute("data-wiki-path") : b.getAttribute("data-md-src")) === a.key)[a.occurrence ?? 0] ?? null;
  }, []), nn = l.useCallback(({ kind: a, key: c, occurrence: d, widthPx: m, heightPx: p }) => {
    if (!c || typeof B != "function") return false;
    const b = Number.isFinite(m) ? `${Math.round(m)}px` : null, g = Number.isFinite(p) ? `${Math.round(p)}px` : null, v = a === "wiki" ? Et(e, { path: c, occurrence: d, width: b, height: g }) : St(e, { src: c, occurrence: d, width: b, height: g });
    return v.updated && v.markdown !== e ? (B(v.markdown), true) : false;
  }, [B, e]), no = l.useCallback(() => {
    const a = I;
    if (!(a == null ? void 0 : a.kind) || !(a == null ? void 0 : a.key)) return;
    const c = xe(a);
    if (!c) return;
    const d = c.getBoundingClientRect(), m = Math.max(24, Math.round(d.width)), p = Math.max(24, Math.round(d.height)), b = { kind: a.kind, key: a.key, occurrence: a.occurrence ?? 0, widthPx: m, heightPx: p, originalWidthPx: m, originalHeightPx: p };
    c.style.width = `${m}px`, c.style.height = `${p}px`, ge.current = b, $e(b), ke(false);
  }, [xe, I]);
  l.useEffect(() => {
    if (!re) {
      gt(null);
      return;
    }
    const a = xe(re);
    if (!a) {
      $e(null), gt(null);
      return;
    }
    let c = 0;
    const d = () => {
      const m = a.getBoundingClientRect();
      gt({ left: m.left, top: m.top, width: m.width, height: m.height }), c = requestAnimationFrame(d);
    };
    return c = requestAnimationFrame(d), () => cancelAnimationFrame(c);
  }, [re, xe]), l.useEffect(() => {
    if (!re) return;
    const a = xe(re);
    if (!a) return;
    const c = (p) => {
      var _a3, _b2;
      const b = (_b2 = (_a3 = p.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!b) return;
      p.preventDefault();
      const g = b.getAttribute("data-transform-handle");
      if (!g) return;
      const v = p.pointerType === "touch", j = ge.current || re, _ = p.clientX, X = p.clientY, V = j.heightPx > 0 ? j.widthPx / j.heightPx : 1, ie = (R) => {
        const G = R.clientX - _, de = R.clientY - X;
        let Y = j.widthPx, W = j.heightPx;
        if (g.includes("e") && (Y = j.widthPx + G), g.includes("w") && (Y = j.widthPx - G), g.includes("s") && (W = j.heightPx + de), g.includes("n") && (W = j.heightPx - de), Y = Math.max(24, Y), W = Math.max(24, W), v || R.shiftKey) {
          const uo = Math.abs((Y - j.widthPx) / Math.max(1, j.widthPx)), fo = Math.abs((W - j.heightPx) / Math.max(1, j.heightPx));
          uo >= fo ? W = Math.max(24, Y / Math.max(1e-4, V)) : Y = Math.max(24, W * V);
        }
        Y = Math.max(24, Math.round(Y)), W = Math.max(24, Math.round(W)), a.style.width = `${Y}px`, a.style.height = `${W}px`;
        const Ee = { ...ge.current || j, widthPx: Y, heightPx: W };
        ge.current = Ee, $e(Ee);
      }, S = () => {
        document.removeEventListener("pointermove", ie, true), document.removeEventListener("pointerup", S, true);
      };
      document.addEventListener("pointermove", ie, true), document.addEventListener("pointerup", S, true);
    }, d = (p) => {
      p.key === "Enter" && (p.preventDefault(), ke(true));
    }, m = (p) => {
      var _a3, _b2, _c2, _d;
      const b = (_b2 = (_a3 = p.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), g = (_d = (_c2 = p.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d.call(_c2, "img[data-wiki-path], img[data-md-src]");
      b || g === a || ke(true);
    };
    return document.addEventListener("pointerdown", c, true), document.addEventListener("pointerdown", m, true), document.addEventListener("keydown", d, true), () => {
      document.removeEventListener("pointerdown", c, true), document.removeEventListener("pointerdown", m, true), document.removeEventListener("keydown", d, true);
    };
  }, [re, xe]);
  const ro = l.useCallback(() => {
    const a = ge.current || re;
    a && (nn(a), $e(null), ge.current = null, ke(false));
  }, [nn, re]), oo = l.useCallback(() => {
    const a = ge.current || re;
    if (!a) return;
    const c = xe(a);
    c && (c.style.width = `${a.originalWidthPx}px`, c.style.height = `${a.originalHeightPx}px`), $e(null), ge.current = null, ke(false);
  }, [xe, re]), Be = l.useCallback((a) => {
    var _a3, _b2, _c2, _d;
    const c = String(a || "");
    if (!c) return;
    const d = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current;
    if (typeof (d == null ? void 0 : d.insert) == "function") {
      d.insert(() => ({ targetValue: c, select: false, deviationStart: 0, deviationEnd: 0 })), (_b2 = d.focus) == null ? void 0 : _b2.call(d);
      return;
    }
    const m = (_c2 = d == null ? void 0 : d.getEditorView) == null ? void 0 : _c2.call(d);
    m && (m.dispatch(m.state.replaceSelection(c)), (_d = m.focus) == null ? void 0 : _d.call(m));
  }, []), rt = l.useCallback(async (a) => {
    if (!(a == null ? void 0 : a.length) || typeof f != "function" || x) return;
    const c = await f(a);
    (c == null ? void 0 : c.length) && Be(`${c.map((d) => `![[${d}]]`).join(`
`)}
`);
  }, [Be, x, f]);
  l.useEffect(() => {
    Ge.current = rt;
  }, [rt]);
  const so = l.useCallback(async (a) => {
    var _a3;
    if (!a || typeof f != "function") throw new Error("Upload handler not available.");
    const d = (_a3 = await f([a])) == null ? void 0 : _a3[0];
    if (!d) throw new Error("Upload succeeded but no path was returned.");
    Be(`![[${d}]]
`), Ze(null);
  }, [Be, f]), ot = l.useCallback(() => {
    var _a3, _b2, _c2;
    const c = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    let d = null;
    if (c) {
      const { from: m, to: p } = c.state.selection.main;
      m !== p && (d = { from: m, to: p, text: c.state.doc.sliceString(m, p) });
    }
    Ie(d), he(true);
  }, []);
  l.useEffect(() => {
    M.current = ot;
  }, [ot]);
  const io = l.useMemo(() => [o.jsx(sa, { value: e, theme: r, currentFile: i, language: "ko-KR" }, "export-pdf"), o.jsx(ia, { editorRef: h }, "insert-pgbr"), o.jsx(aa, { onOpen: ot }, "heading-remap"), o.jsx(Ui, { active: !!(z == null ? void 0 : z.open), onToggle: () => {
    var _a3;
    (_a3 = z == null ? void 0 : z.toggleAssist) == null ? void 0 : _a3.call(z);
  } }, "llm-assist"), o.jsx(oa, { onOpen: () => {
    O(true);
  } }, "checklist-progress"), o.jsx(pa, { checked: wt, onChange: Zt, theme: r }, "toc-title-wrap"), o.jsx(ha, { checked: _e, onChange: Jt, theme: r }, "base64-image-fold"), o.jsx(ga, { checked: en, onChange: tn, theme: r }, "editor-autocomplete"), ae ? null : o.jsx(xa, { checked: oe, onChange: et, theme: r }, "mirror-edit"), o.jsx(ba, { disabled: typeof f != "function", onRequestLink: () => Me(true), onRequestUpload: (a) => {
    rt(a);
  }, onRequestClip: (a) => Ze(a) }, "image-toolbar")], [e, r, i, wt, Zt, _e, Jt, en, tn, ae, oe, et, f, rt, ot, z == null ? void 0 : z.open, z == null ? void 0 : z.toggleAssist]), ao = l.useMemo(() => ["bold", "underline", "italic", "-", "strikeThrough", "sub", "sup", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", 9, "table", "mermaid", "katex", 1, 2, 3, 4, "-", "revoke", "next", 0, "=", 6, 7, ...ae ? [] : [8], "pageFullscreen", "fullscreen", "previewOnly", "preview", "htmlPreview", ...fe ? [5] : [], "catalog"], [fe, ae]), co = l.useMemo(() => {
    if (typeof f == "function") return async (a, c) => {
      if (x) return;
      const d = await f(a);
      (d == null ? void 0 : d.length) && c(d.map((m) => `![[${m}]]`));
    };
  }, [f, x]);
  return o.jsxs("div", { ref: P, className: `h-full w-full flex flex-col relative${wt ? " toc-titles-wrap" : ""}`, style: { "--md-catalog-width": `${tt}px`, ...Qr }, children: [(nt == null ? void 0 : nt.webfontCss) ? o.jsx("style", { "data-s3haim-document-webfonts": "1", children: nt.webfontCss }) : null, Je && po.createPortal(o.jsx(Hs, { handleProps: Xr, isResizing: Gr, visibleOnHover: true, label: "TOC resize handle", style: { position: "fixed", top: Je.top, left: Je.left, height: Je.height, bottom: "auto", zIndex: 10003 } }), document.body), x && o.jsxs("div", { className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20", "aria-live": "polite", children: [o.jsx(hi, { size: 16, className: "animate-spin shrink-0" }), o.jsxs("span", { children: ["Uploading image... ", Math.max(0, Math.min(100, Math.round(k))), "%"] }), typeof w == "function" && o.jsx("button", { type: "button", onClick: w, className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950", children: "Cancel" })] }), o.jsx(So, { ref: h, id: K, modelValue: e, onChange: B, mdHeadingId: $, className: "h-full! max-h-dvh", theme: r, language: "ko-KR", codeTheme: Bs, customIcon: _s, previewOnly: s, noMermaid: true, autoDetectCode: true, scrollAuto: false, footers: ["markdownTotal"], toolbars: ao, defToolbars: io, onUploadImg: co }, `footnotes-${ue}`), o.jsx(ji, { containerRef: P }), o.jsx(Ri, { containerRef: P }), o.jsx($i, { isOpen: !!I, onClose: () => se(null), path: (I == null ? void 0 : I.key) ?? "", kind: (I == null ? void 0 : I.kind) ?? "wiki", initialWidth: (I == null ? void 0 : I.width) ?? "", initialHeight: (I == null ? void 0 : I.height) ?? "", imageSrc: (I == null ? void 0 : I.imageSrc) ?? "", onApply: Zr, onStartFreeTransform: no, onCrop: Jr, onConvertToWiki: eo, onConvertToImgbb: to }, I ? `${I.kind}|${I.key}|${I.width ?? ""}|${I.height ?? ""}|${I.occurrence ?? 0}` : "wiki-image-size-modal"), o.jsx(wa, { isOpen: ye, onClose: () => Me(false), onConfirm: ({ desc: a, url: c }) => {
    Be(`![${a || ""}](${c})
`);
  } }), o.jsx(ya, { isOpen: Xe, onClose: () => ve(false), onConfirm: ({ line1: a, line2: c }) => {
    var _a3, _b2, _c2, _d, _e2;
    const m = (_c2 = (_b2 = ((_a3 = h.current) == null ? void 0 : _a3.value) ?? h.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), p = (m == null ? void 0 : m.state.doc.toString()) ?? J.current ?? "", { from: b, to: g } = Qe.current, v = Os(p, b, g, a, c);
    m && (m.dispatch({ changes: { from: 0, to: m.state.doc.length, insert: v.next }, selection: { anchor: v.caret }, scrollIntoView: true }), (_d = m.focus) == null ? void 0 : _d.call(m)), (_e2 = Fe.current) == null ? void 0 : _e2.call(Fe, v.next);
  } }), o.jsx(va, { isOpen: !!Qt, file: Qt, onClose: () => Ze(null), onConfirm: so }), o.jsx(Ai, { isOpen: te.isOpen, initialMeta: ((_a2 = te.editState) == null ? void 0 : _a2.meta) ?? null, initialGrid: ((_b = te.editState) == null ? void 0 : _b.grid) ?? { rows: [[""]], aligns: [null] }, onClose: te.close, onSave: te.apply }), o.jsx(Pi, { containerRef: P, getMarkdown: () => J.current ?? "", setMarkdown: (a) => {
    typeof B == "function" ? B(a) : typeof t == "function" && t(a);
  }, onEditTable: (a, c) => De.current(a, c), onEditFailed: () => {
    D({ title: "? ??", message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???." });
  } }), o.jsx(Di, { containerRef: P, getMarkdown: () => J.current ?? "", setMarkdown: (a) => {
    typeof B == "function" && B(a);
  }, enabled: !te.isOpen }), re && He && o.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500", style: { left: `${He.left}px`, top: `${He.top}px`, width: `${He.width}px`, height: `${He.height}px` }, children: ["nw", "ne", "sw", "se"].map((a) => o.jsx("button", { type: "button", "data-transform-handle": a, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: a.includes("w") ? "-7px" : "auto", right: a.includes("e") ? "-7px" : "auto", top: a.includes("n") ? "-7px" : "auto", bottom: a.includes("s") ? "-7px" : "auto", cursor: a === "nw" || a === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${a}` }, a)) }), re && o.jsxs("button", { type: "button", onClick: () => ke(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm", children: [o.jsx("span", { className: "block font-semibold mb-1", children: "Free transform guide" }), o.jsx("span", { className: "block", children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio" }), o.jsx("span", { className: "block", children: "- Touch drag: keeps aspect ratio" }), o.jsx("span", { className: "block", children: "- Click elsewhere (including this banner): confirm transform" })] }), o.jsx(pn, { isOpen: Wr, title: "Cover export", message: "You need to open the Export PDF page to export the cover. Continue?", confirmLabel: "Continue", cancelLabel: "Cancel", onConfirm: () => {
    xt(false), le({ openCoverEdit: true });
  }, onCancel: () => xt(false) }), o.jsx(pn, { isOpen: qr, title: "Save transform", message: "How would you like to handle the current transform?", confirmLabel: "Apply", cancelLabel: "Keep editing", discardLabel: "Reset transform", onConfirm: ro, onCancel: () => ke(false), onDiscard: oo }), o.jsx(ma, { isOpen: Ne, markdown: e, selectedMarkdown: (je == null ? void 0 : je.text) ?? "", onClose: () => {
    he(false), Ie(null);
  }, onApply: (a, c) => {
    if (c === "selection" && je) {
      const { from: d, to: m } = je, p = J.current ?? e, b = `${p.slice(0, d)}${a}${p.slice(m)}`;
      b !== p && B(b);
    } else a !== e && B(a);
    he(false), Ie(null);
  } }), o.jsx(ta, { editorRef: h, onChange: B, open: C, onOpenChange: O })] });
}
export {
  _l as default
};
