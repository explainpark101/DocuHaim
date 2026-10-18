const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-jsqr-781CUKnt.js","assets/vendor-react-BPvvDyqO.js"])))=>i.map(i=>d[i]);
import { c as be, e as cs, f as ke, P as Oe, h as Ie, i as us, M as ds, j as fs, I as tr, r as hs, k as Vn, l as ps, n as ms, p as Zr, o as gs, g as xs, q as bs, T as H, t as Ne, v as ks, w as ws, N as Xa, R as st, x as ze, y as ys, z as Cs, A as Jr, B as ea, C as Ss, F as Ms, G as ta, H as js, J as vs, K as Es, L as na, O as Ts, Q as Ls, S as Is, U as Ns, V as As, W as Ps, X as $s, Y as Rs, Z as Ds, _ as Bs, $ as Hs, a0 as _s, a1 as Os, a2 as zs, a3 as Fs, a4 as Ks, a5 as Ws, a6 as qs, a7 as Us, a8 as Vs, a9 as Xs, aa as Qs, ab as Ys } from "./vendor-tiptap-BMlBKcBH.js";
import { r as h, j as i, c as Gs, a as Zs, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as Xn, m as tt } from "./vendor-motion-Bv-XITR_.js";
import { t as Js, O as ei } from "./index-flVIUjar.js";
import { c as ti, n as nt, a6 as ni, C as ri, i as ai, e5 as oi, aJ as ra, fI as Qa, jo as Ya, jp as Ga, dT as si, hQ as ii, er as an, a5 as kr, jq as li, jr as Za, i2 as aa, q as ci, aY as Ja, js as ui, jt as di, ju as eo, __tla as __tla_1 } from "./index-BP7C--nq.js";
import { g as fi } from "./Kbd-Cnuyx3cZ.js";
import { a as hi, i as pi } from "./copyImageToClipboard-CSIFGHOw.js";
import { _ as mi } from "./vendor-aws-hJDgVEKM.js";
import { v as nr, br as gi, P as oa, bl as xi, bs as bi, bt as ki, x as wi, aP as sa, H as ia, U as to, R as no, T as yi, bu as Ci, ah as Si, q as Mi, a as rr, b7 as ro, y as ji, bv as vi, E as wr, bd as Ei, X as Qn, au as Ti, B as Li, I as Ii, e as Ni, f as Ai, j as Pi, a_ as $i, a$ as Ri, g as Di, h as Bi, i as la, Q as Hi, b9 as _i, k as ca, b3 as Oi, b4 as zi, b5 as Fi, b6 as Ki, Z as Vt, aW as vt, aR as Wi, S as qi, aU as Ui, p as ao, b8 as Vi, bb as Xi, b0 as Qi, b1 as Yi, b2 as Gi, bw as Zi, bx as Ji, by as el, bz as oo, C as so, m as io, l as tl } from "./vendor-lucide-DBE8vF92.js";
import { a3 as nl, a4 as rl, a5 as al, a6 as ol, a7 as sl, a8 as il, U as Et, V as Tt, W as Yn, Y as Lt, Z as It, _ as Nt, a1 as Ee, a2 as Te, P as Rt, n as ln, T as cn, p as un, C as dn, A as fn, q as ll, r as cl, t as ul, v as dl } from "./vendor-radix-D1Cm_mSM.js";
import { d as lo, __tla as __tla_2 } from "./bootSplash-BM1jVZSP.js";
import { b as At, c as Jt, d as ua, e as co, a as fl, s as hl, f as da, g as pl } from "./emojiShortcode-C6XCfD9g.js";
import { W as ml, __tla as __tla_3 } from "./WikiImageSizeModal-pTk6kyy-.js";
import { c as gl, f as xl } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as bl } from "./toHtml-IvBdkGZ5.js";
import { p as kl } from "./mdEditorSelectionWrap-3SV9Zfha.js";
import { k as wl } from "./vendor-katex-NqpuB_gR.js";
import { r as yl, l as Cl } from "./haimCodeTabSettings-BI7a8VYQ.js";
import { r as Sl, p as Ml, a as jl, s as vl } from "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import { b as El, s as Tl, h as Ll, f as Il, a as Nl, l as Al } from "./haimCodeBlockLanguages-BStQPvla.js";
import { c as Pl, __tla as __tla_4 } from "./lazyMermaid-BcnyKPEC.js";
import { c as $l, g as Rl } from "./vendor-highlight-Dm7Q9DxH.js";
let pn, lu, gr, Yu, Cf, sc, kf, iu, Sf, pf, Mf, Ld, gf, yo, mf, bf, va, su, Ku, yf, wf, bo, xf;
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
  })()
]).then(async () => {
  function Dl() {
    var _a2;
    return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
  }
  async function Bl(e) {
    const t = navigator.ink;
    if (!(t == null ? void 0 : t.requestPresenter)) return null;
    try {
      return await t.requestPresenter({
        presentationArea: e
      });
    } catch {
      return null;
    }
  }
  async function uo(e) {
    const { src: t, inkCanvas: n, highlightCanvas: r } = e, a = await _l(t), o = ("width" in a, a.width), l = ("height" in a, a.height), c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(o)), c.height = Math.max(1, Math.round(l));
    const d = c.getContext("2d");
    if (!d) throw new Error("Canvas 2D unavailable");
    if (d.imageSmoothingEnabled = true, d.imageSmoothingQuality = "high", d.drawImage(a, 0, 0, c.width, c.height), n && n.width > 0 && n.height > 0 && d.drawImage(n, 0, 0, c.width, c.height), r && r.width > 0 && r.height > 0 && d.drawImage(r, 0, 0, c.width, c.height), "close" in a && typeof a.close == "function") try {
      a.close();
    } catch {
    }
    return c;
  }
  function en(e) {
    return new Promise((t, n) => {
      e.toBlob((r) => {
        r ? t(r) : n(new Error("Failed to encode PNG"));
      }, "image/png");
    });
  }
  async function Hl(e) {
    const t = await uo(e);
    return en(t);
  }
  async function _l(e) {
    try {
      const t = await fetch(e, {
        mode: "cors",
        credentials: "omit"
      });
      if (!t.ok) throw new Error(`fetch ${t.status}`);
      const n = await t.blob();
      return await createImageBitmap(n);
    } catch {
      return await Ol(e);
    }
  }
  function Ol(e) {
    return new Promise((t, n) => {
      const r = new Image();
      r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(new Error("Image load failed for composite")), r.src = e;
    });
  }
  function hn(e) {
    return Math.max(e.diameterX, e.diameterY);
  }
  function fo(e) {
    return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
  }
  function zl(e, t) {
    return !(t >= 8) || !(e >= 1) ? 1 : W(e / t, 0.25, 12);
  }
  function fa(e, t, n) {
    const r = Math.max(4, Math.min(96, Math.min(t, n) * 0.08));
    return W(e, 0.5, r);
  }
  function ho(e, t) {
    if (e.length < 2) return 0;
    const n = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
    if (n === r) {
      const l = e[Math.max(0, t - 1)], c = e[t];
      return Math.atan2(c.y - l.y, c.x - l.x);
    }
    const a = e[n], o = e[r];
    return Math.atan2(o.y - a.y, o.x - a.x);
  }
  function po(e, t) {
    if (e.length === 0) return [];
    const n = e[0];
    if (!n) return [];
    const r = Math.max(0.5, t), a = [
      {
        ...n
      }
    ];
    let o = 0;
    for (let l = 1; l < e.length; l += 1) {
      const c = e[l - 1], d = e[l], p = Math.hypot(d.x - c.x, d.y - c.y);
      if (p < 1e-6) continue;
      let f = 0;
      for (; o + (p - f) >= r; ) {
        const m = r - o, g = (f + m) / p;
        a.push({
          x: c.x + (d.x - c.x) * g,
          y: c.y + (d.y - c.y) * g,
          pressure: c.pressure + (d.pressure - c.pressure) * g
        }), f += m, o = 0;
      }
      o += p - f;
    }
    return a;
  }
  const Fl = [
    {
      value: "300",
      label: "Light 300"
    },
    {
      value: "400",
      label: "Regular 400"
    },
    {
      value: "500",
      label: "Medium 500"
    },
    {
      value: "600",
      label: "Semibold 600"
    },
    {
      value: "700",
      label: "Bold 700"
    },
    {
      value: "800",
      label: "ExtraBold 800"
    }
  ], Kl = [
    {
      value: "multiply",
      label: "Multiply"
    },
    {
      value: "overlay",
      label: "Overlay"
    },
    {
      value: "soft-light",
      label: "Soft light"
    },
    {
      value: "screen",
      label: "Screen"
    },
    {
      value: "darken",
      label: "Darken"
    },
    {
      value: "lighten",
      label: "Lighten"
    },
    {
      value: "color-burn",
      label: "Color burn"
    },
    {
      value: "normal",
      label: "Normal"
    }
  ];
  function W(e, t, n) {
    return Math.min(n, Math.max(t, e));
  }
  const mo = 0.92, ha = 0.35;
  function Wl(e, t) {
    const n = e.x - t.x, r = e.y - t.y;
    return n * n + r * r;
  }
  function go(e, t, n = mo) {
    const r = W(n, 0.05, 1);
    return {
      x: e.x + (t.x - e.x) * r,
      y: e.y + (t.y - e.y) * r,
      pressure: e.pressure + (t.pressure - e.pressure) * r
    };
  }
  function ql(e, t, n, r = mo) {
    let a = t;
    const o = ha * ha;
    for (const l of n) {
      a = go(a, l, r);
      const c = e[e.length - 1];
      !c || Wl(c, a) >= o ? e.push({
        ...a
      }) : (c.x = a.x, c.y = a.y, c.pressure = a.pressure);
    }
    return a;
  }
  function Ul(e) {
    if (e.length === 0) return "";
    const t = e[0];
    if (!t) return "";
    if (e.length === 1) return `M ${t.x} ${t.y} L ${t.x + 0.01} ${t.y}`;
    if (e.length === 2) {
      const r = e[1];
      return `M ${t.x} ${t.y} L ${r.x} ${r.y}`;
    }
    let n = `M ${t.x} ${t.y}`;
    for (let r = 0; r < e.length - 1; r += 1) {
      const a = e[r === 0 ? 0 : r - 1], o = e[r], l = e[r + 1], c = e[r + 2 < e.length ? r + 2 : r + 1], d = o.x + (l.x - a.x) / 6, p = o.y + (l.y - a.y) / 6, f = l.x - (c.x - o.x) / 6, m = l.y - (c.y - o.y) / 6;
      n += ` C ${d} ${p} ${f} ${m} ${l.x} ${l.y}`;
    }
    return n;
  }
  function ar(e) {
    if (e.dash !== "dashed") return;
    const t = hn(e), n = Math.max(2, t * 1.2);
    return `${Math.max(2, t * 2.2)} ${n}`;
  }
  function or(e) {
    return e === "square" ? "square" : "round";
  }
  function sr(e) {
    return e === "square" ? "miter" : "round";
  }
  function Vl(e) {
    switch (e) {
      case "overlay":
        return "overlay";
      case "soft-light":
        return "soft-light";
      case "screen":
        return "screen";
      case "darken":
        return "darken";
      case "lighten":
        return "lighten";
      case "color-burn":
        return "color-burn";
      case "normal":
        return "source-over";
      default:
        return "multiply";
    }
  }
  function pa(e, t, n) {
    e.lineCap = or(t.shape), e.lineJoin = sr(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, n), e.globalAlpha = W(t.opacity, 0.02, 1);
    const r = ar(t);
    r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
  }
  function Xl(e, t, n, r, a = 1) {
    const o = Math.max(0.25, t.diameterX * a / 2), l = Math.max(0.25, t.diameterY * a / 2);
    e.save(), e.translate(n.x, n.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-o, -l, o * 2, l * 2) : e.ellipse(0, 0, o, l, 0, 0, Math.PI * 2), e.fill(), e.restore();
  }
  function xo(e, t) {
    if (t.points.length < 1) return;
    if (e.globalAlpha = W(t.opacity, 0.02, 1), fo(t)) {
      const a = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), o = po(t.points, a);
      for (let l = 0; l < o.length; l += 1) {
        const c = o[l], d = Math.min(t.points.length - 1, Math.round(l / Math.max(1, o.length - 1) * (t.points.length - 1))), p = ho(t.points, d), f = t.kind === "pressure" ? c.pressure : 1;
        Xl(e, t, c, p, f);
      }
      return;
    }
    const n = hn(t);
    if (t.kind === "pressure" && t.points.length >= 2) {
      for (let a = 1; a < t.points.length; a += 1) {
        const o = t.points[a - 1], l = t.points[a], c = Math.max(0.5, n * ((o.pressure + l.pressure) / 2));
        pa(e, t, c), e.beginPath(), e.moveTo(o.x, o.y), e.lineTo(l.x, l.y), e.stroke();
      }
      return;
    }
    pa(e, t, n), e.beginPath();
    const r = t.points[0];
    if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
    else for (let a = 1; a < t.points.length; a += 1) {
      const o = t.points[a];
      e.lineTo(o.x, o.y);
    }
    e.stroke();
  }
  function ma(e, t, n) {
    const r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
    const a = r.getContext("2d");
    if (!a) return r;
    a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
    for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = "source-over", a.strokeStyle = o.color), xo(a, o), a.restore();
    return r;
  }
  function ga(e, t, n) {
    const r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
    const a = r.getContext("2d");
    if (!a) return r;
    a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
    for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = Vl(o.blend), a.strokeStyle = o.color), xo(a, o), a.restore();
    return r;
  }
  function xa(e, t, n) {
    var _a2;
    e.textBaseline = "top", e.textAlign = "left";
    for (const r of t) {
      const a = r.text ?? "";
      if (!a.trim() && a.length === 0) continue;
      const o = Math.max(1, r.fontSizePx * Math.max(1e-3, n));
      e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = W(r.opacity, 0.02, 1), e.fillStyle = r.color;
      const l = ((_a2 = r.fontFamily) == null ? void 0 : _a2.trim()) || "sans-serif";
      e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${o}px ${l}`;
      const c = o * 1.3, d = a.split(`
`);
      for (let p = 0; p < d.length; p += 1) e.fillText(d[p] ?? "", r.x, r.y + p * c);
      e.restore();
    }
  }
  const ba = 8192;
  function Ql(e) {
    const t = Math.max(1, e.clientWidth), n = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, a = e.naturalHeight > 0 ? e.naturalHeight : n, o = Math.min(3, window.devicePixelRatio || 1);
    let l = Math.max(r, Math.round(t * o)), c = Math.max(a, Math.round(n * o));
    const d = Math.max(l, c);
    if (d > ba) {
      const p = ba / d;
      l = Math.max(1, Math.round(l * p)), c = Math.max(1, Math.round(c * p));
    }
    return {
      bufW: l,
      bufH: c,
      cssW: t,
      cssH: n
    };
  }
  let on = null;
  pf = function(e) {
    on = e;
  };
  function Yl() {
    return typeof on == "function";
  }
  bo = async function(e) {
    var _a2;
    if (!on) throw new Error("Image upload is not available");
    const n = (_a2 = (await on([
      e
    ]))[0]) == null ? void 0 : _a2.trim();
    if (!n) throw new Error("Upload returned no path");
    return n;
  };
  mf = function(e) {
    return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [
      e.trim()
    ] : [];
  };
  function Gl(e, t) {
    const n = Math.max(e.left, t.left), r = Math.max(e.top, t.top), a = Math.min(e.right, t.right), o = Math.min(e.bottom, t.bottom);
    return a - n < 1 || o - r < 1 ? null : {
      left: n,
      top: r,
      right: a,
      bottom: o
    };
  }
  function ka(e, t, n, r) {
    const a = Math.max(1, Math.round(t)), o = Math.max(1, Math.round(n)), l = Gl(e, r);
    if (!l) return null;
    const c = Math.max(1, e.right - e.left), d = Math.max(1, e.bottom - e.top), p = (l.left - e.left) / c * a, f = (l.top - e.top) / d * o, m = (l.right - l.left) / c * a, g = (l.bottom - l.top) / d * o, x = Xt(Math.floor(p), 0, a - 1), y = Xt(Math.floor(f), 0, o - 1), k = Xt(Math.ceil(p + m), x + 1, a), j = Xt(Math.ceil(f + g), y + 1, o);
    return {
      sx: x,
      sy: y,
      sw: k - x,
      sh: j - y
    };
  }
  function Zl(e, t, n, r = 2) {
    return e.sx <= r && e.sy <= r && e.sx + e.sw >= t - r && e.sy + e.sh >= n - r;
  }
  function wa(e, t) {
    const n = document.createElement("canvas");
    n.width = Math.max(1, t.sw), n.height = Math.max(1, t.sh);
    const r = n.getContext("2d");
    if (!r) throw new Error("Canvas 2D unavailable");
    return r.drawImage(e, t.sx, t.sy, t.sw, t.sh, 0, 0, n.width, n.height), n;
  }
  function Xt(e, t, n) {
    return Math.min(n, Math.max(t, e));
  }
  function Jl() {
    if (typeof window > "u") return null;
    const e = window.BarcodeDetector;
    return typeof e == "function" ? e : null;
  }
  async function ec(e) {
    const t = Jl();
    if (!t) return null;
    try {
      const r = await new t({
        formats: [
          "qr_code"
        ]
      }).detect(e);
      for (const a of r) {
        const o = String(a.rawValue ?? "").trim();
        if (o) return o;
      }
    } catch {
    }
    return null;
  }
  async function tc(e) {
    let t = null;
    try {
      t = await createImageBitmap(e);
    } catch {
      t = null;
    }
    if (t) try {
      const r = document.createElement("canvas");
      r.width = Math.max(1, t.width), r.height = Math.max(1, t.height);
      const a = r.getContext("2d", {
        willReadFrequently: true
      });
      if (!a) throw new Error("Canvas\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return a.drawImage(t, 0, 0), a.getImageData(0, 0, r.width, r.height);
    } finally {
      t.close();
    }
    const n = URL.createObjectURL(e);
    try {
      const r = await new Promise((d, p) => {
        const f = new Image();
        f.decoding = "async", f.onload = () => d(f), f.onerror = () => p(new Error("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")), f.src = n;
      }), a = Math.max(1, r.naturalWidth || r.width), o = Math.max(1, r.naturalHeight || r.height), l = document.createElement("canvas");
      l.width = a, l.height = o;
      const c = l.getContext("2d", {
        willReadFrequently: true
      });
      if (!c) throw new Error("Canvas\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return c.drawImage(r, 0, 0), c.getImageData(0, 0, a, o);
    } finally {
      URL.revokeObjectURL(n);
    }
  }
  async function nc(e) {
    const n = (await mi(() => import("./vendor-jsqr-781CUKnt.js").then((o) => o.j), __vite__mapDeps([0,1]))).default, r = n(e.data, e.width, e.height, {
      inversionAttempts: "attemptBoth"
    });
    return String((r == null ? void 0 : r.data) ?? "").trim() || null;
  }
  function rc(e) {
    const t = Math.min(e.width, e.height);
    if (t >= 320 || t < 1) return e;
    const n = Math.min(4, 480 / t), r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e.width * n)), r.height = Math.max(1, Math.round(e.height * n));
    const a = r.getContext("2d");
    return a ? (a.imageSmoothingEnabled = false, a.drawImage(e, 0, 0, r.width, r.height), r) : e;
  }
  function ac(e) {
    return new Promise((t, n) => {
      e.toBlob((r) => {
        if (!r) {
          n(new Error("Failed to encode PNG"));
          return;
        }
        t(new File([
          r
        ], "qr-region.png", {
          type: "image/png"
        }));
      }, "image/png");
    });
  }
  async function oc(e) {
    const t = rc(e), n = await ac(t);
    return sc(n);
  }
  sc = async function(e) {
    if (!(e instanceof File) || e.size <= 0) throw new Error("\uC774\uBBF8\uC9C0 \uD30C\uC77C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    const t = await ec(e);
    if (t) return t;
    const n = await tc(e), r = await nc(n);
    if (r) return r;
    throw new Error("\uC774\uBBF8\uC9C0\uC5D0\uC11C QR \uCF54\uB4DC\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  };
  const yr = [
    0.22,
    1,
    0.36,
    1
  ], ic = {
    duration: 0.2,
    ease: yr
  }, lc = {
    duration: 0.28,
    ease: yr
  }, Qt = 0.5, Yt = 8, rt = 1.25, cc = 2, Me = 0.5, Le = 128, uc = 4e3, ko = 450, dc = [
    "#111827",
    "#ef4444",
    "#f59e0b",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ffffff"
  ], fc = [
    "#facc15",
    "#f472b6",
    "#38bdf8",
    "#4ade80",
    "#fb923c"
  ], hc = {
    backgroundColor: "#ffffff",
    backgroundImage: [
      "linear-gradient(45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)",
      "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"
    ].join(","),
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
  };
  function at(e) {
    return Math.round(e * 10) / 10;
  }
  function pc(e) {
    return Math.max(0.1, at(e / 10));
  }
  function ya(e, t) {
    return at(W(e + t * pc(e), Me, Le));
  }
  const ir = 8, lr = 400;
  function mc() {
    if (typeof navigator > "u") return false;
    const e = navigator.platform || "", t = navigator.userAgent || "";
    return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
  }
  const wo = mc(), ie = fi(), Ca = wo ? `${ie}+Shift+Z` : `${ie}+Y`;
  function gc(e, t) {
    const n = Math.max(1, Math.round(e / 10));
    return W(Math.round(e + t * n), ir, lr);
  }
  function xc(e, t) {
    if (!t) return 1;
    const n = e.pressure;
    return typeof n != "number" || Number.isNaN(n) || e.pointerType === "mouse" ? 0.5 : W(n || 0.05, 0.05, 1);
  }
  function q({ label: e, active: t = false, disabled: n = false, tone: r = "default", onClick: a, children: o }) {
    const l = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
    return i.jsxs(ln, {
      children: [
        i.jsx(cn, {
          asChild: true,
          children: i.jsx("button", {
            type: "button",
            "aria-label": e,
            disabled: n,
            onClick: a,
            className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${l}`,
            children: o
          })
        }),
        i.jsx(un, {
          children: i.jsxs(dn, {
            side: "top",
            sideOffset: 6,
            className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow",
            children: [
              e,
              i.jsx(fn, {
                className: "fill-neutral-900"
              })
            ]
          })
        })
      ]
    });
  }
  const bc = {
    backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)"
  };
  function Sa({ size: e = 16 }) {
    return i.jsx("svg", {
      width: e,
      height: e,
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": true,
      children: i.jsx("path", {
        d: "M2 8h12",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round"
      })
    });
  }
  function Ma({ size: e = 16 }) {
    return i.jsx("svg", {
      width: e,
      height: e,
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": true,
      children: i.jsx("path", {
        d: "M2 8h3M7 8h3M12 8h2",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round"
      })
    });
  }
  function me({ stroke: e, fading: t = false }) {
    const n = e.kind === "eraser", r = n ? "#000" : e.color, a = n ? 1 : e.opacity, o = t ? {
      opacity: 0,
      transition: `opacity ${ko}ms ease-out`
    } : {
      opacity: a
    };
    if (fo(e)) {
      const d = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), p = po(e.points, d);
      return i.jsx("g", {
        style: o,
        children: p.map((f, m) => {
          const g = Math.min(e.points.length - 1, Math.round(m / Math.max(1, p.length - 1) * (e.points.length - 1))), x = ho(e.points, g) * 180 / Math.PI, y = e.kind === "pressure" ? f.pressure : 1, k = Math.max(0.25, e.diameterX * y / 2), j = Math.max(0.25, e.diameterY * y / 2);
          return e.shape === "square" ? i.jsx("rect", {
            x: -k,
            y: -j,
            width: k * 2,
            height: j * 2,
            fill: r,
            transform: `translate(${f.x} ${f.y}) rotate(${x})`
          }, `${e.id}-st-${m}`) : i.jsx("ellipse", {
            cx: 0,
            cy: 0,
            rx: k,
            ry: j,
            fill: r,
            transform: `translate(${f.x} ${f.y}) rotate(${x})`
          }, `${e.id}-st-${m}`);
        })
      });
    }
    const l = hn(e);
    if (e.kind === "pressure" && e.points.length >= 2) return i.jsx("g", {
      style: o,
      children: e.points.slice(1).map((d, p) => {
        const f = e.points[p], m = Math.max(0.5, l * ((f.pressure + d.pressure) / 2));
        return i.jsx("path", {
          d: `M ${f.x} ${f.y} L ${d.x} ${d.y}`,
          fill: "none",
          stroke: r,
          strokeWidth: m,
          strokeLinecap: or(e.shape),
          strokeLinejoin: sr(e.shape),
          strokeMiterlimit: 2,
          strokeDasharray: ar({
            ...e,
            diameterX: m,
            diameterY: m
          }),
          style: {
            fill: "none"
          }
        }, `${e.id}-p-${p}`);
      })
    });
    const c = Ul(e.points);
    return c ? i.jsx("path", {
      d: c,
      fill: "none",
      stroke: r,
      strokeWidth: l,
      strokeLinecap: or(e.shape),
      strokeLinejoin: sr(e.shape),
      strokeMiterlimit: 2,
      strokeDasharray: ar(e),
      style: {
        ...o,
        fill: "none"
      }
    }) : null;
  }
  yo = function({ src: e, alt: t = "", open: n, onClose: r, onSaveAnnotated: a }) {
    const o = !!(n && e), [l, c] = h.useState(1), [d, p] = h.useState({
      x: 0,
      y: 0
    }), [f, m] = h.useState("pan"), [g, x] = h.useState(false), [y, k] = h.useState("#111827ff"), [j, A] = h.useState("#facc15ff"), [O, N] = h.useState(4), [M, E] = h.useState(4), [D, I] = h.useState(1), [B, G] = h.useState(0.45), [le, it] = h.useState("multiply"), [oe, T] = h.useState("circle"), [L, z] = h.useState("solid"), [R, K] = h.useState([]), [F, J] = h.useState([]), [Fe, Ke] = h.useState([]), [ne, ee] = h.useState([]), [Q, Z] = h.useState(null), [Y, U] = h.useState(null), [Ae, se] = h.useState("Paperozi, sans-serif"), [te, lt] = h.useState(24), [We, xn] = h.useState("400"), [bn, kn] = h.useState("normal"), [Do, wn] = h.useState(() => /* @__PURE__ */ new Set()), [re, je] = h.useState(null), [yn, Cn] = h.useState(false), [Bo, we] = h.useState([]), [P, Ho] = h.useState({
      w: 1,
      h: 1
    }), [Dt, ct] = h.useState(null), [_o, Sn] = h.useState(false), [ut, vr] = h.useState(false), [Er, Bt] = h.useState("idle"), qe = h.useRef(null), [ce, Ue] = h.useState(false), [Ht, Ve] = h.useState(false), [Pe, dt] = h.useState(null), [Mn, $e] = h.useState(null), [Oo, _t] = h.useState(false), [ve, fe] = h.useState(null), de = h.useRef(null), Tr = h.useRef(() => {
    }), he = h.useRef(0), [Lr, jn] = h.useState(null), [vn, Ot] = h.useState(false), [En, Tn] = h.useState(false), [Ln, ft] = h.useState(false), In = h.useRef({
      w: 4,
      h: 4
    }), ht = h.useRef(null), Nn = h.useRef(null), Xe = h.useRef(null), Re = h.useRef(null), Ir = h.useRef([]), Nr = h.useRef([]), pt = h.useRef([]), ye = h.useRef(null), Ce = h.useRef(null), An = h.useRef(null), Ar = h.useRef(null), Pn = h.useRef(0), Se = h.useRef(null), $n = h.useRef(null), Qe = h.useRef(null), mt = h.useRef(null), zt = h.useRef(null), De = h.useRef(null), gt = h.useRef(1), Pr = h.useRef(l), $r = h.useRef(0), Ye = h.useRef(/* @__PURE__ */ new Map()), Rn = h.useRef([]), xt = h.useRef(null);
    Ir.current = R, Nr.current = F, pt.current = ne, Pr.current = l;
    const Dn = !!a && Yl() && (R.length > 0 || F.length > 0 || ne.some((s) => s.text.trim().length > 0)), bt = ne.find((s) => s.id === Q) ?? null, kt = f === "highlighter" ? j : y, zo = f === "highlighter" ? B : D, wt = h.useCallback(() => {
      c(1), p({
        x: 0,
        y: 0
      });
    }, []), Ft = h.useCallback(() => {
      for (const s of Ye.current.values()) clearTimeout(s);
      Ye.current.clear();
    }, []), Bn = h.useCallback(() => {
      K([]), J([]), Ke([]), ee([]), Z(null), U(null), wn(/* @__PURE__ */ new Set()), we([]), Rn.current = [], je(null), Cn(false), ye.current = null, Ce.current = null, Pn.current = 0;
      const s = Ar.current, u = An.current;
      s && u && s.clearRect(0, 0, u.width, u.height), Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), mt.current = null, Ft();
    }, [
      Ft
    ]), Hn = h.useRef(false);
    h.useEffect(() => {
      if (!o) {
        Hn.current = false;
        return;
      }
      const s = !Hn.current;
      Hn.current = true, s && (wt(), Bn(), m("pan"), x(false), Ue(false), Ve(false), dt(null), $e(null), fe(null), de.current = null, he.current += 1, jn(null), ct(null));
    }, [
      o,
      e,
      wt,
      Bn
    ]), h.useEffect(() => {
      var _a2;
      o || (ft(false), Ft(), (_a2 = xt.current) == null ? void 0 : _a2.call(xt), xt.current = null);
    }, [
      o,
      Ft
    ]);
    const Ge = h.useCallback(() => {
      const s = Nn.current;
      if (!s) return;
      const { bufW: u, bufH: b, cssW: w } = Ql(s);
      w < 8 || s.clientHeight < 8 || (gt.current = zl(u, w), Ho({
        w: u,
        h: b
      }));
    }, []);
    h.useEffect(() => {
      if (!o) return;
      Ge();
      const s = Nn.current;
      if (!s) return;
      const u = () => Ge();
      s.addEventListener("load", u);
      const b = typeof ResizeObserver < "u" ? new ResizeObserver(Ge) : null;
      return b == null ? void 0 : b.observe(s), window.addEventListener("resize", Ge), () => {
        s.removeEventListener("load", u), b == null ? void 0 : b.disconnect(), window.removeEventListener("resize", Ge);
      };
    }, [
      o,
      e,
      Ge
    ]), h.useEffect(() => {
      if (!o) {
        Re.current = null, Sn(false);
        return;
      }
      let s = false;
      const u = Xe.current;
      if (!u || !Dl()) {
        Sn(false);
        return;
      }
      return Bl(u).then((b) => {
        s || (Re.current = b, Sn(!!b));
      }), () => {
        s = true, Re.current = null;
      };
    }, [
      o,
      e,
      P.w
    ]);
    const Ze = h.useCallback((s, u, b) => {
      const w = ht.current;
      if (!w) {
        c(W(s, Qt, Yt));
        return;
      }
      const S = w.getBoundingClientRect(), C = u - S.left - S.width / 2, v = b - S.top - S.height / 2;
      c((_) => {
        const V = W(s, Qt, Yt), pe = V / _;
        return p((ue) => ({
          x: C - (C - ue.x) * pe,
          y: v - (v - ue.y) * pe
        })), V;
      });
    }, []), Fo = h.useCallback((s) => {
      var _a2;
      if ((_a2 = xt.current) == null ? void 0 : _a2.call(xt), xt.current = null, ht.current = s, !s) return;
      const u = (b) => {
        b.preventDefault(), b.stopPropagation();
        const w = b.deltaY > 0 ? 1 / rt : rt;
        Ze(Pr.current * w, b.clientX, b.clientY);
      };
      s.addEventListener("wheel", u, {
        passive: false,
        capture: true
      }), xt.current = () => {
        s.removeEventListener("wheel", u, true);
      };
    }, [
      Ze
    ]), Ko = h.useCallback((s) => {
      if (s.preventDefault(), s.stopPropagation(), l > 1.05) {
        wt();
        return;
      }
      Ze(cc, s.clientX, s.clientY);
    }, [
      l,
      wt,
      Ze
    ]), yt = h.useCallback((s, u) => {
      const b = Xe.current;
      if (!b) return null;
      const w = b.getBoundingClientRect();
      return w.width < 1 || w.height < 1 ? null : {
        x: (s.clientX - w.left) / w.width * P.w,
        y: (s.clientY - w.top) / w.height * P.h,
        pressure: xc(s, u)
      };
    }, [
      P.w,
      P.h
    ]), _n = h.useCallback((s) => {
      const u = s === "laser" ? 0.75 : 1, b = s === "highlighter" ? 4 : s === "laser" ? 2 : Me;
      if (s === "highlighter") return {
        w: Math.max(b, O * u),
        h: Math.max(b, M * u)
      };
      const w = Math.max(b, O * u);
      return {
        w,
        h: w
      };
    }, [
      O,
      M
    ]);
    h.useEffect(() => {
      f !== "eraser" && (f === "pen" || f === "pressure" || f === "highlighter" || f === "laser") && (In.current = {
        w: O,
        h: M
      });
    }, [
      f,
      O,
      M
    ]);
    const Rr = h.useCallback(() => {
      const s = In.current;
      N(s.w), E(s.h);
    }, []), Dr = h.useCallback(() => {
      const s = In.current, u = Math.max(s.w, s.h), b = at(W(u * 5, Me, Le));
      N(b), E(b), m("eraser");
    }, []), ae = h.useCallback((s) => {
      if (he.current += 1, Ue(false), fe(null), de.current = null, f === "eraser" && s !== "eraser" && Rr(), s === "eraser") {
        Dr();
        return;
      }
      if (s === "highlighter") {
        m("highlighter"), z("solid"), T("square");
        return;
      }
      m(s);
    }, [
      f,
      Rr,
      Dr
    ]), Br = h.useCallback((s) => {
      var _a2, _b;
      s.preventDefault(), s.stopPropagation(), (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId), De.current = {
        pointerId: s.pointerId,
        startX: s.clientX,
        startY: s.clientY,
        originX: d.x,
        originY: d.y
      };
    }, [
      d.x,
      d.y
    ]), Hr = h.useCallback((s) => {
      const u = De.current;
      !u || u.pointerId !== s.pointerId || (s.preventDefault(), p({
        x: u.originX + (s.clientX - u.startX),
        y: u.originY + (s.clientY - u.startY)
      }));
    }, []), _r = h.useCallback((s) => {
      var _a2, _b;
      const u = De.current;
      if (!(!u || u.pointerId !== s.pointerId)) {
        De.current = null;
        try {
          (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
        } catch {
        }
      }
    }, []), Je = h.useCallback((s) => {
      const u = Ye.current.get(s);
      u && clearTimeout(u);
      const b = setTimeout(() => {
        wn((S) => {
          const C = new Set(S);
          return C.add(s), C;
        });
        const w = setTimeout(() => {
          Ye.current.delete(s), wn((S) => {
            const C = new Set(S);
            return C.delete(s), C;
          }), Ke((S) => S.filter((C) => C.id !== s));
        }, ko);
        Ye.current.set(s, w);
      }, uc);
      Ye.current.set(s, b);
    }, []), Be = h.useCallback(() => {
      const s = An.current, u = Ar.current ?? (s == null ? void 0 : s.getContext("2d"));
      s && u && u.clearRect(0, 0, s.width, s.height), Pn.current = 0;
    }, []), On = h.useCallback(() => {
      Se.current == null && (Se.current = requestAnimationFrame(() => {
        Se.current = null;
        const s = ye.current;
        if (!s) {
          je(null);
          return;
        }
        je({
          ...s,
          points: s.points.slice()
        });
      }));
    }, []), et = h.useCallback((s, u) => {
      const b = s.nativeEvent, w = typeof b.getCoalescedEvents == "function" ? b.getCoalescedEvents() : [], S = w.length > 0 ? w : [
        b
      ], C = [];
      for (const v of S) {
        const _ = yt(v, u);
        _ && C.push(_);
      }
      if (C.length === 0) {
        const v = yt(s, u);
        v && C.push(v);
      }
      return C;
    }, [
      yt
    ]), Or = h.useCallback((s) => {
      var _a2, _b;
      if (f !== "pen" && f !== "pressure" && f !== "highlighter" && f !== "laser" && f !== "eraser") return;
      s.preventDefault(), s.stopPropagation();
      const b = et(s, f === "pressure"), w = b[b.length - 1];
      if (!w) return;
      (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
      const S = f === "eraser" ? "eraser" : f === "highlighter" ? "highlighter" : f === "laser" ? "laser" : f === "pressure" ? "pressure" : "pen", C = S === "laser" ? "#ef4444" : S === "highlighter" ? j : S === "eraser" ? "#000000" : y, v = _n(S), _ = W(gt.current, 0.25, 12), V = fa(Math.max(0.5, v.w * _), P.w, P.h), pe = fa(Math.max(0.5, v.h * _), P.w, P.h), ue = S === "eraser" ? 1 : S === "laser" ? 0.9 : S === "highlighter" ? B : D, X = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        seq: ++$r.current,
        kind: S,
        color: C,
        diameterX: V,
        diameterY: pe,
        points: [
          w
        ],
        shape: oe,
        dash: L,
        opacity: ue,
        ...S === "highlighter" ? {
          blend: le
        } : {}
      };
      if (ye.current = X, Ce.current = {
        ...w
      }, Cn(true), Pn.current = 0, je({
        ...X,
        points: [
          ...X.points
        ]
      }), Be(), S === "laser" && Je(X.id), (S === "pen" || S === "pressure") && Re.current && s.nativeEvent.isTrusted) try {
        const ls = Math.max(v.w, v.h);
        Re.current.updateInkTrailStartPoint(s.nativeEvent, {
          color: y,
          diameter: Math.max(1, ls * (S === "pressure" ? w.pressure : 1))
        });
      } catch {
      }
    }, [
      f,
      y,
      j,
      B,
      D,
      le,
      oe,
      L,
      et,
      _n,
      Je,
      Be,
      On
    ]), zr = h.useCallback((s) => {
      const u = ye.current;
      if (!u) return;
      s.preventDefault();
      const b = u.kind === "pressure", w = et(s, b);
      if (!w.length) return;
      const S = Ce.current ?? u.points[u.points.length - 1];
      if (S && (Ce.current = ql(u.points, S, w), On(), u.kind === "laser" && Je(u.id), (u.kind === "pen" || u.kind === "pressure") && Re.current && s.nativeEvent.isTrusted)) try {
        const C = Ce.current, _ = hn(u) / Math.max(1e-3, gt.current);
        Re.current.updateInkTrailStartPoint(s.nativeEvent, {
          color: u.color,
          diameter: Math.max(1, _ * (u.kind === "pressure" ? (C == null ? void 0 : C.pressure) ?? 1 : 1))
        });
      } catch {
      }
    }, [
      et,
      On,
      Je
    ]), Fr = h.useCallback((s) => {
      var _a2, _b;
      const u = ye.current;
      if (!u) return;
      const b = u.kind === "pressure", w = et(s, b), S = w[w.length - 1];
      if (S && Ce.current) {
        const v = go(Ce.current, S, 1), _ = u.points[u.points.length - 1];
        !_ || _.x !== v.x || _.y !== v.y ? u.points.push(v) : _.pressure = v.pressure, Ce.current = v;
      }
      ye.current = null, Ce.current = null, Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), Cn(false);
      try {
        (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
      } catch {
      }
      if (u.points.length === 0) {
        je(null), Be();
        return;
      }
      const C = {
        ...u,
        points: [
          ...u.points
        ]
      };
      if (u.kind === "laser") {
        Ke((v) => [
          ...v,
          C
        ]), Je(u.id), je(null), Be();
        return;
      }
      if (we([]), u.kind === "highlighter") J((v) => [
        ...v,
        C
      ]);
      else if (u.kind === "eraser") {
        K((v) => [
          ...v,
          C
        ]), J((v) => [
          ...v,
          C
        ]), je(null), Be();
        return;
      } else K((v) => [
        ...v,
        C
      ]);
      je(null), Be();
    }, [
      et,
      Je,
      Be
    ]), Kt = h.useCallback((s) => {
      Q && ee((u) => u.map((b) => b.id === Q ? {
        ...b,
        ...s
      } : b));
    }, [
      Q
    ]), Kr = h.useCallback((s) => {
      s.preventDefault(), s.stopPropagation();
      const u = yt(s, false);
      if (!u) return;
      const b = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, w = {
        id: b,
        seq: ++$r.current,
        x: u.x,
        y: u.y,
        text: "",
        color: y,
        opacity: D,
        fontSizePx: te,
        fontFamily: Ae,
        fontWeight: We,
        fontStyle: bn
      };
      we([]), ee((S) => [
        ...S,
        w
      ]), Z(b), U(b), window.setTimeout(() => {
        var _a2;
        return (_a2 = zt.current) == null ? void 0 : _a2.focus();
      }, 30);
    }, [
      yt,
      y,
      D,
      te,
      Ae,
      We,
      bn
    ]), Wo = h.useCallback((s) => {
      var _a2, _b;
      if (ce) {
        if (s.button !== 0) return;
        s.preventDefault(), s.stopPropagation(), (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId), de.current = {
          pointerId: s.pointerId,
          x0: s.clientX,
          y0: s.clientY
        }, fe({
          x: s.clientX,
          y: s.clientY,
          w: 0,
          h: 0
        });
        return;
      }
      if (!g || s.button === 1 || f === "pan") {
        Br(s);
        return;
      }
      if (f === "text") {
        U(null), Kr(s);
        return;
      }
      Z(null), U(null), Or(s);
    }, [
      ce,
      g,
      f,
      Br,
      Or,
      Kr
    ]), qo = h.useCallback((s) => {
      if (!ye.current) {
        const w = {
          x: s.clientX,
          y: s.clientY
        }, S = Qe.current;
        S ? (Qe.current = {
          x: S.x + (w.x - S.x) * 0.72,
          y: S.y + (w.y - S.y) * 0.72
        }, $n.current == null && ($n.current = requestAnimationFrame(() => {
          $n.current = null, Qe.current && ct({
            ...Qe.current
          });
        }))) : (Qe.current = w, ct(w));
      }
      const u = de.current;
      if (u && u.pointerId === s.pointerId) {
        s.preventDefault();
        const w = Math.min(u.x0, s.clientX), S = Math.min(u.y0, s.clientY);
        fe({
          x: w,
          y: S,
          w: Math.abs(s.clientX - u.x0),
          h: Math.abs(s.clientY - u.y0)
        });
        return;
      }
      const b = mt.current;
      if (b && b.pointerId === s.pointerId) {
        s.preventDefault();
        const w = Xe.current;
        if (!w) return;
        const S = w.getBoundingClientRect(), C = (s.clientX - b.startClientX) / Math.max(1, S.width) * P.w, v = (s.clientY - b.startClientY) / Math.max(1, S.height) * P.h;
        ee((_) => _.map((V) => V.id === b.id ? {
          ...V,
          x: b.originX + C,
          y: b.originY + v
        } : V));
        return;
      }
      if (De.current) {
        Hr(s);
        return;
      }
      ye.current && zr(s);
    }, [
      Hr,
      zr,
      P.w,
      P.h
    ]), Wr = h.useCallback((s) => {
      var _a2, _b, _c2, _d2, _e2;
      const u = de.current;
      if (u && u.pointerId === s.pointerId) {
        de.current = null;
        try {
          (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
        } catch {
        }
        const b = Math.abs(s.clientX - u.x0), w = Math.abs(s.clientY - u.y0);
        if (fe(null), b >= 12 && w >= 12) {
          const S = Math.min(u.x0, s.clientX), C = Math.min(u.y0, s.clientY);
          Tr.current({
            left: S,
            top: C,
            right: S + b,
            bottom: C + w
          });
        }
        return;
      }
      if (((_c2 = mt.current) == null ? void 0 : _c2.pointerId) === s.pointerId) {
        mt.current = null;
        try {
          (_e2 = (_d2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _e2.call(_d2, s.pointerId);
        } catch {
        }
      }
      De.current && _r(s), ye.current && Fr(s);
    }, [
      _r,
      Fr
    ]), Ct = h.useCallback(() => {
      var _a2;
      const s = Y ?? Q;
      try {
        (_a2 = zt.current) == null ? void 0 : _a2.blur();
      } catch {
      }
      if (s) {
        const u = pt.current.find((b) => b.id === s);
        u && !u.text.trim() && (ee((b) => b.filter((w) => w.id !== s)), Z(null));
      }
      U(null);
    }, [
      Y,
      Q
    ]), zn = h.useCallback(() => {
      const s = Q;
      if (!s) return;
      const u = pt.current.find((b) => b.id === s);
      u && (Rn.current.push({
        ...u
      }), we([]), ee((b) => b.filter((w) => w.id !== s)), Z(null), U(null));
    }, [
      Q
    ]), Fn = h.useCallback(() => {
      const s = Rn.current.pop();
      if (s) {
        ee((X) => [
          ...X,
          s
        ]), Z(s.id), U(null);
        return;
      }
      const u = Ir.current, b = Nr.current, w = pt.current, S = u[u.length - 1], C = b[b.length - 1], v = w[w.length - 1], _ = (S == null ? void 0 : S.seq) ?? -1, V = (C == null ? void 0 : C.seq) ?? -1, pe = (v == null ? void 0 : v.seq) ?? -1, ue = Math.max(_, V, pe);
      if (!(ue < 0)) {
        if (pe === ue && v) {
          we((X) => [
            ...X,
            {
              layer: "text",
              text: v
            }
          ]), ee(w.slice(0, -1)), Z((X) => X === v.id ? null : X);
          return;
        }
        if (S && C && S.id === C.id && S.kind === "eraser" && S.seq === ue) {
          we((X) => [
            ...X,
            {
              layer: "both",
              stroke: S
            }
          ]), K(u.slice(0, -1)), J(b.slice(0, -1));
          return;
        }
        if (_ >= V && S && _ === ue) {
          we((X) => [
            ...X,
            {
              layer: "ink",
              stroke: S
            }
          ]), K(u.slice(0, -1));
          return;
        }
        C && V === ue && (we((X) => [
          ...X,
          {
            layer: "highlight",
            stroke: C
          }
        ]), J(b.slice(0, -1)));
      }
    }, []), Kn = h.useCallback(() => {
      we((s) => {
        if (!s.length) return s;
        const u = s[s.length - 1];
        return u ? (u.layer === "text" ? ee((b) => [
          ...b,
          u.text
        ]) : u.layer === "both" || u.stroke.kind === "eraser" ? (K((b) => [
          ...b,
          u.stroke
        ]), J((b) => [
          ...b,
          u.stroke
        ])) : u.layer === "ink" ? K((b) => [
          ...b,
          u.stroke
        ]) : J((b) => [
          ...b,
          u.stroke
        ]), s.slice(0, -1)) : s;
      });
    }, []), Wn = h.useCallback((s) => {
      N((u) => ya(u, s)), E((u) => ya(u, s));
    }, []), qr = h.useCallback((s) => {
      var _a2;
      const u = Q, b = (u ? (_a2 = pt.current.find((S) => S.id === u)) == null ? void 0 : _a2.fontSizePx : null) ?? te, w = gc(b, s);
      lt(w), u && ee((S) => S.map((C) => C.id === u ? {
        ...C,
        fontSizePx: w
      } : C));
    }, [
      Q,
      te
    ]), Uo = h.useCallback((s) => {
      const u = at(W(s, Me, Le));
      N(u), E(u);
    }, []), Vo = h.useCallback(() => {
      ae("highlighter");
    }, [
      ae
    ]), Wt = h.useCallback(async (s) => {
      if (!a || !e || ut) return;
      const u = ne.some((b) => b.text.trim().length > 0);
      if (!(R.length === 0 && F.length === 0 && !u)) {
        vr(true), jn(null);
        try {
          const b = ma(P.w, P.h, R), w = b.getContext("2d");
          w && xa(w, ne, gt.current);
          const S = ga(P.w, P.h, F), C = await Hl({
            src: e,
            inkCanvas: b,
            highlightCanvas: S
          }), v = new File([
            C
          ], `annotated-${Date.now()}.png`, {
            type: "image/png"
          });
          await a(s, v);
        } catch (b) {
          jn(b instanceof Error ? b.message : String(b));
        } finally {
          vr(false);
        }
      }
    }, [
      a,
      e,
      ut,
      R,
      F,
      ne,
      P.w,
      P.h
    ]), qt = h.useCallback(async () => {
      if (!e) throw new Error("\uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const s = ne.some((w) => w.text.trim().length > 0), u = R.length > 0 || s ? ma(P.w, P.h, R) : null;
      if (u) {
        const w = u.getContext("2d");
        w && xa(w, ne, gt.current);
      }
      const b = F.length > 0 ? ga(P.w, P.h, F) : null;
      return uo({
        src: e,
        inkCanvas: u,
        highlightCanvas: b
      });
    }, [
      e,
      R,
      F,
      ne,
      P.w,
      P.h
    ]), qn = h.useCallback(() => {
      var _a2, _b;
      if (!e) return;
      const s = ((_a2 = Xe.current) == null ? void 0 : _a2.getBoundingClientRect()) ?? null, u = ((_b = ht.current) == null ? void 0 : _b.getBoundingClientRect()) ?? null, b = (async () => {
        const w = await qt();
        if (!s || !u) return en(w);
        const S = ka(s, w.width, w.height, u);
        return !S || Zl(S, w.width, w.height) ? en(w) : en(wa(w, S));
      })();
      qe.current && clearTimeout(qe.current), hi(b).then(() => {
        Bt("done"), qe.current = setTimeout(() => Bt("idle"), 1600);
      }).catch(() => {
        Bt("error"), qe.current = setTimeout(() => Bt("idle"), 2e3);
      });
    }, [
      e,
      qt
    ]), St = h.useCallback((s) => {
      if (!e) return;
      const u = ++he.current;
      Ve(true), $e(null), dt(null), _t(false), (async () => {
        var _a2;
        try {
          const b = await qt();
          if (he.current !== u) return;
          let w = b;
          if (s !== "full") {
            const C = (_a2 = Xe.current) == null ? void 0 : _a2.getBoundingClientRect();
            if (!C) throw new Error("\uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
            const v = ka(C, b.width, b.height, s);
            if (!v) throw new Error("\uC774\uBBF8\uC9C0 \uC548\uC5D0\uC11C \uC601\uC5ED\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
            w = wa(b, v);
          }
          const S = await oc(w);
          if (he.current !== u) return;
          dt(S), fe(null), de.current = null;
        } catch (b) {
          if (he.current !== u) return;
          $e(b instanceof Error ? b.message : "QR \uCF54\uB4DC\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          he.current === u && Ve(false);
        }
      })();
    }, [
      e,
      qt
    ]);
    h.useEffect(() => {
      Tr.current = St;
    }, [
      St
    ]);
    const Ur = h.useCallback(() => {
      he.current += 1, Ue(false), Ve(false), fe(null), $e(null), de.current = null;
    }, []), Xo = h.useCallback(() => {
      dt(null), _t(false), fe(null), $e(null), de.current = null, Ue(true), St("full");
    }, [
      St
    ]), Qo = h.useCallback(() => {
      he.current += 1, Ue(false), Ve(false), fe(null), de.current = null, x(true), ae("pen");
    }, [
      ae
    ]), Yo = h.useCallback(() => {
      U(null), Z(null), ee((s) => s.filter((u) => u.text.trim().length > 0)), x(false), m("pan"), Tn(false), Ot(false), ct(null);
    }, []), Go = h.useCallback(() => {
      const s = Pe == null ? void 0 : Pe.trim();
      s && navigator.clipboard.writeText(s).then(() => {
        _t(true), window.setTimeout(() => _t(false), 1600);
      }, () => {
        $e("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      });
    }, [
      Pe
    ]);
    h.useEffect(() => () => {
      qe.current && clearTimeout(qe.current);
    }, []);
    const Un = R.length + F.length + ne.length, Vr = Un > 0 || !!re || yn, Ut = h.useCallback(() => {
      if (Vr) {
        ft(true);
        return;
      }
      ft(false), r();
    }, [
      Vr,
      r
    ]), Zo = h.useCallback(() => {
      ft(false), r();
    }, [
      r
    ]), Jo = h.useCallback(() => {
      ft(false);
    }, []);
    h.useEffect(() => {
      if (!o) return;
      const s = (u) => {
        var _a2;
        const b = u.target, w = (_a2 = b == null ? void 0 : b.tagName) == null ? void 0 : _a2.toLowerCase(), S = w === "input" || w === "textarea" || (b == null ? void 0 : b.isContentEditable), C = wo ? u.metaKey : u.ctrlKey, v = u.key.toLowerCase(), _ = u.code;
        if (pi(u)) {
          if (S) return;
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), qn();
          return;
        }
        if (C && v === "s") {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Wt(u.shiftKey ? "saveAs" : "overwrite");
          return;
        }
        if (C && v === "z" && !u.shiftKey) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Fn();
          return;
        }
        if (C && (v === "y" || v === "z" && u.shiftKey)) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Kn();
          return;
        }
        const V = !!Q || f === "text", pe = C && (u.shiftKey && (u.key === "<" || u.key === "," || _ === "Comma") || !u.shiftKey && (u.key === "[" || _ === "BracketLeft")), ue = C && (u.shiftKey && (u.key === ">" || u.key === "." || _ === "Period") || !u.shiftKey && (u.key === "]" || _ === "BracketRight"));
        if (V && (pe || ue)) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), qr(pe ? -1 : 1);
          return;
        }
        if (u.key === "Escape") {
          if (Ln) return;
          if (ce) {
            u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), he.current += 1, Ue(false), Ve(false), fe(null), $e(null), de.current = null;
            return;
          }
          if (f === "text" || Y) {
            u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Y ? Ct() : Z(null);
            return;
          }
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Ut();
          return;
        }
        if (Q && !C && (v === "backspace" || v === "delete")) {
          if (Y && S && w === "textarea" && b.value.length > 0) return;
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), zn();
          return;
        }
        if (!(S || !g)) {
          if (!C && u.key === "[") {
            u.preventDefault(), u.stopPropagation(), Wn(-1);
            return;
          }
          !C && u.key === "]" && (u.preventDefault(), u.stopPropagation(), Wn(1));
        }
      };
      return window.addEventListener("keydown", s, true), () => window.removeEventListener("keydown", s, true);
    }, [
      o,
      qn,
      Wt,
      Fn,
      Kn,
      Wn,
      qr,
      Q,
      Y,
      f,
      g,
      ce,
      Ct,
      zn,
      Ut,
      Ln
    ]);
    const es = g && !ce && f !== "pan" && f !== "text" && Dt != null && !De.current && !yn, Xr = _n(f === "eraser" ? "eraser" : f === "highlighter" ? "highlighter" : f === "laser" ? "laser" : f === "pressure" ? "pressure" : "pen"), Qr = Math.max(4, Xr.w * l), Yr = Math.max(4, Xr.h * l), ts = R.filter((s) => s.kind === "eraser"), ns = R.filter((s) => s.kind !== "eraser"), rs = F.filter((s) => s.kind === "eraser"), as = F.filter((s) => s.kind !== "eraser"), os = yn && f === "highlighter" ? {
      mixBlendMode: le
    } : {}, Gr = ti(nt(kt) || "#111827ff"), ss = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", Mt = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [jt, is] = h.useState(null);
    return i.jsxs(i.Fragment, {
      children: [
        i.jsx(nl, {
          open: o,
          onOpenChange: (s) => {
            s || Ut();
          },
          children: i.jsx(Xn, {
            children: o ? i.jsxs(rl, {
              forceMount: true,
              children: [
                i.jsx(al, {
                  asChild: true,
                  forceMount: true,
                  children: i.jsx(tt.div, {
                    className: "fixed inset-0 z-100060 bg-black/85",
                    initial: {
                      opacity: 0
                    },
                    animate: {
                      opacity: 1
                    },
                    exit: {
                      opacity: 0
                    },
                    transition: ic
                  })
                }),
                i.jsx(ol, {
                  asChild: true,
                  forceMount: true,
                  onOpenAutoFocus: (s) => s.preventDefault(),
                  onEscapeKeyDown: (s) => {
                    s.preventDefault();
                  },
                  children: i.jsxs(tt.div, {
                    ref: is,
                    className: "fixed inset-0 z-100061 flex flex-col outline-none",
                    "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30",
                    initial: {
                      opacity: 0,
                      scale: 0.98
                    },
                    animate: {
                      opacity: 1,
                      scale: 1
                    },
                    exit: {
                      opacity: 0,
                      scale: 0.98
                    },
                    transition: lc,
                    children: [
                      i.jsx(sl, {
                        className: "sr-only",
                        children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30"
                      }),
                      i.jsx(il, {
                        className: "sr-only",
                        children: "\uBCF4\uAE30 \uBAA8\uB4DC\uC5D0\uC11C \uD655\uB300, \uC774\uBBF8\uC9C0 \uBCF5\uC0AC, QR \uC778\uC2DD\uC744 \uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC5F0\uD544 \uBC84\uD2BC\uC73C\uB85C \uADF8\uB9AC\uAE30 \uD3B8\uC9D1\uC744 \uC5FD\uB2C8\uB2E4."
                      }),
                      i.jsx("div", {
                        ref: Fo,
                        className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${ce ? "cursor-crosshair" : !g || f === "pan" ? "cursor-grab" : f === "text" ? "cursor-text" : "cursor-none"}`,
                        onPointerDown: Wo,
                        onPointerMove: qo,
                        onPointerUp: Wr,
                        onPointerCancel: Wr,
                        onPointerLeave: () => {
                          ct(null), Qe.current = null;
                        },
                        children: e ? i.jsx("div", {
                          className: "relative will-change-transform",
                          style: {
                            transform: `translate(${d.x}px, ${d.y}px) scale(${l})`,
                            transformOrigin: "center center"
                          },
                          onClick: (s) => s.stopPropagation(),
                          children: i.jsxs("div", {
                            ref: Xe,
                            className: `relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl ${ce && !ve ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-black" : ""}`,
                            style: hc,
                            children: [
                              i.jsx("img", {
                                ref: Nn,
                                src: e,
                                alt: t || "",
                                className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none",
                                draggable: false,
                                onDoubleClick: Ko
                              }),
                              i.jsxs("svg", {
                                className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none",
                                viewBox: `0 0 ${P.w} ${P.h}`,
                                preserveAspectRatio: "none",
                                "aria-hidden": true,
                                children: [
                                  i.jsxs("defs", {
                                    children: [
                                      i.jsxs("mask", {
                                        id: "haim-ink-erase-mask",
                                        children: [
                                          i.jsx("rect", {
                                            x: "0",
                                            y: "0",
                                            width: P.w,
                                            height: P.h,
                                            fill: "#fff"
                                          }),
                                          ts.map((s) => i.jsx(me, {
                                            stroke: s
                                          }, `em-${s.id}`)),
                                          (re == null ? void 0 : re.kind) === "eraser" ? i.jsx(me, {
                                            stroke: re
                                          }) : null
                                        ]
                                      }),
                                      i.jsxs("mask", {
                                        id: "haim-hi-erase-mask",
                                        children: [
                                          i.jsx("rect", {
                                            x: "0",
                                            y: "0",
                                            width: P.w,
                                            height: P.h,
                                            fill: "#fff"
                                          }),
                                          rs.map((s) => i.jsx(me, {
                                            stroke: s
                                          }, `hem-${s.id}`)),
                                          (re == null ? void 0 : re.kind) === "eraser" ? i.jsx(me, {
                                            stroke: re
                                          }) : null
                                        ]
                                      })
                                    ]
                                  }),
                                  i.jsxs("g", {
                                    mask: "url(#haim-ink-erase-mask)",
                                    children: [
                                      ns.map((s) => i.jsx(me, {
                                        stroke: s
                                      }, s.id)),
                                      re && (re.kind === "pen" || re.kind === "pressure") ? i.jsx(me, {
                                        stroke: re
                                      }) : null
                                    ]
                                  }),
                                  i.jsxs("g", {
                                    mask: "url(#haim-hi-erase-mask)",
                                    style: {
                                      mixBlendMode: le
                                    },
                                    children: [
                                      as.map((s) => i.jsx("g", {
                                        style: {
                                          mixBlendMode: s.blend || le
                                        },
                                        children: i.jsx(me, {
                                          stroke: s
                                        })
                                      }, s.id)),
                                      (re == null ? void 0 : re.kind) === "highlighter" ? i.jsx("g", {
                                        style: {
                                          mixBlendMode: re.blend || le
                                        },
                                        children: i.jsx(me, {
                                          stroke: re
                                        })
                                      }) : null
                                    ]
                                  }),
                                  i.jsxs("g", {
                                    children: [
                                      Fe.map((s) => i.jsx(me, {
                                        stroke: s,
                                        fading: Do.has(s.id)
                                      }, s.id)),
                                      (re == null ? void 0 : re.kind) === "laser" ? i.jsx(me, {
                                        stroke: re
                                      }) : null
                                    ]
                                  })
                                ]
                              }),
                              i.jsx("canvas", {
                                ref: An,
                                className: "pointer-events-none absolute inset-0 h-full w-full",
                                width: P.w,
                                height: P.h,
                                style: os,
                                "aria-hidden": true
                              }),
                              ne.map((s) => {
                                const u = s.id === Q, b = s.id === Y, w = s.x / Math.max(1, P.w) * 100, S = s.y / Math.max(1, P.h) * 100;
                                return i.jsx("div", {
                                  className: `absolute z-1 min-w-8 max-w-[90%] ${u ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`,
                                  style: {
                                    left: `${w}%`,
                                    top: `${S}%`,
                                    color: s.color,
                                    opacity: s.opacity,
                                    fontFamily: s.fontFamily,
                                    fontSize: `${s.fontSizePx}px`,
                                    fontWeight: s.fontWeight,
                                    fontStyle: s.fontStyle,
                                    lineHeight: 1.3,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    cursor: f === "text" || u ? "move" : "default",
                                    pointerEvents: f === "text" || u ? "auto" : "none"
                                  },
                                  onPointerDown: (C) => {
                                    var _a2, _b;
                                    f !== "text" && f !== "pan" || (C.stopPropagation(), C.preventDefault(), ae("text"), Y && Y !== s.id && Ct(), U(null), Z(s.id), se(s.fontFamily), lt(s.fontSizePx), xn(s.fontWeight), kn(s.fontStyle), mt.current = {
                                      id: s.id,
                                      pointerId: C.pointerId,
                                      startClientX: C.clientX,
                                      startClientY: C.clientY,
                                      originX: s.x,
                                      originY: s.y
                                    }, (_b = (_a2 = C.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, C.pointerId));
                                  },
                                  onDoubleClick: (C) => {
                                    C.stopPropagation(), C.preventDefault(), ae("text"), Z(s.id), U(s.id), se(s.fontFamily), lt(s.fontSizePx), xn(s.fontWeight), kn(s.fontStyle), window.setTimeout(() => {
                                      var _a2;
                                      return (_a2 = zt.current) == null ? void 0 : _a2.focus();
                                    }, 20);
                                  },
                                  children: b ? i.jsx("textarea", {
                                    ref: zt,
                                    value: s.text,
                                    rows: Math.max(1, s.text.split(`
`).length),
                                    placeholder: "\uD14D\uC2A4\uD2B8 \uC785\uB825",
                                    className: "block w-full min-w-24 resize-none border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-white/40",
                                    style: {
                                      fontFamily: "inherit",
                                      fontSize: "inherit",
                                      fontWeight: "inherit",
                                      fontStyle: "inherit",
                                      lineHeight: "inherit",
                                      color: "inherit",
                                      fieldSizing: "content"
                                    },
                                    onPointerDown: (C) => C.stopPropagation(),
                                    onChange: (C) => {
                                      const v = C.target.value;
                                      ee((_) => _.map((V) => V.id === s.id ? {
                                        ...V,
                                        text: v
                                      } : V));
                                    },
                                    onBlur: () => {
                                      Y === s.id && Ct();
                                    },
                                    onKeyDown: (C) => {
                                      if (C.key === "Escape") {
                                        C.preventDefault(), C.stopPropagation(), Ct();
                                        return;
                                      }
                                      (C.key === "Backspace" || C.key === "Delete") && C.currentTarget.value.length === 0 && (C.preventDefault(), C.stopPropagation(), zn());
                                    }
                                  }) : i.jsx("span", {
                                    className: "block",
                                    children: s.text || "\uD14D\uC2A4\uD2B8"
                                  })
                                }, s.id);
                              })
                            ]
                          })
                        }) : null
                      }),
                      ve && ve.w > 0 && ve.h > 0 ? i.jsx("div", {
                        className: "pointer-events-none fixed z-100066 border-2 border-sky-400 bg-sky-400/25",
                        style: {
                          left: ve.x,
                          top: ve.y,
                          width: ve.w,
                          height: ve.h
                        },
                        "aria-hidden": true
                      }) : null,
                      es && Dt ? i.jsx("div", {
                        className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow",
                        style: {
                          left: Dt.x - Qr / 2,
                          top: Dt.y - Yr / 2,
                          width: Qr,
                          height: Yr,
                          borderRadius: oe === "circle" ? "9999px" : "2px",
                          borderStyle: L === "dashed" ? "dashed" : "solid",
                          opacity: W(zo, 0.25, 0.85),
                          backgroundColor: f === "eraser" ? "transparent" : nt(kt) || void 0
                        },
                        "aria-hidden": true
                      }) : null,
                      g && (f === "text" || bt) && i.jsxs("aside", {
                        className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md",
                        onPointerDown: (s) => s.stopPropagation(),
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center gap-2 text-xs font-semibold text-white/90",
                            children: [
                              i.jsx(nr, {
                                size: 14,
                                "aria-hidden": true
                              }),
                              "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"
                            ]
                          }),
                          i.jsxs("label", {
                            className: "flex flex-col gap-1 text-[11px] text-white/70",
                            children: [
                              i.jsx("span", {
                                children: "Font family"
                              }),
                              i.jsx(ni, {
                                value: (bt == null ? void 0 : bt.fontFamily) ?? Ae,
                                onChange: (s) => {
                                  se(s), Kt({
                                    fontFamily: s
                                  });
                                },
                                className: "w-full",
                                inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs",
                                allowAddWebfont: true
                              })
                            ]
                          }),
                          i.jsxs("label", {
                            className: "flex flex-col gap-1 text-[11px] text-white/70",
                            children: [
                              i.jsx("span", {
                                children: "Font size"
                              }),
                              i.jsxs("div", {
                                className: "flex items-center gap-1",
                                children: [
                                  i.jsx("input", {
                                    type: "number",
                                    min: ir,
                                    max: lr,
                                    step: 1,
                                    value: (bt == null ? void 0 : bt.fontSizePx) ?? te,
                                    onChange: (s) => {
                                      const u = W(Math.round(Number(s.target.value) || 24), ir, lr);
                                      lt(u), Kt({
                                        fontSizePx: u
                                      });
                                    },
                                    className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white",
                                    "aria-label": "Font size (px)"
                                  }),
                                  i.jsx("span", {
                                    className: "shrink-0 text-white/60",
                                    children: "px"
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("label", {
                            className: "flex flex-col gap-1 text-[11px] text-white/70",
                            children: [
                              i.jsx("span", {
                                children: "Font weight"
                              }),
                              i.jsxs(Et, {
                                value: (bt == null ? void 0 : bt.fontWeight) ?? We,
                                onValueChange: (s) => {
                                  xn(s), Kt({
                                    fontWeight: s
                                  });
                                },
                                children: [
                                  i.jsx(Tt, {
                                    className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white",
                                    "aria-label": "Font weight",
                                    children: i.jsx(Yn, {})
                                  }),
                                  i.jsx(Lt, {
                                    container: jt,
                                    children: i.jsx(It, {
                                      className: Mt,
                                      position: "popper",
                                      side: "bottom",
                                      sideOffset: 6,
                                      onCloseAutoFocus: (s) => s.preventDefault(),
                                      children: i.jsx(Nt, {
                                        className: "p-1",
                                        children: Fl.map((s) => i.jsx(Ee, {
                                          value: s.value,
                                          className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                          children: i.jsx(Te, {
                                            children: s.label
                                          })
                                        }, s.value))
                                      })
                                    })
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("label", {
                            className: "flex flex-col gap-1 text-[11px] text-white/70",
                            children: [
                              i.jsx("span", {
                                children: "Font style"
                              }),
                              i.jsxs(Et, {
                                value: (bt == null ? void 0 : bt.fontStyle) ?? bn,
                                onValueChange: (s) => {
                                  const u = s === "italic" ? "italic" : "normal";
                                  kn(u), Kt({
                                    fontStyle: u
                                  });
                                },
                                children: [
                                  i.jsx(Tt, {
                                    className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white",
                                    "aria-label": "Font style",
                                    children: i.jsx(Yn, {})
                                  }),
                                  i.jsx(Lt, {
                                    container: jt,
                                    children: i.jsx(It, {
                                      className: Mt,
                                      position: "popper",
                                      side: "bottom",
                                      sideOffset: 6,
                                      onCloseAutoFocus: (s) => s.preventDefault(),
                                      children: i.jsxs(Nt, {
                                        className: "p-1",
                                        children: [
                                          i.jsx(Ee, {
                                            value: "normal",
                                            className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                            children: i.jsx(Te, {
                                              children: "Normal"
                                            })
                                          }),
                                          i.jsx(Ee, {
                                            value: "italic",
                                            className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                            children: i.jsx(Te, {
                                              children: "Italic"
                                            })
                                          })
                                        ]
                                      })
                                    })
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("p", {
                            className: "text-[10px] leading-4 text-white/45",
                            children: [
                              "\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9",
                              i.jsx("br", {}),
                              "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1",
                              i.jsx("br", {}),
                              ie,
                              "+[ ] / ",
                              ie,
                              "+Shift+<> \uAE00\uC790 \uD06C\uAE30"
                            ]
                          })
                        ]
                      }),
                      i.jsx(Rt, {
                        delayDuration: 250,
                        skipDelayDuration: 0,
                        children: i.jsxs("div", {
                          className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1",
                          onPointerDown: (s) => s.stopPropagation(),
                          children: [
                            i.jsxs("div", {
                              className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md",
                              children: [
                                g ? i.jsxs(i.Fragment, {
                                  children: [
                                    i.jsx(q, {
                                      label: "\uD328\uB2DD",
                                      active: f === "pan",
                                      onClick: () => ae("pan"),
                                      children: i.jsx(gi, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: "\uC77C\uBC18 \uD39C",
                                      active: f === "pen",
                                      onClick: () => ae("pen"),
                                      children: i.jsx(oa, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: "\uD544\uC555 \uD39C",
                                      active: f === "pressure",
                                      onClick: () => ae("pressure"),
                                      children: i.jsx(xi, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: "\uD615\uAD11\uD39C",
                                      active: f === "highlighter",
                                      onClick: Vo,
                                      children: i.jsx(bi, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)",
                                      active: f === "laser",
                                      onClick: () => ae("laser"),
                                      children: i.jsx(ki, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: "\uC9C0\uC6B0\uAC1C",
                                      active: f === "eraser",
                                      onClick: () => ae("eraser"),
                                      children: i.jsx(wi, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: "\uD14D\uC2A4\uD2B8",
                                      active: f === "text",
                                      onClick: () => ae("text"),
                                      children: i.jsx(nr, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx("span", {
                                      className: "mx-0.5 h-5 w-px bg-white/20",
                                      "aria-hidden": true
                                    }),
                                    i.jsxs("div", {
                                      className: "relative flex items-center",
                                      children: [
                                        i.jsx("button", {
                                          type: "button",
                                          "aria-label": "\uD39C \uC0C9\uC0C1",
                                          "aria-expanded": En,
                                          onClick: () => {
                                            Tn((s) => (s && Ot(false), !s));
                                          },
                                          className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow",
                                          style: {
                                            backgroundColor: nt(kt) || "#111827"
                                          }
                                        }),
                                        i.jsx(Xn, {
                                          mode: "popLayout",
                                          children: En ? i.jsxs(tt.div, {
                                            initial: {
                                              opacity: 0,
                                              y: 16,
                                              scale: 0.85
                                            },
                                            animate: {
                                              opacity: 1,
                                              y: 0,
                                              scale: 1
                                            },
                                            exit: {
                                              opacity: 0,
                                              y: 12,
                                              scale: 0.9
                                            },
                                            transition: {
                                              type: "spring",
                                              stiffness: 420,
                                              damping: 28,
                                              mass: 0.7
                                            },
                                            className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md",
                                            children: [
                                              (f === "highlighter" ? fc : dc).map((s, u, b) => {
                                                const w = (nt(kt) || "").slice(0, 7).toLowerCase() === s.toLowerCase(), S = 0.03 * (b.length - u);
                                                return i.jsx(tt.button, {
                                                  type: "button",
                                                  "aria-label": `\uC0C9\uC0C1 ${s}`,
                                                  initial: {
                                                    opacity: 0,
                                                    y: 8,
                                                    scale: 0.5
                                                  },
                                                  animate: {
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1
                                                  },
                                                  transition: {
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30,
                                                    delay: S
                                                  },
                                                  onClick: () => {
                                                    Ot(false), f === "highlighter" ? A(`${s}ff`) : (k(`${s}ff`), (f === "pan" || f === "eraser" || f === "laser") && ae("pen")), Tn(false);
                                                  },
                                                  className: `h-7 w-7 rounded-full border-2 shadow ${w ? "border-sky-300 scale-110" : "border-white/40"}`,
                                                  style: {
                                                    backgroundColor: s
                                                  }
                                                }, s);
                                              }),
                                              i.jsx(tt.button, {
                                                type: "button",
                                                "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1",
                                                "aria-pressed": vn,
                                                initial: {
                                                  opacity: 0,
                                                  y: 8,
                                                  scale: 0.5
                                                },
                                                animate: {
                                                  opacity: 1,
                                                  y: 0,
                                                  scale: 1
                                                },
                                                transition: {
                                                  type: "spring",
                                                  stiffness: 500,
                                                  damping: 30,
                                                  delay: 0
                                                },
                                                onClick: () => Ot((s) => !s),
                                                className: `h-7 w-7 rounded-full border-2 shadow ${vn ? "border-sky-300 scale-110" : "border-white/50"}`,
                                                style: bc
                                              })
                                            ]
                                          }, "haim-color-palette") : null
                                        }),
                                        i.jsx(Xn, {
                                          children: En && vn ? i.jsxs(tt.div, {
                                            initial: {
                                              opacity: 0,
                                              x: -6,
                                              scale: 0.96
                                            },
                                            animate: {
                                              opacity: 1,
                                              x: 0,
                                              scale: 1
                                            },
                                            exit: {
                                              opacity: 0,
                                              x: -4,
                                              scale: 0.96
                                            },
                                            transition: {
                                              duration: 0.18,
                                              ease: yr
                                            },
                                            className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md",
                                            children: [
                                              i.jsx("div", {
                                                className: "mb-2 h-8 w-full rounded border border-white/20",
                                                style: {
                                                  ...ri,
                                                  backgroundColor: kt
                                                }
                                              }),
                                              i.jsx("div", {
                                                className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full",
                                                children: i.jsx(Js, {
                                                  color: Gr,
                                                  onChange: (s) => {
                                                    const u = nt(s.startsWith("#") ? s : `#${s}`);
                                                    u && (f === "highlighter" ? A(u) : (k(u), (f === "pan" || f === "eraser" || f === "laser") && ae("pen")));
                                                  }
                                                })
                                              }),
                                              i.jsx(ei, {
                                                alpha: true,
                                                prefixed: true,
                                                color: Gr,
                                                onChange: (s) => {
                                                  const u = nt(s.startsWith("#") ? s : `#${s}`);
                                                  u && (f === "highlighter" ? A(u) : k(u));
                                                },
                                                className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white"
                                              })
                                            ]
                                          }, "haim-color-picker") : null
                                        })
                                      ]
                                    }),
                                    i.jsx("span", {
                                      className: "mx-0.5 h-5 w-px bg-white/20",
                                      "aria-hidden": true
                                    }),
                                    f === "highlighter" ? i.jsxs("div", {
                                      className: "flex items-center gap-1 text-[11px] text-white/80",
                                      children: [
                                        i.jsxs("label", {
                                          className: "flex items-center gap-0.5",
                                          children: [
                                            i.jsx("span", {
                                              className: "opacity-70",
                                              children: "W"
                                            }),
                                            i.jsx("span", {
                                              className: "sr-only",
                                              children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)"
                                            }),
                                            i.jsx("input", {
                                              type: "number",
                                              min: Me,
                                              max: Le,
                                              step: 0.1,
                                              value: O,
                                              onChange: (s) => N(at(W(Number(s.target.value) || 1, Me, Le))),
                                              className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white",
                                              "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)"
                                            })
                                          ]
                                        }),
                                        i.jsx("span", {
                                          className: "opacity-50",
                                          "aria-hidden": true,
                                          children: "\xD7"
                                        }),
                                        i.jsxs("label", {
                                          className: "flex items-center gap-0.5",
                                          children: [
                                            i.jsx("span", {
                                              className: "opacity-70",
                                              children: "H"
                                            }),
                                            i.jsx("span", {
                                              className: "sr-only",
                                              children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)"
                                            }),
                                            i.jsx("input", {
                                              type: "number",
                                              min: Me,
                                              max: Le,
                                              step: 0.1,
                                              value: M,
                                              onChange: (s) => E(at(W(Number(s.target.value) || 1, Me, Le))),
                                              className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white",
                                              "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)"
                                            })
                                          ]
                                        }),
                                        i.jsx("span", {
                                          className: "tabular-nums text-white/60",
                                          "aria-hidden": true,
                                          children: "px"
                                        })
                                      ]
                                    }) : i.jsxs("label", {
                                      className: "flex items-center gap-1 text-[11px] text-white/80",
                                      children: [
                                        i.jsx("span", {
                                          className: "sr-only",
                                          children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)"
                                        }),
                                        i.jsx("input", {
                                          type: "number",
                                          min: Me,
                                          max: Le,
                                          step: 0.1,
                                          value: O,
                                          onChange: (s) => Uo(Number(s.target.value) || 1),
                                          className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white",
                                          "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)"
                                        }),
                                        i.jsx("span", {
                                          className: "tabular-nums text-white/60",
                                          "aria-hidden": true,
                                          children: "px"
                                        })
                                      ]
                                    }),
                                    i.jsxs("label", {
                                      className: "flex items-center gap-1 text-[11px] text-white/80",
                                      children: [
                                        i.jsx("span", {
                                          className: "opacity-70",
                                          children: "\uD750\uB984"
                                        }),
                                        i.jsx("input", {
                                          type: "number",
                                          min: 5,
                                          max: 100,
                                          step: 5,
                                          value: Math.round((f === "highlighter" ? B : D) * 100),
                                          onChange: (s) => {
                                            const b = W(Number(s.target.value) || 5, 5, 100) / 100;
                                            f === "highlighter" ? G(b) : I(b);
                                          },
                                          className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white",
                                          "aria-label": "\uD750\uB984 (%)"
                                        }),
                                        i.jsx("span", {
                                          className: "tabular-nums text-white/60",
                                          "aria-hidden": true,
                                          children: "%"
                                        })
                                      ]
                                    }),
                                    i.jsxs(Et, {
                                      value: oe,
                                      onValueChange: (s) => T(s),
                                      children: [
                                        i.jsx(Tt, {
                                          className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20",
                                          "aria-label": oe === "circle" ? "\uC6D0" : "\uB124\uBAA8",
                                          children: oe === "circle" ? i.jsx(sa, {
                                            size: 16
                                          }) : i.jsx(ia, {
                                            size: 16
                                          })
                                        }),
                                        i.jsx(Lt, {
                                          container: jt,
                                          children: i.jsx(It, {
                                            className: Mt,
                                            position: "popper",
                                            side: "top",
                                            sideOffset: 6,
                                            onCloseAutoFocus: (s) => s.preventDefault(),
                                            children: i.jsxs(Nt, {
                                              className: "p-1",
                                              children: [
                                                i.jsxs(Ee, {
                                                  value: "circle",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "\uC6D0",
                                                  children: [
                                                    i.jsx(sa, {
                                                      size: 16
                                                    }),
                                                    i.jsx(Te, {
                                                      className: "sr-only",
                                                      children: "\uC6D0"
                                                    })
                                                  ]
                                                }),
                                                i.jsxs(Ee, {
                                                  value: "square",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "\uB124\uBAA8",
                                                  children: [
                                                    i.jsx(ia, {
                                                      size: 16
                                                    }),
                                                    i.jsx(Te, {
                                                      className: "sr-only",
                                                      children: "\uB124\uBAA8"
                                                    })
                                                  ]
                                                })
                                              ]
                                            })
                                          })
                                        })
                                      ]
                                    }),
                                    i.jsxs(Et, {
                                      value: L,
                                      onValueChange: (s) => z(s),
                                      children: [
                                        i.jsx(Tt, {
                                          className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20",
                                          "aria-label": L === "dashed" ? "Dashed" : "Solid",
                                          children: L === "dashed" ? i.jsx(Ma, {
                                            size: 16
                                          }) : i.jsx(Sa, {
                                            size: 16
                                          })
                                        }),
                                        i.jsx(Lt, {
                                          container: jt,
                                          children: i.jsx(It, {
                                            className: Mt,
                                            position: "popper",
                                            side: "top",
                                            sideOffset: 6,
                                            onCloseAutoFocus: (s) => s.preventDefault(),
                                            children: i.jsxs(Nt, {
                                              className: "p-1",
                                              children: [
                                                i.jsxs(Ee, {
                                                  value: "solid",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "Solid",
                                                  children: [
                                                    i.jsx(Sa, {
                                                      size: 16
                                                    }),
                                                    i.jsx(Te, {
                                                      className: "sr-only",
                                                      children: "Solid"
                                                    })
                                                  ]
                                                }),
                                                i.jsxs(Ee, {
                                                  value: "dashed",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "Dashed",
                                                  children: [
                                                    i.jsx(Ma, {
                                                      size: 16
                                                    }),
                                                    i.jsx(Te, {
                                                      className: "sr-only",
                                                      children: "Dashed"
                                                    })
                                                  ]
                                                })
                                              ]
                                            })
                                          })
                                        })
                                      ]
                                    }),
                                    f === "highlighter" ? i.jsxs(Et, {
                                      value: le,
                                      onValueChange: (s) => it(s),
                                      children: [
                                        i.jsx(Tt, {
                                          className: ss,
                                          "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC",
                                          children: i.jsx(Yn, {
                                            placeholder: "Blend"
                                          })
                                        }),
                                        i.jsx(Lt, {
                                          container: jt,
                                          children: i.jsx(It, {
                                            className: `${Mt} max-h-56 overflow-auto`,
                                            position: "popper",
                                            side: "top",
                                            sideOffset: 6,
                                            onCloseAutoFocus: (s) => s.preventDefault(),
                                            children: i.jsx(Nt, {
                                              className: "p-1",
                                              children: Kl.map((s) => i.jsx(Ee, {
                                                value: s.value,
                                                className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                                children: i.jsx(Te, {
                                                  children: s.label
                                                })
                                              }, s.value))
                                            })
                                          })
                                        })
                                      ]
                                    }) : null,
                                    i.jsx("span", {
                                      className: "mx-0.5 h-5 w-px bg-white/20",
                                      "aria-hidden": true
                                    }),
                                    i.jsx(q, {
                                      label: `\uC2E4\uD589 \uCDE8\uC18C (${ie}+Z)`,
                                      disabled: Un === 0,
                                      onClick: Fn,
                                      children: i.jsx(to, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: `\uB2E4\uC2DC \uC2E4\uD589 (${Ca})`,
                                      disabled: Bo.length === 0,
                                      onClick: Kn,
                                      children: i.jsx(no, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30",
                                      disabled: Un === 0 && Fe.length === 0,
                                      onClick: Bn,
                                      children: i.jsx(yi, {
                                        size: 16
                                      })
                                    })
                                  ]
                                }) : null,
                                g ? i.jsx("span", {
                                  className: "mx-0.5 h-5 w-px bg-white/20",
                                  "aria-hidden": true
                                }) : null,
                                i.jsx(q, {
                                  label: "\uCD95\uC18C",
                                  onClick: () => {
                                    var _a2;
                                    const s = (_a2 = ht.current) == null ? void 0 : _a2.getBoundingClientRect();
                                    if (!s) {
                                      c((u) => W(u / rt, Qt, Yt));
                                      return;
                                    }
                                    Ze(l / rt, s.left + s.width / 2, s.top + s.height / 2);
                                  },
                                  children: i.jsx(Ci, {
                                    size: 16
                                  })
                                }),
                                i.jsxs("span", {
                                  className: "min-w-10 text-center text-[11px] tabular-nums text-white/80",
                                  children: [
                                    Math.round(l * 100),
                                    "%"
                                  ]
                                }),
                                i.jsx(q, {
                                  label: "\uD655\uB300",
                                  onClick: () => {
                                    var _a2;
                                    const s = (_a2 = ht.current) == null ? void 0 : _a2.getBoundingClientRect();
                                    if (!s) {
                                      c((u) => W(u * rt, Qt, Yt));
                                      return;
                                    }
                                    Ze(l * rt, s.left + s.width / 2, s.top + s.height / 2);
                                  },
                                  children: i.jsx(Si, {
                                    size: 16
                                  })
                                }),
                                i.jsx(q, {
                                  label: "\uBCF4\uAE30 \uCD08\uAE30\uD654",
                                  onClick: wt,
                                  children: i.jsx(Mi, {
                                    size: 16
                                  })
                                }),
                                i.jsx(q, {
                                  label: Er === "done" ? "\uBCF5\uC0AC\uB428" : Er === "error" ? "\uBCF5\uC0AC \uC2E4\uD328" : `\uC774\uBBF8\uC9C0 \uBCF5\uC0AC (${ie}+C)`,
                                  onClick: qn,
                                  children: i.jsx(rr, {
                                    size: 16
                                  })
                                }),
                                i.jsx(q, {
                                  label: Ht ? "QR \uC778\uC2DD \uC911" : ce ? "QR \uC778\uC2DD \uC885\uB8CC" : "QR \uCF54\uB4DC \uC778\uC2DD",
                                  active: ce,
                                  disabled: Ht,
                                  onClick: () => {
                                    if (ce) {
                                      Ur();
                                      return;
                                    }
                                    Xo();
                                  },
                                  children: i.jsx(ro, {
                                    size: 16
                                  })
                                }),
                                i.jsx("span", {
                                  className: "mx-0.5 h-5 w-px bg-white/20",
                                  "aria-hidden": true
                                }),
                                g || Dn ? i.jsxs(i.Fragment, {
                                  children: [
                                    i.jsx(q, {
                                      label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${ie}+S)`,
                                      tone: "save",
                                      disabled: !Dn || ut,
                                      onClick: () => {
                                        Wt("overwrite");
                                      },
                                      children: i.jsx(ji, {
                                        size: 16
                                      })
                                    }),
                                    i.jsx(q, {
                                      label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${ie}+Shift+S)`,
                                      tone: "saveAs",
                                      disabled: !Dn || ut,
                                      onClick: () => {
                                        Wt("saveAs");
                                      },
                                      children: i.jsx(vi, {
                                        size: 16
                                      })
                                    })
                                  ]
                                }) : null,
                                g ? i.jsx(q, {
                                  label: "\uBCF4\uAE30 \uBAA8\uB4DC",
                                  onClick: Yo,
                                  children: i.jsx(wr, {
                                    size: 16
                                  })
                                }) : i.jsx(q, {
                                  label: "\uD3B8\uC9D1",
                                  onClick: Qo,
                                  children: i.jsx(oa, {
                                    size: 16
                                  })
                                })
                              ]
                            }),
                            ce || Pe || Mn ? i.jsxs("div", {
                              className: "order-first flex w-full max-w-xl flex-col gap-2 rounded-xl border border-white/15 bg-black/80 px-3 py-2 text-white shadow-lg",
                              children: [
                                ce ? i.jsxs("div", {
                                  className: "flex flex-wrap items-center justify-center gap-2",
                                  children: [
                                    i.jsx("p", {
                                      className: "text-[11px] text-white/80",
                                      children: "\uC774\uBBF8\uC9C0 \uC804\uCCB4\uB97C \uC778\uC2DD\uD569\uB2C8\uB2E4. \uB4DC\uB798\uADF8\uD558\uBA74 \uADF8 \uBD80\uBD84\uB9CC \uC778\uC2DD\uD569\uB2C8\uB2E4."
                                    }),
                                    i.jsxs("button", {
                                      type: "button",
                                      disabled: Ht,
                                      onClick: () => St("full"),
                                      className: "inline-flex h-8 items-center gap-1 rounded-lg border border-sky-400/50 bg-sky-500/30 px-2 text-[11px] text-white hover:bg-sky-500/40 disabled:opacity-40",
                                      children: [
                                        i.jsx(Ei, {
                                          size: 14,
                                          "aria-hidden": true
                                        }),
                                        "\uC804\uCCB4 \uC778\uC2DD"
                                      ]
                                    }),
                                    i.jsxs("button", {
                                      type: "button",
                                      onClick: Ur,
                                      className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                      children: [
                                        i.jsx(Qn, {
                                          size: 14,
                                          "aria-hidden": true
                                        }),
                                        "\uCDE8\uC18C"
                                      ]
                                    })
                                  ]
                                }) : null,
                                Ht ? i.jsx("p", {
                                  className: "text-center text-[11px] text-white/70",
                                  children: "\uC778\uC2DD \uC911\u2026"
                                }) : null,
                                Mn ? i.jsx("p", {
                                  className: "text-center text-[11px] text-red-300",
                                  children: Mn
                                }) : null,
                                Pe ? i.jsxs("div", {
                                  className: "flex flex-col gap-2",
                                  children: [
                                    i.jsx("p", {
                                      className: "max-h-28 overflow-y-auto break-all text-xs leading-5 text-white",
                                      children: Pe
                                    }),
                                    i.jsxs("div", {
                                      className: "flex flex-wrap items-center justify-center gap-2",
                                      children: [
                                        i.jsxs("button", {
                                          type: "button",
                                          onClick: Go,
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            i.jsx(rr, {
                                              size: 14,
                                              "aria-hidden": true
                                            }),
                                            Oo ? "\uBCF5\uC0AC\uB428" : "\uD14D\uC2A4\uD2B8 \uBCF5\uC0AC"
                                          ]
                                        }),
                                        /^https?:\/\//i.test(Pe.trim()) ? i.jsxs("button", {
                                          type: "button",
                                          onClick: () => {
                                            const s = Pe.trim();
                                            window.open(s, "_blank", "noopener,noreferrer");
                                          },
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            i.jsx(Ti, {
                                              size: 14,
                                              "aria-hidden": true
                                            }),
                                            "\uC5F4\uAE30"
                                          ]
                                        }) : null,
                                        i.jsxs("button", {
                                          type: "button",
                                          onClick: () => dt(null),
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            i.jsx(Qn, {
                                              size: 14,
                                              "aria-hidden": true
                                            }),
                                            "\uB2EB\uAE30"
                                          ]
                                        })
                                      ]
                                    })
                                  ]
                                }) : null
                              ]
                            }) : null,
                            i.jsxs("p", {
                              className: "max-w-xl text-center text-[10px] text-white/55",
                              children: [
                                g ? `\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ${ie}+[ ] / ${ie}+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ${ie}+C \uC774\uBBF8\uC9C0 \uBCF5\uC0AC \xB7 ${ie}+Z / ${Ca}` : `\uD720 \uC90C \xB7 \uB4DC\uB798\uADF8\uB85C \uC774\uB3D9 \xB7 ${ie}+C \uBCF4\uC774\uB294 \uC774\uBBF8\uC9C0 \uBCF5\uC0AC`,
                                _o && g ? " \xB7 Ink API" : "",
                                ut ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""
                              ]
                            }),
                            Lr ? i.jsx("p", {
                              className: "max-w-xl text-center text-[10px] text-red-300",
                              children: Lr
                            }) : null
                          ]
                        })
                      }),
                      i.jsx("button", {
                        type: "button",
                        className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80",
                        "aria-label": "\uB2EB\uAE30",
                        onClick: Ut,
                        children: i.jsx(Qn, {
                          size: 20
                        })
                      })
                    ]
                  })
                })
              ]
            }, "haim-image-lightbox") : null
          })
        }),
        i.jsx(ai, {
          isOpen: Ln,
          title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30",
          message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.",
          confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30",
          cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1",
          variant: "danger",
          overlayClassName: "z-100070",
          onConfirm: Zo,
          onCancel: Jo
        })
      ]
    });
  };
  const kc = /^[a-z][a-z0-9+.-]*:/i;
  function ja(e) {
    const t = String(e || "").trim();
    return t ? oi(t) ? true : !kc.test(t) : false;
  }
  function wc({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
    const o = String(e.attrs.src || ""), l = String(e.attrs.alt || ""), c = String(e.attrs.title || ""), d = n.isEditable, [p, f] = h.useState(false), [m, g] = h.useState(null), [x, y] = h.useState(false);
    h.useEffect(() => {
      y(false);
    }, [
      o
    ]);
    const k = !ja(o) || x && !ra(o), j = h.useCallback((N) => {
      if (N.detail > 1) return;
      N.preventDefault(), N.stopPropagation();
      const M = typeof r == "function" ? r() : null;
      typeof M == "number" && n.chain().focus().setNodeSelection(M).run();
    }, [
      n,
      r
    ]), A = h.useCallback((N) => {
      N.preventDefault(), N.stopPropagation(), !(!ja(o) || x) && (g(o), f(true));
    }, [
      x,
      o
    ]), O = h.useCallback(async (N, M) => {
      if (!d) return;
      const E = await bo(M), D = typeof r == "function" ? r() : null, I = URL.createObjectURL(M);
      if (N === "overwrite") {
        typeof D == "number" ? n.chain().focus().deleteRange({
          from: D,
          to: D + e.nodeSize
        }).insertContentAt(D, {
          type: "wikiImage",
          attrs: {
            path: E,
            options: "",
            alt: E,
            width: null,
            height: null,
            background: null
          }
        }).run() : a({
          src: I
        }), g(I);
        return;
      }
      if (typeof D != "number") return;
      const B = D + e.nodeSize;
      n.chain().focus().insertContentAt(B, {
        type: "wikiImage",
        attrs: {
          path: E,
          options: "",
          alt: E,
          width: null,
          height: null,
          background: null
        }
      }).run();
    }, [
      d,
      n,
      r,
      a,
      e.nodeSize
    ]);
    return i.jsxs(be, {
      as: "span",
      className: `haim-stock-image-wrap${t ? " is-selected" : ""}`,
      "data-drag-handle": true,
      style: {
        width: "100%",
        maxWidth: "100%"
      },
      onClick: j,
      onDoubleClick: A,
      children: [
        k ? i.jsxs("div", {
          className: "haim-stock-image-fallback",
          role: "img",
          "aria-label": l || "\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",
          children: [
            i.jsx("span", {
              className: "haim-stock-image-fallback-title",
              children: "\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"
            }),
            l ? i.jsx("span", {
              className: "haim-stock-image-fallback-alt",
              children: l
            }) : null,
            o ? i.jsx("span", {
              className: "haim-stock-image-fallback-src",
              children: o
            }) : null
          ]
        }) : i.jsx("img", {
          src: o,
          alt: l,
          ...c ? {
            title: c
          } : {},
          className: "haim-stock-image max-w-full h-auto cursor-pointer",
          draggable: false,
          onError: () => {
            ra(o) || y(true);
          }
        }),
        i.jsx(yo, {
          src: k ? null : m || o || null,
          alt: l,
          open: p,
          onClose: () => {
            f(false), g(null);
          },
          ...d ? {
            onSaveAnnotated: O
          } : {}
        })
      ]
    });
  }
  let cr = null;
  gf = function(e) {
    cr = e;
  };
  function ur(e) {
    const t = String(e || "").trim().replace(/^\/+/, "");
    return !t || typeof cr != "function" ? false : (cr(t), true);
  }
  function yc(e, t) {
    if (typeof document > "u") return;
    const n = document.createElement("a");
    n.href = e, n.target = t, n.rel = "noopener noreferrer", n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
  }
  va = function(e, t) {
    const n = String(e || "").trim();
    if (!n) return;
    const r = Qa(n);
    if (r) {
      ur(r);
      return;
    }
    if (Ya(n)) return;
    const a = String((t == null ? void 0 : t.target) || "_blank").trim(), o = !a || a === "_self" ? "_blank" : a;
    if (lo() && Ga(n, {
      target: o
    })) {
      si(n);
      return;
    }
    yc(n, o);
  };
  const Ea = "haim-mod-held";
  function Cc(e, t) {
    let n = null;
    if (t.target instanceof HTMLAnchorElement) n = t.target;
    else {
      const r = t.target;
      if (!r) return null;
      n = r.closest("a");
    }
    return !n || !e.view.dom.contains(n) ? null : n;
  }
  function Sc(e, t, n) {
    const r = us(e.state, t.name), a = String(r.href || "").trim();
    return a || String(n.getAttribute("href") || n.href || "").trim();
  }
  function Mc() {
    return new Oe({
      key: new Ie("haimLinkModCursor"),
      view(e) {
        const t = (c) => {
          e.dom.classList.toggle(Ea, c);
        }, n = (c) => {
          t(!!(c.ctrlKey || c.metaKey));
        }, r = (c) => {
          (c.key === "Control" || c.key === "Meta" || c.ctrlKey || c.metaKey) && t(true);
        }, a = (c) => {
          n(c);
        }, o = () => t(false), l = (c) => {
          n(c);
        };
        return window.addEventListener("keydown", r, true), window.addEventListener("keyup", a, true), window.addEventListener("blur", o), e.dom.addEventListener("mousemove", l), {
          destroy() {
            window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", a, true), window.removeEventListener("blur", o), e.dom.removeEventListener("mousemove", l), e.dom.classList.remove(Ea);
          }
        };
      }
    });
  }
  function jc(e, t, n, r) {
    if (r.button !== 0) return false;
    const a = Cc(e, r);
    if (!a) return false;
    const o = Sc(n, t, a);
    if (!o) return false;
    const l = Qa(o), c = ii(), d = r.metaKey || r.ctrlKey;
    if (n.editable) {
      if (r.preventDefault(), !(d || c)) return true;
      if (l) return r.stopPropagation(), ur(l), true;
      const f = (a.getAttribute("target") || a.target || "_blank").trim();
      return va(o, {
        target: f
      }), true;
    }
    if (l) return r.preventDefault(), r.stopPropagation(), ur(l), true;
    if (lo()) {
      const p = (a.getAttribute("target") || a.target || "_blank").trim();
      if (Ga(o, {
        target: p
      })) return r.preventDefault(), r.stopPropagation(), va(o, {
        target: p
      }), true;
    }
    return false;
  }
  function vc(e, t) {
    return new Oe({
      key: new Ie("haimLinkClick"),
      props: {
        handleDOMEvents: {
          click: (n, r) => jc(e, t, n, r)
        }
      }
    });
  }
  const Ec = cs.extend({
    renderHTML({ HTMLAttributes: e }) {
      const t = String(e.href || ""), n = Ya(t);
      return [
        "a",
        ke(this.options.HTMLAttributes, e, {
          class: n ? "haim-docuhaim-link" : null
        }),
        0
      ];
    },
    addProseMirrorPlugins() {
      var _a2;
      return [
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [],
        Mc(),
        vc(this.editor, this.type)
      ];
    }
  }).configure({
    openOnClick: false,
    autolink: true,
    protocols: [
      "docuhaim"
    ],
    HTMLAttributes: {
      rel: "noopener noreferrer",
      target: "_blank"
    }
  });
  function Ta(e) {
    if (!e || typeof e != "object") return;
    const t = e;
    t.__haimRawTextPatched || (t.encodeTextForMarkdown = (n) => n, t.escapeMarkdownSyntax = (n) => n, t.__haimRawTextPatched = true);
  }
  const Tc = ds.extend({
    onBeforeCreate(e) {
      var _a2, _b, _c2;
      (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
      const t = (_b = this.storage) == null ? void 0 : _b.manager;
      t && Ta(t), ((_c2 = this.editor) == null ? void 0 : _c2.markdown) && Ta(this.editor.markdown);
    }
  }), Lc = /^\s*(\[([ xX~]?)\])\s$/, Ic = /^\s*[-*+]\s*\[([ xX~])\]\s$/;
  function La(e) {
    return co(e === void 0 || e === "" ? " " : e);
  }
  function dr(e) {
    const t = At(e), n = Jt(e);
    return {
      status: t,
      checked: t === "done",
      kind: t === "doing" ? "status" : n
    };
  }
  function Ia(e, t, n) {
    var _a2, _b;
    const r = e.schema.nodes.taskItem, a = e.schema.nodes.taskList;
    if (!r || !a) return null;
    const o = e.doc.resolve(t.from);
    let l = -1, c = -1;
    for (let g = o.depth; g >= 1; g -= 1) {
      const x = o.node(g).type.name;
      l < 0 && x === "listItem" && (l = g), c < 0 && (x === "bulletList" || x === "orderedList") && (c = g);
    }
    const d = e.tr.delete(t.from, t.to);
    if (l > 0 && c > 0) {
      const g = o.before(c), x = o.index(c), y = d.mapping.map(g), k = d.doc.nodeAt(y);
      if (!k) return null;
      const j = [];
      k.forEach((N, M, E) => {
        const D = E === x ? n : N.type.name === "taskItem" ? dr(N.attrs) : {
          status: "todo",
          checked: false,
          kind: "check"
        };
        j.push(r.create(D, N.content, N.marks));
      });
      const A = a.create(k.attrs, j);
      d.replaceWith(y, y + k.nodeSize, A), Vn(d.doc, y) && ((_a2 = d.doc.resolve(y).nodeBefore) == null ? void 0 : _a2.type) === a && d.join(y);
      const O = d.doc.nodeAt(y);
      if (O) {
        const N = y + O.nodeSize;
        Vn(d.doc, N) && ((_b = d.doc.nodeAt(N)) == null ? void 0 : _b.type) === a && d.join(N);
      }
      return;
    }
    const p = d.doc.resolve(t.from).blockRange(), f = p && ps(p, r, n);
    if (!f) return null;
    d.wrap(p, f);
    const m = d.doc.resolve(t.from - 1).nodeBefore;
    m && m.type === r && Vn(d.doc, t.from - 1) && d.join(t.from - 1);
  }
  function Gn(e, t, n, r) {
    t.dataset.status = n, t.dataset.kind = r, t.dataset.checked = n === "done" ? "true" : "false", e.dataset.status = n, e.dataset.kind = r, e.className = r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", e.checked = n === "done", e.indeterminate = n === "doing", e.setAttribute("aria-checked", n === "doing" ? "mixed" : n === "done" ? "true" : "false"), e.setAttribute("aria-label", r === "status" ? n === "doing" ? "Status task in progress" : n === "done" ? "Status task completed" : "Status task not started" : n === "done" ? "Task completed" : "Task not started");
  }
  const Nc = fs.extend({
    addStorage() {
      return {
        preferredKind: "check"
      };
    },
    addCommands() {
      return {
        setHaimTaskCheckboxPreferredKind: (e) => () => (this.storage.preferredKind = e === "status" ? "status" : "check", true)
      };
    },
    addAttributes() {
      return {
        kind: {
          default: "check",
          keepOnSplit: false,
          parseHTML: (e) => {
            const t = e.getAttribute("data-kind"), n = e.getAttribute("data-status");
            return ua(t, n === "todo" || n === "doing" || n === "done" ? n : void 0);
          },
          renderHTML: (e) => ({
            "data-kind": Jt(e)
          })
        },
        status: {
          default: "todo",
          keepOnSplit: false,
          parseHTML: (e) => {
            const t = e.getAttribute("data-status");
            if (t === "todo" || t === "doing" || t === "done") return t;
            const n = e.getAttribute("data-checked");
            return n === "" || n === "true" ? "done" : "todo";
          },
          renderHTML: (e) => {
            const t = At(e);
            return {
              "data-status": t,
              "data-checked": t === "done" ? "true" : "false"
            };
          }
        },
        checked: {
          default: false,
          keepOnSplit: false,
          parseHTML: (e) => {
            const t = e.getAttribute("data-status");
            if (t === "done") return true;
            if (t === "doing" || t === "todo") return false;
            const n = e.getAttribute("data-checked");
            return n === "" || n === "true";
          },
          renderHTML: (e) => ({
            "data-checked": At(e) === "done" ? "true" : "false"
          })
        }
      };
    },
    renderHTML({ node: e, HTMLAttributes: t }) {
      const n = At(e.attrs), r = Jt(e.attrs);
      return [
        "li",
        ke(this.options.HTMLAttributes, t, {
          "data-type": this.name,
          "data-status": n,
          "data-kind": r,
          "data-checked": n === "done" ? "true" : "false"
        }),
        [
          "label",
          [
            "input",
            {
              type: "checkbox",
              class: r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox",
              checked: n === "done" ? "checked" : null,
              "data-status": n,
              "data-kind": r,
              "aria-checked": n === "doing" ? "mixed" : n === "done" ? "true" : "false"
            }
          ],
          [
            "span"
          ]
        ],
        [
          "div",
          0
        ]
      ];
    },
    parseMarkdown: (e, t) => {
      const n = [];
      e.tokens && e.tokens.length > 0 ? n.push(t.createNode("paragraph", {}, t.parseInline(e.tokens))) : e.text ? n.push(t.createNode("paragraph", {}, [
        t.createNode("text", {
          text: e.text
        })
      ])) : n.push(t.createNode("paragraph", {}, [])), e.nestedTokens && e.nestedTokens.length > 0 && n.push(...t.parseChildren(e.nestedTokens));
      const r = e.status === "todo" || e.status === "doing" || e.status === "done" ? e.status : e.checked ? "done" : "todo", a = e.kind === "status" || e.kind === "check" ? ua(e.kind, r) : r === "doing" ? "status" : "check";
      return t.createNode("taskItem", {
        status: r,
        checked: r === "done",
        kind: a
      }, n);
    },
    renderMarkdown: (e, t) => {
      const n = At(e == null ? void 0 : e.attrs), r = Jt(e == null ? void 0 : e.attrs), o = `- [${hl(n, r)}] `;
      return hs(e, t, o);
    },
    addNodeView() {
      return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
        const a = document.createElement("li"), o = document.createElement("label"), l = document.createElement("input"), c = document.createElement("div");
        let d = e;
        o.contentEditable = "false", l.type = "checkbox";
        const p = (g) => {
          const x = dr(g.attrs);
          Gn(l, a, x.status, x.kind);
        };
        p(e);
        const f = (g) => {
          if (typeof n != "function") return;
          const x = n();
          if (typeof x != "number") return;
          const { state: y, dispatch: k } = r.view, j = y.doc.nodeAt(x);
          !j || j.type !== this.type || k(y.tr.setNodeMarkup(x, void 0, {
            ...j.attrs,
            status: g.status,
            checked: g.checked,
            kind: g.kind
          }));
        }, m = (g) => {
          var _a2;
          g.preventDefault(), g.stopPropagation();
          const x = dr(d.attrs), y = ((_a2 = r.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check";
          if (!r.isEditable && !this.options.onReadOnlyChecked) {
            p(d);
            return;
          }
          const k = fl(x.status, y), j = {
            status: k,
            checked: k === "done",
            kind: y
          };
          if (r.isEditable) {
            Gn(l, a, j.status, j.kind), f(j);
            return;
          }
          this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(d, j.checked) ? Gn(l, a, j.status, j.kind) : p(d));
        };
        return o.addEventListener("pointerdown", (g) => {
          g.button === 0 && m(g);
        }), l.addEventListener("click", (g) => {
          g.preventDefault(), g.stopPropagation();
        }), l.addEventListener("change", (g) => {
          g.preventDefault(), p(d);
        }), Object.entries(this.options.HTMLAttributes).forEach(([g, x]) => {
          a.setAttribute(g, String(x));
        }), a.append(o, c), o.append(l), Object.entries(t).forEach(([g, x]) => {
          a.setAttribute(g, String(x));
        }), {
          dom: a,
          contentDOM: c,
          stopEvent: (g) => {
            const x = g.target;
            return !!(x && o.contains(x));
          },
          ignoreMutation: (g) => g.type === "selection" || o.contains(g.target),
          update: (g) => g.type !== this.type ? false : (d = g, p(g), true)
        };
      };
    },
    addInputRules() {
      return [
        new tr({
          find: Lc,
          handler: ({ state: e, range: t, match: n }) => {
            var _a2;
            const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = La(n[2]);
            return Ia(e, t, {
              status: a.status,
              checked: a.checked,
              kind: r
            });
          }
        }),
        new tr({
          find: Ic,
          handler: ({ state: e, range: t, match: n }) => {
            var _a2;
            const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = La(n[1]);
            return Ia(e, t, {
              status: a.status,
              checked: a.checked,
              kind: r
            });
          }
        })
      ];
    }
  }), Ac = /^\s*[-+*]\s+\[([ xX~])\]\s+/, Na = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;
  function Aa(e) {
    var _a2;
    const t = co(e[3]);
    return {
      indentLevel: ((_a2 = e[1]) == null ? void 0 : _a2.length) ?? 0,
      mainContent: e[4] ?? "",
      checked: t.checked,
      status: t.status,
      kind: t.kind
    };
  }
  function Pa(e, t, n = []) {
    return {
      type: "taskItem",
      raw: "",
      mainContent: e.mainContent,
      indentLevel: e.indentLevel,
      checked: e.checked,
      status: e.status,
      kind: e.kind,
      text: e.mainContent,
      tokens: t.inlineTokens(e.mainContent),
      nestedTokens: n
    };
  }
  const Pc = ms.extend({
    markdownTokenizer: {
      name: "taskList",
      level: "block",
      start(e) {
        var _a2;
        const t = (_a2 = e.match(Ac)) == null ? void 0 : _a2.index;
        return t !== void 0 ? t : -1;
      },
      tokenize(e, t, n) {
        const r = (o) => {
          const l = Zr(o, {
            itemPattern: Na,
            extractItemData: Aa,
            createToken: (c, d) => Pa(c, n, d ?? []),
            customNestedParser: r
          }, n);
          if (l) {
            const c = {
              type: "taskList",
              raw: l.raw,
              items: l.items
            }, d = o.slice(l.raw.length);
            return d.trim() ? [
              c,
              ...n.blockTokens(d)
            ] : [
              c
            ];
          }
          return n.blockTokens(o);
        }, a = Zr(e, {
          itemPattern: Na,
          extractItemData: Aa,
          createToken: (o, l) => Pa(o, n, l ?? []),
          customNestedParser: r
        }, n);
        if (a) return {
          type: "taskList",
          raw: a.raw,
          items: a.items
        };
      }
    }
  }), $c = /^:([a-zA-Z0-9_+-]+):/, Rc = gs.extend({
    markdownTokenizer: {
      name: "emoji",
      level: "inline",
      start: (e) => e.indexOf(":"),
      tokenize: (e) => {
        const t = $c.exec(e);
        if (!t) return;
        const n = t[1] ?? "", r = da(n);
        if (r) return {
          type: "emoji",
          raw: t[0],
          emojiName: r
        };
      }
    },
    parseMarkdown: (e, t) => {
      const n = da((e == null ? void 0 : e.emojiName) || (e == null ? void 0 : e.name));
      if (!n) {
        const r = String((e == null ? void 0 : e.raw) || "");
        return r ? t.createTextNode(r) : null;
      }
      return t.createNode("emoji", {
        name: n
      });
    }
  }).configure({
    emojis: xs,
    enableEmoticons: true
  });
  function Dc(e) {
    const { state: t, view: n } = e, { selection: r, doc: a } = t, o = r.$anchor;
    let l = o.depth;
    for (; l > 0 && !o.node(l).isTextblock; ) l -= 1;
    if (l === 0) return e.commands.selectAll();
    const c = o.start(l), d = o.end(l);
    if (!r.empty && r.from <= c && r.to >= d) return e.commands.selectAll();
    const f = H.create(a, c, d);
    return n.dispatch(t.tr.setSelection(f).scrollIntoView()), true;
  }
  const Bc = bs.extend({
    name: "nodeRange",
    addKeyboardShortcuts() {
      var _a2;
      const n = {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}
      };
      return delete n["Shift-ArrowUp"], delete n["Shift-ArrowDown"], n["Mod-a"] = ({ editor: r }) => Dc(r), n;
    }
  }), Hc = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, _c = Ne.create({
    name: "pageBreak",
    group: "block",
    atom: true,
    selectable: true,
    draggable: true,
    parseHTML() {
      return [
        {
          tag: "pgbr"
        },
        {
          tag: "div[data-haim-pgbr]"
        },
        {
          tag: "div.md-pgbr"
        }
      ];
    },
    renderHTML({ HTMLAttributes: e }) {
      return [
        "div",
        ke(e, {
          "data-haim-pgbr": "1",
          "data-md-pgbr": "1",
          class: "haim-pgbr md-pgbr"
        })
      ];
    },
    markdownTokenizer: {
      name: "pageBreak",
      level: "block",
      start: (e) => {
        const t = /<pgbr\s*\/?\s*>/i.exec(e);
        return t ? t.index : -1;
      },
      tokenize: (e) => {
        const t = Hc.exec(e);
        if (t) return {
          type: "pageBreak",
          raw: t[0]
        };
      }
    },
    parseMarkdown: (e, t) => t.createNode("pageBreak"),
    renderMarkdown: () => `<pgbr/>

`,
    addCommands() {
      return {
        setPageBreak: () => ({ chain: e, state: t }) => {
          const n = t.schema.nodes[this.name];
          if (!n || !ks(t, n)) return false;
          const { selection: r } = t, { $to: a } = r, o = e();
          return ws(r) ? o.insertContentAt(a.pos, {
            type: this.name
          }) : o.insertContent({
            type: this.name
          }), o.command(({ state: l, tr: c, dispatch: d }) => {
            var _a2;
            if (d) {
              const { $to: p } = c.selection, f = p.end();
              if (p.nodeAfter) p.nodeAfter.isTextblock ? c.setSelection(H.create(c.doc, p.pos + 1)) : p.nodeAfter.isBlock ? c.setSelection(Xa.create(c.doc, p.pos)) : c.setSelection(H.create(c.doc, p.pos));
              else {
                const g = (_a2 = l.schema.nodes.paragraph || p.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
                g && (c.insert(f, g), c.setSelection(H.create(c.doc, f + 1)));
              }
              c.scrollIntoView();
            }
            return true;
          }).run();
        }
      };
    }
  }), Cr = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", Oc = [
    "nw",
    "ne",
    "sw",
    "se"
  ];
  function $a(e) {
    if (!e) return;
    const t = {};
    for (const n of e.split(";")) {
      const r = n.trim();
      if (!r) continue;
      const a = r.indexOf(":");
      if (a < 0) continue;
      const o = r.slice(0, a).trim(), l = r.slice(a + 1).trim(), c = o.replace(/-([a-z])/g, (d, p) => p.toUpperCase());
      t[c] = l;
    }
    return t;
  }
  function Ra(e, t, n, r) {
    const a = kr({
      path: e,
      width: t,
      height: n,
      background: r
    }), o = a.indexOf("|");
    if (o < 0) return "";
    const l = a.lastIndexOf("]]");
    return a.slice(o + 1, l >= 0 ? l : void 0).trim();
  }
  function Gt(e) {
    return `${Math.max(24, Math.round(e))}px`;
  }
  function zc(e) {
    return e ? e.closest(".overflow-auto") || e.parentElement : null;
  }
  function Fc({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
    var _a2, _b;
    const o = String(e.attrs.path || ""), l = String(e.attrs.options || ""), c = String(e.attrs.alt || o), d = e.attrs.width || null, p = e.attrs.height || null, f = e.attrs.background || null, m = n.isEditable, g = h.useRef(null), x = h.useRef(null), [y, k] = h.useState(false), [j, A] = h.useState(false), [O, N] = h.useState(null), [M, E] = h.useState(null);
    x.current = M;
    const D = h.useMemo(() => M ? {
      ...$a(an({
        width: null,
        height: null,
        background: f
      })),
      width: `${M.width}px`,
      height: `${M.height}px`
    } : $a(an({
      width: d,
      height: p,
      background: f
    })), [
      d,
      p,
      f,
      M
    ]), I = h.useCallback((T, L) => {
      const z = {
        width: T,
        height: L,
        options: Ra(o, T, L, f)
      }, R = zc(n.view.dom), K = (R == null ? void 0 : R.scrollTop) ?? null, F = typeof r == "function" ? r() : null;
      if (typeof F == "number") {
        const Fe = n.state.tr.setNodeMarkup(F, void 0, {
          ...e.attrs,
          ...z
        });
        n.view.dispatch(Fe);
      } else a(z);
      const J = () => {
        R && K != null && (R.scrollTop = K);
      };
      J(), requestAnimationFrame(J), requestAnimationFrame(() => requestAnimationFrame(J));
    }, [
      n,
      r,
      a,
      o,
      f,
      e.attrs
    ]), B = h.useCallback(() => {
      const T = x.current;
      T && (I(Gt(T.width), Gt(T.height)), E(null), x.current = null);
      const L = typeof r == "function" ? r() : null;
      if (typeof L == "number") {
        const z = L + (e.nodeSize || 1);
        n.commands.setTextSelection(z);
      }
      n.commands.blur();
    }, [
      I,
      n,
      r,
      e.nodeSize
    ]), G = h.useCallback((T, L) => {
      var _a3, _b2;
      if (!m) return;
      L.preventDefault(), L.stopPropagation();
      const z = g.current;
      if (!z) return;
      const R = z.getBoundingClientRect(), K = R.width, F = R.height, J = L.clientX, Fe = L.clientY, Ke = F > 0 ? K / F : 1, ne = L.pointerId;
      (_b2 = (_a3 = L.target).setPointerCapture) == null ? void 0 : _b2.call(_a3, ne);
      const ee = {
        width: K,
        height: F
      };
      x.current = ee, E(ee);
      const Q = (Y) => {
        const U = Y.clientX - J, Ae = Y.clientY - Fe;
        let se = K, te = F;
        T.includes("e") && (se = K + U), T.includes("w") && (se = K - U), T.includes("s") && (te = F + Ae), T.includes("n") && (te = F - Ae), se = Math.max(24, se), te = Math.max(24, te), (Y.shiftKey || Y.pointerType === "touch") && (Math.abs(U) >= Math.abs(Ae) ? te = se / Ke : se = te * Ke, se = Math.max(24, se), te = Math.max(24, te));
        const We = {
          width: se,
          height: te
        };
        x.current = We, E(We);
      }, Z = (Y) => {
        var _a4, _b3;
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", Z);
        try {
          (_b3 = (_a4 = Y.target).releasePointerCapture) == null ? void 0 : _b3.call(_a4, ne);
        } catch {
        }
        const U = x.current;
        U && I(Gt(U.width), Gt(U.height)), x.current = null, E(null);
      };
      window.addEventListener("pointermove", Q), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", Z);
    }, [
      m,
      I
    ]);
    h.useEffect(() => {
      if (!t || !m || y || j) return;
      const T = (L) => {
        if (L.key !== "Enter") return;
        const z = L.target;
        z instanceof HTMLInputElement || z instanceof HTMLTextAreaElement || z instanceof HTMLElement && z.isContentEditable || (L.preventDefault(), L.stopPropagation(), B());
      };
      return document.addEventListener("keydown", T, true), () => document.removeEventListener("keydown", T, true);
    }, [
      t,
      m,
      y,
      j,
      B
    ]);
    const le = h.useCallback((T) => {
      if (T.detail > 1 || T.target instanceof Element && T.target.closest("[data-resize-handle]")) return;
      T.preventDefault(), T.stopPropagation();
      const L = typeof r == "function" ? r() : null;
      typeof L == "number" && n.chain().focus().setNodeSelection(L).run();
    }, [
      n,
      r
    ]), it = h.useCallback((T) => {
      T.preventDefault(), T.stopPropagation();
      const L = g.current, z = (L == null ? void 0 : L.currentSrc) || (L == null ? void 0 : L.src) || "";
      z && (N(z), A(true));
    }, []), oe = h.useCallback(async (T, L) => {
      if (!m) return;
      const z = await bo(L), R = typeof r == "function" ? r() : null;
      if (T === "overwrite") {
        const F = {
          path: z,
          alt: z,
          options: Ra(z, d, p, f)
        };
        typeof R == "number" ? n.view.dispatch(n.state.tr.setNodeMarkup(R, void 0, {
          ...e.attrs,
          ...F
        })) : a(F);
        const J = URL.createObjectURL(L);
        N(J);
        return;
      }
      if (typeof R != "number") return;
      const K = R + e.nodeSize;
      n.chain().focus().insertContentAt(K, {
        type: "wikiImage",
        attrs: {
          path: z,
          options: "",
          alt: z,
          width: null,
          height: null,
          background: null
        }
      }).run();
    }, [
      m,
      n,
      r,
      a,
      d,
      p,
      f,
      e.attrs,
      e.nodeSize
    ]);
    return i.jsxs(be, {
      as: "div",
      className: `haim-wiki-image-wrap${t ? " is-selected" : ""}${M ? " is-resizing" : ""}`,
      "data-drag-handle": true,
      style: {
        width: "100%",
        maxWidth: "100%"
      },
      onClick: le,
      onDoubleClick: it,
      onContextMenu: (T) => {
        m && (T.preventDefault(), T.stopPropagation(), k(true));
      },
      children: [
        i.jsxs("div", {
          className: "haim-wiki-image-frame",
          children: [
            i.jsx("img", {
              ref: g,
              src: Cr,
              alt: c,
              className: "haim-wiki-image",
              "data-wiki-path": o,
              ...l ? {
                "data-wiki-options": l
              } : {},
              ...d ? {
                "data-wiki-width": d
              } : {},
              ...p ? {
                "data-wiki-height": p
              } : {},
              ...f ? {
                "data-wiki-bg": f
              } : {},
              style: D,
              draggable: false
            }),
            t && m ? Oc.map((T) => i.jsx("button", {
              type: "button",
              className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${T}`,
              "aria-label": `resize-${T}`,
              "data-resize-handle": T,
              onPointerDown: (L) => G(T, L)
            }, T)) : null
          ]
        }),
        i.jsx(ml, {
          isOpen: y,
          onClose: () => k(false),
          path: o,
          kind: "wiki",
          initialWidth: d ?? "",
          initialHeight: p ?? "",
          imageSrc: ((_a2 = g.current) == null ? void 0 : _a2.currentSrc) || ((_b = g.current) == null ? void 0 : _b.src) || "",
          onApply: ({ width: T, height: L }) => {
            I(T, L), k(false);
          }
        }),
        i.jsx(yo, {
          src: O,
          alt: c,
          open: j,
          onClose: () => {
            A(false), N(null);
          },
          ...m ? {
            onSaveAnnotated: oe
          } : {}
        })
      ]
    });
  }
  function Co(e, t, n = "") {
    const r = t ? li(t) : null;
    return {
      path: e,
      options: t || "",
      alt: n || e,
      width: (r == null ? void 0 : r.width) ?? null,
      height: (r == null ? void 0 : r.height) ?? null,
      background: (r == null ? void 0 : r.background) ?? null
    };
  }
  const Kc = Ne.create({
    name: "wikiImage",
    group: "block",
    atom: true,
    selectable: true,
    draggable: true,
    addAttributes() {
      return {
        path: {
          default: ""
        },
        options: {
          default: ""
        },
        alt: {
          default: ""
        },
        width: {
          default: null
        },
        height: {
          default: null
        },
        background: {
          default: null
        }
      };
    },
    parseHTML() {
      return [
        {
          tag: "img[data-wiki-path]",
          priority: 60,
          getAttrs: (e) => {
            if (!(e instanceof HTMLElement)) return false;
            const t = e.getAttribute("data-wiki-path") || "";
            if (!t) return false;
            const n = e.getAttribute("data-wiki-width"), r = e.getAttribute("data-wiki-height"), a = e.getAttribute("data-wiki-bg"), o = e.getAttribute("data-wiki-options") || [
              n ? `w=${n}` : "",
              r ? `h=${r}` : "",
              a ? `bg=${a}` : ""
            ].filter(Boolean).join(" ");
            return {
              path: t,
              options: o,
              alt: e.getAttribute("alt") || t,
              width: n || null,
              height: r || null,
              background: a || null
            };
          }
        },
        {
          tag: "div[data-haim-wiki-image]",
          priority: 60,
          getAttrs: (e) => {
            if (!(e instanceof HTMLElement)) return false;
            const t = e.getAttribute("data-wiki-path") || "";
            if (!t) return false;
            const n = e.getAttribute("data-wiki-options") || "";
            return Co(t, n, e.getAttribute("data-wiki-alt") || t);
          }
        }
      ];
    },
    renderHTML({ node: e, HTMLAttributes: t }) {
      const n = String(e.attrs.path || ""), r = String(e.attrs.options || ""), a = String(e.attrs.alt || n), o = e.attrs.width || null, l = e.attrs.height || null, c = e.attrs.background || null, d = an({
        width: o,
        height: l,
        background: c
      });
      return [
        "img",
        ke(t, {
          src: Cr,
          alt: a,
          "data-wiki-path": n,
          ...r ? {
            "data-wiki-options": r
          } : {},
          ...o ? {
            "data-wiki-width": o
          } : {},
          ...l ? {
            "data-wiki-height": l
          } : {},
          ...c ? {
            "data-wiki-bg": c
          } : {},
          ...d ? {
            style: d
          } : {},
          class: "haim-wiki-image"
        })
      ];
    },
    addNodeView() {
      return st(Fc);
    },
    renderMarkdown: (e) => {
      var _a2, _b, _c2, _d2, _e2;
      const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.path) || "");
      if (!t) return "";
      const n = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c2 = e.attrs) == null ? void 0 : _c2.height) || null, a = ((_d2 = e.attrs) == null ? void 0 : _d2.background) || null;
      if (n || r || a) return `${kr({
        path: t,
        width: n,
        height: r,
        background: a
      })}

`;
      const o = String(((_e2 = e.attrs) == null ? void 0 : _e2.options) || "");
      return o ? `![[${t}|${o}]]

` : `![[${t}]]

`;
    }
  });
  xf = function(e, t = "", n = "") {
    const r = Co(e, t, n), a = an({
      width: r.width,
      height: r.height,
      background: r.background
    }), o = [
      `src="${Cr}"`,
      `alt="${He(r.alt)}"`,
      `data-wiki-path="${He(r.path)}"`,
      'class="haim-wiki-image"'
    ];
    return r.options && o.push(`data-wiki-options="${He(r.options)}"`), r.width && o.push(`data-wiki-width="${He(r.width)}"`), r.height && o.push(`data-wiki-height="${He(r.height)}"`), r.background && o.push(`data-wiki-bg="${He(r.background)}"`), a && o.push(`style="${He(a)}"`), `<img ${o.join(" ")} />`;
  };
  function He(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
  const Wc = Ne.create({
    name: "wikiFigure",
    group: "block",
    content: "wikiImage figcaption",
    defining: true,
    isolating: true,
    parseHTML() {
      return [
        {
          tag: "figure[data-haim-wiki-figure]"
        }
      ];
    },
    renderHTML({ HTMLAttributes: e }) {
      return [
        "figure",
        ke(e, {
          "data-haim-wiki-figure": "1",
          class: "haim-wiki-figure"
        }),
        0
      ];
    },
    renderMarkdown: (e, t) => {
      const n = Array.isArray(e.content) ? e.content : [], r = n.find((c) => c.type === "wikiImage"), a = n.find((c) => c.type === "figcaption");
      let o = "";
      if (r == null ? void 0 : r.attrs) {
        const c = String(r.attrs.path || "");
        if (c) {
          const d = r.attrs.width || null, p = r.attrs.height || null, f = r.attrs.background || null;
          if (d || p || f) o = kr({
            path: c,
            width: d,
            height: p,
            background: f
          });
          else {
            const m = String(r.attrs.options || "");
            o = m ? `![[${c}|${m}]]` : `![[${c}]]`;
          }
        }
      }
      const l = a ? String(t.renderChildren(a.content || []) || "").trim() : "";
      return o ? l ? `${o}
${l}

` : `${o}

` : l ? `${l}

` : "";
    }
  }), qc = Ne.create({
    name: "figcaption",
    content: "inline*",
    defining: true,
    selectable: false,
    parseHTML() {
      return [
        {
          tag: "figcaption"
        }
      ];
    },
    renderHTML({ HTMLAttributes: e }) {
      return [
        "figcaption",
        ke(e),
        0
      ];
    },
    renderMarkdown: (e, t) => t.renderChildren(e.content || [])
  }), Uc = Ne.create({
    name: "noteCover",
    group: "block",
    atom: true,
    selectable: true,
    draggable: false,
    parseHTML() {
      return [
        {
          tag: "div[data-note-cover-placeholder]",
          priority: 60
        }
      ];
    },
    renderHTML({ HTMLAttributes: e }) {
      return [
        "div",
        ke(e, {
          class: "md-note-cover-placeholder md-note-cover-placeholder--pending",
          "data-note-cover-placeholder": "1",
          role: "button",
          tabindex: "0",
          title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9"
        }),
        [
          "div",
          {
            class: "md-note-cover-placeholder__mount",
            "data-note-cover-mount": "1"
          }
        ],
        [
          "span",
          {
            class: "md-note-cover-placeholder__fallback"
          },
          [
            "span",
            {
              class: "md-note-cover-placeholder__spinner",
              "aria-hidden": "true"
            }
          ],
          [
            "span",
            {
              class: "md-note-cover-placeholder__fallback-text"
            },
            "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
          ]
        ]
      ];
    },
    renderMarkdown: () => ""
  });
  bf = function() {
    return `${pl()}

`;
  };
  function Vc(e) {
    const t = getComputedStyle(e), n = t.lineHeight;
    if (n && n !== "normal") {
      const a = Number.parseFloat(n);
      if (Number.isFinite(a) && a > 0) return a;
    }
    const r = Number.parseFloat(t.fontSize);
    return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
  }
  const Da = /* @__PURE__ */ new WeakMap();
  function So(e) {
    const t = getComputedStyle(e), n = `${t.font}|${t.fontSize}|${t.lineHeight}|${t.fontFamily}|${t.fontWeight}`, r = Da.get(e);
    if (r && r.key === n) return r.value;
    let o = Vc(e);
    try {
      const l = document.createElement("div");
      l.setAttribute("aria-hidden", "true"), l.style.cssText = [
        "position:absolute",
        "visibility:hidden",
        "pointer-events:none",
        "left:0",
        "top:0",
        "width:auto",
        `font:${t.font}`,
        `font-size:${t.fontSize}`,
        `font-family:${t.fontFamily}`,
        `font-weight:${t.fontWeight}`,
        `font-style:${t.fontStyle}`,
        `letter-spacing:${t.letterSpacing}`,
        `line-height:${t.lineHeight}`,
        "white-space:pre",
        "padding:0",
        "margin:0",
        "border:0"
      ].join(";"), l.textContent = "M", document.body.appendChild(l);
      const c = l.getBoundingClientRect().height || l.offsetHeight;
      l.remove(), c > 0 && (o = c);
    } catch {
    }
    return Da.set(e, {
      key: n,
      value: o
    }), o;
  }
  function Xc(e) {
    const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), n = Number.parseFloat(t);
    return Number.isFinite(n) && n > 0 ? n : 4;
  }
  function Mo(e) {
    const t = e.closest("pre");
    if (t) {
      const n = getComputedStyle(t), r = (Number.parseFloat(n.paddingLeft) || 0) + (Number.parseFloat(n.paddingRight) || 0), a = t.clientWidth - r;
      if (a > 0) return a;
    }
    return e.clientWidth;
  }
  function Qc(e) {
    return e.classList.contains("ProseMirror-trailingBreak");
  }
  function jo(e) {
    return Array.from(e.querySelectorAll("br")).filter((t) => !Qc(t));
  }
  function Yc(e) {
    return Math.max(1, jo(e).length + 1);
  }
  function Gc(e, t) {
    const n = Za(t);
    return e ? Math.max(n, Yc(e)) : n;
  }
  function Zc(e, t) {
    const n = Array.from(e.getClientRects()).filter((l) => l.height > 0 || l.width > 0);
    if (n.length === 0) return t;
    let r = 1 / 0, a = -1 / 0;
    for (const l of n) r = Math.min(r, l.top), a = Math.max(a, l.bottom);
    const o = a - r;
    return o > 0.5 ? o : t;
  }
  function Jc(e, t, n, r) {
    if (r === 0) {
      e.selectNodeContents(t), n[0] && e.setEndBefore(n[0]);
      return;
    }
    const a = n[r - 1];
    if (!a) {
      e.selectNodeContents(t), e.collapse(false);
      return;
    }
    e.setStartAfter(a);
    const o = n[r];
    o ? e.setEndBefore(o) : e.setEnd(t, t.childNodes.length);
  }
  function eu(e, t, n, r) {
    const a = n > 0 ? t[n - 1] : null, o = t[n] ?? null;
    if (a && o) {
      const l = o.getBoundingClientRect().top - a.getBoundingClientRect().top;
      if (l > 0.5) return l;
    }
    if (!a && o) {
      const l = e.getBoundingClientRect().top, c = o.getBoundingClientRect().top - l;
      if (c > 0.5) return c;
    }
    if (a && !o) {
      const l = e.getBoundingClientRect().bottom - a.getBoundingClientRect().top;
      if (l > 0.5) return l;
    }
    return r;
  }
  function tu(e, t, n) {
    const r = jo(e);
    if (r.length === 0 && t > 1) return null;
    const a = [], o = document.createRange();
    try {
      for (let l = 0; l < t; l += 1) if (Jc(o, e, r, l), o.collapsed) a.push(eu(e, r, l, n));
      else {
        const c = Zc(o, n);
        a.push(Math.max(c, n * 0.95));
      }
    } catch {
      return null;
    }
    return a.length === t ? a : null;
  }
  function nu(e, t, n, r) {
    const a = Mo(e);
    if (a <= 0) return Array.from({
      length: n
    }, () => r);
    const l = gl(t, xl(e), a, Xc(e)).map((c) => Math.max(1, c) * r);
    for (; l.length < n; ) l.push(r);
    return l.slice(0, n);
  }
  function ru(e, t, n, r) {
    const a = Mo(e);
    if (a <= 0) return Array.from({
      length: n
    }, () => r);
    const o = t.length === 0 ? [
      ""
    ] : String(t).split(`
`);
    for (; o.length < n; ) o.push("");
    o.length > n && (o.length = n);
    const l = getComputedStyle(e), c = l.whiteSpace === "pre" || l.whiteSpace === "nowrap" ? "pre-wrap" : l.whiteSpace || "pre-wrap", d = document.createElement("div");
    d.setAttribute("aria-hidden", "true"), d.style.cssText = [
      "position:absolute",
      "visibility:hidden",
      "pointer-events:none",
      "left:0",
      "top:0",
      `width:${a}px`,
      `font:${l.font}`,
      `font-size:${l.fontSize}`,
      `font-family:${l.fontFamily}`,
      `font-weight:${l.fontWeight}`,
      `font-style:${l.fontStyle}`,
      `letter-spacing:${l.letterSpacing}`,
      `line-height:${l.lineHeight}`,
      `white-space:${c}`,
      `overflow-wrap:${l.overflowWrap || "break-word"}`,
      `word-break:${l.wordBreak || "normal"}`,
      `tab-size:${l.tabSize || 4}`,
      "box-sizing:border-box",
      "padding:0",
      "margin:0",
      "border:0"
    ].join(";");
    for (const f of o) {
      const m = document.createElement("div");
      m.style.whiteSpace = c, m.style.overflowWrap = l.overflowWrap || "break-word", m.style.wordBreak = l.wordBreak || "normal", m.style.lineHeight = l.lineHeight, m.textContent = f.length > 0 ? f : "\xA0", d.appendChild(m);
    }
    document.body.appendChild(d);
    const p = [];
    for (let f = 0; f < n; f += 1) {
      const m = d.children[f], g = (m == null ? void 0 : m.getBoundingClientRect().height) || (m == null ? void 0 : m.offsetHeight) || 0;
      p.push(g > 0 ? g : r);
    }
    return d.remove(), p;
  }
  function au(e, t, n) {
    if (n <= 0) return [];
    const r = So(e), a = tu(e, n, r);
    return a ? a.map((o) => o > 0 ? o : r) : e.closest("pre") || e.tagName === "PRE" ? ru(e, t, n, r) : nu(e, t, n, r);
  }
  function Ba(e) {
    return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
  }
  function ou(e, t) {
    if (e === t) return true;
    if (!e || !t || e.length !== t.length) return false;
    for (let n = 0; n < e.length; n += 1) if (Math.abs((e[n] ?? 0) - (t[n] ?? 0)) > 0.5) return false;
    return true;
  }
  function vo({ text: e, className: t, contentRootRef: n }) {
    const r = Za(e), [a, o] = h.useState(r), [l, c] = h.useState(null), [d, p] = h.useState(null);
    h.useLayoutEffect(() => {
      const m = (n == null ? void 0 : n.current) ?? null, g = Ba(m);
      if (!g) {
        o(r), c(null), p(null);
        return;
      }
      let x = 0, y = null;
      const k = () => {
        cancelAnimationFrame(x), x = requestAnimationFrame(() => {
          const N = Ba((n == null ? void 0 : n.current) ?? null);
          if (!N) {
            o(r), c(null), p(null);
            return;
          }
          const M = Gc(N, e), E = So(N), D = au(N, e, M), I = D.length === M && D.every((B) => B > 0) ? D : null;
          o((B) => B === M ? B : M), p((B) => B === E ? B : E), c((B) => ou(B, I) ? B : I);
        });
      };
      k(), y = new ResizeObserver(k), y.observe(g), m && m !== g && y.observe(m);
      const j = g.closest("pre");
      j && j !== g && j !== m && y.observe(j);
      const A = new MutationObserver(k);
      A.observe(g, {
        subtree: true,
        childList: true,
        characterData: true
      });
      const O = window.setTimeout(k, 0);
      return window.addEventListener(aa, k), window.addEventListener("resize", k), () => {
        cancelAnimationFrame(x), window.clearTimeout(O), y == null ? void 0 : y.disconnect(), A.disconnect(), window.removeEventListener(aa, k), window.removeEventListener("resize", k);
      };
    }, [
      e,
      r,
      n
    ]);
    const f = d != null && d > 0 ? {
      lineHeight: `${d}px`
    } : void 0;
    return i.jsx("div", {
      className: [
        "haim-line-numbers",
        t
      ].filter(Boolean).join(" "),
      style: f,
      "aria-hidden": true,
      children: Array.from({
        length: a
      }, (m, g) => {
        const x = l == null ? void 0 : l[g], y = x != null && x > 0 ? {
          height: x,
          minHeight: x,
          maxHeight: x,
          lineHeight: d != null && d > 0 ? `${Math.min(d, x)}px` : void 0
        } : void 0;
        return i.jsx("span", {
          className: "haim-line-numbers__n",
          style: y,
          children: g + 1
        }, g);
      })
    });
  }
  su = function(e) {
    const n = ci(String(e || ""))[0];
    return n ? {
      meta: n.meta ?? Ja(),
      grid: n.grid
    } : null;
  };
  iu = function(e, t) {
    return `${ui(e)}
${di(t)}`;
  };
  kf = function() {
    const e = Ja(), t = {
      rows: [
        [
          "",
          "",
          ""
        ],
        [
          "",
          "",
          ""
        ],
        [
          "",
          "",
          ""
        ]
      ],
      aligns: [
        null,
        null,
        null
      ]
    };
    return {
      meta: e,
      grid: t,
      text: iu(e, t)
    };
  };
  lu = "haim-table-edit-request";
  function cu(e, t) {
    e.dispatchEvent(new CustomEvent(lu, {
      detail: t,
      bubbles: true
    }));
  }
  function uu({ node: e, editor: t, selected: n, getPos: r }) {
    const a = String(e.attrs.kind || "raw"), o = String(e.attrs.text || ""), l = t.isEditable, c = h.useRef(null), d = h.useMemo(() => {
      if (a !== "haim-table") return null;
      const f = su(o);
      return f ? bl(f.grid, f.meta) : null;
    }, [
      a,
      o
    ]), p = () => {
      if (!l || a !== "haim-table") return;
      const f = typeof r == "function" ? r() : null;
      typeof f == "number" && cu(t.view.dom, {
        pos: f,
        text: o
      });
    };
    return a === "haim-table" && d ? i.jsx(be, {
      as: "div",
      className: `haim-raw-md haim-raw-md--haim-table${n ? " is-selected" : ""}`,
      "data-haim-raw-md": "1",
      "data-kind": "haim-table",
      contentEditable: false,
      onDoubleClick: (f) => {
        f.preventDefault(), f.stopPropagation(), p();
      },
      children: i.jsx("div", {
        className: "haim-haim-table-preview",
        dangerouslySetInnerHTML: {
          __html: d
        }
      })
    }) : i.jsxs(be, {
      as: "div",
      className: `haim-raw-md${n ? " is-selected" : ""}`,
      "data-haim-raw-md": "1",
      "data-kind": a,
      contentEditable: false,
      children: [
        i.jsx(vo, {
          text: o,
          className: "haim-raw-md__line-numbers",
          contentRootRef: c
        }),
        i.jsx("pre", {
          ref: c,
          className: "haim-raw-md__pre",
          children: o
        })
      ]
    });
  }
  const du = Ne.create({
    name: "rawMarkdownBlock",
    group: "block",
    atom: true,
    selectable: true,
    code: true,
    addAttributes() {
      return {
        text: {
          default: ""
        },
        kind: {
          default: "raw"
        }
      };
    },
    parseHTML() {
      return [
        {
          tag: "pre[data-haim-raw-md]",
          getAttrs: (e) => e instanceof HTMLElement ? {
            text: e.textContent || "",
            kind: e.getAttribute("data-kind") || "raw"
          } : false
        }
      ];
    },
    renderHTML({ node: e, HTMLAttributes: t }) {
      return [
        "pre",
        ke(t, {
          "data-haim-raw-md": "1",
          "data-kind": String(e.attrs.kind || "raw"),
          class: "haim-raw-md"
        }),
        String(e.attrs.text || "")
      ];
    },
    addNodeView() {
      return st(uu);
    },
    renderMarkdown: (e) => {
      var _a2;
      const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
      return t ? t.endsWith(`
`) ? t : `${t}
` : "";
    }
  }), fu = Ne.create({
    name: "deepHeading",
    group: "block",
    content: "inline*",
    defining: true,
    addAttributes() {
      return {
        level: {
          default: 7,
          parseHTML: (e) => {
            const t = Number(e.getAttribute("data-heading-level") || "7");
            return Number.isFinite(t) ? Math.min(10, Math.max(7, t)) : 7;
          }
        }
      };
    },
    addCommands() {
      return {
        setDeepHeading: (e) => ({ commands: t }) => {
          const n = Math.min(10, Math.max(7, Number(e.level) || 7));
          return t.setNode(this.name, {
            level: n
          });
        },
        toggleDeepHeading: (e) => ({ commands: t }) => {
          const n = Math.min(10, Math.max(7, Number(e.level) || 7));
          return t.toggleNode(this.name, "paragraph", {
            level: n
          });
        }
      };
    },
    parseHTML() {
      return [
        {
          tag: "h6[data-heading-level]",
          getAttrs: (e) => {
            if (!(e instanceof HTMLElement)) return false;
            const t = Number(e.getAttribute("data-heading-level") || "0");
            return t < 7 || t > 10 ? false : {
              level: t
            };
          }
        }
      ];
    },
    renderHTML({ node: e, HTMLAttributes: t }) {
      const n = Number(e.attrs.level) || 7;
      return [
        "h6",
        ke(t, {
          "data-heading-level": String(n),
          class: `haim-deep-heading haim-h${n}`
        }),
        0
      ];
    },
    renderMarkdown: (e, t) => {
      var _a2;
      const n = Number((_a2 = e.attrs) == null ? void 0 : _a2.level) || 7, r = "#".repeat(Math.min(10, Math.max(7, n))), a = t.renderChildren(e.content || []);
      return `${r} ${a}

`;
    }
  }), $ = {
    format: "\uC11C\uC2DD",
    heading: "\uC81C\uBAA9",
    block: "\uBE14\uB85D",
    insert: "\uC0BD\uC785",
    tool: "\uB3C4\uAD6C"
  };
  function hu(e, t) {
    if (t >= 1 && t <= 6) {
      e.chain().focus().toggleHeading({
        level: t
      }).run();
      return;
    }
    if (t >= 7 && t <= 10) {
      const n = e.commands;
      if (typeof n.toggleDeepHeading == "function") {
        n.toggleDeepHeading({
          level: t
        });
        return;
      }
      e.chain().focus().command(({ commands: r }) => r.toggleNode("deepHeading", "paragraph", {
        level: t
      })).run();
    }
  }
  function ge(e, t) {
    return {
      id: `heading-${e}`,
      title: `\uC81C\uBAA9 ${e}`,
      titleEn: `Heading ${e}`,
      keywords: [
        `h${e}`,
        `heading ${e}`,
        `heading${e}`,
        `\uC81C\uBAA9${e}`,
        `\uC81C\uBAA9 ${e}`,
        "#".repeat(e)
      ],
      group: "heading",
      groupLabel: $.heading,
      Icon: t,
      run: ({ editor: n }) => {
        hu(n, e);
      }
    };
  }
  const Eo = [
    {
      id: "bold",
      title: "\uAD75\uAC8C",
      titleEn: "Bold",
      keywords: [
        "bold",
        "\uAD75\uAC8C",
        "\uBCFC\uB4DC",
        "\uAC15\uC870",
        "strong"
      ],
      group: "format",
      groupLabel: $.format,
      Icon: Li,
      run: ({ editor: e }) => {
        e.chain().focus().toggleBold().run();
      }
    },
    {
      id: "italic",
      title: "\uAE30\uC6B8\uC784",
      titleEn: "Italic",
      keywords: [
        "italic",
        "\uAE30\uC6B8\uC784",
        "\uC774\uD0E4\uB9AD",
        "em"
      ],
      group: "format",
      groupLabel: $.format,
      Icon: Ii,
      run: ({ editor: e }) => {
        e.chain().focus().toggleItalic().run();
      }
    },
    {
      id: "underline",
      title: "\uBC11\uC904",
      titleEn: "Underline",
      keywords: [
        "underline",
        "\uBC11\uC904",
        "\uC5B8\uB354\uB77C\uC778"
      ],
      group: "format",
      groupLabel: $.format,
      Icon: Ni,
      run: ({ editor: e }) => {
        e.chain().focus().toggleUnderline().run();
      }
    },
    {
      id: "strike",
      title: "\uCDE8\uC18C\uC120",
      titleEn: "Strikethrough",
      keywords: [
        "strike",
        "strikethrough",
        "\uCDE8\uC18C\uC120",
        "\uC0AD\uC81C\uC120"
      ],
      group: "format",
      groupLabel: $.format,
      Icon: Ai,
      run: ({ editor: e }) => {
        e.chain().focus().toggleStrike().run();
      }
    },
    {
      id: "code",
      title: "\uC778\uB77C\uC778 \uCF54\uB4DC",
      titleEn: "Inline code",
      keywords: [
        "code",
        "inline code",
        "\uC778\uB77C\uC778 \uCF54\uB4DC",
        "\uCF54\uB4DC"
      ],
      group: "format",
      groupLabel: $.format,
      Icon: Pi,
      run: ({ editor: e }) => {
        e.chain().focus().toggleCode().run();
      }
    },
    {
      id: "subscript",
      title: "\uC544\uB798 \uCCA8\uC790",
      titleEn: "Subscript",
      keywords: [
        "sub",
        "subscript",
        "\uC544\uB798\uCCA8\uC790",
        "\uC544\uB798 \uCCA8\uC790"
      ],
      group: "format",
      groupLabel: $.format,
      Icon: $i,
      run: ({ editor: e }) => {
        e.chain().focus().toggleSubscript().run();
      }
    },
    {
      id: "superscript",
      title: "\uC704 \uCCA8\uC790",
      titleEn: "Superscript",
      keywords: [
        "sup",
        "superscript",
        "\uC704\uCCA8\uC790",
        "\uC704 \uCCA8\uC790"
      ],
      group: "format",
      groupLabel: $.format,
      Icon: Ri,
      run: ({ editor: e }) => {
        e.chain().focus().toggleSuperscript().run();
      }
    },
    ge(1, Qi),
    ge(2, Yi),
    ge(3, Gi),
    ge(4, Zi),
    ge(5, Ji),
    ge(6, el),
    ge(7, vt),
    ge(8, vt),
    ge(9, vt),
    ge(10, vt),
    {
      id: "paragraph",
      title: "\uBCF8\uBB38",
      titleEn: "Paragraph",
      keywords: [
        "paragraph",
        "\uBCF8\uBB38",
        "\uD14D\uC2A4\uD2B8",
        "text",
        "p"
      ],
      group: "block",
      groupLabel: $.block,
      Icon: nr,
      run: ({ editor: e }) => {
        e.chain().focus().setParagraph().run();
      }
    },
    {
      id: "bullet-list",
      title: "\uAE00\uBA38\uB9AC \uAE30\uD638 \uBAA9\uB85D",
      titleEn: "Bullet list",
      keywords: [
        "ul",
        "unordered",
        "bullet",
        "\uBAA9\uB85D",
        "\uB9AC\uC2A4\uD2B8",
        "\uAE00\uBA38\uB9AC"
      ],
      group: "block",
      groupLabel: $.block,
      Icon: Di,
      run: ({ editor: e }) => {
        e.chain().focus().toggleBulletList().run();
      }
    },
    {
      id: "ordered-list",
      title: "\uBC88\uD638 \uBAA9\uB85D",
      titleEn: "Ordered list",
      keywords: [
        "ol",
        "ordered",
        "numbered",
        "\uBC88\uD638",
        "\uBC88\uD638 \uBAA9\uB85D"
      ],
      group: "block",
      groupLabel: $.block,
      Icon: Bi,
      run: ({ editor: e }) => {
        e.chain().focus().toggleOrderedList().run();
      }
    },
    {
      id: "task-list",
      title: "\uD560 \uC77C \uBAA9\uB85D",
      titleEn: "Task list",
      keywords: [
        "task",
        "todo",
        "checkbox",
        "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8",
        "\uD560 \uC77C",
        "\uCCB4\uD06C\uBC15\uC2A4",
        "check"
      ],
      group: "block",
      groupLabel: $.block,
      Icon: la,
      run: ({ editor: e }) => {
        e.chain().focus().toggleTaskList().run();
      }
    },
    {
      id: "status-task",
      title: "\uC0C1\uD0DC \uD560 \uC77C",
      titleEn: "Status task",
      keywords: [
        "status",
        "doing",
        "in progress",
        "\uC9C4\uD589",
        "\uC0C1\uD0DC",
        "\uC0C1\uD0DC \uCCB4\uD06C\uBC15\uC2A4",
        "~"
      ],
      group: "block",
      groupLabel: $.block,
      Icon: la,
      run: ({ editor: e }) => {
        const t = () => {
          e.chain().focus().command(({ tr: n, state: r, dispatch: a }) => {
            if (!a) return false;
            const o = r.selection.$from;
            for (let l = o.depth; l >= 0; l -= 1) if (o.node(l).type.name === "taskItem") return n.setNodeMarkup(o.before(l), void 0, {
              ...o.node(l).attrs,
              status: "doing",
              checked: false,
              kind: "status"
            }), a(n), true;
            return false;
          }).run();
        };
        e.isActive("taskList") || e.chain().focus().toggleTaskList().run(), t();
      }
    },
    {
      id: "blockquote",
      title: "\uC778\uC6A9",
      titleEn: "Quote",
      keywords: [
        "quote",
        "blockquote",
        "\uC778\uC6A9"
      ],
      group: "block",
      groupLabel: $.block,
      Icon: Hi,
      run: ({ editor: e }) => {
        e.chain().focus().toggleBlockquote().run();
      }
    },
    {
      id: "code-block",
      title: "\uCF54\uB4DC \uBE14\uB85D",
      titleEn: "Code block",
      keywords: [
        "code block",
        "fence",
        "\uCF54\uB4DC \uBE14\uB85D",
        "\uD39C\uC2A4"
      ],
      group: "block",
      groupLabel: $.block,
      Icon: _i,
      run: ({ editor: e }) => {
        e.chain().focus().toggleCodeBlock().run();
      }
    },
    {
      id: "link",
      title: "\uB9C1\uD06C",
      titleEn: "Link",
      keywords: [
        "link",
        "url",
        "\uB9C1\uD06C",
        "\uD558\uC774\uD37C\uB9C1\uD06C"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: ca,
      run: ({ editor: e, app: t }) => {
        if (t == null ? void 0 : t.onUrlLink) {
          t.onUrlLink();
          return;
        }
        const n = e.getAttributes("link").href, r = window.prompt("URL", n || "https://");
        if (r !== null) {
          if (r === "") {
            e.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          e.chain().focus().extendMarkRange("link").setLink({
            href: r
          }).run();
        }
      }
    },
    {
      id: "docuhaim-link",
      title: "\uB178\uD2B8 \uB9C1\uD06C",
      titleEn: "Note link",
      keywords: [
        "docuhaim",
        "note link",
        "\uB178\uD2B8 \uB9C1\uD06C",
        "vault link",
        "\uD30C\uC77C \uB9C1\uD06C"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: ca,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onDocuhaimNoteLink) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "table",
      title: "\uD45C",
      titleEn: "Table",
      keywords: [
        "table",
        "\uD45C",
        "\uD14C\uC774\uBE14"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: Oi,
      run: ({ editor: e }) => {
        e.chain().focus().insertTable({
          rows: 3,
          cols: 3,
          withHeaderRow: true
        }).run();
      }
    },
    {
      id: "mermaid",
      title: "Mermaid",
      titleEn: "Mermaid diagram",
      keywords: [
        "mermaid",
        "diagram",
        "\uB2E4\uC774\uC5B4\uADF8\uB7A8",
        "flowchart",
        "\uADF8\uB798\uD504"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: zi,
      run: ({ editor: e, app: t }) => {
        if (t == null ? void 0 : t.onInsertMermaid) {
          t.onInsertMermaid();
          return;
        }
        e.chain().focus().insertContent("```mermaid\ngraph TD\n  A-->B\n```\n", {
          contentType: "markdown"
        }).run();
      }
    },
    {
      id: "katex",
      title: "\uC218\uC2DD",
      titleEn: "Math / KaTeX",
      keywords: [
        "math",
        "katex",
        "latex",
        "\uC218\uC2DD",
        "\uACF5\uC2DD",
        "formula"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: Fi,
      run: ({ editor: e, app: t }) => {
        if (t == null ? void 0 : t.onInsertKatex) {
          t.onInsertKatex();
          return;
        }
        const n = e.commands;
        if (typeof n.insertBlockMath == "function") {
          n.insertBlockMath({
            latex: "E=mc^2"
          });
          return;
        }
        e.chain().focus().insertContent('<div data-type="block-math" data-latex="E=mc^2"></div>').run();
      }
    },
    {
      id: "page-break",
      title: "\uD398\uC774\uC9C0 \uB098\uB214",
      titleEn: "Page break",
      keywords: [
        "pgbr",
        "page break",
        "\uD398\uC774\uC9C0 \uB098\uB214",
        "\uC778\uC1C4"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: Ki,
      run: ({ editor: e, app: t }) => {
        if (t == null ? void 0 : t.onInsertPageBreak) {
          t.onInsertPageBreak();
          return;
        }
        e.chain().focus().setPageBreak().run();
      }
    },
    {
      id: "image-link",
      title: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C",
      titleEn: "Image link",
      keywords: [
        "image",
        "\uC774\uBBF8\uC9C0",
        "wiki image",
        "\uC774\uBBF8\uC9C0 \uB9C1\uD06C",
        "picture",
        "pic"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: Vt,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onImageLink) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "image-upload",
      title: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC",
      titleEn: "Upload image",
      keywords: [
        "image",
        "upload",
        "\uC774\uBBF8\uC9C0",
        "\uC5C5\uB85C\uB4DC",
        "\uC0AC\uC9C4",
        "picture",
        "pic"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: Vt,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onImageUpload) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "image-clip",
      title: "\uC774\uBBF8\uC9C0 \uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC",
      titleEn: "Crop & upload image",
      keywords: [
        "image",
        "crop",
        "clip",
        "\uC790\uB974\uAE30",
        "\uD06C\uB86D",
        "picture",
        "pic"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: Vt,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onImageClip) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "whiteboard",
      title: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30",
      titleEn: "Create whiteboard",
      keywords: [
        "whiteboard",
        "\uD654\uC774\uD2B8\uBCF4\uB4DC",
        "\uCE94\uBC84\uC2A4",
        "canvas",
        "picture"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: Vt,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onCreateWhiteboard) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "qrcode",
      title: "QRCode \uB9CC\uB4E4\uAE30",
      titleEn: "Create QR code",
      keywords: [
        "qr",
        "qrcode",
        "\uD050\uC54C",
        "\uD050\uC54C\uCF54\uB4DC"
      ],
      group: "insert",
      groupLabel: $.insert,
      Icon: ro,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onCreateQrCode) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "undo",
      title: "\uC2E4\uD589 \uCDE8\uC18C",
      titleEn: "Undo",
      keywords: [
        "undo",
        "revoke",
        "\uC2E4\uD589\uCDE8\uC18C",
        "\uB418\uB3CC\uB9AC\uAE30"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: to,
      run: ({ editor: e }) => {
        e.chain().focus().undo().run();
      }
    },
    {
      id: "redo",
      title: "\uB2E4\uC2DC \uC2E4\uD589",
      titleEn: "Redo",
      keywords: [
        "redo",
        "next",
        "\uB2E4\uC2DC\uC2E4\uD589"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: no,
      run: ({ editor: e }) => {
        e.chain().focus().redo().run();
      }
    },
    {
      id: "heading-remap",
      title: "\uC81C\uBAA9 \uC218\uC900 \uC7AC\uB9E4\uD551",
      titleEn: "Remap heading levels",
      keywords: [
        "heading remap",
        "\uC81C\uBAA9 \uBCC0\uACBD",
        "\uD5E4\uB529",
        "\uC81C\uBAA9\uB9AC\uB9F5",
        "\uD5E4\uB529\uB9AC\uB9E4\uD551"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: vt,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onHeadingRemap) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "checklist-progress",
      title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960",
      titleEn: "Checklist progress",
      keywords: [
        "checklist",
        "progress",
        "\uC9C4\uD589\uB960",
        "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: Wi,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onChecklistProgress) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "llm-assist",
      title: "AI \uB3C4\uC6B0\uBBF8",
      titleEn: "AI assistant",
      keywords: [
        "ai",
        "llm",
        "gemini",
        "openai",
        "\uC778\uACF5\uC9C0\uB2A5",
        "\uB3C4\uC6B0\uBBF8"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: qi,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onLlmAssist) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "export-pdf",
      title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30",
      titleEn: "Export PDF",
      keywords: [
        "export",
        "pdf",
        "\uC778\uC1C4",
        "print",
        "\uB0B4\uBCF4\uB0B4\uAE30"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: Ui,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onExportPdf) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "find-replace",
      title: "\uCC3E\uAE30/\uBC14\uAFB8\uAE30",
      titleEn: "Find and replace",
      keywords: [
        "find",
        "replace",
        "search",
        "\uCC3E\uAE30",
        "\uBC14\uAFB8\uAE30",
        "\uAC80\uC0C9"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: ao,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onFindReplaceToggle) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "invisible-chars",
      title: "\uBE44\uAC00\uC2DC \uBB38\uC790",
      titleEn: "Invisible characters",
      keywords: [
        "invisible",
        "whitespace",
        "\uBE44\uAC00\uC2DC",
        "\uACF5\uBC31",
        "pilcrow",
        "\xB6"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: Vi,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onInvisibleCharsToggle) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "toc",
      title: "\uBAA9\uCC28",
      titleEn: "Table of contents",
      keywords: [
        "toc",
        "catalog",
        "\uBAA9\uCC28",
        "outline"
      ],
      group: "tool",
      groupLabel: $.tool,
      Icon: Xi,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onTocToggle) == null ? void 0 : _a2.call(e);
      }
    }
  ];
  function Ha(e) {
    return e.normalize("NFKC").toLowerCase();
  }
  function pu(e, t = Eo) {
    const n = Ha(e).trim();
    if (!n) return [
      ...t
    ];
    const r = n.split(/\s+/).filter(Boolean);
    return t.filter((a) => {
      const o = Ha([
        a.id,
        a.title,
        a.titleEn,
        ...a.keywords
      ].join(`
`));
      return r.every((l) => o.includes(l));
    });
  }
  const mu = h.forwardRef(function({ items: t, command: n }, r) {
    const [a, o] = h.useState(0), l = h.useRef(null), c = h.useRef([]);
    if (h.useEffect(() => {
      o(0);
    }, [
      t
    ]), h.useLayoutEffect(() => {
      var _a2;
      (_a2 = c.current[a]) == null ? void 0 : _a2.scrollIntoView({
        block: "nearest"
      });
    }, [
      a,
      t
    ]), h.useImperativeHandle(r, () => ({
      onKeyDown: ({ event: p }) => {
        if (t.length === 0 || p.shiftKey || p.altKey || p.metaKey || p.ctrlKey) return false;
        if (p.key === "ArrowUp") return o((f) => (f + t.length - 1) % t.length), true;
        if (p.key === "ArrowDown") return o((f) => (f + 1) % t.length), true;
        if (p.key === "Enter") {
          const f = t[a];
          return f && n(f), true;
        }
        return false;
      }
    })), t.length === 0) return i.jsx("div", {
      className: "w-[min(92vw,300px)] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-muted",
      role: "listbox",
      "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839",
      children: "\uACB0\uACFC \uC5C6\uC74C"
    });
    let d = "";
    return i.jsx("div", {
      ref: l,
      className: "flex max-h-[min(60vh,360px)] w-[min(92vw,300px)] flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface",
      role: "listbox",
      "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839",
      children: t.map((p, f) => {
        const m = p.groupLabel !== d;
        d = p.groupLabel;
        const g = p.Icon, x = f === a;
        return i.jsxs("div", {
          children: [
            m ? i.jsx("div", {
              className: "px-2.5 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-odp-muted",
              children: p.groupLabel
            }) : null,
            i.jsxs("button", {
              type: "button",
              ref: (y) => {
                c.current[f] = y;
              },
              role: "option",
              "aria-selected": x,
              className: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm ${x ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-800 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-bgSoft"}`,
              onMouseEnter: () => o(f),
              onClick: () => {
                n(p);
              },
              children: [
                i.jsx(g, {
                  size: 14,
                  className: "shrink-0 text-gray-500 dark:text-odp-muted",
                  "aria-hidden": true
                }),
                i.jsx("span", {
                  className: "min-w-0 flex-1 truncate font-medium",
                  children: p.title
                }),
                i.jsx("span", {
                  className: "shrink-0 truncate text-xs text-gray-400 dark:text-odp-muted",
                  children: p.titleEn
                })
              ]
            })
          ]
        }, p.id);
      })
    });
  }), _a = new Ie("haimSlashCommands");
  function gu(e) {
    const { $from: t } = e.selection;
    for (let n = t.depth; n > 0; n -= 1) {
      const r = t.node(n).type.name;
      if (r === "codeBlock" || r === "rawMarkdownBlock") return true;
    }
    return false;
  }
  function Oa(e, t) {
    Zs.flushSync(() => {
      e.root.render(h.createElement(mu, {
        ref: (n) => {
          e.listRef.current = n;
        },
        items: t.items,
        command: (n) => {
          t.command(n);
        }
      }));
    });
  }
  const xu = ze.create({
    name: "haimSlashCommands",
    addStorage() {
      return {
        getAppActions: () => null
      };
    },
    addProseMirrorPlugins() {
      return [
        ys({
          pluginKey: _a,
          editor: this.editor,
          char: "/",
          allowSpaces: true,
          startOfLine: false,
          allowedPrefixes: [
            " "
          ],
          decorationClass: "haim-slash-decoration",
          placement: "bottom-start",
          offset: {
            mainAxis: 6,
            crossAxis: 0
          },
          dismissOnOutsideClick: true,
          floatingUi: {
            strategy: "fixed"
          },
          initialItems: [
            ...Eo
          ],
          allow: ({ state: e, editor: t }) => t.isEditable && !gu(e),
          items: ({ query: e }) => pu(e),
          command: ({ editor: e, range: t, props: n }) => {
            var _a2, _b;
            e.chain().focus().deleteRange(t).run();
            const r = ((_b = (_a2 = e.storage.haimSlashCommands) == null ? void 0 : _a2.getAppActions) == null ? void 0 : _b.call(_a2)) ?? null;
            n.run({
              editor: e,
              app: r
            });
          },
          render: () => {
            let e = null;
            return {
              onStart: (t) => {
                const n = document.createElement("div");
                n.className = "haim-slash-menu-root", n.style.zIndex = "100010";
                const r = {
                  current: null
                }, a = Gs.createRoot(n);
                e = {
                  el: n,
                  root: a,
                  listRef: r,
                  unmountFloating: null
                }, Oa(e, t), e.unmountFloating = t.mount(n);
              },
              onUpdate: (t) => {
                e && Oa(e, t);
              },
              onKeyDown: (t) => {
                var _a2;
                return t.event.key === "Escape" ? (Cs(t.view, _a), true) : ((_a2 = e == null ? void 0 : e.listRef.current) == null ? void 0 : _a2.onKeyDown(t)) ?? false;
              },
              onExit: () => {
                var _a2;
                const t = e;
                e = null, (_a2 = t == null ? void 0 : t.unmountFloating) == null ? void 0 : _a2.call(t), (t == null ? void 0 : t.root) && queueMicrotask(() => {
                  t.root.unmount();
                });
              }
            };
          }
        })
      ];
    }
  });
  function bu(e, t) {
    try {
      const n = e.domAtPos(t), r = n.node instanceof Element ? n.node : n.node.parentElement;
      if (!r) return 22;
      const a = window.getComputedStyle(r), o = parseFloat(a.lineHeight);
      if (Number.isFinite(o) && o > 0) return o;
      const l = parseFloat(a.fontSize);
      if (Number.isFinite(l) && l > 0) return l * 1.4;
    } catch {
    }
    return 22;
  }
  function Zn(e) {
    for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
    return -1;
  }
  function ku(e, t, n, r) {
    const a = Zn(t);
    if (a < 0) return null;
    const o = n === "down" ? 1 : -1, l = n === "down" ? t.after(a) : t.before(a);
    let c;
    try {
      c = H.near(t.doc.resolve(Math.max(0, Math.min(t.doc.content.size, l))), o).head;
    } catch {
      return null;
    }
    const d = t.doc.resolve(c);
    if (Zn(d) === a) {
      const p = d.before(Zn(d)), f = t.before(a);
      if (p === f) return null;
    }
    try {
      const p = e.coordsAtPos(c), f = (p.top + p.bottom) / 2, m = e.posAtCoords({
        left: r,
        top: f
      });
      if (m && m.pos !== t.pos) return m.pos;
    } catch {
    }
    return c !== t.pos ? c : null;
  }
  function za(e, t) {
    const { state: n } = e, { selection: r, doc: a } = n, o = t === "down" ? 1 : -1;
    let l = r.anchor, c = r.head;
    if (r instanceof Xa) {
      const x = H.near(a.resolve(t === "down" ? r.to : r.from), o);
      l = x.anchor, c = x.head;
    }
    let d;
    try {
      d = e.coordsAtPos(c);
    } catch {
      d = {
        left: 0,
        top: 0,
        bottom: 22
      };
    }
    const p = bu(e, c), f = d.left;
    let m = c;
    const g = [
      0.2,
      0.55,
      1,
      1.5,
      2,
      2.75,
      3.5
    ];
    for (const x of g) {
      const y = t === "down" ? d.bottom + Math.max(2, p * x) : d.top - Math.max(2, p * x);
      let k = null;
      try {
        k = e.posAtCoords({
          left: f,
          top: y
        });
      } catch {
        k = null;
      }
      if (k) {
        if (t === "down" && k.pos > c) {
          m = k.pos;
          break;
        }
        if (t === "up" && k.pos < c) {
          m = k.pos;
          break;
        }
      }
    }
    if (m === c) {
      const x = ku(e, a.resolve(c), t, f);
      x != null && (m = x);
    }
    if (m === c) {
      const x = Math.max(1, Math.min(a.content.size, c + o));
      if (x !== c) try {
        m = H.near(a.resolve(x), o).head;
      } catch {
        return false;
      }
    }
    if (m = Math.max(0, Math.min(a.content.size, m)), m === c) return false;
    try {
      const x = n.tr.setSelection(H.create(a, l, m));
      return x.scrollIntoView(), e.dispatch(x), true;
    } catch {
      try {
        const x = H.near(a.resolve(m), o), y = n.tr.setSelection(H.create(a, l, x.head));
        return y.scrollIntoView(), e.dispatch(y), true;
      } catch {
        return false;
      }
    }
  }
  const wu = ze.create({
    name: "haimShiftArrowSelect",
    priority: 1e3,
    addKeyboardShortcuts() {
      return {
        "Shift-ArrowDown": ({ editor: e }) => za(e.view, "down"),
        "Shift-ArrowUp": ({ editor: e }) => za(e.view, "up")
      };
    }
  });
  function yu(e) {
    for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
    return -1;
  }
  function Cu(e, t) {
    const { state: n } = e, r = n.schema.nodes.paragraph;
    if (!r) return false;
    const a = n.selection.$head, o = yu(a);
    if (o < 0) return false;
    const l = a.before(o), c = r.createAndFill();
    if (!c) return false;
    let d = n.tr.insert(l, c);
    try {
      d = d.setSelection(H.near(d.doc.resolve(l + 1)));
    } catch {
      return false;
    }
    return d.scrollIntoView(), (0, e.dispatch)(d), true;
  }
  const Su = ze.create({
    name: "haimInsertLineAbove",
    priority: 1e3,
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-Enter": ({ editor: e }) => Cu(e.view)
      };
    }
  }), Zt = /[\p{L}\p{N}_]/u;
  function To(e, t) {
    try {
      const n = e.resolve(t);
      if (!n.parent.isTextblock) return null;
      const r = n.start(), a = n.parent.textContent;
      if (!a) return null;
      let o = Math.max(0, Math.min(a.length, t - r)), l = o;
      if (l > 0 && (l >= a.length || !Zt.test(a[l])) && (l = o - 1), l < 0 || l >= a.length || !Zt.test(a[l])) return null;
      let c = l, d = l + 1;
      for (; c > 0 && Zt.test(a[c - 1]); ) c -= 1;
      for (; d < a.length && Zt.test(a[d]); ) d += 1;
      return {
        from: r + c,
        to: r + d
      };
    } catch {
      return null;
    }
  }
  function Mu(e) {
    const t = [];
    return e.descendants((n, r) => n.isTextblock ? (t.length > 0 && t.push({
      pos: -1,
      ch: `
`
    }), n.forEach((a, o) => {
      if (a.isText && a.text) {
        const l = r + 1 + o;
        for (let c = 0; c < a.text.length; c += 1) t.push({
          pos: l + c,
          ch: a.text[c]
        });
      } else a.isText || t.push({
        pos: -1,
        ch: "\0"
      });
    }), false) : true), t;
  }
  function Lo(e, t, n = 1e3) {
    if (!t) return [];
    const r = Mu(e);
    if (!r.length) return [];
    const a = r.map((d) => d.ch).join(""), o = t;
    if (!o) return [];
    const l = [];
    let c = 0;
    for (; l.length < n; ) {
      const d = a.indexOf(o, c);
      if (d < 0) break;
      const p = d + o.length, f = r[d], m = r[p - 1];
      let g = false;
      for (let x = d; x < p; x += 1) if (r[x].pos < 0) {
        g = true;
        break;
      }
      !g && f && m && f.pos >= 0 && m.pos >= 0 && l.push({
        from: f.pos,
        to: m.pos + 1
      }), c = d + Math.max(1, o.length);
    }
    return l;
  }
  function ju(e, t, n, r, a) {
    const o = Lo(e, t);
    if (!o.length) return null;
    const l = (p) => r.some((f) => f.from === p.from && f.to === p.to), c = (p) => {
      if (!a) return true;
      const f = To(e, p.from);
      return !!(f && f.from === p.from && f.to === p.to);
    }, d = o.find((p) => p.from >= n && !l(p) && c(p));
    return d || (o.find((p) => !l(p) && c(p)) ?? null);
  }
  function tn(e, t) {
    if (t.from >= t.to) return "";
    try {
      return e.textBetween(t.from, t.to, `
`);
    } catch {
      return "";
    }
  }
  const _e = new Ie("haimMultiCursor"), Pt = {
    ranges: [],
    mainIndex: 0,
    query: null,
    wholeWord: false
  }, Sr = "set", fr = "clear";
  function xe(e) {
    return _e.getState(e) ?? Pt;
  }
  function vu(e, t) {
    const n = [];
    for (const a of e) {
      const o = t.map(a.from, 1), l = t.map(a.to, -1);
      o <= l && n.push({
        from: o,
        to: l
      });
    }
    n.sort((a, o) => a.from - o.from || a.to - o.to);
    const r = [];
    for (const a of n) {
      const o = r[r.length - 1];
      o && a.from <= o.to ? o.to = Math.max(o.to, a.to) : r.push({
        ...a
      });
    }
    return r;
  }
  function Eu(e, t) {
    if (t.ranges.length <= 1) return Jr.empty;
    const n = t.ranges[t.mainIndex], r = [];
    for (let a = 0; a < t.ranges.length; a += 1) {
      const o = t.ranges[a];
      n && o.from === n.from && o.to === n.to || (o.from === o.to ? r.push(ea.widget(o.from, () => {
        const l = document.createElement("span");
        return l.className = "haim-multi-cursor", l.setAttribute("aria-hidden", "true"), l;
      }, {
        side: -1
      })) : r.push(ea.inline(o.from, o.to, {
        class: "haim-multi-selection"
      })));
    }
    return Jr.create(e, r);
  }
  function hr(e, t, n, r) {
    const a = t.map((m, g) => ({
      r: m,
      i: g
    })).sort((m, g) => g.r.from - m.r.from || g.r.to - m.r.to);
    let o = e.tr;
    const l = [];
    for (const { r: m, i: g } of a) o = o.insertText(n, m.from, m.to), l.push({
      i: g,
      from: m.from,
      to: m.from + n.length
    });
    l.sort((m, g) => m.from - g.from);
    const c = l.map((m) => ({
      from: m.from,
      to: m.to
    })), d = Math.max(0, l.findIndex((m) => m.i === r)), p = c[d] ?? c[0];
    if (p) try {
      o = o.setSelection(H.create(o.doc, p.from, p.to));
    } catch {
    }
    const f = {
      ranges: c,
      mainIndex: d >= 0 ? d : 0,
      query: xe(e).query,
      wholeWord: xe(e).wholeWord
    };
    return o.setMeta(_e, {
      type: Sr,
      state: f
    }), o.scrollIntoView(), o;
  }
  function Fa(e, t) {
    const n = xe(e.state);
    if (n.ranges.length <= 1) return false;
    if (n.ranges.some((o) => o.from !== o.to)) return e.dispatch(hr(e.state, n.ranges, "", n.mainIndex)), true;
    const a = [];
    for (const o of n.ranges) if (t === "backward") {
      if (o.from <= 1) {
        a.push(o);
        continue;
      }
      try {
        const l = e.state.doc.resolve(o.from), c = Math.max(l.start(), o.from - 1);
        a.push({
          from: c,
          to: o.from
        });
      } catch {
        a.push(o);
      }
    } else try {
      const l = e.state.doc.resolve(o.from), c = Math.min(l.end(), o.from + 1);
      a.push({
        from: o.from,
        to: c
      });
    } catch {
      a.push(o);
    }
    return e.dispatch(hr(e.state, a, "", n.mainIndex)), true;
  }
  function pr(e, t, n = true) {
    const r = t.ranges[t.mainIndex] ?? t.ranges[0];
    let a = e.tr;
    if (r) try {
      a = a.setSelection(H.create(a.doc, r.from, r.to));
    } catch {
    }
    return a.setMeta(_e, {
      type: Sr,
      state: t
    }), n && a.scrollIntoView(), a;
  }
  function Tu(e, t) {
    const n = xe(e), { selection: r } = e, a = {
      from: r.from,
      to: r.to
    };
    let o, l;
    if (n.ranges.length > 0 ? (o = n.ranges.map((x, y) => y === n.mainIndex ? a : {
      ...x
    }), l = n.mainIndex) : (o = [
      a
    ], l = 0), o.some((x) => x.from === x.to)) {
      const x = o.map((j) => j.from !== j.to ? j : To(e.doc, j.from) ?? j);
      if (x.every((j, A) => j.from === o[A].from && j.to === o[A].to)) return false;
      const y = tn(e.doc, x[0]);
      return t && t(pr(e, {
        ranges: x,
        mainIndex: l,
        query: y,
        wholeWord: true
      })), true;
    }
    const d = n.query ?? tn(e.doc, o[0]);
    if (!d || o.some((x) => tn(e.doc, x) !== d)) return false;
    const p = o[o.length - 1], f = ju(e.doc, d, p.to, o, n.wholeWord);
    if (!f) return false;
    const m = [
      ...o,
      f
    ], g = {
      ranges: m,
      mainIndex: m.length - 1,
      query: d,
      wholeWord: n.wholeWord
    };
    return t && t(pr(e, g)), true;
  }
  function Lu(e, t) {
    if (xe(e).ranges.length > 1) return false;
    const { selection: r } = e;
    if (r.empty) return false;
    const a = tn(e.doc, {
      from: r.from,
      to: r.to
    });
    if (!a) return false;
    const o = Lo(e.doc, a);
    if (o.length <= 1) return false;
    let l = o.findIndex((d) => d.from === r.from && d.to === r.to);
    return l < 0 && (l = 0), t && t(pr(e, {
      ranges: o,
      mainIndex: l,
      query: a,
      wholeWord: false
    })), true;
  }
  function Iu() {
    return new Oe({
      key: _e,
      state: {
        init: () => Pt,
        apply(e, t) {
          const n = e.getMeta(_e);
          if ((n == null ? void 0 : n.type) === fr) return Pt;
          if ((n == null ? void 0 : n.type) === Sr) return n.state;
          if (t.ranges.length === 0) return t;
          let r = t;
          if (e.docChanged) {
            const a = vu(t.ranges, e.mapping);
            if (a.length === 0) return Pt;
            const o = Math.min(t.mainIndex, a.length - 1);
            r = {
              ...t,
              ranges: a,
              mainIndex: o
            };
          }
          if (e.selectionSet) {
            const { from: a, to: o } = e.selection, l = r.ranges.findIndex((c) => c.from === a && c.to === o);
            return l >= 0 ? {
              ...r,
              mainIndex: l
            } : Pt;
          }
          return r;
        }
      },
      props: {
        decorations(e) {
          return Eu(e.doc, xe(e));
        },
        handleTextInput(e, t, n, r) {
          const a = xe(e.state);
          return a.ranges.length <= 1 ? false : (e.dispatch(hr(e.state, a.ranges, r, a.mainIndex)), true);
        },
        handleKeyDown(e, t) {
          return xe(e.state).ranges.length <= 1 ? false : t.key === "Backspace" ? (t.preventDefault(), Fa(e, "backward")) : t.key === "Delete" ? (t.preventDefault(), Fa(e, "forward")) : false;
        },
        handleClick(e) {
          return xe(e.state).ranges.length <= 1 || e.dispatch(e.state.tr.setMeta(_e, {
            type: fr
          })), false;
        }
      }
    });
  }
  const Nu = ze.create({
    name: "haimMultiCursor",
    priority: 1e3,
    addCommands() {
      return {
        selectNextOccurrence: () => ({ state: e, dispatch: t }) => Tu(e, t),
        selectAllOccurrences: () => ({ state: e, dispatch: t }) => Lu(e, t),
        clearMultiCursor: () => ({ tr: e, dispatch: t }) => (t && (e.setMeta(_e, {
          type: fr
        }), t(e)), true)
      };
    },
    addKeyboardShortcuts() {
      return {
        "Mod-d": ({ editor: e }) => e.commands.selectNextOccurrence(),
        "Mod-Shift-l": ({ editor: e }) => e.commands.selectAllOccurrences(),
        Escape: ({ editor: e }) => xe(e.state).ranges.length <= 1 ? false : e.commands.clearMultiCursor()
      };
    },
    addProseMirrorPlugins() {
      return [
        Iu()
      ];
    }
  }), Au = new Ie("haimSelectionInlineCode");
  function Pu(e) {
    const { $from: t, $to: n } = e.state.selection;
    return t.parent.type.name === "codeBlock" || n.parent.type.name === "codeBlock";
  }
  function $u(e, t, n) {
    return t.defaultPrevented || t.isComposing || !kl(t) || e.state.selection.empty || e.state.selection.$from.pos === e.state.selection.$to.pos || Pu(e) || !e.state.schema.marks.code ? false : n();
  }
  const Ru = ze.create({
    name: "haimSelectionInlineCode",
    priority: 1e3,
    addProseMirrorPlugins() {
      const e = this.editor;
      return [
        new Oe({
          key: Au,
          props: {
            handleKeyDown(t, n) {
              return $u(t, n, () => e.commands.toggleCode());
            }
          }
        })
      ];
    }
  }), Du = Ne.create({
    name: "mathBlock",
    group: "block",
    atom: true,
    code: true,
    addAttributes() {
      return {
        latex: {
          default: ""
        },
        display: {
          default: true
        }
      };
    },
    parseHTML() {
      return [
        {
          tag: "div[data-haim-math]",
          getAttrs: (e) => e instanceof HTMLElement ? {
            latex: e.getAttribute("data-latex") || e.textContent || "",
            display: e.getAttribute("data-display") !== "false"
          } : false
        }
      ];
    },
    renderHTML({ node: e, HTMLAttributes: t }) {
      return [
        "div",
        ke(t, {
          "data-haim-math": "1",
          "data-latex": String(e.attrs.latex || ""),
          "data-display": e.attrs.display ? "true" : "false",
          class: "haim-math-block"
        }),
        String(e.attrs.latex || "")
      ];
    },
    renderMarkdown: (e) => {
      var _a2, _b;
      const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.latex) || "").trim();
      return t ? ((_b = e.attrs) == null ? void 0 : _b.display) ? `$$
${t}
$$

` : `$${t}$

` : "";
    }
  });
  function Ka({ label: e, onClick: t, children: n }) {
    return i.jsxs(ln, {
      children: [
        i.jsx(cn, {
          asChild: true,
          children: i.jsx("button", {
            type: "button",
            className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft",
            "aria-label": e,
            onClick: (r) => {
              r.preventDefault(), r.stopPropagation(), t();
            },
            children: n
          })
        }),
        i.jsx(un, {
          children: i.jsxs(dn, {
            side: "top",
            sideOffset: 6,
            className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg",
            children: [
              e,
              i.jsx(fn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Io(e, t) {
    const [n, r] = h.useState(null), [a, o] = h.useState(false);
    return h.useEffect(() => {
      const l = String(e || "").trim();
      if (!l) {
        r(null), o(false);
        return;
      }
      try {
        const c = wl.renderToString(l, {
          throwOnError: false,
          displayMode: t,
          output: "html"
        });
        r(c), o(false);
      } catch {
        r(null), o(true);
      }
    }, [
      e,
      t
    ]), {
      html: n,
      error: a
    };
  }
  function Bu({ node: e, updateAttributes: t, editor: n, selected: r }) {
    const a = String(e.attrs.latex || ""), o = n.isEditable, [l, c] = h.useState(false), [d, p] = h.useState(a), f = h.useRef(null), { html: m, error: g } = Io(a, true);
    h.useEffect(() => {
      p(a);
    }, [
      a
    ]), h.useEffect(() => {
      var _a2;
      l && ((_a2 = f.current) == null ? void 0 : _a2.focus());
    }, [
      l
    ]);
    const x = () => {
      const k = d.trim();
      t({
        latex: k || a
      }), c(false);
    }, y = () => {
      p(a), c(false);
    };
    return l && o ? i.jsxs(be, {
      as: "div",
      className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`,
      "data-type": "block-math",
      contentEditable: false,
      children: [
        i.jsx("textarea", {
          ref: f,
          className: "haim-math-block__textarea",
          value: d,
          rows: Math.min(8, Math.max(2, d.split(`
`).length + 1)),
          onChange: (k) => p(k.target.value),
          onBlur: x,
          onKeyDown: (k) => {
            k.key === "Escape" && (k.preventDefault(), y()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), x()), k.stopPropagation();
          },
          spellCheck: false
        }),
        i.jsx(Rt, {
          delayDuration: 250,
          skipDelayDuration: 0,
          children: i.jsx("div", {
            className: "haim-math-block__toolbar",
            children: i.jsx(Ka, {
              label: "\uBBF8\uB9AC\uBCF4\uAE30",
              onClick: x,
              children: i.jsx(wr, {
                size: 14,
                "aria-hidden": true
              })
            })
          })
        })
      ]
    }) : i.jsxs(be, {
      as: "div",
      className: `haim-math-block${r ? " is-selected" : ""}${g ? " haim-math-block--error" : ""}`,
      "data-type": "block-math",
      "data-latex": a,
      contentEditable: false,
      onDoubleClick: () => {
        o && c(true);
      },
      children: [
        i.jsx(Rt, {
          delayDuration: 250,
          skipDelayDuration: 0,
          children: o ? i.jsx("div", {
            className: "haim-math-block__toolbar",
            children: i.jsx(Ka, {
              label: "\uC18C\uC2A4 \uD3B8\uC9D1",
              onClick: () => c(true),
              children: i.jsx(oo, {
                size: 14,
                "aria-hidden": true
              })
            })
          }) : null
        }),
        m ? i.jsx("div", {
          className: "haim-math-block__render",
          dangerouslySetInnerHTML: {
            __html: m
          }
        }) : i.jsx("div", {
          className: "haim-math-block__fallback",
          children: a || "\u2026"
        })
      ]
    });
  }
  function Hu({ node: e, updateAttributes: t, editor: n, selected: r }) {
    const a = String(e.attrs.latex || ""), o = n.isEditable, [l, c] = h.useState(false), [d, p] = h.useState(a), f = h.useRef(null), { html: m, error: g } = Io(a, false);
    h.useEffect(() => {
      p(a);
    }, [
      a
    ]), h.useEffect(() => {
      var _a2;
      l && ((_a2 = f.current) == null ? void 0 : _a2.focus());
    }, [
      l
    ]);
    const x = () => {
      const k = d.trim();
      t({
        latex: k || a
      }), c(false);
    }, y = () => {
      p(a), c(false);
    };
    return l && o ? i.jsx(be, {
      as: "span",
      className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`,
      "data-type": "inline-math",
      contentEditable: false,
      children: i.jsx("input", {
        ref: f,
        type: "text",
        className: "haim-math-inline__input",
        value: d,
        onChange: (k) => p(k.target.value),
        onBlur: x,
        onKeyDown: (k) => {
          k.key === "Enter" && (k.preventDefault(), x()), k.key === "Escape" && (k.preventDefault(), y()), k.stopPropagation();
        },
        spellCheck: false
      })
    }) : i.jsx(be, {
      as: "span",
      className: `haim-math-inline${r ? " is-selected" : ""}${g ? " haim-math-inline--error" : ""}`,
      "data-type": "inline-math",
      "data-latex": a,
      contentEditable: false,
      onDoubleClick: (k) => {
        k.preventDefault(), k.stopPropagation(), o && c(true);
      },
      children: m ? i.jsx("span", {
        dangerouslySetInnerHTML: {
          __html: m
        }
      }) : i.jsx("span", {
        className: "haim-math-inline__fallback",
        children: a || "?"
      })
    });
  }
  let _u, Ou, zu, No, Fu;
  _u = Ss.extend({
    addNodeView() {
      return st(Bu);
    }
  }).configure({
    katexOptions: {
      throwOnError: false,
      displayMode: true
    }
  });
  Ou = Ms.extend({
    addNodeView() {
      return st(Hu);
    }
  }).configure({
    katexOptions: {
      throwOnError: false,
      displayMode: false
    }
  });
  pn = {
    "(": ")",
    "[": "]",
    "{": "}",
    "'": "'",
    '"': '"',
    "`": "`"
  };
  zu = /* @__PURE__ */ new Set([
    "js",
    "javascript",
    "jsx",
    "mjs",
    "cjs",
    "ts",
    "typescript",
    "tsx"
  ]);
  No = new Set(Object.values(pn));
  Fu = new Ie("haimCodeBlockBracketPairs");
  function ot(e, t) {
    return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
  }
  function mr(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
  }
  gr = function(e) {
    return zu.has(String(e || "").trim().toLowerCase());
  };
  function Ao(e) {
    const { $from: t, $to: n } = e.selection;
    return t.parent.type.name !== "codeBlock" || n.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === n.before(n.depth);
  }
  Ku = function(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
    const { key: t, code: n } = e;
    return t === "`" || n === "Backquote" && !e.shiftKey ? "`" : t in pn || No.has(t) ? t : n === "Quote" ? e.shiftKey ? '"' : "'" : null;
  };
  function Wa(e) {
    return e ? /[\w$]/.test(e) : false;
  }
  function Wu(e, t) {
    const { from: n } = e.selection, r = ot(e, n - 1), a = ot(e, n);
    return !(Wa(r) || Wa(a) || a === t);
  }
  function qu(e, t) {
    if (!Ao(e) || t === "`" && !gr(mr(e))) return null;
    const { selection: n } = e, { from: r, to: a, empty: o } = n, l = pn[t];
    if (l !== void 0) {
      if (!o) {
        const d = e.doc.textBetween(r, a), p = e.tr.insertText(`${t}${d}${l}`, r, a);
        return p.setSelection(H.create(p.doc, r + t.length, r + t.length + d.length)), p;
      }
      if ((t === "'" || t === '"' || t === "`") && !Wu(e, t)) return ot(e, r) === t ? e.tr.setSelection(H.create(e.doc, r + 1)) : null;
      const c = e.tr.insertText(`${t}${l}`, r, a);
      return c.setSelection(H.create(c.doc, r + t.length)), c;
    }
    return No.has(t) && o && ot(e, r) === t ? t === "`" && !gr(mr(e)) ? null : e.tr.setSelection(H.create(e.doc, r + 1)) : null;
  }
  function Uu(e) {
    if (!Ao(e)) return null;
    const { selection: t } = e;
    if (!t.empty) return null;
    const { from: n } = t, r = ot(e, n - 1), a = ot(e, n), o = pn[r];
    return !o || a !== o || r === "`" && !gr(mr(e)) ? null : e.tr.delete(n - 1, n + 1);
  }
  function Vu(e, t) {
    if (t.defaultPrevented) return false;
    if (t.key === "Backspace") {
      if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
      const a = Uu(e.state);
      return a ? (e.dispatch(a), true) : false;
    }
    const n = Ku(t);
    if (!n) return false;
    const r = qu(e.state, n);
    return r ? (e.dispatch(r), true) : false;
  }
  function Xu() {
    return new Oe({
      key: Fu,
      props: {
        handleKeyDown(e, t) {
          return Vu(e, t);
        }
      }
    });
  }
  function Qu(e) {
    var _a2;
    return ((_a2 = String(e ?? "").match(/^[ \t]*/)) == null ? void 0 : _a2[0]) ?? "";
  }
  function sn(e) {
    return /^[ \t]*$/.test(String(e ?? ""));
  }
  function Po(e) {
    const t = String(e ?? "").split(`
`);
    return t.length < 2 ? false : sn(t[t.length - 1]) && sn(t[t.length - 2]);
  }
  function mn(e) {
    const t = String(e ?? "").split(`
`);
    let n = 0, r = t.length;
    for (; n < r && sn(t[n]); ) n += 1;
    for (; r > n && sn(t[r - 1]); ) r -= 1;
    return t.slice(n, r).join(`
`);
  }
  Yu = function(e, t) {
    const n = String(e ?? ""), r = Math.max(0, Math.min(t, n.length)), a = n.lastIndexOf(`
`, r - 1) + 1, o = n.indexOf(`
`, r), l = n.slice(a, o === -1 ? n.length : o);
    return Qu(l);
  };
  function gn(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function Gu(e) {
    if (!gn(e)) return null;
    const { $from: t, from: n, to: r } = e.selection, a = t.parent.textContent, l = `
${Yu(a, t.parentOffset)}`, c = e.tr.insertText(l, n, r);
    return c.setSelection(H.create(c.doc, n + l.length)), c;
  }
  function Zu(e) {
    if (!gn(e)) return null;
    const { $from: t } = e.selection, n = t.parent.textContent, r = t.parentOffset, a = n.lastIndexOf(`
`, r - 1) + 1, o = t.start() + a, l = e.tr.insertText(`
`, o);
    return l.setSelection(H.create(l.doc, o)), l;
  }
  function Ju(e) {
    if (!gn(e)) return null;
    const { $from: t, empty: n } = e.selection;
    if (!n || !(t.parentOffset === t.parent.nodeSize - 2)) return null;
    const a = t.parent.textContent;
    if (!Po(a)) return null;
    const o = mn(a), l = t.start(), c = t.end(), d = e.tr.insertText(o, l, c);
    return d.setSelection(H.create(d.doc, l + o.length)), d;
  }
  function ed(e, t) {
    const { $from: n, empty: r } = t.selection;
    if (!r || n.parent.type.name !== "codeBlock" || n.parentOffset !== n.parent.nodeSize - 2) return false;
    const a = n.parent.textContent;
    if (!Po(a)) return false;
    const o = mn(a), l = n.start(), c = n.end();
    return e.insertText(o, l, c), e.setSelection(H.create(e.doc, l + o.length)), true;
  }
  function td(e) {
    const { state: t } = e;
    if (!gn(t)) return false;
    if (Ju(t)) return e.chain().command(({ tr: r, state: a }) => ed(r, a)).exitCode().run();
    const n = Gu(t);
    return n ? (e.view.dispatch(n), true) : false;
  }
  function nd(e) {
    const t = Zu(e.state);
    return t ? (e.view.dispatch(t), true) : false;
  }
  const rd = new Ie("haimCodeBlockIndent");
  function ad(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
  }
  function Mr(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function jr(e, t, n) {
    const r = e.doc.resolve(t);
    if (r.parent.type.name !== "codeBlock") return [];
    const a = r.start(), o = r.end(), c = e.doc.textBetween(a, o, `
`, `
`).split(`
`), d = [];
    let p = a;
    for (let f = 0; f < c.length; f += 1) {
      const m = c[f] ?? "", g = f < c.length - 1 ? p + m.length + 1 : o;
      t < g && n > p && d.push(p), p = g;
    }
    return d;
  }
  function qa(e, t) {
    var _a2;
    const n = ((_a2 = e.match(/^ */)) == null ? void 0 : _a2[0]) ?? "";
    return Math.min(n.length, t);
  }
  function od(e, t) {
    if (!Mr(e)) return null;
    const n = Math.max(1, Math.round(t)), r = " ".repeat(n), { selection: a } = e, { from: o, to: l, empty: c } = a;
    if (c) {
      const g = e.tr.insertText(r, o);
      return g.setSelection(H.create(g.doc, o + r.length)), g;
    }
    const d = jr(e, o, l);
    if (d.length === 0) return null;
    const p = e.tr;
    for (let g = d.length - 1; g >= 0; g -= 1) p.insertText(r, d[g]);
    const f = d[0], m = p.mapping.map(l);
    return p.setSelection(H.create(p.doc, f, m)), p;
  }
  function sd(e, t) {
    var _a2;
    if (!Mr(e)) return null;
    const n = Math.max(1, Math.round(t)), { selection: r, doc: a } = e, { $from: o, empty: l } = r;
    if (l) {
      const M = o.start(), E = o.end(), I = a.textBetween(M, E, `
`, `
`).split(`
`), B = o.pos - M;
      let G = 0, le = 0;
      for (let R = 0; R < I.length; R += 1) {
        const K = I[R] ?? "";
        if (le + K.length >= B) {
          G = R;
          break;
        }
        le += K.length + 1, R === I.length - 1 && (G = R);
      }
      const it = I[G] ?? "", oe = qa(it, n);
      if (oe === 0) return e.tr;
      let T = M;
      for (let R = 0; R < G; R += 1) T += (((_a2 = I[R]) == null ? void 0 : _a2.length) ?? 0) + 1;
      const L = e.tr.delete(T, T + oe);
      return o.pos - T <= oe ? L.setSelection(H.create(L.doc, T)) : L.setSelection(H.create(L.doc, o.pos - oe)), L;
    }
    const { from: c, to: d } = r, p = jr(e, c, d);
    if (p.length === 0) return null;
    const f = o.start(), m = o.end(), x = a.textBetween(f, m, `
`, `
`).split(`
`), y = /* @__PURE__ */ new Map();
    {
      let M = f;
      for (let E = 0; E < x.length; E += 1) {
        const D = x[E] ?? "";
        y.set(M, D), M += D.length + (E < x.length - 1 ? 1 : 0);
      }
    }
    const k = e.tr;
    let j = 0, A = 0;
    for (let M = p.length - 1; M >= 0; M -= 1) {
      const E = p[M], D = y.get(E) ?? "", I = qa(D, n);
      I !== 0 && (k.delete(E, E + I), A += I, E < c && (j += I));
    }
    if (A === 0) return k;
    const O = Math.max(p[0], c - j), N = k.mapping.map(d);
    return k.setSelection(H.create(k.doc, O, Math.max(O, N))), k;
  }
  function id(e, t) {
    if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !Mr(e.state)) return false;
    const n = ad(e.state), r = yl(n, Cl()), a = t.shiftKey ? sd(e.state, r) : od(e.state, r);
    return a ? (e.dispatch(a), true) : false;
  }
  function ld() {
    return new Oe({
      key: rd,
      props: {
        handleKeyDown(e, t) {
          return id(e, t);
        }
      }
    });
  }
  function cd(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function ud(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
  }
  function dd(e, t) {
    const r = e.doc.resolve(t).end(), a = e.doc.textBetween(t, r, `
`, `
`), o = a.indexOf(`
`);
    return o < 0 ? a : a.slice(0, o);
  }
  function fd(e) {
    const { from: t, to: n, empty: r } = e.selection, a = e.selection.$from;
    if (a.parent.type.name !== "codeBlock") return [];
    if (r) {
      const l = a.start(), c = a.end(), p = e.doc.textBetween(l, c, `
`, `
`).split(`
`), f = a.pos - l;
      let m = l, g = 0;
      for (let x = 0; x < p.length; x += 1) {
        const y = p[x] ?? "";
        if (g + y.length >= f || x === p.length - 1) return [
          {
            from: m,
            text: y
          }
        ];
        g += y.length + 1, m += y.length + 1;
      }
      return [];
    }
    return jr(e, t, n).map((l) => ({
      from: l,
      text: dd(e, l)
    }));
  }
  function hd(e) {
    return e.map((t) => {
      var _a2;
      const n = ((_a2 = /^\s*/.exec(t.text)) == null ? void 0 : _a2[0].length) ?? 0, r = t.from + n, a = t.from + t.text.length;
      return {
        from: r,
        to: a,
        content: t.text.slice(n)
      };
    });
  }
  function pd(e, t) {
    const n = e.tr, r = vl(t);
    for (const c of r) c.to != null && c.to !== c.from ? n.insertText(c.insert, c.from, c.to) : n.insertText(c.insert, c.from);
    const { from: a, to: o, empty: l } = e.selection;
    if (l) {
      const c = n.mapping.map(a, 1);
      n.setSelection(H.create(n.doc, c));
    } else {
      const c = n.mapping.map(a, -1), d = n.mapping.map(o, 1);
      n.setSelection(H.create(n.doc, c, Math.max(c, d)));
    }
    return n;
  }
  function md(e) {
    if (!cd(e)) return null;
    const t = fd(e);
    if (t.length === 0) return null;
    const n = Sl(ud(e));
    let r = null;
    return n.line ? r = Ml(t, n.line) : n.block && (r = jl(hd(t), n.block.open, n.block.close)), !r || r.length === 0 ? null : pd(e, r);
  }
  function gd(e) {
    const t = md(e.state);
    return t ? (e.view.dispatch(t), true) : false;
  }
  function Ua(e) {
    return String(e || "").trim().toLowerCase() === "mermaid";
  }
  function xd(e) {
    var _a2;
    return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
  }
  const $o = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", bd = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", kd = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
  function xr({ label: e, onClick: t, active: n = false, expanded: r, children: a }) {
    return i.jsxs(ln, {
      children: [
        i.jsx(cn, {
          asChild: true,
          children: i.jsx("button", {
            type: "button",
            className: `haim-code-block__action${n ? " is-copy-success" : ""}`,
            "aria-label": e,
            ...r !== void 0 ? {
              "aria-expanded": r
            } : {},
            onClick: t,
            children: a
          })
        }),
        i.jsx(un, {
          children: i.jsxs(dn, {
            side: "bottom",
            sideOffset: 6,
            className: $o,
            children: [
              e,
              i.jsx(fn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function wd({ language: e, onChange: t }) {
    const n = h.useId(), r = h.useRef(null), [a, o] = h.useState(false), [l, c] = h.useState(""), [d, p] = h.useState(0), f = El(e), m = Tl(e), g = Ll(e), x = Il(f, l), y = l.trim(), k = y.toLowerCase() === "plain" ? Nl : y, A = !!y && !x.some((M) => M.value.toLowerCase() === k.toLowerCase() || M.label.toLowerCase() === y.toLowerCase()) ? [
      {
        value: k,
        label: y,
        custom: true
      },
      ...x.map((M) => ({
        ...M,
        custom: false
      }))
    ] : x.map((M) => ({
      ...M,
      custom: false
    }));
    h.useEffect(() => {
      if (!a) return;
      c(""), p(0);
      const M = window.setTimeout(() => {
        var _a2;
        return (_a2 = r.current) == null ? void 0 : _a2.focus();
      }, 0);
      return () => window.clearTimeout(M);
    }, [
      a
    ]), h.useEffect(() => {
      p(0);
    }, [
      l
    ]);
    const O = h.useCallback((M) => {
      t(Al(M)), o(false);
    }, [
      t
    ]), N = (M) => {
      if (M.key === "ArrowDown") {
        if (M.preventDefault(), !A.length) return;
        p((E) => (E + 1) % A.length);
        return;
      }
      if (M.key === "ArrowUp") {
        if (M.preventDefault(), !A.length) return;
        p((E) => (E - 1 + A.length) % A.length);
        return;
      }
      if (M.key === "Enter") {
        M.preventDefault();
        const E = A[d] ?? A[0];
        E ? O(E.value) : y && O(k);
        return;
      }
      M.key === "Escape" && (M.preventDefault(), o(false));
    };
    return i.jsxs(ll, {
      open: a,
      onOpenChange: o,
      children: [
        i.jsxs(ln, {
          children: [
            i.jsx(cn, {
              asChild: true,
              children: i.jsx(cl, {
                asChild: true,
                children: i.jsxs("button", {
                  type: "button",
                  className: "haim-code-block__lang-trigger",
                  "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4",
                  "aria-haspopup": "listbox",
                  "aria-expanded": a,
                  onPointerDown: (M) => M.stopPropagation(),
                  children: [
                    i.jsx("span", {
                      className: "haim-code-block__lang-label",
                      children: g
                    }),
                    i.jsx("span", {
                      className: "haim-code-block__lang-chevron",
                      children: i.jsx(io, {
                        size: 12,
                        "aria-hidden": true
                      })
                    })
                  ]
                })
              })
            }),
            i.jsx(un, {
              children: i.jsxs(dn, {
                side: "bottom",
                sideOffset: 6,
                className: $o,
                children: [
                  "\uC5B8\uC5B4 \uAC80\uC0C9",
                  i.jsx(fn, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        }),
        i.jsx(ul, {
          children: i.jsxs(dl, {
            className: bd,
            side: "bottom",
            align: "start",
            sideOffset: 4,
            onOpenAutoFocus: (M) => M.preventDefault(),
            onCloseAutoFocus: (M) => M.preventDefault(),
            onPointerDown: (M) => M.stopPropagation(),
            children: [
              i.jsxs("div", {
                className: "flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong",
                children: [
                  i.jsx(ao, {
                    size: 12,
                    className: "shrink-0 text-gray-400",
                    "aria-hidden": true
                  }),
                  i.jsx("input", {
                    ref: r,
                    type: "text",
                    value: l,
                    onChange: (M) => c(M.target.value),
                    onKeyDown: N,
                    placeholder: "\uC5B8\uC5B4 \uAC80\uC0C9\u2026",
                    "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4 \uAC80\uC0C9",
                    "aria-controls": n,
                    "aria-autocomplete": "list",
                    autoComplete: "off",
                    spellCheck: false,
                    className: "min-w-0 flex-1 bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-odp-fg"
                  })
                ]
              }),
              i.jsx("ul", {
                id: n,
                role: "listbox",
                "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4",
                className: "max-h-56 overflow-y-auto p-1",
                children: A.length === 0 ? i.jsx("li", {
                  className: "cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uC77C\uCE58\uD558\uB294 \uC5B8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
                }) : A.map((M, E) => {
                  const D = M.value === m, I = E === d;
                  return i.jsx("li", {
                    role: "presentation",
                    children: i.jsxs("button", {
                      type: "button",
                      role: "option",
                      "aria-selected": D,
                      "data-highlighted": I ? "true" : "false",
                      className: kd,
                      onMouseEnter: () => p(E),
                      onMouseDown: (B) => B.preventDefault(),
                      onClick: () => O(M.value),
                      children: [
                        D ? i.jsx("span", {
                          className: "absolute left-1.5 inline-flex items-center",
                          children: i.jsx(so, {
                            size: 12,
                            "aria-hidden": true
                          })
                        }) : null,
                        M.custom ? i.jsxs("span", {
                          children: [
                            "\uC0AC\uC6A9: ",
                            i.jsx("span", {
                              className: "font-mono",
                              children: M.label
                            })
                          ]
                        }) : M.label
                      ]
                    })
                  }, `${M.custom ? "custom:" : ""}${M.value}`);
                })
              })
            ]
          })
        })
      ]
    });
  }
  function yd({ language: e, collapsed: t, copied: n, editable: r, onCopy: a, onToggleCollapse: o, onLanguageChange: l, extra: c }) {
    return i.jsxs("div", {
      className: "haim-code-block__header",
      children: [
        r && l ? i.jsx(wd, {
          language: e,
          onChange: l
        }) : i.jsx("span", {
          className: "haim-code-block__lang",
          children: e || "plain"
        }),
        i.jsxs("div", {
          className: "haim-code-block__actions",
          children: [
            c,
            i.jsx(xr, {
              label: n ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC",
              active: n,
              onClick: a,
              children: n ? i.jsx(so, {
                size: 14,
                "aria-hidden": true
              }) : i.jsx(rr, {
                size: 14,
                "aria-hidden": true
              })
            }),
            i.jsx(xr, {
              label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30",
              expanded: !t,
              onClick: o,
              children: t ? i.jsx(io, {
                size: 14,
                "aria-hidden": true
              }) : i.jsx(tl, {
                size: 14,
                "aria-hidden": true
              })
            })
          ]
        })
      ]
    });
  }
  function Cd({ node: e, editor: t, selected: n, updateAttributes: r }) {
    const a = String(e.attrs.language || ""), o = Ua(a), l = e.textContent || "", [c, d] = h.useState(null), [p, f] = h.useState(false), [m, g] = h.useState(false), [x, y] = h.useState(false), [k, j] = h.useState(false), A = t.isEditable, O = h.useRef(null);
    h.useEffect(() => {
      var _a2;
      if (!o || m || x) return;
      let I = false;
      const B = xd(((_a2 = t.view) == null ? void 0 : _a2.dom) ?? null);
      return Pl(l, B).then((G) => {
        I || (G ? (d(G), f(false)) : (d(null), f(!!l.trim())));
      }), () => {
        I = true;
      };
    }, [
      o,
      m,
      x,
      l,
      t
    ]);
    const N = h.useCallback(() => {
      var _a2;
      const I = l, B = () => {
        j(true), window.setTimeout(() => j(false), 1500);
      };
      if (typeof navigator < "u" && ((_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText)) {
        navigator.clipboard.writeText(I).then(B).catch(() => {
          try {
            const G = document.createElement("textarea");
            G.value = I, document.body.appendChild(G), G.select(), document.execCommand("copy"), G.remove(), B();
          } catch {
          }
        });
        return;
      }
      B();
    }, [
      l
    ]), M = h.useCallback((I) => {
      r({
        language: I
      }), Ua(I) || (g(false), d(null), f(false));
    }, [
      r
    ]), E = i.jsx("pre", {
      className: "haim-mermaid-block__source-hidden",
      "aria-hidden": true,
      children: i.jsx(ta, {
        as: "code"
      })
    }), D = i.jsx(yd, {
      language: a,
      collapsed: x,
      copied: k,
      editable: A,
      onCopy: N,
      onToggleCollapse: () => y((I) => !I),
      ...A ? {
        onLanguageChange: M
      } : {},
      extra: o && A && !x ? i.jsx(xr, {
        label: m || p ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1",
        onClick: () => g((I) => !I),
        children: m || p ? i.jsx(wr, {
          size: 14,
          "aria-hidden": true
        }) : i.jsx(oo, {
          size: 14,
          "aria-hidden": true
        })
      }) : null
    });
    return o && !m && c && !x ? i.jsxs(be, {
      as: "div",
      className: `haim-code-block haim-mermaid-block${n ? " is-selected" : ""}`,
      "data-language": "mermaid",
      children: [
        i.jsx(Rt, {
          delayDuration: 250,
          skipDelayDuration: 0,
          children: D
        }),
        i.jsx("div", {
          className: "haim-mermaid-block__chart",
          dangerouslySetInnerHTML: {
            __html: c
          },
          onDoubleClick: () => {
            A && g(true);
          }
        }),
        E
      ]
    }) : i.jsxs(be, {
      as: "div",
      className: `haim-code-block${o ? " haim-code-block--mermaid-edit" : ""}${n ? " is-selected" : ""}${x ? " is-collapsed" : ""}`,
      "data-language": a || void 0,
      children: [
        i.jsx(Rt, {
          delayDuration: 250,
          skipDelayDuration: 0,
          children: D
        }),
        x ? E : i.jsxs(i.Fragment, {
          children: [
            o && p ? i.jsx("div", {
              className: "haim-mermaid-block__error",
              children: "Mermaid \uB80C\uB354 \uC2E4\uD328"
            }) : null,
            i.jsxs("div", {
              className: "haim-code-block__body",
              children: [
                i.jsx(vo, {
                  text: l,
                  className: "haim-code-block__line-numbers",
                  contentRootRef: O
                }),
                i.jsx("pre", {
                  ref: O,
                  className: a ? `language-${a}` : void 0,
                  children: i.jsx(ta, {
                    as: "code",
                    ...a ? {
                      className: `language-${a}`
                    } : {}
                  })
                })
              ]
            })
          ]
        })
      ]
    });
  }
  wf = function(e, t) {
    const { state: n } = e;
    n.selection;
    let r = n.tr, a = false;
    return n.doc.descendants((o, l) => {
      if (o.type.name !== "codeBlock") return;
      const c = o.textContent, d = mn(c);
      if (d === c) return;
      const p = l + 1, f = l + o.nodeSize - 1;
      r = r.insertText(d, r.mapping.map(p), r.mapping.map(f)), a = true;
    }), a ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
  };
  const Sd = new Ie("haimTrimCodeEdges");
  function Md() {
    return new Oe({
      key: Sd,
      appendTransaction(e, t, n) {
        if (!e.some((j) => j.selectionSet || j.docChanged) || e.some((j) => j.getMeta("haimTrimCodeEdges"))) return null;
        const r = t.selection.$from, a = n.selection.$from, o = r.parent.type.name === "codeBlock", l = a.parent.type.name === "codeBlock";
        if (!o || l) return null;
        const c = r.depth, d = r.node(c), p = r.before(c);
        if (d.type.name !== "codeBlock") return null;
        const f = d.textContent, m = mn(f);
        if (m === f) return null;
        const g = p + 1, x = p + d.nodeSize - 1;
        let y = g, k = x;
        for (const j of e) y = j.mapping.map(y), k = j.mapping.map(k);
        return n.tr.insertText(m, y, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
      }
    });
  }
  const jd = $l(Rl), vd = js.extend({
    priority: 1e3,
    addNodeView() {
      return st(Cd);
    },
    addKeyboardShortcuts() {
      var _a2;
      return {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {},
        Enter: ({ editor: t }) => td(t),
        "Shift-Enter": ({ editor: t }) => nd(t),
        "Mod-/": ({ editor: t }) => gd(t)
      };
    },
    addProseMirrorPlugins() {
      var _a2;
      return [
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [],
        Md(),
        Xu(),
        ld()
      ];
    }
  }).configure({
    lowlight: jd,
    languageClassPrefix: "language-",
    enableTabIndentation: false,
    exitOnTripleEnter: false
  }), Jn = "&nbsp;", er = "\xA0", Ed = vs.extend({
    parseMarkdown: (e, t) => {
      var _a2;
      const n = Array.isArray(e == null ? void 0 : e.tokens) ? e.tokens : [], r = t.parseInline(n), a = n.length === 1 ? n[0] : null;
      return (a == null ? void 0 : a.type) === "text" && (a.raw === Jn || a.text === Jn || a.raw === er || a.text === er) && r.length === 1 && ((_a2 = r[0]) == null ? void 0 : _a2.type) === "text" && (r[0].text === Jn || r[0].text === er) ? t.createNode("paragraph", void 0, []) : t.createNode("paragraph", void 0, r);
    },
    renderMarkdown: (e, t) => {
      if (!e) return "";
      const n = Array.isArray(e.content) ? e.content : [];
      return n.length === 0 ? "" : t.renderChildren(n);
    }
  }), Td = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
  yf = function(e) {
    const t = typeof e == "string" ? e : "", n = Td.exec(t);
    if (!n) return {
      prefix: "",
      body: t
    };
    const r = n[1] ?? "";
    return {
      prefix: r,
      body: t.slice(r.length)
    };
  };
  Ld = function(e, t) {
    return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
  };
  const Id = 3;
  function nn(e) {
    let t = 0;
    for (let n = 0; n < e.length; n += 1) e.charCodeAt(n) === 10 && (t += 1);
    return t;
  }
  function Ro(e) {
    const t = [
      0
    ];
    for (let n = 0; n < e.length; n += 1) e.charCodeAt(n) === 10 && t.push(n + 1);
    return (n) => {
      const r = Math.min(Math.max(0, n), e.length);
      let a = 0, o = t.length - 1;
      for (; a < o; ) {
        const l = a + o + 1 >> 1;
        (t[l] ?? 0) <= r ? a = l : o = l - 1;
      }
      return a;
    };
  }
  function Nd(e, t) {
    return Ro(e)(t);
  }
  function Ad(e) {
    if (!e) return 0;
    const t = "\0", n = Ld(e, t), r = n.indexOf(t);
    return r < 0 ? 0 : Nd(n, r);
  }
  function rn(e, t) {
    try {
      return e({
        type: "doc",
        content: [
          t.toJSON()
        ]
      }).replace(/\n+$/, "");
    } catch {
      return t.textContent || "";
    }
  }
  function Pd(e, t, n) {
    var _a2, _b;
    if (!t || !n || n.length === 0 || t.childCount !== e.childCount || n.length !== e.childCount) return false;
    for (let a = 0; a < e.childCount; a += 1) if (((_a2 = e.child(a)) == null ? void 0 : _a2.type.name) !== ((_b = t.child(a)) == null ? void 0 : _b.type.name)) return false;
    let r = 0;
    for (let a = 0; a < e.childCount; a += 1) if (e.child(a) !== t.child(a) && (r += 1, r > Id)) return false;
    return true;
  }
  function $d(e, t, n, r) {
    const a = [];
    let o = 0, l = 0;
    return e.forEach((c, d) => {
      const p = t.child(l), f = n[l], m = d + c.nodeSize;
      if (!f || !p) {
        const k = rn(r, c), j = nn(k);
        a.push({
          pos: d,
          to: m,
          line0: (f == null ? void 0 : f.line0) ?? 0,
          blockNewlines: j
        }), l += 1;
        return;
      }
      if (c.type.name === "noteCover") {
        a.push({
          pos: d,
          to: m,
          line0: 0,
          blockNewlines: 0
        }), l += 1;
        return;
      }
      if (c === p) {
        a.push({
          pos: d,
          to: m,
          line0: f.line0 + o,
          blockNewlines: f.blockNewlines
        }), l += 1;
        return;
      }
      const g = rn(r, c), x = nn(g), y = typeof f.blockNewlines == "number" ? f.blockNewlines : nn(rn(r, p));
      a.push({
        pos: d,
        to: m,
        line0: f.line0 + o,
        blockNewlines: x
      }), o += x - y, l += 1;
    }), a;
  }
  function Rd(e, t, n) {
    const r = Ad(n);
    let a = "";
    try {
      a = t(e.toJSON());
    } catch {
      a = "";
    }
    const o = Ro(a), l = [];
    let c = 0;
    return e.forEach((d, p) => {
      const f = p + d.nodeSize;
      if (d.type.name === "noteCover") {
        l.push({
          pos: p,
          to: f,
          line0: 0,
          blockNewlines: 0
        });
        return;
      }
      const m = rn(t, d), g = nn(m);
      let x = -1;
      if (m.length > 0 && a && (x = a.indexOf(m, c), x < 0)) {
        let k = c;
        for (; k < a.length && a.charCodeAt(k) === 10; ) k += 1;
        x = a.indexOf(m, k);
      }
      let y;
      if (x >= 0) y = r + o(x), c = x + Math.max(m.length, 1);
      else {
        for (; c < a.length && a.charCodeAt(c) === 10; ) c += 1;
        y = r + o(c), c = Math.min(a.length, c + Math.max(m.length, m ? 0 : 1));
      }
      l.push({
        pos: p,
        to: f,
        line0: y,
        blockNewlines: g
      });
    }), l;
  }
  function Dd(e, t, n, r, a) {
    return Pd(e, r, a) && r && a ? $d(e, r, a, t) : Rd(e, t, n);
  }
  function Bd(e) {
    return !e.enabled || !e.docChanged ? false : e.tipTapFocused;
  }
  const Hd = 120;
  function _d(e) {
    var _a2;
    const n = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
    return !n || typeof n.serialize != "function" ? null : (r) => n.serialize(r);
  }
  function $t(e) {
    e.pendingTimer != null && (clearTimeout(e.pendingTimer), e.pendingTimer = null);
  }
  function Od(e, t) {
    $t(t), t.pendingTimer = setTimeout(() => {
      if (t.pendingTimer = null, !e.isDestroyed) try {
        e.commands.updateDecorations("haimSourceLine");
      } catch {
      }
    }, Hd);
  }
  function Va(e) {
    return e.map((t) => Es.Node(t.pos, t.to, {
      "data-line": String(t.line0)
    }));
  }
  const zd = ze.create({
    name: "haimSourceLine",
    addOptions() {
      return {
        getMetaPrefix: () => "",
        isEnabled: () => true
      };
    },
    addStorage() {
      return {
        lastDoc: null,
        lastEntries: [],
        pendingTimer: null
      };
    },
    onDestroy() {
      $t(this.storage);
    },
    addDecorations() {
      const e = this.options.getMetaPrefix ?? (() => ""), t = this.options.isEnabled ?? (() => true), n = this.storage;
      return {
        update: "document",
        shouldUpdate: ({ editor: r, tr: a }) => {
          var _a2, _b;
          const o = t();
          return o ? Bd({
            enabled: o,
            docChanged: a.docChanged,
            tipTapFocused: !!((_b = (_a2 = r.view) == null ? void 0 : _a2.hasFocus) == null ? void 0 : _b.call(_a2))
          }) ? (Od(r, n), false) : (a.docChanged && $t(n), a.docChanged) : ($t(n), true);
        },
        create: ({ editor: r, state: a }) => {
          if (!t()) return $t(n), n.lastDoc = null, n.lastEntries = [], [];
          const o = _d(r);
          if (!o) return [];
          if (n.lastDoc === a.doc && n.lastEntries.length > 0) return Va(n.lastEntries);
          const l = e() || "", c = Dd(a.doc, o, l, n.lastDoc, n.lastEntries);
          return n.lastDoc = a.doc, n.lastEntries = c, Va(c);
        }
      };
    }
  });
  function Fd(e, t, n) {
    return new tr({
      find: e,
      handler: ({ state: r, range: a, match: o }) => {
        if (!n()) return null;
        let l = t, c = a.from;
        const d = a.to;
        if (o[1]) {
          const p = o[0].lastIndexOf(o[1]);
          l += o[0].slice(p + o[1].length), c += p;
          const f = c - d;
          f > 0 && (l = o[0].slice(p - f, p) + l, c = d);
        }
        r.tr.insertText(l, c, d);
      }
    });
  }
  const Kd = [
    {
      find: /--$/,
      replace: "\u2014",
      ruleId: "emDash"
    },
    {
      find: /\.\.\.$/,
      replace: "\u2026",
      ruleId: "ellipsis"
    },
    {
      find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/,
      replace: "\u201C",
      ruleId: "doubleQuotes"
    },
    {
      find: /"$/,
      replace: "\u201D",
      ruleId: "doubleQuotes"
    },
    {
      find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/,
      replace: "\u2018",
      ruleId: "singleQuotes"
    },
    {
      find: /'$/,
      replace: "\u2019",
      ruleId: "singleQuotes"
    },
    {
      find: /<-$/,
      replace: "\u2190",
      ruleId: "leftArrow"
    },
    {
      find: /->$/,
      replace: "\u2192",
      ruleId: "rightArrow"
    },
    {
      find: /\(c\)$/,
      replace: "\xA9",
      ruleId: "copyright"
    },
    {
      find: /\(tm\)$/,
      replace: "\u2122",
      ruleId: "trademark"
    },
    {
      find: /\(sm\)$/,
      replace: "\u2120",
      ruleId: "servicemark"
    },
    {
      find: /\(r\)$/,
      replace: "\xAE",
      ruleId: "registeredTrademark"
    },
    {
      find: /(?:^|\s)(1\/2)\s$/,
      replace: "\xBD",
      ruleId: "oneHalf"
    },
    {
      find: /(?:^|\s)(1\/4)\s$/,
      replace: "\xBC",
      ruleId: "oneQuarter"
    },
    {
      find: /(?:^|\s)(3\/4)\s$/,
      replace: "\xBE",
      ruleId: "threeQuarters"
    },
    {
      find: /\+\/-$/,
      replace: "\xB1",
      ruleId: "plusMinus"
    },
    {
      find: /!=$/,
      replace: "\u2260",
      ruleId: "notEqual"
    },
    {
      find: /\d+\s?([*x])\s?\d+$/,
      replace: "\xD7",
      ruleId: "multiplication"
    },
    {
      find: /<<$/,
      replace: "\xAB",
      ruleId: "laquo"
    },
    {
      find: />>$/,
      replace: "\xBB",
      ruleId: "raquo"
    },
    {
      find: /\^2$/,
      replace: "\xB2",
      ruleId: "superscriptTwo"
    },
    {
      find: /\^3$/,
      replace: "\xB3",
      ruleId: "superscriptThree"
    }
  ], Wd = ze.create({
    name: "haimTypography",
    addOptions() {
      return {
        initialRules: {
          ...eo
        }
      };
    },
    addStorage() {
      return {
        rules: {
          ...this.options.initialRules
        }
      };
    },
    addCommands() {
      return {
        setHaimTypographyRules: (e) => () => (this.storage.rules = {
          ...e
        }, true)
      };
    },
    addInputRules() {
      return Kd.map(({ find: e, replace: t, ruleId: n }) => Fd(e, t, () => !!this.storage.rules[n]));
    }
  });
  Cf = function(e) {
    const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", a = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), o = (e == null ? void 0 : e.isSourceLineEnabled) ?? (() => true), l = (e == null ? void 0 : e.typographyRules) ?? eo, d = [
      r ? na.configure({
        heading: {
          levels: [
            1,
            2,
            3,
            4,
            5,
            6
          ]
        },
        paragraph: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        listKeymap: false,
        link: false,
        trailingNode: false
      }) : na.configure({
        heading: {
          levels: [
            1,
            2,
            3,
            4,
            5,
            6
          ]
        },
        paragraph: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        listKeymap: false,
        link: false,
        trailingNode: false
      }),
      Ed,
      Tc,
      zd.configure({
        getMetaPrefix: a,
        isEnabled: o
      }),
      Ec,
      $s.extend({
        parseHTML() {
          return [
            {
              tag: "img[src]:not([data-wiki-path])"
            }
          ];
        },
        addNodeView() {
          return st(wc);
        }
      }).configure({
        inline: true,
        allowBase64: true
      }),
      Rs.configure({
        taskItem: false,
        taskList: false
      }),
      Nc.configure({
        nested: true
      }),
      Pc,
      Ds.configure({
        table: {
          resizable: r
        }
      }),
      Ts,
      Bs.configure({
        types: [
          "heading",
          "paragraph"
        ]
      }),
      Hs.configure({
        multicolor: true
      }),
      ...r ? [
        vd
      ] : [],
      Ls,
      Is,
      Wd.configure({
        initialRules: l
      }),
      _s.configure({
        placeholder: t,
        ...r ? {} : {
          showOnlyCurrent: false
        }
      }),
      Ns,
      Os.configure({
        className: "haim-node-focused"
      }),
      As,
      Ps,
      _u,
      Ou,
      _c,
      Kc,
      qc,
      Wc,
      ...r ? [
        Uc
      ] : [],
      du,
      fu,
      Du,
      wu,
      Su,
      Nu,
      Ru,
      ...r ? [
        xu
      ] : []
    ];
    return r ? [
      ...d,
      zs,
      qs.configure({
        controls: true,
        nocookie: true
      }),
      Us.configure({
        persist: true
      }),
      Fs,
      Ks,
      Rc,
      Ws,
      Vs.configure({
        injectCSS: true,
        visible: false
      }),
      Xs.configure({
        types: [
          "heading",
          "paragraph"
        ]
      }),
      Qs.configure({
        getIndex: Ys
      }),
      Bc
    ] : d;
  };
  const br = /* @__PURE__ */ new WeakMap();
  Sf = function(e) {
    if (!e) return "";
    const t = e.state.doc, n = br.get(e);
    if (n && n.doc === t) return n.markdown;
    const r = e, a = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
    return br.set(e, {
      doc: t,
      markdown: a
    }), a;
  };
  Mf = function(e) {
    e && br.delete(e);
  };
});
export {
  pn as C,
  lu as H,
  __tla,
  gr as a,
  Yu as b,
  Cf as c,
  sc as d,
  kf as e,
  iu as f,
  Sf as g,
  pf as h,
  Mf as i,
  Ld as j,
  gf as k,
  yo as l,
  mf as m,
  bf as n,
  va as o,
  su as p,
  Ku as r,
  yf as s,
  wf as t,
  bo as u,
  xf as w
};
