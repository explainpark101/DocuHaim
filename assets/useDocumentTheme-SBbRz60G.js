import { r as o } from "./vendor-react-BPvvDyqO.js";
import { u as r } from "./index-CWHwu_I1.js";
function a() {
  const [s, n] = o.useState(() => r());
  return o.useEffect(() => {
    const u = document.documentElement, e = () => n(r());
    e();
    const t = new MutationObserver(e);
    return t.observe(u, { attributes: true, attributeFilter: ["class"] }), () => t.disconnect();
  }, []), s;
}
export {
  a as u
};
