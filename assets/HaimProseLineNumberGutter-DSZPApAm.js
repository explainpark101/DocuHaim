import { r as l, j as v } from "./vendor-react-BDjpSibw.js";
import { al as w, am as h, an as b } from "./index-CfCFWUoL.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-lucide-DgWK5x8G.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-qpbG9kXl.js";
function N(t, s) {
  if (!t || t.isDestroyed) return [];
  const { view: a } = t, { doc: c } = a.state, d = s.getBoundingClientRect(), f = s.scrollTop, u = [];
  let p = 1;
  const o = (e) => {
    try {
      const n = c.content.size, r = Math.max(0, Math.min(e, n)), m = a.coordsAtPos(r).top - d.top + f;
      if (!Number.isFinite(m)) return;
      u.push({ n: p, top: m }), p += 1;
    } catch {
    }
  };
  return c.descendants((e, n) => {
    if (e.type.name === "codeBlock") return o(n + 1), false;
    if (e.isTextblock) {
      o(n + 1);
      let r = 0;
      return e.forEach((i) => {
        i.type.name === "hardBreak" && o(n + 1 + r + 1), r += i.nodeSize;
      }), false;
    }
    return e.isBlock && (e.isAtom || e.type.isLeaf) ? (o(n), false) : true;
  }), u;
}
function _(t, s) {
  return s.getBoundingClientRect().left - t.getBoundingClientRect().left + t.scrollLeft;
}
function M({ editor: t, scrollRef: s, active: a = true }) {
  const [c, d] = l.useState(w), [f, u] = l.useState([]), [p, o] = l.useState(0);
  return l.useLayoutEffect(() => {
    const e = () => d(w());
    return window.addEventListener(h, e), () => window.removeEventListener(h, e);
  }, []), l.useLayoutEffect(() => {
    if (!a || !c || !t || t.isDestroyed) {
      u([]), o(0);
      return;
    }
    let e = 0;
    const n = () => {
      cancelAnimationFrame(e), e = requestAnimationFrame(() => {
        const L = s.current;
        if (!L || t.isDestroyed) {
          u([]), o(0);
          return;
        }
        const y = t.view.dom;
        o(_(L, y)), u(N(t, L));
      });
    };
    n(), t.on("update", n), t.on("selectionUpdate", n);
    const r = s.current, i = new ResizeObserver(n);
    r && i.observe(r);
    const m = t.view.dom;
    m && i.observe(m);
    const E = m == null ? void 0 : m.closest(".haim-editor-content");
    return E && E !== r && i.observe(E), window.addEventListener("resize", n), window.addEventListener(b, n), () => {
      cancelAnimationFrame(e), t.off("update", n), t.off("selectionUpdate", n), i.disconnect(), window.removeEventListener("resize", n), window.removeEventListener(b, n);
    };
  }, [a, c, t, s]), !a || !c || f.length === 0 ? null : v.jsx("div", { className: "haim-prose-line-numbers", style: { left: p }, "aria-hidden": true, children: f.map((e) => v.jsx("span", { className: "haim-prose-line-numbers__n", style: { top: e.top }, children: e.n }, `${e.n}-${Math.round(e.top * 10)}`)) });
}
export {
  M as default
};
