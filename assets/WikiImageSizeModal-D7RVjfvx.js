const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/NoteImageCropperJsPanel-DaRSnxjv.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BDjpSibw.js","assets/cropPadImage-bxwtZZAf.js","assets/index-CCnkqbfe.js","assets/vendor-lucide-Cix55NOo.js","assets/bootSplash-QPCcRCUR.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Dw-WnPM7.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-radix-DuLpLUUM.js","assets/index-VM7lZ2Tu.css"])))=>i.map(i=>d[i]);
import { r, j as n, a as Ge, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { aL as Ve, I as Ze, ae as Je, H as Le, aU as Qe, __tla as __tla_1 } from "./index-CCnkqbfe.js";
import { _ as et } from "./vendor-aws-Cvd3RhZI.js";
import { g as tt, s as rt } from "./vendor-image-crop-BD82vq0Q.js";
import { g as nt, c as st, o as ot, a as at, b as it } from "./cropPadImage-bxwtZZAf.js";
import { L as J, K as ct, A as lt, b as Ue, N as ut, O as dt, V as ft, X as ht, y as pt } from "./vendor-lucide-Cix55NOo.js";
import { p as gt, q as mt, r as Re, s as Ne, S as je, g as Se } from "./vendor-radix-DuLpLUUM.js";
let Pt, Ft;
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
  const _e = new Ve("s3haim-image-crop-undo-history");
  _e.version(1).stores({
    histories: "key, updatedAt"
  });
  const me = _e.histories, ze = 60, xt = 350;
  function bt(e) {
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
  async function yt({ key: e, stack: o, index: i }) {
    if (!e) return;
    const x = Oe(o), l = Math.max(0, Math.min(i ?? x.length - 1, x.length - 1));
    await me.put({
      key: e,
      stack: x,
      index: l,
      updatedAt: Date.now()
    });
  }
  async function Ee(e) {
    e && await me.delete(e);
  }
  async function wt() {
    await me.clear();
  }
  function kt(e, o, i) {
    const x = Array.isArray(e) && e.length > 0 ? e : [];
    if (x.length === 0) return {
      stack: [
        i
      ],
      index: 0,
      changed: true
    };
    const l = Math.max(0, Math.min(o, x.length - 1));
    if (x[l] === i) return {
      stack: x,
      index: l,
      changed: false
    };
    const a = x.slice(0, l + 1);
    a.push(i);
    const p = Oe(a);
    return {
      stack: p,
      index: p.length - 1,
      changed: true
    };
  }
  function Ct({ enabled: e, imageSrc: o, getSnapshot: i, applySnapshot: x }) {
    const l = r.useRef([]), a = r.useRef(0), p = r.useRef(false), f = r.useRef(null), v = r.useRef(null), y = r.useRef(null), u = r.useRef(null), g = r.useRef(false), C = r.useRef(false), z = r.useRef(i), j = r.useRef(x);
    z.current = i, j.current = x;
    const [T, B] = r.useState(0), b = r.useCallback(() => B((d) => d + 1), []), M = r.useCallback(() => {
      f.current && (clearTimeout(f.current), f.current = null), v.current && (clearTimeout(v.current), v.current = null);
    }, []), R = r.useCallback((d, E, S) => {
      g.current || u.current !== d || (v.current && clearTimeout(v.current), v.current = setTimeout(() => {
        v.current = null, !(g.current || u.current !== d) && yt({
          key: d,
          stack: E,
          index: S
        }).then(() => {
          (g.current || u.current !== d) && Ee(d).catch(() => {
          });
        }).catch((F) => {
          console.warn("[image-crop-undo] save failed:", F);
        });
      }, 200));
    }, []), I = r.useCallback(() => {
      f.current && (clearTimeout(f.current), f.current = null);
      const d = u.current, E = y.current;
      if (!d || E == null || g.current) return;
      y.current = null;
      const S = kt(l.current, a.current, E);
      S.changed && (l.current = S.stack, a.current = S.index, R(d, S.stack, S.index), b());
    }, [
      b,
      R
    ]);
    r.useEffect(() => {
      if (!o) return;
      g.current = false, M();
      const d = bt(o);
      return u.current = d, l.current = [], a.current = 0, y.current = null, C.current = false, b(), () => {
        g.current = true, M(), y.current = null;
        const E = u.current;
        u.current = null, l.current = [], a.current = 0, C.current = false, (async () => {
          try {
            E && await Ee(E), await wt();
          } catch {
          }
        })();
      };
    }, [
      e,
      o,
      b,
      M
    ]);
    const N = r.useCallback(() => {
      if (g.current || C.current) return;
      const d = u.current;
      if (!d) return;
      const E = ge(z.current());
      l.current = [
        E
      ], a.current = 0, C.current = true, R(d, l.current, a.current), b();
    }, [
      b,
      e,
      R
    ]), P = r.useCallback(() => {
      g.current || p.current || !C.current || !u.current || (y.current = ge(z.current()), f.current && clearTimeout(f.current), f.current = setTimeout(() => {
        f.current = null, I();
      }, xt));
    }, [
      e,
      I
    ]), U = r.useCallback(() => {
      g.current || p.current || !C.current || !u.current || (y.current = ge(z.current()), I());
    }, [
      e,
      I
    ]), _ = r.useCallback(() => {
      if (I(), a.current <= 0) return false;
      a.current -= 1;
      const d = l.current[a.current], E = d ? Me(d) : null;
      if (!E) return false;
      p.current = true, j.current(E);
      const S = u.current;
      return S && R(S, l.current, a.current), b(), requestAnimationFrame(() => {
        p.current = false;
      }), true;
    }, [
      b,
      I,
      R
    ]), A = r.useCallback(() => {
      if (I(), a.current >= l.current.length - 1) return false;
      a.current += 1;
      const d = l.current[a.current], E = d ? Me(d) : null;
      if (!E) return false;
      p.current = true, j.current(E);
      const S = u.current;
      return S && R(S, l.current, a.current), b(), requestAnimationFrame(() => {
        p.current = false;
      }), true;
    }, [
      b,
      I,
      R
    ]), L = C.current && a.current > 0, w = C.current && a.current < l.current.length - 1;
    return {
      ensureBaseline: N,
      recordSoon: P,
      recordNow: U,
      undo: _,
      redo: A,
      canUndo: L,
      canRedo: w
    };
  }
  const vt = r.lazy(() => et(() => import("./NoteImageCropperJsPanel-DaRSnxjv.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]))), X = 48, Rt = 1.5, Nt = 0.08, Ie = "relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500", Ae = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", jt = {
    backgroundColor: "#ffffff",
    backgroundImage: [
      "linear-gradient(45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)",
      "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"
    ].join(","),
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
  }, St = [
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
  function Te(e, o, i) {
    return {
      width: Math.min(o, Math.max(X, e.width)),
      height: Math.min(i, Math.max(X, e.height))
    };
  }
  function zt(e, o, i, x) {
    const l = x.width / 2, a = x.height / 2;
    let p = o, f = i;
    return e.includes("e") && (p = o + l), e.includes("w") && (p = o - l), e.includes("s") && (f = i + a), e.includes("n") && (f = i - a), {
      x: p,
      y: f
    };
  }
  function Mt(e, o, i, x, l, a, p) {
    const f = x - o, v = l - i;
    let y = a.width, u = a.height;
    if (e === "e" || e === "w" ? y = Math.abs(f) * 2 : (e === "n" || e === "s" || (y = Math.abs(f) * 2), u = Math.abs(v) * 2), p && a.height > 0) {
      const g = a.width / a.height;
      if (e === "e" || e === "w") u = y / g;
      else if (e === "n" || e === "s") y = u * g;
      else {
        const C = e.includes("e") ? 1 : -1, z = e.includes("s") ? 1 : -1, j = (f * C * g + v * z) / (g * g + 1);
        y = Math.abs(j) * g * 2, u = Math.abs(j) * 2;
      }
    }
    return {
      width: y,
      height: u
    };
  }
  function Et(e) {
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
    let x = null, l = i;
    for (const a of o) {
      const p = Math.abs(e - a);
      p <= l && (x = a, l = p);
    }
    return x;
  }
  function Pe(e, o, i = 0.5) {
    return Math.abs(e.x - o.x) < i && Math.abs(e.y - o.y) < i && Math.abs(e.width - o.width) < i && Math.abs(e.height - o.height) < i;
  }
  function Tt(e, o, i, x) {
    const l = It(o, i);
    if (l.length === 0) return null;
    const a = At(e), p = l.flatMap((N) => [
      N.left,
      N.right
    ]), f = l.flatMap((N) => [
      N.top,
      N.bottom
    ]), v = e.x, y = e.x + e.width, u = e.y, g = e.y + e.height;
    if (x === "translate") {
      let N = 0, P = a + 1, U = 0, _ = a + 1;
      for (const L of p) for (const w of [
        L - v,
        L - y
      ]) {
        const d = Math.abs(w);
        d < P && (P = d, N = w);
      }
      for (const L of f) for (const w of [
        L - u,
        L - g
      ]) {
        const d = Math.abs(w);
        d < _ && (_ = d, U = w);
      }
      if (P > a && _ > a) return null;
      const A = {
        x: e.x + (P <= a ? N : 0),
        y: e.y + (_ <= a ? U : 0),
        width: e.width,
        height: e.height
      };
      return Pe(e, A) ? null : A;
    }
    const C = ae(v, p, a), z = ae(y, p, a), j = ae(u, f, a), T = ae(g, f, a);
    let B = C ?? v, b = z ?? y, M = j ?? u, R = T ?? g;
    if (b - B < X) if (C != null && z == null) b = B + e.width;
    else if (z != null && C == null) B = b - e.width;
    else {
      const N = (v + y) / 2;
      B = N - e.width / 2, b = N + e.width / 2;
    }
    if (R - M < X) if (j != null && T == null) R = M + e.height;
    else if (T != null && j == null) M = R - e.height;
    else {
      const N = (u + g) / 2;
      M = N - e.height / 2, R = N + e.height / 2;
    }
    const I = {
      x: B,
      y: M,
      width: b - B,
      height: R - M
    };
    return C == null && z == null && j == null && T == null || Pe(e, I) ? null : I;
  }
  Pt = function({ imageSrc: e, fileName: o, onCancel: i, onConfirm: x }) {
    const l = r.useRef(null), a = r.useRef(null), p = r.useRef(null), f = r.useRef(null), v = r.useRef(null), y = r.useRef(null), u = r.useRef(false), g = r.useRef(false), C = r.useRef(0), z = r.useRef(false), j = r.useRef(null), [T, B] = r.useState("easy"), [b, M] = r.useState({
      x: 0,
      y: 0
    }), [R, I] = r.useState(1), [N, P] = r.useState(null), [U, _] = r.useState(false), [A, L] = r.useState(true), [w, d] = r.useState(false), [E, S] = r.useState(""), [F, Q] = r.useState(null), [Y, h] = r.useState(null), [k, O] = r.useState(null), [H, K] = r.useState(null), [$e, le] = r.useState(null), q = r.useRef(null), Z = r.useRef(b), W = r.useRef(R), ee = r.useRef(U), te = r.useRef(A), re = r.useRef(null);
    Z.current = b, W.current = R, ee.current = U, te.current = A;
    const He = r.useCallback(() => ({
      crop: {
        ...Z.current
      },
      zoom: W.current,
      cropSize: a.current ? {
        ...a.current
      } : null,
      lockRatio: ee.current,
      keepTransparency: te.current,
      croppedArea: q.current ? {
        ...q.current
      } : null
    }), []), ne = r.useCallback((t) => {
      g.current = true, z.current = false, _(t.lockRatio), ee.current = t.lockRatio, te.current = t.keepTransparency, t.cropSize ? (a.current = t.cropSize, P(t.cropSize)) : (a.current = null, P(null)), Z.current = t.crop, W.current = t.zoom, M(t.crop), I(t.zoom), t.croppedArea && (q.current = t.croppedArea), window.requestAnimationFrame(() => {
        g.current = false;
      });
    }, []), Fe = r.useCallback((t) => {
      if (t.keepTransparency !== te.current) {
        re.current = t, L(t.keepTransparency), _(t.lockRatio);
        return;
      }
      ne(t);
    }, [
      ne
    ]), { ensureBaseline: xe, recordSoon: se, recordNow: $, undo: be, redo: ye } = Ct({
      enabled: true,
      imageSrc: e,
      getSnapshot: He,
      applySnapshot: Fe
    }), we = r.useCallback((t) => {
      z.current = true, a.current = t, !C.current && (C.current = window.requestAnimationFrame(() => {
        C.current = 0, P(a.current);
      }));
    }, []), Ke = r.useCallback((t) => {
      z.current || j.current || g.current || (Z.current = t, M(t), se());
    }, [
      se
    ]);
    r.useEffect(() => () => {
      C.current && window.cancelAnimationFrame(C.current);
    }, []), r.useEffect(() => {
      T === "easy" && (u.current = false);
    }, [
      T
    ]), r.useEffect(() => {
      B("easy"), M({
        x: 0,
        y: 0
      }), I(1), a.current = null, P(null), _(false), L(true), d(false), S(""), q.current = null, Q(null), p.current = null, f.current = null, v.current = null, u.current = false, z.current = false, re.current = null, O(null), h(null), K(null), le(null);
    }, [
      e
    ]), r.useEffect(() => {
      if (!e) return;
      let t = false;
      return nt(e).then((s) => {
        t || K(s);
      }).catch(() => {
        t || K(null);
      }), () => {
        t = true;
      };
    }, [
      e
    ]), r.useEffect(() => {
      if (!e) return;
      let t = false;
      const s = A ? null : "#ffffff";
      return st(e, s, {
        padRatio: Rt,
        matteCenter: !!s && !A
      }).then((c) => {
        if (t) {
          URL.revokeObjectURL(c.src);
          return;
        }
        y.current && URL.revokeObjectURL(y.current), y.current = c.src, f.current = c.meta, u.current = false, h(c.src), O(c.meta);
      }).catch(() => {
        t || (h(e), O(null), f.current = null);
      }), () => {
        t = true;
      };
    }, [
      e,
      A
    ]), r.useEffect(() => {
      if (!k || !(H == null ? void 0 : H.hasTransparentMargin)) {
        v.current = null, le(null);
        return;
      }
      const t = ot(k, H);
      v.current = t, le(t);
    }, [
      k,
      H
    ]), r.useEffect(() => () => {
      y.current && (URL.revokeObjectURL(y.current), y.current = null);
    }, []), r.useEffect(() => {
      if (T !== "easy") return;
      const t = l.current;
      if (!t) return;
      const s = () => {
        const m = t.querySelector(".reactEasyCrop_CropArea");
        Q((D) => D === m ? D : m);
      };
      s();
      const c = new MutationObserver(s);
      return c.observe(t, {
        childList: true,
        subtree: true
      }), () => c.disconnect();
    }, [
      Y,
      T
    ]);
    const ue = r.useCallback(() => {
      var _a, _b;
      const t = l.current, s = F ?? (t == null ? void 0 : t.querySelector(".reactEasyCrop_CropArea")), c = t == null ? void 0 : t.getBoundingClientRect();
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
        maxWidth: Math.max(X, c.width - 16),
        maxHeight: Math.max(X, c.height - 16)
      };
    }, [
      F
    ]), G = r.useCallback((t, s) => {
      var _a;
      const c = p.current;
      if (!c) return;
      const m = Et(c), D = (_a = l.current) == null ? void 0 : _a.getBoundingClientRect(), V = Math.max(X, ((D == null ? void 0 : D.width) ?? c.width) - 16), Ye = Math.max(X, ((D == null ? void 0 : D.height) ?? c.height) - 16), ve = !!(s == null ? void 0 : s.fitNatural) || !a.current ? 1 : Math.min(4, Math.max(1, W.current)), he = Te({
        width: t.width * m * ve,
        height: t.height * m * ve
      }, V, Ye);
      a.current = he, P(he);
      const pe = tt(t, c, 0, he, 1, 4);
      g.current = true, Z.current = pe.crop, W.current = Math.min(4, Math.max(1, pe.zoom)), M(pe.crop), I(W.current), q.current = t, window.requestAnimationFrame(() => {
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
      const s = q.current, c = f.current;
      if (!s || !c) return;
      const m = Tt(s, c, v.current, t);
      m && G(m);
    }, [
      G
    ]), qe = r.useCallback(() => {
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
      Y
    ]);
    const Ce = r.useCallback((t, s) => {
      q.current = s;
    }, []), We = r.useCallback((t) => {
      if (j.current || u.current === false && f.current) return;
      const s = a.current;
      s && Math.abs(s.width - t.width) < 0.5 && Math.abs(s.height - t.height) < 0.5 || (a.current = t, P(t));
    }, []);
    r.useEffect(() => {
      const t = (c) => {
        const m = j.current;
        if (!m) return;
        c.preventDefault();
        const D = ue(), V = Mt(m.handle, D.cx, D.cy, c.clientX - m.offsetX, c.clientY - m.offsetY, {
          width: D.width,
          height: D.height
        }, m.lockRatio || c.shiftKey);
        we(Te(V, D.maxWidth, D.maxHeight));
      }, s = () => {
        if (!j.current) return;
        j.current = null;
        const c = () => {
          z.current = false, fe("resize"), window.requestAnimationFrame(() => {
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
      if (T !== "easy") return;
      const t = (s) => {
        if (!(s.metaKey || s.ctrlKey) || s.altKey) return;
        const m = s.key.toLowerCase(), D = m === "z" && !s.shiftKey, V = m === "y" || m === "z" && s.shiftKey;
        !D && !V || (s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), !w && (V ? ye() : be()));
      };
      return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
    }, [
      w,
      T,
      ye,
      be
    ]);
    const Xe = async () => {
      const t = q.current;
      if (!(!t || w || !e)) {
        d(true), S("");
        try {
          const s = (o || "image").replace(/\.[^.]+$/, "") || "image", c = {
            keepTransparency: A,
            fileName: A ? `${s}-crop.png` : `${s}-crop.jpg`
          };
          if (f.current) {
            const m = await at(e, t, f.current, c);
            await x(m.file, m.area);
          } else {
            const D = await it(Y || e, t, c);
            await x(D, t);
          }
        } catch (s) {
          S(s instanceof Error ? s.message : String(s)), d(false);
        }
      }
    }, oe = Y;
    return n.jsxs("div", {
      className: "flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-6",
      children: [
        n.jsx("h2", {
          className: "shrink-0 text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
          children: "\uC774\uBBF8\uC9C0 \uC790\uB974\uAE30"
        }),
        n.jsxs(gt, {
          value: T,
          onValueChange: (t) => {
            B(t === "editor" ? "editor" : "easy"), S(""), d(false);
          },
          className: "flex min-h-0 flex-1 flex-col gap-3",
          children: [
            n.jsxs(mt, {
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
            n.jsx(Ne, {
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
                children: n.jsx(vt, {
                  imageSrc: e,
                  ...o ? {
                    fileName: o
                  } : {},
                  onCancel: i,
                  onConfirm: x
                })
              })
            }),
            n.jsxs(Ne, {
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
                  style: A ? jt : {
                    backgroundColor: "#ffffff"
                  },
                  children: [
                    oe ? n.jsx(rt, {
                      image: oe,
                      crop: b,
                      zoom: R,
                      minZoom: 1,
                      maxZoom: 4,
                      ...N ? {
                        cropSize: N,
                        aspect: N.width / Math.max(1, N.height)
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
                        z.current || j.current || g.current || (W.current = t, I(t), se());
                      },
                      onCropComplete: Ce,
                      onCropAreaChange: Ce,
                      onCropSizeChange: We,
                      onInteractionEnd: () => {
                        fe("translate"), window.requestAnimationFrame(() => {
                          $();
                        });
                      },
                      onMediaLoaded: (t) => {
                        p.current = t;
                        const s = f.current ?? k;
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
                    F ? Ge.createPortal(St.map((t) => n.jsx("button", {
                      type: "button",
                      "aria-label": `crop-handle-${t.id}`,
                      className: `pointer-events-auto absolute z-20 h-3.5 w-3.5 touch-none rounded-sm border border-white bg-blue-500 shadow ${t.className}`,
                      onPointerDown: (s) => {
                        s.preventDefault(), s.stopPropagation(), s.currentTarget.setPointerCapture(s.pointerId);
                        const c = ue(), m = zt(t.id, c.cx, c.cy, {
                          width: c.width,
                          height: c.height
                        });
                        z.current = true, a.current = {
                          width: c.width,
                          height: c.height
                        }, j.current = {
                          handle: t.id,
                          offsetX: s.clientX - m.x,
                          offsetY: s.clientY - m.y,
                          lockRatio: U
                        };
                      }
                    }, t.id)), F) : null
                  ]
                }),
                $e && (H == null ? void 0 : H.hasTransparentMargin) ? n.jsxs("button", {
                  type: "button",
                  onClick: qe,
                  disabled: w || !oe,
                  className: "inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                  children: [
                    n.jsx(ct, {
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
                        W.current = s, I(s), se();
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
                    n.jsx(je, {
                      className: Ie,
                      checked: U,
                      onCheckedChange: (t) => {
                        const s = !!t;
                        ee.current = s, _(s), window.requestAnimationFrame(() => {
                          $();
                        });
                      },
                      "aria-label": "\uBE44\uC728 \uC7A0\uAE08",
                      children: n.jsx(Se, {
                        className: Ae
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
                    n.jsx(je, {
                      className: Ie,
                      checked: A,
                      onCheckedChange: (t) => {
                        L(!!t);
                      },
                      "aria-label": "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0",
                      children: n.jsx(Se, {
                        className: Ae
                      })
                    })
                  ]
                }),
                E ? n.jsx("p", {
                  className: "text-xs text-red-600 dark:text-red-300",
                  children: E
                }) : null,
                n.jsxs("div", {
                  className: "flex justify-end gap-2",
                  children: [
                    n.jsxs("button", {
                      type: "button",
                      onClick: i,
                      disabled: w,
                      className: "inline-flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                      children: [
                        n.jsx(lt, {
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
                      disabled: w || !oe,
                      className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                      children: [
                        w ? n.jsx(J, {
                          size: 16,
                          className: "animate-spin"
                        }) : n.jsx(Ue, {
                          size: 16
                        }),
                        w ? "\uC801\uC6A9 \uC911\u2026" : "\uC790\uB974\uAE30 \uC801\uC6A9"
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
  const De = 30;
  function ie(e) {
    return e ? e.endsWith("px") ? e.slice(0, -2) : e : "";
  }
  function ce(e) {
    const o = String(e ?? "").trim();
    if (!o) return {
      normalized: null,
      error: null
    };
    const i = Qe(o);
    return i ? {
      normalized: i,
      error: null
    } : {
      normalized: null,
      error: "\uC22B\uC790, px, %, vh, vw \uD615\uC2DD\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uC608: 320, 320px, 50%, 40vh, 60vw)"
    };
  }
  function Be(e) {
    return e ? Le(e) && e.length > De ? e.slice(0, De) : e : "";
  }
  Ft = function({ isOpen: e, onClose: o, path: i = "", kind: x = "wiki", initialWidth: l, initialHeight: a, imageSrc: p = "", onApply: f, onStartFreeTransform: v, onCrop: y, onConvertToWiki: u, onConvertToImgbb: g }) {
    const [C, z] = r.useState(() => ie(l)), [j, T] = r.useState(() => ie(a)), [B, b] = r.useState(""), [M, R] = r.useState(false), [I, N] = r.useState(false), [P, U] = r.useState(false);
    r.useEffect(() => {
      e && (z(ie(l)), T(ie(a)), b(""), R(false), N(false), U(false));
    }, [
      e,
      l,
      a,
      i,
      p
    ]);
    const _ = r.useMemo(() => Be(i), [
      i
    ]), A = x === "markdown" && typeof u == "function", L = typeof g == "function" && !Ze(i), w = I || P, d = r.useMemo(() => {
      if (!i) return "";
      const h = Be(i), k = ce(C).normalized, O = ce(j).normalized;
      if (x === "markdown") {
        const K = [];
        return k && K.push(`w=${k}`), O && K.push(`h=${O}`), K.length ? `![](${h}){${K.join(" ")}}` : `![](${h})`;
      }
      const H = [];
      return k && H.push(`w=${k}`), O && H.push(`h=${O}`), H.length ? `![[${h}|${H.join(" ")}]]` : `![[${h}]]`;
    }, [
      i,
      x,
      C,
      j
    ]), E = () => {
      const h = ce(C);
      if (h.error) return b(h.error), null;
      const k = ce(j);
      return k.error ? (b(k.error), null) : (b(""), {
        width: h.normalized,
        height: k.normalized
      });
    }, S = () => {
      const h = E();
      h && (f == null ? void 0 : f(h), o == null ? void 0 : o());
    }, F = async () => {
      if (!A || w) return;
      const h = E();
      if (h) {
        N(true), b("");
        try {
          await (u == null ? void 0 : u(h)), o == null ? void 0 : o();
        } catch (k) {
          const O = k instanceof Error && k.message ? k.message : "wiki image\uB85C \uBCC0\uACBD\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
          b(O);
        } finally {
          N(false);
        }
      }
    }, Q = async () => {
      if (!L || w) return;
      const h = E();
      if (h) {
        U(true), b("");
        try {
          await (g == null ? void 0 : g(h)), o == null ? void 0 : o();
        } catch (k) {
          const O = k instanceof Error && k.message ? k.message : "ImgBB\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
          b(O);
        } finally {
          U(false);
        }
      }
    }, Y = !!p && typeof y == "function";
    return n.jsx(Je, {
      isOpen: e,
      onClose: M ? () => R(false) : o,
      onConfirm: M || w ? void 0 : S,
      contentClassName: M ? "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]" : "max-w-lg",
      resizeHeight: M,
      layoutKey: M ? "crop" : "size",
      children: M ? n.jsx(Pt, {
        imageSrc: p,
        fileName: Le(i) ? "image" : i,
        onCancel: () => R(false),
        onConfirm: async (h, k) => {
          await (y == null ? void 0 : y({
            file: h,
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
            children: _
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
                onChange: (h) => z(h.target.value),
                onKeyDown: (h) => {
                  h.key === "Enter" && (h.preventDefault(), S());
                },
                placeholder: "\uC608: 320 / 320px / 50% / 60vw",
                disabled: w,
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
                value: j,
                onChange: (h) => T(h.target.value),
                onKeyDown: (h) => {
                  h.key === "Enter" && (h.preventDefault(), S());
                },
                placeholder: "\uC608: 240 / 240px / 40% / 40vh",
                disabled: w,
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
              A ? n.jsxs("button", {
                type: "button",
                onClick: () => {
                  F();
                },
                disabled: w,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  I ? n.jsx(J, {
                    size: 16,
                    className: "animate-spin"
                  }) : n.jsx(ut, {
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
                disabled: w,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  P ? n.jsx(J, {
                    size: 16,
                    className: "animate-spin"
                  }) : n.jsx(dt, {
                    size: 16
                  }),
                  "ImgBB\uB85C \uBCC0\uD658"
                ]
              }) : null,
              Y ? n.jsxs("button", {
                type: "button",
                onClick: () => R(true),
                disabled: w,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  n.jsx(Ue, {
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
                disabled: w,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  n.jsx(ft, {
                    size: 16
                  }),
                  "\uC790\uC720\uBCC0\uD615"
                ]
              }) : null,
              n.jsxs("button", {
                type: "button",
                onClick: o,
                disabled: w,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  n.jsx(ht, {
                    size: 16
                  }),
                  "\uCDE8\uC18C"
                ]
              }),
              n.jsxs("button", {
                type: "button",
                onClick: S,
                disabled: w,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-60",
                children: [
                  n.jsx(pt, {
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
  Pt as N,
  Ft as W,
  __tla
};
