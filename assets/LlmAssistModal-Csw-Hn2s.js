import { r as s, j as a, a as xn } from "./vendor-react-BPvvDyqO.js";
import { c1 as bn, c2 as it, F as vn, T as wn, c3 as yn, c4 as Pn, c5 as En, bk as Ln, c6 as Ue, c7 as An, g as Xe, o as kn, b as Lt, c8 as Mn, c9 as At, s as de, f as Sn, ca as kt, cb as Mt, L as Tn, cc as qe, p as Cn, av as Rn, cd as In, e as Nn, ce as On, cf as _n, cg as Dn, ch as jn, ci as Fn, cj as zn } from "./index-BYVoYwQr.js";
import { L as St, d as Vn, g as Tt, i as Bn, e as Hn, f as Wn, n as Ye } from "./OpenAiCompatibleModelSelect-C6yz_Q8k.js";
import { g as Kn } from "./appStatusBar-COMHAiNk.js";
import { E as Un, S as Xn, C as qn } from "./vendor-codemirror-V7b8BJE-.js";
import { i as Yn } from "./previewMirrorEdit-Oxnil1qn.js";
import { u as $n } from "./LlamaCppModelSelect-pmkC_39k.js";
import { e as Ct } from "./bootSplash-Z2krRgC9.js";
import { g as Gn } from "./mlxVlmGenerateClient-BiE7PWLf.js";
import { f as $e, g as Zn, h as Rt, j as Jn, L as It, d as Nt, n as Qn, k as Ot, o as eo, e as _t } from "./LlmAssistPanel-C-IeganQ.js";
import { A as nt, m as ot } from "./vendor-motion-Bv-XITR_.js";
import { x as to, a0 as Xt, a1 as qt, C as Yt, j as no, S as Ge, a2 as oo, a3 as ro, a4 as so, X as io } from "./vendor-lucide-BnjwTb2j.js";
import { J as ao, w as $t, x as Gt, K as lo, y as Zt, z as Jt, A as Qt, M as co, N as uo, O as fo, v as mo } from "./vendor-radix-8kjzYRrX.js";
import { r as po, n as ho } from "./llmAssistImages-DG7rjEWr.js";
import "./vendor-aws-hJDgVEKM.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-google-genai-BsvcYwA0.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./useLazyMermaidRender-BEGREvhj.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./ImageLightboxDownloadButton-Du86xHy8.js";
import "./Kbd-Cnuyx3cZ.js";
import "./downloadImageSrc-Bi9SPN-h.js";
const at = "s3haim-llm-modal-position", en = "s3haim-llm-modal-hidden", go = 420, rt = 280, st = 240, xo = 560, tn = 44, Ze = { leftVw: 55, topVh: 12 };
function bo() {
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
  const o = window.innerWidth || 1, i = window.innerHeight || 1, n = bo(), c = Math.min(go, Math.max(rt, e.width - 16)), l = Math.min(tn + xo, Math.max(st, e.height - 16)), f = { leftPx: n.leftVw / 100 * o, topPx: n.topVh / 100 * i, widthPx: c, heightPx: l };
  return ee(f, e);
}
function ee(e, o) {
  const i = Math.max(rt, o.width), n = Math.max(st, o.height), c = Math.min(i, Math.max(rt, e.widthPx)), l = Math.min(n, Math.max(st, e.heightPx)), f = o.right - c, u = o.bottom - tn, k = Math.min(Math.max(o.left, e.leftPx), Math.max(o.left, f)), v = Math.min(Math.max(o.top, e.topPx), Math.max(o.top, u));
  return { leftPx: Math.round(k), topPx: Math.round(v), widthPx: Math.round(c), heightPx: Math.round(l) };
}
function vo(e) {
  const o = e ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 };
  try {
    const i = localStorage.getItem(at);
    if (!i) return Je(o);
    const n = JSON.parse(i);
    return Number.isFinite(Number(n == null ? void 0 : n.leftPx)) && Number.isFinite(Number(n == null ? void 0 : n.topPx)) && Number.isFinite(Number(n == null ? void 0 : n.widthPx)) && Number.isFinite(Number(n == null ? void 0 : n.heightPx)) ? ee({ leftPx: Number(n.leftPx), topPx: Number(n.topPx), widthPx: Number(n.widthPx), heightPx: Number(n.heightPx) }, o) : Je(o);
  } catch {
    return Je(o);
  }
}
function wo(e, o) {
  const i = o ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 }, n = ee(e, i);
  try {
    localStorage.setItem(at, JSON.stringify(n));
  } catch {
  }
}
function yo() {
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
const Po = "[data-app-editor-navbar]", Eo = 56;
function nn() {
  const e = document.querySelector(Po);
  return e instanceof HTMLElement ? e : null;
}
function Lo() {
  const e = nn();
  return e ? e.getBoundingClientRect().bottom : Eo;
}
function Ao(e) {
  const o = e == null ? void 0 : e.current, i = (o == null ? void 0 : o.value) ?? o ?? null;
  return i && typeof i == "object" && "root" in i && i.root instanceof Element ? i.root : null;
}
function Dt(e) {
  const i = Lo(), n = Kn(), c = Math.max(i + 1, n), l = { left: 8, top: Math.max(8, i), right: Math.max(8, window.innerWidth - 8), bottom: c, width: Math.max(0, window.innerWidth - 16), height: Math.max(0, c - Math.max(8, i)) }, f = Ao(e);
  if (!f) return l;
  const u = f.getBoundingClientRect(), k = nn(), v = k ? k.getBoundingClientRect().bottom : Math.max(u.top, i), A = u.left, d = u.right;
  return { left: A, top: v, right: d, bottom: c, width: Math.max(0, d - A), height: Math.max(0, c - v) };
}
const jt = 5, Ft = "llm-assist-modal-resize-cursor-style", ye = "llm-assist-modal-corner-resize";
function ko() {
  if (document.getElementById(Ft)) return;
  const e = document.createElement("style");
  e.id = Ft, e.textContent = `
    html.${ye},
    html.${ye} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(e);
}
function Mo(e) {
  return e === "e" || e === "w" ? "ew-resize" : e === "se" ? "nwse-resize" : "nesw-resize";
}
function So(e) {
  ko();
  const o = Mo(e);
  document.documentElement.style.setProperty("--llm-assist-resize-cursor", o), document.documentElement.classList.add(ye), document.body.style.userSelect = "none";
}
function To() {
  document.documentElement.classList.remove(ye), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
}
function Co(e, o) {
  return e.leftPx === o.leftPx && e.topPx === o.topPx && e.widthPx === o.widthPx && e.heightPx === o.heightPx;
}
function Ro(e, { enabled: o = true } = {}) {
  const i = s.useRef(Dt(e)), [n, c] = s.useState(() => vo(i.current)), l = s.useRef(null), f = s.useRef({ active: false, startX: 0, startY: 0, startLayout: n }), u = s.useRef(null), k = s.useCallback(() => {
    const w = Dt(e);
    i.current = w, c((x) => {
      const h = ee(x, w);
      return Co(x, h) ? x : h;
    });
  }, [e]);
  s.useEffect(() => {
    var _a, _b, _c;
    if (!o) return;
    k();
    let w = 0;
    const x = () => {
      w || (w = requestAnimationFrame(() => {
        w = 0, k();
      }));
    };
    window.addEventListener("resize", x);
    const h = ((_b = (_a = e == null ? void 0 : e.current) == null ? void 0 : _a.value) == null ? void 0 : _b.root) ?? ((_c = e == null ? void 0 : e.current) == null ? void 0 : _c.root) ?? null;
    let P = null;
    if (typeof ResizeObserver < "u") {
      if (P = new ResizeObserver(x), h) {
        P.observe(h);
        const b = h.querySelector(".md-editor-toolbar-wrapper") || h.querySelector(".md-editor-toolbar");
        b && P.observe(b);
      }
      const S = document.querySelector("[data-app-editor-navbar]");
      S && P.observe(S);
      const y = document.querySelector("[data-app-status-bar]");
      y && P.observe(y);
    }
    return () => {
      cancelAnimationFrame(w), window.removeEventListener("resize", x), P == null ? void 0 : P.disconnect();
    };
  }, [o, e, k]);
  const v = s.useCallback((w) => {
    const x = ee(w, i.current);
    return wo(x, i.current), x;
  }, []), A = s.useCallback((w, x) => {
    const h = f.current;
    if (!h.active) return;
    const P = w - h.startX, S = x - h.startY;
    c(ee({ ...h.startLayout, leftPx: h.startLayout.leftPx + P, topPx: h.startLayout.topPx + S }, i.current));
  }, []), d = s.useCallback((w, { onTap: x } = {}) => {
    if (w.pointerType === "touch" || w.button !== 0) return;
    w.preventDefault();
    const h = w.clientX, P = w.clientY;
    let S = false;
    f.current = { active: true, startX: h, startY: P, startLayout: n };
    const y = (m) => {
      f.current.active && (Math.hypot(m.clientX - h, m.clientY - P) > jt && (S = true), A(m.clientX, m.clientY));
    }, b = () => {
      f.current.active && (f.current.active = false, document.removeEventListener("pointermove", y), document.removeEventListener("pointerup", b), c((m) => v(m)), S || (x == null ? void 0 : x()));
    };
    document.addEventListener("pointermove", y), document.addEventListener("pointerup", b);
  }, [A, n, v]), N = s.useCallback((w, { onTap: x } = {}) => {
    const h = w.changedTouches;
    if (!(h == null ? void 0 : h.length)) return;
    const P = h[0];
    if (!P) return;
    const S = P.identifier, y = P.clientX, b = P.clientY;
    w.preventDefault();
    let m = false;
    f.current = { active: true, startX: y, startY: b, startLayout: n, touchIdentifier: S };
    const G = (V) => {
      if (!f.current.active) return;
      const K = Array.from(V.touches).find((R) => R.identifier === S);
      K && (Math.hypot(K.clientX - y, K.clientY - b) > jt && (m = true), A(K.clientX, K.clientY), V.preventDefault());
    }, H = () => {
      f.current.active && (f.current.active = false, document.removeEventListener("touchmove", G), document.removeEventListener("touchend", W), document.removeEventListener("touchcancel", W), c((V) => v(V)), m || (x == null ? void 0 : x()));
    }, W = (V) => {
      !f.current.active || !Array.from(V.changedTouches).some((R) => R.identifier === S) || H();
    };
    document.addEventListener("touchmove", G, { passive: false }), document.addEventListener("touchend", W, { passive: false }), document.addEventListener("touchcancel", W, { passive: false });
  }, [A, n, v]), p = s.useCallback((w, x) => {
    const h = u.current;
    if (!h) return;
    const P = w - h.startX, S = x - h.startY, y = h.startLayout;
    let b;
    h.corner === "se" ? b = { leftPx: y.leftPx, topPx: y.topPx, widthPx: y.widthPx + P, heightPx: y.heightPx + S } : h.corner === "sw" ? b = { leftPx: y.leftPx + P, topPx: y.topPx, widthPx: y.widthPx - P, heightPx: y.heightPx + S } : h.corner === "e" ? b = { leftPx: y.leftPx, topPx: y.topPx, widthPx: y.widthPx + P, heightPx: y.heightPx } : b = { leftPx: y.leftPx + P, topPx: y.topPx, widthPx: y.widthPx - P, heightPx: y.heightPx }, c(ee(b, i.current));
  }, []), T = s.useCallback((w, x) => {
    if (x.button !== 0) return;
    x.preventDefault(), x.stopPropagation(), u.current = { corner: w, startX: x.clientX, startY: x.clientY, startLayout: n }, So(w);
    const h = x.currentTarget;
    h instanceof HTMLElement && typeof h.setPointerCapture == "function" && h.setPointerCapture(x.pointerId);
    const P = () => {
      u.current = null, To(), document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y);
    }, S = (b) => {
      b.preventDefault(), p(b.clientX, b.clientY);
    }, y = () => {
      u.current && (P(), c((b) => v(b)));
    };
    document.addEventListener("pointermove", S, { passive: false }), document.addEventListener("pointerup", y), document.addEventListener("pointercancel", y);
  }, [p, n, v]), C = s.useCallback((w, x) => T(w, x), [T]), O = { left: n.leftPx, top: n.topPx, width: n.widthPx, height: n.heightPx };
  return { layout: n, panelRef: l, panelStyle: O, startPositionDrag: d, startPositionTouchDrag: N, startCornerResize: C, startEdgeResize: T, refreshBounds: k };
}
function zt(e) {
  if (!e || typeof e != "object") return false;
  const o = e;
  return typeof o.getEditorView == "function" || typeof o.getSelectedText == "function";
}
function on(e) {
  const o = e == null ? void 0 : e.current;
  if (!o || typeof o != "object") return null;
  if (zt(o)) return o;
  const i = o.value;
  return zt(i) ? i : null;
}
function rn(e) {
  return on(e);
}
const Io = [50, 200, 500, 1e3];
function No(e, o = null) {
  if (o == null ? void 0 : o.dom) return o.dom.closest(".md-editor");
  const i = rn(e);
  return typeof Element < "u" && (i == null ? void 0 : i.root) instanceof Element ? i.root : null;
}
function Oo(e, { view: o = null, documentKey: i = null } = {}) {
  var _a;
  const n = o ?? Ee(e, { documentKey: i }).view, c = No(e, n);
  return Yn(c) ? true : ((_a = it(n, i)) == null ? void 0 : _a.everFocused) ? false : (n == null ? void 0 : n.state, true);
}
function _o(e, o) {
  return e ? e.endsWith(`
`) ? o : `
${o}` : o;
}
function Do(e, o) {
  if (!e) return o;
  const i = e.endsWith(`
`) ? "" : `
`;
  return `${e}${i}${o}`;
}
function Pe(e, o, i) {
  const n = Math.max(0, Math.min(o, e)), c = Math.max(n, Math.min(i, e));
  return { from: n, to: c };
}
function jo(e, o, i, n, c) {
  if (typeof c != "function") return false;
  const l = Pe(e.length, o, i), f = `${e.slice(0, l.from)}${n}${e.slice(l.to)}`;
  return c(f), true;
}
function Vt({ editorRef: e, result: o, onChange: i, getMarkdown: n, forceAppendAtEnd: c = false, documentKey: l = null }) {
  var _a, _b, _c;
  const f = Ee(e, { documentKey: l }), { view: u } = f;
  if (c || Oo(e, { view: u, documentKey: l })) {
    const T = ((_c = (_b = (_a = u == null ? void 0 : u.state) == null ? void 0 : _a.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? (typeof n == "function" ? n() : ""), C = _o(T, o);
    if (u == null ? void 0 : u.state) {
      const O = T.length;
      return Bt(u, O, O, C, i);
    }
    return typeof i == "function" ? (i(Do(T, o)), true) : false;
  }
  const v = it(u, l);
  let A = f.from, d = f.to;
  if ((!(u == null ? void 0 : u.hasFocus) && (v == null ? void 0 : v.everFocused) || A === d && (v == null ? void 0 : v.everFocused)) && (A = v.from, d = v.to), !(v == null ? void 0 : v.everFocused) && A === d && !f.text.trim()) return false;
  if (u == null ? void 0 : u.state) {
    const T = u.state.doc.length, C = Pe(T, A, d);
    return Bt(u, C.from, C.to, o, i);
  }
  const p = typeof n == "function" ? n() : "";
  return jo(p, A, d, o, i);
}
function Fo(e, o, i) {
  var _a, _b;
  const n = e.state.selection.main, c = !!e.hasFocus, l = it(e, i);
  if (c) {
    const k = e.state.doc.sliceString(n.from, n.to);
    if (k) return { text: k, from: n.from, to: n.to, view: e };
    if (l == null ? void 0 : l.everFocused) {
      const A = e.state.doc.length, { from: d, to: N } = Pe(A, l.from, l.to);
      return { text: e.state.doc.sliceString(d, N), from: d, to: N, view: e };
    }
    const v = ((_a = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _a.call(o)) ?? "";
    return v ? { text: v, from: n.from, to: n.to, view: e } : { text: "", from: n.from, to: n.to, view: e };
  }
  if (l == null ? void 0 : l.everFocused) {
    const k = e.state.doc.length, { from: v, to: A } = Pe(k, l.from, l.to);
    return { text: e.state.doc.sliceString(v, A), from: v, to: A, view: e };
  }
  const f = e.state.doc.sliceString(n.from, n.to);
  if (f) return { text: f, from: n.from, to: n.to, view: e };
  const u = ((_b = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _b.call(o)) ?? "";
  return u ? { text: u, from: n.from, to: n.to, view: e } : { text: f, from: n.from, to: n.to, view: e };
}
function Ee(e, o) {
  var _a, _b, _c;
  const i = (o == null ? void 0 : o.documentKey) ?? null, n = ((_a = o == null ? void 0 : o.getEditorApi) == null ? void 0 : _a.call(o)) ?? on(e), c = ((_b = n == null ? void 0 : n.getEditorView) == null ? void 0 : _b.call(n)) ?? null;
  if (c == null ? void 0 : c.state) return Fo(c, n, i);
  const l = bn(i);
  return (l == null ? void 0 : l.everFocused) ? { text: "", from: l.from, to: l.to, view: null } : { text: ((_c = n == null ? void 0 : n.getSelectedText) == null ? void 0 : _c.call(n)) ?? "", from: 0, to: 0, view: null };
}
function zo(e) {
  var _a, _b;
  return ((_b = (_a = rn(e)) == null ? void 0 : _a.getEditorView) == null ? void 0 : _b.call(_a)) ?? null;
}
function Vo(e, o, i) {
  let n = false, c = null, l = null;
  const f = [], u = (i == null ? void 0 : i.documentKey) ?? null, k = () => {
    n || o(Ee(e, { documentKey: u }));
  }, v = () => {
    l == null ? void 0 : l(), l = null, c = null;
  };
  let A = null, d = false;
  const N = () => {
    if (n) return true;
    const p = zo(e);
    if (!p || p === c) return !!p;
    v(), c = p, d = false, A || (A = new qn());
    const T = A, C = Un.updateListener.of((O) => {
      O.selectionSet && k();
    });
    if (d) try {
      p.dispatch({ effects: T.reconfigure(C) });
    } catch {
      d = false;
    }
    if (!d) try {
      p.dispatch({ effects: Xn.appendConfig.of(T.of(C)) }), d = true;
    } catch {
      return k(), true;
    }
    return l = () => {
      if (d) {
        try {
          p.dispatch({ effects: T.reconfigure([]) });
        } catch {
        }
        d = false;
      }
    }, k(), true;
  };
  if (!N()) for (const p of Io) f.push(setTimeout(() => {
    n || N();
  }, p));
  return () => {
    n = true;
    for (const p of f) clearTimeout(p);
    v();
  };
}
function Bt(e, o, i, n, c) {
  var _a;
  return (e == null ? void 0 : e.state) ? (e.dispatch({ changes: { from: o, to: i, insert: n }, selection: { anchor: o + n.length } }), (_a = e.focus) == null ? void 0 : _a.call(e), c == null ? void 0 : c(e.state.doc.toString()), true) : false;
}
const Bo = 520, Ho = 12, Ht = 80, Wt = 300, Wo = 180, Ko = wn, Uo = [0.4, 0, 0.2, 1];
function et(e) {
  return typeof window > "u" ? e * 5 : window.innerWidth * e / 100;
}
function Kt(e) {
  var _a;
  return e ? e.closest("[data-llm-assist-layout-root]") || ((_a = e.parentElement) == null ? void 0 : _a.parentElement) || e.parentElement : null;
}
function Xo({ open: e, onClose: o, children: i, className: n = "" }) {
  const c = s.useRef(null), [l, f] = s.useState(() => Math.max(Wt, Math.floor(et(Ht)))), u = Math.max(1, Math.floor(et(Ho)));
  s.useEffect(() => {
    if (!e) return;
    const p = () => {
      var _a;
      const h = (((_a = Kt(c.current)) == null ? void 0 : _a.clientWidth) ?? window.innerWidth) - Wo, P = Math.max(Wt, Math.floor(et(Ht)));
      f(Math.max(u, Math.min(P, h)));
    };
    p();
    const T = requestAnimationFrame(p);
    window.addEventListener("resize", p);
    let C = null;
    const O = Kt(c.current);
    return O && typeof ResizeObserver < "u" && (C = new ResizeObserver(p), C.observe(O)), () => {
      cancelAnimationFrame(T), window.removeEventListener("resize", p), C == null ? void 0 : C.disconnect();
    };
  }, [u, e]);
  const k = Math.max(1, Math.floor(u / 3)), { width: v, isResizing: A, handleProps: d } = vn({ storageKey: "s3haim_llm_assist_dock_width", defaultWidth: Bo, minWidth: u, maxWidth: Math.max(l, u), edge: "right", collapseBelowWidth: k, onCollapseBelowMin: typeof o == "function" ? o : void 0 }), N = Math.min(v, l);
  return a.jsx(nt, { initial: false, children: e ? a.jsx(ot.div, { className: "relative h-full min-h-0 shrink-0 overflow-hidden", initial: { width: 0 }, animate: { width: N }, exit: { width: 0 }, transition: A ? { duration: 0 } : { duration: 0.28, ease: Uo }, children: a.jsxs("div", { ref: c, className: `relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${n}`, style: { width: N }, children: [a.jsx(Ko, { handleProps: { ...d, "aria-valuenow": Math.round(N), "aria-valuemax": Math.round(l) }, isResizing: A, edge: "left", visibleOnHover: true, label: "AI \uB3C4\uC6B0\uBBF8 \uB108\uBE44 \uC870\uC808" }), a.jsx("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col", children: i })] }) }, "llm-assist-dock") : null });
}
const qo = "inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", Yo = "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50", $o = "z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
function Go(e) {
  return e === "docked" ? qt : e === "split" ? Yt : Xt;
}
function Zo({ presentation: e, onChange: o, splitEnabled: i = true }) {
  const n = Go(e), c = [{ value: "floating", label: "\uD50C\uB85C\uD305 \uCC3D", icon: Xt }, { value: "docked", label: "\uC6B0\uCE21\uC5D0 \uACE0\uC815", icon: qt }, { value: "split", label: "\uC2A4\uD50C\uB9BF \uCC3D", icon: Yt, disabled: !i }];
  return a.jsxs(ao, { children: [a.jsxs($t, { children: [a.jsx(Gt, { asChild: true, children: a.jsx(lo, { asChild: true, children: a.jsxs("button", { type: "button", onPointerDown: (l) => l.stopPropagation(), onTouchStart: (l) => l.stopPropagation(), className: qo, "aria-label": "\uD45C\uC2DC \uBC29\uC2DD", children: [a.jsx(n, { size: 15, "aria-hidden": true }), a.jsx(to, { size: 12, "aria-hidden": true, className: "opacity-70" })] }) }) }), a.jsx(Zt, { children: a.jsxs(Jt, { side: "bottom", sideOffset: 6, className: "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50", children: ["\uD45C\uC2DC \uBC29\uC2DD", a.jsx(Qt, { className: "fill-white dark:fill-odp-surface" })] }) })] }), a.jsx(co, { children: a.jsx(uo, { side: "bottom", align: "end", sideOffset: 4, className: $o, onCloseAutoFocus: (l) => l.preventDefault(), children: c.map((l) => {
    const f = l.icon, u = e === l.value;
    return a.jsxs(fo, { disabled: !!l.disabled, className: `${Yo} ${l.disabled ? "cursor-not-allowed opacity-40" : ""}`, onSelect: () => {
      l.disabled || l.value === e || o(l.value);
    }, children: [a.jsx(f, { size: 14, className: "shrink-0 opacity-80", "aria-hidden": true }), a.jsx("span", { className: "min-w-0 flex-1", children: l.label }), u ? a.jsx(no, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300", "aria-hidden": true }) : null] }, l.value);
  }) }) })] });
}
const Jo = [0.4, 0, 0.2, 1], Ut = { duration: 0.28, ease: Jo }, Qo = "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", er = "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
function tt({ label: e, onClick: o, disabled: i, children: n }) {
  return a.jsxs($t, { children: [a.jsx(Gt, { asChild: true, children: a.jsx("button", { type: "button", onPointerDown: (c) => c.stopPropagation(), onTouchStart: (c) => c.stopPropagation(), onClick: o, disabled: i, className: Qo, "aria-label": e, children: n }) }), a.jsx(Zt, { children: a.jsxs(Jt, { side: "bottom", sideOffset: 6, className: er, children: [e, a.jsx(Qt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Tr({ editorRef: e = null, onChange: o, getMarkdown: i, llmProviderProfiles: n, open: c, onOpenChange: l, theme: f = "light" }) {
  var _a, _b, _c;
  const u = yn(), k = Pn(), v = En(), { requestCreateFileWithContent: A } = Ln(), d = k ? k.open : !!c, N = k ? k.setOpen : l, p = (u == null ? void 0 : u.presentation) ?? "floating", T = u == null ? void 0 : u.setPresentation, C = u == null ? void 0 : u.openAsSplit, O = u == null ? void 0 : u.dockToRight, w = u == null ? void 0 : u.undockToFloating, x = u ? u.canInsertIntoDocument : !!e, h = !!(v == null ? void 0 : v.workspaceTabsEnabled), [P, S] = s.useState(() => Ue());
  s.useEffect(() => (S(Ue()), An(() => {
    S(Ue());
  })), []);
  const y = s.useCallback((t) => {
    if (t === "split") {
      if (!h) return;
      C == null ? void 0 : C();
      return;
    }
    if (t === "docked") {
      O == null ? void 0 : O();
      return;
    }
    w == null ? void 0 : w();
  }, [h, C, O, w]), b = ((_a = u == null ? void 0 : u.editorBridge) == null ? void 0 : _a.editorRef) ?? e, m = (u == null ? void 0 : u.editorBridge) ?? null, G = ((_b = u == null ? void 0 : u.editorBridge) == null ? void 0 : _b.onChange) ?? o, H = ((_c = u == null ? void 0 : u.editorBridge) == null ? void 0 : _c.getMarkdown) ?? i, W = s.useMemo(() => Array.isArray(n) ? n : [], [n]), [V, K] = s.useState(() => yo()), [R, te] = s.useState(false), [ne, oe] = s.useState(""), [lt, Le] = s.useState({ from: 0, to: 0 }), [Z, Ae] = s.useState([]), [U, fe] = s.useState(""), [X, me] = s.useState(() => Xe()), [q, pe] = s.useState(() => ({ ...St })), [I, B] = s.useState(""), [ke, ct] = s.useState("text"), [Me, ut] = s.useState(false), [Se, Y] = s.useState(""), [re, sn] = s.useState([]), [Te, he] = s.useState(""), [se, ge] = s.useState(""), [J, xe] = s.useState(null), [be, Ce, dt] = $n(W), E = kn(W, be), [_, Re] = s.useState(() => E ? Lt(E.id, E.kind) : ""), D = s.useRef(null), j = s.useRef(false), ie = s.useRef(null), { panelRef: an, panelStyle: Ie, startPositionDrag: ft, startPositionTouchDrag: mt, startCornerResize: pt, startEdgeResize: ht, refreshBounds: gt } = Ro(b, { enabled: d && p === "floating" }), ae = s.useCallback(() => ({ selectedText: ne, selectionRange: lt, attachedImages: Z, instruction: U, systemPrompt: X, requestOptions: q, result: I, resultViewMode: ke, loading: Me, error: Se, templates: re, selectedTemplateId: Te, templateName: se, editingTemplateId: J, profiles: W.map((t) => ({ id: t.id, name: t.name, kind: t.kind, baseUrl: t.baseUrl })), selectedProfileId: be, model: _, theme: f }), [ne, lt, Z, U, X, q, I, ke, Me, Se, re, Te, se, J, W, be, _, f]), ve = s.useCallback(() => {
    if (j.current) {
      $e(null, ae());
      return;
    }
    const t = D.current;
    !t || t.closed || $e(t, ae());
  }, [ae]), le = s.useCallback(() => {
    const t = j.current ? null : D.current;
    D.current = null, j.current = false, Zn(t).finally(() => {
      te(false);
    });
  }, []), F = s.useCallback(() => {
    if (!b && !(m == null ? void 0 : m.getEditorApi) && !(m == null ? void 0 : m.getSelection) && !(m == null ? void 0 : m.getMarkdown)) return "";
    if (typeof (m == null ? void 0 : m.getSelection) == "function") {
      const { text: L, from: M, to: $ } = m.getSelection();
      return oe((z) => z === L ? z : L), Le((z) => z.from === M && z.to === $ ? z : { from: M, to: $ }), L;
    }
    const { text: t, from: r, to: g } = Ee(b, { ...(m == null ? void 0 : m.getEditorApi) ? { getEditorApi: m.getEditorApi } : {}, ...(m == null ? void 0 : m.documentKey) ? { documentKey: m.documentKey } : {} });
    return oe((L) => L === t ? L : t), Le((L) => L.from === r && L.to === g ? L : { from: r, to: g }), t;
  }, [b, m]), Q = s.useCallback(async () => {
    const t = await Mn();
    return sn(t), t;
  }, []);
  s.useEffect(() => {
    if (!d) return;
    p !== "floating" && (K(false), Qe(false)), (p === "split" || p === "docked") && le(), Y(""), dt();
    let t = 0, r = 0, g = 0;
    t = requestAnimationFrame(() => {
      F();
    });
    const L = () => {
      gt(), Q();
    }, M = window;
    return typeof M.requestIdleCallback == "function" ? r = M.requestIdleCallback(L) : g = window.setTimeout(L, 1), () => {
      cancelAnimationFrame(t), r && typeof M.cancelIdleCallback == "function" && M.cancelIdleCallback(r), g && window.clearTimeout(g);
    };
  }, [d, p, gt, F, Q, dt, le]), s.useEffect(() => {
    if (!(E == null ? void 0 : E.id) || !(E == null ? void 0 : E.kind)) {
      Re("");
      return;
    }
    Re(Lt(E.id, E.kind));
  }, [E == null ? void 0 : E.id, E == null ? void 0 : E.kind]), s.useEffect(() => {
    const t = () => {
      he(""), xe(null), Q();
    };
    return window.addEventListener(At, t), () => {
      window.removeEventListener(At, t);
    };
  }, [Q]), s.useEffect(() => {
    d && F();
  }, [d, m, F]), s.useEffect(() => {
    if (!d || R || p === "floating" && V) return;
    const t = ({ text: r, from: g, to: L }) => {
      oe((M) => M === r ? M : r), Le((M) => M.from === g && M.to === L ? M : { from: g, to: L });
    };
    if (typeof (m == null ? void 0 : m.subscribeSelection) == "function") return m.subscribeSelection(t);
    if (b) return Vo(b, t, (m == null ? void 0 : m.documentKey) ? { documentKey: m.documentKey } : void 0);
  }, [d, V, R, b, p, m, m == null ? void 0 : m.documentKey, m == null ? void 0 : m.subscribeSelection]), s.useEffect(() => {
    ve();
  }, [ve]), s.useEffect(() => {
    if (!R) return;
    const t = setInterval(() => {
      Rt(j.current ? null : D.current).then((r) => {
        r || (D.current = null, j.current = false, te(false));
      });
    }, 400);
    return () => clearInterval(t);
  }, [R]), s.useEffect(() => {
    if (!d) {
      le();
      return;
    }
    const t = () => {
      Qn(j.current ? null : D.current);
    };
    return window.addEventListener("beforeunload", t), () => window.removeEventListener("beforeunload", t);
  }, [d, le]);
  const Ne = s.useCallback((t) => {
    const r = String(t || "").trim();
    Re(r), E && (de(E.id, r), E.kind === Sn ? kt(r) : Mt(r));
  }, [E]), we = s.useCallback(() => {
    const t = ie.current;
    !t || t.signal.aborted || t.abort(Vn());
  }, []), Oe = s.useCallback(async () => {
    if (ie.current) return;
    const t = new AbortController();
    ie.current = t, Y(""), B(""), ut(true);
    try {
      const r = ne;
      if (!E) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
      if (E.kind === Tn) {
        const L = (E.baseUrl || "").trim();
        if (!L) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
        de(E.id, _), Mt(_);
        const M = await qe(E.id, () => E.apiKey || "", ($) => Tt({ baseUrl: L, apiKey: $, model: _, instruction: U, systemPrompt: X, selectedText: r, images: Z, requestOptions: q, onChunk: B, signal: t.signal }), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
        B(M);
        return;
      }
      if (E.kind === Cn) {
        const L = Rn(), M = await In(L, { signal: t.signal }), $ = (E.baseUrl || M.baseUrl || "").trim();
        if (!$) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
        const z = _.trim() || L.selectedModelId || M.models[0] || "";
        if (!z) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
        de(E.id, z);
        const hn = await qe(E.id, () => E.apiKey || L.apiKey || "no-key-required", (gn) => Tt({ baseUrl: $, apiKey: gn, model: z, instruction: U, systemPrompt: X, selectedText: r, images: Z, requestOptions: q, onChunk: B, signal: t.signal }), { allowEmpty: true, missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
        B(hn);
        return;
      }
      if (E.kind === Nn) {
        const L = On(), M = await _n(L);
        if (!M.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
        const $ = _.trim() || L.selectedModelId || M.models[0] || "";
        if (!$) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
        de(E.id, $);
        const z = await Gn({ instruction: U, systemPrompt: X, selectedText: r, images: Z, requestOptions: q, onChunk: B, signal: t.signal });
        B(z);
        return;
      }
      if (Bn(_)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
      de(E.id, _), kt(_);
      const g = await qe(E.id, () => E.apiKey || "", (L) => Hn({ apiKey: L, model: _, instruction: U, systemPrompt: X, selectedText: r, images: Z, requestOptions: q, onChunk: B, signal: t.signal }), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
      B(g);
    } catch (r) {
      if (Wn(r)) {
        Y("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
        return;
      }
      Y(r instanceof Error ? r.message : "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      ie.current === t && (ie.current = null, ut(false));
    }
  }, [ne, Z, E, _, U, X, q]), _e = s.useCallback(() => {
    if (!I) return;
    if (!x || !b && !H && !(m == null ? void 0 : m.applyResult)) {
      Y("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!(typeof (m == null ? void 0 : m.applyResult) == "function" ? m.applyResult(I) : Vt({ editorRef: b ?? { current: null }, result: I, ...G ? { onChange: G } : {}, ...H ? { getMarkdown: H } : {}, ...(m == null ? void 0 : m.documentKey) ? { documentKey: m.documentKey } : {} }))) {
      Y("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    F();
  }, [I, b, x, G, H, F, m]), De = s.useCallback(() => {
    if (!I) return;
    if (!x || !b && !H && !(m == null ? void 0 : m.applyResult)) {
      Y("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      return;
    }
    if (!(typeof (m == null ? void 0 : m.applyResult) == "function" ? m.applyResult(I, { forceAppendAtEnd: true }) : Vt({ editorRef: b ?? { current: null }, result: I, ...G ? { onChange: G } : {}, ...H ? { getMarkdown: H } : {}, forceAppendAtEnd: true, ...(m == null ? void 0 : m.documentKey) ? { documentKey: m.documentKey } : {} }))) {
      Y("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    F();
  }, [I, b, x, G, H, F, m]), je = s.useCallback(async () => {
    if (!I) return;
    await Dn(I, { message: "\uACB0\uACFC\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4" }) || Y("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  }, [I]), Fe = s.useCallback(() => {
    I && A(I);
  }, [I, A]), ze = s.useCallback((t) => {
    he(t);
    const r = re.find((g) => g.id === t);
    r && (fe(r.instruction), me(typeof r.systemPrompt == "string" && r.systemPrompt.trim() ? r.systemPrompt : Xe()), pe(Ye(r.requestOptions)), ge(r.name), xe(r.id));
  }, [re]), Ve = s.useCallback(async () => {
    const t = se.trim(), r = U.trim();
    if (!t || !r) {
      alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    try {
      const g = await jn({ id: J || Fn().id, name: t, instruction: r, systemPrompt: X.trim(), requestOptions: Ye(q), updatedAt: Date.now() });
      xe(g.id), he(g.id), await Q();
    } catch (g) {
      alert(g instanceof Error ? g.message : "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [se, U, X, q, J, Q]), ce = s.useCallback(() => {
    xe(null), he(""), ge(""), fe(""), me(Xe()), pe({ ...St });
  }, []), Be = s.useCallback(async () => {
    if (J && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
      await zn(J), ce(), await Q();
    } catch (t) {
      alert(t instanceof Error ? t.message : "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [J, ce, Q]), ue = s.useCallback(async (t) => {
    t.length && Ae((r) => [...r, ...t]);
  }, []), He = s.useCallback((t) => {
    t && Ae((r) => r.filter((g) => g.id !== t));
  }, []), We = s.useCallback(() => {
    Ae([]);
  }, []), xt = s.useCallback(async (t) => {
    try {
      const r = await po(t);
      await ue(r);
    } catch (r) {
      Y(r instanceof Error ? r.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
  }, [ue]), bt = s.useCallback(async (t, r = {}) => {
    switch (t) {
      case "refresh-selection":
        F();
        break;
      case "set-selected-text":
        oe(typeof r.value == "string" ? r.value : "");
        break;
      case "run":
        await Oe();
        break;
      case "cancel-run":
        we();
        break;
      case "apply-result":
        _e();
        break;
      case "append-result":
        De();
        break;
      case "copy-result":
        je();
        break;
      case "create-note-from-result":
        Fe();
        break;
      case "set-instruction":
        fe(typeof r.value == "string" ? r.value : "");
        break;
      case "set-system-prompt":
        me(typeof r.value == "string" ? r.value : "");
        break;
      case "set-request-options":
        pe(Ye(r.value));
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
        ze(String(r.id ?? ""));
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
        const g = (Array.isArray(r.images) ? r.images : []).map(ho).filter((L) => L !== null);
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
        N == null ? void 0 : N(false);
        break;
    }
  }, [F, Oe, we, _e, De, je, Fe, Ne, Ce, ze, Ve, ce, Be, ue, He, We, N]);
  s.useEffect(() => {
    if (!d) return;
    let t = () => {
    }, r = false;
    return Jn((g) => {
      if (g.type === _t.READY) {
        g.source && typeof g.source.postMessage == "function" ? (D.current = g.source, j.current = false) : Ct() && (D.current = null, j.current = true), te(true), $e(j.current ? null : D.current, ae());
        return;
      }
      g.type === _t.ACTION && g.action && bt(g.action, g.payload ?? {});
    }).then((g) => {
      if (r) {
        g();
        return;
      }
      t = g;
    }), () => {
      r = true, t();
    };
  }, [d, ae, bt]);
  const ln = () => {
    K(true), Qe(true);
  }, Ke = () => {
    K(false), Qe(false), F();
  }, vt = () => {
    we(), le(), N == null ? void 0 : N(false);
  }, cn = () => {
    (async () => {
      if (Ct() && await Rt(null)) {
        j.current = true, D.current = null, await Ot(null), ve(), te(true);
        return;
      }
      const t = D.current;
      if (t && !t.closed) {
        await Ot(t), ve(), te(true);
        return;
      }
      const r = await eo();
      if (!r) {
        alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      r === "tauri" ? (j.current = true, D.current = null) : (j.current = false, D.current = r), te(true);
    })();
  }, wt = { theme: f, profiles: W, selectedProfileId: be, onSelectedProfileIdChange: Ce, selectedProfile: E, model: _, onModelChange: Ne, selectedText: ne, onSelectedTextChange: oe, onRefreshSelection: F, attachedImages: Z, onAddImages: ue, onRemoveImage: He, onClearImages: We, instruction: U, onInstructionChange: fe, systemPrompt: X, onSystemPromptChange: me, requestOptions: q, onRequestOptionsChange: pe, result: I, onResultChange: B, resultViewMode: ke, onResultViewModeChange: ct, loading: Me, error: Se, templates: re, selectedTemplateId: Te, onLoadTemplate: ze, templateName: se, onTemplateNameChange: ge, editingTemplateId: J, onSaveTemplate: Ve, onNewTemplate: ce, onDeleteTemplate: Be, onRun: Oe, onCancelGeneration: we, onApplyResult: _e, onAppendResult: De, onCopyResult: je, onCreateNoteFromResult: Fe, presentation: p, canInsertIntoDocument: x }, yt = a.jsx(mo, { delayDuration: 250, skipDelayDuration: 0, children: a.jsxs("div", { className: "flex shrink-0 flex-wrap items-center justify-end gap-1", children: [typeof T == "function" || typeof O == "function" || typeof w == "function" || typeof C == "function" ? a.jsx(Zo, { presentation: p, onChange: y, splitEnabled: h }) : null, p === "floating" ? a.jsx(tt, { label: R ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", onClick: cn, disabled: R, children: a.jsx(ro, { size: 15 }) }) : null, p === "floating" ? a.jsx(tt, { label: "\uC228\uAE30\uAE30", onClick: ln, children: a.jsx(so, { size: 15 }) }) : null, a.jsx(tt, { label: "\uB2EB\uAE30", onClick: vt, children: a.jsx(io, { size: 15 }) })] }) }), un = !!(d && p === "docked"), dn = !!(d && p === "split" && P), fn = !!(d && p === "floating" && !V && !R), mn = !!(d && p === "floating" && (V || R)), Pt = R ? "AI (\uC0C8\uCC3D)" : "AI", pn = R ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC", Et = a.jsx(It, { className: "flex h-full min-h-0 flex-col", disabled: !d, onFilesDrop: xt, children: a.jsxs("div", { className: "flex h-full min-h-0 flex-col", role: "complementary", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [a.jsxs("div", { className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", children: [a.jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [a.jsx(Ge, { size: 16, className: "shrink-0", "aria-hidden": true }), a.jsx("span", { className: "whitespace-nowrap", children: "AI \uB3C4\uC6B0\uBBF8" })] }), yt] }), a.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: a.jsx(Nt, { ...wt, enableImageDropZone: false }) })] }) });
  return a.jsxs(a.Fragment, { children: [un ? a.jsx(Xo, { open: true, onClose: vt, children: Et }) : null, dn && P ? xn.createPortal(Et, P) : null, a.jsx(nt, { children: mn ? a.jsxs(ot.div, { role: "button", tabIndex: 0, initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.85 }, transition: Ut, onPointerDown: (t) => ft(t, R ? {} : { onTap: Ke }), onTouchStart: (t) => mt(t, R ? {} : { onTap: Ke }), onKeyDown: (t) => {
    R || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), Ke());
  }, className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing", style: { left: Ie.left, top: Ie.top }, title: pn, "aria-label": Pt, children: [a.jsx(Ge, { size: 14, "aria-hidden": true }), Pt] }, "llm-assist-chip") : null }), a.jsx(nt, { children: fn ? a.jsxs(ot.div, { ref: an, initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.92 }, transition: Ut, className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center", style: Ie, role: "dialog", "aria-modal": "false", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [a.jsxs(It, { className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg", disabled: !d, onFilesDrop: xt, children: [a.jsxs("div", { className: "flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", onPointerDown: (t) => ft(t), onTouchStart: (t) => mt(t), children: [a.jsxs("div", { className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [a.jsx(oo, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), a.jsx(Ge, { size: 16, className: "shrink-0", "aria-hidden": true }), a.jsx("span", { className: "whitespace-nowrap", children: "AI \uB3C4\uC6B0\uBBF8" })] }), yt] }), a.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: a.jsx(Nt, { ...wt, enableImageDropZone: false }) })] }), a.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC67C\uCABD)", className: "absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!", onPointerDown: (t) => ht("w", t) }), a.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC624\uB978\uCABD)", className: "absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!", onPointerDown: (t) => ht("e", t) }), a.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!", onPointerDown: (t) => pt("sw", t) }), a.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!", onPointerDown: (t) => pt("se", t) })] }, "llm-assist-floating") : null })] });
}
export {
  Tr as default
};
