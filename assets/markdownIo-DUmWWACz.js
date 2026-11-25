import { w as _, r as v, s as E, i as I, t as T, a as O, n as y, j as R } from "./markdownCache-D5tPgoqs.js";
import { bb as A, bc as L, a9 as H } from "./index-DD9YmsNw.js";
import { renderAppMarkdownInline as N } from "./createAppMarkdownIt-qFGCrDsq.js";
import { m as B } from "./vendor-tiptap-rNZeEPKG.js";
const P = /<!--\s*chat-with-myself\b/i, W = /(?:^|\/)chat(?:\/)?(?:#|%23)msg-/i;
function j(i) {
  return !String(i ?? "").trim();
}
function w(i) {
  return /^\s{0,3}>/.test(String(i ?? ""));
}
function q(i) {
  const t = String(i ?? "").trim(), e = /^\[([^\]]*)\]\(([^)\s]+)\)$/.exec(t);
  if (!e) return false;
  const n = e[2] || "";
  return W.test(n) || /#msg-/.test(n);
}
function S(i, t) {
  let e = t;
  for (; e < i.length; ) {
    const n = i.indexOf(`
`, e), r = n < 0 ? i.length : n, a = i.slice(e, r);
    if (!j(a)) return e;
    e = n < 0 ? i.length : n + 1;
  }
  return e;
}
function F(i, t = 0) {
  const e = String(i ?? ""), n = e.slice(t), r = P.exec(n);
  if (!r) return null;
  const a = t + r.index, o = a + r[0].length, l = e.indexOf("-->", o);
  if (l < 0) return null;
  let s = l + 3;
  if (s = S(e, s), s < e.length) {
    const c = e.indexOf(`
`, s), p = e.slice(s, c < 0 ? e.length : c);
    if (w(p)) {
      for (; s < e.length; ) {
        const g = e.indexOf(`
`, s), f = g < 0 ? e.length : g, b = e.slice(s, f);
        if (!w(b)) break;
        s = g < 0 ? e.length : g + 1;
      }
      s = S(e, s);
    }
  }
  if (s < e.length) {
    const c = e.indexOf(`
`, s), p = c < 0 ? e.length : c, g = e.slice(s, p);
    q(g) && (s = c < 0 ? e.length : c, c >= 0 && (s = c + 1));
  }
  return { start: a, end: s };
}
function K(i, t) {
  const e = String(i ?? "");
  let n = "", r = 0;
  for (; r < e.length; ) {
    const a = F(e, r);
    if (!a) {
      n += e.slice(r);
      break;
    }
    n += e.slice(r, a.start), n += t(e.slice(a.start, a.end)), r = a.end;
  }
  return n;
}
const z = /(?:<!--\s*mermaid-size\b[\s\S]*?-->\s*)?```mermaid[^\n]*\n[\s\S]*?```/g, U = /<!--\s*haim-table\b[\s\S]*?-->\s*(?:\n\|[\s\S]*?(?:\n\n|$))?/g, V = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/;
function d(i, t) {
  const e = t.replace(/\s+$/, "");
  return `<pre data-haim-raw-md="1" data-kind="${Z(i)}">${$(e)}</pre>

`;
}
function D(i) {
  let t = typeof i == "string" ? i : "";
  t = t.replace(z, (n) => /<!--\s*mermaid-size\b/i.test(n) ? d("mermaid", n) : n), t = t.replace(U, (n) => d("haim-table", n)), t = K(t, (n) => d("chat-saved-note", n));
  const e = V.exec(t);
  return (e == null ? void 0 : e[0]) && (t = d("plan-frontmatter", e[0]) + t.slice(e[0].length)), t = t.replace(/<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?/gi, "<pgbr/>"), t = t.replace(A, (n, r) => {
    const a = L(r);
    if (!(a == null ? void 0 : a.path)) return n;
    const o = String(r).trim(), l = o.lastIndexOf("|");
    let s = "";
    if (l >= 0) {
      const c = o.slice(0, l).trim(), p = o.slice(l + 1).trim();
      a.path === c && p && (s = p);
    }
    return _(a.path, s);
  }), t = J(t), t = t.replace(/^(#{7,10})\s+(.+)$/gm, (n, r, a) => `<h6 data-heading-level="${r.length}">${$(a)}</h6>`), t;
}
function G(i) {
  let t = typeof i == "string" ? i : "";
  return t = t.replace(/<pre\b[^>]*\bdata-haim-raw-md\b[^>]*>([\s\S]*?)<\/pre>/gi, (e, n) => {
    const r = h(String(n || ""));
    return r.endsWith(`
`) ? r : `${r}
`;
  }), t = t.replace(/@@@haim-raw:([^\n]*)\n([\s\S]*?)\n@@@\/haim-raw/g, (e, n, r) => {
    const a = String(r || "");
    return a.endsWith(`
`) ? a : `${a}
`;
  }), t = Y(t), t = t.replace(/<figure\b[^>]*\bdata-haim-wiki-figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (e, n) => {
    const r = String(n).match(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/i), a = String(n).match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
    if (!(r == null ? void 0 : r[0])) return String(n);
    const o = x(r[0]), l = a ? m(a[1] || "").trim() : "";
    return l ? `${o}
${l}` : o;
  }), t = t.replace(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/gi, (e) => x(e)), t = t.replace(/<div\b[^>]*\bdata-haim-wiki-image\b[^>]*>[\s\S]*?<\/div>/gi, (e) => {
    const n = u(e, "data-wiki-path"), r = u(e, "data-wiki-options");
    return n ? r ? `![[${n}|${r}]]` : `![[${n}]]` : e;
  }), t = t.replace(/<div[^>]*data-haim-pgbr[^>]*>[\s\S]*?<\/div>/gi, "<pgbr/>"), t = t.replace(/<pgbr><\/pgbr>/gi, "<pgbr/>"), t = t.replace(/<pgbr\s*\/?\s*>/gi, "<pgbr/>"), t = t.replace(/<h6[^>]*data-heading-level="(\d+)"[^>]*>([\s\S]*?)<\/h6>/gi, (e, n, r) => {
    const a = Math.min(10, Math.max(7, Number(n) || 7)), o = h(String(r).replace(/<[^>]+>/g, "")).trim();
    return `${"#".repeat(a)} ${o}`;
  }), t = t.replace(/<div\b[^>]*\bdata-type=["']block-math["'][^>]*>[\s\S]*?<\/div>/gi, (e) => {
    const n = u(e, "data-latex");
    return n ? `$$
${n}
$$
` : e;
  }), t = t.replace(/<span\b[^>]*\bdata-type=["']inline-math["'][^>]*>[\s\S]*?<\/span>/gi, (e) => {
    const n = u(e, "data-latex");
    return n ? `$${n}$` : e;
  }), t = t.replace(/^\n+/, ""), v(t);
}
function u(i, t) {
  const e = new RegExp(`${t}="([^"]*)"`, "i").exec(i);
  return e ? M(e[1] || "") : "";
}
function x(i) {
  const t = u(i, "data-wiki-path");
  if (!t) return i;
  const e = u(i, "data-wiki-width") || null, n = u(i, "data-wiki-height") || null, r = u(i, "data-wiki-bg") || null, a = u(i, "data-wiki-options");
  return e || n || r ? H({ path: t, width: e, height: n, background: r }) : a ? `![[${t}|${a}]]` : `![[${t}]]`;
}
function J(i) {
  const t = i.split(`
`), e = [], n = /^(\s*)(<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>)\s*$/i;
  for (let r = 0; r < t.length; r += 1) {
    const a = t[r] ?? "", o = n.exec(a);
    if (!o) {
      e.push(a);
      continue;
    }
    const l = o[1] ?? "", s = o[2] ?? "";
    let c = r + 1;
    c < t.length && String(t[c]).trim() === "" && (c += 1);
    const p = c < t.length ? String(t[c] ?? "") : "";
    if (Q(p)) {
      const g = p.trim();
      e.push(`${l}<figure data-haim-wiki-figure="1">${s}<figcaption>${X(g)}</figcaption></figure>`), r = c;
      continue;
    }
    e.push(a);
  }
  return e.join(`
`);
}
function Q(i) {
  const t = String(i ?? "").trim();
  return !(!t || /^#{1,10}\s/.test(t) || /^```/.test(t) || /^!\[\[/.test(t) || /^</.test(t) || /^\|/.test(t) || /^>\s?/.test(t) || /^(-{3,}|\*{3,}|_{3,})\s*$/.test(t) || /^([-*+]|\d+[.)])\s+/.test(t) || /^\$\$/.test(t));
}
function X(i) {
  const t = String(i ?? "").trim();
  if (!t) return "";
  try {
    return N(t);
  } catch {
    return $(t);
  }
}
function m(i) {
  let t = String(i || "");
  return t = t.replace(/<br\s*\/?>/gi, `
`), t = t.replace(/<\/(p|div|h[1-6])>/gi, `
`), t = t.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (e, n, r) => {
    const a = String(n).match(/\bhref\s*=\s*"([^"]*)"/i) || String(n).match(/\bhref\s*=\s*'([^']*)'/i), o = a ? M(a[1] || "") : "", l = m(r).trim() || o;
    return o ? `[${l}](${o})` : l;
  }), t = t.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (e, n, r) => `**${m(r)}**`), t = t.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (e, n, r) => `*${m(r)}*`), t = t.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (e, n) => `\`${h(String(n))}\``), t = t.replace(/<[^>]+>/g, ""), h(t).replace(/\s+/g, " ").trim();
}
function Y(i) {
  const t = /<div\b[^>]*\bdata-note-cover-placeholder\b[^>]*>/gi;
  let e = "", n = 0, r;
  for (; r = t.exec(i); ) {
    const a = r.index;
    e += i.slice(n, a);
    const o = a + r[0].length;
    let l = 1, s = o;
    for (; s < i.length && l > 0; ) {
      const c = i.indexOf("<div", s), p = i.indexOf("</div>", s);
      if (p < 0) {
        s = i.length;
        break;
      }
      c >= 0 && c < p ? (l += 1, s = c + 4) : (l -= 1, s = p + 6);
    }
    n = s, t.lastIndex = s;
  }
  return e += i.slice(n), e;
}
function Z(i) {
  return i.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "&#10;");
}
function M(i) {
  return i.replace(/&#10;/g, `
`).replace(/&#x0*a;/gi, `
`).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function $(i) {
  return i.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function h(i) {
  return i.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function tt(i, t = B) {
  const { inlineMath: e } = i.schema.nodes;
  if (!e) return;
  const n = i.state.tr;
  n.doc.descendants((r, a) => {
    if (!r.isText || !r.text || !r.text.includes("$") || r.marks.some((s) => s.type.name === "code")) return;
    const { text: o } = r, l = o.match(t);
    if (l) for (const s of l) {
      const c = o.indexOf(s);
      if (c < 0) continue;
      const p = c + s.length, g = n.mapping.map(a + c), f = n.doc.resolve(g);
      if (f.parent.type.name === "codeBlock") return;
      const b = f.parent, k = f.index();
      if (!b.canReplaceWith(k, k + 1, e)) return;
      const C = s.slice(1, -1);
      n.replaceWith(n.mapping.map(a + c), n.mapping.map(a + p), e.create({ latex: C }));
    }
  }), n.setMeta("addToHistory", false), n.docChanged && i.view.dispatch(n);
}
function et(i) {
  const { prefix: t, body: e } = E(i);
  let n = D(e);
  return /<!--\s*note-cover\b/i.test(t) && (n = `${y()}${n}`), { prefix: t, content: n };
}
function ct(i, t) {
  return i ? O(i, t, (e) => {
    const n = nt(G(e));
    return R(t, n);
  }) : t || "";
}
function nt(i) {
  let t = typeof i == "string" ? i : "";
  return t = t.replace(/^[ \t]*(?:&nbsp;|\u00A0)+[ \t]*$/gm, ""), t = t.replace(/(^|\n)[ \t]*&nbsp;[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/(^|\n)[ \t]*\u00A0+[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/\n{3,}/g, `

`), t;
}
function ot(i, t, e, n) {
  const { prefix: r, content: a } = et(t);
  e.current = r, I(i), i.commands.setContent(a, { contentType: "markdown", emitUpdate: (n == null ? void 0 : n.emitUpdate) ?? false });
  try {
    tt(i);
  } catch {
  }
  try {
    T(i, { skipSelectionBlock: false });
  } catch {
  }
}
export {
  nt as a,
  ct as e,
  et as m,
  D as p,
  G as r,
  ot as s
};
