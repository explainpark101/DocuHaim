import { c as oe, s as Xr, P as on, d as ln, g as qr, M as Yr, e as ye, f as Vr, i as Ur, T as Ut, N as Gr, h as Me, R as He, B as Qr, I as Zr, j as Fn, C as Jr, k as ea, l as ta, n as na, o as Wn, p as ra, q as aa, r as sa, t as ia, v as oa, S as la, w as ca, x as ua, L as da, y as ha, z as fa, A as pa, F as ma, G as ga, H as xa, J as ba, K as wa, O as ya, Q as ka, U as Sa, V as ja, W as Ca, X as va, Y as Ma, Z as Na, _ as Ea, $ as Ta } from "./vendor-tiptap-Cwq5MbeS.js";
import { r as c, j as n } from "./vendor-react-BDjpSibw.js";
import { A as Gt, m as ze } from "./vendor-motion-Djo_xQxQ.js";
import { t as Pa, O as La } from "./index-CUaeQqoG.js";
import { c as $a, n as Re, a9 as Da, C as Aa, j as za, g7 as Ra, dI as wt, aC as cn, gK as _a, gL as Ia, u as Ha, aQ as or, gM as Oa, gN as Ba } from "./index-DJNs5ruw.js";
import { g as Fa } from "./Kbd-zJP-p1De.js";
import { t as Kn, aZ as Wa, P as Ka, a_ as Xa, a$ as qa, b0 as Ya, v as Va, aT as Xn, z as qn, U as Ua, R as Ga, T as Qa, b1 as Za, ad as Ja, o as es, w as ts, b2 as ns, X as rs, E as lr, b3 as Zt, y as as, ak as ss, k as is, j as os } from "./vendor-lucide-DgRPSpKt.js";
import { N as ls, O as cs, Q as us, U as ds, V as hs, W as fs, y as Ze, z as Je, B as Qt, E as et, G as tt, H as nt, K as xe, M as be, h as rt, i as un, j as dn, k as hn, l as fn, A as pn } from "./vendor-radix-qpbG9kXl.js";
import { W as ps } from "./WikiImageSizeModal-D_p1pvI0.js";
import { b as ms } from "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import { haimTableToHtml as gs } from "./toHtml-QQdfZYmV.js";
import { k as xs } from "./vendor-katex-NqpuB_gR.js";
import { c as bs } from "./lazyMermaid-CFU1x6wk.js";
import { c as ws, g as ys } from "./vendor-highlight-Cy0EGwO-.js";
function ks() {
  var _a2;
  return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
}
async function Ss(e) {
  const r = navigator.ink;
  if (!(r == null ? void 0 : r.requestPresenter)) return null;
  try {
    return await r.requestPresenter({ presentationArea: e });
  } catch {
    return null;
  }
}
async function js(e) {
  const { src: r, inkCanvas: s, highlightCanvas: a } = e, i = await Cs(r), l = ("width" in i, i.width), h = ("height" in i, i.height), u = document.createElement("canvas");
  u.width = Math.max(1, Math.round(l)), u.height = Math.max(1, Math.round(h));
  const p = u.getContext("2d");
  if (!p) throw new Error("Canvas 2D unavailable");
  if (p.imageSmoothingEnabled = true, p.imageSmoothingQuality = "high", p.drawImage(i, 0, 0, u.width, u.height), s && s.width > 0 && s.height > 0 && p.drawImage(s, 0, 0, u.width, u.height), a && a.width > 0 && a.height > 0 && p.drawImage(a, 0, 0, u.width, u.height), "close" in i && typeof i.close == "function") try {
    i.close();
  } catch {
  }
  const m = await new Promise((d) => {
    u.toBlob((w) => d(w), "image/png");
  });
  if (!m) throw new Error("Failed to encode PNG");
  return m;
}
async function Cs(e) {
  try {
    const r = await fetch(e, { mode: "cors", credentials: "omit" });
    if (!r.ok) throw new Error(`fetch ${r.status}`);
    const s = await r.blob();
    return await createImageBitmap(s);
  } catch {
    return await vs(e);
  }
}
function vs(e) {
  return new Promise((r, s) => {
    const a = new Image();
    a.crossOrigin = "anonymous", a.onload = () => r(a), a.onerror = () => s(new Error("Image load failed for composite")), a.src = e;
  });
}
function St(e) {
  return Math.max(e.diameterX, e.diameterY);
}
function cr(e) {
  return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
}
function Ms(e, r) {
  return !(r >= 8) || !(e >= 1) ? 1 : D(e / r, 0.25, 12);
}
function Yn(e, r, s) {
  const a = Math.max(4, Math.min(96, Math.min(r, s) * 0.08));
  return D(e, 0.5, a);
}
function ur(e, r) {
  if (e.length < 2) return 0;
  const s = Math.max(0, r - 1), a = Math.min(e.length - 1, r + 1);
  if (s === a) {
    const h = e[Math.max(0, r - 1)], u = e[r];
    return Math.atan2(u.y - h.y, u.x - h.x);
  }
  const i = e[s], l = e[a];
  return Math.atan2(l.y - i.y, l.x - i.x);
}
function dr(e, r) {
  if (e.length === 0) return [];
  const s = e[0];
  if (!s) return [];
  const a = Math.max(0.5, r), i = [{ ...s }];
  let l = 0;
  for (let h = 1; h < e.length; h += 1) {
    const u = e[h - 1], p = e[h], m = Math.hypot(p.x - u.x, p.y - u.y);
    if (m < 1e-6) continue;
    let d = 0;
    for (; l + (m - d) >= a; ) {
      const w = a - l, S = (d + w) / m;
      i.push({ x: u.x + (p.x - u.x) * S, y: u.y + (p.y - u.y) * S, pressure: u.pressure + (p.pressure - u.pressure) * S }), d += w, l = 0;
    }
    l += m - d;
  }
  return i;
}
const Ns = [{ value: "300", label: "Light 300" }, { value: "400", label: "Regular 400" }, { value: "500", label: "Medium 500" }, { value: "600", label: "Semibold 600" }, { value: "700", label: "Bold 700" }, { value: "800", label: "ExtraBold 800" }], Es = [{ value: "multiply", label: "Multiply" }, { value: "overlay", label: "Overlay" }, { value: "soft-light", label: "Soft light" }, { value: "screen", label: "Screen" }, { value: "darken", label: "Darken" }, { value: "lighten", label: "Lighten" }, { value: "color-burn", label: "Color burn" }, { value: "normal", label: "Normal" }];
function D(e, r, s) {
  return Math.min(s, Math.max(r, e));
}
const hr = 0.92, Vn = 0.35;
function Ts(e, r) {
  const s = e.x - r.x, a = e.y - r.y;
  return s * s + a * a;
}
function fr(e, r, s = hr) {
  const a = D(s, 0.05, 1);
  return { x: e.x + (r.x - e.x) * a, y: e.y + (r.y - e.y) * a, pressure: e.pressure + (r.pressure - e.pressure) * a };
}
function Ps(e, r, s, a = hr) {
  let i = r;
  const l = Vn * Vn;
  for (const h of s) {
    i = fr(i, h, a);
    const u = e[e.length - 1];
    !u || Ts(u, i) >= l ? e.push({ ...i }) : (u.x = i.x, u.y = i.y, u.pressure = i.pressure);
  }
  return i;
}
function Ls(e) {
  if (e.length === 0) return "";
  const r = e[0];
  if (!r) return "";
  if (e.length === 1) return `M ${r.x} ${r.y} L ${r.x + 0.01} ${r.y}`;
  if (e.length === 2) {
    const a = e[1];
    return `M ${r.x} ${r.y} L ${a.x} ${a.y}`;
  }
  let s = `M ${r.x} ${r.y}`;
  for (let a = 0; a < e.length - 1; a += 1) {
    const i = e[a === 0 ? 0 : a - 1], l = e[a], h = e[a + 1], u = e[a + 2 < e.length ? a + 2 : a + 1], p = l.x + (h.x - i.x) / 6, m = l.y + (h.y - i.y) / 6, d = h.x - (u.x - l.x) / 6, w = h.y - (u.y - l.y) / 6;
    s += ` C ${p} ${m} ${d} ${w} ${h.x} ${h.y}`;
  }
  return s;
}
function Jt(e) {
  if (e.dash !== "dashed") return;
  const r = St(e), s = Math.max(2, r * 1.2);
  return `${Math.max(2, r * 2.2)} ${s}`;
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
function Un(e, r, s) {
  e.lineCap = en(r.shape), e.lineJoin = tn(r.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, s), e.globalAlpha = D(r.opacity, 0.02, 1);
  const a = Jt(r);
  a ? e.setLineDash(a.split(" ").map(Number)) : e.setLineDash([]);
}
function Ds(e, r, s, a, i = 1) {
  const l = Math.max(0.25, r.diameterX * i / 2), h = Math.max(0.25, r.diameterY * i / 2);
  e.save(), e.translate(s.x, s.y), e.rotate(a), e.beginPath(), r.shape === "square" ? e.rect(-l, -h, l * 2, h * 2) : e.ellipse(0, 0, l, h, 0, 0, Math.PI * 2), e.fill(), e.restore();
}
function pr(e, r) {
  if (r.points.length < 1) return;
  if (e.globalAlpha = D(r.opacity, 0.02, 1), cr(r)) {
    const i = Math.max(0.75, Math.min(r.diameterX, r.diameterY) * 0.4), l = dr(r.points, i);
    for (let h = 0; h < l.length; h += 1) {
      const u = l[h], p = Math.min(r.points.length - 1, Math.round(h / Math.max(1, l.length - 1) * (r.points.length - 1))), m = ur(r.points, p), d = r.kind === "pressure" ? u.pressure : 1;
      Ds(e, r, u, m, d);
    }
    return;
  }
  const s = St(r);
  if (r.kind === "pressure" && r.points.length >= 2) {
    for (let i = 1; i < r.points.length; i += 1) {
      const l = r.points[i - 1], h = r.points[i], u = Math.max(0.5, s * ((l.pressure + h.pressure) / 2));
      Un(e, r, u), e.beginPath(), e.moveTo(l.x, l.y), e.lineTo(h.x, h.y), e.stroke();
    }
    return;
  }
  Un(e, r, s), e.beginPath();
  const a = r.points[0];
  if (e.moveTo(a.x, a.y), r.points.length === 1) e.lineTo(a.x + 0.01, a.y);
  else for (let i = 1; i < r.points.length; i += 1) {
    const l = r.points[i];
    e.lineTo(l.x, l.y);
  }
  e.stroke();
}
function As(e, r, s) {
  const a = document.createElement("canvas");
  a.width = Math.max(1, Math.round(e)), a.height = Math.max(1, Math.round(r));
  const i = a.getContext("2d");
  if (!i) return a;
  i.imageSmoothingEnabled = true, i.imageSmoothingQuality = "high";
  for (const l of s) i.save(), l.kind === "eraser" ? (i.globalCompositeOperation = "destination-out", i.strokeStyle = "rgba(0,0,0,1)", i.globalAlpha = 1) : (i.globalCompositeOperation = "source-over", i.strokeStyle = l.color), pr(i, l), i.restore();
  return a;
}
function zs(e, r, s) {
  const a = document.createElement("canvas");
  a.width = Math.max(1, Math.round(e)), a.height = Math.max(1, Math.round(r));
  const i = a.getContext("2d");
  if (!i) return a;
  i.imageSmoothingEnabled = true, i.imageSmoothingQuality = "high";
  for (const l of s) i.save(), l.kind === "eraser" ? (i.globalCompositeOperation = "destination-out", i.strokeStyle = "rgba(0,0,0,1)", i.globalAlpha = 1) : (i.globalCompositeOperation = $s(l.blend), i.strokeStyle = l.color), pr(i, l), i.restore();
  return a;
}
function Rs(e, r, s) {
  var _a2;
  e.textBaseline = "top", e.textAlign = "left";
  for (const a of r) {
    const i = a.text ?? "";
    if (!i.trim() && i.length === 0) continue;
    const l = Math.max(1, a.fontSizePx * Math.max(1e-3, s));
    e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = D(a.opacity, 0.02, 1), e.fillStyle = a.color;
    const h = ((_a2 = a.fontFamily) == null ? void 0 : _a2.trim()) || "sans-serif";
    e.font = `${a.fontStyle || "normal"} ${a.fontWeight || "400"} ${l}px ${h}`;
    const u = l * 1.3, p = i.split(`
`);
    for (let m = 0; m < p.length; m += 1) e.fillText(p[m] ?? "", a.x, a.y + m * u);
    e.restore();
  }
}
const Gn = 8192;
function _s(e) {
  const r = Math.max(1, e.clientWidth), s = Math.max(1, e.clientHeight), a = e.naturalWidth > 0 ? e.naturalWidth : r, i = e.naturalHeight > 0 ? e.naturalHeight : s, l = Math.min(3, window.devicePixelRatio || 1);
  let h = Math.max(a, Math.round(r * l)), u = Math.max(i, Math.round(s * l));
  const p = Math.max(h, u);
  if (p > Gn) {
    const m = Gn / p;
    h = Math.max(1, Math.round(h * m)), u = Math.max(1, Math.round(u * m));
  }
  return { bufW: h, bufH: u, cssW: r, cssH: s };
}
let yt = null;
function ro(e) {
  yt = e;
}
function Is() {
  return typeof yt == "function";
}
async function mr(e) {
  var _a2;
  if (!yt) throw new Error("Image upload is not available");
  const s = (_a2 = (await yt([e]))[0]) == null ? void 0 : _a2.trim();
  if (!s) throw new Error("Upload returned no path");
  return s;
}
function ao(e) {
  return Array.isArray(e) ? e.map((r) => String(r || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}
const mn = [0.22, 1, 0.36, 1], Hs = { duration: 0.2, ease: mn }, Os = { duration: 0.28, ease: mn }, gt = 0.5, xt = 8, _e = 1.25, Bs = 2, fe = 0.5, we = 128, Fs = 4e3, gr = 450, Ws = ["#111827", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"], Ks = ["#facc15", "#f472b6", "#38bdf8", "#4ade80", "#fb923c"], Xs = { backgroundColor: "#ffffff", backgroundImage: ["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)", "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","), backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" };
function Ie(e) {
  return Math.round(e * 10) / 10;
}
function qs(e) {
  return Math.max(0.1, Ie(e / 10));
}
function Qn(e, r) {
  return Ie(D(e + r * qs(e), fe, we));
}
const nn = 8, rn = 400;
function Ys() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", r = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(r);
}
const xr = Ys(), ie = Fa(), Zn = xr ? `${ie}+Shift+Z` : `${ie}+Y`;
function Vs(e, r) {
  const s = Math.max(1, Math.round(e / 10));
  return D(Math.round(e + r * s), nn, rn);
}
function Us(e, r) {
  if (!r) return 1;
  const s = e.pressure;
  return typeof s != "number" || Number.isNaN(s) || e.pointerType === "mouse" ? 0.5 : D(s || 0.05, 0.05, 1);
}
function F({ label: e, active: r = false, disabled: s = false, tone: a = "default", onClick: i, children: l }) {
  const h = a === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : a === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : r ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
  return n.jsxs(un, { children: [n.jsx(dn, { asChild: true, children: n.jsx("button", { type: "button", "aria-label": e, disabled: s, onClick: i, className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${h}`, children: l }) }), n.jsx(hn, { children: n.jsxs(fn, { side: "top", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [e, n.jsx(pn, { className: "fill-neutral-900" })] }) })] });
}
const Gs = { backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" };
function Jn({ size: e = 16 }) {
  return n.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: n.jsx("path", { d: "M2 8h12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function er({ size: e = 16 }) {
  return n.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: n.jsx("path", { d: "M2 8h3M7 8h3M12 8h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function se({ stroke: e, fading: r = false }) {
  const s = e.kind === "eraser", a = s ? "#000" : e.color, i = s ? 1 : e.opacity, l = r ? { opacity: 0, transition: `opacity ${gr}ms ease-out` } : { opacity: i };
  if (cr(e)) {
    const p = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), m = dr(e.points, p);
    return n.jsx("g", { style: l, children: m.map((d, w) => {
      const S = Math.min(e.points.length - 1, Math.round(w / Math.max(1, m.length - 1) * (e.points.length - 1))), M = ur(e.points, S) * 180 / Math.PI, L = e.kind === "pressure" ? d.pressure : 1, k = Math.max(0.25, e.diameterX * L / 2), v = Math.max(0.25, e.diameterY * L / 2);
      return e.shape === "square" ? n.jsx("rect", { x: -k, y: -v, width: k * 2, height: v * 2, fill: a, transform: `translate(${d.x} ${d.y}) rotate(${M})` }, `${e.id}-st-${w}`) : n.jsx("ellipse", { cx: 0, cy: 0, rx: k, ry: v, fill: a, transform: `translate(${d.x} ${d.y}) rotate(${M})` }, `${e.id}-st-${w}`);
    }) });
  }
  const h = St(e);
  if (e.kind === "pressure" && e.points.length >= 2) return n.jsx("g", { style: l, children: e.points.slice(1).map((p, m) => {
    const d = e.points[m], w = Math.max(0.5, h * ((d.pressure + p.pressure) / 2));
    return n.jsx("path", { d: `M ${d.x} ${d.y} L ${p.x} ${p.y}`, fill: "none", stroke: a, strokeWidth: w, strokeLinecap: en(e.shape), strokeLinejoin: tn(e.shape), strokeMiterlimit: 2, strokeDasharray: Jt({ ...e, diameterX: w, diameterY: w }), style: { fill: "none" } }, `${e.id}-p-${m}`);
  }) });
  const u = Ls(e.points);
  return u ? n.jsx("path", { d: u, fill: "none", stroke: a, strokeWidth: h, strokeLinecap: en(e.shape), strokeLinejoin: tn(e.shape), strokeMiterlimit: 2, strokeDasharray: Jt(e), style: { ...l, fill: "none" } }) : null;
}
function br({ src: e, alt: r = "", open: s, onClose: a, onSaveAnnotated: i }) {
  const l = !!(s && e), [h, u] = c.useState(1), [p, m] = c.useState({ x: 0, y: 0 }), [d, w] = c.useState("pan"), [S, M] = c.useState("#111827ff"), [L, k] = c.useState("#facc15ff"), [v, _] = c.useState(4), [O, P] = c.useState(4), [$, H] = c.useState(1), [Ne, ke] = c.useState(0.45), [ne, jt] = c.useState("multiply"), [pe, at] = c.useState("circle"), [me, j] = c.useState("solid"), [C, N] = c.useState([]), [A, z] = c.useState([]), [B, ee] = c.useState([]), [Q, W] = c.useState([]), [I, V] = c.useState(null), [U, K] = c.useState(null), [re, te] = c.useState("Paperozi, sans-serif"), [le, X] = c.useState(24), [G, st] = c.useState("400"), [Ee, Ct] = c.useState("normal"), [jr, vt] = c.useState(() => /* @__PURE__ */ new Set()), [q, ge] = c.useState(null), [Mt, Nt] = c.useState(false), [Cr, ce] = c.useState([]), [E, vr] = c.useState({ w: 1, h: 1 }), [it, ot] = c.useState(null), [Mr, Et] = c.useState(false), [Oe, xn] = c.useState(false), [bn, Tt] = c.useState(null), [Pt, Lt] = c.useState(false), [$t, wn] = c.useState(false), [Dt, Be] = c.useState(false), At = c.useRef({ w: 4, h: 4 }), lt = c.useRef(null), zt = c.useRef(null), ct = c.useRef(null), Se = c.useRef(null), yn = c.useRef([]), kn = c.useRef([]), Fe = c.useRef([]), ue = c.useRef(null), de = c.useRef(null), Rt = c.useRef(null), Sn = c.useRef(null), _t = c.useRef(0), he = c.useRef(null), It = c.useRef(null), Te = c.useRef(null), We = c.useRef(null), ut = c.useRef(null), je = c.useRef(null), dt = c.useRef(1), jn = c.useRef(h), Cn = c.useRef(0), Pe = c.useRef(/* @__PURE__ */ new Map()), Ht = c.useRef([]), Ke = c.useRef(null);
  yn.current = C, kn.current = A, Fe.current = Q, jn.current = h;
  const vn = !!i && Is() && (C.length > 0 || A.length > 0 || Q.some((t) => t.text.trim().length > 0)), Xe = Q.find((t) => t.id === I) ?? null, qe = d === "highlighter" ? L : S, Nr = d === "highlighter" ? Ne : $, Ye = c.useCallback(() => {
    u(1), m({ x: 0, y: 0 });
  }, []), ht = c.useCallback(() => {
    for (const t of Pe.current.values()) clearTimeout(t);
    Pe.current.clear();
  }, []), Ot = c.useCallback(() => {
    N([]), z([]), ee([]), W([]), V(null), K(null), vt(/* @__PURE__ */ new Set()), ce([]), Ht.current = [], ge(null), Nt(false), ue.current = null, de.current = null, _t.current = 0;
    const t = Sn.current, o = Rt.current;
    t && o && t.clearRect(0, 0, o.width, o.height), he.current != null && (cancelAnimationFrame(he.current), he.current = null), We.current = null, ht();
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
  const Le = c.useCallback(() => {
    const t = zt.current;
    if (!t) return;
    const { bufW: o, bufH: f, cssW: x } = _s(t);
    x < 8 || t.clientHeight < 8 || (dt.current = Ms(o, x), vr({ w: o, h: f }));
  }, []);
  c.useEffect(() => {
    if (!l) return;
    Le();
    const t = zt.current;
    if (!t) return;
    const o = () => Le();
    t.addEventListener("load", o);
    const f = typeof ResizeObserver < "u" ? new ResizeObserver(Le) : null;
    return f == null ? void 0 : f.observe(t), window.addEventListener("resize", Le), () => {
      t.removeEventListener("load", o), f == null ? void 0 : f.disconnect(), window.removeEventListener("resize", Le);
    };
  }, [l, e, Le]), c.useEffect(() => {
    if (!l) {
      Se.current = null, Et(false);
      return;
    }
    let t = false;
    const o = ct.current;
    if (!o || !ks()) {
      Et(false);
      return;
    }
    return Ss(o).then((f) => {
      t || (Se.current = f, Et(!!f));
    }), () => {
      t = true, Se.current = null;
    };
  }, [l, e, E.w]);
  const $e = c.useCallback((t, o, f) => {
    const x = lt.current;
    if (!x) {
      u(D(t, gt, xt));
      return;
    }
    const b = x.getBoundingClientRect(), g = o - b.left - b.width / 2, y = f - b.top - b.height / 2;
    u((T) => {
      const Y = D(t, gt, xt), ae = Y / T;
      return m((J) => ({ x: g - (g - J.x) * ae, y: y - (y - J.y) * ae })), Y;
    });
  }, []), Er = c.useCallback((t) => {
    var _a2;
    if ((_a2 = Ke.current) == null ? void 0 : _a2.call(Ke), Ke.current = null, lt.current = t, !t) return;
    const o = (f) => {
      f.preventDefault(), f.stopPropagation();
      const x = f.deltaY > 0 ? 1 / _e : _e;
      $e(jn.current * x, f.clientX, f.clientY);
    };
    t.addEventListener("wheel", o, { passive: false, capture: true }), Ke.current = () => {
      t.removeEventListener("wheel", o, true);
    };
  }, [$e]), Tr = c.useCallback((t) => {
    if (t.preventDefault(), t.stopPropagation(), h > 1.05) {
      Ye();
      return;
    }
    $e(Bs, t.clientX, t.clientY);
  }, [h, Ye, $e]), Ve = c.useCallback((t, o) => {
    const f = ct.current;
    if (!f) return null;
    const x = f.getBoundingClientRect();
    return x.width < 1 || x.height < 1 ? null : { x: (t.clientX - x.left) / x.width * E.w, y: (t.clientY - x.top) / x.height * E.h, pressure: Us(t, o) };
  }, [E.w, E.h]), Ft = c.useCallback((t) => {
    const o = t === "laser" ? 0.75 : 1, f = t === "highlighter" ? 4 : t === "laser" ? 2 : fe;
    if (t === "highlighter") return { w: Math.max(f, v * o), h: Math.max(f, O * o) };
    const x = Math.max(f, v * o);
    return { w: x, h: x };
  }, [v, O]);
  c.useEffect(() => {
    d !== "eraser" && (d === "pen" || d === "pressure" || d === "highlighter" || d === "laser") && (At.current = { w: v, h: O });
  }, [d, v, O]);
  const Mn = c.useCallback(() => {
    const t = At.current;
    _(t.w), P(t.h);
  }, []), Nn = c.useCallback(() => {
    const t = At.current, o = Math.max(t.w, t.h), f = Ie(D(o * 5, fe, we));
    _(f), P(f), w("eraser");
  }, []), Z = c.useCallback((t) => {
    if (d === "eraser" && t !== "eraser" && Mn(), t === "eraser") {
      Nn();
      return;
    }
    if (t === "highlighter") {
      w("highlighter"), j("solid"), at("square");
      return;
    }
    w(t);
  }, [d, Mn, Nn]), En = c.useCallback((t) => {
    var _a2, _b;
    t.preventDefault(), t.stopPropagation(), (_b = (_a2 = t.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, t.pointerId), je.current = { pointerId: t.pointerId, startX: t.clientX, startY: t.clientY, originX: p.x, originY: p.y };
  }, [p.x, p.y]), Tn = c.useCallback((t) => {
    const o = je.current;
    !o || o.pointerId !== t.pointerId || (t.preventDefault(), m({ x: o.originX + (t.clientX - o.startX), y: o.originY + (t.clientY - o.startY) }));
  }, []), Pn = c.useCallback((t) => {
    var _a2, _b;
    const o = je.current;
    if (!(!o || o.pointerId !== t.pointerId)) {
      je.current = null;
      try {
        (_b = (_a2 = t.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, t.pointerId);
      } catch {
      }
    }
  }, []), De = c.useCallback((t) => {
    const o = Pe.current.get(t);
    o && clearTimeout(o);
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
      }, gr);
      Pe.current.set(t, x);
    }, Fs);
    Pe.current.set(t, f);
  }, []), Ce = c.useCallback(() => {
    const t = Rt.current, o = Sn.current ?? (t == null ? void 0 : t.getContext("2d"));
    t && o && o.clearRect(0, 0, t.width, t.height), _t.current = 0;
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
  }, []), Ae = c.useCallback((t, o) => {
    const f = t.nativeEvent, x = typeof f.getCoalescedEvents == "function" ? f.getCoalescedEvents() : [], b = x.length > 0 ? x : [f], g = [];
    for (const y of b) {
      const T = Ve(y, o);
      T && g.push(T);
    }
    if (g.length === 0) {
      const y = Ve(t, o);
      y && g.push(y);
    }
    return g;
  }, [Ve]), Ln = c.useCallback((t) => {
    var _a2, _b;
    if (d !== "pen" && d !== "pressure" && d !== "highlighter" && d !== "laser" && d !== "eraser") return;
    t.preventDefault(), t.stopPropagation();
    const f = Ae(t, d === "pressure"), x = f[f.length - 1];
    if (!x) return;
    (_b = (_a2 = t.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, t.pointerId);
    const b = d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen", g = b === "laser" ? "#ef4444" : b === "highlighter" ? L : b === "eraser" ? "#000000" : S, y = Ft(b), T = D(dt.current, 0.25, 12), Y = Yn(Math.max(0.5, y.w * T), E.w, E.h), ae = Yn(Math.max(0.5, y.h * T), E.w, E.h), J = b === "eraser" ? 1 : b === "laser" ? 0.9 : b === "highlighter" ? Ne : $, R = { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, seq: ++Cn.current, kind: b, color: g, diameterX: Y, diameterY: ae, points: [x], shape: pe, dash: me, opacity: J, ...b === "highlighter" ? { blend: ne } : {} };
    if (ue.current = R, de.current = { ...x }, Nt(true), _t.current = 0, ge({ ...R, points: [...R.points] }), Ce(), b === "laser" && De(R.id), (b === "pen" || b === "pressure") && Se.current && t.nativeEvent.isTrusted) try {
      const Kr = Math.max(y.w, y.h);
      Se.current.updateInkTrailStartPoint(t.nativeEvent, { color: S, diameter: Math.max(1, Kr * (b === "pressure" ? x.pressure : 1)) });
    } catch {
    }
  }, [d, S, L, Ne, $, ne, pe, me, Ae, Ft, De, Ce, Wt]), $n = c.useCallback((t) => {
    const o = ue.current;
    if (!o) return;
    t.preventDefault();
    const f = o.kind === "pressure", x = Ae(t, f);
    if (!x.length) return;
    const b = de.current ?? o.points[o.points.length - 1];
    if (b && (de.current = Ps(o.points, b, x), Wt(), o.kind === "laser" && De(o.id), (o.kind === "pen" || o.kind === "pressure") && Se.current && t.nativeEvent.isTrusted)) try {
      const g = de.current, T = St(o) / Math.max(1e-3, dt.current);
      Se.current.updateInkTrailStartPoint(t.nativeEvent, { color: o.color, diameter: Math.max(1, T * (o.kind === "pressure" ? (g == null ? void 0 : g.pressure) ?? 1 : 1)) });
    } catch {
    }
  }, [Ae, Wt, De]), Dn = c.useCallback((t) => {
    var _a2, _b;
    const o = ue.current;
    if (!o) return;
    const f = o.kind === "pressure", x = Ae(t, f), b = x[x.length - 1];
    if (b && de.current) {
      const y = fr(de.current, b, 1), T = o.points[o.points.length - 1];
      !T || T.x !== y.x || T.y !== y.y ? o.points.push(y) : T.pressure = y.pressure, de.current = y;
    }
    ue.current = null, de.current = null, he.current != null && (cancelAnimationFrame(he.current), he.current = null), Nt(false);
    try {
      (_b = (_a2 = t.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, t.pointerId);
    } catch {
    }
    if (o.points.length === 0) {
      ge(null), Ce();
      return;
    }
    const g = { ...o, points: [...o.points] };
    if (o.kind === "laser") {
      ee((y) => [...y, g]), De(o.id), ge(null), Ce();
      return;
    }
    if (ce([]), o.kind === "highlighter") z((y) => [...y, g]);
    else if (o.kind === "eraser") {
      N((y) => [...y, g]), z((y) => [...y, g]), ge(null), Ce();
      return;
    } else N((y) => [...y, g]);
    ge(null), Ce();
  }, [Ae, De, Ce]), ft = c.useCallback((t) => {
    I && W((o) => o.map((f) => f.id === I ? { ...f, ...t } : f));
  }, [I]), An = c.useCallback((t) => {
    t.preventDefault(), t.stopPropagation();
    const o = Ve(t, false);
    if (!o) return;
    const f = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, x = { id: f, seq: ++Cn.current, x: o.x, y: o.y, text: "", color: S, opacity: $, fontSizePx: le, fontFamily: re, fontWeight: G, fontStyle: Ee };
    ce([]), W((b) => [...b, x]), V(f), K(f), window.setTimeout(() => {
      var _a2;
      return (_a2 = ut.current) == null ? void 0 : _a2.focus();
    }, 30);
  }, [Ve, S, $, le, re, G, Ee]), Pr = c.useCallback((t) => {
    if (t.button === 1 || d === "pan") {
      En(t);
      return;
    }
    if (d === "text") {
      K(null), An(t);
      return;
    }
    V(null), K(null), Ln(t);
  }, [d, En, Ln, An]), Lr = c.useCallback((t) => {
    if (!ue.current) {
      const f = { x: t.clientX, y: t.clientY }, x = Te.current;
      x ? (Te.current = { x: x.x + (f.x - x.x) * 0.72, y: x.y + (f.y - x.y) * 0.72 }, It.current == null && (It.current = requestAnimationFrame(() => {
        It.current = null, Te.current && ot({ ...Te.current });
      }))) : (Te.current = f, ot(f));
    }
    const o = We.current;
    if (o && o.pointerId === t.pointerId) {
      t.preventDefault();
      const f = ct.current;
      if (!f) return;
      const x = f.getBoundingClientRect(), b = (t.clientX - o.startClientX) / Math.max(1, x.width) * E.w, g = (t.clientY - o.startClientY) / Math.max(1, x.height) * E.h;
      W((y) => y.map((T) => T.id === o.id ? { ...T, x: o.originX + b, y: o.originY + g } : T));
      return;
    }
    if (je.current) {
      Tn(t);
      return;
    }
    ue.current && $n(t);
  }, [Tn, $n, E.w, E.h]), zn = c.useCallback((t) => {
    var _a2, _b, _c;
    if (((_a2 = We.current) == null ? void 0 : _a2.pointerId) === t.pointerId) {
      We.current = null;
      try {
        (_c = (_b = t.currentTarget).releasePointerCapture) == null ? void 0 : _c.call(_b, t.pointerId);
      } catch {
      }
    }
    je.current && Pn(t), ue.current && Dn(t);
  }, [Pn, Dn]), Ue = c.useCallback(() => {
    var _a2;
    const t = U ?? I;
    try {
      (_a2 = ut.current) == null ? void 0 : _a2.blur();
    } catch {
    }
    if (t) {
      const o = Fe.current.find((f) => f.id === t);
      o && !o.text.trim() && (W((f) => f.filter((x) => x.id !== t)), V(null));
    }
    K(null);
  }, [U, I]), Kt = c.useCallback(() => {
    const t = I;
    if (!t) return;
    const o = Fe.current.find((f) => f.id === t);
    o && (Ht.current.push({ ...o }), ce([]), W((f) => f.filter((x) => x.id !== t)), V(null), K(null));
  }, [I]), Xt = c.useCallback(() => {
    const t = Ht.current.pop();
    if (t) {
      W((R) => [...R, t]), V(t.id), K(null);
      return;
    }
    const o = yn.current, f = kn.current, x = Fe.current, b = o[o.length - 1], g = f[f.length - 1], y = x[x.length - 1], T = (b == null ? void 0 : b.seq) ?? -1, Y = (g == null ? void 0 : g.seq) ?? -1, ae = (y == null ? void 0 : y.seq) ?? -1, J = Math.max(T, Y, ae);
    if (!(J < 0)) {
      if (ae === J && y) {
        ce((R) => [...R, { layer: "text", text: y }]), W(x.slice(0, -1)), V((R) => R === y.id ? null : R);
        return;
      }
      if (b && g && b.id === g.id && b.kind === "eraser" && b.seq === J) {
        ce((R) => [...R, { layer: "both", stroke: b }]), N(o.slice(0, -1)), z(f.slice(0, -1));
        return;
      }
      if (T >= Y && b && T === J) {
        ce((R) => [...R, { layer: "ink", stroke: b }]), N(o.slice(0, -1));
        return;
      }
      g && Y === J && (ce((R) => [...R, { layer: "highlight", stroke: g }]), z(f.slice(0, -1)));
    }
  }, []), qt = c.useCallback(() => {
    ce((t) => {
      if (!t.length) return t;
      const o = t[t.length - 1];
      return o ? (o.layer === "text" ? W((f) => [...f, o.text]) : o.layer === "both" || o.stroke.kind === "eraser" ? (N((f) => [...f, o.stroke]), z((f) => [...f, o.stroke])) : o.layer === "ink" ? N((f) => [...f, o.stroke]) : z((f) => [...f, o.stroke]), t.slice(0, -1)) : t;
    });
  }, []), Yt = c.useCallback((t) => {
    _((o) => Qn(o, t)), P((o) => Qn(o, t));
  }, []), Rn = c.useCallback((t) => {
    var _a2;
    const o = I, f = (o ? (_a2 = Fe.current.find((b) => b.id === o)) == null ? void 0 : _a2.fontSizePx : null) ?? le, x = Vs(f, t);
    X(x), o && W((b) => b.map((g) => g.id === o ? { ...g, fontSizePx: x } : g));
  }, [I, le]), $r = c.useCallback((t) => {
    const o = Ie(D(t, fe, we));
    _(o), P(o);
  }, []), Dr = c.useCallback(() => {
    Z("highlighter");
  }, [Z]), pt = c.useCallback(async (t) => {
    if (!i || !e || Oe) return;
    const o = Q.some((f) => f.text.trim().length > 0);
    if (!(C.length === 0 && A.length === 0 && !o)) {
      xn(true), Tt(null);
      try {
        const f = As(E.w, E.h, C), x = f.getContext("2d");
        x && Rs(x, Q, dt.current);
        const b = zs(E.w, E.h, A), g = await js({ src: e, inkCanvas: f, highlightCanvas: b }), y = new File([g], `annotated-${Date.now()}.png`, { type: "image/png" });
        await i(t, y);
      } catch (f) {
        Tt(f instanceof Error ? f.message : String(f));
      } finally {
        xn(false);
      }
    }
  }, [i, e, Oe, C, A, Q, E.w, E.h]), Vt = C.length + A.length + Q.length, _n = Vt > 0 || !!q || Mt, mt = c.useCallback(() => {
    if (_n) {
      Be(true);
      return;
    }
    Be(false), a();
  }, [_n, a]), Ar = c.useCallback(() => {
    Be(false), a();
  }, [a]), zr = c.useCallback(() => {
    Be(false);
  }, []);
  c.useEffect(() => {
    if (!l) return;
    const t = (o) => {
      var _a2;
      const f = o.target, x = (_a2 = f == null ? void 0 : f.tagName) == null ? void 0 : _a2.toLowerCase(), b = x === "input" || x === "textarea" || (f == null ? void 0 : f.isContentEditable), g = xr ? o.metaKey : o.ctrlKey, y = o.key.toLowerCase(), T = o.code;
      if (g && y === "s") {
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), pt(o.shiftKey ? "saveAs" : "overwrite");
        return;
      }
      if (g && y === "z" && !o.shiftKey) {
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), Xt();
        return;
      }
      if (g && (y === "y" || y === "z" && o.shiftKey)) {
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), qt();
        return;
      }
      const Y = !!I || d === "text", ae = g && (o.shiftKey && (o.key === "<" || o.key === "," || T === "Comma") || !o.shiftKey && (o.key === "[" || T === "BracketLeft")), J = g && (o.shiftKey && (o.key === ">" || o.key === "." || T === "Period") || !o.shiftKey && (o.key === "]" || T === "BracketRight"));
      if (Y && (ae || J)) {
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), Rn(ae ? -1 : 1);
        return;
      }
      if (o.key === "Escape") {
        if (Dt) return;
        if (d === "text" || U) {
          o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), U ? Ue() : V(null);
          return;
        }
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), mt();
        return;
      }
      if (I && !g && (y === "backspace" || y === "delete")) {
        if (U && b && x === "textarea" && f.value.length > 0) return;
        o.preventDefault(), o.stopPropagation(), o.stopImmediatePropagation(), Kt();
        return;
      }
      if (!b) {
        if (!g && o.key === "[") {
          o.preventDefault(), o.stopPropagation(), Yt(-1);
          return;
        }
        !g && o.key === "]" && (o.preventDefault(), o.stopPropagation(), Yt(1));
      }
    };
    return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
  }, [l, pt, Xt, qt, Yt, Rn, I, U, d, Ue, Kt, mt, Dt]);
  const Rr = d !== "pan" && d !== "text" && it != null && !je.current && !Mt, In = Ft(d === "eraser" ? "eraser" : d === "highlighter" ? "highlighter" : d === "laser" ? "laser" : d === "pressure" ? "pressure" : "pen"), Hn = Math.max(4, In.w * h), On = Math.max(4, In.h * h), _r = C.filter((t) => t.kind === "eraser"), Ir = C.filter((t) => t.kind !== "eraser"), Hr = A.filter((t) => t.kind === "eraser"), Or = A.filter((t) => t.kind !== "eraser"), Br = Mt && d === "highlighter" ? { mixBlendMode: ne } : {}, Bn = $a(Re(qe) || "#111827ff"), Fr = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", Ge = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [Qe, Wr] = c.useState(null);
  return n.jsxs(n.Fragment, { children: [n.jsx(ls, { open: l, onOpenChange: (t) => {
    t || mt();
  }, children: n.jsx(Gt, { children: l ? n.jsxs(cs, { forceMount: true, children: [n.jsx(us, { asChild: true, forceMount: true, children: n.jsx(ze.div, { className: "fixed inset-0 z-100060 bg-black/85", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: Hs }) }), n.jsx(ds, { asChild: true, forceMount: true, onOpenAutoFocus: (t) => t.preventDefault(), onEscapeKeyDown: (t) => {
    t.preventDefault();
  }, children: n.jsxs(ze.div, { ref: Wr, className: "fixed inset-0 z-100061 flex flex-col outline-none", "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30", initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: Os, children: [n.jsx(hs, { className: "sr-only", children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30" }), n.jsx(fs, { className: "sr-only", children: "\uBCA1\uD130 \uD39C\uC73C\uB85C \uADF8\uB9AC\uACE0 \uD655\uB300/\uCD95\uC18C\xB7\uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), n.jsx("div", { ref: Er, className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${d === "pan" ? "cursor-grab" : d === "text" ? "cursor-text" : "cursor-none"}`, onPointerDown: Pr, onPointerMove: Lr, onPointerUp: zn, onPointerCancel: zn, onPointerLeave: () => {
    ot(null), Te.current = null;
  }, children: e ? n.jsx("div", { className: "relative will-change-transform", style: { transform: `translate(${p.x}px, ${p.y}px) scale(${h})`, transformOrigin: "center center" }, onClick: (t) => t.stopPropagation(), children: n.jsxs("div", { ref: ct, className: "relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl", style: Xs, children: [n.jsx("img", { ref: zt, src: e, alt: r || "", className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none", draggable: false, onDoubleClick: Tr }), n.jsxs("svg", { className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none", viewBox: `0 0 ${E.w} ${E.h}`, preserveAspectRatio: "none", "aria-hidden": true, children: [n.jsxs("defs", { children: [n.jsxs("mask", { id: "haim-ink-erase-mask", children: [n.jsx("rect", { x: "0", y: "0", width: E.w, height: E.h, fill: "#fff" }), _r.map((t) => n.jsx(se, { stroke: t }, `em-${t.id}`)), (q == null ? void 0 : q.kind) === "eraser" ? n.jsx(se, { stroke: q }) : null] }), n.jsxs("mask", { id: "haim-hi-erase-mask", children: [n.jsx("rect", { x: "0", y: "0", width: E.w, height: E.h, fill: "#fff" }), Hr.map((t) => n.jsx(se, { stroke: t }, `hem-${t.id}`)), (q == null ? void 0 : q.kind) === "eraser" ? n.jsx(se, { stroke: q }) : null] })] }), n.jsxs("g", { mask: "url(#haim-ink-erase-mask)", children: [Ir.map((t) => n.jsx(se, { stroke: t }, t.id)), q && (q.kind === "pen" || q.kind === "pressure") ? n.jsx(se, { stroke: q }) : null] }), n.jsxs("g", { mask: "url(#haim-hi-erase-mask)", style: { mixBlendMode: ne }, children: [Or.map((t) => n.jsx("g", { style: { mixBlendMode: t.blend || ne }, children: n.jsx(se, { stroke: t }) }, t.id)), (q == null ? void 0 : q.kind) === "highlighter" ? n.jsx("g", { style: { mixBlendMode: q.blend || ne }, children: n.jsx(se, { stroke: q }) }) : null] }), n.jsxs("g", { children: [B.map((t) => n.jsx(se, { stroke: t, fading: jr.has(t.id) }, t.id)), (q == null ? void 0 : q.kind) === "laser" ? n.jsx(se, { stroke: q }) : null] })] }), n.jsx("canvas", { ref: Rt, className: "pointer-events-none absolute inset-0 h-full w-full", width: E.w, height: E.h, style: Br, "aria-hidden": true }), Q.map((t) => {
    const o = t.id === I, f = t.id === U, x = t.x / Math.max(1, E.w) * 100, b = t.y / Math.max(1, E.h) * 100;
    return n.jsx("div", { className: `absolute z-1 min-w-8 max-w-[90%] ${o ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`, style: { left: `${x}%`, top: `${b}%`, color: t.color, opacity: t.opacity, fontFamily: t.fontFamily, fontSize: `${t.fontSizePx}px`, fontWeight: t.fontWeight, fontStyle: t.fontStyle, lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word", cursor: d === "text" || o ? "move" : "default", pointerEvents: d === "text" || o ? "auto" : "none" }, onPointerDown: (g) => {
      var _a2, _b;
      d !== "text" && d !== "pan" || (g.stopPropagation(), g.preventDefault(), Z("text"), U && U !== t.id && Ue(), K(null), V(t.id), te(t.fontFamily), X(t.fontSizePx), st(t.fontWeight), Ct(t.fontStyle), We.current = { id: t.id, pointerId: g.pointerId, startClientX: g.clientX, startClientY: g.clientY, originX: t.x, originY: t.y }, (_b = (_a2 = g.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, g.pointerId));
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
  })] }) }) : null }), Rr && it ? n.jsx("div", { className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow", style: { left: it.x - Hn / 2, top: it.y - On / 2, width: Hn, height: On, borderRadius: pe === "circle" ? "9999px" : "2px", borderStyle: me === "dashed" ? "dashed" : "solid", opacity: D(Nr, 0.25, 0.85), backgroundColor: d === "eraser" ? "transparent" : Re(qe) || void 0 }, "aria-hidden": true }) : null, (d === "text" || Xe) && n.jsxs("aside", { className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md", onPointerDown: (t) => t.stopPropagation(), children: [n.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/90", children: [n.jsx(Kn, { size: 14, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"] }), n.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [n.jsx("span", { children: "Font family" }), n.jsx(Da, { value: (Xe == null ? void 0 : Xe.fontFamily) ?? re, onChange: (t) => {
    te(t), ft({ fontFamily: t });
  }, className: "w-full", inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs", allowAddWebfont: true })] }), n.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [n.jsx("span", { children: "Font size" }), n.jsxs("div", { className: "flex items-center gap-1", children: [n.jsx("input", { type: "number", min: nn, max: rn, step: 1, value: (Xe == null ? void 0 : Xe.fontSizePx) ?? le, onChange: (t) => {
    const o = D(Math.round(Number(t.target.value) || 24), nn, rn);
    X(o), ft({ fontSizePx: o });
  }, className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white", "aria-label": "Font size (px)" }), n.jsx("span", { className: "shrink-0 text-white/60", children: "px" })] })] }), n.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [n.jsx("span", { children: "Font weight" }), n.jsxs(Ze, { value: (Xe == null ? void 0 : Xe.fontWeight) ?? G, onValueChange: (t) => {
    st(t), ft({ fontWeight: t });
  }, children: [n.jsx(Je, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font weight", children: n.jsx(Qt, {}) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: Ge, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsx(nt, { className: "p-1", children: Ns.map((t) => n.jsx(xe, { value: t.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: n.jsx(be, { children: t.label }) }, t.value)) }) }) })] })] }), n.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [n.jsx("span", { children: "Font style" }), n.jsxs(Ze, { value: (Xe == null ? void 0 : Xe.fontStyle) ?? Ee, onValueChange: (t) => {
    const o = t === "italic" ? "italic" : "normal";
    Ct(o), ft({ fontStyle: o });
  }, children: [n.jsx(Je, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font style", children: n.jsx(Qt, {}) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: Ge, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsxs(nt, { className: "p-1", children: [n.jsx(xe, { value: "normal", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: n.jsx(be, { children: "Normal" }) }), n.jsx(xe, { value: "italic", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: n.jsx(be, { children: "Italic" }) })] }) }) })] })] }), n.jsxs("p", { className: "text-[10px] leading-4 text-white/45", children: ["\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9", n.jsx("br", {}), "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1", n.jsx("br", {}), ie, "+[ ] / ", ie, "+Shift+<> \uAE00\uC790 \uD06C\uAE30"] })] }), n.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: n.jsxs("div", { className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1", onPointerDown: (t) => t.stopPropagation(), children: [n.jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md", children: [n.jsx(F, { label: "\uD328\uB2DD", active: d === "pan", onClick: () => Z("pan"), children: n.jsx(Wa, { size: 16 }) }), n.jsx(F, { label: "\uC77C\uBC18 \uD39C", active: d === "pen", onClick: () => Z("pen"), children: n.jsx(Ka, { size: 16 }) }), n.jsx(F, { label: "\uD544\uC555 \uD39C", active: d === "pressure", onClick: () => Z("pressure"), children: n.jsx(Xa, { size: 16 }) }), n.jsx(F, { label: "\uD615\uAD11\uD39C", active: d === "highlighter", onClick: Dr, children: n.jsx(qa, { size: 16 }) }), n.jsx(F, { label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)", active: d === "laser", onClick: () => Z("laser"), children: n.jsx(Ya, { size: 16 }) }), n.jsx(F, { label: "\uC9C0\uC6B0\uAC1C", active: d === "eraser", onClick: () => Z("eraser"), children: n.jsx(Va, { size: 16 }) }), n.jsx(F, { label: "\uD14D\uC2A4\uD2B8", active: d === "text", onClick: () => Z("text"), children: n.jsx(Kn, { size: 16 }) }), n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), n.jsxs("div", { className: "relative flex items-center", children: [n.jsx("button", { type: "button", "aria-label": "\uD39C \uC0C9\uC0C1", "aria-expanded": $t, onClick: () => {
    wn((t) => (t && Lt(false), !t));
  }, className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow", style: { backgroundColor: Re(qe) || "#111827" } }), n.jsx(Gt, { mode: "popLayout", children: $t ? n.jsxs(ze.div, { initial: { opacity: 0, y: 16, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.9 }, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 }, className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md", children: [(d === "highlighter" ? Ks : Ws).map((t, o, f) => {
    const x = (Re(qe) || "").slice(0, 7).toLowerCase() === t.toLowerCase(), b = 0.03 * (f.length - o);
    return n.jsx(ze.button, { type: "button", "aria-label": `\uC0C9\uC0C1 ${t}`, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: b }, onClick: () => {
      Lt(false), d === "highlighter" ? k(`${t}ff`) : (M(`${t}ff`), (d === "pan" || d === "eraser" || d === "laser") && Z("pen")), wn(false);
    }, className: `h-7 w-7 rounded-full border-2 shadow ${x ? "border-sky-300 scale-110" : "border-white/40"}`, style: { backgroundColor: t } }, t);
  }), n.jsx(ze.button, { type: "button", "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1", "aria-pressed": Pt, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: 0 }, onClick: () => Lt((t) => !t), className: `h-7 w-7 rounded-full border-2 shadow ${Pt ? "border-sky-300 scale-110" : "border-white/50"}`, style: Gs })] }, "haim-color-palette") : null }), n.jsx(Gt, { children: $t && Pt ? n.jsxs(ze.div, { initial: { opacity: 0, x: -6, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 }, transition: { duration: 0.18, ease: mn }, className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md", children: [n.jsx("div", { className: "mb-2 h-8 w-full rounded border border-white/20", style: { ...Aa, backgroundColor: qe } }), n.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: n.jsx(Pa, { color: Bn, onChange: (t) => {
    const o = Re(t.startsWith("#") ? t : `#${t}`);
    o && (d === "highlighter" ? k(o) : (M(o), (d === "pan" || d === "eraser" || d === "laser") && Z("pen")));
  } }) }), n.jsx(La, { alpha: true, prefixed: true, color: Bn, onChange: (t) => {
    const o = Re(t.startsWith("#") ? t : `#${t}`);
    o && (d === "highlighter" ? k(o) : M(o));
  }, className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white" })] }, "haim-color-picker") : null })] }), n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), d === "highlighter" ? n.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [n.jsxs("label", { className: "flex items-center gap-0.5", children: [n.jsx("span", { className: "opacity-70", children: "W" }), n.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" }), n.jsx("input", { type: "number", min: fe, max: we, step: 0.1, value: v, onChange: (t) => _(Ie(D(Number(t.target.value) || 1, fe, we))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" })] }), n.jsx("span", { className: "opacity-50", "aria-hidden": true, children: "\xD7" }), n.jsxs("label", { className: "flex items-center gap-0.5", children: [n.jsx("span", { className: "opacity-70", children: "H" }), n.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" }), n.jsx("input", { type: "number", min: fe, max: we, step: 0.1, value: O, onChange: (t) => P(Ie(D(Number(t.target.value) || 1, fe, we))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" })] }), n.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }) : n.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [n.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), n.jsx("input", { type: "number", min: fe, max: we, step: 0.1, value: v, onChange: (t) => $r(Number(t.target.value) || 1), className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), n.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }), n.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [n.jsx("span", { className: "opacity-70", children: "\uD750\uB984" }), n.jsx("input", { type: "number", min: 5, max: 100, step: 5, value: Math.round((d === "highlighter" ? Ne : $) * 100), onChange: (t) => {
    const f = D(Number(t.target.value) || 5, 5, 100) / 100;
    d === "highlighter" ? ke(f) : H(f);
  }, className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uD750\uB984 (%)" }), n.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "%" })] }), n.jsxs(Ze, { value: pe, onValueChange: (t) => at(t), children: [n.jsx(Je, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": pe === "circle" ? "\uC6D0" : "\uB124\uBAA8", children: pe === "circle" ? n.jsx(Xn, { size: 16 }) : n.jsx(qn, { size: 16 }) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: Ge, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsxs(nt, { className: "p-1", children: [n.jsxs(xe, { value: "circle", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uC6D0", children: [n.jsx(Xn, { size: 16 }), n.jsx(be, { className: "sr-only", children: "\uC6D0" })] }), n.jsxs(xe, { value: "square", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uB124\uBAA8", children: [n.jsx(qn, { size: 16 }), n.jsx(be, { className: "sr-only", children: "\uB124\uBAA8" })] })] }) }) })] }), n.jsxs(Ze, { value: me, onValueChange: (t) => j(t), children: [n.jsx(Je, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": me === "dashed" ? "Dashed" : "Solid", children: me === "dashed" ? n.jsx(er, { size: 16 }) : n.jsx(Jn, { size: 16 }) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: Ge, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsxs(nt, { className: "p-1", children: [n.jsxs(xe, { value: "solid", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Solid", children: [n.jsx(Jn, { size: 16 }), n.jsx(be, { className: "sr-only", children: "Solid" })] }), n.jsxs(xe, { value: "dashed", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Dashed", children: [n.jsx(er, { size: 16 }), n.jsx(be, { className: "sr-only", children: "Dashed" })] })] }) }) })] }), d === "highlighter" ? n.jsxs(Ze, { value: ne, onValueChange: (t) => jt(t), children: [n.jsx(Je, { className: Fr, "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC", children: n.jsx(Qt, { placeholder: "Blend" }) }), n.jsx(et, { container: Qe, children: n.jsx(tt, { className: `${Ge} max-h-56 overflow-auto`, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (t) => t.preventDefault(), children: n.jsx(nt, { className: "p-1", children: Es.map((t) => n.jsx(xe, { value: t.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: n.jsx(be, { children: t.label }) }, t.value)) }) }) })] }) : null, n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), n.jsx(F, { label: `\uC2E4\uD589 \uCDE8\uC18C (${ie}+Z)`, disabled: Vt === 0, onClick: Xt, children: n.jsx(Ua, { size: 16 }) }), n.jsx(F, { label: `\uB2E4\uC2DC \uC2E4\uD589 (${Zn})`, disabled: Cr.length === 0, onClick: qt, children: n.jsx(Ga, { size: 16 }) }), n.jsx(F, { label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30", disabled: Vt === 0 && B.length === 0, onClick: Ot, children: n.jsx(Qa, { size: 16 }) }), n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), n.jsx(F, { label: "\uCD95\uC18C", onClick: () => {
    var _a2;
    const t = (_a2 = lt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!t) {
      u((o) => D(o / _e, gt, xt));
      return;
    }
    $e(h / _e, t.left + t.width / 2, t.top + t.height / 2);
  }, children: n.jsx(Za, { size: 16 }) }), n.jsxs("span", { className: "min-w-10 text-center text-[11px] tabular-nums text-white/80", children: [Math.round(h * 100), "%"] }), n.jsx(F, { label: "\uD655\uB300", onClick: () => {
    var _a2;
    const t = (_a2 = lt.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!t) {
      u((o) => D(o * _e, gt, xt));
      return;
    }
    $e(h * _e, t.left + t.width / 2, t.top + t.height / 2);
  }, children: n.jsx(Ja, { size: 16 }) }), n.jsx(F, { label: "\uBCF4\uAE30 \uCD08\uAE30\uD654", onClick: Ye, children: n.jsx(es, { size: 16 }) }), n.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), n.jsx(F, { label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${ie}+S)`, tone: "save", disabled: !vn || Oe, onClick: () => {
    pt("overwrite");
  }, children: n.jsx(ts, { size: 16 }) }), n.jsx(F, { label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${ie}+Shift+S)`, tone: "saveAs", disabled: !vn || Oe, onClick: () => {
    pt("saveAs");
  }, children: n.jsx(ns, { size: 16 }) })] }), n.jsxs("p", { className: "max-w-xl text-center text-[10px] text-white/55", children: ["\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ", ie, "+[ ] / ", ie, "+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ", ie, "+Z / ", Zn, Mr ? " \xB7 Ink API" : "", Oe ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""] }), bn ? n.jsx("p", { className: "max-w-xl text-center text-[10px] text-red-300", children: bn }) : null] }) }), n.jsx("button", { type: "button", className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80", "aria-label": "\uB2EB\uAE30", onClick: mt, children: n.jsx(rs, { size: 20 }) })] }) })] }, "haim-image-lightbox") : null }) }), n.jsx(za, { isOpen: Dt, title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30", cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1", variant: "danger", overlayClassName: "z-100070", onConfirm: Ar, onCancel: zr })] });
}
function Qs({ node: e, selected: r, editor: s, getPos: a, updateAttributes: i }) {
  const l = String(e.attrs.src || ""), h = String(e.attrs.alt || ""), u = String(e.attrs.title || ""), p = s.isEditable, [m, d] = c.useState(false), [w, S] = c.useState(null), M = c.useCallback((v) => {
    if (v.detail > 1) return;
    v.preventDefault(), v.stopPropagation();
    const _ = typeof a == "function" ? a() : null;
    typeof _ == "number" && s.chain().focus().setNodeSelection(_).run();
  }, [s, a]), L = c.useCallback((v) => {
    v.preventDefault(), v.stopPropagation(), l && (S(l), d(true));
  }, [l]), k = c.useCallback(async (v, _) => {
    if (!p) return;
    const O = await mr(_), P = typeof a == "function" ? a() : null, $ = URL.createObjectURL(_);
    if (v === "overwrite") {
      typeof P == "number" ? s.chain().focus().deleteRange({ from: P, to: P + e.nodeSize }).insertContentAt(P, { type: "wikiImage", attrs: { path: O, options: "", alt: O, width: null, height: null, background: null } }).run() : i({ src: $ }), S($);
      return;
    }
    if (typeof P != "number") return;
    const H = P + e.nodeSize;
    s.chain().focus().insertContentAt(H, { type: "wikiImage", attrs: { path: O, options: "", alt: O, width: null, height: null, background: null } }).run();
  }, [p, s, a, i, e.nodeSize]);
  return n.jsxs(oe, { as: "span", className: `haim-stock-image-wrap${r ? " is-selected" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: M, onDoubleClick: L, children: [n.jsx("img", { src: l, alt: h, ...u ? { title: u } : {}, className: "haim-stock-image max-w-full h-auto cursor-pointer", draggable: false }), n.jsx(br, { src: w || l || null, alt: h, open: m, onClose: () => {
    d(false), S(null);
  }, ...p ? { onSaveAnnotated: k } : {} })] });
}
const tr = "haim-mod-held";
function Zs(e, r) {
  let s = null;
  if (r.target instanceof HTMLAnchorElement) s = r.target;
  else {
    const a = r.target;
    if (!a) return null;
    s = a.closest("a");
  }
  return !s || !e.view.dom.contains(s) ? null : s;
}
function Js(e, r) {
  const s = (r.getAttribute("target") || r.target || "_blank").trim(), a = !s || s === "_self" ? "_blank" : s;
  window.open(e, a, "noopener,noreferrer");
}
function ei() {
  return new on({ key: new ln("haimLinkModCursor"), view(e) {
    const r = (u) => {
      e.dom.classList.toggle(tr, u);
    }, s = (u) => {
      r(!!(u.ctrlKey || u.metaKey));
    }, a = (u) => {
      (u.key === "Control" || u.key === "Meta" || u.ctrlKey || u.metaKey) && r(true);
    }, i = (u) => {
      s(u);
    }, l = () => r(false), h = (u) => {
      s(u);
    };
    return window.addEventListener("keydown", a, true), window.addEventListener("keyup", i, true), window.addEventListener("blur", l), e.dom.addEventListener("mousemove", h), { destroy() {
      window.removeEventListener("keydown", a, true), window.removeEventListener("keyup", i, true), window.removeEventListener("blur", l), e.dom.removeEventListener("mousemove", h), e.dom.classList.remove(tr);
    } };
  } });
}
function ti(e, r, s, a) {
  if (a.button !== 0 || !s.editable) return false;
  const i = Zs(e, a);
  if (!i) return false;
  const l = Ra();
  if (!(a.metaKey || a.ctrlKey) && !l) return false;
  const u = qr(s.state, r.name), p = (i.href || u.href || "").trim();
  return p ? (a.preventDefault(), Js(p, i), true) : false;
}
function ni(e, r) {
  return new on({ key: new ln("haimLinkClick"), props: { handleDOMEvents: { click: (s, a) => ti(e, r, s, a) } } });
}
const ri = Xr.extend({ addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], ei(), ni(this.editor, this.type)];
} }).configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } });
function nr(e) {
  if (!e || typeof e != "object") return;
  const r = e;
  r.__haimRawTextPatched || (r.encodeTextForMarkdown = (s) => s, r.escapeMarkdownSyntax = (s) => s, r.__haimRawTextPatched = true);
}
const ai = Yr.extend({ onBeforeCreate(e) {
  var _a2, _b, _c;
  (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
  const r = (_b = this.storage) == null ? void 0 : _b.manager;
  r && nr(r), ((_c = this.editor) == null ? void 0 : _c.markdown) && nr(this.editor.markdown);
} }), si = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, ii = ye.create({ name: "pageBreak", group: "block", atom: true, selectable: true, draggable: true, parseHTML() {
  return [{ tag: "pgbr" }, { tag: "div[data-haim-pgbr]" }, { tag: "div.md-pgbr" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", Me(e, { "data-haim-pgbr": "1", "data-md-pgbr": "1", class: "haim-pgbr md-pgbr" })];
}, markdownTokenizer: { name: "pageBreak", level: "block", start: (e) => {
  const r = /<pgbr\s*\/?\s*>/i.exec(e);
  return r ? r.index : -1;
}, tokenize: (e) => {
  const r = si.exec(e);
  if (r) return { type: "pageBreak", raw: r[0] };
} }, parseMarkdown: (e, r) => r.createNode("pageBreak"), renderMarkdown: () => `<pgbr/>

`, addCommands() {
  return { setPageBreak: () => ({ chain: e, state: r }) => {
    const s = r.schema.nodes[this.name];
    if (!s || !Vr(r, s)) return false;
    const { selection: a } = r, { $to: i } = a, l = e();
    return Ur(a) ? l.insertContentAt(i.pos, { type: this.name }) : l.insertContent({ type: this.name }), l.command(({ state: h, tr: u, dispatch: p }) => {
      var _a2;
      if (p) {
        const { $to: m } = u.selection, d = m.end();
        if (m.nodeAfter) m.nodeAfter.isTextblock ? u.setSelection(Ut.create(u.doc, m.pos + 1)) : m.nodeAfter.isBlock ? u.setSelection(Gr.create(u.doc, m.pos)) : u.setSelection(Ut.create(u.doc, m.pos));
        else {
          const S = (_a2 = h.schema.nodes.paragraph || m.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
          S && (u.insert(d, S), u.setSelection(Ut.create(u.doc, d + 1)));
        }
        u.scrollIntoView();
      }
      return true;
    }).run();
  } };
} }), gn = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", oi = ["nw", "ne", "sw", "se"];
function rr(e) {
  if (!e) return;
  const r = {};
  for (const s of e.split(";")) {
    const a = s.trim();
    if (!a) continue;
    const i = a.indexOf(":");
    if (i < 0) continue;
    const l = a.slice(0, i).trim(), h = a.slice(i + 1).trim(), u = l.replace(/-([a-z])/g, (p, m) => m.toUpperCase());
    r[u] = h;
  }
  return r;
}
function ar(e, r, s, a) {
  const i = cn({ path: e, width: r, height: s, background: a }), l = i.indexOf("|");
  if (l < 0) return "";
  const h = i.lastIndexOf("]]");
  return i.slice(l + 1, h >= 0 ? h : void 0).trim();
}
function bt(e) {
  return `${Math.max(24, Math.round(e))}px`;
}
function li(e) {
  return e ? e.closest(".overflow-auto") || e.parentElement : null;
}
function ci({ node: e, selected: r, editor: s, getPos: a, updateAttributes: i }) {
  var _a2, _b;
  const l = String(e.attrs.path || ""), h = String(e.attrs.options || ""), u = String(e.attrs.alt || l), p = e.attrs.width || null, m = e.attrs.height || null, d = e.attrs.background || null, w = s.isEditable, S = c.useRef(null), M = c.useRef(null), [L, k] = c.useState(false), [v, _] = c.useState(false), [O, P] = c.useState(null), [$, H] = c.useState(null);
  M.current = $;
  const Ne = c.useMemo(() => $ ? { ...rr(wt({ width: null, height: null, background: d })), width: `${$.width}px`, height: `${$.height}px` } : rr(wt({ width: p, height: m, background: d })), [p, m, d, $]), ke = c.useCallback((j, C) => {
    const N = { width: j, height: C, options: ar(l, j, C, d) }, A = li(s.view.dom), z = (A == null ? void 0 : A.scrollTop) ?? null, B = typeof a == "function" ? a() : null;
    if (typeof B == "number") {
      const Q = s.state.tr.setNodeMarkup(B, void 0, { ...e.attrs, ...N });
      s.view.dispatch(Q);
    } else i(N);
    const ee = () => {
      A && z != null && (A.scrollTop = z);
    };
    ee(), requestAnimationFrame(ee), requestAnimationFrame(() => requestAnimationFrame(ee));
  }, [s, a, i, l, d, e.attrs]), ne = c.useCallback(() => {
    const j = M.current;
    j && (ke(bt(j.width), bt(j.height)), H(null), M.current = null);
    const C = typeof a == "function" ? a() : null;
    if (typeof C == "number") {
      const N = C + (e.nodeSize || 1);
      s.commands.setTextSelection(N);
    }
    s.commands.blur();
  }, [ke, s, a, e.nodeSize]), jt = c.useCallback((j, C) => {
    var _a3, _b2;
    if (!w) return;
    C.preventDefault(), C.stopPropagation();
    const N = S.current;
    if (!N) return;
    const A = N.getBoundingClientRect(), z = A.width, B = A.height, ee = C.clientX, Q = C.clientY, W = B > 0 ? z / B : 1, I = C.pointerId;
    (_b2 = (_a3 = C.target).setPointerCapture) == null ? void 0 : _b2.call(_a3, I);
    const V = { width: z, height: B };
    M.current = V, H(V);
    const U = (re) => {
      const te = re.clientX - ee, le = re.clientY - Q;
      let X = z, G = B;
      j.includes("e") && (X = z + te), j.includes("w") && (X = z - te), j.includes("s") && (G = B + le), j.includes("n") && (G = B - le), X = Math.max(24, X), G = Math.max(24, G), (re.shiftKey || re.pointerType === "touch") && (Math.abs(te) >= Math.abs(le) ? G = X / W : X = G * W, X = Math.max(24, X), G = Math.max(24, G));
      const Ee = { width: X, height: G };
      M.current = Ee, H(Ee);
    }, K = (re) => {
      var _a4, _b3;
      window.removeEventListener("pointermove", U), window.removeEventListener("pointerup", K), window.removeEventListener("pointercancel", K);
      try {
        (_b3 = (_a4 = re.target).releasePointerCapture) == null ? void 0 : _b3.call(_a4, I);
      } catch {
      }
      const te = M.current;
      te && ke(bt(te.width), bt(te.height)), M.current = null, H(null);
    };
    window.addEventListener("pointermove", U), window.addEventListener("pointerup", K), window.addEventListener("pointercancel", K);
  }, [w, ke]);
  c.useEffect(() => {
    if (!r || !w || L || v) return;
    const j = (C) => {
      if (C.key !== "Enter") return;
      const N = C.target;
      N instanceof HTMLInputElement || N instanceof HTMLTextAreaElement || N instanceof HTMLElement && N.isContentEditable || (C.preventDefault(), C.stopPropagation(), ne());
    };
    return document.addEventListener("keydown", j, true), () => document.removeEventListener("keydown", j, true);
  }, [r, w, L, v, ne]);
  const pe = c.useCallback((j) => {
    if (j.detail > 1 || j.target instanceof Element && j.target.closest("[data-resize-handle]")) return;
    j.preventDefault(), j.stopPropagation();
    const C = typeof a == "function" ? a() : null;
    typeof C == "number" && s.chain().focus().setNodeSelection(C).run();
  }, [s, a]), at = c.useCallback((j) => {
    j.preventDefault(), j.stopPropagation();
    const C = S.current, N = (C == null ? void 0 : C.currentSrc) || (C == null ? void 0 : C.src) || "";
    N && (P(N), _(true));
  }, []), me = c.useCallback(async (j, C) => {
    if (!w) return;
    const N = await mr(C), A = typeof a == "function" ? a() : null;
    if (j === "overwrite") {
      const B = { path: N, alt: N, options: ar(N, p, m, d) };
      typeof A == "number" ? s.view.dispatch(s.state.tr.setNodeMarkup(A, void 0, { ...e.attrs, ...B })) : i(B);
      const ee = URL.createObjectURL(C);
      P(ee);
      return;
    }
    if (typeof A != "number") return;
    const z = A + e.nodeSize;
    s.chain().focus().insertContentAt(z, { type: "wikiImage", attrs: { path: N, options: "", alt: N, width: null, height: null, background: null } }).run();
  }, [w, s, a, i, p, m, d, e.attrs, e.nodeSize]);
  return n.jsxs(oe, { as: "div", className: `haim-wiki-image-wrap${r ? " is-selected" : ""}${$ ? " is-resizing" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: pe, onDoubleClick: at, onContextMenu: (j) => {
    w && (j.preventDefault(), j.stopPropagation(), k(true));
  }, children: [n.jsxs("div", { className: "haim-wiki-image-frame", children: [n.jsx("img", { ref: S, src: gn, alt: u, className: "haim-wiki-image", "data-wiki-path": l, ...h ? { "data-wiki-options": h } : {}, ...p ? { "data-wiki-width": p } : {}, ...m ? { "data-wiki-height": m } : {}, ...d ? { "data-wiki-bg": d } : {}, style: Ne, draggable: false }), r && w ? oi.map((j) => n.jsx("button", { type: "button", className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${j}`, "aria-label": `resize-${j}`, "data-resize-handle": j, onPointerDown: (C) => jt(j, C) }, j)) : null] }), n.jsx(ps, { isOpen: L, onClose: () => k(false), path: l, kind: "wiki", initialWidth: p ?? "", initialHeight: m ?? "", imageSrc: ((_a2 = S.current) == null ? void 0 : _a2.currentSrc) || ((_b = S.current) == null ? void 0 : _b.src) || "", onApply: ({ width: j, height: C }) => {
    ke(j, C), k(false);
  } }), n.jsx(br, { src: O, alt: u, open: v, onClose: () => {
    _(false), P(null);
  }, ...w ? { onSaveAnnotated: me } : {} })] });
}
function wr(e, r, s = "") {
  const a = r ? _a(r) : null;
  return { path: e, options: r || "", alt: s || e, width: (a == null ? void 0 : a.width) ?? null, height: (a == null ? void 0 : a.height) ?? null, background: (a == null ? void 0 : a.background) ?? null };
}
const ui = ye.create({ name: "wikiImage", group: "block", atom: true, selectable: true, draggable: true, addAttributes() {
  return { path: { default: "" }, options: { default: "" }, alt: { default: "" }, width: { default: null }, height: { default: null }, background: { default: null } };
}, parseHTML() {
  return [{ tag: "img[data-wiki-path]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const r = e.getAttribute("data-wiki-path") || "";
    if (!r) return false;
    const s = e.getAttribute("data-wiki-width"), a = e.getAttribute("data-wiki-height"), i = e.getAttribute("data-wiki-bg"), l = e.getAttribute("data-wiki-options") || [s ? `w=${s}` : "", a ? `h=${a}` : "", i ? `bg=${i}` : ""].filter(Boolean).join(" ");
    return { path: r, options: l, alt: e.getAttribute("alt") || r, width: s || null, height: a || null, background: i || null };
  } }, { tag: "div[data-haim-wiki-image]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const r = e.getAttribute("data-wiki-path") || "";
    if (!r) return false;
    const s = e.getAttribute("data-wiki-options") || "";
    return wr(r, s, e.getAttribute("data-wiki-alt") || r);
  } }];
}, renderHTML({ node: e, HTMLAttributes: r }) {
  const s = String(e.attrs.path || ""), a = String(e.attrs.options || ""), i = String(e.attrs.alt || s), l = e.attrs.width || null, h = e.attrs.height || null, u = e.attrs.background || null, p = wt({ width: l, height: h, background: u });
  return ["img", Me(r, { src: gn, alt: i, "data-wiki-path": s, ...a ? { "data-wiki-options": a } : {}, ...l ? { "data-wiki-width": l } : {}, ...h ? { "data-wiki-height": h } : {}, ...u ? { "data-wiki-bg": u } : {}, ...p ? { style: p } : {}, class: "haim-wiki-image" })];
}, addNodeView() {
  return He(ci);
}, renderMarkdown: (e) => {
  var _a2, _b, _c, _d, _e2;
  const r = String(((_a2 = e.attrs) == null ? void 0 : _a2.path) || "");
  if (!r) return "";
  const s = ((_b = e.attrs) == null ? void 0 : _b.width) || null, a = ((_c = e.attrs) == null ? void 0 : _c.height) || null, i = ((_d = e.attrs) == null ? void 0 : _d.background) || null;
  if (s || a || i) return `${cn({ path: r, width: s, height: a, background: i })}

`;
  const l = String(((_e2 = e.attrs) == null ? void 0 : _e2.options) || "");
  return l ? `![[${r}|${l}]]

` : `![[${r}]]

`;
} });
function so(e, r = "", s = "") {
  const a = wr(e, r, s), i = wt({ width: a.width, height: a.height, background: a.background }), l = [`src="${gn}"`, `alt="${ve(a.alt)}"`, `data-wiki-path="${ve(a.path)}"`, 'class="haim-wiki-image"'];
  return a.options && l.push(`data-wiki-options="${ve(a.options)}"`), a.width && l.push(`data-wiki-width="${ve(a.width)}"`), a.height && l.push(`data-wiki-height="${ve(a.height)}"`), a.background && l.push(`data-wiki-bg="${ve(a.background)}"`), i && l.push(`style="${ve(i)}"`), `<img ${l.join(" ")} />`;
}
function ve(e) {
  return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
const di = ye.create({ name: "wikiFigure", group: "block", content: "wikiImage figcaption", defining: true, isolating: true, parseHTML() {
  return [{ tag: "figure[data-haim-wiki-figure]" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figure", Me(e, { "data-haim-wiki-figure": "1", class: "haim-wiki-figure" }), 0];
}, renderMarkdown: (e, r) => {
  const s = Array.isArray(e.content) ? e.content : [], a = s.find((u) => u.type === "wikiImage"), i = s.find((u) => u.type === "figcaption");
  let l = "";
  if (a == null ? void 0 : a.attrs) {
    const u = String(a.attrs.path || "");
    if (u) {
      const p = a.attrs.width || null, m = a.attrs.height || null, d = a.attrs.background || null;
      if (p || m || d) l = cn({ path: u, width: p, height: m, background: d });
      else {
        const w = String(a.attrs.options || "");
        l = w ? `![[${u}|${w}]]` : `![[${u}]]`;
      }
    }
  }
  const h = i ? String(r.renderChildren(i.content || []) || "").trim() : "";
  return l ? h ? `${l}
${h}

` : `${l}

` : h ? `${h}

` : "";
} }), hi = ye.create({ name: "figcaption", content: "inline*", defining: true, selectable: false, parseHTML() {
  return [{ tag: "figcaption" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figcaption", Me(e), 0];
}, renderMarkdown: (e, r) => r.renderChildren(e.content || []) }), fi = ye.create({ name: "noteCover", group: "block", atom: true, selectable: true, draggable: false, parseHTML() {
  return [{ tag: "div[data-note-cover-placeholder]", priority: 60 }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", Me(e, { class: "md-note-cover-placeholder md-note-cover-placeholder--pending", "data-note-cover-placeholder": "1", role: "button", tabindex: "0", title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9" }), ["div", { class: "md-note-cover-placeholder__mount", "data-note-cover-mount": "1" }], ["span", { class: "md-note-cover-placeholder__fallback" }, ["span", { class: "md-note-cover-placeholder__spinner", "aria-hidden": "true" }], ["span", { class: "md-note-cover-placeholder__fallback-text" }, "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"]]];
}, renderMarkdown: () => "" });
function io() {
  return `${ms()}

`;
}
function yr({ text: e, className: r }) {
  const s = Ia(e);
  return n.jsx("div", { className: ["haim-line-numbers", r].filter(Boolean).join(" "), "aria-hidden": true, children: Array.from({ length: s }, (a, i) => n.jsx("span", { className: "haim-line-numbers__n", children: i + 1 }, i)) });
}
function pi(e) {
  const s = Ha(String(e || ""))[0];
  return s ? { meta: s.meta ?? or(), grid: s.grid } : null;
}
function mi(e, r) {
  return `${Oa(e)}
${Ba(r)}`;
}
function oo() {
  const e = or(), r = { rows: [["", "", ""], ["", "", ""], ["", "", ""]], aligns: [null, null, null] };
  return { meta: e, grid: r, text: mi(e, r) };
}
const gi = "haim-table-edit-request";
function xi(e, r) {
  e.dispatchEvent(new CustomEvent(gi, { detail: r, bubbles: true }));
}
function bi({ node: e, editor: r, selected: s, getPos: a }) {
  const i = String(e.attrs.kind || "raw"), l = String(e.attrs.text || ""), h = r.isEditable, u = c.useMemo(() => {
    if (i !== "haim-table") return null;
    const m = pi(l);
    return m ? gs(m.grid, m.meta) : null;
  }, [i, l]), p = () => {
    if (!h || i !== "haim-table") return;
    const m = typeof a == "function" ? a() : null;
    typeof m == "number" && xi(r.view.dom, { pos: m, text: l });
  };
  return i === "haim-table" && u ? n.jsx(oe, { as: "div", className: `haim-raw-md haim-raw-md--haim-table${s ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": "haim-table", contentEditable: false, onDoubleClick: (m) => {
    m.preventDefault(), m.stopPropagation(), p();
  }, children: n.jsx("div", { className: "haim-haim-table-preview", dangerouslySetInnerHTML: { __html: u } }) }) : n.jsxs(oe, { as: "div", className: `haim-raw-md${s ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": i, contentEditable: false, children: [n.jsx(yr, { text: l, className: "haim-raw-md__line-numbers" }), n.jsx("pre", { className: "haim-raw-md__pre", children: l })] });
}
const wi = ye.create({ name: "rawMarkdownBlock", group: "block", atom: true, selectable: true, code: true, addAttributes() {
  return { text: { default: "" }, kind: { default: "raw" } };
}, parseHTML() {
  return [{ tag: "pre[data-haim-raw-md]", getAttrs: (e) => e instanceof HTMLElement ? { text: e.textContent || "", kind: e.getAttribute("data-kind") || "raw" } : false }];
}, renderHTML({ node: e, HTMLAttributes: r }) {
  return ["pre", Me(r, { "data-haim-raw-md": "1", "data-kind": String(e.attrs.kind || "raw"), class: "haim-raw-md" }), String(e.attrs.text || "")];
}, addNodeView() {
  return He(bi);
}, renderMarkdown: (e) => {
  var _a2;
  const r = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
  return r ? r.endsWith(`
`) ? r : `${r}
` : "";
} }), yi = ye.create({ name: "deepHeading", group: "block", content: "inline*", defining: true, addAttributes() {
  return { level: { default: 7, parseHTML: (e) => {
    const r = Number(e.getAttribute("data-heading-level") || "7");
    return Number.isFinite(r) ? Math.min(10, Math.max(7, r)) : 7;
  } } };
}, parseHTML() {
  return [{ tag: "h6[data-heading-level]", getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const r = Number(e.getAttribute("data-heading-level") || "0");
    return r < 7 || r > 10 ? false : { level: r };
  } }];
}, renderHTML({ node: e, HTMLAttributes: r }) {
  const s = Number(e.attrs.level) || 7;
  return ["h6", { ...r, "data-heading-level": String(s), class: `haim-deep-heading haim-h${s}` }, 0];
}, renderMarkdown: (e, r) => {
  var _a2;
  const s = Number((_a2 = e.attrs) == null ? void 0 : _a2.level) || 7, a = "#".repeat(Math.min(10, Math.max(7, s))), i = r.renderChildren(e.content || []);
  return `${a} ${i}

`;
} }), ki = ye.create({ name: "mathBlock", group: "block", atom: true, code: true, addAttributes() {
  return { latex: { default: "" }, display: { default: true } };
}, parseHTML() {
  return [{ tag: "div[data-haim-math]", getAttrs: (e) => e instanceof HTMLElement ? { latex: e.getAttribute("data-latex") || e.textContent || "", display: e.getAttribute("data-display") !== "false" } : false }];
}, renderHTML({ node: e, HTMLAttributes: r }) {
  return ["div", Me(r, { "data-haim-math": "1", "data-latex": String(e.attrs.latex || ""), "data-display": e.attrs.display ? "true" : "false", class: "haim-math-block" }), String(e.attrs.latex || "")];
}, renderMarkdown: (e) => {
  var _a2, _b;
  const r = String(((_a2 = e.attrs) == null ? void 0 : _a2.latex) || "").trim();
  return r ? ((_b = e.attrs) == null ? void 0 : _b.display) ? `$$
${r}
$$

` : `$${r}$

` : "";
} });
function sr({ label: e, onClick: r, children: s }) {
  return n.jsxs(un, { children: [n.jsx(dn, { asChild: true, children: n.jsx("button", { type: "button", className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft", "aria-label": e, onClick: (a) => {
    a.preventDefault(), a.stopPropagation(), r();
  }, children: s }) }), n.jsx(hn, { children: n.jsxs(fn, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [e, n.jsx(pn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function kr(e, r) {
  const [s, a] = c.useState(null), [i, l] = c.useState(false);
  return c.useEffect(() => {
    const h = String(e || "").trim();
    if (!h) {
      a(null), l(false);
      return;
    }
    try {
      const u = xs.renderToString(h, { throwOnError: false, displayMode: r, output: "html" });
      a(u), l(false);
    } catch {
      a(null), l(true);
    }
  }, [e, r]), { html: s, error: i };
}
function Si({ node: e, updateAttributes: r, editor: s, selected: a }) {
  const i = String(e.attrs.latex || ""), l = s.isEditable, [h, u] = c.useState(false), [p, m] = c.useState(i), d = c.useRef(null), { html: w, error: S } = kr(i, true);
  c.useEffect(() => {
    m(i);
  }, [i]), c.useEffect(() => {
    var _a2;
    h && ((_a2 = d.current) == null ? void 0 : _a2.focus());
  }, [h]);
  const M = () => {
    const k = p.trim();
    r({ latex: k || i }), u(false);
  }, L = () => {
    m(i), u(false);
  };
  return h && l ? n.jsxs(oe, { as: "div", className: `haim-math-block haim-math-block--editing${a ? " is-selected" : ""}`, "data-type": "block-math", contentEditable: false, children: [n.jsx("textarea", { ref: d, className: "haim-math-block__textarea", value: p, rows: Math.min(8, Math.max(2, p.split(`
`).length + 1)), onChange: (k) => m(k.target.value), onBlur: M, onKeyDown: (k) => {
    k.key === "Escape" && (k.preventDefault(), L()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), M()), k.stopPropagation();
  }, spellCheck: false }), n.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: n.jsx("div", { className: "haim-math-block__toolbar", children: n.jsx(sr, { label: "\uBBF8\uB9AC\uBCF4\uAE30", onClick: M, children: n.jsx(lr, { size: 14, "aria-hidden": true }) }) }) })] }) : n.jsxs(oe, { as: "div", className: `haim-math-block${a ? " is-selected" : ""}${S ? " haim-math-block--error" : ""}`, "data-type": "block-math", "data-latex": i, contentEditable: false, onDoubleClick: () => {
    l && u(true);
  }, children: [n.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: l ? n.jsx("div", { className: "haim-math-block__toolbar", children: n.jsx(sr, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => u(true), children: n.jsx(Zt, { size: 14, "aria-hidden": true }) }) }) : null }), w ? n.jsx("div", { className: "haim-math-block__render", dangerouslySetInnerHTML: { __html: w } }) : n.jsx("div", { className: "haim-math-block__fallback", children: i || "\u2026" })] });
}
function ji({ node: e, updateAttributes: r, editor: s, selected: a }) {
  const i = String(e.attrs.latex || ""), l = s.isEditable, [h, u] = c.useState(false), [p, m] = c.useState(i), d = c.useRef(null), { html: w, error: S } = kr(i, false);
  c.useEffect(() => {
    m(i);
  }, [i]), c.useEffect(() => {
    var _a2;
    h && ((_a2 = d.current) == null ? void 0 : _a2.focus());
  }, [h]);
  const M = () => {
    const k = p.trim();
    r({ latex: k || i }), u(false);
  }, L = () => {
    m(i), u(false);
  };
  return h && l ? n.jsx(oe, { as: "span", className: `haim-math-inline haim-math-inline--editing${a ? " is-selected" : ""}`, "data-type": "inline-math", contentEditable: false, children: n.jsx("input", { ref: d, type: "text", className: "haim-math-inline__input", value: p, onChange: (k) => m(k.target.value), onBlur: M, onKeyDown: (k) => {
    k.key === "Enter" && (k.preventDefault(), M()), k.key === "Escape" && (k.preventDefault(), L()), k.stopPropagation();
  }, spellCheck: false }) }) : n.jsx(oe, { as: "span", className: `haim-math-inline${a ? " is-selected" : ""}${S ? " haim-math-inline--error" : ""}`, "data-type": "inline-math", "data-latex": i, contentEditable: false, onDoubleClick: (k) => {
    k.preventDefault(), k.stopPropagation(), l && u(true);
  }, children: w ? n.jsx("span", { dangerouslySetInnerHTML: { __html: w } }) : n.jsx("span", { className: "haim-math-inline__fallback", children: i || "?" }) });
}
const Ci = Qr.extend({ addNodeView() {
  return He(Si);
} }).configure({ katexOptions: { throwOnError: false, displayMode: true } }), vi = Zr.extend({ addNodeView() {
  return He(ji);
} }).configure({ katexOptions: { throwOnError: false, displayMode: false } });
function Mi(e) {
  return String(e || "").trim().toLowerCase() === "mermaid";
}
function Ni(e) {
  var _a2;
  return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
}
const Ei = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg";
function kt({ label: e, onClick: r, active: s = false, expanded: a, children: i }) {
  return n.jsxs(un, { children: [n.jsx(dn, { asChild: true, children: n.jsx("button", { type: "button", className: `haim-code-block__action${s ? " is-copy-success" : ""}`, "aria-label": e, ...a !== void 0 ? { "aria-expanded": a } : {}, onClick: r, children: i }) }), n.jsx(hn, { children: n.jsxs(fn, { side: "bottom", sideOffset: 6, className: Ei, children: [e, n.jsx(pn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function ir({ language: e, collapsed: r, copied: s, onCopy: a, onToggleCollapse: i, extra: l }) {
  return n.jsxs("div", { className: "haim-code-block__header", children: [n.jsx("span", { className: "haim-code-block__lang", children: e || "code" }), n.jsxs("div", { className: "haim-code-block__actions", children: [l, n.jsx(kt, { label: s ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC", active: s, onClick: a, children: s ? n.jsx(as, { size: 14, "aria-hidden": true }) : n.jsx(ss, { size: 14, "aria-hidden": true }) }), n.jsx(kt, { label: r ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30", expanded: !r, onClick: i, children: r ? n.jsx(is, { size: 14, "aria-hidden": true }) : n.jsx(os, { size: 14, "aria-hidden": true }) })] })] });
}
function Ti({ node: e, editor: r, selected: s }) {
  const a = String(e.attrs.language || ""), i = Mi(a), l = e.textContent || "", [h, u] = c.useState(null), [p, m] = c.useState(false), [d, w] = c.useState(false), [S, M] = c.useState(false), [L, k] = c.useState(false), v = r.isEditable;
  c.useEffect(() => {
    var _a2;
    if (!i || d || S) return;
    let P = false;
    const $ = Ni(((_a2 = r.view) == null ? void 0 : _a2.dom) ?? null);
    return bs(l, $).then((H) => {
      P || (H ? (u(H), m(false)) : (u(null), m(!!l.trim())));
    }), () => {
      P = true;
    };
  }, [i, d, S, l, r]);
  const _ = c.useCallback(() => {
    var _a2;
    const P = l, $ = () => {
      k(true), window.setTimeout(() => k(false), 1500);
    };
    if (typeof navigator < "u" && ((_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText)) {
      navigator.clipboard.writeText(P).then($).catch(() => {
        try {
          const H = document.createElement("textarea");
          H.value = P, document.body.appendChild(H), H.select(), document.execCommand("copy"), H.remove(), $();
        } catch {
        }
      });
      return;
    }
    $();
  }, [l]), O = n.jsx("pre", { className: "haim-mermaid-block__source-hidden", "aria-hidden": true, children: n.jsx(Fn, { as: "code" }) });
  return i && !d && h && !S ? n.jsxs(oe, { as: "div", className: `haim-code-block haim-mermaid-block${s ? " is-selected" : ""}`, "data-language": "mermaid", children: [n.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: n.jsx(ir, { language: "mermaid", collapsed: S, copied: L, onCopy: _, onToggleCollapse: () => M((P) => !P), extra: v ? n.jsx(kt, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => w(true), children: n.jsx(Zt, { size: 14, "aria-hidden": true }) }) : null }) }), n.jsx("div", { className: "haim-mermaid-block__chart", dangerouslySetInnerHTML: { __html: h }, onDoubleClick: () => {
    v && w(true);
  } }), O] }) : n.jsxs(oe, { as: "div", className: `haim-code-block${i ? " haim-code-block--mermaid-edit" : ""}${s ? " is-selected" : ""}${S ? " is-collapsed" : ""}`, "data-language": a || void 0, children: [n.jsx(rt, { delayDuration: 250, skipDelayDuration: 0, children: n.jsx(ir, { language: a || (i ? "mermaid" : "code"), collapsed: S, copied: L, onCopy: _, onToggleCollapse: () => M((P) => !P), extra: i && v && !S ? n.jsx(kt, { label: d || p ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => w((P) => !P), children: d || p ? n.jsx(lr, { size: 14, "aria-hidden": true }) : n.jsx(Zt, { size: 14, "aria-hidden": true }) }) : null }) }), S ? O : n.jsxs(n.Fragment, { children: [i && p ? n.jsx("div", { className: "haim-mermaid-block__error", children: "Mermaid \uB80C\uB354 \uC2E4\uD328" }) : null, n.jsxs("div", { className: "haim-code-block__body", children: [n.jsx(yr, { text: l, className: "haim-code-block__line-numbers" }), n.jsx("pre", { className: a ? `language-${a}` : void 0, children: n.jsx(Fn, { as: "code", ...a ? { className: `language-${a}` } : {} }) })] })] })] });
}
function Sr(e) {
  return String(e ?? "").replace(/^(?:\r?\n)+/, "").replace(/(?:\r?\n)+$/, "");
}
function lo(e, r) {
  const { state: s } = e;
  s.selection;
  let a = s.tr, i = false;
  return s.doc.descendants((l, h) => {
    if (l.type.name !== "codeBlock") return;
    const u = l.textContent, p = Sr(u);
    if (p === u) return;
    const m = h + 1, d = h + l.nodeSize - 1;
    a = a.insertText(p, a.mapping.map(m), a.mapping.map(d)), i = true;
  }), i ? (a.setMeta("addToHistory", false), a.setMeta("haimTrimCodeEdges", true), e.view.dispatch(a), true) : false;
}
const Pi = new ln("haimTrimCodeEdges");
function Li() {
  return new on({ key: Pi, appendTransaction(e, r, s) {
    if (!e.some((v) => v.selectionSet || v.docChanged) || e.some((v) => v.getMeta("haimTrimCodeEdges"))) return null;
    const a = r.selection.$from, i = s.selection.$from, l = a.parent.type.name === "codeBlock", h = i.parent.type.name === "codeBlock";
    if (!l || h) return null;
    const u = a.depth, p = a.node(u), m = a.before(u);
    if (p.type.name !== "codeBlock") return null;
    const d = p.textContent, w = Sr(d);
    if (w === d) return null;
    const S = m + 1, M = m + p.nodeSize - 1;
    let L = S, k = M;
    for (const v of e) L = v.mapping.map(L), k = v.mapping.map(k);
    return s.tr.insertText(w, L, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
  } });
}
const $i = ws(ys), Di = Jr.extend({ addNodeView() {
  return He(Ti);
}, addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], Li()];
} }).configure({ lowlight: $i, languageClassPrefix: "language-" }), Ai = ea.extend({ renderMarkdown: (e, r) => {
  if (!e) return "";
  const s = Array.isArray(e.content) ? e.content : [];
  return s.length === 0 ? "" : r.renderChildren(s);
} }), zi = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
function co(e) {
  const r = typeof e == "string" ? e : "", s = zi.exec(r);
  if (!s) return { prefix: "", body: r };
  const a = s[1] ?? "";
  return { prefix: a, body: r.slice(a.length) };
}
function Ri(e, r) {
  return e ? r ? e.endsWith(`
`) ? `${e}${r}` : `${e}
${r}` : e : r;
}
function an(e, r) {
  let s = 0;
  const a = Math.min(Math.max(0, r), e.length);
  for (let i = 0; i < a; i += 1) e.charCodeAt(i) === 10 && (s += 1);
  return s;
}
function _i(e) {
  if (!e) return 0;
  const r = "\0", s = Ri(e, r), a = s.indexOf(r);
  return a < 0 ? 0 : an(s, a);
}
function Ii(e, r) {
  try {
    return e({ type: "doc", content: [r.toJSON()] }).replace(/\n+$/, "");
  } catch {
    return r.textContent || "";
  }
}
function Hi(e, r, s) {
  const a = _i(s);
  let i = "";
  try {
    i = r(e.toJSON());
  } catch {
    i = "";
  }
  const l = [];
  let h = 0;
  return e.forEach((u, p) => {
    const m = p + u.nodeSize;
    if (u.type.name === "noteCover") {
      l.push({ pos: p, to: m, line0: 0 });
      return;
    }
    const d = Ii(r, u);
    let w = -1;
    if (d.length > 0 && i && (w = i.indexOf(d, h), w < 0)) {
      let M = h;
      for (; M < i.length && i.charCodeAt(M) === 10; ) M += 1;
      w = i.indexOf(d, M);
    }
    let S;
    if (w >= 0) S = a + an(i, w), h = w + Math.max(d.length, 1);
    else {
      for (; h < i.length && i.charCodeAt(h) === 10; ) h += 1;
      S = a + an(i, h), h = Math.min(i.length, h + Math.max(d.length, d ? 0 : 1));
    }
    l.push({ pos: p, to: m, line0: S });
  }), l;
}
function Oi(e) {
  var _a2;
  const s = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
  return !s || typeof s.serialize != "function" ? null : (a) => s.serialize(a);
}
const Bi = ta.create({ name: "haimSourceLine", addOptions() {
  return { getMetaPrefix: () => "" };
}, addDecorations() {
  const e = this.options.getMetaPrefix ?? (() => "");
  return { update: "document", create: ({ editor: r, state: s }) => {
    const a = Oi(r);
    if (!a) return [];
    const i = e() || "";
    return Hi(s.doc, a, i).map((h) => na.Node(h.pos, h.to, { "data-line": String(h.line0) }));
  } };
} });
function uo(e) {
  const r = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", a = ((e == null ? void 0 : e.profile) ?? "note") === "note", i = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), h = [a ? Wn.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, codeBlock: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }) : Wn.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }), Ai, ai, Bi.configure({ getMetaPrefix: i }), ri, ua.extend({ parseHTML() {
    return [{ tag: "img[src]:not([data-wiki-path])" }];
  }, addNodeView() {
    return He(Qs);
  } }).configure({ allowBase64: true }), da.configure({ taskItem: { nested: true } }), ha.configure({ table: { resizable: a } }), ra, fa.configure({ types: ["heading", "paragraph"] }), pa.configure({ multicolor: true }), ...a ? [Di] : [], aa, sa, ia, ma.configure({ placeholder: r }), oa, ga.configure({ className: "haim-node-focused" }), la, ca, Ci, vi, ii, ui, hi, di, ...a ? [fi] : [], wi, yi, ki];
  return a ? [...h, xa, Sa.configure({ controls: true, nocookie: true }), ja.configure({ persist: true }), ba, wa, Ca.configure({ emojis: va, enableEmoticons: true }), ya, Ma.configure({ injectCSS: true, visible: false }), Na.configure({ types: ["heading", "paragraph"] }), Ea.configure({ getIndex: Ta }), ka] : h;
}
const sn = /* @__PURE__ */ new WeakMap();
function Fi(e, r) {
  if (e === r) return true;
  if (!e || !r) return false;
  try {
    return JSON.stringify(e) === JSON.stringify(r);
  } catch {
    return false;
  }
}
function ho(e) {
  if (!e) return "";
  const r = e.getJSON(), s = sn.get(e);
  if (s && Fi(s.json, r)) return s.markdown;
  const a = e, i = typeof a.getMarkdown == "function" ? a.getMarkdown() : "";
  return sn.set(e, { json: r, markdown: i }), i;
}
function fo(e) {
  e && sn.delete(e);
}
export {
  gi as H,
  oo as a,
  mi as b,
  uo as c,
  br as d,
  ao as e,
  ho as g,
  fo as i,
  Ri as j,
  io as n,
  pi as p,
  ro as r,
  co as s,
  lo as t,
  mr as u,
  so as w
};
