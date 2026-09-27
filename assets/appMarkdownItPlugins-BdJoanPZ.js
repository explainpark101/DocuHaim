import { N as ye } from "./vendor-md-editor-C-lRBXRc.js";
import { dF as ke, aQ as B, dG as xe, w as Se, dH as ve, z as Ie, y as j, A as P, D as L, aN as Me, dI as D, a5 as Ae, a7 as G, dJ as Ee, dK as Te, dL as $e, cN as W, dM as q, dN as Ce, aO as I, dO as Pe } from "./index-BF8EnhwI.js";
import { p as Le } from "./wikiImageResolver-KdXVQxAF.js";
import { n as Re } from "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import { e as Ne, r as He } from "./styleResolve-wfRpwUCS.js";
import { r as Oe } from "./mermaidTheme-Deyx0OD8.js";
import { i as ze, a as Fe, e as Be, s as je } from "./mermaidBase64Fence-DMVvW2Zs.js";
const De = /^<!--\s*haim-table\b/;
function R(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : De.test(String(e.content || "").trim());
}
function Ge(e) {
  const t = /<!--\s*haim-table\s*([\s\S]*?)-->/.exec(e);
  return t ? xe(t[1] ?? "") ?? B() : B();
}
function We(e, t) {
  var _a, _b;
  for (let i = t; i < Math.min(e.length, t + 8); i += 1) {
    if (((_a = e[i]) == null ? void 0 : _a.type) === "table_open") {
      for (let n = i + 1; n < e.length; n += 1) if (((_b = e[n]) == null ? void 0 : _b.type) === "table_close") return { start: i, end: n };
      return null;
    }
    const a = e[i];
    if (a && !(a.type === "paragraph_open" || a.type === "paragraph_close") && !(a.type === "inline" && !String(a.content || "").trim()) && !(a.type === "html_block" || a.type === "html_inline") && !a.hidden && a.type !== "table_open") return null;
  }
  return null;
}
function qe(e, t, i) {
  const a = [];
  let n = t + 1;
  for (; n < i; ) {
    const s = e[n];
    if (!s) break;
    if (s.type === "tr_open") {
      const o = { openIdx: n, closeIdx: -1, cells: [] };
      for (n += 1; n < i; ) {
        const r = e[n];
        if (!r) break;
        if (r.type === "tr_close") {
          o.closeIdx = n, n += 1;
          break;
        }
        if (r.type === "th_open" || r.type === "td_open") {
          const c = n;
          let l = -1, u = -1;
          for (n += 1; n < i; ) {
            const d = e[n];
            if (!d) break;
            if (d.type === "inline" && (l = n), d.type === "th_close" || d.type === "td_close") {
              u = n, n += 1;
              break;
            }
            n += 1;
          }
          u >= 0 && o.cells.push({ openIdx: c, closeIdx: u, inlineIdx: l });
          continue;
        }
        n += 1;
      }
      a.push(o);
      continue;
    }
    n += 1;
  }
  return a;
}
function Ke(e, t, i, a, n, s) {
  var _a, _b;
  const o = e.tokens, r = qe(o, i, a);
  if (!r.length) {
    o[t] && (o[t].hidden = true, o[t].content = "");
    return;
  }
  const c = r.length, l = Math.max(1, ...r.map((h) => h.cells.length)), u = Se(n.merges), d = Ne(n, c), m = Math.min(Math.max(0, n.footerRows), Math.max(0, c - d));
  (_a = o[i]) == null ? void 0 : _a.attrSet("data-haim-table", "1"), n.noHeader && ((_b = o[i]) == null ? void 0 : _b.attrSet("data-haim-no-header", "1")), o[i] && ve((h, w) => o[i].attrSet(h, w), n, o[i].attrGet("style"));
  for (let h = 0; h < r.length; h += 1) {
    const w = r[h];
    for (let p = 0; p < w.cells.length; p += 1) {
      const x = w.cells[p], S = o[x.openIdx];
      if (!S) continue;
      if (u.has(`${h},${p}`)) {
        S.hidden = true, x.inlineIdx >= 0 && o[x.inlineIdx] && (o[x.inlineIdx].hidden = true), o[x.closeIdx] && (o[x.closeIdx].hidden = true);
        continue;
      }
      const M = Ie(n.merges, h, p);
      M && (M.colspan > 1 && S.attrSet("colspan", String(M.colspan)), M.rowspan > 1 && S.attrSet("rowspan", String(M.rowspan)));
      const be = He({ row: h, col: p, rowCount: c, colCount: l, meta: n, template: s });
      let E = j(be);
      const z = P(n.colWidths, p);
      z && (E = L(E, `width:${z}`));
      const F = P(n.rowHeights, h);
      F && (E = L(E, `height:${F}`)), E && S.attrSet("style", E), S.attrSet("data-haim-r", String(h)), S.attrSet("data-haim-c", String(p));
    }
    const g = P(n.rowHeights, h);
    if (g && o[w.openIdx]) {
      const p = o[w.openIdx];
      p.attrSet("style", L(p.attrGet("style"), `height:${g}`));
    }
  }
  const f = r.slice(0, d), _ = r.slice(d, c - m), k = m > 0 ? r.slice(c - m) : [];
  for (const h of f) for (const w of h.cells) {
    const g = o[w.openIdx], p = o[w.closeIdx];
    g && (g.tag = "th", g.type = "th_open"), p && (p.tag = "th", p.type = "th_close");
  }
  for (const h of [..._, ...k]) for (const w of h.cells) {
    const g = o[w.openIdx], p = o[w.closeIdx];
    g && (g.tag = "td", g.type = "td_open"), p && (p.tag = "td", p.type = "td_close");
  }
  const b = [], v = (h, w) => {
    if (!w.length) return;
    const g = new e.Token(`${h}_open`, h, 1), p = j(n.sections[h] ?? {}, { includeOuterBorder: true });
    p && g.attrSet("style", p), g.attrSet("data-haim-section", h), b.push(g);
    for (const x of w) for (let S = x.openIdx; S <= x.closeIdx; S += 1) {
      const M = o[S];
      M && b.push(M);
    }
    b.push(new e.Token(`${h}_close`, h, -1));
  };
  v("thead", f), v("tbody", _), v("tfoot", k);
  const y = [...o.slice(0, i + 1), ...b, ...o.slice(a)];
  if (t >= 0 && t < y.length && R(y[t])) y[t].hidden = true, y[t].content = "";
  else for (const h of y) R(h) && (h.hidden = true, h.content = "");
  e.tokens.length = 0, e.tokens.push(...y);
}
function Xe(e) {
  e.core.ruler.after("block", "haim_table", (t) => {
    for (let i = 0; i < 50; i += 1) {
      let a = null;
      for (let s = 0; s < t.tokens.length; s += 1) {
        const o = t.tokens[s];
        if (!o || !R(o) || o.hidden) continue;
        const r = Ge(o.content), c = We(t.tokens, s + 1);
        if (c) {
          a = { commentIdx: s, tableStart: c.start, tableEnd: c.end, meta: r };
          break;
        }
      }
      if (!a) break;
      const n = a.meta.templateId ? ke(a.meta.templateId) : null;
      Ke(t, a.commentIdx, a.tableStart, a.tableEnd, a.meta, n);
    }
  });
}
const K = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
function X(e) {
  const t = Le(e);
  return !t || t.startsWith("blob:") || t.startsWith("data:") ? K : t;
}
function U(e) {
  return e ? [e[0], e[1]] : null;
}
function Ue(e) {
  const t = /!\[\[([^[\]]+)\]\]/g;
  e.core.ruler.push("wiki-image", (i) => {
    i.src && /!\[\[/.test(i.src), i.tokens.forEach((a) => {
      if (a.type !== "inline" || !a.children) return;
      const n = [];
      a.children.forEach((s) => {
        if (s.type !== "text") {
          n.push(s);
          return;
        }
        const o = s.content;
        let r = 0;
        t.lastIndex = 0;
        let c;
        for (; (c = t.exec(o)) !== null; ) {
          if (c.index > r) {
            const f = new i.Token("text", "", 0);
            f.content = o.slice(r, c.index), n.push(f);
          }
          const l = Me(c[1]), u = l == null ? void 0 : l.path;
          if (!u) {
            const f = new i.Token("text", "", 0);
            f.content = c[0], n.push(f), r = c.index + c[0].length;
            continue;
          }
          const d = new i.Token("wiki_image", "img", 0);
          d.attrSet("data-wiki-path", u), (l == null ? void 0 : l.width) && d.attrSet("data-wiki-width", l.width), (l == null ? void 0 : l.height) && d.attrSet("data-wiki-height", l.height), (l == null ? void 0 : l.background) && d.attrSet("data-wiki-bg", l.background);
          const m = D(l ?? {});
          m && d.attrSet("style", m), d.attrSet("src", X(u)), d.attrSet("alt", ""), n.push(d), r = c.index + c[0].length;
        }
        if (r < o.length) {
          const l = new i.Token("text", "", 0);
          l.content = o.slice(r), n.push(l);
        }
      }), n.length, a.children.length, a.children = n;
    });
  }), e.core.ruler.after("wiki-image", "wiki-image-caption-inline", (i) => {
    const a = i.tokens;
    if (!a || a.length < 3) return;
    const n = [];
    let s = false;
    for (let o = 0; o < a.length; o += 1) {
      const r = a[o], c = a[o + 1], l = a[o + 2];
      if (!r || !c || !l) {
        r && n.push(r);
        continue;
      }
      if (r.type !== "paragraph_open" || c.type !== "inline" || l.type !== "paragraph_close") {
        n.push(r);
        continue;
      }
      const u = c.children || [];
      if (u.length < 3) {
        n.push(r);
        continue;
      }
      const d = u[0], m = u[1], f = m != null && (m.type === "softbreak" || m.type === "hardbreak");
      if (!d || d.type !== "wiki_image" || !f) {
        n.push(r);
        continue;
      }
      const _ = u.slice(2);
      if (!_.some((p) => p.type === "text" && p.content && p.content.trim())) {
        n.push(r);
        continue;
      }
      const b = new i.Token("figure_open", "figure", 1);
      b.block = true, b.map = U(r.map);
      const v = new i.Token("inline", "", 0);
      v.children = [d], v.level = (r.level || 0) + 1;
      const y = new i.Token("figcaption_open", "figcaption", 1);
      y.block = true, y.level = (r.level || 0) + 1;
      const h = new i.Token("inline", "", 0);
      h.children = _, h.level = (r.level || 0) + 2;
      const w = new i.Token("figcaption_close", "figcaption", -1);
      w.block = true, w.level = (r.level || 0) + 1;
      const g = new i.Token("figure_close", "figure", -1);
      g.block = true, g.level = r.level || 0, n.push(b, v, y, h, w, g), s = true, o += 2;
    }
    s && (i.tokens = n);
  }), e.core.ruler.after("wiki-image-caption-inline", "wiki-image-caption", (i) => {
    const a = i.tokens;
    if (!a || a.length < 6) return;
    const n = [];
    let s = false;
    for (let o = 0; o < a.length; o += 1) {
      const r = a[o], c = a[o + 1], l = a[o + 2], u = a[o + 3], d = a[o + 4], m = a[o + 5];
      if (!(r != null && c != null && l != null && u != null && d != null && m != null && r.type === "paragraph_open" && c.type === "inline" && l.type === "paragraph_close" && u.type === "paragraph_open" && d.type === "inline" && m.type === "paragraph_close") || !r || !c || !d) {
        r && n.push(r);
        continue;
      }
      const _ = c.children || [], k = _[0];
      if (_.length !== 1 || !k || k.type !== "wiki_image") {
        n.push(r);
        continue;
      }
      const b = d.children || [];
      if (!b.some((S) => S.type === "text" && S.content && S.content.trim())) {
        n.push(r);
        continue;
      }
      const y = new i.Token("figure_open", "figure", 1);
      y.block = true, y.map = U(r.map);
      const h = new i.Token("inline", "", 0);
      h.children = _, h.level = (r.level || 0) + 1;
      const w = new i.Token("figcaption_open", "figcaption", 1);
      w.block = true, w.level = (r.level || 0) + 1;
      const g = new i.Token("inline", "", 0);
      g.children = b, g.level = (r.level || 0) + 2;
      const p = new i.Token("figcaption_close", "figcaption", -1);
      p.block = true, p.level = (r.level || 0) + 1;
      const x = new i.Token("figure_close", "figure", -1);
      x.block = true, x.level = r.level || 0, n.push(y, h, w, g, p, x), s = true, o += 5;
    }
    s && (i.tokens = n);
  }), e.core.ruler.after("wiki-image-caption", "markdown-image-size-attrs", (i) => {
    i.tokens.forEach((a) => {
      var _a;
      if (a.type !== "inline" || !((_a = a.children) == null ? void 0 : _a.length)) return;
      const n = [], s = a.children;
      for (let o = 0; o < s.length; o += 1) {
        const r = s[o];
        if (!r) continue;
        if (r.type !== "image") {
          n.push(r);
          continue;
        }
        const c = r.attrGet("src"), l = c == null ? null : String(c);
        if (l && r.attrSet("data-md-src", l), l && Ae(G(l))) {
          const d = G(l);
          r.attrSet("src", X(d)), r.attrSet("data-storage-image", "1");
        }
        const u = s[o + 1];
        if ((u == null ? void 0 : u.type) === "text") {
          const d = u.content || "", m = d.match(/^\{([^}\n]+)\}/);
          if (m) {
            const f = Ee(`{${m[1]}}`);
            f.width && r.attrSet("data-md-width", f.width), f.height && r.attrSet("data-md-height", f.height), f.background && r.attrSet("data-md-bg", f.background);
            const _ = D(f);
            _ && r.attrSet("style", _);
            const k = d.slice(m[0].length);
            if (k) {
              const b = new i.Token("text", "", 0);
              b.content = k, n.push(r, b);
            } else n.push(r);
            o += 1;
            continue;
          }
        }
        n.push(r);
      }
      a.children = n;
    });
  }), e.renderer.rules.wiki_image = (i, a, n, s, o) => {
    const r = i[a];
    return r ? `<img ${o.renderAttrs(r)}>` : "";
  };
}
function Qe(e) {
  const t = e.renderer.rules.link_open || function(a, n, s, o, r) {
    return r.renderToken(a, n, s);
  };
  e.renderer.rules.link_open = function(a, n, s, o, r) {
    const c = a[n];
    if (!c) return t(a, n, s, o, r);
    const l = c.attrGet("href") || "";
    return !(c.attrGet("data-chat-saved-note") === "1") && Te(l) && (c.attrSet("target", "_blank"), c.attrSet("rel", "noopener noreferrer")), t(a, n, s, o, r);
  };
}
const $ = /<pgbr\s*\/?\s*>/gi;
function H(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function Ve(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function Q(e) {
  const t = new e.Token("html_inline", "", 0);
  return t.content = '<span class="md-pgbr" data-md-pgbr="1"></span>', t;
}
const le = /<span class="md-pgbr"/;
function ce(e) {
  let t = 0;
  for (const i of e.children || []) i.type === "html_inline" && (le.test(i.content) || H(i.content)) && (t += 1);
  return t;
}
function Ye(e) {
  var _a;
  if (e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  for (const t of e.children) if (!(t.type === "softbreak" || t.type === "hardbreak") && !(t.type === "text" && !t.content.trim()) && !(t.type === "html_inline" && (le.test(t.content) || H(t.content)))) return false;
  return ce(e) > 0;
}
function V(e) {
  const t = new e.Token("html_block", "", 0);
  return t.content = '<div class="md-pgbr" data-md-pgbr="1"></div>', t.block = true, t;
}
function Je(e, t) {
  if (!(t == null ? void 0 : t.length)) return t;
  const i = [];
  for (const a of t) {
    if (a.type === "html_inline" && H(a.content)) {
      i.push(Q(e));
      continue;
    }
    if (a.type !== "text") {
      i.push(a);
      continue;
    }
    const n = a.content;
    if ($.lastIndex = 0, !$.test(n)) {
      i.push(a);
      continue;
    }
    let s = 0;
    $.lastIndex = 0;
    let o;
    for (; (o = $.exec(n)) !== null; ) {
      if (o.index > s) {
        const r = new e.Token("text", "", 0);
        r.content = n.slice(s, o.index), i.push(r);
      }
      i.push(Q(e)), s = o.index + o[0].length;
    }
    if (s < n.length) {
      const r = new e.Token("text", "", 0);
      r.content = n.slice(s), i.push(r);
    }
  }
  return i;
}
function Ze(e) {
  e.core.ruler.push("pgbr-mark", (t) => (t.tokens.forEach((i) => {
    i.type !== "inline" || !i.children || (i.children = Je(t, i.children));
  }), true)), e.core.ruler.after("pgbr-mark", "pgbr-unwrap-paragraph", (t) => {
    const { tokens: i } = t, a = [];
    let n = 0;
    for (; n < i.length; ) {
      if (n + 2 < i.length && i[n].type === "paragraph_open" && i[n + 1].type === "inline" && i[n + 2].type === "paragraph_close" && Ye(i[n + 1])) {
        const s = ce(i[n + 1]);
        for (let o = 0; o < s; o += 1) a.push(V(t));
        n += 3;
        continue;
      }
      a.push(i[n]), n += 1;
    }
    return t.tokens = a, true;
  }), e.core.ruler.after("pgbr-unwrap-paragraph", "pgbr-normalize-html-block", (t) => (t.tokens = t.tokens.map((i) => i.type === "html_block" && Ve(i.content) ? V(t) : i), true));
}
const et = /<!--\s*chat-with-myself\s+[^>]*?-->/i, Y = /(?:^|\/)chat(?:\/)?(?:#|%23)msg-/i, tt = /채팅으로\s*이동|채팅에서\s*저장된\s*노트/;
function J(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function de(e) {
  return et.test(e || "") ? $e(e) : null;
}
function nt(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : !!de(e.content);
}
function it(e, t) {
  var _a;
  if (((_a = e[t]) == null ? void 0 : _a.type) !== "blockquote_open") return -1;
  let i = 0;
  for (let a = t; a < e.length; a += 1) {
    const n = e[a];
    if (n.type === "blockquote_open") i += 1;
    else if (n.type === "blockquote_close" && (i -= 1, i === 0)) return a + 1;
  }
  return -1;
}
function at(e) {
  var _a;
  if (!e || e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  let t = "", i = "", a = false;
  for (const n of e.children) if (!(n.type === "softbreak" || n.type === "hardbreak") && !(n.type === "text" && !String(n.content || "").trim())) {
    if (n.type === "link_open") {
      if (a) return false;
      a = true, t = n.attrGet("href") || "";
      continue;
    }
    if (n.type === "text" && a && !i) {
      i = n.content || "";
      continue;
    }
    if (n.type !== "link_close") return false;
  }
  return !(!a || !Y.test(t) && !/#msg-/.test(t) || i && !tt.test(i) && !Y.test(t) && !/#msg-/.test(t));
}
function rt(e, t) {
  var _a, _b, _c;
  return ((_a = e[t]) == null ? void 0 : _a.type) !== "paragraph_open" || ((_b = e[t + 1]) == null ? void 0 : _b.type) !== "inline" || ((_c = e[t + 2]) == null ? void 0 : _c.type) !== "paragraph_close" || !at(e[t + 1]) ? -1 : t + 3;
}
function ot(e) {
  const t = J(e.href || "/chat"), i = J(e.id || "");
  return [`<a class="md-chat-saved-note" href="${t}" data-chat-saved-note="1" data-chat-href="${t}" data-chat-id="${i}">`, '<span class="md-chat-saved-note__icon" aria-hidden="true"></span>', '<span class="md-chat-saved-note__body">', '<span class="md-chat-saved-note__title">\uCC44\uD305\uC5D0\uC11C \uC800\uC7A5\uB41C \uB178\uD2B8</span>', '<span class="md-chat-saved-note__hint">\uD0ED\uD558\uC5EC \uC6D0\uBCF8 \uCC44\uD305\uC73C\uB85C \uC774\uB3D9</span>', "</span>", '<span class="md-chat-saved-note__arrow" aria-hidden="true">\u2192</span>', "</a>"].join("");
}
function st(e) {
  e.core.ruler.after("inline", "chat-saved-note", (t) => {
    const { tokens: i } = t;
    if (!(i == null ? void 0 : i.length)) return;
    const a = [];
    let n = 0;
    for (; n < i.length; ) {
      if (!nt(i[n])) {
        a.push(i[n]), n += 1;
        continue;
      }
      const s = de(i[n].content);
      let o = n + 1;
      const r = it(i, o);
      r > o && (o = r);
      const c = rt(i, o);
      c > o && (o = c);
      const l = new t.Token("html_block", "", 0);
      l.content = ot(s), l.block = true, a.push(l), n = o;
    }
    t.tokens = a;
  });
}
function Z(e) {
  return e === 9 || e === 32;
}
function lt(e, t, i, a) {
  let n = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return false;
  let o = e.src.charCodeAt(n);
  if (o !== 35 || n >= s) return false;
  let r = 1;
  for (o = e.src.charCodeAt(++n); o === 35 && n < s && r < W; ) r += 1, o = e.src.charCodeAt(++n);
  if (r > W || n < s && !Z(o)) return false;
  if (a) return true;
  s = e.skipSpacesBack(s, n);
  const c = e.skipCharsBack(s, 35, n);
  c > n && Z(e.src.charCodeAt(c - 1)) && (s = c), e.line = t + 1;
  const l = "#".repeat(r), u = r <= q ? `h${r}` : "h6", d = e.push("heading_open", u, 1);
  d.markup = l, d.map = [t, e.line], r > q && (d.attrSet("data-heading-level", String(r)), d.attrSet("class", `md-heading md-heading-${r}`));
  const m = e.push("inline", "", 0);
  m.content = e.src.slice(n, s).trim(), m.map = [t, e.line], m.children = [];
  const f = e.push("heading_close", u, -1);
  return f.markup = l, true;
}
function O(e) {
  e.block.ruler.at("heading", lt);
}
const ee = /^---[ \t]*\r?\n/;
function ct(e) {
  const t = String(e ?? "");
  if (!ee.test(t)) return null;
  const i = t.replace(ee, ""), a = i.match(/\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!a || a.index == null) return null;
  const n = i.slice(0, a.index), s = t.length - i.length + a.index + a[0].length;
  return { yaml: n, bodyOffset: s };
}
function A(e) {
  if (typeof e != "string") return null;
  const t = e.trim();
  return t || null;
}
function dt(e) {
  const t = String(e ?? "").trim().toLowerCase().replace(/_/g, "-");
  return t === "completed" || t === "complete" || t === "done" ? "completed" : t === "in-progress" || t === "inprogress" || t === "progress" ? "in_progress" : t === "cancelled" || t === "canceled" ? "cancelled" : t === "error" || t === "failed" || t === "fail" ? "error" : "pending";
}
function ut(e, t) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const i = e, a = A(i.content) ?? A(i.title);
  return a ? { id: A(i.id) ?? `todo-${t + 1}`, content: a, status: dt(i.status) } : null;
}
function ht(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return false;
  const t = e;
  return !(!Array.isArray(t.todos) || t.name != null && typeof t.name != "string" && typeof t.name != "number");
}
function pt(e) {
  let t;
  try {
    t = Ce(String(e ?? ""));
  } catch {
    return null;
  }
  if (!ht(t)) return null;
  const i = [];
  for (let o = 0; o < t.todos.length; o += 1) {
    const r = ut(t.todos[o], o);
    r && i.push(r);
  }
  const a = A(t.name) ?? A(t.title) ?? "Plan", n = A(t.overview) ?? A(t.description) ?? "", s = t.isProject === true || t.is_project === true;
  return { name: a, overview: n, todos: i, isProject: s };
}
function T(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const mt = { pending: "Pending", in_progress: "In progress", completed: "Completed", cancelled: "Cancelled", error: "Error" };
function ft(e) {
  const t = e.status, i = mt[t];
  return [`<li class="md-plan-frontmatter__todo md-plan-frontmatter__todo--${t}" data-status="${t}">`, `<span class="md-plan-frontmatter__icon md-plan-frontmatter__icon--${t}" aria-hidden="true"></span>`, '<span class="md-plan-frontmatter__todo-body">', `<span class="md-plan-frontmatter__todo-content">${T(e.content)}</span>`, `<span class="md-plan-frontmatter__status-label">${T(i)}</span>`, "</span>", "</li>"].join("");
}
function gt(e) {
  const t = e.todos.filter((r) => r.status === "completed").length, i = e.todos.length, a = i > 0 ? `${t}/${i}` : "0/0", n = e.isProject ? '<span class="md-plan-frontmatter__badge" data-md-plan-project="1">Project</span>' : "", s = e.overview ? `<p class="md-plan-frontmatter__overview">${T(e.overview)}</p>` : "", o = e.todos.length ? ['<ul class="md-plan-frontmatter__todos">', ...e.todos.map(ft), "</ul>"].join("") : '<p class="md-plan-frontmatter__empty">No todos</p>';
  return ['<div class="md-plan-frontmatter" data-md-plan="1" role="region" aria-label="Plan">', '<div class="md-plan-frontmatter__header">', `<div class="md-plan-frontmatter__name" role="heading" aria-level="2">${T(e.name)}</div>`, '<div class="md-plan-frontmatter__meta">', n, `<span class="md-plan-frontmatter__progress" data-md-plan-progress="1">${T(a)}</span>`, "</div>", "</div>", s, o, "</div>"].join("");
}
function wt(e) {
  if (e.lineMax < 2) return -1;
  const t = e.bMarks[0] + e.tShift[0], i = e.eMarks[0], a = e.src.slice(t, i);
  if (!/^---[ \t]*$/.test(a)) return -1;
  for (let n = 1; n < e.lineMax; n += 1) {
    const s = e.bMarks[n] + e.tShift[n], o = e.eMarks[n], r = e.src.slice(s, o);
    if (/^---[ \t]*$/.test(r)) return n + 1;
  }
  return -1;
}
function _t(e, t, i, a) {
  if (t !== 0) return false;
  const n = wt(e);
  if (n < 0) return false;
  const s = e.bMarks[0];
  let o = e.eMarks[n - 1];
  e.src[o] === "\r" && (o += 1), e.src[o] === `
` && (o += 1);
  const r = e.src.slice(s, o), c = ct(r);
  if (!c) return false;
  const l = pt(c.yaml);
  if (!l) return false;
  if (a) return true;
  const u = e.push("html_block", "", 0);
  return u.content = gt(l), u.map = [t, n], u.markup = "---", u.block = true, e.line = n, true;
}
const bt = ["paragraph", "reference", "blockquote", "list"];
function ue(e) {
  const t = _t, i = { alt: [...bt] };
  try {
    e.block.ruler.before("hr", "plan_frontmatter", t, i);
  } catch {
    e.block.ruler.before("fence", "plan_frontmatter", t, i);
  }
}
const te = 42;
function yt(e, t) {
  const i = e.pos, a = e.posMax, n = e.src;
  if (i + 3 > a || n.charCodeAt(i) !== te || n.charCodeAt(i + 1) !== te) return false;
  const s = n.indexOf("**", i + 2);
  if (s === -1 || s === i + 2) return false;
  if (t) return e.pos = s + 2, true;
  const o = e.push("strong_open", "strong", 1);
  o.markup = "**";
  const r = i + 2, c = e.posMax;
  e.pos = r, e.posMax = s, e.md.inline.tokenize(e), e.posMax = c, e.pos = s + 2;
  const l = e.push("strong_close", "strong", -1);
  return l.markup = "**", true;
}
function kt(e) {
  e.inline.ruler.before("emphasis", "better_strong", yt), e.renderer.rules.strong_open = () => "<b>", e.renderer.rules.strong_close = () => "</b>";
}
const ne = /^```mermaid\b([^\n]*)\r?\n/gim;
function xt(e) {
  const t = String(e ?? "").trim();
  if (!t) return { width: null, height: null };
  let i = null, a = null;
  const n = t.split(/\s+/).filter(Boolean), s = /^mermaid$/i.test(n[0] ?? "") ? 1 : 0;
  for (let o = s; o < n.length; o += 1) {
    const r = n[o] ?? "", c = /^(\d+)x(\d+)$/i.exec(r);
    if (c) {
      i = I(c[1]), a = I(c[2]);
      continue;
    }
    if (/^\d+$/.test(r) && i == null) {
      i = I(r);
      continue;
    }
    const l = /^([a-zA-Z_]+)=(.*)$/.exec(r);
    if (!l) continue;
    const u = (l[1] ?? "").toLowerCase(), d = I(l[2]);
    d && (u === "w" || u === "width" ? i = d : (u === "h" || u === "height") && (a = d));
  }
  return { width: i, height: a };
}
function St(e) {
  const t = ["mermaid"];
  return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), t.join(" ");
}
function he(e) {
  const t = [];
  return e.width && t.push(`width:${e.width}`), e.height && t.push(`height:${e.height}`), t.length ? `${t.join(";")};` : null;
}
function Wt(e, t) {
  const i = [];
  for (const a of e.querySelectorAll(".md-editor-mermaid")) a.closest(".haim-mermaid-embed-source") || a.closest(".export-pdf-staging") || a.getAttribute("data-processed") != null && i.push(a);
  return i.findIndex((a) => a === t);
}
function vt(e, { occurrence: t = 0, width: i = null, height: a = null }) {
  const n = String(e ?? ""), s = [];
  ne.lastIndex = 0;
  let o;
  for (; (o = ne.exec(n)) !== null; ) s.push({ index: o.index, full: o[0], infoTail: o[1] ?? "" });
  const r = s[t];
  if (!r) return { markdown: n, updated: false };
  const l = `\`\`\`${St({ width: i ? I(i) : null, height: a ? I(a) : null })}
`;
  return l === r.full ? { markdown: n, updated: false } : { markdown: n.slice(0, r.index) + l + n.slice(r.index + r.full.length), updated: true };
}
const ie = /([\w-]+)="([^"]*)"/g, ae = /^```mermaid\b([^\n]*)\r?\n/gim, It = /<!--\s*mermaid-size\s+([^>]*?)-->[ \t]*(?:\r?\n[ \t]*)*$/i, Mt = /^<!--\s*mermaid-size\s+([^>]*?)-->\s*$/i;
function re(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/\r\n/g, `
`).replace(/\n/g, "&#10;").replace(/\r/g, "");
}
function At(e) {
  return String(e ?? "").replace(/&#10;/g, `
`).replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function pe(e) {
  const t = {};
  ie.lastIndex = 0;
  let i;
  for (; (i = ie.exec(e)) !== null; ) {
    const s = i[1], o = i[2];
    !s || o == null || (t[s] = At(o));
  }
  const a = I(t.width || t.w || ""), n = I(t.height || t.h || "");
  return !a && !n ? null : { width: a, height: n };
}
function Et(e) {
  const t = ["<!-- mermaid-size"];
  return e.width && t.push(`width="${re(e.width)}"`), e.height && t.push(`height="${re(e.height)}"`), t.push("-->"), t.join(" ");
}
function Tt(e, t) {
  if (t <= 0) return null;
  const a = e.slice(0, t).match(It);
  if (!a || a.index == null || !a[1]) return null;
  const n = pe(a[1]);
  return n ? { size: n, start: a.index, end: a.index + a[0].length } : null;
}
function oe(e) {
  const t = [], i = new RegExp(ae.source, ae.flags);
  let a;
  for (; (a = i.exec(e)) !== null; ) t.push(a.index);
  return t;
}
const $t = /^```mermaid[^\n]*\r?\n([\s\S]*?)^```/gm;
function qt(e, t, i = 0) {
  const a = String(t ?? "").trim();
  if (!a) return -1;
  const n = [], s = new RegExp($t.source, "gm");
  let o = 0, r;
  for (; (r = s.exec(e)) !== null; ) (r[1] || "").trim() === a && n.push(o), o += 1;
  return n[i] ?? n[0] ?? -1;
}
function me(e, t) {
  for (let i = t - 1; i >= 0; i -= 1) {
    const a = e[i] ?? "";
    if (!a.trim()) continue;
    const n = Mt.exec(a.trim());
    if (!n) break;
    return pe(n[1] ?? "");
  }
  return null;
}
function fe(e, t) {
  const i = xt(e);
  return !(t == null ? void 0 : t.width) && !(t == null ? void 0 : t.height) ? i : { width: t.width ?? i.width, height: t.height ?? i.height };
}
function Kt(e, { occurrence: t = 0, width: i = null, height: a = null }) {
  const n = String(e ?? "");
  if (oe(n)[t] == null) return { markdown: n, updated: false };
  const r = i ? I(i) : null, c = a ? I(a) : null;
  let l = n, u = false;
  const d = vt(l, { occurrence: t, width: null, height: null });
  d.updated && (l = d.markdown, u = true);
  const m = oe(l)[t];
  if (m == null) return { markdown: l, updated: u };
  const f = Tt(l, m);
  if (!r && !c) return f && (l = l.slice(0, f.start) + l.slice(f.end), u = true), { markdown: l, updated: u };
  const _ = Et({ width: r, height: c });
  if (f) {
    const k = l.slice(0, f.start) + _ + l.slice(f.end);
    k !== l && (l = k, u = true);
  } else {
    const b = `${m > 0 && l[m - 1] !== `
` ? `
` : ""}${_}
`;
    l = l.slice(0, m) + b + l.slice(m), u = true;
  }
  return { markdown: l, updated: u };
}
const N = "md-editor";
function ge(e, t) {
  var _a, _b, _c;
  if (!e.map || e.level !== 0) return true;
  const i = e.map[1] - 1;
  return !!((_c = (_b = (_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a[i]) == null ? void 0 : _b.trim()) == null ? void 0 : _c.startsWith("```"));
}
function C(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function we(e, t, i) {
  var _a;
  const a = i != null && ((_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a.length) ? me(t.srcLines, i) : null, n = fe(e, a), s = [];
  if (n.width && s.push(`data-mermaid-width="${C(n.width)}"`), n.height && s.push(`data-mermaid-height="${C(n.height)}"`), n.width || n.height) {
    s.push('data-mermaid-sized="1"');
    const o = he(n);
    o && s.push(`style="${C(o)}max-width:100%;overflow:hidden;"`);
  }
  return s;
}
function Ct(e, t, i, a) {
  var _a;
  const n = (_a = e.map) == null ? void 0 : _a[0], s = [`class="${N}-mermaid"`, `data-mermaid-theme="${i}"`, 'data-haim-mermaid-lazy="1"', ...we(a, t, typeof n == "number" ? n : void 0)];
  return e.map && e.level === 0 && (s.push(`data-closed="${String(ge(e, t))}"`), s.push(`data-line="${String(e.map[0])}"`)), s.join(" ");
}
function se(e, t, i, a, n) {
  const s = e.utils.escapeHtml(a), o = e.utils.escapeHtml(i);
  return `<div class="haim-mermaid-embed" data-haim-mermaid-embed="1"><details class="md-editor-code haim-mermaid-embed-source"><summary class="md-editor-code-head"><span class="md-editor-code-lang">${e.utils.escapeHtml(t)}</span><span class="haim-mermaid-embed-summary">${o}</span></summary><pre class="haim-mermaid-embed-pre"><code>${s}</code></pre></details><div class="haim-mermaid-embed-render">${n}</div></div>`;
}
function Pt(e) {
  const t = e.renderer.rules.fence;
  e.renderer.rules.fence = (i, a, n, s, o) => {
    var _a, _b;
    const r = i[a];
    if (!r) return t ? t(i, a, n, s, o) : o.renderToken(i, a, n);
    const c = r.info.trim(), l = c.split(/\s+/)[0] ?? "", d = r.content.trim(), m = ze(l), f = Fe(l, d);
    if (!m && !f) return t ? t(i, a, n, s, o) : o.renderToken(i, a, n);
    const _ = s, k = Oe(), b = Be(d), v = m ? "mermaid" : "Mermaid", y = je(d), h = (_a = r.map) == null ? void 0 : _a[0], w = we(c, _, typeof h == "number" ? h : void 0);
    if (b) {
      const p = `<p class="${N}-mermaid haim-mermaid-image-embed" data-processed="" data-haim-mermaid-image="1"${w.length ? ` ${w.join(" ")}` : ""}><img src="${C(b)}" alt="Mermaid" class="haim-mermaid-embed-img" /></p>`;
      return se(e, v, y, d, p);
    }
    if (f) {
      const x = `<div ${Ct(r, _, k, c)}></div>`;
      return se(e, v, y, d, x);
    }
    r.attrSet("class", `${N}-mermaid`), r.attrSet("data-mermaid-theme", k), r.attrSet("data-haim-mermaid-lazy", "1");
    const g = fe(c, typeof h == "number" && ((_b = _ == null ? void 0 : _.srcLines) == null ? void 0 : _b.length) ? me(_.srcLines, h) : null);
    if (g.width && r.attrSet("data-mermaid-width", g.width), g.height && r.attrSet("data-mermaid-height", g.height), g.width || g.height) {
      r.attrSet("data-mermaid-sized", "1");
      const p = he(g);
      p && r.attrSet("style", `${p}max-width:100%;overflow:hidden;`);
    }
    return r.map && r.level === 0 && (r.attrSet("data-closed", String(ge(r, _))), r.attrSet("data-line", String(r.map[0]))), `<div ${o.renderAttrs(r)}>${e.utils.escapeHtml(d)}</div>`;
  };
}
const Lt = { br: [], pgbr: [], div: ["class", "data-md-pgbr", "data-md-plan", "data-note-cover-placeholder", "data-note-cover-mount", "data-note-cover-preview", "data-color-mode", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style", "role", "tabindex", "aria-label", "aria-level"], span: ["class", "data-md-pgbr", "data-md-plan-project", "data-md-plan-progress", "aria-hidden", "data-note-cover-fallback"], p: ["class", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style"], details: ["class", "open", "data-haim-mermaid-embed"], summary: ["class"], ul: ["class"], li: ["class", "id", "data-status", "data-md-footnote-id", "data-md-footnote-label"], h6: ["id", "class", "data-heading-level"], a: ["href", "class", "id", "target", "rel", "data-chat-saved-note", "data-chat-href", "data-chat-id", "data-md-footnote-to", "data-md-footnote-id", "data-md-footnote-title", "aria-label", "title"], sup: ["class"], sub: ["class"], b: [], section: ["class"], hr: ["class"], ol: ["class"], table: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], thead: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tbody: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tfoot: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tr: ["class", "style"], th: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], td: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], img: ["src", "alt", "title", "class", "style", "width", "height", "data-wiki-path", "data-wiki-width", "data-wiki-height", "data-md-src", "data-md-width", "data-md-height", "data-storage-image"], input: ["type", "checked", "disabled", "class", "id"], label: ["class", "for"] }, _e = [{ type: "better_md", plugin: kt, options: {} }, { type: "heading_levels", plugin: O, options: {} }, { type: "wiki_image", plugin: Ue, options: {} }, { type: "preview_link_target_blank", plugin: Qe, options: {} }, { type: "pgbr", plugin: Ze, options: {} }, { type: "chat_saved_note", plugin: st, options: {} }, { type: "note_cover_placeholder", plugin: Re, options: {} }, { type: "haim_table", plugin: Xe, options: {} }, { type: "plan_frontmatter", plugin: ue, options: {} }, { type: "mermaid", plugin: Pt, options: {} }];
function Rt(e) {
  e.set({ html: true, breaks: true, linkify: true }), e.linkify && e.linkify.set({ fuzzyLink: true });
}
function Xt(e, t = {}) {
  Rt(e), t.xss !== false && ye(e, { extendedWhiteList: Lt }), Pe(e);
}
function Nt(e) {
  let t = e;
  for (const i of _e) t.some((a) => a.type === i.type) || (t = [...t, i]);
  return t;
}
function Ut(e) {
  for (const t of _e) e.use(t.plugin, t.options);
}
function Qt(e) {
  return Nt(e);
}
function Vt(e) {
  O(e);
}
function Yt(e) {
  O(e), ue(e);
}
export {
  Yt as a,
  Vt as b,
  Xt as c,
  Ut as d,
  Qt as e,
  qt as f,
  Wt as g,
  Kt as u
};
