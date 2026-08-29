import { k as I, m as O, o as q, t as z, q as f, u as E, v as G, w as b, x as A } from "./index--RQb7Uss.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-CaPNOYQq.js";
import "./vendor-aws-Ckci2rUT.js";
import "./vendor-lucide-ahlkbHbF.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-BCZRg-kq.js";
import "./vendor-google-genai-DGp6lEvQ.js";
function g(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function L(e) {
  return e ? ` align="${e}"` : "";
}
function D(e, t, c) {
  const i = e.rows.length, a = Math.max(1, ...e.rows.map((o) => o.length), e.aligns.length), u = O(t.merges), r = q(t, i), h = Math.min(Math.max(0, t.footerRows), Math.max(0, i - r)), p = r, $ = i - h, w = (o, s) => {
    var _a;
    const y = [];
    for (let l = 0; l < a; l += 1) {
      if (u.has(`${o},${l}`)) continue;
      const H = E(t.merges, o, l), C = (H == null ? void 0 : H.colspan) ?? 1, v = (H == null ? void 0 : H.rowspan) ?? 1, S = { row: o, col: l, rowCount: i, colCount: a, meta: t };
      c !== void 0 && (S.template = c);
      const R = G(S);
      let d = f(R);
      const W = b(t.colWidths, l);
      W && (d = A(d, `width:${W}`));
      const k = b(t.rowHeights, o);
      k && (d = A(d, `height:${k}`));
      const T = e.aligns[l] ?? null, j = g(((_a = e.rows[o]) == null ? void 0 : _a[l]) ?? ""), B = [C > 1 ? ` colspan="${C}"` : "", v > 1 ? ` rowspan="${v}"` : "", L(T), d ? ` style="${d}"` : "", ` data-haim-r="${o}"`, ` data-haim-c="${l}"`].join("");
      y.push(`<${s}${B}>${j}</${s}>`);
    }
    const x = b(t.rowHeights, o);
    return `<tr${x ? ` style="height:${x}"` : ""}>${y.join("")}</tr>`;
  }, n = [], m = z(t), M = [' data-haim-table="1"', t.noHeader ? ' data-haim-no-header="1"' : "", ` data-haim-width="${t.width}"`, t.width === "fit" || t.boxWidth ? ` data-haim-align="${t.align}"` : "", t.boxWidth ? ` data-haim-box-w="${g(t.boxWidth)}"` : "", t.boxHeight ? ` data-haim-box-h="${g(t.boxHeight)}"` : "", m ? ` style="${m}"` : ""].join("");
  if (n.push(`<table${M}>`), r > 0) {
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
`), i = I(c, { onlyWithComment: true });
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
