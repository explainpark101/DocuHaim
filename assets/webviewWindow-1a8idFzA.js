import { g as m, P as o, a as k, S as b, b as p, W as g } from "./window-QlgZGpG9.js";
import { listen as v, once as _, emit as E, emitTo as W, TauriEvent as u } from "./event-DS5qdl9j.js";
import { j as r } from "./index-BnDr9Xzt.js";
import "./image-CZHSSYh4.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-CX3gheyO.js";
import "./vendor-aws-DeZVuVOC.js";
import "./vendor-lucide-C7LgkNTS.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-jUlp7ZOS.js";
import "./vendor-radix-BHltGsrZ.js";
import "./vendor-google-genai-BXoTgYIl.js";
function d() {
  return new c(m(), window.__TAURI_INTERNALS__.metadata.currentWebview.label, { skip: true });
}
async function y() {
  return r("plugin:webview|get_all_webviews").then((l) => l.map((e) => new c(new g(e.windowLabel, { skip: true }), e.label, { skip: true })));
}
const w = ["tauri://created", "tauri://error"];
class c {
  constructor(e, t, i) {
    this.window = e, this.label = t, this.listeners = /* @__PURE__ */ Object.create(null), (i == null ? void 0 : i.skip) || r("plugin:webview|create_webview", { windowLabel: e.label, options: { ...i, label: t } }).then(async () => this.emit("tauri://created")).catch(async (n) => this.emit("tauri://error", n));
  }
  static async getByLabel(e) {
    var t;
    return (t = (await y()).find((i) => i.label === e)) !== null && t !== void 0 ? t : null;
  }
  static getCurrent() {
    return d();
  }
  static async getAll() {
    return y();
  }
  async listen(e, t) {
    return this._handleTauriEvent(e, t) ? () => {
      const i = this.listeners[e];
      i.splice(i.indexOf(t), 1);
    } : v(e, t, { target: { kind: "Webview", label: this.label } });
  }
  async once(e, t) {
    return this._handleTauriEvent(e, t) ? () => {
      const i = this.listeners[e];
      i.splice(i.indexOf(t), 1);
    } : _(e, t, { target: { kind: "Webview", label: this.label } });
  }
  async emit(e, t) {
    if (w.includes(e)) {
      for (const i of this.listeners[e] || []) i({ event: e, id: -1, payload: t });
      return;
    }
    return E(e, t);
  }
  async emitTo(e, t, i) {
    if (w.includes(t)) {
      for (const n of this.listeners[t] || []) n({ event: t, id: -1, payload: i });
      return;
    }
    return W(e, t, i);
  }
  _handleTauriEvent(e, t) {
    return w.includes(e) ? (e in this.listeners ? this.listeners[e].push(t) : this.listeners[e] = [t], true) : false;
  }
  async position() {
    return r("plugin:webview|webview_position", { label: this.label }).then((e) => new o(e));
  }
  async size() {
    return r("plugin:webview|webview_size", { label: this.label }).then((e) => new k(e));
  }
  async close() {
    return r("plugin:webview|webview_close", { label: this.label });
  }
  async setSize(e) {
    return r("plugin:webview|set_webview_size", { label: this.label, value: e instanceof b ? e : new b(e) });
  }
  async setPosition(e) {
    return r("plugin:webview|set_webview_position", { label: this.label, value: e instanceof p ? e : new p(e) });
  }
  async setFocus() {
    return r("plugin:webview|set_webview_focus", { label: this.label });
  }
  async setAutoResize(e) {
    return r("plugin:webview|set_webview_auto_resize", { label: this.label, value: e });
  }
  async hide() {
    return r("plugin:webview|webview_hide", { label: this.label });
  }
  async show() {
    return r("plugin:webview|webview_show", { label: this.label });
  }
  async setZoom(e) {
    return r("plugin:webview|set_webview_zoom", { label: this.label, value: e });
  }
  async reparent(e) {
    return r("plugin:webview|reparent", { label: this.label, window: typeof e == "string" ? e : e.label });
  }
  async clearAllBrowsingData() {
    return r("plugin:webview|clear_all_browsing_data");
  }
  async setBackgroundColor(e) {
    return r("plugin:webview|set_webview_background_color", { color: e });
  }
  async onDragDropEvent(e) {
    const t = await this.listen(u.DRAG_ENTER, (s) => {
      e({ ...s, payload: { type: "enter", paths: s.payload.paths, position: new o(s.payload.position) } });
    }), i = await this.listen(u.DRAG_OVER, (s) => {
      e({ ...s, payload: { type: "over", position: new o(s.payload.position) } });
    }), n = await this.listen(u.DRAG_DROP, (s) => {
      e({ ...s, payload: { type: "drop", paths: s.payload.paths, position: new o(s.payload.position) } });
    }), f = await this.listen(u.DRAG_LEAVE, (s) => {
      e({ ...s, payload: { type: "leave" } });
    });
    return () => {
      t(), n(), i(), f();
    };
  }
}
function A() {
  const l = d();
  return new a(l.label, { skip: true });
}
async function h() {
  return r("plugin:window|get_all_windows").then((l) => l.map((e) => new a(e, { skip: true })));
}
class a {
  constructor(e, t = {}) {
    var i;
    this.label = e, this.listeners = /* @__PURE__ */ Object.create(null), (t == null ? void 0 : t.skip) || r("plugin:webview|create_webview_window", { options: { ...t, parent: typeof t.parent == "string" ? t.parent : (i = t.parent) === null || i === void 0 ? void 0 : i.label, label: e } }).then(async () => this.emit("tauri://created")).catch(async (n) => this.emit("tauri://error", n));
  }
  static async getByLabel(e) {
    var t;
    const i = (t = (await h()).find((n) => n.label === e)) !== null && t !== void 0 ? t : null;
    return i ? new a(i.label, { skip: true }) : null;
  }
  static getCurrent() {
    return A();
  }
  static async getAll() {
    return h();
  }
  async listen(e, t) {
    return this._handleTauriEvent(e, t) ? () => {
      const i = this.listeners[e];
      i.splice(i.indexOf(t), 1);
    } : v(e, t, { target: { kind: "WebviewWindow", label: this.label } });
  }
  async once(e, t) {
    return this._handleTauriEvent(e, t) ? () => {
      const i = this.listeners[e];
      i.splice(i.indexOf(t), 1);
    } : _(e, t, { target: { kind: "WebviewWindow", label: this.label } });
  }
  async setBackgroundColor(e) {
    return r("plugin:window|set_background_color", { color: e }).then(() => r("plugin:webview|set_webview_background_color", { color: e }));
  }
}
O(a, [g, c]);
function O(l, e) {
  (Array.isArray(e) ? e : [e]).forEach((t) => {
    Object.getOwnPropertyNames(t.prototype).forEach((i) => {
      var n;
      typeof l.prototype == "object" && l.prototype && i in l.prototype || Object.defineProperty(l.prototype, i, (n = Object.getOwnPropertyDescriptor(t.prototype, i)) !== null && n !== void 0 ? n : /* @__PURE__ */ Object.create(null));
    });
  });
}
export {
  a as WebviewWindow,
  h as getAllWebviewWindows,
  A as getCurrentWebviewWindow
};
