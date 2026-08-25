import { r as E, j as T, a as zt } from "./vendor-react-SY5QCjFA.js";
import { A as Vt, m as Xt } from "./vendor-motion-YU7ZxHqi.js";
import { b as Yt, d as Kt, T as Gt, e as Ut, f as Jt, A as Qt } from "./vendor-radix--fTcLYkF.js";
import { dt as Zt, fh as te, fv as ee, fL as ne, fM as St, r as re, bY as oe, fN as ie } from "./index-y7w1bGot.js";
import { A as I } from "./vendor-md-editor-CyUZNHY0.js";
function se(t) {
  return { leftPct: 0, widthPct: 100 };
}
function le(t, e) {
  return !(e > 0) || !Number.isFinite(t) ? 0 : Math.max(0, t) / e * 100;
}
function cn(t, e, n, r) {
  var _a;
  const o = le(e, n), i = [...t];
  if (i.length === 0) return t;
  const s = [...i].sort((a, c) => a.y - c.y || a.x - c.x);
  let u = ((_a = s[0]) == null ? void 0 : _a.y) ?? 0;
  const f = /* @__PURE__ */ new Map();
  for (const a of s) f.set(a.id, u), u += a.h + o;
  return t.map((a) => {
    const c = f.get(a.id);
    return c == null ? a : { ...a, y: c };
  });
}
function un(t, e) {
  return { ...t, layout: { ...t.layout, ...e, containerWidthPct: 100 } };
}
const fn = 1.5;
function dt(t, e, n) {
  return Math.min(n, Math.max(e, t));
}
function dn(t) {
  const e = t % 6 * 3;
  return { x: dt(18 + e, 0, 70), y: dt(28 + e, 0, 70) };
}
const ae = "var(--cover-font-scale, 1)";
function Mt(t) {
  return `calc(${Number.isFinite(t) ? t : 16}px * ${ae})`;
}
function ce(t, e) {
  return { boxSizing: "border-box", color: t.color, fontSize: Mt(t.fontSize), fontWeight: t.fontWeight, textAlign: t.textAlign, fontFamily: t.fontFamily || void 0, overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", lineHeight: 1.25, ...(e == null ? void 0 : e.strictClip) ? { clipPath: "inset(0 0.2em 0.16em 0)" } : null };
}
function ue(t) {
  const e = t.type === "ellipse" ? "50%" : t.type === "roundRect" ? `${t.cornerRadiusPct ?? 4}%` : 0;
  return { boxSizing: "border-box", width: "100%", height: "100%", overflow: "hidden", backgroundColor: t.fill || "transparent", borderWidth: Math.max(0, t.borderWidth), borderStyle: t.borderStyle || "solid", borderColor: t.borderColor || "transparent", borderRadius: e };
}
function fe(t) {
  return t === "middle" ? "center" : t === "bottom" ? "flex-end" : "flex-start";
}
function de(t) {
  const e = t.paddingPct ?? 0;
  return { boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: fe(t.textVAlign), width: "100%", height: "100%", margin: 0, padding: `${e}%`, overflow: "hidden" };
}
function me(t, e) {
  return { boxSizing: "border-box", width: "100%", margin: 0, padding: 0, border: 0, background: "transparent", outline: "none", resize: "none", overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", lineHeight: 1.25, color: t.color || "#0c4a6e", fontSize: Mt(t.fontSize ?? 24), fontWeight: t.fontWeight ?? "normal", textAlign: t.textAlign ?? "center", fontFamily: t.fontFamily || void 0, ...(e == null ? void 0 : e.strictClip) ? { clipPath: "inset(0 0.2em 0.16em 0)" } : null };
}
function he(t, e) {
  const r = Zt(t)[e.tableIndex];
  if (!r) return { markdown: t, updated: false };
  const o = Math.max(48, Math.round(e.widthPx)), i = Math.max(32, Math.round(e.heightPx)), u = { ...r.meta ?? te(), width: "fit", boxWidth: `${o}px`, boxHeight: `${i}px` }, f = ee(t, r, u, r.grid);
  return { markdown: f, updated: f !== t };
}
function ge(t, e) {
  return [...e.querySelectorAll("table")].indexOf(t);
}
const mt = /!\[\[([^[\]]*)\]\]/g, ht = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
let it = false;
function mn() {
  it = true;
}
function hn() {
  it = false;
}
function st() {
  return it;
}
function vt(t, e) {
  const n = [];
  mt.lastIndex = 0;
  let r;
  for (; (r = mt.exec(t)) !== null; ) n.push({ from: e + r.index, to: e + r.index + r[0].length, kind: "wiki" });
  for (ht.lastIndex = 0; (r = ht.exec(t)) !== null; ) {
    const o = e + r.index, i = o + r[0].length;
    n.some((s) => !(i <= s.from || o >= s.to)) || n.push({ from: o, to: i, kind: "markdown" });
  }
  return n.sort((o, i) => o.from - i.from), n;
}
function R(t, e) {
  const n = t.lineAt(e), r = vt(n.text, n.from);
  for (const o of r) if (e >= o.from && e <= o.to) return o;
  return null;
}
function pe(t, e) {
  if (!st()) return false;
  const n = t.state.selection.main.head, r = t.state.doc, o = R(r, n);
  if (o) {
    if (e === 1 && n < o.to) return t.dispatch({ selection: I.cursor(o.to), scrollIntoView: true }), true;
    if (e === -1 && n > o.from) return t.dispatch({ selection: I.cursor(o.from), scrollIntoView: true }), true;
  }
  if (e === 1 && n < r.length) {
    const i = r.lineAt(n), s = vt(i.text, i.from).find((u) => u.from === n);
    if (s) return t.dispatch({ selection: I.cursor(s.to), scrollIntoView: true }), true;
  }
  if (e === -1 && n > 0) {
    const i = R(r, n - 1);
    if (i && i.to === n) return t.dispatch({ selection: I.cursor(i.from), scrollIntoView: true }), true;
  }
  return false;
}
function be(t, e) {
  if (!st()) return false;
  const n = t.state.selection.main.head, r = R(t.state.doc, n);
  if (!r) return false;
  let o = null;
  return n > r.from && n < r.to ? o = e === 1 ? r.to : r.from : e === 1 && n === r.from ? o = r.to : e === -1 && n === r.to && (o = r.from), o == null || o === n ? false : (t.dispatch({ selection: I.cursor(o), scrollIntoView: true }), true);
}
function gn(t, e, n) {
  return st() ? pe(t, e) ? true : n(t) ? (be(t, e), true) : false : false;
}
function xe(t, e, n) {
  var _a, _b;
  const r = R(t, e), o = r && e > r.from ? r.from : e, i = t.sliceString(0, o);
  return n === "wiki" ? ((_a = i.match(/!\[\[[^[\]]*\]\]/g)) == null ? void 0 : _a.length) ?? 0 : ((_b = i.match(/!\[[^\]]*\]\([^)\n]+\)(?:\{[^}\n]*\})?/g)) == null ? void 0 : _b.length) ?? 0;
}
function G(t) {
  const e = t.closest("figure");
  if (e instanceof HTMLElement) return e;
  const n = t.closest("p.novel-wiki-image-line, p.md-editor-wiki-image, span.md-editor-wiki-image");
  return n instanceof HTMLElement && !(n.textContent ?? "").replace(/\u00a0/g, " ").trim() ? n : t;
}
function Te(t, e) {
  return e === "wiki" ? [...t.querySelectorAll("img[data-wiki-path]")].filter((n) => n instanceof HTMLImageElement) : [...t.querySelectorAll("img")].filter((n) => n instanceof HTMLImageElement && !n.hasAttribute("data-wiki-path"));
}
function Ce(t, e) {
  try {
    const n = document.createRange();
    return e === "before" ? n.setStartBefore(t) : n.setStartAfter(t), n.collapse(true), n;
  } catch {
    return null;
  }
}
function q(t, e, n) {
  const r = t.state.doc;
  let o = R(r, n), i = null;
  if (o && (n <= o.from ? i = "before" : n >= o.to ? i = "after" : i = n - o.from <= o.to - n ? "before" : "after"), !o || !i) return null;
  const s = xe(r, o.from, o.kind), f = Te(e, o.kind)[s];
  if (!f) return null;
  const a = G(f);
  return Ce(a, i);
}
function Lt(t, e) {
  const n = t.getBoundingClientRect(), r = Math.max(n.height, 14);
  return e === "before" ? new DOMRect(n.left, n.top, 0, r) : new DOMRect(n.right, n.top, 0, r);
}
function Pt(t, e) {
  try {
    if (t.startContainer instanceof Element) {
      const n = t.startContainer, r = n.childNodes[t.startOffset - 1], o = n.childNodes[t.startOffset], i = (f) => {
        var _a;
        if (!(f instanceof HTMLElement)) return null;
        if (f.tagName === "IMG") return G(f);
        if (f.tagName === "FIGURE") return f;
        const a = (_a = f.querySelector) == null ? void 0 : _a.call(f, "img");
        return a instanceof HTMLElement ? G(a) : null;
      }, s = i(o);
      if (s && e.contains(s)) return { host: s, side: "before" };
      const u = i(r);
      if (u && e.contains(u)) return { host: u, side: "after" };
    }
  } catch {
  }
  return null;
}
function Ee(t, e) {
  let n = (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.parentElement : t;
  for (; n && n !== e; ) {
    if (n instanceof HTMLElement && n.hasAttribute("data-line")) return n;
    n = n.parentElement;
  }
  return null;
}
function U(t, e) {
  let n = (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.parentElement : t;
  for (; n && n !== e; ) {
    if (n instanceof HTMLTableCellElement) return n;
    n = n.parentElement;
  }
  return null;
}
function J(t) {
  const e = t.trim();
  if (!e.includes("|") && !e.includes("-")) return false;
  const r = e.replace(/^\|/, "").replace(/\|$/, "").split("|");
  return r.length === 0 ? false : r.every((o) => /^\s*:?-+:?\s*$/.test(o) && o.includes("-"));
}
function A(t) {
  return t.includes("|");
}
function At(t) {
  var _a, _b, _c, _d, _e2, _f;
  const e = [], n = ((_b = (_a = t.match(/^\s*/)) == null ? void 0 : _a[0]) == null ? void 0 : _b.length) ?? 0;
  let r = t.trim();
  if (!r) return e;
  let o = n;
  r.startsWith("|") && (r = r.slice(1), o += 1), r.endsWith("|") && (r = r.slice(0, -1));
  let i = 0;
  const s = r.length;
  for (; i <= s; ) {
    const u = i;
    for (; i < s && r[i] !== "|"; ) i += 1;
    const f = i, a = r.slice(u, f), c = ((_d = (_c = a.match(/^\s*/)) == null ? void 0 : _c[0]) == null ? void 0 : _d.length) ?? 0, m = ((_f = (_e2 = a.match(/\s*$/)) == null ? void 0 : _e2[0]) == null ? void 0 : _f.length) ?? 0, l = o + u + c, d = Math.max(l, o + f - m);
    if (e.push({ contentFrom: l, contentTo: d, text: t.slice(l, d) }), i >= s) break;
    i += 1;
  }
  return e;
}
function Nt(t) {
  return [...t.querySelectorAll("tr")].filter((e) => e instanceof HTMLTableRowElement);
}
function gt(t) {
  const e = t.parentElement;
  if (!(e instanceof HTMLTableRowElement)) return 0;
  let n = 0;
  for (const r of e.querySelectorAll(":scope > th, :scope > td")) if (r instanceof HTMLTableCellElement) {
    if (r === t) return n;
    n += Math.max(1, Number(r.getAttribute("colspan") || 1) || 1);
  }
  return 0;
}
function pt(t) {
  const e = t.closest("table");
  return e instanceof HTMLTableElement ? Nt(e).indexOf(t.parentElement) : -1;
}
function Ot(t, e, n) {
  const r = Ee(n, e) || (n.hasAttribute("data-line") ? n : null);
  if (!r) return [];
  const o = Number(r.getAttribute("data-line"));
  if (!Number.isFinite(o)) return [];
  const i = t.state.doc, s = [...n.querySelectorAll("[data-line]")].map((l) => Number(l.getAttribute("data-line"))).filter((l) => Number.isFinite(l)), u = Math.min(o, ...s), f = Math.max(o, ...s);
  let a = Math.min(i.lines, Math.max(1, u + 1));
  for (; a <= i.lines; ) {
    const l = i.line(a).text;
    if (A(l)) break;
    if (!l.trim() || /haim-table/i.test(l) || l.trim().startsWith("<!--")) {
      a += 1;
      continue;
    }
    break;
  }
  if (a > i.lines || !A(i.line(a).text)) return [];
  let c = a;
  for (; c + 1 <= i.lines; ) {
    const l = i.line(c + 1).text;
    if (!l.trim() || !A(l)) break;
    c += 1;
  }
  for (c = Math.max(c, Math.min(i.lines, f + 1)); c + 1 <= i.lines; ) {
    const l = i.line(c + 1).text;
    if (!l.trim() || !A(l) || J(l)) break;
    c += 1;
  }
  const m = [];
  for (let l = a; l <= c; l += 1) {
    const d = i.line(l);
    A(d.text) && (J(d.text) || m.push({ line0: l - 1, lineText: d.text, lineFrom: d.from, spans: At(d.text) }));
  }
  return m;
}
function ye(t, e) {
  if (!t.length) return 0;
  for (let n = 0; n < t.length; n += 1) {
    const r = t[n], o = t[n + 1], i = o ? o.contentFrom : r.contentTo + 1;
    if (e < i || e <= r.contentTo) return n;
  }
  return t.length - 1;
}
function we(t, e = 0) {
  var _a, _b;
  try {
    const n = document.createRange(), r = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
    let o = Math.max(0, e), i = r.nextNode(), s = null;
    for (; i; ) {
      s = i;
      const u = ((_a = i.textContent) == null ? void 0 : _a.length) ?? 0;
      if (o <= u) return n.setStart(i, o), n.collapse(true), n;
      o -= u, i = r.nextNode();
    }
    return s ? (n.setStart(s, ((_b = s.textContent) == null ? void 0 : _b.length) ?? 0), n.collapse(true), n) : (n.setStart(t, 0), n.collapse(true), n);
  } catch {
    return null;
  }
}
function kt(t, e, n) {
  const r = U(n.startContainer, e), o = U(n.endContainer, e);
  if (!r && !o) return null;
  const i = r || o;
  if (!i) return null;
  const s = i.closest("table");
  if (!(s instanceof HTMLTableElement)) return null;
  const u = Ot(t, e, s);
  if (!u.length) return null;
  const f = pt(i);
  if (f < 0 || f >= u.length) return null;
  const a = gt(i), c = u[f], m = c.spans[a] ?? c.spans[c.spans.length - 1];
  if (!m) return { from: c.lineFrom, to: c.lineFrom };
  let l = c.lineFrom + m.contentFrom, d = l;
  if (!n.collapsed && r && o && r === o) {
    const h = Math.min(k(i, n.startContainer, n.startOffset), k(i, n.endContainer, n.endOffset)), g = Math.max(k(i, n.startContainer, n.startOffset), k(i, n.endContainer, n.endOffset));
    l = c.lineFrom + m.contentFrom + Math.min(h, m.text.length), d = c.lineFrom + m.contentFrom + Math.min(g, m.text.length);
  } else if (!n.collapsed && r && o && r !== o) {
    const h = pt(o), g = gt(o), p = u[Math.min(h, u.length - 1)], b = p.spans[g] ?? p.spans[p.spans.length - 1];
    l = c.lineFrom + m.contentFrom, d = b ? p.lineFrom + b.contentTo : c.lineFrom + m.contentTo;
  } else {
    const h = k(i, n.startContainer, n.startOffset);
    l = c.lineFrom + m.contentFrom + Math.min(h, m.text.length), d = l;
  }
  return { from: l, to: d };
}
function k(t, e, n) {
  var _a, _b, _c, _d;
  if (e === t) {
    if (n <= 0) return 0;
    let s = 0;
    for (let u = 0; u < Math.min(n, t.childNodes.length); u += 1) s += ((_b = (_a = t.childNodes[u]) == null ? void 0 : _a.textContent) == null ? void 0 : _b.length) ?? 0;
    return s;
  }
  if (!t.contains(e)) return 0;
  const r = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
  let o = 0, i = r.nextNode();
  for (; i; ) {
    if (i === e) return o + Math.max(0, Math.min(n, ((_c = i.textContent) == null ? void 0 : _c.length) ?? 0));
    o += ((_d = i.textContent) == null ? void 0 : _d.length) ?? 0, i = r.nextNode();
  }
  return o;
}
function z(t, e, n) {
  const r = t.state.doc.lineAt(n), o = r.text;
  if (!A(o) || J(o)) return null;
  const i = r.number - 1, s = n - r.from, u = At(o);
  if (!u.length) return null;
  const f = ye(u, s), a = u[f], c = Math.max(0, Math.min(a.text.length, s - a.contentFrom)), m = [...e.querySelectorAll("table")];
  for (const l of m) {
    if (!(l instanceof HTMLTableElement)) continue;
    const h = Ot(t, e, l).findIndex((b) => b.line0 === i);
    if (h < 0) continue;
    const g = Nt(l)[h];
    if (!g) continue;
    const p = Se(g, f);
    if (p) return we(p, c);
  }
  return null;
}
function Se(t, e) {
  let n = 0;
  for (const r of t.querySelectorAll(":scope > th, :scope > td")) {
    if (!(r instanceof HTMLTableCellElement)) continue;
    const o = Math.max(1, Number(r.getAttribute("colspan") || 1) || 1);
    if (e >= n && e < n + o) return r;
    n += o;
  }
  return null;
}
function Me(t) {
  const e = t.getBoundingClientRect(), n = window.getComputedStyle(t), r = Number.parseFloat(n.paddingLeft) || 0, o = Number.parseFloat(n.paddingTop) || 0, i = Number.parseFloat(n.paddingBottom) || 0, s = Math.max(e.height - o - i, 14);
  return new DOMRect(e.left + r, e.top + o, 0, s);
}
const Q = "s3haim-preview-sync-sel", Z = "data-preview-sel-mirror", tt = "data-preview-caret-mirror", It = 4;
let L = null;
function Rt(t) {
  L = t ? t.cloneRange() : null;
}
function D(t, e) {
  let n = (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.parentElement : t;
  for (; n && n !== e; ) {
    if (n instanceof HTMLElement && n.hasAttribute("data-line")) return n;
    n = n.parentElement;
  }
  return null;
}
function V(t, e, n) {
  if (!t.contains(e) && e !== t) return 0;
  let r = 0;
  const o = (i) => {
    var _a, _b;
    if (i === e) {
      if (i.nodeType === Node.TEXT_NODE) return r += Math.max(0, Math.min(n, ((_a = i.textContent) == null ? void 0 : _a.length) ?? 0)), true;
      if (i instanceof Element) {
        for (let s = 0; s < Math.min(n, i.childNodes.length); s += 1) r += Ft(i.childNodes[s]);
        return true;
      }
    }
    if (i.nodeType === Node.TEXT_NODE) return r += ((_b = i.textContent) == null ? void 0 : _b.length) ?? 0, false;
    if (i instanceof HTMLBRElement) return r += 1, false;
    if (i instanceof Element) {
      for (const s of i.childNodes) if (o(s)) return true;
    }
    return false;
  };
  return o(t), r;
}
function Ft(t) {
  var _a;
  if (t.nodeType === Node.TEXT_NODE) return ((_a = t.textContent) == null ? void 0 : _a.length) ?? 0;
  if (t instanceof HTMLBRElement) return 1;
  let e = 0;
  if (t instanceof Element) for (const n of t.childNodes) e += Ft(n);
  return e;
}
function et(t) {
  let e = "";
  const n = (r) => {
    if (r.nodeType === Node.TEXT_NODE) {
      e += r.textContent ?? "";
      return;
    }
    if (r instanceof HTMLBRElement) {
      e += `
`;
      return;
    }
    if (r instanceof Element) for (const o of r.childNodes) n(o);
  };
  return n(t), e;
}
function bt(t) {
  const e = t.parentNode;
  if (!e) return null;
  const n = Array.prototype.indexOf.call(e.childNodes, t);
  return n < 0 ? null : { node: e, offset: n + 1 };
}
function Ht(t, e, n, r) {
  const o = t.state.doc, i = Math.max(0, Math.min(n, r)), s = Math.max(n, r), f = [...e.querySelectorAll("[data-line]")].map((l) => Number(l.getAttribute("data-line"))).filter((l) => Number.isFinite(l)).sort((l, d) => l - d).find((l) => l > s), a = Math.min(o.lines, Math.max(1, i + 1)), c = o.line(a).from;
  let m;
  return f != null && f + 1 <= o.lines ? m = o.line(f + 1).from : m = o.length, m < c ? { from: c, to: c } : { from: c, to: m };
}
function X(t, e, n) {
  const r = Math.max(0, Math.min(n, e.length));
  let o = 0, i = 0;
  for (; o < t.length && i < r; ) {
    const s = t[o], u = e[i];
    if (s === void 0 || u === void 0) break;
    if (s === u) {
      o += 1, i += 1;
      continue;
    }
    if (/\s/.test(s) || /\s/.test(u)) {
      for (; o < t.length && /\s/.test(t[o] ?? ""); ) o += 1;
      for (; i < r && /\s/.test(e[i] ?? ""); ) i += 1;
      continue;
    }
    o += 1;
  }
  return o;
}
function ve(t, e, n) {
  const r = Math.max(0, Math.min(n, t.length));
  let o = 0, i = 0;
  for (; o < r && o < t.length; ) {
    const s = t[o], u = e[i];
    if (s === void 0) break;
    if (u !== void 0 && s === u) {
      o += 1, i += 1;
      continue;
    }
    if (u !== void 0 && (/\s/.test(s) || /\s/.test(u))) {
      for (; o < r && /\s/.test(t[o] ?? ""); ) o += 1;
      for (; i < e.length && /\s/.test(e[i] ?? ""); ) i += 1;
      continue;
    }
    o += 1;
  }
  return Math.max(0, Math.min(i, e.length));
}
function Le(t, e) {
  let n = Math.max(0, e), r = null;
  const o = (s) => {
    var _a;
    if (s.nodeType === Node.TEXT_NODE) {
      const u = ((_a = s.textContent) == null ? void 0 : _a.length) ?? 0;
      return n <= u ? { node: s, offset: n } : (n -= u, r = { node: s, offset: u }, null);
    }
    if (s instanceof HTMLBRElement) return n === 0 || (n -= 1, n === 0) ? bt(s) : null;
    if (s instanceof Element) for (const u of s.childNodes) {
      const f = o(u);
      if (f) return f;
    }
    return null;
  }, i = o(t);
  return i || r || { node: t, offset: 0 };
}
function nt(t, e) {
  let n = null, r = -1;
  for (const o of t.querySelectorAll("[data-line]")) {
    if (!(o instanceof HTMLElement)) continue;
    const i = Number(o.getAttribute("data-line"));
    Number.isFinite(i) && i <= e && i >= r && (n = o, r = i);
  }
  return n;
}
function Bt(t, e) {
  if (!(t == null ? void 0 : t.state) || !e) return null;
  const n = t.state.selection.main, r = n.from, o = n.to;
  if (r === o) {
    const l = q(t, e, r);
    if (l) return l;
  } else {
    const l = q(t, e, r), d = q(t, e, o);
    if (l && d) try {
      const h = document.createRange();
      return h.setStart(l.startContainer, l.startOffset), h.setEnd(d.startContainer, d.startOffset), h;
    } catch {
    }
  }
  if (r === o) {
    const l = z(t, e, r);
    if (l) return l;
  } else {
    const l = z(t, e, r), d = z(t, e, o);
    if (l && d) try {
      const h = document.createRange();
      return h.setStart(l.startContainer, l.startOffset), h.setEnd(d.startContainer, d.startOffset), h;
    } catch {
    }
  }
  const i = t.state.doc.lineAt(r).number - 1, s = t.state.doc.lineAt(o).number - 1, u = nt(e, i), f = nt(e, s);
  if (!u || !f) return null;
  const a = (l, d) => {
    const h = Number(d.getAttribute("data-line"));
    if (!Number.isFinite(h)) return null;
    const { from: g, to: p } = Ht(t, e, h, h), b = t.state.doc.sliceString(g, p), x = et(d), y = ve(b, x, Math.max(0, Math.min(l, p) - g));
    return Le(d, y);
  }, c = a(r, u), m = a(o, f);
  if (!c || !m) return null;
  try {
    const l = document.createRange();
    return l.setStart(c.node, c.offset), l.setEnd(m.node, m.offset), l;
  } catch {
    return null;
  }
}
function Pe(t, e) {
  if (!e) return 0;
  let n = 0, r = 0, o = t.indexOf(e, r);
  for (; o !== -1; ) n += 1, r = o + Math.max(1, e.length), o = t.indexOf(e, r);
  return n;
}
function xt(t, e, n) {
  if (!e) return null;
  let r = 0, o = -1, i = 0;
  for (; (o = t.indexOf(e, r)) !== -1; ) {
    if (i === n) return { from: o, to: o + e.length };
    i += 1, r = o + 1;
  }
  return null;
}
function Ae(t, e, n) {
  if (!n || e >= t.length) return null;
  const r = t[e], o = n[0];
  if (r === void 0 || o === void 0 || r !== o && !(/\s/.test(r) && /\s/.test(o))) return null;
  let i = e, s = 0;
  for (; i < t.length && s < n.length; ) {
    const u = t[i], f = n[s];
    if (u === void 0 || f === void 0) break;
    if (u === f) {
      i += 1, s += 1;
      continue;
    }
    if (/\s/.test(u) && /\s/.test(f)) {
      for (; i < t.length && /\s/.test(t[i] ?? ""); ) i += 1;
      for (; s < n.length && /\s/.test(n[s] ?? ""); ) s += 1;
      continue;
    }
    if (u !== f && !/\s/.test(f)) {
      i += 1;
      continue;
    }
    return null;
  }
  return s < n.length ? null : { from: e, to: i };
}
function Tt(t, e, n) {
  if (!e) return null;
  const r = [];
  for (let o = 0; o < t.length; o += 1) {
    const i = Ae(t, o, e);
    if (i) {
      if (r.push(i), r.length > n) break;
      o = Math.max(o, i.to - 1);
    }
  }
  return r[n] ?? r[0] ?? null;
}
function Ne(t, e) {
  var _a, _b, _c;
  if (!(t == null ? void 0 : t.state) || !e) return null;
  const n = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  if (!n || n.rangeCount === 0) return null;
  const r = n.getRangeAt(0);
  if (!e.contains(r.commonAncestorContainer)) return null;
  const o = kt(t, e, r);
  if (o) return o;
  const i = D(r.startContainer, e), s = D(r.endContainer, e);
  if (!i && !s) return null;
  const u = Number((_b = i || s) == null ? void 0 : _b.getAttribute("data-line")), f = Number((_c = s || i) == null ? void 0 : _c.getAttribute("data-line"));
  if (!Number.isFinite(u) || !Number.isFinite(f)) return null;
  const { from: a, to: c } = Ht(t, e, u, f), m = t.state.doc.sliceString(a, c);
  if (!m) return { from: a, to: a };
  if (r.collapsed) {
    const p = i || s, b = p ? et(p) : "", x = p ? V(p, r.startContainer, r.startOffset) : 0, y = X(m, b, x), C = a + Math.max(0, Math.min(y, m.length));
    return { from: C, to: C };
  }
  const l = n.toString();
  if (!l) return null;
  let d = 0;
  try {
    const p = document.createRange();
    p.setStart(e, 0), p.setEnd(r.startContainer, r.startOffset), d = Pe(p.toString(), l);
  } catch {
    d = 0;
  }
  const h = xt(m, l, d) || xt(m, l, 0);
  if (h) return { from: a + h.from, to: a + h.to };
  if (i && i === s) {
    const p = et(i), b = V(i, r.startContainer, r.startOffset), x = V(i, r.endContainer, r.endOffset), y = Math.min(b, x), C = Math.max(b, x), w = X(m, p, y), O = X(m, p, C);
    return { from: a + Math.min(w, O), to: a + Math.max(w, O) };
  }
  const g = Tt(m, l, d) || Tt(m, l, 0);
  return g ? { from: a + g.from, to: a + g.to } : { from: a, to: c };
}
function rt() {
  const t = globalThis.CSS;
  return !t || !("highlights" in t) || typeof Highlight > "u" ? null : t.highlights;
}
function j(t) {
  t.querySelectorAll(`[${Z}]`).forEach((n) => n.remove()), t.querySelectorAll(`[${tt}]`).forEach((n) => n.remove());
  const e = t.closest(".md-editor-preview-wrapper");
  e == null ? void 0 : e.querySelectorAll(`[${Z}]`).forEach((n) => n.remove()), e == null ? void 0 : e.querySelectorAll(`[${tt}]`).forEach((n) => n.remove());
}
function $(t) {
  var _a;
  Rt(null), (_a = rt()) == null ? void 0 : _a.delete(Q), t && j(t);
}
function _t(t) {
  getComputedStyle(t).position === "static" && (t.style.position = "relative");
}
const Oe = 32;
function H(t) {
  const e = getComputedStyle(t).overflowY;
  return e === "auto" || e === "scroll" || e === "overlay";
}
function lt(t) {
  const e = t.closest(".md-editor-preview-wrapper");
  if (e instanceof HTMLElement) {
    if (H(e)) return e;
    const o = e.firstElementChild;
    if (o instanceof HTMLElement && H(o)) return o;
  }
  const n = t.closest(".md-editor-custom-scrollbar");
  if (n instanceof HTMLElement) {
    const o = n.firstElementChild;
    if (o instanceof HTMLElement && H(o)) return o;
  }
  let r = t instanceof HTMLElement ? t : t.parentElement;
  for (; r; ) {
    if (H(r)) return r;
    r = r.parentElement;
  }
  return null;
}
function ot(t, e) {
  const n = Oe, r = t.getBoundingClientRect();
  let o = 0, i = 0;
  e.top < r.top + n ? o = e.top - (r.top + n) : e.bottom > r.bottom - n && (o = e.bottom - (r.bottom - n)), e.left < r.left + n ? i = e.left - (r.left + n) : e.right > r.right - n && (i = e.right - (r.right - n)), o !== 0 && (t.scrollTop += o), i !== 0 && (t.scrollLeft += i);
}
function _(t, e, n) {
  const r = lt(t);
  if (!r) return;
  let o = n ?? null;
  if (!o) {
    const i = t.querySelector(".s3haim-preview-caret-mirror-bar");
    if (i instanceof HTMLElement) {
      const s = i.getBoundingClientRect();
      (s.height > 0 || s.width > 0) && (o = s);
    }
  }
  if (!o) {
    const i = Pt(e, t);
    i && (o = Lt(i.host, i.side));
  }
  if (!o) try {
    const i = e.getClientRects();
    if (i.length > 0) o = e.collapsed ? i[0] : i[i.length - 1];
    else {
      const s = e.getBoundingClientRect();
      (s.height > 0 || s.width > 0) && (o = s);
    }
  } catch {
    o = null;
  }
  if (!o || o.height <= 0 && o.width <= 0) {
    const i = D(e.startContainer, t);
    i && ot(r, i.getBoundingClientRect());
    return;
  }
  ot(r, o);
}
function pn(t, e) {
  if (!(t == null ? void 0 : t.state) || !e) return false;
  const n = Bt(t, e);
  if (n) return _(e, n), true;
  const r = t.state.doc.lineAt(t.state.selection.main.head).number - 1, o = nt(e, r);
  if (!o) return false;
  const i = lt(e);
  return i ? (ot(i, o.getBoundingClientRect()), true) : false;
}
function ke(t, e, n) {
  const r = t instanceof HTMLElement ? t : null;
  if (!r) return;
  _t(r);
  let o = n ?? null;
  const i = o ? null : Pt(e, t), s = o ? null : U(e.startContainer, t);
  if (!o) if (i) o = Lt(i.host, i.side);
  else if (s) {
    o = Me(s);
    try {
      const c = e.getClientRects(), m = c.length > 0 ? c[0] : null;
      if (m && m.height > 0 && m.width >= 0) {
        const l = s.getBoundingClientRect();
        m.left >= l.left - 1 && m.right <= l.right + 1 && m.top >= l.top - 1 && m.bottom <= l.bottom + 1 && (o = new DOMRect(m.left, m.top, 0, Math.max(m.height, 14)));
      }
    } catch {
    }
  } else {
    try {
      const c = e.getClientRects();
      if (c.length > 0) o = c[0];
      else {
        const m = e.getBoundingClientRect();
        (m.height > 0 || m.width > 0) && (o = m);
      }
    } catch {
      o = null;
    }
    if ((!o || o.height <= 0) && e.collapsed && e.startContainer instanceof Element) {
      const c = e.startContainer.childNodes[e.startOffset - 1];
      if (c instanceof HTMLBRElement) {
        const m = c.parentElement ?? r, l = getComputedStyle(m), d = Number.parseFloat(l.lineHeight) || (Number.parseFloat(l.fontSize) || 16) * 1.5;
        let h = m.getBoundingClientRect().left, g = c.getBoundingClientRect().bottom;
        const p = c.previousSibling;
        if (p) try {
          const b = document.createRange();
          b.selectNodeContents(p);
          const x = b.getBoundingClientRect();
          (x.height > 0 || x.width > 0) && (h = x.left, g = x.bottom);
        } catch {
        }
        o = new DOMRect(h, g, 0, Math.max(d * 0.85, 14));
      }
    }
    if (!o || o.height <= 0) {
      const c = D(e.startContainer, t) || (e.startContainer instanceof HTMLElement ? e.startContainer : null);
      if (c) {
        const m = c.getBoundingClientRect();
        o = new DOMRect(m.left, m.top, 0, Math.max(m.height || 0, 16));
      }
    }
  }
  if (!o || o.height <= 0) return;
  j(t);
  const u = r.getBoundingClientRect(), f = document.createElement("div");
  f.setAttribute(tt, ""), f.className = "s3haim-preview-caret-mirror", f.setAttribute("aria-hidden", "true");
  const a = document.createElement("div");
  a.className = "s3haim-preview-caret-mirror-bar", a.style.left = `${o.left - u.left}px`, a.style.top = `${o.top - u.top}px`, a.style.height = `${Math.max(o.height, 14)}px`, f.appendChild(a), r.appendChild(f);
}
function Dt(t, e, n, r = 0) {
  return e >= t.left - r && e <= t.right + r && n >= t.top - r && n <= t.bottom + r;
}
function bn(t, e) {
  if (!L || L.collapsed) return false;
  try {
    for (const n of L.getClientRects()) if (Dt(n, t, e, It)) return true;
  } catch {
    return false;
  }
  return false;
}
function xn(t, e, n) {
  var _a;
  const r = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  if (!r || r.rangeCount === 0) return false;
  const o = r.getRangeAt(0);
  if (o.collapsed || !t.contains(o.commonAncestorContainer)) return false;
  try {
    for (const i of o.getClientRects()) if (Dt(i, e, n, It)) return true;
  } catch {
    return false;
  }
  return false;
}
function Tn(t) {
  var _a, _b;
  if (!L || L.collapsed) return false;
  try {
    if (!t.contains(L.commonAncestorContainer)) return false;
    const e = (_a = window.getSelection) == null ? void 0 : _a.call(window);
    if (!e) return false;
    const n = L.cloneRange();
    e.removeAllRanges(), e.addRange(n);
    const r = document.activeElement;
    return r instanceof HTMLElement && !t.contains(r) && r.blur(), !!(e.rangeCount && !((_b = e.getRangeAt(0)) == null ? void 0 : _b.collapsed));
  } catch {
    return false;
  }
}
function Ie(t, e) {
  j(t);
  const n = t instanceof HTMLElement ? t : null;
  if (!n) return;
  _t(n);
  const r = n.getBoundingClientRect(), o = document.createElement("div");
  o.setAttribute(Z, ""), o.className = "s3haim-preview-sel-mirror", o.setAttribute("aria-hidden", "true");
  for (const i of e.getClientRects()) {
    if (i.width <= 0 || i.height <= 0) continue;
    const s = document.createElement("div");
    s.className = "s3haim-preview-sel-mirror-box", s.style.left = `${i.left - r.left}px`, s.style.top = `${i.top - r.top}px`, s.style.width = `${i.width}px`, s.style.height = `${i.height}px`, o.appendChild(s);
  }
  o.childElementCount && n.appendChild(o);
}
function at(t, e, n = {}) {
  var _a;
  const r = n.allowCollapsed === true;
  if (e.collapsed && !r) return $(t), false;
  if (Rt(e), e.collapsed) return (_a = rt()) == null ? void 0 : _a.delete(Q), ke(t, e, n.caretRect), _(t, e, n.caretRect), true;
  const o = rt();
  if (o) try {
    return j(t), o.set(Q, new Highlight(e.cloneRange())), _(t, e), true;
  } catch {
  }
  return Ie(t, e), _(t, e), true;
}
function Cn(t, e = {}) {
  var _a;
  const n = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  if (!n || n.rangeCount === 0) return $(t), false;
  const r = n.getRangeAt(0);
  return t.contains(r.commonAncestorContainer) ? at(t, r, e) : ($(t), false);
}
function En(t, e, n = {}) {
  const r = Bt(t, e);
  return r ? at(e, r, { ...n.allowCollapsed ? { allowCollapsed: true } : {} }) : (n.allowCollapsed || $(e), false);
}
function yn(t, e, n = {}) {
  const r = n.focus ?? true;
  let o = null;
  const i = n.target instanceof Element ? n.target.closest("td, th") : null;
  if (i instanceof HTMLTableCellElement && e.contains(i)) try {
    const a = document.createRange();
    a.selectNodeContents(i), a.collapse(true), o = kt(t, e, a), o && at(e, a, { allowCollapsed: true });
  } catch {
    o = null;
  }
  if (o || (o = Ne(t, e)), !o || !t) return false;
  const s = t.state.doc.length, u = Math.max(0, Math.min(o.from, s)), f = Math.max(0, Math.min(o.to, s));
  return t.dispatch({ selection: { anchor: u, head: f }, scrollIntoView: true }), r && t.focus(), true;
}
const Re = "data-md-footnote-title", Fe = 250, He = 120, Be = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, _e = "z-100050 max-w-[min(92vw,320px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function B(t, e) {
  if (!(t instanceof Element)) return null;
  const n = t.closest(".footnote-ref-link");
  return !(n instanceof HTMLElement) || !e.contains(n) ? null : n;
}
function Ct(t) {
  var _a;
  return ((_a = t.getAttribute(Re)) == null ? void 0 : _a.trim()) || "";
}
function Et(t) {
  const e = t.getBoundingClientRect(), n = Number.parseFloat(window.getComputedStyle(t).fontSize) || 16, o = !!t.querySelector("sup.footnote-ref") ? n * 0.9 : 0;
  return { top: e.top - o, left: e.left, width: Math.max(e.width, 1), height: Math.max(e.height + o, 1) };
}
function wn({ containerRef: t, rootEl: e = null }) {
  const [n, r] = E.useState(null), [o, i] = E.useState(null), s = E.useRef(null), u = E.useRef(0), f = E.useRef(null), a = E.useCallback(() => {
    s.current != null && (clearTimeout(s.current), s.current = null);
  }, []), c = E.useCallback(() => {
    a(), f.current && (u.current = Date.now()), f.current = null, r(null), i(null);
  }, [a]), m = E.useCallback((d, h) => {
    const g = { el: d, text: h }, p = () => {
      f.current = g, r(g), i(Et(d));
    };
    if (a(), f.current) {
      p();
      return;
    }
    const x = Date.now() - u.current < He ? 0 : Fe;
    if (x === 0) {
      p();
      return;
    }
    s.current = setTimeout(() => {
      s.current = null, p();
    }, x);
  }, [a]);
  E.useEffect(() => {
    const d = e ?? t.current;
    if (!d) return;
    const h = (y) => {
      var _a;
      const C = B(y.target, d);
      if (!C) return;
      const w = Ct(C);
      if (!w) {
        c();
        return;
      }
      ((_a = f.current) == null ? void 0 : _a.el) === C && f.current.text === w || m(C, w);
    }, g = (y) => {
      var _a;
      const C = B(y.target, d);
      if (!C) return;
      const w = y.relatedTarget;
      w instanceof Node && C.contains(w) || (((_a = f.current) == null ? void 0 : _a.el) === C || s.current != null) && c();
    }, p = (y) => {
      const C = B(y.target, d);
      if (!C) return;
      const w = Ct(C);
      w && m(C, w);
    }, b = (y) => {
      var _a;
      const C = B(y.target, d);
      if (!C) return;
      const w = y.relatedTarget;
      w instanceof Node && C.contains(w) || ((_a = f.current) == null ? void 0 : _a.el) === C && c();
    }, x = () => {
      c();
    };
    return d.addEventListener("pointerover", h), d.addEventListener("pointerout", g), d.addEventListener("focusin", p), d.addEventListener("focusout", b), d.addEventListener("pointerdown", x), () => {
      a(), d.removeEventListener("pointerover", h), d.removeEventListener("pointerout", g), d.removeEventListener("focusin", p), d.removeEventListener("focusout", b), d.removeEventListener("pointerdown", x);
    };
  }, [c, a, t, e, m]), E.useLayoutEffect(() => {
    var _a;
    if (!(n == null ? void 0 : n.el)) {
      i(null);
      return;
    }
    const d = () => {
      if (!n.el.isConnected) {
        c();
        return;
      }
      i(Et(n.el));
    };
    d();
    const g = (_a = e ?? t.current) == null ? void 0 : _a.querySelector(".md-editor-preview");
    return window.addEventListener("resize", d), window.addEventListener("scroll", d, true), g == null ? void 0 : g.addEventListener("scroll", d, { passive: true }), () => {
      window.removeEventListener("resize", d), window.removeEventListener("scroll", d, true), g == null ? void 0 : g.removeEventListener("scroll", d);
    };
  }, [n, c, t, e]);
  const l = !!(n && o && n.text);
  return T.jsx(Yt, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: T.jsxs(Kt, { open: l, onOpenChange: (d) => {
    d || c();
  }, children: [T.jsx(Gt, { asChild: true, children: T.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: o ? { top: o.top, left: o.left, width: Math.max(o.width, 1), height: Math.max(o.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), T.jsx(Vt, { children: l ? T.jsx(Ut, { forceMount: true, children: T.jsx(Jt, { asChild: true, side: "top", sideOffset: 6, children: T.jsxs(Xt.div, { className: _e, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: Be, children: [n == null ? void 0 : n.text, T.jsx(Qt, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
const De = ["nw", "ne", "sw", "se"], $e = { nw: { left: 0, top: 0, cursor: "nwse-resize", transform: "translate(-50%, -50%)" }, ne: { left: "100%", top: 0, cursor: "nesw-resize", transform: "translate(-50%, -50%)" }, sw: { left: 0, top: "100%", cursor: "nesw-resize", transform: "translate(-50%, -50%)" }, se: { left: "100%", top: "100%", cursor: "nwse-resize", transform: "translate(-50%, -50%)" } };
function je(t) {
  var _a, _b;
  return t ? ((_a = t.classList) == null ? void 0 : _a.contains("md-editor-preview")) ? t : ((_b = t.hasAttribute) == null ? void 0 : _b.call(t, "data-export-pdf-preview")) || t.id === "export-pdf-preview" ? t.querySelector(".md-editor-preview") ?? t : t.querySelector(".md-editor-preview") ?? t.querySelector("#export-pdf-preview .md-editor-preview") ?? t.querySelector("[data-export-pdf-preview] .md-editor-preview") ?? t : null;
}
function Sn({ containerRef: t, getMarkdown: e, setMarkdown: n, enabled: r = true }) {
  const [o, i] = E.useState(null), [s, u] = E.useState(null), f = E.useRef(null), a = E.useRef(false);
  f.current = o;
  const c = E.useCallback(() => {
    i(null), u(null), f.current = null;
  }, []);
  E.useEffect(() => {
    r || c();
  }, [c, r]), E.useEffect(() => {
    if (!(o == null ? void 0 : o.table)) {
      u(null);
      return;
    }
    const l = o.table;
    let d = 0;
    const h = () => {
      if (!l.isConnected) {
        c();
        return;
      }
      const g = l.getBoundingClientRect();
      u({ left: g.left, top: g.top, width: g.width, height: g.height }), d = requestAnimationFrame(h);
    };
    return d = requestAnimationFrame(h), () => cancelAnimationFrame(d);
  }, [o, c]), E.useEffect(() => {
    if (!r) return;
    const l = t.current;
    if (!l) return;
    const d = (h) => {
      var _a, _b, _c, _d;
      if (a.current) return;
      const g = h.target;
      if (!g || ((_a = g.closest) == null ? void 0 : _a.call(g, "[data-haim-table-resize-handle]")) || ((_b = g.closest) == null ? void 0 : _b.call(g, "[data-transform-handle]"))) return;
      const p = je(l);
      if (!p) return;
      if (!p.contains(g)) {
        c();
        return;
      }
      const b = (_c = g.closest) == null ? void 0 : _c.call(g, "table");
      if (!b || !p.contains(b)) {
        c();
        return;
      }
      if ((_d = g.closest) == null ? void 0 : _d.call(g, "a, button, input, textarea, select")) return;
      const x = ge(b, p);
      if (x < 0) return;
      const y = b.getBoundingClientRect(), C = { table: b, tableIndex: x, widthPx: Math.max(48, Math.round(y.width)), heightPx: Math.max(32, Math.round(y.height)) };
      f.current = C, i(C);
    };
    return l.addEventListener("pointerdown", d, true), () => l.removeEventListener("pointerdown", d, true);
  }, [c, t, r]);
  const m = E.useCallback((l, d) => {
    l.preventDefault(), l.stopPropagation();
    const h = f.current;
    if (!(h == null ? void 0 : h.table)) return;
    a.current = true;
    const g = l.clientX, p = l.clientY, b = h.widthPx, x = h.heightPx, y = x > 0 ? b / x : 1, C = l.pointerType === "touch";
    let w = false;
    const O = (v) => {
      const P = v.clientX - g, W = v.clientY - p;
      (Math.abs(P) > 1 || Math.abs(W) > 1) && (w = true);
      let S = b, M = x;
      if (d.includes("e") && (S = b + P), d.includes("w") && (S = b - P), d.includes("s") && (M = x + W), d.includes("n") && (M = x - W), S = Math.max(48, S), M = Math.max(32, M), C || v.shiftKey) {
        const Wt = Math.abs((S - b) / Math.max(1, b)), qt = Math.abs((M - x) / Math.max(1, x));
        Wt >= qt ? M = Math.max(32, S / Math.max(1e-4, y)) : S = Math.max(48, M * y);
      }
      S = Math.max(48, Math.round(S)), M = Math.max(32, Math.round(M)), ne(h.table, S, M);
      const ft = { ...h, widthPx: S, heightPx: M };
      f.current = ft, i(ft);
    }, F = () => {
      document.removeEventListener("pointermove", O, true), document.removeEventListener("pointerup", F, true), document.removeEventListener("pointercancel", F, true), a.current = false;
      const v = f.current;
      if (!v || !w || v.widthPx === b && v.heightPx === x) return;
      const P = he(e(), { tableIndex: v.tableIndex, widthPx: v.widthPx, heightPx: v.heightPx });
      P.updated && n(P.markdown);
    };
    document.addEventListener("pointermove", O, true), document.addEventListener("pointerup", F, true), document.addEventListener("pointercancel", F, true);
  }, [e, n]);
  return !r || !o || !s || typeof document > "u" ? null : zt.createPortal(T.jsx("div", { className: "pointer-events-none fixed z-100040 border-2 border-blue-500 print:hidden", style: { left: s.left, top: s.top, width: s.width, height: s.height }, "data-haim-table-resize-overlay": "", children: De.map((l) => T.jsx("button", { type: "button", "aria-label": `\uD45C \uD06C\uAE30 \uC870\uC808 ${l}`, "data-haim-table-resize-handle": l, className: "pointer-events-auto absolute h-3.5 w-3.5 rounded-sm border-2 border-blue-500 bg-white shadow-sm dark:bg-odp-surface", style: $e[l], onPointerDown: (d) => m(d, l) }, l)) }), document.body);
}
function We(t) {
  const e = String(t ?? "").trim();
  return e && St(e) ? e : null;
}
function $t(t, e) {
  const n = String(t ?? "").trim(), r = We(n), [o, i] = E.useState(() => r);
  return E.useEffect(() => {
    if (!n) {
      i(null);
      return;
    }
    if (St(n)) {
      i(n);
      return;
    }
    let s = false;
    return i(null), re(n, typeof e == "function" ? e : async () => null).then((f) => {
      s || i(f || null);
    }), () => {
      s = true;
    };
  }, [n, e]), r || o;
}
function qe({ cover: t }) {
  const e = E.useMemo(() => ie(t.webfonts), [t.webfonts]);
  return e ? T.jsx("style", { "data-note-cover-webfonts": "1", children: e }) : null;
}
function ze({ path: t, getPresignedUrl: e }) {
  const n = $t(t, e);
  return n ? T.jsx("img", { src: n, alt: "", className: "pointer-events-none absolute inset-0 h-full w-full object-cover", draggable: false }) : null;
}
function Ve({ path: t, getPresignedUrl: e }) {
  const n = $t(t, e);
  return n ? T.jsx("img", { src: n, alt: "", className: "h-full w-full object-fill", draggable: false }) : T.jsx("div", { className: "flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400", children: "\uC774\uBBF8\uC9C0" });
}
function Y(t) {
  return { position: "absolute", left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}%`, height: `${t.h}%` };
}
function Xe({ el: t, strictClip: e = false }) {
  const n = t.text ?? "";
  return T.jsx("div", { className: "h-full w-full", style: ue(t), "data-cover-shape": t.type, children: n ? T.jsx("div", { style: de(t), children: T.jsx("div", { style: me(t, { strictClip: e }), children: n }) }) : null });
}
function Mn({ cover: t, getPresignedUrl: e, className: n = "", style: r, showFrameOutline: o = false, renderElements: i = true, children: s }) {
  const u = se(t.layout), f = t.bg.color || "#ffffff";
  return T.jsxs("div", { className: `export-pdf-cover relative z-2 overflow-hidden bg-white text-gray-900 ${n}`, style: { width: "var(--print-page-width)", height: "var(--print-page-height)", backgroundColor: f, ...r }, "data-note-cover": "1", onContextMenu: (a) => {
    a.stopPropagation();
  }, children: [T.jsx(qe, { cover: t }), t.bg.imagePath ? T.jsx(ze, { path: t.bg.imagePath, getPresignedUrl: e }) : null, T.jsxs("div", { className: `absolute top-0 bottom-0 ${o ? "outline outline-1 outline-dashed outline-blue-400/70" : ""}`, style: { left: `${u.leftPct}%`, width: `${u.widthPct}%` }, "data-cover-frame": "1", children: [i ? t.elements.map((a) => a.type === "text" ? T.jsx("div", { "data-cover-el": a.id, style: { ...Y(a), ...ce(a) }, children: a.text }, a.id) : oe(a) ? T.jsx("div", { "data-cover-el": a.id, style: Y(a), children: T.jsx(Xe, { el: a }) }, a.id) : T.jsx("div", { "data-cover-el": a.id, style: Y(a), children: T.jsx(Ve, { path: a.path, getPresignedUrl: e }) }, a.id)) : null, s] })] });
}
const Ye = "data-md-footnote-to", jt = "data-md-footnote-back-button", Ke = 2, Ge = "is-hidden";
let ct = null;
const N = /* @__PURE__ */ new WeakMap();
function Ue(t) {
  return /^#(?:source-\d+|fnref-\d+(?:-\d+)?)$/i.test(String(t || "").trim());
}
function Je(t, e) {
  var _a;
  try {
    const n = `#${CSS.escape(t)}, [data-md-footnote-id="${CSS.escape(t)}"]`, r = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, n);
    if (r) return r;
  } catch {
  }
  return document.getElementById(t);
}
function Qe(t) {
  return /^source-\d+$/i.test(t);
}
function Ze(t) {
  const e = lt(t);
  if (!e) {
    t.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }
  const n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), o = e.scrollTop + (n.top - r.top) - Ke;
  e.scrollTo({ top: Math.max(0, o), behavior: "smooth" });
}
function yt(t, e) {
  const n = String(t || "").trim(), r = n.startsWith("#") ? n.slice(1) : n;
  if (!r) return false;
  const o = Je(r, e);
  return o ? (Qe(r) ? Ze(o) : o.scrollIntoView({ block: "nearest", behavior: "smooth" }), true) : false;
}
function wt(t, e) {
  var _a, _b;
  const n = (_a = t == null ? void 0 : t.closest) == null ? void 0 : _a.call(t, ".md-editor-preview");
  return n && e.contains(n) ? n : ((_b = e.querySelector) == null ? void 0 : _b.call(e, ".md-editor-preview")) ?? e;
}
function tn(t) {
  return (t == null ? void 0 : t.querySelector) ? t.querySelector(`[${jt}]`) : null;
}
function ut(t) {
  const e = tn(t);
  if (!e) return;
  const n = !!(t && N.get(t));
  e.classList.toggle(Ge, !n), e.toggleAttribute("aria-hidden", !n), e.toggleAttribute("disabled", !n), e.setAttribute("data-footnote-return-target", (t && N.get(t)) ?? "");
}
function K(t) {
  t && N.delete(t), ct = null, ut(t);
}
function en(t, e) {
  t && e ? N.set(t, e) : t && N.delete(t), ct = e || null, ut(t);
}
function vn(t) {
  if (!t || typeof t.addEventListener != "function") return;
  const e = (n) => {
    var _a, _b, _c, _d;
    const r = n;
    if (r.metaKey || r.ctrlKey || r.shiftKey || r.altKey || typeof r.button == "number" && r.button !== 0) return;
    const o = (_b = (_a = r.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, `[${jt}]`);
    if (o instanceof HTMLElement && t.contains(o)) {
      const c = wt(r.target, t), m = c && N.get(c) || ct;
      if (!m) return;
      n.preventDefault(), n.stopPropagation(), yt(m, c), K(c);
      return;
    }
    const i = (_d = (_c = r.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "a[href], a[data-md-footnote-to]");
    if (!i || !t.contains(i)) return;
    const s = i.getAttribute(Ye) || "", u = i.getAttribute("href") || "", f = s || (Ue(u) ? u.slice(1) : "");
    if (!f) return;
    const a = wt(r.target, t);
    if (n.preventDefault(), n.stopPropagation(), f && f.startsWith("source-")) {
      const c = i.getAttribute("data-md-footnote-id") || i.id;
      c ? en(a, c) : K(a);
    } else K(a);
    yt(f, a);
  };
  return t.addEventListener("click", e, true), ut(t), () => t.removeEventListener("click", e, true);
}
export {
  mn as A,
  hn as B,
  fn as C,
  Sn as H,
  wn as P,
  Mn as a,
  Xe as b,
  ce as c,
  me as d,
  de as e,
  ue as f,
  le as g,
  vn as h,
  lt as i,
  D as j,
  Ht as k,
  st as l,
  pn as m,
  dn as n,
  $ as o,
  Cn as p,
  yn as q,
  cn as r,
  En as s,
  xn as t,
  $t as u,
  bn as v,
  un as w,
  Tn as x,
  pe as y,
  gn as z
};
