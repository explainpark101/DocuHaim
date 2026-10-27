import { w as M, r as _, s as v, i as C, t as I, a as T, n as y, j as E } from "./style-BvfZMhHc.js";
import { aY as A, aZ as R, a4 as H } from "./index-DRAozU5b.js";
import { renderAppMarkdownInline as O } from "./createAppMarkdownIt-IEDuvO-F.js";
import { m as W } from "./vendor-tiptap-DxyadcB3.js";
const P = /(?:<!--\s*mermaid-size\b[\s\S]*?-->\s*)?```mermaid[^\n]*\n[\s\S]*?```/g, B = /<!--\s*haim-table\b[\s\S]*?-->\s*(?:\n\|[\s\S]*?(?:\n\n|$))?/g, L = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, N = /<!--\s*chat-with-myself\b[\s\S]*?-->[\s\S]*?(?=\n<!--|\n#{1,6}\s|\n*$)/g;
function m(n, t) {
  const r = t.replace(/\s+$/, "");
  return `<pre data-haim-raw-md="1" data-kind="${K(n)}">${b(r)}</pre>

`;
}
function j(n) {
  let t = typeof n == "string" ? n : "";
  t = t.replace(P, (e) => /<!--\s*mermaid-size\b/i.test(e) ? m("mermaid", e) : e), t = t.replace(B, (e) => m("haim-table", e)), t = t.replace(N, (e) => m("chat-saved-note", e));
  const r = L.exec(t);
  return (r == null ? void 0 : r[0]) && (t = m("plan-frontmatter", r[0]) + t.slice(r[0].length)), t = t.replace(/<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?/gi, "<pgbr/>"), t = t.replace(A, (e, a) => {
    const i = R(a);
    if (!(i == null ? void 0 : i.path)) return e;
    const s = String(a).trim(), o = s.lastIndexOf("|");
    let c = "";
    if (o >= 0) {
      const p = s.slice(0, o).trim(), l = s.slice(o + 1).trim();
      i.path === p && l && (c = l);
    }
    return M(i.path, c);
  }), t = q(t), t = t.replace(/^(#{7,10})\s+(.+)$/gm, (e, a, i) => `<h6 data-heading-level="${a.length}">${b(i)}</h6>`), t;
}
function V(n) {
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
  }), t = F(t), t = t.replace(/<figure\b[^>]*\bdata-haim-wiki-figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (r, e) => {
    const a = String(e).match(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/i), i = String(e).match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
    if (!(a == null ? void 0 : a[0])) return String(e);
    const s = k(a[0]), o = i ? u(i[1] || "").trim() : "";
    return o ? `${s}
${o}` : s;
  }), t = t.replace(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/gi, (r) => k(r)), t = t.replace(/<div\b[^>]*\bdata-haim-wiki-image\b[^>]*>[\s\S]*?<\/div>/gi, (r) => {
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
  }), t = t.replace(/^\n+/, ""), _(t);
}
function g(n, t) {
  const r = new RegExp(`${t}="([^"]*)"`, "i").exec(n);
  return r ? w(r[1] || "") : "";
}
function k(n) {
  const t = g(n, "data-wiki-path");
  if (!t) return n;
  const r = g(n, "data-wiki-width") || null, e = g(n, "data-wiki-height") || null, a = g(n, "data-wiki-bg") || null, i = g(n, "data-wiki-options");
  return r || e || a ? H({ path: t, width: r, height: e, background: a }) : i ? `![[${t}|${i}]]` : `![[${t}]]`;
}
function q(n) {
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
    if (z(l)) {
      const f = l.trim();
      r.push(`${o}<figure data-haim-wiki-figure="1">${c}<figcaption>${D(f)}</figcaption></figure>`), a = p;
      continue;
    }
    r.push(i);
  }
  return r.join(`
`);
}
function z(n) {
  const t = String(n ?? "").trim();
  return !(!t || /^#{1,10}\s/.test(t) || /^```/.test(t) || /^!\[\[/.test(t) || /^</.test(t) || /^\|/.test(t) || /^>\s?/.test(t) || /^(-{3,}|\*{3,}|_{3,})\s*$/.test(t) || /^([-*+]|\d+[.)])\s+/.test(t) || /^\$\$/.test(t));
}
function D(n) {
  const t = String(n ?? "").trim();
  if (!t) return "";
  try {
    return O(t);
  } catch {
    return b(t);
  }
}
function u(n) {
  let t = String(n || "");
  return t = t.replace(/<br\s*\/?>/gi, `
`), t = t.replace(/<\/(p|div|h[1-6])>/gi, `
`), t = t.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (r, e, a) => {
    const i = String(e).match(/\bhref\s*=\s*"([^"]*)"/i) || String(e).match(/\bhref\s*=\s*'([^']*)'/i), s = i ? w(i[1] || "") : "", o = u(a).trim() || s;
    return s ? `[${o}](${s})` : o;
  }), t = t.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (r, e, a) => `**${u(a)}**`), t = t.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (r, e, a) => `*${u(a)}*`), t = t.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (r, e) => `\`${d(String(e))}\``), t = t.replace(/<[^>]+>/g, ""), d(t).replace(/\s+/g, " ").trim();
}
function F(n) {
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
function K(n) {
  return n.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "&#10;");
}
function w(n) {
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
function U(n, t = W) {
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
function G(n) {
  const { prefix: t, body: r } = v(n);
  let e = j(r);
  return /<!--\s*note-cover\b/i.test(t) && (e = `${y()}${e}`), { prefix: t, content: e };
}
function tt(n, t) {
  return n ? T(n, t, (r) => {
    const e = Y(V(r));
    return E(t, e);
  }) : t || "";
}
function Y(n) {
  let t = typeof n == "string" ? n : "";
  return t = t.replace(/^[ \t]*(?:&nbsp;|\u00A0)+[ \t]*$/gm, ""), t = t.replace(/(^|\n)[ \t]*&nbsp;[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/(^|\n)[ \t]*\u00A0+[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/\n{3,}/g, `

`), t;
}
function et(n, t, r, e) {
  const { prefix: a, content: i } = G(t);
  r.current = a, C(n), n.commands.setContent(i, { contentType: "markdown", emitUpdate: (e == null ? void 0 : e.emitUpdate) ?? false });
  try {
    U(n);
  } catch {
  }
  try {
    I(n, { skipSelectionBlock: false });
  } catch {
  }
}
export {
  Y as a,
  tt as e,
  G as m,
  j as p,
  V as r,
  et as s
};
