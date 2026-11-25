const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/exaoneTabularClient-1t-AQgGq.js","assets/index-DD9YmsNw.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-lucide-Bo8me5Pj.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-radix-ClWfNC7b.js","assets/index-B8oPjCtC.css"])))=>i.map(i=>d[i]);
import { _ as $r } from "./vendor-aws-hJDgVEKM.js";
import { r, j as c, a as Gr, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { de as Jr, df as dn, dg as Zr, N as Qr, T as eo, dh as to, di as no, dj as Rn, dk as ro, dl as oo, dm as so, bQ as ao, bS as io, dn as Ht, dp as lo, g as Wt, w as co, e as In, W as Kt, dq as uo, dr as Ut, ds as Nn, dt as fo, du as Dn, dv as _n, dw as Xt, dx as mo, dy as ho, dz as Fn, dA as On, dB as po, dC as jn, s as Ae, k as go, bg as zn, bu as qt, dD as Bn, L as Vn, h as Yt, V as xo, be as Ze, x as bo, y as vo, aH as wo, dE as yo, i as Ao, bk as Eo, bm as ko, dF as Co, dG as Lo, dH as To, dI as So, __tla as __tla_1 } from "./index-DD9YmsNw.js";
import { i as Po, g as Mo, __tla as __tla_2 } from "./geminiClient-B6xcTe0y.js";
import { L as Hn, d as Qe, i as Wn, g as Kn, n as $t } from "./openaiCompatibleClient-j-YmhId7.js";
import { g as Ro } from "./appStatusBar-COMHAiNk.js";
import { E as Io, S as No, C as Do } from "./vendor-codemirror-V7b8BJE-.js";
import { i as _o } from "./previewMirrorEdit-B5g7SXFK.js";
import { u as Fo } from "./LlamaCppModelSelect-KJfGiYJy.js";
import { j as Oo, l as jo, k as zo, m as Gt, n as Bo, o as Un, q as Xn, r as Vo, t as Ho, u as Wo, L as qn, e as Yn, v as Ko, f as Uo, g as Xo, w as $n, x as qo, h as Gn, __tla as __tla_3 } from "./llmAssistUiMode-CdoMBufQ.js";
import { e as Jn, __tla as __tla_4 } from "./bootSplash-Z2krRgC9.js";
import { g as Yo } from "./mlxVlmGenerateClient-C2kTyS29.js";
import { a6 as $o, y as Go, a7 as fr, a8 as mr, b as hr, C as Jo, S as Jt, a9 as Zo, aa as Qo, ab as es, X as ts } from "./vendor-lucide-Bo8me5Pj.js";
import { A as sn, m as an } from "./vendor-motion-Bv-XITR_.js";
import { M as ns, w as pr, x as gr, N as rs, y as xr, z as br, A as vr, O as os, Q as ss, U as as, v as is } from "./vendor-radix-ClWfNC7b.js";
import { r as Zn, n as Qn } from "./llmAssistImages-DG7rjEWr.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-google-genai-BsvcYwA0.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./OpenAiCompatibleModelSelect-BO8AnKoT.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./useLazyMermaidRender-BEGREvhj.js";
import { __tla as __tla_5 } from "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./ImageLightboxDownloadButton-CcDlq4ds.js";
import "./Kbd-Cnuyx3cZ.js";
import "./downloadImageSrc-Bt2pxoWn.js";
let Ma;
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
  const fn = "s3haim-llm-modal-position", wr = "s3haim-llm-modal-hidden", ls = 420, ln = 280, cn = 240, cs = 560, yr = 44, Zt = {
    leftVw: 55,
    topVh: 12
  };
  function us() {
    try {
      const n = localStorage.getItem(fn);
      if (!n) return {
        ...Zt
      };
      const o = JSON.parse(n), i = Number(o == null ? void 0 : o.leftVw), s = Number(o == null ? void 0 : o.topVh);
      return !Number.isFinite(i) || !Number.isFinite(s) ? {
        ...Zt
      } : {
        leftVw: Math.min(95, Math.max(0, i)),
        topVh: Math.min(95, Math.max(0, s))
      };
    } catch {
      return {
        ...Zt
      };
    }
  }
  function Qt(n) {
    const o = window.innerWidth || 1, i = window.innerHeight || 1, s = us(), f = Math.min(ls, Math.max(ln, n.width - 16)), d = Math.min(yr + cs, Math.max(cn, n.height - 16)), m = {
      leftPx: s.leftVw / 100 * o,
      topPx: s.topVh / 100 * i,
      widthPx: f,
      heightPx: d
    };
    return xe(m, n);
  }
  function xe(n, o) {
    const i = Math.max(ln, o.width), s = Math.max(cn, o.height), f = Math.min(i, Math.max(ln, n.widthPx)), d = Math.min(s, Math.max(cn, n.heightPx)), m = o.right - f, u = o.bottom - yr, L = Math.min(Math.max(o.left, n.leftPx), Math.max(o.left, m)), x = Math.min(Math.max(o.top, n.topPx), Math.max(o.top, u));
    return {
      leftPx: Math.round(L),
      topPx: Math.round(x),
      widthPx: Math.round(f),
      heightPx: Math.round(d)
    };
  }
  function ds(n) {
    const o = n ?? {
      left: 8,
      top: 8,
      right: window.innerWidth - 8,
      bottom: window.innerHeight - 8,
      width: window.innerWidth - 16,
      height: window.innerHeight - 16
    };
    try {
      const i = localStorage.getItem(fn);
      if (!i) return Qt(o);
      const s = JSON.parse(i);
      return Number.isFinite(Number(s == null ? void 0 : s.leftPx)) && Number.isFinite(Number(s == null ? void 0 : s.topPx)) && Number.isFinite(Number(s == null ? void 0 : s.widthPx)) && Number.isFinite(Number(s == null ? void 0 : s.heightPx)) ? xe({
        leftPx: Number(s.leftPx),
        topPx: Number(s.topPx),
        widthPx: Number(s.widthPx),
        heightPx: Number(s.heightPx)
      }, o) : Qt(o);
    } catch {
      return Qt(o);
    }
  }
  function fs(n, o) {
    const i = o ?? {
      left: 8,
      top: 8,
      right: window.innerWidth - 8,
      bottom: window.innerHeight - 8,
      width: window.innerWidth - 16,
      height: window.innerHeight - 16
    }, s = xe(n, i);
    try {
      localStorage.setItem(fn, JSON.stringify(s));
    } catch {
    }
  }
  function ms() {
    try {
      return localStorage.getItem(wr) === "1";
    } catch {
      return false;
    }
  }
  function en(n) {
    try {
      localStorage.setItem(wr, n ? "1" : "0");
    } catch {
    }
  }
  const hs = "[data-app-editor-navbar]", ps = 56;
  function Ar() {
    const n = document.querySelector(hs);
    return n instanceof HTMLElement ? n : null;
  }
  function gs() {
    const n = Ar();
    return n ? n.getBoundingClientRect().bottom : ps;
  }
  function xs(n) {
    const o = n == null ? void 0 : n.current, i = (o == null ? void 0 : o.value) ?? o ?? null;
    return i && typeof i == "object" && "root" in i && i.root instanceof Element ? i.root : null;
  }
  function er(n) {
    const i = gs(), s = Ro(), f = Math.max(i + 1, s), d = {
      left: 8,
      top: Math.max(8, i),
      right: Math.max(8, window.innerWidth - 8),
      bottom: f,
      width: Math.max(0, window.innerWidth - 16),
      height: Math.max(0, f - Math.max(8, i))
    }, m = xs(n);
    if (!m) return d;
    const u = m.getBoundingClientRect(), L = Ar(), x = L ? L.getBoundingClientRect().bottom : Math.max(u.top, i), T = u.left, P = u.right;
    return {
      left: T,
      top: x,
      right: P,
      bottom: f,
      width: Math.max(0, P - T),
      height: Math.max(0, f - x)
    };
  }
  const tr = 5, nr = "llm-assist-modal-resize-cursor-style", tt = "llm-assist-modal-corner-resize";
  function bs() {
    if (document.getElementById(nr)) return;
    const n = document.createElement("style");
    n.id = nr, n.textContent = `
    html.${tt},
    html.${tt} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(n);
  }
  function vs(n) {
    return n === "e" || n === "w" ? "ew-resize" : n === "se" ? "nwse-resize" : "nesw-resize";
  }
  function ws(n) {
    bs();
    const o = vs(n);
    document.documentElement.style.setProperty("--llm-assist-resize-cursor", o), document.documentElement.classList.add(tt), document.body.style.userSelect = "none";
  }
  function ys() {
    document.documentElement.classList.remove(tt), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
  }
  function As(n, o) {
    return n.leftPx === o.leftPx && n.topPx === o.topPx && n.widthPx === o.widthPx && n.heightPx === o.heightPx;
  }
  function Es(n, { enabled: o = true } = {}) {
    const i = r.useRef(er(n)), [s, f] = r.useState(() => ds(i.current)), d = r.useRef(null), m = r.useRef({
      active: false,
      startX: 0,
      startY: 0,
      startLayout: s
    }), u = r.useRef(null), L = r.useCallback(() => {
      const k = er(n);
      i.current = k, f((y) => {
        const g = xe(y, k);
        return As(y, g) ? y : g;
      });
    }, [
      n
    ]);
    r.useEffect(() => {
      var _a, _b, _c;
      if (!o) return;
      L();
      let k = 0;
      const y = () => {
        k || (k = requestAnimationFrame(() => {
          k = 0, L();
        }));
      };
      window.addEventListener("resize", y);
      const g = ((_b = (_a = n == null ? void 0 : n.current) == null ? void 0 : _a.value) == null ? void 0 : _b.root) ?? ((_c = n == null ? void 0 : n.current) == null ? void 0 : _c.root) ?? null;
      let S = null;
      if (typeof ResizeObserver < "u") {
        if (S = new ResizeObserver(y), g) {
          S.observe(g);
          const I = g.querySelector(".md-editor-toolbar-wrapper") || g.querySelector(".md-editor-toolbar");
          I && S.observe(I);
        }
        const D = document.querySelector("[data-app-editor-navbar]");
        D && S.observe(D);
        const A = document.querySelector("[data-app-status-bar]");
        A && S.observe(A);
      }
      return () => {
        cancelAnimationFrame(k), window.removeEventListener("resize", y), S == null ? void 0 : S.disconnect();
      };
    }, [
      o,
      n,
      L
    ]);
    const x = r.useCallback((k) => {
      const y = xe(k, i.current);
      return fs(y, i.current), y;
    }, []), T = r.useCallback((k, y) => {
      const g = m.current;
      if (!g.active) return;
      const S = k - g.startX, D = y - g.startY;
      f(xe({
        ...g.startLayout,
        leftPx: g.startLayout.leftPx + S,
        topPx: g.startLayout.topPx + D
      }, i.current));
    }, []), P = r.useCallback((k, { onTap: y } = {}) => {
      if (k.pointerType === "touch" || k.button !== 0) return;
      k.preventDefault();
      const g = k.clientX, S = k.clientY;
      let D = false;
      m.current = {
        active: true,
        startX: g,
        startY: S,
        startLayout: s
      };
      const A = (M) => {
        m.current.active && (Math.hypot(M.clientX - g, M.clientY - S) > tr && (D = true), T(M.clientX, M.clientY));
      }, I = () => {
        m.current.active && (m.current.active = false, document.removeEventListener("pointermove", A), document.removeEventListener("pointerup", I), f((M) => x(M)), D || (y == null ? void 0 : y()));
      };
      document.addEventListener("pointermove", A), document.addEventListener("pointerup", I);
    }, [
      T,
      s,
      x
    ]), v = r.useCallback((k, { onTap: y } = {}) => {
      const g = k.changedTouches;
      if (!(g == null ? void 0 : g.length)) return;
      const S = g[0];
      if (!S) return;
      const D = S.identifier, A = S.clientX, I = S.clientY;
      k.preventDefault();
      let M = false;
      m.current = {
        active: true,
        startX: A,
        startY: I,
        startLayout: s,
        touchIdentifier: D
      };
      const p = (U) => {
        if (!m.current.active) return;
        const te = Array.from(U.touches).find((me) => me.identifier === D);
        te && (Math.hypot(te.clientX - A, te.clientY - I) > tr && (M = true), T(te.clientX, te.clientY), U.preventDefault());
      }, H = () => {
        m.current.active && (m.current.active = false, document.removeEventListener("touchmove", p), document.removeEventListener("touchend", _), document.removeEventListener("touchcancel", _), f((U) => x(U)), M || (y == null ? void 0 : y()));
      }, _ = (U) => {
        !m.current.active || !Array.from(U.changedTouches).some((me) => me.identifier === D) || H();
      };
      document.addEventListener("touchmove", p, {
        passive: false
      }), document.addEventListener("touchend", _, {
        passive: false
      }), document.addEventListener("touchcancel", _, {
        passive: false
      });
    }, [
      T,
      s,
      x
    ]), R = r.useCallback((k, y) => {
      const g = u.current;
      if (!g) return;
      const S = k - g.startX, D = y - g.startY, A = g.startLayout;
      let I;
      g.corner === "se" ? I = {
        leftPx: A.leftPx,
        topPx: A.topPx,
        widthPx: A.widthPx + S,
        heightPx: A.heightPx + D
      } : g.corner === "sw" ? I = {
        leftPx: A.leftPx + S,
        topPx: A.topPx,
        widthPx: A.widthPx - S,
        heightPx: A.heightPx + D
      } : g.corner === "e" ? I = {
        leftPx: A.leftPx,
        topPx: A.topPx,
        widthPx: A.widthPx + S,
        heightPx: A.heightPx
      } : I = {
        leftPx: A.leftPx + S,
        topPx: A.topPx,
        widthPx: A.widthPx - S,
        heightPx: A.heightPx
      }, f(xe(I, i.current));
    }, []), w = r.useCallback((k, y) => {
      if (y.button !== 0) return;
      y.preventDefault(), y.stopPropagation(), u.current = {
        corner: k,
        startX: y.clientX,
        startY: y.clientY,
        startLayout: s
      }, ws(k);
      const g = y.currentTarget;
      g instanceof HTMLElement && typeof g.setPointerCapture == "function" && g.setPointerCapture(y.pointerId);
      const S = () => {
        u.current = null, ys(), document.removeEventListener("pointermove", D), document.removeEventListener("pointerup", A), document.removeEventListener("pointercancel", A);
      }, D = (I) => {
        I.preventDefault(), R(I.clientX, I.clientY);
      }, A = () => {
        u.current && (S(), f((I) => x(I)));
      };
      document.addEventListener("pointermove", D, {
        passive: false
      }), document.addEventListener("pointerup", A), document.addEventListener("pointercancel", A);
    }, [
      R,
      s,
      x
    ]), V = r.useCallback((k, y) => w(k, y), [
      w
    ]), K = {
      left: s.leftPx,
      top: s.topPx,
      width: s.widthPx,
      height: s.heightPx
    };
    return {
      layout: s,
      panelRef: d,
      panelStyle: K,
      startPositionDrag: P,
      startPositionTouchDrag: v,
      startCornerResize: V,
      startEdgeResize: w,
      refreshBounds: L
    };
  }
  function rr(n) {
    if (!n || typeof n != "object") return false;
    const o = n;
    return typeof o.getEditorView == "function" || typeof o.getSelectedText == "function";
  }
  function Er(n) {
    const o = n == null ? void 0 : n.current;
    if (!o || typeof o != "object") return null;
    if (rr(o)) return o;
    const i = o.value;
    return rr(i) ? i : null;
  }
  function kr(n) {
    return Er(n);
  }
  const ks = [
    50,
    200,
    500,
    1e3
  ];
  function Cs(n, o = null) {
    if (o == null ? void 0 : o.dom) return o.dom.closest(".md-editor");
    const i = kr(n);
    return typeof Element < "u" && (i == null ? void 0 : i.root) instanceof Element ? i.root : null;
  }
  function Ls(n, { view: o = null, documentKey: i = null } = {}) {
    var _a;
    const s = o ?? rt(n, {
      documentKey: i
    }).view, f = Cs(n, s);
    return _o(f) ? true : ((_a = dn(s, i)) == null ? void 0 : _a.everFocused) ? false : (s == null ? void 0 : s.state, true);
  }
  function Ts(n, o) {
    return n ? n.endsWith(`
`) ? o : `
${o}` : o;
  }
  function Ss(n, o) {
    if (!n) return o;
    const i = n.endsWith(`
`) ? "" : `
`;
    return `${n}${i}${o}`;
  }
  function nt(n, o, i) {
    const s = Math.max(0, Math.min(o, n)), f = Math.max(s, Math.min(i, n));
    return {
      from: s,
      to: f
    };
  }
  function Ps(n, o, i, s, f) {
    if (typeof f != "function") return false;
    const d = nt(n.length, o, i), m = `${n.slice(0, d.from)}${s}${n.slice(d.to)}`;
    return f(m), true;
  }
  function et({ editorRef: n, result: o, onChange: i, getMarkdown: s, forceAppendAtEnd: f = false, documentKey: d = null }) {
    var _a, _b, _c;
    const m = rt(n, {
      documentKey: d
    }), { view: u } = m;
    if (f || Ls(n, {
      view: u,
      documentKey: d
    })) {
      const w = ((_c = (_b = (_a = u == null ? void 0 : u.state) == null ? void 0 : _a.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? (typeof s == "function" ? s() : ""), V = Ts(w, o);
      if (u == null ? void 0 : u.state) {
        const K = w.length;
        return or(u, K, K, V, i);
      }
      return typeof i == "function" ? (i(Ss(w, o)), true) : false;
    }
    const x = dn(u, d);
    let T = m.from, P = m.to;
    if ((!(u == null ? void 0 : u.hasFocus) && (x == null ? void 0 : x.everFocused) || T === P && (x == null ? void 0 : x.everFocused)) && (T = x.from, P = x.to), !(x == null ? void 0 : x.everFocused) && T === P && !m.text.trim()) return false;
    if (u == null ? void 0 : u.state) {
      const w = u.state.doc.length, V = nt(w, T, P);
      return or(u, V.from, V.to, o, i);
    }
    const R = typeof s == "function" ? s() : "";
    return Ps(R, T, P, o, i);
  }
  function Ms(n, o, i) {
    var _a, _b;
    const s = n.state.selection.main, f = !!n.hasFocus, d = dn(n, i);
    if (f) {
      const L = n.state.doc.sliceString(s.from, s.to);
      if (L) return {
        text: L,
        from: s.from,
        to: s.to,
        view: n
      };
      if (d == null ? void 0 : d.everFocused) {
        const T = n.state.doc.length, { from: P, to: v } = nt(T, d.from, d.to);
        return {
          text: n.state.doc.sliceString(P, v),
          from: P,
          to: v,
          view: n
        };
      }
      const x = ((_a = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _a.call(o)) ?? "";
      return x ? {
        text: x,
        from: s.from,
        to: s.to,
        view: n
      } : {
        text: "",
        from: s.from,
        to: s.to,
        view: n
      };
    }
    if (d == null ? void 0 : d.everFocused) {
      const L = n.state.doc.length, { from: x, to: T } = nt(L, d.from, d.to);
      return {
        text: n.state.doc.sliceString(x, T),
        from: x,
        to: T,
        view: n
      };
    }
    const m = n.state.doc.sliceString(s.from, s.to);
    if (m) return {
      text: m,
      from: s.from,
      to: s.to,
      view: n
    };
    const u = ((_b = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _b.call(o)) ?? "";
    return u ? {
      text: u,
      from: s.from,
      to: s.to,
      view: n
    } : {
      text: m,
      from: s.from,
      to: s.to,
      view: n
    };
  }
  function rt(n, o) {
    var _a, _b, _c;
    const i = (o == null ? void 0 : o.documentKey) ?? null, s = ((_a = o == null ? void 0 : o.getEditorApi) == null ? void 0 : _a.call(o)) ?? Er(n), f = ((_b = s == null ? void 0 : s.getEditorView) == null ? void 0 : _b.call(s)) ?? null;
    if (f == null ? void 0 : f.state) return Ms(f, s, i);
    const d = Jr(i);
    return (d == null ? void 0 : d.everFocused) ? {
      text: "",
      from: d.from,
      to: d.to,
      view: null
    } : {
      text: ((_c = s == null ? void 0 : s.getSelectedText) == null ? void 0 : _c.call(s)) ?? "",
      from: 0,
      to: 0,
      view: null
    };
  }
  function Rs(n) {
    var _a, _b;
    return ((_b = (_a = kr(n)) == null ? void 0 : _a.getEditorView) == null ? void 0 : _b.call(_a)) ?? null;
  }
  function Is(n, o, i) {
    let s = false, f = null, d = null;
    const m = [], u = (i == null ? void 0 : i.documentKey) ?? null, L = () => {
      s || o(rt(n, {
        documentKey: u
      }));
    }, x = () => {
      d == null ? void 0 : d(), d = null, f = null;
    };
    let T = null, P = false;
    const v = () => {
      if (s) return true;
      const R = Rs(n);
      if (!R || R === f) return !!R;
      x(), f = R, P = false, T || (T = new Do());
      const w = T, V = Io.updateListener.of((K) => {
        K.selectionSet && L();
      });
      if (P) try {
        R.dispatch({
          effects: w.reconfigure(V)
        });
      } catch {
        P = false;
      }
      if (!P) try {
        R.dispatch({
          effects: No.appendConfig.of(w.of(V))
        }), P = true;
      } catch {
        return L(), true;
      }
      return d = () => {
        if (P) {
          try {
            R.dispatch({
              effects: w.reconfigure([])
            });
          } catch {
          }
          P = false;
        }
      }, L(), true;
    };
    if (!v()) for (const R of ks) m.push(setTimeout(() => {
      s || v();
    }, R));
    return () => {
      s = true;
      for (const R of m) clearTimeout(R);
      x();
    };
  }
  function or(n, o, i, s, f) {
    var _a;
    return (n == null ? void 0 : n.state) ? (n.dispatch({
      changes: {
        from: o,
        to: i,
        insert: s
      },
      selection: {
        anchor: o + s.length
      }
    }), (_a = n.focus) == null ? void 0 : _a.call(n), f == null ? void 0 : f(n.state.doc.toString()), true) : false;
  }
  function Ns({ enabled: n, onAdd: o }) {
    const [i, s] = r.useState(null);
    if (r.useEffect(() => {
      if (!n) {
        s(null);
        return;
      }
      let m = 0;
      const u = () => {
        cancelAnimationFrame(m), m = requestAnimationFrame(() => {
          s(Zr());
        });
      };
      return u(), document.addEventListener("selectionchange", u), window.addEventListener("scroll", u, true), window.addEventListener("resize", u), () => {
        cancelAnimationFrame(m), document.removeEventListener("selectionchange", u), window.removeEventListener("scroll", u, true), window.removeEventListener("resize", u);
      };
    }, [
      n
    ]), !n || !i) return null;
    const f = Math.max(8, i.top - 36), d = Math.min(window.innerWidth - 120, Math.max(8, i.left + i.width / 2 - 56));
    return c.jsxs("button", {
      type: "button",
      className: "fixed z-100060 inline-flex items-center gap-1 rounded-full border border-violet-400 bg-violet-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg hover:bg-violet-700",
      style: {
        top: f,
        left: d
      },
      onMouseDown: (m) => {
        m.preventDefault(), m.stopPropagation();
      },
      onClick: () => o(i.text),
      children: [
        c.jsx($o, {
          size: 12,
          "aria-hidden": true
        }),
        "\uCC44\uD305\uC5D0 \uCD94\uAC00"
      ]
    });
  }
  const Ds = 520, _s = 12, sr = 80, ar = 300, Fs = 180, Os = eo, js = [
    0.4,
    0,
    0.2,
    1
  ];
  function tn(n) {
    return typeof window > "u" ? n * 5 : window.innerWidth * n / 100;
  }
  function ir(n) {
    var _a;
    return n ? n.closest("[data-llm-assist-layout-root]") || ((_a = n.parentElement) == null ? void 0 : _a.parentElement) || n.parentElement : null;
  }
  function zs({ open: n, onClose: o, children: i, className: s = "" }) {
    const f = r.useRef(null), [d, m] = r.useState(() => Math.max(ar, Math.floor(tn(sr)))), u = Math.max(1, Math.floor(tn(_s)));
    r.useEffect(() => {
      if (!n) return;
      const R = () => {
        var _a;
        const g = (((_a = ir(f.current)) == null ? void 0 : _a.clientWidth) ?? window.innerWidth) - Fs, S = Math.max(ar, Math.floor(tn(sr)));
        m(Math.max(u, Math.min(S, g)));
      };
      R();
      const w = requestAnimationFrame(R);
      window.addEventListener("resize", R);
      let V = null;
      const K = ir(f.current);
      return K && typeof ResizeObserver < "u" && (V = new ResizeObserver(R), V.observe(K)), () => {
        cancelAnimationFrame(w), window.removeEventListener("resize", R), V == null ? void 0 : V.disconnect();
      };
    }, [
      u,
      n
    ]);
    const L = Math.max(1, Math.floor(u / 3)), { width: x, isResizing: T, handleProps: P } = Qr({
      storageKey: "s3haim_llm_assist_dock_width",
      defaultWidth: Ds,
      minWidth: u,
      maxWidth: Math.max(d, u),
      edge: "right",
      collapseBelowWidth: L,
      onCollapseBelowMin: typeof o == "function" ? o : void 0
    }), v = Math.min(x, d);
    return c.jsx(sn, {
      initial: false,
      children: n ? c.jsx(an.div, {
        className: "relative h-full min-h-0 shrink-0 overflow-hidden",
        initial: {
          width: 0
        },
        animate: {
          width: v
        },
        exit: {
          width: 0
        },
        transition: T ? {
          duration: 0
        } : {
          duration: 0.28,
          ease: js
        },
        children: c.jsxs("div", {
          ref: f,
          className: `relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${s}`,
          style: {
            width: v
          },
          children: [
            c.jsx(Os, {
              handleProps: {
                ...P,
                "aria-valuenow": Math.round(v),
                "aria-valuemax": Math.round(d)
              },
              isResizing: T,
              edge: "left",
              visibleOnHover: true,
              label: "AI \uB3C4\uC6B0\uBBF8 \uB108\uBE44 \uC870\uC808"
            }),
            c.jsx("div", {
              className: "flex min-h-0 min-w-0 flex-1 flex-col",
              children: i
            })
          ]
        })
      }, "llm-assist-dock") : null
    });
  }
  const Bs = "inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", Vs = "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50", Hs = "z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
  function Ws(n) {
    return n === "docked" ? mr : n === "split" ? hr : fr;
  }
  function Ks({ presentation: n, onChange: o, splitEnabled: i = true }) {
    const s = Ws(n), f = [
      {
        value: "floating",
        label: "\uD50C\uB85C\uD305 \uCC3D",
        icon: fr
      },
      {
        value: "docked",
        label: "\uC6B0\uCE21\uC5D0 \uACE0\uC815",
        icon: mr
      },
      {
        value: "split",
        label: "\uC5D0\uC774\uC804\uD2B8 \uD0ED",
        icon: hr,
        disabled: !i
      }
    ];
    return c.jsxs(ns, {
      children: [
        c.jsxs(pr, {
          children: [
            c.jsx(gr, {
              asChild: true,
              children: c.jsx(rs, {
                asChild: true,
                children: c.jsxs("button", {
                  type: "button",
                  onPointerDown: (d) => d.stopPropagation(),
                  onTouchStart: (d) => d.stopPropagation(),
                  className: Bs,
                  "aria-label": "\uD45C\uC2DC \uBC29\uC2DD",
                  children: [
                    c.jsx(s, {
                      size: 15,
                      "aria-hidden": true
                    }),
                    c.jsx(Go, {
                      size: 12,
                      "aria-hidden": true,
                      className: "opacity-70"
                    })
                  ]
                })
              })
            }),
            c.jsx(xr, {
              children: c.jsxs(br, {
                side: "bottom",
                sideOffset: 6,
                className: "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50",
                children: [
                  "\uD45C\uC2DC \uBC29\uC2DD",
                  c.jsx(vr, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        }),
        c.jsx(os, {
          children: c.jsx(ss, {
            side: "bottom",
            align: "end",
            sideOffset: 4,
            className: Hs,
            onCloseAutoFocus: (d) => d.preventDefault(),
            children: f.map((d) => {
              const m = d.icon, u = n === d.value;
              return c.jsxs(as, {
                disabled: !!d.disabled,
                className: `${Vs} ${d.disabled ? "cursor-not-allowed opacity-40" : ""}`,
                onSelect: () => {
                  d.disabled || d.value === n || o(d.value);
                },
                children: [
                  c.jsx(m, {
                    size: 14,
                    className: "shrink-0 opacity-80",
                    "aria-hidden": true
                  }),
                  c.jsx("span", {
                    className: "min-w-0 flex-1",
                    children: d.label
                  }),
                  u ? c.jsx(Jo, {
                    size: 14,
                    className: "shrink-0 text-violet-600 dark:text-violet-300",
                    "aria-hidden": true
                  }) : null
                ]
              }, d.value);
            })
          })
        })
      ]
    });
  }
  const Cr = "s3haim-llm-assist-chat-threads", un = "s3haim-llm-assist-chat-active-thread", Lr = 40;
  function Us(n) {
    if (!n) return null;
    try {
      return JSON.parse(n);
    } catch {
      return null;
    }
  }
  function nn() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `thread-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
  function Xs(n) {
    if (!n || typeof n != "object") return null;
    const o = n;
    if (typeof o.id != "string" || !o.id) return null;
    const i = Array.isArray(o.messages) ? o.messages : [], s = typeof o.createdAt == "number" ? o.createdAt : Date.now(), f = typeof o.updatedAt == "number" ? o.updatedAt : s, d = typeof o.title == "string" && o.title.trim() ? o.title.trim() : Tr(i);
    return {
      id: o.id,
      title: d,
      messages: i,
      createdAt: s,
      updatedAt: f
    };
  }
  function Tr(n) {
    const o = n.find((s) => s.role === "user" && s.content.trim());
    if (!o) return "\uC0C8 \uB300\uD654";
    const i = o.content.trim().replace(/\s+/g, " ");
    return i.length > 40 ? `${i.slice(0, 40)}\u2026` : i;
  }
  function rn() {
    try {
      const n = Us(localStorage.getItem(Cr));
      return Array.isArray(n) ? n.map(Xs).filter((o) => o !== null).sort((o, i) => i.updatedAt - o.updatedAt) : [];
    } catch {
      return [];
    }
  }
  function lr(n) {
    try {
      const o = [
        ...n
      ].sort((i, s) => s.updatedAt - i.updatedAt).slice(0, Lr);
      localStorage.setItem(Cr, JSON.stringify(o));
    } catch {
    }
  }
  function cr() {
    try {
      const n = localStorage.getItem(un);
      return n && n.trim() ? n.trim() : null;
    } catch {
      return null;
    }
  }
  function Ve(n) {
    try {
      n ? localStorage.setItem(un, n) : localStorage.removeItem(un);
    } catch {
    }
  }
  function qs(n, o) {
    const i = n.filter((s) => s.id !== o.id);
    return i.unshift(o), i.slice(0, Lr);
  }
  function Ys(n, o) {
    return n.filter((i) => i.id !== o);
  }
  async function ur({ source: n, tabsState: o, getBackendForType: i }) {
    const s = String(n.storageType || "").trim(), f = String(n.path || "").replace(/\\/g, "/").replace(/^\/+/, "").trim();
    if (!s || !f) return null;
    const d = String(n.name || "").trim() || f.split("/").filter(Boolean).pop() || f;
    if (!to(d)) return null;
    if (o) try {
      const u = no(o, s, f);
      if (u && typeof u.editorContent == "string") {
        const { text: L } = Rn(u.editorContent);
        if (L.trim()) return {
          text: L,
          fileName: d
        };
      }
    } catch {
    }
    const m = (i == null ? void 0 : i(s)) ?? null;
    if (!(m == null ? void 0 : m.readText)) return null;
    try {
      const u = await m.readText(f), L = typeof u == "string" ? u : u && typeof u == "object" && typeof u.text == "string" ? u.text : "", { text: x } = Rn(L);
      return x.trim() ? {
        text: x,
        fileName: d
      } : null;
    } catch {
      return null;
    }
  }
  const $s = [
    0.4,
    0,
    0.2,
    1
  ], dr = {
    duration: 0.28,
    ease: $s
  }, Gs = "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", Js = "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
  function on({ label: n, onClick: o, disabled: i, children: s }) {
    return c.jsxs(pr, {
      children: [
        c.jsx(gr, {
          asChild: true,
          children: c.jsx("button", {
            type: "button",
            onPointerDown: (f) => f.stopPropagation(),
            onTouchStart: (f) => f.stopPropagation(),
            onClick: o,
            disabled: i,
            className: Gs,
            "aria-label": n,
            children: s
          })
        }),
        c.jsx(xr, {
          children: c.jsxs(br, {
            side: "bottom",
            sideOffset: 6,
            className: Js,
            children: [
              n,
              c.jsx(vr, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  Ma = function({ editorRef: n = null, onChange: o, getMarkdown: i, llmProviderProfiles: s, open: f, onOpenChange: d, theme: m = "light" }) {
    var _a, _b, _c;
    const u = ro(), L = oo(), x = so(), { getBackendForType: T } = ao(), { requestCreateFileWithContent: P } = io(), v = L ? L.open : !!f, R = L ? L.setOpen : d, w = (u == null ? void 0 : u.presentation) ?? "floating", V = u == null ? void 0 : u.setPresentation, K = u == null ? void 0 : u.openAsSplit, k = u == null ? void 0 : u.dockToRight, y = u == null ? void 0 : u.undockToFloating, g = u ? u.canInsertIntoDocument : !!n, S = !!(x == null ? void 0 : x.workspaceTabsEnabled), [D, A] = r.useState(() => Ht());
    r.useEffect(() => (A(Ht()), lo(() => {
      A(Ht());
    })), []);
    const I = r.useCallback((e) => {
      if (e === "split") {
        if (!S) return;
        K == null ? void 0 : K();
        return;
      }
      if (e === "docked") {
        k == null ? void 0 : k();
        return;
      }
      y == null ? void 0 : y();
    }, [
      S,
      K,
      k,
      y
    ]), M = ((_a = u == null ? void 0 : u.editorBridge) == null ? void 0 : _a.editorRef) ?? n, p = (u == null ? void 0 : u.editorBridge) ?? null, H = ((_b = u == null ? void 0 : u.editorBridge) == null ? void 0 : _b.onChange) ?? o, _ = ((_c = u == null ? void 0 : u.editorBridge) == null ? void 0 : _c.getMarkdown) ?? i, U = r.useMemo(() => Array.isArray(s) ? s : [], [
      s
    ]), [te, me] = r.useState(() => ms()), [X, be] = r.useState(false), [Ee, ke] = r.useState(""), [mn, ot] = r.useState({
      from: 0,
      to: 0
    }), [le, st] = r.useState([]), [re, He] = r.useState(""), [q, Ce] = r.useState(() => Wt()), [Y, Le] = r.useState(() => ({
      ...Hn
    })), [z, Z] = r.useState(""), [at, hn] = r.useState("text"), [it, pn] = r.useState(false), [lt, oe] = r.useState(""), [Te, Sr] = r.useState([]), [ct, We] = r.useState(""), [Se, Ke] = r.useState(""), [ce, Ue] = r.useState(null), [Pe, Xe, gn] = Fo(U), b = co(U, Pe), [F, ut] = r.useState(() => b ? In(b.id, b.kind) : ""), [ue, xn] = r.useState(() => Oo(Kt(F) ?? "classification")), [ae, Pr] = r.useState(() => jo()), [Me, bn] = r.useState(() => rn()), [$, qe] = r.useState(() => {
      var _a2;
      const e = cr(), t = rn();
      return e && t.some((a) => a.id === e) ? e : ((_a2 = t[0]) == null ? void 0 : _a2.id) ?? null;
    }), [N, de] = r.useState(() => {
      var _a2;
      const e = rn(), t = cr();
      return ((_a2 = e.find((l) => l.id === t) || e[0]) == null ? void 0 : _a2.messages) ?? [];
    }), [Re, ve] = r.useState(""), [Ie, ie] = r.useState([]), [dt, Mr] = r.useState(() => uo()), [he, pe] = r.useState([]), [ft, Ye] = r.useState(false), [mt, W] = r.useState(""), G = r.useRef(null), Q = r.useRef(false), Ne = r.useRef(null), ne = r.useRef(null), [ht, Rr] = r.useState(() => typeof window < "u" ? window.matchMedia(`(max-width: ${Ut}px)`).matches : false), [Ir, pt] = r.useState(false);
    r.useEffect(() => {
      const e = window.matchMedia(`(max-width: ${Ut}px)`), t = () => Rr(e.matches);
      return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
    }, []), r.useEffect(() => {
      if (!v) {
        pt(false);
        return;
      }
      const e = document.querySelector("[data-llm-assist-layout-root]");
      if (!e || typeof ResizeObserver > "u") {
        pt(ht);
        return;
      }
      const t = (l) => {
        pt(l > 0 && l <= Ut);
      };
      t(e.getBoundingClientRect().width);
      const a = new ResizeObserver((l) => {
        var _a2, _b2;
        const h = l[0];
        if (!h) return;
        const C = ((_b2 = (_a2 = h.borderBoxSize) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.inlineSize) ?? h.contentRect.width;
        t(C);
      });
      return a.observe(e), () => a.disconnect();
    }, [
      v,
      ht
    ]);
    const J = !!v && (ht || Ir) && (w === "docked" || w === "floating"), { panelRef: Nr, panelStyle: gt, startPositionDrag: vn, startPositionTouchDrag: wn, startCornerResize: yn, startEdgeResize: An, refreshBounds: En } = Es(M, {
      enabled: v && w === "floating" && !J
    }), ee = r.useCallback((e) => {
      Pr(e), zo(e);
    }, []), se = r.useCallback((e, t) => {
      if (!t) return;
      const a = Date.now();
      bn((l) => {
        const h = l.find((O) => O.id === t), C = {
          id: t,
          title: Tr(e),
          messages: e,
          createdAt: (h == null ? void 0 : h.createdAt) ?? a,
          updatedAt: a
        }, E = qs(l, C);
        return lr(E), E;
      }), Ve(t);
    }, []), De = r.useCallback((e) => {
      const t = typeof e == "string" ? Nn(p, e) : {
        ...Nn(p, e.text),
        ...e,
        text: String(e.text || "").trim()
      }, a = fo(t);
      a && (ee("chat"), ie((l) => l.some((h) => h.text === a.text && h.path === a.path && h.lineStart === a.lineStart && h.lineEnd === a.lineEnd && h.kind === a.kind) ? l : [
        ...l,
        a
      ]));
    }, [
      p,
      ee
    ]), kn = r.useCallback((e) => {
      ee("chat"), ie((t) => e.kind === "file" && e.path && t.some((a) => Dn(a, e.storageType || "", e.path || "")) ? t : [
        ...t,
        e
      ]);
    }, [
      ee
    ]), $e = r.useCallback(async (e) => {
      var _a2;
      const t = String(e.storageType || "").trim(), a = String(e.path || "").trim();
      if (!t || !a || e.nodeType && e.nodeType !== "file") return;
      const l = await ur({
        source: {
          storageType: t,
          path: a,
          ...e.name ? {
            name: e.name
          } : {}
        },
        tabsState: ((_a2 = x == null ? void 0 : x.workspaceTabsRef) == null ? void 0 : _a2.current) ?? (x == null ? void 0 : x.state) ?? null,
        getBackendForType: T
      });
      if (!l) {
        W("\uD14D\uC2A4\uD2B8 \uB178\uD2B8\uB9CC \uB808\uD37C\uB7F0\uC2A4\uB85C \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const h = _n({
        text: l.text,
        path: a,
        storageType: t,
        fileName: l.fileName
      });
      h && (W(""), kn(h));
    }, [
      kn,
      T,
      x
    ]), Cn = r.useCallback((e) => {
      (async () => {
        for (const t of e) await $e(t);
      })();
    }, [
      $e
    ]), Dr = r.useCallback(() => {
      var _a2;
      const e = (x == null ? void 0 : x.state) ? Xt(x.state) : null;
      if (!e) {
        W("\uCC38\uACE0\uD560 \uB178\uD2B8 \uD0ED\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const t = String(e.editedFileName || ((_a2 = e.currentFile) == null ? void 0 : _a2.name) || "").trim();
      $e({
        storageType: e.storageType,
        path: e.path,
        nodeType: "file",
        ...t ? {
          name: t
        } : {}
      });
    }, [
      $e,
      x
    ]), _r = r.useCallback((e) => {
      Mr(e), mo(e);
    }, []), Fr = r.useMemo(() => {
      var _a2;
      const e = (x == null ? void 0 : x.state) ? Xt(x.state) : null;
      if (!e) return null;
      const t = String(e.editedFileName || ((_a2 = e.currentFile) == null ? void 0 : _a2.name) || "").trim();
      return t || e.path.split("/").filter(Boolean).pop() || e.path;
    }, [
      x == null ? void 0 : x.state
    ]), Or = r.useCallback((e) => {
      ho(e);
    }, []);
    r.useEffect(() => {
      var _a2;
      return (_a2 = u == null ? void 0 : u.registerChatCaptureHandlers) == null ? void 0 : _a2.call(u, {
        addReference: De
      }), () => {
        var _a3;
        return (_a3 = u == null ? void 0 : u.registerChatCaptureHandlers) == null ? void 0 : _a3.call(u, null);
      };
    }, [
      u,
      De
    ]), r.useEffect(() => (Fn(Cn), () => Fn(null)), [
      Cn
    ]), r.useEffect(() => (On(!!(v && ae === "chat")), () => On(false)), [
      v,
      ae
    ]);
    const _e = r.useCallback(() => ({
      selectedText: Ee,
      selectionRange: mn,
      attachedImages: le,
      instruction: re,
      systemPrompt: q,
      requestOptions: Y,
      result: z,
      resultViewMode: at,
      loading: it,
      error: lt,
      templates: Te,
      selectedTemplateId: ct,
      templateName: Se,
      editingTemplateId: ce,
      profiles: U.map((e) => ({
        id: e.id,
        name: e.name,
        kind: e.kind,
        baseUrl: e.baseUrl
      })),
      selectedProfileId: Pe,
      model: F,
      theme: m,
      uiMode: ae,
      chatMessages: N,
      chatDraft: Re,
      chatLoading: ft,
      chatError: mt,
      chatReferences: Ie,
      chatImages: he,
      chatThreads: Me,
      activeThreadId: $,
      canInsertIntoDocument: g
    }), [
      Ee,
      mn,
      le,
      re,
      q,
      Y,
      z,
      at,
      it,
      lt,
      Te,
      ct,
      Se,
      ce,
      U,
      Pe,
      F,
      m,
      ae,
      N,
      Re,
      ft,
      mt,
      Ie,
      he,
      Me,
      $,
      g
    ]), Ge = r.useCallback(() => {
      if (Q.current) {
        Gt(null, _e());
        return;
      }
      const e = G.current;
      !e || e.closed || Gt(e, _e());
    }, [
      _e
    ]), we = r.useCallback(() => {
      const e = Q.current ? null : G.current;
      G.current = null, Q.current = false, Bo(e).finally(() => {
        be(false);
      });
    }, []), B = r.useCallback(() => {
      if (!M && !(p == null ? void 0 : p.getEditorApi) && !(p == null ? void 0 : p.getSelection) && !(p == null ? void 0 : p.getMarkdown)) return "";
      if (typeof (p == null ? void 0 : p.getSelection) == "function") {
        const { text: l, from: h, to: C } = p.getSelection();
        return ke((E) => E === l ? E : l), ot((E) => E.from === h && E.to === C ? E : {
          from: h,
          to: C
        }), l;
      }
      const { text: e, from: t, to: a } = rt(M, {
        ...(p == null ? void 0 : p.getEditorApi) ? {
          getEditorApi: p.getEditorApi
        } : {},
        ...(p == null ? void 0 : p.documentKey) ? {
          documentKey: p.documentKey
        } : {}
      });
      return ke((l) => l === e ? l : e), ot((l) => l.from === t && l.to === a ? l : {
        from: t,
        to: a
      }), e;
    }, [
      M,
      p
    ]), fe = r.useCallback(async () => {
      const e = await po();
      return Sr(e), e;
    }, []);
    r.useEffect(() => {
      if (!v) return;
      w !== "floating" && (me(false), en(false)), (w === "split" || w === "docked") && we(), oe(""), gn();
      let e = 0, t = 0, a = 0;
      e = requestAnimationFrame(() => {
        B();
      });
      const l = () => {
        En(), fe();
      }, h = window;
      return typeof h.requestIdleCallback == "function" ? t = h.requestIdleCallback(l) : a = window.setTimeout(l, 1), () => {
        cancelAnimationFrame(e), t && typeof h.cancelIdleCallback == "function" && h.cancelIdleCallback(t), a && window.clearTimeout(a);
      };
    }, [
      v,
      w,
      En,
      B,
      fe,
      gn,
      we
    ]), r.useEffect(() => {
      if (!(b == null ? void 0 : b.id) || !(b == null ? void 0 : b.kind)) {
        ut("");
        return;
      }
      ut(In(b.id, b.kind));
    }, [
      b == null ? void 0 : b.id,
      b == null ? void 0 : b.kind
    ]), r.useEffect(() => {
      const e = () => {
        We(""), Ue(null), fe();
      };
      return window.addEventListener(jn, e), () => {
        window.removeEventListener(jn, e);
      };
    }, [
      fe
    ]), r.useEffect(() => {
      v && B();
    }, [
      v,
      p,
      B
    ]), r.useEffect(() => {
      if (!v || X || w === "floating" && te) return;
      const e = ({ text: t, from: a, to: l }) => {
        ke((h) => h === t ? h : t), ot((h) => h.from === a && h.to === l ? h : {
          from: a,
          to: l
        });
      };
      if (typeof (p == null ? void 0 : p.subscribeSelection) == "function") return p.subscribeSelection(e);
      if (M) return Is(M, e, (p == null ? void 0 : p.documentKey) ? {
        documentKey: p.documentKey
      } : void 0);
    }, [
      v,
      te,
      X,
      M,
      w,
      p,
      p == null ? void 0 : p.documentKey,
      p == null ? void 0 : p.subscribeSelection
    ]), r.useEffect(() => {
      Ge();
    }, [
      Ge
    ]), r.useEffect(() => {
      if (!X) return;
      const e = setInterval(() => {
        Un(Q.current ? null : G.current).then((t) => {
          t || (G.current = null, Q.current = false, be(false));
        });
      }, 400);
      return () => clearInterval(e);
    }, [
      X
    ]), r.useEffect(() => {
      if (!v) {
        we();
        return;
      }
      const e = () => {
        Ko(Q.current ? null : G.current);
      };
      return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
    }, [
      v,
      we
    ]);
    const Je = r.useCallback((e) => {
      const t = String(e || "").trim();
      ut(t);
      const a = Kt(t);
      a && xn((l) => ({
        ...l,
        outputType: a === "classification" ? "class" : "point"
      })), b && (Ae(b.id, t), b.kind === go ? zn(t) : qt(t));
    }, [
      b
    ]), Fe = r.useCallback(() => {
      const e = Ne.current;
      !e || e.signal.aborted || e.abort(Qe());
    }, []), Oe = r.useCallback(() => {
      const e = ne.current;
      !e || e.signal.aborted || e.abort(Qe());
    }, []), xt = r.useCallback(() => {
      if (ne.current && (ne.current.abort(Qe()), ne.current = null), N.length > 0) {
        const t = $ || nn();
        se(N, t);
      }
      const e = nn();
      qe(e), Ve(e), de([]), ve(""), ie([]), pe([]), W(""), Ye(false), ee("chat");
    }, [
      N,
      $,
      se,
      ee
    ]), bt = r.useCallback((e) => {
      ne.current && (ne.current.abort(Qe()), ne.current = null), $ && N.length > 0 && se(N, $);
      const t = Me.find((a) => a.id === e);
      t && (qe(t.id), Ve(t.id), de(t.messages), ve(""), ie([]), pe([]), W(""), Ye(false), ee("chat"));
    }, [
      $,
      N,
      Me,
      se,
      ee
    ]), vt = r.useCallback((e) => {
      bn((t) => {
        const a = Ys(t, e);
        return lr(a), a;
      }), $ === e && (qe(null), Ve(null), de([]), ve(""), ie([]), pe([]));
    }, [
      $
    ]), jr = r.useCallback(async (e) => {
      if (!(e == null ? void 0 : e.length)) return;
      const t = await Zn(e);
      pe((a) => [
        ...a,
        ...t
      ]);
    }, []), wt = r.useCallback((e) => {
      pe((t) => t.filter((a) => a.id !== e));
    }, []), ye = r.useCallback(async (e) => {
      if (ne.current) return;
      if (!b) {
        W("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
        return;
      }
      if (!e.length) return;
      const t = $ || nn();
      $ || (qe(t), Ve(t));
      const a = Xn(), l = new AbortController();
      ne.current = l, W(""), Ye(true);
      const h = [
        ...e,
        {
          id: a,
          role: "assistant",
          content: ""
        }
      ];
      de(h), se(h, t);
      try {
        const C = await Vo({
          profile: b,
          model: F,
          messages: e,
          systemPrompt: q,
          requestOptions: Y,
          signal: l.signal,
          onChunk: (E) => {
            de((O) => {
              const j = O.map((ge) => ge.id === a ? {
                ...ge,
                content: E
              } : ge);
              return se(j, t), j;
            });
          }
        });
        de((E) => {
          const O = E.map((j) => j.id === a ? {
            ...j,
            content: C
          } : j);
          return se(O, t), O;
        });
      } catch (C) {
        if (Wn(C)) {
          W("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4."), de((E) => {
            const O = E.filter((j) => !(j.id === a && !j.content.trim()));
            return se(O, t), O;
          });
          return;
        }
        W(C instanceof Error ? C.message : "LLM \uCC44\uD305 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), de((E) => {
          const O = E.filter((j) => !(j.id === a && !j.content.trim()));
          return se(O, t), O;
        });
      } finally {
        ne.current === l && (ne.current = null, Ye(false));
      }
    }, [
      b,
      F,
      q,
      Y,
      $,
      se
    ]), yt = r.useCallback(async () => {
      var _a2;
      const e = Re.trim();
      let t = [
        ...Ie
      ];
      if (dt) {
        const h = (x == null ? void 0 : x.state) ?? null, C = h ? Xt(h) : null;
        if (C && !t.some((E) => Dn(E, C.storageType, C.path))) {
          const E = String(C.editedFileName || ((_a2 = C.currentFile) == null ? void 0 : _a2.name) || "").trim(), O = await ur({
            source: {
              storageType: C.storageType,
              path: C.path,
              ...E ? {
                name: E
              } : {}
            },
            tabsState: h,
            getBackendForType: T
          });
          if (O) {
            const j = _n({
              text: O.text,
              path: C.path,
              storageType: C.storageType,
              fileName: O.fileName
            });
            j && (t = [
              j,
              ...t
            ]);
          }
        }
      }
      if (!e && t.length === 0 && he.length === 0) return;
      const a = {
        id: Xn(),
        role: "user",
        content: e,
        ...t.length ? {
          references: t
        } : {},
        ...he.length ? {
          images: he
        } : {}
      }, l = [
        ...N,
        a
      ];
      ve(""), ie([]), pe([]), await ye(l);
    }, [
      Re,
      Ie,
      he,
      N,
      ye,
      dt,
      x,
      T
    ]), At = r.useCallback(async (e) => {
      const t = N.findIndex((h) => h.id === e);
      if (t < 0) return;
      const a = N[t];
      if (!a || a.role !== "user") return;
      const l = N.slice(0, t + 1);
      await ye(l);
    }, [
      N,
      ye
    ]), Et = r.useCallback(async (e) => {
      var _a2;
      const t = N.findIndex((C) => C.id === e);
      if (t < 0) return;
      const a = N[t];
      if (!a || a.role !== "assistant") return;
      let l = t - 1;
      for (; l >= 0 && ((_a2 = N[l]) == null ? void 0 : _a2.role) !== "user"; ) l -= 1;
      if (l < 0) return;
      const h = N.slice(0, l + 1);
      await ye(h);
    }, [
      N,
      ye
    ]), kt = r.useCallback(async (e) => {
      const t = e.role === "user" ? Ho(e) : e.content;
      if (!t.trim()) return;
      await Bn(t, {
        message: e.role === "user" ? "\uC694\uCCAD\uC744 \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4" : "\uC751\uB2F5\uC744 \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4"
      }) || W("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }, []), Ct = r.useCallback((e) => {
      if (!e.trim()) return;
      if (!g || !M && !_ && !(p == null ? void 0 : p.applyResult)) {
        W("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (p == null ? void 0 : p.applyResult) == "function" ? p.applyResult(e) : et({
        editorRef: M ?? {
          current: null
        },
        result: e,
        ...H ? {
          onChange: H
        } : {},
        ..._ ? {
          getMarkdown: _
        } : {},
        ...(p == null ? void 0 : p.documentKey) ? {
          documentKey: p.documentKey
        } : {}
      }))) {
        W("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      B();
    }, [
      g,
      M,
      _,
      p,
      H,
      B
    ]), Lt = r.useCallback((e) => {
      if (!e.trim()) return;
      if (!g || !M && !_ && !(p == null ? void 0 : p.applyResult)) {
        W("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (p == null ? void 0 : p.applyResult) == "function" ? p.applyResult(e, {
        forceAppendAtEnd: true
      }) : et({
        editorRef: M ?? {
          current: null
        },
        result: e,
        ...H ? {
          onChange: H
        } : {},
        ..._ ? {
          getMarkdown: _
        } : {},
        forceAppendAtEnd: true,
        ...(p == null ? void 0 : p.documentKey) ? {
          documentKey: p.documentKey
        } : {}
      }))) {
        W("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      B();
    }, [
      g,
      M,
      _,
      p,
      H,
      B
    ]), Tt = r.useCallback((e) => {
      e.trim() && P(e);
    }, [
      P
    ]), St = r.useCallback(async () => {
      if (Ne.current) return;
      const e = new AbortController();
      Ne.current = e, oe(""), Z(""), pn(true);
      try {
        const t = Ee;
        if (!b) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
        if (b.kind === Vn || b.kind === Yt) {
          if (b.kind === Yt && xo(F)) {
            const E = Kt(F);
            if (!E) throw new Error("\uC54C \uC218 \uC5C6\uB294 EXAONE Tabular \uBAA8\uB378\uC785\uB2C8\uB2E4.");
            if (!ue.trainFile) throw new Error("\uD559\uC2B5\uC6A9 CSV(train_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
            if (!ue.testFile) throw new Error("\uC608\uCE21\uC6A9 CSV(test_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
            Ae(b.id, F), qt(F);
            const { runExaoneTabularPredict: O } = await $r(async () => {
              const { runExaoneTabularPredict: ge } = await import("./exaoneTabularClient-1t-AQgGq.js");
              return {
                runExaoneTabularPredict: ge
              };
            }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])), j = await Ze(b.id, () => b.apiKey || "", async (ge) => {
              const Bt = ue.trainFile, Vt = ue.testFile;
              return (await O({
                apiKey: ge,
                task: E,
                trainFile: Bt,
                testFile: Vt,
                ...Bt.name ? {
                  trainFileName: Bt.name
                } : {},
                ...Vt.name ? {
                  testFileName: Vt.name
                } : {},
                targetColumn: ue.targetColumn,
                outputType: ue.outputType,
                signal: e.signal
              })).markdown;
            }, {
              missingKeyMessage: "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
            });
            Z(j);
            return;
          }
          const l = bo(b);
          if (!l) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
          Ae(b.id, F), qt(F);
          const h = b.kind === Yt ? "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." : "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694.", C = await Ze(b.id, () => b.apiKey || "", (E) => Kn({
            baseUrl: l,
            apiKey: E,
            model: F,
            instruction: re,
            systemPrompt: q,
            selectedText: t,
            images: le,
            requestOptions: Y,
            onChunk: Z,
            signal: e.signal
          }), {
            allowEmpty: b.kind === Vn,
            missingKeyMessage: h
          });
          Z(C);
          return;
        }
        if (b.kind === vo) {
          const l = wo(), h = await yo(l, {
            signal: e.signal
          }), C = (b.baseUrl || h.baseUrl || "").trim();
          if (!C) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
          const E = F.trim() || l.selectedModelId || h.models[0] || "";
          if (!E) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
          Ae(b.id, E);
          const O = await Ze(b.id, () => b.apiKey || l.apiKey || "no-key-required", (j) => Kn({
            baseUrl: C,
            apiKey: j,
            model: E,
            instruction: re,
            systemPrompt: q,
            selectedText: t,
            images: le,
            requestOptions: Y,
            onChunk: Z,
            signal: e.signal
          }), {
            allowEmpty: true,
            missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
          });
          Z(O);
          return;
        }
        if (b.kind === Ao) {
          const l = Eo(), h = await ko(l);
          if (!h.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
          const C = F.trim() || l.selectedModelId || h.models[0] || "";
          if (!C) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
          Ae(b.id, C);
          const E = await Yo({
            instruction: re,
            systemPrompt: q,
            selectedText: t,
            images: le,
            requestOptions: Y,
            onChunk: Z,
            signal: e.signal
          });
          Z(E);
          return;
        }
        if (Po(F)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
        Ae(b.id, F), zn(F);
        const a = await Ze(b.id, () => b.apiKey || "", (l) => Mo({
          apiKey: l,
          model: F,
          instruction: re,
          systemPrompt: q,
          selectedText: t,
          images: le,
          requestOptions: Y,
          onChunk: Z,
          signal: e.signal
        }), {
          missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
        });
        Z(a);
      } catch (t) {
        if (Wn(t)) {
          oe("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
          return;
        }
        oe(t instanceof Error ? t.message : "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        Ne.current === e && (Ne.current = null, pn(false));
      }
    }, [
      Ee,
      le,
      b,
      F,
      re,
      q,
      Y,
      ue
    ]), Pt = r.useCallback(() => {
      if (!z) return;
      if (!g || !M && !_ && !(p == null ? void 0 : p.applyResult)) {
        oe("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (p == null ? void 0 : p.applyResult) == "function" ? p.applyResult(z) : et({
        editorRef: M ?? {
          current: null
        },
        result: z,
        ...H ? {
          onChange: H
        } : {},
        ..._ ? {
          getMarkdown: _
        } : {},
        ...(p == null ? void 0 : p.documentKey) ? {
          documentKey: p.documentKey
        } : {}
      }))) {
        oe("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      B();
    }, [
      z,
      M,
      g,
      H,
      _,
      B,
      p
    ]), Mt = r.useCallback(() => {
      if (!z) return;
      if (!g || !M && !_ && !(p == null ? void 0 : p.applyResult)) {
        oe("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (p == null ? void 0 : p.applyResult) == "function" ? p.applyResult(z, {
        forceAppendAtEnd: true
      }) : et({
        editorRef: M ?? {
          current: null
        },
        result: z,
        ...H ? {
          onChange: H
        } : {},
        ..._ ? {
          getMarkdown: _
        } : {},
        forceAppendAtEnd: true,
        ...(p == null ? void 0 : p.documentKey) ? {
          documentKey: p.documentKey
        } : {}
      }))) {
        oe("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      B();
    }, [
      z,
      M,
      g,
      H,
      _,
      B,
      p
    ]), Rt = r.useCallback(async () => {
      if (!z) return;
      await Bn(z, {
        message: "\uACB0\uACFC\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4"
      }) || oe("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }, [
      z
    ]), It = r.useCallback(() => {
      z && P(z);
    }, [
      z,
      P
    ]), Nt = r.useCallback((e) => {
      We(e);
      const t = Te.find((a) => a.id === e);
      t && (He(t.instruction), Ce(typeof t.systemPrompt == "string" && t.systemPrompt.trim() ? t.systemPrompt : Wt()), Le($t(t.requestOptions)), Ke(t.name), Ue(t.id));
    }, [
      Te
    ]), Dt = r.useCallback(async () => {
      const e = Se.trim(), t = re.trim();
      if (!e || !t) {
        alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      try {
        const a = await Co({
          id: ce || Lo().id,
          name: e,
          instruction: t,
          systemPrompt: q.trim(),
          requestOptions: $t(Y),
          updatedAt: Date.now()
        });
        Ue(a.id), We(a.id), await fe();
      } catch (a) {
        alert(a instanceof Error ? a.message : "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      Se,
      re,
      q,
      Y,
      ce,
      fe
    ]), je = r.useCallback(() => {
      Ue(null), We(""), Ke(""), He(""), Ce(Wt()), Le({
        ...Hn
      });
    }, []), _t = r.useCallback(async () => {
      if (ce && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
        await To(ce), je(), await fe();
      } catch (e) {
        alert(e instanceof Error ? e.message : "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      ce,
      je,
      fe
    ]), ze = r.useCallback(async (e) => {
      e.length && st((t) => [
        ...t,
        ...e
      ]);
    }, []), Ft = r.useCallback((e) => {
      e && st((t) => t.filter((a) => a.id !== e));
    }, []), Ot = r.useCallback(() => {
      st([]);
    }, []), Ln = r.useCallback(async (e) => {
      try {
        const t = await Zn(e);
        await ze(t);
      } catch (t) {
        oe(t instanceof Error ? t.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      ze
    ]), Tn = r.useCallback(async (e, t = {}) => {
      switch (e) {
        case "refresh-selection":
          B();
          break;
        case "set-selected-text":
          ke(typeof t.value == "string" ? t.value : "");
          break;
        case "run":
          await St();
          break;
        case "cancel-run":
          Fe();
          break;
        case "apply-result":
          Pt();
          break;
        case "append-result":
          Mt();
          break;
        case "copy-result":
          Rt();
          break;
        case "create-note-from-result":
          It();
          break;
        case "set-instruction":
          He(typeof t.value == "string" ? t.value : "");
          break;
        case "set-system-prompt":
          Ce(typeof t.value == "string" ? t.value : "");
          break;
        case "set-request-options":
          Le($t(t.value));
          break;
        case "set-result":
          Z(typeof t.value == "string" ? t.value : "");
          break;
        case "set-model":
          typeof t.value == "string" && Je(t.value);
          break;
        case "set-llm-profile-id":
          typeof t.value == "string" && Xe(t.value);
          break;
        case "load-template":
          Nt(String(t.id ?? ""));
          break;
        case "save-template":
          await Dt();
          break;
        case "new-template":
          je();
          break;
        case "delete-template":
          await _t();
          break;
        case "set-template-name":
          Ke(typeof t.value == "string" ? t.value : "");
          break;
        case "set-result-view-mode":
          (t.value === "preview" || t.value === "text") && hn(t.value);
          break;
        case "add-images": {
          const a = (Array.isArray(t.images) ? t.images : []).map(Qn).filter((l) => l !== null);
          a.length && await ze(a);
          break;
        }
        case "remove-image":
          Ft(String(t.id ?? ""));
          break;
        case "clear-images":
          Ot();
          break;
        case "set-ui-mode":
          (t.value === "edit" || t.value === "chat") && ee(t.value);
          break;
        case "set-chat-draft":
          ve(typeof t.value == "string" ? t.value : "");
          break;
        case "send-chat":
          await yt();
          break;
        case "cancel-chat":
          Oe();
          break;
        case "resend-chat-message":
          typeof t.id == "string" && await At(t.id);
          break;
        case "regenerate-chat-message":
          typeof t.id == "string" && await Et(t.id);
          break;
        case "copy-chat-message": {
          const a = typeof t.id == "string" ? t.id : "", l = N.find((h) => h.id === a);
          l && kt(l);
          break;
        }
        case "apply-chat-result":
          typeof t.content == "string" && Ct(t.content);
          break;
        case "append-chat-result":
          typeof t.content == "string" && Lt(t.content);
          break;
        case "create-note-from-chat-result":
          typeof t.content == "string" && Tt(t.content);
          break;
        case "new-chat-thread":
          xt();
          break;
        case "select-chat-thread":
          typeof t.id == "string" && bt(t.id);
          break;
        case "delete-chat-thread":
          typeof t.id == "string" && vt(t.id);
          break;
        case "add-chat-reference":
          typeof t.text == "string" && De(t.text);
          break;
        case "remove-chat-reference":
          ie((a) => a.filter((l) => l.id !== String(t.id ?? "")));
          break;
        case "add-chat-images": {
          const a = (Array.isArray(t.images) ? t.images : []).map(Qn).filter((l) => l !== null);
          a.length && pe((l) => [
            ...l,
            ...a
          ]);
          break;
        }
        case "remove-chat-image":
          wt(String(t.id ?? ""));
          break;
        case "close":
          R == null ? void 0 : R(false);
          break;
      }
    }, [
      B,
      St,
      Fe,
      Pt,
      Mt,
      Rt,
      It,
      Je,
      Xe,
      Nt,
      Dt,
      je,
      _t,
      ze,
      Ft,
      Ot,
      ee,
      yt,
      Oe,
      At,
      Et,
      kt,
      Ct,
      Lt,
      Tt,
      N,
      xt,
      bt,
      vt,
      De,
      wt,
      R
    ]);
    r.useEffect(() => {
      if (!v) return;
      let e = () => {
      }, t = false;
      return Wo((a) => {
        if (a.type === Gn.READY) {
          a.source && typeof a.source.postMessage == "function" ? (G.current = a.source, Q.current = false) : Jn() && (G.current = null, Q.current = true), be(true), Gt(Q.current ? null : G.current, _e());
          return;
        }
        a.type === Gn.ACTION && a.action && Tn(a.action, a.payload ?? {});
      }).then((a) => {
        if (t) {
          a();
          return;
        }
        e = a;
      }), () => {
        t = true, e();
      };
    }, [
      v,
      _e,
      Tn
    ]);
    const zr = () => {
      me(true), en(true);
    }, jt = () => {
      me(false), en(false), B();
    }, Be = r.useCallback(() => {
      Fe(), Oe(), we(), R == null ? void 0 : R(false);
    }, [
      Fe,
      Oe,
      we,
      R
    ]);
    So(J, Be, J, "llm-assist-full"), r.useEffect(() => {
      if (!J) return;
      const e = (t) => {
        t.key === "Escape" && (t.preventDefault(), Be());
      };
      return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
    }, [
      J,
      Be
    ]);
    const Br = () => {
      (async () => {
        if (Jn() && await Un(null)) {
          Q.current = true, G.current = null, await $n(null), Ge(), be(true);
          return;
        }
        const e = G.current;
        if (e && !e.closed) {
          await $n(e), Ge(), be(true);
          return;
        }
        const t = await qo();
        if (!t) {
          alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          return;
        }
        t === "tauri" ? (Q.current = true, G.current = null) : (Q.current = false, G.current = t), be(true);
      })();
    }, Vr = {
      theme: m,
      profiles: U,
      selectedProfileId: Pe,
      onSelectedProfileIdChange: Xe,
      selectedProfile: b,
      model: F,
      onModelChange: Je,
      selectedText: Ee,
      onSelectedTextChange: ke,
      onRefreshSelection: B,
      attachedImages: le,
      onAddImages: ze,
      onRemoveImage: Ft,
      onClearImages: Ot,
      instruction: re,
      onInstructionChange: He,
      systemPrompt: q,
      onSystemPromptChange: Ce,
      requestOptions: Y,
      onRequestOptionsChange: Le,
      result: z,
      onResultChange: Z,
      resultViewMode: at,
      onResultViewModeChange: hn,
      loading: it,
      error: lt,
      templates: Te,
      selectedTemplateId: ct,
      onLoadTemplate: Nt,
      templateName: Se,
      onTemplateNameChange: Ke,
      editingTemplateId: ce,
      onSaveTemplate: Dt,
      onNewTemplate: je,
      onDeleteTemplate: _t,
      onRun: St,
      onCancelGeneration: Fe,
      onApplyResult: Pt,
      onAppendResult: Mt,
      onCopyResult: Rt,
      onCreateNoteFromResult: It,
      presentation: w,
      canInsertIntoDocument: g,
      exaoneTabular: ue,
      onExaoneTabularChange: xn
    }, Sn = c.jsx(is, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: c.jsxs("div", {
        className: "flex shrink-0 flex-wrap items-center justify-end gap-1",
        children: [
          typeof V == "function" || typeof k == "function" || typeof y == "function" || typeof K == "function" ? c.jsx(Ks, {
            presentation: w,
            onChange: I,
            splitEnabled: S && !J
          }) : null,
          w === "floating" && !J ? c.jsx(on, {
            label: X ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30",
            onClick: Br,
            disabled: X,
            children: c.jsx(Qo, {
              size: 15
            })
          }) : null,
          w === "floating" && !J ? c.jsx(on, {
            label: "\uC228\uAE30\uAE30",
            onClick: zr,
            children: c.jsx(es, {
              size: 15
            })
          }) : null,
          c.jsx(on, {
            label: "\uB2EB\uAE30",
            onClick: Be,
            children: c.jsx(ts, {
              size: 15
            })
          })
        ]
      })
    }), Hr = c.jsxs("div", {
      className: "flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100",
      children: [
        c.jsx(Jt, {
          size: 16,
          className: "shrink-0",
          "aria-hidden": true
        }),
        c.jsx("span", {
          className: "whitespace-nowrap",
          children: "AI \uB3C4\uC6B0\uBBF8"
        }),
        c.jsx(Yn, {
          value: ae,
          onChange: ee
        })
      ]
    }), Pn = ae === "chat" ? c.jsx(Uo, {
      profiles: U,
      selectedProfileId: Pe,
      onSelectedProfileIdChange: Xe,
      selectedProfile: b,
      model: F,
      onModelChange: Je,
      systemPrompt: q,
      onSystemPromptChange: Ce,
      requestOptions: Y,
      onRequestOptionsChange: Le,
      messages: N,
      draft: Re,
      onDraftChange: ve,
      references: Ie,
      onRemoveReference: (e) => ie((t) => t.filter((a) => a.id !== e)),
      onReorderReferences: ie,
      dropHostRef: Or,
      autoActiveTabReference: dt,
      onAutoActiveTabReferenceChange: _r,
      activeTabBadgeLabel: Fr,
      onAddActiveTabReference: Dr,
      attachedImages: he,
      onAddImages: jr,
      onRemoveImage: wt,
      threads: Me,
      activeThreadId: $,
      onSelectThread: bt,
      onDeleteThread: vt,
      onNewThread: xt,
      loading: ft,
      error: mt,
      onSend: yt,
      onCancel: Oe,
      canInsertIntoDocument: g,
      onCopyMessage: kt,
      onResendMessage: At,
      onRegenerateMessage: Et,
      onApplyResult: Ct,
      onAppendResult: Lt,
      onCreateNoteFromResult: Tt
    }) : c.jsx(Xo, {
      ...Vr,
      enableImageDropZone: false
    }), Wr = !!(v && w === "docked" && !J), Kr = !!(v && w === "split" && D && !J), Ur = !!(v && w === "floating" && !te && !X && !J), Xr = !!(v && w === "floating" && (te || X) && !J), Mn = X ? "AI (\uC0C8\uCC3D)" : "AI", qr = X ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC", zt = c.jsx(qn, {
      className: "flex h-full min-h-0 flex-col",
      disabled: !v,
      onFilesDrop: Ln,
      children: c.jsxs("div", {
        className: "flex h-full min-h-0 flex-col",
        role: "complementary",
        "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8",
        children: [
          c.jsxs("div", {
            className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40",
            children: [
              Hr,
              Sn
            ]
          }),
          c.jsx("div", {
            className: `min-h-0 flex-1 p-3 ${ae === "chat" ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`,
            children: Pn
          })
        ]
      })
    }), Yr = c.jsx("div", {
      className: "absolute inset-0 z-60 flex min-h-0 flex-col bg-white dark:bg-odp-surface",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "AI \uB3C4\uC6B0\uBBF8",
      children: zt
    });
    return c.jsxs(c.Fragment, {
      children: [
        c.jsx(Ns, {
          enabled: !!v,
          onAdd: De
        }),
        J ? Yr : null,
        Wr ? c.jsx(zs, {
          open: true,
          onClose: Be,
          children: zt
        }) : null,
        Kr && D ? Gr.createPortal(zt, D) : null,
        c.jsx(sn, {
          children: Xr ? c.jsxs(an.div, {
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
            transition: dr,
            onPointerDown: (e) => vn(e, X ? {} : {
              onTap: jt
            }),
            onTouchStart: (e) => wn(e, X ? {} : {
              onTap: jt
            }),
            onKeyDown: (e) => {
              X || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), jt());
            },
            className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing",
            style: {
              left: gt.left,
              top: gt.top
            },
            title: qr,
            "aria-label": Mn,
            children: [
              c.jsx(Jt, {
                size: 14,
                "aria-hidden": true
              }),
              Mn
            ]
          }, "llm-assist-chip") : null
        }),
        c.jsx(sn, {
          children: Ur ? c.jsxs(an.div, {
            ref: Nr,
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
            transition: dr,
            className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center",
            style: gt,
            role: "dialog",
            "aria-modal": "false",
            "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8",
            children: [
              c.jsxs(qn, {
                className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg",
                disabled: !v,
                onFilesDrop: Ln,
                children: [
                  c.jsxs("div", {
                    className: "flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40",
                    onPointerDown: (e) => vn(e),
                    onTouchStart: (e) => wn(e),
                    children: [
                      c.jsxs("div", {
                        className: "flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100",
                        children: [
                          c.jsx(Zo, {
                            size: 16,
                            className: "shrink-0 opacity-60",
                            "aria-hidden": true
                          }),
                          c.jsx(Jt, {
                            size: 16,
                            className: "shrink-0",
                            "aria-hidden": true
                          }),
                          c.jsx("span", {
                            className: "whitespace-nowrap",
                            children: "AI \uB3C4\uC6B0\uBBF8"
                          }),
                          c.jsx(Yn, {
                            value: ae,
                            onChange: ee
                          })
                        ]
                      }),
                      Sn
                    ]
                  }),
                  c.jsx("div", {
                    className: `min-h-0 flex-1 p-3 ${ae === "chat" ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`,
                    children: Pn
                  })
                ]
              }),
              c.jsx("div", {
                role: "separator",
                "aria-orientation": "vertical",
                "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC67C\uCABD)",
                className: "absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!",
                onPointerDown: (e) => An("w", e)
              }),
              c.jsx("div", {
                role: "separator",
                "aria-orientation": "vertical",
                "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC624\uB978\uCABD)",
                className: "absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!",
                onPointerDown: (e) => An("e", e)
              }),
              c.jsx("div", {
                role: "separator",
                "aria-orientation": "horizontal",
                "aria-label": "\uD06C\uAE30 \uC870\uC808",
                className: "absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!",
                onPointerDown: (e) => yn("sw", e)
              }),
              c.jsx("div", {
                role: "separator",
                "aria-orientation": "horizontal",
                "aria-label": "\uD06C\uAE30 \uC870\uC808",
                className: "absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!",
                onPointerDown: (e) => yn("se", e)
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
  Ma as default
};
