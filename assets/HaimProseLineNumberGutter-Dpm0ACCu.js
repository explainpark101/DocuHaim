import { r as f, j as D } from "./vendor-react-BPvvDyqO.js";
import { ax as F, ay as O, az as R } from "./index-CWx1gBsv.js";
import { b as j, y as q } from "./HaimEditor-DEAhJsYz.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-lucide-AHEFQNv5.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-BVXLG2Jn.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-tiptap-Yn3Z_JT2.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./style-CNHRnqh6.js";
import "./index-flVIUjar.js";
import "./downloadImageSrc-WEjb9ipO.js";
import "./Kbd-Cnuyx3cZ.js";
import "./codeBlockCommentTogglePlan-BW9JkcUa.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./haimCodeTabSettings-B-S365oc.js";
import "./WikiImageSizeModal-CEakYpiI.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-zaxcevb9.js";
import "./emojiShortcode-BgTJMOgR.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-Cr5eT5v6.js";
import "./styleResolve-B-rz72sw.js";
import "./mdEditorSelectionWrap-DiPZHaDp.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./code-hljs-themes-DrZ8LehU.js";
import "./createAppMarkdownIt-DcvXmRio.js";
import "./appMarkdownItPlugins-BJo4o10i.js";
import "./vendor-md-editor-1ccdjpui.js";
import "./wikiImageResolver-Dih7ZVVu.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./cmMarkdownFormatKeymap-d4e9sZPn.js";
import "./TableEditModal-DFyB22ZS.js";
import "./TableStyleTemplateEditor-Pv-TrLTS.js";
import "./haimDualSyncDebounceSettings-BQZIsgtA.js";
import "./SettingsCollapsibleHeading-Cov0WAHn.js";
import "./useWikiImageHydration-6BKBzWR_.js";
const B = /* @__PURE__ */ Symbol("haim-prose-line-budget");
function z(t, r, c = Number.POSITIVE_INFINITY) {
  if (!t || t.isDestroyed) return { lines: [], hitBudget: false };
  const { view: a } = t, { doc: m } = a.state, L = r.getBoundingClientRect(), w = r.scrollTop, v = [];
  let d = 1;
  const b = typeof performance < "u" ? performance.now() : 0, E = (n) => {
    if (c < Number.POSITIVE_INFINITY && typeof performance < "u" && performance.now() - b > c) throw B;
    try {
      const o = m.content.size, h = Math.max(0, Math.min(n, o)), i = a.coordsAtPos(h).top - L.top + w;
      if (!Number.isFinite(i)) return;
      v.push({ n: d, top: i }), d += 1;
    } catch (o) {
      if (o === B) throw o;
    }
  };
  let S = false;
  try {
    m.descendants((n, o) => {
      if (n.type.name === "codeBlock") return E(o + 1), false;
      if (n.isTextblock) {
        E(o + 1);
        let h = 0;
        return n.forEach((e) => {
          e.type.name === "hardBreak" && E(o + 1 + h + 1), h += e.nodeSize;
        }), false;
      }
      return n.isBlock && (n.isAtom || n.type.isLeaf) ? (E(o), false) : true;
    });
  } catch (n) {
    if (n !== B) throw n;
    S = true;
  }
  return { lines: v, hitBudget: S };
}
function Y(t, r) {
  return r.getBoundingClientRect().left - t.getBoundingClientRect().left + t.scrollLeft;
}
function $(t, r) {
  if (t === r) return true;
  if (t.length !== r.length) return false;
  for (let c = 0; c < t.length; c += 1) {
    const a = t[c], m = r[c];
    if (!a || !m || a.n !== m.n || Math.abs(a.top - m.top) > 0.5) return false;
  }
  return true;
}
function Gt({ editor: t, scrollRef: r, active: c = true }) {
  const [a, m] = f.useState(F), [L, w] = f.useState([]), [v, d] = f.useState(0), [b, E] = f.useState(0), [S, n] = f.useState(0);
  if (f.useLayoutEffect(() => {
    const e = () => m(F());
    return window.addEventListener(O, e), () => window.removeEventListener(O, e);
  }, []), f.useLayoutEffect(() => {
    if (!c || !a || !t || t.isDestroyed) {
      w([]), d(0);
      return;
    }
    let e = 0, i = null;
    const G = 120, U = 50;
    let y = 0;
    const C = (s, p) => {
      d((l) => Math.abs(l - s) < 0.5 ? l : s), w((l) => $(l, p) ? l : p);
      const I = r.current;
      I && n(I.clientHeight);
    }, N = () => {
      cancelAnimationFrame(e);
      const s = ++y;
      e = requestAnimationFrame(() => {
        (async () => {
          const p = r.current;
          if (!p || t.isDestroyed) {
            s === y && (w([]), d(0));
            return;
          }
          const I = t.view.dom, l = Y(p, I), x = z(t, p, U);
          if (s !== y || (C(l, x.lines), !x.hitBudget) || (await q(), s !== y || t.isDestroyed)) return;
          const V = z(t, p);
          s === y && C(l, V.lines);
        })();
      });
    }, T = () => {
      if (t.isFocused) {
        i != null && clearTimeout(i), i = setTimeout(() => {
          i = null, N();
        }, G);
        return;
      }
      i != null && (clearTimeout(i), i = null), N();
    }, H = ({ transaction: s }) => {
      s.docChanged && T();
    };
    let _ = 0;
    const M = () => {
      _ || (_ = requestAnimationFrame(() => {
        _ = 0;
        const s = r.current;
        s && E(s.scrollTop);
      }));
    };
    N(), t.on("update", H);
    const u = r.current;
    u == null ? void 0 : u.addEventListener("scroll", M, { passive: true });
    const k = u ? j(u, N) : () => {
    }, g = new ResizeObserver(T);
    u && g.observe(u);
    const P = t.view.dom;
    P && g.observe(P);
    const A = P == null ? void 0 : P.closest(".haim-editor-content");
    return A && A !== u && g.observe(A), window.addEventListener("resize", T), window.addEventListener(R, T), () => {
      cancelAnimationFrame(e), cancelAnimationFrame(_), i != null && clearTimeout(i), t.off("update", H), u == null ? void 0 : u.removeEventListener("scroll", M), k(), g.disconnect(), window.removeEventListener("resize", T), window.removeEventListener(R, T);
    };
  }, [c, a, t, r]), !c || !a || L.length === 0) return null;
  const o = S || 800, h = L.filter((e) => e.top >= b - o && e.top <= b + o * 2);
  return D.jsx("div", { className: "haim-prose-line-numbers", style: { left: v }, "aria-hidden": true, children: h.map((e) => D.jsx("span", { className: "haim-prose-line-numbers__n", style: { top: e.top }, children: e.n }, `${e.n}-${Math.round(e.top * 10)}`)) });
}
export {
  Gt as default
};
