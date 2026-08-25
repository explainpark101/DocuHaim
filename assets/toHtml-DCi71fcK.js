import { dt as z, du as I, dv as O, dw as q, dx as f, dy as E, dz as G, dA as b, dB as B } from "./index-B7Eblbsj.js";
import "./vendor-react-SY5QCjFA.js";
import "./vendor-md-editor-CyUZNHY0.js";
import "./vendor-aws-BNw5jQBi.js";
import "./vendor-lucide-BWX_GyjE.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-radix-Do7C1uSR.js";
import "./vendor-zip-Bez6qchM.js";
function g(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function L(e) {
  return e ? ` align="${e}"` : "";
}
function D(e, t, c) {
  const i = e.rows.length, a = Math.max(1, ...e.rows.map((o) => o.length), e.aligns.length), u = I(t.merges), r = O(t, i), d = Math.min(Math.max(0, t.footerRows), Math.max(0, i - r)), p = r, $ = i - d, w = (o, s) => {
    var _a;
    const m = [];
    for (let l = 0; l < a; l += 1) {
      if (u.has(`${o},${l}`)) continue;
      const H = E(t.merges, o, l), C = (H == null ? void 0 : H.colspan) ?? 1, v = (H == null ? void 0 : H.rowspan) ?? 1, A = { row: o, col: l, rowCount: i, colCount: a, meta: t };
      c !== void 0 && (A.template = c);
      const R = G(A);
      let h = f(R);
      const S = b(t.colWidths, l);
      S && (h = B(h, `width:${S}`));
      const W = b(t.rowHeights, o);
      W && (h = B(h, `height:${W}`));
      const T = e.aligns[l] ?? null, j = g(((_a = e.rows[o]) == null ? void 0 : _a[l]) ?? ""), k = [C > 1 ? ` colspan="${C}"` : "", v > 1 ? ` rowspan="${v}"` : "", L(T), h ? ` style="${h}"` : "", ` data-haim-r="${o}"`, ` data-haim-c="${l}"`].join("");
      m.push(`<${s}${k}>${j}</${s}>`);
    }
    const x = b(t.rowHeights, o);
    return `<tr${x ? ` style="height:${x}"` : ""}>${m.join("")}</tr>`;
  }, n = [], y = q(t), M = [' data-haim-table="1"', t.noHeader ? ' data-haim-no-header="1"' : "", ` data-haim-width="${t.width}"`, t.width === "fit" || t.boxWidth ? ` data-haim-align="${t.align}"` : "", t.boxWidth ? ` data-haim-box-w="${g(t.boxWidth)}"` : "", t.boxHeight ? ` data-haim-box-h="${g(t.boxHeight)}"` : "", y ? ` style="${y}"` : ""].join("");
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
  if (d > 0) {
    const o = f(t.sections.tfoot ?? {}, { includeOuterBorder: true });
    n.push(`<tfoot${o ? ` style="${o}"` : ""}>`);
    for (let s = $; s < i; s += 1) n.push(w(s, "td"));
    n.push("</tfoot>");
  }
  return n.push("</table>"), n.join("");
}
function Y(e, t) {
  const c = e.replace(/\r\n/g, `
`), i = z(c, { onlyWithComment: true });
  if (!i.length) return c;
  let a = "", u = 0;
  for (const r of i) {
    a += c.slice(u, r.start);
    const d = r.meta, p = d.templateId && t ? t(d.templateId) ?? null : null;
    a += D(r.grid, d, p), u = r.end;
  }
  return a += c.slice(u), a;
}
export {
  Y as convertHaimTablesToHtmlInMarkdown,
  D as haimTableToHtml
};
