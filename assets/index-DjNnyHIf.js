import { j as a } from "./index-DSUCaAxT.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-DUPlaNge.js";
import "./vendor-aws-D_CMUQl7.js";
import "./vendor-lucide-DoRTt2zm.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-B1O6DxMz.js";
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
