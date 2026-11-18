import { a0 as m, at as l, au as s, av as p, a1 as y, aw as O } from "./index-BoYUXkF3.js";
function M(n) {
  const a = String(n || "").trim();
  if (!a) return "";
  const e = a.lastIndexOf("/");
  return e >= 0 ? a.slice(e + 1) : a;
}
async function h(n, a) {
  const e = String(n || "").trim();
  if (!e) return null;
  const { storageType: o, localTree: d, webdavTree: r, idbTree: f, s3Tree: u, localRootHandle: c } = a;
  let t = null;
  if (o === m ? t = l(d, e) || s(d, e) || (c ? await p(c, e) : null) : o === y ? t = l(r, e) || s(r, e) : o === O ? t = l(f, e) || s(f, e) : t = l(u, e) || s(u, e), (t == null ? void 0 : t.type) !== "file") return { type: "file", path: e, name: M(e) };
  const i = { type: "file", path: String(t.path || e), name: String(t.name || M(e)) };
  return t.lastModified instanceof Date || typeof t.lastModified == "number" ? i.lastModified = t.lastModified : typeof t.lastModified == "string" && t.lastModified && (i.lastModified = new Date(t.lastModified)), i;
}
export {
  h as r,
  M as v
};
