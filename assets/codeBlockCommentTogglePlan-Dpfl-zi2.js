import { a as w } from "./previewSelectionSync-CR47qWxc.js";
import { s as A } from "./haimCodeTabSettings-B-S365oc.js";
import { i as N } from "./WikiImageSizeModal-DUtadAkN.js";
const B = "h1, h2, h3, h4, h5, h6", p = 2, I = "md-preview-heading-folded", y = "md-preview-heading-section-hidden";
function b(t) {
  const n = String(t || "").trim();
  return !(!n.startsWith("#") || N(n));
}
function m(t) {
  const n = String(t || "").trim();
  if (!n.startsWith("#")) return "";
  const l = n.slice(1);
  if (!l) return "";
  try {
    return decodeURIComponent(l);
  } catch {
    return l;
  }
}
function v(t) {
  return String(t || "").trim().toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function C(t) {
  return String(t || "").trim().toLowerCase().replace(/\s+/g, " ");
}
function g(t, n, l) {
  const i = String(n || "").trim();
  if (!i) return false;
  const r = String(l || "").trim();
  if (r && (r === i || r === encodeURIComponent(i))) return true;
  const e = String(t || "").trim();
  if (!e) return false;
  if (C(e) === C(i)) return true;
  const o = v(i), s = v(e);
  return !!(o && s && o === s);
}
function d() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
function _(t) {
  for (let n = 0; n < 8; n += 1) {
    const l = getComputedStyle(t);
    if (!(t.classList.contains(y) || t.hasAttribute("hidden") || l.display === "none")) break;
    let r = false, e = t;
    for (; e && !r; ) {
      if (e instanceof HTMLElement && (e.classList.contains(y) || e.hasAttribute("hidden"))) {
        let s = e.previousElementSibling;
        for (; s; ) {
          if (s instanceof HTMLElement && s.classList.contains(I)) {
            const c = s.querySelector(":scope > .md-preview-heading-fold-chevron");
            c instanceof HTMLButtonElement && (c.click(), r = true);
            break;
          }
          s = s.previousElementSibling;
        }
      }
      e = e.parentElement;
    }
    if (!r) break;
  }
}
function H(t) {
  _(t);
  const n = d(), l = w(t);
  if (l) {
    const r = t.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(t).marginBlockStart || "0") || 0, e = t.getBoundingClientRect(), o = l.getBoundingClientRect(), s = l.scrollTop + (e.top - o.top) - p - r;
    l.scrollTo({ top: Math.max(0, s), behavior: n });
    return;
  }
  let i = t.parentElement;
  for (; i; ) {
    const r = getComputedStyle(i).overflowY;
    if (r === "auto" || r === "scroll" || r === "overlay") {
      A(i, t, { behavior: n });
      return;
    }
    i = i.parentElement;
  }
  t.scrollIntoView({ block: "start", behavior: n });
}
function D(t, n) {
  if (!t || typeof t.querySelectorAll != "function") return null;
  const l = m(n);
  if (!l) return null;
  try {
    const r = t.querySelector(`#${CSS.escape(l)}`);
    if (r instanceof HTMLElement) return r;
  } catch {
  }
  const i = t.querySelectorAll(B);
  for (const r of i) if (r instanceof HTMLElement && !r.closest("[data-note-cover-placeholder], [data-note-cover-preview]") && g(r.textContent || "", l, r.id || null)) return r;
  return null;
}
function Y(t, n) {
  if (!b(t)) return false;
  if (!m(t)) {
    const r = n instanceof Element ? n : n && "firstElementChild" in n ? n.firstElementChild : null, e = r instanceof Element ? w(r) : null;
    return e ? (e.scrollTo({ top: 0, behavior: d() }), true) : false;
  }
  const i = D(n, t);
  return i ? (H(i), true) : false;
}
function O(t, n) {
  if (!t || t.isDestroyed) return null;
  const l = m(n);
  if (!l) return null;
  let i = null;
  return t.state.doc.descendants((r, e) => {
    if (i) return false;
    if (r.type.name === "heading") {
      const o = Number(r.attrs.level) || 1, s = r.textContent.trim(), c = r.attrs.id != null ? String(r.attrs.id) : null;
      return g(s, l, c) && (i = { pos: e, level: Math.min(6, Math.max(1, o)), text: s }), false;
    }
    if (r.type.name === "deepHeading") {
      const o = Number(r.attrs.level) || 7, s = r.textContent.trim(), c = r.attrs.id != null ? String(r.attrs.id) : null;
      return g(s, l, c) && (i = { pos: e, level: Math.min(10, Math.max(7, o)), text: s }), false;
    }
  }), i;
}
function V(t, n, l) {
  if (!t || t.isDestroyed || !b(n)) return false;
  const i = m(n), r = d();
  if (!i) {
    const o = t.view.dom.parentElement;
    let s = o instanceof HTMLElement ? o : t.view.dom;
    for (; s; ) {
      const c = getComputedStyle(s).overflowY;
      if (c === "auto" || c === "scroll" || c === "overlay") return s.scrollTo({ top: 0, behavior: r }), true;
      s = s.parentElement;
    }
    return false;
  }
  const e = O(t, n);
  if (!e) return false;
  try {
    t.chain().focus().setTextSelection(e.pos + 1).run();
    const o = t.view.nodeDOM(e.pos), s = o instanceof HTMLElement ? o : o instanceof Node && o.parentElement ? o.parentElement : null;
    return s ? (l || H(s), true) : false;
  } catch {
    return false;
  }
}
function P(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function X(t, n) {
  if (!t || !b(n)) return false;
  const l = m(n), i = d(), r = t.scrollDOM;
  if (!l) return r.scrollTo({ top: 0, behavior: i }), true;
  const e = t.state.doc;
  for (let s = 1; s <= e.lines; s += 1) {
    const c = e.line(s), h = /^(#{1,10})\s+(.+?)\s*$/.exec(c.text);
    if (!h) continue;
    const T = (h[2] || "").trim();
    if (!g(T, l)) continue;
    t.dispatch({ selection: { anchor: c.from } });
    const E = t.coordsAtPos(c.from);
    if (E) {
      const S = r.getBoundingClientRect(), M = r.scrollTop + (E.top - S.top) - p;
      r.scrollTo({ top: Math.max(0, M), behavior: i });
    } else {
      const S = t.lineBlockAt(c.from);
      r.scrollTo({ top: Math.max(0, S.top - p), behavior: i });
    }
    return true;
  }
  const o = new RegExp(`^${P(l)}\\s*$`, "i");
  for (let s = 1; s <= e.lines; s += 1) {
    const c = e.line(s);
    if (!o.test(c.text.trim())) continue;
    t.dispatch({ selection: { anchor: c.from } });
    const h = t.lineBlockAt(c.from);
    return r.scrollTo({ top: Math.max(0, h.top - p), behavior: i }), true;
  }
  return false;
}
const j = { js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", py: "python", sh: "bash", zsh: "bash", ksh: "bash", yml: "yaml", md: "markdown", htm: "xml", html: "xml", svg: "xml", cs: "csharp", "c++": "cpp", "c#": "csharp", rb: "ruby", rs: "rust", kt: "kotlin", ps1: "powershell", pwsh: "powershell" }, f = "//", u = "#", x = "--", F = ";", $ = "%%", R = "'", a = { open: "/*", close: "*/" }, k = { open: "<!--", close: "-->" }, q = { javascript: { line: f, block: a }, typescript: { line: f, block: a }, java: { line: f, block: a }, c: { line: f, block: a }, cpp: { line: f, block: a }, csharp: { line: f, block: a }, go: { line: f, block: a }, rust: { line: f, block: a }, kotlin: { line: f, block: a }, swift: { line: f, block: a }, php: { line: f, block: a }, "php-template": { line: f, block: a }, objectivec: { line: f, block: a }, arduino: { line: f, block: a }, less: { line: f, block: a }, scss: { line: f, block: a }, json: { line: f, block: a }, wasm: { line: f, block: a }, python: { line: u }, "python-repl": { line: u }, ruby: { line: u }, bash: { line: u }, shell: { line: u }, yaml: { line: u }, makefile: { line: u }, r: { line: u }, perl: { line: u }, graphql: { line: u }, powershell: { line: u }, sql: { line: x }, lua: { line: x }, ini: { line: F }, vbnet: { line: R }, mermaid: { line: $ }, css: { block: a }, xml: { block: k }, markdown: { block: k } }, L = { line: f, block: a };
function G(t) {
  const n = String(t ?? "").trim().toLowerCase();
  return n ? j[n] ?? n : "";
}
function J(t) {
  const n = G(t);
  if (!n) return { ...L };
  const l = q[n];
  return l ? { ...l } : { ...L };
}
function Q(t, n) {
  var _a;
  if (!n || t.length === 0) return null;
  const l = [];
  let i = 1e9;
  for (const e of t) {
    const o = ((_a = /^\s*/.exec(e.text)) == null ? void 0 : _a[0].length) ?? 0, s = o === e.text.length, c = e.text.slice(o, o + n.length) === n ? o : -1;
    o < e.text.length && o < i && (i = o), l.push({ from: e.from, text: e.text, comment: c, indent: o, empty: s, single: false });
  }
  if (i < 1e9) for (const e of l) e.indent < e.text.length && (e.indent = i);
  if (l.length === 1 && (l[0].single = true), l.some((e) => e.comment < 0 && (!e.empty || e.single))) {
    const e = [];
    for (const o of l) (o.single || !o.empty) && e.push({ from: o.from + o.indent, insert: `${n} ` });
    return e.length > 0 ? e : null;
  }
  if (l.some((e) => e.comment >= 0)) {
    const e = [];
    for (const o of l) {
      if (o.comment < 0) continue;
      let s = o.from + o.comment, c = s + n.length;
      o.text[o.comment + n.length] === " " && (c += 1), e.push({ from: s, to: c, insert: "" });
    }
    return e.length > 0 ? e : null;
  }
  return null;
}
function U(t, n, l) {
  var _a, _b;
  const { from: i, to: r, content: e } = t;
  if (e.length < n.length + l.length) return null;
  const o = ((_a = /^\s*/.exec(e)) == null ? void 0 : _a[0].length) ?? 0, s = ((_b = /\s*$/.exec(e)) == null ? void 0 : _b[0].length) ?? 0, c = e.length - s - l.length;
  return e.slice(o, o + n.length) === n && c >= o + n.length && e.slice(c, c + l.length) === l ? { openPos: i + o + n.length, openMargin: /\s/.test(e.charAt(o + n.length)) ? 1 : 0, closePos: r - s - l.length, closeMargin: c > 0 && /\s/.test(e.charAt(c - 1)) ? 1 : 0 } : null;
}
function Z(t, n, l) {
  if (!n || !l || t.length === 0) return null;
  const i = t.map((e) => U(e, n, l));
  if (!i.every((e) => e)) {
    const e = [];
    for (let o = 0; o < t.length; o += 1) {
      if (i[o]) continue;
      const s = t[o];
      e.push({ from: s.from, insert: `${n} ` }, { from: s.to, insert: ` ${l}` });
    }
    return e.length > 0 ? e : null;
  }
  const r = [];
  for (let e = 0; e < i.length; e += 1) {
    const o = i[e];
    o && r.push({ from: o.openPos - n.length, to: o.openPos + o.openMargin, insert: "" }, { from: o.closePos - o.closeMargin, to: o.closePos + l.length, insert: "" });
  }
  return r.length > 0 ? r : null;
}
function ee(t) {
  return [...t].sort((n, l) => l.from - n.from || (l.to ?? l.from) - (n.to ?? n.from));
}
export {
  Z as a,
  X as b,
  V as c,
  ee as d,
  b as i,
  Q as p,
  J as r,
  Y as s
};
