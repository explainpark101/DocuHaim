import { getCurrentWebview as c, Webview as p } from "./webview-GBj66R8K.js";
import { W as u } from "./window-k2u6mLaq.js";
import { listen as w, once as s } from "./event-BsVJwEL-.js";
import { j as l } from "./index-DPH8WKK6.js";
import "./image-DrN3lRRr.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-B7IajafM.js";
import "./vendor-aws-CXsSaYOG.js";
import "./vendor-lucide-BiQHrkcf.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-ACO_3onn.js";
import "./vendor-google-genai-DGp6lEvQ.js";
function b() {
  const i = c();
  return new o(i.label, { skip: true });
}
async function a() {
  return l("plugin:window|get_all_windows").then((i) => i.map((e) => new o(e, { skip: true })));
}
class o {
  constructor(e, t = {}) {
    var r;
    this.label = e, this.listeners = /* @__PURE__ */ Object.create(null), (t == null ? void 0 : t.skip) || l("plugin:webview|create_webview_window", { options: { ...t, parent: typeof t.parent == "string" ? t.parent : (r = t.parent) === null || r === void 0 ? void 0 : r.label, label: e } }).then(async () => this.emit("tauri://created")).catch(async (n) => this.emit("tauri://error", n));
  }
  static async getByLabel(e) {
    var t;
    const r = (t = (await a()).find((n) => n.label === e)) !== null && t !== void 0 ? t : null;
    return r ? new o(r.label, { skip: true }) : null;
  }
  static getCurrent() {
    return b();
  }
  static async getAll() {
    return a();
  }
  async listen(e, t) {
    return this._handleTauriEvent(e, t) ? () => {
      const r = this.listeners[e];
      r.splice(r.indexOf(t), 1);
    } : w(e, t, { target: { kind: "WebviewWindow", label: this.label } });
  }
  async once(e, t) {
    return this._handleTauriEvent(e, t) ? () => {
      const r = this.listeners[e];
      r.splice(r.indexOf(t), 1);
    } : s(e, t, { target: { kind: "WebviewWindow", label: this.label } });
  }
  async setBackgroundColor(e) {
    return l("plugin:window|set_background_color", { color: e }).then(() => l("plugin:webview|set_webview_background_color", { color: e }));
  }
}
y(o, [u, p]);
function y(i, e) {
  (Array.isArray(e) ? e : [e]).forEach((t) => {
    Object.getOwnPropertyNames(t.prototype).forEach((r) => {
      var n;
      typeof i.prototype == "object" && i.prototype && r in i.prototype || Object.defineProperty(i.prototype, r, (n = Object.getOwnPropertyDescriptor(t.prototype, r)) !== null && n !== void 0 ? n : /* @__PURE__ */ Object.create(null));
    });
  });
}
export {
  o as WebviewWindow,
  a as getAllWebviewWindows,
  b as getCurrentWebviewWindow
};
