import { N as Ie } from "./vendor-md-editor-CNr2PGSh.js";
import { dp as Ae, aT as D, dq as Ee, w as $e, dr as Ce, z as Te, y as G, A as P, D as R, aQ as Pe, ds as W, a5 as Re, a7 as q, dt as Le, du as He, dv as ze, cQ as K, dw as X, dx as Ne, aR as v, dy as Oe } from "./index-ahe6T7wM.js";
import { p as Be } from "./wikiImageResolver-DH_I5p_N.js";
import { n as Fe } from "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import { e as je, r as De } from "./styleResolve-DPOTuGzn.js";
import { r as Ge } from "./mermaidTheme-Deyx0OD8.js";
const We = /^<!--\s*haim-table\b/;
function L(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : We.test(String(e.content || "").trim());
}
function qe(e) {
  const t = /<!--\s*haim-table\s*([\s\S]*?)-->/.exec(e);
  return t ? Ee(t[1] ?? "") ?? D() : D();
}
function Ke(e, t) {
  var _a, _b;
  for (let n = t; n < Math.min(e.length, t + 8); n += 1) {
    if (((_a = e[n]) == null ? void 0 : _a.type) === "table_open") {
      for (let i = n + 1; i < e.length; i += 1) if (((_b = e[i]) == null ? void 0 : _b.type) === "table_close") return { start: n, end: i };
      return null;
    }
    const r = e[n];
    if (r && !(r.type === "paragraph_open" || r.type === "paragraph_close") && !(r.type === "inline" && !String(r.content || "").trim()) && !(r.type === "html_block" || r.type === "html_inline") && !r.hidden && r.type !== "table_open") return null;
  }
  return null;
}
function Xe(e, t, n) {
  const r = [];
  let i = t + 1;
  for (; i < n; ) {
    const s = e[i];
    if (!s) break;
    if (s.type === "tr_open") {
      const o = { openIdx: i, closeIdx: -1, cells: [] };
      for (i += 1; i < n; ) {
        const a = e[i];
        if (!a) break;
        if (a.type === "tr_close") {
          o.closeIdx = i, i += 1;
          break;
        }
        if (a.type === "th_open" || a.type === "td_open") {
          const l = i;
          let c = -1, u = -1;
          for (i += 1; i < n; ) {
            const d = e[i];
            if (!d) break;
            if (d.type === "inline" && (c = i), d.type === "th_close" || d.type === "td_close") {
              u = i, i += 1;
              break;
            }
            i += 1;
          }
          u >= 0 && o.cells.push({ openIdx: l, closeIdx: u, inlineIdx: c });
          continue;
        }
        i += 1;
      }
      r.push(o);
      continue;
    }
    i += 1;
  }
  return r;
}
function Qe(e, t, n, r, i, s) {
  var _a, _b;
  const o = e.tokens, a = Xe(o, n, r);
  if (!a.length) {
    o[t] && (o[t].hidden = true, o[t].content = "");
    return;
  }
  const l = a.length, c = Math.max(1, ...a.map((h) => h.cells.length)), u = $e(i.merges), d = je(i, l), p = Math.min(Math.max(0, i.footerRows), Math.max(0, l - d));
  (_a = o[n]) == null ? void 0 : _a.attrSet("data-haim-table", "1"), i.noHeader && ((_b = o[n]) == null ? void 0 : _b.attrSet("data-haim-no-header", "1")), o[n] && Ce((h, w) => o[n].attrSet(h, w), i, o[n].attrGet("style"));
  for (let h = 0; h < a.length; h += 1) {
    const w = a[h];
    for (let m = 0; m < w.cells.length; m += 1) {
      const x = w.cells[m], S = o[x.openIdx];
      if (!S) continue;
      if (u.has(`${h},${m}`)) {
        S.hidden = true, x.inlineIdx >= 0 && o[x.inlineIdx] && (o[x.inlineIdx].hidden = true), o[x.closeIdx] && (o[x.closeIdx].hidden = true);
        continue;
      }
      const I = Te(i.merges, h, m);
      I && (I.colspan > 1 && S.attrSet("colspan", String(I.colspan)), I.rowspan > 1 && S.attrSet("rowspan", String(I.rowspan)));
      const ve = De({ row: h, col: m, rowCount: l, colCount: c, meta: i, template: s });
      let E = G(ve);
      const F = P(i.colWidths, m);
      F && (E = R(E, `width:${F}`));
      const j = P(i.rowHeights, h);
      j && (E = R(E, `height:${j}`)), E && S.attrSet("style", E), S.attrSet("data-haim-r", String(h)), S.attrSet("data-haim-c", String(m));
    }
    const g = P(i.rowHeights, h);
    if (g && o[w.openIdx]) {
      const m = o[w.openIdx];
      m.attrSet("style", R(m.attrGet("style"), `height:${g}`));
    }
  }
  const f = a.slice(0, d), _ = a.slice(d, l - p), k = p > 0 ? a.slice(l - p) : [];
  for (const h of f) for (const w of h.cells) {
    const g = o[w.openIdx], m = o[w.closeIdx];
    g && (g.tag = "th", g.type = "th_open"), m && (m.tag = "th", m.type = "th_close");
  }
  for (const h of [..._, ...k]) for (const w of h.cells) {
    const g = o[w.openIdx], m = o[w.closeIdx];
    g && (g.tag = "td", g.type = "td_open"), m && (m.tag = "td", m.type = "td_close");
  }
  const b = [], M = (h, w) => {
    if (!w.length) return;
    const g = new e.Token(`${h}_open`, h, 1), m = G(i.sections[h] ?? {}, { includeOuterBorder: true });
    m && g.attrSet("style", m), g.attrSet("data-haim-section", h), b.push(g);
    for (const x of w) for (let S = x.openIdx; S <= x.closeIdx; S += 1) {
      const I = o[S];
      I && b.push(I);
    }
    b.push(new e.Token(`${h}_close`, h, -1));
  };
  M("thead", f), M("tbody", _), M("tfoot", k);
  const y = [...o.slice(0, n + 1), ...b, ...o.slice(r)];
  if (t >= 0 && t < y.length && L(y[t])) y[t].hidden = true, y[t].content = "";
  else for (const h of y) L(h) && (h.hidden = true, h.content = "");
  e.tokens.length = 0, e.tokens.push(...y);
}
function Ue(e) {
  e.core.ruler.after("block", "haim_table", (t) => {
    for (let n = 0; n < 50; n += 1) {
      let r = null;
      for (let s = 0; s < t.tokens.length; s += 1) {
        const o = t.tokens[s];
        if (!o || !L(o) || o.hidden) continue;
        const a = qe(o.content), l = Ke(t.tokens, s + 1);
        if (l) {
          r = { commentIdx: s, tableStart: l.start, tableEnd: l.end, meta: a };
          break;
        }
      }
      if (!r) break;
      const i = r.meta.templateId ? Ae(r.meta.templateId) : null;
      Qe(t, r.commentIdx, r.tableStart, r.tableEnd, r.meta, i);
    }
  });
}
const Q = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
function U(e) {
  const t = Be(e);
  return !t || t.startsWith("blob:") || t.startsWith("data:") ? Q : t;
}
function Y(e) {
  return e ? [e[0], e[1]] : null;
}
function Ye(e) {
  const t = /!\[\[([^[\]]+)\]\]/g;
  e.core.ruler.push("wiki-image", (n) => {
    n.src && /!\[\[/.test(n.src), n.tokens.forEach((r) => {
      if (r.type !== "inline" || !r.children) return;
      const i = [];
      r.children.forEach((s) => {
        if (s.type !== "text") {
          i.push(s);
          return;
        }
        const o = s.content;
        let a = 0;
        t.lastIndex = 0;
        let l;
        for (; (l = t.exec(o)) !== null; ) {
          if (l.index > a) {
            const f = new n.Token("text", "", 0);
            f.content = o.slice(a, l.index), i.push(f);
          }
          const c = Pe(l[1]), u = c == null ? void 0 : c.path;
          if (!u) {
            const f = new n.Token("text", "", 0);
            f.content = l[0], i.push(f), a = l.index + l[0].length;
            continue;
          }
          const d = new n.Token("wiki_image", "img", 0);
          d.attrSet("data-wiki-path", u), (c == null ? void 0 : c.width) && d.attrSet("data-wiki-width", c.width), (c == null ? void 0 : c.height) && d.attrSet("data-wiki-height", c.height), (c == null ? void 0 : c.background) && d.attrSet("data-wiki-bg", c.background);
          const p = W(c ?? {});
          p && d.attrSet("style", p), d.attrSet("src", U(u)), d.attrSet("alt", ""), i.push(d), a = l.index + l[0].length;
        }
        if (a < o.length) {
          const c = new n.Token("text", "", 0);
          c.content = o.slice(a), i.push(c);
        }
      }), i.length, r.children.length, r.children = i;
    });
  }), e.core.ruler.after("wiki-image", "wiki-image-caption-inline", (n) => {
    const r = n.tokens;
    if (!r || r.length < 3) return;
    const i = [];
    let s = false;
    for (let o = 0; o < r.length; o += 1) {
      const a = r[o], l = r[o + 1], c = r[o + 2];
      if (!a || !l || !c) {
        a && i.push(a);
        continue;
      }
      if (a.type !== "paragraph_open" || l.type !== "inline" || c.type !== "paragraph_close") {
        i.push(a);
        continue;
      }
      const u = l.children || [];
      if (u.length < 3) {
        i.push(a);
        continue;
      }
      const d = u[0], p = u[1], f = p != null && (p.type === "softbreak" || p.type === "hardbreak");
      if (!d || d.type !== "wiki_image" || !f) {
        i.push(a);
        continue;
      }
      const _ = u.slice(2);
      if (!_.some((m) => m.type === "text" && m.content && m.content.trim())) {
        i.push(a);
        continue;
      }
      const b = new n.Token("figure_open", "figure", 1);
      b.block = true, b.map = Y(a.map);
      const M = new n.Token("inline", "", 0);
      M.children = [d], M.level = (a.level || 0) + 1;
      const y = new n.Token("figcaption_open", "figcaption", 1);
      y.block = true, y.level = (a.level || 0) + 1;
      const h = new n.Token("inline", "", 0);
      h.children = _, h.level = (a.level || 0) + 2;
      const w = new n.Token("figcaption_close", "figcaption", -1);
      w.block = true, w.level = (a.level || 0) + 1;
      const g = new n.Token("figure_close", "figure", -1);
      g.block = true, g.level = a.level || 0, i.push(b, M, y, h, w, g), s = true, o += 2;
    }
    s && (n.tokens = i);
  }), e.core.ruler.after("wiki-image-caption-inline", "wiki-image-caption", (n) => {
    const r = n.tokens;
    if (!r || r.length < 6) return;
    const i = [];
    let s = false;
    for (let o = 0; o < r.length; o += 1) {
      const a = r[o], l = r[o + 1], c = r[o + 2], u = r[o + 3], d = r[o + 4], p = r[o + 5];
      if (!(a != null && l != null && c != null && u != null && d != null && p != null && a.type === "paragraph_open" && l.type === "inline" && c.type === "paragraph_close" && u.type === "paragraph_open" && d.type === "inline" && p.type === "paragraph_close") || !a || !l || !d) {
        a && i.push(a);
        continue;
      }
      const _ = l.children || [], k = _[0];
      if (_.length !== 1 || !k || k.type !== "wiki_image") {
        i.push(a);
        continue;
      }
      const b = d.children || [];
      if (!b.some((S) => S.type === "text" && S.content && S.content.trim())) {
        i.push(a);
        continue;
      }
      const y = new n.Token("figure_open", "figure", 1);
      y.block = true, y.map = Y(a.map);
      const h = new n.Token("inline", "", 0);
      h.children = _, h.level = (a.level || 0) + 1;
      const w = new n.Token("figcaption_open", "figcaption", 1);
      w.block = true, w.level = (a.level || 0) + 1;
      const g = new n.Token("inline", "", 0);
      g.children = b, g.level = (a.level || 0) + 2;
      const m = new n.Token("figcaption_close", "figcaption", -1);
      m.block = true, m.level = (a.level || 0) + 1;
      const x = new n.Token("figure_close", "figure", -1);
      x.block = true, x.level = a.level || 0, i.push(y, h, w, g, m, x), s = true, o += 5;
    }
    s && (n.tokens = i);
  }), e.core.ruler.after("wiki-image-caption", "markdown-image-size-attrs", (n) => {
    n.tokens.forEach((r) => {
      var _a;
      if (r.type !== "inline" || !((_a = r.children) == null ? void 0 : _a.length)) return;
      const i = [], s = r.children;
      for (let o = 0; o < s.length; o += 1) {
        const a = s[o];
        if (!a) continue;
        if (a.type !== "image") {
          i.push(a);
          continue;
        }
        const l = a.attrGet("src"), c = l == null ? null : String(l);
        if (c && a.attrSet("data-md-src", c), c && Re(q(c))) {
          const d = q(c);
          a.attrSet("src", U(d)), a.attrSet("data-storage-image", "1");
        }
        const u = s[o + 1];
        if ((u == null ? void 0 : u.type) === "text") {
          const d = u.content || "", p = d.match(/^\{([^}\n]+)\}/);
          if (p) {
            const f = Le(`{${p[1]}}`);
            f.width && a.attrSet("data-md-width", f.width), f.height && a.attrSet("data-md-height", f.height), f.background && a.attrSet("data-md-bg", f.background);
            const _ = W(f);
            _ && a.attrSet("style", _);
            const k = d.slice(p[0].length);
            if (k) {
              const b = new n.Token("text", "", 0);
              b.content = k, i.push(a, b);
            } else i.push(a);
            o += 1;
            continue;
          }
        }
        i.push(a);
      }
      r.children = i;
    });
  }), e.renderer.rules.wiki_image = (n, r, i, s, o) => {
    const a = n[r];
    return a ? `<img ${o.renderAttrs(a)}>` : "";
  };
}
function Ve(e) {
  const t = e.renderer.rules.link_open || function(r, i, s, o, a) {
    return a.renderToken(r, i, s);
  };
  e.renderer.rules.link_open = function(r, i, s, o, a) {
    const l = r[i];
    if (!l) return t(r, i, s, o, a);
    const c = l.attrGet("href") || "";
    return !(l.attrGet("data-chat-saved-note") === "1") && He(c) && (l.attrSet("target", "_blank"), l.attrSet("rel", "noopener noreferrer")), t(r, i, s, o, a);
  };
}
const C = /<pgbr\s*\/?\s*>/gi;
function O(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function Ze(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function V(e) {
  const t = new e.Token("html_inline", "", 0);
  return t.content = '<span class="md-pgbr" data-md-pgbr="1"></span>', t;
}
const de = /<span class="md-pgbr"/;
function ue(e) {
  let t = 0;
  for (const n of e.children || []) n.type === "html_inline" && (de.test(n.content) || O(n.content)) && (t += 1);
  return t;
}
function Je(e) {
  var _a;
  if (e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  for (const t of e.children) if (!(t.type === "softbreak" || t.type === "hardbreak") && !(t.type === "text" && !t.content.trim()) && !(t.type === "html_inline" && (de.test(t.content) || O(t.content)))) return false;
  return ue(e) > 0;
}
function Z(e) {
  const t = new e.Token("html_block", "", 0);
  return t.content = '<div class="md-pgbr" data-md-pgbr="1"></div>', t.block = true, t;
}
function et(e, t) {
  if (!(t == null ? void 0 : t.length)) return t;
  const n = [];
  for (const r of t) {
    if (r.type === "html_inline" && O(r.content)) {
      n.push(V(e));
      continue;
    }
    if (r.type !== "text") {
      n.push(r);
      continue;
    }
    const i = r.content;
    if (C.lastIndex = 0, !C.test(i)) {
      n.push(r);
      continue;
    }
    let s = 0;
    C.lastIndex = 0;
    let o;
    for (; (o = C.exec(i)) !== null; ) {
      if (o.index > s) {
        const a = new e.Token("text", "", 0);
        a.content = i.slice(s, o.index), n.push(a);
      }
      n.push(V(e)), s = o.index + o[0].length;
    }
    if (s < i.length) {
      const a = new e.Token("text", "", 0);
      a.content = i.slice(s), n.push(a);
    }
  }
  return n;
}
function tt(e) {
  e.core.ruler.push("pgbr-mark", (t) => (t.tokens.forEach((n) => {
    n.type !== "inline" || !n.children || (n.children = et(t, n.children));
  }), true)), e.core.ruler.after("pgbr-mark", "pgbr-unwrap-paragraph", (t) => {
    const { tokens: n } = t, r = [];
    let i = 0;
    for (; i < n.length; ) {
      if (i + 2 < n.length && n[i].type === "paragraph_open" && n[i + 1].type === "inline" && n[i + 2].type === "paragraph_close" && Je(n[i + 1])) {
        const s = ue(n[i + 1]);
        for (let o = 0; o < s; o += 1) r.push(Z(t));
        i += 3;
        continue;
      }
      r.push(n[i]), i += 1;
    }
    return t.tokens = r, true;
  }), e.core.ruler.after("pgbr-unwrap-paragraph", "pgbr-normalize-html-block", (t) => (t.tokens = t.tokens.map((n) => n.type === "html_block" && Ze(n.content) ? Z(t) : n), true));
}
const nt = /<!--\s*chat-with-myself\s+[^>]*?-->/i, J = /(?:^|\/)chat(?:\/)?(?:#|%23)msg-/i, it = /채팅으로\s*이동|채팅에서\s*저장된\s*노트/;
function ee(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function he(e) {
  return nt.test(e || "") ? ze(e) : null;
}
function rt(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : !!he(e.content);
}
function at(e, t) {
  var _a;
  if (((_a = e[t]) == null ? void 0 : _a.type) !== "blockquote_open") return -1;
  let n = 0;
  for (let r = t; r < e.length; r += 1) {
    const i = e[r];
    if (i.type === "blockquote_open") n += 1;
    else if (i.type === "blockquote_close" && (n -= 1, n === 0)) return r + 1;
  }
  return -1;
}
function ot(e) {
  var _a;
  if (!e || e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  let t = "", n = "", r = false;
  for (const i of e.children) if (!(i.type === "softbreak" || i.type === "hardbreak") && !(i.type === "text" && !String(i.content || "").trim())) {
    if (i.type === "link_open") {
      if (r) return false;
      r = true, t = i.attrGet("href") || "";
      continue;
    }
    if (i.type === "text" && r && !n) {
      n = i.content || "";
      continue;
    }
    if (i.type !== "link_close") return false;
  }
  return !(!r || !J.test(t) && !/#msg-/.test(t) || n && !it.test(n) && !J.test(t) && !/#msg-/.test(t));
}
function st(e, t) {
  var _a, _b, _c;
  return ((_a = e[t]) == null ? void 0 : _a.type) !== "paragraph_open" || ((_b = e[t + 1]) == null ? void 0 : _b.type) !== "inline" || ((_c = e[t + 2]) == null ? void 0 : _c.type) !== "paragraph_close" || !ot(e[t + 1]) ? -1 : t + 3;
}
function lt(e) {
  const t = ee(e.href || "/chat"), n = ee(e.id || "");
  return [`<a class="md-chat-saved-note" href="${t}" data-chat-saved-note="1" data-chat-href="${t}" data-chat-id="${n}">`, '<span class="md-chat-saved-note__icon" aria-hidden="true"></span>', '<span class="md-chat-saved-note__body">', '<span class="md-chat-saved-note__title">\uCC44\uD305\uC5D0\uC11C \uC800\uC7A5\uB41C \uB178\uD2B8</span>', '<span class="md-chat-saved-note__hint">\uD0ED\uD558\uC5EC \uC6D0\uBCF8 \uCC44\uD305\uC73C\uB85C \uC774\uB3D9</span>', "</span>", '<span class="md-chat-saved-note__arrow" aria-hidden="true">\u2192</span>', "</a>"].join("");
}
function ct(e) {
  e.core.ruler.after("inline", "chat-saved-note", (t) => {
    const { tokens: n } = t;
    if (!(n == null ? void 0 : n.length)) return;
    const r = [];
    let i = 0;
    for (; i < n.length; ) {
      if (!rt(n[i])) {
        r.push(n[i]), i += 1;
        continue;
      }
      const s = he(n[i].content);
      let o = i + 1;
      const a = at(n, o);
      a > o && (o = a);
      const l = st(n, o);
      l > o && (o = l);
      const c = new t.Token("html_block", "", 0);
      c.content = lt(s), c.block = true, r.push(c), i = o;
    }
    t.tokens = r;
  });
}
function te(e) {
  return e === 9 || e === 32;
}
function dt(e, t, n, r) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return false;
  let o = e.src.charCodeAt(i);
  if (o !== 35 || i >= s) return false;
  let a = 1;
  for (o = e.src.charCodeAt(++i); o === 35 && i < s && a < K; ) a += 1, o = e.src.charCodeAt(++i);
  if (a > K || i < s && !te(o)) return false;
  if (r) return true;
  s = e.skipSpacesBack(s, i);
  const l = e.skipCharsBack(s, 35, i);
  l > i && te(e.src.charCodeAt(l - 1)) && (s = l), e.line = t + 1;
  const c = "#".repeat(a), u = a <= X ? `h${a}` : "h6", d = e.push("heading_open", u, 1);
  d.markup = c, d.map = [t, e.line], a > X && (d.attrSet("data-heading-level", String(a)), d.attrSet("class", `md-heading md-heading-${a}`));
  const p = e.push("inline", "", 0);
  p.content = e.src.slice(i, s).trim(), p.map = [t, e.line], p.children = [];
  const f = e.push("heading_close", u, -1);
  return f.markup = c, true;
}
function B(e) {
  e.block.ruler.at("heading", dt);
}
const ne = /^---[ \t]*\r?\n/;
function ut(e) {
  const t = String(e ?? "");
  if (!ne.test(t)) return null;
  const n = t.replace(ne, ""), r = n.match(/\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!r || r.index == null) return null;
  const i = n.slice(0, r.index), s = t.length - n.length + r.index + r[0].length;
  return { yaml: i, bodyOffset: s };
}
function A(e) {
  if (typeof e != "string") return null;
  const t = e.trim();
  return t || null;
}
function ht(e) {
  const t = String(e ?? "").trim().toLowerCase().replace(/_/g, "-");
  return t === "completed" || t === "complete" || t === "done" ? "completed" : t === "in-progress" || t === "inprogress" || t === "progress" ? "in_progress" : t === "cancelled" || t === "canceled" ? "cancelled" : t === "error" || t === "failed" || t === "fail" ? "error" : "pending";
}
function mt(e, t) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const n = e, r = A(n.content) ?? A(n.title);
  return r ? { id: A(n.id) ?? `todo-${t + 1}`, content: r, status: ht(n.status) } : null;
}
function pt(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return false;
  const t = e;
  return !(!Array.isArray(t.todos) || t.name != null && typeof t.name != "string" && typeof t.name != "number");
}
function ft(e) {
  let t;
  try {
    t = Ne(String(e ?? ""));
  } catch {
    return null;
  }
  if (!pt(t)) return null;
  const n = [];
  for (let o = 0; o < t.todos.length; o += 1) {
    const a = mt(t.todos[o], o);
    a && n.push(a);
  }
  const r = A(t.name) ?? A(t.title) ?? "Plan", i = A(t.overview) ?? A(t.description) ?? "", s = t.isProject === true || t.is_project === true;
  return { name: r, overview: i, todos: n, isProject: s };
}
function $(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const gt = { pending: "Pending", in_progress: "In progress", completed: "Completed", cancelled: "Cancelled", error: "Error" };
function wt(e) {
  const t = e.status, n = gt[t];
  return [`<li class="md-plan-frontmatter__todo md-plan-frontmatter__todo--${t}" data-status="${t}">`, `<span class="md-plan-frontmatter__icon md-plan-frontmatter__icon--${t}" aria-hidden="true"></span>`, '<span class="md-plan-frontmatter__todo-body">', `<span class="md-plan-frontmatter__todo-content">${$(e.content)}</span>`, `<span class="md-plan-frontmatter__status-label">${$(n)}</span>`, "</span>", "</li>"].join("");
}
function _t(e) {
  const t = e.todos.filter((a) => a.status === "completed").length, n = e.todos.length, r = n > 0 ? `${t}/${n}` : "0/0", i = e.isProject ? '<span class="md-plan-frontmatter__badge" data-md-plan-project="1">Project</span>' : "", s = e.overview ? `<p class="md-plan-frontmatter__overview">${$(e.overview)}</p>` : "", o = e.todos.length ? ['<ul class="md-plan-frontmatter__todos">', ...e.todos.map(wt), "</ul>"].join("") : '<p class="md-plan-frontmatter__empty">No todos</p>';
  return ['<div class="md-plan-frontmatter" data-md-plan="1" role="region" aria-label="Plan">', '<div class="md-plan-frontmatter__header">', `<div class="md-plan-frontmatter__name" role="heading" aria-level="2">${$(e.name)}</div>`, '<div class="md-plan-frontmatter__meta">', i, `<span class="md-plan-frontmatter__progress" data-md-plan-progress="1">${$(r)}</span>`, "</div>", "</div>", s, o, "</div>"].join("");
}
function bt(e) {
  if (e.lineMax < 2) return -1;
  const t = e.bMarks[0] + e.tShift[0], n = e.eMarks[0], r = e.src.slice(t, n);
  if (!/^---[ \t]*$/.test(r)) return -1;
  for (let i = 1; i < e.lineMax; i += 1) {
    const s = e.bMarks[i] + e.tShift[i], o = e.eMarks[i], a = e.src.slice(s, o);
    if (/^---[ \t]*$/.test(a)) return i + 1;
  }
  return -1;
}
function yt(e, t, n, r) {
  if (t !== 0) return false;
  const i = bt(e);
  if (i < 0) return false;
  const s = e.bMarks[0];
  let o = e.eMarks[i - 1];
  e.src[o] === "\r" && (o += 1), e.src[o] === `
` && (o += 1);
  const a = e.src.slice(s, o), l = ut(a);
  if (!l) return false;
  const c = ft(l.yaml);
  if (!c) return false;
  if (r) return true;
  const u = e.push("html_block", "", 0);
  return u.content = _t(c), u.map = [t, i], u.markup = "---", u.block = true, e.line = i, true;
}
const kt = ["paragraph", "reference", "blockquote", "list"];
function me(e) {
  const t = yt, n = { alt: [...kt] };
  try {
    e.block.ruler.before("hr", "plan_frontmatter", t, n);
  } catch {
    e.block.ruler.before("fence", "plan_frontmatter", t, n);
  }
}
const ie = 42;
function xt(e, t) {
  const n = e.pos, r = e.posMax, i = e.src;
  if (n + 3 > r || i.charCodeAt(n) !== ie || i.charCodeAt(n + 1) !== ie) return false;
  const s = i.indexOf("**", n + 2);
  if (s === -1 || s === n + 2) return false;
  if (t) return e.pos = s + 2, true;
  const o = e.push("strong_open", "strong", 1);
  o.markup = "**";
  const a = n + 2, l = e.posMax;
  e.pos = a, e.posMax = s, e.md.inline.tokenize(e), e.posMax = l, e.pos = s + 2;
  const c = e.push("strong_close", "strong", -1);
  return c.markup = "**", true;
}
function St(e) {
  e.inline.ruler.before("emphasis", "better_strong", xt), e.renderer.rules.strong_open = () => "<b>", e.renderer.rules.strong_close = () => "</b>";
}
const pe = /^Mermaid!\[\]\((data:image\/[^)]+)\)\s*$/i, fe = /^!\[\]\((data:image\/[^)]+)\)\s*$/i, H = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{48,}/i;
function z(e) {
  return /^mermaid$/i.test(e.trim());
}
function ge(e, t) {
  const n = t.trim();
  return pe.test(n) || z(e) && fe.test(n) || z(e) && H.test(n) ? true : /^Mermaid!\[\]\(/i.test(n) && H.test(n);
}
function we(e) {
  const t = e.trim(), n = pe.exec(t);
  if (n == null ? void 0 : n[1]) return n[1];
  const r = fe.exec(t);
  return (r == null ? void 0 : r[1]) ? r[1] : null;
}
function Mt(e) {
  var _a;
  return ((_a = /^data:image\/([a-z0-9.+-]+)/i.exec(e)) == null ? void 0 : _a[1]) ?? "image";
}
function vt(e) {
  const t = Math.round(e * 3 / 4);
  return t >= 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)}MB` : t >= 1024 ? `${Math.max(1, Math.round(t / 1024))}KB` : `${t}B`;
}
function It(e) {
  var _a;
  const t = e.trim(), n = we(t);
  if (n) {
    const i = ((_a = n.match(/;base64,([A-Za-z0-9+/=]+)/i)) == null ? void 0 : _a[1]) ?? "";
    return `![](\u2026${Mt(n)} ${vt(i.length)}\u2026)`;
  }
  if (H.test(t)) return "\u2026base64 payload\u2026";
  const r = t.split(`
`).length;
  return r > 1 ? `${r} lines` : t.length > 48 ? `${t.slice(0, 40)}\u2026` : t;
}
function Qt(e, t, n) {
  const r = e.slice(t, n), i = /^```([^\n]*)\n([\s\S]*)\n?```$/.exec(r);
  if (!i) return null;
  const s = i[1] ?? "", o = i[2] ?? "";
  if (!ge(s, o)) return null;
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
const re = /^```mermaid\b([^\n]*)\r?\n/gim;
function At(e) {
  const t = String(e ?? "").trim();
  if (!t) return { width: null, height: null };
  let n = null, r = null;
  const i = t.split(/\s+/).filter(Boolean), s = /^mermaid$/i.test(i[0] ?? "") ? 1 : 0;
  for (let o = s; o < i.length; o += 1) {
    const a = i[o] ?? "", l = /^(\d+)x(\d+)$/i.exec(a);
    if (l) {
      n = v(l[1]), r = v(l[2]);
      continue;
    }
    if (/^\d+$/.test(a) && n == null) {
      n = v(a);
      continue;
    }
    const c = /^([a-zA-Z_]+)=(.*)$/.exec(a);
    if (!c) continue;
    const u = (c[1] ?? "").toLowerCase(), d = v(c[2]);
    d && (u === "w" || u === "width" ? n = d : (u === "h" || u === "height") && (r = d));
  }
  return { width: n, height: r };
}
function Et(e) {
  const t = ["mermaid"];
  return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), t.join(" ");
}
function _e(e) {
  const t = [];
  return e.width && t.push(`width:${e.width}`), e.height && t.push(`height:${e.height}`), t.length ? `${t.join(";")};` : null;
}
function Ut(e, t) {
  const n = [];
  for (const r of e.querySelectorAll(".md-editor-mermaid")) r.closest(".haim-mermaid-embed-source") || r.closest(".export-pdf-staging") || r.getAttribute("data-processed") != null && n.push(r);
  return n.findIndex((r) => r === t);
}
function $t(e, { occurrence: t = 0, width: n = null, height: r = null }) {
  const i = String(e ?? ""), s = [];
  re.lastIndex = 0;
  let o;
  for (; (o = re.exec(i)) !== null; ) s.push({ index: o.index, full: o[0], infoTail: o[1] ?? "" });
  const a = s[t];
  if (!a) return { markdown: i, updated: false };
  const c = `\`\`\`${Et({ width: n ? v(n) : null, height: r ? v(r) : null })}
`;
  return c === a.full ? { markdown: i, updated: false } : { markdown: i.slice(0, a.index) + c + i.slice(a.index + a.full.length), updated: true };
}
const ae = /([\w-]+)="([^"]*)"/g, oe = /^```mermaid\b([^\n]*)\r?\n/gim, Ct = /<!--\s*mermaid-size\s+([^>]*?)-->[ \t]*(?:\r?\n[ \t]*)*$/i, Tt = /^<!--\s*mermaid-size\s+([^>]*?)-->\s*$/i;
function se(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/\r\n/g, `
`).replace(/\n/g, "&#10;").replace(/\r/g, "");
}
function Pt(e) {
  return String(e ?? "").replace(/&#10;/g, `
`).replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function be(e) {
  const t = {};
  ae.lastIndex = 0;
  let n;
  for (; (n = ae.exec(e)) !== null; ) {
    const s = n[1], o = n[2];
    !s || o == null || (t[s] = Pt(o));
  }
  const r = v(t.width || t.w || ""), i = v(t.height || t.h || "");
  return !r && !i ? null : { width: r, height: i };
}
function Rt(e) {
  const t = ["<!-- mermaid-size"];
  return e.width && t.push(`width="${se(e.width)}"`), e.height && t.push(`height="${se(e.height)}"`), t.push("-->"), t.join(" ");
}
function Lt(e, t) {
  if (t <= 0) return null;
  const r = e.slice(0, t).match(Ct);
  if (!r || r.index == null || !r[1]) return null;
  const i = be(r[1]);
  return i ? { size: i, start: r.index, end: r.index + r[0].length } : null;
}
function le(e) {
  const t = [], n = new RegExp(oe.source, oe.flags);
  let r;
  for (; (r = n.exec(e)) !== null; ) t.push(r.index);
  return t;
}
const Ht = /^```mermaid[^\n]*\r?\n([\s\S]*?)^```/gm;
function Yt(e, t, n = 0) {
  const r = String(t ?? "").trim();
  if (!r) return -1;
  const i = [], s = new RegExp(Ht.source, "gm");
  let o = 0, a;
  for (; (a = s.exec(e)) !== null; ) (a[1] || "").trim() === r && i.push(o), o += 1;
  return i[n] ?? i[0] ?? -1;
}
function ye(e, t) {
  for (let n = t - 1; n >= 0; n -= 1) {
    const r = e[n] ?? "";
    if (!r.trim()) continue;
    const i = Tt.exec(r.trim());
    if (!i) break;
    return be(i[1] ?? "");
  }
  return null;
}
function ke(e, t) {
  const n = At(e);
  return !(t == null ? void 0 : t.width) && !(t == null ? void 0 : t.height) ? n : { width: t.width ?? n.width, height: t.height ?? n.height };
}
function Vt(e, { occurrence: t = 0, width: n = null, height: r = null }) {
  const i = String(e ?? "");
  if (le(i)[t] == null) return { markdown: i, updated: false };
  const a = n ? v(n) : null, l = r ? v(r) : null;
  let c = i, u = false;
  const d = $t(c, { occurrence: t, width: null, height: null });
  d.updated && (c = d.markdown, u = true);
  const p = le(c)[t];
  if (p == null) return { markdown: c, updated: u };
  const f = Lt(c, p);
  if (!a && !l) return f && (c = c.slice(0, f.start) + c.slice(f.end), u = true), { markdown: c, updated: u };
  const _ = Rt({ width: a, height: l });
  if (f) {
    const k = c.slice(0, f.start) + _ + c.slice(f.end);
    k !== c && (c = k, u = true);
  } else {
    const b = `${p > 0 && c[p - 1] !== `
` ? `
` : ""}${_}
`;
    c = c.slice(0, p) + b + c.slice(p), u = true;
  }
  return { markdown: c, updated: u };
}
const N = "md-editor";
function xe(e, t) {
  var _a, _b, _c;
  if (!e.map || e.level !== 0) return true;
  const n = e.map[1] - 1;
  return !!((_c = (_b = (_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a[n]) == null ? void 0 : _b.trim()) == null ? void 0 : _c.startsWith("```"));
}
function T(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function Se(e, t, n) {
  var _a;
  const r = n != null && ((_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a.length) ? ye(t.srcLines, n) : null, i = ke(e, r), s = [];
  if (i.width && s.push(`data-mermaid-width="${T(i.width)}"`), i.height && s.push(`data-mermaid-height="${T(i.height)}"`), i.width || i.height) {
    s.push('data-mermaid-sized="1"');
    const o = _e(i);
    o && s.push(`style="${T(o)}max-width:100%;overflow:hidden;"`);
  }
  return s;
}
function zt(e, t, n, r) {
  var _a;
  const i = (_a = e.map) == null ? void 0 : _a[0], s = [`class="${N}-mermaid"`, `data-mermaid-theme="${n}"`, 'data-haim-mermaid-lazy="1"', ...Se(r, t, typeof i == "number" ? i : void 0)];
  return e.map && e.level === 0 && (s.push(`data-closed="${String(xe(e, t))}"`), s.push(`data-line="${String(e.map[0])}"`)), s.join(" ");
}
function ce(e, t, n, r, i) {
  const s = e.utils.escapeHtml(r), o = e.utils.escapeHtml(n);
  return `<div class="haim-mermaid-embed" data-haim-mermaid-embed="1"><details class="md-editor-code haim-mermaid-embed-source"><summary class="md-editor-code-head"><span class="md-editor-code-lang">${e.utils.escapeHtml(t)}</span><span class="haim-mermaid-embed-summary">${o}</span></summary><pre class="haim-mermaid-embed-pre"><code>${s}</code></pre></details><div class="haim-mermaid-embed-render">${i}</div></div>`;
}
function Nt(e) {
  const t = e.renderer.rules.fence;
  e.renderer.rules.fence = (n, r, i, s, o) => {
    var _a, _b;
    const a = n[r];
    if (!a) return t ? t(n, r, i, s, o) : o.renderToken(n, r, i);
    const l = a.info.trim(), c = l.split(/\s+/)[0] ?? "", d = a.content.trim(), p = z(c), f = ge(c, d);
    if (!p && !f) return t ? t(n, r, i, s, o) : o.renderToken(n, r, i);
    const _ = s, k = Ge(), b = we(d), M = p ? "mermaid" : "Mermaid", y = It(d), h = (_a = a.map) == null ? void 0 : _a[0], w = Se(l, _, typeof h == "number" ? h : void 0);
    if (b) {
      const m = `<p class="${N}-mermaid haim-mermaid-image-embed" data-processed="" data-haim-mermaid-image="1"${w.length ? ` ${w.join(" ")}` : ""}><img src="${T(b)}" alt="Mermaid" class="haim-mermaid-embed-img" /></p>`;
      return ce(e, M, y, d, m);
    }
    if (f) {
      const x = `<div ${zt(a, _, k, l)}></div>`;
      return ce(e, M, y, d, x);
    }
    a.attrSet("class", `${N}-mermaid`), a.attrSet("data-mermaid-theme", k), a.attrSet("data-haim-mermaid-lazy", "1");
    const g = ke(l, typeof h == "number" && ((_b = _ == null ? void 0 : _.srcLines) == null ? void 0 : _b.length) ? ye(_.srcLines, h) : null);
    if (g.width && a.attrSet("data-mermaid-width", g.width), g.height && a.attrSet("data-mermaid-height", g.height), g.width || g.height) {
      a.attrSet("data-mermaid-sized", "1");
      const m = _e(g);
      m && a.attrSet("style", `${m}max-width:100%;overflow:hidden;`);
    }
    return a.map && a.level === 0 && (a.attrSet("data-closed", String(xe(a, _))), a.attrSet("data-line", String(a.map[0]))), `<div ${o.renderAttrs(a)}>${e.utils.escapeHtml(d)}</div>`;
  };
}
const Ot = { br: [], pgbr: [], div: ["class", "data-md-pgbr", "data-md-plan", "data-note-cover-placeholder", "data-note-cover-mount", "data-note-cover-preview", "data-color-mode", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style", "role", "tabindex", "aria-label", "aria-level"], span: ["class", "data-md-pgbr", "data-md-plan-project", "data-md-plan-progress", "aria-hidden", "data-note-cover-fallback"], p: ["class", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style"], details: ["class", "open", "data-haim-mermaid-embed"], summary: ["class"], ul: ["class"], li: ["class", "id", "data-status", "data-md-footnote-id", "data-md-footnote-label"], h6: ["id", "class", "data-heading-level"], a: ["href", "class", "id", "target", "rel", "data-chat-saved-note", "data-chat-href", "data-chat-id", "data-md-footnote-to", "data-md-footnote-id", "data-md-footnote-title", "aria-label", "title"], sup: ["class"], sub: ["class"], b: [], section: ["class"], hr: ["class"], ol: ["class"], table: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], thead: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tbody: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tfoot: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tr: ["class", "style"], th: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], td: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], img: ["src", "alt", "title", "class", "style", "width", "height", "data-wiki-path", "data-wiki-width", "data-wiki-height", "data-md-src", "data-md-width", "data-md-height", "data-storage-image"], input: ["type", "checked", "disabled", "class", "id"], label: ["class", "for"] }, Me = [{ type: "better_md", plugin: St, options: {} }, { type: "heading_levels", plugin: B, options: {} }, { type: "wiki_image", plugin: Ye, options: {} }, { type: "preview_link_target_blank", plugin: Ve, options: {} }, { type: "pgbr", plugin: tt, options: {} }, { type: "chat_saved_note", plugin: ct, options: {} }, { type: "note_cover_placeholder", plugin: Fe, options: {} }, { type: "haim_table", plugin: Ue, options: {} }, { type: "plan_frontmatter", plugin: me, options: {} }, { type: "mermaid", plugin: Nt, options: {} }];
function Bt(e) {
  e.set({ html: true, breaks: true, linkify: true }), e.linkify && e.linkify.set({ fuzzyLink: true });
}
function Zt(e, t = {}) {
  Bt(e), t.xss !== false && Ie(e, { extendedWhiteList: Ot }), Oe(e);
}
function Ft(e) {
  let t = e;
  for (const n of Me) t.some((r) => r.type === n.type) || (t = [...t, n]);
  return t;
}
function Jt(e) {
  for (const t of Me) e.use(t.plugin, t.options);
}
function en(e) {
  return Ft(e);
}
function tn(e) {
  B(e);
}
function nn(e) {
  B(e), me(e);
}
export {
  nn as a,
  tn as b,
  Zt as c,
  Jt as d,
  en as e,
  Yt as f,
  Ut as g,
  Qt as m,
  Vt as u
};
