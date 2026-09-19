import { j as a } from "./index-bQvC9Gon.js";
import "./vendor-react-BwEIQNKH.js";
import "./vendor-md-editor-D3gQZdJY.js";
import "./vendor-aws-u6g9QQ6G.js";
import "./vendor-lucide-MLE-4ziu.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-CLW0brs2.js";
import "./vendor-radix-DOgSp64j.js";
import "./vendor-google-genai-Bp0rxPXM.js";
var n;
(function(t) {
  t[t.None = 0] = "None", t[t.Auto = 1] = "Auto", t[t.TouchID = 2] = "TouchID", t[t.FaceID = 3] = "FaceID", t[t.Iris = 4] = "Iris";
})(n || (n = {}));
async function g() {
  return await a("plugin:biometry|status");
}
async function D(t, i = {}) {
  await a("plugin:biometry|authenticate", { reason: t, options: i });
}
async function h(t) {
  return await a("plugin:biometry|has_data", { options: t });
}
async function b(t) {
  return await a("plugin:biometry|get_data", { options: t });
}
async function l(t) {
  await a("plugin:biometry|set_data", { options: t });
}
async function w(t) {
  await a("plugin:biometry|remove_data", { options: t });
}
export {
  n as BiometryType,
  D as authenticate,
  g as checkStatus,
  b as getData,
  h as hasData,
  w as removeData,
  l as setData
};
