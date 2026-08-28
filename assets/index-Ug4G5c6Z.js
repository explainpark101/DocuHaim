import { j as a } from "./index-DYAN1ttx.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-s4d4kGNQ.js";
import "./vendor-aws-DPH4gJ3K.js";
import "./vendor-lucide-CtwzAVi_.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-DN5L22zk.js";
import "./vendor-google-genai-BXoTgYIl.js";
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
