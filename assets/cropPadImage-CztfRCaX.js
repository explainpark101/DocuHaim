import { K as C } from "./index-DSUCaAxT.js";
function k(r) {
  return new Promise((n, e) => {
    const a = new Image();
    a.addEventListener("load", () => n(a)), a.addEventListener("error", (t) => e(t)), a.setAttribute("crossOrigin", "anonymous"), a.src = r;
  });
}
async function S(r, n) {
  const e = !!n.keepTransparency, a = e ? "image/png" : "image/jpeg", t = n.quality ?? 0.92, o = await new Promise((s, u) => {
    r.toBlob((h) => {
      h ? s(h) : u(new Error("Crop failed"));
    }, a, e ? void 0 : t);
  }), i = n.fileName || (e ? "group-icon.png" : "group-icon.jpg");
  return new File([o], i, { type: a });
}
async function q(r, n, e = {}) {
  const a = await k(r), t = document.createElement("canvas"), o = t.getContext("2d");
  if (!o) throw new Error("Canvas not available");
  const i = Math.max(1, Math.round(n.width)), s = Math.max(1, Math.round(n.height));
  return t.width = i, t.height = s, e.keepTransparency || (o.fillStyle = C(e.backgroundColor) || "#ffffff", o.fillRect(0, 0, i, s)), o.drawImage(a, n.x, n.y, n.width, n.height, 0, 0, i, s), S(t, e);
}
async function O(r, n, e, a = {}) {
  const t = await k(r), o = Math.max(1, t.naturalWidth || t.width), i = Math.max(1, t.naturalHeight || t.height), s = o / Math.max(1, e.cellWidth), u = i / Math.max(1, e.cellHeight), h = (n.x - e.originX) * s, w = (n.y - e.originY) * u, l = Math.max(1, n.width * s), g = Math.max(1, n.height * u), f = Math.max(1, Math.round(l)), d = Math.max(1, Math.round(g)), M = f / l, m = d / g, c = document.createElement("canvas");
  c.width = f, c.height = d;
  const y = c.getContext("2d");
  if (!y) throw new Error("Canvas not available");
  !!a.keepTransparency ? y.clearRect(0, 0, f, d) : (y.fillStyle = C(a.backgroundColor) || "#ffffff", y.fillRect(0, 0, f, d));
  const p = Math.max(0, h), E = Math.max(0, w), T = Math.min(o, h + l), x = Math.min(i, w + g);
  if (T > p && x > E) {
    const R = (p - h) * M, W = (E - w) * m, N = (T - p) * M, X = (x - E) * m;
    y.drawImage(t, p, E, T - p, x - E, R, W, N, X);
  }
  return { file: await S(c, a), area: { x: h, y: w, width: f, height: d } };
}
async function G(r, n = {}) {
  if (!!!n.keepTransparency) {
    const t = document.createElement("canvas");
    t.width = r.width, t.height = r.height;
    const o = t.getContext("2d");
    if (!o) throw new Error("Canvas not available");
    return o.fillStyle = C(n.backgroundColor) || "#ffffff", o.fillRect(0, 0, t.width, t.height), o.drawImage(r, 0, 0), { file: await S(t, n), area: { x: 0, y: 0, width: t.width, height: t.height } };
  }
  return { file: await S(r, n), area: { x: 0, y: 0, width: r.width, height: r.height } };
}
const F = 3072;
function b(r) {
  return new Promise((n, e) => {
    const a = new Image();
    a.addEventListener("load", () => n(a)), a.addEventListener("error", (t) => e(t)), a.setAttribute("crossOrigin", "anonymous"), a.src = r;
  });
}
function H(r) {
  return Math.max(0, Math.min(255, Math.round(r))).toString(16).padStart(2, "0");
}
const P = 16, _ = 0.35;
function B(r) {
  const n = ((r == null ? void 0 : r.type) || "").toLowerCase(), e = ((r == null ? void 0 : r.name) || "").toLowerCase();
  return n.includes("svg") ? true : e.endsWith(".svg") || e.endsWith(".svgz");
}
async function D(r) {
  try {
    const e = await (await fetch(r)).blob();
    if (B({ type: e.type })) return true;
    const t = new TextDecoder("utf-8").decode(new Uint8Array(await e.slice(0, 512).arrayBuffer())).replace(/^\uFEFF/, "").trimStart();
    return /^<svg[\s>]/i.test(t) || /^<\?xml[\s\S]*?<svg[\s>]/i.test(t);
  } catch {
    return false;
  }
}
async function j(r, n) {
  if (B(n) || await D(r)) return { color: "#ffffff", transparentDefault: true };
  const e = await b(r), a = Math.max(1, e.naturalWidth || e.width), t = Math.max(1, e.naturalHeight || e.height), o = document.createElement("canvas");
  o.width = a, o.height = t;
  const i = o.getContext("2d", { willReadFrequently: true });
  if (!i) return { color: "#ffffff", transparentDefault: false };
  i.drawImage(e, 0, 0, a, t);
  const { data: s } = i.getImageData(0, 0, a, t);
  let u = 0, h = 0, w = 0, l = 0, g = 0;
  const f = (c, y) => {
    const v = (y * a + c) * 4;
    if ((s[v + 3] ?? 0) < P) {
      g += 1;
      return;
    }
    u += s[v] ?? 0, h += s[v + 1] ?? 0, w += s[v + 2] ?? 0, l += 1;
  };
  for (let c = 0; c < a; c += 1) f(c, 0), t > 1 && f(c, t - 1);
  for (let c = 1; c < t - 1; c += 1) f(0, c), a > 1 && f(a - 1, c);
  const d = l + g, M = l ? `#${H(u / l)}${H(h / l)}${H(w / l)}` : "#ffffff", m = d > 0 && (l === 0 || g / d >= _);
  return { color: M, transparentDefault: m };
}
const L = 768, I = 2;
async function U(r, n = P) {
  const e = await b(r), a = Math.max(1, e.naturalWidth || e.width), t = Math.max(1, e.naturalHeight || e.height), o = Math.min(1, L / Math.max(a, t)), i = Math.max(1, Math.round(a * o)), s = Math.max(1, Math.round(t * o)), u = document.createElement("canvas");
  u.width = i, u.height = s;
  const h = u.getContext("2d", { willReadFrequently: true });
  if (!h) return null;
  h.clearRect(0, 0, i, s), h.drawImage(e, 0, 0, i, s);
  const { data: w } = h.getImageData(0, 0, i, s);
  let l = i, g = s, f = -1, d = -1;
  for (let x = 0; x < s; x += 1) {
    const A = x * i;
    for (let R = 0; R < i; R += 1) (w[(A + R) * 4 + 3] ?? 0) < n || (R < l && (l = R), x < g && (g = x), R > f && (f = R), x > d && (d = x));
  }
  if (f < l || d < g) return null;
  const M = o > 0 ? 1 / o : 1, m = Math.max(0, Math.floor(l * M)), c = Math.max(0, Math.floor(g * M)), y = Math.min(a, Math.ceil((f + 1) * M)), v = Math.min(t, Math.ceil((d + 1) * M)), p = Math.max(1, y - m), E = Math.max(1, v - c), T = m >= I || c >= I || a - (m + p) >= I || t - (c + E) >= I;
  return { x: m, y: c, width: p, height: E, naturalWidth: a, naturalHeight: t, hasTransparentMargin: T };
}
function $(r, n) {
  const e = r.cellWidth / n.naturalWidth, a = r.cellHeight / n.naturalHeight;
  return { x: r.originX + n.x * e, y: r.originY + n.y * a, width: Math.max(1, n.width * e), height: Math.max(1, n.height * a) };
}
async function z(r, n, e = {}) {
  const a = Number.isFinite(e.padRatio) ? Math.max(0, e.padRatio) : 1, t = await b(r), o = Math.max(1, t.naturalWidth || t.width), i = Math.max(1, t.naturalHeight || t.height), s = 1 + 2 * a, u = Math.min(1, F / (Math.max(o, i) * Math.max(1, s))), h = Math.max(1, Math.round(o * u)), w = Math.max(1, Math.round(i * u)), l = Math.max(0, Math.round(h * a)), g = Math.max(0, Math.round(w * a)), f = h + l * 2, d = w + g * 2, M = document.createElement("canvas");
  M.width = f, M.height = d;
  const m = M.getContext("2d");
  if (!m) throw new Error("Canvas not available");
  const c = C(n), y = !!c && e.matteCenter !== false;
  m.clearRect(0, 0, f, d), c && (m.fillStyle = c, m.fillRect(0, 0, f, d), y || m.clearRect(l, g, h, w)), m.drawImage(t, l, g, h, w);
  const v = !c || !y, p = await new Promise((E, T) => {
    M.toBlob((x) => {
      x ? E(x) : T(new Error("Pad compose failed"));
    }, v ? "image/png" : "image/jpeg", v ? void 0 : 0.92);
  });
  return { src: URL.createObjectURL(p), meta: { cellWidth: h, cellHeight: w, gridWidth: f, gridHeight: d, originX: l, originY: g } };
}
export {
  O as a,
  q as b,
  z as c,
  G as f,
  U as g,
  B as i,
  $ as o,
  j as s
};
