import { j as a } from "./index-C9Mh46Eg.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-DBlhBmzQ.js";
import "./vendor-aws-DgBsOJ1a.js";
import "./vendor-lucide-C2HsvpdI.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-DqPs8f15.js";
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
