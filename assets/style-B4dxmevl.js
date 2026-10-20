const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-jsqr-781CUKnt.js","assets/vendor-react-BPvvDyqO.js"])))=>i.map(i=>d[i]);
import { e as be, f as ms, h as ke, P as Ie, i as Ne, j as gs, M as xs, O as Ga, p as bs, k as ks, I as nr, r as ws, l as Xn, n as ys, o as Cs, q as ea, t as Ss, g as Ms, v as vs, T as B, w as Ae, x as js, y as Es, b as Za, R as st, z as Ts, A as ze, B as Ls, C as Is, F as ta, G as na, H as Ns, J as As, K as ra, L as Ps, Q as $s, S as Rs, U as aa, V as Ds, W as Hs, X as Bs, Y as Os, Z as _s, _ as zs, $ as Fs, a0 as Ks, a1 as Ws, a2 as qs, a3 as Us, a4 as Vs, a5 as Xs, a6 as Ys, a7 as Qs, a8 as Gs, a9 as Zs, aa as Js, ab as ei, ac as ti, ad as ni, ae as ri, af as ai } from "./vendor-tiptap-CCuN4hjl.js";
import { r as p, j as l, c as oi, a as si, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as Yn, m as tt } from "./vendor-motion-Bv-XITR_.js";
import { t as ii, O as li } from "./index-flVIUjar.js";
import { c as ci, n as nt, a6 as ui, C as di, i as fi, e6 as hi, aJ as oa, fO as Ja, jC as eo, jD as to, dU as pi, i5 as mi, es as on, a5 as yr, jE as gi, jF as no, ik as sa, q as xi, aY as ro, jG as bi, jH as ki, jI as ao, __tla as __tla_1 } from "./index-BWRKY1kH.js";
import { g as wi } from "./Kbd-Cnuyx3cZ.js";
import { a as yi, i as Ci } from "./copyImageToClipboard-CSIFGHOw.js";
import { _ as Si } from "./vendor-aws-hJDgVEKM.js";
import { v as rr, bs as Mi, P as ia, aU as vi, bt as ji, bu as Ei, x as Ti, aP as la, H as ca, U as oo, R as so, T as Li, bv as Ii, ah as Ni, q as Ai, a as ar, b9 as io, y as Pi, bw as $i, E as Cr, bf as Ri, X as Qn, au as Di, B as Hi, I as Bi, e as Oi, f as _i, j as zi, b0 as Fi, b1 as Ki, g as Wi, h as qi, i as ua, Q as Ui, bb as Vi, k as da, b5 as Xi, b6 as Yi, b7 as Qi, b8 as Gi, Z as Vt, aY as jt, aR as Zi, S as Ji, aW as el, p as lo, ba as tl, bd as nl, b2 as rl, b3 as al, b4 as ol, bx as sl, by as il, bz as ll, bA as co, C as uo, m as fo, l as cl } from "./vendor-lucide-WaT9JbCs.js";
import { a3 as ul, a4 as dl, a5 as fl, a6 as hl, a7 as pl, a8 as ml, U as Et, V as Tt, W as Gn, Y as Lt, Z as It, _ as Nt, a1 as Ee, a2 as Te, P as $t, n as cn, T as un, p as dn, C as fn, A as hn, q as gl, r as xl, t as bl, v as kl } from "./vendor-radix-D1Cm_mSM.js";
import { d as ho, __tla as __tla_2 } from "./bootSplash-CNqesnab.js";
import { b as At, c as en, d as fa, e as po, a as wl, s as yl, f as ha, g as Cl } from "./emojiShortcode-CsHTmfPL.js";
import { W as Sl, __tla as __tla_3 } from "./WikiImageSizeModal-BwUb0in7.js";
import { c as Ml, f as vl } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as jl } from "./toHtml-Ds4gmJ8u.js";
import { p as El } from "./mdEditorSelectionWrap-Dw_M3bkD.js";
import { k as Tl } from "./vendor-katex-NqpuB_gR.js";
import { r as Ll, l as Il } from "./haimCodeTabSettings-BI7a8VYQ.js";
import { r as Nl, p as Al, a as Pl, s as $l } from "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import { b as Rl, s as Dl, h as Hl, f as Bl, a as Ol, l as _l } from "./haimCodeBlockLanguages-BStQPvla.js";
import { c as zl, __tla as __tla_4 } from "./lazyMermaid-BcnyKPEC.js";
import { c as Fl, g as Kl } from "./vendor-highlight-Dm7Q9DxH.js";
let mn, Su, Wf, Ao, Kf, ud, kr, xd, df, pc, qf, Qd, _f, Cu, $f, Of, Ta, yu, Df, Hf, Ff, zf, vo, Co, Bf, Rf;
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
  function Wl() {
    var _a2;
    return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
  }
  async function ql(e) {
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
  async function mo(e) {
    const { src: t, inkCanvas: n, highlightCanvas: r } = e, a = await Vl(t), o = ("width" in a, a.width), s = ("height" in a, a.height), c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(o)), c.height = Math.max(1, Math.round(s));
    const u = c.getContext("2d");
    if (!u) throw new Error("Canvas 2D unavailable");
    if (u.imageSmoothingEnabled = true, u.imageSmoothingQuality = "high", u.drawImage(a, 0, 0, c.width, c.height), n && n.width > 0 && n.height > 0 && u.drawImage(n, 0, 0, c.width, c.height), r && r.width > 0 && r.height > 0 && u.drawImage(r, 0, 0, c.width, c.height), "close" in a && typeof a.close == "function") try {
      a.close();
    } catch {
    }
    return c;
  }
  function tn(e) {
    return new Promise((t, n) => {
      e.toBlob((r) => {
        r ? t(r) : n(new Error("Failed to encode PNG"));
      }, "image/png");
    });
  }
  async function Ul(e) {
    const t = await mo(e);
    return tn(t);
  }
  async function Vl(e) {
    try {
      const t = await fetch(e, {
        mode: "cors",
        credentials: "omit"
      });
      if (!t.ok) throw new Error(`fetch ${t.status}`);
      const n = await t.blob();
      return await createImageBitmap(n);
    } catch {
      return await Xl(e);
    }
  }
  function Xl(e) {
    return new Promise((t, n) => {
      const r = new Image();
      r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(new Error("Image load failed for composite")), r.src = e;
    });
  }
  function pn(e) {
    return Math.max(e.diameterX, e.diameterY);
  }
  function go(e) {
    return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
  }
  function Yl(e, t) {
    return !(t >= 8) || !(e >= 1) ? 1 : W(e / t, 0.25, 12);
  }
  function pa(e, t, n) {
    const r = Math.max(4, Math.min(96, Math.min(t, n) * 0.08));
    return W(e, 0.5, r);
  }
  function xo(e, t) {
    if (e.length < 2) return 0;
    const n = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
    if (n === r) {
      const s = e[Math.max(0, t - 1)], c = e[t];
      return Math.atan2(c.y - s.y, c.x - s.x);
    }
    const a = e[n], o = e[r];
    return Math.atan2(o.y - a.y, o.x - a.x);
  }
  function bo(e, t) {
    if (e.length === 0) return [];
    const n = e[0];
    if (!n) return [];
    const r = Math.max(0.5, t), a = [
      {
        ...n
      }
    ];
    let o = 0;
    for (let s = 1; s < e.length; s += 1) {
      const c = e[s - 1], u = e[s], h = Math.hypot(u.x - c.x, u.y - c.y);
      if (h < 1e-6) continue;
      let d = 0;
      for (; o + (h - d) >= r; ) {
        const m = r - o, g = (d + m) / h;
        a.push({
          x: c.x + (u.x - c.x) * g,
          y: c.y + (u.y - c.y) * g,
          pressure: c.pressure + (u.pressure - c.pressure) * g
        }), d += m, o = 0;
      }
      o += h - d;
    }
    return a;
  }
  const Ql = [
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
  ], Gl = [
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
  const ko = 0.92, ma = 0.35;
  function Zl(e, t) {
    const n = e.x - t.x, r = e.y - t.y;
    return n * n + r * r;
  }
  function wo(e, t, n = ko) {
    const r = W(n, 0.05, 1);
    return {
      x: e.x + (t.x - e.x) * r,
      y: e.y + (t.y - e.y) * r,
      pressure: e.pressure + (t.pressure - e.pressure) * r
    };
  }
  function Jl(e, t, n, r = ko) {
    let a = t;
    const o = ma * ma;
    for (const s of n) {
      a = wo(a, s, r);
      const c = e[e.length - 1];
      !c || Zl(c, a) >= o ? e.push({
        ...a
      }) : (c.x = a.x, c.y = a.y, c.pressure = a.pressure);
    }
    return a;
  }
  function ec(e) {
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
      const a = e[r === 0 ? 0 : r - 1], o = e[r], s = e[r + 1], c = e[r + 2 < e.length ? r + 2 : r + 1], u = o.x + (s.x - a.x) / 6, h = o.y + (s.y - a.y) / 6, d = s.x - (c.x - o.x) / 6, m = s.y - (c.y - o.y) / 6;
      n += ` C ${u} ${h} ${d} ${m} ${s.x} ${s.y}`;
    }
    return n;
  }
  function or(e) {
    if (e.dash !== "dashed") return;
    const t = pn(e), n = Math.max(2, t * 1.2);
    return `${Math.max(2, t * 2.2)} ${n}`;
  }
  function sr(e) {
    return e === "square" ? "square" : "round";
  }
  function ir(e) {
    return e === "square" ? "miter" : "round";
  }
  function tc(e) {
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
  function ga(e, t, n) {
    e.lineCap = sr(t.shape), e.lineJoin = ir(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, n), e.globalAlpha = W(t.opacity, 0.02, 1);
    const r = or(t);
    r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
  }
  function nc(e, t, n, r, a = 1) {
    const o = Math.max(0.25, t.diameterX * a / 2), s = Math.max(0.25, t.diameterY * a / 2);
    e.save(), e.translate(n.x, n.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-o, -s, o * 2, s * 2) : e.ellipse(0, 0, o, s, 0, 0, Math.PI * 2), e.fill(), e.restore();
  }
  function yo(e, t) {
    if (t.points.length < 1) return;
    if (e.globalAlpha = W(t.opacity, 0.02, 1), go(t)) {
      const a = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), o = bo(t.points, a);
      for (let s = 0; s < o.length; s += 1) {
        const c = o[s], u = Math.min(t.points.length - 1, Math.round(s / Math.max(1, o.length - 1) * (t.points.length - 1))), h = xo(t.points, u), d = t.kind === "pressure" ? c.pressure : 1;
        nc(e, t, c, h, d);
      }
      return;
    }
    const n = pn(t);
    if (t.kind === "pressure" && t.points.length >= 2) {
      for (let a = 1; a < t.points.length; a += 1) {
        const o = t.points[a - 1], s = t.points[a], c = Math.max(0.5, n * ((o.pressure + s.pressure) / 2));
        ga(e, t, c), e.beginPath(), e.moveTo(o.x, o.y), e.lineTo(s.x, s.y), e.stroke();
      }
      return;
    }
    ga(e, t, n), e.beginPath();
    const r = t.points[0];
    if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
    else for (let a = 1; a < t.points.length; a += 1) {
      const o = t.points[a];
      e.lineTo(o.x, o.y);
    }
    e.stroke();
  }
  function xa(e, t, n) {
    const r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
    const a = r.getContext("2d");
    if (!a) return r;
    a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
    for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = "source-over", a.strokeStyle = o.color), yo(a, o), a.restore();
    return r;
  }
  function ba(e, t, n) {
    const r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
    const a = r.getContext("2d");
    if (!a) return r;
    a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
    for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = tc(o.blend), a.strokeStyle = o.color), yo(a, o), a.restore();
    return r;
  }
  function ka(e, t, n) {
    var _a2;
    e.textBaseline = "top", e.textAlign = "left";
    for (const r of t) {
      const a = r.text ?? "";
      if (!a.trim() && a.length === 0) continue;
      const o = Math.max(1, r.fontSizePx * Math.max(1e-3, n));
      e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = W(r.opacity, 0.02, 1), e.fillStyle = r.color;
      const s = ((_a2 = r.fontFamily) == null ? void 0 : _a2.trim()) || "sans-serif";
      e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${o}px ${s}`;
      const c = o * 1.3, u = a.split(`
`);
      for (let h = 0; h < u.length; h += 1) e.fillText(u[h] ?? "", r.x, r.y + h * c);
      e.restore();
    }
  }
  const wa = 8192;
  function rc(e) {
    const t = Math.max(1, e.clientWidth), n = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, a = e.naturalHeight > 0 ? e.naturalHeight : n, o = Math.min(3, window.devicePixelRatio || 1);
    let s = Math.max(r, Math.round(t * o)), c = Math.max(a, Math.round(n * o));
    const u = Math.max(s, c);
    if (u > wa) {
      const h = wa / u;
      s = Math.max(1, Math.round(s * h)), c = Math.max(1, Math.round(c * h));
    }
    return {
      bufW: s,
      bufH: c,
      cssW: t,
      cssH: n
    };
  }
  let sn = null;
  $f = function(e) {
    sn = e;
  };
  function ac() {
    return typeof sn == "function";
  }
  Co = async function(e) {
    var _a2;
    if (!sn) throw new Error("Image upload is not available");
    const n = (_a2 = (await sn([
      e
    ]))[0]) == null ? void 0 : _a2.trim();
    if (!n) throw new Error("Upload returned no path");
    return n;
  };
  Rf = function(e) {
    return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [
      e.trim()
    ] : [];
  };
  function oc(e, t) {
    const n = Math.max(e.left, t.left), r = Math.max(e.top, t.top), a = Math.min(e.right, t.right), o = Math.min(e.bottom, t.bottom);
    return a - n < 1 || o - r < 1 ? null : {
      left: n,
      top: r,
      right: a,
      bottom: o
    };
  }
  function ya(e, t, n, r) {
    const a = Math.max(1, Math.round(t)), o = Math.max(1, Math.round(n)), s = oc(e, r);
    if (!s) return null;
    const c = Math.max(1, e.right - e.left), u = Math.max(1, e.bottom - e.top), h = (s.left - e.left) / c * a, d = (s.top - e.top) / u * o, m = (s.right - s.left) / c * a, g = (s.bottom - s.top) / u * o, x = Xt(Math.floor(h), 0, a - 1), y = Xt(Math.floor(d), 0, o - 1), k = Xt(Math.ceil(h + m), x + 1, a), v = Xt(Math.ceil(d + g), y + 1, o);
    return {
      sx: x,
      sy: y,
      sw: k - x,
      sh: v - y
    };
  }
  function sc(e, t, n, r = 2) {
    return e.sx <= r && e.sy <= r && e.sx + e.sw >= t - r && e.sy + e.sh >= n - r;
  }
  function Ca(e, t) {
    const n = document.createElement("canvas");
    n.width = Math.max(1, t.sw), n.height = Math.max(1, t.sh);
    const r = n.getContext("2d");
    if (!r) throw new Error("Canvas 2D unavailable");
    return r.drawImage(e, t.sx, t.sy, t.sw, t.sh, 0, 0, n.width, n.height), n;
  }
  function Xt(e, t, n) {
    return Math.min(n, Math.max(t, e));
  }
  function ic() {
    if (typeof window > "u") return null;
    const e = window.BarcodeDetector;
    return typeof e == "function" ? e : null;
  }
  async function lc(e) {
    const t = ic();
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
  async function cc(e) {
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
      const r = await new Promise((u, h) => {
        const d = new Image();
        d.decoding = "async", d.onload = () => u(d), d.onerror = () => h(new Error("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")), d.src = n;
      }), a = Math.max(1, r.naturalWidth || r.width), o = Math.max(1, r.naturalHeight || r.height), s = document.createElement("canvas");
      s.width = a, s.height = o;
      const c = s.getContext("2d", {
        willReadFrequently: true
      });
      if (!c) throw new Error("Canvas\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return c.drawImage(r, 0, 0), c.getImageData(0, 0, a, o);
    } finally {
      URL.revokeObjectURL(n);
    }
  }
  async function uc(e) {
    const n = (await Si(() => import("./vendor-jsqr-781CUKnt.js").then((o) => o.j), __vite__mapDeps([0,1]))).default, r = n(e.data, e.width, e.height, {
      inversionAttempts: "attemptBoth"
    });
    return String((r == null ? void 0 : r.data) ?? "").trim() || null;
  }
  function dc(e) {
    const t = Math.min(e.width, e.height);
    if (t >= 320 || t < 1) return e;
    const n = Math.min(4, 480 / t), r = document.createElement("canvas");
    r.width = Math.max(1, Math.round(e.width * n)), r.height = Math.max(1, Math.round(e.height * n));
    const a = r.getContext("2d");
    return a ? (a.imageSmoothingEnabled = false, a.drawImage(e, 0, 0, r.width, r.height), r) : e;
  }
  function fc(e) {
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
  async function hc(e) {
    const t = dc(e), n = await fc(t);
    return pc(n);
  }
  pc = async function(e) {
    if (!(e instanceof File) || e.size <= 0) throw new Error("\uC774\uBBF8\uC9C0 \uD30C\uC77C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    const t = await lc(e);
    if (t) return t;
    const n = await cc(e), r = await uc(n);
    if (r) return r;
    throw new Error("\uC774\uBBF8\uC9C0\uC5D0\uC11C QR \uCF54\uB4DC\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  };
  const Sr = [
    0.22,
    1,
    0.36,
    1
  ], mc = {
    duration: 0.2,
    ease: Sr
  }, gc = {
    duration: 0.28,
    ease: Sr
  }, Yt = 0.5, Qt = 8, rt = 1.25, xc = 2, Me = 0.5, Le = 128, bc = 4e3, So = 450, kc = [
    "#111827",
    "#ef4444",
    "#f59e0b",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ffffff"
  ], wc = [
    "#facc15",
    "#f472b6",
    "#38bdf8",
    "#4ade80",
    "#fb923c"
  ], yc = {
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
  function Cc(e) {
    return Math.max(0.1, at(e / 10));
  }
  function Sa(e, t) {
    return at(W(e + t * Cc(e), Me, Le));
  }
  const lr = 8, cr = 400;
  function Sc() {
    if (typeof navigator > "u") return false;
    const e = navigator.platform || "", t = navigator.userAgent || "";
    return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
  }
  const Mo = Sc(), ie = wi(), Ma = Mo ? `${ie}+Shift+Z` : `${ie}+Y`;
  function Mc(e, t) {
    const n = Math.max(1, Math.round(e / 10));
    return W(Math.round(e + t * n), lr, cr);
  }
  function vc(e, t) {
    if (!t) return 1;
    const n = e.pressure;
    return typeof n != "number" || Number.isNaN(n) || e.pointerType === "mouse" ? 0.5 : W(n || 0.05, 0.05, 1);
  }
  function q({ label: e, active: t = false, disabled: n = false, tone: r = "default", onClick: a, children: o }) {
    const s = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
    return l.jsxs(cn, {
      children: [
        l.jsx(un, {
          asChild: true,
          children: l.jsx("button", {
            type: "button",
            "aria-label": e,
            disabled: n,
            onClick: a,
            className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${s}`,
            children: o
          })
        }),
        l.jsx(dn, {
          children: l.jsxs(fn, {
            side: "top",
            sideOffset: 6,
            className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow",
            children: [
              e,
              l.jsx(hn, {
                className: "fill-neutral-900"
              })
            ]
          })
        })
      ]
    });
  }
  const jc = {
    backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)"
  };
  function va({ size: e = 16 }) {
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
  function ja({ size: e = 16 }) {
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
      transition: `opacity ${So}ms ease-out`
    } : {
      opacity: a
    };
    if (go(e)) {
      const u = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), h = bo(e.points, u);
      return l.jsx("g", {
        style: o,
        children: h.map((d, m) => {
          const g = Math.min(e.points.length - 1, Math.round(m / Math.max(1, h.length - 1) * (e.points.length - 1))), x = xo(e.points, g) * 180 / Math.PI, y = e.kind === "pressure" ? d.pressure : 1, k = Math.max(0.25, e.diameterX * y / 2), v = Math.max(0.25, e.diameterY * y / 2);
          return e.shape === "square" ? l.jsx("rect", {
            x: -k,
            y: -v,
            width: k * 2,
            height: v * 2,
            fill: r,
            transform: `translate(${d.x} ${d.y}) rotate(${x})`
          }, `${e.id}-st-${m}`) : l.jsx("ellipse", {
            cx: 0,
            cy: 0,
            rx: k,
            ry: v,
            fill: r,
            transform: `translate(${d.x} ${d.y}) rotate(${x})`
          }, `${e.id}-st-${m}`);
        })
      });
    }
    const s = pn(e);
    if (e.kind === "pressure" && e.points.length >= 2) return l.jsx("g", {
      style: o,
      children: e.points.slice(1).map((u, h) => {
        const d = e.points[h], m = Math.max(0.5, s * ((d.pressure + u.pressure) / 2));
        return l.jsx("path", {
          d: `M ${d.x} ${d.y} L ${u.x} ${u.y}`,
          fill: "none",
          stroke: r,
          strokeWidth: m,
          strokeLinecap: sr(e.shape),
          strokeLinejoin: ir(e.shape),
          strokeMiterlimit: 2,
          strokeDasharray: or({
            ...e,
            diameterX: m,
            diameterY: m
          }),
          style: {
            fill: "none"
          }
        }, `${e.id}-p-${h}`);
      })
    });
    const c = ec(e.points);
    return c ? l.jsx("path", {
      d: c,
      fill: "none",
      stroke: r,
      strokeWidth: s,
      strokeLinecap: sr(e.shape),
      strokeLinejoin: ir(e.shape),
      strokeMiterlimit: 2,
      strokeDasharray: or(e),
      style: {
        ...o,
        fill: "none"
      }
    }) : null;
  }
  vo = function({ src: e, alt: t = "", open: n, onClose: r, onSaveAnnotated: a }) {
    const o = !!(n && e), [s, c] = p.useState(1), [u, h] = p.useState({
      x: 0,
      y: 0
    }), [d, m] = p.useState("pan"), [g, x] = p.useState(false), [y, k] = p.useState("#111827ff"), [v, A] = p.useState("#facc15ff"), [_, N] = p.useState(4), [M, E] = p.useState(4), [D, I] = p.useState(1), [H, G] = p.useState(0.45), [le, it] = p.useState("multiply"), [oe, T] = p.useState("circle"), [L, z] = p.useState("solid"), [R, K] = p.useState([]), [F, J] = p.useState([]), [Fe, Ke] = p.useState([]), [ne, ee] = p.useState([]), [Y, Z] = p.useState(null), [Q, U] = p.useState(null), [Pe, se] = p.useState("Paperozi, sans-serif"), [te, lt] = p.useState(24), [We, bn] = p.useState("400"), [kn, wn] = p.useState("normal"), [Fo, yn] = p.useState(() => /* @__PURE__ */ new Set()), [re, ve] = p.useState(null), [Cn, Sn] = p.useState(false), [Ko, we] = p.useState([]), [P, Wo] = p.useState({
      w: 1,
      h: 1
    }), [Dt, ct] = p.useState(null), [qo, Mn] = p.useState(false), [ut, Tr] = p.useState(false), [Lr, Ht] = p.useState("idle"), qe = p.useRef(null), [ce, Ue] = p.useState(false), [Bt, Ve] = p.useState(false), [$e, dt] = p.useState(null), [vn, Re] = p.useState(null), [Uo, Ot] = p.useState(false), [je, fe] = p.useState(null), de = p.useRef(null), Ir = p.useRef(() => {
    }), he = p.useRef(0), [Nr, jn] = p.useState(null), [En, _t] = p.useState(false), [Tn, Ln] = p.useState(false), [In, ft] = p.useState(false), Nn = p.useRef({
      w: 4,
      h: 4
    }), ht = p.useRef(null), An = p.useRef(null), Xe = p.useRef(null), De = p.useRef(null), Ar = p.useRef([]), Pr = p.useRef([]), pt = p.useRef([]), ye = p.useRef(null), Ce = p.useRef(null), Pn = p.useRef(null), $r = p.useRef(null), $n = p.useRef(0), Se = p.useRef(null), Rn = p.useRef(null), Ye = p.useRef(null), mt = p.useRef(null), zt = p.useRef(null), He = p.useRef(null), gt = p.useRef(1), Rr = p.useRef(s), Dr = p.useRef(0), Qe = p.useRef(/* @__PURE__ */ new Map()), Dn = p.useRef([]), xt = p.useRef(null);
    Ar.current = R, Pr.current = F, pt.current = ne, Rr.current = s;
    const Hn = !!a && ac() && (R.length > 0 || F.length > 0 || ne.some((i) => i.text.trim().length > 0)), bt = ne.find((i) => i.id === Y) ?? null, kt = d === "highlighter" ? v : y, Vo = d === "highlighter" ? H : D, wt = p.useCallback(() => {
      c(1), h({
        x: 0,
        y: 0
      });
    }, []), Ft = p.useCallback(() => {
      for (const i of Qe.current.values()) clearTimeout(i);
      Qe.current.clear();
    }, []), Bn = p.useCallback(() => {
      K([]), J([]), Ke([]), ee([]), Z(null), U(null), yn(/* @__PURE__ */ new Set()), we([]), Dn.current = [], ve(null), Sn(false), ye.current = null, Ce.current = null, $n.current = 0;
      const i = $r.current, f = Pn.current;
      i && f && i.clearRect(0, 0, f.width, f.height), Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), mt.current = null, Ft();
    }, [
      Ft
    ]), On = p.useRef(false);
    p.useEffect(() => {
      if (!o) {
        On.current = false;
        return;
      }
      const i = !On.current;
      On.current = true, i && (wt(), Bn(), m("pan"), x(false), Ue(false), Ve(false), dt(null), Re(null), fe(null), de.current = null, he.current += 1, jn(null), ct(null));
    }, [
      o,
      e,
      wt,
      Bn
    ]), p.useEffect(() => {
      var _a2;
      o || (ft(false), Ft(), (_a2 = xt.current) == null ? void 0 : _a2.call(xt), xt.current = null);
    }, [
      o,
      Ft
    ]);
    const Ge = p.useCallback(() => {
      const i = An.current;
      if (!i) return;
      const { bufW: f, bufH: b, cssW: w } = rc(i);
      w < 8 || i.clientHeight < 8 || (gt.current = Yl(f, w), Wo({
        w: f,
        h: b
      }));
    }, []);
    p.useEffect(() => {
      if (!o) return;
      Ge();
      const i = An.current;
      if (!i) return;
      const f = () => Ge();
      i.addEventListener("load", f);
      const b = typeof ResizeObserver < "u" ? new ResizeObserver(Ge) : null;
      return b == null ? void 0 : b.observe(i), window.addEventListener("resize", Ge), () => {
        i.removeEventListener("load", f), b == null ? void 0 : b.disconnect(), window.removeEventListener("resize", Ge);
      };
    }, [
      o,
      e,
      Ge
    ]), p.useEffect(() => {
      if (!o) {
        De.current = null, Mn(false);
        return;
      }
      let i = false;
      const f = Xe.current;
      if (!f || !Wl()) {
        Mn(false);
        return;
      }
      return ql(f).then((b) => {
        i || (De.current = b, Mn(!!b));
      }), () => {
        i = true, De.current = null;
      };
    }, [
      o,
      e,
      P.w
    ]);
    const Ze = p.useCallback((i, f, b) => {
      const w = ht.current;
      if (!w) {
        c(W(i, Yt, Qt));
        return;
      }
      const S = w.getBoundingClientRect(), C = f - S.left - S.width / 2, j = b - S.top - S.height / 2;
      c((O) => {
        const V = W(i, Yt, Qt), pe = V / O;
        return h((ue) => ({
          x: C - (C - ue.x) * pe,
          y: j - (j - ue.y) * pe
        })), V;
      });
    }, []), Xo = p.useCallback((i) => {
      var _a2;
      if ((_a2 = xt.current) == null ? void 0 : _a2.call(xt), xt.current = null, ht.current = i, !i) return;
      const f = (b) => {
        b.preventDefault(), b.stopPropagation();
        const w = b.deltaY > 0 ? 1 / rt : rt;
        Ze(Rr.current * w, b.clientX, b.clientY);
      };
      i.addEventListener("wheel", f, {
        passive: false,
        capture: true
      }), xt.current = () => {
        i.removeEventListener("wheel", f, true);
      };
    }, [
      Ze
    ]), Yo = p.useCallback((i) => {
      if (i.preventDefault(), i.stopPropagation(), s > 1.05) {
        wt();
        return;
      }
      Ze(xc, i.clientX, i.clientY);
    }, [
      s,
      wt,
      Ze
    ]), yt = p.useCallback((i, f) => {
      const b = Xe.current;
      if (!b) return null;
      const w = b.getBoundingClientRect();
      return w.width < 1 || w.height < 1 ? null : {
        x: (i.clientX - w.left) / w.width * P.w,
        y: (i.clientY - w.top) / w.height * P.h,
        pressure: vc(i, f)
      };
    }, [
      P.w,
      P.h
    ]), _n = p.useCallback((i) => {
      const f = i === "laser" ? 0.75 : 1, b = i === "highlighter" ? 4 : i === "laser" ? 2 : Me;
      if (i === "highlighter") return {
        w: Math.max(b, _ * f),
        h: Math.max(b, M * f)
      };
      const w = Math.max(b, _ * f);
      return {
        w,
        h: w
      };
    }, [
      _,
      M
    ]);
    p.useEffect(() => {
      d !== "eraser" && (d === "pen" || d === "pressure" || d === "highlighter" || d === "laser") && (Nn.current = {
        w: _,
        h: M
      });
    }, [
      d,
      _,
      M
    ]);
    const Hr = p.useCallback(() => {
      const i = Nn.current;
      N(i.w), E(i.h);
    }, []), Br = p.useCallback(() => {
      const i = Nn.current, f = Math.max(i.w, i.h), b = at(W(f * 5, Me, Le));
      N(b), E(b), m("eraser");
    }, []), ae = p.useCallback((i) => {
      if (he.current += 1, Ue(false), fe(null), de.current = null, d === "eraser" && i !== "eraser" && Hr(), i === "eraser") {
        Br();
        return;
      }
      if (i === "highlighter") {
        m("highlighter"), z("solid"), T("square");
        return;
      }
      m(i);
    }, [
      d,
      Hr,
      Br
    ]), Or = p.useCallback((i) => {
      var _a2, _b;
      i.preventDefault(), i.stopPropagation(), (_b = (_a2 = i.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId), He.current = {
        pointerId: i.pointerId,
        startX: i.clientX,
        startY: i.clientY,
        originX: u.x,
        originY: u.y
      };
    }, [
      u.x,
      u.y
    ]), _r = p.useCallback((i) => {
      const f = He.current;
      !f || f.pointerId !== i.pointerId || (i.preventDefault(), h({
        x: f.originX + (i.clientX - f.startX),
        y: f.originY + (i.clientY - f.startY)
      }));
    }, []), zr = p.useCallback((i) => {
      var _a2, _b;
      const f = He.current;
      if (!(!f || f.pointerId !== i.pointerId)) {
        He.current = null;
        try {
          (_b = (_a2 = i.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId);
        } catch {
        }
      }
    }, []), Je = p.useCallback((i) => {
      const f = Qe.current.get(i);
      f && clearTimeout(f);
      const b = setTimeout(() => {
        yn((S) => {
          const C = new Set(S);
          return C.add(i), C;
        });
        const w = setTimeout(() => {
          Qe.current.delete(i), yn((S) => {
            const C = new Set(S);
            return C.delete(i), C;
          }), Ke((S) => S.filter((C) => C.id !== i));
        }, So);
        Qe.current.set(i, w);
      }, bc);
      Qe.current.set(i, b);
    }, []), Be = p.useCallback(() => {
      const i = Pn.current, f = $r.current ?? (i == null ? void 0 : i.getContext("2d"));
      i && f && f.clearRect(0, 0, i.width, i.height), $n.current = 0;
    }, []), zn = p.useCallback(() => {
      Se.current == null && (Se.current = requestAnimationFrame(() => {
        Se.current = null;
        const i = ye.current;
        if (!i) {
          ve(null);
          return;
        }
        ve({
          ...i,
          points: i.points.slice()
        });
      }));
    }, []), et = p.useCallback((i, f) => {
      const b = i.nativeEvent, w = typeof b.getCoalescedEvents == "function" ? b.getCoalescedEvents() : [], S = w.length > 0 ? w : [
        b
      ], C = [];
      for (const j of S) {
        const O = yt(j, f);
        O && C.push(O);
      }
      if (C.length === 0) {
        const j = yt(i, f);
        j && C.push(j);
      }
      return C;
    }, [
      yt
    ]), Fr = p.useCallback((i) => {
      var _a2, _b;
      if (d !== "pen" && d !== "pressure" && d !== "highlighter" && d !== "laser" && d !== "eraser") return;
      i.preventDefault(), i.stopPropagation();
      const b = et(i, d === "pressure"), w = b[b.length - 1];
      if (!w) return;
      (_b = (_a2 = i.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId);
      const S = d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen", C = S === "laser" ? "#ef4444" : S === "highlighter" ? v : S === "eraser" ? "#000000" : y, j = _n(S), O = W(gt.current, 0.25, 12), V = pa(Math.max(0.5, j.w * O), P.w, P.h), pe = pa(Math.max(0.5, j.h * O), P.w, P.h), ue = S === "eraser" ? 1 : S === "laser" ? 0.9 : S === "highlighter" ? H : D, X = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        seq: ++Dr.current,
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
      }, Sn(true), $n.current = 0, ve({
        ...X,
        points: [
          ...X.points
        ]
      }), Be(), S === "laser" && Je(X.id), (S === "pen" || S === "pressure") && De.current && i.nativeEvent.isTrusted) try {
        const ps = Math.max(j.w, j.h);
        De.current.updateInkTrailStartPoint(i.nativeEvent, {
          color: y,
          diameter: Math.max(1, ps * (S === "pressure" ? w.pressure : 1))
        });
      } catch {
      }
    }, [
      d,
      y,
      v,
      H,
      D,
      le,
      oe,
      L,
      et,
      _n,
      Je,
      Be,
      zn
    ]), Kr = p.useCallback((i) => {
      const f = ye.current;
      if (!f) return;
      i.preventDefault();
      const b = f.kind === "pressure", w = et(i, b);
      if (!w.length) return;
      const S = Ce.current ?? f.points[f.points.length - 1];
      if (S && (Ce.current = Jl(f.points, S, w), zn(), f.kind === "laser" && Je(f.id), (f.kind === "pen" || f.kind === "pressure") && De.current && i.nativeEvent.isTrusted)) try {
        const C = Ce.current, O = pn(f) / Math.max(1e-3, gt.current);
        De.current.updateInkTrailStartPoint(i.nativeEvent, {
          color: f.color,
          diameter: Math.max(1, O * (f.kind === "pressure" ? (C == null ? void 0 : C.pressure) ?? 1 : 1))
        });
      } catch {
      }
    }, [
      et,
      zn,
      Je
    ]), Wr = p.useCallback((i) => {
      var _a2, _b;
      const f = ye.current;
      if (!f) return;
      const b = f.kind === "pressure", w = et(i, b), S = w[w.length - 1];
      if (S && Ce.current) {
        const j = wo(Ce.current, S, 1), O = f.points[f.points.length - 1];
        !O || O.x !== j.x || O.y !== j.y ? f.points.push(j) : O.pressure = j.pressure, Ce.current = j;
      }
      ye.current = null, Ce.current = null, Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), Sn(false);
      try {
        (_b = (_a2 = i.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId);
      } catch {
      }
      if (f.points.length === 0) {
        ve(null), Be();
        return;
      }
      const C = {
        ...f,
        points: [
          ...f.points
        ]
      };
      if (f.kind === "laser") {
        Ke((j) => [
          ...j,
          C
        ]), Je(f.id), ve(null), Be();
        return;
      }
      if (we([]), f.kind === "highlighter") J((j) => [
        ...j,
        C
      ]);
      else if (f.kind === "eraser") {
        K((j) => [
          ...j,
          C
        ]), J((j) => [
          ...j,
          C
        ]), ve(null), Be();
        return;
      } else K((j) => [
        ...j,
        C
      ]);
      ve(null), Be();
    }, [
      et,
      Je,
      Be
    ]), Kt = p.useCallback((i) => {
      Y && ee((f) => f.map((b) => b.id === Y ? {
        ...b,
        ...i
      } : b));
    }, [
      Y
    ]), qr = p.useCallback((i) => {
      i.preventDefault(), i.stopPropagation();
      const f = yt(i, false);
      if (!f) return;
      const b = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, w = {
        id: b,
        seq: ++Dr.current,
        x: f.x,
        y: f.y,
        text: "",
        color: y,
        opacity: D,
        fontSizePx: te,
        fontFamily: Pe,
        fontWeight: We,
        fontStyle: kn
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
      Pe,
      We,
      kn
    ]), Qo = p.useCallback((i) => {
      var _a2, _b;
      if (ce) {
        if (i.button !== 0) return;
        i.preventDefault(), i.stopPropagation(), (_b = (_a2 = i.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId), de.current = {
          pointerId: i.pointerId,
          x0: i.clientX,
          y0: i.clientY
        }, fe({
          x: i.clientX,
          y: i.clientY,
          w: 0,
          h: 0
        });
        return;
      }
      if (!g || i.button === 1 || d === "pan") {
        Or(i);
        return;
      }
      if (d === "text") {
        U(null), qr(i);
        return;
      }
      Z(null), U(null), Fr(i);
    }, [
      ce,
      g,
      d,
      Or,
      Fr,
      qr
    ]), Go = p.useCallback((i) => {
      if (!ye.current) {
        const w = {
          x: i.clientX,
          y: i.clientY
        }, S = Ye.current;
        S ? (Ye.current = {
          x: S.x + (w.x - S.x) * 0.72,
          y: S.y + (w.y - S.y) * 0.72
        }, Rn.current == null && (Rn.current = requestAnimationFrame(() => {
          Rn.current = null, Ye.current && ct({
            ...Ye.current
          });
        }))) : (Ye.current = w, ct(w));
      }
      const f = de.current;
      if (f && f.pointerId === i.pointerId) {
        i.preventDefault();
        const w = Math.min(f.x0, i.clientX), S = Math.min(f.y0, i.clientY);
        fe({
          x: w,
          y: S,
          w: Math.abs(i.clientX - f.x0),
          h: Math.abs(i.clientY - f.y0)
        });
        return;
      }
      const b = mt.current;
      if (b && b.pointerId === i.pointerId) {
        i.preventDefault();
        const w = Xe.current;
        if (!w) return;
        const S = w.getBoundingClientRect(), C = (i.clientX - b.startClientX) / Math.max(1, S.width) * P.w, j = (i.clientY - b.startClientY) / Math.max(1, S.height) * P.h;
        ee((O) => O.map((V) => V.id === b.id ? {
          ...V,
          x: b.originX + C,
          y: b.originY + j
        } : V));
        return;
      }
      if (He.current) {
        _r(i);
        return;
      }
      ye.current && Kr(i);
    }, [
      _r,
      Kr,
      P.w,
      P.h
    ]), Ur = p.useCallback((i) => {
      var _a2, _b, _c2, _d2, _e2;
      const f = de.current;
      if (f && f.pointerId === i.pointerId) {
        de.current = null;
        try {
          (_b = (_a2 = i.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId);
        } catch {
        }
        const b = Math.abs(i.clientX - f.x0), w = Math.abs(i.clientY - f.y0);
        if (fe(null), b >= 12 && w >= 12) {
          const S = Math.min(f.x0, i.clientX), C = Math.min(f.y0, i.clientY);
          Ir.current({
            left: S,
            top: C,
            right: S + b,
            bottom: C + w
          });
        }
        return;
      }
      if (((_c2 = mt.current) == null ? void 0 : _c2.pointerId) === i.pointerId) {
        mt.current = null;
        try {
          (_e2 = (_d2 = i.currentTarget).releasePointerCapture) == null ? void 0 : _e2.call(_d2, i.pointerId);
        } catch {
        }
      }
      He.current && zr(i), ye.current && Wr(i);
    }, [
      zr,
      Wr
    ]), Ct = p.useCallback(() => {
      var _a2;
      const i = Q ?? Y;
      try {
        (_a2 = zt.current) == null ? void 0 : _a2.blur();
      } catch {
      }
      if (i) {
        const f = pt.current.find((b) => b.id === i);
        f && !f.text.trim() && (ee((b) => b.filter((w) => w.id !== i)), Z(null));
      }
      U(null);
    }, [
      Q,
      Y
    ]), Fn = p.useCallback(() => {
      const i = Y;
      if (!i) return;
      const f = pt.current.find((b) => b.id === i);
      f && (Dn.current.push({
        ...f
      }), we([]), ee((b) => b.filter((w) => w.id !== i)), Z(null), U(null));
    }, [
      Y
    ]), Kn = p.useCallback(() => {
      const i = Dn.current.pop();
      if (i) {
        ee((X) => [
          ...X,
          i
        ]), Z(i.id), U(null);
        return;
      }
      const f = Ar.current, b = Pr.current, w = pt.current, S = f[f.length - 1], C = b[b.length - 1], j = w[w.length - 1], O = (S == null ? void 0 : S.seq) ?? -1, V = (C == null ? void 0 : C.seq) ?? -1, pe = (j == null ? void 0 : j.seq) ?? -1, ue = Math.max(O, V, pe);
      if (!(ue < 0)) {
        if (pe === ue && j) {
          we((X) => [
            ...X,
            {
              layer: "text",
              text: j
            }
          ]), ee(w.slice(0, -1)), Z((X) => X === j.id ? null : X);
          return;
        }
        if (S && C && S.id === C.id && S.kind === "eraser" && S.seq === ue) {
          we((X) => [
            ...X,
            {
              layer: "both",
              stroke: S
            }
          ]), K(f.slice(0, -1)), J(b.slice(0, -1));
          return;
        }
        if (O >= V && S && O === ue) {
          we((X) => [
            ...X,
            {
              layer: "ink",
              stroke: S
            }
          ]), K(f.slice(0, -1));
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
    }, []), Wn = p.useCallback(() => {
      we((i) => {
        if (!i.length) return i;
        const f = i[i.length - 1];
        return f ? (f.layer === "text" ? ee((b) => [
          ...b,
          f.text
        ]) : f.layer === "both" || f.stroke.kind === "eraser" ? (K((b) => [
          ...b,
          f.stroke
        ]), J((b) => [
          ...b,
          f.stroke
        ])) : f.layer === "ink" ? K((b) => [
          ...b,
          f.stroke
        ]) : J((b) => [
          ...b,
          f.stroke
        ]), i.slice(0, -1)) : i;
      });
    }, []), qn = p.useCallback((i) => {
      N((f) => Sa(f, i)), E((f) => Sa(f, i));
    }, []), Vr = p.useCallback((i) => {
      var _a2;
      const f = Y, b = (f ? (_a2 = pt.current.find((S) => S.id === f)) == null ? void 0 : _a2.fontSizePx : null) ?? te, w = Mc(b, i);
      lt(w), f && ee((S) => S.map((C) => C.id === f ? {
        ...C,
        fontSizePx: w
      } : C));
    }, [
      Y,
      te
    ]), Zo = p.useCallback((i) => {
      const f = at(W(i, Me, Le));
      N(f), E(f);
    }, []), Jo = p.useCallback(() => {
      ae("highlighter");
    }, [
      ae
    ]), Wt = p.useCallback(async (i) => {
      if (!a || !e || ut) return;
      const f = ne.some((b) => b.text.trim().length > 0);
      if (!(R.length === 0 && F.length === 0 && !f)) {
        Tr(true), jn(null);
        try {
          const b = xa(P.w, P.h, R), w = b.getContext("2d");
          w && ka(w, ne, gt.current);
          const S = ba(P.w, P.h, F), C = await Ul({
            src: e,
            inkCanvas: b,
            highlightCanvas: S
          }), j = new File([
            C
          ], `annotated-${Date.now()}.png`, {
            type: "image/png"
          });
          await a(i, j);
        } catch (b) {
          jn(b instanceof Error ? b.message : String(b));
        } finally {
          Tr(false);
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
    ]), qt = p.useCallback(async () => {
      if (!e) throw new Error("\uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const i = ne.some((w) => w.text.trim().length > 0), f = R.length > 0 || i ? xa(P.w, P.h, R) : null;
      if (f) {
        const w = f.getContext("2d");
        w && ka(w, ne, gt.current);
      }
      const b = F.length > 0 ? ba(P.w, P.h, F) : null;
      return mo({
        src: e,
        inkCanvas: f,
        highlightCanvas: b
      });
    }, [
      e,
      R,
      F,
      ne,
      P.w,
      P.h
    ]), Un = p.useCallback(() => {
      var _a2, _b;
      if (!e) return;
      const i = ((_a2 = Xe.current) == null ? void 0 : _a2.getBoundingClientRect()) ?? null, f = ((_b = ht.current) == null ? void 0 : _b.getBoundingClientRect()) ?? null, b = (async () => {
        const w = await qt();
        if (!i || !f) return tn(w);
        const S = ya(i, w.width, w.height, f);
        return !S || sc(S, w.width, w.height) ? tn(w) : tn(Ca(w, S));
      })();
      qe.current && clearTimeout(qe.current), yi(b).then(() => {
        Ht("done"), qe.current = setTimeout(() => Ht("idle"), 1600);
      }).catch(() => {
        Ht("error"), qe.current = setTimeout(() => Ht("idle"), 2e3);
      });
    }, [
      e,
      qt
    ]), St = p.useCallback((i) => {
      if (!e) return;
      const f = ++he.current;
      Ve(true), Re(null), dt(null), Ot(false), (async () => {
        var _a2;
        try {
          const b = await qt();
          if (he.current !== f) return;
          let w = b;
          if (i !== "full") {
            const C = (_a2 = Xe.current) == null ? void 0 : _a2.getBoundingClientRect();
            if (!C) throw new Error("\uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
            const j = ya(C, b.width, b.height, i);
            if (!j) throw new Error("\uC774\uBBF8\uC9C0 \uC548\uC5D0\uC11C \uC601\uC5ED\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
            w = Ca(b, j);
          }
          const S = await hc(w);
          if (he.current !== f) return;
          dt(S), fe(null), de.current = null;
        } catch (b) {
          if (he.current !== f) return;
          Re(b instanceof Error ? b.message : "QR \uCF54\uB4DC\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          he.current === f && Ve(false);
        }
      })();
    }, [
      e,
      qt
    ]);
    p.useEffect(() => {
      Ir.current = St;
    }, [
      St
    ]);
    const Xr = p.useCallback(() => {
      he.current += 1, Ue(false), Ve(false), fe(null), Re(null), de.current = null;
    }, []), es = p.useCallback(() => {
      dt(null), Ot(false), fe(null), Re(null), de.current = null, Ue(true), St("full");
    }, [
      St
    ]), ts = p.useCallback(() => {
      he.current += 1, Ue(false), Ve(false), fe(null), de.current = null, x(true), ae("pen");
    }, [
      ae
    ]), ns = p.useCallback(() => {
      U(null), Z(null), ee((i) => i.filter((f) => f.text.trim().length > 0)), x(false), m("pan"), Ln(false), _t(false), ct(null);
    }, []), rs = p.useCallback(() => {
      const i = $e == null ? void 0 : $e.trim();
      i && navigator.clipboard.writeText(i).then(() => {
        Ot(true), window.setTimeout(() => Ot(false), 1600);
      }, () => {
        Re("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      });
    }, [
      $e
    ]);
    p.useEffect(() => () => {
      qe.current && clearTimeout(qe.current);
    }, []);
    const Vn = R.length + F.length + ne.length, Yr = Vn > 0 || !!re || Cn, Ut = p.useCallback(() => {
      if (Yr) {
        ft(true);
        return;
      }
      ft(false), r();
    }, [
      Yr,
      r
    ]), as = p.useCallback(() => {
      ft(false), r();
    }, [
      r
    ]), os = p.useCallback(() => {
      ft(false);
    }, []);
    p.useEffect(() => {
      if (!o) return;
      const i = (f) => {
        var _a2;
        const b = f.target, w = (_a2 = b == null ? void 0 : b.tagName) == null ? void 0 : _a2.toLowerCase(), S = w === "input" || w === "textarea" || (b == null ? void 0 : b.isContentEditable), C = Mo ? f.metaKey : f.ctrlKey, j = f.key.toLowerCase(), O = f.code;
        if (Ci(f)) {
          if (S) return;
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Un();
          return;
        }
        if (C && j === "s") {
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Wt(f.shiftKey ? "saveAs" : "overwrite");
          return;
        }
        if (C && j === "z" && !f.shiftKey) {
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Kn();
          return;
        }
        if (C && (j === "y" || j === "z" && f.shiftKey)) {
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Wn();
          return;
        }
        const V = !!Y || d === "text", pe = C && (f.shiftKey && (f.key === "<" || f.key === "," || O === "Comma") || !f.shiftKey && (f.key === "[" || O === "BracketLeft")), ue = C && (f.shiftKey && (f.key === ">" || f.key === "." || O === "Period") || !f.shiftKey && (f.key === "]" || O === "BracketRight"));
        if (V && (pe || ue)) {
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Vr(pe ? -1 : 1);
          return;
        }
        if (f.key === "Escape") {
          if (In) return;
          if (ce) {
            f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), he.current += 1, Ue(false), Ve(false), fe(null), Re(null), de.current = null;
            return;
          }
          if (d === "text" || Q) {
            f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Q ? Ct() : Z(null);
            return;
          }
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Ut();
          return;
        }
        if (Y && !C && (j === "backspace" || j === "delete")) {
          if (Q && S && w === "textarea" && b.value.length > 0) return;
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Fn();
          return;
        }
        if (!(S || !g)) {
          if (!C && f.key === "[") {
            f.preventDefault(), f.stopPropagation(), qn(-1);
            return;
          }
          !C && f.key === "]" && (f.preventDefault(), f.stopPropagation(), qn(1));
        }
      };
      return window.addEventListener("keydown", i, true), () => window.removeEventListener("keydown", i, true);
    }, [
      o,
      Un,
      Wt,
      Kn,
      Wn,
      qn,
      Vr,
      Y,
      Q,
      d,
      g,
      ce,
      Ct,
      Fn,
      Ut,
      In
    ]);
    const ss = g && !ce && d !== "pan" && d !== "text" && Dt != null && !He.current && !Cn, Qr = _n(d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen"), Gr = Math.max(4, Qr.w * s), Zr = Math.max(4, Qr.h * s), is = R.filter((i) => i.kind === "eraser"), ls = R.filter((i) => i.kind !== "eraser"), cs = F.filter((i) => i.kind === "eraser"), us = F.filter((i) => i.kind !== "eraser"), ds = Cn && d === "highlighter" ? {
      mixBlendMode: le
    } : {}, Jr = ci(nt(kt) || "#111827ff"), fs = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", Mt = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [vt, hs] = p.useState(null);
    return l.jsxs(l.Fragment, {
      children: [
        l.jsx(ul, {
          open: o,
          onOpenChange: (i) => {
            i || Ut();
          },
          children: l.jsx(Yn, {
            children: o ? l.jsxs(dl, {
              forceMount: true,
              children: [
                l.jsx(fl, {
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
                    transition: mc
                  })
                }),
                l.jsx(hl, {
                  asChild: true,
                  forceMount: true,
                  onOpenAutoFocus: (i) => i.preventDefault(),
                  onEscapeKeyDown: (i) => {
                    i.preventDefault();
                  },
                  children: l.jsxs(tt.div, {
                    ref: hs,
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
                    transition: gc,
                    children: [
                      l.jsx(pl, {
                        className: "sr-only",
                        children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30"
                      }),
                      l.jsx(ml, {
                        className: "sr-only",
                        children: "\uBCF4\uAE30 \uBAA8\uB4DC\uC5D0\uC11C \uD655\uB300, \uC774\uBBF8\uC9C0 \uBCF5\uC0AC, QR \uC778\uC2DD\uC744 \uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC5F0\uD544 \uBC84\uD2BC\uC73C\uB85C \uADF8\uB9AC\uAE30 \uD3B8\uC9D1\uC744 \uC5FD\uB2C8\uB2E4."
                      }),
                      l.jsx("div", {
                        ref: Xo,
                        className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${ce ? "cursor-crosshair" : !g || d === "pan" ? "cursor-grab" : d === "text" ? "cursor-text" : "cursor-none"}`,
                        onPointerDown: Qo,
                        onPointerMove: Go,
                        onPointerUp: Ur,
                        onPointerCancel: Ur,
                        onPointerLeave: () => {
                          ct(null), Ye.current = null;
                        },
                        children: e ? l.jsx("div", {
                          className: "relative will-change-transform",
                          style: {
                            transform: `translate(${u.x}px, ${u.y}px) scale(${s})`,
                            transformOrigin: "center center"
                          },
                          onClick: (i) => i.stopPropagation(),
                          children: l.jsxs("div", {
                            ref: Xe,
                            className: `relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl ${ce && !je ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-black" : ""}`,
                            style: yc,
                            children: [
                              l.jsx("img", {
                                ref: An,
                                src: e,
                                alt: t || "",
                                className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none",
                                draggable: false,
                                onDoubleClick: Yo
                              }),
                              l.jsxs("svg", {
                                className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none",
                                viewBox: `0 0 ${P.w} ${P.h}`,
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
                                            width: P.w,
                                            height: P.h,
                                            fill: "#fff"
                                          }),
                                          is.map((i) => l.jsx(me, {
                                            stroke: i
                                          }, `em-${i.id}`)),
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
                                            width: P.w,
                                            height: P.h,
                                            fill: "#fff"
                                          }),
                                          cs.map((i) => l.jsx(me, {
                                            stroke: i
                                          }, `hem-${i.id}`)),
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
                                      ls.map((i) => l.jsx(me, {
                                        stroke: i
                                      }, i.id)),
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
                                      us.map((i) => l.jsx("g", {
                                        style: {
                                          mixBlendMode: i.blend || le
                                        },
                                        children: l.jsx(me, {
                                          stroke: i
                                        })
                                      }, i.id)),
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
                                      Fe.map((i) => l.jsx(me, {
                                        stroke: i,
                                        fading: Fo.has(i.id)
                                      }, i.id)),
                                      (re == null ? void 0 : re.kind) === "laser" ? l.jsx(me, {
                                        stroke: re
                                      }) : null
                                    ]
                                  })
                                ]
                              }),
                              l.jsx("canvas", {
                                ref: Pn,
                                className: "pointer-events-none absolute inset-0 h-full w-full",
                                width: P.w,
                                height: P.h,
                                style: ds,
                                "aria-hidden": true
                              }),
                              ne.map((i) => {
                                const f = i.id === Y, b = i.id === Q, w = i.x / Math.max(1, P.w) * 100, S = i.y / Math.max(1, P.h) * 100;
                                return l.jsx("div", {
                                  className: `absolute z-1 min-w-8 max-w-[90%] ${f ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`,
                                  style: {
                                    left: `${w}%`,
                                    top: `${S}%`,
                                    color: i.color,
                                    opacity: i.opacity,
                                    fontFamily: i.fontFamily,
                                    fontSize: `${i.fontSizePx}px`,
                                    fontWeight: i.fontWeight,
                                    fontStyle: i.fontStyle,
                                    lineHeight: 1.3,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    cursor: d === "text" || f ? "move" : "default",
                                    pointerEvents: d === "text" || f ? "auto" : "none"
                                  },
                                  onPointerDown: (C) => {
                                    var _a2, _b;
                                    d !== "text" && d !== "pan" || (C.stopPropagation(), C.preventDefault(), ae("text"), Q && Q !== i.id && Ct(), U(null), Z(i.id), se(i.fontFamily), lt(i.fontSizePx), bn(i.fontWeight), wn(i.fontStyle), mt.current = {
                                      id: i.id,
                                      pointerId: C.pointerId,
                                      startClientX: C.clientX,
                                      startClientY: C.clientY,
                                      originX: i.x,
                                      originY: i.y
                                    }, (_b = (_a2 = C.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, C.pointerId));
                                  },
                                  onDoubleClick: (C) => {
                                    C.stopPropagation(), C.preventDefault(), ae("text"), Z(i.id), U(i.id), se(i.fontFamily), lt(i.fontSizePx), bn(i.fontWeight), wn(i.fontStyle), window.setTimeout(() => {
                                      var _a2;
                                      return (_a2 = zt.current) == null ? void 0 : _a2.focus();
                                    }, 20);
                                  },
                                  children: b ? l.jsx("textarea", {
                                    ref: zt,
                                    value: i.text,
                                    rows: Math.max(1, i.text.split(`
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
                                      ee((O) => O.map((V) => V.id === i.id ? {
                                        ...V,
                                        text: j
                                      } : V));
                                    },
                                    onBlur: () => {
                                      Q === i.id && Ct();
                                    },
                                    onKeyDown: (C) => {
                                      if (C.key === "Escape") {
                                        C.preventDefault(), C.stopPropagation(), Ct();
                                        return;
                                      }
                                      (C.key === "Backspace" || C.key === "Delete") && C.currentTarget.value.length === 0 && (C.preventDefault(), C.stopPropagation(), Fn());
                                    }
                                  }) : l.jsx("span", {
                                    className: "block",
                                    children: i.text || "\uD14D\uC2A4\uD2B8"
                                  })
                                }, i.id);
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
                      ss && Dt ? l.jsx("div", {
                        className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow",
                        style: {
                          left: Dt.x - Gr / 2,
                          top: Dt.y - Zr / 2,
                          width: Gr,
                          height: Zr,
                          borderRadius: oe === "circle" ? "9999px" : "2px",
                          borderStyle: L === "dashed" ? "dashed" : "solid",
                          opacity: W(Vo, 0.25, 0.85),
                          backgroundColor: d === "eraser" ? "transparent" : nt(kt) || void 0
                        },
                        "aria-hidden": true
                      }) : null,
                      g && (d === "text" || bt) && l.jsxs("aside", {
                        className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md",
                        onPointerDown: (i) => i.stopPropagation(),
                        children: [
                          l.jsxs("div", {
                            className: "flex items-center gap-2 text-xs font-semibold text-white/90",
                            children: [
                              l.jsx(rr, {
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
                              l.jsx(ui, {
                                value: (bt == null ? void 0 : bt.fontFamily) ?? Pe,
                                onChange: (i) => {
                                  se(i), Kt({
                                    fontFamily: i
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
                                    min: lr,
                                    max: cr,
                                    step: 1,
                                    value: (bt == null ? void 0 : bt.fontSizePx) ?? te,
                                    onChange: (i) => {
                                      const f = W(Math.round(Number(i.target.value) || 24), lr, cr);
                                      lt(f), Kt({
                                        fontSizePx: f
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
                                onValueChange: (i) => {
                                  bn(i), Kt({
                                    fontWeight: i
                                  });
                                },
                                children: [
                                  l.jsx(Tt, {
                                    className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white",
                                    "aria-label": "Font weight",
                                    children: l.jsx(Gn, {})
                                  }),
                                  l.jsx(Lt, {
                                    container: vt,
                                    children: l.jsx(It, {
                                      className: Mt,
                                      position: "popper",
                                      side: "bottom",
                                      sideOffset: 6,
                                      onCloseAutoFocus: (i) => i.preventDefault(),
                                      children: l.jsx(Nt, {
                                        className: "p-1",
                                        children: Ql.map((i) => l.jsx(Ee, {
                                          value: i.value,
                                          className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                          children: l.jsx(Te, {
                                            children: i.label
                                          })
                                        }, i.value))
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
                                value: (bt == null ? void 0 : bt.fontStyle) ?? kn,
                                onValueChange: (i) => {
                                  const f = i === "italic" ? "italic" : "normal";
                                  wn(f), Kt({
                                    fontStyle: f
                                  });
                                },
                                children: [
                                  l.jsx(Tt, {
                                    className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white",
                                    "aria-label": "Font style",
                                    children: l.jsx(Gn, {})
                                  }),
                                  l.jsx(Lt, {
                                    container: vt,
                                    children: l.jsx(It, {
                                      className: Mt,
                                      position: "popper",
                                      side: "bottom",
                                      sideOffset: 6,
                                      onCloseAutoFocus: (i) => i.preventDefault(),
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
                          onPointerDown: (i) => i.stopPropagation(),
                          children: [
                            l.jsxs("div", {
                              className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md",
                              children: [
                                g ? l.jsxs(l.Fragment, {
                                  children: [
                                    l.jsx(q, {
                                      label: "\uD328\uB2DD",
                                      active: d === "pan",
                                      onClick: () => ae("pan"),
                                      children: l.jsx(Mi, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uC77C\uBC18 \uD39C",
                                      active: d === "pen",
                                      onClick: () => ae("pen"),
                                      children: l.jsx(ia, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uD544\uC555 \uD39C",
                                      active: d === "pressure",
                                      onClick: () => ae("pressure"),
                                      children: l.jsx(vi, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uD615\uAD11\uD39C",
                                      active: d === "highlighter",
                                      onClick: Jo,
                                      children: l.jsx(ji, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)",
                                      active: d === "laser",
                                      onClick: () => ae("laser"),
                                      children: l.jsx(Ei, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uC9C0\uC6B0\uAC1C",
                                      active: d === "eraser",
                                      onClick: () => ae("eraser"),
                                      children: l.jsx(Ti, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uD14D\uC2A4\uD2B8",
                                      active: d === "text",
                                      onClick: () => ae("text"),
                                      children: l.jsx(rr, {
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
                                          "aria-expanded": Tn,
                                          onClick: () => {
                                            Ln((i) => (i && _t(false), !i));
                                          },
                                          className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow",
                                          style: {
                                            backgroundColor: nt(kt) || "#111827"
                                          }
                                        }),
                                        l.jsx(Yn, {
                                          mode: "popLayout",
                                          children: Tn ? l.jsxs(tt.div, {
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
                                              (d === "highlighter" ? wc : kc).map((i, f, b) => {
                                                const w = (nt(kt) || "").slice(0, 7).toLowerCase() === i.toLowerCase(), S = 0.03 * (b.length - f);
                                                return l.jsx(tt.button, {
                                                  type: "button",
                                                  "aria-label": `\uC0C9\uC0C1 ${i}`,
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
                                                    _t(false), d === "highlighter" ? A(`${i}ff`) : (k(`${i}ff`), (d === "pan" || d === "eraser" || d === "laser") && ae("pen")), Ln(false);
                                                  },
                                                  className: `h-7 w-7 rounded-full border-2 shadow ${w ? "border-sky-300 scale-110" : "border-white/40"}`,
                                                  style: {
                                                    backgroundColor: i
                                                  }
                                                }, i);
                                              }),
                                              l.jsx(tt.button, {
                                                type: "button",
                                                "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1",
                                                "aria-pressed": En,
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
                                                onClick: () => _t((i) => !i),
                                                className: `h-7 w-7 rounded-full border-2 shadow ${En ? "border-sky-300 scale-110" : "border-white/50"}`,
                                                style: jc
                                              })
                                            ]
                                          }, "haim-color-palette") : null
                                        }),
                                        l.jsx(Yn, {
                                          children: Tn && En ? l.jsxs(tt.div, {
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
                                              ease: Sr
                                            },
                                            className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md",
                                            children: [
                                              l.jsx("div", {
                                                className: "mb-2 h-8 w-full rounded border border-white/20",
                                                style: {
                                                  ...di,
                                                  backgroundColor: kt
                                                }
                                              }),
                                              l.jsx("div", {
                                                className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full",
                                                children: l.jsx(ii, {
                                                  color: Jr,
                                                  onChange: (i) => {
                                                    const f = nt(i.startsWith("#") ? i : `#${i}`);
                                                    f && (d === "highlighter" ? A(f) : (k(f), (d === "pan" || d === "eraser" || d === "laser") && ae("pen")));
                                                  }
                                                })
                                              }),
                                              l.jsx(li, {
                                                alpha: true,
                                                prefixed: true,
                                                color: Jr,
                                                onChange: (i) => {
                                                  const f = nt(i.startsWith("#") ? i : `#${i}`);
                                                  f && (d === "highlighter" ? A(f) : k(f));
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
                                    d === "highlighter" ? l.jsxs("div", {
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
                                              onChange: (i) => N(at(W(Number(i.target.value) || 1, Me, Le))),
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
                                              value: M,
                                              onChange: (i) => E(at(W(Number(i.target.value) || 1, Me, Le))),
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
                                          onChange: (i) => Zo(Number(i.target.value) || 1),
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
                                          value: Math.round((d === "highlighter" ? H : D) * 100),
                                          onChange: (i) => {
                                            const b = W(Number(i.target.value) || 5, 5, 100) / 100;
                                            d === "highlighter" ? G(b) : I(b);
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
                                      onValueChange: (i) => T(i),
                                      children: [
                                        l.jsx(Tt, {
                                          className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20",
                                          "aria-label": oe === "circle" ? "\uC6D0" : "\uB124\uBAA8",
                                          children: oe === "circle" ? l.jsx(la, {
                                            size: 16
                                          }) : l.jsx(ca, {
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
                                            onCloseAutoFocus: (i) => i.preventDefault(),
                                            children: l.jsxs(Nt, {
                                              className: "p-1",
                                              children: [
                                                l.jsxs(Ee, {
                                                  value: "circle",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "\uC6D0",
                                                  children: [
                                                    l.jsx(la, {
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
                                                    l.jsx(ca, {
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
                                      onValueChange: (i) => z(i),
                                      children: [
                                        l.jsx(Tt, {
                                          className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20",
                                          "aria-label": L === "dashed" ? "Dashed" : "Solid",
                                          children: L === "dashed" ? l.jsx(ja, {
                                            size: 16
                                          }) : l.jsx(va, {
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
                                            onCloseAutoFocus: (i) => i.preventDefault(),
                                            children: l.jsxs(Nt, {
                                              className: "p-1",
                                              children: [
                                                l.jsxs(Ee, {
                                                  value: "solid",
                                                  className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15",
                                                  "aria-label": "Solid",
                                                  children: [
                                                    l.jsx(va, {
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
                                                    l.jsx(ja, {
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
                                    d === "highlighter" ? l.jsxs(Et, {
                                      value: le,
                                      onValueChange: (i) => it(i),
                                      children: [
                                        l.jsx(Tt, {
                                          className: fs,
                                          "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC",
                                          children: l.jsx(Gn, {
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
                                            onCloseAutoFocus: (i) => i.preventDefault(),
                                            children: l.jsx(Nt, {
                                              className: "p-1",
                                              children: Gl.map((i) => l.jsx(Ee, {
                                                value: i.value,
                                                className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15",
                                                children: l.jsx(Te, {
                                                  children: i.label
                                                })
                                              }, i.value))
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
                                      disabled: Vn === 0,
                                      onClick: Kn,
                                      children: l.jsx(oo, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: `\uB2E4\uC2DC \uC2E4\uD589 (${Ma})`,
                                      disabled: Ko.length === 0,
                                      onClick: Wn,
                                      children: l.jsx(so, {
                                        size: 16
                                      })
                                    }),
                                    l.jsx(q, {
                                      label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30",
                                      disabled: Vn === 0 && Fe.length === 0,
                                      onClick: Bn,
                                      children: l.jsx(Li, {
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
                                    const i = (_a2 = ht.current) == null ? void 0 : _a2.getBoundingClientRect();
                                    if (!i) {
                                      c((f) => W(f / rt, Yt, Qt));
                                      return;
                                    }
                                    Ze(s / rt, i.left + i.width / 2, i.top + i.height / 2);
                                  },
                                  children: l.jsx(Ii, {
                                    size: 16
                                  })
                                }),
                                l.jsxs("span", {
                                  className: "min-w-10 text-center text-[11px] tabular-nums text-white/80",
                                  children: [
                                    Math.round(s * 100),
                                    "%"
                                  ]
                                }),
                                l.jsx(q, {
                                  label: "\uD655\uB300",
                                  onClick: () => {
                                    var _a2;
                                    const i = (_a2 = ht.current) == null ? void 0 : _a2.getBoundingClientRect();
                                    if (!i) {
                                      c((f) => W(f * rt, Yt, Qt));
                                      return;
                                    }
                                    Ze(s * rt, i.left + i.width / 2, i.top + i.height / 2);
                                  },
                                  children: l.jsx(Ni, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: "\uBCF4\uAE30 \uCD08\uAE30\uD654",
                                  onClick: wt,
                                  children: l.jsx(Ai, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: Lr === "done" ? "\uBCF5\uC0AC\uB428" : Lr === "error" ? "\uBCF5\uC0AC \uC2E4\uD328" : `\uC774\uBBF8\uC9C0 \uBCF5\uC0AC (${ie}+C)`,
                                  onClick: Un,
                                  children: l.jsx(ar, {
                                    size: 16
                                  })
                                }),
                                l.jsx(q, {
                                  label: Bt ? "QR \uC778\uC2DD \uC911" : ce ? "QR \uC778\uC2DD \uC885\uB8CC" : "QR \uCF54\uB4DC \uC778\uC2DD",
                                  active: ce,
                                  disabled: Bt,
                                  onClick: () => {
                                    if (ce) {
                                      Xr();
                                      return;
                                    }
                                    es();
                                  },
                                  children: l.jsx(io, {
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
                                      children: l.jsx(Pi, {
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
                                      children: l.jsx($i, {
                                        size: 16
                                      })
                                    })
                                  ]
                                }) : null,
                                g ? l.jsx(q, {
                                  label: "\uBCF4\uAE30 \uBAA8\uB4DC",
                                  onClick: ns,
                                  children: l.jsx(Cr, {
                                    size: 16
                                  })
                                }) : l.jsx(q, {
                                  label: "\uD3B8\uC9D1",
                                  onClick: ts,
                                  children: l.jsx(ia, {
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
                                        l.jsx(Ri, {
                                          size: 14,
                                          "aria-hidden": true
                                        }),
                                        "\uC804\uCCB4 \uC778\uC2DD"
                                      ]
                                    }),
                                    l.jsxs("button", {
                                      type: "button",
                                      onClick: Xr,
                                      className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                      children: [
                                        l.jsx(Qn, {
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
                                          onClick: rs,
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            l.jsx(ar, {
                                              size: 14,
                                              "aria-hidden": true
                                            }),
                                            Uo ? "\uBCF5\uC0AC\uB428" : "\uD14D\uC2A4\uD2B8 \uBCF5\uC0AC"
                                          ]
                                        }),
                                        /^https?:\/\//i.test($e.trim()) ? l.jsxs("button", {
                                          type: "button",
                                          onClick: () => {
                                            const i = $e.trim();
                                            window.open(i, "_blank", "noopener,noreferrer");
                                          },
                                          className: "inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20",
                                          children: [
                                            l.jsx(Di, {
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
                                            l.jsx(Qn, {
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
                                g ? `\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ${ie}+[ ] / ${ie}+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ${ie}+C \uC774\uBBF8\uC9C0 \uBCF5\uC0AC \xB7 ${ie}+Z / ${Ma}` : `\uD720 \uC90C \xB7 \uB4DC\uB798\uADF8\uB85C \uC774\uB3D9 \xB7 ${ie}+C \uBCF4\uC774\uB294 \uC774\uBBF8\uC9C0 \uBCF5\uC0AC`,
                                qo && g ? " \xB7 Ink API" : "",
                                ut ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""
                              ]
                            }),
                            Nr ? l.jsx("p", {
                              className: "max-w-xl text-center text-[10px] text-red-300",
                              children: Nr
                            }) : null
                          ]
                        })
                      }),
                      l.jsx("button", {
                        type: "button",
                        className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80",
                        "aria-label": "\uB2EB\uAE30",
                        onClick: Ut,
                        children: l.jsx(Qn, {
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
        l.jsx(fi, {
          isOpen: In,
          title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30",
          message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.",
          confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30",
          cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1",
          variant: "danger",
          overlayClassName: "z-100070",
          onConfirm: as,
          onCancel: os
        })
      ]
    });
  };
  const Ec = /^[a-z][a-z0-9+.-]*:/i;
  function Ea(e) {
    const t = String(e || "").trim();
    return t ? hi(t) ? true : !Ec.test(t) : false;
  }
  function Tc({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
    const o = String(e.attrs.src || ""), s = String(e.attrs.alt || ""), c = String(e.attrs.title || ""), u = n.isEditable, [h, d] = p.useState(false), [m, g] = p.useState(null), [x, y] = p.useState(false);
    p.useEffect(() => {
      y(false);
    }, [
      o
    ]);
    const k = !Ea(o) || x && !oa(o), v = p.useCallback((N) => {
      if (N.detail > 1) return;
      N.preventDefault(), N.stopPropagation();
      const M = typeof r == "function" ? r() : null;
      typeof M == "number" && n.chain().focus().setNodeSelection(M).run();
    }, [
      n,
      r
    ]), A = p.useCallback((N) => {
      N.preventDefault(), N.stopPropagation(), !(!Ea(o) || x) && (g(o), d(true));
    }, [
      x,
      o
    ]), _ = p.useCallback(async (N, M) => {
      if (!u) return;
      const E = await Co(M), D = typeof r == "function" ? r() : null, I = URL.createObjectURL(M);
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
      u,
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
      onDoubleClick: A,
      children: [
        k ? l.jsxs("div", {
          className: "haim-stock-image-fallback",
          role: "img",
          "aria-label": s || "\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",
          children: [
            l.jsx("span", {
              className: "haim-stock-image-fallback-title",
              children: "\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"
            }),
            s ? l.jsx("span", {
              className: "haim-stock-image-fallback-alt",
              children: s
            }) : null,
            o ? l.jsx("span", {
              className: "haim-stock-image-fallback-src",
              children: o
            }) : null
          ]
        }) : l.jsx("img", {
          src: o,
          alt: s,
          ...c ? {
            title: c
          } : {},
          className: "haim-stock-image max-w-full h-auto cursor-pointer",
          draggable: false,
          onError: () => {
            oa(o) || y(true);
          }
        }),
        l.jsx(vo, {
          src: k ? null : m || o || null,
          alt: s,
          open: h,
          onClose: () => {
            d(false), g(null);
          },
          ...u ? {
            onSaveAnnotated: _
          } : {}
        })
      ]
    });
  }
  let ur = null;
  Df = function(e) {
    ur = e;
  };
  function dr(e) {
    const t = String(e || "").trim().replace(/^\/+/, "");
    return !t || typeof ur != "function" ? false : (ur(t), true);
  }
  function Lc(e, t) {
    if (typeof document > "u") return;
    const n = document.createElement("a");
    n.href = e, n.target = t, n.rel = "noopener noreferrer", n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
  }
  Ta = function(e, t) {
    const n = String(e || "").trim();
    if (!n) return;
    const r = Ja(n);
    if (r) {
      dr(r);
      return;
    }
    if (eo(n)) return;
    const a = String((t == null ? void 0 : t.target) || "_blank").trim(), o = !a || a === "_self" ? "_blank" : a;
    if (ho() && to(n, {
      target: o
    })) {
      pi(n);
      return;
    }
    Lc(n, o);
  };
  const La = "haim-mod-held";
  function Ic(e, t) {
    let n = null;
    if (t.target instanceof HTMLAnchorElement) n = t.target;
    else {
      const r = t.target;
      if (!r) return null;
      n = r.closest("a");
    }
    return !n || !e.view.dom.contains(n) ? null : n;
  }
  function Nc(e, t, n) {
    const r = gs(e.state, t.name), a = String(r.href || "").trim();
    return a || String(n.getAttribute("href") || n.href || "").trim();
  }
  function Ac() {
    return new Ie({
      key: new Ne("haimLinkModCursor"),
      view(e) {
        const t = (c) => {
          e.dom.classList.toggle(La, c);
        }, n = (c) => {
          t(!!(c.ctrlKey || c.metaKey));
        }, r = (c) => {
          (c.key === "Control" || c.key === "Meta" || c.ctrlKey || c.metaKey) && t(true);
        }, a = (c) => {
          n(c);
        }, o = () => t(false), s = (c) => {
          n(c);
        };
        return window.addEventListener("keydown", r, true), window.addEventListener("keyup", a, true), window.addEventListener("blur", o), e.dom.addEventListener("mousemove", s), {
          destroy() {
            window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", a, true), window.removeEventListener("blur", o), e.dom.removeEventListener("mousemove", s), e.dom.classList.remove(La);
          }
        };
      }
    });
  }
  function Pc(e, t, n, r) {
    if (r.button !== 0) return false;
    const a = Ic(e, r);
    if (!a) return false;
    const o = Nc(n, t, a);
    if (!o) return false;
    const s = Ja(o), c = mi(), u = r.metaKey || r.ctrlKey;
    if (n.editable) {
      if (r.preventDefault(), !(u || c)) return true;
      if (s) return r.stopPropagation(), dr(s), true;
      const d = (a.getAttribute("target") || a.target || "_blank").trim();
      return Ta(o, {
        target: d
      }), true;
    }
    if (s) return r.preventDefault(), r.stopPropagation(), dr(s), true;
    if (ho()) {
      const h = (a.getAttribute("target") || a.target || "_blank").trim();
      if (to(o, {
        target: h
      })) return r.preventDefault(), r.stopPropagation(), Ta(o, {
        target: h
      }), true;
    }
    return false;
  }
  function $c(e, t) {
    return new Ie({
      key: new Ne("haimLinkClick"),
      props: {
        handleDOMEvents: {
          click: (n, r) => Pc(e, t, n, r)
        }
      }
    });
  }
  const Rc = ms.extend({
    renderHTML({ HTMLAttributes: e }) {
      const t = String(e.href || ""), n = eo(t);
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
        Ac(),
        $c(this.editor, this.type)
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
  }), fr = "\u2060~\u2060";
  function Dc(e) {
    if (!e || !e.includes("\\~")) return e;
    let t = "", n = 0;
    for (; n < e.length; ) {
      const r = Hc(e, n);
      if (r) {
        const a = Bc(e, r.contentFrom, r.marker);
        t += e.slice(n, a), n = a;
        continue;
      }
      if (e[n] === "`") {
        let a = 1;
        for (; e[n + a] === "`"; ) a += 1;
        if (a < 3) {
          const o = e.indexOf("`".repeat(a), n + a), s = o === -1 ? e.length : o + a;
          t += e.slice(n, s), n = s;
          continue;
        }
      }
      if (e[n] === "\\" && e[n + 1] === "~" && e[n - 1] !== "\\") {
        t += fr, n += 2;
        continue;
      }
      t += e[n], n += 1;
    }
    return t;
  }
  Hf = function(e) {
    return !e || !e.includes(fr) ? e : e.split(fr).join("\\~");
  };
  function Hc(e, t) {
    if (t > 0 && e[t - 1] !== `
`) return null;
    let n = t, r = 0;
    for (; e[n] === " " && r < 3; ) n += 1, r += 1;
    const a = /^(```+|~~~+)/.exec(e.slice(n));
    if (!(a == null ? void 0 : a[1])) return null;
    const o = e.indexOf(`
`, n), s = o === -1 ? e.length : o + 1;
    return {
      marker: a[1],
      contentFrom: s
    };
  }
  function Bc(e, t, n) {
    const r = `
${n}`, a = e.indexOf(r, t);
    if (a === -1) return e.length;
    const o = a + r.length, s = e.indexOf(`
`, o);
    return s === -1 ? e.length : s + 1;
  }
  function Ia(e) {
    var _a2;
    if (!e || typeof e != "object") return;
    const t = e;
    if (t.__haimRawTextPatched) return;
    t.encodeTextForMarkdown = (r) => r, t.escapeMarkdownSyntax = (r) => r;
    const n = (_a2 = t.parse) == null ? void 0 : _a2.bind(t);
    typeof n == "function" && (t.parse = (r) => n(Dc(r))), t.__haimRawTextPatched = true;
  }
  const Oc = xs.extend({
    onBeforeCreate(e) {
      var _a2, _b, _c2;
      (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
      const t = (_b = this.storage) == null ? void 0 : _b.manager;
      t && Ia(t), ((_c2 = this.editor) == null ? void 0 : _c2.markdown) && Ia(this.editor.markdown);
    }
  }), _c = /^[ \t]*[a-zA-Z]+[.)][ \t]+/;
  function hr(e) {
    return _c.test(e);
  }
  function zc(e) {
    const t = e.split(`
`);
    if (hr(t[0] ?? "")) return null;
    const n = t.findIndex((r, a) => a > 0 && hr(r));
    return n === -1 ? e : t.slice(0, n).join(`
`);
  }
  const Gt = Ga.config.markdownTokenizer;
  function Fc() {
    if (!Gt) return;
    const e = Gt.tokenize.bind(Gt);
    return {
      ...Gt,
      tokenize(t, n, r) {
        const a = zc(t);
        if (a != null) return e(a, n, r);
      }
    };
  }
  const Na = Fc(), Kc = Ga.extend({
    ...Na ? {
      markdownTokenizer: Na
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
              if (hr(a)) return false;
              const o = bs(r);
              if (!o) return false;
              const s = (_d2 = o.attrs) == null ? void 0 : _d2.type;
              if (typeof s == "string" && s !== "1") return false;
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
  }), Wc = /^\s*(\[([ xX~]?)\])\s$/, qc = /^\s*[-*+]\s*\[([ xX~])\]\s$/;
  function Aa(e) {
    return po(e === void 0 || e === "" ? " " : e);
  }
  function pr(e) {
    const t = At(e), n = en(e);
    return {
      status: t,
      checked: t === "done",
      kind: t === "doing" ? "status" : n
    };
  }
  function Pa(e, t, n) {
    var _a2, _b;
    const r = e.schema.nodes.taskItem, a = e.schema.nodes.taskList;
    if (!r || !a) return null;
    const o = e.doc.resolve(t.from);
    let s = -1, c = -1;
    for (let g = o.depth; g >= 1; g -= 1) {
      const x = o.node(g).type.name;
      s < 0 && x === "listItem" && (s = g), c < 0 && (x === "bulletList" || x === "orderedList") && (c = g);
    }
    const u = e.tr.delete(t.from, t.to);
    if (s > 0 && c > 0) {
      const g = o.before(c), x = o.index(c), y = u.mapping.map(g), k = u.doc.nodeAt(y);
      if (!k) return null;
      const v = [];
      k.forEach((N, M, E) => {
        const D = E === x ? n : N.type.name === "taskItem" ? pr(N.attrs) : {
          status: "todo",
          checked: false,
          kind: "check"
        };
        v.push(r.create(D, N.content, N.marks));
      });
      const A = a.create(k.attrs, v);
      u.replaceWith(y, y + k.nodeSize, A), Xn(u.doc, y) && ((_a2 = u.doc.resolve(y).nodeBefore) == null ? void 0 : _a2.type) === a && u.join(y);
      const _ = u.doc.nodeAt(y);
      if (_) {
        const N = y + _.nodeSize;
        Xn(u.doc, N) && ((_b = u.doc.nodeAt(N)) == null ? void 0 : _b.type) === a && u.join(N);
      }
      return;
    }
    const h = u.doc.resolve(t.from).blockRange(), d = h && ys(h, r, n);
    if (!d) return null;
    u.wrap(h, d);
    const m = u.doc.resolve(t.from - 1).nodeBefore;
    m && m.type === r && Xn(u.doc, t.from - 1) && u.join(t.from - 1);
  }
  function Zn(e, t, n, r) {
    t.dataset.status = n, t.dataset.kind = r, t.dataset.checked = n === "done" ? "true" : "false", e.dataset.status = n, e.dataset.kind = r, e.className = r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", e.checked = n === "done", e.indeterminate = n === "doing", e.setAttribute("aria-checked", n === "doing" ? "mixed" : n === "done" ? "true" : "false"), e.setAttribute("aria-label", r === "status" ? n === "doing" ? "Status task in progress" : n === "done" ? "Status task completed" : "Status task not started" : n === "done" ? "Task completed" : "Task not started");
  }
  const Uc = ks.extend({
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
            return fa(t, n === "todo" || n === "doing" || n === "done" ? n : void 0);
          },
          renderHTML: (e) => ({
            "data-kind": en(e)
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
      const n = At(e.attrs), r = en(e.attrs);
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
      const r = e.status === "todo" || e.status === "doing" || e.status === "done" ? e.status : e.checked ? "done" : "todo", a = e.kind === "status" || e.kind === "check" ? fa(e.kind, r) : r === "doing" ? "status" : "check";
      return t.createNode("taskItem", {
        status: r,
        checked: r === "done",
        kind: a
      }, n);
    },
    renderMarkdown: (e, t) => {
      const n = At(e == null ? void 0 : e.attrs), r = en(e == null ? void 0 : e.attrs), o = `- [${yl(n, r)}] `;
      return ws(e, t, o);
    },
    addNodeView() {
      return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
        const a = document.createElement("li"), o = document.createElement("label"), s = document.createElement("input"), c = document.createElement("div");
        let u = e;
        o.contentEditable = "false", s.type = "checkbox";
        const h = (g) => {
          const x = pr(g.attrs);
          Zn(s, a, x.status, x.kind);
        };
        h(e);
        const d = (g) => {
          if (typeof n != "function") return;
          const x = n();
          if (typeof x != "number") return;
          const { state: y, dispatch: k } = r.view, v = y.doc.nodeAt(x);
          !v || v.type !== this.type || k(y.tr.setNodeMarkup(x, void 0, {
            ...v.attrs,
            status: g.status,
            checked: g.checked,
            kind: g.kind
          }));
        }, m = (g) => {
          var _a2;
          g.preventDefault(), g.stopPropagation();
          const x = pr(u.attrs), y = ((_a2 = r.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check";
          if (!r.isEditable && !this.options.onReadOnlyChecked) {
            h(u);
            return;
          }
          const k = wl(x.status, y), v = {
            status: k,
            checked: k === "done",
            kind: y
          };
          if (r.isEditable) {
            Zn(s, a, v.status, v.kind), d(v);
            return;
          }
          this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(u, v.checked) ? Zn(s, a, v.status, v.kind) : h(u));
        };
        return o.addEventListener("pointerdown", (g) => {
          g.button === 0 && m(g);
        }), s.addEventListener("click", (g) => {
          g.preventDefault(), g.stopPropagation();
        }), s.addEventListener("change", (g) => {
          g.preventDefault(), h(u);
        }), Object.entries(this.options.HTMLAttributes).forEach(([g, x]) => {
          a.setAttribute(g, String(x));
        }), a.append(o, c), o.append(s), Object.entries(t).forEach(([g, x]) => {
          a.setAttribute(g, String(x));
        }), {
          dom: a,
          contentDOM: c,
          stopEvent: (g) => {
            const x = g.target;
            return !!(x && o.contains(x));
          },
          ignoreMutation: (g) => g.type === "selection" || o.contains(g.target),
          update: (g) => g.type !== this.type ? false : (u = g, h(g), true)
        };
      };
    },
    addInputRules() {
      return [
        new nr({
          find: Wc,
          handler: ({ state: e, range: t, match: n }) => {
            var _a2;
            const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = Aa(n[2]);
            return Pa(e, t, {
              status: a.status,
              checked: a.checked,
              kind: r
            });
          }
        }),
        new nr({
          find: qc,
          handler: ({ state: e, range: t, match: n }) => {
            var _a2;
            const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = Aa(n[1]);
            return Pa(e, t, {
              status: a.status,
              checked: a.checked,
              kind: r
            });
          }
        })
      ];
    }
  }), Vc = /^\s*[-+*]\s+\[([ xX~])\]\s+/, $a = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;
  function Ra(e) {
    var _a2;
    const t = po(e[3]);
    return {
      indentLevel: ((_a2 = e[1]) == null ? void 0 : _a2.length) ?? 0,
      mainContent: e[4] ?? "",
      checked: t.checked,
      status: t.status,
      kind: t.kind
    };
  }
  function Da(e, t, n = []) {
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
  const Xc = Cs.extend({
    markdownTokenizer: {
      name: "taskList",
      level: "block",
      start(e) {
        var _a2;
        const t = (_a2 = e.match(Vc)) == null ? void 0 : _a2.index;
        return t !== void 0 ? t : -1;
      },
      tokenize(e, t, n) {
        const r = (o) => {
          const s = ea(o, {
            itemPattern: $a,
            extractItemData: Ra,
            createToken: (c, u) => Da(c, n, u ?? []),
            customNestedParser: r
          }, n);
          if (s) {
            const c = {
              type: "taskList",
              raw: s.raw,
              items: s.items
            }, u = o.slice(s.raw.length);
            return u.trim() ? [
              c,
              ...n.blockTokens(u)
            ] : [
              c
            ];
          }
          return n.blockTokens(o);
        }, a = ea(e, {
          itemPattern: $a,
          extractItemData: Ra,
          createToken: (o, s) => Da(o, n, s ?? []),
          customNestedParser: r
        }, n);
        if (a) return {
          type: "taskList",
          raw: a.raw,
          items: a.items
        };
      }
    }
  }), Yc = /^:([a-zA-Z0-9_+-]+):/, Qc = Ss.extend({
    markdownTokenizer: {
      name: "emoji",
      level: "inline",
      start: (e) => e.indexOf(":"),
      tokenize: (e) => {
        const t = Yc.exec(e);
        if (!t) return;
        const n = t[1] ?? "", r = ha(n);
        if (r) return {
          type: "emoji",
          raw: t[0],
          emojiName: r
        };
      }
    },
    parseMarkdown: (e, t) => {
      const n = ha((e == null ? void 0 : e.emojiName) || (e == null ? void 0 : e.name));
      if (!n) {
        const r = String((e == null ? void 0 : e.raw) || "");
        return r ? t.createTextNode(r) : null;
      }
      return t.createNode("emoji", {
        name: n
      });
    }
  }).configure({
    emojis: Ms,
    enableEmoticons: true
  });
  function Gc(e) {
    const { state: t, view: n } = e, { selection: r, doc: a } = t, o = r.$anchor;
    let s = o.depth;
    for (; s > 0 && !o.node(s).isTextblock; ) s -= 1;
    if (s === 0) return e.commands.selectAll();
    const c = o.start(s), u = o.end(s);
    if (!r.empty && r.from <= c && r.to >= u) return e.commands.selectAll();
    const d = B.create(a, c, u);
    return n.dispatch(t.tr.setSelection(d).scrollIntoView()), true;
  }
  const Zc = vs.extend({
    name: "nodeRange",
    addKeyboardShortcuts() {
      var _a2;
      const n = {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}
      };
      return delete n["Shift-ArrowUp"], delete n["Shift-ArrowDown"], n["Mod-a"] = ({ editor: r }) => Gc(r), n;
    }
  }), Jc = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, eu = Ae.create({
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
        const t = Jc.exec(e);
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
          if (!n || !js(t, n)) return false;
          const { selection: r } = t, { $to: a } = r, o = e();
          return Es(r) ? o.insertContentAt(a.pos, {
            type: this.name
          }) : o.insertContent({
            type: this.name
          }), o.command(({ state: s, tr: c, dispatch: u }) => {
            var _a2;
            if (u) {
              const { $to: h } = c.selection, d = h.end();
              if (h.nodeAfter) h.nodeAfter.isTextblock ? c.setSelection(B.create(c.doc, h.pos + 1)) : h.nodeAfter.isBlock ? c.setSelection(Za.create(c.doc, h.pos)) : c.setSelection(B.create(c.doc, h.pos));
              else {
                const g = (_a2 = s.schema.nodes.paragraph || h.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
                g && (c.insert(d, g), c.setSelection(B.create(c.doc, d + 1)));
              }
              c.scrollIntoView();
            }
            return true;
          }).run();
        }
      };
    }
  }), Mr = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", tu = [
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
      const o = r.slice(0, a).trim(), s = r.slice(a + 1).trim(), c = o.replace(/-([a-z])/g, (u, h) => h.toUpperCase());
      t[c] = s;
    }
    return t;
  }
  function Ba(e, t, n, r) {
    const a = yr({
      path: e,
      width: t,
      height: n,
      background: r
    }), o = a.indexOf("|");
    if (o < 0) return "";
    const s = a.lastIndexOf("]]");
    return a.slice(o + 1, s >= 0 ? s : void 0).trim();
  }
  function Zt(e) {
    return `${Math.max(24, Math.round(e))}px`;
  }
  function nu(e) {
    return e ? e.closest(".overflow-auto") || e.parentElement : null;
  }
  function ru({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
    var _a2, _b;
    const o = String(e.attrs.path || ""), s = String(e.attrs.options || ""), c = String(e.attrs.alt || o), u = e.attrs.width || null, h = e.attrs.height || null, d = e.attrs.background || null, m = n.isEditable, g = p.useRef(null), x = p.useRef(null), [y, k] = p.useState(false), [v, A] = p.useState(false), [_, N] = p.useState(null), [M, E] = p.useState(null);
    x.current = M;
    const D = p.useMemo(() => M ? {
      ...Ha(on({
        width: null,
        height: null,
        background: d
      })),
      width: `${M.width}px`,
      height: `${M.height}px`
    } : Ha(on({
      width: u,
      height: h,
      background: d
    })), [
      u,
      h,
      d,
      M
    ]), I = p.useCallback((T, L) => {
      const z = {
        width: T,
        height: L,
        options: Ba(o, T, L, d)
      }, R = nu(n.view.dom), K = (R == null ? void 0 : R.scrollTop) ?? null, F = typeof r == "function" ? r() : null;
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
      d,
      e.attrs
    ]), H = p.useCallback(() => {
      const T = x.current;
      T && (I(Zt(T.width), Zt(T.height)), E(null), x.current = null);
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
    ]), G = p.useCallback((T, L) => {
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
        const U = Q.clientX - J, Pe = Q.clientY - Fe;
        let se = K, te = F;
        T.includes("e") && (se = K + U), T.includes("w") && (se = K - U), T.includes("s") && (te = F + Pe), T.includes("n") && (te = F - Pe), se = Math.max(24, se), te = Math.max(24, te), (Q.shiftKey || Q.pointerType === "touch") && (Math.abs(U) >= Math.abs(Pe) ? te = se / Ke : se = te * Ke, se = Math.max(24, se), te = Math.max(24, te));
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
        const U = x.current;
        U && I(Zt(U.width), Zt(U.height)), x.current = null, E(null);
      };
      window.addEventListener("pointermove", Y), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", Z);
    }, [
      m,
      I
    ]);
    p.useEffect(() => {
      if (!t || !m || y || v) return;
      const T = (L) => {
        if (L.key !== "Enter") return;
        const z = L.target;
        z instanceof HTMLInputElement || z instanceof HTMLTextAreaElement || z instanceof HTMLElement && z.isContentEditable || (L.preventDefault(), L.stopPropagation(), H());
      };
      return document.addEventListener("keydown", T, true), () => document.removeEventListener("keydown", T, true);
    }, [
      t,
      m,
      y,
      v,
      H
    ]);
    const le = p.useCallback((T) => {
      if (T.detail > 1 || T.target instanceof Element && T.target.closest("[data-resize-handle]")) return;
      T.preventDefault(), T.stopPropagation();
      const L = typeof r == "function" ? r() : null;
      typeof L == "number" && n.chain().focus().setNodeSelection(L).run();
    }, [
      n,
      r
    ]), it = p.useCallback((T) => {
      T.preventDefault(), T.stopPropagation();
      const L = g.current, z = (L == null ? void 0 : L.currentSrc) || (L == null ? void 0 : L.src) || "";
      z && (N(z), A(true));
    }, []), oe = p.useCallback(async (T, L) => {
      if (!m) return;
      const z = await Co(L), R = typeof r == "function" ? r() : null;
      if (T === "overwrite") {
        const F = {
          path: z,
          alt: z,
          options: Ba(z, u, h, d)
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
      u,
      h,
      d,
      e.attrs,
      e.nodeSize
    ]);
    return l.jsxs(be, {
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
        l.jsxs("div", {
          className: "haim-wiki-image-frame",
          children: [
            l.jsx("img", {
              ref: g,
              src: Mr,
              alt: c,
              className: "haim-wiki-image",
              "data-wiki-path": o,
              ...s ? {
                "data-wiki-options": s
              } : {},
              ...u ? {
                "data-wiki-width": u
              } : {},
              ...h ? {
                "data-wiki-height": h
              } : {},
              ...d ? {
                "data-wiki-bg": d
              } : {},
              style: D,
              draggable: false
            }),
            t && m ? tu.map((T) => l.jsx("button", {
              type: "button",
              className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${T}`,
              "aria-label": `resize-${T}`,
              "data-resize-handle": T,
              onPointerDown: (L) => G(T, L)
            }, T)) : null
          ]
        }),
        l.jsx(Sl, {
          isOpen: y,
          onClose: () => k(false),
          path: o,
          kind: "wiki",
          initialWidth: u ?? "",
          initialHeight: h ?? "",
          imageSrc: ((_a2 = g.current) == null ? void 0 : _a2.currentSrc) || ((_b = g.current) == null ? void 0 : _b.src) || "",
          onApply: ({ width: T, height: L }) => {
            I(T, L), k(false);
          }
        }),
        l.jsx(vo, {
          src: _,
          alt: c,
          open: v,
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
  function jo(e, t, n = "") {
    const r = t ? gi(t) : null;
    return {
      path: e,
      options: t || "",
      alt: n || e,
      width: (r == null ? void 0 : r.width) ?? null,
      height: (r == null ? void 0 : r.height) ?? null,
      background: (r == null ? void 0 : r.background) ?? null
    };
  }
  const au = Ae.create({
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
            return jo(t, n, e.getAttribute("data-wiki-alt") || t);
          }
        }
      ];
    },
    renderHTML({ node: e, HTMLAttributes: t }) {
      const n = String(e.attrs.path || ""), r = String(e.attrs.options || ""), a = String(e.attrs.alt || n), o = e.attrs.width || null, s = e.attrs.height || null, c = e.attrs.background || null, u = on({
        width: o,
        height: s,
        background: c
      });
      return [
        "img",
        ke(t, {
          src: Mr,
          alt: a,
          "data-wiki-path": n,
          ...r ? {
            "data-wiki-options": r
          } : {},
          ...o ? {
            "data-wiki-width": o
          } : {},
          ...s ? {
            "data-wiki-height": s
          } : {},
          ...c ? {
            "data-wiki-bg": c
          } : {},
          ...u ? {
            style: u
          } : {},
          class: "haim-wiki-image"
        })
      ];
    },
    addNodeView() {
      return st(ru);
    },
    renderMarkdown: (e) => {
      var _a2, _b, _c2, _d2, _e2;
      const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.path) || "");
      if (!t) return "";
      const n = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c2 = e.attrs) == null ? void 0 : _c2.height) || null, a = ((_d2 = e.attrs) == null ? void 0 : _d2.background) || null;
      if (n || r || a) return `${yr({
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
  Bf = function(e, t = "", n = "") {
    const r = jo(e, t, n), a = on({
      width: r.width,
      height: r.height,
      background: r.background
    }), o = [
      `src="${Mr}"`,
      `alt="${Oe(r.alt)}"`,
      `data-wiki-path="${Oe(r.path)}"`,
      'class="haim-wiki-image"'
    ];
    return r.options && o.push(`data-wiki-options="${Oe(r.options)}"`), r.width && o.push(`data-wiki-width="${Oe(r.width)}"`), r.height && o.push(`data-wiki-height="${Oe(r.height)}"`), r.background && o.push(`data-wiki-bg="${Oe(r.background)}"`), a && o.push(`style="${Oe(a)}"`), `<img ${o.join(" ")} />`;
  };
  function Oe(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
  const ou = Ae.create({
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
          const u = r.attrs.width || null, h = r.attrs.height || null, d = r.attrs.background || null;
          if (u || h || d) o = yr({
            path: c,
            width: u,
            height: h,
            background: d
          });
          else {
            const m = String(r.attrs.options || "");
            o = m ? `![[${c}|${m}]]` : `![[${c}]]`;
          }
        }
      }
      const s = a ? String(t.renderChildren(a.content || []) || "").trim() : "";
      return o ? s ? `${o}
${s}

` : `${o}

` : s ? `${s}

` : "";
    }
  }), su = Ae.create({
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
  }), iu = Ae.create({
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
  Of = function() {
    return `${Cl()}

`;
  };
  function lu(e) {
    const t = getComputedStyle(e), n = t.lineHeight;
    if (n && n !== "normal") {
      const a = Number.parseFloat(n);
      if (Number.isFinite(a) && a > 0) return a;
    }
    const r = Number.parseFloat(t.fontSize);
    return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
  }
  const Oa = /* @__PURE__ */ new WeakMap();
  function Eo(e) {
    const t = getComputedStyle(e), n = `${t.font}|${t.fontSize}|${t.lineHeight}|${t.fontFamily}|${t.fontWeight}`, r = Oa.get(e);
    if (r && r.key === n) return r.value;
    let o = lu(e);
    try {
      const s = document.createElement("div");
      s.setAttribute("aria-hidden", "true"), s.style.cssText = [
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
      ].join(";"), s.textContent = "M", document.body.appendChild(s);
      const c = s.getBoundingClientRect().height || s.offsetHeight;
      s.remove(), c > 0 && (o = c);
    } catch {
    }
    return Oa.set(e, {
      key: n,
      value: o
    }), o;
  }
  function cu(e) {
    const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), n = Number.parseFloat(t);
    return Number.isFinite(n) && n > 0 ? n : 4;
  }
  function To(e) {
    const t = e.closest("pre");
    if (t) {
      const n = getComputedStyle(t), r = (Number.parseFloat(n.paddingLeft) || 0) + (Number.parseFloat(n.paddingRight) || 0), a = t.clientWidth - r;
      if (a > 0) return a;
    }
    return e.clientWidth;
  }
  function uu(e) {
    return e.classList.contains("ProseMirror-trailingBreak");
  }
  function Lo(e) {
    return Array.from(e.querySelectorAll("br")).filter((t) => !uu(t));
  }
  function du(e) {
    return Math.max(1, Lo(e).length + 1);
  }
  function fu(e, t) {
    const n = no(t);
    return e ? Math.max(n, du(e)) : n;
  }
  function hu(e, t) {
    const n = Array.from(e.getClientRects()).filter((s) => s.height > 0 || s.width > 0);
    if (n.length === 0) return t;
    let r = 1 / 0, a = -1 / 0;
    for (const s of n) r = Math.min(r, s.top), a = Math.max(a, s.bottom);
    const o = a - r;
    return o > 0.5 ? o : t;
  }
  function pu(e, t, n, r) {
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
  function mu(e, t, n, r) {
    const a = n > 0 ? t[n - 1] : null, o = t[n] ?? null;
    if (a && o) {
      const s = o.getBoundingClientRect().top - a.getBoundingClientRect().top;
      if (s > 0.5) return s;
    }
    if (!a && o) {
      const s = e.getBoundingClientRect().top, c = o.getBoundingClientRect().top - s;
      if (c > 0.5) return c;
    }
    if (a && !o) {
      const s = e.getBoundingClientRect().bottom - a.getBoundingClientRect().top;
      if (s > 0.5) return s;
    }
    return r;
  }
  function gu(e, t, n) {
    const r = Lo(e);
    if (r.length === 0 && t > 1) return null;
    const a = [], o = document.createRange();
    try {
      for (let s = 0; s < t; s += 1) if (pu(o, e, r, s), o.collapsed) a.push(mu(e, r, s, n));
      else {
        const c = hu(o, n);
        a.push(Math.max(c, n * 0.95));
      }
    } catch {
      return null;
    }
    return a.length === t ? a : null;
  }
  function xu(e, t, n, r) {
    const a = To(e);
    if (a <= 0) return Array.from({
      length: n
    }, () => r);
    const s = Ml(t, vl(e), a, cu(e)).map((c) => Math.max(1, c) * r);
    for (; s.length < n; ) s.push(r);
    return s.slice(0, n);
  }
  function bu(e, t, n, r) {
    const a = To(e);
    if (a <= 0) return Array.from({
      length: n
    }, () => r);
    const o = t.length === 0 ? [
      ""
    ] : String(t).split(`
`);
    for (; o.length < n; ) o.push("");
    o.length > n && (o.length = n);
    const s = getComputedStyle(e), c = s.whiteSpace === "pre" || s.whiteSpace === "nowrap" ? "pre-wrap" : s.whiteSpace || "pre-wrap", u = document.createElement("div");
    u.setAttribute("aria-hidden", "true"), u.style.cssText = [
      "position:absolute",
      "visibility:hidden",
      "pointer-events:none",
      "left:0",
      "top:0",
      `width:${a}px`,
      `font:${s.font}`,
      `font-size:${s.fontSize}`,
      `font-family:${s.fontFamily}`,
      `font-weight:${s.fontWeight}`,
      `font-style:${s.fontStyle}`,
      `letter-spacing:${s.letterSpacing}`,
      `line-height:${s.lineHeight}`,
      `white-space:${c}`,
      `overflow-wrap:${s.overflowWrap || "break-word"}`,
      `word-break:${s.wordBreak || "normal"}`,
      `tab-size:${s.tabSize || 4}`,
      "box-sizing:border-box",
      "padding:0",
      "margin:0",
      "border:0"
    ].join(";");
    for (const d of o) {
      const m = document.createElement("div");
      m.style.whiteSpace = c, m.style.overflowWrap = s.overflowWrap || "break-word", m.style.wordBreak = s.wordBreak || "normal", m.style.lineHeight = s.lineHeight, m.textContent = d.length > 0 ? d : "\xA0", u.appendChild(m);
    }
    document.body.appendChild(u);
    const h = [];
    for (let d = 0; d < n; d += 1) {
      const m = u.children[d], g = (m == null ? void 0 : m.getBoundingClientRect().height) || (m == null ? void 0 : m.offsetHeight) || 0;
      h.push(g > 0 ? g : r);
    }
    return u.remove(), h;
  }
  function ku(e, t, n) {
    if (n <= 0) return [];
    const r = Eo(e), a = gu(e, n, r);
    return a ? a.map((o) => o > 0 ? o : r) : e.closest("pre") || e.tagName === "PRE" ? bu(e, t, n, r) : xu(e, t, n, r);
  }
  function _a(e) {
    return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
  }
  function wu(e, t) {
    if (e === t) return true;
    if (!e || !t || e.length !== t.length) return false;
    for (let n = 0; n < e.length; n += 1) if (Math.abs((e[n] ?? 0) - (t[n] ?? 0)) > 0.5) return false;
    return true;
  }
  function Io({ text: e, className: t, contentRootRef: n }) {
    const r = no(e), [a, o] = p.useState(r), [s, c] = p.useState(null), [u, h] = p.useState(null);
    p.useLayoutEffect(() => {
      const m = (n == null ? void 0 : n.current) ?? null, g = _a(m);
      if (!g) {
        o(r), c(null), h(null);
        return;
      }
      let x = 0, y = null;
      const k = () => {
        cancelAnimationFrame(x), x = requestAnimationFrame(() => {
          const N = _a((n == null ? void 0 : n.current) ?? null);
          if (!N) {
            o(r), c(null), h(null);
            return;
          }
          const M = fu(N, e), E = Eo(N), D = ku(N, e, M), I = D.length === M && D.every((H) => H > 0) ? D : null;
          o((H) => H === M ? H : M), h((H) => H === E ? H : E), c((H) => wu(H, I) ? H : I);
        });
      };
      k(), y = new ResizeObserver(k), y.observe(g), m && m !== g && y.observe(m);
      const v = g.closest("pre");
      v && v !== g && v !== m && y.observe(v);
      const A = new MutationObserver(k);
      A.observe(g, {
        subtree: true,
        childList: true,
        characterData: true
      });
      const _ = window.setTimeout(k, 0);
      return window.addEventListener(sa, k), window.addEventListener("resize", k), () => {
        cancelAnimationFrame(x), window.clearTimeout(_), y == null ? void 0 : y.disconnect(), A.disconnect(), window.removeEventListener(sa, k), window.removeEventListener("resize", k);
      };
    }, [
      e,
      r,
      n
    ]);
    const d = u != null && u > 0 ? {
      lineHeight: `${u}px`
    } : void 0;
    return l.jsx("div", {
      className: [
        "haim-line-numbers",
        t
      ].filter(Boolean).join(" "),
      style: d,
      "aria-hidden": true,
      children: Array.from({
        length: a
      }, (m, g) => {
        const x = s == null ? void 0 : s[g], y = x != null && x > 0 ? {
          height: x,
          minHeight: x,
          maxHeight: x,
          lineHeight: u != null && u > 0 ? `${Math.min(u, x)}px` : void 0
        } : void 0;
        return l.jsx("span", {
          className: "haim-line-numbers__n",
          style: y,
          children: g + 1
        }, g);
      })
    });
  }
  yu = function(e) {
    const n = xi(String(e || ""))[0];
    return n ? {
      meta: n.meta ?? ro(),
      grid: n.grid
    } : null;
  };
  Cu = function(e, t) {
    return `${bi(e)}
${ki(t)}`;
  };
  _f = function() {
    const e = ro(), t = {
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
      text: Cu(e, t)
    };
  };
  Su = "haim-table-edit-request";
  function Mu(e, t) {
    e.dispatchEvent(new CustomEvent(Su, {
      detail: t,
      bubbles: true
    }));
  }
  function vu({ node: e, editor: t, selected: n, getPos: r }) {
    const a = String(e.attrs.kind || "raw"), o = String(e.attrs.text || ""), s = t.isEditable, c = p.useRef(null), u = p.useMemo(() => {
      if (a !== "haim-table") return null;
      const d = yu(o);
      return d ? jl(d.grid, d.meta) : null;
    }, [
      a,
      o
    ]), h = () => {
      if (!s || a !== "haim-table") return;
      const d = typeof r == "function" ? r() : null;
      typeof d == "number" && Mu(t.view.dom, {
        pos: d,
        text: o
      });
    };
    return a === "haim-table" && u ? l.jsx(be, {
      as: "div",
      className: `haim-raw-md haim-raw-md--haim-table${n ? " is-selected" : ""}`,
      "data-haim-raw-md": "1",
      "data-kind": "haim-table",
      contentEditable: false,
      onDoubleClick: (d) => {
        d.preventDefault(), d.stopPropagation(), h();
      },
      children: l.jsx("div", {
        className: "haim-haim-table-preview",
        dangerouslySetInnerHTML: {
          __html: u
        }
      })
    }) : l.jsxs(be, {
      as: "div",
      className: `haim-raw-md${n ? " is-selected" : ""}`,
      "data-haim-raw-md": "1",
      "data-kind": a,
      contentEditable: false,
      children: [
        l.jsx(Io, {
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
  const ju = Ae.create({
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
      return st(vu);
    },
    renderMarkdown: (e) => {
      var _a2;
      const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
      return t ? t.endsWith(`
`) ? t : `${t}
` : "";
    }
  }), Eu = Ae.create({
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
  function Tu(e, t) {
    var _a2;
    const n = Number(((_a2 = e.attrs) == null ? void 0 : _a2.level) ?? 1), r = Number.isFinite(n) ? Math.min(6, Math.max(1, Math.trunc(n))) : 1, a = e.content ? t(e.content) : "";
    return `${"#".repeat(r)} ${a}`;
  }
  const Lu = /* @__PURE__ */ new Set([
    "paragraph",
    "heading",
    "deepHeading"
  ]);
  function No(e) {
    const { from: t, to: n } = e.selection, r = [];
    return e.doc.nodesBetween(t, n, (a, o) => {
      if (a.isTextblock) return r.push({
        pos: o,
        node: a
      }), false;
    }), r;
  }
  function Iu(e) {
    const { $from: t } = e.state.selection, n = t.parent;
    return !n.isTextblock || n.content.size !== 0 || n.type.name !== "paragraph" && n.type.name !== "heading" ? null : t.before(t.depth);
  }
  function Nu(e, t, n) {
    const r = e.spec.attrs ?? {}, a = {};
    for (const o of Object.keys(r)) Object.prototype.hasOwnProperty.call(n, o) ? a[o] = n[o] : t.attrs[o] != null && (a[o] = t.attrs[o]);
    return a;
  }
  function Au(e, t, n, r) {
    const a = e.schema.nodes.heading, o = e.schema.nodes.paragraph;
    if (!a || !o) return false;
    let s = false;
    for (const c of No(e)) {
      if (!Lu.has(c.node.type.name) || c.node.textContent.trim() === "") continue;
      const u = e.doc.resolve(c.pos), h = u.index(), d = c.node.type === a && Number(c.node.attrs.level) === r, m = d ? o : a;
      u.parent.canReplaceWith(h, h + 1, m) && (s = true, n && t.setNodeMarkup(c.pos, m, Nu(m, c.node, d ? {} : {
        level: r
      })));
    }
    return s;
  }
  Ao = function(e, t) {
    if (No(e.state).length > 1) {
      let c = false;
      return e.chain().focus().command(({ state: u, tr: h, dispatch: d }) => (c = Au(u, h, d, t), c)).run(), c;
    }
    const n = Iu(e), r = e.chain().focus().toggleHeading({
      level: t
    }).run();
    if (!r || n == null) return r;
    const a = e.state.doc.nodeAt(n);
    if (!(a == null ? void 0 : a.isTextblock)) return true;
    const o = n + a.nodeSize - 1, s = e.state.selection;
    return s.empty && s.from === o || e.commands.setTextSelection(o), true;
  };
  const Pu = Ts.extend({
    renderMarkdown(e, t) {
      return Tu(e, (n) => t.renderChildren(n));
    },
    addKeyboardShortcuts() {
      var _a2;
      const t = {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}
      };
      for (const n of this.options.levels) t[`Mod-${n}`] = () => Ao(this.editor, n);
      return t;
    }
  }), $ = {
    format: "\uC11C\uC2DD",
    heading: "\uC81C\uBAA9",
    block: "\uBE14\uB85D",
    insert: "\uC0BD\uC785",
    tool: "\uB3C4\uAD6C"
  };
  function $u(e, t) {
    if (t >= 1 && t <= 6) {
      Ao(e, t);
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
        $u(n, e);
      }
    };
  }
  const Po = [
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
      Icon: Hi,
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
      Icon: Bi,
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
      Icon: Oi,
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
      Icon: _i,
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
      Icon: zi,
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
      Icon: Fi,
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
      Icon: Ki,
      run: ({ editor: e }) => {
        e.chain().focus().toggleSuperscript().run();
      }
    },
    ge(1, rl),
    ge(2, al),
    ge(3, ol),
    ge(4, sl),
    ge(5, il),
    ge(6, ll),
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
      groupLabel: $.block,
      Icon: rr,
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
      Icon: Wi,
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
      Icon: qi,
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
      Icon: ua,
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
      Icon: ua,
      run: ({ editor: e }) => {
        const t = () => {
          e.chain().focus().command(({ tr: n, state: r, dispatch: a }) => {
            if (!a) return false;
            const o = r.selection.$from;
            for (let s = o.depth; s >= 0; s -= 1) if (o.node(s).type.name === "taskItem") return n.setNodeMarkup(o.before(s), void 0, {
              ...o.node(s).attrs,
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
      Icon: Ui,
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
      Icon: Vi,
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
      Icon: da,
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
      Icon: da,
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
      Icon: Xi,
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
      Icon: Yi,
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
      Icon: Qi,
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
      Icon: Gi,
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
      Icon: io,
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
      Icon: oo,
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
      Icon: so,
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
      groupLabel: $.tool,
      Icon: Zi,
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
      Icon: Ji,
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
      Icon: el,
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
      Icon: lo,
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
      Icon: tl,
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
      Icon: nl,
      run: ({ app: e }) => {
        var _a2;
        (_a2 = e == null ? void 0 : e.onTocToggle) == null ? void 0 : _a2.call(e);
      }
    }
  ];
  function za(e) {
    return e.normalize("NFKC").toLowerCase();
  }
  function Ru(e, t = Po) {
    const n = za(e).trim();
    if (!n) return [
      ...t
    ];
    const r = n.split(/\s+/).filter(Boolean);
    return t.filter((a) => {
      const o = za([
        a.id,
        a.title,
        a.titleEn,
        ...a.keywords
      ].join(`
`));
      return r.every((s) => o.includes(s));
    });
  }
  const Du = p.forwardRef(function({ items: t, command: n }, r) {
    const [a, o] = p.useState(0), s = p.useRef(null), c = p.useRef([]);
    if (p.useEffect(() => {
      o(0);
    }, [
      t
    ]), p.useLayoutEffect(() => {
      var _a2;
      (_a2 = c.current[a]) == null ? void 0 : _a2.scrollIntoView({
        block: "nearest"
      });
    }, [
      a,
      t
    ]), p.useImperativeHandle(r, () => ({
      onKeyDown: ({ event: h }) => {
        if (t.length === 0 || h.shiftKey || h.altKey || h.metaKey || h.ctrlKey) return false;
        if (h.key === "ArrowUp") return o((d) => (d + t.length - 1) % t.length), true;
        if (h.key === "ArrowDown") return o((d) => (d + 1) % t.length), true;
        if (h.key === "Enter") {
          const d = t[a];
          return d && n(d), true;
        }
        return false;
      }
    })), t.length === 0) return l.jsx("div", {
      className: "w-[min(92vw,300px)] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-muted",
      role: "listbox",
      "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839",
      children: "\uACB0\uACFC \uC5C6\uC74C"
    });
    let u = "";
    return l.jsx("div", {
      ref: s,
      className: "flex max-h-[min(60vh,360px)] w-[min(92vw,300px)] flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface",
      role: "listbox",
      "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839",
      children: t.map((h, d) => {
        const m = h.groupLabel !== u;
        u = h.groupLabel;
        const g = h.Icon, x = d === a;
        return l.jsxs("div", {
          children: [
            m ? l.jsx("div", {
              className: "px-2.5 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-odp-muted",
              children: h.groupLabel
            }) : null,
            l.jsxs("button", {
              type: "button",
              ref: (y) => {
                c.current[d] = y;
              },
              role: "option",
              "aria-selected": x,
              className: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm ${x ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-800 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-bgSoft"}`,
              onMouseEnter: () => o(d),
              onClick: () => {
                n(h);
              },
              children: [
                l.jsx(g, {
                  size: 14,
                  className: "shrink-0 text-gray-500 dark:text-odp-muted",
                  "aria-hidden": true
                }),
                l.jsx("span", {
                  className: "min-w-0 flex-1 truncate font-medium",
                  children: h.title
                }),
                l.jsx("span", {
                  className: "shrink-0 truncate text-xs text-gray-400 dark:text-odp-muted",
                  children: h.titleEn
                })
              ]
            })
          ]
        }, h.id);
      })
    });
  }), Fa = new Ne("haimSlashCommands");
  function Hu(e) {
    const { $from: t } = e.selection;
    for (let n = t.depth; n > 0; n -= 1) {
      const r = t.node(n).type.name;
      if (r === "codeBlock" || r === "rawMarkdownBlock") return true;
    }
    return false;
  }
  function Ka(e, t) {
    si.flushSync(() => {
      e.root.render(p.createElement(Du, {
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
  const Bu = ze.create({
    name: "haimSlashCommands",
    addStorage() {
      return {
        getAppActions: () => null
      };
    },
    addProseMirrorPlugins() {
      return [
        Ls({
          pluginKey: Fa,
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
            ...Po
          ],
          allow: ({ state: e, editor: t }) => t.isEditable && !Hu(e),
          items: ({ query: e }) => Ru(e),
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
                }, a = oi.createRoot(n);
                e = {
                  el: n,
                  root: a,
                  listRef: r,
                  unmountFloating: null
                }, Ka(e, t), e.unmountFloating = t.mount(n);
              },
              onUpdate: (t) => {
                e && Ka(e, t);
              },
              onKeyDown: (t) => {
                var _a2;
                return t.event.key === "Escape" ? (Is(t.view, Fa), true) : ((_a2 = e == null ? void 0 : e.listRef.current) == null ? void 0 : _a2.onKeyDown(t)) ?? false;
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
  function Ou(e, t) {
    try {
      const n = e.domAtPos(t), r = n.node instanceof Element ? n.node : n.node.parentElement;
      if (!r) return 22;
      const a = window.getComputedStyle(r), o = parseFloat(a.lineHeight);
      if (Number.isFinite(o) && o > 0) return o;
      const s = parseFloat(a.fontSize);
      if (Number.isFinite(s) && s > 0) return s * 1.4;
    } catch {
    }
    return 22;
  }
  function Jn(e) {
    for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
    return -1;
  }
  function _u(e, t, n, r) {
    const a = Jn(t);
    if (a < 0) return null;
    const o = n === "down" ? 1 : -1, s = n === "down" ? t.after(a) : t.before(a);
    let c;
    try {
      c = B.near(t.doc.resolve(Math.max(0, Math.min(t.doc.content.size, s))), o).head;
    } catch {
      return null;
    }
    const u = t.doc.resolve(c);
    if (Jn(u) === a) {
      const h = u.before(Jn(u)), d = t.before(a);
      if (h === d) return null;
    }
    try {
      const h = e.coordsAtPos(c), d = (h.top + h.bottom) / 2, m = e.posAtCoords({
        left: r,
        top: d
      });
      if (m && m.pos !== t.pos) return m.pos;
    } catch {
    }
    return c !== t.pos ? c : null;
  }
  function Wa(e, t) {
    const { state: n } = e, { selection: r, doc: a } = n, o = t === "down" ? 1 : -1;
    let s = r.anchor, c = r.head;
    if (r instanceof Za) {
      const x = B.near(a.resolve(t === "down" ? r.to : r.from), o);
      s = x.anchor, c = x.head;
    }
    let u;
    try {
      u = e.coordsAtPos(c);
    } catch {
      u = {
        left: 0,
        top: 0,
        bottom: 22
      };
    }
    const h = Ou(e, c), d = u.left;
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
      const y = t === "down" ? u.bottom + Math.max(2, h * x) : u.top - Math.max(2, h * x);
      let k = null;
      try {
        k = e.posAtCoords({
          left: d,
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
      const x = _u(e, a.resolve(c), t, d);
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
      const x = n.tr.setSelection(B.create(a, s, m));
      return x.scrollIntoView(), e.dispatch(x), true;
    } catch {
      try {
        const x = B.near(a.resolve(m), o), y = n.tr.setSelection(B.create(a, s, x.head));
        return y.scrollIntoView(), e.dispatch(y), true;
      } catch {
        return false;
      }
    }
  }
  const zu = ze.create({
    name: "haimShiftArrowSelect",
    priority: 1e3,
    addKeyboardShortcuts() {
      return {
        "Shift-ArrowDown": ({ editor: e }) => Wa(e.view, "down"),
        "Shift-ArrowUp": ({ editor: e }) => Wa(e.view, "up")
      };
    }
  });
  function Fu(e) {
    for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
    return -1;
  }
  function Ku(e, t) {
    const { state: n } = e, r = n.schema.nodes.paragraph;
    if (!r) return false;
    const a = n.selection.$head, o = Fu(a);
    if (o < 0) return false;
    const s = a.before(o), c = r.createAndFill();
    if (!c) return false;
    let u = n.tr.insert(s, c);
    try {
      u = u.setSelection(B.near(u.doc.resolve(s + 1)));
    } catch {
      return false;
    }
    return u.scrollIntoView(), (0, e.dispatch)(u), true;
  }
  const Wu = ze.create({
    name: "haimInsertLineAbove",
    priority: 1e3,
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-Enter": ({ editor: e }) => Ku(e.view)
      };
    }
  }), Jt = /[\p{L}\p{N}_]/u;
  function $o(e, t) {
    try {
      const n = e.resolve(t);
      if (!n.parent.isTextblock) return null;
      const r = n.start(), a = n.parent.textContent;
      if (!a) return null;
      let o = Math.max(0, Math.min(a.length, t - r)), s = o;
      if (s > 0 && (s >= a.length || !Jt.test(a[s])) && (s = o - 1), s < 0 || s >= a.length || !Jt.test(a[s])) return null;
      let c = s, u = s + 1;
      for (; c > 0 && Jt.test(a[c - 1]); ) c -= 1;
      for (; u < a.length && Jt.test(a[u]); ) u += 1;
      return {
        from: r + c,
        to: r + u
      };
    } catch {
      return null;
    }
  }
  function qu(e) {
    const t = [];
    return e.descendants((n, r) => n.isTextblock ? (t.length > 0 && t.push({
      pos: -1,
      ch: `
`
    }), n.forEach((a, o) => {
      if (a.isText && a.text) {
        const s = r + 1 + o;
        for (let c = 0; c < a.text.length; c += 1) t.push({
          pos: s + c,
          ch: a.text[c]
        });
      } else a.isText || t.push({
        pos: -1,
        ch: "\0"
      });
    }), false) : true), t;
  }
  function Ro(e, t, n = 1e3) {
    if (!t) return [];
    const r = qu(e);
    if (!r.length) return [];
    const a = r.map((u) => u.ch).join(""), o = t;
    if (!o) return [];
    const s = [];
    let c = 0;
    for (; s.length < n; ) {
      const u = a.indexOf(o, c);
      if (u < 0) break;
      const h = u + o.length, d = r[u], m = r[h - 1];
      let g = false;
      for (let x = u; x < h; x += 1) if (r[x].pos < 0) {
        g = true;
        break;
      }
      !g && d && m && d.pos >= 0 && m.pos >= 0 && s.push({
        from: d.pos,
        to: m.pos + 1
      }), c = u + Math.max(1, o.length);
    }
    return s;
  }
  function Uu(e, t, n, r, a) {
    const o = Ro(e, t);
    if (!o.length) return null;
    const s = (h) => r.some((d) => d.from === h.from && d.to === h.to), c = (h) => {
      if (!a) return true;
      const d = $o(e, h.from);
      return !!(d && d.from === h.from && d.to === h.to);
    }, u = o.find((h) => h.from >= n && !s(h) && c(h));
    return u || (o.find((h) => !s(h) && c(h)) ?? null);
  }
  function nn(e, t) {
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
  }, vr = "set", mr = "clear";
  function xe(e) {
    return _e.getState(e) ?? Pt;
  }
  function Vu(e, t) {
    const n = [];
    for (const a of e) {
      const o = t.map(a.from, 1), s = t.map(a.to, -1);
      o <= s && n.push({
        from: o,
        to: s
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
  function Xu(e, t) {
    if (t.ranges.length <= 1) return ta.empty;
    const n = t.ranges[t.mainIndex], r = [];
    for (let a = 0; a < t.ranges.length; a += 1) {
      const o = t.ranges[a];
      n && o.from === n.from && o.to === n.to || (o.from === o.to ? r.push(na.widget(o.from, () => {
        const s = document.createElement("span");
        return s.className = "haim-multi-cursor", s.setAttribute("aria-hidden", "true"), s;
      }, {
        side: -1
      })) : r.push(na.inline(o.from, o.to, {
        class: "haim-multi-selection"
      })));
    }
    return ta.create(e, r);
  }
  function gr(e, t, n, r) {
    const a = t.map((m, g) => ({
      r: m,
      i: g
    })).sort((m, g) => g.r.from - m.r.from || g.r.to - m.r.to);
    let o = e.tr;
    const s = [];
    for (const { r: m, i: g } of a) o = o.insertText(n, m.from, m.to), s.push({
      i: g,
      from: m.from,
      to: m.from + n.length
    });
    s.sort((m, g) => m.from - g.from);
    const c = s.map((m) => ({
      from: m.from,
      to: m.to
    })), u = Math.max(0, s.findIndex((m) => m.i === r)), h = c[u] ?? c[0];
    if (h) try {
      o = o.setSelection(B.create(o.doc, h.from, h.to));
    } catch {
    }
    const d = {
      ranges: c,
      mainIndex: u >= 0 ? u : 0,
      query: xe(e).query,
      wholeWord: xe(e).wholeWord
    };
    return o.setMeta(_e, {
      type: vr,
      state: d
    }), o.scrollIntoView(), o;
  }
  function qa(e, t) {
    const n = xe(e.state);
    if (n.ranges.length <= 1) return false;
    if (n.ranges.some((o) => o.from !== o.to)) return e.dispatch(gr(e.state, n.ranges, "", n.mainIndex)), true;
    const a = [];
    for (const o of n.ranges) if (t === "backward") {
      if (o.from <= 1) {
        a.push(o);
        continue;
      }
      try {
        const s = e.state.doc.resolve(o.from), c = Math.max(s.start(), o.from - 1);
        a.push({
          from: c,
          to: o.from
        });
      } catch {
        a.push(o);
      }
    } else try {
      const s = e.state.doc.resolve(o.from), c = Math.min(s.end(), o.from + 1);
      a.push({
        from: o.from,
        to: c
      });
    } catch {
      a.push(o);
    }
    return e.dispatch(gr(e.state, a, "", n.mainIndex)), true;
  }
  function xr(e, t, n = true) {
    const r = t.ranges[t.mainIndex] ?? t.ranges[0];
    let a = e.tr;
    if (r) try {
      a = a.setSelection(B.create(a.doc, r.from, r.to));
    } catch {
    }
    return a.setMeta(_e, {
      type: vr,
      state: t
    }), n && a.scrollIntoView(), a;
  }
  function Yu(e, t) {
    const n = xe(e), { selection: r } = e, a = {
      from: r.from,
      to: r.to
    };
    let o, s;
    if (n.ranges.length > 0 ? (o = n.ranges.map((x, y) => y === n.mainIndex ? a : {
      ...x
    }), s = n.mainIndex) : (o = [
      a
    ], s = 0), o.some((x) => x.from === x.to)) {
      const x = o.map((v) => v.from !== v.to ? v : $o(e.doc, v.from) ?? v);
      if (x.every((v, A) => v.from === o[A].from && v.to === o[A].to)) return false;
      const y = nn(e.doc, x[0]);
      return t && t(xr(e, {
        ranges: x,
        mainIndex: s,
        query: y,
        wholeWord: true
      })), true;
    }
    const u = n.query ?? nn(e.doc, o[0]);
    if (!u || o.some((x) => nn(e.doc, x) !== u)) return false;
    const h = o[o.length - 1], d = Uu(e.doc, u, h.to, o, n.wholeWord);
    if (!d) return false;
    const m = [
      ...o,
      d
    ], g = {
      ranges: m,
      mainIndex: m.length - 1,
      query: u,
      wholeWord: n.wholeWord
    };
    return t && t(xr(e, g)), true;
  }
  function Qu(e, t) {
    if (xe(e).ranges.length > 1) return false;
    const { selection: r } = e;
    if (r.empty) return false;
    const a = nn(e.doc, {
      from: r.from,
      to: r.to
    });
    if (!a) return false;
    const o = Ro(e.doc, a);
    if (o.length <= 1) return false;
    let s = o.findIndex((u) => u.from === r.from && u.to === r.to);
    return s < 0 && (s = 0), t && t(xr(e, {
      ranges: o,
      mainIndex: s,
      query: a,
      wholeWord: false
    })), true;
  }
  function Gu() {
    return new Ie({
      key: _e,
      state: {
        init: () => Pt,
        apply(e, t) {
          const n = e.getMeta(_e);
          if ((n == null ? void 0 : n.type) === mr) return Pt;
          if ((n == null ? void 0 : n.type) === vr) return n.state;
          if (t.ranges.length === 0) return t;
          let r = t;
          if (e.docChanged) {
            const a = Vu(t.ranges, e.mapping);
            if (a.length === 0) return Pt;
            const o = Math.min(t.mainIndex, a.length - 1);
            r = {
              ...t,
              ranges: a,
              mainIndex: o
            };
          }
          if (e.selectionSet) {
            const { from: a, to: o } = e.selection, s = r.ranges.findIndex((c) => c.from === a && c.to === o);
            return s >= 0 ? {
              ...r,
              mainIndex: s
            } : Pt;
          }
          return r;
        }
      },
      props: {
        decorations(e) {
          return Xu(e.doc, xe(e));
        },
        handleTextInput(e, t, n, r) {
          const a = xe(e.state);
          return a.ranges.length <= 1 ? false : (e.dispatch(gr(e.state, a.ranges, r, a.mainIndex)), true);
        },
        handleKeyDown(e, t) {
          return xe(e.state).ranges.length <= 1 ? false : t.key === "Backspace" ? (t.preventDefault(), qa(e, "backward")) : t.key === "Delete" ? (t.preventDefault(), qa(e, "forward")) : false;
        },
        handleClick(e) {
          return xe(e.state).ranges.length <= 1 || e.dispatch(e.state.tr.setMeta(_e, {
            type: mr
          })), false;
        }
      }
    });
  }
  const Zu = ze.create({
    name: "haimMultiCursor",
    priority: 1e3,
    addCommands() {
      return {
        selectNextOccurrence: () => ({ state: e, dispatch: t }) => Yu(e, t),
        selectAllOccurrences: () => ({ state: e, dispatch: t }) => Qu(e, t),
        clearMultiCursor: () => ({ tr: e, dispatch: t }) => (t && (e.setMeta(_e, {
          type: mr
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
        Gu()
      ];
    }
  }), Ju = new Ne("haimSelectionInlineCode");
  function ed(e) {
    const { $from: t, $to: n } = e.state.selection;
    return t.parent.type.name === "codeBlock" || n.parent.type.name === "codeBlock";
  }
  function td(e, t, n) {
    return t.defaultPrevented || t.isComposing || !El(t) || e.state.selection.empty || e.state.selection.$from.pos === e.state.selection.$to.pos || ed(e) || !e.state.schema.marks.code ? false : n();
  }
  const nd = ze.create({
    name: "haimSelectionInlineCode",
    priority: 1e3,
    addProseMirrorPlugins() {
      const e = this.editor;
      return [
        new Ie({
          key: Ju,
          props: {
            handleKeyDown(t, n) {
              return td(t, n, () => e.commands.toggleCode());
            }
          }
        })
      ];
    }
  }), rd = Ae.create({
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
    return l.jsxs(cn, {
      children: [
        l.jsx(un, {
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
        l.jsx(dn, {
          children: l.jsxs(fn, {
            side: "top",
            sideOffset: 6,
            className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg",
            children: [
              e,
              l.jsx(hn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Do(e, t) {
    const [n, r] = p.useState(null), [a, o] = p.useState(false);
    return p.useEffect(() => {
      const s = String(e || "").trim();
      if (!s) {
        r(null), o(false);
        return;
      }
      try {
        const c = Tl.renderToString(s, {
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
  function ad({ node: e, updateAttributes: t, editor: n, selected: r }) {
    const a = String(e.attrs.latex || ""), o = n.isEditable, [s, c] = p.useState(false), [u, h] = p.useState(a), d = p.useRef(null), { html: m, error: g } = Do(a, true);
    p.useEffect(() => {
      h(a);
    }, [
      a
    ]), p.useEffect(() => {
      var _a2;
      s && ((_a2 = d.current) == null ? void 0 : _a2.focus());
    }, [
      s
    ]);
    const x = () => {
      const k = u.trim();
      t({
        latex: k || a
      }), c(false);
    }, y = () => {
      h(a), c(false);
    };
    return s && o ? l.jsxs(be, {
      as: "div",
      className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`,
      "data-type": "block-math",
      contentEditable: false,
      children: [
        l.jsx("textarea", {
          ref: d,
          className: "haim-math-block__textarea",
          value: u,
          rows: Math.min(8, Math.max(2, u.split(`
`).length + 1)),
          onChange: (k) => h(k.target.value),
          onBlur: x,
          onKeyDown: (k) => {
            k.key === "Escape" && (k.preventDefault(), y()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), x()), k.stopPropagation();
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
              children: l.jsx(Cr, {
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
              children: l.jsx(co, {
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
  function od({ node: e, updateAttributes: t, editor: n, selected: r }) {
    const a = String(e.attrs.latex || ""), o = n.isEditable, [s, c] = p.useState(false), [u, h] = p.useState(a), d = p.useRef(null), { html: m, error: g } = Do(a, false);
    p.useEffect(() => {
      h(a);
    }, [
      a
    ]), p.useEffect(() => {
      var _a2;
      s && ((_a2 = d.current) == null ? void 0 : _a2.focus());
    }, [
      s
    ]);
    const x = () => {
      const k = u.trim();
      t({
        latex: k || a
      }), c(false);
    }, y = () => {
      h(a), c(false);
    };
    return s && o ? l.jsx(be, {
      as: "span",
      className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`,
      "data-type": "inline-math",
      contentEditable: false,
      children: l.jsx("input", {
        ref: d,
        type: "text",
        className: "haim-math-inline__input",
        value: u,
        onChange: (k) => h(k.target.value),
        onBlur: x,
        onKeyDown: (k) => {
          k.key === "Enter" && (k.preventDefault(), x()), k.key === "Escape" && (k.preventDefault(), y()), k.stopPropagation();
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
  let sd, id, ld, Ho, cd;
  sd = Ns.extend({
    addNodeView() {
      return st(ad);
    }
  }).configure({
    katexOptions: {
      throwOnError: false,
      displayMode: true
    }
  });
  id = As.extend({
    addNodeView() {
      return st(od);
    }
  }).configure({
    katexOptions: {
      throwOnError: false,
      displayMode: false
    }
  });
  mn = {
    "(": ")",
    "[": "]",
    "{": "}",
    "'": "'",
    '"': '"',
    "`": "`"
  };
  ld = /* @__PURE__ */ new Set([
    "js",
    "javascript",
    "jsx",
    "mjs",
    "cjs",
    "ts",
    "typescript",
    "tsx"
  ]);
  Ho = new Set(Object.values(mn));
  cd = new Ne("haimCodeBlockBracketPairs");
  function ot(e, t) {
    return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
  }
  function br(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
  }
  kr = function(e) {
    return ld.has(String(e || "").trim().toLowerCase());
  };
  function Bo(e) {
    const { $from: t, $to: n } = e.selection;
    return t.parent.type.name !== "codeBlock" || n.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === n.before(n.depth);
  }
  ud = function(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
    const { key: t, code: n } = e;
    return t === "`" || n === "Backquote" && !e.shiftKey ? "`" : t in mn || Ho.has(t) ? t : n === "Quote" ? e.shiftKey ? '"' : "'" : null;
  };
  function Va(e) {
    return e ? /[\w$]/.test(e) : false;
  }
  function dd(e, t) {
    const { from: n } = e.selection, r = ot(e, n - 1), a = ot(e, n);
    return !(Va(r) || Va(a) || a === t);
  }
  function fd(e, t) {
    if (!Bo(e) || t === "`" && !kr(br(e))) return null;
    const { selection: n } = e, { from: r, to: a, empty: o } = n, s = mn[t];
    if (s !== void 0) {
      if (!o) {
        const u = e.doc.textBetween(r, a), h = e.tr.insertText(`${t}${u}${s}`, r, a);
        return h.setSelection(B.create(h.doc, r + t.length, r + t.length + u.length)), h;
      }
      if ((t === "'" || t === '"' || t === "`") && !dd(e, t)) return ot(e, r) === t ? e.tr.setSelection(B.create(e.doc, r + 1)) : null;
      const c = e.tr.insertText(`${t}${s}`, r, a);
      return c.setSelection(B.create(c.doc, r + t.length)), c;
    }
    return Ho.has(t) && o && ot(e, r) === t ? t === "`" && !kr(br(e)) ? null : e.tr.setSelection(B.create(e.doc, r + 1)) : null;
  }
  function hd(e) {
    if (!Bo(e)) return null;
    const { selection: t } = e;
    if (!t.empty) return null;
    const { from: n } = t, r = ot(e, n - 1), a = ot(e, n), o = mn[r];
    return !o || a !== o || r === "`" && !kr(br(e)) ? null : e.tr.delete(n - 1, n + 1);
  }
  function pd(e, t) {
    if (t.defaultPrevented) return false;
    if (t.key === "Backspace") {
      if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
      const a = hd(e.state);
      return a ? (e.dispatch(a), true) : false;
    }
    const n = ud(t);
    if (!n) return false;
    const r = fd(e.state, n);
    return r ? (e.dispatch(r), true) : false;
  }
  function md() {
    return new Ie({
      key: cd,
      props: {
        handleKeyDown(e, t) {
          return pd(e, t);
        }
      }
    });
  }
  function gd(e) {
    var _a2;
    return ((_a2 = String(e ?? "").match(/^[ \t]*/)) == null ? void 0 : _a2[0]) ?? "";
  }
  function ln(e) {
    return /^[ \t]*$/.test(String(e ?? ""));
  }
  function Oo(e) {
    const t = String(e ?? "").split(`
`);
    return t.length < 2 ? false : ln(t[t.length - 1]) && ln(t[t.length - 2]);
  }
  function gn(e) {
    const t = String(e ?? "").split(`
`);
    let n = 0, r = t.length;
    for (; n < r && ln(t[n]); ) n += 1;
    for (; r > n && ln(t[r - 1]); ) r -= 1;
    return t.slice(n, r).join(`
`);
  }
  xd = function(e, t) {
    const n = String(e ?? ""), r = Math.max(0, Math.min(t, n.length)), a = n.lastIndexOf(`
`, r - 1) + 1, o = n.indexOf(`
`, r), s = n.slice(a, o === -1 ? n.length : o);
    return gd(s);
  };
  function xn(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function bd(e) {
    if (!xn(e)) return null;
    const { $from: t, from: n, to: r } = e.selection, a = t.parent.textContent, s = `
${xd(a, t.parentOffset)}`, c = e.tr.insertText(s, n, r);
    return c.setSelection(B.create(c.doc, n + s.length)), c;
  }
  function kd(e) {
    if (!xn(e)) return null;
    const { $from: t } = e.selection, n = t.parent.textContent, r = t.parentOffset, a = n.lastIndexOf(`
`, r - 1) + 1, o = t.start() + a, s = e.tr.insertText(`
`, o);
    return s.setSelection(B.create(s.doc, o)), s;
  }
  function wd(e) {
    if (!xn(e)) return null;
    const { $from: t, empty: n } = e.selection;
    if (!n || !(t.parentOffset === t.parent.nodeSize - 2)) return null;
    const a = t.parent.textContent;
    if (!Oo(a)) return null;
    const o = gn(a), s = t.start(), c = t.end(), u = e.tr.insertText(o, s, c);
    return u.setSelection(B.create(u.doc, s + o.length)), u;
  }
  function yd(e, t) {
    const { $from: n, empty: r } = t.selection;
    if (!r || n.parent.type.name !== "codeBlock" || n.parentOffset !== n.parent.nodeSize - 2) return false;
    const a = n.parent.textContent;
    if (!Oo(a)) return false;
    const o = gn(a), s = n.start(), c = n.end();
    return e.insertText(o, s, c), e.setSelection(B.create(e.doc, s + o.length)), true;
  }
  function Cd(e) {
    const { state: t } = e;
    if (!xn(t)) return false;
    if (wd(t)) return e.chain().command(({ tr: r, state: a }) => yd(r, a)).exitCode().run();
    const n = bd(t);
    return n ? (e.view.dispatch(n), true) : false;
  }
  function Sd(e) {
    const t = kd(e.state);
    return t ? (e.view.dispatch(t), true) : false;
  }
  const Md = new Ne("haimCodeBlockIndent");
  function vd(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
  }
  function jr(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function Er(e, t, n) {
    const r = e.doc.resolve(t);
    if (r.parent.type.name !== "codeBlock") return [];
    const a = r.start(), o = r.end(), c = e.doc.textBetween(a, o, `
`, `
`).split(`
`), u = [];
    let h = a;
    for (let d = 0; d < c.length; d += 1) {
      const m = c[d] ?? "", g = d < c.length - 1 ? h + m.length + 1 : o;
      t < g && n > h && u.push(h), h = g;
    }
    return u;
  }
  function Xa(e, t) {
    var _a2;
    const n = ((_a2 = e.match(/^ */)) == null ? void 0 : _a2[0]) ?? "";
    return Math.min(n.length, t);
  }
  function jd(e, t) {
    if (!jr(e)) return null;
    const n = Math.max(1, Math.round(t)), r = " ".repeat(n), { selection: a } = e, { from: o, to: s, empty: c } = a;
    if (c) {
      const g = e.tr.insertText(r, o);
      return g.setSelection(B.create(g.doc, o + r.length)), g;
    }
    const u = Er(e, o, s);
    if (u.length === 0) return null;
    const h = e.tr;
    for (let g = u.length - 1; g >= 0; g -= 1) h.insertText(r, u[g]);
    const d = u[0], m = h.mapping.map(s);
    return h.setSelection(B.create(h.doc, d, m)), h;
  }
  function Ed(e, t) {
    var _a2;
    if (!jr(e)) return null;
    const n = Math.max(1, Math.round(t)), { selection: r, doc: a } = e, { $from: o, empty: s } = r;
    if (s) {
      const M = o.start(), E = o.end(), I = a.textBetween(M, E, `
`, `
`).split(`
`), H = o.pos - M;
      let G = 0, le = 0;
      for (let R = 0; R < I.length; R += 1) {
        const K = I[R] ?? "";
        if (le + K.length >= H) {
          G = R;
          break;
        }
        le += K.length + 1, R === I.length - 1 && (G = R);
      }
      const it = I[G] ?? "", oe = Xa(it, n);
      if (oe === 0) return e.tr;
      let T = M;
      for (let R = 0; R < G; R += 1) T += (((_a2 = I[R]) == null ? void 0 : _a2.length) ?? 0) + 1;
      const L = e.tr.delete(T, T + oe);
      return o.pos - T <= oe ? L.setSelection(B.create(L.doc, T)) : L.setSelection(B.create(L.doc, o.pos - oe)), L;
    }
    const { from: c, to: u } = r, h = Er(e, c, u);
    if (h.length === 0) return null;
    const d = o.start(), m = o.end(), x = a.textBetween(d, m, `
`, `
`).split(`
`), y = /* @__PURE__ */ new Map();
    {
      let M = d;
      for (let E = 0; E < x.length; E += 1) {
        const D = x[E] ?? "";
        y.set(M, D), M += D.length + (E < x.length - 1 ? 1 : 0);
      }
    }
    const k = e.tr;
    let v = 0, A = 0;
    for (let M = h.length - 1; M >= 0; M -= 1) {
      const E = h[M], D = y.get(E) ?? "", I = Xa(D, n);
      I !== 0 && (k.delete(E, E + I), A += I, E < c && (v += I));
    }
    if (A === 0) return k;
    const _ = Math.max(h[0], c - v), N = k.mapping.map(u);
    return k.setSelection(B.create(k.doc, _, Math.max(_, N))), k;
  }
  function Td(e, t) {
    if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !jr(e.state)) return false;
    const n = vd(e.state), r = Ll(n, Il()), a = t.shiftKey ? Ed(e.state, r) : jd(e.state, r);
    return a ? (e.dispatch(a), true) : false;
  }
  function Ld() {
    return new Ie({
      key: Md,
      props: {
        handleKeyDown(e, t) {
          return Td(e, t);
        }
      }
    });
  }
  function Id(e) {
    return e.selection.$from.parent.type.name === "codeBlock";
  }
  function Nd(e) {
    const { $from: t } = e.selection;
    return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
  }
  function Ad(e, t) {
    const r = e.doc.resolve(t).end(), a = e.doc.textBetween(t, r, `
`, `
`), o = a.indexOf(`
`);
    return o < 0 ? a : a.slice(0, o);
  }
  function Pd(e) {
    const { from: t, to: n, empty: r } = e.selection, a = e.selection.$from;
    if (a.parent.type.name !== "codeBlock") return [];
    if (r) {
      const s = a.start(), c = a.end(), h = e.doc.textBetween(s, c, `
`, `
`).split(`
`), d = a.pos - s;
      let m = s, g = 0;
      for (let x = 0; x < h.length; x += 1) {
        const y = h[x] ?? "";
        if (g + y.length >= d || x === h.length - 1) return [
          {
            from: m,
            text: y
          }
        ];
        g += y.length + 1, m += y.length + 1;
      }
      return [];
    }
    return Er(e, t, n).map((s) => ({
      from: s,
      text: Ad(e, s)
    }));
  }
  function $d(e) {
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
  function Rd(e, t) {
    const n = e.tr, r = $l(t);
    for (const c of r) c.to != null && c.to !== c.from ? n.insertText(c.insert, c.from, c.to) : n.insertText(c.insert, c.from);
    const { from: a, to: o, empty: s } = e.selection;
    if (s) {
      const c = n.mapping.map(a, 1);
      n.setSelection(B.create(n.doc, c));
    } else {
      const c = n.mapping.map(a, -1), u = n.mapping.map(o, 1);
      n.setSelection(B.create(n.doc, c, Math.max(c, u)));
    }
    return n;
  }
  function Dd(e) {
    if (!Id(e)) return null;
    const t = Pd(e);
    if (t.length === 0) return null;
    const n = Nl(Nd(e));
    let r = null;
    return n.line ? r = Al(t, n.line) : n.block && (r = Pl($d(t), n.block.open, n.block.close)), !r || r.length === 0 ? null : Rd(e, r);
  }
  function Hd(e) {
    const t = Dd(e.state);
    return t ? (e.view.dispatch(t), true) : false;
  }
  function Ya(e) {
    return String(e || "").trim().toLowerCase() === "mermaid";
  }
  function Bd(e) {
    var _a2;
    return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
  }
  const _o = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", Od = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", _d = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
  function wr({ label: e, onClick: t, active: n = false, expanded: r, children: a }) {
    return l.jsxs(cn, {
      children: [
        l.jsx(un, {
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
        l.jsx(dn, {
          children: l.jsxs(fn, {
            side: "bottom",
            sideOffset: 6,
            className: _o,
            children: [
              e,
              l.jsx(hn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function zd({ language: e, onChange: t }) {
    const n = p.useId(), r = p.useRef(null), [a, o] = p.useState(false), [s, c] = p.useState(""), [u, h] = p.useState(0), d = Rl(e), m = Dl(e), g = Hl(e), x = Bl(d, s), y = s.trim(), k = y.toLowerCase() === "plain" ? Ol : y, A = !!y && !x.some((M) => M.value.toLowerCase() === k.toLowerCase() || M.label.toLowerCase() === y.toLowerCase()) ? [
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
    p.useEffect(() => {
      if (!a) return;
      c(""), h(0);
      const M = window.setTimeout(() => {
        var _a2;
        return (_a2 = r.current) == null ? void 0 : _a2.focus();
      }, 0);
      return () => window.clearTimeout(M);
    }, [
      a
    ]), p.useEffect(() => {
      h(0);
    }, [
      s
    ]);
    const _ = p.useCallback((M) => {
      t(_l(M)), o(false);
    }, [
      t
    ]), N = (M) => {
      if (M.key === "ArrowDown") {
        if (M.preventDefault(), !A.length) return;
        h((E) => (E + 1) % A.length);
        return;
      }
      if (M.key === "ArrowUp") {
        if (M.preventDefault(), !A.length) return;
        h((E) => (E - 1 + A.length) % A.length);
        return;
      }
      if (M.key === "Enter") {
        M.preventDefault();
        const E = A[u] ?? A[0];
        E ? _(E.value) : y && _(k);
        return;
      }
      M.key === "Escape" && (M.preventDefault(), o(false));
    };
    return l.jsxs(gl, {
      open: a,
      onOpenChange: o,
      children: [
        l.jsxs(cn, {
          children: [
            l.jsx(un, {
              asChild: true,
              children: l.jsx(xl, {
                asChild: true,
                children: l.jsxs("button", {
                  type: "button",
                  className: "haim-code-block__lang-trigger",
                  "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4",
                  "aria-haspopup": "listbox",
                  "aria-expanded": a,
                  onPointerDown: (M) => M.stopPropagation(),
                  children: [
                    l.jsx("span", {
                      className: "haim-code-block__lang-label",
                      children: g
                    }),
                    l.jsx("span", {
                      className: "haim-code-block__lang-chevron",
                      children: l.jsx(fo, {
                        size: 12,
                        "aria-hidden": true
                      })
                    })
                  ]
                })
              })
            }),
            l.jsx(dn, {
              children: l.jsxs(fn, {
                side: "bottom",
                sideOffset: 6,
                className: _o,
                children: [
                  "\uC5B8\uC5B4 \uAC80\uC0C9",
                  l.jsx(hn, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        }),
        l.jsx(bl, {
          children: l.jsxs(kl, {
            className: Od,
            side: "bottom",
            align: "start",
            sideOffset: 4,
            onOpenAutoFocus: (M) => M.preventDefault(),
            onCloseAutoFocus: (M) => M.preventDefault(),
            onPointerDown: (M) => M.stopPropagation(),
            children: [
              l.jsxs("div", {
                className: "flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong",
                children: [
                  l.jsx(lo, {
                    size: 12,
                    className: "shrink-0 text-gray-400",
                    "aria-hidden": true
                  }),
                  l.jsx("input", {
                    ref: r,
                    type: "text",
                    value: s,
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
              l.jsx("ul", {
                id: n,
                role: "listbox",
                "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4",
                className: "max-h-56 overflow-y-auto p-1",
                children: A.length === 0 ? l.jsx("li", {
                  className: "cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uC77C\uCE58\uD558\uB294 \uC5B8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
                }) : A.map((M, E) => {
                  const D = M.value === m, I = E === u;
                  return l.jsx("li", {
                    role: "presentation",
                    children: l.jsxs("button", {
                      type: "button",
                      role: "option",
                      "aria-selected": D,
                      "data-highlighted": I ? "true" : "false",
                      className: _d,
                      onMouseEnter: () => h(E),
                      onMouseDown: (H) => H.preventDefault(),
                      onClick: () => _(M.value),
                      children: [
                        D ? l.jsx("span", {
                          className: "absolute left-1.5 inline-flex items-center",
                          children: l.jsx(uo, {
                            size: 12,
                            "aria-hidden": true
                          })
                        }) : null,
                        M.custom ? l.jsxs("span", {
                          children: [
                            "\uC0AC\uC6A9: ",
                            l.jsx("span", {
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
  function Fd({ language: e, collapsed: t, copied: n, editable: r, onCopy: a, onToggleCollapse: o, onLanguageChange: s, extra: c }) {
    return l.jsxs("div", {
      className: "haim-code-block__header",
      children: [
        r && s ? l.jsx(zd, {
          language: e,
          onChange: s
        }) : l.jsx("span", {
          className: "haim-code-block__lang",
          children: e || "plain"
        }),
        l.jsxs("div", {
          className: "haim-code-block__actions",
          children: [
            c,
            l.jsx(wr, {
              label: n ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC",
              active: n,
              onClick: a,
              children: n ? l.jsx(uo, {
                size: 14,
                "aria-hidden": true
              }) : l.jsx(ar, {
                size: 14,
                "aria-hidden": true
              })
            }),
            l.jsx(wr, {
              label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30",
              expanded: !t,
              onClick: o,
              children: t ? l.jsx(fo, {
                size: 14,
                "aria-hidden": true
              }) : l.jsx(cl, {
                size: 14,
                "aria-hidden": true
              })
            })
          ]
        })
      ]
    });
  }
  function Kd({ node: e, editor: t, selected: n, updateAttributes: r }) {
    const a = String(e.attrs.language || ""), o = Ya(a), s = e.textContent || "", [c, u] = p.useState(null), [h, d] = p.useState(false), [m, g] = p.useState(false), [x, y] = p.useState(false), [k, v] = p.useState(false), A = t.isEditable, _ = p.useRef(null);
    p.useEffect(() => {
      var _a2;
      if (!o || m || x) return;
      let I = false;
      const H = Bd(((_a2 = t.view) == null ? void 0 : _a2.dom) ?? null);
      return zl(s, H).then((G) => {
        I || (G ? (u(G), d(false)) : (u(null), d(!!s.trim())));
      }), () => {
        I = true;
      };
    }, [
      o,
      m,
      x,
      s,
      t
    ]);
    const N = p.useCallback(() => {
      var _a2;
      const I = s, H = () => {
        v(true), window.setTimeout(() => v(false), 1500);
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
      s
    ]), M = p.useCallback((I) => {
      r({
        language: I
      }), Ya(I) || (g(false), u(null), d(false));
    }, [
      r
    ]), E = l.jsx("pre", {
      className: "haim-mermaid-block__source-hidden",
      "aria-hidden": true,
      children: l.jsx(ra, {
        as: "code"
      })
    }), D = l.jsx(Fd, {
      language: a,
      collapsed: x,
      copied: k,
      editable: A,
      onCopy: N,
      onToggleCollapse: () => y((I) => !I),
      ...A ? {
        onLanguageChange: M
      } : {},
      extra: o && A && !x ? l.jsx(wr, {
        label: m || h ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1",
        onClick: () => g((I) => !I),
        children: m || h ? l.jsx(Cr, {
          size: 14,
          "aria-hidden": true
        }) : l.jsx(co, {
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
            A && g(true);
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
            o && h ? l.jsx("div", {
              className: "haim-mermaid-block__error",
              children: "Mermaid \uB80C\uB354 \uC2E4\uD328"
            }) : null,
            l.jsxs("div", {
              className: "haim-code-block__body",
              children: [
                l.jsx(Io, {
                  text: s,
                  className: "haim-code-block__line-numbers",
                  contentRootRef: _
                }),
                l.jsx("pre", {
                  ref: _,
                  className: a ? `language-${a}` : void 0,
                  children: l.jsx(ra, {
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
  zf = function(e, t) {
    const { state: n } = e;
    n.selection;
    let r = n.tr, a = false;
    return n.doc.descendants((o, s) => {
      if (o.type.name !== "codeBlock") return;
      const c = o.textContent, u = gn(c);
      if (u === c) return;
      const h = s + 1, d = s + o.nodeSize - 1;
      r = r.insertText(u, r.mapping.map(h), r.mapping.map(d)), a = true;
    }), a ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
  };
  const Wd = new Ne("haimTrimCodeEdges");
  function qd() {
    return new Ie({
      key: Wd,
      appendTransaction(e, t, n) {
        if (!e.some((v) => v.selectionSet || v.docChanged) || e.some((v) => v.getMeta("haimTrimCodeEdges"))) return null;
        const r = t.selection.$from, a = n.selection.$from, o = r.parent.type.name === "codeBlock", s = a.parent.type.name === "codeBlock";
        if (!o || s) return null;
        const c = r.depth, u = r.node(c), h = r.before(c);
        if (u.type.name !== "codeBlock") return null;
        const d = u.textContent, m = gn(d);
        if (m === d) return null;
        const g = h + 1, x = h + u.nodeSize - 1;
        let y = g, k = x;
        for (const v of e) y = v.mapping.map(y), k = v.mapping.map(k);
        return n.tr.insertText(m, y, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
      }
    });
  }
  const Ud = Fl(Kl), Vd = Ps.extend({
    priority: 1e3,
    addNodeView() {
      return st(Kd);
    },
    addKeyboardShortcuts() {
      var _a2;
      return {
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {},
        Enter: ({ editor: t }) => Cd(t),
        "Shift-Enter": ({ editor: t }) => Sd(t),
        "Mod-/": ({ editor: t }) => Hd(t)
      };
    },
    addProseMirrorPlugins() {
      var _a2;
      return [
        ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [],
        qd(),
        md(),
        Ld()
      ];
    }
  }).configure({
    lowlight: Ud,
    languageClassPrefix: "language-",
    enableTabIndentation: false,
    exitOnTripleEnter: false
  }), er = "&nbsp;", tr = "\xA0", Xd = $s.extend({
    parseMarkdown: (e, t) => {
      var _a2;
      const n = Array.isArray(e == null ? void 0 : e.tokens) ? e.tokens : [], r = t.parseInline(n), a = n.length === 1 ? n[0] : null;
      return (a == null ? void 0 : a.type) === "text" && (a.raw === er || a.text === er || a.raw === tr || a.text === tr) && r.length === 1 && ((_a2 = r[0]) == null ? void 0 : _a2.type) === "text" && (r[0].text === er || r[0].text === tr) ? t.createNode("paragraph", void 0, []) : t.createNode("paragraph", void 0, r);
    },
    renderMarkdown: (e, t) => {
      if (!e) return "";
      const n = Array.isArray(e.content) ? e.content : [];
      return n.length === 0 ? "" : t.renderChildren(n);
    }
  }), Yd = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
  Ff = function(e) {
    const t = typeof e == "string" ? e : "", n = Yd.exec(t);
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
  Qd = function(e, t) {
    return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
  };
  const Gd = 3;
  function rn(e) {
    let t = 0;
    for (let n = 0; n < e.length; n += 1) e.charCodeAt(n) === 10 && (t += 1);
    return t;
  }
  function zo(e) {
    const t = [
      0
    ];
    for (let n = 0; n < e.length; n += 1) e.charCodeAt(n) === 10 && t.push(n + 1);
    return (n) => {
      const r = Math.min(Math.max(0, n), e.length);
      let a = 0, o = t.length - 1;
      for (; a < o; ) {
        const s = a + o + 1 >> 1;
        (t[s] ?? 0) <= r ? a = s : o = s - 1;
      }
      return a;
    };
  }
  function Zd(e, t) {
    return zo(e)(t);
  }
  function Jd(e) {
    if (!e) return 0;
    const t = "\0", n = Qd(e, t), r = n.indexOf(t);
    return r < 0 ? 0 : Zd(n, r);
  }
  function an(e, t) {
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
  function ef(e, t, n) {
    var _a2, _b;
    if (!t || !n || n.length === 0 || t.childCount !== e.childCount || n.length !== e.childCount) return false;
    for (let a = 0; a < e.childCount; a += 1) if (((_a2 = e.child(a)) == null ? void 0 : _a2.type.name) !== ((_b = t.child(a)) == null ? void 0 : _b.type.name)) return false;
    let r = 0;
    for (let a = 0; a < e.childCount; a += 1) if (e.child(a) !== t.child(a) && (r += 1, r > Gd)) return false;
    return true;
  }
  function tf(e, t, n, r) {
    const a = [];
    let o = 0, s = 0;
    return e.forEach((c, u) => {
      const h = t.child(s), d = n[s], m = u + c.nodeSize;
      if (!d || !h) {
        const k = an(r, c), v = rn(k);
        a.push({
          pos: u,
          to: m,
          line0: (d == null ? void 0 : d.line0) ?? 0,
          blockNewlines: v
        }), s += 1;
        return;
      }
      if (c.type.name === "noteCover") {
        a.push({
          pos: u,
          to: m,
          line0: 0,
          blockNewlines: 0
        }), s += 1;
        return;
      }
      if (c === h) {
        a.push({
          pos: u,
          to: m,
          line0: d.line0 + o,
          blockNewlines: d.blockNewlines
        }), s += 1;
        return;
      }
      const g = an(r, c), x = rn(g), y = typeof d.blockNewlines == "number" ? d.blockNewlines : rn(an(r, h));
      a.push({
        pos: u,
        to: m,
        line0: d.line0 + o,
        blockNewlines: x
      }), o += x - y, s += 1;
    }), a;
  }
  function nf(e, t, n) {
    const r = Jd(n);
    let a = "";
    try {
      a = t(e.toJSON());
    } catch {
      a = "";
    }
    const o = zo(a), s = [];
    let c = 0;
    return e.forEach((u, h) => {
      const d = h + u.nodeSize;
      if (u.type.name === "noteCover") {
        s.push({
          pos: h,
          to: d,
          line0: 0,
          blockNewlines: 0
        });
        return;
      }
      const m = an(t, u), g = rn(m);
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
      s.push({
        pos: h,
        to: d,
        line0: y,
        blockNewlines: g
      });
    }), s;
  }
  function rf(e, t, n, r, a) {
    return ef(e, r, a) && r && a ? tf(e, r, a, t) : nf(e, t, n);
  }
  function af(e) {
    return !e.enabled || !e.docChanged ? false : e.tipTapFocused;
  }
  function of(e) {
    var _a2;
    const n = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
    return !n || typeof n.serialize != "function" ? null : (r) => n.serialize(r);
  }
  function Qa(e) {
    return e.map((t) => Rs.Node(t.pos, t.to, {
      "data-line": String(t.line0)
    }));
  }
  const sf = ze.create({
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
          return o ? af({
            enabled: o,
            docChanged: a.docChanged,
            tipTapFocused: !!((_b = (_a2 = r.view) == null ? void 0 : _a2.hasFocus) == null ? void 0 : _b.call(_a2))
          }) ? false : a.docChanged : true;
        },
        create: ({ editor: r, state: a }) => {
          if (!t()) return n.lastDoc = null, n.lastEntries = [], [];
          const o = of(r);
          if (!o) return [];
          if (n.lastDoc === a.doc && n.lastEntries.length > 0) return Qa(n.lastEntries);
          const s = e() || "", c = rf(a.doc, o, s, n.lastDoc, n.lastEntries);
          return n.lastDoc = a.doc, n.lastEntries = c, Qa(c);
        }
      };
    }
  });
  function lf(e, t, n) {
    return new nr({
      find: e,
      handler: ({ state: r, range: a, match: o }) => {
        if (!n()) return null;
        let s = t, c = a.from;
        const u = a.to;
        if (o[1]) {
          const h = o[0].lastIndexOf(o[1]);
          s += o[0].slice(h + o[1].length), c += h;
          const d = c - u;
          d > 0 && (s = o[0].slice(h - d, h) + s, c = u);
        }
        r.tr.insertText(s, c, u);
      }
    });
  }
  const cf = [
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
  ], uf = ze.create({
    name: "haimTypography",
    addOptions() {
      return {
        initialRules: {
          ...ao
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
      return cf.map(({ find: e, replace: t, ruleId: n }) => lf(e, t, () => !!this.storage.rules[n]));
    }
  });
  Kf = function(e) {
    const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", a = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), o = (e == null ? void 0 : e.isSourceLineEnabled) ?? (() => true), s = (e == null ? void 0 : e.typographyRules) ?? ao, u = [
      r ? aa.configure({
        heading: false,
        paragraph: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        listKeymap: false,
        link: false,
        trailingNode: false
      }) : aa.configure({
        heading: false,
        paragraph: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        listKeymap: false,
        link: false,
        trailingNode: false
      }),
      Pu.configure({
        levels: [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }),
      Xd,
      Oc,
      sf.configure({
        getMetaPrefix: a,
        isEnabled: o
      }),
      Rc,
      Fs.extend({
        parseHTML() {
          return [
            {
              tag: "img[src]:not([data-wiki-path])"
            }
          ];
        },
        addNodeView() {
          return st(Tc);
        }
      }).configure({
        inline: true,
        allowBase64: true
      }),
      Ks.configure({
        taskItem: false,
        taskList: false,
        orderedList: false
      }),
      Kc,
      Uc.configure({
        nested: true
      }),
      Xc,
      Ws.configure({
        table: {
          resizable: r
        }
      }),
      Ds,
      qs.configure({
        types: [
          "heading",
          "paragraph"
        ]
      }),
      Us.configure({
        multicolor: true
      }),
      ...r ? [
        Vd
      ] : [],
      Hs,
      Bs,
      uf.configure({
        initialRules: s
      }),
      Vs.configure({
        placeholder: t,
        ...r ? {} : {
          showOnlyCurrent: false
        }
      }),
      Os,
      Xs.configure({
        className: "haim-node-focused"
      }),
      _s,
      zs,
      sd,
      id,
      eu,
      au,
      su,
      ou,
      ...r ? [
        iu
      ] : [],
      ju,
      Eu,
      rd,
      zu,
      Wu,
      Zu,
      nd,
      ...r ? [
        Bu
      ] : []
    ];
    return r ? [
      ...u,
      Ys,
      Js.configure({
        controls: true,
        nocookie: true
      }),
      ei.configure({
        persist: true
      }),
      Qs,
      Gs,
      Qc,
      Zs,
      ti.configure({
        injectCSS: true,
        visible: false
      }),
      ni.configure({
        types: [
          "heading",
          "paragraph"
        ]
      }),
      ri.configure({
        getIndex: ai
      }),
      Zc
    ] : u;
  };
  const Rt = /* @__PURE__ */ new WeakMap();
  df = function(e) {
    if (!e) return "";
    const t = e.state.doc, n = Rt.get(e);
    if (n && n.doc === t) return n.markdown;
    const r = e, a = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
    return Rt.set(e, {
      doc: t,
      markdown: a
    }), a;
  };
  Wf = function(e, t, n) {
    if (!e) return n("");
    const r = e.state.doc, a = Rt.get(e);
    if (a && a.doc === r && a.vaultPrefix === t && a.vaultMarkdown != null) return a.vaultMarkdown;
    const o = df(e), s = n(o), c = Rt.get(e);
    return c && c.doc === r && (c.vaultPrefix = t, c.vaultMarkdown = s), s;
  };
  qf = function(e) {
    e && Rt.delete(e);
  };
});
export {
  mn as C,
  Su as H,
  __tla,
  Wf as a,
  Ao as b,
  Kf as c,
  ud as d,
  kr as e,
  xd as f,
  df as g,
  pc as h,
  qf as i,
  Qd as j,
  _f as k,
  Cu as l,
  $f as m,
  Of as n,
  Ta as o,
  yu as p,
  Df as q,
  Hf as r,
  Ff as s,
  zf as t,
  vo as u,
  Co as v,
  Bf as w,
  Rf as x
};
