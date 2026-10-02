import { S as m, aj as l, ak as i, al as p, P as O, am as S } from "./index-IR2VeToL.js";
function c(n) {
  const t = String(n || "").trim();
  if (!t) return "";
  const e = t.lastIndexOf("/");
  return e >= 0 ? t.slice(e + 1) : t;
}
async function h(n, t) {
  const e = String(n || "").trim();
  if (!e) return null;
  const { storageType: r, localTree: s, webdavTree: o, idbTree: d, s3Tree: f, localRootHandle: u } = t;
  let a = null;
  return r === m ? a = l(s, e) || i(s, e) || (u ? await p(u, e) : null) : r === O ? a = l(o, e) || i(o, e) : r === S ? a = l(d, e) || i(d, e) : a = l(f, e) || i(f, e), (a == null ? void 0 : a.type) !== "file" ? { type: "file", path: e, name: c(e) } : { type: "file", path: String(a.path || e), name: String(a.name || c(e)), ...a.lastModified != null ? { lastModified: a.lastModified } : {} };
}
export {
  h as r,
  c as v
};
