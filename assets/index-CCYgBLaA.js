import { dD as a } from "./index-DZXxTXv9.js";
import "./vendor-react-SY5QCjFA.js";
import "./vendor-md-editor-CyUZNHY0.js";
import "./vendor-aws-BNw5jQBi.js";
import "./vendor-lucide-CLhpI-Mc.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-radix--fTcLYkF.js";
import "./vendor-zip-Bez6qchM.js";
var n;
(function(t) {
  t[t.None = 0] = "None", t[t.Auto = 1] = "Auto", t[t.TouchID = 2] = "TouchID", t[t.FaceID = 3] = "FaceID", t[t.Iris = 4] = "Iris";
})(n || (n = {}));
async function f() {
  return await a("plugin:biometry|status");
}
async function g(t, i = {}) {
  await a("plugin:biometry|authenticate", { reason: t, options: i });
}
async function p(t) {
  return await a("plugin:biometry|has_data", { options: t });
}
async function h(t) {
  return await a("plugin:biometry|get_data", { options: t });
}
async function b(t) {
  await a("plugin:biometry|set_data", { options: t });
}
async function l(t) {
  await a("plugin:biometry|remove_data", { options: t });
}
export {
  n as BiometryType,
  g as authenticate,
  f as checkStatus,
  h as getData,
  p as hasData,
  l as removeData,
  b as setData
};
