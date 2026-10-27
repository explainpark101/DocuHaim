import { r as f, j as F } from "./vendor-react-BPvvDyqO.js";
import { ao as O, ap as R, aq as x } from "./index-DRAozU5b.js";
import { b as j, y as q } from "./HaimEditor-DonOD-Zf.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-lucide-BnjwTb2j.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-8kjzYRrX.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-tiptap-DxyadcB3.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./style-BvfZMhHc.js";
import "./index-flVIUjar.js";
import "./downloadImageSrc-CZMxKG_A.js";
import "./Kbd-Cnuyx3cZ.js";
import "./codeBlockCommentTogglePlan-Dpfl-zi2.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./haimCodeTabSettings-B-S365oc.js";
import "./WikiImageSizeModal-DUtadAkN.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-DVGv4Z4u.js";
import "./emojiShortcode-CZFZfFoz.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-BXHU3IgU.js";
import "./styleResolve-DAujLGFY.js";
import "./mdEditorSelectionWrap-DxJzFoHE.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./code-hljs-themes-PojdV06i.js";
import "./createAppMarkdownIt-IEDuvO-F.js";
import "./appMarkdownItPlugins-Bqcmn7Ml.js";
import "./vendor-md-editor-B8lrupGh.js";
import "./wikiImageResolver-DwJ1DP9p.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./cmMarkdownFormatKeymap-CSclSOvK.js";
import "./TableEditModal-CGcSQcU-.js";
import "./TableStyleTemplateEditor-mYbeCXmw.js";
import "./haimDualSyncDebounceSettings-BQZIsgtA.js";
import "./SettingsCollapsibleHeading-BOtNCjO6.js";
import "./useWikiImageHydration-DnG9EYpW.js";
const B = /* @__PURE__ */ Symbol("haim-prose-line-budget");
function G(t, r, c = Number.POSITIVE_INFINITY) {
  if (!t || t.isDestroyed) return { lines: [], hitBudget: false };
  const { view: a } = t, { doc: m } = a.state, y = r.getBoundingClientRect(), w = r.scrollTop, v = [];
  let d = 1;
  const b = typeof performance < "u" ? performance.now() : 0, E = (n) => {
    if (c < Number.POSITIVE_INFINITY && typeof performance < "u" && performance.now() - b > c) throw B;
    try {
      const o = m.content.size, h = Math.max(0, Math.min(n, o)), i = a.coordsAtPos(h).top - y.top + w;
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
function Ut({ editor: t, scrollRef: r, active: c = true }) {
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
    const U = 120, k = 50;
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
          const I = t.view.dom, l = Y(p, I), D = G(t, p, k);
          if (s !== L || (C(l, D.lines), !D.hitBudget) || (await q(), s !== L || t.isDestroyed)) return;
          const V = G(t, p);
          s === L && C(l, V.lines);
        })();
      });
    }, T = () => {
      if (t.isFocused) {
        i != null && clearTimeout(i), i = setTimeout(() => {
          i = null, N();
        }, U);
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
    const z = u ? j(u, N) : () => {
    }, g = new ResizeObserver(T);
    u && g.observe(u);
    const P = t.view.dom;
    P && g.observe(P);
    const A = P == null ? void 0 : P.closest(".haim-editor-content");
    return A && A !== u && g.observe(A), window.addEventListener("resize", T), window.addEventListener(x, T), () => {
      cancelAnimationFrame(e), cancelAnimationFrame(_), i != null && clearTimeout(i), t.off("update", H), u == null ? void 0 : u.removeEventListener("scroll", M), z(), g.disconnect(), window.removeEventListener("resize", T), window.removeEventListener(x, T);
    };
  }, [c, a, t, r]), !c || !a || y.length === 0) return null;
  const o = S || 800, h = y.filter((e) => e.top >= b - o && e.top <= b + o * 2);
  return F.jsx("div", { className: "haim-prose-line-numbers", style: { left: v }, "aria-hidden": true, children: h.map((e) => F.jsx("span", { className: "haim-prose-line-numbers__n", style: { top: e.top }, children: e.n }, `${e.n}-${Math.round(e.top * 10)}`)) });
}
export {
  Ut as default
};
