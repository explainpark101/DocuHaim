import { o as z, q as I, t as O, u as q, v as f, w as E, x as G, y as b, z as M } from "./index-RydzSnnb.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-BebLMpT_.js";
import "./vendor-aws-BPUgBAdC.js";
import "./vendor-lucide-DsWVGDs1.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-BWhlk-Y9.js";
import "./vendor-google-genai-BXoTgYIl.js";
function g(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function L(e) {
  return e ? ` align="${e}"` : "";
}
function D(e, t, c) {
  const i = e.rows.length, a = Math.max(1, ...e.rows.map((o) => o.length), e.aligns.length), u = I(t.merges), r = O(t, i), h = Math.min(Math.max(0, t.footerRows), Math.max(0, i - r)), p = r, $ = i - h, w = (o, s) => {
    var _a;
    const m = [];
    for (let l = 0; l < a; l += 1) {
      if (u.has(`${o},${l}`)) continue;
      const H = E(t.merges, o, l), C = (H == null ? void 0 : H.colspan) ?? 1, v = (H == null ? void 0 : H.rowspan) ?? 1, S = { row: o, col: l, rowCount: i, colCount: a, meta: t };
      c !== void 0 && (S.template = c);
      const T = G(S);
      let d = f(T);
      const W = b(t.colWidths, l);
      W && (d = M(d, `width:${W}`));
      const A = b(t.rowHeights, o);
      A && (d = M(d, `height:${A}`));
      const j = e.aligns[l] ?? null, k = g(((_a = e.rows[o]) == null ? void 0 : _a[l]) ?? ""), B = [C > 1 ? ` colspan="${C}"` : "", v > 1 ? ` rowspan="${v}"` : "", L(j), d ? ` style="${d}"` : "", ` data-haim-r="${o}"`, ` data-haim-c="${l}"`].join("");
      m.push(`<${s}${B}>${k}</${s}>`);
    }
    const x = b(t.rowHeights, o);
    return `<tr${x ? ` style="height:${x}"` : ""}>${m.join("")}</tr>`;
  }, n = [], y = q(t), R = [' data-haim-table="1"', t.noHeader ? ' data-haim-no-header="1"' : "", ` data-haim-width="${t.width}"`, t.width === "fit" || t.boxWidth ? ` data-haim-align="${t.align}"` : "", t.boxWidth ? ` data-haim-box-w="${g(t.boxWidth)}"` : "", t.boxHeight ? ` data-haim-box-h="${g(t.boxHeight)}"` : "", y ? ` style="${y}"` : ""].join("");
  if (n.push(`<table${R}>`), r > 0) {
    const o = f(t.sections.thead ?? {}, { includeOuterBorder: true });
    n.push(`<thead${o ? ` style="${o}"` : ""}>`);
    for (let s = 0; s < r; s += 1) n.push(w(s, "th"));
    n.push("</thead>");
  }
  if ($ > p) {
    const o = f(t.sections.tbody ?? {}, { includeOuterBorder: true });
    n.push(`<tbody${o ? ` style="${o}"` : ""}>`);
    for (let s = p; s < $; s += 1) n.push(w(s, "td"));
    n.push("</tbody>");
  }
  if (h > 0) {
    const o = f(t.sections.tfoot ?? {}, { includeOuterBorder: true });
    n.push(`<tfoot${o ? ` style="${o}"` : ""}>`);
    for (let s = $; s < i; s += 1) n.push(w(s, "td"));
    n.push("</tfoot>");
  }
  return n.push("</table>"), n.join("");
}
function Z(e, t) {
  const c = e.replace(/\r\n/g, `
`), i = z(c, { onlyWithComment: true });
  if (!i.length) return c;
  let a = "", u = 0;
  for (const r of i) {
    a += c.slice(u, r.start);
    const h = r.meta, p = h.templateId && t ? t(h.templateId) ?? null : null;
    a += D(r.grid, h, p), u = r.end;
  }
  return a += c.slice(u), a;
}
export {
  Z as convertHaimTablesToHtmlInMarkdown,
  D as haimTableToHtml
};
