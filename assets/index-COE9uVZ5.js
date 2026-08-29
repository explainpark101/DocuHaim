import { j as a } from "./index--RQb7Uss.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-CaPNOYQq.js";
import "./vendor-aws-Ckci2rUT.js";
import "./vendor-lucide-ahlkbHbF.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-BCZRg-kq.js";
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
