const _ = 4;
const u = ["image/jpeg", "image/png", "image/webp", "image/gif"];
function c(e) {
  return new Promise((t, r) => {
    const n = new FileReader();
    n.onload = () => t(String(n.result || "")), n.onerror = () => r(new Error(`\uC774\uBBF8\uC9C0\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4: ${e.name}`)), n.readAsDataURL(e);
  });
}
function h(e) {
  return new Promise((t, r) => {
    const n = new Image();
    n.onload = () => t(n), n.onerror = () => r(new Error("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")), n.src = e;
  });
}
function S(e, t, r) {
  return new Promise((n, a) => {
    e.toBlob((i) => {
      i ? n(i) : a(new Error("\uC774\uBBF8\uC9C0 \uC555\uCD95\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
    }, t, r);
  });
}
async function d(e) {
  const t = await c(e), r = await h(t), n = Math.min(1, 2048 / Math.max(r.width, r.height)), a = Math.max(1, Math.round(r.width * n)), i = Math.max(1, Math.round(r.height * n)), o = document.createElement("canvas");
  o.width = a, o.height = i;
  const m = o.getContext("2d");
  if (!m) throw new Error("\uC774\uBBF8\uC9C0 \uB9AC\uC0AC\uC774\uC988\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
  m.drawImage(r, 0, 0, a, i);
  const s = e.type === "image/png" ? "image/png" : "image/jpeg", p = await S(o, s, s === "image/jpeg" ? 0.88 : void 0);
  return c(new File([p], e.name, { type: s }));
}
function f(e) {
  const t = /^data:([^;]+);base64,(.+)$/.exec(e);
  if (!t) throw new Error("\uC774\uBBF8\uC9C0 \uB370\uC774\uD130 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
  return { mimeType: t[1], dataBase64: t[2] };
}
function l(e) {
  switch (e) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "png";
  }
}
function g(e) {
  if (e.name) return e;
  const t = l(e.type);
  return new File([e], `clipboard-${Date.now()}.${t}`, { type: e.type });
}
function w(e) {
  var _a;
  if (!e) return [];
  const t = [], r = /* @__PURE__ */ new Set(), n = (a) => {
    if (!a || !a.type.startsWith("image/")) return;
    const i = `${a.type}:${a.size}:${a.lastModified}`;
    r.has(i) || (r.add(i), t.push(g(a)));
  };
  if (e.items) for (const a of e.items) a.kind === "file" && a.type.startsWith("image/") && n(a.getAsFile());
  if (!t.length && ((_a = e.files) == null ? void 0 : _a.length)) for (const a of e.files) n(a);
  return t;
}
async function E(e) {
  const t = g(e);
  if (!u.includes(t.type)) throw new Error("JPEG, PNG, WebP, GIF \uC774\uBBF8\uC9C0\uB9CC \uCCA8\uBD80\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
  if (t.size > 4194304) throw new Error(`\uC774\uBBF8\uC9C0\uB294 \uD30C\uC77C\uB2F9 ${Math.round(4194304 / (1024 * 1024))}MB \uC774\uD558\uC5EC\uC57C \uD569\uB2C8\uB2E4.`);
  const r = t.size > 1572864 ? await d(t) : await c(t), { mimeType: n, dataBase64: a } = f(r);
  return { id: crypto.randomUUID(), name: t.name, mimeType: n, dataBase64: a, previewDataUrl: r };
}
async function I(e, t = 0) {
  const r = [...e].filter((i) => i.type.startsWith("image/"));
  if (!r.length) throw new Error("\uC774\uBBF8\uC9C0 \uD30C\uC77C\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
  const n = 4 - t;
  if (n <= 0) throw new Error("\uC774\uBBF8\uC9C0\uB294 \uCD5C\uB300 4\uC7A5\uAE4C\uC9C0 \uCCA8\uBD80\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
  if (r.length > n) throw new Error(`\uC774\uBBF8\uC9C0\uB294 \uCD5C\uB300 4\uC7A5\uAE4C\uC9C0 \uCCA8\uBD80\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uD604\uC7AC ${t}\uC7A5)`);
  const a = [];
  for (const i of r) a.push(await E(i));
  return a;
}
function A(e) {
  if (!e || typeof e != "object") return null;
  const t = typeof e.id == "string" ? e.id : "", r = typeof e.name == "string" ? e.name : "image", n = typeof e.mimeType == "string" ? e.mimeType : "", a = typeof e.dataBase64 == "string" ? e.dataBase64 : "";
  if (!t || !n || !a) return null;
  const i = typeof e.previewDataUrl == "string" && e.previewDataUrl.startsWith("data:") ? e.previewDataUrl : `data:${n};base64,${a}`;
  return { id: t, name: r, mimeType: n, dataBase64: a, previewDataUrl: i };
}
export {
  _ as L,
  w as e,
  A as n,
  I as r
};
