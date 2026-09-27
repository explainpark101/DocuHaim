import { r as p, j as x } from "./vendor-react-BDjpSibw.js";
import { A as W, m as q } from "./vendor-motion-Djo_xQxQ.js";
import { h as z, i as U, j as X, k as Q, l as Y, A as G } from "./vendor-radix-qpbG9kXl.js";
import { o as b } from "./vendor-codemirror-Cs6dUi8u.js";
const A = "data-md-tip", J = 280, V = 120, Z = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, tt = "z-100050 max-w-[min(92vw,280px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function O(t) {
  t.querySelectorAll(".md-editor-toolbar [title]").forEach((e) => {
    const n = e, r = n.getAttribute("title");
    r && (n.setAttribute(A, r), n.removeAttribute("title"));
  });
}
function _(t) {
  var _a, _b, _c, _d, _e, _f;
  const n = (_b = (_a = t.hasAttribute(A) ? t : t.querySelector(`[${A}]`)) == null ? void 0 : _a.getAttribute(A)) == null ? void 0 : _b.trim();
  if (n) return n;
  const o = (_d = (_c = t.hasAttribute("title") ? t : t.querySelector("[title]")) == null ? void 0 : _c.getAttribute("title")) == null ? void 0 : _d.trim();
  return o || (((_f = (_e = t.hasAttribute("aria-label") ? t : t.querySelector("[aria-label]")) == null ? void 0 : _e.getAttribute("aria-label")) == null ? void 0 : _f.trim()) ?? "");
}
function D(t) {
  const e = t.getBoundingClientRect();
  return { top: e.top, left: e.left, width: e.width, height: e.height };
}
function Lt({ containerRef: t, enabled: e = true }) {
  const [n, r] = p.useState(null), [o, i] = p.useState(null), l = p.useRef(null), u = p.useRef(0), d = p.useRef(null), f = p.useCallback(() => {
    l.current != null && (clearTimeout(l.current), l.current = null);
  }, []), g = p.useCallback(() => {
    f(), d.current && (u.current = Date.now()), d.current = null, r(null), i(null);
  }, [f]), k = p.useCallback((s, y) => {
    const S = { el: s, text: y }, E = () => {
      d.current = S, r(S), i(D(s));
    };
    if (f(), d.current) {
      E();
      return;
    }
    const $ = Date.now() - u.current < V ? 0 : J;
    if ($ === 0) {
      E();
      return;
    }
    l.current = setTimeout(() => {
      l.current = null, E();
    }, $);
  }, [f]);
  p.useEffect(() => {
    if (!e) {
      g();
      return;
    }
    const s = t.current;
    if (!s) return;
    O(s);
    const y = new MutationObserver((m) => {
      let h = false;
      for (const c of m) if (c.type === "childList" && c.addedNodes.length > 0 && (h = true), c.type === "attributes" && c.attributeName === "title" && c.target instanceof HTMLElement) {
        const a = c.target;
        if (!a.closest(".md-editor-toolbar")) continue;
        const w = a.getAttribute("title");
        if (!w) continue;
        if (a.setAttribute(A, w), a.removeAttribute("title"), d.current && a.closest(".md-editor-toolbar-item") === d.current.el) {
          const R = { el: d.current.el, text: w };
          d.current = R, r(R);
        }
      }
      h && O(s);
    });
    y.observe(s, { subtree: true, childList: true, attributes: true, attributeFilter: ["title"] });
    const S = (m) => {
      var _a;
      const h = m.target;
      if (!(h instanceof Element)) return;
      const c = h.closest(".md-editor-toolbar-item");
      if (!(c instanceof HTMLElement) || !s.contains(c)) return;
      const a = _(c);
      if (!a) {
        g();
        return;
      }
      ((_a = d.current) == null ? void 0 : _a.el) === c && d.current.text === a || k(c, a);
    }, E = (m) => {
      var _a;
      const h = m.target;
      if (!(h instanceof Element)) return;
      const c = h.closest(".md-editor-toolbar-item");
      if (!(c instanceof HTMLElement) || !s.contains(c)) return;
      const a = m.relatedTarget;
      a instanceof Node && c.contains(a) || (((_a = d.current) == null ? void 0 : _a.el) === c || l.current != null) && g();
    }, I = (m) => {
      const h = m.target;
      if (!(h instanceof Element)) return;
      const c = h.closest(".md-editor-toolbar-item");
      if (!(c instanceof HTMLElement) || !s.contains(c)) return;
      const a = _(c);
      a && k(c, a);
    }, $ = (m) => {
      var _a;
      const h = m.target;
      if (!(h instanceof Element)) return;
      const c = h.closest(".md-editor-toolbar-item");
      if (!(c instanceof HTMLElement) || !s.contains(c)) return;
      const a = m.relatedTarget;
      a instanceof Node && c.contains(a) || ((_a = d.current) == null ? void 0 : _a.el) === c && g();
    }, P = () => {
      g();
    };
    return s.addEventListener("pointerover", S), s.addEventListener("pointerout", E), s.addEventListener("focusin", I), s.addEventListener("focusout", $), s.addEventListener("pointerdown", P), () => {
      y.disconnect(), f(), s.removeEventListener("pointerover", S), s.removeEventListener("pointerout", E), s.removeEventListener("focusin", I), s.removeEventListener("focusout", $), s.removeEventListener("pointerdown", P);
    };
  }, [g, f, t, e, k]), p.useLayoutEffect(() => {
    var _a;
    if (!e || !(n == null ? void 0 : n.el)) {
      i(null);
      return;
    }
    const s = () => {
      if (!n.el.isConnected) {
        g();
        return;
      }
      i(D(n.el));
    };
    s();
    const S = (_a = t.current) == null ? void 0 : _a.querySelector(".md-editor-toolbar-wrapper");
    return window.addEventListener("resize", s), window.addEventListener("scroll", s, true), S == null ? void 0 : S.addEventListener("scroll", s, { passive: true }), () => {
      window.removeEventListener("resize", s), window.removeEventListener("scroll", s, true), S == null ? void 0 : S.removeEventListener("scroll", s);
    };
  }, [n, g, t, e]);
  const N = !!(n && o && n.text);
  return x.jsx(z, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: x.jsxs(U, { open: N, onOpenChange: (s) => {
    s || g();
  }, children: [x.jsx(X, { asChild: true, children: x.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: o ? { top: o.top, left: o.left, width: Math.max(o.width, 1), height: Math.max(o.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), x.jsx(W, { children: N ? x.jsx(Q, { forceMount: true, children: x.jsx(Y, { asChild: true, side: "top", sideOffset: 6, children: x.jsxs(q.div, { className: tt, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: Z, children: [n == null ? void 0 : n.text, x.jsx(G, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
const F = /^(\s*)([-+*])(\s+)(.*)$/, M = /^(\s*)(\d+)([.)])(\s+)(.*)$/, K = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/, et = /^(#{1,10})\s+(.*)$/;
function nt(t) {
  if (!t) return false;
  const e = t[0];
  return [...t].every((n) => n === e);
}
function B(t, e, n, r, o) {
  const i = e - r.length, l = n + o.length;
  if (i < 0 || l > t.length || t.sliceString(i, e) !== r || t.sliceString(n, l) !== o) return false;
  if (r === o && nt(r)) {
    const u = r[0] ?? "";
    if (i > 0 && t.sliceString(i - 1, i) === u || l < t.length && t.sliceString(l, l + 1) === u) return false;
  }
  return true;
}
function rt(t, e, n, r) {
  const { from: o, to: i, empty: l } = e;
  if (l) {
    const f = `${n}${r}`;
    return { change: { from: o, to: i, insert: f }, next: b.cursor(o + n.length) };
  }
  const u = t.sliceString(o, i);
  if (u.length >= n.length + r.length && u.startsWith(n) && u.endsWith(r)) {
    const f = u.slice(n.length, u.length - r.length);
    return { change: { from: o, to: i, insert: f }, next: b.range(o, o + f.length) };
  }
  if (B(t, o, i, n, r)) {
    const f = o - n.length, g = i + r.length;
    return { change: { from: f, to: g, insert: u }, next: b.range(f, f + u.length) };
  }
  const d = `${n}${u}${r}`;
  return { change: { from: o, to: i, insert: d }, next: b.range(o + n.length, o + n.length + u.length) };
}
function ot(t, e) {
  if (e.empty) return null;
  const n = t.sliceString(e.from, e.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const l = n.slice(r.length, n.length - r.length);
    return { change: { from: e.from, to: e.to, insert: l }, next: b.range(e.from, e.from + l.length) };
  }
  if (B(t, e.from, e.to, r, r)) {
    const l = e.from - r.length, u = e.to + r.length;
    return { change: { from: l, to: u, insert: n }, next: b.range(l, l + n.length) };
  }
  const i = `${r}${n}${r}`;
  return { change: { from: e.from, to: e.to, insert: i }, next: b.range(e.from + r.length, e.from + r.length + n.length) };
}
function H(t, e) {
  if (!e.length) return false;
  const n = e.map((o) => o.change).filter((o) => !!o).sort((o, i) => o.from - i.from);
  if (!n.length) return false;
  const r = e.map((o) => o.next);
  return t.dispatch({ changes: n, selection: b.create(r, t.state.selection.mainIndex) }), true;
}
function L(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.selection.ranges.map((o) => rt(t.state.doc, o, e, n));
  return H(t, r);
}
function Tt(t) {
  return L(t, "**");
}
function yt(t) {
  return L(t, "*");
}
function $t(t) {
  return L(t, "~~");
}
function At(t) {
  return L(t, "<u>", "</u>");
}
function Ct(t) {
  return L(t, "^");
}
function kt(t) {
  return L(t, "~");
}
function it(t) {
  if (!(t == null ? void 0 : t.state)) return false;
  const e = t.state.selection.ranges.map((n) => ot(t.state.doc, n) ?? { next: n });
  return H(t, e);
}
function st(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t.state.selection.ranges) {
    const r = t.state.doc.lineAt(n.from).number, o = t.state.doc.lineAt(n.to).number;
    for (let i = r; i <= o; i += 1) e.add(i);
  }
  return [...e].sort((n, r) => n - r);
}
function C(t, e) {
  if (!(t == null ? void 0 : t.state)) return false;
  const n = [];
  for (const r of st(t)) {
    const o = t.state.doc.line(r), i = e(o.text);
    i !== null && i !== o.text && n.push({ from: o.from, to: o.to, insert: i });
  }
  return n.length ? (t.dispatch({ changes: n }), true) : false;
}
function ct(t) {
  const e = t.match(F);
  if (e) return `${e[1] ?? ""}1. ${e[4] ?? ""}`;
  const n = t.match(M);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function lt(t) {
  const e = t.match(K);
  if (!e) return null;
  const n = e[1] ?? "", r = e[2] ?? " ", o = e[3] ?? "";
  return `${n}[${r === " " ? "x" : " "}]${o}`;
}
function It(t) {
  return C(t, ct);
}
function wt(t) {
  return C(t, lt);
}
function Ft(t) {
  return C(t, (e) => {
    const n = e.match(F);
    if (n) {
      const o = n[1] ?? "", i = n[4] ?? "";
      return K.test(e) ? `${o}- ${i.replace(/^\[[ xX]\]\s?/, "")}` : `${o}${i}`;
    }
    const r = e.match(M);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${e}`;
  });
}
function Mt(t) {
  return C(t, (e) => {
    const n = e.match(M);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = e.match(F);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${e}`;
  });
}
function Nt(t, e) {
  if (e < 1 || e > 10) return false;
  const n = "#".repeat(e);
  return C(t, (r) => {
    var _a;
    const o = r.match(et);
    return o ? ((_a = o[1]) == null ? void 0 : _a.length) === e ? o[2] ?? "" : `${n} ${o[2] ?? ""}` : `${n} ${r}`;
  });
}
function T(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.changeByRange((o) => {
    if (o.empty) return { range: o };
    const i = t.state.doc.sliceString(o.from, o.to), l = `${e}${i}${n}`;
    return { changes: { from: o.from, to: o.to, insert: l }, range: b.range(o.from + e.length, o.from + e.length + i.length) };
  });
  return r.changes.empty ? false : (t.dispatch(r), true);
}
function at(t) {
  return T(t, "$");
}
function ut(t) {
  return T(t, "[", "]");
}
function ft(t) {
  return T(t, "(", ")");
}
function dt(t) {
  return T(t, "{", "}");
}
function v(t) {
  return T(t, "'");
}
function j(t) {
  return T(t, '"');
}
function ht() {
  if (typeof navigator > "u") return false;
  const t = navigator.platform || "", e = navigator.userAgent || "";
  return !!(/iPhone|iPad|iPod/i.test(e) || /iPhone|iPad|iPod/i.test(t) || /Mac/i.test(t) || /Mac OS X/i.test(e));
}
function gt(t) {
  if (t.ctrlKey || t.metaKey || t.altKey) return false;
  const { key: e, code: n } = t;
  return e === "`" || n === "Backquote" ? true : ht() ? e === "\u20A9" || e === "\\" || n === "IntlBackslash" : false;
}
function mt(t, e) {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return false;
  switch (e.key) {
    case "$":
      return at(t);
    case "[":
      return ut(t);
    case "(":
      return ft(t);
    case "{":
      return dt(t);
    case "'":
      return v(t);
    case '"':
      return j(t);
    default:
      return e.code === "Quote" ? e.shiftKey ? j(t) : v(t) : false;
  }
}
function Pt(t, e) {
  return !e || e.composing ? false : gt(t) && it(e) ? true : mt(e, t);
}
export {
  Lt as M,
  wt as a,
  Tt as b,
  yt as c,
  Ft as d,
  At as e,
  Mt as f,
  $t as g,
  Pt as h,
  Ct as i,
  kt as j,
  Nt as k,
  mt as l,
  It as t,
  it as w
};
