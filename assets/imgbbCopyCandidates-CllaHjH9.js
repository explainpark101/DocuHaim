import { P as w, Q as p, R as b } from "./index-DD9YmsNw.js";
import { g as K, i as g, r as k } from "./lazyMermaid-BcnyKPEC.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-react-BPvvDyqO.js";
import "./vendor-lucide-Bo8me5Pj.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-ClWfNC7b.js";
import "./mermaidTheme-Deyx0OD8.js";
function u(n, i) {
  const c = n.get(i) ?? 0;
  return n.set(i, c + 1), c;
}
function R(n = document) {
  const i = w(n);
  if (!i) return [];
  const c = [], d = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), m = (e) => {
    !e.replaceKey || !e.fetchSrc || d.has(e.replaceKey) || (d.add(e.replaceKey), c.push({ ...e, id: `${e.kind}:${c.length}:${e.replaceKey.slice(0, 48)}` }));
  };
  for (const e of i.querySelectorAll("img")) {
    if (!(e instanceof HTMLImageElement)) continue;
    const r = (e.getAttribute("data-wiki-path") || "").trim(), t = (e.getAttribute("data-md-src") || "").trim(), s = (e.getAttribute("src") || e.currentSrc || e.src || "").trim(), a = s || t || r;
    if (r) {
      if (p(r)) {
        const o = u(y, r);
        m({ kind: "base64", replaceKey: r, label: "base64 (wiki)", previewSrc: a || r, fetchSrc: r, remoteKind: "wiki", remoteKey: r, occurrence: o });
        continue;
      }
      if (!b(r)) {
        const o = u(y, r);
        m({ kind: "wiki", replaceKey: r, label: r, previewSrc: a, fetchSrc: a || r, remoteKind: "wiki", remoteKey: r, occurrence: o });
      }
      continue;
    }
    if (t) {
      if (p(t)) {
        const o = u(f, t);
        m({ kind: "base64", replaceKey: t, label: "base64", previewSrc: a || t, fetchSrc: t, remoteKind: "markdown", remoteKey: t, occurrence: o });
        continue;
      }
      if (!b(t)) {
        const o = u(f, t);
        m({ kind: "markdown", replaceKey: t, label: t.slice(0, 64), previewSrc: a, fetchSrc: a || t, remoteKind: "markdown", remoteKey: t, occurrence: o });
      }
      continue;
    }
    const l = p(s) ? s : "";
    if (l) {
      const o = u(f, l);
      m({ kind: "base64", replaceKey: l, label: "base64", previewSrc: a || l, fetchSrc: l, remoteKind: "markdown", remoteKey: l, occurrence: o });
    }
  }
  for (const e of i.querySelectorAll(".md-editor-mermaid")) {
    if (!(e instanceof HTMLElement) || e.getAttribute("data-haim-mermaid-image") === "1") continue;
    const r = ((e.getAttribute("data-content") || "").trim() || K(e)).replace(/\s+$/, "");
    if (!r) continue;
    const t = u(S, r), s = `mermaid:${t}:${r.slice(0, 80)}`;
    m({ kind: "mermaid", replaceKey: s, label: `Mermaid #${t + 1}`, previewSrc: "", fetchSrc: r, remoteKind: "mermaid", remoteKey: r, occurrence: t }), e.setAttribute("data-haim-imgbb-replace-key", s);
  }
  return c;
}
async function T(n) {
  let i = n;
  if (g(i)) {
    const d = await k(i);
    d && (i = d);
  }
  const c = i.querySelector("svg");
  if (!c) throw new Error("Mermaid SVG\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  return new XMLSerializer().serializeToString(c);
}
function C(n, i) {
  for (const c of n.querySelectorAll(".md-editor-mermaid")) if (c instanceof HTMLElement && c.getAttribute("data-haim-imgbb-replace-key") === i) return c;
  return null;
}
export {
  R as collectImgbbCopyCandidates,
  T as ensureMermaidSvgMarkup,
  C as findMermaidHostByReplaceKey
};
