import { w as M, s as _, i as v, t as C, g as I, j as y, n as T } from "./style-DmNGgRyO.js";
import { aV as E, aW as A, a5 as R } from "./index-Bdif1hip.js";
import { renderAppMarkdownInline as H } from "./createAppMarkdownIt-BYKo0nPR.js";
import { m as O } from "./vendor-tiptap-BiD2it08.js";
const W = /(?:<!--\s*mermaid-size\b[\s\S]*?-->\s*)?```mermaid[^\n]*\n[\s\S]*?```/g, P = /<!--\s*haim-table\b[\s\S]*?-->\s*(?:\n\|[\s\S]*?(?:\n\n|$))?/g, B = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, L = /<!--\s*chat-with-myself\b[\s\S]*?-->[\s\S]*?(?=\n<!--|\n#{1,6}\s|\n*$)/g;
function m(n, t) {
  const r = t.replace(/\s+$/, "");
  return `<pre data-haim-raw-md="1" data-kind="${F(n)}">${b(r)}</pre>

`;
}
function N(n) {
  let t = typeof n == "string" ? n : "";
  t = t.replace(W, (e) => /<!--\s*mermaid-size\b/i.test(e) ? m("mermaid", e) : e), t = t.replace(P, (e) => m("haim-table", e)), t = t.replace(L, (e) => m("chat-saved-note", e));
  const r = B.exec(t);
  return (r == null ? void 0 : r[0]) && (t = m("plan-frontmatter", r[0]) + t.slice(r[0].length)), t = t.replace(/<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?/gi, "<pgbr/>"), t = t.replace(E, (e, a) => {
    const i = A(a);
    if (!(i == null ? void 0 : i.path)) return e;
    const s = String(a).trim(), o = s.lastIndexOf("|");
    let c = "";
    if (o >= 0) {
      const p = s.slice(0, o).trim(), l = s.slice(o + 1).trim();
      i.path === p && l && (c = l);
    }
    return M(i.path, c);
  }), t = V(t), t = t.replace(/^(#{7,10})\s+(.+)$/gm, (e, a, i) => `<h6 data-heading-level="${a.length}">${b(i)}</h6>`), t;
}
function j(n) {
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
  }), t = D(t), t = t.replace(/<figure\b[^>]*\bdata-haim-wiki-figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (r, e) => {
    const a = String(e).match(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/i), i = String(e).match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
    if (!(a == null ? void 0 : a[0])) return String(e);
    const s = w(a[0]), o = i ? u(i[1] || "").trim() : "";
    return o ? `${s}
${o}` : s;
  }), t = t.replace(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/gi, (r) => w(r)), t = t.replace(/<div\b[^>]*\bdata-haim-wiki-image\b[^>]*>[\s\S]*?<\/div>/gi, (r) => {
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
  return r ? k(r[1] || "") : "";
}
function w(n) {
  const t = g(n, "data-wiki-path");
  if (!t) return n;
  const r = g(n, "data-wiki-width") || null, e = g(n, "data-wiki-height") || null, a = g(n, "data-wiki-bg") || null, i = g(n, "data-wiki-options");
  return r || e || a ? R({ path: t, width: r, height: e, background: a }) : i ? `![[${t}|${i}]]` : `![[${t}]]`;
}
function V(n) {
  const t = n.split(`
`), r = [], e = /^(\s*)(<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>)\s*$/i;
  for (let a = 0; a < t.length; a += 1) {
    const i = t[a] ?? "", s = e.exec(i);
    if (!s) {
      r.push(i);
      continue;
    }
    const o = s[1] ?? "", c = s[2] ?? "";
    let p = a + 1;
    p < t.length && String(t[p]).trim() === "" && (p += 1);
    const l = p < t.length ? String(t[p] ?? "") : "";
    if (q(l)) {
      const f = l.trim();
      r.push(`${o}<figure data-haim-wiki-figure="1">${c}<figcaption>${z(f)}</figcaption></figure>`), a = p;
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
    return H(t);
  } catch {
    return b(t);
  }
}
function u(n) {
  let t = String(n || "");
  return t = t.replace(/<br\s*\/?>/gi, `
`), t = t.replace(/<\/(p|div|h[1-6])>/gi, `
`), t = t.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (r, e, a) => {
    const i = String(e).match(/\bhref\s*=\s*"([^"]*)"/i) || String(e).match(/\bhref\s*=\s*'([^']*)'/i), s = i ? k(i[1] || "") : "", o = u(a).trim() || s;
    return s ? `[${o}](${s})` : o;
  }), t = t.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (r, e, a) => `**${u(a)}**`), t = t.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (r, e, a) => `*${u(a)}*`), t = t.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (r, e) => `\`${d(String(e))}\``), t = t.replace(/<[^>]+>/g, ""), d(t).replace(/\s+/g, " ").trim();
}
function D(n) {
  const t = /<div\b[^>]*\bdata-note-cover-placeholder\b[^>]*>/gi;
  let r = "", e = 0, a;
  for (; a = t.exec(n); ) {
    const i = a.index;
    r += n.slice(e, i);
    const s = i + a[0].length;
    let o = 1, c = s;
    for (; c < n.length && o > 0; ) {
      const p = n.indexOf("<div", c), l = n.indexOf("</div>", c);
      if (l < 0) {
        c = n.length;
        break;
      }
      p >= 0 && p < l ? (o += 1, c = p + 4) : (o -= 1, c = l + 6);
    }
    e = c, t.lastIndex = c;
  }
  return r += n.slice(e), r;
}
function F(n) {
  return n.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "&#10;");
}
function k(n) {
  return n.replace(/&#10;/g, `
`).replace(/&#x0*a;/gi, `
`).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function b(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function d(n) {
  return n.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function K(n, t = O) {
  const { inlineMath: r } = n.schema.nodes;
  if (!r) return;
  const e = n.state.tr;
  e.doc.descendants((a, i) => {
    if (!a.isText || !a.text || !a.text.includes("$") || a.marks.some((c) => c.type.name === "code")) return;
    const { text: s } = a, o = s.match(t);
    if (o) for (const c of o) {
      const p = s.indexOf(c);
      if (p < 0) continue;
      const l = p + c.length, f = e.mapping.map(i + p), h = e.doc.resolve(f);
      if (h.parent.type.name === "codeBlock") return;
      const S = h.parent, $ = h.index();
      if (!S.canReplaceWith($, $ + 1, r)) return;
      const x = c.slice(1, -1);
      e.replaceWith(e.mapping.map(i + p), e.mapping.map(i + l), r.create({ latex: x }));
    }
  }), e.setMeta("addToHistory", false), e.docChanged && n.view.dispatch(e);
}
function U(n) {
  const { prefix: t, body: r } = _(n);
  let e = N(r);
  return /<!--\s*note-cover\b/i.test(t) && (e = `${T()}${e}`), { prefix: t, content: e };
}
function Z(n, t) {
  if (!n) return t || "";
  const r = I(n), e = G(j(r));
  return y(t, e);
}
function G(n) {
  let t = typeof n == "string" ? n : "";
  return t = t.replace(/^[ \t]*(?:&nbsp;|\u00A0)+[ \t]*$/gm, ""), t = t.replace(/(^|\n)[ \t]*&nbsp;[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/(^|\n)[ \t]*\u00A0+[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/\n{3,}/g, `

`), t;
}
function tt(n, t, r, e) {
  const { prefix: a, content: i } = U(t);
  r.current = a, v(n), n.commands.setContent(i, { contentType: "markdown", emitUpdate: (e == null ? void 0 : e.emitUpdate) ?? false });
  try {
    K(n);
  } catch {
  }
  try {
    C(n, { skipSelectionBlock: false });
  } catch {
  }
}
export {
  G as a,
  Z as e,
  U as m,
  N as p,
  j as r,
  tt as s
};
