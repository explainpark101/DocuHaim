import { c as ge, e as ko, f as xe, P as He, h as Ee, i as wo, M as yo, j as Co, I as En, r as So, k as Sn, l as vo, n as Mo, p as Cr, o as jo, g as To, q as Eo, t as Le, v as Lo, w as Io, T as O, N as ua, R as Ge, x as De, y as No, z as Ao, A as Sr, B as vr, C as $o, F as Po, G as Mr, H as Ho, J as Do, K as Bo, L as jr, O as Ro, Q as _o, S as Oo, U as zo, V as Fo, W as Ko, X as Wo, Y as qo, Z as Uo, _ as Vo, $ as Xo, a0 as Yo, a1 as Go, a2 as Qo, a3 as Zo, a4 as Jo, a5 as es, a6 as ts, a7 as ns, a8 as rs, a9 as as, aa as os, ab as ss } from "./vendor-tiptap-B9z9WF3R.js";
import { r as p, j as l, c as is, b as ls } from "./vendor-react-BLJzfvPB.js";
import { A as vn, m as qe } from "./vendor-motion-DSEw68MZ.js";
import { t as cs, O as us } from "./index-Dj2EGo58.js";
import { c as ds, n as Ue, a9 as fs, C as hs, i as ps, fn as da, j5 as fa, j6 as ha, j7 as ms, hy as gs, e9 as _t, a4 as qn, j8 as xs, j9 as pa, hM as Tr, q as bs, aW as ma, ja as ks, jb as ws, jc as ga } from "./index-CzDTh_Dm.js";
import { g as ys } from "./Kbd-9cV0YtE4.js";
import { t as Ln, bg as Cs, P as Ss, ba as vs, bh as Ms, bi as js, v as Ts, aD as Er, z as Lr, U as xa, R as ba, T as Es, bj as Ls, ag as Is, o as Ns, w as As, bk as $s, X as Ps, B as Hs, I as Ds, c as Bs, d as Rs, h as _s, aO as Os, aP as zs, e as Fs, f as Ks, g as Ir, Q as Ws, aZ as qs, i as Nr, aT as Us, aU as Vs, aV as Xs, aW as Ys, Y as It, aX as Gs, aK as ct, aF as Qs, S as Zs, aI as Js, n as ka, aY as ei, a$ as ti, aQ as ni, aR as ri, aS as ai, bl as oi, bm as si, bn as ii, E as wa, bo as ya, y as Ca, an as li, k as Sa, j as ci } from "./vendor-lucide--whUmDUa.js";
import { N as ui, O as di, Q as fi, U as hi, V as pi, W as mi, y as ut, z as dt, B as Mn, E as ft, G as ht, H as pt, K as Me, M as je, h as bt, i as Ft, j as Kt, k as Wt, l as qt, A as Ut, R as gi, T as xi, P as bi, C as ki } from "./vendor-radix-4pFcYp0u.js";
import { d as va } from "./bootSplash-QPCcRCUR.js";
import { b as mt, c as Ht, d as Ar, e as Ma, a as wi, s as yi, f as $r, g as Ci } from "./emojiShortcode-d5Fgeg8O.js";
import { W as Si } from "./WikiImageSizeModal-BP2OEoI2.js";
import { c as vi, f as Mi } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as ji } from "./toHtml-DeJFtPoU.js";
import { p as Ti } from "./mdEditorSelectionWrap-CfWk0QKk.js";
import { k as Ei } from "./vendor-katex-NqpuB_gR.js";
import { r as Li, l as Ii } from "./haimCodeTabSettings-BI7a8VYQ.js";
import { r as Ni, p as Ai, a as $i, s as Pi } from "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import { b as Hi, s as Di, h as Bi, f as Ri, a as _i, l as Oi } from "./haimCodeBlockLanguages-BStQPvla.js";
import { c as zi } from "./lazyMermaid-rAP6XGht.js";
import { c as Fi, g as Ki } from "./vendor-highlight-CyieoItt.js";
function Wi() {
  var _a2;
  return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
}
async function qi(e) {
  const t = navigator.ink;
  if (!(t == null ? void 0 : t.requestPresenter)) return null;
  try {
    return await t.requestPresenter({ presentationArea: e });
  } catch {
    return null;
  }
}
async function Ui(e) {
  const { src: t, inkCanvas: n, highlightCanvas: r } = e, a = await Vi(t), o = ("width" in a, a.width), s = ("height" in a, a.height), c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(o)), c.height = Math.max(1, Math.round(s));
  const u = c.getContext("2d");
  if (!u) throw new Error("Canvas 2D unavailable");
  if (u.imageSmoothingEnabled = true, u.imageSmoothingQuality = "high", u.drawImage(a, 0, 0, c.width, c.height), n && n.width > 0 && n.height > 0 && u.drawImage(n, 0, 0, c.width, c.height), r && r.width > 0 && r.height > 0 && u.drawImage(r, 0, 0, c.width, c.height), "close" in a && typeof a.close == "function") try {
    a.close();
  } catch {
  }
  const h = await new Promise((d) => {
    c.toBlob((m) => d(m), "image/png");
  });
  if (!h) throw new Error("Failed to encode PNG");
  return h;
}
async function Vi(e) {
  try {
    const t = await fetch(e, { mode: "cors", credentials: "omit" });
    if (!t.ok) throw new Error(`fetch ${t.status}`);
    const n = await t.blob();
    return await createImageBitmap(n);
  } catch {
    return await Xi(e);
  }
}
function Xi(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(new Error("Image load failed for composite")), r.src = e;
  });
}
function Vt(e) {
  return Math.max(e.diameterX, e.diameterY);
}
function ja(e) {
  return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
}
function Yi(e, t) {
  return !(t >= 8) || !(e >= 1) ? 1 : K(e / t, 0.25, 12);
}
function Pr(e, t, n) {
  const r = Math.max(4, Math.min(96, Math.min(t, n) * 0.08));
  return K(e, 0.5, r);
}
function Ta(e, t) {
  if (e.length < 2) return 0;
  const n = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
  if (n === r) {
    const s = e[Math.max(0, t - 1)], c = e[t];
    return Math.atan2(c.y - s.y, c.x - s.x);
  }
  const a = e[n], o = e[r];
  return Math.atan2(o.y - a.y, o.x - a.x);
}
function Ea(e, t) {
  if (e.length === 0) return [];
  const n = e[0];
  if (!n) return [];
  const r = Math.max(0.5, t), a = [{ ...n }];
  let o = 0;
  for (let s = 1; s < e.length; s += 1) {
    const c = e[s - 1], u = e[s], h = Math.hypot(u.x - c.x, u.y - c.y);
    if (h < 1e-6) continue;
    let d = 0;
    for (; o + (h - d) >= r; ) {
      const m = r - o, g = (d + m) / h;
      a.push({ x: c.x + (u.x - c.x) * g, y: c.y + (u.y - c.y) * g, pressure: c.pressure + (u.pressure - c.pressure) * g }), d += m, o = 0;
    }
    o += h - d;
  }
  return a;
}
const Gi = [{ value: "300", label: "Light 300" }, { value: "400", label: "Regular 400" }, { value: "500", label: "Medium 500" }, { value: "600", label: "Semibold 600" }, { value: "700", label: "Bold 700" }, { value: "800", label: "ExtraBold 800" }], Qi = [{ value: "multiply", label: "Multiply" }, { value: "overlay", label: "Overlay" }, { value: "soft-light", label: "Soft light" }, { value: "screen", label: "Screen" }, { value: "darken", label: "Darken" }, { value: "lighten", label: "Lighten" }, { value: "color-burn", label: "Color burn" }, { value: "normal", label: "Normal" }];
function K(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
const La = 0.92, Hr = 0.35;
function Zi(e, t) {
  const n = e.x - t.x, r = e.y - t.y;
  return n * n + r * r;
}
function Ia(e, t, n = La) {
  const r = K(n, 0.05, 1);
  return { x: e.x + (t.x - e.x) * r, y: e.y + (t.y - e.y) * r, pressure: e.pressure + (t.pressure - e.pressure) * r };
}
function Ji(e, t, n, r = La) {
  let a = t;
  const o = Hr * Hr;
  for (const s of n) {
    a = Ia(a, s, r);
    const c = e[e.length - 1];
    !c || Zi(c, a) >= o ? e.push({ ...a }) : (c.x = a.x, c.y = a.y, c.pressure = a.pressure);
  }
  return a;
}
function el(e) {
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
function In(e) {
  if (e.dash !== "dashed") return;
  const t = Vt(e), n = Math.max(2, t * 1.2);
  return `${Math.max(2, t * 2.2)} ${n}`;
}
function Nn(e) {
  return e === "square" ? "square" : "round";
}
function An(e) {
  return e === "square" ? "miter" : "round";
}
function tl(e) {
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
function Dr(e, t, n) {
  e.lineCap = Nn(t.shape), e.lineJoin = An(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, n), e.globalAlpha = K(t.opacity, 0.02, 1);
  const r = In(t);
  r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
}
function nl(e, t, n, r, a = 1) {
  const o = Math.max(0.25, t.diameterX * a / 2), s = Math.max(0.25, t.diameterY * a / 2);
  e.save(), e.translate(n.x, n.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-o, -s, o * 2, s * 2) : e.ellipse(0, 0, o, s, 0, 0, Math.PI * 2), e.fill(), e.restore();
}
function Na(e, t) {
  if (t.points.length < 1) return;
  if (e.globalAlpha = K(t.opacity, 0.02, 1), ja(t)) {
    const a = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), o = Ea(t.points, a);
    for (let s = 0; s < o.length; s += 1) {
      const c = o[s], u = Math.min(t.points.length - 1, Math.round(s / Math.max(1, o.length - 1) * (t.points.length - 1))), h = Ta(t.points, u), d = t.kind === "pressure" ? c.pressure : 1;
      nl(e, t, c, h, d);
    }
    return;
  }
  const n = Vt(t);
  if (t.kind === "pressure" && t.points.length >= 2) {
    for (let a = 1; a < t.points.length; a += 1) {
      const o = t.points[a - 1], s = t.points[a], c = Math.max(0.5, n * ((o.pressure + s.pressure) / 2));
      Dr(e, t, c), e.beginPath(), e.moveTo(o.x, o.y), e.lineTo(s.x, s.y), e.stroke();
    }
    return;
  }
  Dr(e, t, n), e.beginPath();
  const r = t.points[0];
  if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
  else for (let a = 1; a < t.points.length; a += 1) {
    const o = t.points[a];
    e.lineTo(o.x, o.y);
  }
  e.stroke();
}
function rl(e, t, n) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const a = r.getContext("2d");
  if (!a) return r;
  a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
  for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = "source-over", a.strokeStyle = o.color), Na(a, o), a.restore();
  return r;
}
function al(e, t, n) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const a = r.getContext("2d");
  if (!a) return r;
  a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
  for (const o of n) a.save(), o.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = tl(o.blend), a.strokeStyle = o.color), Na(a, o), a.restore();
  return r;
}
function ol(e, t, n) {
  var _a2;
  e.textBaseline = "top", e.textAlign = "left";
  for (const r of t) {
    const a = r.text ?? "";
    if (!a.trim() && a.length === 0) continue;
    const o = Math.max(1, r.fontSizePx * Math.max(1e-3, n));
    e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = K(r.opacity, 0.02, 1), e.fillStyle = r.color;
    const s = ((_a2 = r.fontFamily) == null ? void 0 : _a2.trim()) || "sans-serif";
    e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${o}px ${s}`;
    const c = o * 1.3, u = a.split(`
`);
    for (let h = 0; h < u.length; h += 1) e.fillText(u[h] ?? "", r.x, r.y + h * c);
    e.restore();
  }
}
const Br = 8192;
function sl(e) {
  const t = Math.max(1, e.clientWidth), n = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, a = e.naturalHeight > 0 ? e.naturalHeight : n, o = Math.min(3, window.devicePixelRatio || 1);
  let s = Math.max(r, Math.round(t * o)), c = Math.max(a, Math.round(n * o));
  const u = Math.max(s, c);
  if (u > Br) {
    const h = Br / u;
    s = Math.max(1, Math.round(s * h)), c = Math.max(1, Math.round(c * h));
  }
  return { bufW: s, bufH: c, cssW: t, cssH: n };
}
let Ot = null;
function ud(e) {
  Ot = e;
}
function il() {
  return typeof Ot == "function";
}
async function Aa(e) {
  var _a2;
  if (!Ot) throw new Error("Image upload is not available");
  const n = (_a2 = (await Ot([e]))[0]) == null ? void 0 : _a2.trim();
  if (!n) throw new Error("Upload returned no path");
  return n;
}
function dd(e) {
  return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}
const Un = [0.22, 1, 0.36, 1], ll = { duration: 0.2, ease: Un }, cl = { duration: 0.28, ease: Un }, Nt = 0.5, At = 8, Ve = 1.25, ul = 2, Se = 0.5, Te = 128, dl = 4e3, $a = 450, fl = ["#111827", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"], hl = ["#facc15", "#f472b6", "#38bdf8", "#4ade80", "#fb923c"], pl = { backgroundColor: "#ffffff", backgroundImage: ["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)", "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","), backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" };
function Xe(e) {
  return Math.round(e * 10) / 10;
}
function ml(e) {
  return Math.max(0.1, Xe(e / 10));
}
function Rr(e, t) {
  return Xe(K(e + t * ml(e), Se, Te));
}
const $n = 8, Pn = 400;
function gl() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", t = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
}
const Pa = gl(), pe = ys(), _r = Pa ? `${pe}+Shift+Z` : `${pe}+Y`;
function xl(e, t) {
  const n = Math.max(1, Math.round(e / 10));
  return K(Math.round(e + t * n), $n, Pn);
}
function bl(e, t) {
  if (!t) return 1;
  const n = e.pressure;
  return typeof n != "number" || Number.isNaN(n) || e.pointerType === "mouse" ? 0.5 : K(n || 0.05, 0.05, 1);
}
function X({ label: e, active: t = false, disabled: n = false, tone: r = "default", onClick: a, children: o }) {
  const s = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
  return l.jsxs(Ft, { children: [l.jsx(Kt, { asChild: true, children: l.jsx("button", { type: "button", "aria-label": e, disabled: n, onClick: a, className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${s}`, children: o }) }), l.jsx(Wt, { children: l.jsxs(qt, { side: "top", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [e, l.jsx(Ut, { className: "fill-neutral-900" })] }) })] });
}
const kl = { backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" };
function Or({ size: e = 16 }) {
  return l.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: l.jsx("path", { d: "M2 8h12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function zr({ size: e = 16 }) {
  return l.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: l.jsx("path", { d: "M2 8h3M7 8h3M12 8h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function fe({ stroke: e, fading: t = false }) {
  const n = e.kind === "eraser", r = n ? "#000" : e.color, a = n ? 1 : e.opacity, o = t ? { opacity: 0, transition: `opacity ${$a}ms ease-out` } : { opacity: a };
  if (ja(e)) {
    const u = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), h = Ea(e.points, u);
    return l.jsx("g", { style: o, children: h.map((d, m) => {
      const g = Math.min(e.points.length - 1, Math.round(m / Math.max(1, h.length - 1) * (e.points.length - 1))), x = Ta(e.points, g) * 180 / Math.PI, w = e.kind === "pressure" ? d.pressure : 1, k = Math.max(0.25, e.diameterX * w / 2), S = Math.max(0.25, e.diameterY * w / 2);
      return e.shape === "square" ? l.jsx("rect", { x: -k, y: -S, width: k * 2, height: S * 2, fill: r, transform: `translate(${d.x} ${d.y}) rotate(${x})` }, `${e.id}-st-${m}`) : l.jsx("ellipse", { cx: 0, cy: 0, rx: k, ry: S, fill: r, transform: `translate(${d.x} ${d.y}) rotate(${x})` }, `${e.id}-st-${m}`);
    }) });
  }
  const s = Vt(e);
  if (e.kind === "pressure" && e.points.length >= 2) return l.jsx("g", { style: o, children: e.points.slice(1).map((u, h) => {
    const d = e.points[h], m = Math.max(0.5, s * ((d.pressure + u.pressure) / 2));
    return l.jsx("path", { d: `M ${d.x} ${d.y} L ${u.x} ${u.y}`, fill: "none", stroke: r, strokeWidth: m, strokeLinecap: Nn(e.shape), strokeLinejoin: An(e.shape), strokeMiterlimit: 2, strokeDasharray: In({ ...e, diameterX: m, diameterY: m }), style: { fill: "none" } }, `${e.id}-p-${h}`);
  }) });
  const c = el(e.points);
  return c ? l.jsx("path", { d: c, fill: "none", stroke: r, strokeWidth: s, strokeLinecap: Nn(e.shape), strokeLinejoin: An(e.shape), strokeMiterlimit: 2, strokeDasharray: In(e), style: { ...o, fill: "none" } }) : null;
}
function Ha({ src: e, alt: t = "", open: n, onClose: r, onSaveAnnotated: a }) {
  const o = !!(n && e), [s, c] = p.useState(1), [u, h] = p.useState({ x: 0, y: 0 }), [d, m] = p.useState("pan"), [g, x] = p.useState("#111827ff"), [w, k] = p.useState("#facc15ff"), [S, L] = p.useState(4), [_, N] = p.useState(4), [y, I] = p.useState(1), [z, A] = p.useState(0.45), [P, U] = p.useState("multiply"), [ie, Be] = p.useState("circle"), [ee, T] = p.useState("solid"), [E, D] = p.useState([]), [H, F] = p.useState([]), [V, le] = p.useState([]), [ae, Y] = p.useState([]), [q, te] = p.useState(null), [ne, G] = p.useState(null), [ue, ce] = p.useState("Paperozi, sans-serif"), [be, Q] = p.useState(24), [re, kt] = p.useState("400"), [Re, Qt] = p.useState("normal"), [Ga, Zt] = p.useState(() => /* @__PURE__ */ new Set()), [Z, ve] = p.useState(null), [Jt, en] = p.useState(false), [Qa, ke] = p.useState([]), [B, Za] = p.useState({ w: 1, h: 1 }), [wt, yt] = p.useState(null), [Ja, tn] = p.useState(false), [Qe, Qn] = p.useState(false), [Zn, nn] = p.useState(null), [rn, an] = p.useState(false), [on, Jn] = p.useState(false), [sn, Ze] = p.useState(false), ln = p.useRef({ w: 4, h: 4 }), Ct = p.useRef(null), cn = p.useRef(null), St = p.useRef(null), Ie = p.useRef(null), er = p.useRef([]), tr = p.useRef([]), Je = p.useRef([]), we = p.useRef(null), ye = p.useRef(null), un = p.useRef(null), nr = p.useRef(null), dn = p.useRef(0), Ce = p.useRef(null), fn = p.useRef(null), _e = p.useRef(null), et = p.useRef(null), vt = p.useRef(null), Ne = p.useRef(null), Mt = p.useRef(1), rr = p.useRef(s), ar = p.useRef(0), Oe = p.useRef(/* @__PURE__ */ new Map()), hn = p.useRef([]), tt = p.useRef(null);
  er.current = E, tr.current = H, Je.current = ae, rr.current = s;
  const or = !!a && il() && (E.length > 0 || H.length > 0 || ae.some((i) => i.text.trim().length > 0)), nt = ae.find((i) => i.id === q) ?? null, rt = d === "highlighter" ? w : g, eo = d === "highlighter" ? z : y, at = p.useCallback(() => {
    c(1), h({ x: 0, y: 0 });
  }, []), jt = p.useCallback(() => {
    for (const i of Oe.current.values()) clearTimeout(i);
    Oe.current.clear();
  }, []), pn = p.useCallback(() => {
    D([]), F([]), le([]), Y([]), te(null), G(null), Zt(/* @__PURE__ */ new Set()), ke([]), hn.current = [], ve(null), en(false), we.current = null, ye.current = null, dn.current = 0;
    const i = nr.current, f = un.current;
    i && f && i.clearRect(0, 0, f.width, f.height), Ce.current != null && (cancelAnimationFrame(Ce.current), Ce.current = null), et.current = null, jt();
  }, [jt]), mn = p.useRef(false);
  p.useEffect(() => {
    if (!o) {
      mn.current = false;
      return;
    }
    const i = !mn.current;
    mn.current = true, i && (at(), pn(), m("pan"), nn(null), yt(null));
  }, [o, e, at, pn]), p.useEffect(() => {
    var _a2;
    o || (Ze(false), jt(), (_a2 = tt.current) == null ? void 0 : _a2.call(tt), tt.current = null);
  }, [o, jt]);
  const ze = p.useCallback(() => {
    const i = cn.current;
    if (!i) return;
    const { bufW: f, bufH: b, cssW: v } = sl(i);
    v < 8 || i.clientHeight < 8 || (Mt.current = Yi(f, v), Za({ w: f, h: b }));
  }, []);
  p.useEffect(() => {
    if (!o) return;
    ze();
    const i = cn.current;
    if (!i) return;
    const f = () => ze();
    i.addEventListener("load", f);
    const b = typeof ResizeObserver < "u" ? new ResizeObserver(ze) : null;
    return b == null ? void 0 : b.observe(i), window.addEventListener("resize", ze), () => {
      i.removeEventListener("load", f), b == null ? void 0 : b.disconnect(), window.removeEventListener("resize", ze);
    };
  }, [o, e, ze]), p.useEffect(() => {
    if (!o) {
      Ie.current = null, tn(false);
      return;
    }
    let i = false;
    const f = St.current;
    if (!f || !Wi()) {
      tn(false);
      return;
    }
    return qi(f).then((b) => {
      i || (Ie.current = b, tn(!!b));
    }), () => {
      i = true, Ie.current = null;
    };
  }, [o, e, B.w]);
  const Fe = p.useCallback((i, f, b) => {
    const v = Ct.current;
    if (!v) {
      c(K(i, Nt, At));
      return;
    }
    const M = v.getBoundingClientRect(), C = f - M.left - M.width / 2, j = b - M.top - M.height / 2;
    c((R) => {
      const J = K(i, Nt, At), de = J / R;
      return h((se) => ({ x: C - (C - se.x) * de, y: j - (j - se.y) * de })), J;
    });
  }, []), to = p.useCallback((i) => {
    var _a2;
    if ((_a2 = tt.current) == null ? void 0 : _a2.call(tt), tt.current = null, Ct.current = i, !i) return;
    const f = (b) => {
      b.preventDefault(), b.stopPropagation();
      const v = b.deltaY > 0 ? 1 / Ve : Ve;
      Fe(rr.current * v, b.clientX, b.clientY);
    };
    i.addEventListener("wheel", f, { passive: false, capture: true }), tt.current = () => {
      i.removeEventListener("wheel", f, true);
    };
  }, [Fe]), no = p.useCallback((i) => {
    if (i.preventDefault(), i.stopPropagation(), s > 1.05) {
      at();
      return;
    }
    Fe(ul, i.clientX, i.clientY);
  }, [s, at, Fe]), ot = p.useCallback((i, f) => {
    const b = St.current;
    if (!b) return null;
    const v = b.getBoundingClientRect();
    return v.width < 1 || v.height < 1 ? null : { x: (i.clientX - v.left) / v.width * B.w, y: (i.clientY - v.top) / v.height * B.h, pressure: bl(i, f) };
  }, [B.w, B.h]), gn = p.useCallback((i) => {
    const f = i === "laser" ? 0.75 : 1, b = i === "highlighter" ? 4 : i === "laser" ? 2 : Se;
    if (i === "highlighter") return { w: Math.max(b, S * f), h: Math.max(b, _ * f) };
    const v = Math.max(b, S * f);
    return { w: v, h: v };
  }, [S, _]);
  p.useEffect(() => {
    d !== "eraser" && (d === "pen" || d === "pressure" || d === "highlighter" || d === "laser") && (ln.current = { w: S, h: _ });
  }, [d, S, _]);
  const sr = p.useCallback(() => {
    const i = ln.current;
    L(i.w), N(i.h);
  }, []), ir = p.useCallback(() => {
    const i = ln.current, f = Math.max(i.w, i.h), b = Xe(K(f * 5, Se, Te));
    L(b), N(b), m("eraser");
  }, []), oe = p.useCallback((i) => {
    if (d === "eraser" && i !== "eraser" && sr(), i === "eraser") {
      ir();
      return;
    }
    if (i === "highlighter") {
      m("highlighter"), T("solid"), Be("square");
      return;
    }
    m(i);
  }, [d, sr, ir]), lr = p.useCallback((i) => {
    var _a2, _b;
    i.preventDefault(), i.stopPropagation(), (_b = (_a2 = i.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId), Ne.current = { pointerId: i.pointerId, startX: i.clientX, startY: i.clientY, originX: u.x, originY: u.y };
  }, [u.x, u.y]), cr = p.useCallback((i) => {
    const f = Ne.current;
    !f || f.pointerId !== i.pointerId || (i.preventDefault(), h({ x: f.originX + (i.clientX - f.startX), y: f.originY + (i.clientY - f.startY) }));
  }, []), ur = p.useCallback((i) => {
    var _a2, _b;
    const f = Ne.current;
    if (!(!f || f.pointerId !== i.pointerId)) {
      Ne.current = null;
      try {
        (_b = (_a2 = i.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId);
      } catch {
      }
    }
  }, []), Ke = p.useCallback((i) => {
    const f = Oe.current.get(i);
    f && clearTimeout(f);
    const b = setTimeout(() => {
      Zt((M) => {
        const C = new Set(M);
        return C.add(i), C;
      });
      const v = setTimeout(() => {
        Oe.current.delete(i), Zt((M) => {
          const C = new Set(M);
          return C.delete(i), C;
        }), le((M) => M.filter((C) => C.id !== i));
      }, $a);
      Oe.current.set(i, v);
    }, dl);
    Oe.current.set(i, b);
  }, []), Ae = p.useCallback(() => {
    const i = un.current, f = nr.current ?? (i == null ? void 0 : i.getContext("2d"));
    i && f && f.clearRect(0, 0, i.width, i.height), dn.current = 0;
  }, []), xn = p.useCallback(() => {
    Ce.current == null && (Ce.current = requestAnimationFrame(() => {
      Ce.current = null;
      const i = we.current;
      if (!i) {
        ve(null);
        return;
      }
      ve({ ...i, points: i.points.slice() });
    }));
  }, []), We = p.useCallback((i, f) => {
    const b = i.nativeEvent, v = typeof b.getCoalescedEvents == "function" ? b.getCoalescedEvents() : [], M = v.length > 0 ? v : [b], C = [];
    for (const j of M) {
      const R = ot(j, f);
      R && C.push(R);
    }
    if (C.length === 0) {
      const j = ot(i, f);
      j && C.push(j);
    }
    return C;
  }, [ot]), dr = p.useCallback((i) => {
    var _a2, _b;
    if (d !== "pen" && d !== "pressure" && d !== "highlighter" && d !== "laser" && d !== "eraser") return;
    i.preventDefault(), i.stopPropagation();
    const b = We(i, d === "pressure"), v = b[b.length - 1];
    if (!v) return;
    (_b = (_a2 = i.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId);
    const M = d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen", C = M === "laser" ? "#ef4444" : M === "highlighter" ? w : M === "eraser" ? "#000000" : g, j = gn(M), R = K(Mt.current, 0.25, 12), J = Pr(Math.max(0.5, j.w * R), B.w, B.h), de = Pr(Math.max(0.5, j.h * R), B.w, B.h), se = M === "eraser" ? 1 : M === "laser" ? 0.9 : M === "highlighter" ? z : y, W = { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, seq: ++ar.current, kind: M, color: C, diameterX: J, diameterY: de, points: [v], shape: ie, dash: ee, opacity: se, ...M === "highlighter" ? { blend: P } : {} };
    if (we.current = W, ye.current = { ...v }, en(true), dn.current = 0, ve({ ...W, points: [...W.points] }), Ae(), M === "laser" && Ke(W.id), (M === "pen" || M === "pressure") && Ie.current && i.nativeEvent.isTrusted) try {
      const bo = Math.max(j.w, j.h);
      Ie.current.updateInkTrailStartPoint(i.nativeEvent, { color: g, diameter: Math.max(1, bo * (M === "pressure" ? v.pressure : 1)) });
    } catch {
    }
  }, [d, g, w, z, y, P, ie, ee, We, gn, Ke, Ae, xn]), fr = p.useCallback((i) => {
    const f = we.current;
    if (!f) return;
    i.preventDefault();
    const b = f.kind === "pressure", v = We(i, b);
    if (!v.length) return;
    const M = ye.current ?? f.points[f.points.length - 1];
    if (M && (ye.current = Ji(f.points, M, v), xn(), f.kind === "laser" && Ke(f.id), (f.kind === "pen" || f.kind === "pressure") && Ie.current && i.nativeEvent.isTrusted)) try {
      const C = ye.current, R = Vt(f) / Math.max(1e-3, Mt.current);
      Ie.current.updateInkTrailStartPoint(i.nativeEvent, { color: f.color, diameter: Math.max(1, R * (f.kind === "pressure" ? (C == null ? void 0 : C.pressure) ?? 1 : 1)) });
    } catch {
    }
  }, [We, xn, Ke]), hr = p.useCallback((i) => {
    var _a2, _b;
    const f = we.current;
    if (!f) return;
    const b = f.kind === "pressure", v = We(i, b), M = v[v.length - 1];
    if (M && ye.current) {
      const j = Ia(ye.current, M, 1), R = f.points[f.points.length - 1];
      !R || R.x !== j.x || R.y !== j.y ? f.points.push(j) : R.pressure = j.pressure, ye.current = j;
    }
    we.current = null, ye.current = null, Ce.current != null && (cancelAnimationFrame(Ce.current), Ce.current = null), en(false);
    try {
      (_b = (_a2 = i.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, i.pointerId);
    } catch {
    }
    if (f.points.length === 0) {
      ve(null), Ae();
      return;
    }
    const C = { ...f, points: [...f.points] };
    if (f.kind === "laser") {
      le((j) => [...j, C]), Ke(f.id), ve(null), Ae();
      return;
    }
    if (ke([]), f.kind === "highlighter") F((j) => [...j, C]);
    else if (f.kind === "eraser") {
      D((j) => [...j, C]), F((j) => [...j, C]), ve(null), Ae();
      return;
    } else D((j) => [...j, C]);
    ve(null), Ae();
  }, [We, Ke, Ae]), Tt = p.useCallback((i) => {
    q && Y((f) => f.map((b) => b.id === q ? { ...b, ...i } : b));
  }, [q]), pr = p.useCallback((i) => {
    i.preventDefault(), i.stopPropagation();
    const f = ot(i, false);
    if (!f) return;
    const b = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, v = { id: b, seq: ++ar.current, x: f.x, y: f.y, text: "", color: g, opacity: y, fontSizePx: be, fontFamily: ue, fontWeight: re, fontStyle: Re };
    ke([]), Y((M) => [...M, v]), te(b), G(b), window.setTimeout(() => {
      var _a2;
      return (_a2 = vt.current) == null ? void 0 : _a2.focus();
    }, 30);
  }, [ot, g, y, be, ue, re, Re]), ro = p.useCallback((i) => {
    if (i.button === 1 || d === "pan") {
      lr(i);
      return;
    }
    if (d === "text") {
      G(null), pr(i);
      return;
    }
    te(null), G(null), dr(i);
  }, [d, lr, dr, pr]), ao = p.useCallback((i) => {
    if (!we.current) {
      const b = { x: i.clientX, y: i.clientY }, v = _e.current;
      v ? (_e.current = { x: v.x + (b.x - v.x) * 0.72, y: v.y + (b.y - v.y) * 0.72 }, fn.current == null && (fn.current = requestAnimationFrame(() => {
        fn.current = null, _e.current && yt({ ..._e.current });
      }))) : (_e.current = b, yt(b));
    }
    const f = et.current;
    if (f && f.pointerId === i.pointerId) {
      i.preventDefault();
      const b = St.current;
      if (!b) return;
      const v = b.getBoundingClientRect(), M = (i.clientX - f.startClientX) / Math.max(1, v.width) * B.w, C = (i.clientY - f.startClientY) / Math.max(1, v.height) * B.h;
      Y((j) => j.map((R) => R.id === f.id ? { ...R, x: f.originX + M, y: f.originY + C } : R));
      return;
    }
    if (Ne.current) {
      cr(i);
      return;
    }
    we.current && fr(i);
  }, [cr, fr, B.w, B.h]), mr = p.useCallback((i) => {
    var _a2, _b, _c2;
    if (((_a2 = et.current) == null ? void 0 : _a2.pointerId) === i.pointerId) {
      et.current = null;
      try {
        (_c2 = (_b = i.currentTarget).releasePointerCapture) == null ? void 0 : _c2.call(_b, i.pointerId);
      } catch {
      }
    }
    Ne.current && ur(i), we.current && hr(i);
  }, [ur, hr]), st = p.useCallback(() => {
    var _a2;
    const i = ne ?? q;
    try {
      (_a2 = vt.current) == null ? void 0 : _a2.blur();
    } catch {
    }
    if (i) {
      const f = Je.current.find((b) => b.id === i);
      f && !f.text.trim() && (Y((b) => b.filter((v) => v.id !== i)), te(null));
    }
    G(null);
  }, [ne, q]), bn = p.useCallback(() => {
    const i = q;
    if (!i) return;
    const f = Je.current.find((b) => b.id === i);
    f && (hn.current.push({ ...f }), ke([]), Y((b) => b.filter((v) => v.id !== i)), te(null), G(null));
  }, [q]), kn = p.useCallback(() => {
    const i = hn.current.pop();
    if (i) {
      Y((W) => [...W, i]), te(i.id), G(null);
      return;
    }
    const f = er.current, b = tr.current, v = Je.current, M = f[f.length - 1], C = b[b.length - 1], j = v[v.length - 1], R = (M == null ? void 0 : M.seq) ?? -1, J = (C == null ? void 0 : C.seq) ?? -1, de = (j == null ? void 0 : j.seq) ?? -1, se = Math.max(R, J, de);
    if (!(se < 0)) {
      if (de === se && j) {
        ke((W) => [...W, { layer: "text", text: j }]), Y(v.slice(0, -1)), te((W) => W === j.id ? null : W);
        return;
      }
      if (M && C && M.id === C.id && M.kind === "eraser" && M.seq === se) {
        ke((W) => [...W, { layer: "both", stroke: M }]), D(f.slice(0, -1)), F(b.slice(0, -1));
        return;
      }
      if (R >= J && M && R === se) {
        ke((W) => [...W, { layer: "ink", stroke: M }]), D(f.slice(0, -1));
        return;
      }
      C && J === se && (ke((W) => [...W, { layer: "highlight", stroke: C }]), F(b.slice(0, -1)));
    }
  }, []), wn = p.useCallback(() => {
    ke((i) => {
      if (!i.length) return i;
      const f = i[i.length - 1];
      return f ? (f.layer === "text" ? Y((b) => [...b, f.text]) : f.layer === "both" || f.stroke.kind === "eraser" ? (D((b) => [...b, f.stroke]), F((b) => [...b, f.stroke])) : f.layer === "ink" ? D((b) => [...b, f.stroke]) : F((b) => [...b, f.stroke]), i.slice(0, -1)) : i;
    });
  }, []), yn = p.useCallback((i) => {
    L((f) => Rr(f, i)), N((f) => Rr(f, i));
  }, []), gr = p.useCallback((i) => {
    var _a2;
    const f = q, b = (f ? (_a2 = Je.current.find((M) => M.id === f)) == null ? void 0 : _a2.fontSizePx : null) ?? be, v = xl(b, i);
    Q(v), f && Y((M) => M.map((C) => C.id === f ? { ...C, fontSizePx: v } : C));
  }, [q, be]), oo = p.useCallback((i) => {
    const f = Xe(K(i, Se, Te));
    L(f), N(f);
  }, []), so = p.useCallback(() => {
    oe("highlighter");
  }, [oe]), Et = p.useCallback(async (i) => {
    if (!a || !e || Qe) return;
    const f = ae.some((b) => b.text.trim().length > 0);
    if (!(E.length === 0 && H.length === 0 && !f)) {
      Qn(true), nn(null);
      try {
        const b = rl(B.w, B.h, E), v = b.getContext("2d");
        v && ol(v, ae, Mt.current);
        const M = al(B.w, B.h, H), C = await Ui({ src: e, inkCanvas: b, highlightCanvas: M }), j = new File([C], `annotated-${Date.now()}.png`, { type: "image/png" });
        await a(i, j);
      } catch (b) {
        nn(b instanceof Error ? b.message : String(b));
      } finally {
        Qn(false);
      }
    }
  }, [a, e, Qe, E, H, ae, B.w, B.h]), Cn = E.length + H.length + ae.length, xr = Cn > 0 || !!Z || Jt, Lt = p.useCallback(() => {
    if (xr) {
      Ze(true);
      return;
    }
    Ze(false), r();
  }, [xr, r]), io = p.useCallback(() => {
    Ze(false), r();
  }, [r]), lo = p.useCallback(() => {
    Ze(false);
  }, []);
  p.useEffect(() => {
    if (!o) return;
    const i = (f) => {
      var _a2;
      const b = f.target, v = (_a2 = b == null ? void 0 : b.tagName) == null ? void 0 : _a2.toLowerCase(), M = v === "input" || v === "textarea" || (b == null ? void 0 : b.isContentEditable), C = Pa ? f.metaKey : f.ctrlKey, j = f.key.toLowerCase(), R = f.code;
      if (C && j === "s") {
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Et(f.shiftKey ? "saveAs" : "overwrite");
        return;
      }
      if (C && j === "z" && !f.shiftKey) {
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), kn();
        return;
      }
      if (C && (j === "y" || j === "z" && f.shiftKey)) {
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), wn();
        return;
      }
      const J = !!q || d === "text", de = C && (f.shiftKey && (f.key === "<" || f.key === "," || R === "Comma") || !f.shiftKey && (f.key === "[" || R === "BracketLeft")), se = C && (f.shiftKey && (f.key === ">" || f.key === "." || R === "Period") || !f.shiftKey && (f.key === "]" || R === "BracketRight"));
      if (J && (de || se)) {
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), gr(de ? -1 : 1);
        return;
      }
      if (f.key === "Escape") {
        if (sn) return;
        if (d === "text" || ne) {
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), ne ? st() : te(null);
          return;
        }
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Lt();
        return;
      }
      if (q && !C && (j === "backspace" || j === "delete")) {
        if (ne && M && v === "textarea" && b.value.length > 0) return;
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), bn();
        return;
      }
      if (!M) {
        if (!C && f.key === "[") {
          f.preventDefault(), f.stopPropagation(), yn(-1);
          return;
        }
        !C && f.key === "]" && (f.preventDefault(), f.stopPropagation(), yn(1));
      }
    };
    return window.addEventListener("keydown", i, true), () => window.removeEventListener("keydown", i, true);
  }, [o, Et, kn, wn, yn, gr, q, ne, d, st, bn, Lt, sn]);
  const co = d !== "pan" && d !== "text" && wt != null && !Ne.current && !Jt, br = gn(d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen"), kr = Math.max(4, br.w * s), wr = Math.max(4, br.h * s), uo = E.filter((i) => i.kind === "eraser"), fo = E.filter((i) => i.kind !== "eraser"), ho = H.filter((i) => i.kind === "eraser"), po = H.filter((i) => i.kind !== "eraser"), mo = Jt && d === "highlighter" ? { mixBlendMode: P } : {}, yr = ds(Ue(rt) || "#111827ff"), go = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", it = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [lt, xo] = p.useState(null);
  return l.jsxs(l.Fragment, { children: [l.jsx(ui, { open: o, onOpenChange: (i) => {
    i || Lt();
  }, children: l.jsx(vn, { children: o ? l.jsxs(di, { forceMount: true, children: [l.jsx(fi, { asChild: true, forceMount: true, children: l.jsx(qe.div, { className: "fixed inset-0 z-100060 bg-black/85", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: ll }) }), l.jsx(hi, { asChild: true, forceMount: true, onOpenAutoFocus: (i) => i.preventDefault(), onEscapeKeyDown: (i) => {
    i.preventDefault();
  }, children: l.jsxs(qe.div, { ref: xo, className: "fixed inset-0 z-100061 flex flex-col outline-none", "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30", initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: cl, children: [l.jsx(pi, { className: "sr-only", children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30" }), l.jsx(mi, { className: "sr-only", children: "\uBCA1\uD130 \uD39C\uC73C\uB85C \uADF8\uB9AC\uACE0 \uD655\uB300/\uCD95\uC18C\xB7\uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), l.jsx("div", { ref: to, className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${d === "pan" ? "cursor-grab" : d === "text" ? "cursor-text" : "cursor-none"}`, onPointerDown: ro, onPointerMove: ao, onPointerUp: mr, onPointerCancel: mr, onPointerLeave: () => {
    yt(null), _e.current = null;
  }, children: e ? l.jsx("div", { className: "relative will-change-transform", style: { transform: `translate(${u.x}px, ${u.y}px) scale(${s})`, transformOrigin: "center center" }, onClick: (i) => i.stopPropagation(), children: l.jsxs("div", { ref: St, className: "relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl", style: pl, children: [l.jsx("img", { ref: cn, src: e, alt: t || "", className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none", draggable: false, onDoubleClick: no }), l.jsxs("svg", { className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none", viewBox: `0 0 ${B.w} ${B.h}`, preserveAspectRatio: "none", "aria-hidden": true, children: [l.jsxs("defs", { children: [l.jsxs("mask", { id: "haim-ink-erase-mask", children: [l.jsx("rect", { x: "0", y: "0", width: B.w, height: B.h, fill: "#fff" }), uo.map((i) => l.jsx(fe, { stroke: i }, `em-${i.id}`)), (Z == null ? void 0 : Z.kind) === "eraser" ? l.jsx(fe, { stroke: Z }) : null] }), l.jsxs("mask", { id: "haim-hi-erase-mask", children: [l.jsx("rect", { x: "0", y: "0", width: B.w, height: B.h, fill: "#fff" }), ho.map((i) => l.jsx(fe, { stroke: i }, `hem-${i.id}`)), (Z == null ? void 0 : Z.kind) === "eraser" ? l.jsx(fe, { stroke: Z }) : null] })] }), l.jsxs("g", { mask: "url(#haim-ink-erase-mask)", children: [fo.map((i) => l.jsx(fe, { stroke: i }, i.id)), Z && (Z.kind === "pen" || Z.kind === "pressure") ? l.jsx(fe, { stroke: Z }) : null] }), l.jsxs("g", { mask: "url(#haim-hi-erase-mask)", style: { mixBlendMode: P }, children: [po.map((i) => l.jsx("g", { style: { mixBlendMode: i.blend || P }, children: l.jsx(fe, { stroke: i }) }, i.id)), (Z == null ? void 0 : Z.kind) === "highlighter" ? l.jsx("g", { style: { mixBlendMode: Z.blend || P }, children: l.jsx(fe, { stroke: Z }) }) : null] }), l.jsxs("g", { children: [V.map((i) => l.jsx(fe, { stroke: i, fading: Ga.has(i.id) }, i.id)), (Z == null ? void 0 : Z.kind) === "laser" ? l.jsx(fe, { stroke: Z }) : null] })] }), l.jsx("canvas", { ref: un, className: "pointer-events-none absolute inset-0 h-full w-full", width: B.w, height: B.h, style: mo, "aria-hidden": true }), ae.map((i) => {
    const f = i.id === q, b = i.id === ne, v = i.x / Math.max(1, B.w) * 100, M = i.y / Math.max(1, B.h) * 100;
    return l.jsx("div", { className: `absolute z-1 min-w-8 max-w-[90%] ${f ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`, style: { left: `${v}%`, top: `${M}%`, color: i.color, opacity: i.opacity, fontFamily: i.fontFamily, fontSize: `${i.fontSizePx}px`, fontWeight: i.fontWeight, fontStyle: i.fontStyle, lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word", cursor: d === "text" || f ? "move" : "default", pointerEvents: d === "text" || f ? "auto" : "none" }, onPointerDown: (C) => {
      var _a2, _b;
      d !== "text" && d !== "pan" || (C.stopPropagation(), C.preventDefault(), oe("text"), ne && ne !== i.id && st(), G(null), te(i.id), ce(i.fontFamily), Q(i.fontSizePx), kt(i.fontWeight), Qt(i.fontStyle), et.current = { id: i.id, pointerId: C.pointerId, startClientX: C.clientX, startClientY: C.clientY, originX: i.x, originY: i.y }, (_b = (_a2 = C.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, C.pointerId));
    }, onDoubleClick: (C) => {
      C.stopPropagation(), C.preventDefault(), oe("text"), te(i.id), G(i.id), ce(i.fontFamily), Q(i.fontSizePx), kt(i.fontWeight), Qt(i.fontStyle), window.setTimeout(() => {
        var _a2;
        return (_a2 = vt.current) == null ? void 0 : _a2.focus();
      }, 20);
    }, children: b ? l.jsx("textarea", { ref: vt, value: i.text, rows: Math.max(1, i.text.split(`
`).length), placeholder: "\uD14D\uC2A4\uD2B8 \uC785\uB825", className: "block w-full min-w-24 resize-none border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-white/40", style: { fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", fontStyle: "inherit", lineHeight: "inherit", color: "inherit", fieldSizing: "content" }, onPointerDown: (C) => C.stopPropagation(), onChange: (C) => {
      const j = C.target.value;
      Y((R) => R.map((J) => J.id === i.id ? { ...J, text: j } : J));
    }, onBlur: () => {
      ne === i.id && st();
    }, onKeyDown: (C) => {
      if (C.key === "Escape") {
        C.preventDefault(), C.stopPropagation(), st();
        return;
      }
      (C.key === "Backspace" || C.key === "Delete") && C.currentTarget.value.length === 0 && (C.preventDefault(), C.stopPropagation(), bn());
    } }) : l.jsx("span", { className: "block", children: i.text || "\uD14D\uC2A4\uD2B8" }) }, i.id);
  })] }) }) : null }), co && wt ? l.jsx("div", { className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow", style: { left: wt.x - kr / 2, top: wt.y - wr / 2, width: kr, height: wr, borderRadius: ie === "circle" ? "9999px" : "2px", borderStyle: ee === "dashed" ? "dashed" : "solid", opacity: K(eo, 0.25, 0.85), backgroundColor: d === "eraser" ? "transparent" : Ue(rt) || void 0 }, "aria-hidden": true }) : null, (d === "text" || nt) && l.jsxs("aside", { className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md", onPointerDown: (i) => i.stopPropagation(), children: [l.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/90", children: [l.jsx(Ln, { size: 14, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"] }), l.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [l.jsx("span", { children: "Font family" }), l.jsx(fs, { value: (nt == null ? void 0 : nt.fontFamily) ?? ue, onChange: (i) => {
    ce(i), Tt({ fontFamily: i });
  }, className: "w-full", inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs", allowAddWebfont: true })] }), l.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [l.jsx("span", { children: "Font size" }), l.jsxs("div", { className: "flex items-center gap-1", children: [l.jsx("input", { type: "number", min: $n, max: Pn, step: 1, value: (nt == null ? void 0 : nt.fontSizePx) ?? be, onChange: (i) => {
    const f = K(Math.round(Number(i.target.value) || 24), $n, Pn);
    Q(f), Tt({ fontSizePx: f });
  }, className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white", "aria-label": "Font size (px)" }), l.jsx("span", { className: "shrink-0 text-white/60", children: "px" })] })] }), l.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [l.jsx("span", { children: "Font weight" }), l.jsxs(ut, { value: (nt == null ? void 0 : nt.fontWeight) ?? re, onValueChange: (i) => {
    kt(i), Tt({ fontWeight: i });
  }, children: [l.jsx(dt, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font weight", children: l.jsx(Mn, {}) }), l.jsx(ft, { container: lt, children: l.jsx(ht, { className: it, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (i) => i.preventDefault(), children: l.jsx(pt, { className: "p-1", children: Gi.map((i) => l.jsx(Me, { value: i.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: l.jsx(je, { children: i.label }) }, i.value)) }) }) })] })] }), l.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [l.jsx("span", { children: "Font style" }), l.jsxs(ut, { value: (nt == null ? void 0 : nt.fontStyle) ?? Re, onValueChange: (i) => {
    const f = i === "italic" ? "italic" : "normal";
    Qt(f), Tt({ fontStyle: f });
  }, children: [l.jsx(dt, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font style", children: l.jsx(Mn, {}) }), l.jsx(ft, { container: lt, children: l.jsx(ht, { className: it, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (i) => i.preventDefault(), children: l.jsxs(pt, { className: "p-1", children: [l.jsx(Me, { value: "normal", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: l.jsx(je, { children: "Normal" }) }), l.jsx(Me, { value: "italic", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: l.jsx(je, { children: "Italic" }) })] }) }) })] })] }), l.jsxs("p", { className: "text-[10px] leading-4 text-white/45", children: ["\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9", l.jsx("br", {}), "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1", l.jsx("br", {}), pe, "+[ ] / ", pe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30"] })] }), l.jsx(bt, { delayDuration: 250, skipDelayDuration: 0, children: l.jsxs("div", { className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1", onPointerDown: (i) => i.stopPropagation(), children: [l.jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md", children: [l.jsx(X, { label: "\uD328\uB2DD", active: d === "pan", onClick: () => oe("pan"), children: l.jsx(Cs, { size: 16 }) }), l.jsx(X, { label: "\uC77C\uBC18 \uD39C", active: d === "pen", onClick: () => oe("pen"), children: l.jsx(Ss, { size: 16 }) }), l.jsx(X, { label: "\uD544\uC555 \uD39C", active: d === "pressure", onClick: () => oe("pressure"), children: l.jsx(vs, { size: 16 }) }), l.jsx(X, { label: "\uD615\uAD11\uD39C", active: d === "highlighter", onClick: so, children: l.jsx(Ms, { size: 16 }) }), l.jsx(X, { label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)", active: d === "laser", onClick: () => oe("laser"), children: l.jsx(js, { size: 16 }) }), l.jsx(X, { label: "\uC9C0\uC6B0\uAC1C", active: d === "eraser", onClick: () => oe("eraser"), children: l.jsx(Ts, { size: 16 }) }), l.jsx(X, { label: "\uD14D\uC2A4\uD2B8", active: d === "text", onClick: () => oe("text"), children: l.jsx(Ln, { size: 16 }) }), l.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), l.jsxs("div", { className: "relative flex items-center", children: [l.jsx("button", { type: "button", "aria-label": "\uD39C \uC0C9\uC0C1", "aria-expanded": on, onClick: () => {
    Jn((i) => (i && an(false), !i));
  }, className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow", style: { backgroundColor: Ue(rt) || "#111827" } }), l.jsx(vn, { mode: "popLayout", children: on ? l.jsxs(qe.div, { initial: { opacity: 0, y: 16, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.9 }, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 }, className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md", children: [(d === "highlighter" ? hl : fl).map((i, f, b) => {
    const v = (Ue(rt) || "").slice(0, 7).toLowerCase() === i.toLowerCase(), M = 0.03 * (b.length - f);
    return l.jsx(qe.button, { type: "button", "aria-label": `\uC0C9\uC0C1 ${i}`, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: M }, onClick: () => {
      an(false), d === "highlighter" ? k(`${i}ff`) : (x(`${i}ff`), (d === "pan" || d === "eraser" || d === "laser") && oe("pen")), Jn(false);
    }, className: `h-7 w-7 rounded-full border-2 shadow ${v ? "border-sky-300 scale-110" : "border-white/40"}`, style: { backgroundColor: i } }, i);
  }), l.jsx(qe.button, { type: "button", "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1", "aria-pressed": rn, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: 0 }, onClick: () => an((i) => !i), className: `h-7 w-7 rounded-full border-2 shadow ${rn ? "border-sky-300 scale-110" : "border-white/50"}`, style: kl })] }, "haim-color-palette") : null }), l.jsx(vn, { children: on && rn ? l.jsxs(qe.div, { initial: { opacity: 0, x: -6, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 }, transition: { duration: 0.18, ease: Un }, className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md", children: [l.jsx("div", { className: "mb-2 h-8 w-full rounded border border-white/20", style: { ...hs, backgroundColor: rt } }), l.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: l.jsx(cs, { color: yr, onChange: (i) => {
    const f = Ue(i.startsWith("#") ? i : `#${i}`);
    f && (d === "highlighter" ? k(f) : (x(f), (d === "pan" || d === "eraser" || d === "laser") && oe("pen")));
  } }) }), l.jsx(us, { alpha: true, prefixed: true, color: yr, onChange: (i) => {
    const f = Ue(i.startsWith("#") ? i : `#${i}`);
    f && (d === "highlighter" ? k(f) : x(f));
  }, className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white" })] }, "haim-color-picker") : null })] }), l.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), d === "highlighter" ? l.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [l.jsxs("label", { className: "flex items-center gap-0.5", children: [l.jsx("span", { className: "opacity-70", children: "W" }), l.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" }), l.jsx("input", { type: "number", min: Se, max: Te, step: 0.1, value: S, onChange: (i) => L(Xe(K(Number(i.target.value) || 1, Se, Te))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" })] }), l.jsx("span", { className: "opacity-50", "aria-hidden": true, children: "\xD7" }), l.jsxs("label", { className: "flex items-center gap-0.5", children: [l.jsx("span", { className: "opacity-70", children: "H" }), l.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" }), l.jsx("input", { type: "number", min: Se, max: Te, step: 0.1, value: _, onChange: (i) => N(Xe(K(Number(i.target.value) || 1, Se, Te))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" })] }), l.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }) : l.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [l.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), l.jsx("input", { type: "number", min: Se, max: Te, step: 0.1, value: S, onChange: (i) => oo(Number(i.target.value) || 1), className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), l.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }), l.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [l.jsx("span", { className: "opacity-70", children: "\uD750\uB984" }), l.jsx("input", { type: "number", min: 5, max: 100, step: 5, value: Math.round((d === "highlighter" ? z : y) * 100), onChange: (i) => {
    const b = K(Number(i.target.value) || 5, 5, 100) / 100;
    d === "highlighter" ? A(b) : I(b);
  }, className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uD750\uB984 (%)" }), l.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "%" })] }), l.jsxs(ut, { value: ie, onValueChange: (i) => Be(i), children: [l.jsx(dt, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ie === "circle" ? "\uC6D0" : "\uB124\uBAA8", children: ie === "circle" ? l.jsx(Er, { size: 16 }) : l.jsx(Lr, { size: 16 }) }), l.jsx(ft, { container: lt, children: l.jsx(ht, { className: it, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (i) => i.preventDefault(), children: l.jsxs(pt, { className: "p-1", children: [l.jsxs(Me, { value: "circle", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uC6D0", children: [l.jsx(Er, { size: 16 }), l.jsx(je, { className: "sr-only", children: "\uC6D0" })] }), l.jsxs(Me, { value: "square", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uB124\uBAA8", children: [l.jsx(Lr, { size: 16 }), l.jsx(je, { className: "sr-only", children: "\uB124\uBAA8" })] })] }) }) })] }), l.jsxs(ut, { value: ee, onValueChange: (i) => T(i), children: [l.jsx(dt, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ee === "dashed" ? "Dashed" : "Solid", children: ee === "dashed" ? l.jsx(zr, { size: 16 }) : l.jsx(Or, { size: 16 }) }), l.jsx(ft, { container: lt, children: l.jsx(ht, { className: it, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (i) => i.preventDefault(), children: l.jsxs(pt, { className: "p-1", children: [l.jsxs(Me, { value: "solid", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Solid", children: [l.jsx(Or, { size: 16 }), l.jsx(je, { className: "sr-only", children: "Solid" })] }), l.jsxs(Me, { value: "dashed", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Dashed", children: [l.jsx(zr, { size: 16 }), l.jsx(je, { className: "sr-only", children: "Dashed" })] })] }) }) })] }), d === "highlighter" ? l.jsxs(ut, { value: P, onValueChange: (i) => U(i), children: [l.jsx(dt, { className: go, "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC", children: l.jsx(Mn, { placeholder: "Blend" }) }), l.jsx(ft, { container: lt, children: l.jsx(ht, { className: `${it} max-h-56 overflow-auto`, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (i) => i.preventDefault(), children: l.jsx(pt, { className: "p-1", children: Qi.map((i) => l.jsx(Me, { value: i.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: l.jsx(je, { children: i.label }) }, i.value)) }) }) })] }) : null, l.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), l.jsx(X, { label: `\uC2E4\uD589 \uCDE8\uC18C (${pe}+Z)`, disabled: Cn === 0, onClick: kn, children: l.jsx(xa, { size: 16 }) }), l.jsx(X, { label: `\uB2E4\uC2DC \uC2E4\uD589 (${_r})`, disabled: Qa.length === 0, onClick: wn, children: l.jsx(ba, { size: 16 }) }), l.jsx(X, { label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30", disabled: Cn === 0 && V.length === 0, onClick: pn, children: l.jsx(Es, { size: 16 }) }), l.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), l.jsx(X, { label: "\uCD95\uC18C", onClick: () => {
    var _a2;
    const i = (_a2 = Ct.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!i) {
      c((f) => K(f / Ve, Nt, At));
      return;
    }
    Fe(s / Ve, i.left + i.width / 2, i.top + i.height / 2);
  }, children: l.jsx(Ls, { size: 16 }) }), l.jsxs("span", { className: "min-w-10 text-center text-[11px] tabular-nums text-white/80", children: [Math.round(s * 100), "%"] }), l.jsx(X, { label: "\uD655\uB300", onClick: () => {
    var _a2;
    const i = (_a2 = Ct.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!i) {
      c((f) => K(f * Ve, Nt, At));
      return;
    }
    Fe(s * Ve, i.left + i.width / 2, i.top + i.height / 2);
  }, children: l.jsx(Is, { size: 16 }) }), l.jsx(X, { label: "\uBCF4\uAE30 \uCD08\uAE30\uD654", onClick: at, children: l.jsx(Ns, { size: 16 }) }), l.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), l.jsx(X, { label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${pe}+S)`, tone: "save", disabled: !or || Qe, onClick: () => {
    Et("overwrite");
  }, children: l.jsx(As, { size: 16 }) }), l.jsx(X, { label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${pe}+Shift+S)`, tone: "saveAs", disabled: !or || Qe, onClick: () => {
    Et("saveAs");
  }, children: l.jsx($s, { size: 16 }) })] }), l.jsxs("p", { className: "max-w-xl text-center text-[10px] text-white/55", children: ["\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ", pe, "+[ ] / ", pe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ", pe, "+Z / ", _r, Ja ? " \xB7 Ink API" : "", Qe ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""] }), Zn ? l.jsx("p", { className: "max-w-xl text-center text-[10px] text-red-300", children: Zn }) : null] }) }), l.jsx("button", { type: "button", className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80", "aria-label": "\uB2EB\uAE30", onClick: Lt, children: l.jsx(Ps, { size: 20 }) })] }) })] }, "haim-image-lightbox") : null }) }), l.jsx(ps, { isOpen: sn, title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30", cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1", variant: "danger", overlayClassName: "z-100070", onConfirm: io, onCancel: lo })] });
}
function wl({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
  const o = String(e.attrs.src || ""), s = String(e.attrs.alt || ""), c = String(e.attrs.title || ""), u = n.isEditable, [h, d] = p.useState(false), [m, g] = p.useState(null), x = p.useCallback((S) => {
    if (S.detail > 1) return;
    S.preventDefault(), S.stopPropagation();
    const L = typeof r == "function" ? r() : null;
    typeof L == "number" && n.chain().focus().setNodeSelection(L).run();
  }, [n, r]), w = p.useCallback((S) => {
    S.preventDefault(), S.stopPropagation(), o && (g(o), d(true));
  }, [o]), k = p.useCallback(async (S, L) => {
    if (!u) return;
    const _ = await Aa(L), N = typeof r == "function" ? r() : null, y = URL.createObjectURL(L);
    if (S === "overwrite") {
      typeof N == "number" ? n.chain().focus().deleteRange({ from: N, to: N + e.nodeSize }).insertContentAt(N, { type: "wikiImage", attrs: { path: _, options: "", alt: _, width: null, height: null, background: null } }).run() : a({ src: y }), g(y);
      return;
    }
    if (typeof N != "number") return;
    const I = N + e.nodeSize;
    n.chain().focus().insertContentAt(I, { type: "wikiImage", attrs: { path: _, options: "", alt: _, width: null, height: null, background: null } }).run();
  }, [u, n, r, a, e.nodeSize]);
  return l.jsxs(ge, { as: "span", className: `haim-stock-image-wrap${t ? " is-selected" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: x, onDoubleClick: w, children: [l.jsx("img", { src: o, alt: s, ...c ? { title: c } : {}, className: "haim-stock-image max-w-full h-auto cursor-pointer", draggable: false }), l.jsx(Ha, { src: m || o || null, alt: s, open: h, onClose: () => {
    d(false), g(null);
  }, ...u ? { onSaveAnnotated: k } : {} })] });
}
let Hn = null;
function fd(e) {
  Hn = e;
}
function Dn(e) {
  const t = String(e || "").trim().replace(/^\/+/, "");
  return !t || typeof Hn != "function" ? false : (Hn(t), true);
}
function yl(e, t) {
  if (typeof document > "u") return;
  const n = document.createElement("a");
  n.href = e, n.target = t, n.rel = "noopener noreferrer", n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Fr(e, t) {
  const n = String(e || "").trim();
  if (!n) return;
  const r = da(n);
  if (r) {
    Dn(r);
    return;
  }
  if (fa(n)) return;
  const a = String((t == null ? void 0 : t.target) || "_blank").trim(), o = !a || a === "_self" ? "_blank" : a;
  if (va() && ha(n, { target: o })) {
    ms(n);
    return;
  }
  yl(n, o);
}
const Kr = "haim-mod-held";
function Cl(e, t) {
  let n = null;
  if (t.target instanceof HTMLAnchorElement) n = t.target;
  else {
    const r = t.target;
    if (!r) return null;
    n = r.closest("a");
  }
  return !n || !e.view.dom.contains(n) ? null : n;
}
function Sl(e, t, n) {
  const r = wo(e.state, t.name), a = String(r.href || "").trim();
  return a || String(n.getAttribute("href") || n.href || "").trim();
}
function vl() {
  return new He({ key: new Ee("haimLinkModCursor"), view(e) {
    const t = (c) => {
      e.dom.classList.toggle(Kr, c);
    }, n = (c) => {
      t(!!(c.ctrlKey || c.metaKey));
    }, r = (c) => {
      (c.key === "Control" || c.key === "Meta" || c.ctrlKey || c.metaKey) && t(true);
    }, a = (c) => {
      n(c);
    }, o = () => t(false), s = (c) => {
      n(c);
    };
    return window.addEventListener("keydown", r, true), window.addEventListener("keyup", a, true), window.addEventListener("blur", o), e.dom.addEventListener("mousemove", s), { destroy() {
      window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", a, true), window.removeEventListener("blur", o), e.dom.removeEventListener("mousemove", s), e.dom.classList.remove(Kr);
    } };
  } });
}
function Ml(e, t, n, r) {
  if (r.button !== 0) return false;
  const a = Cl(e, r);
  if (!a) return false;
  const o = Sl(n, t, a);
  if (!o) return false;
  const s = da(o), c = gs(), u = r.metaKey || r.ctrlKey;
  if (n.editable) {
    if (r.preventDefault(), !(u || c)) return true;
    if (s) return r.stopPropagation(), Dn(s), true;
    const d = (a.getAttribute("target") || a.target || "_blank").trim();
    return Fr(o, { target: d }), true;
  }
  if (s) return r.preventDefault(), r.stopPropagation(), Dn(s), true;
  if (va()) {
    const h = (a.getAttribute("target") || a.target || "_blank").trim();
    if (ha(o, { target: h })) return r.preventDefault(), r.stopPropagation(), Fr(o, { target: h }), true;
  }
  return false;
}
function jl(e, t) {
  return new He({ key: new Ee("haimLinkClick"), props: { handleDOMEvents: { click: (n, r) => Ml(e, t, n, r) } } });
}
const Tl = ko.extend({ renderHTML({ HTMLAttributes: e }) {
  const t = String(e.href || ""), n = fa(t);
  return ["a", xe(this.options.HTMLAttributes, e, { class: n ? "haim-docuhaim-link" : null }), 0];
}, addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], vl(), jl(this.editor, this.type)];
} }).configure({ openOnClick: false, autolink: true, protocols: ["docuhaim"], HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } });
function Wr(e) {
  if (!e || typeof e != "object") return;
  const t = e;
  t.__haimRawTextPatched || (t.encodeTextForMarkdown = (n) => n, t.escapeMarkdownSyntax = (n) => n, t.__haimRawTextPatched = true);
}
const El = yo.extend({ onBeforeCreate(e) {
  var _a2, _b, _c2;
  (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
  const t = (_b = this.storage) == null ? void 0 : _b.manager;
  t && Wr(t), ((_c2 = this.editor) == null ? void 0 : _c2.markdown) && Wr(this.editor.markdown);
} }), Ll = /^\s*(\[([ xX~]?)\])\s$/, Il = /^\s*[-*+]\s*\[([ xX~])\]\s$/;
function qr(e) {
  return Ma(e === void 0 || e === "" ? " " : e);
}
function Bn(e) {
  const t = mt(e), n = Ht(e);
  return { status: t, checked: t === "done", kind: t === "doing" ? "status" : n };
}
function Ur(e, t, n) {
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
    const g = o.before(c), x = o.index(c), w = u.mapping.map(g), k = u.doc.nodeAt(w);
    if (!k) return null;
    const S = [];
    k.forEach((N, y, I) => {
      const z = I === x ? n : N.type.name === "taskItem" ? Bn(N.attrs) : { status: "todo", checked: false, kind: "check" };
      S.push(r.create(z, N.content, N.marks));
    });
    const L = a.create(k.attrs, S);
    u.replaceWith(w, w + k.nodeSize, L), Sn(u.doc, w) && ((_a2 = u.doc.resolve(w).nodeBefore) == null ? void 0 : _a2.type) === a && u.join(w);
    const _ = u.doc.nodeAt(w);
    if (_) {
      const N = w + _.nodeSize;
      Sn(u.doc, N) && ((_b = u.doc.nodeAt(N)) == null ? void 0 : _b.type) === a && u.join(N);
    }
    return;
  }
  const h = u.doc.resolve(t.from).blockRange(), d = h && vo(h, r, n);
  if (!d) return null;
  u.wrap(h, d);
  const m = u.doc.resolve(t.from - 1).nodeBefore;
  m && m.type === r && Sn(u.doc, t.from - 1) && u.join(t.from - 1);
}
function jn(e, t, n, r) {
  t.dataset.status = n, t.dataset.kind = r, t.dataset.checked = n === "done" ? "true" : "false", e.dataset.status = n, e.dataset.kind = r, e.className = r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", e.checked = n === "done", e.indeterminate = n === "doing", e.setAttribute("aria-checked", n === "doing" ? "mixed" : n === "done" ? "true" : "false"), e.setAttribute("aria-label", r === "status" ? n === "doing" ? "Status task in progress" : n === "done" ? "Status task completed" : "Status task not started" : n === "done" ? "Task completed" : "Task not started");
}
const Nl = Co.extend({ addStorage() {
  return { preferredKind: "check" };
}, addCommands() {
  return { setHaimTaskCheckboxPreferredKind: (e) => () => (this.storage.preferredKind = e === "status" ? "status" : "check", true) };
}, addAttributes() {
  return { kind: { default: "check", keepOnSplit: false, parseHTML: (e) => {
    const t = e.getAttribute("data-kind"), n = e.getAttribute("data-status");
    return Ar(t, n === "todo" || n === "doing" || n === "done" ? n : void 0);
  }, renderHTML: (e) => ({ "data-kind": Ht(e) }) }, status: { default: "todo", keepOnSplit: false, parseHTML: (e) => {
    const t = e.getAttribute("data-status");
    if (t === "todo" || t === "doing" || t === "done") return t;
    const n = e.getAttribute("data-checked");
    return n === "" || n === "true" ? "done" : "todo";
  }, renderHTML: (e) => {
    const t = mt(e);
    return { "data-status": t, "data-checked": t === "done" ? "true" : "false" };
  } }, checked: { default: false, keepOnSplit: false, parseHTML: (e) => {
    const t = e.getAttribute("data-status");
    if (t === "done") return true;
    if (t === "doing" || t === "todo") return false;
    const n = e.getAttribute("data-checked");
    return n === "" || n === "true";
  }, renderHTML: (e) => ({ "data-checked": mt(e) === "done" ? "true" : "false" }) } };
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const n = mt(e.attrs), r = Ht(e.attrs);
  return ["li", xe(this.options.HTMLAttributes, t, { "data-type": this.name, "data-status": n, "data-kind": r, "data-checked": n === "done" ? "true" : "false" }), ["label", ["input", { type: "checkbox", class: r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", checked: n === "done" ? "checked" : null, "data-status": n, "data-kind": r, "aria-checked": n === "doing" ? "mixed" : n === "done" ? "true" : "false" }], ["span"]], ["div", 0]];
}, parseMarkdown: (e, t) => {
  const n = [];
  e.tokens && e.tokens.length > 0 ? n.push(t.createNode("paragraph", {}, t.parseInline(e.tokens))) : e.text ? n.push(t.createNode("paragraph", {}, [t.createNode("text", { text: e.text })])) : n.push(t.createNode("paragraph", {}, [])), e.nestedTokens && e.nestedTokens.length > 0 && n.push(...t.parseChildren(e.nestedTokens));
  const r = e.status === "todo" || e.status === "doing" || e.status === "done" ? e.status : e.checked ? "done" : "todo", a = e.kind === "status" || e.kind === "check" ? Ar(e.kind, r) : r === "doing" ? "status" : "check";
  return t.createNode("taskItem", { status: r, checked: r === "done", kind: a }, n);
}, renderMarkdown: (e, t) => {
  const n = mt(e == null ? void 0 : e.attrs), r = Ht(e == null ? void 0 : e.attrs), o = `- [${yi(n, r)}] `;
  return So(e, t, o);
}, addNodeView() {
  return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
    const a = document.createElement("li"), o = document.createElement("label"), s = document.createElement("input"), c = document.createElement("div");
    let u = e;
    o.contentEditable = "false", s.type = "checkbox";
    const h = (g) => {
      const x = Bn(g.attrs);
      jn(s, a, x.status, x.kind);
    };
    h(e);
    const d = (g) => {
      if (typeof n != "function") return;
      const x = n();
      if (typeof x != "number") return;
      const { state: w, dispatch: k } = r.view, S = w.doc.nodeAt(x);
      !S || S.type !== this.type || k(w.tr.setNodeMarkup(x, void 0, { ...S.attrs, status: g.status, checked: g.checked, kind: g.kind }));
    }, m = (g) => {
      var _a2;
      g.preventDefault(), g.stopPropagation();
      const x = Bn(u.attrs), w = ((_a2 = r.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check";
      if (!r.isEditable && !this.options.onReadOnlyChecked) {
        h(u);
        return;
      }
      const k = wi(x.status, w), S = { status: k, checked: k === "done", kind: w };
      if (r.isEditable) {
        jn(s, a, S.status, S.kind), d(S);
        return;
      }
      this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(u, S.checked) ? jn(s, a, S.status, S.kind) : h(u));
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
    }), { dom: a, contentDOM: c, stopEvent: (g) => {
      const x = g.target;
      return !!(x && o.contains(x));
    }, ignoreMutation: (g) => g.type === "selection" || o.contains(g.target), update: (g) => g.type !== this.type ? false : (u = g, h(g), true) };
  };
}, addInputRules() {
  return [new En({ find: Ll, handler: ({ state: e, range: t, match: n }) => {
    var _a2;
    const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = qr(n[2]);
    return Ur(e, t, { status: a.status, checked: a.checked, kind: r });
  } }), new En({ find: Il, handler: ({ state: e, range: t, match: n }) => {
    var _a2;
    const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = qr(n[1]);
    return Ur(e, t, { status: a.status, checked: a.checked, kind: r });
  } })];
} }), Al = /^\s*[-+*]\s+\[([ xX~])\]\s+/, Vr = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;
function Xr(e) {
  var _a2;
  const t = Ma(e[3]);
  return { indentLevel: ((_a2 = e[1]) == null ? void 0 : _a2.length) ?? 0, mainContent: e[4] ?? "", checked: t.checked, status: t.status, kind: t.kind };
}
function Yr(e, t, n = []) {
  return { type: "taskItem", raw: "", mainContent: e.mainContent, indentLevel: e.indentLevel, checked: e.checked, status: e.status, kind: e.kind, text: e.mainContent, tokens: t.inlineTokens(e.mainContent), nestedTokens: n };
}
const $l = Mo.extend({ markdownTokenizer: { name: "taskList", level: "block", start(e) {
  var _a2;
  const t = (_a2 = e.match(Al)) == null ? void 0 : _a2.index;
  return t !== void 0 ? t : -1;
}, tokenize(e, t, n) {
  const r = (o) => {
    const s = Cr(o, { itemPattern: Vr, extractItemData: Xr, createToken: (c, u) => Yr(c, n, u ?? []), customNestedParser: r }, n);
    if (s) {
      const c = { type: "taskList", raw: s.raw, items: s.items }, u = o.slice(s.raw.length);
      return u.trim() ? [c, ...n.blockTokens(u)] : [c];
    }
    return n.blockTokens(o);
  }, a = Cr(e, { itemPattern: Vr, extractItemData: Xr, createToken: (o, s) => Yr(o, n, s ?? []), customNestedParser: r }, n);
  if (a) return { type: "taskList", raw: a.raw, items: a.items };
} } }), Pl = /^:([a-zA-Z0-9_+-]+):/, Hl = jo.extend({ markdownTokenizer: { name: "emoji", level: "inline", start: (e) => e.indexOf(":"), tokenize: (e) => {
  const t = Pl.exec(e);
  if (!t) return;
  const n = t[1] ?? "", r = $r(n);
  if (r) return { type: "emoji", raw: t[0], emojiName: r };
} }, parseMarkdown: (e, t) => {
  const n = $r((e == null ? void 0 : e.emojiName) || (e == null ? void 0 : e.name));
  if (!n) {
    const r = String((e == null ? void 0 : e.raw) || "");
    return r ? t.createTextNode(r) : null;
  }
  return t.createNode("emoji", { name: n });
} }).configure({ emojis: To, enableEmoticons: true }), Dl = Eo.extend({ name: "nodeRange", addKeyboardShortcuts() {
  var _a2;
  const n = { ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {} };
  return delete n["Shift-ArrowUp"], delete n["Shift-ArrowDown"], n;
} }), Bl = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, Rl = Le.create({ name: "pageBreak", group: "block", atom: true, selectable: true, draggable: true, parseHTML() {
  return [{ tag: "pgbr" }, { tag: "div[data-haim-pgbr]" }, { tag: "div.md-pgbr" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", xe(e, { "data-haim-pgbr": "1", "data-md-pgbr": "1", class: "haim-pgbr md-pgbr" })];
}, markdownTokenizer: { name: "pageBreak", level: "block", start: (e) => {
  const t = /<pgbr\s*\/?\s*>/i.exec(e);
  return t ? t.index : -1;
}, tokenize: (e) => {
  const t = Bl.exec(e);
  if (t) return { type: "pageBreak", raw: t[0] };
} }, parseMarkdown: (e, t) => t.createNode("pageBreak"), renderMarkdown: () => `<pgbr/>

`, addCommands() {
  return { setPageBreak: () => ({ chain: e, state: t }) => {
    const n = t.schema.nodes[this.name];
    if (!n || !Lo(t, n)) return false;
    const { selection: r } = t, { $to: a } = r, o = e();
    return Io(r) ? o.insertContentAt(a.pos, { type: this.name }) : o.insertContent({ type: this.name }), o.command(({ state: s, tr: c, dispatch: u }) => {
      var _a2;
      if (u) {
        const { $to: h } = c.selection, d = h.end();
        if (h.nodeAfter) h.nodeAfter.isTextblock ? c.setSelection(O.create(c.doc, h.pos + 1)) : h.nodeAfter.isBlock ? c.setSelection(ua.create(c.doc, h.pos)) : c.setSelection(O.create(c.doc, h.pos));
        else {
          const g = (_a2 = s.schema.nodes.paragraph || h.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
          g && (c.insert(d, g), c.setSelection(O.create(c.doc, d + 1)));
        }
        c.scrollIntoView();
      }
      return true;
    }).run();
  } };
} }), Vn = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", _l = ["nw", "ne", "sw", "se"];
function Gr(e) {
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
function Qr(e, t, n, r) {
  const a = qn({ path: e, width: t, height: n, background: r }), o = a.indexOf("|");
  if (o < 0) return "";
  const s = a.lastIndexOf("]]");
  return a.slice(o + 1, s >= 0 ? s : void 0).trim();
}
function $t(e) {
  return `${Math.max(24, Math.round(e))}px`;
}
function Ol(e) {
  return e ? e.closest(".overflow-auto") || e.parentElement : null;
}
function zl({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
  var _a2, _b;
  const o = String(e.attrs.path || ""), s = String(e.attrs.options || ""), c = String(e.attrs.alt || o), u = e.attrs.width || null, h = e.attrs.height || null, d = e.attrs.background || null, m = n.isEditable, g = p.useRef(null), x = p.useRef(null), [w, k] = p.useState(false), [S, L] = p.useState(false), [_, N] = p.useState(null), [y, I] = p.useState(null);
  x.current = y;
  const z = p.useMemo(() => y ? { ...Gr(_t({ width: null, height: null, background: d })), width: `${y.width}px`, height: `${y.height}px` } : Gr(_t({ width: u, height: h, background: d })), [u, h, d, y]), A = p.useCallback((T, E) => {
    const D = { width: T, height: E, options: Qr(o, T, E, d) }, H = Ol(n.view.dom), F = (H == null ? void 0 : H.scrollTop) ?? null, V = typeof r == "function" ? r() : null;
    if (typeof V == "number") {
      const ae = n.state.tr.setNodeMarkup(V, void 0, { ...e.attrs, ...D });
      n.view.dispatch(ae);
    } else a(D);
    const le = () => {
      H && F != null && (H.scrollTop = F);
    };
    le(), requestAnimationFrame(le), requestAnimationFrame(() => requestAnimationFrame(le));
  }, [n, r, a, o, d, e.attrs]), P = p.useCallback(() => {
    const T = x.current;
    T && (A($t(T.width), $t(T.height)), I(null), x.current = null);
    const E = typeof r == "function" ? r() : null;
    if (typeof E == "number") {
      const D = E + (e.nodeSize || 1);
      n.commands.setTextSelection(D);
    }
    n.commands.blur();
  }, [A, n, r, e.nodeSize]), U = p.useCallback((T, E) => {
    var _a3, _b2;
    if (!m) return;
    E.preventDefault(), E.stopPropagation();
    const D = g.current;
    if (!D) return;
    const H = D.getBoundingClientRect(), F = H.width, V = H.height, le = E.clientX, ae = E.clientY, Y = V > 0 ? F / V : 1, q = E.pointerId;
    (_b2 = (_a3 = E.target).setPointerCapture) == null ? void 0 : _b2.call(_a3, q);
    const te = { width: F, height: V };
    x.current = te, I(te);
    const ne = (ue) => {
      const ce = ue.clientX - le, be = ue.clientY - ae;
      let Q = F, re = V;
      T.includes("e") && (Q = F + ce), T.includes("w") && (Q = F - ce), T.includes("s") && (re = V + be), T.includes("n") && (re = V - be), Q = Math.max(24, Q), re = Math.max(24, re), (ue.shiftKey || ue.pointerType === "touch") && (Math.abs(ce) >= Math.abs(be) ? re = Q / Y : Q = re * Y, Q = Math.max(24, Q), re = Math.max(24, re));
      const Re = { width: Q, height: re };
      x.current = Re, I(Re);
    }, G = (ue) => {
      var _a4, _b3;
      window.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", G), window.removeEventListener("pointercancel", G);
      try {
        (_b3 = (_a4 = ue.target).releasePointerCapture) == null ? void 0 : _b3.call(_a4, q);
      } catch {
      }
      const ce = x.current;
      ce && A($t(ce.width), $t(ce.height)), x.current = null, I(null);
    };
    window.addEventListener("pointermove", ne), window.addEventListener("pointerup", G), window.addEventListener("pointercancel", G);
  }, [m, A]);
  p.useEffect(() => {
    if (!t || !m || w || S) return;
    const T = (E) => {
      if (E.key !== "Enter") return;
      const D = E.target;
      D instanceof HTMLInputElement || D instanceof HTMLTextAreaElement || D instanceof HTMLElement && D.isContentEditable || (E.preventDefault(), E.stopPropagation(), P());
    };
    return document.addEventListener("keydown", T, true), () => document.removeEventListener("keydown", T, true);
  }, [t, m, w, S, P]);
  const ie = p.useCallback((T) => {
    if (T.detail > 1 || T.target instanceof Element && T.target.closest("[data-resize-handle]")) return;
    T.preventDefault(), T.stopPropagation();
    const E = typeof r == "function" ? r() : null;
    typeof E == "number" && n.chain().focus().setNodeSelection(E).run();
  }, [n, r]), Be = p.useCallback((T) => {
    T.preventDefault(), T.stopPropagation();
    const E = g.current, D = (E == null ? void 0 : E.currentSrc) || (E == null ? void 0 : E.src) || "";
    D && (N(D), L(true));
  }, []), ee = p.useCallback(async (T, E) => {
    if (!m) return;
    const D = await Aa(E), H = typeof r == "function" ? r() : null;
    if (T === "overwrite") {
      const V = { path: D, alt: D, options: Qr(D, u, h, d) };
      typeof H == "number" ? n.view.dispatch(n.state.tr.setNodeMarkup(H, void 0, { ...e.attrs, ...V })) : a(V);
      const le = URL.createObjectURL(E);
      N(le);
      return;
    }
    if (typeof H != "number") return;
    const F = H + e.nodeSize;
    n.chain().focus().insertContentAt(F, { type: "wikiImage", attrs: { path: D, options: "", alt: D, width: null, height: null, background: null } }).run();
  }, [m, n, r, a, u, h, d, e.attrs, e.nodeSize]);
  return l.jsxs(ge, { as: "div", className: `haim-wiki-image-wrap${t ? " is-selected" : ""}${y ? " is-resizing" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: ie, onDoubleClick: Be, onContextMenu: (T) => {
    m && (T.preventDefault(), T.stopPropagation(), k(true));
  }, children: [l.jsxs("div", { className: "haim-wiki-image-frame", children: [l.jsx("img", { ref: g, src: Vn, alt: c, className: "haim-wiki-image", "data-wiki-path": o, ...s ? { "data-wiki-options": s } : {}, ...u ? { "data-wiki-width": u } : {}, ...h ? { "data-wiki-height": h } : {}, ...d ? { "data-wiki-bg": d } : {}, style: z, draggable: false }), t && m ? _l.map((T) => l.jsx("button", { type: "button", className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${T}`, "aria-label": `resize-${T}`, "data-resize-handle": T, onPointerDown: (E) => U(T, E) }, T)) : null] }), l.jsx(Si, { isOpen: w, onClose: () => k(false), path: o, kind: "wiki", initialWidth: u ?? "", initialHeight: h ?? "", imageSrc: ((_a2 = g.current) == null ? void 0 : _a2.currentSrc) || ((_b = g.current) == null ? void 0 : _b.src) || "", onApply: ({ width: T, height: E }) => {
    A(T, E), k(false);
  } }), l.jsx(Ha, { src: _, alt: c, open: S, onClose: () => {
    L(false), N(null);
  }, ...m ? { onSaveAnnotated: ee } : {} })] });
}
function Da(e, t, n = "") {
  const r = t ? xs(t) : null;
  return { path: e, options: t || "", alt: n || e, width: (r == null ? void 0 : r.width) ?? null, height: (r == null ? void 0 : r.height) ?? null, background: (r == null ? void 0 : r.background) ?? null };
}
const Fl = Le.create({ name: "wikiImage", group: "block", atom: true, selectable: true, draggable: true, addAttributes() {
  return { path: { default: "" }, options: { default: "" }, alt: { default: "" }, width: { default: null }, height: { default: null }, background: { default: null } };
}, parseHTML() {
  return [{ tag: "img[data-wiki-path]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const n = e.getAttribute("data-wiki-width"), r = e.getAttribute("data-wiki-height"), a = e.getAttribute("data-wiki-bg"), o = e.getAttribute("data-wiki-options") || [n ? `w=${n}` : "", r ? `h=${r}` : "", a ? `bg=${a}` : ""].filter(Boolean).join(" ");
    return { path: t, options: o, alt: e.getAttribute("alt") || t, width: n || null, height: r || null, background: a || null };
  } }, { tag: "div[data-haim-wiki-image]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const n = e.getAttribute("data-wiki-options") || "";
    return Da(t, n, e.getAttribute("data-wiki-alt") || t);
  } }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const n = String(e.attrs.path || ""), r = String(e.attrs.options || ""), a = String(e.attrs.alt || n), o = e.attrs.width || null, s = e.attrs.height || null, c = e.attrs.background || null, u = _t({ width: o, height: s, background: c });
  return ["img", xe(t, { src: Vn, alt: a, "data-wiki-path": n, ...r ? { "data-wiki-options": r } : {}, ...o ? { "data-wiki-width": o } : {}, ...s ? { "data-wiki-height": s } : {}, ...c ? { "data-wiki-bg": c } : {}, ...u ? { style: u } : {}, class: "haim-wiki-image" })];
}, addNodeView() {
  return Ge(zl);
}, renderMarkdown: (e) => {
  var _a2, _b, _c2, _d, _e;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.path) || "");
  if (!t) return "";
  const n = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c2 = e.attrs) == null ? void 0 : _c2.height) || null, a = ((_d = e.attrs) == null ? void 0 : _d.background) || null;
  if (n || r || a) return `${qn({ path: t, width: n, height: r, background: a })}

`;
  const o = String(((_e = e.attrs) == null ? void 0 : _e.options) || "");
  return o ? `![[${t}|${o}]]

` : `![[${t}]]

`;
} });
function hd(e, t = "", n = "") {
  const r = Da(e, t, n), a = _t({ width: r.width, height: r.height, background: r.background }), o = [`src="${Vn}"`, `alt="${$e(r.alt)}"`, `data-wiki-path="${$e(r.path)}"`, 'class="haim-wiki-image"'];
  return r.options && o.push(`data-wiki-options="${$e(r.options)}"`), r.width && o.push(`data-wiki-width="${$e(r.width)}"`), r.height && o.push(`data-wiki-height="${$e(r.height)}"`), r.background && o.push(`data-wiki-bg="${$e(r.background)}"`), a && o.push(`style="${$e(a)}"`), `<img ${o.join(" ")} />`;
}
function $e(e) {
  return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
const Kl = Le.create({ name: "wikiFigure", group: "block", content: "wikiImage figcaption", defining: true, isolating: true, parseHTML() {
  return [{ tag: "figure[data-haim-wiki-figure]" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figure", xe(e, { "data-haim-wiki-figure": "1", class: "haim-wiki-figure" }), 0];
}, renderMarkdown: (e, t) => {
  const n = Array.isArray(e.content) ? e.content : [], r = n.find((c) => c.type === "wikiImage"), a = n.find((c) => c.type === "figcaption");
  let o = "";
  if (r == null ? void 0 : r.attrs) {
    const c = String(r.attrs.path || "");
    if (c) {
      const u = r.attrs.width || null, h = r.attrs.height || null, d = r.attrs.background || null;
      if (u || h || d) o = qn({ path: c, width: u, height: h, background: d });
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
} }), Wl = Le.create({ name: "figcaption", content: "inline*", defining: true, selectable: false, parseHTML() {
  return [{ tag: "figcaption" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figcaption", xe(e), 0];
}, renderMarkdown: (e, t) => t.renderChildren(e.content || []) }), ql = Le.create({ name: "noteCover", group: "block", atom: true, selectable: true, draggable: false, parseHTML() {
  return [{ tag: "div[data-note-cover-placeholder]", priority: 60 }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", xe(e, { class: "md-note-cover-placeholder md-note-cover-placeholder--pending", "data-note-cover-placeholder": "1", role: "button", tabindex: "0", title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9" }), ["div", { class: "md-note-cover-placeholder__mount", "data-note-cover-mount": "1" }], ["span", { class: "md-note-cover-placeholder__fallback" }, ["span", { class: "md-note-cover-placeholder__spinner", "aria-hidden": "true" }], ["span", { class: "md-note-cover-placeholder__fallback-text" }, "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"]]];
}, renderMarkdown: () => "" });
function pd() {
  return `${Ci()}

`;
}
function Ul(e) {
  const t = getComputedStyle(e), n = t.lineHeight;
  if (n && n !== "normal") {
    const a = Number.parseFloat(n);
    if (Number.isFinite(a) && a > 0) return a;
  }
  const r = Number.parseFloat(t.fontSize);
  return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
}
const Zr = /* @__PURE__ */ new WeakMap();
function Ba(e) {
  const t = getComputedStyle(e), n = `${t.font}|${t.fontSize}|${t.lineHeight}|${t.fontFamily}|${t.fontWeight}`, r = Zr.get(e);
  if (r && r.key === n) return r.value;
  let o = Ul(e);
  try {
    const s = document.createElement("div");
    s.setAttribute("aria-hidden", "true"), s.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", "width:auto", `font:${t.font}`, `font-size:${t.fontSize}`, `font-family:${t.fontFamily}`, `font-weight:${t.fontWeight}`, `font-style:${t.fontStyle}`, `letter-spacing:${t.letterSpacing}`, `line-height:${t.lineHeight}`, "white-space:pre", "padding:0", "margin:0", "border:0"].join(";"), s.textContent = "M", document.body.appendChild(s);
    const c = s.getBoundingClientRect().height || s.offsetHeight;
    s.remove(), c > 0 && (o = c);
  } catch {
  }
  return Zr.set(e, { key: n, value: o }), o;
}
function Vl(e) {
  const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), n = Number.parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : 4;
}
function Ra(e) {
  const t = e.closest("pre");
  if (t) {
    const n = getComputedStyle(t), r = (Number.parseFloat(n.paddingLeft) || 0) + (Number.parseFloat(n.paddingRight) || 0), a = t.clientWidth - r;
    if (a > 0) return a;
  }
  return e.clientWidth;
}
function Xl(e) {
  return e.classList.contains("ProseMirror-trailingBreak");
}
function _a(e) {
  return Array.from(e.querySelectorAll("br")).filter((t) => !Xl(t));
}
function Yl(e) {
  return Math.max(1, _a(e).length + 1);
}
function Gl(e, t) {
  const n = pa(t);
  return e ? Math.max(n, Yl(e)) : n;
}
function Ql(e, t) {
  const n = Array.from(e.getClientRects()).filter((s) => s.height > 0 || s.width > 0);
  if (n.length === 0) return t;
  let r = 1 / 0, a = -1 / 0;
  for (const s of n) r = Math.min(r, s.top), a = Math.max(a, s.bottom);
  const o = a - r;
  return o > 0.5 ? o : t;
}
function Zl(e, t, n, r) {
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
function Jl(e, t, n, r) {
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
function ec(e, t, n) {
  const r = _a(e);
  if (r.length === 0 && t > 1) return null;
  const a = [], o = document.createRange();
  try {
    for (let s = 0; s < t; s += 1) if (Zl(o, e, r, s), o.collapsed) a.push(Jl(e, r, s, n));
    else {
      const c = Ql(o, n);
      a.push(Math.max(c, n * 0.95));
    }
  } catch {
    return null;
  }
  return a.length === t ? a : null;
}
function tc(e, t, n, r) {
  const a = Ra(e);
  if (a <= 0) return Array.from({ length: n }, () => r);
  const s = vi(t, Mi(e), a, Vl(e)).map((c) => Math.max(1, c) * r);
  for (; s.length < n; ) s.push(r);
  return s.slice(0, n);
}
function nc(e, t, n, r) {
  const a = Ra(e);
  if (a <= 0) return Array.from({ length: n }, () => r);
  const o = t.length === 0 ? [""] : String(t).split(`
`);
  for (; o.length < n; ) o.push("");
  o.length > n && (o.length = n);
  const s = getComputedStyle(e), c = s.whiteSpace === "pre" || s.whiteSpace === "nowrap" ? "pre-wrap" : s.whiteSpace || "pre-wrap", u = document.createElement("div");
  u.setAttribute("aria-hidden", "true"), u.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", `width:${a}px`, `font:${s.font}`, `font-size:${s.fontSize}`, `font-family:${s.fontFamily}`, `font-weight:${s.fontWeight}`, `font-style:${s.fontStyle}`, `letter-spacing:${s.letterSpacing}`, `line-height:${s.lineHeight}`, `white-space:${c}`, `overflow-wrap:${s.overflowWrap || "break-word"}`, `word-break:${s.wordBreak || "normal"}`, `tab-size:${s.tabSize || 4}`, "box-sizing:border-box", "padding:0", "margin:0", "border:0"].join(";");
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
function rc(e, t, n) {
  if (n <= 0) return [];
  const r = Ba(e), a = ec(e, n, r);
  return a ? a.map((o) => o > 0 ? o : r) : e.closest("pre") || e.tagName === "PRE" ? nc(e, t, n, r) : tc(e, t, n, r);
}
function Jr(e) {
  return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
}
function ac(e, t) {
  if (e === t) return true;
  if (!e || !t || e.length !== t.length) return false;
  for (let n = 0; n < e.length; n += 1) if (Math.abs((e[n] ?? 0) - (t[n] ?? 0)) > 0.5) return false;
  return true;
}
function Oa({ text: e, className: t, contentRootRef: n }) {
  const r = pa(e), [a, o] = p.useState(r), [s, c] = p.useState(null), [u, h] = p.useState(null);
  p.useLayoutEffect(() => {
    const m = (n == null ? void 0 : n.current) ?? null, g = Jr(m);
    if (!g) {
      o(r), c(null), h(null);
      return;
    }
    let x = 0, w = null;
    const k = () => {
      cancelAnimationFrame(x), x = requestAnimationFrame(() => {
        const N = Jr((n == null ? void 0 : n.current) ?? null);
        if (!N) {
          o(r), c(null), h(null);
          return;
        }
        const y = Gl(N, e), I = Ba(N), z = rc(N, e, y), A = z.length === y && z.every((P) => P > 0) ? z : null;
        o((P) => P === y ? P : y), h((P) => P === I ? P : I), c((P) => ac(P, A) ? P : A);
      });
    };
    k(), w = new ResizeObserver(k), w.observe(g), m && m !== g && w.observe(m);
    const S = g.closest("pre");
    S && S !== g && S !== m && w.observe(S);
    const L = new MutationObserver(k);
    L.observe(g, { subtree: true, childList: true, characterData: true });
    const _ = window.setTimeout(k, 0);
    return window.addEventListener(Tr, k), window.addEventListener("resize", k), () => {
      cancelAnimationFrame(x), window.clearTimeout(_), w == null ? void 0 : w.disconnect(), L.disconnect(), window.removeEventListener(Tr, k), window.removeEventListener("resize", k);
    };
  }, [e, r, n]);
  const d = u != null && u > 0 ? { lineHeight: `${u}px` } : void 0;
  return l.jsx("div", { className: ["haim-line-numbers", t].filter(Boolean).join(" "), style: d, "aria-hidden": true, children: Array.from({ length: a }, (m, g) => {
    const x = s == null ? void 0 : s[g], w = x != null && x > 0 ? { height: x, minHeight: x, maxHeight: x, lineHeight: u != null && u > 0 ? `${Math.min(u, x)}px` : void 0 } : void 0;
    return l.jsx("span", { className: "haim-line-numbers__n", style: w, children: g + 1 }, g);
  }) });
}
function oc(e) {
  const n = bs(String(e || ""))[0];
  return n ? { meta: n.meta ?? ma(), grid: n.grid } : null;
}
function sc(e, t) {
  return `${ks(e)}
${ws(t)}`;
}
function md() {
  const e = ma(), t = { rows: [["", "", ""], ["", "", ""], ["", "", ""]], aligns: [null, null, null] };
  return { meta: e, grid: t, text: sc(e, t) };
}
const ic = "haim-table-edit-request";
function lc(e, t) {
  e.dispatchEvent(new CustomEvent(ic, { detail: t, bubbles: true }));
}
function cc({ node: e, editor: t, selected: n, getPos: r }) {
  const a = String(e.attrs.kind || "raw"), o = String(e.attrs.text || ""), s = t.isEditable, c = p.useRef(null), u = p.useMemo(() => {
    if (a !== "haim-table") return null;
    const d = oc(o);
    return d ? ji(d.grid, d.meta) : null;
  }, [a, o]), h = () => {
    if (!s || a !== "haim-table") return;
    const d = typeof r == "function" ? r() : null;
    typeof d == "number" && lc(t.view.dom, { pos: d, text: o });
  };
  return a === "haim-table" && u ? l.jsx(ge, { as: "div", className: `haim-raw-md haim-raw-md--haim-table${n ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": "haim-table", contentEditable: false, onDoubleClick: (d) => {
    d.preventDefault(), d.stopPropagation(), h();
  }, children: l.jsx("div", { className: "haim-haim-table-preview", dangerouslySetInnerHTML: { __html: u } }) }) : l.jsxs(ge, { as: "div", className: `haim-raw-md${n ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": a, contentEditable: false, children: [l.jsx(Oa, { text: o, className: "haim-raw-md__line-numbers", contentRootRef: c }), l.jsx("pre", { ref: c, className: "haim-raw-md__pre", children: o })] });
}
const uc = Le.create({ name: "rawMarkdownBlock", group: "block", atom: true, selectable: true, code: true, addAttributes() {
  return { text: { default: "" }, kind: { default: "raw" } };
}, parseHTML() {
  return [{ tag: "pre[data-haim-raw-md]", getAttrs: (e) => e instanceof HTMLElement ? { text: e.textContent || "", kind: e.getAttribute("data-kind") || "raw" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["pre", xe(t, { "data-haim-raw-md": "1", "data-kind": String(e.attrs.kind || "raw"), class: "haim-raw-md" }), String(e.attrs.text || "")];
}, addNodeView() {
  return Ge(cc);
}, renderMarkdown: (e) => {
  var _a2;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
  return t ? t.endsWith(`
`) ? t : `${t}
` : "";
} }), dc = Le.create({ name: "deepHeading", group: "block", content: "inline*", defining: true, addAttributes() {
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
  return ["h6", xe(t, { "data-heading-level": String(n), class: `haim-deep-heading haim-h${n}` }), 0];
}, renderMarkdown: (e, t) => {
  var _a2;
  const n = Number((_a2 = e.attrs) == null ? void 0 : _a2.level) || 7, r = "#".repeat(Math.min(10, Math.max(7, n))), a = t.renderChildren(e.content || []);
  return `${r} ${a}

`;
} }), $ = { format: "\uC11C\uC2DD", heading: "\uC81C\uBAA9", block: "\uBE14\uB85D", insert: "\uC0BD\uC785", tool: "\uB3C4\uAD6C" };
function fc(e, t) {
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
function he(e, t) {
  return { id: `heading-${e}`, title: `\uC81C\uBAA9 ${e}`, titleEn: `Heading ${e}`, keywords: [`h${e}`, `heading ${e}`, `heading${e}`, `\uC81C\uBAA9${e}`, `\uC81C\uBAA9 ${e}`, "#".repeat(e)], group: "heading", groupLabel: $.heading, Icon: t, run: ({ editor: n }) => {
    fc(n, e);
  } };
}
const za = [{ id: "bold", title: "\uAD75\uAC8C", titleEn: "Bold", keywords: ["bold", "\uAD75\uAC8C", "\uBCFC\uB4DC", "\uAC15\uC870", "strong"], group: "format", groupLabel: $.format, Icon: Hs, run: ({ editor: e }) => {
  e.chain().focus().toggleBold().run();
} }, { id: "italic", title: "\uAE30\uC6B8\uC784", titleEn: "Italic", keywords: ["italic", "\uAE30\uC6B8\uC784", "\uC774\uD0E4\uB9AD", "em"], group: "format", groupLabel: $.format, Icon: Ds, run: ({ editor: e }) => {
  e.chain().focus().toggleItalic().run();
} }, { id: "underline", title: "\uBC11\uC904", titleEn: "Underline", keywords: ["underline", "\uBC11\uC904", "\uC5B8\uB354\uB77C\uC778"], group: "format", groupLabel: $.format, Icon: Bs, run: ({ editor: e }) => {
  e.chain().focus().toggleUnderline().run();
} }, { id: "strike", title: "\uCDE8\uC18C\uC120", titleEn: "Strikethrough", keywords: ["strike", "strikethrough", "\uCDE8\uC18C\uC120", "\uC0AD\uC81C\uC120"], group: "format", groupLabel: $.format, Icon: Rs, run: ({ editor: e }) => {
  e.chain().focus().toggleStrike().run();
} }, { id: "code", title: "\uC778\uB77C\uC778 \uCF54\uB4DC", titleEn: "Inline code", keywords: ["code", "inline code", "\uC778\uB77C\uC778 \uCF54\uB4DC", "\uCF54\uB4DC"], group: "format", groupLabel: $.format, Icon: _s, run: ({ editor: e }) => {
  e.chain().focus().toggleCode().run();
} }, { id: "subscript", title: "\uC544\uB798 \uCCA8\uC790", titleEn: "Subscript", keywords: ["sub", "subscript", "\uC544\uB798\uCCA8\uC790", "\uC544\uB798 \uCCA8\uC790"], group: "format", groupLabel: $.format, Icon: Os, run: ({ editor: e }) => {
  e.chain().focus().toggleSubscript().run();
} }, { id: "superscript", title: "\uC704 \uCCA8\uC790", titleEn: "Superscript", keywords: ["sup", "superscript", "\uC704\uCCA8\uC790", "\uC704 \uCCA8\uC790"], group: "format", groupLabel: $.format, Icon: zs, run: ({ editor: e }) => {
  e.chain().focus().toggleSuperscript().run();
} }, he(1, ni), he(2, ri), he(3, ai), he(4, oi), he(5, si), he(6, ii), he(7, ct), he(8, ct), he(9, ct), he(10, ct), { id: "paragraph", title: "\uBCF8\uBB38", titleEn: "Paragraph", keywords: ["paragraph", "\uBCF8\uBB38", "\uD14D\uC2A4\uD2B8", "text", "p"], group: "block", groupLabel: $.block, Icon: Ln, run: ({ editor: e }) => {
  e.chain().focus().setParagraph().run();
} }, { id: "bullet-list", title: "\uAE00\uBA38\uB9AC \uAE30\uD638 \uBAA9\uB85D", titleEn: "Bullet list", keywords: ["ul", "unordered", "bullet", "\uBAA9\uB85D", "\uB9AC\uC2A4\uD2B8", "\uAE00\uBA38\uB9AC"], group: "block", groupLabel: $.block, Icon: Fs, run: ({ editor: e }) => {
  e.chain().focus().toggleBulletList().run();
} }, { id: "ordered-list", title: "\uBC88\uD638 \uBAA9\uB85D", titleEn: "Ordered list", keywords: ["ol", "ordered", "numbered", "\uBC88\uD638", "\uBC88\uD638 \uBAA9\uB85D"], group: "block", groupLabel: $.block, Icon: Ks, run: ({ editor: e }) => {
  e.chain().focus().toggleOrderedList().run();
} }, { id: "task-list", title: "\uD560 \uC77C \uBAA9\uB85D", titleEn: "Task list", keywords: ["task", "todo", "checkbox", "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8", "\uD560 \uC77C", "\uCCB4\uD06C\uBC15\uC2A4", "check"], group: "block", groupLabel: $.block, Icon: Ir, run: ({ editor: e }) => {
  e.chain().focus().toggleTaskList().run();
} }, { id: "status-task", title: "\uC0C1\uD0DC \uD560 \uC77C", titleEn: "Status task", keywords: ["status", "doing", "in progress", "\uC9C4\uD589", "\uC0C1\uD0DC", "\uC0C1\uD0DC \uCCB4\uD06C\uBC15\uC2A4", "~"], group: "block", groupLabel: $.block, Icon: Ir, run: ({ editor: e }) => {
  const t = () => {
    e.chain().focus().command(({ tr: n, state: r, dispatch: a }) => {
      if (!a) return false;
      const o = r.selection.$from;
      for (let s = o.depth; s >= 0; s -= 1) if (o.node(s).type.name === "taskItem") return n.setNodeMarkup(o.before(s), void 0, { ...o.node(s).attrs, status: "doing", checked: false, kind: "status" }), a(n), true;
      return false;
    }).run();
  };
  e.isActive("taskList") || e.chain().focus().toggleTaskList().run(), t();
} }, { id: "blockquote", title: "\uC778\uC6A9", titleEn: "Quote", keywords: ["quote", "blockquote", "\uC778\uC6A9"], group: "block", groupLabel: $.block, Icon: Ws, run: ({ editor: e }) => {
  e.chain().focus().toggleBlockquote().run();
} }, { id: "code-block", title: "\uCF54\uB4DC \uBE14\uB85D", titleEn: "Code block", keywords: ["code block", "fence", "\uCF54\uB4DC \uBE14\uB85D", "\uD39C\uC2A4"], group: "block", groupLabel: $.block, Icon: qs, run: ({ editor: e }) => {
  e.chain().focus().toggleCodeBlock().run();
} }, { id: "link", title: "\uB9C1\uD06C", titleEn: "Link", keywords: ["link", "url", "\uB9C1\uD06C", "\uD558\uC774\uD37C\uB9C1\uD06C"], group: "insert", groupLabel: $.insert, Icon: Nr, run: ({ editor: e, app: t }) => {
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
} }, { id: "docuhaim-link", title: "\uB178\uD2B8 \uB9C1\uD06C", titleEn: "Note link", keywords: ["docuhaim", "note link", "\uB178\uD2B8 \uB9C1\uD06C", "vault link", "\uD30C\uC77C \uB9C1\uD06C"], group: "insert", groupLabel: $.insert, Icon: Nr, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onDocuhaimNoteLink) == null ? void 0 : _a2.call(e);
} }, { id: "table", title: "\uD45C", titleEn: "Table", keywords: ["table", "\uD45C", "\uD14C\uC774\uBE14"], group: "insert", groupLabel: $.insert, Icon: Us, run: ({ editor: e }) => {
  e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
} }, { id: "mermaid", title: "Mermaid", titleEn: "Mermaid diagram", keywords: ["mermaid", "diagram", "\uB2E4\uC774\uC5B4\uADF8\uB7A8", "flowchart", "\uADF8\uB798\uD504"], group: "insert", groupLabel: $.insert, Icon: Vs, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertMermaid) {
    t.onInsertMermaid();
    return;
  }
  e.chain().focus().insertContent("```mermaid\ngraph TD\n  A-->B\n```\n", { contentType: "markdown" }).run();
} }, { id: "katex", title: "\uC218\uC2DD", titleEn: "Math / KaTeX", keywords: ["math", "katex", "latex", "\uC218\uC2DD", "\uACF5\uC2DD", "formula"], group: "insert", groupLabel: $.insert, Icon: Xs, run: ({ editor: e, app: t }) => {
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
} }, { id: "page-break", title: "\uD398\uC774\uC9C0 \uB098\uB214", titleEn: "Page break", keywords: ["pgbr", "page break", "\uD398\uC774\uC9C0 \uB098\uB214", "\uC778\uC1C4"], group: "insert", groupLabel: $.insert, Icon: Ys, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertPageBreak) {
    t.onInsertPageBreak();
    return;
  }
  e.chain().focus().setPageBreak().run();
} }, { id: "image-link", title: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C", titleEn: "Image link", keywords: ["image", "\uC774\uBBF8\uC9C0", "wiki image", "\uC774\uBBF8\uC9C0 \uB9C1\uD06C", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: It, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onImageLink) == null ? void 0 : _a2.call(e);
} }, { id: "image-upload", title: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC", titleEn: "Upload image", keywords: ["image", "upload", "\uC774\uBBF8\uC9C0", "\uC5C5\uB85C\uB4DC", "\uC0AC\uC9C4", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: It, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onImageUpload) == null ? void 0 : _a2.call(e);
} }, { id: "image-clip", title: "\uC774\uBBF8\uC9C0 \uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC", titleEn: "Crop & upload image", keywords: ["image", "crop", "clip", "\uC790\uB974\uAE30", "\uD06C\uB86D", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: It, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onImageClip) == null ? void 0 : _a2.call(e);
} }, { id: "whiteboard", title: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30", titleEn: "Create whiteboard", keywords: ["whiteboard", "\uD654\uC774\uD2B8\uBCF4\uB4DC", "\uCE94\uBC84\uC2A4", "canvas", "picture"], group: "insert", groupLabel: $.insert, Icon: It, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onCreateWhiteboard) == null ? void 0 : _a2.call(e);
} }, { id: "qrcode", title: "QRCode \uB9CC\uB4E4\uAE30", titleEn: "Create QR code", keywords: ["qr", "qrcode", "\uD050\uC54C", "\uD050\uC54C\uCF54\uB4DC"], group: "insert", groupLabel: $.insert, Icon: Gs, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onCreateQrCode) == null ? void 0 : _a2.call(e);
} }, { id: "undo", title: "\uC2E4\uD589 \uCDE8\uC18C", titleEn: "Undo", keywords: ["undo", "revoke", "\uC2E4\uD589\uCDE8\uC18C", "\uB418\uB3CC\uB9AC\uAE30"], group: "tool", groupLabel: $.tool, Icon: xa, run: ({ editor: e }) => {
  e.chain().focus().undo().run();
} }, { id: "redo", title: "\uB2E4\uC2DC \uC2E4\uD589", titleEn: "Redo", keywords: ["redo", "next", "\uB2E4\uC2DC\uC2E4\uD589"], group: "tool", groupLabel: $.tool, Icon: ba, run: ({ editor: e }) => {
  e.chain().focus().redo().run();
} }, { id: "heading-remap", title: "\uC81C\uBAA9 \uC218\uC900 \uC7AC\uB9E4\uD551", titleEn: "Remap heading levels", keywords: ["heading remap", "\uC81C\uBAA9 \uBCC0\uACBD", "\uD5E4\uB529", "\uC81C\uBAA9\uB9AC\uB9F5", "\uD5E4\uB529\uB9AC\uB9E4\uD551"], group: "tool", groupLabel: $.tool, Icon: ct, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onHeadingRemap) == null ? void 0 : _a2.call(e);
} }, { id: "checklist-progress", title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", titleEn: "Checklist progress", keywords: ["checklist", "progress", "\uC9C4\uD589\uB960", "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8"], group: "tool", groupLabel: $.tool, Icon: Qs, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onChecklistProgress) == null ? void 0 : _a2.call(e);
} }, { id: "llm-assist", title: "AI \uB3C4\uC6B0\uBBF8", titleEn: "AI assistant", keywords: ["ai", "llm", "gemini", "openai", "\uC778\uACF5\uC9C0\uB2A5", "\uB3C4\uC6B0\uBBF8"], group: "tool", groupLabel: $.tool, Icon: Zs, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onLlmAssist) == null ? void 0 : _a2.call(e);
} }, { id: "export-pdf", title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", titleEn: "Export PDF", keywords: ["export", "pdf", "\uC778\uC1C4", "print", "\uB0B4\uBCF4\uB0B4\uAE30"], group: "tool", groupLabel: $.tool, Icon: Js, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onExportPdf) == null ? void 0 : _a2.call(e);
} }, { id: "find-replace", title: "\uCC3E\uAE30/\uBC14\uAFB8\uAE30", titleEn: "Find and replace", keywords: ["find", "replace", "search", "\uCC3E\uAE30", "\uBC14\uAFB8\uAE30", "\uAC80\uC0C9"], group: "tool", groupLabel: $.tool, Icon: ka, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onFindReplaceToggle) == null ? void 0 : _a2.call(e);
} }, { id: "invisible-chars", title: "\uBE44\uAC00\uC2DC \uBB38\uC790", titleEn: "Invisible characters", keywords: ["invisible", "whitespace", "\uBE44\uAC00\uC2DC", "\uACF5\uBC31", "pilcrow", "\xB6"], group: "tool", groupLabel: $.tool, Icon: ei, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onInvisibleCharsToggle) == null ? void 0 : _a2.call(e);
} }, { id: "toc", title: "\uBAA9\uCC28", titleEn: "Table of contents", keywords: ["toc", "catalog", "\uBAA9\uCC28", "outline"], group: "tool", groupLabel: $.tool, Icon: ti, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onTocToggle) == null ? void 0 : _a2.call(e);
} }];
function ea(e) {
  return e.normalize("NFKC").toLowerCase();
}
function hc(e, t = za) {
  const n = ea(e).trim();
  if (!n) return [...t];
  const r = n.split(/\s+/).filter(Boolean);
  return t.filter((a) => {
    const o = ea([a.id, a.title, a.titleEn, ...a.keywords].join(`
`));
    return r.every((s) => o.includes(s));
  });
}
const pc = p.forwardRef(function({ items: t, command: n }, r) {
  const [a, o] = p.useState(0), s = p.useRef(null), c = p.useRef([]);
  if (p.useEffect(() => {
    o(0);
  }, [t]), p.useLayoutEffect(() => {
    var _a2;
    (_a2 = c.current[a]) == null ? void 0 : _a2.scrollIntoView({ block: "nearest" });
  }, [a, t]), p.useImperativeHandle(r, () => ({ onKeyDown: ({ event: h }) => {
    if (t.length === 0 || h.shiftKey || h.altKey || h.metaKey || h.ctrlKey) return false;
    if (h.key === "ArrowUp") return o((d) => (d + t.length - 1) % t.length), true;
    if (h.key === "ArrowDown") return o((d) => (d + 1) % t.length), true;
    if (h.key === "Enter") {
      const d = t[a];
      return d && n(d), true;
    }
    return false;
  } })), t.length === 0) return l.jsx("div", { className: "w-[min(92vw,300px)] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-muted", role: "listbox", "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839", children: "\uACB0\uACFC \uC5C6\uC74C" });
  let u = "";
  return l.jsx("div", { ref: s, className: "flex max-h-[min(60vh,360px)] w-[min(92vw,300px)] flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface", role: "listbox", "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839", children: t.map((h, d) => {
    const m = h.groupLabel !== u;
    u = h.groupLabel;
    const g = h.Icon, x = d === a;
    return l.jsxs("div", { children: [m ? l.jsx("div", { className: "px-2.5 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-odp-muted", children: h.groupLabel }) : null, l.jsxs("button", { type: "button", ref: (w) => {
      c.current[d] = w;
    }, role: "option", "aria-selected": x, className: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm ${x ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-800 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-bgSoft"}`, onMouseEnter: () => o(d), onClick: () => {
      n(h);
    }, children: [l.jsx(g, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), l.jsx("span", { className: "min-w-0 flex-1 truncate font-medium", children: h.title }), l.jsx("span", { className: "shrink-0 truncate text-xs text-gray-400 dark:text-odp-muted", children: h.titleEn })] })] }, h.id);
  }) });
}), ta = new Ee("haimSlashCommands");
function mc(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n).type.name;
    if (r === "codeBlock" || r === "rawMarkdownBlock") return true;
  }
  return false;
}
function na(e, t) {
  ls.flushSync(() => {
    e.root.render(p.createElement(pc, { ref: (n) => {
      e.listRef.current = n;
    }, items: t.items, command: (n) => {
      t.command(n);
    } }));
  });
}
const gc = De.create({ name: "haimSlashCommands", addStorage() {
  return { getAppActions: () => null };
}, addProseMirrorPlugins() {
  return [No({ pluginKey: ta, editor: this.editor, char: "/", allowSpaces: true, startOfLine: false, allowedPrefixes: [" "], decorationClass: "haim-slash-decoration", placement: "bottom-start", offset: { mainAxis: 6, crossAxis: 0 }, dismissOnOutsideClick: true, floatingUi: { strategy: "fixed" }, initialItems: [...za], allow: ({ state: e, editor: t }) => t.isEditable && !mc(e), items: ({ query: e }) => hc(e), command: ({ editor: e, range: t, props: n }) => {
    var _a2, _b;
    e.chain().focus().deleteRange(t).run();
    const r = ((_b = (_a2 = e.storage.haimSlashCommands) == null ? void 0 : _a2.getAppActions) == null ? void 0 : _b.call(_a2)) ?? null;
    n.run({ editor: e, app: r });
  }, render: () => {
    let e = null;
    return { onStart: (t) => {
      const n = document.createElement("div");
      n.className = "haim-slash-menu-root", n.style.zIndex = "100010";
      const r = { current: null }, a = is.createRoot(n);
      e = { el: n, root: a, listRef: r, unmountFloating: null }, na(e, t), e.unmountFloating = t.mount(n);
    }, onUpdate: (t) => {
      e && na(e, t);
    }, onKeyDown: (t) => {
      var _a2;
      return t.event.key === "Escape" ? (Ao(t.view, ta), true) : ((_a2 = e == null ? void 0 : e.listRef.current) == null ? void 0 : _a2.onKeyDown(t)) ?? false;
    }, onExit: () => {
      var _a2;
      const t = e;
      e = null, (_a2 = t == null ? void 0 : t.unmountFloating) == null ? void 0 : _a2.call(t), (t == null ? void 0 : t.root) && queueMicrotask(() => {
        t.root.unmount();
      });
    } };
  } })];
} });
function xc(e, t) {
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
function Tn(e) {
  for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
  return -1;
}
function bc(e, t, n, r) {
  const a = Tn(t);
  if (a < 0) return null;
  const o = n === "down" ? 1 : -1, s = n === "down" ? t.after(a) : t.before(a);
  let c;
  try {
    c = O.near(t.doc.resolve(Math.max(0, Math.min(t.doc.content.size, s))), o).head;
  } catch {
    return null;
  }
  const u = t.doc.resolve(c);
  if (Tn(u) === a) {
    const h = u.before(Tn(u)), d = t.before(a);
    if (h === d) return null;
  }
  try {
    const h = e.coordsAtPos(c), d = (h.top + h.bottom) / 2, m = e.posAtCoords({ left: r, top: d });
    if (m && m.pos !== t.pos) return m.pos;
  } catch {
  }
  return c !== t.pos ? c : null;
}
function ra(e, t) {
  const { state: n } = e, { selection: r, doc: a } = n, o = t === "down" ? 1 : -1;
  let s = r.anchor, c = r.head;
  if (r instanceof ua) {
    const x = O.near(a.resolve(t === "down" ? r.to : r.from), o);
    s = x.anchor, c = x.head;
  }
  let u;
  try {
    u = e.coordsAtPos(c);
  } catch {
    u = { left: 0, top: 0, bottom: 22 };
  }
  const h = xc(e, c), d = u.left;
  let m = c;
  const g = [0.2, 0.55, 1, 1.5, 2, 2.75, 3.5];
  for (const x of g) {
    const w = t === "down" ? u.bottom + Math.max(2, h * x) : u.top - Math.max(2, h * x);
    let k = null;
    try {
      k = e.posAtCoords({ left: d, top: w });
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
    const x = bc(e, a.resolve(c), t, d);
    x != null && (m = x);
  }
  if (m === c) {
    const x = Math.max(1, Math.min(a.content.size, c + o));
    if (x !== c) try {
      m = O.near(a.resolve(x), o).head;
    } catch {
      return false;
    }
  }
  if (m = Math.max(0, Math.min(a.content.size, m)), m === c) return false;
  try {
    const x = n.tr.setSelection(O.create(a, s, m));
    return x.scrollIntoView(), e.dispatch(x), true;
  } catch {
    try {
      const x = O.near(a.resolve(m), o), w = n.tr.setSelection(O.create(a, s, x.head));
      return w.scrollIntoView(), e.dispatch(w), true;
    } catch {
      return false;
    }
  }
}
const kc = De.create({ name: "haimShiftArrowSelect", priority: 1e3, addKeyboardShortcuts() {
  return { "Shift-ArrowDown": ({ editor: e }) => ra(e.view, "down"), "Shift-ArrowUp": ({ editor: e }) => ra(e.view, "up") };
} });
function wc(e) {
  for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
  return -1;
}
function yc(e, t) {
  const { state: n } = e, r = n.schema.nodes.paragraph;
  if (!r) return false;
  const a = n.selection.$head, o = wc(a);
  if (o < 0) return false;
  const s = a.before(o), c = r.createAndFill();
  if (!c) return false;
  let u = n.tr.insert(s, c);
  try {
    u = u.setSelection(O.near(u.doc.resolve(s + 1)));
  } catch {
    return false;
  }
  return u.scrollIntoView(), (0, e.dispatch)(u), true;
}
const Cc = De.create({ name: "haimInsertLineAbove", priority: 1e3, addKeyboardShortcuts() {
  return { "Mod-Shift-Enter": ({ editor: e }) => yc(e.view) };
} }), Pt = /[\p{L}\p{N}_]/u;
function Fa(e, t) {
  try {
    const n = e.resolve(t);
    if (!n.parent.isTextblock) return null;
    const r = n.start(), a = n.parent.textContent;
    if (!a) return null;
    let o = Math.max(0, Math.min(a.length, t - r)), s = o;
    if (s > 0 && (s >= a.length || !Pt.test(a[s])) && (s = o - 1), s < 0 || s >= a.length || !Pt.test(a[s])) return null;
    let c = s, u = s + 1;
    for (; c > 0 && Pt.test(a[c - 1]); ) c -= 1;
    for (; u < a.length && Pt.test(a[u]); ) u += 1;
    return { from: r + c, to: r + u };
  } catch {
    return null;
  }
}
function Sc(e) {
  const t = [];
  return e.descendants((n, r) => n.isTextblock ? (t.length > 0 && t.push({ pos: -1, ch: `
` }), n.forEach((a, o) => {
    if (a.isText && a.text) {
      const s = r + 1 + o;
      for (let c = 0; c < a.text.length; c += 1) t.push({ pos: s + c, ch: a.text[c] });
    } else a.isText || t.push({ pos: -1, ch: "\0" });
  }), false) : true), t;
}
function Ka(e, t, n = 1e3) {
  if (!t) return [];
  const r = Sc(e);
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
    !g && d && m && d.pos >= 0 && m.pos >= 0 && s.push({ from: d.pos, to: m.pos + 1 }), c = u + Math.max(1, o.length);
  }
  return s;
}
function vc(e, t, n, r, a) {
  const o = Ka(e, t);
  if (!o.length) return null;
  const s = (h) => r.some((d) => d.from === h.from && d.to === h.to), c = (h) => {
    if (!a) return true;
    const d = Fa(e, h.from);
    return !!(d && d.from === h.from && d.to === h.to);
  }, u = o.find((h) => h.from >= n && !s(h) && c(h));
  return u || (o.find((h) => !s(h) && c(h)) ?? null);
}
function Dt(e, t) {
  if (t.from >= t.to) return "";
  try {
    return e.textBetween(t.from, t.to, `
`);
  } catch {
    return "";
  }
}
const Pe = new Ee("haimMultiCursor"), gt = { ranges: [], mainIndex: 0, query: null, wholeWord: false }, Xn = "set", Rn = "clear";
function me(e) {
  return Pe.getState(e) ?? gt;
}
function Mc(e, t) {
  const n = [];
  for (const a of e) {
    const o = t.map(a.from, 1), s = t.map(a.to, -1);
    o <= s && n.push({ from: o, to: s });
  }
  n.sort((a, o) => a.from - o.from || a.to - o.to);
  const r = [];
  for (const a of n) {
    const o = r[r.length - 1];
    o && a.from <= o.to ? o.to = Math.max(o.to, a.to) : r.push({ ...a });
  }
  return r;
}
function jc(e, t) {
  if (t.ranges.length <= 1) return Sr.empty;
  const n = t.ranges[t.mainIndex], r = [];
  for (let a = 0; a < t.ranges.length; a += 1) {
    const o = t.ranges[a];
    n && o.from === n.from && o.to === n.to || (o.from === o.to ? r.push(vr.widget(o.from, () => {
      const s = document.createElement("span");
      return s.className = "haim-multi-cursor", s.setAttribute("aria-hidden", "true"), s;
    }, { side: -1 })) : r.push(vr.inline(o.from, o.to, { class: "haim-multi-selection" })));
  }
  return Sr.create(e, r);
}
function _n(e, t, n, r) {
  const a = t.map((m, g) => ({ r: m, i: g })).sort((m, g) => g.r.from - m.r.from || g.r.to - m.r.to);
  let o = e.tr;
  const s = [];
  for (const { r: m, i: g } of a) o = o.insertText(n, m.from, m.to), s.push({ i: g, from: m.from, to: m.from + n.length });
  s.sort((m, g) => m.from - g.from);
  const c = s.map((m) => ({ from: m.from, to: m.to })), u = Math.max(0, s.findIndex((m) => m.i === r)), h = c[u] ?? c[0];
  if (h) try {
    o = o.setSelection(O.create(o.doc, h.from, h.to));
  } catch {
  }
  const d = { ranges: c, mainIndex: u >= 0 ? u : 0, query: me(e).query, wholeWord: me(e).wholeWord };
  return o.setMeta(Pe, { type: Xn, state: d }), o.scrollIntoView(), o;
}
function aa(e, t) {
  const n = me(e.state);
  if (n.ranges.length <= 1) return false;
  if (n.ranges.some((o) => o.from !== o.to)) return e.dispatch(_n(e.state, n.ranges, "", n.mainIndex)), true;
  const a = [];
  for (const o of n.ranges) if (t === "backward") {
    if (o.from <= 1) {
      a.push(o);
      continue;
    }
    try {
      const s = e.state.doc.resolve(o.from), c = Math.max(s.start(), o.from - 1);
      a.push({ from: c, to: o.from });
    } catch {
      a.push(o);
    }
  } else try {
    const s = e.state.doc.resolve(o.from), c = Math.min(s.end(), o.from + 1);
    a.push({ from: o.from, to: c });
  } catch {
    a.push(o);
  }
  return e.dispatch(_n(e.state, a, "", n.mainIndex)), true;
}
function On(e, t, n = true) {
  const r = t.ranges[t.mainIndex] ?? t.ranges[0];
  let a = e.tr;
  if (r) try {
    a = a.setSelection(O.create(a.doc, r.from, r.to));
  } catch {
  }
  return a.setMeta(Pe, { type: Xn, state: t }), n && a.scrollIntoView(), a;
}
function Tc(e, t) {
  const n = me(e), { selection: r } = e, a = { from: r.from, to: r.to };
  let o, s;
  if (n.ranges.length > 0 ? (o = n.ranges.map((x, w) => w === n.mainIndex ? a : { ...x }), s = n.mainIndex) : (o = [a], s = 0), o.some((x) => x.from === x.to)) {
    const x = o.map((S) => S.from !== S.to ? S : Fa(e.doc, S.from) ?? S);
    if (x.every((S, L) => S.from === o[L].from && S.to === o[L].to)) return false;
    const w = Dt(e.doc, x[0]);
    return t && t(On(e, { ranges: x, mainIndex: s, query: w, wholeWord: true })), true;
  }
  const u = n.query ?? Dt(e.doc, o[0]);
  if (!u || o.some((x) => Dt(e.doc, x) !== u)) return false;
  const h = o[o.length - 1], d = vc(e.doc, u, h.to, o, n.wholeWord);
  if (!d) return false;
  const m = [...o, d], g = { ranges: m, mainIndex: m.length - 1, query: u, wholeWord: n.wholeWord };
  return t && t(On(e, g)), true;
}
function Ec(e, t) {
  if (me(e).ranges.length > 1) return false;
  const { selection: r } = e;
  if (r.empty) return false;
  const a = Dt(e.doc, { from: r.from, to: r.to });
  if (!a) return false;
  const o = Ka(e.doc, a);
  if (o.length <= 1) return false;
  let s = o.findIndex((u) => u.from === r.from && u.to === r.to);
  return s < 0 && (s = 0), t && t(On(e, { ranges: o, mainIndex: s, query: a, wholeWord: false })), true;
}
function Lc() {
  return new He({ key: Pe, state: { init: () => gt, apply(e, t) {
    const n = e.getMeta(Pe);
    if ((n == null ? void 0 : n.type) === Rn) return gt;
    if ((n == null ? void 0 : n.type) === Xn) return n.state;
    if (t.ranges.length === 0) return t;
    let r = t;
    if (e.docChanged) {
      const a = Mc(t.ranges, e.mapping);
      if (a.length === 0) return gt;
      const o = Math.min(t.mainIndex, a.length - 1);
      r = { ...t, ranges: a, mainIndex: o };
    }
    if (e.selectionSet) {
      const { from: a, to: o } = e.selection, s = r.ranges.findIndex((c) => c.from === a && c.to === o);
      return s >= 0 ? { ...r, mainIndex: s } : gt;
    }
    return r;
  } }, props: { decorations(e) {
    return jc(e.doc, me(e));
  }, handleTextInput(e, t, n, r) {
    const a = me(e.state);
    return a.ranges.length <= 1 ? false : (e.dispatch(_n(e.state, a.ranges, r, a.mainIndex)), true);
  }, handleKeyDown(e, t) {
    return me(e.state).ranges.length <= 1 ? false : t.key === "Backspace" ? (t.preventDefault(), aa(e, "backward")) : t.key === "Delete" ? (t.preventDefault(), aa(e, "forward")) : false;
  }, handleClick(e) {
    return me(e.state).ranges.length <= 1 || e.dispatch(e.state.tr.setMeta(Pe, { type: Rn })), false;
  } } });
}
const Ic = De.create({ name: "haimMultiCursor", priority: 1e3, addCommands() {
  return { selectNextOccurrence: () => ({ state: e, dispatch: t }) => Tc(e, t), selectAllOccurrences: () => ({ state: e, dispatch: t }) => Ec(e, t), clearMultiCursor: () => ({ tr: e, dispatch: t }) => (t && (e.setMeta(Pe, { type: Rn }), t(e)), true) };
}, addKeyboardShortcuts() {
  return { "Mod-d": ({ editor: e }) => e.commands.selectNextOccurrence(), "Mod-Shift-l": ({ editor: e }) => e.commands.selectAllOccurrences(), Escape: ({ editor: e }) => me(e.state).ranges.length <= 1 ? false : e.commands.clearMultiCursor() };
}, addProseMirrorPlugins() {
  return [Lc()];
} }), Nc = new Ee("haimSelectionInlineCode");
function Ac(e) {
  const { $from: t, $to: n } = e.state.selection;
  return t.parent.type.name === "codeBlock" || n.parent.type.name === "codeBlock";
}
function $c(e, t, n) {
  return t.defaultPrevented || t.isComposing || !Ti(t) || e.state.selection.empty || e.state.selection.$from.pos === e.state.selection.$to.pos || Ac(e) || !e.state.schema.marks.code ? false : n();
}
const Pc = De.create({ name: "haimSelectionInlineCode", priority: 1e3, addProseMirrorPlugins() {
  const e = this.editor;
  return [new He({ key: Nc, props: { handleKeyDown(t, n) {
    return $c(t, n, () => e.commands.toggleCode());
  } } })];
} }), Hc = Le.create({ name: "mathBlock", group: "block", atom: true, code: true, addAttributes() {
  return { latex: { default: "" }, display: { default: true } };
}, parseHTML() {
  return [{ tag: "div[data-haim-math]", getAttrs: (e) => e instanceof HTMLElement ? { latex: e.getAttribute("data-latex") || e.textContent || "", display: e.getAttribute("data-display") !== "false" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["div", xe(t, { "data-haim-math": "1", "data-latex": String(e.attrs.latex || ""), "data-display": e.attrs.display ? "true" : "false", class: "haim-math-block" }), String(e.attrs.latex || "")];
}, renderMarkdown: (e) => {
  var _a2, _b;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.latex) || "").trim();
  return t ? ((_b = e.attrs) == null ? void 0 : _b.display) ? `$$
${t}
$$

` : `$${t}$

` : "";
} });
function oa({ label: e, onClick: t, children: n }) {
  return l.jsxs(Ft, { children: [l.jsx(Kt, { asChild: true, children: l.jsx("button", { type: "button", className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft", "aria-label": e, onClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, children: n }) }), l.jsx(Wt, { children: l.jsxs(qt, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [e, l.jsx(Ut, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Wa(e, t) {
  const [n, r] = p.useState(null), [a, o] = p.useState(false);
  return p.useEffect(() => {
    const s = String(e || "").trim();
    if (!s) {
      r(null), o(false);
      return;
    }
    try {
      const c = Ei.renderToString(s, { throwOnError: false, displayMode: t, output: "html" });
      r(c), o(false);
    } catch {
      r(null), o(true);
    }
  }, [e, t]), { html: n, error: a };
}
function Dc({ node: e, updateAttributes: t, editor: n, selected: r }) {
  const a = String(e.attrs.latex || ""), o = n.isEditable, [s, c] = p.useState(false), [u, h] = p.useState(a), d = p.useRef(null), { html: m, error: g } = Wa(a, true);
  p.useEffect(() => {
    h(a);
  }, [a]), p.useEffect(() => {
    var _a2;
    s && ((_a2 = d.current) == null ? void 0 : _a2.focus());
  }, [s]);
  const x = () => {
    const k = u.trim();
    t({ latex: k || a }), c(false);
  }, w = () => {
    h(a), c(false);
  };
  return s && o ? l.jsxs(ge, { as: "div", className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`, "data-type": "block-math", contentEditable: false, children: [l.jsx("textarea", { ref: d, className: "haim-math-block__textarea", value: u, rows: Math.min(8, Math.max(2, u.split(`
`).length + 1)), onChange: (k) => h(k.target.value), onBlur: x, onKeyDown: (k) => {
    k.key === "Escape" && (k.preventDefault(), w()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), x()), k.stopPropagation();
  }, spellCheck: false }), l.jsx(bt, { delayDuration: 250, skipDelayDuration: 0, children: l.jsx("div", { className: "haim-math-block__toolbar", children: l.jsx(oa, { label: "\uBBF8\uB9AC\uBCF4\uAE30", onClick: x, children: l.jsx(wa, { size: 14, "aria-hidden": true }) }) }) })] }) : l.jsxs(ge, { as: "div", className: `haim-math-block${r ? " is-selected" : ""}${g ? " haim-math-block--error" : ""}`, "data-type": "block-math", "data-latex": a, contentEditable: false, onDoubleClick: () => {
    o && c(true);
  }, children: [l.jsx(bt, { delayDuration: 250, skipDelayDuration: 0, children: o ? l.jsx("div", { className: "haim-math-block__toolbar", children: l.jsx(oa, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => c(true), children: l.jsx(ya, { size: 14, "aria-hidden": true }) }) }) : null }), m ? l.jsx("div", { className: "haim-math-block__render", dangerouslySetInnerHTML: { __html: m } }) : l.jsx("div", { className: "haim-math-block__fallback", children: a || "\u2026" })] });
}
function Bc({ node: e, updateAttributes: t, editor: n, selected: r }) {
  const a = String(e.attrs.latex || ""), o = n.isEditable, [s, c] = p.useState(false), [u, h] = p.useState(a), d = p.useRef(null), { html: m, error: g } = Wa(a, false);
  p.useEffect(() => {
    h(a);
  }, [a]), p.useEffect(() => {
    var _a2;
    s && ((_a2 = d.current) == null ? void 0 : _a2.focus());
  }, [s]);
  const x = () => {
    const k = u.trim();
    t({ latex: k || a }), c(false);
  }, w = () => {
    h(a), c(false);
  };
  return s && o ? l.jsx(ge, { as: "span", className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`, "data-type": "inline-math", contentEditable: false, children: l.jsx("input", { ref: d, type: "text", className: "haim-math-inline__input", value: u, onChange: (k) => h(k.target.value), onBlur: x, onKeyDown: (k) => {
    k.key === "Enter" && (k.preventDefault(), x()), k.key === "Escape" && (k.preventDefault(), w()), k.stopPropagation();
  }, spellCheck: false }) }) : l.jsx(ge, { as: "span", className: `haim-math-inline${r ? " is-selected" : ""}${g ? " haim-math-inline--error" : ""}`, "data-type": "inline-math", "data-latex": a, contentEditable: false, onDoubleClick: (k) => {
    k.preventDefault(), k.stopPropagation(), o && c(true);
  }, children: m ? l.jsx("span", { dangerouslySetInnerHTML: { __html: m } }) : l.jsx("span", { className: "haim-math-inline__fallback", children: a || "?" }) });
}
const Rc = $o.extend({ addNodeView() {
  return Ge(Dc);
} }).configure({ katexOptions: { throwOnError: false, displayMode: true } }), _c = Po.extend({ addNodeView() {
  return Ge(Bc);
} }).configure({ katexOptions: { throwOnError: false, displayMode: false } }), Xt = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"', "`": "`" }, Oc = /* @__PURE__ */ new Set(["js", "javascript", "jsx", "mjs", "cjs", "ts", "typescript", "tsx"]), qa = new Set(Object.values(Xt)), zc = new Ee("haimCodeBlockBracketPairs");
function Ye(e, t) {
  return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
}
function zn(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
}
function Fn(e) {
  return Oc.has(String(e || "").trim().toLowerCase());
}
function Ua(e) {
  const { $from: t, $to: n } = e.selection;
  return t.parent.type.name !== "codeBlock" || n.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === n.before(n.depth);
}
function Fc(e) {
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
  const { key: t, code: n } = e;
  return t === "`" || n === "Backquote" && !e.shiftKey ? "`" : t in Xt || qa.has(t) ? t : n === "Quote" ? e.shiftKey ? '"' : "'" : null;
}
function sa(e) {
  return e ? /[\w$]/.test(e) : false;
}
function Kc(e, t) {
  const { from: n } = e.selection, r = Ye(e, n - 1), a = Ye(e, n);
  return !(sa(r) || sa(a) || a === t);
}
function Wc(e, t) {
  if (!Ua(e) || t === "`" && !Fn(zn(e))) return null;
  const { selection: n } = e, { from: r, to: a, empty: o } = n, s = Xt[t];
  if (s !== void 0) {
    if (!o) {
      const u = e.doc.textBetween(r, a), h = e.tr.insertText(`${t}${u}${s}`, r, a);
      return h.setSelection(O.create(h.doc, r + t.length, r + t.length + u.length)), h;
    }
    if ((t === "'" || t === '"' || t === "`") && !Kc(e, t)) return Ye(e, r) === t ? e.tr.setSelection(O.create(e.doc, r + 1)) : null;
    const c = e.tr.insertText(`${t}${s}`, r, a);
    return c.setSelection(O.create(c.doc, r + t.length)), c;
  }
  return qa.has(t) && o && Ye(e, r) === t ? t === "`" && !Fn(zn(e)) ? null : e.tr.setSelection(O.create(e.doc, r + 1)) : null;
}
function qc(e) {
  if (!Ua(e)) return null;
  const { selection: t } = e;
  if (!t.empty) return null;
  const { from: n } = t, r = Ye(e, n - 1), a = Ye(e, n), o = Xt[r];
  return !o || a !== o || r === "`" && !Fn(zn(e)) ? null : e.tr.delete(n - 1, n + 1);
}
function Uc(e, t) {
  if (t.defaultPrevented) return false;
  if (t.key === "Backspace") {
    if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
    const a = qc(e.state);
    return a ? (e.dispatch(a), true) : false;
  }
  const n = Fc(t);
  if (!n) return false;
  const r = Wc(e.state, n);
  return r ? (e.dispatch(r), true) : false;
}
function Vc() {
  return new He({ key: zc, props: { handleKeyDown(e, t) {
    return Uc(e, t);
  } } });
}
function Xc(e) {
  var _a2;
  return ((_a2 = String(e ?? "").match(/^[ \t]*/)) == null ? void 0 : _a2[0]) ?? "";
}
function zt(e) {
  return /^[ \t]*$/.test(String(e ?? ""));
}
function Va(e) {
  const t = String(e ?? "").split(`
`);
  return t.length < 2 ? false : zt(t[t.length - 1]) && zt(t[t.length - 2]);
}
function Yt(e) {
  const t = String(e ?? "").split(`
`);
  let n = 0, r = t.length;
  for (; n < r && zt(t[n]); ) n += 1;
  for (; r > n && zt(t[r - 1]); ) r -= 1;
  return t.slice(n, r).join(`
`);
}
function Yc(e, t) {
  const n = String(e ?? ""), r = Math.max(0, Math.min(t, n.length)), a = n.lastIndexOf(`
`, r - 1) + 1, o = n.indexOf(`
`, r), s = n.slice(a, o === -1 ? n.length : o);
  return Xc(s);
}
function Gt(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function Gc(e) {
  if (!Gt(e)) return null;
  const { $from: t, from: n, to: r } = e.selection, a = t.parent.textContent, s = `
${Yc(a, t.parentOffset)}`, c = e.tr.insertText(s, n, r);
  return c.setSelection(O.create(c.doc, n + s.length)), c;
}
function Qc(e) {
  if (!Gt(e)) return null;
  const { $from: t } = e.selection, n = t.parent.textContent, r = t.parentOffset, a = n.lastIndexOf(`
`, r - 1) + 1, o = t.start() + a, s = e.tr.insertText(`
`, o);
  return s.setSelection(O.create(s.doc, o)), s;
}
function Zc(e) {
  if (!Gt(e)) return null;
  const { $from: t, empty: n } = e.selection;
  if (!n || !(t.parentOffset === t.parent.nodeSize - 2)) return null;
  const a = t.parent.textContent;
  if (!Va(a)) return null;
  const o = Yt(a), s = t.start(), c = t.end(), u = e.tr.insertText(o, s, c);
  return u.setSelection(O.create(u.doc, s + o.length)), u;
}
function Jc(e, t) {
  const { $from: n, empty: r } = t.selection;
  if (!r || n.parent.type.name !== "codeBlock" || n.parentOffset !== n.parent.nodeSize - 2) return false;
  const a = n.parent.textContent;
  if (!Va(a)) return false;
  const o = Yt(a), s = n.start(), c = n.end();
  return e.insertText(o, s, c), e.setSelection(O.create(e.doc, s + o.length)), true;
}
function eu(e) {
  const { state: t } = e;
  if (!Gt(t)) return false;
  if (Zc(t)) return e.chain().command(({ tr: r, state: a }) => Jc(r, a)).exitCode().run();
  const n = Gc(t);
  return n ? (e.view.dispatch(n), true) : false;
}
function tu(e) {
  const t = Qc(e.state);
  return t ? (e.view.dispatch(t), true) : false;
}
const nu = new Ee("haimCodeBlockIndent");
function ru(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
}
function Yn(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function Gn(e, t, n) {
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
function ia(e, t) {
  var _a2;
  const n = ((_a2 = e.match(/^ */)) == null ? void 0 : _a2[0]) ?? "";
  return Math.min(n.length, t);
}
function au(e, t) {
  if (!Yn(e)) return null;
  const n = Math.max(1, Math.round(t)), r = " ".repeat(n), { selection: a } = e, { from: o, to: s, empty: c } = a;
  if (c) {
    const g = e.tr.insertText(r, o);
    return g.setSelection(O.create(g.doc, o + r.length)), g;
  }
  const u = Gn(e, o, s);
  if (u.length === 0) return null;
  const h = e.tr;
  for (let g = u.length - 1; g >= 0; g -= 1) h.insertText(r, u[g]);
  const d = u[0], m = h.mapping.map(s);
  return h.setSelection(O.create(h.doc, d, m)), h;
}
function ou(e, t) {
  var _a2;
  if (!Yn(e)) return null;
  const n = Math.max(1, Math.round(t)), { selection: r, doc: a } = e, { $from: o, empty: s } = r;
  if (s) {
    const y = o.start(), I = o.end(), A = a.textBetween(y, I, `
`, `
`).split(`
`), P = o.pos - y;
    let U = 0, ie = 0;
    for (let H = 0; H < A.length; H += 1) {
      const F = A[H] ?? "";
      if (ie + F.length >= P) {
        U = H;
        break;
      }
      ie += F.length + 1, H === A.length - 1 && (U = H);
    }
    const Be = A[U] ?? "", ee = ia(Be, n);
    if (ee === 0) return e.tr;
    let T = y;
    for (let H = 0; H < U; H += 1) T += (((_a2 = A[H]) == null ? void 0 : _a2.length) ?? 0) + 1;
    const E = e.tr.delete(T, T + ee);
    return o.pos - T <= ee ? E.setSelection(O.create(E.doc, T)) : E.setSelection(O.create(E.doc, o.pos - ee)), E;
  }
  const { from: c, to: u } = r, h = Gn(e, c, u);
  if (h.length === 0) return null;
  const d = o.start(), m = o.end(), x = a.textBetween(d, m, `
`, `
`).split(`
`), w = /* @__PURE__ */ new Map();
  {
    let y = d;
    for (let I = 0; I < x.length; I += 1) {
      const z = x[I] ?? "";
      w.set(y, z), y += z.length + (I < x.length - 1 ? 1 : 0);
    }
  }
  const k = e.tr;
  let S = 0, L = 0;
  for (let y = h.length - 1; y >= 0; y -= 1) {
    const I = h[y], z = w.get(I) ?? "", A = ia(z, n);
    A !== 0 && (k.delete(I, I + A), L += A, I < c && (S += A));
  }
  if (L === 0) return k;
  const _ = Math.max(h[0], c - S), N = k.mapping.map(u);
  return k.setSelection(O.create(k.doc, _, Math.max(_, N))), k;
}
function su(e, t) {
  if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !Yn(e.state)) return false;
  const n = ru(e.state), r = Li(n, Ii()), a = t.shiftKey ? ou(e.state, r) : au(e.state, r);
  return a ? (e.dispatch(a), true) : false;
}
function iu() {
  return new He({ key: nu, props: { handleKeyDown(e, t) {
    return su(e, t);
  } } });
}
function lu(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function cu(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
}
function uu(e, t) {
  const r = e.doc.resolve(t).end(), a = e.doc.textBetween(t, r, `
`, `
`), o = a.indexOf(`
`);
  return o < 0 ? a : a.slice(0, o);
}
function du(e) {
  const { from: t, to: n, empty: r } = e.selection, a = e.selection.$from;
  if (a.parent.type.name !== "codeBlock") return [];
  if (r) {
    const s = a.start(), c = a.end(), h = e.doc.textBetween(s, c, `
`, `
`).split(`
`), d = a.pos - s;
    let m = s, g = 0;
    for (let x = 0; x < h.length; x += 1) {
      const w = h[x] ?? "";
      if (g + w.length >= d || x === h.length - 1) return [{ from: m, text: w }];
      g += w.length + 1, m += w.length + 1;
    }
    return [];
  }
  return Gn(e, t, n).map((s) => ({ from: s, text: uu(e, s) }));
}
function fu(e) {
  return e.map((t) => {
    var _a2;
    const n = ((_a2 = /^\s*/.exec(t.text)) == null ? void 0 : _a2[0].length) ?? 0, r = t.from + n, a = t.from + t.text.length;
    return { from: r, to: a, content: t.text.slice(n) };
  });
}
function hu(e, t) {
  const n = e.tr, r = Pi(t);
  for (const c of r) c.to != null && c.to !== c.from ? n.insertText(c.insert, c.from, c.to) : n.insertText(c.insert, c.from);
  const { from: a, to: o, empty: s } = e.selection;
  if (s) {
    const c = n.mapping.map(a, 1);
    n.setSelection(O.create(n.doc, c));
  } else {
    const c = n.mapping.map(a, -1), u = n.mapping.map(o, 1);
    n.setSelection(O.create(n.doc, c, Math.max(c, u)));
  }
  return n;
}
function pu(e) {
  if (!lu(e)) return null;
  const t = du(e);
  if (t.length === 0) return null;
  const n = Ni(cu(e));
  let r = null;
  return n.line ? r = Ai(t, n.line) : n.block && (r = $i(fu(t), n.block.open, n.block.close)), !r || r.length === 0 ? null : hu(e, r);
}
function mu(e) {
  const t = pu(e.state);
  return t ? (e.view.dispatch(t), true) : false;
}
function la(e) {
  return String(e || "").trim().toLowerCase() === "mermaid";
}
function gu(e) {
  var _a2;
  return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
}
const Xa = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", xu = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", bu = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
function Kn({ label: e, onClick: t, active: n = false, expanded: r, children: a }) {
  return l.jsxs(Ft, { children: [l.jsx(Kt, { asChild: true, children: l.jsx("button", { type: "button", className: `haim-code-block__action${n ? " is-copy-success" : ""}`, "aria-label": e, ...r !== void 0 ? { "aria-expanded": r } : {}, onClick: t, children: a }) }), l.jsx(Wt, { children: l.jsxs(qt, { side: "bottom", sideOffset: 6, className: Xa, children: [e, l.jsx(Ut, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function ku({ language: e, onChange: t }) {
  const n = p.useId(), r = p.useRef(null), [a, o] = p.useState(false), [s, c] = p.useState(""), [u, h] = p.useState(0), d = Hi(e), m = Di(e), g = Bi(e), x = Ri(d, s), w = s.trim(), k = w.toLowerCase() === "plain" ? _i : w, L = !!w && !x.some((y) => y.value.toLowerCase() === k.toLowerCase() || y.label.toLowerCase() === w.toLowerCase()) ? [{ value: k, label: w, custom: true }, ...x.map((y) => ({ ...y, custom: false }))] : x.map((y) => ({ ...y, custom: false }));
  p.useEffect(() => {
    if (!a) return;
    c(""), h(0);
    const y = window.setTimeout(() => {
      var _a2;
      return (_a2 = r.current) == null ? void 0 : _a2.focus();
    }, 0);
    return () => window.clearTimeout(y);
  }, [a]), p.useEffect(() => {
    h(0);
  }, [s]);
  const _ = p.useCallback((y) => {
    t(Oi(y)), o(false);
  }, [t]), N = (y) => {
    if (y.key === "ArrowDown") {
      if (y.preventDefault(), !L.length) return;
      h((I) => (I + 1) % L.length);
      return;
    }
    if (y.key === "ArrowUp") {
      if (y.preventDefault(), !L.length) return;
      h((I) => (I - 1 + L.length) % L.length);
      return;
    }
    if (y.key === "Enter") {
      y.preventDefault();
      const I = L[u] ?? L[0];
      I ? _(I.value) : w && _(k);
      return;
    }
    y.key === "Escape" && (y.preventDefault(), o(false));
  };
  return l.jsxs(gi, { open: a, onOpenChange: o, children: [l.jsxs(Ft, { children: [l.jsx(Kt, { asChild: true, children: l.jsx(xi, { asChild: true, children: l.jsxs("button", { type: "button", className: "haim-code-block__lang-trigger", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", "aria-haspopup": "listbox", "aria-expanded": a, onPointerDown: (y) => y.stopPropagation(), children: [l.jsx("span", { className: "haim-code-block__lang-label", children: g }), l.jsx("span", { className: "haim-code-block__lang-chevron", children: l.jsx(Sa, { size: 12, "aria-hidden": true }) })] }) }) }), l.jsx(Wt, { children: l.jsxs(qt, { side: "bottom", sideOffset: 6, className: Xa, children: ["\uC5B8\uC5B4 \uAC80\uC0C9", l.jsx(Ut, { className: "fill-white dark:fill-odp-surface" })] }) })] }), l.jsx(bi, { children: l.jsxs(ki, { className: xu, side: "bottom", align: "start", sideOffset: 4, onOpenAutoFocus: (y) => y.preventDefault(), onCloseAutoFocus: (y) => y.preventDefault(), onPointerDown: (y) => y.stopPropagation(), children: [l.jsxs("div", { className: "flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong", children: [l.jsx(ka, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }), l.jsx("input", { ref: r, type: "text", value: s, onChange: (y) => c(y.target.value), onKeyDown: N, placeholder: "\uC5B8\uC5B4 \uAC80\uC0C9\u2026", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4 \uAC80\uC0C9", "aria-controls": n, "aria-autocomplete": "list", autoComplete: "off", spellCheck: false, className: "min-w-0 flex-1 bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-odp-fg" })] }), l.jsx("ul", { id: n, role: "listbox", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", className: "max-h-56 overflow-y-auto p-1", children: L.length === 0 ? l.jsx("li", { className: "cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uC77C\uCE58\uD558\uB294 \uC5B8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : L.map((y, I) => {
    const z = y.value === m, A = I === u;
    return l.jsx("li", { role: "presentation", children: l.jsxs("button", { type: "button", role: "option", "aria-selected": z, "data-highlighted": A ? "true" : "false", className: bu, onMouseEnter: () => h(I), onMouseDown: (P) => P.preventDefault(), onClick: () => _(y.value), children: [z ? l.jsx("span", { className: "absolute left-1.5 inline-flex items-center", children: l.jsx(Ca, { size: 12, "aria-hidden": true }) }) : null, y.custom ? l.jsxs("span", { children: ["\uC0AC\uC6A9: ", l.jsx("span", { className: "font-mono", children: y.label })] }) : y.label] }) }, `${y.custom ? "custom:" : ""}${y.value}`);
  }) })] }) })] });
}
function wu({ language: e, collapsed: t, copied: n, editable: r, onCopy: a, onToggleCollapse: o, onLanguageChange: s, extra: c }) {
  return l.jsxs("div", { className: "haim-code-block__header", children: [r && s ? l.jsx(ku, { language: e, onChange: s }) : l.jsx("span", { className: "haim-code-block__lang", children: e || "plain" }), l.jsxs("div", { className: "haim-code-block__actions", children: [c, l.jsx(Kn, { label: n ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC", active: n, onClick: a, children: n ? l.jsx(Ca, { size: 14, "aria-hidden": true }) : l.jsx(li, { size: 14, "aria-hidden": true }) }), l.jsx(Kn, { label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30", expanded: !t, onClick: o, children: t ? l.jsx(Sa, { size: 14, "aria-hidden": true }) : l.jsx(ci, { size: 14, "aria-hidden": true }) })] })] });
}
function yu({ node: e, editor: t, selected: n, updateAttributes: r }) {
  const a = String(e.attrs.language || ""), o = la(a), s = e.textContent || "", [c, u] = p.useState(null), [h, d] = p.useState(false), [m, g] = p.useState(false), [x, w] = p.useState(false), [k, S] = p.useState(false), L = t.isEditable, _ = p.useRef(null);
  p.useEffect(() => {
    var _a2;
    if (!o || m || x) return;
    let A = false;
    const P = gu(((_a2 = t.view) == null ? void 0 : _a2.dom) ?? null);
    return zi(s, P).then((U) => {
      A || (U ? (u(U), d(false)) : (u(null), d(!!s.trim())));
    }), () => {
      A = true;
    };
  }, [o, m, x, s, t]);
  const N = p.useCallback(() => {
    var _a2;
    const A = s, P = () => {
      S(true), window.setTimeout(() => S(false), 1500);
    };
    if (typeof navigator < "u" && ((_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText)) {
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
  }, [s]), y = p.useCallback((A) => {
    r({ language: A }), la(A) || (g(false), u(null), d(false));
  }, [r]), I = l.jsx("pre", { className: "haim-mermaid-block__source-hidden", "aria-hidden": true, children: l.jsx(Mr, { as: "code" }) }), z = l.jsx(wu, { language: a, collapsed: x, copied: k, editable: L, onCopy: N, onToggleCollapse: () => w((A) => !A), ...L ? { onLanguageChange: y } : {}, extra: o && L && !x ? l.jsx(Kn, { label: m || h ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => g((A) => !A), children: m || h ? l.jsx(wa, { size: 14, "aria-hidden": true }) : l.jsx(ya, { size: 14, "aria-hidden": true }) }) : null });
  return o && !m && c && !x ? l.jsxs(ge, { as: "div", className: `haim-code-block haim-mermaid-block${n ? " is-selected" : ""}`, "data-language": "mermaid", children: [l.jsx(bt, { delayDuration: 250, skipDelayDuration: 0, children: z }), l.jsx("div", { className: "haim-mermaid-block__chart", dangerouslySetInnerHTML: { __html: c }, onDoubleClick: () => {
    L && g(true);
  } }), I] }) : l.jsxs(ge, { as: "div", className: `haim-code-block${o ? " haim-code-block--mermaid-edit" : ""}${n ? " is-selected" : ""}${x ? " is-collapsed" : ""}`, "data-language": a || void 0, children: [l.jsx(bt, { delayDuration: 250, skipDelayDuration: 0, children: z }), x ? I : l.jsxs(l.Fragment, { children: [o && h ? l.jsx("div", { className: "haim-mermaid-block__error", children: "Mermaid \uB80C\uB354 \uC2E4\uD328" }) : null, l.jsxs("div", { className: "haim-code-block__body", children: [l.jsx(Oa, { text: s, className: "haim-code-block__line-numbers", contentRootRef: _ }), l.jsx("pre", { ref: _, className: a ? `language-${a}` : void 0, children: l.jsx(Mr, { as: "code", ...a ? { className: `language-${a}` } : {} }) })] })] })] });
}
function gd(e, t) {
  const { state: n } = e;
  n.selection;
  let r = n.tr, a = false;
  return n.doc.descendants((o, s) => {
    if (o.type.name !== "codeBlock") return;
    const c = o.textContent, u = Yt(c);
    if (u === c) return;
    const h = s + 1, d = s + o.nodeSize - 1;
    r = r.insertText(u, r.mapping.map(h), r.mapping.map(d)), a = true;
  }), a ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
}
const Cu = new Ee("haimTrimCodeEdges");
function Su() {
  return new He({ key: Cu, appendTransaction(e, t, n) {
    if (!e.some((S) => S.selectionSet || S.docChanged) || e.some((S) => S.getMeta("haimTrimCodeEdges"))) return null;
    const r = t.selection.$from, a = n.selection.$from, o = r.parent.type.name === "codeBlock", s = a.parent.type.name === "codeBlock";
    if (!o || s) return null;
    const c = r.depth, u = r.node(c), h = r.before(c);
    if (u.type.name !== "codeBlock") return null;
    const d = u.textContent, m = Yt(d);
    if (m === d) return null;
    const g = h + 1, x = h + u.nodeSize - 1;
    let w = g, k = x;
    for (const S of e) w = S.mapping.map(w), k = S.mapping.map(k);
    return n.tr.insertText(m, w, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
  } });
}
const vu = Fi(Ki), Mu = Ho.extend({ priority: 1e3, addNodeView() {
  return Ge(yu);
}, addKeyboardShortcuts() {
  var _a2;
  return { ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}, Enter: ({ editor: t }) => eu(t), "Shift-Enter": ({ editor: t }) => tu(t), "Mod-/": ({ editor: t }) => mu(t) };
}, addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], Su(), Vc(), iu()];
} }).configure({ lowlight: vu, languageClassPrefix: "language-", enableTabIndentation: false, exitOnTripleEnter: false }), ju = Do.extend({ renderMarkdown: (e, t) => {
  if (!e) return "";
  const n = Array.isArray(e.content) ? e.content : [];
  return n.length === 0 ? "" : t.renderChildren(n);
} }), Tu = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
function xd(e) {
  const t = typeof e == "string" ? e : "", n = Tu.exec(t);
  if (!n) return { prefix: "", body: t };
  const r = n[1] ?? "";
  return { prefix: r, body: t.slice(r.length) };
}
function Eu(e, t) {
  return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
}
const Lu = 3;
function Bt(e) {
  let t = 0;
  for (let n = 0; n < e.length; n += 1) e.charCodeAt(n) === 10 && (t += 1);
  return t;
}
function Ya(e) {
  const t = [0];
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
function Iu(e, t) {
  return Ya(e)(t);
}
function Nu(e) {
  if (!e) return 0;
  const t = "\0", n = Eu(e, t), r = n.indexOf(t);
  return r < 0 ? 0 : Iu(n, r);
}
function Rt(e, t) {
  try {
    return e({ type: "doc", content: [t.toJSON()] }).replace(/\n+$/, "");
  } catch {
    return t.textContent || "";
  }
}
function Au(e, t, n) {
  var _a2, _b;
  if (!t || !n || n.length === 0 || t.childCount !== e.childCount || n.length !== e.childCount) return false;
  for (let a = 0; a < e.childCount; a += 1) if (((_a2 = e.child(a)) == null ? void 0 : _a2.type.name) !== ((_b = t.child(a)) == null ? void 0 : _b.type.name)) return false;
  let r = 0;
  for (let a = 0; a < e.childCount; a += 1) if (e.child(a) !== t.child(a) && (r += 1, r > Lu)) return false;
  return true;
}
function $u(e, t, n, r) {
  const a = [];
  let o = 0, s = 0;
  return e.forEach((c, u) => {
    const h = t.child(s), d = n[s], m = u + c.nodeSize;
    if (!d || !h) {
      const k = Rt(r, c), S = Bt(k);
      a.push({ pos: u, to: m, line0: (d == null ? void 0 : d.line0) ?? 0, blockNewlines: S }), s += 1;
      return;
    }
    if (c.type.name === "noteCover") {
      a.push({ pos: u, to: m, line0: 0, blockNewlines: 0 }), s += 1;
      return;
    }
    if (c === h) {
      a.push({ pos: u, to: m, line0: d.line0 + o, blockNewlines: d.blockNewlines }), s += 1;
      return;
    }
    const g = Rt(r, c), x = Bt(g), w = typeof d.blockNewlines == "number" ? d.blockNewlines : Bt(Rt(r, h));
    a.push({ pos: u, to: m, line0: d.line0 + o, blockNewlines: x }), o += x - w, s += 1;
  }), a;
}
function Pu(e, t, n) {
  const r = Nu(n);
  let a = "";
  try {
    a = t(e.toJSON());
  } catch {
    a = "";
  }
  const o = Ya(a), s = [];
  let c = 0;
  return e.forEach((u, h) => {
    const d = h + u.nodeSize;
    if (u.type.name === "noteCover") {
      s.push({ pos: h, to: d, line0: 0, blockNewlines: 0 });
      return;
    }
    const m = Rt(t, u), g = Bt(m);
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
    s.push({ pos: h, to: d, line0: w, blockNewlines: g });
  }), s;
}
function Hu(e, t, n, r, a) {
  return Au(e, r, a) && r && a ? $u(e, r, a, t) : Pu(e, t, n);
}
function Du(e) {
  return !e.enabled || !e.docChanged ? false : e.tipTapFocused;
}
const Bu = 120;
function Ru(e) {
  var _a2;
  const n = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
  return !n || typeof n.serialize != "function" ? null : (r) => n.serialize(r);
}
function xt(e) {
  e.pendingTimer != null && (clearTimeout(e.pendingTimer), e.pendingTimer = null);
}
function _u(e, t) {
  xt(t), t.pendingTimer = setTimeout(() => {
    if (t.pendingTimer = null, !e.isDestroyed) try {
      e.commands.updateDecorations("haimSourceLine");
    } catch {
    }
  }, Bu);
}
function ca(e) {
  return e.map((t) => Bo.Node(t.pos, t.to, { "data-line": String(t.line0) }));
}
const Ou = De.create({ name: "haimSourceLine", addOptions() {
  return { getMetaPrefix: () => "", isEnabled: () => true };
}, addStorage() {
  return { lastDoc: null, lastEntries: [], pendingTimer: null };
}, onDestroy() {
  xt(this.storage);
}, addDecorations() {
  const e = this.options.getMetaPrefix ?? (() => ""), t = this.options.isEnabled ?? (() => true), n = this.storage;
  return { update: "document", shouldUpdate: ({ editor: r, tr: a }) => {
    var _a2, _b;
    const o = t();
    return o ? Du({ enabled: o, docChanged: a.docChanged, tipTapFocused: !!((_b = (_a2 = r.view) == null ? void 0 : _a2.hasFocus) == null ? void 0 : _b.call(_a2)) }) ? (_u(r, n), false) : (a.docChanged && xt(n), a.docChanged) : (xt(n), true);
  }, create: ({ editor: r, state: a }) => {
    if (!t()) return xt(n), n.lastDoc = null, n.lastEntries = [], [];
    const o = Ru(r);
    if (!o) return [];
    if (n.lastDoc === a.doc && n.lastEntries.length > 0) return ca(n.lastEntries);
    const s = e() || "", c = Hu(a.doc, o, s, n.lastDoc, n.lastEntries);
    return n.lastDoc = a.doc, n.lastEntries = c, ca(c);
  } };
} });
function zu(e, t, n) {
  return new En({ find: e, handler: ({ state: r, range: a, match: o }) => {
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
  } });
}
const Fu = [{ find: /--$/, replace: "\u2014", ruleId: "emDash" }, { find: /\.\.\.$/, replace: "\u2026", ruleId: "ellipsis" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/, replace: "\u201C", ruleId: "doubleQuotes" }, { find: /"$/, replace: "\u201D", ruleId: "doubleQuotes" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/, replace: "\u2018", ruleId: "singleQuotes" }, { find: /'$/, replace: "\u2019", ruleId: "singleQuotes" }, { find: /<-$/, replace: "\u2190", ruleId: "leftArrow" }, { find: /->$/, replace: "\u2192", ruleId: "rightArrow" }, { find: /\(c\)$/, replace: "\xA9", ruleId: "copyright" }, { find: /\(tm\)$/, replace: "\u2122", ruleId: "trademark" }, { find: /\(sm\)$/, replace: "\u2120", ruleId: "servicemark" }, { find: /\(r\)$/, replace: "\xAE", ruleId: "registeredTrademark" }, { find: /(?:^|\s)(1\/2)\s$/, replace: "\xBD", ruleId: "oneHalf" }, { find: /(?:^|\s)(1\/4)\s$/, replace: "\xBC", ruleId: "oneQuarter" }, { find: /(?:^|\s)(3\/4)\s$/, replace: "\xBE", ruleId: "threeQuarters" }, { find: /\+\/-$/, replace: "\xB1", ruleId: "plusMinus" }, { find: /!=$/, replace: "\u2260", ruleId: "notEqual" }, { find: /\d+\s?([*x])\s?\d+$/, replace: "\xD7", ruleId: "multiplication" }, { find: /<<$/, replace: "\xAB", ruleId: "laquo" }, { find: />>$/, replace: "\xBB", ruleId: "raquo" }, { find: /\^2$/, replace: "\xB2", ruleId: "superscriptTwo" }, { find: /\^3$/, replace: "\xB3", ruleId: "superscriptThree" }], Ku = De.create({ name: "haimTypography", addOptions() {
  return { initialRules: { ...ga } };
}, addStorage() {
  return { rules: { ...this.options.initialRules } };
}, addCommands() {
  return { setHaimTypographyRules: (e) => () => (this.storage.rules = { ...e }, true) };
}, addInputRules() {
  return Fu.map(({ find: e, replace: t, ruleId: n }) => zu(e, t, () => !!this.storage.rules[n]));
} });
function bd(e) {
  const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", a = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), o = (e == null ? void 0 : e.isSourceLineEnabled) ?? (() => true), s = (e == null ? void 0 : e.typographyRules) ?? ga, u = [r ? jr.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, codeBlock: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }) : jr.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }), ju, El, Ou.configure({ getMetaPrefix: a, isEnabled: o }), Tl, Wo.extend({ parseHTML() {
    return [{ tag: "img[src]:not([data-wiki-path])" }];
  }, addNodeView() {
    return Ge(wl);
  } }).configure({ allowBase64: true }), qo.configure({ taskItem: false, taskList: false }), Nl.configure({ nested: true }), $l, Uo.configure({ table: { resizable: r } }), Ro, Vo.configure({ types: ["heading", "paragraph"] }), Xo.configure({ multicolor: true }), ...r ? [Mu] : [], _o, Oo, Ku.configure({ initialRules: s }), Yo.configure({ placeholder: t, ...r ? {} : { showOnlyCurrent: false } }), zo, Go.configure({ className: "haim-node-focused" }), Fo, Ko, Rc, _c, Rl, Fl, Wl, Kl, ...r ? [ql] : [], uc, dc, Hc, kc, Cc, Ic, Pc, ...r ? [gc] : []];
  return r ? [...u, Qo, ts.configure({ controls: true, nocookie: true }), ns.configure({ persist: true }), Zo, Jo, Hl, es, rs.configure({ injectCSS: true, visible: false }), as.configure({ types: ["heading", "paragraph"] }), os.configure({ getIndex: ss }), Dl] : u;
}
const Wn = /* @__PURE__ */ new WeakMap();
function kd(e) {
  if (!e) return "";
  const t = e.state.doc, n = Wn.get(e);
  if (n && n.doc === t) return n.markdown;
  const r = e, a = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
  return Wn.set(e, { doc: t, markdown: a }), a;
}
function wd(e) {
  e && Wn.delete(e);
}
export {
  Xt as C,
  ic as H,
  Fn as a,
  Yc as b,
  bd as c,
  md as d,
  sc as e,
  ud as f,
  kd as g,
  fd as h,
  wd as i,
  Eu as j,
  Ha as k,
  dd as l,
  pd as n,
  Fr as o,
  oc as p,
  Fc as r,
  xd as s,
  gd as t,
  Aa as u,
  hd as w
};
