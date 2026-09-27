import { aF as k, aG as y, aH as W } from "./index-DJNs5ruw.js";
import { l as v, W as I, a as w } from "./wikiImageSettings-Cji60Ojw.js";
const c = new k("s3haim-wiki-image-cache");
c.version(1).stores({ urls: "path, expiresAt" });
c.version(2).stores({ blobs: "path, createdAt" });
async function C(e) {
  const n = await c.table("blobs").where("path").equals(e).first();
  return !n || !n.blob ? null : URL.createObjectURL(n.blob);
}
async function R({ path: e, blob: r }) {
  await c.table("blobs").put({ path: e, blob: r, createdAt: Date.now() });
}
async function L(e) {
  const n = await c.table("urls").where("path").equals(e).first();
  if (!n) return null;
  const t = Date.now();
  return n.expiresAt <= t ? null : n.url;
}
async function A(e) {
  await c.table("urls").put(e);
}
let u = v();
function U() {
  return u !== I && u !== w && (u = I), u;
}
const f = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
function _(e) {
  return e && s.get(e) || null;
}
function b(e, r) {
  if (!e || !r) return;
  const n = s.get(e);
  if (n && n !== r && typeof n == "string" && n.startsWith("blob:")) try {
    URL.revokeObjectURL(n);
  } catch {
  }
  s.set(e, r);
}
function M(e) {
  if (!e) return;
  const r = s.get(e);
  if (s.delete(e), r && typeof r == "string" && r.startsWith("blob:")) try {
    URL.revokeObjectURL(r);
  } catch {
  }
}
function j(e, r, n = {}) {
  if (!e) return Promise.resolve(null);
  const t = String(e).trim();
  if (/^(https?:|data:|blob:|\/\/)/i.test(t)) return Promise.resolve(t);
  if (typeof r != "function") return Promise.resolve(null);
  const m = n.skipCache === true;
  if (!m) {
    const a = s.get(t);
    if (a) return Promise.resolve(a);
  }
  const l = m ? `${t}:refresh` : t;
  if (f.has(l)) return f.get(l);
  const h = () => r(t).then(async (a) => {
    if (!a) return null;
    if (U() === w) {
      const i = Date.now() + 36e5;
      return await A({ path: t, url: a, expiresAt: i }), b(t, a), a;
    }
    try {
      const i = await fetch(a);
      if (!i.ok) return null;
      let o = await i.blob();
      y(t) && (o = await W(o, t)), await R({ path: t, blob: o });
      const p = URL.createObjectURL(o);
      return b(t, p), p;
    } catch {
      return null;
    }
  }), g = m ? (async () => (M(t), h()))() : (async () => {
    if (U() === w) {
      const o = await L(t);
      return o ? (b(t, o), o) : h();
    }
    const d = s.get(t);
    if (d) return d;
    const i = await C(t);
    return i ? (b(t, i), i) : h();
  })();
  return f.set(l, g), g.finally(() => {
    f.delete(l);
  }), g;
}
export {
  _ as p,
  j as r
};
