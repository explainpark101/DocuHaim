import { N as ve } from "./vendor-md-editor-1ccdjpui.js";
import { eC as Ae, b8 as W, eD as $e, A as Ee, eE as Te, G as Pe, F as K, H as L, I as O, bb as Ce, eF as X, aY as Re, a_ as q, eG as Le, eH as Oe, eI as Y, eJ as U, eK as ze, bu as M, eL as He } from "./index-BoYUXkF3.js";
import { p as Be } from "./wikiImageResolver-BVvaavME.js";
import { t as Fe, p as Ne, E as P, r as je, c as De, n as Ge } from "./emojiShortcode-B-ELrzz3.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import { e as We, r as Ke } from "./styleResolve-IsiXtoFH.js";
import { r as Xe } from "./mermaidTheme-Deyx0OD8.js";
const qe = /^<!--\s*haim-table\b/;
function z(e) {
  return !e || e.type !== "html_block" && e.type !== "html_inline" ? false : qe.test(String(e.content || "").trim());
}
function Ye(e) {
  const t = /<!--\s*haim-table\s*([\s\S]*?)-->/.exec(e);
  return t ? $e(t[1] ?? "") ?? W() : W();
}
function Ue(e, t) {
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
function Ve(e, t, n) {
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
function Ze(e, t, n, r, i, s) {
  var _a, _b;
  const o = e.tokens, a = Ve(o, n, r);
  if (!a.length) {
    o[t] && (o[t].hidden = true, o[t].content = "");
    return;
  }
  const l = a.length, c = Math.max(1, ...a.map((h) => h.cells.length)), u = Ee(i.merges), d = We(i, l), p = Math.min(Math.max(0, i.footerRows), Math.max(0, l - d));
  (_a = o[n]) == null ? void 0 : _a.attrSet("data-haim-table", "1"), i.noHeader && ((_b = o[n]) == null ? void 0 : _b.attrSet("data-haim-no-header", "1")), o[n] && Te((h, b) => o[n].attrSet(h, b), i, o[n].attrGet("style"));
  for (let h = 0; h < a.length; h += 1) {
    const b = a[h];
    for (let m = 0; m < b.cells.length; m += 1) {
      const x = b.cells[m], S = o[x.openIdx];
      if (!S) continue;
      if (u.has(`${h},${m}`)) {
        S.hidden = true, x.inlineIdx >= 0 && o[x.inlineIdx] && (o[x.inlineIdx].hidden = true), o[x.closeIdx] && (o[x.closeIdx].hidden = true);
        continue;
      }
      const v = Pe(i.merges, h, m);
      v && (v.colspan > 1 && S.attrSet("colspan", String(v.colspan)), v.rowspan > 1 && S.attrSet("rowspan", String(v.rowspan)));
      const Me = Ke({ row: h, col: m, rowCount: l, colCount: c, meta: i, template: s });
      let $ = K(Me);
      const D = L(i.colWidths, m);
      D && ($ = O($, `width:${D}`));
      const G = L(i.rowHeights, h);
      G && ($ = O($, `height:${G}`)), $ && S.attrSet("style", $), S.attrSet("data-haim-r", String(h)), S.attrSet("data-haim-c", String(m));
    }
    const g = L(i.rowHeights, h);
    if (g && o[b.openIdx]) {
      const m = o[b.openIdx];
      m.attrSet("style", O(m.attrGet("style"), `height:${g}`));
    }
  }
  const f = a.slice(0, d), w = a.slice(d, l - p), y = p > 0 ? a.slice(l - p) : [];
  for (const h of f) for (const b of h.cells) {
    const g = o[b.openIdx], m = o[b.closeIdx];
    g && (g.tag = "th", g.type = "th_open"), m && (m.tag = "th", m.type = "th_close");
  }
  for (const h of [...w, ...y]) for (const b of h.cells) {
    const g = o[b.openIdx], m = o[b.closeIdx];
    g && (g.tag = "td", g.type = "td_open"), m && (m.tag = "td", m.type = "td_close");
  }
  const k = [], I = (h, b) => {
    if (!b.length) return;
    const g = new e.Token(`${h}_open`, h, 1), m = K(i.sections[h] ?? {}, { includeOuterBorder: true });
    m && g.attrSet("style", m), g.attrSet("data-haim-section", h), k.push(g);
    for (const x of b) for (let S = x.openIdx; S <= x.closeIdx; S += 1) {
      const v = o[S];
      v && k.push(v);
    }
    k.push(new e.Token(`${h}_close`, h, -1));
  };
  I("thead", f), I("tbody", w), I("tfoot", y);
  const _ = [...o.slice(0, n + 1), ...k, ...o.slice(r)];
  if (t >= 0 && t < _.length && z(_[t])) _[t].hidden = true, _[t].content = "";
  else for (const h of _) z(h) && (h.hidden = true, h.content = "");
  e.tokens.length = 0, e.tokens.push(..._);
}
function Je(e) {
  e.core.ruler.after("block", "haim_table", (t) => {
    for (let n = 0; n < 50; n += 1) {
      let r = null;
      for (let s = 0; s < t.tokens.length; s += 1) {
        const o = t.tokens[s];
        if (!o || !z(o) || o.hidden) continue;
        const a = Ye(o.content), l = Ue(t.tokens, s + 1);
        if (l) {
          r = { commentIdx: s, tableStart: l.start, tableEnd: l.end, meta: a };
          break;
        }
      }
      if (!r) break;
      const i = r.meta.templateId ? Ae(r.meta.templateId) : null;
      Ze(t, r.commentIdx, r.tableStart, r.tableEnd, r.meta, i);
    }
  });
}
const V = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
function Z(e) {
  const t = Be(e);
  return !t || t.startsWith("blob:") || t.startsWith("data:") ? V : t;
}
function J(e) {
  return e ? [e[0], e[1]] : null;
}
function Qe(e) {
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
          const c = Ce(l[1]), u = c == null ? void 0 : c.path;
          if (!u) {
            const f = new n.Token("text", "", 0);
            f.content = l[0], i.push(f), a = l.index + l[0].length;
            continue;
          }
          const d = new n.Token("wiki_image", "img", 0);
          d.attrSet("data-wiki-path", u), (c == null ? void 0 : c.width) && d.attrSet("data-wiki-width", c.width), (c == null ? void 0 : c.height) && d.attrSet("data-wiki-height", c.height), (c == null ? void 0 : c.background) && d.attrSet("data-wiki-bg", c.background);
          const p = X(c ?? {});
          p && d.attrSet("style", p), d.attrSet("src", Z(u)), d.attrSet("alt", ""), i.push(d), a = l.index + l[0].length;
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
      const w = u.slice(2);
      if (!w.some((m) => m.type === "text" && m.content && m.content.trim())) {
        i.push(a);
        continue;
      }
      const k = new n.Token("figure_open", "figure", 1);
      k.block = true, k.map = J(a.map);
      const I = new n.Token("inline", "", 0);
      I.children = [d], I.level = (a.level || 0) + 1;
      const _ = new n.Token("figcaption_open", "figcaption", 1);
      _.block = true, _.level = (a.level || 0) + 1;
      const h = new n.Token("inline", "", 0);
      h.children = w, h.level = (a.level || 0) + 2;
      const b = new n.Token("figcaption_close", "figcaption", -1);
      b.block = true, b.level = (a.level || 0) + 1;
      const g = new n.Token("figure_close", "figure", -1);
      g.block = true, g.level = a.level || 0, i.push(k, I, _, h, b, g), s = true, o += 2;
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
      const w = l.children || [], y = w[0];
      if (w.length !== 1 || !y || y.type !== "wiki_image") {
        i.push(a);
        continue;
      }
      const k = d.children || [];
      if (!k.some((S) => S.type === "text" && S.content && S.content.trim())) {
        i.push(a);
        continue;
      }
      const _ = new n.Token("figure_open", "figure", 1);
      _.block = true, _.map = J(a.map);
      const h = new n.Token("inline", "", 0);
      h.children = w, h.level = (a.level || 0) + 1;
      const b = new n.Token("figcaption_open", "figcaption", 1);
      b.block = true, b.level = (a.level || 0) + 1;
      const g = new n.Token("inline", "", 0);
      g.children = k, g.level = (a.level || 0) + 2;
      const m = new n.Token("figcaption_close", "figcaption", -1);
      m.block = true, m.level = (a.level || 0) + 1;
      const x = new n.Token("figure_close", "figure", -1);
      x.block = true, x.level = a.level || 0, i.push(_, h, b, g, m, x), s = true, o += 5;
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
          a.attrSet("src", Z(d)), a.attrSet("data-storage-image", "1");
        }
        const u = s[o + 1];
        if ((u == null ? void 0 : u.type) === "text") {
          const d = u.content || "", p = d.match(/^\{([^}\n]+)\}/);
          if (p) {
            const f = Le(`{${p[1]}}`);
            f.width && a.attrSet("data-md-width", f.width), f.height && a.attrSet("data-md-height", f.height), f.background && a.attrSet("data-md-bg", f.background);
            const w = X(f);
            w && a.attrSet("style", w);
            const y = d.slice(p[0].length);
            if (y) {
              const k = new n.Token("text", "", 0);
              k.content = y, i.push(a, k);
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
function et(e) {
  const t = e.renderer.rules.link_open || function(r, i, s, o, a) {
    return a.renderToken(r, i, s);
  };
  e.renderer.rules.link_open = function(r, i, s, o, a) {
    const l = r[i];
    if (!l) return t(r, i, s, o, a);
    const c = l.attrGet("href") || "";
    return !(l.attrGet("data-chat-saved-note") === "1") && Oe(c) && (l.attrSet("target", "_blank"), l.attrSet("rel", "noopener noreferrer")), t(r, i, s, o, a);
  };
}
const C = /<pgbr\s*\/?\s*>/gi;
function N(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function tt(e) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(e ?? "").trim());
}
function Q(e) {
  const t = new e.Token("html_inline", "", 0);
  return t.content = '<span class="md-pgbr" data-md-pgbr="1"></span>', t;
}
const de = /<span class="md-pgbr"/;
function ue(e) {
  let t = 0;
  for (const n of e.children || []) n.type === "html_inline" && (de.test(n.content) || N(n.content)) && (t += 1);
  return t;
}
function nt(e) {
  var _a;
  if (e.type !== "inline" || !((_a = e.children) == null ? void 0 : _a.length)) return false;
  for (const t of e.children) if (!(t.type === "softbreak" || t.type === "hardbreak") && !(t.type === "text" && !t.content.trim()) && !(t.type === "html_inline" && (de.test(t.content) || N(t.content)))) return false;
  return ue(e) > 0;
}
function ee(e) {
  const t = new e.Token("html_block", "", 0);
  return t.content = '<div class="md-pgbr" data-md-pgbr="1"></div>', t.block = true, t;
}
function it(e, t) {
  if (!(t == null ? void 0 : t.length)) return t;
  const n = [];
  for (const r of t) {
    if (r.type === "html_inline" && N(r.content)) {
      n.push(Q(e));
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
      n.push(Q(e)), s = o.index + o[0].length;
    }
    if (s < i.length) {
      const a = new e.Token("text", "", 0);
      a.content = i.slice(s), n.push(a);
    }
  }
  return n;
}
function rt(e) {
  e.core.ruler.push("pgbr-mark", (t) => (t.tokens.forEach((n) => {
    n.type !== "inline" || !n.children || (n.children = it(t, n.children));
  }), true)), e.core.ruler.after("pgbr-mark", "pgbr-unwrap-paragraph", (t) => {
    const { tokens: n } = t, r = [];
    let i = 0;
    for (; i < n.length; ) {
      if (i + 2 < n.length && n[i].type === "paragraph_open" && n[i + 1].type === "inline" && n[i + 2].type === "paragraph_close" && nt(n[i + 1])) {
        const s = ue(n[i + 1]);
        for (let o = 0; o < s; o += 1) r.push(ee(t));
        i += 3;
        continue;
      }
      r.push(n[i]), i += 1;
    }
    return t.tokens = r, true;
  }), e.core.ruler.after("pgbr-unwrap-paragraph", "pgbr-normalize-html-block", (t) => (t.tokens = t.tokens.map((n) => n.type === "html_block" && tt(n.content) ? ee(t) : n), true));
}
function te(e) {
  return e === 9 || e === 32;
}
function at(e, t, n, r) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return false;
  let o = e.src.charCodeAt(i);
  if (o !== 35 || i >= s) return false;
  let a = 1;
  for (o = e.src.charCodeAt(++i); o === 35 && i < s && a < Y; ) a += 1, o = e.src.charCodeAt(++i);
  if (a > Y || i < s && !te(o)) return false;
  if (r) return true;
  s = e.skipSpacesBack(s, i);
  const l = e.skipCharsBack(s, 35, i);
  l > i && te(e.src.charCodeAt(l - 1)) && (s = l), e.line = t + 1;
  const c = "#".repeat(a), u = a <= U ? `h${a}` : "h6", d = e.push("heading_open", u, 1);
  d.markup = c, d.map = [t, e.line], a > U && (d.attrSet("data-heading-level", String(a)), d.attrSet("class", `md-heading md-heading-${a}`));
  const p = e.push("inline", "", 0);
  p.content = e.src.slice(i, s).trim(), p.map = [t, e.line], p.children = [];
  const f = e.push("heading_close", u, -1);
  return f.markup = c, true;
}
function j(e) {
  e.block.ruler.at("heading", at);
}
const ne = /^---[ \t]*\r?\n/;
function ot(e) {
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
function st(e) {
  const t = String(e ?? "").trim().toLowerCase().replace(/_/g, "-");
  return t === "completed" || t === "complete" || t === "done" ? "completed" : t === "in-progress" || t === "inprogress" || t === "progress" ? "in_progress" : t === "cancelled" || t === "canceled" ? "cancelled" : t === "error" || t === "failed" || t === "fail" ? "error" : "pending";
}
function lt(e, t) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const n = e, r = A(n.content) ?? A(n.title);
  return r ? { id: A(n.id) ?? `todo-${t + 1}`, content: r, status: st(n.status) } : null;
}
function ct(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return false;
  const t = e;
  return !(!Array.isArray(t.todos) || t.name != null && typeof t.name != "string" && typeof t.name != "number");
}
function dt(e) {
  let t;
  try {
    t = ze(String(e ?? ""));
  } catch {
    return null;
  }
  if (!ct(t)) return null;
  const n = [];
  for (let o = 0; o < t.todos.length; o += 1) {
    const a = lt(t.todos[o], o);
    a && n.push(a);
  }
  const r = A(t.name) ?? A(t.title) ?? "Plan", i = A(t.overview) ?? A(t.description) ?? "", s = t.isProject === true || t.is_project === true;
  return { name: r, overview: i, todos: n, isProject: s };
}
function T(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const ut = { pending: "Pending", in_progress: "In progress", completed: "Completed", cancelled: "Cancelled", error: "Error" };
function ht(e) {
  const t = e.status, n = ut[t];
  return [`<li class="md-plan-frontmatter__todo md-plan-frontmatter__todo--${t}" data-status="${t}">`, `<span class="md-plan-frontmatter__icon md-plan-frontmatter__icon--${t}" aria-hidden="true"></span>`, '<span class="md-plan-frontmatter__todo-body">', `<span class="md-plan-frontmatter__todo-content">${T(e.content)}</span>`, `<span class="md-plan-frontmatter__status-label">${T(n)}</span>`, "</span>", "</li>"].join("");
}
function mt(e) {
  const t = e.todos.filter((a) => a.status === "completed").length, n = e.todos.length, r = n > 0 ? `${t}/${n}` : "0/0", i = e.isProject ? '<span class="md-plan-frontmatter__badge" data-md-plan-project="1">Project</span>' : "", s = e.overview ? `<p class="md-plan-frontmatter__overview">${T(e.overview)}</p>` : "", o = e.todos.length ? ['<ul class="md-plan-frontmatter__todos">', ...e.todos.map(ht), "</ul>"].join("") : '<p class="md-plan-frontmatter__empty">No todos</p>';
  return ['<div class="md-plan-frontmatter" data-md-plan="1" role="region" aria-label="Plan">', '<div class="md-plan-frontmatter__header">', `<div class="md-plan-frontmatter__name" role="heading" aria-level="2">${T(e.name)}</div>`, '<div class="md-plan-frontmatter__meta">', i, `<span class="md-plan-frontmatter__progress" data-md-plan-progress="1">${T(r)}</span>`, "</div>", "</div>", s, o, "</div>"].join("");
}
function pt(e) {
  if (e.lineMax < 2) return -1;
  const t = e.bMarks[0] + e.tShift[0], n = e.eMarks[0], r = e.src.slice(t, n);
  if (!/^---[ \t]*$/.test(r)) return -1;
  for (let i = 1; i < e.lineMax; i += 1) {
    const s = e.bMarks[i] + e.tShift[i], o = e.eMarks[i], a = e.src.slice(s, o);
    if (/^---[ \t]*$/.test(a)) return i + 1;
  }
  return -1;
}
function ft(e, t, n, r) {
  if (t !== 0) return false;
  const i = pt(e);
  if (i < 0) return false;
  const s = e.bMarks[0];
  let o = e.eMarks[i - 1];
  e.src[o] === "\r" && (o += 1), e.src[o] === `
` && (o += 1);
  const a = e.src.slice(s, o), l = ot(a);
  if (!l) return false;
  const c = dt(l.yaml);
  if (!c) return false;
  if (r) return true;
  const u = e.push("html_block", "", 0);
  return u.content = mt(c), u.map = [t, i], u.markup = "---", u.block = true, e.line = i, true;
}
const gt = ["paragraph", "reference", "blockquote", "list"];
function he(e) {
  const t = ft, n = { alt: [...gt] };
  try {
    e.block.ruler.before("hr", "plan_frontmatter", t, n);
  } catch {
    e.block.ruler.before("fence", "plan_frontmatter", t, n);
  }
}
const ie = 42;
function bt(e, t) {
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
function wt(e) {
  e.inline.ruler.before("emphasis", "better_strong", bt), e.renderer.rules.strong_open = () => "<b>", e.renderer.rules.strong_close = () => "</b>";
}
const me = /^Mermaid!\[\]\((data:image\/[^)]+)\)\s*$/i, pe = /^!\[\]\((data:image\/[^)]+)\)\s*$/i, H = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{48,}/i;
function B(e) {
  return /^mermaid$/i.test(e.trim());
}
function fe(e, t) {
  const n = t.trim();
  return me.test(n) || B(e) && pe.test(n) || B(e) && H.test(n) ? true : /^Mermaid!\[\]\(/i.test(n) && H.test(n);
}
function ge(e) {
  const t = e.trim(), n = me.exec(t);
  if (n == null ? void 0 : n[1]) return n[1];
  const r = pe.exec(t);
  return (r == null ? void 0 : r[1]) ? r[1] : null;
}
function kt(e) {
  var _a;
  return ((_a = /^data:image\/([a-z0-9.+-]+)/i.exec(e)) == null ? void 0 : _a[1]) ?? "image";
}
function _t(e) {
  const t = Math.round(e * 3 / 4);
  return t >= 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)}MB` : t >= 1024 ? `${Math.max(1, Math.round(t / 1024))}KB` : `${t}B`;
}
function yt(e) {
  var _a;
  const t = e.trim(), n = ge(t);
  if (n) {
    const i = ((_a = n.match(/;base64,([A-Za-z0-9+/=]+)/i)) == null ? void 0 : _a[1]) ?? "";
    return `![](\u2026${kt(n)} ${_t(i.length)}\u2026)`;
  }
  if (H.test(t)) return "\u2026base64 payload\u2026";
  const r = t.split(`
`).length;
  return r > 1 ? `${r} lines` : t.length > 48 ? `${t.slice(0, 40)}\u2026` : t;
}
function rn(e, t, n) {
  const r = e.slice(t, n), i = /^```([^\n]*)\n([\s\S]*)\n?```$/.exec(r);
  if (!i) return null;
  const s = i[1] ?? "", o = i[2] ?? "";
  if (!fe(s, o)) return null;
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
function xt(e) {
  const t = String(e ?? "").trim();
  if (!t) return { width: null, height: null };
  let n = null, r = null;
  const i = t.split(/\s+/).filter(Boolean), s = /^mermaid$/i.test(i[0] ?? "") ? 1 : 0;
  for (let o = s; o < i.length; o += 1) {
    const a = i[o] ?? "", l = /^(\d+)x(\d+)$/i.exec(a);
    if (l) {
      n = M(l[1]), r = M(l[2]);
      continue;
    }
    if (/^\d+$/.test(a) && n == null) {
      n = M(a);
      continue;
    }
    const c = /^([a-zA-Z_]+)=(.*)$/.exec(a);
    if (!c) continue;
    const u = (c[1] ?? "").toLowerCase(), d = M(c[2]);
    d && (u === "w" || u === "width" ? n = d : (u === "h" || u === "height") && (r = d));
  }
  return { width: n, height: r };
}
function St(e) {
  const t = ["mermaid"];
  return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), t.join(" ");
}
function be(e) {
  const t = [];
  return e.width && t.push(`width:${e.width}`), e.height && t.push(`height:${e.height}`), t.length ? `${t.join(";")};` : null;
}
function an(e, t) {
  const n = [];
  for (const r of e.querySelectorAll(".md-editor-mermaid")) r.closest(".haim-mermaid-embed-source") || r.closest(".export-pdf-staging") || r.getAttribute("data-processed") != null && n.push(r);
  return n.findIndex((r) => r === t);
}
function It(e, { occurrence: t = 0, width: n = null, height: r = null }) {
  const i = String(e ?? ""), s = [];
  re.lastIndex = 0;
  let o;
  for (; (o = re.exec(i)) !== null; ) s.push({ index: o.index, full: o[0], infoTail: o[1] ?? "" });
  const a = s[t];
  if (!a) return { markdown: i, updated: false };
  const c = `\`\`\`${St({ width: n ? M(n) : null, height: r ? M(r) : null })}
`;
  return c === a.full ? { markdown: i, updated: false } : { markdown: i.slice(0, a.index) + c + i.slice(a.index + a.full.length), updated: true };
}
const ae = /([\w-]+)="([^"]*)"/g, oe = /^```mermaid\b([^\n]*)\r?\n/gim, Mt = /<!--\s*mermaid-size\s+([^>]*?)-->[ \t]*(?:\r?\n[ \t]*)*$/i, vt = /^<!--\s*mermaid-size\s+([^>]*?)-->\s*$/i;
function se(e) {
  return String(e ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/\r\n/g, `
`).replace(/\n/g, "&#10;").replace(/\r/g, "");
}
function At(e) {
  return String(e ?? "").replace(/&#10;/g, `
`).replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function we(e) {
  const t = {};
  ae.lastIndex = 0;
  let n;
  for (; (n = ae.exec(e)) !== null; ) {
    const s = n[1], o = n[2];
    !s || o == null || (t[s] = At(o));
  }
  const r = M(t.width || t.w || ""), i = M(t.height || t.h || "");
  return !r && !i ? null : { width: r, height: i };
}
function $t(e) {
  const t = ["<!-- mermaid-size"];
  return e.width && t.push(`width="${se(e.width)}"`), e.height && t.push(`height="${se(e.height)}"`), t.push("-->"), t.join(" ");
}
function Et(e, t) {
  if (t <= 0) return null;
  const r = e.slice(0, t).match(Mt);
  if (!r || r.index == null || !r[1]) return null;
  const i = we(r[1]);
  return i ? { size: i, start: r.index, end: r.index + r[0].length } : null;
}
function le(e) {
  const t = [], n = new RegExp(oe.source, oe.flags);
  let r;
  for (; (r = n.exec(e)) !== null; ) t.push(r.index);
  return t;
}
const Tt = /^```mermaid[^\n]*\r?\n([\s\S]*?)^```/gm;
function on(e, t, n = 0) {
  const r = String(t ?? "").trim();
  if (!r) return -1;
  const i = [], s = new RegExp(Tt.source, "gm");
  let o = 0, a;
  for (; (a = s.exec(e)) !== null; ) (a[1] || "").trim() === r && i.push(o), o += 1;
  return i[n] ?? i[0] ?? -1;
}
function ke(e, t) {
  for (let n = t - 1; n >= 0; n -= 1) {
    const r = e[n] ?? "";
    if (!r.trim()) continue;
    const i = vt.exec(r.trim());
    if (!i) break;
    return we(i[1] ?? "");
  }
  return null;
}
function _e(e, t) {
  const n = xt(e);
  return !(t == null ? void 0 : t.width) && !(t == null ? void 0 : t.height) ? n : { width: t.width ?? n.width, height: t.height ?? n.height };
}
function sn(e, { occurrence: t = 0, width: n = null, height: r = null }) {
  const i = String(e ?? "");
  if (le(i)[t] == null) return { markdown: i, updated: false };
  const a = n ? M(n) : null, l = r ? M(r) : null;
  let c = i, u = false;
  const d = It(c, { occurrence: t, width: null, height: null });
  d.updated && (c = d.markdown, u = true);
  const p = le(c)[t];
  if (p == null) return { markdown: c, updated: u };
  const f = Et(c, p);
  if (!a && !l) return f && (c = c.slice(0, f.start) + c.slice(f.end), u = true), { markdown: c, updated: u };
  const w = $t({ width: a, height: l });
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
const F = "md-editor";
function ye(e, t) {
  var _a, _b, _c;
  if (!e.map || e.level !== 0) return true;
  const n = e.map[1] - 1;
  return !!((_c = (_b = (_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a[n]) == null ? void 0 : _b.trim()) == null ? void 0 : _c.startsWith("```"));
}
function R(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function xe(e, t, n) {
  var _a;
  const r = n != null && ((_a = t == null ? void 0 : t.srcLines) == null ? void 0 : _a.length) ? ke(t.srcLines, n) : null, i = _e(e, r), s = [];
  if (i.width && s.push(`data-mermaid-width="${R(i.width)}"`), i.height && s.push(`data-mermaid-height="${R(i.height)}"`), i.width || i.height) {
    s.push('data-mermaid-sized="1"');
    const o = be(i);
    o && s.push(`style="${R(o)}max-width:100%;overflow:hidden;"`);
  }
  return s;
}
function Pt(e, t, n, r) {
  var _a;
  const i = (_a = e.map) == null ? void 0 : _a[0], s = [`class="${F}-mermaid"`, `data-mermaid-theme="${n}"`, 'data-haim-mermaid-lazy="1"', ...xe(r, t, typeof i == "number" ? i : void 0)];
  return e.map && e.level === 0 && (s.push(`data-closed="${String(ye(e, t))}"`), s.push(`data-line="${String(e.map[0])}"`)), s.join(" ");
}
function ce(e, t, n, r, i) {
  const s = e.utils.escapeHtml(r), o = e.utils.escapeHtml(n);
  return `<div class="haim-mermaid-embed" data-haim-mermaid-embed="1"><details class="md-editor-code haim-mermaid-embed-source"><summary class="md-editor-code-head"><span class="md-editor-code-lang">${e.utils.escapeHtml(t)}</span><span class="haim-mermaid-embed-summary">${o}</span></summary><pre class="haim-mermaid-embed-pre"><code>${s}</code></pre></details><div class="haim-mermaid-embed-render">${i}</div></div>`;
}
function Ct(e) {
  const t = e.renderer.rules.fence;
  e.renderer.rules.fence = (n, r, i, s, o) => {
    var _a, _b;
    const a = n[r];
    if (!a) return t ? t(n, r, i, s, o) : o.renderToken(n, r, i);
    const l = a.info.trim(), c = l.split(/\s+/)[0] ?? "", d = a.content.trim(), p = B(c), f = fe(c, d);
    if (!p && !f) return t ? t(n, r, i, s, o) : o.renderToken(n, r, i);
    const w = s, y = Xe(), k = ge(d), I = p ? "mermaid" : "Mermaid", _ = yt(d), h = (_a = a.map) == null ? void 0 : _a[0], b = xe(l, w, typeof h == "number" ? h : void 0);
    if (k) {
      const m = `<p class="${F}-mermaid haim-mermaid-image-embed" data-processed="" data-haim-mermaid-image="1"${b.length ? ` ${b.join(" ")}` : ""}><img src="${R(k)}" alt="Mermaid" class="haim-mermaid-embed-img" /></p>`;
      return ce(e, I, _, d, m);
    }
    if (f) {
      const x = `<div ${Pt(a, w, y, l)}></div>`;
      return ce(e, I, _, d, x);
    }
    a.attrSet("class", `${F}-mermaid`), a.attrSet("data-mermaid-theme", y), a.attrSet("data-haim-mermaid-lazy", "1");
    const g = _e(l, typeof h == "number" && ((_b = w == null ? void 0 : w.srcLines) == null ? void 0 : _b.length) ? ke(w.srcLines, h) : null);
    if (g.width && a.attrSet("data-mermaid-width", g.width), g.height && a.attrSet("data-mermaid-height", g.height), g.width || g.height) {
      a.attrSet("data-mermaid-sized", "1");
      const m = be(g);
      m && a.attrSet("style", `${m}max-width:100%;overflow:hidden;`);
    }
    return a.map && a.level === 0 && (a.attrSet("data-closed", String(ye(a, w))), a.attrSet("data-line", String(a.map[0]))), `<div ${o.renderAttrs(a)}>${e.utils.escapeHtml(d)}</div>`;
  };
}
const Rt = /^\[([ xX~])\] /;
function E(e, t, n) {
  const r = e.attrIndex(t), i = [t, n];
  if (r < 0) {
    e.attrPush(i);
    return;
  }
  e.attrs = e.attrs ?? [], e.attrs[r] = i;
}
function Lt(e) {
  return (e == null ? void 0 : e.type) === "inline";
}
function Ot(e) {
  return (e == null ? void 0 : e.type) === "paragraph_open";
}
function zt(e) {
  return (e == null ? void 0 : e.type) === "list_item_open";
}
function Se(e) {
  var _a;
  const t = e.match(Rt);
  if (!t) return null;
  const n = t[1];
  return { status: Ne(n), kind: Fe(n), markerLen: ((_a = t[0]) == null ? void 0 : _a.length) ?? 4 };
}
function Ht(e, t) {
  var _a;
  return Lt(e[t]) && Ot(e[t - 1]) && zt(e[t - 2]) && !!Se(((_a = e[t]) == null ? void 0 : _a.content) ?? "");
}
function Bt(e, t) {
  var _a, _b;
  const n = (((_a = e[t]) == null ? void 0 : _a.level) ?? 0) - 1;
  for (let r = t - 1; r >= 0; r -= 1) if (((_b = e[r]) == null ? void 0 : _b.level) === n) return r;
  return -1;
}
function Ft(e) {
  const t = new e("html_inline", "", 0);
  return t.content = "<label>", t;
}
function Nt(e) {
  const t = new e("html_inline", "", 0);
  return t.content = "</label>", t;
}
function jt(e, t, n) {
  const r = new n("html_inline", "", 0);
  return r.content = `<label class="task-list-item-label" for="${t}">${e}</label>`, r.attrs = [["for", t]], r;
}
function Dt(e, t, n, r) {
  const i = new n("html_inline", "", 0), s = r.enabled ? " " : ' disabled="" ', o = e === "done" ? ' checked=""' : "", a = t === "status" ? " task-list-item-checkbox--status" : "", l = e === "doing" ? ' aria-checked="mixed"' : e === "done" ? ' aria-checked="true"' : ' aria-checked="false"';
  return i.content = `<input class="task-list-item-checkbox${a}" data-status="${e}" data-kind="${t}"${l}${o}${s}type="checkbox">`, i;
}
function Gt(e, t, n, r, i, s) {
  if (e.children = e.children ?? [], e.children.unshift(Dt(r, i, t.Token, n)), e.children[1] && (e.children[1].content = e.children[1].content.slice(s)), e.content = e.content.slice(s), n.label) if (n.labelAfter) {
    e.children.pop();
    const o = `task-item-${Math.ceil(Math.random() * (1e4 * 1e3) - 1e3)}`;
    e.children[0].content = `${e.children[0].content.slice(0, -1)} id="${o}">`, e.children.push(jt(e.content, o, t.Token));
  } else e.children.unshift(Ft(t.Token)), e.children.push(Nt(t.Token));
}
function Wt(e, t = {}) {
  e.core.ruler.after("inline", "github-task-lists", (n) => {
    var _a;
    const r = n.tokens;
    for (let i = 2; i < r.length; i += 1) {
      if (!Ht(r, i)) continue;
      const s = Se(((_a = r[i]) == null ? void 0 : _a.content) ?? "");
      s && (Gt(r[i], n, t, s.status, s.kind, s.markerLen), E(r[i - 2], "class", `task-list-item${t.enabled ? " enabled" : ""}`), E(r[i - 2], "data-status", s.status), E(r[i - 2], "data-kind", s.kind), s.status === "done" && E(r[i - 2], "data-checked", "true"), E(r[Bt(r, i - 2)], "class", "contains-task-list"));
    }
  });
}
function Kt(e, t) {
  const n = String(e.content ?? "");
  if (P.lastIndex = 0, !P.test(n)) return [e];
  const r = [];
  let i = 0;
  P.lastIndex = 0;
  let s;
  for (; (s = P.exec(n)) !== null; ) {
    const o = s[0], a = s[1] ?? "", l = je(a), c = s.index;
    if (!l) continue;
    if (c > i) {
      const d = new t("text", "", 0);
      d.content = n.slice(i, c), r.push(d);
    }
    const u = new t("text", "", 0);
    u.content = l, r.push(u), i = c + o.length;
  }
  if (r.length === 0) return [e];
  if (i < n.length) {
    const o = new t("text", "", 0);
    o.content = n.slice(i), r.push(o);
  }
  return r;
}
function Xt(e) {
  e.core.ruler.after("inline", "emoji_shortcode", (t) => {
    var _a;
    const n = t.Token;
    for (const r of t.tokens) {
      if (r.type !== "inline" || !((_a = r.children) == null ? void 0 : _a.length)) continue;
      const i = [];
      for (const s of r.children) {
        if (s.type !== "text" || !s.content.includes(":")) {
          i.push(s);
          continue;
        }
        i.push(...Kt(s, n));
      }
      r.children = i;
    }
  });
}
const qt = { br: [], pgbr: [], div: ["class", "data-md-pgbr", "data-md-plan", "data-note-cover-placeholder", "data-note-cover-mount", "data-note-cover-preview", "data-color-mode", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style", "role", "tabindex", "aria-label", "aria-level"], span: ["class", "data-md-pgbr", "data-md-plan-project", "data-md-plan-progress", "aria-hidden", "data-note-cover-fallback"], p: ["class", "data-mermaid-theme", "data-closed", "data-line", "data-content", "data-processed", "data-haim-mermaid-lazy", "data-haim-mermaid-error", "data-haim-mermaid-image", "data-haim-mermaid-embed", "data-haim-imgbb-replace-key", "data-mermaid-width", "data-mermaid-height", "data-mermaid-sized", "style"], details: ["class", "open", "data-haim-mermaid-embed"], summary: ["class"], ul: ["class", "data-type"], li: ["class", "id", "data-status", "data-checked", "data-type", "data-md-footnote-id", "data-md-footnote-label"], h6: ["id", "class", "data-heading-level"], a: ["href", "class", "id", "target", "rel", "data-chat-saved-note", "data-chat-href", "data-chat-id", "data-md-footnote-to", "data-md-footnote-id", "data-md-footnote-title", "aria-label", "title"], sup: ["class"], sub: ["class"], b: [], section: ["class"], hr: ["class"], ol: ["class"], table: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], thead: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tbody: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tfoot: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], tr: ["class", "style"], th: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], td: ["style", "class", "colspan", "rowspan", "align", "valign", "width", "height", "data-haim-table", "data-haim-no-header", "data-haim-r", "data-haim-c", "data-haim-section", "data-haim-width", "data-haim-align", "data-haim-box-w", "data-haim-box-h"], img: ["src", "alt", "title", "class", "style", "width", "height", "data-wiki-path", "data-wiki-width", "data-wiki-height", "data-md-src", "data-md-width", "data-md-height", "data-storage-image"], input: ["type", "checked", "disabled", "class", "id", "data-status", "aria-checked"], label: ["class", "for"] }, Ie = [{ type: "better_md", plugin: wt, options: {} }, { type: "heading_levels", plugin: j, options: {} }, { type: "wiki_image", plugin: Qe, options: {} }, { type: "preview_link_target_blank", plugin: et, options: {} }, { type: "pgbr", plugin: rt, options: {} }, { type: "chat_saved_note", plugin: De, options: {} }, { type: "note_cover_placeholder", plugin: Ge, options: {} }, { type: "haim_table", plugin: Je, options: {} }, { type: "plan_frontmatter", plugin: he, options: {} }, { type: "mermaid", plugin: Ct, options: {} }, { type: "task_list", plugin: Wt, options: { enabled: false, label: false } }, { type: "emoji_shortcode", plugin: Xt, options: {} }];
function Yt(e) {
  e.set({ html: true, breaks: true, linkify: true }), e.linkify && e.linkify.set({ fuzzyLink: true });
}
function ln(e, t = {}) {
  Yt(e), t.xss !== false && ve(e, { extendedWhiteList: qt }), He(e);
}
function Ut(e) {
  let t = e;
  for (const n of Ie) t.some((r) => r.type === n.type) || (t = [...t, n]);
  return t;
}
function cn(e) {
  for (const t of Ie) e.use(t.plugin, t.options);
}
function dn(e) {
  return Ut(e);
}
function un(e) {
  j(e);
}
function hn(e) {
  j(e), he(e);
}
export {
  hn as a,
  un as b,
  ln as c,
  cn as d,
  dn as e,
  on as f,
  an as g,
  rn as m,
  sn as u
};
