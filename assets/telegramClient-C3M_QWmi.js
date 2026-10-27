const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-C8CrLveq.js","assets/core-BUhCcD2K.js","assets/vendor-telegram-D00RM5aC.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-buffer-CTvp1cCp.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { _ as m } from "./vendor-aws-hJDgVEKM.js";
import { cU as se, cV as ie, cW as ae, cX as F, cY as oe, cZ as le, c_ as P, __tla as __tla_0 } from "./index-DRAozU5b.js";
import { a as H, __tla as __tla_1 } from "./bootSplash-Z2krRgC9.js";
import { invoke as K } from "./core-BUhCcD2K.js";
import { i as ce } from "./installBrowserBuffer-DKXKH6ya.js";
let _, ye, I, Ze, Ge, S, E, Me, Ce, Ve, g, Ke, k, B, ke, o, Xe, ze, je, N, qe, Ye, Ue;
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
  function ue(e) {
    if (!e) return null;
    try {
      const t = JSON.parse(e), n = Number(t.apiId), r = typeof t.apiHash == "string" ? t.apiHash.trim() : "", i = typeof t.session == "string" ? t.session : "";
      return !Number.isFinite(n) || n <= 0 || !r ? null : {
        apiId: n,
        apiHash: r,
        session: i
      };
    } catch {
      return null;
    }
  }
  async function v() {
    return ue(await se());
  }
  async function M(e) {
    await ie(JSON.stringify({
      apiId: e.apiId,
      apiHash: e.apiHash,
      session: e.session
    }));
  }
  async function X() {
    await ae();
  }
  const q = {
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
  let A = q;
  const R = /* @__PURE__ */ new Set();
  let u = null;
  function Z() {
    for (const e of R) try {
      e();
    } catch {
    }
  }
  E = function() {
    return A;
  };
  je = function(e) {
    return R.add(e), () => {
      R.delete(e);
    };
  };
  o = function(e) {
    A = {
      ...A,
      ...e
    }, Z();
  };
  function fe() {
    u && (u.reject(new Error("Telegram login cancelled")), u = null), A = q, Z();
  }
  function me(e) {
    return e === "phone" ? "need-phone" : e === "code" ? "need-code" : e === "name" ? "need-name" : "need-password";
  }
  function w(e, t) {
    return u && (u.reject(new Error("Telegram login superseded")), u = null), o({
      status: me(e),
      loginStep: "mtproto",
      loginHint: t ?? null,
      ...e === "phone" ? {
        codeViaApp: false
      } : {}
    }), new Promise((n, r) => {
      u = {
        kind: e,
        resolve: n,
        reject: r
      };
    });
  }
  Ge = function() {
    const e = u;
    if (!e || e.kind !== "code") return;
    u = null;
    const t = new Error("RESTART_AUTH");
    t.errorMessage = "RESTART_AUTH", o({
      status: "connecting",
      error: null,
      codeViaApp: false,
      loginHint: "\uBB38\uC790\uB85C \uC778\uC99D \uCF54\uB4DC\uB97C \uB2E4\uC2DC \uC694\uCCAD\uD569\uB2C8\uB2E4."
    }), e.reject(t);
  };
  Ye = function(e) {
    const t = u;
    t && (u = null, o({
      status: "connecting",
      error: null
    }), t.resolve(e.trim()));
  };
  function ge() {
    const e = u;
    u = null, e && e.reject(new Error("Telegram login cancelled"));
  }
  let z = null;
  const C = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map();
  _ = function() {
    return z;
  };
  function J(e) {
    z = e;
  }
  function de(e, t) {
    !e || t == null || C.set(e, t);
  }
  function pe(e) {
    return C.get(e);
  }
  function Te(e, t, n) {
    V.set(`${e}:${t}`, n);
  }
  function Q(e, t) {
    return V.get(`${e}:${t}`);
  }
  function Ee() {
    C.clear(), V.clear();
  }
  const x = 180, $ = /* @__PURE__ */ new Set([
    "BAD_REQUEST",
    "FLOOD",
    "UNAUTHORIZED",
    "FORBIDDEN",
    "NOT_FOUND",
    "AUTH_KEY",
    "INTERNAL",
    "Timeout",
    "ERROR_SEE_OTHER"
  ]), he = /* @__PURE__ */ new Set([
    "AUTH_KEY_UNREGISTERED",
    "AUTH_KEY_INVALID",
    "SESSION_REVOKED",
    "SESSION_EXPIRED",
    "USER_DEACTIVATED",
    "USER_DEACTIVATED_BAN"
  ]);
  function D(e) {
    const t = e.trim();
    return t.length <= x ? t : `${t.slice(0, x - 1)}\u2026`;
  }
  function ee(e) {
    if (typeof e == "string") return {
      message: e
    };
    if (!e || typeof e != "object") return {};
    const t = e;
    return {
      ...typeof t.message == "string" ? {
        message: t.message
      } : {},
      ...typeof t.errorMessage == "string" ? {
        errorMessage: t.errorMessage
      } : {}
    };
  }
  function _e(e) {
    var _a;
    return ((_a = e.match(/\b([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+)\b/)) == null ? void 0 : _a[1]) ?? "";
  }
  function te(e) {
    const t = ee(e), n = t.message ? _e(t.message) : "";
    if (n && !$.has(n)) return n;
    const r = t.errorMessage ?? "";
    return r && !$.has(r) ? r : n || r;
  }
  function L(e) {
    return he.has(te(e));
  }
  function Se(e) {
    if (e === "PHONE_CODE_INVALID") return "\uC778\uC99D \uCF54\uB4DC\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.";
    if (e === "PHONE_CODE_EXPIRED") return "\uC778\uC99D \uCF54\uB4DC\uAC00 \uB9CC\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC804\uD654\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD558\uC138\uC694.";
    if (e === "PHONE_NUMBER_INVALID") return "\uC804\uD654\uBC88\uD638\uB294 \uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD574 \uC785\uB825\uD558\uC138\uC694. \uC608: +821012345678";
    if (e === "PHONE_NUMBER_BANNED" || e === "PHONE_NUMBER_FLOOD") return "\uC774 \uBC88\uD638\uB85C\uB294 \uC9C0\uAE08 \uB85C\uADF8\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.";
    if (e === "PASSWORD_HASH_INVALID") return "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.";
    const t = /^FLOOD_WAIT_(\d+)$/.exec(e);
    return (t == null ? void 0 : t[1]) ? `\uC694\uCCAD\uC774 \uB9CE\uC2B5\uB2C8\uB2E4. ${t[1]}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.` : e === "FLOOD_WAIT" || e === "FLOOD" ? "\uC694\uCCAD\uC774 \uB9CE\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." : e === "AUTH_KEY_UNREGISTERED" || e === "AUTH_KEY_INVALID" || e === "SESSION_REVOKED" || e === "SESSION_EXPIRED" ? "\uC774 \uAE30\uAE30\uC758 Telegram \uC138\uC158\uC774 \uB9CC\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uB85C\uADF8\uC778\uD558\uC138\uC694." : e === "USER_DEACTIVATED" || e === "USER_DEACTIVATED_BAN" ? "\uC774 \uACC4\uC815\uC73C\uB85C\uB294 \uB85C\uADF8\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : e === "PEER_ID_INVALID" ? "\uB300\uD654\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : e === "CHAT_WRITE_FORBIDDEN" || e === "USER_BANNED_IN_CHANNEL" ? "\uC774 \uB300\uD654\uC5D0\uB294 \uBA54\uC2DC\uC9C0\uB97C \uBCF4\uB0BC \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : e === "CHANNEL_PRIVATE" ? "\uBE44\uACF5\uAC1C \uCC44\uB110\uC774\uB77C \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : e === "MESSAGE_ID_INVALID" ? "\uBA54\uC2DC\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : e === "FILE_REFERENCE_EXPIRED" || e === "MEDIA_EMPTY" ? "\uD30C\uC77C\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." : e === "RESTART_AUTH" ? "\uBB38\uC790\uB85C \uC778\uC99D \uCF54\uB4DC\uB97C \uB2E4\uC2DC \uC694\uCCAD\uD569\uB2C8\uB2E4." : "";
  }
  g = function(e, t) {
    var _a;
    const r = ee(e).message ?? "", i = Se(te(e));
    if (i) return D(i);
    const a = (_a = r.match(/Module "([^"]+)" has been externalized/)) == null ? void 0 : _a[1];
    return a ? D(`\uC774 \uD658\uACBD\uC5D0\uC11C Node \uBAA8\uB4C8 "${a}"\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.`) : r === "Code is empty" || r === "Password is empty" ? "\uAC12\uC744 \uC785\uB825\uD558\uC138\uC694." : r === "First name is required" ? "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694." : r === "Telegram login cancelled" ? r : r.trim() ? D(r.trim()) : t;
  };
  const W = 40;
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
  k = function(e, t) {
    var _a, _b;
    const n = Number(t.id);
    if (!Number.isFinite(n)) return null;
    const r = t.sender, i = [
      r == null ? void 0 : r.firstName,
      r == null ? void 0 : r.lastName
    ].filter(Boolean).join(" ") || (r == null ? void 0 : r.title) || (r == null ? void 0 : r.username) || (t.out ? "\uB098" : ""), s = String(t.message || t.text || ""), a = String(((_a = t.file) == null ? void 0 : _a.name) || ""), l = {
      id: n,
      dialogId: e,
      text: s,
      date: Number(t.date) || 0,
      out: !!t.out,
      senderLabel: i,
      replyToId: ((_b = t.replyTo) == null ? void 0 : _b.replyToMsgId) ? Number(t.replyTo.replyToMsgId) : null,
      hasMedia: !!t.media,
      mediaName: a
    };
    return Te(e, n, t), l;
  };
  function U() {
    const e = _();
    if (!e) throw new Error("Telegram\uC5D0 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    return e;
  }
  N = function(e) {
    return pe(e) ?? e;
  };
  Ke = async function(e, t = false) {
    var _a;
    const n = E(), r = t ? (_a = n.messages[0]) == null ? void 0 : _a.id : void 0;
    o({
      activeDialogId: e,
      messagesLoading: true,
      error: null,
      ...t ? {} : {
        messages: [],
        hasMoreHistory: false,
        replyTo: null
      }
    });
    try {
      const s = await U().getMessages(N(e), {
        limit: W,
        ...r ? {
          offsetId: r
        } : {}
      }), l = (Array.isArray(s) ? s : []).map((c) => k(e, c)).filter((c) => c != null).sort((c, d) => c.id - d.id), f = t ? E().messages : [], T = [
        ...l.filter((c) => !f.some((d) => d.id === c.id)),
        ...f
      ].sort((c, d) => c.id - d.id);
      o({
        messages: T,
        messagesLoading: false,
        hasMoreHistory: l.length >= W,
        dialogs: E().dialogs.map((c) => c.id === e ? {
          ...c,
          unread: 0
        } : c)
      });
    } catch (i) {
      o({
        messagesLoading: false
      });
      try {
        const { dropDeadTelegramSession: s } = await m(async () => {
          const { dropDeadTelegramSession: a } = await Promise.resolve().then(() => Ue);
          return {
            dropDeadTelegramSession: a
          };
        }, void 0);
        if (await s(i)) return;
      } catch {
      }
      o({
        error: g(i, "\uBA54\uC2DC\uC9C0 \uAE30\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.")
      });
    }
  };
  Xe = async function(e, t, n) {
    const r = U(), i = t.trim();
    if (!i) return;
    const s = await r.sendMessage(N(e), {
      message: i,
      ...n ? {
        replyTo: n
      } : {}
    }), a = k(e, s);
    if (!a) return;
    const l = E();
    o({
      messages: [
        ...l.messages,
        a
      ],
      replyTo: null,
      dialogs: l.dialogs.map((f) => f.id === e ? {
        ...f,
        preview: a.text
      } : f)
    });
  };
  qe = async function(e, t, n) {
    const r = U(), i = Q(e, t);
    await r.forwardMessages(N(n), {
      messages: i ? [
        i
      ] : [
        t
      ],
      fromPeer: N(e)
    });
  };
  Ze = function(e) {
    if (!e) {
      o({
        replyTo: null
      });
      return;
    }
    const t = e.text || e.mediaName || "\uBBF8\uB514\uC5B4";
    o({
      replyTo: {
        id: e.id,
        snippet: t.slice(0, 80)
      }
    });
  };
  ze = function(e, t) {
    return Q(e, t);
  };
  ye = async function() {
    var _a, _b;
    const e = _();
    if (!e) return [];
    const t = await e.getDialogs({
      limit: 100
    }), n = [];
    for (const r of t) {
      const i = b(r.id);
      if (!i) continue;
      r.entity && de(i, r.entity);
      const s = String(((_a = r.message) == null ? void 0 : _a.message) || ((_b = r.message) == null ? void 0 : _b.text) || "");
      n.push({
        id: i,
        title: String(r.title || r.name || i),
        unread: Number(r.unreadCount) || 0,
        preview: s,
        isChannel: !!(r.isChannel && !r.isGroup),
        isGroup: !!r.isGroup
      });
    }
    return o({
      dialogs: n
    }), n;
  };
  const j = "telegram-messages";
  function G(e, t = 140) {
    const n = e.replace(/\s+/g, " ").trim();
    return n.length <= t ? n : `${n.slice(0, t - 1)}\u2026`;
  }
  function Ie() {
    if (typeof document > "u" || document.visibilityState !== "visible") return false;
    const e = window.location.pathname || "/", t = window.location.hash.startsWith("#") ? window.location.hash.slice(1).split("?")[0] || "/" : "";
    return F(e) || (t ? F(t) : false);
  }
  async function we(e, t) {
    const n = G(e, 80) || "Telegram", r = G(t, 180) || "\uC0C8 \uBA54\uC2DC\uC9C0";
    if (Ie() || oe({
      id: `telegram-incoming-${Date.now()}`,
      type: le.TELEGRAM_SYNC,
      label: n,
      detail: r,
      status: "done"
    }), typeof document < "u" && !document.hidden && !H()) return;
    if (H()) {
      try {
        const s = await m(() => import("./index-C8CrLveq.js"), __vite__mapDeps([0,1]));
        let a = await s.isPermissionGranted();
        if (a || (a = await s.requestPermission() === "granted"), !a) return;
        await s.createChannel({
          id: j,
          name: "Telegram",
          importance: s.Importance.Default
        }), s.sendNotification({
          title: n,
          body: r,
          channelId: j
        });
      } catch {
      }
      return;
    }
    if (typeof document > "u" || !document.hidden || typeof Notification > "u") return;
    let i = Notification.permission;
    i === "default" && (i = await Notification.requestPermission()), i === "granted" && new Notification(n, {
      body: r
    });
  }
  function Ae(e, t, n, r) {
    const i = e.map((a) => {
      if (a.id !== r.dialogId) return a;
      const l = t === r.dialogId && document.visibilityState === "visible";
      return {
        ...a,
        preview: r.text || r.mediaName || a.preview,
        unread: l || r.out ? a.unread : a.unread + 1
      };
    }), s = t === r.dialogId ? n.some((a) => a.id === r.id) ? n : [
      ...n,
      r
    ] : n;
    o({
      dialogs: i,
      messages: s
    });
  }
  async function Ne(e) {
    await K("telegram_portal_send_code", {
      phone: e,
      platform: H() ? "android" : "desktop"
    });
  }
  async function De(e) {
    return K("telegram_portal_confirm_code", {
      code: e
    });
  }
  const He = 2147483647;
  function Re(e) {
    const t = e.apiId.trim();
    if (!/^\d+$/.test(t)) return {
      ok: false,
      error: "API ID\uB294 \uC22B\uC790\uC785\uB2C8\uB2E4."
    };
    const n = Number(t);
    if (!Number.isSafeInteger(n) || n <= 0 || n > He) return {
      ok: false,
      error: "API ID\uB294 \uC22B\uC790\uC785\uB2C8\uB2E4."
    };
    const r = e.apiHash.trim().toLowerCase();
    if (!/^[a-f0-9]{32}$/.test(r)) return {
      ok: false,
      error: "API Hash\uB294 32\uC790\uB9AC \uC601\uBB38\uACFC \uC22B\uC790\uC785\uB2C8\uB2E4."
    };
    const i = e.phone.replace(/[\s-]/g, "");
    return !i.startsWith("+") || i.length < 8 || !/^\+\d+$/.test(i) ? {
      ok: false,
      error: "\uC804\uD654\uBC88\uD638\uB294 \uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD574 \uC785\uB825\uD558\uC138\uC694. \uC608: +821012345678"
    } : {
      ok: true,
      value: {
        apiId: n,
        apiHash: r,
        phone: i
      }
    };
  }
  let y = null, h = "", Y = false, p = null;
  const O = "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. Telegram \uC11C\uBC84\uAC00 \uD655\uC778\uD558\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC790\uB3D9\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4.";
  function Le() {
    var _a;
    if (typeof WebSocket > "u" || !((_a = globalThis.crypto) == null ? void 0 : _a.subtle)) throw new Error("\uC774 \uD658\uACBD\uC5D0\uC11C\uB294 Telegram \uC5F0\uACB0\uC5D0 \uD544\uC694\uD55C WebCrypto \uB610\uB294 WebSocket\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  }
  function be() {
    Y || typeof document > "u" || (Y = true, document.addEventListener("visibilitychange", () => {
      document.visibilityState === "visible" && ne();
    }));
  }
  async function Oe() {
    Le(), ce();
    const [e, t, n, r, i] = await Promise.all([
      m(() => import("./vendor-telegram-D00RM5aC.js").then((s) => s.i), __vite__mapDeps([2,3,4,5])),
      m(() => import("./vendor-telegram-D00RM5aC.js").then((s) => s.a), __vite__mapDeps([2,3,4,5])),
      m(() => import("./vendor-telegram-D00RM5aC.js").then((s) => s.b), __vite__mapDeps([2,3,4,5])),
      m(() => import("./vendor-telegram-D00RM5aC.js").then((s) => s.L), __vite__mapDeps([2,3,4,5])),
      m(() => import("./vendor-telegram-D00RM5aC.js").then((s) => s.c), __vite__mapDeps([2,3,4,5]))
    ]);
    return {
      TelegramClient: e.TelegramClient,
      Api: e.Api,
      StringSession: t.StringSession,
      PromisedWebSockets: n.PromisedWebSockets,
      Logger: r.Logger,
      LogLevel: r.LogLevel,
      NewMessage: i.NewMessage
    };
  }
  async function Pe(e) {
    const t = await Oe(), n = new t.TelegramClient(new t.StringSession(e.session || ""), e.apiId, e.apiHash, {
      connectionRetries: 5,
      useWSS: true,
      networkSocket: t.PromisedWebSockets,
      autoReconnect: true,
      deviceModel: "DocuHaim",
      systemVersion: "Tauri",
      appVersion: "2.4.0",
      baseLogger: new t.Logger(t.LogLevel.NONE)
    });
    J(n), await n.start({
      phoneNumber: async () => h || w("phone", "\uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD55C \uC804\uD654\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. \uD655\uC778\uC774 \uB05D\uB098\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4."),
      phoneCode: async (s) => (o({
        codeViaApp: !!s
      }), w("code", s ? "\uC774 \uAE30\uAE30\uC5D0 \uB85C\uADF8\uC778\uD560 \uCF54\uB4DC\uAC00 \uB2E4\uB978 Telegram \uC571\uC73C\uB85C \uC804\uB2EC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uADF8 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBB38\uC790\uB85C \uB2E4\uC2DC \uBC1B\uC73C\uC138\uC694." : "\uC774 \uAE30\uAE30\uC5D0 \uB85C\uADF8\uC778\uD560 \uCF54\uB4DC\uAC00 \uBB38\uC790 \uB610\uB294 \uC804\uD654\uB85C \uC804\uB2EC\uB429\uB2C8\uB2E4. \uC785\uB825\uD558\uBA74 \uC138\uC158\uC774 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4.")),
      password: async (s) => w("password", s ? `2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. \uD78C\uD2B8: ${s}` : "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694."),
      firstAndLastNames: async () => {
        const s = await w("name", "\uC0C8 \uACC4\uC815\uC785\uB2C8\uB2E4. \uC774\uB984\uC744 \uC785\uB825\uD558\uBA74 \uC774 \uC571\uC5D0\uC11C \uAC00\uC785\uC774 \uB05D\uB0A9\uB2C8\uB2E4."), [a = "", l = ""] = s.split(`
`);
        return [
          a.trim(),
          l.trim()
        ];
      },
      forceSMS: true,
      onError: async (s) => (o({
        error: g(s, "\uB85C\uADF8\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.")
      }), false)
    });
    const r = String(n.session.save());
    await M({
      apiId: e.apiId,
      apiHash: e.apiHash,
      session: r
    });
    let i = "";
    try {
      const a = await n.getMe();
      i = a.firstName || a.username || "";
    } catch (s) {
      if (L(s)) throw s;
      i = "";
    }
    p && n.removeEventHandler(p, new t.NewMessage({})), p = (s) => {
      var _a;
      try {
        const a = s.message;
        if (!a) return;
        const l = b(a.chatId) || b(a.peerId);
        if (!l) return;
        const f = k(l, a);
        if (!f) return;
        const T = E();
        if (Ae(T.dialogs, T.activeDialogId, T.messages, f), f.out) return;
        const d = ((_a = T.dialogs.find((re) => re.id === l)) == null ? void 0 : _a.title) || "Telegram";
        we(d, f.text || f.mediaName || "\uC0C8 \uBA54\uC2DC\uC9C0");
      } catch {
      }
    }, n.addEventHandler(p, new t.NewMessage({})), h = "", o({
      status: "ready",
      error: null,
      loginStep: null,
      selfName: i
    });
    try {
      await ye();
    } catch (s) {
      if (L(s)) throw s;
      o({
        error: g(s, "\uB300\uD654 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.")
      });
    }
  }
  async function ve() {
    var _a;
    !P() || !((_a = await v()) == null ? void 0 : _a.session) || await I();
  }
  I = async function() {
    if (!P()) {
      o({
        status: "error",
        error: "\uB370\uC2A4\uD06C\uD1B1 \uB610\uB294 Android \uC571\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
      });
      return;
    }
    if (!(_() && E().status === "ready")) return y || (y = (async () => {
      be(), o({
        status: "connecting",
        error: null
      });
      const e = await v();
      if (!e) {
        o({
          status: "need-phone",
          loginStep: "portal-phone",
          error: null,
          loginHint: O
        });
        return;
      }
      try {
        await Pe(e);
      } catch (t) {
        if (t instanceof Error && t.message === "Telegram login cancelled") {
          o({
            status: "need-phone",
            loginStep: "portal-phone",
            error: null,
            loginHint: O
          });
          return;
        }
        if (await B(t)) return;
        await S({
          keepSnapshot: true
        }), o({
          status: "error",
          error: g(t, "Telegram \uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.")
        });
      }
    })().finally(() => {
      y = null;
    }), y);
  };
  Me = async function(e) {
    const t = Re(e);
    if (!t.ok) {
      o({
        error: t.error
      });
      return;
    }
    o({
      status: "connecting",
      error: null,
      loginHint: "\uC785\uB825\uD55C \uC5F0\uACB0 \uC815\uBCF4\uB85C \uB85C\uADF8\uC778\uD569\uB2C8\uB2E4."
    });
    try {
      await M({
        apiId: t.value.apiId,
        apiHash: t.value.apiHash,
        session: ""
      }), h = t.value.phone, await S({
        keepSnapshot: true
      }), await I();
    } catch (n) {
      o({
        status: "need-phone",
        loginStep: "portal-phone",
        error: g(n, "\uC5F0\uACB0 \uC815\uBCF4\uB97C \uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.")
      });
    }
  };
  Ce = async function(e) {
    o({
      status: "connecting",
      error: null,
      loginHint: null
    });
    try {
      await Ne(e), o({
        status: "need-code",
        loginStep: "portal-code",
        codeViaApp: false,
        error: null,
        loginHint: "Telegram\uC774 \uBCF4\uB0B8 \uD655\uC778 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uC138\uC694. \uBC88\uD638\uAC00 \uD655\uC778\uB418\uBA74 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB418\uACE0, \uC774\uC5B4\uC11C \uB85C\uADF8\uC778 \uCF54\uB4DC\uB97C \uBC1B\uC2B5\uB2C8\uB2E4."
      });
    } catch (t) {
      o({
        status: "need-phone",
        loginStep: "portal-phone",
        error: g(t, "\uD655\uC778 \uCF54\uB4DC\uB97C \uC694\uCCAD\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.")
      });
    }
  };
  Ve = async function(e) {
    o({
      status: "connecting",
      error: null,
      loginHint: "\uBC88\uD638\uB97C \uD655\uC778\uD558\uACE0 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uD558\uB294 \uC911\uC785\uB2C8\uB2E4."
    });
    try {
      const t = await De(e);
      await M({
        apiId: t.apiId,
        apiHash: t.apiHash,
        session: ""
      }), h = t.phone, await S({
        keepSnapshot: true
      }), await I();
    } catch (t) {
      const n = g(t, "\uBC88\uD638\uB97C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), r = n.includes("\uD655\uC778 \uCF54\uB4DC\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4") || n.includes("\uD655\uC778 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uC138\uC694");
      o(r ? {
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
  async function ne() {
    var _a;
    if (!P()) return;
    const e = _();
    if (!e) {
      ((_a = await v()) == null ? void 0 : _a.session) && await I();
      return;
    }
    try {
      await e.connect();
    } catch (t) {
      await B(t);
    }
  }
  S = async function(e) {
    ge();
    const t = _();
    if (J(null), t && p) try {
      t.removeEventHandler(p, void 0);
    } catch {
    }
    if (p = null, t) try {
      await t.disconnect();
    } catch {
    }
    Ee(), (e == null ? void 0 : e.keepSnapshot) || (h = "", fe());
  };
  B = async function(e) {
    if (!L(e)) return false;
    try {
      await X();
    } catch {
    }
    return await S({
      keepSnapshot: true
    }), o({
      status: "need-phone",
      loginStep: "portal-phone",
      error: g(e, "\uC774 \uAE30\uAE30\uC758 Telegram \uC138\uC158\uC774 \uB9CC\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uB85C\uADF8\uC778\uD558\uC138\uC694."),
      loginHint: O
    }), true;
  };
  ke = async function() {
    const e = _();
    if (e) try {
      const { Api: t } = await m(async () => {
        const { Api: n } = await import("./vendor-telegram-D00RM5aC.js").then((r) => r.i);
        return {
          Api: n
        };
      }, __vite__mapDeps([2,3,4,5]));
      await e.invoke(new t.auth.LogOut());
    } catch {
    }
    await X(), await S();
  };
  Ue = Object.freeze(Object.defineProperty({
    __proto__: null,
    beginTelegramApiLogin: Me,
    beginTelegramPhoneLogin: Ce,
    completeTelegramPortalLogin: Ve,
    connectTelegram: I,
    connectTelegramInBackground: ve,
    disconnectTelegram: S,
    dropDeadTelegramSession: B,
    logoutTelegram: ke,
    reconnectTelegramIfNeeded: ne
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  _ as a,
  ye as b,
  I as c,
  Ze as d,
  Ge as e,
  S as f,
  E as g,
  Me as h,
  Ce as i,
  Ve as j,
  g as k,
  Ke as l,
  k as m,
  B as n,
  ke as o,
  o as p,
  Xe as q,
  ze as r,
  je as s,
  N as t,
  qe as u,
  Ye as v,
  Ue as w
};
