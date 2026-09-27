import { c as le, s as Jr, P as on, d as ln, g as Qr, M as Zr, e as Se, f as ea, i as ta, T as Ut, N as na, h as Ne, R as Ie, B as ra, I as aa, j as Fn, C as sa, k as ia, l as oa, n as la, o as Wn, p as ca, q as ua, r as da, t as ha, v as fa, S as pa, w as ma, x as ga, L as xa, y as ba, z as wa, A as ya, F as ka, G as Sa, H as va, J as Ca, K as ja, O as Ma, Q as Na, U as Ea, V as Ta, W as La, X as $a, Y as Pa, Z as Aa, _ as Da, $ as Ha } from "./vendor-tiptap-C36_9pH2.js";
import { r as u, j as a } from "./vendor-react-BDjpSibw.js";
import { A as Gt, m as He } from "./vendor-motion-Djo_xQxQ.js";
import { t as Ra, O as za } from "./index-CUaeQqoG.js";
import { c as _a, n as Re, a9 as Ia, C as Ba, j as Oa, gf as Fa, ds as wt, aF as cn, gV as Wa, gW as cr, gq as Kn, u as Ka, aT as ur, gX as qa, gY as Xa } from "./index-Bi820a2m.js";
import { g as Ya } from "./Kbd-zJP-p1De.js";
import { t as qn, a_ as Va, P as Ua, a$ as Ga, b0 as Ja, b1 as Qa, v as Za, aT as Xn, z as Yn, U as es, R as ts, T as ns, b2 as rs, ad as as, o as ss, w as is, b3 as os, X as ls, E as dr, b4 as Qt, y as cs, ak as us, k as ds, j as hs } from "./vendor-lucide-DgWK5x8G.js";
import { N as fs, O as ps, Q as ms, U as gs, V as xs, W as bs, y as Qe, z as Ze, B as Jt, E as et, G as tt, H as nt, K as we, M as ye, h as rt, i as un, j as dn, k as hn, l as fn, A as pn } from "./vendor-radix-qpbG9kXl.js";
import { W as ws } from "./WikiImageSizeModal-CqFylg4e.js";
import { b as ys } from "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import { c as ks, f as Ss } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as vs } from "./toHtml-CLUdBs2z.js";
import { k as Cs } from "./vendor-katex-NqpuB_gR.js";
import { c as js } from "./lazyMermaid-CFU1x6wk.js";
import { c as Ms, g as Ns } from "./vendor-highlight-Cy0EGwO-.js";
function Es() {
  var _a2;
  return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
}
async function Ts(e) {
  const t = navigator.ink;
  if (!(t == null ? void 0 : t.requestPresenter)) return null;
  try {
    return await t.requestPresenter({ presentationArea: e });
  } catch {
    return null;
  }
}
async function Ls(e) {
  const { src: t, inkCanvas: s, highlightCanvas: r } = e, i = await $s(t), l = ("width" in i, i.width), c = ("height" in i, i.height), h = document.createElement("canvas");
  h.width = Math.max(1, Math.round(l)), h.height = Math.max(1, Math.round(c));
  const p = h.getContext("2d");
  if (!p) throw new Error("Canvas 2D unavailable");
  if (p.imageSmoothingEnabled = true, p.imageSmoothingQuality = "high", p.drawImage(i, 0, 0, h.width, h.height), s && s.width > 0 && s.height > 0 && p.drawImage(s, 0, 0, h.width, h.height), r && r.width > 0 && r.height > 0 && p.drawImage(r, 0, 0, h.width, h.height), "close" in i && typeof i.close == "function") try {
    i.close();
  } catch {
  }
  const m = await new Promise((d) => {
    h.toBlob((g) => d(g), "image/png");
  });
  if (!m) throw new Error("Failed to encode PNG");
  return m;
}
async function $s(e) {
  try {
    const t = await fetch(e, { mode: "cors", credentials: "omit" });
    if (!t.ok) throw new Error(`fetch ${t.status}`);
    const s = await t.blob();
    return await createImageBitmap(s);
  } catch {
    return await Ps(e);
  }
}
function Ps(e) {
  return new Promise((t, s) => {
    const r = new Image();
    r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => s(new Error("Image load failed for composite")), r.src = e;
  });
}
function St(e) {
  return Math.max(e.diameterX, e.diameterY);
}
function hr(e) {
  return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
}
function As(e, t) {
  return !(t >= 8) || !(e >= 1) ? 1 : A(e / t, 0.25, 12);
}
function Vn(e, t, s) {
  const r = Math.max(4, Math.min(96, Math.min(t, s) * 0.08));
  return A(e, 0.5, r);
}
function fr(e, t) {
  if (e.length < 2) return 0;
  const s = Math.max(0, t - 1), r = Math.min(e.length - 1, t + 1);
  if (s === r) {
    const c = e[Math.max(0, t - 1)], h = e[t];
    return Math.atan2(h.y - c.y, h.x - c.x);
  }
  const i = e[s], l = e[r];
  return Math.atan2(l.y - i.y, l.x - i.x);
}
function pr(e, t) {
  if (e.length === 0) return [];
  const s = e[0];
  if (!s) return [];
  const r = Math.max(0.5, t), i = [{ ...s }];
  let l = 0;
  for (let c = 1; c < e.length; c += 1) {
    const h = e[c - 1], p = e[c], m = Math.hypot(p.x - h.x, p.y - h.y);
    if (m < 1e-6) continue;
    let d = 0;
    for (; l + (m - d) >= r; ) {
      const g = r - l, w = (d + g) / m;
      i.push({ x: h.x + (p.x - h.x) * w, y: h.y + (p.y - h.y) * w, pressure: h.pressure + (p.pressure - h.pressure) * w }), d += g, l = 0;
    }
    l += m - d;
  }
  return i;
}
const Ds = [{ value: "300", label: "Light 300" }, { value: "400", label: "Regular 400" }, { value: "500", label: "Medium 500" }, { value: "600", label: "Semibold 600" }, { value: "700", label: "Bold 700" }, { value: "800", label: "ExtraBold 800" }], Hs = [{ value: "multiply", label: "Multiply" }, { value: "overlay", label: "Overlay" }, { value: "soft-light", label: "Soft light" }, { value: "screen", label: "Screen" }, { value: "darken", label: "Darken" }, { value: "lighten", label: "Lighten" }, { value: "color-burn", label: "Color burn" }, { value: "normal", label: "Normal" }];
function A(e, t, s) {
  return Math.min(s, Math.max(t, e));
}
const mr = 0.92, Un = 0.35;
function Rs(e, t) {
  const s = e.x - t.x, r = e.y - t.y;
  return s * s + r * r;
}
function gr(e, t, s = mr) {
  const r = A(s, 0.05, 1);
  return { x: e.x + (t.x - e.x) * r, y: e.y + (t.y - e.y) * r, pressure: e.pressure + (t.pressure - e.pressure) * r };
}
function zs(e, t, s, r = mr) {
  let i = t;
  const l = Un * Un;
  for (const c of s) {
    i = gr(i, c, r);
    const h = e[e.length - 1];
    !h || Rs(h, i) >= l ? e.push({ ...i }) : (h.x = i.x, h.y = i.y, h.pressure = i.pressure);
  }
  return i;
}
function _s(e) {
  if (e.length === 0) return "";
  const t = e[0];
  if (!t) return "";
  if (e.length === 1) return `M ${t.x} ${t.y} L ${t.x + 0.01} ${t.y}`;
  if (e.length === 2) {
    const r = e[1];
    return `M ${t.x} ${t.y} L ${r.x} ${r.y}`;
  }
  let s = `M ${t.x} ${t.y}`;
  for (let r = 0; r < e.length - 1; r += 1) {
    const i = e[r === 0 ? 0 : r - 1], l = e[r], c = e[r + 1], h = e[r + 2 < e.length ? r + 2 : r + 1], p = l.x + (c.x - i.x) / 6, m = l.y + (c.y - i.y) / 6, d = c.x - (h.x - l.x) / 6, g = c.y - (h.y - l.y) / 6;
    s += ` C ${p} ${m} ${d} ${g} ${c.x} ${c.y}`;
  }
  return s;
}
function Zt(e) {
  if (e.dash !== "dashed") return;
  const t = St(e), s = Math.max(2, t * 1.2);
  return `${Math.max(2, t * 2.2)} ${s}`;
}
function en(e) {
  return e === "square" ? "square" : "round";
}
function tn(e) {
  return e === "square" ? "miter" : "round";
}
function Is(e) {
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
function Gn(e, t, s) {
  e.lineCap = en(t.shape), e.lineJoin = tn(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, s), e.globalAlpha = A(t.opacity, 0.02, 1);
  const r = Zt(t);
  r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
}
function Bs(e, t, s, r, i = 1) {
  const l = Math.max(0.25, t.diameterX * i / 2), c = Math.max(0.25, t.diameterY * i / 2);
  e.save(), e.translate(s.x, s.y), e.rotate(r), e.beginPath(), t.shape === "square" ? e.rect(-l, -c, l * 2, c * 2) : e.ellipse(0, 0, l, c, 0, 0, Math.PI * 2), e.fill(), e.restore();
}
function xr(e, t) {
  if (t.points.length < 1) return;
  if (e.globalAlpha = A(t.opacity, 0.02, 1), hr(t)) {
    const i = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), l = pr(t.points, i);
    for (let c = 0; c < l.length; c += 1) {
      const h = l[c], p = Math.min(t.points.length - 1, Math.round(c / Math.max(1, l.length - 1) * (t.points.length - 1))), m = fr(t.points, p), d = t.kind === "pressure" ? h.pressure : 1;
      Bs(e, t, h, m, d);
    }
    return;
  }
  const s = St(t);
  if (t.kind === "pressure" && t.points.length >= 2) {
    for (let i = 1; i < t.points.length; i += 1) {
      const l = t.points[i - 1], c = t.points[i], h = Math.max(0.5, s * ((l.pressure + c.pressure) / 2));
      Gn(e, t, h), e.beginPath(), e.moveTo(l.x, l.y), e.lineTo(c.x, c.y), e.stroke();
    }
    return;
  }
  Gn(e, t, s), e.beginPath();
  const r = t.points[0];
  if (e.moveTo(r.x, r.y), t.points.length === 1) e.lineTo(r.x + 0.01, r.y);
  else for (let i = 1; i < t.points.length; i += 1) {
    const l = t.points[i];
    e.lineTo(l.x, l.y);
  }
  e.stroke();
}
function Os(e, t, s) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const i = r.getContext("2d");
  if (!i) return r;
  i.imageSmoothingEnabled = true, i.imageSmoothingQuality = "high";
  for (const l of s) i.save(), l.kind === "eraser" ? (i.globalCompositeOperation = "destination-out", i.strokeStyle = "rgba(0,0,0,1)", i.globalAlpha = 1) : (i.globalCompositeOperation = "source-over", i.strokeStyle = l.color), xr(i, l), i.restore();
  return r;
}
function Fs(e, t, s) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(t));
  const i = r.getContext("2d");
  if (!i) return r;
  i.imageSmoothingEnabled = true, i.imageSmoothingQuality = "high";
  for (const l of s) i.save(), l.kind === "eraser" ? (i.globalCompositeOperation = "destination-out", i.strokeStyle = "rgba(0,0,0,1)", i.globalAlpha = 1) : (i.globalCompositeOperation = Is(l.blend), i.strokeStyle = l.color), xr(i, l), i.restore();
  return r;
}
function Ws(e, t, s) {
  var _a2;
  e.textBaseline = "top", e.textAlign = "left";
  for (const r of t) {
    const i = r.text ?? "";
    if (!i.trim() && i.length === 0) continue;
    const l = Math.max(1, r.fontSizePx * Math.max(1e-3, s));
    e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = A(r.opacity, 0.02, 1), e.fillStyle = r.color;
    const c = ((_a2 = r.fontFamily) == null ? void 0 : _a2.trim()) || "sans-serif";
    e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${l}px ${c}`;
    const h = l * 1.3, p = i.split(`
`);
    for (let m = 0; m < p.length; m += 1) e.fillText(p[m] ?? "", r.x, r.y + m * h);
    e.restore();
  }
}
const Jn = 8192;
function Ks(e) {
  const t = Math.max(1, e.clientWidth), s = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : t, i = e.naturalHeight > 0 ? e.naturalHeight : s, l = Math.min(3, window.devicePixelRatio || 1);
  let c = Math.max(r, Math.round(t * l)), h = Math.max(i, Math.round(s * l));
  const p = Math.max(c, h);
  if (p > Jn) {
    const m = Jn / p;
    c = Math.max(1, Math.round(c * m)), h = Math.max(1, Math.round(h * m));
  }
  return { bufW: c, bufH: h, cssW: t, cssH: s };
}
let yt = null;
function Co(e) {
  yt = e;
}
function qs() {
  return typeof yt == "function";
}
async function br(e) {
  var _a2;
  if (!yt) throw new Error("Image upload is not available");
  const s = (_a2 = (await yt([e]))[0]) == null ? void 0 : _a2.trim();
  if (!s) throw new Error("Upload returned no path");
  return s;
}
function jo(e) {
  return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}
const mn = [0.22, 1, 0.36, 1], Xs = { duration: 0.2, ease: mn }, Ys = { duration: 0.28, ease: mn }, gt = 0.5, xt = 8, ze = 1.25, Vs = 2, me = 0.5, ke = 128, Us = 4e3, wr = 450, Gs = ["#111827", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"], Js = ["#facc15", "#f472b6", "#38bdf8", "#4ade80", "#fb923c"], Qs = { backgroundColor: "#ffffff", backgroundImage: ["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)", "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","), backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" };
function _e(e) {
  return Math.round(e * 10) / 10;
}
function Zs(e) {
  return Math.max(0.1, _e(e / 10));
}
function Qn(e, t) {
  return _e(A(e + t * Zs(e), me, ke));
}
const nn = 8, rn = 400;
function ei() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", t = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
}
const yr = ei(), oe = Ya(), Zn = yr ? `${oe}+Shift+Z` : `${oe}+Y`;
function ti(e, t) {
  const s = Math.max(1, Math.round(e / 10));
  return A(Math.round(e + t * s), nn, rn);
}
function ni(e, t) {
  if (!t) return 1;
  const s = e.pressure;
  return typeof s != "number" || Number.isNaN(s) || e.pointerType === "mouse" ? 0.5 : A(s || 0.05, 0.05, 1);
}
function W({ label: e, active: t = false, disabled: s = false, tone: r = "default", onClick: i, children: l }) {
  const c = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
  return a.jsxs(un, { children: [a.jsx(dn, { asChild: true, children: a.jsx("button", { type: "button", "aria-label": e, disabled: s, onClick: i, className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${c}`, children: l }) }), a.jsx(hn, { children: a.jsxs(fn, { side: "top", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [e, a.jsx(pn, { className: "fill-neutral-900" })] }) })] });
}
const ri = { backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" };
function er({ size: e = 16 }) {
  return a.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: a.jsx("path", { d: "M2 8h12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function tr({ size: e = 16 }) {
  return a.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: a.jsx("path", { d: "M2 8h3M7 8h3M12 8h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function ie({ stroke: e, fading: t = false }) {
  const s = e.kind === "eraser", r = s ? "#000" : e.color, i = s ? 1 : e.opacity, l = t ? { opacity: 0, transition: `opacity ${wr}ms ease-out` } : { opacity: i };
  if (hr(e)) {
    const p = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), m = pr(e.points, p);
    return a.jsx("g", { style: l, children: m.map((d, g) => {
      const w = Math.min(e.points.length - 1, Math.round(g / Math.max(1, m.length - 1) * (e.points.length - 1))), v = fr(e.points, w) * 180 / Math.PI, E = e.kind === "pressure" ? d.pressure : 1, k = Math.max(0.25, e.diameterX * E / 2), C = Math.max(0.25, e.diameterY * E / 2);
      return e.shape === "square" ? a.jsx("rect", { x: -k, y: -C, width: k * 2, height: C * 2, fill: r, transform: `translate(${d.x} ${d.y}) rotate(${v})` }, `${e.id}-st-${g}`) : a.jsx("ellipse", { cx: 0, cy: 0, rx: k, ry: C, fill: r, transform: `translate(${d.x} ${d.y}) rotate(${v})` }, `${e.id}-st-${g}`);
    }) });
  }
  const c = St(e);
  if (e.kind === "pressure" && e.points.length >= 2) return a.jsx("g", { style: l, children: e.points.slice(1).map((p, m) => {
    const d = e.points[m], g = Math.max(0.5, c * ((d.pressure + p.pressure) / 2));
    return a.jsx("path", { d: `M ${d.x} ${d.y} L ${p.x} ${p.y}`, fill: "none", stroke: r, strokeWidth: g, strokeLinecap: en(e.shape), strokeLinejoin: tn(e.shape), strokeMiterlimit: 2, strokeDasharray: Zt({ ...e, diameterX: g, diameterY: g }), style: { fill: "none" } }, `${e.id}-p-${m}`);
  }) });
  const h = _s(e.points);
  return h ? a.jsx("path", { d: h, fill: "none", stroke: r, strokeWidth: c, strokeLinecap: en(e.shape), strokeLinejoin: tn(e.shape), strokeMiterlimit: 2, strokeDasharray: Zt(e), style: { ...l, fill: "none" } }) : null;
}
function kr({ src: e, alt: t = "", open: s, onClose: r, onSaveAnnotated: i }) {
  const l = !!(s && e), [c, h] = u.useState(1), [p, m] = u.useState({ x: 0, y: 0 }), [d, g] = u.useState("pan"), [w, v] = u.useState("#111827ff"), [E, k] = u.useState("#facc15ff"), [C, D] = u.useState(4), [I, P] = u.useState(4), [N, O] = u.useState(1), [R, ce] = u.useState(0.45), [re, vt] = u.useState("multiply"), [ge, at] = u.useState("circle"), [xe, j] = u.useState("solid"), [M, T] = u.useState([]), [H, z] = u.useState([]), [F, te] = u.useState([]), [Q, K] = u.useState([]), [B, U] = u.useState(null), [G, q] = u.useState(null), [ae, ne] = u.useState("Paperozi, sans-serif"), [ue, X] = u.useState(24), [J, st] = u.useState("400"), [Ee, Ct] = u.useState("normal"), [Tr, jt] = u.useState(() => /* @__PURE__ */ new Set()), [Y, be] = u.useState(null), [Mt, Nt] = u.useState(false), [Lr, de] = u.useState([]), [L, $r] = u.useState({ w: 1, h: 1 }), [it, ot] = u.useState(null), [Pr, Et] = u.useState(false), [Be, xn] = u.useState(false), [bn, Tt] = u.useState(null), [Lt, $t] = u.useState(false), [Pt, wn] = u.useState(false), [At, Oe] = u.useState(false), Dt = u.useRef({ w: 4, h: 4 }), lt = u.useRef(null), Ht = u.useRef(null), ct = u.useRef(null), ve = u.useRef(null), yn = u.useRef([]), kn = u.useRef([]), Fe = u.useRef([]), he = u.useRef(null), fe = u.useRef(null), Rt = u.useRef(null), Sn = u.useRef(null), zt = u.useRef(0), pe = u.useRef(null), _t = u.useRef(null), Te = u.useRef(null), We = u.useRef(null), ut = u.useRef(null), Ce = u.useRef(null), dt = u.useRef(1), vn = u.useRef(c), Cn = u.useRef(0), Le = u.useRef(/* @__PURE__ */ new Map()), It = u.useRef([]), Ke = u.useRef(null);
  yn.current = M, kn.current = H, Fe.current = Q, vn.current = c;
  const jn = !!i && qs() && (M.length > 0 || H.length > 0 || Q.some((n) => n.text.trim().length > 0)), qe = Q.find((n) => n.id === B) ?? null, Xe = d === "highlighter" ? E : w, Ar = d === "highlighter" ? R : N, Ye = u.useCallback(() => {
    h(1), m({ x: 0, y: 0 });
  }, []), ht = u.useCallback(() => {
    for (const n of Le.current.values()) clearTimeout(n);
    Le.current.clear();
  }, []), Bt = u.useCallback(() => {
    T([]), z([]), te([]), K([]), U(null), q(null), jt(/* @__PURE__ */ new Set()), de([]), It.current = [], be(null), Nt(false), he.current = null, fe.current = null, zt.current = 0;
    const n = Sn.current, o = Rt.current;
    n && o && n.clearRect(0, 0, o.width, o.height), pe.current != null && (cancelAnimationFrame(pe.current), pe.current = null), We.current = null, ht();
  }, [ht]), Ot = u.useRef(false);
  u.useEffect(() => {
    if (!l) {
      Ot.current = false;
      return;
    }
    const n = !Ot.current;
    Ot.current = true, n && (Ye(), Bt(), g("pan"), Tt(null), ot(null));
  }, [l, e, Ye, Bt]), u.useEffect(() => {
    var _a2;
    l || (Oe(false), ht(), (_a2 = Ke.current) == null ? void 0 : _a2.call(Ke), Ke.current = null);
  }, [l, ht]);
  const $e = u.useCallback(() => {
    const n = Ht.current;
    if (!n) return;
    const { bufW: o, bufH: f, cssW: b } = Ks(n);
    b < 8 || n.clientHeight < 8 || (dt.current = As(o, b), $r({ w: o, h: f }));
  }, []);
  u.useEffect(() => {
    if (!l) return;
    $e();
    const n = Ht.current;
    if (!n) return;
    const o = () => $e();
    n.addEventListener("load", o);
    const f = typeof ResizeObserver < "u" ? new ResizeObserver($e) : null;
    return f == null ? void 0 : f.observe(n), window.addEventListener("resize", $e), () => {
      n.removeEventListener("load", o), f == null ? void 0 : f.disconnect(), window.removeEventListener("resize", $e);
    };
  }, [l, e, $e]), u.useEffect(() => {
    if (!l) {
      ve.current = null, Et(false);
      return;
    }
    let n = false;
    const o = ct.current;
    if (!o || !Es()) {
      Et(false);
      return;
    }
    return Ts(o).then((f) => {
      n || (ve.current = f, Et(!!f));
    }), () => {
      n = true, ve.current = null;
    };
  }, [l, e, L.w]);
  const Pe = u.useCallback((n, o, f) => {
    const b = lt.current;
    if (!b) {
      h(A(n, gt, xt));
      return;
    }
    const y = b.getBoundingClientRect(), x = o - y.left - y.width / 2, S = f - y.top - y.height / 2;
    h(($) => {
      const V = A(n, gt, xt), se = V / $;
      return m((ee) => ({ x: x - (x - ee.x) * se, y: S - (S - ee.y) * se })), V;
    });
  }, []), Dr = u.useCallback((n) => {
    var _a2;
    if ((_a2 = Ke.current) == null ? void 0 : _a2.call(Ke), Ke.current = null, lt.current = n, !n) return;
    const o = (f) => {
      f.preventDefault(), f.stopPropagation();
      const b = f.deltaY > 0 ? 1 / ze : ze;
      Pe(vn.current * b, f.clientX, f.clientY);
    };
    n.addEventListener("wheel", o, { passive: false, capture: true }), Ke.current = () => {
      n.removeEventListener("wheel", o, true);
    };
  }, [Pe]), Hr = u.useCallback((n) => {
    if (n.preventDefault(), n.stopPropagation(), c > 1.05) {
      Ye();
      return;
    }
    Pe(Vs, n.clientX, n.clientY);
  }, [c, Ye, Pe]), Ve = u.useCallback((n, o) => {
    const f = ct.current;
    if (!f) return null;
    const b = f.getBoundingClientRect();
    return b.width < 1 || b.height < 1 ? null : { x: (n.clientX - b.left) / b.width * L.w, y: (n.clientY - b.top) / b.height * L.h, pressure: ni(n, o) };
  }, [L.w, L.h]), Ft = u.useCallback((n) => {
    const o = n === "laser" ? 0.75 : 1, f = n === "highlighter" ? 4 : n === "laser" ? 2 : me;
    if (n === "highlighter") return { w: Math.max(f, C * o), h: Math.max(f, I * o) };
    const b = Math.max(f, C * o);
    return { w: b, h: b };
  }, [C, I]);
  u.useEffect(() => {
    d !== "eraser" && (d === "pen" || d === "pressure" || d === "highlighter" || d === "laser") && (Dt.current = { w: C, h: I });
  }, [d, C, I]);
  const Mn = u.useCallback(() => {
    const n = Dt.current;
    D(n.w), P(n.h);
  }, []), Nn = u.useCallback(() => {
    const n = Dt.current, o = Math.max(n.w, n.h), f = _e(A(o * 5, me, ke));
    D(f), P(f), g("eraser");
  }, []), Z = u.useCallback((n) => {
    if (d === "eraser" && n !== "eraser" && Mn(), n === "eraser") {
      Nn();
      return;
    }
    if (n === "highlighter") {
      g("highlighter"), j("solid"), at("square");
      return;
    }
    g(n);
  }, [d, Mn, Nn]), En = u.useCallback((n) => {
    var _a2, _b;
    n.preventDefault(), n.stopPropagation(), (_b = (_a2 = n.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, n.pointerId), Ce.current = { pointerId: n.pointerId, startX: n.clientX, startY: n.clientY, originX: p.x, originY: p.y };
  }, [p.x, p.y]), Tn = u.useCallback((n) => {
    const o = Ce.current;
    !o || o.pointerId !== n.pointerId || (n.preventDefault(), m({ x: o.originX + (n.clientX - o.startX), y: o.originY + (n.clientY - o.startY) }));
  }, []), Ln = u.useCallback((n) => {
    var _a2, _b;
    const o = Ce.current;
    if (!(!o || o.pointerId !== n.pointerId)) {
      Ce.current = null;
      try {
        (_b = (_a2 = n.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, n.pointerId);
      } catch {
      }
    }
  }, []), Ae = u.useCallback((n) => {
    const o = Le.current.get(n);
    o && clearTimeout(o);
    const f = setTimeout(() => {
      jt((y) => {
        const x = new Set(y);
        return x.add(n), x;
      });
      const b = setTimeout(() => {
        Le.current.delete(n), jt((y) => {
          const x = new Set(y);
          return x.delete(n), x;
        }), te((y) => y.filter((x) => x.id !== n));
      }, wr);
      Le.current.set(n, b);
    }, Us);
    Le.current.set(n, f);
  }, []), je = u.useCallback(() => {
    const n = Rt.current, o = Sn.current ?? (n == null ? void 0 : n.getContext("2d"));
    n && o && o.clearRect(0, 0, n.width, n.height), zt.current = 0;
  }, []), Wt = u.useCallback(() => {
    pe.current == null && (pe.current = requestAnimationFrame(() => {
      pe.current = null;
      const n = he.current;
      if (!n) {
        be(null);
        return;
      }
      be({ ...n, points: n.points.slice() });
    }));
  }, []), De = u.useCallback((n, o) => {
    const f = n.nativeEvent, b = typeof f.getCoalescedEvents == "function" ? f.getCoalescedEvents() : [], y = b.length > 0 ? b : [f], x = [];
    for (const S of y) {
      const $ = Ve(S, o);
      $ && x.push($);
    }
    if (x.length === 0) {
      const S = Ve(n, o);
      S && x.push(S);
    }
    return x;
  }, [Ve]), $n = u.useCallback((n) => {
    var _a2, _b;
    if (d !== "pen" && d !== "pressure" && d !== "highlighter" && d !== "laser" && d !== "eraser") return;
    n.preventDefault(), n.stopPropagation();
    const f = De(n, d === "pressure"), b = f[f.length - 1];
    if (!b) return;
    (_b = (_a2 = n.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, n.pointerId);
    const y = d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen", x = y === "laser" ? "#ef4444" : y === "highlighter" ? E : y === "eraser" ? "#000000" : w, S = Ft(y), $ = A(dt.current, 0.25, 12), V = Vn(Math.max(0.5, S.w * $), L.w, L.h), se = Vn(Math.max(0.5, S.h * $), L.w, L.h), ee = y === "eraser" ? 1 : y === "laser" ? 0.9 : y === "highlighter" ? R : N, _ = { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, seq: ++Cn.current, kind: y, color: x, diameterX: V, diameterY: se, points: [b], shape: ge, dash: xe, opacity: ee, ...y === "highlighter" ? { blend: re } : {} };
    if (he.current = _, fe.current = { ...b }, Nt(true), zt.current = 0, be({ ..._, points: [..._.points] }), je(), y === "laser" && Ae(_.id), (y === "pen" || y === "pressure") && ve.current && n.nativeEvent.isTrusted) try {
      const Gr = Math.max(S.w, S.h);
      ve.current.updateInkTrailStartPoint(n.nativeEvent, { color: w, diameter: Math.max(1, Gr * (y === "pressure" ? b.pressure : 1)) });
    } catch {
    }
  }, [d, w, E, R, N, re, ge, xe, De, Ft, Ae, je, Wt]), Pn = u.useCallback((n) => {
    const o = he.current;
    if (!o) return;
    n.preventDefault();
    const f = o.kind === "pressure", b = De(n, f);
    if (!b.length) return;
    const y = fe.current ?? o.points[o.points.length - 1];
    if (y && (fe.current = zs(o.points, y, b), Wt(), o.kind === "laser" && Ae(o.id), (o.kind === "pen" || o.kind === "pressure") && ve.current && n.nativeEvent.isTrusted)) try {
      const x = fe.current, $ = St(o) / Math.max(1e-3, dt.current);
      ve.current.updateInkTrailStartPoint(n.nativeEvent, { color: o.color, diameter: Math.max(1, $ * (o.kind === "pressure" ? (x == null ? void 0 : x.pressure) ?? 1 : 1)) });
    } catch {
    }
  }, [De, Wt, Ae]), An = u.useCallback((n) => {
    var _a2, _b;
    const o = he.current;
    if (!o) return;
    const f = o.kind === "pressure", b = De(n, f), y = b[b.length - 1];
    if (y && fe.current) {
      const S = gr(fe.current, y, 1), $ = o.points[o.points.length - 1];
      !$ || $.x !== S.x || $.y !== S.y ? o.points.push(S) : $.pressure = S.pressure, fe.current = S;
    }
    he.current = null, fe.current = null, pe.current != null && (cancelAnimationFrame(pe.current), pe.current = null), Nt(false);
    try {
      (_b = (_a2 = n.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, n.pointerId);
    } catch {
    }
    if (o.points.length === 0) {
      be(null), je();
      return;
    }
    const x = { ...o, points: [...o.points] };
    if (o.kind === "laser") {
      te((S) => [...S, x]), Ae(o.id), be(null), je();
      return;
    }
    if (de([]), o.kind === "highlighter") z((S) => [...S, x]);
    else if (o.kind === "eraser") {
      T((S) => [...S, x]), z((S) => [...S, x]), be(null), je();
      return;
    } else T((S) => [...S, x]);
    be(null), je();
  }, [De, Ae, je]), ft = u.useCallback((n) => {
    B && K((o) => o.map((f) => f.id === B ? { ...f, ...n } : f));
  }, [B]), Dn = u.useCallback((n) => {
    n.preventDefault(), n.stopPropagation();
    const o = Ve(n, false);
    if (!o) return;
    const f = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, b = { id: f, seq: ++Cn.current, x: o.x, y: o.y, text: "", color: w, opacity: N, fontSizePx: ue, fontFamily: ae, fontWeight: J, fontStyle: Ee };
    de([]), K((y) => [...y, b]), U(f), q(f), window.setTimeout(() => {
      var _a2;
      return (_a2 = ut.current) == null ? void 0 : _a2.focus();
    }, 30);
  }, [Ve, w, N, ue, ae, J, Ee]), Rr = u.useCallback((n) => {
    if (n.button === 1 || d === "pan") {
      En(n);
      return;
    }
    if (d === "text") {
      q(null), Dn(n);
      return;
    }
    U(null), q(null), $n(n);
  }, [d, En, $n, Dn]), zr = u.useCallback((n) => {
    if (!he.current) {
      const f = { x: n.clientX, y: n.clientY }, b = Te.current;
      b ? (Te.current = { x: b.x + (f.x - b.x) * 0.72, y: b.y + (f.y - b.y) * 0.72 }, _t.current == null && (_t.current = requestAnimationFrame(() => {
        _t.current = null, Te.current && ot({ ...Te.current });
      }))) : (Te.current = f, ot(f));
    }
    const o = We.current;
    if (o && o.pointerId === n.pointerId) {
      n.preventDefault();
      const f = ct.current;
      if (!f) return;
      const b = f.getBoundingClientRect(), y = (n.clientX - o.startClientX) / Math.max(1, b.width) * L.w, x = (n.clientY - o.startClientY) / Math.max(1, b.height) * L.h;
      K((S) => S.map(($) => $.id === o.id ? { ...$, x: o.originX + y, y: o.originY + x } : $));
      return;
    }
    if (Ce.current) {
      Tn(n);
      return;
    }
    he.current && Pn(n);
  }, [Tn, Pn, L.w, L.h]), Hn = u.useCallback((n) => {
    var _a2, _b, _c;
    if (((_a2 = We.current) == null ? void 0 : _a2.pointerId) === n.pointerId) {
      We.current = null;
      try {
        (_c = (_b = n.currentTarget).releasePointerCapture) == null ? void 0 : _c.call(_b, n.pointerId);
      } catch {
      }
    }
    Ce.current && Ln(n), he.current && An(n);
  }, [Ln, An]), Ue = u.useCallback(() => {
    var _a2;
    const n = G ?? B;
    try {
      (_a2 = ut.current) == null ? void 0 : _a2.blur();
    } catch {
    }
    if (n) {
      const o = Fe.current.find((f) => f.id === n);
      o && !o.text.trim() && (K((f) => f.filter((b) => b.id !== n)), U(null));
    }
    q(null);
  }, [G, B]), Kt = u.useCallback(() => {
    const n = B;
    if (!n) return;
    const o = Fe.current.find((f) => f.id === n);
    o && (It.current.push({ ...o }), de([]), K((f) => f.filter((b) => b.id !== n)), U(null), q(null));
  }, [B]), qt = u.useCallback(() => {
    const n = It.current.pop();
    if (n) {
      K((_) => [..._, n]), U(n.id), q(null);
      return;
    }
    const o = yn.current, f = kn.current, b = Fe.current, y = o[o.length - 1], x = f[f.length - 1], S = b[b.length - 1], $ = (y == null ? void 0 : y.seq) ?? -1, V = (x == null ? void 0 : x.seq) ?? -1, se = (S == null ? void 0 : S.seq) ?? -1, ee = Math.max($, V, se);
    if (!(ee < 0)) {
      if (se === ee && S) {
        de((_) => [..._, { layer: "text", text: S }]), K(b.slice(0, -1)), U((_) => _ === S.id ? null : _);
        return;
      }
      if (y && x && y.id === x.id && y.kind === "eraser" && y.seq === ee) {
        de((_) => [..._, { layer: "both", stroke: y }]), T(o.slice(0, -1)), z(f.slice(0, -1));
        return;
      }
      if ($ >= V && y && $ === ee) {
        de((_) => [..._, { layer: "ink", stroke: y }]), T(o.slice(0, -1));
        return;
      }
      x && V === ee && (de((_) => [..._, { layer: "highlight", stroke: x }]), z(f.slice(0, -1)));
    }
  }, []), Xt = u.useCallback(() => {
    de((n) => {
      if (!n.length) return n;
      const o = n[n.length - 1];
      return o ? (o.layer === "text" ? K((f) => [...f, o.text]) : o.layer === "both" || o.stroke.kind === "eraser" ? (T((f) => [...f, o.stroke]), z((f) => [...f, o.stroke])) : o.layer === "ink" ? T((f) => [...f, o.stroke]) : z((f) => [...f, o.stroke]), n.slice(0, -1)) : n;
    });
  }, []), Yt = u.useCallback((n) => {
    D((o) => Qn(o, n)), P((o) => Qn(o, n));
  }, []), Rn = u.useCallback((n) => {
    var _a2;
    const o = B, f = (o ? (_a2 = Fe.current.find((y) => y.id === o)) == null ? void 0 : _a2.fontSizePx : null) ?? ue, b = ti(f, n);
    X(b), o && K((y) => y.map((x) => x.id === o ? { ...x, fontSizePx: b } : x));
  }, [B, ue]), _r = u.useCallback((n) => {
    const o = _e(A(n, me, ke));
    D(o), P(o);
  }, []), Ir = u.useCallback(() => {
    Z("highlighter");
  }, [Z]), pt = u.useCallback(async (n) => {
    if (!i || !e || Be) return;
    const o = Q.some((f) => f.text.trim().length > 0);
    if (!(M.length === 0 && H.length === 0 && !o)) {
      xn(true), Tt(null);
      try {
        const f = Os(L.w, L.h, M), b = f.getContext("2d");
        b && Ws(b, Q, dt.current);
        const y = Fs(L.w, L.h, H), x = await Ls({ src: e, inkCanvas: f, highlightCanvas: y }), S = new File([x], `annotated-${Date.now()}.png`, { type: "image/png" });
        await i(n, S);
      } catch (f) {
        Tt(f instanceof Error ? f.message : String(f));
      } finally {
        xn(false);
      }
    }
  }, [i, e, Be, M, H, Q, L.w, L.h]), Vt = M.length + H.length + Q.length, zn = Vt > 0 || !!Y || Mt, mt = u.useCallback(() => {
    if (zn) {
      Oe(true);
      return;
    }
    Oe(false), r();
  }, [zn, r]), Br = u.useCallback(() => {
    Oe(false), r();
  }, [r]), Or = u.useCallback(() => {
    Oe(false);
  }, []);
  u.useEffect(() => {
    if (!l) return;
    const n = (o) => {
      var _a2;
      const f = o.target, b = (_a2 = f == null ? void 0 : f.tagName) == null ? void 0 : _a2.toLowerCase(), y = b === "input" || b === "textarea" || (f == null ? void 0 : f.isContentEditable), x = yr ? o.metaKey : o.ctrlKey, S = o.key.toLowerCase(), $ = o.code;
      if (x && S === "s") {
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), pt(o.shiftKey ? "saveAs" : "overwrite");
        return;
      }
      if (x && S === "z" && !o.shiftKey) {
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), qt();
        return;
      }
      if (x && (S === "y" || S === "z" && o.shiftKey)) {
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), Xt();
        return;
      }
      const V = !!B || d === "text", se = x && (o.shiftKey && (o.key === "<" || o.key === "," || $ === "Comma") || !o.shiftKey && (o.key === "[" || $ === "BracketLeft")), ee = x && (o.shiftKey && (o.key === ">" || o.key === "." || $ === "Period") || !o.shiftKey && (o.key === "]" || $ === "BracketRight"));
      if (V && (se || ee)) {
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), Rn(se ? -1 : 1);
        return;
      }
      if (o.key === "Escape") {
        if (At) return;
        if (d === "text" || G) {
          o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), G ? Ue() : U(null);
          return;
        }
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), mt();
        return;
      }
      if (B && !x && (S === "backspace" || S === "delete")) {
        if (G && y && b === "textarea" && f.value.length > 0) return;
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), Kt();
        return;
      }
      if (!y) {
        if (!x && o.key === "[") {
          o.preventDefault(), o.stopPropagation(), Yt(-1);
          return;
        }
        !x && o.key === "]" && (o.preventDefault(), o.stopPropagation(), Yt(1));
      }
    };
    return window.addEventListener("keydown", n, true), () => window.removeEventListener("keydown", n, true);
  }, [l, pt, qt, Xt, Yt, Rn, B, G, d, Ue, Kt, mt, At]);
  const Fr = d !== "pan" && d !== "text" && it != null && !Ce.current && !Mt, _n = Ft(d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen"), In = Math.max(4, _n.w * c), Bn = Math.max(4, _n.h * c), Wr = M.filter((n) => n.kind === "eraser"), Kr = M.filter((n) => n.kind !== "eraser"), qr = H.filter((n) => n.kind === "eraser"), Xr = H.filter((n) => n.kind !== "eraser"), Yr = Mt && d === "highlighter" ? { mixBlendMode: re } : {}, On = _a(Re(Xe) || "#111827ff"), Vr = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", Ge = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [Je, Ur] = u.useState(null);
  return a.jsxs(a.Fragment, { children: [a.jsx(fs, { open: l, onOpenChange: (n) => {
    n || mt();
  }, children: a.jsx(Gt, { children: l ? a.jsxs(ps, { forceMount: true, children: [a.jsx(ms, { asChild: true, forceMount: true, children: a.jsx(He.div, { className: "fixed inset-0 z-100060 bg-black/85", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: Xs }) }), a.jsx(gs, { asChild: true, forceMount: true, onOpenAutoFocus: (n) => n.preventDefault(), onEscapeKeyDown: (n) => {
    n.preventDefault();
  }, children: a.jsxs(He.div, { ref: Ur, className: "fixed inset-0 z-100061 flex flex-col outline-none", "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30", initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: Ys, children: [a.jsx(xs, { className: "sr-only", children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30" }), a.jsx(bs, { className: "sr-only", children: "\uBCA1\uD130 \uD39C\uC73C\uB85C \uADF8\uB9AC\uACE0 \uD655\uB300/\uCD95\uC18C\xB7\uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), a.jsx("div", { ref: Dr, className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${d === "pan" ? "cursor-grab" : d === "text" ? "cursor-text" : "cursor-none"}`, onPointerDown: Rr, onPointerMove: zr, onPointerUp: Hn, onPointerCancel: Hn, onPointerLeave: () => {
    ot(null), Te.current = null;
  }, children: e ? a.jsx("div", { className: "relative will-change-transform", style: { transform: `translate(${p.x}px, ${p.y}px) scale(${c})`, transformOrigin: "center center" }, onClick: (n) => n.stopPropagation(), children: a.jsxs("div", { ref: ct, className: "relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl", style: Qs, children: [a.jsx("img", { ref: Ht, src: e, alt: t || "", className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none", draggable: false, onDoubleClick: Hr }), a.jsxs("svg", { className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none", viewBox: `0 0 ${L.w} ${L.h}`, preserveAspectRatio: "none", "aria-hidden": true, children: [a.jsxs("defs", { children: [a.jsxs("mask", { id: "haim-ink-erase-mask", children: [a.jsx("rect", { x: "0", y: "0", width: L.w, height: L.h, fill: "#fff" }), Wr.map((n) => a.jsx(ie, { stroke: n }, `em-${n.id}`)), (Y == null ? void 0 : Y.kind) === "eraser" ? a.jsx(ie, { stroke: Y }) : null] }), a.jsxs("mask", { id: "haim-hi-erase-mask", children: [a.jsx("rect", { x: "0", y: "0", width: L.w, height: L.h, fill: "#fff" }), qr.map((n) => a.jsx(ie, { stroke: n }, `hem-${n.id}`)), (Y == null ? void 0 : Y.kind) === "eraser" ? a.jsx(ie, { stroke: Y }) : null] })] }), a.jsxs("g", { mask: "url(#haim-ink-erase-mask)", children: [Kr.map((n) => a.jsx(ie, { stroke: n }, n.id)), Y && (Y.kind === "pen" || Y.kind === "pressure") ? a.jsx(ie, { stroke: Y }) : null] }), a.jsxs("g", { mask: "url(#haim-hi-erase-mask)", style: { mixBlendMode: re }, children: [Xr.map((n) => a.jsx("g", { style: { mixBlendMode: n.blend || re }, children: a.jsx(ie, { stroke: n }) }, n.id)), (Y == null ? void 0 : Y.kind) === "highlighter" ? a.jsx("g", { style: { mixBlendMode: Y.blend || re }, children: a.jsx(ie, { stroke: Y }) }) : null] }), a.jsxs("g", { children: [F.map((n) => a.jsx(ie, { stroke: n, fading: Tr.has(n.id) }, n.id)), (Y == null ? void 0 : Y.kind) === "laser" ? a.jsx(ie, { stroke: Y }) : null] })] }), a.jsx("canvas", { ref: Rt, className: "pointer-events-none absolute inset-0 h-full w-full", width: L.w, height: L.h, style: Yr, "aria-hidden": true }), Q.map((n) => {
    const o = n.id === B, f = n.id === G, b = n.x / Math.max(1, L.w) * 100, y = n.y / Math.max(1, L.h) * 100;
    return a.jsx("div", { className: `absolute z-1 min-w-8 max-w-[90%] ${o ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`, style: { left: `${b}%`, top: `${y}%`, color: n.color, opacity: n.opacity, fontFamily: n.fontFamily, fontSize: `${n.fontSizePx}px`, fontWeight: n.fontWeight, fontStyle: n.fontStyle, lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word", cursor: d === "text" || o ? "move" : "default", pointerEvents: d === "text" || o ? "auto" : "none" }, onPointerDown: (x) => {
      var _a2, _b;
      d !== "text" && d !== "pan" || (x.stopPropagation(), x.preventDefault(), Z("text"), G && G !== n.id && Ue(), q(null), U(n.id), ne(n.fontFamily), X(n.fontSizePx), st(n.fontWeight), Ct(n.fontStyle), We.current = { id: n.id, pointerId: x.pointerId, startClientX: x.clientX, startClientY: x.clientY, originX: n.x, originY: n.y }, (_b = (_a2 = x.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, x.pointerId));
    }, onDoubleClick: (x) => {
      x.stopPropagation(), x.preventDefault(), Z("text"), U(n.id), q(n.id), ne(n.fontFamily), X(n.fontSizePx), st(n.fontWeight), Ct(n.fontStyle), window.setTimeout(() => {
        var _a2;
        return (_a2 = ut.current) == null ? void 0 : _a2.focus();
      }, 20);
    }, children: f ? a.jsx("textarea", { ref: ut, value: n.text, rows: Math.max(1, n.text.split(`
`).length), placeholder: "\uD14D\uC2A4\uD2B8 \uC785\uB825", className: "block w-full min-w-24 resize-none border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-white/40", style: { fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", fontStyle: "inherit", lineHeight: "inherit", color: "inherit", fieldSizing: "content" }, onPointerDown: (x) => x.stopPropagation(), onChange: (x) => {
      const S = x.target.value;
      K(($) => $.map((V) => V.id === n.id ? { ...V, text: S } : V));
    }, onBlur: () => {
      G === n.id && Ue();
    }, onKeyDown: (x) => {
      if (x.key === "Escape") {
        x.preventDefault(), x.stopPropagation(), Ue();
        return;
      }
      (x.key === "Backspace" || x.key === "Delete") && x.currentTarget.value.length === 0 && (x.preventDefault(), x.stopPropagation(), Kt());
    } }) : a.jsx("span", { className: "block", children: n.text || "\uD14D\uC2A4\uD2B8" }) }, n.id);
  })] }) }) : null }), Fr && it ? a.jsx("div", { className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow", style: { left: it.x - In / 2, top: it.y - Bn / 2, width: In, height: Bn, borderRadius: ge === "circle" ? "9999px" : "2px", borderStyle: xe === "dashed" ? "dashed" : "solid", opacity: A(Ar, 0.25, 0.85), backgroundColor: d === "eraser" ? "transparent" : Re(Xe) || void 0 }, "aria-hidden": true }) : null, (d === "text" || qe) && a.jsxs("aside", { className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md", onPointerDown: (n) => n.stopPropagation(), children: [a.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/90", children: [a.jsx(qn, { size: 14, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"] }), a.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [a.jsx("span", { children: "Font family" }), a.jsx(Ia, { value: (qe == null ? void 0 : qe.fontFamily) ?? ae, onChange: (n) => {
    ne(n), ft({ fontFamily: n });
  }, className: "w-full", inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs", allowAddWebfont: true })] }), a.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [a.jsx("span", { children: "Font size" }), a.jsxs("div", { className: "flex items-center gap-1", children: [a.jsx("input", { type: "number", min: nn, max: rn, step: 1, value: (qe == null ? void 0 : qe.fontSizePx) ?? ue, onChange: (n) => {
    const o = A(Math.round(Number(n.target.value) || 24), nn, rn);
    X(o), ft({ fontSizePx: o });
  }, className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white", "aria-label": "Font size (px)" }), a.jsx("span", { className: "shrink-0 text-white/60", children: "px" })] })] }), a.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [a.jsx("span", { children: "Font weight" }), a.jsxs(Qe, { value: (qe == null ? void 0 : qe.fontWeight) ?? J, onValueChange: (n) => {
    st(n), ft({ fontWeight: n });
  }, children: [a.jsx(Ze, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font weight", children: a.jsx(Jt, {}) }), a.jsx(et, { container: Je, children: a.jsx(tt, { className: Ge, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (n) => n.preventDefault(), children: a.jsx(nt, { className: "p-1", children: Ds.map((n) => a.jsx(we, { value: n.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: a.jsx(ye, { children: n.label }) }, n.value)) }) }) })] })] }), a.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [a.jsx("span", { children: "Font style" }), a.jsxs(Qe, { value: (qe == null ? void 0 : qe.fontStyle) ?? Ee, onValueChange: (n) => {
    const o = n === "italic" ? "italic" : "normal";
    Ct(o), ft({ fontStyle: o });
  }, children: [a.jsx(Ze, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font style", children: a.jsx(Jt, {}) }), a.jsx(et, { container: Je, children: a.jsx(tt, { className: Ge, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (n) => n.preventDefault(), children: a.jsxs(nt, { className: "p-1", children: [a.jsx(we, { value: "normal", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: a.jsx(ye, { children: "Normal" }) }), a.jsx(we, { value: "italic", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: a.jsx(ye, { children: "Italic" }) })] }) }) })] })] }), a.jsxs("p", { className: "text-[10px] leading-4 text-white/45", children: ["\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9", a.jsx("br", {}), "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1", a.jsx("br", {}), oe, "+[ ] / ", oe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30"] })] }), a.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: a.jsxs("div", { className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1", onPointerDown: (n) => n.stopPropagation(), children: [a.jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md", children: [a.jsx(W, { label: "\uD328\uB2DD", active: d === "pan", onClick: () => Z("pan"), children: a.jsx(Va, { size: 16 }) }), a.jsx(W, { label: "\uC77C\uBC18 \uD39C", active: d === "pen", onClick: () => Z("pen"), children: a.jsx(Ua, { size: 16 }) }), a.jsx(W, { label: "\uD544\uC555 \uD39C", active: d === "pressure", onClick: () => Z("pressure"), children: a.jsx(Ga, { size: 16 }) }), a.jsx(W, { label: "\uD615\uAD11\uD39C", active: d === "highlighter", onClick: Ir, children: a.jsx(Ja, { size: 16 }) }), a.jsx(W, { label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)", active: d === "laser", onClick: () => Z("laser"), children: a.jsx(Qa, { size: 16 }) }), a.jsx(W, { label: "\uC9C0\uC6B0\uAC1C", active: d === "eraser", onClick: () => Z("eraser"), children: a.jsx(Za, { size: 16 }) }), a.jsx(W, { label: "\uD14D\uC2A4\uD2B8", active: d === "text", onClick: () => Z("text"), children: a.jsx(qn, { size: 16 }) }), a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), a.jsxs("div", { className: "relative flex items-center", children: [a.jsx("button", { type: "button", "aria-label": "\uD39C \uC0C9\uC0C1", "aria-expanded": Pt, onClick: () => {
    wn((n) => (n && $t(false), !n));
  }, className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow", style: { backgroundColor: Re(Xe) || "#111827" } }), a.jsx(Gt, { mode: "popLayout", children: Pt ? a.jsxs(He.div, { initial: { opacity: 0, y: 16, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.9 }, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 }, className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md", children: [(d === "highlighter" ? Js : Gs).map((n, o, f) => {
    const b = (Re(Xe) || "").slice(0, 7).toLowerCase() === n.toLowerCase(), y = 0.03 * (f.length - o);
    return a.jsx(He.button, { type: "button", "aria-label": `\uC0C9\uC0C1 ${n}`, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: y }, onClick: () => {
      $t(false), d === "highlighter" ? k(`${n}ff`) : (v(`${n}ff`), (d === "pan" || d === "eraser" || d === "laser") && Z("pen")), wn(false);
    }, className: `h-7 w-7 rounded-full border-2 shadow ${b ? "border-sky-300 scale-110" : "border-white/40"}`, style: { backgroundColor: n } }, n);
  }), a.jsx(He.button, { type: "button", "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1", "aria-pressed": Lt, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: 0 }, onClick: () => $t((n) => !n), className: `h-7 w-7 rounded-full border-2 shadow ${Lt ? "border-sky-300 scale-110" : "border-white/50"}`, style: ri })] }, "haim-color-palette") : null }), a.jsx(Gt, { children: Pt && Lt ? a.jsxs(He.div, { initial: { opacity: 0, x: -6, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 }, transition: { duration: 0.18, ease: mn }, className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md", children: [a.jsx("div", { className: "mb-2 h-8 w-full rounded border border-white/20", style: { ...Ba, backgroundColor: Xe } }), a.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: a.jsx(Ra, { color: On, onChange: (n) => {
    const o = Re(n.startsWith("#") ? n : `#${n}`);
    o && (d === "highlighter" ? k(o) : (v(o), (d === "pan" || d === "eraser" || d === "laser") && Z("pen")));
  } }) }), a.jsx(za, { alpha: true, prefixed: true, color: On, onChange: (n) => {
    const o = Re(n.startsWith("#") ? n : `#${n}`);
    o && (d === "highlighter" ? k(o) : v(o));
  }, className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white" })] }, "haim-color-picker") : null })] }), a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), d === "highlighter" ? a.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [a.jsxs("label", { className: "flex items-center gap-0.5", children: [a.jsx("span", { className: "opacity-70", children: "W" }), a.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" }), a.jsx("input", { type: "number", min: me, max: ke, step: 0.1, value: C, onChange: (n) => D(_e(A(Number(n.target.value) || 1, me, ke))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" })] }), a.jsx("span", { className: "opacity-50", "aria-hidden": true, children: "\xD7" }), a.jsxs("label", { className: "flex items-center gap-0.5", children: [a.jsx("span", { className: "opacity-70", children: "H" }), a.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" }), a.jsx("input", { type: "number", min: me, max: ke, step: 0.1, value: I, onChange: (n) => P(_e(A(Number(n.target.value) || 1, me, ke))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" })] }), a.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }) : a.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [a.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), a.jsx("input", { type: "number", min: me, max: ke, step: 0.1, value: C, onChange: (n) => _r(Number(n.target.value) || 1), className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), a.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }), a.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [a.jsx("span", { className: "opacity-70", children: "\uD750\uB984" }), a.jsx("input", { type: "number", min: 5, max: 100, step: 5, value: Math.round((d === "highlighter" ? R : N) * 100), onChange: (n) => {
    const f = A(Number(n.target.value) || 5, 5, 100) / 100;
    d === "highlighter" ? ce(f) : O(f);
  }, className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uD750\uB984 (%)" }), a.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "%" })] }), a.jsxs(Qe, { value: ge, onValueChange: (n) => at(n), children: [a.jsx(Ze, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ge === "circle" ? "\uC6D0" : "\uB124\uBAA8", children: ge === "circle" ? a.jsx(Xn, { size: 16 }) : a.jsx(Yn, { size: 16 }) }), a.jsx(et, { container: Je, children: a.jsx(tt, { className: Ge, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (n) => n.preventDefault(), children: a.jsxs(nt, { className: "p-1", children: [a.jsxs(we, { value: "circle", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uC6D0", children: [a.jsx(Xn, { size: 16 }), a.jsx(ye, { className: "sr-only", children: "\uC6D0" })] }), a.jsxs(we, { value: "square", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uB124\uBAA8", children: [a.jsx(Yn, { size: 16 }), a.jsx(ye, { className: "sr-only", children: "\uB124\uBAA8" })] })] }) }) })] }), a.jsxs(Qe, { value: xe, onValueChange: (n) => j(n), children: [a.jsx(Ze, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": xe === "dashed" ? "Dashed" : "Solid", children: xe === "dashed" ? a.jsx(tr, { size: 16 }) : a.jsx(er, { size: 16 }) }), a.jsx(et, { container: Je, children: a.jsx(tt, { className: Ge, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (n) => n.preventDefault(), children: a.jsxs(nt, { className: "p-1", children: [a.jsxs(we, { value: "solid", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Solid", children: [a.jsx(er, { size: 16 }), a.jsx(ye, { className: "sr-only", children: "Solid" })] }), a.jsxs(we, { value: "dashed", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Dashed", children: [a.jsx(tr, { size: 16 }), a.jsx(ye, { className: "sr-only", children: "Dashed" })] })] }) }) })] }), d === "highlighter" ? a.jsxs(Qe, { value: re, onValueChange: (n) => vt(n), children: [a.jsx(Ze, { className: Vr, "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC", children: a.jsx(Jt, { placeholder: "Blend" }) }), a.jsx(et, { container: Je, children: a.jsx(tt, { className: `${Ge} max-h-56 overflow-auto`, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (n) => n.preventDefault(), children: a.jsx(nt, { className: "p-1", children: Hs.map((n) => a.jsx(we, { value: n.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: a.jsx(ye, { children: n.label }) }, n.value)) }) }) })] }) : null, a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), a.jsx(W, { label: `\uC2E4\uD589 \uCDE8\uC18C (${oe}+Z)`, disabled: Vt === 0, onClick: qt, children: a.jsx(es, { size: 16 }) }), a.jsx(W, { label: `\uB2E4\uC2DC \uC2E4\uD589 (${Zn})`, disabled: Lr.length === 0, onClick: Xt, children: a.jsx(ts, { size: 16 }) }), a.jsx(W, { label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30", disabled: Vt === 0 && F.length === 0, onClick: Bt, children: a.jsx(ns, { size: 16 }) }), a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), a.jsx(W, { label: "\uCD95\uC18C", onClick: () => {
    var _a2;
    const n = (_a2 = lt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!n) {
      h((o) => A(o / ze, gt, xt));
      return;
    }
    Pe(c / ze, n.left + n.width / 2, n.top + n.height / 2);
  }, children: a.jsx(rs, { size: 16 }) }), a.jsxs("span", { className: "min-w-10 text-center text-[11px] tabular-nums text-white/80", children: [Math.round(c * 100), "%"] }), a.jsx(W, { label: "\uD655\uB300", onClick: () => {
    var _a2;
    const n = (_a2 = lt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!n) {
      h((o) => A(o * ze, gt, xt));
      return;
    }
    Pe(c * ze, n.left + n.width / 2, n.top + n.height / 2);
  }, children: a.jsx(as, { size: 16 }) }), a.jsx(W, { label: "\uBCF4\uAE30 \uCD08\uAE30\uD654", onClick: Ye, children: a.jsx(ss, { size: 16 }) }), a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), a.jsx(W, { label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${oe}+S)`, tone: "save", disabled: !jn || Be, onClick: () => {
    pt("overwrite");
  }, children: a.jsx(is, { size: 16 }) }), a.jsx(W, { label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${oe}+Shift+S)`, tone: "saveAs", disabled: !jn || Be, onClick: () => {
    pt("saveAs");
  }, children: a.jsx(os, { size: 16 }) })] }), a.jsxs("p", { className: "max-w-xl text-center text-[10px] text-white/55", children: ["\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ", oe, "+[ ] / ", oe, "+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ", oe, "+Z / ", Zn, Pr ? " \xB7 Ink API" : "", Be ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""] }), bn ? a.jsx("p", { className: "max-w-xl text-center text-[10px] text-red-300", children: bn }) : null] }) }), a.jsx("button", { type: "button", className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80", "aria-label": "\uB2EB\uAE30", onClick: mt, children: a.jsx(ls, { size: 20 }) })] }) })] }, "haim-image-lightbox") : null }) }), a.jsx(Oa, { isOpen: At, title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30", cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1", variant: "danger", overlayClassName: "z-100070", onConfirm: Br, onCancel: Or })] });
}
function ai({ node: e, selected: t, editor: s, getPos: r, updateAttributes: i }) {
  const l = String(e.attrs.src || ""), c = String(e.attrs.alt || ""), h = String(e.attrs.title || ""), p = s.isEditable, [m, d] = u.useState(false), [g, w] = u.useState(null), v = u.useCallback((C) => {
    if (C.detail > 1) return;
    C.preventDefault(), C.stopPropagation();
    const D = typeof r == "function" ? r() : null;
    typeof D == "number" && s.chain().focus().setNodeSelection(D).run();
  }, [s, r]), E = u.useCallback((C) => {
    C.preventDefault(), C.stopPropagation(), l && (w(l), d(true));
  }, [l]), k = u.useCallback(async (C, D) => {
    if (!p) return;
    const I = await br(D), P = typeof r == "function" ? r() : null, N = URL.createObjectURL(D);
    if (C === "overwrite") {
      typeof P == "number" ? s.chain().focus().deleteRange({ from: P, to: P + e.nodeSize }).insertContentAt(P, { type: "wikiImage", attrs: { path: I, options: "", alt: I, width: null, height: null, background: null } }).run() : i({ src: N }), w(N);
      return;
    }
    if (typeof P != "number") return;
    const O = P + e.nodeSize;
    s.chain().focus().insertContentAt(O, { type: "wikiImage", attrs: { path: I, options: "", alt: I, width: null, height: null, background: null } }).run();
  }, [p, s, r, i, e.nodeSize]);
  return a.jsxs(le, { as: "span", className: `haim-stock-image-wrap${t ? " is-selected" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: v, onDoubleClick: E, children: [a.jsx("img", { src: l, alt: c, ...h ? { title: h } : {}, className: "haim-stock-image max-w-full h-auto cursor-pointer", draggable: false }), a.jsx(kr, { src: g || l || null, alt: c, open: m, onClose: () => {
    d(false), w(null);
  }, ...p ? { onSaveAnnotated: k } : {} })] });
}
const nr = "haim-mod-held";
function si(e, t) {
  let s = null;
  if (t.target instanceof HTMLAnchorElement) s = t.target;
  else {
    const r = t.target;
    if (!r) return null;
    s = r.closest("a");
  }
  return !s || !e.view.dom.contains(s) ? null : s;
}
function ii(e, t) {
  const s = (t.getAttribute("target") || t.target || "_blank").trim(), r = !s || s === "_self" ? "_blank" : s;
  window.open(e, r, "noopener,noreferrer");
}
function oi() {
  return new on({ key: new ln("haimLinkModCursor"), view(e) {
    const t = (h) => {
      e.dom.classList.toggle(nr, h);
    }, s = (h) => {
      t(!!(h.ctrlKey || h.metaKey));
    }, r = (h) => {
      (h.key === "Control" || h.key === "Meta" || h.ctrlKey || h.metaKey) && t(true);
    }, i = (h) => {
      s(h);
    }, l = () => t(false), c = (h) => {
      s(h);
    };
    return window.addEventListener("keydown", r, true), window.addEventListener("keyup", i, true), window.addEventListener("blur", l), e.dom.addEventListener("mousemove", c), { destroy() {
      window.removeEventListener("keydown", r, true), window.removeEventListener("keyup", i, true), window.removeEventListener("blur", l), e.dom.removeEventListener("mousemove", c), e.dom.classList.remove(nr);
    } };
  } });
}
function li(e, t, s, r) {
  if (r.button !== 0 || !s.editable) return false;
  const i = si(e, r);
  if (!i) return false;
  const l = Fa();
  if (!(r.metaKey || r.ctrlKey) && !l) return false;
  const h = Qr(s.state, t.name), p = (i.href || h.href || "").trim();
  return p ? (r.preventDefault(), ii(p, i), true) : false;
}
function ci(e, t) {
  return new on({ key: new ln("haimLinkClick"), props: { handleDOMEvents: { click: (s, r) => li(e, t, s, r) } } });
}
const ui = Jr.extend({ addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], oi(), ci(this.editor, this.type)];
} }).configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } });
function rr(e) {
  if (!e || typeof e != "object") return;
  const t = e;
  t.__haimRawTextPatched || (t.encodeTextForMarkdown = (s) => s, t.escapeMarkdownSyntax = (s) => s, t.__haimRawTextPatched = true);
}
const di = Zr.extend({ onBeforeCreate(e) {
  var _a2, _b, _c;
  (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
  const t = (_b = this.storage) == null ? void 0 : _b.manager;
  t && rr(t), ((_c = this.editor) == null ? void 0 : _c.markdown) && rr(this.editor.markdown);
} }), hi = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, fi = Se.create({ name: "pageBreak", group: "block", atom: true, selectable: true, draggable: true, parseHTML() {
  return [{ tag: "pgbr" }, { tag: "div[data-haim-pgbr]" }, { tag: "div.md-pgbr" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", Ne(e, { "data-haim-pgbr": "1", "data-md-pgbr": "1", class: "haim-pgbr md-pgbr" })];
}, markdownTokenizer: { name: "pageBreak", level: "block", start: (e) => {
  const t = /<pgbr\s*\/?\s*>/i.exec(e);
  return t ? t.index : -1;
}, tokenize: (e) => {
  const t = hi.exec(e);
  if (t) return { type: "pageBreak", raw: t[0] };
} }, parseMarkdown: (e, t) => t.createNode("pageBreak"), renderMarkdown: () => `<pgbr/>

`, addCommands() {
  return { setPageBreak: () => ({ chain: e, state: t }) => {
    const s = t.schema.nodes[this.name];
    if (!s || !ea(t, s)) return false;
    const { selection: r } = t, { $to: i } = r, l = e();
    return ta(r) ? l.insertContentAt(i.pos, { type: this.name }) : l.insertContent({ type: this.name }), l.command(({ state: c, tr: h, dispatch: p }) => {
      var _a2;
      if (p) {
        const { $to: m } = h.selection, d = m.end();
        if (m.nodeAfter) m.nodeAfter.isTextblock ? h.setSelection(Ut.create(h.doc, m.pos + 1)) : m.nodeAfter.isBlock ? h.setSelection(na.create(h.doc, m.pos)) : h.setSelection(Ut.create(h.doc, m.pos));
        else {
          const w = (_a2 = c.schema.nodes.paragraph || m.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
          w && (h.insert(d, w), h.setSelection(Ut.create(h.doc, d + 1)));
        }
        h.scrollIntoView();
      }
      return true;
    }).run();
  } };
} }), gn = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", pi = ["nw", "ne", "sw", "se"];
function ar(e) {
  if (!e) return;
  const t = {};
  for (const s of e.split(";")) {
    const r = s.trim();
    if (!r) continue;
    const i = r.indexOf(":");
    if (i < 0) continue;
    const l = r.slice(0, i).trim(), c = r.slice(i + 1).trim(), h = l.replace(/-([a-z])/g, (p, m) => m.toUpperCase());
    t[h] = c;
  }
  return t;
}
function sr(e, t, s, r) {
  const i = cn({ path: e, width: t, height: s, background: r }), l = i.indexOf("|");
  if (l < 0) return "";
  const c = i.lastIndexOf("]]");
  return i.slice(l + 1, c >= 0 ? c : void 0).trim();
}
function bt(e) {
  return `${Math.max(24, Math.round(e))}px`;
}
function mi(e) {
  return e ? e.closest(".overflow-auto") || e.parentElement : null;
}
function gi({ node: e, selected: t, editor: s, getPos: r, updateAttributes: i }) {
  var _a2, _b;
  const l = String(e.attrs.path || ""), c = String(e.attrs.options || ""), h = String(e.attrs.alt || l), p = e.attrs.width || null, m = e.attrs.height || null, d = e.attrs.background || null, g = s.isEditable, w = u.useRef(null), v = u.useRef(null), [E, k] = u.useState(false), [C, D] = u.useState(false), [I, P] = u.useState(null), [N, O] = u.useState(null);
  v.current = N;
  const R = u.useMemo(() => N ? { ...ar(wt({ width: null, height: null, background: d })), width: `${N.width}px`, height: `${N.height}px` } : ar(wt({ width: p, height: m, background: d })), [p, m, d, N]), ce = u.useCallback((j, M) => {
    const T = { width: j, height: M, options: sr(l, j, M, d) }, H = mi(s.view.dom), z = (H == null ? void 0 : H.scrollTop) ?? null, F = typeof r == "function" ? r() : null;
    if (typeof F == "number") {
      const Q = s.state.tr.setNodeMarkup(F, void 0, { ...e.attrs, ...T });
      s.view.dispatch(Q);
    } else i(T);
    const te = () => {
      H && z != null && (H.scrollTop = z);
    };
    te(), requestAnimationFrame(te), requestAnimationFrame(() => requestAnimationFrame(te));
  }, [s, r, i, l, d, e.attrs]), re = u.useCallback(() => {
    const j = v.current;
    j && (ce(bt(j.width), bt(j.height)), O(null), v.current = null);
    const M = typeof r == "function" ? r() : null;
    if (typeof M == "number") {
      const T = M + (e.nodeSize || 1);
      s.commands.setTextSelection(T);
    }
    s.commands.blur();
  }, [ce, s, r, e.nodeSize]), vt = u.useCallback((j, M) => {
    var _a3, _b2;
    if (!g) return;
    M.preventDefault(), M.stopPropagation();
    const T = w.current;
    if (!T) return;
    const H = T.getBoundingClientRect(), z = H.width, F = H.height, te = M.clientX, Q = M.clientY, K = F > 0 ? z / F : 1, B = M.pointerId;
    (_b2 = (_a3 = M.target).setPointerCapture) == null ? void 0 : _b2.call(_a3, B);
    const U = { width: z, height: F };
    v.current = U, O(U);
    const G = (ae) => {
      const ne = ae.clientX - te, ue = ae.clientY - Q;
      let X = z, J = F;
      j.includes("e") && (X = z + ne), j.includes("w") && (X = z - ne), j.includes("s") && (J = F + ue), j.includes("n") && (J = F - ue), X = Math.max(24, X), J = Math.max(24, J), (ae.shiftKey || ae.pointerType === "touch") && (Math.abs(ne) >= Math.abs(ue) ? J = X / K : X = J * K, X = Math.max(24, X), J = Math.max(24, J));
      const Ee = { width: X, height: J };
      v.current = Ee, O(Ee);
    }, q = (ae) => {
      var _a4, _b3;
      window.removeEventListener("pointermove", G), window.removeEventListener("pointerup", q), window.removeEventListener("pointercancel", q);
      try {
        (_b3 = (_a4 = ae.target).releasePointerCapture) == null ? void 0 : _b3.call(_a4, B);
      } catch {
      }
      const ne = v.current;
      ne && ce(bt(ne.width), bt(ne.height)), v.current = null, O(null);
    };
    window.addEventListener("pointermove", G), window.addEventListener("pointerup", q), window.addEventListener("pointercancel", q);
  }, [g, ce]);
  u.useEffect(() => {
    if (!t || !g || E || C) return;
    const j = (M) => {
      if (M.key !== "Enter") return;
      const T = M.target;
      T instanceof HTMLInputElement || T instanceof HTMLTextAreaElement || T instanceof HTMLElement && T.isContentEditable || (M.preventDefault(), M.stopPropagation(), re());
    };
    return document.addEventListener("keydown", j, true), () => document.removeEventListener("keydown", j, true);
  }, [t, g, E, C, re]);
  const ge = u.useCallback((j) => {
    if (j.detail > 1 || j.target instanceof Element && j.target.closest("[data-resize-handle]")) return;
    j.preventDefault(), j.stopPropagation();
    const M = typeof r == "function" ? r() : null;
    typeof M == "number" && s.chain().focus().setNodeSelection(M).run();
  }, [s, r]), at = u.useCallback((j) => {
    j.preventDefault(), j.stopPropagation();
    const M = w.current, T = (M == null ? void 0 : M.currentSrc) || (M == null ? void 0 : M.src) || "";
    T && (P(T), D(true));
  }, []), xe = u.useCallback(async (j, M) => {
    if (!g) return;
    const T = await br(M), H = typeof r == "function" ? r() : null;
    if (j === "overwrite") {
      const F = { path: T, alt: T, options: sr(T, p, m, d) };
      typeof H == "number" ? s.view.dispatch(s.state.tr.setNodeMarkup(H, void 0, { ...e.attrs, ...F })) : i(F);
      const te = URL.createObjectURL(M);
      P(te);
      return;
    }
    if (typeof H != "number") return;
    const z = H + e.nodeSize;
    s.chain().focus().insertContentAt(z, { type: "wikiImage", attrs: { path: T, options: "", alt: T, width: null, height: null, background: null } }).run();
  }, [g, s, r, i, p, m, d, e.attrs, e.nodeSize]);
  return a.jsxs(le, { as: "div", className: `haim-wiki-image-wrap${t ? " is-selected" : ""}${N ? " is-resizing" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: ge, onDoubleClick: at, onContextMenu: (j) => {
    g && (j.preventDefault(), j.stopPropagation(), k(true));
  }, children: [a.jsxs("div", { className: "haim-wiki-image-frame", children: [a.jsx("img", { ref: w, src: gn, alt: h, className: "haim-wiki-image", "data-wiki-path": l, ...c ? { "data-wiki-options": c } : {}, ...p ? { "data-wiki-width": p } : {}, ...m ? { "data-wiki-height": m } : {}, ...d ? { "data-wiki-bg": d } : {}, style: R, draggable: false }), t && g ? pi.map((j) => a.jsx("button", { type: "button", className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${j}`, "aria-label": `resize-${j}`, "data-resize-handle": j, onPointerDown: (M) => vt(j, M) }, j)) : null] }), a.jsx(ws, { isOpen: E, onClose: () => k(false), path: l, kind: "wiki", initialWidth: p ?? "", initialHeight: m ?? "", imageSrc: ((_a2 = w.current) == null ? void 0 : _a2.currentSrc) || ((_b = w.current) == null ? void 0 : _b.src) || "", onApply: ({ width: j, height: M }) => {
    ce(j, M), k(false);
  } }), a.jsx(kr, { src: I, alt: h, open: C, onClose: () => {
    D(false), P(null);
  }, ...g ? { onSaveAnnotated: xe } : {} })] });
}
function Sr(e, t, s = "") {
  const r = t ? Wa(t) : null;
  return { path: e, options: t || "", alt: s || e, width: (r == null ? void 0 : r.width) ?? null, height: (r == null ? void 0 : r.height) ?? null, background: (r == null ? void 0 : r.background) ?? null };
}
const xi = Se.create({ name: "wikiImage", group: "block", atom: true, selectable: true, draggable: true, addAttributes() {
  return { path: { default: "" }, options: { default: "" }, alt: { default: "" }, width: { default: null }, height: { default: null }, background: { default: null } };
}, parseHTML() {
  return [{ tag: "img[data-wiki-path]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const s = e.getAttribute("data-wiki-width"), r = e.getAttribute("data-wiki-height"), i = e.getAttribute("data-wiki-bg"), l = e.getAttribute("data-wiki-options") || [s ? `w=${s}` : "", r ? `h=${r}` : "", i ? `bg=${i}` : ""].filter(Boolean).join(" ");
    return { path: t, options: l, alt: e.getAttribute("alt") || t, width: s || null, height: r || null, background: i || null };
  } }, { tag: "div[data-haim-wiki-image]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const s = e.getAttribute("data-wiki-options") || "";
    return Sr(t, s, e.getAttribute("data-wiki-alt") || t);
  } }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const s = String(e.attrs.path || ""), r = String(e.attrs.options || ""), i = String(e.attrs.alt || s), l = e.attrs.width || null, c = e.attrs.height || null, h = e.attrs.background || null, p = wt({ width: l, height: c, background: h });
  return ["img", Ne(t, { src: gn, alt: i, "data-wiki-path": s, ...r ? { "data-wiki-options": r } : {}, ...l ? { "data-wiki-width": l } : {}, ...c ? { "data-wiki-height": c } : {}, ...h ? { "data-wiki-bg": h } : {}, ...p ? { style: p } : {}, class: "haim-wiki-image" })];
}, addNodeView() {
  return Ie(gi);
}, renderMarkdown: (e) => {
  var _a2, _b, _c, _d, _e2;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.path) || "");
  if (!t) return "";
  const s = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c = e.attrs) == null ? void 0 : _c.height) || null, i = ((_d = e.attrs) == null ? void 0 : _d.background) || null;
  if (s || r || i) return `${cn({ path: t, width: s, height: r, background: i })}

`;
  const l = String(((_e2 = e.attrs) == null ? void 0 : _e2.options) || "");
  return l ? `![[${t}|${l}]]

` : `![[${t}]]

`;
} });
function Mo(e, t = "", s = "") {
  const r = Sr(e, t, s), i = wt({ width: r.width, height: r.height, background: r.background }), l = [`src="${gn}"`, `alt="${Me(r.alt)}"`, `data-wiki-path="${Me(r.path)}"`, 'class="haim-wiki-image"'];
  return r.options && l.push(`data-wiki-options="${Me(r.options)}"`), r.width && l.push(`data-wiki-width="${Me(r.width)}"`), r.height && l.push(`data-wiki-height="${Me(r.height)}"`), r.background && l.push(`data-wiki-bg="${Me(r.background)}"`), i && l.push(`style="${Me(i)}"`), `<img ${l.join(" ")} />`;
}
function Me(e) {
  return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
const bi = Se.create({ name: "wikiFigure", group: "block", content: "wikiImage figcaption", defining: true, isolating: true, parseHTML() {
  return [{ tag: "figure[data-haim-wiki-figure]" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figure", Ne(e, { "data-haim-wiki-figure": "1", class: "haim-wiki-figure" }), 0];
}, renderMarkdown: (e, t) => {
  const s = Array.isArray(e.content) ? e.content : [], r = s.find((h) => h.type === "wikiImage"), i = s.find((h) => h.type === "figcaption");
  let l = "";
  if (r == null ? void 0 : r.attrs) {
    const h = String(r.attrs.path || "");
    if (h) {
      const p = r.attrs.width || null, m = r.attrs.height || null, d = r.attrs.background || null;
      if (p || m || d) l = cn({ path: h, width: p, height: m, background: d });
      else {
        const g = String(r.attrs.options || "");
        l = g ? `![[${h}|${g}]]` : `![[${h}]]`;
      }
    }
  }
  const c = i ? String(t.renderChildren(i.content || []) || "").trim() : "";
  return l ? c ? `${l}
${c}

` : `${l}

` : c ? `${c}

` : "";
} }), wi = Se.create({ name: "figcaption", content: "inline*", defining: true, selectable: false, parseHTML() {
  return [{ tag: "figcaption" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figcaption", Ne(e), 0];
}, renderMarkdown: (e, t) => t.renderChildren(e.content || []) }), yi = Se.create({ name: "noteCover", group: "block", atom: true, selectable: true, draggable: false, parseHTML() {
  return [{ tag: "div[data-note-cover-placeholder]", priority: 60 }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", Ne(e, { class: "md-note-cover-placeholder md-note-cover-placeholder--pending", "data-note-cover-placeholder": "1", role: "button", tabindex: "0", title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9" }), ["div", { class: "md-note-cover-placeholder__mount", "data-note-cover-mount": "1" }], ["span", { class: "md-note-cover-placeholder__fallback" }, ["span", { class: "md-note-cover-placeholder__spinner", "aria-hidden": "true" }], ["span", { class: "md-note-cover-placeholder__fallback-text" }, "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"]]];
}, renderMarkdown: () => "" });
function No() {
  return `${ys()}

`;
}
function ki(e) {
  const t = getComputedStyle(e), s = t.lineHeight;
  if (s && s !== "normal") {
    const i = Number.parseFloat(s);
    if (Number.isFinite(i) && i > 0) return i;
  }
  const r = Number.parseFloat(t.fontSize);
  return Number.isFinite(r) && r > 0 ? r * 1.55 : 20;
}
function vr(e) {
  const t = ki(e);
  try {
    const s = getComputedStyle(e), r = document.createElement("div");
    r.setAttribute("aria-hidden", "true"), r.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", "width:auto", `font:${s.font}`, `font-size:${s.fontSize}`, `font-family:${s.fontFamily}`, `font-weight:${s.fontWeight}`, `font-style:${s.fontStyle}`, `letter-spacing:${s.letterSpacing}`, `line-height:${s.lineHeight}`, "white-space:pre", "padding:0", "margin:0", "border:0"].join(";"), r.textContent = "M", document.body.appendChild(r);
    const i = r.getBoundingClientRect().height || r.offsetHeight;
    if (r.remove(), i > 0) return i;
  } catch {
  }
  return t;
}
function Si(e) {
  const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), s = Number.parseFloat(t);
  return Number.isFinite(s) && s > 0 ? s : 4;
}
function Cr(e) {
  const t = e.closest("pre");
  if (t) {
    const s = getComputedStyle(t), r = (Number.parseFloat(s.paddingLeft) || 0) + (Number.parseFloat(s.paddingRight) || 0), i = t.clientWidth - r;
    if (i > 0) return i;
  }
  return e.clientWidth;
}
function vi(e) {
  return e.classList.contains("ProseMirror-trailingBreak");
}
function jr(e) {
  return Array.from(e.querySelectorAll("br")).filter((t) => !vi(t));
}
function Ci(e) {
  return Math.max(1, jr(e).length + 1);
}
function ji(e, t) {
  const s = cr(t);
  return e ? Math.max(s, Ci(e)) : s;
}
function Mi(e, t) {
  const s = Array.from(e.getClientRects()).filter((c) => c.height > 0 || c.width > 0);
  if (s.length === 0) return t;
  let r = 1 / 0, i = -1 / 0;
  for (const c of s) r = Math.min(r, c.top), i = Math.max(i, c.bottom);
  const l = i - r;
  return l > 0.5 ? l : t;
}
function Ni(e, t, s, r) {
  if (r === 0) {
    e.selectNodeContents(t), s[0] && e.setEndBefore(s[0]);
    return;
  }
  const i = s[r - 1];
  if (!i) {
    e.selectNodeContents(t), e.collapse(false);
    return;
  }
  e.setStartAfter(i);
  const l = s[r];
  l ? e.setEndBefore(l) : e.setEnd(t, t.childNodes.length);
}
function Ei(e, t, s, r) {
  const i = s > 0 ? t[s - 1] : null, l = t[s] ?? null;
  if (i && l) {
    const c = l.getBoundingClientRect().top - i.getBoundingClientRect().top;
    if (c > 0.5) return c;
  }
  if (!i && l) {
    const c = e.getBoundingClientRect().top, h = l.getBoundingClientRect().top - c;
    if (h > 0.5) return h;
  }
  if (i && !l) {
    const c = e.getBoundingClientRect().bottom - i.getBoundingClientRect().top;
    if (c > 0.5) return c;
  }
  return r;
}
function Ti(e, t, s) {
  const r = jr(e);
  if (r.length === 0 && t > 1) return null;
  const i = [], l = document.createRange();
  try {
    for (let c = 0; c < t; c += 1) if (Ni(l, e, r, c), l.collapsed) i.push(Ei(e, r, c, s));
    else {
      const h = Mi(l, s);
      i.push(Math.max(h, s * 0.95));
    }
  } catch {
    return null;
  }
  return i.length === t ? i : null;
}
function Li(e, t, s, r) {
  const i = Cr(e);
  if (i <= 0) return Array.from({ length: s }, () => r);
  const c = ks(t, Ss(e), i, Si(e)).map((h) => Math.max(1, h) * r);
  for (; c.length < s; ) c.push(r);
  return c.slice(0, s);
}
function $i(e, t, s, r) {
  const i = Cr(e);
  if (i <= 0) return Array.from({ length: s }, () => r);
  const l = t.length === 0 ? [""] : String(t).split(`
`);
  for (; l.length < s; ) l.push("");
  l.length > s && (l.length = s);
  const c = getComputedStyle(e), h = c.whiteSpace === "pre" || c.whiteSpace === "nowrap" ? "pre-wrap" : c.whiteSpace || "pre-wrap", p = document.createElement("div");
  p.setAttribute("aria-hidden", "true"), p.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", `width:${i}px`, `font:${c.font}`, `font-size:${c.fontSize}`, `font-family:${c.fontFamily}`, `font-weight:${c.fontWeight}`, `font-style:${c.fontStyle}`, `letter-spacing:${c.letterSpacing}`, `line-height:${c.lineHeight}`, `white-space:${h}`, `overflow-wrap:${c.overflowWrap || "break-word"}`, `word-break:${c.wordBreak || "normal"}`, `tab-size:${c.tabSize || 4}`, "box-sizing:border-box", "padding:0", "margin:0", "border:0"].join(";");
  for (const d of l) {
    const g = document.createElement("div");
    g.style.whiteSpace = h, g.style.overflowWrap = c.overflowWrap || "break-word", g.style.wordBreak = c.wordBreak || "normal", g.style.lineHeight = c.lineHeight, g.textContent = d.length > 0 ? d : "\xA0", p.appendChild(g);
  }
  document.body.appendChild(p);
  const m = [];
  for (let d = 0; d < s; d += 1) {
    const g = p.children[d], w = (g == null ? void 0 : g.getBoundingClientRect().height) || (g == null ? void 0 : g.offsetHeight) || 0;
    m.push(w > 0 ? w : r);
  }
  return p.remove(), m;
}
function Pi(e, t, s) {
  if (s <= 0) return [];
  const r = vr(e), i = Ti(e, s, r);
  return i ? i.map((l) => l > 0 ? l : r) : e.closest("pre") || e.tagName === "PRE" ? $i(e, t, s, r) : Li(e, t, s, r);
}
function ir(e) {
  return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
}
function Mr({ text: e, className: t, contentRootRef: s }) {
  const r = cr(e), [i, l] = u.useState(r), [c, h] = u.useState(null), [p, m] = u.useState(null);
  u.useLayoutEffect(() => {
    const g = (s == null ? void 0 : s.current) ?? null, w = ir(g);
    if (!w) {
      l(r), h(null), m(null);
      return;
    }
    let v = 0, E = null;
    const k = () => {
      cancelAnimationFrame(v), v = requestAnimationFrame(() => {
        const P = ir((s == null ? void 0 : s.current) ?? null);
        if (!P) {
          l(r), h(null), m(null);
          return;
        }
        const N = ji(P, e), O = vr(P), R = Pi(P, e, N);
        l(N), m(O), h(R.length === N && R.every((ce) => ce > 0) ? R : null);
      });
    };
    k(), E = new ResizeObserver(k), E.observe(w), g && g !== w && E.observe(g);
    const C = w.closest("pre");
    C && C !== w && C !== g && E.observe(C);
    const D = new MutationObserver(k);
    D.observe(w, { subtree: true, childList: true, characterData: true, attributes: true });
    const I = window.setTimeout(k, 0);
    return window.addEventListener(Kn, k), window.addEventListener("resize", k), () => {
      cancelAnimationFrame(v), window.clearTimeout(I), E == null ? void 0 : E.disconnect(), D.disconnect(), window.removeEventListener(Kn, k), window.removeEventListener("resize", k);
    };
  }, [e, r, s]);
  const d = p != null && p > 0 ? { lineHeight: `${p}px` } : void 0;
  return a.jsx("div", { className: ["haim-line-numbers", t].filter(Boolean).join(" "), style: d, "aria-hidden": true, children: Array.from({ length: i }, (g, w) => {
    const v = c == null ? void 0 : c[w], E = v != null && v > 0 ? { height: v, minHeight: v, maxHeight: v, lineHeight: p != null && p > 0 ? `${Math.min(p, v)}px` : void 0 } : void 0;
    return a.jsx("span", { className: "haim-line-numbers__n", style: E, children: w + 1 }, w);
  }) });
}
function Ai(e) {
  const s = Ka(String(e || ""))[0];
  return s ? { meta: s.meta ?? ur(), grid: s.grid } : null;
}
function Di(e, t) {
  return `${qa(e)}
${Xa(t)}`;
}
function Eo() {
  const e = ur(), t = { rows: [["", "", ""], ["", "", ""], ["", "", ""]], aligns: [null, null, null] };
  return { meta: e, grid: t, text: Di(e, t) };
}
const Hi = "haim-table-edit-request";
function Ri(e, t) {
  e.dispatchEvent(new CustomEvent(Hi, { detail: t, bubbles: true }));
}
function zi({ node: e, editor: t, selected: s, getPos: r }) {
  const i = String(e.attrs.kind || "raw"), l = String(e.attrs.text || ""), c = t.isEditable, h = u.useRef(null), p = u.useMemo(() => {
    if (i !== "haim-table") return null;
    const d = Ai(l);
    return d ? vs(d.grid, d.meta) : null;
  }, [i, l]), m = () => {
    if (!c || i !== "haim-table") return;
    const d = typeof r == "function" ? r() : null;
    typeof d == "number" && Ri(t.view.dom, { pos: d, text: l });
  };
  return i === "haim-table" && p ? a.jsx(le, { as: "div", className: `haim-raw-md haim-raw-md--haim-table${s ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": "haim-table", contentEditable: false, onDoubleClick: (d) => {
    d.preventDefault(), d.stopPropagation(), m();
  }, children: a.jsx("div", { className: "haim-haim-table-preview", dangerouslySetInnerHTML: { __html: p } }) }) : a.jsxs(le, { as: "div", className: `haim-raw-md${s ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": i, contentEditable: false, children: [a.jsx(Mr, { text: l, className: "haim-raw-md__line-numbers", contentRootRef: h }), a.jsx("pre", { ref: h, className: "haim-raw-md__pre", children: l })] });
}
const _i = Se.create({ name: "rawMarkdownBlock", group: "block", atom: true, selectable: true, code: true, addAttributes() {
  return { text: { default: "" }, kind: { default: "raw" } };
}, parseHTML() {
  return [{ tag: "pre[data-haim-raw-md]", getAttrs: (e) => e instanceof HTMLElement ? { text: e.textContent || "", kind: e.getAttribute("data-kind") || "raw" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["pre", Ne(t, { "data-haim-raw-md": "1", "data-kind": String(e.attrs.kind || "raw"), class: "haim-raw-md" }), String(e.attrs.text || "")];
}, addNodeView() {
  return Ie(zi);
}, renderMarkdown: (e) => {
  var _a2;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
  return t ? t.endsWith(`
`) ? t : `${t}
` : "";
} }), Ii = Se.create({ name: "deepHeading", group: "block", content: "inline*", defining: true, addAttributes() {
  return { level: { default: 7, parseHTML: (e) => {
    const t = Number(e.getAttribute("data-heading-level") || "7");
    return Number.isFinite(t) ? Math.min(10, Math.max(7, t)) : 7;
  } } };
}, parseHTML() {
  return [{ tag: "h6[data-heading-level]", getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = Number(e.getAttribute("data-heading-level") || "0");
    return t < 7 || t > 10 ? false : { level: t };
  } }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const s = Number(e.attrs.level) || 7;
  return ["h6", { ...t, "data-heading-level": String(s), class: `haim-deep-heading haim-h${s}` }, 0];
}, renderMarkdown: (e, t) => {
  var _a2;
  const s = Number((_a2 = e.attrs) == null ? void 0 : _a2.level) || 7, r = "#".repeat(Math.min(10, Math.max(7, s))), i = t.renderChildren(e.content || []);
  return `${r} ${i}

`;
} }), Bi = Se.create({ name: "mathBlock", group: "block", atom: true, code: true, addAttributes() {
  return { latex: { default: "" }, display: { default: true } };
}, parseHTML() {
  return [{ tag: "div[data-haim-math]", getAttrs: (e) => e instanceof HTMLElement ? { latex: e.getAttribute("data-latex") || e.textContent || "", display: e.getAttribute("data-display") !== "false" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["div", Ne(t, { "data-haim-math": "1", "data-latex": String(e.attrs.latex || ""), "data-display": e.attrs.display ? "true" : "false", class: "haim-math-block" }), String(e.attrs.latex || "")];
}, renderMarkdown: (e) => {
  var _a2, _b;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.latex) || "").trim();
  return t ? ((_b = e.attrs) == null ? void 0 : _b.display) ? `$$
${t}
$$

` : `$${t}$

` : "";
} });
function or({ label: e, onClick: t, children: s }) {
  return a.jsxs(un, { children: [a.jsx(dn, { asChild: true, children: a.jsx("button", { type: "button", className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft", "aria-label": e, onClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, children: s }) }), a.jsx(hn, { children: a.jsxs(fn, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [e, a.jsx(pn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Nr(e, t) {
  const [s, r] = u.useState(null), [i, l] = u.useState(false);
  return u.useEffect(() => {
    const c = String(e || "").trim();
    if (!c) {
      r(null), l(false);
      return;
    }
    try {
      const h = Cs.renderToString(c, { throwOnError: false, displayMode: t, output: "html" });
      r(h), l(false);
    } catch {
      r(null), l(true);
    }
  }, [e, t]), { html: s, error: i };
}
function Oi({ node: e, updateAttributes: t, editor: s, selected: r }) {
  const i = String(e.attrs.latex || ""), l = s.isEditable, [c, h] = u.useState(false), [p, m] = u.useState(i), d = u.useRef(null), { html: g, error: w } = Nr(i, true);
  u.useEffect(() => {
    m(i);
  }, [i]), u.useEffect(() => {
    var _a2;
    c && ((_a2 = d.current) == null ? void 0 : _a2.focus());
  }, [c]);
  const v = () => {
    const k = p.trim();
    t({ latex: k || i }), h(false);
  }, E = () => {
    m(i), h(false);
  };
  return c && l ? a.jsxs(le, { as: "div", className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`, "data-type": "block-math", contentEditable: false, children: [a.jsx("textarea", { ref: d, className: "haim-math-block__textarea", value: p, rows: Math.min(8, Math.max(2, p.split(`
`).length + 1)), onChange: (k) => m(k.target.value), onBlur: v, onKeyDown: (k) => {
    k.key === "Escape" && (k.preventDefault(), E()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), v()), k.stopPropagation();
  }, spellCheck: false }), a.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: a.jsx("div", { className: "haim-math-block__toolbar", children: a.jsx(or, { label: "\uBBF8\uB9AC\uBCF4\uAE30", onClick: v, children: a.jsx(dr, { size: 14, "aria-hidden": true }) }) }) })] }) : a.jsxs(le, { as: "div", className: `haim-math-block${r ? " is-selected" : ""}${w ? " haim-math-block--error" : ""}`, "data-type": "block-math", "data-latex": i, contentEditable: false, onDoubleClick: () => {
    l && h(true);
  }, children: [a.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: l ? a.jsx("div", { className: "haim-math-block__toolbar", children: a.jsx(or, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => h(true), children: a.jsx(Qt, { size: 14, "aria-hidden": true }) }) }) : null }), g ? a.jsx("div", { className: "haim-math-block__render", dangerouslySetInnerHTML: { __html: g } }) : a.jsx("div", { className: "haim-math-block__fallback", children: i || "\u2026" })] });
}
function Fi({ node: e, updateAttributes: t, editor: s, selected: r }) {
  const i = String(e.attrs.latex || ""), l = s.isEditable, [c, h] = u.useState(false), [p, m] = u.useState(i), d = u.useRef(null), { html: g, error: w } = Nr(i, false);
  u.useEffect(() => {
    m(i);
  }, [i]), u.useEffect(() => {
    var _a2;
    c && ((_a2 = d.current) == null ? void 0 : _a2.focus());
  }, [c]);
  const v = () => {
    const k = p.trim();
    t({ latex: k || i }), h(false);
  }, E = () => {
    m(i), h(false);
  };
  return c && l ? a.jsx(le, { as: "span", className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`, "data-type": "inline-math", contentEditable: false, children: a.jsx("input", { ref: d, type: "text", className: "haim-math-inline__input", value: p, onChange: (k) => m(k.target.value), onBlur: v, onKeyDown: (k) => {
    k.key === "Enter" && (k.preventDefault(), v()), k.key === "Escape" && (k.preventDefault(), E()), k.stopPropagation();
  }, spellCheck: false }) }) : a.jsx(le, { as: "span", className: `haim-math-inline${r ? " is-selected" : ""}${w ? " haim-math-inline--error" : ""}`, "data-type": "inline-math", "data-latex": i, contentEditable: false, onDoubleClick: (k) => {
    k.preventDefault(), k.stopPropagation(), l && h(true);
  }, children: g ? a.jsx("span", { dangerouslySetInnerHTML: { __html: g } }) : a.jsx("span", { className: "haim-math-inline__fallback", children: i || "?" }) });
}
const Wi = ra.extend({ addNodeView() {
  return Ie(Oi);
} }).configure({ katexOptions: { throwOnError: false, displayMode: true } }), Ki = aa.extend({ addNodeView() {
  return Ie(Fi);
} }).configure({ katexOptions: { throwOnError: false, displayMode: false } });
function qi(e) {
  return String(e || "").trim().toLowerCase() === "mermaid";
}
function Xi(e) {
  var _a2;
  return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
}
const Yi = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg";
function kt({ label: e, onClick: t, active: s = false, expanded: r, children: i }) {
  return a.jsxs(un, { children: [a.jsx(dn, { asChild: true, children: a.jsx("button", { type: "button", className: `haim-code-block__action${s ? " is-copy-success" : ""}`, "aria-label": e, ...r !== void 0 ? { "aria-expanded": r } : {}, onClick: t, children: i }) }), a.jsx(hn, { children: a.jsxs(fn, { side: "bottom", sideOffset: 6, className: Yi, children: [e, a.jsx(pn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function lr({ language: e, collapsed: t, copied: s, onCopy: r, onToggleCollapse: i, extra: l }) {
  return a.jsxs("div", { className: "haim-code-block__header", children: [a.jsx("span", { className: "haim-code-block__lang", children: e || "code" }), a.jsxs("div", { className: "haim-code-block__actions", children: [l, a.jsx(kt, { label: s ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC", active: s, onClick: r, children: s ? a.jsx(cs, { size: 14, "aria-hidden": true }) : a.jsx(us, { size: 14, "aria-hidden": true }) }), a.jsx(kt, { label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30", expanded: !t, onClick: i, children: t ? a.jsx(ds, { size: 14, "aria-hidden": true }) : a.jsx(hs, { size: 14, "aria-hidden": true }) })] })] });
}
function Vi({ node: e, editor: t, selected: s }) {
  const r = String(e.attrs.language || ""), i = qi(r), l = e.textContent || "", [c, h] = u.useState(null), [p, m] = u.useState(false), [d, g] = u.useState(false), [w, v] = u.useState(false), [E, k] = u.useState(false), C = t.isEditable, D = u.useRef(null);
  u.useEffect(() => {
    var _a2;
    if (!i || d || w) return;
    let N = false;
    const O = Xi(((_a2 = t.view) == null ? void 0 : _a2.dom) ?? null);
    return js(l, O).then((R) => {
      N || (R ? (h(R), m(false)) : (h(null), m(!!l.trim())));
    }), () => {
      N = true;
    };
  }, [i, d, w, l, t]);
  const I = u.useCallback(() => {
    var _a2;
    const N = l, O = () => {
      k(true), window.setTimeout(() => k(false), 1500);
    };
    if (typeof navigator < "u" && ((_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText)) {
      navigator.clipboard.writeText(N).then(O).catch(() => {
        try {
          const R = document.createElement("textarea");
          R.value = N, document.body.appendChild(R), R.select(), document.execCommand("copy"), R.remove(), O();
        } catch {
        }
      });
      return;
    }
    O();
  }, [l]), P = a.jsx("pre", { className: "haim-mermaid-block__source-hidden", "aria-hidden": true, children: a.jsx(Fn, { as: "code" }) });
  return i && !d && c && !w ? a.jsxs(le, { as: "div", className: `haim-code-block haim-mermaid-block${s ? " is-selected" : ""}`, "data-language": "mermaid", children: [a.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: a.jsx(lr, { language: "mermaid", collapsed: w, copied: E, onCopy: I, onToggleCollapse: () => v((N) => !N), extra: C ? a.jsx(kt, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => g(true), children: a.jsx(Qt, { size: 14, "aria-hidden": true }) }) : null }) }), a.jsx("div", { className: "haim-mermaid-block__chart", dangerouslySetInnerHTML: { __html: c }, onDoubleClick: () => {
    C && g(true);
  } }), P] }) : a.jsxs(le, { as: "div", className: `haim-code-block${i ? " haim-code-block--mermaid-edit" : ""}${s ? " is-selected" : ""}${w ? " is-collapsed" : ""}`, "data-language": r || void 0, children: [a.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: a.jsx(lr, { language: r || (i ? "mermaid" : "code"), collapsed: w, copied: E, onCopy: I, onToggleCollapse: () => v((N) => !N), extra: i && C && !w ? a.jsx(kt, { label: d || p ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => g((N) => !N), children: d || p ? a.jsx(dr, { size: 14, "aria-hidden": true }) : a.jsx(Qt, { size: 14, "aria-hidden": true }) }) : null }) }), w ? P : a.jsxs(a.Fragment, { children: [i && p ? a.jsx("div", { className: "haim-mermaid-block__error", children: "Mermaid \uB80C\uB354 \uC2E4\uD328" }) : null, a.jsxs("div", { className: "haim-code-block__body", children: [a.jsx(Mr, { text: l, className: "haim-code-block__line-numbers", contentRootRef: D }), a.jsx("pre", { ref: D, className: r ? `language-${r}` : void 0, children: a.jsx(Fn, { as: "code", ...r ? { className: `language-${r}` } : {} }) })] })] })] });
}
function Er(e) {
  return String(e ?? "").replace(/^(?:\r?\n)+/, "").replace(/(?:\r?\n)+$/, "");
}
function To(e, t) {
  const { state: s } = e;
  s.selection;
  let r = s.tr, i = false;
  return s.doc.descendants((l, c) => {
    if (l.type.name !== "codeBlock") return;
    const h = l.textContent, p = Er(h);
    if (p === h) return;
    const m = c + 1, d = c + l.nodeSize - 1;
    r = r.insertText(p, r.mapping.map(m), r.mapping.map(d)), i = true;
  }), i ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
}
const Ui = new ln("haimTrimCodeEdges");
function Gi() {
  return new on({ key: Ui, appendTransaction(e, t, s) {
    if (!e.some((C) => C.selectionSet || C.docChanged) || e.some((C) => C.getMeta("haimTrimCodeEdges"))) return null;
    const r = t.selection.$from, i = s.selection.$from, l = r.parent.type.name === "codeBlock", c = i.parent.type.name === "codeBlock";
    if (!l || c) return null;
    const h = r.depth, p = r.node(h), m = r.before(h);
    if (p.type.name !== "codeBlock") return null;
    const d = p.textContent, g = Er(d);
    if (g === d) return null;
    const w = m + 1, v = m + p.nodeSize - 1;
    let E = w, k = v;
    for (const C of e) E = C.mapping.map(E), k = C.mapping.map(k);
    return s.tr.insertText(g, E, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
  } });
}
const Ji = Ms(Ns), Qi = sa.extend({ addNodeView() {
  return Ie(Vi);
}, addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], Gi()];
} }).configure({ lowlight: Ji, languageClassPrefix: "language-" }), Zi = ia.extend({ renderMarkdown: (e, t) => {
  if (!e) return "";
  const s = Array.isArray(e.content) ? e.content : [];
  return s.length === 0 ? "" : t.renderChildren(s);
} }), eo = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
function Lo(e) {
  const t = typeof e == "string" ? e : "", s = eo.exec(t);
  if (!s) return { prefix: "", body: t };
  const r = s[1] ?? "";
  return { prefix: r, body: t.slice(r.length) };
}
function to(e, t) {
  return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
}
function an(e, t) {
  let s = 0;
  const r = Math.min(Math.max(0, t), e.length);
  for (let i = 0; i < r; i += 1) e.charCodeAt(i) === 10 && (s += 1);
  return s;
}
function no(e) {
  if (!e) return 0;
  const t = "\0", s = to(e, t), r = s.indexOf(t);
  return r < 0 ? 0 : an(s, r);
}
function ro(e, t) {
  try {
    return e({ type: "doc", content: [t.toJSON()] }).replace(/\n+$/, "");
  } catch {
    return t.textContent || "";
  }
}
function ao(e, t, s) {
  const r = no(s);
  let i = "";
  try {
    i = t(e.toJSON());
  } catch {
    i = "";
  }
  const l = [];
  let c = 0;
  return e.forEach((h, p) => {
    const m = p + h.nodeSize;
    if (h.type.name === "noteCover") {
      l.push({ pos: p, to: m, line0: 0 });
      return;
    }
    const d = ro(t, h);
    let g = -1;
    if (d.length > 0 && i && (g = i.indexOf(d, c), g < 0)) {
      let v = c;
      for (; v < i.length && i.charCodeAt(v) === 10; ) v += 1;
      g = i.indexOf(d, v);
    }
    let w;
    if (g >= 0) w = r + an(i, g), c = g + Math.max(d.length, 1);
    else {
      for (; c < i.length && i.charCodeAt(c) === 10; ) c += 1;
      w = r + an(i, c), c = Math.min(i.length, c + Math.max(d.length, d ? 0 : 1));
    }
    l.push({ pos: p, to: m, line0: w });
  }), l;
}
function so(e) {
  var _a2;
  const s = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
  return !s || typeof s.serialize != "function" ? null : (r) => s.serialize(r);
}
const io = oa.create({ name: "haimSourceLine", addOptions() {
  return { getMetaPrefix: () => "" };
}, addDecorations() {
  const e = this.options.getMetaPrefix ?? (() => "");
  return { update: "document", create: ({ editor: t, state: s }) => {
    const r = so(t);
    if (!r) return [];
    const i = e() || "";
    return ao(s.doc, r, i).map((c) => la.Node(c.pos, c.to, { "data-line": String(c.line0) }));
  } };
} });
function $o(e) {
  const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", i = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), c = [r ? Wn.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, codeBlock: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }) : Wn.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }), Zi, di, io.configure({ getMetaPrefix: i }), ui, ga.extend({ parseHTML() {
    return [{ tag: "img[src]:not([data-wiki-path])" }];
  }, addNodeView() {
    return Ie(ai);
  } }).configure({ allowBase64: true }), xa.configure({ taskItem: { nested: true } }), ba.configure({ table: { resizable: r } }), ca, wa.configure({ types: ["heading", "paragraph"] }), ya.configure({ multicolor: true }), ...r ? [Qi] : [], ua, da, ha, ka.configure({ placeholder: t }), fa, Sa.configure({ className: "haim-node-focused" }), pa, ma, Wi, Ki, fi, xi, wi, bi, ...r ? [yi] : [], _i, Ii, Bi];
  return r ? [...c, va, Ea.configure({ controls: true, nocookie: true }), Ta.configure({ persist: true }), Ca, ja, La.configure({ emojis: $a, enableEmoticons: true }), Ma, Pa.configure({ injectCSS: true, visible: false }), Aa.configure({ types: ["heading", "paragraph"] }), Da.configure({ getIndex: Ha }), Na] : c;
}
const sn = /* @__PURE__ */ new WeakMap();
function oo(e, t) {
  if (e === t) return true;
  if (!e || !t) return false;
  try {
    return JSON.stringify(e) === JSON.stringify(t);
  } catch {
    return false;
  }
}
function Po(e) {
  if (!e) return "";
  const t = e.getJSON(), s = sn.get(e);
  if (s && oo(s.json, t)) return s.markdown;
  const r = e, i = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
  return sn.set(e, { json: t, markdown: i }), i;
}
function Ao(e) {
  e && sn.delete(e);
}
export {
  Hi as H,
  Eo as a,
  Di as b,
  $o as c,
  kr as d,
  jo as e,
  Po as g,
  Ao as i,
  to as j,
  No as n,
  Ai as p,
  Co as r,
  Lo as s,
  To as t,
  br as u,
  Mo as w
};
