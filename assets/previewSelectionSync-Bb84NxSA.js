import { o as S } from "./vendor-codemirror-Cs6dUi8u.js";
const J = /!\[\[([^[\]]*)\]\]/g, Q = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
let G = false;
function _t() {
  G = true;
}
function Dt() {
  G = false;
}
function j() {
  return G;
}
function rt(e, n) {
  const t = [];
  J.lastIndex = 0;
  let i;
  for (; (i = J.exec(e)) !== null; ) t.push({ from: n + i.index, to: n + i.index + i[0].length, kind: "wiki" });
  for (Q.lastIndex = 0; (i = Q.exec(e)) !== null; ) {
    const r = n + i.index, o = r + i[0].length;
    t.some((l) => !(o <= l.from || r >= l.to)) || t.push({ from: r, to: o, kind: "markdown" });
  }
  return t.sort((r, o) => r.from - o.from), t;
}
function N(e, n) {
  const t = e.lineAt(n), i = rt(t.text, t.from);
  for (const r of i) if (n >= r.from && n <= r.to) return r;
  return null;
}
function Et(e, n) {
  if (!j()) return false;
  const t = e.state.selection.main.head, i = e.state.doc, r = N(i, t);
  if (r) {
    if (n === 1 && t < r.to) return e.dispatch({ selection: S.cursor(r.to), scrollIntoView: true }), true;
    if (n === -1 && t > r.from) return e.dispatch({ selection: S.cursor(r.from), scrollIntoView: true }), true;
  }
  if (n === 1 && t < i.length) {
    const o = i.lineAt(t), l = rt(o.text, o.from).find((c) => c.from === t);
    if (l) return e.dispatch({ selection: S.cursor(l.to), scrollIntoView: true }), true;
  }
  if (n === -1 && t > 0) {
    const o = N(i, t - 1);
    if (o && o.to === t) return e.dispatch({ selection: S.cursor(o.from), scrollIntoView: true }), true;
  }
  return false;
}
function Ct(e, n) {
  if (!j()) return false;
  const t = e.state.selection.main.head, i = N(e.state.doc, t);
  if (!i) return false;
  let r = null;
  return t > i.from && t < i.to ? r = n === 1 ? i.to : i.from : n === 1 && t === i.from ? r = i.to : n === -1 && t === i.to && (r = i.from), r == null || r === t ? false : (e.dispatch({ selection: S.cursor(r), scrollIntoView: true }), true);
}
function qt(e, n, t) {
  return j() ? Et(e, n) ? true : t(e) ? (Ct(e, n), true) : false : false;
}
function xt(e, n, t) {
  var _a, _b;
  const i = N(e, n), r = i && n > i.from ? i.from : n, o = e.sliceString(0, r);
  return t === "wiki" ? ((_a = o.match(/!\[\[[^[\]]*\]\]/g)) == null ? void 0 : _a.length) ?? 0 : ((_b = o.match(/!\[[^\]]*\]\([^)\n]+\)(?:\{[^}\n]*\})?/g)) == null ? void 0 : _b.length) ?? 0;
}
function F(e) {
  const n = e.closest("figure");
  if (n instanceof HTMLElement) return n;
  const t = e.closest("p.md-editor-wiki-image, span.md-editor-wiki-image");
  return t instanceof HTMLElement && !(t.textContent ?? "").replace(/\u00a0/g, " ").trim() ? t : e;
}
function Tt(e, n) {
  return n === "wiki" ? [...e.querySelectorAll("img[data-wiki-path]")].filter((t) => t instanceof HTMLImageElement) : [...e.querySelectorAll("img")].filter((t) => t instanceof HTMLImageElement && !t.hasAttribute("data-wiki-path"));
}
function Mt(e, n) {
  try {
    const t = document.createRange();
    return n === "before" ? t.setStartBefore(e) : t.setStartAfter(e), t.collapse(true), t;
  } catch {
    return null;
  }
}
function P(e, n, t) {
  const i = e.state.doc;
  let r = N(i, t), o = null;
  if (r && (t <= r.from ? o = "before" : t >= r.to ? o = "after" : o = t - r.from <= r.to - t ? "before" : "after"), !r || !o) return null;
  const l = xt(i, r.from, r.kind), u = Tt(n, r.kind)[l];
  if (!u) return null;
  const m = F(u);
  return Mt(m, o);
}
function it(e, n) {
  const t = e.getBoundingClientRect(), i = Math.max(t.height, 14);
  return n === "before" ? new DOMRect(t.left, t.top, 0, i) : new DOMRect(t.right, t.top, 0, i);
}
function ot(e, n) {
  try {
    if (e.startContainer instanceof Element) {
      const t = e.startContainer, i = t.childNodes[e.startOffset - 1], r = t.childNodes[e.startOffset], o = (u) => {
        var _a;
        if (!(u instanceof HTMLElement)) return null;
        if (u.tagName === "IMG") return F(u);
        if (u.tagName === "FIGURE") return u;
        const m = (_a = u.querySelector) == null ? void 0 : _a.call(u, "img");
        return m instanceof HTMLElement ? F(m) : null;
      }, l = o(r);
      if (l && n.contains(l)) return { host: l, side: "before" };
      const c = o(i);
      if (c && n.contains(c)) return { host: c, side: "after" };
    }
  } catch {
  }
  return null;
}
function St(e, n) {
  let t = (e == null ? void 0 : e.nodeType) === Node.TEXT_NODE ? e.parentElement : e;
  for (; t && t !== n; ) {
    if (t instanceof HTMLElement && t.hasAttribute("data-line")) return t;
    t = t.parentElement;
  }
  return null;
}
function B(e, n) {
  let t = (e == null ? void 0 : e.nodeType) === Node.TEXT_NODE ? e.parentElement : e;
  for (; t && t !== n; ) {
    if (t instanceof HTMLTableCellElement) return t;
    t = t.parentElement;
  }
  return null;
}
function _(e) {
  const n = e.trim();
  if (!n.includes("|") && !n.includes("-")) return false;
  const i = n.replace(/^\|/, "").replace(/\|$/, "").split("|");
  return i.length === 0 ? false : i.every((r) => /^\s*:?-+:?\s*$/.test(r) && r.includes("-"));
}
function x(e) {
  return e.includes("|");
}
function lt(e) {
  var _a, _b, _c, _d, _e, _f;
  const n = [], t = ((_b = (_a = e.match(/^\s*/)) == null ? void 0 : _a[0]) == null ? void 0 : _b.length) ?? 0;
  let i = e.trim();
  if (!i) return n;
  let r = t;
  i.startsWith("|") && (i = i.slice(1), r += 1), i.endsWith("|") && (i = i.slice(0, -1));
  let o = 0;
  const l = i.length;
  for (; o <= l; ) {
    const c = o;
    for (; o < l && i[o] !== "|"; ) o += 1;
    const u = o, m = i.slice(c, u), f = ((_d = (_c = m.match(/^\s*/)) == null ? void 0 : _c[0]) == null ? void 0 : _d.length) ?? 0, a = ((_f = (_e = m.match(/\s*$/)) == null ? void 0 : _e[0]) == null ? void 0 : _f.length) ?? 0, s = r + c + f, h = Math.max(s, r + u - a);
    if (n.push({ contentFrom: s, contentTo: h, text: e.slice(s, h) }), o >= l) break;
    o += 1;
  }
  return n;
}
function st(e) {
  return [...e.querySelectorAll("tr")].filter((n) => n instanceof HTMLTableRowElement);
}
function Z(e) {
  const n = e.parentElement;
  if (!(n instanceof HTMLTableRowElement)) return 0;
  let t = 0;
  for (const i of n.querySelectorAll(":scope > th, :scope > td")) if (i instanceof HTMLTableCellElement) {
    if (i === e) return t;
    t += Math.max(1, Number(i.getAttribute("colspan") || 1) || 1);
  }
  return 0;
}
function v(e) {
  const n = e.closest("table");
  return n instanceof HTMLTableElement ? st(n).indexOf(e.parentElement) : -1;
}
function ct(e, n, t) {
  const i = St(t, n) || (t.hasAttribute("data-line") ? t : null);
  if (!i) return [];
  const r = Number(i.getAttribute("data-line"));
  if (!Number.isFinite(r)) return [];
  const o = e.state.doc, l = [...t.querySelectorAll("[data-line]")].map((s) => Number(s.getAttribute("data-line"))).filter((s) => Number.isFinite(s)), c = Math.min(r, ...l), u = Math.max(r, ...l);
  let m = Math.min(o.lines, Math.max(1, c + 1));
  for (; m <= o.lines; ) {
    const s = o.line(m).text;
    if (x(s)) break;
    if (!s.trim() || /haim-table/i.test(s) || s.trim().startsWith("<!--")) {
      m += 1;
      continue;
    }
    break;
  }
  if (m > o.lines || !x(o.line(m).text)) return [];
  let f = m;
  for (; f + 1 <= o.lines; ) {
    const s = o.line(f + 1).text;
    if (!s.trim() || !x(s)) break;
    f += 1;
  }
  for (f = Math.max(f, Math.min(o.lines, u + 1)); f + 1 <= o.lines; ) {
    const s = o.line(f + 1).text;
    if (!s.trim() || !x(s) || _(s)) break;
    f += 1;
  }
  const a = [];
  for (let s = m; s <= f; s += 1) {
    const h = o.line(s);
    x(h.text) && (_(h.text) || a.push({ line0: s - 1, lineText: h.text, lineFrom: h.from, spans: lt(h.text) }));
  }
  return a;
}
function Nt(e, n) {
  if (!e.length) return 0;
  for (let t = 0; t < e.length; t += 1) {
    const i = e[t], r = e[t + 1], o = r ? r.contentFrom : i.contentTo + 1;
    if (n < o || n <= i.contentTo) return t;
  }
  return e.length - 1;
}
function yt(e, n = 0) {
  var _a, _b;
  try {
    const t = document.createRange(), i = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    let r = Math.max(0, n), o = i.nextNode(), l = null;
    for (; o; ) {
      l = o;
      const c = ((_a = o.textContent) == null ? void 0 : _a.length) ?? 0;
      if (r <= c) return t.setStart(o, r), t.collapse(true), t;
      r -= c, o = i.nextNode();
    }
    return l ? (t.setStart(l, ((_b = l.textContent) == null ? void 0 : _b.length) ?? 0), t.collapse(true), t) : (t.setStart(e, 0), t.collapse(true), t);
  } catch {
    return null;
  }
}
function at(e, n, t) {
  const i = B(t.startContainer, n), r = B(t.endContainer, n);
  if (!i && !r) return null;
  const o = i || r;
  if (!o) return null;
  const l = o.closest("table");
  if (!(l instanceof HTMLTableElement)) return null;
  const c = ct(e, n, l);
  if (!c.length) return null;
  const u = v(o);
  if (u < 0 || u >= c.length) return null;
  const m = Z(o), f = c[u], a = f.spans[m] ?? f.spans[f.spans.length - 1];
  if (!a) return { from: f.lineFrom, to: f.lineFrom };
  let s = f.lineFrom + a.contentFrom, h = s;
  if (!t.collapsed && i && r && i === r) {
    const d = Math.min(M(o, t.startContainer, t.startOffset), M(o, t.endContainer, t.endOffset)), p = Math.max(M(o, t.startContainer, t.startOffset), M(o, t.endContainer, t.endOffset));
    s = f.lineFrom + a.contentFrom + Math.min(d, a.text.length), h = f.lineFrom + a.contentFrom + Math.min(p, a.text.length);
  } else if (!t.collapsed && i && r && i !== r) {
    const d = v(r), p = Z(r), g = c[Math.min(d, c.length - 1)], b = g.spans[p] ?? g.spans[g.spans.length - 1];
    s = f.lineFrom + a.contentFrom, h = b ? g.lineFrom + b.contentTo : f.lineFrom + a.contentTo;
  } else {
    const d = M(o, t.startContainer, t.startOffset);
    s = f.lineFrom + a.contentFrom + Math.min(d, a.text.length), h = s;
  }
  return { from: s, to: h };
}
function M(e, n, t) {
  var _a, _b, _c, _d;
  if (n === e) {
    if (t <= 0) return 0;
    let l = 0;
    for (let c = 0; c < Math.min(t, e.childNodes.length); c += 1) l += ((_b = (_a = e.childNodes[c]) == null ? void 0 : _a.textContent) == null ? void 0 : _b.length) ?? 0;
    return l;
  }
  if (!e.contains(n)) return 0;
  const i = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  let r = 0, o = i.nextNode();
  for (; o; ) {
    if (o === n) return r + Math.max(0, Math.min(t, ((_c = o.textContent) == null ? void 0 : _c.length) ?? 0));
    r += ((_d = o.textContent) == null ? void 0 : _d.length) ?? 0, o = i.nextNode();
  }
  return r;
}
function w(e, n, t) {
  const i = e.state.doc.lineAt(t), r = i.text;
  if (!x(r) || _(r)) return null;
  const o = i.number - 1, l = t - i.from, c = lt(r);
  if (!c.length) return null;
  const u = Nt(c, l), m = c[u], f = Math.max(0, Math.min(m.text.length, l - m.contentFrom)), a = [...n.querySelectorAll("table")];
  for (const s of a) {
    if (!(s instanceof HTMLTableElement)) continue;
    const d = ct(e, n, s).findIndex((b) => b.line0 === o);
    if (d < 0) continue;
    const p = st(s)[d];
    if (!p) continue;
    const g = Lt(p, u);
    if (g) return yt(g, f);
  }
  return null;
}
function Lt(e, n) {
  let t = 0;
  for (const i of e.querySelectorAll(":scope > th, :scope > td")) {
    if (!(i instanceof HTMLTableCellElement)) continue;
    const r = Math.max(1, Number(i.getAttribute("colspan") || 1) || 1);
    if (n >= t && n < t + r) return i;
    t += r;
  }
  return null;
}
function At(e) {
  const n = e.getBoundingClientRect(), t = window.getComputedStyle(e), i = Number.parseFloat(t.paddingLeft) || 0, r = Number.parseFloat(t.paddingTop) || 0, o = Number.parseFloat(t.paddingBottom) || 0, l = Math.max(n.height - r - o, 14);
  return new DOMRect(n.left + i, n.top + r, 0, l);
}
const D = "s3haim-preview-sync-sel", q = "data-preview-sel-mirror", $ = "data-preview-caret-mirror", ft = 4;
let C = null;
function ut(e) {
  C = e ? e.cloneRange() : null;
}
function O(e, n) {
  let t = (e == null ? void 0 : e.nodeType) === Node.TEXT_NODE ? e.parentElement : e;
  for (; t && t !== n; ) {
    if (t instanceof HTMLElement && t.hasAttribute("data-line")) return t;
    t = t.parentElement;
  }
  return null;
}
function k(e, n, t) {
  if (!e.contains(n) && n !== e) return 0;
  let i = 0;
  const r = (o) => {
    var _a, _b;
    if (o === n) {
      if (o.nodeType === Node.TEXT_NODE) return i += Math.max(0, Math.min(t, ((_a = o.textContent) == null ? void 0 : _a.length) ?? 0)), true;
      if (o instanceof Element) {
        for (let l = 0; l < Math.min(t, o.childNodes.length); l += 1) i += mt(o.childNodes[l]);
        return true;
      }
    }
    if (o.nodeType === Node.TEXT_NODE) return i += ((_b = o.textContent) == null ? void 0 : _b.length) ?? 0, false;
    if (o instanceof HTMLBRElement) return i += 1, false;
    if (o instanceof Element) {
      for (const l of o.childNodes) if (r(l)) return true;
    }
    return false;
  };
  return r(e), i;
}
function mt(e) {
  var _a;
  if (e.nodeType === Node.TEXT_NODE) return ((_a = e.textContent) == null ? void 0 : _a.length) ?? 0;
  if (e instanceof HTMLBRElement) return 1;
  let n = 0;
  if (e instanceof Element) for (const t of e.childNodes) n += mt(t);
  return n;
}
function W(e) {
  let n = "";
  const t = (i) => {
    if (i.nodeType === Node.TEXT_NODE) {
      n += i.textContent ?? "";
      return;
    }
    if (i instanceof HTMLBRElement) {
      n += `
`;
      return;
    }
    if (i instanceof Element) for (const r of i.childNodes) t(r);
  };
  return t(e), n;
}
function tt(e) {
  const n = e.parentNode;
  if (!n) return null;
  const t = Array.prototype.indexOf.call(n.childNodes, e);
  return t < 0 ? null : { node: n, offset: t + 1 };
}
function ht(e, n, t, i) {
  const r = e.state.doc, o = Math.max(0, Math.min(t, i)), l = Math.max(t, i), u = [...n.querySelectorAll("[data-line]")].map((s) => Number(s.getAttribute("data-line"))).filter((s) => Number.isFinite(s)).sort((s, h) => s - h).find((s) => s > l), m = Math.min(r.lines, Math.max(1, o + 1)), f = r.line(m).from;
  let a;
  return u != null && u + 1 <= r.lines ? a = r.line(u + 1).from : a = r.length, a < f ? { from: f, to: f } : { from: f, to: a };
}
function R(e, n, t) {
  const i = Math.max(0, Math.min(t, n.length));
  let r = 0, o = 0;
  for (; r < e.length && o < i; ) {
    const l = e[r], c = n[o];
    if (l === void 0 || c === void 0) break;
    if (l === c) {
      r += 1, o += 1;
      continue;
    }
    if (/\s/.test(l) || /\s/.test(c)) {
      for (; r < e.length && /\s/.test(e[r] ?? ""); ) r += 1;
      for (; o < i && /\s/.test(n[o] ?? ""); ) o += 1;
      continue;
    }
    r += 1;
  }
  return r;
}
function Ot(e, n, t) {
  const i = Math.max(0, Math.min(t, e.length));
  let r = 0, o = 0;
  for (; r < i && r < e.length; ) {
    const l = e[r], c = n[o];
    if (l === void 0) break;
    if (c !== void 0 && l === c) {
      r += 1, o += 1;
      continue;
    }
    if (c !== void 0 && (/\s/.test(l) || /\s/.test(c))) {
      for (; r < i && /\s/.test(e[r] ?? ""); ) r += 1;
      for (; o < n.length && /\s/.test(n[o] ?? ""); ) o += 1;
      continue;
    }
    r += 1;
  }
  return Math.max(0, Math.min(o, n.length));
}
function It(e, n) {
  let t = Math.max(0, n), i = null;
  const r = (l) => {
    var _a;
    if (l.nodeType === Node.TEXT_NODE) {
      const c = ((_a = l.textContent) == null ? void 0 : _a.length) ?? 0;
      return t <= c ? { node: l, offset: t } : (t -= c, i = { node: l, offset: c }, null);
    }
    if (l instanceof HTMLBRElement) return t === 0 || (t -= 1, t === 0) ? tt(l) : null;
    if (l instanceof Element) for (const c of l.childNodes) {
      const u = r(c);
      if (u) return u;
    }
    return null;
  }, o = r(e);
  return o || i || { node: e, offset: 0 };
}
function V(e, n) {
  let t = null, i = -1;
  for (const r of e.querySelectorAll("[data-line]")) {
    if (!(r instanceof HTMLElement)) continue;
    const o = Number(r.getAttribute("data-line"));
    Number.isFinite(o) && o <= n && o >= i && (t = r, i = o);
  }
  return t;
}
function dt(e, n) {
  if (!(e == null ? void 0 : e.state) || !n) return null;
  const t = e.state.selection.main, i = t.from, r = t.to;
  if (i === r) {
    const s = P(e, n, i);
    if (s) return s;
  } else {
    const s = P(e, n, i), h = P(e, n, r);
    if (s && h) try {
      const d = document.createRange();
      return d.setStart(s.startContainer, s.startOffset), d.setEnd(h.startContainer, h.startOffset), d;
    } catch {
    }
  }
  if (i === r) {
    const s = w(e, n, i);
    if (s) return s;
  } else {
    const s = w(e, n, i), h = w(e, n, r);
    if (s && h) try {
      const d = document.createRange();
      return d.setStart(s.startContainer, s.startOffset), d.setEnd(h.startContainer, h.startOffset), d;
    } catch {
    }
  }
  const o = e.state.doc.lineAt(i).number - 1, l = e.state.doc.lineAt(r).number - 1, c = V(n, o), u = V(n, l);
  if (!c || !u) return null;
  const m = (s, h) => {
    const d = Number(h.getAttribute("data-line"));
    if (!Number.isFinite(d)) return null;
    const { from: p, to: g } = ht(e, n, d, d), b = e.state.doc.sliceString(p, g), E = W(h), T = Ot(b, E, Math.max(0, Math.min(s, g) - p));
    return It(h, T);
  }, f = m(i, c), a = m(r, u);
  if (!f || !a) return null;
  try {
    const s = document.createRange();
    return s.setStart(f.node, f.offset), s.setEnd(a.node, a.offset), s;
  } catch {
    return null;
  }
}
function Ht(e, n) {
  if (!n) return 0;
  let t = 0, i = 0, r = e.indexOf(n, i);
  for (; r !== -1; ) t += 1, i = r + Math.max(1, n.length), r = e.indexOf(n, i);
  return t;
}
function et(e, n, t) {
  if (!n) return null;
  let i = 0, r = -1, o = 0;
  for (; (r = e.indexOf(n, i)) !== -1; ) {
    if (o === t) return { from: r, to: r + n.length };
    o += 1, i = r + 1;
  }
  return null;
}
function Pt(e, n, t) {
  if (!t || n >= e.length) return null;
  const i = e[n], r = t[0];
  if (i === void 0 || r === void 0 || i !== r && !(/\s/.test(i) && /\s/.test(r))) return null;
  let o = n, l = 0;
  for (; o < e.length && l < t.length; ) {
    const c = e[o], u = t[l];
    if (c === void 0 || u === void 0) break;
    if (c === u) {
      o += 1, l += 1;
      continue;
    }
    if (/\s/.test(c) && /\s/.test(u)) {
      for (; o < e.length && /\s/.test(e[o] ?? ""); ) o += 1;
      for (; l < t.length && /\s/.test(t[l] ?? ""); ) l += 1;
      continue;
    }
    if (c !== u && !/\s/.test(u)) {
      o += 1;
      continue;
    }
    return null;
  }
  return l < t.length ? null : { from: n, to: o };
}
function nt(e, n, t) {
  if (!n) return null;
  const i = [];
  for (let r = 0; r < e.length; r += 1) {
    const o = Pt(e, r, n);
    if (o) {
      if (i.push(o), i.length > t) break;
      r = Math.max(r, o.to - 1);
    }
  }
  return i[t] ?? i[0] ?? null;
}
function wt(e, n) {
  var _a, _b, _c;
  if (!(e == null ? void 0 : e.state) || !n) return null;
  const t = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  if (!t || t.rangeCount === 0) return null;
  const i = t.getRangeAt(0);
  if (!n.contains(i.commonAncestorContainer)) return null;
  const r = at(e, n, i);
  if (r) return r;
  const o = O(i.startContainer, n), l = O(i.endContainer, n);
  if (!o && !l) return null;
  const c = Number((_b = o || l) == null ? void 0 : _b.getAttribute("data-line")), u = Number((_c = l || o) == null ? void 0 : _c.getAttribute("data-line"));
  if (!Number.isFinite(c) || !Number.isFinite(u)) return null;
  const { from: m, to: f } = ht(e, n, c, u), a = e.state.doc.sliceString(m, f);
  if (!a) return { from: m, to: m };
  if (i.collapsed) {
    const g = o || l, b = g ? W(g) : "", E = g ? k(g, i.startContainer, i.startOffset) : 0, T = R(a, b, E), y = m + Math.max(0, Math.min(T, a.length));
    return { from: y, to: y };
  }
  const s = t.toString();
  if (!s) return null;
  let h = 0;
  try {
    const g = document.createRange();
    g.setStart(n, 0), g.setEnd(i.startContainer, i.startOffset), h = Ht(g.toString(), s);
  } catch {
    h = 0;
  }
  const d = et(a, s, h) || et(a, s, 0);
  if (d) return { from: m + d.from, to: m + d.to };
  if (o && o === l) {
    const g = W(o), b = k(o, i.startContainer, i.startOffset), E = k(o, i.endContainer, i.endOffset), T = Math.min(b, E), y = Math.max(b, E), K = R(a, g, T), U = R(a, g, y);
    return { from: m + Math.min(K, U), to: m + Math.max(K, U) };
  }
  const p = nt(a, s, h) || nt(a, s, 0);
  return p ? { from: m + p.from, to: m + p.to } : { from: m, to: f };
}
function X() {
  const e = globalThis.CSS;
  return !e || !("highlights" in e) || typeof Highlight > "u" ? null : e.highlights;
}
function H(e) {
  e.querySelectorAll(`[${q}]`).forEach((t) => t.remove()), e.querySelectorAll(`[${$}]`).forEach((t) => t.remove());
  const n = e.closest(".md-editor-preview-wrapper");
  n == null ? void 0 : n.querySelectorAll(`[${q}]`).forEach((t) => t.remove()), n == null ? void 0 : n.querySelectorAll(`[${$}]`).forEach((t) => t.remove());
}
function I(e) {
  var _a;
  ut(null), (_a = X()) == null ? void 0 : _a.delete(D), e && H(e);
}
function gt(e) {
  getComputedStyle(e).position === "static" && (e.style.position = "relative");
}
const kt = 32;
function L(e) {
  const n = getComputedStyle(e).overflowY;
  return n === "auto" || n === "scroll" || n === "overlay";
}
function pt(e) {
  const n = e.closest(".md-editor-preview-wrapper");
  if (n instanceof HTMLElement) {
    if (L(n)) return n;
    const r = n.firstElementChild;
    if (r instanceof HTMLElement && L(r)) return r;
  }
  const t = e.closest(".md-editor-custom-scrollbar");
  if (t instanceof HTMLElement) {
    const r = t.firstElementChild;
    if (r instanceof HTMLElement && L(r)) return r;
  }
  let i = e instanceof HTMLElement ? e : e.parentElement;
  for (; i; ) {
    if (L(i)) return i;
    i = i.parentElement;
  }
  return null;
}
function Y(e, n) {
  const t = kt, i = e.getBoundingClientRect();
  let r = 0, o = 0;
  n.top < i.top + t ? r = n.top - (i.top + t) : n.bottom > i.bottom - t && (r = n.bottom - (i.bottom - t)), n.left < i.left + t ? o = n.left - (i.left + t) : n.right > i.right - t && (o = n.right - (i.right - t)), r !== 0 && (e.scrollTop += r), o !== 0 && (e.scrollLeft += o);
}
function A(e, n, t) {
  const i = pt(e);
  if (!i) return;
  let r = t ?? null;
  if (!r) {
    const o = e.querySelector(".s3haim-preview-caret-mirror-bar");
    if (o instanceof HTMLElement) {
      const l = o.getBoundingClientRect();
      (l.height > 0 || l.width > 0) && (r = l);
    }
  }
  if (!r) {
    const o = ot(n, e);
    o && (r = it(o.host, o.side));
  }
  if (!r) try {
    const o = n.getClientRects();
    if (o.length > 0) r = n.collapsed ? o[0] : o[o.length - 1];
    else {
      const l = n.getBoundingClientRect();
      (l.height > 0 || l.width > 0) && (r = l);
    }
  } catch {
    r = null;
  }
  if (!r || r.height <= 0 && r.width <= 0) {
    const o = O(n.startContainer, e);
    o && Y(i, o.getBoundingClientRect());
    return;
  }
  Y(i, r);
}
function $t(e, n) {
  if (!(e == null ? void 0 : e.state) || !n) return false;
  const t = dt(e, n);
  if (t) return A(n, t), true;
  const i = e.state.doc.lineAt(e.state.selection.main.head).number - 1, r = V(n, i);
  if (!r) return false;
  const o = pt(n);
  return o ? (Y(o, r.getBoundingClientRect()), true) : false;
}
function Rt(e, n, t) {
  const i = e instanceof HTMLElement ? e : null;
  if (!i) return;
  gt(i);
  let r = t ?? null;
  const o = r ? null : ot(n, e), l = r ? null : B(n.startContainer, e);
  if (!r) if (o) r = it(o.host, o.side);
  else if (l) {
    r = At(l);
    try {
      const f = n.getClientRects(), a = f.length > 0 ? f[0] : null;
      if (a && a.height > 0 && a.width >= 0) {
        const s = l.getBoundingClientRect();
        a.left >= s.left - 1 && a.right <= s.right + 1 && a.top >= s.top - 1 && a.bottom <= s.bottom + 1 && (r = new DOMRect(a.left, a.top, 0, Math.max(a.height, 14)));
      }
    } catch {
    }
  } else {
    try {
      const f = n.getClientRects();
      if (f.length > 0) r = f[0];
      else {
        const a = n.getBoundingClientRect();
        (a.height > 0 || a.width > 0) && (r = a);
      }
    } catch {
      r = null;
    }
    if ((!r || r.height <= 0) && n.collapsed && n.startContainer instanceof Element) {
      const f = n.startContainer.childNodes[n.startOffset - 1];
      if (f instanceof HTMLBRElement) {
        const a = f.parentElement ?? i, s = getComputedStyle(a), h = Number.parseFloat(s.lineHeight) || (Number.parseFloat(s.fontSize) || 16) * 1.5;
        let d = a.getBoundingClientRect().left, p = f.getBoundingClientRect().bottom;
        const g = f.previousSibling;
        if (g) try {
          const b = document.createRange();
          b.selectNodeContents(g);
          const E = b.getBoundingClientRect();
          (E.height > 0 || E.width > 0) && (d = E.left, p = E.bottom);
        } catch {
        }
        r = new DOMRect(d, p, 0, Math.max(h * 0.85, 14));
      }
    }
    if (!r || r.height <= 0) {
      const f = O(n.startContainer, e) || (n.startContainer instanceof HTMLElement ? n.startContainer : null);
      if (f) {
        const a = f.getBoundingClientRect();
        r = new DOMRect(a.left, a.top, 0, Math.max(a.height || 0, 16));
      }
    }
  }
  if (!r || r.height <= 0) return;
  H(e);
  const c = i.getBoundingClientRect(), u = document.createElement("div");
  u.setAttribute($, ""), u.className = "s3haim-preview-caret-mirror", u.setAttribute("aria-hidden", "true");
  const m = document.createElement("div");
  m.className = "s3haim-preview-caret-mirror-bar", m.style.left = `${r.left - c.left}px`, m.style.top = `${r.top - c.top}px`, m.style.height = `${Math.max(r.height, 14)}px`, u.appendChild(m), i.appendChild(u);
}
function bt(e, n, t, i = 0) {
  return n >= e.left - i && n <= e.right + i && t >= e.top - i && t <= e.bottom + i;
}
function Wt(e, n) {
  if (!C || C.collapsed) return false;
  try {
    for (const t of C.getClientRects()) if (bt(t, e, n, ft)) return true;
  } catch {
    return false;
  }
  return false;
}
function Vt(e, n, t) {
  var _a;
  const i = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  if (!i || i.rangeCount === 0) return false;
  const r = i.getRangeAt(0);
  if (r.collapsed || !e.contains(r.commonAncestorContainer)) return false;
  try {
    for (const o of r.getClientRects()) if (bt(o, n, t, ft)) return true;
  } catch {
    return false;
  }
  return false;
}
function Xt(e) {
  var _a, _b;
  if (!C || C.collapsed) return false;
  try {
    if (!e.contains(C.commonAncestorContainer)) return false;
    const n = (_a = window.getSelection) == null ? void 0 : _a.call(window);
    if (!n) return false;
    const t = C.cloneRange();
    n.removeAllRanges(), n.addRange(t);
    const i = document.activeElement;
    return i instanceof HTMLElement && !e.contains(i) && i.blur(), !!(n.rangeCount && !((_b = n.getRangeAt(0)) == null ? void 0 : _b.collapsed));
  } catch {
    return false;
  }
}
function Ft(e, n) {
  H(e);
  const t = e instanceof HTMLElement ? e : null;
  if (!t) return;
  gt(t);
  const i = t.getBoundingClientRect(), r = document.createElement("div");
  r.setAttribute(q, ""), r.className = "s3haim-preview-sel-mirror", r.setAttribute("aria-hidden", "true");
  for (const o of n.getClientRects()) {
    if (o.width <= 0 || o.height <= 0) continue;
    const l = document.createElement("div");
    l.className = "s3haim-preview-sel-mirror-box", l.style.left = `${o.left - i.left}px`, l.style.top = `${o.top - i.top}px`, l.style.width = `${o.width}px`, l.style.height = `${o.height}px`, r.appendChild(l);
  }
  r.childElementCount && t.appendChild(r);
}
function z(e, n, t = {}) {
  var _a;
  const i = t.allowCollapsed === true;
  if (n.collapsed && !i) return I(e), false;
  if (ut(n), n.collapsed) return (_a = X()) == null ? void 0 : _a.delete(D), Rt(e, n, t.caretRect), A(e, n, t.caretRect), true;
  const r = X();
  if (r) try {
    return H(e), r.set(D, new Highlight(n.cloneRange())), A(e, n), true;
  } catch {
  }
  return Ft(e, n), A(e, n), true;
}
function Yt(e, n = {}) {
  var _a;
  const t = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  if (!t || t.rangeCount === 0) return I(e), false;
  const i = t.getRangeAt(0);
  return e.contains(i.commonAncestorContainer) ? z(e, i, n) : (I(e), false);
}
function Gt(e, n, t = {}) {
  const i = dt(e, n);
  return i ? z(n, i, { ...t.allowCollapsed ? { allowCollapsed: true } : {} }) : (t.allowCollapsed || I(n), false);
}
function jt(e, n, t = {}) {
  const i = t.focus ?? true;
  let r = null;
  const o = t.target instanceof Element ? t.target.closest("td, th") : null;
  if (o instanceof HTMLTableCellElement && n.contains(o)) try {
    const m = document.createRange();
    m.selectNodeContents(o), m.collapse(true), r = at(e, n, m), r && z(n, m, { allowCollapsed: true });
  } catch {
    r = null;
  }
  if (r || (r = wt(e, n)), !r || !e) return false;
  const l = e.state.doc.length, c = Math.max(0, Math.min(r.from, l)), u = Math.max(0, Math.min(r.to, l));
  return e.dispatch({ selection: { anchor: c, head: u }, scrollIntoView: true }), i && e.focus(), true;
}
export {
  pt as a,
  $t as b,
  I as c,
  jt as d,
  Vt as e,
  O as f,
  ht as g,
  Wt as h,
  j as i,
  Et as j,
  qt as k,
  _t as l,
  Yt as m,
  Dt as n,
  Xt as r,
  Gt as s
};
