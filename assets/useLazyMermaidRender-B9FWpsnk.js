import { r as m } from "./vendor-react-SY5QCjFA.js";
import { fR as y, fS as g, fT as w } from "./index-gRE5h3Y1.js";
const M = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy md-editor-icon" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>', x = { copy: M }, p = "160px 0px";
function I(i, f = {}) {
  const { eager: t = false, layoutKey: v = "" } = f;
  m.useEffect(() => {
    const o = i.current;
    if (!o) return;
    let n = false, r = null;
    const c = /* @__PURE__ */ new WeakSet(), a = () => {
      if (n || t) return;
      const h = [...o.querySelectorAll(".md-editor-mermaid")].filter((e) => g(e));
      r || (r = new IntersectionObserver((e) => {
        for (const u of e) {
          if (!u.isIntersecting) continue;
          const s = u.target;
          s instanceof HTMLElement && (r == null ? void 0 : r.unobserve(s), w(s));
        }
      }, { root: null, rootMargin: p, threshold: 0.01 }));
      for (const e of h) c.has(e) || (c.add(e), r.observe(e));
    }, d = async () => {
      await y(o);
    };
    t ? d() : a();
    const l = new MutationObserver(() => {
      n || (t ? d() : a());
    });
    return l.observe(o, { childList: true, subtree: true }), () => {
      n = true, l.disconnect(), r == null ? void 0 : r.disconnect();
    };
  }, [t, v, i]);
}
export {
  x as M,
  I as u
};
