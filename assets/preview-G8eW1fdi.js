import { r as o } from "./vendor-react-BwEIQNKH.js";
import { a2 as r } from "./index-bQvC9Gon.js";
function a() {
  const [s, n] = o.useState(() => r());
  return o.useEffect(() => {
    const c = document.documentElement, e = () => n(r());
    e();
    const t = new MutationObserver(e);
    return t.observe(c, { attributes: true, attributeFilter: ["class"] }), () => t.disconnect();
  }, []), s;
}
export {
  a as u
};
