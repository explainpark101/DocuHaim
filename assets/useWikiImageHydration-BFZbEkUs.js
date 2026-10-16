import { r as R } from "./vendor-react-ChQ1w2We.js";
import { p as M, r as b } from "./wikiImageResolver-DRvDqU3Y.js";
import { aJ as N, aK as x, aL as B, aM as m } from "./index-DMn6By0P.js";
const y = "1", p = "chat-retained-images", u = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
let C = null;
function q() {
  const t = document.getElementById(p);
  if (t) return t;
  const e = document.createElement("div");
  return e.id = p, e.setAttribute("aria-hidden", "true"), e.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none;opacity:0;", document.body.appendChild(e), e;
}
function S(t, e) {
  let a = l.get(t);
  a || (a = /* @__PURE__ */ new Set(), l.set(t, a)), a.add(e);
}
function F(t, e) {
  const a = l.get(t);
  if (!a) return;
  a.delete(e), a.size === 0 && l.delete(t);
  const r = u.get(t);
  if (!r) return;
  const i = r.filter((n) => n !== e);
  i.length ? u.set(t, i) : u.delete(t);
}
function z(t) {
  if (t instanceof HTMLImageElement) {
    t.dataset.chatRetain === y && !t.isConnected && E(t);
    return;
  }
  t instanceof Element && t.querySelectorAll('img[data-chat-retain="1"]').forEach((e) => {
    e instanceof HTMLImageElement && !e.isConnected && E(e);
  });
}
function G() {
  C || typeof MutationObserver > "u" || typeof document > "u" || (C = new MutationObserver((t) => {
    for (const e of t) e.removedNodes.forEach((a) => {
      z(a);
    });
  }), C.observe(document.body, { childList: true, subtree: true }));
}
function A(t) {
  t.complete && t.naturalWidth > 0 && (t.style.opacity = "1");
}
function H(t, e) {
  t.alt = e.alt ?? "", t.className = e.className ?? "", t.loading = "eager", t.decoding = "async", t.draggable = e.draggable ?? false, t.style.width = "", t.style.height = "", t.style.maxWidth = "", t.style.maxHeight = "", e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), t.style.backgroundColor = e.backgroundColor ?? "", A(t), t.dataset.chatRetainSrc !== e.src && (t.dataset.chatRetainSrc = e.src, t.src = e.src, A(t));
}
function X(t) {
  const e = document.createElement("img");
  return e.dataset.chatRetain = y, e.style.opacity = "0", e.style.transition = "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1)", e.onload = () => {
    e.style.opacity = "1";
  }, H(e, t), S(t.src, e), e;
}
function J(t) {
  G();
  const e = u.get(t.src), a = e == null ? void 0 : e.pop();
  return a ? (e && e.length === 0 && u.delete(t.src), H(a, t), a) : X(t);
}
function E(t) {
  if (t.dataset.chatRetain !== y) return;
  const e = t.dataset.chatRetainSrc || "";
  if (!e) return;
  const a = u.get(e) ?? [];
  a.includes(t) || (a.push(t), u.set(e, a)), S(e, t);
  const r = q();
  t.parentElement !== r && r.appendChild(t);
}
function K(t, e, a = false) {
  const r = t.dataset.chatRetainSrc || "";
  e && (r === e && !a || (r && r !== e && F(r, t), t.dataset.chatRetain = y, t.dataset.chatRetainSrc = e, a && r === e && t.removeAttribute("src"), t.src = e, S(e, t), A(t)));
}
function V(t) {
  !t || typeof document > "u" || t.querySelectorAll("img").forEach((e) => {
    if (!(e instanceof HTMLImageElement) || !e.isConnected || !e.closest(".chat-message-markdown") || e.dataset.chatRetain === y || e.getAttribute("data-wiki-path") || e.getAttribute("data-md-src")) return;
    const a = e.getAttribute("src") || "";
    if (!a || a.startsWith("data:")) return;
    const r = e.src || a;
    !r || r.startsWith("data:") || O(e, r, { path: r, className: e.className, alt: e.alt, styleAttr: e.getAttribute("style") });
  });
}
function et(t) {
  const e = l.get(t);
  if (!e) {
    u.delete(t);
    return;
  }
  for (const a of e) delete a.dataset.chatRetain, delete a.dataset.chatRetainSrc, a.remove();
  l.delete(t), u.delete(t);
}
function T(t, e) {
  if (t.dataset.storageHydrated = e.path, delete t.dataset.storageHydrating, e.wikiPath ? t.setAttribute("data-wiki-path", e.wikiPath) : t.removeAttribute("data-wiki-path"), e.mdSrc ? t.setAttribute("data-md-src", e.mdSrc) : t.removeAttribute("data-md-src"), e.styleAttr) {
    const a = t.style.opacity, r = t.style.transition;
    t.setAttribute("style", e.styleAttr), t.style.transition = r, t.complete && t.naturalWidth > 0 ? t.style.opacity = "1" : a && (t.style.opacity = a);
  }
  e.backgroundColor && (t.style.backgroundColor = e.backgroundColor);
}
function O(t, e, a) {
  if (t.dataset.chatRetain === y && t.dataset.chatRetainSrc === e) return H(t, { src: e, alt: a.alt ?? t.alt, className: a.className ?? t.className, ...a.backgroundColor ? { backgroundColor: a.backgroundColor } : {} }), T(t, a), t;
  const r = J({ src: e, alt: a.alt ?? "", className: a.className ?? t.className, ...a.backgroundColor ? { backgroundColor: a.backgroundColor } : {} });
  return T(r, a), t.isConnected && t !== r ? t.replaceWith(r) : r.isConnected || E(r), r;
}
const W = 2, j = "data:";
function _(t, e) {
  return (t.getAttribute("src") || "") === e || t.src === e;
}
function k(t, e, a) {
  _(t, a) || (t.src = a), t.dataset.storageHydrated = e, delete t.dataset.storageHydrating;
}
function Q(t) {
  return !!t.closest(".chat-message-markdown");
}
function Y(t, e, a) {
  if (!t.isConnected && t.dataset.chatRetain !== "1") return;
  const r = M(e);
  if (t.dataset.chatRetain === "1" && t.dataset.storageHydrated === e && r && t.dataset.chatRetainSrc === r) return;
  const i = (n) => {
    const s = O(t, n, { path: e, className: t.className, alt: t.alt, styleAttr: t.getAttribute("style"), wikiPath: t.getAttribute("data-wiki-path"), mdSrc: t.getAttribute("data-md-src") });
    s.onerror = () => {
      const o = Number(s.dataset.storageHydrateTries || "0");
      o >= W || (s.dataset.storageHydrateTries = String(o + 1), delete s.dataset.storageHydrated, b(e, a, { skipCache: true }).then((c) => {
        c && (K(s, c, true), s.dataset.storageHydrated = e);
      }));
    };
  };
  if (r) {
    i(r);
    return;
  }
  t.dataset.storageHydrating !== e && (t.dataset.storageHydrating = e, delete t.dataset.storageHydrated, b(e, a).then((n) => {
    delete t.dataset.storageHydrating, n && i(n);
  }));
}
function g(t, e, a) {
  if (Q(t)) {
    Y(t, e, a);
    return;
  }
  const r = M(e), i = t.getAttribute("src") || "", n = !!i && !i.startsWith(j);
  if (t.dataset.storageHydrated === e && n) {
    r && !_(t, r) && k(t, e, r);
    return;
  }
  if (r) {
    k(t, e, r), t.onerror = () => {
      delete t.dataset.storageHydrated, b(e, a, { skipCache: true }).then((f) => {
        f && k(t, e, f);
      });
    };
    return;
  }
  if (t.dataset.storageHydrating === e) return;
  t.dataset.storageHydrating = e, delete t.dataset.storageHydrated;
  let s = 0;
  const o = () => {
    t.dataset.storageHydrating === e && delete t.dataset.storageHydrating;
  }, c = (f) => {
    if (f) {
      k(t, e, f);
      return;
    }
    o();
  };
  t.onerror = () => {
    if (delete t.dataset.storageHydrated, s >= W) {
      o();
      return;
    }
    s += 1, t.dataset.storageHydrating = e, b(e, a, { skipCache: true }).then(c);
  }, b(e, a).then(c);
}
function v(t, { getPresignedUrl: e, currentNotePath: a }) {
  if (!t || typeof e != "function") return 0;
  const r = t.querySelectorAll("img");
  let i = 0;
  return r.forEach((n) => {
    if (!(n instanceof HTMLImageElement)) return;
    const s = n.getAttribute("data-wiki-path");
    if (s) {
      g(n, s, e), i += 1;
      return;
    }
    const o = n.getAttribute("data-md-src") || n.getAttribute("src") || "";
    if (!N(o)) return;
    const c = x(o, a);
    c && (n.getAttribute("data-md-src") || n.setAttribute("data-md-src", B(o)), g(n, c, e), i += 1);
  }), V(t), i;
}
function L(t) {
  const e = String(t || "");
  if (/!\[\[/.test(e)) return true;
  const a = /!\[[^\]]*]\(([^)\n]+)\)/g;
  let r = a.exec(e);
  for (; r; ) {
    if (N(r[1] || "")) return true;
    r = a.exec(e);
  }
  return false;
}
function at(t, e, a, r = null, i = {}) {
  const { enabled: n = true } = i, s = R.useRef(e);
  s.current = e, R.useEffect(() => {
    if (!n || !a) return;
    let o = false, c = null;
    const f = (d) => {
      !d || c || typeof MutationObserver > "u" || (c = new MutationObserver(() => {
        o || h();
      }), c.observe(d, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-wiki-path", "data-md-src"] }));
    }, h = () => {
      if (o) return;
      const d = (t == null ? void 0 : t.current) ?? null;
      f(d), !(v(d, { getPresignedUrl: a, currentNotePath: r }) > 0) && L(s.current) && v(document, { getPresignedUrl: a, currentNotePath: r });
    };
    f((t == null ? void 0 : t.current) ?? null);
    const D = [0, 100, 350, 700].map((d) => setTimeout(h, d)), w = () => h(), I = () => h();
    return window.addEventListener("online", w), window.addEventListener(m, I), () => {
      o = true, D.forEach((d) => clearTimeout(d)), c == null ? void 0 : c.disconnect(), c = null, window.removeEventListener("online", w), window.removeEventListener(m, I);
    };
  }, [n, a, t, r]), R.useEffect(() => {
    !n || !a || !e || L(e) && v((t == null ? void 0 : t.current) ?? null, { getPresignedUrl: a, currentNotePath: r });
  }, [n, e, a, t, r]);
}
export {
  J as a,
  et as f,
  v as h,
  L as m,
  E as p,
  V as r,
  at as u
};
