import { U as m, ao as l, ap as i, aq as p, V as O, ar as T } from "./index-C7uJeeaR.js";
function c(n) {
  const t = String(n || "").trim();
  if (!t) return "";
  const e = t.lastIndexOf("/");
  return e >= 0 ? t.slice(e + 1) : t;
}
async function y(n, t) {
  const e = String(n || "").trim();
  if (!e) return null;
  const { storageType: r, localTree: s, webdavTree: o, idbTree: d, s3Tree: f, localRootHandle: u } = t;
  let a = null;
  return r === m ? a = l(s, e) || i(s, e) || (u ? await p(u, e) : null) : r === O ? a = l(o, e) || i(o, e) : r === T ? a = l(d, e) || i(d, e) : a = l(f, e) || i(f, e), (a == null ? void 0 : a.type) !== "file" ? { type: "file", path: e, name: c(e) } : { type: "file", path: String(a.path || e), name: String(a.name || c(e)), ...a.lastModified != null ? { lastModified: a.lastModified } : {} };
}
export {
  y as r,
  c as v
};
