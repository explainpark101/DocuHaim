const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-jsqr-781CUKnt.js","assets/vendor-react-BPvvDyqO.js"])))=>i.map(i=>d[i]);
import { e as be, f as xs, h as ke, P as Ie, i as Ne, j as bs, M as ks, O as Za, p as ws, k as ys, I as rr, r as Cs, l as Yn, n as Ss, o as Ms, q as ta, t as vs, g as js, v as Es, T as H, w as Ae, x as Ts, y as Ls, b as Ja, R as st, z as Is, A as ze, B as Ns, C as As, F as na, G as ra, H as Ps, J as $s, K as aa, L as Rs, Q as Ds, S as Bs, U as Hs, V as oa, W as Os, X as _s, Y as zs, Z as Fs, _ as Ks, $ as Ws, a0 as qs, a1 as Vs, a2 as Us, a3 as Xs, a4 as Ys, a5 as Qs, a6 as Gs, a7 as Zs, a8 as Js, a9 as ei, aa as ti, ab as ni, ac as ri, ad as ai, ae as oi, af as si, ag as ii } from "./vendor-tiptap-DxyadcB3.js";
import { r as h, j as l, c as li, a as ci, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as Qn, m as tt } from "./vendor-motion-Bv-XITR_.js";
import { t as ui, O as di } from "./index-flVIUjar.js";
import { c as fi, n as nt, a5 as hi, C as pi, i as mi, e7 as gi, aK as sa, fS as eo, jI as to, jJ as no, dV as xi, ia as bi, et as sn, a4 as Cr, jK as ki, jL as ro, iq as ia, q as wi, aZ as ao, jM as yi, jN as Ci, jO as oo, __tla as __tla_1 } from "./index-BYVoYwQr.js";
import { a as Si, b as Mi, e as vi, i as ji } from "./downloadImageSrc-Bi9SPN-h.js";
import { g as Ei } from "./Kbd-Cnuyx3cZ.js";
import { _ as Ti } from "./vendor-aws-hJDgVEKM.js";
import { s as ar, bs as Li, P as la, aV as Ii, bt as Ni, bu as Ai, u as Pi, aP as ca, H as ua, U as so, R as io, T as $i, bv as Ri, ah as Di, n as Bi, D as Hi, k as or, b9 as lo, v as Oi, bw as _i, E as Sr, bf as zi, X as Gn, au as Fi, B as Ki, I as Wi, c as qi, d as Vi, h as Ui, b0 as Xi, b1 as Yi, e as Qi, f as Gi, g as da, Q as Zi, bb as Ji, i as fa, b5 as el, b6 as tl, b7 as nl, b8 as rl, Z as Xt, aY as jt, aR as al, S as ol, aT as sl, aI as il, m as co, ba as ll, bd as cl, b2 as ul, b3 as dl, b4 as fl, bx as hl, by as pl, bz as ml, bA as uo, j as fo, x as ho, w as gl } from "./vendor-lucide-BnjwTb2j.js";
import { a3 as xl, a4 as bl, a5 as kl, a6 as wl, a7 as yl, a8 as Cl, U as Et, V as Tt, W as Zn, Y as Lt, Z as It, _ as Nt, a1 as Ee, a2 as Te, v as $t, w as un, x as dn, y as fn, z as hn, A as pn, n as Sl, T as Ml, P as vl, C as jl } from "./vendor-radix-8kjzYRrX.js";
import { e as po, __tla as __tla_2 } from "./bootSplash-Z2krRgC9.js";
import { b as At, c as tn, d as ha, e as mo, a as El, s as Tl, f as pa, g as Ll } from "./emojiShortcode-CZFZfFoz.js";
import { W as Il, __tla as __tla_3 } from "./WikiImageSizeModal-D7MjzOqH.js";
import { c as Nl, f as Al } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as Pl } from "./toHtml-cH2hWJjX.js";
import { p as $l } from "./mdEditorSelectionWrap-DR6lJ0QV.js";
import { k as Rl } from "./vendor-katex-NqpuB_gR.js";
import { r as Dl, l as Bl } from "./haimCodeTabSettings-BI7a8VYQ.js";
import { r as Hl, p as Ol, a as _l, s as zl } from "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import { b as Fl, s as Kl, h as Wl, f as ql, a as Vl, l as Ul } from "./haimCodeBlockLanguages-BStQPvla.js";
import { c as Xl, __tla as __tla_4 } from "./lazyMermaid-BcnyKPEC.js";
import { c as Yl, g as Ql } from "./vendor-highlight-Dm7Q9DxH.js";
let gn, Iu, Zf, Po, Gf, xd, wr, Md, kf, yc, Jf, af, Xf, Lu, Ff, Uf, La, Tu, Wf, qf, Qf, Yf, jo, So, Vf, Kf;
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
  function Gl() {
    var _a2;
    return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
  }
  async function Zl(e) {
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
  async function go(e) {
    const { src: t, inkCanvas: n, highlightCanvas: r } = e, a = await ec(t), o = ("width" in a, a.width), i = ("height" in a, a.height), c = document.createElement("canvas");
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
  async function Jl(e) {
    const t = await go(e);
    return nn(t);
  }
  async function ec(e) {
    try {
      const t = await fetch(e, {
        mode: "cors",
        credentials: "omit"
      });
      if (!t.ok) throw new Error(`fetch ${t.status}`);
      const n = await t.blob();
      return await createImageBitmap(n);
    } catch {
      return await tc(e);
    }
  }
  function tc(e) {
    return new Promise((t, n) => {
      const r = new Image();
      r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(new Error("Image load failed for composite")), r.src = e;
    });
  }
  function mn(e) {
    return Math.max(e.diameterX, e.diameterY);
  }
  function xo(e) {
    return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
  }
  function nc(e, t) {
    return !(t >= 8) || !(e >= 1) ? 1 : W(e / t, 0.25, 12);
  }
  function ma(e, t, n) {
    const r = Math.max(4, Math.min(96, Math.min(t, n) * 0.08));
    return W(e, 0.5, r);
  }
  function bo(e, t) {
    if (e.length < 2) return 0;
    const n = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
    if (n === r) {
      const i = e[Math.max(0, t - 1)], c = e[t];
      return Math.atan2(c.y - i.y, c.x - i.x);
    }
    const a = e[n], o = e[r];
    return Math.atan2(o.y - a.y, o.x - a.x);
  }
  function ko(e, t) {
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
  const rc = [
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
  ], ac = [
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
  const wo = 0.92, ga = 0.35;
  function oc(e, t) {
    const n = e.x - t.x, r = e.y - t.y;
    return n * n + r * r;
  }
  function yo(e, t, n = wo) {
    const r = W(n, 0.05, 1);
    return {
      x: e.x + (t.x - e.x) * r,
      y: e.y + (t.y - e.y) * r,
      pressure: e.pressure + (t.pressure - e.pressure) * r
    };
  }
  function sc(e, t, n, r = wo) {
    let a = t;
    const o = ga * ga;
    for (const i of n) {
      a = yo(a, i, r);
      const c = e[e.length - 1];
      !c || oc(c, a) >= o ? e.push({
        ...a
      }) : (c.x = a.x, c.y = a.y, c.pressure = a.pressure);
    }
    return a;
  }
  function ic(e) {
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
  function lc(e) {
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
  function xa(e, t, n) {
    e.lineCap = ir(t.shape), e.lineJoin = lr(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, n), e.globalAlpha = W(t.opacity, 0.02, 1);
    const r = sr(t);
    r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
  }
  function cc(e, t, n, r, a = 1) {
    const o = Math.max(0.25, t.diameterX * a / 2), i = Math.max(0.25, t.diameterY * a / 2);
    e.save(), e.translate(n.x, n.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-o, -i, o * 2, i * 2) : e.ellipse(0, 0, o, i, 0, 0, Math.PI * 2), e.fill(), e.restore();
  }
  function Co(e, t) {
    if (t.points.length < 1) return;
    if (e.globalAlpha = W(t.opacity, 0.02, 1), xo(t)) {
      const a = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), o = ko(t.points, a);
      for (let i = 0; i < o.length; i += 1) {
        const c = o[i], d = Math.min(t.points.length - 1, Math.round(i / Math.max(1, o.length - 1) * (t.points.length - 1))), p = bo(t.points, d), f = t.kind === "pressure" ? c.pressure : 1;
        cc(e, t, c, p, f);
      }
      return;
    }
    const n = mn(t);
    if (t.kind === "pressure" && t.points.length >= 2) {
      for (let a = 1; a < t.points.length; a += 1) {
        const o = t.points[a - 1], i = t.points[a], c = Math.max(0.5, n * ((o.pressure + i.pressure) / 2));
        xa(e, t, c), e.beginPath(), e.moveTo(o.x, o.y), e.lineTo(i.x, i.y), e.stroke();
      }
      return;
    }
    xa(e, t, n), e.beginPath();
    const r = t.points[0];
    if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
    else for (let a = 1; a < t.points.length; a += 1) {
      const o = t.points[a];
      e.lineTo(o.x, o.y);
    }
    e.stroke();
  }
  function ba(e, t, n) {
    const r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
    const a = r.getContext("2d");
    if (!a) return r;
    a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
    for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = "source-over", a.strokeStyle = o.color), Co(a, o), a.restore();
    return r;
  }
  function ka(e, t, n) {
    const r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
    const a = r.getContext("2d");
    if (!a) return r;
    a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
    for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = lc(o.blend), a.strokeStyle = o.color), Co(a, o), a.restore();
    return r;
  }
  function wa(e, t, n) {
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
  const ya = 8192;
  function uc(e) {
    const t = Math.max(1, e.clientWidth), n = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, a = e.naturalHeight > 0 ? e.naturalHeight : n, o = Math.min(3, window.devicePixelRatio || 1);
    let i = Math.max(r, Math.round(t * o)), c = Math.max(a, Math.round(n * o));
    const d = Math.max(i, c);
    if (d > ya) {
      const p = ya / d;
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
  Ff = function(e) {
    ln = e;
  };
  function dc() {
    return typeof ln == "function";
  }
  So = async function(e) {
    var _a2;
    if (!ln) throw new Error("Image upload is not available");
    const n = (_a2 = (await ln([
      e
    ]))[0]) == null ? void 0 : _a2.trim();
    if (!n) throw new Error("Upload returned no path");
    return n;
  };
  Kf = function(e) {
    return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [
      e.trim()
    ] : [];
  };
  function fc(e, t) {
    const n = Math.max(e.left, t.left), r = Math.max(e.top, t.top), a = Math.min(e.right, t.right), o = Math.min(e.bottom, t.bottom);
    return a - n < 1 || o - r < 1 ? null : {
      left: n,
      top: r,
      right: a,
      bottom: o
    };
  }
  function Ca(e, t, n, r) {
    const a = Math.max(1, Math.round(t)), o = Math.max(1, Math.round(n)), i = fc(e, r);
    if (!i) return null;
    const c = Math.max(1, e.right - e.left), d = Math.max(1, e.bottom - e.top), p = (i.left - e.left) / c * a, f = (i.top - e.top) / d * o, m = (i.right - i.left) / c * a, g = (i.bottom - i.top) / d * o, x = Yt(Math.floor(p), 0, a - 1), w = Yt(Math.floor(f), 0, o - 1), k = Yt(Math.ceil(p + m), x + 1, a), v = Yt(Math.ceil(f + g), w + 1, o);
    return {
      sx: x,
      sy: w,
      sw: k - x,
      sh: v - w
    };
  }
  function hc(e, t, n, r = 2) {
    return e.sx <= r && e.sy <= r && e.sx + e.sw >= t - r && e.sy + e.sh >= n - r;
  }
  function Sa(e, t) {
    const n = document.createElement("canvas");
    n.width = Math.max(1, t.sw), n.height = Math.max(1, t.sh);
    const r = n.getContext("2d");
    if (!r) throw new Error("Canvas 2D unavailable");
    return r.drawImage(e, t.sx, t.sy, t.sw, t.sh, 0, 0, n.width, n.height), n;
  }
  function Yt(e, t, n) {
    return Math.min(n, Math.max(t, e));
  }
  function pc() {
    if (typeof window > "u") return null;
    const e = window.BarcodeDetector;
    return typeof e == "function" ? e : null;
  }
  async function mc(e) {
    const t = pc();
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
  async function gc(e) {
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
  async function xc(e) {
    const n = (await Ti(() => import("./vendor-jsqr-781CUKnt.js").then((o) => o.j), __vite__mapDeps([0,1]))).default, r = n(e.data, e.width, e.height, {
      inversionAttempts: "attemptBoth"
    });
    return String((r == null ? void 0 : r.data) ?? "").trim() || null;
  }
  function bc(e) {
    const t = Math.min(e.width, e.height);
    if (t >= 320 || t < 1) return e;
    const n = Math.min(4, 480 / t), r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e.width * n)), r.height = Math.max(1, Math.round(e.height * n));
    const a = r.getContext("2d");
    return a ? (a.imageSmoothingEnabled = false, a.drawImage(e, 0, 0, r.width, r.height), r) : e;
  }
  function kc(e) {
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
  async function wc(e) {
    const t = bc(e), n = await kc(t);
    return yc(n);
  }
  yc = async function(e) {
    if (!(e instanceof File) || e.size <= 0) throw new Error("\uC774\uBBF8\uC9C0 \uD30C\uC77C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    const t = await mc(e);
    if (t) return t;
    const n = await gc(e), r = await xc(n);
    if (r) return r;
    throw new Error("\uC774\uBBF8\uC9C0\uC5D0\uC11C QR \uCF54\uB4DC\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  };
  const Mr = [
    0.22,
    1,
    0.36,
    1
  ], Cc = {
    duration: 0.2,
    ease: Mr
  }, Sc = {
    duration: 0.28,
    ease: Mr
  }, Qt = 0.5, Gt = 8, rt = 1.25, Mc = 2, Me = 0.5, Le = 128, vc = 4e3, Mo = 450, jc = [
    "#111827",
    "#ef4444",
    "#f59e0b",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ffffff"
  ], Ec = [
    "#facc15",
    "#f472b6",
    "#38bdf8",
    "#4ade80",
    "#fb923c"
  ], Tc = {
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
  function Lc(e) {
    return Math.max(0.1, at(e / 10));
  }
  function Ma(e, t) {
    return at(W(e + t * Lc(e), Me, Le));
  }
  const cr = 8, ur = 400;
  function Ic() {
    if (typeof navigator > "u") return false;
    const e = navigator.platform || "", t = navigator.userAgent || "";
    return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
  }
  const vo = Ic(), ie = Ei(), va = vo ? `${ie}+Shift+Z` : `${ie}+Y`;
  function Nc(e, t) {
    const n = Math.max(1, Math.round(e / 10));
    return W(Math.round(e + t * n), cr, ur);
  }
  function Ac(e, t) {
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
  const Pc = {
    backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)"
  };
  function ja({ size: e = 16 }) {
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
  function Ea({ size: e = 16 }) {
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
      transition: `opacity ${Mo}ms ease-out`
    } : {
      opacity: a
    };
    if (xo(e)) {
      const d = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), p = ko(e.points, d);
      return l.jsx("g", {
        style: o,
        children: p.map((f, m) => {
          const g = Math.min(e.points.length - 1, Math.round(m / Math.max(1, p.length - 1) * (e.points.length - 1))), x = bo(e.points, g) * 180 / Math.PI, w = e.kind === "pressure" ? f.pressure : 1, k = Math.max(0.25, e.diameterX * w / 2), v = Math.max(0.25, e.diameterY * w / 2);
          return e.shape === "square" ? l.jsx("rect", {
            x: -k,
            y: -v,
            width: k * 2,
            height: v * 2,
            fill: r,
            transform: `translate(${f.x} ${f.y}) rotate(${x})`
          }, `${e.id}-st-${m}`) : l.jsx("ellipse", {
            cx: 0,
            cy: 0,
            rx: k,
            ry: v,
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
    const c = ic(e.points);
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
  jo = function({ src: e, alt: t = "", open: n, onClose: r, onSaveAnnotated: a }) {
    const o = !!(n && e), [i, c] = h.useState(1), [d, p] = h.useState({
      x: 0,
      y: 0
    }), [f, m] = h.useState("pan"), [g, x] = h.useState(false), [w, k] = h.useState("#111827ff"), [v, P] = h.useState("#facc15ff"), [_, N] = h.useState(4), [S, E] = h.useState(4), [D, I] = h.useState(1), [B, G] = h.useState(0.45), [le, it] = h.useState("multiply"), [oe, T] = h.useState("circle"), [L, z] = h.useState("solid"), [R, K] = h.useState([]), [F, J] = h.useState([]), [Fe, Ke] = h.useState([]), [ne, ee] = h.useState([]), [Y, Z] = h.useState(null), [Q, V] = h.useState(null), [Pe, se] = h.useState("Paperozi, sans-serif"), [te, lt] = h.useState(24), [We, kn] = h.useState("400"), [wn, yn] = h.useState("normal"), [Ko, Cn] = h.useState(() => /* @__PURE__ */ new Set()), [re, ve] = h.useState(null), [Sn, Mn] = h.useState(false), [Wo, we] = h.useState([]), [$, qo] = h.useState({
      w: 1,
      h: 1
    }), [Dt, ct] = h.useState(null), [Vo, vn] = h.useState(false), [ut, Lr] = h.useState(false), [Ir, Bt] = h.useState("idle"), qe = h.useRef(null), [ce, Ve] = h.useState(false), [Ht, Ue] = h.useState(false), [$e, dt] = h.useState(null), [jn, Re] = h.useState(null), [Uo, Ot] = h.useState(false), [je, fe] = h.useState(null), de = h.useRef(null), Nr = h.useRef(() => {
    }), he = h.useRef(0), [Ar, En] = h.useState(null), [Tn, _t] = h.useState(false), [Ln, In] = h.useState(false), [Nn, ft] = h.useState(false), An = h.useRef({
      w: 4,
      h: 4
    }), ht = h.useRef(null), Pn = h.useRef(null), Xe = h.useRef(null), De = h.useRef(null), Pr = h.useRef([]), $r = h.useRef([]), pt = h.useRef([]), ye = h.useRef(null), Ce = h.useRef(null), $n = h.useRef(null), Rr = h.useRef(null), Rn = h.useRef(0), Se = h.useRef(null), Dn = h.useRef(null), Ye = h.useRef(null), mt = h.useRef(null), zt = h.useRef(null), Be = h.useRef(null), gt = h.useRef(1), Dr = h.useRef(i), Br = h.useRef(0), Qe = h.useRef(/* @__PURE__ */ new Map()), Bn = h.useRef([]), xt = h.useRef(null);
    Pr.current = R, $r.current = F, pt.current = ne, Dr.current = i;
    const Hn = !!a && dc() && (R.length > 0 || F.length > 0 || ne.some((s) => s.text.trim().length > 0)), bt = ne.find((s) => s.id === Y) ?? null, kt = f === "highlighter" ? v : w, Xo = f === "highlighter" ? B : D, wt = h.useCallback(() => {
      c(1), p({
        x: 0,
        y: 0
      });
    }, []), Ft = h.useCallback(() => {
      for (const s of Qe.current.values()) clearTimeout(s);
      Qe.current.clear();
    }, []), On = h.useCallback(() => {
      K([]), J([]), Ke([]), ee([]), Z(null), V(null), Cn(/* @__PURE__ */ new Set()), we([]), Bn.current = [], ve(null), Mn(false), ye.current = null, Ce.current = null, Rn.current = 0;
      const s = Rr.current, u = $n.current;
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
      const { bufW: u, bufH: b, cssW: y } = uc(s);
      y < 8 || s.clientHeight < 8 || (gt.current = nc(u, y), qo({
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
        De.current = null, vn(false);
        return;
      }
      let s = false;
      const u = Xe.current;
      if (!u || !Gl()) {
        vn(false);
        return;
      }
      return Zl(u).then((b) => {
        s || (De.current = b, vn(!!b));
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
      const M = y.getBoundingClientRect(), C = u - M.left - M.width / 2, j = b - M.top - M.height / 2;
      c((O) => {
        const U = W(s, Qt, Gt), pe = U / O;
        return p((ue) => ({
          x: C - (C - ue.x) * pe,
          y: j - (j - ue.y) * pe
        })), U;
      });
    }, []), Yo = h.useCallback((s) => {
      var _a2;
      if ((_a2 = xt.current) == null ? void 0 : _a2.call(xt), xt.current = null, ht.current = s, !s) return;
      const u = (b) => {
        b.preventDefault(), b.stopPropagation();
        const y = b.deltaY > 0 ? 1 / rt : rt;
        Ze(Dr.current * y, b.clientX, b.clientY);
      };
      s.addEventListener("wheel", u, {
        passive: false,
        capture: true
      }), xt.current = () => {
        s.removeEventListener("wheel", u, true);
      };
    }, [
      Ze
    ]), Qo = h.useCallback((s) => {
      if (s.preventDefault(), s.stopPropagation(), i > 1.05) {
        wt();
        return;
      }
      Ze(Mc, s.clientX, s.clientY);
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
        pressure: Ac(s, u)
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
    const Hr = h.useCallback(() => {
      const s = An.current;
      N(s.w), E(s.h);
    }, []), Or = h.useCallback(() => {
      const s = An.current, u = Math.max(s.w, s.h), b = at(W(u * 5, Me, Le));
      N(b), E(b), m("eraser");
    }, []), ae = h.useCallback((s) => {
      if (he.current += 1, Ve(false), fe(null), de.current = null, f === "eraser" && s !== "eraser" && Hr(), s === "eraser") {
        Or();
        return;
      }
      if (s === "highlighter") {
        m("highlighter"), z("solid"), T("square");
        return;
      }
      m(s);
    }, [
      f,
      Hr,
      Or
    ]), _r = h.useCallback((s) => {
      var _a2, _b;
      s.preventDefault(), s.stopPropagation(), (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId), Be.current = {
        pointerId: s.pointerId,
        startX: s.clientX,
        startY: s.clientY,
        originX: d.x,
        originY: d.y
      };
    }, [
      d.x,
      d.y
    ]), zr = h.useCallback((s) => {
      const u = Be.current;
      !u || u.pointerId !== s.pointerId || (s.preventDefault(), p({
        x: u.originX + (s.clientX - u.startX),
        y: u.originY + (s.clientY - u.startY)
      }));
    }, []), Fr = h.useCallback((s) => {
      var _a2, _b;
      const u = Be.current;
      if (!(!u || u.pointerId !== s.pointerId)) {
        Be.current = null;
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
        }, Mo);
        Qe.current.set(s, y);
      }, vc);
      Qe.current.set(s, b);
    }, []), He = h.useCallback(() => {
      const s = $n.current, u = Rr.current ?? (s == null ? void 0 : s.getContext("2d"));
      s && u && u.clearRect(0, 0, s.width, s.height), Rn.current = 0;
    }, []), Fn = h.useCallback(() => {
      Se.current == null && (Se.current = requestAnimationFrame(() => {
        Se.current = null;
        const s = ye.current;
        if (!s) {
          ve(null);
          return;
        }
        ve({
          ...s,
          points: s.points.slice()
        });
      }));
    }, []), et = h.useCallback((s, u) => {
      const b = s.nativeEvent, y = typeof b.getCoalescedEvents == "function" ? b.getCoalescedEvents() : [], M = y.length > 0 ? y : [
        b
      ], C = [];
      for (const j of M) {
        const O = yt(j, u);
        O && C.push(O);
      }
      if (C.length === 0) {
        const j = yt(s, u);
        j && C.push(j);
      }
      return C;
    }, [
      yt
    ]), Kr = h.useCallback((s) => {
      var _a2, _b;
      if (f !== "pen" && f !== "pressure" && f !== "highlighter" && f !== "laser" && f !== "eraser") return;
      s.preventDefault(), s.stopPropagation();
      const b = et(s, f === "pressure"), y = b[b.length - 1];
      if (!y) return;
      (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
      const M = f === "eraser" ? "eraser" : f === "highlighter" ? "highlighter" : f === "laser" ? "laser" : f === "pressure" ? "pressure" : "pen", C = M === "laser" ? "#ef4444" : M === "highlighter" ? v : M === "eraser" ? "#000000" : w, j = zn(M), O = W(gt.current, 0.25, 12), U = ma(Math.max(0.5, j.w * O), $.w, $.h), pe = ma(Math.max(0.5, j.h * O), $.w, $.h), ue = M === "eraser" ? 1 : M === "laser" ? 0.9 : M === "highlighter" ? B : D, X = {
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
      }, Mn(true), Rn.current = 0, ve({
        ...X,
        points: [
          ...X.points
        ]
      }), He(), M === "laser" && Je(X.id), (M === "pen" || M === "pressure") && De.current && s.nativeEvent.isTrusted) try {
        const gs = Math.max(j.w, j.h);
        De.current.updateInkTrailStartPoint(s.nativeEvent, {
          color: w,
          diameter: Math.max(1, gs * (M === "pressure" ? y.pressure : 1))
        });
      } catch {
      }
    }, [
      f,
      w,
      v,
      B,
      D,
      le,
      oe,
      L,
      et,
      zn,
      Je,
      He,
      Fn
    ]), Wr = h.useCallback((s) => {
      const u = ye.current;
      if (!u) return;
      s.preventDefault();
      const b = u.kind === "pressure", y = et(s, b);
      if (!y.length) return;
      const M = Ce.current ?? u.points[u.points.length - 1];
      if (M && (Ce.current = sc(u.points, M, y), Fn(), u.kind === "laser" && Je(u.id), (u.kind === "pen" || u.kind === "pressure") && De.current && s.nativeEvent.isTrusted)) try {
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
    ]), qr = h.useCallback((s) => {
      var _a2, _b;
      const u = ye.current;
      if (!u) return;
      const b = u.kind === "pressure", y = et(s, b), M = y[y.length - 1];
      if (M && Ce.current) {
        const j = yo(Ce.current, M, 1), O = u.points[u.points.length - 1];
        !O || O.x !== j.x || O.y !== j.y ? u.points.push(j) : O.pressure = j.pressure, Ce.current = j;
      }
      ye.current = null, Ce.current = null, Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), Mn(false);
      try {
        (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
      } catch {
      }
      if (u.points.length === 0) {
        ve(null), He();
        return;
      }
      const C = {
        ...u,
        points: [
          ...u.points
        ]
      };
      if (u.kind === "laser") {
        Ke((j) => [
          ...j,
          C
        ]), Je(u.id), ve(null), He();
        return;
      }
      if (we([]), u.kind === "highlighter") J((j) => [
        ...j,
        C
      ]);
      else if (u.kind === "eraser") {
        K((j) => [
          ...j,
          C
        ]), J((j) => [
          ...j,
          C
        ]), ve(null), He();
        return;
      } else K((j) => [
        ...j,
        C
      ]);
      ve(null), He();
    }, [
      et,
      Je,
      He
    ]), Kt = h.useCallback((s) => {
      Y && ee((u) => u.map((b) => b.id === Y ? {
        ...b,
        ...s
      } : b));
    }, [
      Y
    ]), Vr = h.useCallback((s) => {
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
    ]), Go = h.useCallback((s) => {
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
        _r(s);
        return;
      }
      if (f === "text") {
        V(null), Vr(s);
        return;
      }
      Z(null), V(null), Kr(s);
    }, [
      ce,
      g,
      f,
      _r,
      Kr,
      Vr
    ]), Zo = h.useCallback((s) => {
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
        const M = y.getBoundingClientRect(), C = (s.clientX - b.startClientX) / Math.max(1, M.width) * $.w, j = (s.clientY - b.startClientY) / Math.max(1, M.height) * $.h;
        ee((O) => O.map((U) => U.id === b.id ? {
          ...U,
          x: b.originX + C,
          y: b.originY + j
        } : U));
        return;
      }
      if (Be.current) {
        zr(s);
        return;
      }
      ye.current && Wr(s);
    }, [
      zr,
      Wr,
      $.w,
      $.h
    ]), Ur = h.useCallback((s) => {
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
          Nr.current({
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
      Be.current && Fr(s), ye.current && qr(s);
    }, [
      Fr,
      qr
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
      u && (Bn.current.push({
        ...u
      }), we([]), ee((b) => b.filter((y) => y.id !== s)), Z(null), V(null));
    }, [
      Y
    ]), Wn = h.useCallback(() => {
      const s = Bn.current.pop();
      if (s) {
        ee((X) => [
          ...X,
          s
        ]), Z(s.id), V(null);
        return;
      }
      const u = Pr.current, b = $r.current, y = pt.current, M = u[u.length - 1], C = b[b.length - 1], j = y[y.length - 1], O = (M == null ? void 0 : M.seq) ?? -1, U = (C == null ? void 0 : C.seq) ?? -1, pe = (j == null ? void 0 : j.seq) ?? -1, ue = Math.max(O, U, pe);
      if (!(ue < 0)) {
        if (pe === ue && j) {
          we((X) => [
            ...X,
            {
              layer: "text",
              text: j
            }
          ]), ee(y.slice(0, -1)), Z((X) => X === j.id ? null : X);
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
      N((u) => Ma(u, s)), E((u) => Ma(u, s));
    }, []), Xr = h.useCallback((s) => {
      var _a2;
      const u = Y, b = (u ? (_a2 = pt.current.find((M) => M.id === u)) == null ? void 0 : _a2.fontSizePx : null) ?? te, y = Nc(b, s);
      lt(y), u && ee((M) => M.map((C) => C.id === u ? {
        ...C,
        fontSizePx: y
      } : C));
    }, [
      Y,
      te
    ]), Jo = h.useCallback((s) => {
      const u = at(W(s, Me, Le));
      N(u), E(u);
    }, []), es = h.useCallback(() => {
      ae("highlighter");
    }, [
      ae
    ]), Wt = h.useCallback(async (s) => {
      if (!a || !e || ut) return;
      const u = ne.some((b) => b.text.trim().length > 0);
      if (!(R.length === 0 && F.length === 0 && !u)) {
        Lr(true), En(null);
        try {
          const b = ba($.w, $.h, R), y = b.getContext("2d");
          y && wa(y, ne, gt.current);
          const M = ka($.w, $.h, F), C = await Jl({
            src: e,
            inkCanvas: b,
            highlightCanvas: M
          }), j = new File([
            C
          ], `annotated-${Date.now()}.png`, {
            type: "image/png"
          });
          await a(s, j);
        } catch (b) {
          En(b instanceof Error ? b.message : String(b));
        } finally {
          Lr(false);
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
      const s = ne.some((y) => y.text.trim().length > 0), u = R.length > 0 || s ? ba($.w, $.h, R) : null;
      if (u) {
        const y = u.getContext("2d");
        y && wa(y, ne, gt.current);
      }
      const b = F.length > 0 ? ka($.w, $.h, F) : null;
      return go({
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
      const y = Ca(u, s.width, s.height, b);
      return !y || hc(y, s.width, s.height) ? nn(s) : nn(Sa(s, y));
    }, [
      qt
    ]), Un = h.useCallback(() => {
      if (!e) return;
      const s = Vt();
      qe.current && clearTimeout(qe.current), Si(s).then(() => {
        Bt("done"), qe.current = setTimeout(() => Bt("idle"), 1600);
      }).catch(() => {
        Bt("error"), qe.current = setTimeout(() => Bt("idle"), 2e3);
      });
    }, [
      e,
      Vt
    ]), ts = h.useCallback(() => {
      if (!e) return;
      const s = Mi(e, "png").replace(/\.[^.]+$/i, "") + ".png";
      Vt().then((u) => vi(u, s)).catch((u) => {
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
            const j = Ca(C, b.width, b.height, s);
            if (!j) throw new Error("\uC774\uBBF8\uC9C0 \uC548\uC5D0\uC11C \uC601\uC5ED\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
            y = Sa(b, j);
          }
          const M = await wc(y);
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
      Nr.current = St;
    }, [
      St
    ]);
    const Yr = h.useCallback(() => {
      he.current += 1, Ve(false), Ue(false), fe(null), Re(null), de.current = null;
    }, []), ns = h.useCallback(() => {
      dt(null), Ot(false), fe(null), Re(null), de.current = null, Ve(true), St("full");
    }, [
      St
    ]), rs = h.useCallback(() => {
      he.current += 1, Ve(false), Ue(false), fe(null), de.current = null, x(true), ae("pen");
    }, [
      ae
    ]), as = h.useCallback(() => {
      V(null), Z(null), ee((s) => s.filter((u) => u.text.trim().length > 0)), x(false), m("pan"), In(false), _t(false), ct(null);
    }, []), os = h.useCallback(() => {
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
    const Xn = R.length + F.length + ne.length, Qr = Xn > 0 || !!re || Sn, Ut = h.useCallback(() => {
      if (Qr) {
        ft(true);
        return;
      }
      ft(false), r();
    }, [
      Qr,
      r
    ]), ss = h.useCallback(() => {
      ft(false), r();
    }, [
      r
    ]), is = h.useCallback(() => {
      ft(false);
    }, []);
    h.useEffect(() => {
      if (!o) return;
      const s = (u) => {
        var _a2;
        const b = u.target, y = (_a2 = b == null ? void 0 : b.tagName) == null ? void 0 : _a2.toLowerCase(), M = y === "input" || y === "textarea" || (b == null ? void 0 : b.isContentEditable), C = vo ? u.metaKey : u.ctrlKey, j = u.key.toLowerCase(), O = u.code;
        if (ji(u)) {
          if (M) return;
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Un();
          return;
        }
        if (C && j === "s") {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Wt(u.shiftKey ? "saveAs" : "overwrite");
          return;
        }
        if (C && j === "z" && !u.shiftKey) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Wn();
          return;
        }
        if (C && (j === "y" || j === "z" && u.shiftKey)) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), qn();
          return;
        }
        const U = !!Y || f === "text", pe = C && (u.shiftKey && (u.key === "<" || u.key === "," || O === "Comma") || !u.shiftKey && (u.key === "[" || O === "BracketLeft")), ue = C && (u.shiftKey && (u.key === ">" || u.key === "." || O === "Period") || !u.shiftKey && (u.key === "]" || O === "BracketRight"));
        if (U && (pe || ue)) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), Xr(pe ? -1 : 1);
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
        if (Y && !C && (j === "backspace" || j === "delete")) {
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
      Xr,
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
    const ls = g && !ce && f !== "pan" && f !== "text" && Dt != null && !Be.current && !Sn, Gr = zn(f === "eraser" ? "eraser" : f === "highlighter" ? "highlighter" : f === "laser" ? "laser" : f === "pressure" ? "pressure" : "pen"), Zr = Math.max(4, Gr.w * i), Jr = Math.max(4, Gr.h * i), cs = R.filter((s) => s.kind === "eraser"), us = R.filter((s) => s.kind !== "eraser"), ds = F.filter((s) => s.kind === "eraser"), fs = F.filter((s) => s.kind !== "eraser"), hs = Sn && f === "highlighter" ? {
      mixBlendMode: le
    } : {}, ea = fi(nt(kt) || "#111827ff"), ps = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", Mt = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [vt, ms] = h.useState(null);
    return l.jsxs(l.Fragment, {
      children: [
        l.jsx(xl, {
          open: o,
          onOpenChange: (s) => {
            s || Ut();
          },
          children: l.jsx(Qn, {
            children: o ? l.jsxs(bl, {
              forceMount: true,
              children: [
                l.jsx(kl, {
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
                    transition: Cc
                  })
                }),
                l.jsx(wl, {
                  asChild: true,
                  forceMount: true,
                  onOpenAutoFocus: (s) => s.preventDefault(),
                  onEscapeKeyDown: (s) => {
                    s.preventDefault();
                  },
                  children: l.jsxs(tt.div, {
                    ref: ms,
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
                    transition: Sc,
                    children: [
                      l.jsx(yl, {
                        className: "sr-only",
                        children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30"
                      }),
                      l.jsx(Cl, {
                        className: "sr-only",
                        children: "\uBCF4\uAE30 \uBAA8\uB4DC\uC5D0\uC11C \uD655\uB300, \uC774\uBBF8\uC9C0 \uBCF5\uC0AC, QR \uC778\uC2DD\uC744 \uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC5F0\uD544 \uBC84\uD2BC\uC73C\uB85C \uADF8\uB9AC\uAE30 \uD3B8\uC9D1\uC744 \uC5FD\uB2C8\uB2E4."
                      }),
                      l.jsx("div", {
                        ref: Yo,
                        className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${ce ? "cursor-crosshair" : !g || f === "pan" ? "cursor-grab" : f === "text" ? "cursor-text" : "cursor-none"}`,
                        onPointerDown: Go,
                        onPointerMove: Zo,
                        onPointerUp: Ur,
                        onPointerCancel: Ur,
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
                            className: `relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl ${ce && !je ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-black" : ""}`,
                            style: Tc,
                            children: [
                              l.jsx("img", {
                                ref: Pn,
                                src: e,
                                alt: t || "",
                                className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none",
                                draggable: false,
                                onDoubleClick: Qo
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
                                          cs.map((s) => l.jsx(me, {
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
                                          ds.map((s) => l.jsx(me, {
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
                                      us.map((s) => l.jsx(me, {
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
                                      fs.map((s) => l.jsx("g", {
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
                                        fading: Ko.has(s.id)
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
                                style: hs,
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
                                      const j = C.target.value;
                                      ee((O) => O.map((U) => U.id === s.id ? {
                                        ...U,
                                        text: j
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
                      je && je.w > 0 && je.h > 0 ? l.jsx("div", {
                        className: "pointer-events-none fixed z-100066 border-2 border-sky-400 bg-sky-400/25",
                        style: {
                          left: je.x,
                          top: je.y,
                          width: je.w,
                          height: je.h
                        },
                        "aria-hidden": true
                      }) : null,
                      ls && Dt ? l.jsx("div", {
                        className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow",
                        style: {
                          left: Dt.x - Zr / 2,
                          top: Dt.y - Jr / 2,
                          width: Zr,
                          height: Jr,
                          borderRadius: oe === "circle" ? "9999px" : "2px",
                          borderStyle: L === "dashed" ? "dashed" : "solid",
                          opacity: W(Xo, 0.25, 0.85),
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
                              l.jsx(hi, {
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
                                    container: vt,
                                    children: l.jsx(It, {
                                      className: Mt,
                                      position: "popper",
                                      side: "bottom",
                                      sideOffset: 6,
                                      onCloseAutoFocus: (s) => s.preventDefault(),
                                      children: l.jsx(Nt, {
                                        className: "p-1",
                                        children: rc.map((s) => l.jsx(Ee, {
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
                                    container: vt,
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
                                      children: l.jsx(Li, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uC77C\uBC18 \uD39C",
                                      active: f === "pen",
                                      onClick: () => ae("pen"),
                                      children: l.jsx(la, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uD544\uC555 \uD39C",
                                      active: f === "pressure",
                                      onClick: () => ae("pressure"),
                                      children: l.jsx(Ii, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uD615\uAD11\uD39C",
                                      active: f === "highlighter",
                                      onClick: es,
                                      children: l.jsx(Ni, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)",
                                      active: f === "laser",
                                      onClick: () => ae("laser"),
                                      children: l.jsx(Ai, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uC9C0\uC6B0\uAC1C",
                                      active: f === "eraser",
                                      onClick: () => ae("eraser"),
                                      children: l.jsx(Pi, {
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
                                              (f === "highlighter" ? Ec : jc).map((s, u, b) => {
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
                                                style: Pc
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
                                              ease: Mr
                                            },
                                            className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md",
                                            children: [
                                              l.jsx("div", {
                                                className: "mb-2 h-8 w-full rounded border border-white/20",
                                                style: {
                                                  ...pi,
                                                  backgroundColor: kt
                                                }
                                              }),
                                              l.jsx("div", {
                                                className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full",
                                                children: l.jsx(ui, {
                                                  color: ea,
                                                  onChange: (s) => {
                                                    const u = nt(s.startsWith("#") ? s : `#${s}`);
                                                    u && (f === "highlighter" ? P(u) : (k(u), (f === "pan" || f === "eraser" || f === "laser") && ae("pen")));
                                                  }
                                                })
                                              }),
                                              l.jsx(di, {
                                                alpha: true,
                                                prefixed: true,
                                                color: ea,
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
                                          onChange: (s) => Jo(Number(s.target.value) || 1),
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
                                          value: Math.round((f === "highlighter" ? B : D) * 100),
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
                                          children: oe === "circle" ? l.jsx(ca, {
                                            size: 16
                                          }) : l.jsx(ua, {
                                            size: 16
                                          })
                                        }),
                                        l.jsx(Lt, {
                                          container: vt,
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
                                                    l.jsx(ca, {
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
                                                    l.jsx(ua, {
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
                                          children: L === "dashed" ? l.jsx(Ea, {
                                            size: 16
                                          }) : l.jsx(ja, {
                                            size: 16
                                          })
                                        }),
                                        l.jsx(Lt, {
                                          container: vt,
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
                                                    l.jsx(ja, {
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
                                                    l.jsx(Ea, {
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
                                          className: ps,
                                          "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC",
                                          children: l.jsx(Zn, {
                                            placeholder: "Blend"
                                          })
                                        }),
                                        l.jsx(Lt, {
                                          container: vt,
                                          children: l.jsx(It, {
                                            className: `${Mt} max-h-56 overflow-auto`,
                                            position: "popper",
                                            side: "top",
                                            sideOffset: 6,
                                            onCloseAutoFocus: (s) => s.preventDefault(),
                                            children: l.jsx(Nt, {
                                              className: "p-1",
                                              children: ac.map((s) => l.jsx(Ee, {
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
                                      children: l.jsx(so, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: `\uB2E4\uC2DC \uC2E4\uD589 (${va})`,
                                      disabled: Wo.length === 0,
                                      onClick: qn,
                                      children: l.jsx(io, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30",
                                      disabled: Xn === 0 && Fe.length === 0,
                                      onClick: On,
                                      children: l.jsx($i, {
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
                                  children: l.jsx(Ri, {
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
                                  children: l.jsx(Di, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: "\uBCF4\uAE30 \uCD08\uAE30\uD654",
                                  onClick: wt,
                                  children: l.jsx(Bi, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: "\uC774\uBBF8\uC9C0 \uB2E4\uC6B4\uB85C\uB4DC",
                                  onClick: ts,
                                  children: l.jsx(Hi, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: Ir === "done" ? "\uBCF5\uC0AC\uB428" : Ir === "error" ? "\uBCF5\uC0AC \uC2E4\uD328" : `\uC774\uBBF8\uC9C0 \uBCF5\uC0AC (${ie}+C)`,
                                  onClick: Un,
                                  children: l.jsx(or, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: Ht ? "QR \uC778\uC2DD \uC911" : ce ? "QR \uC778\uC2DD \uC885\uB8CC" : "QR \uCF54\uB4DC \uC778\uC2DD",
                                  active: ce,
                                  disabled: Ht,
                                  onClick: () => {
                                    if (ce) {
                                      Yr();
                                      return;
                                    }
                                    ns();
                                  },
                                  children: l.jsx(lo, {
                                    size: 16
                                  })
                                }),
                                l.jsx("span", {
                                  className: "mx-0.5 h-5 w-px bg-white/20",
                                  "aria-hidden": true
                                }),
                                g || Hn ? l.jsxs(l.Fragment, {
                                  children: [
                                    l.jsx(q, {
                                      label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${ie}+S)`,
                                      tone: "save",
                                      disabled: !Hn || ut,
                                      onClick: () => {
                                        Wt("overwrite");
                                      },
                                      children: l.jsx(Oi, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${ie}+Shift+S)`,
                                      tone: "saveAs",
                                      disabled: !Hn || ut,
                                      onClick: () => {
                                        Wt("saveAs");
                                      },
                                      children: l.jsx(_i, {
                                        size: 16
                                      })
                                    })
                                  ]
                                }) : null,
                                g ? l.jsx(q, {
                                  label: "\uBCF4\uAE30 \uBAA8\uB4DC",
                                  onClick: as,
                                  children: l.jsx(Sr, {
                                    size: 16
                                  })
                                }) : l.jsx(q, {
                                  label: "\uD3B8\uC9D1",
                                  onClick: rs,
                                  children: l.jsx(la, {
                                    size: 16
                                  })
                                })
                              ]
                            }),
                            ce || $e || jn ? l.jsxs("div", {
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
                                      disabled: Ht,
                                      onClick: () => St("full"),
                                      className: "inline-flex h-8 items-center gap-1 rounded-lg border border-sky-400/50 bg-sky-500/30 px-2 text-[11px] text-white hover:bg-sky-500/40 disabled:opacity-40",
                                      children: [
                                        l.jsx(zi, {
                                          size: 14,
                                          "aria-hidden": true
                                        }),
                                        "\uC804\uCCB4 \uC778\uC2DD"
                                      ]
                                    }),
                                    l.jsxs("button", {
                                      type: "button",
                                      onClick: Yr,
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
                                Ht ? l.jsx("p", {
                                  className: "text-center text-[11px] text-white/70",
                                  children: "\uC778\uC2DD \uC911\u2026"
                                }) : null,
                                jn ? l.jsx("p", {
                                  className: "text-center text-[11px] text-red-300",
                                  children: jn
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
                                          onClick: os,
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            l.jsx(or, {
                                              size: 14,
                                              "aria-hidden": true
                                            }),
                                            Uo ? "\uBCF5\uC0AC\uB428" : "\uD14D\uC2A4\uD2B8 \uBCF5\uC0AC"
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
                                            l.jsx(Fi, {
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
                                g ? `\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ${ie}+[ ] / ${ie}+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ${ie}+C \uC774\uBBF8\uC9C0 \uBCF5\uC0AC \xB7 ${ie}+Z / ${va}` : `\uD720 \uC90C \xB7 \uB4DC\uB798\uADF8\uB85C \uC774\uB3D9 \xB7 ${ie}+C \uBCF4\uC774\uB294 \uC774\uBBF8\uC9C0 \uBCF5\uC0AC`,
                                Vo && g ? " \xB7 Ink API" : "",
                                ut ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""
                              ]
                            }),
                            Ar ? l.jsx("p", {
                              className: "max-w-xl text-center text-[10px] text-red-300",
                              children: Ar
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
        l.jsx(mi, {
          isOpen: Nn,
          title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30",
          message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.",
          confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30",
          cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1",
          variant: "danger",
          overlayClassName: "z-100070",
          onConfirm: ss,
          onCancel: is
        })
      ]
    });
  };
  const $c = /^[a-z][a-z0-9+.-]*:/i;
  function Ta(e) {
    const t = String(e || "").trim();
    return t ? gi(t) ? true : !$c.test(t) : false;
  }
  function Rc({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
    const o = String(e.attrs.src || ""), i = String(e.attrs.alt || ""), c = String(e.attrs.title || ""), d = n.isEditable, [p, f] = h.useState(false), [m, g] = h.useState(null), [x, w] = h.useState(false);
    h.useEffect(() => {
      w(false);
    }, [
      o
    ]);
    const k = !Ta(o) || x && !sa(o), v = h.useCallback((N) => {
      if (N.detail > 1) return;
      N.preventDefault(), N.stopPropagation();
      const S = typeof r == "function" ? r() : null;
      typeof S == "number" && n.chain().focus().setNodeSelection(S).run();
    }, [
      n,
      r
    ]), P = h.useCallback((N) => {
      N.preventDefault(), N.stopPropagation(), !(!Ta(o) || x) && (g(o), f(true));
    }, [
      x,
      o
    ]), _ = h.useCallback(async (N, S) => {
      if (!d) return;
      const E = await So(S), D = typeof r == "function" ? r() : null, I = URL.createObjectURL(S);
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
    return l.jsxs(be, {
      as: "span",
      className: `haim-stock-image-wrap${t ? " is-selected" : ""}`,
      "data-drag-handle": true,
      style: {
        width: "100%",
        maxWidth: "100%"
      },
      onClick: v,
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
            sa(o) || w(true);
          }
        }),
        l.jsx(jo, {
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
  Wf = function(e) {
    dr = e;
  };
  function fr(e) {
    const t = String(e || "").trim().replace(/^\/+/, "");
    return !t || typeof dr != "function" ? false : (dr(t), true);
  }
  function Dc(e, t) {
    if (typeof document > "u") return;
    const n = document.createElement("a");
    n.href = e, n.target = t, n.rel = "noopener noreferrer", n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
  }
  La = function(e, t) {
    const n = String(e || "").trim();
    if (!n) return;
    const r = eo(n);
    if (r) {
      fr(r);
      return;
    }
    if (to(n)) return;
    const a = String((t == null ? void 0 : t.target) || "_blank").trim(), o = !a || a === "_self" ? "_blank" : a;
    if (po() && no(n, {
      target: o
    })) {
      xi(n);
      return;
    }
    Dc(n, o);
  };
  const Ia = "haim-mod-held";
  function Bc(e, t) {
    let n = null;
    if (t.target instanceof HTMLAnchorElement) n = t.target;
    else {
      const r = t.target;
      if (!r) return null;
      n = r.closest("a");
    }
    return !n || !e.view.dom.contains(n) ? null : n;
  }
  function Hc(e, t, n) {
    const r = bs(e.state, t.name), a = String(r.href || "").trim();
    return a || String(n.getAttribute("href") || n.href || "").trim();
  }
  function Oc() {
    return new Ie({
      key: new Ne("haimLinkModCursor"),
      view(e) {
        const t = (c) => {
          e.dom.classList.toggle(Ia, c);
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
            window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", a, true), window.removeEventListener("blur", o), e.dom.removeEventListener("mousemove", i), e.dom.classList.remove(Ia);
          }
        };
      }
    });
  }
  function _c(e, t, n, r) {
    if (r.button !== 0) return false;
    const a = Bc(e, r);
    if (!a) return false;
    const o = Hc(n, t, a);
    if (!o) return false;
    const i = eo(o), c = bi(), d = r.metaKey || r.ctrlKey;
    if (n.editable) {
      if (r.preventDefault(), !(d || c)) return true;
      if (i) return r.stopPropagation(), fr(i), true;
      const f = (a.getAttribute("target") || a.target || "_blank").trim();
      return La(o, {
        target: f
      }), true;
    }
    if (i) return r.preventDefault(), r.stopPropagation(), fr(i), true;
    if (po()) {
      const p = (a.getAttribute("target") || a.target || "_blank").trim();
      if (no(o, {
        target: p
      })) return r.preventDefault(), r.stopPropagation(), La(o, {
        target: p
      }), true;
    }
    return false;
  }
  function zc(e, t) {
    return new Ie({
      key: new Ne("haimLinkClick"),
      props: {
        handleDOMEvents: {
          click: (n, r) => _c(e, t, n, r)
        }
      }
    });
  }
  const Fc = xs.extend({
    renderHTML({ HTMLAttributes: e }) {
      const t = String(e.href || ""), n = to(t);
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
        Oc(),
        zc(this.editor, this.type)
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
  function Kc(e) {
    if (!e || !e.includes("\\~")) return e;
    let t = "", n = 0;
    for (; n < e.length; ) {
      const r = Wc(e, n);
      if (r) {
        const a = qc(e, r.contentFrom, r.marker);
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
  qf = function(e) {
    return !e || !e.includes(hr) ? e : e.split(hr).join("\\~");
  };
  function Wc(e, t) {
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
  function qc(e, t, n) {
    const r = `
${n}`, a = e.indexOf(r, t);
    if (a === -1) return e.length;
    const o = a + r.length, i = e.indexOf(`
`, o);
    return i === -1 ? e.length : i + 1;
  }
  function Na(e) {
    var _a2;
    if (!e || typeof e != "object") return;
    const t = e;
    if (t.__haimRawTextPatched) return;
    t.encodeTextForMarkdown = (r) => r, t.escapeMarkdownSyntax = (r) => r;
    const n = (_a2 = t.parse) == null ? void 0 : _a2.bind(t);
    typeof n == "function" && (t.parse = (r) => n(Kc(r))), t.__haimRawTextPatched = true;
  }
  const Vc = ks.extend({
    onBeforeCreate(e) {
      var _a2, _b, _c2;
      (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
      const t = (_b = this.storage) == null ? void 0 : _b.manager;
      t && Na(t), ((_c2 = this.editor) == null ? void 0 : _c2.markdown) && Na(this.editor.markdown);
    }
  }), Uc = /^[ \t]*[a-zA-Z]+[.)][ \t]+/;
  function pr(e) {
    return Uc.test(e);
  }
  function Xc(e) {
    const t = e.split(`
`);
    if (pr(t[0] ?? "")) return null;
    const n = t.findIndex((r, a) => a > 0 && pr(r));
    return n === -1 ? e : t.slice(0, n).join(`
`);
  }
  const Zt = Za.config.markdownTokenizer;
  function Yc() {
    if (!Zt) return;
    const e = Zt.tokenize.bind(Zt);
    return {
      ...Zt,
      tokenize(t, n, r) {
        const a = Xc(t);
        if (a != null) return e(a, n, r);
      }
    };
  }
  const Aa = Yc(), Qc = Za.extend({
    ...Aa ? {
      markdownTokenizer: Aa
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
              const o = ws(r);
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
  }), Gc = /^\s*(\[([ xX~]?)\])\s$/, Zc = /^\s*[-*+]\s*\[([ xX~])\]\s$/;
  function Pa(e) {
    return mo(e === void 0 || e === "" ? " " : e);
  }
  function mr(e) {
    const t = At(e), n = tn(e);
    return {
      status: t,
      checked: t === "done",
      kind: t === "doing" ? "status" : n
    };
  }
  function $a(e, t, n) {
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
      const v = [];
      k.forEach((N, S, E) => {
        const D = E === x ? n : N.type.name === "taskItem" ? mr(N.attrs) : {
          status: "todo",
          checked: false,
          kind: "check"
        };
        v.push(r.create(D, N.content, N.marks));
      });
      const P = a.create(k.attrs, v);
      d.replaceWith(w, w + k.nodeSize, P), Yn(d.doc, w) && ((_a2 = d.doc.resolve(w).nodeBefore) == null ? void 0 : _a2.type) === a && d.join(w);
      const _ = d.doc.nodeAt(w);
      if (_) {
        const N = w + _.nodeSize;
        Yn(d.doc, N) && ((_b = d.doc.nodeAt(N)) == null ? void 0 : _b.type) === a && d.join(N);
      }
      return;
    }
    const p = d.doc.resolve(t.from).blockRange(), f = p && Ss(p, r, n);
    if (!f) return null;
    d.wrap(p, f);
    const m = d.doc.resolve(t.from - 1).nodeBefore;
    m && m.type === r && Yn(d.doc, t.from - 1) && d.join(t.from - 1);
  }
  function Jn(e, t, n, r) {
    t.dataset.status = n, t.dataset.kind = r, t.dataset.checked = n === "done" ? "true" : "false", e.dataset.status = n, e.dataset.kind = r, e.className = r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", e.checked = n === "done", e.indeterminate = n === "doing", e.setAttribute("aria-checked", n === "doing" ? "mixed" : n === "done" ? "true" : "false"), e.setAttribute("aria-label", r === "status" ? n === "doing" ? "Status task in progress" : n === "done" ? "Status task completed" : "Status task not started" : n === "done" ? "Task completed" : "Task not started");
  }
  const Jc = ys.extend({
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
            return ha(t, n === "todo" || n === "doing" || n === "done" ? n : void 0);
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
      const r = e.status === "todo" || e.status === "doing" || e.status === "done" ? e.status : e.checked ? "done" : "todo", a = e.kind === "status" || e.kind === "check" ? ha(e.kind, r) : r === "doing" ? "status" : "check";
      return t.createNode("taskItem", {
        status: r,
        checked: r === "done",
        kind: a
      }, n);
    },
    renderMarkdown: (e, t) => {
      const n = At(e == null ? void 0 : e.attrs), r = tn(e == null ? void 0 : e.attrs), o = `- [${Tl(n, r)}] `;
      return Cs(e, t, o);
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
          const { state: w, dispatch: k } = r.view, v = w.doc.nodeAt(x);
          !v || v.type !== this.type || k(w.tr.setNodeMarkup(x, void 0, {
            ...v.attrs,
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
          const k = El(x.status, w), v = {
            status: k,
            checked: k === "done",
            kind: w
          };
          if (r.isEditable) {
            Jn(i, a, v.status, v.kind), f(v);
            return;
          }
          this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(d, v.checked) ? Jn(i, a, v.status, v.kind) : p(d));
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
          find: Gc,
          handler: ({ state: e, range: t, match: n }) => {
            var _a2;
            const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = Pa(n[2]);
            return $a(e, t, {
              status: a.status,
              checked: a.checked,
              kind: r
            });
          }
        }),
        new rr({
          find: Zc,
          handler: ({ state: e, range: t, match: n }) => {
            var _a2;
            const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = Pa(n[1]);
            return $a(e, t, {
              status: a.status,
              checked: a.checked,
              kind: r
            });
          }
        })
      ];
    }
  }), eu = /^\s*[-+*]\s+\[([ xX~])\]\s+/, Ra = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;
  function Da(e) {
    var _a2;
    const t = mo(e[3]);
    return {
      indentLevel: ((_a2 = e[1]) == null ? void 0 : _a2.length) ?? 0,
      mainContent: e[4] ?? "",
      checked: t.checked,
      status: t.status,
      kind: t.kind
    };
  }
  function Ba(e, t, n = []) {
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
  const tu = Ms.extend({
    markdownTokenizer: {
      name: "taskList",
      level: "block",
      start(e) {
        var _a2;
        const t = (_a2 = e.match(eu)) == null ? void 0 : _a2.index;
        return t !== void 0 ? t : -1;
      },
      tokenize(e, t, n) {
        const r = (o) => {
          const i = ta(o, {
            itemPattern: Ra,
            extractItemData: Da,
            createToken: (c, d) => Ba(c, n, d ?? []),
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
        }, a = ta(e, {
          itemPattern: Ra,
          extractItemData: Da,
          createToken: (o, i) => Ba(o, n, i ?? []),
          customNestedParser: r
        }, n);
        if (a) return {
          type: "taskList",
          raw: a.raw,
          items: a.items
        };
      }
    }
  }), nu = /^:([a-zA-Z0-9_+-]+):/, ru = vs.extend({
    markdownTokenizer: {
      name: "emoji",
      level: "inline",
      start: (e) => e.indexOf(":"),
      tokenize: (e) => {
        const t = nu.exec(e);
        if (!t) return;
        const n = t[1] ?? "", r = pa(n);
        if (r) return {
          type: "emoji",
          raw: t[0],
          emojiName: r
        };
      }
    },
    parseMarkdown: (e, t) => {
      const n = pa((e == null ? void 0 : e.emojiName) || (e == null ? void 0 : e.name));
      if (!n) {
        const r = String((e == null ? void 0 : e.raw) || "");
        return r ? t.createTextNode(r) : null;
      }
      return t.createNode("emoji", {
        name: n
      });
    }
  }).configure({
    emojis: js,
    enableEmoticons: true
  });
  function au(e) {
    const { state: t, view: n } = e, { selection: r, doc: a } = t, o = r.$anchor;
    let i = o.depth;
    for (; i > 0 && !o.node(i).isTextblock; ) i -= 1;
    if (i === 0) return e.commands.selectAll();
    const c = o.start(i), d = o.end(i);
    if (!r.empty && r.from <= c && r.to >= d) return e.commands.selectAll();
    const f = H.create(a, c, d);
    return n.dispatch(t.tr.setSelection(f).scrollIntoView()), true;
  }
  const ou = Es.extend({
    name: "nodeRange",
    addKeyboardShortcuts() {
      var _a2;
      const n = {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}
      };
      return delete n["Shift-ArrowUp"], delete n["Shift-ArrowDown"], n["Mod-a"] = ({ editor: r }) => au(r), n;
    }
  }), su = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, iu = Ae.create({
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
        const t = su.exec(e);
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
          if (!n || !Ts(t, n)) return false;
          const { selection: r } = t, { $to: a } = r, o = e();
          return Ls(r) ? o.insertContentAt(a.pos, {
            type: this.name
          }) : o.insertContent({
            type: this.name
          }), o.command(({ state: i, tr: c, dispatch: d }) => {
            var _a2;
            if (d) {
              const { $to: p } = c.selection, f = p.end();
              if (p.nodeAfter) p.nodeAfter.isTextblock ? c.setSelection(H.create(c.doc, p.pos + 1)) : p.nodeAfter.isBlock ? c.setSelection(Ja.create(c.doc, p.pos)) : c.setSelection(H.create(c.doc, p.pos));
              else {
                const g = (_a2 = i.schema.nodes.paragraph || p.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
                g && (c.insert(f, g), c.setSelection(H.create(c.doc, f + 1)));
              }
              c.scrollIntoView();
            }
            return true;
          }).run();
        }
      };
    }
  }), vr = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", lu = [
    "nw",
    "ne",
    "sw",
    "se"
  ];
  function Ha(e) {
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
  function Oa(e, t, n, r) {
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
  function cu(e) {
    return e ? e.closest(".overflow-auto") || e.parentElement : null;
  }
  function uu({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
    var _a2, _b;
    const o = String(e.attrs.path || ""), i = String(e.attrs.options || ""), c = String(e.attrs.alt || o), d = e.attrs.width || null, p = e.attrs.height || null, f = e.attrs.background || null, m = n.isEditable, g = h.useRef(null), x = h.useRef(null), [w, k] = h.useState(false), [v, P] = h.useState(false), [_, N] = h.useState(null), [S, E] = h.useState(null);
    x.current = S;
    const D = h.useMemo(() => S ? {
      ...Ha(sn({
        width: null,
        height: null,
        background: f
      })),
      width: `${S.width}px`,
      height: `${S.height}px`
    } : Ha(sn({
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
        options: Oa(o, T, L, f)
      }, R = cu(n.view.dom), K = (R == null ? void 0 : R.scrollTop) ?? null, F = typeof r == "function" ? r() : null;
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
      if (!t || !m || w || v) return;
      const T = (L) => {
        if (L.key !== "Enter") return;
        const z = L.target;
        z instanceof HTMLInputElement || z instanceof HTMLTextAreaElement || z instanceof HTMLElement && z.isContentEditable || (L.preventDefault(), L.stopPropagation(), B());
      };
      return document.addEventListener("keydown", T, true), () => document.removeEventListener("keydown", T, true);
    }, [
      t,
      m,
      w,
      v,
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
      z && (N(z), P(true));
    }, []), oe = h.useCallback(async (T, L) => {
      if (!m) return;
      const z = await So(L), R = typeof r == "function" ? r() : null;
      if (T === "overwrite") {
        const F = {
          path: z,
          alt: z,
          options: Oa(z, d, p, f)
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
            t && m ? lu.map((T) => l.jsx("button", {
              type: "button",
              className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${T}`,
              "aria-label": `resize-${T}`,
              "data-resize-handle": T,
              onPointerDown: (L) => G(T, L)
            }, T)) : null
          ]
        }),
        l.jsx(Il, {
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
        l.jsx(jo, {
          src: _,
          alt: c,
          open: v,
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
  function Eo(e, t, n = "") {
    const r = t ? ki(t) : null;
    return {
      path: e,
      options: t || "",
      alt: n || e,
      width: (r == null ? void 0 : r.width) ?? null,
      height: (r == null ? void 0 : r.height) ?? null,
      background: (r == null ? void 0 : r.background) ?? null
    };
  }
  const du = Ae.create({
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
            return Eo(t, n, e.getAttribute("data-wiki-alt") || t);
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
      return st(uu);
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
  Vf = function(e, t = "", n = "") {
    const r = Eo(e, t, n), a = sn({
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
  const fu = Ae.create({
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
  }), hu = Ae.create({
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
  }), pu = Ae.create({
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
  Uf = function() {
    return `${Ll()}

`;
  };
  function mu(e) {
    const t = getComputedStyle(e), n = t.lineHeight;
    if (n && n !== "normal") {
      const a = Number.parseFloat(n);
      if (Number.isFinite(a) && a > 0) return a;
    }
    const r = Number.parseFloat(t.fontSize);
    return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
  }
  const _a = /* @__PURE__ */ new WeakMap();
  function To(e) {
    const t = getComputedStyle(e), n = `${t.font}|${t.fontSize}|${t.lineHeight}|${t.fontFamily}|${t.fontWeight}`, r = _a.get(e);
    if (r && r.key === n) return r.value;
    let o = mu(e);
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
    return _a.set(e, {
      key: n,
      value: o
    }), o;
  }
  function gu(e) {
    const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), n = Number.parseFloat(t);
    return Number.isFinite(n) && n > 0 ? n : 4;
  }
  function Lo(e) {
    const t = e.closest("pre");
    if (t) {
      const n = getComputedStyle(t), r = (Number.parseFloat(n.paddingLeft) || 0) + (Number.parseFloat(n.paddingRight) || 0), a = t.clientWidth - r;
      if (a > 0) return a;
    }
    return e.clientWidth;
  }
  function xu(e) {
    return e.classList.contains("ProseMirror-trailingBreak");
  }
  function Io(e) {
    return Array.from(e.querySelectorAll("br")).filter((t) => !xu(t));
  }
  function bu(e) {
    return Math.max(1, Io(e).length + 1);
  }
  function ku(e, t) {
    const n = ro(t);
    return e ? Math.max(n, bu(e)) : n;
  }
  function wu(e, t) {
    const n = Array.from(e.getClientRects()).filter((i) => i.height > 0 || i.width > 0);
    if (n.length === 0) return t;
    let r = 1 / 0, a = -1 / 0;
    for (const i of n) r = Math.min(r, i.top), a = Math.max(a, i.bottom);
    const o = a - r;
    return o > 0.5 ? o : t;
  }
  function yu(e, t, n, r) {
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
  function Cu(e, t, n, r) {
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
  function Su(e, t, n) {
    const r = Io(e);
    if (r.length === 0 && t > 1) return null;
    const a = [], o = document.createRange();
    try {
      for (let i = 0; i < t; i += 1) if (yu(o, e, r, i), o.collapsed) a.push(Cu(e, r, i, n));
      else {
        const c = wu(o, n);
        a.push(Math.max(c, n * 0.95));
      }
    } catch {
      return null;
    }
    return a.length === t ? a : null;
  }
  function Mu(e, t, n, r) {
    const a = Lo(e);
    if (a <= 0) return Array.from({
      length: n
    }, () => r);
    const i = Nl(t, Al(e), a, gu(e)).map((c) => Math.max(1, c) * r);
    for (; i.length < n; ) i.push(r);
    return i.slice(0, n);
  }
  function vu(e, t, n, r) {
    const a = Lo(e);
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
  function ju(e, t, n) {
    if (n <= 0) return [];
    const r = To(e), a = Su(e, n, r);
    return a ? a.map((o) => o > 0 ? o : r) : e.closest("pre") || e.tagName === "PRE" ? vu(e, t, n, r) : Mu(e, t, n, r);
  }
  function za(e) {
    return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
  }
  function Eu(e, t) {
    if (e === t) return true;
    if (!e || !t || e.length !== t.length) return false;
    for (let n = 0; n < e.length; n += 1) if (Math.abs((e[n] ?? 0) - (t[n] ?? 0)) > 0.5) return false;
    return true;
  }
  function No({ text: e, className: t, contentRootRef: n }) {
    const r = ro(e), [a, o] = h.useState(r), [i, c] = h.useState(null), [d, p] = h.useState(null);
    h.useLayoutEffect(() => {
      const m = (n == null ? void 0 : n.current) ?? null, g = za(m);
      if (!g) {
        o(r), c(null), p(null);
        return;
      }
      let x = 0, w = null;
      const k = () => {
        cancelAnimationFrame(x), x = requestAnimationFrame(() => {
          const N = za((n == null ? void 0 : n.current) ?? null);
          if (!N) {
            o(r), c(null), p(null);
            return;
          }
          const S = ku(N, e), E = To(N), D = ju(N, e, S), I = D.length === S && D.every((B) => B > 0) ? D : null;
          o((B) => B === S ? B : S), p((B) => B === E ? B : E), c((B) => Eu(B, I) ? B : I);
        });
      };
      k(), w = new ResizeObserver(k), w.observe(g), m && m !== g && w.observe(m);
      const v = g.closest("pre");
      v && v !== g && v !== m && w.observe(v);
      const P = new MutationObserver(k);
      P.observe(g, {
        subtree: true,
        childList: true,
        characterData: true
      });
      const _ = window.setTimeout(k, 0);
      return window.addEventListener(ia, k), window.addEventListener("resize", k), () => {
        cancelAnimationFrame(x), window.clearTimeout(_), w == null ? void 0 : w.disconnect(), P.disconnect(), window.removeEventListener(ia, k), window.removeEventListener("resize", k);
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
  Tu = function(e) {
    const n = wi(String(e || ""))[0];
    return n ? {
      meta: n.meta ?? ao(),
      grid: n.grid
    } : null;
  };
  Lu = function(e, t) {
    return `${yi(e)}
${Ci(t)}`;
  };
  Xf = function() {
    const e = ao(), t = {
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
      text: Lu(e, t)
    };
  };
  Iu = "haim-table-edit-request";
  function Nu(e, t) {
    e.dispatchEvent(new CustomEvent(Iu, {
      detail: t,
      bubbles: true
    }));
  }
  function Au({ node: e, editor: t, selected: n, getPos: r }) {
    const a = String(e.attrs.kind || "raw"), o = String(e.attrs.text || ""), i = t.isEditable, c = h.useRef(null), d = h.useMemo(() => {
      if (a !== "haim-table") return null;
      const f = Tu(o);
      return f ? Pl(f.grid, f.meta) : null;
    }, [
      a,
      o
    ]), p = () => {
      if (!i || a !== "haim-table") return;
      const f = typeof r == "function" ? r() : null;
      typeof f == "number" && Nu(t.view.dom, {
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
        l.jsx(No, {
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
  const Pu = Ae.create({
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
      return st(Au);
    },
    renderMarkdown: (e) => {
      var _a2;
      const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
      return t ? t.endsWith(`
`) ? t : `${t}
` : "";
    }
  }), $u = Ae.create({
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
  function Ru(e, t) {
    var _a2;
    const n = Number(((_a2 = e.attrs) == null ? void 0 : _a2.level) ?? 1), r = Number.isFinite(n) ? Math.min(6, Math.max(1, Math.trunc(n))) : 1, a = e.content ? t(e.content) : "";
    return `${"#".repeat(r)} ${a}`;
  }
  const Du = /* @__PURE__ */ new Set([
    "paragraph",
    "heading",
    "deepHeading"
  ]);
  function Ao(e) {
    const { from: t, to: n } = e.selection, r = [];
    return e.doc.nodesBetween(t, n, (a, o) => {
      if (a.isTextblock) return r.push({
        pos: o,
        node: a
      }), false;
    }), r;
  }
  function Bu(e) {
    const { $from: t } = e.state.selection, n = t.parent;
    return !n.isTextblock || n.content.size !== 0 || n.type.name !== "paragraph" && n.type.name !== "heading" ? null : t.before(t.depth);
  }
  function Hu(e, t, n) {
    const r = e.spec.attrs ?? {}, a = {};
    for (const o of Object.keys(r)) Object.prototype.hasOwnProperty.call(n, o) ? a[o] = n[o] : t.attrs[o] != null && (a[o] = t.attrs[o]);
    return a;
  }
  function Ou(e, t, n, r) {
    const a = e.schema.nodes.heading, o = e.schema.nodes.paragraph;
    if (!a || !o) return false;
    let i = false;
    for (const c of Ao(e)) {
      if (!Du.has(c.node.type.name) || c.node.textContent.trim() === "") continue;
      const d = e.doc.resolve(c.pos), p = d.index(), f = c.node.type === a && Number(c.node.attrs.level) === r, m = f ? o : a;
      d.parent.canReplaceWith(p, p + 1, m) && (i = true, n && t.setNodeMarkup(c.pos, m, Hu(m, c.node, f ? {} : {
        level: r
      })));
    }
    return i;
  }
  Po = function(e, t) {
    if (Ao(e.state).length > 1) {
      let c = false;
      return e.chain().focus().command(({ state: d, tr: p, dispatch: f }) => (c = Ou(d, p, f, t), c)).run(), c;
    }
    const n = Bu(e), r = e.chain().focus().toggleHeading({
      level: t
    }).run();
    if (!r || n == null) return r;
    const a = e.state.doc.nodeAt(n);
    if (!(a == null ? void 0 : a.isTextblock)) return true;
    const o = n + a.nodeSize - 1, i = e.state.selection;
    return i.empty && i.from === o || e.commands.setTextSelection(o), true;
  };
  const _u = Is.extend({
    renderMarkdown(e, t) {
      return Ru(e, (n) => t.renderChildren(n));
    },
    addKeyboardShortcuts() {
      var _a2;
      const t = {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}
      };
      for (const n of this.options.levels) t[`Mod-${n}`] = () => Po(this.editor, n);
      return t;
    }
  }), A = {
    format: "\uC11C\uC2DD",
    heading: "\uC81C\uBAA9",
    block: "\uBE14\uB85D",
    insert: "\uC0BD\uC785",
    tool: "\uB3C4\uAD6C"
  };
  function zu(e, t) {
    if (t >= 1 && t <= 6) {
      Po(e, t);
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
        zu(n, e);
      }
    };
  }
  const $o = [
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
      Icon: Ki,
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
      Icon: Wi,
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
      Icon: qi,
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
      Icon: Vi,
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
      Icon: Ui,
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
      Icon: Xi,
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
      Icon: Yi,
      run: ({ editor: e }) => {
        e.chain().focus().toggleSuperscript().run();
      }
    },
    ge(1, ul),
    ge(2, dl),
    ge(3, fl),
    ge(4, hl),
    ge(5, pl),
    ge(6, ml),
    ge(7, jt),
    ge(8, jt),
    ge(9, jt),
    ge(10, jt),
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
      Icon: Qi,
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
      Icon: Gi,
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
      Icon: da,
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
      Icon: da,
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
      Icon: Zi,
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
      Icon: Ji,
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
      Icon: fa,
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
      Icon: fa,
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
      Icon: el,
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
      Icon: tl,
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
      Icon: nl,
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
      Icon: rl,
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
      Icon: lo,
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
      Icon: so,
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
      Icon: io,
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
      Icon: jt,
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
      Icon: al,
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
      Icon: ol,
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
      Icon: sl,
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
      Icon: il,
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
      Icon: co,
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
      Icon: ll,
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
      Icon: cl,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onTocToggle) == null ? void 0 : _a2.call(e);
      }
    }
  ];
  function Fa(e) {
    return e.normalize("NFKC").toLowerCase();
  }
  function Fu(e, t = $o) {
    const n = Fa(e).trim();
    if (!n) return [
      ...t
    ];
    const r = n.split(/\s+/).filter(Boolean);
    return t.filter((a) => {
      const o = Fa([
        a.id,
        a.title,
        a.titleEn,
        ...a.keywords
      ].join(`
`));
      return r.every((i) => o.includes(i));
    });
  }
  const Ku = h.forwardRef(function({ items: t, command: n }, r) {
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
  }), Ka = new Ne("haimSlashCommands");
  function Wu(e) {
    const { $from: t } = e.selection;
    for (let n = t.depth; n > 0; n -= 1) {
      const r = t.node(n).type.name;
      if (r === "codeBlock" || r === "rawMarkdownBlock") return true;
    }
    return false;
  }
  function Wa(e, t) {
    ci.flushSync(() => {
      e.root.render(h.createElement(Ku, {
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
  const qu = ze.create({
    name: "haimSlashCommands",
    addStorage() {
      return {
        getAppActions: () => null
      };
    },
    addProseMirrorPlugins() {
      return [
        Ns({
          pluginKey: Ka,
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
            ...$o
          ],
          allow: ({ state: e, editor: t }) => t.isEditable && !Wu(e),
          items: ({ query: e }) => Fu(e),
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
                }, a = li.createRoot(n);
                e = {
                  el: n,
                  root: a,
                  listRef: r,
                  unmountFloating: null
                }, Wa(e, t), e.unmountFloating = t.mount(n);
              },
              onUpdate: (t) => {
                e && Wa(e, t);
              },
              onKeyDown: (t) => {
                var _a2;
                return t.event.key === "Escape" ? (As(t.view, Ka), true) : ((_a2 = e == null ? void 0 : e.listRef.current) == null ? void 0 : _a2.onKeyDown(t)) ?? false;
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
  function Vu(e, t) {
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
  function Uu(e, t, n, r) {
    const a = er(t);
    if (a < 0) return null;
    const o = n === "down" ? 1 : -1, i = n === "down" ? t.after(a) : t.before(a);
    let c;
    try {
      c = H.near(t.doc.resolve(Math.max(0, Math.min(t.doc.content.size, i))), o).head;
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
  function qa(e, t) {
    const { state: n } = e, { selection: r, doc: a } = n, o = t === "down" ? 1 : -1;
    let i = r.anchor, c = r.head;
    if (r instanceof Ja) {
      const x = H.near(a.resolve(t === "down" ? r.to : r.from), o);
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
    const p = Vu(e, c), f = d.left;
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
      const x = Uu(e, a.resolve(c), t, f);
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
      const x = n.tr.setSelection(H.create(a, i, m));
      return x.scrollIntoView(), e.dispatch(x), true;
    } catch {
      try {
        const x = H.near(a.resolve(m), o), w = n.tr.setSelection(H.create(a, i, x.head));
        return w.scrollIntoView(), e.dispatch(w), true;
      } catch {
        return false;
      }
    }
  }
  const Xu = ze.create({
    name: "haimShiftArrowSelect",
    priority: 1e3,
    addKeyboardShortcuts() {
      return {
        "Shift-ArrowDown": ({ editor: e }) => qa(e.view, "down"),
        "Shift-ArrowUp": ({ editor: e }) => qa(e.view, "up")
      };
    }
  });
  function Yu(e) {
    for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
    return -1;
  }
  function Qu(e, t) {
    const { state: n } = e, r = n.schema.nodes.paragraph;
    if (!r) return false;
    const a = n.selection.$head, o = Yu(a);
    if (o < 0) return false;
    const i = a.before(o), c = r.createAndFill();
    if (!c) return false;
    let d = n.tr.insert(i, c);
    try {
      d = d.setSelection(H.near(d.doc.resolve(i + 1)));
    } catch {
      return false;
    }
    return d.scrollIntoView(), (0, e.dispatch)(d), true;
  }
  const Gu = ze.create({
    name: "haimInsertLineAbove",
    priority: 1e3,
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-Enter": ({ editor: e }) => Qu(e.view)
      };
    }
  }), en = /[\p{L}\p{N}_]/u;
  function Ro(e, t) {
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
  function Zu(e) {
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
  function Do(e, t, n = 1e3) {
    if (!t) return [];
    const r = Zu(e);
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
  function Ju(e, t, n, r, a) {
    const o = Do(e, t);
    if (!o.length) return null;
    const i = (p) => r.some((f) => f.from === p.from && f.to === p.to), c = (p) => {
      if (!a) return true;
      const f = Ro(e, p.from);
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
  }, jr = "set", gr = "clear";
  function xe(e) {
    return _e.getState(e) ?? Pt;
  }
  function ed(e, t) {
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
  function td(e, t) {
    if (t.ranges.length <= 1) return na.empty;
    const n = t.ranges[t.mainIndex], r = [];
    for (let a = 0; a < t.ranges.length; a += 1) {
      const o = t.ranges[a];
      n && o.from === n.from && o.to === n.to || (o.from === o.to ? r.push(ra.widget(o.from, () => {
        const i = document.createElement("span");
        return i.className = "haim-multi-cursor", i.setAttribute("aria-hidden", "true"), i;
      }, {
        side: -1
      })) : r.push(ra.inline(o.from, o.to, {
        class: "haim-multi-selection"
      })));
    }
    return na.create(e, r);
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
      type: jr,
      state: f
    }), o.scrollIntoView(), o;
  }
  function Va(e, t) {
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
      a = a.setSelection(H.create(a.doc, r.from, r.to));
    } catch {
    }
    return a.setMeta(_e, {
      type: jr,
      state: t
    }), n && a.scrollIntoView(), a;
  }
  function nd(e, t) {
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
      const x = o.map((v) => v.from !== v.to ? v : Ro(e.doc, v.from) ?? v);
      if (x.every((v, P) => v.from === o[P].from && v.to === o[P].to)) return false;
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
    const p = o[o.length - 1], f = Ju(e.doc, d, p.to, o, n.wholeWord);
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
  function rd(e, t) {
    if (xe(e).ranges.length > 1) return false;
    const { selection: r } = e;
    if (r.empty) return false;
    const a = rn(e.doc, {
      from: r.from,
      to: r.to
    });
    if (!a) return false;
    const o = Do(e.doc, a);
    if (o.length <= 1) return false;
    let i = o.findIndex((d) => d.from === r.from && d.to === r.to);
    return i < 0 && (i = 0), t && t(br(e, {
      ranges: o,
      mainIndex: i,
      query: a,
      wholeWord: false
    })), true;
  }
  function ad() {
    return new Ie({
      key: _e,
      state: {
        init: () => Pt,
        apply(e, t) {
          const n = e.getMeta(_e);
          if ((n == null ? void 0 : n.type) === gr) return Pt;
          if ((n == null ? void 0 : n.type) === jr) return n.state;
          if (t.ranges.length === 0) return t;
          let r = t;
          if (e.docChanged) {
            const a = ed(t.ranges, e.mapping);
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
          return td(e.doc, xe(e));
        },
        handleTextInput(e, t, n, r) {
          const a = xe(e.state);
          return a.ranges.length <= 1 ? false : (e.dispatch(xr(e.state, a.ranges, r, a.mainIndex)), true);
        },
        handleKeyDown(e, t) {
          return xe(e.state).ranges.length <= 1 ? false : t.key === "Backspace" ? (t.preventDefault(), Va(e, "backward")) : t.key === "Delete" ? (t.preventDefault(), Va(e, "forward")) : false;
        },
        handleClick(e) {
          return xe(e.state).ranges.length <= 1 || e.dispatch(e.state.tr.setMeta(_e, {
            type: gr
          })), false;
        }
      }
    });
  }
  const od = ze.create({
    name: "haimMultiCursor",
    priority: 1e3,
    addCommands() {
      return {
        selectNextOccurrence: () => ({ state: e, dispatch: t }) => nd(e, t),
        selectAllOccurrences: () => ({ state: e, dispatch: t }) => rd(e, t),
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
        ad()
      ];
    }
  }), sd = new Ne("haimSelectionInlineCode");
  function id(e) {
    const { $from: t, $to: n } = e.state.selection;
    return t.parent.type.name === "codeBlock" || n.parent.type.name === "codeBlock";
  }
  function ld(e, t, n) {
    return t.defaultPrevented || t.isComposing || !$l(t) || e.state.selection.empty || e.state.selection.$from.pos === e.state.selection.$to.pos || id(e) || !e.state.schema.marks.code ? false : n();
  }
  const cd = ze.create({
    name: "haimSelectionInlineCode",
    priority: 1e3,
    addProseMirrorPlugins() {
      const e = this.editor;
      return [
        new Ie({
          key: sd,
          props: {
            handleKeyDown(t, n) {
              return ld(t, n, () => e.commands.toggleCode());
            }
          }
        })
      ];
    }
  }), ud = Ae.create({
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
  function Ua({ label: e, onClick: t, children: n }) {
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
  function Bo(e, t) {
    const [n, r] = h.useState(null), [a, o] = h.useState(false);
    return h.useEffect(() => {
      const i = String(e || "").trim();
      if (!i) {
        r(null), o(false);
        return;
      }
      try {
        const c = Rl.renderToString(i, {
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
  function dd({ node: e, updateAttributes: t, editor: n, selected: r }) {
    const a = String(e.attrs.latex || ""), o = n.isEditable, [i, c] = h.useState(false), [d, p] = h.useState(a), f = h.useRef(null), { html: m, error: g } = Bo(a, true);
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
            children: l.jsx(Ua, {
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
            children: l.jsx(Ua, {
              label: "\uC18C\uC2A4 \uD3B8\uC9D1",
              onClick: () => c(true),
              children: l.jsx(uo, {
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
  function fd({ node: e, updateAttributes: t, editor: n, selected: r }) {
    const a = String(e.attrs.latex || ""), o = n.isEditable, [i, c] = h.useState(false), [d, p] = h.useState(a), f = h.useRef(null), { html: m, error: g } = Bo(a, false);
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
  let hd, pd, md, Ho, gd;
  hd = Ps.extend({
    addNodeView() {
      return st(dd);
    }
  }).configure({
    katexOptions: {
      throwOnError: false,
      displayMode: true
    }
  });
  pd = $s.extend({
    addNodeView() {
      return st(fd);
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
  md = /* @__PURE__ */ new Set([
    "js",
    "javascript",
    "jsx",
    "mjs",
    "cjs",
    "ts",
    "typescript",
    "tsx"
  ]);
  Ho = new Set(Object.values(gn));
  gd = new Ne("haimCodeBlockBracketPairs");
  function ot(e, t) {
    return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
  }
  function kr(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
  }
  wr = function(e) {
    return md.has(String(e || "").trim().toLowerCase());
  };
  function Oo(e) {
    const { $from: t, $to: n } = e.selection;
    return t.parent.type.name !== "codeBlock" || n.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === n.before(n.depth);
  }
  xd = function(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
    const { key: t, code: n } = e;
    return t === "`" || n === "Backquote" && !e.shiftKey ? "`" : t in gn || Ho.has(t) ? t : n === "Quote" ? e.shiftKey ? '"' : "'" : null;
  };
  function Xa(e) {
    return e ? /[\w$]/.test(e) : false;
  }
  function bd(e, t) {
    const { from: n } = e.selection, r = ot(e, n - 1), a = ot(e, n);
    return !(Xa(r) || Xa(a) || a === t);
  }
  function kd(e, t) {
    if (!Oo(e) || t === "`" && !wr(kr(e))) return null;
    const { selection: n } = e, { from: r, to: a, empty: o } = n, i = gn[t];
    if (i !== void 0) {
      if (!o) {
        const d = e.doc.textBetween(r, a), p = e.tr.insertText(`${t}${d}${i}`, r, a);
        return p.setSelection(H.create(p.doc, r + t.length, r + t.length + d.length)), p;
      }
      if ((t === "'" || t === '"' || t === "`") && !bd(e, t)) return ot(e, r) === t ? e.tr.setSelection(H.create(e.doc, r + 1)) : null;
      const c = e.tr.insertText(`${t}${i}`, r, a);
      return c.setSelection(H.create(c.doc, r + t.length)), c;
    }
    return Ho.has(t) && o && ot(e, r) === t ? t === "`" && !wr(kr(e)) ? null : e.tr.setSelection(H.create(e.doc, r + 1)) : null;
  }
  function wd(e) {
    if (!Oo(e)) return null;
    const { selection: t } = e;
    if (!t.empty) return null;
    const { from: n } = t, r = ot(e, n - 1), a = ot(e, n), o = gn[r];
    return !o || a !== o || r === "`" && !wr(kr(e)) ? null : e.tr.delete(n - 1, n + 1);
  }
  function yd(e, t) {
    if (t.defaultPrevented) return false;
    if (t.key === "Backspace") {
      if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
      const a = wd(e.state);
      return a ? (e.dispatch(a), true) : false;
    }
    const n = xd(t);
    if (!n) return false;
    const r = kd(e.state, n);
    return r ? (e.dispatch(r), true) : false;
  }
  function Cd() {
    return new Ie({
      key: gd,
      props: {
        handleKeyDown(e, t) {
          return yd(e, t);
        }
      }
    });
  }
  function Sd(e) {
    var _a2;
    return ((_a2 = String(e ?? "").match(/^[ \t]*/)) == null ? void 0 : _a2[0]) ?? "";
  }
  function cn(e) {
    return /^[ \t]*$/.test(String(e ?? ""));
  }
  function _o(e) {
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
  Md = function(e, t) {
    const n = String(e ?? ""), r = Math.max(0, Math.min(t, n.length)), a = n.lastIndexOf(`
`, r - 1) + 1, o = n.indexOf(`
`, r), i = n.slice(a, o === -1 ? n.length : o);
    return Sd(i);
  };
  function bn(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function vd(e) {
    if (!bn(e)) return null;
    const { $from: t, from: n, to: r } = e.selection, a = t.parent.textContent, i = `
${Md(a, t.parentOffset)}`, c = e.tr.insertText(i, n, r);
    return c.setSelection(H.create(c.doc, n + i.length)), c;
  }
  function jd(e) {
    if (!bn(e)) return null;
    const { $from: t } = e.selection, n = t.parent.textContent, r = t.parentOffset, a = n.lastIndexOf(`
`, r - 1) + 1, o = t.start() + a, i = e.tr.insertText(`
`, o);
    return i.setSelection(H.create(i.doc, o)), i;
  }
  function Ed(e) {
    if (!bn(e)) return null;
    const { $from: t, empty: n } = e.selection;
    if (!n || !(t.parentOffset === t.parent.nodeSize - 2)) return null;
    const a = t.parent.textContent;
    if (!_o(a)) return null;
    const o = xn(a), i = t.start(), c = t.end(), d = e.tr.insertText(o, i, c);
    return d.setSelection(H.create(d.doc, i + o.length)), d;
  }
  function Td(e, t) {
    const { $from: n, empty: r } = t.selection;
    if (!r || n.parent.type.name !== "codeBlock" || n.parentOffset !== n.parent.nodeSize - 2) return false;
    const a = n.parent.textContent;
    if (!_o(a)) return false;
    const o = xn(a), i = n.start(), c = n.end();
    return e.insertText(o, i, c), e.setSelection(H.create(e.doc, i + o.length)), true;
  }
  function Ld(e) {
    const { state: t } = e;
    if (!bn(t)) return false;
    if (Ed(t)) return e.chain().command(({ tr: r, state: a }) => Td(r, a)).exitCode().run();
    const n = vd(t);
    return n ? (e.view.dispatch(n), true) : false;
  }
  function Id(e) {
    const t = jd(e.state);
    return t ? (e.view.dispatch(t), true) : false;
  }
  const Nd = new Ne("haimCodeBlockIndent");
  function Ad(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
  }
  function Er(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function Tr(e, t, n) {
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
  function Ya(e, t) {
    var _a2;
    const n = ((_a2 = e.match(/^ */)) == null ? void 0 : _a2[0]) ?? "";
    return Math.min(n.length, t);
  }
  function Pd(e, t) {
    if (!Er(e)) return null;
    const n = Math.max(1, Math.round(t)), r = " ".repeat(n), { selection: a } = e, { from: o, to: i, empty: c } = a;
    if (c) {
      const g = e.tr.insertText(r, o);
      return g.setSelection(H.create(g.doc, o + r.length)), g;
    }
    const d = Tr(e, o, i);
    if (d.length === 0) return null;
    const p = e.tr;
    for (let g = d.length - 1; g >= 0; g -= 1) p.insertText(r, d[g]);
    const f = d[0], m = p.mapping.map(i);
    return p.setSelection(H.create(p.doc, f, m)), p;
  }
  function $d(e, t) {
    var _a2;
    if (!Er(e)) return null;
    const n = Math.max(1, Math.round(t)), { selection: r, doc: a } = e, { $from: o, empty: i } = r;
    if (i) {
      const S = o.start(), E = o.end(), I = a.textBetween(S, E, `
`, `
`).split(`
`), B = o.pos - S;
      let G = 0, le = 0;
      for (let R = 0; R < I.length; R += 1) {
        const K = I[R] ?? "";
        if (le + K.length >= B) {
          G = R;
          break;
        }
        le += K.length + 1, R === I.length - 1 && (G = R);
      }
      const it = I[G] ?? "", oe = Ya(it, n);
      if (oe === 0) return e.tr;
      let T = S;
      for (let R = 0; R < G; R += 1) T += (((_a2 = I[R]) == null ? void 0 : _a2.length) ?? 0) + 1;
      const L = e.tr.delete(T, T + oe);
      return o.pos - T <= oe ? L.setSelection(H.create(L.doc, T)) : L.setSelection(H.create(L.doc, o.pos - oe)), L;
    }
    const { from: c, to: d } = r, p = Tr(e, c, d);
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
    let v = 0, P = 0;
    for (let S = p.length - 1; S >= 0; S -= 1) {
      const E = p[S], D = w.get(E) ?? "", I = Ya(D, n);
      I !== 0 && (k.delete(E, E + I), P += I, E < c && (v += I));
    }
    if (P === 0) return k;
    const _ = Math.max(p[0], c - v), N = k.mapping.map(d);
    return k.setSelection(H.create(k.doc, _, Math.max(_, N))), k;
  }
  function Rd(e, t) {
    if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !Er(e.state)) return false;
    const n = Ad(e.state), r = Dl(n, Bl()), a = t.shiftKey ? $d(e.state, r) : Pd(e.state, r);
    return a ? (e.dispatch(a), true) : false;
  }
  function Dd() {
    return new Ie({
      key: Nd,
      props: {
        handleKeyDown(e, t) {
          return Rd(e, t);
        }
      }
    });
  }
  function Bd(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function Hd(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
  }
  function Od(e, t) {
    const r = e.doc.resolve(t).end(), a = e.doc.textBetween(t, r, `
`, `
`), o = a.indexOf(`
`);
    return o < 0 ? a : a.slice(0, o);
  }
  function _d(e) {
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
    return Tr(e, t, n).map((i) => ({
      from: i,
      text: Od(e, i)
    }));
  }
  function zd(e) {
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
  function Fd(e, t) {
    const n = e.tr, r = zl(t);
    for (const c of r) c.to != null && c.to !== c.from ? n.insertText(c.insert, c.from, c.to) : n.insertText(c.insert, c.from);
    const { from: a, to: o, empty: i } = e.selection;
    if (i) {
      const c = n.mapping.map(a, 1);
      n.setSelection(H.create(n.doc, c));
    } else {
      const c = n.mapping.map(a, -1), d = n.mapping.map(o, 1);
      n.setSelection(H.create(n.doc, c, Math.max(c, d)));
    }
    return n;
  }
  function Kd(e) {
    if (!Bd(e)) return null;
    const t = _d(e);
    if (t.length === 0) return null;
    const n = Hl(Hd(e));
    let r = null;
    return n.line ? r = Ol(t, n.line) : n.block && (r = _l(zd(t), n.block.open, n.block.close)), !r || r.length === 0 ? null : Fd(e, r);
  }
  function Wd(e) {
    const t = Kd(e.state);
    return t ? (e.view.dispatch(t), true) : false;
  }
  function Qa(e) {
    return String(e || "").trim().toLowerCase() === "mermaid";
  }
  function qd(e) {
    var _a2;
    return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
  }
  const zo = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", Vd = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Ud = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
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
            className: zo,
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
  function Xd({ language: e, onChange: t }) {
    const n = h.useId(), r = h.useRef(null), [a, o] = h.useState(false), [i, c] = h.useState(""), [d, p] = h.useState(0), f = Fl(e), m = Kl(e), g = Wl(e), x = ql(f, i), w = i.trim(), k = w.toLowerCase() === "plain" ? Vl : w, P = !!w && !x.some((S) => S.value.toLowerCase() === k.toLowerCase() || S.label.toLowerCase() === w.toLowerCase()) ? [
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
      t(Ul(S)), o(false);
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
    return l.jsxs(Sl, {
      open: a,
      onOpenChange: o,
      children: [
        l.jsxs(un, {
          children: [
            l.jsx(dn, {
              asChild: true,
              children: l.jsx(Ml, {
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
                      children: l.jsx(ho, {
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
                className: zo,
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
        l.jsx(vl, {
          children: l.jsxs(jl, {
            className: Vd,
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
                  l.jsx(co, {
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
                      className: Ud,
                      onMouseEnter: () => p(E),
                      onMouseDown: (B) => B.preventDefault(),
                      onClick: () => _(S.value),
                      children: [
                        D ? l.jsx("span", {
                          className: "absolute left-1.5 inline-flex items-center",
                          children: l.jsx(fo, {
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
  function Yd({ language: e, collapsed: t, copied: n, editable: r, onCopy: a, onToggleCollapse: o, onLanguageChange: i, extra: c }) {
    return l.jsxs("div", {
      className: "haim-code-block__header",
      children: [
        r && i ? l.jsx(Xd, {
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
              children: n ? l.jsx(fo, {
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
              children: t ? l.jsx(ho, {
                size: 14,
                "aria-hidden": true
              }) : l.jsx(gl, {
                size: 14,
                "aria-hidden": true
              })
            })
          ]
        })
      ]
    });
  }
  function Qd({ node: e, editor: t, selected: n, updateAttributes: r }) {
    const a = String(e.attrs.language || ""), o = Qa(a), i = e.textContent || "", [c, d] = h.useState(null), [p, f] = h.useState(false), [m, g] = h.useState(false), [x, w] = h.useState(false), [k, v] = h.useState(false), P = t.isEditable, _ = h.useRef(null);
    h.useEffect(() => {
      var _a2;
      if (!o || m || x) return;
      let I = false;
      const B = qd(((_a2 = t.view) == null ? void 0 : _a2.dom) ?? null);
      return Xl(i, B).then((G) => {
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
      const I = i, B = () => {
        v(true), window.setTimeout(() => v(false), 1500);
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
      i
    ]), S = h.useCallback((I) => {
      r({
        language: I
      }), Qa(I) || (g(false), d(null), f(false));
    }, [
      r
    ]), E = l.jsx("pre", {
      className: "haim-mermaid-block__source-hidden",
      "aria-hidden": true,
      children: l.jsx(aa, {
        as: "code"
      })
    }), D = l.jsx(Yd, {
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
        }) : l.jsx(uo, {
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
                l.jsx(No, {
                  text: i,
                  className: "haim-code-block__line-numbers",
                  contentRootRef: _
                }),
                l.jsx("pre", {
                  ref: _,
                  className: a ? `language-${a}` : void 0,
                  children: l.jsx(aa, {
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
  Yf = function(e, t) {
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
  const Gd = new Ne("haimTrimCodeEdges");
  function Zd() {
    return new Ie({
      key: Gd,
      appendTransaction(e, t, n) {
        if (!e.some((v) => v.selectionSet || v.docChanged) || e.some((v) => v.getMeta("haimTrimCodeEdges"))) return null;
        const r = t.selection.$from, a = n.selection.$from, o = r.parent.type.name === "codeBlock", i = a.parent.type.name === "codeBlock";
        if (!o || i) return null;
        const c = r.depth, d = r.node(c), p = r.before(c);
        if (d.type.name !== "codeBlock") return null;
        const f = d.textContent, m = xn(f);
        if (m === f) return null;
        const g = p + 1, x = p + d.nodeSize - 1;
        let w = g, k = x;
        for (const v of e) w = v.mapping.map(w), k = v.mapping.map(k);
        return n.tr.insertText(m, w, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
      }
    });
  }
  const Jd = Yl(Ql), ef = Rs.extend({
    priority: 1e3,
    addNodeView() {
      return st(Qd);
    },
    addKeyboardShortcuts() {
      var _a2;
      return {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {},
        Enter: ({ editor: t }) => Ld(t),
        "Shift-Enter": ({ editor: t }) => Id(t),
        "Mod-/": ({ editor: t }) => Wd(t)
      };
    },
    addProseMirrorPlugins() {
      var _a2;
      return [
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [],
        Zd(),
        Cd(),
        Dd()
      ];
    }
  }).configure({
    lowlight: Jd,
    languageClassPrefix: "language-",
    enableTabIndentation: false,
    exitOnTripleEnter: false
  }), tf = Ds.extend({
    excludes: "code"
  }), tr = "&nbsp;", nr = "\xA0", nf = Bs.extend({
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
  }), rf = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
  Qf = function(e) {
    const t = typeof e == "string" ? e : "", n = rf.exec(t);
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
  af = function(e, t) {
    return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
  };
  const of = 3;
  function an(e) {
    let t = 0;
    for (let n = 0; n < e.length; n += 1) e.charCodeAt(n) === 10 && (t += 1);
    return t;
  }
  function Fo(e) {
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
  function sf(e, t) {
    return Fo(e)(t);
  }
  function lf(e) {
    if (!e) return 0;
    const t = "\0", n = af(e, t), r = n.indexOf(t);
    return r < 0 ? 0 : sf(n, r);
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
  function cf(e, t, n) {
    var _a2, _b;
    if (!t || !n || n.length === 0 || t.childCount !== e.childCount || n.length !== e.childCount) return false;
    for (let a = 0; a < e.childCount; a += 1) if (((_a2 = e.child(a)) == null ? void 0 : _a2.type.name) !== ((_b = t.child(a)) == null ? void 0 : _b.type.name)) return false;
    let r = 0;
    for (let a = 0; a < e.childCount; a += 1) if (e.child(a) !== t.child(a) && (r += 1, r > of)) return false;
    return true;
  }
  function uf(e, t, n, r) {
    const a = [];
    let o = 0, i = 0;
    return e.forEach((c, d) => {
      const p = t.child(i), f = n[i], m = d + c.nodeSize;
      if (!f || !p) {
        const k = on(r, c), v = an(k);
        a.push({
          pos: d,
          to: m,
          line0: (f == null ? void 0 : f.line0) ?? 0,
          blockNewlines: v
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
  function df(e, t, n) {
    const r = lf(n);
    let a = "";
    try {
      a = t(e.toJSON());
    } catch {
      a = "";
    }
    const o = Fo(a), i = [];
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
  function ff(e, t, n, r, a) {
    return cf(e, r, a) && r && a ? uf(e, r, a, t) : df(e, t, n);
  }
  function hf(e) {
    return !e.enabled || !e.docChanged ? false : e.tipTapFocused;
  }
  function pf(e) {
    var _a2;
    const n = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
    return !n || typeof n.serialize != "function" ? null : (r) => n.serialize(r);
  }
  function Ga(e) {
    return e.map((t) => Hs.Node(t.pos, t.to, {
      "data-line": String(t.line0)
    }));
  }
  const mf = ze.create({
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
          return o ? hf({
            enabled: o,
            docChanged: a.docChanged,
            tipTapFocused: !!((_b = (_a2 = r.view) == null ? void 0 : _a2.hasFocus) == null ? void 0 : _b.call(_a2))
          }) ? false : a.docChanged : true;
        },
        create: ({ editor: r, state: a }) => {
          if (!t()) return n.lastDoc = null, n.lastEntries = [], [];
          const o = pf(r);
          if (!o) return [];
          if (n.lastDoc === a.doc && n.lastEntries.length > 0) return Ga(n.lastEntries);
          const i = e() || "", c = ff(a.doc, o, i, n.lastDoc, n.lastEntries);
          return n.lastDoc = a.doc, n.lastEntries = c, Ga(c);
        }
      };
    }
  });
  function gf(e, t, n) {
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
  const xf = [
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
  ], bf = ze.create({
    name: "haimTypography",
    addOptions() {
      return {
        initialRules: {
          ...oo
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
      return xf.map(({ find: e, replace: t, ruleId: n }) => gf(e, t, () => !!this.storage.rules[n]));
    }
  });
  Gf = function(e) {
    const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", a = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), o = (e == null ? void 0 : e.isSourceLineEnabled) ?? (() => true), i = (e == null ? void 0 : e.typographyRules) ?? oo, d = [
      r ? oa.configure({
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
      }) : oa.configure({
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
      tf,
      _u.configure({
        levels: [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }),
      nf,
      Vc,
      mf.configure({
        getMetaPrefix: a,
        isEnabled: o
      }),
      Fc,
      qs.extend({
        parseHTML() {
          return [
            {
              tag: "img[src]:not([data-wiki-path])"
            }
          ];
        },
        addNodeView() {
          return st(Rc);
        }
      }).configure({
        inline: true,
        allowBase64: true
      }),
      Vs.configure({
        taskItem: false,
        taskList: false,
        orderedList: false
      }),
      Qc,
      Jc.configure({
        nested: true
      }),
      tu,
      Us.configure({
        table: {
          resizable: r
        }
      }),
      Os,
      Xs.configure({
        types: [
          "heading",
          "paragraph"
        ]
      }),
      Ys.configure({
        multicolor: true
      }),
      ...r ? [
        ef
      ] : [],
      _s,
      zs,
      bf.configure({
        initialRules: i
      }),
      Qs.configure({
        placeholder: t,
        ...r ? {} : {
          showOnlyCurrent: false
        }
      }),
      Fs,
      Gs.configure({
        className: "haim-node-focused"
      }),
      Ks,
      Ws,
      hd,
      pd,
      iu,
      du,
      hu,
      fu,
      ...r ? [
        pu
      ] : [],
      Pu,
      $u,
      ud,
      Xu,
      Gu,
      od,
      cd,
      ...r ? [
        qu
      ] : []
    ];
    return r ? [
      ...d,
      Zs,
      ni.configure({
        controls: true,
        nocookie: true
      }),
      ri.configure({
        persist: true
      }),
      Js,
      ei,
      ru,
      ti,
      ai.configure({
        injectCSS: true,
        visible: false
      }),
      oi.configure({
        types: [
          "heading",
          "paragraph"
        ]
      }),
      si.configure({
        getIndex: ii
      }),
      ou
    ] : d;
  };
  const Rt = /* @__PURE__ */ new WeakMap();
  kf = function(e) {
    if (!e) return "";
    const t = e.state.doc, n = Rt.get(e);
    if (n && n.doc === t) return n.markdown;
    const r = e, a = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
    return Rt.set(e, {
      doc: t,
      markdown: a
    }), a;
  };
  Zf = function(e, t, n) {
    if (!e) return n("");
    const r = e.state.doc, a = Rt.get(e);
    if (a && a.doc === r && a.vaultPrefix === t && a.vaultMarkdown != null) return a.vaultMarkdown;
    const o = kf(e), i = n(o), c = Rt.get(e);
    return c && c.doc === r && (c.vaultPrefix = t, c.vaultMarkdown = i), i;
  };
  Jf = function(e) {
    e && Rt.delete(e);
  };
});
export {
  gn as C,
  Iu as H,
  __tla,
  Zf as a,
  Po as b,
  Gf as c,
  xd as d,
  wr as e,
  Md as f,
  kf as g,
  yc as h,
  Jf as i,
  af as j,
  Xf as k,
  Lu as l,
  Ff as m,
  Uf as n,
  La as o,
  Tu as p,
  Wf as q,
  qf as r,
  Qf as s,
  Yf as t,
  jo as u,
  So as v,
  Vf as w,
  Kf as x
};
