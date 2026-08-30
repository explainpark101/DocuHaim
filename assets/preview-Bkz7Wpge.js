import { r as o } from "./vendor-react-BFxggocB.js";
import { a9 as r } from "./index-C9Mh46Eg.js";
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
