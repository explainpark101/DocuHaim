import { r } from "./vendor-react-BDjpSibw.js";
import { r as o } from "./index-ahe6T7wM.js";
function a() {
  const [s, n] = r.useState(() => o());
  return r.useEffect(() => {
    const c = document.documentElement, e = () => n(o());
    e();
    const t = new MutationObserver(e);
    return t.observe(c, { attributes: true, attributeFilter: ["class"] }), () => t.disconnect();
  }, []), s;
}
export {
  a as u
};
