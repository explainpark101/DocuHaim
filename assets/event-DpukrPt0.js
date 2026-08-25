import { dC as a, dD as l } from "./index-BGTd31p3.js";
import "./vendor-react-SY5QCjFA.js";
import "./vendor-md-editor-CyUZNHY0.js";
import "./vendor-aws-BNw5jQBi.js";
import "./vendor-lucide-DpPvFd8E.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-radix--fTcLYkF.js";
import "./vendor-zip-Bez6qchM.js";
var n;
(function(t) {
  t.WINDOW_RESIZED = "tauri://resize", t.WINDOW_MOVED = "tauri://move", t.WINDOW_CLOSE_REQUESTED = "tauri://close-requested", t.WINDOW_DESTROYED = "tauri://destroyed", t.WINDOW_FOCUS = "tauri://focus", t.WINDOW_BLUR = "tauri://blur", t.WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change", t.WINDOW_THEME_CHANGED = "tauri://theme-changed", t.WINDOW_CREATED = "tauri://window-created", t.WINDOW_SUSPENDED = "tauri://suspended", t.WINDOW_RESUMED = "tauri://resumed", t.WEBVIEW_CREATED = "tauri://webview-created", t.DRAG_ENTER = "tauri://drag-enter", t.DRAG_OVER = "tauri://drag-over", t.DRAG_DROP = "tauri://drag-drop", t.DRAG_LEAVE = "tauri://drag-leave";
})(n || (n = {}));
async function _(t, r) {
  window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(t, r), await a("plugin:event|unlisten", { event: t, eventId: r });
}
async function o(t, r, e) {
  var i;
  const d = typeof (e == null ? void 0 : e.target) == "string" ? { kind: "AnyLabel", label: e.target } : (i = e == null ? void 0 : e.target) !== null && i !== void 0 ? i : { kind: "Any" };
  return a("plugin:event|listen", { event: t, target: d, handler: l(r) }).then((D) => async () => _(t, D));
}
async function m(t, r, e) {
  return o(t, (i) => {
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
  o as listen,
  m as once
};
