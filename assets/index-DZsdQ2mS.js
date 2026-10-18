function a(n, i, t, e) {
  if (t === "a" && !e) throw new TypeError("Private accessor was defined without a getter");
  if (typeof i == "function" ? n !== i || !e : !i.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? e : t === "a" ? e.call(n) : e ? e.value : i.get(n);
}
function l(n, i, t, e, h) {
  if (typeof i == "function" ? n !== i || true : !i.has(n)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return i.set(n, t), t;
}
var u, o, r, c, f, d;
const w = "__TAURI_TO_IPC_KEY__";
function C(n, i = false) {
  return window.__TAURI_INTERNALS__.transformCallback(n, i);
}
class N {
  constructor(i) {
    u.add(this), o.set(this, void 0), r.set(this, 0), c.set(this, []), f.set(this, void 0), l(this, o, i || (() => {
    })), this.id = C((t) => {
      const e = t.index;
      if ("end" in t) {
        e == a(this, r, "f") ? this.cleanupCallback() : l(this, f, e);
        return;
      }
      const h = t.message;
      if (e == a(this, r, "f")) {
        for (a(this, u, "m", d).call(this, h), l(this, r, a(this, r, "f") + 1); a(this, r, "f") in a(this, c, "f"); ) {
          const y = a(this, c, "f")[a(this, r, "f")];
          a(this, u, "m", d).call(this, y), delete a(this, c, "f")[a(this, r, "f")], l(this, r, a(this, r, "f") + 1);
        }
        a(this, r, "f") === a(this, f, "f") && this.cleanupCallback();
      } else a(this, c, "f")[e] = h;
    });
  }
  cleanupCallback() {
    window.__TAURI_INTERNALS__.unregisterCallback(this.id);
  }
  set onmessage(i) {
    l(this, o, i);
  }
  get onmessage() {
    return a(this, o, "f");
  }
  [(o = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakSet(), d = function(t) {
    try {
      a(this, o, "f").call(this, t);
    } catch (e) {
      queueMicrotask(() => {
        throw e;
      });
    }
  }, w)]() {
    return `__CHANNEL__:${this.id}`;
  }
  toJSON() {
    return this[w]();
  }
}
class _ {
  constructor(i, t, e) {
    this.plugin = i, this.event = t, this.channelId = e;
  }
  async unregister() {
    return s(`plugin:${this.plugin}|remove_listener`, { event: this.event, channelId: this.channelId });
  }
}
async function m(n, i, t) {
  const e = new N(t);
  try {
    return await s(`plugin:${n}|register_listener`, { event: i, handler: e }), new _(n, i, e.id);
  } catch {
    return await s(`plugin:${n}|registerListener`, { event: i, handler: e }), new _(n, i, e.id);
  }
}
async function s(n, i = {}, t) {
  return window.__TAURI_INTERNALS__.invoke(n, i, t);
}
var g;
(function(n) {
  n.Year = "year", n.Month = "month", n.TwoWeeks = "twoWeeks", n.Week = "week", n.Day = "day", n.Hour = "hour", n.Minute = "minute", n.Second = "second";
})(g || (g = {}));
class k {
  static at(i, t = false, e = false) {
    return { at: { date: i, repeating: t, allowWhileIdle: e }, interval: void 0, every: void 0 };
  }
  static interval(i, t = false) {
    return { at: void 0, interval: { interval: i, allowWhileIdle: t }, every: void 0 };
  }
  static every(i, t, e = false) {
    return { at: void 0, interval: void 0, every: { interval: i, count: t, allowWhileIdle: e } };
  }
}
var p;
(function(n) {
  n[n.None = 0] = "None", n[n.Min = 1] = "Min", n[n.Low = 2] = "Low", n[n.Default = 3] = "Default", n[n.High = 4] = "High";
})(p || (p = {}));
var v;
(function(n) {
  n[n.Secret = -1] = "Secret", n[n.Private = 0] = "Private", n[n.Public = 1] = "Public";
})(v || (v = {}));
async function P() {
  return window.Notification.permission !== "default" ? await Promise.resolve(window.Notification.permission === "granted") : await s("plugin:notification|is_permission_granted");
}
async function A() {
  return await window.Notification.requestPermission();
}
function T(n) {
  typeof n == "string" ? new window.Notification(n) : new window.Notification(n.title, n);
}
async function L(n) {
  await s("plugin:notification|register_action_types", { types: n });
}
async function E() {
  return await s("plugin:notification|get_pending");
}
async function M(n) {
  await s("plugin:notification|cancel", { notifications: n });
}
async function R() {
  await s("plugin:notification|cancel");
}
async function b() {
  return await s("plugin:notification|get_active");
}
async function I(n) {
  await s("plugin:notification|remove_active", { notifications: n });
}
async function S() {
  await s("plugin:notification|remove_active");
}
async function W(n) {
  await s("plugin:notification|create_channel", { ...n });
}
async function x(n) {
  await s("plugin:notification|delete_channel", { id: n });
}
async function H() {
  return await s("plugin:notification|list_channels");
}
async function U(n) {
  return await m("notification", "notification", n);
}
async function $(n) {
  return await m("notification", "actionPerformed", n);
}
export {
  p as Importance,
  k as Schedule,
  g as ScheduleEvery,
  v as Visibility,
  b as active,
  M as cancel,
  R as cancelAll,
  H as channels,
  W as createChannel,
  P as isPermissionGranted,
  $ as onAction,
  U as onNotificationReceived,
  E as pending,
  L as registerActionTypes,
  I as removeActive,
  S as removeAllActive,
  x as removeChannel,
  A as requestPermission,
  T as sendNotification
};
