import { r as y } from "./vendor-react-BLJzfvPB.js";
import { p as R, r as S } from "./wikiImageResolver-DqdWG2ay.js";
import { a5 as I, a6 as L, a7 as T, a8 as m } from "./index-_Cgkc3J6.js";
const C = 2, p = "data:";
function k(t, e) {
  return (t.getAttribute("src") || "") === e || t.src === e;
}
function l(t, e, r) {
  k(t, r) || (t.src = r), t.dataset.storageHydrated = e, delete t.dataset.storageHydrating;
}
function v(t, e, r) {
  const n = R(e), c = t.getAttribute("src") || "", a = !!c && !c.startsWith(p);
  if (t.dataset.storageHydrated === e && a) {
    n && !k(t, n) && l(t, e, n);
    return;
  }
  if (n) {
    l(t, e, n), t.onerror = () => {
      delete t.dataset.storageHydrated, S(e, r, { skipCache: true }).then((d) => {
        d && l(t, e, d);
      });
    };
    return;
  }
  if (t.dataset.storageHydrating === e) return;
  t.dataset.storageHydrating = e, delete t.dataset.storageHydrated;
  let u = 0;
  const o = () => {
    t.dataset.storageHydrating === e && delete t.dataset.storageHydrating;
  }, s = (d) => {
    if (d) {
      l(t, e, d);
      return;
    }
    o();
  };
  t.onerror = () => {
    if (delete t.dataset.storageHydrated, u >= C) {
      o();
      return;
    }
    u += 1, t.dataset.storageHydrating = e, S(e, r, { skipCache: true }).then(s);
  }, S(e, r).then(s);
}
function E(t, { getPresignedUrl: e, currentNotePath: r }) {
  if (!t || typeof e != "function") return 0;
  const n = t.querySelectorAll("img");
  let c = 0;
  return n.forEach((a) => {
    if (!(a instanceof HTMLImageElement)) return;
    const u = a.getAttribute("data-wiki-path");
    if (u) {
      v(a, u, e), c += 1;
      return;
    }
    const o = a.getAttribute("data-md-src") || a.getAttribute("src") || "";
    if (!I(o)) return;
    const s = L(o, r);
    s && (a.getAttribute("data-md-src") || a.setAttribute("data-md-src", T(o)), v(a, s, e), c += 1);
  }), c;
}
function w(t) {
  const e = String(t || "");
  if (/!\[\[/.test(e)) return true;
  const r = /!\[[^\]]*]\(([^)\n]+)\)/g;
  let n = r.exec(e);
  for (; n; ) {
    if (I(n[1] || "")) return true;
    n = r.exec(e);
  }
  return false;
}
function W(t, e, r, n = null, c = {}) {
  const { enabled: a = true } = c, u = y.useRef(e);
  u.current = e, y.useEffect(() => {
    if (!a || !r) return;
    let o = false, s = null;
    const d = (i) => {
      !i || s || typeof MutationObserver > "u" || (s = new MutationObserver(() => {
        o || f();
      }), s.observe(i, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-wiki-path", "data-md-src"] }));
    }, f = () => {
      if (o) return;
      const i = (t == null ? void 0 : t.current) ?? null;
      d(i), !(E(i, { getPresignedUrl: r, currentNotePath: n }) > 0) && w(u.current) && E(document, { getPresignedUrl: r, currentNotePath: n });
    };
    d((t == null ? void 0 : t.current) ?? null);
    const A = [0, 100, 350, 700].map((i) => setTimeout(f, i)), b = () => f(), H = () => f();
    return window.addEventListener("online", b), window.addEventListener(m, H), () => {
      o = true, A.forEach((i) => clearTimeout(i)), s == null ? void 0 : s.disconnect(), s = null, window.removeEventListener("online", b), window.removeEventListener(m, H);
    };
  }, [a, r, t, n]), y.useEffect(() => {
    !a || !r || !e || w(e) && E((t == null ? void 0 : t.current) ?? null, { getPresignedUrl: r, currentNotePath: n });
  }, [a, e, r, t, n]);
}
export {
  W as u
};
