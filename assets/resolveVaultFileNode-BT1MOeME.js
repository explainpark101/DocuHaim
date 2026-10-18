import { S as m, ah as l, ai as s, aj as p, Q as y, ak as h } from "./index-BP7C--nq.js";
function M(n) {
  const i = String(n || "").trim();
  if (!i) return "";
  const e = i.lastIndexOf("/");
  return e >= 0 ? i.slice(e + 1) : i;
}
async function S(n, i) {
  const e = String(n || "").trim();
  if (!e) return null;
  const { storageType: o, localTree: d, webdavTree: r, idbTree: f, s3Tree: u, localRootHandle: c } = i;
  let t = null;
  if (o === m ? t = l(d, e) || s(d, e) || (c ? await p(c, e) : null) : o === y ? t = l(r, e) || s(r, e) : o === h ? t = l(f, e) || s(f, e) : t = l(u, e) || s(u, e), (t == null ? void 0 : t.type) !== "file") return { type: "file", path: e, name: M(e) };
  const a = { type: "file", path: String(t.path || e), name: String(t.name || M(e)) };
  return t.lastModified instanceof Date || typeof t.lastModified == "number" ? a.lastModified = t.lastModified : typeof t.lastModified == "string" && t.lastModified && (a.lastModified = new Date(t.lastModified)), a;
}
export {
  S as r,
  M as v
};
