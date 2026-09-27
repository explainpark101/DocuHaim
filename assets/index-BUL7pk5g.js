import { invoke as c } from "./core-DhEqZVGG.js";
var a;
(function(n) {
  n[n.None = 0] = "None", n[n.TouchID = 1] = "TouchID", n[n.FaceID = 2] = "FaceID", n[n.Iris = 3] = "Iris";
})(a || (a = {}));
async function i() {
  return await c("plugin:biometric|status");
}
async function o(n, t) {
  await c("plugin:biometric|authenticate", { reason: n, ...t });
}
export {
  a as BiometryType,
  o as authenticate,
  i as checkStatus
};
