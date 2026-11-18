const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/exaoneTabularClient-BHqu9H8i.js","assets/index-Cc1jKdr9.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-lucide-BMfkLP2z.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-radix-C_q1g830.js","assets/index-Bczfd79Y.css"])))=>i.map(i=>d[i]);
import { _ as co } from "./vendor-aws-hJDgVEKM.js";
import { r as s, j as i, a as uo, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { cy as fo, cz as Ft, N as mo, T as ho, L as Be, h as fe, U as Pn, x as An, s as Z, br as ze, bb as ie, y as kn, aG as Sn, cA as Cn, i as Tn, bh as In, bj as Rn, t as po, k as Nn, bd as Nt, cB as go, cC as xo, cD as bo, bR as wo, cE as vt, cF as vo, g as yt, w as yo, e as tn, V as Et, cG as Lt, cH as Eo, cI as nn, cJ as Lo, cK as Mo, cL as Po, cM as Ao, cN as ko, __tla as __tla_1 } from "./index-Cc1jKdr9.js";
import { i as _n, s as So, g as Co, __tla as __tla_2 } from "./geminiClient-DXF3HNWj.js";
import { d as on, a as To, L as rn, e as Mt, i as sn, g as an, n as Pt } from "./openaiCompatibleClient-DDjC_ayR.js";
import { g as Io } from "./appStatusBar-COMHAiNk.js";
import { E as Ro, S as No, C as _o } from "./vendor-codemirror-V7b8BJE-.js";
import { i as Oo } from "./previewMirrorEdit-leZWMWJ1.js";
import { u as Do } from "./LlamaCppModelSelect-CcvgaduJ.js";
import { j as jo, l as Fo, k as zo, m as At, n as Bo, o as ln, q as Vo, L as cn, e as un, r as Uo, f as Ho, g as Ko, t as dn, u as Wo, h as fn, __tla as __tla_3 } from "./llmAssistUiMode-8rgwoxzD.js";
import { e as mn, __tla as __tla_4 } from "./bootSplash-Z2krRgC9.js";
import { g as Xo } from "./mlxVlmGenerateClient-Dyocp-TM.js";
import { A as _t, m as Ot } from "./vendor-motion-Bv-XITR_.js";
import { y as $o, a1 as On, a2 as Dn, b as jn, C as Go, S as kt, a3 as Yo, a4 as qo, a5 as Jo, X as Zo } from "./vendor-lucide-BMfkLP2z.js";
import { K as Qo, w as Fn, x as zn, M as er, y as Bn, z as Vn, A as Un, N as tr, O as nr, Q as or, v as rr } from "./vendor-radix-C_q1g830.js";
import { r as sr, n as ar } from "./llmAssistImages-DG7rjEWr.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-google-genai-BsvcYwA0.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./OpenAiCompatibleModelSelect-CNVPsjM1.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./useLazyMermaidRender-BEGREvhj.js";
import { __tla as __tla_5 } from "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./ImageLightboxDownloadButton-BrJHusbw.js";
import "./Kbd-Cnuyx3cZ.js";
import "./downloadImageSrc-BqWro2Ax.js";
let As;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })()
]).then(async () => {
  const zt = "s3haim-llm-modal-position", Hn = "s3haim-llm-modal-hidden", ir = 420, Dt = 280, jt = 240, lr = 560, Kn = 44, St = {
    leftVw: 55,
    topVh: 12
  };
  function cr() {
    try {
      const e = localStorage.getItem(zt);
      if (!e) return {
        ...St
      };
      const n = JSON.parse(e), a = Number(n == null ? void 0 : n.leftVw), o = Number(n == null ? void 0 : n.topVh);
      return !Number.isFinite(a) || !Number.isFinite(o) ? {
        ...St
      } : {
        leftVw: Math.min(95, Math.max(0, a)),
        topVh: Math.min(95, Math.max(0, o))
      };
    } catch {
      return {
        ...St
      };
    }
  }
  function Ct(e) {
    const n = window.innerWidth || 1, a = window.innerHeight || 1, o = cr(), c = Math.min(ir, Math.max(Dt, e.width - 16)), l = Math.min(Kn + lr, Math.max(jt, e.height - 16)), u = {
      leftPx: o.leftVw / 100 * n,
      topPx: o.topVh / 100 * a,
      widthPx: c,
      heightPx: l
    };
    return le(u, e);
  }
  function le(e, n) {
    const a = Math.max(Dt, n.width), o = Math.max(jt, n.height), c = Math.min(a, Math.max(Dt, e.widthPx)), l = Math.min(o, Math.max(jt, e.heightPx)), u = n.right - c, d = n.bottom - Kn, g = Math.min(Math.max(n.left, e.leftPx), Math.max(n.left, u)), h = Math.min(Math.max(n.top, e.topPx), Math.max(n.top, d));
    return {
      leftPx: Math.round(g),
      topPx: Math.round(h),
      widthPx: Math.round(c),
      heightPx: Math.round(l)
    };
  }
  function ur(e) {
    const n = e ?? {
      left: 8,
      top: 8,
      right: window.innerWidth - 8,
      bottom: window.innerHeight - 8,
      width: window.innerWidth - 16,
      height: window.innerHeight - 16
    };
    try {
      const a = localStorage.getItem(zt);
      if (!a) return Ct(n);
      const o = JSON.parse(a);
      return Number.isFinite(Number(o == null ? void 0 : o.leftPx)) && Number.isFinite(Number(o == null ? void 0 : o.topPx)) && Number.isFinite(Number(o == null ? void 0 : o.widthPx)) && Number.isFinite(Number(o == null ? void 0 : o.heightPx)) ? le({
        leftPx: Number(o.leftPx),
        topPx: Number(o.topPx),
        widthPx: Number(o.widthPx),
        heightPx: Number(o.heightPx)
      }, n) : Ct(n);
    } catch {
      return Ct(n);
    }
  }
  function dr(e, n) {
    const a = n ?? {
      left: 8,
      top: 8,
      right: window.innerWidth - 8,
      bottom: window.innerHeight - 8,
      width: window.innerWidth - 16,
      height: window.innerHeight - 16
    }, o = le(e, a);
    try {
      localStorage.setItem(zt, JSON.stringify(o));
    } catch {
    }
  }
  function fr() {
    try {
      return localStorage.getItem(Hn) === "1";
    } catch {
      return false;
    }
  }
  function Tt(e) {
    try {
      localStorage.setItem(Hn, e ? "1" : "0");
    } catch {
    }
  }
  const mr = "[data-app-editor-navbar]", hr = 56;
  function Wn() {
    const e = document.querySelector(mr);
    return e instanceof HTMLElement ? e : null;
  }
  function pr() {
    const e = Wn();
    return e ? e.getBoundingClientRect().bottom : hr;
  }
  function gr(e) {
    const n = e == null ? void 0 : e.current, a = (n == null ? void 0 : n.value) ?? n ?? null;
    return a && typeof a == "object" && "root" in a && a.root instanceof Element ? a.root : null;
  }
  function hn(e) {
    const a = pr(), o = Io(), c = Math.max(a + 1, o), l = {
      left: 8,
      top: Math.max(8, a),
      right: Math.max(8, window.innerWidth - 8),
      bottom: c,
      width: Math.max(0, window.innerWidth - 16),
      height: Math.max(0, c - Math.max(8, a))
    }, u = gr(e);
    if (!u) return l;
    const d = u.getBoundingClientRect(), g = Wn(), h = g ? g.getBoundingClientRect().bottom : Math.max(d.top, a), v = d.left, f = d.right;
    return {
      left: v,
      top: h,
      right: f,
      bottom: c,
      width: Math.max(0, f - v),
      height: Math.max(0, c - h)
    };
  }
  const pn = 5, gn = "llm-assist-modal-resize-cursor-style", Ve = "llm-assist-modal-corner-resize";
  function xr() {
    if (document.getElementById(gn)) return;
    const e = document.createElement("style");
    e.id = gn, e.textContent = `
    html.${Ve},
    html.${Ve} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(e);
  }
  function br(e) {
    return e === "e" || e === "w" ? "ew-resize" : e === "se" ? "nwse-resize" : "nesw-resize";
  }
  function wr(e) {
    xr();
    const n = br(e);
    document.documentElement.style.setProperty("--llm-assist-resize-cursor", n), document.documentElement.classList.add(Ve), document.body.style.userSelect = "none";
  }
  function vr() {
    document.documentElement.classList.remove(Ve), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
  }
  function yr(e, n) {
    return e.leftPx === n.leftPx && e.topPx === n.topPx && e.widthPx === n.widthPx && e.heightPx === n.heightPx;
  }
  function Er(e, { enabled: n = true } = {}) {
    const a = s.useRef(hn(e)), [o, c] = s.useState(() => ur(a.current)), l = s.useRef(null), u = s.useRef({
      active: false,
      startX: 0,
      startY: 0,
      startLayout: o
    }), d = s.useRef(null), g = s.useCallback(() => {
      const M = hn(e);
      a.current = M, c((E) => {
        const y = le(E, M);
        return yr(E, y) ? E : y;
      });
    }, [
      e
    ]);
    s.useEffect(() => {
      var _a, _b, _c;
      if (!n) return;
      g();
      let M = 0;
      const E = () => {
        M || (M = requestAnimationFrame(() => {
          M = 0, g();
        }));
      };
      window.addEventListener("resize", E);
      const y = ((_b = (_a = e == null ? void 0 : e.current) == null ? void 0 : _a.value) == null ? void 0 : _b.root) ?? ((_c = e == null ? void 0 : e.current) == null ? void 0 : _c.root) ?? null;
      let A = null;
      if (typeof ResizeObserver < "u") {
        if (A = new ResizeObserver(E), y) {
          A.observe(y);
          const L = y.querySelector(".md-editor-toolbar-wrapper") || y.querySelector(".md-editor-toolbar");
          L && A.observe(L);
        }
        const T = document.querySelector("[data-app-editor-navbar]");
        T && A.observe(T);
        const P = document.querySelector("[data-app-status-bar]");
        P && A.observe(P);
      }
      return () => {
        cancelAnimationFrame(M), window.removeEventListener("resize", E), A == null ? void 0 : A.disconnect();
      };
    }, [
      n,
      e,
      g
    ]);
    const h = s.useCallback((M) => {
      const E = le(M, a.current);
      return dr(E, a.current), E;
    }, []), v = s.useCallback((M, E) => {
      const y = u.current;
      if (!y.active) return;
      const A = M - y.startX, T = E - y.startY;
      c(le({
        ...y.startLayout,
        leftPx: y.startLayout.leftPx + A,
        topPx: y.startLayout.topPx + T
      }, a.current));
    }, []), f = s.useCallback((M, { onTap: E } = {}) => {
      if (M.pointerType === "touch" || M.button !== 0) return;
      M.preventDefault();
      const y = M.clientX, A = M.clientY;
      let T = false;
      u.current = {
        active: true,
        startX: y,
        startY: A,
        startLayout: o
      };
      const P = (b) => {
        u.current.active && (Math.hypot(b.clientX - y, b.clientY - A) > pn && (T = true), v(b.clientX, b.clientY));
      }, L = () => {
        u.current.active && (u.current.active = false, document.removeEventListener("pointermove", P), document.removeEventListener("pointerup", L), c((b) => h(b)), T || (E == null ? void 0 : E()));
      };
      document.addEventListener("pointermove", P), document.addEventListener("pointerup", L);
    }, [
      v,
      o,
      h
    ]), I = s.useCallback((M, { onTap: E } = {}) => {
      const y = M.changedTouches;
      if (!(y == null ? void 0 : y.length)) return;
      const A = y[0];
      if (!A) return;
      const T = A.identifier, P = A.clientX, L = A.clientY;
      M.preventDefault();
      let b = false;
      u.current = {
        active: true,
        startX: P,
        startY: L,
        startLayout: o,
        touchIdentifier: T
      };
      const Q = ($) => {
        if (!u.current.active) return;
        const Y = Array.from($.touches).find((O) => O.identifier === T);
        Y && (Math.hypot(Y.clientX - P, Y.clientY - L) > pn && (b = true), v(Y.clientX, Y.clientY), $.preventDefault());
      }, G = () => {
        u.current.active && (u.current.active = false, document.removeEventListener("touchmove", Q), document.removeEventListener("touchend", X), document.removeEventListener("touchcancel", X), c(($) => h($)), b || (E == null ? void 0 : E()));
      }, X = ($) => {
        !u.current.active || !Array.from($.changedTouches).some((O) => O.identifier === T) || G();
      };
      document.addEventListener("touchmove", Q, {
        passive: false
      }), document.addEventListener("touchend", X, {
        passive: false
      }), document.addEventListener("touchcancel", X, {
        passive: false
      });
    }, [
      v,
      o,
      h
    ]), p = s.useCallback((M, E) => {
      const y = d.current;
      if (!y) return;
      const A = M - y.startX, T = E - y.startY, P = y.startLayout;
      let L;
      y.corner === "se" ? L = {
        leftPx: P.leftPx,
        topPx: P.topPx,
        widthPx: P.widthPx + A,
        heightPx: P.heightPx + T
      } : y.corner === "sw" ? L = {
        leftPx: P.leftPx + A,
        topPx: P.topPx,
        widthPx: P.widthPx - A,
        heightPx: P.heightPx + T
      } : y.corner === "e" ? L = {
        leftPx: P.leftPx,
        topPx: P.topPx,
        widthPx: P.widthPx + A,
        heightPx: P.heightPx
      } : L = {
        leftPx: P.leftPx + A,
        topPx: P.topPx,
        widthPx: P.widthPx - A,
        heightPx: P.heightPx
      }, c(le(L, a.current));
    }, []), N = s.useCallback((M, E) => {
      if (E.button !== 0) return;
      E.preventDefault(), E.stopPropagation(), d.current = {
        corner: M,
        startX: E.clientX,
        startY: E.clientY,
        startLayout: o
      }, wr(M);
      const y = E.currentTarget;
      y instanceof HTMLElement && typeof y.setPointerCapture == "function" && y.setPointerCapture(E.pointerId);
      const A = () => {
        d.current = null, vr(), document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", P), document.removeEventListener("pointercancel", P);
      }, T = (L) => {
        L.preventDefault(), p(L.clientX, L.clientY);
      }, P = () => {
        d.current && (A(), c((L) => h(L)));
      };
      document.addEventListener("pointermove", T, {
        passive: false
      }), document.addEventListener("pointerup", P), document.addEventListener("pointercancel", P);
    }, [
      p,
      o,
      h
    ]), _ = s.useCallback((M, E) => N(M, E), [
      N
    ]), F = {
      left: o.leftPx,
      top: o.topPx,
      width: o.widthPx,
      height: o.heightPx
    };
    return {
      layout: o,
      panelRef: l,
      panelStyle: F,
      startPositionDrag: f,
      startPositionTouchDrag: I,
      startCornerResize: _,
      startEdgeResize: N,
      refreshBounds: g
    };
  }
  function xn(e) {
    if (!e || typeof e != "object") return false;
    const n = e;
    return typeof n.getEditorView == "function" || typeof n.getSelectedText == "function";
  }
  function Xn(e) {
    const n = e == null ? void 0 : e.current;
    if (!n || typeof n != "object") return null;
    if (xn(n)) return n;
    const a = n.value;
    return xn(a) ? a : null;
  }
  function $n(e) {
    return Xn(e);
  }
  const Lr = [
    50,
    200,
    500,
    1e3
  ];
  function Mr(e, n = null) {
    if (n == null ? void 0 : n.dom) return n.dom.closest(".md-editor");
    const a = $n(e);
    return typeof Element < "u" && (a == null ? void 0 : a.root) instanceof Element ? a.root : null;
  }
  function Pr(e, { view: n = null, documentKey: a = null } = {}) {
    var _a;
    const o = n ?? He(e, {
      documentKey: a
    }).view, c = Mr(e, o);
    return Oo(c) ? true : ((_a = Ft(o, a)) == null ? void 0 : _a.everFocused) ? false : (o == null ? void 0 : o.state, true);
  }
  function Ar(e, n) {
    return e ? e.endsWith(`
`) ? n : `
${n}` : n;
  }
  function kr(e, n) {
    if (!e) return n;
    const a = e.endsWith(`
`) ? "" : `
`;
    return `${e}${a}${n}`;
  }
  function Ue(e, n, a) {
    const o = Math.max(0, Math.min(n, e)), c = Math.max(o, Math.min(a, e));
    return {
      from: o,
      to: c
    };
  }
  function Sr(e, n, a, o, c) {
    if (typeof c != "function") return false;
    const l = Ue(e.length, n, a), u = `${e.slice(0, l.from)}${o}${e.slice(l.to)}`;
    return c(u), true;
  }
  function bn({ editorRef: e, result: n, onChange: a, getMarkdown: o, forceAppendAtEnd: c = false, documentKey: l = null }) {
    var _a, _b, _c;
    const u = He(e, {
      documentKey: l
    }), { view: d } = u;
    if (c || Pr(e, {
      view: d,
      documentKey: l
    })) {
      const N = ((_c = (_b = (_a = d == null ? void 0 : d.state) == null ? void 0 : _a.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? (typeof o == "function" ? o() : ""), _ = Ar(N, n);
      if (d == null ? void 0 : d.state) {
        const F = N.length;
        return wn(d, F, F, _, a);
      }
      return typeof a == "function" ? (a(kr(N, n)), true) : false;
    }
    const h = Ft(d, l);
    let v = u.from, f = u.to;
    if ((!(d == null ? void 0 : d.hasFocus) && (h == null ? void 0 : h.everFocused) || v === f && (h == null ? void 0 : h.everFocused)) && (v = h.from, f = h.to), !(h == null ? void 0 : h.everFocused) && v === f && !u.text.trim()) return false;
    if (d == null ? void 0 : d.state) {
      const N = d.state.doc.length, _ = Ue(N, v, f);
      return wn(d, _.from, _.to, n, a);
    }
    const p = typeof o == "function" ? o() : "";
    return Sr(p, v, f, n, a);
  }
  function Cr(e, n, a) {
    var _a, _b;
    const o = e.state.selection.main, c = !!e.hasFocus, l = Ft(e, a);
    if (c) {
      const g = e.state.doc.sliceString(o.from, o.to);
      if (g) return {
        text: g,
        from: o.from,
        to: o.to,
        view: e
      };
      if (l == null ? void 0 : l.everFocused) {
        const v = e.state.doc.length, { from: f, to: I } = Ue(v, l.from, l.to);
        return {
          text: e.state.doc.sliceString(f, I),
          from: f,
          to: I,
          view: e
        };
      }
      const h = ((_a = n == null ? void 0 : n.getSelectedText) == null ? void 0 : _a.call(n)) ?? "";
      return h ? {
        text: h,
        from: o.from,
        to: o.to,
        view: e
      } : {
        text: "",
        from: o.from,
        to: o.to,
        view: e
      };
    }
    if (l == null ? void 0 : l.everFocused) {
      const g = e.state.doc.length, { from: h, to: v } = Ue(g, l.from, l.to);
      return {
        text: e.state.doc.sliceString(h, v),
        from: h,
        to: v,
        view: e
      };
    }
    const u = e.state.doc.sliceString(o.from, o.to);
    if (u) return {
      text: u,
      from: o.from,
      to: o.to,
      view: e
    };
    const d = ((_b = n == null ? void 0 : n.getSelectedText) == null ? void 0 : _b.call(n)) ?? "";
    return d ? {
      text: d,
      from: o.from,
      to: o.to,
      view: e
    } : {
      text: u,
      from: o.from,
      to: o.to,
      view: e
    };
  }
  function He(e, n) {
    var _a, _b, _c;
    const a = (n == null ? void 0 : n.documentKey) ?? null, o = ((_a = n == null ? void 0 : n.getEditorApi) == null ? void 0 : _a.call(n)) ?? Xn(e), c = ((_b = o == null ? void 0 : o.getEditorView) == null ? void 0 : _b.call(o)) ?? null;
    if (c == null ? void 0 : c.state) return Cr(c, o, a);
    const l = fo(a);
    return (l == null ? void 0 : l.everFocused) ? {
      text: "",
      from: l.from,
      to: l.to,
      view: null
    } : {
      text: ((_c = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _c.call(o)) ?? "",
      from: 0,
      to: 0,
      view: null
    };
  }
  function Tr(e) {
    var _a, _b;
    return ((_b = (_a = $n(e)) == null ? void 0 : _a.getEditorView) == null ? void 0 : _b.call(_a)) ?? null;
  }
  function Ir(e, n, a) {
    let o = false, c = null, l = null;
    const u = [], d = (a == null ? void 0 : a.documentKey) ?? null, g = () => {
      o || n(He(e, {
        documentKey: d
      }));
    }, h = () => {
      l == null ? void 0 : l(), l = null, c = null;
    };
    let v = null, f = false;
    const I = () => {
      if (o) return true;
      const p = Tr(e);
      if (!p || p === c) return !!p;
      h(), c = p, f = false, v || (v = new _o());
      const N = v, _ = Ro.updateListener.of((F) => {
        F.selectionSet && g();
      });
      if (f) try {
        p.dispatch({
          effects: N.reconfigure(_)
        });
      } catch {
        f = false;
      }
      if (!f) try {
        p.dispatch({
          effects: No.appendConfig.of(N.of(_))
        }), f = true;
      } catch {
        return g(), true;
      }
      return l = () => {
        if (f) {
          try {
            p.dispatch({
              effects: N.reconfigure([])
            });
          } catch {
          }
          f = false;
        }
      }, g(), true;
    };
    if (!I()) for (const p of Lr) u.push(setTimeout(() => {
      o || I();
    }, p));
    return () => {
      o = true;
      for (const p of u) clearTimeout(p);
      h();
    };
  }
  function wn(e, n, a, o, c) {
    var _a;
    return (e == null ? void 0 : e.state) ? (e.dispatch({
      changes: {
        from: n,
        to: a,
        insert: o
      },
      selection: {
        anchor: n + o.length
      }
    }), (_a = e.focus) == null ? void 0 : _a.call(e), c == null ? void 0 : c(e.state.doc.toString()), true) : false;
  }
  const Rr = 520, Nr = 12, vn = 80, yn = 300, _r = 180, Or = ho, Dr = [
    0.4,
    0,
    0.2,
    1
  ];
  function It(e) {
    return typeof window > "u" ? e * 5 : window.innerWidth * e / 100;
  }
  function En(e) {
    var _a;
    return e ? e.closest("[data-llm-assist-layout-root]") || ((_a = e.parentElement) == null ? void 0 : _a.parentElement) || e.parentElement : null;
  }
  function jr({ open: e, onClose: n, children: a, className: o = "" }) {
    const c = s.useRef(null), [l, u] = s.useState(() => Math.max(yn, Math.floor(It(vn)))), d = Math.max(1, Math.floor(It(Nr)));
    s.useEffect(() => {
      if (!e) return;
      const p = () => {
        var _a;
        const y = (((_a = En(c.current)) == null ? void 0 : _a.clientWidth) ?? window.innerWidth) - _r, A = Math.max(yn, Math.floor(It(vn)));
        u(Math.max(d, Math.min(A, y)));
      };
      p();
      const N = requestAnimationFrame(p);
      window.addEventListener("resize", p);
      let _ = null;
      const F = En(c.current);
      return F && typeof ResizeObserver < "u" && (_ = new ResizeObserver(p), _.observe(F)), () => {
        cancelAnimationFrame(N), window.removeEventListener("resize", p), _ == null ? void 0 : _.disconnect();
      };
    }, [
      d,
      e
    ]);
    const g = Math.max(1, Math.floor(d / 3)), { width: h, isResizing: v, handleProps: f } = mo({
      storageKey: "s3haim_llm_assist_dock_width",
      defaultWidth: Rr,
      minWidth: d,
      maxWidth: Math.max(l, d),
      edge: "right",
      collapseBelowWidth: g,
      onCollapseBelowMin: typeof n == "function" ? n : void 0
    }), I = Math.min(h, l);
    return i.jsx(_t, {
      initial: false,
      children: e ? i.jsx(Ot.div, {
        className: "relative h-full min-h-0 shrink-0 overflow-hidden",
        initial: {
          width: 0
        },
        animate: {
          width: I
        },
        exit: {
          width: 0
        },
        transition: v ? {
          duration: 0
        } : {
          duration: 0.28,
          ease: Dr
        },
        children: i.jsxs("div", {
          ref: c,
          className: `relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${o}`,
          style: {
            width: I
          },
          children: [
            i.jsx(Or, {
              handleProps: {
                ...f,
                "aria-valuenow": Math.round(I),
                "aria-valuemax": Math.round(l)
              },
              isResizing: v,
              edge: "left",
              visibleOnHover: true,
              label: "AI \uB3C4\uC6B0\uBBF8 \uB108\uBE44 \uC870\uC808"
            }),
            i.jsx("div", {
              className: "flex min-h-0 min-w-0 flex-1 flex-col",
              children: a
            })
          ]
        })
      }, "llm-assist-dock") : null
    });
  }
  const Fr = "inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", zr = "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50", Br = "z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
  function Vr(e) {
    return e === "docked" ? Dn : e === "split" ? jn : On;
  }
  function Ur({ presentation: e, onChange: n, splitEnabled: a = true }) {
    const o = Vr(e), c = [
      {
        value: "floating",
        label: "\uD50C\uB85C\uD305 \uCC3D",
        icon: On
      },
      {
        value: "docked",
        label: "\uC6B0\uCE21\uC5D0 \uACE0\uC815",
        icon: Dn
      },
      {
        value: "split",
        label: "\uC5D0\uC774\uC804\uD2B8 \uD0ED",
        icon: jn,
        disabled: !a
      }
    ];
    return i.jsxs(Qo, {
      children: [
        i.jsxs(Fn, {
          children: [
            i.jsx(zn, {
              asChild: true,
              children: i.jsx(er, {
                asChild: true,
                children: i.jsxs("button", {
                  type: "button",
                  onPointerDown: (l) => l.stopPropagation(),
                  onTouchStart: (l) => l.stopPropagation(),
                  className: Fr,
                  "aria-label": "\uD45C\uC2DC \uBC29\uC2DD",
                  children: [
                    i.jsx(o, {
                      size: 15,
                      "aria-hidden": true
                    }),
                    i.jsx($o, {
                      size: 12,
                      "aria-hidden": true,
                      className: "opacity-70"
                    })
                  ]
                })
              })
            }),
            i.jsx(Bn, {
              children: i.jsxs(Vn, {
                side: "bottom",
                sideOffset: 6,
                className: "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50",
                children: [
                  "\uD45C\uC2DC \uBC29\uC2DD",
                  i.jsx(Un, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        }),
        i.jsx(tr, {
          children: i.jsx(nr, {
            side: "bottom",
            align: "end",
            sideOffset: 4,
            className: Br,
            onCloseAutoFocus: (l) => l.preventDefault(),
            children: c.map((l) => {
              const u = l.icon, d = e === l.value;
              return i.jsxs(or, {
                disabled: !!l.disabled,
                className: `${zr} ${l.disabled ? "cursor-not-allowed opacity-40" : ""}`,
                onSelect: () => {
                  l.disabled || l.value === e || n(l.value);
                },
                children: [
                  i.jsx(u, {
                    size: 14,
                    className: "shrink-0 opacity-80",
                    "aria-hidden": true
                  }),
                  i.jsx("span", {
                    className: "min-w-0 flex-1",
                    children: l.label
                  }),
                  d ? i.jsx(Go, {
                    size: 14,
                    className: "shrink-0 text-violet-600 dark:text-violet-300",
                    "aria-hidden": true
                  }) : null
                ]
              }, l.value);
            })
          })
        })
      ]
    });
  }
  function Hr(e) {
    return e.map((n) => `${n.role === "assistant" ? "Assistant" : "User"}:
${n.content.trim()}`).filter((n) => n.length > 0).join(`

`);
  }
  async function Kr({ profile: e, model: n, messages: a, systemPrompt: o, requestOptions: c, onChunk: l, signal: u }) {
    const d = a.map((g) => ({
      ...g,
      content: String(g.content || "").trim()
    })).filter((g) => g.content.length > 0);
    if (!d.length) throw new Error("\uCC44\uD305 \uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694.");
    if (e.kind === Be || e.kind === fe) {
      if (e.kind === fe && Pn(n)) throw new Error("Tabular \uBAA8\uB378\uC740 \uCC44\uD305 \uBAA8\uB4DC\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uCC44\uD305 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      const g = An(e);
      return Z(e.id, n), ze(n), ie(e.id, () => e.apiKey || "", (h) => on({
        baseUrl: g,
        apiKey: h,
        model: n,
        messages: d.map((v) => ({
          role: v.role,
          content: v.content
        })),
        ...o !== void 0 ? {
          systemPrompt: o
        } : {},
        ...c !== void 0 ? {
          requestOptions: c
        } : {},
        ...l ? {
          onChunk: l
        } : {},
        ...u ? {
          signal: u
        } : {}
      }), {
        allowEmpty: e.kind === Be,
        missingKeyMessage: e.kind === fe ? "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." : "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      });
    }
    if (e.kind === kn) {
      const g = Sn(), h = await Cn(g, {
        ...u ? {
          signal: u
        } : {}
      }), v = (e.baseUrl || h.baseUrl || "").trim();
      if (!v) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
      const f = n.trim() || g.selectedModelId || h.models[0] || "";
      if (!f) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return Z(e.id, f), ie(e.id, () => e.apiKey || g.apiKey || "no-key-required", (I) => on({
        baseUrl: v,
        apiKey: I,
        model: f,
        messages: d.map((p) => ({
          role: p.role,
          content: p.content
        })),
        ...o !== void 0 ? {
          systemPrompt: o
        } : {},
        ...c !== void 0 ? {
          requestOptions: c
        } : {},
        ...l ? {
          onChunk: l
        } : {},
        ...u ? {
          signal: u
        } : {}
      }), {
        allowEmpty: true,
        missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      });
    }
    if (e.kind === Tn) {
      const g = In(), h = await Rn(g);
      if (!h.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
      const v = n.trim() || g.selectedModelId || h.models[0] || "";
      if (!v) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return Z(e.id, v), po({
        prompt: Hr(d),
        systemPrompt: (o ?? "").trim(),
        generateOptions: To(c ?? {}),
        resetCache: true,
        ...l ? {
          onChunk: l
        } : {},
        ...u ? {
          signal: u
        } : {}
      });
    }
    if (e.kind === Nn) {
      if (_n(n)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
      return Z(e.id, n), Nt(n), ie(e.id, () => e.apiKey || "", (g) => So({
        apiKey: g,
        model: n,
        messages: d.map((h) => ({
          role: h.role,
          content: h.content
        })),
        ...o !== void 0 ? {
          systemPrompt: o
        } : {},
        ...c !== void 0 ? {
          requestOptions: c
        } : {},
        ...l ? {
          onChunk: l
        } : {},
        ...u ? {
          signal: u
        } : {}
      }), {
        missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
      });
    }
    throw new Error("\uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 AI \uC81C\uACF5\uC790\uC785\uB2C8\uB2E4.");
  }
  function Ln() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
  const Wr = [
    0.4,
    0,
    0.2,
    1
  ], Mn = {
    duration: 0.28,
    ease: Wr
  }, Xr = "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", $r = "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
  function Rt({ label: e, onClick: n, disabled: a, children: o }) {
    return i.jsxs(Fn, {
      children: [
        i.jsx(zn, {
          asChild: true,
          children: i.jsx("button", {
            type: "button",
            onPointerDown: (c) => c.stopPropagation(),
            onTouchStart: (c) => c.stopPropagation(),
            onClick: n,
            disabled: a,
            className: Xr,
            "aria-label": e,
            children: o
          })
        }),
        i.jsx(Bn, {
          children: i.jsxs(Vn, {
            side: "bottom",
            sideOffset: 6,
            className: $r,
            children: [
              e,
              i.jsx(Un, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  As = function({ editorRef: e = null, onChange: n, getMarkdown: a, llmProviderProfiles: o, open: c, onOpenChange: l, theme: u = "light" }) {
    var _a, _b, _c;
    const d = go(), g = xo(), h = bo(), { requestCreateFileWithContent: v } = wo(), f = g ? g.open : !!c, I = g ? g.setOpen : l, p = (d == null ? void 0 : d.presentation) ?? "floating", N = d == null ? void 0 : d.setPresentation, _ = d == null ? void 0 : d.openAsSplit, F = d == null ? void 0 : d.dockToRight, M = d == null ? void 0 : d.undockToFloating, E = d ? d.canInsertIntoDocument : !!e, y = !!(h == null ? void 0 : h.workspaceTabsEnabled), [A, T] = s.useState(() => vt());
    s.useEffect(() => (T(vt()), vo(() => {
      T(vt());
    })), []);
    const P = s.useCallback((t) => {
      if (t === "split") {
        if (!y) return;
        _ == null ? void 0 : _();
        return;
      }
      if (t === "docked") {
        F == null ? void 0 : F();
        return;
      }
      M == null ? void 0 : M();
    }, [
      y,
      _,
      F,
      M
    ]), L = ((_a = d == null ? void 0 : d.editorBridge) == null ? void 0 : _a.editorRef) ?? e, b = (d == null ? void 0 : d.editorBridge) ?? null, Q = ((_b = d == null ? void 0 : d.editorBridge) == null ? void 0 : _b.onChange) ?? n, G = ((_c = d == null ? void 0 : d.editorBridge) == null ? void 0 : _c.getMarkdown) ?? a, X = s.useMemo(() => Array.isArray(o) ? o : [], [
      o
    ]), [$, Y] = s.useState(() => fr()), [O, ce] = s.useState(false), [me, he] = s.useState(""), [Bt, Ke] = s.useState({
      from: 0,
      to: 0
    }), [ee, We] = s.useState([]), [q, Te] = s.useState(""), [z, pe] = s.useState(() => yt()), [B, ge] = s.useState(() => ({
      ...rn
    })), [D, H] = s.useState(""), [Xe, Vt] = s.useState("text"), [$e, Ut] = s.useState(false), [Ge, J] = s.useState(""), [xe, Gn] = s.useState([]), [Ye, Ie] = s.useState(""), [be, Re] = s.useState(""), [te, Ne] = s.useState(null), [we, _e, Ht] = Do(X), x = yo(X, we), [C, qe] = s.useState(() => x ? tn(x.id, x.kind) : ""), [ne, Kt] = s.useState(() => jo(Et(C) ?? "classification")), [se, Yn] = s.useState(() => Fo()), [ve, ue] = s.useState([]), [ye, Oe] = s.useState(""), [Je, Ze] = s.useState(false), [Qe, Ee] = s.useState(""), V = s.useRef(null), K = s.useRef(false), Le = s.useRef(null), oe = s.useRef(null), [et, qn] = s.useState(() => typeof window < "u" ? window.matchMedia(`(max-width: ${Lt}px)`).matches : false), [Jn, tt] = s.useState(false);
    s.useEffect(() => {
      const t = window.matchMedia(`(max-width: ${Lt}px)`), r = () => qn(t.matches);
      return r(), t.addEventListener("change", r), () => t.removeEventListener("change", r);
    }, []), s.useEffect(() => {
      if (!f) {
        tt(false);
        return;
      }
      const t = document.querySelector("[data-llm-assist-layout-root]");
      if (!t || typeof ResizeObserver > "u") {
        tt(et);
        return;
      }
      const r = (w) => {
        tt(w > 0 && w <= Lt);
      };
      r(t.getBoundingClientRect().width);
      const m = new ResizeObserver((w) => {
        var _a2, _b2;
        const k = w[0];
        if (!k) return;
        const R = ((_b2 = (_a2 = k.borderBoxSize) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.inlineSize) ?? k.contentRect.width;
        r(R);
      });
      return m.observe(t), () => m.disconnect();
    }, [
      f,
      et
    ]);
    const U = !!f && (et || Jn) && (p === "docked" || p === "floating"), { panelRef: Zn, panelStyle: nt, startPositionDrag: Wt, startPositionTouchDrag: Xt, startCornerResize: $t, startEdgeResize: Gt, refreshBounds: Yt } = Er(L, {
      enabled: f && p === "floating" && !U
    }), De = s.useCallback((t) => {
      Yn(t), zo(t);
    }, []), Me = s.useCallback(() => ({
      selectedText: me,
      selectionRange: Bt,
      attachedImages: ee,
      instruction: q,
      systemPrompt: z,
      requestOptions: B,
      result: D,
      resultViewMode: Xe,
      loading: $e,
      error: Ge,
      templates: xe,
      selectedTemplateId: Ye,
      templateName: be,
      editingTemplateId: te,
      profiles: X.map((t) => ({
        id: t.id,
        name: t.name,
        kind: t.kind,
        baseUrl: t.baseUrl
      })),
      selectedProfileId: we,
      model: C,
      theme: u,
      uiMode: se,
      chatMessages: ve,
      chatDraft: ye,
      chatLoading: Je,
      chatError: Qe
    }), [
      me,
      Bt,
      ee,
      q,
      z,
      B,
      D,
      Xe,
      $e,
      Ge,
      xe,
      Ye,
      be,
      te,
      X,
      we,
      C,
      u,
      se,
      ve,
      ye,
      Je,
      Qe
    ]), je = s.useCallback(() => {
      if (K.current) {
        At(null, Me());
        return;
      }
      const t = V.current;
      !t || t.closed || At(t, Me());
    }, [
      Me
    ]), de = s.useCallback(() => {
      const t = K.current ? null : V.current;
      V.current = null, K.current = false, Bo(t).finally(() => {
        ce(false);
      });
    }, []), W = s.useCallback(() => {
      if (!L && !(b == null ? void 0 : b.getEditorApi) && !(b == null ? void 0 : b.getSelection) && !(b == null ? void 0 : b.getMarkdown)) return "";
      if (typeof (b == null ? void 0 : b.getSelection) == "function") {
        const { text: w, from: k, to: R } = b.getSelection();
        return he((S) => S === w ? S : w), Ke((S) => S.from === k && S.to === R ? S : {
          from: k,
          to: R
        }), w;
      }
      const { text: t, from: r, to: m } = He(L, {
        ...(b == null ? void 0 : b.getEditorApi) ? {
          getEditorApi: b.getEditorApi
        } : {},
        ...(b == null ? void 0 : b.documentKey) ? {
          documentKey: b.documentKey
        } : {}
      });
      return he((w) => w === t ? w : t), Ke((w) => w.from === r && w.to === m ? w : {
        from: r,
        to: m
      }), t;
    }, [
      L,
      b
    ]), re = s.useCallback(async () => {
      const t = await Eo();
      return Gn(t), t;
    }, []);
    s.useEffect(() => {
      if (!f) return;
      p !== "floating" && (Y(false), Tt(false)), (p === "split" || p === "docked") && de(), J(""), Ht();
      let t = 0, r = 0, m = 0;
      t = requestAnimationFrame(() => {
        W();
      });
      const w = () => {
        Yt(), re();
      }, k = window;
      return typeof k.requestIdleCallback == "function" ? r = k.requestIdleCallback(w) : m = window.setTimeout(w, 1), () => {
        cancelAnimationFrame(t), r && typeof k.cancelIdleCallback == "function" && k.cancelIdleCallback(r), m && window.clearTimeout(m);
      };
    }, [
      f,
      p,
      Yt,
      W,
      re,
      Ht,
      de
    ]), s.useEffect(() => {
      if (!(x == null ? void 0 : x.id) || !(x == null ? void 0 : x.kind)) {
        qe("");
        return;
      }
      qe(tn(x.id, x.kind));
    }, [
      x == null ? void 0 : x.id,
      x == null ? void 0 : x.kind
    ]), s.useEffect(() => {
      const t = () => {
        Ie(""), Ne(null), re();
      };
      return window.addEventListener(nn, t), () => {
        window.removeEventListener(nn, t);
      };
    }, [
      re
    ]), s.useEffect(() => {
      f && W();
    }, [
      f,
      b,
      W
    ]), s.useEffect(() => {
      if (!f || O || p === "floating" && $) return;
      const t = ({ text: r, from: m, to: w }) => {
        he((k) => k === r ? k : r), Ke((k) => k.from === m && k.to === w ? k : {
          from: m,
          to: w
        });
      };
      if (typeof (b == null ? void 0 : b.subscribeSelection) == "function") return b.subscribeSelection(t);
      if (L) return Ir(L, t, (b == null ? void 0 : b.documentKey) ? {
        documentKey: b.documentKey
      } : void 0);
    }, [
      f,
      $,
      O,
      L,
      p,
      b,
      b == null ? void 0 : b.documentKey,
      b == null ? void 0 : b.subscribeSelection
    ]), s.useEffect(() => {
      je();
    }, [
      je
    ]), s.useEffect(() => {
      if (!O) return;
      const t = setInterval(() => {
        ln(K.current ? null : V.current).then((r) => {
          r || (V.current = null, K.current = false, ce(false));
        });
      }, 400);
      return () => clearInterval(t);
    }, [
      O
    ]), s.useEffect(() => {
      if (!f) {
        de();
        return;
      }
      const t = () => {
        Uo(K.current ? null : V.current);
      };
      return window.addEventListener("beforeunload", t), () => window.removeEventListener("beforeunload", t);
    }, [
      f,
      de
    ]);
    const Fe = s.useCallback((t) => {
      const r = String(t || "").trim();
      qe(r);
      const m = Et(r);
      m && Kt((w) => ({
        ...w,
        outputType: m === "classification" ? "class" : "point"
      })), x && (Z(x.id, r), x.kind === Nn ? Nt(r) : ze(r));
    }, [
      x
    ]), Pe = s.useCallback(() => {
      const t = Le.current;
      !t || t.signal.aborted || t.abort(Mt());
    }, []), Ae = s.useCallback(() => {
      const t = oe.current;
      !t || t.signal.aborted || t.abort(Mt());
    }, []), ot = s.useCallback(() => {
      oe.current && (oe.current.abort(Mt()), oe.current = null), ue([]), Oe(""), Ee(""), Ze(false);
    }, []), rt = s.useCallback(async () => {
      if (oe.current) return;
      const t = ye.trim();
      if (!t) return;
      if (!x) {
        Ee("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
        return;
      }
      const r = {
        id: Ln(),
        role: "user",
        content: t
      }, m = Ln(), w = [
        ...ve,
        r
      ], k = new AbortController();
      oe.current = k, Oe(""), Ee(""), Ze(true), ue([
        ...w,
        {
          id: m,
          role: "assistant",
          content: ""
        }
      ]);
      try {
        const R = await Kr({
          profile: x,
          model: C,
          messages: w,
          systemPrompt: z,
          requestOptions: B,
          signal: k.signal,
          onChunk: (S) => {
            ue((j) => j.map((ae) => ae.id === m ? {
              ...ae,
              content: S
            } : ae));
          }
        });
        ue((S) => S.map((j) => j.id === m ? {
          ...j,
          content: R
        } : j));
      } catch (R) {
        if (sn(R)) {
          Ee("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4."), ue((S) => S.filter((j) => !(j.id === m && !j.content.trim())));
          return;
        }
        Ee(R instanceof Error ? R.message : "LLM \uCC44\uD305 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), ue((S) => S.filter((j) => !(j.id === m && !j.content.trim())));
      } finally {
        oe.current === k && (oe.current = null, Ze(false));
      }
    }, [
      ye,
      ve,
      x,
      C,
      z,
      B
    ]), st = s.useCallback(async () => {
      if (Le.current) return;
      const t = new AbortController();
      Le.current = t, J(""), H(""), Ut(true);
      try {
        const r = me;
        if (!x) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
        if (x.kind === Be || x.kind === fe) {
          if (x.kind === fe && Pn(C)) {
            const S = Et(C);
            if (!S) throw new Error("\uC54C \uC218 \uC5C6\uB294 EXAONE Tabular \uBAA8\uB378\uC785\uB2C8\uB2E4.");
            if (!ne.trainFile) throw new Error("\uD559\uC2B5\uC6A9 CSV(train_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
            if (!ne.testFile) throw new Error("\uC608\uCE21\uC6A9 CSV(test_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
            Z(x.id, C), ze(C);
            const { runExaoneTabularPredict: j } = await co(async () => {
              const { runExaoneTabularPredict: xt } = await import("./exaoneTabularClient-BHqu9H8i.js");
              return {
                runExaoneTabularPredict: xt
              };
            }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])), ae = await ie(x.id, () => x.apiKey || "", async (xt) => {
              const bt = ne.trainFile, wt = ne.testFile;
              return (await j({
                apiKey: xt,
                task: S,
                trainFile: bt,
                testFile: wt,
                ...bt.name ? {
                  trainFileName: bt.name
                } : {},
                ...wt.name ? {
                  testFileName: wt.name
                } : {},
                targetColumn: ne.targetColumn,
                outputType: ne.outputType,
                signal: t.signal
              })).markdown;
            }, {
              missingKeyMessage: "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
            });
            H(ae);
            return;
          }
          const w = An(x);
          if (!w) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
          Z(x.id, C), ze(C);
          const k = x.kind === fe ? "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." : "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694.", R = await ie(x.id, () => x.apiKey || "", (S) => an({
            baseUrl: w,
            apiKey: S,
            model: C,
            instruction: q,
            systemPrompt: z,
            selectedText: r,
            images: ee,
            requestOptions: B,
            onChunk: H,
            signal: t.signal
          }), {
            allowEmpty: x.kind === Be,
            missingKeyMessage: k
          });
          H(R);
          return;
        }
        if (x.kind === kn) {
          const w = Sn(), k = await Cn(w, {
            signal: t.signal
          }), R = (x.baseUrl || k.baseUrl || "").trim();
          if (!R) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
          const S = C.trim() || w.selectedModelId || k.models[0] || "";
          if (!S) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
          Z(x.id, S);
          const j = await ie(x.id, () => x.apiKey || w.apiKey || "no-key-required", (ae) => an({
            baseUrl: R,
            apiKey: ae,
            model: S,
            instruction: q,
            systemPrompt: z,
            selectedText: r,
            images: ee,
            requestOptions: B,
            onChunk: H,
            signal: t.signal
          }), {
            allowEmpty: true,
            missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
          });
          H(j);
          return;
        }
        if (x.kind === Tn) {
          const w = In(), k = await Rn(w);
          if (!k.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
          const R = C.trim() || w.selectedModelId || k.models[0] || "";
          if (!R) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
          Z(x.id, R);
          const S = await Xo({
            instruction: q,
            systemPrompt: z,
            selectedText: r,
            images: ee,
            requestOptions: B,
            onChunk: H,
            signal: t.signal
          });
          H(S);
          return;
        }
        if (_n(C)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
        Z(x.id, C), Nt(C);
        const m = await ie(x.id, () => x.apiKey || "", (w) => Co({
          apiKey: w,
          model: C,
          instruction: q,
          systemPrompt: z,
          selectedText: r,
          images: ee,
          requestOptions: B,
          onChunk: H,
          signal: t.signal
        }), {
          missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
        });
        H(m);
      } catch (r) {
        if (sn(r)) {
          J("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
          return;
        }
        J(r instanceof Error ? r.message : "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        Le.current === t && (Le.current = null, Ut(false));
      }
    }, [
      me,
      ee,
      x,
      C,
      q,
      z,
      B,
      ne
    ]), at = s.useCallback(() => {
      if (!D) return;
      if (!E || !L && !G && !(b == null ? void 0 : b.applyResult)) {
        J("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (b == null ? void 0 : b.applyResult) == "function" ? b.applyResult(D) : bn({
        editorRef: L ?? {
          current: null
        },
        result: D,
        ...Q ? {
          onChange: Q
        } : {},
        ...G ? {
          getMarkdown: G
        } : {},
        ...(b == null ? void 0 : b.documentKey) ? {
          documentKey: b.documentKey
        } : {}
      }))) {
        J("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      W();
    }, [
      D,
      L,
      E,
      Q,
      G,
      W,
      b
    ]), it = s.useCallback(() => {
      if (!D) return;
      if (!E || !L && !G && !(b == null ? void 0 : b.applyResult)) {
        J("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (b == null ? void 0 : b.applyResult) == "function" ? b.applyResult(D, {
        forceAppendAtEnd: true
      }) : bn({
        editorRef: L ?? {
          current: null
        },
        result: D,
        ...Q ? {
          onChange: Q
        } : {},
        ...G ? {
          getMarkdown: G
        } : {},
        forceAppendAtEnd: true,
        ...(b == null ? void 0 : b.documentKey) ? {
          documentKey: b.documentKey
        } : {}
      }))) {
        J("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      W();
    }, [
      D,
      L,
      E,
      Q,
      G,
      W,
      b
    ]), lt = s.useCallback(async () => {
      if (!D) return;
      await Lo(D, {
        message: "\uACB0\uACFC\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4"
      }) || J("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }, [
      D
    ]), ct = s.useCallback(() => {
      D && v(D);
    }, [
      D,
      v
    ]), ut = s.useCallback((t) => {
      Ie(t);
      const r = xe.find((m) => m.id === t);
      r && (Te(r.instruction), pe(typeof r.systemPrompt == "string" && r.systemPrompt.trim() ? r.systemPrompt : yt()), ge(Pt(r.requestOptions)), Re(r.name), Ne(r.id));
    }, [
      xe
    ]), dt = s.useCallback(async () => {
      const t = be.trim(), r = q.trim();
      if (!t || !r) {
        alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      try {
        const m = await Mo({
          id: te || Po().id,
          name: t,
          instruction: r,
          systemPrompt: z.trim(),
          requestOptions: Pt(B),
          updatedAt: Date.now()
        });
        Ne(m.id), Ie(m.id), await re();
      } catch (m) {
        alert(m instanceof Error ? m.message : "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      be,
      q,
      z,
      B,
      te,
      re
    ]), ke = s.useCallback(() => {
      Ne(null), Ie(""), Re(""), Te(""), pe(yt()), ge({
        ...rn
      });
    }, []), ft = s.useCallback(async () => {
      if (te && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
        await Ao(te), ke(), await re();
      } catch (t) {
        alert(t instanceof Error ? t.message : "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      te,
      ke,
      re
    ]), Se = s.useCallback(async (t) => {
      t.length && We((r) => [
        ...r,
        ...t
      ]);
    }, []), mt = s.useCallback((t) => {
      t && We((r) => r.filter((m) => m.id !== t));
    }, []), ht = s.useCallback(() => {
      We([]);
    }, []), qt = s.useCallback(async (t) => {
      try {
        const r = await sr(t);
        await Se(r);
      } catch (r) {
        J(r instanceof Error ? r.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      Se
    ]), Jt = s.useCallback(async (t, r = {}) => {
      switch (t) {
        case "refresh-selection":
          W();
          break;
        case "set-selected-text":
          he(typeof r.value == "string" ? r.value : "");
          break;
        case "run":
          await st();
          break;
        case "cancel-run":
          Pe();
          break;
        case "apply-result":
          at();
          break;
        case "append-result":
          it();
          break;
        case "copy-result":
          lt();
          break;
        case "create-note-from-result":
          ct();
          break;
        case "set-instruction":
          Te(typeof r.value == "string" ? r.value : "");
          break;
        case "set-system-prompt":
          pe(typeof r.value == "string" ? r.value : "");
          break;
        case "set-request-options":
          ge(Pt(r.value));
          break;
        case "set-result":
          H(typeof r.value == "string" ? r.value : "");
          break;
        case "set-model":
          typeof r.value == "string" && Fe(r.value);
          break;
        case "set-llm-profile-id":
          typeof r.value == "string" && _e(r.value);
          break;
        case "load-template":
          ut(String(r.id ?? ""));
          break;
        case "save-template":
          await dt();
          break;
        case "new-template":
          ke();
          break;
        case "delete-template":
          await ft();
          break;
        case "set-template-name":
          Re(typeof r.value == "string" ? r.value : "");
          break;
        case "set-result-view-mode":
          (r.value === "preview" || r.value === "text") && Vt(r.value);
          break;
        case "add-images": {
          const m = (Array.isArray(r.images) ? r.images : []).map(ar).filter((w) => w !== null);
          m.length && await Se(m);
          break;
        }
        case "remove-image":
          mt(String(r.id ?? ""));
          break;
        case "clear-images":
          ht();
          break;
        case "set-ui-mode":
          (r.value === "edit" || r.value === "chat") && De(r.value);
          break;
        case "set-chat-draft":
          Oe(typeof r.value == "string" ? r.value : "");
          break;
        case "send-chat":
          await rt();
          break;
        case "cancel-chat":
          Ae();
          break;
        case "clear-chat":
          ot();
          break;
        case "close":
          I == null ? void 0 : I(false);
          break;
      }
    }, [
      W,
      st,
      Pe,
      at,
      it,
      lt,
      ct,
      Fe,
      _e,
      ut,
      dt,
      ke,
      ft,
      Se,
      mt,
      ht,
      De,
      rt,
      Ae,
      ot,
      I
    ]);
    s.useEffect(() => {
      if (!f) return;
      let t = () => {
      }, r = false;
      return Vo((m) => {
        if (m.type === fn.READY) {
          m.source && typeof m.source.postMessage == "function" ? (V.current = m.source, K.current = false) : mn() && (V.current = null, K.current = true), ce(true), At(K.current ? null : V.current, Me());
          return;
        }
        m.type === fn.ACTION && m.action && Jt(m.action, m.payload ?? {});
      }).then((m) => {
        if (r) {
          m();
          return;
        }
        t = m;
      }), () => {
        r = true, t();
      };
    }, [
      f,
      Me,
      Jt
    ]);
    const Qn = () => {
      Y(true), Tt(true);
    }, pt = () => {
      Y(false), Tt(false), W();
    }, Ce = s.useCallback(() => {
      Pe(), Ae(), de(), I == null ? void 0 : I(false);
    }, [
      Pe,
      Ae,
      de,
      I
    ]);
    ko(U, Ce, U, "llm-assist-full"), s.useEffect(() => {
      if (!U) return;
      const t = (r) => {
        r.key === "Escape" && (r.preventDefault(), Ce());
      };
      return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
    }, [
      U,
      Ce
    ]);
    const eo = () => {
      (async () => {
        if (mn() && await ln(null)) {
          K.current = true, V.current = null, await dn(null), je(), ce(true);
          return;
        }
        const t = V.current;
        if (t && !t.closed) {
          await dn(t), je(), ce(true);
          return;
        }
        const r = await Wo();
        if (!r) {
          alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          return;
        }
        r === "tauri" ? (K.current = true, V.current = null) : (K.current = false, V.current = r), ce(true);
      })();
    }, to = {
      theme: u,
      profiles: X,
      selectedProfileId: we,
      onSelectedProfileIdChange: _e,
      selectedProfile: x,
      model: C,
      onModelChange: Fe,
      selectedText: me,
      onSelectedTextChange: he,
      onRefreshSelection: W,
      attachedImages: ee,
      onAddImages: Se,
      onRemoveImage: mt,
      onClearImages: ht,
      instruction: q,
      onInstructionChange: Te,
      systemPrompt: z,
      onSystemPromptChange: pe,
      requestOptions: B,
      onRequestOptionsChange: ge,
      result: D,
      onResultChange: H,
      resultViewMode: Xe,
      onResultViewModeChange: Vt,
      loading: $e,
      error: Ge,
      templates: xe,
      selectedTemplateId: Ye,
      onLoadTemplate: ut,
      templateName: be,
      onTemplateNameChange: Re,
      editingTemplateId: te,
      onSaveTemplate: dt,
      onNewTemplate: ke,
      onDeleteTemplate: ft,
      onRun: st,
      onCancelGeneration: Pe,
      onApplyResult: at,
      onAppendResult: it,
      onCopyResult: lt,
      onCreateNoteFromResult: ct,
      presentation: p,
      canInsertIntoDocument: E,
      exaoneTabular: ne,
      onExaoneTabularChange: Kt
    }, Zt = i.jsx(rr, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: i.jsxs("div", {
        className: "flex shrink-0 flex-wrap items-center justify-end gap-1",
        children: [
          typeof N == "function" || typeof F == "function" || typeof M == "function" || typeof _ == "function" ? i.jsx(Ur, {
            presentation: p,
            onChange: P,
            splitEnabled: y && !U
          }) : null,
          p === "floating" && !U ? i.jsx(Rt, {
            label: O ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30",
            onClick: eo,
            disabled: O,
            children: i.jsx(qo, {
              size: 15
            })
          }) : null,
          p === "floating" && !U ? i.jsx(Rt, {
            label: "\uC228\uAE30\uAE30",
            onClick: Qn,
            children: i.jsx(Jo, {
              size: 15
            })
          }) : null,
          i.jsx(Rt, {
            label: "\uB2EB\uAE30",
            onClick: Ce,
            children: i.jsx(Zo, {
              size: 15
            })
          })
        ]
      })
    }), no = i.jsxs("div", {
      className: "flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100",
      children: [
        i.jsx(kt, {
          size: 16,
          className: "shrink-0",
          "aria-hidden": true
        }),
        i.jsx("span", {
          className: "whitespace-nowrap",
          children: "AI \uB3C4\uC6B0\uBBF8"
        }),
        i.jsx(un, {
          value: se,
          onChange: De
        })
      ]
    }), Qt = se === "chat" ? i.jsx(Ho, {
      profiles: X,
      selectedProfileId: we,
      onSelectedProfileIdChange: _e,
      selectedProfile: x,
      model: C,
      onModelChange: Fe,
      systemPrompt: z,
      onSystemPromptChange: pe,
      requestOptions: B,
      onRequestOptionsChange: ge,
      messages: ve,
      draft: ye,
      onDraftChange: Oe,
      loading: Je,
      error: Qe,
      onSend: rt,
      onCancel: Ae,
      onClearMessages: ot
    }) : i.jsx(Ko, {
      ...to,
      enableImageDropZone: false
    }), oo = !!(f && p === "docked" && !U), ro = !!(f && p === "split" && A && !U), so = !!(f && p === "floating" && !$ && !O && !U), ao = !!(f && p === "floating" && ($ || O) && !U), en = O ? "AI (\uC0C8\uCC3D)" : "AI", io = O ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC", gt = i.jsx(cn, {
      className: "flex h-full min-h-0 flex-col",
      disabled: !f,
      onFilesDrop: qt,
      children: i.jsxs("div", {
        className: "flex h-full min-h-0 flex-col",
        role: "complementary",
        "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8",
        children: [
          i.jsxs("div", {
            className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40",
            children: [
              no,
              Zt
            ]
          }),
          i.jsx("div", {
            className: `min-h-0 flex-1 p-3 ${se === "chat" ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`,
            children: Qt
          })
        ]
      })
    }), lo = i.jsx("div", {
      className: "absolute inset-0 z-60 flex min-h-0 flex-col bg-white dark:bg-odp-surface",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "AI \uB3C4\uC6B0\uBBF8",
      children: gt
    });
    return i.jsxs(i.Fragment, {
      children: [
        U ? lo : null,
        oo ? i.jsx(jr, {
          open: true,
          onClose: Ce,
          children: gt
        }) : null,
        ro && A ? uo.createPortal(gt, A) : null,
        i.jsx(_t, {
          children: ao ? i.jsxs(Ot.div, {
            role: "button",
            tabIndex: 0,
            initial: {
              opacity: 0,
              scale: 0.85
            },
            animate: {
              opacity: 1,
              scale: 1
            },
            exit: {
              opacity: 0,
              scale: 0.85
            },
            transition: Mn,
            onPointerDown: (t) => Wt(t, O ? {} : {
              onTap: pt
            }),
            onTouchStart: (t) => Xt(t, O ? {} : {
              onTap: pt
            }),
            onKeyDown: (t) => {
              O || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), pt());
            },
            className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing",
            style: {
              left: nt.left,
              top: nt.top
            },
            title: io,
            "aria-label": en,
            children: [
              i.jsx(kt, {
                size: 14,
                "aria-hidden": true
              }),
              en
            ]
          }, "llm-assist-chip") : null
        }),
        i.jsx(_t, {
          children: so ? i.jsxs(Ot.div, {
            ref: Zn,
            initial: {
              opacity: 0,
              scale: 0.92
            },
            animate: {
              opacity: 1,
              scale: 1
            },
            exit: {
              opacity: 0,
              scale: 0.92
            },
            transition: Mn,
            className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center",
            style: nt,
            role: "dialog",
            "aria-modal": "false",
            "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8",
            children: [
              i.jsxs(cn, {
                className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg",
                disabled: !f,
                onFilesDrop: qt,
                children: [
                  i.jsxs("div", {
                    className: "flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40",
                    onPointerDown: (t) => Wt(t),
                    onTouchStart: (t) => Xt(t),
                    children: [
                      i.jsxs("div", {
                        className: "flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100",
                        children: [
                          i.jsx(Yo, {
                            size: 16,
                            className: "shrink-0 opacity-60",
                            "aria-hidden": true
                          }),
                          i.jsx(kt, {
                            size: 16,
                            className: "shrink-0",
                            "aria-hidden": true
                          }),
                          i.jsx("span", {
                            className: "whitespace-nowrap",
                            children: "AI \uB3C4\uC6B0\uBBF8"
                          }),
                          i.jsx(un, {
                            value: se,
                            onChange: De
                          })
                        ]
                      }),
                      Zt
                    ]
                  }),
                  i.jsx("div", {
                    className: `min-h-0 flex-1 p-3 ${se === "chat" ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`,
                    children: Qt
                  })
                ]
              }),
              i.jsx("div", {
                role: "separator",
                "aria-orientation": "vertical",
                "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC67C\uCABD)",
                className: "absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!",
                onPointerDown: (t) => Gt("w", t)
              }),
              i.jsx("div", {
                role: "separator",
                "aria-orientation": "vertical",
                "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC624\uB978\uCABD)",
                className: "absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!",
                onPointerDown: (t) => Gt("e", t)
              }),
              i.jsx("div", {
                role: "separator",
                "aria-orientation": "horizontal",
                "aria-label": "\uD06C\uAE30 \uC870\uC808",
                className: "absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!",
                onPointerDown: (t) => $t("sw", t)
              }),
              i.jsx("div", {
                role: "separator",
                "aria-orientation": "horizontal",
                "aria-label": "\uD06C\uAE30 \uC870\uC808",
                className: "absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!",
                onPointerDown: (t) => $t("se", t)
              })
            ]
          }, "llm-assist-floating") : null
        })
      ]
    });
  };
});
export {
  __tla,
  As as default
};
