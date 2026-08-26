import { i as a, k as D } from "./index-siMg0SyX.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-DQ2k84v8.js";
import "./vendor-aws-DjU81Y0s.js";
import "./vendor-lucide-B9iB2q4-.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-CyZ5tkEq.js";
var n;
(function(t) {
  t.WINDOW_RESIZED = "tauri://resize", t.WINDOW_MOVED = "tauri://move", t.WINDOW_CLOSE_REQUESTED = "tauri://close-requested", t.WINDOW_DESTROYED = "tauri://destroyed", t.WINDOW_FOCUS = "tauri://focus", t.WINDOW_BLUR = "tauri://blur", t.WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change", t.WINDOW_THEME_CHANGED = "tauri://theme-changed", t.WINDOW_CREATED = "tauri://window-created", t.WINDOW_SUSPENDED = "tauri://suspended", t.WINDOW_RESUMED = "tauri://resumed", t.WEBVIEW_CREATED = "tauri://webview-created", t.DRAG_ENTER = "tauri://drag-enter", t.DRAG_OVER = "tauri://drag-over", t.DRAG_DROP = "tauri://drag-drop", t.DRAG_LEAVE = "tauri://drag-leave";
})(n || (n = {}));
async function _(t, r) {
  window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(t, r), await a("plugin:event|unlisten", { event: t, eventId: r });
}
async function d(t, r, e) {
  var i;
  const l = typeof (e == null ? void 0 : e.target) == "string" ? { kind: "AnyLabel", label: e.target } : (i = e == null ? void 0 : e.target) !== null && i !== void 0 ? i : { kind: "Any" };
  return a("plugin:event|listen", { event: t, target: l, handler: D(r) }).then((o) => async () => _(t, o));
}
async function m(t, r, e) {
  return d(t, (i) => {
    _(t, i.id), r(i);
  }, e);
}
async function R(t, r) {
  await a("plugin:event|emit", { event: t, payload: r });
}
async function A(t, r, e) {
  await a("plugin:event|emit_to", { target: typeof t == "string" ? { kind: "AnyLabel", label: t } : t, event: r, payload: e });
}
export {
  n as TauriEvent,
  R as emit,
  A as emitTo,
  d as listen,
  m as once
};
