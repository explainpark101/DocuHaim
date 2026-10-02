import { r as l, j as f } from "./vendor-react-BLJzfvPB.js";
import { A as D, m as P } from "./vendor-motion-DSEw68MZ.js";
import { h as k, i as R, j as H, k as I, l as _, A as q } from "./vendor-radix-4pFcYp0u.js";
const T = "data-md-tip", z = 280, F = 120, B = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, Y = "z-100050 max-w-[min(92vw,280px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function O(r) {
  r.querySelectorAll(".md-editor-toolbar [title]").forEach((s) => {
    const o = s, p = o.getAttribute("title");
    p && (o.setAttribute(T, p), o.removeAttribute("title"));
  });
}
function j(r) {
  var _a, _b, _c, _d, _e, _f;
  const o = (_b = (_a = r.hasAttribute(T) ? r : r.querySelector(`[${T}]`)) == null ? void 0 : _a.getAttribute(T)) == null ? void 0 : _b.trim();
  if (o) return o;
  const u = (_d = (_c = r.hasAttribute("title") ? r : r.querySelector("[title]")) == null ? void 0 : _c.getAttribute("title")) == null ? void 0 : _d.trim();
  return u || (((_f = (_e = r.hasAttribute("aria-label") ? r : r.querySelector("[aria-label]")) == null ? void 0 : _e.getAttribute("aria-label")) == null ? void 0 : _f.trim()) ?? "");
}
function N(r) {
  const s = r.getBoundingClientRect();
  return { top: s.top, left: s.left, width: s.width, height: s.height };
}
function Q({ containerRef: r, enabled: s = true }) {
  const [o, p] = l.useState(null), [u, g] = l.useState(null), h = l.useRef(null), y = l.useRef(0), a = l.useRef(null), v = l.useCallback(() => {
    h.current != null && (clearTimeout(h.current), h.current = null);
  }, []), d = l.useCallback(() => {
    v(), a.current && (y.current = Date.now()), a.current = null, p(null), g(null);
  }, [v]), w = l.useCallback((t, x) => {
    const m = { el: t, text: x }, b = () => {
      a.current = m, p(m), g(N(t));
    };
    if (v(), a.current) {
      b();
      return;
    }
    const E = Date.now() - y.current < F ? 0 : z;
    if (E === 0) {
      b();
      return;
    }
    h.current = setTimeout(() => {
      h.current = null, b();
    }, E);
  }, [v]);
  l.useEffect(() => {
    if (!s) {
      d();
      return;
    }
    const t = r.current;
    if (!t) return;
    O(t);
    const x = new MutationObserver((c) => {
      let i = false;
      for (const e of c) if (e.type === "childList" && e.addedNodes.length > 0 && (i = true), e.type === "attributes" && e.attributeName === "title" && e.target instanceof HTMLElement) {
        const n = e.target;
        if (!n.closest(".md-editor-toolbar")) continue;
        const A = n.getAttribute("title");
        if (!A) continue;
        if (n.setAttribute(T, A), n.removeAttribute("title"), a.current && n.closest(".md-editor-toolbar-item") === a.current.el) {
          const M = { el: a.current.el, text: A };
          a.current = M, p(M);
        }
      }
      i && O(t);
    });
    x.observe(t, { subtree: true, childList: true, attributes: true, attributeFilter: ["title"] });
    const m = (c) => {
      var _a;
      const i = c.target;
      if (!(i instanceof Element)) return;
      const e = i.closest(".md-editor-toolbar-item");
      if (!(e instanceof HTMLElement) || !t.contains(e)) return;
      const n = j(e);
      if (!n) {
        d();
        return;
      }
      ((_a = a.current) == null ? void 0 : _a.el) === e && a.current.text === n || w(e, n);
    }, b = (c) => {
      var _a;
      const i = c.target;
      if (!(i instanceof Element)) return;
      const e = i.closest(".md-editor-toolbar-item");
      if (!(e instanceof HTMLElement) || !t.contains(e)) return;
      const n = c.relatedTarget;
      n instanceof Node && e.contains(n) || (((_a = a.current) == null ? void 0 : _a.el) === e || h.current != null) && d();
    }, L = (c) => {
      const i = c.target;
      if (!(i instanceof Element)) return;
      const e = i.closest(".md-editor-toolbar-item");
      if (!(e instanceof HTMLElement) || !t.contains(e)) return;
      const n = j(e);
      n && w(e, n);
    }, E = (c) => {
      var _a;
      const i = c.target;
      if (!(i instanceof Element)) return;
      const e = i.closest(".md-editor-toolbar-item");
      if (!(e instanceof HTMLElement) || !t.contains(e)) return;
      const n = c.relatedTarget;
      n instanceof Node && e.contains(n) || ((_a = a.current) == null ? void 0 : _a.el) === e && d();
    }, S = () => {
      d();
    };
    return t.addEventListener("pointerover", m), t.addEventListener("pointerout", b), t.addEventListener("focusin", L), t.addEventListener("focusout", E), t.addEventListener("pointerdown", S), () => {
      x.disconnect(), v(), t.removeEventListener("pointerover", m), t.removeEventListener("pointerout", b), t.removeEventListener("focusin", L), t.removeEventListener("focusout", E), t.removeEventListener("pointerdown", S);
    };
  }, [d, v, r, s, w]), l.useLayoutEffect(() => {
    var _a;
    if (!s || !(o == null ? void 0 : o.el)) {
      g(null);
      return;
    }
    const t = () => {
      if (!o.el.isConnected) {
        d();
        return;
      }
      g(N(o.el));
    };
    t();
    const m = (_a = r.current) == null ? void 0 : _a.querySelector(".md-editor-toolbar-wrapper");
    return window.addEventListener("resize", t), window.addEventListener("scroll", t, true), m == null ? void 0 : m.addEventListener("scroll", t, { passive: true }), () => {
      window.removeEventListener("resize", t), window.removeEventListener("scroll", t, true), m == null ? void 0 : m.removeEventListener("scroll", t);
    };
  }, [o, d, r, s]);
  const C = !!(o && u && o.text);
  return f.jsx(k, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: f.jsxs(R, { open: C, onOpenChange: (t) => {
    t || d();
  }, children: [f.jsx(H, { asChild: true, children: f.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: u ? { top: u.top, left: u.left, width: Math.max(u.width, 1), height: Math.max(u.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), f.jsx(D, { children: C ? f.jsx(I, { forceMount: true, children: f.jsx(_, { asChild: true, side: "top", sideOffset: 6, children: f.jsxs(P.div, { className: Y, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: B, children: [o == null ? void 0 : o.text, f.jsx(q, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
export {
  Q as M
};
