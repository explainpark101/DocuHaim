import { r as f, j as F } from "./vendor-react-BPvvDyqO.js";
import { az as O, aA as R, aB as x } from "./index-BoYUXkF3.js";
import { b as j, y as q } from "./HaimEditor-C3a6OWKJ.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-lucide-DfALnt4w.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-ClWfNC7b.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-tiptap-rNZeEPKG.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./markdownCache-BVlf9dHc.js";
import "./index-flVIUjar.js";
import "./downloadImageSrc-Ur40YJhC.js";
import "./Kbd-Cnuyx3cZ.js";
import "./codeBlockCommentTogglePlan-C_-NXn-m.js";
import "./previewSelectionSync-CR47qWxc.js";
import "./haimCodeTabSettings-B-S365oc.js";
import "./WikiImageSizeModal-qkb2PJdq.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-BR8ZJcBk.js";
import "./emojiShortcode-B-ELrzz3.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-By6glf2o.js";
import "./styleResolve-IsiXtoFH.js";
import "./mdEditorSelectionWrap-BosBLKu-.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./markdownIo-CjqKgmTl.js";
import "./createAppMarkdownIt-CLyx6NYs.js";
import "./appMarkdownItPlugins-_Baz7YpR.js";
import "./vendor-md-editor-1ccdjpui.js";
import "./wikiImageResolver-BVvaavME.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./cmMarkdownFormatKeymap-CNnZxR4B.js";
import "./TableEditModal-CPP4vSm9.js";
import "./TableStyleTemplateEditor-BErxweRb.js";
import "./haimDualSyncDebounceSettings-BQZIsgtA.js";
import "./SettingsCollapsibleHeading-Dcgf4eVJ.js";
import "./useWikiImageHydration-Dz-vJPcR.js";
const P = /* @__PURE__ */ Symbol("haim-prose-line-budget");
function z(t, r, c = Number.POSITIVE_INFINITY) {
  if (!t || t.isDestroyed) return { lines: [], hitBudget: false };
  const { view: m } = t, { doc: a } = m.state, y = r.getBoundingClientRect(), w = r.scrollTop, v = [];
  let d = 1;
  const b = typeof performance < "u" ? performance.now() : 0, E = (o) => {
    if (c < Number.POSITIVE_INFINITY && typeof performance < "u" && performance.now() - b > c) throw P;
    try {
      const n = a.content.size, h = Math.max(0, Math.min(o, n)), i = m.coordsAtPos(h).top - y.top + w;
      if (!Number.isFinite(i)) return;
      v.push({ n: d, top: i }), d += 1;
    } catch (n) {
      if (n === P) throw n;
    }
  };
  let S = false;
  try {
    a.descendants((o, n) => {
      if (o.type.name === "codeBlock") return E(n + 1), false;
      if (o.isTextblock) {
        E(n + 1);
        let h = 0;
        return o.forEach((e) => {
          e.type.name === "hardBreak" && E(n + 1 + h + 1), h += e.nodeSize;
        }), false;
      }
      return o.isBlock && (o.isAtom || o.type.isLeaf) ? (E(n), false) : true;
    });
  } catch (o) {
    if (o !== P) throw o;
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
    const m = t[c], a = r[c];
    if (!m || !a || m.n !== a.n || Math.abs(m.top - a.top) > 0.5) return false;
  }
  return true;
}
function kt({ editor: t, scrollRef: r, active: c = true }) {
  const [m, a] = f.useState(O), [y, w] = f.useState([]), [v, d] = f.useState(0), [b, E] = f.useState(0), [S, o] = f.useState(0);
  if (f.useLayoutEffect(() => {
    const e = () => a(O());
    return window.addEventListener(R, e), () => window.removeEventListener(R, e);
  }, []), f.useLayoutEffect(() => {
    if (!c || !m || !t || t.isDestroyed) {
      w([]), d(0);
      return;
    }
    let e = 0, i = null;
    const G = 120, U = 50;
    let L = 0;
    const C = (s, p) => {
      d((l) => Math.abs(l - s) < 0.5 ? l : s), w((l) => $(l, p) ? l : p);
      const I = r.current;
      I && o(I.clientHeight);
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
  }, [c, m, t, r]), !c || !m || y.length === 0) return null;
  const n = S || 800, h = y.filter((e) => e.top >= b - n && e.top <= b + n * 2);
  return F.jsx("div", { className: "haim-prose-line-numbers", style: { left: v }, "aria-hidden": true, children: h.map((e) => F.jsx("span", { className: "haim-prose-line-numbers__n", style: { top: e.top }, children: e.n }, `${e.n}-${Math.round(e.top * 10)}`)) });
}
export {
  kt as default
};
