const c = ["image/jpeg", "image/png", "image/webp", "image/gif"];
function m(e) {
  return new Promise((t, a) => {
    const n = new FileReader();
    n.onload = () => t(String(n.result || "")), n.onerror = () => a(new Error(`\uC774\uBBF8\uC9C0\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4: ${e.name}`)), n.readAsDataURL(e);
  });
}
function d(e) {
  return new Promise((t, a) => {
    const n = new Image();
    n.onload = () => t(n), n.onerror = () => a(new Error("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")), n.src = e;
  });
}
function l(e, t, a) {
  return new Promise((n, r) => {
    e.toBlob((i) => {
      i ? n(i) : r(new Error("\uC774\uBBF8\uC9C0 \uC555\uCD95\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
    }, t, a);
  });
}
async function f(e) {
  const t = await m(e), a = await d(t), n = Math.min(1, 2048 / Math.max(a.width, a.height)), r = Math.max(1, Math.round(a.width * n)), i = Math.max(1, Math.round(a.height * n)), o = document.createElement("canvas");
  o.width = r, o.height = i;
  const g = o.getContext("2d");
  if (!g) throw new Error("\uC774\uBBF8\uC9C0 \uB9AC\uC0AC\uC774\uC988\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
  g.drawImage(a, 0, 0, r, i);
  const s = e.type === "image/png" ? "image/png" : "image/jpeg", p = await l(o, s, s === "image/jpeg" ? 0.88 : void 0);
  return m(new File([p], e.name, { type: s }));
}
function h(e) {
  const t = /^data:([^;]+);base64,(.+)$/.exec(e);
  if (!t) throw new Error("\uC774\uBBF8\uC9C0 \uB370\uC774\uD130 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
  return { mimeType: t[1], dataBase64: t[2] };
}
function w(e) {
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
function u(e) {
  if (e.name) return e;
  const t = w(e.type);
  return new File([e], `clipboard-${Date.now()}.${t}`, { type: e.type });
}
function S(e) {
  var _a;
  if (!e) return [];
  const t = [], a = /* @__PURE__ */ new Set(), n = (r) => {
    if (!r || !r.type.startsWith("image/")) return;
    const i = `${r.type}:${r.size}:${r.lastModified}`;
    a.has(i) || (a.add(i), t.push(u(r)));
  };
  if (e.items) for (const r of e.items) r.kind === "file" && r.type.startsWith("image/") && n(r.getAsFile());
  if (!t.length && ((_a = e.files) == null ? void 0 : _a.length)) for (const r of e.files) n(r);
  return t;
}
async function I() {
  var _a;
  if (typeof navigator > "u" || !((_a = navigator.clipboard) == null ? void 0 : _a.read)) throw new Error("\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0 \uC77D\uAE30\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Ctrl/Cmd+V\uB85C \uBD99\uC5EC\uB123\uC5B4 \uC8FC\uC138\uC694.");
  try {
    const e = await navigator.clipboard.read(), t = [];
    for (const a of e) {
      const n = a.types.find((o) => c.includes(o));
      if (!n) continue;
      const r = await a.getType(n), i = r.type || n;
      c.includes(i) && t.push(u(new File([r], "", { type: i })));
    }
    return t;
  } catch (e) {
    throw (e == null ? void 0 : e.name) === "NotAllowedError" || (e == null ? void 0 : e.name) === "SecurityError" ? new Error("\uD074\uB9BD\uBCF4\uB4DC \uC811\uADFC\uC774 \uAC70\uBD80\uB418\uC5C8\uC2B5\uB2C8\uB2E4. Ctrl/Cmd+V\uB85C \uBD99\uC5EC\uB123\uAC70\uB098 \uD30C\uC77C\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.") : e;
  }
}
async function y(e) {
  const t = u(e);
  if (!c.includes(t.type)) throw new Error("JPEG, PNG, WebP, GIF \uC774\uBBF8\uC9C0\uB9CC \uCCA8\uBD80\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
  if (t.size > 4194304) throw new Error(`\uC774\uBBF8\uC9C0\uB294 \uD30C\uC77C\uB2F9 ${Math.round(4194304 / (1024 * 1024))}MB \uC774\uD558\uC5EC\uC57C \uD569\uB2C8\uB2E4.`);
  const a = t.size > 1572864 ? await f(t) : await m(t), { mimeType: n, dataBase64: r } = h(a);
  return { id: crypto.randomUUID(), name: t.name, mimeType: n, dataBase64: r, previewDataUrl: a };
}
async function M(e, t = 0) {
  const a = [...e].filter((r) => r.type.startsWith("image/"));
  if (!a.length) throw new Error("\uC774\uBBF8\uC9C0 \uD30C\uC77C\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
  const n = [];
  for (const r of a) n.push(await y(r));
  return n;
}
function _(e) {
  if (!e || typeof e != "object") return null;
  const t = typeof e.id == "string" ? e.id : "", a = typeof e.name == "string" ? e.name : "image", n = typeof e.mimeType == "string" ? e.mimeType : "", r = typeof e.dataBase64 == "string" ? e.dataBase64 : "";
  if (!t || !n || !r) return null;
  const i = typeof e.previewDataUrl == "string" && e.previewDataUrl.startsWith("data:") ? e.previewDataUrl : `data:${n};base64,${r}`;
  return { id: t, name: a, mimeType: n, dataBase64: r, previewDataUrl: i };
}
export {
  I as a,
  S as e,
  _ as n,
  M as r
};
