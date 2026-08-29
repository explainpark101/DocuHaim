import { P as l, a as y, S as w, b, W as _, g } from "./window-BMJVN6sA.js";
import { listen as v, once as d, emit as m, emitTo as f, TauriEvent as r } from "./event-DBRyTnSp.js";
import { j as s } from "./index-RtVxfB8B.js";
import "./image-BVQyTqEY.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-B8SO9Xt5.js";
import "./vendor-aws-BCHf6c5E.js";
import "./vendor-lucide-BNj_ckSR.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-j_e9Isqx.js";
import "./vendor-google-genai-DGp6lEvQ.js";
function D() {
  return new p(g(), window.__TAURI_INTERNALS__.metadata.currentWebview.label, { skip: true });
}
async function c() {
  return s("plugin:webview|get_all_webviews").then((u) => u.map((e) => new p(new _(e.windowLabel, { skip: true }), e.label, { skip: true })));
}
const o = ["tauri://created", "tauri://error"];
class p {
  constructor(e, i, t) {
    this.window = e, this.label = i, this.listeners = /* @__PURE__ */ Object.create(null), (t == null ? void 0 : t.skip) || s("plugin:webview|create_webview", { windowLabel: e.label, options: { ...t, label: i } }).then(async () => this.emit("tauri://created")).catch(async (a) => this.emit("tauri://error", a));
  }
  static async getByLabel(e) {
    var i;
    return (i = (await c()).find((t) => t.label === e)) !== null && i !== void 0 ? i : null;
  }
  static getCurrent() {
    return D();
  }
  static async getAll() {
    return c();
  }
  async listen(e, i) {
    return this._handleTauriEvent(e, i) ? () => {
      const t = this.listeners[e];
      t.splice(t.indexOf(i), 1);
    } : v(e, i, { target: { kind: "Webview", label: this.label } });
  }
  async once(e, i) {
    return this._handleTauriEvent(e, i) ? () => {
      const t = this.listeners[e];
      t.splice(t.indexOf(i), 1);
    } : d(e, i, { target: { kind: "Webview", label: this.label } });
  }
  async emit(e, i) {
    if (o.includes(e)) {
      for (const t of this.listeners[e] || []) t({ event: e, id: -1, payload: i });
      return;
    }
    return m(e, i);
  }
  async emitTo(e, i, t) {
    if (o.includes(i)) {
      for (const a of this.listeners[i] || []) a({ event: i, id: -1, payload: t });
      return;
    }
    return f(e, i, t);
  }
  _handleTauriEvent(e, i) {
    return o.includes(e) ? (e in this.listeners ? this.listeners[e].push(i) : this.listeners[e] = [i], true) : false;
  }
  async position() {
    return s("plugin:webview|webview_position", { label: this.label }).then((e) => new l(e));
  }
  async size() {
    return s("plugin:webview|webview_size", { label: this.label }).then((e) => new y(e));
  }
  async close() {
    return s("plugin:webview|webview_close", { label: this.label });
  }
  async setSize(e) {
    return s("plugin:webview|set_webview_size", { label: this.label, value: e instanceof w ? e : new w(e) });
  }
  async setPosition(e) {
    return s("plugin:webview|set_webview_position", { label: this.label, value: e instanceof b ? e : new b(e) });
  }
  async setFocus() {
    return s("plugin:webview|set_webview_focus", { label: this.label });
  }
  async setAutoResize(e) {
    return s("plugin:webview|set_webview_auto_resize", { label: this.label, value: e });
  }
  async hide() {
    return s("plugin:webview|webview_hide", { label: this.label });
  }
  async show() {
    return s("plugin:webview|webview_show", { label: this.label });
  }
  async setZoom(e) {
    return s("plugin:webview|set_webview_zoom", { label: this.label, value: e });
  }
  async reparent(e) {
    return s("plugin:webview|reparent", { label: this.label, window: typeof e == "string" ? e : e.label });
  }
  async clearAllBrowsingData() {
    return s("plugin:webview|clear_all_browsing_data");
  }
  async setBackgroundColor(e) {
    return s("plugin:webview|set_webview_background_color", { color: e });
  }
  async onDragDropEvent(e) {
    const i = await this.listen(r.DRAG_ENTER, (n) => {
      e({ ...n, payload: { type: "enter", paths: n.payload.paths, position: new l(n.payload.position) } });
    }), t = await this.listen(r.DRAG_OVER, (n) => {
      e({ ...n, payload: { type: "over", position: new l(n.payload.position) } });
    }), a = await this.listen(r.DRAG_DROP, (n) => {
      e({ ...n, payload: { type: "drop", paths: n.payload.paths, position: new l(n.payload.position) } });
    }), h = await this.listen(r.DRAG_LEAVE, (n) => {
      e({ ...n, payload: { type: "leave" } });
    });
    return () => {
      i(), a(), t(), h();
    };
  }
}
export {
  p as Webview,
  c as getAllWebviews,
  D as getCurrentWebview
};
