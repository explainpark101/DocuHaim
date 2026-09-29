import { m as S } from "./vendor-tiptap-Dthoom2y.js";
import { w as k, s as x, i as M, t as _, g as v, j as C, n as I } from "./style-BI-qDSx1.js";
import { aV as y, aW as E, a9 as T } from "./index-DoT3hwpA.js";
import { renderAppMarkdownInline as A } from "./createAppMarkdownIt-CIw593Xp.js";
const R = /(?:<!--\s*mermaid-size\b[\s\S]*?-->\s*)?```mermaid[^\n]*\n[\s\S]*?```/g, H = /<!--\s*haim-table\b[\s\S]*?-->\s*(?:\n\|[\s\S]*?(?:\n\n|$))?/g, O = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, P = /<!--\s*chat-with-myself\b[\s\S]*?-->[\s\S]*?(?=\n<!--|\n#{1,6}\s|\n*$)/g;
function u(n, t) {
  const r = t.replace(/\s+$/, "");
  return `<pre data-haim-raw-md="1" data-kind="${f(n)}">${h(r)}</pre>

`;
}
function W(n) {
  let t = typeof n == "string" ? n : "";
  t = t.replace(R, (e) => /<!--\s*mermaid-size\b/i.test(e) ? u("mermaid", e) : e), t = t.replace(H, (e) => u("haim-table", e)), t = t.replace(P, (e) => u("chat-saved-note", e));
  const r = O.exec(t);
  return (r == null ? void 0 : r[0]) && (t = u("plan-frontmatter", r[0]) + t.slice(r[0].length)), t = t.replace(/<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?/gi, "<pgbr/>"), t = t.replace(y, (e, a) => {
    const i = E(a);
    if (!(i == null ? void 0 : i.path)) return e;
    const s = String(a).trim(), o = s.lastIndexOf("|");
    let c = "";
    if (o >= 0) {
      const l = s.slice(0, o).trim(), p = s.slice(o + 1).trim();
      i.path === l && p && (c = p);
    }
    return k(i.path, c);
  }), t = B(t), t = t.replace(/^(#{7,10})\s+(.+)$/gm, (e, a, i) => `<h6 data-heading-level="${a.length}">${h(i)}</h6>`), t = t.replace(/\$\$([\s\S]+?)\$\$/g, (e, a) => {
    const i = String(a || "").trim();
    return i ? `<div data-type="block-math" data-latex="${f(i)}"></div>

` : e;
  }), t = t.replace(/\$(?!\d+\$)([^$\n]+?)\$(?!\d)/g, (e, a) => {
    const i = String(a || "").trim();
    return i ? `<span data-type="inline-math" data-latex="${f(i)}"></span>` : e;
  }), t;
}
function L(n) {
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
  }), t = V(t), t = t.replace(/<figure\b[^>]*\bdata-haim-wiki-figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (r, e) => {
    const a = String(e).match(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/i), i = String(e).match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
    if (!(a == null ? void 0 : a[0])) return String(e);
    const s = b(a[0]), o = i ? m(i[1] || "").trim() : "";
    return o ? `${s}
${o}` : s;
  }), t = t.replace(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/gi, (r) => b(r)), t = t.replace(/<div\b[^>]*\bdata-haim-wiki-image\b[^>]*>[\s\S]*?<\/div>/gi, (r) => {
    const e = g(r, "data-wiki-path"), a = g(r, "data-wiki-options");
    return e ? a ? `![[${e}|${a}]]` : `![[${e}]]` : r;
  }), t = t.replace(/<div[^>]*data-haim-pgbr[^>]*>[\s\S]*?<\/div>/gi, "<pgbr/>"), t = t.replace(/<pgbr><\/pgbr>/gi, "<pgbr/>"), t = t.replace(/<pgbr\s*\/?\s*>/gi, "<pgbr/>"), t = t.replace(/<h6[^>]*data-heading-level="(\d+)"[^>]*>([\s\S]*?)<\/h6>/gi, (r, e, a) => {
    const i = Math.min(10, Math.max(7, Number(e) || 7)), s = d(String(a).replace(/<[^>]+>/g, "")).trim();
    return `${"#".repeat(i)} ${s}`;
  }), t = t.replace(/<div\b[^>]*\bdata-type=["']block-math["'][^>]*>[\s\S]*?<\/div>/gi, (r) => {
    const e = g(r, "data-latex");
    return e ? `$$
${e}
$$
` : r;
  }), t = t.replace(/<span\b[^>]*\bdata-type=["']inline-math["'][^>]*>[\s\S]*?<\/span>/gi, (r) => {
    const e = g(r, "data-latex");
    return e ? `$${e}$` : r;
  }), t = t.replace(/^\n+/, ""), t;
}
function g(n, t) {
  const r = new RegExp(`${t}="([^"]*)"`, "i").exec(n);
  return r ? $(r[1] || "") : "";
}
function b(n) {
  const t = g(n, "data-wiki-path");
  if (!t) return n;
  const r = g(n, "data-wiki-width") || null, e = g(n, "data-wiki-height") || null, a = g(n, "data-wiki-bg") || null, i = g(n, "data-wiki-options");
  return r || e || a ? T({ path: t, width: r, height: e, background: a }) : i ? `![[${t}|${i}]]` : `![[${t}]]`;
}
function B(n) {
  const t = n.split(`
`), r = [], e = /^(\s*)(<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>)\s*$/i;
  for (let a = 0; a < t.length; a += 1) {
    const i = t[a] ?? "", s = e.exec(i);
    if (!s) {
      r.push(i);
      continue;
    }
    const o = s[1] ?? "", c = s[2] ?? "";
    let l = a + 1;
    l < t.length && String(t[l]).trim() === "" && (l += 1);
    const p = l < t.length ? String(t[l] ?? "") : "";
    if (N(p)) {
      const w = p.trim();
      r.push(`${o}<figure data-haim-wiki-figure="1">${c}<figcaption>${j(w)}</figcaption></figure>`), a = l;
      continue;
    }
    r.push(i);
  }
  return r.join(`
`);
}
function N(n) {
  const t = String(n ?? "").trim();
  return !(!t || /^#{1,10}\s/.test(t) || /^```/.test(t) || /^!\[\[/.test(t) || /^</.test(t) || /^\|/.test(t) || /^>\s?/.test(t) || /^(-{3,}|\*{3,}|_{3,})\s*$/.test(t) || /^([-*+]|\d+[.)])\s+/.test(t) || /^\$\$/.test(t));
}
function j(n) {
  const t = String(n ?? "").trim();
  if (!t) return "";
  try {
    return A(t);
  } catch {
    return h(t);
  }
}
function m(n) {
  let t = String(n || "");
  return t = t.replace(/<br\s*\/?>/gi, `
`), t = t.replace(/<\/(p|div|h[1-6])>/gi, `
`), t = t.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (r, e, a) => {
    const i = String(e).match(/\bhref\s*=\s*"([^"]*)"/i) || String(e).match(/\bhref\s*=\s*'([^']*)'/i), s = i ? $(i[1] || "") : "", o = m(a).trim() || s;
    return s ? `[${o}](${s})` : o;
  }), t = t.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (r, e, a) => `**${m(a)}**`), t = t.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (r, e, a) => `*${m(a)}*`), t = t.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (r, e) => `\`${d(String(e))}\``), t = t.replace(/<[^>]+>/g, ""), d(t).replace(/\s+/g, " ").trim();
}
function V(n) {
  const t = /<div\b[^>]*\bdata-note-cover-placeholder\b[^>]*>/gi;
  let r = "", e = 0, a;
  for (; a = t.exec(n); ) {
    const i = a.index;
    r += n.slice(e, i);
    const s = i + a[0].length;
    let o = 1, c = s;
    for (; c < n.length && o > 0; ) {
      const l = n.indexOf("<div", c), p = n.indexOf("</div>", c);
      if (p < 0) {
        c = n.length;
        break;
      }
      l >= 0 && l < p ? (o += 1, c = l + 4) : (o -= 1, c = p + 6);
    }
    e = c, t.lastIndex = c;
  }
  return r += n.slice(e), r;
}
function f(n) {
  return n.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function $(n) {
  return n.replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function h(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function d(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function q(n) {
  const { prefix: t, body: r } = x(n);
  let e = W(r);
  return /<!--\s*note-cover\b/i.test(t) && (e = `${I()}${e}`), { prefix: t, content: e };
}
function G(n, t) {
  if (!n) return t || "";
  const r = v(n), e = z(L(r));
  return C(t, e);
}
function z(n) {
  let t = typeof n == "string" ? n : "";
  return t = t.replace(/^[ \t]*(?:&nbsp;|\u00A0)+[ \t]*$/gm, ""), t = t.replace(/(^|\n)[ \t]*&nbsp;[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/(^|\n)[ \t]*\u00A0+[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/\n{3,}/g, `

`), t;
}
function J(n, t, r, e) {
  const { prefix: a, content: i } = q(t);
  r.current = a, M(n), n.commands.setContent(i, { contentType: "markdown", emitUpdate: (e == null ? void 0 : e.emitUpdate) ?? false });
  try {
    S(n);
  } catch {
  }
  try {
    _(n, { skipSelectionBlock: false });
  } catch {
  }
}
export {
  z as a,
  G as e,
  q as m,
  W as p,
  L as r,
  J as s
};
