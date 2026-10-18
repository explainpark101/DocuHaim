const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-C8CrLveq.js","assets/core-BUhCcD2K.js","assets/vendor-telegram-D8J-ixWE.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { a_ as J, a$ as Y, b0 as z, b1 as D, b2 as X, b3 as Z, b4 as I, __tla as __tla_0 } from "./index-Bmhp_ULf.js";
import { d as O, __tla as __tla_1 } from "./bootSplash-CMslVZAf.js";
let se, h, oe, S, be, Le, p, Ne, Se, P, he, ye, M, Ie, ve, l, E, Ae, Ee, F, Q, Me;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  function K(e) {
    if (!e) return null;
    try {
      const t = JSON.parse(e), n = Number(t.apiId), r = typeof t.apiHash == "string" ? t.apiHash.trim() : "", a = typeof t.session == "string" ? t.session : "";
      return !Number.isFinite(n) || n <= 0 || !r ? null : {
        apiId: n,
        apiHash: r,
        session: a
      };
    } catch {
      return null;
    }
  }
  E = async function() {
    return K(await J());
  };
  F = async function(e) {
    await Y(JSON.stringify({
      apiId: e.apiId,
      apiHash: e.apiHash,
      session: e.session
    }));
  };
  Q = async function() {
    await z();
  };
  const j = {
    status: "idle",
    error: null,
    selfName: "",
    dialogs: [],
    activeDialogId: null,
    messages: [],
    messagesLoading: false,
    hasMoreHistory: false,
    replyTo: null,
    notice: null,
    loginHint: null,
    codeViaApp: false
  };
  let w = j;
  const N = /* @__PURE__ */ new Set();
  let f = null;
  function W() {
    for (const e of N) try {
      e();
    } catch {
    }
  }
  p = function() {
    return w;
  };
  Ee = function(e) {
    return N.add(e), () => {
      N.delete(e);
    };
  };
  l = function(e) {
    w = {
      ...w,
      ...e
    }, W();
  };
  function ee() {
    f && (f.reject(new Error("Telegram login cancelled")), f = null), w = j, W();
  }
  function te(e) {
    return e === "phone" ? "need-phone" : e === "code" ? "need-code" : e === "name" ? "need-name" : "need-password";
  }
  function T(e, t) {
    return f && (f.reject(new Error("Telegram login superseded")), f = null), l({
      status: te(e),
      loginHint: t ?? null,
      ...e === "phone" ? {
        codeViaApp: false
      } : {}
    }), new Promise((n, r) => {
      f = {
        kind: e,
        resolve: n,
        reject: r
      };
    });
  }
  Se = function() {
    const e = f;
    if (!e || e.kind !== "code") return;
    f = null;
    const t = new Error("RESTART_AUTH");
    t.errorMessage = "RESTART_AUTH", l({
      status: "connecting",
      error: null,
      codeViaApp: false,
      loginHint: "\uBB38\uC790\uB85C \uC778\uC99D \uCF54\uB4DC\uB97C \uB2E4\uC2DC \uC694\uCCAD\uD569\uB2C8\uB2E4."
    }), e.reject(t);
  };
  Ne = function(e) {
    const t = f;
    t && (f = null, l({
      status: "connecting",
      error: null
    }), t.resolve(e.trim()));
  };
  function ne() {
    const e = f;
    f = null, e && e.reject(new Error("Telegram login cancelled"));
  }
  let $ = null;
  const v = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map();
  h = function() {
    return $;
  };
  function A(e) {
    $ = e;
  }
  function re(e, t) {
    !e || t == null || v.set(e, t);
  }
  se = function(e) {
    return v.get(e);
  };
  function ie(e, t, n) {
    L.set(`${e}:${t}`, n);
  }
  function k(e, t) {
    return L.get(`${e}:${t}`);
  }
  function ae() {
    v.clear(), L.clear();
  }
  const R = 40;
  function b(e) {
    if (e == null) return "";
    if (typeof e == "string") return e;
    if (typeof e == "number" || typeof e == "bigint") return String(e);
    if (typeof e == "object") {
      const n = e;
      if (n.userId != null) return String(n.userId);
      if (n.channelId != null) return String(n.channelId);
      if (n.chatId != null) return String(n.chatId);
    }
    const t = String(e);
    return t === "[object Object]" ? "" : t;
  }
  M = function(e, t) {
    var _a, _b;
    const n = Number(t.id);
    if (!Number.isFinite(n)) return null;
    const r = t.sender, a = [
      r == null ? void 0 : r.firstName,
      r == null ? void 0 : r.lastName
    ].filter(Boolean).join(" ") || (r == null ? void 0 : r.title) || (r == null ? void 0 : r.username) || (t.out ? "\uB098" : ""), i = String(t.message || t.text || ""), s = String(((_a = t.file) == null ? void 0 : _a.name) || ""), o = {
      id: n,
      dialogId: e,
      text: i,
      date: Number(t.date) || 0,
      out: !!t.out,
      senderLabel: a,
      replyToId: ((_b = t.replyTo) == null ? void 0 : _b.replyToMsgId) ? Number(t.replyTo.replyToMsgId) : null,
      hasMedia: !!t.media,
      mediaName: s
    };
    return ie(e, n, t), o;
  };
  function H() {
    const e = h();
    if (!e) throw new Error("Telegram is not connected");
    return e;
  }
  function _(e) {
    const t = se(e);
    if (!t) throw new Error("Chat not found");
    return t;
  }
  be = async function(e, t = false) {
    var _a;
    const n = H(), r = p(), a = t ? (_a = r.messages[0]) == null ? void 0 : _a.id : void 0;
    l({
      activeDialogId: e,
      messagesLoading: true,
      error: null,
      ...t ? {} : {
        messages: [],
        hasMoreHistory: false,
        replyTo: null
      }
    });
    let i;
    try {
      i = await n.getMessages(_(e), {
        limit: R,
        ...a ? {
          offsetId: a
        } : {}
      });
    } catch (c) {
      l({
        messagesLoading: false,
        error: c instanceof Error ? c.message : "\uBA54\uC2DC\uC9C0 \uAE30\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
      });
      return;
    }
    const s = i.map((c) => M(e, c)).filter((c) => c != null).sort((c, g) => c.id - g.id), o = t ? p().messages : [], u = [
      ...s.filter((c) => !o.some((g) => g.id === c.id)),
      ...o
    ].sort((c, g) => c.id - g.id);
    l({
      messages: u,
      messagesLoading: false,
      hasMoreHistory: s.length >= R,
      dialogs: p().dialogs.map((c) => c.id === e ? {
        ...c,
        unread: 0
      } : c)
    });
  };
  Ie = async function(e, t, n) {
    const r = H(), a = t.trim();
    if (!a) return;
    const i = await r.sendMessage(_(e), {
      message: a,
      ...n ? {
        replyTo: n
      } : {}
    }), s = M(e, i);
    if (!s) return;
    const o = p();
    l({
      messages: [
        ...o.messages,
        s
      ],
      replyTo: null,
      dialogs: o.dialogs.map((u) => u.id === e ? {
        ...u,
        preview: s.text
      } : u)
    });
  };
  ve = async function(e, t, n) {
    const r = H(), a = k(e, t);
    await r.forwardMessages(_(n), {
      messages: a ? [
        a
      ] : [
        t
      ],
      fromPeer: _(e)
    });
  };
  Le = function(e) {
    if (!e) {
      l({
        replyTo: null
      });
      return;
    }
    const t = e.text || e.mediaName || "\uBBF8\uB514\uC5B4";
    l({
      replyTo: {
        id: e.id,
        snippet: t.slice(0, 80)
      }
    });
  };
  Ae = function(e, t) {
    return k(e, t);
  };
  oe = async function() {
    var _a, _b;
    const e = h();
    if (!e) return [];
    const t = await e.getDialogs({
      limit: 100
    }), n = [];
    for (const r of t) {
      const a = b(r.id);
      if (!a) continue;
      r.entity && re(a, r.entity);
      const i = String(((_a = r.message) == null ? void 0 : _a.message) || ((_b = r.message) == null ? void 0 : _b.text) || "");
      n.push({
        id: a,
        title: String(r.title || r.name || a),
        unread: Number(r.unreadCount) || 0,
        preview: i,
        isChannel: !!(r.isChannel && !r.isGroup),
        isGroup: !!r.isGroup
      });
    }
    return l({
      dialogs: n
    }), n;
  };
  const C = "telegram-messages";
  function B(e, t = 140) {
    const n = e.replace(/\s+/g, " ").trim();
    return n.length <= t ? n : `${n.slice(0, t - 1)}\u2026`;
  }
  function ce() {
    if (typeof document > "u" || document.visibilityState !== "visible") return false;
    const e = window.location.pathname || "/", t = window.location.hash.startsWith("#") ? window.location.hash.slice(1).split("?")[0] || "/" : "";
    return D(e) || (t ? D(t) : false);
  }
  async function le(e, t) {
    const n = B(e, 80) || "Telegram", r = B(t, 180) || "\uC0C8 \uBA54\uC2DC\uC9C0";
    if (ce() || X({
      id: `telegram-incoming-${Date.now()}`,
      type: Z.TELEGRAM_SYNC,
      label: n,
      detail: r,
      status: "done"
    }), typeof document < "u" && !document.hidden && !O()) return;
    if (O()) {
      try {
        const i = await d(() => import("./index-C8CrLveq.js"), __vite__mapDeps([0,1]));
        let s = await i.isPermissionGranted();
        if (s || (s = await i.requestPermission() === "granted"), !s) return;
        await i.createChannel({
          id: C,
          name: "Telegram",
          importance: i.Importance.Default
        }), i.sendNotification({
          title: n,
          body: r,
          channelId: C
        });
      } catch {
      }
      return;
    }
    if (typeof document > "u" || !document.hidden || typeof Notification > "u") return;
    let a = Notification.permission;
    a === "default" && (a = await Notification.requestPermission()), a === "granted" && new Notification(n, {
      body: r
    });
  }
  function ue(e, t, n, r) {
    const a = e.map((s) => {
      if (s.id !== r.dialogId) return s;
      const o = t === r.dialogId && document.visibilityState === "visible";
      return {
        ...s,
        preview: r.text || r.mediaName || s.preview,
        unread: o || r.out ? s.unread : s.unread + 1
      };
    }), i = t === r.dialogId ? n.some((s) => s.id === r.id) ? n : [
      ...n,
      r
    ] : n;
    l({
      dialogs: a,
      messages: i
    });
  }
  let y = null, V = false, m = null;
  function fe(e) {
    const t = e, n = t.errorMessage || "";
    return n === "PHONE_CODE_INVALID" ? "\uC778\uC99D \uCF54\uB4DC\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." : n === "PHONE_CODE_EXPIRED" ? "\uC778\uC99D \uCF54\uB4DC\uAC00 \uB9CC\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC804\uD654\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD558\uC138\uC694." : n === "PHONE_NUMBER_INVALID" ? "\uC804\uD654\uBC88\uD638\uB294 \uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD574 \uC785\uB825\uD558\uC138\uC694. \uC608: +821012345678" : n === "PHONE_NUMBER_BANNED" || n === "PHONE_NUMBER_FLOOD" ? "\uC774 \uBC88\uD638\uB85C\uB294 \uC9C0\uAE08 \uB85C\uADF8\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : n === "PASSWORD_HASH_INVALID" ? "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." : n.startsWith("FLOOD_WAIT") ? "\uC694\uCCAD\uC774 \uB9CE\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." : t.message === "Code is empty" || t.message === "Password is empty" ? "\uAC12\uC744 \uC785\uB825\uD558\uC138\uC694." : t.message === "First name is required" ? "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694." : "";
  }
  function x(e) {
    const t = e instanceof Error ? e.message : "Telegram connection failed";
    return !t || t.length > 180 ? "Telegram connection failed" : t;
  }
  function de() {
    V || typeof document > "u" || (V = true, document.addEventListener("visibilitychange", () => {
      document.visibilityState === "visible" && G();
    }));
  }
  async function me() {
    const { Buffer: e } = await d(async () => {
      const { Buffer: o } = await import("./vendor-telegram-D8J-ixWE.js").then((u) => u.i);
      return {
        Buffer: o
      };
    }, __vite__mapDeps([2,3,4])), t = globalThis;
    t.Buffer || (t.Buffer = e);
    const [n, r, a, i, s] = await Promise.all([
      d(() => import("./vendor-telegram-D8J-ixWE.js").then((o) => o.a), __vite__mapDeps([2,3,4])),
      d(() => import("./vendor-telegram-D8J-ixWE.js").then((o) => o.b), __vite__mapDeps([2,3,4])),
      d(() => import("./vendor-telegram-D8J-ixWE.js").then((o) => o.c), __vite__mapDeps([2,3,4])),
      d(() => import("./vendor-telegram-D8J-ixWE.js").then((o) => o.L), __vite__mapDeps([2,3,4])),
      d(() => import("./vendor-telegram-D8J-ixWE.js").then((o) => o.d), __vite__mapDeps([2,3,4]))
    ]);
    return {
      TelegramClient: n.TelegramClient,
      Api: n.Api,
      StringSession: r.StringSession,
      PromisedWebSockets: a.PromisedWebSockets,
      Logger: i.Logger,
      LogLevel: i.LogLevel,
      NewMessage: s.NewMessage
    };
  }
  async function ge(e) {
    const t = await me(), n = new t.TelegramClient(new t.StringSession(e.session || ""), e.apiId, e.apiHash, {
      connectionRetries: 5,
      useWSS: true,
      networkSocket: t.PromisedWebSockets,
      autoReconnect: true,
      deviceModel: "DocuHaim",
      systemVersion: "Tauri",
      appVersion: "2.4.0",
      baseLogger: new t.Logger(t.LogLevel.NONE)
    });
    A(n), await n.start({
      phoneNumber: async () => T("phone", "\uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD55C \uC804\uD654\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. \uC778\uC99D\uC740 \uC774 \uD654\uBA74\uC5D0\uC11C \uB05D\uB0A9\uB2C8\uB2E4."),
      phoneCode: async (i) => (l({
        codeViaApp: !!i
      }), T("code", i ? "\uCF54\uB4DC\uAC00 \uB2E4\uB978 Telegram \uC571\uC73C\uB85C \uC804\uB2EC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uADF8 \uCF54\uB4DC\uB97C \uC5EC\uAE30\uC5D0 \uC785\uB825\uD558\uAC70\uB098 \uBB38\uC790\uB85C \uB2E4\uC2DC \uBC1B\uC73C\uC138\uC694." : "\uC778\uC99D \uCF54\uB4DC\uAC00 \uC774 \uBC88\uD638\uC758 \uBB38\uC790 \uB610\uB294 \uC804\uD654\uB85C \uC804\uB2EC\uB429\uB2C8\uB2E4. \uBC1B\uC740 \uCF54\uB4DC\uB97C \uC5EC\uAE30\uC5D0 \uC785\uB825\uD558\uC138\uC694.")),
      password: async (i) => T("password", i ? `2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. \uD78C\uD2B8: ${i}` : "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694."),
      firstAndLastNames: async () => {
        const i = await T("name", "\uC0C8 \uACC4\uC815\uC785\uB2C8\uB2E4. \uC774\uB984\uC744 \uC785\uB825\uD558\uBA74 \uC774 \uC571\uC5D0\uC11C \uAC00\uC785\uC774 \uB05D\uB0A9\uB2C8\uB2E4."), [s = "", o = ""] = i.split(`
`);
        return [
          s.trim(),
          o.trim()
        ];
      },
      forceSMS: true,
      onError: async (i) => {
        const s = fe(i);
        return s && l({
          error: s
        }), false;
      }
    });
    const r = String(n.session.save());
    await F({
      apiId: e.apiId,
      apiHash: e.apiHash,
      session: r
    });
    let a = "";
    try {
      const s = await n.getMe();
      a = s.firstName || s.username || "";
    } catch {
      a = "";
    }
    m && n.removeEventHandler(m, new t.NewMessage({})), m = (i) => {
      var _a;
      const s = i.message;
      if (!s) return;
      const o = b(s.chatId) || b(s.peerId);
      if (!o) return;
      const u = M(o, s);
      if (!u) return;
      const c = p();
      if (ue(c.dialogs, c.activeDialogId, c.messages, u), u.out) return;
      const q = ((_a = c.dialogs.find((U) => U.id === o)) == null ? void 0 : _a.title) || "Telegram";
      le(q, u.text || u.mediaName || "\uC0C8 \uBA54\uC2DC\uC9C0");
    }, n.addEventHandler(m, new t.NewMessage({})), l({
      status: "ready",
      error: null,
      selfName: a
    }), await oe();
  }
  async function pe() {
    var _a;
    !I() || !((_a = await E()) == null ? void 0 : _a.session) || await S();
  }
  S = async function() {
    if (!I()) {
      l({
        status: "error",
        error: "\uB370\uC2A4\uD06C\uD1B1 \uB610\uB294 Android \uC571\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
      });
      return;
    }
    if (!(h() && p().status === "ready")) return y || (y = (async () => {
      de(), l({
        status: "connecting",
        error: null
      });
      const e = await E();
      if (!e) {
        l({
          status: "need-credentials",
          error: null
        });
        return;
      }
      try {
        await ge(e);
      } catch (t) {
        if (x(t) === "Telegram login cancelled") {
          l({
            status: "need-credentials",
            error: null
          });
          return;
        }
        A(null), l({
          status: "error",
          error: x(t)
        });
      }
    })().finally(() => {
      y = null;
    }), y);
  };
  he = async function(e, t) {
    const n = t.trim();
    if (!Number.isFinite(e) || e <= 0 || !n) throw new Error("api_id\uC640 api_hash\uB97C \uC785\uB825\uD558\uC138\uC694.");
    const r = await E();
    await F({
      apiId: e,
      apiHash: n,
      session: r && r.apiId === e ? r.session : ""
    }), await P({
      keepSnapshot: true
    }), await S();
  };
  async function G() {
    var _a;
    if (!I()) return;
    const e = h();
    if (!e) {
      ((_a = await E()) == null ? void 0 : _a.session) && await S();
      return;
    }
    try {
      await e.connect();
    } catch {
    }
  }
  P = async function(e) {
    ne();
    const t = h();
    if (A(null), t && m) try {
      t.removeEventHandler(m, void 0);
    } catch {
    }
    if (m = null, t) try {
      await t.disconnect();
    } catch {
    }
    ae(), (e == null ? void 0 : e.keepSnapshot) || ee();
  };
  ye = async function() {
    const e = h();
    if (e) try {
      const { Api: t } = await d(async () => {
        const { Api: n } = await import("./vendor-telegram-D8J-ixWE.js").then((r) => r.a);
        return {
          Api: n
        };
      }, __vite__mapDeps([2,3,4]));
      await e.invoke(new t.auth.LogOut());
    } catch {
    }
    await Q(), await P();
  };
  Me = Object.freeze(Object.defineProperty({
    __proto__: null,
    connectTelegram: S,
    connectTelegramInBackground: pe,
    connectTelegramWithCredentials: he,
    disconnectTelegram: P,
    logoutTelegram: ye,
    reconnectTelegramIfNeeded: G
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  se as a,
  h as b,
  oe as c,
  S as d,
  be as e,
  Le as f,
  p as g,
  Ne as h,
  Se as i,
  P as j,
  he as k,
  ye as l,
  M as m,
  Ie as n,
  ve as o,
  l as p,
  E as q,
  Ae as r,
  Ee as s,
  F as t,
  Q as u,
  Me as v
};
