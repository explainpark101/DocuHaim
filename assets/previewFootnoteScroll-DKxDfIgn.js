import { r as m, j as u, a as X } from "./vendor-react-kfkzeLNk.js";
import { A as G, m as J } from "./vendor-motion-jUlp7ZOS.js";
import { b as Q, d as Z, T as tt, e as et, f as nt, A as rt } from "./vendor-radix-DlfIFeUY.js";
import { o as ot, a4 as it, a5 as st, a6 as at, a7 as W, $ as ct, a8 as lt, a9 as ut, aa as dt } from "./index-CaS1IMRb.js";
function ft(t) {
  return { leftPct: 0, widthPct: 100 };
}
function ht(t, e) {
  return !(e > 0) || !Number.isFinite(t) ? 0 : Math.max(0, t) / e * 100;
}
function Xt(t, e, n, o) {
  var _a;
  const s = ht(e, n), l = [...t];
  if (l.length === 0) return t;
  const d = [...l].sort((r, c) => r.y - c.y || r.x - c.x);
  let x = ((_a = d[0]) == null ? void 0 : _a.y) ?? 0;
  const a = /* @__PURE__ */ new Map();
  for (const r of d) a.set(r.id, x), x += r.h + s;
  return t.map((r) => {
    const c = a.get(r.id);
    return c == null ? r : { ...r, y: c };
  });
}
function Gt(t, e) {
  return { ...t, layout: { ...t.layout, ...e, containerWidthPct: 100 } };
}
const Jt = 1.5;
function _(t, e, n) {
  return Math.min(n, Math.max(e, t));
}
function Qt(t) {
  const e = t % 6 * 3;
  return { x: _(18 + e, 0, 70), y: _(28 + e, 0, 70) };
}
const mt = "var(--cover-font-scale, 1)";
function q(t) {
  return `calc(${Number.isFinite(t) ? t : 16}px * ${mt})`;
}
function pt(t, e) {
  return { boxSizing: "border-box", color: t.color, fontSize: q(t.fontSize), fontWeight: t.fontWeight, textAlign: t.textAlign, fontFamily: t.fontFamily || void 0, overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", lineHeight: 1.25, ...(e == null ? void 0 : e.strictClip) ? { clipPath: "inset(0 0.2em 0.16em 0)" } : null };
}
function xt(t) {
  const e = t.type === "ellipse" ? "50%" : t.type === "roundRect" ? `${t.cornerRadiusPct ?? 4}%` : 0;
  return { boxSizing: "border-box", width: "100%", height: "100%", overflow: "hidden", backgroundColor: t.fill || "transparent", borderWidth: Math.max(0, t.borderWidth), borderStyle: t.borderStyle || "solid", borderColor: t.borderColor || "transparent", borderRadius: e };
}
function gt(t) {
  return t === "middle" ? "center" : t === "bottom" ? "flex-end" : "flex-start";
}
function bt(t) {
  const e = t.paddingPct ?? 0;
  return { boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: gt(t.textVAlign), width: "100%", height: "100%", margin: 0, padding: `${e}%`, overflow: "hidden" };
}
function vt(t, e) {
  return { boxSizing: "border-box", width: "100%", margin: 0, padding: 0, border: 0, background: "transparent", outline: "none", resize: "none", overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", lineHeight: 1.25, color: t.color || "#0c4a6e", fontSize: q(t.fontSize ?? 24), fontWeight: t.fontWeight ?? "normal", textAlign: t.textAlign ?? "center", fontFamily: t.fontFamily || void 0, ...(e == null ? void 0 : e.strictClip) ? { clipPath: "inset(0 0.2em 0.16em 0)" } : null };
}
function wt(t, e) {
  const o = ot(t)[e.tableIndex];
  if (!o) return { markdown: t, updated: false };
  const s = Math.max(48, Math.round(e.widthPx)), l = Math.max(32, Math.round(e.heightPx)), x = { ...o.meta ?? it(), width: "fit", boxWidth: `${s}px`, boxHeight: `${l}px` }, a = st(t, o, x, o.grid);
  return { markdown: a, updated: a !== t };
}
function yt(t, e) {
  return [...e.querySelectorAll("table")].indexOf(t);
}
const St = "data-md-footnote-title", Tt = 250, Ct = 120, Pt = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, Et = "z-100050 max-w-[min(92vw,320px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function M(t, e) {
  if (!(t instanceof Element)) return null;
  const n = t.closest(".footnote-ref-link");
  return !(n instanceof HTMLElement) || !e.contains(n) ? null : n;
}
function z(t) {
  var _a;
  return ((_a = t.getAttribute(St)) == null ? void 0 : _a.trim()) || "";
}
function $(t) {
  const e = t.getBoundingClientRect(), n = Number.parseFloat(window.getComputedStyle(t).fontSize) || 16, s = !!t.querySelector("sup.footnote-ref") ? n * 0.9 : 0;
  return { top: e.top - s, left: e.left, width: Math.max(e.width, 1), height: Math.max(e.height + s, 1) };
}
function Zt({ containerRef: t, rootEl: e = null }) {
  const [n, o] = m.useState(null), [s, l] = m.useState(null), d = m.useRef(null), x = m.useRef(0), a = m.useRef(null), r = m.useCallback(() => {
    d.current != null && (clearTimeout(d.current), d.current = null);
  }, []), c = m.useCallback(() => {
    r(), a.current && (x.current = Date.now()), a.current = null, o(null), l(null);
  }, [r]), E = m.useCallback((i, v) => {
    const h = { el: i, text: v }, S = () => {
      a.current = h, o(h), l($(i));
    };
    if (r(), a.current) {
      S();
      return;
    }
    const b = Date.now() - x.current < Ct ? 0 : Tt;
    if (b === 0) {
      S();
      return;
    }
    d.current = setTimeout(() => {
      d.current = null, S();
    }, b);
  }, [r]);
  m.useEffect(() => {
    const i = e ?? t.current;
    if (!i) return;
    const v = (w) => {
      var _a;
      const p = M(w.target, i);
      if (!p) return;
      const y = z(p);
      if (!y) {
        c();
        return;
      }
      ((_a = a.current) == null ? void 0 : _a.el) === p && a.current.text === y || E(p, y);
    }, h = (w) => {
      var _a;
      const p = M(w.target, i);
      if (!p) return;
      const y = w.relatedTarget;
      y instanceof Node && p.contains(y) || (((_a = a.current) == null ? void 0 : _a.el) === p || d.current != null) && c();
    }, S = (w) => {
      const p = M(w.target, i);
      if (!p) return;
      const y = z(p);
      y && E(p, y);
    }, g = (w) => {
      var _a;
      const p = M(w.target, i);
      if (!p) return;
      const y = w.relatedTarget;
      y instanceof Node && p.contains(y) || ((_a = a.current) == null ? void 0 : _a.el) === p && c();
    }, b = () => {
      c();
    };
    return i.addEventListener("pointerover", v), i.addEventListener("pointerout", h), i.addEventListener("focusin", S), i.addEventListener("focusout", g), i.addEventListener("pointerdown", b), () => {
      r(), i.removeEventListener("pointerover", v), i.removeEventListener("pointerout", h), i.removeEventListener("focusin", S), i.removeEventListener("focusout", g), i.removeEventListener("pointerdown", b);
    };
  }, [c, r, t, e, E]), m.useLayoutEffect(() => {
    var _a;
    if (!(n == null ? void 0 : n.el)) {
      l(null);
      return;
    }
    const i = () => {
      if (!n.el.isConnected) {
        c();
        return;
      }
      l($(n.el));
    };
    i();
    const h = (_a = e ?? t.current) == null ? void 0 : _a.querySelector(".md-editor-preview");
    return window.addEventListener("resize", i), window.addEventListener("scroll", i, true), h == null ? void 0 : h.addEventListener("scroll", i, { passive: true }), () => {
      window.removeEventListener("resize", i), window.removeEventListener("scroll", i, true), h == null ? void 0 : h.removeEventListener("scroll", i);
    };
  }, [n, c, t, e]);
  const f = !!(n && s && n.text);
  return u.jsx(Q, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: u.jsxs(Z, { open: f, onOpenChange: (i) => {
    i || c();
  }, children: [u.jsx(tt, { asChild: true, children: u.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: s ? { top: s.top, left: s.left, width: Math.max(s.width, 1), height: Math.max(s.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), u.jsx(G, { children: f ? u.jsx(et, { forceMount: true, children: u.jsx(nt, { asChild: true, side: "top", sideOffset: 6, children: u.jsxs(J.div, { className: Et, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: Pt, children: [n == null ? void 0 : n.text, u.jsx(rt, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
const Lt = ["nw", "ne", "sw", "se"], kt = { nw: { left: 0, top: 0, cursor: "nwse-resize", transform: "translate(-50%, -50%)" }, ne: { left: "100%", top: 0, cursor: "nesw-resize", transform: "translate(-50%, -50%)" }, sw: { left: 0, top: "100%", cursor: "nesw-resize", transform: "translate(-50%, -50%)" }, se: { left: "100%", top: "100%", cursor: "nwse-resize", transform: "translate(-50%, -50%)" } };
function At(t) {
  var _a, _b;
  return t ? ((_a = t.classList) == null ? void 0 : _a.contains("md-editor-preview")) ? t : ((_b = t.hasAttribute) == null ? void 0 : _b.call(t, "data-export-pdf-preview")) || t.id === "export-pdf-preview" ? t.querySelector(".md-editor-preview") ?? t : t.querySelector(".md-editor-preview") ?? t.querySelector("#export-pdf-preview .md-editor-preview") ?? t.querySelector("[data-export-pdf-preview] .md-editor-preview") ?? t : null;
}
function te({ containerRef: t, getMarkdown: e, setMarkdown: n, enabled: o = true }) {
  const [s, l] = m.useState(null), [d, x] = m.useState(null), a = m.useRef(null), r = m.useRef(false);
  a.current = s;
  const c = m.useCallback(() => {
    l(null), x(null), a.current = null;
  }, []);
  m.useEffect(() => {
    o || c();
  }, [c, o]), m.useEffect(() => {
    if (!(s == null ? void 0 : s.table)) {
      x(null);
      return;
    }
    const f = s.table;
    let i = 0;
    const v = () => {
      if (!f.isConnected) {
        c();
        return;
      }
      const h = f.getBoundingClientRect();
      x({ left: h.left, top: h.top, width: h.width, height: h.height }), i = requestAnimationFrame(v);
    };
    return i = requestAnimationFrame(v), () => cancelAnimationFrame(i);
  }, [s, c]), m.useEffect(() => {
    if (!o) return;
    const f = t.current;
    if (!f) return;
    const i = (v) => {
      var _a, _b, _c, _d;
      if (r.current) return;
      const h = v.target;
      if (!h || ((_a = h.closest) == null ? void 0 : _a.call(h, "[data-haim-table-resize-handle]")) || ((_b = h.closest) == null ? void 0 : _b.call(h, "[data-transform-handle]"))) return;
      const S = At(f);
      if (!S) return;
      if (!S.contains(h)) {
        c();
        return;
      }
      const g = (_c = h.closest) == null ? void 0 : _c.call(h, "table");
      if (!g || !S.contains(g)) {
        c();
        return;
      }
      if ((_d = h.closest) == null ? void 0 : _d.call(h, "a, button, input, textarea, select")) return;
      const b = yt(g, S);
      if (b < 0) return;
      const w = g.getBoundingClientRect(), p = { table: g, tableIndex: b, widthPx: Math.max(48, Math.round(w.width)), heightPx: Math.max(32, Math.round(w.height)) };
      a.current = p, l(p);
    };
    return f.addEventListener("pointerdown", i, true), () => f.removeEventListener("pointerdown", i, true);
  }, [c, t, o]);
  const E = m.useCallback((f, i) => {
    f.preventDefault(), f.stopPropagation();
    const v = a.current;
    if (!(v == null ? void 0 : v.table)) return;
    r.current = true;
    const h = f.clientX, S = f.clientY, g = v.widthPx, b = v.heightPx, w = b > 0 ? g / b : 1, p = f.pointerType === "touch";
    let y = false;
    const F = (P) => {
      const L = P.clientX - h, R = P.clientY - S;
      (Math.abs(L) > 1 || Math.abs(R) > 1) && (y = true);
      let T = g, C = b;
      if (i.includes("e") && (T = g + L), i.includes("w") && (T = g - L), i.includes("s") && (C = b + R), i.includes("n") && (C = b - R), T = Math.max(48, T), C = Math.max(32, C), p || P.shiftKey) {
        const U = Math.abs((T - g) / Math.max(1, g)), V = Math.abs((C - b) / Math.max(1, b));
        U >= V ? C = Math.max(32, T / Math.max(1e-4, w)) : T = Math.max(48, C * w);
      }
      T = Math.max(48, Math.round(T)), C = Math.max(32, Math.round(C)), at(v.table, T, C);
      const I = { ...v, widthPx: T, heightPx: C };
      a.current = I, l(I);
    }, A = () => {
      document.removeEventListener("pointermove", F, true), document.removeEventListener("pointerup", A, true), document.removeEventListener("pointercancel", A, true), r.current = false;
      const P = a.current;
      if (!P || !y || P.widthPx === g && P.heightPx === b) return;
      const L = wt(e(), { tableIndex: P.tableIndex, widthPx: P.widthPx, heightPx: P.heightPx });
      L.updated && n(L.markdown);
    };
    document.addEventListener("pointermove", F, true), document.addEventListener("pointerup", A, true), document.addEventListener("pointercancel", A, true);
  }, [e, n]);
  return !o || !s || !d || typeof document > "u" ? null : X.createPortal(u.jsx("div", { className: "pointer-events-none fixed z-100040 border-2 border-blue-500 print:hidden", style: { left: d.left, top: d.top, width: d.width, height: d.height }, "data-haim-table-resize-overlay": "", children: Lt.map((f) => u.jsx("button", { type: "button", "aria-label": `\uD45C \uD06C\uAE30 \uC870\uC808 ${f}`, "data-haim-table-resize-handle": f, className: "pointer-events-auto absolute h-3.5 w-3.5 rounded-sm border-2 border-blue-500 bg-white shadow-sm dark:bg-odp-surface", style: kt[f], onPointerDown: (i) => E(i, f) }, f)) }), document.body);
}
function Mt(t) {
  const e = String(t ?? "").trim();
  return e && W(e) ? e : null;
}
function K(t, e) {
  const n = String(t ?? "").trim(), o = Mt(n), [s, l] = m.useState(() => o);
  return m.useEffect(() => {
    if (!n) {
      l(null);
      return;
    }
    if (W(n)) {
      l(n);
      return;
    }
    let d = false;
    return l(null), ct(n, typeof e == "function" ? e : async () => null).then((a) => {
      d || l(a || null);
    }), () => {
      d = true;
    };
  }, [n, e]), o || s;
}
function Rt({ cover: t }) {
  const e = m.useMemo(() => ut(t.webfonts), [t.webfonts]);
  return e ? u.jsx("style", { "data-note-cover-webfonts": "1", children: e }) : null;
}
function Ot({ path: t, getPresignedUrl: e }) {
  const n = K(t, e);
  return n ? u.jsx("img", { src: n, alt: "", className: "pointer-events-none absolute inset-0 h-full w-full object-cover", draggable: false }) : null;
}
function jt({ path: t, getPresignedUrl: e }) {
  const n = K(t, e);
  return n ? u.jsx("img", { src: n, alt: "", className: "h-full w-full object-fill", draggable: false }) : u.jsx("div", { className: "flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400", children: "\uC774\uBBF8\uC9C0" });
}
function O(t) {
  return { position: "absolute", left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}%`, height: `${t.h}%` };
}
function Nt({ el: t, strictClip: e = false }) {
  const n = t.text ?? "";
  return u.jsx("div", { className: "h-full w-full", style: xt(t), "data-cover-shape": t.type, children: n ? u.jsx("div", { style: bt(t), children: u.jsx("div", { style: vt(t, { strictClip: e }), children: n }) }) : null });
}
function ee({ cover: t, getPresignedUrl: e, className: n = "", style: o, showFrameOutline: s = false, renderElements: l = true, children: d }) {
  const x = ft(t.layout), a = t.bg.color || "#ffffff";
  return u.jsxs("div", { className: `export-pdf-cover relative z-2 overflow-hidden bg-white text-gray-900 ${n}`, style: { width: "var(--print-page-width)", height: "var(--print-page-height)", backgroundColor: a, ...o }, "data-note-cover": "1", onContextMenu: (r) => {
    r.stopPropagation();
  }, children: [u.jsx(Rt, { cover: t }), t.bg.imagePath ? u.jsx(Ot, { path: t.bg.imagePath, getPresignedUrl: e }) : null, u.jsxs("div", { className: `absolute top-0 bottom-0 ${s ? "outline outline-1 outline-dashed outline-blue-400/70" : ""}`, style: { left: `${x.leftPct}%`, width: `${x.widthPct}%` }, "data-cover-frame": "1", children: [l ? t.elements.map((r) => r.type === "text" ? u.jsx("div", { "data-cover-el": r.id, style: { ...O(r), ...pt(r) }, children: r.text }, r.id) : lt(r) ? u.jsx("div", { "data-cover-el": r.id, style: O(r), children: u.jsx(Nt, { el: r }) }, r.id) : u.jsx("div", { "data-cover-el": r.id, style: O(r), children: u.jsx(jt, { path: r.path, getPresignedUrl: e }) }, r.id)) : null, d] })] });
}
const Bt = "data-md-footnote-to", Y = "data-md-footnote-back-button", Ft = 2, It = "is-hidden";
let N = null;
const k = /* @__PURE__ */ new WeakMap();
function _t(t) {
  return /^#(?:source-\d+|fnref-\d+(?:-\d+)?)$/i.test(String(t || "").trim());
}
function zt(t, e) {
  var _a;
  try {
    const n = `#${CSS.escape(t)}, [data-md-footnote-id="${CSS.escape(t)}"]`, o = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, n);
    if (o) return o;
  } catch {
  }
  return document.getElementById(t);
}
function $t(t) {
  return /^source-\d+$/i.test(t);
}
function Dt(t) {
  const e = dt(t);
  if (!e) {
    t.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }
  const n = t.getBoundingClientRect(), o = e.getBoundingClientRect(), s = e.scrollTop + (n.top - o.top) - Ft;
  e.scrollTo({ top: Math.max(0, s), behavior: "smooth" });
}
function D(t, e) {
  const n = String(t || "").trim(), o = n.startsWith("#") ? n.slice(1) : n;
  if (!o) return false;
  const s = zt(o, e);
  return s ? ($t(o) ? Dt(s) : s.scrollIntoView({ block: "nearest", behavior: "smooth" }), true) : false;
}
function H(t, e) {
  var _a, _b;
  const n = (_a = t == null ? void 0 : t.closest) == null ? void 0 : _a.call(t, ".md-editor-preview");
  return n && e.contains(n) ? n : ((_b = e.querySelector) == null ? void 0 : _b.call(e, ".md-editor-preview")) ?? e;
}
function Ht(t) {
  return (t == null ? void 0 : t.querySelector) ? t.querySelector(`[${Y}]`) : null;
}
function B(t) {
  const e = Ht(t);
  if (!e) return;
  const n = !!(t && k.get(t));
  e.classList.toggle(It, !n), e.toggleAttribute("aria-hidden", !n), e.toggleAttribute("disabled", !n), e.setAttribute("data-footnote-return-target", (t && k.get(t)) ?? "");
}
function j(t) {
  t && k.delete(t), N = null, B(t);
}
function Wt(t, e) {
  t && e ? k.set(t, e) : t && k.delete(t), N = e || null, B(t);
}
function ne(t) {
  if (!t || typeof t.addEventListener != "function") return;
  const e = (n) => {
    var _a, _b, _c, _d;
    const o = n;
    if (o.metaKey || o.ctrlKey || o.shiftKey || o.altKey || typeof o.button == "number" && o.button !== 0) return;
    const s = (_b = (_a = o.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, `[${Y}]`);
    if (s instanceof HTMLElement && t.contains(s)) {
      const c = H(o.target, t), E = c && k.get(c) || N;
      if (!E) return;
      n.preventDefault(), n.stopPropagation(), D(E, c), j(c);
      return;
    }
    const l = (_d = (_c = o.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "a[href], a[data-md-footnote-to]");
    if (!l || !t.contains(l)) return;
    const d = l.getAttribute(Bt) || "", x = l.getAttribute("href") || "", a = d || (_t(x) ? x.slice(1) : "");
    if (!a) return;
    const r = H(o.target, t);
    if (n.preventDefault(), n.stopPropagation(), a && a.startsWith("source-")) {
      const c = l.getAttribute("data-md-footnote-id") || l.id;
      c ? Wt(r, c) : j(r);
    } else j(r);
    D(a, r);
  };
  return t.addEventListener("click", e, true), B(t), () => t.removeEventListener("click", e, true);
}
export {
  Jt as C,
  te as H,
  Zt as P,
  ee as a,
  Nt as b,
  pt as c,
  vt as d,
  bt as e,
  xt as f,
  ht as g,
  ne as h,
  Qt as n,
  Xt as r,
  K as u,
  Gt as w
};
