const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-C8CrLveq.js","assets/core-BUhCcD2K.js","assets/vendor-telegram-D8J-ixWE.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { _ as f } from "./vendor-aws-hJDgVEKM.js";
import { ci as X, cj as Z, ck as K, cl as R, cm as Q, cn as ee, co as v, __tla as __tla_0 } from "./index-D3YK0B4U.js";
import { e as N, __tla as __tla_1 } from "./bootSplash-BM1jVZSP.js";
import { invoke as F } from "./core-BUhCcD2K.js";
let ae, h, ue, E, Me, Re, p, He, O, Se, Ee, Ne, M, De, Oe, l, Pe, Ce, Ae, L, Be;
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
  function te(e) {
    if (!e) return null;
    try {
      const t = JSON.parse(e), n = Number(t.apiId), r = typeof t.apiHash == "string" ? t.apiHash.trim() : "", o = typeof t.session == "string" ? t.session : "";
      return !Number.isFinite(n) || n <= 0 || !r ? null : {
        apiId: n,
        apiHash: r,
        session: o
      };
    } catch {
      return null;
    }
  }
  L = async function() {
    return te(await X());
  };
  async function k(e) {
    await K(JSON.stringify({
      apiId: e.apiId,
      apiHash: e.apiHash,
      session: e.session
    }));
  }
  async function ne() {
    await Z();
  }
  const W = {
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
    codeViaApp: false,
    loginStep: null
  };
  let _ = W;
  const I = /* @__PURE__ */ new Set();
  let d = null;
  function G() {
    for (const e of I) try {
      e();
    } catch {
    }
  }
  p = function() {
    return _;
  };
  Ae = function(e) {
    return I.add(e), () => {
      I.delete(e);
    };
  };
  l = function(e) {
    _ = {
      ..._,
      ...e
    }, G();
  };
  function re() {
    d && (d.reject(new Error("Telegram login cancelled")), d = null), _ = W, G();
  }
  function se(e) {
    return e === "phone" ? "need-phone" : e === "code" ? "need-code" : e === "name" ? "need-name" : "need-password";
  }
  function w(e, t) {
    return d && (d.reject(new Error("Telegram login superseded")), d = null), l({
      status: se(e),
      loginStep: "mtproto",
      loginHint: t ?? null,
      ...e === "phone" ? {
        codeViaApp: false
      } : {}
    }), new Promise((n, r) => {
      d = {
        kind: e,
        resolve: n,
        reject: r
      };
    });
  }
  He = function() {
    const e = d;
    if (!e || e.kind !== "code") return;
    d = null;
    const t = new Error("RESTART_AUTH");
    t.errorMessage = "RESTART_AUTH", l({
      status: "connecting",
      error: null,
      codeViaApp: false,
      loginHint: "\uBB38\uC790\uB85C \uC778\uC99D \uCF54\uB4DC\uB97C \uB2E4\uC2DC \uC694\uCCAD\uD569\uB2C8\uB2E4."
    }), e.reject(t);
  };
  Pe = function(e) {
    const t = d;
    t && (d = null, l({
      status: "connecting",
      error: null
    }), t.resolve(e.trim()));
  };
  function ie() {
    const e = d;
    d = null, e && e.reject(new Error("Telegram login cancelled"));
  }
  let $ = null;
  const A = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map();
  h = function() {
    return $;
  };
  function P(e) {
    $ = e;
  }
  function oe(e, t) {
    !e || t == null || A.set(e, t);
  }
  ae = function(e) {
    return A.get(e);
  };
  function le(e, t, n) {
    H.set(`${e}:${t}`, n);
  }
  function q(e, t) {
    return H.get(`${e}:${t}`);
  }
  function ce() {
    A.clear(), H.clear();
  }
  const C = 40;
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
    const r = t.sender, o = [
      r == null ? void 0 : r.firstName,
      r == null ? void 0 : r.lastName
    ].filter(Boolean).join(" ") || (r == null ? void 0 : r.title) || (r == null ? void 0 : r.username) || (t.out ? "\uB098" : ""), i = String(t.message || t.text || ""), s = String(((_a = t.file) == null ? void 0 : _a.name) || ""), a = {
      id: n,
      dialogId: e,
      text: i,
      date: Number(t.date) || 0,
      out: !!t.out,
      senderLabel: o,
      replyToId: ((_b = t.replyTo) == null ? void 0 : _b.replyToMsgId) ? Number(t.replyTo.replyToMsgId) : null,
      hasMedia: !!t.media,
      mediaName: s
    };
    return le(e, n, t), a;
  };
  function D() {
    const e = h();
    if (!e) throw new Error("Telegram is not connected");
    return e;
  }
  function S(e) {
    const t = ae(e);
    if (!t) throw new Error("Chat not found");
    return t;
  }
  Me = async function(e, t = false) {
    var _a;
    const n = D(), r = p(), o = t ? (_a = r.messages[0]) == null ? void 0 : _a.id : void 0;
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
      i = await n.getMessages(S(e), {
        limit: C,
        ...o ? {
          offsetId: o
        } : {}
      });
    } catch (c) {
      l({
        messagesLoading: false,
        error: c instanceof Error ? c.message : "\uBA54\uC2DC\uC9C0 \uAE30\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
      });
      return;
    }
    const s = i.map((c) => M(e, c)).filter((c) => c != null).sort((c, g) => c.id - g.id), a = t ? p().messages : [], u = [
      ...s.filter((c) => !a.some((g) => g.id === c.id)),
      ...a
    ].sort((c, g) => c.id - g.id);
    l({
      messages: u,
      messagesLoading: false,
      hasMoreHistory: s.length >= C,
      dialogs: p().dialogs.map((c) => c.id === e ? {
        ...c,
        unread: 0
      } : c)
    });
  };
  De = async function(e, t, n) {
    const r = D(), o = t.trim();
    if (!o) return;
    const i = await r.sendMessage(S(e), {
      message: o,
      ...n ? {
        replyTo: n
      } : {}
    }), s = M(e, i);
    if (!s) return;
    const a = p();
    l({
      messages: [
        ...a.messages,
        s
      ],
      replyTo: null,
      dialogs: a.dialogs.map((u) => u.id === e ? {
        ...u,
        preview: s.text
      } : u)
    });
  };
  Oe = async function(e, t, n) {
    const r = D(), o = q(e, t);
    await r.forwardMessages(S(n), {
      messages: o ? [
        o
      ] : [
        t
      ],
      fromPeer: S(e)
    });
  };
  Re = function(e) {
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
  Ce = function(e, t) {
    return q(e, t);
  };
  ue = async function() {
    var _a, _b;
    const e = h();
    if (!e) return [];
    const t = await e.getDialogs({
      limit: 100
    }), n = [];
    for (const r of t) {
      const o = b(r.id);
      if (!o) continue;
      r.entity && oe(o, r.entity);
      const i = String(((_a = r.message) == null ? void 0 : _a.message) || ((_b = r.message) == null ? void 0 : _b.text) || "");
      n.push({
        id: o,
        title: String(r.title || r.name || o),
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
  const B = "telegram-messages";
  function V(e, t = 140) {
    const n = e.replace(/\s+/g, " ").trim();
    return n.length <= t ? n : `${n.slice(0, t - 1)}\u2026`;
  }
  function de() {
    if (typeof document > "u" || document.visibilityState !== "visible") return false;
    const e = window.location.pathname || "/", t = window.location.hash.startsWith("#") ? window.location.hash.slice(1).split("?")[0] || "/" : "";
    return R(e) || (t ? R(t) : false);
  }
  async function fe(e, t) {
    const n = V(e, 80) || "Telegram", r = V(t, 180) || "\uC0C8 \uBA54\uC2DC\uC9C0";
    if (de() || Q({
      id: `telegram-incoming-${Date.now()}`,
      type: ee.TELEGRAM_SYNC,
      label: n,
      detail: r,
      status: "done"
    }), typeof document < "u" && !document.hidden && !N()) return;
    if (N()) {
      try {
        const i = await f(() => import("./index-C8CrLveq.js"), __vite__mapDeps([0,1]));
        let s = await i.isPermissionGranted();
        if (s || (s = await i.requestPermission() === "granted"), !s) return;
        await i.createChannel({
          id: B,
          name: "Telegram",
          importance: i.Importance.Default
        }), i.sendNotification({
          title: n,
          body: r,
          channelId: B
        });
      } catch {
      }
      return;
    }
    if (typeof document > "u" || !document.hidden || typeof Notification > "u") return;
    let o = Notification.permission;
    o === "default" && (o = await Notification.requestPermission()), o === "granted" && new Notification(n, {
      body: r
    });
  }
  function me(e, t, n, r) {
    const o = e.map((s) => {
      if (s.id !== r.dialogId) return s;
      const a = t === r.dialogId && document.visibilityState === "visible";
      return {
        ...s,
        preview: r.text || r.mediaName || s.preview,
        unread: a || r.out ? s.unread : s.unread + 1
      };
    }), i = t === r.dialogId ? n.some((s) => s.id === r.id) ? n : [
      ...n,
      r
    ] : n;
    l({
      dialogs: o,
      messages: i
    });
  }
  async function ge(e) {
    await F("telegram_portal_send_code", {
      phone: e,
      platform: N() ? "android" : "desktop"
    });
  }
  async function pe(e) {
    return F("telegram_portal_confirm_code", {
      code: e
    });
  }
  let y = null, T = "", x = false, m = null;
  function U(e, t) {
    return typeof e == "string" && e.trim() ? e.trim() : e instanceof Error && e.message.trim() ? e.message.trim() : t;
  }
  function he(e) {
    const t = e, n = t.errorMessage || "";
    return n === "PHONE_CODE_INVALID" ? "\uC778\uC99D \uCF54\uB4DC\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." : n === "PHONE_CODE_EXPIRED" ? "\uC778\uC99D \uCF54\uB4DC\uAC00 \uB9CC\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC804\uD654\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD558\uC138\uC694." : n === "PHONE_NUMBER_INVALID" ? "\uC804\uD654\uBC88\uD638\uB294 \uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD574 \uC785\uB825\uD558\uC138\uC694. \uC608: +821012345678" : n === "PHONE_NUMBER_BANNED" || n === "PHONE_NUMBER_FLOOD" ? "\uC774 \uBC88\uD638\uB85C\uB294 \uC9C0\uAE08 \uB85C\uADF8\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : n === "PASSWORD_HASH_INVALID" ? "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." : n.startsWith("FLOOD_WAIT") ? "\uC694\uCCAD\uC774 \uB9CE\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." : t.message === "Code is empty" || t.message === "Password is empty" ? "\uAC12\uC744 \uC785\uB825\uD558\uC138\uC694." : t.message === "First name is required" ? "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694." : "";
  }
  function j(e) {
    const t = e instanceof Error ? e.message : "Telegram connection failed";
    return !t || t.length > 180 ? "Telegram connection failed" : t;
  }
  function ye() {
    x || typeof document > "u" || (x = true, document.addEventListener("visibilitychange", () => {
      document.visibilityState === "visible" && J();
    }));
  }
  async function Te() {
    const { Buffer: e } = await f(async () => {
      const { Buffer: a } = await import("./vendor-telegram-D8J-ixWE.js").then((u) => u.i);
      return {
        Buffer: a
      };
    }, __vite__mapDeps([2,3,4])), t = globalThis;
    t.Buffer || (t.Buffer = e);
    const [n, r, o, i, s] = await Promise.all([
      f(() => import("./vendor-telegram-D8J-ixWE.js").then((a) => a.a), __vite__mapDeps([2,3,4])),
      f(() => import("./vendor-telegram-D8J-ixWE.js").then((a) => a.b), __vite__mapDeps([2,3,4])),
      f(() => import("./vendor-telegram-D8J-ixWE.js").then((a) => a.c), __vite__mapDeps([2,3,4])),
      f(() => import("./vendor-telegram-D8J-ixWE.js").then((a) => a.L), __vite__mapDeps([2,3,4])),
      f(() => import("./vendor-telegram-D8J-ixWE.js").then((a) => a.d), __vite__mapDeps([2,3,4]))
    ]);
    return {
      TelegramClient: n.TelegramClient,
      Api: n.Api,
      StringSession: r.StringSession,
      PromisedWebSockets: o.PromisedWebSockets,
      Logger: i.Logger,
      LogLevel: i.LogLevel,
      NewMessage: s.NewMessage
    };
  }
  async function we(e) {
    const t = await Te(), n = new t.TelegramClient(new t.StringSession(e.session || ""), e.apiId, e.apiHash, {
      connectionRetries: 5,
      useWSS: true,
      networkSocket: t.PromisedWebSockets,
      autoReconnect: true,
      deviceModel: "DocuHaim",
      systemVersion: "Tauri",
      appVersion: "2.4.0",
      baseLogger: new t.Logger(t.LogLevel.NONE)
    });
    P(n), await n.start({
      phoneNumber: async () => T || w("phone", "\uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD55C \uC804\uD654\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. \uD655\uC778\uC774 \uB05D\uB098\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4."),
      phoneCode: async (i) => (l({
        codeViaApp: !!i
      }), w("code", i ? "\uC774 \uAE30\uAE30\uC5D0 \uB85C\uADF8\uC778\uD560 \uCF54\uB4DC\uAC00 \uB2E4\uB978 Telegram \uC571\uC73C\uB85C \uC804\uB2EC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uADF8 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBB38\uC790\uB85C \uB2E4\uC2DC \uBC1B\uC73C\uC138\uC694." : "\uC774 \uAE30\uAE30\uC5D0 \uB85C\uADF8\uC778\uD560 \uCF54\uB4DC\uAC00 \uBB38\uC790 \uB610\uB294 \uC804\uD654\uB85C \uC804\uB2EC\uB429\uB2C8\uB2E4. \uC785\uB825\uD558\uBA74 \uC138\uC158\uC774 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4.")),
      password: async (i) => w("password", i ? `2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. \uD78C\uD2B8: ${i}` : "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694."),
      firstAndLastNames: async () => {
        const i = await w("name", "\uC0C8 \uACC4\uC815\uC785\uB2C8\uB2E4. \uC774\uB984\uC744 \uC785\uB825\uD558\uBA74 \uC774 \uC571\uC5D0\uC11C \uAC00\uC785\uC774 \uB05D\uB0A9\uB2C8\uB2E4."), [s = "", a = ""] = i.split(`
`);
        return [
          s.trim(),
          a.trim()
        ];
      },
      forceSMS: true,
      onError: async (i) => {
        const s = he(i);
        return s && l({
          error: s
        }), false;
      }
    });
    const r = String(n.session.save());
    await k({
      apiId: e.apiId,
      apiHash: e.apiHash,
      session: r
    });
    let o = "";
    try {
      const s = await n.getMe();
      o = s.firstName || s.username || "";
    } catch {
      o = "";
    }
    m && n.removeEventHandler(m, new t.NewMessage({})), m = (i) => {
      var _a;
      const s = i.message;
      if (!s) return;
      const a = b(s.chatId) || b(s.peerId);
      if (!a) return;
      const u = M(a, s);
      if (!u) return;
      const c = p();
      if (me(c.dialogs, c.activeDialogId, c.messages, u), u.out) return;
      const Y = ((_a = c.dialogs.find((z) => z.id === a)) == null ? void 0 : _a.title) || "Telegram";
      fe(Y, u.text || u.mediaName || "\uC0C8 \uBA54\uC2DC\uC9C0");
    }, n.addEventHandler(m, new t.NewMessage({})), T = "", l({
      status: "ready",
      error: null,
      loginStep: null,
      selfName: o
    }), await ue();
  }
  async function _e() {
    var _a;
    !v() || !((_a = await L()) == null ? void 0 : _a.session) || await E();
  }
  E = async function() {
    if (!v()) {
      l({
        status: "error",
        error: "\uB370\uC2A4\uD06C\uD1B1 \uB610\uB294 Android \uC571\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
      });
      return;
    }
    if (!(h() && p().status === "ready")) return y || (y = (async () => {
      ye(), l({
        status: "connecting",
        error: null
      });
      const e = await L();
      if (!e) {
        l({
          status: "need-phone",
          loginStep: "portal-phone",
          error: null,
          loginHint: "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. Telegram \uC11C\uBC84\uAC00 \uD655\uC778\uD558\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC790\uB3D9\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4."
        });
        return;
      }
      try {
        await we(e);
      } catch (t) {
        if (j(t) === "Telegram login cancelled") {
          l({
            status: "need-phone",
            loginStep: "portal-phone",
            error: null,
            loginHint: "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. Telegram \uC11C\uBC84\uAC00 \uD655\uC778\uD558\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC790\uB3D9\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4."
          });
          return;
        }
        P(null), l({
          status: "error",
          error: j(t)
        });
      }
    })().finally(() => {
      y = null;
    }), y);
  };
  Se = async function(e) {
    l({
      status: "connecting",
      error: null,
      loginHint: null
    });
    try {
      await ge(e), l({
        status: "need-code",
        loginStep: "portal-code",
        codeViaApp: false,
        error: null,
        loginHint: "Telegram\uC774 \uBCF4\uB0B8 \uD655\uC778 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uC138\uC694. \uBC88\uD638\uAC00 \uD655\uC778\uB418\uBA74 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB418\uACE0, \uC774\uC5B4\uC11C \uB85C\uADF8\uC778 \uCF54\uB4DC\uB97C \uBC1B\uC2B5\uB2C8\uB2E4."
      });
    } catch (t) {
      l({
        status: "need-phone",
        loginStep: "portal-phone",
        error: U(t, "\uD655\uC778 \uCF54\uB4DC\uB97C \uC694\uCCAD\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.")
      });
    }
  };
  Ee = async function(e) {
    l({
      status: "connecting",
      error: null,
      loginHint: "\uBC88\uD638\uB97C \uD655\uC778\uD558\uACE0 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uD558\uB294 \uC911\uC785\uB2C8\uB2E4."
    });
    try {
      const t = await pe(e);
      await k({
        apiId: t.apiId,
        apiHash: t.apiHash,
        session: ""
      }), T = t.phone, await O({
        keepSnapshot: true
      }), await E();
    } catch (t) {
      const n = U(t, "\uBC88\uD638\uB97C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), r = n.includes("\uD655\uC778 \uCF54\uB4DC\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4") || n.includes("\uD655\uC778 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uC138\uC694");
      l(r ? {
        status: "need-code",
        loginStep: "portal-code",
        error: n
      } : {
        status: "need-phone",
        loginStep: "portal-phone",
        error: n,
        loginHint: "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD558\uBA74 \uD655\uC778 \uCF54\uB4DC\uB97C \uC0C8\uB85C \uBC1B\uC2B5\uB2C8\uB2E4."
      });
    }
  };
  async function J() {
    var _a;
    if (!v()) return;
    const e = h();
    if (!e) {
      ((_a = await L()) == null ? void 0 : _a.session) && await E();
      return;
    }
    try {
      await e.connect();
    } catch {
    }
  }
  O = async function(e) {
    ie();
    const t = h();
    if (P(null), t && m) try {
      t.removeEventHandler(m, void 0);
    } catch {
    }
    if (m = null, t) try {
      await t.disconnect();
    } catch {
    }
    ce(), (e == null ? void 0 : e.keepSnapshot) || (T = "", re());
  };
  Ne = async function() {
    const e = h();
    if (e) try {
      const { Api: t } = await f(async () => {
        const { Api: n } = await import("./vendor-telegram-D8J-ixWE.js").then((r) => r.a);
        return {
          Api: n
        };
      }, __vite__mapDeps([2,3,4]));
      await e.invoke(new t.auth.LogOut());
    } catch {
    }
    await ne(), await O();
  };
  Be = Object.freeze(Object.defineProperty({
    __proto__: null,
    beginTelegramPhoneLogin: Se,
    completeTelegramPortalLogin: Ee,
    connectTelegram: E,
    connectTelegramInBackground: _e,
    disconnectTelegram: O,
    logoutTelegram: Ne,
    reconnectTelegramIfNeeded: J
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  ae as a,
  h as b,
  ue as c,
  E as d,
  Me as e,
  Re as f,
  p as g,
  He as h,
  O as i,
  Se as j,
  Ee as k,
  Ne as l,
  M as m,
  De as n,
  Oe as o,
  l as p,
  Pe as q,
  Ce as r,
  Ae as s,
  L as t,
  Be as u
};
