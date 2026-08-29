import { E as y, F as H, G as g, H as I, I as f } from "./index--RQb7Uss.js";
const k = 2, A = "data:";
function S(t, e) {
  return (t.getAttribute("src") || "") === e || t.src === e;
}
function u(t, e, r) {
  S(t, r) || (t.src = r), t.dataset.storageHydrated = e, delete t.dataset.storageHydrating;
}
function l(t, e, r) {
  const a = I(e), n = t.getAttribute("src") || "", s = !!n && !n.startsWith(A);
  if (t.dataset.storageHydrated === e && s) {
    a && !S(t, a) && u(t, e, a);
    return;
  }
  if (a) {
    u(t, e, a), t.onerror = () => {
      delete t.dataset.storageHydrated, f(e, r, { skipCache: true }).then((i) => {
        i && u(t, e, i);
      });
    };
    return;
  }
  if (t.dataset.storageHydrating === e) return;
  t.dataset.storageHydrating = e, delete t.dataset.storageHydrated;
  let c = 0;
  const o = () => {
    t.dataset.storageHydrating === e && delete t.dataset.storageHydrating;
  }, d = (i) => {
    if (i) {
      u(t, e, i);
      return;
    }
    o();
  };
  t.onerror = () => {
    if (delete t.dataset.storageHydrated, c >= k) {
      o();
      return;
    }
    c += 1, t.dataset.storageHydrating = e, f(e, r, { skipCache: true }).then(d);
  }, f(e, r).then(d);
}
function b(t, { getPresignedUrl: e, currentNotePath: r }) {
  if (!t || typeof e != "function") return 0;
  const a = t.querySelectorAll("img");
  let n = 0;
  return a.forEach((s) => {
    if (!(s instanceof HTMLImageElement)) return;
    const c = s.getAttribute("data-wiki-path");
    if (c) {
      l(s, c, e), n += 1;
      return;
    }
    const o = s.getAttribute("data-md-src") || s.getAttribute("src") || "";
    if (!y(o)) return;
    const d = H(o, r);
    d && (s.getAttribute("data-md-src") || s.setAttribute("data-md-src", g(o)), l(s, d, e), n += 1);
  }), n;
}
function E(t) {
  const e = String(t || "");
  if (/!\[\[/.test(e)) return true;
  const r = /!\[[^\]]*]\(([^)\n]+)\)/g;
  let a = r.exec(e);
  for (; a; ) {
    if (y(a[1] || "")) return true;
    a = r.exec(e);
  }
  return false;
}
export {
  b as h,
  E as m
};
