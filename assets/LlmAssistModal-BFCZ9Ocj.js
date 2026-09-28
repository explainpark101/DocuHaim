import { r as n, j as r, a as cn } from "./vendor-react-BDjpSibw.js";
import { H as un, T as dn, aX as mn, aY as fn, aZ as hn, a_ as Ve, a$ as pn, g as He, p as gn, b as wt, b0 as xn, b1 as yt, s as ce, f as bn, b2 as Pt, b3 as Lt, L as vn, b4 as We, q as wn, as as yn, b5 as Pn, e as Ln, b6 as kn, b7 as En, b8 as Mn, b9 as An, ba as Sn, bb as Cn } from "./index-CfCFWUoL.js";
import { L as kt, d as Tn, g as Et, i as In, e as Rn, f as Nn, n as Ke } from "./OpenAiCompatibleModelSelect-7ii-xgfi.js";
import { g as _n } from "./appStatusBar-COMHAiNk.js";
import { g as On, s as jn, a as Mt } from "./editorSelection-DKqQFSXb.js";
import { u as Dn } from "./LlamaCppModelSelect-xd2bzK_I.js";
import { a as At } from "./bootSplash-B8aCHT5v.js";
import { g as zn } from "./mlxVlmGenerateClient-DsaSOJPW.js";
import { f as Ue, g as Bn, h as St, j as Fn, L as Ct, d as Tt, n as Vn, k as It, o as Hn, e as Rt } from "./LlmAssistPanel-BigmR7g2.js";
import { A as Je, m as Qe } from "./vendor-motion-Dw-WnPM7.js";
import { k as Wn, W as Ft, Y as Vt, C as Ht, y as Kn, S as Xe, Z as Un, _ as Xn, $ as Yn, X as qn } from "./vendor-lucide-DgWK5x8G.js";
import { t as Gn, i as Wt, j as Kt, u as $n, k as Ut, l as Xt, A as Yt, v as Zn, w as Jn, I as Qn, h as eo } from "./vendor-radix-qpbG9kXl.js";
import { r as to, n as no } from "./llmAssistImages-DG7rjEWr.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-google-genai-BsKnVxxv.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./vendor-codemirror-CmNIsAMQ.js";
import "./previewSelectionSync-EVhjTAmT.js";
import "./useLazyMermaidRender-CMWw-qPT.js";
import "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
const nt = "s3haim-llm-modal-position", qt = "s3haim-llm-modal-hidden", oo = 420, et = 280, tt = 240, ro = 560, Gt = 44, Ye = { leftVw: 55, topVh: 12 };
function so() {
  try {
    const o = localStorage.getItem(nt);
    if (!o) return { ...Ye };
    const l = JSON.parse(o), c = Number(l == null ? void 0 : l.leftVw), a = Number(l == null ? void 0 : l.topVh);
    return !Number.isFinite(c) || !Number.isFinite(a) ? { ...Ye } : { leftVw: Math.min(95, Math.max(0, c)), topVh: Math.min(95, Math.max(0, a)) };
  } catch {
    return { ...Ye };
  }
}
function qe(o) {
  const l = window.innerWidth || 1, c = window.innerHeight || 1, a = so(), x = Math.min(oo, Math.max(et, o.width - 16)), b = Math.min(Gt + ro, Math.max(tt, o.height - 16)), y = { leftPx: a.leftVw / 100 * l, topPx: a.topVh / 100 * c, widthPx: x, heightPx: b };
  return Q(y, o);
}
function Q(o, l) {
  const c = Math.max(et, l.width), a = Math.max(tt, l.height), x = Math.min(c, Math.max(et, o.widthPx)), b = Math.min(a, Math.max(tt, o.heightPx)), y = l.right - x, m = l.bottom - Gt, T = Math.min(Math.max(l.left, o.leftPx), Math.max(l.left, y)), E = Math.min(Math.max(l.top, o.topPx), Math.max(l.top, m));
  return { leftPx: Math.round(T), topPx: Math.round(E), widthPx: Math.round(x), heightPx: Math.round(b) };
}
function ao(o) {
  const l = o ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 };
  try {
    const c = localStorage.getItem(nt);
    if (!c) return qe(l);
    const a = JSON.parse(c);
    return Number.isFinite(Number(a == null ? void 0 : a.leftPx)) && Number.isFinite(Number(a == null ? void 0 : a.topPx)) && Number.isFinite(Number(a == null ? void 0 : a.widthPx)) && Number.isFinite(Number(a == null ? void 0 : a.heightPx)) ? Q({ leftPx: Number(a.leftPx), topPx: Number(a.topPx), widthPx: Number(a.widthPx), heightPx: Number(a.heightPx) }, l) : qe(l);
  } catch {
    return qe(l);
  }
}
function io(o, l) {
  const c = l ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 }, a = Q(o, c);
  try {
    localStorage.setItem(nt, JSON.stringify(a));
  } catch {
  }
}
function lo() {
  try {
    return localStorage.getItem(qt) === "1";
  } catch {
    return false;
  }
}
function Ge(o) {
  try {
    localStorage.setItem(qt, o ? "1" : "0");
  } catch {
  }
}
const co = "[data-app-editor-navbar]", uo = 56;
function $t() {
  const o = document.querySelector(co);
  return o instanceof HTMLElement ? o : null;
}
function mo() {
  const o = $t();
  return o ? o.getBoundingClientRect().bottom : uo;
}
function fo(o) {
  const l = o == null ? void 0 : o.current, c = (l == null ? void 0 : l.value) ?? l ?? null;
  return c && typeof c == "object" && "root" in c && c.root instanceof Element ? c.root : null;
}
function Nt(o) {
  const c = mo(), a = _n(), x = Math.max(c + 1, a), b = { left: 8, top: Math.max(8, c), right: Math.max(8, window.innerWidth - 8), bottom: x, width: Math.max(0, window.innerWidth - 16), height: Math.max(0, x - Math.max(8, c)) }, y = fo(o);
  if (!y) return b;
  const m = y.getBoundingClientRect(), T = $t(), E = T ? T.getBoundingClientRect().bottom : Math.max(m.top, c), p = m.left, D = m.right;
  return { left: p, top: E, right: D, bottom: x, width: Math.max(0, D - p), height: Math.max(0, x - E) };
}
const _t = 5, Ot = "llm-assist-modal-resize-cursor-style", we = "llm-assist-modal-corner-resize";
function ho() {
  if (document.getElementById(Ot)) return;
  const o = document.createElement("style");
  o.id = Ot, o.textContent = `
    html.${we},
    html.${we} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(o);
}
function po(o) {
  return o === "e" || o === "w" ? "ew-resize" : o === "se" ? "nwse-resize" : "nesw-resize";
}
function go(o) {
  ho();
  const l = po(o);
  document.documentElement.style.setProperty("--llm-assist-resize-cursor", l), document.documentElement.classList.add(we), document.body.style.userSelect = "none";
}
function xo() {
  document.documentElement.classList.remove(we), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
}
function bo(o, { enabled: l = true } = {}) {
  const c = n.useRef(Nt(o)), [a, x] = n.useState(() => ao(c.current)), b = n.useRef(null), y = n.useRef({ active: false, startX: 0, startY: 0, startLayout: a }), m = n.useRef(null), T = n.useCallback(() => {
    c.current = Nt(o), x((f) => Q(f, c.current));
  }, [o]);
  n.useEffect(() => {
    var _a, _b, _c;
    if (!l) return;
    T();
    const f = () => T();
    window.addEventListener("resize", f), window.addEventListener("scroll", f, true);
    const g = ((_b = (_a = o == null ? void 0 : o.current) == null ? void 0 : _a.value) == null ? void 0 : _b.root) ?? ((_c = o == null ? void 0 : o.current) == null ? void 0 : _c.root) ?? null;
    let u = null;
    if (typeof ResizeObserver < "u") {
      if (u = new ResizeObserver(f), g) {
        u.observe(g);
        const s = g.querySelector(".md-editor-toolbar-wrapper") || g.querySelector(".md-editor-toolbar");
        s && u.observe(s);
      }
      const v = document.querySelector("[data-app-editor-navbar]");
      v && u.observe(v);
      const k = document.querySelector("[data-app-status-bar]");
      k && u.observe(k);
    }
    return () => {
      window.removeEventListener("resize", f), window.removeEventListener("scroll", f, true), u == null ? void 0 : u.disconnect();
    };
  }, [l, o, T]);
  const E = n.useCallback((f) => {
    const g = Q(f, c.current);
    return io(g, c.current), g;
  }, []), p = n.useCallback((f, g) => {
    const u = y.current;
    if (!u.active) return;
    const v = f - u.startX, k = g - u.startY;
    x(Q({ ...u.startLayout, leftPx: u.startLayout.leftPx + v, topPx: u.startLayout.topPx + k }, c.current));
  }, []), D = n.useCallback((f, { onTap: g } = {}) => {
    if (f.pointerType === "touch" || f.button !== 0) return;
    f.preventDefault();
    const u = f.clientX, v = f.clientY;
    let k = false;
    y.current = { active: true, startX: u, startY: v, startLayout: a };
    const s = (M) => {
      y.current.active && (Math.hypot(M.clientX - u, M.clientY - v) > _t && (k = true), p(M.clientX, M.clientY));
    }, i = () => {
      y.current.active && (y.current.active = false, document.removeEventListener("pointermove", s), document.removeEventListener("pointerup", i), x((M) => E(M)), k || (g == null ? void 0 : g()));
    };
    document.addEventListener("pointermove", s), document.addEventListener("pointerup", i);
  }, [p, a, E]), P = n.useCallback((f, { onTap: g } = {}) => {
    const u = f.changedTouches;
    if (!(u == null ? void 0 : u.length)) return;
    const v = u[0];
    if (!v) return;
    const k = v.identifier, s = v.clientX, i = v.clientY;
    f.preventDefault();
    let M = false;
    y.current = { active: true, startX: s, startY: i, startLayout: a, touchIdentifier: k };
    const _ = (B) => {
      if (!y.current.active) return;
      const L = Array.from(B.touches).find((F) => F.identifier === k);
      L && (Math.hypot(L.clientX - s, L.clientY - i) > _t && (M = true), p(L.clientX, L.clientY), B.preventDefault());
    }, Z = () => {
      y.current.active && (y.current.active = false, document.removeEventListener("touchmove", _), document.removeEventListener("touchend", O), document.removeEventListener("touchcancel", O), x((B) => E(B)), M || (g == null ? void 0 : g()));
    }, O = (B) => {
      !y.current.active || !Array.from(B.changedTouches).some((F) => F.identifier === k) || Z();
    };
    document.addEventListener("touchmove", _, { passive: false }), document.addEventListener("touchend", O, { passive: false }), document.addEventListener("touchcancel", O, { passive: false });
  }, [p, a, E]), z = n.useCallback((f, g) => {
    const u = m.current;
    if (!u) return;
    const v = f - u.startX, k = g - u.startY, s = u.startLayout;
    let i;
    u.corner === "se" ? i = { leftPx: s.leftPx, topPx: s.topPx, widthPx: s.widthPx + v, heightPx: s.heightPx + k } : u.corner === "sw" ? i = { leftPx: s.leftPx + v, topPx: s.topPx, widthPx: s.widthPx - v, heightPx: s.heightPx + k } : u.corner === "e" ? i = { leftPx: s.leftPx, topPx: s.topPx, widthPx: s.widthPx + v, heightPx: s.heightPx } : i = { leftPx: s.leftPx + v, topPx: s.topPx, widthPx: s.widthPx - v, heightPx: s.heightPx }, x(Q(i, c.current));
  }, []), U = n.useCallback((f, g) => {
    if (g.button !== 0) return;
    g.preventDefault(), g.stopPropagation(), m.current = { corner: f, startX: g.clientX, startY: g.clientY, startLayout: a }, go(f);
    const u = g.currentTarget;
    u instanceof HTMLElement && typeof u.setPointerCapture == "function" && u.setPointerCapture(g.pointerId);
    const v = () => {
      m.current = null, xo(), document.removeEventListener("pointermove", k), document.removeEventListener("pointerup", s), document.removeEventListener("pointercancel", s);
    }, k = (i) => {
      i.preventDefault(), z(i.clientX, i.clientY);
    }, s = () => {
      m.current && (v(), x((i) => E(i)));
    };
    document.addEventListener("pointermove", k, { passive: false }), document.addEventListener("pointerup", s), document.addEventListener("pointercancel", s);
  }, [z, a, E]), X = n.useCallback((f, g) => U(f, g), [U]), Y = { left: a.leftPx, top: a.topPx, width: a.widthPx, height: a.heightPx };
  return { layout: a, panelRef: b, panelStyle: Y, startPositionDrag: D, startPositionTouchDrag: P, startCornerResize: X, startEdgeResize: U, refreshBounds: T };
}
const vo = 520, wo = 12, jt = 80, Dt = 300, yo = 180, Po = dn, Lo = [0.4, 0, 0.2, 1];
function $e(o) {
  return typeof window > "u" ? o * 5 : window.innerWidth * o / 100;
}
function zt(o) {
  var _a;
  return o ? o.closest("[data-llm-assist-layout-root]") || ((_a = o.parentElement) == null ? void 0 : _a.parentElement) || o.parentElement : null;
}
function ko({ open: o, onClose: l, children: c, className: a = "" }) {
  const x = n.useRef(null), [b, y] = n.useState(() => Math.max(Dt, Math.floor($e(jt)))), m = Math.max(1, Math.floor($e(wo)));
  n.useEffect(() => {
    if (!o) return;
    const z = () => {
      var _a;
      const u = (((_a = zt(x.current)) == null ? void 0 : _a.clientWidth) ?? window.innerWidth) - yo, v = Math.max(Dt, Math.floor($e(jt)));
      y(Math.max(m, Math.min(v, u)));
    };
    z();
    const U = requestAnimationFrame(z);
    window.addEventListener("resize", z);
    let X = null;
    const Y = zt(x.current);
    return Y && typeof ResizeObserver < "u" && (X = new ResizeObserver(z), X.observe(Y)), () => {
      cancelAnimationFrame(U), window.removeEventListener("resize", z), X == null ? void 0 : X.disconnect();
    };
  }, [m, o]);
  const T = Math.max(1, Math.floor(m / 3)), { width: E, isResizing: p, handleProps: D } = un({ storageKey: "s3haim_llm_assist_dock_width", defaultWidth: vo, minWidth: m, maxWidth: Math.max(b, m), edge: "right", collapseBelowWidth: T, onCollapseBelowMin: typeof l == "function" ? l : void 0 }), P = Math.min(E, b);
  return r.jsx(Je, { initial: false, children: o ? r.jsx(Qe.div, { className: "relative h-full min-h-0 shrink-0 overflow-hidden", initial: { width: 0 }, animate: { width: P }, exit: { width: 0 }, transition: p ? { duration: 0 } : { duration: 0.28, ease: Lo }, children: r.jsxs("div", { ref: x, className: `relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${a}`, style: { width: P }, children: [r.jsx(Po, { handleProps: { ...D, "aria-valuenow": Math.round(P), "aria-valuemax": Math.round(b) }, isResizing: p, edge: "left", visibleOnHover: true, label: "AI \uB3C4\uC6B0\uBBF8 \uB108\uBE44 \uC870\uC808" }), r.jsx("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col", children: c })] }) }, "llm-assist-dock") : null });
}
const Eo = "inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", Mo = "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50", Ao = "z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
function So(o) {
  return o === "docked" ? Vt : o === "split" ? Ht : Ft;
}
function Co({ presentation: o, onChange: l, splitEnabled: c = true }) {
  const a = So(o), x = [{ value: "floating", label: "\uD50C\uB85C\uD305 \uCC3D", icon: Ft }, { value: "docked", label: "\uC6B0\uCE21\uC5D0 \uACE0\uC815", icon: Vt }, { value: "split", label: "\uC2A4\uD50C\uB9BF \uCC3D", icon: Ht, disabled: !c }];
  return r.jsxs(Gn, { children: [r.jsxs(Wt, { children: [r.jsx(Kt, { asChild: true, children: r.jsx($n, { asChild: true, children: r.jsxs("button", { type: "button", onPointerDown: (b) => b.stopPropagation(), onTouchStart: (b) => b.stopPropagation(), className: Eo, "aria-label": "\uD45C\uC2DC \uBC29\uC2DD", children: [r.jsx(a, { size: 15, "aria-hidden": true }), r.jsx(Wn, { size: 12, "aria-hidden": true, className: "opacity-70" })] }) }) }), r.jsx(Ut, { children: r.jsxs(Xt, { side: "bottom", sideOffset: 6, className: "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50", children: ["\uD45C\uC2DC \uBC29\uC2DD", r.jsx(Yt, { className: "fill-white dark:fill-odp-surface" })] }) })] }), r.jsx(Zn, { children: r.jsx(Jn, { side: "bottom", align: "end", sideOffset: 4, className: Ao, onCloseAutoFocus: (b) => b.preventDefault(), children: x.map((b) => {
    const y = b.icon, m = o === b.value;
    return r.jsxs(Qn, { disabled: !!b.disabled, className: `${Mo} ${b.disabled ? "cursor-not-allowed opacity-40" : ""}`, onSelect: () => {
      b.disabled || b.value === o || l(b.value);
    }, children: [r.jsx(y, { size: 14, className: "shrink-0 opacity-80", "aria-hidden": true }), r.jsx("span", { className: "min-w-0 flex-1", children: b.label }), m ? r.jsx(Kn, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300", "aria-hidden": true }) : null] }, b.value);
  }) }) })] });
}
const To = [0.4, 0, 0.2, 1], Bt = { duration: 0.28, ease: To }, Io = "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", Ro = "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
function Ze({ label: o, onClick: l, disabled: c, children: a }) {
  return r.jsxs(Wt, { children: [r.jsx(Kt, { asChild: true, children: r.jsx("button", { type: "button", onPointerDown: (x) => x.stopPropagation(), onTouchStart: (x) => x.stopPropagation(), onClick: l, disabled: c, className: Io, "aria-label": o, children: a }) }), r.jsx(Ut, { children: r.jsxs(Xt, { side: "bottom", sideOffset: 6, className: Ro, children: [o, r.jsx(Yt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function rr({ editorRef: o = null, onChange: l, getMarkdown: c, llmProviderProfiles: a, open: x, onOpenChange: b, theme: y = "light" }) {
  var _a, _b, _c;
  const m = mn(), T = fn(), { requestCreateFileWithContent: E } = hn(), p = m ? m.open : !!x, D = m ? m.setOpen : b, P = (m == null ? void 0 : m.presentation) ?? "floating", z = m == null ? void 0 : m.setPresentation, U = m == null ? void 0 : m.openAsSplit, X = m == null ? void 0 : m.dockToRight, Y = m == null ? void 0 : m.undockToFloating, f = m ? m.canInsertIntoDocument : !!o, g = !!(T == null ? void 0 : T.workspaceTabsEnabled), [u, v] = n.useState(() => Ve());
  n.useEffect(() => (v(Ve()), pn(() => {
    v(Ve());
  })), []);
  const k = n.useCallback((e) => {
    if (e === "split") {
      if (!g) return;
      U == null ? void 0 : U();
      return;
    }
    if (e === "docked") {
      X == null ? void 0 : X();
      return;
    }
    Y == null ? void 0 : Y();
  }, [g, U, X, Y]), s = ((_a = m == null ? void 0 : m.editorBridge) == null ? void 0 : _a.editorRef) ?? o, i = (m == null ? void 0 : m.editorBridge) ?? null, M = ((_b = m == null ? void 0 : m.editorBridge) == null ? void 0 : _b.onChange) ?? l, _ = ((_c = m == null ? void 0 : m.editorBridge) == null ? void 0 : _c.getMarkdown) ?? c, Z = n.useMemo(() => Array.isArray(a) ? a : [], [a]), [O, B] = n.useState(() => lo()), [L, F] = n.useState(false), [ee, ue] = n.useState(""), [ot, rt] = n.useState({ from: 0, to: 0 }), [q, ye] = n.useState([]), [V, de] = n.useState(""), [H, me] = n.useState(() => He()), [W, fe] = n.useState(() => ({ ...kt })), [A, j] = n.useState(""), [Pe, st] = n.useState("text"), [Le, at] = n.useState(false), [ke, K] = n.useState(""), [te, Zt] = n.useState([]), [Ee, he] = n.useState(""), [ne, pe] = n.useState(""), [G, ge] = n.useState(null), [xe, Me, it] = Dn(Z), h = gn(Z, xe), [I, Ae] = n.useState(() => h ? wt(h.id, h.kind) : ""), R = n.useRef(null), N = n.useRef(false), oe = n.useRef(null), { panelRef: Jt, panelStyle: Se, startPositionDrag: lt, startPositionTouchDrag: ct, startCornerResize: ut, startEdgeResize: dt, refreshBounds: mt } = bo(s, { enabled: p && P === "floating" }), re = n.useCallback(() => ({ selectedText: ee, selectionRange: ot, attachedImages: q, instruction: V, systemPrompt: H, requestOptions: W, result: A, resultViewMode: Pe, loading: Le, error: ke, templates: te, selectedTemplateId: Ee, templateName: ne, editingTemplateId: G, profiles: Z.map((e) => ({ id: e.id, name: e.name, kind: e.kind, baseUrl: e.baseUrl })), selectedProfileId: xe, model: I, theme: y }), [ee, ot, q, V, H, W, A, Pe, Le, ke, te, Ee, ne, G, Z, xe, I, y]), be = n.useCallback(() => {
    if (N.current) {
      Ue(null, re());
      return;
    }
    const e = R.current;
    !e || e.closed || Ue(e, re());
  }, [re]), se = n.useCallback(() => {
    const e = N.current ? null : R.current;
    R.current = null, N.current = false, Bn(e).finally(() => {
      F(false);
    });
  }, []), C = n.useCallback(() => {
    if (!s && !(i == null ? void 0 : i.getEditorApi) && !(i == null ? void 0 : i.getMarkdown)) return "";
    const { text: e, from: t, to: d } = On(s, { ...(i == null ? void 0 : i.getEditorApi) ? { getEditorApi: i.getEditorApi } : {}, ...(i == null ? void 0 : i.documentKey) ? { documentKey: i.documentKey } : {} });
    let w = e;
    return !w && (i == null ? void 0 : i.getMarkdown) && t !== d && (w = (i.getMarkdown() ?? "").slice(t, d)), ue((S) => S === w ? S : w), rt((S) => S.from === t && S.to === d ? S : { from: t, to: d }), w;
  }, [s, i]), $ = n.useCallback(async () => {
    const e = await xn();
    return Zt(e), e;
  }, []);
  n.useEffect(() => {
    p && (P !== "floating" && (B(false), Ge(false)), (P === "split" || P === "docked") && se(), mt(), it(), C(), $(), K(""));
  }, [p, P, mt, C, $, it, se]), n.useEffect(() => {
    if (!(h == null ? void 0 : h.id) || !(h == null ? void 0 : h.kind)) {
      Ae("");
      return;
    }
    Ae(wt(h.id, h.kind));
  }, [h == null ? void 0 : h.id, h == null ? void 0 : h.kind]), n.useEffect(() => {
    const e = () => {
      he(""), ge(null), $();
    };
    return window.addEventListener(yt, e), () => {
      window.removeEventListener(yt, e);
    };
  }, [$]), n.useEffect(() => {
    p && C();
  }, [p, i, C]), n.useEffect(() => {
    if (!(!p || L || !s) && !(P === "floating" && O)) return jn(s, ({ text: e, from: t, to: d }) => {
      ue((w) => w === e ? w : e), rt((w) => w.from === t && w.to === d ? w : { from: t, to: d });
    }, (i == null ? void 0 : i.documentKey) ? { documentKey: i.documentKey } : void 0);
  }, [p, O, L, s, P, i == null ? void 0 : i.documentKey]), n.useEffect(() => {
    if (!p || L || !s && !(i == null ? void 0 : i.getEditorApi) || P === "floating" && O) return;
    const e = window.setInterval(() => {
      C();
    }, 800);
    return () => window.clearInterval(e);
  }, [p, O, L, s, i, P, C]), n.useEffect(() => {
    be();
  }, [be]), n.useEffect(() => {
    if (!L) return;
    const e = setInterval(() => {
      St(N.current ? null : R.current).then((t) => {
        t || (R.current = null, N.current = false, F(false));
      });
    }, 400);
    return () => clearInterval(e);
  }, [L]), n.useEffect(() => {
    if (!p) {
      se();
      return;
    }
    const e = () => {
      Vn(N.current ? null : R.current);
    };
    return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
  }, [p, se]);
  const Ce = n.useCallback((e) => {
    const t = String(e || "").trim();
    Ae(t), h && (ce(h.id, t), h.kind === bn ? Pt(t) : Lt(t));
  }, [h]), ve = n.useCallback(() => {
    const e = oe.current;
    !e || e.signal.aborted || e.abort(Tn());
  }, []), Te = n.useCallback(async () => {
    if (oe.current) return;
    const e = new AbortController();
    oe.current = e, K(""), j(""), at(true);
    try {
      const t = ee;
      if (!h) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
      if (h.kind === vn) {
        const w = (h.baseUrl || "").trim();
        if (!w) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
        ce(h.id, I), Lt(I);
        const S = await We(h.id, () => h.apiKey || "", (J) => Et({ baseUrl: w, apiKey: J, model: I, instruction: V, systemPrompt: H, selectedText: t, images: q, requestOptions: W, onChunk: j, signal: e.signal }), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
        j(S);
        return;
      }
      if (h.kind === wn) {
        const w = yn(), S = await Pn(w, { signal: e.signal }), J = (h.baseUrl || S.baseUrl || "").trim();
        if (!J) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
        const le = I.trim() || w.selectedModelId || S.models[0] || "";
        if (!le) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
        ce(h.id, le);
        const an = await We(h.id, () => h.apiKey || w.apiKey || "no-key-required", (ln) => Et({ baseUrl: J, apiKey: ln, model: le, instruction: V, systemPrompt: H, selectedText: t, images: q, requestOptions: W, onChunk: j, signal: e.signal }), { allowEmpty: true, missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
        j(an);
        return;
      }
      if (h.kind === Ln) {
        const w = kn(), S = await En(w);
        if (!S.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
        const J = I.trim() || w.selectedModelId || S.models[0] || "";
        if (!J) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
        ce(h.id, J);
        const le = await zn({ instruction: V, systemPrompt: H, selectedText: t, images: q, requestOptions: W, onChunk: j, signal: e.signal });
        j(le);
        return;
      }
      if (In(I)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
      ce(h.id, I), Pt(I);
      const d = await We(h.id, () => h.apiKey || "", (w) => Rn({ apiKey: w, model: I, instruction: V, systemPrompt: H, selectedText: t, images: q, requestOptions: W, onChunk: j, signal: e.signal }), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
      j(d);
    } catch (t) {
      if (Nn(t)) {
        K("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
        return;
      }
      K(t instanceof Error ? t.message : "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      oe.current === e && (oe.current = null, at(false));
    }
  }, [ee, q, h, I, V, H, W]), Ie = n.useCallback(() => {
    if (!A) return;
    if (!f || !s && !_) {
      K("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!Mt({ editorRef: s ?? { current: null }, result: A, ...M ? { onChange: M } : {}, ..._ ? { getMarkdown: _ } : {}, ...(i == null ? void 0 : i.documentKey) ? { documentKey: i.documentKey } : {} })) {
      K("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    C();
  }, [A, s, f, M, _, C, i == null ? void 0 : i.documentKey]), Re = n.useCallback(() => {
    if (!A) return;
    if (!f || !s && !_) {
      K("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!Mt({ editorRef: s ?? { current: null }, result: A, ...M ? { onChange: M } : {}, ..._ ? { getMarkdown: _ } : {}, forceAppendAtEnd: true, ...(i == null ? void 0 : i.documentKey) ? { documentKey: i.documentKey } : {} })) {
      K("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    C();
  }, [A, s, f, M, _, C, i == null ? void 0 : i.documentKey]), Ne = n.useCallback(async () => {
    if (!A) return;
    await Mn(A, { message: "\uACB0\uACFC\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4" }) || K("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  }, [A]), _e = n.useCallback(() => {
    A && E(A);
  }, [A, E]), Oe = n.useCallback((e) => {
    he(e);
    const t = te.find((d) => d.id === e);
    t && (de(t.instruction), me(typeof t.systemPrompt == "string" && t.systemPrompt.trim() ? t.systemPrompt : He()), fe(Ke(t.requestOptions)), pe(t.name), ge(t.id));
  }, [te]), je = n.useCallback(async () => {
    const e = ne.trim(), t = V.trim();
    if (!e || !t) {
      alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    try {
      const d = await An({ id: G || Sn().id, name: e, instruction: t, systemPrompt: H.trim(), requestOptions: Ke(W), updatedAt: Date.now() });
      ge(d.id), he(d.id), await $();
    } catch (d) {
      alert(d instanceof Error ? d.message : "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [ne, V, H, W, G, $]), ae = n.useCallback(() => {
    ge(null), he(""), pe(""), de(""), me(He()), fe({ ...kt });
  }, []), De = n.useCallback(async () => {
    if (G && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
      await Cn(G), ae(), await $();
    } catch (e) {
      alert(e instanceof Error ? e.message : "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [G, ae, $]), ie = n.useCallback(async (e) => {
    e.length && ye((t) => [...t, ...e]);
  }, []), ze = n.useCallback((e) => {
    e && ye((t) => t.filter((d) => d.id !== e));
  }, []), Be = n.useCallback(() => {
    ye([]);
  }, []), ft = n.useCallback(async (e) => {
    try {
      const t = await to(e);
      await ie(t);
    } catch (t) {
      K(t instanceof Error ? t.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
  }, [ie]), ht = n.useCallback(async (e, t = {}) => {
    switch (e) {
      case "refresh-selection":
        C();
        break;
      case "set-selected-text":
        ue(typeof t.value == "string" ? t.value : "");
        break;
      case "run":
        await Te();
        break;
      case "cancel-run":
        ve();
        break;
      case "apply-result":
        Ie();
        break;
      case "append-result":
        Re();
        break;
      case "copy-result":
        Ne();
        break;
      case "create-note-from-result":
        _e();
        break;
      case "set-instruction":
        de(typeof t.value == "string" ? t.value : "");
        break;
      case "set-system-prompt":
        me(typeof t.value == "string" ? t.value : "");
        break;
      case "set-request-options":
        fe(Ke(t.value));
        break;
      case "set-result":
        j(typeof t.value == "string" ? t.value : "");
        break;
      case "set-model":
        typeof t.value == "string" && Ce(t.value);
        break;
      case "set-llm-profile-id":
        typeof t.value == "string" && Me(t.value);
        break;
      case "load-template":
        Oe(String(t.id ?? ""));
        break;
      case "save-template":
        await je();
        break;
      case "new-template":
        ae();
        break;
      case "delete-template":
        await De();
        break;
      case "set-template-name":
        pe(typeof t.value == "string" ? t.value : "");
        break;
      case "set-result-view-mode":
        (t.value === "preview" || t.value === "text") && st(t.value);
        break;
      case "add-images": {
        const d = (Array.isArray(t.images) ? t.images : []).map(no).filter((w) => w !== null);
        d.length && await ie(d);
        break;
      }
      case "remove-image":
        ze(String(t.id ?? ""));
        break;
      case "clear-images":
        Be();
        break;
      case "close":
        D == null ? void 0 : D(false);
        break;
    }
  }, [C, Te, ve, Ie, Re, Ne, _e, Ce, Me, Oe, je, ae, De, ie, ze, Be, D]);
  n.useEffect(() => {
    if (!p) return;
    let e = () => {
    }, t = false;
    return Fn((d) => {
      if (d.type === Rt.READY) {
        d.source && typeof d.source.postMessage == "function" ? (R.current = d.source, N.current = false) : At() && (R.current = null, N.current = true), F(true), Ue(N.current ? null : R.current, re());
        return;
      }
      d.type === Rt.ACTION && d.action && ht(d.action, d.payload ?? {});
    }).then((d) => {
      if (t) {
        d();
        return;
      }
      e = d;
    }), () => {
      t = true, e();
    };
  }, [p, re, ht]);
  const Qt = () => {
    B(true), Ge(true);
  }, Fe = () => {
    B(false), Ge(false), C();
  }, pt = () => {
    ve(), se(), D == null ? void 0 : D(false);
  }, en = () => {
    (async () => {
      if (At() && await St(null)) {
        N.current = true, R.current = null, await It(null), be(), F(true);
        return;
      }
      const e = R.current;
      if (e && !e.closed) {
        await It(e), be(), F(true);
        return;
      }
      const t = await Hn();
      if (!t) {
        alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      t === "tauri" ? (N.current = true, R.current = null) : (N.current = false, R.current = t), F(true);
    })();
  }, gt = { theme: y, profiles: Z, selectedProfileId: xe, onSelectedProfileIdChange: Me, selectedProfile: h, model: I, onModelChange: Ce, selectedText: ee, onSelectedTextChange: ue, onRefreshSelection: C, attachedImages: q, onAddImages: ie, onRemoveImage: ze, onClearImages: Be, instruction: V, onInstructionChange: de, systemPrompt: H, onSystemPromptChange: me, requestOptions: W, onRequestOptionsChange: fe, result: A, onResultChange: j, resultViewMode: Pe, onResultViewModeChange: st, loading: Le, error: ke, templates: te, selectedTemplateId: Ee, onLoadTemplate: Oe, templateName: ne, onTemplateNameChange: pe, editingTemplateId: G, onSaveTemplate: je, onNewTemplate: ae, onDeleteTemplate: De, onRun: Te, onCancelGeneration: ve, onApplyResult: Ie, onAppendResult: Re, onCopyResult: Ne, onCreateNoteFromResult: _e, presentation: P, canInsertIntoDocument: f }, xt = r.jsx(eo, { delayDuration: 250, skipDelayDuration: 0, children: r.jsxs("div", { className: "flex shrink-0 flex-wrap items-center justify-end gap-1", children: [typeof z == "function" || typeof X == "function" || typeof Y == "function" || typeof U == "function" ? r.jsx(Co, { presentation: P, onChange: k, splitEnabled: g }) : null, P === "floating" ? r.jsx(Ze, { label: L ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", onClick: en, disabled: L, children: r.jsx(Xn, { size: 15 }) }) : null, P === "floating" ? r.jsx(Ze, { label: "\uC228\uAE30\uAE30", onClick: Qt, children: r.jsx(Yn, { size: 15 }) }) : null, r.jsx(Ze, { label: "\uB2EB\uAE30", onClick: pt, children: r.jsx(qn, { size: 15 }) })] }) }), tn = !!(p && P === "docked"), nn = !!(p && P === "split" && u), on = !!(p && P === "floating" && !O && !L), rn = !!(p && P === "floating" && (O || L)), bt = L ? "AI (\uC0C8\uCC3D)" : "AI", sn = L ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC", vt = r.jsx(Ct, { className: "flex h-full min-h-0 flex-col", disabled: !p, onFilesDrop: ft, children: r.jsxs("div", { className: "flex h-full min-h-0 flex-col", role: "complementary", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [r.jsxs("div", { className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", children: [r.jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [r.jsx(Xe, { size: 16, className: "shrink-0", "aria-hidden": true }), r.jsx("span", { className: "whitespace-nowrap", children: "AI \uB3C4\uC6B0\uBBF8" })] }), xt] }), r.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: r.jsx(Tt, { ...gt, enableImageDropZone: false }) })] }) });
  return r.jsxs(r.Fragment, { children: [tn ? r.jsx(ko, { open: true, onClose: pt, children: vt }) : null, nn && u ? cn.createPortal(vt, u) : null, r.jsx(Je, { children: rn ? r.jsxs(Qe.div, { role: "button", tabIndex: 0, initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.85 }, transition: Bt, onPointerDown: (e) => lt(e, L ? {} : { onTap: Fe }), onTouchStart: (e) => ct(e, L ? {} : { onTap: Fe }), onKeyDown: (e) => {
    L || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), Fe());
  }, className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing", style: { left: Se.left, top: Se.top }, title: sn, "aria-label": bt, children: [r.jsx(Xe, { size: 14, "aria-hidden": true }), bt] }, "llm-assist-chip") : null }), r.jsx(Je, { children: on ? r.jsxs(Qe.div, { ref: Jt, initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.92 }, transition: Bt, className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center", style: Se, role: "dialog", "aria-modal": "false", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [r.jsxs(Ct, { className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg", disabled: !p, onFilesDrop: ft, children: [r.jsxs("div", { className: "flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", onPointerDown: (e) => lt(e), onTouchStart: (e) => ct(e), children: [r.jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [r.jsx(Un, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), r.jsx(Xe, { size: 16, className: "shrink-0", "aria-hidden": true }), r.jsx("span", { className: "whitespace-nowrap", children: "AI \uB3C4\uC6B0\uBBF8" })] }), xt] }), r.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: r.jsx(Tt, { ...gt, enableImageDropZone: false }) })] }), r.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC67C\uCABD)", className: "absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!", onPointerDown: (e) => dt("w", e) }), r.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC624\uB978\uCABD)", className: "absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!", onPointerDown: (e) => dt("e", e) }), r.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!", onPointerDown: (e) => ut("sw", e) }), r.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!", onPointerDown: (e) => ut("se", e) })] }, "llm-assist-floating") : null })] });
}
export {
  rr as default
};
