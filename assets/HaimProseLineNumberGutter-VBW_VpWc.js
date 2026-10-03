import { r as p, j as T } from "./vendor-react-BLJzfvPB.js";
import { ap as g, aq as x, ar as A } from "./index-BjkLlViS.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-lucide-DPPF2CDs.js";
import "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-4pFcYp0u.js";
function S(e, s) {
  if (!e || e.isDestroyed) return [];
  const { view: r } = e, { doc: o } = r.state, a = s.getBoundingClientRect(), E = s.scrollTop, l = [];
  let h = 1;
  const c = (t) => {
    try {
      const n = o.content.size, f = Math.max(0, Math.min(t, n)), i = r.coordsAtPos(f).top - a.top + E;
      if (!Number.isFinite(i)) return;
      l.push({ n: h, top: i }), h += 1;
    } catch {
    }
  };
  return o.descendants((t, n) => {
    if (t.type.name === "codeBlock") return c(n + 1), false;
    if (t.isTextblock) {
      c(n + 1);
      let f = 0;
      return t.forEach((u) => {
        u.type.name === "hardBreak" && c(n + 1 + f + 1), f += u.nodeSize;
      }), false;
    }
    return t.isBlock && (t.isAtom || t.type.isLeaf) ? (c(n), false) : true;
  }), l;
}
function C(e, s) {
  return s.getBoundingClientRect().left - e.getBoundingClientRect().left + e.scrollLeft;
}
function M(e, s) {
  if (e === s) return true;
  if (e.length !== s.length) return false;
  for (let r = 0; r < e.length; r += 1) {
    const o = e[r], a = s[r];
    if (!o || !a || o.n !== a.n || Math.abs(o.top - a.top) > 0.5) return false;
  }
  return true;
}
function I({ editor: e, scrollRef: s, active: r = true }) {
  const [o, a] = p.useState(g), [E, l] = p.useState([]), [h, c] = p.useState(0);
  return p.useLayoutEffect(() => {
    const t = () => a(g());
    return window.addEventListener(x, t), () => window.removeEventListener(x, t);
  }, []), p.useLayoutEffect(() => {
    if (!r || !o || !e || e.isDestroyed) {
      l([]), c(0);
      return;
    }
    let t = 0, n = null;
    const f = 120, u = () => {
      cancelAnimationFrame(t), t = requestAnimationFrame(() => {
        const m = s.current;
        if (!m || e.isDestroyed) {
          l([]), c(0);
          return;
        }
        const P = e.view.dom, _ = C(m, P), N = S(e, m);
        c((d) => Math.abs(d - _) < 0.5 ? d : _), l((d) => M(d, N) ? d : N);
      });
    }, i = () => {
      if (e.isFocused) {
        n != null && clearTimeout(n), n = setTimeout(() => {
          n = null, u();
        }, f);
        return;
      }
      n != null && (clearTimeout(n), n = null), u();
    }, y = ({ transaction: m }) => {
      m.docChanged && i();
    };
    u(), e.on("update", y);
    const w = s.current, L = new ResizeObserver(i);
    w && L.observe(w);
    const b = e.view.dom;
    b && L.observe(b);
    const v = b == null ? void 0 : b.closest(".haim-editor-content");
    return v && v !== w && L.observe(v), window.addEventListener("resize", i), window.addEventListener(A, i), () => {
      cancelAnimationFrame(t), n != null && clearTimeout(n), e.off("update", y), L.disconnect(), window.removeEventListener("resize", i), window.removeEventListener(A, i);
    };
  }, [r, o, e, s]), !r || !o || E.length === 0 ? null : T.jsx("div", { className: "haim-prose-line-numbers", style: { left: h }, "aria-hidden": true, children: E.map((t) => T.jsx("span", { className: "haim-prose-line-numbers__n", style: { top: t.top }, children: t.n }, `${t.n}-${Math.round(t.top * 10)}`)) });
}
export {
  I as default
};
