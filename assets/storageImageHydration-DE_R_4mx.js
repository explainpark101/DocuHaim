import { F as b, a4 as L, a5 as q, a6 as O, a7 as G, a8 as k } from "./index-DPH8WKK6.js";
function P(a) {
  return new Promise((t, e) => {
    const n = new Image();
    n.addEventListener("load", () => t(n)), n.addEventListener("error", (r) => e(r)), n.setAttribute("crossOrigin", "anonymous"), n.src = a;
  });
}
async function A(a, t) {
  const e = !!t.keepTransparency, n = e ? "image/png" : "image/jpeg", r = t.quality ?? 0.92, o = await new Promise((s, l) => {
    a.toBlob((i) => {
      i ? s(i) : l(new Error("Crop failed"));
    }, n, e ? void 0 : r);
  }), c = t.fileName || (e ? "group-icon.png" : "group-icon.jpg");
  return new File([o], c, { type: n });
}
async function V(a, t, e = {}) {
  const n = await P(a), r = document.createElement("canvas"), o = r.getContext("2d");
  if (!o) throw new Error("Canvas not available");
  const c = Math.max(1, Math.round(t.width)), s = Math.max(1, Math.round(t.height));
  return r.width = c, r.height = s, e.keepTransparency || (o.fillStyle = b(e.backgroundColor) || "#ffffff", o.fillRect(0, 0, c, s)), o.drawImage(n, t.x, t.y, t.width, t.height, 0, 0, c, s), A(r, e);
}
async function Z(a, t, e, n = {}) {
  const r = await P(a), o = Math.max(1, r.naturalWidth || r.width), c = Math.max(1, r.naturalHeight || r.height), s = o / Math.max(1, e.cellWidth), l = c / Math.max(1, e.cellHeight), i = (t.x - e.originX) * s, w = (t.y - e.originY) * l, d = Math.max(1, t.width * s), g = Math.max(1, t.height * l), f = Math.max(1, Math.round(d)), u = Math.max(1, Math.round(g)), y = f / d, m = u / g, h = document.createElement("canvas");
  h.width = f, h.height = u;
  const x = h.getContext("2d");
  if (!x) throw new Error("Canvas not available");
  !!n.keepTransparency ? x.clearRect(0, 0, f, u) : (x.fillStyle = b(n.backgroundColor) || "#ffffff", x.fillRect(0, 0, f, u));
  const v = Math.max(0, i), p = Math.max(0, w), H = Math.min(o, i + d), M = Math.min(c, w + g);
  if (H > v && M > p) {
    const R = (v - i) * y, B = (p - w) * m, D = (H - v) * y, Y = (M - p) * m;
    x.drawImage(r, v, p, H - v, M - p, R, B, D, Y);
  }
  return { file: await A(h, n), area: { x: i, y: w, width: f, height: u } };
}
async function tt(a, t = {}) {
  if (!!!t.keepTransparency) {
    const r = document.createElement("canvas");
    r.width = a.width, r.height = a.height;
    const o = r.getContext("2d");
    if (!o) throw new Error("Canvas not available");
    return o.fillStyle = b(t.backgroundColor) || "#ffffff", o.fillRect(0, 0, r.width, r.height), o.drawImage(a, 0, 0), { file: await A(r, t), area: { x: 0, y: 0, width: r.width, height: r.height } };
  }
  return { file: await A(a, t), area: { x: 0, y: 0, width: a.width, height: a.height } };
}
const j = 3072;
function C(a) {
  return new Promise((t, e) => {
    const n = new Image();
    n.addEventListener("load", () => t(n)), n.addEventListener("error", (r) => e(r)), n.setAttribute("crossOrigin", "anonymous"), n.src = a;
  });
}
function T(a) {
  return Math.max(0, Math.min(255, Math.round(a))).toString(16).padStart(2, "0");
}
const X = 16, $ = 0.35;
function _(a) {
  const t = ((a == null ? void 0 : a.type) || "").toLowerCase(), e = ((a == null ? void 0 : a.name) || "").toLowerCase();
  return t.includes("svg") ? true : e.endsWith(".svg") || e.endsWith(".svgz");
}
async function z(a) {
  try {
    const e = await (await fetch(a)).blob();
    if (_({ type: e.type })) return true;
    const r = new TextDecoder("utf-8").decode(new Uint8Array(await e.slice(0, 512).arrayBuffer())).replace(/^\uFEFF/, "").trimStart();
    return /^<svg[\s>]/i.test(r) || /^<\?xml[\s\S]*?<svg[\s>]/i.test(r);
  } catch {
    return false;
  }
}
async function at(a, t) {
  if (_(t) || await z(a)) return { color: "#ffffff", transparentDefault: true };
  const e = await C(a), n = Math.max(1, e.naturalWidth || e.width), r = Math.max(1, e.naturalHeight || e.height), o = document.createElement("canvas");
  o.width = n, o.height = r;
  const c = o.getContext("2d", { willReadFrequently: true });
  if (!c) return { color: "#ffffff", transparentDefault: false };
  c.drawImage(e, 0, 0, n, r);
  const { data: s } = c.getImageData(0, 0, n, r);
  let l = 0, i = 0, w = 0, d = 0, g = 0;
  const f = (h, x) => {
    const S = (x * n + h) * 4;
    if ((s[S + 3] ?? 0) < X) {
      g += 1;
      return;
    }
    l += s[S] ?? 0, i += s[S + 1] ?? 0, w += s[S + 2] ?? 0, d += 1;
  };
  for (let h = 0; h < n; h += 1) f(h, 0), r > 1 && f(h, r - 1);
  for (let h = 1; h < r - 1; h += 1) f(0, h), n > 1 && f(n - 1, h);
  const u = d + g, y = d ? `#${T(l / d)}${T(i / d)}${T(w / d)}` : "#ffffff", m = u > 0 && (d === 0 || g / u >= $);
  return { color: y, transparentDefault: m };
}
const U = 768, I = 2;
async function et(a, t = X) {
  const e = await C(a), n = Math.max(1, e.naturalWidth || e.width), r = Math.max(1, e.naturalHeight || e.height), o = Math.min(1, U / Math.max(n, r)), c = Math.max(1, Math.round(n * o)), s = Math.max(1, Math.round(r * o)), l = document.createElement("canvas");
  l.width = c, l.height = s;
  const i = l.getContext("2d", { willReadFrequently: true });
  if (!i) return null;
  i.clearRect(0, 0, c, s), i.drawImage(e, 0, 0, c, s);
  const { data: w } = i.getImageData(0, 0, c, s);
  let d = c, g = s, f = -1, u = -1;
  for (let M = 0; M < s; M += 1) {
    const W = M * c;
    for (let R = 0; R < c; R += 1) (w[(W + R) * 4 + 3] ?? 0) < t || (R < d && (d = R), M < g && (g = M), R > f && (f = R), M > u && (u = M));
  }
  if (f < d || u < g) return null;
  const y = o > 0 ? 1 / o : 1, m = Math.max(0, Math.floor(d * y)), h = Math.max(0, Math.floor(g * y)), x = Math.min(n, Math.ceil((f + 1) * y)), S = Math.min(r, Math.ceil((u + 1) * y)), v = Math.max(1, x - m), p = Math.max(1, S - h), H = m >= I || h >= I || n - (m + v) >= I || r - (h + p) >= I;
  return { x: m, y: h, width: v, height: p, naturalWidth: n, naturalHeight: r, hasTransparentMargin: H };
}
function nt(a, t) {
  const e = a.cellWidth / t.naturalWidth, n = a.cellHeight / t.naturalHeight;
  return { x: a.originX + t.x * e, y: a.originY + t.y * n, width: Math.max(1, t.width * e), height: Math.max(1, t.height * n) };
}
async function rt(a, t, e = {}) {
  const n = Number.isFinite(e.padRatio) ? Math.max(0, e.padRatio) : 1, r = await C(a), o = Math.max(1, r.naturalWidth || r.width), c = Math.max(1, r.naturalHeight || r.height), s = 1 + 2 * n, l = Math.min(1, j / (Math.max(o, c) * Math.max(1, s))), i = Math.max(1, Math.round(o * l)), w = Math.max(1, Math.round(c * l)), d = Math.max(0, Math.round(i * n)), g = Math.max(0, Math.round(w * n)), f = i + d * 2, u = w + g * 2, y = document.createElement("canvas");
  y.width = f, y.height = u;
  const m = y.getContext("2d");
  if (!m) throw new Error("Canvas not available");
  const h = b(t), x = !!h && e.matteCenter !== false;
  m.clearRect(0, 0, f, u), h && (m.fillStyle = h, m.fillRect(0, 0, f, u), x || m.clearRect(d, g, i, w)), m.drawImage(r, d, g, i, w);
  const S = !h || !x, v = await new Promise((p, H) => {
    y.toBlob((M) => {
      M ? p(M) : H(new Error("Pad compose failed"));
    }, S ? "image/png" : "image/jpeg", S ? void 0 : 0.92);
  });
  return { src: URL.createObjectURL(v), meta: { cellWidth: i, cellHeight: w, gridWidth: f, gridHeight: u, originX: d, originY: g } };
}
const Q = 2, J = "data:";
function N(a, t) {
  return (a.getAttribute("src") || "") === t || a.src === t;
}
function E(a, t, e) {
  N(a, e) || (a.src = e), a.dataset.storageHydrated = t, delete a.dataset.storageHydrating;
}
function F(a, t, e) {
  const n = G(t), r = a.getAttribute("src") || "", o = !!r && !r.startsWith(J);
  if (a.dataset.storageHydrated === t && o) {
    n && !N(a, n) && E(a, t, n);
    return;
  }
  if (n) {
    E(a, t, n), a.onerror = () => {
      delete a.dataset.storageHydrated, k(t, e, { skipCache: true }).then((i) => {
        i && E(a, t, i);
      });
    };
    return;
  }
  if (a.dataset.storageHydrating === t) return;
  a.dataset.storageHydrating = t, delete a.dataset.storageHydrated;
  let c = 0;
  const s = () => {
    a.dataset.storageHydrating === t && delete a.dataset.storageHydrating;
  }, l = (i) => {
    if (i) {
      E(a, t, i);
      return;
    }
    s();
  };
  a.onerror = () => {
    if (delete a.dataset.storageHydrated, c >= Q) {
      s();
      return;
    }
    c += 1, a.dataset.storageHydrating = t, k(t, e, { skipCache: true }).then(l);
  }, k(t, e).then(l);
}
function ot(a, { getPresignedUrl: t, currentNotePath: e }) {
  if (!a || typeof t != "function") return 0;
  const n = a.querySelectorAll("img");
  let r = 0;
  return n.forEach((o) => {
    if (!(o instanceof HTMLImageElement)) return;
    const c = o.getAttribute("data-wiki-path");
    if (c) {
      F(o, c, t), r += 1;
      return;
    }
    const s = o.getAttribute("data-md-src") || o.getAttribute("src") || "";
    if (!L(s)) return;
    const l = q(s, e);
    l && (o.getAttribute("data-md-src") || o.setAttribute("data-md-src", O(s)), F(o, l, t), r += 1);
  }), r;
}
function ct(a) {
  const t = String(a || "");
  if (/!\[\[/.test(t)) return true;
  const e = /!\[[^\]]*]\(([^)\n]+)\)/g;
  let n = e.exec(t);
  for (; n; ) {
    if (L(n[1] || "")) return true;
    n = e.exec(t);
  }
  return false;
}
export {
  Z as a,
  V as b,
  rt as c,
  tt as f,
  et as g,
  ot as h,
  _ as i,
  ct as m,
  nt as o,
  at as s
};
