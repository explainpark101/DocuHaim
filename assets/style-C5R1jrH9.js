import { c as oe, s as Ka, P as ra, d as sa, g as Xa, M as qa, e as ye, f as Ya, i as Va, T as Ut, N as Ua, h as Me, R as He, B as Ga, I as Qa, j as On, C as Za, k as Ja, l as er, n as tr, o as Bn, p as nr, q as ar, r as rr, t as sr, v as ir, S as or, w as lr, x as cr, L as ur, y as dr, z as hr, A as fr, F as pr, G as mr, H as gr, J as xr, K as br, O as wr, Q as yr, U as kr, V as Sr, W as jr, X as Cr, Y as vr, Z as Mr, _ as Nr, $ as Er } from "./vendor-tiptap-Cwq5MbeS.js";
import { r as c, j as n } from "./vendor-react-BDjpSibw.js";
import { A as Gt, m as ze } from "./vendor-motion-Djo_xQxQ.js";
import { t as Tr, O as Pr } from "./index-CUaeQqoG.js";
import { c as $r, n as Re, a9 as Dr, C as Lr, j as Ar, g7 as zr, dI as wt, aC as on, gK as Rr, gL as _r, u as Ir, aQ as ia, gM as Hr, gN as Or } from "./index-BF8EnhwI.js";
import { g as Br } from "./Kbd-zJP-p1De.js";
import { t as Fn, aZ as Fr, P as Wr, a_ as Kr, a$ as Xr, b0 as qr, v as Yr, aT as Wn, z as Kn, U as Vr, R as Ur, T as Gr, b1 as Qr, ad as Zr, o as Jr, w as es, b2 as ts, X as ns, E as oa, b3 as Zt, y as as, ak as rs, k as ss, j as is } from "./vendor-lucide-DgRPSpKt.js";
import { N as os, O as ls, Q as cs, U as us, V as ds, W as hs, y as Ze, z as Je, B as Qt, E as et, G as tt, H as nt, K as xe, M as be, h as at, i as ln, j as cn, k as un, l as dn, A as hn } from "./vendor-radix-qpbG9kXl.js";
import { W as fs } from "./WikiImageSizeModal-CFgFwQjh.js";
import { b as ps } from "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import { haimTableToHtml as ms } from "./toHtml-C4jHCOXi.js";
import { k as gs } from "./vendor-katex-NqpuB_gR.js";
import { c as xs } from "./lazyMermaid-CFU1x6wk.js";
import { c as bs, g as ws } from "./vendor-highlight-Cy0EGwO-.js";
function ys() {
  var _a;
  return typeof navigator > "u" ? false : !!((_a = navigator.ink) == null ? void 0 : _a.requestPresenter);
}
async function ks(e) {
  const a = navigator.ink;
  if (!(a == null ? void 0 : a.requestPresenter)) return null;
  try {
    return await a.requestPresenter({ presentationArea: e });
  } catch {
    return null;
  }
}
async function Ss(e) {
  const { src: a, inkCanvas: o, highlightCanvas: r } = e, i = await js(a), l = ("width" in i, i.width), d = ("height" in i, i.height), h = document.createElement("canvas");
  h.width = Math.max(1, Math.round(l)), h.height = Math.max(1, Math.round(d));
  const m = h.getContext("2d");
  if (!m) throw new Error("Canvas 2D unavailable");
  if (m.imageSmoothingEnabled = true, m.imageSmoothingQuality = "high", m.drawImage(i, 0, 0, h.width, h.height), o && o.width > 0 && o.height > 0 && m.drawImage(o, 0, 0, h.width, h.height), r && r.width > 0 && r.height > 0 && m.drawImage(r, 0, 0, h.width, h.height), "close" in i && typeof i.close == "function") try {
    i.close();
  } catch {
  }
  const p = await new Promise((u) => {
    h.toBlob((w) => u(w), "image/png");
  });
  if (!p) throw new Error("Failed to encode PNG");
  return p;
}
async function js(e) {
  try {
    const a = await fetch(e, { mode: "cors", credentials: "omit" });
    if (!a.ok) throw new Error(`fetch ${a.status}`);
    const o = await a.blob();
    return await createImageBitmap(o);
  } catch {
    return await Cs(e);
  }
}
function Cs(e) {
  return new Promise((a, o) => {
    const r = new Image();
    r.crossOrigin = "anonymous", r.onload = () => a(r), r.onerror = () => o(new Error("Image load failed for composite")), r.src = e;
  });
}
function St(e) {
  return Math.max(e.diameterX, e.diameterY);
}
function la(e) {
  return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
}
function vs(e, a) {
  return !(a >= 8) || !(e >= 1) ? 1 : L(e / a, 0.25, 12);
}
function Xn(e, a, o) {
  const r = Math.max(4, Math.min(96, Math.min(a, o) * 0.08));
  return L(e, 0.5, r);
}
function ca(e, a) {
  if (e.length < 2) return 0;
  const o = Math.max(0, a - 1), r = Math.min(e.length - 1, a + 1);
  if (o === r) {
    const d = e[Math.max(0, a - 1)], h = e[a];
    return Math.atan2(h.y - d.y, h.x - d.x);
  }
  const i = e[o], l = e[r];
  return Math.atan2(l.y - i.y, l.x - i.x);
}
function ua(e, a) {
  if (e.length === 0) return [];
  const o = e[0];
  if (!o) return [];
  const r = Math.max(0.5, a), i = [{ ...o }];
  let l = 0;
  for (let d = 1; d < e.length; d += 1) {
    const h = e[d - 1], m = e[d], p = Math.hypot(m.x - h.x, m.y - h.y);
    if (p < 1e-6) continue;
    let u = 0;
    for (; l + (p - u) >= r; ) {
      const w = r - l, S = (u + w) / p;
      i.push({ x: h.x + (m.x - h.x) * S, y: h.y + (m.y - h.y) * S, pressure: h.pressure + (m.pressure - h.pressure) * S }), u += w, l = 0;
    }
    l += p - u;
  }
  return i;
}
const Ms = [{ value: "300", label: "Light 300" }, { value: "400", label: "Regular 400" }, { value: "500", label: "Medium 500" }, { value: "600", label: "Semibold 600" }, { value: "700", label: "Bold 700" }, { value: "800", label: "ExtraBold 800" }], Ns = [{ value: "multiply", label: "Multiply" }, { value: "overlay", label: "Overlay" }, { value: "soft-light", label: "Soft light" }, { value: "screen", label: "Screen" }, { value: "darken", label: "Darken" }, { value: "lighten", label: "Lighten" }, { value: "color-burn", label: "Color burn" }, { value: "normal", label: "Normal" }];
function L(e, a, o) {
  return Math.min(o, Math.max(a, e));
}
const da = 0.92, qn = 0.35;
function Es(e, a) {
  const o = e.x - a.x, r = e.y - a.y;
  return o * o + r * r;
}
function ha(e, a, o = da) {
  const r = L(o, 0.05, 1);
  return { x: e.x + (a.x - e.x) * r, y: e.y + (a.y - e.y) * r, pressure: e.pressure + (a.pressure - e.pressure) * r };
}
function Ts(e, a, o, r = da) {
  let i = a;
  const l = qn * qn;
  for (const d of o) {
    i = ha(i, d, r);
    const h = e[e.length - 1];
    !h || Es(h, i) >= l ? e.push({ ...i }) : (h.x = i.x, h.y = i.y, h.pressure = i.pressure);
  }
  return i;
}
function Ps(e) {
  if (e.length === 0) return "";
  const a = e[0];
  if (!a) return "";
  if (e.length === 1) return `M ${a.x} ${a.y} L ${a.x + 0.01} ${a.y}`;
  if (e.length === 2) {
    const r = e[1];
    return `M ${a.x} ${a.y} L ${r.x} ${r.y}`;
  }
  let o = `M ${a.x} ${a.y}`;
  for (let r = 0; r < e.length - 1; r += 1) {
    const i = e[r === 0 ? 0 : r - 1], l = e[r], d = e[r + 1], h = e[r + 2 < e.length ? r + 2 : r + 1], m = l.x + (d.x - i.x) / 6, p = l.y + (d.y - i.y) / 6, u = d.x - (h.x - l.x) / 6, w = d.y - (h.y - l.y) / 6;
    o += ` C ${m} ${p} ${u} ${w} ${d.x} ${d.y}`;
  }
  return o;
}
function Jt(e) {
  if (e.dash !== "dashed") return;
  const a = St(e), o = Math.max(2, a * 1.2);
  return `${Math.max(2, a * 2.2)} ${o}`;
}
function en(e) {
  return e === "square" ? "square" : "round";
}
function tn(e) {
  return e === "square" ? "miter" : "round";
}
function $s(e) {
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
function Yn(e, a, o) {
  e.lineCap = en(a.shape), e.lineJoin = tn(a.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, o), e.globalAlpha = L(a.opacity, 0.02, 1);
  const r = Jt(a);
  r ? e.setLineDash(r.split(" ").map(Number)) : e.setLineDash([]);
}
function Ds(e, a, o, r, i = 1) {
  const l = Math.max(0.25, a.diameterX * i / 2), d = Math.max(0.25, a.diameterY * i / 2);
  e.save(), e.translate(o.x, o.y), e.rotate(r), e.beginPath(), a.shape === "square" ? e.rect(-l, -d, l * 2, d * 2) : e.ellipse(0, 0, l, d, 0, 0, Math.PI * 2), e.fill(), e.restore();
}
function fa(e, a) {
  if (a.points.length < 1) return;
  if (e.globalAlpha = L(a.opacity, 0.02, 1), la(a)) {
    const i = Math.max(0.75, Math.min(a.diameterX, a.diameterY) * 0.4), l = ua(a.points, i);
    for (let d = 0; d < l.length; d += 1) {
      const h = l[d], m = Math.min(a.points.length - 1, Math.round(d / Math.max(1, l.length - 1) * (a.points.length - 1))), p = ca(a.points, m), u = a.kind === "pressure" ? h.pressure : 1;
      Ds(e, a, h, p, u);
    }
    return;
  }
  const o = St(a);
  if (a.kind === "pressure" && a.points.length >= 2) {
    for (let i = 1; i < a.points.length; i += 1) {
      const l = a.points[i - 1], d = a.points[i], h = Math.max(0.5, o * ((l.pressure + d.pressure) / 2));
      Yn(e, a, h), e.beginPath(), e.moveTo(l.x, l.y), e.lineTo(d.x, d.y), e.stroke();
    }
    return;
  }
  Yn(e, a, o), e.beginPath();
  const r = a.points[0];
  if (e.moveTo(r.x, r.y), a.points.length === 1) e.lineTo(r.x + 0.01, r.y);
  else for (let i = 1; i < a.points.length; i += 1) {
    const l = a.points[i];
    e.lineTo(l.x, l.y);
  }
  e.stroke();
}
function Ls(e, a, o) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(a));
  const i = r.getContext("2d");
  if (!i) return r;
  i.imageSmoothingEnabled = true, i.imageSmoothingQuality = "high";
  for (const l of o) i.save(), l.kind === "eraser" ? (i.globalCompositeOperation = "destination-out", i.strokeStyle = "rgba(0,0,0,1)", i.globalAlpha = 1) : (i.globalCompositeOperation = "source-over", i.strokeStyle = l.color), fa(i, l), i.restore();
  return r;
}
function As(e, a, o) {
  const r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(e)), r.height = Math.max(1, Math.round(a));
  const i = r.getContext("2d");
  if (!i) return r;
  i.imageSmoothingEnabled = true, i.imageSmoothingQuality = "high";
  for (const l of o) i.save(), l.kind === "eraser" ? (i.globalCompositeOperation = "destination-out", i.strokeStyle = "rgba(0,0,0,1)", i.globalAlpha = 1) : (i.globalCompositeOperation = $s(l.blend), i.strokeStyle = l.color), fa(i, l), i.restore();
  return r;
}
function zs(e, a, o) {
  var _a;
  e.textBaseline = "top", e.textAlign = "left";
  for (const r of a) {
    const i = r.text ?? "";
    if (!i.trim() && i.length === 0) continue;
    const l = Math.max(1, r.fontSizePx * Math.max(1e-3, o));
    e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = L(r.opacity, 0.02, 1), e.fillStyle = r.color;
    const d = ((_a = r.fontFamily) == null ? void 0 : _a.trim()) || "sans-serif";
    e.font = `${r.fontStyle || "normal"} ${r.fontWeight || "400"} ${l}px ${d}`;
    const h = l * 1.3, m = i.split(`
`);
    for (let p = 0; p < m.length; p += 1) e.fillText(m[p] ?? "", r.x, r.y + p * h);
    e.restore();
  }
}
const Vn = 8192;
function Rs(e) {
  const a = Math.max(1, e.clientWidth), o = Math.max(1, e.clientHeight), r = e.naturalWidth > 0 ? e.naturalWidth : a, i = e.naturalHeight > 0 ? e.naturalHeight : o, l = Math.min(3, window.devicePixelRatio || 1);
  let d = Math.max(r, Math.round(a * l)), h = Math.max(i, Math.round(o * l));
  const m = Math.max(d, h);
  if (m > Vn) {
    const p = Vn / m;
    d = Math.max(1, Math.round(d * p)), h = Math.max(1, Math.round(h * p));
  }
  return { bufW: d, bufH: h, cssW: a, cssH: o };
}
let yt = null;
function Ji(e) {
  yt = e;
}
function _s() {
  return typeof yt == "function";
}
async function pa(e) {
  var _a;
  if (!yt) throw new Error("Image upload is not available");
  const o = (_a = (await yt([e]))[0]) == null ? void 0 : _a.trim();
  if (!o) throw new Error("Upload returned no path");
  return o;
}
function eo(e) {
  return Array.isArray(e) ? e.map((a) => String(a || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}
const fn = [0.22, 1, 0.36, 1], Is = { duration: 0.2, ease: fn }, Hs = { duration: 0.28, ease: fn }, gt = 0.5, xt = 8, _e = 1.25, Os = 2, fe = 0.5, we = 128, Bs = 4e3, ma = 450, Fs = ["#111827", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"], Ws = ["#facc15", "#f472b6", "#38bdf8", "#4ade80", "#fb923c"], Ks = { backgroundColor: "#ffffff", backgroundImage: ["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)", "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","), backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" };
function Ie(e) {
  return Math.round(e * 10) / 10;
}
function Xs(e) {
  return Math.max(0.1, Ie(e / 10));
}
function Un(e, a) {
  return Ie(L(e + a * Xs(e), fe, we));
}
const nn = 8, an = 400;
function qs() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", a = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(a);
}
const ga = qs(), ie = Br(), Gn = ga ? `${ie}+Shift+Z` : `${ie}+Y`;
function Ys(e, a) {
  const o = Math.max(1, Math.round(e / 10));
  return L(Math.round(e + a * o), nn, an);
}
function Vs(e, a) {
  if (!a) return 1;
  const o = e.pressure;
  return typeof o != "number" || Number.isNaN(o) || e.pointerType === "mouse" ? 0.5 : L(o || 0.05, 0.05, 1);
}
function F({ label: e, active: a = false, disabled: o = false, tone: r = "default", onClick: i, children: l }) {
  const d = r === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : r === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : a ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
  return n.jsxs(ln, { children: [n.jsx(cn, { asChild: true, children: n.jsx("button", { type: "button", "aria-label": e, disabled: o, onClick: i, className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${d}`, children: l }) }), n.jsx(un, { children: n.jsxs(dn, { side: "top", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [e, n.jsx(hn, { className: "fill-neutral-900" })] }) })] });
}
const Us = { backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" };
function Qn({ size: e = 16 }) {
  return n.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: n.jsx("path", { d: "M2 8h12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function Zn({ size: e = 16 }) {
  return n.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: n.jsx("path", { d: "M2 8h3M7 8h3M12 8h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function se({ stroke: e, fading: a = false }) {
  const o = e.kind === "eraser", r = o ? "#000" : e.color, i = o ? 1 : e.opacity, l = a ? { opacity: 0, transition: `opacity ${ma}ms ease-out` } : { opacity: i };
  if (la(e)) {
    const m = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), p = ua(e.points, m);
    return n.jsx("g", { style: l, children: p.map((u, w) => {
      const S = Math.min(e.points.length - 1, Math.round(w / Math.max(1, p.length - 1) * (e.points.length - 1))), M = ca(e.points, S) * 180 / Math.PI, $ = e.kind === "pressure" ? u.pressure : 1, k = Math.max(0.25, e.diameterX * $ / 2), v = Math.max(0.25, e.diameterY * $ / 2);
      return e.shape === "square" ? n.jsx("rect", { x: -k, y: -v, width: k * 2, height: v * 2, fill: r, transform: `translate(${u.x} ${u.y}) rotate(${M})` }, `${e.id}-st-${w}`) : n.jsx("ellipse", { cx: 0, cy: 0, rx: k, ry: v, fill: r, transform: `translate(${u.x} ${u.y}) rotate(${M})` }, `${e.id}-st-${w}`);
    }) });
  }
  const d = St(e);
  if (e.kind === "pressure" && e.points.length >= 2) return n.jsx("g", { style: l, children: e.points.slice(1).map((m, p) => {
    const u = e.points[p], w = Math.max(0.5, d * ((u.pressure + m.pressure) / 2));
    return n.jsx("path", { d: `M ${u.x} ${u.y} L ${m.x} ${m.y}`, fill: "none", stroke: r, strokeWidth: w, strokeLinecap: en(e.shape), strokeLinejoin: tn(e.shape), strokeMiterlimit: 2, strokeDasharray: Jt({ ...e, diameterX: w, diameterY: w }), style: { fill: "none" } }, `${e.id}-p-${p}`);
  }) });
  const h = Ps(e.points);
  return h ? n.jsx("path", { d: h, fill: "none", stroke: r, strokeWidth: d, strokeLinecap: en(e.shape), strokeLinejoin: tn(e.shape), strokeMiterlimit: 2, strokeDasharray: Jt(e), style: { ...l, fill: "none" } }) : null;
}
function xa({ src: e, alt: a = "", open: o, onClose: r, onSaveAnnotated: i }) {
  const l = !!(o && e), [d, h] = c.useState(1), [m, p] = c.useState({ x: 0, y: 0 }), [u, w] = c.useState("pan"), [S, M] = c.useState("#111827ff"), [$, k] = c.useState("#facc15ff"), [v, _] = c.useState(4), [O, P] = c.useState(4), [D, H] = c.useState(1), [Ne, ke] = c.useState(0.45), [ne, jt] = c.useState("multiply"), [pe, rt] = c.useState("circle"), [me, j] = c.useState("solid"), [C, N] = c.useState([]), [A, z] = c.useState([]), [B, ee] = c.useState([]), [Q, W] = c.useState([]), [I, V] = c.useState(null), [U, K] = c.useState(null), [ae, te] = c.useState("Paperozi, sans-serif"), [le, X] = c.useState(24), [G, st] = c.useState("400"), [Ee, Ct] = c.useState("normal"), [Sa, vt] = c.useState(() => /* @__PURE__ */ new Set()), [q, ge] = c.useState(null), [Mt, Nt] = c.useState(false), [ja, ce] = c.useState([]), [E, Ca] = c.useState({ w: 1, h: 1 }), [it, ot] = c.useState(null), [va, Et] = c.useState(false), [Oe, mn] = c.useState(false), [gn, Tt] = c.useState(null), [Pt, $t] = c.useState(false), [Dt, xn] = c.useState(false), [Lt, Be] = c.useState(false), At = c.useRef({ w: 4, h: 4 }), lt = c.useRef(null), zt = c.useRef(null), ct = c.useRef(null), Se = c.useRef(null), bn = c.useRef([]), wn = c.useRef([]), Fe = c.useRef([]), ue = c.useRef(null), de = c.useRef(null), Rt = c.useRef(null), yn = c.useRef(null), _t = c.useRef(0), he = c.useRef(null), It = c.useRef(null), Te = c.useRef(null), We = c.useRef(null), ut = c.useRef(null), je = c.useRef(null), dt = c.useRef(1), kn = c.useRef(d), Sn = c.useRef(0), Pe = c.useRef(/* @__PURE__ */ new Map()), Ht = c.useRef([]), Ke = c.useRef(null);
  bn.current = C, wn.current = A, Fe.current = Q, kn.current = d;
  const jn = !!i && _s() && (C.length > 0 || A.length > 0 || Q.some((t) => t.text.trim().length > 0)), Xe = Q.find((t) => t.id === I) ?? null, qe = u === "highlighter" ? $ : S, Ma = u === "highlighter" ? Ne : D, Ye = c.useCallback(() => {
    h(1), p({ x: 0, y: 0 });
  }, []), ht = c.useCallback(() => {
    for (const t of Pe.current.values()) clearTimeout(t);
    Pe.current.clear();
  }, []), Ot = c.useCallback(() => {
    N([]), z([]), ee([]), W([]), V(null), K(null), vt(/* @__PURE__ */ new Set()), ce([]), Ht.current = [], ge(null), Nt(false), ue.current = null, de.current = null, _t.current = 0;
    const t = yn.current, s = Rt.current;
    t && s && t.clearRect(0, 0, s.width, s.height), he.current != null && (cancelAnimationFrame(he.current), he.current = null), We.current = null, ht();
  }, [ht]), Bt = c.useRef(false);
  c.useEffect(() => {
    if (!l) {
      Bt.current = false;
      return;
    }
    const t = !Bt.current;
    Bt.current = true, t && (Ye(), Ot(), w("pan"), Tt(null), ot(null));
  }, [l, e, Ye, Ot]), c.useEffect(() => {
    var _a2;
    l || (Be(false), ht(), (_a2 = Ke.current) == null ? void 0 : _a2.call(Ke), Ke.current = null);
  }, [l, ht]);
  const $e = c.useCallback(() => {
    const t = zt.current;
    if (!t) return;
    const { bufW: s, bufH: f, cssW: x } = Rs(t);
    x < 8 || t.clientHeight < 8 || (dt.current = vs(s, x), Ca({ w: s, h: f }));
  }, []);
  c.useEffect(() => {
    if (!l) return;
    $e();
    const t = zt.current;
    if (!t) return;
    const s = () => $e();
    t.addEventListener("load", s);
    const f = typeof ResizeObserver < "u" ? new ResizeObserver($e) : null;
    return f == null ? void 0 : f.observe(t), window.addEventListener("resize", $e), () => {
      t.removeEventListener("load", s), f == null ? void 0 : f.disconnect(), window.removeEventListener("resize", $e);
    };
  }, [l, e, $e]), c.useEffect(() => {
    if (!l) {
      Se.current = null, Et(false);
      return;
    }
    let t = false;
    const s = ct.current;
    if (!s || !ys()) {
      Et(false);
      return;
    }
    return ks(s).then((f) => {
      t || (Se.current = f, Et(!!f));
    }), () => {
      t = true, Se.current = null;
    };
  }, [l, e, E.w]);
  const De = c.useCallback((t, s, f) => {
    const x = lt.current;
    if (!x) {
      h(L(t, gt, xt));
      return;
    }
    const b = x.getBoundingClientRect(), g = s - b.left - b.width / 2, y = f - b.top - b.height / 2;
    h((T) => {
      const Y = L(t, gt, xt), re = Y / T;
      return p((J) => ({ x: g - (g - J.x) * re, y: y - (y - J.y) * re })), Y;
    });
  }, []), Na = c.useCallback((t) => {
    var _a2;
    if ((_a2 = Ke.current) == null ? void 0 : _a2.call(Ke), Ke.current = null, lt.current = t, !t) return;
    const s = (f) => {
      f.preventDefault(), f.stopPropagation();
      const x = f.deltaY > 0 ? 1 / _e : _e;
      De(kn.current * x, f.clientX, f.clientY);
    };
    t.addEventListener("wheel", s, { passive: false, capture: true }), Ke.current = () => {
      t.removeEventListener("wheel", s, true);
    };
  }, [De]), Ea = c.useCallback((t) => {
    if (t.preventDefault(), t.stopPropagation(), d > 1.05) {
      Ye();
      return;
    }
    De(Os, t.clientX, t.clientY);
  }, [d, Ye, De]), Ve = c.useCallback((t, s) => {
    const f = ct.current;
    if (!f) return null;
    const x = f.getBoundingClientRect();
    return x.width < 1 || x.height < 1 ? null : { x: (t.clientX - x.left) / x.width * E.w, y: (t.clientY - x.top) / x.height * E.h, pressure: Vs(t, s) };
  }, [E.w, E.h]), Ft = c.useCallback((t) => {
    const s = t === "laser" ? 0.75 : 1, f = t === "highlighter" ? 4 : t === "laser" ? 2 : fe;
    if (t === "highlighter") return { w: Math.max(f, v * s), h: Math.max(f, O * s) };
    const x = Math.max(f, v * s);
    return { w: x, h: x };
  }, [v, O]);
  c.useEffect(() => {
    u !== "eraser" && (u === "pen" || u === "pressure" || u === "highlighter" || u === "laser") && (At.current = { w: v, h: O });
  }, [u, v, O]);
  const Cn = c.useCallback(() => {
    const t = At.current;
    _(t.w), P(t.h);
  }, []), vn = c.useCallback(() => {
    const t = At.current, s = Math.max(t.w, t.h), f = Ie(L(s * 5, fe, we));
    _(f), P(f), w("eraser");
  }, []), Z = c.useCallback((t) => {
    if (u === "eraser" && t !== "eraser" && Cn(), t === "eraser") {
      vn();
      return;
    }
    if (t === "highlighter") {
      w("highlighter"), j("solid"), rt("square");
      return;
    }
    w(t);
  }, [u, Cn, vn]), Mn = c.useCallback((t) => {
    var _a2, _b;
    t.preventDefault(), t.stopPropagation(), (_b = (_a2 = t.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, t.pointerId), je.current = { pointerId: t.pointerId, startX: t.clientX, startY: t.clientY, originX: m.x, originY: m.y };
  }, [m.x, m.y]), Nn = c.useCallback((t) => {
    const s = je.current;
    !s || s.pointerId !== t.pointerId || (t.preventDefault(), p({ x: s.originX + (t.clientX - s.startX), y: s.originY + (t.clientY - s.startY) }));
  }, []), En = c.useCallback((t) => {
    var _a2, _b;
    const s = je.current;
    if (!(!s || s.pointerId !== t.pointerId)) {
      je.current = null;
      try {
        (_b = (_a2 = t.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, t.pointerId);
      } catch {
      }
    }
  }, []), Le = c.useCallback((t) => {
    const s = Pe.current.get(t);
    s && clearTimeout(s);
    const f = setTimeout(() => {
      vt((b) => {
        const g = new Set(b);
        return g.add(t), g;
      });
      const x = setTimeout(() => {
        Pe.current.delete(t), vt((b) => {
          const g = new Set(b);
          return g.delete(t), g;
        }), ee((b) => b.filter((g) => g.id !== t));
      }, ma);
      Pe.current.set(t, x);
    }, Bs);
    Pe.current.set(t, f);
  }, []), Ce = c.useCallback(() => {
    const t = Rt.current, s = yn.current ?? (t == null ? void 0 : t.getContext("2d"));
    t && s && s.clearRect(0, 0, t.width, t.height), _t.current = 0;
  }, []), Wt = c.useCallback(() => {
    he.current == null && (he.current = requestAnimationFrame(() => {
      he.current = null;
      const t = ue.current;
      if (!t) {
        ge(null);
        return;
      }
      ge({ ...t, points: t.points.slice() });
    }));
  }, []), Ae = c.useCallback((t, s) => {
    const f = t.nativeEvent, x = typeof f.getCoalescedEvents == "function" ? f.getCoalescedEvents() : [], b = x.length > 0 ? x : [f], g = [];
    for (const y of b) {
      const T = Ve(y, s);
      T && g.push(T);
    }
    if (g.length === 0) {
      const y = Ve(t, s);
      y && g.push(y);
    }
    return g;
  }, [Ve]), Tn = c.useCallback((t) => {
    var _a2, _b;
    if (u !== "pen" && u !== "pressure" && u !== "highlighter" && u !== "laser" && u !== "eraser") return;
    t.preventDefault(), t.stopPropagation();
    const f = Ae(t, u === "pressure"), x = f[f.length - 1];
    if (!x) return;
    (_b = (_a2 = t.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, t.pointerId);
    const b = u === "eraser" ? "eraser" : u === "highlighter" ? "highlighter" : u === "laser" ? "laser" : u === "pressure" ? "pressure" : "pen", g = b === "laser" ? "#ef4444" : b === "highlighter" ? $ : b === "eraser" ? "#000000" : S, y = Ft(b), T = L(dt.current, 0.25, 12), Y = Xn(Math.max(0.5, y.w * T), E.w, E.h), re = Xn(Math.max(0.5, y.h * T), E.w, E.h), J = b === "eraser" ? 1 : b === "laser" ? 0.9 : b === "highlighter" ? Ne : D, R = { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, seq: ++Sn.current, kind: b, color: g, diameterX: Y, diameterY: re, points: [x], shape: pe, dash: me, opacity: J, ...b === "highlighter" ? { blend: ne } : {} };
    if (ue.current = R, de.current = { ...x }, Nt(true), _t.current = 0, ge({ ...R, points: [...R.points] }), Ce(), b === "laser" && Le(R.id), (b === "pen" || b === "pressure") && Se.current && t.nativeEvent.isTrusted) try {
      const Wa = Math.max(y.w, y.h);
      Se.current.updateInkTrailStartPoint(t.nativeEvent, { color: S, diameter: Math.max(1, Wa * (b === "pressure" ? x.pressure : 1)) });
    } catch {
    }
  }, [u, S, $, Ne, D, ne, pe, me, Ae, Ft, Le, Ce, Wt]), Pn = c.useCallback((t) => {
    const s = ue.current;
    if (!s) return;
    t.preventDefault();
    const f = s.kind === "pressure", x = Ae(t, f);
    if (!x.length) return;
    const b = de.current ?? s.points[s.points.length - 1];
    if (b && (de.current = Ts(s.points, b, x), Wt(), s.kind === "laser" && Le(s.id), (s.kind === "pen" || s.kind === "pressure") && Se.current && t.nativeEvent.isTrusted)) try {
      const g = de.current, T = St(s) / Math.max(1e-3, dt.current);
      Se.current.updateInkTrailStartPoint(t.nativeEvent, { color: s.color, diameter: Math.max(1, T * (s.kind === "pressure" ? (g == null ? void 0 : g.pressure) ?? 1 : 1)) });
    } catch {
    }
  }, [Ae, Wt, Le]), $n = c.useCallback((t) => {
    var _a2, _b;
    const s = ue.current;
    if (!s) return;
    const f = s.kind === "pressure", x = Ae(t, f), b = x[x.length - 1];
    if (b && de.current) {
      const y = ha(de.current, b, 1), T = s.points[s.points.length - 1];
      !T || T.x !== y.x || T.y !== y.y ? s.points.push(y) : T.pressure = y.pressure, de.current = y;
    }
    ue.current = null, de.current = null, he.current != null && (cancelAnimationFrame(he.current), he.current = null), Nt(false);
    try {
      (_b = (_a2 = t.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, t.pointerId);
    } catch {
    }
    if (s.points.length === 0) {
      ge(null), Ce();
      return;
    }
    const g = { ...s, points: [...s.points] };
    if (s.kind === "laser") {
      ee((y) => [...y, g]), Le(s.id), ge(null), Ce();
      return;
    }
    if (ce([]), s.kind === "highlighter") z((y) => [...y, g]);
    else if (s.kind === "eraser") {
      N((y) => [...y, g]), z((y) => [...y, g]), ge(null), Ce();
      return;
    } else N((y) => [...y, g]);
    ge(null), Ce();
  }, [Ae, Le, Ce]), ft = c.useCallback((t) => {
    I && W((s) => s.map((f) => f.id === I ? { ...f, ...t } : f));
  }, [I]), Dn = c.useCallback((t) => {
    t.preventDefault(), t.stopPropagation();
    const s = Ve(t, false);
    if (!s) return;
    const f = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, x = { id: f, seq: ++Sn.current, x: s.x, y: s.y, text: "", color: S, opacity: D, fontSizePx: le, fontFamily: ae, fontWeight: G, fontStyle: Ee };
    ce([]), W((b) => [...b, x]), V(f), K(f), window.setTimeout(() => {
      var _a2;
      return (_a2 = ut.current) == null ? void 0 : _a2.focus();
    }, 30);
  }, [Ve, S, D, le, ae, G, Ee]), Ta = c.useCallback((t) => {
    if (t.button === 1 || u === "pan") {
      Mn(t);
      return;
    }
    if (u === "text") {
      K(null), Dn(t);
      return;
    }
    V(null), K(null), Tn(t);
  }, [u, Mn, Tn, Dn]), Pa = c.useCallback((t) => {
    if (!ue.current) {
      const f = { x: t.clientX, y: t.clientY }, x = Te.current;
      x ? (Te.current = { x: x.x + (f.x - x.x) * 0.72, y: x.y + (f.y - x.y) * 0.72 }, It.current == null && (It.current = requestAnimationFrame(() => {
        It.current = null, Te.current && ot({ ...Te.current });
      }))) : (Te.current = f, ot(f));
    }
    const s = We.current;
    if (s && s.pointerId === t.pointerId) {
      t.preventDefault();
      const f = ct.current;
      if (!f) return;
      const x = f.getBoundingClientRect(), b = (t.clientX - s.startClientX) / Math.max(1, x.width) * E.w, g = (t.clientY - s.startClientY) / Math.max(1, x.height) * E.h;
      W((y) => y.map((T) => T.id === s.id ? { ...T, x: s.originX + b, y: s.originY + g } : T));
      return;
    }
    if (je.current) {
      Nn(t);
      return;
    }
    ue.current && Pn(t);
  }, [Nn, Pn, E.w, E.h]), Ln = c.useCallback((t) => {
    var _a2, _b, _c;
    if (((_a2 = We.current) == null ? void 0 : _a2.pointerId) === t.pointerId) {
      We.current = null;
      try {
        (_c = (_b = t.currentTarget).releasePointerCapture) == null ? void 0 : _c.call(_b, t.pointerId);
      } catch {
      }
    }
    je.current && En(t), ue.current && $n(t);
  }, [En, $n]), Ue = c.useCallback(() => {
    var _a2;
    const t = U ?? I;
    try {
      (_a2 = ut.current) == null ? void 0 : _a2.blur();
    } catch {
    }
    if (t) {
      const s = Fe.current.find((f) => f.id === t);
      s && !s.text.trim() && (W((f) => f.filter((x) => x.id !== t)), V(null));
    }
    K(null);
  }, [U, I]), Kt = c.useCallback(() => {
    const t = I;
    if (!t) return;
    const s = Fe.current.find((f) => f.id === t);
    s && (Ht.current.push({ ...s }), ce([]), W((f) => f.filter((x) => x.id !== t)), V(null), K(null));
  }, [I]), Xt = c.useCallback(() => {
    const t = Ht.current.pop();
    if (t) {
      W((R) => [...R, t]), V(t.id), K(null);
      return;
    }
    const s = bn.current, f = wn.current, x = Fe.current, b = s[s.length - 1], g = f[f.length - 1], y = x[x.length - 1], T = (b == null ? void 0 : b.seq) ?? -1, Y = (g == null ? void 0 : g.seq) ?? -1, re = (y == null ? void 0 : y.seq) ?? -1, J = Math.max(T, Y, re);
    if (!(J < 0)) {
      if (re === J && y) {
        ce((R) => [...R, { layer: "text", text: y }]), W(x.slice(0, -1)), V((R) => R === y.id ? null : R);
        return;
      }
      if (b && g && b.id === g.id && b.kind === "eraser" && b.seq === J) {
        ce((R) => [...R, { layer: "both", stroke: b }]), N(s.slice(0, -1)), z(f.slice(0, -1));
        return;
      }
      if (T >= Y && b && T === J) {
        ce((R) => [...R, { layer: "ink", stroke: b }]), N(s.slice(0, -1));
        return;
      }
      g && Y === J && (ce((R) => [...R, { layer: "highlight", stroke: g }]), z(f.slice(0, -1)));
    }
  }, []), qt = c.useCallback(() => {
    ce((t) => {
      if (!t.length) return t;
      const s = t[t.length - 1];
      return s ? (s.layer === "text" ? W((f) => [...f, s.text]) : s.layer === "both" || s.stroke.kind === "eraser" ? (N((f) => [...f, s.stroke]), z((f) => [...f, s.stroke])) : s.layer === "ink" ? N((f) => [...f, s.stroke]) : z((f) => [...f, s.stroke]), t.slice(0, -1)) : t;
    });
  }, []), Yt = c.useCallback((t) => {
    _((s) => Un(s, t)), P((s) => Un(s, t));
  }, []), An = c.useCallback((t) => {
    var _a2;
    const s = I, f = (s ? (_a2 = Fe.current.find((b) => b.id === s)) == null ? void 0 : _a2.fontSizePx : null) ?? le, x = Ys(f, t);
    X(x), s && W((b) => b.map((g) => g.id === s ? { ...g, fontSizePx: x } : g));
  }, [I, le]), $a = c.useCallback((t) => {
    const s = Ie(L(t, fe, we));
    _(s), P(s);
  }, []), Da = c.useCallback(() => {
    Z("highlighter");
  }, [Z]), pt = c.useCallback(async (t) => {
    if (!i || !e || Oe) return;
    const s = Q.some((f) => f.text.trim().length > 0);
    if (!(C.length === 0 && A.length === 0 && !s)) {
      mn(true), Tt(null);
      try {
        const f = Ls(E.w, E.h, C), x = f.getContext("2d");
        x && zs(x, Q, dt.current);
        const b = As(E.w, E.h, A), g = await Ss({ src: e, inkCanvas: f, highlightCanvas: b }), y = new File([g], `annotated-${Date.now()}.png`, { type: "image/png" });
        await i(t, y);
      } catch (f) {
        Tt(f instanceof Error ? f.message : String(f));
      } finally {
        mn(false);
      }
    }
  }, [i, e, Oe, C, A, Q, E.w, E.h]), Vt = C.length + A.length + Q.length, zn = Vt > 0 || !!q || Mt, mt = c.useCallback(() => {
    if (zn) {
      Be(true);
      return;
    }
    Be(false), r();
  }, [zn, r]), La = c.useCallback(() => {
    Be(false), r();
  }, [r]), Aa = c.useCallback(() => {
    Be(false);
  }, []);
  c.useEffect(() => {
    if (!l) return;
    const t = (s) => {
      var _a2;
      const f = s.target, x = (_a2 = f == null ? void 0 : f.tagName) == null ? void 0 : _a2.toLowerCase(), b = x === "input" || x === "textarea" || (f == null ? void 0 : f.isContentEditable), g = ga ? s.metaKey : s.ctrlKey, y = s.key.toLowerCase(), T = s.code;
      if (g && y === "s") {
        s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), pt(s.shiftKey ? "saveAs" : "overwrite");
        return;
      }
      if (g && y === "z" && !s.shiftKey) {
        s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), Xt();
        return;
      }
      if (g && (y === "y" || y === "z" && s.shiftKey)) {
        s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), qt();
        return;
      }
      const Y = !!I || u === "text", re = g && (s.shiftKey && (s.key === "<" || s.key === "," || T === "Comma") || !s.shiftKey && (s.key === "[" || T === "BracketLeft")), J = g && (s.shiftKey && (s.key === ">" || s.key === "." || T === "Period") || !s.shiftKey && (s.key === "]" || T === "BracketRight"));
      if (Y && (re || J)) {
        s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), An(re ? -1 : 1);
        return;
      }
      if (s.key === "Escape") {
        if (Lt) return;
        if (u === "text" || U) {
          s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), U ? Ue() : V(null);
          return;
        }
        s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), mt();
        return;
      }
      if (I && !g && (y === "backspace" || y === "delete")) {
        if (U && b && x === "textarea" && f.value.length > 0) return;
        s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), Kt();
        return;
      }
      if (!b) {
        if (!g && s.key === "[") {
          s.preventDefault(), s.stopPropagation(), Yt(-1);
          return;
        }
        !g && s.key === "]" && (s.preventDefault(), s.stopPropagation(), Yt(1));
      }
    };
    return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
  }, [l, pt, Xt, qt, Yt, An, I, U, u, Ue, Kt, mt, Lt]);
  const za = u !== "pan" && u !== "text" && it != null && !je.current && !Mt, Rn = Ft(u === "eraser" ? "eraser" : u === "highlighter" ? "highlighter" : u === "laser" ? "laser" : u === "pressure" ? "pressure" : "pen"), _n = Math.max(4, Rn.w * d), In = Math.max(4, Rn.h * d), Ra = C.filter((t) => t.kind === "eraser"), _a = C.filter((t) => t.kind !== "eraser"), Ia = A.filter((t) => t.kind === "eraser"), Ha = A.filter((t) => t.kind !== "eraser"), Oa = Mt && u === "highlighter" ? { mixBlendMode: ne } : {}, Hn = $r(Re(qe) || "#111827ff"), Ba = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", Ge = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [Qe, Fa] = c.useState(null);
  return n.jsxs(n.Fragment, { children: [n.jsx(os, { open: l, onOpenChange: (t) => {
    t || mt();
  }, children: n.jsx(Gt, { children: l ? n.jsxs(ls, { forceMount: true, children: [n.jsx(cs, { asChild: true, forceMount: true, children: n.jsx(ze.div, { className: "fixed inset-0 z-100060 bg-black/85", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: Is }) }), n.jsx(us, { asChild: true, forceMount: true, onOpenAutoFocus: (t) => t.preventDefault(), onEscapeKeyDown: (t) => {
    t.preventDefault();
  }, children: n.jsxs(ze.div, { ref: Fa, className: "fixed inset-0 z-100061 flex flex-col outline-none", "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30", initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: Hs, children: [n.jsx(ds, { className: "sr-only", children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30" }), n.jsx(hs, { className: "sr-only", children: "\uBCA1\uD130 \uD39C\uC73C\uB85C \uADF8\uB9AC\uACE0 \uD655\uB300/\uCD95\uC18C\xB7\uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), n.jsx("div", { ref: Na, className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${u === "pan" ? "cursor-grab" : u === "text" ? "cursor-text" : "cursor-none"}`, onPointerDown: Ta, onPointerMove: Pa, onPointerUp: Ln, onPointerCancel: Ln, onPointerLeave: () => {
    ot(null), Te.current = null;
  }, children: e ? n.jsx("div", { className: "relative will-change-transform", style: { transform: `translate(${m.x}px, ${m.y}px) scale(${d})`, transformOrigin: "center center" }, onClick: (t) => t.stopPropagation(), children: n.jsxs("div", { ref: ct, className: "relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl", style: Ks, children: [n.jsx("img", { ref: zt, src: e, alt: a || "", className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none", draggable: false, onDoubleClick: Ea }), n.jsxs("svg", { className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none", viewBox: `0 0 ${E.w} ${E.h}`, preserveAspectRatio: "none", "aria-hidden": true, children: [n.jsxs("defs", { children: [n.jsxs("mask", { id: "haim-ink-erase-mask", children: [n.jsx("rect", { x: "0", y: "0", width: E.w, height: E.h, fill: "#fff" }), Ra.map((t) => n.jsx(se, { stroke: t }, `em-${t.id}`)), (q == null ? void 0 : q.kind) === "eraser" ? n.jsx(se, { stroke: q }) : null] }), n.jsxs("mask", { id: "haim-hi-erase-mask", children: [n.jsx("rect", { x: "0", y: "0", width: E.w, height: E.h, fill: "#fff" }), Ia.map((t) => n.jsx(se, { stroke: t }, `hem-${t.id}`)), (q == null ? void 0 : q.kind) === "eraser" ? n.jsx(se, { stroke: q }) : null] })] }), n.jsxs("g", { mask: "url(#haim-ink-erase-mask)", children: [_a.map((t) => n.jsx(se, { stroke: t }, t.id)), q && (q.kind === "pen" || q.kind === "pressure") ? n.jsx(se, { stroke: q }) : null] }), n.jsxs("g", { mask: "url(#haim-hi-erase-mask)", style: { mixBlendMode: ne }, children: [Ha.map((t) => n.jsx("g", { style: { mixBlendMode: t.blend || ne }, children: n.jsx(se, { stroke: t }) }, t.id)), (q == null ? void 0 : q.kind) === "highlighter" ? n.jsx("g", { style: { mixBlendMode: q.blend || ne }, children: n.jsx(se, { stroke: q }) }) : null] }), n.jsxs("g", { children: [B.map((t) => n.jsx(se, { stroke: t, fading: Sa.has(t.id) }, t.id)), (q == null ? void 0 : q.kind) === "laser" ? n.jsx(se, { stroke: q }) : null] })] }), n.jsx("canvas", { ref: Rt, className: "pointer-events-none absolute inset-0 h-full w-full", width: E.w, height: E.h, style: Oa, "aria-hidden": true }), Q.map((t) => {
    const s = t.id === I, f = t.id === U, x = t.x / Math.max(1, E.w) * 100, b = t.y / Math.max(1, E.h) * 100;
    return n.jsx("div", { className: `absolute z-1 min-w-8 max-w-[90%] ${s ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`, style: { left: `${x}%`, top: `${b}%`, color: t.color, opacity: t.opacity, fontFamily: t.fontFamily, fontSize: `${t.fontSizePx}px`, fontWeight: t.fontWeight, fontStyle: t.fontStyle, lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word", cursor: u === "text" || s ? "move" : "default", pointerEvents: u === "text" || s ? "auto" : "none" }, onPointerDown: (g) => {
      var _a2, _b;
      u !== "text" && u !== "pan" || (g.stopPropagation(), g.preventDefault(), Z("text"), U && U !== t.id && Ue(), K(null), V(t.id), te(t.fontFamily), X(t.fontSizePx), st(t.fontWeight), Ct(t.fontStyle), We.current = { id: t.id, pointerId: g.pointerId, startClientX: g.clientX, startClientY: g.clientY, originX: t.x, originY: t.y }, (_b = (_a2 = g.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, g.pointerId));
    }, onDoubleClick: (g) => {
      g.stopPropagation(), g.preventDefault(), Z("text"), V(t.id), K(t.id), te(t.fontFamily), X(t.fontSizePx), st(t.fontWeight), Ct(t.fontStyle), window.setTimeout(() => {
        var _a2;
        return (_a2 = ut.current) == null ? void 0 : _a2.focus();
      }, 20);
    }, children: f ? n.jsx("textarea", { ref: ut, value: t.text, rows: Math.max(1, t.text.split(`
`).length), placeholder: "\uD14D\uC2A4\uD2B8 \uC785\uB825", className: "block w-full min-w-24 resize-none border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-white/40", style: { fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", fontStyle: "inherit", lineHeight: "inherit", color: "inherit", fieldSizing: "content" }, onPointerDown: (g) => g.stopPropagation(), onChange: (g) => {
      const y = g.target.value;
      W((T) => T.map((Y) => Y.id === t.id ? { ...Y, text: y } : Y));
    }, onBlur: () => {
      U === t.id && Ue();
    }, onKeyDown: (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), Ue();
        return;
      }
      (g.key === "Backspace" || g.key === "Delete") && g.currentTarget.value.length === 0 && (g.preventDefault(), g.stopPropagation(), Kt());
    } }) : n.jsx("span", { className: "block", children: t.text || "\uD14D\uC2A4\uD2B8" }) }, t.id);
  })] }) }) : null }), za && it ? n.jsx("div", { className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow", style: { left: it.x - _n / 2, top: it.y - In / 2, width: _n, height: In, borderRadius: pe === "circle" ? "9999px" : "2px", borderStyle: me === "dashed" ? "dashed" : "solid", opacity: L(Ma, 0.25, 0.85), backgroundColor: u === "eraser" ? "transparent" : Re(qe) || void 0 }, "aria-hidden": true }) : null, (u === "text" || Xe) && n.jsxs("aside", { className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md", onPointerDown: (t) => t.stopPropagation(), children: [n.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/90", children: [n.jsx(Fn, { size: 14, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"] }), n.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [n.jsx("span", { children: "Font family" }), n.jsx(Dr, { value: (Xe == null ? void 0 : Xe.fontFamily) ?? ae, onChange: (t) => {
    te(t), ft({ fontFamily: t });
  }, className: "w-full", inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs", allowAddWebfont: true })] }), n.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [n.jsx("span", { children: "Font size" }), n.jsxs("div", { className: "flex items-center gap-1", children: [n.jsx("input", { type: "number", min: nn, max: an, step: 1, value: (Xe == null ? void 0 : Xe.fontSizePx) ?? le, onChange: (t) => {
    const s = L(Math.round(Number(t.target.value) || 24), nn, an);
    X(s), ft({ fontSizePx: s });
  }, className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white", "aria-label": "Font size (px)" }), n.jsx("span", { className: "shrink-0 text-white/60", children: "px" })] })] }), n.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [n.jsx("span", { children: "Font weight" }), n.jsxs(Ze, { value: (Xe == null ? void 0 : Xe.fontWeight) ?? G, onValueChange: (t) => {
    st(t), ft({ fontWeight: t });
  }, children: [n.jsx(Je, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font weight", children: n.jsx(Qt, {}) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: Ge, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsx(nt, { className: "p-1", children: Ms.map((t) => n.jsx(xe, { value: t.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: n.jsx(be, { children: t.label }) }, t.value)) }) }) })] })] }), n.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [n.jsx("span", { children: "Font style" }), n.jsxs(Ze, { value: (Xe == null ? void 0 : Xe.fontStyle) ?? Ee, onValueChange: (t) => {
    const s = t === "italic" ? "italic" : "normal";
    Ct(s), ft({ fontStyle: s });
  }, children: [n.jsx(Je, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font style", children: n.jsx(Qt, {}) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: Ge, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsxs(nt, { className: "p-1", children: [n.jsx(xe, { value: "normal", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: n.jsx(be, { children: "Normal" }) }), n.jsx(xe, { value: "italic", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: n.jsx(be, { children: "Italic" }) })] }) }) })] })] }), n.jsxs("p", { className: "text-[10px] leading-4 text-white/45", children: ["\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9", n.jsx("br", {}), "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1", n.jsx("br", {}), ie, "+[ ] / ", ie, "+Shift+<> \uAE00\uC790 \uD06C\uAE30"] })] }), n.jsx(at, { delayDuration: 250, skipDelayDuration: 0, children: n.jsxs("div", { className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1", onPointerDown: (t) => t.stopPropagation(), children: [n.jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md", children: [n.jsx(F, { label: "\uD328\uB2DD", active: u === "pan", onClick: () => Z("pan"), children: n.jsx(Fr, { size: 16 }) }), n.jsx(F, { label: "\uC77C\uBC18 \uD39C", active: u === "pen", onClick: () => Z("pen"), children: n.jsx(Wr, { size: 16 }) }), n.jsx(F, { label: "\uD544\uC555 \uD39C", active: u === "pressure", onClick: () => Z("pressure"), children: n.jsx(Kr, { size: 16 }) }), n.jsx(F, { label: "\uD615\uAD11\uD39C", active: u === "highlighter", onClick: Da, children: n.jsx(Xr, { size: 16 }) }), n.jsx(F, { label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)", active: u === "laser", onClick: () => Z("laser"), children: n.jsx(qr, { size: 16 }) }), n.jsx(F, { label: "\uC9C0\uC6B0\uAC1C", active: u === "eraser", onClick: () => Z("eraser"), children: n.jsx(Yr, { size: 16 }) }), n.jsx(F, { label: "\uD14D\uC2A4\uD2B8", active: u === "text", onClick: () => Z("text"), children: n.jsx(Fn, { size: 16 }) }), n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), n.jsxs("div", { className: "relative flex items-center", children: [n.jsx("button", { type: "button", "aria-label": "\uD39C \uC0C9\uC0C1", "aria-expanded": Dt, onClick: () => {
    xn((t) => (t && $t(false), !t));
  }, className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow", style: { backgroundColor: Re(qe) || "#111827" } }), n.jsx(Gt, { mode: "popLayout", children: Dt ? n.jsxs(ze.div, { initial: { opacity: 0, y: 16, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.9 }, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 }, className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md", children: [(u === "highlighter" ? Ws : Fs).map((t, s, f) => {
    const x = (Re(qe) || "").slice(0, 7).toLowerCase() === t.toLowerCase(), b = 0.03 * (f.length - s);
    return n.jsx(ze.button, { type: "button", "aria-label": `\uC0C9\uC0C1 ${t}`, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: b }, onClick: () => {
      $t(false), u === "highlighter" ? k(`${t}ff`) : (M(`${t}ff`), (u === "pan" || u === "eraser" || u === "laser") && Z("pen")), xn(false);
    }, className: `h-7 w-7 rounded-full border-2 shadow ${x ? "border-sky-300 scale-110" : "border-white/40"}`, style: { backgroundColor: t } }, t);
  }), n.jsx(ze.button, { type: "button", "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1", "aria-pressed": Pt, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: 0 }, onClick: () => $t((t) => !t), className: `h-7 w-7 rounded-full border-2 shadow ${Pt ? "border-sky-300 scale-110" : "border-white/50"}`, style: Us })] }, "haim-color-palette") : null }), n.jsx(Gt, { children: Dt && Pt ? n.jsxs(ze.div, { initial: { opacity: 0, x: -6, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 }, transition: { duration: 0.18, ease: fn }, className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md", children: [n.jsx("div", { className: "mb-2 h-8 w-full rounded border border-white/20", style: { ...Lr, backgroundColor: qe } }), n.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: n.jsx(Tr, { color: Hn, onChange: (t) => {
    const s = Re(t.startsWith("#") ? t : `#${t}`);
    s && (u === "highlighter" ? k(s) : (M(s), (u === "pan" || u === "eraser" || u === "laser") && Z("pen")));
  } }) }), n.jsx(Pr, { alpha: true, prefixed: true, color: Hn, onChange: (t) => {
    const s = Re(t.startsWith("#") ? t : `#${t}`);
    s && (u === "highlighter" ? k(s) : M(s));
  }, className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white" })] }, "haim-color-picker") : null })] }), n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), u === "highlighter" ? n.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [n.jsxs("label", { className: "flex items-center gap-0.5", children: [n.jsx("span", { className: "opacity-70", children: "W" }), n.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" }), n.jsx("input", { type: "number", min: fe, max: we, step: 0.1, value: v, onChange: (t) => _(Ie(L(Number(t.target.value) || 1, fe, we))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" })] }), n.jsx("span", { className: "opacity-50", "aria-hidden": true, children: "\xD7" }), n.jsxs("label", { className: "flex items-center gap-0.5", children: [n.jsx("span", { className: "opacity-70", children: "H" }), n.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" }), n.jsx("input", { type: "number", min: fe, max: we, step: 0.1, value: O, onChange: (t) => P(Ie(L(Number(t.target.value) || 1, fe, we))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" })] }), n.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }) : n.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [n.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), n.jsx("input", { type: "number", min: fe, max: we, step: 0.1, value: v, onChange: (t) => $a(Number(t.target.value) || 1), className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), n.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }), n.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [n.jsx("span", { className: "opacity-70", children: "\uD750\uB984" }), n.jsx("input", { type: "number", min: 5, max: 100, step: 5, value: Math.round((u === "highlighter" ? Ne : D) * 100), onChange: (t) => {
    const f = L(Number(t.target.value) || 5, 5, 100) / 100;
    u === "highlighter" ? ke(f) : H(f);
  }, className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uD750\uB984 (%)" }), n.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "%" })] }), n.jsxs(Ze, { value: pe, onValueChange: (t) => rt(t), children: [n.jsx(Je, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": pe === "circle" ? "\uC6D0" : "\uB124\uBAA8", children: pe === "circle" ? n.jsx(Wn, { size: 16 }) : n.jsx(Kn, { size: 16 }) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: Ge, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsxs(nt, { className: "p-1", children: [n.jsxs(xe, { value: "circle", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uC6D0", children: [n.jsx(Wn, { size: 16 }), n.jsx(be, { className: "sr-only", children: "\uC6D0" })] }), n.jsxs(xe, { value: "square", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uB124\uBAA8", children: [n.jsx(Kn, { size: 16 }), n.jsx(be, { className: "sr-only", children: "\uB124\uBAA8" })] })] }) }) })] }), n.jsxs(Ze, { value: me, onValueChange: (t) => j(t), children: [n.jsx(Je, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": me === "dashed" ? "Dashed" : "Solid", children: me === "dashed" ? n.jsx(Zn, { size: 16 }) : n.jsx(Qn, { size: 16 }) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: Ge, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsxs(nt, { className: "p-1", children: [n.jsxs(xe, { value: "solid", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Solid", children: [n.jsx(Qn, { size: 16 }), n.jsx(be, { className: "sr-only", children: "Solid" })] }), n.jsxs(xe, { value: "dashed", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Dashed", children: [n.jsx(Zn, { size: 16 }), n.jsx(be, { className: "sr-only", children: "Dashed" })] })] }) }) })] }), u === "highlighter" ? n.jsxs(Ze, { value: ne, onValueChange: (t) => jt(t), children: [n.jsx(Je, { className: Ba, "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC", children: n.jsx(Qt, { placeholder: "Blend" }) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: `${Ge} max-h-56 overflow-auto`, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsx(nt, { className: "p-1", children: Ns.map((t) => n.jsx(xe, { value: t.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: n.jsx(be, { children: t.label }) }, t.value)) }) }) })] }) : null, n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), n.jsx(F, { label: `\uC2E4\uD589 \uCDE8\uC18C (${ie}+Z)`, disabled: Vt === 0, onClick: Xt, children: n.jsx(Vr, { size: 16 }) }), n.jsx(F, { label: `\uB2E4\uC2DC \uC2E4\uD589 (${Gn})`, disabled: ja.length === 0, onClick: qt, children: n.jsx(Ur, { size: 16 }) }), n.jsx(F, { label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30", disabled: Vt === 0 && B.length === 0, onClick: Ot, children: n.jsx(Gr, { size: 16 }) }), n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), n.jsx(F, { label: "\uCD95\uC18C", onClick: () => {
    var _a2;
    const t = (_a2 = lt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!t) {
      h((s) => L(s / _e, gt, xt));
      return;
    }
    De(d / _e, t.left + t.width / 2, t.top + t.height / 2);
  }, children: n.jsx(Qr, { size: 16 }) }), n.jsxs("span", { className: "min-w-10 text-center text-[11px] tabular-nums text-white/80", children: [Math.round(d * 100), "%"] }), n.jsx(F, { label: "\uD655\uB300", onClick: () => {
    var _a2;
    const t = (_a2 = lt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!t) {
      h((s) => L(s * _e, gt, xt));
      return;
    }
    De(d * _e, t.left + t.width / 2, t.top + t.height / 2);
  }, children: n.jsx(Zr, { size: 16 }) }), n.jsx(F, { label: "\uBCF4\uAE30 \uCD08\uAE30\uD654", onClick: Ye, children: n.jsx(Jr, { size: 16 }) }), n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), n.jsx(F, { label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${ie}+S)`, tone: "save", disabled: !jn || Oe, onClick: () => {
    pt("overwrite");
  }, children: n.jsx(es, { size: 16 }) }), n.jsx(F, { label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${ie}+Shift+S)`, tone: "saveAs", disabled: !jn || Oe, onClick: () => {
    pt("saveAs");
  }, children: n.jsx(ts, { size: 16 }) })] }), n.jsxs("p", { className: "max-w-xl text-center text-[10px] text-white/55", children: ["\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ", ie, "+[ ] / ", ie, "+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ", ie, "+Z / ", Gn, va ? " \xB7 Ink API" : "", Oe ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""] }), gn ? n.jsx("p", { className: "max-w-xl text-center text-[10px] text-red-300", children: gn }) : null] }) }), n.jsx("button", { type: "button", className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80", "aria-label": "\uB2EB\uAE30", onClick: mt, children: n.jsx(ns, { size: 20 }) })] }) })] }, "haim-image-lightbox") : null }) }), n.jsx(Ar, { isOpen: Lt, title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30", cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1", variant: "danger", overlayClassName: "z-100070", onConfirm: La, onCancel: Aa })] });
}
function Gs({ node: e, selected: a, editor: o, getPos: r, updateAttributes: i }) {
  const l = String(e.attrs.src || ""), d = String(e.attrs.alt || ""), h = String(e.attrs.title || ""), m = o.isEditable, [p, u] = c.useState(false), [w, S] = c.useState(null), M = c.useCallback((v) => {
    if (v.detail > 1) return;
    v.preventDefault(), v.stopPropagation();
    const _ = typeof r == "function" ? r() : null;
    typeof _ == "number" && o.chain().focus().setNodeSelection(_).run();
  }, [o, r]), $ = c.useCallback((v) => {
    v.preventDefault(), v.stopPropagation(), l && (S(l), u(true));
  }, [l]), k = c.useCallback(async (v, _) => {
    if (!m) return;
    const O = await pa(_), P = typeof r == "function" ? r() : null, D = URL.createObjectURL(_);
    if (v === "overwrite") {
      typeof P == "number" ? o.chain().focus().deleteRange({ from: P, to: P + e.nodeSize }).insertContentAt(P, { type: "wikiImage", attrs: { path: O, options: "", alt: O, width: null, height: null, background: null } }).run() : i({ src: D }), S(D);
      return;
    }
    if (typeof P != "number") return;
    const H = P + e.nodeSize;
    o.chain().focus().insertContentAt(H, { type: "wikiImage", attrs: { path: O, options: "", alt: O, width: null, height: null, background: null } }).run();
  }, [m, o, r, i, e.nodeSize]);
  return n.jsxs(oe, { as: "span", className: `haim-stock-image-wrap${a ? " is-selected" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: M, onDoubleClick: $, children: [n.jsx("img", { src: l, alt: d, ...h ? { title: h } : {}, className: "haim-stock-image max-w-full h-auto cursor-pointer", draggable: false }), n.jsx(xa, { src: w || l || null, alt: d, open: p, onClose: () => {
    u(false), S(null);
  }, ...m ? { onSaveAnnotated: k } : {} })] });
}
function Qs(e, a) {
  let o = null;
  if (a.target instanceof HTMLAnchorElement) o = a.target;
  else {
    const r = a.target;
    if (!r) return null;
    o = r.closest("a");
  }
  return !o || !e.view.dom.contains(o) ? null : o;
}
function Zs(e, a) {
  return new ra({ key: new sa("haimLinkClick"), props: { handleClick: (o, r, i) => {
    if (i.button !== 0 || !o.editable) return false;
    const l = Qs(e, i);
    if (!l) return false;
    const d = zr(), h = i.metaKey || i.ctrlKey;
    if (!d && !h || d && h) return false;
    const m = Xa(o.state, a.name), p = (l.href || m.href || "").trim();
    if (!p) return false;
    const u = l.target || m.target || "_blank";
    return i.preventDefault(), window.open(p, u), true;
  } } });
}
const Js = Ka.extend({ addProseMirrorPlugins() {
  var _a;
  return [...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? [], Zs(this.editor, this.type)];
} }).configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } });
function Jn(e) {
  if (!e || typeof e != "object") return;
  const a = e;
  a.__haimRawTextPatched || (a.encodeTextForMarkdown = (o) => o, a.escapeMarkdownSyntax = (o) => o, a.__haimRawTextPatched = true);
}
const ei = qa.extend({ onBeforeCreate(e) {
  var _a, _b, _c;
  (_a = this.parent) == null ? void 0 : _a.call(this, e);
  const a = (_b = this.storage) == null ? void 0 : _b.manager;
  a && Jn(a), ((_c = this.editor) == null ? void 0 : _c.markdown) && Jn(this.editor.markdown);
} }), ti = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, ni = ye.create({ name: "pageBreak", group: "block", atom: true, selectable: true, draggable: true, parseHTML() {
  return [{ tag: "pgbr" }, { tag: "div[data-haim-pgbr]" }, { tag: "div.md-pgbr" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", Me(e, { "data-haim-pgbr": "1", "data-md-pgbr": "1", class: "haim-pgbr md-pgbr" })];
}, markdownTokenizer: { name: "pageBreak", level: "block", start: (e) => {
  const a = /<pgbr\s*\/?\s*>/i.exec(e);
  return a ? a.index : -1;
}, tokenize: (e) => {
  const a = ti.exec(e);
  if (a) return { type: "pageBreak", raw: a[0] };
} }, parseMarkdown: (e, a) => a.createNode("pageBreak"), renderMarkdown: () => `<pgbr/>

`, addCommands() {
  return { setPageBreak: () => ({ chain: e, state: a }) => {
    const o = a.schema.nodes[this.name];
    if (!o || !Ya(a, o)) return false;
    const { selection: r } = a, { $to: i } = r, l = e();
    return Va(r) ? l.insertContentAt(i.pos, { type: this.name }) : l.insertContent({ type: this.name }), l.command(({ state: d, tr: h, dispatch: m }) => {
      var _a;
      if (m) {
        const { $to: p } = h.selection, u = p.end();
        if (p.nodeAfter) p.nodeAfter.isTextblock ? h.setSelection(Ut.create(h.doc, p.pos + 1)) : p.nodeAfter.isBlock ? h.setSelection(Ua.create(h.doc, p.pos)) : h.setSelection(Ut.create(h.doc, p.pos));
        else {
          const S = (_a = d.schema.nodes.paragraph || p.parent.type.contentMatch.defaultType) == null ? void 0 : _a.create();
          S && (h.insert(u, S), h.setSelection(Ut.create(h.doc, u + 1)));
        }
        h.scrollIntoView();
      }
      return true;
    }).run();
  } };
} }), pn = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", ai = ["nw", "ne", "sw", "se"];
function ea(e) {
  if (!e) return;
  const a = {};
  for (const o of e.split(";")) {
    const r = o.trim();
    if (!r) continue;
    const i = r.indexOf(":");
    if (i < 0) continue;
    const l = r.slice(0, i).trim(), d = r.slice(i + 1).trim(), h = l.replace(/-([a-z])/g, (m, p) => p.toUpperCase());
    a[h] = d;
  }
  return a;
}
function ta(e, a, o, r) {
  const i = on({ path: e, width: a, height: o, background: r }), l = i.indexOf("|");
  if (l < 0) return "";
  const d = i.lastIndexOf("]]");
  return i.slice(l + 1, d >= 0 ? d : void 0).trim();
}
function bt(e) {
  return `${Math.max(24, Math.round(e))}px`;
}
function ri(e) {
  return e ? e.closest(".overflow-auto") || e.parentElement : null;
}
function si({ node: e, selected: a, editor: o, getPos: r, updateAttributes: i }) {
  var _a, _b;
  const l = String(e.attrs.path || ""), d = String(e.attrs.options || ""), h = String(e.attrs.alt || l), m = e.attrs.width || null, p = e.attrs.height || null, u = e.attrs.background || null, w = o.isEditable, S = c.useRef(null), M = c.useRef(null), [$, k] = c.useState(false), [v, _] = c.useState(false), [O, P] = c.useState(null), [D, H] = c.useState(null);
  M.current = D;
  const Ne = c.useMemo(() => D ? { ...ea(wt({ width: null, height: null, background: u })), width: `${D.width}px`, height: `${D.height}px` } : ea(wt({ width: m, height: p, background: u })), [m, p, u, D]), ke = c.useCallback((j, C) => {
    const N = { width: j, height: C, options: ta(l, j, C, u) }, A = ri(o.view.dom), z = (A == null ? void 0 : A.scrollTop) ?? null, B = typeof r == "function" ? r() : null;
    if (typeof B == "number") {
      const Q = o.state.tr.setNodeMarkup(B, void 0, { ...e.attrs, ...N });
      o.view.dispatch(Q);
    } else i(N);
    const ee = () => {
      A && z != null && (A.scrollTop = z);
    };
    ee(), requestAnimationFrame(ee), requestAnimationFrame(() => requestAnimationFrame(ee));
  }, [o, r, i, l, u, e.attrs]), ne = c.useCallback(() => {
    const j = M.current;
    j && (ke(bt(j.width), bt(j.height)), H(null), M.current = null);
    const C = typeof r == "function" ? r() : null;
    if (typeof C == "number") {
      const N = C + (e.nodeSize || 1);
      o.commands.setTextSelection(N);
    }
    o.commands.blur();
  }, [ke, o, r, e.nodeSize]), jt = c.useCallback((j, C) => {
    var _a2, _b2;
    if (!w) return;
    C.preventDefault(), C.stopPropagation();
    const N = S.current;
    if (!N) return;
    const A = N.getBoundingClientRect(), z = A.width, B = A.height, ee = C.clientX, Q = C.clientY, W = B > 0 ? z / B : 1, I = C.pointerId;
    (_b2 = (_a2 = C.target).setPointerCapture) == null ? void 0 : _b2.call(_a2, I);
    const V = { width: z, height: B };
    M.current = V, H(V);
    const U = (ae) => {
      const te = ae.clientX - ee, le = ae.clientY - Q;
      let X = z, G = B;
      j.includes("e") && (X = z + te), j.includes("w") && (X = z - te), j.includes("s") && (G = B + le), j.includes("n") && (G = B - le), X = Math.max(24, X), G = Math.max(24, G), (ae.shiftKey || ae.pointerType === "touch") && (Math.abs(te) >= Math.abs(le) ? G = X / W : X = G * W, X = Math.max(24, X), G = Math.max(24, G));
      const Ee = { width: X, height: G };
      M.current = Ee, H(Ee);
    }, K = (ae) => {
      var _a3, _b3;
      window.removeEventListener("pointermove", U), window.removeEventListener("pointerup", K), window.removeEventListener("pointercancel", K);
      try {
        (_b3 = (_a3 = ae.target).releasePointerCapture) == null ? void 0 : _b3.call(_a3, I);
      } catch {
      }
      const te = M.current;
      te && ke(bt(te.width), bt(te.height)), M.current = null, H(null);
    };
    window.addEventListener("pointermove", U), window.addEventListener("pointerup", K), window.addEventListener("pointercancel", K);
  }, [w, ke]);
  c.useEffect(() => {
    if (!a || !w || $ || v) return;
    const j = (C) => {
      if (C.key !== "Enter") return;
      const N = C.target;
      N instanceof HTMLInputElement || N instanceof HTMLTextAreaElement || N instanceof HTMLElement && N.isContentEditable || (C.preventDefault(), C.stopPropagation(), ne());
    };
    return document.addEventListener("keydown", j, true), () => document.removeEventListener("keydown", j, true);
  }, [a, w, $, v, ne]);
  const pe = c.useCallback((j) => {
    if (j.detail > 1 || j.target instanceof Element && j.target.closest("[data-resize-handle]")) return;
    j.preventDefault(), j.stopPropagation();
    const C = typeof r == "function" ? r() : null;
    typeof C == "number" && o.chain().focus().setNodeSelection(C).run();
  }, [o, r]), rt = c.useCallback((j) => {
    j.preventDefault(), j.stopPropagation();
    const C = S.current, N = (C == null ? void 0 : C.currentSrc) || (C == null ? void 0 : C.src) || "";
    N && (P(N), _(true));
  }, []), me = c.useCallback(async (j, C) => {
    if (!w) return;
    const N = await pa(C), A = typeof r == "function" ? r() : null;
    if (j === "overwrite") {
      const B = { path: N, alt: N, options: ta(N, m, p, u) };
      typeof A == "number" ? o.view.dispatch(o.state.tr.setNodeMarkup(A, void 0, { ...e.attrs, ...B })) : i(B);
      const ee = URL.createObjectURL(C);
      P(ee);
      return;
    }
    if (typeof A != "number") return;
    const z = A + e.nodeSize;
    o.chain().focus().insertContentAt(z, { type: "wikiImage", attrs: { path: N, options: "", alt: N, width: null, height: null, background: null } }).run();
  }, [w, o, r, i, m, p, u, e.attrs, e.nodeSize]);
  return n.jsxs(oe, { as: "div", className: `haim-wiki-image-wrap${a ? " is-selected" : ""}${D ? " is-resizing" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: pe, onDoubleClick: rt, onContextMenu: (j) => {
    w && (j.preventDefault(), j.stopPropagation(), k(true));
  }, children: [n.jsxs("div", { className: "haim-wiki-image-frame", children: [n.jsx("img", { ref: S, src: pn, alt: h, className: "haim-wiki-image", "data-wiki-path": l, ...d ? { "data-wiki-options": d } : {}, ...m ? { "data-wiki-width": m } : {}, ...p ? { "data-wiki-height": p } : {}, ...u ? { "data-wiki-bg": u } : {}, style: Ne, draggable: false }), a && w ? ai.map((j) => n.jsx("button", { type: "button", className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${j}`, "aria-label": `resize-${j}`, "data-resize-handle": j, onPointerDown: (C) => jt(j, C) }, j)) : null] }), n.jsx(fs, { isOpen: $, onClose: () => k(false), path: l, kind: "wiki", initialWidth: m ?? "", initialHeight: p ?? "", imageSrc: ((_a = S.current) == null ? void 0 : _a.currentSrc) || ((_b = S.current) == null ? void 0 : _b.src) || "", onApply: ({ width: j, height: C }) => {
    ke(j, C), k(false);
  } }), n.jsx(xa, { src: O, alt: h, open: v, onClose: () => {
    _(false), P(null);
  }, ...w ? { onSaveAnnotated: me } : {} })] });
}
function ba(e, a, o = "") {
  const r = a ? Rr(a) : null;
  return { path: e, options: a || "", alt: o || e, width: (r == null ? void 0 : r.width) ?? null, height: (r == null ? void 0 : r.height) ?? null, background: (r == null ? void 0 : r.background) ?? null };
}
const ii = ye.create({ name: "wikiImage", group: "block", atom: true, selectable: true, draggable: true, addAttributes() {
  return { path: { default: "" }, options: { default: "" }, alt: { default: "" }, width: { default: null }, height: { default: null }, background: { default: null } };
}, parseHTML() {
  return [{ tag: "img[data-wiki-path]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const a = e.getAttribute("data-wiki-path") || "";
    if (!a) return false;
    const o = e.getAttribute("data-wiki-width"), r = e.getAttribute("data-wiki-height"), i = e.getAttribute("data-wiki-bg"), l = e.getAttribute("data-wiki-options") || [o ? `w=${o}` : "", r ? `h=${r}` : "", i ? `bg=${i}` : ""].filter(Boolean).join(" ");
    return { path: a, options: l, alt: e.getAttribute("alt") || a, width: o || null, height: r || null, background: i || null };
  } }, { tag: "div[data-haim-wiki-image]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const a = e.getAttribute("data-wiki-path") || "";
    if (!a) return false;
    const o = e.getAttribute("data-wiki-options") || "";
    return ba(a, o, e.getAttribute("data-wiki-alt") || a);
  } }];
}, renderHTML({ node: e, HTMLAttributes: a }) {
  const o = String(e.attrs.path || ""), r = String(e.attrs.options || ""), i = String(e.attrs.alt || o), l = e.attrs.width || null, d = e.attrs.height || null, h = e.attrs.background || null, m = wt({ width: l, height: d, background: h });
  return ["img", Me(a, { src: pn, alt: i, "data-wiki-path": o, ...r ? { "data-wiki-options": r } : {}, ...l ? { "data-wiki-width": l } : {}, ...d ? { "data-wiki-height": d } : {}, ...h ? { "data-wiki-bg": h } : {}, ...m ? { style: m } : {}, class: "haim-wiki-image" })];
}, addNodeView() {
  return He(si);
}, renderMarkdown: (e) => {
  var _a, _b, _c, _d, _e2;
  const a = String(((_a = e.attrs) == null ? void 0 : _a.path) || "");
  if (!a) return "";
  const o = ((_b = e.attrs) == null ? void 0 : _b.width) || null, r = ((_c = e.attrs) == null ? void 0 : _c.height) || null, i = ((_d = e.attrs) == null ? void 0 : _d.background) || null;
  if (o || r || i) return `${on({ path: a, width: o, height: r, background: i })}

`;
  const l = String(((_e2 = e.attrs) == null ? void 0 : _e2.options) || "");
  return l ? `![[${a}|${l}]]

` : `![[${a}]]

`;
} });
function to(e, a = "", o = "") {
  const r = ba(e, a, o), i = wt({ width: r.width, height: r.height, background: r.background }), l = [`src="${pn}"`, `alt="${ve(r.alt)}"`, `data-wiki-path="${ve(r.path)}"`, 'class="haim-wiki-image"'];
  return r.options && l.push(`data-wiki-options="${ve(r.options)}"`), r.width && l.push(`data-wiki-width="${ve(r.width)}"`), r.height && l.push(`data-wiki-height="${ve(r.height)}"`), r.background && l.push(`data-wiki-bg="${ve(r.background)}"`), i && l.push(`style="${ve(i)}"`), `<img ${l.join(" ")} />`;
}
function ve(e) {
  return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
const oi = ye.create({ name: "wikiFigure", group: "block", content: "wikiImage figcaption", defining: true, isolating: true, parseHTML() {
  return [{ tag: "figure[data-haim-wiki-figure]" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figure", Me(e, { "data-haim-wiki-figure": "1", class: "haim-wiki-figure" }), 0];
}, renderMarkdown: (e, a) => {
  const o = Array.isArray(e.content) ? e.content : [], r = o.find((h) => h.type === "wikiImage"), i = o.find((h) => h.type === "figcaption");
  let l = "";
  if (r == null ? void 0 : r.attrs) {
    const h = String(r.attrs.path || "");
    if (h) {
      const m = r.attrs.width || null, p = r.attrs.height || null, u = r.attrs.background || null;
      if (m || p || u) l = on({ path: h, width: m, height: p, background: u });
      else {
        const w = String(r.attrs.options || "");
        l = w ? `![[${h}|${w}]]` : `![[${h}]]`;
      }
    }
  }
  const d = i ? String(a.renderChildren(i.content || []) || "").trim() : "";
  return l ? d ? `${l}
${d}

` : `${l}

` : d ? `${d}

` : "";
} }), li = ye.create({ name: "figcaption", content: "inline*", defining: true, selectable: false, parseHTML() {
  return [{ tag: "figcaption" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figcaption", Me(e), 0];
}, renderMarkdown: (e, a) => a.renderChildren(e.content || []) }), ci = ye.create({ name: "noteCover", group: "block", atom: true, selectable: true, draggable: false, parseHTML() {
  return [{ tag: "div[data-note-cover-placeholder]", priority: 60 }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", Me(e, { class: "md-note-cover-placeholder md-note-cover-placeholder--pending", "data-note-cover-placeholder": "1", role: "button", tabindex: "0", title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9" }), ["div", { class: "md-note-cover-placeholder__mount", "data-note-cover-mount": "1" }], ["span", { class: "md-note-cover-placeholder__fallback" }, ["span", { class: "md-note-cover-placeholder__spinner", "aria-hidden": "true" }], ["span", { class: "md-note-cover-placeholder__fallback-text" }, "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"]]];
}, renderMarkdown: () => "" });
function no() {
  return `${ps()}

`;
}
function wa({ text: e, className: a }) {
  const o = _r(e);
  return n.jsx("div", { className: ["haim-line-numbers", a].filter(Boolean).join(" "), "aria-hidden": true, children: Array.from({ length: o }, (r, i) => n.jsx("span", { className: "haim-line-numbers__n", children: i + 1 }, i)) });
}
function ui(e) {
  const o = Ir(String(e || ""))[0];
  return o ? { meta: o.meta ?? ia(), grid: o.grid } : null;
}
function di(e, a) {
  return `${Hr(e)}
${Or(a)}`;
}
function ao() {
  const e = ia(), a = { rows: [["", "", ""], ["", "", ""], ["", "", ""]], aligns: [null, null, null] };
  return { meta: e, grid: a, text: di(e, a) };
}
const hi = "haim-table-edit-request";
function fi(e, a) {
  e.dispatchEvent(new CustomEvent(hi, { detail: a, bubbles: true }));
}
function pi({ node: e, editor: a, selected: o, getPos: r }) {
  const i = String(e.attrs.kind || "raw"), l = String(e.attrs.text || ""), d = a.isEditable, h = c.useMemo(() => {
    if (i !== "haim-table") return null;
    const p = ui(l);
    return p ? ms(p.grid, p.meta) : null;
  }, [i, l]), m = () => {
    if (!d || i !== "haim-table") return;
    const p = typeof r == "function" ? r() : null;
    typeof p == "number" && fi(a.view.dom, { pos: p, text: l });
  };
  return i === "haim-table" && h ? n.jsx(oe, { as: "div", className: `haim-raw-md haim-raw-md--haim-table${o ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": "haim-table", contentEditable: false, onDoubleClick: (p) => {
    p.preventDefault(), p.stopPropagation(), m();
  }, children: n.jsx("div", { className: "haim-haim-table-preview", dangerouslySetInnerHTML: { __html: h } }) }) : n.jsxs(oe, { as: "div", className: `haim-raw-md${o ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": i, contentEditable: false, children: [n.jsx(wa, { text: l, className: "haim-raw-md__line-numbers" }), n.jsx("pre", { className: "haim-raw-md__pre", children: l })] });
}
const mi = ye.create({ name: "rawMarkdownBlock", group: "block", atom: true, selectable: true, code: true, addAttributes() {
  return { text: { default: "" }, kind: { default: "raw" } };
}, parseHTML() {
  return [{ tag: "pre[data-haim-raw-md]", getAttrs: (e) => e instanceof HTMLElement ? { text: e.textContent || "", kind: e.getAttribute("data-kind") || "raw" } : false }];
}, renderHTML({ node: e, HTMLAttributes: a }) {
  return ["pre", Me(a, { "data-haim-raw-md": "1", "data-kind": String(e.attrs.kind || "raw"), class: "haim-raw-md" }), String(e.attrs.text || "")];
}, addNodeView() {
  return He(pi);
}, renderMarkdown: (e) => {
  var _a;
  const a = String(((_a = e.attrs) == null ? void 0 : _a.text) || "");
  return a ? a.endsWith(`
`) ? a : `${a}
` : "";
} }), gi = ye.create({ name: "deepHeading", group: "block", content: "inline*", defining: true, addAttributes() {
  return { level: { default: 7, parseHTML: (e) => {
    const a = Number(e.getAttribute("data-heading-level") || "7");
    return Number.isFinite(a) ? Math.min(10, Math.max(7, a)) : 7;
  } } };
}, parseHTML() {
  return [{ tag: "h6[data-heading-level]", getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const a = Number(e.getAttribute("data-heading-level") || "0");
    return a < 7 || a > 10 ? false : { level: a };
  } }];
}, renderHTML({ node: e, HTMLAttributes: a }) {
  const o = Number(e.attrs.level) || 7;
  return ["h6", { ...a, "data-heading-level": String(o), class: `haim-deep-heading haim-h${o}` }, 0];
}, renderMarkdown: (e, a) => {
  var _a;
  const o = Number((_a = e.attrs) == null ? void 0 : _a.level) || 7, r = "#".repeat(Math.min(10, Math.max(7, o))), i = a.renderChildren(e.content || []);
  return `${r} ${i}

`;
} }), xi = ye.create({ name: "mathBlock", group: "block", atom: true, code: true, addAttributes() {
  return { latex: { default: "" }, display: { default: true } };
}, parseHTML() {
  return [{ tag: "div[data-haim-math]", getAttrs: (e) => e instanceof HTMLElement ? { latex: e.getAttribute("data-latex") || e.textContent || "", display: e.getAttribute("data-display") !== "false" } : false }];
}, renderHTML({ node: e, HTMLAttributes: a }) {
  return ["div", Me(a, { "data-haim-math": "1", "data-latex": String(e.attrs.latex || ""), "data-display": e.attrs.display ? "true" : "false", class: "haim-math-block" }), String(e.attrs.latex || "")];
}, renderMarkdown: (e) => {
  var _a, _b;
  const a = String(((_a = e.attrs) == null ? void 0 : _a.latex) || "").trim();
  return a ? ((_b = e.attrs) == null ? void 0 : _b.display) ? `$$
${a}
$$

` : `$${a}$

` : "";
} });
function na({ label: e, onClick: a, children: o }) {
  return n.jsxs(ln, { children: [n.jsx(cn, { asChild: true, children: n.jsx("button", { type: "button", className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft", "aria-label": e, onClick: (r) => {
    r.preventDefault(), r.stopPropagation(), a();
  }, children: o }) }), n.jsx(un, { children: n.jsxs(dn, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [e, n.jsx(hn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function ya(e, a) {
  const [o, r] = c.useState(null), [i, l] = c.useState(false);
  return c.useEffect(() => {
    const d = String(e || "").trim();
    if (!d) {
      r(null), l(false);
      return;
    }
    try {
      const h = gs.renderToString(d, { throwOnError: false, displayMode: a, output: "html" });
      r(h), l(false);
    } catch {
      r(null), l(true);
    }
  }, [e, a]), { html: o, error: i };
}
function bi({ node: e, updateAttributes: a, editor: o, selected: r }) {
  const i = String(e.attrs.latex || ""), l = o.isEditable, [d, h] = c.useState(false), [m, p] = c.useState(i), u = c.useRef(null), { html: w, error: S } = ya(i, true);
  c.useEffect(() => {
    p(i);
  }, [i]), c.useEffect(() => {
    var _a;
    d && ((_a = u.current) == null ? void 0 : _a.focus());
  }, [d]);
  const M = () => {
    const k = m.trim();
    a({ latex: k || i }), h(false);
  }, $ = () => {
    p(i), h(false);
  };
  return d && l ? n.jsxs(oe, { as: "div", className: `haim-math-block haim-math-block--editing${r ? " is-selected" : ""}`, "data-type": "block-math", contentEditable: false, children: [n.jsx("textarea", { ref: u, className: "haim-math-block__textarea", value: m, rows: Math.min(8, Math.max(2, m.split(`
`).length + 1)), onChange: (k) => p(k.target.value), onBlur: M, onKeyDown: (k) => {
    k.key === "Escape" && (k.preventDefault(), $()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), M()), k.stopPropagation();
  }, spellCheck: false }), n.jsx(at, { delayDuration: 250, skipDelayDuration: 0, children: n.jsx("div", { className: "haim-math-block__toolbar", children: n.jsx(na, { label: "\uBBF8\uB9AC\uBCF4\uAE30", onClick: M, children: n.jsx(oa, { size: 14, "aria-hidden": true }) }) }) })] }) : n.jsxs(oe, { as: "div", className: `haim-math-block${r ? " is-selected" : ""}${S ? " haim-math-block--error" : ""}`, "data-type": "block-math", "data-latex": i, contentEditable: false, onDoubleClick: () => {
    l && h(true);
  }, children: [n.jsx(at, { delayDuration: 250, skipDelayDuration: 0, children: l ? n.jsx("div", { className: "haim-math-block__toolbar", children: n.jsx(na, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => h(true), children: n.jsx(Zt, { size: 14, "aria-hidden": true }) }) }) : null }), w ? n.jsx("div", { className: "haim-math-block__render", dangerouslySetInnerHTML: { __html: w } }) : n.jsx("div", { className: "haim-math-block__fallback", children: i || "\u2026" })] });
}
function wi({ node: e, updateAttributes: a, editor: o, selected: r }) {
  const i = String(e.attrs.latex || ""), l = o.isEditable, [d, h] = c.useState(false), [m, p] = c.useState(i), u = c.useRef(null), { html: w, error: S } = ya(i, false);
  c.useEffect(() => {
    p(i);
  }, [i]), c.useEffect(() => {
    var _a;
    d && ((_a = u.current) == null ? void 0 : _a.focus());
  }, [d]);
  const M = () => {
    const k = m.trim();
    a({ latex: k || i }), h(false);
  }, $ = () => {
    p(i), h(false);
  };
  return d && l ? n.jsx(oe, { as: "span", className: `haim-math-inline haim-math-inline--editing${r ? " is-selected" : ""}`, "data-type": "inline-math", contentEditable: false, children: n.jsx("input", { ref: u, type: "text", className: "haim-math-inline__input", value: m, onChange: (k) => p(k.target.value), onBlur: M, onKeyDown: (k) => {
    k.key === "Enter" && (k.preventDefault(), M()), k.key === "Escape" && (k.preventDefault(), $()), k.stopPropagation();
  }, spellCheck: false }) }) : n.jsx(oe, { as: "span", className: `haim-math-inline${r ? " is-selected" : ""}${S ? " haim-math-inline--error" : ""}`, "data-type": "inline-math", "data-latex": i, contentEditable: false, onDoubleClick: (k) => {
    k.preventDefault(), k.stopPropagation(), l && h(true);
  }, children: w ? n.jsx("span", { dangerouslySetInnerHTML: { __html: w } }) : n.jsx("span", { className: "haim-math-inline__fallback", children: i || "?" }) });
}
const yi = Ga.extend({ addNodeView() {
  return He(bi);
} }).configure({ katexOptions: { throwOnError: false, displayMode: true } }), ki = Qa.extend({ addNodeView() {
  return He(wi);
} }).configure({ katexOptions: { throwOnError: false, displayMode: false } });
function Si(e) {
  return String(e || "").trim().toLowerCase() === "mermaid";
}
function ji(e) {
  var _a;
  return e && (((_a = e.closest(".haim-editor")) == null ? void 0 : _a.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
}
const Ci = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg";
function kt({ label: e, onClick: a, active: o = false, expanded: r, children: i }) {
  return n.jsxs(ln, { children: [n.jsx(cn, { asChild: true, children: n.jsx("button", { type: "button", className: `haim-code-block__action${o ? " is-copy-success" : ""}`, "aria-label": e, ...r !== void 0 ? { "aria-expanded": r } : {}, onClick: a, children: i }) }), n.jsx(un, { children: n.jsxs(dn, { side: "bottom", sideOffset: 6, className: Ci, children: [e, n.jsx(hn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function aa({ language: e, collapsed: a, copied: o, onCopy: r, onToggleCollapse: i, extra: l }) {
  return n.jsxs("div", { className: "haim-code-block__header", children: [n.jsx("span", { className: "haim-code-block__lang", children: e || "code" }), n.jsxs("div", { className: "haim-code-block__actions", children: [l, n.jsx(kt, { label: o ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC", active: o, onClick: r, children: o ? n.jsx(as, { size: 14, "aria-hidden": true }) : n.jsx(rs, { size: 14, "aria-hidden": true }) }), n.jsx(kt, { label: a ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30", expanded: !a, onClick: i, children: a ? n.jsx(ss, { size: 14, "aria-hidden": true }) : n.jsx(is, { size: 14, "aria-hidden": true }) })] })] });
}
function vi({ node: e, editor: a, selected: o }) {
  const r = String(e.attrs.language || ""), i = Si(r), l = e.textContent || "", [d, h] = c.useState(null), [m, p] = c.useState(false), [u, w] = c.useState(false), [S, M] = c.useState(false), [$, k] = c.useState(false), v = a.isEditable;
  c.useEffect(() => {
    var _a;
    if (!i || u || S) return;
    let P = false;
    const D = ji(((_a = a.view) == null ? void 0 : _a.dom) ?? null);
    return xs(l, D).then((H) => {
      P || (H ? (h(H), p(false)) : (h(null), p(!!l.trim())));
    }), () => {
      P = true;
    };
  }, [i, u, S, l, a]);
  const _ = c.useCallback(() => {
    var _a;
    const P = l, D = () => {
      k(true), window.setTimeout(() => k(false), 1500);
    };
    if (typeof navigator < "u" && ((_a = navigator.clipboard) == null ? void 0 : _a.writeText)) {
      navigator.clipboard.writeText(P).then(D).catch(() => {
        try {
          const H = document.createElement("textarea");
          H.value = P, document.body.appendChild(H), H.select(), document.execCommand("copy"), H.remove(), D();
        } catch {
        }
      });
      return;
    }
    D();
  }, [l]), O = n.jsx("pre", { className: "haim-mermaid-block__source-hidden", "aria-hidden": true, children: n.jsx(On, { as: "code" }) });
  return i && !u && d && !S ? n.jsxs(oe, { as: "div", className: `haim-code-block haim-mermaid-block${o ? " is-selected" : ""}`, "data-language": "mermaid", children: [n.jsx(at, { delayDuration: 250, skipDelayDuration: 0, children: n.jsx(aa, { language: "mermaid", collapsed: S, copied: $, onCopy: _, onToggleCollapse: () => M((P) => !P), extra: v ? n.jsx(kt, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => w(true), children: n.jsx(Zt, { size: 14, "aria-hidden": true }) }) : null }) }), n.jsx("div", { className: "haim-mermaid-block__chart", dangerouslySetInnerHTML: { __html: d }, onDoubleClick: () => {
    v && w(true);
  } }), O] }) : n.jsxs(oe, { as: "div", className: `haim-code-block${i ? " haim-code-block--mermaid-edit" : ""}${o ? " is-selected" : ""}${S ? " is-collapsed" : ""}`, "data-language": r || void 0, children: [n.jsx(at, { delayDuration: 250, skipDelayDuration: 0, children: n.jsx(aa, { language: r || (i ? "mermaid" : "code"), collapsed: S, copied: $, onCopy: _, onToggleCollapse: () => M((P) => !P), extra: i && v && !S ? n.jsx(kt, { label: u || m ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => w((P) => !P), children: u || m ? n.jsx(oa, { size: 14, "aria-hidden": true }) : n.jsx(Zt, { size: 14, "aria-hidden": true }) }) : null }) }), S ? O : n.jsxs(n.Fragment, { children: [i && m ? n.jsx("div", { className: "haim-mermaid-block__error", children: "Mermaid \uB80C\uB354 \uC2E4\uD328" }) : null, n.jsxs("div", { className: "haim-code-block__body", children: [n.jsx(wa, { text: l, className: "haim-code-block__line-numbers" }), n.jsx("pre", { className: r ? `language-${r}` : void 0, children: n.jsx(On, { as: "code", ...r ? { className: `language-${r}` } : {} }) })] })] })] });
}
function ka(e) {
  return String(e ?? "").replace(/^(?:\r?\n)+/, "").replace(/(?:\r?\n)+$/, "");
}
function ro(e, a) {
  const { state: o } = e;
  o.selection;
  let r = o.tr, i = false;
  return o.doc.descendants((l, d) => {
    if (l.type.name !== "codeBlock") return;
    const h = l.textContent, m = ka(h);
    if (m === h) return;
    const p = d + 1, u = d + l.nodeSize - 1;
    r = r.insertText(m, r.mapping.map(p), r.mapping.map(u)), i = true;
  }), i ? (r.setMeta("addToHistory", false), r.setMeta("haimTrimCodeEdges", true), e.view.dispatch(r), true) : false;
}
const Mi = new sa("haimTrimCodeEdges");
function Ni() {
  return new ra({ key: Mi, appendTransaction(e, a, o) {
    if (!e.some((v) => v.selectionSet || v.docChanged) || e.some((v) => v.getMeta("haimTrimCodeEdges"))) return null;
    const r = a.selection.$from, i = o.selection.$from, l = r.parent.type.name === "codeBlock", d = i.parent.type.name === "codeBlock";
    if (!l || d) return null;
    const h = r.depth, m = r.node(h), p = r.before(h);
    if (m.type.name !== "codeBlock") return null;
    const u = m.textContent, w = ka(u);
    if (w === u) return null;
    const S = p + 1, M = p + m.nodeSize - 1;
    let $ = S, k = M;
    for (const v of e) $ = v.mapping.map($), k = v.mapping.map(k);
    return o.tr.insertText(w, $, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
  } });
}
const Ei = bs(ws), Ti = Za.extend({ addNodeView() {
  return He(vi);
}, addProseMirrorPlugins() {
  var _a;
  return [...((_a = this.parent) == null ? void 0 : _a.call(this)) ?? [], Ni()];
} }).configure({ lowlight: Ei, languageClassPrefix: "language-" }), Pi = Ja.extend({ renderMarkdown: (e, a) => {
  if (!e) return "";
  const o = Array.isArray(e.content) ? e.content : [];
  return o.length === 0 ? "" : a.renderChildren(o);
} }), $i = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
function so(e) {
  const a = typeof e == "string" ? e : "", o = $i.exec(a);
  if (!o) return { prefix: "", body: a };
  const r = o[1] ?? "";
  return { prefix: r, body: a.slice(r.length) };
}
function Di(e, a) {
  return e ? a ? e.endsWith(`
`) ? `${e}${a}` : `${e}
${a}` : e : a;
}
function rn(e, a) {
  let o = 0;
  const r = Math.min(Math.max(0, a), e.length);
  for (let i = 0; i < r; i += 1) e.charCodeAt(i) === 10 && (o += 1);
  return o;
}
function Li(e) {
  if (!e) return 0;
  const a = "\0", o = Di(e, a), r = o.indexOf(a);
  return r < 0 ? 0 : rn(o, r);
}
function Ai(e, a) {
  try {
    return e({ type: "doc", content: [a.toJSON()] }).replace(/\n+$/, "");
  } catch {
    return a.textContent || "";
  }
}
function zi(e, a, o) {
  const r = Li(o);
  let i = "";
  try {
    i = a(e.toJSON());
  } catch {
    i = "";
  }
  const l = [];
  let d = 0;
  return e.forEach((h, m) => {
    const p = m + h.nodeSize;
    if (h.type.name === "noteCover") {
      l.push({ pos: m, to: p, line0: 0 });
      return;
    }
    const u = Ai(a, h);
    let w = -1;
    if (u.length > 0 && i && (w = i.indexOf(u, d), w < 0)) {
      let M = d;
      for (; M < i.length && i.charCodeAt(M) === 10; ) M += 1;
      w = i.indexOf(u, M);
    }
    let S;
    if (w >= 0) S = r + rn(i, w), d = w + Math.max(u.length, 1);
    else {
      for (; d < i.length && i.charCodeAt(d) === 10; ) d += 1;
      S = r + rn(i, d), d = Math.min(i.length, d + Math.max(u.length, u ? 0 : 1));
    }
    l.push({ pos: m, to: p, line0: S });
  }), l;
}
function Ri(e) {
  var _a;
  const o = (_a = e.storage.markdown) == null ? void 0 : _a.manager;
  return !o || typeof o.serialize != "function" ? null : (r) => o.serialize(r);
}
const _i = er.create({ name: "haimSourceLine", addOptions() {
  return { getMetaPrefix: () => "" };
}, addDecorations() {
  const e = this.options.getMetaPrefix ?? (() => "");
  return { update: "document", create: ({ editor: a, state: o }) => {
    const r = Ri(a);
    if (!r) return [];
    const i = e() || "";
    return zi(o.doc, r, i).map((d) => tr.Node(d.pos, d.to, { "data-line": String(d.line0) }));
  } };
} });
function io(e) {
  const a = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", r = ((e == null ? void 0 : e.profile) ?? "note") === "note", i = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), d = [r ? Bn.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, codeBlock: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }) : Bn.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }), Pi, ei, _i.configure({ getMetaPrefix: i }), Js, cr.extend({ parseHTML() {
    return [{ tag: "img[src]:not([data-wiki-path])" }];
  }, addNodeView() {
    return He(Gs);
  } }).configure({ allowBase64: true }), ur.configure({ taskItem: { nested: true } }), dr.configure({ table: { resizable: r } }), nr, hr.configure({ types: ["heading", "paragraph"] }), fr.configure({ multicolor: true }), ...r ? [Ti] : [], ar, rr, sr, pr.configure({ placeholder: a }), ir, mr.configure({ className: "haim-node-focused" }), or, lr, yi, ki, ni, ii, li, oi, ...r ? [ci] : [], mi, gi, xi];
  return r ? [...d, gr, kr.configure({ controls: true, nocookie: true }), Sr.configure({ persist: true }), xr, br, jr.configure({ emojis: Cr, enableEmoticons: true }), wr, vr.configure({ injectCSS: true, visible: false }), Mr.configure({ types: ["heading", "paragraph"] }), Nr.configure({ getIndex: Er }), yr] : d;
}
const sn = /* @__PURE__ */ new WeakMap();
function Ii(e, a) {
  if (e === a) return true;
  if (!e || !a) return false;
  try {
    return JSON.stringify(e) === JSON.stringify(a);
  } catch {
    return false;
  }
}
function oo(e) {
  if (!e) return "";
  const a = e.getJSON(), o = sn.get(e);
  if (o && Ii(o.json, a)) return o.markdown;
  const r = e, i = typeof r.getMarkdown == "function" ? r.getMarkdown() : "";
  return sn.set(e, { json: a, markdown: i }), i;
}
function lo(e) {
  e && sn.delete(e);
}
export {
  hi as H,
  ao as a,
  di as b,
  io as c,
  xa as d,
  eo as e,
  oo as g,
  lo as i,
  Di as j,
  no as n,
  ui as p,
  Ji as r,
  so as s,
  ro as t,
  pa as u,
  to as w
};
