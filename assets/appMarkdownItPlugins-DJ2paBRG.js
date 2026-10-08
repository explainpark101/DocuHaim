import { N as Ee } from "./vendor-md-editor-X93Ii6bV.js";
import { e6 as Ce, aW as W, e7 as Te, t as Pe, e8 as Le, x as Re, w as q, y as R, z as O, aU as Oe, e9 as K, a5 as He, a7 as X, ea as ze, eb as Ne, ec as Be, ed as U, ee as Y, ef as Fe, aS as I, eg as je } from "./index-CSFc8FdZ.js";
import { p as De } from "./wikiImageResolver-DO8anhS8.js";
import { t as Ge, p as We, E as T, r as qe, n as Ke } from "./emojiShortcode-d5Fgeg8O.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import { e as Xe, r as Ue } from "./styleResolve-dKeEaMKb.js";
import { r as Ye } from "./mermaidTheme-Deyx0OD8.js";
const Ve = /^<!--\s*haim-table\b/;
function H(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : Ve.test(String(e.content || "").trim());
}
function Ze(e) {
  const t = /<!--\s*haim-table\s*([\s\S]*?)-->/.exec(e);
  return t ? Te(t[1] ?? "") ?? W() : W();
}
function Qe(e, t) {
  var _a, _b;
  for (let n = t; n < Math.min(e.length, t + 8); n += 1) {
    if (((_a = e[n]) == null ? void 0 : _a.type) === "table_open") {
      for (let r = n + 1; r < e.length; r += 1) if (((_b = e[r]) == null ? void 0 : _b.type) === "table_close") return { start: n, end: r };
      return null;
    }
    const i = e[n];
    if (i && !(i.type === "paragraph_open" || i.type === "paragraph_close") && !(i.type === "inline" && !String(i.content || "").trim()) && !(i.type === "html_block" || i.type === "html_inline") && !i.hidden && i.type !== "table_open") return null;
  }
  return null;
}
function Je(e, t, n) {
  const i = [];
  let r = t + 1;
  for (; r < n; ) {
    const s = e[r];
    if (!s) break;
    if (s.type === "tr_open") {
      const o = { openIdx: r, closeIdx: -1, cells: [] };
      for (r += 1; r < n; ) {
        const a = e[r];
        if (!a) break;
        if (a.type === "tr_close") {
          o.closeIdx = r, r += 1;
          break;
        }
        if (a.type === "th_open" || a.type === "td_open") {
          const l = r;
          let c = -1, u = -1;
          for (r += 1; r < n; ) {
            const d = e[r];
            if (!d) break;
            if (d.type === "inline" && (c = r), d.type === "th_close" || d.type === "td_close") {
              u = r, r += 1;
              break;
            }
            r += 1;
          }
          u >= 0 && o.cells.push({ openIdx: l, closeIdx: u, inlineIdx: c });
          continue;
        }
        r += 1;
      }
      i.push(o);
      continue;
    }
    r += 1;
  }
  return i;
}
function et(e, t, n, i, r, s) {
  var _a, _b;
  const o = e.tokens, a = Je(o, n, i);
  if (!a.length) {
    o[t] && (o[t].hidden = true, o[t].content = "");
    return;
  }
  const l = a.length, c = Math.max(1, ...a.map((h) => h.cells.length)), u = Pe(r.merges), d = Xe(r, l), m = Math.min(Math.max(0, r.footerRows), Math.max(0, l - d));
  (_a = o[n]) == null ? void 0 : _a.attrSet("data-haim-table", "1"), r.noHeader && ((_b = o[n]) == null ? void 0 : _b.attrSet("data-haim-no-header", "1")), o[n] && Le((h, b) => o[n].attrSet(h, b), r, o[n].attrGet("style"));
  for (let h = 0; h < a.length; h += 1) {
    const b = a[h];
    for (let p = 0; p < b.cells.length; p += 1) {
      const x = b.cells[p], S = o[x.openIdx];
      if (!S) continue;
      if (u.has(`${h},${p}`)) {
        S.hidden = true, x.inlineIdx >= 0 && o[x.inlineIdx] && (o[x.inlineIdx].hidden = true), o[x.closeIdx] && (o[x.closeIdx].hidden = true);
        continue;
      }
      const v = Re(r.merges, h, p);
      v && (v.colspan > 1 && S.attrSet("colspan", String(v.colspan)), v.rowspan > 1 && S.attrSet("rowspan", String(v.rowspan)));
      const $e = Ue({ row: h, col: p, rowCount: l, colCount: c, meta: r, template: s });
      let $ = q($e);
      const D = R(r.colWidths, p);
      D && ($ = O($, `width:${D}`));
      const G = R(r.rowHeights, h);
      G && ($ = O($, `height:${G}`)), $ && S.attrSet("style", $), S.attrSet("data-haim-r", String(h)), S.attrSet("data-haim-c", String(p));
    }
    const g = R(r.rowHeights, h);
    if (g && o[b.openIdx]) {
      const p = o[b.openIdx];
      p.attrSet("style", O(p.attrGet("style"), `height:${g}`));
    }
  }
  const f = a.slice(0, d), w = a.slice(d, l - m), y = m > 0 ? a.slice(l - m) : [];
  for (const h of f) for (const b of h.cells) {
    const g = o[b.openIdx], p = o[b.closeIdx];
    g && (g.tag = "th", g.type = "th_open"), p && (p.tag = "th", p.type = "th_close");
  }
  for (const h of [...w, ...y]) for (const b of h.cells) {
    const g = o[b.openIdx], p = o[b.closeIdx];
    g && (g.tag = "td", g.type = "td_open"), p && (p.tag = "td", p.type = "td_close");
  }
  const k = [], M = (h, b) => {
    if (!b.length) return;
    const g = new e.Token(`${h}_open`, h, 1), p = q(r.sections[h] ?? {}, { includeOuterBorder: true });
    p && g.attrSet("style", p), g.attrSet("data-haim-section", h), k.push(g);
    for (const x of b) for (let S = x.openIdx; S <= x.closeIdx; S += 1) {
      const v = o[S];
      v && k.push(v);
    }
    k.push(new e.Token(`${h}_close`, h, -1));
  };
  M("thead", f), M("tbody", w), M("tfoot", y);
  const _ = [...o.slice(0, n + 1), ...k, ...o.slice(i)];
  if (t >= 0 && t < _.length && H(_[t])) _[t].hidden = true, _[t].content = "";
  else for (const h of _) H(h) && (h.hidden = true, h.content = "");
  e.tokens.length = 0, e.tokens.push(..._);
}
function tt(e) {
  e.core.ruler.after("block", "haim_table", (t) => {
    for (let n = 0; n < 50; n += 1) {
      let i = null;
      for (let s = 0; s < t.tokens.length; s += 1) {
        const o = t.tokens[s];
        if (!o || !H(o) || o.hidden) continue;
        const a = Ze(o.content), l = Qe(t.tokens, s + 1);
        if (l) {
          i = { commentIdx: s, tableStart: l.start, tableEnd: l.end, meta: a };
          break;
        }
      }
      if (!i) break;
      const r = i.meta.templateId ? Ce(i.meta.templateId) : null;
      et(t, i.commentIdx, i.tableStart, i.tableEnd, i.meta, r);
    }
  });
}
const V = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
function Z(e) {
  const t = De(e);
  return !t || t.startsWith("blob:") || t.startsWith("data:") ? V : t;
}
function Q(e) {
  return e ? [e[0], e[1]] : null;
}
function nt(e) {
  const t = /!\[\[([^[\]]+)\]\]/g;
  e.core.ruler.push("wiki-image", (n) => {
    n.src && /!\[\[/.test(n.src), n.tokens.forEach((i) => {
      if (i.type !== "inline" || !i.children) return;
      const r = [];
      i.children.forEach((s) => {
        if (s.type !== "text") {
          r.push(s);
          return;
        }
        const o = s.content;
        let a = 0;
        t.lastIndex = 0;
        let l;
        for (; (l = t.exec(o)) !== null; ) {
          if (l.index > a) {
            const f = new n.Token("text", "", 0);
            f.content = o.slice(a, l.index), r.push(f);
          }
          const c = Oe(l[1]), u = c == null ? void 0 : c.path;
          if (!u) {
            const f = new n.Token("text", "", 0);
            f.content = l[0], r.push(f), a = l.index + l[0].length;
            continue;
          }
          const d = new n.Token("wiki_image", "img", 0);
          d.attrSet("data-wiki-path", u), (c == null ? void 0 : c.width) && d.attrSet("data-wiki-width", c.width), (c == null ? void 0 : c.height) && d.attrSet("data-wiki-height", c.height), (c == null ? void 0 : c.background) && d.attrSet("data-wiki-bg", c.background);
          const m = K(c ?? {});
          m && d.attrSet("style", m), d.attrSet("src", Z(u)), d.attrSet("alt", ""), r.push(d), a = l.index + l[0].length;
        }
        if (a < o.length) {
          const c = new n.Token("text", "", 0);
          c.content = o.slice(a), r.push(c);
        }
      }), r.length, i.children.length, i.children = r;
    });
  }), e.core.ruler.after("wiki-image", "wiki-image-caption-inline", (n) => {
    const i = n.tokens;
    if (!i || i.length < 3) return;
    const r = [];
    let s = false;
    for (let o = 0; o < i.length; o += 1) {
      const a = i[o], l = i[o + 1], c = i[o + 2];
      if (!a || !l || !c) {
        a && r.push(a);
        continue;
      }
      if (a.type !== "paragraph_open" || l.type !== "inline" || c.type !== "paragraph_close") {
        r.push(a);
        continue;
      }
      const u = l.children || [];
      if (u.length < 3) {
        r.push(a);
        continue;
      }
      const d = u[0], m = u[1], f = m != null && (m.type === "softbreak" || m.type === "hardbreak");
      if (!d || d.type !== "wiki_image" || !f) {
        r.push(a);
        continue;
      }
      const w = u.slice(2);
      if (!w.some((p) => p.type === "text" && p.content && p.content.trim())) {
        r.push(a);
        continue;
      }
      const k = new n.Token("figure_open", "figure", 1);
      k.block = true, k.map = Q(a.map);
      const M = new n.Token("inline", "", 0);
      M.children = [d], M.level = (a.level || 0) + 1;
      const _ = new n.Token("figcaption_open", "figcaption", 1);
      _.block = true, _.level = (a.level || 0) + 1;
      const h = new n.Token("inline", "", 0);
      h.children = w, h.level = (a.level || 0) + 2;
      const b = new n.Token("figcaption_close", "figcaption", -1);
      b.block = true, b.level = (a.level || 0) + 1;
      const g = new n.Token("figure_close", "figure", -1);
      g.block = true, g.level = a.level || 0, r.push(k, M, _, h, b, g), s = true, o += 2;
    }
    s && (n.tokens = r);
  }), e.core.ruler.after("wiki-image-caption-inline", "wiki-image-caption", (n) => {
    const i = n.tokens;
    if (!i || i.length < 6) return;
    const r = [];
    let s = false;
    for (let o = 0; o < i.length; o += 1) {
      const a = i[o], l = i[o + 1], c = i[o + 2], u = i[o + 3], d = i[o + 4], m = i[o + 5];
      if (!(a != null && l != null && c != null && u != null && d != null && m != null && a.type === "paragraph_open" && l.type === "inline" && c.type === "paragraph_close" && u.type === "paragraph_open" && d.type === "inline" && m.type === "paragraph_close") || !a || !l || !d) {
        a && r.push(a);
        continue;
      }
      const w = l.children || [], y = w[0];
      if (w.length !== 1 || !y || y.type !== "wiki_image") {
        r.push(a);
        continue;
      }
      const k = d.children || [];
      if (!k.some((S) => S.type === "text" && S.content && S.content.trim())) {
        r.push(a);
        continue;
      }
      const _ = new n.Token("figure_open", "figure", 1);
      _.block = true, _.map = Q(a.map);
      const h = new n.Token("inline", "", 0);
      h.children = w, h.level = (a.level || 0) + 1;
      const b = new n.Token("figcaption_open", "figcaption", 1);
      b.block = true, b.level = (a.level || 0) + 1;
      const g = new n.Token("inline", "", 0);
      g.children = k, g.level = (a.level || 0) + 2;
      const p = new n.Token("figcaption_close", "figcaption", -1);
      p.block = true, p.level = (a.level || 0) + 1;
      const x = new n.Token("figure_close", "figure", -1);
      x.block = true, x.level = a.level || 0, r.push(_, h, b, g, p, x), s = true, o += 5;
    }
    s && (n.tokens = r);
  }), e.core.ruler.after("wiki-image-caption", "markdown-image-size-attrs", (n) => {
    n.tokens.forEach((i) => {
      var _a;
      if (i.type !== "inline" || !((_a = i.children) == null ? void 0 : _a.length)) return;
      const r = [], s = i.children;
      for (let o = 0; o < s.length; o += 1) {
        const a = s[o];
        if (!a) continue;
        if (a.type !== "image") {
          r.push(a);
          continue;
        }
        const l = a.attrGet("src"), c = l == null ? null : String(l);
        if (c && a.attrSet("data-md-src", c), c && He(X(c))) {
          const d = X(c);
          a.attrSet("src", Z(d)), a.attrSet("data-storage-image", "1");
        }
        const u = s[o + 1];
        if ((u == null ? void 0 : u.type) === "text") {
          const d = u.content || "", m = d.match(/^\{([^}\n]+)\}/);
          if (m) {
            const f = ze(`{${m[1]}}`);
            f.width && a.attrSet("data-md-width", f.width), f.height && a.attrSet("data-md-height", f.height), f.background && a.attrSet("data-md-bg", f.background);
            const w = K(f);
            w && a.attrSet("style", w);
            const y = d.slice(m[0].length);
            if (y) {
              const k = new n.Token("text", "", 0);
              k.content = y, r.push(a, k);
            } else r.push(a);
            o += 1;
            continue;
          }
        }
        r.push(a);
      }
      i.children = r;
    });
  }), e.renderer.rules.wiki_image = (n, i, r, s, o) => {
    const a = n[i];
    return a ? `<img ${o.renderAttrs(a)}>` : "";
  };
}
function rt(e) {
  const t = e.renderer.rules.link_open || function(i, r, s, o, a) {
    return a.renderToken(i, r, s);
  };
  e.renderer.rules.link_open = function(i, r, s, o, a) {
    const l = i[r];
    if (!l) return t(i, r, s, o, a);
    const c = l.attrGet("href") || "";
    return !(l.attrGet("data-chat-saved-note") === "1") && Ne(c) && (l.attrSet("target", "_blank"), l.attrSet("rel", "noopener noreferrer")), t(i, r, s, o, a);
  };
}
const P = /<pgbr\s*\/?\s*>/gi;
function F(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function it(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function J(e) {
  const t = new e.Token("html_inline", "", 0);
  return t.content = '<span class="md-pgbr" data-md-pgbr="1"></span>', t;
}
const he = /<span class="md-pgbr"/;
function pe(e) {
  let t = 0;
  for (const n of e.children || []) n.type === "html_inline" && (he.test(n.content) || F(n.content)) && (t += 1);
  return t;
}
function at(e) {
  var _a;
  if (e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  for (const t of e.children) if (!(t.type === "softbreak" || t.type === "hardbreak") && !(t.type === "text" && !t.content.trim()) && !(t.type === "html_inline" && (he.test(t.content) || F(t.content)))) return false;
  return pe(e) > 0;
}
function ee(e) {
  const t = new e.Token("html_block", "", 0);
  return t.content = '<div class="md-pgbr" data-md-pgbr="1"></div>', t.block = true, t;
}
function ot(e, t) {
  if (!(t == null ? void 0 : t.length)) return t;
  const n = [];
  for (const i of t) {
    if (i.type === "html_inline" && F(i.content)) {
      n.push(J(e));
      continue;
    }
    if (i.type !== "text") {
      n.push(i);
      continue;
    }
    const r = i.content;
    if (P.lastIndex = 0, !P.test(r)) {
      n.push(i);
      continue;
    }
    let s = 0;
    P.lastIndex = 0;
    let o;
    for (; (o = P.exec(r)) !== null; ) {
      if (o.index > s) {
        const a = new e.Token("text", "", 0);
        a.content = r.slice(s, o.index), n.push(a);
      }
      n.push(J(e)), s = o.index + o[0].length;
    }
    if (s < r.length) {
      const a = new e.Token("text", "", 0);
      a.content = r.slice(s), n.push(a);
    }
  }
  return n;
}
function st(e) {
  e.core.ruler.push("pgbr-mark", (t) => (t.tokens.forEach((n) => {
    n.type !== "inline" || !n.children || (n.children = ot(t, n.children));
  }), true)), e.core.ruler.after("pgbr-mark", "pgbr-unwrap-paragraph", (t) => {
    const { tokens: n } = t, i = [];
    let r = 0;
    for (; r < n.length; ) {
      if (r + 2 < n.length && n[r].type === "paragraph_open" && n[r + 1].type === "inline" && n[r + 2].type === "paragraph_close" && at(n[r + 1])) {
        const s = pe(n[r + 1]);
        for (let o = 0; o < s; o += 1) i.push(ee(t));
        r += 3;
        continue;
      }
      i.push(n[r]), r += 1;
    }
    return t.tokens = i, true;
  }), e.core.ruler.after("pgbr-unwrap-paragraph", "pgbr-normalize-html-block", (t) => (t.tokens = t.tokens.map((n) => n.type === "html_block" && it(n.content) ? ee(t) : n), true));
}
const lt = /<!--\s*chat-with-myself\s+[^>]*?-->/i, te = /(?:^|\/)chat(?:\/)?(?:#|%23)msg-/i, ct = /채팅으로\s*이동|채팅에서\s*저장된\s*노트/;
function ne(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function me(e) {
  return lt.test(e || "") ? Be(e) : null;
}
function dt(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : !!me(e.content);
}
function ut(e, t) {
  var _a;
  if (((_a = e[t]) == null ? void 0 : _a.type) !== "blockquote_open") return -1;
  let n = 0;
  for (let i = t; i < e.length; i += 1) {
    const r = e[i];
    if (r.type === "blockquote_open") n += 1;
    else if (r.type === "blockquote_close" && (n -= 1, n === 0)) return i + 1;
  }
  return -1;
}
function ht(e) {
  var _a;
  if (!e || e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  let t = "", n = "", i = false;
  for (const r of e.children) if (!(r.type === "softbreak" || r.type === "hardbreak") && !(r.type === "text" && !String(r.content || "").trim())) {
    if (r.type === "link_open") {
      if (i) return false;
      i = true, t = r.attrGet("href") || "";
      continue;
    }
    if (r.type === "text" && i && !n) {
      n = r.content || "";
      continue;
    }
    if (r.type !== "link_close") return false;
  }
  return !(!i || !te.test(t) && !/#msg-/.test(t) || n && !ct.test(n) && !te.test(t) && !/#msg-/.test(t));
}
function pt(e, t) {
  var _a, _b, _c;
  return ((_a = e[t]) == null ? void 0 : _a.type) !== "paragraph_open" || ((_b = e[t + 1]) == null ? void 0 : _b.type) !== "inline" || ((_c = e[t + 2]) == null ? void 0 : _c.type) !== "paragraph_close" || !ht(e[t + 1]) ? -1 : t + 3;
}
function mt(e) {
  const t = ne(e.href || "/chat"), n = ne(e.id || "");
  return [`<a class="md-chat-saved-note" href="${t}" data-chat-saved-note="1" data-chat-href="${t}" data-chat-id="${n}">`, '<span class="md-chat-saved-note__icon" aria-hidden="true"></span>', '<span class="md-chat-saved-note__body">', '<span class="md-chat-saved-note__title">\uCC44\uD305\uC5D0\uC11C \uC800\uC7A5\uB41C \uB178\uD2B8</span>', '<span class="md-chat-saved-note__hint">\uD0ED\uD558\uC5EC \uC6D0\uBCF8 \uCC44\uD305\uC73C\uB85C \uC774\uB3D9</span>', "</span>", '<span class="md-chat-saved-note__arrow" aria-hidden="true">\u2192</span>', "</a>"].join("");
}
function ft(e) {
  e.core.ruler.after("inline", "chat-saved-note", (t) => {
    const { tokens: n } = t;
    if (!(n == null ? void 0 : n.length)) return;
    const i = [];
    let r = 0;
    for (; r < n.length; ) {
      if (!dt(n[r])) {
        i.push(n[r]), r += 1;
        continue;
      }
      const s = me(n[r].content);
      let o = r + 1;
      const a = ut(n, o);
      a > o && (o = a);
      const l = pt(n, o);
      l > o && (o = l);
      const c = new t.Token("html_block", "", 0);
      c.content = mt(s), c.block = true, i.push(c), r = o;
    }
    t.tokens = i;
  });
}
function re(e) {
  return e === 9 || e === 32;
}
function gt(e, t, n, i) {
  let r = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return false;
  let o = e.src.charCodeAt(r);
  if (o !== 35 || r >= s) return false;
  let a = 1;
  for (o = e.src.charCodeAt(++r); o === 35 && r < s && a < U; ) a += 1, o = e.src.charCodeAt(++r);
  if (a > U || r < s && !re(o)) return false;
  if (i) return true;
  s = e.skipSpacesBack(s, r);
  const l = e.skipCharsBack(s, 35, r);
  l > r && re(e.src.charCodeAt(l - 1)) && (s = l), e.line = t + 1;
  const c = "#".repeat(a), u = a <= Y ? `h${a}` : "h6", d = e.push("heading_open", u, 1);
  d.markup = c, d.map = [t, e.line], a > Y && (d.attrSet("data-heading-level", String(a)), d.attrSet("class", `md-heading md-heading-${a}`));
  const m = e.push("inline", "", 0);
  m.content = e.src.slice(r, s).trim(), m.map = [t, e.line], m.children = [];
  const f = e.push("heading_close", u, -1);
  return f.markup = c, true;
}
function j(e) {
  e.block.ruler.at("heading", gt);
}
const ie = /^---[ \t]*\r?\n/;
function bt(e) {
  const t = String(e ?? "");
  if (!ie.test(t)) return null;
  const n = t.replace(ie, ""), i = n.match(/\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!i || i.index == null) return null;
  const r = n.slice(0, i.index), s = t.length - n.length + i.index + i[0].length;
  return { yaml: r, bodyOffset: s };
}
function A(e) {
  if (typeof e != "string") return null;
  const t = e.trim();
  return t || null;
}
function wt(e) {
  const t = String(e ?? "").trim().toLowerCase().replace(/_/g, "-");
  return t === "completed" || t === "complete" || t === "done" ? "completed" : t === "in-progress" || t === "inprogress" || t === "progress" ? "in_progress" : t === "cancelled" || t === "canceled" ? "cancelled" : t === "error" || t === "failed" || t === "fail" ? "error" : "pending";
}
function kt(e, t) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const n = e, i = A(n.content) ?? A(n.title);
  return i ? { id: A(n.id) ?? `todo-${t + 1}`, content: i, status: wt(n.status) } : null;
}
function _t(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return false;
  const t = e;
  return !(!Array.isArray(t.todos) || t.name != null && typeof t.name != "string" && typeof t.name != "number");
}
function yt(e) {
  let t;
  try {
    t = Fe(String(e ?? ""));
  } catch {
    return null;
  }
  if (!_t(t)) return null;
  const n = [];
  for (let o = 0; o < t.todos.length; o += 1) {
    const a = kt(t.todos[o], o);
    a && n.push(a);
  }
  const i = A(t.name) ?? A(t.title) ?? "Plan", r = A(t.overview) ?? A(t.description) ?? "", s = t.isProject === true || t.is_project === true;
  return { name: i, overview: r, todos: n, isProject: s };
}
function C(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const xt = { pending: "Pending", in_progress: "In progress", completed: "Completed", cancelled: "Cancelled", error: "Error" };
function St(e) {
  const t = e.status, n = xt[t];
  return [`<li class="md-plan-frontmatter__todo md-plan-frontmatter__todo--${t}" data-status="${t}">`, `<span class="md-plan-frontmatter__icon md-plan-frontmatter__icon--${t}" aria-hidden="true"></span>`, '<span class="md-plan-frontmatter__todo-body">', `<span class="md-plan-frontmatter__todo-content">${C(e.content)}</span>`, `<span class="md-plan-frontmatter__status-label">${C(n)}</span>`, "</span>", "</li>"].join("");
}
function Mt(e) {
  const t = e.todos.filter((a) => a.status === "completed").length, n = e.todos.length, i = n > 0 ? `${t}/${n}` : "0/0", r = e.isProject ? '<span class="md-plan-frontmatter__badge" data-md-plan-project="1">Project</span>' : "", s = e.overview ? `<p class="md-plan-frontmatter__overview">${C(e.overview)}</p>` : "", o = e.todos.length ? ['<ul class="md-plan-frontmatter__todos">', ...e.todos.map(St), "</ul>"].join("") : '<p class="md-plan-frontmatter__empty">No todos</p>';
  return ['<div class="md-plan-frontmatter" data-md-plan="1" role="region" aria-label="Plan">', '<div class="md-plan-frontmatter__header">', `<div class="md-plan-frontmatter__name" role="heading" aria-level="2">${C(e.name)}</div>`, '<div class="md-plan-frontmatter__meta">', r, `<span class="md-plan-frontmatter__progress" data-md-plan-progress="1">${C(i)}</span>`, "</div>", "</div>", s, o, "</div>"].join("");
}
function It(e) {
  if (e.lineMax < 2) return -1;
  const t = e.bMarks[0] + e.tShift[0], n = e.eMarks[0], i = e.src.slice(t, n);
  if (!/^---[ \t]*$/.test(i)) return -1;
  for (let r = 1; r < e.lineMax; r += 1) {
    const s = e.bMarks[r] + e.tShift[r], o = e.eMarks[r], a = e.src.slice(s, o);
    if (/^---[ \t]*$/.test(a)) return r + 1;
  }
  return -1;
}
function vt(e, t, n, i) {
  if (t !== 0) return false;
  const r = It(e);
  if (r < 0) return false;
  const s = e.bMarks[0];
  let o = e.eMarks[r - 1];
  e.src[o] === "\r" && (o += 1), e.src[o] === `
` && (o += 1);
  const a = e.src.slice(s, o), l = bt(a);
  if (!l) return false;
  const c = yt(l.yaml);
  if (!c) return false;
  if (i) return true;
  const u = e.push("html_block", "", 0);
  return u.content = Mt(c), u.map = [t, r], u.markup = "---", u.block = true, e.line = r, true;
}
const At = ["paragraph", "reference", "blockquote", "list"];
function fe(e) {
  const t = vt, n = { alt: [...At] };
  try {
    e.block.ruler.before("hr", "plan_frontmatter", t, n);
  } catch {
    e.block.ruler.before("fence", "plan_frontmatter", t, n);
  }
}
const ae = 42;
function $t(e, t) {
  const n = e.pos, i = e.posMax, r = e.src;
  if (n + 3 > i || r.charCodeAt(n) !== ae || r.charCodeAt(n + 1) !== ae) return false;
  const s = r.indexOf("**", n + 2);
  if (s === -1 || s === n + 2) return false;
  if (t) return e.pos = s + 2, true;
  const o = e.push("strong_open", "strong", 1);
  o.markup = "**";
  const a = n + 2, l = e.posMax;
  e.pos = a, e.posMax = s, e.md.inline.tokenize(e), e.posMax = l, e.pos = s + 2;
  const c = e.push("strong_close", "strong", -1);
  return c.markup = "**", true;
}
function Et(e) {
  e.inline.ruler.before("emphasis", "better_strong", $t), e.renderer.rules.strong_open = () => "<b>", e.renderer.rules.strong_close = () => "</b>";
}
const ge = /^Mermaid!\[\]\((data:image\/[^)]+)\)\s*$/i, be = /^!\[\]\((data:image\/[^)]+)\)\s*$/i, z = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{48,}/i;
function N(e) {
  return /^mermaid$/i.test(e.trim());
}
function we(e, t) {
  const n = t.trim();
  return ge.test(n) || N(e) && be.test(n) || N(e) && z.test(n) ? true : /^Mermaid!\[\]\(/i.test(n) && z.test(n);
}
function ke(e) {
  const t = e.trim(), n = ge.exec(t);
  if (n == null ? void 0 : n[1]) return n[1];
  const i = be.exec(t);
  return (i == null ? void 0 : i[1]) ? i[1] : null;
}
function Ct(e) {
  var _a;
  return ((_a = /^data:image\/([a-z0-9.+-]+)/i.exec(e)) == null ? void 0 : _a[1]) ?? "image";
}
function Tt(e) {
  const t = Math.round(e * 3 / 4);
  return t >= 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)}MB` : t >= 1024 ? `${Math.max(1, Math.round(t / 1024))}KB` : `${t}B`;
}
function Pt(e) {
  var _a;
  const t = e.trim(), n = ke(t);
  if (n) {
    const r = ((_a = n.match(/;base64,([A-Za-z0-9+/=]+)/i)) == null ? void 0 : _a[1]) ?? "";
    return `![](\u2026${Ct(n)} ${Tt(r.length)}\u2026)`;
  }
  if (z.test(t)) return "\u2026base64 payload\u2026";
  const i = t.split(`
`).length;
  return i > 1 ? `${i} lines` : t.length > 48 ? `${t.slice(0, 40)}\u2026` : t;
}
function fn(e, t, n) {
  const i = e.slice(t, n), r = /^```([^\n]*)\n([\s\S]*)\n?```$/.exec(i);
  if (!r) return null;
  const s = r[1] ?? "", o = r[2] ?? "";
  if (!we(s, o)) return null;
  let a = t;
  for (; a < n && e[a] !== `
`; ) a += 1;
  if (a >= n) return null;
  a += 1;
  let l = n;
  for (; l > t && e[l - 1] !== `
`; ) l -= 1;
  return l <= a ? null : { from: a, to: l };
}
const oe = /^```mermaid\b([^\n]*)\r?\n/gim;
function Lt(e) {
  const t = String(e ?? "").trim();
  if (!t) return { width: null, height: null };
  let n = null, i = null;
  const r = t.split(/\s+/).filter(Boolean), s = /^mermaid$/i.test(r[0] ?? "") ? 1 : 0;
  for (let o = s; o < r.length; o += 1) {
    const a = r[o] ?? "", l = /^(\d+)x(\d+)$/i.exec(a);
    if (l) {
      n = I(l[1]), i = I(l[2]);
      continue;
    }
    if (/^\d+$/.test(a) && n == null) {
      n = I(a);
      continue;
    }
    const c = /^([a-zA-Z_]+)=(.*)$/.exec(a);
    if (!c) continue;
    const u = (c[1] ?? "").toLowerCase(), d = I(c[2]);
    d && (u === "w" || u === "width" ? n = d : (u === "h" || u === "height") && (i = d));
  }
  return { width: n, height: i };
}
function Rt(e) {
  const t = ["mermaid"];
  return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), t.join(" ");
}
function _e(e) {
  const t = [];
  return e.width && t.push(`width:${e.width}`), e.height && t.push(`height:${e.height}`), t.length ? `${t.join(";")};` : null;
}
function gn(e, t) {
  const n = [];
  for (const i of e.querySelectorAll(".md-editor-mermaid")) i.closest(".haim-mermaid-embed-source") || i.closest(".export-pdf-staging") || i.getAttribute("data-processed") != null && n.push(i);
  return n.findIndex((i) => i === t);
}
function Ot(e, { occurrence: t = 0, width: n = null, height: i = null }) {
  const r = String(e ?? ""), s = [];
  oe.lastIndex = 0;
  let o;
  for (; (o = oe.exec(r)) !== null; ) s.push({ index: o.index, full: o[0], infoTail: o[1] ?? "" });
  const a = s[t];
  if (!a) return { markdown: r, updated: false };
  const c = `\`\`\`${Rt({ width: n ? I(n) : null, height: i ? I(i) : null })}
`;
  return c === a.full ? { markdown: r, updated: false } : { markdown: r.slice(0, a.index) + c + r.slice(a.index + a.full.length), updated: true };
}
const se = /([\w-]+)="([^"]*)"/g, le = /^```mermaid\b([^\n]*)\r?\n/gim, Ht = /<!--\s*mermaid-size\s+([^>]*?)-->[ \t]*(?:\r?\n[ \t]*)*$/i, zt = /^<!--\s*mermaid-size\s+([^>]*?)-->\s*$/i;
function ce(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/\r\n/g, `
`).replace(/\n/g, "&#10;").replace(/\r/g, "");
}
function Nt(e) {
  return String(e ?? "").replace(/&#10;/g, `
`).replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function ye(e) {
  const t = {};
  se.lastIndex = 0;
  let n;
  for (; (n = se.exec(e)) !== null; ) {
    const s = n[1], o = n[2];
    !s || o == null || (t[s] = Nt(o));
  }
  const i = I(t.width || t.w || ""), r = I(t.height || t.h || "");
  return !i && !r ? null : { width: i, height: r };
}
function Bt(e) {
  const t = ["<!-- mermaid-size"];
  return e.width && t.push(`width="${ce(e.width)}"`), e.height && t.push(`height="${ce(e.height)}"`), t.push("-->"), t.join(" ");
}
function Ft(e, t) {
  if (t <= 0) return null;
  const i = e.slice(0, t).match(Ht);
  if (!i || i.index == null || !i[1]) return null;
  const r = ye(i[1]);
  return r ? { size: r, start: i.index, end: i.index + i[0].length } : null;
}
function de(e) {
  const t = [], n = new RegExp(le.source, le.flags);
  let i;
  for (; (i = n.exec(e)) !== null; ) t.push(i.index);
  return t;
}
const jt = /^```mermaid[^\n]*\r?\n([\s\S]*?)^```/gm;
function bn(e, t, n = 0) {
  const i = String(t ?? "").trim();
  if (!i) return -1;
  const r = [], s = new RegExp(jt.source, "gm");
  let o = 0, a;
  for (; (a = s.exec(e)) !== null; ) (a[1] || "").trim() === i && r.push(o), o += 1;
  return r[n] ?? r[0] ?? -1;
}
function xe(e, t) {
  for (let n = t - 1; n >= 0; n -= 1) {
    const i = e[n] ?? "";
    if (!i.trim()) continue;
    const r = zt.exec(i.trim());
    if (!r) break;
    return ye(r[1] ?? "");
  }
  return null;
}
function Se(e, t) {
  const n = Lt(e);
  return !(t == null ? void 0 : t.width) && !(t == null ? void 0 : t.height) ? n : { width: t.width ?? n.width, height: t.height ?? n.height };
}
function wn(e, { occurrence: t = 0, width: n = null, height: i = null }) {
  const r = String(e ?? "");
  if (de(r)[t] == null) return { markdown: r, updated: false };
  const a = n ? I(n) : null, l = i ? I(i) : null;
  let c = r, u = false;
  const d = Ot(c, { occurrence: t, width: null, height: null });
  d.updated && (c = d.markdown, u = true);
  const m = de(c)[t];
  if (m == null) return { markdown: c, updated: u };
  const f = Ft(c, m);
  if (!a && !l) return f && (c = c.slice(0, f.start) + c.slice(f.end), u = true), { markdown: c, updated: u };
  const w = Bt({ width: a, height: l });
  if (f) {
    const y = c.slice(0, f.start) + w + c.slice(f.end);
    y !== c && (c = y, u = true);
  } else {
    const k = `${m > 0 && c[m - 1] !== `
` ? `
` : ""}${w}
`;
    c = c.slice(0, m) + k + c.slice(m), u = true;
  }
  return { markdown: c, updated: u };
}
const B = "md-editor";
function Me(e, t) {
  var _a, _b, _c;
  if (!e.map || e.level !== 0) return true;
  const n = e.map[1] - 1;
  return !!((_c = (_b = (_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a[n]) == null ? void 0 : _b.trim()) == null ? void 0 : _c.startsWith("```"));
}
function L(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function Ie(e, t, n) {
  var _a;
  const i = n != null && ((_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a.length) ? xe(t.srcLines, n) : null, r = Se(e, i), s = [];
  if (r.width && s.push(`data-mermaid-width="${L(r.width)}"`), r.height && s.push(`data-mermaid-height="${L(r.height)}"`), r.width || r.height) {
    s.push('data-mermaid-sized="1"');
    const o = _e(r);
    o && s.push(`style="${L(o)}max-width:100%;overflow:hidden;"`);
  }
  return s;
}
function Dt(e, t, n, i) {
  var _a;
  const r = (_a = e.map) == null ? void 0 : _a[0], s = [`class="${B}-mermaid"`, `data-mermaid-theme="${n}"`, 'data-haim-mermaid-lazy="1"', ...Ie(i, t, typeof r == "number" ? r : void 0)];
  return e.map && e.level === 0 && (s.push(`data-closed="${String(Me(e, t))}"`), s.push(`data-line="${String(e.map[0])}"`)), s.join(" ");
}
function ue(e, t, n, i, r) {
  const s = e.utils.escapeHtml(i), o = e.utils.escapeHtml(n);
  return `<div class="haim-mermaid-embed" data-haim-mermaid-embed="1"><details class="md-editor-code haim-mermaid-embed-source"><summary class="md-editor-code-head"><span class="md-editor-code-lang">${e.utils.escapeHtml(t)}</span><span class="haim-mermaid-embed-summary">${o}</span></summary><pre class="haim-mermaid-embed-pre"><code>${s}</code></pre></details><div class="haim-mermaid-embed-render">${r}</div></div>`;
}
function Gt(e) {
  const t = e.renderer.rules.fence;
  e.renderer.rules.fence = (n, i, r, s, o) => {
    var _a, _b;
    const a = n[i];
    if (!a) return t ? t(n, i, r, s, o) : o.renderToken(n, i, r);
    const l = a.info.trim(), c = l.split(/\s+/)[0] ?? "", d = a.content.trim(), m = N(c), f = we(c, d);
    if (!m && !f) return t ? t(n, i, r, s, o) : o.renderToken(n, i, r);
    const w = s, y = Ye(), k = ke(d), M = m ? "mermaid" : "Mermaid", _ = Pt(d), h = (_a = a.map) == null ? void 0 : _a[0], b = Ie(l, w, typeof h == "number" ? h : void 0);
    if (k) {
      const p = `<p class="${B}-mermaid haim-mermaid-image-embed" data-processed="" data-haim-mermaid-image="1"${b.length ? ` ${b.join(" ")}` : ""}><img src="${L(k)}" alt="Mermaid" class="haim-mermaid-embed-img" /></p>`;
      return ue(e, M, _, d, p);
    }
    if (f) {
      const x = `<div ${Dt(a, w, y, l)}></div>`;
      return ue(e, M, _, d, x);
    }
    a.attrSet("class", `${B}-mermaid`), a.attrSet("data-mermaid-theme", y), a.attrSet("data-haim-mermaid-lazy", "1");
    const g = Se(l, typeof h == "number" && ((_b = w == null ? void 0 : w.srcLines) == null ? void 0 : _b.length) ? xe(w.srcLines, h) : null);
    if (g.width && a.attrSet("data-mermaid-width", g.width), g.height && a.attrSet("data-mermaid-height", g.height), g.width || g.height) {
      a.attrSet("data-mermaid-sized", "1");
      const p = _e(g);
      p && a.attrSet("style", `${p}max-width:100%;overflow:hidden;`);
    }
    return a.map && a.level === 0 && (a.attrSet("data-closed", String(Me(a, w))), a.attrSet("data-line", String(a.map[0]))), `<div ${o.renderAttrs(a)}>${e.utils.escapeHtml(d)}</div>`;
  };
}
const Wt = /^\[([ xX~])\] /;
function E(e, t, n) {
  const i = e.attrIndex(t), r = [t, n];
  if (i < 0) {
    e.attrPush(r);
    return;
  }
  e.attrs = e.attrs ?? [], e.attrs[i] = r;
}
function qt(e) {
  return (e == null ? void 0 : e.type) === "inline";
}
function Kt(e) {
  return (e == null ? void 0 : e.type) === "paragraph_open";
}
function Xt(e) {
  return (e == null ? void 0 : e.type) === "list_item_open";
}
function ve(e) {
  var _a;
  const t = e.match(Wt);
  if (!t) return null;
  const n = t[1];
  return { status: We(n), kind: Ge(n), markerLen: ((_a = t[0]) == null ? void 0 : _a.length) ?? 4 };
}
function Ut(e, t) {
  var _a;
  return qt(e[t]) && Kt(e[t - 1]) && Xt(e[t - 2]) && !!ve(((_a = e[t]) == null ? void 0 : _a.content) ?? "");
}
function Yt(e, t) {
  var _a, _b;
  const n = (((_a = e[t]) == null ? void 0 : _a.level) ?? 0) - 1;
  for (let i = t - 1; i >= 0; i -= 1) if (((_b = e[i]) == null ? void 0 : _b.level) === n) return i;
  return -1;
}
function Vt(e) {
  const t = new e("html_inline", "", 0);
  return t.content = "<label>", t;
}
function Zt(e) {
  const t = new e("html_inline", "", 0);
  return t.content = "</label>", t;
}
function Qt(e, t, n) {
  const i = new n("html_inline", "", 0);
  return i.content = `<label class="task-list-item-label" for="${t}">${e}</label>`, i.attrs = [["for", t]], i;
}
function Jt(e, t, n, i) {
  const r = new n("html_inline", "", 0), s = i.enabled ? " " : ' disabled="" ', o = e === "done" ? ' checked=""' : "", a = t === "status" ? " task-list-item-checkbox--status" : "", l = e === "doing" ? ' aria-checked="mixed"' : e === "done" ? ' aria-checked="true"' : ' aria-checked="false"';
  return r.content = `<input class="task-list-item-checkbox${a}" data-status="${e}" data-kind="${t}"${l}${o}${s}type="checkbox">`, r;
}
function en(e, t, n, i, r, s) {
  if (e.children = e.children ?? [], e.children.unshift(Jt(i, r, t.Token, n)), e.children[1] && (e.children[1].content = e.children[1].content.slice(s)), e.content = e.content.slice(s), n.label) if (n.labelAfter) {
    e.children.pop();
    const o = `task-item-${Math.ceil(Math.random() * (1e4 * 1e3) - 1e3)}`;
    e.children[0].content = `${e.children[0].content.slice(0, -1)} id="${o}">`, e.children.push(Qt(e.content, o, t.Token));
  } else e.children.unshift(Vt(t.Token)), e.children.push(Zt(t.Token));
}
function tn(e, t = {}) {
  e.core.ruler.after("inline", "github-task-lists", (n) => {
    var _a;
    const i = n.tokens;
    for (let r = 2; r < i.length; r += 1) {
      if (!Ut(i, r)) continue;
      const s = ve(((_a = i[r]) == null ? void 0 : _a.content) ?? "");
      s && (en(i[r], n, t, s.status, s.kind, s.markerLen), E(i[r - 2], "class", `task-list-item${t.enabled ? " enabled" : ""}`), E(i[r - 2], "data-status", s.status), E(i[r - 2], "data-kind", s.kind), s.status === "done" && E(i[r - 2], "data-checked", "true"), E(i[Yt(i, r - 2)], "class", "contains-task-list"));
    }
  });
}
function nn(e, t) {
  const n = String(e.content ?? "");
  if (T.lastIndex = 0, !T.test(n)) return [e];
  const i = [];
  let r = 0;
  T.lastIndex = 0;
  let s;
  for (; (s = T.exec(n)) !== null; ) {
    const o = s[0], a = s[1] ?? "", l = qe(a), c = s.index;
    if (!l) continue;
    if (c > r) {
      const d = new t("text", "", 0);
      d.content = n.slice(r, c), i.push(d);
    }
    const u = new t("text", "", 0);
    u.content = l, i.push(u), r = c + o.length;
  }
  if (i.length === 0) return [e];
  if (r < n.length) {
    const o = new t("text", "", 0);
    o.content = n.slice(r), i.push(o);
  }
  return i;
}
function rn(e) {
  e.core.ruler.after("inline", "emoji_shortcode", (t) => {
    var _a;
    const n = t.Token;
    for (const i of t.tokens) {
      if (i.type !== "inline" || !((_a = i.children) == null ? void 0 : _a.length)) continue;
      const r = [];
      for (const s of i.children) {
        if (s.type !== "text" || !s.content.includes(":")) {
          r.push(s);
          continue;
        }
        r.push(...nn(s, n));
      }
      i.children = r;
    }
  });
}
const an = { br: [], pgbr: [], div: ["class", "data-md-pgbr", "data-md-plan", "data-note-cover-placeholder", "data-note-cover-mount", "data-note-cover-preview", "data-color-mode", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style", "role", "tabindex", "aria-label", "aria-level"], span: ["class", "data-md-pgbr", "data-md-plan-project", "data-md-plan-progress", "aria-hidden", "data-note-cover-fallback"], p: ["class", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style"], details: ["class", "open", "data-haim-mermaid-embed"], summary: ["class"], ul: ["class", "data-type"], li: ["class", "id", "data-status", "data-checked", "data-type", "data-md-footnote-id", "data-md-footnote-label"], h6: ["id", "class", "data-heading-level"], a: ["href", "class", "id", "target", "rel", "data-chat-saved-note", "data-chat-href", "data-chat-id", "data-md-footnote-to", "data-md-footnote-id", "data-md-footnote-title", "aria-label", "title"], sup: ["class"], sub: ["class"], b: [], section: ["class"], hr: ["class"], ol: ["class"], table: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], thead: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tbody: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tfoot: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tr: ["class", "style"], th: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], td: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], img: ["src", "alt", "title", "class", "style", "width", "height", "data-wiki-path", "data-wiki-width", "data-wiki-height", "data-md-src", "data-md-width", "data-md-height", "data-storage-image"], input: ["type", "checked", "disabled", "class", "id", "data-status", "aria-checked"], label: ["class", "for"] }, Ae = [{ type: "better_md", plugin: Et, options: {} }, { type: "heading_levels", plugin: j, options: {} }, { type: "wiki_image", plugin: nt, options: {} }, { type: "preview_link_target_blank", plugin: rt, options: {} }, { type: "pgbr", plugin: st, options: {} }, { type: "chat_saved_note", plugin: ft, options: {} }, { type: "note_cover_placeholder", plugin: Ke, options: {} }, { type: "haim_table", plugin: tt, options: {} }, { type: "plan_frontmatter", plugin: fe, options: {} }, { type: "mermaid", plugin: Gt, options: {} }, { type: "task_list", plugin: tn, options: { enabled: false, label: false } }, { type: "emoji_shortcode", plugin: rn, options: {} }];
function on(e) {
  e.set({ html: true, breaks: true, linkify: true }), e.linkify && e.linkify.set({ fuzzyLink: true });
}
function kn(e, t = {}) {
  on(e), t.xss !== false && Ee(e, { extendedWhiteList: an }), je(e);
}
function sn(e) {
  let t = e;
  for (const n of Ae) t.some((i) => i.type === n.type) || (t = [...t, n]);
  return t;
}
function _n(e) {
  for (const t of Ae) e.use(t.plugin, t.options);
}
function yn(e) {
  return sn(e);
}
function xn(e) {
  j(e);
}
function Sn(e) {
  j(e), fe(e);
}
export {
  Sn as a,
  xn as b,
  kn as c,
  _n as d,
  yn as e,
  bn as f,
  gn as g,
  fn as m,
  wn as u
};
