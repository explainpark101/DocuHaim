import { c as fe, s as ha, P as lt, d as ct, g as fa, M as pa, e as ve, f as ma, i as ga, T as se, N as xa, h as Te, R as Ke, B as ba, I as wa, j as Xn, C as ya, k as ka, l as mr, n as Sa, o as Ca, p as Vn, q as va, r as ja, t as Ma, v as Na, S as Ea, w as Ta, x as $a, L as La, y as Pa, z as Aa, A as Da, F as Ba, G as Ra, H as Ia, J as Ha, K as _a, O as za, Q as Oa, U as Fa, V as Ka, W as Wa, X as qa, Y as Xa, Z as Va, _ as Ya, $ as Ua } from "./vendor-tiptap-D-NU6RLj.js";
import { r as d, j as a } from "./vendor-react-BDjpSibw.js";
import { A as an, m as He } from "./vendor-motion-Dw-WnPM7.js";
import { t as Ga, O as Qa } from "./index-CUaeQqoG.js";
import { c as Ja, n as _e, ab as Za, C as es, j as ts, gn as ns, du as vt, aH as xn, h2 as rs, h3 as gr, gz as Yn, u as as, aV as xr, h4 as ss, h5 as is, h6 as br } from "./index-CfCFWUoL.js";
import { g as os } from "./Kbd-zJP-p1De.js";
import { t as Un, a_ as ls, P as cs, a$ as us, b0 as ds, b1 as hs, v as fs, aT as Gn, z as Qn, U as ps, R as ms, T as gs, b2 as xs, ad as bs, o as ws, w as ys, b3 as ks, X as Ss, E as wr, b4 as yr, y as kr, ak as Cs, k as Sr, j as vs, n as js } from "./vendor-lucide-DgWK5x8G.js";
import { N as Ms, O as Ns, Q as Es, U as Ts, V as $s, W as Ls, y as nt, z as rt, B as sn, E as at, G as st, H as it, K as ke, M as Se, h as ot, i as Mt, j as Nt, k as Et, l as Tt, A as $t, R as Ps, T as As, P as Ds, C as Bs } from "./vendor-radix-qpbG9kXl.js";
import { W as Rs } from "./WikiImageSizeModal--zGJhe9P.js";
import { b as Is } from "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import { c as Hs, f as _s } from "./pretextMeasure-CjJHEvjB.js";
import { haimTableToHtml as zs } from "./toHtml-BGH46tCl.js";
import { k as Os } from "./vendor-katex-NqpuB_gR.js";
import { r as Fs, l as Ks, g as Ws, h as qs, i as Xs, j as Vs, k as Ys, m as Us } from "./haimCodeBlockLanguages-C4u7NjrS.js";
import { c as Gs } from "./lazyMermaid-CFU1x6wk.js";
import { c as Qs, g as Js } from "./vendor-highlight-Cy0EGwO-.js";
function Zs() {
  var _a2;
  return typeof navigator > "u" ? false : !!((_a2 = navigator.ink) == null ? void 0 : _a2.requestPresenter);
}
async function ei(e) {
  const t = navigator.ink;
  if (!(t == null ? void 0 : t.requestPresenter)) return null;
  try {
    return await t.requestPresenter({ presentationArea: e });
  } catch {
    return null;
  }
}
async function ti(e) {
  const { src: t, inkCanvas: s, highlightCanvas: n } = e, i = await ni(t), o = ("width" in i, i.width), c = ("height" in i, i.height), u = document.createElement("canvas");
  u.width = Math.max(1, Math.round(o)), u.height = Math.max(1, Math.round(c));
  const f = u.getContext("2d");
  if (!f) throw new Error("Canvas 2D unavailable");
  if (f.imageSmoothingEnabled = true, f.imageSmoothingQuality = "high", f.drawImage(i, 0, 0, u.width, u.height), s && s.width > 0 && s.height > 0 && f.drawImage(s, 0, 0, u.width, u.height), n && n.width > 0 && n.height > 0 && f.drawImage(n, 0, 0, u.width, u.height), "close" in i && typeof i.close == "function") try {
    i.close();
  } catch {
  }
  const p = await new Promise((h) => {
    u.toBlob((g) => h(g), "image/png");
  });
  if (!p) throw new Error("Failed to encode PNG");
  return p;
}
async function ni(e) {
  try {
    const t = await fetch(e, { mode: "cors", credentials: "omit" });
    if (!t.ok) throw new Error(`fetch ${t.status}`);
    const s = await t.blob();
    return await createImageBitmap(s);
  } catch {
    return await ri(e);
  }
}
function ri(e) {
  return new Promise((t, s) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.onload = () => t(n), n.onerror = () => s(new Error("Image load failed for composite")), n.src = e;
  });
}
function Lt(e) {
  return Math.max(e.diameterX, e.diameterY);
}
function Cr(e) {
  return e.dash === "solid" && Math.abs(e.diameterX - e.diameterY) > 0.05;
}
function ai(e, t) {
  return !(t >= 8) || !(e >= 1) ? 1 : z(e / t, 0.25, 12);
}
function Jn(e, t, s) {
  const n = Math.max(4, Math.min(96, Math.min(t, s) * 0.08));
  return z(e, 0.5, n);
}
function vr(e, t) {
  if (e.length < 2) return 0;
  const s = Math.max(0, t - 1), n = Math.min(e.length - 1, t + 1);
  if (s === n) {
    const c = e[Math.max(0, t - 1)], u = e[t];
    return Math.atan2(u.y - c.y, u.x - c.x);
  }
  const i = e[s], o = e[n];
  return Math.atan2(o.y - i.y, o.x - i.x);
}
function jr(e, t) {
  if (e.length === 0) return [];
  const s = e[0];
  if (!s) return [];
  const n = Math.max(0.5, t), i = [{ ...s }];
  let o = 0;
  for (let c = 1; c < e.length; c += 1) {
    const u = e[c - 1], f = e[c], p = Math.hypot(f.x - u.x, f.y - u.y);
    if (p < 1e-6) continue;
    let h = 0;
    for (; o + (p - h) >= n; ) {
      const g = n - o, w = (h + g) / p;
      i.push({ x: u.x + (f.x - u.x) * w, y: u.y + (f.y - u.y) * w, pressure: u.pressure + (f.pressure - u.pressure) * w }), h += g, o = 0;
    }
    o += p - h;
  }
  return i;
}
const si = [{ value: "300", label: "Light 300" }, { value: "400", label: "Regular 400" }, { value: "500", label: "Medium 500" }, { value: "600", label: "Semibold 600" }, { value: "700", label: "Bold 700" }, { value: "800", label: "ExtraBold 800" }], ii = [{ value: "multiply", label: "Multiply" }, { value: "overlay", label: "Overlay" }, { value: "soft-light", label: "Soft light" }, { value: "screen", label: "Screen" }, { value: "darken", label: "Darken" }, { value: "lighten", label: "Lighten" }, { value: "color-burn", label: "Color burn" }, { value: "normal", label: "Normal" }];
function z(e, t, s) {
  return Math.min(s, Math.max(t, e));
}
const Mr = 0.92, Zn = 0.35;
function oi(e, t) {
  const s = e.x - t.x, n = e.y - t.y;
  return s * s + n * n;
}
function Nr(e, t, s = Mr) {
  const n = z(s, 0.05, 1);
  return { x: e.x + (t.x - e.x) * n, y: e.y + (t.y - e.y) * n, pressure: e.pressure + (t.pressure - e.pressure) * n };
}
function li(e, t, s, n = Mr) {
  let i = t;
  const o = Zn * Zn;
  for (const c of s) {
    i = Nr(i, c, n);
    const u = e[e.length - 1];
    !u || oi(u, i) >= o ? e.push({ ...i }) : (u.x = i.x, u.y = i.y, u.pressure = i.pressure);
  }
  return i;
}
function ci(e) {
  if (e.length === 0) return "";
  const t = e[0];
  if (!t) return "";
  if (e.length === 1) return `M ${t.x} ${t.y} L ${t.x + 0.01} ${t.y}`;
  if (e.length === 2) {
    const n = e[1];
    return `M ${t.x} ${t.y} L ${n.x} ${n.y}`;
  }
  let s = `M ${t.x} ${t.y}`;
  for (let n = 0; n < e.length - 1; n += 1) {
    const i = e[n === 0 ? 0 : n - 1], o = e[n], c = e[n + 1], u = e[n + 2 < e.length ? n + 2 : n + 1], f = o.x + (c.x - i.x) / 6, p = o.y + (c.y - i.y) / 6, h = c.x - (u.x - o.x) / 6, g = c.y - (u.y - o.y) / 6;
    s += ` C ${f} ${p} ${h} ${g} ${c.x} ${c.y}`;
  }
  return s;
}
function on(e) {
  if (e.dash !== "dashed") return;
  const t = Lt(e), s = Math.max(2, t * 1.2);
  return `${Math.max(2, t * 2.2)} ${s}`;
}
function ln(e) {
  return e === "square" ? "square" : "round";
}
function cn(e) {
  return e === "square" ? "miter" : "round";
}
function ui(e) {
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
function er(e, t, s) {
  e.lineCap = ln(t.shape), e.lineJoin = cn(t.shape), e.miterLimit = 2, e.lineWidth = Math.max(0.5, s), e.globalAlpha = z(t.opacity, 0.02, 1);
  const n = on(t);
  n ? e.setLineDash(n.split(" ").map(Number)) : e.setLineDash([]);
}
function di(e, t, s, n, i = 1) {
  const o = Math.max(0.25, t.diameterX * i / 2), c = Math.max(0.25, t.diameterY * i / 2);
  e.save(), e.translate(s.x, s.y), e.rotate(n), e.beginPath(), t.shape === "square" ? e.rect(-o, -c, o * 2, c * 2) : e.ellipse(0, 0, o, c, 0, 0, Math.PI * 2), e.fill(), e.restore();
}
function Er(e, t) {
  if (t.points.length < 1) return;
  if (e.globalAlpha = z(t.opacity, 0.02, 1), Cr(t)) {
    const i = Math.max(0.75, Math.min(t.diameterX, t.diameterY) * 0.4), o = jr(t.points, i);
    for (let c = 0; c < o.length; c += 1) {
      const u = o[c], f = Math.min(t.points.length - 1, Math.round(c / Math.max(1, o.length - 1) * (t.points.length - 1))), p = vr(t.points, f), h = t.kind === "pressure" ? u.pressure : 1;
      di(e, t, u, p, h);
    }
    return;
  }
  const s = Lt(t);
  if (t.kind === "pressure" && t.points.length >= 2) {
    for (let i = 1; i < t.points.length; i += 1) {
      const o = t.points[i - 1], c = t.points[i], u = Math.max(0.5, s * ((o.pressure + c.pressure) / 2));
      er(e, t, u), e.beginPath(), e.moveTo(o.x, o.y), e.lineTo(c.x, c.y), e.stroke();
    }
    return;
  }
  er(e, t, s), e.beginPath();
  const n = t.points[0];
  if (e.moveTo(n.x, n.y), t.points.length === 1) e.lineTo(n.x + 0.01, n.y);
  else for (let i = 1; i < t.points.length; i += 1) {
    const o = t.points[i];
    e.lineTo(o.x, o.y);
  }
  e.stroke();
}
function hi(e, t, s) {
  const n = document.createElement("canvas");
  n.width = Math.max(1, Math.round(e)), n.height = Math.max(1, Math.round(t));
  const i = n.getContext("2d");
  if (!i) return n;
  i.imageSmoothingEnabled = true, i.imageSmoothingQuality = "high";
  for (const o of s) i.save(), o.kind === "eraser" ? (i.globalCompositeOperation = "destination-out", i.strokeStyle = "rgba(0,0,0,1)", i.globalAlpha = 1) : (i.globalCompositeOperation = "source-over", i.strokeStyle = o.color), Er(i, o), i.restore();
  return n;
}
function fi(e, t, s) {
  const n = document.createElement("canvas");
  n.width = Math.max(1, Math.round(e)), n.height = Math.max(1, Math.round(t));
  const i = n.getContext("2d");
  if (!i) return n;
  i.imageSmoothingEnabled = true, i.imageSmoothingQuality = "high";
  for (const o of s) i.save(), o.kind === "eraser" ? (i.globalCompositeOperation = "destination-out", i.strokeStyle = "rgba(0,0,0,1)", i.globalAlpha = 1) : (i.globalCompositeOperation = ui(o.blend), i.strokeStyle = o.color), Er(i, o), i.restore();
  return n;
}
function pi(e, t, s) {
  var _a2;
  e.textBaseline = "top", e.textAlign = "left";
  for (const n of t) {
    const i = n.text ?? "";
    if (!i.trim() && i.length === 0) continue;
    const o = Math.max(1, n.fontSizePx * Math.max(1e-3, s));
    e.save(), e.globalCompositeOperation = "source-over", e.globalAlpha = z(n.opacity, 0.02, 1), e.fillStyle = n.color;
    const c = ((_a2 = n.fontFamily) == null ? void 0 : _a2.trim()) || "sans-serif";
    e.font = `${n.fontStyle || "normal"} ${n.fontWeight || "400"} ${o}px ${c}`;
    const u = o * 1.3, f = i.split(`
`);
    for (let p = 0; p < f.length; p += 1) e.fillText(f[p] ?? "", n.x, n.y + p * u);
    e.restore();
  }
}
const tr = 8192;
function mi(e) {
  const t = Math.max(1, e.clientWidth), s = Math.max(1, e.clientHeight), n = e.naturalWidth > 0 ? e.naturalWidth : t, i = e.naturalHeight > 0 ? e.naturalHeight : s, o = Math.min(3, window.devicePixelRatio || 1);
  let c = Math.max(n, Math.round(t * o)), u = Math.max(i, Math.round(s * o));
  const f = Math.max(c, u);
  if (f > tr) {
    const p = tr / f;
    c = Math.max(1, Math.round(c * p)), u = Math.max(1, Math.round(u * p));
  }
  return { bufW: c, bufH: u, cssW: t, cssH: s };
}
let jt = null;
function ml(e) {
  jt = e;
}
function gi() {
  return typeof jt == "function";
}
async function Tr(e) {
  var _a2;
  if (!jt) throw new Error("Image upload is not available");
  const s = (_a2 = (await jt([e]))[0]) == null ? void 0 : _a2.trim();
  if (!s) throw new Error("Upload returned no path");
  return s;
}
function gl(e) {
  return Array.isArray(e) ? e.map((t) => String(t || "").trim()).filter(Boolean) : typeof e == "string" && e.trim() ? [e.trim()] : [];
}
const bn = [0.22, 1, 0.36, 1], xi = { duration: 0.2, ease: bn }, bi = { duration: 0.28, ease: bn }, kt = 0.5, St = 8, ze = 1.25, wi = 2, we = 0.5, Ce = 128, yi = 4e3, $r = 450, ki = ["#111827", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"], Si = ["#facc15", "#f472b6", "#38bdf8", "#4ade80", "#fb923c"], Ci = { backgroundColor: "#ffffff", backgroundImage: ["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)", "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)", "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","), backgroundSize: "16px 16px", backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px" };
function Oe(e) {
  return Math.round(e * 10) / 10;
}
function vi(e) {
  return Math.max(0.1, Oe(e / 10));
}
function nr(e, t) {
  return Oe(z(e + t * vi(e), we, Ce));
}
const un = 8, dn = 400;
function ji() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", t = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
}
const Lr = ji(), he = os(), rr = Lr ? `${he}+Shift+Z` : `${he}+Y`;
function Mi(e, t) {
  const s = Math.max(1, Math.round(e / 10));
  return z(Math.round(e + t * s), un, dn);
}
function Ni(e, t) {
  if (!t) return 1;
  const s = e.pressure;
  return typeof s != "number" || Number.isNaN(s) || e.pointerType === "mouse" ? 0.5 : z(s || 0.05, 0.05, 1);
}
function X({ label: e, active: t = false, disabled: s = false, tone: n = "default", onClick: i, children: o }) {
  const c = n === "save" ? "border-emerald-400/60 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40" : n === "saveAs" ? "border-violet-400/60 bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40" : t ? "border-sky-400 bg-sky-500/30 text-white" : "border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40";
  return a.jsxs(Mt, { children: [a.jsx(Nt, { asChild: true, children: a.jsx("button", { type: "button", "aria-label": e, disabled: s, onClick: i, className: `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${c}`, children: o }) }), a.jsx(Et, { children: a.jsxs(Tt, { side: "top", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [e, a.jsx($t, { className: "fill-neutral-900" })] }) })] });
}
const Ei = { backgroundImage: "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)" };
function ar({ size: e = 16 }) {
  return a.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: a.jsx("path", { d: "M2 8h12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function sr({ size: e = 16 }) {
  return a.jsx("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: a.jsx("path", { d: "M2 8h3M7 8h3M12 8h2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) });
}
function de({ stroke: e, fading: t = false }) {
  const s = e.kind === "eraser", n = s ? "#000" : e.color, i = s ? 1 : e.opacity, o = t ? { opacity: 0, transition: `opacity ${$r}ms ease-out` } : { opacity: i };
  if (Cr(e)) {
    const f = Math.max(0.75, Math.min(e.diameterX, e.diameterY) * 0.4), p = jr(e.points, f);
    return a.jsx("g", { style: o, children: p.map((h, g) => {
      const w = Math.min(e.points.length - 1, Math.round(g / Math.max(1, p.length - 1) * (e.points.length - 1))), C = vr(e.points, w) * 180 / Math.PI, E = e.kind === "pressure" ? h.pressure : 1, k = Math.max(0.25, e.diameterX * E / 2), N = Math.max(0.25, e.diameterY * E / 2);
      return e.shape === "square" ? a.jsx("rect", { x: -k, y: -N, width: k * 2, height: N * 2, fill: n, transform: `translate(${h.x} ${h.y}) rotate(${C})` }, `${e.id}-st-${g}`) : a.jsx("ellipse", { cx: 0, cy: 0, rx: k, ry: N, fill: n, transform: `translate(${h.x} ${h.y}) rotate(${C})` }, `${e.id}-st-${g}`);
    }) });
  }
  const c = Lt(e);
  if (e.kind === "pressure" && e.points.length >= 2) return a.jsx("g", { style: o, children: e.points.slice(1).map((f, p) => {
    const h = e.points[p], g = Math.max(0.5, c * ((h.pressure + f.pressure) / 2));
    return a.jsx("path", { d: `M ${h.x} ${h.y} L ${f.x} ${f.y}`, fill: "none", stroke: n, strokeWidth: g, strokeLinecap: ln(e.shape), strokeLinejoin: cn(e.shape), strokeMiterlimit: 2, strokeDasharray: on({ ...e, diameterX: g, diameterY: g }), style: { fill: "none" } }, `${e.id}-p-${p}`);
  }) });
  const u = ci(e.points);
  return u ? a.jsx("path", { d: u, fill: "none", stroke: n, strokeWidth: c, strokeLinecap: ln(e.shape), strokeLinejoin: cn(e.shape), strokeMiterlimit: 2, strokeDasharray: on(e), style: { ...o, fill: "none" } }) : null;
}
function Pr({ src: e, alt: t = "", open: s, onClose: n, onSaveAnnotated: i }) {
  const o = !!(s && e), [c, u] = d.useState(1), [f, p] = d.useState({ x: 0, y: 0 }), [h, g] = d.useState("pan"), [w, C] = d.useState("#111827ff"), [E, k] = d.useState("#facc15ff"), [N, T] = d.useState(4), [I, R] = d.useState(4), [b, $] = d.useState(1), [H, L] = d.useState(0.45), [O, W] = d.useState("multiply"), [ie, $e] = d.useState("circle"), [J, j] = d.useState("solid"), [M, A] = d.useState([]), [P, _] = d.useState([]), [q, oe] = d.useState([]), [ne, V] = d.useState([]), [K, Z] = d.useState(null), [ee, Y] = d.useState(null), [ce, le] = d.useState("Paperozi, sans-serif"), [pe, U] = d.useState(24), [te, ut] = d.useState("400"), [Le, At] = d.useState("normal"), [Wr, Dt] = d.useState(() => /* @__PURE__ */ new Set()), [G, ye] = d.useState(null), [Bt, Rt] = d.useState(false), [qr, me] = d.useState([]), [D, Xr] = d.useState({ w: 1, h: 1 }), [dt, ht] = d.useState(null), [Vr, It] = d.useState(false), [We, kn] = d.useState(false), [Sn, Ht] = d.useState(null), [_t, zt] = d.useState(false), [Ot, Cn] = d.useState(false), [Ft, qe] = d.useState(false), Kt = d.useRef({ w: 4, h: 4 }), ft = d.useRef(null), Wt = d.useRef(null), pt = d.useRef(null), je = d.useRef(null), vn = d.useRef([]), jn = d.useRef([]), Xe = d.useRef([]), ge = d.useRef(null), xe = d.useRef(null), qt = d.useRef(null), Mn = d.useRef(null), Xt = d.useRef(0), be = d.useRef(null), Vt = d.useRef(null), Pe = d.useRef(null), Ve = d.useRef(null), mt = d.useRef(null), Me = d.useRef(null), gt = d.useRef(1), Nn = d.useRef(c), En = d.useRef(0), Ae = d.useRef(/* @__PURE__ */ new Map()), Yt = d.useRef([]), Ye = d.useRef(null);
  vn.current = M, jn.current = P, Xe.current = ne, Nn.current = c;
  const Tn = !!i && gi() && (M.length > 0 || P.length > 0 || ne.some((r) => r.text.trim().length > 0)), Ue = ne.find((r) => r.id === K) ?? null, Ge = h === "highlighter" ? E : w, Yr = h === "highlighter" ? H : b, Qe = d.useCallback(() => {
    u(1), p({ x: 0, y: 0 });
  }, []), xt = d.useCallback(() => {
    for (const r of Ae.current.values()) clearTimeout(r);
    Ae.current.clear();
  }, []), Ut = d.useCallback(() => {
    A([]), _([]), oe([]), V([]), Z(null), Y(null), Dt(/* @__PURE__ */ new Set()), me([]), Yt.current = [], ye(null), Rt(false), ge.current = null, xe.current = null, Xt.current = 0;
    const r = Mn.current, l = qt.current;
    r && l && r.clearRect(0, 0, l.width, l.height), be.current != null && (cancelAnimationFrame(be.current), be.current = null), Ve.current = null, xt();
  }, [xt]), Gt = d.useRef(false);
  d.useEffect(() => {
    if (!o) {
      Gt.current = false;
      return;
    }
    const r = !Gt.current;
    Gt.current = true, r && (Qe(), Ut(), g("pan"), Ht(null), ht(null));
  }, [o, e, Qe, Ut]), d.useEffect(() => {
    var _a2;
    o || (qe(false), xt(), (_a2 = Ye.current) == null ? void 0 : _a2.call(Ye), Ye.current = null);
  }, [o, xt]);
  const De = d.useCallback(() => {
    const r = Wt.current;
    if (!r) return;
    const { bufW: l, bufH: m, cssW: y } = mi(r);
    y < 8 || r.clientHeight < 8 || (gt.current = ai(l, y), Xr({ w: l, h: m }));
  }, []);
  d.useEffect(() => {
    if (!o) return;
    De();
    const r = Wt.current;
    if (!r) return;
    const l = () => De();
    r.addEventListener("load", l);
    const m = typeof ResizeObserver < "u" ? new ResizeObserver(De) : null;
    return m == null ? void 0 : m.observe(r), window.addEventListener("resize", De), () => {
      r.removeEventListener("load", l), m == null ? void 0 : m.disconnect(), window.removeEventListener("resize", De);
    };
  }, [o, e, De]), d.useEffect(() => {
    if (!o) {
      je.current = null, It(false);
      return;
    }
    let r = false;
    const l = pt.current;
    if (!l || !Zs()) {
      It(false);
      return;
    }
    return ei(l).then((m) => {
      r || (je.current = m, It(!!m));
    }), () => {
      r = true, je.current = null;
    };
  }, [o, e, D.w]);
  const Be = d.useCallback((r, l, m) => {
    const y = ft.current;
    if (!y) {
      u(z(r, kt, St));
      return;
    }
    const S = y.getBoundingClientRect(), x = l - S.left - S.width / 2, v = m - S.top - S.height / 2;
    u((B) => {
      const Q = z(r, kt, St), ue = Q / B;
      return p((ae) => ({ x: x - (x - ae.x) * ue, y: v - (v - ae.y) * ue })), Q;
    });
  }, []), Ur = d.useCallback((r) => {
    var _a2;
    if ((_a2 = Ye.current) == null ? void 0 : _a2.call(Ye), Ye.current = null, ft.current = r, !r) return;
    const l = (m) => {
      m.preventDefault(), m.stopPropagation();
      const y = m.deltaY > 0 ? 1 / ze : ze;
      Be(Nn.current * y, m.clientX, m.clientY);
    };
    r.addEventListener("wheel", l, { passive: false, capture: true }), Ye.current = () => {
      r.removeEventListener("wheel", l, true);
    };
  }, [Be]), Gr = d.useCallback((r) => {
    if (r.preventDefault(), r.stopPropagation(), c > 1.05) {
      Qe();
      return;
    }
    Be(wi, r.clientX, r.clientY);
  }, [c, Qe, Be]), Je = d.useCallback((r, l) => {
    const m = pt.current;
    if (!m) return null;
    const y = m.getBoundingClientRect();
    return y.width < 1 || y.height < 1 ? null : { x: (r.clientX - y.left) / y.width * D.w, y: (r.clientY - y.top) / y.height * D.h, pressure: Ni(r, l) };
  }, [D.w, D.h]), Qt = d.useCallback((r) => {
    const l = r === "laser" ? 0.75 : 1, m = r === "highlighter" ? 4 : r === "laser" ? 2 : we;
    if (r === "highlighter") return { w: Math.max(m, N * l), h: Math.max(m, I * l) };
    const y = Math.max(m, N * l);
    return { w: y, h: y };
  }, [N, I]);
  d.useEffect(() => {
    h !== "eraser" && (h === "pen" || h === "pressure" || h === "highlighter" || h === "laser") && (Kt.current = { w: N, h: I });
  }, [h, N, I]);
  const $n = d.useCallback(() => {
    const r = Kt.current;
    T(r.w), R(r.h);
  }, []), Ln = d.useCallback(() => {
    const r = Kt.current, l = Math.max(r.w, r.h), m = Oe(z(l * 5, we, Ce));
    T(m), R(m), g("eraser");
  }, []), re = d.useCallback((r) => {
    if (h === "eraser" && r !== "eraser" && $n(), r === "eraser") {
      Ln();
      return;
    }
    if (r === "highlighter") {
      g("highlighter"), j("solid"), $e("square");
      return;
    }
    g(r);
  }, [h, $n, Ln]), Pn = d.useCallback((r) => {
    var _a2, _b;
    r.preventDefault(), r.stopPropagation(), (_b = (_a2 = r.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, r.pointerId), Me.current = { pointerId: r.pointerId, startX: r.clientX, startY: r.clientY, originX: f.x, originY: f.y };
  }, [f.x, f.y]), An = d.useCallback((r) => {
    const l = Me.current;
    !l || l.pointerId !== r.pointerId || (r.preventDefault(), p({ x: l.originX + (r.clientX - l.startX), y: l.originY + (r.clientY - l.startY) }));
  }, []), Dn = d.useCallback((r) => {
    var _a2, _b;
    const l = Me.current;
    if (!(!l || l.pointerId !== r.pointerId)) {
      Me.current = null;
      try {
        (_b = (_a2 = r.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, r.pointerId);
      } catch {
      }
    }
  }, []), Re = d.useCallback((r) => {
    const l = Ae.current.get(r);
    l && clearTimeout(l);
    const m = setTimeout(() => {
      Dt((S) => {
        const x = new Set(S);
        return x.add(r), x;
      });
      const y = setTimeout(() => {
        Ae.current.delete(r), Dt((S) => {
          const x = new Set(S);
          return x.delete(r), x;
        }), oe((S) => S.filter((x) => x.id !== r));
      }, $r);
      Ae.current.set(r, y);
    }, yi);
    Ae.current.set(r, m);
  }, []), Ne = d.useCallback(() => {
    const r = qt.current, l = Mn.current ?? (r == null ? void 0 : r.getContext("2d"));
    r && l && l.clearRect(0, 0, r.width, r.height), Xt.current = 0;
  }, []), Jt = d.useCallback(() => {
    be.current == null && (be.current = requestAnimationFrame(() => {
      be.current = null;
      const r = ge.current;
      if (!r) {
        ye(null);
        return;
      }
      ye({ ...r, points: r.points.slice() });
    }));
  }, []), Ie = d.useCallback((r, l) => {
    const m = r.nativeEvent, y = typeof m.getCoalescedEvents == "function" ? m.getCoalescedEvents() : [], S = y.length > 0 ? y : [m], x = [];
    for (const v of S) {
      const B = Je(v, l);
      B && x.push(B);
    }
    if (x.length === 0) {
      const v = Je(r, l);
      v && x.push(v);
    }
    return x;
  }, [Je]), Bn = d.useCallback((r) => {
    var _a2, _b;
    if (h !== "pen" && h !== "pressure" && h !== "highlighter" && h !== "laser" && h !== "eraser") return;
    r.preventDefault(), r.stopPropagation();
    const m = Ie(r, h === "pressure"), y = m[m.length - 1];
    if (!y) return;
    (_b = (_a2 = r.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, r.pointerId);
    const S = h === "eraser" ? "eraser" : h === "highlighter" ? "highlighter" : h === "laser" ? "laser" : h === "pressure" ? "pressure" : "pen", x = S === "laser" ? "#ef4444" : S === "highlighter" ? E : S === "eraser" ? "#000000" : w, v = Qt(S), B = z(gt.current, 0.25, 12), Q = Jn(Math.max(0.5, v.w * B), D.w, D.h), ue = Jn(Math.max(0.5, v.h * B), D.w, D.h), ae = S === "eraser" ? 1 : S === "laser" ? 0.9 : S === "highlighter" ? H : b, F = { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, seq: ++En.current, kind: S, color: x, diameterX: Q, diameterY: ue, points: [y], shape: ie, dash: J, opacity: ae, ...S === "highlighter" ? { blend: O } : {} };
    if (ge.current = F, xe.current = { ...y }, Rt(true), Xt.current = 0, ye({ ...F, points: [...F.points] }), Ne(), S === "laser" && Re(F.id), (S === "pen" || S === "pressure") && je.current && r.nativeEvent.isTrusted) try {
      const da = Math.max(v.w, v.h);
      je.current.updateInkTrailStartPoint(r.nativeEvent, { color: w, diameter: Math.max(1, da * (S === "pressure" ? y.pressure : 1)) });
    } catch {
    }
  }, [h, w, E, H, b, O, ie, J, Ie, Qt, Re, Ne, Jt]), Rn = d.useCallback((r) => {
    const l = ge.current;
    if (!l) return;
    r.preventDefault();
    const m = l.kind === "pressure", y = Ie(r, m);
    if (!y.length) return;
    const S = xe.current ?? l.points[l.points.length - 1];
    if (S && (xe.current = li(l.points, S, y), Jt(), l.kind === "laser" && Re(l.id), (l.kind === "pen" || l.kind === "pressure") && je.current && r.nativeEvent.isTrusted)) try {
      const x = xe.current, B = Lt(l) / Math.max(1e-3, gt.current);
      je.current.updateInkTrailStartPoint(r.nativeEvent, { color: l.color, diameter: Math.max(1, B * (l.kind === "pressure" ? (x == null ? void 0 : x.pressure) ?? 1 : 1)) });
    } catch {
    }
  }, [Ie, Jt, Re]), In = d.useCallback((r) => {
    var _a2, _b;
    const l = ge.current;
    if (!l) return;
    const m = l.kind === "pressure", y = Ie(r, m), S = y[y.length - 1];
    if (S && xe.current) {
      const v = Nr(xe.current, S, 1), B = l.points[l.points.length - 1];
      !B || B.x !== v.x || B.y !== v.y ? l.points.push(v) : B.pressure = v.pressure, xe.current = v;
    }
    ge.current = null, xe.current = null, be.current != null && (cancelAnimationFrame(be.current), be.current = null), Rt(false);
    try {
      (_b = (_a2 = r.currentTarget).releasePointerCapture) == null ? void 0 : _b.call(_a2, r.pointerId);
    } catch {
    }
    if (l.points.length === 0) {
      ye(null), Ne();
      return;
    }
    const x = { ...l, points: [...l.points] };
    if (l.kind === "laser") {
      oe((v) => [...v, x]), Re(l.id), ye(null), Ne();
      return;
    }
    if (me([]), l.kind === "highlighter") _((v) => [...v, x]);
    else if (l.kind === "eraser") {
      A((v) => [...v, x]), _((v) => [...v, x]), ye(null), Ne();
      return;
    } else A((v) => [...v, x]);
    ye(null), Ne();
  }, [Ie, Re, Ne]), bt = d.useCallback((r) => {
    K && V((l) => l.map((m) => m.id === K ? { ...m, ...r } : m));
  }, [K]), Hn = d.useCallback((r) => {
    r.preventDefault(), r.stopPropagation();
    const l = Je(r, false);
    if (!l) return;
    const m = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, y = { id: m, seq: ++En.current, x: l.x, y: l.y, text: "", color: w, opacity: b, fontSizePx: pe, fontFamily: ce, fontWeight: te, fontStyle: Le };
    me([]), V((S) => [...S, y]), Z(m), Y(m), window.setTimeout(() => {
      var _a2;
      return (_a2 = mt.current) == null ? void 0 : _a2.focus();
    }, 30);
  }, [Je, w, b, pe, ce, te, Le]), Qr = d.useCallback((r) => {
    if (r.button === 1 || h === "pan") {
      Pn(r);
      return;
    }
    if (h === "text") {
      Y(null), Hn(r);
      return;
    }
    Z(null), Y(null), Bn(r);
  }, [h, Pn, Bn, Hn]), Jr = d.useCallback((r) => {
    if (!ge.current) {
      const m = { x: r.clientX, y: r.clientY }, y = Pe.current;
      y ? (Pe.current = { x: y.x + (m.x - y.x) * 0.72, y: y.y + (m.y - y.y) * 0.72 }, Vt.current == null && (Vt.current = requestAnimationFrame(() => {
        Vt.current = null, Pe.current && ht({ ...Pe.current });
      }))) : (Pe.current = m, ht(m));
    }
    const l = Ve.current;
    if (l && l.pointerId === r.pointerId) {
      r.preventDefault();
      const m = pt.current;
      if (!m) return;
      const y = m.getBoundingClientRect(), S = (r.clientX - l.startClientX) / Math.max(1, y.width) * D.w, x = (r.clientY - l.startClientY) / Math.max(1, y.height) * D.h;
      V((v) => v.map((B) => B.id === l.id ? { ...B, x: l.originX + S, y: l.originY + x } : B));
      return;
    }
    if (Me.current) {
      An(r);
      return;
    }
    ge.current && Rn(r);
  }, [An, Rn, D.w, D.h]), _n = d.useCallback((r) => {
    var _a2, _b, _c;
    if (((_a2 = Ve.current) == null ? void 0 : _a2.pointerId) === r.pointerId) {
      Ve.current = null;
      try {
        (_c = (_b = r.currentTarget).releasePointerCapture) == null ? void 0 : _c.call(_b, r.pointerId);
      } catch {
      }
    }
    Me.current && Dn(r), ge.current && In(r);
  }, [Dn, In]), Ze = d.useCallback(() => {
    var _a2;
    const r = ee ?? K;
    try {
      (_a2 = mt.current) == null ? void 0 : _a2.blur();
    } catch {
    }
    if (r) {
      const l = Xe.current.find((m) => m.id === r);
      l && !l.text.trim() && (V((m) => m.filter((y) => y.id !== r)), Z(null));
    }
    Y(null);
  }, [ee, K]), Zt = d.useCallback(() => {
    const r = K;
    if (!r) return;
    const l = Xe.current.find((m) => m.id === r);
    l && (Yt.current.push({ ...l }), me([]), V((m) => m.filter((y) => y.id !== r)), Z(null), Y(null));
  }, [K]), en = d.useCallback(() => {
    const r = Yt.current.pop();
    if (r) {
      V((F) => [...F, r]), Z(r.id), Y(null);
      return;
    }
    const l = vn.current, m = jn.current, y = Xe.current, S = l[l.length - 1], x = m[m.length - 1], v = y[y.length - 1], B = (S == null ? void 0 : S.seq) ?? -1, Q = (x == null ? void 0 : x.seq) ?? -1, ue = (v == null ? void 0 : v.seq) ?? -1, ae = Math.max(B, Q, ue);
    if (!(ae < 0)) {
      if (ue === ae && v) {
        me((F) => [...F, { layer: "text", text: v }]), V(y.slice(0, -1)), Z((F) => F === v.id ? null : F);
        return;
      }
      if (S && x && S.id === x.id && S.kind === "eraser" && S.seq === ae) {
        me((F) => [...F, { layer: "both", stroke: S }]), A(l.slice(0, -1)), _(m.slice(0, -1));
        return;
      }
      if (B >= Q && S && B === ae) {
        me((F) => [...F, { layer: "ink", stroke: S }]), A(l.slice(0, -1));
        return;
      }
      x && Q === ae && (me((F) => [...F, { layer: "highlight", stroke: x }]), _(m.slice(0, -1)));
    }
  }, []), tn = d.useCallback(() => {
    me((r) => {
      if (!r.length) return r;
      const l = r[r.length - 1];
      return l ? (l.layer === "text" ? V((m) => [...m, l.text]) : l.layer === "both" || l.stroke.kind === "eraser" ? (A((m) => [...m, l.stroke]), _((m) => [...m, l.stroke])) : l.layer === "ink" ? A((m) => [...m, l.stroke]) : _((m) => [...m, l.stroke]), r.slice(0, -1)) : r;
    });
  }, []), nn = d.useCallback((r) => {
    T((l) => nr(l, r)), R((l) => nr(l, r));
  }, []), zn = d.useCallback((r) => {
    var _a2;
    const l = K, m = (l ? (_a2 = Xe.current.find((S) => S.id === l)) == null ? void 0 : _a2.fontSizePx : null) ?? pe, y = Mi(m, r);
    U(y), l && V((S) => S.map((x) => x.id === l ? { ...x, fontSizePx: y } : x));
  }, [K, pe]), Zr = d.useCallback((r) => {
    const l = Oe(z(r, we, Ce));
    T(l), R(l);
  }, []), ea = d.useCallback(() => {
    re("highlighter");
  }, [re]), wt = d.useCallback(async (r) => {
    if (!i || !e || We) return;
    const l = ne.some((m) => m.text.trim().length > 0);
    if (!(M.length === 0 && P.length === 0 && !l)) {
      kn(true), Ht(null);
      try {
        const m = hi(D.w, D.h, M), y = m.getContext("2d");
        y && pi(y, ne, gt.current);
        const S = fi(D.w, D.h, P), x = await ti({ src: e, inkCanvas: m, highlightCanvas: S }), v = new File([x], `annotated-${Date.now()}.png`, { type: "image/png" });
        await i(r, v);
      } catch (m) {
        Ht(m instanceof Error ? m.message : String(m));
      } finally {
        kn(false);
      }
    }
  }, [i, e, We, M, P, ne, D.w, D.h]), rn = M.length + P.length + ne.length, On = rn > 0 || !!G || Bt, yt = d.useCallback(() => {
    if (On) {
      qe(true);
      return;
    }
    qe(false), n();
  }, [On, n]), ta = d.useCallback(() => {
    qe(false), n();
  }, [n]), na = d.useCallback(() => {
    qe(false);
  }, []);
  d.useEffect(() => {
    if (!o) return;
    const r = (l) => {
      var _a2;
      const m = l.target, y = (_a2 = m == null ? void 0 : m.tagName) == null ? void 0 : _a2.toLowerCase(), S = y === "input" || y === "textarea" || (m == null ? void 0 : m.isContentEditable), x = Lr ? l.metaKey : l.ctrlKey, v = l.key.toLowerCase(), B = l.code;
      if (x && v === "s") {
        l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), wt(l.shiftKey ? "saveAs" : "overwrite");
        return;
      }
      if (x && v === "z" && !l.shiftKey) {
        l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), en();
        return;
      }
      if (x && (v === "y" || v === "z" && l.shiftKey)) {
        l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), tn();
        return;
      }
      const Q = !!K || h === "text", ue = x && (l.shiftKey && (l.key === "<" || l.key === "," || B === "Comma") || !l.shiftKey && (l.key === "[" || B === "BracketLeft")), ae = x && (l.shiftKey && (l.key === ">" || l.key === "." || B === "Period") || !l.shiftKey && (l.key === "]" || B === "BracketRight"));
      if (Q && (ue || ae)) {
        l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), zn(ue ? -1 : 1);
        return;
      }
      if (l.key === "Escape") {
        if (Ft) return;
        if (h === "text" || ee) {
          l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), ee ? Ze() : Z(null);
          return;
        }
        l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), yt();
        return;
      }
      if (K && !x && (v === "backspace" || v === "delete")) {
        if (ee && S && y === "textarea" && m.value.length > 0) return;
        l.preventDefault(), l.stopPropagation(), l.stopImmediatePropagation(), Zt();
        return;
      }
      if (!S) {
        if (!x && l.key === "[") {
          l.preventDefault(), l.stopPropagation(), nn(-1);
          return;
        }
        !x && l.key === "]" && (l.preventDefault(), l.stopPropagation(), nn(1));
      }
    };
    return window.addEventListener("keydown", r, true), () => window.removeEventListener("keydown", r, true);
  }, [o, wt, en, tn, nn, zn, K, ee, h, Ze, Zt, yt, Ft]);
  const ra = h !== "pan" && h !== "text" && dt != null && !Me.current && !Bt, Fn = Qt(h === "eraser" ? "eraser" : h === "highlighter" ? "highlighter" : h === "laser" ? "laser" : h === "pressure" ? "pressure" : "pen"), Kn = Math.max(4, Fn.w * c), Wn = Math.max(4, Fn.h * c), aa = M.filter((r) => r.kind === "eraser"), sa = M.filter((r) => r.kind !== "eraser"), ia = P.filter((r) => r.kind === "eraser"), oa = P.filter((r) => r.kind !== "eraser"), la = Bt && h === "highlighter" ? { mixBlendMode: O } : {}, qn = Ja(_e(Ge) || "#111827ff"), ca = "inline-flex h-8 max-w-[7.5rem] items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20", et = "z-100070 overflow-hidden rounded-md border border-white/20 bg-neutral-900 text-white shadow", [tt, ua] = d.useState(null);
  return a.jsxs(a.Fragment, { children: [a.jsx(Ms, { open: o, onOpenChange: (r) => {
    r || yt();
  }, children: a.jsx(an, { children: o ? a.jsxs(Ns, { forceMount: true, children: [a.jsx(Es, { asChild: true, forceMount: true, children: a.jsx(He.div, { className: "fixed inset-0 z-100060 bg-black/85", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: xi }) }), a.jsx(Ts, { asChild: true, forceMount: true, onOpenAutoFocus: (r) => r.preventDefault(), onEscapeKeyDown: (r) => {
    r.preventDefault();
  }, children: a.jsxs(He.div, { ref: ua, className: "fixed inset-0 z-100061 flex flex-col outline-none", "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30", initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: bi, children: [a.jsx($s, { className: "sr-only", children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30" }), a.jsx(Ls, { className: "sr-only", children: "\uBCA1\uD130 \uD39C\uC73C\uB85C \uADF8\uB9AC\uACE0 \uD655\uB300/\uCD95\uC18C\xB7\uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), a.jsx("div", { ref: Ur, className: `relative z-1 flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-3 sm:p-6 ${h === "pan" ? "cursor-grab" : h === "text" ? "cursor-text" : "cursor-none"}`, onPointerDown: Qr, onPointerMove: Jr, onPointerUp: _n, onPointerCancel: _n, onPointerLeave: () => {
    ht(null), Pe.current = null;
  }, children: e ? a.jsx("div", { className: "relative will-change-transform", style: { transform: `translate(${f.x}px, ${f.y}px) scale(${c})`, transformOrigin: "center center" }, onClick: (r) => r.stopPropagation(), children: a.jsxs("div", { ref: pt, className: "relative inline-block max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] overflow-hidden shadow-2xl", style: Ci, children: [a.jsx("img", { ref: Wt, src: e, alt: t || "", className: "block h-auto w-auto max-h-[min(78vh,100%)] max-w-[min(92vw,100%)] object-contain select-none", draggable: false, onDoubleClick: Gr }), a.jsxs("svg", { className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible [&_path]:fill-none", viewBox: `0 0 ${D.w} ${D.h}`, preserveAspectRatio: "none", "aria-hidden": true, children: [a.jsxs("defs", { children: [a.jsxs("mask", { id: "haim-ink-erase-mask", children: [a.jsx("rect", { x: "0", y: "0", width: D.w, height: D.h, fill: "#fff" }), aa.map((r) => a.jsx(de, { stroke: r }, `em-${r.id}`)), (G == null ? void 0 : G.kind) === "eraser" ? a.jsx(de, { stroke: G }) : null] }), a.jsxs("mask", { id: "haim-hi-erase-mask", children: [a.jsx("rect", { x: "0", y: "0", width: D.w, height: D.h, fill: "#fff" }), ia.map((r) => a.jsx(de, { stroke: r }, `hem-${r.id}`)), (G == null ? void 0 : G.kind) === "eraser" ? a.jsx(de, { stroke: G }) : null] })] }), a.jsxs("g", { mask: "url(#haim-ink-erase-mask)", children: [sa.map((r) => a.jsx(de, { stroke: r }, r.id)), G && (G.kind === "pen" || G.kind === "pressure") ? a.jsx(de, { stroke: G }) : null] }), a.jsxs("g", { mask: "url(#haim-hi-erase-mask)", style: { mixBlendMode: O }, children: [oa.map((r) => a.jsx("g", { style: { mixBlendMode: r.blend || O }, children: a.jsx(de, { stroke: r }) }, r.id)), (G == null ? void 0 : G.kind) === "highlighter" ? a.jsx("g", { style: { mixBlendMode: G.blend || O }, children: a.jsx(de, { stroke: G }) }) : null] }), a.jsxs("g", { children: [q.map((r) => a.jsx(de, { stroke: r, fading: Wr.has(r.id) }, r.id)), (G == null ? void 0 : G.kind) === "laser" ? a.jsx(de, { stroke: G }) : null] })] }), a.jsx("canvas", { ref: qt, className: "pointer-events-none absolute inset-0 h-full w-full", width: D.w, height: D.h, style: la, "aria-hidden": true }), ne.map((r) => {
    const l = r.id === K, m = r.id === ee, y = r.x / Math.max(1, D.w) * 100, S = r.y / Math.max(1, D.h) * 100;
    return a.jsx("div", { className: `absolute z-1 min-w-8 max-w-[90%] ${l ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent" : ""}`, style: { left: `${y}%`, top: `${S}%`, color: r.color, opacity: r.opacity, fontFamily: r.fontFamily, fontSize: `${r.fontSizePx}px`, fontWeight: r.fontWeight, fontStyle: r.fontStyle, lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word", cursor: h === "text" || l ? "move" : "default", pointerEvents: h === "text" || l ? "auto" : "none" }, onPointerDown: (x) => {
      var _a2, _b;
      h !== "text" && h !== "pan" || (x.stopPropagation(), x.preventDefault(), re("text"), ee && ee !== r.id && Ze(), Y(null), Z(r.id), le(r.fontFamily), U(r.fontSizePx), ut(r.fontWeight), At(r.fontStyle), Ve.current = { id: r.id, pointerId: x.pointerId, startClientX: x.clientX, startClientY: x.clientY, originX: r.x, originY: r.y }, (_b = (_a2 = x.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a2, x.pointerId));
    }, onDoubleClick: (x) => {
      x.stopPropagation(), x.preventDefault(), re("text"), Z(r.id), Y(r.id), le(r.fontFamily), U(r.fontSizePx), ut(r.fontWeight), At(r.fontStyle), window.setTimeout(() => {
        var _a2;
        return (_a2 = mt.current) == null ? void 0 : _a2.focus();
      }, 20);
    }, children: m ? a.jsx("textarea", { ref: mt, value: r.text, rows: Math.max(1, r.text.split(`
`).length), placeholder: "\uD14D\uC2A4\uD2B8 \uC785\uB825", className: "block w-full min-w-24 resize-none border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-white/40", style: { fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", fontStyle: "inherit", lineHeight: "inherit", color: "inherit", fieldSizing: "content" }, onPointerDown: (x) => x.stopPropagation(), onChange: (x) => {
      const v = x.target.value;
      V((B) => B.map((Q) => Q.id === r.id ? { ...Q, text: v } : Q));
    }, onBlur: () => {
      ee === r.id && Ze();
    }, onKeyDown: (x) => {
      if (x.key === "Escape") {
        x.preventDefault(), x.stopPropagation(), Ze();
        return;
      }
      (x.key === "Backspace" || x.key === "Delete") && x.currentTarget.value.length === 0 && (x.preventDefault(), x.stopPropagation(), Zt());
    } }) : a.jsx("span", { className: "block", children: r.text || "\uD14D\uC2A4\uD2B8" }) }, r.id);
  })] }) }) : null }), ra && dt ? a.jsx("div", { className: "pointer-events-none fixed z-100065 border border-white/80 bg-white/10 shadow", style: { left: dt.x - Kn / 2, top: dt.y - Wn / 2, width: Kn, height: Wn, borderRadius: ie === "circle" ? "9999px" : "2px", borderStyle: J === "dashed" ? "dashed" : "solid", opacity: z(Yr, 0.25, 0.85), backgroundColor: h === "eraser" ? "transparent" : _e(Ge) || void 0 }, "aria-hidden": true }) : null, (h === "text" || Ue) && a.jsxs("aside", { className: "absolute right-3 top-14 z-100062 flex w-64 flex-col gap-3 rounded-xl border border-white/15 bg-black/80 p-3 text-white shadow-xl backdrop-blur-md", onPointerDown: (r) => r.stopPropagation(), children: [a.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/90", children: [a.jsx(Un, { size: 14, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8 \uC2A4\uD0C0\uC77C"] }), a.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [a.jsx("span", { children: "Font family" }), a.jsx(Za, { value: (Ue == null ? void 0 : Ue.fontFamily) ?? ce, onChange: (r) => {
    le(r), bt({ fontFamily: r });
  }, className: "w-full", inputClassName: "!bg-neutral-900 !text-white !border-white/20 !text-xs", allowAddWebfont: true })] }), a.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [a.jsx("span", { children: "Font size" }), a.jsxs("div", { className: "flex items-center gap-1", children: [a.jsx("input", { type: "number", min: un, max: dn, step: 1, value: (Ue == null ? void 0 : Ue.fontSizePx) ?? pe, onChange: (r) => {
    const l = z(Math.round(Number(r.target.value) || 24), un, dn);
    U(l), bt({ fontSizePx: l });
  }, className: "w-full rounded border border-white/20 bg-black/40 px-2 py-1.5 text-right tabular-nums text-white", "aria-label": "Font size (px)" }), a.jsx("span", { className: "shrink-0 text-white/60", children: "px" })] })] }), a.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [a.jsx("span", { children: "Font weight" }), a.jsxs(nt, { value: (Ue == null ? void 0 : Ue.fontWeight) ?? te, onValueChange: (r) => {
    ut(r), bt({ fontWeight: r });
  }, children: [a.jsx(rt, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font weight", children: a.jsx(sn, {}) }), a.jsx(at, { container: tt, children: a.jsx(st, { className: et, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (r) => r.preventDefault(), children: a.jsx(it, { className: "p-1", children: si.map((r) => a.jsx(ke, { value: r.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: a.jsx(Se, { children: r.label }) }, r.value)) }) }) })] })] }), a.jsxs("label", { className: "flex flex-col gap-1 text-[11px] text-white/70", children: [a.jsx("span", { children: "Font style" }), a.jsxs(nt, { value: (Ue == null ? void 0 : Ue.fontStyle) ?? Le, onValueChange: (r) => {
    const l = r === "italic" ? "italic" : "normal";
    At(l), bt({ fontStyle: l });
  }, children: [a.jsx(rt, { className: "inline-flex h-8 w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 text-[11px] text-white", "aria-label": "Font style", children: a.jsx(sn, {}) }), a.jsx(at, { container: tt, children: a.jsx(st, { className: et, position: "popper", side: "bottom", sideOffset: 6, onCloseAutoFocus: (r) => r.preventDefault(), children: a.jsxs(it, { className: "p-1", children: [a.jsx(ke, { value: "normal", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: a.jsx(Se, { children: "Normal" }) }), a.jsx(ke, { value: "italic", className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: a.jsx(Se, { children: "Italic" }) })] }) }) })] })] }), a.jsxs("p", { className: "text-[10px] leading-4 text-white/45", children: ["\uD074\uB9AD\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uCD94\uAC00 \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1 \xB7 \uB4DC\uB798\uADF8 \uC774\uB3D9", a.jsx("br", {}), "Esc \uD3B8\uC9D1 \uC644\uB8CC \xB7 \uC120\uD0DD \uD6C4 Del/Backspace \uC0AD\uC81C \xB7 \uB354\uBE14\uD074\uB9AD \uD3B8\uC9D1", a.jsx("br", {}), he, "+[ ] / ", he, "+Shift+<> \uAE00\uC790 \uD06C\uAE30"] })] }), a.jsx(ot, { delayDuration: 250, skipDelayDuration: 0, children: a.jsxs("div", { className: "relative z-2 flex shrink-0 flex-col items-center gap-2 px-3 pb-4 pt-1", onPointerDown: (r) => r.stopPropagation(), children: [a.jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-black/70 px-2.5 py-2 shadow-lg backdrop-blur-md", children: [a.jsx(X, { label: "\uD328\uB2DD", active: h === "pan", onClick: () => re("pan"), children: a.jsx(ls, { size: 16 }) }), a.jsx(X, { label: "\uC77C\uBC18 \uD39C", active: h === "pen", onClick: () => re("pen"), children: a.jsx(cs, { size: 16 }) }), a.jsx(X, { label: "\uD544\uC555 \uD39C", active: h === "pressure", onClick: () => re("pressure"), children: a.jsx(us, { size: 16 }) }), a.jsx(X, { label: "\uD615\uAD11\uD39C", active: h === "highlighter", onClick: ea, children: a.jsx(ds, { size: 16 }) }), a.jsx(X, { label: "\uB808\uC774\uC800 (4\uCD08 \uD6C4 \uD398\uC774\uB4DC)", active: h === "laser", onClick: () => re("laser"), children: a.jsx(hs, { size: 16 }) }), a.jsx(X, { label: "\uC9C0\uC6B0\uAC1C", active: h === "eraser", onClick: () => re("eraser"), children: a.jsx(fs, { size: 16 }) }), a.jsx(X, { label: "\uD14D\uC2A4\uD2B8", active: h === "text", onClick: () => re("text"), children: a.jsx(Un, { size: 16 }) }), a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), a.jsxs("div", { className: "relative flex items-center", children: [a.jsx("button", { type: "button", "aria-label": "\uD39C \uC0C9\uC0C1", "aria-expanded": Ot, onClick: () => {
    Cn((r) => (r && zt(false), !r));
  }, className: "relative z-1 h-7 w-7 rounded-full border-2 border-white/50 shadow", style: { backgroundColor: _e(Ge) || "#111827" } }), a.jsx(an, { mode: "popLayout", children: Ot ? a.jsxs(He.div, { initial: { opacity: 0, y: 16, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12, scale: 0.9 }, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 }, className: "absolute bottom-full left-1/2 z-2 mb-2 flex -translate-x-1/2 flex-col-reverse items-center gap-1.5 rounded-2xl border border-white/20 bg-neutral-950/95 p-2.5 shadow-2xl backdrop-blur-md", children: [(h === "highlighter" ? Si : ki).map((r, l, m) => {
    const y = (_e(Ge) || "").slice(0, 7).toLowerCase() === r.toLowerCase(), S = 0.03 * (m.length - l);
    return a.jsx(He.button, { type: "button", "aria-label": `\uC0C9\uC0C1 ${r}`, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: S }, onClick: () => {
      zt(false), h === "highlighter" ? k(`${r}ff`) : (C(`${r}ff`), (h === "pan" || h === "eraser" || h === "laser") && re("pen")), Cn(false);
    }, className: `h-7 w-7 rounded-full border-2 shadow ${y ? "border-sky-300 scale-110" : "border-white/40"}`, style: { backgroundColor: r } }, r);
  }), a.jsx(He.button, { type: "button", "aria-label": "\uC0AC\uC6A9\uC790 \uC0C9\uC0C1", "aria-pressed": _t, initial: { opacity: 0, y: 8, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 500, damping: 30, delay: 0 }, onClick: () => zt((r) => !r), className: `h-7 w-7 rounded-full border-2 shadow ${_t ? "border-sky-300 scale-110" : "border-white/50"}`, style: Ei })] }, "haim-color-palette") : null }), a.jsx(an, { children: Ot && _t ? a.jsxs(He.div, { initial: { opacity: 0, x: -6, scale: 0.96 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.96 }, transition: { duration: 0.18, ease: bn }, className: "absolute bottom-0 left-[calc(100%+0.5rem)] z-3 w-56 rounded-xl border border-white/20 bg-neutral-900/95 p-3 shadow-xl backdrop-blur-md", children: [a.jsx("div", { className: "mb-2 h-8 w-full rounded border border-white/20", style: { ...es, backgroundColor: Ge } }), a.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: a.jsx(Ga, { color: qn, onChange: (r) => {
    const l = _e(r.startsWith("#") ? r : `#${r}`);
    l && (h === "highlighter" ? k(l) : (C(l), (h === "pan" || h === "eraser" || h === "laser") && re("pen")));
  } }) }), a.jsx(Qa, { alpha: true, prefixed: true, color: qn, onChange: (r) => {
    const l = _e(r.startsWith("#") ? r : `#${r}`);
    l && (h === "highlighter" ? k(l) : C(l));
  }, className: "mt-2 w-full rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-white" })] }, "haim-color-picker") : null })] }), a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), h === "highlighter" ? a.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [a.jsxs("label", { className: "flex items-center gap-0.5", children: [a.jsx("span", { className: "opacity-70", children: "W" }), a.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" }), a.jsx("input", { type: "number", min: we, max: Ce, step: 0.1, value: N, onChange: (r) => T(Oe(z(Number(r.target.value) || 1, we, Ce))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uAC00\uB85C (px)" })] }), a.jsx("span", { className: "opacity-50", "aria-hidden": true, children: "\xD7" }), a.jsxs("label", { className: "flex items-center gap-0.5", children: [a.jsx("span", { className: "opacity-70", children: "H" }), a.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" }), a.jsx("input", { type: "number", min: we, max: Ce, step: 0.1, value: I, onChange: (r) => R(Oe(z(Number(r.target.value) || 1, we, Ce))), className: "w-12 rounded border border-white/20 bg-black/40 px-1 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uC138\uB85C (px)" })] }), a.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }) : a.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [a.jsx("span", { className: "sr-only", children: "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), a.jsx("input", { type: "number", min: we, max: Ce, step: 0.1, value: N, onChange: (r) => Zr(Number(r.target.value) || 1), className: "w-14 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uBE0C\uB7EC\uC2DC \uD06C\uAE30 (px)" }), a.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "px" })] }), a.jsxs("label", { className: "flex items-center gap-1 text-[11px] text-white/80", children: [a.jsx("span", { className: "opacity-70", children: "\uD750\uB984" }), a.jsx("input", { type: "number", min: 5, max: 100, step: 5, value: Math.round((h === "highlighter" ? H : b) * 100), onChange: (r) => {
    const m = z(Number(r.target.value) || 5, 5, 100) / 100;
    h === "highlighter" ? L(m) : $(m);
  }, className: "w-12 rounded border border-white/20 bg-black/40 px-1.5 py-1 text-right tabular-nums text-white", "aria-label": "\uD750\uB984 (%)" }), a.jsx("span", { className: "tabular-nums text-white/60", "aria-hidden": true, children: "%" })] }), a.jsxs(nt, { value: ie, onValueChange: (r) => $e(r), children: [a.jsx(rt, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": ie === "circle" ? "\uC6D0" : "\uB124\uBAA8", children: ie === "circle" ? a.jsx(Gn, { size: 16 }) : a.jsx(Qn, { size: 16 }) }), a.jsx(at, { container: tt, children: a.jsx(st, { className: et, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (r) => r.preventDefault(), children: a.jsxs(it, { className: "p-1", children: [a.jsxs(ke, { value: "circle", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uC6D0", children: [a.jsx(Gn, { size: 16 }), a.jsx(Se, { className: "sr-only", children: "\uC6D0" })] }), a.jsxs(ke, { value: "square", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "\uB124\uBAA8", children: [a.jsx(Qn, { size: 16 }), a.jsx(Se, { className: "sr-only", children: "\uB124\uBAA8" })] })] }) }) })] }), a.jsxs(nt, { value: J, onValueChange: (r) => j(r), children: [a.jsx(rt, { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white hover:bg-white/20", "aria-label": J === "dashed" ? "Dashed" : "Solid", children: J === "dashed" ? a.jsx(sr, { size: 16 }) : a.jsx(ar, { size: 16 }) }), a.jsx(at, { container: tt, children: a.jsx(st, { className: et, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (r) => r.preventDefault(), children: a.jsxs(it, { className: "p-1", children: [a.jsxs(ke, { value: "solid", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Solid", children: [a.jsx(ar, { size: 16 }), a.jsx(Se, { className: "sr-only", children: "Solid" })] }), a.jsxs(ke, { value: "dashed", className: "flex cursor-pointer items-center justify-center rounded px-2 py-1.5 outline-none data-highlighted:bg-white/15", "aria-label": "Dashed", children: [a.jsx(sr, { size: 16 }), a.jsx(Se, { className: "sr-only", children: "Dashed" })] })] }) }) })] }), h === "highlighter" ? a.jsxs(nt, { value: O, onValueChange: (r) => W(r), children: [a.jsx(rt, { className: ca, "aria-label": "\uD615\uAD11\uD39C \uBE14\uB80C\uB4DC", children: a.jsx(sn, { placeholder: "Blend" }) }), a.jsx(at, { container: tt, children: a.jsx(st, { className: `${et} max-h-56 overflow-auto`, position: "popper", side: "top", sideOffset: 6, onCloseAutoFocus: (r) => r.preventDefault(), children: a.jsx(it, { className: "p-1", children: ii.map((r) => a.jsx(ke, { value: r.value, className: "cursor-pointer rounded px-2 py-1.5 text-xs outline-none data-highlighted:bg-white/15", children: a.jsx(Se, { children: r.label }) }, r.value)) }) }) })] }) : null, a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), a.jsx(X, { label: `\uC2E4\uD589 \uCDE8\uC18C (${he}+Z)`, disabled: rn === 0, onClick: en, children: a.jsx(ps, { size: 16 }) }), a.jsx(X, { label: `\uB2E4\uC2DC \uC2E4\uD589 (${rr})`, disabled: qr.length === 0, onClick: tn, children: a.jsx(ms, { size: 16 }) }), a.jsx(X, { label: "\uADF8\uB9BC \uC9C0\uC6B0\uAE30", disabled: rn === 0 && q.length === 0, onClick: Ut, children: a.jsx(gs, { size: 16 }) }), a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), a.jsx(X, { label: "\uCD95\uC18C", onClick: () => {
    var _a2;
    const r = (_a2 = ft.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!r) {
      u((l) => z(l / ze, kt, St));
      return;
    }
    Be(c / ze, r.left + r.width / 2, r.top + r.height / 2);
  }, children: a.jsx(xs, { size: 16 }) }), a.jsxs("span", { className: "min-w-10 text-center text-[11px] tabular-nums text-white/80", children: [Math.round(c * 100), "%"] }), a.jsx(X, { label: "\uD655\uB300", onClick: () => {
    var _a2;
    const r = (_a2 = ft.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!r) {
      u((l) => z(l * ze, kt, St));
      return;
    }
    Be(c * ze, r.left + r.width / 2, r.top + r.height / 2);
  }, children: a.jsx(bs, { size: 16 }) }), a.jsx(X, { label: "\uBCF4\uAE30 \uCD08\uAE30\uD654", onClick: Qe, children: a.jsx(ws, { size: 16 }) }), a.jsx("span", { className: "mx-0.5 h-5 w-px bg-white/20", "aria-hidden": true }), a.jsx(X, { label: `\uB36E\uC5B4\uC4F0\uAE30 \uC800\uC7A5 (${he}+S)`, tone: "save", disabled: !Tn || We, onClick: () => {
    wt("overwrite");
  }, children: a.jsx(ys, { size: 16 }) }), a.jsx(X, { label: `\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5 (${he}+Shift+S)`, tone: "saveAs", disabled: !Tn || We, onClick: () => {
    wt("saveAs");
  }, children: a.jsx(ks, { size: 16 }) })] }), a.jsxs("p", { className: "max-w-xl text-center text-[10px] text-white/55", children: ["\uD720 \uC90C \xB7 [ ] \uD39C \uD06C\uAE30 \xB7 ", he, "+[ ] / ", he, "+Shift+<> \uAE00\uC790 \uD06C\uAE30 \xB7 ", he, "+Z / ", rr, Vr ? " \xB7 Ink API" : "", We ? " \xB7 \uC800\uC7A5 \uC911\u2026" : ""] }), Sn ? a.jsx("p", { className: "max-w-xl text-center text-[10px] text-red-300", children: Sn }) : null] }) }), a.jsx("button", { type: "button", className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80", "aria-label": "\uB2EB\uAE30", onClick: yt, children: a.jsx(Ss, { size: 20 }) })] }) })] }, "haim-image-lightbox") : null }) }), a.jsx(ts, { isOpen: Ft, title: "\uADF8\uB9B0 \uB0B4\uC6A9 \uBC84\uB9AC\uAE30", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uADF8\uB9AC\uAE30\xB7\uD558\uC774\uB77C\uC774\uD2B8\xB7\uD14D\uC2A4\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2EB\uC73C\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uBC84\uB9AC\uACE0 \uB2EB\uAE30", cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1", variant: "danger", overlayClassName: "z-100070", onConfirm: ta, onCancel: na })] });
}
function Ti({ node: e, selected: t, editor: s, getPos: n, updateAttributes: i }) {
  const o = String(e.attrs.src || ""), c = String(e.attrs.alt || ""), u = String(e.attrs.title || ""), f = s.isEditable, [p, h] = d.useState(false), [g, w] = d.useState(null), C = d.useCallback((N) => {
    if (N.detail > 1) return;
    N.preventDefault(), N.stopPropagation();
    const T = typeof n == "function" ? n() : null;
    typeof T == "number" && s.chain().focus().setNodeSelection(T).run();
  }, [s, n]), E = d.useCallback((N) => {
    N.preventDefault(), N.stopPropagation(), o && (w(o), h(true));
  }, [o]), k = d.useCallback(async (N, T) => {
    if (!f) return;
    const I = await Tr(T), R = typeof n == "function" ? n() : null, b = URL.createObjectURL(T);
    if (N === "overwrite") {
      typeof R == "number" ? s.chain().focus().deleteRange({ from: R, to: R + e.nodeSize }).insertContentAt(R, { type: "wikiImage", attrs: { path: I, options: "", alt: I, width: null, height: null, background: null } }).run() : i({ src: b }), w(b);
      return;
    }
    if (typeof R != "number") return;
    const $ = R + e.nodeSize;
    s.chain().focus().insertContentAt($, { type: "wikiImage", attrs: { path: I, options: "", alt: I, width: null, height: null, background: null } }).run();
  }, [f, s, n, i, e.nodeSize]);
  return a.jsxs(fe, { as: "span", className: `haim-stock-image-wrap${t ? " is-selected" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: C, onDoubleClick: E, children: [a.jsx("img", { src: o, alt: c, ...u ? { title: u } : {}, className: "haim-stock-image max-w-full h-auto cursor-pointer", draggable: false }), a.jsx(Pr, { src: g || o || null, alt: c, open: p, onClose: () => {
    h(false), w(null);
  }, ...f ? { onSaveAnnotated: k } : {} })] });
}
const ir = "haim-mod-held";
function $i(e, t) {
  let s = null;
  if (t.target instanceof HTMLAnchorElement) s = t.target;
  else {
    const n = t.target;
    if (!n) return null;
    s = n.closest("a");
  }
  return !s || !e.view.dom.contains(s) ? null : s;
}
function Li(e, t) {
  const s = (t.getAttribute("target") || t.target || "_blank").trim(), n = !s || s === "_self" ? "_blank" : s;
  window.open(e, n, "noopener,noreferrer");
}
function Pi() {
  return new lt({ key: new ct("haimLinkModCursor"), view(e) {
    const t = (u) => {
      e.dom.classList.toggle(ir, u);
    }, s = (u) => {
      t(!!(u.ctrlKey || u.metaKey));
    }, n = (u) => {
      (u.key === "Control" || u.key === "Meta" || u.ctrlKey || u.metaKey) && t(true);
    }, i = (u) => {
      s(u);
    }, o = () => t(false), c = (u) => {
      s(u);
    };
    return window.addEventListener("keydown", n, true), window.addEventListener("keyup", i, true), window.addEventListener("blur", o), e.dom.addEventListener("mousemove", c), { destroy() {
      window.removeEventListener("keydown", n, true), window.removeEventListener("keyup", i, true), window.removeEventListener("blur", o), e.dom.removeEventListener("mousemove", c), e.dom.classList.remove(ir);
    } };
  } });
}
function Ai(e, t, s, n) {
  if (n.button !== 0 || !s.editable) return false;
  const i = $i(e, n);
  if (!i) return false;
  const o = ns();
  if (!(n.metaKey || n.ctrlKey) && !o) return false;
  const u = fa(s.state, t.name), f = (i.href || u.href || "").trim();
  return f ? (n.preventDefault(), Li(f, i), true) : false;
}
function Di(e, t) {
  return new lt({ key: new ct("haimLinkClick"), props: { handleDOMEvents: { click: (s, n) => Ai(e, t, s, n) } } });
}
const Bi = ha.extend({ addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], Pi(), Di(this.editor, this.type)];
} }).configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } });
function or(e) {
  if (!e || typeof e != "object") return;
  const t = e;
  t.__haimRawTextPatched || (t.encodeTextForMarkdown = (s) => s, t.escapeMarkdownSyntax = (s) => s, t.__haimRawTextPatched = true);
}
const Ri = pa.extend({ onBeforeCreate(e) {
  var _a2, _b, _c;
  (_a2 = this.parent) == null ? void 0 : _a2.call(this, e);
  const t = (_b = this.storage) == null ? void 0 : _b.manager;
  t && or(t), ((_c = this.editor) == null ? void 0 : _c.markdown) && or(this.editor.markdown);
} }), Ii = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i, Hi = ve.create({ name: "pageBreak", group: "block", atom: true, selectable: true, draggable: true, parseHTML() {
  return [{ tag: "pgbr" }, { tag: "div[data-haim-pgbr]" }, { tag: "div.md-pgbr" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", Te(e, { "data-haim-pgbr": "1", "data-md-pgbr": "1", class: "haim-pgbr md-pgbr" })];
}, markdownTokenizer: { name: "pageBreak", level: "block", start: (e) => {
  const t = /<pgbr\s*\/?\s*>/i.exec(e);
  return t ? t.index : -1;
}, tokenize: (e) => {
  const t = Ii.exec(e);
  if (t) return { type: "pageBreak", raw: t[0] };
} }, parseMarkdown: (e, t) => t.createNode("pageBreak"), renderMarkdown: () => `<pgbr/>

`, addCommands() {
  return { setPageBreak: () => ({ chain: e, state: t }) => {
    const s = t.schema.nodes[this.name];
    if (!s || !ma(t, s)) return false;
    const { selection: n } = t, { $to: i } = n, o = e();
    return ga(n) ? o.insertContentAt(i.pos, { type: this.name }) : o.insertContent({ type: this.name }), o.command(({ state: c, tr: u, dispatch: f }) => {
      var _a2;
      if (f) {
        const { $to: p } = u.selection, h = p.end();
        if (p.nodeAfter) p.nodeAfter.isTextblock ? u.setSelection(se.create(u.doc, p.pos + 1)) : p.nodeAfter.isBlock ? u.setSelection(xa.create(u.doc, p.pos)) : u.setSelection(se.create(u.doc, p.pos));
        else {
          const w = (_a2 = c.schema.nodes.paragraph || p.parent.type.contentMatch.defaultType) == null ? void 0 : _a2.create();
          w && (u.insert(h, w), u.setSelection(se.create(u.doc, h + 1)));
        }
        u.scrollIntoView();
      }
      return true;
    }).run();
  } };
} }), wn = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", _i = ["nw", "ne", "sw", "se"];
function lr(e) {
  if (!e) return;
  const t = {};
  for (const s of e.split(";")) {
    const n = s.trim();
    if (!n) continue;
    const i = n.indexOf(":");
    if (i < 0) continue;
    const o = n.slice(0, i).trim(), c = n.slice(i + 1).trim(), u = o.replace(/-([a-z])/g, (f, p) => p.toUpperCase());
    t[u] = c;
  }
  return t;
}
function cr(e, t, s, n) {
  const i = xn({ path: e, width: t, height: s, background: n }), o = i.indexOf("|");
  if (o < 0) return "";
  const c = i.lastIndexOf("]]");
  return i.slice(o + 1, c >= 0 ? c : void 0).trim();
}
function Ct(e) {
  return `${Math.max(24, Math.round(e))}px`;
}
function zi(e) {
  return e ? e.closest(".overflow-auto") || e.parentElement : null;
}
function Oi({ node: e, selected: t, editor: s, getPos: n, updateAttributes: i }) {
  var _a2, _b;
  const o = String(e.attrs.path || ""), c = String(e.attrs.options || ""), u = String(e.attrs.alt || o), f = e.attrs.width || null, p = e.attrs.height || null, h = e.attrs.background || null, g = s.isEditable, w = d.useRef(null), C = d.useRef(null), [E, k] = d.useState(false), [N, T] = d.useState(false), [I, R] = d.useState(null), [b, $] = d.useState(null);
  C.current = b;
  const H = d.useMemo(() => b ? { ...lr(vt({ width: null, height: null, background: h })), width: `${b.width}px`, height: `${b.height}px` } : lr(vt({ width: f, height: p, background: h })), [f, p, h, b]), L = d.useCallback((j, M) => {
    const A = { width: j, height: M, options: cr(o, j, M, h) }, P = zi(s.view.dom), _ = (P == null ? void 0 : P.scrollTop) ?? null, q = typeof n == "function" ? n() : null;
    if (typeof q == "number") {
      const ne = s.state.tr.setNodeMarkup(q, void 0, { ...e.attrs, ...A });
      s.view.dispatch(ne);
    } else i(A);
    const oe = () => {
      P && _ != null && (P.scrollTop = _);
    };
    oe(), requestAnimationFrame(oe), requestAnimationFrame(() => requestAnimationFrame(oe));
  }, [s, n, i, o, h, e.attrs]), O = d.useCallback(() => {
    const j = C.current;
    j && (L(Ct(j.width), Ct(j.height)), $(null), C.current = null);
    const M = typeof n == "function" ? n() : null;
    if (typeof M == "number") {
      const A = M + (e.nodeSize || 1);
      s.commands.setTextSelection(A);
    }
    s.commands.blur();
  }, [L, s, n, e.nodeSize]), W = d.useCallback((j, M) => {
    var _a3, _b2;
    if (!g) return;
    M.preventDefault(), M.stopPropagation();
    const A = w.current;
    if (!A) return;
    const P = A.getBoundingClientRect(), _ = P.width, q = P.height, oe = M.clientX, ne = M.clientY, V = q > 0 ? _ / q : 1, K = M.pointerId;
    (_b2 = (_a3 = M.target).setPointerCapture) == null ? void 0 : _b2.call(_a3, K);
    const Z = { width: _, height: q };
    C.current = Z, $(Z);
    const ee = (ce) => {
      const le = ce.clientX - oe, pe = ce.clientY - ne;
      let U = _, te = q;
      j.includes("e") && (U = _ + le), j.includes("w") && (U = _ - le), j.includes("s") && (te = q + pe), j.includes("n") && (te = q - pe), U = Math.max(24, U), te = Math.max(24, te), (ce.shiftKey || ce.pointerType === "touch") && (Math.abs(le) >= Math.abs(pe) ? te = U / V : U = te * V, U = Math.max(24, U), te = Math.max(24, te));
      const Le = { width: U, height: te };
      C.current = Le, $(Le);
    }, Y = (ce) => {
      var _a4, _b3;
      window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", Y);
      try {
        (_b3 = (_a4 = ce.target).releasePointerCapture) == null ? void 0 : _b3.call(_a4, K);
      } catch {
      }
      const le = C.current;
      le && L(Ct(le.width), Ct(le.height)), C.current = null, $(null);
    };
    window.addEventListener("pointermove", ee), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", Y);
  }, [g, L]);
  d.useEffect(() => {
    if (!t || !g || E || N) return;
    const j = (M) => {
      if (M.key !== "Enter") return;
      const A = M.target;
      A instanceof HTMLInputElement || A instanceof HTMLTextAreaElement || A instanceof HTMLElement && A.isContentEditable || (M.preventDefault(), M.stopPropagation(), O());
    };
    return document.addEventListener("keydown", j, true), () => document.removeEventListener("keydown", j, true);
  }, [t, g, E, N, O]);
  const ie = d.useCallback((j) => {
    if (j.detail > 1 || j.target instanceof Element && j.target.closest("[data-resize-handle]")) return;
    j.preventDefault(), j.stopPropagation();
    const M = typeof n == "function" ? n() : null;
    typeof M == "number" && s.chain().focus().setNodeSelection(M).run();
  }, [s, n]), $e = d.useCallback((j) => {
    j.preventDefault(), j.stopPropagation();
    const M = w.current, A = (M == null ? void 0 : M.currentSrc) || (M == null ? void 0 : M.src) || "";
    A && (R(A), T(true));
  }, []), J = d.useCallback(async (j, M) => {
    if (!g) return;
    const A = await Tr(M), P = typeof n == "function" ? n() : null;
    if (j === "overwrite") {
      const q = { path: A, alt: A, options: cr(A, f, p, h) };
      typeof P == "number" ? s.view.dispatch(s.state.tr.setNodeMarkup(P, void 0, { ...e.attrs, ...q })) : i(q);
      const oe = URL.createObjectURL(M);
      R(oe);
      return;
    }
    if (typeof P != "number") return;
    const _ = P + e.nodeSize;
    s.chain().focus().insertContentAt(_, { type: "wikiImage", attrs: { path: A, options: "", alt: A, width: null, height: null, background: null } }).run();
  }, [g, s, n, i, f, p, h, e.attrs, e.nodeSize]);
  return a.jsxs(fe, { as: "div", className: `haim-wiki-image-wrap${t ? " is-selected" : ""}${b ? " is-resizing" : ""}`, "data-drag-handle": true, style: { width: "100%", maxWidth: "100%" }, onClick: ie, onDoubleClick: $e, onContextMenu: (j) => {
    g && (j.preventDefault(), j.stopPropagation(), k(true));
  }, children: [a.jsxs("div", { className: "haim-wiki-image-frame", children: [a.jsx("img", { ref: w, src: wn, alt: u, className: "haim-wiki-image", "data-wiki-path": o, ...c ? { "data-wiki-options": c } : {}, ...f ? { "data-wiki-width": f } : {}, ...p ? { "data-wiki-height": p } : {}, ...h ? { "data-wiki-bg": h } : {}, style: H, draggable: false }), t && g ? _i.map((j) => a.jsx("button", { type: "button", className: `haim-wiki-image-resize-handle haim-wiki-image-resize-handle--${j}`, "aria-label": `resize-${j}`, "data-resize-handle": j, onPointerDown: (M) => W(j, M) }, j)) : null] }), a.jsx(Rs, { isOpen: E, onClose: () => k(false), path: o, kind: "wiki", initialWidth: f ?? "", initialHeight: p ?? "", imageSrc: ((_a2 = w.current) == null ? void 0 : _a2.currentSrc) || ((_b = w.current) == null ? void 0 : _b.src) || "", onApply: ({ width: j, height: M }) => {
    L(j, M), k(false);
  } }), a.jsx(Pr, { src: I, alt: u, open: N, onClose: () => {
    T(false), R(null);
  }, ...g ? { onSaveAnnotated: J } : {} })] });
}
function Ar(e, t, s = "") {
  const n = t ? rs(t) : null;
  return { path: e, options: t || "", alt: s || e, width: (n == null ? void 0 : n.width) ?? null, height: (n == null ? void 0 : n.height) ?? null, background: (n == null ? void 0 : n.background) ?? null };
}
const Fi = ve.create({ name: "wikiImage", group: "block", atom: true, selectable: true, draggable: true, addAttributes() {
  return { path: { default: "" }, options: { default: "" }, alt: { default: "" }, width: { default: null }, height: { default: null }, background: { default: null } };
}, parseHTML() {
  return [{ tag: "img[data-wiki-path]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const s = e.getAttribute("data-wiki-width"), n = e.getAttribute("data-wiki-height"), i = e.getAttribute("data-wiki-bg"), o = e.getAttribute("data-wiki-options") || [s ? `w=${s}` : "", n ? `h=${n}` : "", i ? `bg=${i}` : ""].filter(Boolean).join(" ");
    return { path: t, options: o, alt: e.getAttribute("alt") || t, width: s || null, height: n || null, background: i || null };
  } }, { tag: "div[data-haim-wiki-image]", priority: 60, getAttrs: (e) => {
    if (!(e instanceof HTMLElement)) return false;
    const t = e.getAttribute("data-wiki-path") || "";
    if (!t) return false;
    const s = e.getAttribute("data-wiki-options") || "";
    return Ar(t, s, e.getAttribute("data-wiki-alt") || t);
  } }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  const s = String(e.attrs.path || ""), n = String(e.attrs.options || ""), i = String(e.attrs.alt || s), o = e.attrs.width || null, c = e.attrs.height || null, u = e.attrs.background || null, f = vt({ width: o, height: c, background: u });
  return ["img", Te(t, { src: wn, alt: i, "data-wiki-path": s, ...n ? { "data-wiki-options": n } : {}, ...o ? { "data-wiki-width": o } : {}, ...c ? { "data-wiki-height": c } : {}, ...u ? { "data-wiki-bg": u } : {}, ...f ? { style: f } : {}, class: "haim-wiki-image" })];
}, addNodeView() {
  return Ke(Oi);
}, renderMarkdown: (e) => {
  var _a2, _b, _c, _d, _e2;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.path) || "");
  if (!t) return "";
  const s = ((_b = e.attrs) == null ? void 0 : _b.width) || null, n = ((_c = e.attrs) == null ? void 0 : _c.height) || null, i = ((_d = e.attrs) == null ? void 0 : _d.background) || null;
  if (s || n || i) return `${xn({ path: t, width: s, height: n, background: i })}

`;
  const o = String(((_e2 = e.attrs) == null ? void 0 : _e2.options) || "");
  return o ? `![[${t}|${o}]]

` : `![[${t}]]

`;
} });
function xl(e, t = "", s = "") {
  const n = Ar(e, t, s), i = vt({ width: n.width, height: n.height, background: n.background }), o = [`src="${wn}"`, `alt="${Ee(n.alt)}"`, `data-wiki-path="${Ee(n.path)}"`, 'class="haim-wiki-image"'];
  return n.options && o.push(`data-wiki-options="${Ee(n.options)}"`), n.width && o.push(`data-wiki-width="${Ee(n.width)}"`), n.height && o.push(`data-wiki-height="${Ee(n.height)}"`), n.background && o.push(`data-wiki-bg="${Ee(n.background)}"`), i && o.push(`style="${Ee(i)}"`), `<img ${o.join(" ")} />`;
}
function Ee(e) {
  return String(e || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
const Ki = ve.create({ name: "wikiFigure", group: "block", content: "wikiImage figcaption", defining: true, isolating: true, parseHTML() {
  return [{ tag: "figure[data-haim-wiki-figure]" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figure", Te(e, { "data-haim-wiki-figure": "1", class: "haim-wiki-figure" }), 0];
}, renderMarkdown: (e, t) => {
  const s = Array.isArray(e.content) ? e.content : [], n = s.find((u) => u.type === "wikiImage"), i = s.find((u) => u.type === "figcaption");
  let o = "";
  if (n == null ? void 0 : n.attrs) {
    const u = String(n.attrs.path || "");
    if (u) {
      const f = n.attrs.width || null, p = n.attrs.height || null, h = n.attrs.background || null;
      if (f || p || h) o = xn({ path: u, width: f, height: p, background: h });
      else {
        const g = String(n.attrs.options || "");
        o = g ? `![[${u}|${g}]]` : `![[${u}]]`;
      }
    }
  }
  const c = i ? String(t.renderChildren(i.content || []) || "").trim() : "";
  return o ? c ? `${o}
${c}

` : `${o}

` : c ? `${c}

` : "";
} }), Wi = ve.create({ name: "figcaption", content: "inline*", defining: true, selectable: false, parseHTML() {
  return [{ tag: "figcaption" }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["figcaption", Te(e), 0];
}, renderMarkdown: (e, t) => t.renderChildren(e.content || []) }), qi = ve.create({ name: "noteCover", group: "block", atom: true, selectable: true, draggable: false, parseHTML() {
  return [{ tag: "div[data-note-cover-placeholder]", priority: 60 }];
}, renderHTML({ HTMLAttributes: e }) {
  return ["div", Te(e, { class: "md-note-cover-placeholder md-note-cover-placeholder--pending", "data-note-cover-placeholder": "1", role: "button", tabindex: "0", title: "\uD45C\uC9C0 \uD3B8\uC9D1\uC73C\uB85C \uC774\uB3D9" }), ["div", { class: "md-note-cover-placeholder__mount", "data-note-cover-mount": "1" }], ["span", { class: "md-note-cover-placeholder__fallback" }, ["span", { class: "md-note-cover-placeholder__spinner", "aria-hidden": "true" }], ["span", { class: "md-note-cover-placeholder__fallback-text" }, "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"]]];
}, renderMarkdown: () => "" });
function bl() {
  return `${Is()}

`;
}
function Xi(e) {
  const t = getComputedStyle(e), s = t.lineHeight;
  if (s && s !== "normal") {
    const i = Number.parseFloat(s);
    if (Number.isFinite(i) && i > 0) return i;
  }
  const n = Number.parseFloat(t.fontSize);
  return Number.isFinite(n) && n > 0 ? n * 1.55 : 20;
}
function Dr(e) {
  const t = Xi(e);
  try {
    const s = getComputedStyle(e), n = document.createElement("div");
    n.setAttribute("aria-hidden", "true"), n.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", "width:auto", `font:${s.font}`, `font-size:${s.fontSize}`, `font-family:${s.fontFamily}`, `font-weight:${s.fontWeight}`, `font-style:${s.fontStyle}`, `letter-spacing:${s.letterSpacing}`, `line-height:${s.lineHeight}`, "white-space:pre", "padding:0", "margin:0", "border:0"].join(";"), n.textContent = "M", document.body.appendChild(n);
    const i = n.getBoundingClientRect().height || n.offsetHeight;
    if (n.remove(), i > 0) return i;
  } catch {
  }
  return t;
}
function Vi(e) {
  const t = getComputedStyle(e).tabSize || getComputedStyle(e).getPropertyValue("tab-size"), s = Number.parseFloat(t);
  return Number.isFinite(s) && s > 0 ? s : 4;
}
function Br(e) {
  const t = e.closest("pre");
  if (t) {
    const s = getComputedStyle(t), n = (Number.parseFloat(s.paddingLeft) || 0) + (Number.parseFloat(s.paddingRight) || 0), i = t.clientWidth - n;
    if (i > 0) return i;
  }
  return e.clientWidth;
}
function Yi(e) {
  return e.classList.contains("ProseMirror-trailingBreak");
}
function Rr(e) {
  return Array.from(e.querySelectorAll("br")).filter((t) => !Yi(t));
}
function Ui(e) {
  return Math.max(1, Rr(e).length + 1);
}
function Gi(e, t) {
  const s = gr(t);
  return e ? Math.max(s, Ui(e)) : s;
}
function Qi(e, t) {
  const s = Array.from(e.getClientRects()).filter((c) => c.height > 0 || c.width > 0);
  if (s.length === 0) return t;
  let n = 1 / 0, i = -1 / 0;
  for (const c of s) n = Math.min(n, c.top), i = Math.max(i, c.bottom);
  const o = i - n;
  return o > 0.5 ? o : t;
}
function Ji(e, t, s, n) {
  if (n === 0) {
    e.selectNodeContents(t), s[0] && e.setEndBefore(s[0]);
    return;
  }
  const i = s[n - 1];
  if (!i) {
    e.selectNodeContents(t), e.collapse(false);
    return;
  }
  e.setStartAfter(i);
  const o = s[n];
  o ? e.setEndBefore(o) : e.setEnd(t, t.childNodes.length);
}
function Zi(e, t, s, n) {
  const i = s > 0 ? t[s - 1] : null, o = t[s] ?? null;
  if (i && o) {
    const c = o.getBoundingClientRect().top - i.getBoundingClientRect().top;
    if (c > 0.5) return c;
  }
  if (!i && o) {
    const c = e.getBoundingClientRect().top, u = o.getBoundingClientRect().top - c;
    if (u > 0.5) return u;
  }
  if (i && !o) {
    const c = e.getBoundingClientRect().bottom - i.getBoundingClientRect().top;
    if (c > 0.5) return c;
  }
  return n;
}
function eo(e, t, s) {
  const n = Rr(e);
  if (n.length === 0 && t > 1) return null;
  const i = [], o = document.createRange();
  try {
    for (let c = 0; c < t; c += 1) if (Ji(o, e, n, c), o.collapsed) i.push(Zi(e, n, c, s));
    else {
      const u = Qi(o, s);
      i.push(Math.max(u, s * 0.95));
    }
  } catch {
    return null;
  }
  return i.length === t ? i : null;
}
function to(e, t, s, n) {
  const i = Br(e);
  if (i <= 0) return Array.from({ length: s }, () => n);
  const c = Hs(t, _s(e), i, Vi(e)).map((u) => Math.max(1, u) * n);
  for (; c.length < s; ) c.push(n);
  return c.slice(0, s);
}
function no(e, t, s, n) {
  const i = Br(e);
  if (i <= 0) return Array.from({ length: s }, () => n);
  const o = t.length === 0 ? [""] : String(t).split(`
`);
  for (; o.length < s; ) o.push("");
  o.length > s && (o.length = s);
  const c = getComputedStyle(e), u = c.whiteSpace === "pre" || c.whiteSpace === "nowrap" ? "pre-wrap" : c.whiteSpace || "pre-wrap", f = document.createElement("div");
  f.setAttribute("aria-hidden", "true"), f.style.cssText = ["position:absolute", "visibility:hidden", "pointer-events:none", "left:0", "top:0", `width:${i}px`, `font:${c.font}`, `font-size:${c.fontSize}`, `font-family:${c.fontFamily}`, `font-weight:${c.fontWeight}`, `font-style:${c.fontStyle}`, `letter-spacing:${c.letterSpacing}`, `line-height:${c.lineHeight}`, `white-space:${u}`, `overflow-wrap:${c.overflowWrap || "break-word"}`, `word-break:${c.wordBreak || "normal"}`, `tab-size:${c.tabSize || 4}`, "box-sizing:border-box", "padding:0", "margin:0", "border:0"].join(";");
  for (const h of o) {
    const g = document.createElement("div");
    g.style.whiteSpace = u, g.style.overflowWrap = c.overflowWrap || "break-word", g.style.wordBreak = c.wordBreak || "normal", g.style.lineHeight = c.lineHeight, g.textContent = h.length > 0 ? h : "\xA0", f.appendChild(g);
  }
  document.body.appendChild(f);
  const p = [];
  for (let h = 0; h < s; h += 1) {
    const g = f.children[h], w = (g == null ? void 0 : g.getBoundingClientRect().height) || (g == null ? void 0 : g.offsetHeight) || 0;
    p.push(w > 0 ? w : n);
  }
  return f.remove(), p;
}
function ro(e, t, s) {
  if (s <= 0) return [];
  const n = Dr(e), i = eo(e, s, n);
  return i ? i.map((o) => o > 0 ? o : n) : e.closest("pre") || e.tagName === "PRE" ? no(e, t, s, n) : to(e, t, s, n);
}
function ur(e) {
  return e ? e.querySelector("[data-node-view-content-react]") ?? e.querySelector("[data-node-view-content]") ?? e.querySelector("code") ?? e : null;
}
function Ir({ text: e, className: t, contentRootRef: s }) {
  const n = gr(e), [i, o] = d.useState(n), [c, u] = d.useState(null), [f, p] = d.useState(null);
  d.useLayoutEffect(() => {
    const g = (s == null ? void 0 : s.current) ?? null, w = ur(g);
    if (!w) {
      o(n), u(null), p(null);
      return;
    }
    let C = 0, E = null;
    const k = () => {
      cancelAnimationFrame(C), C = requestAnimationFrame(() => {
        const R = ur((s == null ? void 0 : s.current) ?? null);
        if (!R) {
          o(n), u(null), p(null);
          return;
        }
        const b = Gi(R, e), $ = Dr(R), H = ro(R, e, b);
        o(b), p($), u(H.length === b && H.every((L) => L > 0) ? H : null);
      });
    };
    k(), E = new ResizeObserver(k), E.observe(w), g && g !== w && E.observe(g);
    const N = w.closest("pre");
    N && N !== w && N !== g && E.observe(N);
    const T = new MutationObserver(k);
    T.observe(w, { subtree: true, childList: true, characterData: true, attributes: true });
    const I = window.setTimeout(k, 0);
    return window.addEventListener(Yn, k), window.addEventListener("resize", k), () => {
      cancelAnimationFrame(C), window.clearTimeout(I), E == null ? void 0 : E.disconnect(), T.disconnect(), window.removeEventListener(Yn, k), window.removeEventListener("resize", k);
    };
  }, [e, n, s]);
  const h = f != null && f > 0 ? { lineHeight: `${f}px` } : void 0;
  return a.jsx("div", { className: ["haim-line-numbers", t].filter(Boolean).join(" "), style: h, "aria-hidden": true, children: Array.from({ length: i }, (g, w) => {
    const C = c == null ? void 0 : c[w], E = C != null && C > 0 ? { height: C, minHeight: C, maxHeight: C, lineHeight: f != null && f > 0 ? `${Math.min(f, C)}px` : void 0 } : void 0;
    return a.jsx("span", { className: "haim-line-numbers__n", style: E, children: w + 1 }, w);
  }) });
}
function ao(e) {
  const s = as(String(e || ""))[0];
  return s ? { meta: s.meta ?? xr(), grid: s.grid } : null;
}
function so(e, t) {
  return `${ss(e)}
${is(t)}`;
}
function wl() {
  const e = xr(), t = { rows: [["", "", ""], ["", "", ""], ["", "", ""]], aligns: [null, null, null] };
  return { meta: e, grid: t, text: so(e, t) };
}
const io = "haim-table-edit-request";
function oo(e, t) {
  e.dispatchEvent(new CustomEvent(io, { detail: t, bubbles: true }));
}
function lo({ node: e, editor: t, selected: s, getPos: n }) {
  const i = String(e.attrs.kind || "raw"), o = String(e.attrs.text || ""), c = t.isEditable, u = d.useRef(null), f = d.useMemo(() => {
    if (i !== "haim-table") return null;
    const h = ao(o);
    return h ? zs(h.grid, h.meta) : null;
  }, [i, o]), p = () => {
    if (!c || i !== "haim-table") return;
    const h = typeof n == "function" ? n() : null;
    typeof h == "number" && oo(t.view.dom, { pos: h, text: o });
  };
  return i === "haim-table" && f ? a.jsx(fe, { as: "div", className: `haim-raw-md haim-raw-md--haim-table${s ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": "haim-table", contentEditable: false, onDoubleClick: (h) => {
    h.preventDefault(), h.stopPropagation(), p();
  }, children: a.jsx("div", { className: "haim-haim-table-preview", dangerouslySetInnerHTML: { __html: f } }) }) : a.jsxs(fe, { as: "div", className: `haim-raw-md${s ? " is-selected" : ""}`, "data-haim-raw-md": "1", "data-kind": i, contentEditable: false, children: [a.jsx(Ir, { text: o, className: "haim-raw-md__line-numbers", contentRootRef: u }), a.jsx("pre", { ref: u, className: "haim-raw-md__pre", children: o })] });
}
const co = ve.create({ name: "rawMarkdownBlock", group: "block", atom: true, selectable: true, code: true, addAttributes() {
  return { text: { default: "" }, kind: { default: "raw" } };
}, parseHTML() {
  return [{ tag: "pre[data-haim-raw-md]", getAttrs: (e) => e instanceof HTMLElement ? { text: e.textContent || "", kind: e.getAttribute("data-kind") || "raw" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["pre", Te(t, { "data-haim-raw-md": "1", "data-kind": String(e.attrs.kind || "raw"), class: "haim-raw-md" }), String(e.attrs.text || "")];
}, addNodeView() {
  return Ke(lo);
}, renderMarkdown: (e) => {
  var _a2;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.text) || "");
  return t ? t.endsWith(`
`) ? t : `${t}
` : "";
} }), uo = ve.create({ name: "deepHeading", group: "block", content: "inline*", defining: true, addAttributes() {
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
  const s = Number((_a2 = e.attrs) == null ? void 0 : _a2.level) || 7, n = "#".repeat(Math.min(10, Math.max(7, s))), i = t.renderChildren(e.content || []);
  return `${n} ${i}

`;
} }), ho = ve.create({ name: "mathBlock", group: "block", atom: true, code: true, addAttributes() {
  return { latex: { default: "" }, display: { default: true } };
}, parseHTML() {
  return [{ tag: "div[data-haim-math]", getAttrs: (e) => e instanceof HTMLElement ? { latex: e.getAttribute("data-latex") || e.textContent || "", display: e.getAttribute("data-display") !== "false" } : false }];
}, renderHTML({ node: e, HTMLAttributes: t }) {
  return ["div", Te(t, { "data-haim-math": "1", "data-latex": String(e.attrs.latex || ""), "data-display": e.attrs.display ? "true" : "false", class: "haim-math-block" }), String(e.attrs.latex || "")];
}, renderMarkdown: (e) => {
  var _a2, _b;
  const t = String(((_a2 = e.attrs) == null ? void 0 : _a2.latex) || "").trim();
  return t ? ((_b = e.attrs) == null ? void 0 : _b.display) ? `$$
${t}
$$

` : `$${t}$

` : "";
} });
function dr({ label: e, onClick: t, children: s }) {
  return a.jsxs(Mt, { children: [a.jsx(Nt, { asChild: true, children: a.jsx("button", { type: "button", className: "inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft", "aria-label": e, onClick: (n) => {
    n.preventDefault(), n.stopPropagation(), t();
  }, children: s }) }), a.jsx(Et, { children: a.jsxs(Tt, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [e, a.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Hr(e, t) {
  const [s, n] = d.useState(null), [i, o] = d.useState(false);
  return d.useEffect(() => {
    const c = String(e || "").trim();
    if (!c) {
      n(null), o(false);
      return;
    }
    try {
      const u = Os.renderToString(c, { throwOnError: false, displayMode: t, output: "html" });
      n(u), o(false);
    } catch {
      n(null), o(true);
    }
  }, [e, t]), { html: s, error: i };
}
function fo({ node: e, updateAttributes: t, editor: s, selected: n }) {
  const i = String(e.attrs.latex || ""), o = s.isEditable, [c, u] = d.useState(false), [f, p] = d.useState(i), h = d.useRef(null), { html: g, error: w } = Hr(i, true);
  d.useEffect(() => {
    p(i);
  }, [i]), d.useEffect(() => {
    var _a2;
    c && ((_a2 = h.current) == null ? void 0 : _a2.focus());
  }, [c]);
  const C = () => {
    const k = f.trim();
    t({ latex: k || i }), u(false);
  }, E = () => {
    p(i), u(false);
  };
  return c && o ? a.jsxs(fe, { as: "div", className: `haim-math-block haim-math-block--editing${n ? " is-selected" : ""}`, "data-type": "block-math", contentEditable: false, children: [a.jsx("textarea", { ref: h, className: "haim-math-block__textarea", value: f, rows: Math.min(8, Math.max(2, f.split(`
`).length + 1)), onChange: (k) => p(k.target.value), onBlur: C, onKeyDown: (k) => {
    k.key === "Escape" && (k.preventDefault(), E()), k.key === "Enter" && (k.metaKey || k.ctrlKey) && (k.preventDefault(), C()), k.stopPropagation();
  }, spellCheck: false }), a.jsx(ot, { delayDuration: 250, skipDelayDuration: 0, children: a.jsx("div", { className: "haim-math-block__toolbar", children: a.jsx(dr, { label: "\uBBF8\uB9AC\uBCF4\uAE30", onClick: C, children: a.jsx(wr, { size: 14, "aria-hidden": true }) }) }) })] }) : a.jsxs(fe, { as: "div", className: `haim-math-block${n ? " is-selected" : ""}${w ? " haim-math-block--error" : ""}`, "data-type": "block-math", "data-latex": i, contentEditable: false, onDoubleClick: () => {
    o && u(true);
  }, children: [a.jsx(ot, { delayDuration: 250, skipDelayDuration: 0, children: o ? a.jsx("div", { className: "haim-math-block__toolbar", children: a.jsx(dr, { label: "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => u(true), children: a.jsx(yr, { size: 14, "aria-hidden": true }) }) }) : null }), g ? a.jsx("div", { className: "haim-math-block__render", dangerouslySetInnerHTML: { __html: g } }) : a.jsx("div", { className: "haim-math-block__fallback", children: i || "\u2026" })] });
}
function po({ node: e, updateAttributes: t, editor: s, selected: n }) {
  const i = String(e.attrs.latex || ""), o = s.isEditable, [c, u] = d.useState(false), [f, p] = d.useState(i), h = d.useRef(null), { html: g, error: w } = Hr(i, false);
  d.useEffect(() => {
    p(i);
  }, [i]), d.useEffect(() => {
    var _a2;
    c && ((_a2 = h.current) == null ? void 0 : _a2.focus());
  }, [c]);
  const C = () => {
    const k = f.trim();
    t({ latex: k || i }), u(false);
  }, E = () => {
    p(i), u(false);
  };
  return c && o ? a.jsx(fe, { as: "span", className: `haim-math-inline haim-math-inline--editing${n ? " is-selected" : ""}`, "data-type": "inline-math", contentEditable: false, children: a.jsx("input", { ref: h, type: "text", className: "haim-math-inline__input", value: f, onChange: (k) => p(k.target.value), onBlur: C, onKeyDown: (k) => {
    k.key === "Enter" && (k.preventDefault(), C()), k.key === "Escape" && (k.preventDefault(), E()), k.stopPropagation();
  }, spellCheck: false }) }) : a.jsx(fe, { as: "span", className: `haim-math-inline${n ? " is-selected" : ""}${w ? " haim-math-inline--error" : ""}`, "data-type": "inline-math", "data-latex": i, contentEditable: false, onDoubleClick: (k) => {
    k.preventDefault(), k.stopPropagation(), o && u(true);
  }, children: g ? a.jsx("span", { dangerouslySetInnerHTML: { __html: g } }) : a.jsx("span", { className: "haim-math-inline__fallback", children: i || "?" }) });
}
const mo = ba.extend({ addNodeView() {
  return Ke(fo);
} }).configure({ katexOptions: { throwOnError: false, displayMode: true } }), go = wa.extend({ addNodeView() {
  return Ke(po);
} }).configure({ katexOptions: { throwOnError: false, displayMode: false } }), Pt = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"', "`": "`" }, xo = /* @__PURE__ */ new Set(["js", "javascript", "jsx", "mjs", "cjs", "ts", "typescript", "tsx"]), _r = new Set(Object.values(Pt)), bo = new ct("haimCodeBlockBracketPairs");
function Fe(e, t) {
  return t < 0 || t >= e.doc.content.size ? "" : e.doc.textBetween(t, t + 1);
}
function hn(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "").trim().toLowerCase();
}
function fn(e) {
  return xo.has(String(e || "").trim().toLowerCase());
}
function zr(e) {
  const { $from: t, $to: s } = e.selection;
  return t.parent.type.name !== "codeBlock" || s.parent.type.name !== "codeBlock" ? false : t.before(t.depth) === s.before(s.depth);
}
function wo(e) {
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return null;
  const { key: t, code: s } = e;
  return t === "`" || s === "Backquote" && !e.shiftKey ? "`" : t in Pt || _r.has(t) ? t : s === "Quote" ? e.shiftKey ? '"' : "'" : null;
}
function hr(e) {
  return e ? /[\w$]/.test(e) : false;
}
function yo(e, t) {
  const { from: s } = e.selection, n = Fe(e, s - 1), i = Fe(e, s);
  return !(hr(n) || hr(i) || i === t);
}
function ko(e, t) {
  if (!zr(e) || t === "`" && !fn(hn(e))) return null;
  const { selection: s } = e, { from: n, to: i, empty: o } = s, c = Pt[t];
  if (c !== void 0) {
    if (!o) {
      const f = e.doc.textBetween(n, i), p = e.tr.insertText(`${t}${f}${c}`, n, i);
      return p.setSelection(se.create(p.doc, n + t.length, n + t.length + f.length)), p;
    }
    if ((t === "'" || t === '"' || t === "`") && !yo(e, t)) return Fe(e, n) === t ? e.tr.setSelection(se.create(e.doc, n + 1)) : null;
    const u = e.tr.insertText(`${t}${c}`, n, i);
    return u.setSelection(se.create(u.doc, n + t.length)), u;
  }
  return _r.has(t) && o && Fe(e, n) === t ? t === "`" && !fn(hn(e)) ? null : e.tr.setSelection(se.create(e.doc, n + 1)) : null;
}
function So(e) {
  if (!zr(e)) return null;
  const { selection: t } = e;
  if (!t.empty) return null;
  const { from: s } = t, n = Fe(e, s - 1), i = Fe(e, s), o = Pt[n];
  return !o || i !== o || n === "`" && !fn(hn(e)) ? null : e.tr.delete(s - 1, s + 1);
}
function Co(e, t) {
  if (t.defaultPrevented) return false;
  if (t.key === "Backspace") {
    if (t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
    const i = So(e.state);
    return i ? (e.dispatch(i), true) : false;
  }
  const s = wo(t);
  if (!s) return false;
  const n = ko(e.state, s);
  return n ? (e.dispatch(n), true) : false;
}
function vo() {
  return new lt({ key: bo, props: { handleKeyDown(e, t) {
    return Co(e, t);
  } } });
}
const jo = new ct("haimCodeBlockIndent");
function Mo(e) {
  const { $from: t } = e.selection;
  return t.parent.type.name !== "codeBlock" ? "" : String(t.parent.attrs.language || "");
}
function yn(e) {
  return e.selection.$from.parent.type.name === "codeBlock";
}
function Or(e, t, s) {
  const n = e.doc.resolve(t);
  if (n.parent.type.name !== "codeBlock") return [];
  const i = n.start(), o = n.end(), u = e.doc.textBetween(i, o, `
`, `
`).split(`
`), f = [];
  let p = i;
  for (let h = 0; h < u.length; h += 1) {
    const g = u[h] ?? "", w = h < u.length - 1 ? p + g.length + 1 : o;
    t < w && s > p && f.push(p), p = w;
  }
  return f;
}
function fr(e, t) {
  var _a2;
  const s = ((_a2 = e.match(/^ */)) == null ? void 0 : _a2[0]) ?? "";
  return Math.min(s.length, t);
}
function No(e, t) {
  if (!yn(e)) return null;
  const s = Math.max(1, Math.round(t)), n = " ".repeat(s), { selection: i } = e, { from: o, to: c, empty: u } = i;
  if (u) {
    const w = e.tr.insertText(n, o);
    return w.setSelection(se.create(w.doc, o + n.length)), w;
  }
  const f = Or(e, o, c);
  if (f.length === 0) return null;
  const p = e.tr;
  for (let w = f.length - 1; w >= 0; w -= 1) p.insertText(n, f[w]);
  const h = f[0], g = p.mapping.map(c);
  return p.setSelection(se.create(p.doc, h, g)), p;
}
function Eo(e, t) {
  var _a2;
  if (!yn(e)) return null;
  const s = Math.max(1, Math.round(t)), { selection: n, doc: i } = e, { $from: o, empty: c } = n;
  if (c) {
    const b = o.start(), $ = o.end(), L = i.textBetween(b, $, `
`, `
`).split(`
`), O = o.pos - b;
    let W = 0, ie = 0;
    for (let P = 0; P < L.length; P += 1) {
      const _ = L[P] ?? "";
      if (ie + _.length >= O) {
        W = P;
        break;
      }
      ie += _.length + 1, P === L.length - 1 && (W = P);
    }
    const $e = L[W] ?? "", J = fr($e, s);
    if (J === 0) return e.tr;
    let j = b;
    for (let P = 0; P < W; P += 1) j += (((_a2 = L[P]) == null ? void 0 : _a2.length) ?? 0) + 1;
    const M = e.tr.delete(j, j + J);
    return o.pos - j <= J ? M.setSelection(se.create(M.doc, j)) : M.setSelection(se.create(M.doc, o.pos - J)), M;
  }
  const { from: u, to: f } = n, p = Or(e, u, f);
  if (p.length === 0) return null;
  const h = o.start(), g = o.end(), C = i.textBetween(h, g, `
`, `
`).split(`
`), E = /* @__PURE__ */ new Map();
  {
    let b = h;
    for (let $ = 0; $ < C.length; $ += 1) {
      const H = C[$] ?? "";
      E.set(b, H), b += H.length + ($ < C.length - 1 ? 1 : 0);
    }
  }
  const k = e.tr;
  let N = 0, T = 0;
  for (let b = p.length - 1; b >= 0; b -= 1) {
    const $ = p[b], H = E.get($) ?? "", L = fr(H, s);
    L !== 0 && (k.delete($, $ + L), T += L, $ < u && (N += L));
  }
  if (T === 0) return k;
  const I = Math.max(p[0], u - N), R = k.mapping.map(f);
  return k.setSelection(se.create(k.doc, I, Math.max(I, R))), k;
}
function To(e, t) {
  if (t.defaultPrevented || t.isComposing || t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || !yn(e.state)) return false;
  const s = Mo(e.state), n = Fs(s, Ks()), i = t.shiftKey ? Eo(e.state, n) : No(e.state, n);
  return i ? (e.dispatch(i), true) : false;
}
function $o() {
  return new lt({ key: jo, props: { handleKeyDown(e, t) {
    return To(e, t);
  } } });
}
function pr(e) {
  return String(e || "").trim().toLowerCase() === "mermaid";
}
function Lo(e) {
  var _a2;
  return e && (((_a2 = e.closest(".haim-editor")) == null ? void 0 : _a2.classList.contains("haim-editor--dark")) || typeof document < "u" && document.documentElement.classList.contains("dark")) ? "dark" : "default";
}
const Fr = "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", Po = "z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Ao = "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg";
function pn({ label: e, onClick: t, active: s = false, expanded: n, children: i }) {
  return a.jsxs(Mt, { children: [a.jsx(Nt, { asChild: true, children: a.jsx("button", { type: "button", className: `haim-code-block__action${s ? " is-copy-success" : ""}`, "aria-label": e, ...n !== void 0 ? { "aria-expanded": n } : {}, onClick: t, children: i }) }), a.jsx(Et, { children: a.jsxs(Tt, { side: "bottom", sideOffset: 6, className: Fr, children: [e, a.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Do({ language: e, onChange: t }) {
  const s = d.useId(), n = d.useRef(null), [i, o] = d.useState(false), [c, u] = d.useState(""), [f, p] = d.useState(0), h = Ws(e), g = qs(e), w = Xs(e), C = Vs(h, c), E = c.trim(), k = E.toLowerCase() === "plain" ? Ys : E, T = !!E && !C.some((b) => b.value.toLowerCase() === k.toLowerCase() || b.label.toLowerCase() === E.toLowerCase()) ? [{ value: k, label: E, custom: true }, ...C.map((b) => ({ ...b, custom: false }))] : C.map((b) => ({ ...b, custom: false }));
  d.useEffect(() => {
    if (!i) return;
    u(""), p(0);
    const b = window.setTimeout(() => {
      var _a2;
      return (_a2 = n.current) == null ? void 0 : _a2.focus();
    }, 0);
    return () => window.clearTimeout(b);
  }, [i]), d.useEffect(() => {
    p(0);
  }, [c]);
  const I = d.useCallback((b) => {
    t(Us(b)), o(false);
  }, [t]), R = (b) => {
    if (b.key === "ArrowDown") {
      if (b.preventDefault(), !T.length) return;
      p(($) => ($ + 1) % T.length);
      return;
    }
    if (b.key === "ArrowUp") {
      if (b.preventDefault(), !T.length) return;
      p(($) => ($ - 1 + T.length) % T.length);
      return;
    }
    if (b.key === "Enter") {
      b.preventDefault();
      const $ = T[f] ?? T[0];
      $ ? I($.value) : E && I(k);
      return;
    }
    b.key === "Escape" && (b.preventDefault(), o(false));
  };
  return a.jsxs(Ps, { open: i, onOpenChange: o, children: [a.jsxs(Mt, { children: [a.jsx(Nt, { asChild: true, children: a.jsx(As, { asChild: true, children: a.jsxs("button", { type: "button", className: "haim-code-block__lang-trigger", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", "aria-haspopup": "listbox", "aria-expanded": i, onPointerDown: (b) => b.stopPropagation(), children: [a.jsx("span", { className: "haim-code-block__lang-label", children: w }), a.jsx("span", { className: "haim-code-block__lang-chevron", children: a.jsx(Sr, { size: 12, "aria-hidden": true }) })] }) }) }), a.jsx(Et, { children: a.jsxs(Tt, { side: "bottom", sideOffset: 6, className: Fr, children: ["\uC5B8\uC5B4 \uAC80\uC0C9", a.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] }), a.jsx(Ds, { children: a.jsxs(Bs, { className: Po, side: "bottom", align: "start", sideOffset: 4, onOpenAutoFocus: (b) => b.preventDefault(), onCloseAutoFocus: (b) => b.preventDefault(), onPointerDown: (b) => b.stopPropagation(), children: [a.jsxs("div", { className: "flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong", children: [a.jsx(js, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }), a.jsx("input", { ref: n, type: "text", value: c, onChange: (b) => u(b.target.value), onKeyDown: R, placeholder: "\uC5B8\uC5B4 \uAC80\uC0C9\u2026", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4 \uAC80\uC0C9", "aria-controls": s, "aria-autocomplete": "list", autoComplete: "off", spellCheck: false, className: "min-w-0 flex-1 bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-odp-fg" })] }), a.jsx("ul", { id: s, role: "listbox", "aria-label": "\uCF54\uB4DC \uC5B8\uC5B4", className: "max-h-56 overflow-y-auto p-1", children: T.length === 0 ? a.jsx("li", { className: "cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uC77C\uCE58\uD558\uB294 \uC5B8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : T.map((b, $) => {
    const H = b.value === g, L = $ === f;
    return a.jsx("li", { role: "presentation", children: a.jsxs("button", { type: "button", role: "option", "aria-selected": H, "data-highlighted": L ? "true" : "false", className: Ao, onMouseEnter: () => p($), onMouseDown: (O) => O.preventDefault(), onClick: () => I(b.value), children: [H ? a.jsx("span", { className: "absolute left-1.5 inline-flex items-center", children: a.jsx(kr, { size: 12, "aria-hidden": true }) }) : null, b.custom ? a.jsxs("span", { children: ["\uC0AC\uC6A9: ", a.jsx("span", { className: "font-mono", children: b.label })] }) : b.label] }) }, `${b.custom ? "custom:" : ""}${b.value}`);
  }) })] }) })] });
}
function Bo({ language: e, collapsed: t, copied: s, editable: n, onCopy: i, onToggleCollapse: o, onLanguageChange: c, extra: u }) {
  return a.jsxs("div", { className: "haim-code-block__header", children: [n && c ? a.jsx(Do, { language: e, onChange: c }) : a.jsx("span", { className: "haim-code-block__lang", children: e || "plain" }), a.jsxs("div", { className: "haim-code-block__actions", children: [u, a.jsx(pn, { label: s ? "\uBCF5\uC0AC\uB428" : "\uBCF5\uC0AC", active: s, onClick: i, children: s ? a.jsx(kr, { size: 14, "aria-hidden": true }) : a.jsx(Cs, { size: 14, "aria-hidden": true }) }), a.jsx(pn, { label: t ? "\uD3BC\uCE58\uAE30" : "\uC811\uAE30", expanded: !t, onClick: o, children: t ? a.jsx(Sr, { size: 14, "aria-hidden": true }) : a.jsx(vs, { size: 14, "aria-hidden": true }) })] })] });
}
function Ro({ node: e, editor: t, selected: s, updateAttributes: n }) {
  const i = String(e.attrs.language || ""), o = pr(i), c = e.textContent || "", [u, f] = d.useState(null), [p, h] = d.useState(false), [g, w] = d.useState(false), [C, E] = d.useState(false), [k, N] = d.useState(false), T = t.isEditable, I = d.useRef(null);
  d.useEffect(() => {
    var _a2;
    if (!o || g || C) return;
    let L = false;
    const O = Lo(((_a2 = t.view) == null ? void 0 : _a2.dom) ?? null);
    return Gs(c, O).then((W) => {
      L || (W ? (f(W), h(false)) : (f(null), h(!!c.trim())));
    }), () => {
      L = true;
    };
  }, [o, g, C, c, t]);
  const R = d.useCallback(() => {
    var _a2;
    const L = c, O = () => {
      N(true), window.setTimeout(() => N(false), 1500);
    };
    if (typeof navigator < "u" && ((_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText)) {
      navigator.clipboard.writeText(L).then(O).catch(() => {
        try {
          const W = document.createElement("textarea");
          W.value = L, document.body.appendChild(W), W.select(), document.execCommand("copy"), W.remove(), O();
        } catch {
        }
      });
      return;
    }
    O();
  }, [c]), b = d.useCallback((L) => {
    n({ language: L }), pr(L) || (w(false), f(null), h(false));
  }, [n]), $ = a.jsx("pre", { className: "haim-mermaid-block__source-hidden", "aria-hidden": true, children: a.jsx(Xn, { as: "code" }) }), H = a.jsx(Bo, { language: i, collapsed: C, copied: k, editable: T, onCopy: R, onToggleCollapse: () => E((L) => !L), ...T ? { onLanguageChange: b } : {}, extra: o && T && !C ? a.jsx(pn, { label: g || p ? "\uCC28\uD2B8 \uBCF4\uAE30" : "\uC18C\uC2A4 \uD3B8\uC9D1", onClick: () => w((L) => !L), children: g || p ? a.jsx(wr, { size: 14, "aria-hidden": true }) : a.jsx(yr, { size: 14, "aria-hidden": true }) }) : null });
  return o && !g && u && !C ? a.jsxs(fe, { as: "div", className: `haim-code-block haim-mermaid-block${s ? " is-selected" : ""}`, "data-language": "mermaid", children: [a.jsx(ot, { delayDuration: 250, skipDelayDuration: 0, children: H }), a.jsx("div", { className: "haim-mermaid-block__chart", dangerouslySetInnerHTML: { __html: u }, onDoubleClick: () => {
    T && w(true);
  } }), $] }) : a.jsxs(fe, { as: "div", className: `haim-code-block${o ? " haim-code-block--mermaid-edit" : ""}${s ? " is-selected" : ""}${C ? " is-collapsed" : ""}`, "data-language": i || void 0, children: [a.jsx(ot, { delayDuration: 250, skipDelayDuration: 0, children: H }), C ? $ : a.jsxs(a.Fragment, { children: [o && p ? a.jsx("div", { className: "haim-mermaid-block__error", children: "Mermaid \uB80C\uB354 \uC2E4\uD328" }) : null, a.jsxs("div", { className: "haim-code-block__body", children: [a.jsx(Ir, { text: c, className: "haim-code-block__line-numbers", contentRootRef: I }), a.jsx("pre", { ref: I, className: i ? `language-${i}` : void 0, children: a.jsx(Xn, { as: "code", ...i ? { className: `language-${i}` } : {} }) })] })] })] });
}
function Kr(e) {
  return String(e ?? "").replace(/^(?:\r?\n)+/, "").replace(/(?:\r?\n)+$/, "");
}
function yl(e, t) {
  const { state: s } = e;
  s.selection;
  let n = s.tr, i = false;
  return s.doc.descendants((o, c) => {
    if (o.type.name !== "codeBlock") return;
    const u = o.textContent, f = Kr(u);
    if (f === u) return;
    const p = c + 1, h = c + o.nodeSize - 1;
    n = n.insertText(f, n.mapping.map(p), n.mapping.map(h)), i = true;
  }), i ? (n.setMeta("addToHistory", false), n.setMeta("haimTrimCodeEdges", true), e.view.dispatch(n), true) : false;
}
const Io = new ct("haimTrimCodeEdges");
function Ho() {
  return new lt({ key: Io, appendTransaction(e, t, s) {
    if (!e.some((N) => N.selectionSet || N.docChanged) || e.some((N) => N.getMeta("haimTrimCodeEdges"))) return null;
    const n = t.selection.$from, i = s.selection.$from, o = n.parent.type.name === "codeBlock", c = i.parent.type.name === "codeBlock";
    if (!o || c) return null;
    const u = n.depth, f = n.node(u), p = n.before(u);
    if (f.type.name !== "codeBlock") return null;
    const h = f.textContent, g = Kr(h);
    if (g === h) return null;
    const w = p + 1, C = p + f.nodeSize - 1;
    let E = w, k = C;
    for (const N of e) E = N.mapping.map(E), k = N.mapping.map(k);
    return s.tr.insertText(g, E, k).setMeta("addToHistory", false).setMeta("haimTrimCodeEdges", true);
  } });
}
const _o = Qs(Js), zo = ya.extend({ addNodeView() {
  return Ke(Ro);
}, addProseMirrorPlugins() {
  var _a2;
  return [...((_a2 = this.parent) == null ? void 0 : _a2.call(this)) ?? [], Ho(), vo(), $o()];
} }).configure({ lowlight: _o, languageClassPrefix: "language-", enableTabIndentation: false }), Oo = ka.extend({ renderMarkdown: (e, t) => {
  if (!e) return "";
  const s = Array.isArray(e.content) ? e.content : [];
  return s.length === 0 ? "" : t.renderChildren(s);
} }), Fo = /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings|remote-image)\b[\s\S]*?-->\s*)+)/;
function kl(e) {
  const t = typeof e == "string" ? e : "", s = Fo.exec(t);
  if (!s) return { prefix: "", body: t };
  const n = s[1] ?? "";
  return { prefix: n, body: t.slice(n.length) };
}
function Ko(e, t) {
  return e ? t ? e.endsWith(`
`) ? `${e}${t}` : `${e}
${t}` : e : t;
}
function mn(e, t) {
  let s = 0;
  const n = Math.min(Math.max(0, t), e.length);
  for (let i = 0; i < n; i += 1) e.charCodeAt(i) === 10 && (s += 1);
  return s;
}
function Wo(e) {
  if (!e) return 0;
  const t = "\0", s = Ko(e, t), n = s.indexOf(t);
  return n < 0 ? 0 : mn(s, n);
}
function qo(e, t) {
  try {
    return e({ type: "doc", content: [t.toJSON()] }).replace(/\n+$/, "");
  } catch {
    return t.textContent || "";
  }
}
function Xo(e, t, s) {
  const n = Wo(s);
  let i = "";
  try {
    i = t(e.toJSON());
  } catch {
    i = "";
  }
  const o = [];
  let c = 0;
  return e.forEach((u, f) => {
    const p = f + u.nodeSize;
    if (u.type.name === "noteCover") {
      o.push({ pos: f, to: p, line0: 0 });
      return;
    }
    const h = qo(t, u);
    let g = -1;
    if (h.length > 0 && i && (g = i.indexOf(h, c), g < 0)) {
      let C = c;
      for (; C < i.length && i.charCodeAt(C) === 10; ) C += 1;
      g = i.indexOf(h, C);
    }
    let w;
    if (g >= 0) w = n + mn(i, g), c = g + Math.max(h.length, 1);
    else {
      for (; c < i.length && i.charCodeAt(c) === 10; ) c += 1;
      w = n + mn(i, c), c = Math.min(i.length, c + Math.max(h.length, h ? 0 : 1));
    }
    o.push({ pos: f, to: p, line0: w });
  }), o;
}
function Vo(e) {
  var _a2;
  const s = (_a2 = e.storage.markdown) == null ? void 0 : _a2.manager;
  return !s || typeof s.serialize != "function" ? null : (n) => s.serialize(n);
}
const Yo = mr.create({ name: "haimSourceLine", addOptions() {
  return { getMetaPrefix: () => "" };
}, addDecorations() {
  const e = this.options.getMetaPrefix ?? (() => "");
  return { update: "document", create: ({ editor: t, state: s }) => {
    const n = Vo(t);
    if (!n) return [];
    const i = e() || "";
    return Xo(s.doc, n, i).map((c) => Sa.Node(c.pos, c.to, { "data-line": String(c.line0) }));
  } };
} });
function Uo(e, t, s) {
  return new Ca({ find: e, handler: ({ state: n, range: i, match: o }) => {
    if (!s()) return null;
    let c = t, u = i.from;
    const f = i.to;
    if (o[1]) {
      const p = o[0].lastIndexOf(o[1]);
      c += o[0].slice(p + o[1].length), u += p;
      const h = u - f;
      h > 0 && (c = o[0].slice(p - h, p) + c, u = f);
    }
    n.tr.insertText(c, u, f);
  } });
}
const Go = [{ find: /--$/, replace: "\u2014", ruleId: "emDash" }, { find: /\.\.\.$/, replace: "\u2026", ruleId: "ellipsis" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/, replace: "\u201C", ruleId: "doubleQuotes" }, { find: /"$/, replace: "\u201D", ruleId: "doubleQuotes" }, { find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/, replace: "\u2018", ruleId: "singleQuotes" }, { find: /'$/, replace: "\u2019", ruleId: "singleQuotes" }, { find: /<-$/, replace: "\u2190", ruleId: "leftArrow" }, { find: /->$/, replace: "\u2192", ruleId: "rightArrow" }, { find: /\(c\)$/, replace: "\xA9", ruleId: "copyright" }, { find: /\(tm\)$/, replace: "\u2122", ruleId: "trademark" }, { find: /\(sm\)$/, replace: "\u2120", ruleId: "servicemark" }, { find: /\(r\)$/, replace: "\xAE", ruleId: "registeredTrademark" }, { find: /(?:^|\s)(1\/2)\s$/, replace: "\xBD", ruleId: "oneHalf" }, { find: /(?:^|\s)(1\/4)\s$/, replace: "\xBC", ruleId: "oneQuarter" }, { find: /(?:^|\s)(3\/4)\s$/, replace: "\xBE", ruleId: "threeQuarters" }, { find: /\+\/-$/, replace: "\xB1", ruleId: "plusMinus" }, { find: /!=$/, replace: "\u2260", ruleId: "notEqual" }, { find: /\d+\s?([*x])\s?\d+$/, replace: "\xD7", ruleId: "multiplication" }, { find: /<<$/, replace: "\xAB", ruleId: "laquo" }, { find: />>$/, replace: "\xBB", ruleId: "raquo" }, { find: /\^2$/, replace: "\xB2", ruleId: "superscriptTwo" }, { find: /\^3$/, replace: "\xB3", ruleId: "superscriptThree" }], Qo = mr.create({ name: "haimTypography", addOptions() {
  return { initialRules: { ...br } };
}, addStorage() {
  return { rules: { ...this.options.initialRules } };
}, addCommands() {
  return { setHaimTypographyRules: (e) => () => (this.storage.rules = { ...e }, true) };
}, addInputRules() {
  return Go.map(({ find: e, replace: t, ruleId: s }) => Uo(e, t, () => !!this.storage.rules[s]));
} });
function Sl(e) {
  const t = (e == null ? void 0 : e.placeholder) ?? "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694\u2026", n = ((e == null ? void 0 : e.profile) ?? "note") === "note", i = (e == null ? void 0 : e.getMetaPrefix) ?? (() => ""), o = (e == null ? void 0 : e.typographyRules) ?? br, u = [n ? Vn.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, codeBlock: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }) : Vn.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] }, paragraph: false, bulletList: false, orderedList: false, listItem: false, listKeymap: false, link: false, trailingNode: false }), Oo, Ri, Yo.configure({ getMetaPrefix: i }), Bi, $a.extend({ parseHTML() {
    return [{ tag: "img[src]:not([data-wiki-path])" }];
  }, addNodeView() {
    return Ke(Ti);
  } }).configure({ allowBase64: true }), La.configure({ taskItem: { nested: true } }), Pa.configure({ table: { resizable: n } }), va, Aa.configure({ types: ["heading", "paragraph"] }), Da.configure({ multicolor: true }), ...n ? [zo] : [], ja, Ma, Qo.configure({ initialRules: o }), Ba.configure({ placeholder: t, ...n ? {} : { showOnlyCurrent: false } }), Na, Ra.configure({ className: "haim-node-focused" }), Ea, Ta, mo, go, Hi, Fi, Wi, Ki, ...n ? [qi] : [], co, uo, ho];
  return n ? [...u, Ia, Fa.configure({ controls: true, nocookie: true }), Ka.configure({ persist: true }), Ha, _a, Wa.configure({ emojis: qa, enableEmoticons: true }), za, Xa.configure({ injectCSS: true, visible: false }), Va.configure({ types: ["heading", "paragraph"] }), Ya.configure({ getIndex: Ua }), Oa] : u;
}
const gn = /* @__PURE__ */ new WeakMap();
function Jo(e, t) {
  if (e === t) return true;
  if (!e || !t) return false;
  try {
    return JSON.stringify(e) === JSON.stringify(t);
  } catch {
    return false;
  }
}
function Cl(e) {
  if (!e) return "";
  const t = e.getJSON(), s = gn.get(e);
  if (s && Jo(s.json, t)) return s.markdown;
  const n = e, i = typeof n.getMarkdown == "function" ? n.getMarkdown() : "";
  return gn.set(e, { json: t, markdown: i }), i;
}
function vl(e) {
  e && gn.delete(e);
}
export {
  io as H,
  wl as a,
  so as b,
  Sl as c,
  Pr as d,
  gl as e,
  Cl as g,
  vl as i,
  Ko as j,
  bl as n,
  ao as p,
  ml as r,
  kl as s,
  yl as t,
  Tr as u,
  xl as w
};
