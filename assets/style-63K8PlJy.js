import { c as me, s as Ka, d as ge, P as ft, e as qe, g as Wa, M as qa, f as Ua, I as xn, r as Va, h as hn, i as Xa, j as Ya, p as or, k as Qa, l as Le, n as Ga, o as Ja, T as K, N as Or, R as Ue, q as pt, t as Za, v as es, B as ts, w as ns, x as ir, C as rs, y as as, z as ss, A as lr, F as os, G as is, H as ls, J as cs, S as us, K as ds, L as hs, O as fs, Q as ps, U as ms, V as gs, W as xs, X as bs, Y as ks, Z as ws, _ as ys, $ as Ss, a0 as Cs, a1 as vs, a2 as js, a3 as Ms, a4 as Ls, a5 as Es, a6 as Ts, a7 as Ns } from "./vendor-tiptap-Dthoom2y.js";
import { r as h, j as o, c as Is, a as As } from "./vendor-react-BDjpSibw.js";
import { A as fn, m as ze } from "./vendor-motion-Dw-WnPM7.js";
import { t as Ps, O as $s } from "./index-De3wkM3r.js";
import { c as Hs, n as Oe, ae as Ds, C as Rs, j as Bs, i5 as _s, i6 as zs, ho as Os, ed as It, a9 as In, i7 as Fs, i8 as Fr, hC as cr, u as Ks, aZ as Kr, i9 as Ws, ia as qs, ib as Wr } from "./index-Dwy7RB8K.js";
import { g as Us } from "./Kbd-zJP-p1De.js";
import { t as bn, b3 as Vs, P as Xs, b4 as Ys, b5 as Qs, b6 as Gs, v as Js, aD as ur, z as dr, U as qr, R as Ur, T as Zs, b7 as eo, ag as to, o as no, w as ro, b8 as ao, X as so, B as oo, I as io, c as lo, d as co, h as uo, aI as ho, aJ as fo, e as po, f as mo, g as hr, Q as go, aV as xo, i as fr, aN as bo, aO as ko, aP as wo, aQ as yo, Y as Mt, aR as So, aS as st, aF as Co, S as vo, aT as jo, n as Vr, aU as Mo, aX as Lo, aK as Eo, aL as To, aM as No, b9 as Io, ba as Ao, bb as Po, E as Xr, bc as Yr, y as Qr, an as $o, k as Gr, j as Ho } from "./vendor-lucide-CbEk5sea.js";
import { N as Do, O as Ro, Q as Bo, U as _o, V as zo, W as Oo, y as ot, z as it, B as pn, E as lt, G as ct, H as ut, K as ve, M as je, h as ht, i as Pt, j as $t, k as Ht, l as Dt, A as Rt, R as Fo, T as Ko, P as Wo, C as qo } from "./vendor-radix-DuLpLUUM.js";
import { b as dt, c as Nt, d as pr, e as Jr, a as Uo, s as Vo, f as Xo } from "./taskCheckboxStatus-DlXLsCJg.js";
import { W as Yo } from "./WikiImageSizeModal-DCDsOvVN.js";
import { c as Qo, f as Go } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as Jo } from "./toHtml-BqLZIzbw.js";
import { k as Zo } from "./vendor-katex-NqpuB_gR.js";
import { r as ei, l as ti, g as ni, h as ri, i as ai, j as si, k as oi, m as ii } from "./haimCodeBlockLanguages-C4u7NjrS.js";
import { c as li } from "./lazyMermaid-CFU1x6wk.js";
import { c as ci, g as ui } from "./vendor-highlight-Cy0EGwO-.js";
function di() {
  var _a;
  return typeof navigator > "u" ? false : !!((_a = navigator.ink) == null ? void 0 : _a.requestPresenter);
}
async function hi(e) {
  const t = navigator.ink;
  if (!(t == null ? void 0 : t.requestPresenter)) return null;
  try {
    return await t.requestPresenter({ presentationArea: e });
  } catch {
    return null;
  }
}
async function fi(e) {
  const { src: t, inkCanvas: n, highlightCanvas: r } = e, a = await pi(t), i = ("width" in a, a.width), l = ("height" in a, a.height), c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(i)), c.height = Math.max(1, Math.round(l));
  const f = c.getContext("2d");
  if (!f) throw new Error("Canvas 2D unavailable");
  if (f.imageSmoothingEnabled = true, f.imageSmoothingQuality = "high", f.drawImage(a, 0, 0, c.width, c.height), n && n.width > 0 && n.height > 0 && f.drawImage(n, 0, 0, c.width, c.height), r && r.width > 0 && r.height > 0 && f.drawImage(r, 0, 0, c.width, c.height), "close" in a && typeof a.close == "function") try {
    a.close();
  } catch {
  }
  const p = await new Promise((d) => {
    c.toBlob((g) => d(g), "image/png");
  });
  if (!p) throw new Error("Failed to encode PNG");
  return p;
}
async function pi(e) {
  try {
    const t = await fetch(e, { mode: "cors", credentials: "omit" });
    if (!t.ok) throw new Error(`fetch ${t.status}`);
    const n = await t.blob();
    return await createImageBitmap(n);
  } catch {
    return await mi(e);
  }
}
function mi(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(new Error("Image load failed for composite")), r.src = e;
  });
}
function Bt(e) {
  return Math.max(e.diameterX, e.diameterY);
}
function Zr(e) {
  return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
}
function gi(e, t) {
  return !(t >= 8) || !(e >= 1) ? 1 : O(e / t, 0.25, 12);
}
function mr(e, t, n) {
  const r = Math.max(4, Math.min(96, Math.min(t, n) * 0.08));
  return O(e, 0.5, r);
}
function ea(e, t) {
  if (e.length < 2) return 0;
  const n = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
  if (n === r) {
    const l = e[Math.max(0, t - 1)], c = e[t];
    return Math.atan2(c.y - l.y, c.x - l.x);
  }
  const a = e[n], i = e[r];
  return Math.atan2(i.y - a.y, i.x - a.x);
}
function ta(e, t) {
  if (e.length === 0) return [];
  const n = e[0];
  if (!n) return [];
  const r = Math.max(0.5, t), a = [{ ...n }];
  let i = 0;
  for (let l = 1; l < e.length; l += 1) {
    const c = e[l - 1], f = e[l], p = Math.hypot(f.x - c.x, f.y - c.y);
    if (p < 1e-6) continue;
    let d = 0;
    for (; i + (p - d) >= r; ) {
      const g = r - i, m = (d + g) / p;
      a.push({ x: c.x + (f.x - c.x) * m, y: c.y + (f.y - c.y) * m, pressure: c.pressure + (f.pressure - c.pressure) * m }), d += g, i = 0;
    }
    i += p - d;
  }
  return a;
}
const xi = [{ value: "300", label: "Light 300" }, { value: "400", label: "Regular 400" }, { value: "500", label: "Medium 500" }, { value: "600", label: "Semibold 600" }, { value: "700", label: "Bold 700" }, { value: "800", label: "ExtraBold 800" }], bi = [{ value: "multiply", label: "Multiply" }, { value: "overlay", label: "Overlay" }, { value: "soft-light", label: "Soft light" }, { value: "screen", label: "Screen" }, { value: "darken", label: "Darken" }, { value: "lighten", label: "Lighten" }, { value: "color-burn", label: "Color burn" }, { value: "normal", label: "Normal" }];
function O(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
const na = 0.92, gr = 0.35;
function ki(e, t) {
  const n = e.x - t.x, r = e.y - t.y;
  return n * n + r * r;
}
function ra(e, t, n = na) {
  const r = O(n, 0.05, 1);
  return { x: e.x + (t.x - e.x) * r, y: e.y + (t.y - e.y) * r, pressure: e.pressure + (t.pressure - e.pressure) * r };
}
function wi(e, t, n, r = na) {
  let a = t;
  const i = gr * gr;
  for (const l of n) {
    a = ra(a, l, r);
    const c = e[e.length - 1];
    !c || ki(c, a) >= i ? e.push({ ...a }) : (c.x = a.x, c.y = a.y, c.pressure = a.pressure);
  }
  return a;
}
function yi(e) {
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
    const a = e[r === 0 ? 0 : r - 1], i = e[r], l = e[r + 1], c = e[r + 2 < e.length ? r + 2 : r + 1], f = i.x + (l.x - a.x) / 6, p = i.y + (l.y - a.y) / 6, d = l.x - (c.x - i.x) / 6, g = l.y - (c.y - i.y) / 6;
    n += ` C ${f} ${p} ${d} ${g} ${l.x} ${l.y}`;
  }
  return n;
}
function kn(e) {
  if (e.dash !== "dashed") return;
  const t = Bt(e), n = Math.max(2, t * 1.2);
  return `${Math.max(2, t * 2.2)} ${n}`;
}
function wn(e) {
  return e === "square" ? "square" : "round";
}
function yn(e) {
  return e === "square" ? "miter" : "round";
}
function Si(e) {
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
function xr(e, t, n) {
  e.lineCap = wn(t.shape), e.lineJoin = yn(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, n), e.globalAlpha = O(t.opacity, 0.02, 1);
  const r = kn(t);
  r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
}
function Ci(e, t, n, r, a = 1) {
  const i = Math.max(0.25, t.diameterX * a / 2), l = Math.max(0.25, t.diameterY * a / 2);
  e.save(), e.translate(n.x, n.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-i, -l, i * 2, l * 2) : e.ellipse(0, 0, i, l, 0, 0, Math.PI * 2), e.fill(), e.restore();
}
function aa(e, t) {
  if (t.points.length < 1) return;
  if (e.globalAlpha = O(t.opacity, 0.02, 1), Zr(t)) {
    const a = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), i = ta(t.points, a);
    for (let l = 0; l < i.length; l += 1) {
      const c = i[l], f = Math.min(t.points.length - 1, Math.round(l / Math.max(1, i.length - 1) * (t.points.length - 1))), p = ea(t.points, f), d = t.kind === "pressure" ? c.pressure : 1;
      Ci(e, t, c, p, d);
    }
    return;
  }
  const n = Bt(t);
  if (t.kind === "pressure" && t.points.length >= 2) {
    for (let a = 1; a < t.points.length; a += 1) {
      const i = t.points[a - 1], l = t.points[a], c = Math.max(0.5, n * ((i.pressure + l.pressure) / 2));
      xr(e, t, c), e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(l.x, l.y), e.stroke();
    }
    return;
  }
  xr(e, t, n), e.beginPath();
  const r = t.points[0];
  if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
  else for (let a = 1; a < t.points.length; a += 1) {
    const i = t.points[a];
    e.lineTo(i.x, i.y);
  }
  e.stroke();
}
function vi(e, t, n) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const a = r.getContext("2d");
  if (!a) return r;
  a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
  for (const i of n) a.save(), i.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = "source-over", a.strokeStyle = i.color), aa(a, i), a.restore();
  return r;
}
function ji(e, t, n) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const a = r.getContext("2d");
  if (!a) return r;
  a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
  for (const i of n) a.save(), i.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = Si(i.blend), a.strokeStyle = i.color), aa(a, i), a.restore();
  return r;
}
function Mi(e, t, n) {
  var _a;
  e.textBaseline = "top", e.textAlign = "left";
  for (const r of t) {
    const a = r.text ?? "";
    if (!a.trim() && a.length === 0) continue;
    const i = Math.max(1, r.fontSizePx * Math.max(1e-3, n));
    e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = O(r.opacity, 0.02, 1), e.fillStyle = r.color;
    const l = ((_a = r.fontFamily) == null ? void 0 : _a.trim()) || "sans-serif";
    e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${i}px ${l}`;
    const c = i * 1.3, f = a.split(`
`);
    for (let p = 0; p < f.length; p += 1) e.fillText(f[p] ?? "", r.x, r.y + p * c);
    e.restore();
  }
}
const br = 8192;
function Li(e) {
  const t = Math.max(1, e.clientWidth), n = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, a = e.naturalHeight > 0 ? e.naturalHeight : n, i = Math.min(3, window.devicePixelRatio || 1);
  let l = Math.max(r, Math.round(t * i)), c = Math.max(a, Math.round(n * i));
  const f = Math.max(l, c);
  if (f > br) {
    const p = br / f;
    l = Math.max(1, Math.round(l * p)), c = Math.max(1, Math.round(c * p));
  }
  return { bufW: l, bufH: c, cssW: t, cssH: n };
}
let At = null;
function qc(e) {
  At = e;
}
function Ei() {
  return typeof At == "function";
}
async function sa(e) {
  var _a;
  if (!At) throw new Error("Image upload is not available");
  const n = (_a = (await At([e]))[0]) == null ? void 0 : _a.trim();
  if (!n) throw new Error("Upload returned no path");
  return n;
}
function Uc(e) {
  return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}
const An = [0.22, 1, 0.36, 1], Ti = { duration: 0.2, ease: An }, Ni = { duration: 0.28, ease: An }, Lt = 0.5, Et = 8, Fe = 1.25, Ii = 2, Se = 0.5, Me = 128, Ai = 4e3, oa = 450, Pi = ["#111827", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"], $i = ["#facc15", "#f472b6", "#38bdf8", "#4ade80", "#fb923c"], Hi = { backgroundColor: "#ffffff", backgroundImage: ["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)", "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","), backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" };
function Ke(e) {
  return Math.round(e * 10) / 10;
}
function Di(e) {
  return Math.max(0.1, Ke(e / 10));
}
function kr(e, t) {
  return Ke(O(e + t * Di(e), Se, Me));
}
const Sn = 8, Cn = 400;
function Ri() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", t = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
}
const ia = Ri(), pe = Us(), wr = ia ? `${pe}+Shift+Z` : `${pe}+Y`;
function Bi(e, t) {
  const n = Math.max(1, Math.round(e / 10));
  return O(Math.round(e + t * n), Sn, Cn);
}
function _i(e, t) {
  if (!t) return 1;
  const n = e.pressure;
  return typeof n != "number" || Number.isNaN(n) || e.pointerType === "mouse" ? 0.5 : O(n || 0.05, 0.05, 1);
}
function X({ label: e, active: t = false, disabled: n = false, tone: r = "default", onClick: a, children: i }) {
  const l = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
  return o.jsxs(Pt, { children: [o.jsx($t, { asChild: true, children: o.jsx("button", { type: "button", "aria-label": e, disabled: n, onClick: a, className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${l}`, children: i }) }), o.jsx(Ht, { children: o.jsxs(Dt, { side: "top", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [e, o.jsx(Rt, { className: "fill-neutral-900" })] }) })] });
}
const zi = { backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" };
function yr({ size: e = 16 }) {
  return o.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: o.jsx("path", { d: "M2 8h12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function Sr({ size: e = 16 }) {
  return o.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: o.jsx("path", { d: "M2 8h3M7 8h3M12 8h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function he({ stroke: e, fading: t = false }) {
  const n = e.kind === "eraser", r = n ? "#000" : e.color, a = n ? 1 : e.opacity, i = t ? { opacity: 0, transition: `opacity ${oa}ms ease-out` } : { opacity: a };
  if (Zr(e)) {
    const f = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), p = ta(e.points, f);
    return o.jsx("g", { style: i, children: p.map((d, g) => {
      const m = Math.min(e.points.length - 1, Math.round(g / Math.max(1, p.length - 1) * (e.points.length - 1))), x = ea(e.points, m) * 180 / Math.PI, C = e.kind === "pressure" ? d.pressure : 1, k = Math.max(0.25, e.diameterX * C / 2), v = Math.max(0.25, e.diameterY * C / 2);
      return e.shape === "square" ? o.jsx("rect", { x: -k, y: -v, width: k * 2, height: v * 2, fill: r, transform: `translate(${d.x} ${d.y}) rotate(${x})` }, `${e.id}-st-${g}`) : o.jsx("ellipse", { cx: 0, cy: 0, rx: k, ry: v, fill: r, transform: `translate(${d.x} ${d.y}) rotate(${x})` }, `${e.id}-st-${g}`);
    }) });
  }
  const l = Bt(e);
  if (e.kind === "pressure" && e.points.length >= 2) return o.jsx("g", { style: i, children: e.points.slice(1).map((f, p) => {
    const d = e.points[p], g = Math.max(0.5, l * ((d.pressure + f.pressure) / 2));
    return o.jsx("path", { d: `M ${d.x} ${d.y} L ${f.x} ${f.y}`, fill: "none", stroke: r, strokeWidth: g, strokeLinecap: wn(e.shape), strokeLinejoin: yn(e.shape), strokeMiterlimit: 2, strokeDasharray: kn({ ...e, diameterX: g, diameterY: g }), style: { fill: "none" } }, `${e.id}-p-${p}`);
  }) });
  const c = yi(e.points);
  return c ? o.jsx("path", { d: c, fill: "none", stroke: r, strokeWidth: l, strokeLinecap: wn(e.shape), strokeLinejoin: yn(e.shape), strokeMiterlimit: 2, strokeDasharray: kn(e), style: { ...i, fill: "none" } }) : null;
}
function la({ src: e, alt: t = "", open: n, onClose: r, onSaveAnnotated: a }) {
  const i = !!(n && e), [l, c] = h.useState(1), [f, p] = h.useState({ x: 0, y: 0 }), [d, g] = h.useState("pan"), [m, x] = h.useState("#111827ff"), [C, k] = h.useState("#facc15ff"), [v, T] = h.useState(4), [B, I] = h.useState(4), [w, N] = h.useState(1), [_, A] = h.useState(0.45), [F, U] = h.useState("multiply"), [ie, Ae] = h.useState("circle"), [ee, L] = h.useState("solid"), [E, H] = h.useState([]), [$, z] = h.useState([]), [V, le] = h.useState([]), [ae, Y] = h.useState([]), [q, te] = h.useState(null), [ne, Q] = h.useState(null), [ue, ce] = h.useState("Paperozi, sans-serif"), [xe, G] = h.useState(24), [re, mt] = h.useState("400"), [Pe, zt] = h.useState("normal"), [ya, Ot] = h.useState(() => /* @__PURE__ */ new Set()), [J, Ce] = h.useState(null), [Ft, Kt] = h.useState(false), [Sa, be] = h.useState([]), [D, Ca] = h.useState({ w: 1, h: 1 }), [gt, xt] = h.useState(null), [va, Wt] = h.useState(false), [Ve, Hn] = h.useState(false), [Dn, qt] = h.useState(null), [Ut, Vt] = h.useState(false), [Xt, Rn] = h.useState(false), [Yt, Xe] = h.useState(false), Qt = h.useRef({ w: 4, h: 4 }), bt = h.useRef(null), Gt = h.useRef(null), kt = h.useRef(null), Ee = h.useRef(null), Bn = h.useRef([]), _n = h.useRef([]), Ye = h.useRef([]), ke = h.useRef(null), we = h.useRef(null), Jt = h.useRef(null), zn = h.useRef(null), Zt = h.useRef(0), ye = h.useRef(null), en = h.useRef(null), $e = h.useRef(null), Qe = h.useRef(null), wt = h.useRef(null), Te = h.useRef(null), yt = h.useRef(1), On = h.useRef(l), Fn = h.useRef(0), He = h.useRef(/* @__PURE__ */ new Map()), tn = h.useRef([]), Ge = h.useRef(null);
  Bn.current = E, _n.current = $, Ye.current = ae, On.current = l;
  const Kn = !!a && Ei() && (E.length > 0 || $.length > 0 || ae.some((s) => s.text.trim().length > 0)), Je = ae.find((s) => s.id === q) ?? null, Ze = d === "highlighter" ? C : m, ja = d === "highlighter" ? _ : w, et = h.useCallback(() => {
    c(1), p({ x: 0, y: 0 });
  }, []), St = h.useCallback(() => {
    for (const s of He.current.values()) clearTimeout(s);
    He.current.clear();
  }, []), nn = h.useCallback(() => {
    H([]), z([]), le([]), Y([]), te(null), Q(null), Ot(/* @__PURE__ */ new Set()), be([]), tn.current = [], Ce(null), Kt(false), ke.current = null, we.current = null, Zt.current = 0;
    const s = zn.current, u = Jt.current;
    s && u && s.clearRect(0, 0, u.width, u.height), ye.current != null && (cancelAnimationFrame(ye.current), ye.current = null), Qe.current = null, St();
  }, [St]), rn = h.useRef(false);
  h.useEffect(() => {
    if (!i) {
      rn.current = false;
      return;
    }
    const s = !rn.current;
    rn.current = true, s && (et(), nn(), g("pan"), qt(null), xt(null));
  }, [i, e, et, nn]), h.useEffect(() => {
    var _a2;
    i || (Xe(false), St(), (_a2 = Ge.current) == null ? void 0 : _a2.call(Ge), Ge.current = null);
  }, [i, St]);
  const De = h.useCallback(() => {
    const s = Gt.current;
    if (!s) return;
    const { bufW: u, bufH: b, cssW: S } = Li(s);
    S < 8 || s.clientHeight < 8 || (yt.current = gi(u, S), Ca({ w: u, h: b }));
  }, []);
  h.useEffect(() => {
    if (!i) return;
    De();
    const s = Gt.current;
    if (!s) return;
    const u = () => De();
    s.addEventListener("load", u);
    const b = typeof ResizeObserver < "u" ? new ResizeObserver(De) : null;
    return b == null ? void 0 : b.observe(s), window.addEventListener("resize", De), () => {
      s.removeEventListener("load", u), b == null ? void 0 : b.disconnect(), window.removeEventListener("resize", De);
    };
  }, [i, e, De]), h.useEffect(() => {
    if (!i) {
      Ee.current = null, Wt(false);
      return;
    }
    let s = false;
    const u = kt.current;
    if (!u || !di()) {
      Wt(false);
      return;
    }
    return hi(u).then((b) => {
      s || (Ee.current = b, Wt(!!b));
    }), () => {
      s = true, Ee.current = null;
    };
  }, [i, e, D.w]);
  const Re = h.useCallback((s, u, b) => {
    const S = bt.current;
    if (!S) {
      c(O(s, Lt, Et));
      return;
    }
    const j = S.getBoundingClientRect(), y = u - j.left - j.width / 2, M = b - j.top - j.height / 2;
    c((R) => {
      const Z = O(s, Lt, Et), de = Z / R;
      return p((oe) => ({ x: y - (y - oe.x) * de, y: M - (M - oe.y) * de })), Z;
    });
  }, []), Ma = h.useCallback((s) => {
    var _a2;
    if ((_a2 = Ge.current) == null ? void 0 : _a2.call(Ge), Ge.current = null, bt.current = s, !s) return;
    const u = (b) => {
      b.preventDefault(), b.stopPropagation();
      const S = b.deltaY > 0 ? 1 / Fe : Fe;
      Re(On.current * S, b.clientX, b.clientY);
    };
    s.addEventListener("wheel", u, { passive: false, capture: true }), Ge.current = () => {
      s.removeEventListener("wheel", u, true);
    };
  }, [Re]), La = h.useCallback((s) => {
    if (s.preventDefault(), s.stopPropagation(), l > 1.05) {
      et();
      return;
    }
    Re(Ii, s.clientX, s.clientY);
  }, [l, et, Re]), tt = h.useCallback((s, u) => {
    const b = kt.current;
    if (!b) return null;
    const S = b.getBoundingClientRect();
    return S.width < 1 || S.height < 1 ? null : { x: (s.clientX - S.left) / S.width * D.w, y: (s.clientY - S.top) / S.height * D.h, pressure: _i(s, u) };
  }, [D.w, D.h]), an = h.useCallback((s) => {
    const u = s === "laser" ? 0.75 : 1, b = s === "highlighter" ? 4 : s === "laser" ? 2 : Se;
    if (s === "highlighter") return { w: Math.max(b, v * u), h: Math.max(b, B * u) };
    const S = Math.max(b, v * u);
    return { w: S, h: S };
  }, [v, B]);
  h.useEffect(() => {
    d !== "eraser" && (d === "pen" || d === "pressure" || d === "highlighter" || d === "laser") && (Qt.current = { w: v, h: B });
  }, [d, v, B]);
  const Wn = h.useCallback(() => {
    const s = Qt.current;
    T(s.w), I(s.h);
  }, []), qn = h.useCallback(() => {
    const s = Qt.current, u = Math.max(s.w, s.h), b = Ke(O(u * 5, Se, Me));
    T(b), I(b), g("eraser");
  }, []), se = h.useCallback((s) => {
    if (d === "eraser" && s !== "eraser" && Wn(), s === "eraser") {
      qn();
      return;
    }
    if (s === "highlighter") {
      g("highlighter"), L("solid"), Ae("square");
      return;
    }
    g(s);
  }, [d, Wn, qn]), Un = h.useCallback((s) => {
    var _a2, _b;
    s.preventDefault(), s.stopPropagation(), (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId), Te.current = { pointerId: s.pointerId, startX: s.clientX, startY: s.clientY, originX: f.x, originY: f.y };
  }, [f.x, f.y]), Vn = h.useCallback((s) => {
    const u = Te.current;
    !u || u.pointerId !== s.pointerId || (s.preventDefault(), p({ x: u.originX + (s.clientX - u.startX), y: u.originY + (s.clientY - u.startY) }));
  }, []), Xn = h.useCallback((s) => {
    var _a2, _b;
    const u = Te.current;
    if (!(!u || u.pointerId !== s.pointerId)) {
      Te.current = null;
      try {
        (_b = (_a2 = s.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
      } catch {
      }
    }
  }, []), Be = h.useCallback((s) => {
    const u = He.current.get(s);
    u && clearTimeout(u);
    const b = setTimeout(() => {
      Ot((j) => {
        const y = new Set(j);
        return y.add(s), y;
      });
      const S = setTimeout(() => {
        He.current.delete(s), Ot((j) => {
          const y = new Set(j);
          return y.delete(s), y;
        }), le((j) => j.filter((y) => y.id !== s));
      }, oa);
      He.current.set(s, S);
    }, Ai);
    He.current.set(s, b);
  }, []), Ne = h.useCallback(() => {
    const s = Jt.current, u = zn.current ?? (s == null ? void 0 : s.getContext("2d"));
    s && u && u.clearRect(0, 0, s.width, s.height), Zt.current = 0;
  }, []), sn = h.useCallback(() => {
    ye.current == null && (ye.current = requestAnimationFrame(() => {
      ye.current = null;
      const s = ke.current;
      if (!s) {
        Ce(null);
        return;
      }
      Ce({ ...s, points: s.points.slice() });
    }));
  }, []), _e = h.useCallback((s, u) => {
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
  }, [tt]), Yn = h.useCallback((s) => {
    var _a2, _b;
    if (d !== "pen" && d !== "pressure" && d !== "highlighter" && d !== "laser" && d !== "eraser") return;
    s.preventDefault(), s.stopPropagation();
    const b = _e(s, d === "pressure"), S = b[b.length - 1];
    if (!S) return;
    (_b = (_a2 = s.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, s.pointerId);
    const j = d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen", y = j === "laser" ? "#ef4444" : j === "highlighter" ? C : j === "eraser" ? "#000000" : m, M = an(j), R = O(yt.current, 0.25, 12), Z = mr(Math.max(0.5, M.w * R), D.w, D.h), de = mr(Math.max(0.5, M.h * R), D.w, D.h), oe = j === "eraser" ? 1 : j === "laser" ? 0.9 : j === "highlighter" ? _ : w, W = { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, seq: ++Fn.current, kind: j, color: y, diameterX: Z, diameterY: de, points: [S], shape: ie, dash: ee, opacity: oe, ...j === "highlighter" ? { blend: F } : {} };
    if (ke.current = W, we.current = { ...S }, Kt(true), Zt.current = 0, Ce({ ...W, points: [...W.points] }), Ne(), j === "laser" && Be(W.id), (j === "pen" || j === "pressure") && Ee.current && s.nativeEvent.isTrusted) try {
      const Fa = Math.max(M.w, M.h);
      Ee.current.updateInkTrailStartPoint(s.nativeEvent, { color: m, diameter: Math.max(1, Fa * (j === "pressure" ? S.pressure : 1)) });
    } catch {
    }
  }, [d, m, C, _, w, F, ie, ee, _e, an, Be, Ne, sn]), Qn = h.useCallback((s) => {
    const u = ke.current;
    if (!u) return;
    s.preventDefault();
    const b = u.kind === "pressure", S = _e(s, b);
    if (!S.length) return;
    const j = we.current ?? u.points[u.points.length - 1];
    if (j && (we.current = wi(u.points, j, S), sn(), u.kind === "laser" && Be(u.id), (u.kind === "pen" || u.kind === "pressure") && Ee.current && s.nativeEvent.isTrusted)) try {
      const y = we.current, R = Bt(u) / Math.max(1e-3, yt.current);
      Ee.current.updateInkTrailStartPoint(s.nativeEvent, { color: u.color, diameter: Math.max(1, R * (u.kind === "pressure" ? (y == null ? void 0 : y.pressure) ?? 1 : 1)) });
    } catch {
    }
  }, [_e, sn, Be]), Gn = h.useCallback((s) => {
    var _a2, _b;
    const u = ke.current;
    if (!u) return;
    const b = u.kind === "pressure", S = _e(s, b), j = S[S.length - 1];
    if (j && we.current) {
      const M = ra(we.current, j, 1), R = u.points[u.points.length - 1];
      !R || R.x !== M.x || R.y !== M.y ? u.points.push(M) : R.pressure = M.pressure, we.current = M;
    }
    ke.current = null, we.current = null, ye.current != null && (cancelAnimationFrame(ye.current), ye.current = null), Kt(false);
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
      le((M) => [...M, y]), Be(u.id), Ce(null), Ne();
      return;
    }
    if (be([]), u.kind === "highlighter") z((M) => [...M, y]);
    else if (u.kind === "eraser") {
      H((M) => [...M, y]), z((M) => [...M, y]), Ce(null), Ne();
      return;
    } else H((M) => [...M, y]);
    Ce(null), Ne();
  }, [_e, Be, Ne]), Ct = h.useCallback((s) => {
    q && Y((u) => u.map((b) => b.id === q ? { ...b, ...s } : b));
  }, [q]), Jn = h.useCallback((s) => {
    s.preventDefault(), s.stopPropagation();
    const u = tt(s, false);
    if (!u) return;
    const b = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, S = { id: b, seq: ++Fn.current, x: u.x, y: u.y, text: "", color: m, opacity: w, fontSizePx: xe, fontFamily: ue, fontWeight: re, fontStyle: Pe };
    be([]), Y((j) => [...j, S]), te(b), Q(b), window.setTimeout(() => {
      var _a2;
      return (_a2 = wt.current) == null ? void 0 : _a2.focus();
    }, 30);
  }, [tt, m, w, xe, ue, re, Pe]), Ea = h.useCallback((s) => {
    if (s.button === 1 || d === "pan") {
      Un(s);
      return;
    }
    if (d === "text") {
      Q(null), Jn(s);
      return;
    }
    te(null), Q(null), Yn(s);
  }, [d, Un, Yn, Jn]), Ta = h.useCallback((s) => {
    if (!ke.current) {
      const b = { x: s.clientX, y: s.clientY }, S = $e.current;
      S ? ($e.current = { x: S.x + (b.x - S.x) * 0.72, y: S.y + (b.y - S.y) * 0.72 }, en.current == null && (en.current = requestAnimationFrame(() => {
        en.current = null, $e.current && xt({ ...$e.current });
      }))) : ($e.current = b, xt(b));
    }
    const u = Qe.current;
    if (u && u.pointerId === s.pointerId) {
      s.preventDefault();
      const b = kt.current;
      if (!b) return;
      const S = b.getBoundingClientRect(), j = (s.clientX - u.startClientX) / Math.max(1, S.width) * D.w, y = (s.clientY - u.startClientY) / Math.max(1, S.height) * D.h;
      Y((M) => M.map((R) => R.id === u.id ? { ...R, x: u.originX + j, y: u.originY + y } : R));
      return;
    }
    if (Te.current) {
      Vn(s);
      return;
    }
    ke.current && Qn(s);
  }, [Vn, Qn, D.w, D.h]), Zn = h.useCallback((s) => {
    var _a2, _b, _c;
    if (((_a2 = Qe.current) == null ? void 0 : _a2.pointerId) === s.pointerId) {
      Qe.current = null;
      try {
        (_c = (_b = s.currentTarget).releasePointerCapture) == null ? void 0 : _c.call(_b, s.pointerId);
      } catch {
      }
    }
    Te.current && Xn(s), ke.current && Gn(s);
  }, [Xn, Gn]), nt = h.useCallback(() => {
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
  }, [ne, q]), on = h.useCallback(() => {
    const s = q;
    if (!s) return;
    const u = Ye.current.find((b) => b.id === s);
    u && (tn.current.push({ ...u }), be([]), Y((b) => b.filter((S) => S.id !== s)), te(null), Q(null));
  }, [q]), ln = h.useCallback(() => {
    const s = tn.current.pop();
    if (s) {
      Y((W) => [...W, s]), te(s.id), Q(null);
      return;
    }
    const u = Bn.current, b = _n.current, S = Ye.current, j = u[u.length - 1], y = b[b.length - 1], M = S[S.length - 1], R = (j == null ? void 0 : j.seq) ?? -1, Z = (y == null ? void 0 : y.seq) ?? -1, de = (M == null ? void 0 : M.seq) ?? -1, oe = Math.max(R, Z, de);
    if (!(oe < 0)) {
      if (de === oe && M) {
        be((W) => [...W, { layer: "text", text: M }]), Y(S.slice(0, -1)), te((W) => W === M.id ? null : W);
        return;
      }
      if (j && y && j.id === y.id && j.kind === "eraser" && j.seq === oe) {
        be((W) => [...W, { layer: "both", stroke: j }]), H(u.slice(0, -1)), z(b.slice(0, -1));
        return;
      }
      if (R >= Z && j && R === oe) {
        be((W) => [...W, { layer: "ink", stroke: j }]), H(u.slice(0, -1));
        return;
      }
      y && Z === oe && (be((W) => [...W, { layer: "highlight", stroke: y }]), z(b.slice(0, -1)));
    }
  }, []), cn = h.useCallback(() => {
    be((s) => {
      if (!s.length) return s;
      const u = s[s.length - 1];
      return u ? (u.layer === "text" ? Y((b) => [...b, u.text]) : u.layer === "both" || u.stroke.kind === "eraser" ? (H((b) => [...b, u.stroke]), z((b) => [...b, u.stroke])) : u.layer === "ink" ? H((b) => [...b, u.stroke]) : z((b) => [...b, u.stroke]), s.slice(0, -1)) : s;
    });
  }, []), un = h.useCallback((s) => {
    T((u) => kr(u, s)), I((u) => kr(u, s));
  }, []), er = h.useCallback((s) => {
    var _a2;
    const u = q, b = (u ? (_a2 = Ye.current.find((j) => j.id === u)) == null ? void 0 : _a2.fontSizePx : null) ?? xe, S = Bi(b, s);
    G(S), u && Y((j) => j.map((y) => y.id === u ? { ...y, fontSizePx: S } : y));
  }, [q, xe]), Na = h.useCallback((s) => {
    const u = Ke(O(s, Se, Me));
    T(u), I(u);
  }, []), Ia = h.useCallback(() => {
    se("highlighter");
  }, [se]), vt = h.useCallback(async (s) => {
    if (!a || !e || Ve) return;
    const u = ae.some((b) => b.text.trim().length > 0);
    if (!(E.length === 0 && $.length === 0 && !u)) {
      Hn(true), qt(null);
      try {
        const b = vi(D.w, D.h, E), S = b.getContext("2d");
        S && Mi(S, ae, yt.current);
        const j = ji(D.w, D.h, $), y = await fi({ src: e, inkCanvas: b, highlightCanvas: j }), M = new File([y], `annotated-${Date.now()}.png`, { type: "image/png" });
        await a(s, M);
      } catch (b) {
        qt(b instanceof Error ? b.message : String(b));
      } finally {
        Hn(false);
      }
    }
  }, [a, e, Ve, E, $, ae, D.w, D.h]), dn = E.length + $.length + ae.length, tr = dn > 0 || !!J || Ft, jt = h.useCallback(() => {
    if (tr) {
      Xe(true);
      return;
    }
    Xe(false), r();
  }, [tr, r]), Aa = h.useCallback(() => {
    Xe(false), r();
  }, [r]), Pa = h.useCallback(() => {
    Xe(false);
  }, []);
  h.useEffect(() => {
    if (!i) return;
    const s = (u) => {
      var _a2;
      const b = u.target, S = (_a2 = b == null ? void 0 : b.tagName) == null ? void 0 : _a2.toLowerCase(), j = S === "input" || S === "textarea" || (b == null ? void 0 : b.isContentEditable), y = ia ? u.metaKey : u.ctrlKey, M = u.key.toLowerCase(), R = u.code;
      if (y && M === "s") {
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), vt(u.shiftKey ? "saveAs" : "overwrite");
        return;
      }
      if (y && M === "z" && !u.shiftKey) {
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), ln();
        return;
      }
      if (y && (M === "y" || M === "z" && u.shiftKey)) {
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), cn();
        return;
      }
      const Z = !!q || d === "text", de = y && (u.shiftKey && (u.key === "<" || u.key === "," || R === "Comma") || !u.shiftKey && (u.key === "[" || R === "BracketLeft")), oe = y && (u.shiftKey && (u.key === ">" || u.key === "." || R === "Period") || !u.shiftKey && (u.key === "]" || R === "BracketRight"));
      if (Z && (de || oe)) {
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), er(de ? -1 : 1);
        return;
      }
      if (u.key === "Escape") {
        if (Yt) return;
        if (d === "text" || ne) {
          u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), ne ? nt() : te(null);
          return;
        }
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), jt();
        return;
      }
      if (q && !y && (M === "backspace" || M === "delete")) {
        if (ne && j && S === "textarea" && b.value.length > 0) return;
        u.preventDefault(), u.stopPropagation(), u.stopImmediatePropagation(), on();
        return;
      }
      if (!j) {
        if (!y && u.key === "[") {
          u.preventDefault(), u.stopPropagation(), un(-1);
          return;
        }
        !y && u.key === "]" && (u.preventDefault(), u.stopPropagation(), un(1));
      }
    };
    return window.addEventListener("keydown", s, true), () => window.removeEventListener("keydown", s, true);
  }, [i, vt, ln, cn, un, er, q, ne, d, nt, on, jt, Yt]);
  const $a = d !== "pan" && d !== "text" && gt != null && !Te.current && !Ft, nr = an(d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen"), rr = Math.max(4, nr.w * l), ar = Math.max(4, nr.h * l), Ha = E.filter((s) => s.kind === "eraser"), Da = E.filter((s) => s.kind !== "eraser"), Ra = $.filter((s) => s.kind === "eraser"), Ba = $.filter((s) => s.kind !== "eraser"), _a = Ft && d === "highlighter" ? { mixBlendMode: F } : {}, sr = Hs(Oe(Ze) || "#111827ff"), za = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", rt = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [at, Oa] = h.useState(null);
  return o.jsxs(o.Fragment, { children: [o.jsx(Do, { open: i, onOpenChange: (s) => {
    s || jt();
  }, children: o.jsx(fn, { children: i ? o.jsxs(Ro, { forceMount: true, children: [o.jsx(Bo, { asChild: true, forceMount: true, children: o.jsx(ze.div, { className: "fixed inset-0 z-100060 bg-black/85", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: Ti }) }), o.jsx(_o, { asChild: true, forceMount: true, onOpenAutoFocus: (s) => s.preventDefault(), onEscapeKeyDown: (s) => {
    s.preventDefault();
  }, children: o.jsxs(ze.div, { ref: Oa, className: "fixed inset-0 z-100061 flex flex-col outline-none", "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30", initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: Ni, children: [o.jsx(zo, { className: "sr-only", children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30" }), o.jsx(Oo, { className: "sr-only", children: "\uBCA1\uD130 \uD39C\uC73C\uB85C \uADF8\uB9AC\uACE0 \uD655\uB300/\uCD95\uC18C\xB7\uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), o.jsx("div", { ref: Ma, className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${d === "pan" ? "cursor-grab" : d === "text" ? "cursor-text" : "cursor-none"}`, onPointerDown: Ea, onPointerMove: Ta, onPointerUp: Zn, onPointerCancel: Zn, onPointerLeave: () => {
    xt(null), $e.current = null;
  }, children: e ? o.jsx("div", { className: "relative will-change-transform", style: { transform: `translate(${f.x}px, ${f.y}px) scale(${l})`, transformOrigin: "center center" }, onClick: (s) => s.stopPropagation(), children: o.jsxs("div", { ref: kt, className: "relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl", style: Hi, children: [o.jsx("img", { ref: Gt, src: e, alt: t || "", className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none", draggable: false, onDoubleClick: La }), o.jsxs("svg", { className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none", viewBox: `0 0 ${D.w} ${D.h}`, preserveAspectRatio: "none", "aria-hidden": true, children: [o.jsxs("defs", { children: [o.jsxs("mask", { id: "haim-ink-erase-mask", children: [o.jsx("rect", { x: "0", y: "0", width: D.w, height: D.h, fill: "#fff" }), Ha.map((s) => o.jsx(he, { stroke: s }, `em-${s.id}`)), (J == null ? void 0 : J.kind) === "eraser" ? o.jsx(he, { stroke: J }) : null] }), o.jsxs("mask", { id: "haim-hi-erase-mask", children: [o.jsx("rect", { x: "0", y: "0", width: D.w, height: D.h, fill: "#fff" }), Ra.map((s) => o.jsx(he, { stroke: s }, `hem-${s.id}`)), (J == null ? void 0 : J.kind) === "eraser" ? o.jsx(he, { stroke: J }) : null] })] }), o.jsxs("g", { mask: "url(#haim-ink-erase-mask)", children: [Da.map((s) => o.jsx(he, { stroke: s }, s.id)), J && (J.kind === "pen" || J.kind === "pressure") ? o.jsx(he, { stroke: J }) : null] }), o.jsxs("g", { mask: "url(#haim-hi-erase-mask)", style: { mixBlendMode: F }, children: [Ba.map((s) => o.jsx("g", { style: { mixBlendMode: s.blend || F }, children: o.jsx(he, { stroke: s }) }, s.id)), (J == null ? void 0 : J.kind) === "highlighter" ? o.jsx("g", { style: { mixBlendMode: J.blend || F }, children: o.jsx(he, { stroke: J }) }) : null] }), o.jsxs("g", { children: [V.map((s) => o.jsx(he, { stroke: s, fading: ya.has(s.id) }, s.id)), (J == null ? void 0 : J.kind) === "laser" ? o.jsx(he, { stroke: J }) : null] })] }), o.jsx("canvas", { ref: Jt, className: "pointer-events-none absolute inset-0 h-full w-full", width: D.w, height: D.h, style: _a, "aria-hidden": true }), ae.map((s) => {
    const u = s.id === q, b = s.id === ne, S = s.x / Math.max(1, D.w) * 100, j = s.y / Math.max(1, D.h) * 100;
    return o.jsx("div", { className: `absolute z-1 min-w-8 max-w-[90%] ${u ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`, style: { left: `${S}%`, top: `${j}%`, color: s.color, opacity: s.opacity, fontFamily: s.fontFamily, fontSize: `${s.fontSizePx}px`, fontWeight: s.fontWeight, fontStyle: s.fontStyle, lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word", cursor: d === "text" || u ? "move" : "default", pointerEvents: d === "text" || u ? "auto" : "none" }, onPointerDown: (y) => {
      var _a2, _b;
      d !== "text" && d !== "pan" || (y.stopPropagation(), y.preventDefault(), se("text"), ne && ne !== s.id && nt(), Q(null), te(s.id), ce(s.fontFamily), G(s.fontSizePx), mt(s.fontWeight), zt(s.fontStyle), Qe.current = { id: s.id, pointerId: y.pointerId, startClientX: y.clientX, startClientY: y.clientY, originX: s.x, originY: s.y }, (_b = (_a2 = y.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, y.pointerId));
    }, onDoubleClick: (y) => {
      y.stopPropagation(), y.preventDefault(), se("text"), te(s.id), Q(s.id), ce(s.fontFamily), G(s.fontSizePx), mt(s.fontWeight), zt(s.fontStyle), window.setTimeout(() => {
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
      (y.key === "Backspace" || y.key === "Delete") && y.currentTarget.value.length === 0 && (y.preventDefault(), y.stopPropagation(), on());
    } }) : o.jsx("span", { className: "block", children: s.text || "\uD14D\uC2A4\uD2B8" }) }, s.id);
  })] }) }) : null }), $a && gt ? o.jsx("div", { className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow", style: { left: gt.x - rr / 2, top: gt.y - ar / 2, width: rr, height: ar, borderRadius: ie === "circle" ? "9999px" : "2px", borderStyle: ee === "dashed" ? "dashed" : "solid", opacity: O(ja, 0.25, 0.85), backgroundColor: d === "eraser" ? "transparent" : Oe(Ze) || void 0 }, "aria-hidden": true }) : null, (d === "text" || Je) && o.jsxs("aside", { className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md", onPointerDown: (s) => s.stopPropagation(), children: [o.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/90", children: [o.jsx(bn, { size: 14, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"] }), o.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [o.jsx("span", { children: "Font family" }), o.jsx(Ds, { value: (Je == null ? void 0 : Je.fontFamily) ?? ue, onChange: (s) => {
    ce(s), Ct({ fontFamily: s });
  }, className: "w-full", inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs", allowAddWebfont: true })] }), o.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [o.jsx("span", { children: "Font size" }), o.jsxs("div", { className: "flex items-center gap-1", children: [o.jsx("input", { type: "number", min: Sn, max: Cn, step: 1, value: (Je == null ? void 0 : Je.fontSizePx) ?? xe, onChange: (s) => {
    const u = O(Math.round(Number(s.target.value) || 24), Sn, Cn);
    G(u), Ct({ fontSizePx: u });
  }, className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white", "aria-label": "Font size (px)" }), o.jsx("span", { className: "shrink-0 text-white/60", children: "px" })] })] }), o.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [o.jsx("span", { children: "Font weight" }), o.jsxs(ot, { value: (Je == null ? void 0 : Je.fontWeight) ?? re, onValueChange: (s) => {
    mt(s), Ct({ fontWeight: s });
  }, children: [o.jsx(it, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font weight", children: o.jsx(pn, {}) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: rt, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsx(ut, { className: "p-1", children: xi.map((s) => o.jsx(ve, { value: s.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: o.jsx(je, { children: s.label }) }, s.value)) }) }) })] })] }), o.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [o.jsx("span", { children: "Font style" }), o.jsxs(ot, { value: (Je == null ? void 0 : Je.fontStyle) ?? Pe, onValueChange: (s) => {
    const u = s === "italic" ? "italic" : "normal";
    zt(u), Ct({ fontStyle: u });
  }, children: [o.jsx(it, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font style", children: o.jsx(pn, {}) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: rt, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsxs(ut, { className: "p-1", children: [o.jsx(ve, { value: "normal", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: o.jsx(je, { children: "Normal" }) }), o.jsx(ve, { value: "italic", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: o.jsx(je, { children: "Italic" }) })] }) }) })] })] }), o.jsxs("p", { className: "text-[10px] leading-4 text-white/45", children: ["\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9", o.jsx("br", {}), "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1", o.jsx("br", {}), pe, "+[ ] / ", pe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30"] })] }), o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1", onPointerDown: (s) => s.stopPropagation(), children: [o.jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md", children: [o.jsx(X, { label: "\uD328\uB2DD", active: d === "pan", onClick: () => se("pan"), children: o.jsx(Vs, { size: 16 }) }), o.jsx(X, { label: "\uC77C\uBC18 \uD39C", active: d === "pen", onClick: () => se("pen"), children: o.jsx(Xs, { size: 16 }) }), o.jsx(X, { label: "\uD544\uC555 \uD39C", active: d === "pressure", onClick: () => se("pressure"), children: o.jsx(Ys, { size: 16 }) }), o.jsx(X, { label: "\uD615\uAD11\uD39C", active: d === "highlighter", onClick: Ia, children: o.jsx(Qs, { size: 16 }) }), o.jsx(X, { label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)", active: d === "laser", onClick: () => se("laser"), children: o.jsx(Gs, { size: 16 }) }), o.jsx(X, { label: "\uC9C0\uC6B0\uAC1C", active: d === "eraser", onClick: () => se("eraser"), children: o.jsx(Js, { size: 16 }) }), o.jsx(X, { label: "\uD14D\uC2A4\uD2B8", active: d === "text", onClick: () => se("text"), children: o.jsx(bn, { size: 16 }) }), o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), o.jsxs("div", { className: "relative flex items-center", children: [o.jsx("button", { type: "button", "aria-label": "\uD39C \uC0C9\uC0C1", "aria-expanded": Xt, onClick: () => {
    Rn((s) => (s && Vt(false), !s));
  }, className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow", style: { backgroundColor: Oe(Ze) || "#111827" } }), o.jsx(fn, { mode: "popLayout", children: Xt ? o.jsxs(ze.div, { initial: { opacity: 0, y: 16, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.9 }, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 }, className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md", children: [(d === "highlighter" ? $i : Pi).map((s, u, b) => {
    const S = (Oe(Ze) || "").slice(0, 7).toLowerCase() === s.toLowerCase(), j = 0.03 * (b.length - u);
    return o.jsx(ze.button, { type: "button", "aria-label": `\uC0C9\uC0C1 ${s}`, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: j }, onClick: () => {
      Vt(false), d === "highlighter" ? k(`${s}ff`) : (x(`${s}ff`), (d === "pan" || d === "eraser" || d === "laser") && se("pen")), Rn(false);
    }, className: `h-7 w-7 rounded-full border-2 shadow ${S ? "border-sky-300 scale-110" : "border-white/40"}`, style: { backgroundColor: s } }, s);
  }), o.jsx(ze.button, { type: "button", "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1", "aria-pressed": Ut, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: 0 }, onClick: () => Vt((s) => !s), className: `h-7 w-7 rounded-full border-2 shadow ${Ut ? "border-sky-300 scale-110" : "border-white/50"}`, style: zi })] }, "haim-color-palette") : null }), o.jsx(fn, { children: Xt && Ut ? o.jsxs(ze.div, { initial: { opacity: 0, x: -6, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 }, transition: { duration: 0.18, ease: An }, className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md", children: [o.jsx("div", { className: "mb-2 h-8 w-full rounded border border-white/20", style: { ...Rs, backgroundColor: Ze } }), o.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: o.jsx(Ps, { color: sr, onChange: (s) => {
    const u = Oe(s.startsWith("#") ? s : `#${s}`);
    u && (d === "highlighter" ? k(u) : (x(u), (d === "pan" || d === "eraser" || d === "laser") && se("pen")));
  } }) }), o.jsx($s, { alpha: true, prefixed: true, color: sr, onChange: (s) => {
    const u = Oe(s.startsWith("#") ? s : `#${s}`);
    u && (d === "highlighter" ? k(u) : x(u));
  }, className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white" })] }, "haim-color-picker") : null })] }), o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), d === "highlighter" ? o.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [o.jsxs("label", { className: "flex items-center gap-0.5", children: [o.jsx("span", { className: "opacity-70", children: "W" }), o.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" }), o.jsx("input", { type: "number", min: Se, max: Me, step: 0.1, value: v, onChange: (s) => T(Ke(O(Number(s.target.value) || 1, Se, Me))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" })] }), o.jsx("span", { className: "opacity-50", "aria-hidden": true, children: "\xD7" }), o.jsxs("label", { className: "flex items-center gap-0.5", children: [o.jsx("span", { className: "opacity-70", children: "H" }), o.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" }), o.jsx("input", { type: "number", min: Se, max: Me, step: 0.1, value: B, onChange: (s) => I(Ke(O(Number(s.target.value) || 1, Se, Me))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" })] }), o.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }) : o.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [o.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), o.jsx("input", { type: "number", min: Se, max: Me, step: 0.1, value: v, onChange: (s) => Na(Number(s.target.value) || 1), className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), o.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }), o.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [o.jsx("span", { className: "opacity-70", children: "\uD750\uB984" }), o.jsx("input", { type: "number", min: 5, max: 100, step: 5, value: Math.round((d === "highlighter" ? _ : w) * 100), onChange: (s) => {
    const b = O(Number(s.target.value) || 5, 5, 100) / 100;
    d === "highlighter" ? A(b) : N(b);
  }, className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uD750\uB984 (%)" }), o.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "%" })] }), o.jsxs(ot, { value: ie, onValueChange: (s) => Ae(s), children: [o.jsx(it, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ie === "circle" ? "\uC6D0" : "\uB124\uBAA8", children: ie === "circle" ? o.jsx(ur, { size: 16 }) : o.jsx(dr, { size: 16 }) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: rt, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsxs(ut, { className: "p-1", children: [o.jsxs(ve, { value: "circle", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uC6D0", children: [o.jsx(ur, { size: 16 }), o.jsx(je, { className: "sr-only", children: "\uC6D0" })] }), o.jsxs(ve, { value: "square", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uB124\uBAA8", children: [o.jsx(dr, { size: 16 }), o.jsx(je, { className: "sr-only", children: "\uB124\uBAA8" })] })] }) }) })] }), o.jsxs(ot, { value: ee, onValueChange: (s) => L(s), children: [o.jsx(it, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ee === "dashed" ? "Dashed" : "Solid", children: ee === "dashed" ? o.jsx(Sr, { size: 16 }) : o.jsx(yr, { size: 16 }) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: rt, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsxs(ut, { className: "p-1", children: [o.jsxs(ve, { value: "solid", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Solid", children: [o.jsx(yr, { size: 16 }), o.jsx(je, { className: "sr-only", children: "Solid" })] }), o.jsxs(ve, { value: "dashed", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Dashed", children: [o.jsx(Sr, { size: 16 }), o.jsx(je, { className: "sr-only", children: "Dashed" })] })] }) }) })] }), d === "highlighter" ? o.jsxs(ot, { value: F, onValueChange: (s) => U(s), children: [o.jsx(it, { className: za, "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC", children: o.jsx(pn, { placeholder: "Blend" }) }), o.jsx(lt, { container: at, children: o.jsx(ct, { className: `${rt} max-h-56 overflow-auto`, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (s) => s.preventDefault(), children: o.jsx(ut, { className: "p-1", children: bi.map((s) => o.jsx(ve, { value: s.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: o.jsx(je, { children: s.label }) }, s.value)) }) }) })] }) : null, o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), o.jsx(X, { label: `\uC2E4\uD589 \uCDE8\uC18C (${pe}+Z)`, disabled: dn === 0, onClick: ln, children: o.jsx(qr, { size: 16 }) }), o.jsx(X, { label: `\uB2E4\uC2DC \uC2E4\uD589 (${wr})`, disabled: Sa.length === 0, onClick: cn, children: o.jsx(Ur, { size: 16 }) }), o.jsx(X, { label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30", disabled: dn === 0 && V.length === 0, onClick: nn, children: o.jsx(Zs, { size: 16 }) }), o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), o.jsx(X, { label: "\uCD95\uC18C", onClick: () => {
    var _a2;
    const s = (_a2 = bt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!s) {
      c((u) => O(u / Fe, Lt, Et));
      return;
    }
    Re(l / Fe, s.left + s.width / 2, s.top + s.height / 2);
  }, children: o.jsx(eo, { size: 16 }) }), o.jsxs("span", { className: "min-w-10 text-center text-[11px] tabular-nums text-white/80", children: [Math.round(l * 100), "%"] }), o.jsx(X, { label: "\uD655\uB300", onClick: () => {
    var _a2;
    const s = (_a2 = bt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!s) {
      c((u) => O(u * Fe, Lt, Et));
      return;
    }
    Re(l * Fe, s.left + s.width / 2, s.top + s.height / 2);
  }, children: o.jsx(to, { size: 16 }) }), o.jsx(X, { label: "\uBCF4\uAE30 \uCD08\uAE30\uD654", onClick: et, children: o.jsx(no, { size: 16 }) }), o.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), o.jsx(X, { label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${pe}+S)`, tone: "save", disabled: !Kn || Ve, onClick: () => {
    vt("overwrite");
  }, children: o.jsx(ro, { size: 16 }) }), o.jsx(X, { label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${pe}+Shift+S)`, tone: "saveAs", disabled: !Kn || Ve, onClick: () => {
    vt("saveAs");
  }, children: o.jsx(ao, { size: 16 }) })] }), o.jsxs("p", { className: "max-w-xl text-center text-[10px] text-white/55", children: ["\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ", pe, "+[ ] / ", pe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ", pe, "+Z / ", wr, va ? " \xB7 Ink API" : "", Ve ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""] }), Dn ? o.jsx("p", { className: "max-w-xl text-center text-[10px] text-red-300", children: Dn }) : null] }) }), o.jsx("button", { type: "button", className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80", "aria-label": "\uB2EB\uAE30", onClick: jt, children: o.jsx(so, { size: 20 }) })] }) })] }, "haim-image-lightbox") : null }) }), o.jsx(Bs, { isOpen: Yt, title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30", cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1", variant: "danger", overlayClassName: "z-100070", onConfirm: Aa, onCancel: Pa })] });
}
function Oi({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
  const i = String(e.attrs.src || ""), l = String(e.attrs.alt || ""), c = String(e.attrs.title || ""), f = n.isEditable, [p, d] = h.useState(false), [g, m] = h.useState(null), x = h.useCallback((v) => {
    if (v.detail > 1) return;
    v.preventDefault(), v.stopPropagation();
    const T = typeof r == "function" ? r() : null;
    typeof T == "number" && n.chain().focus().setNodeSelection(T).run();
  }, [n, r]), C = h.useCallback((v) => {
    v.preventDefault(), v.stopPropagation(), i && (m(i), d(true));
  }, [i]), k = h.useCallback(async (v, T) => {
    if (!f) return;
    const B = await sa(T), I = typeof r == "function" ? r() : null, w = URL.createObjectURL(T);
    if (v === "overwrite") {
      typeof I == "number" ? n.chain().focus().deleteRange({ from: I, to: I + e.nodeSize }).insertContentAt(I, { type: "wikiImage", attrs: { path: B, options: "", alt: B, width: null, height: null, background: null } }).run() : a({ src: w }), m(w);
      return;
    }
    if (typeof I != "number") return;
    const N = I + e.nodeSize;
    n.chain().focus().insertContentAt(N, { type: "wikiImage", attrs: { path: B, options: "", alt: B, width: null, height: null, background: null } }).run();
  }, [f, n, r, a, e.nodeSize]);
  return o.jsxs(me, { as: "span", className: `haim-stock-image-wrap${t ? " is-selected" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: x, onDoubleClick: C, children: [o.jsx("img", { src: i, alt: l, ...c ? { title: c } : {}, className: "haim-stock-image max-w-full h-auto cursor-pointer", draggable: false }), o.jsx(la, { src: g || i || null, alt: l, open: p, onClose: () => {
    d(false), m(null);
  }, ...f ? { onSaveAnnotated: k } : {} })] });
}
let vn = null;
function Vc(e) {
  vn = e;
}
function Fi(e) {
  const t = String(e || "").trim().replace(/^\/+/, "");
  return !t || typeof vn != "function" ? false : (vn(t), true);
}
const Cr = "haim-mod-held";
function Ki(e, t) {
  let n = null;
  if (t.target instanceof HTMLAnchorElement) n = t.target;
  else {
    const r = t.target;
    if (!r) return null;
    n = r.closest("a");
  }
  return !n || !e.view.dom.contains(n) ? null : n;
}
function Wi(e, t, n) {
  const r = Wa(e.state, t.name), a = String(r.href || "").trim();
  return a || String(n.getAttribute("href") || n.href || "").trim();
}
function qi(e, t) {
  const n = (t.getAttribute("target") || t.target || "_blank").trim(), r = !n || n === "_self" ? "_blank" : n;
  window.open(e, r, "noopener,noreferrer");
}
function Ui() {
  return new ft({ key: new qe("haimLinkModCursor"), view(e) {
    const t = (c) => {
      e.dom.classList.toggle(Cr, c);
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
      window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", a, true), window.removeEventListener("blur", i), e.dom.removeEventListener("mousemove", l), e.dom.classList.remove(Cr);
    } };
  } });
}
function Vi(e, t, n, r) {
  if (r.button !== 0) return false;
  const a = Ki(e, r);
  if (!a) return false;
  const i = Wi(n, t, a);
  if (!i) return false;
  const l = zs(i), c = Os(), f = r.metaKey || r.ctrlKey;
  return l ? n.editable && !f && !c ? false : (r.preventDefault(), r.stopPropagation(), Fi(l), true) : !n.editable || !f && !c ? false : (r.preventDefault(), qi(i, a), true);
}
function Xi(e, t) {
  return new ft({ key: new qe("haimLinkClick"), props: { handleDOMEvents: { click: (n, r) => Vi(e, t, n, r) } } });
}
const Yi = Ka.extend({ renderHTML({ HTMLAttributes: e }) {
  const t = String(e.href || ""), n = _s(t);
  return ["a", ge(this.options.HTMLAttributes, e, { class: n ? "haim-docuhaim-link" : null }), 0];
}, addProseMirrorPlugins() {
  var _a;
  return [...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? [], Ui(), Xi(this.editor, this.type)];
} }).configure({ openOnClick: false, autolink: true, protocols: ["docuhaim"], HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } });
function vr(e) {
  if (!e || typeof e != "object") return;
  const t = e;
  t.__haimRawTextPatched || (t.encodeTextForMarkdown = (n) => n, t.escapeMarkdownSyntax = (n) => n, t.__haimRawTextPatched = true);
}
const Qi = qa.extend({ onBeforeCreate(e) {
  var _a, _b, _c;
  (_a = this.parent) == null ? void 0 : _a.call(this, e);
  const t = (_b = this.storage) == null ? void 0 : _b.manager;
  t && vr(t), ((_c = this.editor) == null ? void 0 : _c.markdown) && vr(this.editor.markdown);
} }), Gi = /^\s*(\[([ xX~]?)\])\s$/, Ji = /^\s*[-*+]\s*\[([ xX~])\]\s$/;
function jr(e) {
  return Jr(e === void 0 || e === "" ? " " : e);
}
function jn(e) {
  const t = dt(e), n = Nt(e);
  return { status: t, checked: t === "done", kind: t === "doing" ? "status" : n };
}
function Mr(e, t, n) {
  var _a, _b;
  const r = e.schema.nodes.taskItem, a = e.schema.nodes.taskList;
  if (!r || !a) return null;
  const i = e.doc.resolve(t.from);
  let l = -1, c = -1;
  for (let m = i.depth; m >= 1; m -= 1) {
    const x = i.node(m).type.name;
    l < 0 && x === "listItem" && (l = m), c < 0 && (x === "bulletList" || x === "orderedList") && (c = m);
  }
  const f = e.tr.delete(t.from, t.to);
  if (l > 0 && c > 0) {
    const m = i.before(c), x = i.index(c), C = f.mapping.map(m), k = f.doc.nodeAt(C);
    if (!k) return null;
    const v = [];
    k.forEach((I, w, N) => {
      const _ = N === x ? n : I.type.name === "taskItem" ? jn(I.attrs) : { status: "todo", checked: false, kind: "check" };
      v.push(r.create(_, I.content, I.marks));
    });
    const T = a.create(k.attrs, v);
    f.replaceWith(C, C + k.nodeSize, T), hn(f.doc, C) && ((_a = f.doc.resolve(C).nodeBefore) == null ? void 0 : _a.type) === a && f.join(C);
    const B = f.doc.nodeAt(C);
    if (B) {
      const I = C + B.nodeSize;
      hn(f.doc, I) && ((_b = f.doc.nodeAt(I)) == null ? void 0 : _b.type) === a && f.join(I);
    }
    return;
  }
  const p = f.doc.resolve(t.from).blockRange(), d = p && Xa(p, r, n);
  if (!d) return null;
  f.wrap(p, d);
  const g = f.doc.resolve(t.from - 1).nodeBefore;
  g && g.type === r && hn(f.doc, t.from - 1) && f.join(t.from - 1);
}
function mn(e, t, n, r) {
  t.dataset.status = n, t.dataset.kind = r, t.dataset.checked = n === "done" ? "true" : "false", e.dataset.status = n, e.dataset.kind = r, e.className = r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", e.checked = n === "done", e.indeterminate = n === "doing", e.setAttribute("aria-checked", n === "doing" ? "mixed" : n === "done" ? "true" : "false"), e.setAttribute("aria-label", r === "status" ? n === "doing" ? "Status task in progress" : n === "done" ? "Status task completed" : "Status task not started" : n === "done" ? "Task completed" : "Task not started");
}
const Zi = Ua.extend({ addStorage() {
  return { preferredKind: "check" };
}, addCommands() {
  return { setHaimTaskCheckboxPreferredKind: (e) => () => (this.storage.preferredKind = e === "status" ? "status" : "check", true) };
}, addAttributes() {
  return { kind: { default: "check", keepOnSplit: false, parseHTML: (e) => {
    const t = e.getAttribute("data-kind"), n = e.getAttribute("data-status");
    return pr(t, n === "todo" || n === "doing" || n === "done" ? n : void 0);
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
  const r = e.status === "todo" || e.status === "doing" || e.status === "done" ? e.status : e.checked ? "done" : "todo", a = e.kind === "status" || e.kind === "check" ? pr(e.kind, r) : r === "doing" ? "status" : "check";
  return t.createNode("taskItem", { status: r, checked: r === "done", kind: a }, n);
}, renderMarkdown: (e, t) => {
  const n = dt(e == null ? void 0 : e.attrs), r = Nt(e == null ? void 0 : e.attrs), i = `- [${Vo(n, r)}] `;
  return Va(e, t, i);
}, addNodeView() {
  return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
    const a = document.createElement("li"), i = document.createElement("label"), l = document.createElement("input"), c = document.createElement("div");
    let f = e;
    i.contentEditable = "false", l.type = "checkbox";
    const p = (m) => {
      const x = jn(m.attrs);
      mn(l, a, x.status, x.kind);
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
      const x = jn(f.attrs), C = ((_a = r.storage.taskItem) == null ? void 0 : _a.preferredKind) === "status" ? "status" : "check";
      if (!r.isEditable && !this.options.onReadOnlyChecked) {
        p(f);
        return;
      }
      const k = Uo(x.status, C), v = { status: k, checked: k === "done", kind: C };
      if (r.isEditable) {
        mn(l, a, v.status, v.kind), d(v);
        return;
      }
      this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(f, v.checked) ? mn(l, a, v.status, v.kind) : p(f));
    };
    return i.addEventListener("pointerdown", (m) => {
      m.button === 0 && g(m);
    }), l.addEventListener("click", (m) => {
      m.preventDefault(), m.stopPropagation();
    }), l.addEventListener("change", (m) => {
      m.preventDefault(), p(f);
    }), Object.entries(this.options.HTMLAttributes).forEach(([m, x]) => {
      a.setAttribute(m, String(x));
    }), a.append(i, c), i.append(l), Object.entries(t).forEach(([m, x]) => {
      a.setAttribute(m, String(x));
    }), { dom: a, contentDOM: c, stopEvent: (m) => {
      const x = m.target;
      return !!(x && i.contains(x));
    }, ignoreMutation: (m) => m.type === "selection" || i.contains(m.target), update: (m) => m.type !== this.type ? false : (f = m, p(m), true) };
  };
}, addInputRules() {
  return [new xn({ find: Gi, handler: ({ state: e, range: t, match: n }) => {
    var _a;
    const r = ((_a = this.editor.storage.taskItem) == null ? void 0 : _a.preferredKind) === "status" ? "status" : "check", a = jr(n[2]);
    return Mr(e, t, { status: a.status, checked: a.checked, kind: r });
  } }), new xn({ find: Ji, handler: ({ state: e, range: t, match: n }) => {
    var _a;
    const r = ((_a = this.editor.storage.taskItem) == null ? void 0 : _a.preferredKind) === "status" ? "status" : "check", a = jr(n[1]);
    return Mr(e, t, { status: a.status, checked: a.checked, kind: r });
  } })];
} }), el = /^\s*[-+*]\s+\[([ xX~])\]\s+/, Lr = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;
function Er(e) {
  var _a;
  const t = Jr(e[3]);
  return { indentLevel: ((_a = e[1]) == null ? void 0 : _a.length) ?? 0, mainContent: e[4] ?? "", checked: t.checked, status: t.status, kind: t.kind };
}
function Tr(e, t, n = []) {
  return { type: "taskItem", raw: "", mainContent: e.mainContent, indentLevel: e.indentLevel, checked: e.checked, status: e.status, kind: e.kind, text: e.mainContent, tokens: t.inlineTokens(e.mainContent), nestedTokens: n };
}
const tl = Ya.extend({ markdownTokenizer: { name: "taskList", level: "block", start(e) {
  var _a;
  const t = (_a = e.match(el)) == null ? void 0 : _a.index;
  return t !== void 0 ? t : -1;
}, tokenize(e, t, n) {
  const r = (i) => {
    const l = or(i, { itemPattern: Lr, extractItemData: Er, createToken: (c, f) => Tr(c, n, f ?? []), customNestedParser: r }, n);
    if (l) {
      const c = { type: "taskList", raw: l.raw, items: l.items }, f = i.slice(l.raw.length);
      return f.trim() ? [c, ...n.blockTokens(f)] : [c];
    }
    return n.blockTokens(i);
  }, a = or(e, { itemPattern: Lr, extractItemData: Er, createToken: (i, l) => Tr(i, n, l ?? []), customNestedParser: r }, n);
  if (a) return { type: "taskList", raw: a.raw, items: a.items };
} } }), nl = Qa.extend({ name: "nodeRange", addKeyboardShortcuts() {
  var _a;
  const n = { ...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? {} };
  return delete n["Shift-ArrowUp"], delete n["Shift-ArrowDown"], n;
} }), rl = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, al = Le.create({ name: "pageBreak", group: "block", atom: true, selectable: true, draggable: true, parseHTML() {
  return [{ tag: "pgbr" }, { tag: "div[data-haim-pgbr]" }, { tag: "div.md-pgbr" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", ge(e, { "data-haim-pgbr": "1", "data-md-pgbr": "1", class: "haim-pgbr md-pgbr" })];
}, markdownTokenizer: { name: "pageBreak", level: "block", start: (e) => {
  const t = /<pgbr\s*\/?\s*>/i.exec(e);
  return t ? t.index : -1;
}, tokenize: (e) => {
  const t = rl.exec(e);
  if (t) return { type: "pageBreak", raw: t[0] };
} }, parseMarkdown: (e, t) => t.createNode("pageBreak"), renderMarkdown: () => `<pgbr/>

`, addCommands() {
  return { setPageBreak: () => ({ chain: e, state: t }) => {
    const n = t.schema.nodes[this.name];
    if (!n || !Ga(t, n)) return false;
    const { selection: r } = t, { $to: a } = r, i = e();
    return Ja(r) ? i.insertContentAt(a.pos, { type: this.name }) : i.insertContent({ type: this.name }), i.command(({ state: l, tr: c, dispatch: f }) => {
      var _a;
      if (f) {
        const { $to: p } = c.selection, d = p.end();
        if (p.nodeAfter) p.nodeAfter.isTextblock ? c.setSelection(K.create(c.doc, p.pos + 1)) : p.nodeAfter.isBlock ? c.setSelection(Or.create(c.doc, p.pos)) : c.setSelection(K.create(c.doc, p.pos));
        else {
          const m = (_a = l.schema.nodes.paragraph || p.parent.type.contentMatch.defaultType) == null ? void 0 : _a.create();
          m && (c.insert(d, m), c.setSelection(K.create(c.doc, d + 1)));
        }
        c.scrollIntoView();
      }
      return true;
    }).run();
  } };
} }), Pn = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", sl = ["nw", "ne", "sw", "se"];
function Nr(e) {
  if (!e) return;
  const t = {};
  for (const n of e.split(";")) {
    const r = n.trim();
    if (!r) continue;
    const a = r.indexOf(":");
    if (a < 0) continue;
    const i = r.slice(0, a).trim(), l = r.slice(a + 1).trim(), c = i.replace(/-([a-z])/g, (f, p) => p.toUpperCase());
    t[c] = l;
  }
  return t;
}
function Ir(e, t, n, r) {
  const a = In({ path: e, width: t, height: n, background: r }), i = a.indexOf("|");
  if (i < 0) return "";
  const l = a.lastIndexOf("]]");
  return a.slice(i + 1, l >= 0 ? l : void 0).trim();
}
function Tt(e) {
  return `${Math.max(24, Math.round(e))}px`;
}
function ol(e) {
  return e ? e.closest(".overflow-auto") || e.parentElement : null;
}
function il({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
  var _a, _b;
  const i = String(e.attrs.path || ""), l = String(e.attrs.options || ""), c = String(e.attrs.alt || i), f = e.attrs.width || null, p = e.attrs.height || null, d = e.attrs.background || null, g = n.isEditable, m = h.useRef(null), x = h.useRef(null), [C, k] = h.useState(false), [v, T] = h.useState(false), [B, I] = h.useState(null), [w, N] = h.useState(null);
  x.current = w;
  const _ = h.useMemo(() => w ? { ...Nr(It({ width: null, height: null, background: d })), width: `${w.width}px`, height: `${w.height}px` } : Nr(It({ width: f, height: p, background: d })), [f, p, d, w]), A = h.useCallback((L, E) => {
    const H = { width: L, height: E, options: Ir(i, L, E, d) }, $ = ol(n.view.dom), z = ($ == null ? void 0 : $.scrollTop) ?? null, V = typeof r == "function" ? r() : null;
    if (typeof V == "number") {
      const ae = n.state.tr.setNodeMarkup(V, void 0, { ...e.attrs, ...H });
      n.view.dispatch(ae);
    } else a(H);
    const le = () => {
      $ && z != null && ($.scrollTop = z);
    };
    le(), requestAnimationFrame(le), requestAnimationFrame(() => requestAnimationFrame(le));
  }, [n, r, a, i, d, e.attrs]), F = h.useCallback(() => {
    const L = x.current;
    L && (A(Tt(L.width), Tt(L.height)), N(null), x.current = null);
    const E = typeof r == "function" ? r() : null;
    if (typeof E == "number") {
      const H = E + (e.nodeSize || 1);
      n.commands.setTextSelection(H);
    }
    n.commands.blur();
  }, [A, n, r, e.nodeSize]), U = h.useCallback((L, E) => {
    var _a2, _b2;
    if (!g) return;
    E.preventDefault(), E.stopPropagation();
    const H = m.current;
    if (!H) return;
    const $ = H.getBoundingClientRect(), z = $.width, V = $.height, le = E.clientX, ae = E.clientY, Y = V > 0 ? z / V : 1, q = E.pointerId;
    (_b2 = (_a2 = E.target).setPointerCapture) == null ? void 0 : _b2.call(_a2, q);
    const te = { width: z, height: V };
    x.current = te, N(te);
    const ne = (ue) => {
      const ce = ue.clientX - le, xe = ue.clientY - ae;
      let G = z, re = V;
      L.includes("e") && (G = z + ce), L.includes("w") && (G = z - ce), L.includes("s") && (re = V + xe), L.includes("n") && (re = V - xe), G = Math.max(24, G), re = Math.max(24, re), (ue.shiftKey || ue.pointerType === "touch") && (Math.abs(ce) >= Math.abs(xe) ? re = G / Y : G = re * Y, G = Math.max(24, G), re = Math.max(24, re));
      const Pe = { width: G, height: re };
      x.current = Pe, N(Pe);
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
  h.useEffect(() => {
    if (!t || !g || C || v) return;
    const L = (E) => {
      if (E.key !== "Enter") return;
      const H = E.target;
      H instanceof HTMLInputElement || H instanceof HTMLTextAreaElement || H instanceof HTMLElement && H.isContentEditable || (E.preventDefault(), E.stopPropagation(), F());
    };
    return document.addEventListener("keydown", L, true), () => document.removeEventListener("keydown", L, true);
  }, [t, g, C, v, F]);
  const ie = h.useCallback((L) => {
    if (L.detail > 1 || L.target instanceof Element && L.target.closest("[data-resize-handle]")) return;
    L.preventDefault(), L.stopPropagation();
    const E = typeof r == "function" ? r() : null;
    typeof E == "number" && n.chain().focus().setNodeSelection(E).run();
  }, [n, r]), Ae = h.useCallback((L) => {
    L.preventDefault(), L.stopPropagation();
    const E = m.current, H = (E == null ? void 0 : E.currentSrc) || (E == null ? void 0 : E.src) || "";
    H && (I(H), T(true));
  }, []), ee = h.useCallback(async (L, E) => {
    if (!g) return;
    const H = await sa(E), $ = typeof r == "function" ? r() : null;
    if (L === "overwrite") {
      const V = { path: H, alt: H, options: Ir(H, f, p, d) };
      typeof $ == "number" ? n.view.dispatch(n.state.tr.setNodeMarkup($, void 0, { ...e.attrs, ...V })) : a(V);
      const le = URL.createObjectURL(E);
      I(le);
      return;
    }
    if (typeof $ != "number") return;
    const z = $ + e.nodeSize;
    n.chain().focus().insertContentAt(z, { type: "wikiImage", attrs: { path: H, options: "", alt: H, width: null, height: null, background: null } }).run();
  }, [g, n, r, a, f, p, d, e.attrs, e.nodeSize]);
  return o.jsxs(me, { as: "div", className: `haim-wiki-image-wrap${t ? " is-selected" : ""}${w ? " is-resizing" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: ie, onDoubleClick: Ae, onContextMenu: (L) => {
    g && (L.preventDefault(), L.stopPropagation(), k(true));
  }, children: [o.jsxs("div", { className: "haim-wiki-image-frame", children: [o.jsx("img", { ref: m, src: Pn, alt: c, className: "haim-wiki-image", "data-wiki-path": i, ...l ? { "data-wiki-options": l } : {}, ...f ? { "data-wiki-width": f } : {}, ...p ? { "data-wiki-height": p } : {}, ...d ? { "data-wiki-bg": d } : {}, style: _, draggable: false }), t && g ? sl.map((L) => o.jsx("button", { type: "button", className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${L}`, "aria-label": `resize-${L}`, "data-resize-handle": L, onPointerDown: (E) => U(L, E) }, L)) : null] }), o.jsx(Yo, { isOpen: C, onClose: () => k(false), path: i, kind: "wiki", initialWidth: f ?? "", initialHeight: p ?? "", imageSrc: ((_a = m.current) == null ? void 0 : _a.currentSrc) || ((_b = m.current) == null ? void 0 : _b.src) || "", onApply: ({ width: L, height: E }) => {
    A(L, E), k(false);
  } }), o.jsx(la, { src: B, alt: c, open: v, onClose: () => {
    T(false), I(null);
  }, ...g ? { onSaveAnnotated: ee } : {} })] });
}
function ca(e, t, n = "") {
  const r = t ? Fs(t) : null;
  return { path: e, options: t || "", alt: n || e, width: (r == null ? void 0 : r.width) ?? null, height: (r == null ? void 0 : r.height) ?? null, background: (r == null ? void 0 : r.background) ?? null };
}
const ll = Le.create({ name: "wikiImage", group: "block", atom: true, selectable: true, draggable: true, addAttributes() {
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
    return ca(t, n, e.getAttribute("data-wiki-alt") || t);
  } }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const n = String(e.attrs.path || ""), r = String(e.attrs.options || ""), a = String(e.attrs.alt || n), i = e.attrs.width || null, l = e.attrs.height || null, c = e.attrs.background || null, f = It({ width: i, height: l, background: c });
  return ["img", ge(t, { src: Pn, alt: a, "data-wiki-path": n, ...r ? { "data-wiki-options": r } : {}, ...i ? { "data-wiki-width": i } : {}, ...l ? { "data-wiki-height": l } : {}, ...c ? { "data-wiki-bg": c } : {}, ...f ? { style: f } : {}, class: "haim-wiki-image" })];
}, addNodeView() {
  return Ue(il);
}, renderMarkdown: (e) => {
  var _a, _b, _c, _d, _e;
  const t = String(((_a = e.attrs) == null ? void 0 : _a.path) || "");
  if (!t) return "";
  const n = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c = e.attrs) == null ? void 0 : _c.height) || null, a = ((_d = e.attrs) == null ? void 0 : _d.background) || null;
  if (n || r || a) return `${In({ path: t, width: n, height: r, background: a })}

`;
  const i = String(((_e = e.attrs) == null ? void 0 : _e.options) || "");
  return i ? `![[${t}|${i}]]

` : `![[${t}]]

`;
} });
function Xc(e, t = "", n = "") {
  const r = ca(e, t, n), a = It({ width: r.width, height: r.height, background: r.background }), i = [`src="${Pn}"`, `alt="${Ie(r.alt)}"`, `data-wiki-path="${Ie(r.path)}"`, 'class="haim-wiki-image"'];
  return r.options && i.push(`data-wiki-options="${Ie(r.options)}"`), r.width && i.push(`data-wiki-width="${Ie(r.width)}"`), r.height && i.push(`data-wiki-height="${Ie(r.height)}"`), r.background && i.push(`data-wiki-bg="${Ie(r.background)}"`), a && i.push(`style="${Ie(a)}"`), `<img ${i.join(" ")} />`;
}
function Ie(e) {
  return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
const cl = Le.create({ name: "wikiFigure", group: "block", content: "wikiImage figcaption", defining: true, isolating: true, parseHTML() {
  return [{ tag: "figure[data-haim-wiki-figure]" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figure", ge(e, { "data-haim-wiki-figure": "1", class: "haim-wiki-figure" }), 0];
}, renderMarkdown: (e, t) => {
  const n = Array.isArray(e.content) ? e.content : [], r = n.find((c) => c.type === "wikiImage"), a = n.find((c) => c.type === "figcaption");
  let i = "";
  if (r == null ? void 0 : r.attrs) {
    const c = String(r.attrs.path || "");
    if (c) {
      const f = r.attrs.width || null, p = r.attrs.height || null, d = r.attrs.background || null;
      if (f || p || d) i = In({ path: c, width: f, height: p, background: d });
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
} }), ul = Le.create({ name: "figcaption", content: "inline*", defining: true, selectable: false, parseHTML() {
  return [{ tag: "figcaption" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figcaption", ge(e), 0];
}, renderMarkdown: (e, t) => t.renderChildren(e.content || []) }), dl = Le.create({ name: "noteCover", group: "block", atom: true, selectable: true, draggable: false, parseHTML() {
  return [{ tag: "div[data-note-cover-placeholder]", priority: 60 }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", ge(e, { class: "md-note-cover-placeholder md-note-cover-placeholder--pending", "data-note-cover-placeholder": "1", role: "button", tabindex: "0", title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9" }), ["div", { class: "md-note-cover-placeholder__mount", "data-note-cover-mount": "1" }], ["span", { class: "md-note-cover-placeholder__fallback" }, ["span", { class: "md-note-cover-placeholder__spinner", "aria-hidden": "true" }], ["span", { class: "md-note-cover-placeholder__fallback-text" }, "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"]]];
}, renderMarkdown: () => "" });
function Yc() {
  return `${Xo()}

`;
}
function hl(e) {
  const t = getComputedStyle(e), n = t.lineHeight;
  if (n && n !== "normal") {
    const a = Number.parseFloat(n);
    if (Number.isFinite(a) && a > 0) return a;
  }
  const r = Number.parseFloat(t.fontSize);
  return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
}
function ua(e) {
  const t = hl(e);
  try {
    const n = getComputedStyle(e), r = document.createElement("div");
    r.setAttribute("aria-hidden", "true"), r.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", "width:auto", `font:${n.font}`, `font-size:${n.fontSize}`, `font-family:${n.fontFamily}`, `font-weight:${n.fontWeight}`, `font-style:${n.fontStyle}`, `letter-spacing:${n.letterSpacing}`, `line-height:${n.lineHeight}`, "white-space:pre", "padding:0", "margin:0", "border:0"].join(";"), r.textContent = "M", document.body.appendChild(r);
    const a = r.getBoundingClientRect().height || r.offsetHeight;
    if (r.remove(), a > 0) return a;
  } catch {
  }
  return t;
}
function fl(e) {
  const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), n = Number.parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : 4;
}
function da(e) {
  const t = e.closest("pre");
  if (t) {
    const n = getComputedStyle(t), r = (Number.parseFloat(n.paddingLeft) || 0) + (Number.parseFloat(n.paddingRight) || 0), a = t.clientWidth - r;
    if (a > 0) return a;
  }
  return e.clientWidth;
}
function pl(e) {
  return e.classList.contains("ProseMirror-trailingBreak");
}
function ha(e) {
  return Array.from(e.querySelectorAll("br")).filter((t) => !pl(t));
}
function ml(e) {
  return Math.max(1, ha(e).length + 1);
}
function gl(e, t) {
  const n = Fr(t);
  return e ? Math.max(n, ml(e)) : n;
}
function xl(e, t) {
  const n = Array.from(e.getClientRects()).filter((l) => l.height > 0 || l.width > 0);
  if (n.length === 0) return t;
  let r = 1 / 0, a = -1 / 0;
  for (const l of n) r = Math.min(r, l.top), a = Math.max(a, l.bottom);
  const i = a - r;
  return i > 0.5 ? i : t;
}
function bl(e, t, n, r) {
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
function kl(e, t, n, r) {
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
function wl(e, t, n) {
  const r = ha(e);
  if (r.length === 0 && t > 1) return null;
  const a = [], i = document.createRange();
  try {
    for (let l = 0; l < t; l += 1) if (bl(i, e, r, l), i.collapsed) a.push(kl(e, r, l, n));
    else {
      const c = xl(i, n);
      a.push(Math.max(c, n * 0.95));
    }
  } catch {
    return null;
  }
  return a.length === t ? a : null;
}
function yl(e, t, n, r) {
  const a = da(e);
  if (a <= 0) return Array.from({ length: n }, () => r);
  const l = Qo(t, Go(e), a, fl(e)).map((c) => Math.max(1, c) * r);
  for (; l.length < n; ) l.push(r);
  return l.slice(0, n);
}
function Sl(e, t, n, r) {
  const a = da(e);
  if (a <= 0) return Array.from({ length: n }, () => r);
  const i = t.length === 0 ? [""] : String(t).split(`
`);
  for (; i.length < n; ) i.push("");
  i.length > n && (i.length = n);
  const l = getComputedStyle(e), c = l.whiteSpace === "pre" || l.whiteSpace === "nowrap" ? "pre-wrap" : l.whiteSpace || "pre-wrap", f = document.createElement("div");
  f.setAttribute("aria-hidden", "true"), f.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", `width:${a}px`, `font:${l.font}`, `font-size:${l.fontSize}`, `font-family:${l.fontFamily}`, `font-weight:${l.fontWeight}`, `font-style:${l.fontStyle}`, `letter-spacing:${l.letterSpacing}`, `line-height:${l.lineHeight}`, `white-space:${c}`, `overflow-wrap:${l.overflowWrap || "break-word"}`, `word-break:${l.wordBreak || "normal"}`, `tab-size:${l.tabSize || 4}`, "box-sizing:border-box", "padding:0", "margin:0", "border:0"].join(";");
  for (const d of i) {
    const g = document.createElement("div");
    g.style.whiteSpace = c, g.style.overflowWrap = l.overflowWrap || "break-word", g.style.wordBreak = l.wordBreak || "normal", g.style.lineHeight = l.lineHeight, g.textContent = d.length > 0 ? d : "\xA0", f.appendChild(g);
  }
  document.body.appendChild(f);
  const p = [];
  for (let d = 0; d < n; d += 1) {
    const g = f.children[d], m = (g == null ? void 0 : g.getBoundingClientRect().height) || (g == null ? void 0 : g.offsetHeight) || 0;
    p.push(m > 0 ? m : r);
  }
  return f.remove(), p;
}
function Cl(e, t, n) {
  if (n <= 0) return [];
  const r = ua(e), a = wl(e, n, r);
  return a ? a.map((i) => i > 0 ? i : r) : e.closest("pre") || e.tagName === "PRE" ? Sl(e, t, n, r) : yl(e, t, n, r);
}
function Ar(e) {
  return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
}
function fa({ text: e, className: t, contentRootRef: n }) {
  const r = Fr(e), [a, i] = h.useState(r), [l, c] = h.useState(null), [f, p] = h.useState(null);
  h.useLayoutEffect(() => {
    const g = (n == null ? void 0 : n.current) ?? null, m = Ar(g);
    if (!m) {
      i(r), c(null), p(null);
      return;
    }
    let x = 0, C = null;
    const k = () => {
      cancelAnimationFrame(x), x = requestAnimationFrame(() => {
        const I = Ar((n == null ? void 0 : n.current) ?? null);
        if (!I) {
          i(r), c(null), p(null);
          return;
        }
        const w = gl(I, e), N = ua(I), _ = Cl(I, e, w);
        i(w), p(N), c(_.length === w && _.every((A) => A > 0) ? _ : null);
      });
    };
    k(), C = new ResizeObserver(k), C.observe(m), g && g !== m && C.observe(g);
    const v = m.closest("pre");
    v && v !== m && v !== g && C.observe(v);
    const T = new MutationObserver(k);
    T.observe(m, { subtree: true, childList: true, characterData: true, attributes: true });
    const B = window.setTimeout(k, 0);
    return window.addEventListener(cr, k), window.addEventListener("resize", k), () => {
      cancelAnimationFrame(x), window.clearTimeout(B), C == null ? void 0 : C.disconnect(), T.disconnect(), window.removeEventListener(cr, k), window.removeEventListener("resize", k);
    };
  }, [e, r, n]);
  const d = f != null && f > 0 ? { lineHeight: `${f}px` } : void 0;
  return o.jsx("div", { className: ["haim-line-numbers", t].filter(Boolean).join(" "), style: d, "aria-hidden": true, children: Array.from({ length: a }, (g, m) => {
    const x = l == null ? void 0 : l[m], C = x != null && x > 0 ? { height: x, minHeight: x, maxHeight: x, lineHeight: f != null && f > 0 ? `${Math.min(f, x)}px` : void 0 } : void 0;
    return o.jsx("span", { className: "haim-line-numbers__n", style: C, children: m + 1 }, m);
  }) });
}
function vl(e) {
  const n = Ks(String(e || ""))[0];
  return n ? { meta: n.meta ?? Kr(), grid: n.grid } : null;
}
function jl(e, t) {
  return `${Ws(e)}
${qs(t)}`;
}
function Qc() {
  const e = Kr(), t = { rows: [["", "", ""], ["", "", ""], ["", "", ""]], aligns: [null, null, null] };
  return { meta: e, grid: t, text: jl(e, t) };
}
const Ml = "haim-table-edit-request";
function Ll(e, t) {
  e.dispatchEvent(new CustomEvent(Ml, { detail: t, bubbles: true }));
}
function El({ node: e, editor: t, selected: n, getPos: r }) {
  const a = String(e.attrs.kind || "raw"), i = String(e.attrs.text || ""), l = t.isEditable, c = h.useRef(null), f = h.useMemo(() => {
    if (a !== "haim-table") return null;
    const d = vl(i);
    return d ? Jo(d.grid, d.meta) : null;
  }, [a, i]), p = () => {
    if (!l || a !== "haim-table") return;
    const d = typeof r == "function" ? r() : null;
    typeof d == "number" && Ll(t.view.dom, { pos: d, text: i });
  };
  return a === "haim-table" && f ? o.jsx(me, { as: "div", className: `haim-raw-md haim-raw-md--haim-table${n ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": "haim-table", contentEditable: false, onDoubleClick: (d) => {
    d.preventDefault(), d.stopPropagation(), p();
  }, children: o.jsx("div", { className: "haim-haim-table-preview", dangerouslySetInnerHTML: { __html: f } }) }) : o.jsxs(me, { as: "div", className: `haim-raw-md${n ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": a, contentEditable: false, children: [o.jsx(fa, { text: i, className: "haim-raw-md__line-numbers", contentRootRef: c }), o.jsx("pre", { ref: c, className: "haim-raw-md__pre", children: i })] });
}
const Tl = Le.create({ name: "rawMarkdownBlock", group: "block", atom: true, selectable: true, code: true, addAttributes() {
  return { text: { default: "" }, kind: { default: "raw" } };
}, parseHTML() {
  return [{ tag: "pre[data-haim-raw-md]", getAttrs: (e) => e instanceof HTMLElement ? { text: e.textContent || "", kind: e.getAttribute("data-kind") || "raw" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["pre", ge(t, { "data-haim-raw-md": "1", "data-kind": String(e.attrs.kind || "raw"), class: "haim-raw-md" }), String(e.attrs.text || "")];
}, addNodeView() {
  return Ue(El);
}, renderMarkdown: (e) => {
  var _a;
  const t = String(((_a = e.attrs) == null ? void 0 : _a.text) || "");
  return t ? t.endsWith(`
`) ? t : `${t}
` : "";
} }), Nl = Le.create({ name: "deepHeading", group: "block", content: "inline*", defining: true, addAttributes() {
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
} }), P = { format: "\uC11C\uC2DD", heading: "\uC81C\uBAA9", block: "\uBE14\uB85D", insert: "\uC0BD\uC785", tool: "\uB3C4\uAD6C" };
function Il(e, t) {
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
  return { id: `heading-${e}`, title: `\uC81C\uBAA9 ${e}`, titleEn: `Heading ${e}`, keywords: [`h${e}`, `heading ${e}`, `heading${e}`, `\uC81C\uBAA9${e}`, `\uC81C\uBAA9 ${e}`, "#".repeat(e)], group: "heading", groupLabel: P.heading, Icon: t, run: ({ editor: n }) => {
    Il(n, e);
  } };
}
const pa = [{ id: "bold", title: "\uAD75\uAC8C", titleEn: "Bold", keywords: ["bold", "\uAD75\uAC8C", "\uBCFC\uB4DC", "\uAC15\uC870", "strong"], group: "format", groupLabel: P.format, Icon: oo, run: ({ editor: e }) => {
  e.chain().focus().toggleBold().run();
} }, { id: "italic", title: "\uAE30\uC6B8\uC784", titleEn: "Italic", keywords: ["italic", "\uAE30\uC6B8\uC784", "\uC774\uD0E4\uB9AD", "em"], group: "format", groupLabel: P.format, Icon: io, run: ({ editor: e }) => {
  e.chain().focus().toggleItalic().run();
} }, { id: "underline", title: "\uBC11\uC904", titleEn: "Underline", keywords: ["underline", "\uBC11\uC904", "\uC5B8\uB354\uB77C\uC778"], group: "format", groupLabel: P.format, Icon: lo, run: ({ editor: e }) => {
  e.chain().focus().toggleUnderline().run();
} }, { id: "strike", title: "\uCDE8\uC18C\uC120", titleEn: "Strikethrough", keywords: ["strike", "strikethrough", "\uCDE8\uC18C\uC120", "\uC0AD\uC81C\uC120"], group: "format", groupLabel: P.format, Icon: co, run: ({ editor: e }) => {
  e.chain().focus().toggleStrike().run();
} }, { id: "code", title: "\uC778\uB77C\uC778 \uCF54\uB4DC", titleEn: "Inline code", keywords: ["code", "inline code", "\uC778\uB77C\uC778 \uCF54\uB4DC", "\uCF54\uB4DC"], group: "format", groupLabel: P.format, Icon: uo, run: ({ editor: e }) => {
  e.chain().focus().toggleCode().run();
} }, { id: "subscript", title: "\uC544\uB798 \uCCA8\uC790", titleEn: "Subscript", keywords: ["sub", "subscript", "\uC544\uB798\uCCA8\uC790", "\uC544\uB798 \uCCA8\uC790"], group: "format", groupLabel: P.format, Icon: ho, run: ({ editor: e }) => {
  e.chain().focus().toggleSubscript().run();
} }, { id: "superscript", title: "\uC704 \uCCA8\uC790", titleEn: "Superscript", keywords: ["sup", "superscript", "\uC704\uCCA8\uC790", "\uC704 \uCCA8\uC790"], group: "format", groupLabel: P.format, Icon: fo, run: ({ editor: e }) => {
  e.chain().focus().toggleSuperscript().run();
} }, fe(1, Eo), fe(2, To), fe(3, No), fe(4, Io), fe(5, Ao), fe(6, Po), fe(7, st), fe(8, st), fe(9, st), fe(10, st), { id: "paragraph", title: "\uBCF8\uBB38", titleEn: "Paragraph", keywords: ["paragraph", "\uBCF8\uBB38", "\uD14D\uC2A4\uD2B8", "text", "p"], group: "block", groupLabel: P.block, Icon: bn, run: ({ editor: e }) => {
  e.chain().focus().setParagraph().run();
} }, { id: "bullet-list", title: "\uAE00\uBA38\uB9AC \uAE30\uD638 \uBAA9\uB85D", titleEn: "Bullet list", keywords: ["ul", "unordered", "bullet", "\uBAA9\uB85D", "\uB9AC\uC2A4\uD2B8", "\uAE00\uBA38\uB9AC"], group: "block", groupLabel: P.block, Icon: po, run: ({ editor: e }) => {
  e.chain().focus().toggleBulletList().run();
} }, { id: "ordered-list", title: "\uBC88\uD638 \uBAA9\uB85D", titleEn: "Ordered list", keywords: ["ol", "ordered", "numbered", "\uBC88\uD638", "\uBC88\uD638 \uBAA9\uB85D"], group: "block", groupLabel: P.block, Icon: mo, run: ({ editor: e }) => {
  e.chain().focus().toggleOrderedList().run();
} }, { id: "task-list", title: "\uD560 \uC77C \uBAA9\uB85D", titleEn: "Task list", keywords: ["task", "todo", "checkbox", "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8", "\uD560 \uC77C", "\uCCB4\uD06C\uBC15\uC2A4", "check"], group: "block", groupLabel: P.block, Icon: hr, run: ({ editor: e }) => {
  e.chain().focus().toggleTaskList().run();
} }, { id: "status-task", title: "\uC0C1\uD0DC \uD560 \uC77C", titleEn: "Status task", keywords: ["status", "doing", "in progress", "\uC9C4\uD589", "\uC0C1\uD0DC", "\uC0C1\uD0DC \uCCB4\uD06C\uBC15\uC2A4", "~"], group: "block", groupLabel: P.block, Icon: hr, run: ({ editor: e }) => {
  const t = () => {
    e.chain().focus().command(({ tr: n, state: r, dispatch: a }) => {
      if (!a) return false;
      const i = r.selection.$from;
      for (let l = i.depth; l >= 0; l -= 1) if (i.node(l).type.name === "taskItem") return n.setNodeMarkup(i.before(l), void 0, { ...i.node(l).attrs, status: "doing", checked: false, kind: "status" }), a(n), true;
      return false;
    }).run();
  };
  e.isActive("taskList") || e.chain().focus().toggleTaskList().run(), t();
} }, { id: "blockquote", title: "\uC778\uC6A9", titleEn: "Quote", keywords: ["quote", "blockquote", "\uC778\uC6A9"], group: "block", groupLabel: P.block, Icon: go, run: ({ editor: e }) => {
  e.chain().focus().toggleBlockquote().run();
} }, { id: "code-block", title: "\uCF54\uB4DC \uBE14\uB85D", titleEn: "Code block", keywords: ["code block", "fence", "\uCF54\uB4DC \uBE14\uB85D", "\uD39C\uC2A4"], group: "block", groupLabel: P.block, Icon: xo, run: ({ editor: e }) => {
  e.chain().focus().toggleCodeBlock().run();
} }, { id: "link", title: "\uB9C1\uD06C", titleEn: "Link", keywords: ["link", "url", "\uB9C1\uD06C", "\uD558\uC774\uD37C\uB9C1\uD06C"], group: "insert", groupLabel: P.insert, Icon: fr, run: ({ editor: e, app: t }) => {
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
} }, { id: "docuhaim-link", title: "\uB178\uD2B8 \uB9C1\uD06C", titleEn: "Note link", keywords: ["docuhaim", "note link", "\uB178\uD2B8 \uB9C1\uD06C", "vault link", "\uD30C\uC77C \uB9C1\uD06C"], group: "insert", groupLabel: P.insert, Icon: fr, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onDocuhaimNoteLink) == null ? void 0 : _a.call(e);
} }, { id: "table", title: "\uD45C", titleEn: "Table", keywords: ["table", "\uD45C", "\uD14C\uC774\uBE14"], group: "insert", groupLabel: P.insert, Icon: bo, run: ({ editor: e }) => {
  e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
} }, { id: "mermaid", title: "Mermaid", titleEn: "Mermaid diagram", keywords: ["mermaid", "diagram", "\uB2E4\uC774\uC5B4\uADF8\uB7A8", "flowchart", "\uADF8\uB798\uD504"], group: "insert", groupLabel: P.insert, Icon: ko, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertMermaid) {
    t.onInsertMermaid();
    return;
  }
  e.chain().focus().insertContent("```mermaid\ngraph TD\n  A-->B\n```\n", { contentType: "markdown" }).run();
} }, { id: "katex", title: "\uC218\uC2DD", titleEn: "Math / KaTeX", keywords: ["math", "katex", "latex", "\uC218\uC2DD", "\uACF5\uC2DD", "formula"], group: "insert", groupLabel: P.insert, Icon: wo, run: ({ editor: e, app: t }) => {
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
} }, { id: "page-break", title: "\uD398\uC774\uC9C0 \uB098\uB214", titleEn: "Page break", keywords: ["pgbr", "page break", "\uD398\uC774\uC9C0 \uB098\uB214", "\uC778\uC1C4"], group: "insert", groupLabel: P.insert, Icon: yo, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertPageBreak) {
    t.onInsertPageBreak();
    return;
  }
  e.chain().focus().setPageBreak().run();
} }, { id: "image-link", title: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C", titleEn: "Image link", keywords: ["image", "\uC774\uBBF8\uC9C0", "wiki image", "\uC774\uBBF8\uC9C0 \uB9C1\uD06C", "picture", "pic"], group: "insert", groupLabel: P.insert, Icon: Mt, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onImageLink) == null ? void 0 : _a.call(e);
} }, { id: "image-upload", title: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC", titleEn: "Upload image", keywords: ["image", "upload", "\uC774\uBBF8\uC9C0", "\uC5C5\uB85C\uB4DC", "\uC0AC\uC9C4", "picture", "pic"], group: "insert", groupLabel: P.insert, Icon: Mt, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onImageUpload) == null ? void 0 : _a.call(e);
} }, { id: "image-clip", title: "\uC774\uBBF8\uC9C0 \uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC", titleEn: "Crop & upload image", keywords: ["image", "crop", "clip", "\uC790\uB974\uAE30", "\uD06C\uB86D", "picture", "pic"], group: "insert", groupLabel: P.insert, Icon: Mt, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onImageClip) == null ? void 0 : _a.call(e);
} }, { id: "whiteboard", title: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30", titleEn: "Create whiteboard", keywords: ["whiteboard", "\uD654\uC774\uD2B8\uBCF4\uB4DC", "\uCE94\uBC84\uC2A4", "canvas", "picture"], group: "insert", groupLabel: P.insert, Icon: Mt, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onCreateWhiteboard) == null ? void 0 : _a.call(e);
} }, { id: "qrcode", title: "QRCode \uB9CC\uB4E4\uAE30", titleEn: "Create QR code", keywords: ["qr", "qrcode", "\uD050\uC54C", "\uD050\uC54C\uCF54\uB4DC"], group: "insert", groupLabel: P.insert, Icon: So, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onCreateQrCode) == null ? void 0 : _a.call(e);
} }, { id: "undo", title: "\uC2E4\uD589 \uCDE8\uC18C", titleEn: "Undo", keywords: ["undo", "revoke", "\uC2E4\uD589\uCDE8\uC18C", "\uB418\uB3CC\uB9AC\uAE30"], group: "tool", groupLabel: P.tool, Icon: qr, run: ({ editor: e }) => {
  e.chain().focus().undo().run();
} }, { id: "redo", title: "\uB2E4\uC2DC \uC2E4\uD589", titleEn: "Redo", keywords: ["redo", "next", "\uB2E4\uC2DC\uC2E4\uD589"], group: "tool", groupLabel: P.tool, Icon: Ur, run: ({ editor: e }) => {
  e.chain().focus().redo().run();
} }, { id: "heading-remap", title: "\uC81C\uBAA9 \uC218\uC900 \uC7AC\uB9E4\uD551", titleEn: "Remap heading levels", keywords: ["heading remap", "\uC81C\uBAA9 \uBCC0\uACBD", "\uD5E4\uB529", "\uC81C\uBAA9\uB9AC\uB9F5", "\uD5E4\uB529\uB9AC\uB9E4\uD551"], group: "tool", groupLabel: P.tool, Icon: st, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onHeadingRemap) == null ? void 0 : _a.call(e);
} }, { id: "checklist-progress", title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", titleEn: "Checklist progress", keywords: ["checklist", "progress", "\uC9C4\uD589\uB960", "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8"], group: "tool", groupLabel: P.tool, Icon: Co, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onChecklistProgress) == null ? void 0 : _a.call(e);
} }, { id: "llm-assist", title: "AI \uB3C4\uC6B0\uBBF8", titleEn: "AI assistant", keywords: ["ai", "llm", "gemini", "openai", "\uC778\uACF5\uC9C0\uB2A5", "\uB3C4\uC6B0\uBBF8"], group: "tool", groupLabel: P.tool, Icon: vo, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onLlmAssist) == null ? void 0 : _a.call(e);
} }, { id: "export-pdf", title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", titleEn: "Export PDF", keywords: ["export", "pdf", "\uC778\uC1C4", "print", "\uB0B4\uBCF4\uB0B4\uAE30"], group: "tool", groupLabel: P.tool, Icon: jo, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onExportPdf) == null ? void 0 : _a.call(e);
} }, { id: "find-replace", title: "\uCC3E\uAE30/\uBC14\uAFB8\uAE30", titleEn: "Find and replace", keywords: ["find", "replace", "search", "\uCC3E\uAE30", "\uBC14\uAFB8\uAE30", "\uAC80\uC0C9"], group: "tool", groupLabel: P.tool, Icon: Vr, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onFindReplaceToggle) == null ? void 0 : _a.call(e);
} }, { id: "invisible-chars", title: "\uBE44\uAC00\uC2DC \uBB38\uC790", titleEn: "Invisible characters", keywords: ["invisible", "whitespace", "\uBE44\uAC00\uC2DC", "\uACF5\uBC31", "pilcrow", "\xB6"], group: "tool", groupLabel: P.tool, Icon: Mo, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onInvisibleCharsToggle) == null ? void 0 : _a.call(e);
} }, { id: "toc", title: "\uBAA9\uCC28", titleEn: "Table of contents", keywords: ["toc", "catalog", "\uBAA9\uCC28", "outline"], group: "tool", groupLabel: P.tool, Icon: Lo, run: ({ app: e }) => {
  var _a;
  (_a = e == null ? void 0 : e.onTocToggle) == null ? void 0 : _a.call(e);
} }];
function Pr(e) {
  return e.normalize("NFKC").toLowerCase();
}
function Al(e, t = pa) {
  const n = Pr(e).trim();
  if (!n) return [...t];
  const r = n.split(/\s+/).filter(Boolean);
  return t.filter((a) => {
    const i = Pr([a.id, a.title, a.titleEn, ...a.keywords].join(`
`));
    return r.every((l) => i.includes(l));
  });
}
const Pl = h.forwardRef(function({ items: t, command: n }, r) {
  const [a, i] = h.useState(0), l = h.useRef(null), c = h.useRef([]);
  if (h.useEffect(() => {
    i(0);
  }, [t]), h.useLayoutEffect(() => {
    var _a;
    (_a = c.current[a]) == null ? void 0 : _a.scrollIntoView({ block: "nearest" });
  }, [a, t]), h.useImperativeHandle(r, () => ({ onKeyDown: ({ event: p }) => {
    if (t.length === 0 || p.shiftKey || p.altKey || p.metaKey || p.ctrlKey) return false;
    if (p.key === "ArrowUp") return i((d) => (d + t.length - 1) % t.length), true;
    if (p.key === "ArrowDown") return i((d) => (d + 1) % t.length), true;
    if (p.key === "Enter") {
      const d = t[a];
      return d && n(d), true;
    }
    return false;
  } })), t.length === 0) return o.jsx("div", { className: "w-[min(92vw,300px)] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-muted", role: "listbox", "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839", children: "\uACB0\uACFC \uC5C6\uC74C" });
  let f = "";
  return o.jsx("div", { ref: l, className: "flex max-h-[min(60vh,360px)] w-[min(92vw,300px)] flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface", role: "listbox", "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839", children: t.map((p, d) => {
    const g = p.groupLabel !== f;
    f = p.groupLabel;
    const m = p.Icon, x = d === a;
    return o.jsxs("div", { children: [g ? o.jsx("div", { className: "px-2.5 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-odp-muted", children: p.groupLabel }) : null, o.jsxs("button", { type: "button", ref: (C) => {
      c.current[d] = C;
    }, role: "option", "aria-selected": x, className: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm ${x ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-800 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-bgSoft"}`, onMouseEnter: () => i(d), onClick: () => {
      n(p);
    }, children: [o.jsx(m, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), o.jsx("span", { className: "min-w-0 flex-1 truncate font-medium", children: p.title }), o.jsx("span", { className: "shrink-0 truncate text-xs text-gray-400 dark:text-odp-muted", children: p.titleEn })] })] }, p.id);
  }) });
}), $r = new qe("haimSlashCommands");
function $l(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n).type.name;
    if (r === "codeBlock" || r === "rawMarkdownBlock") return true;
  }
  return false;
}
function Hr(e, t) {
  As.flushSync(() => {
    e.root.render(h.createElement(Pl, { ref: (n) => {
      e.listRef.current = n;
    }, items: t.items, command: (n) => {
      t.command(n);
    } }));
  });
}
const Hl = pt.create({ name: "haimSlashCommands", addStorage() {
  return { getAppActions: () => null };
}, addProseMirrorPlugins() {
  return [Za({ pluginKey: $r, editor: this.editor, char: "/", allowSpaces: true, startOfLine: false, allowedPrefixes: [" "], decorationClass: "haim-slash-decoration", placement: "bottom-start", offset: { mainAxis: 6, crossAxis: 0 }, dismissOnOutsideClick: true, floatingUi: { strategy: "fixed" }, initialItems: [...pa], allow: ({ state: e, editor: t }) => t.isEditable && !$l(e), items: ({ query: e }) => Al(e), command: ({ editor: e, range: t, props: n }) => {
    var _a, _b;
    e.chain().focus().deleteRange(t).run();
    const r = ((_b = (_a = e.storage.haimSlashCommands) == null ? void 0 : _a.getAppActions) == null ? void 0 : _b.call(_a)) ?? null;
    n.run({ editor: e, app: r });
  }, render: () => {
    let e = null;
    return { onStart: (t) => {
      const n = document.createElement("div");
      n.className = "haim-slash-menu-root", n.style.zIndex = "100010";
      const r = { current: null }, a = Is.createRoot(n);
      e = { el: n, root: a, listRef: r, unmountFloating: null }, Hr(e, t), e.unmountFloating = t.mount(n);
    }, onUpdate: (t) => {
      e && Hr(e, t);
    }, onKeyDown: (t) => {
      var _a;
      return t.event.key === "Escape" ? (es(t.view, $r), true) : ((_a = e == null ? void 0 : e.listRef.current) == null ? void 0 : _a.onKeyDown(t)) ?? false;
    }, onExit: () => {
      var _a;
      const t = e;
      e = null, (_a = t == null ? void 0 : t.unmountFloating) == null ? void 0 : _a.call(t), (t == null ? void 0 : t.root) && queueMicrotask(() => {
        t.root.unmount();
      });
    } };
  } })];
} });
function Dl(e, t) {
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
function gn(e) {
  for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
  return -1;
}
function Rl(e, t, n, r) {
  const a = gn(t);
  if (a < 0) return null;
  const i = n === "down" ? 1 : -1, l = n === "down" ? t.after(a) : t.before(a);
  let c;
  try {
    c = K.near(t.doc.resolve(Math.max(0, Math.min(t.doc.content.size, l))), i).head;
  } catch {
    return null;
  }
  const f = t.doc.resolve(c);
  if (gn(f) === a) {
    const p = f.before(gn(f)), d = t.before(a);
    if (p === d) return null;
  }
  try {
    const p = e.coordsAtPos(c), d = (p.top + p.bottom) / 2, g = e.posAtCoords({ left: r, top: d });
    if (g && g.pos !== t.pos) return g.pos;
  } catch {
  }
  return c !== t.pos ? c : null;
}
function Dr(e, t) {
  const { state: n } = e, { selection: r, doc: a } = n, i = t === "down" ? 1 : -1;
  let l = r.anchor, c = r.head;
  if (r instanceof Or) {
    const x = K.near(a.resolve(t === "down" ? r.to : r.from), i);
    l = x.anchor, c = x.head;
  }
  let f;
  try {
    f = e.coordsAtPos(c);
  } catch {
    f = { left: 0, top: 0, bottom: 22 };
  }
  const p = Dl(e, c), d = f.left;
  let g = c;
  const m = [0.2, 0.55, 1, 1.5, 2, 2.75, 3.5];
  for (const x of m) {
    const C = t === "down" ? f.bottom + Math.max(2, p * x) : f.top - Math.max(2, p * x);
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
    const x = Rl(e, a.resolve(c), t, d);
    x != null && (g = x);
  }
  if (g === c) {
    const x = Math.max(1, Math.min(a.content.size, c + i));
    if (x !== c) try {
      g = K.near(a.resolve(x), i).head;
    } catch {
      return false;
    }
  }
  if (g = Math.max(0, Math.min(a.content.size, g)), g === c) return false;
  try {
    const x = n.tr.setSelection(K.create(a, l, g));
    return x.scrollIntoView(), e.dispatch(x), true;
  } catch {
    try {
      const x = K.near(a.resolve(g), i), C = n.tr.setSelection(K.create(a, l, x.head));
      return C.scrollIntoView(), e.dispatch(C), true;
    } catch {
      return false;
    }
  }
}
const Bl = pt.create({ name: "haimShiftArrowSelect", priority: 1e3, addKeyboardShortcuts() {
  return { "Shift-ArrowDown": ({ editor: e }) => Dr(e.view, "down"), "Shift-ArrowUp": ({ editor: e }) => Dr(e.view, "up") };
} });
function _l(e) {
  for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
  return -1;
}
function zl(e, t) {
  const { state: n } = e, r = n.schema.nodes.paragraph;
  if (!r) return false;
  const a = n.selection.$head, i = _l(a);
  if (i < 0) return false;
  const l = a.before(i), c = r.createAndFill();
  if (!c) return false;
  let f = n.tr.insert(l, c);
  try {
    f = f.setSelection(K.near(f.doc.resolve(l + 1)));
  } catch {
    return false;
  }
  return f.scrollIntoView(), (0, e.dispatch)(f), true;
}
const Ol = pt.create({ name: "haimInsertLineAbove", priority: 1e3, addKeyboardShortcuts() {
  return { "Mod-Shift-Enter": ({ editor: e }) => zl(e.view) };
} }), Fl = Le.create({ name: "mathBlock", group: "block", atom: true, code: true, addAttributes() {
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
function Rr({ label: e, onClick: t, children: n }) {
  return o.jsxs(Pt, { children: [o.jsx($t, { asChild: true, children: o.jsx("button", { type: "button", className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft", "aria-label": e, onClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, children: n }) }), o.jsx(Ht, { children: o.jsxs(Dt, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [e, o.jsx(Rt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function ma(e, t) {
  const [n, r] = h.useState(null), [a, i] = h.useState(false);
  return h.useEffect(() => {
    const l = String(e || "").trim();
    if (!l) {
      r(null), i(false);
      return;
    }
    try {
      const c = Zo.renderToString(l, { throwOnError: false, displayMode: t, output: "html" });
      r(c), i(false);
    } catch {
      r(null), i(true);
    }
  }, [e, t]), { html: n, error: a };
}
function Kl({ node: e, updateAttributes: t, editor: n, selected: r }) {
  const a = String(e.attrs.latex || ""), i = n.isEditable, [l, c] = h.useState(false), [f, p] = h.useState(a), d = h.useRef(null), { html: g, error: m } = ma(a, true);
  h.useEffect(() => {
    p(a);
  }, [a]), h.useEffect(() => {
    var _a;
    l && ((_a = d.current) == null ? void 0 : _a.focus());
  }, [l]);
  const x = () => {
    const k = f.trim();
    t({ latex: k || a }), c(false);
  }, C = () => {
    p(a), c(false);
  };
  return l && i ? o.jsxs(me, { as: "div", className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`, "data-type": "block-math", contentEditable: false, children: [o.jsx("textarea", { ref: d, className: "haim-math-block__textarea", value: f, rows: Math.min(8, Math.max(2, f.split(`
`).length + 1)), onChange: (k) => p(k.target.value), onBlur: x, onKeyDown: (k) => {
    k.key === "Escape" && (k.preventDefault(), C()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), x()), k.stopPropagation();
  }, spellCheck: false }), o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: o.jsx("div", { className: "haim-math-block__toolbar", children: o.jsx(Rr, { label: "\uBBF8\uB9AC\uBCF4\uAE30", onClick: x, children: o.jsx(Xr, { size: 14, "aria-hidden": true }) }) }) })] }) : o.jsxs(me, { as: "div", className: `haim-math-block${r ? " is-selected" : ""}${m ? " haim-math-block--error" : ""}`, "data-type": "block-math", "data-latex": a, contentEditable: false, onDoubleClick: () => {
    i && c(true);
  }, children: [o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: i ? o.jsx("div", { className: "haim-math-block__toolbar", children: o.jsx(Rr, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => c(true), children: o.jsx(Yr, { size: 14, "aria-hidden": true }) }) }) : null }), g ? o.jsx("div", { className: "haim-math-block__render", dangerouslySetInnerHTML: { __html: g } }) : o.jsx("div", { className: "haim-math-block__fallback", children: a || "\u2026" })] });
}
function Wl({ node: e, updateAttributes: t, editor: n, selected: r }) {
  const a = String(e.attrs.latex || ""), i = n.isEditable, [l, c] = h.useState(false), [f, p] = h.useState(a), d = h.useRef(null), { html: g, error: m } = ma(a, false);
  h.useEffect(() => {
    p(a);
  }, [a]), h.useEffect(() => {
    var _a;
    l && ((_a = d.current) == null ? void 0 : _a.focus());
  }, [l]);
  const x = () => {
    const k = f.trim();
    t({ latex: k || a }), c(false);
  }, C = () => {
    p(a), c(false);
  };
  return l && i ? o.jsx(me, { as: "span", className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`, "data-type": "inline-math", contentEditable: false, children: o.jsx("input", { ref: d, type: "text", className: "haim-math-inline__input", value: f, onChange: (k) => p(k.target.value), onBlur: x, onKeyDown: (k) => {
    k.key === "Enter" && (k.preventDefault(), x()), k.key === "Escape" && (k.preventDefault(), C()), k.stopPropagation();
  }, spellCheck: false }) }) : o.jsx(me, { as: "span", className: `haim-math-inline${r ? " is-selected" : ""}${m ? " haim-math-inline--error" : ""}`, "data-type": "inline-math", "data-latex": a, contentEditable: false, onDoubleClick: (k) => {
    k.preventDefault(), k.stopPropagation(), i && c(true);
  }, children: g ? o.jsx("span", { dangerouslySetInnerHTML: { __html: g } }) : o.jsx("span", { className: "haim-math-inline__fallback", children: a || "?" }) });
}
const ql = ts.extend({ addNodeView() {
  return Ue(Kl);
} }).configure({ katexOptions: { throwOnError: false, displayMode: true } }), Ul = ns.extend({ addNodeView() {
  return Ue(Wl);
} }).configure({ katexOptions: { throwOnError: false, displayMode: false } }), _t = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"', "`": "`" }, Vl = /* @__PURE__ */ new Set(["js", "javascript", "jsx", "mjs", "cjs", "ts", "typescript", "tsx"]), ga = new Set(Object.values(_t)), Xl = new qe("haimCodeBlockBracketPairs");
function We(e, t) {
  return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
}
function Mn(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
}
function Ln(e) {
  return Vl.has(String(e || "").trim().toLowerCase());
}
function xa(e) {
  const { $from: t, $to: n } = e.selection;
  return t.parent.type.name !== "codeBlock" || n.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === n.before(n.depth);
}
function Yl(e) {
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
  const { key: t, code: n } = e;
  return t === "`" || n === "Backquote" && !e.shiftKey ? "`" : t in _t || ga.has(t) ? t : n === "Quote" ? e.shiftKey ? '"' : "'" : null;
}
function Br(e) {
  return e ? /[\w$]/.test(e) : false;
}
function Ql(e, t) {
  const { from: n } = e.selection, r = We(e, n - 1), a = We(e, n);
  return !(Br(r) || Br(a) || a === t);
}
function Gl(e, t) {
  if (!xa(e) || t === "`" && !Ln(Mn(e))) return null;
  const { selection: n } = e, { from: r, to: a, empty: i } = n, l = _t[t];
  if (l !== void 0) {
    if (!i) {
      const f = e.doc.textBetween(r, a), p = e.tr.insertText(`${t}${f}${l}`, r, a);
      return p.setSelection(K.create(p.doc, r + t.length, r + t.length + f.length)), p;
    }
    if ((t === "'" || t === '"' || t === "`") && !Ql(e, t)) return We(e, r) === t ? e.tr.setSelection(K.create(e.doc, r + 1)) : null;
    const c = e.tr.insertText(`${t}${l}`, r, a);
    return c.setSelection(K.create(c.doc, r + t.length)), c;
  }
  return ga.has(t) && i && We(e, r) === t ? t === "`" && !Ln(Mn(e)) ? null : e.tr.setSelection(K.create(e.doc, r + 1)) : null;
}
function Jl(e) {
  if (!xa(e)) return null;
  const { selection: t } = e;
  if (!t.empty) return null;
  const { from: n } = t, r = We(e, n - 1), a = We(e, n), i = _t[r];
  return !i || a !== i || r === "`" && !Ln(Mn(e)) ? null : e.tr.delete(n - 1, n + 1);
}
function Zl(e, t) {
  if (t.defaultPrevented) return false;
  if (t.key === "Backspace") {
    if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
    const a = Jl(e.state);
    return a ? (e.dispatch(a), true) : false;
  }
  const n = Yl(t);
  if (!n) return false;
  const r = Gl(e.state, n);
  return r ? (e.dispatch(r), true) : false;
}
function ec() {
  return new ft({ key: Xl, props: { handleKeyDown(e, t) {
    return Zl(e, t);
  } } });
}
const tc = new qe("haimCodeBlockIndent");
function nc(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
}
function $n(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function ba(e, t, n) {
  const r = e.doc.resolve(t);
  if (r.parent.type.name !== "codeBlock") return [];
  const a = r.start(), i = r.end(), c = e.doc.textBetween(a, i, `
`, `
`).split(`
`), f = [];
  let p = a;
  for (let d = 0; d < c.length; d += 1) {
    const g = c[d] ?? "", m = d < c.length - 1 ? p + g.length + 1 : i;
    t < m && n > p && f.push(p), p = m;
  }
  return f;
}
function _r(e, t) {
  var _a;
  const n = ((_a = e.match(/^ */)) == null ? void 0 : _a[0]) ?? "";
  return Math.min(n.length, t);
}
function rc(e, t) {
  if (!$n(e)) return null;
  const n = Math.max(1, Math.round(t)), r = " ".repeat(n), { selection: a } = e, { from: i, to: l, empty: c } = a;
  if (c) {
    const m = e.tr.insertText(r, i);
    return m.setSelection(K.create(m.doc, i + r.length)), m;
  }
  const f = ba(e, i, l);
  if (f.length === 0) return null;
  const p = e.tr;
  for (let m = f.length - 1; m >= 0; m -= 1) p.insertText(r, f[m]);
  const d = f[0], g = p.mapping.map(l);
  return p.setSelection(K.create(p.doc, d, g)), p;
}
function ac(e, t) {
  var _a;
  if (!$n(e)) return null;
  const n = Math.max(1, Math.round(t)), { selection: r, doc: a } = e, { $from: i, empty: l } = r;
  if (l) {
    const w = i.start(), N = i.end(), A = a.textBetween(w, N, `
`, `
`).split(`
`), F = i.pos - w;
    let U = 0, ie = 0;
    for (let $ = 0; $ < A.length; $ += 1) {
      const z = A[$] ?? "";
      if (ie + z.length >= F) {
        U = $;
        break;
      }
      ie += z.length + 1, $ === A.length - 1 && (U = $);
    }
    const Ae = A[U] ?? "", ee = _r(Ae, n);
    if (ee === 0) return e.tr;
    let L = w;
    for (let $ = 0; $ < U; $ += 1) L += (((_a = A[$]) == null ? void 0 : _a.length) ?? 0) + 1;
    const E = e.tr.delete(L, L + ee);
    return i.pos - L <= ee ? E.setSelection(K.create(E.doc, L)) : E.setSelection(K.create(E.doc, i.pos - ee)), E;
  }
  const { from: c, to: f } = r, p = ba(e, c, f);
  if (p.length === 0) return null;
  const d = i.start(), g = i.end(), x = a.textBetween(d, g, `
`, `
`).split(`
`), C = /* @__PURE__ */ new Map();
  {
    let w = d;
    for (let N = 0; N < x.length; N += 1) {
      const _ = x[N] ?? "";
      C.set(w, _), w += _.length + (N < x.length - 1 ? 1 : 0);
    }
  }
  const k = e.tr;
  let v = 0, T = 0;
  for (let w = p.length - 1; w >= 0; w -= 1) {
    const N = p[w], _ = C.get(N) ?? "", A = _r(_, n);
    A !== 0 && (k.delete(N, N + A), T += A, N < c && (v += A));
  }
  if (T === 0) return k;
  const B = Math.max(p[0], c - v), I = k.mapping.map(f);
  return k.setSelection(K.create(k.doc, B, Math.max(B, I))), k;
}
function sc(e, t) {
  if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !$n(e.state)) return false;
  const n = nc(e.state), r = ei(n, ti()), a = t.shiftKey ? ac(e.state, r) : rc(e.state, r);
  return a ? (e.dispatch(a), true) : false;
}
function oc() {
  return new ft({ key: tc, props: { handleKeyDown(e, t) {
    return sc(e, t);
  } } });
}
function zr(e) {
  return String(e || "").trim().toLowerCase() === "mermaid";
}
function ic(e) {
  var _a;
  return e && (((_a = e.closest(".haim-editor")) == null ? void 0 : _a.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
}
const ka = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", lc = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", cc = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
function En({ label: e, onClick: t, active: n = false, expanded: r, children: a }) {
  return o.jsxs(Pt, { children: [o.jsx($t, { asChild: true, children: o.jsx("button", { type: "button", className: `haim-code-block__action${n ? " is-copy-success" : ""}`, "aria-label": e, ...r !== void 0 ? { "aria-expanded": r } : {}, onClick: t, children: a }) }), o.jsx(Ht, { children: o.jsxs(Dt, { side: "bottom", sideOffset: 6, className: ka, children: [e, o.jsx(Rt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function uc({ language: e, onChange: t }) {
  const n = h.useId(), r = h.useRef(null), [a, i] = h.useState(false), [l, c] = h.useState(""), [f, p] = h.useState(0), d = ni(e), g = ri(e), m = ai(e), x = si(d, l), C = l.trim(), k = C.toLowerCase() === "plain" ? oi : C, T = !!C && !x.some((w) => w.value.toLowerCase() === k.toLowerCase() || w.label.toLowerCase() === C.toLowerCase()) ? [{ value: k, label: C, custom: true }, ...x.map((w) => ({ ...w, custom: false }))] : x.map((w) => ({ ...w, custom: false }));
  h.useEffect(() => {
    if (!a) return;
    c(""), p(0);
    const w = window.setTimeout(() => {
      var _a;
      return (_a = r.current) == null ? void 0 : _a.focus();
    }, 0);
    return () => window.clearTimeout(w);
  }, [a]), h.useEffect(() => {
    p(0);
  }, [l]);
  const B = h.useCallback((w) => {
    t(ii(w)), i(false);
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
      const N = T[f] ?? T[0];
      N ? B(N.value) : C && B(k);
      return;
    }
    w.key === "Escape" && (w.preventDefault(), i(false));
  };
  return o.jsxs(Fo, { open: a, onOpenChange: i, children: [o.jsxs(Pt, { children: [o.jsx($t, { asChild: true, children: o.jsx(Ko, { asChild: true, children: o.jsxs("button", { type: "button", className: "haim-code-block__lang-trigger", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", "aria-haspopup": "listbox", "aria-expanded": a, onPointerDown: (w) => w.stopPropagation(), children: [o.jsx("span", { className: "haim-code-block__lang-label", children: m }), o.jsx("span", { className: "haim-code-block__lang-chevron", children: o.jsx(Gr, { size: 12, "aria-hidden": true }) })] }) }) }), o.jsx(Ht, { children: o.jsxs(Dt, { side: "bottom", sideOffset: 6, className: ka, children: ["\uC5B8\uC5B4 \uAC80\uC0C9", o.jsx(Rt, { className: "fill-white dark:fill-odp-surface" })] }) })] }), o.jsx(Wo, { children: o.jsxs(qo, { className: lc, side: "bottom", align: "start", sideOffset: 4, onOpenAutoFocus: (w) => w.preventDefault(), onCloseAutoFocus: (w) => w.preventDefault(), onPointerDown: (w) => w.stopPropagation(), children: [o.jsxs("div", { className: "flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong", children: [o.jsx(Vr, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }), o.jsx("input", { ref: r, type: "text", value: l, onChange: (w) => c(w.target.value), onKeyDown: I, placeholder: "\uC5B8\uC5B4 \uAC80\uC0C9\u2026", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4 \uAC80\uC0C9", "aria-controls": n, "aria-autocomplete": "list", autoComplete: "off", spellCheck: false, className: "min-w-0 flex-1 bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-odp-fg" })] }), o.jsx("ul", { id: n, role: "listbox", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", className: "max-h-56 overflow-y-auto p-1", children: T.length === 0 ? o.jsx("li", { className: "cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uC77C\uCE58\uD558\uB294 \uC5B8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : T.map((w, N) => {
    const _ = w.value === g, A = N === f;
    return o.jsx("li", { role: "presentation", children: o.jsxs("button", { type: "button", role: "option", "aria-selected": _, "data-highlighted": A ? "true" : "false", className: cc, onMouseEnter: () => p(N), onMouseDown: (F) => F.preventDefault(), onClick: () => B(w.value), children: [_ ? o.jsx("span", { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(Qr, { size: 12, "aria-hidden": true }) }) : null, w.custom ? o.jsxs("span", { children: ["\uC0AC\uC6A9: ", o.jsx("span", { className: "font-mono", children: w.label })] }) : w.label] }) }, `${w.custom ? "custom:" : ""}${w.value}`);
  }) })] }) })] });
}
function dc({ language: e, collapsed: t, copied: n, editable: r, onCopy: a, onToggleCollapse: i, onLanguageChange: l, extra: c }) {
  return o.jsxs("div", { className: "haim-code-block__header", children: [r && l ? o.jsx(uc, { language: e, onChange: l }) : o.jsx("span", { className: "haim-code-block__lang", children: e || "plain" }), o.jsxs("div", { className: "haim-code-block__actions", children: [c, o.jsx(En, { label: n ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC", active: n, onClick: a, children: n ? o.jsx(Qr, { size: 14, "aria-hidden": true }) : o.jsx($o, { size: 14, "aria-hidden": true }) }), o.jsx(En, { label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30", expanded: !t, onClick: i, children: t ? o.jsx(Gr, { size: 14, "aria-hidden": true }) : o.jsx(Ho, { size: 14, "aria-hidden": true }) })] })] });
}
function hc({ node: e, editor: t, selected: n, updateAttributes: r }) {
  const a = String(e.attrs.language || ""), i = zr(a), l = e.textContent || "", [c, f] = h.useState(null), [p, d] = h.useState(false), [g, m] = h.useState(false), [x, C] = h.useState(false), [k, v] = h.useState(false), T = t.isEditable, B = h.useRef(null);
  h.useEffect(() => {
    var _a;
    if (!i || g || x) return;
    let A = false;
    const F = ic(((_a = t.view) == null ? void 0 : _a.dom) ?? null);
    return li(l, F).then((U) => {
      A || (U ? (f(U), d(false)) : (f(null), d(!!l.trim())));
    }), () => {
      A = true;
    };
  }, [i, g, x, l, t]);
  const I = h.useCallback(() => {
    var _a;
    const A = l, F = () => {
      v(true), window.setTimeout(() => v(false), 1500);
    };
    if (typeof navigator < "u" && ((_a = navigator.clipboard) == null ? void 0 : _a.writeText)) {
      navigator.clipboard.writeText(A).then(F).catch(() => {
        try {
          const U = document.createElement("textarea");
          U.value = A, document.body.appendChild(U), U.select(), document.execCommand("copy"), U.remove(), F();
        } catch {
        }
      });
      return;
    }
    F();
  }, [l]), w = h.useCallback((A) => {
    r({ language: A }), zr(A) || (m(false), f(null), d(false));
  }, [r]), N = o.jsx("pre", { className: "haim-mermaid-block__source-hidden", "aria-hidden": true, children: o.jsx(ir, { as: "code" }) }), _ = o.jsx(dc, { language: a, collapsed: x, copied: k, editable: T, onCopy: I, onToggleCollapse: () => C((A) => !A), ...T ? { onLanguageChange: w } : {}, extra: i && T && !x ? o.jsx(En, { label: g || p ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => m((A) => !A), children: g || p ? o.jsx(Xr, { size: 14, "aria-hidden": true }) : o.jsx(Yr, { size: 14, "aria-hidden": true }) }) : null });
  return i && !g && c && !x ? o.jsxs(me, { as: "div", className: `haim-code-block haim-mermaid-block${n ? " is-selected" : ""}`, "data-language": "mermaid", children: [o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: _ }), o.jsx("div", { className: "haim-mermaid-block__chart", dangerouslySetInnerHTML: { __html: c }, onDoubleClick: () => {
    T && m(true);
  } }), N] }) : o.jsxs(me, { as: "div", className: `haim-code-block${i ? " haim-code-block--mermaid-edit" : ""}${n ? " is-selected" : ""}${x ? " is-collapsed" : ""}`, "data-language": a || void 0, children: [o.jsx(ht, { delayDuration: 250, skipDelayDuration: 0, children: _ }), x ? N : o.jsxs(o.Fragment, { children: [i && p ? o.jsx("div", { className: "haim-mermaid-block__error", children: "Mermaid \uB80C\uB354 \uC2E4\uD328" }) : null, o.jsxs("div", { className: "haim-code-block__body", children: [o.jsx(fa, { text: l, className: "haim-code-block__line-numbers", contentRootRef: B }), o.jsx("pre", { ref: B, className: a ? `language-${a}` : void 0, children: o.jsx(ir, { as: "code", ...a ? { className: `language-${a}` } : {} }) })] })] })] });
}
function wa(e) {
  return String(e ?? "").replace(/^(?:\r?\n)+/, "").replace(/(?:\r?\n)+$/, "");
}
function Gc(e, t) {
  const { state: n } = e;
  n.selection;
  let r = n.tr, a = false;
  return n.doc.descendants((i, l) => {
    if (i.type.name !== "codeBlock") return;
    const c = i.textContent, f = wa(c);
    if (f === c) return;
    const p = l + 1, d = l + i.nodeSize - 1;
    r = r.insertText(f, r.mapping.map(p), r.mapping.map(d)), a = true;
  }), a ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
}
const fc = new qe("haimTrimCodeEdges");
function pc() {
  return new ft({ key: fc, appendTransaction(e, t, n) {
    if (!e.some((v) => v.selectionSet || v.docChanged) || e.some((v) => v.getMeta("haimTrimCodeEdges"))) return null;
    const r = t.selection.$from, a = n.selection.$from, i = r.parent.type.name === "codeBlock", l = a.parent.type.name === "codeBlock";
    if (!i || l) return null;
    const c = r.depth, f = r.node(c), p = r.before(c);
    if (f.type.name !== "codeBlock") return null;
    const d = f.textContent, g = wa(d);
    if (g === d) return null;
    const m = p + 1, x = p + f.nodeSize - 1;
    let C = m, k = x;
    for (const v of e) C = v.mapping.map(C), k = v.mapping.map(k);
    return n.tr.insertText(g, C, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
  } });
}
const mc = ci(ui), gc = rs.extend({ addNodeView() {
  return Ue(hc);
}, addProseMirrorPlugins() {
  var _a;
  return [...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? [], pc(), ec(), oc()];
} }).configure({ lowlight: mc, languageClassPrefix: "language-", enableTabIndentation: false }), xc = as.extend({ renderMarkdown: (e, t) => {
  if (!e) return "";
  const n = Array.isArray(e.content) ? e.content : [];
  return n.length === 0 ? "" : t.renderChildren(n);
} }), bc = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
function Jc(e) {
  const t = typeof e == "string" ? e : "", n = bc.exec(t);
  if (!n) return { prefix: "", body: t };
  const r = n[1] ?? "";
  return { prefix: r, body: t.slice(r.length) };
}
function kc(e, t) {
  return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
}
function Tn(e, t) {
  let n = 0;
  const r = Math.min(Math.max(0, t), e.length);
  for (let a = 0; a < r; a += 1) e.charCodeAt(a) === 10 && (n += 1);
  return n;
}
function wc(e) {
  if (!e) return 0;
  const t = "\0", n = kc(e, t), r = n.indexOf(t);
  return r < 0 ? 0 : Tn(n, r);
}
function yc(e, t) {
  try {
    return e({ type: "doc", content: [t.toJSON()] }).replace(/\n+$/, "");
  } catch {
    return t.textContent || "";
  }
}
function Sc(e, t, n) {
  const r = wc(n);
  let a = "";
  try {
    a = t(e.toJSON());
  } catch {
    a = "";
  }
  const i = [];
  let l = 0;
  return e.forEach((c, f) => {
    const p = f + c.nodeSize;
    if (c.type.name === "noteCover") {
      i.push({ pos: f, to: p, line0: 0 });
      return;
    }
    const d = yc(t, c);
    let g = -1;
    if (d.length > 0 && a && (g = a.indexOf(d, l), g < 0)) {
      let x = l;
      for (; x < a.length && a.charCodeAt(x) === 10; ) x += 1;
      g = a.indexOf(d, x);
    }
    let m;
    if (g >= 0) m = r + Tn(a, g), l = g + Math.max(d.length, 1);
    else {
      for (; l < a.length && a.charCodeAt(l) === 10; ) l += 1;
      m = r + Tn(a, l), l = Math.min(a.length, l + Math.max(d.length, d ? 0 : 1));
    }
    i.push({ pos: f, to: p, line0: m });
  }), i;
}
function Cc(e) {
  var _a;
  const n = (_a = e.storage.markdown) == null ? void 0 : _a.manager;
  return !n || typeof n.serialize != "function" ? null : (r) => n.serialize(r);
}
const vc = pt.create({ name: "haimSourceLine", addOptions() {
  return { getMetaPrefix: () => "" };
}, addDecorations() {
  const e = this.options.getMetaPrefix ?? (() => "");
  return { update: "document", create: ({ editor: t, state: n }) => {
    const r = Cc(t);
    if (!r) return [];
    const a = e() || "";
    return Sc(n.doc, r, a).map((l) => ss.Node(l.pos, l.to, { "data-line": String(l.line0) }));
  } };
} });
function jc(e, t, n) {
  return new xn({ find: e, handler: ({ state: r, range: a, match: i }) => {
    if (!n()) return null;
    let l = t, c = a.from;
    const f = a.to;
    if (i[1]) {
      const p = i[0].lastIndexOf(i[1]);
      l += i[0].slice(p + i[1].length), c += p;
      const d = c - f;
      d > 0 && (l = i[0].slice(p - d, p) + l, c = f);
    }
    r.tr.insertText(l, c, f);
  } });
}
const Mc = [{ find: /--$/, replace: "\u2014", ruleId: "emDash" }, { find: /\.\.\.$/, replace: "\u2026", ruleId: "ellipsis" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/, replace: "\u201C", ruleId: "doubleQuotes" }, { find: /"$/, replace: "\u201D", ruleId: "doubleQuotes" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/, replace: "\u2018", ruleId: "singleQuotes" }, { find: /'$/, replace: "\u2019", ruleId: "singleQuotes" }, { find: /<-$/, replace: "\u2190", ruleId: "leftArrow" }, { find: /->$/, replace: "\u2192", ruleId: "rightArrow" }, { find: /\(c\)$/, replace: "\xA9", ruleId: "copyright" }, { find: /\(tm\)$/, replace: "\u2122", ruleId: "trademark" }, { find: /\(sm\)$/, replace: "\u2120", ruleId: "servicemark" }, { find: /\(r\)$/, replace: "\xAE", ruleId: "registeredTrademark" }, { find: /(?:^|\s)(1\/2)\s$/, replace: "\xBD", ruleId: "oneHalf" }, { find: /(?:^|\s)(1\/4)\s$/, replace: "\xBC", ruleId: "oneQuarter" }, { find: /(?:^|\s)(3\/4)\s$/, replace: "\xBE", ruleId: "threeQuarters" }, { find: /\+\/-$/, replace: "\xB1", ruleId: "plusMinus" }, { find: /!=$/, replace: "\u2260", ruleId: "notEqual" }, { find: /\d+\s?([*x])\s?\d+$/, replace: "\xD7", ruleId: "multiplication" }, { find: /<<$/, replace: "\xAB", ruleId: "laquo" }, { find: />>$/, replace: "\xBB", ruleId: "raquo" }, { find: /\^2$/, replace: "\xB2", ruleId: "superscriptTwo" }, { find: /\^3$/, replace: "\xB3", ruleId: "superscriptThree" }], Lc = pt.create({ name: "haimTypography", addOptions() {
  return { initialRules: { ...Wr } };
}, addStorage() {
  return { rules: { ...this.options.initialRules } };
}, addCommands() {
  return { setHaimTypographyRules: (e) => () => (this.storage.rules = { ...e }, true) };
}, addInputRules() {
  return Mc.map(({ find: e, replace: t, ruleId: n }) => jc(e, t, () => !!this.storage.rules[n]));
} });
function Zc(e) {
  const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", a = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), i = (e == null ? void 0 : e.typographyRules) ?? Wr, c = [r ? lr.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, codeBlock: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }) : lr.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }), xc, Qi, vc.configure({ getMetaPrefix: a }), Yi, hs.extend({ parseHTML() {
    return [{ tag: "img[src]:not([data-wiki-path])" }];
  }, addNodeView() {
    return Ue(Oi);
  } }).configure({ allowBase64: true }), fs.configure({ taskItem: false, taskList: false }), Zi.configure({ nested: true }), tl, ps.configure({ table: { resizable: r } }), os, ms.configure({ types: ["heading", "paragraph"] }), gs.configure({ multicolor: true }), ...r ? [gc] : [], is, ls, Lc.configure({ initialRules: i }), xs.configure({ placeholder: t, ...r ? {} : { showOnlyCurrent: false } }), cs, bs.configure({ className: "haim-node-focused" }), us, ds, ql, Ul, al, ll, ul, cl, ...r ? [dl] : [], Tl, Nl, Fl, Bl, Ol, ...r ? [Hl] : []];
  return r ? [...c, ks, Cs.configure({ controls: true, nocookie: true }), vs.configure({ persist: true }), ws, ys, js.configure({ emojis: Ms, enableEmoticons: true }), Ss, Ls.configure({ injectCSS: true, visible: false }), Es.configure({ types: ["heading", "paragraph"] }), Ts.configure({ getIndex: Ns }), nl] : c;
}
const Nn = /* @__PURE__ */ new WeakMap();
function Ec(e, t) {
  if (e === t) return true;
  if (!e || !t) return false;
  try {
    return JSON.stringify(e) === JSON.stringify(t);
  } catch {
    return false;
  }
}
function eu(e) {
  if (!e) return "";
  const t = e.getJSON(), n = Nn.get(e);
  if (n && Ec(n.json, t)) return n.markdown;
  const r = e, a = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
  return Nn.set(e, { json: t, markdown: a }), a;
}
function tu(e) {
  e && Nn.delete(e);
}
export {
  Ml as H,
  Qc as a,
  jl as b,
  Zc as c,
  Vc as d,
  la as e,
  Uc as f,
  eu as g,
  tu as i,
  kc as j,
  Yc as n,
  vl as p,
  qc as r,
  Jc as s,
  Gc as t,
  sa as u,
  Xc as w
};
