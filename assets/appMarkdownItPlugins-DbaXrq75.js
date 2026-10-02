import { N as $e } from "./vendor-md-editor-X93Ii6bV.js";
import { e6 as Ee, aW as G, e7 as Ce, t as Te, e8 as Pe, x as Le, w as W, y as L, z as R, aT as Re, e9 as q, a5 as Oe, a7 as K, ea as He, eb as ze, ec as Ne, ed as X, ee as U, ef as Be, aU as v, eg as Fe } from "./index-_Cgkc3J6.js";
import { p as je } from "./wikiImageResolver-DqdWG2ay.js";
import { t as De, p as Ge, n as We } from "./taskCheckboxStatus-DlXLsCJg.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import { e as qe, r as Ke } from "./styleResolve-BZlLX4oW.js";
import { r as Xe } from "./mermaidTheme-Deyx0OD8.js";
const Ue = /^<!--\s*haim-table\b/;
function O(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : Ue.test(String(e.content || "").trim());
}
function Ye(e) {
  const t = /<!--\s*haim-table\s*([\s\S]*?)-->/.exec(e);
  return t ? Ce(t[1] ?? "") ?? G() : G();
}
function Ve(e, t) {
  var _a, _b;
  for (let n = t; n < Math.min(e.length, t + 8); n += 1) {
    if (((_a = e[n]) == null ? void 0 : _a.type) === "table_open") {
      for (let a = n + 1; a < e.length; a += 1) if (((_b = e[a]) == null ? void 0 : _b.type) === "table_close") return { start: n, end: a };
      return null;
    }
    const r = e[n];
    if (r && !(r.type === "paragraph_open" || r.type === "paragraph_close") && !(r.type === "inline" && !String(r.content || "").trim()) && !(r.type === "html_block" || r.type === "html_inline") && !r.hidden && r.type !== "table_open") return null;
  }
  return null;
}
function Ze(e, t, n) {
  const r = [];
  let a = t + 1;
  for (; a < n; ) {
    const s = e[a];
    if (!s) break;
    if (s.type === "tr_open") {
      const o = { openIdx: a, closeIdx: -1, cells: [] };
      for (a += 1; a < n; ) {
        const i = e[a];
        if (!i) break;
        if (i.type === "tr_close") {
          o.closeIdx = a, a += 1;
          break;
        }
        if (i.type === "th_open" || i.type === "td_open") {
          const l = a;
          let c = -1, u = -1;
          for (a += 1; a < n; ) {
            const d = e[a];
            if (!d) break;
            if (d.type === "inline" && (c = a), d.type === "th_close" || d.type === "td_close") {
              u = a, a += 1;
              break;
            }
            a += 1;
          }
          u >= 0 && o.cells.push({ openIdx: l, closeIdx: u, inlineIdx: c });
          continue;
        }
        a += 1;
      }
      r.push(o);
      continue;
    }
    a += 1;
  }
  return r;
}
function Qe(e, t, n, r, a, s) {
  var _a, _b;
  const o = e.tokens, i = Ze(o, n, r);
  if (!i.length) {
    o[t] && (o[t].hidden = true, o[t].content = "");
    return;
  }
  const l = i.length, c = Math.max(1, ...i.map((h) => h.cells.length)), u = Te(a.merges), d = qe(a, l), p = Math.min(Math.max(0, a.footerRows), Math.max(0, l - d));
  (_a = o[n]) == null ? void 0 : _a.attrSet("data-haim-table", "1"), a.noHeader && ((_b = o[n]) == null ? void 0 : _b.attrSet("data-haim-no-header", "1")), o[n] && Pe((h, b) => o[n].attrSet(h, b), a, o[n].attrGet("style"));
  for (let h = 0; h < i.length; h += 1) {
    const b = i[h];
    for (let m = 0; m < b.cells.length; m += 1) {
      const x = b.cells[m], S = o[x.openIdx];
      if (!S) continue;
      if (u.has(`${h},${m}`)) {
        S.hidden = true, x.inlineIdx >= 0 && o[x.inlineIdx] && (o[x.inlineIdx].hidden = true), o[x.closeIdx] && (o[x.closeIdx].hidden = true);
        continue;
      }
      const I = Le(a.merges, h, m);
      I && (I.colspan > 1 && S.attrSet("colspan", String(I.colspan)), I.rowspan > 1 && S.attrSet("rowspan", String(I.rowspan)));
      const Ae = Ke({ row: h, col: m, rowCount: l, colCount: c, meta: a, template: s });
      let $ = W(Ae);
      const j = L(a.colWidths, m);
      j && ($ = R($, `width:${j}`));
      const D = L(a.rowHeights, h);
      D && ($ = R($, `height:${D}`)), $ && S.attrSet("style", $), S.attrSet("data-haim-r", String(h)), S.attrSet("data-haim-c", String(m));
    }
    const g = L(a.rowHeights, h);
    if (g && o[b.openIdx]) {
      const m = o[b.openIdx];
      m.attrSet("style", R(m.attrGet("style"), `height:${g}`));
    }
  }
  const f = i.slice(0, d), w = i.slice(d, l - p), y = p > 0 ? i.slice(l - p) : [];
  for (const h of f) for (const b of h.cells) {
    const g = o[b.openIdx], m = o[b.closeIdx];
    g && (g.tag = "th", g.type = "th_open"), m && (m.tag = "th", m.type = "th_close");
  }
  for (const h of [...w, ...y]) for (const b of h.cells) {
    const g = o[b.openIdx], m = o[b.closeIdx];
    g && (g.tag = "td", g.type = "td_open"), m && (m.tag = "td", m.type = "td_close");
  }
  const k = [], M = (h, b) => {
    if (!b.length) return;
    const g = new e.Token(`${h}_open`, h, 1), m = W(a.sections[h] ?? {}, { includeOuterBorder: true });
    m && g.attrSet("style", m), g.attrSet("data-haim-section", h), k.push(g);
    for (const x of b) for (let S = x.openIdx; S <= x.closeIdx; S += 1) {
      const I = o[S];
      I && k.push(I);
    }
    k.push(new e.Token(`${h}_close`, h, -1));
  };
  M("thead", f), M("tbody", w), M("tfoot", y);
  const _ = [...o.slice(0, n + 1), ...k, ...o.slice(r)];
  if (t >= 0 && t < _.length && O(_[t])) _[t].hidden = true, _[t].content = "";
  else for (const h of _) O(h) && (h.hidden = true, h.content = "");
  e.tokens.length = 0, e.tokens.push(..._);
}
function Je(e) {
  e.core.ruler.after("block", "haim_table", (t) => {
    for (let n = 0; n < 50; n += 1) {
      let r = null;
      for (let s = 0; s < t.tokens.length; s += 1) {
        const o = t.tokens[s];
        if (!o || !O(o) || o.hidden) continue;
        const i = Ye(o.content), l = Ve(t.tokens, s + 1);
        if (l) {
          r = { commentIdx: s, tableStart: l.start, tableEnd: l.end, meta: i };
          break;
        }
      }
      if (!r) break;
      const a = r.meta.templateId ? Ee(r.meta.templateId) : null;
      Qe(t, r.commentIdx, r.tableStart, r.tableEnd, r.meta, a);
    }
  });
}
const Y = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
function V(e) {
  const t = je(e);
  return !t || t.startsWith("blob:") || t.startsWith("data:") ? Y : t;
}
function Z(e) {
  return e ? [e[0], e[1]] : null;
}
function et(e) {
  const t = /!\[\[([^[\]]+)\]\]/g;
  e.core.ruler.push("wiki-image", (n) => {
    n.src && /!\[\[/.test(n.src), n.tokens.forEach((r) => {
      if (r.type !== "inline" || !r.children) return;
      const a = [];
      r.children.forEach((s) => {
        if (s.type !== "text") {
          a.push(s);
          return;
        }
        const o = s.content;
        let i = 0;
        t.lastIndex = 0;
        let l;
        for (; (l = t.exec(o)) !== null; ) {
          if (l.index > i) {
            const f = new n.Token("text", "", 0);
            f.content = o.slice(i, l.index), a.push(f);
          }
          const c = Re(l[1]), u = c == null ? void 0 : c.path;
          if (!u) {
            const f = new n.Token("text", "", 0);
            f.content = l[0], a.push(f), i = l.index + l[0].length;
            continue;
          }
          const d = new n.Token("wiki_image", "img", 0);
          d.attrSet("data-wiki-path", u), (c == null ? void 0 : c.width) && d.attrSet("data-wiki-width", c.width), (c == null ? void 0 : c.height) && d.attrSet("data-wiki-height", c.height), (c == null ? void 0 : c.background) && d.attrSet("data-wiki-bg", c.background);
          const p = q(c ?? {});
          p && d.attrSet("style", p), d.attrSet("src", V(u)), d.attrSet("alt", ""), a.push(d), i = l.index + l[0].length;
        }
        if (i < o.length) {
          const c = new n.Token("text", "", 0);
          c.content = o.slice(i), a.push(c);
        }
      }), a.length, r.children.length, r.children = a;
    });
  }), e.core.ruler.after("wiki-image", "wiki-image-caption-inline", (n) => {
    const r = n.tokens;
    if (!r || r.length < 3) return;
    const a = [];
    let s = false;
    for (let o = 0; o < r.length; o += 1) {
      const i = r[o], l = r[o + 1], c = r[o + 2];
      if (!i || !l || !c) {
        i && a.push(i);
        continue;
      }
      if (i.type !== "paragraph_open" || l.type !== "inline" || c.type !== "paragraph_close") {
        a.push(i);
        continue;
      }
      const u = l.children || [];
      if (u.length < 3) {
        a.push(i);
        continue;
      }
      const d = u[0], p = u[1], f = p != null && (p.type === "softbreak" || p.type === "hardbreak");
      if (!d || d.type !== "wiki_image" || !f) {
        a.push(i);
        continue;
      }
      const w = u.slice(2);
      if (!w.some((m) => m.type === "text" && m.content && m.content.trim())) {
        a.push(i);
        continue;
      }
      const k = new n.Token("figure_open", "figure", 1);
      k.block = true, k.map = Z(i.map);
      const M = new n.Token("inline", "", 0);
      M.children = [d], M.level = (i.level || 0) + 1;
      const _ = new n.Token("figcaption_open", "figcaption", 1);
      _.block = true, _.level = (i.level || 0) + 1;
      const h = new n.Token("inline", "", 0);
      h.children = w, h.level = (i.level || 0) + 2;
      const b = new n.Token("figcaption_close", "figcaption", -1);
      b.block = true, b.level = (i.level || 0) + 1;
      const g = new n.Token("figure_close", "figure", -1);
      g.block = true, g.level = i.level || 0, a.push(k, M, _, h, b, g), s = true, o += 2;
    }
    s && (n.tokens = a);
  }), e.core.ruler.after("wiki-image-caption-inline", "wiki-image-caption", (n) => {
    const r = n.tokens;
    if (!r || r.length < 6) return;
    const a = [];
    let s = false;
    for (let o = 0; o < r.length; o += 1) {
      const i = r[o], l = r[o + 1], c = r[o + 2], u = r[o + 3], d = r[o + 4], p = r[o + 5];
      if (!(i != null && l != null && c != null && u != null && d != null && p != null && i.type === "paragraph_open" && l.type === "inline" && c.type === "paragraph_close" && u.type === "paragraph_open" && d.type === "inline" && p.type === "paragraph_close") || !i || !l || !d) {
        i && a.push(i);
        continue;
      }
      const w = l.children || [], y = w[0];
      if (w.length !== 1 || !y || y.type !== "wiki_image") {
        a.push(i);
        continue;
      }
      const k = d.children || [];
      if (!k.some((S) => S.type === "text" && S.content && S.content.trim())) {
        a.push(i);
        continue;
      }
      const _ = new n.Token("figure_open", "figure", 1);
      _.block = true, _.map = Z(i.map);
      const h = new n.Token("inline", "", 0);
      h.children = w, h.level = (i.level || 0) + 1;
      const b = new n.Token("figcaption_open", "figcaption", 1);
      b.block = true, b.level = (i.level || 0) + 1;
      const g = new n.Token("inline", "", 0);
      g.children = k, g.level = (i.level || 0) + 2;
      const m = new n.Token("figcaption_close", "figcaption", -1);
      m.block = true, m.level = (i.level || 0) + 1;
      const x = new n.Token("figure_close", "figure", -1);
      x.block = true, x.level = i.level || 0, a.push(_, h, b, g, m, x), s = true, o += 5;
    }
    s && (n.tokens = a);
  }), e.core.ruler.after("wiki-image-caption", "markdown-image-size-attrs", (n) => {
    n.tokens.forEach((r) => {
      var _a;
      if (r.type !== "inline" || !((_a = r.children) == null ? void 0 : _a.length)) return;
      const a = [], s = r.children;
      for (let o = 0; o < s.length; o += 1) {
        const i = s[o];
        if (!i) continue;
        if (i.type !== "image") {
          a.push(i);
          continue;
        }
        const l = i.attrGet("src"), c = l == null ? null : String(l);
        if (c && i.attrSet("data-md-src", c), c && Oe(K(c))) {
          const d = K(c);
          i.attrSet("src", V(d)), i.attrSet("data-storage-image", "1");
        }
        const u = s[o + 1];
        if ((u == null ? void 0 : u.type) === "text") {
          const d = u.content || "", p = d.match(/^\{([^}\n]+)\}/);
          if (p) {
            const f = He(`{${p[1]}}`);
            f.width && i.attrSet("data-md-width", f.width), f.height && i.attrSet("data-md-height", f.height), f.background && i.attrSet("data-md-bg", f.background);
            const w = q(f);
            w && i.attrSet("style", w);
            const y = d.slice(p[0].length);
            if (y) {
              const k = new n.Token("text", "", 0);
              k.content = y, a.push(i, k);
            } else a.push(i);
            o += 1;
            continue;
          }
        }
        a.push(i);
      }
      r.children = a;
    });
  }), e.renderer.rules.wiki_image = (n, r, a, s, o) => {
    const i = n[r];
    return i ? `<img ${o.renderAttrs(i)}>` : "";
  };
}
function tt(e) {
  const t = e.renderer.rules.link_open || function(r, a, s, o, i) {
    return i.renderToken(r, a, s);
  };
  e.renderer.rules.link_open = function(r, a, s, o, i) {
    const l = r[a];
    if (!l) return t(r, a, s, o, i);
    const c = l.attrGet("href") || "";
    return !(l.attrGet("data-chat-saved-note") === "1") && ze(c) && (l.attrSet("target", "_blank"), l.attrSet("rel", "noopener noreferrer")), t(r, a, s, o, i);
  };
}
const T = /<pgbr\s*\/?\s*>/gi;
function B(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function nt(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function Q(e) {
  const t = new e.Token("html_inline", "", 0);
  return t.content = '<span class="md-pgbr" data-md-pgbr="1"></span>', t;
}
const ue = /<span class="md-pgbr"/;
function he(e) {
  let t = 0;
  for (const n of e.children || []) n.type === "html_inline" && (ue.test(n.content) || B(n.content)) && (t += 1);
  return t;
}
function at(e) {
  var _a;
  if (e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  for (const t of e.children) if (!(t.type === "softbreak" || t.type === "hardbreak") && !(t.type === "text" && !t.content.trim()) && !(t.type === "html_inline" && (ue.test(t.content) || B(t.content)))) return false;
  return he(e) > 0;
}
function J(e) {
  const t = new e.Token("html_block", "", 0);
  return t.content = '<div class="md-pgbr" data-md-pgbr="1"></div>', t.block = true, t;
}
function rt(e, t) {
  if (!(t == null ? void 0 : t.length)) return t;
  const n = [];
  for (const r of t) {
    if (r.type === "html_inline" && B(r.content)) {
      n.push(Q(e));
      continue;
    }
    if (r.type !== "text") {
      n.push(r);
      continue;
    }
    const a = r.content;
    if (T.lastIndex = 0, !T.test(a)) {
      n.push(r);
      continue;
    }
    let s = 0;
    T.lastIndex = 0;
    let o;
    for (; (o = T.exec(a)) !== null; ) {
      if (o.index > s) {
        const i = new e.Token("text", "", 0);
        i.content = a.slice(s, o.index), n.push(i);
      }
      n.push(Q(e)), s = o.index + o[0].length;
    }
    if (s < a.length) {
      const i = new e.Token("text", "", 0);
      i.content = a.slice(s), n.push(i);
    }
  }
  return n;
}
function it(e) {
  e.core.ruler.push("pgbr-mark", (t) => (t.tokens.forEach((n) => {
    n.type !== "inline" || !n.children || (n.children = rt(t, n.children));
  }), true)), e.core.ruler.after("pgbr-mark", "pgbr-unwrap-paragraph", (t) => {
    const { tokens: n } = t, r = [];
    let a = 0;
    for (; a < n.length; ) {
      if (a + 2 < n.length && n[a].type === "paragraph_open" && n[a + 1].type === "inline" && n[a + 2].type === "paragraph_close" && at(n[a + 1])) {
        const s = he(n[a + 1]);
        for (let o = 0; o < s; o += 1) r.push(J(t));
        a += 3;
        continue;
      }
      r.push(n[a]), a += 1;
    }
    return t.tokens = r, true;
  }), e.core.ruler.after("pgbr-unwrap-paragraph", "pgbr-normalize-html-block", (t) => (t.tokens = t.tokens.map((n) => n.type === "html_block" && nt(n.content) ? J(t) : n), true));
}
const ot = /<!--\s*chat-with-myself\s+[^>]*?-->/i, ee = /(?:^|\/)chat(?:\/)?(?:#|%23)msg-/i, st = /채팅으로\s*이동|채팅에서\s*저장된\s*노트/;
function te(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function me(e) {
  return ot.test(e || "") ? Ne(e) : null;
}
function lt(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : !!me(e.content);
}
function ct(e, t) {
  var _a;
  if (((_a = e[t]) == null ? void 0 : _a.type) !== "blockquote_open") return -1;
  let n = 0;
  for (let r = t; r < e.length; r += 1) {
    const a = e[r];
    if (a.type === "blockquote_open") n += 1;
    else if (a.type === "blockquote_close" && (n -= 1, n === 0)) return r + 1;
  }
  return -1;
}
function dt(e) {
  var _a;
  if (!e || e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  let t = "", n = "", r = false;
  for (const a of e.children) if (!(a.type === "softbreak" || a.type === "hardbreak") && !(a.type === "text" && !String(a.content || "").trim())) {
    if (a.type === "link_open") {
      if (r) return false;
      r = true, t = a.attrGet("href") || "";
      continue;
    }
    if (a.type === "text" && r && !n) {
      n = a.content || "";
      continue;
    }
    if (a.type !== "link_close") return false;
  }
  return !(!r || !ee.test(t) && !/#msg-/.test(t) || n && !st.test(n) && !ee.test(t) && !/#msg-/.test(t));
}
function ut(e, t) {
  var _a, _b, _c;
  return ((_a = e[t]) == null ? void 0 : _a.type) !== "paragraph_open" || ((_b = e[t + 1]) == null ? void 0 : _b.type) !== "inline" || ((_c = e[t + 2]) == null ? void 0 : _c.type) !== "paragraph_close" || !dt(e[t + 1]) ? -1 : t + 3;
}
function ht(e) {
  const t = te(e.href || "/chat"), n = te(e.id || "");
  return [`<a class="md-chat-saved-note" href="${t}" data-chat-saved-note="1" data-chat-href="${t}" data-chat-id="${n}">`, '<span class="md-chat-saved-note__icon" aria-hidden="true"></span>', '<span class="md-chat-saved-note__body">', '<span class="md-chat-saved-note__title">\uCC44\uD305\uC5D0\uC11C \uC800\uC7A5\uB41C \uB178\uD2B8</span>', '<span class="md-chat-saved-note__hint">\uD0ED\uD558\uC5EC \uC6D0\uBCF8 \uCC44\uD305\uC73C\uB85C \uC774\uB3D9</span>', "</span>", '<span class="md-chat-saved-note__arrow" aria-hidden="true">\u2192</span>', "</a>"].join("");
}
function mt(e) {
  e.core.ruler.after("inline", "chat-saved-note", (t) => {
    const { tokens: n } = t;
    if (!(n == null ? void 0 : n.length)) return;
    const r = [];
    let a = 0;
    for (; a < n.length; ) {
      if (!lt(n[a])) {
        r.push(n[a]), a += 1;
        continue;
      }
      const s = me(n[a].content);
      let o = a + 1;
      const i = ct(n, o);
      i > o && (o = i);
      const l = ut(n, o);
      l > o && (o = l);
      const c = new t.Token("html_block", "", 0);
      c.content = ht(s), c.block = true, r.push(c), a = o;
    }
    t.tokens = r;
  });
}
function ne(e) {
  return e === 9 || e === 32;
}
function pt(e, t, n, r) {
  let a = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return false;
  let o = e.src.charCodeAt(a);
  if (o !== 35 || a >= s) return false;
  let i = 1;
  for (o = e.src.charCodeAt(++a); o === 35 && a < s && i < X; ) i += 1, o = e.src.charCodeAt(++a);
  if (i > X || a < s && !ne(o)) return false;
  if (r) return true;
  s = e.skipSpacesBack(s, a);
  const l = e.skipCharsBack(s, 35, a);
  l > a && ne(e.src.charCodeAt(l - 1)) && (s = l), e.line = t + 1;
  const c = "#".repeat(i), u = i <= U ? `h${i}` : "h6", d = e.push("heading_open", u, 1);
  d.markup = c, d.map = [t, e.line], i > U && (d.attrSet("data-heading-level", String(i)), d.attrSet("class", `md-heading md-heading-${i}`));
  const p = e.push("inline", "", 0);
  p.content = e.src.slice(a, s).trim(), p.map = [t, e.line], p.children = [];
  const f = e.push("heading_close", u, -1);
  return f.markup = c, true;
}
function F(e) {
  e.block.ruler.at("heading", pt);
}
const ae = /^---[ \t]*\r?\n/;
function ft(e) {
  const t = String(e ?? "");
  if (!ae.test(t)) return null;
  const n = t.replace(ae, ""), r = n.match(/\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!r || r.index == null) return null;
  const a = n.slice(0, r.index), s = t.length - n.length + r.index + r[0].length;
  return { yaml: a, bodyOffset: s };
}
function A(e) {
  if (typeof e != "string") return null;
  const t = e.trim();
  return t || null;
}
function gt(e) {
  const t = String(e ?? "").trim().toLowerCase().replace(/_/g, "-");
  return t === "completed" || t === "complete" || t === "done" ? "completed" : t === "in-progress" || t === "inprogress" || t === "progress" ? "in_progress" : t === "cancelled" || t === "canceled" ? "cancelled" : t === "error" || t === "failed" || t === "fail" ? "error" : "pending";
}
function bt(e, t) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const n = e, r = A(n.content) ?? A(n.title);
  return r ? { id: A(n.id) ?? `todo-${t + 1}`, content: r, status: gt(n.status) } : null;
}
function wt(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return false;
  const t = e;
  return !(!Array.isArray(t.todos) || t.name != null && typeof t.name != "string" && typeof t.name != "number");
}
function kt(e) {
  let t;
  try {
    t = Be(String(e ?? ""));
  } catch {
    return null;
  }
  if (!wt(t)) return null;
  const n = [];
  for (let o = 0; o < t.todos.length; o += 1) {
    const i = bt(t.todos[o], o);
    i && n.push(i);
  }
  const r = A(t.name) ?? A(t.title) ?? "Plan", a = A(t.overview) ?? A(t.description) ?? "", s = t.isProject === true || t.is_project === true;
  return { name: r, overview: a, todos: n, isProject: s };
}
function C(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const _t = { pending: "Pending", in_progress: "In progress", completed: "Completed", cancelled: "Cancelled", error: "Error" };
function yt(e) {
  const t = e.status, n = _t[t];
  return [`<li class="md-plan-frontmatter__todo md-plan-frontmatter__todo--${t}" data-status="${t}">`, `<span class="md-plan-frontmatter__icon md-plan-frontmatter__icon--${t}" aria-hidden="true"></span>`, '<span class="md-plan-frontmatter__todo-body">', `<span class="md-plan-frontmatter__todo-content">${C(e.content)}</span>`, `<span class="md-plan-frontmatter__status-label">${C(n)}</span>`, "</span>", "</li>"].join("");
}
function xt(e) {
  const t = e.todos.filter((i) => i.status === "completed").length, n = e.todos.length, r = n > 0 ? `${t}/${n}` : "0/0", a = e.isProject ? '<span class="md-plan-frontmatter__badge" data-md-plan-project="1">Project</span>' : "", s = e.overview ? `<p class="md-plan-frontmatter__overview">${C(e.overview)}</p>` : "", o = e.todos.length ? ['<ul class="md-plan-frontmatter__todos">', ...e.todos.map(yt), "</ul>"].join("") : '<p class="md-plan-frontmatter__empty">No todos</p>';
  return ['<div class="md-plan-frontmatter" data-md-plan="1" role="region" aria-label="Plan">', '<div class="md-plan-frontmatter__header">', `<div class="md-plan-frontmatter__name" role="heading" aria-level="2">${C(e.name)}</div>`, '<div class="md-plan-frontmatter__meta">', a, `<span class="md-plan-frontmatter__progress" data-md-plan-progress="1">${C(r)}</span>`, "</div>", "</div>", s, o, "</div>"].join("");
}
function St(e) {
  if (e.lineMax < 2) return -1;
  const t = e.bMarks[0] + e.tShift[0], n = e.eMarks[0], r = e.src.slice(t, n);
  if (!/^---[ \t]*$/.test(r)) return -1;
  for (let a = 1; a < e.lineMax; a += 1) {
    const s = e.bMarks[a] + e.tShift[a], o = e.eMarks[a], i = e.src.slice(s, o);
    if (/^---[ \t]*$/.test(i)) return a + 1;
  }
  return -1;
}
function Mt(e, t, n, r) {
  if (t !== 0) return false;
  const a = St(e);
  if (a < 0) return false;
  const s = e.bMarks[0];
  let o = e.eMarks[a - 1];
  e.src[o] === "\r" && (o += 1), e.src[o] === `
` && (o += 1);
  const i = e.src.slice(s, o), l = ft(i);
  if (!l) return false;
  const c = kt(l.yaml);
  if (!c) return false;
  if (r) return true;
  const u = e.push("html_block", "", 0);
  return u.content = xt(c), u.map = [t, a], u.markup = "---", u.block = true, e.line = a, true;
}
const vt = ["paragraph", "reference", "blockquote", "list"];
function pe(e) {
  const t = Mt, n = { alt: [...vt] };
  try {
    e.block.ruler.before("hr", "plan_frontmatter", t, n);
  } catch {
    e.block.ruler.before("fence", "plan_frontmatter", t, n);
  }
}
const re = 42;
function It(e, t) {
  const n = e.pos, r = e.posMax, a = e.src;
  if (n + 3 > r || a.charCodeAt(n) !== re || a.charCodeAt(n + 1) !== re) return false;
  const s = a.indexOf("**", n + 2);
  if (s === -1 || s === n + 2) return false;
  if (t) return e.pos = s + 2, true;
  const o = e.push("strong_open", "strong", 1);
  o.markup = "**";
  const i = n + 2, l = e.posMax;
  e.pos = i, e.posMax = s, e.md.inline.tokenize(e), e.posMax = l, e.pos = s + 2;
  const c = e.push("strong_close", "strong", -1);
  return c.markup = "**", true;
}
function At(e) {
  e.inline.ruler.before("emphasis", "better_strong", It), e.renderer.rules.strong_open = () => "<b>", e.renderer.rules.strong_close = () => "</b>";
}
const fe = /^Mermaid!\[\]\((data:image\/[^)]+)\)\s*$/i, ge = /^!\[\]\((data:image\/[^)]+)\)\s*$/i, H = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{48,}/i;
function z(e) {
  return /^mermaid$/i.test(e.trim());
}
function be(e, t) {
  const n = t.trim();
  return fe.test(n) || z(e) && ge.test(n) || z(e) && H.test(n) ? true : /^Mermaid!\[\]\(/i.test(n) && H.test(n);
}
function we(e) {
  const t = e.trim(), n = fe.exec(t);
  if (n == null ? void 0 : n[1]) return n[1];
  const r = ge.exec(t);
  return (r == null ? void 0 : r[1]) ? r[1] : null;
}
function $t(e) {
  var _a;
  return ((_a = /^data:image\/([a-z0-9.+-]+)/i.exec(e)) == null ? void 0 : _a[1]) ?? "image";
}
function Et(e) {
  const t = Math.round(e * 3 / 4);
  return t >= 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)}MB` : t >= 1024 ? `${Math.max(1, Math.round(t / 1024))}KB` : `${t}B`;
}
function Ct(e) {
  var _a;
  const t = e.trim(), n = we(t);
  if (n) {
    const a = ((_a = n.match(/;base64,([A-Za-z0-9+/=]+)/i)) == null ? void 0 : _a[1]) ?? "";
    return `![](\u2026${$t(n)} ${Et(a.length)}\u2026)`;
  }
  if (H.test(t)) return "\u2026base64 payload\u2026";
  const r = t.split(`
`).length;
  return r > 1 ? `${r} lines` : t.length > 48 ? `${t.slice(0, 40)}\u2026` : t;
}
function un(e, t, n) {
  const r = e.slice(t, n), a = /^```([^\n]*)\n([\s\S]*)\n?```$/.exec(r);
  if (!a) return null;
  const s = a[1] ?? "", o = a[2] ?? "";
  if (!be(s, o)) return null;
  let i = t;
  for (; i < n && e[i] !== `
`; ) i += 1;
  if (i >= n) return null;
  i += 1;
  let l = n;
  for (; l > t && e[l - 1] !== `
`; ) l -= 1;
  return l <= i ? null : { from: i, to: l };
}
const ie = /^```mermaid\b([^\n]*)\r?\n/gim;
function Tt(e) {
  const t = String(e ?? "").trim();
  if (!t) return { width: null, height: null };
  let n = null, r = null;
  const a = t.split(/\s+/).filter(Boolean), s = /^mermaid$/i.test(a[0] ?? "") ? 1 : 0;
  for (let o = s; o < a.length; o += 1) {
    const i = a[o] ?? "", l = /^(\d+)x(\d+)$/i.exec(i);
    if (l) {
      n = v(l[1]), r = v(l[2]);
      continue;
    }
    if (/^\d+$/.test(i) && n == null) {
      n = v(i);
      continue;
    }
    const c = /^([a-zA-Z_]+)=(.*)$/.exec(i);
    if (!c) continue;
    const u = (c[1] ?? "").toLowerCase(), d = v(c[2]);
    d && (u === "w" || u === "width" ? n = d : (u === "h" || u === "height") && (r = d));
  }
  return { width: n, height: r };
}
function Pt(e) {
  const t = ["mermaid"];
  return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), t.join(" ");
}
function ke(e) {
  const t = [];
  return e.width && t.push(`width:${e.width}`), e.height && t.push(`height:${e.height}`), t.length ? `${t.join(";")};` : null;
}
function hn(e, t) {
  const n = [];
  for (const r of e.querySelectorAll(".md-editor-mermaid")) r.closest(".haim-mermaid-embed-source") || r.closest(".export-pdf-staging") || r.getAttribute("data-processed") != null && n.push(r);
  return n.findIndex((r) => r === t);
}
function Lt(e, { occurrence: t = 0, width: n = null, height: r = null }) {
  const a = String(e ?? ""), s = [];
  ie.lastIndex = 0;
  let o;
  for (; (o = ie.exec(a)) !== null; ) s.push({ index: o.index, full: o[0], infoTail: o[1] ?? "" });
  const i = s[t];
  if (!i) return { markdown: a, updated: false };
  const c = `\`\`\`${Pt({ width: n ? v(n) : null, height: r ? v(r) : null })}
`;
  return c === i.full ? { markdown: a, updated: false } : { markdown: a.slice(0, i.index) + c + a.slice(i.index + i.full.length), updated: true };
}
const oe = /([\w-]+)="([^"]*)"/g, se = /^```mermaid\b([^\n]*)\r?\n/gim, Rt = /<!--\s*mermaid-size\s+([^>]*?)-->[ \t]*(?:\r?\n[ \t]*)*$/i, Ot = /^<!--\s*mermaid-size\s+([^>]*?)-->\s*$/i;
function le(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/\r\n/g, `
`).replace(/\n/g, "&#10;").replace(/\r/g, "");
}
function Ht(e) {
  return String(e ?? "").replace(/&#10;/g, `
`).replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function _e(e) {
  const t = {};
  oe.lastIndex = 0;
  let n;
  for (; (n = oe.exec(e)) !== null; ) {
    const s = n[1], o = n[2];
    !s || o == null || (t[s] = Ht(o));
  }
  const r = v(t.width || t.w || ""), a = v(t.height || t.h || "");
  return !r && !a ? null : { width: r, height: a };
}
function zt(e) {
  const t = ["<!-- mermaid-size"];
  return e.width && t.push(`width="${le(e.width)}"`), e.height && t.push(`height="${le(e.height)}"`), t.push("-->"), t.join(" ");
}
function Nt(e, t) {
  if (t <= 0) return null;
  const r = e.slice(0, t).match(Rt);
  if (!r || r.index == null || !r[1]) return null;
  const a = _e(r[1]);
  return a ? { size: a, start: r.index, end: r.index + r[0].length } : null;
}
function ce(e) {
  const t = [], n = new RegExp(se.source, se.flags);
  let r;
  for (; (r = n.exec(e)) !== null; ) t.push(r.index);
  return t;
}
const Bt = /^```mermaid[^\n]*\r?\n([\s\S]*?)^```/gm;
function mn(e, t, n = 0) {
  const r = String(t ?? "").trim();
  if (!r) return -1;
  const a = [], s = new RegExp(Bt.source, "gm");
  let o = 0, i;
  for (; (i = s.exec(e)) !== null; ) (i[1] || "").trim() === r && a.push(o), o += 1;
  return a[n] ?? a[0] ?? -1;
}
function ye(e, t) {
  for (let n = t - 1; n >= 0; n -= 1) {
    const r = e[n] ?? "";
    if (!r.trim()) continue;
    const a = Ot.exec(r.trim());
    if (!a) break;
    return _e(a[1] ?? "");
  }
  return null;
}
function xe(e, t) {
  const n = Tt(e);
  return !(t == null ? void 0 : t.width) && !(t == null ? void 0 : t.height) ? n : { width: t.width ?? n.width, height: t.height ?? n.height };
}
function pn(e, { occurrence: t = 0, width: n = null, height: r = null }) {
  const a = String(e ?? "");
  if (ce(a)[t] == null) return { markdown: a, updated: false };
  const i = n ? v(n) : null, l = r ? v(r) : null;
  let c = a, u = false;
  const d = Lt(c, { occurrence: t, width: null, height: null });
  d.updated && (c = d.markdown, u = true);
  const p = ce(c)[t];
  if (p == null) return { markdown: c, updated: u };
  const f = Nt(c, p);
  if (!i && !l) return f && (c = c.slice(0, f.start) + c.slice(f.end), u = true), { markdown: c, updated: u };
  const w = zt({ width: i, height: l });
  if (f) {
    const y = c.slice(0, f.start) + w + c.slice(f.end);
    y !== c && (c = y, u = true);
  } else {
    const k = `${p > 0 && c[p - 1] !== `
` ? `
` : ""}${w}
`;
    c = c.slice(0, p) + k + c.slice(p), u = true;
  }
  return { markdown: c, updated: u };
}
const N = "md-editor";
function Se(e, t) {
  var _a, _b, _c;
  if (!e.map || e.level !== 0) return true;
  const n = e.map[1] - 1;
  return !!((_c = (_b = (_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a[n]) == null ? void 0 : _b.trim()) == null ? void 0 : _c.startsWith("```"));
}
function P(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function Me(e, t, n) {
  var _a;
  const r = n != null && ((_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a.length) ? ye(t.srcLines, n) : null, a = xe(e, r), s = [];
  if (a.width && s.push(`data-mermaid-width="${P(a.width)}"`), a.height && s.push(`data-mermaid-height="${P(a.height)}"`), a.width || a.height) {
    s.push('data-mermaid-sized="1"');
    const o = ke(a);
    o && s.push(`style="${P(o)}max-width:100%;overflow:hidden;"`);
  }
  return s;
}
function Ft(e, t, n, r) {
  var _a;
  const a = (_a = e.map) == null ? void 0 : _a[0], s = [`class="${N}-mermaid"`, `data-mermaid-theme="${n}"`, 'data-haim-mermaid-lazy="1"', ...Me(r, t, typeof a == "number" ? a : void 0)];
  return e.map && e.level === 0 && (s.push(`data-closed="${String(Se(e, t))}"`), s.push(`data-line="${String(e.map[0])}"`)), s.join(" ");
}
function de(e, t, n, r, a) {
  const s = e.utils.escapeHtml(r), o = e.utils.escapeHtml(n);
  return `<div class="haim-mermaid-embed" data-haim-mermaid-embed="1"><details class="md-editor-code haim-mermaid-embed-source"><summary class="md-editor-code-head"><span class="md-editor-code-lang">${e.utils.escapeHtml(t)}</span><span class="haim-mermaid-embed-summary">${o}</span></summary><pre class="haim-mermaid-embed-pre"><code>${s}</code></pre></details><div class="haim-mermaid-embed-render">${a}</div></div>`;
}
function jt(e) {
  const t = e.renderer.rules.fence;
  e.renderer.rules.fence = (n, r, a, s, o) => {
    var _a, _b;
    const i = n[r];
    if (!i) return t ? t(n, r, a, s, o) : o.renderToken(n, r, a);
    const l = i.info.trim(), c = l.split(/\s+/)[0] ?? "", d = i.content.trim(), p = z(c), f = be(c, d);
    if (!p && !f) return t ? t(n, r, a, s, o) : o.renderToken(n, r, a);
    const w = s, y = Xe(), k = we(d), M = p ? "mermaid" : "Mermaid", _ = Ct(d), h = (_a = i.map) == null ? void 0 : _a[0], b = Me(l, w, typeof h == "number" ? h : void 0);
    if (k) {
      const m = `<p class="${N}-mermaid haim-mermaid-image-embed" data-processed="" data-haim-mermaid-image="1"${b.length ? ` ${b.join(" ")}` : ""}><img src="${P(k)}" alt="Mermaid" class="haim-mermaid-embed-img" /></p>`;
      return de(e, M, _, d, m);
    }
    if (f) {
      const x = `<div ${Ft(i, w, y, l)}></div>`;
      return de(e, M, _, d, x);
    }
    i.attrSet("class", `${N}-mermaid`), i.attrSet("data-mermaid-theme", y), i.attrSet("data-haim-mermaid-lazy", "1");
    const g = xe(l, typeof h == "number" && ((_b = w == null ? void 0 : w.srcLines) == null ? void 0 : _b.length) ? ye(w.srcLines, h) : null);
    if (g.width && i.attrSet("data-mermaid-width", g.width), g.height && i.attrSet("data-mermaid-height", g.height), g.width || g.height) {
      i.attrSet("data-mermaid-sized", "1");
      const m = ke(g);
      m && i.attrSet("style", `${m}max-width:100%;overflow:hidden;`);
    }
    return i.map && i.level === 0 && (i.attrSet("data-closed", String(Se(i, w))), i.attrSet("data-line", String(i.map[0]))), `<div ${o.renderAttrs(i)}>${e.utils.escapeHtml(d)}</div>`;
  };
}
const Dt = /^\[([ xX~])\] /;
function E(e, t, n) {
  const r = e.attrIndex(t), a = [t, n];
  if (r < 0) {
    e.attrPush(a);
    return;
  }
  e.attrs = e.attrs ?? [], e.attrs[r] = a;
}
function Gt(e) {
  return (e == null ? void 0 : e.type) === "inline";
}
function Wt(e) {
  return (e == null ? void 0 : e.type) === "paragraph_open";
}
function qt(e) {
  return (e == null ? void 0 : e.type) === "list_item_open";
}
function ve(e) {
  var _a;
  const t = e.match(Dt);
  if (!t) return null;
  const n = t[1];
  return { status: Ge(n), kind: De(n), markerLen: ((_a = t[0]) == null ? void 0 : _a.length) ?? 4 };
}
function Kt(e, t) {
  var _a;
  return Gt(e[t]) && Wt(e[t - 1]) && qt(e[t - 2]) && !!ve(((_a = e[t]) == null ? void 0 : _a.content) ?? "");
}
function Xt(e, t) {
  var _a, _b;
  const n = (((_a = e[t]) == null ? void 0 : _a.level) ?? 0) - 1;
  for (let r = t - 1; r >= 0; r -= 1) if (((_b = e[r]) == null ? void 0 : _b.level) === n) return r;
  return -1;
}
function Ut(e) {
  const t = new e("html_inline", "", 0);
  return t.content = "<label>", t;
}
function Yt(e) {
  const t = new e("html_inline", "", 0);
  return t.content = "</label>", t;
}
function Vt(e, t, n) {
  const r = new n("html_inline", "", 0);
  return r.content = `<label class="task-list-item-label" for="${t}">${e}</label>`, r.attrs = [["for", t]], r;
}
function Zt(e, t, n, r) {
  const a = new n("html_inline", "", 0), s = r.enabled ? " " : ' disabled="" ', o = e === "done" ? ' checked=""' : "", i = t === "status" ? " task-list-item-checkbox--status" : "", l = e === "doing" ? ' aria-checked="mixed"' : e === "done" ? ' aria-checked="true"' : ' aria-checked="false"';
  return a.content = `<input class="task-list-item-checkbox${i}" data-status="${e}" data-kind="${t}"${l}${o}${s}type="checkbox">`, a;
}
function Qt(e, t, n, r, a, s) {
  if (e.children = e.children ?? [], e.children.unshift(Zt(r, a, t.Token, n)), e.children[1] && (e.children[1].content = e.children[1].content.slice(s)), e.content = e.content.slice(s), n.label) if (n.labelAfter) {
    e.children.pop();
    const o = `task-item-${Math.ceil(Math.random() * (1e4 * 1e3) - 1e3)}`;
    e.children[0].content = `${e.children[0].content.slice(0, -1)} id="${o}">`, e.children.push(Vt(e.content, o, t.Token));
  } else e.children.unshift(Ut(t.Token)), e.children.push(Yt(t.Token));
}
function Jt(e, t = {}) {
  e.core.ruler.after("inline", "github-task-lists", (n) => {
    var _a;
    const r = n.tokens;
    for (let a = 2; a < r.length; a += 1) {
      if (!Kt(r, a)) continue;
      const s = ve(((_a = r[a]) == null ? void 0 : _a.content) ?? "");
      s && (Qt(r[a], n, t, s.status, s.kind, s.markerLen), E(r[a - 2], "class", `task-list-item${t.enabled ? " enabled" : ""}`), E(r[a - 2], "data-status", s.status), E(r[a - 2], "data-kind", s.kind), s.status === "done" && E(r[a - 2], "data-checked", "true"), E(r[Xt(r, a - 2)], "class", "contains-task-list"));
    }
  });
}
const en = { br: [], pgbr: [], div: ["class", "data-md-pgbr", "data-md-plan", "data-note-cover-placeholder", "data-note-cover-mount", "data-note-cover-preview", "data-color-mode", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style", "role", "tabindex", "aria-label", "aria-level"], span: ["class", "data-md-pgbr", "data-md-plan-project", "data-md-plan-progress", "aria-hidden", "data-note-cover-fallback"], p: ["class", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style"], details: ["class", "open", "data-haim-mermaid-embed"], summary: ["class"], ul: ["class", "data-type"], li: ["class", "id", "data-status", "data-checked", "data-type", "data-md-footnote-id", "data-md-footnote-label"], h6: ["id", "class", "data-heading-level"], a: ["href", "class", "id", "target", "rel", "data-chat-saved-note", "data-chat-href", "data-chat-id", "data-md-footnote-to", "data-md-footnote-id", "data-md-footnote-title", "aria-label", "title"], sup: ["class"], sub: ["class"], b: [], section: ["class"], hr: ["class"], ol: ["class"], table: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], thead: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tbody: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tfoot: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tr: ["class", "style"], th: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], td: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], img: ["src", "alt", "title", "class", "style", "width", "height", "data-wiki-path", "data-wiki-width", "data-wiki-height", "data-md-src", "data-md-width", "data-md-height", "data-storage-image"], input: ["type", "checked", "disabled", "class", "id", "data-status", "aria-checked"], label: ["class", "for"] }, Ie = [{ type: "better_md", plugin: At, options: {} }, { type: "heading_levels", plugin: F, options: {} }, { type: "wiki_image", plugin: et, options: {} }, { type: "preview_link_target_blank", plugin: tt, options: {} }, { type: "pgbr", plugin: it, options: {} }, { type: "chat_saved_note", plugin: mt, options: {} }, { type: "note_cover_placeholder", plugin: We, options: {} }, { type: "haim_table", plugin: Je, options: {} }, { type: "plan_frontmatter", plugin: pe, options: {} }, { type: "mermaid", plugin: jt, options: {} }, { type: "task_list", plugin: Jt, options: { enabled: false, label: false } }];
function tn(e) {
  e.set({ html: true, breaks: true, linkify: true }), e.linkify && e.linkify.set({ fuzzyLink: true });
}
function fn(e, t = {}) {
  tn(e), t.xss !== false && $e(e, { extendedWhiteList: en }), Fe(e);
}
function nn(e) {
  let t = e;
  for (const n of Ie) t.some((r) => r.type === n.type) || (t = [...t, n]);
  return t;
}
function gn(e) {
  for (const t of Ie) e.use(t.plugin, t.options);
}
function bn(e) {
  return nn(e);
}
function wn(e) {
  F(e);
}
function kn(e) {
  F(e), pe(e);
}
export {
  kn as a,
  wn as b,
  fn as c,
  gn as d,
  bn as e,
  mn as f,
  hn as g,
  un as m,
  pn as u
};
