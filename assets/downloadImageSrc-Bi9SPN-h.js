import { a3 as m } from "./index-BYVoYwQr.js";
function I(t) {
  return t.isComposing || t.altKey || t.shiftKey || !(t.metaKey || t.ctrlKey) ? false : t.key.toLowerCase() === "c";
}
function g() {
  var _a;
  return typeof navigator < "u" && typeof ((_a = navigator.clipboard) == null ? void 0 : _a.write) == "function" && typeof ClipboardItem < "u";
}
async function c(t) {
  const e = await d(t);
  try {
    return await l(e);
  } finally {
    if ("close" in e && typeof e.close == "function") try {
      e.close();
    } catch {
    }
  }
}
function f(t) {
  if (!g()) return Promise.reject(new Error("Clipboard image write is not supported"));
  const e = Promise.resolve(t).then((a) => a.type === "image/png" ? a : u(a));
  return navigator.clipboard.write([new ClipboardItem({ "image/png": e })]);
}
function C(t) {
  return f(c(t));
}
async function d(t) {
  try {
    const e = await fetch(t, { mode: "cors", credentials: "omit" });
    if (!e.ok) throw new Error(`fetch ${e.status}`);
    const a = await e.blob();
    return await createImageBitmap(a);
  } catch {
    return await p(t);
  }
}
function p(t) {
  return new Promise((e, a) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.onload = () => e(n), n.onerror = () => a(new Error("Image load failed")), n.src = t;
  });
}
async function u(t) {
  const e = await createImageBitmap(t);
  try {
    return await l(e);
  } finally {
    e.close();
  }
}
function l(t) {
  const e = t instanceof HTMLImageElement && t.naturalWidth || t.width, a = t instanceof HTMLImageElement && t.naturalHeight || t.height, n = document.createElement("canvas");
  n.width = Math.max(1, Math.round(e)), n.height = Math.max(1, Math.round(a));
  const r = n.getContext("2d");
  return r ? (r.drawImage(t, 0, 0, n.width, n.height), new Promise((o, s) => {
    n.toBlob((i) => {
      i ? o(i) : s(new Error("Failed to encode PNG"));
    }, "image/png");
  })) : Promise.reject(new Error("Canvas 2D unavailable"));
}
const w = /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i;
function h(t, e = "png") {
  const a = e.replace(/^\./, "") || "png", n = `image.${a}`;
  try {
    const r = new URL(t, "https://local.invalid"), o = decodeURIComponent(r.pathname.split("/").filter(Boolean).pop() || "");
    return !o || o === "." || o === ".." || o.includes("..") ? n : w.test(o) ? o : `${o}.${a}`;
  } catch {
    return n;
  }
}
function b(t, e) {
  return m(t, e);
}
async function E(t) {
  let e, a = h(t);
  try {
    const n = await fetch(t, { mode: "cors", credentials: "omit" });
    if (!n.ok) throw new Error(`fetch ${n.status}`);
    e = await n.blob();
  } catch {
    e = await c(t), a = a.replace(/\.[^.]+$/i, ""), (!a || a === "image") && (a = "image"), a = `${a}.png`;
  }
  return b(e, a);
}
export {
  f as a,
  h as b,
  C as c,
  E as d,
  b as e,
  I as i
};
