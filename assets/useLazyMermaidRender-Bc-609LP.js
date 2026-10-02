import { r as M } from "./vendor-react-BLJzfvPB.js";
import { a as i, b, i as g, r as w } from "./lazyMermaid-rAP6XGht.js";
const p = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy md-editor-icon" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>', C = { copy: p }, O = "160px 0px";
function E(c, h = {}) {
  const { eager: o = false, layoutKey: m = "", enabled: a = true } = h;
  M.useEffect(() => {
    if (!a) return;
    const e = c.current;
    if (!e) return;
    let n = false, t = null;
    const d = /* @__PURE__ */ new WeakSet(), l = () => {
      if (n || o) return;
      i(e);
      const y = [...e.querySelectorAll(".md-editor-mermaid")].filter((r) => g(r));
      t || (t = new IntersectionObserver((r) => {
        for (const v of r) {
          if (!v.isIntersecting) continue;
          const s = v.target;
          s instanceof HTMLElement && (t == null ? void 0 : t.unobserve(s), w(s));
        }
      }, { root: null, rootMargin: O, threshold: 0.01 }));
      for (const r of y) d.has(r) || (d.add(r), t.observe(r));
    }, u = async () => {
      i(e), await b(e);
    };
    o ? u() : l();
    const f = new MutationObserver(() => {
      n || (o ? u() : (i(e), l()));
    });
    return f.observe(e, { childList: true, subtree: true }), () => {
      n = true, f.disconnect(), t == null ? void 0 : t.disconnect();
    };
  }, [o, a, m, c]);
}
export {
  C as M,
  E as u
};
