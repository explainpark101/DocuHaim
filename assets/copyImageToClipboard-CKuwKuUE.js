function u(t) {
  return t.isComposing || t.altKey || t.shiftKey || !(t.metaKey || t.ctrlKey) ? false : t.key.toLowerCase() === "c";
}
function l() {
  var _a;
  return typeof navigator < "u" && typeof ((_a = navigator.clipboard) == null ? void 0 : _a.write) == "function" && typeof ClipboardItem < "u";
}
async function m(t) {
  const e = await f(t);
  try {
    return await i(e);
  } finally {
    if ("close" in e && typeof e.close == "function") try {
      e.close();
    } catch {
    }
  }
}
function g(t) {
  if (!l()) return Promise.reject(new Error("Clipboard image write is not supported"));
  const e = Promise.resolve(t).then((n) => n.type === "image/png" ? n : h(n));
  return navigator.clipboard.write([new ClipboardItem({ "image/png": e })]);
}
function p(t) {
  return g(m(t));
}
async function f(t) {
  try {
    const e = await fetch(t, { mode: "cors", credentials: "omit" });
    if (!e.ok) throw new Error(`fetch ${e.status}`);
    const n = await e.blob();
    return await createImageBitmap(n);
  } catch {
    return await d(t);
  }
}
function d(t) {
  return new Promise((e, n) => {
    const a = new Image();
    a.crossOrigin = "anonymous", a.onload = () => e(a), a.onerror = () => n(new Error("Image load failed")), a.src = t;
  });
}
async function h(t) {
  const e = await createImageBitmap(t);
  try {
    return await i(e);
  } finally {
    e.close();
  }
}
function i(t) {
  const e = t instanceof HTMLImageElement && t.naturalWidth || t.width, n = t instanceof HTMLImageElement && t.naturalHeight || t.height, a = document.createElement("canvas");
  a.width = Math.max(1, Math.round(e)), a.height = Math.max(1, Math.round(n));
  const o = a.getContext("2d");
  return o ? (o.drawImage(t, 0, 0, a.width, a.height), new Promise((c, s) => {
    a.toBlob((r) => {
      r ? c(r) : s(new Error("Failed to encode PNG"));
    }, "image/png");
  })) : Promise.reject(new Error("Canvas 2D unavailable"));
}
export {
  m as a,
  g as b,
  p as c,
  u as i
};
