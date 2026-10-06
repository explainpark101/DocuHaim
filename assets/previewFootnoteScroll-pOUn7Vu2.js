import { r as l, j as h } from "./vendor-react-BLJzfvPB.js";
import { A as D, m as j } from "./vendor-motion-DSEw68MZ.js";
import { h as H, i as W, j as K, k as q, l as $, A as z } from "./vendor-radix-4pFcYp0u.js";
import { aV as P, aW as _, aX as U } from "./index-BB3Er7Kj.js";
import { r as V } from "./TableEditModal-DPe1SGOa.js";
import { a as Y } from "./previewSelectionSync-CeANqbO3.js";
const X = "data-md-footnote-title", G = 250, J = 120, Q = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, Z = "z-100050 max-w-[min(92vw,320px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function x(t, e) {
  if (!(t instanceof Element)) return null;
  const n = t.closest(".footnote-ref-link");
  return !(n instanceof HTMLElement) || !e.contains(n) ? null : n;
}
function R(t) {
  var _a;
  return ((_a = t.getAttribute(X)) == null ? void 0 : _a.trim()) || "";
}
function B(t) {
  const e = t.getBoundingClientRect(), n = Number.parseFloat(window.getComputedStyle(t).fontSize) || 16, a = !!t.querySelector("sup.footnote-ref") ? n * 0.9 : 0;
  return { top: e.top - a, left: e.left, width: Math.max(e.width, 1), height: Math.max(e.height + a, 1) };
}
function ht({ containerRef: t, rootEl: e = null, enabled: n = true }) {
  const [r, a] = l.useState(null), [u, w] = l.useState(null), p = l.useRef(null), g = l.useRef(0), s = l.useRef(null), i = l.useCallback(() => {
    p.current != null && (clearTimeout(p.current), p.current = null);
  }, []), c = l.useCallback(() => {
    i(), s.current && (g.current = Date.now()), s.current = null, a(null), w(null);
  }, [i]), f = l.useCallback((o, S) => {
    const v = { el: o, text: S }, b = () => {
      s.current = v, a(v), w(B(o));
    };
    if (i(), s.current) {
      b();
      return;
    }
    const y = Date.now() - g.current < J ? 0 : G;
    if (y === 0) {
      b();
      return;
    }
    p.current = setTimeout(() => {
      p.current = null, b();
    }, y);
  }, [i]);
  l.useEffect(() => {
    if (!n) {
      c();
      return;
    }
    const o = e ?? t.current;
    if (!o) return;
    const S = (T) => {
      var _a;
      const d = x(T.target, o);
      if (!d) return;
      const m = R(d);
      if (!m) {
        c();
        return;
      }
      ((_a = s.current) == null ? void 0 : _a.el) === d && s.current.text === m || f(d, m);
    }, v = (T) => {
      var _a;
      const d = x(T.target, o);
      if (!d) return;
      const m = T.relatedTarget;
      m instanceof Node && d.contains(m) || (((_a = s.current) == null ? void 0 : _a.el) === d || p.current != null) && c();
    }, b = (T) => {
      const d = x(T.target, o);
      if (!d) return;
      const m = R(d);
      m && f(d, m);
    }, C = (T) => {
      var _a;
      const d = x(T.target, o);
      if (!d) return;
      const m = T.relatedTarget;
      m instanceof Node && d.contains(m) || ((_a = s.current) == null ? void 0 : _a.el) === d && c();
    }, y = () => {
      c();
    };
    return o.addEventListener("pointerover", S), o.addEventListener("pointerout", v), o.addEventListener("focusin", b), o.addEventListener("focusout", C), o.addEventListener("pointerdown", y), () => {
      i(), o.removeEventListener("pointerover", S), o.removeEventListener("pointerout", v), o.removeEventListener("focusin", b), o.removeEventListener("focusout", C), o.removeEventListener("pointerdown", y);
    };
  }, [c, i, t, n, e, f]), l.useLayoutEffect(() => {
    var _a;
    if (!n || !(r == null ? void 0 : r.el)) {
      w(null);
      return;
    }
    const o = () => {
      if (!r.el.isConnected) {
        c();
        return;
      }
      w(B(r.el));
    };
    o();
    const v = (_a = e ?? t.current) == null ? void 0 : _a.querySelector(".md-editor-preview");
    return window.addEventListener("resize", o), window.addEventListener("scroll", o, true), v == null ? void 0 : v.addEventListener("scroll", o, { passive: true }), () => {
      window.removeEventListener("resize", o), window.removeEventListener("scroll", o, true), v == null ? void 0 : v.removeEventListener("scroll", o);
    };
  }, [r, c, t, n, e]);
  const E = !!(r && u && r.text);
  return h.jsx(H, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: h.jsxs(W, { open: E, onOpenChange: (o) => {
    o || c();
  }, children: [h.jsx(K, { asChild: true, children: h.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: u ? { top: u.top, left: u.left, width: Math.max(u.width, 1), height: Math.max(u.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), h.jsx(D, { children: E ? h.jsx(q, { forceMount: true, children: h.jsx($, { asChild: true, side: "top", sideOffset: 6, children: h.jsxs(j.div, { className: Z, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: Q, children: [r == null ? void 0 : r.text, h.jsx(z, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
const I = "s3haim_toc_title_wrap";
function tt() {
  try {
    return typeof window > "u" ? false : window.localStorage.getItem(I) === "1";
  } catch {
    return false;
  }
}
function et(t) {
  try {
    if (typeof window > "u") return;
    window.localStorage.setItem(I, t ? "1" : "0");
  } catch {
  }
}
function wt() {
  const [t, e] = l.useState(tt), n = l.useCallback((r) => {
    e((a) => {
      const u = typeof r == "function" ? r(a) : !!r;
      return et(u), u;
    });
  }, []);
  return [t, n];
}
function vt(t) {
  return t ? "whitespace-normal break-words [overflow-wrap:anywhere]" : "truncate";
}
function bt(t) {
  const [e, n] = l.useState(null), r = l.useRef(t.getMarkdown), a = l.useRef(t.setMarkdown);
  r.current = t.getMarkdown, a.current = t.setMarkdown;
  const u = l.useCallback((s, i = s) => {
    const c = r.current(), f = P(c, s, i);
    return f ? (n({ block: f, meta: f.meta ?? _(), grid: f.grid }), true) : false;
  }, []), w = l.useCallback((s, i) => {
    const c = r.current(), f = V(c, s, i);
    return f ? (n({ block: f, meta: f.meta ?? _(), grid: f.grid }), true) : false;
  }, []), p = l.useCallback(() => n(null), []), g = l.useCallback((s, i) => {
    if (!e) return;
    const c = r.current(), f = P(c, e.block.start, e.block.start + 1) ?? e.block, E = U(c, f, s, i);
    a.current(E), n(null);
  }, [e]);
  return { editState: e, openAtOffset: u, openPreviewTable: w, close: p, apply: g, isOpen: !!e };
}
const nt = "data-md-footnote-to", N = "data-md-footnote-back-button", rt = 2, ot = "is-hidden";
let A = null;
const k = /* @__PURE__ */ new WeakMap();
function st(t) {
  return /^#(?:source-\d+|fnref-\d+(?:-\d+)?)$/i.test(String(t || "").trim());
}
function it(t, e) {
  var _a;
  try {
    const n = `#${CSS.escape(t)}, [data-md-footnote-id="${CSS.escape(t)}"]`, r = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, n);
    if (r) return r;
  } catch {
  }
  return document.getElementById(t);
}
function at(t) {
  return /^source-\d+$/i.test(t);
}
function ct(t) {
  const e = Y(t);
  if (!e) {
    t.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }
  const n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), a = e.scrollTop + (n.top - r.top) - rt;
  e.scrollTo({ top: Math.max(0, a), behavior: "smooth" });
}
function F(t, e) {
  const n = String(t || "").trim(), r = n.startsWith("#") ? n.slice(1) : n;
  if (!r) return false;
  const a = it(r, e);
  return a ? (at(r) ? ct(a) : a.scrollIntoView({ block: "nearest", behavior: "smooth" }), true) : false;
}
function M(t, e) {
  var _a, _b;
  const n = (_a = t == null ? void 0 : t.closest) == null ? void 0 : _a.call(t, ".md-editor-preview");
  return n && e.contains(n) ? n : ((_b = e.querySelector) == null ? void 0 : _b.call(e, ".md-editor-preview")) ?? e;
}
function lt(t) {
  return (t == null ? void 0 : t.querySelector) ? t.querySelector(`[${N}]`) : null;
}
function O(t) {
  const e = lt(t);
  if (!e) return;
  const n = !!(t && k.get(t));
  e.classList.toggle(ot, !n), e.toggleAttribute("aria-hidden", !n), e.toggleAttribute("disabled", !n), e.setAttribute("data-footnote-return-target", (t && k.get(t)) ?? "");
}
function L(t) {
  t && k.delete(t), A = null, O(t);
}
function ut(t, e) {
  t && e ? k.set(t, e) : t && k.delete(t), A = e || null, O(t);
}
function kt(t) {
  if (!t || typeof t.addEventListener != "function") return;
  const e = (n) => {
    var _a, _b, _c, _d;
    const r = n;
    if (r.metaKey || r.ctrlKey || r.shiftKey || r.altKey || typeof r.button == "number" && r.button !== 0) return;
    const a = (_b = (_a = r.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, `[${N}]`);
    if (a instanceof HTMLElement && t.contains(a)) {
      const i = M(r.target, t), c = i && k.get(i) || A;
      if (!c) return;
      n.preventDefault(), n.stopPropagation(), F(c, i), L(i);
      return;
    }
    const u = (_d = (_c = r.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "a[href], a[data-md-footnote-to]");
    if (!u || !t.contains(u)) return;
    const w = u.getAttribute(nt) || "", p = u.getAttribute("href") || "", g = w || (st(p) ? p.slice(1) : "");
    if (!g) return;
    const s = M(r.target, t);
    if (n.preventDefault(), n.stopPropagation(), g && g.startsWith("source-")) {
      const i = u.getAttribute("data-md-footnote-id") || u.id;
      i ? ut(s, i) : L(s);
    } else L(s);
    F(g, s);
  };
  return t.addEventListener("click", e, true), O(t), () => t.removeEventListener("click", e, true);
}
export {
  ht as P,
  wt as a,
  kt as b,
  vt as t,
  bt as u
};
