import { q as z, t as I, u as O, w as f, x as q, y as m, z as M } from "./index-DqXcJFiU.js";
import { e as E, r as G } from "./styleResolve-D4A7l-wW.js";
import "./vendor-react-BDjpSibw.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-lucide-Cix55NOo.js";
import "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-DuLpLUUM.js";
function b(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function L(e) {
  return e ? ` align="${e}"` : "";
}
function D(e, t, c) {
  const i = e.rows.length, a = Math.max(1, ...e.rows.map((o) => o.length), e.aligns.length), u = I(t.merges), r = E(t, i), h = Math.min(Math.max(0, t.footerRows), Math.max(0, i - r)), p = r, $ = i - h, w = (o, s) => {
    var _a;
    const y = [];
    for (let l = 0; l < a; l += 1) {
      if (u.has(`${o},${l}`)) continue;
      const H = q(t.merges, o, l), C = (H == null ? void 0 : H.colspan) ?? 1, v = (H == null ? void 0 : H.rowspan) ?? 1, S = { row: o, col: l, rowCount: i, colCount: a, meta: t };
      c !== void 0 && (S.template = c);
      const T = G(S);
      let d = f(T);
      const W = m(t.colWidths, l);
      W && (d = M(d, `width:${W}`));
      const A = m(t.rowHeights, o);
      A && (d = M(d, `height:${A}`));
      const j = e.aligns[l] ?? null, k = b(((_a = e.rows[o]) == null ? void 0 : _a[l]) ?? ""), B = [C > 1 ? ` colspan="${C}"` : "", v > 1 ? ` rowspan="${v}"` : "", L(j), d ? ` style="${d}"` : "", ` data-haim-r="${o}"`, ` data-haim-c="${l}"`].join("");
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
    a += D(r.grid, h, p), u = r.end;
  }
  return a += c.slice(u), a;
}
export {
  tt as convertHaimTablesToHtmlInMarkdown,
  D as haimTableToHtml
};
