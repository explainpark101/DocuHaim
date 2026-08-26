import { r as a } from "./vendor-react-kfkzeLNk.js";
import { m as l, h as c } from "./storageImageHydration-CaMD9OgW.js";
import { P as w } from "./index-siMg0SyX.js";
function L(t, r, n, i = null) {
  const d = a.useRef(r);
  d.current = r, a.useEffect(() => {
    if (!n) return;
    let u = false, o = null;
    const m = (e) => {
      !e || o || typeof MutationObserver > "u" || (o = new MutationObserver(() => {
        u || s();
      }), o.observe(e, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-wiki-path", "data-md-src"] }));
    }, s = () => {
      if (u) return;
      const e = t == null ? void 0 : t.current;
      m(e), !(c(e, { getPresignedUrl: n, currentNotePath: i }) > 0) && l(d.current) && c(document, { getPresignedUrl: n, currentNotePath: i });
    };
    m(t == null ? void 0 : t.current);
    const p = [0, 100, 350, 700].map((e) => setTimeout(s, e)), f = () => s(), E = () => s();
    return window.addEventListener("online", f), window.addEventListener(w, E), () => {
      u = true, p.forEach((e) => clearTimeout(e)), o == null ? void 0 : o.disconnect(), o = null, window.removeEventListener("online", f), window.removeEventListener(w, E);
    };
  }, [n, t, i]), a.useEffect(() => {
    !n || !r || l(r) && c(t == null ? void 0 : t.current, { getPresignedUrl: n, currentNotePath: i });
  }, [r, n, t, i]);
}
export {
  L as u
};
