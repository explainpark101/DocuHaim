import { r as g, j as m } from "./vendor-react-BwEIQNKH.js";
import { A as H, m as W } from "./vendor-motion-CLW0brs2.js";
import { d as q, e as z, f as U, g as Q, h as X, A as Y } from "./vendor-radix-DOgSp64j.js";
import { k as p } from "./vendor-md-editor-D3gQZdJY.js";
const A = "data-md-tip", G = 280, J = 120, V = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, Z = "z-100050 max-w-[min(92vw,280px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
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
function St({ containerRef: t }) {
  const [e, n] = g.useState(null), [r, o] = g.useState(null), s = g.useRef(null), a = g.useRef(0), c = g.useRef(null), b = g.useCallback(() => {
    s.current != null && (clearTimeout(s.current), s.current = null);
  }, []), f = g.useCallback(() => {
    b(), c.current && (a.current = Date.now()), c.current = null, n(null), o(null);
  }, [b]), T = g.useCallback((i, y) => {
    const x = { el: i, text: y }, S = () => {
      c.current = x, n(x), o(D(i));
    };
    if (b(), c.current) {
      S();
      return;
    }
    const $ = Date.now() - a.current < J ? 0 : G;
    if ($ === 0) {
      S();
      return;
    }
    s.current = setTimeout(() => {
      s.current = null, S();
    }, $);
  }, [b]);
  g.useEffect(() => {
    const i = t.current;
    if (!i) return;
    O(i);
    const y = new MutationObserver((h) => {
      let d = false;
      for (const l of h) if (l.type === "childList" && l.addedNodes.length > 0 && (d = true), l.type === "attributes" && l.attributeName === "title" && l.target instanceof HTMLElement) {
        const u = l.target;
        if (!u.closest(".md-editor-toolbar")) continue;
        const w = u.getAttribute("title");
        if (!w) continue;
        if (u.setAttribute(A, w), u.removeAttribute("title"), c.current && u.closest(".md-editor-toolbar-item") === c.current.el) {
          const M = { el: c.current.el, text: w };
          c.current = M, n(M);
        }
      }
      d && O(i);
    });
    y.observe(i, { subtree: true, childList: true, attributes: true, attributeFilter: ["title"] });
    const x = (h) => {
      var _a;
      const d = h.target;
      if (!(d instanceof Element)) return;
      const l = d.closest(".md-editor-toolbar-item");
      if (!(l instanceof HTMLElement) || !i.contains(l)) return;
      const u = _(l);
      if (!u) {
        f();
        return;
      }
      ((_a = c.current) == null ? void 0 : _a.el) === l && c.current.text === u || T(l, u);
    }, S = (h) => {
      var _a;
      const d = h.target;
      if (!(d instanceof Element)) return;
      const l = d.closest(".md-editor-toolbar-item");
      if (!(l instanceof HTMLElement) || !i.contains(l)) return;
      const u = h.relatedTarget;
      u instanceof Node && l.contains(u) || (((_a = c.current) == null ? void 0 : _a.el) === l || s.current != null) && f();
    }, C = (h) => {
      const d = h.target;
      if (!(d instanceof Element)) return;
      const l = d.closest(".md-editor-toolbar-item");
      if (!(l instanceof HTMLElement) || !i.contains(l)) return;
      const u = _(l);
      u && T(l, u);
    }, $ = (h) => {
      var _a;
      const d = h.target;
      if (!(d instanceof Element)) return;
      const l = d.closest(".md-editor-toolbar-item");
      if (!(l instanceof HTMLElement) || !i.contains(l)) return;
      const u = h.relatedTarget;
      u instanceof Node && l.contains(u) || ((_a = c.current) == null ? void 0 : _a.el) === l && f();
    }, R = () => {
      f();
    };
    return i.addEventListener("pointerover", x), i.addEventListener("pointerout", S), i.addEventListener("focusin", C), i.addEventListener("focusout", $), i.addEventListener("pointerdown", R), () => {
      y.disconnect(), b(), i.removeEventListener("pointerover", x), i.removeEventListener("pointerout", S), i.removeEventListener("focusin", C), i.removeEventListener("focusout", $), i.removeEventListener("pointerdown", R);
    };
  }, [f, b, t, T]), g.useLayoutEffect(() => {
    var _a;
    if (!(e == null ? void 0 : e.el)) {
      o(null);
      return;
    }
    const i = () => {
      if (!e.el.isConnected) {
        f();
        return;
      }
      o(D(e.el));
    };
    i();
    const x = (_a = t.current) == null ? void 0 : _a.querySelector(".md-editor-toolbar-wrapper");
    return window.addEventListener("resize", i), window.addEventListener("scroll", i, true), x == null ? void 0 : x.addEventListener("scroll", i, { passive: true }), () => {
      window.removeEventListener("resize", i), window.removeEventListener("scroll", i, true), x == null ? void 0 : x.removeEventListener("scroll", i);
    };
  }, [e, f, t]);
  const N = !!(e && r && e.text);
  return m.jsx(q, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: m.jsxs(z, { open: N, onOpenChange: (i) => {
    i || f();
  }, children: [m.jsx(U, { asChild: true, children: m.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: r ? { top: r.top, left: r.left, width: Math.max(r.width, 1), height: Math.max(r.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), m.jsx(H, { children: N ? m.jsx(Q, { forceMount: true, children: m.jsx(X, { asChild: true, side: "top", sideOffset: 6, children: m.jsxs(W.div, { className: Z, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: V, children: [e == null ? void 0 : e.text, m.jsx(Y, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
const I = /^(\s*)([-+*])(\s+)(.*)$/, F = /^(\s*)(\d+)([.)])(\s+)(.*)$/, j = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/, tt = /^(#{1,10})\s+(.*)$/;
function et(t) {
  if (!t) return false;
  const e = t[0];
  return [...t].every((n) => n === e);
}
function B(t, e, n, r, o) {
  const s = e - r.length, a = n + o.length;
  if (s < 0 || a > t.length || t.sliceString(s, e) !== r || t.sliceString(n, a) !== o) return false;
  if (r === o && et(r)) {
    const c = r[0] ?? "";
    if (s > 0 && t.sliceString(s - 1, s) === c || a < t.length && t.sliceString(a, a + 1) === c) return false;
  }
  return true;
}
function nt(t, e, n, r) {
  const { from: o, to: s, empty: a } = e;
  if (a) {
    const f = `${n}${r}`;
    return { change: { from: o, to: s, insert: f }, next: p.cursor(o + n.length) };
  }
  const c = t.sliceString(o, s);
  if (c.length >= n.length + r.length && c.startsWith(n) && c.endsWith(r)) {
    const f = c.slice(n.length, c.length - r.length);
    return { change: { from: o, to: s, insert: f }, next: p.range(o, o + f.length) };
  }
  if (B(t, o, s, n, r)) {
    const f = o - n.length, T = s + r.length;
    return { change: { from: f, to: T, insert: c }, next: p.range(f, f + c.length) };
  }
  const b = `${n}${c}${r}`;
  return { change: { from: o, to: s, insert: b }, next: p.range(o + n.length, o + n.length + c.length) };
}
function rt(t, e) {
  if (e.empty) return null;
  const n = t.sliceString(e.from, e.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const a = n.slice(r.length, n.length - r.length);
    return { change: { from: e.from, to: e.to, insert: a }, next: p.range(e.from, e.from + a.length) };
  }
  if (B(t, e.from, e.to, r, r)) {
    const a = e.from - r.length, c = e.to + r.length;
    return { change: { from: a, to: c, insert: n }, next: p.range(a, a + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: e.from, to: e.to, insert: s }, next: p.range(e.from + r.length, e.from + r.length + n.length) };
}
function v(t, e) {
  if (!e.length) return false;
  const n = e.map((o) => o.change).filter((o) => !!o).sort((o, s) => o.from - s.from);
  if (!n.length) return false;
  const r = e.map((o) => o.next);
  return t.dispatch({ changes: n, selection: p.create(r, t.state.selection.mainIndex) }), true;
}
function E(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.selection.ranges.map((o) => nt(t.state.doc, o, e, n));
  return v(t, r);
}
function Et(t) {
  return E(t, "**");
}
function Lt(t) {
  return E(t, "*");
}
function Tt(t) {
  return E(t, "~~");
}
function yt(t) {
  return E(t, "<u>", "</u>");
}
function $t(t) {
  return E(t, "^");
}
function At(t) {
  return E(t, "~");
}
function ot(t) {
  if (!(t == null ? void 0 : t.state)) return false;
  const e = t.state.selection.ranges.map((n) => rt(t.state.doc, n) ?? { next: n });
  return v(t, e);
}
function st(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of t.state.selection.ranges) {
    const r = t.state.doc.lineAt(n.from).number, o = t.state.doc.lineAt(n.to).number;
    for (let s = r; s <= o; s += 1) e.add(s);
  }
  return [...e].sort((n, r) => n - r);
}
function k(t, e) {
  if (!(t == null ? void 0 : t.state)) return false;
  const n = [];
  for (const r of st(t)) {
    const o = t.state.doc.line(r), s = e(o.text);
    s !== null && s !== o.text && n.push({ from: o.from, to: o.to, insert: s });
  }
  return n.length ? (t.dispatch({ changes: n }), true) : false;
}
function it(t) {
  const e = t.match(I);
  if (e) return `${e[1] ?? ""}1. ${e[4] ?? ""}`;
  const n = t.match(F);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function ct(t) {
  const e = t.match(j);
  if (!e) return null;
  const n = e[1] ?? "", r = e[2] ?? " ", o = e[3] ?? "";
  return `${n}[${r === " " ? "x" : " "}]${o}`;
}
function kt(t) {
  return k(t, it);
}
function Ct(t) {
  return k(t, ct);
}
function wt(t) {
  return k(t, (e) => {
    const n = e.match(I);
    if (n) {
      const o = n[1] ?? "", s = n[4] ?? "";
      return j.test(e) ? `${o}- ${s.replace(/^\[[ xX]\]\s?/, "")}` : `${o}${s}`;
    }
    const r = e.match(F);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${e}`;
  });
}
function It(t) {
  return k(t, (e) => {
    const n = e.match(F);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = e.match(I);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${e}`;
  });
}
function Ft(t, e) {
  if (e < 1 || e > 10) return false;
  const n = "#".repeat(e);
  return k(t, (r) => {
    var _a;
    const o = r.match(tt);
    return o ? ((_a = o[1]) == null ? void 0 : _a.length) === e ? o[2] ?? "" : `${n} ${o[2] ?? ""}` : `${n} ${r}`;
  });
}
function L(t, e, n = e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const r = t.state.changeByRange((o) => {
    if (o.empty) return { range: o };
    const s = t.state.doc.sliceString(o.from, o.to), a = `${e}${s}${n}`;
    return { changes: { from: o.from, to: o.to, insert: a }, range: p.range(o.from + e.length, o.from + e.length + s.length) };
  });
  return r.changes.empty ? false : (t.dispatch(r), true);
}
function lt(t) {
  return L(t, "$");
}
function at(t) {
  return L(t, "[", "]");
}
function ut(t) {
  return L(t, "(", ")");
}
function ft(t) {
  return L(t, "{", "}");
}
function P(t) {
  return L(t, "'");
}
function K(t) {
  return L(t, '"');
}
function dt(t) {
  if (t.ctrlKey || t.metaKey || t.altKey) return false;
  const { key: e, code: n } = t;
  return e === "`" || e === "\u20A9" || e === "\\" || n === "Backquote" || n === "IntlBackslash";
}
function ht(t, e) {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return false;
  switch (e.key) {
    case "$":
      return lt(t);
    case "[":
      return at(t);
    case "(":
      return ut(t);
    case "{":
      return ft(t);
    case "'":
      return P(t);
    case '"':
      return K(t);
    default:
      return e.code === "Quote" ? e.shiftKey ? K(t) : P(t) : false;
  }
}
function Nt(t, e) {
  return !e || e.composing ? false : dt(t) && ot(e) ? true : ht(e, t);
}
export {
  St as M,
  Ct as a,
  Et as b,
  Lt as c,
  wt as d,
  yt as e,
  It as f,
  Tt as g,
  Nt as h,
  $t as i,
  At as j,
  Ft as k,
  ht as l,
  kt as t,
  ot as w
};
