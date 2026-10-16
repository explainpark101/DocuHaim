import { r } from "./vendor-react-ChQ1w2We.js";
import { r as o } from "./index-DesdSF2E.js";
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
