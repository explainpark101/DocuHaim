import { m as $ } from "./vendor-tiptap-Cwq5MbeS.js";
import { w as k, s as w, i as S, t as x, g as M, j as v, n as C } from "./style-C5R1jrH9.js";
import { aM as _, aN as y, aC as I } from "./index-BF8EnhwI.js";
const E = /(?:<!--\s*mermaid-size\b[\s\S]*?-->\s*)?```mermaid[^\n]*\n[\s\S]*?```/g, T = /<!--\s*haim-table\b[\s\S]*?-->\s*(?:\n\|[\s\S]*?(?:\n\n|$))?/g, A = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, R = /<!--\s*chat-with-myself\b[\s\S]*?-->[\s\S]*?(?=\n<!--|\n#{1,6}\s|\n*$)/g;
function d(e, t) {
  const a = t.replace(/\s+$/, "");
  return `<pre data-haim-raw-md="1" data-kind="${u(e)}">${f(a)}</pre>

`;
}
function H(e) {
  let t = typeof e == "string" ? e : "";
  t = t.replace(E, (n) => /<!--\s*mermaid-size\b/i.test(n) ? d("mermaid", n) : n), t = t.replace(T, (n) => d("haim-table", n)), t = t.replace(R, (n) => d("chat-saved-note", n));
  const a = A.exec(t);
  return (a == null ? void 0 : a[0]) && (t = d("plan-frontmatter", a[0]) + t.slice(a[0].length)), t = t.replace(/<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?/gi, "<pgbr/>"), t = t.replace(_, (n, i) => {
    const r = y(i);
    if (!(r == null ? void 0 : r.path)) return n;
    const s = String(i).trim(), c = s.lastIndexOf("|");
    let o = "";
    if (c >= 0) {
      const l = s.slice(0, c).trim(), p = s.slice(c + 1).trim();
      r.path === l && p && (o = p);
    }
    return k(r.path, o);
  }), t = P(t), t = t.replace(/^(#{7,10})\s+(.+)$/gm, (n, i, r) => `<h6 data-heading-level="${i.length}">${f(r)}</h6>`), t = t.replace(/\$\$([\s\S]+?)\$\$/g, (n, i) => {
    const r = String(i || "").trim();
    return r ? `<div data-type="block-math" data-latex="${u(r)}"></div>

` : n;
  }), t = t.replace(/\$(?!\d+\$)([^$\n]+?)\$(?!\d)/g, (n, i) => {
    const r = String(i || "").trim();
    return r ? `<span data-type="inline-math" data-latex="${u(r)}"></span>` : n;
  }), t;
}
function O(e) {
  let t = typeof e == "string" ? e : "";
  return t = t.replace(/<pre\b[^>]*\bdata-haim-raw-md\b[^>]*>([\s\S]*?)<\/pre>/gi, (a, n) => {
    const i = m(String(n || ""));
    return i.endsWith(`
`) ? i : `${i}
`;
  }), t = t.replace(/@@@haim-raw:([^\n]*)\n([\s\S]*?)\n@@@\/haim-raw/g, (a, n, i) => {
    const r = String(i || "");
    return r.endsWith(`
`) ? r : `${r}
`;
  }), t = N(t), t = t.replace(/<figure\b[^>]*\bdata-haim-wiki-figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (a, n) => {
    const i = String(n).match(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/i), r = String(n).match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
    if (!(i == null ? void 0 : i[0])) return String(n);
    const s = h(i[0]), c = r ? L(r[1] || "").trim() : "";
    return c ? `${s}
${c}` : s;
  }), t = t.replace(/<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>/gi, (a) => h(a)), t = t.replace(/<div\b[^>]*\bdata-haim-wiki-image\b[^>]*>[\s\S]*?<\/div>/gi, (a) => {
    const n = g(a, "data-wiki-path"), i = g(a, "data-wiki-options");
    return n ? i ? `![[${n}|${i}]]` : `![[${n}]]` : a;
  }), t = t.replace(/<div[^>]*data-haim-pgbr[^>]*>[\s\S]*?<\/div>/gi, "<pgbr/>"), t = t.replace(/<pgbr><\/pgbr>/gi, "<pgbr/>"), t = t.replace(/<pgbr\s*\/?\s*>/gi, "<pgbr/>"), t = t.replace(/<h6[^>]*data-heading-level="(\d+)"[^>]*>([\s\S]*?)<\/h6>/gi, (a, n, i) => {
    const r = Math.min(10, Math.max(7, Number(n) || 7)), s = m(String(i).replace(/<[^>]+>/g, "")).trim();
    return `${"#".repeat(r)} ${s}`;
  }), t = t.replace(/<div\b[^>]*\bdata-type=["']block-math["'][^>]*>[\s\S]*?<\/div>/gi, (a) => {
    const n = g(a, "data-latex");
    return n ? `$$
${n}
$$
` : a;
  }), t = t.replace(/<span\b[^>]*\bdata-type=["']inline-math["'][^>]*>[\s\S]*?<\/span>/gi, (a) => {
    const n = g(a, "data-latex");
    return n ? `$${n}$` : a;
  }), t = t.replace(/^\n+/, ""), t;
}
function g(e, t) {
  const a = new RegExp(`${t}="([^"]*)"`, "i").exec(e);
  return a ? B(a[1] || "") : "";
}
function h(e) {
  const t = g(e, "data-wiki-path");
  if (!t) return e;
  const a = g(e, "data-wiki-width") || null, n = g(e, "data-wiki-height") || null, i = g(e, "data-wiki-bg") || null, r = g(e, "data-wiki-options");
  return a || n || i ? I({ path: t, width: a, height: n, background: i }) : r ? `![[${t}|${r}]]` : `![[${t}]]`;
}
function P(e) {
  const t = e.split(`
`), a = [], n = /^(\s*)(<img\b[^>]*\bdata-wiki-path\b[^>]*\/?>)\s*$/i;
  for (let i = 0; i < t.length; i += 1) {
    const r = t[i] ?? "", s = n.exec(r);
    if (!s) {
      a.push(r);
      continue;
    }
    const c = s[1] ?? "", o = s[2] ?? "";
    let l = i + 1;
    l < t.length && String(t[l]).trim() === "" && (l += 1);
    const p = l < t.length ? String(t[l] ?? "") : "";
    if (W(p)) {
      const b = p.trim();
      a.push(`${c}<figure data-haim-wiki-figure="1">${o}<figcaption>${f(b)}</figcaption></figure>`), i = l;
      continue;
    }
    a.push(r);
  }
  return a.join(`
`);
}
function W(e) {
  const t = String(e ?? "").trim();
  return !(!t || /^#{1,10}\s/.test(t) || /^```/.test(t) || /^!\[\[/.test(t) || /^</.test(t) || /^\|/.test(t) || /^>\s?/.test(t) || /^(-{3,}|\*{3,}|_{3,})\s*$/.test(t) || /^([-*+]|\d+[.)])\s+/.test(t) || /^\$\$/.test(t));
}
function L(e) {
  let t = String(e || "");
  return t = t.replace(/<br\s*\/?>/gi, `
`), t = t.replace(/<\/(p|div|h[1-6])>/gi, `
`), t = t.replace(/<[^>]+>/g, ""), m(t).replace(/\s+/g, " ").trim();
}
function N(e) {
  const t = /<div\b[^>]*\bdata-note-cover-placeholder\b[^>]*>/gi;
  let a = "", n = 0, i;
  for (; i = t.exec(e); ) {
    const r = i.index;
    a += e.slice(n, r);
    const s = r + i[0].length;
    let c = 1, o = s;
    for (; o < e.length && c > 0; ) {
      const l = e.indexOf("<div", o), p = e.indexOf("</div>", o);
      if (p < 0) {
        o = e.length;
        break;
      }
      l >= 0 && l < p ? (c += 1, o = l + 4) : (c -= 1, o = p + 6);
    }
    n = o, t.lastIndex = o;
  }
  return a += e.slice(n), a;
}
function u(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function B(e) {
  return e.replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function f(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function m(e) {
  return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function j(e) {
  const { prefix: t, body: a } = w(e);
  let n = H(a);
  return /<!--\s*note-cover\b/i.test(t) && (n = `${C()}${n}`), { prefix: t, content: n };
}
function K(e, t) {
  if (!e) return t || "";
  const a = M(e), n = q(O(a));
  return v(t, n);
}
function q(e) {
  let t = typeof e == "string" ? e : "";
  return t = t.replace(/^[ \t]*(?:&nbsp;|\u00A0)+[ \t]*$/gm, ""), t = t.replace(/(^|\n)[ \t]*&nbsp;[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/(^|\n)[ \t]*\u00A0+[ \t]*(?=\n|$)/g, "$1"), t = t.replace(/\n{3,}/g, `

`), t;
}
function U(e, t, a, n) {
  const { prefix: i, content: r } = j(t);
  a.current = i, S(e), e.commands.setContent(r, { contentType: "markdown", emitUpdate: (n == null ? void 0 : n.emitUpdate) ?? false });
  try {
    $(e);
  } catch {
  }
  try {
    x(e, { skipSelectionBlock: false });
  } catch {
  }
}
export {
  K as e,
  j as m,
  U as s
};
