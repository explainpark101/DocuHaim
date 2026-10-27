const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/NoteImageCropperJsPanel-BIiIzaXZ.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/cropPadImage-DVGv4Z4u.js","assets/index-DRAozU5b.js","assets/vendor-lucide-BnjwTb2j.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-radix-8kjzYRrX.js","assets/index-wpTDHEW7.css"])))=>i.map(i=>d[i]);
import { a as rt } from "./previewSelectionSync-CR47qWxc.js";
import { r as n, j as s, a as nt, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { aO as st, I as ot, aa as at, H as He, a_ as it, __tla as __tla_1 } from "./index-DRAozU5b.js";
import { _ as ct } from "./vendor-aws-hJDgVEKM.js";
import { g as lt, s as ut } from "./vendor-image-crop-ROMAbiiY.js";
import { g as dt, c as ft, o as ht, a as gt, b as pt } from "./cropPadImage-DVGv4Z4u.js";
import { L as Q, N as mt, A as xt, b as Ke, O as bt, V as yt, W as wt, X as kt, j as Ct } from "./vendor-lucide-BnjwTb2j.js";
import { E as vt, G as Rt, H as Te, I as ze, S as Ee, t as Me } from "./vendor-radix-8kjzYRrX.js";
let Zt, cr, ir, Tt;
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
  })()
]).then(async () => {
  const St = "data-md-footnote-to", qe = "data-md-footnote-back-button", Nt = 2, jt = "is-hidden";
  let be = null;
  const Z = /* @__PURE__ */ new WeakMap();
  Tt = function(e) {
    return /^#(?:source-\d+|fnref-\d+(?:-\d+)?)$/i.test(String(e || "").trim());
  };
  function zt(e, r) {
    var _a;
    try {
      const o = `#${CSS.escape(e)}, [data-md-footnote-id="${CSS.escape(e)}"]`, c = (_a = r == null ? void 0 : r.querySelector) == null ? void 0 : _a.call(r, o);
      if (c) return c;
    } catch {
    }
    return document.getElementById(e);
  }
  function Et(e) {
    return /^source-\d+$/i.test(e);
  }
  function Mt(e) {
    const r = rt(e);
    if (!r) {
      e.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
      return;
    }
    const o = e.getBoundingClientRect(), c = r.getBoundingClientRect(), l = r.scrollTop + (o.top - c.top) - Nt;
    r.scrollTo({
      top: Math.max(0, l),
      behavior: "smooth"
    });
  }
  function Ae(e, r) {
    const o = String(e || "").trim(), c = o.startsWith("#") ? o.slice(1) : o;
    if (!c) return false;
    const l = zt(c, r);
    return l ? (Et(c) ? Mt(l) : l.scrollIntoView({
      block: "nearest",
      behavior: "smooth"
    }), true) : false;
  }
  function Ie(e, r) {
    var _a, _b;
    const o = (_a = e == null ? void 0 : e.closest) == null ? void 0 : _a.call(e, ".md-editor-preview");
    return o && r.contains(o) ? o : ((_b = r.querySelector) == null ? void 0 : _b.call(r, ".md-editor-preview")) ?? r;
  }
  function At(e) {
    return (e == null ? void 0 : e.querySelector) ? e.querySelector(`[${qe}]`) : null;
  }
  function ye(e) {
    const r = At(e);
    if (!r) return;
    const o = !!(e && Z.get(e));
    r.classList.toggle(jt, !o), r.toggleAttribute("aria-hidden", !o), r.toggleAttribute("disabled", !o), r.setAttribute("data-footnote-return-target", (e && Z.get(e)) ?? "");
  }
  function me(e) {
    e && Z.delete(e), be = null, ye(e);
  }
  function It(e, r) {
    e && r ? Z.set(e, r) : e && Z.delete(e), be = r || null, ye(e);
  }
  ir = function(e) {
    if (!e || typeof e.addEventListener != "function") return;
    const r = (o) => {
      var _a, _b, _c, _d;
      const c = o;
      if (c.metaKey || c.ctrlKey || c.shiftKey || c.altKey || typeof c.button == "number" && c.button !== 0) return;
      const l = (_b = (_a = c.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, `[${qe}]`);
      if (l instanceof HTMLElement && e.contains(l)) {
        const u = Ie(c.target, e), g = u && Z.get(u) || be;
        if (!g) return;
        o.preventDefault(), o.stopPropagation(), Ae(g, u), me(u);
        return;
      }
      const a = (_d = (_c = c.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "a[href], a[data-md-footnote-to]");
      if (!a || !e.contains(a)) return;
      const p = a.getAttribute(St) || "", f = a.getAttribute("href") || "", y = p || (Tt(f) ? f.slice(1) : "");
      if (!y) return;
      const m = Ie(c.target, e);
      if (o.preventDefault(), o.stopPropagation(), y && y.startsWith("source-")) {
        const u = a.getAttribute("data-md-footnote-id") || a.id;
        u ? It(m, u) : me(m);
      } else me(m);
      Ae(y, m);
    };
    return e.addEventListener("click", r, true), ye(e), () => e.removeEventListener("click", r, true);
  };
  const We = new st("s3haim-image-crop-undo-history");
  We.version(1).stores({
    histories: "key, updatedAt"
  });
  const we = We.histories, Pe = 60, Pt = 350;
  function Bt(e) {
    const r = e.length > 96 ? `${e.slice(0, 48)}:${e.length}` : e, o = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return `crop:${r}:${o}`;
  }
  function xe(e) {
    return JSON.stringify(e);
  }
  function Be(e) {
    try {
      const r = JSON.parse(e);
      return !r || typeof r != "object" || !r.crop || typeof r.crop.x != "number" || typeof r.crop.y != "number" || typeof r.zoom != "number" || typeof r.lockRatio != "boolean" || typeof r.keepTransparency != "boolean" ? null : r;
    } catch {
      return null;
    }
  }
  function Xe(e) {
    return !Array.isArray(e) || e.length === 0 ? [] : e.length <= Pe ? e : e.slice(e.length - Pe);
  }
  async function _t({ key: e, stack: r, index: o }) {
    if (!e) return;
    const c = Xe(r), l = Math.max(0, Math.min(o ?? c.length - 1, c.length - 1));
    await we.put({
      key: e,
      stack: c,
      index: l,
      updatedAt: Date.now()
    });
  }
  async function _e(e) {
    e && await we.delete(e);
  }
  async function Lt() {
    await we.clear();
  }
  function Ot(e, r, o) {
    const c = Array.isArray(e) && e.length > 0 ? e : [];
    if (c.length === 0) return {
      stack: [
        o
      ],
      index: 0,
      changed: true
    };
    const l = Math.max(0, Math.min(r, c.length - 1));
    if (c[l] === o) return {
      stack: c,
      index: l,
      changed: false
    };
    const a = c.slice(0, l + 1);
    a.push(o);
    const p = Xe(a);
    return {
      stack: p,
      index: p.length - 1,
      changed: true
    };
  }
  function Dt({ enabled: e, imageSrc: r, getSnapshot: o, applySnapshot: c }) {
    const l = n.useRef([]), a = n.useRef(0), p = n.useRef(false), f = n.useRef(null), y = n.useRef(null), m = n.useRef(null), u = n.useRef(null), g = n.useRef(false), v = n.useRef(false), T = n.useRef(o), N = n.useRef(c);
    T.current = o, N.current = c;
    const [I, _] = n.useState(0), w = n.useCallback(() => _((h) => h + 1), []), z = n.useCallback(() => {
      f.current && (clearTimeout(f.current), f.current = null), y.current && (clearTimeout(y.current), y.current = null);
    }, []), R = n.useCallback((h, E, j) => {
      g.current || u.current !== h || (y.current && clearTimeout(y.current), y.current = setTimeout(() => {
        y.current = null, !(g.current || u.current !== h) && _t({
          key: h,
          stack: E,
          index: j
        }).then(() => {
          (g.current || u.current !== h) && _e(h).catch(() => {
          });
        }).catch((H) => {
          console.warn("[image-crop-undo] save failed:", H);
        });
      }, 200));
    }, []), M = n.useCallback(() => {
      f.current && (clearTimeout(f.current), f.current = null);
      const h = u.current, E = m.current;
      if (!h || E == null || g.current) return;
      m.current = null;
      const j = Ot(l.current, a.current, E);
      j.changed && (l.current = j.stack, a.current = j.index, R(h, j.stack, j.index), w());
    }, [
      w,
      R
    ]);
    n.useEffect(() => {
      if (!r) return;
      g.current = false, z();
      const h = Bt(r);
      return u.current = h, l.current = [], a.current = 0, m.current = null, v.current = false, w(), () => {
        g.current = true, z(), m.current = null;
        const E = u.current;
        u.current = null, l.current = [], a.current = 0, v.current = false, (async () => {
          try {
            E && await _e(E), await Lt();
          } catch {
          }
        })();
      };
    }, [
      e,
      r,
      w,
      z
    ]);
    const S = n.useCallback(() => {
      if (g.current || v.current) return;
      const h = u.current;
      if (!h) return;
      const E = xe(T.current());
      l.current = [
        E
      ], a.current = 0, v.current = true, R(h, l.current, a.current), w();
    }, [
      w,
      e,
      R
    ]), P = n.useCallback(() => {
      g.current || p.current || !v.current || !u.current || (m.current = xe(T.current()), f.current && clearTimeout(f.current), f.current = setTimeout(() => {
        f.current = null, M();
      }, Pt));
    }, [
      e,
      M
    ]), O = n.useCallback(() => {
      g.current || p.current || !v.current || !u.current || (m.current = xe(T.current()), M());
    }, [
      e,
      M
    ]), D = n.useCallback(() => {
      if (M(), a.current <= 0) return false;
      a.current -= 1;
      const h = l.current[a.current], E = h ? Be(h) : null;
      if (!E) return false;
      p.current = true, N.current(E);
      const j = u.current;
      return j && R(j, l.current, a.current), w(), requestAnimationFrame(() => {
        p.current = false;
      }), true;
    }, [
      w,
      M,
      R
    ]), A = n.useCallback(() => {
      if (M(), a.current >= l.current.length - 1) return false;
      a.current += 1;
      const h = l.current[a.current], E = h ? Be(h) : null;
      if (!E) return false;
      p.current = true, N.current(E);
      const j = u.current;
      return j && R(j, l.current, a.current), w(), requestAnimationFrame(() => {
        p.current = false;
      }), true;
    }, [
      w,
      M,
      R
    ]), L = v.current && a.current > 0, k = v.current && a.current < l.current.length - 1;
    return {
      ensureBaseline: S,
      recordSoon: P,
      recordNow: O,
      undo: D,
      redo: A,
      canUndo: L,
      canRedo: k
    };
  }
  const Ut = n.lazy(() => ct(() => import("./NoteImageCropperJsPanel-BIiIzaXZ.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]))), X = 48, Ft = 1.5, $t = 0.08, Le = "relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500", Oe = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Ht = {
    backgroundColor: "#ffffff",
    backgroundImage: [
      "linear-gradient(45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)",
      "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"
    ].join(","),
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
  }, Kt = [
    {
      id: "n",
      className: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize"
    },
    {
      id: "s",
      className: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize"
    },
    {
      id: "e",
      className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
    },
    {
      id: "w",
      className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
    },
    {
      id: "ne",
      className: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize"
    },
    {
      id: "nw",
      className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize"
    },
    {
      id: "se",
      className: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize"
    },
    {
      id: "sw",
      className: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize"
    }
  ];
  function De(e, r, o) {
    return {
      width: Math.min(r, Math.max(X, e.width)),
      height: Math.min(o, Math.max(X, e.height))
    };
  }
  function qt(e, r, o, c) {
    const l = c.width / 2, a = c.height / 2;
    let p = r, f = o;
    return e.includes("e") && (p = r + l), e.includes("w") && (p = r - l), e.includes("s") && (f = o + a), e.includes("n") && (f = o - a), {
      x: p,
      y: f
    };
  }
  function Wt(e, r, o, c, l, a, p) {
    const f = c - r, y = l - o;
    let m = a.width, u = a.height;
    if (e === "e" || e === "w" ? m = Math.abs(f) * 2 : (e === "n" || e === "s" || (m = Math.abs(f) * 2), u = Math.abs(y) * 2), p && a.height > 0) {
      const g = a.width / a.height;
      if (e === "e" || e === "w") u = m / g;
      else if (e === "n" || e === "s") m = u * g;
      else {
        const v = e.includes("e") ? 1 : -1, T = e.includes("s") ? 1 : -1, N = (f * v * g + y * T) / (g * g + 1);
        m = Math.abs(N) * g * 2, u = Math.abs(N) * 2;
      }
    }
    return {
      width: m,
      height: u
    };
  }
  function Xt(e) {
    return e.width > e.height ? e.width / e.naturalWidth : e.height / e.naturalHeight;
  }
  function Gt(e, r) {
    const o = [
      {
        left: e.originX,
        right: e.originX + e.cellWidth,
        top: e.originY,
        bottom: e.originY + e.cellHeight
      }
    ];
    return r && (Math.abs(r.x - e.originX) > 0.5 || Math.abs(r.y - e.originY) > 0.5 || Math.abs(r.width - e.cellWidth) > 0.5 || Math.abs(r.height - e.cellHeight) > 0.5) && o.push({
      left: r.x,
      right: r.x + r.width,
      top: r.y,
      bottom: r.y + r.height
    }), o;
  }
  function Yt(e) {
    return Math.max(16, Math.min(e.width, e.height) * $t);
  }
  function ie(e, r, o) {
    let c = null, l = o;
    for (const a of r) {
      const p = Math.abs(e - a);
      p <= l && (c = a, l = p);
    }
    return c;
  }
  function Ue(e, r, o = 0.5) {
    return Math.abs(e.x - r.x) < o && Math.abs(e.y - r.y) < o && Math.abs(e.width - r.width) < o && Math.abs(e.height - r.height) < o;
  }
  function Vt(e, r, o, c) {
    const l = Gt(r, o);
    if (l.length === 0) return null;
    const a = Yt(e), p = l.flatMap((S) => [
      S.left,
      S.right
    ]), f = l.flatMap((S) => [
      S.top,
      S.bottom
    ]), y = e.x, m = e.x + e.width, u = e.y, g = e.y + e.height;
    if (c === "translate") {
      let S = 0, P = a + 1, O = 0, D = a + 1;
      for (const L of p) for (const k of [
        L - y,
        L - m
      ]) {
        const h = Math.abs(k);
        h < P && (P = h, S = k);
      }
      for (const L of f) for (const k of [
        L - u,
        L - g
      ]) {
        const h = Math.abs(k);
        h < D && (D = h, O = k);
      }
      if (P > a && D > a) return null;
      const A = {
        x: e.x + (P <= a ? S : 0),
        y: e.y + (D <= a ? O : 0),
        width: e.width,
        height: e.height
      };
      return Ue(e, A) ? null : A;
    }
    const v = ie(y, p, a), T = ie(m, p, a), N = ie(u, f, a), I = ie(g, f, a);
    let _ = v ?? y, w = T ?? m, z = N ?? u, R = I ?? g;
    if (w - _ < X) if (v != null && T == null) w = _ + e.width;
    else if (T != null && v == null) _ = w - e.width;
    else {
      const S = (y + m) / 2;
      _ = S - e.width / 2, w = S + e.width / 2;
    }
    if (R - z < X) if (N != null && I == null) R = z + e.height;
    else if (I != null && N == null) z = R - e.height;
    else {
      const S = (u + g) / 2;
      z = S - e.height / 2, R = S + e.height / 2;
    }
    const M = {
      x: _,
      y: z,
      width: w - _,
      height: R - z
    };
    return v == null && T == null && N == null && I == null || Ue(e, M) ? null : M;
  }
  Zt = function({ imageSrc: e, fileName: r, onCancel: o, onConfirm: c }) {
    const l = n.useRef(null), a = n.useRef(null), p = n.useRef(null), f = n.useRef(null), y = n.useRef(null), m = n.useRef(null), u = n.useRef(false), g = n.useRef(false), v = n.useRef(0), T = n.useRef(false), N = n.useRef(null), [I, _] = n.useState("easy"), [w, z] = n.useState({
      x: 0,
      y: 0
    }), [R, M] = n.useState(1), [S, P] = n.useState(null), [O, D] = n.useState(false), [A, L] = n.useState(true), [k, h] = n.useState(false), [E, j] = n.useState(""), [H, ee] = n.useState(null), [G, x] = n.useState(null), [C, U] = n.useState(null), [$, K] = n.useState(null), [Ge, ue] = n.useState(null), q = n.useRef(null), J = n.useRef(w), W = n.useRef(R), te = n.useRef(O), re = n.useRef(A), ne = n.useRef(null);
    J.current = w, W.current = R, te.current = O, re.current = A;
    const Ye = n.useCallback(() => ({
      crop: {
        ...J.current
      },
      zoom: W.current,
      cropSize: a.current ? {
        ...a.current
      } : null,
      lockRatio: te.current,
      keepTransparency: re.current,
      croppedArea: q.current ? {
        ...q.current
      } : null
    }), []), se = n.useCallback((t) => {
      g.current = true, T.current = false, D(t.lockRatio), te.current = t.lockRatio, re.current = t.keepTransparency, t.cropSize ? (a.current = t.cropSize, P(t.cropSize)) : (a.current = null, P(null)), J.current = t.crop, W.current = t.zoom, z(t.crop), M(t.zoom), t.croppedArea && (q.current = t.croppedArea), window.requestAnimationFrame(() => {
        g.current = false;
      });
    }, []), Ve = n.useCallback((t) => {
      if (t.keepTransparency !== re.current) {
        ne.current = t, L(t.keepTransparency), D(t.lockRatio);
        return;
      }
      se(t);
    }, [
      se
    ]), { ensureBaseline: ke, recordSoon: oe, recordNow: F, undo: Ce, redo: ve } = Dt({
      enabled: true,
      imageSrc: e,
      getSnapshot: Ye,
      applySnapshot: Ve
    }), Re = n.useCallback((t) => {
      T.current = true, a.current = t, !v.current && (v.current = window.requestAnimationFrame(() => {
        v.current = 0, P(a.current);
      }));
    }, []), Ze = n.useCallback((t) => {
      T.current || N.current || g.current || (J.current = t, z(t), oe());
    }, [
      oe
    ]);
    n.useEffect(() => () => {
      v.current && window.cancelAnimationFrame(v.current);
    }, []), n.useEffect(() => {
      I === "easy" && (u.current = false);
    }, [
      I
    ]), n.useEffect(() => {
      _("easy"), z({
        x: 0,
        y: 0
      }), M(1), a.current = null, P(null), D(false), L(true), h(false), j(""), q.current = null, ee(null), p.current = null, f.current = null, y.current = null, u.current = false, T.current = false, ne.current = null, U(null), x(null), K(null), ue(null);
    }, [
      e
    ]), n.useEffect(() => {
      if (!e) return;
      let t = false;
      return dt(e).then((i) => {
        t || K(i);
      }).catch(() => {
        t || K(null);
      }), () => {
        t = true;
      };
    }, [
      e
    ]), n.useEffect(() => {
      if (!e) return;
      let t = false;
      const i = A ? null : "#ffffff";
      return ft(e, i, {
        padRatio: Ft,
        matteCenter: !!i && !A
      }).then((d) => {
        if (t) {
          URL.revokeObjectURL(d.src);
          return;
        }
        m.current && URL.revokeObjectURL(m.current), m.current = d.src, f.current = d.meta, u.current = false, x(d.src), U(d.meta);
      }).catch(() => {
        t || (x(e), U(null), f.current = null);
      }), () => {
        t = true;
      };
    }, [
      e,
      A
    ]), n.useEffect(() => {
      if (!C || !($ == null ? void 0 : $.hasTransparentMargin)) {
        y.current = null, ue(null);
        return;
      }
      const t = ht(C, $);
      y.current = t, ue(t);
    }, [
      C,
      $
    ]), n.useEffect(() => () => {
      m.current && (URL.revokeObjectURL(m.current), m.current = null);
    }, []), n.useEffect(() => {
      if (I !== "easy") return;
      const t = l.current;
      if (!t) return;
      const i = () => {
        const b = t.querySelector(".reactEasyCrop_CropArea");
        ee((B) => B === b ? B : b);
      };
      i();
      const d = new MutationObserver(i);
      return d.observe(t, {
        childList: true,
        subtree: true
      }), () => d.disconnect();
    }, [
      G,
      I
    ]);
    const de = n.useCallback(() => {
      var _a, _b;
      const t = l.current, i = H ?? (t == null ? void 0 : t.querySelector(".reactEasyCrop_CropArea")), d = t == null ? void 0 : t.getBoundingClientRect();
      if (!i || !d) return {
        cx: 0,
        cy: 0,
        width: ((_a = a.current) == null ? void 0 : _a.width) ?? 0,
        height: ((_b = a.current) == null ? void 0 : _b.height) ?? 0,
        maxWidth: 480,
        maxHeight: 360
      };
      const b = i.getBoundingClientRect();
      return {
        cx: b.left + b.width / 2,
        cy: b.top + b.height / 2,
        width: b.width,
        height: b.height,
        maxWidth: Math.max(X, d.width - 16),
        maxHeight: Math.max(X, d.height - 16)
      };
    }, [
      H
    ]), Y = n.useCallback((t, i) => {
      var _a;
      const d = p.current;
      if (!d) return;
      const b = Xt(d), B = (_a = l.current) == null ? void 0 : _a.getBoundingClientRect(), V = Math.max(X, ((B == null ? void 0 : B.width) ?? d.width) - 16), tt = Math.max(X, ((B == null ? void 0 : B.height) ?? d.height) - 16), je = !!(i == null ? void 0 : i.fitNatural) || !a.current ? 1 : Math.min(4, Math.max(1, W.current)), ge = De({
        width: t.width * b * je,
        height: t.height * b * je
      }, V, tt);
      a.current = ge, P(ge);
      const pe = lt(t, d, 0, ge, 1, 4);
      g.current = true, J.current = pe.crop, W.current = Math.min(4, Math.max(1, pe.zoom)), z(pe.crop), M(W.current), q.current = t, window.requestAnimationFrame(() => {
        g.current = false;
      });
    }, []), Se = n.useCallback((t, i) => {
      p.current = t;
      const d = ne.current;
      if (d) {
        ne.current = null, u.current = true, se(d);
        return;
      }
      Y({
        x: i.originX,
        y: i.originY,
        width: i.cellWidth,
        height: i.cellHeight
      }), window.requestAnimationFrame(() => {
        ke(), F();
      });
    }, [
      Y,
      se,
      ke,
      F
    ]), fe = n.useCallback((t, i) => {
      Se(t, i);
    }, [
      Se
    ]), he = n.useCallback((t = "translate") => {
      if (g.current) return;
      const i = q.current, d = f.current;
      if (!i || !d) return;
      const b = Vt(i, d, y.current, t);
      b && Y(b);
    }, [
      Y
    ]), Je = n.useCallback(() => {
      const t = y.current;
      t && (Y(t, {
        fitNatural: true
      }), window.requestAnimationFrame(() => {
        F();
      }));
    }, [
      Y,
      F
    ]);
    n.useEffect(() => {
      const t = p.current;
      !C || !t || u.current || (u.current = true, fe(t, C));
    }, [
      C,
      fe,
      G
    ]);
    const Ne = n.useCallback((t, i) => {
      q.current = i;
    }, []), Qe = n.useCallback((t) => {
      if (N.current || u.current === false && f.current) return;
      const i = a.current;
      i && Math.abs(i.width - t.width) < 0.5 && Math.abs(i.height - t.height) < 0.5 || (a.current = t, P(t));
    }, []);
    n.useEffect(() => {
      const t = (d) => {
        const b = N.current;
        if (!b) return;
        d.preventDefault();
        const B = de(), V = Wt(b.handle, B.cx, B.cy, d.clientX - b.offsetX, d.clientY - b.offsetY, {
          width: B.width,
          height: B.height
        }, b.lockRatio || d.shiftKey);
        Re(De(V, B.maxWidth, B.maxHeight));
      }, i = () => {
        if (!N.current) return;
        N.current = null;
        const d = () => {
          T.current = false, he("resize"), window.requestAnimationFrame(() => {
            F();
          });
        };
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(d);
        });
      };
      return window.addEventListener("pointermove", t, {
        passive: false
      }), window.addEventListener("pointerup", i), window.addEventListener("pointercancel", i), () => {
        window.removeEventListener("pointermove", t), window.removeEventListener("pointerup", i), window.removeEventListener("pointercancel", i);
      };
    }, [
      Re,
      de,
      F,
      he
    ]), n.useEffect(() => {
      if (I !== "easy") return;
      const t = (i) => {
        if (!(i.metaKey || i.ctrlKey) || i.altKey) return;
        const b = i.key.toLowerCase(), B = b === "z" && !i.shiftKey, V = b === "y" || b === "z" && i.shiftKey;
        !B && !V || (i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation(), !k && (V ? ve() : Ce()));
      };
      return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
    }, [
      k,
      I,
      ve,
      Ce
    ]);
    const et = async () => {
      const t = q.current;
      if (!(!t || k || !e)) {
        h(true), j("");
        try {
          const i = (r || "image").replace(/\.[^.]+$/, "") || "image", d = {
            keepTransparency: A,
            fileName: A ? `${i}-crop.png` : `${i}-crop.jpg`
          };
          if (f.current) {
            const b = await gt(e, t, f.current, d);
            await c(b.file, b.area);
          } else {
            const B = await pt(G || e, t, d);
            await c(B, t);
          }
        } catch (i) {
          j(i instanceof Error ? i.message : String(i)), h(false);
        }
      }
    }, ae = G;
    return s.jsxs("div", {
      className: "flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-6",
      children: [
        s.jsx("h2", {
          className: "shrink-0 text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
          children: "\uC774\uBBF8\uC9C0 \uC790\uB974\uAE30"
        }),
        s.jsxs(vt, {
          value: I,
          onValueChange: (t) => {
            _(t === "editor" ? "editor" : "easy"), j(""), h(false);
          },
          className: "flex min-h-0 flex-1 flex-col gap-3",
          children: [
            s.jsxs(Rt, {
              className: "flex shrink-0 gap-1 rounded-lg border border-gray-200 p-1 dark:border-odp-borderSoft",
              children: [
                s.jsx(Te, {
                  value: "easy",
                  className: "flex-1 rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 outline-none transition data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-odp-muted dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white",
                  children: "\uBAA8\uBC14\uC77C \uC790\uB974\uAE30"
                }),
                s.jsx(Te, {
                  value: "editor",
                  className: "flex-1 rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 outline-none transition data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-odp-muted dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white",
                  children: "\uB370\uC2A4\uD06C\uD0D1 \uC790\uB974\uAE30"
                })
              ]
            }),
            s.jsx(ze, {
              value: "editor",
              className: "flex min-h-0 flex-1 flex-col outline-none data-[state=inactive]:hidden",
              children: s.jsx(n.Suspense, {
                fallback: s.jsxs("div", {
                  className: "flex min-h-[240px] flex-1 items-center justify-center text-sm text-neutral-500 dark:text-neutral-300",
                  children: [
                    s.jsx(Q, {
                      size: 18,
                      className: "mr-2 animate-spin"
                    }),
                    "Cropper.js \uC900\uBE44 \uC911\u2026"
                  ]
                }),
                children: s.jsx(Ut, {
                  imageSrc: e,
                  ...r ? {
                    fileName: r
                  } : {},
                  onCancel: o,
                  onConfirm: c
                })
              })
            }),
            s.jsxs(ze, {
              value: "easy",
              className: "flex min-h-0 flex-1 flex-col gap-3 outline-none data-[state=inactive]:hidden",
              children: [
                s.jsx("p", {
                  className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uBAA8\uC11C\uB9AC\xB7\uBCC0\uC744 \uB4DC\uB798\uADF8\uD574 \uBE44\uC728\uC744 \uC790\uC720\uB86D\uAC8C \uC870\uC808\uD558\uC138\uC694. Shift\uB97C \uB204\uB974\uBA74 \uBE44\uC728\uC774 \uC720\uC9C0\uB429\uB2C8\uB2E4. \uC774\uBBF8\uC9C0 \uBC14\uAE65(\uD22C\uBA85 \uC5EC\uBC31)\uAE4C\uC9C0 \uC798\uB77C \uB4A4\uCABD\uC5D0\uC11C\uBD80\uD130 \uC790\uB97C \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD22C\uBA85 PNG\uB294 \uC6D0\uBCF8\xB7\uBD88\uD22C\uBA85 \uCF58\uD150\uCE20 \uAC00\uC7A5\uC790\uB9AC\uC5D0 \uAC00\uAE4C\uC774 \uB450\uBA74 \uD06C\uAE30 \uC870\uC808\xB7\uC774\uB3D9 \uBAA8\uB450 \uC790\uB3D9\uC73C\uB85C \uB9DE\uCDA5\uB2C8\uB2E4."
                }),
                s.jsxs("div", {
                  ref: l,
                  className: "relative min-h-[220px] w-full flex-1 overflow-hidden rounded-lg",
                  style: A ? Ht : {
                    backgroundColor: "#ffffff"
                  },
                  children: [
                    ae ? s.jsx(ut, {
                      image: ae,
                      crop: w,
                      zoom: R,
                      minZoom: 1,
                      maxZoom: 4,
                      ...S ? {
                        cropSize: S,
                        aspect: S.width / Math.max(1, S.height)
                      } : {},
                      zoomWithScroll: true,
                      showGrid: true,
                      style: {
                        containerStyle: {
                          backgroundColor: "transparent"
                        },
                        cropAreaStyle: {
                          overflow: "visible"
                        }
                      },
                      onCropChange: Ze,
                      onZoomChange: (t) => {
                        T.current || N.current || g.current || (W.current = t, M(t), oe());
                      },
                      onCropComplete: Ne,
                      onCropAreaChange: Ne,
                      onCropSizeChange: Qe,
                      onInteractionEnd: () => {
                        he("translate"), window.requestAnimationFrame(() => {
                          F();
                        });
                      },
                      onMediaLoaded: (t) => {
                        p.current = t;
                        const i = f.current ?? C;
                        u.current || !i || (u.current = true, fe(t, i));
                      }
                    }) : s.jsxs("div", {
                      className: "flex h-full items-center justify-center text-sm text-neutral-500 dark:text-neutral-300",
                      children: [
                        s.jsx(Q, {
                          size: 18,
                          className: "mr-2 animate-spin"
                        }),
                        "\uC900\uBE44 \uC911\u2026"
                      ]
                    }),
                    H ? nt.createPortal(Kt.map((t) => s.jsx("button", {
                      type: "button",
                      "aria-label": `crop-handle-${t.id}`,
                      className: `pointer-events-auto absolute z-20 h-3.5 w-3.5 touch-none rounded-sm border border-white bg-blue-500 shadow ${t.className}`,
                      onPointerDown: (i) => {
                        i.preventDefault(), i.stopPropagation(), i.currentTarget.setPointerCapture(i.pointerId);
                        const d = de(), b = qt(t.id, d.cx, d.cy, {
                          width: d.width,
                          height: d.height
                        });
                        T.current = true, a.current = {
                          width: d.width,
                          height: d.height
                        }, N.current = {
                          handle: t.id,
                          offsetX: i.clientX - b.x,
                          offsetY: i.clientY - b.y,
                          lockRatio: O
                        };
                      }
                    }, t.id)), H) : null
                  ]
                }),
                Ge && ($ == null ? void 0 : $.hasTransparentMargin) ? s.jsxs("button", {
                  type: "button",
                  onClick: Je,
                  disabled: k || !ae,
                  className: "inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                  children: [
                    s.jsx(mt, {
                      size: 14
                    }),
                    "\uD22C\uBA85 \uC81C\uC678 \xB7 \uCF58\uD150\uCE20\uC5D0 \uB9DE\uCD94\uAE30"
                  ]
                }) : null,
                s.jsxs("label", {
                  className: "flex items-center gap-2 text-xs text-gray-600 dark:text-odp-muted",
                  children: [
                    s.jsx("span", {
                      className: "shrink-0",
                      children: "\uD655\uB300"
                    }),
                    s.jsx("input", {
                      type: "range",
                      min: 1,
                      max: 4,
                      step: 0.01,
                      value: R,
                      onChange: (t) => {
                        const i = Number(t.target.value);
                        W.current = i, M(i), oe();
                      },
                      onPointerUp: () => F(),
                      onKeyUp: () => F(),
                      className: "w-full accent-blue-600"
                    })
                  ]
                }),
                s.jsxs("label", {
                  className: "flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    s.jsxs("span", {
                      className: "min-w-0",
                      children: [
                        s.jsx("span", {
                          className: "block text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                          children: "\uBE44\uC728 \uC7A0\uAE08"
                        }),
                        s.jsx("span", {
                          className: "mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",
                          children: "\uB044\uBA74 \uAC00\uB85C\xB7\uC138\uB85C\uB97C \uB530\uB85C \uB298\uB824 \uBE44\uC728\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    }),
                    s.jsx(Ee, {
                      className: Le,
                      checked: O,
                      onCheckedChange: (t) => {
                        const i = !!t;
                        te.current = i, D(i), window.requestAnimationFrame(() => {
                          F();
                        });
                      },
                      "aria-label": "\uBE44\uC728 \uC7A0\uAE08",
                      children: s.jsx(Me, {
                        className: Oe
                      })
                    })
                  ]
                }),
                s.jsxs("label", {
                  className: "flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    s.jsxs("span", {
                      className: "min-w-0",
                      children: [
                        s.jsx("span", {
                          className: "block text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                          children: "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0"
                        }),
                        s.jsx("span", {
                          className: "mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",
                          children: "\uB044\uBA74 \uD770 \uBC30\uACBD JPEG\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4. \uCF1C\uBA74 \uD22C\uBA85 \uC5EC\uBC31\uC744 \uCCB4\uD06C\uBB34\uB2AC\uB85C \uD45C\uC2DC\uD569\uB2C8\uB2E4."
                        })
                      ]
                    }),
                    s.jsx(Ee, {
                      className: Le,
                      checked: A,
                      onCheckedChange: (t) => {
                        L(!!t);
                      },
                      "aria-label": "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0",
                      children: s.jsx(Me, {
                        className: Oe
                      })
                    })
                  ]
                }),
                E ? s.jsx("p", {
                  className: "text-xs text-red-600 dark:text-red-300",
                  children: E
                }) : null,
                s.jsxs("div", {
                  className: "flex justify-end gap-2",
                  children: [
                    s.jsxs("button", {
                      type: "button",
                      onClick: o,
                      disabled: k,
                      className: "inline-flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                      children: [
                        s.jsx(xt, {
                          size: 16
                        }),
                        "\uB4A4\uB85C"
                      ]
                    }),
                    s.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        et();
                      },
                      disabled: k || !ae,
                      className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                      children: [
                        k ? s.jsx(Q, {
                          size: 16,
                          className: "animate-spin"
                        }) : s.jsx(Ke, {
                          size: 16
                        }),
                        k ? "\uC801\uC6A9 \uC911\u2026" : "\uC790\uB974\uAE30 \uC801\uC6A9"
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  };
  const Fe = 30;
  function ce(e) {
    return e ? e.endsWith("px") ? e.slice(0, -2) : e : "";
  }
  function le(e) {
    const r = String(e ?? "").trim();
    if (!r) return {
      normalized: null,
      error: null
    };
    const o = it(r);
    return o ? {
      normalized: o,
      error: null
    } : {
      normalized: null,
      error: "\uC22B\uC790, px, %, vh, vw \uD615\uC2DD\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uC608: 320, 320px, 50%, 40vh, 60vw)"
    };
  }
  function $e(e) {
    return e ? He(e) && e.length > Fe ? e.slice(0, Fe) : e : "";
  }
  cr = function({ isOpen: e, onClose: r, path: o = "", kind: c = "wiki", initialWidth: l, initialHeight: a, imageSrc: p = "", onApply: f, onStartFreeTransform: y, onCrop: m, onConvertToWiki: u, onConvertToImgbb: g }) {
    const [v, T] = n.useState(() => ce(l)), [N, I] = n.useState(() => ce(a)), [_, w] = n.useState(""), [z, R] = n.useState(false), [M, S] = n.useState(false), [P, O] = n.useState(false);
    n.useEffect(() => {
      e && (T(ce(l)), I(ce(a)), w(""), R(false), S(false), O(false));
    }, [
      e,
      l,
      a,
      o,
      p
    ]);
    const D = n.useMemo(() => $e(o), [
      o
    ]), A = c === "markdown" && typeof u == "function", L = typeof g == "function" && !ot(o), k = M || P, h = n.useMemo(() => {
      if (!o) return "";
      const x = $e(o), C = le(v).normalized, U = le(N).normalized;
      if (c === "markdown") {
        const K = [];
        return C && K.push(`w=${C}`), U && K.push(`h=${U}`), K.length ? `![](${x}){${K.join(" ")}}` : `![](${x})`;
      }
      const $ = [];
      return C && $.push(`w=${C}`), U && $.push(`h=${U}`), $.length ? `![[${x}|${$.join(" ")}]]` : `![[${x}]]`;
    }, [
      o,
      c,
      v,
      N
    ]), E = () => {
      const x = le(v);
      if (x.error) return w(x.error), null;
      const C = le(N);
      return C.error ? (w(C.error), null) : (w(""), {
        width: x.normalized,
        height: C.normalized
      });
    }, j = () => {
      const x = E();
      x && (f == null ? void 0 : f(x), r == null ? void 0 : r());
    }, H = async () => {
      if (!A || k) return;
      const x = E();
      if (x) {
        S(true), w("");
        try {
          await (u == null ? void 0 : u(x)), r == null ? void 0 : r();
        } catch (C) {
          const U = C instanceof Error && C.message ? C.message : "wiki image\uB85C \uBCC0\uACBD\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
          w(U);
        } finally {
          S(false);
        }
      }
    }, ee = async () => {
      if (!L || k) return;
      const x = E();
      if (x) {
        O(true), w("");
        try {
          await (g == null ? void 0 : g(x)), r == null ? void 0 : r();
        } catch (C) {
          const U = C instanceof Error && C.message ? C.message : "ImgBB\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
          w(U);
        } finally {
          O(false);
        }
      }
    }, G = !!p && typeof m == "function";
    return s.jsx(at, {
      isOpen: e,
      onClose: z ? () => R(false) : r,
      onConfirm: z || k ? void 0 : j,
      contentClassName: z ? "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]" : "max-w-lg",
      resizeHeight: z,
      layoutKey: z ? "crop" : "size",
      children: z ? s.jsx(Zt, {
        imageSrc: p,
        fileName: He(o) ? "image" : o,
        onCancel: () => R(false),
        onConfirm: async (x, C) => {
          await (m == null ? void 0 : m({
            file: x,
            widthPx: C.width,
            heightPx: C.height
          })), R(false), r == null ? void 0 : r();
        }
      }) : s.jsxs("div", {
        className: "p-6 flex flex-col gap-4",
        children: [
          s.jsx("h2", {
            className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
            children: "\uC774\uBBF8\uC9C0 \uD06C\uAE30"
          }),
          s.jsx("p", {
            className: "text-xs text-gray-500 dark:text-odp-muted break-all",
            children: D
          }),
          s.jsxs("label", {
            className: "block",
            children: [
              s.jsx("span", {
                className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1",
                children: "\uB108\uBE44 (\uBE44\uC6B0\uBA74 \uAE30\uBCF8)"
              }),
              s.jsx("input", {
                type: "text",
                value: v,
                onChange: (x) => T(x.target.value),
                onKeyDown: (x) => {
                  x.key === "Enter" && (x.preventDefault(), j());
                },
                placeholder: "\uC608: 320 / 320px / 50% / 60vw",
                disabled: k,
                className: "w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
              })
            ]
          }),
          s.jsxs("label", {
            className: "block",
            children: [
              s.jsx("span", {
                className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1",
                children: "\uB192\uC774 (\uBE44\uC6B0\uBA74 \uAE30\uBCF8)"
              }),
              s.jsx("input", {
                type: "text",
                value: N,
                onChange: (x) => I(x.target.value),
                onKeyDown: (x) => {
                  x.key === "Enter" && (x.preventDefault(), j());
                },
                placeholder: "\uC608: 240 / 240px / 40% / 40vh",
                disabled: k,
                className: "w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
              })
            ]
          }),
          s.jsx("p", {
            className: "text-xs text-gray-500 dark:text-odp-muted break-all",
            children: h
          }),
          _ ? s.jsx("p", {
            className: "text-xs text-red-600 dark:text-red-300",
            children: _
          }) : null,
          s.jsxs("div", {
            className: "flex flex-wrap justify-end gap-2",
            children: [
              A ? s.jsxs("button", {
                type: "button",
                onClick: () => {
                  H();
                },
                disabled: k,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  M ? s.jsx(Q, {
                    size: 16,
                    className: "animate-spin"
                  }) : s.jsx(bt, {
                    size: 16
                  }),
                  "wiki image\uB85C \uBCC0\uACBD"
                ]
              }) : null,
              L ? s.jsxs("button", {
                type: "button",
                onClick: () => {
                  ee();
                },
                disabled: k,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  P ? s.jsx(Q, {
                    size: 16,
                    className: "animate-spin"
                  }) : s.jsx(yt, {
                    size: 16
                  }),
                  "ImgBB\uB85C \uBCC0\uD658"
                ]
              }) : null,
              G ? s.jsxs("button", {
                type: "button",
                onClick: () => R(true),
                disabled: k,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  s.jsx(Ke, {
                    size: 16
                  }),
                  "\uC790\uB974\uAE30"
                ]
              }) : null,
              typeof y == "function" ? s.jsxs("button", {
                type: "button",
                onClick: () => {
                  y(), r == null ? void 0 : r();
                },
                disabled: k,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  s.jsx(wt, {
                    size: 16
                  }),
                  "\uC790\uC720\uBCC0\uD615"
                ]
              }) : null,
              s.jsxs("button", {
                type: "button",
                onClick: r,
                disabled: k,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  s.jsx(kt, {
                    size: 16
                  }),
                  "\uCDE8\uC18C"
                ]
              }),
              s.jsxs("button", {
                type: "button",
                onClick: j,
                disabled: k,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-60",
                children: [
                  s.jsx(Ct, {
                    size: 16
                  }),
                  "\uC801\uC6A9"
                ]
              })
            ]
          })
        ]
      })
    });
  };
});
export {
  Zt as N,
  cr as W,
  __tla,
  ir as b,
  Tt as i
};
