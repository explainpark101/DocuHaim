import { r as f, j as F } from "./vendor-react-BPvvDyqO.js";
import { az as O, aA as R, aB as x } from "./index-Cc1jKdr9.js";
import { b as j, y as q } from "./HaimEditor-CViPUzlc.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-lucide-BMfkLP2z.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-C_q1g830.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-tiptap-wv3TOvmm.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./style-BYN6C1uR.js";
import "./index-flVIUjar.js";
import "./downloadImageSrc-BqWro2Ax.js";
import "./Kbd-Cnuyx3cZ.js";
import "./codeBlockCommentTogglePlan-DTcOLakh.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./haimCodeTabSettings-B-S365oc.js";
import "./WikiImageSizeModal-BBOsbP0z.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-B3e4Go7J.js";
import "./emojiShortcode-cy15bKet.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-DIE6SIgd.js";
import "./styleResolve-DsNWiz5G.js";
import "./mdEditorSelectionWrap-BnsUo_Ch.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./code-hljs-themes-tolmt371.js";
import "./createAppMarkdownIt-D9MvUUZv.js";
import "./appMarkdownItPlugins-B2YM6DHY.js";
import "./vendor-md-editor-1ccdjpui.js";
import "./wikiImageResolver-DARcjyxH.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./cmMarkdownFormatKeymap-BP5fmKGq.js";
import "./TableEditModal-C7Uqf8rN.js";
import "./TableStyleTemplateEditor-B2-A0tZr.js";
import "./haimDualSyncDebounceSettings-BQZIsgtA.js";
import "./SettingsCollapsibleHeading-CzyuRfKF.js";
import "./useWikiImageHydration-C0sh6LLO.js";
const P = /* @__PURE__ */ Symbol("haim-prose-line-budget");
function z(t, r, c = Number.POSITIVE_INFINITY) {
  if (!t || t.isDestroyed) return { lines: [], hitBudget: false };
  const { view: a } = t, { doc: m } = a.state, y = r.getBoundingClientRect(), w = r.scrollTop, v = [];
  let d = 1;
  const b = typeof performance < "u" ? performance.now() : 0, E = (n) => {
    if (c < Number.POSITIVE_INFINITY && typeof performance < "u" && performance.now() - b > c) throw P;
    try {
      const o = m.content.size, h = Math.max(0, Math.min(n, o)), i = a.coordsAtPos(h).top - y.top + w;
      if (!Number.isFinite(i)) return;
      v.push({ n: d, top: i }), d += 1;
    } catch (o) {
      if (o === P) throw o;
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
    if (n !== P) throw n;
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
  const [a, m] = f.useState(O), [y, w] = f.useState([]), [v, d] = f.useState(0), [b, E] = f.useState(0), [S, n] = f.useState(0);
  if (f.useLayoutEffect(() => {
    const e = () => m(O());
    return window.addEventListener(R, e), () => window.removeEventListener(R, e);
  }, []), f.useLayoutEffect(() => {
    if (!c || !a || !t || t.isDestroyed) {
      w([]), d(0);
      return;
    }
    let e = 0, i = null;
    const G = 120, U = 50;
    let L = 0;
    const C = (s, p) => {
      d((l) => Math.abs(l - s) < 0.5 ? l : s), w((l) => $(l, p) ? l : p);
      const I = r.current;
      I && n(I.clientHeight);
    }, N = () => {
      cancelAnimationFrame(e);
      const s = ++L;
      e = requestAnimationFrame(() => {
        (async () => {
          const p = r.current;
          if (!p || t.isDestroyed) {
            s === L && (w([]), d(0));
            return;
          }
          const I = t.view.dom, l = Y(p, I), D = z(t, p, U);
          if (s !== L || (C(l, D.lines), !D.hitBudget) || (await q(), s !== L || t.isDestroyed)) return;
          const V = z(t, p);
          s === L && C(l, V.lines);
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
    const A = t.view.dom;
    A && g.observe(A);
    const B = A == null ? void 0 : A.closest(".haim-editor-content");
    return B && B !== u && g.observe(B), window.addEventListener("resize", T), window.addEventListener(x, T), () => {
      cancelAnimationFrame(e), cancelAnimationFrame(_), i != null && clearTimeout(i), t.off("update", H), u == null ? void 0 : u.removeEventListener("scroll", M), k(), g.disconnect(), window.removeEventListener("resize", T), window.removeEventListener(x, T);
    };
  }, [c, a, t, r]), !c || !a || y.length === 0) return null;
  const o = S || 800, h = y.filter((e) => e.top >= b - o && e.top <= b + o * 2);
  return F.jsx("div", { className: "haim-prose-line-numbers", style: { left: v }, "aria-hidden": true, children: h.map((e) => F.jsx("span", { className: "haim-prose-line-numbers__n", style: { top: e.top }, children: e.n }, `${e.n}-${Math.round(e.top * 10)}`)) });
}
export {
  Gt as default
};
