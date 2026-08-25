const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/NoteImageCropperJsPanel-DGC6o8ul.js","assets/vendor-md-editor-CyUZNHY0.js","assets/vendor-react-SY5QCjFA.js","assets/storageImageHydration-Dv8YJDkk.js","assets/index-BGTd31p3.js","assets/vendor-aws-BNw5jQBi.js","assets/vendor-lucide-DpPvFd8E.js","assets/vendor-motion-YU7ZxHqi.js","assets/vendor-radix--fTcLYkF.js","assets/vendor-zip-Bez6qchM.js","assets/index-ljC4e9Ff.css"])))=>i.map(i=>d[i]);
import { r, j as n, a as Ze, __tla as __tla_0 } from "./vendor-react-SY5QCjFA.js";
import { cw as Ve, ga as Je, M as Qe, db as Le, gb as et, __tla as __tla_1 } from "./index-BGTd31p3.js";
import { _ as tt, __tla as __tla_2 } from "./vendor-md-editor-CyUZNHY0.js";
import { g as rt, s as nt } from "./vendor-image-crop-Loz3ogoo.js";
import { g as st, c as ot, o as at, a as it, b as ct } from "./storageImageHydration-Dv8YJDkk.js";
import { v as J, bM as lt, b6 as ut, aI as De, _ as dt, d as ft, bN as ht, X as pt, C as gt } from "./vendor-lucide-DpPvFd8E.js";
import { Y as mt, Z as xt, _ as Re, $ as Se, K as Ne, M as je } from "./vendor-radix--fTcLYkF.js";
let _t, Yt, Xt, qt;
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
  })()
]).then(async () => {
  const Ue = new Ve("s3haim-image-crop-undo-history");
  Ue.version(1).stores({
    histories: "key, updatedAt"
  });
  const me = Ue.histories, ze = 60, bt = 350;
  function yt(e) {
    const o = e.length > 96 ? `${e.slice(0, 48)}:${e.length}` : e, i = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return `crop:${o}:${i}`;
  }
  function ge(e) {
    return JSON.stringify(e);
  }
  function Me(e) {
    try {
      const o = JSON.parse(e);
      return !o || typeof o != "object" || !o.crop || typeof o.crop.x != "number" || typeof o.crop.y != "number" || typeof o.zoom != "number" || typeof o.lockRatio != "boolean" || typeof o.keepTransparency != "boolean" ? null : o;
    } catch {
      return null;
    }
  }
  function Oe(e) {
    return !Array.isArray(e) || e.length === 0 ? [] : e.length <= ze ? e : e.slice(e.length - ze);
  }
  async function wt({ key: e, stack: o, index: i }) {
    if (!e) return;
    const f = Oe(o), l = Math.max(0, Math.min(i ?? f.length - 1, f.length - 1));
    await me.put({
      key: e,
      stack: f,
      index: l,
      updatedAt: Date.now()
    });
  }
  async function Ee(e) {
    e && await me.delete(e);
  }
  async function kt() {
    await me.clear();
  }
  function Ct(e, o, i) {
    const f = Array.isArray(e) && e.length > 0 ? e : [];
    if (f.length === 0) return {
      stack: [
        i
      ],
      index: 0,
      changed: true
    };
    const l = Math.max(0, Math.min(o, f.length - 1));
    if (f[l] === i) return {
      stack: f,
      index: l,
      changed: false
    };
    const a = f.slice(0, l + 1);
    a.push(i);
    const p = Oe(a);
    return {
      stack: p,
      index: p.length - 1,
      changed: true
    };
  }
  function vt({ enabled: e, imageSrc: o, getSnapshot: i, applySnapshot: f }) {
    const l = r.useRef([]), a = r.useRef(0), p = r.useRef(false), h = r.useRef(null), v = r.useRef(null), b = r.useRef(null), u = r.useRef(null), g = r.useRef(false), C = r.useRef(false), j = r.useRef(i), N = r.useRef(f);
    j.current = i, N.current = f;
    const [A, B] = r.useState(0), x = r.useCallback(() => B((d) => d + 1), []), z = r.useCallback(() => {
      h.current && (clearTimeout(h.current), h.current = null), v.current && (clearTimeout(v.current), v.current = null);
    }, []), R = r.useCallback((d, M, E) => {
      g.current || u.current !== d || (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
        v.current = null, !(g.current || u.current !== d) && wt({
          key: d,
          stack: M,
          index: E
        }).then(() => {
          (g.current || u.current !== d) && Ee(d).catch(() => {
          });
        }).catch((W) => {
          console.warn("[image-crop-undo] save failed:", W);
        });
      }, 200));
    }, []), T = r.useCallback(() => {
      h.current && (clearTimeout(h.current), h.current = null);
      const d = u.current, M = b.current;
      if (!d || M == null || g.current) return;
      b.current = null;
      const E = Ct(l.current, a.current, M);
      E.changed && (l.current = E.stack, a.current = E.index, R(d, E.stack, E.index), x());
    }, [
      x,
      R
    ]);
    r.useEffect(() => {
      if (!o) return;
      g.current = false, z();
      const d = yt(o);
      return u.current = d, l.current = [], a.current = 0, b.current = null, C.current = false, x(), () => {
        g.current = true, z(), b.current = null;
        const M = u.current;
        u.current = null, l.current = [], a.current = 0, C.current = false, (async () => {
          try {
            M && await Ee(M), await kt();
          } catch {
          }
        })();
      };
    }, [
      e,
      o,
      x,
      z
    ]);
    const S = r.useCallback(() => {
      if (g.current || C.current) return;
      const d = u.current;
      if (!d) return;
      const M = ge(j.current());
      l.current = [
        M
      ], a.current = 0, C.current = true, R(d, l.current, a.current), x();
    }, [
      x,
      e,
      R
    ]), P = r.useCallback(() => {
      g.current || p.current || !C.current || !u.current || (b.current = ge(j.current()), h.current && clearTimeout(h.current), h.current = setTimeout(() => {
        h.current = null, T();
      }, bt));
    }, [
      e,
      T
    ]), D = r.useCallback(() => {
      g.current || p.current || !C.current || !u.current || (b.current = ge(j.current()), T());
    }, [
      e,
      T
    ]), U = r.useCallback(() => {
      if (T(), a.current <= 0) return false;
      a.current -= 1;
      const d = l.current[a.current], M = d ? Me(d) : null;
      if (!M) return false;
      p.current = true, N.current(M);
      const E = u.current;
      return E && R(E, l.current, a.current), x(), requestAnimationFrame(() => {
        p.current = false;
      }), true;
    }, [
      x,
      T,
      R
    ]), I = r.useCallback(() => {
      if (T(), a.current >= l.current.length - 1) return false;
      a.current += 1;
      const d = l.current[a.current], M = d ? Me(d) : null;
      if (!M) return false;
      p.current = true, N.current(M);
      const E = u.current;
      return E && R(E, l.current, a.current), x(), requestAnimationFrame(() => {
        p.current = false;
      }), true;
    }, [
      x,
      T,
      R
    ]), L = C.current && a.current > 0, y = C.current && a.current < l.current.length - 1;
    return {
      ensureBaseline: S,
      recordSoon: P,
      recordNow: D,
      undo: U,
      redo: I,
      canUndo: L,
      canRedo: y
    };
  }
  const Rt = r.lazy(() => tt(() => import("./NoteImageCropperJsPanel-DGC6o8ul.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))), q = 48, St = 1.5, Nt = 0.08, Te = "relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500", Ie = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", jt = {
    backgroundColor: "#ffffff",
    backgroundImage: [
      "linear-gradient(45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)",
      "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"
    ].join(","),
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
  }, zt = [
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
  function Ae(e, o, i) {
    return {
      width: Math.min(o, Math.max(q, e.width)),
      height: Math.min(i, Math.max(q, e.height))
    };
  }
  function Mt(e, o, i, f) {
    const l = f.width / 2, a = f.height / 2;
    let p = o, h = i;
    return e.includes("e") && (p = o + l), e.includes("w") && (p = o - l), e.includes("s") && (h = i + a), e.includes("n") && (h = i - a), {
      x: p,
      y: h
    };
  }
  function Et(e, o, i, f, l, a, p) {
    const h = f - o, v = l - i;
    let b = a.width, u = a.height;
    if (e === "e" || e === "w" ? b = Math.abs(h) * 2 : (e === "n" || e === "s" || (b = Math.abs(h) * 2), u = Math.abs(v) * 2), p && a.height > 0) {
      const g = a.width / a.height;
      if (e === "e" || e === "w") u = b / g;
      else if (e === "n" || e === "s") b = u * g;
      else {
        const C = e.includes("e") ? 1 : -1, j = e.includes("s") ? 1 : -1, N = (h * C * g + v * j) / (g * g + 1);
        b = Math.abs(N) * g * 2, u = Math.abs(N) * 2;
      }
    }
    return {
      width: b,
      height: u
    };
  }
  function Tt(e) {
    return e.width > e.height ? e.width / e.naturalWidth : e.height / e.naturalHeight;
  }
  function It(e, o) {
    const i = [
      {
        left: e.originX,
        right: e.originX + e.cellWidth,
        top: e.originY,
        bottom: e.originY + e.cellHeight
      }
    ];
    return o && (Math.abs(o.x - e.originX) > 0.5 || Math.abs(o.y - e.originY) > 0.5 || Math.abs(o.width - e.cellWidth) > 0.5 || Math.abs(o.height - e.cellHeight) > 0.5) && i.push({
      left: o.x,
      right: o.x + o.width,
      top: o.y,
      bottom: o.y + o.height
    }), i;
  }
  function At(e) {
    return Math.max(16, Math.min(e.width, e.height) * Nt);
  }
  function ae(e, o, i) {
    let f = null, l = i;
    for (const a of o) {
      const p = Math.abs(e - a);
      p <= l && (f = a, l = p);
    }
    return f;
  }
  function Pe(e, o, i = 0.5) {
    return Math.abs(e.x - o.x) < i && Math.abs(e.y - o.y) < i && Math.abs(e.width - o.width) < i && Math.abs(e.height - o.height) < i;
  }
  function Pt(e, o, i, f) {
    const l = It(o, i);
    if (l.length === 0) return null;
    const a = At(e), p = l.flatMap((S) => [
      S.left,
      S.right
    ]), h = l.flatMap((S) => [
      S.top,
      S.bottom
    ]), v = e.x, b = e.x + e.width, u = e.y, g = e.y + e.height;
    if (f === "translate") {
      let S = 0, P = a + 1, D = 0, U = a + 1;
      for (const L of p) for (const y of [
        L - v,
        L - b
      ]) {
        const d = Math.abs(y);
        d < P && (P = d, S = y);
      }
      for (const L of h) for (const y of [
        L - u,
        L - g
      ]) {
        const d = Math.abs(y);
        d < U && (U = d, D = y);
      }
      if (P > a && U > a) return null;
      const I = {
        x: e.x + (P <= a ? S : 0),
        y: e.y + (U <= a ? D : 0),
        width: e.width,
        height: e.height
      };
      return Pe(e, I) ? null : I;
    }
    const C = ae(v, p, a), j = ae(b, p, a), N = ae(u, h, a), A = ae(g, h, a);
    let B = C ?? v, x = j ?? b, z = N ?? u, R = A ?? g;
    if (x - B < q) if (C != null && j == null) x = B + e.width;
    else if (j != null && C == null) B = x - e.width;
    else {
      const S = (v + b) / 2;
      B = S - e.width / 2, x = S + e.width / 2;
    }
    if (R - z < q) if (N != null && A == null) R = z + e.height;
    else if (A != null && N == null) z = R - e.height;
    else {
      const S = (u + g) / 2;
      z = S - e.height / 2, R = S + e.height / 2;
    }
    const T = {
      x: B,
      y: z,
      width: x - B,
      height: R - z
    };
    return C == null && j == null && N == null && A == null || Pe(e, T) ? null : T;
  }
  _t = function({ imageSrc: e, fileName: o, onCancel: i, onConfirm: f }) {
    const l = r.useRef(null), a = r.useRef(null), p = r.useRef(null), h = r.useRef(null), v = r.useRef(null), b = r.useRef(null), u = r.useRef(false), g = r.useRef(false), C = r.useRef(0), j = r.useRef(false), N = r.useRef(null), [A, B] = r.useState("easy"), [x, z] = r.useState({
      x: 0,
      y: 0
    }), [R, T] = r.useState(1), [S, P] = r.useState(null), [D, U] = r.useState(false), [I, L] = r.useState(true), [y, d] = r.useState(false), [M, E] = r.useState(""), [W, Q] = r.useState(null), [X, w] = r.useState(null), [k, O] = r.useState(null), [H, F] = r.useState(null), [He, le] = r.useState(null), K = r.useRef(null), V = r.useRef(x), Y = r.useRef(R), ee = r.useRef(D), te = r.useRef(I), re = r.useRef(null);
    V.current = x, Y.current = R, ee.current = D, te.current = I;
    const We = r.useCallback(() => ({
      crop: {
        ...V.current
      },
      zoom: Y.current,
      cropSize: a.current ? {
        ...a.current
      } : null,
      lockRatio: ee.current,
      keepTransparency: te.current,
      croppedArea: K.current ? {
        ...K.current
      } : null
    }), []), ne = r.useCallback((t) => {
      g.current = true, j.current = false, U(t.lockRatio), ee.current = t.lockRatio, te.current = t.keepTransparency, t.cropSize ? (a.current = t.cropSize, P(t.cropSize)) : (a.current = null, P(null)), V.current = t.crop, Y.current = t.zoom, z(t.crop), T(t.zoom), t.croppedArea && (K.current = t.croppedArea), window.requestAnimationFrame(() => {
        g.current = false;
      });
    }, []), Fe = r.useCallback((t) => {
      if (t.keepTransparency !== te.current) {
        re.current = t, L(t.keepTransparency), U(t.lockRatio);
        return;
      }
      ne(t);
    }, [
      ne
    ]), { ensureBaseline: xe, recordSoon: se, recordNow: $, undo: be, redo: ye } = vt({
      enabled: true,
      imageSrc: e,
      getSnapshot: We,
      applySnapshot: Fe
    }), we = r.useCallback((t) => {
      j.current = true, a.current = t, !C.current && (C.current = window.requestAnimationFrame(() => {
        C.current = 0, P(a.current);
      }));
    }, []), Ke = r.useCallback((t) => {
      j.current || N.current || g.current || (V.current = t, z(t), se());
    }, [
      se
    ]);
    r.useEffect(() => () => {
      C.current && window.cancelAnimationFrame(C.current);
    }, []), r.useEffect(() => {
      A === "easy" && (u.current = false);
    }, [
      A
    ]), r.useEffect(() => {
      B("easy"), z({
        x: 0,
        y: 0
      }), T(1), a.current = null, P(null), U(false), L(true), d(false), E(""), K.current = null, Q(null), p.current = null, h.current = null, v.current = null, u.current = false, j.current = false, re.current = null, O(null), w(null), F(null), le(null);
    }, [
      e
    ]), r.useEffect(() => {
      if (!e) return;
      let t = false;
      return st(e).then((s) => {
        t || F(s);
      }).catch(() => {
        t || F(null);
      }), () => {
        t = true;
      };
    }, [
      e
    ]), r.useEffect(() => {
      if (!e) return;
      let t = false;
      const s = I ? null : "#ffffff";
      return ot(e, s, {
        padRatio: St,
        matteCenter: !!s && !I
      }).then((c) => {
        if (t) {
          URL.revokeObjectURL(c.src);
          return;
        }
        b.current && URL.revokeObjectURL(b.current), b.current = c.src, h.current = c.meta, u.current = false, w(c.src), O(c.meta);
      }).catch(() => {
        t || (w(e), O(null), h.current = null);
      }), () => {
        t = true;
      };
    }, [
      e,
      I
    ]), r.useEffect(() => {
      if (!k || !(H == null ? void 0 : H.hasTransparentMargin)) {
        v.current = null, le(null);
        return;
      }
      const t = at(k, H);
      v.current = t, le(t);
    }, [
      k,
      H
    ]), r.useEffect(() => () => {
      b.current && (URL.revokeObjectURL(b.current), b.current = null);
    }, []), r.useEffect(() => {
      if (A !== "easy") return;
      const t = l.current;
      if (!t) return;
      const s = () => {
        const m = t.querySelector(".reactEasyCrop_CropArea");
        Q((_) => _ === m ? _ : m);
      };
      s();
      const c = new MutationObserver(s);
      return c.observe(t, {
        childList: true,
        subtree: true
      }), () => c.disconnect();
    }, [
      X,
      A
    ]);
    const ue = r.useCallback(() => {
      var _a, _b;
      const t = l.current, s = W ?? (t == null ? void 0 : t.querySelector(".reactEasyCrop_CropArea")), c = t == null ? void 0 : t.getBoundingClientRect();
      if (!s || !c) return {
        cx: 0,
        cy: 0,
        width: ((_a = a.current) == null ? void 0 : _a.width) ?? 0,
        height: ((_b = a.current) == null ? void 0 : _b.height) ?? 0,
        maxWidth: 480,
        maxHeight: 360
      };
      const m = s.getBoundingClientRect();
      return {
        cx: m.left + m.width / 2,
        cy: m.top + m.height / 2,
        width: m.width,
        height: m.height,
        maxWidth: Math.max(q, c.width - 16),
        maxHeight: Math.max(q, c.height - 16)
      };
    }, [
      W
    ]), G = r.useCallback((t, s) => {
      var _a;
      const c = p.current;
      if (!c) return;
      const m = Tt(c), _ = (_a = l.current) == null ? void 0 : _a.getBoundingClientRect(), Z = Math.max(q, ((_ == null ? void 0 : _.width) ?? c.width) - 16), Ge = Math.max(q, ((_ == null ? void 0 : _.height) ?? c.height) - 16), ve = !!(s == null ? void 0 : s.fitNatural) || !a.current ? 1 : Math.min(4, Math.max(1, Y.current)), he = Ae({
        width: t.width * m * ve,
        height: t.height * m * ve
      }, Z, Ge);
      a.current = he, P(he);
      const pe = rt(t, c, 0, he, 1, 4);
      g.current = true, V.current = pe.crop, Y.current = Math.min(4, Math.max(1, pe.zoom)), z(pe.crop), T(Y.current), K.current = t, window.requestAnimationFrame(() => {
        g.current = false;
      });
    }, []), ke = r.useCallback((t, s) => {
      p.current = t;
      const c = re.current;
      if (c) {
        re.current = null, u.current = true, ne(c);
        return;
      }
      G({
        x: s.originX,
        y: s.originY,
        width: s.cellWidth,
        height: s.cellHeight
      }), window.requestAnimationFrame(() => {
        xe(), $();
      });
    }, [
      G,
      ne,
      xe,
      $
    ]), de = r.useCallback((t, s) => {
      ke(t, s);
    }, [
      ke
    ]), fe = r.useCallback((t = "translate") => {
      if (g.current) return;
      const s = K.current, c = h.current;
      if (!s || !c) return;
      const m = Pt(s, c, v.current, t);
      m && G(m);
    }, [
      G
    ]), Ye = r.useCallback(() => {
      const t = v.current;
      t && (G(t, {
        fitNatural: true
      }), window.requestAnimationFrame(() => {
        $();
      }));
    }, [
      G,
      $
    ]);
    r.useEffect(() => {
      const t = p.current;
      !k || !t || u.current || (u.current = true, de(t, k));
    }, [
      k,
      de,
      X
    ]);
    const Ce = r.useCallback((t, s) => {
      K.current = s;
    }, []), qe = r.useCallback((t) => {
      if (N.current || u.current === false && h.current) return;
      const s = a.current;
      s && Math.abs(s.width - t.width) < 0.5 && Math.abs(s.height - t.height) < 0.5 || (a.current = t, P(t));
    }, []);
    r.useEffect(() => {
      const t = (c) => {
        const m = N.current;
        if (!m) return;
        c.preventDefault();
        const _ = ue(), Z = Et(m.handle, _.cx, _.cy, c.clientX - m.offsetX, c.clientY - m.offsetY, {
          width: _.width,
          height: _.height
        }, m.lockRatio || c.shiftKey);
        we(Ae(Z, _.maxWidth, _.maxHeight));
      }, s = () => {
        if (!N.current) return;
        N.current = null;
        const c = () => {
          j.current = false, fe("resize"), window.requestAnimationFrame(() => {
            $();
          });
        };
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(c);
        });
      };
      return window.addEventListener("pointermove", t, {
        passive: false
      }), window.addEventListener("pointerup", s), window.addEventListener("pointercancel", s), () => {
        window.removeEventListener("pointermove", t), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", s);
      };
    }, [
      we,
      ue,
      $,
      fe
    ]), r.useEffect(() => {
      if (A !== "easy") return;
      const t = (s) => {
        if (!(s.metaKey || s.ctrlKey) || s.altKey) return;
        const m = s.key.toLowerCase(), _ = m === "z" && !s.shiftKey, Z = m === "y" || m === "z" && s.shiftKey;
        !_ && !Z || (s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), !y && (Z ? ye() : be()));
      };
      return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
    }, [
      y,
      A,
      ye,
      be
    ]);
    const Xe = async () => {
      const t = K.current;
      if (!(!t || y || !e)) {
        d(true), E("");
        try {
          const s = (o || "image").replace(/\.[^.]+$/, "") || "image", c = {
            keepTransparency: I,
            fileName: I ? `${s}-crop.png` : `${s}-crop.jpg`
          };
          if (h.current) {
            const m = await it(e, t, h.current, c);
            await f(m.file, m.area);
          } else {
            const _ = await ct(X || e, t, c);
            await f(_, t);
          }
        } catch (s) {
          E(s instanceof Error ? s.message : String(s)), d(false);
        }
      }
    }, oe = X;
    return n.jsxs("div", {
      className: "flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-6",
      children: [
        n.jsx("h2", {
          className: "shrink-0 text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
          children: "\uC774\uBBF8\uC9C0 \uC790\uB974\uAE30"
        }),
        n.jsxs(mt, {
          value: A,
          onValueChange: (t) => {
            B(t === "editor" ? "editor" : "easy"), E(""), d(false);
          },
          className: "flex min-h-0 flex-1 flex-col gap-3",
          children: [
            n.jsxs(xt, {
              className: "flex shrink-0 gap-1 rounded-lg border border-gray-200 p-1 dark:border-odp-borderSoft",
              children: [
                n.jsx(Re, {
                  value: "easy",
                  className: "flex-1 rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 outline-none transition data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-odp-muted dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white",
                  children: "\uBAA8\uBC14\uC77C \uC790\uB974\uAE30"
                }),
                n.jsx(Re, {
                  value: "editor",
                  className: "flex-1 rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 outline-none transition data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-odp-muted dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white",
                  children: "\uB370\uC2A4\uD06C\uD0D1 \uC790\uB974\uAE30"
                })
              ]
            }),
            n.jsx(Se, {
              value: "editor",
              className: "flex min-h-0 flex-1 flex-col outline-none data-[state=inactive]:hidden",
              children: n.jsx(r.Suspense, {
                fallback: n.jsxs("div", {
                  className: "flex min-h-[240px] flex-1 items-center justify-center text-sm text-neutral-500 dark:text-neutral-300",
                  children: [
                    n.jsx(J, {
                      size: 18,
                      className: "mr-2 animate-spin"
                    }),
                    "Cropper.js \uC900\uBE44 \uC911\u2026"
                  ]
                }),
                children: n.jsx(Rt, {
                  imageSrc: e,
                  ...o ? {
                    fileName: o
                  } : {},
                  onCancel: i,
                  onConfirm: f
                })
              })
            }),
            n.jsxs(Se, {
              value: "easy",
              className: "flex min-h-0 flex-1 flex-col gap-3 outline-none data-[state=inactive]:hidden",
              children: [
                n.jsx("p", {
                  className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uBAA8\uC11C\uB9AC\xB7\uBCC0\uC744 \uB4DC\uB798\uADF8\uD574 \uBE44\uC728\uC744 \uC790\uC720\uB86D\uAC8C \uC870\uC808\uD558\uC138\uC694. Shift\uB97C \uB204\uB974\uBA74 \uBE44\uC728\uC774 \uC720\uC9C0\uB429\uB2C8\uB2E4. \uC774\uBBF8\uC9C0 \uBC14\uAE65(\uD22C\uBA85 \uC5EC\uBC31)\uAE4C\uC9C0 \uC798\uB77C \uB4A4\uCABD\uC5D0\uC11C\uBD80\uD130 \uC790\uB97C \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD22C\uBA85 PNG\uB294 \uC6D0\uBCF8\xB7\uBD88\uD22C\uBA85 \uCF58\uD150\uCE20 \uAC00\uC7A5\uC790\uB9AC\uC5D0 \uAC00\uAE4C\uC774 \uB450\uBA74 \uD06C\uAE30 \uC870\uC808\xB7\uC774\uB3D9 \uBAA8\uB450 \uC790\uB3D9\uC73C\uB85C \uB9DE\uCDA5\uB2C8\uB2E4."
                }),
                n.jsxs("div", {
                  ref: l,
                  className: "relative min-h-[220px] w-full flex-1 overflow-hidden rounded-lg",
                  style: I ? jt : {
                    backgroundColor: "#ffffff"
                  },
                  children: [
                    oe ? n.jsx(nt, {
                      image: oe,
                      crop: x,
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
                      onCropChange: Ke,
                      onZoomChange: (t) => {
                        j.current || N.current || g.current || (Y.current = t, T(t), se());
                      },
                      onCropComplete: Ce,
                      onCropAreaChange: Ce,
                      onCropSizeChange: qe,
                      onInteractionEnd: () => {
                        fe("translate"), window.requestAnimationFrame(() => {
                          $();
                        });
                      },
                      onMediaLoaded: (t) => {
                        p.current = t;
                        const s = h.current ?? k;
                        u.current || !s || (u.current = true, de(t, s));
                      }
                    }) : n.jsxs("div", {
                      className: "flex h-full items-center justify-center text-sm text-neutral-500 dark:text-neutral-300",
                      children: [
                        n.jsx(J, {
                          size: 18,
                          className: "mr-2 animate-spin"
                        }),
                        "\uC900\uBE44 \uC911\u2026"
                      ]
                    }),
                    W ? Ze.createPortal(zt.map((t) => n.jsx("button", {
                      type: "button",
                      "aria-label": `crop-handle-${t.id}`,
                      className: `pointer-events-auto absolute z-20 h-3.5 w-3.5 touch-none rounded-sm border border-white bg-blue-500 shadow ${t.className}`,
                      onPointerDown: (s) => {
                        s.preventDefault(), s.stopPropagation(), s.currentTarget.setPointerCapture(s.pointerId);
                        const c = ue(), m = Mt(t.id, c.cx, c.cy, {
                          width: c.width,
                          height: c.height
                        });
                        j.current = true, a.current = {
                          width: c.width,
                          height: c.height
                        }, N.current = {
                          handle: t.id,
                          offsetX: s.clientX - m.x,
                          offsetY: s.clientY - m.y,
                          lockRatio: D
                        };
                      }
                    }, t.id)), W) : null
                  ]
                }),
                He && (H == null ? void 0 : H.hasTransparentMargin) ? n.jsxs("button", {
                  type: "button",
                  onClick: Ye,
                  disabled: y || !oe,
                  className: "inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                  children: [
                    n.jsx(lt, {
                      size: 14
                    }),
                    "\uD22C\uBA85 \uC81C\uC678 \xB7 \uCF58\uD150\uCE20\uC5D0 \uB9DE\uCD94\uAE30"
                  ]
                }) : null,
                n.jsxs("label", {
                  className: "flex items-center gap-2 text-xs text-gray-600 dark:text-odp-muted",
                  children: [
                    n.jsx("span", {
                      className: "shrink-0",
                      children: "\uD655\uB300"
                    }),
                    n.jsx("input", {
                      type: "range",
                      min: 1,
                      max: 4,
                      step: 0.01,
                      value: R,
                      onChange: (t) => {
                        const s = Number(t.target.value);
                        Y.current = s, T(s), se();
                      },
                      onPointerUp: () => $(),
                      onKeyUp: () => $(),
                      className: "w-full accent-blue-600"
                    })
                  ]
                }),
                n.jsxs("label", {
                  className: "flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    n.jsxs("span", {
                      className: "min-w-0",
                      children: [
                        n.jsx("span", {
                          className: "block text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                          children: "\uBE44\uC728 \uC7A0\uAE08"
                        }),
                        n.jsx("span", {
                          className: "mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",
                          children: "\uB044\uBA74 \uAC00\uB85C\xB7\uC138\uB85C\uB97C \uB530\uB85C \uB298\uB824 \uBE44\uC728\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    }),
                    n.jsx(Ne, {
                      className: Te,
                      checked: D,
                      onCheckedChange: (t) => {
                        const s = !!t;
                        ee.current = s, U(s), window.requestAnimationFrame(() => {
                          $();
                        });
                      },
                      "aria-label": "\uBE44\uC728 \uC7A0\uAE08",
                      children: n.jsx(je, {
                        className: Ie
                      })
                    })
                  ]
                }),
                n.jsxs("label", {
                  className: "flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    n.jsxs("span", {
                      className: "min-w-0",
                      children: [
                        n.jsx("span", {
                          className: "block text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                          children: "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0"
                        }),
                        n.jsx("span", {
                          className: "mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",
                          children: "\uB044\uBA74 \uD770 \uBC30\uACBD JPEG\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4. \uCF1C\uBA74 \uD22C\uBA85 \uC5EC\uBC31\uC744 \uCCB4\uD06C\uBB34\uB2AC\uB85C \uD45C\uC2DC\uD569\uB2C8\uB2E4."
                        })
                      ]
                    }),
                    n.jsx(Ne, {
                      className: Te,
                      checked: I,
                      onCheckedChange: (t) => {
                        L(!!t);
                      },
                      "aria-label": "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0",
                      children: n.jsx(je, {
                        className: Ie
                      })
                    })
                  ]
                }),
                M ? n.jsx("p", {
                  className: "text-xs text-red-600 dark:text-red-300",
                  children: M
                }) : null,
                n.jsxs("div", {
                  className: "flex justify-end gap-2",
                  children: [
                    n.jsxs("button", {
                      type: "button",
                      onClick: i,
                      disabled: y,
                      className: "inline-flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                      children: [
                        n.jsx(ut, {
                          size: 16
                        }),
                        "\uB4A4\uB85C"
                      ]
                    }),
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        Xe();
                      },
                      disabled: y || !oe,
                      className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                      children: [
                        y ? n.jsx(J, {
                          size: 16,
                          className: "animate-spin"
                        }) : n.jsx(De, {
                          size: 16
                        }),
                        y ? "\uC801\uC6A9 \uC911\u2026" : "\uC790\uB974\uAE30 \uC801\uC6A9"
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
  const _e = 30;
  function ie(e) {
    return e ? e.endsWith("px") ? e.slice(0, -2) : e : "";
  }
  function ce(e) {
    const o = String(e ?? "").trim();
    if (!o) return {
      normalized: null,
      error: null
    };
    const i = et(o);
    return i ? {
      normalized: i,
      error: null
    } : {
      normalized: null,
      error: "\uC22B\uC790, px, %, vh, vw \uD615\uC2DD\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uC608: 320, 320px, 50%, 40vh, 60vw)"
    };
  }
  function Be(e) {
    return e ? Le(e) && e.length > _e ? e.slice(0, _e) : e : "";
  }
  Yt = function({ isOpen: e, onClose: o, path: i = "", kind: f = "wiki", initialWidth: l, initialHeight: a, imageSrc: p = "", onApply: h, onStartFreeTransform: v, onCrop: b, onConvertToWiki: u, onConvertToImgbb: g }) {
    const [C, j] = r.useState(() => ie(l)), [N, A] = r.useState(() => ie(a)), [B, x] = r.useState(""), [z, R] = r.useState(false), [T, S] = r.useState(false), [P, D] = r.useState(false);
    r.useEffect(() => {
      e && (j(ie(l)), A(ie(a)), x(""), R(false), S(false), D(false));
    }, [
      e,
      l,
      a,
      i,
      p
    ]);
    const U = r.useMemo(() => Be(i), [
      i
    ]), I = f === "markdown" && typeof u == "function", L = typeof g == "function" && !Je(i), y = T || P, d = r.useMemo(() => {
      if (!i) return "";
      const w = Be(i), k = ce(C).normalized, O = ce(N).normalized;
      if (f === "markdown") {
        const F = [];
        return k && F.push(`w=${k}`), O && F.push(`h=${O}`), F.length ? `![](${w}){${F.join(" ")}}` : `![](${w})`;
      }
      const H = [];
      return k && H.push(`w=${k}`), O && H.push(`h=${O}`), H.length ? `![[${w}|${H.join(" ")}]]` : `![[${w}]]`;
    }, [
      i,
      f,
      C,
      N
    ]), M = () => {
      const w = ce(C);
      if (w.error) return x(w.error), null;
      const k = ce(N);
      return k.error ? (x(k.error), null) : (x(""), {
        width: w.normalized,
        height: k.normalized
      });
    }, E = () => {
      const w = M();
      w && (h == null ? void 0 : h(w), o == null ? void 0 : o());
    }, W = async () => {
      if (!I || y) return;
      const w = M();
      if (w) {
        S(true), x("");
        try {
          await (u == null ? void 0 : u(w)), o == null ? void 0 : o();
        } catch (k) {
          const O = k instanceof Error && k.message ? k.message : "wiki image\uB85C \uBCC0\uACBD\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
          x(O);
        } finally {
          S(false);
        }
      }
    }, Q = async () => {
      if (!L || y) return;
      const w = M();
      if (w) {
        D(true), x("");
        try {
          await (g == null ? void 0 : g(w)), o == null ? void 0 : o();
        } catch (k) {
          const O = k instanceof Error && k.message ? k.message : "ImgBB\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
          x(O);
        } finally {
          D(false);
        }
      }
    }, X = !!p && typeof b == "function";
    return n.jsx(Qe, {
      isOpen: e,
      onClose: z ? () => R(false) : o,
      onConfirm: z || y ? void 0 : E,
      contentClassName: z ? "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]" : "max-w-lg",
      resizeHeight: z,
      layoutKey: z ? "crop" : "size",
      children: z ? n.jsx(_t, {
        imageSrc: p,
        fileName: Le(i) ? "image" : i,
        onCancel: () => R(false),
        onConfirm: async (w, k) => {
          await (b == null ? void 0 : b({
            file: w,
            widthPx: k.width,
            heightPx: k.height
          })), R(false), o == null ? void 0 : o();
        }
      }) : n.jsxs("div", {
        className: "p-6 flex flex-col gap-4",
        children: [
          n.jsx("h2", {
            className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
            children: "\uC774\uBBF8\uC9C0 \uD06C\uAE30"
          }),
          n.jsx("p", {
            className: "text-xs text-gray-500 dark:text-odp-muted break-all",
            children: U
          }),
          n.jsxs("label", {
            className: "block",
            children: [
              n.jsx("span", {
                className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1",
                children: "\uB108\uBE44 (\uBE44\uC6B0\uBA74 \uAE30\uBCF8)"
              }),
              n.jsx("input", {
                type: "text",
                value: C,
                onChange: (w) => j(w.target.value),
                placeholder: "\uC608: 320 / 320px / 50% / 60vw",
                disabled: y,
                className: "w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
              })
            ]
          }),
          n.jsxs("label", {
            className: "block",
            children: [
              n.jsx("span", {
                className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1",
                children: "\uB192\uC774 (\uBE44\uC6B0\uBA74 \uAE30\uBCF8)"
              }),
              n.jsx("input", {
                type: "text",
                value: N,
                onChange: (w) => A(w.target.value),
                placeholder: "\uC608: 240 / 240px / 40% / 40vh",
                disabled: y,
                className: "w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
              })
            ]
          }),
          n.jsx("p", {
            className: "text-xs text-gray-500 dark:text-odp-muted break-all",
            children: d
          }),
          B ? n.jsx("p", {
            className: "text-xs text-red-600 dark:text-red-300",
            children: B
          }) : null,
          n.jsxs("div", {
            className: "flex flex-wrap justify-end gap-2",
            children: [
              I ? n.jsxs("button", {
                type: "button",
                onClick: () => {
                  W();
                },
                disabled: y,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  T ? n.jsx(J, {
                    size: 16,
                    className: "animate-spin"
                  }) : n.jsx(dt, {
                    size: 16
                  }),
                  "wiki image\uB85C \uBCC0\uACBD"
                ]
              }) : null,
              L ? n.jsxs("button", {
                type: "button",
                onClick: () => {
                  Q();
                },
                disabled: y,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  P ? n.jsx(J, {
                    size: 16,
                    className: "animate-spin"
                  }) : n.jsx(ft, {
                    size: 16
                  }),
                  "ImgBB\uB85C \uBCC0\uD658"
                ]
              }) : null,
              X ? n.jsxs("button", {
                type: "button",
                onClick: () => R(true),
                disabled: y,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  n.jsx(De, {
                    size: 16
                  }),
                  "\uC790\uB974\uAE30"
                ]
              }) : null,
              typeof v == "function" ? n.jsxs("button", {
                type: "button",
                onClick: () => {
                  v(), o == null ? void 0 : o();
                },
                disabled: y,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  n.jsx(ht, {
                    size: 16
                  }),
                  "\uC790\uC720\uBCC0\uD615"
                ]
              }) : null,
              n.jsxs("button", {
                type: "button",
                onClick: o,
                disabled: y,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  n.jsx(pt, {
                    size: 16
                  }),
                  "\uCDE8\uC18C"
                ]
              }),
              n.jsxs("button", {
                type: "button",
                onClick: E,
                disabled: y,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-60",
                children: [
                  n.jsx(gt, {
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
  const $e = "s3haim_toc_title_wrap";
  function Bt() {
    try {
      return typeof window > "u" ? false : window.localStorage.getItem($e) === "1";
    } catch {
      return false;
    }
  }
  function Lt(e) {
    try {
      if (typeof window > "u") return;
      window.localStorage.setItem($e, e ? "1" : "0");
    } catch {
    }
  }
  qt = function() {
    const [e, o] = r.useState(Bt), i = r.useCallback((f) => {
      o((l) => {
        const a = typeof f == "function" ? f(l) : !!f;
        return Lt(a), a;
      });
    }, []);
    return [
      e,
      i
    ];
  };
  Xt = function(e) {
    return e ? "whitespace-normal break-words [overflow-wrap:anywhere]" : "truncate";
  };
});
export {
  _t as N,
  Yt as W,
  __tla,
  Xt as t,
  qt as u
};
