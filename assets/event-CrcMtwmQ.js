import { j as a, G as D } from "./index-RydzSnnb.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-BebLMpT_.js";
import "./vendor-aws-BPUgBAdC.js";
import "./vendor-lucide-DsWVGDs1.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-BWhlk-Y9.js";
import "./vendor-google-genai-BXoTgYIl.js";
var n;
(function(t) {
  t.WINDOW_RESIZED = "tauri://resize", t.WINDOW_MOVED = "tauri://move", t.WINDOW_CLOSE_REQUESTED = "tauri://close-requested", t.WINDOW_DESTROYED = "tauri://destroyed", t.WINDOW_FOCUS = "tauri://focus", t.WINDOW_BLUR = "tauri://blur", t.WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change", t.WINDOW_THEME_CHANGED = "tauri://theme-changed", t.WINDOW_CREATED = "tauri://window-created", t.WINDOW_SUSPENDED = "tauri://suspended", t.WINDOW_RESUMED = "tauri://resumed", t.WEBVIEW_CREATED = "tauri://webview-created", t.DRAG_ENTER = "tauri://drag-enter", t.DRAG_OVER = "tauri://drag-over", t.DRAG_DROP = "tauri://drag-drop", t.DRAG_LEAVE = "tauri://drag-leave";
})(n || (n = {}));
async function _(t, r) {
  window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(t, r), await a("plugin:event|unlisten", { event: t, eventId: r });
}
async function d(t, r, e) {
  var i;
  const o = typeof (e == null ? void 0 : e.target) == "string" ? { kind: "AnyLabel", label: e.target } : (i = e == null ? void 0 : e.target) !== null && i !== void 0 ? i : { kind: "Any" };
  return a("plugin:event|listen", { event: t, target: o, handler: D(r) }).then((l) => async () => _(t, l));
}
async function R(t, r, e) {
  return d(t, (i) => {
    _(t, i.id), r(i);
  }, e);
}
async function A(t, r) {
  await a("plugin:event|emit", { event: t, payload: r });
}
async function I(t, r, e) {
  await a("plugin:event|emit_to", { target: typeof t == "string" ? { kind: "AnyLabel", label: t } : t, event: r, payload: e });
}
export {
  n as TauriEvent,
  A as emit,
  I as emitTo,
  d as listen,
  R as once
};
