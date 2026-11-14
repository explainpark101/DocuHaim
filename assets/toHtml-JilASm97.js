import { w as z, x as I, y as O, z as f, A as q, D as m, F as M } from "./index-BebLgvYF.js";
import { e as D, r as E } from "./styleResolve-D_dchqAE.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-react-BPvvDyqO.js";
import "./vendor-lucide-B8TfEQX9.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-CN5WtDh3.js";
function b(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function F(e) {
  return e ? ` align="${e}"` : "";
}
function G(e, t, c) {
  const i = e.rows.length, a = Math.max(1, ...e.rows.map((o) => o.length), e.aligns.length), u = I(t.merges), r = D(t, i), h = Math.min(Math.max(0, t.footerRows), Math.max(0, i - r)), p = r, $ = i - h, w = (o, s) => {
    var _a;
    const y = [];
    for (let l = 0; l < a; l += 1) {
      if (u.has(`${o},${l}`)) continue;
      const H = q(t.merges, o, l), C = (H == null ? void 0 : H.colspan) ?? 1, v = (H == null ? void 0 : H.rowspan) ?? 1, A = { row: o, col: l, rowCount: i, colCount: a, meta: t };
      c !== void 0 && (A.template = c);
      const T = E(A);
      let d = f(T);
      const S = m(t.colWidths, l);
      S && (d = M(d, `width:${S}`));
      const W = m(t.rowHeights, o);
      W && (d = M(d, `height:${W}`));
      const j = e.aligns[l] ?? null, k = b(((_a = e.rows[o]) == null ? void 0 : _a[l]) ?? ""), B = [C > 1 ? ` colspan="${C}"` : "", v > 1 ? ` rowspan="${v}"` : "", F(j), d ? ` style="${d}"` : "", ` data-haim-r="${o}"`, ` data-haim-c="${l}"`].join("");
      y.push(`<${s}${B}>${k}</${s}>`);
    }
    const x = m(t.rowHeights, o);
    return `<tr${x ? ` style="height:${x}"` : ""}>${y.join("")}</tr>`;
  }, n = [], g = O(t), R = [' data-haim-table="1"', t.noHeader ? ' data-haim-no-header="1"' : "", ` data-haim-width="${t.width}"`, t.width === "fit" || t.boxWidth ? ` data-haim-align="${t.align}"` : "", t.boxWidth ? ` data-haim-box-w="${b(t.boxWidth)}"` : "", t.boxHeight ? ` data-haim-box-h="${b(t.boxHeight)}"` : "", g ? ` style="${g}"` : ""].join("");
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
function tt(e, t) {
  const c = e.replace(/\r\n/g, `
`), i = z(c, { onlyWithComment: true });
  if (!i.length) return c;
  let a = "", u = 0;
  for (const r of i) {
    a += c.slice(u, r.start);
    const h = r.meta, p = h.templateId && t ? t(h.templateId) ?? null : null;
    a += G(r.grid, h, p), u = r.end;
  }
  return a += c.slice(u), a;
}
export {
  tt as convertHaimTablesToHtmlInMarkdown,
  G as haimTableToHtml
};
