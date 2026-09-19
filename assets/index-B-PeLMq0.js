import { j as c } from "./index-bQvC9Gon.js";
import "./vendor-react-BwEIQNKH.js";
import "./vendor-md-editor-D3gQZdJY.js";
import "./vendor-aws-u6g9QQ6G.js";
import "./vendor-lucide-MLE-4ziu.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-CLW0brs2.js";
import "./vendor-radix-DOgSp64j.js";
import "./vendor-google-genai-Bp0rxPXM.js";
function r(e) {
  if (e !== void 0) {
    if (typeof e == "string") return e;
    if ("ok" in e && "cancel" in e) return { OkCancelCustom: [e.ok, e.cancel] };
    if ("yes" in e && "no" in e && "cancel" in e) return { YesNoCancelCustom: [e.yes, e.no, e.cancel] };
    if ("ok" in e) return { OkCustom: e.ok };
  }
}
async function p(e = {}) {
  return typeof e == "object" && Object.freeze(e), await c("plugin:dialog|open", { options: e });
}
async function L(e = {}) {
  return typeof e == "object" && Object.freeze(e), await c("plugin:dialog|save", { options: e });
}
async function l(e, t) {
  return await c("plugin:dialog|message", { message: e, title: t == null ? void 0 : t.title, kind: t == null ? void 0 : t.kind, buttons: r(t == null ? void 0 : t.buttons) });
}
async function b(e, t) {
  const n = typeof t == "string" ? { title: t } : t;
  return n && !n.buttons && n.okLabel && (n.buttons = { ok: n.okLabel }), l(e, n);
}
async function C(e, t) {
  const n = typeof t == "string" ? { title: t } : t, i = (n == null ? void 0 : n.okLabel) || (n == null ? void 0 : n.cancelLabel), a = (n == null ? void 0 : n.okLabel) ?? "Yes";
  return await l(e, { title: n == null ? void 0 : n.title, kind: n == null ? void 0 : n.kind, buttons: i ? { ok: a, cancel: n.cancelLabel ?? "No" } : "YesNo" }) === a;
}
async function O(e, t) {
  const n = typeof t == "string" ? { title: t } : t, i = (n == null ? void 0 : n.okLabel) || (n == null ? void 0 : n.cancelLabel), a = (n == null ? void 0 : n.okLabel) ?? "Ok";
  return await l(e, { title: n == null ? void 0 : n.title, kind: n == null ? void 0 : n.kind, buttons: i ? { ok: a, cancel: n.cancelLabel ?? "Cancel" } : "OkCancel" }) === a;
}
export {
  C as ask,
  O as confirm,
  b as message,
  p as open,
  L as save
};
