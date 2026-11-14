const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/exaoneTabularClient-DhMxHlat.js","assets/index-BebLgvYF.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-lucide-B8TfEQX9.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-radix-CN5WtDh3.js","assets/index-DvXEXuwA.css"])))=>i.map(i=>d[i]);
import { _ as An } from "./vendor-aws-hJDgVEKM.js";
import { r as s, j as i, a as kn, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { cc as Mn, cd as ht, J as Sn, T as Tn, ce as Cn, cf as Rn, cg as In, bv as Nn, ch as Ze, ci as _n, g as Qe, q as On, b as _t, R as et, cj as Dn, ck as Ot, s as oe, h as jn, cl as Dt, cm as tt, L as jt, e as nt, Q as Fn, cn as Ee, t as zn, u as Vn, aE as Bn, co as Hn, f as Wn, cp as Kn, cq as Xn, cr as Un, cs as qn, ct as Yn, cu as $n, __tla as __tla_1 } from "./index-BebLgvYF.js";
import { i as Gn, g as Jn, __tla as __tla_2 } from "./OpenAiCompatibleModelSelect-BuEuB2ht.js";
import { L as Ft, c as Zn, g as zt, i as Qn, n as ot } from "./openaiCompatibleClient-BOKYLH0M.js";
import { g as eo } from "./appStatusBar-COMHAiNk.js";
import { E as to, S as no, C as oo } from "./vendor-codemirror-V7b8BJE-.js";
import { i as ro } from "./previewMirrorEdit-W1S5x5sj.js";
import { u as so } from "./LlamaCppModelSelect-DP1c1DGV.js";
import { f as ao, g as rt, h as io, j as Vt, k as lo, L as Bt, d as Ht, n as co, l as Wt, o as uo, e as Kt, __tla as __tla_3 } from "./LlmAssistPanel-CpECkqcr.js";
import { e as Xt, __tla as __tla_4 } from "./bootSplash-Z2krRgC9.js";
import { g as fo } from "./mlxVlmGenerateClient-DDX6zbQN.js";
import { A as dt, m as ft } from "./vendor-motion-Bv-XITR_.js";
import { x as mo, a0 as nn, a1 as on, b as rn, C as po, S as st, a2 as ho, a3 as go, a4 as xo, X as bo } from "./vendor-lucide-B8TfEQX9.js";
import { J as wo, w as sn, x as an, K as vo, y as ln, z as cn, A as un, M as yo, N as Eo, O as Po, v as Lo } from "./vendor-radix-CN5WtDh3.js";
import { r as Ao, n as ko } from "./llmAssistImages-DG7rjEWr.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-google-genai-BsvcYwA0.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./useLazyMermaidRender-BEGREvhj.js";
import { __tla as __tla_5 } from "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./ImageLightboxDownloadButton-C0tAjkn5.js";
import "./Kbd-Cnuyx3cZ.js";
import "./downloadImageSrc-egf9pfVN.js";
let Hr;
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
  const gt = "s3haim-llm-modal-position", dn = "s3haim-llm-modal-hidden", Mo = 420, mt = 280, pt = 240, So = 560, fn = 44, at = {
    leftVw: 55,
    topVh: 12
  };
  function To() {
    try {
      const e = localStorage.getItem(gt);
      if (!e) return {
        ...at
      };
      const o = JSON.parse(e), a = Number(o == null ? void 0 : o.leftVw), n = Number(o == null ? void 0 : o.topVh);
      return !Number.isFinite(a) || !Number.isFinite(n) ? {
        ...at
      } : {
        leftVw: Math.min(95, Math.max(0, a)),
        topVh: Math.min(95, Math.max(0, n))
      };
    } catch {
      return {
        ...at
      };
    }
  }
  function it(e) {
    const o = window.innerWidth || 1, a = window.innerHeight || 1, n = To(), c = Math.min(Mo, Math.max(mt, e.width - 16)), l = Math.min(fn + So, Math.max(pt, e.height - 16)), f = {
      leftPx: n.leftVw / 100 * o,
      topPx: n.topVh / 100 * a,
      widthPx: c,
      heightPx: l
    };
    return te(f, e);
  }
  function te(e, o) {
    const a = Math.max(mt, o.width), n = Math.max(pt, o.height), c = Math.min(a, Math.max(mt, e.widthPx)), l = Math.min(n, Math.max(pt, e.heightPx)), f = o.right - c, u = o.bottom - fn, k = Math.min(Math.max(o.left, e.leftPx), Math.max(o.left, f)), v = Math.min(Math.max(o.top, e.topPx), Math.max(o.top, u));
    return {
      leftPx: Math.round(k),
      topPx: Math.round(v),
      widthPx: Math.round(c),
      heightPx: Math.round(l)
    };
  }
  function Co(e) {
    const o = e ?? {
      left: 8,
      top: 8,
      right: window.innerWidth - 8,
      bottom: window.innerHeight - 8,
      width: window.innerWidth - 16,
      height: window.innerHeight - 16
    };
    try {
      const a = localStorage.getItem(gt);
      if (!a) return it(o);
      const n = JSON.parse(a);
      return Number.isFinite(Number(n == null ? void 0 : n.leftPx)) && Number.isFinite(Number(n == null ? void 0 : n.topPx)) && Number.isFinite(Number(n == null ? void 0 : n.widthPx)) && Number.isFinite(Number(n == null ? void 0 : n.heightPx)) ? te({
        leftPx: Number(n.leftPx),
        topPx: Number(n.topPx),
        widthPx: Number(n.widthPx),
        heightPx: Number(n.heightPx)
      }, o) : it(o);
    } catch {
      return it(o);
    }
  }
  function Ro(e, o) {
    const a = o ?? {
      left: 8,
      top: 8,
      right: window.innerWidth - 8,
      bottom: window.innerHeight - 8,
      width: window.innerWidth - 16,
      height: window.innerHeight - 16
    }, n = te(e, a);
    try {
      localStorage.setItem(gt, JSON.stringify(n));
    } catch {
    }
  }
  function Io() {
    try {
      return localStorage.getItem(dn) === "1";
    } catch {
      return false;
    }
  }
  function lt(e) {
    try {
      localStorage.setItem(dn, e ? "1" : "0");
    } catch {
    }
  }
  const No = "[data-app-editor-navbar]", _o = 56;
  function mn() {
    const e = document.querySelector(No);
    return e instanceof HTMLElement ? e : null;
  }
  function Oo() {
    const e = mn();
    return e ? e.getBoundingClientRect().bottom : _o;
  }
  function Do(e) {
    const o = e == null ? void 0 : e.current, a = (o == null ? void 0 : o.value) ?? o ?? null;
    return a && typeof a == "object" && "root" in a && a.root instanceof Element ? a.root : null;
  }
  function Ut(e) {
    const a = Oo(), n = eo(), c = Math.max(a + 1, n), l = {
      left: 8,
      top: Math.max(8, a),
      right: Math.max(8, window.innerWidth - 8),
      bottom: c,
      width: Math.max(0, window.innerWidth - 16),
      height: Math.max(0, c - Math.max(8, a))
    }, f = Do(e);
    if (!f) return l;
    const u = f.getBoundingClientRect(), k = mn(), v = k ? k.getBoundingClientRect().bottom : Math.max(u.top, a), A = u.left, d = u.right;
    return {
      left: A,
      top: v,
      right: d,
      bottom: c,
      width: Math.max(0, d - A),
      height: Math.max(0, c - v)
    };
  }
  const qt = 5, Yt = "llm-assist-modal-resize-cursor-style", Pe = "llm-assist-modal-corner-resize";
  function jo() {
    if (document.getElementById(Yt)) return;
    const e = document.createElement("style");
    e.id = Yt, e.textContent = `
    html.${Pe},
    html.${Pe} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(e);
  }
  function Fo(e) {
    return e === "e" || e === "w" ? "ew-resize" : e === "se" ? "nwse-resize" : "nesw-resize";
  }
  function zo(e) {
    jo();
    const o = Fo(e);
    document.documentElement.style.setProperty("--llm-assist-resize-cursor", o), document.documentElement.classList.add(Pe), document.body.style.userSelect = "none";
  }
  function Vo() {
    document.documentElement.classList.remove(Pe), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
  }
  function Bo(e, o) {
    return e.leftPx === o.leftPx && e.topPx === o.topPx && e.widthPx === o.widthPx && e.heightPx === o.heightPx;
  }
  function Ho(e, { enabled: o = true } = {}) {
    const a = s.useRef(Ut(e)), [n, c] = s.useState(() => Co(a.current)), l = s.useRef(null), f = s.useRef({
      active: false,
      startX: 0,
      startY: 0,
      startLayout: n
    }), u = s.useRef(null), k = s.useCallback(() => {
      const y = Ut(e);
      a.current = y, c((b) => {
        const g = te(b, y);
        return Bo(b, g) ? b : g;
      });
    }, [
      e
    ]);
    s.useEffect(() => {
      var _a, _b, _c;
      if (!o) return;
      k();
      let y = 0;
      const b = () => {
        y || (y = requestAnimationFrame(() => {
          y = 0, k();
        }));
      };
      window.addEventListener("resize", b);
      const g = ((_b = (_a = e == null ? void 0 : e.current) == null ? void 0 : _a.value) == null ? void 0 : _b.root) ?? ((_c = e == null ? void 0 : e.current) == null ? void 0 : _c.root) ?? null;
      let L = null;
      if (typeof ResizeObserver < "u") {
        if (L = new ResizeObserver(b), g) {
          L.observe(g);
          const w = g.querySelector(".md-editor-toolbar-wrapper") || g.querySelector(".md-editor-toolbar");
          w && L.observe(w);
        }
        const S = document.querySelector("[data-app-editor-navbar]");
        S && L.observe(S);
        const E = document.querySelector("[data-app-status-bar]");
        E && L.observe(E);
      }
      return () => {
        cancelAnimationFrame(y), window.removeEventListener("resize", b), L == null ? void 0 : L.disconnect();
      };
    }, [
      o,
      e,
      k
    ]);
    const v = s.useCallback((y) => {
      const b = te(y, a.current);
      return Ro(b, a.current), b;
    }, []), A = s.useCallback((y, b) => {
      const g = f.current;
      if (!g.active) return;
      const L = y - g.startX, S = b - g.startY;
      c(te({
        ...g.startLayout,
        leftPx: g.startLayout.leftPx + L,
        topPx: g.startLayout.topPx + S
      }, a.current));
    }, []), d = s.useCallback((y, { onTap: b } = {}) => {
      if (y.pointerType === "touch" || y.button !== 0) return;
      y.preventDefault();
      const g = y.clientX, L = y.clientY;
      let S = false;
      f.current = {
        active: true,
        startX: g,
        startY: L,
        startLayout: n
      };
      const E = (m) => {
        f.current.active && (Math.hypot(m.clientX - g, m.clientY - L) > qt && (S = true), A(m.clientX, m.clientY));
      }, w = () => {
        f.current.active && (f.current.active = false, document.removeEventListener("pointermove", E), document.removeEventListener("pointerup", w), c((m) => v(m)), S || (b == null ? void 0 : b()));
      };
      document.addEventListener("pointermove", E), document.addEventListener("pointerup", w);
    }, [
      A,
      n,
      v
    ]), O = s.useCallback((y, { onTap: b } = {}) => {
      const g = y.changedTouches;
      if (!(g == null ? void 0 : g.length)) return;
      const L = g[0];
      if (!L) return;
      const S = L.identifier, E = L.clientX, w = L.clientY;
      y.preventDefault();
      let m = false;
      f.current = {
        active: true,
        startX: E,
        startY: w,
        startLayout: n,
        touchIdentifier: S
      };
      const G = (B) => {
        if (!f.current.active) return;
        const K = Array.from(B.touches).find((I) => I.identifier === S);
        K && (Math.hypot(K.clientX - E, K.clientY - w) > qt && (m = true), A(K.clientX, K.clientY), B.preventDefault());
      }, H = () => {
        f.current.active && (f.current.active = false, document.removeEventListener("touchmove", G), document.removeEventListener("touchend", W), document.removeEventListener("touchcancel", W), c((B) => v(B)), m || (b == null ? void 0 : b()));
      }, W = (B) => {
        !f.current.active || !Array.from(B.changedTouches).some((I) => I.identifier === S) || H();
      };
      document.addEventListener("touchmove", G, {
        passive: false
      }), document.addEventListener("touchend", W, {
        passive: false
      }), document.addEventListener("touchcancel", W, {
        passive: false
      });
    }, [
      A,
      n,
      v
    ]), h = s.useCallback((y, b) => {
      const g = u.current;
      if (!g) return;
      const L = y - g.startX, S = b - g.startY, E = g.startLayout;
      let w;
      g.corner === "se" ? w = {
        leftPx: E.leftPx,
        topPx: E.topPx,
        widthPx: E.widthPx + L,
        heightPx: E.heightPx + S
      } : g.corner === "sw" ? w = {
        leftPx: E.leftPx + L,
        topPx: E.topPx,
        widthPx: E.widthPx - L,
        heightPx: E.heightPx + S
      } : g.corner === "e" ? w = {
        leftPx: E.leftPx,
        topPx: E.topPx,
        widthPx: E.widthPx + L,
        heightPx: E.heightPx
      } : w = {
        leftPx: E.leftPx + L,
        topPx: E.topPx,
        widthPx: E.widthPx - L,
        heightPx: E.heightPx
      }, c(te(w, a.current));
    }, []), C = s.useCallback((y, b) => {
      if (b.button !== 0) return;
      b.preventDefault(), b.stopPropagation(), u.current = {
        corner: y,
        startX: b.clientX,
        startY: b.clientY,
        startLayout: n
      }, zo(y);
      const g = b.currentTarget;
      g instanceof HTMLElement && typeof g.setPointerCapture == "function" && g.setPointerCapture(b.pointerId);
      const L = () => {
        u.current = null, Vo(), document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", E), document.removeEventListener("pointercancel", E);
      }, S = (w) => {
        w.preventDefault(), h(w.clientX, w.clientY);
      }, E = () => {
        u.current && (L(), c((w) => v(w)));
      };
      document.addEventListener("pointermove", S, {
        passive: false
      }), document.addEventListener("pointerup", E), document.addEventListener("pointercancel", E);
    }, [
      h,
      n,
      v
    ]), R = s.useCallback((y, b) => C(y, b), [
      C
    ]), D = {
      left: n.leftPx,
      top: n.topPx,
      width: n.widthPx,
      height: n.heightPx
    };
    return {
      layout: n,
      panelRef: l,
      panelStyle: D,
      startPositionDrag: d,
      startPositionTouchDrag: O,
      startCornerResize: R,
      startEdgeResize: C,
      refreshBounds: k
    };
  }
  function $t(e) {
    if (!e || typeof e != "object") return false;
    const o = e;
    return typeof o.getEditorView == "function" || typeof o.getSelectedText == "function";
  }
  function pn(e) {
    const o = e == null ? void 0 : e.current;
    if (!o || typeof o != "object") return null;
    if ($t(o)) return o;
    const a = o.value;
    return $t(a) ? a : null;
  }
  function hn(e) {
    return pn(e);
  }
  const Wo = [
    50,
    200,
    500,
    1e3
  ];
  function Ko(e, o = null) {
    if (o == null ? void 0 : o.dom) return o.dom.closest(".md-editor");
    const a = hn(e);
    return typeof Element < "u" && (a == null ? void 0 : a.root) instanceof Element ? a.root : null;
  }
  function Xo(e, { view: o = null, documentKey: a = null } = {}) {
    var _a;
    const n = o ?? Ae(e, {
      documentKey: a
    }).view, c = Ko(e, n);
    return ro(c) ? true : ((_a = ht(n, a)) == null ? void 0 : _a.everFocused) ? false : (n == null ? void 0 : n.state, true);
  }
  function Uo(e, o) {
    return e ? e.endsWith(`
`) ? o : `
${o}` : o;
  }
  function qo(e, o) {
    if (!e) return o;
    const a = e.endsWith(`
`) ? "" : `
`;
    return `${e}${a}${o}`;
  }
  function Le(e, o, a) {
    const n = Math.max(0, Math.min(o, e)), c = Math.max(n, Math.min(a, e));
    return {
      from: n,
      to: c
    };
  }
  function Yo(e, o, a, n, c) {
    if (typeof c != "function") return false;
    const l = Le(e.length, o, a), f = `${e.slice(0, l.from)}${n}${e.slice(l.to)}`;
    return c(f), true;
  }
  function Gt({ editorRef: e, result: o, onChange: a, getMarkdown: n, forceAppendAtEnd: c = false, documentKey: l = null }) {
    var _a, _b, _c;
    const f = Ae(e, {
      documentKey: l
    }), { view: u } = f;
    if (c || Xo(e, {
      view: u,
      documentKey: l
    })) {
      const C = ((_c = (_b = (_a = u == null ? void 0 : u.state) == null ? void 0 : _a.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? (typeof n == "function" ? n() : ""), R = Uo(C, o);
      if (u == null ? void 0 : u.state) {
        const D = C.length;
        return Jt(u, D, D, R, a);
      }
      return typeof a == "function" ? (a(qo(C, o)), true) : false;
    }
    const v = ht(u, l);
    let A = f.from, d = f.to;
    if ((!(u == null ? void 0 : u.hasFocus) && (v == null ? void 0 : v.everFocused) || A === d && (v == null ? void 0 : v.everFocused)) && (A = v.from, d = v.to), !(v == null ? void 0 : v.everFocused) && A === d && !f.text.trim()) return false;
    if (u == null ? void 0 : u.state) {
      const C = u.state.doc.length, R = Le(C, A, d);
      return Jt(u, R.from, R.to, o, a);
    }
    const h = typeof n == "function" ? n() : "";
    return Yo(h, A, d, o, a);
  }
  function $o(e, o, a) {
    var _a, _b;
    const n = e.state.selection.main, c = !!e.hasFocus, l = ht(e, a);
    if (c) {
      const k = e.state.doc.sliceString(n.from, n.to);
      if (k) return {
        text: k,
        from: n.from,
        to: n.to,
        view: e
      };
      if (l == null ? void 0 : l.everFocused) {
        const A = e.state.doc.length, { from: d, to: O } = Le(A, l.from, l.to);
        return {
          text: e.state.doc.sliceString(d, O),
          from: d,
          to: O,
          view: e
        };
      }
      const v = ((_a = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _a.call(o)) ?? "";
      return v ? {
        text: v,
        from: n.from,
        to: n.to,
        view: e
      } : {
        text: "",
        from: n.from,
        to: n.to,
        view: e
      };
    }
    if (l == null ? void 0 : l.everFocused) {
      const k = e.state.doc.length, { from: v, to: A } = Le(k, l.from, l.to);
      return {
        text: e.state.doc.sliceString(v, A),
        from: v,
        to: A,
        view: e
      };
    }
    const f = e.state.doc.sliceString(n.from, n.to);
    if (f) return {
      text: f,
      from: n.from,
      to: n.to,
      view: e
    };
    const u = ((_b = o == null ? void 0 : o.getSelectedText) == null ? void 0 : _b.call(o)) ?? "";
    return u ? {
      text: u,
      from: n.from,
      to: n.to,
      view: e
    } : {
      text: f,
      from: n.from,
      to: n.to,
      view: e
    };
  }
  function Ae(e, o) {
    var _a, _b, _c;
    const a = (o == null ? void 0 : o.documentKey) ?? null, n = ((_a = o == null ? void 0 : o.getEditorApi) == null ? void 0 : _a.call(o)) ?? pn(e), c = ((_b = n == null ? void 0 : n.getEditorView) == null ? void 0 : _b.call(n)) ?? null;
    if (c == null ? void 0 : c.state) return $o(c, n, a);
    const l = Mn(a);
    return (l == null ? void 0 : l.everFocused) ? {
      text: "",
      from: l.from,
      to: l.to,
      view: null
    } : {
      text: ((_c = n == null ? void 0 : n.getSelectedText) == null ? void 0 : _c.call(n)) ?? "",
      from: 0,
      to: 0,
      view: null
    };
  }
  function Go(e) {
    var _a, _b;
    return ((_b = (_a = hn(e)) == null ? void 0 : _a.getEditorView) == null ? void 0 : _b.call(_a)) ?? null;
  }
  function Jo(e, o, a) {
    let n = false, c = null, l = null;
    const f = [], u = (a == null ? void 0 : a.documentKey) ?? null, k = () => {
      n || o(Ae(e, {
        documentKey: u
      }));
    }, v = () => {
      l == null ? void 0 : l(), l = null, c = null;
    };
    let A = null, d = false;
    const O = () => {
      if (n) return true;
      const h = Go(e);
      if (!h || h === c) return !!h;
      v(), c = h, d = false, A || (A = new oo());
      const C = A, R = to.updateListener.of((D) => {
        D.selectionSet && k();
      });
      if (d) try {
        h.dispatch({
          effects: C.reconfigure(R)
        });
      } catch {
        d = false;
      }
      if (!d) try {
        h.dispatch({
          effects: no.appendConfig.of(C.of(R))
        }), d = true;
      } catch {
        return k(), true;
      }
      return l = () => {
        if (d) {
          try {
            h.dispatch({
              effects: C.reconfigure([])
            });
          } catch {
          }
          d = false;
        }
      }, k(), true;
    };
    if (!O()) for (const h of Wo) f.push(setTimeout(() => {
      n || O();
    }, h));
    return () => {
      n = true;
      for (const h of f) clearTimeout(h);
      v();
    };
  }
  function Jt(e, o, a, n, c) {
    var _a;
    return (e == null ? void 0 : e.state) ? (e.dispatch({
      changes: {
        from: o,
        to: a,
        insert: n
      },
      selection: {
        anchor: o + n.length
      }
    }), (_a = e.focus) == null ? void 0 : _a.call(e), c == null ? void 0 : c(e.state.doc.toString()), true) : false;
  }
  const Zo = 520, Qo = 12, Zt = 80, Qt = 300, er = 180, tr = Tn, nr = [
    0.4,
    0,
    0.2,
    1
  ];
  function ct(e) {
    return typeof window > "u" ? e * 5 : window.innerWidth * e / 100;
  }
  function en(e) {
    var _a;
    return e ? e.closest("[data-llm-assist-layout-root]") || ((_a = e.parentElement) == null ? void 0 : _a.parentElement) || e.parentElement : null;
  }
  function or({ open: e, onClose: o, children: a, className: n = "" }) {
    const c = s.useRef(null), [l, f] = s.useState(() => Math.max(Qt, Math.floor(ct(Zt)))), u = Math.max(1, Math.floor(ct(Qo)));
    s.useEffect(() => {
      if (!e) return;
      const h = () => {
        var _a;
        const g = (((_a = en(c.current)) == null ? void 0 : _a.clientWidth) ?? window.innerWidth) - er, L = Math.max(Qt, Math.floor(ct(Zt)));
        f(Math.max(u, Math.min(L, g)));
      };
      h();
      const C = requestAnimationFrame(h);
      window.addEventListener("resize", h);
      let R = null;
      const D = en(c.current);
      return D && typeof ResizeObserver < "u" && (R = new ResizeObserver(h), R.observe(D)), () => {
        cancelAnimationFrame(C), window.removeEventListener("resize", h), R == null ? void 0 : R.disconnect();
      };
    }, [
      u,
      e
    ]);
    const k = Math.max(1, Math.floor(u / 3)), { width: v, isResizing: A, handleProps: d } = Sn({
      storageKey: "s3haim_llm_assist_dock_width",
      defaultWidth: Zo,
      minWidth: u,
      maxWidth: Math.max(l, u),
      edge: "right",
      collapseBelowWidth: k,
      onCollapseBelowMin: typeof o == "function" ? o : void 0
    }), O = Math.min(v, l);
    return i.jsx(dt, {
      initial: false,
      children: e ? i.jsx(ft.div, {
        className: "relative h-full min-h-0 shrink-0 overflow-hidden",
        initial: {
          width: 0
        },
        animate: {
          width: O
        },
        exit: {
          width: 0
        },
        transition: A ? {
          duration: 0
        } : {
          duration: 0.28,
          ease: nr
        },
        children: i.jsxs("div", {
          ref: c,
          className: `relative flex h-full min-h-0 flex-col overflow-hidden border-l border-violet-300/50 bg-white dark:border-violet-700/60 dark:bg-odp-surface ${n}`,
          style: {
            width: O
          },
          children: [
            i.jsx(tr, {
              handleProps: {
                ...d,
                "aria-valuenow": Math.round(O),
                "aria-valuemax": Math.round(l)
              },
              isResizing: A,
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
  const rr = "inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", sr = "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50", ar = "z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
  function ir(e) {
    return e === "docked" ? on : e === "split" ? rn : nn;
  }
  function lr({ presentation: e, onChange: o, splitEnabled: a = true }) {
    const n = ir(e), c = [
      {
        value: "floating",
        label: "\uD50C\uB85C\uD305 \uCC3D",
        icon: nn
      },
      {
        value: "docked",
        label: "\uC6B0\uCE21\uC5D0 \uACE0\uC815",
        icon: on
      },
      {
        value: "split",
        label: "\uC2A4\uD50C\uB9BF \uCC3D",
        icon: rn,
        disabled: !a
      }
    ];
    return i.jsxs(wo, {
      children: [
        i.jsxs(sn, {
          children: [
            i.jsx(an, {
              asChild: true,
              children: i.jsx(vo, {
                asChild: true,
                children: i.jsxs("button", {
                  type: "button",
                  onPointerDown: (l) => l.stopPropagation(),
                  onTouchStart: (l) => l.stopPropagation(),
                  className: rr,
                  "aria-label": "\uD45C\uC2DC \uBC29\uC2DD",
                  children: [
                    i.jsx(n, {
                      size: 15,
                      "aria-hidden": true
                    }),
                    i.jsx(mo, {
                      size: 12,
                      "aria-hidden": true,
                      className: "opacity-70"
                    })
                  ]
                })
              })
            }),
            i.jsx(ln, {
              children: i.jsxs(cn, {
                side: "bottom",
                sideOffset: 6,
                className: "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50",
                children: [
                  "\uD45C\uC2DC \uBC29\uC2DD",
                  i.jsx(un, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        }),
        i.jsx(yo, {
          children: i.jsx(Eo, {
            side: "bottom",
            align: "end",
            sideOffset: 4,
            className: ar,
            onCloseAutoFocus: (l) => l.preventDefault(),
            children: c.map((l) => {
              const f = l.icon, u = e === l.value;
              return i.jsxs(Po, {
                disabled: !!l.disabled,
                className: `${sr} ${l.disabled ? "cursor-not-allowed opacity-40" : ""}`,
                onSelect: () => {
                  l.disabled || l.value === e || o(l.value);
                },
                children: [
                  i.jsx(f, {
                    size: 14,
                    className: "shrink-0 opacity-80",
                    "aria-hidden": true
                  }),
                  i.jsx("span", {
                    className: "min-w-0 flex-1",
                    children: l.label
                  }),
                  u ? i.jsx(po, {
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
  const cr = [
    0.4,
    0,
    0.2,
    1
  ], tn = {
    duration: 0.28,
    ease: cr
  }, ur = "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", dr = "z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50";
  function ut({ label: e, onClick: o, disabled: a, children: n }) {
    return i.jsxs(sn, {
      children: [
        i.jsx(an, {
          asChild: true,
          children: i.jsx("button", {
            type: "button",
            onPointerDown: (c) => c.stopPropagation(),
            onTouchStart: (c) => c.stopPropagation(),
            onClick: o,
            disabled: a,
            className: ur,
            "aria-label": e,
            children: n
          })
        }),
        i.jsx(ln, {
          children: i.jsxs(cn, {
            side: "bottom",
            sideOffset: 6,
            className: dr,
            children: [
              e,
              i.jsx(un, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  Hr = function({ editorRef: e = null, onChange: o, getMarkdown: a, llmProviderProfiles: n, open: c, onOpenChange: l, theme: f = "light" }) {
    var _a, _b, _c;
    const u = Cn(), k = Rn(), v = In(), { requestCreateFileWithContent: A } = Nn(), d = k ? k.open : !!c, O = k ? k.setOpen : l, h = (u == null ? void 0 : u.presentation) ?? "floating", C = u == null ? void 0 : u.setPresentation, R = u == null ? void 0 : u.openAsSplit, D = u == null ? void 0 : u.dockToRight, y = u == null ? void 0 : u.undockToFloating, b = u ? u.canInsertIntoDocument : !!e, g = !!(v == null ? void 0 : v.workspaceTabsEnabled), [L, S] = s.useState(() => Ze());
    s.useEffect(() => (S(Ze()), _n(() => {
      S(Ze());
    })), []);
    const E = s.useCallback((t) => {
      if (t === "split") {
        if (!g) return;
        R == null ? void 0 : R();
        return;
      }
      if (t === "docked") {
        D == null ? void 0 : D();
        return;
      }
      y == null ? void 0 : y();
    }, [
      g,
      R,
      D,
      y
    ]), w = ((_a = u == null ? void 0 : u.editorBridge) == null ? void 0 : _a.editorRef) ?? e, m = (u == null ? void 0 : u.editorBridge) ?? null, G = ((_b = u == null ? void 0 : u.editorBridge) == null ? void 0 : _b.onChange) ?? o, H = ((_c = u == null ? void 0 : u.editorBridge) == null ? void 0 : _c.getMarkdown) ?? a, W = s.useMemo(() => Array.isArray(n) ? n : [], [
      n
    ]), [B, K] = s.useState(() => Io()), [I, ne] = s.useState(false), [re, se] = s.useState(""), [xt, ke] = s.useState({
      from: 0,
      to: 0
    }), [J, Me] = s.useState([]), [X, me] = s.useState(""), [U, pe] = s.useState(() => Qe()), [q, he] = s.useState(() => ({
      ...Ft
    })), [N, F] = s.useState(""), [Se, bt] = s.useState("text"), [Te, wt] = s.useState(false), [Ce, Y] = s.useState(""), [ae, gn] = s.useState([]), [Re, ge] = s.useState(""), [ie, xe] = s.useState(""), [Z, be] = s.useState(null), [we, Ie, vt] = so(W), x = On(W, we), [T, Ne] = s.useState(() => x ? _t(x.id, x.kind) : ""), [Q, yt] = s.useState(() => ao(et(T) ?? "classification")), j = s.useRef(null), z = s.useRef(false), le = s.useRef(null), { panelRef: xn, panelStyle: _e, startPositionDrag: Et, startPositionTouchDrag: Pt, startCornerResize: Lt, startEdgeResize: At, refreshBounds: kt } = Ho(w, {
      enabled: d && h === "floating"
    }), ce = s.useCallback(() => ({
      selectedText: re,
      selectionRange: xt,
      attachedImages: J,
      instruction: X,
      systemPrompt: U,
      requestOptions: q,
      result: N,
      resultViewMode: Se,
      loading: Te,
      error: Ce,
      templates: ae,
      selectedTemplateId: Re,
      templateName: ie,
      editingTemplateId: Z,
      profiles: W.map((t) => ({
        id: t.id,
        name: t.name,
        kind: t.kind,
        baseUrl: t.baseUrl
      })),
      selectedProfileId: we,
      model: T,
      theme: f
    }), [
      re,
      xt,
      J,
      X,
      U,
      q,
      N,
      Se,
      Te,
      Ce,
      ae,
      Re,
      ie,
      Z,
      W,
      we,
      T,
      f
    ]), ve = s.useCallback(() => {
      if (z.current) {
        rt(null, ce());
        return;
      }
      const t = j.current;
      !t || t.closed || rt(t, ce());
    }, [
      ce
    ]), ue = s.useCallback(() => {
      const t = z.current ? null : j.current;
      j.current = null, z.current = false, io(t).finally(() => {
        ne(false);
      });
    }, []), V = s.useCallback(() => {
      if (!w && !(m == null ? void 0 : m.getEditorApi) && !(m == null ? void 0 : m.getSelection) && !(m == null ? void 0 : m.getMarkdown)) return "";
      if (typeof (m == null ? void 0 : m.getSelection) == "function") {
        const { text: P, from: M, to: $ } = m.getSelection();
        return se((_) => _ === P ? _ : P), ke((_) => _.from === M && _.to === $ ? _ : {
          from: M,
          to: $
        }), P;
      }
      const { text: t, from: r, to: p } = Ae(w, {
        ...(m == null ? void 0 : m.getEditorApi) ? {
          getEditorApi: m.getEditorApi
        } : {},
        ...(m == null ? void 0 : m.documentKey) ? {
          documentKey: m.documentKey
        } : {}
      });
      return se((P) => P === t ? P : t), ke((P) => P.from === r && P.to === p ? P : {
        from: r,
        to: p
      }), t;
    }, [
      w,
      m
    ]), ee = s.useCallback(async () => {
      const t = await Dn();
      return gn(t), t;
    }, []);
    s.useEffect(() => {
      if (!d) return;
      h !== "floating" && (K(false), lt(false)), (h === "split" || h === "docked") && ue(), Y(""), vt();
      let t = 0, r = 0, p = 0;
      t = requestAnimationFrame(() => {
        V();
      });
      const P = () => {
        kt(), ee();
      }, M = window;
      return typeof M.requestIdleCallback == "function" ? r = M.requestIdleCallback(P) : p = window.setTimeout(P, 1), () => {
        cancelAnimationFrame(t), r && typeof M.cancelIdleCallback == "function" && M.cancelIdleCallback(r), p && window.clearTimeout(p);
      };
    }, [
      d,
      h,
      kt,
      V,
      ee,
      vt,
      ue
    ]), s.useEffect(() => {
      if (!(x == null ? void 0 : x.id) || !(x == null ? void 0 : x.kind)) {
        Ne("");
        return;
      }
      Ne(_t(x.id, x.kind));
    }, [
      x == null ? void 0 : x.id,
      x == null ? void 0 : x.kind
    ]), s.useEffect(() => {
      const t = () => {
        ge(""), be(null), ee();
      };
      return window.addEventListener(Ot, t), () => {
        window.removeEventListener(Ot, t);
      };
    }, [
      ee
    ]), s.useEffect(() => {
      d && V();
    }, [
      d,
      m,
      V
    ]), s.useEffect(() => {
      if (!d || I || h === "floating" && B) return;
      const t = ({ text: r, from: p, to: P }) => {
        se((M) => M === r ? M : r), ke((M) => M.from === p && M.to === P ? M : {
          from: p,
          to: P
        });
      };
      if (typeof (m == null ? void 0 : m.subscribeSelection) == "function") return m.subscribeSelection(t);
      if (w) return Jo(w, t, (m == null ? void 0 : m.documentKey) ? {
        documentKey: m.documentKey
      } : void 0);
    }, [
      d,
      B,
      I,
      w,
      h,
      m,
      m == null ? void 0 : m.documentKey,
      m == null ? void 0 : m.subscribeSelection
    ]), s.useEffect(() => {
      ve();
    }, [
      ve
    ]), s.useEffect(() => {
      if (!I) return;
      const t = setInterval(() => {
        Vt(z.current ? null : j.current).then((r) => {
          r || (j.current = null, z.current = false, ne(false));
        });
      }, 400);
      return () => clearInterval(t);
    }, [
      I
    ]), s.useEffect(() => {
      if (!d) {
        ue();
        return;
      }
      const t = () => {
        co(z.current ? null : j.current);
      };
      return window.addEventListener("beforeunload", t), () => window.removeEventListener("beforeunload", t);
    }, [
      d,
      ue
    ]);
    const Oe = s.useCallback((t) => {
      const r = String(t || "").trim();
      Ne(r);
      const p = et(r);
      p && yt((P) => ({
        ...P,
        outputType: p === "classification" ? "class" : "point"
      })), x && (oe(x.id, r), x.kind === jn ? Dt(r) : tt(r));
    }, [
      x
    ]), ye = s.useCallback(() => {
      const t = le.current;
      !t || t.signal.aborted || t.abort(Zn());
    }, []), De = s.useCallback(async () => {
      if (le.current) return;
      const t = new AbortController();
      le.current = t, Y(""), F(""), wt(true);
      try {
        const r = re;
        if (!x) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
        if (x.kind === jt || x.kind === nt) {
          if (x.kind === nt && Fn(T)) {
            const _ = et(T);
            if (!_) throw new Error("\uC54C \uC218 \uC5C6\uB294 EXAONE Tabular \uBAA8\uB378\uC785\uB2C8\uB2E4.");
            if (!Q.trainFile) throw new Error("\uD559\uC2B5\uC6A9 CSV(train_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
            if (!Q.testFile) throw new Error("\uC608\uCE21\uC6A9 CSV(test_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
            oe(x.id, T), tt(T);
            const { runExaoneTabularPredict: qe } = await An(async () => {
              const { runExaoneTabularPredict: $e } = await import("./exaoneTabularClient-DhMxHlat.js");
              return {
                runExaoneTabularPredict: $e
              };
            }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])), Ye = await Ee(x.id, () => x.apiKey || "", async ($e) => {
              const Ge = Q.trainFile, Je = Q.testFile;
              return (await qe({
                apiKey: $e,
                task: _,
                trainFile: Ge,
                testFile: Je,
                ...Ge.name ? {
                  trainFileName: Ge.name
                } : {},
                ...Je.name ? {
                  testFileName: Je.name
                } : {},
                targetColumn: Q.targetColumn,
                outputType: Q.outputType,
                signal: t.signal
              })).markdown;
            }, {
              missingKeyMessage: "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
            });
            F(Ye);
            return;
          }
          const P = zn(x);
          if (!P) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
          oe(x.id, T), tt(T);
          const M = x.kind === nt ? "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." : "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694.", $ = await Ee(x.id, () => x.apiKey || "", (_) => zt({
            baseUrl: P,
            apiKey: _,
            model: T,
            instruction: X,
            systemPrompt: U,
            selectedText: r,
            images: J,
            requestOptions: q,
            onChunk: F,
            signal: t.signal
          }), {
            allowEmpty: x.kind === jt,
            missingKeyMessage: M
          });
          F($);
          return;
        }
        if (x.kind === Vn) {
          const P = Bn(), M = await Hn(P, {
            signal: t.signal
          }), $ = (x.baseUrl || M.baseUrl || "").trim();
          if (!$) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC11C\uBC84\uB97C \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.");
          const _ = T.trim() || P.selectedModelId || M.models[0] || "";
          if (!_) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
          oe(x.id, _);
          const qe = await Ee(x.id, () => x.apiKey || P.apiKey || "no-key-required", (Ye) => zt({
            baseUrl: $,
            apiKey: Ye,
            model: _,
            instruction: X,
            systemPrompt: U,
            selectedText: r,
            images: J,
            requestOptions: q,
            onChunk: F,
            signal: t.signal
          }), {
            allowEmpty: true,
            missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
          });
          F(qe);
          return;
        }
        if (x.kind === Wn) {
          const P = Kn(), M = await Xn(P);
          if (!M.running) throw new Error(`MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.
\uC124\uC815 > MLX-VLM (Tauri macOS)\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD558\uC138\uC694.`);
          const $ = T.trim() || P.selectedModelId || M.models[0] || "";
          if (!$) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
          oe(x.id, $);
          const _ = await fo({
            instruction: X,
            systemPrompt: U,
            selectedText: r,
            images: J,
            requestOptions: q,
            onChunk: F,
            signal: t.signal
          });
          F(_);
          return;
        }
        if (Gn(T)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
        oe(x.id, T), Dt(T);
        const p = await Ee(x.id, () => x.apiKey || "", (P) => Jn({
          apiKey: P,
          model: T,
          instruction: X,
          systemPrompt: U,
          selectedText: r,
          images: J,
          requestOptions: q,
          onChunk: F,
          signal: t.signal
        }), {
          missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
        });
        F(p);
      } catch (r) {
        if (Qn(r)) {
          Y("\uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
          return;
        }
        Y(r instanceof Error ? r.message : "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        le.current === t && (le.current = null, wt(false));
      }
    }, [
      re,
      J,
      x,
      T,
      X,
      U,
      q,
      Q
    ]), je = s.useCallback(() => {
      if (!N) return;
      if (!b || !w && !H && !(m == null ? void 0 : m.applyResult)) {
        Y("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (m == null ? void 0 : m.applyResult) == "function" ? m.applyResult(N) : Gt({
        editorRef: w ?? {
          current: null
        },
        result: N,
        ...G ? {
          onChange: G
        } : {},
        ...H ? {
          getMarkdown: H
        } : {},
        ...(m == null ? void 0 : m.documentKey) ? {
          documentKey: m.documentKey
        } : {}
      }))) {
        Y("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      V();
    }, [
      N,
      w,
      b,
      G,
      H,
      V,
      m
    ]), Fe = s.useCallback(() => {
      if (!N) return;
      if (!b || !w && !H && !(m == null ? void 0 : m.applyResult)) {
        Y("\uC0BD\uC785\uD560 \uBB38\uC11C \uC5D0\uB514\uD130\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        return;
      }
      if (!(typeof (m == null ? void 0 : m.applyResult) == "function" ? m.applyResult(N, {
        forceAppendAtEnd: true
      }) : Gt({
        editorRef: w ?? {
          current: null
        },
        result: N,
        ...G ? {
          onChange: G
        } : {},
        ...H ? {
          getMarkdown: H
        } : {},
        forceAppendAtEnd: true,
        ...(m == null ? void 0 : m.documentKey) ? {
          documentKey: m.documentKey
        } : {}
      }))) {
        Y("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC0BD\uC785\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      V();
    }, [
      N,
      w,
      b,
      G,
      H,
      V,
      m
    ]), ze = s.useCallback(async () => {
      if (!N) return;
      await Un(N, {
        message: "\uACB0\uACFC\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4"
      }) || Y("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }, [
      N
    ]), Ve = s.useCallback(() => {
      N && A(N);
    }, [
      N,
      A
    ]), Be = s.useCallback((t) => {
      ge(t);
      const r = ae.find((p) => p.id === t);
      r && (me(r.instruction), pe(typeof r.systemPrompt == "string" && r.systemPrompt.trim() ? r.systemPrompt : Qe()), he(ot(r.requestOptions)), xe(r.name), be(r.id));
    }, [
      ae
    ]), He = s.useCallback(async () => {
      const t = ie.trim(), r = X.trim();
      if (!t || !r) {
        alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      try {
        const p = await qn({
          id: Z || Yn().id,
          name: t,
          instruction: r,
          systemPrompt: U.trim(),
          requestOptions: ot(q),
          updatedAt: Date.now()
        });
        be(p.id), ge(p.id), await ee();
      } catch (p) {
        alert(p instanceof Error ? p.message : "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      ie,
      X,
      U,
      q,
      Z,
      ee
    ]), de = s.useCallback(() => {
      be(null), ge(""), xe(""), me(""), pe(Qe()), he({
        ...Ft
      });
    }, []), We = s.useCallback(async () => {
      if (Z && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
        await $n(Z), de(), await ee();
      } catch (t) {
        alert(t instanceof Error ? t.message : "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      Z,
      de,
      ee
    ]), fe = s.useCallback(async (t) => {
      t.length && Me((r) => [
        ...r,
        ...t
      ]);
    }, []), Ke = s.useCallback((t) => {
      t && Me((r) => r.filter((p) => p.id !== t));
    }, []), Xe = s.useCallback(() => {
      Me([]);
    }, []), Mt = s.useCallback(async (t) => {
      try {
        const r = await Ao(t);
        await fe(r);
      } catch (r) {
        Y(r instanceof Error ? r.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      fe
    ]), St = s.useCallback(async (t, r = {}) => {
      switch (t) {
        case "refresh-selection":
          V();
          break;
        case "set-selected-text":
          se(typeof r.value == "string" ? r.value : "");
          break;
        case "run":
          await De();
          break;
        case "cancel-run":
          ye();
          break;
        case "apply-result":
          je();
          break;
        case "append-result":
          Fe();
          break;
        case "copy-result":
          ze();
          break;
        case "create-note-from-result":
          Ve();
          break;
        case "set-instruction":
          me(typeof r.value == "string" ? r.value : "");
          break;
        case "set-system-prompt":
          pe(typeof r.value == "string" ? r.value : "");
          break;
        case "set-request-options":
          he(ot(r.value));
          break;
        case "set-result":
          F(typeof r.value == "string" ? r.value : "");
          break;
        case "set-model":
          typeof r.value == "string" && Oe(r.value);
          break;
        case "set-llm-profile-id":
          typeof r.value == "string" && Ie(r.value);
          break;
        case "load-template":
          Be(String(r.id ?? ""));
          break;
        case "save-template":
          await He();
          break;
        case "new-template":
          de();
          break;
        case "delete-template":
          await We();
          break;
        case "set-template-name":
          xe(typeof r.value == "string" ? r.value : "");
          break;
        case "set-result-view-mode":
          (r.value === "preview" || r.value === "text") && bt(r.value);
          break;
        case "add-images": {
          const p = (Array.isArray(r.images) ? r.images : []).map(ko).filter((P) => P !== null);
          p.length && await fe(p);
          break;
        }
        case "remove-image":
          Ke(String(r.id ?? ""));
          break;
        case "clear-images":
          Xe();
          break;
        case "close":
          O == null ? void 0 : O(false);
          break;
      }
    }, [
      V,
      De,
      ye,
      je,
      Fe,
      ze,
      Ve,
      Oe,
      Ie,
      Be,
      He,
      de,
      We,
      fe,
      Ke,
      Xe,
      O
    ]);
    s.useEffect(() => {
      if (!d) return;
      let t = () => {
      }, r = false;
      return lo((p) => {
        if (p.type === Kt.READY) {
          p.source && typeof p.source.postMessage == "function" ? (j.current = p.source, z.current = false) : Xt() && (j.current = null, z.current = true), ne(true), rt(z.current ? null : j.current, ce());
          return;
        }
        p.type === Kt.ACTION && p.action && St(p.action, p.payload ?? {});
      }).then((p) => {
        if (r) {
          p();
          return;
        }
        t = p;
      }), () => {
        r = true, t();
      };
    }, [
      d,
      ce,
      St
    ]);
    const bn = () => {
      K(true), lt(true);
    }, Ue = () => {
      K(false), lt(false), V();
    }, Tt = () => {
      ye(), ue(), O == null ? void 0 : O(false);
    }, wn = () => {
      (async () => {
        if (Xt() && await Vt(null)) {
          z.current = true, j.current = null, await Wt(null), ve(), ne(true);
          return;
        }
        const t = j.current;
        if (t && !t.closed) {
          await Wt(t), ve(), ne(true);
          return;
        }
        const r = await uo();
        if (!r) {
          alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          return;
        }
        r === "tauri" ? (z.current = true, j.current = null) : (z.current = false, j.current = r), ne(true);
      })();
    }, Ct = {
      theme: f,
      profiles: W,
      selectedProfileId: we,
      onSelectedProfileIdChange: Ie,
      selectedProfile: x,
      model: T,
      onModelChange: Oe,
      selectedText: re,
      onSelectedTextChange: se,
      onRefreshSelection: V,
      attachedImages: J,
      onAddImages: fe,
      onRemoveImage: Ke,
      onClearImages: Xe,
      instruction: X,
      onInstructionChange: me,
      systemPrompt: U,
      onSystemPromptChange: pe,
      requestOptions: q,
      onRequestOptionsChange: he,
      result: N,
      onResultChange: F,
      resultViewMode: Se,
      onResultViewModeChange: bt,
      loading: Te,
      error: Ce,
      templates: ae,
      selectedTemplateId: Re,
      onLoadTemplate: Be,
      templateName: ie,
      onTemplateNameChange: xe,
      editingTemplateId: Z,
      onSaveTemplate: He,
      onNewTemplate: de,
      onDeleteTemplate: We,
      onRun: De,
      onCancelGeneration: ye,
      onApplyResult: je,
      onAppendResult: Fe,
      onCopyResult: ze,
      onCreateNoteFromResult: Ve,
      presentation: h,
      canInsertIntoDocument: b,
      exaoneTabular: Q,
      onExaoneTabularChange: yt
    }, Rt = i.jsx(Lo, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: i.jsxs("div", {
        className: "flex shrink-0 flex-wrap items-center justify-end gap-1",
        children: [
          typeof C == "function" || typeof D == "function" || typeof y == "function" || typeof R == "function" ? i.jsx(lr, {
            presentation: h,
            onChange: E,
            splitEnabled: g
          }) : null,
          h === "floating" ? i.jsx(ut, {
            label: I ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30",
            onClick: wn,
            disabled: I,
            children: i.jsx(go, {
              size: 15
            })
          }) : null,
          h === "floating" ? i.jsx(ut, {
            label: "\uC228\uAE30\uAE30",
            onClick: bn,
            children: i.jsx(xo, {
              size: 15
            })
          }) : null,
          i.jsx(ut, {
            label: "\uB2EB\uAE30",
            onClick: Tt,
            children: i.jsx(bo, {
              size: 15
            })
          })
        ]
      })
    }), vn = !!(d && h === "docked"), yn = !!(d && h === "split" && L), En = !!(d && h === "floating" && !B && !I), Pn = !!(d && h === "floating" && (B || I)), It = I ? "AI (\uC0C8\uCC3D)" : "AI", Ln = I ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC", Nt = i.jsx(Bt, {
      className: "flex h-full min-h-0 flex-col",
      disabled: !d,
      onFilesDrop: Mt,
      children: i.jsxs("div", {
        className: "flex h-full min-h-0 flex-col",
        role: "complementary",
        "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8",
        children: [
          i.jsxs("div", {
            className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40",
            children: [
              i.jsxs("div", {
                className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100",
                children: [
                  i.jsx(st, {
                    size: 16,
                    className: "shrink-0",
                    "aria-hidden": true
                  }),
                  i.jsx("span", {
                    className: "whitespace-nowrap",
                    children: "AI \uB3C4\uC6B0\uBBF8"
                  })
                ]
              }),
              Rt
            ]
          }),
          i.jsx("div", {
            className: "min-h-0 flex-1 overflow-y-auto p-3",
            children: i.jsx(Ht, {
              ...Ct,
              enableImageDropZone: false
            })
          })
        ]
      })
    });
    return i.jsxs(i.Fragment, {
      children: [
        vn ? i.jsx(or, {
          open: true,
          onClose: Tt,
          children: Nt
        }) : null,
        yn && L ? kn.createPortal(Nt, L) : null,
        i.jsx(dt, {
          children: Pn ? i.jsxs(ft.div, {
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
            transition: tn,
            onPointerDown: (t) => Et(t, I ? {} : {
              onTap: Ue
            }),
            onTouchStart: (t) => Pt(t, I ? {} : {
              onTap: Ue
            }),
            onKeyDown: (t) => {
              I || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), Ue());
            },
            className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing",
            style: {
              left: _e.left,
              top: _e.top
            },
            title: Ln,
            "aria-label": It,
            children: [
              i.jsx(st, {
                size: 14,
                "aria-hidden": true
              }),
              It
            ]
          }, "llm-assist-chip") : null
        }),
        i.jsx(dt, {
          children: En ? i.jsxs(ft.div, {
            ref: xn,
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
            transition: tn,
            className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center",
            style: _e,
            role: "dialog",
            "aria-modal": "false",
            "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8",
            children: [
              i.jsxs(Bt, {
                className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg",
                disabled: !d,
                onFilesDrop: Mt,
                children: [
                  i.jsxs("div", {
                    className: "flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40",
                    onPointerDown: (t) => Et(t),
                    onTouchStart: (t) => Pt(t),
                    children: [
                      i.jsxs("div", {
                        className: "flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100",
                        children: [
                          i.jsx(ho, {
                            size: 16,
                            className: "shrink-0 opacity-60",
                            "aria-hidden": true
                          }),
                          i.jsx(st, {
                            size: 16,
                            className: "shrink-0",
                            "aria-hidden": true
                          }),
                          i.jsx("span", {
                            className: "whitespace-nowrap",
                            children: "AI \uB3C4\uC6B0\uBBF8"
                          })
                        ]
                      }),
                      Rt
                    ]
                  }),
                  i.jsx("div", {
                    className: "min-h-0 flex-1 overflow-y-auto p-3",
                    children: i.jsx(Ht, {
                      ...Ct,
                      enableImageDropZone: false
                    })
                  })
                ]
              }),
              i.jsx("div", {
                role: "separator",
                "aria-orientation": "vertical",
                "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC67C\uCABD)",
                className: "absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!",
                onPointerDown: (t) => At("w", t)
              }),
              i.jsx("div", {
                role: "separator",
                "aria-orientation": "vertical",
                "aria-label": "\uB108\uBE44 \uC870\uC808 (\uC624\uB978\uCABD)",
                className: "absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!",
                onPointerDown: (t) => At("e", t)
              }),
              i.jsx("div", {
                role: "separator",
                "aria-orientation": "horizontal",
                "aria-label": "\uD06C\uAE30 \uC870\uC808",
                className: "absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!",
                onPointerDown: (t) => Lt("sw", t)
              }),
              i.jsx("div", {
                role: "separator",
                "aria-orientation": "horizontal",
                "aria-label": "\uD06C\uAE30 \uC870\uC808",
                className: "absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!",
                onPointerDown: (t) => Lt("se", t)
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
  Hr as default
};
