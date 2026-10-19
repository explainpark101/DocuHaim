import { r } from "./vendor-react-BPvvDyqO.js";
import { r as o } from "./index-B7thc1lF.js";
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
