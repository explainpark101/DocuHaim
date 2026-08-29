import { getCurrentWebview as c, Webview as p } from "./webview-gf4Yhj7j.js";
import { W as u } from "./window-BAAtdDB-.js";
import { listen as w, once as s } from "./event-a2qp3Lzr.js";
import { j as l } from "./index-R_pP2u35.js";
import "./image-C3vh7PUJ.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-UBgqg2nL.js";
import "./vendor-aws-MBr0pjwQ.js";
import "./vendor-lucide-9IWbCbeJ.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-EqK_akNB.js";
import "./vendor-google-genai-BXoTgYIl.js";
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
