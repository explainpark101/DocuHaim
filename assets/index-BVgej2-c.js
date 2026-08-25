import { dC as a } from "./index-C76l_n0j.js";
import "./vendor-react-SY5QCjFA.js";
import "./vendor-md-editor-CyUZNHY0.js";
import "./vendor-aws-BNw5jQBi.js";
import "./vendor-lucide-BWX_GyjE.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-radix-Do7C1uSR.js";
import "./vendor-zip-Bez6qchM.js";
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
