import { j as a } from "./index-BLrAQ2ns.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-B-aq3e3o.js";
import "./vendor-aws-DP_cBT5a.js";
import "./vendor-lucide-DkNZUuPp.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-DvzC9O2a.js";
import "./vendor-google-genai-DGp6lEvQ.js";
var i;
(function(t) {
  t[t.None = 0] = "None", t[t.TouchID = 1] = "TouchID", t[t.FaceID = 2] = "FaceID", t[t.Iris = 3] = "Iris";
})(i || (i = {}));
async function f() {
  return await a("plugin:biometric|status");
}
async function D(t, n) {
  await a("plugin:biometric|authenticate", { reason: t, ...n });
}
export {
  i as BiometryType,
  D as authenticate,
  f as checkStatus
};
