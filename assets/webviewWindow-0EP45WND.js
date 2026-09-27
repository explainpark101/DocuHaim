import { getCurrentWebview as a, Webview as u } from "./webview-CJ618jKN.js";
import { W as w } from "./window-DBZdCc_s.js";
import { listen as p, once as s } from "./event-BK_86lmQ.js";
import { invoke as l } from "./core-DhEqZVGG.js";
import "./image-DNK7xb7J.js";
function b() {
  const i = a();
  return new o(i.label, { skip: true });
}
async function c() {
  return l("plugin:window|get_all_windows").then((i) => i.map((e) => new o(e, { skip: true })));
}
class o {
  constructor(e, t = {}) {
    var r;
    this.label = e, this.listeners = /* @__PURE__ */ Object.create(null), (t == null ? void 0 : t.skip) || l("plugin:webview|create_webview_window", { options: { ...t, parent: typeof t.parent == "string" ? t.parent : (r = t.parent) === null || r === void 0 ? void 0 : r.label, label: e } }).then(async () => this.emit("tauri://created")).catch(async (n) => this.emit("tauri://error", n));
  }
  static async getByLabel(e) {
    var t;
    const r = (t = (await c()).find((n) => n.label === e)) !== null && t !== void 0 ? t : null;
    return r ? new o(r.label, { skip: true }) : null;
  }
  static getCurrent() {
    return b();
  }
  static async getAll() {
    return c();
  }
  async listen(e, t) {
    return this._handleTauriEvent(e, t) ? () => {
      const r = this.listeners[e];
      r.splice(r.indexOf(t), 1);
    } : p(e, t, { target: { kind: "WebviewWindow", label: this.label } });
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
y(o, [w, u]);
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
  c as getAllWebviewWindows,
  b as getCurrentWebviewWindow
};
