import { j as a } from "./index-RydzSnnb.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-BebLMpT_.js";
import "./vendor-aws-BPUgBAdC.js";
import "./vendor-lucide-DsWVGDs1.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-BWhlk-Y9.js";
import "./vendor-google-genai-BXoTgYIl.js";
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
