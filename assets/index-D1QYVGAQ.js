import { invoke as t } from "./core-DhEqZVGG.js";
var n;
(function(a) {
  a[a.None = 0] = "None", a[a.Auto = 1] = "Auto", a[a.TouchID = 2] = "TouchID", a[a.FaceID = 3] = "FaceID", a[a.Iris = 4] = "Iris";
})(n || (n = {}));
async function c() {
  return await t("plugin:biometry|status");
}
async function o(a, i = {}) {
  await t("plugin:biometry|authenticate", { reason: a, options: i });
}
async function s(a) {
  return await t("plugin:biometry|has_data", { options: a });
}
async function e(a) {
  return await t("plugin:biometry|get_data", { options: a });
}
async function r(a) {
  await t("plugin:biometry|set_data", { options: a });
}
async function f(a) {
  await t("plugin:biometry|remove_data", { options: a });
}
export {
  n as BiometryType,
  o as authenticate,
  c as checkStatus,
  e as getData,
  s as hasData,
  f as removeData,
  r as setData
};
