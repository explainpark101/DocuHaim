import { r as l, j as f } from "./vendor-react-BDjpSibw.js";
import { A as F, m as I } from "./vendor-motion-Dw-WnPM7.js";
import { h as N, i as K, j as R, k as H, l as _, A as q } from "./vendor-radix-DuLpLUUM.js";
import { w as B, a as M, b as k, c as z, d as Q, e as W, f as Y } from "./editorMarkdownStyle-scvYrRUi.js";
const v = "data-md-tip", $ = 280, X = 120, G = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, J = "z-100050 max-w-[min(92vw,280px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function O(t) {
  t.querySelectorAll(".md-editor-toolbar [title]").forEach((e) => {
    const i = e, p = i.getAttribute("title");
    p && (i.setAttribute(v, p), i.removeAttribute("title"));
  });
}
function j(t) {
  var _a, _b, _c, _d, _e, _f;
  const i = (_b = (_a = t.hasAttribute(v) ? t : t.querySelector(`[${v}]`)) == null ? void 0 : _a.getAttribute(v)) == null ? void 0 : _b.trim();
  if (i) return i;
  const u = (_d = (_c = t.hasAttribute("title") ? t : t.querySelector("[title]")) == null ? void 0 : _c.getAttribute("title")) == null ? void 0 : _d.trim();
  return u || (((_f = (_e = t.hasAttribute("aria-label") ? t : t.querySelector("[aria-label]")) == null ? void 0 : _e.getAttribute("aria-label")) == null ? void 0 : _f.trim()) ?? "");
}
function D(t) {
  const e = t.getBoundingClientRect();
  return { top: e.top, left: e.left, width: e.width, height: e.height };
}
function it({ containerRef: t, enabled: e = true }) {
  const [i, p] = l.useState(null), [u, y] = l.useState(null), h = l.useRef(null), A = l.useRef(0), a = l.useRef(null), g = l.useCallback(() => {
    h.current != null && (clearTimeout(h.current), h.current = null);
  }, []), d = l.useCallback(() => {
    g(), a.current && (A.current = Date.now()), a.current = null, p(null), y(null);
  }, [g]), T = l.useCallback((r, x) => {
    const m = { el: r, text: x }, b = () => {
      a.current = m, p(m), y(D(r));
    };
    if (g(), a.current) {
      b();
      return;
    }
    const E = Date.now() - A.current < X ? 0 : $;
    if (E === 0) {
      b();
      return;
    }
    h.current = setTimeout(() => {
      h.current = null, b();
    }, E);
  }, [g]);
  l.useEffect(() => {
    if (!e) {
      d();
      return;
    }
    const r = t.current;
    if (!r) return;
    O(r);
    const x = new MutationObserver((c) => {
      let s = false;
      for (const n of c) if (n.type === "childList" && n.addedNodes.length > 0 && (s = true), n.type === "attributes" && n.attributeName === "title" && n.target instanceof HTMLElement) {
        const o = n.target;
        if (!o.closest(".md-editor-toolbar")) continue;
        const L = o.getAttribute("title");
        if (!L) continue;
        if (o.setAttribute(v, L), o.removeAttribute("title"), a.current && o.closest(".md-editor-toolbar-item") === a.current.el) {
          const C = { el: a.current.el, text: L };
          a.current = C, p(C);
        }
      }
      s && O(r);
    });
    x.observe(r, { subtree: true, childList: true, attributes: true, attributeFilter: ["title"] });
    const m = (c) => {
      var _a;
      const s = c.target;
      if (!(s instanceof Element)) return;
      const n = s.closest(".md-editor-toolbar-item");
      if (!(n instanceof HTMLElement) || !r.contains(n)) return;
      const o = j(n);
      if (!o) {
        d();
        return;
      }
      ((_a = a.current) == null ? void 0 : _a.el) === n && a.current.text === o || T(n, o);
    }, b = (c) => {
      var _a;
      const s = c.target;
      if (!(s instanceof Element)) return;
      const n = s.closest(".md-editor-toolbar-item");
      if (!(n instanceof HTMLElement) || !r.contains(n)) return;
      const o = c.relatedTarget;
      o instanceof Node && n.contains(o) || (((_a = a.current) == null ? void 0 : _a.el) === n || h.current != null) && d();
    }, w = (c) => {
      const s = c.target;
      if (!(s instanceof Element)) return;
      const n = s.closest(".md-editor-toolbar-item");
      if (!(n instanceof HTMLElement) || !r.contains(n)) return;
      const o = j(n);
      o && T(n, o);
    }, E = (c) => {
      var _a;
      const s = c.target;
      if (!(s instanceof Element)) return;
      const n = s.closest(".md-editor-toolbar-item");
      if (!(n instanceof HTMLElement) || !r.contains(n)) return;
      const o = c.relatedTarget;
      o instanceof Node && n.contains(o) || ((_a = a.current) == null ? void 0 : _a.el) === n && d();
    }, P = () => {
      d();
    };
    return r.addEventListener("pointerover", m), r.addEventListener("pointerout", b), r.addEventListener("focusin", w), r.addEventListener("focusout", E), r.addEventListener("pointerdown", P), () => {
      x.disconnect(), g(), r.removeEventListener("pointerover", m), r.removeEventListener("pointerout", b), r.removeEventListener("focusin", w), r.removeEventListener("focusout", E), r.removeEventListener("pointerdown", P);
    };
  }, [d, g, t, e, T]), l.useLayoutEffect(() => {
    var _a;
    if (!e || !(i == null ? void 0 : i.el)) {
      y(null);
      return;
    }
    const r = () => {
      if (!i.el.isConnected) {
        d();
        return;
      }
      y(D(i.el));
    };
    r();
    const m = (_a = t.current) == null ? void 0 : _a.querySelector(".md-editor-toolbar-wrapper");
    return window.addEventListener("resize", r), window.addEventListener("scroll", r, true), m == null ? void 0 : m.addEventListener("scroll", r, { passive: true }), () => {
      window.removeEventListener("resize", r), window.removeEventListener("scroll", r, true), m == null ? void 0 : m.removeEventListener("scroll", r);
    };
  }, [i, d, t, e]);
  const S = !!(i && u && i.text);
  return f.jsx(N, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: f.jsxs(K, { open: S, onOpenChange: (r) => {
    r || d();
  }, children: [f.jsx(R, { asChild: true, children: f.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: u ? { top: u.top, left: u.left, width: Math.max(u.width, 1), height: Math.max(u.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), f.jsx(F, { children: S ? f.jsx(H, { forceMount: true, children: f.jsx(_, { asChild: true, side: "top", sideOffset: 6, children: f.jsxs(I.div, { className: J, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: G, children: [i == null ? void 0 : i.text, f.jsx(q, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
function U() {
  if (typeof navigator > "u") return false;
  const t = navigator.platform || "", e = navigator.userAgent || "";
  return !!(/iPhone|iPad|iPod/i.test(e) || /iPhone|iPad|iPod/i.test(t) || /Mac/i.test(t) || /Mac OS X/i.test(e));
}
function V(t) {
  if (t.ctrlKey || t.metaKey || t.altKey) return false;
  const { key: e, code: i } = t;
  return e === "`" || i === "Backquote" ? true : U() ? e === "\u20A9" || e === "\\" || i === "IntlBackslash" : false;
}
function Z(t, e) {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return false;
  switch (e.key) {
    case "$":
      return Y(t);
    case "[":
      return W(t);
    case "(":
      return Q(t);
    case "{":
      return z(t);
    case "'":
      return k(t);
    case '"':
      return M(t);
    default:
      return e.code === "Quote" ? e.shiftKey ? M(t) : k(t) : false;
  }
}
function st(t, e) {
  return !e || e.composing ? false : V(t) && B(e) ? true : Z(e, t);
}
export {
  it as M,
  st as h,
  Z as w
};
