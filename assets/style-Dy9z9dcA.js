import { c as me, s as Qa, d as ge, P as ft, e as qe, g as Ga, M as Ja, f as Za, I as wn, r as es, h as mn, i as ts, j as ns, p as ur, k as rs, l as Ee, n as as, o as ss, T as _, N as Ur, R as Ue, q as pt, t as os, v as is, B as ls, w as cs, x as dr, C as us, y as ds, z as hs, A as hr, F as fs, G as ps, H as ms, J as gs, S as xs, K as bs, L as ks, O as ws, Q as ys, U as Ss, V as Cs, W as vs, X as js, Y as Ms, Z as Es, _ as Ls, $ as Ts, a0 as Ns, a1 as Is, a2 as As, a3 as $s, a4 as Ps, a5 as Hs, a6 as Ds, a7 as Bs } from "./vendor-tiptap-Dthoom2y.js";
import { r as f, j as o, c as Rs, a as zs } from "./vendor-react-BDjpSibw.js";
import { A as gn, m as Oe } from "./vendor-motion-Dw-WnPM7.js";
import { t as Os, O as _s } from "./index-De3wkM3r.js";
import { c as Fs, n as _e, ae as Ks, C as Ws, j as qs, eL as Vr, i6 as Xr, ho as Us, ed as It, a9 as Hn, i7 as Vs, i8 as Yr, hC as fr, u as Xs, aZ as Qr, i9 as Ys, ia as Qs, ib as Gr } from "./index-C06N9xtj.js";
import { g as Gs } from "./Kbd-zJP-p1De.js";
import { t as yn, b4 as Js, P as Zs, b5 as eo, b6 as to, b7 as no, v as ro, aD as pr, z as mr, U as Jr, R as Zr, T as ao, b8 as so, ag as oo, o as io, w as lo, b9 as co, X as uo, B as ho, I as fo, c as po, d as mo, h as go, aI as xo, aJ as bo, e as ko, f as wo, g as gr, Q as yo, aV as So, i as xr, aN as Co, aO as vo, aP as jo, aQ as Mo, Y as Mt, aR as Eo, aS as st, aF as Lo, S as To, aT as No, n as ea, aU as Io, aX as Ao, aK as $o, aL as Po, aM as Ho, ba as Do, bb as Bo, bc as Ro, E as ta, bd as na, y as ra, an as zo, k as aa, j as Oo } from "./vendor-lucide-CJAxREEr.js";
import { N as _o, O as Fo, Q as Ko, U as Wo, V as qo, W as Uo, y as ot, z as it, B as xn, E as lt, G as ct, H as ut, K as ve, M as je, h as ht, i as Pt, j as Ht, k as Dt, l as Bt, A as Rt, R as Vo, T as Xo, P as Yo, C as Qo } from "./vendor-radix-DuLpLUUM.js";
import { b as dt, c as Nt, d as br, e as sa, a as Go, s as Jo, f as Zo } from "./taskCheckboxStatus-DlXLsCJg.js";
import { W as ei } from "./WikiImageSizeModal-DHM7sGiM.js";
import { c as ti, f as ni } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as ri } from "./toHtml-BNcY1vUf.js";
import { k as ai } from "./vendor-katex-NqpuB_gR.js";
import { r as si, l as oi, g as ii, h as li, i as ci, j as ui, k as di, m as hi } from "./haimCodeBlockLanguages-C4u7NjrS.js";
import { c as fi } from "./lazyMermaid-CFU1x6wk.js";
import { c as pi, g as mi } from "./vendor-highlight-Cy0EGwO-.js";
function gi() {
  var _a;
  return typeof navigator > "u" ? false : !!((_a = navigator.ink) == null ? void 0 : _a.requestPresenter);
}
async function xi(e) {
  const t = navigator.ink;
  if (!(t == null ? void 0 : t.requestPresenter)) return null;
  try {
    return await t.requestPresenter({ presentationArea: e });
  } catch {
    return null;
  }
}
async function bi(e) {
  const { src: t, inkCanvas: n, highlightCanvas: r } = e, a = await ki(t), i = ("width" in a, a.width), l = ("height" in a, a.height), c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(i)), c.height = Math.max(1, Math.round(l));
  const h = c.getContext("2d");
  if (!h) throw new Error("Canvas 2D unavailable");
  if (h.imageSmoothingEnabled = true, h.imageSmoothingQuality = "high", h.drawImage(a, 0, 0, c.width, c.height), n && n.width > 0 && n.height > 0 && h.drawImage(n, 0, 0, c.width, c.height), r && r.width > 0 && r.height > 0 && h.drawImage(r, 0, 0, c.width, c.height), "close" in a && typeof a.close == "function") try {
    a.close();
  } catch {
  }
  const p = await new Promise((d) => {
    c.toBlob((g) => d(g), "image/png");
  });
  if (!p) throw new Error("Failed to encode PNG");
  return p;
}
async function ki(e) {
  try {
    const t = await fetch(e, { mode: "cors", credentials: "omit" });
    if (!t.ok) throw new Error(`fetch ${t.status}`);
    const n = await t.blob();
    return await createImageBitmap(n);
  } catch {
    return await wi(e);
  }
}
function wi(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(new Error("Image load failed for composite")), r.src = e;
  });
}
function zt(e) {
  return Math.max(e.diameterX, e.diameterY);
}
function oa(e) {
  return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
}
function yi(e, t) {
  return !(t >= 8) || !(e >= 1) ? 1 : K(e / t, 0.25, 12);
}
function kr(e, t, n) {
  const r = Math.max(4, Math.min(96, Math.min(t, n) * 0.08));
  return K(e, 0.5, r);
}
function ia(e, t) {
  if (e.length < 2) return 0;
  const n = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
  if (n === r) {
    const l = e[Math.max(0, t - 1)], c = e[t];
    return Math.atan2(c.y - l.y, c.x - l.x);
  }
  const a = e[n], i = e[r];
  return Math.atan2(i.y - a.y, i.x - a.x);
}
function la(e, t) {
  if (e.length === 0) return [];
  const n = e[0];
  if (!n) return [];
  const r = Math.max(0.5, t), a = [{ ...n }];
  let i = 0;
  for (let l = 1; l < e.length; l += 1) {
    const c = e[l - 1], h = e[l], p = Math.hypot(h.x - c.x, h.y - c.y);
    if (p < 1e-6) continue;
    let d = 0;
    for (; i + (p - d) >= r; ) {
      const g = r - i, m = (d + g) / p;
      a.push({ x: c.x + (h.x - c.x) * m, y: c.y + (h.y - c.y) * m, pressure: c.pressure + (h.pressure - c.pressure) * m }), d += g, i = 0;
    }
    i += p - d;
  }
  return a;
}
const Si = [{ value: "300", label: "Light 300" }, { value: "400", label: "Regular 400" }, { value: "500", label: "Medium 500" }, { value: "600", label: "Semibold 600" }, { value: "700", label: "Bold 700" }, { value: "800", label: "ExtraBold 800" }], Ci = [{ value: "multiply", label: "Multiply" }, { value: "overlay", label: "Overlay" }, { value: "soft-light", label: "Soft light" }, { value: "screen", label: "Screen" }, { value: "darken", label: "Darken" }, { value: "lighten", label: "Lighten" }, { value: "color-burn", label: "Color burn" }, { value: "normal", label: "Normal" }];
function K(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
const ca = 0.92, wr = 0.35;
function vi(e, t) {
  const n = e.x - t.x, r = e.y - t.y;
  return n * n + r * r;
}
function ua(e, t, n = ca) {
  const r = K(n, 0.05, 1);
  return { x: e.x + (t.x - e.x) * r, y: e.y + (t.y - e.y) * r, pressure: e.pressure + (t.pressure - e.pressure) * r };
}
function ji(e, t, n, r = ca) {
  let a = t;
  const i = wr * wr;
  for (const l of n) {
    a = ua(a, l, r);
    const c = e[e.length - 1];
    !c || vi(c, a) >= i ? e.push({ ...a }) : (c.x = a.x, c.y = a.y, c.pressure = a.pressure);
  }
  return a;
}
function Mi(e) {
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
    const a = e[r === 0 ? 0 : r - 1], i = e[r], l = e[r + 1], c = e[r + 2 < e.length ? r + 2 : r + 1], h = i.x + (l.x - a.x) / 6, p = i.y + (l.y - a.y) / 6, d = l.x - (c.x - i.x) / 6, g = l.y - (c.y - i.y) / 6;
    n += ` C ${h} ${p} ${d} ${g} ${l.x} ${l.y}`;
  }
  return n;
}
function Sn(e) {
  if (e.dash !== "dashed") return;
  const t = zt(e), n = Math.max(2, t * 1.2);
  return `${Math.max(2, t * 2.2)} ${n}`;
}
function Cn(e) {
  return e === "square" ? "square" : "round";
}
function vn(e) {
  return e === "square" ? "miter" : "round";
}
function Ei(e) {
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
function yr(e, t, n) {
  e.lineCap = Cn(t.shape), e.lineJoin = vn(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, n), e.globalAlpha = K(t.opacity, 0.02, 1);
  const r = Sn(t);
  r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
}
function Li(e, t, n, r, a = 1) {
  const i = Math.max(0.25, t.diameterX * a / 2), l = Math.max(0.25, t.diameterY * a / 2);
  e.save(), e.translate(n.x, n.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-i, -l, i * 2, l * 2) : e.ellipse(0, 0, i, l, 0, 0, Math.PI * 2), e.fill(), e.restore();
}
function da(e, t) {
  if (t.points.length < 1) return;
  if (e.globalAlpha = K(t.opacity, 0.02, 1), oa(t)) {
    const a = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), i = la(t.points, a);
    for (let l = 0; l < i.length; l += 1) {
      const c = i[l], h = Math.min(t.points.length - 1, Math.round(l / Math.max(1, i.length - 1) * (t.points.length - 1))), p = ia(t.points, h), d = t.kind === "pressure" ? c.pressure : 1;
      Li(e, t, c, p, d);
    }
    return;
  }
  const n = zt(t);
  if (t.kind === "pressure" && t.points.length >= 2) {
    for (let a = 1; a < t.points.length; a += 1) {
      const i = t.points[a - 1], l = t.points[a], c = Math.max(0.5, n * ((i.pressure + l.pressure) / 2));
      yr(e, t, c), e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(l.x, l.y), e.stroke();
    }
    return;
  }
  yr(e, t, n), e.beginPath();
  const r = t.points[0];
  if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
  else for (let a = 1; a < t.points.length; a += 1) {
    const i = t.points[a];
    e.lineTo(i.x, i.y);
  }
  e.stroke();
}
function Ti(e, t, n) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const a = r.getContext("2d");
  if (!a) return r;
  a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
  for (const i of n) a.save(), i.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = "source-over", a.strokeStyle = i.color), da(a, i), a.restore();
  return r;
}
function Ni(e, t, n) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const a = r.getContext("2d");
  if (!a) return r;
  a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
  for (const i of n) a.save(), i.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = Ei(i.blend), a.strokeStyle = i.color), da(a, i), a.restore();
  return r;
}
function Ii(e, t, n) {
  var _a;
  e.textBaseline = "top", e.textAlign = "left";
  for (const r of t) {
    const a = r.text ?? "";
    if (!a.trim() && a.length === 0) continue;
    const i = Math.max(1, r.fontSizePx * Math.max(1e-3, n));
    e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = K(r.opacity, 0.02, 1), e.fillStyle = r.color;
    const l = ((_a = r.fontFamily) == null ? void 0 : _a.trim()) || "sans-serif";
    e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${i}px ${l}`;
    const c = i * 1.3, h = a.split(`
`);
    for (let p = 0; p < h.length; p += 1) e.fillText(h[p] ?? "", r.x, r.y + p * c);
    e.restore();
  }
}
const Sr = 8192;
function Ai(e) {
  const t = Math.max(1, e.clientWidth), n = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, a = e.naturalHeight > 0 ? e.naturalHeight : n, i = Math.min(3, window.devicePixelRatio || 1);
  let l = Math.max(r, Math.round(t * i)), c = Math.max(a, Math.round(n * i));
  const h = Math.max(l, c);
  if (h > Sr) {
    const p = Sr / h;
    l = Math.max(1, Math.round(l * p)), c = Math.max(1, Math.round(c * p));
  }
  return { bufW: l, bufH: c, cssW: t, cssH: n };
}
let At = null;
function au(e) {
  At = e;
}
function $i() {
  return typeof At == "function";
}
async function ha(e) {
  var _a;
  if (!At) throw new Error("Image upload is not available");
  const n = (_a = (await At([e]))[0]) == null ? void 0 : _a.trim();
  if (!n) throw new Error("Upload returned no path");
  return n;
}
function su(e) {
  return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}
const Dn = [0.22, 1, 0.36, 1], Pi = { duration: 0.2, ease: Dn }, Hi = { duration: 0.28, ease: Dn }, Et = 0.5, Lt = 8, Fe = 1.25, Di = 2, Se = 0.5, Me = 128, Bi = 4e3, fa = 450, Ri = ["#111827", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"], zi = ["#facc15", "#f472b6", "#38bdf8", "#4ade80", "#fb923c"], Oi = { backgroundColor: "#ffffff", backgroundImage: ["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)", "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","), backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" };
function Ke(e) {
  return Math.round(e * 10) / 10;
}
function _i(e) {
  return Math.max(0.1, Ke(e / 10));
}
function Cr(e, t) {
  return Ke(K(e + t * _i(e), Se, Me));
}
const jn = 8, Mn = 400;
function Fi() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", t = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
}
const pa = Fi(), pe = Gs(), vr = pa ? `${pe}+Shift+Z` : `${pe}+Y`;
function Ki(e, t) {
  const n = Math.max(1, Math.round(e / 10));
  return K(Math.round(e + t * n), jn, Mn);
}
function Wi(e, t) {
  if (!t) return 1;
  const n = e.pressure;
  return typeof n != "number" || Number.isNaN(n) || e.pointerType === "mouse" ? 0.5 : K(n || 0.05, 0.05, 1);
}
function X({ label: e, active: t = false, disabled: n = false, tone: r = "default", onClick: a, children: i }) {
  const l = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
  return o.jsxs(Pt, { children: [o.jsx(Ht, { asChild: true, children: o.jsx("button", { type: "button", "aria-label": e, disabled: n, onClick: a, className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${l}`, children: i }) }), o.jsx(Dt, { children: o.jsxs(Bt, { side: "top", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [e, o.jsx(Rt, { className: "fill-neutral-900" })] }) })] });
}
const qi = { backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" };
function jr({ size: e = 16 }) {
  return o.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: o.jsx("path", { d: "M2 8h12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function Mr({ size: e = 16 }) {
  return o.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: o.jsx("path", { d: "M2 8h3M7 8h3M12 8h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function he({ stroke: e, fading: t = false }) {
  const n = e.kind === "eraser", r = n ? "#000" : e.color, a = n ? 1 : e.opacity, i = t ? { opacity: 0, transition: `opacity ${fa}ms ease-out` } : { opacity: a };
  if (oa(e)) {
    const h = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), p = la(e.points, h);
    return o.jsx("g", { style: i, children: p.map((d, g) => {
      const m = Math.min(e.points.length - 1, Math.round(g / Math.max(1, p.length - 1) * (e.points.length - 1))), x = ia(e.points, m) * 180 / Math.PI, C = e.kind === "pressure" ? d.pressure : 1, k = Math.max(0.25, e.diameterX * C / 2), v = Math.max(0.25, e.diameterY * C / 2);
      return e.shape === "square" ? o.jsx("rect", { x: -k, y: -v, width: k * 2, height: v * 2, fill: r, transform: `translate(${d.x} ${d.y}) rotate(${x})` }, `${e.id}-st-${g}`) : o.jsx("ellipse", { cx: 0, cy: 0, rx: k, ry: v, fill: r, transform: `translate(${d.x} ${d.y}) rotate(${x})` }, `${e.id}-st-${g}`);
    }) });
  }
  const l = zt(e);
  if (e.kind === "pressure" && e.points.length >= 2) return o.jsx("g", { style: i, children: e.points.slice(1).map((h, p) => {
    const d = e.points[p], g = Math.max(0.5, l * ((d.pressure + h.pressure) / 2));
    return o.jsx("path", { d: `M ${d.x} ${d.y} L ${h.x} ${h.y}`, fill: "none", stroke: r, strokeWidth: g, strokeLinecap: Cn(e.shape), strokeLinejoin: vn(e.shape), strokeMiterlimit: 2, strokeDasharray: Sn({ ...e, diameterX: g, diameterY: g }), style: { fill: "none" } }, `${e.id}-p-${p}`);
  }) });
  const c = Mi(e.points);
  return c ? o.jsx("path", { d: c, fill: "none", stroke: r, strokeWidth: l, strokeLinecap: Cn(e.shape), strokeLinejoin: vn(e.shape), strokeMiterlimit: 2, strokeDasharray: Sn(e), style: { ...i, fill: "none" } }) : null;
}
function ma({ src: e, alt: t = "", open: n, onClose: r, onSaveAnnotated: a }) {
  const i = !!(n && e), [l, c] = f.useState(1), [h, p] = f.useState({ x: 0, y: 0 }), [d, g] = f.useState("pan"), [m, x] = f.useState("#111827ff"), [C, k] = f.useState("#facc15ff"), [v, T] = f.useState(4), [z, I] = f.useState(4), [w, N] = f.useState(1), [O, A] = f.useState(0.45), [P, U] = f.useState("multiply"), [ie, Ae] = f.useState("circle"), [ee, E] = f.useState("solid"), [L, D] = f.useState([]), [H, F] = f.useState([]), [V, le] = f.useState([]), [ae, Y] = f.useState([]), [q, te] = f.useState(null), [ne, Q] = f.useState(null), [ue, ce] = f.useState("Paperozi, sans-serif"), [xe, G] = f.useState(24), [re, mt] = f.useState("400"), [$e, Kt] = f.useState("normal"), [La, Wt] = f.useState(() => /* @__PURE__ */ new Set()), [J, Ce] = f.useState(null), [qt, Ut] = f.useState(false), [Ta, be] = f.useState([]), [B, Na] = f.useState({ w: 1, h: 1 }), [gt, xt] = f.useState(null), [Ia, Vt] = f.useState(false), [Ve, zn] = f.useState(false), [On, Xt] = f.useState(null), [Yt, Qt] = f.useState(false), [Gt, _n] = f.useState(false), [Jt, Xe] = f.useState(false), Zt = f.useRef({ w: 4, h: 4 }), bt = f.useRef(null), en = f.useRef(null), kt = f.useRef(null), Le = f.useRef(null), Fn = f.useRef([]), Kn = f.useRef([]), Ye = f.useRef([]), ke = f.useRef(null), we = f.useRef(null), tn = f.useRef(null), Wn = f.useRef(null), nn = f.useRef(0), ye = f.useRef(null), rn = f.useRef(null), Pe = f.useRef(null), Qe = f.useRef(null), wt = f.useRef(null), Te = f.useRef(null), yt = f.useRef(1), qn = f.useRef(l), Un = f.useRef(0), He = f.useRef(/* @__PURE__ */ new Map()), an = f.useRef([]), Ge = f.useRef(null);
  Fn.current = L, Kn.current = H, Ye.current = ae, qn.current = l;
  const Vn = !!a && $i() && (L.length > 0 || H.length > 0 || ae.some((s) => s.text.trim().length > 0)), Je = ae.find((s) => s.id === q) ?? null, Ze = d === "highlighter" ? C : m, Aa = d === "highlighter" ? O : w, et = f.useCallback(() => {
    c(1), p({ x: 0, y: 0 });
  }, []), St = f.useCallback(() => {
    for (const s of He.current.values()) clearTimeout(s);
    He.current.clear();
  }, []), sn = f.useCallback(() => {
    D([]), F([]), le([]), Y([]), te(null), Q(null), Wt(/* @__PURE__ */ new Set()), be([]), an.current = [], Ce(null), Ut(false), ke.current = null, we.current = null, nn.current = 0;
    const s = Wn.current, u = tn.current;
    s && u && s.clearRect(0, 0, u.width, u.height), ye.current != null && (cancelAnimationFrame(ye.current), ye.current = null), Qe.current = null, St();
  }, [St]), on = f.useRef(false);
  f.useEffect(() => {
    if (!i) {
      on.current = false;
      return;
    }
    const s = !on.current;
    on.current = true, s && (et(), sn(), g("pan"), Xt(null), xt(null));
  }, [i, e, et, sn]), f.useEffect(() => {
    var _a2;
    i || (Xe(false), St(), (_a2 = Ge.current) == null ? void 0 : _a2.call(Ge), Ge.current = null);
  }, [i, St]);
  const De = f.useCallback(() => {
    const s = en.current;
    if (!s) return;
    const { bufW: u, bufH: b, cssW: S } = Ai(s);
    S < 8 || s.clientHeight < 8 || (yt.current = yi(u, S), Na({ w: u, h: b }));
  }, []);
  f.useEffect(() => {
    if (!i) return;
    De();
    const s = en.current;
    if (!s) return;
    const u = () => De();
    s.addEventListener("load", u);
    const b = typeof ResizeObserver < "u" ? new ResizeObserver(De) : null;
    return b == null ? void 0 : b.observe(s), window.addEventListener("resize", De), () => {
      s.removeEventListener("load", u), b == null ? void 0 : b.disconnect(), window.removeEventListener("resize", De);
    };
  }, [i, e, De]), f.useEffect(() => {
    if (!i) {
      Le.current = null, Vt(false);
      return;
    }
    let s = false;
    const u = kt.current;
    if (!u || !gi()) {
      Vt(false);
      return;
    }
    return xi(u).then((b) => {
      s || (Le.current = b, Vt(!!b));
    }), () => {
      s = true, Le.current = null;
    };
  }, [i, e, B.w]);
  const Be = f.useCallback((s, u, b) => {
    const S = bt.current;
    if (!S) {
      c(K(s, Et, Lt));
      return;
    }
    const j = S.getBoundingClientRect(), y = u - j.left - j.width / 2, M = b - j.top - j.height / 2;
    c((R) => {
      const Z = K(s, Et, Lt), de = Z / R;
      return p((oe) => ({ x: y - (y - oe.x) * de, y: M - (M - oe.y) * de })), Z;
    });
  }, []), $a = f.useCallback((s) => {
    var _a2;
    if ((_a2 = Ge.current) == null ? void 0 : _a2.call(Ge), Ge.current = null, bt.current = s, !s) return;
    const u = (b) => {
      b.preventDefault(), b.stopPropagation();
      const S = b.deltaY > 0 ? 1 / Fe : Fe;
      Be(qn.current * S, b.clientX, b.clientY);
    };
    s.addEventListener("wheel", u, { passive: false, capture: true }), Ge.current = () => {
      s.removeEventListener("wheel", u, true);
    };
  }, [Be]), Pa = f.useCallback((s) => {
    if (s.preventDefault(), s.stopPropagation(), l > 1.05) {
      et();
      return;
    }
    Be(Di, s.clientX, s.clientY);
  }, [l, et, Be]), tt = f.useCallback((s, u) => {
    const b = kt.current;
    if (!b) return null;
    const S = b.getBoundingClientRect();
    return S.width < 1 || S.height < 1 ? null : { x: (s.clientX - S.left) / S.width * B.w, y: (s.clientY - S.top) / S.height * B.h, pressure: Wi(s, u) };
  }, [B.w, B.h]), ln = f.useCallback((s) => {
    const u = s === "laser" ? 0.75 : 1, b = s === "highlighter" ? 4 : s === "laser" ? 2 : Se;
    if (s === "highlighter") return { w: Math.max(b, v * u), h: Math.max(b, z * u) };
    const S = Math.max(b, v * u);
    return { w: S, h: S };
  }, [v, z]);
  f.useEffect(() => {
    d !== "eraser" && (d === "pen" || d === "pressure" || d === "highlighter" || d === "laser") && (Zt.current = { w: v, h: z });
  }, [d, v, z]);
  const Xn = f.useCallback(() => {
    const s = Zt.current;
    T(s.w), I(s.h);
  }, []), Yn = f.useCallback(() => {
    const s = Zt.current, u = Math.max(s.w, s.h), b = Ke(K(u * 5, Se, Me));
    T(b), I(b), g("eraser");
  }, []), se = f.useCallback((s) => {
    if (d === "eraser" && s !== "eraser" && Xn(), s === "eraser") {
      Yn();
      return;
    }
    if (s === "highlighter") {
      g("highlighter"), E("solid"), Ae("square");
      return;
    }
    g(s);
  }, [d, Xn, Yn]), Qn = f.useCallback((s) => {
    var _a2, _b;
    s.preventDefault(), s.stopPropagation(), (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId), Te.current = { pointerId: s.pointerId, startX: s.clientX, startY: s.clientY, originX: h.x, originY: h.y };
  }, [h.x, h.y]), Gn = f.useCallback((s) => {
    const u = Te.current;
    !u || u.pointerId !== s.pointerId || (s.preventDefault(), p({ x: u.originX + (s.clientX - u.startX), y: u.originY + (s.clientY - u.startY) }));
  }, []), Jn = f.useCallback((s) => {
    var _a2, _b;
    const u = Te.current;
    if (!(!u || u.pointerId !== s.pointerId)) {
      Te.current = null;
      try {
        (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
      } catch {
      }
    }
  }, []), Re = f.useCallback((s) => {
    const u = He.current.get(s);
    u && clearTimeout(u);
    const b = setTimeout(() => {
      Wt((j) => {
        const y = new Set(j);
        return y.add(s), y;
      });
      const S = setTimeout(() => {
        He.current.delete(s), Wt((j) => {
          const y = new Set(j);
          return y.delete(s), y;
        }), le((j) => j.filter((y) => y.id !== s));
      }, fa);
      He.current.set(s, S);
    }, Bi);
    He.current.set(s, b);
  }, []), Ne = f.useCallback(() => {
    const s = tn.current, u = Wn.current ?? (s == null ? void 0 : s.getContext("2d"));
    s && u && u.clearRect(0, 0, s.width, s.height), nn.current = 0;
  }, []), cn = f.useCallback(() => {
    ye.current == null && (ye.current = requestAnimationFrame(() => {
      ye.current = null;
      const s = ke.current;
      if (!s) {
        Ce(null);
        return;
      }
      Ce({ ...s, points: s.points.slice() });
    }));
  }, []), ze = f.useCallback((s, u) => {
    const b = s.nativeEvent, S = typeof b.getCoalescedEvents == "function" ? b.getCoalescedEvents() : [], j = S.length > 0 ? S : [b], y = [];
    for (const M of j) {
      const R = tt(M, u);
      R && y.push(R);
    }
    if (y.length === 0) {
      const M = tt(s, u);
      M && y.push(M);
    }
    return y;
  }, [tt]), Zn = f.useCallback((s) => {
    var _a2, _b;
    if (d !== "pen" && d !== "pressure" && d !== "highlighter" && d !== "laser" && d !== "eraser") return;
    s.preventDefault(), s.stopPropagation();
    const b = ze(s, d === "pressure"), S = b[b.length - 1];
    if (!S) return;
    (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
    const j = d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen", y = j === "laser" ? "#ef4444" : j === "highlighter" ? C : j === "eraser" ? "#000000" : m, M = ln(j), R = K(yt.current, 0.25, 12), Z = kr(Math.max(0.5, M.w * R), B.w, B.h), de = kr(Math.max(0.5, M.h * R), B.w, B.h), oe = j === "eraser" ? 1 : j === "laser" ? 0.9 : j === "highlighter" ? O : w, W = { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, seq: ++Un.current, kind: j, color: y, diameterX: Z, diameterY: de, points: [S], shape: ie, dash: ee, opacity: oe, ...j === "highlighter" ? { blend: P } : {} };
    if (ke.current = W, we.current = { ...S }, Ut(true), nn.current = 0, Ce({ ...W, points: [...W.points] }), Ne(), j === "laser" && Re(W.id), (j === "pen" || j === "pressure") && Le.current && s.nativeEvent.isTrusted) try {
      const Ya = Math.max(M.w, M.h);
      Le.current.updateInkTrailStartPoint(s.nativeEvent, { color: m, diameter: Math.max(1, Ya * (j === "pressure" ? S.pressure : 1)) });
    } catch {
    }
  }, [d, m, C, O, w, P, ie, ee, ze, ln, Re, Ne, cn]), er = f.useCallback((s) => {
    const u = ke.current;
    if (!u) return;
    s.preventDefault();
    const b = u.kind === "pressure", S = ze(s, b);
    if (!S.length) return;
    const j = we.current ?? u.points[u.points.length - 1];
    if (j && (we.current = ji(u.points, j, S), cn(), u.kind === "laser" && Re(u.id), (u.kind === "pen" || u.kind === "pressure") && Le.current && s.nativeEvent.isTrusted)) try {
      const y = we.current, R = zt(u) / Math.max(1e-3, yt.current);
      Le.current.updateInkTrailStartPoint(s.nativeEvent, { color: u.color, diameter: Math.max(1, R * (u.kind === "pressure" ? (y == null ? void 0 : y.pressure) ?? 1 : 1)) });
    } catch {
    }
  }, [ze, cn, Re]), tr = f.useCallback((s) => {
    var _a2, _b;
    const u = ke.current;
    if (!u) return;
    const b = u.kind === "pressure", S = ze(s, b), j = S[S.length - 1];
    if (j && we.current) {
      const M = ua(we.current, j, 1), R = u.points[u.points.length - 1];
      !R || R.x !== M.x || R.y !== M.y ? u.points.push(M) : R.pressure = M.pressure, we.current = M;
    }
    ke.current = null, we.current = null, ye.current != null && (cancelAnimationFrame(ye.current), ye.current = null), Ut(false);
    try {
      (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
    } catch {
    }
    if (u.points.length === 0) {
      Ce(null), Ne();
      return;
    }
    const y = { ...u, points: [...u.points] };
    if (u.kind === "laser") {
      le((M) => [...M, y]), Re(u.id), Ce(null), Ne();
      return;
    }
    if (be([]), u.kind === "highlighter") F((M) => [...M, y]);
    else if (u.kind === "eraser") {
      D((M) => [...M, y]), F((M) => [...M, y]), Ce(null), Ne();
      return;
    } else D((M) => [...M, y]);
    Ce(null), Ne();
  }, [ze, Re, Ne]), Ct = f.useCallback((s) => {
    q && Y((u) => u.map((b) => b.id === q ? { ...b, ...s } : b));
  }, [q]), nr = f.useCallback((s) => {
    s.preventDefault(), s.stopPropagation();
    const u = tt(s, false);
    if (!u) return;
    const b = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, S = { id: b, seq: ++Un.current, x: u.x, y: u.y, text: "", color: m, opacity: w, fontSizePx: xe, fontFamily: ue, fontWeight: re, fontStyle: $e };
    be([]), Y((j) => [...j, S]), te(b), Q(b), window.setTimeout(() => {
      var _a2;
      return (_a2 = wt.current) == null ? void 0 : _a2.focus();
    }, 30);
  }, [tt, m, w, xe, ue, re, $e]), Ha = f.useCallback((s) => {
    if (s.button === 1 || d === "pan") {
      Qn(s);
      return;
    }
    if (d === "text") {
      Q(null), nr(s);
      return;
    }
    te(null), Q(null), Zn(s);
  }, [d, Qn, Zn, nr]), Da = f.useCallback((s) => {
    if (!ke.current) {
      const b = { x: s.clientX, y: s.clientY }, S = Pe.current;
      S ? (Pe.current = { x: S.x + (b.x - S.x) * 0.72, y: S.y + (b.y - S.y) * 0.72 }, rn.current == null && (rn.current = requestAnimationFrame(() => {
        rn.current = null, Pe.current && xt({ ...Pe.current });
      }))) : (Pe.current = b, xt(b));
    }
    const u = Qe.current;
    if (u && u.pointerId === s.pointerId) {
      s.preventDefault();
      const b = kt.current;
      if (!b) return;
      const S = b.getBoundingClientRect(), j = (s.clientX - u.startClientX) / Math.max(1, S.width) * B.w, y = (s.clientY - u.startClientY) / Math.max(1, S.height) * B.h;
      Y((M) => M.map((R) => R.id === u.id ? { ...R, x: u.originX + j, y: u.originY + y } : R));
      return;
    }
    if (Te.current) {
      Gn(s);
      return;
    }
    ke.current && er(s);
  }, [Gn, er, B.w, B.h]), rr = f.useCallback((s) => {
    var _a2, _b, _c2;
    if (((_a2 = Qe.current) == null ? void 0 : _a2.pointerId) === s.pointerId) {
      Qe.current = null;
      try {
        (_c2 = (_b = s.currentTarget).releasePointerCapture) == null ? void 0 : _c2.call(_b, s.pointerId);
      } catch {
      }
    }
    Te.current && Jn(s), ke.current && tr(s);
  }, [Jn, tr]), nt = f.useCallback(() => {
    var _a2;
    const s = ne ?? q;
    try {
      (_a2 = wt.current) == null ? void 0 : _a2.blur();
    } catch {
    }
    if (s) {
      const u = Ye.current.find((b) => b.id === s);
      u && !u.text.trim() && (Y((b) => b.filter((S) => S.id !== s)), te(null));
    }
    Q(null);
  }, [ne, q]), un = f.useCallback(() => {
    const s = q;
    if (!s) return;
    const u = Ye.current.find((b) => b.id === s);
    u && (an.current.push({ ...u }), be([]), Y((b) => b.filter((S) => S.id !== s)), te(null), Q(null));
  }, [q]), dn = f.useCallback(() => {
    const s = an.current.pop();
    if (s) {
      Y((W) => [...W, s]), te(s.id), Q(null);
      return;
    }
    const u = Fn.current, b = Kn.current, S = Ye.current, j = u[u.length - 1], y = b[b.length - 1], M = S[S.length - 1], R = (j == null ? void 0 : j.seq) ?? -1, Z = (y == null ? void 0 : y.seq) ?? -1, de = (M == null ? void 0 : M.seq) ?? -1, oe = Math.max(R, Z, de);
    if (!(oe < 0)) {
      if (de === oe && M) {
        be((W) => [...W, { layer: "text", text: M }]), Y(S.slice(0, -1)), te((W) => W === M.id ? null : W);
        return;
      }
      if (j && y && j.id === y.id && j.kind === "eraser" && j.seq === oe) {
        be((W) => [...W, { layer: "both", stroke: j }]), D(u.slice(0, -1)), F(b.slice(0, -1));
        return;
      }
      if (R >= Z && j && R === oe) {
        be((W) => [...W, { layer: "ink", stroke: j }]), D(u.slice(0, -1));
        return;
      }
      y && Z === oe && (be((W) => [...W, { layer: "highlight", stroke: y }]), F(b.slice(0, -1)));
    }
  }, []), hn = f.useCallback(() => {
    be((s) => {
      if (!s.length) return s;
      const u = s[s.length - 1];
      return u ? (u.layer === "text" ? Y((b) => [...b, u.text]) : u.layer === "both" || u.stroke.kind === "eraser" ? (D((b) => [...b, u.stroke]), F((b) => [...b, u.stroke])) : u.layer === "ink" ? D((b) => [...b, u.stroke]) : F((b) => [...b, u.stroke]), s.slice(0, -1)) : s;
    });
  }, []), fn = f.useCallback((s) => {
    T((u) => Cr(u, s)), I((u) => Cr(u, s));
  }, []), ar = f.useCallback((s) => {
    var _a2;
    const u = q, b = (u ? (_a2 = Ye.current.find((j) => j.id === u)) == null ? void 0 : _a2.fontSizePx : null) ?? xe, S = Ki(b, s);
    G(S), u && Y((j) => j.map((y) => y.id === u ? { ...y, fontSizePx: S } : y));
  }, [q, xe]), Ba = f.useCallback((s) => {
    const u = Ke(K(s, Se, Me));
    T(u), I(u);
  }, []), Ra = f.useCallback(() => {
    se("highlighter");
  }, [se]), vt = f.useCallback(async (s) => {
    if (!a || !e || Ve) return;
    const u = ae.some((b) => b.text.trim().length > 0);
    if (!(L.length === 0 && H.length === 0 && !u)) {
      zn(true), Xt(null);
      try {
        const b = Ti(B.w, B.h, L), S = b.getContext("2d");
        S && Ii(S, ae, yt.current);
        const j = Ni(B.w, B.h, H), y = await bi({ src: e, inkCanvas: b, highlightCanvas: j }), M = new File([y], `annotated-${Date.now()}.png`, { type: "image/png" });
        await a(s, M);
      } catch (b) {
        Xt(b instanceof Error ? b.message : String(b));
      } finally {
        zn(false);
      }
    }
  }, [a, e, Ve, L, H, ae, B.w, B.h]), pn = L.length + H.length + ae.length, sr = pn > 0 || !!J || qt, jt = f.useCallback(() => {
    if (sr) {
      Xe(true);
      return;
    }
    Xe(false), r();
  }, [sr, r]), za = f.useCallback(() => {
    Xe(false), r();
  }, [r]), Oa = f.useCallback(() => {
    Xe(false);
  }, []);
  f.useEffect(() => {
    if (!i) return;
    const s = (u) => {
      var _a2;
      const b = u.target, S = (_a2 = b == null ? void 0 : b.tagName) == null ? void 0 : _a2.toLowerCase(), j = S === "input" || S === "textarea" || (b == null ? void 0 : b.isContentEditable), y = pa ? u.metaKey : u.ctrlKey, M = u.key.toLowerCase(), R = u.code;
      if (y && M === "s") {
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), vt(u.shiftKey ? "saveAs" : "overwrite");
        return;
      }
      if (y && M === "z" && !u.shiftKey) {
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), dn();
        return;
      }
      if (y && (M === "y" || M === "z" && u.shiftKey)) {
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), hn();
        return;
      }
      const Z = !!q || d === "text", de = y && (u.shiftKey && (u.key === "<" || u.key === "," || R === "Comma") || !u.shiftKey && (u.key === "[" || R === "BracketLeft")), oe = y && (u.shiftKey && (u.key === ">" || u.key === "." || R === "Period") || !u.shiftKey && (u.key === "]" || R === "BracketRight"));
      if (Z && (de || oe)) {
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), ar(de ? -1 : 1);
        return;
      }
      if (u.key === "Escape") {
        if (Jt) return;
        if (d === "text" || ne) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), ne ? nt() : te(null);
          return;
        }
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), jt();
        return;
      }
      if (q && !y && (M === "backspace" || M === "delete")) {
        if (ne && j && S === "textarea" && b.value.length > 0) return;
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), un();
        return;
      }
      if (!j) {
        if (!y && u.key === "[") {
          u.preventDefault(), u.stopPropagation(), fn(-1);
          return;
        }
        !y && u.key === "]" && (u.preventDefault(), u.stopPropagation(), fn(1));
      }
    };
    return window.addEventListener("keydown", s, true), () => window.removeEventListener("keydown", s, true);
  }, [i, vt, dn, hn, fn, ar, q, ne, d, nt, un, jt, Jt]);
  const _a = d !== "pan" && d !== "text" && gt != null && !Te.current && !qt, or = ln(d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen"), ir = Math.max(4, or.w * l), lr = Math.max(4, or.h * l), Fa = L.filter((s) => s.kind === "eraser"), Ka = L.filter((s) => s.kind !== "eraser"), Wa = H.filter((s) => s.kind === "eraser"), qa = H.filter((s) => s.kind !== "eraser"), Ua = qt && d === "highlighter" ? { mixBlendMode: P } : {}, cr = Fs(_e(Ze) || "#111827ff"), Va = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", rt = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [at, Xa] = f.useState(null);
  return o.jsxs(o.Fragment, { children: [o.jsx(_o, { open: i, onOpenChange: (s) => {
    s || jt();
  }, children: o.jsx(gn, { children: i ? o.jsxs(Fo, { forceMount: true, children: [o.jsx(Ko, { asChild: true, forceMount: true, children: o.jsx(Oe.div, { className: "fixed inset-0 z-100060 bg-black/85", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: Pi }) }), o.jsx(Wo, { asChild: true, forceMount: true, onOpenAutoFocus: (s) => s.preventDefault(), onEscapeKeyDown: (s) => {
    s.preventDefault();
  }, children: o.jsxs(Oe.div, { ref: Xa, className: "fixed inset-0 z-100061 flex flex-col outline-none", "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30", initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: Hi, children: [o.jsx(qo, { className: "sr-only", children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30" }), o.jsx(Uo, { className: "sr-only", children: "\uBCA1\uD130 \uD39C\uC73C\uB85C \uADF8\uB9AC\uACE0 \uD655\uB300/\uCD95\uC18C\xB7\uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), o.jsx("div", { ref: $a, className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${d === "pan" ? "cursor-grab" : d === "text" ? "cursor-text" : "cursor-none"}`, onPointerDown: Ha, onPointerMove: Da, onPointerUp: rr, onPointerCancel: rr, onPointerLeave: () => {
    xt(null), Pe.current = null;
  }, children: e ? o.jsx("div", { className: "relative will-change-transform", style: { transform: `translate(${h.x}px, ${h.y}px) scale(${l})`, transformOrigin: "center center" }, onClick: (s) => s.stopPropagation(), children: o.jsxs("div", { ref: kt, className: "relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl", style: Oi, children: [o.jsx("img", { ref: en, src: e, alt: t || "", className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none", draggable: false, onDoubleClick: Pa }), o.jsxs("svg", { className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none", viewBox: `0 0 ${B.w} ${B.h}`, preserveAspectRatio: "none", "aria-hidden": true, children: [o.jsxs("defs", { children: [o.jsxs("mask", { id: "haim-ink-erase-mask", children: [o.jsx("rect", { x: "0", y: "0", width: B.w, height: B.h, fill: "#fff" }), Fa.map((s) => o.jsx(he, { stroke: s }, `em-${s.id}`)), (J == null ? void 0 : J.kind) === "eraser" ? o.jsx(he, { stroke: J }) : null] }), o.jsxs("mask", { id: "haim-hi-erase-mask", children: [o.jsx("rect", { x: "0", y: "0", width: B.w, height: B.h, fill: "#fff" }), Wa.map((s) => o.jsx(he, { stroke: s }, `hem-${s.id}`)), (J == null ? void 0 : J.kind) === "eraser" ? o.jsx(he, { stroke: J }) : null] })] }), o.jsxs("g", { mask: "url(#haim-ink-erase-mask)", children: [Ka.map((s) => o.jsx(he, { stroke: s }, s.id)), J && (J.kind === "pen" || J.kind === "pressure") ? o.jsx(he, { stroke: J }) : null] }), o.jsxs("g", { mask: "url(#haim-hi-erase-mask)", style: { mixBlendMode: P }, children: [qa.map((s) => o.jsx("g", { style: { mixBlendMode: s.blend || P }, children: o.jsx(he, { stroke: s }) }, s.id)), (J == null ? void 0 : J.kind) === "highlighter" ? o.jsx("g", { style: { mixBlendMode: J.blend || P }, children: o.jsx(he, { stroke: J }) }) : null] }), o.jsxs("g", { children: [V.map((s) => o.jsx(he, { stroke: s, fading: La.has(s.id) }, s.id)), (J == null ? void 0 : J.kind) === "laser" ? o.jsx(he, { stroke: J }) : null] })] }), o.jsx("canvas", { ref: tn, className: "pointer-events-none absolute inset-0 h-full w-full", width: B.w, height: B.h, style: Ua, "aria-hidden": true }), ae.map((s) => {
    const u = s.id === q, b = s.id === ne, S = s.x / Math.max(1, B.w) * 100, j = s.y / Math.max(1, B.h) * 100;
    return o.jsx("div", { className: `absolute z-1 min-w-8 max-w-[90%] ${u ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`, style: { left: `${S}%`, top: `${j}%`, color: s.color, opacity: s.opacity, fontFamily: s.fontFamily, fontSize: `${s.fontSizePx}px`, fontWeight: s.fontWeight, fontStyle: s.fontStyle, lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word", cursor: d === "text" || u ? "move" : "default", pointerEvents: d === "text" || u ? "auto" : "none" }, onPointerDown: (y) => {
      var _a2, _b;
      d !== "text" && d !== "pan" || (y.stopPropagation(), y.preventDefault(), se("text"), ne && ne !== s.id && nt(), Q(null), te(s.id), ce(s.fontFamily), G(s.fontSizePx), mt(s.fontWeight), Kt(s.fontStyle), Qe.current = { id: s.id, pointerId: y.pointerId, startClientX: y.clientX, startClientY: y.clientY, originX: s.x, originY: s.y }, (_b = (_a2 = y.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, y.pointerId));
    }, onDoubleClick: (y) => {
      y.stopPropagation(), y.preventDefault(), se("text"), te(s.id), Q(s.id), ce(s.fontFamily), G(s.fontSizePx), mt(s.fontWeight), Kt(s.fontStyle), window.setTimeout(() => {
        var _a2;
        return (_a2 = wt.current) == null ? void 0 : _a2.focus();
      }, 20);
    }, children: b ? o.jsx("textarea", { ref: wt, value: s.text, rows: Math.max(1, s.text.split(`
`).length), placeholder: "\uD14D\uC2A4\uD2B8 \uC785\uB825", className: "block w-full min-w-24 resize-none border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-white/40", style: { fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", fontStyle: "inherit", lineHeight: "inherit", color: "inherit", fieldSizing: "content" }, onPointerDown: (y) => y.stopPropagation(), onChange: (y) => {
      const M = y.target.value;
      Y((R) => R.map((Z) => Z.id === s.id ? { ...Z, text: M } : Z));
    }, onBlur: () => {
      ne === s.id && nt();
    }, onKeyDown: (y) => {
      if (y.key === "Escape") {
        y.preventDefault(), y.stopPropagation(), nt();
        return;
      }
      (y.key === "Backspace" || y.key === "Delete") && y.currentTarget.value.length === 0 && (y.preventDefault(), y.stopPropagation(), un());
    } }) : o.jsx("span", { className: "block", children: s.text || "\uD14D\uC2A4\uD2B8" }) }, s.id);
  })] }) }) : null }), _a && gt ? o.jsx("div", { className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow", style: { left: gt.x - ir / 2, top: gt.y - lr / 2, width: ir, height: lr, borderRadius: ie === "circle" ? "9999px" : "2px", borderStyle: ee === "dashed" ? "dashed" : "solid", opacity: K(Aa, 0.25, 0.85), backgroundColor: d === "eraser" ? "transparent" : _e(Ze) || void 0 }, "aria-hidden": true }) : null, (d === "text" || Je) && o.jsxs("aside", { className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md", onPointerDown: (s) => s.stopPropagation(), children: [o.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/90", children: [o.jsx(yn, { size: 14, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"] }), o.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [o.jsx("span", { children: "Font family" }), o.jsx(Ks, { value: (Je == null ? void 0 : Je.fontFamily) ?? ue, onChange: (s) => {
    ce(s), Ct({ fontFamily: s });
  }, className: "w-full", inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs", allowAddWebfont: true })] }), o.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [o.jsx("span", { children: "Font size" }), o.jsxs("div", { className: "flex items-center gap-1", children: [o.jsx("input", { type: "number", min: jn, max: Mn, step: 1, value: (Je == null ? void 0 : Je.fontSizePx) ?? xe, onChange: (s) => {
    const u = K(Math.round(Number(s.target.value) || 24), jn, Mn);
    G(u), Ct({ fontSizePx: u });
  }, className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white", "aria-label": "Font size (px)" }), o.jsx("span", { className: "shrink-0 text-white/60", children: "px" })] })] }), o.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [o.jsx("span", { children: "Font weight" }), o.jsxs(ot, { value: (Je == null ? void 0 : Je.fontWeight) ?? re, onValueChange: (s) => {
    mt(s), Ct({ fontWeight: s });
  }, children: [o.jsx(it, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font weight", children: o.jsx(xn, {}) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: rt, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsx(ut, { className: "p-1", children: Si.map((s) => o.jsx(ve, { value: s.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: o.jsx(je, { children: s.label }) }, s.value)) }) }) })] })] }), o.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [o.jsx("span", { children: "Font style" }), o.jsxs(ot, { value: (Je == null ? void 0 : Je.fontStyle) ?? $e, onValueChange: (s) => {
    const u = s === "italic" ? "italic" : "normal";
    Kt(u), Ct({ fontStyle: u });
  }, children: [o.jsx(it, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font style", children: o.jsx(xn, {}) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: rt, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsxs(ut, { className: "p-1", children: [o.jsx(ve, { value: "normal", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: o.jsx(je, { children: "Normal" }) }), o.jsx(ve, { value: "italic", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: o.jsx(je, { children: "Italic" }) })] }) }) })] })] }), o.jsxs("p", { className: "text-[10px] leading-4 text-white/45", children: ["\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9", o.jsx("br", {}), "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1", o.jsx("br", {}), pe, "+[ ] / ", pe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30"] })] }), o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1", onPointerDown: (s) => s.stopPropagation(), children: [o.jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md", children: [o.jsx(X, { label: "\uD328\uB2DD", active: d === "pan", onClick: () => se("pan"), children: o.jsx(Js, { size: 16 }) }), o.jsx(X, { label: "\uC77C\uBC18 \uD39C", active: d === "pen", onClick: () => se("pen"), children: o.jsx(Zs, { size: 16 }) }), o.jsx(X, { label: "\uD544\uC555 \uD39C", active: d === "pressure", onClick: () => se("pressure"), children: o.jsx(eo, { size: 16 }) }), o.jsx(X, { label: "\uD615\uAD11\uD39C", active: d === "highlighter", onClick: Ra, children: o.jsx(to, { size: 16 }) }), o.jsx(X, { label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)", active: d === "laser", onClick: () => se("laser"), children: o.jsx(no, { size: 16 }) }), o.jsx(X, { label: "\uC9C0\uC6B0\uAC1C", active: d === "eraser", onClick: () => se("eraser"), children: o.jsx(ro, { size: 16 }) }), o.jsx(X, { label: "\uD14D\uC2A4\uD2B8", active: d === "text", onClick: () => se("text"), children: o.jsx(yn, { size: 16 }) }), o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), o.jsxs("div", { className: "relative flex items-center", children: [o.jsx("button", { type: "button", "aria-label": "\uD39C \uC0C9\uC0C1", "aria-expanded": Gt, onClick: () => {
    _n((s) => (s && Qt(false), !s));
  }, className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow", style: { backgroundColor: _e(Ze) || "#111827" } }), o.jsx(gn, { mode: "popLayout", children: Gt ? o.jsxs(Oe.div, { initial: { opacity: 0, y: 16, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.9 }, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 }, className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md", children: [(d === "highlighter" ? zi : Ri).map((s, u, b) => {
    const S = (_e(Ze) || "").slice(0, 7).toLowerCase() === s.toLowerCase(), j = 0.03 * (b.length - u);
    return o.jsx(Oe.button, { type: "button", "aria-label": `\uC0C9\uC0C1 ${s}`, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: j }, onClick: () => {
      Qt(false), d === "highlighter" ? k(`${s}ff`) : (x(`${s}ff`), (d === "pan" || d === "eraser" || d === "laser") && se("pen")), _n(false);
    }, className: `h-7 w-7 rounded-full border-2 shadow ${S ? "border-sky-300 scale-110" : "border-white/40"}`, style: { backgroundColor: s } }, s);
  }), o.jsx(Oe.button, { type: "button", "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1", "aria-pressed": Yt, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: 0 }, onClick: () => Qt((s) => !s), className: `h-7 w-7 rounded-full border-2 shadow ${Yt ? "border-sky-300 scale-110" : "border-white/50"}`, style: qi })] }, "haim-color-palette") : null }), o.jsx(gn, { children: Gt && Yt ? o.jsxs(Oe.div, { initial: { opacity: 0, x: -6, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 }, transition: { duration: 0.18, ease: Dn }, className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md", children: [o.jsx("div", { className: "mb-2 h-8 w-full rounded border border-white/20", style: { ...Ws, backgroundColor: Ze } }), o.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: o.jsx(Os, { color: cr, onChange: (s) => {
    const u = _e(s.startsWith("#") ? s : `#${s}`);
    u && (d === "highlighter" ? k(u) : (x(u), (d === "pan" || d === "eraser" || d === "laser") && se("pen")));
  } }) }), o.jsx(_s, { alpha: true, prefixed: true, color: cr, onChange: (s) => {
    const u = _e(s.startsWith("#") ? s : `#${s}`);
    u && (d === "highlighter" ? k(u) : x(u));
  }, className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white" })] }, "haim-color-picker") : null })] }), o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), d === "highlighter" ? o.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [o.jsxs("label", { className: "flex items-center gap-0.5", children: [o.jsx("span", { className: "opacity-70", children: "W" }), o.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" }), o.jsx("input", { type: "number", min: Se, max: Me, step: 0.1, value: v, onChange: (s) => T(Ke(K(Number(s.target.value) || 1, Se, Me))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" })] }), o.jsx("span", { className: "opacity-50", "aria-hidden": true, children: "\xD7" }), o.jsxs("label", { className: "flex items-center gap-0.5", children: [o.jsx("span", { className: "opacity-70", children: "H" }), o.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" }), o.jsx("input", { type: "number", min: Se, max: Me, step: 0.1, value: z, onChange: (s) => I(Ke(K(Number(s.target.value) || 1, Se, Me))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" })] }), o.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }) : o.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [o.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), o.jsx("input", { type: "number", min: Se, max: Me, step: 0.1, value: v, onChange: (s) => Ba(Number(s.target.value) || 1), className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), o.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }), o.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [o.jsx("span", { className: "opacity-70", children: "\uD750\uB984" }), o.jsx("input", { type: "number", min: 5, max: 100, step: 5, value: Math.round((d === "highlighter" ? O : w) * 100), onChange: (s) => {
    const b = K(Number(s.target.value) || 5, 5, 100) / 100;
    d === "highlighter" ? A(b) : N(b);
  }, className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uD750\uB984 (%)" }), o.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "%" })] }), o.jsxs(ot, { value: ie, onValueChange: (s) => Ae(s), children: [o.jsx(it, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ie === "circle" ? "\uC6D0" : "\uB124\uBAA8", children: ie === "circle" ? o.jsx(pr, { size: 16 }) : o.jsx(mr, { size: 16 }) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: rt, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsxs(ut, { className: "p-1", children: [o.jsxs(ve, { value: "circle", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uC6D0", children: [o.jsx(pr, { size: 16 }), o.jsx(je, { className: "sr-only", children: "\uC6D0" })] }), o.jsxs(ve, { value: "square", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uB124\uBAA8", children: [o.jsx(mr, { size: 16 }), o.jsx(je, { className: "sr-only", children: "\uB124\uBAA8" })] })] }) }) })] }), o.jsxs(ot, { value: ee, onValueChange: (s) => E(s), children: [o.jsx(it, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ee === "dashed" ? "Dashed" : "Solid", children: ee === "dashed" ? o.jsx(Mr, { size: 16 }) : o.jsx(jr, { size: 16 }) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: rt, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsxs(ut, { className: "p-1", children: [o.jsxs(ve, { value: "solid", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Solid", children: [o.jsx(jr, { size: 16 }), o.jsx(je, { className: "sr-only", children: "Solid" })] }), o.jsxs(ve, { value: "dashed", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Dashed", children: [o.jsx(Mr, { size: 16 }), o.jsx(je, { className: "sr-only", children: "Dashed" })] })] }) }) })] }), d === "highlighter" ? o.jsxs(ot, { value: P, onValueChange: (s) => U(s), children: [o.jsx(it, { className: Va, "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC", children: o.jsx(xn, { placeholder: "Blend" }) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: `${rt} max-h-56 overflow-auto`, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsx(ut, { className: "p-1", children: Ci.map((s) => o.jsx(ve, { value: s.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: o.jsx(je, { children: s.label }) }, s.value)) }) }) })] }) : null, o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), o.jsx(X, { label: `\uC2E4\uD589 \uCDE8\uC18C (${pe}+Z)`, disabled: pn === 0, onClick: dn, children: o.jsx(Jr, { size: 16 }) }), o.jsx(X, { label: `\uB2E4\uC2DC \uC2E4\uD589 (${vr})`, disabled: Ta.length === 0, onClick: hn, children: o.jsx(Zr, { size: 16 }) }), o.jsx(X, { label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30", disabled: pn === 0 && V.length === 0, onClick: sn, children: o.jsx(ao, { size: 16 }) }), o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), o.jsx(X, { label: "\uCD95\uC18C", onClick: () => {
    var _a2;
    const s = (_a2 = bt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!s) {
      c((u) => K(u / Fe, Et, Lt));
      return;
    }
    Be(l / Fe, s.left + s.width / 2, s.top + s.height / 2);
  }, children: o.jsx(so, { size: 16 }) }), o.jsxs("span", { className: "min-w-10 text-center text-[11px] tabular-nums text-white/80", children: [Math.round(l * 100), "%"] }), o.jsx(X, { label: "\uD655\uB300", onClick: () => {
    var _a2;
    const s = (_a2 = bt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!s) {
      c((u) => K(u * Fe, Et, Lt));
      return;
    }
    Be(l * Fe, s.left + s.width / 2, s.top + s.height / 2);
  }, children: o.jsx(oo, { size: 16 }) }), o.jsx(X, { label: "\uBCF4\uAE30 \uCD08\uAE30\uD654", onClick: et, children: o.jsx(io, { size: 16 }) }), o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), o.jsx(X, { label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${pe}+S)`, tone: "save", disabled: !Vn || Ve, onClick: () => {
    vt("overwrite");
  }, children: o.jsx(lo, { size: 16 }) }), o.jsx(X, { label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${pe}+Shift+S)`, tone: "saveAs", disabled: !Vn || Ve, onClick: () => {
    vt("saveAs");
  }, children: o.jsx(co, { size: 16 }) })] }), o.jsxs("p", { className: "max-w-xl text-center text-[10px] text-white/55", children: ["\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ", pe, "+[ ] / ", pe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ", pe, "+Z / ", vr, Ia ? " \xB7 Ink API" : "", Ve ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""] }), On ? o.jsx("p", { className: "max-w-xl text-center text-[10px] text-red-300", children: On }) : null] }) }), o.jsx("button", { type: "button", className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80", "aria-label": "\uB2EB\uAE30", onClick: jt, children: o.jsx(uo, { size: 20 }) })] }) })] }, "haim-image-lightbox") : null }) }), o.jsx(qs, { isOpen: Jt, title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30", cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1", variant: "danger", overlayClassName: "z-100070", onConfirm: za, onCancel: Oa })] });
}
function Ui({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
  const i = String(e.attrs.src || ""), l = String(e.attrs.alt || ""), c = String(e.attrs.title || ""), h = n.isEditable, [p, d] = f.useState(false), [g, m] = f.useState(null), x = f.useCallback((v) => {
    if (v.detail > 1) return;
    v.preventDefault(), v.stopPropagation();
    const T = typeof r == "function" ? r() : null;
    typeof T == "number" && n.chain().focus().setNodeSelection(T).run();
  }, [n, r]), C = f.useCallback((v) => {
    v.preventDefault(), v.stopPropagation(), i && (m(i), d(true));
  }, [i]), k = f.useCallback(async (v, T) => {
    if (!h) return;
    const z = await ha(T), I = typeof r == "function" ? r() : null, w = URL.createObjectURL(T);
    if (v === "overwrite") {
      typeof I == "number" ? n.chain().focus().deleteRange({ from: I, to: I + e.nodeSize }).insertContentAt(I, { type: "wikiImage", attrs: { path: z, options: "", alt: z, width: null, height: null, background: null } }).run() : a({ src: w }), m(w);
      return;
    }
    if (typeof I != "number") return;
    const N = I + e.nodeSize;
    n.chain().focus().insertContentAt(N, { type: "wikiImage", attrs: { path: z, options: "", alt: z, width: null, height: null, background: null } }).run();
  }, [h, n, r, a, e.nodeSize]);
  return o.jsxs(me, { as: "span", className: `haim-stock-image-wrap${t ? " is-selected" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: x, onDoubleClick: C, children: [o.jsx("img", { src: i, alt: l, ...c ? { title: c } : {}, className: "haim-stock-image max-w-full h-auto cursor-pointer", draggable: false }), o.jsx(ma, { src: g || i || null, alt: l, open: p, onClose: () => {
    d(false), m(null);
  }, ...h ? { onSaveAnnotated: k } : {} })] });
}
let En = null;
function ou(e) {
  En = e;
}
function Ln(e) {
  const t = String(e || "").trim().replace(/^\/+/, "");
  return !t || typeof En != "function" ? false : (En(t), true);
}
function Vi(e, t) {
  const n = String(e || "").trim();
  if (!n) return;
  const r = Vr(n);
  if (r) {
    Ln(r);
    return;
  }
  if (Xr(n)) return;
  const a = String((t == null ? void 0 : t.target) || "_blank").trim(), i = !a || a === "_self" ? "_blank" : a;
  window.open(n, i, "noopener,noreferrer");
}
const Er = "haim-mod-held";
function Xi(e, t) {
  let n = null;
  if (t.target instanceof HTMLAnchorElement) n = t.target;
  else {
    const r = t.target;
    if (!r) return null;
    n = r.closest("a");
  }
  return !n || !e.view.dom.contains(n) ? null : n;
}
function Yi(e, t, n) {
  const r = Ga(e.state, t.name), a = String(r.href || "").trim();
  return a || String(n.getAttribute("href") || n.href || "").trim();
}
function Qi() {
  return new ft({ key: new qe("haimLinkModCursor"), view(e) {
    const t = (c) => {
      e.dom.classList.toggle(Er, c);
    }, n = (c) => {
      t(!!(c.ctrlKey || c.metaKey));
    }, r = (c) => {
      (c.key === "Control" || c.key === "Meta" || c.ctrlKey || c.metaKey) && t(true);
    }, a = (c) => {
      n(c);
    }, i = () => t(false), l = (c) => {
      n(c);
    };
    return window.addEventListener("keydown", r, true), window.addEventListener("keyup", a, true), window.addEventListener("blur", i), e.dom.addEventListener("mousemove", l), { destroy() {
      window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", a, true), window.removeEventListener("blur", i), e.dom.removeEventListener("mousemove", l), e.dom.classList.remove(Er);
    } };
  } });
}
function Gi(e, t, n, r) {
  if (r.button !== 0) return false;
  const a = Xi(e, r);
  if (!a) return false;
  const i = Yi(n, t, a);
  if (!i) return false;
  const l = Vr(i), c = Us(), h = r.metaKey || r.ctrlKey;
  if (n.editable) {
    if (r.preventDefault(), !h && !c) return true;
    if (l) return r.stopPropagation(), Ln(l), true;
    const p = (a.getAttribute("target") || a.target || "_blank").trim();
    return Vi(i, { target: p }), true;
  }
  return l ? (r.preventDefault(), r.stopPropagation(), Ln(l), true) : false;
}
function Ji(e, t) {
  return new ft({ key: new qe("haimLinkClick"), props: { handleDOMEvents: { click: (n, r) => Gi(e, t, n, r) } } });
}
const Zi = Qa.extend({ renderHTML({ HTMLAttributes: e }) {
  const t = String(e.href || ""), n = Xr(t);
  return ["a", ge(this.options.HTMLAttributes, e, { class: n ? "haim-docuhaim-link" : null }), 0];
}, addProseMirrorPlugins() {
  var _a;
  return [...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? [], Qi(), Ji(this.editor, this.type)];
} }).configure({ openOnClick: false, autolink: true, protocols: ["docuhaim"], HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } });
function Lr(e) {
  if (!e || typeof e != "object") return;
  const t = e;
  t.__haimRawTextPatched || (t.encodeTextForMarkdown = (n) => n, t.escapeMarkdownSyntax = (n) => n, t.__haimRawTextPatched = true);
}
const el = Ja.extend({ onBeforeCreate(e) {
  var _a, _b, _c2;
  (_a = this.parent) == null ? void 0 : _a.call(this, e);
  const t = (_b = this.storage) == null ? void 0 : _b.manager;
  t && Lr(t), ((_c2 = this.editor) == null ? void 0 : _c2.markdown) && Lr(this.editor.markdown);
} }), tl = /^\s*(\[([ xX~]?)\])\s$/, nl = /^\s*[-*+]\s*\[([ xX~])\]\s$/;
function Tr(e) {
  return sa(e === void 0 || e === "" ? " " : e);
}
function Tn(e) {
  const t = dt(e), n = Nt(e);
  return { status: t, checked: t === "done", kind: t === "doing" ? "status" : n };
}
function Nr(e, t, n) {
  var _a, _b;
  const r = e.schema.nodes.taskItem, a = e.schema.nodes.taskList;
  if (!r || !a) return null;
  const i = e.doc.resolve(t.from);
  let l = -1, c = -1;
  for (let m = i.depth; m >= 1; m -= 1) {
    const x = i.node(m).type.name;
    l < 0 && x === "listItem" && (l = m), c < 0 && (x === "bulletList" || x === "orderedList") && (c = m);
  }
  const h = e.tr.delete(t.from, t.to);
  if (l > 0 && c > 0) {
    const m = i.before(c), x = i.index(c), C = h.mapping.map(m), k = h.doc.nodeAt(C);
    if (!k) return null;
    const v = [];
    k.forEach((I, w, N) => {
      const O = N === x ? n : I.type.name === "taskItem" ? Tn(I.attrs) : { status: "todo", checked: false, kind: "check" };
      v.push(r.create(O, I.content, I.marks));
    });
    const T = a.create(k.attrs, v);
    h.replaceWith(C, C + k.nodeSize, T), mn(h.doc, C) && ((_a = h.doc.resolve(C).nodeBefore) == null ? void 0 : _a.type) === a && h.join(C);
    const z = h.doc.nodeAt(C);
    if (z) {
      const I = C + z.nodeSize;
      mn(h.doc, I) && ((_b = h.doc.nodeAt(I)) == null ? void 0 : _b.type) === a && h.join(I);
    }
    return;
  }
  const p = h.doc.resolve(t.from).blockRange(), d = p && ts(p, r, n);
  if (!d) return null;
  h.wrap(p, d);
  const g = h.doc.resolve(t.from - 1).nodeBefore;
  g && g.type === r && mn(h.doc, t.from - 1) && h.join(t.from - 1);
}
function bn(e, t, n, r) {
  t.dataset.status = n, t.dataset.kind = r, t.dataset.checked = n === "done" ? "true" : "false", e.dataset.status = n, e.dataset.kind = r, e.className = r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", e.checked = n === "done", e.indeterminate = n === "doing", e.setAttribute("aria-checked", n === "doing" ? "mixed" : n === "done" ? "true" : "false"), e.setAttribute("aria-label", r === "status" ? n === "doing" ? "Status task in progress" : n === "done" ? "Status task completed" : "Status task not started" : n === "done" ? "Task completed" : "Task not started");
}
const rl = Za.extend({ addStorage() {
  return { preferredKind: "check" };
}, addCommands() {
  return { setHaimTaskCheckboxPreferredKind: (e) => () => (this.storage.preferredKind = e === "status" ? "status" : "check", true) };
}, addAttributes() {
  return { kind: { default: "check", keepOnSplit: false, parseHTML: (e) => {
    const t = e.getAttribute("data-kind"), n = e.getAttribute("data-status");
    return br(t, n === "todo" || n === "doing" || n === "done" ? n : void 0);
  }, renderHTML: (e) => ({ "data-kind": Nt(e) }) }, status: { default: "todo", keepOnSplit: false, parseHTML: (e) => {
    const t = e.getAttribute("data-status");
    if (t === "todo" || t === "doing" || t === "done") return t;
    const n = e.getAttribute("data-checked");
    return n === "" || n === "true" ? "done" : "todo";
  }, renderHTML: (e) => {
    const t = dt(e);
    return { "data-status": t, "data-checked": t === "done" ? "true" : "false" };
  } }, checked: { default: false, keepOnSplit: false, parseHTML: (e) => {
    const t = e.getAttribute("data-status");
    if (t === "done") return true;
    if (t === "doing" || t === "todo") return false;
    const n = e.getAttribute("data-checked");
    return n === "" || n === "true";
  }, renderHTML: (e) => ({ "data-checked": dt(e) === "done" ? "true" : "false" }) } };
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const n = dt(e.attrs), r = Nt(e.attrs);
  return ["li", ge(this.options.HTMLAttributes, t, { "data-type": this.name, "data-status": n, "data-kind": r, "data-checked": n === "done" ? "true" : "false" }), ["label", ["input", { type: "checkbox", class: r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", checked: n === "done" ? "checked" : null, "data-status": n, "data-kind": r, "aria-checked": n === "doing" ? "mixed" : n === "done" ? "true" : "false" }], ["span"]], ["div", 0]];
}, parseMarkdown: (e, t) => {
  const n = [];
  e.tokens && e.tokens.length > 0 ? n.push(t.createNode("paragraph", {}, t.parseInline(e.tokens))) : e.text ? n.push(t.createNode("paragraph", {}, [t.createNode("text", { text: e.text })])) : n.push(t.createNode("paragraph", {}, [])), e.nestedTokens && e.nestedTokens.length > 0 && n.push(...t.parseChildren(e.nestedTokens));
  const r = e.status === "todo" || e.status === "doing" || e.status === "done" ? e.status : e.checked ? "done" : "todo", a = e.kind === "status" || e.kind === "check" ? br(e.kind, r) : r === "doing" ? "status" : "check";
  return t.createNode("taskItem", { status: r, checked: r === "done", kind: a }, n);
}, renderMarkdown: (e, t) => {
  const n = dt(e == null ? void 0 : e.attrs), r = Nt(e == null ? void 0 : e.attrs), i = `- [${Jo(n, r)}] `;
  return es(e, t, i);
}, addNodeView() {
  return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
    const a = document.createElement("li"), i = document.createElement("label"), l = document.createElement("input"), c = document.createElement("div");
    let h = e;
    i.contentEditable = "false", l.type = "checkbox";
    const p = (m) => {
      const x = Tn(m.attrs);
      bn(l, a, x.status, x.kind);
    };
    p(e);
    const d = (m) => {
      if (typeof n != "function") return;
      const x = n();
      if (typeof x != "number") return;
      const { state: C, dispatch: k } = r.view, v = C.doc.nodeAt(x);
      !v || v.type !== this.type || k(C.tr.setNodeMarkup(x, void 0, { ...v.attrs, status: m.status, checked: m.checked, kind: m.kind }));
    }, g = (m) => {
      var _a;
      m.preventDefault(), m.stopPropagation();
      const x = Tn(h.attrs), C = ((_a = r.storage.taskItem) == null ? void 0 : _a.preferredKind) === "status" ? "status" : "check";
      if (!r.isEditable && !this.options.onReadOnlyChecked) {
        p(h);
        return;
      }
      const k = Go(x.status, C), v = { status: k, checked: k === "done", kind: C };
      if (r.isEditable) {
        bn(l, a, v.status, v.kind), d(v);
        return;
      }
      this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(h, v.checked) ? bn(l, a, v.status, v.kind) : p(h));
    };
    return i.addEventListener("pointerdown", (m) => {
      m.button === 0 && g(m);
    }), l.addEventListener("click", (m) => {
      m.preventDefault(), m.stopPropagation();
    }), l.addEventListener("change", (m) => {
      m.preventDefault(), p(h);
    }), Object.entries(this.options.HTMLAttributes).forEach(([m, x]) => {
      a.setAttribute(m, String(x));
    }), a.append(i, c), i.append(l), Object.entries(t).forEach(([m, x]) => {
      a.setAttribute(m, String(x));
    }), { dom: a, contentDOM: c, stopEvent: (m) => {
      const x = m.target;
      return !!(x && i.contains(x));
    }, ignoreMutation: (m) => m.type === "selection" || i.contains(m.target), update: (m) => m.type !== this.type ? false : (h = m, p(m), true) };
  };
}, addInputRules() {
  return [new wn({ find: tl, handler: ({ state: e, range: t, match: n }) => {
    var _a;
    const r = ((_a = this.editor.storage.taskItem) == null ? void 0 : _a.preferredKind) === "status" ? "status" : "check", a = Tr(n[2]);
    return Nr(e, t, { status: a.status, checked: a.checked, kind: r });
  } }), new wn({ find: nl, handler: ({ state: e, range: t, match: n }) => {
    var _a;
    const r = ((_a = this.editor.storage.taskItem) == null ? void 0 : _a.preferredKind) === "status" ? "status" : "check", a = Tr(n[1]);
    return Nr(e, t, { status: a.status, checked: a.checked, kind: r });
  } })];
} }), al = /^\s*[-+*]\s+\[([ xX~])\]\s+/, Ir = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;
function Ar(e) {
  var _a;
  const t = sa(e[3]);
  return { indentLevel: ((_a = e[1]) == null ? void 0 : _a.length) ?? 0, mainContent: e[4] ?? "", checked: t.checked, status: t.status, kind: t.kind };
}
function $r(e, t, n = []) {
  return { type: "taskItem", raw: "", mainContent: e.mainContent, indentLevel: e.indentLevel, checked: e.checked, status: e.status, kind: e.kind, text: e.mainContent, tokens: t.inlineTokens(e.mainContent), nestedTokens: n };
}
const sl = ns.extend({ markdownTokenizer: { name: "taskList", level: "block", start(e) {
  var _a;
  const t = (_a = e.match(al)) == null ? void 0 : _a.index;
  return t !== void 0 ? t : -1;
}, tokenize(e, t, n) {
  const r = (i) => {
    const l = ur(i, { itemPattern: Ir, extractItemData: Ar, createToken: (c, h) => $r(c, n, h ?? []), customNestedParser: r }, n);
    if (l) {
      const c = { type: "taskList", raw: l.raw, items: l.items }, h = i.slice(l.raw.length);
      return h.trim() ? [c, ...n.blockTokens(h)] : [c];
    }
    return n.blockTokens(i);
  }, a = ur(e, { itemPattern: Ir, extractItemData: Ar, createToken: (i, l) => $r(i, n, l ?? []), customNestedParser: r }, n);
  if (a) return { type: "taskList", raw: a.raw, items: a.items };
} } }), ol = rs.extend({ name: "nodeRange", addKeyboardShortcuts() {
  var _a;
  const n = { ...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? {} };
  return delete n["Shift-ArrowUp"], delete n["Shift-ArrowDown"], n;
} }), il = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, ll = Ee.create({ name: "pageBreak", group: "block", atom: true, selectable: true, draggable: true, parseHTML() {
  return [{ tag: "pgbr" }, { tag: "div[data-haim-pgbr]" }, { tag: "div.md-pgbr" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", ge(e, { "data-haim-pgbr": "1", "data-md-pgbr": "1", class: "haim-pgbr md-pgbr" })];
}, markdownTokenizer: { name: "pageBreak", level: "block", start: (e) => {
  const t = /<pgbr\s*\/?\s*>/i.exec(e);
  return t ? t.index : -1;
}, tokenize: (e) => {
  const t = il.exec(e);
  if (t) return { type: "pageBreak", raw: t[0] };
} }, parseMarkdown: (e, t) => t.createNode("pageBreak"), renderMarkdown: () => `<pgbr/>

`, addCommands() {
  return { setPageBreak: () => ({ chain: e, state: t }) => {
    const n = t.schema.nodes[this.name];
    if (!n || !as(t, n)) return false;
    const { selection: r } = t, { $to: a } = r, i = e();
    return ss(r) ? i.insertContentAt(a.pos, { type: this.name }) : i.insertContent({ type: this.name }), i.command(({ state: l, tr: c, dispatch: h }) => {
      var _a;
      if (h) {
        const { $to: p } = c.selection, d = p.end();
        if (p.nodeAfter) p.nodeAfter.isTextblock ? c.setSelection(_.create(c.doc, p.pos + 1)) : p.nodeAfter.isBlock ? c.setSelection(Ur.create(c.doc, p.pos)) : c.setSelection(_.create(c.doc, p.pos));
        else {
          const m = (_a = l.schema.nodes.paragraph || p.parent.type.contentMatch.defaultType) == null ? void 0 : _a.create();
          m && (c.insert(d, m), c.setSelection(_.create(c.doc, d + 1)));
        }
        c.scrollIntoView();
      }
      return true;
    }).run();
  } };
} }), Bn = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", cl = ["nw", "ne", "sw", "se"];
function Pr(e) {
  if (!e) return;
  const t = {};
  for (const n of e.split(";")) {
    const r = n.trim();
    if (!r) continue;
    const a = r.indexOf(":");
    if (a < 0) continue;
    const i = r.slice(0, a).trim(), l = r.slice(a + 1).trim(), c = i.replace(/-([a-z])/g, (h, p) => p.toUpperCase());
    t[c] = l;
  }
  return t;
}
function Hr(e, t, n, r) {
  const a = Hn({ path: e, width: t, height: n, background: r }), i = a.indexOf("|");
  if (i < 0) return "";
  const l = a.lastIndexOf("]]");
  return a.slice(i + 1, l >= 0 ? l : void 0).trim();
}
function Tt(e) {
  return `${Math.max(24, Math.round(e))}px`;
}
function ul(e) {
  return e ? e.closest(".overflow-auto") || e.parentElement : null;
}
function dl({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
  var _a, _b;
  const i = String(e.attrs.path || ""), l = String(e.attrs.options || ""), c = String(e.attrs.alt || i), h = e.attrs.width || null, p = e.attrs.height || null, d = e.attrs.background || null, g = n.isEditable, m = f.useRef(null), x = f.useRef(null), [C, k] = f.useState(false), [v, T] = f.useState(false), [z, I] = f.useState(null), [w, N] = f.useState(null);
  x.current = w;
  const O = f.useMemo(() => w ? { ...Pr(It({ width: null, height: null, background: d })), width: `${w.width}px`, height: `${w.height}px` } : Pr(It({ width: h, height: p, background: d })), [h, p, d, w]), A = f.useCallback((E, L) => {
    const D = { width: E, height: L, options: Hr(i, E, L, d) }, H = ul(n.view.dom), F = (H == null ? void 0 : H.scrollTop) ?? null, V = typeof r == "function" ? r() : null;
    if (typeof V == "number") {
      const ae = n.state.tr.setNodeMarkup(V, void 0, { ...e.attrs, ...D });
      n.view.dispatch(ae);
    } else a(D);
    const le = () => {
      H && F != null && (H.scrollTop = F);
    };
    le(), requestAnimationFrame(le), requestAnimationFrame(() => requestAnimationFrame(le));
  }, [n, r, a, i, d, e.attrs]), P = f.useCallback(() => {
    const E = x.current;
    E && (A(Tt(E.width), Tt(E.height)), N(null), x.current = null);
    const L = typeof r == "function" ? r() : null;
    if (typeof L == "number") {
      const D = L + (e.nodeSize || 1);
      n.commands.setTextSelection(D);
    }
    n.commands.blur();
  }, [A, n, r, e.nodeSize]), U = f.useCallback((E, L) => {
    var _a2, _b2;
    if (!g) return;
    L.preventDefault(), L.stopPropagation();
    const D = m.current;
    if (!D) return;
    const H = D.getBoundingClientRect(), F = H.width, V = H.height, le = L.clientX, ae = L.clientY, Y = V > 0 ? F / V : 1, q = L.pointerId;
    (_b2 = (_a2 = L.target).setPointerCapture) == null ? void 0 : _b2.call(_a2, q);
    const te = { width: F, height: V };
    x.current = te, N(te);
    const ne = (ue) => {
      const ce = ue.clientX - le, xe = ue.clientY - ae;
      let G = F, re = V;
      E.includes("e") && (G = F + ce), E.includes("w") && (G = F - ce), E.includes("s") && (re = V + xe), E.includes("n") && (re = V - xe), G = Math.max(24, G), re = Math.max(24, re), (ue.shiftKey || ue.pointerType === "touch") && (Math.abs(ce) >= Math.abs(xe) ? re = G / Y : G = re * Y, G = Math.max(24, G), re = Math.max(24, re));
      const $e = { width: G, height: re };
      x.current = $e, N($e);
    }, Q = (ue) => {
      var _a3, _b3;
      window.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", Q), window.removeEventListener("pointercancel", Q);
      try {
        (_b3 = (_a3 = ue.target).releasePointerCapture) == null ? void 0 : _b3.call(_a3, q);
      } catch {
      }
      const ce = x.current;
      ce && A(Tt(ce.width), Tt(ce.height)), x.current = null, N(null);
    };
    window.addEventListener("pointermove", ne), window.addEventListener("pointerup", Q), window.addEventListener("pointercancel", Q);
  }, [g, A]);
  f.useEffect(() => {
    if (!t || !g || C || v) return;
    const E = (L) => {
      if (L.key !== "Enter") return;
      const D = L.target;
      D instanceof HTMLInputElement || D instanceof HTMLTextAreaElement || D instanceof HTMLElement && D.isContentEditable || (L.preventDefault(), L.stopPropagation(), P());
    };
    return document.addEventListener("keydown", E, true), () => document.removeEventListener("keydown", E, true);
  }, [t, g, C, v, P]);
  const ie = f.useCallback((E) => {
    if (E.detail > 1 || E.target instanceof Element && E.target.closest("[data-resize-handle]")) return;
    E.preventDefault(), E.stopPropagation();
    const L = typeof r == "function" ? r() : null;
    typeof L == "number" && n.chain().focus().setNodeSelection(L).run();
  }, [n, r]), Ae = f.useCallback((E) => {
    E.preventDefault(), E.stopPropagation();
    const L = m.current, D = (L == null ? void 0 : L.currentSrc) || (L == null ? void 0 : L.src) || "";
    D && (I(D), T(true));
  }, []), ee = f.useCallback(async (E, L) => {
    if (!g) return;
    const D = await ha(L), H = typeof r == "function" ? r() : null;
    if (E === "overwrite") {
      const V = { path: D, alt: D, options: Hr(D, h, p, d) };
      typeof H == "number" ? n.view.dispatch(n.state.tr.setNodeMarkup(H, void 0, { ...e.attrs, ...V })) : a(V);
      const le = URL.createObjectURL(L);
      I(le);
      return;
    }
    if (typeof H != "number") return;
    const F = H + e.nodeSize;
    n.chain().focus().insertContentAt(F, { type: "wikiImage", attrs: { path: D, options: "", alt: D, width: null, height: null, background: null } }).run();
  }, [g, n, r, a, h, p, d, e.attrs, e.nodeSize]);
  return o.jsxs(me, { as: "div", className: `haim-wiki-image-wrap${t ? " is-selected" : ""}${w ? " is-resizing" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: ie, onDoubleClick: Ae, onContextMenu: (E) => {
    g && (E.preventDefault(), E.stopPropagation(), k(true));
  }, children: [o.jsxs("div", { className: "haim-wiki-image-frame", children: [o.jsx("img", { ref: m, src: Bn, alt: c, className: "haim-wiki-image", "data-wiki-path": i, ...l ? { "data-wiki-options": l } : {}, ...h ? { "data-wiki-width": h } : {}, ...p ? { "data-wiki-height": p } : {}, ...d ? { "data-wiki-bg": d } : {}, style: O, draggable: false }), t && g ? cl.map((E) => o.jsx("button", { type: "button", className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${E}`, "aria-label": `resize-${E}`, "data-resize-handle": E, onPointerDown: (L) => U(E, L) }, E)) : null] }), o.jsx(ei, { isOpen: C, onClose: () => k(false), path: i, kind: "wiki", initialWidth: h ?? "", initialHeight: p ?? "", imageSrc: ((_a = m.current) == null ? void 0 : _a.currentSrc) || ((_b = m.current) == null ? void 0 : _b.src) || "", onApply: ({ width: E, height: L }) => {
    A(E, L), k(false);
  } }), o.jsx(ma, { src: z, alt: c, open: v, onClose: () => {
    T(false), I(null);
  }, ...g ? { onSaveAnnotated: ee } : {} })] });
}
function ga(e, t, n = "") {
  const r = t ? Vs(t) : null;
  return { path: e, options: t || "", alt: n || e, width: (r == null ? void 0 : r.width) ?? null, height: (r == null ? void 0 : r.height) ?? null, background: (r == null ? void 0 : r.background) ?? null };
}
const hl = Ee.create({ name: "wikiImage", group: "block", atom: true, selectable: true, draggable: true, addAttributes() {
  return { path: { default: "" }, options: { default: "" }, alt: { default: "" }, width: { default: null }, height: { default: null }, background: { default: null } };
}, parseHTML() {
  return [{ tag: "img[data-wiki-path]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const n = e.getAttribute("data-wiki-width"), r = e.getAttribute("data-wiki-height"), a = e.getAttribute("data-wiki-bg"), i = e.getAttribute("data-wiki-options") || [n ? `w=${n}` : "", r ? `h=${r}` : "", a ? `bg=${a}` : ""].filter(Boolean).join(" ");
    return { path: t, options: i, alt: e.getAttribute("alt") || t, width: n || null, height: r || null, background: a || null };
  } }, { tag: "div[data-haim-wiki-image]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const n = e.getAttribute("data-wiki-options") || "";
    return ga(t, n, e.getAttribute("data-wiki-alt") || t);
  } }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const n = String(e.attrs.path || ""), r = String(e.attrs.options || ""), a = String(e.attrs.alt || n), i = e.attrs.width || null, l = e.attrs.height || null, c = e.attrs.background || null, h = It({ width: i, height: l, background: c });
  return ["img", ge(t, { src: Bn, alt: a, "data-wiki-path": n, ...r ? { "data-wiki-options": r } : {}, ...i ? { "data-wiki-width": i } : {}, ...l ? { "data-wiki-height": l } : {}, ...c ? { "data-wiki-bg": c } : {}, ...h ? { style: h } : {}, class: "haim-wiki-image" })];
}, addNodeView() {
  return Ue(dl);
}, renderMarkdown: (e) => {
  var _a, _b, _c2, _d, _e2;
  const t = String(((_a = e.attrs) == null ? void 0 : _a.path) || "");
  if (!t) return "";
  const n = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c2 = e.attrs) == null ? void 0 : _c2.height) || null, a = ((_d = e.attrs) == null ? void 0 : _d.background) || null;
  if (n || r || a) return `${Hn({ path: t, width: n, height: r, background: a })}

`;
  const i = String(((_e2 = e.attrs) == null ? void 0 : _e2.options) || "");
  return i ? `![[${t}|${i}]]

` : `![[${t}]]

`;
} });
function iu(e, t = "", n = "") {
  const r = ga(e, t, n), a = It({ width: r.width, height: r.height, background: r.background }), i = [`src="${Bn}"`, `alt="${Ie(r.alt)}"`, `data-wiki-path="${Ie(r.path)}"`, 'class="haim-wiki-image"'];
  return r.options && i.push(`data-wiki-options="${Ie(r.options)}"`), r.width && i.push(`data-wiki-width="${Ie(r.width)}"`), r.height && i.push(`data-wiki-height="${Ie(r.height)}"`), r.background && i.push(`data-wiki-bg="${Ie(r.background)}"`), a && i.push(`style="${Ie(a)}"`), `<img ${i.join(" ")} />`;
}
function Ie(e) {
  return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
const fl = Ee.create({ name: "wikiFigure", group: "block", content: "wikiImage figcaption", defining: true, isolating: true, parseHTML() {
  return [{ tag: "figure[data-haim-wiki-figure]" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figure", ge(e, { "data-haim-wiki-figure": "1", class: "haim-wiki-figure" }), 0];
}, renderMarkdown: (e, t) => {
  const n = Array.isArray(e.content) ? e.content : [], r = n.find((c) => c.type === "wikiImage"), a = n.find((c) => c.type === "figcaption");
  let i = "";
  if (r == null ? void 0 : r.attrs) {
    const c = String(r.attrs.path || "");
    if (c) {
      const h = r.attrs.width || null, p = r.attrs.height || null, d = r.attrs.background || null;
      if (h || p || d) i = Hn({ path: c, width: h, height: p, background: d });
      else {
        const g = String(r.attrs.options || "");
        i = g ? `![[${c}|${g}]]` : `![[${c}]]`;
      }
    }
  }
  const l = a ? String(t.renderChildren(a.content || []) || "").trim() : "";
  return i ? l ? `${i}
${l}

` : `${i}

` : l ? `${l}

` : "";
} }), pl = Ee.create({ name: "figcaption", content: "inline*", defining: true, selectable: false, parseHTML() {
  return [{ tag: "figcaption" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figcaption", ge(e), 0];
}, renderMarkdown: (e, t) => t.renderChildren(e.content || []) }), ml = Ee.create({ name: "noteCover", group: "block", atom: true, selectable: true, draggable: false, parseHTML() {
  return [{ tag: "div[data-note-cover-placeholder]", priority: 60 }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", ge(e, { class: "md-note-cover-placeholder md-note-cover-placeholder--pending", "data-note-cover-placeholder": "1", role: "button", tabindex: "0", title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9" }), ["div", { class: "md-note-cover-placeholder__mount", "data-note-cover-mount": "1" }], ["span", { class: "md-note-cover-placeholder__fallback" }, ["span", { class: "md-note-cover-placeholder__spinner", "aria-hidden": "true" }], ["span", { class: "md-note-cover-placeholder__fallback-text" }, "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"]]];
}, renderMarkdown: () => "" });
function lu() {
  return `${Zo()}

`;
}
function gl(e) {
  const t = getComputedStyle(e), n = t.lineHeight;
  if (n && n !== "normal") {
    const a = Number.parseFloat(n);
    if (Number.isFinite(a) && a > 0) return a;
  }
  const r = Number.parseFloat(t.fontSize);
  return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
}
const Dr = /* @__PURE__ */ new WeakMap();
function xa(e) {
  const t = getComputedStyle(e), n = `${t.font}|${t.fontSize}|${t.lineHeight}|${t.fontFamily}|${t.fontWeight}`, r = Dr.get(e);
  if (r && r.key === n) return r.value;
  let i = gl(e);
  try {
    const l = document.createElement("div");
    l.setAttribute("aria-hidden", "true"), l.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", "width:auto", `font:${t.font}`, `font-size:${t.fontSize}`, `font-family:${t.fontFamily}`, `font-weight:${t.fontWeight}`, `font-style:${t.fontStyle}`, `letter-spacing:${t.letterSpacing}`, `line-height:${t.lineHeight}`, "white-space:pre", "padding:0", "margin:0", "border:0"].join(";"), l.textContent = "M", document.body.appendChild(l);
    const c = l.getBoundingClientRect().height || l.offsetHeight;
    l.remove(), c > 0 && (i = c);
  } catch {
  }
  return Dr.set(e, { key: n, value: i }), i;
}
function xl(e) {
  const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), n = Number.parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : 4;
}
function ba(e) {
  const t = e.closest("pre");
  if (t) {
    const n = getComputedStyle(t), r = (Number.parseFloat(n.paddingLeft) || 0) + (Number.parseFloat(n.paddingRight) || 0), a = t.clientWidth - r;
    if (a > 0) return a;
  }
  return e.clientWidth;
}
function bl(e) {
  return e.classList.contains("ProseMirror-trailingBreak");
}
function ka(e) {
  return Array.from(e.querySelectorAll("br")).filter((t) => !bl(t));
}
function kl(e) {
  return Math.max(1, ka(e).length + 1);
}
function wl(e, t) {
  const n = Yr(t);
  return e ? Math.max(n, kl(e)) : n;
}
function yl(e, t) {
  const n = Array.from(e.getClientRects()).filter((l) => l.height > 0 || l.width > 0);
  if (n.length === 0) return t;
  let r = 1 / 0, a = -1 / 0;
  for (const l of n) r = Math.min(r, l.top), a = Math.max(a, l.bottom);
  const i = a - r;
  return i > 0.5 ? i : t;
}
function Sl(e, t, n, r) {
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
  const i = n[r];
  i ? e.setEndBefore(i) : e.setEnd(t, t.childNodes.length);
}
function Cl(e, t, n, r) {
  const a = n > 0 ? t[n - 1] : null, i = t[n] ?? null;
  if (a && i) {
    const l = i.getBoundingClientRect().top - a.getBoundingClientRect().top;
    if (l > 0.5) return l;
  }
  if (!a && i) {
    const l = e.getBoundingClientRect().top, c = i.getBoundingClientRect().top - l;
    if (c > 0.5) return c;
  }
  if (a && !i) {
    const l = e.getBoundingClientRect().bottom - a.getBoundingClientRect().top;
    if (l > 0.5) return l;
  }
  return r;
}
function vl(e, t, n) {
  const r = ka(e);
  if (r.length === 0 && t > 1) return null;
  const a = [], i = document.createRange();
  try {
    for (let l = 0; l < t; l += 1) if (Sl(i, e, r, l), i.collapsed) a.push(Cl(e, r, l, n));
    else {
      const c = yl(i, n);
      a.push(Math.max(c, n * 0.95));
    }
  } catch {
    return null;
  }
  return a.length === t ? a : null;
}
function jl(e, t, n, r) {
  const a = ba(e);
  if (a <= 0) return Array.from({ length: n }, () => r);
  const l = ti(t, ni(e), a, xl(e)).map((c) => Math.max(1, c) * r);
  for (; l.length < n; ) l.push(r);
  return l.slice(0, n);
}
function Ml(e, t, n, r) {
  const a = ba(e);
  if (a <= 0) return Array.from({ length: n }, () => r);
  const i = t.length === 0 ? [""] : String(t).split(`
`);
  for (; i.length < n; ) i.push("");
  i.length > n && (i.length = n);
  const l = getComputedStyle(e), c = l.whiteSpace === "pre" || l.whiteSpace === "nowrap" ? "pre-wrap" : l.whiteSpace || "pre-wrap", h = document.createElement("div");
  h.setAttribute("aria-hidden", "true"), h.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", `width:${a}px`, `font:${l.font}`, `font-size:${l.fontSize}`, `font-family:${l.fontFamily}`, `font-weight:${l.fontWeight}`, `font-style:${l.fontStyle}`, `letter-spacing:${l.letterSpacing}`, `line-height:${l.lineHeight}`, `white-space:${c}`, `overflow-wrap:${l.overflowWrap || "break-word"}`, `word-break:${l.wordBreak || "normal"}`, `tab-size:${l.tabSize || 4}`, "box-sizing:border-box", "padding:0", "margin:0", "border:0"].join(";");
  for (const d of i) {
    const g = document.createElement("div");
    g.style.whiteSpace = c, g.style.overflowWrap = l.overflowWrap || "break-word", g.style.wordBreak = l.wordBreak || "normal", g.style.lineHeight = l.lineHeight, g.textContent = d.length > 0 ? d : "\xA0", h.appendChild(g);
  }
  document.body.appendChild(h);
  const p = [];
  for (let d = 0; d < n; d += 1) {
    const g = h.children[d], m = (g == null ? void 0 : g.getBoundingClientRect().height) || (g == null ? void 0 : g.offsetHeight) || 0;
    p.push(m > 0 ? m : r);
  }
  return h.remove(), p;
}
function El(e, t, n) {
  if (n <= 0) return [];
  const r = xa(e), a = vl(e, n, r);
  return a ? a.map((i) => i > 0 ? i : r) : e.closest("pre") || e.tagName === "PRE" ? Ml(e, t, n, r) : jl(e, t, n, r);
}
function Br(e) {
  return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
}
function Ll(e, t) {
  if (e === t) return true;
  if (!e || !t || e.length !== t.length) return false;
  for (let n = 0; n < e.length; n += 1) if (Math.abs((e[n] ?? 0) - (t[n] ?? 0)) > 0.5) return false;
  return true;
}
function wa({ text: e, className: t, contentRootRef: n }) {
  const r = Yr(e), [a, i] = f.useState(r), [l, c] = f.useState(null), [h, p] = f.useState(null);
  f.useLayoutEffect(() => {
    const g = (n == null ? void 0 : n.current) ?? null, m = Br(g);
    if (!m) {
      i(r), c(null), p(null);
      return;
    }
    let x = 0, C = null;
    const k = () => {
      cancelAnimationFrame(x), x = requestAnimationFrame(() => {
        const I = Br((n == null ? void 0 : n.current) ?? null);
        if (!I) {
          i(r), c(null), p(null);
          return;
        }
        const w = wl(I, e), N = xa(I), O = El(I, e, w), A = O.length === w && O.every((P) => P > 0) ? O : null;
        i((P) => P === w ? P : w), p((P) => P === N ? P : N), c((P) => Ll(P, A) ? P : A);
      });
    };
    k(), C = new ResizeObserver(k), C.observe(m), g && g !== m && C.observe(g);
    const v = m.closest("pre");
    v && v !== m && v !== g && C.observe(v);
    const T = new MutationObserver(k);
    T.observe(m, { subtree: true, childList: true, characterData: true });
    const z = window.setTimeout(k, 0);
    return window.addEventListener(fr, k), window.addEventListener("resize", k), () => {
      cancelAnimationFrame(x), window.clearTimeout(z), C == null ? void 0 : C.disconnect(), T.disconnect(), window.removeEventListener(fr, k), window.removeEventListener("resize", k);
    };
  }, [e, r, n]);
  const d = h != null && h > 0 ? { lineHeight: `${h}px` } : void 0;
  return o.jsx("div", { className: ["haim-line-numbers", t].filter(Boolean).join(" "), style: d, "aria-hidden": true, children: Array.from({ length: a }, (g, m) => {
    const x = l == null ? void 0 : l[m], C = x != null && x > 0 ? { height: x, minHeight: x, maxHeight: x, lineHeight: h != null && h > 0 ? `${Math.min(h, x)}px` : void 0 } : void 0;
    return o.jsx("span", { className: "haim-line-numbers__n", style: C, children: m + 1 }, m);
  }) });
}
function Tl(e) {
  const n = Xs(String(e || ""))[0];
  return n ? { meta: n.meta ?? Qr(), grid: n.grid } : null;
}
function Nl(e, t) {
  return `${Ys(e)}
${Qs(t)}`;
}
function cu() {
  const e = Qr(), t = { rows: [["", "", ""], ["", "", ""], ["", "", ""]], aligns: [null, null, null] };
  return { meta: e, grid: t, text: Nl(e, t) };
}
const Il = "haim-table-edit-request";
function Al(e, t) {
  e.dispatchEvent(new CustomEvent(Il, { detail: t, bubbles: true }));
}
function $l({ node: e, editor: t, selected: n, getPos: r }) {
  const a = String(e.attrs.kind || "raw"), i = String(e.attrs.text || ""), l = t.isEditable, c = f.useRef(null), h = f.useMemo(() => {
    if (a !== "haim-table") return null;
    const d = Tl(i);
    return d ? ri(d.grid, d.meta) : null;
  }, [a, i]), p = () => {
    if (!l || a !== "haim-table") return;
    const d = typeof r == "function" ? r() : null;
    typeof d == "number" && Al(t.view.dom, { pos: d, text: i });
  };
  return a === "haim-table" && h ? o.jsx(me, { as: "div", className: `haim-raw-md haim-raw-md--haim-table${n ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": "haim-table", contentEditable: false, onDoubleClick: (d) => {
    d.preventDefault(), d.stopPropagation(), p();
  }, children: o.jsx("div", { className: "haim-haim-table-preview", dangerouslySetInnerHTML: { __html: h } }) }) : o.jsxs(me, { as: "div", className: `haim-raw-md${n ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": a, contentEditable: false, children: [o.jsx(wa, { text: i, className: "haim-raw-md__line-numbers", contentRootRef: c }), o.jsx("pre", { ref: c, className: "haim-raw-md__pre", children: i })] });
}
const Pl = Ee.create({ name: "rawMarkdownBlock", group: "block", atom: true, selectable: true, code: true, addAttributes() {
  return { text: { default: "" }, kind: { default: "raw" } };
}, parseHTML() {
  return [{ tag: "pre[data-haim-raw-md]", getAttrs: (e) => e instanceof HTMLElement ? { text: e.textContent || "", kind: e.getAttribute("data-kind") || "raw" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["pre", ge(t, { "data-haim-raw-md": "1", "data-kind": String(e.attrs.kind || "raw"), class: "haim-raw-md" }), String(e.attrs.text || "")];
}, addNodeView() {
  return Ue($l);
}, renderMarkdown: (e) => {
  var _a;
  const t = String(((_a = e.attrs) == null ? void 0 : _a.text) || "");
  return t ? t.endsWith(`
`) ? t : `${t}
` : "";
} }), Hl = Ee.create({ name: "deepHeading", group: "block", content: "inline*", defining: true, addAttributes() {
  return { level: { default: 7, parseHTML: (e) => {
    const t = Number(e.getAttribute("data-heading-level") || "7");
    return Number.isFinite(t) ? Math.min(10, Math.max(7, t)) : 7;
  } } };
}, addCommands() {
  return { setDeepHeading: (e) => ({ commands: t }) => {
    const n = Math.min(10, Math.max(7, Number(e.level) || 7));
    return t.setNode(this.name, { level: n });
  }, toggleDeepHeading: (e) => ({ commands: t }) => {
    const n = Math.min(10, Math.max(7, Number(e.level) || 7));
    return t.toggleNode(this.name, "paragraph", { level: n });
  } };
}, parseHTML() {
  return [{ tag: "h6[data-heading-level]", getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = Number(e.getAttribute("data-heading-level") || "0");
    return t < 7 || t > 10 ? false : { level: t };
  } }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const n = Number(e.attrs.level) || 7;
  return ["h6", ge(t, { "data-heading-level": String(n), class: `haim-deep-heading haim-h${n}` }), 0];
}, renderMarkdown: (e, t) => {
  var _a;
  const n = Number((_a = e.attrs) == null ? void 0 : _a.level) || 7, r = "#".repeat(Math.min(10, Math.max(7, n))), a = t.renderChildren(e.content || []);
  return `${r} ${a}

`;
} }), $ = { format: "\uC11C\uC2DD", heading: "\uC81C\uBAA9", block: "\uBE14\uB85D", insert: "\uC0BD\uC785", tool: "\uB3C4\uAD6C" };
function Dl(e, t) {
  if (t >= 1 && t <= 6) {
    e.chain().focus().toggleHeading({ level: t }).run();
    return;
  }
  if (t >= 7 && t <= 10) {
    const n = e.commands;
    if (typeof n.toggleDeepHeading == "function") {
      n.toggleDeepHeading({ level: t });
      return;
    }
    e.chain().focus().command(({ commands: r }) => r.toggleNode("deepHeading", "paragraph", { level: t })).run();
  }
}
function fe(e, t) {
  return { id: `heading-${e}`, title: `\uC81C\uBAA9 ${e}`, titleEn: `Heading ${e}`, keywords: [`h${e}`, `heading ${e}`, `heading${e}`, `\uC81C\uBAA9${e}`, `\uC81C\uBAA9 ${e}`, "#".repeat(e)], group: "heading", groupLabel: $.heading, Icon: t, run: ({ editor: n }) => {
    Dl(n, e);
  } };
}
const ya = [{ id: "bold", title: "\uAD75\uAC8C", titleEn: "Bold", keywords: ["bold", "\uAD75\uAC8C", "\uBCFC\uB4DC", "\uAC15\uC870", "strong"], group: "format", groupLabel: $.format, Icon: ho, run: ({ editor: e }) => {
  e.chain().focus().toggleBold().run();
} }, { id: "italic", title: "\uAE30\uC6B8\uC784", titleEn: "Italic", keywords: ["italic", "\uAE30\uC6B8\uC784", "\uC774\uD0E4\uB9AD", "em"], group: "format", groupLabel: $.format, Icon: fo, run: ({ editor: e }) => {
  e.chain().focus().toggleItalic().run();
} }, { id: "underline", title: "\uBC11\uC904", titleEn: "Underline", keywords: ["underline", "\uBC11\uC904", "\uC5B8\uB354\uB77C\uC778"], group: "format", groupLabel: $.format, Icon: po, run: ({ editor: e }) => {
  e.chain().focus().toggleUnderline().run();
} }, { id: "strike", title: "\uCDE8\uC18C\uC120", titleEn: "Strikethrough", keywords: ["strike", "strikethrough", "\uCDE8\uC18C\uC120", "\uC0AD\uC81C\uC120"], group: "format", groupLabel: $.format, Icon: mo, run: ({ editor: e }) => {
  e.chain().focus().toggleStrike().run();
} }, { id: "code", title: "\uC778\uB77C\uC778 \uCF54\uB4DC", titleEn: "Inline code", keywords: ["code", "inline code", "\uC778\uB77C\uC778 \uCF54\uB4DC", "\uCF54\uB4DC"], group: "format", groupLabel: $.format, Icon: go, run: ({ editor: e }) => {
  e.chain().focus().toggleCode().run();
} }, { id: "subscript", title: "\uC544\uB798 \uCCA8\uC790", titleEn: "Subscript", keywords: ["sub", "subscript", "\uC544\uB798\uCCA8\uC790", "\uC544\uB798 \uCCA8\uC790"], group: "format", groupLabel: $.format, Icon: xo, run: ({ editor: e }) => {
  e.chain().focus().toggleSubscript().run();
} }, { id: "superscript", title: "\uC704 \uCCA8\uC790", titleEn: "Superscript", keywords: ["sup", "superscript", "\uC704\uCCA8\uC790", "\uC704 \uCCA8\uC790"], group: "format", groupLabel: $.format, Icon: bo, run: ({ editor: e }) => {
  e.chain().focus().toggleSuperscript().run();
} }, fe(1, $o), fe(2, Po), fe(3, Ho), fe(4, Do), fe(5, Bo), fe(6, Ro), fe(7, st), fe(8, st), fe(9, st), fe(10, st), { id: "paragraph", title: "\uBCF8\uBB38", titleEn: "Paragraph", keywords: ["paragraph", "\uBCF8\uBB38", "\uD14D\uC2A4\uD2B8", "text", "p"], group: "block", groupLabel: $.block, Icon: yn, run: ({ editor: e }) => {
  e.chain().focus().setParagraph().run();
} }, { id: "bullet-list", title: "\uAE00\uBA38\uB9AC \uAE30\uD638 \uBAA9\uB85D", titleEn: "Bullet list", keywords: ["ul", "unordered", "bullet", "\uBAA9\uB85D", "\uB9AC\uC2A4\uD2B8", "\uAE00\uBA38\uB9AC"], group: "block", groupLabel: $.block, Icon: ko, run: ({ editor: e }) => {
  e.chain().focus().toggleBulletList().run();
} }, { id: "ordered-list", title: "\uBC88\uD638 \uBAA9\uB85D", titleEn: "Ordered list", keywords: ["ol", "ordered", "numbered", "\uBC88\uD638", "\uBC88\uD638 \uBAA9\uB85D"], group: "block", groupLabel: $.block, Icon: wo, run: ({ editor: e }) => {
  e.chain().focus().toggleOrderedList().run();
} }, { id: "task-list", title: "\uD560 \uC77C \uBAA9\uB85D", titleEn: "Task list", keywords: ["task", "todo", "checkbox", "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8", "\uD560 \uC77C", "\uCCB4\uD06C\uBC15\uC2A4", "check"], group: "block", groupLabel: $.block, Icon: gr, run: ({ editor: e }) => {
  e.chain().focus().toggleTaskList().run();
} }, { id: "status-task", title: "\uC0C1\uD0DC \uD560 \uC77C", titleEn: "Status task", keywords: ["status", "doing", "in progress", "\uC9C4\uD589", "\uC0C1\uD0DC", "\uC0C1\uD0DC \uCCB4\uD06C\uBC15\uC2A4", "~"], group: "block", groupLabel: $.block, Icon: gr, run: ({ editor: e }) => {
  const t = () => {
    e.chain().focus().command(({ tr: n, state: r, dispatch: a }) => {
      if (!a) return false;
      const i = r.selection.$from;
      for (let l = i.depth; l >= 0; l -= 1) if (i.node(l).type.name === "taskItem") return n.setNodeMarkup(i.before(l), void 0, { ...i.node(l).attrs, status: "doing", checked: false, kind: "status" }), a(n), true;
      return false;
    }).run();
  };
  e.isActive("taskList") || e.chain().focus().toggleTaskList().run(), t();
} }, { id: "blockquote", title: "\uC778\uC6A9", titleEn: "Quote", keywords: ["quote", "blockquote", "\uC778\uC6A9"], group: "block", groupLabel: $.block, Icon: yo, run: ({ editor: e }) => {
  e.chain().focus().toggleBlockquote().run();
} }, { id: "code-block", title: "\uCF54\uB4DC \uBE14\uB85D", titleEn: "Code block", keywords: ["code block", "fence", "\uCF54\uB4DC \uBE14\uB85D", "\uD39C\uC2A4"], group: "block", groupLabel: $.block, Icon: So, run: ({ editor: e }) => {
  e.chain().focus().toggleCodeBlock().run();
} }, { id: "link", title: "\uB9C1\uD06C", titleEn: "Link", keywords: ["link", "url", "\uB9C1\uD06C", "\uD558\uC774\uD37C\uB9C1\uD06C"], group: "insert", groupLabel: $.insert, Icon: xr, run: ({ editor: e, app: t }) => {
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
    e.chain().focus().extendMarkRange("link").setLink({ href: r }).run();
  }
} }, { id: "docuhaim-link", title: "\uB178\uD2B8 \uB9C1\uD06C", titleEn: "Note link", keywords: ["docuhaim", "note link", "\uB178\uD2B8 \uB9C1\uD06C", "vault link", "\uD30C\uC77C \uB9C1\uD06C"], group: "insert", groupLabel: $.insert, Icon: xr, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onDocuhaimNoteLink) == null ? void 0 : _a.call(e);
} }, { id: "table", title: "\uD45C", titleEn: "Table", keywords: ["table", "\uD45C", "\uD14C\uC774\uBE14"], group: "insert", groupLabel: $.insert, Icon: Co, run: ({ editor: e }) => {
  e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
} }, { id: "mermaid", title: "Mermaid", titleEn: "Mermaid diagram", keywords: ["mermaid", "diagram", "\uB2E4\uC774\uC5B4\uADF8\uB7A8", "flowchart", "\uADF8\uB798\uD504"], group: "insert", groupLabel: $.insert, Icon: vo, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertMermaid) {
    t.onInsertMermaid();
    return;
  }
  e.chain().focus().insertContent("```mermaid\ngraph TD\n  A-->B\n```\n", { contentType: "markdown" }).run();
} }, { id: "katex", title: "\uC218\uC2DD", titleEn: "Math / KaTeX", keywords: ["math", "katex", "latex", "\uC218\uC2DD", "\uACF5\uC2DD", "formula"], group: "insert", groupLabel: $.insert, Icon: jo, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertKatex) {
    t.onInsertKatex();
    return;
  }
  const n = e.commands;
  if (typeof n.insertBlockMath == "function") {
    n.insertBlockMath({ latex: "E=mc^2" });
    return;
  }
  e.chain().focus().insertContent('<div data-type="block-math" data-latex="E=mc^2"></div>').run();
} }, { id: "page-break", title: "\uD398\uC774\uC9C0 \uB098\uB214", titleEn: "Page break", keywords: ["pgbr", "page break", "\uD398\uC774\uC9C0 \uB098\uB214", "\uC778\uC1C4"], group: "insert", groupLabel: $.insert, Icon: Mo, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertPageBreak) {
    t.onInsertPageBreak();
    return;
  }
  e.chain().focus().setPageBreak().run();
} }, { id: "image-link", title: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C", titleEn: "Image link", keywords: ["image", "\uC774\uBBF8\uC9C0", "wiki image", "\uC774\uBBF8\uC9C0 \uB9C1\uD06C", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: Mt, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onImageLink) == null ? void 0 : _a.call(e);
} }, { id: "image-upload", title: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC", titleEn: "Upload image", keywords: ["image", "upload", "\uC774\uBBF8\uC9C0", "\uC5C5\uB85C\uB4DC", "\uC0AC\uC9C4", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: Mt, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onImageUpload) == null ? void 0 : _a.call(e);
} }, { id: "image-clip", title: "\uC774\uBBF8\uC9C0 \uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC", titleEn: "Crop & upload image", keywords: ["image", "crop", "clip", "\uC790\uB974\uAE30", "\uD06C\uB86D", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: Mt, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onImageClip) == null ? void 0 : _a.call(e);
} }, { id: "whiteboard", title: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30", titleEn: "Create whiteboard", keywords: ["whiteboard", "\uD654\uC774\uD2B8\uBCF4\uB4DC", "\uCE94\uBC84\uC2A4", "canvas", "picture"], group: "insert", groupLabel: $.insert, Icon: Mt, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onCreateWhiteboard) == null ? void 0 : _a.call(e);
} }, { id: "qrcode", title: "QRCode \uB9CC\uB4E4\uAE30", titleEn: "Create QR code", keywords: ["qr", "qrcode", "\uD050\uC54C", "\uD050\uC54C\uCF54\uB4DC"], group: "insert", groupLabel: $.insert, Icon: Eo, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onCreateQrCode) == null ? void 0 : _a.call(e);
} }, { id: "undo", title: "\uC2E4\uD589 \uCDE8\uC18C", titleEn: "Undo", keywords: ["undo", "revoke", "\uC2E4\uD589\uCDE8\uC18C", "\uB418\uB3CC\uB9AC\uAE30"], group: "tool", groupLabel: $.tool, Icon: Jr, run: ({ editor: e }) => {
  e.chain().focus().undo().run();
} }, { id: "redo", title: "\uB2E4\uC2DC \uC2E4\uD589", titleEn: "Redo", keywords: ["redo", "next", "\uB2E4\uC2DC\uC2E4\uD589"], group: "tool", groupLabel: $.tool, Icon: Zr, run: ({ editor: e }) => {
  e.chain().focus().redo().run();
} }, { id: "heading-remap", title: "\uC81C\uBAA9 \uC218\uC900 \uC7AC\uB9E4\uD551", titleEn: "Remap heading levels", keywords: ["heading remap", "\uC81C\uBAA9 \uBCC0\uACBD", "\uD5E4\uB529", "\uC81C\uBAA9\uB9AC\uB9F5", "\uD5E4\uB529\uB9AC\uB9E4\uD551"], group: "tool", groupLabel: $.tool, Icon: st, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onHeadingRemap) == null ? void 0 : _a.call(e);
} }, { id: "checklist-progress", title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", titleEn: "Checklist progress", keywords: ["checklist", "progress", "\uC9C4\uD589\uB960", "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8"], group: "tool", groupLabel: $.tool, Icon: Lo, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onChecklistProgress) == null ? void 0 : _a.call(e);
} }, { id: "llm-assist", title: "AI \uB3C4\uC6B0\uBBF8", titleEn: "AI assistant", keywords: ["ai", "llm", "gemini", "openai", "\uC778\uACF5\uC9C0\uB2A5", "\uB3C4\uC6B0\uBBF8"], group: "tool", groupLabel: $.tool, Icon: To, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onLlmAssist) == null ? void 0 : _a.call(e);
} }, { id: "export-pdf", title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", titleEn: "Export PDF", keywords: ["export", "pdf", "\uC778\uC1C4", "print", "\uB0B4\uBCF4\uB0B4\uAE30"], group: "tool", groupLabel: $.tool, Icon: No, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onExportPdf) == null ? void 0 : _a.call(e);
} }, { id: "find-replace", title: "\uCC3E\uAE30/\uBC14\uAFB8\uAE30", titleEn: "Find and replace", keywords: ["find", "replace", "search", "\uCC3E\uAE30", "\uBC14\uAFB8\uAE30", "\uAC80\uC0C9"], group: "tool", groupLabel: $.tool, Icon: ea, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onFindReplaceToggle) == null ? void 0 : _a.call(e);
} }, { id: "invisible-chars", title: "\uBE44\uAC00\uC2DC \uBB38\uC790", titleEn: "Invisible characters", keywords: ["invisible", "whitespace", "\uBE44\uAC00\uC2DC", "\uACF5\uBC31", "pilcrow", "\xB6"], group: "tool", groupLabel: $.tool, Icon: Io, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onInvisibleCharsToggle) == null ? void 0 : _a.call(e);
} }, { id: "toc", title: "\uBAA9\uCC28", titleEn: "Table of contents", keywords: ["toc", "catalog", "\uBAA9\uCC28", "outline"], group: "tool", groupLabel: $.tool, Icon: Ao, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onTocToggle) == null ? void 0 : _a.call(e);
} }];
function Rr(e) {
  return e.normalize("NFKC").toLowerCase();
}
function Bl(e, t = ya) {
  const n = Rr(e).trim();
  if (!n) return [...t];
  const r = n.split(/\s+/).filter(Boolean);
  return t.filter((a) => {
    const i = Rr([a.id, a.title, a.titleEn, ...a.keywords].join(`
`));
    return r.every((l) => i.includes(l));
  });
}
const Rl = f.forwardRef(function({ items: t, command: n }, r) {
  const [a, i] = f.useState(0), l = f.useRef(null), c = f.useRef([]);
  if (f.useEffect(() => {
    i(0);
  }, [t]), f.useLayoutEffect(() => {
    var _a;
    (_a = c.current[a]) == null ? void 0 : _a.scrollIntoView({ block: "nearest" });
  }, [a, t]), f.useImperativeHandle(r, () => ({ onKeyDown: ({ event: p }) => {
    if (t.length === 0 || p.shiftKey || p.altKey || p.metaKey || p.ctrlKey) return false;
    if (p.key === "ArrowUp") return i((d) => (d + t.length - 1) % t.length), true;
    if (p.key === "ArrowDown") return i((d) => (d + 1) % t.length), true;
    if (p.key === "Enter") {
      const d = t[a];
      return d && n(d), true;
    }
    return false;
  } })), t.length === 0) return o.jsx("div", { className: "w-[min(92vw,300px)] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-muted", role: "listbox", "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839", children: "\uACB0\uACFC \uC5C6\uC74C" });
  let h = "";
  return o.jsx("div", { ref: l, className: "flex max-h-[min(60vh,360px)] w-[min(92vw,300px)] flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface", role: "listbox", "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839", children: t.map((p, d) => {
    const g = p.groupLabel !== h;
    h = p.groupLabel;
    const m = p.Icon, x = d === a;
    return o.jsxs("div", { children: [g ? o.jsx("div", { className: "px-2.5 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-odp-muted", children: p.groupLabel }) : null, o.jsxs("button", { type: "button", ref: (C) => {
      c.current[d] = C;
    }, role: "option", "aria-selected": x, className: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm ${x ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-800 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-bgSoft"}`, onMouseEnter: () => i(d), onClick: () => {
      n(p);
    }, children: [o.jsx(m, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), o.jsx("span", { className: "min-w-0 flex-1 truncate font-medium", children: p.title }), o.jsx("span", { className: "shrink-0 truncate text-xs text-gray-400 dark:text-odp-muted", children: p.titleEn })] })] }, p.id);
  }) });
}), zr = new qe("haimSlashCommands");
function zl(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n).type.name;
    if (r === "codeBlock" || r === "rawMarkdownBlock") return true;
  }
  return false;
}
function Or(e, t) {
  zs.flushSync(() => {
    e.root.render(f.createElement(Rl, { ref: (n) => {
      e.listRef.current = n;
    }, items: t.items, command: (n) => {
      t.command(n);
    } }));
  });
}
const Ol = pt.create({ name: "haimSlashCommands", addStorage() {
  return { getAppActions: () => null };
}, addProseMirrorPlugins() {
  return [os({ pluginKey: zr, editor: this.editor, char: "/", allowSpaces: true, startOfLine: false, allowedPrefixes: [" "], decorationClass: "haim-slash-decoration", placement: "bottom-start", offset: { mainAxis: 6, crossAxis: 0 }, dismissOnOutsideClick: true, floatingUi: { strategy: "fixed" }, initialItems: [...ya], allow: ({ state: e, editor: t }) => t.isEditable && !zl(e), items: ({ query: e }) => Bl(e), command: ({ editor: e, range: t, props: n }) => {
    var _a, _b;
    e.chain().focus().deleteRange(t).run();
    const r = ((_b = (_a = e.storage.haimSlashCommands) == null ? void 0 : _a.getAppActions) == null ? void 0 : _b.call(_a)) ?? null;
    n.run({ editor: e, app: r });
  }, render: () => {
    let e = null;
    return { onStart: (t) => {
      const n = document.createElement("div");
      n.className = "haim-slash-menu-root", n.style.zIndex = "100010";
      const r = { current: null }, a = Rs.createRoot(n);
      e = { el: n, root: a, listRef: r, unmountFloating: null }, Or(e, t), e.unmountFloating = t.mount(n);
    }, onUpdate: (t) => {
      e && Or(e, t);
    }, onKeyDown: (t) => {
      var _a;
      return t.event.key === "Escape" ? (is(t.view, zr), true) : ((_a = e == null ? void 0 : e.listRef.current) == null ? void 0 : _a.onKeyDown(t)) ?? false;
    }, onExit: () => {
      var _a;
      const t = e;
      e = null, (_a = t == null ? void 0 : t.unmountFloating) == null ? void 0 : _a.call(t), (t == null ? void 0 : t.root) && queueMicrotask(() => {
        t.root.unmount();
      });
    } };
  } })];
} });
function _l(e, t) {
  try {
    const n = e.domAtPos(t), r = n.node instanceof Element ? n.node : n.node.parentElement;
    if (!r) return 22;
    const a = window.getComputedStyle(r), i = parseFloat(a.lineHeight);
    if (Number.isFinite(i) && i > 0) return i;
    const l = parseFloat(a.fontSize);
    if (Number.isFinite(l) && l > 0) return l * 1.4;
  } catch {
  }
  return 22;
}
function kn(e) {
  for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
  return -1;
}
function Fl(e, t, n, r) {
  const a = kn(t);
  if (a < 0) return null;
  const i = n === "down" ? 1 : -1, l = n === "down" ? t.after(a) : t.before(a);
  let c;
  try {
    c = _.near(t.doc.resolve(Math.max(0, Math.min(t.doc.content.size, l))), i).head;
  } catch {
    return null;
  }
  const h = t.doc.resolve(c);
  if (kn(h) === a) {
    const p = h.before(kn(h)), d = t.before(a);
    if (p === d) return null;
  }
  try {
    const p = e.coordsAtPos(c), d = (p.top + p.bottom) / 2, g = e.posAtCoords({ left: r, top: d });
    if (g && g.pos !== t.pos) return g.pos;
  } catch {
  }
  return c !== t.pos ? c : null;
}
function _r(e, t) {
  const { state: n } = e, { selection: r, doc: a } = n, i = t === "down" ? 1 : -1;
  let l = r.anchor, c = r.head;
  if (r instanceof Ur) {
    const x = _.near(a.resolve(t === "down" ? r.to : r.from), i);
    l = x.anchor, c = x.head;
  }
  let h;
  try {
    h = e.coordsAtPos(c);
  } catch {
    h = { left: 0, top: 0, bottom: 22 };
  }
  const p = _l(e, c), d = h.left;
  let g = c;
  const m = [0.2, 0.55, 1, 1.5, 2, 2.75, 3.5];
  for (const x of m) {
    const C = t === "down" ? h.bottom + Math.max(2, p * x) : h.top - Math.max(2, p * x);
    let k = null;
    try {
      k = e.posAtCoords({ left: d, top: C });
    } catch {
      k = null;
    }
    if (k) {
      if (t === "down" && k.pos > c) {
        g = k.pos;
        break;
      }
      if (t === "up" && k.pos < c) {
        g = k.pos;
        break;
      }
    }
  }
  if (g === c) {
    const x = Fl(e, a.resolve(c), t, d);
    x != null && (g = x);
  }
  if (g === c) {
    const x = Math.max(1, Math.min(a.content.size, c + i));
    if (x !== c) try {
      g = _.near(a.resolve(x), i).head;
    } catch {
      return false;
    }
  }
  if (g = Math.max(0, Math.min(a.content.size, g)), g === c) return false;
  try {
    const x = n.tr.setSelection(_.create(a, l, g));
    return x.scrollIntoView(), e.dispatch(x), true;
  } catch {
    try {
      const x = _.near(a.resolve(g), i), C = n.tr.setSelection(_.create(a, l, x.head));
      return C.scrollIntoView(), e.dispatch(C), true;
    } catch {
      return false;
    }
  }
}
const Kl = pt.create({ name: "haimShiftArrowSelect", priority: 1e3, addKeyboardShortcuts() {
  return { "Shift-ArrowDown": ({ editor: e }) => _r(e.view, "down"), "Shift-ArrowUp": ({ editor: e }) => _r(e.view, "up") };
} });
function Wl(e) {
  for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
  return -1;
}
function ql(e, t) {
  const { state: n } = e, r = n.schema.nodes.paragraph;
  if (!r) return false;
  const a = n.selection.$head, i = Wl(a);
  if (i < 0) return false;
  const l = a.before(i), c = r.createAndFill();
  if (!c) return false;
  let h = n.tr.insert(l, c);
  try {
    h = h.setSelection(_.near(h.doc.resolve(l + 1)));
  } catch {
    return false;
  }
  return h.scrollIntoView(), (0, e.dispatch)(h), true;
}
const Ul = pt.create({ name: "haimInsertLineAbove", priority: 1e3, addKeyboardShortcuts() {
  return { "Mod-Shift-Enter": ({ editor: e }) => ql(e.view) };
} }), Vl = Ee.create({ name: "mathBlock", group: "block", atom: true, code: true, addAttributes() {
  return { latex: { default: "" }, display: { default: true } };
}, parseHTML() {
  return [{ tag: "div[data-haim-math]", getAttrs: (e) => e instanceof HTMLElement ? { latex: e.getAttribute("data-latex") || e.textContent || "", display: e.getAttribute("data-display") !== "false" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["div", ge(t, { "data-haim-math": "1", "data-latex": String(e.attrs.latex || ""), "data-display": e.attrs.display ? "true" : "false", class: "haim-math-block" }), String(e.attrs.latex || "")];
}, renderMarkdown: (e) => {
  var _a, _b;
  const t = String(((_a = e.attrs) == null ? void 0 : _a.latex) || "").trim();
  return t ? ((_b = e.attrs) == null ? void 0 : _b.display) ? `$$
${t}
$$

` : `$${t}$

` : "";
} });
function Fr({ label: e, onClick: t, children: n }) {
  return o.jsxs(Pt, { children: [o.jsx(Ht, { asChild: true, children: o.jsx("button", { type: "button", className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft", "aria-label": e, onClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, children: n }) }), o.jsx(Dt, { children: o.jsxs(Bt, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [e, o.jsx(Rt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Sa(e, t) {
  const [n, r] = f.useState(null), [a, i] = f.useState(false);
  return f.useEffect(() => {
    const l = String(e || "").trim();
    if (!l) {
      r(null), i(false);
      return;
    }
    try {
      const c = ai.renderToString(l, { throwOnError: false, displayMode: t, output: "html" });
      r(c), i(false);
    } catch {
      r(null), i(true);
    }
  }, [e, t]), { html: n, error: a };
}
function Xl({ node: e, updateAttributes: t, editor: n, selected: r }) {
  const a = String(e.attrs.latex || ""), i = n.isEditable, [l, c] = f.useState(false), [h, p] = f.useState(a), d = f.useRef(null), { html: g, error: m } = Sa(a, true);
  f.useEffect(() => {
    p(a);
  }, [a]), f.useEffect(() => {
    var _a;
    l && ((_a = d.current) == null ? void 0 : _a.focus());
  }, [l]);
  const x = () => {
    const k = h.trim();
    t({ latex: k || a }), c(false);
  }, C = () => {
    p(a), c(false);
  };
  return l && i ? o.jsxs(me, { as: "div", className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`, "data-type": "block-math", contentEditable: false, children: [o.jsx("textarea", { ref: d, className: "haim-math-block__textarea", value: h, rows: Math.min(8, Math.max(2, h.split(`
`).length + 1)), onChange: (k) => p(k.target.value), onBlur: x, onKeyDown: (k) => {
    k.key === "Escape" && (k.preventDefault(), C()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), x()), k.stopPropagation();
  }, spellCheck: false }), o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: o.jsx("div", { className: "haim-math-block__toolbar", children: o.jsx(Fr, { label: "\uBBF8\uB9AC\uBCF4\uAE30", onClick: x, children: o.jsx(ta, { size: 14, "aria-hidden": true }) }) }) })] }) : o.jsxs(me, { as: "div", className: `haim-math-block${r ? " is-selected" : ""}${m ? " haim-math-block--error" : ""}`, "data-type": "block-math", "data-latex": a, contentEditable: false, onDoubleClick: () => {
    i && c(true);
  }, children: [o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: i ? o.jsx("div", { className: "haim-math-block__toolbar", children: o.jsx(Fr, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => c(true), children: o.jsx(na, { size: 14, "aria-hidden": true }) }) }) : null }), g ? o.jsx("div", { className: "haim-math-block__render", dangerouslySetInnerHTML: { __html: g } }) : o.jsx("div", { className: "haim-math-block__fallback", children: a || "\u2026" })] });
}
function Yl({ node: e, updateAttributes: t, editor: n, selected: r }) {
  const a = String(e.attrs.latex || ""), i = n.isEditable, [l, c] = f.useState(false), [h, p] = f.useState(a), d = f.useRef(null), { html: g, error: m } = Sa(a, false);
  f.useEffect(() => {
    p(a);
  }, [a]), f.useEffect(() => {
    var _a;
    l && ((_a = d.current) == null ? void 0 : _a.focus());
  }, [l]);
  const x = () => {
    const k = h.trim();
    t({ latex: k || a }), c(false);
  }, C = () => {
    p(a), c(false);
  };
  return l && i ? o.jsx(me, { as: "span", className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`, "data-type": "inline-math", contentEditable: false, children: o.jsx("input", { ref: d, type: "text", className: "haim-math-inline__input", value: h, onChange: (k) => p(k.target.value), onBlur: x, onKeyDown: (k) => {
    k.key === "Enter" && (k.preventDefault(), x()), k.key === "Escape" && (k.preventDefault(), C()), k.stopPropagation();
  }, spellCheck: false }) }) : o.jsx(me, { as: "span", className: `haim-math-inline${r ? " is-selected" : ""}${m ? " haim-math-inline--error" : ""}`, "data-type": "inline-math", "data-latex": a, contentEditable: false, onDoubleClick: (k) => {
    k.preventDefault(), k.stopPropagation(), i && c(true);
  }, children: g ? o.jsx("span", { dangerouslySetInnerHTML: { __html: g } }) : o.jsx("span", { className: "haim-math-inline__fallback", children: a || "?" }) });
}
const Ql = ls.extend({ addNodeView() {
  return Ue(Xl);
} }).configure({ katexOptions: { throwOnError: false, displayMode: true } }), Gl = cs.extend({ addNodeView() {
  return Ue(Yl);
} }).configure({ katexOptions: { throwOnError: false, displayMode: false } }), Ot = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"', "`": "`" }, Jl = /* @__PURE__ */ new Set(["js", "javascript", "jsx", "mjs", "cjs", "ts", "typescript", "tsx"]), Ca = new Set(Object.values(Ot)), Zl = new qe("haimCodeBlockBracketPairs");
function We(e, t) {
  return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
}
function Nn(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
}
function In(e) {
  return Jl.has(String(e || "").trim().toLowerCase());
}
function va(e) {
  const { $from: t, $to: n } = e.selection;
  return t.parent.type.name !== "codeBlock" || n.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === n.before(n.depth);
}
function ec(e) {
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
  const { key: t, code: n } = e;
  return t === "`" || n === "Backquote" && !e.shiftKey ? "`" : t in Ot || Ca.has(t) ? t : n === "Quote" ? e.shiftKey ? '"' : "'" : null;
}
function Kr(e) {
  return e ? /[\w$]/.test(e) : false;
}
function tc(e, t) {
  const { from: n } = e.selection, r = We(e, n - 1), a = We(e, n);
  return !(Kr(r) || Kr(a) || a === t);
}
function nc(e, t) {
  if (!va(e) || t === "`" && !In(Nn(e))) return null;
  const { selection: n } = e, { from: r, to: a, empty: i } = n, l = Ot[t];
  if (l !== void 0) {
    if (!i) {
      const h = e.doc.textBetween(r, a), p = e.tr.insertText(`${t}${h}${l}`, r, a);
      return p.setSelection(_.create(p.doc, r + t.length, r + t.length + h.length)), p;
    }
    if ((t === "'" || t === '"' || t === "`") && !tc(e, t)) return We(e, r) === t ? e.tr.setSelection(_.create(e.doc, r + 1)) : null;
    const c = e.tr.insertText(`${t}${l}`, r, a);
    return c.setSelection(_.create(c.doc, r + t.length)), c;
  }
  return Ca.has(t) && i && We(e, r) === t ? t === "`" && !In(Nn(e)) ? null : e.tr.setSelection(_.create(e.doc, r + 1)) : null;
}
function rc(e) {
  if (!va(e)) return null;
  const { selection: t } = e;
  if (!t.empty) return null;
  const { from: n } = t, r = We(e, n - 1), a = We(e, n), i = Ot[r];
  return !i || a !== i || r === "`" && !In(Nn(e)) ? null : e.tr.delete(n - 1, n + 1);
}
function ac(e, t) {
  if (t.defaultPrevented) return false;
  if (t.key === "Backspace") {
    if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
    const a = rc(e.state);
    return a ? (e.dispatch(a), true) : false;
  }
  const n = ec(t);
  if (!n) return false;
  const r = nc(e.state, n);
  return r ? (e.dispatch(r), true) : false;
}
function sc() {
  return new ft({ key: Zl, props: { handleKeyDown(e, t) {
    return ac(e, t);
  } } });
}
function oc(e) {
  var _a;
  return ((_a = String(e ?? "").match(/^[ \t]*/)) == null ? void 0 : _a[0]) ?? "";
}
function $t(e) {
  return /^[ \t]*$/.test(String(e ?? ""));
}
function ja(e) {
  const t = String(e ?? "").split(`
`);
  return t.length < 2 ? false : $t(t[t.length - 1]) && $t(t[t.length - 2]);
}
function _t(e) {
  const t = String(e ?? "").split(`
`);
  let n = 0, r = t.length;
  for (; n < r && $t(t[n]); ) n += 1;
  for (; r > n && $t(t[r - 1]); ) r -= 1;
  return t.slice(n, r).join(`
`);
}
function ic(e, t) {
  const n = String(e ?? ""), r = Math.max(0, Math.min(t, n.length)), a = n.lastIndexOf(`
`, r - 1) + 1, i = n.indexOf(`
`, r), l = n.slice(a, i === -1 ? n.length : i);
  return oc(l);
}
function Ft(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function lc(e) {
  if (!Ft(e)) return null;
  const { $from: t, from: n, to: r } = e.selection, a = t.parent.textContent, l = `
${ic(a, t.parentOffset)}`, c = e.tr.insertText(l, n, r);
  return c.setSelection(_.create(c.doc, n + l.length)), c;
}
function cc(e) {
  if (!Ft(e)) return null;
  const { $from: t } = e.selection, n = t.parent.textContent, r = t.parentOffset, a = n.lastIndexOf(`
`, r - 1) + 1, i = t.start() + a, l = e.tr.insertText(`
`, i);
  return l.setSelection(_.create(l.doc, i)), l;
}
function uc(e) {
  if (!Ft(e)) return null;
  const { $from: t, empty: n } = e.selection;
  if (!n || !(t.parentOffset === t.parent.nodeSize - 2)) return null;
  const a = t.parent.textContent;
  if (!ja(a)) return null;
  const i = _t(a), l = t.start(), c = t.end(), h = e.tr.insertText(i, l, c);
  return h.setSelection(_.create(h.doc, l + i.length)), h;
}
function dc(e, t) {
  const { $from: n, empty: r } = t.selection;
  if (!r || n.parent.type.name !== "codeBlock" || n.parentOffset !== n.parent.nodeSize - 2) return false;
  const a = n.parent.textContent;
  if (!ja(a)) return false;
  const i = _t(a), l = n.start(), c = n.end();
  return e.insertText(i, l, c), e.setSelection(_.create(e.doc, l + i.length)), true;
}
function hc(e) {
  const { state: t } = e;
  if (!Ft(t)) return false;
  if (uc(t)) return e.chain().command(({ tr: r, state: a }) => dc(r, a)).exitCode().run();
  const n = lc(t);
  return n ? (e.view.dispatch(n), true) : false;
}
function fc(e) {
  const t = cc(e.state);
  return t ? (e.view.dispatch(t), true) : false;
}
const pc = new qe("haimCodeBlockIndent");
function mc(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
}
function Rn(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function Ma(e, t, n) {
  const r = e.doc.resolve(t);
  if (r.parent.type.name !== "codeBlock") return [];
  const a = r.start(), i = r.end(), c = e.doc.textBetween(a, i, `
`, `
`).split(`
`), h = [];
  let p = a;
  for (let d = 0; d < c.length; d += 1) {
    const g = c[d] ?? "", m = d < c.length - 1 ? p + g.length + 1 : i;
    t < m && n > p && h.push(p), p = m;
  }
  return h;
}
function Wr(e, t) {
  var _a;
  const n = ((_a = e.match(/^ */)) == null ? void 0 : _a[0]) ?? "";
  return Math.min(n.length, t);
}
function gc(e, t) {
  if (!Rn(e)) return null;
  const n = Math.max(1, Math.round(t)), r = " ".repeat(n), { selection: a } = e, { from: i, to: l, empty: c } = a;
  if (c) {
    const m = e.tr.insertText(r, i);
    return m.setSelection(_.create(m.doc, i + r.length)), m;
  }
  const h = Ma(e, i, l);
  if (h.length === 0) return null;
  const p = e.tr;
  for (let m = h.length - 1; m >= 0; m -= 1) p.insertText(r, h[m]);
  const d = h[0], g = p.mapping.map(l);
  return p.setSelection(_.create(p.doc, d, g)), p;
}
function xc(e, t) {
  var _a;
  if (!Rn(e)) return null;
  const n = Math.max(1, Math.round(t)), { selection: r, doc: a } = e, { $from: i, empty: l } = r;
  if (l) {
    const w = i.start(), N = i.end(), A = a.textBetween(w, N, `
`, `
`).split(`
`), P = i.pos - w;
    let U = 0, ie = 0;
    for (let H = 0; H < A.length; H += 1) {
      const F = A[H] ?? "";
      if (ie + F.length >= P) {
        U = H;
        break;
      }
      ie += F.length + 1, H === A.length - 1 && (U = H);
    }
    const Ae = A[U] ?? "", ee = Wr(Ae, n);
    if (ee === 0) return e.tr;
    let E = w;
    for (let H = 0; H < U; H += 1) E += (((_a = A[H]) == null ? void 0 : _a.length) ?? 0) + 1;
    const L = e.tr.delete(E, E + ee);
    return i.pos - E <= ee ? L.setSelection(_.create(L.doc, E)) : L.setSelection(_.create(L.doc, i.pos - ee)), L;
  }
  const { from: c, to: h } = r, p = Ma(e, c, h);
  if (p.length === 0) return null;
  const d = i.start(), g = i.end(), x = a.textBetween(d, g, `
`, `
`).split(`
`), C = /* @__PURE__ */ new Map();
  {
    let w = d;
    for (let N = 0; N < x.length; N += 1) {
      const O = x[N] ?? "";
      C.set(w, O), w += O.length + (N < x.length - 1 ? 1 : 0);
    }
  }
  const k = e.tr;
  let v = 0, T = 0;
  for (let w = p.length - 1; w >= 0; w -= 1) {
    const N = p[w], O = C.get(N) ?? "", A = Wr(O, n);
    A !== 0 && (k.delete(N, N + A), T += A, N < c && (v += A));
  }
  if (T === 0) return k;
  const z = Math.max(p[0], c - v), I = k.mapping.map(h);
  return k.setSelection(_.create(k.doc, z, Math.max(z, I))), k;
}
function bc(e, t) {
  if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !Rn(e.state)) return false;
  const n = mc(e.state), r = si(n, oi()), a = t.shiftKey ? xc(e.state, r) : gc(e.state, r);
  return a ? (e.dispatch(a), true) : false;
}
function kc() {
  return new ft({ key: pc, props: { handleKeyDown(e, t) {
    return bc(e, t);
  } } });
}
function qr(e) {
  return String(e || "").trim().toLowerCase() === "mermaid";
}
function wc(e) {
  var _a;
  return e && (((_a = e.closest(".haim-editor")) == null ? void 0 : _a.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
}
const Ea = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", yc = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Sc = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
function An({ label: e, onClick: t, active: n = false, expanded: r, children: a }) {
  return o.jsxs(Pt, { children: [o.jsx(Ht, { asChild: true, children: o.jsx("button", { type: "button", className: `haim-code-block__action${n ? " is-copy-success" : ""}`, "aria-label": e, ...r !== void 0 ? { "aria-expanded": r } : {}, onClick: t, children: a }) }), o.jsx(Dt, { children: o.jsxs(Bt, { side: "bottom", sideOffset: 6, className: Ea, children: [e, o.jsx(Rt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Cc({ language: e, onChange: t }) {
  const n = f.useId(), r = f.useRef(null), [a, i] = f.useState(false), [l, c] = f.useState(""), [h, p] = f.useState(0), d = ii(e), g = li(e), m = ci(e), x = ui(d, l), C = l.trim(), k = C.toLowerCase() === "plain" ? di : C, T = !!C && !x.some((w) => w.value.toLowerCase() === k.toLowerCase() || w.label.toLowerCase() === C.toLowerCase()) ? [{ value: k, label: C, custom: true }, ...x.map((w) => ({ ...w, custom: false }))] : x.map((w) => ({ ...w, custom: false }));
  f.useEffect(() => {
    if (!a) return;
    c(""), p(0);
    const w = window.setTimeout(() => {
      var _a;
      return (_a = r.current) == null ? void 0 : _a.focus();
    }, 0);
    return () => window.clearTimeout(w);
  }, [a]), f.useEffect(() => {
    p(0);
  }, [l]);
  const z = f.useCallback((w) => {
    t(hi(w)), i(false);
  }, [t]), I = (w) => {
    if (w.key === "ArrowDown") {
      if (w.preventDefault(), !T.length) return;
      p((N) => (N + 1) % T.length);
      return;
    }
    if (w.key === "ArrowUp") {
      if (w.preventDefault(), !T.length) return;
      p((N) => (N - 1 + T.length) % T.length);
      return;
    }
    if (w.key === "Enter") {
      w.preventDefault();
      const N = T[h] ?? T[0];
      N ? z(N.value) : C && z(k);
      return;
    }
    w.key === "Escape" && (w.preventDefault(), i(false));
  };
  return o.jsxs(Vo, { open: a, onOpenChange: i, children: [o.jsxs(Pt, { children: [o.jsx(Ht, { asChild: true, children: o.jsx(Xo, { asChild: true, children: o.jsxs("button", { type: "button", className: "haim-code-block__lang-trigger", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", "aria-haspopup": "listbox", "aria-expanded": a, onPointerDown: (w) => w.stopPropagation(), children: [o.jsx("span", { className: "haim-code-block__lang-label", children: m }), o.jsx("span", { className: "haim-code-block__lang-chevron", children: o.jsx(aa, { size: 12, "aria-hidden": true }) })] }) }) }), o.jsx(Dt, { children: o.jsxs(Bt, { side: "bottom", sideOffset: 6, className: Ea, children: ["\uC5B8\uC5B4 \uAC80\uC0C9", o.jsx(Rt, { className: "fill-white dark:fill-odp-surface" })] }) })] }), o.jsx(Yo, { children: o.jsxs(Qo, { className: yc, side: "bottom", align: "start", sideOffset: 4, onOpenAutoFocus: (w) => w.preventDefault(), onCloseAutoFocus: (w) => w.preventDefault(), onPointerDown: (w) => w.stopPropagation(), children: [o.jsxs("div", { className: "flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong", children: [o.jsx(ea, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }), o.jsx("input", { ref: r, type: "text", value: l, onChange: (w) => c(w.target.value), onKeyDown: I, placeholder: "\uC5B8\uC5B4 \uAC80\uC0C9\u2026", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4 \uAC80\uC0C9", "aria-controls": n, "aria-autocomplete": "list", autoComplete: "off", spellCheck: false, className: "min-w-0 flex-1 bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-odp-fg" })] }), o.jsx("ul", { id: n, role: "listbox", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", className: "max-h-56 overflow-y-auto p-1", children: T.length === 0 ? o.jsx("li", { className: "cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uC77C\uCE58\uD558\uB294 \uC5B8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : T.map((w, N) => {
    const O = w.value === g, A = N === h;
    return o.jsx("li", { role: "presentation", children: o.jsxs("button", { type: "button", role: "option", "aria-selected": O, "data-highlighted": A ? "true" : "false", className: Sc, onMouseEnter: () => p(N), onMouseDown: (P) => P.preventDefault(), onClick: () => z(w.value), children: [O ? o.jsx("span", { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(ra, { size: 12, "aria-hidden": true }) }) : null, w.custom ? o.jsxs("span", { children: ["\uC0AC\uC6A9: ", o.jsx("span", { className: "font-mono", children: w.label })] }) : w.label] }) }, `${w.custom ? "custom:" : ""}${w.value}`);
  }) })] }) })] });
}
function vc({ language: e, collapsed: t, copied: n, editable: r, onCopy: a, onToggleCollapse: i, onLanguageChange: l, extra: c }) {
  return o.jsxs("div", { className: "haim-code-block__header", children: [r && l ? o.jsx(Cc, { language: e, onChange: l }) : o.jsx("span", { className: "haim-code-block__lang", children: e || "plain" }), o.jsxs("div", { className: "haim-code-block__actions", children: [c, o.jsx(An, { label: n ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC", active: n, onClick: a, children: n ? o.jsx(ra, { size: 14, "aria-hidden": true }) : o.jsx(zo, { size: 14, "aria-hidden": true }) }), o.jsx(An, { label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30", expanded: !t, onClick: i, children: t ? o.jsx(aa, { size: 14, "aria-hidden": true }) : o.jsx(Oo, { size: 14, "aria-hidden": true }) })] })] });
}
function jc({ node: e, editor: t, selected: n, updateAttributes: r }) {
  const a = String(e.attrs.language || ""), i = qr(a), l = e.textContent || "", [c, h] = f.useState(null), [p, d] = f.useState(false), [g, m] = f.useState(false), [x, C] = f.useState(false), [k, v] = f.useState(false), T = t.isEditable, z = f.useRef(null);
  f.useEffect(() => {
    var _a;
    if (!i || g || x) return;
    let A = false;
    const P = wc(((_a = t.view) == null ? void 0 : _a.dom) ?? null);
    return fi(l, P).then((U) => {
      A || (U ? (h(U), d(false)) : (h(null), d(!!l.trim())));
    }), () => {
      A = true;
    };
  }, [i, g, x, l, t]);
  const I = f.useCallback(() => {
    var _a;
    const A = l, P = () => {
      v(true), window.setTimeout(() => v(false), 1500);
    };
    if (typeof navigator < "u" && ((_a = navigator.clipboard) == null ? void 0 : _a.writeText)) {
      navigator.clipboard.writeText(A).then(P).catch(() => {
        try {
          const U = document.createElement("textarea");
          U.value = A, document.body.appendChild(U), U.select(), document.execCommand("copy"), U.remove(), P();
        } catch {
        }
      });
      return;
    }
    P();
  }, [l]), w = f.useCallback((A) => {
    r({ language: A }), qr(A) || (m(false), h(null), d(false));
  }, [r]), N = o.jsx("pre", { className: "haim-mermaid-block__source-hidden", "aria-hidden": true, children: o.jsx(dr, { as: "code" }) }), O = o.jsx(vc, { language: a, collapsed: x, copied: k, editable: T, onCopy: I, onToggleCollapse: () => C((A) => !A), ...T ? { onLanguageChange: w } : {}, extra: i && T && !x ? o.jsx(An, { label: g || p ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => m((A) => !A), children: g || p ? o.jsx(ta, { size: 14, "aria-hidden": true }) : o.jsx(na, { size: 14, "aria-hidden": true }) }) : null });
  return i && !g && c && !x ? o.jsxs(me, { as: "div", className: `haim-code-block haim-mermaid-block${n ? " is-selected" : ""}`, "data-language": "mermaid", children: [o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: O }), o.jsx("div", { className: "haim-mermaid-block__chart", dangerouslySetInnerHTML: { __html: c }, onDoubleClick: () => {
    T && m(true);
  } }), N] }) : o.jsxs(me, { as: "div", className: `haim-code-block${i ? " haim-code-block--mermaid-edit" : ""}${n ? " is-selected" : ""}${x ? " is-collapsed" : ""}`, "data-language": a || void 0, children: [o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: O }), x ? N : o.jsxs(o.Fragment, { children: [i && p ? o.jsx("div", { className: "haim-mermaid-block__error", children: "Mermaid \uB80C\uB354 \uC2E4\uD328" }) : null, o.jsxs("div", { className: "haim-code-block__body", children: [o.jsx(wa, { text: l, className: "haim-code-block__line-numbers", contentRootRef: z }), o.jsx("pre", { ref: z, className: a ? `language-${a}` : void 0, children: o.jsx(dr, { as: "code", ...a ? { className: `language-${a}` } : {} }) })] })] })] });
}
function uu(e, t) {
  const { state: n } = e;
  n.selection;
  let r = n.tr, a = false;
  return n.doc.descendants((i, l) => {
    if (i.type.name !== "codeBlock") return;
    const c = i.textContent, h = _t(c);
    if (h === c) return;
    const p = l + 1, d = l + i.nodeSize - 1;
    r = r.insertText(h, r.mapping.map(p), r.mapping.map(d)), a = true;
  }), a ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
}
const Mc = new qe("haimTrimCodeEdges");
function Ec() {
  return new ft({ key: Mc, appendTransaction(e, t, n) {
    if (!e.some((v) => v.selectionSet || v.docChanged) || e.some((v) => v.getMeta("haimTrimCodeEdges"))) return null;
    const r = t.selection.$from, a = n.selection.$from, i = r.parent.type.name === "codeBlock", l = a.parent.type.name === "codeBlock";
    if (!i || l) return null;
    const c = r.depth, h = r.node(c), p = r.before(c);
    if (h.type.name !== "codeBlock") return null;
    const d = h.textContent, g = _t(d);
    if (g === d) return null;
    const m = p + 1, x = p + h.nodeSize - 1;
    let C = m, k = x;
    for (const v of e) C = v.mapping.map(C), k = v.mapping.map(k);
    return n.tr.insertText(g, C, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
  } });
}
const Lc = pi(mi), Tc = us.extend({ priority: 1e3, addNodeView() {
  return Ue(jc);
}, addKeyboardShortcuts() {
  var _a;
  return { ...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? {}, Enter: ({ editor: t }) => hc(t), "Shift-Enter": ({ editor: t }) => fc(t) };
}, addProseMirrorPlugins() {
  var _a;
  return [...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? [], Ec(), sc(), kc()];
} }).configure({ lowlight: Lc, languageClassPrefix: "language-", enableTabIndentation: false, exitOnTripleEnter: false }), Nc = ds.extend({ renderMarkdown: (e, t) => {
  if (!e) return "";
  const n = Array.isArray(e.content) ? e.content : [];
  return n.length === 0 ? "" : t.renderChildren(n);
} }), Ic = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
function du(e) {
  const t = typeof e == "string" ? e : "", n = Ic.exec(t);
  if (!n) return { prefix: "", body: t };
  const r = n[1] ?? "";
  return { prefix: r, body: t.slice(r.length) };
}
function Ac(e, t) {
  return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
}
function $n(e, t) {
  let n = 0;
  const r = Math.min(Math.max(0, t), e.length);
  for (let a = 0; a < r; a += 1) e.charCodeAt(a) === 10 && (n += 1);
  return n;
}
function $c(e) {
  if (!e) return 0;
  const t = "\0", n = Ac(e, t), r = n.indexOf(t);
  return r < 0 ? 0 : $n(n, r);
}
function Pc(e, t) {
  try {
    return e({ type: "doc", content: [t.toJSON()] }).replace(/\n+$/, "");
  } catch {
    return t.textContent || "";
  }
}
function Hc(e, t, n) {
  const r = $c(n);
  let a = "";
  try {
    a = t(e.toJSON());
  } catch {
    a = "";
  }
  const i = [];
  let l = 0;
  return e.forEach((c, h) => {
    const p = h + c.nodeSize;
    if (c.type.name === "noteCover") {
      i.push({ pos: h, to: p, line0: 0 });
      return;
    }
    const d = Pc(t, c);
    let g = -1;
    if (d.length > 0 && a && (g = a.indexOf(d, l), g < 0)) {
      let x = l;
      for (; x < a.length && a.charCodeAt(x) === 10; ) x += 1;
      g = a.indexOf(d, x);
    }
    let m;
    if (g >= 0) m = r + $n(a, g), l = g + Math.max(d.length, 1);
    else {
      for (; l < a.length && a.charCodeAt(l) === 10; ) l += 1;
      m = r + $n(a, l), l = Math.min(a.length, l + Math.max(d.length, d ? 0 : 1));
    }
    i.push({ pos: h, to: p, line0: m });
  }), i;
}
function Dc(e) {
  var _a;
  const n = (_a = e.storage.markdown) == null ? void 0 : _a.manager;
  return !n || typeof n.serialize != "function" ? null : (r) => n.serialize(r);
}
const Bc = pt.create({ name: "haimSourceLine", addOptions() {
  return { getMetaPrefix: () => "" };
}, addDecorations() {
  const e = this.options.getMetaPrefix ?? (() => "");
  return { update: "document", create: ({ editor: t, state: n }) => {
    const r = Dc(t);
    if (!r) return [];
    const a = e() || "";
    return Hc(n.doc, r, a).map((l) => hs.Node(l.pos, l.to, { "data-line": String(l.line0) }));
  } };
} });
function Rc(e, t, n) {
  return new wn({ find: e, handler: ({ state: r, range: a, match: i }) => {
    if (!n()) return null;
    let l = t, c = a.from;
    const h = a.to;
    if (i[1]) {
      const p = i[0].lastIndexOf(i[1]);
      l += i[0].slice(p + i[1].length), c += p;
      const d = c - h;
      d > 0 && (l = i[0].slice(p - d, p) + l, c = h);
    }
    r.tr.insertText(l, c, h);
  } });
}
const zc = [{ find: /--$/, replace: "\u2014", ruleId: "emDash" }, { find: /\.\.\.$/, replace: "\u2026", ruleId: "ellipsis" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/, replace: "\u201C", ruleId: "doubleQuotes" }, { find: /"$/, replace: "\u201D", ruleId: "doubleQuotes" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/, replace: "\u2018", ruleId: "singleQuotes" }, { find: /'$/, replace: "\u2019", ruleId: "singleQuotes" }, { find: /<-$/, replace: "\u2190", ruleId: "leftArrow" }, { find: /->$/, replace: "\u2192", ruleId: "rightArrow" }, { find: /\(c\)$/, replace: "\xA9", ruleId: "copyright" }, { find: /\(tm\)$/, replace: "\u2122", ruleId: "trademark" }, { find: /\(sm\)$/, replace: "\u2120", ruleId: "servicemark" }, { find: /\(r\)$/, replace: "\xAE", ruleId: "registeredTrademark" }, { find: /(?:^|\s)(1\/2)\s$/, replace: "\xBD", ruleId: "oneHalf" }, { find: /(?:^|\s)(1\/4)\s$/, replace: "\xBC", ruleId: "oneQuarter" }, { find: /(?:^|\s)(3\/4)\s$/, replace: "\xBE", ruleId: "threeQuarters" }, { find: /\+\/-$/, replace: "\xB1", ruleId: "plusMinus" }, { find: /!=$/, replace: "\u2260", ruleId: "notEqual" }, { find: /\d+\s?([*x])\s?\d+$/, replace: "\xD7", ruleId: "multiplication" }, { find: /<<$/, replace: "\xAB", ruleId: "laquo" }, { find: />>$/, replace: "\xBB", ruleId: "raquo" }, { find: /\^2$/, replace: "\xB2", ruleId: "superscriptTwo" }, { find: /\^3$/, replace: "\xB3", ruleId: "superscriptThree" }], Oc = pt.create({ name: "haimTypography", addOptions() {
  return { initialRules: { ...Gr } };
}, addStorage() {
  return { rules: { ...this.options.initialRules } };
}, addCommands() {
  return { setHaimTypographyRules: (e) => () => (this.storage.rules = { ...e }, true) };
}, addInputRules() {
  return zc.map(({ find: e, replace: t, ruleId: n }) => Rc(e, t, () => !!this.storage.rules[n]));
} });
function hu(e) {
  const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", a = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), i = (e == null ? void 0 : e.typographyRules) ?? Gr, c = [r ? hr.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, codeBlock: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }) : hr.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }), Nc, el, Bc.configure({ getMetaPrefix: a }), Zi, ks.extend({ parseHTML() {
    return [{ tag: "img[src]:not([data-wiki-path])" }];
  }, addNodeView() {
    return Ue(Ui);
  } }).configure({ allowBase64: true }), ws.configure({ taskItem: false, taskList: false }), rl.configure({ nested: true }), sl, ys.configure({ table: { resizable: r } }), fs, Ss.configure({ types: ["heading", "paragraph"] }), Cs.configure({ multicolor: true }), ...r ? [Tc] : [], ps, ms, Oc.configure({ initialRules: i }), vs.configure({ placeholder: t, ...r ? {} : { showOnlyCurrent: false } }), gs, js.configure({ className: "haim-node-focused" }), xs, bs, Ql, Gl, ll, hl, pl, fl, ...r ? [ml] : [], Pl, Hl, Vl, Kl, Ul, ...r ? [Ol] : []];
  return r ? [...c, Ms, Ns.configure({ controls: true, nocookie: true }), Is.configure({ persist: true }), Es, Ls, As.configure({ emojis: $s, enableEmoticons: true }), Ts, Ps.configure({ injectCSS: true, visible: false }), Hs.configure({ types: ["heading", "paragraph"] }), Ds.configure({ getIndex: Bs }), ol] : c;
}
const Pn = /* @__PURE__ */ new WeakMap();
function _c(e, t) {
  if (e === t) return true;
  if (!e || !t) return false;
  try {
    return JSON.stringify(e) === JSON.stringify(t);
  } catch {
    return false;
  }
}
function fu(e) {
  if (!e) return "";
  const t = e.getJSON(), n = Pn.get(e);
  if (n && _c(n.json, t)) return n.markdown;
  const r = e, a = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
  return Pn.set(e, { json: t, markdown: a }), a;
}
function pu(e) {
  e && Pn.delete(e);
}
export {
  Ot as C,
  Il as H,
  In as a,
  ic as b,
  hu as c,
  cu as d,
  Nl as e,
  au as f,
  fu as g,
  ou as h,
  pu as i,
  Ac as j,
  ma as k,
  su as l,
  lu as n,
  Vi as o,
  Tl as p,
  ec as r,
  du as s,
  uu as t,
  ha as u,
  iu as w
};
