import { A as o, D as f } from "./index-RydzSnnb.js";
function u(t) {
  var _a, _b, _c, _d;
  if (o("collect:incoming", { hasData: !!t, filesLength: ((_a = t == null ? void 0 : t.files) == null ? void 0 : _a.length) ?? 0, itemsLength: ((_b = t == null ? void 0 : t.items) == null ? void 0 : _b.length) ?? 0 }), !t) return o("collect:result", { count: 0, reason: "no data" }), [];
  const s = [], l = /* @__PURE__ */ new Set(), n = (e) => {
    if (!e || !e.size) return;
    const i = String(e.size);
    l.has(i) || (l.add(i), s.push(e));
  };
  if ((_c = t.files) == null ? void 0 : _c.length) for (const e of t.files) e && (((_d = e.type) == null ? void 0 : _d.startsWith("image/")) || !e.type && e.size > 0) && n(e);
  if (t.items) for (const e of t.items) {
    if (e.kind !== "file") continue;
    const i = e.type || "";
    if (i.startsWith("image/") || i === "") {
      const c = e.getAsFile();
      c && n(c);
    }
  }
  return o("collect:result", { count: s.length, files: f(s) }), s;
}
export {
  u as c
};
