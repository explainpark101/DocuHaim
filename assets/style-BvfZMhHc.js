const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-jsqr-781CUKnt.js","assets/vendor-react-BPvvDyqO.js"])))=>i.map(i=>d[i]);
import { e as be, f as ks, h as ke, P as Ie, i as Ne, j as ws, M as ys, O as eo, p as Cs, k as Ss, I as rr, r as Ms, l as Yn, n as js, o as vs, q as na, t as Es, g as Ts, v as Ls, T as B, w as Ae, x as Is, y as Ns, b as to, R as st, z as As, A as ze, B as Ps, C as $s, F as ra, G as aa, H as Rs, J as Ds, K as oa, L as Hs, Q as Bs, S as Os, U as _s, V as sa, W as zs, X as Fs, Y as Ks, Z as Ws, _ as qs, $ as Vs, a0 as Us, a1 as Xs, a2 as Ys, a3 as Qs, a4 as Gs, a5 as Zs, a6 as Js, a7 as ei, a8 as ti, a9 as ni, aa as ri, ab as ai, ac as oi, ad as si, ae as ii, af as li, ag as ci } from "./vendor-tiptap-DxyadcB3.js";
import { r as h, j as l, c as ui, a as di, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as Qn, m as tt } from "./vendor-motion-Bv-XITR_.js";
import { t as fi, O as hi } from "./index-flVIUjar.js";
import { c as pi, n as nt, a5 as mi, C as gi, i as xi, e7 as bi, aK as ia, fS as no, jI as ro, jJ as ao, dV as ki, ia as wi, et as sn, a4 as Cr, jK as yi, jL as oo, iq as la, q as Ci, aW as so, jM as Si, jN as Mi, jO as io, __tla as __tla_1 } from "./index-DRAozU5b.js";
import { a as ji, b as vi, e as Ei, i as Ti } from "./downloadImageSrc-CZMxKG_A.js";
import { g as Li } from "./Kbd-Cnuyx3cZ.js";
import { _ as Ii } from "./vendor-aws-hJDgVEKM.js";
import { s as ar, bs as Ni, P as ca, aV as Ai, bt as Pi, bu as $i, u as Ri, aP as ua, H as da, U as lo, R as co, T as Di, bv as Hi, ah as Bi, n as Oi, D as _i, k as or, b9 as uo, v as zi, bw as Fi, E as Sr, bf as Ki, X as Gn, au as Wi, B as qi, I as Vi, c as Ui, d as Xi, h as Yi, b0 as Qi, b1 as Gi, e as Zi, f as Ji, g as fa, Q as el, bb as tl, i as ha, b5 as nl, b6 as rl, b7 as al, b8 as ol, Z as Xt, aY as vt, aR as sl, S as il, aT as ll, aI as cl, m as fo, ba as ul, bd as dl, b2 as fl, b3 as hl, b4 as pl, bx as ml, by as gl, bz as xl, bA as ho, j as po, x as mo, w as bl } from "./vendor-lucide-BnjwTb2j.js";
import { a3 as kl, a4 as wl, a5 as yl, a6 as Cl, a7 as Sl, a8 as Ml, U as Et, V as Tt, W as Zn, Y as Lt, Z as It, _ as Nt, a1 as Ee, a2 as Te, v as $t, w as un, x as dn, y as fn, z as hn, A as pn, n as jl, T as vl, P as El, C as Tl } from "./vendor-radix-8kjzYRrX.js";
import { e as go, __tla as __tla_2 } from "./bootSplash-Z2krRgC9.js";
import { i as Mr, s as Ll, c as pa, r as Il, p as Nl, a as Al, d as Pl } from "./codeBlockCommentTogglePlan-Dpfl-zi2.js";
import { b as At, c as tn, d as ma, e as xo, a as $l, s as Rl, f as ga, g as Dl } from "./emojiShortcode-CZFZfFoz.js";
import { W as Hl, __tla as __tla_3 } from "./WikiImageSizeModal-DUtadAkN.js";
import { c as Bl, f as Ol } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as _l } from "./toHtml-BXHU3IgU.js";
import { p as zl } from "./mdEditorSelectionWrap-DxJzFoHE.js";
import { k as Fl } from "./vendor-katex-NqpuB_gR.js";
import { r as Kl, l as Wl } from "./haimCodeTabSettings-B-S365oc.js";
import { b as ql, s as Vl, h as Ul, f as Xl, a as Yl, l as Ql } from "./haimCodeBlockLanguages-BStQPvla.js";
import { c as Gl, __tla as __tla_4 } from "./lazyMermaid-BcnyKPEC.js";
import { c as Zl, g as Jl } from "./vendor-highlight-Dm7Q9DxH.js";
let gn, Pu, th, Ro, eh, wd, wr, Ed, Cf, Mc, nh, lf, Gf, Au, qf, Qf, Na, Nu, Uf, Xf, Jf, Zf, To, jo, Yf, Vf;
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
  function ec() {
    var _a2;
    return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
  }
  async function tc(e) {
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
  async function bo(e) {
    const { src: t, inkCanvas: n, highlightCanvas: r } = e, a = await rc(t), o = ("width" in a, a.width), i = ("height" in a, a.height), c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(o)), c.height = Math.max(1, Math.round(i));
    const d = c.getContext("2d");
    if (!d) throw new Error("Canvas 2D unavailable");
    if (d.imageSmoothingEnabled = true, d.imageSmoothingQuality = "high", d.drawImage(a, 0, 0, c.width, c.height), n && n.width > 0 && n.height > 0 && d.drawImage(n, 0, 0, c.width, c.height), r && r.width > 0 && r.height > 0 && d.drawImage(r, 0, 0, c.width, c.height), "close" in a && typeof a.close == "function") try {
      a.close();
    } catch {
    }
    return c;
  }
  function nn(e) {
    return new Promise((t, n) => {
      e.toBlob((r) => {
        r ? t(r) : n(new Error("Failed to encode PNG"));
      }, "image/png");
    });
  }
  async function nc(e) {
    const t = await bo(e);
    return nn(t);
  }
  async function rc(e) {
    try {
      const t = await fetch(e, {
        mode: "cors",
        credentials: "omit"
      });
      if (!t.ok) throw new Error(`fetch ${t.status}`);
      const n = await t.blob();
      return await createImageBitmap(n);
    } catch {
      return await ac(e);
    }
  }
  function ac(e) {
    return new Promise((t, n) => {
      const r = new Image();
      r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(new Error("Image load failed for composite")), r.src = e;
    });
  }
  function mn(e) {
    return Math.max(e.diameterX, e.diameterY);
  }
  function ko(e) {
    return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
  }
  function oc(e, t) {
    return !(t >= 8) || !(e >= 1) ? 1 : W(e / t, 0.25, 12);
  }
  function xa(e, t, n) {
    const r = Math.max(4, Math.min(96, Math.min(t, n) * 0.08));
    return W(e, 0.5, r);
  }
  function wo(e, t) {
    if (e.length < 2) return 0;
    const n = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
    if (n === r) {
      const i = e[Math.max(0, t - 1)], c = e[t];
      return Math.atan2(c.y - i.y, c.x - i.x);
    }
    const a = e[n], o = e[r];
    return Math.atan2(o.y - a.y, o.x - a.x);
  }
  function yo(e, t) {
    if (e.length === 0) return [];
    const n = e[0];
    if (!n) return [];
    const r = Math.max(0.5, t), a = [
      {
        ...n
      }
    ];
    let o = 0;
    for (let i = 1; i < e.length; i += 1) {
      const c = e[i - 1], d = e[i], p = Math.hypot(d.x - c.x, d.y - c.y);
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
  const sc = [
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
  ], ic = [
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
  const Co = 0.92, ba = 0.35;
  function lc(e, t) {
    const n = e.x - t.x, r = e.y - t.y;
    return n * n + r * r;
  }
  function So(e, t, n = Co) {
    const r = W(n, 0.05, 1);
    return {
      x: e.x + (t.x - e.x) * r,
      y: e.y + (t.y - e.y) * r,
      pressure: e.pressure + (t.pressure - e.pressure) * r
    };
  }
  function cc(e, t, n, r = Co) {
    let a = t;
    const o = ba * ba;
    for (const i of n) {
      a = So(a, i, r);
      const c = e[e.length - 1];
      !c || lc(c, a) >= o ? e.push({
        ...a
      }) : (c.x = a.x, c.y = a.y, c.pressure = a.pressure);
    }
    return a;
  }
  function uc(e) {
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
      const a = e[r === 0 ? 0 : r - 1], o = e[r], i = e[r + 1], c = e[r + 2 < e.length ? r + 2 : r + 1], d = o.x + (i.x - a.x) / 6, p = o.y + (i.y - a.y) / 6, f = i.x - (c.x - o.x) / 6, m = i.y - (c.y - o.y) / 6;
      n += ` C ${d} ${p} ${f} ${m} ${i.x} ${i.y}`;
    }
    return n;
  }
  function sr(e) {
    if (e.dash !== "dashed") return;
    const t = mn(e), n = Math.max(2, t * 1.2);
    return `${Math.max(2, t * 2.2)} ${n}`;
  }
  function ir(e) {
    return e === "square" ? "square" : "round";
  }
  function lr(e) {
    return e === "square" ? "miter" : "round";
  }
  function dc(e) {
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
  function ka(e, t, n) {
    e.lineCap = ir(t.shape), e.lineJoin = lr(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, n), e.globalAlpha = W(t.opacity, 0.02, 1);
    const r = sr(t);
    r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
  }
  function fc(e, t, n, r, a = 1) {
    const o = Math.max(0.25, t.diameterX * a / 2), i = Math.max(0.25, t.diameterY * a / 2);
    e.save(), e.translate(n.x, n.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-o, -i, o * 2, i * 2) : e.ellipse(0, 0, o, i, 0, 0, Math.PI * 2), e.fill(), e.restore();
  }
  function Mo(e, t) {
    if (t.points.length < 1) return;
    if (e.globalAlpha = W(t.opacity, 0.02, 1), ko(t)) {
      const a = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), o = yo(t.points, a);
      for (let i = 0; i < o.length; i += 1) {
        const c = o[i], d = Math.min(t.points.length - 1, Math.round(i / Math.max(1, o.length - 1) * (t.points.length - 1))), p = wo(t.points, d), f = t.kind === "pressure" ? c.pressure : 1;
        fc(e, t, c, p, f);
      }
      return;
    }
    const n = mn(t);
    if (t.kind === "pressure" && t.points.length >= 2) {
      for (let a = 1; a < t.points.length; a += 1) {
        const o = t.points[a - 1], i = t.points[a], c = Math.max(0.5, n * ((o.pressure + i.pressure) / 2));
        ka(e, t, c), e.beginPath(), e.moveTo(o.x, o.y), e.lineTo(i.x, i.y), e.stroke();
      }
      return;
    }
    ka(e, t, n), e.beginPath();
    const r = t.points[0];
    if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
    else for (let a = 1; a < t.points.length; a += 1) {
      const o = t.points[a];
      e.lineTo(o.x, o.y);
    }
    e.stroke();
  }
  function wa(e, t, n) {
    const r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
    const a = r.getContext("2d");
    if (!a) return r;
    a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
    for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = "source-over", a.strokeStyle = o.color), Mo(a, o), a.restore();
    return r;
  }
  function ya(e, t, n) {
    const r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
    const a = r.getContext("2d");
    if (!a) return r;
    a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
    for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = dc(o.blend), a.strokeStyle = o.color), Mo(a, o), a.restore();
    return r;
  }
  function Ca(e, t, n) {
    var _a2;
    e.textBaseline = "top", e.textAlign = "left";
    for (const r of t) {
      const a = r.text ?? "";
      if (!a.trim() && a.length === 0) continue;
      const o = Math.max(1, r.fontSizePx * Math.max(1e-3, n));
      e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = W(r.opacity, 0.02, 1), e.fillStyle = r.color;
      const i = ((_a2 = r.fontFamily) == null ? void 0 : _a2.trim()) || "sans-serif";
      e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${o}px ${i}`;
      const c = o * 1.3, d = a.split(`
`);
      for (let p = 0; p < d.length; p += 1) e.fillText(d[p] ?? "", r.x, r.y + p * c);
      e.restore();
    }
  }
  const Sa = 8192;
  function hc(e) {
    const t = Math.max(1, e.clientWidth), n = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, a = e.naturalHeight > 0 ? e.naturalHeight : n, o = Math.min(3, window.devicePixelRatio || 1);
    let i = Math.max(r, Math.round(t * o)), c = Math.max(a, Math.round(n * o));
    const d = Math.max(i, c);
    if (d > Sa) {
      const p = Sa / d;
      i = Math.max(1, Math.round(i * p)), c = Math.max(1, Math.round(c * p));
    }
    return {
      bufW: i,
      bufH: c,
      cssW: t,
      cssH: n
    };
  }
  let ln = null;
  qf = function(e) {
    ln = e;
  };
  function pc() {
    return typeof ln == "function";
  }
  jo = async function(e) {
    var _a2;
    if (!ln) throw new Error("Image upload is not available");
    const n = (_a2 = (await ln([
      e
    ]))[0]) == null ? void 0 : _a2.trim();
    if (!n) throw new Error("Upload returned no path");
    return n;
  };
  Vf = function(e) {
    return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [
      e.trim()
    ] : [];
  };
  function mc(e, t) {
    const n = Math.max(e.left, t.left), r = Math.max(e.top, t.top), a = Math.min(e.right, t.right), o = Math.min(e.bottom, t.bottom);
    return a - n < 1 || o - r < 1 ? null : {
      left: n,
      top: r,
      right: a,
      bottom: o
    };
  }
  function Ma(e, t, n, r) {
    const a = Math.max(1, Math.round(t)), o = Math.max(1, Math.round(n)), i = mc(e, r);
    if (!i) return null;
    const c = Math.max(1, e.right - e.left), d = Math.max(1, e.bottom - e.top), p = (i.left - e.left) / c * a, f = (i.top - e.top) / d * o, m = (i.right - i.left) / c * a, g = (i.bottom - i.top) / d * o, x = Yt(Math.floor(p), 0, a - 1), w = Yt(Math.floor(f), 0, o - 1), k = Yt(Math.ceil(p + m), x + 1, a), j = Yt(Math.ceil(f + g), w + 1, o);
    return {
      sx: x,
      sy: w,
      sw: k - x,
      sh: j - w
    };
  }
  function gc(e, t, n, r = 2) {
    return e.sx <= r && e.sy <= r && e.sx + e.sw >= t - r && e.sy + e.sh >= n - r;
  }
  function ja(e, t) {
    const n = document.createElement("canvas");
    n.width = Math.max(1, t.sw), n.height = Math.max(1, t.sh);
    const r = n.getContext("2d");
    if (!r) throw new Error("Canvas 2D unavailable");
    return r.drawImage(e, t.sx, t.sy, t.sw, t.sh, 0, 0, n.width, n.height), n;
  }
  function Yt(e, t, n) {
    return Math.min(n, Math.max(t, e));
  }
  function xc() {
    if (typeof window > "u") return null;
    const e = window.BarcodeDetector;
    return typeof e == "function" ? e : null;
  }
  async function bc(e) {
    const t = xc();
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
  async function kc(e) {
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
      }), a = Math.max(1, r.naturalWidth || r.width), o = Math.max(1, r.naturalHeight || r.height), i = document.createElement("canvas");
      i.width = a, i.height = o;
      const c = i.getContext("2d", {
        willReadFrequently: true
      });
      if (!c) throw new Error("Canvas\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return c.drawImage(r, 0, 0), c.getImageData(0, 0, a, o);
    } finally {
      URL.revokeObjectURL(n);
    }
  }
  async function wc(e) {
    const n = (await Ii(() => import("./vendor-jsqr-781CUKnt.js").then((o) => o.j), __vite__mapDeps([0,1]))).default, r = n(e.data, e.width, e.height, {
      inversionAttempts: "attemptBoth"
    });
    return String((r == null ? void 0 : r.data) ?? "").trim() || null;
  }
  function yc(e) {
    const t = Math.min(e.width, e.height);
    if (t >= 320 || t < 1) return e;
    const n = Math.min(4, 480 / t), r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e.width * n)), r.height = Math.max(1, Math.round(e.height * n));
    const a = r.getContext("2d");
    return a ? (a.imageSmoothingEnabled = false, a.drawImage(e, 0, 0, r.width, r.height), r) : e;
  }
  function Cc(e) {
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
  async function Sc(e) {
    const t = yc(e), n = await Cc(t);
    return Mc(n);
  }
  Mc = async function(e) {
    if (!(e instanceof File) || e.size <= 0) throw new Error("\uC774\uBBF8\uC9C0 \uD30C\uC77C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    const t = await bc(e);
    if (t) return t;
    const n = await kc(e), r = await wc(n);
    if (r) return r;
    throw new Error("\uC774\uBBF8\uC9C0\uC5D0\uC11C QR \uCF54\uB4DC\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  };
  const jr = [
    0.22,
    1,
    0.36,
    1
  ], jc = {
    duration: 0.2,
    ease: jr
  }, vc = {
    duration: 0.28,
    ease: jr
  }, Qt = 0.5, Gt = 8, rt = 1.25, Ec = 2, Me = 0.5, Le = 128, Tc = 4e3, vo = 450, Lc = [
    "#111827",
    "#ef4444",
    "#f59e0b",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ffffff"
  ], Ic = [
    "#facc15",
    "#f472b6",
    "#38bdf8",
    "#4ade80",
    "#fb923c"
  ], Nc = {
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
  function Ac(e) {
    return Math.max(0.1, at(e / 10));
  }
  function va(e, t) {
    return at(W(e + t * Ac(e), Me, Le));
  }
  const cr = 8, ur = 400;
  function Pc() {
    if (typeof navigator > "u") return false;
    const e = navigator.platform || "", t = navigator.userAgent || "";
    return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
  }
  const Eo = Pc(), ie = Li(), Ea = Eo ? `${ie}+Shift+Z` : `${ie}+Y`;
  function $c(e, t) {
    const n = Math.max(1, Math.round(e / 10));
    return W(Math.round(e + t * n), cr, ur);
  }
  function Rc(e, t) {
    if (!t) return 1;
    const n = e.pressure;
    return typeof n != "number" || Number.isNaN(n) || e.pointerType === "mouse" ? 0.5 : W(n || 0.05, 0.05, 1);
  }
  function q({ label: e, active: t = false, disabled: n = false, tone: r = "default", onClick: a, children: o }) {
    const i = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
    return l.jsxs(un, {
      children: [
        l.jsx(dn, {
          asChild: true,
          children: l.jsx("button", {
            type: "button",
            "aria-label": e,
            disabled: n,
            onClick: a,
            className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${i}`,
            children: o
          })
        }),
        l.jsx(fn, {
          children: l.jsxs(hn, {
            side: "top",
            sideOffset: 6,
            className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow",
            children: [
              e,
              l.jsx(pn, {
                className: "fill-neutral-900"
              })
            ]
          })
        })
      ]
    });
  }
  const Dc = {
    backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)"
  };
  function Ta({ size: e = 16 }) {
    return l.jsx("svg", {
      width: e,
      height: e,
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": true,
      children: l.jsx("path", {
        d: "M2 8h12",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round"
      })
    });
  }
  function La({ size: e = 16 }) {
    return l.jsx("svg", {
      width: e,
      height: e,
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": true,
      children: l.jsx("path", {
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
      transition: `opacity ${vo}ms ease-out`
    } : {
      opacity: a
    };
    if (ko(e)) {
      const d = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), p = yo(e.points, d);
      return l.jsx("g", {
        style: o,
        children: p.map((f, m) => {
          const g = Math.min(e.points.length - 1, Math.round(m / Math.max(1, p.length - 1) * (e.points.length - 1))), x = wo(e.points, g) * 180 / Math.PI, w = e.kind === "pressure" ? f.pressure : 1, k = Math.max(0.25, e.diameterX * w / 2), j = Math.max(0.25, e.diameterY * w / 2);
          return e.shape === "square" ? l.jsx("rect", {
            x: -k,
            y: -j,
            width: k * 2,
            height: j * 2,
            fill: r,
            transform: `translate(${f.x} ${f.y}) rotate(${x})`
          }, `${e.id}-st-${m}`) : l.jsx("ellipse", {
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
    const i = mn(e);
    if (e.kind === "pressure" && e.points.length >= 2) return l.jsx("g", {
      style: o,
      children: e.points.slice(1).map((d, p) => {
        const f = e.points[p], m = Math.max(0.5, i * ((f.pressure + d.pressure) / 2));
        return l.jsx("path", {
          d: `M ${f.x} ${f.y} L ${d.x} ${d.y}`,
          fill: "none",
          stroke: r,
          strokeWidth: m,
          strokeLinecap: ir(e.shape),
          strokeLinejoin: lr(e.shape),
          strokeMiterlimit: 2,
          strokeDasharray: sr({
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
    const c = uc(e.points);
    return c ? l.jsx("path", {
      d: c,
      fill: "none",
      stroke: r,
      strokeWidth: i,
      strokeLinecap: ir(e.shape),
      strokeLinejoin: lr(e.shape),
      strokeMiterlimit: 2,
      strokeDasharray: sr(e),
      style: {
        ...o,
        fill: "none"
      }
    }) : null;
  }
  To = function({ src: e, alt: t = "", open: n, onClose: r, onSaveAnnotated: a }) {
    const o = !!(n && e), [i, c] = h.useState(1), [d, p] = h.useState({
      x: 0,
      y: 0
    }), [f, m] = h.useState("pan"), [g, x] = h.useState(false), [w, k] = h.useState("#111827ff"), [j, P] = h.useState("#facc15ff"), [_, N] = h.useState(4), [S, E] = h.useState(4), [D, I] = h.useState(1), [H, G] = h.useState(0.45), [le, it] = h.useState("multiply"), [oe, T] = h.useState("circle"), [L, z] = h.useState("solid"), [R, K] = h.useState([]), [F, J] = h.useState([]), [Fe, Ke] = h.useState([]), [ne, ee] = h.useState([]), [Y, Z] = h.useState(null), [Q, V] = h.useState(null), [Pe, se] = h.useState("Paperozi, sans-serif"), [te, lt] = h.useState(24), [We, kn] = h.useState("400"), [wn, yn] = h.useState("normal"), [qo, Cn] = h.useState(() => /* @__PURE__ */ new Set()), [re, je] = h.useState(null), [Sn, Mn] = h.useState(false), [Vo, we] = h.useState([]), [$, Uo] = h.useState({
      w: 1,
      h: 1
    }), [Dt, ct] = h.useState(null), [Xo, jn] = h.useState(false), [ut, Ir] = h.useState(false), [Nr, Ht] = h.useState("idle"), qe = h.useRef(null), [ce, Ve] = h.useState(false), [Bt, Ue] = h.useState(false), [$e, dt] = h.useState(null), [vn, Re] = h.useState(null), [Yo, Ot] = h.useState(false), [ve, fe] = h.useState(null), de = h.useRef(null), Ar = h.useRef(() => {
    }), he = h.useRef(0), [Pr, En] = h.useState(null), [Tn, _t] = h.useState(false), [Ln, In] = h.useState(false), [Nn, ft] = h.useState(false), An = h.useRef({
      w: 4,
      h: 4
    }), ht = h.useRef(null), Pn = h.useRef(null), Xe = h.useRef(null), De = h.useRef(null), $r = h.useRef([]), Rr = h.useRef([]), pt = h.useRef([]), ye = h.useRef(null), Ce = h.useRef(null), $n = h.useRef(null), Dr = h.useRef(null), Rn = h.useRef(0), Se = h.useRef(null), Dn = h.useRef(null), Ye = h.useRef(null), mt = h.useRef(null), zt = h.useRef(null), He = h.useRef(null), gt = h.useRef(1), Hr = h.useRef(i), Br = h.useRef(0), Qe = h.useRef(/* @__PURE__ */ new Map()), Hn = h.useRef([]), xt = h.useRef(null);
    $r.current = R, Rr.current = F, pt.current = ne, Hr.current = i;
    const Bn = !!a && pc() && (R.length > 0 || F.length > 0 || ne.some((s) => s.text.trim().length > 0)), bt = ne.find((s) => s.id === Y) ?? null, kt = f === "highlighter" ? j : w, Qo = f === "highlighter" ? H : D, wt = h.useCallback(() => {
      c(1), p({
        x: 0,
        y: 0
      });
    }, []), Ft = h.useCallback(() => {
      for (const s of Qe.current.values()) clearTimeout(s);
      Qe.current.clear();
    }, []), On = h.useCallback(() => {
      K([]), J([]), Ke([]), ee([]), Z(null), V(null), Cn(/* @__PURE__ */ new Set()), we([]), Hn.current = [], je(null), Mn(false), ye.current = null, Ce.current = null, Rn.current = 0;
      const s = Dr.current, u = $n.current;
      s && u && s.clearRect(0, 0, u.width, u.height), Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), mt.current = null, Ft();
    }, [
      Ft
    ]), _n = h.useRef(false);
    h.useEffect(() => {
      if (!o) {
        _n.current = false;
        return;
      }
      const s = !_n.current;
      _n.current = true, s && (wt(), On(), m("pan"), x(false), Ve(false), Ue(false), dt(null), Re(null), fe(null), de.current = null, he.current += 1, En(null), ct(null));
    }, [
      o,
      e,
      wt,
      On
    ]), h.useEffect(() => {
      var _a2;
      o || (ft(false), Ft(), (_a2 = xt.current) == null ? void 0 : _a2.call(xt), xt.current = null);
    }, [
      o,
      Ft
    ]);
    const Ge = h.useCallback(() => {
      const s = Pn.current;
      if (!s) return;
      const { bufW: u, bufH: b, cssW: y } = hc(s);
      y < 8 || s.clientHeight < 8 || (gt.current = oc(u, y), Uo({
        w: u,
        h: b
      }));
    }, []);
    h.useEffect(() => {
      if (!o) return;
      Ge();
      const s = Pn.current;
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
        De.current = null, jn(false);
        return;
      }
      let s = false;
      const u = Xe.current;
      if (!u || !ec()) {
        jn(false);
        return;
      }
      return tc(u).then((b) => {
        s || (De.current = b, jn(!!b));
      }), () => {
        s = true, De.current = null;
      };
    }, [
      o,
      e,
      $.w
    ]);
    const Ze = h.useCallback((s, u, b) => {
      const y = ht.current;
      if (!y) {
        c(W(s, Qt, Gt));
        return;
      }
      const M = y.getBoundingClientRect(), C = u - M.left - M.width / 2, v = b - M.top - M.height / 2;
      c((O) => {
        const U = W(s, Qt, Gt), pe = U / O;
        return p((ue) => ({
          x: C - (C - ue.x) * pe,
          y: v - (v - ue.y) * pe
        })), U;
      });
    }, []), Go = h.useCallback((s) => {
      var _a2;
      if ((_a2 = xt.current) == null ? void 0 : _a2.call(xt), xt.current = null, ht.current = s, !s) return;
      const u = (b) => {
        b.preventDefault(), b.stopPropagation();
        const y = b.deltaY > 0 ? 1 / rt : rt;
        Ze(Hr.current * y, b.clientX, b.clientY);
      };
      s.addEventListener("wheel", u, {
        passive: false,
        capture: true
      }), xt.current = () => {
        s.removeEventListener("wheel", u, true);
      };
    }, [
      Ze
    ]), Zo = h.useCallback((s) => {
      if (s.preventDefault(), s.stopPropagation(), i > 1.05) {
        wt();
        return;
      }
      Ze(Ec, s.clientX, s.clientY);
    }, [
      i,
      wt,
      Ze
    ]), yt = h.useCallback((s, u) => {
      const b = Xe.current;
      if (!b) return null;
      const y = b.getBoundingClientRect();
      return y.width < 1 || y.height < 1 ? null : {
        x: (s.clientX - y.left) / y.width * $.w,
        y: (s.clientY - y.top) / y.height * $.h,
        pressure: Rc(s, u)
      };
    }, [
      $.w,
      $.h
    ]), zn = h.useCallback((s) => {
      const u = s === "laser" ? 0.75 : 1, b = s === "highlighter" ? 4 : s === "laser" ? 2 : Me;
      if (s === "highlighter") return {
        w: Math.max(b, _ * u),
        h: Math.max(b, S * u)
      };
      const y = Math.max(b, _ * u);
      return {
        w: y,
        h: y
      };
    }, [
      _,
      S
    ]);
    h.useEffect(() => {
      f !== "eraser" && (f === "pen" || f === "pressure" || f === "highlighter" || f === "laser") && (An.current = {
        w: _,
        h: S
      });
    }, [
      f,
      _,
      S
    ]);
    const Or = h.useCallback(() => {
      const s = An.current;
      N(s.w), E(s.h);
    }, []), _r = h.useCallback(() => {
      const s = An.current, u = Math.max(s.w, s.h), b = at(W(u * 5, Me, Le));
      N(b), E(b), m("eraser");
    }, []), ae = h.useCallback((s) => {
      if (he.current += 1, Ve(false), fe(null), de.current = null, f === "eraser" && s !== "eraser" && Or(), s === "eraser") {
        _r();
        return;
      }
      if (s === "highlighter") {
        m("highlighter"), z("solid"), T("square");
        return;
      }
      m(s);
    }, [
      f,
      Or,
      _r
    ]), zr = h.useCallback((s) => {
      var _a2, _b;
      s.preventDefault(), s.stopPropagation(), (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId), He.current = {
        pointerId: s.pointerId,
        startX: s.clientX,
        startY: s.clientY,
        originX: d.x,
        originY: d.y
      };
    }, [
      d.x,
      d.y
    ]), Fr = h.useCallback((s) => {
      const u = He.current;
      !u || u.pointerId !== s.pointerId || (s.preventDefault(), p({
        x: u.originX + (s.clientX - u.startX),
        y: u.originY + (s.clientY - u.startY)
      }));
    }, []), Kr = h.useCallback((s) => {
      var _a2, _b;
      const u = He.current;
      if (!(!u || u.pointerId !== s.pointerId)) {
        He.current = null;
        try {
          (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
        } catch {
        }
      }
    }, []), Je = h.useCallback((s) => {
      const u = Qe.current.get(s);
      u && clearTimeout(u);
      const b = setTimeout(() => {
        Cn((M) => {
          const C = new Set(M);
          return C.add(s), C;
        });
        const y = setTimeout(() => {
          Qe.current.delete(s), Cn((M) => {
            const C = new Set(M);
            return C.delete(s), C;
          }), Ke((M) => M.filter((C) => C.id !== s));
        }, vo);
        Qe.current.set(s, y);
      }, Tc);
      Qe.current.set(s, b);
    }, []), Be = h.useCallback(() => {
      const s = $n.current, u = Dr.current ?? (s == null ? void 0 : s.getContext("2d"));
      s && u && u.clearRect(0, 0, s.width, s.height), Rn.current = 0;
    }, []), Fn = h.useCallback(() => {
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
      const b = s.nativeEvent, y = typeof b.getCoalescedEvents == "function" ? b.getCoalescedEvents() : [], M = y.length > 0 ? y : [
        b
      ], C = [];
      for (const v of M) {
        const O = yt(v, u);
        O && C.push(O);
      }
      if (C.length === 0) {
        const v = yt(s, u);
        v && C.push(v);
      }
      return C;
    }, [
      yt
    ]), Wr = h.useCallback((s) => {
      var _a2, _b;
      if (f !== "pen" && f !== "pressure" && f !== "highlighter" && f !== "laser" && f !== "eraser") return;
      s.preventDefault(), s.stopPropagation();
      const b = et(s, f === "pressure"), y = b[b.length - 1];
      if (!y) return;
      (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
      const M = f === "eraser" ? "eraser" : f === "highlighter" ? "highlighter" : f === "laser" ? "laser" : f === "pressure" ? "pressure" : "pen", C = M === "laser" ? "#ef4444" : M === "highlighter" ? j : M === "eraser" ? "#000000" : w, v = zn(M), O = W(gt.current, 0.25, 12), U = xa(Math.max(0.5, v.w * O), $.w, $.h), pe = xa(Math.max(0.5, v.h * O), $.w, $.h), ue = M === "eraser" ? 1 : M === "laser" ? 0.9 : M === "highlighter" ? H : D, X = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        seq: ++Br.current,
        kind: M,
        color: C,
        diameterX: U,
        diameterY: pe,
        points: [
          y
        ],
        shape: oe,
        dash: L,
        opacity: ue,
        ...M === "highlighter" ? {
          blend: le
        } : {}
      };
      if (ye.current = X, Ce.current = {
        ...y
      }, Mn(true), Rn.current = 0, je({
        ...X,
        points: [
          ...X.points
        ]
      }), Be(), M === "laser" && Je(X.id), (M === "pen" || M === "pressure") && De.current && s.nativeEvent.isTrusted) try {
        const bs = Math.max(v.w, v.h);
        De.current.updateInkTrailStartPoint(s.nativeEvent, {
          color: w,
          diameter: Math.max(1, bs * (M === "pressure" ? y.pressure : 1))
        });
      } catch {
      }
    }, [
      f,
      w,
      j,
      H,
      D,
      le,
      oe,
      L,
      et,
      zn,
      Je,
      Be,
      Fn
    ]), qr = h.useCallback((s) => {
      const u = ye.current;
      if (!u) return;
      s.preventDefault();
      const b = u.kind === "pressure", y = et(s, b);
      if (!y.length) return;
      const M = Ce.current ?? u.points[u.points.length - 1];
      if (M && (Ce.current = cc(u.points, M, y), Fn(), u.kind === "laser" && Je(u.id), (u.kind === "pen" || u.kind === "pressure") && De.current && s.nativeEvent.isTrusted)) try {
        const C = Ce.current, O = mn(u) / Math.max(1e-3, gt.current);
        De.current.updateInkTrailStartPoint(s.nativeEvent, {
          color: u.color,
          diameter: Math.max(1, O * (u.kind === "pressure" ? (C == null ? void 0 : C.pressure) ?? 1 : 1))
        });
      } catch {
      }
    }, [
      et,
      Fn,
      Je
    ]), Vr = h.useCallback((s) => {
      var _a2, _b;
      const u = ye.current;
      if (!u) return;
      const b = u.kind === "pressure", y = et(s, b), M = y[y.length - 1];
      if (M && Ce.current) {
        const v = So(Ce.current, M, 1), O = u.points[u.points.length - 1];
        !O || O.x !== v.x || O.y !== v.y ? u.points.push(v) : O.pressure = v.pressure, Ce.current = v;
      }
      ye.current = null, Ce.current = null, Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), Mn(false);
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
      Y && ee((u) => u.map((b) => b.id === Y ? {
        ...b,
        ...s
      } : b));
    }, [
      Y
    ]), Ur = h.useCallback((s) => {
      s.preventDefault(), s.stopPropagation();
      const u = yt(s, false);
      if (!u) return;
      const b = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, y = {
        id: b,
        seq: ++Br.current,
        x: u.x,
        y: u.y,
        text: "",
        color: w,
        opacity: D,
        fontSizePx: te,
        fontFamily: Pe,
        fontWeight: We,
        fontStyle: wn
      };
      we([]), ee((M) => [
        ...M,
        y
      ]), Z(b), V(b), window.setTimeout(() => {
        var _a2;
        return (_a2 = zt.current) == null ? void 0 : _a2.focus();
      }, 30);
    }, [
      yt,
      w,
      D,
      te,
      Pe,
      We,
      wn
    ]), Jo = h.useCallback((s) => {
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
        zr(s);
        return;
      }
      if (f === "text") {
        V(null), Ur(s);
        return;
      }
      Z(null), V(null), Wr(s);
    }, [
      ce,
      g,
      f,
      zr,
      Wr,
      Ur
    ]), es = h.useCallback((s) => {
      if (!ye.current) {
        const y = {
          x: s.clientX,
          y: s.clientY
        }, M = Ye.current;
        M ? (Ye.current = {
          x: M.x + (y.x - M.x) * 0.72,
          y: M.y + (y.y - M.y) * 0.72
        }, Dn.current == null && (Dn.current = requestAnimationFrame(() => {
          Dn.current = null, Ye.current && ct({
            ...Ye.current
          });
        }))) : (Ye.current = y, ct(y));
      }
      const u = de.current;
      if (u && u.pointerId === s.pointerId) {
        s.preventDefault();
        const y = Math.min(u.x0, s.clientX), M = Math.min(u.y0, s.clientY);
        fe({
          x: y,
          y: M,
          w: Math.abs(s.clientX - u.x0),
          h: Math.abs(s.clientY - u.y0)
        });
        return;
      }
      const b = mt.current;
      if (b && b.pointerId === s.pointerId) {
        s.preventDefault();
        const y = Xe.current;
        if (!y) return;
        const M = y.getBoundingClientRect(), C = (s.clientX - b.startClientX) / Math.max(1, M.width) * $.w, v = (s.clientY - b.startClientY) / Math.max(1, M.height) * $.h;
        ee((O) => O.map((U) => U.id === b.id ? {
          ...U,
          x: b.originX + C,
          y: b.originY + v
        } : U));
        return;
      }
      if (He.current) {
        Fr(s);
        return;
      }
      ye.current && qr(s);
    }, [
      Fr,
      qr,
      $.w,
      $.h
    ]), Xr = h.useCallback((s) => {
      var _a2, _b, _c2, _d2, _e2;
      const u = de.current;
      if (u && u.pointerId === s.pointerId) {
        de.current = null;
        try {
          (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
        } catch {
        }
        const b = Math.abs(s.clientX - u.x0), y = Math.abs(s.clientY - u.y0);
        if (fe(null), b >= 12 && y >= 12) {
          const M = Math.min(u.x0, s.clientX), C = Math.min(u.y0, s.clientY);
          Ar.current({
            left: M,
            top: C,
            right: M + b,
            bottom: C + y
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
      He.current && Kr(s), ye.current && Vr(s);
    }, [
      Kr,
      Vr
    ]), Ct = h.useCallback(() => {
      var _a2;
      const s = Q ?? Y;
      try {
        (_a2 = zt.current) == null ? void 0 : _a2.blur();
      } catch {
      }
      if (s) {
        const u = pt.current.find((b) => b.id === s);
        u && !u.text.trim() && (ee((b) => b.filter((y) => y.id !== s)), Z(null));
      }
      V(null);
    }, [
      Q,
      Y
    ]), Kn = h.useCallback(() => {
      const s = Y;
      if (!s) return;
      const u = pt.current.find((b) => b.id === s);
      u && (Hn.current.push({
        ...u
      }), we([]), ee((b) => b.filter((y) => y.id !== s)), Z(null), V(null));
    }, [
      Y
    ]), Wn = h.useCallback(() => {
      const s = Hn.current.pop();
      if (s) {
        ee((X) => [
          ...X,
          s
        ]), Z(s.id), V(null);
        return;
      }
      const u = $r.current, b = Rr.current, y = pt.current, M = u[u.length - 1], C = b[b.length - 1], v = y[y.length - 1], O = (M == null ? void 0 : M.seq) ?? -1, U = (C == null ? void 0 : C.seq) ?? -1, pe = (v == null ? void 0 : v.seq) ?? -1, ue = Math.max(O, U, pe);
      if (!(ue < 0)) {
        if (pe === ue && v) {
          we((X) => [
            ...X,
            {
              layer: "text",
              text: v
            }
          ]), ee(y.slice(0, -1)), Z((X) => X === v.id ? null : X);
          return;
        }
        if (M && C && M.id === C.id && M.kind === "eraser" && M.seq === ue) {
          we((X) => [
            ...X,
            {
              layer: "both",
              stroke: M
            }
          ]), K(u.slice(0, -1)), J(b.slice(0, -1));
          return;
        }
        if (O >= U && M && O === ue) {
          we((X) => [
            ...X,
            {
              layer: "ink",
              stroke: M
            }
          ]), K(u.slice(0, -1));
          return;
        }
        C && U === ue && (we((X) => [
          ...X,
          {
            layer: "highlight",
            stroke: C
          }
        ]), J(b.slice(0, -1)));
      }
    }, []), qn = h.useCallback(() => {
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
    }, []), Vn = h.useCallback((s) => {
      N((u) => va(u, s)), E((u) => va(u, s));
    }, []), Yr = h.useCallback((s) => {
      var _a2;
      const u = Y, b = (u ? (_a2 = pt.current.find((M) => M.id === u)) == null ? void 0 : _a2.fontSizePx : null) ?? te, y = $c(b, s);
      lt(y), u && ee((M) => M.map((C) => C.id === u ? {
        ...C,
        fontSizePx: y
      } : C));
    }, [
      Y,
      te
    ]), ts = h.useCallback((s) => {
      const u = at(W(s, Me, Le));
      N(u), E(u);
    }, []), ns = h.useCallback(() => {
      ae("highlighter");
    }, [
      ae
    ]), Wt = h.useCallback(async (s) => {
      if (!a || !e || ut) return;
      const u = ne.some((b) => b.text.trim().length > 0);
      if (!(R.length === 0 && F.length === 0 && !u)) {
        Ir(true), En(null);
        try {
          const b = wa($.w, $.h, R), y = b.getContext("2d");
          y && Ca(y, ne, gt.current);
          const M = ya($.w, $.h, F), C = await nc({
            src: e,
            inkCanvas: b,
            highlightCanvas: M
          }), v = new File([
            C
          ], `annotated-${Date.now()}.png`, {
            type: "image/png"
          });
          await a(s, v);
        } catch (b) {
          En(b instanceof Error ? b.message : String(b));
        } finally {
          Ir(false);
        }
      }
    }, [
      a,
      e,
      ut,
      R,
      F,
      ne,
      $.w,
      $.h
    ]), qt = h.useCallback(async () => {
      if (!e) throw new Error("\uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const s = ne.some((y) => y.text.trim().length > 0), u = R.length > 0 || s ? wa($.w, $.h, R) : null;
      if (u) {
        const y = u.getContext("2d");
        y && Ca(y, ne, gt.current);
      }
      const b = F.length > 0 ? ya($.w, $.h, F) : null;
      return bo({
        src: e,
        inkCanvas: u,
        highlightCanvas: b
      });
    }, [
      e,
      R,
      F,
      ne,
      $.w,
      $.h
    ]), Vt = h.useCallback(async () => {
      var _a2, _b;
      const s = await qt(), u = ((_a2 = Xe.current) == null ? void 0 : _a2.getBoundingClientRect()) ?? null, b = ((_b = ht.current) == null ? void 0 : _b.getBoundingClientRect()) ?? null;
      if (!u || !b) return nn(s);
      const y = Ma(u, s.width, s.height, b);
      return !y || gc(y, s.width, s.height) ? nn(s) : nn(ja(s, y));
    }, [
      qt
    ]), Un = h.useCallback(() => {
      if (!e) return;
      const s = Vt();
      qe.current && clearTimeout(qe.current), ji(s).then(() => {
        Ht("done"), qe.current = setTimeout(() => Ht("idle"), 1600);
      }).catch(() => {
        Ht("error"), qe.current = setTimeout(() => Ht("idle"), 2e3);
      });
    }, [
      e,
      Vt
    ]), rs = h.useCallback(() => {
      if (!e) return;
      const s = vi(e, "png").replace(/\.[^.]+$/i, "") + ".png";
      Vt().then((u) => Ei(u, s)).catch((u) => {
        console.error("Image download failed:", u);
      });
    }, [
      e,
      Vt
    ]), St = h.useCallback((s) => {
      if (!e) return;
      const u = ++he.current;
      Ue(true), Re(null), dt(null), Ot(false), (async () => {
        var _a2;
        try {
          const b = await qt();
          if (he.current !== u) return;
          let y = b;
          if (s !== "full") {
            const C = (_a2 = Xe.current) == null ? void 0 : _a2.getBoundingClientRect();
            if (!C) throw new Error("\uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
            const v = Ma(C, b.width, b.height, s);
            if (!v) throw new Error("\uC774\uBBF8\uC9C0 \uC548\uC5D0\uC11C \uC601\uC5ED\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
            y = ja(b, v);
          }
          const M = await Sc(y);
          if (he.current !== u) return;
          dt(M), fe(null), de.current = null;
        } catch (b) {
          if (he.current !== u) return;
          Re(b instanceof Error ? b.message : "QR \uCF54\uB4DC\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          he.current === u && Ue(false);
        }
      })();
    }, [
      e,
      qt
    ]);
    h.useEffect(() => {
      Ar.current = St;
    }, [
      St
    ]);
    const Qr = h.useCallback(() => {
      he.current += 1, Ve(false), Ue(false), fe(null), Re(null), de.current = null;
    }, []), as = h.useCallback(() => {
      dt(null), Ot(false), fe(null), Re(null), de.current = null, Ve(true), St("full");
    }, [
      St
    ]), os = h.useCallback(() => {
      he.current += 1, Ve(false), Ue(false), fe(null), de.current = null, x(true), ae("pen");
    }, [
      ae
    ]), ss = h.useCallback(() => {
      V(null), Z(null), ee((s) => s.filter((u) => u.text.trim().length > 0)), x(false), m("pan"), In(false), _t(false), ct(null);
    }, []), is = h.useCallback(() => {
      const s = $e == null ? void 0 : $e.trim();
      s && navigator.clipboard.writeText(s).then(() => {
        Ot(true), window.setTimeout(() => Ot(false), 1600);
      }, () => {
        Re("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      });
    }, [
      $e
    ]);
    h.useEffect(() => () => {
      qe.current && clearTimeout(qe.current);
    }, []);
    const Xn = R.length + F.length + ne.length, Gr = Xn > 0 || !!re || Sn, Ut = h.useCallback(() => {
      if (Gr) {
        ft(true);
        return;
      }
      ft(false), r();
    }, [
      Gr,
      r
    ]), ls = h.useCallback(() => {
      ft(false), r();
    }, [
      r
    ]), cs = h.useCallback(() => {
      ft(false);
    }, []);
    h.useEffect(() => {
      if (!o) return;
      const s = (u) => {
        var _a2;
        const b = u.target, y = (_a2 = b == null ? void 0 : b.tagName) == null ? void 0 : _a2.toLowerCase(), M = y === "input" || y === "textarea" || (b == null ? void 0 : b.isContentEditable), C = Eo ? u.metaKey : u.ctrlKey, v = u.key.toLowerCase(), O = u.code;
        if (Ti(u)) {
          if (M) return;
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Un();
          return;
        }
        if (C && v === "s") {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Wt(u.shiftKey ? "saveAs" : "overwrite");
          return;
        }
        if (C && v === "z" && !u.shiftKey) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Wn();
          return;
        }
        if (C && (v === "y" || v === "z" && u.shiftKey)) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), qn();
          return;
        }
        const U = !!Y || f === "text", pe = C && (u.shiftKey && (u.key === "<" || u.key === "," || O === "Comma") || !u.shiftKey && (u.key === "[" || O === "BracketLeft")), ue = C && (u.shiftKey && (u.key === ">" || u.key === "." || O === "Period") || !u.shiftKey && (u.key === "]" || O === "BracketRight"));
        if (U && (pe || ue)) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Yr(pe ? -1 : 1);
          return;
        }
        if (u.key === "Escape") {
          if (Nn) return;
          if (ce) {
            u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), he.current += 1, Ve(false), Ue(false), fe(null), Re(null), de.current = null;
            return;
          }
          if (f === "text" || Q) {
            u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Q ? Ct() : Z(null);
            return;
          }
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Ut();
          return;
        }
        if (Y && !C && (v === "backspace" || v === "delete")) {
          if (Q && M && y === "textarea" && b.value.length > 0) return;
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Kn();
          return;
        }
        if (!(M || !g)) {
          if (!C && u.key === "[") {
            u.preventDefault(), u.stopPropagation(), Vn(-1);
            return;
          }
          !C && u.key === "]" && (u.preventDefault(), u.stopPropagation(), Vn(1));
        }
      };
      return window.addEventListener("keydown", s, true), () => window.removeEventListener("keydown", s, true);
    }, [
      o,
      Un,
      Wt,
      Wn,
      qn,
      Vn,
      Yr,
      Y,
      Q,
      f,
      g,
      ce,
      Ct,
      Kn,
      Ut,
      Nn
    ]);
    const us = g && !ce && f !== "pan" && f !== "text" && Dt != null && !He.current && !Sn, Zr = zn(f === "eraser" ? "eraser" : f === "highlighter" ? "highlighter" : f === "laser" ? "laser" : f === "pressure" ? "pressure" : "pen"), Jr = Math.max(4, Zr.w * i), ea = Math.max(4, Zr.h * i), ds = R.filter((s) => s.kind === "eraser"), fs = R.filter((s) => s.kind !== "eraser"), hs = F.filter((s) => s.kind === "eraser"), ps = F.filter((s) => s.kind !== "eraser"), ms = Sn && f === "highlighter" ? {
      mixBlendMode: le
    } : {}, ta = pi(nt(kt) || "#111827ff"), gs = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", Mt = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [jt, xs] = h.useState(null);
    return l.jsxs(l.Fragment, {
      children: [
        l.jsx(kl, {
          open: o,
          onOpenChange: (s) => {
            s || Ut();
          },
          children: l.jsx(Qn, {
            children: o ? l.jsxs(wl, {
              forceMount: true,
              children: [
                l.jsx(yl, {
                  asChild: true,
                  forceMount: true,
                  children: l.jsx(tt.div, {
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
                    transition: jc
                  })
                }),
                l.jsx(Cl, {
                  asChild: true,
                  forceMount: true,
                  onOpenAutoFocus: (s) => s.preventDefault(),
                  onEscapeKeyDown: (s) => {
                    s.preventDefault();
                  },
                  children: l.jsxs(tt.div, {
                    ref: xs,
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
                    transition: vc,
                    children: [
                      l.jsx(Sl, {
                        className: "sr-only",
                        children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30"
                      }),
                      l.jsx(Ml, {
                        className: "sr-only",
                        children: "\uBCF4\uAE30 \uBAA8\uB4DC\uC5D0\uC11C \uD655\uB300, \uC774\uBBF8\uC9C0 \uBCF5\uC0AC, QR \uC778\uC2DD\uC744 \uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC5F0\uD544 \uBC84\uD2BC\uC73C\uB85C \uADF8\uB9AC\uAE30 \uD3B8\uC9D1\uC744 \uC5FD\uB2C8\uB2E4."
                      }),
                      l.jsx("div", {
                        ref: Go,
                        className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${ce ? "cursor-crosshair" : !g || f === "pan" ? "cursor-grab" : f === "text" ? "cursor-text" : "cursor-none"}`,
                        onPointerDown: Jo,
                        onPointerMove: es,
                        onPointerUp: Xr,
                        onPointerCancel: Xr,
                        onPointerLeave: () => {
                          ct(null), Ye.current = null;
                        },
                        children: e ? l.jsx("div", {
                          className: "relative will-change-transform",
                          style: {
                            transform: `translate(${d.x}px, ${d.y}px) scale(${i})`,
                            transformOrigin: "center center"
                          },
                          onClick: (s) => s.stopPropagation(),
                          children: l.jsxs("div", {
                            ref: Xe,
                            className: `relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl ${ce && !ve ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-black" : ""}`,
                            style: Nc,
                            children: [
                              l.jsx("img", {
                                ref: Pn,
                                src: e,
                                alt: t || "",
                                className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none",
                                draggable: false,
                                onDoubleClick: Zo
                              }),
                              l.jsxs("svg", {
                                className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none",
                                viewBox: `0 0 ${$.w} ${$.h}`,
                                preserveAspectRatio: "none",
                                "aria-hidden": true,
                                children: [
                                  l.jsxs("defs", {
                                    children: [
                                      l.jsxs("mask", {
                                        id: "haim-ink-erase-mask",
                                        children: [
                                          l.jsx("rect", {
                                            x: "0",
                                            y: "0",
                                            width: $.w,
                                            height: $.h,
                                            fill: "#fff"
                                          }),
                                          ds.map((s) => l.jsx(me, {
                                            stroke: s
                                          }, `em-${s.id}`)),
                                          (re == null ? void 0 : re.kind) === "eraser" ? l.jsx(me, {
                                            stroke: re
                                          }) : null
                                        ]
                                      }),
                                      l.jsxs("mask", {
                                        id: "haim-hi-erase-mask",
                                        children: [
                                          l.jsx("rect", {
                                            x: "0",
                                            y: "0",
                                            width: $.w,
                                            height: $.h,
                                            fill: "#fff"
                                          }),
                                          hs.map((s) => l.jsx(me, {
                                            stroke: s
                                          }, `hem-${s.id}`)),
                                          (re == null ? void 0 : re.kind) === "eraser" ? l.jsx(me, {
                                            stroke: re
                                          }) : null
                                        ]
                                      })
                                    ]
                                  }),
                                  l.jsxs("g", {
                                    mask: "url(#haim-ink-erase-mask)",
                                    children: [
                                      fs.map((s) => l.jsx(me, {
                                        stroke: s
                                      }, s.id)),
                                      re && (re.kind === "pen" || re.kind === "pressure") ? l.jsx(me, {
                                        stroke: re
                                      }) : null
                                    ]
                                  }),
                                  l.jsxs("g", {
                                    mask: "url(#haim-hi-erase-mask)",
                                    style: {
                                      mixBlendMode: le
                                    },
                                    children: [
                                      ps.map((s) => l.jsx("g", {
                                        style: {
                                          mixBlendMode: s.blend || le
                                        },
                                        children: l.jsx(me, {
                                          stroke: s
                                        })
                                      }, s.id)),
                                      (re == null ? void 0 : re.kind) === "highlighter" ? l.jsx("g", {
                                        style: {
                                          mixBlendMode: re.blend || le
                                        },
                                        children: l.jsx(me, {
                                          stroke: re
                                        })
                                      }) : null
                                    ]
                                  }),
                                  l.jsxs("g", {
                                    children: [
                                      Fe.map((s) => l.jsx(me, {
                                        stroke: s,
                                        fading: qo.has(s.id)
                                      }, s.id)),
                                      (re == null ? void 0 : re.kind) === "laser" ? l.jsx(me, {
                                        stroke: re
                                      }) : null
                                    ]
                                  })
                                ]
                              }),
                              l.jsx("canvas", {
                                ref: $n,
                                className: "pointer-events-none absolute inset-0 h-full w-full",
                                width: $.w,
                                height: $.h,
                                style: ms,
                                "aria-hidden": true
                              }),
                              ne.map((s) => {
                                const u = s.id === Y, b = s.id === Q, y = s.x / Math.max(1, $.w) * 100, M = s.y / Math.max(1, $.h) * 100;
                                return l.jsx("div", {
                                  className: `absolute z-1 min-w-8 max-w-[90%] ${u ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`,
                                  style: {
                                    left: `${y}%`,
                                    top: `${M}%`,
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
                                    f !== "text" && f !== "pan" || (C.stopPropagation(), C.preventDefault(), ae("text"), Q && Q !== s.id && Ct(), V(null), Z(s.id), se(s.fontFamily), lt(s.fontSizePx), kn(s.fontWeight), yn(s.fontStyle), mt.current = {
                                      id: s.id,
                                      pointerId: C.pointerId,
                                      startClientX: C.clientX,
                                      startClientY: C.clientY,
                                      originX: s.x,
                                      originY: s.y
                                    }, (_b = (_a2 = C.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, C.pointerId));
                                  },
                                  onDoubleClick: (C) => {
                                    C.stopPropagation(), C.preventDefault(), ae("text"), Z(s.id), V(s.id), se(s.fontFamily), lt(s.fontSizePx), kn(s.fontWeight), yn(s.fontStyle), window.setTimeout(() => {
                                      var _a2;
                                      return (_a2 = zt.current) == null ? void 0 : _a2.focus();
                                    }, 20);
                                  },
                                  children: b ? l.jsx("textarea", {
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
                                      ee((O) => O.map((U) => U.id === s.id ? {
                                        ...U,
                                        text: v
                                      } : U));
                                    },
                                    onBlur: () => {
                                      Q === s.id && Ct();
                                    },
                                    onKeyDown: (C) => {
                                      if (C.key === "Escape") {
                                        C.preventDefault(), C.stopPropagation(), Ct();
                                        return;
                                      }
                                      (C.key === "Backspace" || C.key === "Delete") && C.currentTarget.value.length === 0 && (C.preventDefault(), C.stopPropagation(), Kn());
                                    }
                                  }) : l.jsx("span", {
                                    className: "block",
                                    children: s.text || "\uD14D\uC2A4\uD2B8"
                                  })
                                }, s.id);
                              })
                            ]
                          })
                        }) : null
                      }),
                      ve && ve.w > 0 && ve.h > 0 ? l.jsx("div", {
                        className: "pointer-events-none fixed z-100066 border-2 border-sky-400 bg-sky-400/25",
                        style: {
                          left: ve.x,
                          top: ve.y,
                          width: ve.w,
                          height: ve.h
                        },
                        "aria-hidden": true
                      }) : null,
                      us && Dt ? l.jsx("div", {
                        className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow",
                        style: {
                          left: Dt.x - Jr / 2,
                          top: Dt.y - ea / 2,
                          width: Jr,
                          height: ea,
                          borderRadius: oe === "circle" ? "9999px" : "2px",
                          borderStyle: L === "dashed" ? "dashed" : "solid",
                          opacity: W(Qo, 0.25, 0.85),
                          backgroundColor: f === "eraser" ? "transparent" : nt(kt) || void 0
                        },
                        "aria-hidden": true
                      }) : null,
                      g && (f === "text" || bt) && l.jsxs("aside", {
                        className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md",
                        onPointerDown: (s) => s.stopPropagation(),
                        children: [
                          l.jsxs("div", {
                            className: "flex items-center gap-2 text-xs font-semibold text-white/90",
                            children: [
                              l.jsx(ar, {
                                size: 14,
                                "aria-hidden": true
                              }),
                              "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"
                            ]
                          }),
                          l.jsxs("label", {
                            className: "flex flex-col gap-1 text-[11px] text-white/70",
                            children: [
                              l.jsx("span", {
                                children: "Font family"
                              }),
                              l.jsx(mi, {
                                value: (bt == null ? void 0 : bt.fontFamily) ?? Pe,
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
                          l.jsxs("label", {
                            className: "flex flex-col gap-1 text-[11px] text-white/70",
                            children: [
                              l.jsx("span", {
                                children: "Font size"
                              }),
                              l.jsxs("div", {
                                className: "flex items-center gap-1",
                                children: [
                                  l.jsx("input", {
                                    type: "number",
                                    min: cr,
                                    max: ur,
                                    step: 1,
                                    value: (bt == null ? void 0 : bt.fontSizePx) ?? te,
                                    onChange: (s) => {
                                      const u = W(Math.round(Number(s.target.value) || 24), cr, ur);
                                      lt(u), Kt({
                                        fontSizePx: u
                                      });
                                    },
                                    className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white",
                                    "aria-label": "Font size (px)"
                                  }),
                                  l.jsx("span", {
                                    className: "shrink-0 text-white/60",
                                    children: "px"
                                  })
                                ]
                              })
                            ]
                          }),
                          l.jsxs("label", {
                            className: "flex flex-col gap-1 text-[11px] text-white/70",
                            children: [
                              l.jsx("span", {
                                children: "Font weight"
                              }),
                              l.jsxs(Et, {
                                value: (bt == null ? void 0 : bt.fontWeight) ?? We,
                                onValueChange: (s) => {
                                  kn(s), Kt({
                                    fontWeight: s
                                  });
                                },
                                children: [
                                  l.jsx(Tt, {
                                    className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white",
                                    "aria-label": "Font weight",
                                    children: l.jsx(Zn, {})
                                  }),
                                  l.jsx(Lt, {
                                    container: jt,
                                    children: l.jsx(It, {
                                      className: Mt,
                                      position: "popper",
                                      side: "bottom",
                                      sideOffset: 6,
                                      onCloseAutoFocus: (s) => s.preventDefault(),
                                      children: l.jsx(Nt, {
                                        className: "p-1",
                                        children: sc.map((s) => l.jsx(Ee, {
                                          value: s.value,
                                          className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                          children: l.jsx(Te, {
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
                          l.jsxs("label", {
                            className: "flex flex-col gap-1 text-[11px] text-white/70",
                            children: [
                              l.jsx("span", {
                                children: "Font style"
                              }),
                              l.jsxs(Et, {
                                value: (bt == null ? void 0 : bt.fontStyle) ?? wn,
                                onValueChange: (s) => {
                                  const u = s === "italic" ? "italic" : "normal";
                                  yn(u), Kt({
                                    fontStyle: u
                                  });
                                },
                                children: [
                                  l.jsx(Tt, {
                                    className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white",
                                    "aria-label": "Font style",
                                    children: l.jsx(Zn, {})
                                  }),
                                  l.jsx(Lt, {
                                    container: jt,
                                    children: l.jsx(It, {
                                      className: Mt,
                                      position: "popper",
                                      side: "bottom",
                                      sideOffset: 6,
                                      onCloseAutoFocus: (s) => s.preventDefault(),
                                      children: l.jsxs(Nt, {
                                        className: "p-1",
                                        children: [
                                          l.jsx(Ee, {
                                            value: "normal",
                                            className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                            children: l.jsx(Te, {
                                              children: "Normal"
                                            })
                                          }),
                                          l.jsx(Ee, {
                                            value: "italic",
                                            className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                            children: l.jsx(Te, {
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
                          l.jsxs("p", {
                            className: "text-[10px] leading-4 text-white/45",
                            children: [
                              "\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9",
                              l.jsx("br", {}),
                              "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1",
                              l.jsx("br", {}),
                              ie,
                              "+[ ] / ",
                              ie,
                              "+Shift+<> \uAE00\uC790 \uD06C\uAE30"
                            ]
                          })
                        ]
                      }),
                      l.jsx($t, {
                        delayDuration: 250,
                        skipDelayDuration: 0,
                        children: l.jsxs("div", {
                          className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1",
                          onPointerDown: (s) => s.stopPropagation(),
                          children: [
                            l.jsxs("div", {
                              className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md",
                              children: [
                                g ? l.jsxs(l.Fragment, {
                                  children: [
                                    l.jsx(q, {
                                      label: "\uD328\uB2DD",
                                      active: f === "pan",
                                      onClick: () => ae("pan"),
                                      children: l.jsx(Ni, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uC77C\uBC18 \uD39C",
                                      active: f === "pen",
                                      onClick: () => ae("pen"),
                                      children: l.jsx(ca, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uD544\uC555 \uD39C",
                                      active: f === "pressure",
                                      onClick: () => ae("pressure"),
                                      children: l.jsx(Ai, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uD615\uAD11\uD39C",
                                      active: f === "highlighter",
                                      onClick: ns,
                                      children: l.jsx(Pi, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)",
                                      active: f === "laser",
                                      onClick: () => ae("laser"),
                                      children: l.jsx($i, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uC9C0\uC6B0\uAC1C",
                                      active: f === "eraser",
                                      onClick: () => ae("eraser"),
                                      children: l.jsx(Ri, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uD14D\uC2A4\uD2B8",
                                      active: f === "text",
                                      onClick: () => ae("text"),
                                      children: l.jsx(ar, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx("span", {
                                      className: "mx-0.5 h-5 w-px bg-white/20",
                                      "aria-hidden": true
                                    }),
                                    l.jsxs("div", {
                                      className: "relative flex items-center",
                                      children: [
                                        l.jsx("button", {
                                          type: "button",
                                          "aria-label": "\uD39C \uC0C9\uC0C1",
                                          "aria-expanded": Ln,
                                          onClick: () => {
                                            In((s) => (s && _t(false), !s));
                                          },
                                          className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow",
                                          style: {
                                            backgroundColor: nt(kt) || "#111827"
                                          }
                                        }),
                                        l.jsx(Qn, {
                                          mode: "popLayout",
                                          children: Ln ? l.jsxs(tt.div, {
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
                                              (f === "highlighter" ? Ic : Lc).map((s, u, b) => {
                                                const y = (nt(kt) || "").slice(0, 7).toLowerCase() === s.toLowerCase(), M = 0.03 * (b.length - u);
                                                return l.jsx(tt.button, {
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
                                                    delay: M
                                                  },
                                                  onClick: () => {
                                                    _t(false), f === "highlighter" ? P(`${s}ff`) : (k(`${s}ff`), (f === "pan" || f === "eraser" || f === "laser") && ae("pen")), In(false);
                                                  },
                                                  className: `h-7 w-7 rounded-full border-2 shadow ${y ? "border-sky-300 scale-110" : "border-white/40"}`,
                                                  style: {
                                                    backgroundColor: s
                                                  }
                                                }, s);
                                              }),
                                              l.jsx(tt.button, {
                                                type: "button",
                                                "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1",
                                                "aria-pressed": Tn,
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
                                                onClick: () => _t((s) => !s),
                                                className: `h-7 w-7 rounded-full border-2 shadow ${Tn ? "border-sky-300 scale-110" : "border-white/50"}`,
                                                style: Dc
                                              })
                                            ]
                                          }, "haim-color-palette") : null
                                        }),
                                        l.jsx(Qn, {
                                          children: Ln && Tn ? l.jsxs(tt.div, {
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
                                              ease: jr
                                            },
                                            className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md",
                                            children: [
                                              l.jsx("div", {
                                                className: "mb-2 h-8 w-full rounded border border-white/20",
                                                style: {
                                                  ...gi,
                                                  backgroundColor: kt
                                                }
                                              }),
                                              l.jsx("div", {
                                                className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full",
                                                children: l.jsx(fi, {
                                                  color: ta,
                                                  onChange: (s) => {
                                                    const u = nt(s.startsWith("#") ? s : `#${s}`);
                                                    u && (f === "highlighter" ? P(u) : (k(u), (f === "pan" || f === "eraser" || f === "laser") && ae("pen")));
                                                  }
                                                })
                                              }),
                                              l.jsx(hi, {
                                                alpha: true,
                                                prefixed: true,
                                                color: ta,
                                                onChange: (s) => {
                                                  const u = nt(s.startsWith("#") ? s : `#${s}`);
                                                  u && (f === "highlighter" ? P(u) : k(u));
                                                },
                                                className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white"
                                              })
                                            ]
                                          }, "haim-color-picker") : null
                                        })
                                      ]
                                    }),
                                    l.jsx("span", {
                                      className: "mx-0.5 h-5 w-px bg-white/20",
                                      "aria-hidden": true
                                    }),
                                    f === "highlighter" ? l.jsxs("div", {
                                      className: "flex items-center gap-1 text-[11px] text-white/80",
                                      children: [
                                        l.jsxs("label", {
                                          className: "flex items-center gap-0.5",
                                          children: [
                                            l.jsx("span", {
                                              className: "opacity-70",
                                              children: "W"
                                            }),
                                            l.jsx("span", {
                                              className: "sr-only",
                                              children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)"
                                            }),
                                            l.jsx("input", {
                                              type: "number",
                                              min: Me,
                                              max: Le,
                                              step: 0.1,
                                              value: _,
                                              onChange: (s) => N(at(W(Number(s.target.value) || 1, Me, Le))),
                                              className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white",
                                              "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)"
                                            })
                                          ]
                                        }),
                                        l.jsx("span", {
                                          className: "opacity-50",
                                          "aria-hidden": true,
                                          children: "\xD7"
                                        }),
                                        l.jsxs("label", {
                                          className: "flex items-center gap-0.5",
                                          children: [
                                            l.jsx("span", {
                                              className: "opacity-70",
                                              children: "H"
                                            }),
                                            l.jsx("span", {
                                              className: "sr-only",
                                              children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)"
                                            }),
                                            l.jsx("input", {
                                              type: "number",
                                              min: Me,
                                              max: Le,
                                              step: 0.1,
                                              value: S,
                                              onChange: (s) => E(at(W(Number(s.target.value) || 1, Me, Le))),
                                              className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white",
                                              "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)"
                                            })
                                          ]
                                        }),
                                        l.jsx("span", {
                                          className: "tabular-nums text-white/60",
                                          "aria-hidden": true,
                                          children: "px"
                                        })
                                      ]
                                    }) : l.jsxs("label", {
                                      className: "flex items-center gap-1 text-[11px] text-white/80",
                                      children: [
                                        l.jsx("span", {
                                          className: "sr-only",
                                          children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)"
                                        }),
                                        l.jsx("input", {
                                          type: "number",
                                          min: Me,
                                          max: Le,
                                          step: 0.1,
                                          value: _,
                                          onChange: (s) => ts(Number(s.target.value) || 1),
                                          className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white",
                                          "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)"
                                        }),
                                        l.jsx("span", {
                                          className: "tabular-nums text-white/60",
                                          "aria-hidden": true,
                                          children: "px"
                                        })
                                      ]
                                    }),
                                    l.jsxs("label", {
                                      className: "flex items-center gap-1 text-[11px] text-white/80",
                                      children: [
                                        l.jsx("span", {
                                          className: "opacity-70",
                                          children: "\uD750\uB984"
                                        }),
                                        l.jsx("input", {
                                          type: "number",
                                          min: 5,
                                          max: 100,
                                          step: 5,
                                          value: Math.round((f === "highlighter" ? H : D) * 100),
                                          onChange: (s) => {
                                            const b = W(Number(s.target.value) || 5, 5, 100) / 100;
                                            f === "highlighter" ? G(b) : I(b);
                                          },
                                          className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white",
                                          "aria-label": "\uD750\uB984 (%)"
                                        }),
                                        l.jsx("span", {
                                          className: "tabular-nums text-white/60",
                                          "aria-hidden": true,
                                          children: "%"
                                        })
                                      ]
                                    }),
                                    l.jsxs(Et, {
                                      value: oe,
                                      onValueChange: (s) => T(s),
                                      children: [
                                        l.jsx(Tt, {
                                          className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20",
                                          "aria-label": oe === "circle" ? "\uC6D0" : "\uB124\uBAA8",
                                          children: oe === "circle" ? l.jsx(ua, {
                                            size: 16
                                          }) : l.jsx(da, {
                                            size: 16
                                          })
                                        }),
                                        l.jsx(Lt, {
                                          container: jt,
                                          children: l.jsx(It, {
                                            className: Mt,
                                            position: "popper",
                                            side: "top",
                                            sideOffset: 6,
                                            onCloseAutoFocus: (s) => s.preventDefault(),
                                            children: l.jsxs(Nt, {
                                              className: "p-1",
                                              children: [
                                                l.jsxs(Ee, {
                                                  value: "circle",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "\uC6D0",
                                                  children: [
                                                    l.jsx(ua, {
                                                      size: 16
                                                    }),
                                                    l.jsx(Te, {
                                                      className: "sr-only",
                                                      children: "\uC6D0"
                                                    })
                                                  ]
                                                }),
                                                l.jsxs(Ee, {
                                                  value: "square",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "\uB124\uBAA8",
                                                  children: [
                                                    l.jsx(da, {
                                                      size: 16
                                                    }),
                                                    l.jsx(Te, {
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
                                    l.jsxs(Et, {
                                      value: L,
                                      onValueChange: (s) => z(s),
                                      children: [
                                        l.jsx(Tt, {
                                          className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20",
                                          "aria-label": L === "dashed" ? "Dashed" : "Solid",
                                          children: L === "dashed" ? l.jsx(La, {
                                            size: 16
                                          }) : l.jsx(Ta, {
                                            size: 16
                                          })
                                        }),
                                        l.jsx(Lt, {
                                          container: jt,
                                          children: l.jsx(It, {
                                            className: Mt,
                                            position: "popper",
                                            side: "top",
                                            sideOffset: 6,
                                            onCloseAutoFocus: (s) => s.preventDefault(),
                                            children: l.jsxs(Nt, {
                                              className: "p-1",
                                              children: [
                                                l.jsxs(Ee, {
                                                  value: "solid",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "Solid",
                                                  children: [
                                                    l.jsx(Ta, {
                                                      size: 16
                                                    }),
                                                    l.jsx(Te, {
                                                      className: "sr-only",
                                                      children: "Solid"
                                                    })
                                                  ]
                                                }),
                                                l.jsxs(Ee, {
                                                  value: "dashed",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "Dashed",
                                                  children: [
                                                    l.jsx(La, {
                                                      size: 16
                                                    }),
                                                    l.jsx(Te, {
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
                                    f === "highlighter" ? l.jsxs(Et, {
                                      value: le,
                                      onValueChange: (s) => it(s),
                                      children: [
                                        l.jsx(Tt, {
                                          className: gs,
                                          "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC",
                                          children: l.jsx(Zn, {
                                            placeholder: "Blend"
                                          })
                                        }),
                                        l.jsx(Lt, {
                                          container: jt,
                                          children: l.jsx(It, {
                                            className: `${Mt} max-h-56 overflow-auto`,
                                            position: "popper",
                                            side: "top",
                                            sideOffset: 6,
                                            onCloseAutoFocus: (s) => s.preventDefault(),
                                            children: l.jsx(Nt, {
                                              className: "p-1",
                                              children: ic.map((s) => l.jsx(Ee, {
                                                value: s.value,
                                                className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                                children: l.jsx(Te, {
                                                  children: s.label
                                                })
                                              }, s.value))
                                            })
                                          })
                                        })
                                      ]
                                    }) : null,
                                    l.jsx("span", {
                                      className: "mx-0.5 h-5 w-px bg-white/20",
                                      "aria-hidden": true
                                    }),
                                    l.jsx(q, {
                                      label: `\uC2E4\uD589 \uCDE8\uC18C (${ie}+Z)`,
                                      disabled: Xn === 0,
                                      onClick: Wn,
                                      children: l.jsx(lo, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: `\uB2E4\uC2DC \uC2E4\uD589 (${Ea})`,
                                      disabled: Vo.length === 0,
                                      onClick: qn,
                                      children: l.jsx(co, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30",
                                      disabled: Xn === 0 && Fe.length === 0,
                                      onClick: On,
                                      children: l.jsx(Di, {
                                        size: 16
                                      })
                                    })
                                  ]
                                }) : null,
                                g ? l.jsx("span", {
                                  className: "mx-0.5 h-5 w-px bg-white/20",
                                  "aria-hidden": true
                                }) : null,
                                l.jsx(q, {
                                  label: "\uCD95\uC18C",
                                  onClick: () => {
                                    var _a2;
                                    const s = (_a2 = ht.current) == null ? void 0 : _a2.getBoundingClientRect();
                                    if (!s) {
                                      c((u) => W(u / rt, Qt, Gt));
                                      return;
                                    }
                                    Ze(i / rt, s.left + s.width / 2, s.top + s.height / 2);
                                  },
                                  children: l.jsx(Hi, {
                                    size: 16
                                  })
                                }),
                                l.jsxs("span", {
                                  className: "min-w-10 text-center text-[11px] tabular-nums text-white/80",
                                  children: [
                                    Math.round(i * 100),
                                    "%"
                                  ]
                                }),
                                l.jsx(q, {
                                  label: "\uD655\uB300",
                                  onClick: () => {
                                    var _a2;
                                    const s = (_a2 = ht.current) == null ? void 0 : _a2.getBoundingClientRect();
                                    if (!s) {
                                      c((u) => W(u * rt, Qt, Gt));
                                      return;
                                    }
                                    Ze(i * rt, s.left + s.width / 2, s.top + s.height / 2);
                                  },
                                  children: l.jsx(Bi, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: "\uBCF4\uAE30 \uCD08\uAE30\uD654",
                                  onClick: wt,
                                  children: l.jsx(Oi, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: "\uC774\uBBF8\uC9C0 \uB2E4\uC6B4\uB85C\uB4DC",
                                  onClick: rs,
                                  children: l.jsx(_i, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: Nr === "done" ? "\uBCF5\uC0AC\uB428" : Nr === "error" ? "\uBCF5\uC0AC \uC2E4\uD328" : `\uC774\uBBF8\uC9C0 \uBCF5\uC0AC (${ie}+C)`,
                                  onClick: Un,
                                  children: l.jsx(or, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: Bt ? "QR \uC778\uC2DD \uC911" : ce ? "QR \uC778\uC2DD \uC885\uB8CC" : "QR \uCF54\uB4DC \uC778\uC2DD",
                                  active: ce,
                                  disabled: Bt,
                                  onClick: () => {
                                    if (ce) {
                                      Qr();
                                      return;
                                    }
                                    as();
                                  },
                                  children: l.jsx(uo, {
                                    size: 16
                                  })
                                }),
                                l.jsx("span", {
                                  className: "mx-0.5 h-5 w-px bg-white/20",
                                  "aria-hidden": true
                                }),
                                g || Bn ? l.jsxs(l.Fragment, {
                                  children: [
                                    l.jsx(q, {
                                      label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${ie}+S)`,
                                      tone: "save",
                                      disabled: !Bn || ut,
                                      onClick: () => {
                                        Wt("overwrite");
                                      },
                                      children: l.jsx(zi, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${ie}+Shift+S)`,
                                      tone: "saveAs",
                                      disabled: !Bn || ut,
                                      onClick: () => {
                                        Wt("saveAs");
                                      },
                                      children: l.jsx(Fi, {
                                        size: 16
                                      })
                                    })
                                  ]
                                }) : null,
                                g ? l.jsx(q, {
                                  label: "\uBCF4\uAE30 \uBAA8\uB4DC",
                                  onClick: ss,
                                  children: l.jsx(Sr, {
                                    size: 16
                                  })
                                }) : l.jsx(q, {
                                  label: "\uD3B8\uC9D1",
                                  onClick: os,
                                  children: l.jsx(ca, {
                                    size: 16
                                  })
                                })
                              ]
                            }),
                            ce || $e || vn ? l.jsxs("div", {
                              className: "order-first flex w-full max-w-xl flex-col gap-2 rounded-xl border border-white/15 bg-black/80 px-3 py-2 text-white shadow-lg",
                              children: [
                                ce ? l.jsxs("div", {
                                  className: "flex flex-wrap items-center justify-center gap-2",
                                  children: [
                                    l.jsx("p", {
                                      className: "text-[11px] text-white/80",
                                      children: "\uC774\uBBF8\uC9C0 \uC804\uCCB4\uB97C \uC778\uC2DD\uD569\uB2C8\uB2E4. \uB4DC\uB798\uADF8\uD558\uBA74 \uADF8 \uBD80\uBD84\uB9CC \uC778\uC2DD\uD569\uB2C8\uB2E4."
                                    }),
                                    l.jsxs("button", {
                                      type: "button",
                                      disabled: Bt,
                                      onClick: () => St("full"),
                                      className: "inline-flex h-8 items-center gap-1 rounded-lg border border-sky-400/50 bg-sky-500/30 px-2 text-[11px] text-white hover:bg-sky-500/40 disabled:opacity-40",
                                      children: [
                                        l.jsx(Ki, {
                                          size: 14,
                                          "aria-hidden": true
                                        }),
                                        "\uC804\uCCB4 \uC778\uC2DD"
                                      ]
                                    }),
                                    l.jsxs("button", {
                                      type: "button",
                                      onClick: Qr,
                                      className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                      children: [
                                        l.jsx(Gn, {
                                          size: 14,
                                          "aria-hidden": true
                                        }),
                                        "\uCDE8\uC18C"
                                      ]
                                    })
                                  ]
                                }) : null,
                                Bt ? l.jsx("p", {
                                  className: "text-center text-[11px] text-white/70",
                                  children: "\uC778\uC2DD \uC911\u2026"
                                }) : null,
                                vn ? l.jsx("p", {
                                  className: "text-center text-[11px] text-red-300",
                                  children: vn
                                }) : null,
                                $e ? l.jsxs("div", {
                                  className: "flex flex-col gap-2",
                                  children: [
                                    l.jsx("p", {
                                      className: "max-h-28 overflow-y-auto break-all text-xs leading-5 text-white",
                                      children: $e
                                    }),
                                    l.jsxs("div", {
                                      className: "flex flex-wrap items-center justify-center gap-2",
                                      children: [
                                        l.jsxs("button", {
                                          type: "button",
                                          onClick: is,
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            l.jsx(or, {
                                              size: 14,
                                              "aria-hidden": true
                                            }),
                                            Yo ? "\uBCF5\uC0AC\uB428" : "\uD14D\uC2A4\uD2B8 \uBCF5\uC0AC"
                                          ]
                                        }),
                                        /^https?:\/\//i.test($e.trim()) ? l.jsxs("button", {
                                          type: "button",
                                          onClick: () => {
                                            const s = $e.trim();
                                            window.open(s, "_blank", "noopener,noreferrer");
                                          },
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            l.jsx(Wi, {
                                              size: 14,
                                              "aria-hidden": true
                                            }),
                                            "\uC5F4\uAE30"
                                          ]
                                        }) : null,
                                        l.jsxs("button", {
                                          type: "button",
                                          onClick: () => dt(null),
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            l.jsx(Gn, {
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
                            l.jsxs("p", {
                              className: "max-w-xl text-center text-[10px] text-white/55",
                              children: [
                                g ? `\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ${ie}+[ ] / ${ie}+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ${ie}+C \uC774\uBBF8\uC9C0 \uBCF5\uC0AC \xB7 ${ie}+Z / ${Ea}` : `\uD720 \uC90C \xB7 \uB4DC\uB798\uADF8\uB85C \uC774\uB3D9 \xB7 ${ie}+C \uBCF4\uC774\uB294 \uC774\uBBF8\uC9C0 \uBCF5\uC0AC`,
                                Xo && g ? " \xB7 Ink API" : "",
                                ut ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""
                              ]
                            }),
                            Pr ? l.jsx("p", {
                              className: "max-w-xl text-center text-[10px] text-red-300",
                              children: Pr
                            }) : null
                          ]
                        })
                      }),
                      l.jsx("button", {
                        type: "button",
                        className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80",
                        "aria-label": "\uB2EB\uAE30",
                        onClick: Ut,
                        children: l.jsx(Gn, {
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
        l.jsx(xi, {
          isOpen: Nn,
          title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30",
          message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.",
          confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30",
          cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1",
          variant: "danger",
          overlayClassName: "z-100070",
          onConfirm: ls,
          onCancel: cs
        })
      ]
    });
  };
  const Hc = /^[a-z][a-z0-9+.-]*:/i;
  function Ia(e) {
    const t = String(e || "").trim();
    return t ? bi(t) ? true : !Hc.test(t) : false;
  }
  function Bc({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
    const o = String(e.attrs.src || ""), i = String(e.attrs.alt || ""), c = String(e.attrs.title || ""), d = n.isEditable, [p, f] = h.useState(false), [m, g] = h.useState(null), [x, w] = h.useState(false);
    h.useEffect(() => {
      w(false);
    }, [
      o
    ]);
    const k = !Ia(o) || x && !ia(o), j = h.useCallback((N) => {
      if (N.detail > 1) return;
      N.preventDefault(), N.stopPropagation();
      const S = typeof r == "function" ? r() : null;
      typeof S == "number" && n.chain().focus().setNodeSelection(S).run();
    }, [
      n,
      r
    ]), P = h.useCallback((N) => {
      N.preventDefault(), N.stopPropagation(), !(!Ia(o) || x) && (g(o), f(true));
    }, [
      x,
      o
    ]), _ = h.useCallback(async (N, S) => {
      if (!d) return;
      const E = await jo(S), D = typeof r == "function" ? r() : null, I = URL.createObjectURL(S);
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
      const H = D + e.nodeSize;
      n.chain().focus().insertContentAt(H, {
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
    return l.jsxs(be, {
      as: "span",
      className: `haim-stock-image-wrap${t ? " is-selected" : ""}`,
      "data-drag-handle": true,
      style: {
        width: "100%",
        maxWidth: "100%"
      },
      onClick: j,
      onDoubleClick: P,
      children: [
        k ? l.jsxs("div", {
          className: "haim-stock-image-fallback",
          role: "img",
          "aria-label": i || "\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",
          children: [
            l.jsx("span", {
              className: "haim-stock-image-fallback-title",
              children: "\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"
            }),
            i ? l.jsx("span", {
              className: "haim-stock-image-fallback-alt",
              children: i
            }) : null,
            o ? l.jsx("span", {
              className: "haim-stock-image-fallback-src",
              children: o
            }) : null
          ]
        }) : l.jsx("img", {
          src: o,
          alt: i,
          ...c ? {
            title: c
          } : {},
          className: "haim-stock-image max-w-full h-auto cursor-pointer",
          draggable: false,
          onError: () => {
            ia(o) || w(true);
          }
        }),
        l.jsx(To, {
          src: k ? null : m || o || null,
          alt: i,
          open: p,
          onClose: () => {
            f(false), g(null);
          },
          ...d ? {
            onSaveAnnotated: _
          } : {}
        })
      ]
    });
  }
  let dr = null;
  Uf = function(e) {
    dr = e;
  };
  function fr(e) {
    const t = String(e || "").trim().replace(/^\/+/, "");
    return !t || typeof dr != "function" ? false : (dr(t), true);
  }
  function Oc(e, t) {
    if (typeof document > "u") return;
    const n = document.createElement("a");
    n.href = e, n.target = t, n.rel = "noopener noreferrer", n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
  }
  Na = function(e, t) {
    const n = String(e || "").trim();
    if (!n) return;
    if (Mr(n)) {
      typeof document < "u" && Ll(n, document);
      return;
    }
    const r = no(n);
    if (r) {
      fr(r);
      return;
    }
    if (ro(n)) return;
    const a = String((t == null ? void 0 : t.target) || "_blank").trim(), o = !a || a === "_self" ? "_blank" : a;
    if (go() && ao(n, {
      target: o
    })) {
      ki(n);
      return;
    }
    Oc(n, o);
  };
  const Aa = "haim-mod-held";
  function _c(e, t) {
    let n = null;
    if (t.target instanceof HTMLAnchorElement) n = t.target;
    else {
      const r = t.target;
      if (!r) return null;
      n = r.closest("a");
    }
    return !n || !e.view.dom.contains(n) ? null : n;
  }
  function zc(e, t, n) {
    const r = ws(e.state, t.name), a = String(r.href || "").trim();
    return a || String(n.getAttribute("href") || n.href || "").trim();
  }
  function Fc() {
    return new Ie({
      key: new Ne("haimLinkModCursor"),
      view(e) {
        const t = (c) => {
          e.dom.classList.toggle(Aa, c);
        }, n = (c) => {
          t(!!(c.ctrlKey || c.metaKey));
        }, r = (c) => {
          (c.key === "Control" || c.key === "Meta" || c.ctrlKey || c.metaKey) && t(true);
        }, a = (c) => {
          n(c);
        }, o = () => t(false), i = (c) => {
          n(c);
        };
        return window.addEventListener("keydown", r, true), window.addEventListener("keyup", a, true), window.addEventListener("blur", o), e.dom.addEventListener("mousemove", i), {
          destroy() {
            window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", a, true), window.removeEventListener("blur", o), e.dom.removeEventListener("mousemove", i), e.dom.classList.remove(Aa);
          }
        };
      }
    });
  }
  function Kc(e, t, n, r) {
    if (r.button !== 0) return false;
    const a = _c(e, r);
    if (!a) return false;
    const o = zc(n, t, a);
    if (!o) return false;
    const i = no(o), c = wi(), d = r.metaKey || r.ctrlKey, p = Mr(o);
    if (n.editable) {
      if (r.preventDefault(), !(d || c)) return true;
      if (p) return r.stopPropagation(), pa(e, o), true;
      if (i) return r.stopPropagation(), fr(i), true;
      const m = (a.getAttribute("target") || a.target || "_blank").trim();
      return Na(o, {
        target: m
      }), true;
    }
    if (p) return r.preventDefault(), r.stopPropagation(), pa(e, o), true;
    if (i) return r.preventDefault(), r.stopPropagation(), fr(i), true;
    if (go()) {
      const f = (a.getAttribute("target") || a.target || "_blank").trim();
      if (ao(o, {
        target: f
      })) return r.preventDefault(), r.stopPropagation(), Na(o, {
        target: f
      }), true;
    }
    return false;
  }
  function Wc(e, t) {
    return new Ie({
      key: new Ne("haimLinkClick"),
      props: {
        handleDOMEvents: {
          click: (n, r) => Kc(e, t, n, r)
        }
      }
    });
  }
  const qc = ks.extend({
    renderHTML({ HTMLAttributes: e }) {
      const t = String(e.href || ""), n = ro(t), r = Mr(t);
      return [
        "a",
        ke(this.options.HTMLAttributes, e, {
          class: n ? "haim-docuhaim-link" : null,
          ...r ? {
            target: null,
            rel: null
          } : {}
        }),
        0
      ];
    },
    addProseMirrorPlugins() {
      var _a2;
      return [
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [],
        Fc(),
        Wc(this.editor, this.type)
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
  }), hr = "\u2060~\u2060";
  function Vc(e) {
    if (!e || !e.includes("\\~")) return e;
    let t = "", n = 0;
    for (; n < e.length; ) {
      const r = Uc(e, n);
      if (r) {
        const a = Xc(e, r.contentFrom, r.marker);
        t += e.slice(n, a), n = a;
        continue;
      }
      if (e[n] === "`") {
        let a = 1;
        for (; e[n + a] === "`"; ) a += 1;
        if (a < 3) {
          const o = e.indexOf("`".repeat(a), n + a), i = o === -1 ? e.length : o + a;
          t += e.slice(n, i), n = i;
          continue;
        }
      }
      if (e[n] === "\\" && e[n + 1] === "~" && e[n - 1] !== "\\") {
        t += hr, n += 2;
        continue;
      }
      t += e[n], n += 1;
    }
    return t;
  }
  Xf = function(e) {
    return !e || !e.includes(hr) ? e : e.split(hr).join("\\~");
  };
  function Uc(e, t) {
    if (t > 0 && e[t - 1] !== `
`) return null;
    let n = t, r = 0;
    for (; e[n] === " " && r < 3; ) n += 1, r += 1;
    const a = /^(```+|~~~+)/.exec(e.slice(n));
    if (!(a == null ? void 0 : a[1])) return null;
    const o = e.indexOf(`
`, n), i = o === -1 ? e.length : o + 1;
    return {
      marker: a[1],
      contentFrom: i
    };
  }
  function Xc(e, t, n) {
    const r = `
${n}`, a = e.indexOf(r, t);
    if (a === -1) return e.length;
    const o = a + r.length, i = e.indexOf(`
`, o);
    return i === -1 ? e.length : i + 1;
  }
  function Pa(e) {
    var _a2;
    if (!e || typeof e != "object") return;
    const t = e;
    if (t.__haimRawTextPatched) return;
    t.encodeTextForMarkdown = (r) => r, t.escapeMarkdownSyntax = (r) => r;
    const n = (_a2 = t.parse) == null ? void 0 : _a2.bind(t);
    typeof n == "function" && (t.parse = (r) => n(Vc(r))), t.__haimRawTextPatched = true;
  }
  const Yc = ys.extend({
    onBeforeCreate(e) {
      var _a2, _b, _c2;
      (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
      const t = (_b = this.storage) == null ? void 0 : _b.manager;
      t && Pa(t), ((_c2 = this.editor) == null ? void 0 : _c2.markdown) && Pa(this.editor.markdown);
    }
  }), Qc = /^[ \t]*[a-zA-Z]+[.)][ \t]+/;
  function pr(e) {
    return Qc.test(e);
  }
  function Gc(e) {
    const t = e.split(`
`);
    if (pr(t[0] ?? "")) return null;
    const n = t.findIndex((r, a) => a > 0 && pr(r));
    return n === -1 ? e : t.slice(0, n).join(`
`);
  }
  const Zt = eo.config.markdownTokenizer;
  function Zc() {
    if (!Zt) return;
    const e = Zt.tokenize.bind(Zt);
    return {
      ...Zt,
      tokenize(t, n, r) {
        const a = Gc(t);
        if (a != null) return e(a, n, r);
      }
    };
  }
  const $a = Zc(), Jc = eo.extend({
    ...$a ? {
      markdownTokenizer: $a
    } : {},
    addProseMirrorPlugins() {
      return [
        new Ie({
          props: {
            handlePaste(e, t) {
              var _a2, _b, _c2, _d2;
              if ((_b = (_a2 = t.clipboardData) == null ? void 0 : _a2.getData("text/html")) == null ? void 0 : _b.trim()) return false;
              const r = (_c2 = t.clipboardData) == null ? void 0 : _c2.getData("text/plain");
              if (!r) return false;
              const a = r.split(`
`).find((c) => c.trim().length > 0) ?? "";
              if (pr(a)) return false;
              const o = Cs(r);
              if (!o) return false;
              const i = (_d2 = o.attrs) == null ? void 0 : _d2.type;
              if (typeof i == "string" && i !== "1") return false;
              try {
                const c = e.state.schema.nodeFromJSON(o);
                return e.dispatch(e.state.tr.replaceSelectionWith(c)), true;
              } catch {
                return false;
              }
            }
          }
        })
      ];
    }
  }), eu = /^\s*(\[([ xX~]?)\])\s$/, tu = /^\s*[-*+]\s*\[([ xX~])\]\s$/;
  function Ra(e) {
    return xo(e === void 0 || e === "" ? " " : e);
  }
  function mr(e) {
    const t = At(e), n = tn(e);
    return {
      status: t,
      checked: t === "done",
      kind: t === "doing" ? "status" : n
    };
  }
  function Da(e, t, n) {
    var _a2, _b;
    const r = e.schema.nodes.taskItem, a = e.schema.nodes.taskList;
    if (!r || !a) return null;
    const o = e.doc.resolve(t.from);
    let i = -1, c = -1;
    for (let g = o.depth; g >= 1; g -= 1) {
      const x = o.node(g).type.name;
      i < 0 && x === "listItem" && (i = g), c < 0 && (x === "bulletList" || x === "orderedList") && (c = g);
    }
    const d = e.tr.delete(t.from, t.to);
    if (i > 0 && c > 0) {
      const g = o.before(c), x = o.index(c), w = d.mapping.map(g), k = d.doc.nodeAt(w);
      if (!k) return null;
      const j = [];
      k.forEach((N, S, E) => {
        const D = E === x ? n : N.type.name === "taskItem" ? mr(N.attrs) : {
          status: "todo",
          checked: false,
          kind: "check"
        };
        j.push(r.create(D, N.content, N.marks));
      });
      const P = a.create(k.attrs, j);
      d.replaceWith(w, w + k.nodeSize, P), Yn(d.doc, w) && ((_a2 = d.doc.resolve(w).nodeBefore) == null ? void 0 : _a2.type) === a && d.join(w);
      const _ = d.doc.nodeAt(w);
      if (_) {
        const N = w + _.nodeSize;
        Yn(d.doc, N) && ((_b = d.doc.nodeAt(N)) == null ? void 0 : _b.type) === a && d.join(N);
      }
      return;
    }
    const p = d.doc.resolve(t.from).blockRange(), f = p && js(p, r, n);
    if (!f) return null;
    d.wrap(p, f);
    const m = d.doc.resolve(t.from - 1).nodeBefore;
    m && m.type === r && Yn(d.doc, t.from - 1) && d.join(t.from - 1);
  }
  function Jn(e, t, n, r) {
    t.dataset.status = n, t.dataset.kind = r, t.dataset.checked = n === "done" ? "true" : "false", e.dataset.status = n, e.dataset.kind = r, e.className = r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", e.checked = n === "done", e.indeterminate = n === "doing", e.setAttribute("aria-checked", n === "doing" ? "mixed" : n === "done" ? "true" : "false"), e.setAttribute("aria-label", r === "status" ? n === "doing" ? "Status task in progress" : n === "done" ? "Status task completed" : "Status task not started" : n === "done" ? "Task completed" : "Task not started");
  }
  const nu = Ss.extend({
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
            return ma(t, n === "todo" || n === "doing" || n === "done" ? n : void 0);
          },
          renderHTML: (e) => ({
            "data-kind": tn(e)
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
      const n = At(e.attrs), r = tn(e.attrs);
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
      const r = e.status === "todo" || e.status === "doing" || e.status === "done" ? e.status : e.checked ? "done" : "todo", a = e.kind === "status" || e.kind === "check" ? ma(e.kind, r) : r === "doing" ? "status" : "check";
      return t.createNode("taskItem", {
        status: r,
        checked: r === "done",
        kind: a
      }, n);
    },
    renderMarkdown: (e, t) => {
      const n = At(e == null ? void 0 : e.attrs), r = tn(e == null ? void 0 : e.attrs), o = `- [${Rl(n, r)}] `;
      return Ms(e, t, o);
    },
    addNodeView() {
      return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
        const a = document.createElement("li"), o = document.createElement("label"), i = document.createElement("input"), c = document.createElement("div");
        let d = e;
        o.contentEditable = "false", i.type = "checkbox";
        const p = (g) => {
          const x = mr(g.attrs);
          Jn(i, a, x.status, x.kind);
        };
        p(e);
        const f = (g) => {
          if (typeof n != "function") return;
          const x = n();
          if (typeof x != "number") return;
          const { state: w, dispatch: k } = r.view, j = w.doc.nodeAt(x);
          !j || j.type !== this.type || k(w.tr.setNodeMarkup(x, void 0, {
            ...j.attrs,
            status: g.status,
            checked: g.checked,
            kind: g.kind
          }));
        }, m = (g) => {
          var _a2;
          g.preventDefault(), g.stopPropagation();
          const x = mr(d.attrs), w = ((_a2 = r.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check";
          if (!r.isEditable && !this.options.onReadOnlyChecked) {
            p(d);
            return;
          }
          const k = $l(x.status, w), j = {
            status: k,
            checked: k === "done",
            kind: w
          };
          if (r.isEditable) {
            Jn(i, a, j.status, j.kind), f(j);
            return;
          }
          this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(d, j.checked) ? Jn(i, a, j.status, j.kind) : p(d));
        };
        return o.addEventListener("pointerdown", (g) => {
          g.button === 0 && m(g);
        }), i.addEventListener("click", (g) => {
          g.preventDefault(), g.stopPropagation();
        }), i.addEventListener("change", (g) => {
          g.preventDefault(), p(d);
        }), Object.entries(this.options.HTMLAttributes).forEach(([g, x]) => {
          a.setAttribute(g, String(x));
        }), a.append(o, c), o.append(i), Object.entries(t).forEach(([g, x]) => {
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
        new rr({
          find: eu,
          handler: ({ state: e, range: t, match: n }) => {
            var _a2;
            const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = Ra(n[2]);
            return Da(e, t, {
              status: a.status,
              checked: a.checked,
              kind: r
            });
          }
        }),
        new rr({
          find: tu,
          handler: ({ state: e, range: t, match: n }) => {
            var _a2;
            const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = Ra(n[1]);
            return Da(e, t, {
              status: a.status,
              checked: a.checked,
              kind: r
            });
          }
        })
      ];
    }
  }), ru = /^\s*[-+*]\s+\[([ xX~])\]\s+/, Ha = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;
  function Ba(e) {
    var _a2;
    const t = xo(e[3]);
    return {
      indentLevel: ((_a2 = e[1]) == null ? void 0 : _a2.length) ?? 0,
      mainContent: e[4] ?? "",
      checked: t.checked,
      status: t.status,
      kind: t.kind
    };
  }
  function Oa(e, t, n = []) {
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
  const au = vs.extend({
    markdownTokenizer: {
      name: "taskList",
      level: "block",
      start(e) {
        var _a2;
        const t = (_a2 = e.match(ru)) == null ? void 0 : _a2.index;
        return t !== void 0 ? t : -1;
      },
      tokenize(e, t, n) {
        const r = (o) => {
          const i = na(o, {
            itemPattern: Ha,
            extractItemData: Ba,
            createToken: (c, d) => Oa(c, n, d ?? []),
            customNestedParser: r
          }, n);
          if (i) {
            const c = {
              type: "taskList",
              raw: i.raw,
              items: i.items
            }, d = o.slice(i.raw.length);
            return d.trim() ? [
              c,
              ...n.blockTokens(d)
            ] : [
              c
            ];
          }
          return n.blockTokens(o);
        }, a = na(e, {
          itemPattern: Ha,
          extractItemData: Ba,
          createToken: (o, i) => Oa(o, n, i ?? []),
          customNestedParser: r
        }, n);
        if (a) return {
          type: "taskList",
          raw: a.raw,
          items: a.items
        };
      }
    }
  }), ou = /^:([a-zA-Z0-9_+-]+):/, su = Es.extend({
    markdownTokenizer: {
      name: "emoji",
      level: "inline",
      start: (e) => e.indexOf(":"),
      tokenize: (e) => {
        const t = ou.exec(e);
        if (!t) return;
        const n = t[1] ?? "", r = ga(n);
        if (r) return {
          type: "emoji",
          raw: t[0],
          emojiName: r
        };
      }
    },
    parseMarkdown: (e, t) => {
      const n = ga((e == null ? void 0 : e.emojiName) || (e == null ? void 0 : e.name));
      if (!n) {
        const r = String((e == null ? void 0 : e.raw) || "");
        return r ? t.createTextNode(r) : null;
      }
      return t.createNode("emoji", {
        name: n
      });
    }
  }).configure({
    emojis: Ts,
    enableEmoticons: true
  });
  function iu(e) {
    const { state: t, view: n } = e, { selection: r, doc: a } = t, o = r.$anchor;
    let i = o.depth;
    for (; i > 0 && !o.node(i).isTextblock; ) i -= 1;
    if (i === 0) return e.commands.selectAll();
    const c = o.start(i), d = o.end(i);
    if (!r.empty && r.from <= c && r.to >= d) return e.commands.selectAll();
    const f = B.create(a, c, d);
    return n.dispatch(t.tr.setSelection(f).scrollIntoView()), true;
  }
  const lu = Ls.extend({
    name: "nodeRange",
    addKeyboardShortcuts() {
      var _a2;
      const n = {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}
      };
      return delete n["Shift-ArrowUp"], delete n["Shift-ArrowDown"], n["Mod-a"] = ({ editor: r }) => iu(r), n;
    }
  }), cu = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, uu = Ae.create({
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
        const t = cu.exec(e);
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
          if (!n || !Is(t, n)) return false;
          const { selection: r } = t, { $to: a } = r, o = e();
          return Ns(r) ? o.insertContentAt(a.pos, {
            type: this.name
          }) : o.insertContent({
            type: this.name
          }), o.command(({ state: i, tr: c, dispatch: d }) => {
            var _a2;
            if (d) {
              const { $to: p } = c.selection, f = p.end();
              if (p.nodeAfter) p.nodeAfter.isTextblock ? c.setSelection(B.create(c.doc, p.pos + 1)) : p.nodeAfter.isBlock ? c.setSelection(to.create(c.doc, p.pos)) : c.setSelection(B.create(c.doc, p.pos));
              else {
                const g = (_a2 = i.schema.nodes.paragraph || p.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
                g && (c.insert(f, g), c.setSelection(B.create(c.doc, f + 1)));
              }
              c.scrollIntoView();
            }
            return true;
          }).run();
        }
      };
    }
  }), vr = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", du = [
    "nw",
    "ne",
    "sw",
    "se"
  ];
  function _a(e) {
    if (!e) return;
    const t = {};
    for (const n of e.split(";")) {
      const r = n.trim();
      if (!r) continue;
      const a = r.indexOf(":");
      if (a < 0) continue;
      const o = r.slice(0, a).trim(), i = r.slice(a + 1).trim(), c = o.replace(/-([a-z])/g, (d, p) => p.toUpperCase());
      t[c] = i;
    }
    return t;
  }
  function za(e, t, n, r) {
    const a = Cr({
      path: e,
      width: t,
      height: n,
      background: r
    }), o = a.indexOf("|");
    if (o < 0) return "";
    const i = a.lastIndexOf("]]");
    return a.slice(o + 1, i >= 0 ? i : void 0).trim();
  }
  function Jt(e) {
    return `${Math.max(24, Math.round(e))}px`;
  }
  function fu(e) {
    return e ? e.closest(".overflow-auto") || e.parentElement : null;
  }
  function hu({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
    var _a2, _b;
    const o = String(e.attrs.path || ""), i = String(e.attrs.options || ""), c = String(e.attrs.alt || o), d = e.attrs.width || null, p = e.attrs.height || null, f = e.attrs.background || null, m = n.isEditable, g = h.useRef(null), x = h.useRef(null), [w, k] = h.useState(false), [j, P] = h.useState(false), [_, N] = h.useState(null), [S, E] = h.useState(null);
    x.current = S;
    const D = h.useMemo(() => S ? {
      ..._a(sn({
        width: null,
        height: null,
        background: f
      })),
      width: `${S.width}px`,
      height: `${S.height}px`
    } : _a(sn({
      width: d,
      height: p,
      background: f
    })), [
      d,
      p,
      f,
      S
    ]), I = h.useCallback((T, L) => {
      const z = {
        width: T,
        height: L,
        options: za(o, T, L, f)
      }, R = fu(n.view.dom), K = (R == null ? void 0 : R.scrollTop) ?? null, F = typeof r == "function" ? r() : null;
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
    ]), H = h.useCallback(() => {
      const T = x.current;
      T && (I(Jt(T.width), Jt(T.height)), E(null), x.current = null);
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
      const Y = (Q) => {
        const V = Q.clientX - J, Pe = Q.clientY - Fe;
        let se = K, te = F;
        T.includes("e") && (se = K + V), T.includes("w") && (se = K - V), T.includes("s") && (te = F + Pe), T.includes("n") && (te = F - Pe), se = Math.max(24, se), te = Math.max(24, te), (Q.shiftKey || Q.pointerType === "touch") && (Math.abs(V) >= Math.abs(Pe) ? te = se / Ke : se = te * Ke, se = Math.max(24, se), te = Math.max(24, te));
        const We = {
          width: se,
          height: te
        };
        x.current = We, E(We);
      }, Z = (Q) => {
        var _a4, _b3;
        window.removeEventListener("pointermove", Y), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", Z);
        try {
          (_b3 = (_a4 = Q.target).releasePointerCapture) == null ? void 0 : _b3.call(_a4, ne);
        } catch {
        }
        const V = x.current;
        V && I(Jt(V.width), Jt(V.height)), x.current = null, E(null);
      };
      window.addEventListener("pointermove", Y), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", Z);
    }, [
      m,
      I
    ]);
    h.useEffect(() => {
      if (!t || !m || w || j) return;
      const T = (L) => {
        if (L.key !== "Enter") return;
        const z = L.target;
        z instanceof HTMLInputElement || z instanceof HTMLTextAreaElement || z instanceof HTMLElement && z.isContentEditable || (L.preventDefault(), L.stopPropagation(), H());
      };
      return document.addEventListener("keydown", T, true), () => document.removeEventListener("keydown", T, true);
    }, [
      t,
      m,
      w,
      j,
      H
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
      z && (N(z), P(true));
    }, []), oe = h.useCallback(async (T, L) => {
      if (!m) return;
      const z = await jo(L), R = typeof r == "function" ? r() : null;
      if (T === "overwrite") {
        const F = {
          path: z,
          alt: z,
          options: za(z, d, p, f)
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
    return l.jsxs(be, {
      as: "div",
      className: `haim-wiki-image-wrap${t ? " is-selected" : ""}${S ? " is-resizing" : ""}`,
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
        l.jsxs("div", {
          className: "haim-wiki-image-frame",
          children: [
            l.jsx("img", {
              ref: g,
              src: vr,
              alt: c,
              className: "haim-wiki-image",
              "data-wiki-path": o,
              ...i ? {
                "data-wiki-options": i
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
            t && m ? du.map((T) => l.jsx("button", {
              type: "button",
              className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${T}`,
              "aria-label": `resize-${T}`,
              "data-resize-handle": T,
              onPointerDown: (L) => G(T, L)
            }, T)) : null
          ]
        }),
        l.jsx(Hl, {
          isOpen: w,
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
        l.jsx(To, {
          src: _,
          alt: c,
          open: j,
          onClose: () => {
            P(false), N(null);
          },
          ...m ? {
            onSaveAnnotated: oe
          } : {}
        })
      ]
    });
  }
  function Lo(e, t, n = "") {
    const r = t ? yi(t) : null;
    return {
      path: e,
      options: t || "",
      alt: n || e,
      width: (r == null ? void 0 : r.width) ?? null,
      height: (r == null ? void 0 : r.height) ?? null,
      background: (r == null ? void 0 : r.background) ?? null
    };
  }
  const pu = Ae.create({
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
            return Lo(t, n, e.getAttribute("data-wiki-alt") || t);
          }
        }
      ];
    },
    renderHTML({ node: e, HTMLAttributes: t }) {
      const n = String(e.attrs.path || ""), r = String(e.attrs.options || ""), a = String(e.attrs.alt || n), o = e.attrs.width || null, i = e.attrs.height || null, c = e.attrs.background || null, d = sn({
        width: o,
        height: i,
        background: c
      });
      return [
        "img",
        ke(t, {
          src: vr,
          alt: a,
          "data-wiki-path": n,
          ...r ? {
            "data-wiki-options": r
          } : {},
          ...o ? {
            "data-wiki-width": o
          } : {},
          ...i ? {
            "data-wiki-height": i
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
      return st(hu);
    },
    renderMarkdown: (e) => {
      var _a2, _b, _c2, _d2, _e2;
      const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.path) || "");
      if (!t) return "";
      const n = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c2 = e.attrs) == null ? void 0 : _c2.height) || null, a = ((_d2 = e.attrs) == null ? void 0 : _d2.background) || null;
      if (n || r || a) return `${Cr({
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
  Yf = function(e, t = "", n = "") {
    const r = Lo(e, t, n), a = sn({
      width: r.width,
      height: r.height,
      background: r.background
    }), o = [
      `src="${vr}"`,
      `alt="${Oe(r.alt)}"`,
      `data-wiki-path="${Oe(r.path)}"`,
      'class="haim-wiki-image"'
    ];
    return r.options && o.push(`data-wiki-options="${Oe(r.options)}"`), r.width && o.push(`data-wiki-width="${Oe(r.width)}"`), r.height && o.push(`data-wiki-height="${Oe(r.height)}"`), r.background && o.push(`data-wiki-bg="${Oe(r.background)}"`), a && o.push(`style="${Oe(a)}"`), `<img ${o.join(" ")} />`;
  };
  function Oe(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
  const mu = Ae.create({
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
          if (d || p || f) o = Cr({
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
      const i = a ? String(t.renderChildren(a.content || []) || "").trim() : "";
      return o ? i ? `${o}
${i}

` : `${o}

` : i ? `${i}

` : "";
    }
  }), gu = Ae.create({
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
  }), xu = Ae.create({
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
  Qf = function() {
    return `${Dl()}

`;
  };
  function bu(e) {
    const t = getComputedStyle(e), n = t.lineHeight;
    if (n && n !== "normal") {
      const a = Number.parseFloat(n);
      if (Number.isFinite(a) && a > 0) return a;
    }
    const r = Number.parseFloat(t.fontSize);
    return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
  }
  const Fa = /* @__PURE__ */ new WeakMap();
  function Io(e) {
    const t = getComputedStyle(e), n = `${t.font}|${t.fontSize}|${t.lineHeight}|${t.fontFamily}|${t.fontWeight}`, r = Fa.get(e);
    if (r && r.key === n) return r.value;
    let o = bu(e);
    try {
      const i = document.createElement("div");
      i.setAttribute("aria-hidden", "true"), i.style.cssText = [
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
      ].join(";"), i.textContent = "M", document.body.appendChild(i);
      const c = i.getBoundingClientRect().height || i.offsetHeight;
      i.remove(), c > 0 && (o = c);
    } catch {
    }
    return Fa.set(e, {
      key: n,
      value: o
    }), o;
  }
  function ku(e) {
    const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), n = Number.parseFloat(t);
    return Number.isFinite(n) && n > 0 ? n : 4;
  }
  function No(e) {
    const t = e.closest("pre");
    if (t) {
      const n = getComputedStyle(t), r = (Number.parseFloat(n.paddingLeft) || 0) + (Number.parseFloat(n.paddingRight) || 0), a = t.clientWidth - r;
      if (a > 0) return a;
    }
    return e.clientWidth;
  }
  function wu(e) {
    return e.classList.contains("ProseMirror-trailingBreak");
  }
  function Ao(e) {
    return Array.from(e.querySelectorAll("br")).filter((t) => !wu(t));
  }
  function yu(e) {
    return Math.max(1, Ao(e).length + 1);
  }
  function Cu(e, t) {
    const n = oo(t);
    return e ? Math.max(n, yu(e)) : n;
  }
  function Su(e, t) {
    const n = Array.from(e.getClientRects()).filter((i) => i.height > 0 || i.width > 0);
    if (n.length === 0) return t;
    let r = 1 / 0, a = -1 / 0;
    for (const i of n) r = Math.min(r, i.top), a = Math.max(a, i.bottom);
    const o = a - r;
    return o > 0.5 ? o : t;
  }
  function Mu(e, t, n, r) {
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
  function ju(e, t, n, r) {
    const a = n > 0 ? t[n - 1] : null, o = t[n] ?? null;
    if (a && o) {
      const i = o.getBoundingClientRect().top - a.getBoundingClientRect().top;
      if (i > 0.5) return i;
    }
    if (!a && o) {
      const i = e.getBoundingClientRect().top, c = o.getBoundingClientRect().top - i;
      if (c > 0.5) return c;
    }
    if (a && !o) {
      const i = e.getBoundingClientRect().bottom - a.getBoundingClientRect().top;
      if (i > 0.5) return i;
    }
    return r;
  }
  function vu(e, t, n) {
    const r = Ao(e);
    if (r.length === 0 && t > 1) return null;
    const a = [], o = document.createRange();
    try {
      for (let i = 0; i < t; i += 1) if (Mu(o, e, r, i), o.collapsed) a.push(ju(e, r, i, n));
      else {
        const c = Su(o, n);
        a.push(Math.max(c, n * 0.95));
      }
    } catch {
      return null;
    }
    return a.length === t ? a : null;
  }
  function Eu(e, t, n, r) {
    const a = No(e);
    if (a <= 0) return Array.from({
      length: n
    }, () => r);
    const i = Bl(t, Ol(e), a, ku(e)).map((c) => Math.max(1, c) * r);
    for (; i.length < n; ) i.push(r);
    return i.slice(0, n);
  }
  function Tu(e, t, n, r) {
    const a = No(e);
    if (a <= 0) return Array.from({
      length: n
    }, () => r);
    const o = t.length === 0 ? [
      ""
    ] : String(t).split(`
`);
    for (; o.length < n; ) o.push("");
    o.length > n && (o.length = n);
    const i = getComputedStyle(e), c = i.whiteSpace === "pre" || i.whiteSpace === "nowrap" ? "pre-wrap" : i.whiteSpace || "pre-wrap", d = document.createElement("div");
    d.setAttribute("aria-hidden", "true"), d.style.cssText = [
      "position:absolute",
      "visibility:hidden",
      "pointer-events:none",
      "left:0",
      "top:0",
      `width:${a}px`,
      `font:${i.font}`,
      `font-size:${i.fontSize}`,
      `font-family:${i.fontFamily}`,
      `font-weight:${i.fontWeight}`,
      `font-style:${i.fontStyle}`,
      `letter-spacing:${i.letterSpacing}`,
      `line-height:${i.lineHeight}`,
      `white-space:${c}`,
      `overflow-wrap:${i.overflowWrap || "break-word"}`,
      `word-break:${i.wordBreak || "normal"}`,
      `tab-size:${i.tabSize || 4}`,
      "box-sizing:border-box",
      "padding:0",
      "margin:0",
      "border:0"
    ].join(";");
    for (const f of o) {
      const m = document.createElement("div");
      m.style.whiteSpace = c, m.style.overflowWrap = i.overflowWrap || "break-word", m.style.wordBreak = i.wordBreak || "normal", m.style.lineHeight = i.lineHeight, m.textContent = f.length > 0 ? f : "\xA0", d.appendChild(m);
    }
    document.body.appendChild(d);
    const p = [];
    for (let f = 0; f < n; f += 1) {
      const m = d.children[f], g = (m == null ? void 0 : m.getBoundingClientRect().height) || (m == null ? void 0 : m.offsetHeight) || 0;
      p.push(g > 0 ? g : r);
    }
    return d.remove(), p;
  }
  function Lu(e, t, n) {
    if (n <= 0) return [];
    const r = Io(e), a = vu(e, n, r);
    return a ? a.map((o) => o > 0 ? o : r) : e.closest("pre") || e.tagName === "PRE" ? Tu(e, t, n, r) : Eu(e, t, n, r);
  }
  function Ka(e) {
    return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
  }
  function Iu(e, t) {
    if (e === t) return true;
    if (!e || !t || e.length !== t.length) return false;
    for (let n = 0; n < e.length; n += 1) if (Math.abs((e[n] ?? 0) - (t[n] ?? 0)) > 0.5) return false;
    return true;
  }
  function Po({ text: e, className: t, contentRootRef: n }) {
    const r = oo(e), [a, o] = h.useState(r), [i, c] = h.useState(null), [d, p] = h.useState(null);
    h.useLayoutEffect(() => {
      const m = (n == null ? void 0 : n.current) ?? null, g = Ka(m);
      if (!g) {
        o(r), c(null), p(null);
        return;
      }
      let x = 0, w = null;
      const k = () => {
        cancelAnimationFrame(x), x = requestAnimationFrame(() => {
          const N = Ka((n == null ? void 0 : n.current) ?? null);
          if (!N) {
            o(r), c(null), p(null);
            return;
          }
          const S = Cu(N, e), E = Io(N), D = Lu(N, e, S), I = D.length === S && D.every((H) => H > 0) ? D : null;
          o((H) => H === S ? H : S), p((H) => H === E ? H : E), c((H) => Iu(H, I) ? H : I);
        });
      };
      k(), w = new ResizeObserver(k), w.observe(g), m && m !== g && w.observe(m);
      const j = g.closest("pre");
      j && j !== g && j !== m && w.observe(j);
      const P = new MutationObserver(k);
      P.observe(g, {
        subtree: true,
        childList: true,
        characterData: true
      });
      const _ = window.setTimeout(k, 0);
      return window.addEventListener(la, k), window.addEventListener("resize", k), () => {
        cancelAnimationFrame(x), window.clearTimeout(_), w == null ? void 0 : w.disconnect(), P.disconnect(), window.removeEventListener(la, k), window.removeEventListener("resize", k);
      };
    }, [
      e,
      r,
      n
    ]);
    const f = d != null && d > 0 ? {
      lineHeight: `${d}px`
    } : void 0;
    return l.jsx("div", {
      className: [
        "haim-line-numbers",
        t
      ].filter(Boolean).join(" "),
      style: f,
      "aria-hidden": true,
      children: Array.from({
        length: a
      }, (m, g) => {
        const x = i == null ? void 0 : i[g], w = x != null && x > 0 ? {
          height: x,
          minHeight: x,
          maxHeight: x,
          lineHeight: d != null && d > 0 ? `${Math.min(d, x)}px` : void 0
        } : void 0;
        return l.jsx("span", {
          className: "haim-line-numbers__n",
          style: w,
          children: g + 1
        }, g);
      })
    });
  }
  Nu = function(e) {
    const n = Ci(String(e || ""))[0];
    return n ? {
      meta: n.meta ?? so(),
      grid: n.grid
    } : null;
  };
  Au = function(e, t) {
    return `${Si(e)}
${Mi(t)}`;
  };
  Gf = function() {
    const e = so(), t = {
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
      text: Au(e, t)
    };
  };
  Pu = "haim-table-edit-request";
  function $u(e, t) {
    e.dispatchEvent(new CustomEvent(Pu, {
      detail: t,
      bubbles: true
    }));
  }
  function Ru({ node: e, editor: t, selected: n, getPos: r }) {
    const a = String(e.attrs.kind || "raw"), o = String(e.attrs.text || ""), i = t.isEditable, c = h.useRef(null), d = h.useMemo(() => {
      if (a !== "haim-table") return null;
      const f = Nu(o);
      return f ? _l(f.grid, f.meta) : null;
    }, [
      a,
      o
    ]), p = () => {
      if (!i || a !== "haim-table") return;
      const f = typeof r == "function" ? r() : null;
      typeof f == "number" && $u(t.view.dom, {
        pos: f,
        text: o
      });
    };
    return a === "haim-table" && d ? l.jsx(be, {
      as: "div",
      className: `haim-raw-md haim-raw-md--haim-table${n ? " is-selected" : ""}`,
      "data-haim-raw-md": "1",
      "data-kind": "haim-table",
      contentEditable: false,
      onDoubleClick: (f) => {
        f.preventDefault(), f.stopPropagation(), p();
      },
      children: l.jsx("div", {
        className: "haim-haim-table-preview",
        dangerouslySetInnerHTML: {
          __html: d
        }
      })
    }) : l.jsxs(be, {
      as: "div",
      className: `haim-raw-md${n ? " is-selected" : ""}`,
      "data-haim-raw-md": "1",
      "data-kind": a,
      contentEditable: false,
      children: [
        l.jsx(Po, {
          text: o,
          className: "haim-raw-md__line-numbers",
          contentRootRef: c
        }),
        l.jsx("pre", {
          ref: c,
          className: "haim-raw-md__pre",
          children: o
        })
      ]
    });
  }
  const Du = Ae.create({
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
      return st(Ru);
    },
    renderMarkdown: (e) => {
      var _a2;
      const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
      return t ? t.endsWith(`
`) ? t : `${t}
` : "";
    }
  }), Hu = Ae.create({
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
  });
  function Bu(e, t) {
    var _a2;
    const n = Number(((_a2 = e.attrs) == null ? void 0 : _a2.level) ?? 1), r = Number.isFinite(n) ? Math.min(6, Math.max(1, Math.trunc(n))) : 1, a = e.content ? t(e.content) : "";
    return `${"#".repeat(r)} ${a}`;
  }
  const Ou = /* @__PURE__ */ new Set([
    "paragraph",
    "heading",
    "deepHeading"
  ]);
  function $o(e) {
    const { from: t, to: n } = e.selection, r = [];
    return e.doc.nodesBetween(t, n, (a, o) => {
      if (a.isTextblock) return r.push({
        pos: o,
        node: a
      }), false;
    }), r;
  }
  function _u(e) {
    const { $from: t } = e.state.selection, n = t.parent;
    return !n.isTextblock || n.content.size !== 0 || n.type.name !== "paragraph" && n.type.name !== "heading" ? null : t.before(t.depth);
  }
  function zu(e, t, n) {
    const r = e.spec.attrs ?? {}, a = {};
    for (const o of Object.keys(r)) Object.prototype.hasOwnProperty.call(n, o) ? a[o] = n[o] : t.attrs[o] != null && (a[o] = t.attrs[o]);
    return a;
  }
  function Fu(e, t, n, r) {
    const a = e.schema.nodes.heading, o = e.schema.nodes.paragraph;
    if (!a || !o) return false;
    let i = false;
    for (const c of $o(e)) {
      if (!Ou.has(c.node.type.name) || c.node.textContent.trim() === "") continue;
      const d = e.doc.resolve(c.pos), p = d.index(), f = c.node.type === a && Number(c.node.attrs.level) === r, m = f ? o : a;
      d.parent.canReplaceWith(p, p + 1, m) && (i = true, n && t.setNodeMarkup(c.pos, m, zu(m, c.node, f ? {} : {
        level: r
      })));
    }
    return i;
  }
  Ro = function(e, t) {
    if ($o(e.state).length > 1) {
      let c = false;
      return e.chain().focus().command(({ state: d, tr: p, dispatch: f }) => (c = Fu(d, p, f, t), c)).run(), c;
    }
    const n = _u(e), r = e.chain().focus().toggleHeading({
      level: t
    }).run();
    if (!r || n == null) return r;
    const a = e.state.doc.nodeAt(n);
    if (!(a == null ? void 0 : a.isTextblock)) return true;
    const o = n + a.nodeSize - 1, i = e.state.selection;
    return i.empty && i.from === o || e.commands.setTextSelection(o), true;
  };
  const Ku = As.extend({
    renderMarkdown(e, t) {
      return Bu(e, (n) => t.renderChildren(n));
    },
    addKeyboardShortcuts() {
      var _a2;
      const t = {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}
      };
      for (const n of this.options.levels) t[`Mod-${n}`] = () => Ro(this.editor, n);
      return t;
    }
  }), A = {
    format: "\uC11C\uC2DD",
    heading: "\uC81C\uBAA9",
    block: "\uBE14\uB85D",
    insert: "\uC0BD\uC785",
    tool: "\uB3C4\uAD6C"
  };
  function Wu(e, t) {
    if (t >= 1 && t <= 6) {
      Ro(e, t);
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
      groupLabel: A.heading,
      Icon: t,
      run: ({ editor: n }) => {
        Wu(n, e);
      }
    };
  }
  const Do = [
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
      groupLabel: A.format,
      Icon: qi,
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
      groupLabel: A.format,
      Icon: Vi,
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
      groupLabel: A.format,
      Icon: Ui,
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
      groupLabel: A.format,
      Icon: Xi,
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
      groupLabel: A.format,
      Icon: Yi,
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
      groupLabel: A.format,
      Icon: Qi,
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
      groupLabel: A.format,
      Icon: Gi,
      run: ({ editor: e }) => {
        e.chain().focus().toggleSuperscript().run();
      }
    },
    ge(1, fl),
    ge(2, hl),
    ge(3, pl),
    ge(4, ml),
    ge(5, gl),
    ge(6, xl),
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
      groupLabel: A.block,
      Icon: ar,
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
      groupLabel: A.block,
      Icon: Zi,
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
      groupLabel: A.block,
      Icon: Ji,
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
      groupLabel: A.block,
      Icon: fa,
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
      groupLabel: A.block,
      Icon: fa,
      run: ({ editor: e }) => {
        const t = () => {
          e.chain().focus().command(({ tr: n, state: r, dispatch: a }) => {
            if (!a) return false;
            const o = r.selection.$from;
            for (let i = o.depth; i >= 0; i -= 1) if (o.node(i).type.name === "taskItem") return n.setNodeMarkup(o.before(i), void 0, {
              ...o.node(i).attrs,
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
      groupLabel: A.block,
      Icon: el,
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
      groupLabel: A.block,
      Icon: tl,
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
      groupLabel: A.insert,
      Icon: ha,
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
      groupLabel: A.insert,
      Icon: ha,
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
      groupLabel: A.insert,
      Icon: nl,
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
      groupLabel: A.insert,
      Icon: rl,
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
      groupLabel: A.insert,
      Icon: al,
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
      groupLabel: A.insert,
      Icon: ol,
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
      groupLabel: A.insert,
      Icon: Xt,
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
      groupLabel: A.insert,
      Icon: Xt,
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
      groupLabel: A.insert,
      Icon: Xt,
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
      groupLabel: A.insert,
      Icon: Xt,
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
      groupLabel: A.insert,
      Icon: uo,
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
      groupLabel: A.tool,
      Icon: lo,
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
      groupLabel: A.tool,
      Icon: co,
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
      groupLabel: A.tool,
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
      groupLabel: A.tool,
      Icon: sl,
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
      groupLabel: A.tool,
      Icon: il,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onLlmAssist) == null ? void 0 : _a2.call(e);
      }
    },
    {
      id: "export-pdf",
      title: "PDF \uD750\uB984 \uBCF4\uAE30",
      titleEn: "Export PDF flow",
      keywords: [
        "export",
        "pdf",
        "\uC778\uC1C4",
        "print",
        "\uB0B4\uBCF4\uB0B4\uAE30",
        "\uD750\uB984",
        "flow"
      ],
      group: "tool",
      groupLabel: A.tool,
      Icon: ll,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onExportPdf) == null ? void 0 : _a2.call(e, "flow");
      }
    },
    {
      id: "export-pdf-pagedjs",
      title: "PDF Paged.js",
      titleEn: "Export PDF paged.js",
      keywords: [
        "export",
        "pdf",
        "\uC778\uC1C4",
        "print",
        "paged",
        "pagedjs",
        "\uD398\uC774\uC9C0"
      ],
      group: "tool",
      groupLabel: A.tool,
      Icon: cl,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onExportPdf) == null ? void 0 : _a2.call(e, "pagedjs");
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
      groupLabel: A.tool,
      Icon: fo,
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
      groupLabel: A.tool,
      Icon: ul,
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
      groupLabel: A.tool,
      Icon: dl,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onTocToggle) == null ? void 0 : _a2.call(e);
      }
    }
  ];
  function Wa(e) {
    return e.normalize("NFKC").toLowerCase();
  }
  function qu(e, t = Do) {
    const n = Wa(e).trim();
    if (!n) return [
      ...t
    ];
    const r = n.split(/\s+/).filter(Boolean);
    return t.filter((a) => {
      const o = Wa([
        a.id,
        a.title,
        a.titleEn,
        ...a.keywords
      ].join(`
`));
      return r.every((i) => o.includes(i));
    });
  }
  const Vu = h.forwardRef(function({ items: t, command: n }, r) {
    const [a, o] = h.useState(0), i = h.useRef(null), c = h.useRef([]);
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
    })), t.length === 0) return l.jsx("div", {
      className: "w-[min(92vw,300px)] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-muted",
      role: "listbox",
      "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839",
      children: "\uACB0\uACFC \uC5C6\uC74C"
    });
    let d = "";
    return l.jsx("div", {
      ref: i,
      className: "flex max-h-[min(60vh,360px)] w-[min(92vw,300px)] flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface",
      role: "listbox",
      "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839",
      children: t.map((p, f) => {
        const m = p.groupLabel !== d;
        d = p.groupLabel;
        const g = p.Icon, x = f === a;
        return l.jsxs("div", {
          children: [
            m ? l.jsx("div", {
              className: "px-2.5 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-odp-muted",
              children: p.groupLabel
            }) : null,
            l.jsxs("button", {
              type: "button",
              ref: (w) => {
                c.current[f] = w;
              },
              role: "option",
              "aria-selected": x,
              className: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm ${x ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-800 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-bgSoft"}`,
              onMouseEnter: () => o(f),
              onClick: () => {
                n(p);
              },
              children: [
                l.jsx(g, {
                  size: 14,
                  className: "shrink-0 text-gray-500 dark:text-odp-muted",
                  "aria-hidden": true
                }),
                l.jsx("span", {
                  className: "min-w-0 flex-1 truncate font-medium",
                  children: p.title
                }),
                l.jsx("span", {
                  className: "shrink-0 truncate text-xs text-gray-400 dark:text-odp-muted",
                  children: p.titleEn
                })
              ]
            })
          ]
        }, p.id);
      })
    });
  }), qa = new Ne("haimSlashCommands");
  function Uu(e) {
    const { $from: t } = e.selection;
    for (let n = t.depth; n > 0; n -= 1) {
      const r = t.node(n).type.name;
      if (r === "codeBlock" || r === "rawMarkdownBlock") return true;
    }
    return false;
  }
  function Va(e, t) {
    di.flushSync(() => {
      e.root.render(h.createElement(Vu, {
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
  const Xu = ze.create({
    name: "haimSlashCommands",
    addStorage() {
      return {
        getAppActions: () => null
      };
    },
    addProseMirrorPlugins() {
      return [
        Ps({
          pluginKey: qa,
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
            ...Do
          ],
          allow: ({ state: e, editor: t }) => t.isEditable && !Uu(e),
          items: ({ query: e }) => qu(e),
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
                }, a = ui.createRoot(n);
                e = {
                  el: n,
                  root: a,
                  listRef: r,
                  unmountFloating: null
                }, Va(e, t), e.unmountFloating = t.mount(n);
              },
              onUpdate: (t) => {
                e && Va(e, t);
              },
              onKeyDown: (t) => {
                var _a2;
                return t.event.key === "Escape" ? ($s(t.view, qa), true) : ((_a2 = e == null ? void 0 : e.listRef.current) == null ? void 0 : _a2.onKeyDown(t)) ?? false;
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
  function Yu(e, t) {
    try {
      const n = e.domAtPos(t), r = n.node instanceof Element ? n.node : n.node.parentElement;
      if (!r) return 22;
      const a = window.getComputedStyle(r), o = parseFloat(a.lineHeight);
      if (Number.isFinite(o) && o > 0) return o;
      const i = parseFloat(a.fontSize);
      if (Number.isFinite(i) && i > 0) return i * 1.4;
    } catch {
    }
    return 22;
  }
  function er(e) {
    for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
    return -1;
  }
  function Qu(e, t, n, r) {
    const a = er(t);
    if (a < 0) return null;
    const o = n === "down" ? 1 : -1, i = n === "down" ? t.after(a) : t.before(a);
    let c;
    try {
      c = B.near(t.doc.resolve(Math.max(0, Math.min(t.doc.content.size, i))), o).head;
    } catch {
      return null;
    }
    const d = t.doc.resolve(c);
    if (er(d) === a) {
      const p = d.before(er(d)), f = t.before(a);
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
  function Ua(e, t) {
    const { state: n } = e, { selection: r, doc: a } = n, o = t === "down" ? 1 : -1;
    let i = r.anchor, c = r.head;
    if (r instanceof to) {
      const x = B.near(a.resolve(t === "down" ? r.to : r.from), o);
      i = x.anchor, c = x.head;
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
    const p = Yu(e, c), f = d.left;
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
      const w = t === "down" ? d.bottom + Math.max(2, p * x) : d.top - Math.max(2, p * x);
      let k = null;
      try {
        k = e.posAtCoords({
          left: f,
          top: w
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
      const x = Qu(e, a.resolve(c), t, f);
      x != null && (m = x);
    }
    if (m === c) {
      const x = Math.max(1, Math.min(a.content.size, c + o));
      if (x !== c) try {
        m = B.near(a.resolve(x), o).head;
      } catch {
        return false;
      }
    }
    if (m = Math.max(0, Math.min(a.content.size, m)), m === c) return false;
    try {
      const x = n.tr.setSelection(B.create(a, i, m));
      return x.scrollIntoView(), e.dispatch(x), true;
    } catch {
      try {
        const x = B.near(a.resolve(m), o), w = n.tr.setSelection(B.create(a, i, x.head));
        return w.scrollIntoView(), e.dispatch(w), true;
      } catch {
        return false;
      }
    }
  }
  const Gu = ze.create({
    name: "haimShiftArrowSelect",
    priority: 1e3,
    addKeyboardShortcuts() {
      return {
        "Shift-ArrowDown": ({ editor: e }) => Ua(e.view, "down"),
        "Shift-ArrowUp": ({ editor: e }) => Ua(e.view, "up")
      };
    }
  });
  function Zu(e) {
    for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
    return -1;
  }
  function Ju(e, t) {
    const { state: n } = e, r = n.schema.nodes.paragraph;
    if (!r) return false;
    const a = n.selection.$head, o = Zu(a);
    if (o < 0) return false;
    const i = a.before(o), c = r.createAndFill();
    if (!c) return false;
    let d = n.tr.insert(i, c);
    try {
      d = d.setSelection(B.near(d.doc.resolve(i + 1)));
    } catch {
      return false;
    }
    return d.scrollIntoView(), (0, e.dispatch)(d), true;
  }
  const ed = ze.create({
    name: "haimInsertLineAbove",
    priority: 1e3,
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-Enter": ({ editor: e }) => Ju(e.view)
      };
    }
  }), en = /[\p{L}\p{N}_]/u;
  function Ho(e, t) {
    try {
      const n = e.resolve(t);
      if (!n.parent.isTextblock) return null;
      const r = n.start(), a = n.parent.textContent;
      if (!a) return null;
      let o = Math.max(0, Math.min(a.length, t - r)), i = o;
      if (i > 0 && (i >= a.length || !en.test(a[i])) && (i = o - 1), i < 0 || i >= a.length || !en.test(a[i])) return null;
      let c = i, d = i + 1;
      for (; c > 0 && en.test(a[c - 1]); ) c -= 1;
      for (; d < a.length && en.test(a[d]); ) d += 1;
      return {
        from: r + c,
        to: r + d
      };
    } catch {
      return null;
    }
  }
  function td(e) {
    const t = [];
    return e.descendants((n, r) => n.isTextblock ? (t.length > 0 && t.push({
      pos: -1,
      ch: `
`
    }), n.forEach((a, o) => {
      if (a.isText && a.text) {
        const i = r + 1 + o;
        for (let c = 0; c < a.text.length; c += 1) t.push({
          pos: i + c,
          ch: a.text[c]
        });
      } else a.isText || t.push({
        pos: -1,
        ch: "\0"
      });
    }), false) : true), t;
  }
  function Bo(e, t, n = 1e3) {
    if (!t) return [];
    const r = td(e);
    if (!r.length) return [];
    const a = r.map((d) => d.ch).join(""), o = t;
    if (!o) return [];
    const i = [];
    let c = 0;
    for (; i.length < n; ) {
      const d = a.indexOf(o, c);
      if (d < 0) break;
      const p = d + o.length, f = r[d], m = r[p - 1];
      let g = false;
      for (let x = d; x < p; x += 1) if (r[x].pos < 0) {
        g = true;
        break;
      }
      !g && f && m && f.pos >= 0 && m.pos >= 0 && i.push({
        from: f.pos,
        to: m.pos + 1
      }), c = d + Math.max(1, o.length);
    }
    return i;
  }
  function nd(e, t, n, r, a) {
    const o = Bo(e, t);
    if (!o.length) return null;
    const i = (p) => r.some((f) => f.from === p.from && f.to === p.to), c = (p) => {
      if (!a) return true;
      const f = Ho(e, p.from);
      return !!(f && f.from === p.from && f.to === p.to);
    }, d = o.find((p) => p.from >= n && !i(p) && c(p));
    return d || (o.find((p) => !i(p) && c(p)) ?? null);
  }
  function rn(e, t) {
    if (t.from >= t.to) return "";
    try {
      return e.textBetween(t.from, t.to, `
`);
    } catch {
      return "";
    }
  }
  const _e = new Ne("haimMultiCursor"), Pt = {
    ranges: [],
    mainIndex: 0,
    query: null,
    wholeWord: false
  }, Er = "set", gr = "clear";
  function xe(e) {
    return _e.getState(e) ?? Pt;
  }
  function rd(e, t) {
    const n = [];
    for (const a of e) {
      const o = t.map(a.from, 1), i = t.map(a.to, -1);
      o <= i && n.push({
        from: o,
        to: i
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
  function ad(e, t) {
    if (t.ranges.length <= 1) return ra.empty;
    const n = t.ranges[t.mainIndex], r = [];
    for (let a = 0; a < t.ranges.length; a += 1) {
      const o = t.ranges[a];
      n && o.from === n.from && o.to === n.to || (o.from === o.to ? r.push(aa.widget(o.from, () => {
        const i = document.createElement("span");
        return i.className = "haim-multi-cursor", i.setAttribute("aria-hidden", "true"), i;
      }, {
        side: -1
      })) : r.push(aa.inline(o.from, o.to, {
        class: "haim-multi-selection"
      })));
    }
    return ra.create(e, r);
  }
  function xr(e, t, n, r) {
    const a = t.map((m, g) => ({
      r: m,
      i: g
    })).sort((m, g) => g.r.from - m.r.from || g.r.to - m.r.to);
    let o = e.tr;
    const i = [];
    for (const { r: m, i: g } of a) o = o.insertText(n, m.from, m.to), i.push({
      i: g,
      from: m.from,
      to: m.from + n.length
    });
    i.sort((m, g) => m.from - g.from);
    const c = i.map((m) => ({
      from: m.from,
      to: m.to
    })), d = Math.max(0, i.findIndex((m) => m.i === r)), p = c[d] ?? c[0];
    if (p) try {
      o = o.setSelection(B.create(o.doc, p.from, p.to));
    } catch {
    }
    const f = {
      ranges: c,
      mainIndex: d >= 0 ? d : 0,
      query: xe(e).query,
      wholeWord: xe(e).wholeWord
    };
    return o.setMeta(_e, {
      type: Er,
      state: f
    }), o.scrollIntoView(), o;
  }
  function Xa(e, t) {
    const n = xe(e.state);
    if (n.ranges.length <= 1) return false;
    if (n.ranges.some((o) => o.from !== o.to)) return e.dispatch(xr(e.state, n.ranges, "", n.mainIndex)), true;
    const a = [];
    for (const o of n.ranges) if (t === "backward") {
      if (o.from <= 1) {
        a.push(o);
        continue;
      }
      try {
        const i = e.state.doc.resolve(o.from), c = Math.max(i.start(), o.from - 1);
        a.push({
          from: c,
          to: o.from
        });
      } catch {
        a.push(o);
      }
    } else try {
      const i = e.state.doc.resolve(o.from), c = Math.min(i.end(), o.from + 1);
      a.push({
        from: o.from,
        to: c
      });
    } catch {
      a.push(o);
    }
    return e.dispatch(xr(e.state, a, "", n.mainIndex)), true;
  }
  function br(e, t, n = true) {
    const r = t.ranges[t.mainIndex] ?? t.ranges[0];
    let a = e.tr;
    if (r) try {
      a = a.setSelection(B.create(a.doc, r.from, r.to));
    } catch {
    }
    return a.setMeta(_e, {
      type: Er,
      state: t
    }), n && a.scrollIntoView(), a;
  }
  function od(e, t) {
    const n = xe(e), { selection: r } = e, a = {
      from: r.from,
      to: r.to
    };
    let o, i;
    if (n.ranges.length > 0 ? (o = n.ranges.map((x, w) => w === n.mainIndex ? a : {
      ...x
    }), i = n.mainIndex) : (o = [
      a
    ], i = 0), o.some((x) => x.from === x.to)) {
      const x = o.map((j) => j.from !== j.to ? j : Ho(e.doc, j.from) ?? j);
      if (x.every((j, P) => j.from === o[P].from && j.to === o[P].to)) return false;
      const w = rn(e.doc, x[0]);
      return t && t(br(e, {
        ranges: x,
        mainIndex: i,
        query: w,
        wholeWord: true
      })), true;
    }
    const d = n.query ?? rn(e.doc, o[0]);
    if (!d || o.some((x) => rn(e.doc, x) !== d)) return false;
    const p = o[o.length - 1], f = nd(e.doc, d, p.to, o, n.wholeWord);
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
    return t && t(br(e, g)), true;
  }
  function sd(e, t) {
    if (xe(e).ranges.length > 1) return false;
    const { selection: r } = e;
    if (r.empty) return false;
    const a = rn(e.doc, {
      from: r.from,
      to: r.to
    });
    if (!a) return false;
    const o = Bo(e.doc, a);
    if (o.length <= 1) return false;
    let i = o.findIndex((d) => d.from === r.from && d.to === r.to);
    return i < 0 && (i = 0), t && t(br(e, {
      ranges: o,
      mainIndex: i,
      query: a,
      wholeWord: false
    })), true;
  }
  function id() {
    return new Ie({
      key: _e,
      state: {
        init: () => Pt,
        apply(e, t) {
          const n = e.getMeta(_e);
          if ((n == null ? void 0 : n.type) === gr) return Pt;
          if ((n == null ? void 0 : n.type) === Er) return n.state;
          if (t.ranges.length === 0) return t;
          let r = t;
          if (e.docChanged) {
            const a = rd(t.ranges, e.mapping);
            if (a.length === 0) return Pt;
            const o = Math.min(t.mainIndex, a.length - 1);
            r = {
              ...t,
              ranges: a,
              mainIndex: o
            };
          }
          if (e.selectionSet) {
            const { from: a, to: o } = e.selection, i = r.ranges.findIndex((c) => c.from === a && c.to === o);
            return i >= 0 ? {
              ...r,
              mainIndex: i
            } : Pt;
          }
          return r;
        }
      },
      props: {
        decorations(e) {
          return ad(e.doc, xe(e));
        },
        handleTextInput(e, t, n, r) {
          const a = xe(e.state);
          return a.ranges.length <= 1 ? false : (e.dispatch(xr(e.state, a.ranges, r, a.mainIndex)), true);
        },
        handleKeyDown(e, t) {
          return xe(e.state).ranges.length <= 1 ? false : t.key === "Backspace" ? (t.preventDefault(), Xa(e, "backward")) : t.key === "Delete" ? (t.preventDefault(), Xa(e, "forward")) : false;
        },
        handleClick(e) {
          return xe(e.state).ranges.length <= 1 || e.dispatch(e.state.tr.setMeta(_e, {
            type: gr
          })), false;
        }
      }
    });
  }
  const ld = ze.create({
    name: "haimMultiCursor",
    priority: 1e3,
    addCommands() {
      return {
        selectNextOccurrence: () => ({ state: e, dispatch: t }) => od(e, t),
        selectAllOccurrences: () => ({ state: e, dispatch: t }) => sd(e, t),
        clearMultiCursor: () => ({ tr: e, dispatch: t }) => (t && (e.setMeta(_e, {
          type: gr
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
        id()
      ];
    }
  }), cd = new Ne("haimSelectionInlineCode");
  function ud(e) {
    const { $from: t, $to: n } = e.state.selection;
    return t.parent.type.name === "codeBlock" || n.parent.type.name === "codeBlock";
  }
  function dd(e, t, n) {
    return t.defaultPrevented || t.isComposing || !zl(t) || e.state.selection.empty || e.state.selection.$from.pos === e.state.selection.$to.pos || ud(e) || !e.state.schema.marks.code ? false : n();
  }
  const fd = ze.create({
    name: "haimSelectionInlineCode",
    priority: 1e3,
    addProseMirrorPlugins() {
      const e = this.editor;
      return [
        new Ie({
          key: cd,
          props: {
            handleKeyDown(t, n) {
              return dd(t, n, () => e.commands.toggleCode());
            }
          }
        })
      ];
    }
  }), hd = Ae.create({
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
  function Ya({ label: e, onClick: t, children: n }) {
    return l.jsxs(un, {
      children: [
        l.jsx(dn, {
          asChild: true,
          children: l.jsx("button", {
            type: "button",
            className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft",
            "aria-label": e,
            onClick: (r) => {
              r.preventDefault(), r.stopPropagation(), t();
            },
            children: n
          })
        }),
        l.jsx(fn, {
          children: l.jsxs(hn, {
            side: "top",
            sideOffset: 6,
            className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg",
            children: [
              e,
              l.jsx(pn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Oo(e, t) {
    const [n, r] = h.useState(null), [a, o] = h.useState(false);
    return h.useEffect(() => {
      const i = String(e || "").trim();
      if (!i) {
        r(null), o(false);
        return;
      }
      try {
        const c = Fl.renderToString(i, {
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
  function pd({ node: e, updateAttributes: t, editor: n, selected: r }) {
    const a = String(e.attrs.latex || ""), o = n.isEditable, [i, c] = h.useState(false), [d, p] = h.useState(a), f = h.useRef(null), { html: m, error: g } = Oo(a, true);
    h.useEffect(() => {
      p(a);
    }, [
      a
    ]), h.useEffect(() => {
      var _a2;
      i && ((_a2 = f.current) == null ? void 0 : _a2.focus());
    }, [
      i
    ]);
    const x = () => {
      const k = d.trim();
      t({
        latex: k || a
      }), c(false);
    }, w = () => {
      p(a), c(false);
    };
    return i && o ? l.jsxs(be, {
      as: "div",
      className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`,
      "data-type": "block-math",
      contentEditable: false,
      children: [
        l.jsx("textarea", {
          ref: f,
          className: "haim-math-block__textarea",
          value: d,
          rows: Math.min(8, Math.max(2, d.split(`
`).length + 1)),
          onChange: (k) => p(k.target.value),
          onBlur: x,
          onKeyDown: (k) => {
            k.key === "Escape" && (k.preventDefault(), w()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), x()), k.stopPropagation();
          },
          spellCheck: false
        }),
        l.jsx($t, {
          delayDuration: 250,
          skipDelayDuration: 0,
          children: l.jsx("div", {
            className: "haim-math-block__toolbar",
            children: l.jsx(Ya, {
              label: "\uBBF8\uB9AC\uBCF4\uAE30",
              onClick: x,
              children: l.jsx(Sr, {
                size: 14,
                "aria-hidden": true
              })
            })
          })
        })
      ]
    }) : l.jsxs(be, {
      as: "div",
      className: `haim-math-block${r ? " is-selected" : ""}${g ? " haim-math-block--error" : ""}`,
      "data-type": "block-math",
      "data-latex": a,
      contentEditable: false,
      onDoubleClick: () => {
        o && c(true);
      },
      children: [
        l.jsx($t, {
          delayDuration: 250,
          skipDelayDuration: 0,
          children: o ? l.jsx("div", {
            className: "haim-math-block__toolbar",
            children: l.jsx(Ya, {
              label: "\uC18C\uC2A4 \uD3B8\uC9D1",
              onClick: () => c(true),
              children: l.jsx(ho, {
                size: 14,
                "aria-hidden": true
              })
            })
          }) : null
        }),
        m ? l.jsx("div", {
          className: "haim-math-block__render",
          dangerouslySetInnerHTML: {
            __html: m
          }
        }) : l.jsx("div", {
          className: "haim-math-block__fallback",
          children: a || "\u2026"
        })
      ]
    });
  }
  function md({ node: e, updateAttributes: t, editor: n, selected: r }) {
    const a = String(e.attrs.latex || ""), o = n.isEditable, [i, c] = h.useState(false), [d, p] = h.useState(a), f = h.useRef(null), { html: m, error: g } = Oo(a, false);
    h.useEffect(() => {
      p(a);
    }, [
      a
    ]), h.useEffect(() => {
      var _a2;
      i && ((_a2 = f.current) == null ? void 0 : _a2.focus());
    }, [
      i
    ]);
    const x = () => {
      const k = d.trim();
      t({
        latex: k || a
      }), c(false);
    }, w = () => {
      p(a), c(false);
    };
    return i && o ? l.jsx(be, {
      as: "span",
      className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`,
      "data-type": "inline-math",
      contentEditable: false,
      children: l.jsx("input", {
        ref: f,
        type: "text",
        className: "haim-math-inline__input",
        value: d,
        onChange: (k) => p(k.target.value),
        onBlur: x,
        onKeyDown: (k) => {
          k.key === "Enter" && (k.preventDefault(), x()), k.key === "Escape" && (k.preventDefault(), w()), k.stopPropagation();
        },
        spellCheck: false
      })
    }) : l.jsx(be, {
      as: "span",
      className: `haim-math-inline${r ? " is-selected" : ""}${g ? " haim-math-inline--error" : ""}`,
      "data-type": "inline-math",
      "data-latex": a,
      contentEditable: false,
      onDoubleClick: (k) => {
        k.preventDefault(), k.stopPropagation(), o && c(true);
      },
      children: m ? l.jsx("span", {
        dangerouslySetInnerHTML: {
          __html: m
        }
      }) : l.jsx("span", {
        className: "haim-math-inline__fallback",
        children: a || "?"
      })
    });
  }
  let gd, xd, bd, _o, kd;
  gd = Rs.extend({
    addNodeView() {
      return st(pd);
    }
  }).configure({
    katexOptions: {
      throwOnError: false,
      displayMode: true
    }
  });
  xd = Ds.extend({
    addNodeView() {
      return st(md);
    }
  }).configure({
    katexOptions: {
      throwOnError: false,
      displayMode: false
    }
  });
  gn = {
    "(": ")",
    "[": "]",
    "{": "}",
    "'": "'",
    '"': '"',
    "`": "`"
  };
  bd = /* @__PURE__ */ new Set([
    "js",
    "javascript",
    "jsx",
    "mjs",
    "cjs",
    "ts",
    "typescript",
    "tsx"
  ]);
  _o = new Set(Object.values(gn));
  kd = new Ne("haimCodeBlockBracketPairs");
  function ot(e, t) {
    return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
  }
  function kr(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
  }
  wr = function(e) {
    return bd.has(String(e || "").trim().toLowerCase());
  };
  function zo(e) {
    const { $from: t, $to: n } = e.selection;
    return t.parent.type.name !== "codeBlock" || n.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === n.before(n.depth);
  }
  wd = function(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
    const { key: t, code: n } = e;
    return t === "`" || n === "Backquote" && !e.shiftKey ? "`" : t in gn || _o.has(t) ? t : n === "Quote" ? e.shiftKey ? '"' : "'" : null;
  };
  function Qa(e) {
    return e ? /[\w$]/.test(e) : false;
  }
  function yd(e, t) {
    const { from: n } = e.selection, r = ot(e, n - 1), a = ot(e, n);
    return !(Qa(r) || Qa(a) || a === t);
  }
  function Cd(e, t) {
    if (!zo(e) || t === "`" && !wr(kr(e))) return null;
    const { selection: n } = e, { from: r, to: a, empty: o } = n, i = gn[t];
    if (i !== void 0) {
      if (!o) {
        const d = e.doc.textBetween(r, a), p = e.tr.insertText(`${t}${d}${i}`, r, a);
        return p.setSelection(B.create(p.doc, r + t.length, r + t.length + d.length)), p;
      }
      if ((t === "'" || t === '"' || t === "`") && !yd(e, t)) return ot(e, r) === t ? e.tr.setSelection(B.create(e.doc, r + 1)) : null;
      const c = e.tr.insertText(`${t}${i}`, r, a);
      return c.setSelection(B.create(c.doc, r + t.length)), c;
    }
    return _o.has(t) && o && ot(e, r) === t ? t === "`" && !wr(kr(e)) ? null : e.tr.setSelection(B.create(e.doc, r + 1)) : null;
  }
  function Sd(e) {
    if (!zo(e)) return null;
    const { selection: t } = e;
    if (!t.empty) return null;
    const { from: n } = t, r = ot(e, n - 1), a = ot(e, n), o = gn[r];
    return !o || a !== o || r === "`" && !wr(kr(e)) ? null : e.tr.delete(n - 1, n + 1);
  }
  function Md(e, t) {
    if (t.defaultPrevented) return false;
    if (t.key === "Backspace") {
      if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
      const a = Sd(e.state);
      return a ? (e.dispatch(a), true) : false;
    }
    const n = wd(t);
    if (!n) return false;
    const r = Cd(e.state, n);
    return r ? (e.dispatch(r), true) : false;
  }
  function jd() {
    return new Ie({
      key: kd,
      props: {
        handleKeyDown(e, t) {
          return Md(e, t);
        }
      }
    });
  }
  function vd(e) {
    var _a2;
    return ((_a2 = String(e ?? "").match(/^[ \t]*/)) == null ? void 0 : _a2[0]) ?? "";
  }
  function cn(e) {
    return /^[ \t]*$/.test(String(e ?? ""));
  }
  function Fo(e) {
    const t = String(e ?? "").split(`
`);
    return t.length < 2 ? false : cn(t[t.length - 1]) && cn(t[t.length - 2]);
  }
  function xn(e) {
    const t = String(e ?? "").split(`
`);
    let n = 0, r = t.length;
    for (; n < r && cn(t[n]); ) n += 1;
    for (; r > n && cn(t[r - 1]); ) r -= 1;
    return t.slice(n, r).join(`
`);
  }
  Ed = function(e, t) {
    const n = String(e ?? ""), r = Math.max(0, Math.min(t, n.length)), a = n.lastIndexOf(`
`, r - 1) + 1, o = n.indexOf(`
`, r), i = n.slice(a, o === -1 ? n.length : o);
    return vd(i);
  };
  function bn(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function Td(e) {
    if (!bn(e)) return null;
    const { $from: t, from: n, to: r } = e.selection, a = t.parent.textContent, i = `
${Ed(a, t.parentOffset)}`, c = e.tr.insertText(i, n, r);
    return c.setSelection(B.create(c.doc, n + i.length)), c;
  }
  function Ld(e) {
    if (!bn(e)) return null;
    const { $from: t } = e.selection, n = t.parent.textContent, r = t.parentOffset, a = n.lastIndexOf(`
`, r - 1) + 1, o = t.start() + a, i = e.tr.insertText(`
`, o);
    return i.setSelection(B.create(i.doc, o)), i;
  }
  function Id(e) {
    if (!bn(e)) return null;
    const { $from: t, empty: n } = e.selection;
    if (!n || !(t.parentOffset === t.parent.nodeSize - 2)) return null;
    const a = t.parent.textContent;
    if (!Fo(a)) return null;
    const o = xn(a), i = t.start(), c = t.end(), d = e.tr.insertText(o, i, c);
    return d.setSelection(B.create(d.doc, i + o.length)), d;
  }
  function Nd(e, t) {
    const { $from: n, empty: r } = t.selection;
    if (!r || n.parent.type.name !== "codeBlock" || n.parentOffset !== n.parent.nodeSize - 2) return false;
    const a = n.parent.textContent;
    if (!Fo(a)) return false;
    const o = xn(a), i = n.start(), c = n.end();
    return e.insertText(o, i, c), e.setSelection(B.create(e.doc, i + o.length)), true;
  }
  function Ad(e) {
    const { state: t } = e;
    if (!bn(t)) return false;
    if (Id(t)) return e.chain().command(({ tr: r, state: a }) => Nd(r, a)).exitCode().run();
    const n = Td(t);
    return n ? (e.view.dispatch(n), true) : false;
  }
  function Pd(e) {
    const t = Ld(e.state);
    return t ? (e.view.dispatch(t), true) : false;
  }
  const $d = new Ne("haimCodeBlockIndent");
  function Rd(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
  }
  function Tr(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function Lr(e, t, n) {
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
  function Ga(e, t) {
    var _a2;
    const n = ((_a2 = e.match(/^ */)) == null ? void 0 : _a2[0]) ?? "";
    return Math.min(n.length, t);
  }
  function Dd(e, t) {
    if (!Tr(e)) return null;
    const n = Math.max(1, Math.round(t)), r = " ".repeat(n), { selection: a } = e, { from: o, to: i, empty: c } = a;
    if (c) {
      const g = e.tr.insertText(r, o);
      return g.setSelection(B.create(g.doc, o + r.length)), g;
    }
    const d = Lr(e, o, i);
    if (d.length === 0) return null;
    const p = e.tr;
    for (let g = d.length - 1; g >= 0; g -= 1) p.insertText(r, d[g]);
    const f = d[0], m = p.mapping.map(i);
    return p.setSelection(B.create(p.doc, f, m)), p;
  }
  function Hd(e, t) {
    var _a2;
    if (!Tr(e)) return null;
    const n = Math.max(1, Math.round(t)), { selection: r, doc: a } = e, { $from: o, empty: i } = r;
    if (i) {
      const S = o.start(), E = o.end(), I = a.textBetween(S, E, `
`, `
`).split(`
`), H = o.pos - S;
      let G = 0, le = 0;
      for (let R = 0; R < I.length; R += 1) {
        const K = I[R] ?? "";
        if (le + K.length >= H) {
          G = R;
          break;
        }
        le += K.length + 1, R === I.length - 1 && (G = R);
      }
      const it = I[G] ?? "", oe = Ga(it, n);
      if (oe === 0) return e.tr;
      let T = S;
      for (let R = 0; R < G; R += 1) T += (((_a2 = I[R]) == null ? void 0 : _a2.length) ?? 0) + 1;
      const L = e.tr.delete(T, T + oe);
      return o.pos - T <= oe ? L.setSelection(B.create(L.doc, T)) : L.setSelection(B.create(L.doc, o.pos - oe)), L;
    }
    const { from: c, to: d } = r, p = Lr(e, c, d);
    if (p.length === 0) return null;
    const f = o.start(), m = o.end(), x = a.textBetween(f, m, `
`, `
`).split(`
`), w = /* @__PURE__ */ new Map();
    {
      let S = f;
      for (let E = 0; E < x.length; E += 1) {
        const D = x[E] ?? "";
        w.set(S, D), S += D.length + (E < x.length - 1 ? 1 : 0);
      }
    }
    const k = e.tr;
    let j = 0, P = 0;
    for (let S = p.length - 1; S >= 0; S -= 1) {
      const E = p[S], D = w.get(E) ?? "", I = Ga(D, n);
      I !== 0 && (k.delete(E, E + I), P += I, E < c && (j += I));
    }
    if (P === 0) return k;
    const _ = Math.max(p[0], c - j), N = k.mapping.map(d);
    return k.setSelection(B.create(k.doc, _, Math.max(_, N))), k;
  }
  function Bd(e, t) {
    if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !Tr(e.state)) return false;
    const n = Rd(e.state), r = Kl(n, Wl()), a = t.shiftKey ? Hd(e.state, r) : Dd(e.state, r);
    return a ? (e.dispatch(a), true) : false;
  }
  function Od() {
    return new Ie({
      key: $d,
      props: {
        handleKeyDown(e, t) {
          return Bd(e, t);
        }
      }
    });
  }
  function _d(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function zd(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
  }
  function Fd(e, t) {
    const r = e.doc.resolve(t).end(), a = e.doc.textBetween(t, r, `
`, `
`), o = a.indexOf(`
`);
    return o < 0 ? a : a.slice(0, o);
  }
  function Kd(e) {
    const { from: t, to: n, empty: r } = e.selection, a = e.selection.$from;
    if (a.parent.type.name !== "codeBlock") return [];
    if (r) {
      const i = a.start(), c = a.end(), p = e.doc.textBetween(i, c, `
`, `
`).split(`
`), f = a.pos - i;
      let m = i, g = 0;
      for (let x = 0; x < p.length; x += 1) {
        const w = p[x] ?? "";
        if (g + w.length >= f || x === p.length - 1) return [
          {
            from: m,
            text: w
          }
        ];
        g += w.length + 1, m += w.length + 1;
      }
      return [];
    }
    return Lr(e, t, n).map((i) => ({
      from: i,
      text: Fd(e, i)
    }));
  }
  function Wd(e) {
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
  function qd(e, t) {
    const n = e.tr, r = Pl(t);
    for (const c of r) c.to != null && c.to !== c.from ? n.insertText(c.insert, c.from, c.to) : n.insertText(c.insert, c.from);
    const { from: a, to: o, empty: i } = e.selection;
    if (i) {
      const c = n.mapping.map(a, 1);
      n.setSelection(B.create(n.doc, c));
    } else {
      const c = n.mapping.map(a, -1), d = n.mapping.map(o, 1);
      n.setSelection(B.create(n.doc, c, Math.max(c, d)));
    }
    return n;
  }
  function Vd(e) {
    if (!_d(e)) return null;
    const t = Kd(e);
    if (t.length === 0) return null;
    const n = Il(zd(e));
    let r = null;
    return n.line ? r = Nl(t, n.line) : n.block && (r = Al(Wd(t), n.block.open, n.block.close)), !r || r.length === 0 ? null : qd(e, r);
  }
  function Ud(e) {
    const t = Vd(e.state);
    return t ? (e.view.dispatch(t), true) : false;
  }
  function Za(e) {
    return String(e || "").trim().toLowerCase() === "mermaid";
  }
  function Xd(e) {
    var _a2;
    return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
  }
  const Ko = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", Yd = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Qd = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
  function yr({ label: e, onClick: t, active: n = false, expanded: r, children: a }) {
    return l.jsxs(un, {
      children: [
        l.jsx(dn, {
          asChild: true,
          children: l.jsx("button", {
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
        l.jsx(fn, {
          children: l.jsxs(hn, {
            side: "bottom",
            sideOffset: 6,
            className: Ko,
            children: [
              e,
              l.jsx(pn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Gd({ language: e, onChange: t }) {
    const n = h.useId(), r = h.useRef(null), [a, o] = h.useState(false), [i, c] = h.useState(""), [d, p] = h.useState(0), f = ql(e), m = Vl(e), g = Ul(e), x = Xl(f, i), w = i.trim(), k = w.toLowerCase() === "plain" ? Yl : w, P = !!w && !x.some((S) => S.value.toLowerCase() === k.toLowerCase() || S.label.toLowerCase() === w.toLowerCase()) ? [
      {
        value: k,
        label: w,
        custom: true
      },
      ...x.map((S) => ({
        ...S,
        custom: false
      }))
    ] : x.map((S) => ({
      ...S,
      custom: false
    }));
    h.useEffect(() => {
      if (!a) return;
      c(""), p(0);
      const S = window.setTimeout(() => {
        var _a2;
        return (_a2 = r.current) == null ? void 0 : _a2.focus();
      }, 0);
      return () => window.clearTimeout(S);
    }, [
      a
    ]), h.useEffect(() => {
      p(0);
    }, [
      i
    ]);
    const _ = h.useCallback((S) => {
      t(Ql(S)), o(false);
    }, [
      t
    ]), N = (S) => {
      if (S.key === "ArrowDown") {
        if (S.preventDefault(), !P.length) return;
        p((E) => (E + 1) % P.length);
        return;
      }
      if (S.key === "ArrowUp") {
        if (S.preventDefault(), !P.length) return;
        p((E) => (E - 1 + P.length) % P.length);
        return;
      }
      if (S.key === "Enter") {
        S.preventDefault();
        const E = P[d] ?? P[0];
        E ? _(E.value) : w && _(k);
        return;
      }
      S.key === "Escape" && (S.preventDefault(), o(false));
    };
    return l.jsxs(jl, {
      open: a,
      onOpenChange: o,
      children: [
        l.jsxs(un, {
          children: [
            l.jsx(dn, {
              asChild: true,
              children: l.jsx(vl, {
                asChild: true,
                children: l.jsxs("button", {
                  type: "button",
                  className: "haim-code-block__lang-trigger",
                  "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4",
                  "aria-haspopup": "listbox",
                  "aria-expanded": a,
                  onPointerDown: (S) => S.stopPropagation(),
                  children: [
                    l.jsx("span", {
                      className: "haim-code-block__lang-label",
                      children: g
                    }),
                    l.jsx("span", {
                      className: "haim-code-block__lang-chevron",
                      children: l.jsx(mo, {
                        size: 12,
                        "aria-hidden": true
                      })
                    })
                  ]
                })
              })
            }),
            l.jsx(fn, {
              children: l.jsxs(hn, {
                side: "bottom",
                sideOffset: 6,
                className: Ko,
                children: [
                  "\uC5B8\uC5B4 \uAC80\uC0C9",
                  l.jsx(pn, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        }),
        l.jsx(El, {
          children: l.jsxs(Tl, {
            className: Yd,
            side: "bottom",
            align: "start",
            sideOffset: 4,
            onOpenAutoFocus: (S) => S.preventDefault(),
            onCloseAutoFocus: (S) => S.preventDefault(),
            onPointerDown: (S) => S.stopPropagation(),
            children: [
              l.jsxs("div", {
                className: "flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong",
                children: [
                  l.jsx(fo, {
                    size: 12,
                    className: "shrink-0 text-gray-400",
                    "aria-hidden": true
                  }),
                  l.jsx("input", {
                    ref: r,
                    type: "text",
                    value: i,
                    onChange: (S) => c(S.target.value),
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
              l.jsx("ul", {
                id: n,
                role: "listbox",
                "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4",
                className: "max-h-56 overflow-y-auto p-1",
                children: P.length === 0 ? l.jsx("li", {
                  className: "cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uC77C\uCE58\uD558\uB294 \uC5B8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
                }) : P.map((S, E) => {
                  const D = S.value === m, I = E === d;
                  return l.jsx("li", {
                    role: "presentation",
                    children: l.jsxs("button", {
                      type: "button",
                      role: "option",
                      "aria-selected": D,
                      "data-highlighted": I ? "true" : "false",
                      className: Qd,
                      onMouseEnter: () => p(E),
                      onMouseDown: (H) => H.preventDefault(),
                      onClick: () => _(S.value),
                      children: [
                        D ? l.jsx("span", {
                          className: "absolute left-1.5 inline-flex items-center",
                          children: l.jsx(po, {
                            size: 12,
                            "aria-hidden": true
                          })
                        }) : null,
                        S.custom ? l.jsxs("span", {
                          children: [
                            "\uC0AC\uC6A9: ",
                            l.jsx("span", {
                              className: "font-mono",
                              children: S.label
                            })
                          ]
                        }) : S.label
                      ]
                    })
                  }, `${S.custom ? "custom:" : ""}${S.value}`);
                })
              })
            ]
          })
        })
      ]
    });
  }
  function Zd({ language: e, collapsed: t, copied: n, editable: r, onCopy: a, onToggleCollapse: o, onLanguageChange: i, extra: c }) {
    return l.jsxs("div", {
      className: "haim-code-block__header",
      children: [
        r && i ? l.jsx(Gd, {
          language: e,
          onChange: i
        }) : l.jsx("span", {
          className: "haim-code-block__lang",
          children: e || "plain"
        }),
        l.jsxs("div", {
          className: "haim-code-block__actions",
          children: [
            c,
            l.jsx(yr, {
              label: n ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC",
              active: n,
              onClick: a,
              children: n ? l.jsx(po, {
                size: 14,
                "aria-hidden": true
              }) : l.jsx(or, {
                size: 14,
                "aria-hidden": true
              })
            }),
            l.jsx(yr, {
              label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30",
              expanded: !t,
              onClick: o,
              children: t ? l.jsx(mo, {
                size: 14,
                "aria-hidden": true
              }) : l.jsx(bl, {
                size: 14,
                "aria-hidden": true
              })
            })
          ]
        })
      ]
    });
  }
  function Jd({ node: e, editor: t, selected: n, updateAttributes: r }) {
    const a = String(e.attrs.language || ""), o = Za(a), i = e.textContent || "", [c, d] = h.useState(null), [p, f] = h.useState(false), [m, g] = h.useState(false), [x, w] = h.useState(false), [k, j] = h.useState(false), P = t.isEditable, _ = h.useRef(null);
    h.useEffect(() => {
      var _a2;
      if (!o || m || x) return;
      let I = false;
      const H = Xd(((_a2 = t.view) == null ? void 0 : _a2.dom) ?? null);
      return Gl(i, H).then((G) => {
        I || (G ? (d(G), f(false)) : (d(null), f(!!i.trim())));
      }), () => {
        I = true;
      };
    }, [
      o,
      m,
      x,
      i,
      t
    ]);
    const N = h.useCallback(() => {
      var _a2;
      const I = i, H = () => {
        j(true), window.setTimeout(() => j(false), 1500);
      };
      if (typeof navigator < "u" && ((_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText)) {
        navigator.clipboard.writeText(I).then(H).catch(() => {
          try {
            const G = document.createElement("textarea");
            G.value = I, document.body.appendChild(G), G.select(), document.execCommand("copy"), G.remove(), H();
          } catch {
          }
        });
        return;
      }
      H();
    }, [
      i
    ]), S = h.useCallback((I) => {
      r({
        language: I
      }), Za(I) || (g(false), d(null), f(false));
    }, [
      r
    ]), E = l.jsx("pre", {
      className: "haim-mermaid-block__source-hidden",
      "aria-hidden": true,
      children: l.jsx(oa, {
        as: "code"
      })
    }), D = l.jsx(Zd, {
      language: a,
      collapsed: x,
      copied: k,
      editable: P,
      onCopy: N,
      onToggleCollapse: () => w((I) => !I),
      ...P ? {
        onLanguageChange: S
      } : {},
      extra: o && P && !x ? l.jsx(yr, {
        label: m || p ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1",
        onClick: () => g((I) => !I),
        children: m || p ? l.jsx(Sr, {
          size: 14,
          "aria-hidden": true
        }) : l.jsx(ho, {
          size: 14,
          "aria-hidden": true
        })
      }) : null
    });
    return o && !m && c && !x ? l.jsxs(be, {
      as: "div",
      className: `haim-code-block haim-mermaid-block${n ? " is-selected" : ""}`,
      "data-language": "mermaid",
      children: [
        l.jsx($t, {
          delayDuration: 250,
          skipDelayDuration: 0,
          children: D
        }),
        l.jsx("div", {
          className: "haim-mermaid-block__chart",
          dangerouslySetInnerHTML: {
            __html: c
          },
          onDoubleClick: () => {
            P && g(true);
          }
        }),
        E
      ]
    }) : l.jsxs(be, {
      as: "div",
      className: `haim-code-block${o ? " haim-code-block--mermaid-edit" : ""}${n ? " is-selected" : ""}${x ? " is-collapsed" : ""}`,
      "data-language": a || void 0,
      children: [
        l.jsx($t, {
          delayDuration: 250,
          skipDelayDuration: 0,
          children: D
        }),
        x ? E : l.jsxs(l.Fragment, {
          children: [
            o && p ? l.jsx("div", {
              className: "haim-mermaid-block__error",
              children: "Mermaid \uB80C\uB354 \uC2E4\uD328"
            }) : null,
            l.jsxs("div", {
              className: "haim-code-block__body",
              children: [
                l.jsx(Po, {
                  text: i,
                  className: "haim-code-block__line-numbers",
                  contentRootRef: _
                }),
                l.jsx("pre", {
                  ref: _,
                  className: a ? `language-${a}` : void 0,
                  children: l.jsx(oa, {
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
  Zf = function(e, t) {
    const { state: n } = e;
    n.selection;
    let r = n.tr, a = false;
    return n.doc.descendants((o, i) => {
      if (o.type.name !== "codeBlock") return;
      const c = o.textContent, d = xn(c);
      if (d === c) return;
      const p = i + 1, f = i + o.nodeSize - 1;
      r = r.insertText(d, r.mapping.map(p), r.mapping.map(f)), a = true;
    }), a ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
  };
  const ef = new Ne("haimTrimCodeEdges");
  function tf() {
    return new Ie({
      key: ef,
      appendTransaction(e, t, n) {
        if (!e.some((j) => j.selectionSet || j.docChanged) || e.some((j) => j.getMeta("haimTrimCodeEdges"))) return null;
        const r = t.selection.$from, a = n.selection.$from, o = r.parent.type.name === "codeBlock", i = a.parent.type.name === "codeBlock";
        if (!o || i) return null;
        const c = r.depth, d = r.node(c), p = r.before(c);
        if (d.type.name !== "codeBlock") return null;
        const f = d.textContent, m = xn(f);
        if (m === f) return null;
        const g = p + 1, x = p + d.nodeSize - 1;
        let w = g, k = x;
        for (const j of e) w = j.mapping.map(w), k = j.mapping.map(k);
        return n.tr.insertText(m, w, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
      }
    });
  }
  const nf = Zl(Jl), rf = Hs.extend({
    priority: 1e3,
    addNodeView() {
      return st(Jd);
    },
    addKeyboardShortcuts() {
      var _a2;
      return {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {},
        Enter: ({ editor: t }) => Ad(t),
        "Shift-Enter": ({ editor: t }) => Pd(t),
        "Mod-/": ({ editor: t }) => Ud(t)
      };
    },
    addProseMirrorPlugins() {
      var _a2;
      return [
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [],
        tf(),
        jd(),
        Od()
      ];
    }
  }).configure({
    lowlight: nf,
    languageClassPrefix: "language-",
    enableTabIndentation: false,
    exitOnTripleEnter: false
  }), af = Bs.extend({
    excludes: "code"
  }), tr = "&nbsp;", nr = "\xA0", of = Os.extend({
    parseMarkdown: (e, t) => {
      var _a2;
      const n = Array.isArray(e == null ? void 0 : e.tokens) ? e.tokens : [], r = t.parseInline(n), a = n.length === 1 ? n[0] : null;
      return (a == null ? void 0 : a.type) === "text" && (a.raw === tr || a.text === tr || a.raw === nr || a.text === nr) && r.length === 1 && ((_a2 = r[0]) == null ? void 0 : _a2.type) === "text" && (r[0].text === tr || r[0].text === nr) ? t.createNode("paragraph", void 0, []) : t.createNode("paragraph", void 0, r);
    },
    renderMarkdown: (e, t) => {
      if (!e) return "";
      const n = Array.isArray(e.content) ? e.content : [];
      return n.length === 0 ? "" : t.renderChildren(n);
    }
  }), sf = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
  Jf = function(e) {
    const t = typeof e == "string" ? e : "", n = sf.exec(t);
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
  lf = function(e, t) {
    return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
  };
  const cf = 3;
  function an(e) {
    let t = 0;
    for (let n = 0; n < e.length; n += 1) e.charCodeAt(n) === 10 && (t += 1);
    return t;
  }
  function Wo(e) {
    const t = [
      0
    ];
    for (let n = 0; n < e.length; n += 1) e.charCodeAt(n) === 10 && t.push(n + 1);
    return (n) => {
      const r = Math.min(Math.max(0, n), e.length);
      let a = 0, o = t.length - 1;
      for (; a < o; ) {
        const i = a + o + 1 >> 1;
        (t[i] ?? 0) <= r ? a = i : o = i - 1;
      }
      return a;
    };
  }
  function uf(e, t) {
    return Wo(e)(t);
  }
  function df(e) {
    if (!e) return 0;
    const t = "\0", n = lf(e, t), r = n.indexOf(t);
    return r < 0 ? 0 : uf(n, r);
  }
  function on(e, t) {
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
  function ff(e, t, n) {
    var _a2, _b;
    if (!t || !n || n.length === 0 || t.childCount !== e.childCount || n.length !== e.childCount) return false;
    for (let a = 0; a < e.childCount; a += 1) if (((_a2 = e.child(a)) == null ? void 0 : _a2.type.name) !== ((_b = t.child(a)) == null ? void 0 : _b.type.name)) return false;
    let r = 0;
    for (let a = 0; a < e.childCount; a += 1) if (e.child(a) !== t.child(a) && (r += 1, r > cf)) return false;
    return true;
  }
  function hf(e, t, n, r) {
    const a = [];
    let o = 0, i = 0;
    return e.forEach((c, d) => {
      const p = t.child(i), f = n[i], m = d + c.nodeSize;
      if (!f || !p) {
        const k = on(r, c), j = an(k);
        a.push({
          pos: d,
          to: m,
          line0: (f == null ? void 0 : f.line0) ?? 0,
          blockNewlines: j
        }), i += 1;
        return;
      }
      if (c.type.name === "noteCover") {
        a.push({
          pos: d,
          to: m,
          line0: 0,
          blockNewlines: 0
        }), i += 1;
        return;
      }
      if (c === p) {
        a.push({
          pos: d,
          to: m,
          line0: f.line0 + o,
          blockNewlines: f.blockNewlines
        }), i += 1;
        return;
      }
      const g = on(r, c), x = an(g), w = typeof f.blockNewlines == "number" ? f.blockNewlines : an(on(r, p));
      a.push({
        pos: d,
        to: m,
        line0: f.line0 + o,
        blockNewlines: x
      }), o += x - w, i += 1;
    }), a;
  }
  function pf(e, t, n) {
    const r = df(n);
    let a = "";
    try {
      a = t(e.toJSON());
    } catch {
      a = "";
    }
    const o = Wo(a), i = [];
    let c = 0;
    return e.forEach((d, p) => {
      const f = p + d.nodeSize;
      if (d.type.name === "noteCover") {
        i.push({
          pos: p,
          to: f,
          line0: 0,
          blockNewlines: 0
        });
        return;
      }
      const m = on(t, d), g = an(m);
      let x = -1;
      if (m.length > 0 && a && (x = a.indexOf(m, c), x < 0)) {
        let k = c;
        for (; k < a.length && a.charCodeAt(k) === 10; ) k += 1;
        x = a.indexOf(m, k);
      }
      let w;
      if (x >= 0) w = r + o(x), c = x + Math.max(m.length, 1);
      else {
        for (; c < a.length && a.charCodeAt(c) === 10; ) c += 1;
        w = r + o(c), c = Math.min(a.length, c + Math.max(m.length, m ? 0 : 1));
      }
      i.push({
        pos: p,
        to: f,
        line0: w,
        blockNewlines: g
      });
    }), i;
  }
  function mf(e, t, n, r, a) {
    return ff(e, r, a) && r && a ? hf(e, r, a, t) : pf(e, t, n);
  }
  function gf(e) {
    return !e.enabled || !e.docChanged ? false : e.tipTapFocused;
  }
  function xf(e) {
    var _a2;
    const n = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
    return !n || typeof n.serialize != "function" ? null : (r) => n.serialize(r);
  }
  function Ja(e) {
    return e.map((t) => _s.Node(t.pos, t.to, {
      "data-line": String(t.line0)
    }));
  }
  const bf = ze.create({
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
        lastEntries: []
      };
    },
    addDecorations() {
      const e = this.options.getMetaPrefix ?? (() => ""), t = this.options.isEnabled ?? (() => true), n = this.storage;
      return {
        update: "document",
        shouldUpdate: ({ editor: r, tr: a }) => {
          var _a2, _b;
          const o = t();
          return o ? gf({
            enabled: o,
            docChanged: a.docChanged,
            tipTapFocused: !!((_b = (_a2 = r.view) == null ? void 0 : _a2.hasFocus) == null ? void 0 : _b.call(_a2))
          }) ? false : a.docChanged : true;
        },
        create: ({ editor: r, state: a }) => {
          if (!t()) return n.lastDoc = null, n.lastEntries = [], [];
          const o = xf(r);
          if (!o) return [];
          if (n.lastDoc === a.doc && n.lastEntries.length > 0) return Ja(n.lastEntries);
          const i = e() || "", c = mf(a.doc, o, i, n.lastDoc, n.lastEntries);
          return n.lastDoc = a.doc, n.lastEntries = c, Ja(c);
        }
      };
    }
  });
  function kf(e, t, n) {
    return new rr({
      find: e,
      handler: ({ state: r, range: a, match: o }) => {
        if (!n()) return null;
        let i = t, c = a.from;
        const d = a.to;
        if (o[1]) {
          const p = o[0].lastIndexOf(o[1]);
          i += o[0].slice(p + o[1].length), c += p;
          const f = c - d;
          f > 0 && (i = o[0].slice(p - f, p) + i, c = d);
        }
        r.tr.insertText(i, c, d);
      }
    });
  }
  const wf = [
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
  ], yf = ze.create({
    name: "haimTypography",
    addOptions() {
      return {
        initialRules: {
          ...io
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
      return wf.map(({ find: e, replace: t, ruleId: n }) => kf(e, t, () => !!this.storage.rules[n]));
    }
  });
  eh = function(e) {
    const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", a = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), o = (e == null ? void 0 : e.isSourceLineEnabled) ?? (() => true), i = (e == null ? void 0 : e.typographyRules) ?? io, d = [
      r ? sa.configure({
        code: false,
        heading: false,
        paragraph: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        listKeymap: false,
        link: false,
        trailingNode: false
      }) : sa.configure({
        code: false,
        heading: false,
        paragraph: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        listKeymap: false,
        link: false,
        trailingNode: false
      }),
      af,
      Ku.configure({
        levels: [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }),
      of,
      Yc,
      bf.configure({
        getMetaPrefix: a,
        isEnabled: o
      }),
      qc,
      Us.extend({
        parseHTML() {
          return [
            {
              tag: "img[src]:not([data-wiki-path])"
            }
          ];
        },
        addNodeView() {
          return st(Bc);
        }
      }).configure({
        inline: true,
        allowBase64: true
      }),
      Xs.configure({
        taskItem: false,
        taskList: false,
        orderedList: false
      }),
      Jc,
      nu.configure({
        nested: true
      }),
      au,
      Ys.configure({
        table: {
          resizable: r
        }
      }),
      zs,
      Qs.configure({
        types: [
          "heading",
          "paragraph"
        ]
      }),
      Gs.configure({
        multicolor: true
      }),
      ...r ? [
        rf
      ] : [],
      Fs,
      Ks,
      yf.configure({
        initialRules: i
      }),
      Zs.configure({
        placeholder: t,
        ...r ? {} : {
          showOnlyCurrent: false
        }
      }),
      Ws,
      Js.configure({
        className: "haim-node-focused"
      }),
      qs,
      Vs,
      gd,
      xd,
      uu,
      pu,
      gu,
      mu,
      ...r ? [
        xu
      ] : [],
      Du,
      Hu,
      hd,
      Gu,
      ed,
      ld,
      fd,
      ...r ? [
        Xu
      ] : []
    ];
    return r ? [
      ...d,
      ei,
      ai.configure({
        controls: true,
        nocookie: true
      }),
      oi.configure({
        persist: true
      }),
      ti,
      ni,
      su,
      ri,
      si.configure({
        injectCSS: true,
        visible: false
      }),
      ii.configure({
        types: [
          "heading",
          "paragraph"
        ]
      }),
      li.configure({
        getIndex: ci
      }),
      lu
    ] : d;
  };
  const Rt = /* @__PURE__ */ new WeakMap();
  Cf = function(e) {
    if (!e) return "";
    const t = e.state.doc, n = Rt.get(e);
    if (n && n.doc === t) return n.markdown;
    const r = e, a = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
    return Rt.set(e, {
      doc: t,
      markdown: a
    }), a;
  };
  th = function(e, t, n) {
    if (!e) return n("");
    const r = e.state.doc, a = Rt.get(e);
    if (a && a.doc === r && a.vaultPrefix === t && a.vaultMarkdown != null) return a.vaultMarkdown;
    const o = Cf(e), i = n(o), c = Rt.get(e);
    return c && c.doc === r && (c.vaultPrefix = t, c.vaultMarkdown = i), i;
  };
  nh = function(e) {
    e && Rt.delete(e);
  };
});
export {
  gn as C,
  Pu as H,
  __tla,
  th as a,
  Ro as b,
  eh as c,
  wd as d,
  wr as e,
  Ed as f,
  Cf as g,
  Mc as h,
  nh as i,
  lf as j,
  Gf as k,
  Au as l,
  qf as m,
  Qf as n,
  Na as o,
  Nu as p,
  Uf as q,
  Xf as r,
  Jf as s,
  Zf as t,
  To as u,
  jo as v,
  Yf as w,
  Vf as x
};
