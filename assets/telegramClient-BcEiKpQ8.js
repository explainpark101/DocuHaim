const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-C8CrLveq.js","assets/core-BUhCcD2K.js","assets/vendor-telegram-ClJrgoUy.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-buffer-CTvp1cCp.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { cS as te, cT as ne, cU as re, cV as x, cW as se, cX as ie, cY as H, __tla as __tla_0 } from "./index-BE2IsW3s.js";
import { f as N, __tla as __tla_1 } from "./bootSplash-CNqesnab.js";
import { invoke as U } from "./core-BUhCcD2K.js";
import { b as k } from "./vendor-buffer-CTvp1cCp.js";
let de, y, pe, w, Ge, Ve, p, E, Z, Le, Pe, Fe, C, Me, De, a, $e, qe, ke, je, We, L, Ue;
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
  function oe(e) {
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
  L = async function() {
    return oe(await te());
  };
  async function P(e) {
    await ne(JSON.stringify({
      apiId: e.apiId,
      apiHash: e.apiHash,
      session: e.session
    }));
  }
  async function ae() {
    await re();
  }
  const X = {
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
  let _ = X;
  const A = /* @__PURE__ */ new Set();
  let u = null;
  function Y() {
    for (const e of A) try {
      e();
    } catch {
    }
  }
  p = function() {
    return _;
  };
  ke = function(e) {
    return A.add(e), () => {
      A.delete(e);
    };
  };
  a = function(e) {
    _ = {
      ..._,
      ...e
    }, Y();
  };
  function le() {
    u && (u.reject(new Error("Telegram login cancelled")), u = null), _ = X, Y();
  }
  function ce(e) {
    return e === "phone" ? "need-phone" : e === "code" ? "need-code" : e === "name" ? "need-name" : "need-password";
  }
  function S(e, t) {
    return u && (u.reject(new Error("Telegram login superseded")), u = null), a({
      status: ce(e),
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
  Ve = function() {
    const e = u;
    if (!e || e.kind !== "code") return;
    u = null;
    const t = new Error("RESTART_AUTH");
    t.errorMessage = "RESTART_AUTH", a({
      status: "connecting",
      error: null,
      codeViaApp: false,
      loginHint: "\uBB38\uC790\uB85C \uC778\uC99D \uCF54\uB4DC\uB97C \uB2E4\uC2DC \uC694\uCCAD\uD569\uB2C8\uB2E4."
    }), e.reject(t);
  };
  We = function(e) {
    const t = u;
    t && (u = null, a({
      status: "connecting",
      error: null
    }), t.resolve(e.trim()));
  };
  function ue() {
    const e = u;
    u = null, e && e.reject(new Error("Telegram login cancelled"));
  }
  let z = null;
  const M = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Map();
  y = function() {
    return z;
  };
  function O(e) {
    z = e;
  }
  function fe(e, t) {
    !e || t == null || M.set(e, t);
  }
  de = function(e) {
    return M.get(e);
  };
  function me(e, t, n) {
    D.set(`${e}:${t}`, n);
  }
  function J(e, t) {
    return D.get(`${e}:${t}`);
  }
  function ge() {
    M.clear(), D.clear();
  }
  const V = 40;
  function v(e) {
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
  C = function(e, t) {
    var _a, _b;
    const n = Number(t.id);
    if (!Number.isFinite(n)) return null;
    const r = t.sender, i = [
      r == null ? void 0 : r.firstName,
      r == null ? void 0 : r.lastName
    ].filter(Boolean).join(" ") || (r == null ? void 0 : r.title) || (r == null ? void 0 : r.username) || (t.out ? "\uB098" : ""), s = String(t.message || t.text || ""), o = String(((_a = t.file) == null ? void 0 : _a.name) || ""), c = {
      id: n,
      dialogId: e,
      text: s,
      date: Number(t.date) || 0,
      out: !!t.out,
      senderLabel: i,
      replyToId: ((_b = t.replyTo) == null ? void 0 : _b.replyToMsgId) ? Number(t.replyTo.replyToMsgId) : null,
      hasMedia: !!t.media,
      mediaName: o
    };
    return me(e, n, t), c;
  };
  function R() {
    const e = y();
    if (!e) throw new Error("Telegram is not connected");
    return e;
  }
  function I(e) {
    const t = de(e);
    if (!t) throw new Error("Chat not found");
    return t;
  }
  Fe = async function(e, t = false) {
    var _a;
    const n = R(), r = p(), i = t ? (_a = r.messages[0]) == null ? void 0 : _a.id : void 0;
    a({
      activeDialogId: e,
      messagesLoading: true,
      error: null,
      ...t ? {} : {
        messages: [],
        hasMoreHistory: false,
        replyTo: null
      }
    });
    let s;
    try {
      s = await n.getMessages(I(e), {
        limit: V,
        ...i ? {
          offsetId: i
        } : {}
      });
    } catch (l) {
      a({
        messagesLoading: false,
        error: l instanceof Error ? l.message : "\uBA54\uC2DC\uC9C0 \uAE30\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
      });
      return;
    }
    const o = s.map((l) => C(e, l)).filter((l) => l != null).sort((l, g) => l.id - g.id), c = t ? p().messages : [], f = [
      ...o.filter((l) => !c.some((g) => g.id === l.id)),
      ...c
    ].sort((l, g) => l.id - g.id);
    a({
      messages: f,
      messagesLoading: false,
      hasMoreHistory: o.length >= V,
      dialogs: p().dialogs.map((l) => l.id === e ? {
        ...l,
        unread: 0
      } : l)
    });
  };
  $e = async function(e, t, n) {
    const r = R(), i = t.trim();
    if (!i) return;
    const s = await r.sendMessage(I(e), {
      message: i,
      ...n ? {
        replyTo: n
      } : {}
    }), o = C(e, s);
    if (!o) return;
    const c = p();
    a({
      messages: [
        ...c.messages,
        o
      ],
      replyTo: null,
      dialogs: c.dialogs.map((f) => f.id === e ? {
        ...f,
        preview: o.text
      } : f)
    });
  };
  je = async function(e, t, n) {
    const r = R(), i = J(e, t);
    await r.forwardMessages(I(n), {
      messages: i ? [
        i
      ] : [
        t
      ],
      fromPeer: I(e)
    });
  };
  Ge = function(e) {
    if (!e) {
      a({
        replyTo: null
      });
      return;
    }
    const t = e.text || e.mediaName || "\uBBF8\uB514\uC5B4";
    a({
      replyTo: {
        id: e.id,
        snippet: t.slice(0, 80)
      }
    });
  };
  qe = function(e, t) {
    return J(e, t);
  };
  pe = async function() {
    var _a, _b;
    const e = y();
    if (!e) return [];
    const t = await e.getDialogs({
      limit: 100
    }), n = [];
    for (const r of t) {
      const i = v(r.id);
      if (!i) continue;
      r.entity && fe(i, r.entity);
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
    return a({
      dialogs: n
    }), n;
  };
  const W = "telegram-messages";
  function F(e, t = 140) {
    const n = e.replace(/\s+/g, " ").trim();
    return n.length <= t ? n : `${n.slice(0, t - 1)}\u2026`;
  }
  function he() {
    if (typeof document > "u" || document.visibilityState !== "visible") return false;
    const e = window.location.pathname || "/", t = window.location.hash.startsWith("#") ? window.location.hash.slice(1).split("?")[0] || "/" : "";
    return x(e) || (t ? x(t) : false);
  }
  async function ye(e, t) {
    const n = F(e, 80) || "Telegram", r = F(t, 180) || "\uC0C8 \uBA54\uC2DC\uC9C0";
    if (he() || se({
      id: `telegram-incoming-${Date.now()}`,
      type: ie.TELEGRAM_SYNC,
      label: n,
      detail: r,
      status: "done"
    }), typeof document < "u" && !document.hidden && !N()) return;
    if (N()) {
      try {
        const s = await d(() => import("./index-C8CrLveq.js"), __vite__mapDeps([0,1]));
        let o = await s.isPermissionGranted();
        if (o || (o = await s.requestPermission() === "granted"), !o) return;
        await s.createChannel({
          id: W,
          name: "Telegram",
          importance: s.Importance.Default
        }), s.sendNotification({
          title: n,
          body: r,
          channelId: W
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
  function Te(e, t, n, r) {
    const i = e.map((o) => {
      if (o.id !== r.dialogId) return o;
      const c = t === r.dialogId && document.visibilityState === "visible";
      return {
        ...o,
        preview: r.text || r.mediaName || o.preview,
        unread: c || r.out ? o.unread : o.unread + 1
      };
    }), s = t === r.dialogId ? n.some((o) => o.id === r.id) ? n : [
      ...n,
      r
    ] : n;
    a({
      dialogs: i,
      messages: s
    });
  }
  async function we(e) {
    await U("telegram_portal_send_code", {
      phone: e,
      platform: N() ? "android" : "desktop"
    });
  }
  async function Se(e) {
    return U("telegram_portal_confirm_code", {
      code: e
    });
  }
  const _e = 2147483647;
  function Ie(e) {
    const t = e.apiId.trim();
    if (!/^\d+$/.test(t)) return {
      ok: false,
      error: "API ID\uB294 \uC22B\uC790\uC785\uB2C8\uB2E4."
    };
    const n = Number(t);
    if (!Number.isSafeInteger(n) || n <= 0 || n > _e) return {
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
  const b = globalThis;
  Z = function() {
    return typeof b.Buffer > "u" && (b.Buffer = k.Buffer), b.Buffer ?? k.Buffer;
  };
  Z();
  let T = null, h = "", $ = false, m = null;
  function B(e, t) {
    return typeof e == "string" && e.trim() ? e.trim() : e instanceof Error && e.message.trim() ? e.message.trim() : t;
  }
  function Ee(e) {
    const t = e, n = t.errorMessage || "";
    return n === "PHONE_CODE_INVALID" ? "\uC778\uC99D \uCF54\uB4DC\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." : n === "PHONE_CODE_EXPIRED" ? "\uC778\uC99D \uCF54\uB4DC\uAC00 \uB9CC\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC804\uD654\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD558\uC138\uC694." : n === "PHONE_NUMBER_INVALID" ? "\uC804\uD654\uBC88\uD638\uB294 \uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD574 \uC785\uB825\uD558\uC138\uC694. \uC608: +821012345678" : n === "PHONE_NUMBER_BANNED" || n === "PHONE_NUMBER_FLOOD" ? "\uC774 \uBC88\uD638\uB85C\uB294 \uC9C0\uAE08 \uB85C\uADF8\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : n === "PASSWORD_HASH_INVALID" ? "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." : n.startsWith("FLOOD_WAIT") ? "\uC694\uCCAD\uC774 \uB9CE\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." : t.message === "Code is empty" || t.message === "Password is empty" ? "\uAC12\uC744 \uC785\uB825\uD558\uC138\uC694." : t.message === "First name is required" ? "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694." : "";
  }
  const j = 180;
  function G(e) {
    const t = e.trim();
    return t.length <= j ? t : `${t.slice(0, j - 1)}\u2026`;
  }
  function q(e) {
    var _a;
    const t = e instanceof Error ? e.message : "Telegram connection failed", r = (_a = t.match(/Module "([^"]+)" has been externalized/)) == null ? void 0 : _a[1];
    return r ? G(`\uC774 \uD658\uACBD\uC5D0\uC11C Node \uBAA8\uB4C8 "${r}"\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.`) : t.trim() ? G(t) : "Telegram connection failed";
  }
  function be() {
    var _a;
    if (typeof WebSocket > "u" || !((_a = globalThis.crypto) == null ? void 0 : _a.subtle)) throw new Error("\uC774 \uD658\uACBD\uC5D0\uC11C\uB294 Telegram \uC5F0\uACB0\uC5D0 \uD544\uC694\uD55C WebCrypto \uB610\uB294 WebSocket\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  }
  function Ne() {
    $ || typeof document > "u" || ($ = true, document.addEventListener("visibilitychange", () => {
      document.visibilityState === "visible" && K();
    }));
  }
  async function Ae() {
    be(), Z();
    const [e, t, n, r, i] = await Promise.all([
      d(() => import("./vendor-telegram-ClJrgoUy.js").then((s) => s.i), __vite__mapDeps([2,3,4,5])),
      d(() => import("./vendor-telegram-ClJrgoUy.js").then((s) => s.a), __vite__mapDeps([2,3,4,5])),
      d(() => import("./vendor-telegram-ClJrgoUy.js").then((s) => s.b), __vite__mapDeps([2,3,4,5])),
      d(() => import("./vendor-telegram-ClJrgoUy.js").then((s) => s.L), __vite__mapDeps([2,3,4,5])),
      d(() => import("./vendor-telegram-ClJrgoUy.js").then((s) => s.c), __vite__mapDeps([2,3,4,5]))
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
  async function ve(e) {
    const t = await Ae(), n = new t.TelegramClient(new t.StringSession(e.session || ""), e.apiId, e.apiHash, {
      connectionRetries: 5,
      useWSS: true,
      networkSocket: t.PromisedWebSockets,
      autoReconnect: true,
      deviceModel: "DocuHaim",
      systemVersion: "Tauri",
      appVersion: "2.4.0",
      baseLogger: new t.Logger(t.LogLevel.NONE)
    });
    O(n), await n.start({
      phoneNumber: async () => h || S("phone", "\uAD6D\uAC00 \uCF54\uB4DC\uB97C \uD3EC\uD568\uD55C \uC804\uD654\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. \uD655\uC778\uC774 \uB05D\uB098\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4."),
      phoneCode: async (s) => (a({
        codeViaApp: !!s
      }), S("code", s ? "\uC774 \uAE30\uAE30\uC5D0 \uB85C\uADF8\uC778\uD560 \uCF54\uB4DC\uAC00 \uB2E4\uB978 Telegram \uC571\uC73C\uB85C \uC804\uB2EC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uADF8 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uAC70\uB098 \uBB38\uC790\uB85C \uB2E4\uC2DC \uBC1B\uC73C\uC138\uC694." : "\uC774 \uAE30\uAE30\uC5D0 \uB85C\uADF8\uC778\uD560 \uCF54\uB4DC\uAC00 \uBB38\uC790 \uB610\uB294 \uC804\uD654\uB85C \uC804\uB2EC\uB429\uB2C8\uB2E4. \uC785\uB825\uD558\uBA74 \uC138\uC158\uC774 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4.")),
      password: async (s) => S("password", s ? `2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. \uD78C\uD2B8: ${s}` : "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694."),
      firstAndLastNames: async () => {
        const s = await S("name", "\uC0C8 \uACC4\uC815\uC785\uB2C8\uB2E4. \uC774\uB984\uC744 \uC785\uB825\uD558\uBA74 \uC774 \uC571\uC5D0\uC11C \uAC00\uC785\uC774 \uB05D\uB0A9\uB2C8\uB2E4."), [o = "", c = ""] = s.split(`
`);
        return [
          o.trim(),
          c.trim()
        ];
      },
      forceSMS: true,
      onError: async (s) => {
        const o = Ee(s);
        return o && a({
          error: o
        }), false;
      }
    });
    const r = String(n.session.save());
    await P({
      apiId: e.apiId,
      apiHash: e.apiHash,
      session: r
    });
    let i = "";
    try {
      const o = await n.getMe();
      i = o.firstName || o.username || "";
    } catch {
      i = "";
    }
    m && n.removeEventHandler(m, new t.NewMessage({})), m = (s) => {
      var _a;
      const o = s.message;
      if (!o) return;
      const c = v(o.chatId) || v(o.peerId);
      if (!c) return;
      const f = C(c, o);
      if (!f) return;
      const l = p();
      if (Te(l.dialogs, l.activeDialogId, l.messages, f), f.out) return;
      const Q = ((_a = l.dialogs.find((ee) => ee.id === c)) == null ? void 0 : _a.title) || "Telegram";
      ye(Q, f.text || f.mediaName || "\uC0C8 \uBA54\uC2DC\uC9C0");
    }, n.addEventHandler(m, new t.NewMessage({})), h = "", a({
      status: "ready",
      error: null,
      loginStep: null,
      selfName: i
    }), await pe();
  }
  async function He() {
    var _a;
    !H() || !((_a = await L()) == null ? void 0 : _a.session) || await w();
  }
  w = async function() {
    if (!H()) {
      a({
        status: "error",
        error: "\uB370\uC2A4\uD06C\uD1B1 \uB610\uB294 Android \uC571\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
      });
      return;
    }
    if (!(y() && p().status === "ready")) return T || (T = (async () => {
      Ne(), a({
        status: "connecting",
        error: null
      });
      const e = await L();
      if (!e) {
        a({
          status: "need-phone",
          loginStep: "portal-phone",
          error: null,
          loginHint: "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. Telegram \uC11C\uBC84\uAC00 \uD655\uC778\uD558\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC790\uB3D9\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4."
        });
        return;
      }
      try {
        await ve(e);
      } catch (t) {
        if (q(t) === "Telegram login cancelled") {
          a({
            status: "need-phone",
            loginStep: "portal-phone",
            error: null,
            loginHint: "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694. Telegram \uC11C\uBC84\uAC00 \uD655\uC778\uD558\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC790\uB3D9\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4."
          });
          return;
        }
        O(null), a({
          status: "error",
          error: q(t)
        });
      }
    })().finally(() => {
      T = null;
    }), T);
  };
  Le = async function(e) {
    const t = Ie(e);
    if (!t.ok) {
      a({
        error: t.error
      });
      return;
    }
    a({
      status: "connecting",
      error: null,
      loginHint: "\uC785\uB825\uD55C \uC5F0\uACB0 \uC815\uBCF4\uB85C \uB85C\uADF8\uC778\uD569\uB2C8\uB2E4."
    });
    try {
      await P({
        apiId: t.value.apiId,
        apiHash: t.value.apiHash,
        session: ""
      }), h = t.value.phone, await E({
        keepSnapshot: true
      }), await w();
    } catch (n) {
      a({
        status: "need-phone",
        loginStep: "portal-phone",
        error: B(n, "\uC5F0\uACB0 \uC815\uBCF4\uB97C \uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.")
      });
    }
  };
  Pe = async function(e) {
    a({
      status: "connecting",
      error: null,
      loginHint: null
    });
    try {
      await we(e), a({
        status: "need-code",
        loginStep: "portal-code",
        codeViaApp: false,
        error: null,
        loginHint: "Telegram\uC774 \uBCF4\uB0B8 \uD655\uC778 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uC138\uC694. \uBC88\uD638\uAC00 \uD655\uC778\uB418\uBA74 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB418\uACE0, \uC774\uC5B4\uC11C \uB85C\uADF8\uC778 \uCF54\uB4DC\uB97C \uBC1B\uC2B5\uB2C8\uB2E4."
      });
    } catch (t) {
      a({
        status: "need-phone",
        loginStep: "portal-phone",
        error: B(t, "\uD655\uC778 \uCF54\uB4DC\uB97C \uC694\uCCAD\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.")
      });
    }
  };
  Me = async function(e) {
    a({
      status: "connecting",
      error: null,
      loginHint: "\uBC88\uD638\uB97C \uD655\uC778\uD558\uACE0 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uD558\uB294 \uC911\uC785\uB2C8\uB2E4."
    });
    try {
      const t = await Se(e);
      await P({
        apiId: t.apiId,
        apiHash: t.apiHash,
        session: ""
      }), h = t.phone, await E({
        keepSnapshot: true
      }), await w();
    } catch (t) {
      const n = B(t, "\uBC88\uD638\uB97C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), r = n.includes("\uD655\uC778 \uCF54\uB4DC\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4") || n.includes("\uD655\uC778 \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uC138\uC694");
      a(r ? {
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
  async function K() {
    var _a;
    if (!H()) return;
    const e = y();
    if (!e) {
      ((_a = await L()) == null ? void 0 : _a.session) && await w();
      return;
    }
    try {
      await e.connect();
    } catch {
    }
  }
  E = async function(e) {
    ue();
    const t = y();
    if (O(null), t && m) try {
      t.removeEventHandler(m, void 0);
    } catch {
    }
    if (m = null, t) try {
      await t.disconnect();
    } catch {
    }
    ge(), (e == null ? void 0 : e.keepSnapshot) || (h = "", le());
  };
  De = async function() {
    const e = y();
    if (e) try {
      const { Api: t } = await d(async () => {
        const { Api: n } = await import("./vendor-telegram-ClJrgoUy.js").then((r) => r.i);
        return {
          Api: n
        };
      }, __vite__mapDeps([2,3,4,5]));
      await e.invoke(new t.auth.LogOut());
    } catch {
    }
    await ae(), await E();
  };
  Ue = Object.freeze(Object.defineProperty({
    __proto__: null,
    beginTelegramApiLogin: Le,
    beginTelegramPhoneLogin: Pe,
    completeTelegramPortalLogin: Me,
    connectTelegram: w,
    connectTelegramInBackground: He,
    disconnectTelegram: E,
    logoutTelegram: De,
    reconnectTelegramIfNeeded: K
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  de as a,
  y as b,
  pe as c,
  w as d,
  Ge as e,
  Ve as f,
  p as g,
  E as h,
  Z as i,
  Le as j,
  Pe as k,
  Fe as l,
  C as m,
  Me as n,
  De as o,
  a as p,
  $e as q,
  qe as r,
  ke as s,
  je as t,
  We as u,
  L as v,
  Ue as w
};
