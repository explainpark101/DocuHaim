const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/exaoneTabularClient-B7G8BtH_.js","assets/index-BoYUXkF3.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-lucide-DfALnt4w.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-radix-ClWfNC7b.js","assets/index-6ZbnqDDd.css"])))=>i.map(i=>d[i]);
import { _ as Rr } from "./vendor-aws-hJDgVEKM.js";
import { r as o, j as l, a as Ir, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { d6 as Nr, d7 as an, d8 as _r, N as Dr, T as Or, d9 as jr, da as Fr, db as zr, bR as Br, dc as zt, dd as Vr, g as Bt, w as Hr, e as Cn, V as Vt, de as Ht, df as Ur, dg as Ln, s as Ae, k as Kr, bf as Pn, bt as Ut, dh as Sn, L as Mn, h as Kt, U as Wr, bd as Ge, x as Xr, y as qr, aG as $r, di as Yr, i as Gr, bj as Jr, bl as Zr, dj as Qr, dk as eo, dl as to, dm as no, __tla as __tla_1 } from "./index-BoYUXkF3.js";
import { i as ro, g as oo, __tla as __tla_2 } from "./geminiClient-BqxJKBTo.js";
import { L as Tn, d as Je, i as Rn, g as In, n as Wt } from "./openaiCompatibleClient-Co8QRgA5.js";
import { g as so } from "./appStatusBar-COMHAiNk.js";
import { E as ao, S as io, C as lo } from "./vendor-codemirror-V7b8BJE-.js";
import { i as co } from "./previewMirrorEdit-CUR5_xYj.js";
import { u as uo } from "./LlamaCppModelSelect-C71XorxD.js";
import { j as fo, l as mo, k as ho, m as Xt, n as po, o as Nn, q as _n, r as go, t as xo, u as bo, L as Dn, e as On, v as wo, f as vo, g as yo, w as jn, x as Ao, h as Fn, __tla as __tla_3 } from "./llmAssistUiMode-UsELg-v6.js";
import { e as zn, __tla as __tla_4 } from "./bootSplash-Z2krRgC9.js";
import { g as Eo } from "./mlxVlmGenerateClient-BFtN5_lq.js";
import { a6 as ko, y as Co, a7 as Qn, a8 as er, b as tr, C as Lo, S as qt, a9 as Po, aa as So, ab as Mo, X as To } from "./vendor-lucide-DfALnt4w.js";
import { A as tn, m as nn } from "./vendor-motion-Bv-XITR_.js";
import { M as Ro, w as nr, x as rr, N as Io, y as or, z as sr, A as ar, O as No, Q as _o, U as Do, v as Oo } from "./vendor-radix-ClWfNC7b.js";
import { r as Bn, n as Vn } from "./llmAssistImages-DG7rjEWr.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-google-genai-BsvcYwA0.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./OpenAiCompatibleModelSelect-CPutmGu-.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./useLazyMermaidRender-BEGREvhj.js";
import { __tla as __tla_5 } from "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./ImageLightboxDownloadButton-nm7UMRIL.js";
import "./Kbd-Cnuyx3cZ.js";
import "./downloadImageSrc-Ur40YJhC.js";
let aa;
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
  const ln = "s3haim-llm-modal-position", ir = "s3haim-llm-modal-hidden", jo = 420, rn = 280, on = 240, Fo = 560, lr = 44, $t = {
    leftVw: 55,
    topVh: 12
  };
  function zo() {
    try {
      const n = localStorage.getItem(ln);
      if (!n) return {
        ...$t
      };
      const r = JSON.parse(n), a = Number(r == null ? void 0 : r.leftVw), s = Number(r == null ? void 0 : r.topVh);
      return !Number.isFinite(a) || !Number.isFinite(s) ? {
        ...$t
      } : {
        leftVw: Math.min(95, Math.max(0, a)),
        topVh: Math.min(95, Math.max(0, s))
      };
    } catch {
      return {
        ...$t
      };
    }
  }
  function Yt(n) {
    const r = window.innerWidth || 1, a = window.innerHeight || 1, s = zo(), f = Math.min(jo, Math.max(rn, n.width - 16)), u = Math.min(lr + Fo, Math.max(on, n.height - 16)), h = {
      leftPx: s.leftVw / 100 * r,
      topPx: s.topVh / 100 * a,
      widthPx: f,
      heightPx: u
    };
    return xe(h, n);
  }
  function xe(n, r) {
    const a = Math.max(rn, r.width), s = Math.max(on, r.height), f = Math.min(a, Math.max(rn, n.widthPx)), u = Math.min(s, Math.max(on, n.heightPx)), h = r.right - f, d = r.bottom - lr, S = Math.min(Math.max(r.left, n.leftPx), Math.max(r.left, h)), A = Math.min(Math.max(r.top, n.topPx), Math.max(r.top, d));
    return {
      leftPx: Math.round(S),
      topPx: Math.round(A),
      widthPx: Math.round(f),
      heightPx: Math.round(u)
    };
  }
  function Bo(n) {
    const r = n ?? {
      left: 8,
      top: 8,
      right: window.innerWidth - 8,
      bottom: window.innerHeight - 8,
      width: window.innerWidth - 16,
      height: window.innerHeight - 16
    };
    try {
      const a = localStorage.getItem(ln);
      if (!a) return Yt(r);
      const s = JSON.parse(a);
      return Number.isFinite(Number(s == null ? void 0 : s.leftPx)) && Number.isFinite(Number(s == null ? void 0 : s.topPx)) && Number.isFinite(Number(s == null ? void 0 : s.widthPx)) && Number.isFinite(Number(s == null ? void 0 : s.heightPx)) ? xe({
        leftPx: Number(s.leftPx),
        topPx: Number(s.topPx),
        widthPx: Number(s.widthPx),
        heightPx: Number(s.heightPx)
      }, r) : Yt(r);
    } catch {
      return Yt(r);
    }
  }
  function Vo(n, r) {
    const a = r ?? {
      left: 8,
      top: 8,
      right: window.innerWidth - 8,
      bottom: window.innerHeight - 8,
      width: window.innerWidth - 16,
      height: window.innerHeight - 16
    }, s = xe(n, a);
    try {
      localStorage.setItem(ln, JSON.stringify(s));
    } catch {
    }
  }
  function Ho() {
    try {
      return localStorage.getItem(ir) === "1";
    } catch {
      return false;
    }
  }
  function Gt(n) {
    try {
      localStorage.setItem(ir, n ? "1" : "0");
    } catch {
    }
  }
  const Uo = "[data-app-editor-navbar]", Ko = 56;
  function cr() {
    const n = document.querySelector(Uo);
    return n instanceof HTMLElement ? n : null;
  }
  function Wo() {
    const n = cr();
    return n ? n.getBoundingClientRect().bottom : Ko;
  }
  function Xo(n) {
    const r = n == null ? void 0 : n.current, a = (r == null ? void 0 : r.value) ?? r ?? null;
    return a && typeof a == "object" && "root" in a && a.root instanceof Element ? a.root : null;
  }
  function Hn(n) {
    const a = Wo(), s = so(), f = Math.max(a + 1, s), u = {
      left: 8,
      top: Math.max(8, a),
      right: Math.max(8, window.innerWidth - 8),
      bottom: f,
      width: Math.max(0, window.innerWidth - 16),
      height: Math.max(0, f - Math.max(8, a))
    }, h = Xo(n);
    if (!h) return u;
    const d = h.getBoundingClientRect(), S = cr(), A = S ? S.getBoundingClientRect().bottom : Math.max(d.top, a), C = d.left, p = d.right;
    return {
      left: C,
      top: A,
      right: p,
      bottom: f,
      width: Math.max(0, p - C),
      height: Math.max(0, f - A)
    };
  }
  const Un = 5, Kn = "llm-assist-modal-resize-cursor-style", Qe = "llm-assist-modal-corner-resize";
  function qo() {
    if (document.getElementById(Kn)) return;
    const n = document.createElement("style");
    n.id = Kn, n.textContent = `
    html.${Qe},
    html.${Qe} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(n);
  }
  function $o(n) {
    return n === "e" || n === "w" ? "ew-resize" : n === "se" ? "nwse-resize" : "nesw-resize";
  }
  function Yo(n) {
    qo();
    const r = $o(n);
    document.documentElement.style.setProperty("--llm-assist-resize-cursor", r), document.documentElement.classList.add(Qe), document.body.style.userSelect = "none";
  }
  function Go() {
    document.documentElement.classList.remove(Qe), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
  }
  function Jo(n, r) {
    return n.leftPx === r.leftPx && n.topPx === r.topPx && n.widthPx === r.widthPx && n.heightPx === r.heightPx;
  }
  function Zo(n, { enabled: r = true } = {}) {
    const a = o.useRef(Hn(n)), [s, f] = o.useState(() => Bo(a.current)), u = o.useRef(null), h = o.useRef({
      active: false,
      startX: 0,
      startY: 0,
      startLayout: s
    }), d = o.useRef(null), S = o.useCallback(() => {
      const E = Hn(n);
      a.current = E, f((g) => {
        const v = xe(g, E);
        return Jo(g, v) ? g : v;
      });
    }, [
      n
    ]);
    o.useEffect(() => {
      var _a, _b, _c;
      if (!r) return;
      S();
      let E = 0;
      const g = () => {
        E || (E = requestAnimationFrame(() => {
          E = 0, S();
        }));
      };
      window.addEventListener("resize", g);
      const v = ((_b = (_a = n == null ? void 0 : n.current) == null ? void 0 : _a.value) == null ? void 0 : _b.root) ?? ((_c = n == null ? void 0 : n.current) == null ? void 0 : _c.root) ?? null;
      let L = null;
      if (typeof ResizeObserver < "u") {
        if (L = new ResizeObserver(g), v) {
          L.observe(v);
          const w = v.querySelector(".md-editor-toolbar-wrapper") || v.querySelector(".md-editor-toolbar");
          w && L.observe(w);
        }
        const I = document.querySelector("[data-app-editor-navbar]");
        I && L.observe(I);
        const k = document.querySelector("[data-app-status-bar]");
        k && L.observe(k);
      }
      return () => {
        cancelAnimationFrame(E), window.removeEventListener("resize", g), L == null ? void 0 : L.disconnect();
      };
    }, [
      r,
      n,
      S
    ]);
    const A = o.useCallback((E) => {
      const g = xe(E, a.current);
      return Vo(g, a.current), g;
    }, []), C = o.useCallback((E, g) => {
      const v = h.current;
      if (!v.active) return;
      const L = E - v.startX, I = g - v.startY;
      f(xe({
        ...v.startLayout,
        leftPx: v.startLayout.leftPx + L,
        topPx: v.startLayout.topPx + I
      }, a.current));
    }, []), p = o.useCallback((E, { onTap: g } = {}) => {
      if (E.pointerType === "touch" || E.button !== 0) return;
      E.preventDefault();
      const v = E.clientX, L = E.clientY;
      let I = false;
      h.current = {
        active: true,
        startX: v,
        startY: L,
        startLayout: s
      };
      const k = (m) => {
        h.current.active && (Math.hypot(m.clientX - v, m.clientY - L) > Un && (I = true), C(m.clientX, m.clientY));
      }, w = () => {
        h.current.active && (h.current.active = false, document.removeEventListener("pointermove", k), document.removeEventListener("pointerup", w), f((m) => A(m)), I || (g == null ? void 0 : g()));
      };
      document.addEventListener("pointermove", k), document.addEventListener("pointerup", w);
    }, [
      C,
      s,
      A
    ]), _ = o.useCallback((E, { onTap: g } = {}) => {
      const v = E.changedTouches;
      if (!(v == null ? void 0 : v.length)) return;
      const L = v[0];
      if (!L) return;
      const I = L.identifier, k = L.clientX, w = L.clientY;
      E.preventDefault();
      let m = false;
      h.current = {
        active: true,
        startX: k,
        startY: w,
        startLayout: s,
        touchIdentifier: I
      };
      const H = (Z) => {
        if (!h.current.active) return;
        const te = Array.from(Z.touches).find((j) => j.identifier === I);
        te && (Math.hypot(te.clientX - k, te.clientY - w) > Un && (m = true), C(te.clientX, te.clientY), Z.preventDefault());
      }, N = () => {
        h.current.active && (h.current.active = false, document.removeEventListener("touchmove", H), document.removeEventListener("touchend", J), document.removeEventListener("touchcancel", J), f((Z) => A(Z)), m || (g == null ? void 0 : g()));
      }, J = (Z) => {
        !h.current.active || !Array.from(Z.changedTouches).some((j) => j.identifier === I) || N();
      };
      document.addEventListener("touchmove", H, {
        passive: false
      }), document.addEventListener("touchend", J, {
        passive: false
      }), document.addEventListener("touchcancel", J, {
        passive: false
      });
    }, [
      C,
      s,
      A
    ]), b = o.useCallback((E, g) => {
      const v = d.current;
      if (!v) return;
      const L = E - v.startX, I = g - v.startY, k = v.startLayout;
      let w;
      v.corner === "se" ? w = {
        leftPx: k.leftPx,
        topPx: k.topPx,
        widthPx: k.widthPx + L,
        heightPx: k.heightPx + I
      } : v.corner === "sw" ? w = {
        leftPx: k.leftPx + L,
        topPx: k.topPx,
        widthPx: k.widthPx - L,
        heightPx: k.heightPx + I
      } : v.corner === "e" ? w = {
        leftPx: k.leftPx,
        topPx: k.topPx,
        widthPx: k.widthPx + L,
        heightPx: k.heightPx
      } : w = {
        leftPx: k.leftPx + L,
        topPx: k.topPx,
        widthPx: k.widthPx - L,
        heightPx: k.heightPx
      }, f(xe(w, a.current));
    }, []), D = o.useCallback((E, g) => {
      if (g.button !== 0) return;
      g.preventDefault(), g.stopPropagation(), d.current = {
        corner: E,
        startX: g.clientX,
        startY: g.clientY,
        startLayout: s
      }, Yo(E);
      const v = g.currentTarget;
      v instanceof HTMLElement && typeof v.setPointerCapture == "function" && v.setPointerCapture(g.pointerId);
      const L = () => {
        d.current = null, Go(), document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", k), document.removeEventListener("pointercancel", k);
      }, I = (w) => {
        w.preventDefault(), b(w.clientX, w.clientY);
      }, k = () => {
        d.current && (L(), f((w) => A(w)));
      };
      document.addEventListener("pointermove", I, {
        passive: false
      }), document.addEventListener("pointerup", k), document.addEventListener("pointercancel", k);
    }, [
      b,
      s,
      A
    ]), O = o.useCallback((E, g) => D(E, g), [
      D
    ]), U = {
      left: s.leftPx,
      top: s.topPx,
      width: s.widthPx,
      height: s.heightPx
    };
    return {
      layout: s,
      panelRef: u,
      panelStyle: U,
      startPositionDrag: p,
      startPositionTouchDrag: _,
      startCornerResize: O,
      startEdgeResize: D,
      refreshBounds: S
    };
  }
  function Wn(n) {
    if (!n || typeof n != "object") return false;
    const r = n;
    return typeof r.getEditorView == "function" || typeof r.getSelectedText == "function";
  }
  function ur(n) {
    const r = n == null ? void 0 : n.current;
    if (!r || typeof r != "object") return null;
    if (Wn(r)) return r;
    const a = r.value;
    return Wn(a) ? a : null;
  }
  function dr(n) {
    return ur(n);
  }
  const Qo = [
    50,
    200,
    500,
    1e3
  ];
  function es(n, r = null) {
    if (r == null ? void 0 : r.dom) return r.dom.closest(".md-editor");
    const a = dr(n);
    return typeof Element < "u" && (a == null ? void 0 : a.root) instanceof Element ? a.root : null;
  }
  function ts(n, { view: r = null, documentKey: a = null } = {}) {
    var _a;
    const s = r ?? tt(n, {
      documentKey: a
    }).view, f = es(n, s);
    return co(f) ? true : ((_a = an(s, a)) == null ? void 0 : _a.everFocused) ? false : (s == null ? void 0 : s.state, true);
  }
  function ns(n, r) {
    return n ? n.endsWith(`
`) ? r : `
${r}` : r;
  }
  function rs(n, r) {
    if (!n) return r;
    const a = n.endsWith(`
`) ? "" : `
`;
    return `${n}${a}${r}`;
  }
  function et(n, r, a) {
    const s = Math.max(0, Math.min(r, n)), f = Math.max(s, Math.min(a, n));
    return {
      from: s,
      to: f
    };
  }
  function os(n, r, a, s, f) {
    if (typeof f != "function") return false;
    const u = et(n.length, r, a), h = `${n.slice(0, u.from)}${s}${n.slice(u.to)}`;
    return f(h), true;
  }
  function Ze({ editorRef: n, result: r, onChange: a, getMarkdown: s, forceAppendAtEnd: f = false, documentKey: u = null }) {
    var _a, _b, _c;
    const h = tt(n, {
      documentKey: u
    }), { view: d } = h;
    if (f || ts(n, {
      view: d,
      documentKey: u
    })) {
      const D = ((_c = (_b = (_a = d == null ? void 0 : d.state) == null ? void 0 : _a.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? (typeof s == "function" ? s() : ""), O = ns(D, r);
      if (d == null ? void 0 : d.state) {
        const U = D.length;
        return Xn(d, U, U, O, a);
      }
      return typeof a == "function" ? (a(rs(D, r)), true) : false;
    }
    const A = an(d, u);
    let C = h.from, p = h.to;
    if ((!(d == null ? void 0 : d.hasFocus) && (A == null ? void 0 : A.everFocused) || C === p && (A == null ? void 0 : A.everFocused)) && (C = A.from, p = A.to), !(A == null ? void 0 : A.everFocused) && C === p && !h.text.trim()) return false;
    if (d == null ? void 0 : d.state) {
      const D = d.state.doc.length, O = et(D, C, p);
      return Xn(d, O.from, O.to, r, a);
    }
    const b = typeof s == "function" ? s() : "";
    return os(b, C, p, r, a);
  }
  function ss(n, r, a) {
    var _a, _b;
    const s = n.state.selection.main, f = !!n.hasFocus, u = an(n, a);
    if (f) {
      const S = n.state.doc.sliceString(s.from, s.to);
      if (S) return {
        text: S,
        from: s.from,
        to: s.to,
        view: n
      };
      if (u == null ? void 0 : u.everFocused) {
        const C = n.state.doc.length, { from: p, to: _ } = et(C, u.from, u.to);
        return {
          text: n.state.doc.sliceString(p, _),
          from: p,
          to: _,
          view: n
        };
      }
      const A = ((_a = r == null ? void 0 : r.getSelectedText) == null ? void 0 : _a.call(r)) ?? "";
      return A ? {
        text: A,
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
    if (u == null ? void 0 : u.everFocused) {
      const S = n.state.doc.length, { from: A, to: C } = et(S, u.from, u.to);
      return {
        text: n.state.doc.sliceString(A, C),
        from: A,
        to: C,
        view: n
      };
    }
    const h = n.state.doc.sliceString(s.from, s.to);
    if (h) return {
      text: h,
      from: s.from,
      to: s.to,
      view: n
    };
    const d = ((_b = r == null ? void 0 : r.getSelectedText) == null ? void 0 : _b.call(r)) ?? "";
    return d ? {
      text: d,
      from: s.from,
      to: s.to,
      view: n
    } : {
      text: h,
      from: s.from,
      to: s.to,
      view: n
    };
  }
  function tt(n, r) {
    var _a, _b, _c;
    const a = (r == null ? void 0 : r.documentKey) ?? null, s = ((_a = r == null ? void 0 : r.getEditorApi) == null ? void 0 : _a.call(r)) ?? ur(n), f = ((_b = s == null ? void 0 : s.getEditorView) == null ? void 0 : _b.call(s)) ?? null;
    if (f == null ? void 0 : f.state) return ss(f, s, a);
    const u = Nr(a);
    return (u == null ? void 0 : u.everFocused) ? {
      text: "",
      from: u.from,
      to: u.to,
      view: null
    } : {
      text: ((_c = s == null ? void 0 : s.getSelectedText) == null ? void 0 : _c.call(s)) ?? "",
      from: 0,
      to: 0,
      view: null
    };
  }
  function as(n) {
    var _a, _b;
    return ((_b = (_a = dr(n)) == null ? void 0 : _a.getEditorView) == null ? void 0 : _b.call(_a)) ?? null;
  }
  function is(n, r, a) {
    let s = false, f = null, u = null;
    const h = [], d = (a == null ? void 0 : a.documentKey) ?? null, S = () => {
      s || r(tt(n, {
        documentKey: d
      }));
    }, A = () => {
      u == null ? void 0 : u(), u = null, f = null;
    };
    let C = null, p = false;
    const _ = () => {
      if (s) return true;
      const b = as(n);
      if (!b || b === f) return !!b;
      A(), f = b, p = false, C || (C = new lo());
      const D = C, O = ao.updateListener.of((U) => {
        U.selectionSet && S();
      });
      if (p) try {
        b.dispatch({
          effects: D.reconfigure(O)
        });
      } catch {
        p = false;
      }
      if (!p) try {
        b.dispatch({
          effects: io.appendConfig.of(D.of(O))
        }), p = true;
      } catch {
        return S(), true;
      }
      return u = () => {
        if (p) {
          try {
            b.dispatch({
              effects: D.reconfigure([])
            });
          } catch {
          }
          p = false;
        }
      }, S(), true;
    };
    if (!_()) for (const b of Qo) h.push(setTimeout(() => {
      s || _();
    }, b));
    return () => {
      s = true;
      for (const b of h) clearTimeout(b);
      A();
    };
  }
  function Xn(n, r, a, s, f) {
    var _a;
    return (n == null ? void 0 : n.state) ? (n.dispatch({
      changes: {
        from: r,
        to: a,
        insert: s
      },
      selection: {
        anchor: r + s.length
      }
    }), (_a = n.focus) == null ? void 0 : _a.call(n), f == null ? void 0 : f(n.state.doc.toString()), true) : false;
  }
  function ls({ enabled: n, onAdd: r }) {
    const [a, s] = o.useState(null);
    if (o.useEffect(() => {
      if (!n) {
        s(null);
        return;
      }
      let h = 0;
      const d = () => {
        cancelAnimationFrame(h), h = requestAnimationFrame(() => {
          s(_r());
        });
      };
      return d(), document.addEventListener("selectionchange", d), window.addEventListener("scroll", d, true), window.addEventListener("resize", d), () => {
        cancelAnimationFrame(h), document.removeEventListener("selectionchange", d), window.removeEventListener("scroll", d, true), window.removeEventListener("resize", d);
      };
    }, [
      n
    ]), !n || !a) return null;
    const f = Math.max(8, a.top - 36), u = Math.min(window.innerWidth - 120, Math.max(8, a.left + a.width / 2 - 56));
    return l.jsxs("button", {
      type: "button",
      className: "fixed z-100060 inline-flex items-center gap-1 rounded-full border border-violet-400 bg-violet-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg hover:bg-violet-700",
      style: {
        top: f,
        left: u
      },
      onMouseDown: (h) => {
        h.preventDefault(), h.stopPropagation();
      },
      onClick: () => r(a.text),
      children: [
        l.jsx(ko, {
          size: 12,
          "aria-hidden": true
        }),
        "\uCC44\uD305\uC5D0 \uCD94\uAC00"
      ]
    });
  }
  const cs = 520, us = 12, qn = 80, $n = 300, ds = 180, fs = Or, ms = [
    0.4,
    0,
    0.2,
    1
  ];
  function Jt(n) {
    return typeof window > "u" ? n * 5 : window.innerWidth * n / 100;
  }
  function Yn(n) {
    var _a;
    return n ? n.closest("[data-llm-assist-layout-root]") || ((_a = n.parentElement) == null ? void 0 : _a.parentElement) || n.parentElement : null;
  }
  function hs({ open: n, onClose: r, children: a, className: s = "" }) {
    const f = o.useRef(null), [u, h] = o.useState(() => Math.max($n, Math.floor(Jt(qn)))), d = Math.max(1, Math.floor(Jt(us)));
    o.useEffect(() => {
      if (!n) return;
      const b = () => {
        var _a;
        const v = (((_a = Yn(f.current)) == null ? void 0 : _a.clientWidth) ?? window.innerWidth) - ds, L = Math.max($n, Math.floor(Jt(qn)));
        h(Math.max(d, Math.min(L, v)));
      };
      b();
      const D = requestAnimationFrame(b);
      window.addEventListener("resize", b);
      let O = null;
      const U = Yn(f.current);
      return U && typeof ResizeObserver < "u" && (O = new ResizeObserver(b), O.observe(U)), () => {
        cancelAnimationFrame(D), window.removeEventListener("resize", b), O == null ? void 0 : O.disconnect();
      };
    }, [
      d,
      n
    ]);
    const S = Math.max(1, Math.floor(d / 3)), { width: A, isResizing: C, handleProps: p } = Dr({
      storageKey: "s3haim_llm_assist_dock_width",
      defaultWidth: cs,
      minWidth: d,
      maxWidth: Math.max(u, d),
      edge: "right",
      collapseBelowWidth: S,
      onCollapseBelowMin: typeof r == "function" ? r : void 0
    }), _ = Math.min(A, u);
    return l.jsx(tn, {
      initial: false,
      children: n ? l.jsx(nn.div, {
        className: "relative h-full min-h-0 shrink-0 overflow-hidden",
        initial: {
          width: 0
        },
        animate: {
          width: _
        },
        exit: {
          width: 0
        },
        transition: C ? {
          duration: 0
        } : {
          duration: 0.28,
          ease: ms
        },
        children: l.jsxs("div", {
          ref: f,
          className: `relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${s}`,
          style: {
            width: _
          },
          children: [
            l.jsx(fs, {
              handleProps: {
                ...p,
                "aria-valuenow": Math.round(_),
                "aria-valuemax": Math.round(u)
              },
              isResizing: C,
              edge: "left",
              visibleOnHover: true,
              label: "AI \uB3C4\uC6B0\uBBF8 \uB108\uBE44 \uC870\uC808"
            }),
            l.jsx("div", {
              className: "flex min-h-0 min-w-0 flex-1 flex-col",
              children: a
            })
          ]
        })
      }, "llm-assist-dock") : null
    });
  }
  const ps = "inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", gs = "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50", xs = "z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
  function bs(n) {
    return n === "docked" ? er : n === "split" ? tr : Qn;
  }
  function ws({ presentation: n, onChange: r, splitEnabled: a = true }) {
    const s = bs(n), f = [
      {
        value: "floating",
        label: "\uD50C\uB85C\uD305 \uCC3D",
        icon: Qn
      },
      {
        value: "docked",
        label: "\uC6B0\uCE21\uC5D0 \uACE0\uC815",
        icon: er
      },
      {
        value: "split",
        label: "\uC5D0\uC774\uC804\uD2B8 \uD0ED",
        icon: tr,
        disabled: !a
      }
    ];
    return l.jsxs(Ro, {
      children: [
        l.jsxs(nr, {
          children: [
            l.jsx(rr, {
              asChild: true,
              children: l.jsx(Io, {
                asChild: true,
                children: l.jsxs("button", {
                  type: "button",
                  onPointerDown: (u) => u.stopPropagation(),
                  onTouchStart: (u) => u.stopPropagation(),
                  className: ps,
                  "aria-label": "\uD45C\uC2DC \uBC29\uC2DD",
                  children: [
                    l.jsx(s, {
                      size: 15,
                      "aria-hidden": true
                    }),
                    l.jsx(Co, {
                      size: 12,
                      "aria-hidden": true,
                      className: "opacity-70"
                    })
                  ]
                })
              })
            }),
            l.jsx(or, {
              children: l.jsxs(sr, {
                side: "bottom",
                sideOffset: 6,
                className: "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50",
                children: [
                  "\uD45C\uC2DC \uBC29\uC2DD",
                  l.jsx(ar, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        }),
        l.jsx(No, {
          children: l.jsx(_o, {
            side: "bottom",
            align: "end",
            sideOffset: 4,
            className: xs,
            onCloseAutoFocus: (u) => u.preventDefault(),
            children: f.map((u) => {
              const h = u.icon, d = n === u.value;
              return l.jsxs(Do, {
                disabled: !!u.disabled,
                className: `${gs} ${u.disabled ? "cursor-not-allowed opacity-40" : ""}`,
                onSelect: () => {
                  u.disabled || u.value === n || r(u.value);
                },
                children: [
                  l.jsx(h, {
                    size: 14,
                    className: "shrink-0 opacity-80",
                    "aria-hidden": true
                  }),
                  l.jsx("span", {
                    className: "min-w-0 flex-1",
                    children: u.label
                  }),
                  d ? l.jsx(Lo, {
                    size: 14,
                    className: "shrink-0 text-violet-600 dark:text-violet-300",
                    "aria-hidden": true
                  }) : null
                ]
              }, u.value);
            })
          })
        })
      ]
    });
  }
  const fr = "s3haim-llm-assist-chat-threads", sn = "s3haim-llm-assist-chat-active-thread", mr = 40;
  function vs(n) {
    if (!n) return null;
    try {
      return JSON.parse(n);
    } catch {
      return null;
    }
  }
  function Zt() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `thread-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
  function ys() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `ref-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
  function As(n) {
    if (!n || typeof n != "object") return null;
    const r = n;
    if (typeof r.id != "string" || !r.id) return null;
    const a = Array.isArray(r.messages) ? r.messages : [], s = typeof r.createdAt == "number" ? r.createdAt : Date.now(), f = typeof r.updatedAt == "number" ? r.updatedAt : s, u = typeof r.title == "string" && r.title.trim() ? r.title.trim() : hr(a);
    return {
      id: r.id,
      title: u,
      messages: a,
      createdAt: s,
      updatedAt: f
    };
  }
  function hr(n) {
    const r = n.find((s) => s.role === "user" && s.content.trim());
    if (!r) return "\uC0C8 \uB300\uD654";
    const a = r.content.trim().replace(/\s+/g, " ");
    return a.length > 40 ? `${a.slice(0, 40)}\u2026` : a;
  }
  function Qt() {
    try {
      const n = vs(localStorage.getItem(fr));
      return Array.isArray(n) ? n.map(As).filter((r) => r !== null).sort((r, a) => a.updatedAt - r.updatedAt) : [];
    } catch {
      return [];
    }
  }
  function Gn(n) {
    try {
      const r = [
        ...n
      ].sort((a, s) => s.updatedAt - a.updatedAt).slice(0, mr);
      localStorage.setItem(fr, JSON.stringify(r));
    } catch {
    }
  }
  function Jn() {
    try {
      const n = localStorage.getItem(sn);
      return n && n.trim() ? n.trim() : null;
    } catch {
      return null;
    }
  }
  function Be(n) {
    try {
      n ? localStorage.setItem(sn, n) : localStorage.removeItem(sn);
    } catch {
    }
  }
  function Es(n, r) {
    const a = n.filter((s) => s.id !== r.id);
    return a.unshift(r), a.slice(0, mr);
  }
  function ks(n, r) {
    return n.filter((a) => a.id !== r);
  }
  const Cs = [
    0.4,
    0,
    0.2,
    1
  ], Zn = {
    duration: 0.28,
    ease: Cs
  }, Ls = "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", Ps = "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
  function en({ label: n, onClick: r, disabled: a, children: s }) {
    return l.jsxs(nr, {
      children: [
        l.jsx(rr, {
          asChild: true,
          children: l.jsx("button", {
            type: "button",
            onPointerDown: (f) => f.stopPropagation(),
            onTouchStart: (f) => f.stopPropagation(),
            onClick: r,
            disabled: a,
            className: Ls,
            "aria-label": n,
            children: s
          })
        }),
        l.jsx(or, {
          children: l.jsxs(sr, {
            side: "bottom",
            sideOffset: 6,
            className: Ps,
            children: [
              n,
              l.jsx(ar, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  aa = function({ editorRef: n = null, onChange: r, getMarkdown: a, llmProviderProfiles: s, open: f, onOpenChange: u, theme: h = "light" }) {
    var _a, _b, _c;
    const d = jr(), S = Fr(), A = zr(), { requestCreateFileWithContent: C } = Br(), p = S ? S.open : !!f, _ = S ? S.setOpen : u, b = (d == null ? void 0 : d.presentation) ?? "floating", D = d == null ? void 0 : d.setPresentation, O = d == null ? void 0 : d.openAsSplit, U = d == null ? void 0 : d.dockToRight, E = d == null ? void 0 : d.undockToFloating, g = d ? d.canInsertIntoDocument : !!n, v = !!(A == null ? void 0 : A.workspaceTabsEnabled), [L, I] = o.useState(() => zt());
    o.useEffect(() => (I(zt()), Vr(() => {
      I(zt());
    })), []);
    const k = o.useCallback((e) => {
      if (e === "split") {
        if (!v) return;
        O == null ? void 0 : O();
        return;
      }
      if (e === "docked") {
        U == null ? void 0 : U();
        return;
      }
      E == null ? void 0 : E();
    }, [
      v,
      O,
      U,
      E
    ]), w = ((_a = d == null ? void 0 : d.editorBridge) == null ? void 0 : _a.editorRef) ?? n, m = (d == null ? void 0 : d.editorBridge) ?? null, H = ((_b = d == null ? void 0 : d.editorBridge) == null ? void 0 : _b.onChange) ?? r, N = ((_c = d == null ? void 0 : d.editorBridge) == null ? void 0 : _c.getMarkdown) ?? a, J = o.useMemo(() => Array.isArray(s) ? s : [], [
      s
    ]), [Z, te] = o.useState(() => Ho()), [j, be] = o.useState(false), [Ee, ke] = o.useState(""), [cn, nt] = o.useState({
      from: 0,
      to: 0
    }), [ae, rt] = o.useState([]), [ne, Ve] = o.useState(""), [K, Ce] = o.useState(() => Bt()), [W, Le] = o.useState(() => ({
      ...Tn
    })), [F, Y] = o.useState(""), [ot, un] = o.useState("text"), [st, dn] = o.useState(false), [at, re] = o.useState(""), [Pe, pr] = o.useState([]), [it, He] = o.useState(""), [Se, Ue] = o.useState(""), [ie, Ke] = o.useState(null), [Me, We, fn] = uo(J), x = Hr(J, Me), [R, lt] = o.useState(() => x ? Cn(x.id, x.kind) : ""), [le, mn] = o.useState(() => fo(Vt(R) ?? "classification")), [de, gr] = o.useState(() => mo()), [Te, hn] = o.useState(() => Qt()), [X, Xe] = o.useState(() => {
      var _a2;
      const e = Jn(), t = Qt();
      return e && t.some((i) => i.id === e) ? e : ((_a2 = t[0]) == null ? void 0 : _a2.id) ?? null;
    }), [M, ce] = o.useState(() => {
      var _a2;
      const e = Qt(), t = Jn();
      return ((_a2 = e.find((c) => c.id === t) || e[0]) == null ? void 0 : _a2.messages) ?? [];
    }), [Re, we] = o.useState(""), [fe, me] = o.useState([]), [he, pe] = o.useState([]), [ct, qe] = o.useState(false), [ut, Q] = o.useState(""), q = o.useRef(null), G = o.useRef(false), Ie = o.useRef(null), ee = o.useRef(null), [dt, xr] = o.useState(() => typeof window < "u" ? window.matchMedia(`(max-width: ${Ht}px)`).matches : false), [br, ft] = o.useState(false);
    o.useEffect(() => {
      const e = window.matchMedia(`(max-width: ${Ht}px)`), t = () => xr(e.matches);
      return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
    }, []), o.useEffect(() => {
      if (!p) {
        ft(false);
        return;
      }
      const e = document.querySelector("[data-llm-assist-layout-root]");
      if (!e || typeof ResizeObserver > "u") {
        ft(dt);
        return;
      }
      const t = (c) => {
        ft(c > 0 && c <= Ht);
      };
      t(e.getBoundingClientRect().width);
      const i = new ResizeObserver((c) => {
        var _a2, _b2;
        const y = c[0];
        if (!y) return;
        const T = ((_b2 = (_a2 = y.borderBoxSize) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.inlineSize) ?? y.contentRect.width;
        t(T);
      });
      return i.observe(e), () => i.disconnect();
    }, [
      p,
      dt
    ]);
    const $ = !!p && (dt || br) && (b === "docked" || b === "floating"), { panelRef: wr, panelStyle: mt, startPositionDrag: pn, startPositionTouchDrag: gn, startCornerResize: xn, startEdgeResize: bn, refreshBounds: wn } = Zo(w, {
      enabled: p && b === "floating" && !$
    }), oe = o.useCallback((e) => {
      gr(e), ho(e);
    }, []), se = o.useCallback((e, t) => {
      if (!t) return;
      const i = Date.now();
      hn((c) => {
        const y = c.find((B) => B.id === t), T = {
          id: t,
          title: hr(e),
          messages: e,
          createdAt: (y == null ? void 0 : y.createdAt) ?? i,
          updatedAt: i
        }, P = Es(c, T);
        return Gn(P), P;
      }), Be(t);
    }, []), Ne = o.useCallback((e) => {
      const t = String(e || "").trim();
      t && (oe("chat"), me((i) => i.some((c) => c.text === t) ? i : [
        ...i,
        {
          id: ys(),
          text: t
        }
      ]));
    }, [
      oe
    ]);
    o.useEffect(() => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.registerChatCaptureHandlers) == null ? void 0 : _a2.call(d, {
        addReference: Ne
      }), () => {
        var _a3;
        return (_a3 = d == null ? void 0 : d.registerChatCaptureHandlers) == null ? void 0 : _a3.call(d, null);
      };
    }, [
      d,
      Ne
    ]);
    const _e = o.useCallback(() => ({
      selectedText: Ee,
      selectionRange: cn,
      attachedImages: ae,
      instruction: ne,
      systemPrompt: K,
      requestOptions: W,
      result: F,
      resultViewMode: ot,
      loading: st,
      error: at,
      templates: Pe,
      selectedTemplateId: it,
      templateName: Se,
      editingTemplateId: ie,
      profiles: J.map((e) => ({
        id: e.id,
        name: e.name,
        kind: e.kind,
        baseUrl: e.baseUrl
      })),
      selectedProfileId: Me,
      model: R,
      theme: h,
      uiMode: de,
      chatMessages: M,
      chatDraft: Re,
      chatLoading: ct,
      chatError: ut,
      chatReferences: fe,
      chatImages: he,
      chatThreads: Te,
      activeThreadId: X,
      canInsertIntoDocument: g
    }), [
      Ee,
      cn,
      ae,
      ne,
      K,
      W,
      F,
      ot,
      st,
      at,
      Pe,
      it,
      Se,
      ie,
      J,
      Me,
      R,
      h,
      de,
      M,
      Re,
      ct,
      ut,
      fe,
      he,
      Te,
      X,
      g
    ]), $e = o.useCallback(() => {
      if (G.current) {
        Xt(null, _e());
        return;
      }
      const e = q.current;
      !e || e.closed || Xt(e, _e());
    }, [
      _e
    ]), ve = o.useCallback(() => {
      const e = G.current ? null : q.current;
      q.current = null, G.current = false, po(e).finally(() => {
        be(false);
      });
    }, []), z = o.useCallback(() => {
      if (!w && !(m == null ? void 0 : m.getEditorApi) && !(m == null ? void 0 : m.getSelection) && !(m == null ? void 0 : m.getMarkdown)) return "";
      if (typeof (m == null ? void 0 : m.getSelection) == "function") {
        const { text: c, from: y, to: T } = m.getSelection();
        return ke((P) => P === c ? P : c), nt((P) => P.from === y && P.to === T ? P : {
          from: y,
          to: T
        }), c;
      }
      const { text: e, from: t, to: i } = tt(w, {
        ...(m == null ? void 0 : m.getEditorApi) ? {
          getEditorApi: m.getEditorApi
        } : {},
        ...(m == null ? void 0 : m.documentKey) ? {
          documentKey: m.documentKey
        } : {}
      });
      return ke((c) => c === e ? c : e), nt((c) => c.from === t && c.to === i ? c : {
        from: t,
        to: i
      }), e;
    }, [
      w,
      m
    ]), ue = o.useCallback(async () => {
      const e = await Ur();
      return pr(e), e;
    }, []);
    o.useEffect(() => {
      if (!p) return;
      b !== "floating" && (te(false), Gt(false)), (b === "split" || b === "docked") && ve(), re(""), fn();
      let e = 0, t = 0, i = 0;
      e = requestAnimationFrame(() => {
        z();
      });
      const c = () => {
        wn(), ue();
      }, y = window;
      return typeof y.requestIdleCallback == "function" ? t = y.requestIdleCallback(c) : i = window.setTimeout(c, 1), () => {
        cancelAnimationFrame(e), t && typeof y.cancelIdleCallback == "function" && y.cancelIdleCallback(t), i && window.clearTimeout(i);
      };
    }, [
      p,
      b,
      wn,
      z,
      ue,
      fn,
      ve
    ]), o.useEffect(() => {
      if (!(x == null ? void 0 : x.id) || !(x == null ? void 0 : x.kind)) {
        lt("");
        return;
      }
      lt(Cn(x.id, x.kind));
    }, [
      x == null ? void 0 : x.id,
      x == null ? void 0 : x.kind
    ]), o.useEffect(() => {
      const e = () => {
        He(""), Ke(null), ue();
      };
      return window.addEventListener(Ln, e), () => {
        window.removeEventListener(Ln, e);
      };
    }, [
      ue
    ]), o.useEffect(() => {
      p && z();
    }, [
      p,
      m,
      z
    ]), o.useEffect(() => {
      if (!p || j || b === "floating" && Z) return;
      const e = ({ text: t, from: i, to: c }) => {
        ke((y) => y === t ? y : t), nt((y) => y.from === i && y.to === c ? y : {
          from: i,
          to: c
        });
      };
      if (typeof (m == null ? void 0 : m.subscribeSelection) == "function") return m.subscribeSelection(e);
      if (w) return is(w, e, (m == null ? void 0 : m.documentKey) ? {
        documentKey: m.documentKey
      } : void 0);
    }, [
      p,
      Z,
      j,
      w,
      b,
      m,
      m == null ? void 0 : m.documentKey,
      m == null ? void 0 : m.subscribeSelection
    ]), o.useEffect(() => {
      $e();
    }, [
      $e
    ]), o.useEffect(() => {
      if (!j) return;
      const e = setInterval(() => {
        Nn(G.current ? null : q.current).then((t) => {
          t || (q.current = null, G.current = false, be(false));
        });
      }, 400);
      return () => clearInterval(e);
    }, [
      j
    ]), o.useEffect(() => {
      if (!p) {
        ve();
        return;
      }
      const e = () => {
        wo(G.current ? null : q.current);
      };
      return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
    }, [
      p,
      ve
    ]);
    const Ye = o.useCallback((e) => {
      const t = String(e || "").trim();
      lt(t);
      const i = Vt(t);
      i && mn((c) => ({
        ...c,
        outputType: i === "classification" ? "class" : "point"
      })), x && (Ae(x.id, t), x.kind === Kr ? Pn(t) : Ut(t));
    }, [
      x
    ]), De = o.useCallback(() => {
      const e = Ie.current;
      !e || e.signal.aborted || e.abort(Je());
    }, []), Oe = o.useCallback(() => {
      const e = ee.current;
      !e || e.signal.aborted || e.abort(Je());
    }, []), ht = o.useCallback(() => {
      if (ee.current && (ee.current.abort(Je()), ee.current = null), M.length > 0) {
        const t = X || Zt();
        se(M, t);
      }
      const e = Zt();
      Xe(e), Be(e), ce([]), we(""), me([]), pe([]), Q(""), qe(false), oe("chat");
    }, [
      M,
      X,
      se,
      oe
    ]), pt = o.useCallback((e) => {
      ee.current && (ee.current.abort(Je()), ee.current = null), X && M.length > 0 && se(M, X);
      const t = Te.find((i) => i.id === e);
      t && (Xe(t.id), Be(t.id), ce(t.messages), we(""), me([]), pe([]), Q(""), qe(false), oe("chat"));
    }, [
      X,
      M,
      Te,
      se,
      oe
    ]), gt = o.useCallback((e) => {
      hn((t) => {
        const i = ks(t, e);
        return Gn(i), i;
      }), X === e && (Xe(null), Be(null), ce([]), we(""), me([]), pe([]));
    }, [
      X
    ]), vr = o.useCallback(async (e) => {
      if (!(e == null ? void 0 : e.length)) return;
      const t = await Bn(e);
      pe((i) => [
        ...i,
        ...t
      ]);
    }, []), xt = o.useCallback((e) => {
      pe((t) => t.filter((i) => i.id !== e));
    }, []), ye = o.useCallback(async (e) => {
      if (ee.current) return;
      if (!x) {
        Q("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
        return;
      }
      if (!e.length) return;
      const t = X || Zt();
      X || (Xe(t), Be(t));
      const i = _n(), c = new AbortController();
      ee.current = c, Q(""), qe(true);
      const y = [
        ...e,
        {
          id: i,
          role: "assistant",
          content: ""
        }
      ];
      ce(y), se(y, t);
      try {
        const T = await go({
          profile: x,
          model: R,
          messages: e,
          systemPrompt: K,
          requestOptions: W,
          signal: c.signal,
          onChunk: (P) => {
            ce((B) => {
              const V = B.map((ge) => ge.id === i ? {
                ...ge,
                content: P
              } : ge);
              return se(V, t), V;
            });
          }
        });
        ce((P) => {
          const B = P.map((V) => V.id === i ? {
            ...V,
            content: T
          } : V);
          return se(B, t), B;
        });
      } catch (T) {
        if (Rn(T)) {
          Q("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4."), ce((P) => {
            const B = P.filter((V) => !(V.id === i && !V.content.trim()));
            return se(B, t), B;
          });
          return;
        }
        Q(T instanceof Error ? T.message : "LLM \uCC44\uD305 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), ce((P) => {
          const B = P.filter((V) => !(V.id === i && !V.content.trim()));
          return se(B, t), B;
        });
      } finally {
        ee.current === c && (ee.current = null, qe(false));
      }
    }, [
      x,
      R,
      K,
      W,
      X,
      se
    ]), bt = o.useCallback(async () => {
      const e = Re.trim();
      if (!e && fe.length === 0 && he.length === 0) return;
      const t = {
        id: _n(),
        role: "user",
        content: e,
        ...fe.length ? {
          references: fe
        } : {},
        ...he.length ? {
          images: he
        } : {}
      }, i = [
        ...M,
        t
      ];
      we(""), me([]), pe([]), await ye(i);
    }, [
      Re,
      fe,
      he,
      M,
      ye
    ]), wt = o.useCallback(async (e) => {
      const t = M.findIndex((y) => y.id === e);
      if (t < 0) return;
      const i = M[t];
      if (!i || i.role !== "user") return;
      const c = M.slice(0, t + 1);
      await ye(c);
    }, [
      M,
      ye
    ]), vt = o.useCallback(async (e) => {
      var _a2;
      const t = M.findIndex((T) => T.id === e);
      if (t < 0) return;
      const i = M[t];
      if (!i || i.role !== "assistant") return;
      let c = t - 1;
      for (; c >= 0 && ((_a2 = M[c]) == null ? void 0 : _a2.role) !== "user"; ) c -= 1;
      if (c < 0) return;
      const y = M.slice(0, c + 1);
      await ye(y);
    }, [
      M,
      ye
    ]), yt = o.useCallback(async (e) => {
      const t = e.role === "user" ? xo(e) : e.content;
      if (!t.trim()) return;
      await Sn(t, {
        message: e.role === "user" ? "\uC694\uCCAD\uC744 \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4" : "\uC751\uB2F5\uC744 \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4"
      }) || Q("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }, []), At = o.useCallback((e) => {
      if (!e.trim()) return;
      if (!g || !w && !N && !(m == null ? void 0 : m.applyResult)) {
        Q("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (m == null ? void 0 : m.applyResult) == "function" ? m.applyResult(e) : Ze({
        editorRef: w ?? {
          current: null
        },
        result: e,
        ...H ? {
          onChange: H
        } : {},
        ...N ? {
          getMarkdown: N
        } : {},
        ...(m == null ? void 0 : m.documentKey) ? {
          documentKey: m.documentKey
        } : {}
      }))) {
        Q("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      z();
    }, [
      g,
      w,
      N,
      m,
      H,
      z
    ]), Et = o.useCallback((e) => {
      if (!e.trim()) return;
      if (!g || !w && !N && !(m == null ? void 0 : m.applyResult)) {
        Q("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (m == null ? void 0 : m.applyResult) == "function" ? m.applyResult(e, {
        forceAppendAtEnd: true
      }) : Ze({
        editorRef: w ?? {
          current: null
        },
        result: e,
        ...H ? {
          onChange: H
        } : {},
        ...N ? {
          getMarkdown: N
        } : {},
        forceAppendAtEnd: true,
        ...(m == null ? void 0 : m.documentKey) ? {
          documentKey: m.documentKey
        } : {}
      }))) {
        Q("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      z();
    }, [
      g,
      w,
      N,
      m,
      H,
      z
    ]), kt = o.useCallback((e) => {
      e.trim() && C(e);
    }, [
      C
    ]), Ct = o.useCallback(async () => {
      if (Ie.current) return;
      const e = new AbortController();
      Ie.current = e, re(""), Y(""), dn(true);
      try {
        const t = Ee;
        if (!x) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
        if (x.kind === Mn || x.kind === Kt) {
          if (x.kind === Kt && Wr(R)) {
            const P = Vt(R);
            if (!P) throw new Error("\uC54C \uC218 \uC5C6\uB294 EXAONE Tabular \uBAA8\uB378\uC785\uB2C8\uB2E4.");
            if (!le.trainFile) throw new Error("\uD559\uC2B5\uC6A9 CSV(train_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
            if (!le.testFile) throw new Error("\uC608\uCE21\uC6A9 CSV(test_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
            Ae(x.id, R), Ut(R);
            const { runExaoneTabularPredict: B } = await Rr(async () => {
              const { runExaoneTabularPredict: ge } = await import("./exaoneTabularClient-B7G8BtH_.js");
              return {
                runExaoneTabularPredict: ge
              };
            }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])), V = await Ge(x.id, () => x.apiKey || "", async (ge) => {
              const jt = le.trainFile, Ft = le.testFile;
              return (await B({
                apiKey: ge,
                task: P,
                trainFile: jt,
                testFile: Ft,
                ...jt.name ? {
                  trainFileName: jt.name
                } : {},
                ...Ft.name ? {
                  testFileName: Ft.name
                } : {},
                targetColumn: le.targetColumn,
                outputType: le.outputType,
                signal: e.signal
              })).markdown;
            }, {
              missingKeyMessage: "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
            });
            Y(V);
            return;
          }
          const c = Xr(x);
          if (!c) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
          Ae(x.id, R), Ut(R);
          const y = x.kind === Kt ? "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." : "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694.", T = await Ge(x.id, () => x.apiKey || "", (P) => In({
            baseUrl: c,
            apiKey: P,
            model: R,
            instruction: ne,
            systemPrompt: K,
            selectedText: t,
            images: ae,
            requestOptions: W,
            onChunk: Y,
            signal: e.signal
          }), {
            allowEmpty: x.kind === Mn,
            missingKeyMessage: y
          });
          Y(T);
          return;
        }
        if (x.kind === qr) {
          const c = $r(), y = await Yr(c, {
            signal: e.signal
          }), T = (x.baseUrl || y.baseUrl || "").trim();
          if (!T) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
          const P = R.trim() || c.selectedModelId || y.models[0] || "";
          if (!P) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
          Ae(x.id, P);
          const B = await Ge(x.id, () => x.apiKey || c.apiKey || "no-key-required", (V) => In({
            baseUrl: T,
            apiKey: V,
            model: P,
            instruction: ne,
            systemPrompt: K,
            selectedText: t,
            images: ae,
            requestOptions: W,
            onChunk: Y,
            signal: e.signal
          }), {
            allowEmpty: true,
            missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
          });
          Y(B);
          return;
        }
        if (x.kind === Gr) {
          const c = Jr(), y = await Zr(c);
          if (!y.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
          const T = R.trim() || c.selectedModelId || y.models[0] || "";
          if (!T) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
          Ae(x.id, T);
          const P = await Eo({
            instruction: ne,
            systemPrompt: K,
            selectedText: t,
            images: ae,
            requestOptions: W,
            onChunk: Y,
            signal: e.signal
          });
          Y(P);
          return;
        }
        if (ro(R)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
        Ae(x.id, R), Pn(R);
        const i = await Ge(x.id, () => x.apiKey || "", (c) => oo({
          apiKey: c,
          model: R,
          instruction: ne,
          systemPrompt: K,
          selectedText: t,
          images: ae,
          requestOptions: W,
          onChunk: Y,
          signal: e.signal
        }), {
          missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
        });
        Y(i);
      } catch (t) {
        if (Rn(t)) {
          re("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
          return;
        }
        re(t instanceof Error ? t.message : "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        Ie.current === e && (Ie.current = null, dn(false));
      }
    }, [
      Ee,
      ae,
      x,
      R,
      ne,
      K,
      W,
      le
    ]), Lt = o.useCallback(() => {
      if (!F) return;
      if (!g || !w && !N && !(m == null ? void 0 : m.applyResult)) {
        re("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (m == null ? void 0 : m.applyResult) == "function" ? m.applyResult(F) : Ze({
        editorRef: w ?? {
          current: null
        },
        result: F,
        ...H ? {
          onChange: H
        } : {},
        ...N ? {
          getMarkdown: N
        } : {},
        ...(m == null ? void 0 : m.documentKey) ? {
          documentKey: m.documentKey
        } : {}
      }))) {
        re("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      z();
    }, [
      F,
      w,
      g,
      H,
      N,
      z,
      m
    ]), Pt = o.useCallback(() => {
      if (!F) return;
      if (!g || !w && !N && !(m == null ? void 0 : m.applyResult)) {
        re("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (m == null ? void 0 : m.applyResult) == "function" ? m.applyResult(F, {
        forceAppendAtEnd: true
      }) : Ze({
        editorRef: w ?? {
          current: null
        },
        result: F,
        ...H ? {
          onChange: H
        } : {},
        ...N ? {
          getMarkdown: N
        } : {},
        forceAppendAtEnd: true,
        ...(m == null ? void 0 : m.documentKey) ? {
          documentKey: m.documentKey
        } : {}
      }))) {
        re("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      z();
    }, [
      F,
      w,
      g,
      H,
      N,
      z,
      m
    ]), St = o.useCallback(async () => {
      if (!F) return;
      await Sn(F, {
        message: "\uACB0\uACFC\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4"
      }) || re("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }, [
      F
    ]), Mt = o.useCallback(() => {
      F && C(F);
    }, [
      F,
      C
    ]), Tt = o.useCallback((e) => {
      He(e);
      const t = Pe.find((i) => i.id === e);
      t && (Ve(t.instruction), Ce(typeof t.systemPrompt == "string" && t.systemPrompt.trim() ? t.systemPrompt : Bt()), Le(Wt(t.requestOptions)), Ue(t.name), Ke(t.id));
    }, [
      Pe
    ]), Rt = o.useCallback(async () => {
      const e = Se.trim(), t = ne.trim();
      if (!e || !t) {
        alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      try {
        const i = await Qr({
          id: ie || eo().id,
          name: e,
          instruction: t,
          systemPrompt: K.trim(),
          requestOptions: Wt(W),
          updatedAt: Date.now()
        });
        Ke(i.id), He(i.id), await ue();
      } catch (i) {
        alert(i instanceof Error ? i.message : "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      Se,
      ne,
      K,
      W,
      ie,
      ue
    ]), je = o.useCallback(() => {
      Ke(null), He(""), Ue(""), Ve(""), Ce(Bt()), Le({
        ...Tn
      });
    }, []), It = o.useCallback(async () => {
      if (ie && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
        await to(ie), je(), await ue();
      } catch (e) {
        alert(e instanceof Error ? e.message : "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      ie,
      je,
      ue
    ]), Fe = o.useCallback(async (e) => {
      e.length && rt((t) => [
        ...t,
        ...e
      ]);
    }, []), Nt = o.useCallback((e) => {
      e && rt((t) => t.filter((i) => i.id !== e));
    }, []), _t = o.useCallback(() => {
      rt([]);
    }, []), vn = o.useCallback(async (e) => {
      try {
        const t = await Bn(e);
        await Fe(t);
      } catch (t) {
        re(t instanceof Error ? t.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      Fe
    ]), yn = o.useCallback(async (e, t = {}) => {
      switch (e) {
        case "refresh-selection":
          z();
          break;
        case "set-selected-text":
          ke(typeof t.value == "string" ? t.value : "");
          break;
        case "run":
          await Ct();
          break;
        case "cancel-run":
          De();
          break;
        case "apply-result":
          Lt();
          break;
        case "append-result":
          Pt();
          break;
        case "copy-result":
          St();
          break;
        case "create-note-from-result":
          Mt();
          break;
        case "set-instruction":
          Ve(typeof t.value == "string" ? t.value : "");
          break;
        case "set-system-prompt":
          Ce(typeof t.value == "string" ? t.value : "");
          break;
        case "set-request-options":
          Le(Wt(t.value));
          break;
        case "set-result":
          Y(typeof t.value == "string" ? t.value : "");
          break;
        case "set-model":
          typeof t.value == "string" && Ye(t.value);
          break;
        case "set-llm-profile-id":
          typeof t.value == "string" && We(t.value);
          break;
        case "load-template":
          Tt(String(t.id ?? ""));
          break;
        case "save-template":
          await Rt();
          break;
        case "new-template":
          je();
          break;
        case "delete-template":
          await It();
          break;
        case "set-template-name":
          Ue(typeof t.value == "string" ? t.value : "");
          break;
        case "set-result-view-mode":
          (t.value === "preview" || t.value === "text") && un(t.value);
          break;
        case "add-images": {
          const i = (Array.isArray(t.images) ? t.images : []).map(Vn).filter((c) => c !== null);
          i.length && await Fe(i);
          break;
        }
        case "remove-image":
          Nt(String(t.id ?? ""));
          break;
        case "clear-images":
          _t();
          break;
        case "set-ui-mode":
          (t.value === "edit" || t.value === "chat") && oe(t.value);
          break;
        case "set-chat-draft":
          we(typeof t.value == "string" ? t.value : "");
          break;
        case "send-chat":
          await bt();
          break;
        case "cancel-chat":
          Oe();
          break;
        case "resend-chat-message":
          typeof t.id == "string" && await wt(t.id);
          break;
        case "regenerate-chat-message":
          typeof t.id == "string" && await vt(t.id);
          break;
        case "copy-chat-message": {
          const i = typeof t.id == "string" ? t.id : "", c = M.find((y) => y.id === i);
          c && yt(c);
          break;
        }
        case "apply-chat-result":
          typeof t.content == "string" && At(t.content);
          break;
        case "append-chat-result":
          typeof t.content == "string" && Et(t.content);
          break;
        case "create-note-from-chat-result":
          typeof t.content == "string" && kt(t.content);
          break;
        case "new-chat-thread":
          ht();
          break;
        case "select-chat-thread":
          typeof t.id == "string" && pt(t.id);
          break;
        case "delete-chat-thread":
          typeof t.id == "string" && gt(t.id);
          break;
        case "add-chat-reference":
          typeof t.text == "string" && Ne(t.text);
          break;
        case "remove-chat-reference":
          me((i) => i.filter((c) => c.id !== String(t.id ?? "")));
          break;
        case "add-chat-images": {
          const i = (Array.isArray(t.images) ? t.images : []).map(Vn).filter((c) => c !== null);
          i.length && pe((c) => [
            ...c,
            ...i
          ]);
          break;
        }
        case "remove-chat-image":
          xt(String(t.id ?? ""));
          break;
        case "close":
          _ == null ? void 0 : _(false);
          break;
      }
    }, [
      z,
      Ct,
      De,
      Lt,
      Pt,
      St,
      Mt,
      Ye,
      We,
      Tt,
      Rt,
      je,
      It,
      Fe,
      Nt,
      _t,
      oe,
      bt,
      Oe,
      wt,
      vt,
      yt,
      At,
      Et,
      kt,
      M,
      ht,
      pt,
      gt,
      Ne,
      xt,
      _
    ]);
    o.useEffect(() => {
      if (!p) return;
      let e = () => {
      }, t = false;
      return bo((i) => {
        if (i.type === Fn.READY) {
          i.source && typeof i.source.postMessage == "function" ? (q.current = i.source, G.current = false) : zn() && (q.current = null, G.current = true), be(true), Xt(G.current ? null : q.current, _e());
          return;
        }
        i.type === Fn.ACTION && i.action && yn(i.action, i.payload ?? {});
      }).then((i) => {
        if (t) {
          i();
          return;
        }
        e = i;
      }), () => {
        t = true, e();
      };
    }, [
      p,
      _e,
      yn
    ]);
    const yr = () => {
      te(true), Gt(true);
    }, Dt = () => {
      te(false), Gt(false), z();
    }, ze = o.useCallback(() => {
      De(), Oe(), ve(), _ == null ? void 0 : _(false);
    }, [
      De,
      Oe,
      ve,
      _
    ]);
    no($, ze, $, "llm-assist-full"), o.useEffect(() => {
      if (!$) return;
      const e = (t) => {
        t.key === "Escape" && (t.preventDefault(), ze());
      };
      return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
    }, [
      $,
      ze
    ]);
    const Ar = () => {
      (async () => {
        if (zn() && await Nn(null)) {
          G.current = true, q.current = null, await jn(null), $e(), be(true);
          return;
        }
        const e = q.current;
        if (e && !e.closed) {
          await jn(e), $e(), be(true);
          return;
        }
        const t = await Ao();
        if (!t) {
          alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          return;
        }
        t === "tauri" ? (G.current = true, q.current = null) : (G.current = false, q.current = t), be(true);
      })();
    }, Er = {
      theme: h,
      profiles: J,
      selectedProfileId: Me,
      onSelectedProfileIdChange: We,
      selectedProfile: x,
      model: R,
      onModelChange: Ye,
      selectedText: Ee,
      onSelectedTextChange: ke,
      onRefreshSelection: z,
      attachedImages: ae,
      onAddImages: Fe,
      onRemoveImage: Nt,
      onClearImages: _t,
      instruction: ne,
      onInstructionChange: Ve,
      systemPrompt: K,
      onSystemPromptChange: Ce,
      requestOptions: W,
      onRequestOptionsChange: Le,
      result: F,
      onResultChange: Y,
      resultViewMode: ot,
      onResultViewModeChange: un,
      loading: st,
      error: at,
      templates: Pe,
      selectedTemplateId: it,
      onLoadTemplate: Tt,
      templateName: Se,
      onTemplateNameChange: Ue,
      editingTemplateId: ie,
      onSaveTemplate: Rt,
      onNewTemplate: je,
      onDeleteTemplate: It,
      onRun: Ct,
      onCancelGeneration: De,
      onApplyResult: Lt,
      onAppendResult: Pt,
      onCopyResult: St,
      onCreateNoteFromResult: Mt,
      presentation: b,
      canInsertIntoDocument: g,
      exaoneTabular: le,
      onExaoneTabularChange: mn
    }, An = l.jsx(Oo, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: l.jsxs("div", {
        className: "flex shrink-0 flex-wrap items-center justify-end gap-1",
        children: [
          typeof D == "function" || typeof U == "function" || typeof E == "function" || typeof O == "function" ? l.jsx(ws, {
            presentation: b,
            onChange: k,
            splitEnabled: v && !$
          }) : null,
          b === "floating" && !$ ? l.jsx(en, {
            label: j ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30",
            onClick: Ar,
            disabled: j,
            children: l.jsx(So, {
              size: 15
            })
          }) : null,
          b === "floating" && !$ ? l.jsx(en, {
            label: "\uC228\uAE30\uAE30",
            onClick: yr,
            children: l.jsx(Mo, {
              size: 15
            })
          }) : null,
          l.jsx(en, {
            label: "\uB2EB\uAE30",
            onClick: ze,
            children: l.jsx(To, {
              size: 15
            })
          })
        ]
      })
    }), kr = l.jsxs("div", {
      className: "flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100",
      children: [
        l.jsx(qt, {
          size: 16,
          className: "shrink-0",
          "aria-hidden": true
        }),
        l.jsx("span", {
          className: "whitespace-nowrap",
          children: "AI \uB3C4\uC6B0\uBBF8"
        }),
        l.jsx(On, {
          value: de,
          onChange: oe
        })
      ]
    }), En = de === "chat" ? l.jsx(vo, {
      profiles: J,
      selectedProfileId: Me,
      onSelectedProfileIdChange: We,
      selectedProfile: x,
      model: R,
      onModelChange: Ye,
      systemPrompt: K,
      onSystemPromptChange: Ce,
      requestOptions: W,
      onRequestOptionsChange: Le,
      messages: M,
      draft: Re,
      onDraftChange: we,
      references: fe,
      onRemoveReference: (e) => me((t) => t.filter((i) => i.id !== e)),
      attachedImages: he,
      onAddImages: vr,
      onRemoveImage: xt,
      threads: Te,
      activeThreadId: X,
      onSelectThread: pt,
      onDeleteThread: gt,
      onNewThread: ht,
      loading: ct,
      error: ut,
      onSend: bt,
      onCancel: Oe,
      canInsertIntoDocument: g,
      onCopyMessage: yt,
      onResendMessage: wt,
      onRegenerateMessage: vt,
      onApplyResult: At,
      onAppendResult: Et,
      onCreateNoteFromResult: kt
    }) : l.jsx(yo, {
      ...Er,
      enableImageDropZone: false
    }), Cr = !!(p && b === "docked" && !$), Lr = !!(p && b === "split" && L && !$), Pr = !!(p && b === "floating" && !Z && !j && !$), Sr = !!(p && b === "floating" && (Z || j) && !$), kn = j ? "AI (\uC0C8\uCC3D)" : "AI", Mr = j ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC", Ot = l.jsx(Dn, {
      className: "flex h-full min-h-0 flex-col",
      disabled: !p,
      onFilesDrop: vn,
      children: l.jsxs("div", {
        className: "flex h-full min-h-0 flex-col",
        role: "complementary",
        "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8",
        children: [
          l.jsxs("div", {
            className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40",
            children: [
              kr,
              An
            ]
          }),
          l.jsx("div", {
            className: `min-h-0 flex-1 p-3 ${de === "chat" ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`,
            children: En
          })
        ]
      })
    }), Tr = l.jsx("div", {
      className: "absolute inset-0 z-60 flex min-h-0 flex-col bg-white dark:bg-odp-surface",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "AI \uB3C4\uC6B0\uBBF8",
      children: Ot
    });
    return l.jsxs(l.Fragment, {
      children: [
        l.jsx(ls, {
          enabled: !!p,
          onAdd: Ne
        }),
        $ ? Tr : null,
        Cr ? l.jsx(hs, {
          open: true,
          onClose: ze,
          children: Ot
        }) : null,
        Lr && L ? Ir.createPortal(Ot, L) : null,
        l.jsx(tn, {
          children: Sr ? l.jsxs(nn.div, {
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
            transition: Zn,
            onPointerDown: (e) => pn(e, j ? {} : {
              onTap: Dt
            }),
            onTouchStart: (e) => gn(e, j ? {} : {
              onTap: Dt
            }),
            onKeyDown: (e) => {
              j || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), Dt());
            },
            className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing",
            style: {
              left: mt.left,
              top: mt.top
            },
            title: Mr,
            "aria-label": kn,
            children: [
              l.jsx(qt, {
                size: 14,
                "aria-hidden": true
              }),
              kn
            ]
          }, "llm-assist-chip") : null
        }),
        l.jsx(tn, {
          children: Pr ? l.jsxs(nn.div, {
            ref: wr,
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
            transition: Zn,
            className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center",
            style: mt,
            role: "dialog",
            "aria-modal": "false",
            "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8",
            children: [
              l.jsxs(Dn, {
                className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg",
                disabled: !p,
                onFilesDrop: vn,
                children: [
                  l.jsxs("div", {
                    className: "flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40",
                    onPointerDown: (e) => pn(e),
                    onTouchStart: (e) => gn(e),
                    children: [
                      l.jsxs("div", {
                        className: "flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100",
                        children: [
                          l.jsx(Po, {
                            size: 16,
                            className: "shrink-0 opacity-60",
                            "aria-hidden": true
                          }),
                          l.jsx(qt, {
                            size: 16,
                            className: "shrink-0",
                            "aria-hidden": true
                          }),
                          l.jsx("span", {
                            className: "whitespace-nowrap",
                            children: "AI \uB3C4\uC6B0\uBBF8"
                          }),
                          l.jsx(On, {
                            value: de,
                            onChange: oe
                          })
                        ]
                      }),
                      An
                    ]
                  }),
                  l.jsx("div", {
                    className: `min-h-0 flex-1 p-3 ${de === "chat" ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`,
                    children: En
                  })
                ]
              }),
              l.jsx("div", {
                role: "separator",
                "aria-orientation": "vertical",
                "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC67C\uCABD)",
                className: "absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!",
                onPointerDown: (e) => bn("w", e)
              }),
              l.jsx("div", {
                role: "separator",
                "aria-orientation": "vertical",
                "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC624\uB978\uCABD)",
                className: "absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!",
                onPointerDown: (e) => bn("e", e)
              }),
              l.jsx("div", {
                role: "separator",
                "aria-orientation": "horizontal",
                "aria-label": "\uD06C\uAE30 \uC870\uC808",
                className: "absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!",
                onPointerDown: (e) => xn("sw", e)
              }),
              l.jsx("div", {
                role: "separator",
                "aria-orientation": "horizontal",
                "aria-label": "\uD06C\uAE30 \uC870\uC808",
                className: "absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!",
                onPointerDown: (e) => xn("se", e)
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
  aa as default
};
