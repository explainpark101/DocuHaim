import { r as s, j as a, a as gn } from "./vendor-react-ChQ1w2We.js";
import { c0 as xn, c1 as it, F as bn, T as vn, c2 as wn, c3 as yn, bj as En, c4 as Ue, c5 as Ln, g as Xe, o as Pn, b as Pt, c6 as An, c7 as At, s as de, f as Mn, c8 as Mt, c9 as kt, L as kn, ca as Ye, p as Sn, ay as Tn, cb as Cn, e as Rn, cc as In, cd as Nn, ce as _n, cf as On, cg as Dn, ch as jn } from "./index-DesdSF2E.js";
import { L as St, d as zn, g as Tt, i as Fn, e as Vn, f as Bn, n as qe } from "./OpenAiCompatibleModelSelect-CSFPy21c.js";
import { g as Hn } from "./appStatusBar-COMHAiNk.js";
import { E as Wn, S as Kn, C as Un } from "./vendor-codemirror-CohftLwi.js";
import { i as Xn } from "./previewMirrorEdit-BIAKkwt9.js";
import { u as Yn } from "./LlamaCppModelSelect-q7Ns33kj.js";
import { d as Ct } from "./bootSplash-Dmg87Il5.js";
import { g as qn } from "./mlxVlmGenerateClient-B9GbDmWe.js";
import { f as $e, g as $n, h as Rt, j as Gn, L as It, d as Nt, n as Zn, k as _t, o as Jn, e as Ot } from "./LlmAssistPanel-BxKPyM_B.js";
import { A as nt, m as ot } from "./vendor-motion-L8D9Iqni.js";
import { m as Qn, a0 as Xt, a1 as Yt, c as qt, C as eo, S as Ge, a2 as to, a3 as no, a4 as oo, X as ro } from "./vendor-lucide-BB1m8XvN.js";
import { J as so, n as $t, T as Gt, K as io, p as Zt, C as Jt, A as Qt, M as ao, N as lo, O as co, P as uo } from "./vendor-radix-BQ9XceqC.js";
import { r as fo, n as mo } from "./llmAssistImages-DG7rjEWr.js";
import "./vendor-aws-DKtg11UV.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-google-genai-BNS9o67m.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./previewSelectionSync-CG5sUD25.js";
import "./useLazyMermaidRender-DGltcr6x.js";
import "./lazyMermaid-DNlwk8Oz.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./ImageLightboxCopyButton-pqlGST_k.js";
import "./Kbd-B19j6vi0.js";
import "./copyImageToClipboard-CKuwKuUE.js";
const at = "s3haim-llm-modal-position", en = "s3haim-llm-modal-hidden", po = 420, rt = 280, st = 240, ho = 560, tn = 44, Ze = { leftVw: 55, topVh: 12 };
function go() {
  try {
    const e = localStorage.getItem(at);
    if (!e) return { ...Ze };
    const o = JSON.parse(e), i = Number(o == null ? void 0 : o.leftVw), n = Number(o == null ? void 0 : o.topVh);
    return !Number.isFinite(i) || !Number.isFinite(n) ? { ...Ze } : { leftVw: Math.min(95, Math.max(0, i)), topVh: Math.min(95, Math.max(0, n)) };
  } catch {
    return { ...Ze };
  }
}
function Je(e) {
  const o = window.innerWidth || 1, i = window.innerHeight || 1, n = go(), u = Math.min(po, Math.max(rt, e.width - 16)), c = Math.min(tn + ho, Math.max(st, e.height - 16)), p = { leftPx: n.leftVw / 100 * o, topPx: n.topVh / 100 * i, widthPx: u, heightPx: c };
  return te(p, e);
}
function te(e, o) {
  const i = Math.max(rt, o.width), n = Math.max(st, o.height), u = Math.min(i, Math.max(rt, e.widthPx)), c = Math.min(n, Math.max(st, e.heightPx)), p = o.right - u, d = o.bottom - tn, M = Math.min(Math.max(o.left, e.leftPx), Math.max(o.left, p)), b = Math.min(Math.max(o.top, e.topPx), Math.max(o.top, d));
  return { leftPx: Math.round(M), topPx: Math.round(b), widthPx: Math.round(u), heightPx: Math.round(c) };
}
function xo(e) {
  const o = e ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 };
  try {
    const i = localStorage.getItem(at);
    if (!i) return Je(o);
    const n = JSON.parse(i);
    return Number.isFinite(Number(n == null ? void 0 : n.leftPx)) && Number.isFinite(Number(n == null ? void 0 : n.topPx)) && Number.isFinite(Number(n == null ? void 0 : n.widthPx)) && Number.isFinite(Number(n == null ? void 0 : n.heightPx)) ? te({ leftPx: Number(n.leftPx), topPx: Number(n.topPx), widthPx: Number(n.widthPx), heightPx: Number(n.heightPx) }, o) : Je(o);
  } catch {
    return Je(o);
  }
}
function bo(e, o) {
  const i = o ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 }, n = te(e, i);
  try {
    localStorage.setItem(at, JSON.stringify(n));
  } catch {
  }
}
function vo() {
  try {
    return localStorage.getItem(en) === "1";
  } catch {
    return false;
  }
}
function Qe(e) {
  try {
    localStorage.setItem(en, e ? "1" : "0");
  } catch {
  }
}
const wo = "[data-app-editor-navbar]", yo = 56;
function nn() {
  const e = document.querySelector(wo);
  return e instanceof HTMLElement ? e : null;
}
function Eo() {
  const e = nn();
  return e ? e.getBoundingClientRect().bottom : yo;
}
function Lo(e) {
  const o = e == null ? void 0 : e.current, i = (o == null ? void 0 : o.value) ?? o ?? null;
  return i && typeof i == "object" && "root" in i && i.root instanceof Element ? i.root : null;
}
function Dt(e) {
  const i = Eo(), n = Hn(), u = Math.max(i + 1, n), c = { left: 8, top: Math.max(8, i), right: Math.max(8, window.innerWidth - 8), bottom: u, width: Math.max(0, window.innerWidth - 16), height: Math.max(0, u - Math.max(8, i)) }, p = Lo(e);
  if (!p) return c;
  const d = p.getBoundingClientRect(), M = nn(), b = M ? M.getBoundingClientRect().bottom : Math.max(d.top, i), f = d.left, E = d.right;
  return { left: f, top: b, right: E, bottom: u, width: Math.max(0, E - f), height: Math.max(0, u - b) };
}
const jt = 5, zt = "llm-assist-modal-resize-cursor-style", ye = "llm-assist-modal-corner-resize";
function Po() {
  if (document.getElementById(zt)) return;
  const e = document.createElement("style");
  e.id = zt, e.textContent = `
    html.${ye},
    html.${ye} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(e);
}
function Ao(e) {
  return e === "e" || e === "w" ? "ew-resize" : e === "se" ? "nwse-resize" : "nesw-resize";
}
function Mo(e) {
  Po();
  const o = Ao(e);
  document.documentElement.style.setProperty("--llm-assist-resize-cursor", o), document.documentElement.classList.add(ye), document.body.style.userSelect = "none";
}
function ko() {
  document.documentElement.classList.remove(ye), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
}
function So(e, { enabled: o = true } = {}) {
  const i = s.useRef(Dt(e)), [n, u] = s.useState(() => xo(i.current)), c = s.useRef(null), p = s.useRef({ active: false, startX: 0, startY: 0, startLayout: n }), d = s.useRef(null), M = s.useCallback(() => {
    i.current = Dt(e), u((x) => te(x, i.current));
  }, [e]);
  s.useEffect(() => {
    var _a, _b, _c;
    if (!o) return;
    M();
    const x = () => M();
    window.addEventListener("resize", x), window.addEventListener("scroll", x, true);
    const y = ((_b = (_a = e == null ? void 0 : e.current) == null ? void 0 : _a.value) == null ? void 0 : _b.root) ?? ((_c = e == null ? void 0 : e.current) == null ? void 0 : _c.root) ?? null;
    let h = null;
    if (typeof ResizeObserver < "u") {
      if (h = new ResizeObserver(x), y) {
        h.observe(y);
        const m = y.querySelector(".md-editor-toolbar-wrapper") || y.querySelector(".md-editor-toolbar");
        m && h.observe(m);
      }
      const L = document.querySelector("[data-app-editor-navbar]");
      L && h.observe(L);
      const C = document.querySelector("[data-app-status-bar]");
      C && h.observe(C);
    }
    return () => {
      window.removeEventListener("resize", x), window.removeEventListener("scroll", x, true), h == null ? void 0 : h.disconnect();
    };
  }, [o, e, M]);
  const b = s.useCallback((x) => {
    const y = te(x, i.current);
    return bo(y, i.current), y;
  }, []), f = s.useCallback((x, y) => {
    const h = p.current;
    if (!h.active) return;
    const L = x - h.startX, C = y - h.startY;
    u(te({ ...h.startLayout, leftPx: h.startLayout.leftPx + L, topPx: h.startLayout.topPx + C }, i.current));
  }, []), E = s.useCallback((x, { onTap: y } = {}) => {
    if (x.pointerType === "touch" || x.button !== 0) return;
    x.preventDefault();
    const h = x.clientX, L = x.clientY;
    let C = false;
    p.current = { active: true, startX: h, startY: L, startLayout: n };
    const m = (N) => {
      p.current.active && (Math.hypot(N.clientX - h, N.clientY - L) > jt && (C = true), f(N.clientX, N.clientY));
    }, l = () => {
      p.current.active && (p.current.active = false, document.removeEventListener("pointermove", m), document.removeEventListener("pointerup", l), u((N) => b(N)), C || (y == null ? void 0 : y()));
    };
    document.addEventListener("pointermove", m), document.addEventListener("pointerup", l);
  }, [f, n, b]), w = s.useCallback((x, { onTap: y } = {}) => {
    const h = x.changedTouches;
    if (!(h == null ? void 0 : h.length)) return;
    const L = h[0];
    if (!L) return;
    const C = L.identifier, m = L.clientX, l = L.clientY;
    x.preventDefault();
    let N = false;
    p.current = { active: true, startX: m, startY: l, startLayout: n, touchIdentifier: C };
    const F = (H) => {
      if (!p.current.active) return;
      const k = Array.from(H.touches).find((W) => W.identifier === C);
      k && (Math.hypot(k.clientX - m, k.clientY - l) > jt && (N = true), f(k.clientX, k.clientY), H.preventDefault());
    }, ee = () => {
      p.current.active && (p.current.active = false, document.removeEventListener("touchmove", F), document.removeEventListener("touchend", V), document.removeEventListener("touchcancel", V), u((H) => b(H)), N || (y == null ? void 0 : y()));
    }, V = (H) => {
      !p.current.active || !Array.from(H.changedTouches).some((W) => W.identifier === C) || ee();
    };
    document.addEventListener("touchmove", F, { passive: false }), document.addEventListener("touchend", V, { passive: false }), document.addEventListener("touchcancel", V, { passive: false });
  }, [f, n, b]), A = s.useCallback((x, y) => {
    const h = d.current;
    if (!h) return;
    const L = x - h.startX, C = y - h.startY, m = h.startLayout;
    let l;
    h.corner === "se" ? l = { leftPx: m.leftPx, topPx: m.topPx, widthPx: m.widthPx + L, heightPx: m.heightPx + C } : h.corner === "sw" ? l = { leftPx: m.leftPx + L, topPx: m.topPx, widthPx: m.widthPx - L, heightPx: m.heightPx + C } : h.corner === "e" ? l = { leftPx: m.leftPx, topPx: m.topPx, widthPx: m.widthPx + L, heightPx: m.heightPx } : l = { leftPx: m.leftPx + L, topPx: m.topPx, widthPx: m.widthPx - L, heightPx: m.heightPx }, u(te(l, i.current));
  }, []), T = s.useCallback((x, y) => {
    if (y.button !== 0) return;
    y.preventDefault(), y.stopPropagation(), d.current = { corner: x, startX: y.clientX, startY: y.clientY, startLayout: n }, Mo(x);
    const h = y.currentTarget;
    h instanceof HTMLElement && typeof h.setPointerCapture == "function" && h.setPointerCapture(y.pointerId);
    const L = () => {
      d.current = null, ko(), document.removeEventListener("pointermove", C), document.removeEventListener("pointerup", m), document.removeEventListener("pointercancel", m);
    }, C = (l) => {
      l.preventDefault(), A(l.clientX, l.clientY);
    }, m = () => {
      d.current && (L(), u((l) => b(l)));
    };
    document.addEventListener("pointermove", C, { passive: false }), document.addEventListener("pointerup", m), document.addEventListener("pointercancel", m);
  }, [A, n, b]), R = s.useCallback((x, y) => T(x, y), [T]), O = { left: n.leftPx, top: n.topPx, width: n.widthPx, height: n.heightPx };
  return { layout: n, panelRef: c, panelStyle: O, startPositionDrag: E, startPositionTouchDrag: w, startCornerResize: R, startEdgeResize: T, refreshBounds: M };
}
function Ft(e) {
  if (!e || typeof e != "object") return false;
  const o = e;
  return typeof o.getEditorView == "function" || typeof o.getSelectedText == "function";
}
function on(e) {
  const o = e == null ? void 0 : e.current;
  if (!o || typeof o != "object") return null;
  if (Ft(o)) return o;
  const i = o.value;
  return Ft(i) ? i : null;
}
function rn(e) {
  return on(e);
}
const To = [50, 200, 500, 1e3];
function Co(e, o = null) {
  if (o == null ? void 0 : o.dom) return o.dom.closest(".md-editor");
  const i = rn(e);
  return typeof Element < "u" && (i == null ? void 0 : i.root) instanceof Element ? i.root : null;
}
function Ro(e, { view: o = null, documentKey: i = null } = {}) {
  var _a;
  const n = o ?? Le(e, { documentKey: i }).view, u = Co(e, n);
  return Xn(u) ? true : ((_a = it(n, i)) == null ? void 0 : _a.everFocused) ? false : (n == null ? void 0 : n.state, true);
}
function Io(e, o) {
  return e ? e.endsWith(`
`) ? o : `
${o}` : o;
}
function No(e, o) {
  if (!e) return o;
  const i = e.endsWith(`
`) ? "" : `
`;
  return `${e}${i}${o}`;
}
function Ee(e, o, i) {
  const n = Math.max(0, Math.min(o, e)), u = Math.max(n, Math.min(i, e));
  return { from: n, to: u };
}
function _o(e, o, i, n, u) {
  if (typeof u != "function") return false;
  const c = Ee(e.length, o, i), p = `${e.slice(0, c.from)}${n}${e.slice(c.to)}`;
  return u(p), true;
}
function Vt({ editorRef: e, result: o, onChange: i, getMarkdown: n, forceAppendAtEnd: u = false, documentKey: c = null }) {
  var _a, _b, _c;
  const p = Le(e, { documentKey: c }), { view: d } = p;
  if (u || Ro(e, { view: d, documentKey: c })) {
    const T = ((_c = (_b = (_a = d == null ? void 0 : d.state) == null ? void 0 : _a.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? (typeof n == "function" ? n() : ""), R = Io(T, o);
    if (d == null ? void 0 : d.state) {
      const O = T.length;
      return Bt(d, O, O, R, i);
    }
    return typeof i == "function" ? (i(No(T, o)), true) : false;
  }
  const b = it(d, c);
  let f = p.from, E = p.to;
  if ((!(d == null ? void 0 : d.hasFocus) && (b == null ? void 0 : b.everFocused) || f === E && (b == null ? void 0 : b.everFocused)) && (f = b.from, E = b.to), !(b == null ? void 0 : b.everFocused) && f === E && !p.text.trim()) return false;
  if (d == null ? void 0 : d.state) {
    const T = d.state.doc.length, R = Ee(T, f, E);
    return Bt(d, R.from, R.to, o, i);
  }
  const A = typeof n == "function" ? n() : "";
  return _o(A, f, E, o, i);
}
function Oo(e, o, i) {
  var _a, _b;
  const n = e.state.selection.main, u = !!e.hasFocus, c = it(e, i);
  if (u) {
    const M = e.state.doc.sliceString(n.from, n.to);
    if (M) return { text: M, from: n.from, to: n.to, view: e };
    if (c == null ? void 0 : c.everFocused) {
      const f = e.state.doc.length, { from: E, to: w } = Ee(f, c.from, c.to);
      return { text: e.state.doc.sliceString(E, w), from: E, to: w, view: e };
    }
    const b = ((_a = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _a.call(o)) ?? "";
    return b ? { text: b, from: n.from, to: n.to, view: e } : { text: "", from: n.from, to: n.to, view: e };
  }
  if (c == null ? void 0 : c.everFocused) {
    const M = e.state.doc.length, { from: b, to: f } = Ee(M, c.from, c.to);
    return { text: e.state.doc.sliceString(b, f), from: b, to: f, view: e };
  }
  const p = e.state.doc.sliceString(n.from, n.to);
  if (p) return { text: p, from: n.from, to: n.to, view: e };
  const d = ((_b = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _b.call(o)) ?? "";
  return d ? { text: d, from: n.from, to: n.to, view: e } : { text: p, from: n.from, to: n.to, view: e };
}
function Le(e, o) {
  var _a, _b, _c;
  const i = (o == null ? void 0 : o.documentKey) ?? null, n = ((_a = o == null ? void 0 : o.getEditorApi) == null ? void 0 : _a.call(o)) ?? on(e), u = ((_b = n == null ? void 0 : n.getEditorView) == null ? void 0 : _b.call(n)) ?? null;
  if (u == null ? void 0 : u.state) return Oo(u, n, i);
  const c = xn(i);
  return (c == null ? void 0 : c.everFocused) ? { text: "", from: c.from, to: c.to, view: null } : { text: ((_c = n == null ? void 0 : n.getSelectedText) == null ? void 0 : _c.call(n)) ?? "", from: 0, to: 0, view: null };
}
function Do(e) {
  var _a, _b;
  return ((_b = (_a = rn(e)) == null ? void 0 : _a.getEditorView) == null ? void 0 : _b.call(_a)) ?? null;
}
function jo(e, o, i) {
  let n = false, u = null, c = null;
  const p = [], d = (i == null ? void 0 : i.documentKey) ?? null, M = () => {
    n || o(Le(e, { documentKey: d }));
  }, b = () => {
    c == null ? void 0 : c(), c = null, u = null;
  };
  let f = null, E = false;
  const w = () => {
    if (n) return true;
    const A = Do(e);
    if (!A || A === u) return !!A;
    b(), u = A, E = false, f || (f = new Un());
    const T = f, R = Wn.updateListener.of((O) => {
      O.selectionSet && M();
    });
    if (E) try {
      A.dispatch({ effects: T.reconfigure(R) });
    } catch {
      E = false;
    }
    if (!E) try {
      A.dispatch({ effects: Kn.appendConfig.of(T.of(R)) }), E = true;
    } catch {
      return M(), true;
    }
    return c = () => {
      if (E) {
        try {
          A.dispatch({ effects: T.reconfigure([]) });
        } catch {
        }
        E = false;
      }
    }, M(), true;
  };
  if (!w()) for (const A of To) p.push(setTimeout(() => {
    n || w();
  }, A));
  return () => {
    n = true;
    for (const A of p) clearTimeout(A);
    b();
  };
}
function Bt(e, o, i, n, u) {
  var _a;
  return (e == null ? void 0 : e.state) ? (e.dispatch({ changes: { from: o, to: i, insert: n }, selection: { anchor: o + n.length } }), (_a = e.focus) == null ? void 0 : _a.call(e), u == null ? void 0 : u(e.state.doc.toString()), true) : false;
}
const zo = 520, Fo = 12, Ht = 80, Wt = 300, Vo = 180, Bo = vn, Ho = [0.4, 0, 0.2, 1];
function et(e) {
  return typeof window > "u" ? e * 5 : window.innerWidth * e / 100;
}
function Kt(e) {
  var _a;
  return e ? e.closest("[data-llm-assist-layout-root]") || ((_a = e.parentElement) == null ? void 0 : _a.parentElement) || e.parentElement : null;
}
function Wo({ open: e, onClose: o, children: i, className: n = "" }) {
  const u = s.useRef(null), [c, p] = s.useState(() => Math.max(Wt, Math.floor(et(Ht)))), d = Math.max(1, Math.floor(et(Fo)));
  s.useEffect(() => {
    if (!e) return;
    const A = () => {
      var _a;
      const h = (((_a = Kt(u.current)) == null ? void 0 : _a.clientWidth) ?? window.innerWidth) - Vo, L = Math.max(Wt, Math.floor(et(Ht)));
      p(Math.max(d, Math.min(L, h)));
    };
    A();
    const T = requestAnimationFrame(A);
    window.addEventListener("resize", A);
    let R = null;
    const O = Kt(u.current);
    return O && typeof ResizeObserver < "u" && (R = new ResizeObserver(A), R.observe(O)), () => {
      cancelAnimationFrame(T), window.removeEventListener("resize", A), R == null ? void 0 : R.disconnect();
    };
  }, [d, e]);
  const M = Math.max(1, Math.floor(d / 3)), { width: b, isResizing: f, handleProps: E } = bn({ storageKey: "s3haim_llm_assist_dock_width", defaultWidth: zo, minWidth: d, maxWidth: Math.max(c, d), edge: "right", collapseBelowWidth: M, onCollapseBelowMin: typeof o == "function" ? o : void 0 }), w = Math.min(b, c);
  return a.jsx(nt, { initial: false, children: e ? a.jsx(ot.div, { className: "relative h-full min-h-0 shrink-0 overflow-hidden", initial: { width: 0 }, animate: { width: w }, exit: { width: 0 }, transition: f ? { duration: 0 } : { duration: 0.28, ease: Ho }, children: a.jsxs("div", { ref: u, className: `relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${n}`, style: { width: w }, children: [a.jsx(Bo, { handleProps: { ...E, "aria-valuenow": Math.round(w), "aria-valuemax": Math.round(c) }, isResizing: f, edge: "left", visibleOnHover: true, label: "AI \uB3C4\uC6B0\uBBF8 \uB108\uBE44 \uC870\uC808" }), a.jsx("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col", children: i })] }) }, "llm-assist-dock") : null });
}
const Ko = "inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", Uo = "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50", Xo = "z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
function Yo(e) {
  return e === "docked" ? Yt : e === "split" ? qt : Xt;
}
function qo({ presentation: e, onChange: o, splitEnabled: i = true }) {
  const n = Yo(e), u = [{ value: "floating", label: "\uD50C\uB85C\uD305 \uCC3D", icon: Xt }, { value: "docked", label: "\uC6B0\uCE21\uC5D0 \uACE0\uC815", icon: Yt }, { value: "split", label: "\uC2A4\uD50C\uB9BF \uCC3D", icon: qt, disabled: !i }];
  return a.jsxs(so, { children: [a.jsxs($t, { children: [a.jsx(Gt, { asChild: true, children: a.jsx(io, { asChild: true, children: a.jsxs("button", { type: "button", onPointerDown: (c) => c.stopPropagation(), onTouchStart: (c) => c.stopPropagation(), className: Ko, "aria-label": "\uD45C\uC2DC \uBC29\uC2DD", children: [a.jsx(n, { size: 15, "aria-hidden": true }), a.jsx(Qn, { size: 12, "aria-hidden": true, className: "opacity-70" })] }) }) }), a.jsx(Zt, { children: a.jsxs(Jt, { side: "bottom", sideOffset: 6, className: "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50", children: ["\uD45C\uC2DC \uBC29\uC2DD", a.jsx(Qt, { className: "fill-white dark:fill-odp-surface" })] }) })] }), a.jsx(ao, { children: a.jsx(lo, { side: "bottom", align: "end", sideOffset: 4, className: Xo, onCloseAutoFocus: (c) => c.preventDefault(), children: u.map((c) => {
    const p = c.icon, d = e === c.value;
    return a.jsxs(co, { disabled: !!c.disabled, className: `${Uo} ${c.disabled ? "cursor-not-allowed opacity-40" : ""}`, onSelect: () => {
      c.disabled || c.value === e || o(c.value);
    }, children: [a.jsx(p, { size: 14, className: "shrink-0 opacity-80", "aria-hidden": true }), a.jsx("span", { className: "min-w-0 flex-1", children: c.label }), d ? a.jsx(eo, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300", "aria-hidden": true }) : null] }, c.value);
  }) }) })] });
}
const $o = [0.4, 0, 0.2, 1], Ut = { duration: 0.28, ease: $o }, Go = "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", Zo = "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
function tt({ label: e, onClick: o, disabled: i, children: n }) {
  return a.jsxs($t, { children: [a.jsx(Gt, { asChild: true, children: a.jsx("button", { type: "button", onPointerDown: (u) => u.stopPropagation(), onTouchStart: (u) => u.stopPropagation(), onClick: o, disabled: i, className: Go, "aria-label": e, children: n }) }), a.jsx(Zt, { children: a.jsxs(Jt, { side: "bottom", sideOffset: 6, className: Zo, children: [e, a.jsx(Qt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Mr({ editorRef: e = null, onChange: o, getMarkdown: i, llmProviderProfiles: n, open: u, onOpenChange: c, theme: p = "light" }) {
  var _a, _b, _c;
  const d = wn(), M = yn(), { requestCreateFileWithContent: b } = En(), f = d ? d.open : !!u, E = d ? d.setOpen : c, w = (d == null ? void 0 : d.presentation) ?? "floating", A = d == null ? void 0 : d.setPresentation, T = d == null ? void 0 : d.openAsSplit, R = d == null ? void 0 : d.dockToRight, O = d == null ? void 0 : d.undockToFloating, x = d ? d.canInsertIntoDocument : !!e, y = !!(M == null ? void 0 : M.workspaceTabsEnabled), [h, L] = s.useState(() => Ue());
  s.useEffect(() => (L(Ue()), Ln(() => {
    L(Ue());
  })), []);
  const C = s.useCallback((t) => {
    if (t === "split") {
      if (!y) return;
      T == null ? void 0 : T();
      return;
    }
    if (t === "docked") {
      R == null ? void 0 : R();
      return;
    }
    O == null ? void 0 : O();
  }, [y, T, R, O]), m = ((_a = d == null ? void 0 : d.editorBridge) == null ? void 0 : _a.editorRef) ?? e, l = (d == null ? void 0 : d.editorBridge) ?? null, N = ((_b = d == null ? void 0 : d.editorBridge) == null ? void 0 : _b.onChange) ?? o, F = ((_c = d == null ? void 0 : d.editorBridge) == null ? void 0 : _c.getMarkdown) ?? i, ee = s.useMemo(() => Array.isArray(n) ? n : [], [n]), [V, H] = s.useState(() => vo()), [k, W] = s.useState(false), [ne, oe] = s.useState(""), [lt, Pe] = s.useState({ from: 0, to: 0 }), [$, Ae] = s.useState([]), [K, fe] = s.useState(""), [U, me] = s.useState(() => Xe()), [X, pe] = s.useState(() => ({ ...St })), [I, B] = s.useState(""), [Me, ct] = s.useState("text"), [ke, ut] = s.useState(false), [Se, Y] = s.useState(""), [re, sn] = s.useState([]), [Te, he] = s.useState(""), [se, ge] = s.useState(""), [G, xe] = s.useState(null), [be, Ce, dt] = Yn(ee), v = Pn(ee, be), [D, Re] = s.useState(() => v ? Pt(v.id, v.kind) : ""), j = s.useRef(null), z = s.useRef(false), ie = s.useRef(null), { panelRef: an, panelStyle: Ie, startPositionDrag: ft, startPositionTouchDrag: mt, startCornerResize: pt, startEdgeResize: ht, refreshBounds: gt } = So(m, { enabled: f && w === "floating" }), ae = s.useCallback(() => ({ selectedText: ne, selectionRange: lt, attachedImages: $, instruction: K, systemPrompt: U, requestOptions: X, result: I, resultViewMode: Me, loading: ke, error: Se, templates: re, selectedTemplateId: Te, templateName: se, editingTemplateId: G, profiles: ee.map((t) => ({ id: t.id, name: t.name, kind: t.kind, baseUrl: t.baseUrl })), selectedProfileId: be, model: D, theme: p }), [ne, lt, $, K, U, X, I, Me, ke, Se, re, Te, se, G, ee, be, D, p]), ve = s.useCallback(() => {
    if (z.current) {
      $e(null, ae());
      return;
    }
    const t = j.current;
    !t || t.closed || $e(t, ae());
  }, [ae]), le = s.useCallback(() => {
    const t = z.current ? null : j.current;
    j.current = null, z.current = false, $n(t).finally(() => {
      W(false);
    });
  }, []), _ = s.useCallback(() => {
    if (!m && !(l == null ? void 0 : l.getEditorApi) && !(l == null ? void 0 : l.getSelection) && !(l == null ? void 0 : l.getMarkdown)) return "";
    if (typeof (l == null ? void 0 : l.getSelection) == "function") {
      const { text: P, from: q, to: J } = l.getSelection();
      return oe((Q) => Q === P ? Q : P), Pe((Q) => Q.from === q && Q.to === J ? Q : { from: q, to: J }), P;
    }
    const { text: t, from: r, to: g } = Le(m, { ...(l == null ? void 0 : l.getEditorApi) ? { getEditorApi: l.getEditorApi } : {}, ...(l == null ? void 0 : l.documentKey) ? { documentKey: l.documentKey } : {} });
    let S = t;
    return !S && (l == null ? void 0 : l.getMarkdown) && r !== g && (S = (l.getMarkdown() ?? "").slice(r, g)), oe((P) => P === S ? P : S), Pe((P) => P.from === r && P.to === g ? P : { from: r, to: g }), S;
  }, [m, l]), Z = s.useCallback(async () => {
    const t = await An();
    return sn(t), t;
  }, []);
  s.useEffect(() => {
    f && (w !== "floating" && (H(false), Qe(false)), (w === "split" || w === "docked") && le(), gt(), dt(), _(), Z(), Y(""));
  }, [f, w, gt, _, Z, dt, le]), s.useEffect(() => {
    if (!(v == null ? void 0 : v.id) || !(v == null ? void 0 : v.kind)) {
      Re("");
      return;
    }
    Re(Pt(v.id, v.kind));
  }, [v == null ? void 0 : v.id, v == null ? void 0 : v.kind]), s.useEffect(() => {
    const t = () => {
      he(""), xe(null), Z();
    };
    return window.addEventListener(At, t), () => {
      window.removeEventListener(At, t);
    };
  }, [Z]), s.useEffect(() => {
    f && _();
  }, [f, l, _]), s.useEffect(() => {
    if (!f || k || w === "floating" && V) return;
    const t = ({ text: r, from: g, to: S }) => {
      oe((P) => P === r ? P : r), Pe((P) => P.from === g && P.to === S ? P : { from: g, to: S });
    };
    if (typeof (l == null ? void 0 : l.subscribeSelection) == "function") return l.subscribeSelection(t);
    if (m) return jo(m, t, (l == null ? void 0 : l.documentKey) ? { documentKey: l.documentKey } : void 0);
  }, [f, V, k, m, w, l, l == null ? void 0 : l.documentKey, l == null ? void 0 : l.subscribeSelection]), s.useEffect(() => {
    if (!f || k || !m && !(l == null ? void 0 : l.getEditorApi) && !(l == null ? void 0 : l.getSelection) || w === "floating" && V) return;
    const t = window.setInterval(() => {
      _();
    }, 800);
    return () => window.clearInterval(t);
  }, [f, V, k, m, l, w, _]), s.useEffect(() => {
    ve();
  }, [ve]), s.useEffect(() => {
    if (!k) return;
    const t = setInterval(() => {
      Rt(z.current ? null : j.current).then((r) => {
        r || (j.current = null, z.current = false, W(false));
      });
    }, 400);
    return () => clearInterval(t);
  }, [k]), s.useEffect(() => {
    if (!f) {
      le();
      return;
    }
    const t = () => {
      Zn(z.current ? null : j.current);
    };
    return window.addEventListener("beforeunload", t), () => window.removeEventListener("beforeunload", t);
  }, [f, le]);
  const Ne = s.useCallback((t) => {
    const r = String(t || "").trim();
    Re(r), v && (de(v.id, r), v.kind === Mn ? Mt(r) : kt(r));
  }, [v]), we = s.useCallback(() => {
    const t = ie.current;
    !t || t.signal.aborted || t.abort(zn());
  }, []), _e = s.useCallback(async () => {
    if (ie.current) return;
    const t = new AbortController();
    ie.current = t, Y(""), B(""), ut(true);
    try {
      const r = ne;
      if (!v) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
      if (v.kind === kn) {
        const S = (v.baseUrl || "").trim();
        if (!S) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
        de(v.id, D), kt(D);
        const P = await Ye(v.id, () => v.apiKey || "", (q) => Tt({ baseUrl: S, apiKey: q, model: D, instruction: K, systemPrompt: U, selectedText: r, images: $, requestOptions: X, onChunk: B, signal: t.signal }), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
        B(P);
        return;
      }
      if (v.kind === Sn) {
        const S = Tn(), P = await Cn(S, { signal: t.signal }), q = (v.baseUrl || P.baseUrl || "").trim();
        if (!q) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
        const J = D.trim() || S.selectedModelId || P.models[0] || "";
        if (!J) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
        de(v.id, J);
        const Q = await Ye(v.id, () => v.apiKey || S.apiKey || "no-key-required", (hn) => Tt({ baseUrl: q, apiKey: hn, model: J, instruction: K, systemPrompt: U, selectedText: r, images: $, requestOptions: X, onChunk: B, signal: t.signal }), { allowEmpty: true, missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
        B(Q);
        return;
      }
      if (v.kind === Rn) {
        const S = In(), P = await Nn(S);
        if (!P.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
        const q = D.trim() || S.selectedModelId || P.models[0] || "";
        if (!q) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
        de(v.id, q);
        const J = await qn({ instruction: K, systemPrompt: U, selectedText: r, images: $, requestOptions: X, onChunk: B, signal: t.signal });
        B(J);
        return;
      }
      if (Fn(D)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
      de(v.id, D), Mt(D);
      const g = await Ye(v.id, () => v.apiKey || "", (S) => Vn({ apiKey: S, model: D, instruction: K, systemPrompt: U, selectedText: r, images: $, requestOptions: X, onChunk: B, signal: t.signal }), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
      B(g);
    } catch (r) {
      if (Bn(r)) {
        Y("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
        return;
      }
      Y(r instanceof Error ? r.message : "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      ie.current === t && (ie.current = null, ut(false));
    }
  }, [ne, $, v, D, K, U, X]), Oe = s.useCallback(() => {
    if (!I) return;
    if (!x || !m && !F && !(l == null ? void 0 : l.applyResult)) {
      Y("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!(typeof (l == null ? void 0 : l.applyResult) == "function" ? l.applyResult(I) : Vt({ editorRef: m ?? { current: null }, result: I, ...N ? { onChange: N } : {}, ...F ? { getMarkdown: F } : {}, ...(l == null ? void 0 : l.documentKey) ? { documentKey: l.documentKey } : {} }))) {
      Y("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    _();
  }, [I, m, x, N, F, _, l]), De = s.useCallback(() => {
    if (!I) return;
    if (!x || !m && !F && !(l == null ? void 0 : l.applyResult)) {
      Y("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!(typeof (l == null ? void 0 : l.applyResult) == "function" ? l.applyResult(I, { forceAppendAtEnd: true }) : Vt({ editorRef: m ?? { current: null }, result: I, ...N ? { onChange: N } : {}, ...F ? { getMarkdown: F } : {}, forceAppendAtEnd: true, ...(l == null ? void 0 : l.documentKey) ? { documentKey: l.documentKey } : {} }))) {
      Y("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    _();
  }, [I, m, x, N, F, _, l]), je = s.useCallback(async () => {
    if (!I) return;
    await _n(I, { message: "\uACB0\uACFC\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4" }) || Y("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  }, [I]), ze = s.useCallback(() => {
    I && b(I);
  }, [I, b]), Fe = s.useCallback((t) => {
    he(t);
    const r = re.find((g) => g.id === t);
    r && (fe(r.instruction), me(typeof r.systemPrompt == "string" && r.systemPrompt.trim() ? r.systemPrompt : Xe()), pe(qe(r.requestOptions)), ge(r.name), xe(r.id));
  }, [re]), Ve = s.useCallback(async () => {
    const t = se.trim(), r = K.trim();
    if (!t || !r) {
      alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    try {
      const g = await On({ id: G || Dn().id, name: t, instruction: r, systemPrompt: U.trim(), requestOptions: qe(X), updatedAt: Date.now() });
      xe(g.id), he(g.id), await Z();
    } catch (g) {
      alert(g instanceof Error ? g.message : "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [se, K, U, X, G, Z]), ce = s.useCallback(() => {
    xe(null), he(""), ge(""), fe(""), me(Xe()), pe({ ...St });
  }, []), Be = s.useCallback(async () => {
    if (G && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
      await jn(G), ce(), await Z();
    } catch (t) {
      alert(t instanceof Error ? t.message : "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [G, ce, Z]), ue = s.useCallback(async (t) => {
    t.length && Ae((r) => [...r, ...t]);
  }, []), He = s.useCallback((t) => {
    t && Ae((r) => r.filter((g) => g.id !== t));
  }, []), We = s.useCallback(() => {
    Ae([]);
  }, []), xt = s.useCallback(async (t) => {
    try {
      const r = await fo(t);
      await ue(r);
    } catch (r) {
      Y(r instanceof Error ? r.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
  }, [ue]), bt = s.useCallback(async (t, r = {}) => {
    switch (t) {
      case "refresh-selection":
        _();
        break;
      case "set-selected-text":
        oe(typeof r.value == "string" ? r.value : "");
        break;
      case "run":
        await _e();
        break;
      case "cancel-run":
        we();
        break;
      case "apply-result":
        Oe();
        break;
      case "append-result":
        De();
        break;
      case "copy-result":
        je();
        break;
      case "create-note-from-result":
        ze();
        break;
      case "set-instruction":
        fe(typeof r.value == "string" ? r.value : "");
        break;
      case "set-system-prompt":
        me(typeof r.value == "string" ? r.value : "");
        break;
      case "set-request-options":
        pe(qe(r.value));
        break;
      case "set-result":
        B(typeof r.value == "string" ? r.value : "");
        break;
      case "set-model":
        typeof r.value == "string" && Ne(r.value);
        break;
      case "set-llm-profile-id":
        typeof r.value == "string" && Ce(r.value);
        break;
      case "load-template":
        Fe(String(r.id ?? ""));
        break;
      case "save-template":
        await Ve();
        break;
      case "new-template":
        ce();
        break;
      case "delete-template":
        await Be();
        break;
      case "set-template-name":
        ge(typeof r.value == "string" ? r.value : "");
        break;
      case "set-result-view-mode":
        (r.value === "preview" || r.value === "text") && ct(r.value);
        break;
      case "add-images": {
        const g = (Array.isArray(r.images) ? r.images : []).map(mo).filter((S) => S !== null);
        g.length && await ue(g);
        break;
      }
      case "remove-image":
        He(String(r.id ?? ""));
        break;
      case "clear-images":
        We();
        break;
      case "close":
        E == null ? void 0 : E(false);
        break;
    }
  }, [_, _e, we, Oe, De, je, ze, Ne, Ce, Fe, Ve, ce, Be, ue, He, We, E]);
  s.useEffect(() => {
    if (!f) return;
    let t = () => {
    }, r = false;
    return Gn((g) => {
      if (g.type === Ot.READY) {
        g.source && typeof g.source.postMessage == "function" ? (j.current = g.source, z.current = false) : Ct() && (j.current = null, z.current = true), W(true), $e(z.current ? null : j.current, ae());
        return;
      }
      g.type === Ot.ACTION && g.action && bt(g.action, g.payload ?? {});
    }).then((g) => {
      if (r) {
        g();
        return;
      }
      t = g;
    }), () => {
      r = true, t();
    };
  }, [f, ae, bt]);
  const ln = () => {
    H(true), Qe(true);
  }, Ke = () => {
    H(false), Qe(false), _();
  }, vt = () => {
    we(), le(), E == null ? void 0 : E(false);
  }, cn = () => {
    (async () => {
      if (Ct() && await Rt(null)) {
        z.current = true, j.current = null, await _t(null), ve(), W(true);
        return;
      }
      const t = j.current;
      if (t && !t.closed) {
        await _t(t), ve(), W(true);
        return;
      }
      const r = await Jn();
      if (!r) {
        alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      r === "tauri" ? (z.current = true, j.current = null) : (z.current = false, j.current = r), W(true);
    })();
  }, wt = { theme: p, profiles: ee, selectedProfileId: be, onSelectedProfileIdChange: Ce, selectedProfile: v, model: D, onModelChange: Ne, selectedText: ne, onSelectedTextChange: oe, onRefreshSelection: _, attachedImages: $, onAddImages: ue, onRemoveImage: He, onClearImages: We, instruction: K, onInstructionChange: fe, systemPrompt: U, onSystemPromptChange: me, requestOptions: X, onRequestOptionsChange: pe, result: I, onResultChange: B, resultViewMode: Me, onResultViewModeChange: ct, loading: ke, error: Se, templates: re, selectedTemplateId: Te, onLoadTemplate: Fe, templateName: se, onTemplateNameChange: ge, editingTemplateId: G, onSaveTemplate: Ve, onNewTemplate: ce, onDeleteTemplate: Be, onRun: _e, onCancelGeneration: we, onApplyResult: Oe, onAppendResult: De, onCopyResult: je, onCreateNoteFromResult: ze, presentation: w, canInsertIntoDocument: x }, yt = a.jsx(uo, { delayDuration: 250, skipDelayDuration: 0, children: a.jsxs("div", { className: "flex shrink-0 flex-wrap items-center justify-end gap-1", children: [typeof A == "function" || typeof R == "function" || typeof O == "function" || typeof T == "function" ? a.jsx(qo, { presentation: w, onChange: C, splitEnabled: y }) : null, w === "floating" ? a.jsx(tt, { label: k ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", onClick: cn, disabled: k, children: a.jsx(no, { size: 15 }) }) : null, w === "floating" ? a.jsx(tt, { label: "\uC228\uAE30\uAE30", onClick: ln, children: a.jsx(oo, { size: 15 }) }) : null, a.jsx(tt, { label: "\uB2EB\uAE30", onClick: vt, children: a.jsx(ro, { size: 15 }) })] }) }), un = !!(f && w === "docked"), dn = !!(f && w === "split" && h), fn = !!(f && w === "floating" && !V && !k), mn = !!(f && w === "floating" && (V || k)), Et = k ? "AI (\uC0C8\uCC3D)" : "AI", pn = k ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC", Lt = a.jsx(It, { className: "flex h-full min-h-0 flex-col", disabled: !f, onFilesDrop: xt, children: a.jsxs("div", { className: "flex h-full min-h-0 flex-col", role: "complementary", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [a.jsxs("div", { className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", children: [a.jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [a.jsx(Ge, { size: 16, className: "shrink-0", "aria-hidden": true }), a.jsx("span", { className: "whitespace-nowrap", children: "AI \uB3C4\uC6B0\uBBF8" })] }), yt] }), a.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: a.jsx(Nt, { ...wt, enableImageDropZone: false }) })] }) });
  return a.jsxs(a.Fragment, { children: [un ? a.jsx(Wo, { open: true, onClose: vt, children: Lt }) : null, dn && h ? gn.createPortal(Lt, h) : null, a.jsx(nt, { children: mn ? a.jsxs(ot.div, { role: "button", tabIndex: 0, initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.85 }, transition: Ut, onPointerDown: (t) => ft(t, k ? {} : { onTap: Ke }), onTouchStart: (t) => mt(t, k ? {} : { onTap: Ke }), onKeyDown: (t) => {
    k || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), Ke());
  }, className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing", style: { left: Ie.left, top: Ie.top }, title: pn, "aria-label": Et, children: [a.jsx(Ge, { size: 14, "aria-hidden": true }), Et] }, "llm-assist-chip") : null }), a.jsx(nt, { children: fn ? a.jsxs(ot.div, { ref: an, initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.92 }, transition: Ut, className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center", style: Ie, role: "dialog", "aria-modal": "false", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [a.jsxs(It, { className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg", disabled: !f, onFilesDrop: xt, children: [a.jsxs("div", { className: "flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", onPointerDown: (t) => ft(t), onTouchStart: (t) => mt(t), children: [a.jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [a.jsx(to, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), a.jsx(Ge, { size: 16, className: "shrink-0", "aria-hidden": true }), a.jsx("span", { className: "whitespace-nowrap", children: "AI \uB3C4\uC6B0\uBBF8" })] }), yt] }), a.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: a.jsx(Nt, { ...wt, enableImageDropZone: false }) })] }), a.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC67C\uCABD)", className: "absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!", onPointerDown: (t) => ht("w", t) }), a.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC624\uB978\uCABD)", className: "absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!", onPointerDown: (t) => ht("e", t) }), a.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!", onPointerDown: (t) => pt("sw", t) }), a.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!", onPointerDown: (t) => pt("se", t) })] }, "llm-assist-floating") : null })] });
}
export {
  Mr as default
};
