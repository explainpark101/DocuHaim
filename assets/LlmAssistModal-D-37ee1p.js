import { r as s, j as i, a as gn } from "./vendor-react-BDjpSibw.js";
import { c1 as xn, c2 as rt, H as bn, T as vn, c3 as wn, c4 as yn, bk as En, c5 as We, c6 as Ln, g as Ke, p as Pn, b as Lt, c7 as kn, c8 as Pt, s as ce, f as Mn, c9 as kt, ca as Mt, L as An, cb as Ue, q as Sn, az as Tn, cc as Cn, e as Rn, cd as In, ce as Nn, cf as _n, cg as On, ch as Dn, ci as jn } from "./index-BpNs1tUw.js";
import { L as At, d as zn, g as St, i as Fn, e as Vn, f as Bn, n as Xe } from "./OpenAiCompatibleModelSelect-8pwkDwzW.js";
import { g as Hn } from "./appStatusBar-COMHAiNk.js";
import { E as Wn, S as Kn, C as Un } from "./vendor-codemirror-D25dVEXW.js";
import { i as Xn } from "./previewMirrorEdit-CQzLM9bT.js";
import { u as Yn } from "./LlamaCppModelSelect-c5fRMQWz.js";
import { a as Tt } from "./bootSplash-B8aCHT5v.js";
import { g as qn } from "./mlxVlmGenerateClient-CdKxKuoN.js";
import { f as Ye, g as $n, h as Ct, j as Gn, L as Rt, d as It, n as Zn, k as Nt, o as Jn, e as _t } from "./LlmAssistPanel-BB3NhurU.js";
import { A as et, m as tt } from "./vendor-motion-Dw-WnPM7.js";
import { k as Qn, $ as Ut, a0 as Xt, C as Yt, y as eo, S as qe, a1 as to, a2 as no, a3 as oo, X as ro } from "./vendor-lucide-CbEk5sea.js";
import { t as so, i as qt, j as $t, u as ao, k as Gt, l as Zt, A as Jt, v as io, w as lo, I as co, h as uo } from "./vendor-radix-DuLpLUUM.js";
import { r as fo, n as mo } from "./llmAssistImages-DG7rjEWr.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-google-genai-BsKnVxxv.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./previewSelectionSync-3qp9SC3O.js";
import "./useLazyMermaidRender-CMWw-qPT.js";
import "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
const st = "s3haim-llm-modal-position", Qt = "s3haim-llm-modal-hidden", po = 420, nt = 280, ot = 240, ho = 560, en = 44, $e = { leftVw: 55, topVh: 12 };
function go() {
  try {
    const e = localStorage.getItem(st);
    if (!e) return { ...$e };
    const o = JSON.parse(e), a = Number(o == null ? void 0 : o.leftVw), n = Number(o == null ? void 0 : o.topVh);
    return !Number.isFinite(a) || !Number.isFinite(n) ? { ...$e } : { leftVw: Math.min(95, Math.max(0, a)), topVh: Math.min(95, Math.max(0, n)) };
  } catch {
    return { ...$e };
  }
}
function Ge(e) {
  const o = window.innerWidth || 1, a = window.innerHeight || 1, n = go(), c = Math.min(po, Math.max(nt, e.width - 16)), l = Math.min(en + ho, Math.max(ot, e.height - 16)), m = { leftPx: n.leftVw / 100 * o, topPx: n.topVh / 100 * a, widthPx: c, heightPx: l };
  return Q(m, e);
}
function Q(e, o) {
  const a = Math.max(nt, o.width), n = Math.max(ot, o.height), c = Math.min(a, Math.max(nt, e.widthPx)), l = Math.min(n, Math.max(ot, e.heightPx)), m = o.right - c, u = o.bottom - en, M = Math.min(Math.max(o.left, e.leftPx), Math.max(o.left, m)), b = Math.min(Math.max(o.top, e.topPx), Math.max(o.top, u));
  return { leftPx: Math.round(M), topPx: Math.round(b), widthPx: Math.round(c), heightPx: Math.round(l) };
}
function xo(e) {
  const o = e ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 };
  try {
    const a = localStorage.getItem(st);
    if (!a) return Ge(o);
    const n = JSON.parse(a);
    return Number.isFinite(Number(n == null ? void 0 : n.leftPx)) && Number.isFinite(Number(n == null ? void 0 : n.topPx)) && Number.isFinite(Number(n == null ? void 0 : n.widthPx)) && Number.isFinite(Number(n == null ? void 0 : n.heightPx)) ? Q({ leftPx: Number(n.leftPx), topPx: Number(n.topPx), widthPx: Number(n.widthPx), heightPx: Number(n.heightPx) }, o) : Ge(o);
  } catch {
    return Ge(o);
  }
}
function bo(e, o) {
  const a = o ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 }, n = Q(e, a);
  try {
    localStorage.setItem(st, JSON.stringify(n));
  } catch {
  }
}
function vo() {
  try {
    return localStorage.getItem(Qt) === "1";
  } catch {
    return false;
  }
}
function Ze(e) {
  try {
    localStorage.setItem(Qt, e ? "1" : "0");
  } catch {
  }
}
const wo = "[data-app-editor-navbar]", yo = 56;
function tn() {
  const e = document.querySelector(wo);
  return e instanceof HTMLElement ? e : null;
}
function Eo() {
  const e = tn();
  return e ? e.getBoundingClientRect().bottom : yo;
}
function Lo(e) {
  const o = e == null ? void 0 : e.current, a = (o == null ? void 0 : o.value) ?? o ?? null;
  return a && typeof a == "object" && "root" in a && a.root instanceof Element ? a.root : null;
}
function Ot(e) {
  const a = Eo(), n = Hn(), c = Math.max(a + 1, n), l = { left: 8, top: Math.max(8, a), right: Math.max(8, window.innerWidth - 8), bottom: c, width: Math.max(0, window.innerWidth - 16), height: Math.max(0, c - Math.max(8, a)) }, m = Lo(e);
  if (!m) return l;
  const u = m.getBoundingClientRect(), M = tn(), b = M ? M.getBoundingClientRect().bottom : Math.max(u.top, a), d = u.left, E = u.right;
  return { left: d, top: b, right: E, bottom: c, width: Math.max(0, E - d), height: Math.max(0, c - b) };
}
const Dt = 5, jt = "llm-assist-modal-resize-cursor-style", we = "llm-assist-modal-corner-resize";
function Po() {
  if (document.getElementById(jt)) return;
  const e = document.createElement("style");
  e.id = jt, e.textContent = `
    html.${we},
    html.${we} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(e);
}
function ko(e) {
  return e === "e" || e === "w" ? "ew-resize" : e === "se" ? "nwse-resize" : "nesw-resize";
}
function Mo(e) {
  Po();
  const o = ko(e);
  document.documentElement.style.setProperty("--llm-assist-resize-cursor", o), document.documentElement.classList.add(we), document.body.style.userSelect = "none";
}
function Ao() {
  document.documentElement.classList.remove(we), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
}
function So(e, { enabled: o = true } = {}) {
  const a = s.useRef(Ot(e)), [n, c] = s.useState(() => xo(a.current)), l = s.useRef(null), m = s.useRef({ active: false, startX: 0, startY: 0, startLayout: n }), u = s.useRef(null), M = s.useCallback(() => {
    a.current = Ot(e), c((x) => Q(x, a.current));
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
        const f = y.querySelector(".md-editor-toolbar-wrapper") || y.querySelector(".md-editor-toolbar");
        f && h.observe(f);
      }
      const L = document.querySelector("[data-app-editor-navbar]");
      L && h.observe(L);
      const T = document.querySelector("[data-app-status-bar]");
      T && h.observe(T);
    }
    return () => {
      window.removeEventListener("resize", x), window.removeEventListener("scroll", x, true), h == null ? void 0 : h.disconnect();
    };
  }, [o, e, M]);
  const b = s.useCallback((x) => {
    const y = Q(x, a.current);
    return bo(y, a.current), y;
  }, []), d = s.useCallback((x, y) => {
    const h = m.current;
    if (!h.active) return;
    const L = x - h.startX, T = y - h.startY;
    c(Q({ ...h.startLayout, leftPx: h.startLayout.leftPx + L, topPx: h.startLayout.topPx + T }, a.current));
  }, []), E = s.useCallback((x, { onTap: y } = {}) => {
    if (x.pointerType === "touch" || x.button !== 0) return;
    x.preventDefault();
    const h = x.clientX, L = x.clientY;
    let T = false;
    m.current = { active: true, startX: h, startY: L, startLayout: n };
    const f = (R) => {
      m.current.active && (Math.hypot(R.clientX - h, R.clientY - L) > Dt && (T = true), d(R.clientX, R.clientY));
    }, p = () => {
      m.current.active && (m.current.active = false, document.removeEventListener("pointermove", f), document.removeEventListener("pointerup", p), c((R) => b(R)), T || (y == null ? void 0 : y()));
    };
    document.addEventListener("pointermove", f), document.addEventListener("pointerup", p);
  }, [d, n, b]), w = s.useCallback((x, { onTap: y } = {}) => {
    const h = x.changedTouches;
    if (!(h == null ? void 0 : h.length)) return;
    const L = h[0];
    if (!L) return;
    const T = L.identifier, f = L.clientX, p = L.clientY;
    x.preventDefault();
    let R = false;
    m.current = { active: true, startX: f, startY: p, startLayout: n, touchIdentifier: T };
    const F = (H) => {
      if (!m.current.active) return;
      const A = Array.from(H.touches).find((W) => W.identifier === T);
      A && (Math.hypot(A.clientX - f, A.clientY - p) > Dt && (R = true), d(A.clientX, A.clientY), H.preventDefault());
    }, Z = () => {
      m.current.active && (m.current.active = false, document.removeEventListener("touchmove", F), document.removeEventListener("touchend", V), document.removeEventListener("touchcancel", V), c((H) => b(H)), R || (y == null ? void 0 : y()));
    }, V = (H) => {
      !m.current.active || !Array.from(H.changedTouches).some((W) => W.identifier === T) || Z();
    };
    document.addEventListener("touchmove", F, { passive: false }), document.addEventListener("touchend", V, { passive: false }), document.addEventListener("touchcancel", V, { passive: false });
  }, [d, n, b]), k = s.useCallback((x, y) => {
    const h = u.current;
    if (!h) return;
    const L = x - h.startX, T = y - h.startY, f = h.startLayout;
    let p;
    h.corner === "se" ? p = { leftPx: f.leftPx, topPx: f.topPx, widthPx: f.widthPx + L, heightPx: f.heightPx + T } : h.corner === "sw" ? p = { leftPx: f.leftPx + L, topPx: f.topPx, widthPx: f.widthPx - L, heightPx: f.heightPx + T } : h.corner === "e" ? p = { leftPx: f.leftPx, topPx: f.topPx, widthPx: f.widthPx + L, heightPx: f.heightPx } : p = { leftPx: f.leftPx + L, topPx: f.topPx, widthPx: f.widthPx - L, heightPx: f.heightPx }, c(Q(p, a.current));
  }, []), S = s.useCallback((x, y) => {
    if (y.button !== 0) return;
    y.preventDefault(), y.stopPropagation(), u.current = { corner: x, startX: y.clientX, startY: y.clientY, startLayout: n }, Mo(x);
    const h = y.currentTarget;
    h instanceof HTMLElement && typeof h.setPointerCapture == "function" && h.setPointerCapture(y.pointerId);
    const L = () => {
      u.current = null, Ao(), document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", f), document.removeEventListener("pointercancel", f);
    }, T = (p) => {
      p.preventDefault(), k(p.clientX, p.clientY);
    }, f = () => {
      u.current && (L(), c((p) => b(p)));
    };
    document.addEventListener("pointermove", T, { passive: false }), document.addEventListener("pointerup", f), document.addEventListener("pointercancel", f);
  }, [k, n, b]), C = s.useCallback((x, y) => S(x, y), [S]), O = { left: n.leftPx, top: n.topPx, width: n.widthPx, height: n.heightPx };
  return { layout: n, panelRef: l, panelStyle: O, startPositionDrag: E, startPositionTouchDrag: w, startCornerResize: C, startEdgeResize: S, refreshBounds: M };
}
function zt(e) {
  if (!e || typeof e != "object") return false;
  const o = e;
  return typeof o.getEditorView == "function" || typeof o.getSelectedText == "function";
}
function nn(e) {
  const o = e == null ? void 0 : e.current;
  if (!o || typeof o != "object") return null;
  if (zt(o)) return o;
  const a = o.value;
  return zt(a) ? a : null;
}
function on(e) {
  return nn(e);
}
const To = [50, 200, 500, 1e3];
function Co(e, o = null) {
  if (o == null ? void 0 : o.dom) return o.dom.closest(".md-editor");
  const a = on(e);
  return typeof Element < "u" && (a == null ? void 0 : a.root) instanceof Element ? a.root : null;
}
function Ro(e, { view: o = null, documentKey: a = null } = {}) {
  var _a;
  const n = o ?? Ee(e, { documentKey: a }).view, c = Co(e, n);
  return Xn(c) ? true : ((_a = rt(n, a)) == null ? void 0 : _a.everFocused) ? false : (n == null ? void 0 : n.state, true);
}
function Io(e, o) {
  return e ? e.endsWith(`
`) ? o : `
${o}` : o;
}
function No(e, o) {
  if (!e) return o;
  const a = e.endsWith(`
`) ? "" : `
`;
  return `${e}${a}${o}`;
}
function ye(e, o, a) {
  const n = Math.max(0, Math.min(o, e)), c = Math.max(n, Math.min(a, e));
  return { from: n, to: c };
}
function _o(e, o, a, n, c) {
  if (typeof c != "function") return false;
  const l = ye(e.length, o, a), m = `${e.slice(0, l.from)}${n}${e.slice(l.to)}`;
  return c(m), true;
}
function Ft({ editorRef: e, result: o, onChange: a, getMarkdown: n, forceAppendAtEnd: c = false, documentKey: l = null }) {
  var _a, _b, _c;
  const m = Ee(e, { documentKey: l }), { view: u } = m;
  if (c || Ro(e, { view: u, documentKey: l })) {
    const S = ((_c = (_b = (_a = u == null ? void 0 : u.state) == null ? void 0 : _a.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? (typeof n == "function" ? n() : ""), C = Io(S, o);
    if (u == null ? void 0 : u.state) {
      const O = S.length;
      return Vt(u, O, O, C, a);
    }
    return typeof a == "function" ? (a(No(S, o)), true) : false;
  }
  const b = rt(u, l);
  let d = m.from, E = m.to;
  if ((!(u == null ? void 0 : u.hasFocus) && (b == null ? void 0 : b.everFocused) || d === E && (b == null ? void 0 : b.everFocused)) && (d = b.from, E = b.to), !(b == null ? void 0 : b.everFocused) && d === E && !m.text.trim()) return false;
  if (u == null ? void 0 : u.state) {
    const S = u.state.doc.length, C = ye(S, d, E);
    return Vt(u, C.from, C.to, o, a);
  }
  const k = typeof n == "function" ? n() : "";
  return _o(k, d, E, o, a);
}
function Oo(e, o, a) {
  var _a, _b;
  const n = e.state.selection.main, c = !!e.hasFocus, l = rt(e, a);
  if (c) {
    const M = e.state.doc.sliceString(n.from, n.to);
    if (M) return { text: M, from: n.from, to: n.to, view: e };
    if (l == null ? void 0 : l.everFocused) {
      const d = e.state.doc.length, { from: E, to: w } = ye(d, l.from, l.to);
      return { text: e.state.doc.sliceString(E, w), from: E, to: w, view: e };
    }
    const b = ((_a = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _a.call(o)) ?? "";
    return b ? { text: b, from: n.from, to: n.to, view: e } : { text: "", from: n.from, to: n.to, view: e };
  }
  if (l == null ? void 0 : l.everFocused) {
    const M = e.state.doc.length, { from: b, to: d } = ye(M, l.from, l.to);
    return { text: e.state.doc.sliceString(b, d), from: b, to: d, view: e };
  }
  const m = e.state.doc.sliceString(n.from, n.to);
  if (m) return { text: m, from: n.from, to: n.to, view: e };
  const u = ((_b = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _b.call(o)) ?? "";
  return u ? { text: u, from: n.from, to: n.to, view: e } : { text: m, from: n.from, to: n.to, view: e };
}
function Ee(e, o) {
  var _a, _b, _c;
  const a = (o == null ? void 0 : o.documentKey) ?? null, n = ((_a = o == null ? void 0 : o.getEditorApi) == null ? void 0 : _a.call(o)) ?? nn(e), c = ((_b = n == null ? void 0 : n.getEditorView) == null ? void 0 : _b.call(n)) ?? null;
  if (c == null ? void 0 : c.state) return Oo(c, n, a);
  const l = xn(a);
  return (l == null ? void 0 : l.everFocused) ? { text: "", from: l.from, to: l.to, view: null } : { text: ((_c = n == null ? void 0 : n.getSelectedText) == null ? void 0 : _c.call(n)) ?? "", from: 0, to: 0, view: null };
}
function Do(e) {
  var _a, _b;
  return ((_b = (_a = on(e)) == null ? void 0 : _a.getEditorView) == null ? void 0 : _b.call(_a)) ?? null;
}
function jo(e, o, a) {
  let n = false, c = null, l = null;
  const m = [], u = (a == null ? void 0 : a.documentKey) ?? null, M = () => {
    n || o(Ee(e, { documentKey: u }));
  }, b = () => {
    l == null ? void 0 : l(), l = null, c = null;
  };
  let d = null, E = false;
  const w = () => {
    if (n) return true;
    const k = Do(e);
    if (!k || k === c) return !!k;
    b(), c = k, E = false, d || (d = new Un());
    const S = d, C = Wn.updateListener.of((O) => {
      O.selectionSet && M();
    });
    if (E) try {
      k.dispatch({ effects: S.reconfigure(C) });
    } catch {
      E = false;
    }
    if (!E) try {
      k.dispatch({ effects: Kn.appendConfig.of(S.of(C)) }), E = true;
    } catch {
      return M(), true;
    }
    return l = () => {
      if (E) {
        try {
          k.dispatch({ effects: S.reconfigure([]) });
        } catch {
        }
        E = false;
      }
    }, M(), true;
  };
  if (!w()) for (const k of To) m.push(setTimeout(() => {
    n || w();
  }, k));
  return () => {
    n = true;
    for (const k of m) clearTimeout(k);
    b();
  };
}
function Vt(e, o, a, n, c) {
  var _a;
  return (e == null ? void 0 : e.state) ? (e.dispatch({ changes: { from: o, to: a, insert: n }, selection: { anchor: o + n.length } }), (_a = e.focus) == null ? void 0 : _a.call(e), c == null ? void 0 : c(e.state.doc.toString()), true) : false;
}
const zo = 520, Fo = 12, Bt = 80, Ht = 300, Vo = 180, Bo = vn, Ho = [0.4, 0, 0.2, 1];
function Je(e) {
  return typeof window > "u" ? e * 5 : window.innerWidth * e / 100;
}
function Wt(e) {
  var _a;
  return e ? e.closest("[data-llm-assist-layout-root]") || ((_a = e.parentElement) == null ? void 0 : _a.parentElement) || e.parentElement : null;
}
function Wo({ open: e, onClose: o, children: a, className: n = "" }) {
  const c = s.useRef(null), [l, m] = s.useState(() => Math.max(Ht, Math.floor(Je(Bt)))), u = Math.max(1, Math.floor(Je(Fo)));
  s.useEffect(() => {
    if (!e) return;
    const k = () => {
      var _a;
      const h = (((_a = Wt(c.current)) == null ? void 0 : _a.clientWidth) ?? window.innerWidth) - Vo, L = Math.max(Ht, Math.floor(Je(Bt)));
      m(Math.max(u, Math.min(L, h)));
    };
    k();
    const S = requestAnimationFrame(k);
    window.addEventListener("resize", k);
    let C = null;
    const O = Wt(c.current);
    return O && typeof ResizeObserver < "u" && (C = new ResizeObserver(k), C.observe(O)), () => {
      cancelAnimationFrame(S), window.removeEventListener("resize", k), C == null ? void 0 : C.disconnect();
    };
  }, [u, e]);
  const M = Math.max(1, Math.floor(u / 3)), { width: b, isResizing: d, handleProps: E } = bn({ storageKey: "s3haim_llm_assist_dock_width", defaultWidth: zo, minWidth: u, maxWidth: Math.max(l, u), edge: "right", collapseBelowWidth: M, onCollapseBelowMin: typeof o == "function" ? o : void 0 }), w = Math.min(b, l);
  return i.jsx(et, { initial: false, children: e ? i.jsx(tt.div, { className: "relative h-full min-h-0 shrink-0 overflow-hidden", initial: { width: 0 }, animate: { width: w }, exit: { width: 0 }, transition: d ? { duration: 0 } : { duration: 0.28, ease: Ho }, children: i.jsxs("div", { ref: c, className: `relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${n}`, style: { width: w }, children: [i.jsx(Bo, { handleProps: { ...E, "aria-valuenow": Math.round(w), "aria-valuemax": Math.round(l) }, isResizing: d, edge: "left", visibleOnHover: true, label: "AI \uB3C4\uC6B0\uBBF8 \uB108\uBE44 \uC870\uC808" }), i.jsx("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col", children: a })] }) }, "llm-assist-dock") : null });
}
const Ko = "inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", Uo = "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50", Xo = "z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
function Yo(e) {
  return e === "docked" ? Xt : e === "split" ? Yt : Ut;
}
function qo({ presentation: e, onChange: o, splitEnabled: a = true }) {
  const n = Yo(e), c = [{ value: "floating", label: "\uD50C\uB85C\uD305 \uCC3D", icon: Ut }, { value: "docked", label: "\uC6B0\uCE21\uC5D0 \uACE0\uC815", icon: Xt }, { value: "split", label: "\uC2A4\uD50C\uB9BF \uCC3D", icon: Yt, disabled: !a }];
  return i.jsxs(so, { children: [i.jsxs(qt, { children: [i.jsx($t, { asChild: true, children: i.jsx(ao, { asChild: true, children: i.jsxs("button", { type: "button", onPointerDown: (l) => l.stopPropagation(), onTouchStart: (l) => l.stopPropagation(), className: Ko, "aria-label": "\uD45C\uC2DC \uBC29\uC2DD", children: [i.jsx(n, { size: 15, "aria-hidden": true }), i.jsx(Qn, { size: 12, "aria-hidden": true, className: "opacity-70" })] }) }) }), i.jsx(Gt, { children: i.jsxs(Zt, { side: "bottom", sideOffset: 6, className: "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50", children: ["\uD45C\uC2DC \uBC29\uC2DD", i.jsx(Jt, { className: "fill-white dark:fill-odp-surface" })] }) })] }), i.jsx(io, { children: i.jsx(lo, { side: "bottom", align: "end", sideOffset: 4, className: Xo, onCloseAutoFocus: (l) => l.preventDefault(), children: c.map((l) => {
    const m = l.icon, u = e === l.value;
    return i.jsxs(co, { disabled: !!l.disabled, className: `${Uo} ${l.disabled ? "cursor-not-allowed opacity-40" : ""}`, onSelect: () => {
      l.disabled || l.value === e || o(l.value);
    }, children: [i.jsx(m, { size: 14, className: "shrink-0 opacity-80", "aria-hidden": true }), i.jsx("span", { className: "min-w-0 flex-1", children: l.label }), u ? i.jsx(eo, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300", "aria-hidden": true }) : null] }, l.value);
  }) }) })] });
}
const $o = [0.4, 0, 0.2, 1], Kt = { duration: 0.28, ease: $o }, Go = "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", Zo = "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
function Qe({ label: e, onClick: o, disabled: a, children: n }) {
  return i.jsxs(qt, { children: [i.jsx($t, { asChild: true, children: i.jsx("button", { type: "button", onPointerDown: (c) => c.stopPropagation(), onTouchStart: (c) => c.stopPropagation(), onClick: o, disabled: a, className: Go, "aria-label": e, children: n }) }), i.jsx(Gt, { children: i.jsxs(Zt, { side: "bottom", sideOffset: 6, className: Zo, children: [e, i.jsx(Jt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Lr({ editorRef: e = null, onChange: o, getMarkdown: a, llmProviderProfiles: n, open: c, onOpenChange: l, theme: m = "light" }) {
  var _a, _b, _c;
  const u = wn(), M = yn(), { requestCreateFileWithContent: b } = En(), d = u ? u.open : !!c, E = u ? u.setOpen : l, w = (u == null ? void 0 : u.presentation) ?? "floating", k = u == null ? void 0 : u.setPresentation, S = u == null ? void 0 : u.openAsSplit, C = u == null ? void 0 : u.dockToRight, O = u == null ? void 0 : u.undockToFloating, x = u ? u.canInsertIntoDocument : !!e, y = !!(M == null ? void 0 : M.workspaceTabsEnabled), [h, L] = s.useState(() => We());
  s.useEffect(() => (L(We()), Ln(() => {
    L(We());
  })), []);
  const T = s.useCallback((t) => {
    if (t === "split") {
      if (!y) return;
      S == null ? void 0 : S();
      return;
    }
    if (t === "docked") {
      C == null ? void 0 : C();
      return;
    }
    O == null ? void 0 : O();
  }, [y, S, C, O]), f = ((_a = u == null ? void 0 : u.editorBridge) == null ? void 0 : _a.editorRef) ?? e, p = (u == null ? void 0 : u.editorBridge) ?? null, R = ((_b = u == null ? void 0 : u.editorBridge) == null ? void 0 : _b.onChange) ?? o, F = ((_c = u == null ? void 0 : u.editorBridge) == null ? void 0 : _c.getMarkdown) ?? a, Z = s.useMemo(() => Array.isArray(n) ? n : [], [n]), [V, H] = s.useState(() => vo()), [A, W] = s.useState(false), [ee, ue] = s.useState(""), [at, it] = s.useState({ from: 0, to: 0 }), [q, Le] = s.useState([]), [K, de] = s.useState(""), [U, fe] = s.useState(() => Ke()), [X, me] = s.useState(() => ({ ...At })), [I, B] = s.useState(""), [Pe, lt] = s.useState("text"), [ke, ct] = s.useState(false), [Me, Y] = s.useState(""), [te, rn] = s.useState([]), [Ae, pe] = s.useState(""), [ne, he] = s.useState(""), [$, ge] = s.useState(null), [xe, Se, ut] = Yn(Z), v = Pn(Z, xe), [D, Te] = s.useState(() => v ? Lt(v.id, v.kind) : ""), j = s.useRef(null), z = s.useRef(false), oe = s.useRef(null), { panelRef: sn, panelStyle: Ce, startPositionDrag: dt, startPositionTouchDrag: ft, startCornerResize: mt, startEdgeResize: pt, refreshBounds: ht } = So(f, { enabled: d && w === "floating" }), re = s.useCallback(() => ({ selectedText: ee, selectionRange: at, attachedImages: q, instruction: K, systemPrompt: U, requestOptions: X, result: I, resultViewMode: Pe, loading: ke, error: Me, templates: te, selectedTemplateId: Ae, templateName: ne, editingTemplateId: $, profiles: Z.map((t) => ({ id: t.id, name: t.name, kind: t.kind, baseUrl: t.baseUrl })), selectedProfileId: xe, model: D, theme: m }), [ee, at, q, K, U, X, I, Pe, ke, Me, te, Ae, ne, $, Z, xe, D, m]), be = s.useCallback(() => {
    if (z.current) {
      Ye(null, re());
      return;
    }
    const t = j.current;
    !t || t.closed || Ye(t, re());
  }, [re]), se = s.useCallback(() => {
    const t = z.current ? null : j.current;
    j.current = null, z.current = false, $n(t).finally(() => {
      W(false);
    });
  }, []), _ = s.useCallback(() => {
    if (!f && !(p == null ? void 0 : p.getEditorApi) && !(p == null ? void 0 : p.getMarkdown)) return "";
    const { text: t, from: r, to: g } = Ee(f, { ...(p == null ? void 0 : p.getEditorApi) ? { getEditorApi: p.getEditorApi } : {}, ...(p == null ? void 0 : p.documentKey) ? { documentKey: p.documentKey } : {} });
    let P = t;
    return !P && (p == null ? void 0 : p.getMarkdown) && r !== g && (P = (p.getMarkdown() ?? "").slice(r, g)), ue((N) => N === P ? N : P), it((N) => N.from === r && N.to === g ? N : { from: r, to: g }), P;
  }, [f, p]), G = s.useCallback(async () => {
    const t = await kn();
    return rn(t), t;
  }, []);
  s.useEffect(() => {
    d && (w !== "floating" && (H(false), Ze(false)), (w === "split" || w === "docked") && se(), ht(), ut(), _(), G(), Y(""));
  }, [d, w, ht, _, G, ut, se]), s.useEffect(() => {
    if (!(v == null ? void 0 : v.id) || !(v == null ? void 0 : v.kind)) {
      Te("");
      return;
    }
    Te(Lt(v.id, v.kind));
  }, [v == null ? void 0 : v.id, v == null ? void 0 : v.kind]), s.useEffect(() => {
    const t = () => {
      pe(""), ge(null), G();
    };
    return window.addEventListener(Pt, t), () => {
      window.removeEventListener(Pt, t);
    };
  }, [G]), s.useEffect(() => {
    d && _();
  }, [d, p, _]), s.useEffect(() => {
    if (!(!d || A || !f) && !(w === "floating" && V)) return jo(f, ({ text: t, from: r, to: g }) => {
      ue((P) => P === t ? P : t), it((P) => P.from === r && P.to === g ? P : { from: r, to: g });
    }, (p == null ? void 0 : p.documentKey) ? { documentKey: p.documentKey } : void 0);
  }, [d, V, A, f, w, p == null ? void 0 : p.documentKey]), s.useEffect(() => {
    if (!d || A || !f && !(p == null ? void 0 : p.getEditorApi) || w === "floating" && V) return;
    const t = window.setInterval(() => {
      _();
    }, 800);
    return () => window.clearInterval(t);
  }, [d, V, A, f, p, w, _]), s.useEffect(() => {
    be();
  }, [be]), s.useEffect(() => {
    if (!A) return;
    const t = setInterval(() => {
      Ct(z.current ? null : j.current).then((r) => {
        r || (j.current = null, z.current = false, W(false));
      });
    }, 400);
    return () => clearInterval(t);
  }, [A]), s.useEffect(() => {
    if (!d) {
      se();
      return;
    }
    const t = () => {
      Zn(z.current ? null : j.current);
    };
    return window.addEventListener("beforeunload", t), () => window.removeEventListener("beforeunload", t);
  }, [d, se]);
  const Re = s.useCallback((t) => {
    const r = String(t || "").trim();
    Te(r), v && (ce(v.id, r), v.kind === Mn ? kt(r) : Mt(r));
  }, [v]), ve = s.useCallback(() => {
    const t = oe.current;
    !t || t.signal.aborted || t.abort(zn());
  }, []), Ie = s.useCallback(async () => {
    if (oe.current) return;
    const t = new AbortController();
    oe.current = t, Y(""), B(""), ct(true);
    try {
      const r = ee;
      if (!v) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
      if (v.kind === An) {
        const P = (v.baseUrl || "").trim();
        if (!P) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
        ce(v.id, D), Mt(D);
        const N = await Ue(v.id, () => v.apiKey || "", (J) => St({ baseUrl: P, apiKey: J, model: D, instruction: K, systemPrompt: U, selectedText: r, images: q, requestOptions: X, onChunk: B, signal: t.signal }), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
        B(N);
        return;
      }
      if (v.kind === Sn) {
        const P = Tn(), N = await Cn(P, { signal: t.signal }), J = (v.baseUrl || N.baseUrl || "").trim();
        if (!J) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
        const le = D.trim() || P.selectedModelId || N.models[0] || "";
        if (!le) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
        ce(v.id, le);
        const pn = await Ue(v.id, () => v.apiKey || P.apiKey || "no-key-required", (hn) => St({ baseUrl: J, apiKey: hn, model: le, instruction: K, systemPrompt: U, selectedText: r, images: q, requestOptions: X, onChunk: B, signal: t.signal }), { allowEmpty: true, missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
        B(pn);
        return;
      }
      if (v.kind === Rn) {
        const P = In(), N = await Nn(P);
        if (!N.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
        const J = D.trim() || P.selectedModelId || N.models[0] || "";
        if (!J) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
        ce(v.id, J);
        const le = await qn({ instruction: K, systemPrompt: U, selectedText: r, images: q, requestOptions: X, onChunk: B, signal: t.signal });
        B(le);
        return;
      }
      if (Fn(D)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
      ce(v.id, D), kt(D);
      const g = await Ue(v.id, () => v.apiKey || "", (P) => Vn({ apiKey: P, model: D, instruction: K, systemPrompt: U, selectedText: r, images: q, requestOptions: X, onChunk: B, signal: t.signal }), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
      B(g);
    } catch (r) {
      if (Bn(r)) {
        Y("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
        return;
      }
      Y(r instanceof Error ? r.message : "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      oe.current === t && (oe.current = null, ct(false));
    }
  }, [ee, q, v, D, K, U, X]), Ne = s.useCallback(() => {
    if (!I) return;
    if (!x || !f && !F) {
      Y("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!Ft({ editorRef: f ?? { current: null }, result: I, ...R ? { onChange: R } : {}, ...F ? { getMarkdown: F } : {}, ...(p == null ? void 0 : p.documentKey) ? { documentKey: p.documentKey } : {} })) {
      Y("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    _();
  }, [I, f, x, R, F, _, p == null ? void 0 : p.documentKey]), _e = s.useCallback(() => {
    if (!I) return;
    if (!x || !f && !F) {
      Y("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!Ft({ editorRef: f ?? { current: null }, result: I, ...R ? { onChange: R } : {}, ...F ? { getMarkdown: F } : {}, forceAppendAtEnd: true, ...(p == null ? void 0 : p.documentKey) ? { documentKey: p.documentKey } : {} })) {
      Y("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    _();
  }, [I, f, x, R, F, _, p == null ? void 0 : p.documentKey]), Oe = s.useCallback(async () => {
    if (!I) return;
    await _n(I, { message: "\uACB0\uACFC\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4" }) || Y("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  }, [I]), De = s.useCallback(() => {
    I && b(I);
  }, [I, b]), je = s.useCallback((t) => {
    pe(t);
    const r = te.find((g) => g.id === t);
    r && (de(r.instruction), fe(typeof r.systemPrompt == "string" && r.systemPrompt.trim() ? r.systemPrompt : Ke()), me(Xe(r.requestOptions)), he(r.name), ge(r.id));
  }, [te]), ze = s.useCallback(async () => {
    const t = ne.trim(), r = K.trim();
    if (!t || !r) {
      alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    try {
      const g = await On({ id: $ || Dn().id, name: t, instruction: r, systemPrompt: U.trim(), requestOptions: Xe(X), updatedAt: Date.now() });
      ge(g.id), pe(g.id), await G();
    } catch (g) {
      alert(g instanceof Error ? g.message : "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [ne, K, U, X, $, G]), ae = s.useCallback(() => {
    ge(null), pe(""), he(""), de(""), fe(Ke()), me({ ...At });
  }, []), Fe = s.useCallback(async () => {
    if ($ && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
      await jn($), ae(), await G();
    } catch (t) {
      alert(t instanceof Error ? t.message : "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [$, ae, G]), ie = s.useCallback(async (t) => {
    t.length && Le((r) => [...r, ...t]);
  }, []), Ve = s.useCallback((t) => {
    t && Le((r) => r.filter((g) => g.id !== t));
  }, []), Be = s.useCallback(() => {
    Le([]);
  }, []), gt = s.useCallback(async (t) => {
    try {
      const r = await fo(t);
      await ie(r);
    } catch (r) {
      Y(r instanceof Error ? r.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
  }, [ie]), xt = s.useCallback(async (t, r = {}) => {
    switch (t) {
      case "refresh-selection":
        _();
        break;
      case "set-selected-text":
        ue(typeof r.value == "string" ? r.value : "");
        break;
      case "run":
        await Ie();
        break;
      case "cancel-run":
        ve();
        break;
      case "apply-result":
        Ne();
        break;
      case "append-result":
        _e();
        break;
      case "copy-result":
        Oe();
        break;
      case "create-note-from-result":
        De();
        break;
      case "set-instruction":
        de(typeof r.value == "string" ? r.value : "");
        break;
      case "set-system-prompt":
        fe(typeof r.value == "string" ? r.value : "");
        break;
      case "set-request-options":
        me(Xe(r.value));
        break;
      case "set-result":
        B(typeof r.value == "string" ? r.value : "");
        break;
      case "set-model":
        typeof r.value == "string" && Re(r.value);
        break;
      case "set-llm-profile-id":
        typeof r.value == "string" && Se(r.value);
        break;
      case "load-template":
        je(String(r.id ?? ""));
        break;
      case "save-template":
        await ze();
        break;
      case "new-template":
        ae();
        break;
      case "delete-template":
        await Fe();
        break;
      case "set-template-name":
        he(typeof r.value == "string" ? r.value : "");
        break;
      case "set-result-view-mode":
        (r.value === "preview" || r.value === "text") && lt(r.value);
        break;
      case "add-images": {
        const g = (Array.isArray(r.images) ? r.images : []).map(mo).filter((P) => P !== null);
        g.length && await ie(g);
        break;
      }
      case "remove-image":
        Ve(String(r.id ?? ""));
        break;
      case "clear-images":
        Be();
        break;
      case "close":
        E == null ? void 0 : E(false);
        break;
    }
  }, [_, Ie, ve, Ne, _e, Oe, De, Re, Se, je, ze, ae, Fe, ie, Ve, Be, E]);
  s.useEffect(() => {
    if (!d) return;
    let t = () => {
    }, r = false;
    return Gn((g) => {
      if (g.type === _t.READY) {
        g.source && typeof g.source.postMessage == "function" ? (j.current = g.source, z.current = false) : Tt() && (j.current = null, z.current = true), W(true), Ye(z.current ? null : j.current, re());
        return;
      }
      g.type === _t.ACTION && g.action && xt(g.action, g.payload ?? {});
    }).then((g) => {
      if (r) {
        g();
        return;
      }
      t = g;
    }), () => {
      r = true, t();
    };
  }, [d, re, xt]);
  const an = () => {
    H(true), Ze(true);
  }, He = () => {
    H(false), Ze(false), _();
  }, bt = () => {
    ve(), se(), E == null ? void 0 : E(false);
  }, ln = () => {
    (async () => {
      if (Tt() && await Ct(null)) {
        z.current = true, j.current = null, await Nt(null), be(), W(true);
        return;
      }
      const t = j.current;
      if (t && !t.closed) {
        await Nt(t), be(), W(true);
        return;
      }
      const r = await Jn();
      if (!r) {
        alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      r === "tauri" ? (z.current = true, j.current = null) : (z.current = false, j.current = r), W(true);
    })();
  }, vt = { theme: m, profiles: Z, selectedProfileId: xe, onSelectedProfileIdChange: Se, selectedProfile: v, model: D, onModelChange: Re, selectedText: ee, onSelectedTextChange: ue, onRefreshSelection: _, attachedImages: q, onAddImages: ie, onRemoveImage: Ve, onClearImages: Be, instruction: K, onInstructionChange: de, systemPrompt: U, onSystemPromptChange: fe, requestOptions: X, onRequestOptionsChange: me, result: I, onResultChange: B, resultViewMode: Pe, onResultViewModeChange: lt, loading: ke, error: Me, templates: te, selectedTemplateId: Ae, onLoadTemplate: je, templateName: ne, onTemplateNameChange: he, editingTemplateId: $, onSaveTemplate: ze, onNewTemplate: ae, onDeleteTemplate: Fe, onRun: Ie, onCancelGeneration: ve, onApplyResult: Ne, onAppendResult: _e, onCopyResult: Oe, onCreateNoteFromResult: De, presentation: w, canInsertIntoDocument: x }, wt = i.jsx(uo, { delayDuration: 250, skipDelayDuration: 0, children: i.jsxs("div", { className: "flex shrink-0 flex-wrap items-center justify-end gap-1", children: [typeof k == "function" || typeof C == "function" || typeof O == "function" || typeof S == "function" ? i.jsx(qo, { presentation: w, onChange: T, splitEnabled: y }) : null, w === "floating" ? i.jsx(Qe, { label: A ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", onClick: ln, disabled: A, children: i.jsx(no, { size: 15 }) }) : null, w === "floating" ? i.jsx(Qe, { label: "\uC228\uAE30\uAE30", onClick: an, children: i.jsx(oo, { size: 15 }) }) : null, i.jsx(Qe, { label: "\uB2EB\uAE30", onClick: bt, children: i.jsx(ro, { size: 15 }) })] }) }), cn = !!(d && w === "docked"), un = !!(d && w === "split" && h), dn = !!(d && w === "floating" && !V && !A), fn = !!(d && w === "floating" && (V || A)), yt = A ? "AI (\uC0C8\uCC3D)" : "AI", mn = A ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC", Et = i.jsx(Rt, { className: "flex h-full min-h-0 flex-col", disabled: !d, onFilesDrop: gt, children: i.jsxs("div", { className: "flex h-full min-h-0 flex-col", role: "complementary", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [i.jsxs("div", { className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", children: [i.jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [i.jsx(qe, { size: 16, className: "shrink-0", "aria-hidden": true }), i.jsx("span", { className: "whitespace-nowrap", children: "AI \uB3C4\uC6B0\uBBF8" })] }), wt] }), i.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: i.jsx(It, { ...vt, enableImageDropZone: false }) })] }) });
  return i.jsxs(i.Fragment, { children: [cn ? i.jsx(Wo, { open: true, onClose: bt, children: Et }) : null, un && h ? gn.createPortal(Et, h) : null, i.jsx(et, { children: fn ? i.jsxs(tt.div, { role: "button", tabIndex: 0, initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.85 }, transition: Kt, onPointerDown: (t) => dt(t, A ? {} : { onTap: He }), onTouchStart: (t) => ft(t, A ? {} : { onTap: He }), onKeyDown: (t) => {
    A || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), He());
  }, className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing", style: { left: Ce.left, top: Ce.top }, title: mn, "aria-label": yt, children: [i.jsx(qe, { size: 14, "aria-hidden": true }), yt] }, "llm-assist-chip") : null }), i.jsx(et, { children: dn ? i.jsxs(tt.div, { ref: sn, initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.92 }, transition: Kt, className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center", style: Ce, role: "dialog", "aria-modal": "false", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [i.jsxs(Rt, { className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg", disabled: !d, onFilesDrop: gt, children: [i.jsxs("div", { className: "flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", onPointerDown: (t) => dt(t), onTouchStart: (t) => ft(t), children: [i.jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [i.jsx(to, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), i.jsx(qe, { size: 16, className: "shrink-0", "aria-hidden": true }), i.jsx("span", { className: "whitespace-nowrap", children: "AI \uB3C4\uC6B0\uBBF8" })] }), wt] }), i.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: i.jsx(It, { ...vt, enableImageDropZone: false }) })] }), i.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC67C\uCABD)", className: "absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!", onPointerDown: (t) => pt("w", t) }), i.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC624\uB978\uCABD)", className: "absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!", onPointerDown: (t) => pt("e", t) }), i.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!", onPointerDown: (t) => mt("sw", t) }), i.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!", onPointerDown: (t) => mt("se", t) })] }, "llm-assist-floating") : null })] });
}
export {
  Lr as default
};
