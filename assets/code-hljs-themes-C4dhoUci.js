import { w as v, s as C, i as _, t as y, g as I, j as E, n as T } from "./style-DJg6CUjI.js";
import { aT as A, aU as H, a4 as R } from "./index-CzDTh_Dm.js";
import { renderAppMarkdownInline as O } from "./createAppMarkdownIt-qaxSEGe8.js";
import { m as W } from "./vendor-tiptap-B9z9WF3R.js";
const P = /(?:<!--\s*mermaid-size\b[\s\S]*?-->\s*)?```mermaid[^\n]*\n[\s\S]*?```/g, N = /<!--\s*haim-table\b[\s\S]*?-->\s*(?:\n\|[\s\S]*?(?:\n\n|$))?/g, B = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, L = /<!--\s*chat-with-myself\b[\s\S]*?-->[\s\S]*?(?=\n<!--|\n#{1,6}\s|\n*$)/g;
function m(n, t) {
  const r = t.replace(/\s+$/, "");
  return `<pre data-haim-raw-md="1" data-kind="${b(n)}">${$(r)}</pre>

`;
}
function D(n) {
  let t = typeof n == "string" ? n : "";
  t = t.replace(P, (e) => /<!--\s*mermaid-size\b/i.test(e) ? m("mermaid", e) : e), t = t.replace(N, (e) => m("haim-table", e)), t = t.replace(L, (e) => m("chat-saved-note", e));
  const r = B.exec(t);
  return (r == null ? void 0 : r[0]) && (t = m("plan-frontmatter", r[0]) + t.slice(r[0].length)), t = t.replace(/<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?/gi, "<pgbr/>"), t = t.replace(A, (e, a) => {
    const i = H(a);
    if (!(i == null ? void 0 : i.path)) return e;
    const s = String(a).trim(), c = s.lastIndexOf("|");
    let o = "";
    if (c >= 0) {
      const l = s.slice(0, c).trim(), p = s.slice(c + 1).trim();
      i.path === l && p && (o = p);
    }
    return v(i.path, o);
  }), t = U(t), t = t.replace(/^(#{7,10})\s+(.+)$/gm, (e, a, i) => `<h6 data-heading-level="${a.length}">${$(i)}</h6>`), t = j(t, (e) => {
    let a = e.replace(/\$\$([\s\S]+?)\$\$/g, (i, s) => {
      const c = String(s || "").trim();
      return c ? `<div data-type="block-math" data-latex="${b(c)}"></div>

` : i;
    });
    return a = a.replace(/\$(?!\d+\$)([^$\n]+?)\$(?!\d)/g, (i, s) => {
      const c = String(s || "").trim();
      return c ? `<span data-type="inline-math" data-latex="${b(c)}"></span>` : i;
    }), a;
  }), t;
}
function j(n, t) {
  const r = [], e = (s) => `\uE000HAIMCODE${s}\uE001`, a = (s) => {
    const c = r.length;
    return r.push(s), e(c);
  };
  let i = n;
  return i = i.replace(/<pre\b[^>]*\bdata-haim-raw-md\b[^>]*>[\s\S]*?<\/pre>/gi, a), i = i.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, a), i = i.replace(/(`+)((?:(?!\1).|\n)+?)\1/g, a), i = t(i), i = i.replace(/\uE000HAIMCODE(\d+)\uE001/g, (s, c) => {
    const o = Number(c);
    return Number.isFinite(o) && r[o] != null ? r[o] : s;
  }), i;
}
function F(n) {
  let t = typeof n == "string" ? n : "";
  return t = t.replace(/<pre\b[^>]*\bdata-haim-raw-md\b[^>]*>([\s\S]*?)<\/pre>/gi, (r, e) => {
    const a = d(String(e || ""));
    return a.endsWith(`
`) ? a : `${a}
`;
  }), t = t.replace(/@@@haim-raw:([^\n]*)\n([\s\S]*?)\n@@@\/haim-raw/g, (r, e, a) => {
    const i = String(a || "");
    return i.endsWith(`
`) ? i : `${i}
`;
  }), t = K(t), t = t.replace(/<figure\b[^>]*\bdata-haim-wiki-figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (r, e) => {
    const a = String(e).match(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/i), i = String(e).match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
    if (!(a == null ? void 0 : a[0])) return String(e);
    const s = w(a[0]), c = i ? g(i[1] || "").trim() : "";
    return c ? `${s}
${c}` : s;
  }), t = t.replace(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/gi, (r) => w(r)), t = t.replace(/<div\b[^>]*\bdata-haim-wiki-image\b[^>]*>[\s\S]*?<\/div>/gi, (r) => {
    const e = u(r, "data-wiki-path"), a = u(r, "data-wiki-options");
    return e ? a ? `![[${e}|${a}]]` : `![[${e}]]` : r;
  }), t = t.replace(/<div[^>]*data-haim-pgbr[^>]*>[\s\S]*?<\/div>/gi, "<pgbr/>"), t = t.replace(/<pgbr><\/pgbr>/gi, "<pgbr/>"), t = t.replace(/<pgbr\s*\/?\s*>/gi, "<pgbr/>"), t = t.replace(/<h6[^>]*data-heading-level="(\d+)"[^>]*>([\s\S]*?)<\/h6>/gi, (r, e, a) => {
    const i = Math.min(10, Math.max(7, Number(e) || 7)), s = d(String(a).replace(/<[^>]+>/g, "")).trim();
    return `${"#".repeat(i)} ${s}`;
  }), t = t.replace(/<div\b[^>]*\bdata-type=["']block-math["'][^>]*>[\s\S]*?<\/div>/gi, (r) => {
    const e = u(r, "data-latex");
    return e ? `$$
${e}
$$
` : r;
  }), t = t.replace(/<span\b[^>]*\bdata-type=["']inline-math["'][^>]*>[\s\S]*?<\/span>/gi, (r) => {
    const e = u(r, "data-latex");
    return e ? `$${e}$` : r;
  }), t = t.replace(/^\n+/, ""), t;
}
function u(n, t) {
  const r = new RegExp(`${t}="([^"]*)"`, "i").exec(n);
  return r ? S(r[1] || "") : "";
}
function w(n) {
  const t = u(n, "data-wiki-path");
  if (!t) return n;
  const r = u(n, "data-wiki-width") || null, e = u(n, "data-wiki-height") || null, a = u(n, "data-wiki-bg") || null, i = u(n, "data-wiki-options");
  return r || e || a ? R({ path: t, width: r, height: e, background: a }) : i ? `![[${t}|${i}]]` : `![[${t}]]`;
}
function U(n) {
  const t = n.split(`
`), r = [], e = /^(\s*)(<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>)\s*$/i;
  for (let a = 0; a < t.length; a += 1) {
    const i = t[a] ?? "", s = e.exec(i);
    if (!s) {
      r.push(i);
      continue;
    }
    const c = s[1] ?? "", o = s[2] ?? "";
    let l = a + 1;
    l < t.length && String(t[l]).trim() === "" && (l += 1);
    const p = l < t.length ? String(t[l] ?? "") : "";
    if (q(p)) {
      const f = p.trim();
      r.push(`${c}<figure data-haim-wiki-figure="1">${o}<figcaption>${z(f)}</figcaption></figure>`), a = l;
      continue;
    }
    r.push(i);
  }
  return r.join(`
`);
}
function q(n) {
  const t = String(n ?? "").trim();
  return !(!t || /^#{1,10}\s/.test(t) || /^```/.test(t) || /^!\[\[/.test(t) || /^</.test(t) || /^\|/.test(t) || /^>\s?/.test(t) || /^(-{3,}|\*{3,}|_{3,})\s*$/.test(t) || /^([-*+]|\d+[.)])\s+/.test(t) || /^\$\$/.test(t));
}
function z(n) {
  const t = String(n ?? "").trim();
  if (!t) return "";
  try {
    return O(t);
  } catch {
    return $(t);
  }
}
function g(n) {
  let t = String(n || "");
  return t = t.replace(/<br\s*\/?>/gi, `
`), t = t.replace(/<\/(p|div|h[1-6])>/gi, `
`), t = t.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (r, e, a) => {
    const i = String(e).match(/\bhref\s*=\s*"([^"]*)"/i) || String(e).match(/\bhref\s*=\s*'([^']*)'/i), s = i ? S(i[1] || "") : "", c = g(a).trim() || s;
    return s ? `[${c}](${s})` : c;
  }), t = t.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (r, e, a) => `**${g(a)}**`), t = t.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (r, e, a) => `*${g(a)}*`), t = t.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (r, e) => `\`${d(String(e))}\``), t = t.replace(/<[^>]+>/g, ""), d(t).replace(/\s+/g, " ").trim();
}
function K(n) {
  const t = /<div\b[^>]*\bdata-note-cover-placeholder\b[^>]*>/gi;
  let r = "", e = 0, a;
  for (; a = t.exec(n); ) {
    const i = a.index;
    r += n.slice(e, i);
    const s = i + a[0].length;
    let c = 1, o = s;
    for (; o < n.length && c > 0; ) {
      const l = n.indexOf("<div", o), p = n.indexOf("</div>", o);
      if (p < 0) {
        o = n.length;
        break;
      }
      l >= 0 && l < p ? (c += 1, o = l + 4) : (c -= 1, o = p + 6);
    }
    e = o, t.lastIndex = o;
  }
  return r += n.slice(e), r;
}
function b(n) {
  return n.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function S(n) {
  return n.replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function $(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function d(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function V(n, t = W) {
  const { inlineMath: r } = n.schema.nodes;
  if (!r) return;
  const e = n.state.tr;
  e.doc.descendants((a, i) => {
    if (!a.isText || !a.text || !a.text.includes("$") || a.marks.some((o) => o.type.name === "code")) return;
    const { text: s } = a, c = s.match(t);
    if (c) for (const o of c) {
      const l = s.indexOf(o);
      if (l < 0) continue;
      const p = l + o.length, f = e.mapping.map(i + l), h = e.doc.resolve(f);
      if (h.parent.type.name === "codeBlock") return;
      const x = h.parent, k = h.index();
      if (!x.canReplaceWith(k, k + 1, r)) return;
      const M = o.slice(1, -1);
      e.replaceWith(e.mapping.map(i + l), e.mapping.map(i + p), r.create({ latex: M }));
    }
  }), e.setMeta("addToHistory", false), e.docChanged && n.view.dispatch(e);
}
function G(n) {
  const { prefix: t, body: r } = C(n);
  let e = D(r);
  return /<!--\s*note-cover\b/i.test(t) && (e = `${T()}${e}`), { prefix: t, content: e };
}
function tt(n, t) {
  if (!n) return t || "";
  const r = I(n), e = J(F(r));
  return E(t, e);
}
function J(n) {
  let t = typeof n == "string" ? n : "";
  return t = t.replace(/^[ \t]*(?:&nbsp;|\u00A0)+[ \t]*$/gm, ""), t = t.replace(/(^|\n)[ \t]*&nbsp;[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/(^|\n)[ \t]*\u00A0+[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/\n{3,}/g, `

`), t;
}
function et(n, t, r, e) {
  const { prefix: a, content: i } = G(t);
  r.current = a, _(n), n.commands.setContent(i, { contentType: "markdown", emitUpdate: (e == null ? void 0 : e.emitUpdate) ?? false });
  try {
    V(n);
  } catch {
  }
  try {
    y(n, { skipSelectionBlock: false });
  } catch {
  }
}
export {
  J as a,
  tt as e,
  G as m,
  D as p,
  F as r,
  et as s
};
