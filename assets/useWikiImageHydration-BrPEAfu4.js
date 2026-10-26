import { r as R } from "./vendor-react-BPvvDyqO.js";
import { p as L, r as b } from "./wikiImageResolver-BX0McZ8Q.js";
import { aK as O, aL as B, aM as q, aN as p } from "./index-BYVoYwQr.js";
const y = "1", T = "chat-retained-images", f = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
let C = null;
function F() {
  const t = document.getElementById(T);
  if (t) return t;
  const e = document.createElement("div");
  return e.id = T, e.setAttribute("aria-hidden", "true"), e.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none;opacity:0;", document.body.appendChild(e), e;
}
function v(t, e) {
  let a = l.get(t);
  a || (a = /* @__PURE__ */ new Set(), l.set(t, a)), a.add(e);
}
function z(t, e) {
  const a = l.get(t);
  if (!a) return;
  a.delete(e), a.size === 0 && l.delete(t);
  const r = f.get(t);
  if (!r) return;
  const c = r.filter((n) => n !== e);
  c.length ? f.set(t, c) : f.delete(t);
}
function G(t) {
  if (t instanceof HTMLImageElement) {
    t.dataset.chatRetain === y && !t.isConnected && S(t);
    return;
  }
  t instanceof Element && t.querySelectorAll('img[data-chat-retain="1"]').forEach((e) => {
    e instanceof HTMLImageElement && !e.isConnected && S(e);
  });
}
function X() {
  C || typeof MutationObserver > "u" || typeof document > "u" || (C = new MutationObserver((t) => {
    for (const e of t) e.removedNodes.forEach((a) => {
      G(a);
    });
  }), C.observe(document.body, { childList: true, subtree: true }));
}
function E(t) {
  t.complete && t.naturalWidth > 0 && (t.style.opacity = "1");
}
function w(t, e) {
  t.alt = e.alt ?? "", t.className = e.className ?? "", t.loading = "eager", t.decoding = "async", t.draggable = e.draggable ?? false, t.style.width = "", t.style.height = "", t.style.maxWidth = "", t.style.maxHeight = "", e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), t.style.backgroundColor = e.backgroundColor ?? "", E(t), t.dataset.chatRetainSrc !== e.src && (t.dataset.chatRetainSrc = e.src, t.src = e.src, E(t));
}
function K(t) {
  const e = document.createElement("img");
  return e.dataset.chatRetain = y, e.style.opacity = "0", e.style.transition = "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1)", e.onload = () => {
    e.style.opacity = "1";
  }, w(e, t), v(t.src, e), e;
}
function V(t) {
  X();
  const e = f.get(t.src), a = e == null ? void 0 : e.pop();
  return a ? (e && e.length === 0 && f.delete(t.src), w(a, t), a) : K(t);
}
function S(t) {
  if (t.dataset.chatRetain !== y) return;
  const e = t.dataset.chatRetainSrc || "";
  if (!e) return;
  const a = f.get(e) ?? [];
  a.includes(t) || (a.push(t), f.set(e, a)), v(e, t);
  const r = F();
  t.parentElement !== r && r.appendChild(t);
}
function j(t, e, a = false) {
  const r = t.dataset.chatRetainSrc || "";
  e && (r === e && !a || (r && r !== e && z(r, t), t.dataset.chatRetain = y, t.dataset.chatRetainSrc = e, a && r === e && t.removeAttribute("src"), t.src = e, v(e, t), E(t)));
}
function J(t) {
  !t || typeof document > "u" || t.querySelectorAll("img").forEach((e) => {
    if (!(e instanceof HTMLImageElement) || !e.isConnected || !e.closest(".chat-message-markdown") || e.dataset.chatRetain === y || e.getAttribute("data-wiki-path") || e.getAttribute("data-md-src")) return;
    const a = e.getAttribute("src") || "";
    if (!a || a.startsWith("data:")) return;
    const r = e.src || a;
    !r || r.startsWith("data:") || W(e, r, { path: r, className: e.className, alt: e.alt, styleAttr: e.getAttribute("style") });
  });
}
function at(t) {
  const e = l.get(t);
  if (!e) {
    f.delete(t);
    return;
  }
  for (const a of e) delete a.dataset.chatRetain, delete a.dataset.chatRetainSrc, a.remove();
  l.delete(t), f.delete(t);
}
function M(t, e) {
  if (t.dataset.storageHydrated = e.path, delete t.dataset.storageHydrating, e.wikiPath ? t.setAttribute("data-wiki-path", e.wikiPath) : t.removeAttribute("data-wiki-path"), e.mdSrc ? t.setAttribute("data-md-src", e.mdSrc) : t.removeAttribute("data-md-src"), e.styleAttr) {
    const a = t.style.opacity, r = t.style.transition;
    t.setAttribute("style", e.styleAttr), t.style.transition = r, t.complete && t.naturalWidth > 0 ? t.style.opacity = "1" : a && (t.style.opacity = a);
  }
  e.backgroundColor && (t.style.backgroundColor = e.backgroundColor);
}
function W(t, e, a) {
  if (t.dataset.chatRetain === y && t.dataset.chatRetainSrc === e) return w(t, { src: e, alt: a.alt ?? t.alt, className: a.className ?? t.className, ...a.backgroundColor ? { backgroundColor: a.backgroundColor } : {} }), M(t, a), t;
  const r = V({ src: e, alt: a.alt ?? "", className: a.className ?? t.className, ...a.backgroundColor ? { backgroundColor: a.backgroundColor } : {} });
  return M(r, a), t.isConnected && t !== r ? t.replaceWith(r) : r.isConnected || S(r), r;
}
const _ = 2, Q = "data:";
function D(t, e) {
  return (t.getAttribute("src") || "") === e || t.src === e;
}
function k(t, e, a) {
  D(t, a) || (t.src = a), t.dataset.storageHydrated = e, delete t.dataset.storageHydrating;
}
function Y(t) {
  return !!t.closest(".chat-message-markdown");
}
function Z(t, e, a) {
  if (!t.isConnected && t.dataset.chatRetain !== "1") return;
  const r = L(e);
  if (t.dataset.chatRetain === "1" && t.dataset.storageHydrated === e && r && t.dataset.chatRetainSrc === r) return;
  const c = (n) => {
    const s = W(t, n, { path: e, className: t.className, alt: t.alt, styleAttr: t.getAttribute("style"), wikiPath: t.getAttribute("data-wiki-path"), mdSrc: t.getAttribute("data-md-src") });
    s.onerror = () => {
      const i = Number(s.dataset.storageHydrateTries || "0");
      i >= _ || (s.dataset.storageHydrateTries = String(i + 1), delete s.dataset.storageHydrated, b(e, a, { skipCache: true }).then((o) => {
        o && (j(s, o, true), s.dataset.storageHydrated = e);
      }));
    };
  };
  if (r) {
    c(r);
    return;
  }
  t.dataset.storageHydrating !== e && (t.dataset.storageHydrating = e, delete t.dataset.storageHydrated, b(e, a).then((n) => {
    delete t.dataset.storageHydrating, n && c(n);
  }));
}
function N(t, e, a) {
  if (Y(t)) {
    Z(t, e, a);
    return;
  }
  const r = L(e), c = t.getAttribute("src") || "", n = !!c && !c.startsWith(Q);
  if (t.dataset.storageHydrated === e && n) {
    r && !D(t, r) && k(t, e, r);
    return;
  }
  if (r) {
    k(t, e, r), t.onerror = () => {
      delete t.dataset.storageHydrated, b(e, a, { skipCache: true }).then((d) => {
        d && k(t, e, d);
      });
    };
    return;
  }
  if (t.dataset.storageHydrating === e) return;
  t.dataset.storageHydrating = e, delete t.dataset.storageHydrated;
  let s = 0;
  const i = () => {
    t.dataset.storageHydrating === e && delete t.dataset.storageHydrating;
  }, o = (d) => {
    if (d) {
      k(t, e, d);
      return;
    }
    i();
  };
  t.onerror = () => {
    if (delete t.dataset.storageHydrated, s >= _) {
      i();
      return;
    }
    s += 1, t.dataset.storageHydrating = e, b(e, a, { skipCache: true }).then(o);
  }, b(e, a).then(o);
}
function A(t, { getPresignedUrl: e, currentNotePath: a }) {
  if (!t || typeof e != "function") return 0;
  const r = t.querySelectorAll("img");
  let c = 0;
  return r.forEach((n) => {
    if (!(n instanceof HTMLImageElement)) return;
    const s = n.getAttribute("data-wiki-path");
    if (s) {
      N(n, s, e), c += 1;
      return;
    }
    const i = n.getAttribute("data-md-src") || n.getAttribute("src") || "";
    if (!O(i)) return;
    const o = B(i, a);
    o && (n.getAttribute("data-md-src") || n.setAttribute("data-md-src", q(i)), N(n, o, e), c += 1);
  }), J(t), c;
}
function g(t) {
  const e = String(t || "");
  if (/!\[\[/.test(e)) return true;
  const a = /!\[[^\]]*]\(([^)\n]+)\)/g;
  let r = a.exec(e);
  for (; r; ) {
    if (O(r[1] || "")) return true;
    r = a.exec(e);
  }
  return false;
}
function rt(t, e, a, r = null, c = {}) {
  const { enabled: n = true, echoMarkdownRef: s } = c, i = R.useRef(e);
  i.current = e, R.useEffect(() => {
    if (!n || !a) return;
    let o = false, d = null;
    const H = (u) => {
      !u || d || typeof MutationObserver > "u" || (d = new MutationObserver(() => {
        o || h();
      }), d.observe(u, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-wiki-path", "data-md-src"] }));
    }, h = () => {
      if (o) return;
      const u = (t == null ? void 0 : t.current) ?? null;
      H(u), !(A(u, { getPresignedUrl: a, currentNotePath: r }) > 0) && g(i.current) && A(document, { getPresignedUrl: a, currentNotePath: r });
    };
    H((t == null ? void 0 : t.current) ?? null);
    const x = [0, 100, 350, 700].map((u) => setTimeout(h, u)), I = () => h(), m = () => h();
    return window.addEventListener("online", I), window.addEventListener(p, m), () => {
      o = true, x.forEach((u) => clearTimeout(u)), d == null ? void 0 : d.disconnect(), d = null, window.removeEventListener("online", I), window.removeEventListener(p, m);
    };
  }, [n, a, t, r]), R.useEffect(() => {
    !n || !a || !e || (s == null ? void 0 : s.current) !== e && g(e) && A((t == null ? void 0 : t.current) ?? null, { getPresignedUrl: a, currentNotePath: r });
  }, [n, e, a, t, r, s]);
}
export {
  V as a,
  at as f,
  A as h,
  g as m,
  S as p,
  J as r,
  rt as u
};
