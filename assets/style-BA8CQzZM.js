import { c as ge, s as us, d as xe, P as Xe, e as Pe, g as ds, M as fs, f as hs, I as Mn, r as ps, h as wn, i as ms, j as gs, p as kr, k as xs, l as Te, n as bs, o as ks, T as _, N as aa, R as Ye, q as Qe, t as ws, v as ys, w as wr, x as yr, B as Ss, y as Cs, z as Sr, C as vs, A as Ms, F as js, G as Cr, H as Es, J as Ts, K as Ls, L as Is, S as Ns, O as As, Q as $s, U as Ps, V as Hs, W as Ds, X as Rs, Y as Bs, Z as Os, _ as _s, $ as zs, a0 as Fs, a1 as Ks, a2 as Ws, a3 as qs, a4 as Vs, a5 as Us, a6 as Xs, a7 as Ys, a8 as Qs, a9 as Gs } from "./vendor-tiptap-DQKtOH7v.js";
import { r as p, j as i, c as Js, a as Zs } from "./vendor-react-BDjpSibw.js";
import { A as yn, m as Ke } from "./vendor-motion-Dw-WnPM7.js";
import { t as eo, O as to } from "./index-De3wkM3r.js";
import { c as no, n as We, ae as ro, C as ao, j as so, eL as sa, i9 as oa, hr as oo, ed as Dt, a9 as Kn, ia as io, ib as ia, hF as vr, u as lo, aZ as la, ic as co, id as uo, ie as ca } from "./index-DSkvkTCg.js";
import { g as fo } from "./Kbd-zJP-p1De.js";
import { t as jn, b4 as ho, P as po, b5 as mo, b6 as go, b7 as xo, v as bo, aD as Mr, z as jr, U as ua, R as da, T as ko, b8 as wo, ag as yo, o as So, w as Co, b9 as vo, X as Mo, B as jo, I as Eo, c as To, d as Lo, h as Io, aI as No, aJ as Ao, e as $o, f as Po, g as Er, Q as Ho, aV as Do, i as Tr, aN as Ro, aO as Bo, aP as Oo, aQ as _o, Y as Lt, aR as zo, aS as ct, aF as Fo, S as Ko, aT as Wo, n as fa, aU as qo, aX as Vo, aK as Uo, aL as Xo, aM as Yo, ba as Qo, bb as Go, bc as Jo, E as ha, bd as pa, y as ma, an as Zo, k as ga, j as ei } from "./vendor-lucide-BXdwsXhs.js";
import { N as ti, O as ni, Q as ri, U as ai, V as si, W as oi, y as ut, z as dt, B as Sn, E as ft, G as ht, H as pt, K as Me, M as je, h as xt, i as Ot, j as _t, k as zt, l as Ft, A as Kt, R as ii, T as li, P as ci, C as ui } from "./vendor-radix-DuLpLUUM.js";
import { b as mt, c as Pt, d as Lr, e as xa, a as di, s as fi, f as hi } from "./taskCheckboxStatus-DlXLsCJg.js";
import { W as pi } from "./WikiImageSizeModal-jDE_q_UJ.js";
import { c as mi, f as gi } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as xi } from "./toHtml-DrbJ_Xu0.js";
import { k as bi } from "./vendor-katex-NqpuB_gR.js";
import { r as ki, l as wi, g as yi, h as Si, i as Ci, j as vi, k as Mi, m as ji } from "./haimCodeBlockLanguages-C4u7NjrS.js";
import { c as Ei } from "./lazyMermaid-CFU1x6wk.js";
import { c as Ti, g as Li } from "./vendor-highlight-Cy0EGwO-.js";
function Ii() {
  var _a2;
  return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
}
async function Ni(e) {
  const t = navigator.ink;
  if (!(t == null ? void 0 : t.requestPresenter)) return null;
  try {
    return await t.requestPresenter({ presentationArea: e });
  } catch {
    return null;
  }
}
async function Ai(e) {
  const { src: t, inkCanvas: n, highlightCanvas: r } = e, a = await $i(t), s = ("width" in a, a.width), l = ("height" in a, a.height), c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(s)), c.height = Math.max(1, Math.round(l));
  const d = c.getContext("2d");
  if (!d) throw new Error("Canvas 2D unavailable");
  if (d.imageSmoothingEnabled = true, d.imageSmoothingQuality = "high", d.drawImage(a, 0, 0, c.width, c.height), n && n.width > 0 && n.height > 0 && d.drawImage(n, 0, 0, c.width, c.height), r && r.width > 0 && r.height > 0 && d.drawImage(r, 0, 0, c.width, c.height), "close" in a && typeof a.close == "function") try {
    a.close();
  } catch {
  }
  const h = await new Promise((u) => {
    c.toBlob((m) => u(m), "image/png");
  });
  if (!h) throw new Error("Failed to encode PNG");
  return h;
}
async function $i(e) {
  try {
    const t = await fetch(e, { mode: "cors", credentials: "omit" });
    if (!t.ok) throw new Error(`fetch ${t.status}`);
    const n = await t.blob();
    return await createImageBitmap(n);
  } catch {
    return await Pi(e);
  }
}
function Pi(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(new Error("Image load failed for composite")), r.src = e;
  });
}
function Wt(e) {
  return Math.max(e.diameterX, e.diameterY);
}
function ba(e) {
  return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
}
function Hi(e, t) {
  return !(t >= 8) || !(e >= 1) ? 1 : K(e / t, 0.25, 12);
}
function Ir(e, t, n) {
  const r = Math.max(4, Math.min(96, Math.min(t, n) * 0.08));
  return K(e, 0.5, r);
}
function ka(e, t) {
  if (e.length < 2) return 0;
  const n = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
  if (n === r) {
    const l = e[Math.max(0, t - 1)], c = e[t];
    return Math.atan2(c.y - l.y, c.x - l.x);
  }
  const a = e[n], s = e[r];
  return Math.atan2(s.y - a.y, s.x - a.x);
}
function wa(e, t) {
  if (e.length === 0) return [];
  const n = e[0];
  if (!n) return [];
  const r = Math.max(0.5, t), a = [{ ...n }];
  let s = 0;
  for (let l = 1; l < e.length; l += 1) {
    const c = e[l - 1], d = e[l], h = Math.hypot(d.x - c.x, d.y - c.y);
    if (h < 1e-6) continue;
    let u = 0;
    for (; s + (h - u) >= r; ) {
      const m = r - s, g = (u + m) / h;
      a.push({ x: c.x + (d.x - c.x) * g, y: c.y + (d.y - c.y) * g, pressure: c.pressure + (d.pressure - c.pressure) * g }), u += m, s = 0;
    }
    s += h - u;
  }
  return a;
}
const Di = [{ value: "300", label: "Light 300" }, { value: "400", label: "Regular 400" }, { value: "500", label: "Medium 500" }, { value: "600", label: "Semibold 600" }, { value: "700", label: "Bold 700" }, { value: "800", label: "ExtraBold 800" }], Ri = [{ value: "multiply", label: "Multiply" }, { value: "overlay", label: "Overlay" }, { value: "soft-light", label: "Soft light" }, { value: "screen", label: "Screen" }, { value: "darken", label: "Darken" }, { value: "lighten", label: "Lighten" }, { value: "color-burn", label: "Color burn" }, { value: "normal", label: "Normal" }];
function K(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
const ya = 0.92, Nr = 0.35;
function Bi(e, t) {
  const n = e.x - t.x, r = e.y - t.y;
  return n * n + r * r;
}
function Sa(e, t, n = ya) {
  const r = K(n, 0.05, 1);
  return { x: e.x + (t.x - e.x) * r, y: e.y + (t.y - e.y) * r, pressure: e.pressure + (t.pressure - e.pressure) * r };
}
function Oi(e, t, n, r = ya) {
  let a = t;
  const s = Nr * Nr;
  for (const l of n) {
    a = Sa(a, l, r);
    const c = e[e.length - 1];
    !c || Bi(c, a) >= s ? e.push({ ...a }) : (c.x = a.x, c.y = a.y, c.pressure = a.pressure);
  }
  return a;
}
function _i(e) {
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
    const a = e[r === 0 ? 0 : r - 1], s = e[r], l = e[r + 1], c = e[r + 2 < e.length ? r + 2 : r + 1], d = s.x + (l.x - a.x) / 6, h = s.y + (l.y - a.y) / 6, u = l.x - (c.x - s.x) / 6, m = l.y - (c.y - s.y) / 6;
    n += ` C ${d} ${h} ${u} ${m} ${l.x} ${l.y}`;
  }
  return n;
}
function En(e) {
  if (e.dash !== "dashed") return;
  const t = Wt(e), n = Math.max(2, t * 1.2);
  return `${Math.max(2, t * 2.2)} ${n}`;
}
function Tn(e) {
  return e === "square" ? "square" : "round";
}
function Ln(e) {
  return e === "square" ? "miter" : "round";
}
function zi(e) {
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
function Ar(e, t, n) {
  e.lineCap = Tn(t.shape), e.lineJoin = Ln(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, n), e.globalAlpha = K(t.opacity, 0.02, 1);
  const r = En(t);
  r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
}
function Fi(e, t, n, r, a = 1) {
  const s = Math.max(0.25, t.diameterX * a / 2), l = Math.max(0.25, t.diameterY * a / 2);
  e.save(), e.translate(n.x, n.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-s, -l, s * 2, l * 2) : e.ellipse(0, 0, s, l, 0, 0, Math.PI * 2), e.fill(), e.restore();
}
function Ca(e, t) {
  if (t.points.length < 1) return;
  if (e.globalAlpha = K(t.opacity, 0.02, 1), ba(t)) {
    const a = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), s = wa(t.points, a);
    for (let l = 0; l < s.length; l += 1) {
      const c = s[l], d = Math.min(t.points.length - 1, Math.round(l / Math.max(1, s.length - 1) * (t.points.length - 1))), h = ka(t.points, d), u = t.kind === "pressure" ? c.pressure : 1;
      Fi(e, t, c, h, u);
    }
    return;
  }
  const n = Wt(t);
  if (t.kind === "pressure" && t.points.length >= 2) {
    for (let a = 1; a < t.points.length; a += 1) {
      const s = t.points[a - 1], l = t.points[a], c = Math.max(0.5, n * ((s.pressure + l.pressure) / 2));
      Ar(e, t, c), e.beginPath(), e.moveTo(s.x, s.y), e.lineTo(l.x, l.y), e.stroke();
    }
    return;
  }
  Ar(e, t, n), e.beginPath();
  const r = t.points[0];
  if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
  else for (let a = 1; a < t.points.length; a += 1) {
    const s = t.points[a];
    e.lineTo(s.x, s.y);
  }
  e.stroke();
}
function Ki(e, t, n) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const a = r.getContext("2d");
  if (!a) return r;
  a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
  for (const s of n) a.save(), s.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = "source-over", a.strokeStyle = s.color), Ca(a, s), a.restore();
  return r;
}
function Wi(e, t, n) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const a = r.getContext("2d");
  if (!a) return r;
  a.imageSmoothingEnabled = true, a.imageSmoothingQuality = "high";
  for (const s of n) a.save(), s.kind === "eraser" ? (a.globalCompositeOperation = "destination-out", a.strokeStyle = "rgba(0,0,0,1)", a.globalAlpha = 1) : (a.globalCompositeOperation = zi(s.blend), a.strokeStyle = s.color), Ca(a, s), a.restore();
  return r;
}
function qi(e, t, n) {
  var _a2;
  e.textBaseline = "top", e.textAlign = "left";
  for (const r of t) {
    const a = r.text ?? "";
    if (!a.trim() && a.length === 0) continue;
    const s = Math.max(1, r.fontSizePx * Math.max(1e-3, n));
    e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = K(r.opacity, 0.02, 1), e.fillStyle = r.color;
    const l = ((_a2 = r.fontFamily) == null ? void 0 : _a2.trim()) || "sans-serif";
    e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${s}px ${l}`;
    const c = s * 1.3, d = a.split(`
`);
    for (let h = 0; h < d.length; h += 1) e.fillText(d[h] ?? "", r.x, r.y + h * c);
    e.restore();
  }
}
const $r = 8192;
function Vi(e) {
  const t = Math.max(1, e.clientWidth), n = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, a = e.naturalHeight > 0 ? e.naturalHeight : n, s = Math.min(3, window.devicePixelRatio || 1);
  let l = Math.max(r, Math.round(t * s)), c = Math.max(a, Math.round(n * s));
  const d = Math.max(l, c);
  if (d > $r) {
    const h = $r / d;
    l = Math.max(1, Math.round(l * h)), c = Math.max(1, Math.round(c * h));
  }
  return { bufW: l, bufH: c, cssW: t, cssH: n };
}
let Rt = null;
function ju(e) {
  Rt = e;
}
function Ui() {
  return typeof Rt == "function";
}
async function va(e) {
  var _a2;
  if (!Rt) throw new Error("Image upload is not available");
  const n = (_a2 = (await Rt([e]))[0]) == null ? void 0 : _a2.trim();
  if (!n) throw new Error("Upload returned no path");
  return n;
}
function Eu(e) {
  return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}
const Wn = [0.22, 1, 0.36, 1], Xi = { duration: 0.2, ease: Wn }, Yi = { duration: 0.28, ease: Wn }, It = 0.5, Nt = 8, qe = 1.25, Qi = 2, Ce = 0.5, Ee = 128, Gi = 4e3, Ma = 450, Ji = ["#111827", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"], Zi = ["#facc15", "#f472b6", "#38bdf8", "#4ade80", "#fb923c"], el = { backgroundColor: "#ffffff", backgroundImage: ["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)", "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","), backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" };
function Ve(e) {
  return Math.round(e * 10) / 10;
}
function tl(e) {
  return Math.max(0.1, Ve(e / 10));
}
function Pr(e, t) {
  return Ve(K(e + t * tl(e), Ce, Ee));
}
const In = 8, Nn = 400;
function nl() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", t = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
}
const ja = nl(), pe = fo(), Hr = ja ? `${pe}+Shift+Z` : `${pe}+Y`;
function rl(e, t) {
  const n = Math.max(1, Math.round(e / 10));
  return K(Math.round(e + t * n), In, Nn);
}
function al(e, t) {
  if (!t) return 1;
  const n = e.pressure;
  return typeof n != "number" || Number.isNaN(n) || e.pointerType === "mouse" ? 0.5 : K(n || 0.05, 0.05, 1);
}
function X({ label: e, active: t = false, disabled: n = false, tone: r = "default", onClick: a, children: s }) {
  const l = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
  return i.jsxs(Ot, { children: [i.jsx(_t, { asChild: true, children: i.jsx("button", { type: "button", "aria-label": e, disabled: n, onClick: a, className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${l}`, children: s }) }), i.jsx(zt, { children: i.jsxs(Ft, { side: "top", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [e, i.jsx(Kt, { className: "fill-neutral-900" })] }) })] });
}
const sl = { backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" };
function Dr({ size: e = 16 }) {
  return i.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: i.jsx("path", { d: "M2 8h12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function Rr({ size: e = 16 }) {
  return i.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: i.jsx("path", { d: "M2 8h3M7 8h3M12 8h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function fe({ stroke: e, fading: t = false }) {
  const n = e.kind === "eraser", r = n ? "#000" : e.color, a = n ? 1 : e.opacity, s = t ? { opacity: 0, transition: `opacity ${Ma}ms ease-out` } : { opacity: a };
  if (ba(e)) {
    const d = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), h = wa(e.points, d);
    return i.jsx("g", { style: s, children: h.map((u, m) => {
      const g = Math.min(e.points.length - 1, Math.round(m / Math.max(1, h.length - 1) * (e.points.length - 1))), x = ka(e.points, g) * 180 / Math.PI, C = e.kind === "pressure" ? u.pressure : 1, k = Math.max(0.25, e.diameterX * C / 2), S = Math.max(0.25, e.diameterY * C / 2);
      return e.shape === "square" ? i.jsx("rect", { x: -k, y: -S, width: k * 2, height: S * 2, fill: r, transform: `translate(${u.x} ${u.y}) rotate(${x})` }, `${e.id}-st-${m}`) : i.jsx("ellipse", { cx: 0, cy: 0, rx: k, ry: S, fill: r, transform: `translate(${u.x} ${u.y}) rotate(${x})` }, `${e.id}-st-${m}`);
    }) });
  }
  const l = Wt(e);
  if (e.kind === "pressure" && e.points.length >= 2) return i.jsx("g", { style: s, children: e.points.slice(1).map((d, h) => {
    const u = e.points[h], m = Math.max(0.5, l * ((u.pressure + d.pressure) / 2));
    return i.jsx("path", { d: `M ${u.x} ${u.y} L ${d.x} ${d.y}`, fill: "none", stroke: r, strokeWidth: m, strokeLinecap: Tn(e.shape), strokeLinejoin: Ln(e.shape), strokeMiterlimit: 2, strokeDasharray: En({ ...e, diameterX: m, diameterY: m }), style: { fill: "none" } }, `${e.id}-p-${h}`);
  }) });
  const c = _i(e.points);
  return c ? i.jsx("path", { d: c, fill: "none", stroke: r, strokeWidth: l, strokeLinecap: Tn(e.shape), strokeLinejoin: Ln(e.shape), strokeMiterlimit: 2, strokeDasharray: En(e), style: { ...s, fill: "none" } }) : null;
}
function Ea({ src: e, alt: t = "", open: n, onClose: r, onSaveAnnotated: a }) {
  const s = !!(n && e), [l, c] = p.useState(1), [d, h] = p.useState({ x: 0, y: 0 }), [u, m] = p.useState("pan"), [g, x] = p.useState("#111827ff"), [C, k] = p.useState("#facc15ff"), [S, L] = p.useState(4), [O, N] = p.useState(4), [w, I] = p.useState(1), [z, A] = p.useState(0.45), [P, V] = p.useState("multiply"), [ie, He] = p.useState("circle"), [ee, E] = p.useState("solid"), [T, D] = p.useState([]), [H, F] = p.useState([]), [U, le] = p.useState([]), [ae, Y] = p.useState([]), [q, te] = p.useState(null), [ne, Q] = p.useState(null), [ue, ce] = p.useState("Paperozi, sans-serif"), [be, G] = p.useState(24), [re, bt] = p.useState("400"), [De, Xt] = p.useState("normal"), [Fa, Yt] = p.useState(() => /* @__PURE__ */ new Set()), [J, ve] = p.useState(null), [Qt, Gt] = p.useState(false), [Ka, ke] = p.useState([]), [R, Wa] = p.useState({ w: 1, h: 1 }), [kt, wt] = p.useState(null), [qa, Jt] = p.useState(false), [Ge, Xn] = p.useState(false), [Yn, Zt] = p.useState(null), [en, tn] = p.useState(false), [nn, Qn] = p.useState(false), [rn, Je] = p.useState(false), an = p.useRef({ w: 4, h: 4 }), yt = p.useRef(null), sn = p.useRef(null), St = p.useRef(null), Le = p.useRef(null), Gn = p.useRef([]), Jn = p.useRef([]), Ze = p.useRef([]), we = p.useRef(null), ye = p.useRef(null), on = p.useRef(null), Zn = p.useRef(null), ln = p.useRef(0), Se = p.useRef(null), cn = p.useRef(null), Re = p.useRef(null), et = p.useRef(null), Ct = p.useRef(null), Ie = p.useRef(null), vt = p.useRef(1), er = p.useRef(l), tr = p.useRef(0), Be = p.useRef(/* @__PURE__ */ new Map()), un = p.useRef([]), tt = p.useRef(null);
  Gn.current = T, Jn.current = H, Ze.current = ae, er.current = l;
  const nr = !!a && Ui() && (T.length > 0 || H.length > 0 || ae.some((o) => o.text.trim().length > 0)), nt = ae.find((o) => o.id === q) ?? null, rt = u === "highlighter" ? C : g, Va = u === "highlighter" ? z : w, at = p.useCallback(() => {
    c(1), h({ x: 0, y: 0 });
  }, []), Mt = p.useCallback(() => {
    for (const o of Be.current.values()) clearTimeout(o);
    Be.current.clear();
  }, []), dn = p.useCallback(() => {
    D([]), F([]), le([]), Y([]), te(null), Q(null), Yt(/* @__PURE__ */ new Set()), ke([]), un.current = [], ve(null), Gt(false), we.current = null, ye.current = null, ln.current = 0;
    const o = Zn.current, f = on.current;
    o && f && o.clearRect(0, 0, f.width, f.height), Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), et.current = null, Mt();
  }, [Mt]), fn = p.useRef(false);
  p.useEffect(() => {
    if (!s) {
      fn.current = false;
      return;
    }
    const o = !fn.current;
    fn.current = true, o && (at(), dn(), m("pan"), Zt(null), wt(null));
  }, [s, e, at, dn]), p.useEffect(() => {
    var _a2;
    s || (Je(false), Mt(), (_a2 = tt.current) == null ? void 0 : _a2.call(tt), tt.current = null);
  }, [s, Mt]);
  const Oe = p.useCallback(() => {
    const o = sn.current;
    if (!o) return;
    const { bufW: f, bufH: b, cssW: v } = Vi(o);
    v < 8 || o.clientHeight < 8 || (vt.current = Hi(f, v), Wa({ w: f, h: b }));
  }, []);
  p.useEffect(() => {
    if (!s) return;
    Oe();
    const o = sn.current;
    if (!o) return;
    const f = () => Oe();
    o.addEventListener("load", f);
    const b = typeof ResizeObserver < "u" ? new ResizeObserver(Oe) : null;
    return b == null ? void 0 : b.observe(o), window.addEventListener("resize", Oe), () => {
      o.removeEventListener("load", f), b == null ? void 0 : b.disconnect(), window.removeEventListener("resize", Oe);
    };
  }, [s, e, Oe]), p.useEffect(() => {
    if (!s) {
      Le.current = null, Jt(false);
      return;
    }
    let o = false;
    const f = St.current;
    if (!f || !Ii()) {
      Jt(false);
      return;
    }
    return Ni(f).then((b) => {
      o || (Le.current = b, Jt(!!b));
    }), () => {
      o = true, Le.current = null;
    };
  }, [s, e, R.w]);
  const _e = p.useCallback((o, f, b) => {
    const v = yt.current;
    if (!v) {
      c(K(o, It, Nt));
      return;
    }
    const M = v.getBoundingClientRect(), y = f - M.left - M.width / 2, j = b - M.top - M.height / 2;
    c((B) => {
      const Z = K(o, It, Nt), de = Z / B;
      return h((oe) => ({ x: y - (y - oe.x) * de, y: j - (j - oe.y) * de })), Z;
    });
  }, []), Ua = p.useCallback((o) => {
    var _a2;
    if ((_a2 = tt.current) == null ? void 0 : _a2.call(tt), tt.current = null, yt.current = o, !o) return;
    const f = (b) => {
      b.preventDefault(), b.stopPropagation();
      const v = b.deltaY > 0 ? 1 / qe : qe;
      _e(er.current * v, b.clientX, b.clientY);
    };
    o.addEventListener("wheel", f, { passive: false, capture: true }), tt.current = () => {
      o.removeEventListener("wheel", f, true);
    };
  }, [_e]), Xa = p.useCallback((o) => {
    if (o.preventDefault(), o.stopPropagation(), l > 1.05) {
      at();
      return;
    }
    _e(Qi, o.clientX, o.clientY);
  }, [l, at, _e]), st = p.useCallback((o, f) => {
    const b = St.current;
    if (!b) return null;
    const v = b.getBoundingClientRect();
    return v.width < 1 || v.height < 1 ? null : { x: (o.clientX - v.left) / v.width * R.w, y: (o.clientY - v.top) / v.height * R.h, pressure: al(o, f) };
  }, [R.w, R.h]), hn = p.useCallback((o) => {
    const f = o === "laser" ? 0.75 : 1, b = o === "highlighter" ? 4 : o === "laser" ? 2 : Ce;
    if (o === "highlighter") return { w: Math.max(b, S * f), h: Math.max(b, O * f) };
    const v = Math.max(b, S * f);
    return { w: v, h: v };
  }, [S, O]);
  p.useEffect(() => {
    u !== "eraser" && (u === "pen" || u === "pressure" || u === "highlighter" || u === "laser") && (an.current = { w: S, h: O });
  }, [u, S, O]);
  const rr = p.useCallback(() => {
    const o = an.current;
    L(o.w), N(o.h);
  }, []), ar = p.useCallback(() => {
    const o = an.current, f = Math.max(o.w, o.h), b = Ve(K(f * 5, Ce, Ee));
    L(b), N(b), m("eraser");
  }, []), se = p.useCallback((o) => {
    if (u === "eraser" && o !== "eraser" && rr(), o === "eraser") {
      ar();
      return;
    }
    if (o === "highlighter") {
      m("highlighter"), E("solid"), He("square");
      return;
    }
    m(o);
  }, [u, rr, ar]), sr = p.useCallback((o) => {
    var _a2, _b;
    o.preventDefault(), o.stopPropagation(), (_b = (_a2 = o.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, o.pointerId), Ie.current = { pointerId: o.pointerId, startX: o.clientX, startY: o.clientY, originX: d.x, originY: d.y };
  }, [d.x, d.y]), or = p.useCallback((o) => {
    const f = Ie.current;
    !f || f.pointerId !== o.pointerId || (o.preventDefault(), h({ x: f.originX + (o.clientX - f.startX), y: f.originY + (o.clientY - f.startY) }));
  }, []), ir = p.useCallback((o) => {
    var _a2, _b;
    const f = Ie.current;
    if (!(!f || f.pointerId !== o.pointerId)) {
      Ie.current = null;
      try {
        (_b = (_a2 = o.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, o.pointerId);
      } catch {
      }
    }
  }, []), ze = p.useCallback((o) => {
    const f = Be.current.get(o);
    f && clearTimeout(f);
    const b = setTimeout(() => {
      Yt((M) => {
        const y = new Set(M);
        return y.add(o), y;
      });
      const v = setTimeout(() => {
        Be.current.delete(o), Yt((M) => {
          const y = new Set(M);
          return y.delete(o), y;
        }), le((M) => M.filter((y) => y.id !== o));
      }, Ma);
      Be.current.set(o, v);
    }, Gi);
    Be.current.set(o, b);
  }, []), Ne = p.useCallback(() => {
    const o = on.current, f = Zn.current ?? (o == null ? void 0 : o.getContext("2d"));
    o && f && f.clearRect(0, 0, o.width, o.height), ln.current = 0;
  }, []), pn = p.useCallback(() => {
    Se.current == null && (Se.current = requestAnimationFrame(() => {
      Se.current = null;
      const o = we.current;
      if (!o) {
        ve(null);
        return;
      }
      ve({ ...o, points: o.points.slice() });
    }));
  }, []), Fe = p.useCallback((o, f) => {
    const b = o.nativeEvent, v = typeof b.getCoalescedEvents == "function" ? b.getCoalescedEvents() : [], M = v.length > 0 ? v : [b], y = [];
    for (const j of M) {
      const B = st(j, f);
      B && y.push(B);
    }
    if (y.length === 0) {
      const j = st(o, f);
      j && y.push(j);
    }
    return y;
  }, [st]), lr = p.useCallback((o) => {
    var _a2, _b;
    if (u !== "pen" && u !== "pressure" && u !== "highlighter" && u !== "laser" && u !== "eraser") return;
    o.preventDefault(), o.stopPropagation();
    const b = Fe(o, u === "pressure"), v = b[b.length - 1];
    if (!v) return;
    (_b = (_a2 = o.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, o.pointerId);
    const M = u === "eraser" ? "eraser" : u === "highlighter" ? "highlighter" : u === "laser" ? "laser" : u === "pressure" ? "pressure" : "pen", y = M === "laser" ? "#ef4444" : M === "highlighter" ? C : M === "eraser" ? "#000000" : g, j = hn(M), B = K(vt.current, 0.25, 12), Z = Ir(Math.max(0.5, j.w * B), R.w, R.h), de = Ir(Math.max(0.5, j.h * B), R.w, R.h), oe = M === "eraser" ? 1 : M === "laser" ? 0.9 : M === "highlighter" ? z : w, W = { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, seq: ++tr.current, kind: M, color: y, diameterX: Z, diameterY: de, points: [v], shape: ie, dash: ee, opacity: oe, ...M === "highlighter" ? { blend: P } : {} };
    if (we.current = W, ye.current = { ...v }, Gt(true), ln.current = 0, ve({ ...W, points: [...W.points] }), Ne(), M === "laser" && ze(W.id), (M === "pen" || M === "pressure") && Le.current && o.nativeEvent.isTrusted) try {
      const cs = Math.max(j.w, j.h);
      Le.current.updateInkTrailStartPoint(o.nativeEvent, { color: g, diameter: Math.max(1, cs * (M === "pressure" ? v.pressure : 1)) });
    } catch {
    }
  }, [u, g, C, z, w, P, ie, ee, Fe, hn, ze, Ne, pn]), cr = p.useCallback((o) => {
    const f = we.current;
    if (!f) return;
    o.preventDefault();
    const b = f.kind === "pressure", v = Fe(o, b);
    if (!v.length) return;
    const M = ye.current ?? f.points[f.points.length - 1];
    if (M && (ye.current = Oi(f.points, M, v), pn(), f.kind === "laser" && ze(f.id), (f.kind === "pen" || f.kind === "pressure") && Le.current && o.nativeEvent.isTrusted)) try {
      const y = ye.current, B = Wt(f) / Math.max(1e-3, vt.current);
      Le.current.updateInkTrailStartPoint(o.nativeEvent, { color: f.color, diameter: Math.max(1, B * (f.kind === "pressure" ? (y == null ? void 0 : y.pressure) ?? 1 : 1)) });
    } catch {
    }
  }, [Fe, pn, ze]), ur = p.useCallback((o) => {
    var _a2, _b;
    const f = we.current;
    if (!f) return;
    const b = f.kind === "pressure", v = Fe(o, b), M = v[v.length - 1];
    if (M && ye.current) {
      const j = Sa(ye.current, M, 1), B = f.points[f.points.length - 1];
      !B || B.x !== j.x || B.y !== j.y ? f.points.push(j) : B.pressure = j.pressure, ye.current = j;
    }
    we.current = null, ye.current = null, Se.current != null && (cancelAnimationFrame(Se.current), Se.current = null), Gt(false);
    try {
      (_b = (_a2 = o.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, o.pointerId);
    } catch {
    }
    if (f.points.length === 0) {
      ve(null), Ne();
      return;
    }
    const y = { ...f, points: [...f.points] };
    if (f.kind === "laser") {
      le((j) => [...j, y]), ze(f.id), ve(null), Ne();
      return;
    }
    if (ke([]), f.kind === "highlighter") F((j) => [...j, y]);
    else if (f.kind === "eraser") {
      D((j) => [...j, y]), F((j) => [...j, y]), ve(null), Ne();
      return;
    } else D((j) => [...j, y]);
    ve(null), Ne();
  }, [Fe, ze, Ne]), jt = p.useCallback((o) => {
    q && Y((f) => f.map((b) => b.id === q ? { ...b, ...o } : b));
  }, [q]), dr = p.useCallback((o) => {
    o.preventDefault(), o.stopPropagation();
    const f = st(o, false);
    if (!f) return;
    const b = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, v = { id: b, seq: ++tr.current, x: f.x, y: f.y, text: "", color: g, opacity: w, fontSizePx: be, fontFamily: ue, fontWeight: re, fontStyle: De };
    ke([]), Y((M) => [...M, v]), te(b), Q(b), window.setTimeout(() => {
      var _a2;
      return (_a2 = Ct.current) == null ? void 0 : _a2.focus();
    }, 30);
  }, [st, g, w, be, ue, re, De]), Ya = p.useCallback((o) => {
    if (o.button === 1 || u === "pan") {
      sr(o);
      return;
    }
    if (u === "text") {
      Q(null), dr(o);
      return;
    }
    te(null), Q(null), lr(o);
  }, [u, sr, lr, dr]), Qa = p.useCallback((o) => {
    if (!we.current) {
      const b = { x: o.clientX, y: o.clientY }, v = Re.current;
      v ? (Re.current = { x: v.x + (b.x - v.x) * 0.72, y: v.y + (b.y - v.y) * 0.72 }, cn.current == null && (cn.current = requestAnimationFrame(() => {
        cn.current = null, Re.current && wt({ ...Re.current });
      }))) : (Re.current = b, wt(b));
    }
    const f = et.current;
    if (f && f.pointerId === o.pointerId) {
      o.preventDefault();
      const b = St.current;
      if (!b) return;
      const v = b.getBoundingClientRect(), M = (o.clientX - f.startClientX) / Math.max(1, v.width) * R.w, y = (o.clientY - f.startClientY) / Math.max(1, v.height) * R.h;
      Y((j) => j.map((B) => B.id === f.id ? { ...B, x: f.originX + M, y: f.originY + y } : B));
      return;
    }
    if (Ie.current) {
      or(o);
      return;
    }
    we.current && cr(o);
  }, [or, cr, R.w, R.h]), fr = p.useCallback((o) => {
    var _a2, _b, _c2;
    if (((_a2 = et.current) == null ? void 0 : _a2.pointerId) === o.pointerId) {
      et.current = null;
      try {
        (_c2 = (_b = o.currentTarget).releasePointerCapture) == null ? void 0 : _c2.call(_b, o.pointerId);
      } catch {
      }
    }
    Ie.current && ir(o), we.current && ur(o);
  }, [ir, ur]), ot = p.useCallback(() => {
    var _a2;
    const o = ne ?? q;
    try {
      (_a2 = Ct.current) == null ? void 0 : _a2.blur();
    } catch {
    }
    if (o) {
      const f = Ze.current.find((b) => b.id === o);
      f && !f.text.trim() && (Y((b) => b.filter((v) => v.id !== o)), te(null));
    }
    Q(null);
  }, [ne, q]), mn = p.useCallback(() => {
    const o = q;
    if (!o) return;
    const f = Ze.current.find((b) => b.id === o);
    f && (un.current.push({ ...f }), ke([]), Y((b) => b.filter((v) => v.id !== o)), te(null), Q(null));
  }, [q]), gn = p.useCallback(() => {
    const o = un.current.pop();
    if (o) {
      Y((W) => [...W, o]), te(o.id), Q(null);
      return;
    }
    const f = Gn.current, b = Jn.current, v = Ze.current, M = f[f.length - 1], y = b[b.length - 1], j = v[v.length - 1], B = (M == null ? void 0 : M.seq) ?? -1, Z = (y == null ? void 0 : y.seq) ?? -1, de = (j == null ? void 0 : j.seq) ?? -1, oe = Math.max(B, Z, de);
    if (!(oe < 0)) {
      if (de === oe && j) {
        ke((W) => [...W, { layer: "text", text: j }]), Y(v.slice(0, -1)), te((W) => W === j.id ? null : W);
        return;
      }
      if (M && y && M.id === y.id && M.kind === "eraser" && M.seq === oe) {
        ke((W) => [...W, { layer: "both", stroke: M }]), D(f.slice(0, -1)), F(b.slice(0, -1));
        return;
      }
      if (B >= Z && M && B === oe) {
        ke((W) => [...W, { layer: "ink", stroke: M }]), D(f.slice(0, -1));
        return;
      }
      y && Z === oe && (ke((W) => [...W, { layer: "highlight", stroke: y }]), F(b.slice(0, -1)));
    }
  }, []), xn = p.useCallback(() => {
    ke((o) => {
      if (!o.length) return o;
      const f = o[o.length - 1];
      return f ? (f.layer === "text" ? Y((b) => [...b, f.text]) : f.layer === "both" || f.stroke.kind === "eraser" ? (D((b) => [...b, f.stroke]), F((b) => [...b, f.stroke])) : f.layer === "ink" ? D((b) => [...b, f.stroke]) : F((b) => [...b, f.stroke]), o.slice(0, -1)) : o;
    });
  }, []), bn = p.useCallback((o) => {
    L((f) => Pr(f, o)), N((f) => Pr(f, o));
  }, []), hr = p.useCallback((o) => {
    var _a2;
    const f = q, b = (f ? (_a2 = Ze.current.find((M) => M.id === f)) == null ? void 0 : _a2.fontSizePx : null) ?? be, v = rl(b, o);
    G(v), f && Y((M) => M.map((y) => y.id === f ? { ...y, fontSizePx: v } : y));
  }, [q, be]), Ga = p.useCallback((o) => {
    const f = Ve(K(o, Ce, Ee));
    L(f), N(f);
  }, []), Ja = p.useCallback(() => {
    se("highlighter");
  }, [se]), Et = p.useCallback(async (o) => {
    if (!a || !e || Ge) return;
    const f = ae.some((b) => b.text.trim().length > 0);
    if (!(T.length === 0 && H.length === 0 && !f)) {
      Xn(true), Zt(null);
      try {
        const b = Ki(R.w, R.h, T), v = b.getContext("2d");
        v && qi(v, ae, vt.current);
        const M = Wi(R.w, R.h, H), y = await Ai({ src: e, inkCanvas: b, highlightCanvas: M }), j = new File([y], `annotated-${Date.now()}.png`, { type: "image/png" });
        await a(o, j);
      } catch (b) {
        Zt(b instanceof Error ? b.message : String(b));
      } finally {
        Xn(false);
      }
    }
  }, [a, e, Ge, T, H, ae, R.w, R.h]), kn = T.length + H.length + ae.length, pr = kn > 0 || !!J || Qt, Tt = p.useCallback(() => {
    if (pr) {
      Je(true);
      return;
    }
    Je(false), r();
  }, [pr, r]), Za = p.useCallback(() => {
    Je(false), r();
  }, [r]), es = p.useCallback(() => {
    Je(false);
  }, []);
  p.useEffect(() => {
    if (!s) return;
    const o = (f) => {
      var _a2;
      const b = f.target, v = (_a2 = b == null ? void 0 : b.tagName) == null ? void 0 : _a2.toLowerCase(), M = v === "input" || v === "textarea" || (b == null ? void 0 : b.isContentEditable), y = ja ? f.metaKey : f.ctrlKey, j = f.key.toLowerCase(), B = f.code;
      if (y && j === "s") {
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Et(f.shiftKey ? "saveAs" : "overwrite");
        return;
      }
      if (y && j === "z" && !f.shiftKey) {
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), gn();
        return;
      }
      if (y && (j === "y" || j === "z" && f.shiftKey)) {
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), xn();
        return;
      }
      const Z = !!q || u === "text", de = y && (f.shiftKey && (f.key === "<" || f.key === "," || B === "Comma") || !f.shiftKey && (f.key === "[" || B === "BracketLeft")), oe = y && (f.shiftKey && (f.key === ">" || f.key === "." || B === "Period") || !f.shiftKey && (f.key === "]" || B === "BracketRight"));
      if (Z && (de || oe)) {
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), hr(de ? -1 : 1);
        return;
      }
      if (f.key === "Escape") {
        if (rn) return;
        if (u === "text" || ne) {
          f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), ne ? ot() : te(null);
          return;
        }
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), Tt();
        return;
      }
      if (q && !y && (j === "backspace" || j === "delete")) {
        if (ne && M && v === "textarea" && b.value.length > 0) return;
        f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), mn();
        return;
      }
      if (!M) {
        if (!y && f.key === "[") {
          f.preventDefault(), f.stopPropagation(), bn(-1);
          return;
        }
        !y && f.key === "]" && (f.preventDefault(), f.stopPropagation(), bn(1));
      }
    };
    return window.addEventListener("keydown", o, true), () => window.removeEventListener("keydown", o, true);
  }, [s, Et, gn, xn, bn, hr, q, ne, u, ot, mn, Tt, rn]);
  const ts = u !== "pan" && u !== "text" && kt != null && !Ie.current && !Qt, mr = hn(u === "eraser" ? "eraser" : u === "highlighter" ? "highlighter" : u === "laser" ? "laser" : u === "pressure" ? "pressure" : "pen"), gr = Math.max(4, mr.w * l), xr = Math.max(4, mr.h * l), ns = T.filter((o) => o.kind === "eraser"), rs = T.filter((o) => o.kind !== "eraser"), as = H.filter((o) => o.kind === "eraser"), ss = H.filter((o) => o.kind !== "eraser"), os = Qt && u === "highlighter" ? { mixBlendMode: P } : {}, br = no(We(rt) || "#111827ff"), is = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", it = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [lt, ls] = p.useState(null);
  return i.jsxs(i.Fragment, { children: [i.jsx(ti, { open: s, onOpenChange: (o) => {
    o || Tt();
  }, children: i.jsx(yn, { children: s ? i.jsxs(ni, { forceMount: true, children: [i.jsx(ri, { asChild: true, forceMount: true, children: i.jsx(Ke.div, { className: "fixed inset-0 z-100060 bg-black/85", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: Xi }) }), i.jsx(ai, { asChild: true, forceMount: true, onOpenAutoFocus: (o) => o.preventDefault(), onEscapeKeyDown: (o) => {
    o.preventDefault();
  }, children: i.jsxs(Ke.div, { ref: ls, className: "fixed inset-0 z-100061 flex flex-col outline-none", "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30", initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: Yi, children: [i.jsx(si, { className: "sr-only", children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30" }), i.jsx(oi, { className: "sr-only", children: "\uBCA1\uD130 \uD39C\uC73C\uB85C \uADF8\uB9AC\uACE0 \uD655\uB300/\uCD95\uC18C\xB7\uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), i.jsx("div", { ref: Ua, className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${u === "pan" ? "cursor-grab" : u === "text" ? "cursor-text" : "cursor-none"}`, onPointerDown: Ya, onPointerMove: Qa, onPointerUp: fr, onPointerCancel: fr, onPointerLeave: () => {
    wt(null), Re.current = null;
  }, children: e ? i.jsx("div", { className: "relative will-change-transform", style: { transform: `translate(${d.x}px, ${d.y}px) scale(${l})`, transformOrigin: "center center" }, onClick: (o) => o.stopPropagation(), children: i.jsxs("div", { ref: St, className: "relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl", style: el, children: [i.jsx("img", { ref: sn, src: e, alt: t || "", className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none", draggable: false, onDoubleClick: Xa }), i.jsxs("svg", { className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none", viewBox: `0 0 ${R.w} ${R.h}`, preserveAspectRatio: "none", "aria-hidden": true, children: [i.jsxs("defs", { children: [i.jsxs("mask", { id: "haim-ink-erase-mask", children: [i.jsx("rect", { x: "0", y: "0", width: R.w, height: R.h, fill: "#fff" }), ns.map((o) => i.jsx(fe, { stroke: o }, `em-${o.id}`)), (J == null ? void 0 : J.kind) === "eraser" ? i.jsx(fe, { stroke: J }) : null] }), i.jsxs("mask", { id: "haim-hi-erase-mask", children: [i.jsx("rect", { x: "0", y: "0", width: R.w, height: R.h, fill: "#fff" }), as.map((o) => i.jsx(fe, { stroke: o }, `hem-${o.id}`)), (J == null ? void 0 : J.kind) === "eraser" ? i.jsx(fe, { stroke: J }) : null] })] }), i.jsxs("g", { mask: "url(#haim-ink-erase-mask)", children: [rs.map((o) => i.jsx(fe, { stroke: o }, o.id)), J && (J.kind === "pen" || J.kind === "pressure") ? i.jsx(fe, { stroke: J }) : null] }), i.jsxs("g", { mask: "url(#haim-hi-erase-mask)", style: { mixBlendMode: P }, children: [ss.map((o) => i.jsx("g", { style: { mixBlendMode: o.blend || P }, children: i.jsx(fe, { stroke: o }) }, o.id)), (J == null ? void 0 : J.kind) === "highlighter" ? i.jsx("g", { style: { mixBlendMode: J.blend || P }, children: i.jsx(fe, { stroke: J }) }) : null] }), i.jsxs("g", { children: [U.map((o) => i.jsx(fe, { stroke: o, fading: Fa.has(o.id) }, o.id)), (J == null ? void 0 : J.kind) === "laser" ? i.jsx(fe, { stroke: J }) : null] })] }), i.jsx("canvas", { ref: on, className: "pointer-events-none absolute inset-0 h-full w-full", width: R.w, height: R.h, style: os, "aria-hidden": true }), ae.map((o) => {
    const f = o.id === q, b = o.id === ne, v = o.x / Math.max(1, R.w) * 100, M = o.y / Math.max(1, R.h) * 100;
    return i.jsx("div", { className: `absolute z-1 min-w-8 max-w-[90%] ${f ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`, style: { left: `${v}%`, top: `${M}%`, color: o.color, opacity: o.opacity, fontFamily: o.fontFamily, fontSize: `${o.fontSizePx}px`, fontWeight: o.fontWeight, fontStyle: o.fontStyle, lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word", cursor: u === "text" || f ? "move" : "default", pointerEvents: u === "text" || f ? "auto" : "none" }, onPointerDown: (y) => {
      var _a2, _b;
      u !== "text" && u !== "pan" || (y.stopPropagation(), y.preventDefault(), se("text"), ne && ne !== o.id && ot(), Q(null), te(o.id), ce(o.fontFamily), G(o.fontSizePx), bt(o.fontWeight), Xt(o.fontStyle), et.current = { id: o.id, pointerId: y.pointerId, startClientX: y.clientX, startClientY: y.clientY, originX: o.x, originY: o.y }, (_b = (_a2 = y.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, y.pointerId));
    }, onDoubleClick: (y) => {
      y.stopPropagation(), y.preventDefault(), se("text"), te(o.id), Q(o.id), ce(o.fontFamily), G(o.fontSizePx), bt(o.fontWeight), Xt(o.fontStyle), window.setTimeout(() => {
        var _a2;
        return (_a2 = Ct.current) == null ? void 0 : _a2.focus();
      }, 20);
    }, children: b ? i.jsx("textarea", { ref: Ct, value: o.text, rows: Math.max(1, o.text.split(`
`).length), placeholder: "\uD14D\uC2A4\uD2B8 \uC785\uB825", className: "block w-full min-w-24 resize-none border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-white/40", style: { fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", fontStyle: "inherit", lineHeight: "inherit", color: "inherit", fieldSizing: "content" }, onPointerDown: (y) => y.stopPropagation(), onChange: (y) => {
      const j = y.target.value;
      Y((B) => B.map((Z) => Z.id === o.id ? { ...Z, text: j } : Z));
    }, onBlur: () => {
      ne === o.id && ot();
    }, onKeyDown: (y) => {
      if (y.key === "Escape") {
        y.preventDefault(), y.stopPropagation(), ot();
        return;
      }
      (y.key === "Backspace" || y.key === "Delete") && y.currentTarget.value.length === 0 && (y.preventDefault(), y.stopPropagation(), mn());
    } }) : i.jsx("span", { className: "block", children: o.text || "\uD14D\uC2A4\uD2B8" }) }, o.id);
  })] }) }) : null }), ts && kt ? i.jsx("div", { className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow", style: { left: kt.x - gr / 2, top: kt.y - xr / 2, width: gr, height: xr, borderRadius: ie === "circle" ? "9999px" : "2px", borderStyle: ee === "dashed" ? "dashed" : "solid", opacity: K(Va, 0.25, 0.85), backgroundColor: u === "eraser" ? "transparent" : We(rt) || void 0 }, "aria-hidden": true }) : null, (u === "text" || nt) && i.jsxs("aside", { className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md", onPointerDown: (o) => o.stopPropagation(), children: [i.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/90", children: [i.jsx(jn, { size: 14, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"] }), i.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [i.jsx("span", { children: "Font family" }), i.jsx(ro, { value: (nt == null ? void 0 : nt.fontFamily) ?? ue, onChange: (o) => {
    ce(o), jt({ fontFamily: o });
  }, className: "w-full", inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs", allowAddWebfont: true })] }), i.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [i.jsx("span", { children: "Font size" }), i.jsxs("div", { className: "flex items-center gap-1", children: [i.jsx("input", { type: "number", min: In, max: Nn, step: 1, value: (nt == null ? void 0 : nt.fontSizePx) ?? be, onChange: (o) => {
    const f = K(Math.round(Number(o.target.value) || 24), In, Nn);
    G(f), jt({ fontSizePx: f });
  }, className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white", "aria-label": "Font size (px)" }), i.jsx("span", { className: "shrink-0 text-white/60", children: "px" })] })] }), i.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [i.jsx("span", { children: "Font weight" }), i.jsxs(ut, { value: (nt == null ? void 0 : nt.fontWeight) ?? re, onValueChange: (o) => {
    bt(o), jt({ fontWeight: o });
  }, children: [i.jsx(dt, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font weight", children: i.jsx(Sn, {}) }), i.jsx(ft, { container: lt, children: i.jsx(ht, { className: it, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (o) => o.preventDefault(), children: i.jsx(pt, { className: "p-1", children: Di.map((o) => i.jsx(Me, { value: o.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: i.jsx(je, { children: o.label }) }, o.value)) }) }) })] })] }), i.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [i.jsx("span", { children: "Font style" }), i.jsxs(ut, { value: (nt == null ? void 0 : nt.fontStyle) ?? De, onValueChange: (o) => {
    const f = o === "italic" ? "italic" : "normal";
    Xt(f), jt({ fontStyle: f });
  }, children: [i.jsx(dt, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font style", children: i.jsx(Sn, {}) }), i.jsx(ft, { container: lt, children: i.jsx(ht, { className: it, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (o) => o.preventDefault(), children: i.jsxs(pt, { className: "p-1", children: [i.jsx(Me, { value: "normal", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: i.jsx(je, { children: "Normal" }) }), i.jsx(Me, { value: "italic", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: i.jsx(je, { children: "Italic" }) })] }) }) })] })] }), i.jsxs("p", { className: "text-[10px] leading-4 text-white/45", children: ["\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9", i.jsx("br", {}), "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1", i.jsx("br", {}), pe, "+[ ] / ", pe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30"] })] }), i.jsx(xt, { delayDuration: 250, skipDelayDuration: 0, children: i.jsxs("div", { className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1", onPointerDown: (o) => o.stopPropagation(), children: [i.jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md", children: [i.jsx(X, { label: "\uD328\uB2DD", active: u === "pan", onClick: () => se("pan"), children: i.jsx(ho, { size: 16 }) }), i.jsx(X, { label: "\uC77C\uBC18 \uD39C", active: u === "pen", onClick: () => se("pen"), children: i.jsx(po, { size: 16 }) }), i.jsx(X, { label: "\uD544\uC555 \uD39C", active: u === "pressure", onClick: () => se("pressure"), children: i.jsx(mo, { size: 16 }) }), i.jsx(X, { label: "\uD615\uAD11\uD39C", active: u === "highlighter", onClick: Ja, children: i.jsx(go, { size: 16 }) }), i.jsx(X, { label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)", active: u === "laser", onClick: () => se("laser"), children: i.jsx(xo, { size: 16 }) }), i.jsx(X, { label: "\uC9C0\uC6B0\uAC1C", active: u === "eraser", onClick: () => se("eraser"), children: i.jsx(bo, { size: 16 }) }), i.jsx(X, { label: "\uD14D\uC2A4\uD2B8", active: u === "text", onClick: () => se("text"), children: i.jsx(jn, { size: 16 }) }), i.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), i.jsxs("div", { className: "relative flex items-center", children: [i.jsx("button", { type: "button", "aria-label": "\uD39C \uC0C9\uC0C1", "aria-expanded": nn, onClick: () => {
    Qn((o) => (o && tn(false), !o));
  }, className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow", style: { backgroundColor: We(rt) || "#111827" } }), i.jsx(yn, { mode: "popLayout", children: nn ? i.jsxs(Ke.div, { initial: { opacity: 0, y: 16, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.9 }, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 }, className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md", children: [(u === "highlighter" ? Zi : Ji).map((o, f, b) => {
    const v = (We(rt) || "").slice(0, 7).toLowerCase() === o.toLowerCase(), M = 0.03 * (b.length - f);
    return i.jsx(Ke.button, { type: "button", "aria-label": `\uC0C9\uC0C1 ${o}`, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: M }, onClick: () => {
      tn(false), u === "highlighter" ? k(`${o}ff`) : (x(`${o}ff`), (u === "pan" || u === "eraser" || u === "laser") && se("pen")), Qn(false);
    }, className: `h-7 w-7 rounded-full border-2 shadow ${v ? "border-sky-300 scale-110" : "border-white/40"}`, style: { backgroundColor: o } }, o);
  }), i.jsx(Ke.button, { type: "button", "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1", "aria-pressed": en, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: 0 }, onClick: () => tn((o) => !o), className: `h-7 w-7 rounded-full border-2 shadow ${en ? "border-sky-300 scale-110" : "border-white/50"}`, style: sl })] }, "haim-color-palette") : null }), i.jsx(yn, { children: nn && en ? i.jsxs(Ke.div, { initial: { opacity: 0, x: -6, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 }, transition: { duration: 0.18, ease: Wn }, className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md", children: [i.jsx("div", { className: "mb-2 h-8 w-full rounded border border-white/20", style: { ...ao, backgroundColor: rt } }), i.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: i.jsx(eo, { color: br, onChange: (o) => {
    const f = We(o.startsWith("#") ? o : `#${o}`);
    f && (u === "highlighter" ? k(f) : (x(f), (u === "pan" || u === "eraser" || u === "laser") && se("pen")));
  } }) }), i.jsx(to, { alpha: true, prefixed: true, color: br, onChange: (o) => {
    const f = We(o.startsWith("#") ? o : `#${o}`);
    f && (u === "highlighter" ? k(f) : x(f));
  }, className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white" })] }, "haim-color-picker") : null })] }), i.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), u === "highlighter" ? i.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [i.jsxs("label", { className: "flex items-center gap-0.5", children: [i.jsx("span", { className: "opacity-70", children: "W" }), i.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" }), i.jsx("input", { type: "number", min: Ce, max: Ee, step: 0.1, value: S, onChange: (o) => L(Ve(K(Number(o.target.value) || 1, Ce, Ee))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" })] }), i.jsx("span", { className: "opacity-50", "aria-hidden": true, children: "\xD7" }), i.jsxs("label", { className: "flex items-center gap-0.5", children: [i.jsx("span", { className: "opacity-70", children: "H" }), i.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" }), i.jsx("input", { type: "number", min: Ce, max: Ee, step: 0.1, value: O, onChange: (o) => N(Ve(K(Number(o.target.value) || 1, Ce, Ee))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" })] }), i.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }) : i.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [i.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), i.jsx("input", { type: "number", min: Ce, max: Ee, step: 0.1, value: S, onChange: (o) => Ga(Number(o.target.value) || 1), className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), i.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }), i.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [i.jsx("span", { className: "opacity-70", children: "\uD750\uB984" }), i.jsx("input", { type: "number", min: 5, max: 100, step: 5, value: Math.round((u === "highlighter" ? z : w) * 100), onChange: (o) => {
    const b = K(Number(o.target.value) || 5, 5, 100) / 100;
    u === "highlighter" ? A(b) : I(b);
  }, className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uD750\uB984 (%)" }), i.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "%" })] }), i.jsxs(ut, { value: ie, onValueChange: (o) => He(o), children: [i.jsx(dt, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ie === "circle" ? "\uC6D0" : "\uB124\uBAA8", children: ie === "circle" ? i.jsx(Mr, { size: 16 }) : i.jsx(jr, { size: 16 }) }), i.jsx(ft, { container: lt, children: i.jsx(ht, { className: it, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (o) => o.preventDefault(), children: i.jsxs(pt, { className: "p-1", children: [i.jsxs(Me, { value: "circle", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uC6D0", children: [i.jsx(Mr, { size: 16 }), i.jsx(je, { className: "sr-only", children: "\uC6D0" })] }), i.jsxs(Me, { value: "square", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uB124\uBAA8", children: [i.jsx(jr, { size: 16 }), i.jsx(je, { className: "sr-only", children: "\uB124\uBAA8" })] })] }) }) })] }), i.jsxs(ut, { value: ee, onValueChange: (o) => E(o), children: [i.jsx(dt, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ee === "dashed" ? "Dashed" : "Solid", children: ee === "dashed" ? i.jsx(Rr, { size: 16 }) : i.jsx(Dr, { size: 16 }) }), i.jsx(ft, { container: lt, children: i.jsx(ht, { className: it, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (o) => o.preventDefault(), children: i.jsxs(pt, { className: "p-1", children: [i.jsxs(Me, { value: "solid", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Solid", children: [i.jsx(Dr, { size: 16 }), i.jsx(je, { className: "sr-only", children: "Solid" })] }), i.jsxs(Me, { value: "dashed", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Dashed", children: [i.jsx(Rr, { size: 16 }), i.jsx(je, { className: "sr-only", children: "Dashed" })] })] }) }) })] }), u === "highlighter" ? i.jsxs(ut, { value: P, onValueChange: (o) => V(o), children: [i.jsx(dt, { className: is, "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC", children: i.jsx(Sn, { placeholder: "Blend" }) }), i.jsx(ft, { container: lt, children: i.jsx(ht, { className: `${it} max-h-56 overflow-auto`, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (o) => o.preventDefault(), children: i.jsx(pt, { className: "p-1", children: Ri.map((o) => i.jsx(Me, { value: o.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: i.jsx(je, { children: o.label }) }, o.value)) }) }) })] }) : null, i.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), i.jsx(X, { label: `\uC2E4\uD589 \uCDE8\uC18C (${pe}+Z)`, disabled: kn === 0, onClick: gn, children: i.jsx(ua, { size: 16 }) }), i.jsx(X, { label: `\uB2E4\uC2DC \uC2E4\uD589 (${Hr})`, disabled: Ka.length === 0, onClick: xn, children: i.jsx(da, { size: 16 }) }), i.jsx(X, { label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30", disabled: kn === 0 && U.length === 0, onClick: dn, children: i.jsx(ko, { size: 16 }) }), i.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), i.jsx(X, { label: "\uCD95\uC18C", onClick: () => {
    var _a2;
    const o = (_a2 = yt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!o) {
      c((f) => K(f / qe, It, Nt));
      return;
    }
    _e(l / qe, o.left + o.width / 2, o.top + o.height / 2);
  }, children: i.jsx(wo, { size: 16 }) }), i.jsxs("span", { className: "min-w-10 text-center text-[11px] tabular-nums text-white/80", children: [Math.round(l * 100), "%"] }), i.jsx(X, { label: "\uD655\uB300", onClick: () => {
    var _a2;
    const o = (_a2 = yt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!o) {
      c((f) => K(f * qe, It, Nt));
      return;
    }
    _e(l * qe, o.left + o.width / 2, o.top + o.height / 2);
  }, children: i.jsx(yo, { size: 16 }) }), i.jsx(X, { label: "\uBCF4\uAE30 \uCD08\uAE30\uD654", onClick: at, children: i.jsx(So, { size: 16 }) }), i.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), i.jsx(X, { label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${pe}+S)`, tone: "save", disabled: !nr || Ge, onClick: () => {
    Et("overwrite");
  }, children: i.jsx(Co, { size: 16 }) }), i.jsx(X, { label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${pe}+Shift+S)`, tone: "saveAs", disabled: !nr || Ge, onClick: () => {
    Et("saveAs");
  }, children: i.jsx(vo, { size: 16 }) })] }), i.jsxs("p", { className: "max-w-xl text-center text-[10px] text-white/55", children: ["\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ", pe, "+[ ] / ", pe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ", pe, "+Z / ", Hr, qa ? " \xB7 Ink API" : "", Ge ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""] }), Yn ? i.jsx("p", { className: "max-w-xl text-center text-[10px] text-red-300", children: Yn }) : null] }) }), i.jsx("button", { type: "button", className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80", "aria-label": "\uB2EB\uAE30", onClick: Tt, children: i.jsx(Mo, { size: 20 }) })] }) })] }, "haim-image-lightbox") : null }) }), i.jsx(so, { isOpen: rn, title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30", cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1", variant: "danger", overlayClassName: "z-100070", onConfirm: Za, onCancel: es })] });
}
function ol({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
  const s = String(e.attrs.src || ""), l = String(e.attrs.alt || ""), c = String(e.attrs.title || ""), d = n.isEditable, [h, u] = p.useState(false), [m, g] = p.useState(null), x = p.useCallback((S) => {
    if (S.detail > 1) return;
    S.preventDefault(), S.stopPropagation();
    const L = typeof r == "function" ? r() : null;
    typeof L == "number" && n.chain().focus().setNodeSelection(L).run();
  }, [n, r]), C = p.useCallback((S) => {
    S.preventDefault(), S.stopPropagation(), s && (g(s), u(true));
  }, [s]), k = p.useCallback(async (S, L) => {
    if (!d) return;
    const O = await va(L), N = typeof r == "function" ? r() : null, w = URL.createObjectURL(L);
    if (S === "overwrite") {
      typeof N == "number" ? n.chain().focus().deleteRange({ from: N, to: N + e.nodeSize }).insertContentAt(N, { type: "wikiImage", attrs: { path: O, options: "", alt: O, width: null, height: null, background: null } }).run() : a({ src: w }), g(w);
      return;
    }
    if (typeof N != "number") return;
    const I = N + e.nodeSize;
    n.chain().focus().insertContentAt(I, { type: "wikiImage", attrs: { path: O, options: "", alt: O, width: null, height: null, background: null } }).run();
  }, [d, n, r, a, e.nodeSize]);
  return i.jsxs(ge, { as: "span", className: `haim-stock-image-wrap${t ? " is-selected" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: x, onDoubleClick: C, children: [i.jsx("img", { src: s, alt: l, ...c ? { title: c } : {}, className: "haim-stock-image max-w-full h-auto cursor-pointer", draggable: false }), i.jsx(Ea, { src: m || s || null, alt: l, open: h, onClose: () => {
    u(false), g(null);
  }, ...d ? { onSaveAnnotated: k } : {} })] });
}
let An = null;
function Tu(e) {
  An = e;
}
function $n(e) {
  const t = String(e || "").trim().replace(/^\/+/, "");
  return !t || typeof An != "function" ? false : (An(t), true);
}
function il(e, t) {
  const n = String(e || "").trim();
  if (!n) return;
  const r = sa(n);
  if (r) {
    $n(r);
    return;
  }
  if (oa(n)) return;
  const a = String((t == null ? void 0 : t.target) || "_blank").trim(), s = !a || a === "_self" ? "_blank" : a;
  window.open(n, s, "noopener,noreferrer");
}
const Br = "haim-mod-held";
function ll(e, t) {
  let n = null;
  if (t.target instanceof HTMLAnchorElement) n = t.target;
  else {
    const r = t.target;
    if (!r) return null;
    n = r.closest("a");
  }
  return !n || !e.view.dom.contains(n) ? null : n;
}
function cl(e, t, n) {
  const r = ds(e.state, t.name), a = String(r.href || "").trim();
  return a || String(n.getAttribute("href") || n.href || "").trim();
}
function ul() {
  return new Xe({ key: new Pe("haimLinkModCursor"), view(e) {
    const t = (c) => {
      e.dom.classList.toggle(Br, c);
    }, n = (c) => {
      t(!!(c.ctrlKey || c.metaKey));
    }, r = (c) => {
      (c.key === "Control" || c.key === "Meta" || c.ctrlKey || c.metaKey) && t(true);
    }, a = (c) => {
      n(c);
    }, s = () => t(false), l = (c) => {
      n(c);
    };
    return window.addEventListener("keydown", r, true), window.addEventListener("keyup", a, true), window.addEventListener("blur", s), e.dom.addEventListener("mousemove", l), { destroy() {
      window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", a, true), window.removeEventListener("blur", s), e.dom.removeEventListener("mousemove", l), e.dom.classList.remove(Br);
    } };
  } });
}
function dl(e, t, n, r) {
  if (r.button !== 0) return false;
  const a = ll(e, r);
  if (!a) return false;
  const s = cl(n, t, a);
  if (!s) return false;
  const l = sa(s), c = oo(), d = r.metaKey || r.ctrlKey;
  if (n.editable) {
    if (r.preventDefault(), !d && !c) return true;
    if (l) return r.stopPropagation(), $n(l), true;
    const h = (a.getAttribute("target") || a.target || "_blank").trim();
    return il(s, { target: h }), true;
  }
  return l ? (r.preventDefault(), r.stopPropagation(), $n(l), true) : false;
}
function fl(e, t) {
  return new Xe({ key: new Pe("haimLinkClick"), props: { handleDOMEvents: { click: (n, r) => dl(e, t, n, r) } } });
}
const hl = us.extend({ renderHTML({ HTMLAttributes: e }) {
  const t = String(e.href || ""), n = oa(t);
  return ["a", xe(this.options.HTMLAttributes, e, { class: n ? "haim-docuhaim-link" : null }), 0];
}, addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], ul(), fl(this.editor, this.type)];
} }).configure({ openOnClick: false, autolink: true, protocols: ["docuhaim"], HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } });
function Or(e) {
  if (!e || typeof e != "object") return;
  const t = e;
  t.__haimRawTextPatched || (t.encodeTextForMarkdown = (n) => n, t.escapeMarkdownSyntax = (n) => n, t.__haimRawTextPatched = true);
}
const pl = fs.extend({ onBeforeCreate(e) {
  var _a2, _b, _c2;
  (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
  const t = (_b = this.storage) == null ? void 0 : _b.manager;
  t && Or(t), ((_c2 = this.editor) == null ? void 0 : _c2.markdown) && Or(this.editor.markdown);
} }), ml = /^\s*(\[([ xX~]?)\])\s$/, gl = /^\s*[-*+]\s*\[([ xX~])\]\s$/;
function _r(e) {
  return xa(e === void 0 || e === "" ? " " : e);
}
function Pn(e) {
  const t = mt(e), n = Pt(e);
  return { status: t, checked: t === "done", kind: t === "doing" ? "status" : n };
}
function zr(e, t, n) {
  var _a2, _b;
  const r = e.schema.nodes.taskItem, a = e.schema.nodes.taskList;
  if (!r || !a) return null;
  const s = e.doc.resolve(t.from);
  let l = -1, c = -1;
  for (let g = s.depth; g >= 1; g -= 1) {
    const x = s.node(g).type.name;
    l < 0 && x === "listItem" && (l = g), c < 0 && (x === "bulletList" || x === "orderedList") && (c = g);
  }
  const d = e.tr.delete(t.from, t.to);
  if (l > 0 && c > 0) {
    const g = s.before(c), x = s.index(c), C = d.mapping.map(g), k = d.doc.nodeAt(C);
    if (!k) return null;
    const S = [];
    k.forEach((N, w, I) => {
      const z = I === x ? n : N.type.name === "taskItem" ? Pn(N.attrs) : { status: "todo", checked: false, kind: "check" };
      S.push(r.create(z, N.content, N.marks));
    });
    const L = a.create(k.attrs, S);
    d.replaceWith(C, C + k.nodeSize, L), wn(d.doc, C) && ((_a2 = d.doc.resolve(C).nodeBefore) == null ? void 0 : _a2.type) === a && d.join(C);
    const O = d.doc.nodeAt(C);
    if (O) {
      const N = C + O.nodeSize;
      wn(d.doc, N) && ((_b = d.doc.nodeAt(N)) == null ? void 0 : _b.type) === a && d.join(N);
    }
    return;
  }
  const h = d.doc.resolve(t.from).blockRange(), u = h && ms(h, r, n);
  if (!u) return null;
  d.wrap(h, u);
  const m = d.doc.resolve(t.from - 1).nodeBefore;
  m && m.type === r && wn(d.doc, t.from - 1) && d.join(t.from - 1);
}
function Cn(e, t, n, r) {
  t.dataset.status = n, t.dataset.kind = r, t.dataset.checked = n === "done" ? "true" : "false", e.dataset.status = n, e.dataset.kind = r, e.className = r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", e.checked = n === "done", e.indeterminate = n === "doing", e.setAttribute("aria-checked", n === "doing" ? "mixed" : n === "done" ? "true" : "false"), e.setAttribute("aria-label", r === "status" ? n === "doing" ? "Status task in progress" : n === "done" ? "Status task completed" : "Status task not started" : n === "done" ? "Task completed" : "Task not started");
}
const xl = hs.extend({ addStorage() {
  return { preferredKind: "check" };
}, addCommands() {
  return { setHaimTaskCheckboxPreferredKind: (e) => () => (this.storage.preferredKind = e === "status" ? "status" : "check", true) };
}, addAttributes() {
  return { kind: { default: "check", keepOnSplit: false, parseHTML: (e) => {
    const t = e.getAttribute("data-kind"), n = e.getAttribute("data-status");
    return Lr(t, n === "todo" || n === "doing" || n === "done" ? n : void 0);
  }, renderHTML: (e) => ({ "data-kind": Pt(e) }) }, status: { default: "todo", keepOnSplit: false, parseHTML: (e) => {
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
  const n = mt(e.attrs), r = Pt(e.attrs);
  return ["li", xe(this.options.HTMLAttributes, t, { "data-type": this.name, "data-status": n, "data-kind": r, "data-checked": n === "done" ? "true" : "false" }), ["label", ["input", { type: "checkbox", class: r === "status" ? "task-list-item-checkbox task-list-item-checkbox--status" : "task-list-item-checkbox", checked: n === "done" ? "checked" : null, "data-status": n, "data-kind": r, "aria-checked": n === "doing" ? "mixed" : n === "done" ? "true" : "false" }], ["span"]], ["div", 0]];
}, parseMarkdown: (e, t) => {
  const n = [];
  e.tokens && e.tokens.length > 0 ? n.push(t.createNode("paragraph", {}, t.parseInline(e.tokens))) : e.text ? n.push(t.createNode("paragraph", {}, [t.createNode("text", { text: e.text })])) : n.push(t.createNode("paragraph", {}, [])), e.nestedTokens && e.nestedTokens.length > 0 && n.push(...t.parseChildren(e.nestedTokens));
  const r = e.status === "todo" || e.status === "doing" || e.status === "done" ? e.status : e.checked ? "done" : "todo", a = e.kind === "status" || e.kind === "check" ? Lr(e.kind, r) : r === "doing" ? "status" : "check";
  return t.createNode("taskItem", { status: r, checked: r === "done", kind: a }, n);
}, renderMarkdown: (e, t) => {
  const n = mt(e == null ? void 0 : e.attrs), r = Pt(e == null ? void 0 : e.attrs), s = `- [${fi(n, r)}] `;
  return ps(e, t, s);
}, addNodeView() {
  return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
    const a = document.createElement("li"), s = document.createElement("label"), l = document.createElement("input"), c = document.createElement("div");
    let d = e;
    s.contentEditable = "false", l.type = "checkbox";
    const h = (g) => {
      const x = Pn(g.attrs);
      Cn(l, a, x.status, x.kind);
    };
    h(e);
    const u = (g) => {
      if (typeof n != "function") return;
      const x = n();
      if (typeof x != "number") return;
      const { state: C, dispatch: k } = r.view, S = C.doc.nodeAt(x);
      !S || S.type !== this.type || k(C.tr.setNodeMarkup(x, void 0, { ...S.attrs, status: g.status, checked: g.checked, kind: g.kind }));
    }, m = (g) => {
      var _a2;
      g.preventDefault(), g.stopPropagation();
      const x = Pn(d.attrs), C = ((_a2 = r.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check";
      if (!r.isEditable && !this.options.onReadOnlyChecked) {
        h(d);
        return;
      }
      const k = di(x.status, C), S = { status: k, checked: k === "done", kind: C };
      if (r.isEditable) {
        Cn(l, a, S.status, S.kind), u(S);
        return;
      }
      this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(d, S.checked) ? Cn(l, a, S.status, S.kind) : h(d));
    };
    return s.addEventListener("pointerdown", (g) => {
      g.button === 0 && m(g);
    }), l.addEventListener("click", (g) => {
      g.preventDefault(), g.stopPropagation();
    }), l.addEventListener("change", (g) => {
      g.preventDefault(), h(d);
    }), Object.entries(this.options.HTMLAttributes).forEach(([g, x]) => {
      a.setAttribute(g, String(x));
    }), a.append(s, c), s.append(l), Object.entries(t).forEach(([g, x]) => {
      a.setAttribute(g, String(x));
    }), { dom: a, contentDOM: c, stopEvent: (g) => {
      const x = g.target;
      return !!(x && s.contains(x));
    }, ignoreMutation: (g) => g.type === "selection" || s.contains(g.target), update: (g) => g.type !== this.type ? false : (d = g, h(g), true) };
  };
}, addInputRules() {
  return [new Mn({ find: ml, handler: ({ state: e, range: t, match: n }) => {
    var _a2;
    const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = _r(n[2]);
    return zr(e, t, { status: a.status, checked: a.checked, kind: r });
  } }), new Mn({ find: gl, handler: ({ state: e, range: t, match: n }) => {
    var _a2;
    const r = ((_a2 = this.editor.storage.taskItem) == null ? void 0 : _a2.preferredKind) === "status" ? "status" : "check", a = _r(n[1]);
    return zr(e, t, { status: a.status, checked: a.checked, kind: r });
  } })];
} }), bl = /^\s*[-+*]\s+\[([ xX~])\]\s+/, Fr = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;
function Kr(e) {
  var _a2;
  const t = xa(e[3]);
  return { indentLevel: ((_a2 = e[1]) == null ? void 0 : _a2.length) ?? 0, mainContent: e[4] ?? "", checked: t.checked, status: t.status, kind: t.kind };
}
function Wr(e, t, n = []) {
  return { type: "taskItem", raw: "", mainContent: e.mainContent, indentLevel: e.indentLevel, checked: e.checked, status: e.status, kind: e.kind, text: e.mainContent, tokens: t.inlineTokens(e.mainContent), nestedTokens: n };
}
const kl = gs.extend({ markdownTokenizer: { name: "taskList", level: "block", start(e) {
  var _a2;
  const t = (_a2 = e.match(bl)) == null ? void 0 : _a2.index;
  return t !== void 0 ? t : -1;
}, tokenize(e, t, n) {
  const r = (s) => {
    const l = kr(s, { itemPattern: Fr, extractItemData: Kr, createToken: (c, d) => Wr(c, n, d ?? []), customNestedParser: r }, n);
    if (l) {
      const c = { type: "taskList", raw: l.raw, items: l.items }, d = s.slice(l.raw.length);
      return d.trim() ? [c, ...n.blockTokens(d)] : [c];
    }
    return n.blockTokens(s);
  }, a = kr(e, { itemPattern: Fr, extractItemData: Kr, createToken: (s, l) => Wr(s, n, l ?? []), customNestedParser: r }, n);
  if (a) return { type: "taskList", raw: a.raw, items: a.items };
} } }), wl = xs.extend({ name: "nodeRange", addKeyboardShortcuts() {
  var _a2;
  const n = { ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {} };
  return delete n["Shift-ArrowUp"], delete n["Shift-ArrowDown"], n;
} }), yl = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, Sl = Te.create({ name: "pageBreak", group: "block", atom: true, selectable: true, draggable: true, parseHTML() {
  return [{ tag: "pgbr" }, { tag: "div[data-haim-pgbr]" }, { tag: "div.md-pgbr" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", xe(e, { "data-haim-pgbr": "1", "data-md-pgbr": "1", class: "haim-pgbr md-pgbr" })];
}, markdownTokenizer: { name: "pageBreak", level: "block", start: (e) => {
  const t = /<pgbr\s*\/?\s*>/i.exec(e);
  return t ? t.index : -1;
}, tokenize: (e) => {
  const t = yl.exec(e);
  if (t) return { type: "pageBreak", raw: t[0] };
} }, parseMarkdown: (e, t) => t.createNode("pageBreak"), renderMarkdown: () => `<pgbr/>

`, addCommands() {
  return { setPageBreak: () => ({ chain: e, state: t }) => {
    const n = t.schema.nodes[this.name];
    if (!n || !bs(t, n)) return false;
    const { selection: r } = t, { $to: a } = r, s = e();
    return ks(r) ? s.insertContentAt(a.pos, { type: this.name }) : s.insertContent({ type: this.name }), s.command(({ state: l, tr: c, dispatch: d }) => {
      var _a2;
      if (d) {
        const { $to: h } = c.selection, u = h.end();
        if (h.nodeAfter) h.nodeAfter.isTextblock ? c.setSelection(_.create(c.doc, h.pos + 1)) : h.nodeAfter.isBlock ? c.setSelection(aa.create(c.doc, h.pos)) : c.setSelection(_.create(c.doc, h.pos));
        else {
          const g = (_a2 = l.schema.nodes.paragraph || h.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
          g && (c.insert(u, g), c.setSelection(_.create(c.doc, u + 1)));
        }
        c.scrollIntoView();
      }
      return true;
    }).run();
  } };
} }), qn = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", Cl = ["nw", "ne", "sw", "se"];
function qr(e) {
  if (!e) return;
  const t = {};
  for (const n of e.split(";")) {
    const r = n.trim();
    if (!r) continue;
    const a = r.indexOf(":");
    if (a < 0) continue;
    const s = r.slice(0, a).trim(), l = r.slice(a + 1).trim(), c = s.replace(/-([a-z])/g, (d, h) => h.toUpperCase());
    t[c] = l;
  }
  return t;
}
function Vr(e, t, n, r) {
  const a = Kn({ path: e, width: t, height: n, background: r }), s = a.indexOf("|");
  if (s < 0) return "";
  const l = a.lastIndexOf("]]");
  return a.slice(s + 1, l >= 0 ? l : void 0).trim();
}
function At(e) {
  return `${Math.max(24, Math.round(e))}px`;
}
function vl(e) {
  return e ? e.closest(".overflow-auto") || e.parentElement : null;
}
function Ml({ node: e, selected: t, editor: n, getPos: r, updateAttributes: a }) {
  var _a2, _b;
  const s = String(e.attrs.path || ""), l = String(e.attrs.options || ""), c = String(e.attrs.alt || s), d = e.attrs.width || null, h = e.attrs.height || null, u = e.attrs.background || null, m = n.isEditable, g = p.useRef(null), x = p.useRef(null), [C, k] = p.useState(false), [S, L] = p.useState(false), [O, N] = p.useState(null), [w, I] = p.useState(null);
  x.current = w;
  const z = p.useMemo(() => w ? { ...qr(Dt({ width: null, height: null, background: u })), width: `${w.width}px`, height: `${w.height}px` } : qr(Dt({ width: d, height: h, background: u })), [d, h, u, w]), A = p.useCallback((E, T) => {
    const D = { width: E, height: T, options: Vr(s, E, T, u) }, H = vl(n.view.dom), F = (H == null ? void 0 : H.scrollTop) ?? null, U = typeof r == "function" ? r() : null;
    if (typeof U == "number") {
      const ae = n.state.tr.setNodeMarkup(U, void 0, { ...e.attrs, ...D });
      n.view.dispatch(ae);
    } else a(D);
    const le = () => {
      H && F != null && (H.scrollTop = F);
    };
    le(), requestAnimationFrame(le), requestAnimationFrame(() => requestAnimationFrame(le));
  }, [n, r, a, s, u, e.attrs]), P = p.useCallback(() => {
    const E = x.current;
    E && (A(At(E.width), At(E.height)), I(null), x.current = null);
    const T = typeof r == "function" ? r() : null;
    if (typeof T == "number") {
      const D = T + (e.nodeSize || 1);
      n.commands.setTextSelection(D);
    }
    n.commands.blur();
  }, [A, n, r, e.nodeSize]), V = p.useCallback((E, T) => {
    var _a3, _b2;
    if (!m) return;
    T.preventDefault(), T.stopPropagation();
    const D = g.current;
    if (!D) return;
    const H = D.getBoundingClientRect(), F = H.width, U = H.height, le = T.clientX, ae = T.clientY, Y = U > 0 ? F / U : 1, q = T.pointerId;
    (_b2 = (_a3 = T.target).setPointerCapture) == null ? void 0 : _b2.call(_a3, q);
    const te = { width: F, height: U };
    x.current = te, I(te);
    const ne = (ue) => {
      const ce = ue.clientX - le, be = ue.clientY - ae;
      let G = F, re = U;
      E.includes("e") && (G = F + ce), E.includes("w") && (G = F - ce), E.includes("s") && (re = U + be), E.includes("n") && (re = U - be), G = Math.max(24, G), re = Math.max(24, re), (ue.shiftKey || ue.pointerType === "touch") && (Math.abs(ce) >= Math.abs(be) ? re = G / Y : G = re * Y, G = Math.max(24, G), re = Math.max(24, re));
      const De = { width: G, height: re };
      x.current = De, I(De);
    }, Q = (ue) => {
      var _a4, _b3;
      window.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", Q), window.removeEventListener("pointercancel", Q);
      try {
        (_b3 = (_a4 = ue.target).releasePointerCapture) == null ? void 0 : _b3.call(_a4, q);
      } catch {
      }
      const ce = x.current;
      ce && A(At(ce.width), At(ce.height)), x.current = null, I(null);
    };
    window.addEventListener("pointermove", ne), window.addEventListener("pointerup", Q), window.addEventListener("pointercancel", Q);
  }, [m, A]);
  p.useEffect(() => {
    if (!t || !m || C || S) return;
    const E = (T) => {
      if (T.key !== "Enter") return;
      const D = T.target;
      D instanceof HTMLInputElement || D instanceof HTMLTextAreaElement || D instanceof HTMLElement && D.isContentEditable || (T.preventDefault(), T.stopPropagation(), P());
    };
    return document.addEventListener("keydown", E, true), () => document.removeEventListener("keydown", E, true);
  }, [t, m, C, S, P]);
  const ie = p.useCallback((E) => {
    if (E.detail > 1 || E.target instanceof Element && E.target.closest("[data-resize-handle]")) return;
    E.preventDefault(), E.stopPropagation();
    const T = typeof r == "function" ? r() : null;
    typeof T == "number" && n.chain().focus().setNodeSelection(T).run();
  }, [n, r]), He = p.useCallback((E) => {
    E.preventDefault(), E.stopPropagation();
    const T = g.current, D = (T == null ? void 0 : T.currentSrc) || (T == null ? void 0 : T.src) || "";
    D && (N(D), L(true));
  }, []), ee = p.useCallback(async (E, T) => {
    if (!m) return;
    const D = await va(T), H = typeof r == "function" ? r() : null;
    if (E === "overwrite") {
      const U = { path: D, alt: D, options: Vr(D, d, h, u) };
      typeof H == "number" ? n.view.dispatch(n.state.tr.setNodeMarkup(H, void 0, { ...e.attrs, ...U })) : a(U);
      const le = URL.createObjectURL(T);
      N(le);
      return;
    }
    if (typeof H != "number") return;
    const F = H + e.nodeSize;
    n.chain().focus().insertContentAt(F, { type: "wikiImage", attrs: { path: D, options: "", alt: D, width: null, height: null, background: null } }).run();
  }, [m, n, r, a, d, h, u, e.attrs, e.nodeSize]);
  return i.jsxs(ge, { as: "div", className: `haim-wiki-image-wrap${t ? " is-selected" : ""}${w ? " is-resizing" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: ie, onDoubleClick: He, onContextMenu: (E) => {
    m && (E.preventDefault(), E.stopPropagation(), k(true));
  }, children: [i.jsxs("div", { className: "haim-wiki-image-frame", children: [i.jsx("img", { ref: g, src: qn, alt: c, className: "haim-wiki-image", "data-wiki-path": s, ...l ? { "data-wiki-options": l } : {}, ...d ? { "data-wiki-width": d } : {}, ...h ? { "data-wiki-height": h } : {}, ...u ? { "data-wiki-bg": u } : {}, style: z, draggable: false }), t && m ? Cl.map((E) => i.jsx("button", { type: "button", className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${E}`, "aria-label": `resize-${E}`, "data-resize-handle": E, onPointerDown: (T) => V(E, T) }, E)) : null] }), i.jsx(pi, { isOpen: C, onClose: () => k(false), path: s, kind: "wiki", initialWidth: d ?? "", initialHeight: h ?? "", imageSrc: ((_a2 = g.current) == null ? void 0 : _a2.currentSrc) || ((_b = g.current) == null ? void 0 : _b.src) || "", onApply: ({ width: E, height: T }) => {
    A(E, T), k(false);
  } }), i.jsx(Ea, { src: O, alt: c, open: S, onClose: () => {
    L(false), N(null);
  }, ...m ? { onSaveAnnotated: ee } : {} })] });
}
function Ta(e, t, n = "") {
  const r = t ? io(t) : null;
  return { path: e, options: t || "", alt: n || e, width: (r == null ? void 0 : r.width) ?? null, height: (r == null ? void 0 : r.height) ?? null, background: (r == null ? void 0 : r.background) ?? null };
}
const jl = Te.create({ name: "wikiImage", group: "block", atom: true, selectable: true, draggable: true, addAttributes() {
  return { path: { default: "" }, options: { default: "" }, alt: { default: "" }, width: { default: null }, height: { default: null }, background: { default: null } };
}, parseHTML() {
  return [{ tag: "img[data-wiki-path]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const n = e.getAttribute("data-wiki-width"), r = e.getAttribute("data-wiki-height"), a = e.getAttribute("data-wiki-bg"), s = e.getAttribute("data-wiki-options") || [n ? `w=${n}` : "", r ? `h=${r}` : "", a ? `bg=${a}` : ""].filter(Boolean).join(" ");
    return { path: t, options: s, alt: e.getAttribute("alt") || t, width: n || null, height: r || null, background: a || null };
  } }, { tag: "div[data-haim-wiki-image]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const n = e.getAttribute("data-wiki-options") || "";
    return Ta(t, n, e.getAttribute("data-wiki-alt") || t);
  } }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const n = String(e.attrs.path || ""), r = String(e.attrs.options || ""), a = String(e.attrs.alt || n), s = e.attrs.width || null, l = e.attrs.height || null, c = e.attrs.background || null, d = Dt({ width: s, height: l, background: c });
  return ["img", xe(t, { src: qn, alt: a, "data-wiki-path": n, ...r ? { "data-wiki-options": r } : {}, ...s ? { "data-wiki-width": s } : {}, ...l ? { "data-wiki-height": l } : {}, ...c ? { "data-wiki-bg": c } : {}, ...d ? { style: d } : {}, class: "haim-wiki-image" })];
}, addNodeView() {
  return Ye(Ml);
}, renderMarkdown: (e) => {
  var _a2, _b, _c2, _d, _e;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.path) || "");
  if (!t) return "";
  const n = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c2 = e.attrs) == null ? void 0 : _c2.height) || null, a = ((_d = e.attrs) == null ? void 0 : _d.background) || null;
  if (n || r || a) return `${Kn({ path: t, width: n, height: r, background: a })}

`;
  const s = String(((_e = e.attrs) == null ? void 0 : _e.options) || "");
  return s ? `![[${t}|${s}]]

` : `![[${t}]]

`;
} });
function Lu(e, t = "", n = "") {
  const r = Ta(e, t, n), a = Dt({ width: r.width, height: r.height, background: r.background }), s = [`src="${qn}"`, `alt="${Ae(r.alt)}"`, `data-wiki-path="${Ae(r.path)}"`, 'class="haim-wiki-image"'];
  return r.options && s.push(`data-wiki-options="${Ae(r.options)}"`), r.width && s.push(`data-wiki-width="${Ae(r.width)}"`), r.height && s.push(`data-wiki-height="${Ae(r.height)}"`), r.background && s.push(`data-wiki-bg="${Ae(r.background)}"`), a && s.push(`style="${Ae(a)}"`), `<img ${s.join(" ")} />`;
}
function Ae(e) {
  return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
const El = Te.create({ name: "wikiFigure", group: "block", content: "wikiImage figcaption", defining: true, isolating: true, parseHTML() {
  return [{ tag: "figure[data-haim-wiki-figure]" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figure", xe(e, { "data-haim-wiki-figure": "1", class: "haim-wiki-figure" }), 0];
}, renderMarkdown: (e, t) => {
  const n = Array.isArray(e.content) ? e.content : [], r = n.find((c) => c.type === "wikiImage"), a = n.find((c) => c.type === "figcaption");
  let s = "";
  if (r == null ? void 0 : r.attrs) {
    const c = String(r.attrs.path || "");
    if (c) {
      const d = r.attrs.width || null, h = r.attrs.height || null, u = r.attrs.background || null;
      if (d || h || u) s = Kn({ path: c, width: d, height: h, background: u });
      else {
        const m = String(r.attrs.options || "");
        s = m ? `![[${c}|${m}]]` : `![[${c}]]`;
      }
    }
  }
  const l = a ? String(t.renderChildren(a.content || []) || "").trim() : "";
  return s ? l ? `${s}
${l}

` : `${s}

` : l ? `${l}

` : "";
} }), Tl = Te.create({ name: "figcaption", content: "inline*", defining: true, selectable: false, parseHTML() {
  return [{ tag: "figcaption" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figcaption", xe(e), 0];
}, renderMarkdown: (e, t) => t.renderChildren(e.content || []) }), Ll = Te.create({ name: "noteCover", group: "block", atom: true, selectable: true, draggable: false, parseHTML() {
  return [{ tag: "div[data-note-cover-placeholder]", priority: 60 }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", xe(e, { class: "md-note-cover-placeholder md-note-cover-placeholder--pending", "data-note-cover-placeholder": "1", role: "button", tabindex: "0", title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9" }), ["div", { class: "md-note-cover-placeholder__mount", "data-note-cover-mount": "1" }], ["span", { class: "md-note-cover-placeholder__fallback" }, ["span", { class: "md-note-cover-placeholder__spinner", "aria-hidden": "true" }], ["span", { class: "md-note-cover-placeholder__fallback-text" }, "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"]]];
}, renderMarkdown: () => "" });
function Iu() {
  return `${hi()}

`;
}
function Il(e) {
  const t = getComputedStyle(e), n = t.lineHeight;
  if (n && n !== "normal") {
    const a = Number.parseFloat(n);
    if (Number.isFinite(a) && a > 0) return a;
  }
  const r = Number.parseFloat(t.fontSize);
  return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
}
const Ur = /* @__PURE__ */ new WeakMap();
function La(e) {
  const t = getComputedStyle(e), n = `${t.font}|${t.fontSize}|${t.lineHeight}|${t.fontFamily}|${t.fontWeight}`, r = Ur.get(e);
  if (r && r.key === n) return r.value;
  let s = Il(e);
  try {
    const l = document.createElement("div");
    l.setAttribute("aria-hidden", "true"), l.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", "width:auto", `font:${t.font}`, `font-size:${t.fontSize}`, `font-family:${t.fontFamily}`, `font-weight:${t.fontWeight}`, `font-style:${t.fontStyle}`, `letter-spacing:${t.letterSpacing}`, `line-height:${t.lineHeight}`, "white-space:pre", "padding:0", "margin:0", "border:0"].join(";"), l.textContent = "M", document.body.appendChild(l);
    const c = l.getBoundingClientRect().height || l.offsetHeight;
    l.remove(), c > 0 && (s = c);
  } catch {
  }
  return Ur.set(e, { key: n, value: s }), s;
}
function Nl(e) {
  const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), n = Number.parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : 4;
}
function Ia(e) {
  const t = e.closest("pre");
  if (t) {
    const n = getComputedStyle(t), r = (Number.parseFloat(n.paddingLeft) || 0) + (Number.parseFloat(n.paddingRight) || 0), a = t.clientWidth - r;
    if (a > 0) return a;
  }
  return e.clientWidth;
}
function Al(e) {
  return e.classList.contains("ProseMirror-trailingBreak");
}
function Na(e) {
  return Array.from(e.querySelectorAll("br")).filter((t) => !Al(t));
}
function $l(e) {
  return Math.max(1, Na(e).length + 1);
}
function Pl(e, t) {
  const n = ia(t);
  return e ? Math.max(n, $l(e)) : n;
}
function Hl(e, t) {
  const n = Array.from(e.getClientRects()).filter((l) => l.height > 0 || l.width > 0);
  if (n.length === 0) return t;
  let r = 1 / 0, a = -1 / 0;
  for (const l of n) r = Math.min(r, l.top), a = Math.max(a, l.bottom);
  const s = a - r;
  return s > 0.5 ? s : t;
}
function Dl(e, t, n, r) {
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
  const s = n[r];
  s ? e.setEndBefore(s) : e.setEnd(t, t.childNodes.length);
}
function Rl(e, t, n, r) {
  const a = n > 0 ? t[n - 1] : null, s = t[n] ?? null;
  if (a && s) {
    const l = s.getBoundingClientRect().top - a.getBoundingClientRect().top;
    if (l > 0.5) return l;
  }
  if (!a && s) {
    const l = e.getBoundingClientRect().top, c = s.getBoundingClientRect().top - l;
    if (c > 0.5) return c;
  }
  if (a && !s) {
    const l = e.getBoundingClientRect().bottom - a.getBoundingClientRect().top;
    if (l > 0.5) return l;
  }
  return r;
}
function Bl(e, t, n) {
  const r = Na(e);
  if (r.length === 0 && t > 1) return null;
  const a = [], s = document.createRange();
  try {
    for (let l = 0; l < t; l += 1) if (Dl(s, e, r, l), s.collapsed) a.push(Rl(e, r, l, n));
    else {
      const c = Hl(s, n);
      a.push(Math.max(c, n * 0.95));
    }
  } catch {
    return null;
  }
  return a.length === t ? a : null;
}
function Ol(e, t, n, r) {
  const a = Ia(e);
  if (a <= 0) return Array.from({ length: n }, () => r);
  const l = mi(t, gi(e), a, Nl(e)).map((c) => Math.max(1, c) * r);
  for (; l.length < n; ) l.push(r);
  return l.slice(0, n);
}
function _l(e, t, n, r) {
  const a = Ia(e);
  if (a <= 0) return Array.from({ length: n }, () => r);
  const s = t.length === 0 ? [""] : String(t).split(`
`);
  for (; s.length < n; ) s.push("");
  s.length > n && (s.length = n);
  const l = getComputedStyle(e), c = l.whiteSpace === "pre" || l.whiteSpace === "nowrap" ? "pre-wrap" : l.whiteSpace || "pre-wrap", d = document.createElement("div");
  d.setAttribute("aria-hidden", "true"), d.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", `width:${a}px`, `font:${l.font}`, `font-size:${l.fontSize}`, `font-family:${l.fontFamily}`, `font-weight:${l.fontWeight}`, `font-style:${l.fontStyle}`, `letter-spacing:${l.letterSpacing}`, `line-height:${l.lineHeight}`, `white-space:${c}`, `overflow-wrap:${l.overflowWrap || "break-word"}`, `word-break:${l.wordBreak || "normal"}`, `tab-size:${l.tabSize || 4}`, "box-sizing:border-box", "padding:0", "margin:0", "border:0"].join(";");
  for (const u of s) {
    const m = document.createElement("div");
    m.style.whiteSpace = c, m.style.overflowWrap = l.overflowWrap || "break-word", m.style.wordBreak = l.wordBreak || "normal", m.style.lineHeight = l.lineHeight, m.textContent = u.length > 0 ? u : "\xA0", d.appendChild(m);
  }
  document.body.appendChild(d);
  const h = [];
  for (let u = 0; u < n; u += 1) {
    const m = d.children[u], g = (m == null ? void 0 : m.getBoundingClientRect().height) || (m == null ? void 0 : m.offsetHeight) || 0;
    h.push(g > 0 ? g : r);
  }
  return d.remove(), h;
}
function zl(e, t, n) {
  if (n <= 0) return [];
  const r = La(e), a = Bl(e, n, r);
  return a ? a.map((s) => s > 0 ? s : r) : e.closest("pre") || e.tagName === "PRE" ? _l(e, t, n, r) : Ol(e, t, n, r);
}
function Xr(e) {
  return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
}
function Fl(e, t) {
  if (e === t) return true;
  if (!e || !t || e.length !== t.length) return false;
  for (let n = 0; n < e.length; n += 1) if (Math.abs((e[n] ?? 0) - (t[n] ?? 0)) > 0.5) return false;
  return true;
}
function Aa({ text: e, className: t, contentRootRef: n }) {
  const r = ia(e), [a, s] = p.useState(r), [l, c] = p.useState(null), [d, h] = p.useState(null);
  p.useLayoutEffect(() => {
    const m = (n == null ? void 0 : n.current) ?? null, g = Xr(m);
    if (!g) {
      s(r), c(null), h(null);
      return;
    }
    let x = 0, C = null;
    const k = () => {
      cancelAnimationFrame(x), x = requestAnimationFrame(() => {
        const N = Xr((n == null ? void 0 : n.current) ?? null);
        if (!N) {
          s(r), c(null), h(null);
          return;
        }
        const w = Pl(N, e), I = La(N), z = zl(N, e, w), A = z.length === w && z.every((P) => P > 0) ? z : null;
        s((P) => P === w ? P : w), h((P) => P === I ? P : I), c((P) => Fl(P, A) ? P : A);
      });
    };
    k(), C = new ResizeObserver(k), C.observe(g), m && m !== g && C.observe(m);
    const S = g.closest("pre");
    S && S !== g && S !== m && C.observe(S);
    const L = new MutationObserver(k);
    L.observe(g, { subtree: true, childList: true, characterData: true });
    const O = window.setTimeout(k, 0);
    return window.addEventListener(vr, k), window.addEventListener("resize", k), () => {
      cancelAnimationFrame(x), window.clearTimeout(O), C == null ? void 0 : C.disconnect(), L.disconnect(), window.removeEventListener(vr, k), window.removeEventListener("resize", k);
    };
  }, [e, r, n]);
  const u = d != null && d > 0 ? { lineHeight: `${d}px` } : void 0;
  return i.jsx("div", { className: ["haim-line-numbers", t].filter(Boolean).join(" "), style: u, "aria-hidden": true, children: Array.from({ length: a }, (m, g) => {
    const x = l == null ? void 0 : l[g], C = x != null && x > 0 ? { height: x, minHeight: x, maxHeight: x, lineHeight: d != null && d > 0 ? `${Math.min(d, x)}px` : void 0 } : void 0;
    return i.jsx("span", { className: "haim-line-numbers__n", style: C, children: g + 1 }, g);
  }) });
}
function Kl(e) {
  const n = lo(String(e || ""))[0];
  return n ? { meta: n.meta ?? la(), grid: n.grid } : null;
}
function Wl(e, t) {
  return `${co(e)}
${uo(t)}`;
}
function Nu() {
  const e = la(), t = { rows: [["", "", ""], ["", "", ""], ["", "", ""]], aligns: [null, null, null] };
  return { meta: e, grid: t, text: Wl(e, t) };
}
const ql = "haim-table-edit-request";
function Vl(e, t) {
  e.dispatchEvent(new CustomEvent(ql, { detail: t, bubbles: true }));
}
function Ul({ node: e, editor: t, selected: n, getPos: r }) {
  const a = String(e.attrs.kind || "raw"), s = String(e.attrs.text || ""), l = t.isEditable, c = p.useRef(null), d = p.useMemo(() => {
    if (a !== "haim-table") return null;
    const u = Kl(s);
    return u ? xi(u.grid, u.meta) : null;
  }, [a, s]), h = () => {
    if (!l || a !== "haim-table") return;
    const u = typeof r == "function" ? r() : null;
    typeof u == "number" && Vl(t.view.dom, { pos: u, text: s });
  };
  return a === "haim-table" && d ? i.jsx(ge, { as: "div", className: `haim-raw-md haim-raw-md--haim-table${n ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": "haim-table", contentEditable: false, onDoubleClick: (u) => {
    u.preventDefault(), u.stopPropagation(), h();
  }, children: i.jsx("div", { className: "haim-haim-table-preview", dangerouslySetInnerHTML: { __html: d } }) }) : i.jsxs(ge, { as: "div", className: `haim-raw-md${n ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": a, contentEditable: false, children: [i.jsx(Aa, { text: s, className: "haim-raw-md__line-numbers", contentRootRef: c }), i.jsx("pre", { ref: c, className: "haim-raw-md__pre", children: s })] });
}
const Xl = Te.create({ name: "rawMarkdownBlock", group: "block", atom: true, selectable: true, code: true, addAttributes() {
  return { text: { default: "" }, kind: { default: "raw" } };
}, parseHTML() {
  return [{ tag: "pre[data-haim-raw-md]", getAttrs: (e) => e instanceof HTMLElement ? { text: e.textContent || "", kind: e.getAttribute("data-kind") || "raw" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["pre", xe(t, { "data-haim-raw-md": "1", "data-kind": String(e.attrs.kind || "raw"), class: "haim-raw-md" }), String(e.attrs.text || "")];
}, addNodeView() {
  return Ye(Ul);
}, renderMarkdown: (e) => {
  var _a2;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
  return t ? t.endsWith(`
`) ? t : `${t}
` : "";
} }), Yl = Te.create({ name: "deepHeading", group: "block", content: "inline*", defining: true, addAttributes() {
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
function Ql(e, t) {
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
    Ql(n, e);
  } };
}
const $a = [{ id: "bold", title: "\uAD75\uAC8C", titleEn: "Bold", keywords: ["bold", "\uAD75\uAC8C", "\uBCFC\uB4DC", "\uAC15\uC870", "strong"], group: "format", groupLabel: $.format, Icon: jo, run: ({ editor: e }) => {
  e.chain().focus().toggleBold().run();
} }, { id: "italic", title: "\uAE30\uC6B8\uC784", titleEn: "Italic", keywords: ["italic", "\uAE30\uC6B8\uC784", "\uC774\uD0E4\uB9AD", "em"], group: "format", groupLabel: $.format, Icon: Eo, run: ({ editor: e }) => {
  e.chain().focus().toggleItalic().run();
} }, { id: "underline", title: "\uBC11\uC904", titleEn: "Underline", keywords: ["underline", "\uBC11\uC904", "\uC5B8\uB354\uB77C\uC778"], group: "format", groupLabel: $.format, Icon: To, run: ({ editor: e }) => {
  e.chain().focus().toggleUnderline().run();
} }, { id: "strike", title: "\uCDE8\uC18C\uC120", titleEn: "Strikethrough", keywords: ["strike", "strikethrough", "\uCDE8\uC18C\uC120", "\uC0AD\uC81C\uC120"], group: "format", groupLabel: $.format, Icon: Lo, run: ({ editor: e }) => {
  e.chain().focus().toggleStrike().run();
} }, { id: "code", title: "\uC778\uB77C\uC778 \uCF54\uB4DC", titleEn: "Inline code", keywords: ["code", "inline code", "\uC778\uB77C\uC778 \uCF54\uB4DC", "\uCF54\uB4DC"], group: "format", groupLabel: $.format, Icon: Io, run: ({ editor: e }) => {
  e.chain().focus().toggleCode().run();
} }, { id: "subscript", title: "\uC544\uB798 \uCCA8\uC790", titleEn: "Subscript", keywords: ["sub", "subscript", "\uC544\uB798\uCCA8\uC790", "\uC544\uB798 \uCCA8\uC790"], group: "format", groupLabel: $.format, Icon: No, run: ({ editor: e }) => {
  e.chain().focus().toggleSubscript().run();
} }, { id: "superscript", title: "\uC704 \uCCA8\uC790", titleEn: "Superscript", keywords: ["sup", "superscript", "\uC704\uCCA8\uC790", "\uC704 \uCCA8\uC790"], group: "format", groupLabel: $.format, Icon: Ao, run: ({ editor: e }) => {
  e.chain().focus().toggleSuperscript().run();
} }, he(1, Uo), he(2, Xo), he(3, Yo), he(4, Qo), he(5, Go), he(6, Jo), he(7, ct), he(8, ct), he(9, ct), he(10, ct), { id: "paragraph", title: "\uBCF8\uBB38", titleEn: "Paragraph", keywords: ["paragraph", "\uBCF8\uBB38", "\uD14D\uC2A4\uD2B8", "text", "p"], group: "block", groupLabel: $.block, Icon: jn, run: ({ editor: e }) => {
  e.chain().focus().setParagraph().run();
} }, { id: "bullet-list", title: "\uAE00\uBA38\uB9AC \uAE30\uD638 \uBAA9\uB85D", titleEn: "Bullet list", keywords: ["ul", "unordered", "bullet", "\uBAA9\uB85D", "\uB9AC\uC2A4\uD2B8", "\uAE00\uBA38\uB9AC"], group: "block", groupLabel: $.block, Icon: $o, run: ({ editor: e }) => {
  e.chain().focus().toggleBulletList().run();
} }, { id: "ordered-list", title: "\uBC88\uD638 \uBAA9\uB85D", titleEn: "Ordered list", keywords: ["ol", "ordered", "numbered", "\uBC88\uD638", "\uBC88\uD638 \uBAA9\uB85D"], group: "block", groupLabel: $.block, Icon: Po, run: ({ editor: e }) => {
  e.chain().focus().toggleOrderedList().run();
} }, { id: "task-list", title: "\uD560 \uC77C \uBAA9\uB85D", titleEn: "Task list", keywords: ["task", "todo", "checkbox", "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8", "\uD560 \uC77C", "\uCCB4\uD06C\uBC15\uC2A4", "check"], group: "block", groupLabel: $.block, Icon: Er, run: ({ editor: e }) => {
  e.chain().focus().toggleTaskList().run();
} }, { id: "status-task", title: "\uC0C1\uD0DC \uD560 \uC77C", titleEn: "Status task", keywords: ["status", "doing", "in progress", "\uC9C4\uD589", "\uC0C1\uD0DC", "\uC0C1\uD0DC \uCCB4\uD06C\uBC15\uC2A4", "~"], group: "block", groupLabel: $.block, Icon: Er, run: ({ editor: e }) => {
  const t = () => {
    e.chain().focus().command(({ tr: n, state: r, dispatch: a }) => {
      if (!a) return false;
      const s = r.selection.$from;
      for (let l = s.depth; l >= 0; l -= 1) if (s.node(l).type.name === "taskItem") return n.setNodeMarkup(s.before(l), void 0, { ...s.node(l).attrs, status: "doing", checked: false, kind: "status" }), a(n), true;
      return false;
    }).run();
  };
  e.isActive("taskList") || e.chain().focus().toggleTaskList().run(), t();
} }, { id: "blockquote", title: "\uC778\uC6A9", titleEn: "Quote", keywords: ["quote", "blockquote", "\uC778\uC6A9"], group: "block", groupLabel: $.block, Icon: Ho, run: ({ editor: e }) => {
  e.chain().focus().toggleBlockquote().run();
} }, { id: "code-block", title: "\uCF54\uB4DC \uBE14\uB85D", titleEn: "Code block", keywords: ["code block", "fence", "\uCF54\uB4DC \uBE14\uB85D", "\uD39C\uC2A4"], group: "block", groupLabel: $.block, Icon: Do, run: ({ editor: e }) => {
  e.chain().focus().toggleCodeBlock().run();
} }, { id: "link", title: "\uB9C1\uD06C", titleEn: "Link", keywords: ["link", "url", "\uB9C1\uD06C", "\uD558\uC774\uD37C\uB9C1\uD06C"], group: "insert", groupLabel: $.insert, Icon: Tr, run: ({ editor: e, app: t }) => {
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
} }, { id: "docuhaim-link", title: "\uB178\uD2B8 \uB9C1\uD06C", titleEn: "Note link", keywords: ["docuhaim", "note link", "\uB178\uD2B8 \uB9C1\uD06C", "vault link", "\uD30C\uC77C \uB9C1\uD06C"], group: "insert", groupLabel: $.insert, Icon: Tr, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onDocuhaimNoteLink) == null ? void 0 : _a2.call(e);
} }, { id: "table", title: "\uD45C", titleEn: "Table", keywords: ["table", "\uD45C", "\uD14C\uC774\uBE14"], group: "insert", groupLabel: $.insert, Icon: Ro, run: ({ editor: e }) => {
  e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
} }, { id: "mermaid", title: "Mermaid", titleEn: "Mermaid diagram", keywords: ["mermaid", "diagram", "\uB2E4\uC774\uC5B4\uADF8\uB7A8", "flowchart", "\uADF8\uB798\uD504"], group: "insert", groupLabel: $.insert, Icon: Bo, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertMermaid) {
    t.onInsertMermaid();
    return;
  }
  e.chain().focus().insertContent("```mermaid\ngraph TD\n  A-->B\n```\n", { contentType: "markdown" }).run();
} }, { id: "katex", title: "\uC218\uC2DD", titleEn: "Math / KaTeX", keywords: ["math", "katex", "latex", "\uC218\uC2DD", "\uACF5\uC2DD", "formula"], group: "insert", groupLabel: $.insert, Icon: Oo, run: ({ editor: e, app: t }) => {
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
} }, { id: "page-break", title: "\uD398\uC774\uC9C0 \uB098\uB214", titleEn: "Page break", keywords: ["pgbr", "page break", "\uD398\uC774\uC9C0 \uB098\uB214", "\uC778\uC1C4"], group: "insert", groupLabel: $.insert, Icon: _o, run: ({ editor: e, app: t }) => {
  if (t == null ? void 0 : t.onInsertPageBreak) {
    t.onInsertPageBreak();
    return;
  }
  e.chain().focus().setPageBreak().run();
} }, { id: "image-link", title: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C", titleEn: "Image link", keywords: ["image", "\uC774\uBBF8\uC9C0", "wiki image", "\uC774\uBBF8\uC9C0 \uB9C1\uD06C", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: Lt, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onImageLink) == null ? void 0 : _a2.call(e);
} }, { id: "image-upload", title: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC", titleEn: "Upload image", keywords: ["image", "upload", "\uC774\uBBF8\uC9C0", "\uC5C5\uB85C\uB4DC", "\uC0AC\uC9C4", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: Lt, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onImageUpload) == null ? void 0 : _a2.call(e);
} }, { id: "image-clip", title: "\uC774\uBBF8\uC9C0 \uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC", titleEn: "Crop & upload image", keywords: ["image", "crop", "clip", "\uC790\uB974\uAE30", "\uD06C\uB86D", "picture", "pic"], group: "insert", groupLabel: $.insert, Icon: Lt, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onImageClip) == null ? void 0 : _a2.call(e);
} }, { id: "whiteboard", title: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30", titleEn: "Create whiteboard", keywords: ["whiteboard", "\uD654\uC774\uD2B8\uBCF4\uB4DC", "\uCE94\uBC84\uC2A4", "canvas", "picture"], group: "insert", groupLabel: $.insert, Icon: Lt, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onCreateWhiteboard) == null ? void 0 : _a2.call(e);
} }, { id: "qrcode", title: "QRCode \uB9CC\uB4E4\uAE30", titleEn: "Create QR code", keywords: ["qr", "qrcode", "\uD050\uC54C", "\uD050\uC54C\uCF54\uB4DC"], group: "insert", groupLabel: $.insert, Icon: zo, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onCreateQrCode) == null ? void 0 : _a2.call(e);
} }, { id: "undo", title: "\uC2E4\uD589 \uCDE8\uC18C", titleEn: "Undo", keywords: ["undo", "revoke", "\uC2E4\uD589\uCDE8\uC18C", "\uB418\uB3CC\uB9AC\uAE30"], group: "tool", groupLabel: $.tool, Icon: ua, run: ({ editor: e }) => {
  e.chain().focus().undo().run();
} }, { id: "redo", title: "\uB2E4\uC2DC \uC2E4\uD589", titleEn: "Redo", keywords: ["redo", "next", "\uB2E4\uC2DC\uC2E4\uD589"], group: "tool", groupLabel: $.tool, Icon: da, run: ({ editor: e }) => {
  e.chain().focus().redo().run();
} }, { id: "heading-remap", title: "\uC81C\uBAA9 \uC218\uC900 \uC7AC\uB9E4\uD551", titleEn: "Remap heading levels", keywords: ["heading remap", "\uC81C\uBAA9 \uBCC0\uACBD", "\uD5E4\uB529", "\uC81C\uBAA9\uB9AC\uB9F5", "\uD5E4\uB529\uB9AC\uB9E4\uD551"], group: "tool", groupLabel: $.tool, Icon: ct, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onHeadingRemap) == null ? void 0 : _a2.call(e);
} }, { id: "checklist-progress", title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", titleEn: "Checklist progress", keywords: ["checklist", "progress", "\uC9C4\uD589\uB960", "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8"], group: "tool", groupLabel: $.tool, Icon: Fo, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onChecklistProgress) == null ? void 0 : _a2.call(e);
} }, { id: "llm-assist", title: "AI \uB3C4\uC6B0\uBBF8", titleEn: "AI assistant", keywords: ["ai", "llm", "gemini", "openai", "\uC778\uACF5\uC9C0\uB2A5", "\uB3C4\uC6B0\uBBF8"], group: "tool", groupLabel: $.tool, Icon: Ko, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onLlmAssist) == null ? void 0 : _a2.call(e);
} }, { id: "export-pdf", title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", titleEn: "Export PDF", keywords: ["export", "pdf", "\uC778\uC1C4", "print", "\uB0B4\uBCF4\uB0B4\uAE30"], group: "tool", groupLabel: $.tool, Icon: Wo, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onExportPdf) == null ? void 0 : _a2.call(e);
} }, { id: "find-replace", title: "\uCC3E\uAE30/\uBC14\uAFB8\uAE30", titleEn: "Find and replace", keywords: ["find", "replace", "search", "\uCC3E\uAE30", "\uBC14\uAFB8\uAE30", "\uAC80\uC0C9"], group: "tool", groupLabel: $.tool, Icon: fa, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onFindReplaceToggle) == null ? void 0 : _a2.call(e);
} }, { id: "invisible-chars", title: "\uBE44\uAC00\uC2DC \uBB38\uC790", titleEn: "Invisible characters", keywords: ["invisible", "whitespace", "\uBE44\uAC00\uC2DC", "\uACF5\uBC31", "pilcrow", "\xB6"], group: "tool", groupLabel: $.tool, Icon: qo, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onInvisibleCharsToggle) == null ? void 0 : _a2.call(e);
} }, { id: "toc", title: "\uBAA9\uCC28", titleEn: "Table of contents", keywords: ["toc", "catalog", "\uBAA9\uCC28", "outline"], group: "tool", groupLabel: $.tool, Icon: Vo, run: ({ app: e }) => {
  var _a2;
  (_a2 = e == null ? void 0 : e.onTocToggle) == null ? void 0 : _a2.call(e);
} }];
function Yr(e) {
  return e.normalize("NFKC").toLowerCase();
}
function Gl(e, t = $a) {
  const n = Yr(e).trim();
  if (!n) return [...t];
  const r = n.split(/\s+/).filter(Boolean);
  return t.filter((a) => {
    const s = Yr([a.id, a.title, a.titleEn, ...a.keywords].join(`
`));
    return r.every((l) => s.includes(l));
  });
}
const Jl = p.forwardRef(function({ items: t, command: n }, r) {
  const [a, s] = p.useState(0), l = p.useRef(null), c = p.useRef([]);
  if (p.useEffect(() => {
    s(0);
  }, [t]), p.useLayoutEffect(() => {
    var _a2;
    (_a2 = c.current[a]) == null ? void 0 : _a2.scrollIntoView({ block: "nearest" });
  }, [a, t]), p.useImperativeHandle(r, () => ({ onKeyDown: ({ event: h }) => {
    if (t.length === 0 || h.shiftKey || h.altKey || h.metaKey || h.ctrlKey) return false;
    if (h.key === "ArrowUp") return s((u) => (u + t.length - 1) % t.length), true;
    if (h.key === "ArrowDown") return s((u) => (u + 1) % t.length), true;
    if (h.key === "Enter") {
      const u = t[a];
      return u && n(u), true;
    }
    return false;
  } })), t.length === 0) return i.jsx("div", { className: "w-[min(92vw,300px)] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-muted", role: "listbox", "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839", children: "\uACB0\uACFC \uC5C6\uC74C" });
  let d = "";
  return i.jsx("div", { ref: l, className: "flex max-h-[min(60vh,360px)] w-[min(92vw,300px)] flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface", role: "listbox", "aria-label": "\uC2AC\uB798\uC2DC \uBA85\uB839", children: t.map((h, u) => {
    const m = h.groupLabel !== d;
    d = h.groupLabel;
    const g = h.Icon, x = u === a;
    return i.jsxs("div", { children: [m ? i.jsx("div", { className: "px-2.5 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-odp-muted", children: h.groupLabel }) : null, i.jsxs("button", { type: "button", ref: (C) => {
      c.current[u] = C;
    }, role: "option", "aria-selected": x, className: `flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm ${x ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-800 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-bgSoft"}`, onMouseEnter: () => s(u), onClick: () => {
      n(h);
    }, children: [i.jsx(g, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), i.jsx("span", { className: "min-w-0 flex-1 truncate font-medium", children: h.title }), i.jsx("span", { className: "shrink-0 truncate text-xs text-gray-400 dark:text-odp-muted", children: h.titleEn })] })] }, h.id);
  }) });
}), Qr = new Pe("haimSlashCommands");
function Zl(e) {
  const { $from: t } = e.selection;
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n).type.name;
    if (r === "codeBlock" || r === "rawMarkdownBlock") return true;
  }
  return false;
}
function Gr(e, t) {
  Zs.flushSync(() => {
    e.root.render(p.createElement(Jl, { ref: (n) => {
      e.listRef.current = n;
    }, items: t.items, command: (n) => {
      t.command(n);
    } }));
  });
}
const ec = Qe.create({ name: "haimSlashCommands", addStorage() {
  return { getAppActions: () => null };
}, addProseMirrorPlugins() {
  return [ws({ pluginKey: Qr, editor: this.editor, char: "/", allowSpaces: true, startOfLine: false, allowedPrefixes: [" "], decorationClass: "haim-slash-decoration", placement: "bottom-start", offset: { mainAxis: 6, crossAxis: 0 }, dismissOnOutsideClick: true, floatingUi: { strategy: "fixed" }, initialItems: [...$a], allow: ({ state: e, editor: t }) => t.isEditable && !Zl(e), items: ({ query: e }) => Gl(e), command: ({ editor: e, range: t, props: n }) => {
    var _a2, _b;
    e.chain().focus().deleteRange(t).run();
    const r = ((_b = (_a2 = e.storage.haimSlashCommands) == null ? void 0 : _a2.getAppActions) == null ? void 0 : _b.call(_a2)) ?? null;
    n.run({ editor: e, app: r });
  }, render: () => {
    let e = null;
    return { onStart: (t) => {
      const n = document.createElement("div");
      n.className = "haim-slash-menu-root", n.style.zIndex = "100010";
      const r = { current: null }, a = Js.createRoot(n);
      e = { el: n, root: a, listRef: r, unmountFloating: null }, Gr(e, t), e.unmountFloating = t.mount(n);
    }, onUpdate: (t) => {
      e && Gr(e, t);
    }, onKeyDown: (t) => {
      var _a2;
      return t.event.key === "Escape" ? (ys(t.view, Qr), true) : ((_a2 = e == null ? void 0 : e.listRef.current) == null ? void 0 : _a2.onKeyDown(t)) ?? false;
    }, onExit: () => {
      var _a2;
      const t = e;
      e = null, (_a2 = t == null ? void 0 : t.unmountFloating) == null ? void 0 : _a2.call(t), (t == null ? void 0 : t.root) && queueMicrotask(() => {
        t.root.unmount();
      });
    } };
  } })];
} });
function tc(e, t) {
  try {
    const n = e.domAtPos(t), r = n.node instanceof Element ? n.node : n.node.parentElement;
    if (!r) return 22;
    const a = window.getComputedStyle(r), s = parseFloat(a.lineHeight);
    if (Number.isFinite(s) && s > 0) return s;
    const l = parseFloat(a.fontSize);
    if (Number.isFinite(l) && l > 0) return l * 1.4;
  } catch {
  }
  return 22;
}
function vn(e) {
  for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
  return -1;
}
function nc(e, t, n, r) {
  const a = vn(t);
  if (a < 0) return null;
  const s = n === "down" ? 1 : -1, l = n === "down" ? t.after(a) : t.before(a);
  let c;
  try {
    c = _.near(t.doc.resolve(Math.max(0, Math.min(t.doc.content.size, l))), s).head;
  } catch {
    return null;
  }
  const d = t.doc.resolve(c);
  if (vn(d) === a) {
    const h = d.before(vn(d)), u = t.before(a);
    if (h === u) return null;
  }
  try {
    const h = e.coordsAtPos(c), u = (h.top + h.bottom) / 2, m = e.posAtCoords({ left: r, top: u });
    if (m && m.pos !== t.pos) return m.pos;
  } catch {
  }
  return c !== t.pos ? c : null;
}
function Jr(e, t) {
  const { state: n } = e, { selection: r, doc: a } = n, s = t === "down" ? 1 : -1;
  let l = r.anchor, c = r.head;
  if (r instanceof aa) {
    const x = _.near(a.resolve(t === "down" ? r.to : r.from), s);
    l = x.anchor, c = x.head;
  }
  let d;
  try {
    d = e.coordsAtPos(c);
  } catch {
    d = { left: 0, top: 0, bottom: 22 };
  }
  const h = tc(e, c), u = d.left;
  let m = c;
  const g = [0.2, 0.55, 1, 1.5, 2, 2.75, 3.5];
  for (const x of g) {
    const C = t === "down" ? d.bottom + Math.max(2, h * x) : d.top - Math.max(2, h * x);
    let k = null;
    try {
      k = e.posAtCoords({ left: u, top: C });
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
    const x = nc(e, a.resolve(c), t, u);
    x != null && (m = x);
  }
  if (m === c) {
    const x = Math.max(1, Math.min(a.content.size, c + s));
    if (x !== c) try {
      m = _.near(a.resolve(x), s).head;
    } catch {
      return false;
    }
  }
  if (m = Math.max(0, Math.min(a.content.size, m)), m === c) return false;
  try {
    const x = n.tr.setSelection(_.create(a, l, m));
    return x.scrollIntoView(), e.dispatch(x), true;
  } catch {
    try {
      const x = _.near(a.resolve(m), s), C = n.tr.setSelection(_.create(a, l, x.head));
      return C.scrollIntoView(), e.dispatch(C), true;
    } catch {
      return false;
    }
  }
}
const rc = Qe.create({ name: "haimShiftArrowSelect", priority: 1e3, addKeyboardShortcuts() {
  return { "Shift-ArrowDown": ({ editor: e }) => Jr(e.view, "down"), "Shift-ArrowUp": ({ editor: e }) => Jr(e.view, "up") };
} });
function ac(e) {
  for (let t = e.depth; t > 0; t -= 1) if (e.node(t).isTextblock) return t;
  return -1;
}
function sc(e, t) {
  const { state: n } = e, r = n.schema.nodes.paragraph;
  if (!r) return false;
  const a = n.selection.$head, s = ac(a);
  if (s < 0) return false;
  const l = a.before(s), c = r.createAndFill();
  if (!c) return false;
  let d = n.tr.insert(l, c);
  try {
    d = d.setSelection(_.near(d.doc.resolve(l + 1)));
  } catch {
    return false;
  }
  return d.scrollIntoView(), (0, e.dispatch)(d), true;
}
const oc = Qe.create({ name: "haimInsertLineAbove", priority: 1e3, addKeyboardShortcuts() {
  return { "Mod-Shift-Enter": ({ editor: e }) => sc(e.view) };
} }), $t = /[\p{L}\p{N}_]/u;
function Pa(e, t) {
  try {
    const n = e.resolve(t);
    if (!n.parent.isTextblock) return null;
    const r = n.start(), a = n.parent.textContent;
    if (!a) return null;
    let s = Math.max(0, Math.min(a.length, t - r)), l = s;
    if (l > 0 && (l >= a.length || !$t.test(a[l])) && (l = s - 1), l < 0 || l >= a.length || !$t.test(a[l])) return null;
    let c = l, d = l + 1;
    for (; c > 0 && $t.test(a[c - 1]); ) c -= 1;
    for (; d < a.length && $t.test(a[d]); ) d += 1;
    return { from: r + c, to: r + d };
  } catch {
    return null;
  }
}
function ic(e) {
  const t = [];
  return e.descendants((n, r) => n.isTextblock ? (t.length > 0 && t.push({ pos: -1, ch: `
` }), n.forEach((a, s) => {
    if (a.isText && a.text) {
      const l = r + 1 + s;
      for (let c = 0; c < a.text.length; c += 1) t.push({ pos: l + c, ch: a.text[c] });
    } else a.isText || t.push({ pos: -1, ch: "\0" });
  }), false) : true), t;
}
function Ha(e, t, n = 1e3) {
  if (!t) return [];
  const r = ic(e);
  if (!r.length) return [];
  const a = r.map((d) => d.ch).join(""), s = t;
  if (!s) return [];
  const l = [];
  let c = 0;
  for (; l.length < n; ) {
    const d = a.indexOf(s, c);
    if (d < 0) break;
    const h = d + s.length, u = r[d], m = r[h - 1];
    let g = false;
    for (let x = d; x < h; x += 1) if (r[x].pos < 0) {
      g = true;
      break;
    }
    !g && u && m && u.pos >= 0 && m.pos >= 0 && l.push({ from: u.pos, to: m.pos + 1 }), c = d + Math.max(1, s.length);
  }
  return l;
}
function lc(e, t, n, r, a) {
  const s = Ha(e, t);
  if (!s.length) return null;
  const l = (h) => r.some((u) => u.from === h.from && u.to === h.to), c = (h) => {
    if (!a) return true;
    const u = Pa(e, h.from);
    return !!(u && u.from === h.from && u.to === h.to);
  }, d = s.find((h) => h.from >= n && !l(h) && c(h));
  return d || (s.find((h) => !l(h) && c(h)) ?? null);
}
function Ht(e, t) {
  if (t.from >= t.to) return "";
  try {
    return e.textBetween(t.from, t.to, `
`);
  } catch {
    return "";
  }
}
const $e = new Pe("haimMultiCursor"), gt = { ranges: [], mainIndex: 0, query: null, wholeWord: false }, Vn = "set", Hn = "clear";
function me(e) {
  return $e.getState(e) ?? gt;
}
function cc(e, t) {
  const n = [];
  for (const a of e) {
    const s = t.map(a.from, 1), l = t.map(a.to, -1);
    s <= l && n.push({ from: s, to: l });
  }
  n.sort((a, s) => a.from - s.from || a.to - s.to);
  const r = [];
  for (const a of n) {
    const s = r[r.length - 1];
    s && a.from <= s.to ? s.to = Math.max(s.to, a.to) : r.push({ ...a });
  }
  return r;
}
function uc(e, t) {
  if (t.ranges.length <= 1) return wr.empty;
  const n = t.ranges[t.mainIndex], r = [];
  for (let a = 0; a < t.ranges.length; a += 1) {
    const s = t.ranges[a];
    n && s.from === n.from && s.to === n.to || (s.from === s.to ? r.push(yr.widget(s.from, () => {
      const l = document.createElement("span");
      return l.className = "haim-multi-cursor", l.setAttribute("aria-hidden", "true"), l;
    }, { side: -1 })) : r.push(yr.inline(s.from, s.to, { class: "haim-multi-selection" })));
  }
  return wr.create(e, r);
}
function Dn(e, t, n, r) {
  const a = t.map((m, g) => ({ r: m, i: g })).sort((m, g) => g.r.from - m.r.from || g.r.to - m.r.to);
  let s = e.tr;
  const l = [];
  for (const { r: m, i: g } of a) s = s.insertText(n, m.from, m.to), l.push({ i: g, from: m.from, to: m.from + n.length });
  l.sort((m, g) => m.from - g.from);
  const c = l.map((m) => ({ from: m.from, to: m.to })), d = Math.max(0, l.findIndex((m) => m.i === r)), h = c[d] ?? c[0];
  if (h) try {
    s = s.setSelection(_.create(s.doc, h.from, h.to));
  } catch {
  }
  const u = { ranges: c, mainIndex: d >= 0 ? d : 0, query: me(e).query, wholeWord: me(e).wholeWord };
  return s.setMeta($e, { type: Vn, state: u }), s.scrollIntoView(), s;
}
function Zr(e, t) {
  const n = me(e.state);
  if (n.ranges.length <= 1) return false;
  if (n.ranges.some((s) => s.from !== s.to)) return e.dispatch(Dn(e.state, n.ranges, "", n.mainIndex)), true;
  const a = [];
  for (const s of n.ranges) if (t === "backward") {
    if (s.from <= 1) {
      a.push(s);
      continue;
    }
    try {
      const l = e.state.doc.resolve(s.from), c = Math.max(l.start(), s.from - 1);
      a.push({ from: c, to: s.from });
    } catch {
      a.push(s);
    }
  } else try {
    const l = e.state.doc.resolve(s.from), c = Math.min(l.end(), s.from + 1);
    a.push({ from: s.from, to: c });
  } catch {
    a.push(s);
  }
  return e.dispatch(Dn(e.state, a, "", n.mainIndex)), true;
}
function Rn(e, t, n = true) {
  const r = t.ranges[t.mainIndex] ?? t.ranges[0];
  let a = e.tr;
  if (r) try {
    a = a.setSelection(_.create(a.doc, r.from, r.to));
  } catch {
  }
  return a.setMeta($e, { type: Vn, state: t }), n && a.scrollIntoView(), a;
}
function dc(e, t) {
  const n = me(e), { selection: r } = e, a = { from: r.from, to: r.to };
  let s, l;
  if (n.ranges.length > 0 ? (s = n.ranges.map((x, C) => C === n.mainIndex ? a : { ...x }), l = n.mainIndex) : (s = [a], l = 0), s.some((x) => x.from === x.to)) {
    const x = s.map((S) => S.from !== S.to ? S : Pa(e.doc, S.from) ?? S);
    if (x.every((S, L) => S.from === s[L].from && S.to === s[L].to)) return false;
    const C = Ht(e.doc, x[0]);
    return t && t(Rn(e, { ranges: x, mainIndex: l, query: C, wholeWord: true })), true;
  }
  const d = n.query ?? Ht(e.doc, s[0]);
  if (!d || s.some((x) => Ht(e.doc, x) !== d)) return false;
  const h = s[s.length - 1], u = lc(e.doc, d, h.to, s, n.wholeWord);
  if (!u) return false;
  const m = [...s, u], g = { ranges: m, mainIndex: m.length - 1, query: d, wholeWord: n.wholeWord };
  return t && t(Rn(e, g)), true;
}
function fc(e, t) {
  if (me(e).ranges.length > 1) return false;
  const { selection: r } = e;
  if (r.empty) return false;
  const a = Ht(e.doc, { from: r.from, to: r.to });
  if (!a) return false;
  const s = Ha(e.doc, a);
  if (s.length <= 1) return false;
  let l = s.findIndex((d) => d.from === r.from && d.to === r.to);
  return l < 0 && (l = 0), t && t(Rn(e, { ranges: s, mainIndex: l, query: a, wholeWord: false })), true;
}
function hc() {
  return new Xe({ key: $e, state: { init: () => gt, apply(e, t) {
    const n = e.getMeta($e);
    if ((n == null ? void 0 : n.type) === Hn) return gt;
    if ((n == null ? void 0 : n.type) === Vn) return n.state;
    if (t.ranges.length === 0) return t;
    let r = t;
    if (e.docChanged) {
      const a = cc(t.ranges, e.mapping);
      if (a.length === 0) return gt;
      const s = Math.min(t.mainIndex, a.length - 1);
      r = { ...t, ranges: a, mainIndex: s };
    }
    if (e.selectionSet) {
      const { from: a, to: s } = e.selection, l = r.ranges.findIndex((c) => c.from === a && c.to === s);
      return l >= 0 ? { ...r, mainIndex: l } : gt;
    }
    return r;
  } }, props: { decorations(e) {
    return uc(e.doc, me(e));
  }, handleTextInput(e, t, n, r) {
    const a = me(e.state);
    return a.ranges.length <= 1 ? false : (e.dispatch(Dn(e.state, a.ranges, r, a.mainIndex)), true);
  }, handleKeyDown(e, t) {
    return me(e.state).ranges.length <= 1 ? false : t.key === "Backspace" ? (t.preventDefault(), Zr(e, "backward")) : t.key === "Delete" ? (t.preventDefault(), Zr(e, "forward")) : false;
  }, handleClick(e) {
    return me(e.state).ranges.length <= 1 || e.dispatch(e.state.tr.setMeta($e, { type: Hn })), false;
  } } });
}
const pc = Qe.create({ name: "haimMultiCursor", priority: 1e3, addCommands() {
  return { selectNextOccurrence: () => ({ state: e, dispatch: t }) => dc(e, t), selectAllOccurrences: () => ({ state: e, dispatch: t }) => fc(e, t), clearMultiCursor: () => ({ tr: e, dispatch: t }) => (t && (e.setMeta($e, { type: Hn }), t(e)), true) };
}, addKeyboardShortcuts() {
  return { "Mod-d": ({ editor: e }) => e.commands.selectNextOccurrence(), "Mod-Shift-l": ({ editor: e }) => e.commands.selectAllOccurrences(), Escape: ({ editor: e }) => me(e.state).ranges.length <= 1 ? false : e.commands.clearMultiCursor() };
}, addProseMirrorPlugins() {
  return [hc()];
} }), mc = Te.create({ name: "mathBlock", group: "block", atom: true, code: true, addAttributes() {
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
function ea({ label: e, onClick: t, children: n }) {
  return i.jsxs(Ot, { children: [i.jsx(_t, { asChild: true, children: i.jsx("button", { type: "button", className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft", "aria-label": e, onClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, children: n }) }), i.jsx(zt, { children: i.jsxs(Ft, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [e, i.jsx(Kt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Da(e, t) {
  const [n, r] = p.useState(null), [a, s] = p.useState(false);
  return p.useEffect(() => {
    const l = String(e || "").trim();
    if (!l) {
      r(null), s(false);
      return;
    }
    try {
      const c = bi.renderToString(l, { throwOnError: false, displayMode: t, output: "html" });
      r(c), s(false);
    } catch {
      r(null), s(true);
    }
  }, [e, t]), { html: n, error: a };
}
function gc({ node: e, updateAttributes: t, editor: n, selected: r }) {
  const a = String(e.attrs.latex || ""), s = n.isEditable, [l, c] = p.useState(false), [d, h] = p.useState(a), u = p.useRef(null), { html: m, error: g } = Da(a, true);
  p.useEffect(() => {
    h(a);
  }, [a]), p.useEffect(() => {
    var _a2;
    l && ((_a2 = u.current) == null ? void 0 : _a2.focus());
  }, [l]);
  const x = () => {
    const k = d.trim();
    t({ latex: k || a }), c(false);
  }, C = () => {
    h(a), c(false);
  };
  return l && s ? i.jsxs(ge, { as: "div", className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`, "data-type": "block-math", contentEditable: false, children: [i.jsx("textarea", { ref: u, className: "haim-math-block__textarea", value: d, rows: Math.min(8, Math.max(2, d.split(`
`).length + 1)), onChange: (k) => h(k.target.value), onBlur: x, onKeyDown: (k) => {
    k.key === "Escape" && (k.preventDefault(), C()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), x()), k.stopPropagation();
  }, spellCheck: false }), i.jsx(xt, { delayDuration: 250, skipDelayDuration: 0, children: i.jsx("div", { className: "haim-math-block__toolbar", children: i.jsx(ea, { label: "\uBBF8\uB9AC\uBCF4\uAE30", onClick: x, children: i.jsx(ha, { size: 14, "aria-hidden": true }) }) }) })] }) : i.jsxs(ge, { as: "div", className: `haim-math-block${r ? " is-selected" : ""}${g ? " haim-math-block--error" : ""}`, "data-type": "block-math", "data-latex": a, contentEditable: false, onDoubleClick: () => {
    s && c(true);
  }, children: [i.jsx(xt, { delayDuration: 250, skipDelayDuration: 0, children: s ? i.jsx("div", { className: "haim-math-block__toolbar", children: i.jsx(ea, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => c(true), children: i.jsx(pa, { size: 14, "aria-hidden": true }) }) }) : null }), m ? i.jsx("div", { className: "haim-math-block__render", dangerouslySetInnerHTML: { __html: m } }) : i.jsx("div", { className: "haim-math-block__fallback", children: a || "\u2026" })] });
}
function xc({ node: e, updateAttributes: t, editor: n, selected: r }) {
  const a = String(e.attrs.latex || ""), s = n.isEditable, [l, c] = p.useState(false), [d, h] = p.useState(a), u = p.useRef(null), { html: m, error: g } = Da(a, false);
  p.useEffect(() => {
    h(a);
  }, [a]), p.useEffect(() => {
    var _a2;
    l && ((_a2 = u.current) == null ? void 0 : _a2.focus());
  }, [l]);
  const x = () => {
    const k = d.trim();
    t({ latex: k || a }), c(false);
  }, C = () => {
    h(a), c(false);
  };
  return l && s ? i.jsx(ge, { as: "span", className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`, "data-type": "inline-math", contentEditable: false, children: i.jsx("input", { ref: u, type: "text", className: "haim-math-inline__input", value: d, onChange: (k) => h(k.target.value), onBlur: x, onKeyDown: (k) => {
    k.key === "Enter" && (k.preventDefault(), x()), k.key === "Escape" && (k.preventDefault(), C()), k.stopPropagation();
  }, spellCheck: false }) }) : i.jsx(ge, { as: "span", className: `haim-math-inline${r ? " is-selected" : ""}${g ? " haim-math-inline--error" : ""}`, "data-type": "inline-math", "data-latex": a, contentEditable: false, onDoubleClick: (k) => {
    k.preventDefault(), k.stopPropagation(), s && c(true);
  }, children: m ? i.jsx("span", { dangerouslySetInnerHTML: { __html: m } }) : i.jsx("span", { className: "haim-math-inline__fallback", children: a || "?" }) });
}
const bc = Ss.extend({ addNodeView() {
  return Ye(gc);
} }).configure({ katexOptions: { throwOnError: false, displayMode: true } }), kc = Cs.extend({ addNodeView() {
  return Ye(xc);
} }).configure({ katexOptions: { throwOnError: false, displayMode: false } }), qt = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"', "`": "`" }, wc = /* @__PURE__ */ new Set(["js", "javascript", "jsx", "mjs", "cjs", "ts", "typescript", "tsx"]), Ra = new Set(Object.values(qt)), yc = new Pe("haimCodeBlockBracketPairs");
function Ue(e, t) {
  return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
}
function Bn(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
}
function On(e) {
  return wc.has(String(e || "").trim().toLowerCase());
}
function Ba(e) {
  const { $from: t, $to: n } = e.selection;
  return t.parent.type.name !== "codeBlock" || n.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === n.before(n.depth);
}
function Sc(e) {
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
  const { key: t, code: n } = e;
  return t === "`" || n === "Backquote" && !e.shiftKey ? "`" : t in qt || Ra.has(t) ? t : n === "Quote" ? e.shiftKey ? '"' : "'" : null;
}
function ta(e) {
  return e ? /[\w$]/.test(e) : false;
}
function Cc(e, t) {
  const { from: n } = e.selection, r = Ue(e, n - 1), a = Ue(e, n);
  return !(ta(r) || ta(a) || a === t);
}
function vc(e, t) {
  if (!Ba(e) || t === "`" && !On(Bn(e))) return null;
  const { selection: n } = e, { from: r, to: a, empty: s } = n, l = qt[t];
  if (l !== void 0) {
    if (!s) {
      const d = e.doc.textBetween(r, a), h = e.tr.insertText(`${t}${d}${l}`, r, a);
      return h.setSelection(_.create(h.doc, r + t.length, r + t.length + d.length)), h;
    }
    if ((t === "'" || t === '"' || t === "`") && !Cc(e, t)) return Ue(e, r) === t ? e.tr.setSelection(_.create(e.doc, r + 1)) : null;
    const c = e.tr.insertText(`${t}${l}`, r, a);
    return c.setSelection(_.create(c.doc, r + t.length)), c;
  }
  return Ra.has(t) && s && Ue(e, r) === t ? t === "`" && !On(Bn(e)) ? null : e.tr.setSelection(_.create(e.doc, r + 1)) : null;
}
function Mc(e) {
  if (!Ba(e)) return null;
  const { selection: t } = e;
  if (!t.empty) return null;
  const { from: n } = t, r = Ue(e, n - 1), a = Ue(e, n), s = qt[r];
  return !s || a !== s || r === "`" && !On(Bn(e)) ? null : e.tr.delete(n - 1, n + 1);
}
function jc(e, t) {
  if (t.defaultPrevented) return false;
  if (t.key === "Backspace") {
    if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
    const a = Mc(e.state);
    return a ? (e.dispatch(a), true) : false;
  }
  const n = Sc(t);
  if (!n) return false;
  const r = vc(e.state, n);
  return r ? (e.dispatch(r), true) : false;
}
function Ec() {
  return new Xe({ key: yc, props: { handleKeyDown(e, t) {
    return jc(e, t);
  } } });
}
function Tc(e) {
  var _a2;
  return ((_a2 = String(e ?? "").match(/^[ \t]*/)) == null ? void 0 : _a2[0]) ?? "";
}
function Bt(e) {
  return /^[ \t]*$/.test(String(e ?? ""));
}
function Oa(e) {
  const t = String(e ?? "").split(`
`);
  return t.length < 2 ? false : Bt(t[t.length - 1]) && Bt(t[t.length - 2]);
}
function Vt(e) {
  const t = String(e ?? "").split(`
`);
  let n = 0, r = t.length;
  for (; n < r && Bt(t[n]); ) n += 1;
  for (; r > n && Bt(t[r - 1]); ) r -= 1;
  return t.slice(n, r).join(`
`);
}
function Lc(e, t) {
  const n = String(e ?? ""), r = Math.max(0, Math.min(t, n.length)), a = n.lastIndexOf(`
`, r - 1) + 1, s = n.indexOf(`
`, r), l = n.slice(a, s === -1 ? n.length : s);
  return Tc(l);
}
function Ut(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function Ic(e) {
  if (!Ut(e)) return null;
  const { $from: t, from: n, to: r } = e.selection, a = t.parent.textContent, l = `
${Lc(a, t.parentOffset)}`, c = e.tr.insertText(l, n, r);
  return c.setSelection(_.create(c.doc, n + l.length)), c;
}
function Nc(e) {
  if (!Ut(e)) return null;
  const { $from: t } = e.selection, n = t.parent.textContent, r = t.parentOffset, a = n.lastIndexOf(`
`, r - 1) + 1, s = t.start() + a, l = e.tr.insertText(`
`, s);
  return l.setSelection(_.create(l.doc, s)), l;
}
function Ac(e) {
  if (!Ut(e)) return null;
  const { $from: t, empty: n } = e.selection;
  if (!n || !(t.parentOffset === t.parent.nodeSize - 2)) return null;
  const a = t.parent.textContent;
  if (!Oa(a)) return null;
  const s = Vt(a), l = t.start(), c = t.end(), d = e.tr.insertText(s, l, c);
  return d.setSelection(_.create(d.doc, l + s.length)), d;
}
function $c(e, t) {
  const { $from: n, empty: r } = t.selection;
  if (!r || n.parent.type.name !== "codeBlock" || n.parentOffset !== n.parent.nodeSize - 2) return false;
  const a = n.parent.textContent;
  if (!Oa(a)) return false;
  const s = Vt(a), l = n.start(), c = n.end();
  return e.insertText(s, l, c), e.setSelection(_.create(e.doc, l + s.length)), true;
}
function Pc(e) {
  const { state: t } = e;
  if (!Ut(t)) return false;
  if (Ac(t)) return e.chain().command(({ tr: r, state: a }) => $c(r, a)).exitCode().run();
  const n = Ic(t);
  return n ? (e.view.dispatch(n), true) : false;
}
function Hc(e) {
  const t = Nc(e.state);
  return t ? (e.view.dispatch(t), true) : false;
}
const Dc = new Pe("haimCodeBlockIndent");
function Rc(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
}
function Un(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function _a(e, t, n) {
  const r = e.doc.resolve(t);
  if (r.parent.type.name !== "codeBlock") return [];
  const a = r.start(), s = r.end(), c = e.doc.textBetween(a, s, `
`, `
`).split(`
`), d = [];
  let h = a;
  for (let u = 0; u < c.length; u += 1) {
    const m = c[u] ?? "", g = u < c.length - 1 ? h + m.length + 1 : s;
    t < g && n > h && d.push(h), h = g;
  }
  return d;
}
function na(e, t) {
  var _a2;
  const n = ((_a2 = e.match(/^ */)) == null ? void 0 : _a2[0]) ?? "";
  return Math.min(n.length, t);
}
function Bc(e, t) {
  if (!Un(e)) return null;
  const n = Math.max(1, Math.round(t)), r = " ".repeat(n), { selection: a } = e, { from: s, to: l, empty: c } = a;
  if (c) {
    const g = e.tr.insertText(r, s);
    return g.setSelection(_.create(g.doc, s + r.length)), g;
  }
  const d = _a(e, s, l);
  if (d.length === 0) return null;
  const h = e.tr;
  for (let g = d.length - 1; g >= 0; g -= 1) h.insertText(r, d[g]);
  const u = d[0], m = h.mapping.map(l);
  return h.setSelection(_.create(h.doc, u, m)), h;
}
function Oc(e, t) {
  var _a2;
  if (!Un(e)) return null;
  const n = Math.max(1, Math.round(t)), { selection: r, doc: a } = e, { $from: s, empty: l } = r;
  if (l) {
    const w = s.start(), I = s.end(), A = a.textBetween(w, I, `
`, `
`).split(`
`), P = s.pos - w;
    let V = 0, ie = 0;
    for (let H = 0; H < A.length; H += 1) {
      const F = A[H] ?? "";
      if (ie + F.length >= P) {
        V = H;
        break;
      }
      ie += F.length + 1, H === A.length - 1 && (V = H);
    }
    const He = A[V] ?? "", ee = na(He, n);
    if (ee === 0) return e.tr;
    let E = w;
    for (let H = 0; H < V; H += 1) E += (((_a2 = A[H]) == null ? void 0 : _a2.length) ?? 0) + 1;
    const T = e.tr.delete(E, E + ee);
    return s.pos - E <= ee ? T.setSelection(_.create(T.doc, E)) : T.setSelection(_.create(T.doc, s.pos - ee)), T;
  }
  const { from: c, to: d } = r, h = _a(e, c, d);
  if (h.length === 0) return null;
  const u = s.start(), m = s.end(), x = a.textBetween(u, m, `
`, `
`).split(`
`), C = /* @__PURE__ */ new Map();
  {
    let w = u;
    for (let I = 0; I < x.length; I += 1) {
      const z = x[I] ?? "";
      C.set(w, z), w += z.length + (I < x.length - 1 ? 1 : 0);
    }
  }
  const k = e.tr;
  let S = 0, L = 0;
  for (let w = h.length - 1; w >= 0; w -= 1) {
    const I = h[w], z = C.get(I) ?? "", A = na(z, n);
    A !== 0 && (k.delete(I, I + A), L += A, I < c && (S += A));
  }
  if (L === 0) return k;
  const O = Math.max(h[0], c - S), N = k.mapping.map(d);
  return k.setSelection(_.create(k.doc, O, Math.max(O, N))), k;
}
function _c(e, t) {
  if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !Un(e.state)) return false;
  const n = Rc(e.state), r = ki(n, wi()), a = t.shiftKey ? Oc(e.state, r) : Bc(e.state, r);
  return a ? (e.dispatch(a), true) : false;
}
function zc() {
  return new Xe({ key: Dc, props: { handleKeyDown(e, t) {
    return _c(e, t);
  } } });
}
function ra(e) {
  return String(e || "").trim().toLowerCase() === "mermaid";
}
function Fc(e) {
  var _a2;
  return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
}
const za = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", Kc = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Wc = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
function _n({ label: e, onClick: t, active: n = false, expanded: r, children: a }) {
  return i.jsxs(Ot, { children: [i.jsx(_t, { asChild: true, children: i.jsx("button", { type: "button", className: `haim-code-block__action${n ? " is-copy-success" : ""}`, "aria-label": e, ...r !== void 0 ? { "aria-expanded": r } : {}, onClick: t, children: a }) }), i.jsx(zt, { children: i.jsxs(Ft, { side: "bottom", sideOffset: 6, className: za, children: [e, i.jsx(Kt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function qc({ language: e, onChange: t }) {
  const n = p.useId(), r = p.useRef(null), [a, s] = p.useState(false), [l, c] = p.useState(""), [d, h] = p.useState(0), u = yi(e), m = Si(e), g = Ci(e), x = vi(u, l), C = l.trim(), k = C.toLowerCase() === "plain" ? Mi : C, L = !!C && !x.some((w) => w.value.toLowerCase() === k.toLowerCase() || w.label.toLowerCase() === C.toLowerCase()) ? [{ value: k, label: C, custom: true }, ...x.map((w) => ({ ...w, custom: false }))] : x.map((w) => ({ ...w, custom: false }));
  p.useEffect(() => {
    if (!a) return;
    c(""), h(0);
    const w = window.setTimeout(() => {
      var _a2;
      return (_a2 = r.current) == null ? void 0 : _a2.focus();
    }, 0);
    return () => window.clearTimeout(w);
  }, [a]), p.useEffect(() => {
    h(0);
  }, [l]);
  const O = p.useCallback((w) => {
    t(ji(w)), s(false);
  }, [t]), N = (w) => {
    if (w.key === "ArrowDown") {
      if (w.preventDefault(), !L.length) return;
      h((I) => (I + 1) % L.length);
      return;
    }
    if (w.key === "ArrowUp") {
      if (w.preventDefault(), !L.length) return;
      h((I) => (I - 1 + L.length) % L.length);
      return;
    }
    if (w.key === "Enter") {
      w.preventDefault();
      const I = L[d] ?? L[0];
      I ? O(I.value) : C && O(k);
      return;
    }
    w.key === "Escape" && (w.preventDefault(), s(false));
  };
  return i.jsxs(ii, { open: a, onOpenChange: s, children: [i.jsxs(Ot, { children: [i.jsx(_t, { asChild: true, children: i.jsx(li, { asChild: true, children: i.jsxs("button", { type: "button", className: "haim-code-block__lang-trigger", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", "aria-haspopup": "listbox", "aria-expanded": a, onPointerDown: (w) => w.stopPropagation(), children: [i.jsx("span", { className: "haim-code-block__lang-label", children: g }), i.jsx("span", { className: "haim-code-block__lang-chevron", children: i.jsx(ga, { size: 12, "aria-hidden": true }) })] }) }) }), i.jsx(zt, { children: i.jsxs(Ft, { side: "bottom", sideOffset: 6, className: za, children: ["\uC5B8\uC5B4 \uAC80\uC0C9", i.jsx(Kt, { className: "fill-white dark:fill-odp-surface" })] }) })] }), i.jsx(ci, { children: i.jsxs(ui, { className: Kc, side: "bottom", align: "start", sideOffset: 4, onOpenAutoFocus: (w) => w.preventDefault(), onCloseAutoFocus: (w) => w.preventDefault(), onPointerDown: (w) => w.stopPropagation(), children: [i.jsxs("div", { className: "flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong", children: [i.jsx(fa, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }), i.jsx("input", { ref: r, type: "text", value: l, onChange: (w) => c(w.target.value), onKeyDown: N, placeholder: "\uC5B8\uC5B4 \uAC80\uC0C9\u2026", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4 \uAC80\uC0C9", "aria-controls": n, "aria-autocomplete": "list", autoComplete: "off", spellCheck: false, className: "min-w-0 flex-1 bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-odp-fg" })] }), i.jsx("ul", { id: n, role: "listbox", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", className: "max-h-56 overflow-y-auto p-1", children: L.length === 0 ? i.jsx("li", { className: "cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uC77C\uCE58\uD558\uB294 \uC5B8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : L.map((w, I) => {
    const z = w.value === m, A = I === d;
    return i.jsx("li", { role: "presentation", children: i.jsxs("button", { type: "button", role: "option", "aria-selected": z, "data-highlighted": A ? "true" : "false", className: Wc, onMouseEnter: () => h(I), onMouseDown: (P) => P.preventDefault(), onClick: () => O(w.value), children: [z ? i.jsx("span", { className: "absolute left-1.5 inline-flex items-center", children: i.jsx(ma, { size: 12, "aria-hidden": true }) }) : null, w.custom ? i.jsxs("span", { children: ["\uC0AC\uC6A9: ", i.jsx("span", { className: "font-mono", children: w.label })] }) : w.label] }) }, `${w.custom ? "custom:" : ""}${w.value}`);
  }) })] }) })] });
}
function Vc({ language: e, collapsed: t, copied: n, editable: r, onCopy: a, onToggleCollapse: s, onLanguageChange: l, extra: c }) {
  return i.jsxs("div", { className: "haim-code-block__header", children: [r && l ? i.jsx(qc, { language: e, onChange: l }) : i.jsx("span", { className: "haim-code-block__lang", children: e || "plain" }), i.jsxs("div", { className: "haim-code-block__actions", children: [c, i.jsx(_n, { label: n ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC", active: n, onClick: a, children: n ? i.jsx(ma, { size: 14, "aria-hidden": true }) : i.jsx(Zo, { size: 14, "aria-hidden": true }) }), i.jsx(_n, { label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30", expanded: !t, onClick: s, children: t ? i.jsx(ga, { size: 14, "aria-hidden": true }) : i.jsx(ei, { size: 14, "aria-hidden": true }) })] })] });
}
function Uc({ node: e, editor: t, selected: n, updateAttributes: r }) {
  const a = String(e.attrs.language || ""), s = ra(a), l = e.textContent || "", [c, d] = p.useState(null), [h, u] = p.useState(false), [m, g] = p.useState(false), [x, C] = p.useState(false), [k, S] = p.useState(false), L = t.isEditable, O = p.useRef(null);
  p.useEffect(() => {
    var _a2;
    if (!s || m || x) return;
    let A = false;
    const P = Fc(((_a2 = t.view) == null ? void 0 : _a2.dom) ?? null);
    return Ei(l, P).then((V) => {
      A || (V ? (d(V), u(false)) : (d(null), u(!!l.trim())));
    }), () => {
      A = true;
    };
  }, [s, m, x, l, t]);
  const N = p.useCallback(() => {
    var _a2;
    const A = l, P = () => {
      S(true), window.setTimeout(() => S(false), 1500);
    };
    if (typeof navigator < "u" && ((_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText)) {
      navigator.clipboard.writeText(A).then(P).catch(() => {
        try {
          const V = document.createElement("textarea");
          V.value = A, document.body.appendChild(V), V.select(), document.execCommand("copy"), V.remove(), P();
        } catch {
        }
      });
      return;
    }
    P();
  }, [l]), w = p.useCallback((A) => {
    r({ language: A }), ra(A) || (g(false), d(null), u(false));
  }, [r]), I = i.jsx("pre", { className: "haim-mermaid-block__source-hidden", "aria-hidden": true, children: i.jsx(Sr, { as: "code" }) }), z = i.jsx(Vc, { language: a, collapsed: x, copied: k, editable: L, onCopy: N, onToggleCollapse: () => C((A) => !A), ...L ? { onLanguageChange: w } : {}, extra: s && L && !x ? i.jsx(_n, { label: m || h ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => g((A) => !A), children: m || h ? i.jsx(ha, { size: 14, "aria-hidden": true }) : i.jsx(pa, { size: 14, "aria-hidden": true }) }) : null });
  return s && !m && c && !x ? i.jsxs(ge, { as: "div", className: `haim-code-block haim-mermaid-block${n ? " is-selected" : ""}`, "data-language": "mermaid", children: [i.jsx(xt, { delayDuration: 250, skipDelayDuration: 0, children: z }), i.jsx("div", { className: "haim-mermaid-block__chart", dangerouslySetInnerHTML: { __html: c }, onDoubleClick: () => {
    L && g(true);
  } }), I] }) : i.jsxs(ge, { as: "div", className: `haim-code-block${s ? " haim-code-block--mermaid-edit" : ""}${n ? " is-selected" : ""}${x ? " is-collapsed" : ""}`, "data-language": a || void 0, children: [i.jsx(xt, { delayDuration: 250, skipDelayDuration: 0, children: z }), x ? I : i.jsxs(i.Fragment, { children: [s && h ? i.jsx("div", { className: "haim-mermaid-block__error", children: "Mermaid \uB80C\uB354 \uC2E4\uD328" }) : null, i.jsxs("div", { className: "haim-code-block__body", children: [i.jsx(Aa, { text: l, className: "haim-code-block__line-numbers", contentRootRef: O }), i.jsx("pre", { ref: O, className: a ? `language-${a}` : void 0, children: i.jsx(Sr, { as: "code", ...a ? { className: `language-${a}` } : {} }) })] })] })] });
}
function Au(e, t) {
  const { state: n } = e;
  n.selection;
  let r = n.tr, a = false;
  return n.doc.descendants((s, l) => {
    if (s.type.name !== "codeBlock") return;
    const c = s.textContent, d = Vt(c);
    if (d === c) return;
    const h = l + 1, u = l + s.nodeSize - 1;
    r = r.insertText(d, r.mapping.map(h), r.mapping.map(u)), a = true;
  }), a ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
}
const Xc = new Pe("haimTrimCodeEdges");
function Yc() {
  return new Xe({ key: Xc, appendTransaction(e, t, n) {
    if (!e.some((S) => S.selectionSet || S.docChanged) || e.some((S) => S.getMeta("haimTrimCodeEdges"))) return null;
    const r = t.selection.$from, a = n.selection.$from, s = r.parent.type.name === "codeBlock", l = a.parent.type.name === "codeBlock";
    if (!s || l) return null;
    const c = r.depth, d = r.node(c), h = r.before(c);
    if (d.type.name !== "codeBlock") return null;
    const u = d.textContent, m = Vt(u);
    if (m === u) return null;
    const g = h + 1, x = h + d.nodeSize - 1;
    let C = g, k = x;
    for (const S of e) C = S.mapping.map(C), k = S.mapping.map(k);
    return n.tr.insertText(m, C, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
  } });
}
const Qc = Ti(Li), Gc = vs.extend({ priority: 1e3, addNodeView() {
  return Ye(Uc);
}, addKeyboardShortcuts() {
  var _a2;
  return { ...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? {}, Enter: ({ editor: t }) => Pc(t), "Shift-Enter": ({ editor: t }) => Hc(t) };
}, addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], Yc(), Ec(), zc()];
} }).configure({ lowlight: Qc, languageClassPrefix: "language-", enableTabIndentation: false, exitOnTripleEnter: false }), Jc = Ms.extend({ renderMarkdown: (e, t) => {
  if (!e) return "";
  const n = Array.isArray(e.content) ? e.content : [];
  return n.length === 0 ? "" : t.renderChildren(n);
} }), Zc = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
function $u(e) {
  const t = typeof e == "string" ? e : "", n = Zc.exec(t);
  if (!n) return { prefix: "", body: t };
  const r = n[1] ?? "";
  return { prefix: r, body: t.slice(r.length) };
}
function eu(e, t) {
  return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
}
function zn(e, t) {
  let n = 0;
  const r = Math.min(Math.max(0, t), e.length);
  for (let a = 0; a < r; a += 1) e.charCodeAt(a) === 10 && (n += 1);
  return n;
}
function tu(e) {
  if (!e) return 0;
  const t = "\0", n = eu(e, t), r = n.indexOf(t);
  return r < 0 ? 0 : zn(n, r);
}
function nu(e, t) {
  try {
    return e({ type: "doc", content: [t.toJSON()] }).replace(/\n+$/, "");
  } catch {
    return t.textContent || "";
  }
}
function ru(e, t, n) {
  const r = tu(n);
  let a = "";
  try {
    a = t(e.toJSON());
  } catch {
    a = "";
  }
  const s = [];
  let l = 0;
  return e.forEach((c, d) => {
    const h = d + c.nodeSize;
    if (c.type.name === "noteCover") {
      s.push({ pos: d, to: h, line0: 0 });
      return;
    }
    const u = nu(t, c);
    let m = -1;
    if (u.length > 0 && a && (m = a.indexOf(u, l), m < 0)) {
      let x = l;
      for (; x < a.length && a.charCodeAt(x) === 10; ) x += 1;
      m = a.indexOf(u, x);
    }
    let g;
    if (m >= 0) g = r + zn(a, m), l = m + Math.max(u.length, 1);
    else {
      for (; l < a.length && a.charCodeAt(l) === 10; ) l += 1;
      g = r + zn(a, l), l = Math.min(a.length, l + Math.max(u.length, u ? 0 : 1));
    }
    s.push({ pos: d, to: h, line0: g });
  }), s;
}
function au(e) {
  var _a2;
  const n = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
  return !n || typeof n.serialize != "function" ? null : (r) => n.serialize(r);
}
const su = Qe.create({ name: "haimSourceLine", addOptions() {
  return { getMetaPrefix: () => "" };
}, addDecorations() {
  const e = this.options.getMetaPrefix ?? (() => "");
  return { update: "document", create: ({ editor: t, state: n }) => {
    const r = au(t);
    if (!r) return [];
    const a = e() || "";
    return ru(n.doc, r, a).map((l) => js.Node(l.pos, l.to, { "data-line": String(l.line0) }));
  } };
} });
function ou(e, t, n) {
  return new Mn({ find: e, handler: ({ state: r, range: a, match: s }) => {
    if (!n()) return null;
    let l = t, c = a.from;
    const d = a.to;
    if (s[1]) {
      const h = s[0].lastIndexOf(s[1]);
      l += s[0].slice(h + s[1].length), c += h;
      const u = c - d;
      u > 0 && (l = s[0].slice(h - u, h) + l, c = d);
    }
    r.tr.insertText(l, c, d);
  } });
}
const iu = [{ find: /--$/, replace: "\u2014", ruleId: "emDash" }, { find: /\.\.\.$/, replace: "\u2026", ruleId: "ellipsis" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/, replace: "\u201C", ruleId: "doubleQuotes" }, { find: /"$/, replace: "\u201D", ruleId: "doubleQuotes" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/, replace: "\u2018", ruleId: "singleQuotes" }, { find: /'$/, replace: "\u2019", ruleId: "singleQuotes" }, { find: /<-$/, replace: "\u2190", ruleId: "leftArrow" }, { find: /->$/, replace: "\u2192", ruleId: "rightArrow" }, { find: /\(c\)$/, replace: "\xA9", ruleId: "copyright" }, { find: /\(tm\)$/, replace: "\u2122", ruleId: "trademark" }, { find: /\(sm\)$/, replace: "\u2120", ruleId: "servicemark" }, { find: /\(r\)$/, replace: "\xAE", ruleId: "registeredTrademark" }, { find: /(?:^|\s)(1\/2)\s$/, replace: "\xBD", ruleId: "oneHalf" }, { find: /(?:^|\s)(1\/4)\s$/, replace: "\xBC", ruleId: "oneQuarter" }, { find: /(?:^|\s)(3\/4)\s$/, replace: "\xBE", ruleId: "threeQuarters" }, { find: /\+\/-$/, replace: "\xB1", ruleId: "plusMinus" }, { find: /!=$/, replace: "\u2260", ruleId: "notEqual" }, { find: /\d+\s?([*x])\s?\d+$/, replace: "\xD7", ruleId: "multiplication" }, { find: /<<$/, replace: "\xAB", ruleId: "laquo" }, { find: />>$/, replace: "\xBB", ruleId: "raquo" }, { find: /\^2$/, replace: "\xB2", ruleId: "superscriptTwo" }, { find: /\^3$/, replace: "\xB3", ruleId: "superscriptThree" }], lu = Qe.create({ name: "haimTypography", addOptions() {
  return { initialRules: { ...ca } };
}, addStorage() {
  return { rules: { ...this.options.initialRules } };
}, addCommands() {
  return { setHaimTypographyRules: (e) => () => (this.storage.rules = { ...e }, true) };
}, addInputRules() {
  return iu.map(({ find: e, replace: t, ruleId: n }) => ou(e, t, () => !!this.storage.rules[n]));
} });
function Pu(e) {
  const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", a = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), s = (e == null ? void 0 : e.typographyRules) ?? ca, c = [r ? Cr.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, codeBlock: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }) : Cr.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }), Jc, pl, su.configure({ getMetaPrefix: a }), hl, $s.extend({ parseHTML() {
    return [{ tag: "img[src]:not([data-wiki-path])" }];
  }, addNodeView() {
    return Ye(ol);
  } }).configure({ allowBase64: true }), Ps.configure({ taskItem: false, taskList: false }), xl.configure({ nested: true }), kl, Hs.configure({ table: { resizable: r } }), Es, Ds.configure({ types: ["heading", "paragraph"] }), Rs.configure({ multicolor: true }), ...r ? [Gc] : [], Ts, Ls, lu.configure({ initialRules: s }), Bs.configure({ placeholder: t, ...r ? {} : { showOnlyCurrent: false } }), Is, Os.configure({ className: "haim-node-focused" }), Ns, As, bc, kc, Sl, jl, Tl, El, ...r ? [Ll] : [], Xl, Yl, mc, rc, oc, pc, ...r ? [ec] : []];
  return r ? [...c, _s, Ws.configure({ controls: true, nocookie: true }), qs.configure({ persist: true }), zs, Fs, Vs.configure({ emojis: Us, enableEmoticons: true }), Ks, Xs.configure({ injectCSS: true, visible: false }), Ys.configure({ types: ["heading", "paragraph"] }), Qs.configure({ getIndex: Gs }), wl] : c;
}
const Fn = /* @__PURE__ */ new WeakMap();
function cu(e, t) {
  if (e === t) return true;
  if (!e || !t) return false;
  try {
    return JSON.stringify(e) === JSON.stringify(t);
  } catch {
    return false;
  }
}
function Hu(e) {
  if (!e) return "";
  const t = e.getJSON(), n = Fn.get(e);
  if (n && cu(n.json, t)) return n.markdown;
  const r = e, a = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
  return Fn.set(e, { json: t, markdown: a }), a;
}
function Du(e) {
  e && Fn.delete(e);
}
export {
  qt as C,
  ql as H,
  On as a,
  Lc as b,
  Pu as c,
  Nu as d,
  Wl as e,
  ju as f,
  Hu as g,
  Tu as h,
  Du as i,
  eu as j,
  Ea as k,
  Eu as l,
  Iu as n,
  il as o,
  Kl as p,
  Sc as r,
  $u as s,
  Au as t,
  va as u,
  Lu as w
};
