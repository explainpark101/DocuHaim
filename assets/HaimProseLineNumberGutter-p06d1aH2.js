import { r as d, j as y } from "./vendor-react-BDjpSibw.js";
import { ap as g, aq as x, ar as N } from "./index-DqXcJFiU.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-lucide-Cix55NOo.js";
import "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-DuLpLUUM.js";
function A(e, s) {
  if (!e || e.isDestroyed) return [];
  const { view: r } = e, { doc: o } = r.state, a = s.getBoundingClientRect(), E = s.scrollTop, m = [];
  let h = 1;
  const i = (t) => {
    try {
      const n = o.content.size, c = Math.max(0, Math.min(t, n)), f = r.coordsAtPos(c).top - a.top + E;
      if (!Number.isFinite(f)) return;
      m.push({ n: h, top: f }), h += 1;
    } catch {
    }
  };
  return o.descendants((t, n) => {
    if (t.type.name === "codeBlock") return i(n + 1), false;
    if (t.isTextblock) {
      i(n + 1);
      let c = 0;
      return t.forEach((u) => {
        u.type.name === "hardBreak" && i(n + 1 + c + 1), c += u.nodeSize;
      }), false;
    }
    return t.isBlock && (t.isAtom || t.type.isLeaf) ? (i(n), false) : true;
  }), m;
}
function P(e, s) {
  return s.getBoundingClientRect().left - e.getBoundingClientRect().left + e.scrollLeft;
}
function C(e, s) {
  if (e === s) return true;
  if (e.length !== s.length) return false;
  for (let r = 0; r < e.length; r += 1) {
    const o = e[r], a = s[r];
    if (!o || !a || o.n !== a.n || Math.abs(o.top - a.top) > 0.5) return false;
  }
  return true;
}
function F({ editor: e, scrollRef: s, active: r = true }) {
  const [o, a] = d.useState(g), [E, m] = d.useState([]), [h, i] = d.useState(0);
  return d.useLayoutEffect(() => {
    const t = () => a(g());
    return window.addEventListener(x, t), () => window.removeEventListener(x, t);
  }, []), d.useLayoutEffect(() => {
    if (!r || !o || !e || e.isDestroyed) {
      m([]), i(0);
      return;
    }
    let t = 0;
    const n = () => {
      cancelAnimationFrame(t), t = requestAnimationFrame(() => {
        const l = s.current;
        if (!l || e.isDestroyed) {
          m([]), i(0);
          return;
        }
        const _ = e.view.dom, v = P(l, _), b = A(e, l);
        i((p) => Math.abs(p - v) < 0.5 ? p : v), m((p) => C(p, b) ? p : b);
      });
    }, c = ({ transaction: l }) => {
      l.docChanged && n();
    };
    n(), e.on("update", c);
    const u = s.current, f = new ResizeObserver(n);
    u && f.observe(u);
    const L = e.view.dom;
    L && f.observe(L);
    const w = L == null ? void 0 : L.closest(".haim-editor-content");
    return w && w !== u && f.observe(w), window.addEventListener("resize", n), window.addEventListener(N, n), () => {
      cancelAnimationFrame(t), e.off("update", c), f.disconnect(), window.removeEventListener("resize", n), window.removeEventListener(N, n);
    };
  }, [r, o, e, s]), !r || !o || E.length === 0 ? null : y.jsx("div", { className: "haim-prose-line-numbers", style: { left: h }, "aria-hidden": true, children: E.map((t) => y.jsx("span", { className: "haim-prose-line-numbers__n", style: { top: t.top }, children: t.n }, `${t.n}-${Math.round(t.top * 10)}`)) });
}
export {
  F as default
};
