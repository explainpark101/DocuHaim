import { f as I, c as O, e as z, t as q, d as f, m as E, r as G, g as w, h as M } from "./index-siMg0SyX.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-DQ2k84v8.js";
import "./vendor-aws-DjU81Y0s.js";
import "./vendor-lucide-B9iB2q4-.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-CyZ5tkEq.js";
function b(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function L(e) {
  return e ? ` align="${e}"` : "";
}
function D(e, t, i) {
  const c = e.rows.length, a = Math.max(1, ...e.rows.map((o) => o.length), e.aligns.length), u = O(t.merges), r = z(t, c), h = Math.min(Math.max(0, t.footerRows), Math.max(0, c - r)), p = r, $ = c - h, g = (o, s) => {
    var _a;
    const y = [];
    for (let l = 0; l < a; l += 1) {
      if (u.has(`${o},${l}`)) continue;
      const H = E(t.merges, o, l), C = (H == null ? void 0 : H.colspan) ?? 1, v = (H == null ? void 0 : H.rowspan) ?? 1, S = { row: o, col: l, rowCount: c, colCount: a, meta: t };
      i !== void 0 && (S.template = i);
      const T = G(S);
      let d = f(T);
      const W = w(t.colWidths, l);
      W && (d = M(d, `width:${W}`));
      const A = w(t.rowHeights, o);
      A && (d = M(d, `height:${A}`));
      const j = e.aligns[l] ?? null, k = b(((_a = e.rows[o]) == null ? void 0 : _a[l]) ?? ""), B = [C > 1 ? ` colspan="${C}"` : "", v > 1 ? ` rowspan="${v}"` : "", L(j), d ? ` style="${d}"` : "", ` data-haim-r="${o}"`, ` data-haim-c="${l}"`].join("");
      y.push(`<${s}${B}>${k}</${s}>`);
    }
    const x = w(t.rowHeights, o);
    return `<tr${x ? ` style="height:${x}"` : ""}>${y.join("")}</tr>`;
  }, n = [], m = q(t), R = [' data-haim-table="1"', t.noHeader ? ' data-haim-no-header="1"' : "", ` data-haim-width="${t.width}"`, t.width === "fit" || t.boxWidth ? ` data-haim-align="${t.align}"` : "", t.boxWidth ? ` data-haim-box-w="${b(t.boxWidth)}"` : "", t.boxHeight ? ` data-haim-box-h="${b(t.boxHeight)}"` : "", m ? ` style="${m}"` : ""].join("");
  if (n.push(`<table${R}>`), r > 0) {
    const o = f(t.sections.thead ?? {}, { includeOuterBorder: true });
    n.push(`<thead${o ? ` style="${o}"` : ""}>`);
    for (let s = 0; s < r; s += 1) n.push(g(s, "th"));
    n.push("</thead>");
  }
  if ($ > p) {
    const o = f(t.sections.tbody ?? {}, { includeOuterBorder: true });
    n.push(`<tbody${o ? ` style="${o}"` : ""}>`);
    for (let s = p; s < $; s += 1) n.push(g(s, "td"));
    n.push("</tbody>");
  }
  if (h > 0) {
    const o = f(t.sections.tfoot ?? {}, { includeOuterBorder: true });
    n.push(`<tfoot${o ? ` style="${o}"` : ""}>`);
    for (let s = $; s < c; s += 1) n.push(g(s, "td"));
    n.push("</tfoot>");
  }
  return n.push("</table>"), n.join("");
}
function Y(e, t) {
  const i = e.replace(/\r\n/g, `
`), c = I(i, { onlyWithComment: true });
  if (!c.length) return i;
  let a = "", u = 0;
  for (const r of c) {
    a += i.slice(u, r.start);
    const h = r.meta, p = h.templateId && t ? t(h.templateId) ?? null : null;
    a += D(r.grid, h, p), u = r.end;
  }
  return a += i.slice(u), a;
}
export {
  Y as convertHaimTablesToHtmlInMarkdown,
  D as haimTableToHtml
};
