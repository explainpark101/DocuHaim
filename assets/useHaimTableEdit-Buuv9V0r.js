import { r, j as w } from "./vendor-react-BPvvDyqO.js";
import { A as P, m as R } from "./vendor-motion-Bv-XITR_.js";
import { v as _, w as j, x as I, y as N, z as D, A as B } from "./vendor-radix-8kjzYRrX.js";
import { aV as C, aW as S, aX as H } from "./index-DRAozU5b.js";
import { r as W } from "./TableEditModal-CGcSQcU-.js";
const z = "data-md-footnote-title", F = 250, Y = 120, q = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, K = "z-100050 max-w-[min(92vw,320px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function y(t, n) {
  if (!(t instanceof Element)) return null;
  const o = t.closest(".footnote-ref-link");
  return !(o instanceof HTMLElement) || !n.contains(o) ? null : o;
}
function A(t) {
  var _a;
  return ((_a = t.getAttribute(z)) == null ? void 0 : _a.trim()) || "";
}
function M(t) {
  const n = t.getBoundingClientRect(), o = Number.parseFloat(window.getComputedStyle(t).fontSize) || 16, p = !!t.querySelector("sup.footnote-ref") ? o * 0.9 : 0;
  return { top: n.top - p, left: n.left, width: Math.max(n.width, 1), height: Math.max(n.height + p, 1) };
}
function $({ containerRef: t, rootEl: n = null, enabled: o = true }) {
  const [s, p] = r.useState(null), [f, h] = r.useState(null), v = r.useRef(null), b = r.useRef(0), c = r.useRef(null), u = r.useCallback(() => {
    v.current != null && (clearTimeout(v.current), v.current = null);
  }, []), i = r.useCallback(() => {
    u(), c.current && (b.current = Date.now()), c.current = null, p(null), h(null);
  }, [u]), l = r.useCallback((e, x) => {
    const T = { el: e, text: x }, g = () => {
      c.current = T, p(T), h(M(e));
    };
    if (u(), c.current) {
      g();
      return;
    }
    const k = Date.now() - b.current < Y ? 0 : F;
    if (k === 0) {
      g();
      return;
    }
    v.current = setTimeout(() => {
      v.current = null, g();
    }, k);
  }, [u]);
  r.useEffect(() => {
    if (!o) {
      i();
      return;
    }
    const e = n ?? t.current;
    if (!e) return;
    const x = (m) => {
      var _a;
      const a = y(m.target, e);
      if (!a) return;
      const d = A(a);
      if (!d) {
        i();
        return;
      }
      ((_a = c.current) == null ? void 0 : _a.el) === a && c.current.text === d || l(a, d);
    }, T = (m) => {
      var _a;
      const a = y(m.target, e);
      if (!a) return;
      const d = m.relatedTarget;
      d instanceof Node && a.contains(d) || (((_a = c.current) == null ? void 0 : _a.el) === a || v.current != null) && i();
    }, g = (m) => {
      const a = y(m.target, e);
      if (!a) return;
      const d = A(a);
      d && l(a, d);
    }, L = (m) => {
      var _a;
      const a = y(m.target, e);
      if (!a) return;
      const d = m.relatedTarget;
      d instanceof Node && a.contains(d) || ((_a = c.current) == null ? void 0 : _a.el) === a && i();
    }, k = () => {
      i();
    };
    return e.addEventListener("pointerover", x), e.addEventListener("pointerout", T), e.addEventListener("focusin", g), e.addEventListener("focusout", L), e.addEventListener("pointerdown", k), () => {
      u(), e.removeEventListener("pointerover", x), e.removeEventListener("pointerout", T), e.removeEventListener("focusin", g), e.removeEventListener("focusout", L), e.removeEventListener("pointerdown", k);
    };
  }, [i, u, t, o, n, l]), r.useLayoutEffect(() => {
    var _a;
    if (!o || !(s == null ? void 0 : s.el)) {
      h(null);
      return;
    }
    const e = () => {
      if (!s.el.isConnected) {
        i();
        return;
      }
      h(M(s.el));
    };
    e();
    const T = (_a = n ?? t.current) == null ? void 0 : _a.querySelector(".md-editor-preview");
    return window.addEventListener("resize", e), window.addEventListener("scroll", e, true), T == null ? void 0 : T.addEventListener("scroll", e, { passive: true }), () => {
      window.removeEventListener("resize", e), window.removeEventListener("scroll", e, true), T == null ? void 0 : T.removeEventListener("scroll", e);
    };
  }, [s, i, t, o, n]);
  const E = !!(s && f && s.text);
  return w.jsx(_, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: w.jsxs(j, { open: E, onOpenChange: (e) => {
    e || i();
  }, children: [w.jsx(I, { asChild: true, children: w.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: f ? { top: f.top, left: f.left, width: Math.max(f.width, 1), height: Math.max(f.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), w.jsx(P, { children: E ? w.jsx(N, { forceMount: true, children: w.jsx(D, { asChild: true, side: "top", sideOffset: 6, children: w.jsxs(R.div, { className: K, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: q, children: [s == null ? void 0 : s.text, w.jsx(B, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
const O = "s3haim_toc_title_wrap";
function V() {
  try {
    return typeof window > "u" ? false : window.localStorage.getItem(O) === "1";
  } catch {
    return false;
  }
}
function X(t) {
  try {
    if (typeof window > "u") return;
    window.localStorage.setItem(O, t ? "1" : "0");
  } catch {
  }
}
function ee() {
  const [t, n] = r.useState(V), o = r.useCallback((s) => {
    n((p) => {
      const f = typeof s == "function" ? s(p) : !!s;
      return X(f), f;
    });
  }, []);
  return [t, o];
}
function te(t) {
  return t ? "whitespace-normal break-words [overflow-wrap:anywhere]" : "truncate";
}
function ne(t) {
  const [n, o] = r.useState(null), s = r.useRef(t.getMarkdown), p = r.useRef(t.setMarkdown);
  s.current = t.getMarkdown, p.current = t.setMarkdown;
  const f = r.useCallback((c, u = c) => {
    const i = s.current(), l = C(i, c, u);
    return l ? (o({ block: l, meta: l.meta ?? S(), grid: l.grid }), true) : false;
  }, []), h = r.useCallback((c, u) => {
    const i = s.current(), l = W(i, c, u);
    return l ? (o({ block: l, meta: l.meta ?? S(), grid: l.grid }), true) : false;
  }, []), v = r.useCallback(() => o(null), []), b = r.useCallback((c, u) => {
    if (!n) return;
    const i = s.current(), l = C(i, n.block.start, n.block.start + 1) ?? n.block, E = H(i, l, c, u);
    p.current(E), o(null);
  }, [n]);
  return { editState: n, openAtOffset: f, openPreviewTable: h, close: v, apply: b, isOpen: !!n };
}
export {
  $ as P,
  ee as a,
  te as t,
  ne as u
};
