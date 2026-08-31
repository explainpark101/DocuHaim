import { R as r, C as a, j as i } from "./index-DSUCaAxT.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-DUPlaNge.js";
import "./vendor-aws-D_CMUQl7.js";
import "./vendor-lucide-DoRTt2zm.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-B1O6DxMz.js";
import "./vendor-google-genai-DGp6lEvQ.js";
class l extends r {
  constructor(e) {
    super(e.rid), this.available = true, this.currentVersion = e.currentVersion, this.version = e.version, this.date = e.date, this.body = e.body, this.rawJson = e.rawJson;
  }
  async download(e, s) {
    t(s);
    const d = new a();
    e && (d.onmessage = e);
    const o = await i("plugin:updater|download", { onEvent: d, rid: this.rid, ...s });
    this.downloadedBytes = new r(o);
  }
  async install() {
    if (!this.downloadedBytes) throw new Error("Update.install called before Update.download");
    await i("plugin:updater|install", { updateRid: this.rid, bytesRid: this.downloadedBytes.rid }), this.downloadedBytes = void 0;
  }
  async downloadAndInstall(e, s) {
    t(s);
    const d = new a();
    e && (d.onmessage = e), await i("plugin:updater|download_and_install", { onEvent: d, rid: this.rid, ...s });
  }
  async close() {
    var _a;
    await ((_a = this.downloadedBytes) == null ? void 0 : _a.close()), await super.close();
  }
}
async function B(n) {
  t(n);
  const e = await i("plugin:updater|check", { ...n });
  return e ? new l(e) : null;
}
function t(n) {
  (n == null ? void 0 : n.headers) && (n.headers = Array.from(new Headers(n.headers).entries()));
}
export {
  l as Update,
  B as check
};
