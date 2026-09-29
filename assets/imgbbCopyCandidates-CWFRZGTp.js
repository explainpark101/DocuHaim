import { J as y, K as S } from "./index-BVEYTKrI.js";
import { g as w, i as g, r as K } from "./lazyMermaid-CFU1x6wk.js";
import "./vendor-react-BDjpSibw.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-lucide-CbEk5sea.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-DuLpLUUM.js";
import "./mermaidTheme-Deyx0OD8.js";
const h = [".md-editor-preview"];
function k(n = document) {
  for (const i of h) {
    const a = [...n.querySelectorAll(i)].find((p) => {
      if (!(p instanceof HTMLElement)) return false;
      const s = p.getBoundingClientRect();
      return s.width > 0 && s.height > 0;
    });
    if (a) return a;
  }
  return null;
}
function f(n, i) {
  const c = n.get(i) ?? 0;
  return n.set(i, c + 1), c;
}
function z(n = document) {
  const i = k(n);
  if (!i) return [];
  const c = [], a = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), l = (e) => {
    !e.replaceKey || !e.fetchSrc || a.has(e.replaceKey) || (a.add(e.replaceKey), c.push({ ...e, id: `${e.kind}:${c.length}:${e.replaceKey.slice(0, 48)}` }));
  };
  for (const e of i.querySelectorAll("img")) {
    if (!(e instanceof HTMLImageElement)) continue;
    const r = (e.getAttribute("data-wiki-path") || "").trim(), t = (e.getAttribute("data-md-src") || "").trim(), u = (e.getAttribute("src") || e.currentSrc || e.src || "").trim(), m = u || t || r;
    if (r) {
      if (y(r)) {
        const o = f(p, r);
        l({ kind: "base64", replaceKey: r, label: "base64 (wiki)", previewSrc: m || r, fetchSrc: r, remoteKind: "wiki", remoteKey: r, occurrence: o });
        continue;
      }
      if (!S(r)) {
        const o = f(p, r);
        l({ kind: "wiki", replaceKey: r, label: r, previewSrc: m, fetchSrc: m || r, remoteKind: "wiki", remoteKey: r, occurrence: o });
      }
      continue;
    }
    if (t) {
      if (y(t)) {
        const o = f(s, t);
        l({ kind: "base64", replaceKey: t, label: "base64", previewSrc: m || t, fetchSrc: t, remoteKind: "markdown", remoteKey: t, occurrence: o });
        continue;
      }
      if (!S(t)) {
        const o = f(s, t);
        l({ kind: "markdown", replaceKey: t, label: t.slice(0, 64), previewSrc: m, fetchSrc: m || t, remoteKind: "markdown", remoteKey: t, occurrence: o });
      }
      continue;
    }
    const d = y(u) ? u : "";
    if (d) {
      const o = f(s, d);
      l({ kind: "base64", replaceKey: d, label: "base64", previewSrc: m || d, fetchSrc: d, remoteKind: "markdown", remoteKey: d, occurrence: o });
    }
  }
  for (const e of i.querySelectorAll(".md-editor-mermaid")) {
    if (!(e instanceof HTMLElement) || e.getAttribute("data-haim-mermaid-image") === "1") continue;
    const r = ((e.getAttribute("data-content") || "").trim() || w(e)).replace(/\s+$/, "");
    if (!r) continue;
    const t = f(b, r), u = `mermaid:${t}:${r.slice(0, 80)}`;
    l({ kind: "mermaid", replaceKey: u, label: `Mermaid #${t + 1}`, previewSrc: "", fetchSrc: r, remoteKind: "mermaid", remoteKey: r, occurrence: t }), e.setAttribute("data-haim-imgbb-replace-key", u);
  }
  return c;
}
async function I(n) {
  let i = n;
  if (g(i)) {
    const a = await K(i);
    a && (i = a);
  }
  const c = i.querySelector("svg");
  if (!c) throw new Error("Mermaid SVG\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  return new XMLSerializer().serializeToString(c);
}
function P(n, i) {
  for (const c of n.querySelectorAll(".md-editor-mermaid")) if (c instanceof HTMLElement && c.getAttribute("data-haim-imgbb-replace-key") === i) return c;
  return null;
}
export {
  z as collectImgbbCopyCandidates,
  I as ensureMermaidSvgMarkup,
  P as findMermaidHostByReplaceKey
};
