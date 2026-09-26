import { j as a } from "./index-DgMMigqL.js";
import "./vendor-react-BwEIQNKH.js";
import "./vendor-md-editor-pmGM35s5.js";
import "./vendor-aws-DI8kybWK.js";
import "./vendor-lucide-B-9DwWUo.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-CLW0brs2.js";
import "./vendor-radix-krusovOJ.js";
import "./vendor-google-genai-Bp0rxPXM.js";
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
