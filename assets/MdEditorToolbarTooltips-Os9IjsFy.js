import { r as u, j as d } from "./vendor-react-BFxggocB.js";
import { A as j, m as D } from "./vendor-motion-b8oTnHK_.js";
import { b as P, d as R, T as k, e as H, f as I, A as _ } from "./vendor-radix-ACO_3onn.js";
const E = "data-md-tip", q = 280, z = 120, F = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, B = "z-100050 max-w-[min(92vw,280px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function M(r) {
  r.querySelectorAll(".md-editor-toolbar [title]").forEach((o) => {
    const c = o, l = c.getAttribute("title");
    l && (c.setAttribute(E, l), c.removeAttribute("title"));
  });
}
function O(r) {
  var _a, _b, _c, _d, _e, _f;
  const c = (_b = (_a = r.hasAttribute(E) ? r : r.querySelector(`[${E}]`)) == null ? void 0 : _a.getAttribute(E)) == null ? void 0 : _b.trim();
  if (c) return c;
  const p = (_d = (_c = r.hasAttribute("title") ? r : r.querySelector("[title]")) == null ? void 0 : _c.getAttribute("title")) == null ? void 0 : _d.trim();
  return p || (((_f = (_e = r.hasAttribute("aria-label") ? r : r.querySelector("[aria-label]")) == null ? void 0 : _e.getAttribute("aria-label")) == null ? void 0 : _f.trim()) ?? "");
}
function N(r) {
  const o = r.getBoundingClientRect();
  return { top: o.top, left: o.left, width: o.width, height: o.height };
}
function J({ containerRef: r }) {
  const [o, c] = u.useState(null), [l, p] = u.useState(null), b = u.useRef(null), A = u.useRef(0), s = u.useRef(null), h = u.useCallback(() => {
    b.current != null && (clearTimeout(b.current), b.current = null);
  }, []), f = u.useCallback(() => {
    h(), s.current && (A.current = Date.now()), s.current = null, c(null), p(null);
  }, [h]), T = u.useCallback((t, g) => {
    const m = { el: t, text: g }, v = () => {
      s.current = m, c(m), p(N(t));
    };
    if (h(), s.current) {
      v();
      return;
    }
    const x = Date.now() - A.current < z ? 0 : q;
    if (x === 0) {
      v();
      return;
    }
    b.current = setTimeout(() => {
      b.current = null, v();
    }, x);
  }, [h]);
  u.useEffect(() => {
    const t = r.current;
    if (!t) return;
    M(t);
    const g = new MutationObserver((a) => {
      let i = false;
      for (const e of a) if (e.type === "childList" && e.addedNodes.length > 0 && (i = true), e.type === "attributes" && e.attributeName === "title" && e.target instanceof HTMLElement) {
        const n = e.target;
        if (!n.closest(".md-editor-toolbar")) continue;
        const L = n.getAttribute("title");
        if (!L) continue;
        if (n.setAttribute(E, L), n.removeAttribute("title"), s.current && n.closest(".md-editor-toolbar-item") === s.current.el) {
          const S = { el: s.current.el, text: L };
          s.current = S, c(S);
        }
      }
      i && M(t);
    });
    g.observe(t, { subtree: true, childList: true, attributes: true, attributeFilter: ["title"] });
    const m = (a) => {
      var _a;
      const i = a.target;
      if (!(i instanceof Element)) return;
      const e = i.closest(".md-editor-toolbar-item");
      if (!(e instanceof HTMLElement) || !t.contains(e)) return;
      const n = O(e);
      if (!n) {
        f();
        return;
      }
      ((_a = s.current) == null ? void 0 : _a.el) === e && s.current.text === n || T(e, n);
    }, v = (a) => {
      var _a;
      const i = a.target;
      if (!(i instanceof Element)) return;
      const e = i.closest(".md-editor-toolbar-item");
      if (!(e instanceof HTMLElement) || !t.contains(e)) return;
      const n = a.relatedTarget;
      n instanceof Node && e.contains(n) || (((_a = s.current) == null ? void 0 : _a.el) === e || b.current != null) && f();
    }, w = (a) => {
      const i = a.target;
      if (!(i instanceof Element)) return;
      const e = i.closest(".md-editor-toolbar-item");
      if (!(e instanceof HTMLElement) || !t.contains(e)) return;
      const n = O(e);
      n && T(e, n);
    }, x = (a) => {
      var _a;
      const i = a.target;
      if (!(i instanceof Element)) return;
      const e = i.closest(".md-editor-toolbar-item");
      if (!(e instanceof HTMLElement) || !t.contains(e)) return;
      const n = a.relatedTarget;
      n instanceof Node && e.contains(n) || ((_a = s.current) == null ? void 0 : _a.el) === e && f();
    }, C = () => {
      f();
    };
    return t.addEventListener("pointerover", m), t.addEventListener("pointerout", v), t.addEventListener("focusin", w), t.addEventListener("focusout", x), t.addEventListener("pointerdown", C), () => {
      g.disconnect(), h(), t.removeEventListener("pointerover", m), t.removeEventListener("pointerout", v), t.removeEventListener("focusin", w), t.removeEventListener("focusout", x), t.removeEventListener("pointerdown", C);
    };
  }, [f, h, r, T]), u.useLayoutEffect(() => {
    var _a;
    if (!(o == null ? void 0 : o.el)) {
      p(null);
      return;
    }
    const t = () => {
      if (!o.el.isConnected) {
        f();
        return;
      }
      p(N(o.el));
    };
    t();
    const m = (_a = r.current) == null ? void 0 : _a.querySelector(".md-editor-toolbar-wrapper");
    return window.addEventListener("resize", t), window.addEventListener("scroll", t, true), m == null ? void 0 : m.addEventListener("scroll", t, { passive: true }), () => {
      window.removeEventListener("resize", t), window.removeEventListener("scroll", t, true), m == null ? void 0 : m.removeEventListener("scroll", t);
    };
  }, [o, f, r]);
  const y = !!(o && l && o.text);
  return d.jsx(P, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: d.jsxs(R, { open: y, onOpenChange: (t) => {
    t || f();
  }, children: [d.jsx(k, { asChild: true, children: d.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: l ? { top: l.top, left: l.left, width: Math.max(l.width, 1), height: Math.max(l.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), d.jsx(j, { children: y ? d.jsx(H, { forceMount: true, children: d.jsx(I, { asChild: true, side: "top", sideOffset: 6, children: d.jsxs(D.div, { className: B, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: F, children: [o == null ? void 0 : o.text, d.jsx(_, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
export {
  J as M
};
