import { i as a } from "./index-siMg0SyX.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-DQ2k84v8.js";
import "./vendor-aws-DjU81Y0s.js";
import "./vendor-lucide-B9iB2q4-.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-CyZ5tkEq.js";
var i;
(function(t) {
  t[t.None = 0] = "None", t[t.TouchID = 1] = "TouchID", t[t.FaceID = 2] = "FaceID", t[t.Iris = 3] = "Iris";
})(i || (i = {}));
async function p() {
  return await a("plugin:biometric|status");
}
async function f(t, n) {
  await a("plugin:biometric|authenticate", { reason: t, ...n });
}
export {
  i as BiometryType,
  f as authenticate,
  p as checkStatus
};
