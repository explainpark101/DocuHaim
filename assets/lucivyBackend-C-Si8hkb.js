const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-B8fyV1rt.js","assets/vendor-react-BFxggocB.js","assets/vendor-md-editor-DBPLPxUW.js","assets/vendor-aws-DPoimvIa.js","assets/vendor-lucide-CQHxb_M7.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-b8oTnHK_.js","assets/vendor-radix-OEelIWXf.js","assets/vendor-google-genai-DGp6lEvQ.js","assets/index-BIsq3aT0.css","assets/event-De6yq84e.js"])))=>i.map(i=>d[i]);
import { _ as h, __tla as __tla_0 } from "./vendor-md-editor-DBPLPxUW.js";
import { $ as U, a0 as C, a1 as D, __tla as __tla_1 } from "./index-B8fyV1rt.js";
import { __tla as __tla_2 } from "./vendor-react-BFxggocB.js";
import "./vendor-aws-DPoimvIa.js";
import "./vendor-lucide-CQHxb_M7.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-OEelIWXf.js";
import "./vendor-google-genai-DGp6lEvQ.js";
let W, L, xt, It, q, ft, dt, lt, wt, Lt, vt, _t, mt, ht, pt, yt, A, p, St;
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  let c = null, _ = false, y = null, m = null, E = null;
  async function s() {
    return h(() => import("./index-B8fyV1rt.js").then(async (m2) => {
      await m2.__tla;
      return m2;
    }).then((t) => t.j7), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]));
  }
  async function O() {
    return h(() => import("./event-De6yq84e.js"), __vite__mapDeps([10,0,1,2,3,4,5,6,7,8,9]));
  }
  function k() {
    return U();
  }
  function F() {
    return c != null;
  }
  function B() {
    return _;
  }
  function j(t) {
    E = t;
  }
  async function b() {
    if (y && m) return;
    const { listen: t } = await O();
    y || (y = await t("as-index-log", (n) => {
      E == null ? void 0 : E(n.payload.level, n.payload.message);
    })), m || (m = await t("as-index-progress", () => {
    }));
  }
  function P(t) {
    const n = {
      title: t.title,
      body: t.body,
      path: t.path,
      kind: t.kind
    };
    return t.dateStr && (n.dateStr = t.dateStr), n;
  }
  async function R(t) {
    if (await b(), c) try {
      await S();
    } catch {
    }
    const { invoke: n } = await s(), i = await n("as_index_open", {
      snapshot: t && t.byteLength > 0 ? t : null
    });
    return c = i, _ = false, i;
  }
  async function N(t, n = true) {
    if (await b(), c) try {
      await S();
    } catch {
    }
    const { invoke: i } = await s(), e = await i("as_index_open_from_directory", {
      dirPath: t,
      inPlace: n
    });
    return c = e, _ = !!n, e;
  }
  async function V(t) {
    if (await b(), c) try {
      await S();
    } catch {
    }
    const { invoke: n } = await s(), i = await n("as_index_open_from_file", {
      snapshotPath: t
    });
    return c = i, _ = false, i;
  }
  async function w() {
    return c || R(null);
  }
  async function S() {
    if (!c) return;
    const t = c;
    c = null, _ = false;
    const { invoke: n } = await s();
    await n("as_index_close", {
      sessionId: t
    });
  }
  async function M(t, n) {
    const i = await w(), { invoke: e } = await s();
    await e("as_index_upsert_batch", {
      sessionId: i,
      docs: [
        {
          numericId: t,
          fields: P(n)
        }
      ]
    });
  }
  async function $(t) {
    if (t.length === 0) return 0;
    const n = await w(), { invoke: i } = await s();
    return i("as_index_upsert_batch", {
      sessionId: n,
      docs: t.map((e) => ({
        numericId: e.numericId,
        fields: P(e.fields)
      }))
    });
  }
  async function H(t) {
    const n = await w(), { invoke: i } = await s();
    await i("as_index_remove", {
      sessionId: n,
      numericId: t
    });
  }
  async function Y() {
    const t = await w(), { invoke: n } = await s();
    await n("as_index_commit", {
      sessionId: t
    });
  }
  async function z() {
    const t = await w(), { invoke: n } = await s(), i = await n("as_index_export_snapshot", {
      sessionId: t
    });
    return new Uint8Array(i);
  }
  async function Q(t, n, i = 50) {
    const e = await w(), { invoke: a } = await s();
    return (await a("as_index_search", {
      sessionId: e,
      field: t,
      terms: n,
      limit: i
    }) || []).map((x) => ({
      docId: Number(x.docId) || 0,
      score: Number(x.score) || 0
    }));
  }
  async function G(t) {
    const n = t || c;
    if (!n) return;
    const { invoke: i } = await s();
    await i("as_index_cancel", {
      sessionId: n
    });
  }
  function J() {
    const t = c;
    if (c = null, _ = false, y) {
      try {
        y();
      } catch {
      }
      y = null;
    }
    if (m) {
      try {
        m();
      } catch {
      }
      m = null;
    }
    t && (async () => {
      try {
        const { invoke: n } = await s();
        await n("as_index_close", {
          sessionId: t
        });
      } catch {
      }
    })();
  }
  let K;
  K = Object.freeze(Object.defineProperty({
    __proto__: null,
    closeTauriIndexSession: S,
    isTauriIndexBackendAvailable: k,
    isTauriIndexInPlace: B,
    isTauriIndexOpen: F,
    openTauriIndexFromDirectory: N,
    openTauriIndexFromSnapshotFile: V,
    openTauriIndexSession: R,
    requireTauriSessionId: w,
    setTauriIndexLogListener: j,
    tauriCancelIndex: G,
    tauriCommit: Y,
    tauriExportSnapshot: z,
    tauriRemove: H,
    tauriSearchContainsAnd: Q,
    tauriUpsertBatch: $,
    tauriUpsertDoc: M,
    terminateTauriIndexRuntime: J
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  L = "/s3haim-advanced-search";
  W = [
    {
      name: "title",
      type: "text"
    },
    {
      name: "body",
      type: "text"
    },
    {
      name: "path",
      type: "text"
    },
    {
      name: "kind",
      type: "text"
    },
    {
      name: "dateStr",
      type: "text"
    }
  ];
  let I = null, d = null, r = null, f = false, v = false;
  function u() {
    return k();
  }
  function X() {
    const t = "/DocuHaim/".replace(/\/?$/, "/");
    return new URL(`${t}lucivy/js/lucivy-worker.js`, window.location.origin).href;
  }
  async function Z() {
    return I || (I = await h(() => import("./lucivy-CvOwlpn0.js"), []), I);
  }
  async function l() {
    return h(() => Promise.resolve().then(() => K), void 0);
  }
  lt = function() {
    return u() ? f : r != null;
  };
  dt = function() {
    return u() && v;
  };
  q = async function() {
    if (u()) return null;
    if (!C()) throw new Error(D() || "Search isolation unavailable");
    if (d) return d;
    const t = await Z();
    return d = new t.Lucivy(X()), await d.ready, d;
  };
  A = async function(t, n) {
    var _a, _b;
    if (u()) {
      const e = await l(), a = (_a = n == null ? void 0 : n.indexDirectoryPath) == null ? void 0 : _a.trim();
      if (a) return await e.openTauriIndexFromDirectory(a, (n == null ? void 0 : n.inPlace) ?? true), f = true, v = !!((n == null ? void 0 : n.inPlace) ?? true), r = null, null;
      const o = (_b = n == null ? void 0 : n.snapshotFilePath) == null ? void 0 : _b.trim();
      return o ? (await e.openTauriIndexFromSnapshotFile(o), f = true, v = false, r = null, null) : (await e.openTauriIndexSession(t), f = true, v = false, r = null, null);
    }
    const i = await q();
    if (!i) throw new Error("Lucivy runtime unavailable");
    if (r) {
      try {
        await r.close();
      } catch {
      }
      r = null;
    }
    if (t && t.byteLength > 0) return r = await i.importSnapshot(t, L), r;
    try {
      return r = await i.open(L), r;
    } catch {
      return r = await i.create(L, [
        ...W
      ], ""), r;
    }
  };
  ft = function() {
    return r;
  };
  p = async function() {
    return u() ? (f || await A(null), null) : r || A(null);
  };
  function g(t) {
    const n = {
      title: t.title,
      body: t.body,
      path: t.path,
      kind: t.kind
    };
    return t.dateStr && (n.dateStr = t.dateStr), n;
  }
  wt = async function(t, n) {
    if (u()) {
      await (await l()).tauriUpsertDoc(t, n);
      return;
    }
    const i = await p();
    if (!i) throw new Error("Lucivy index not open");
    await i.add(t, g(n));
  };
  pt = async function(t, n) {
    if (u()) {
      await (await l()).tauriUpsertDoc(t, n);
      return;
    }
    const i = await p();
    if (!i) throw new Error("Lucivy index not open");
    await i.update(t, g(n));
  };
  yt = async function(t) {
    if (t.length === 0) return;
    if (u()) {
      await (await l()).tauriUpsertBatch(t.map((o) => ({
        numericId: o.numericId,
        fields: o.fields
      })));
      return;
    }
    const n = await p();
    if (!n) throw new Error("Lucivy index not open");
    const { yieldToMain: i } = await h(async () => {
      const { yieldToMain: a } = await import("./index-B8fyV1rt.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      }).then((o) => o.j8);
      return {
        yieldToMain: a
      };
    }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]));
    let e = 0;
    for (const a of t) {
      const o = g(a.fields);
      a.update ? await n.update(a.numericId, o) : await n.add(a.numericId, o), e += 1, e % 16 === 0 && await i();
    }
  };
  mt = async function(t) {
    if (u()) {
      await (await l()).tauriRemove(t);
      return;
    }
    const n = await p();
    if (!n) throw new Error("Lucivy index not open");
    await n.remove(t);
  };
  vt = async function() {
    if (u()) {
      await (await l()).tauriCommit();
      return;
    }
    const t = await p();
    if (!t) throw new Error("Lucivy index not open");
    await t.commit();
  };
  _t = async function() {
    if (u()) return (await l()).tauriExportSnapshot();
    const t = await p();
    if (!t) throw new Error("Lucivy index not open");
    const n = await t.exportSnapshot();
    return n instanceof Uint8Array ? n : new Uint8Array(n);
  };
  function tt(t) {
    const n = String(t.type || "");
    if (n === "contains") {
      const i = String(t.field || ""), e = String(t.value || "").trim();
      return !i || !e ? null : {
        field: i,
        terms: [
          e
        ]
      };
    }
    if (n === "boolean" && Array.isArray(t.must)) {
      const i = [];
      let e = "";
      for (const a of t.must) {
        if (!a || typeof a != "object") continue;
        const o = a;
        if (String(o.type || "") !== "contains") continue;
        const x = String(o.field || ""), T = String(o.value || "").trim();
        T && (e || (e = x), i.push(T));
      }
      if (e && i.length > 0) return {
        field: e,
        terms: i
      };
    }
    return null;
  }
  ht = async function(t, n = {}) {
    if (u()) {
      const a = tt(t);
      return a ? (await l()).tauriSearchContainsAnd(a.field, a.terms, n.limit ?? 50) : [];
    }
    const i = await p();
    if (!i) return [];
    const e = await i.search(t, {
      limit: n.limit ?? 50,
      fields: n.fields ?? false
    });
    return Array.isArray(e) ? e.map((a) => ({
      docId: Number(a.docId) || 0,
      score: Number(a.score) || 0,
      ...a.fields ? {
        fields: a.fields
      } : {}
    })) : [];
  };
  xt = function(t, n) {
    const i = n.map((e) => String(e || "").trim()).filter((e) => e.length >= 1);
    return i.length === 0 ? null : i.length === 1 ? {
      type: "contains",
      field: t,
      value: i[0]
    } : {
      type: "boolean",
      must: i.map((e) => ({
        type: "contains",
        field: t,
        value: e
      }))
    };
  };
  It = async function() {
    if (u()) {
      await (await l()).closeTauriIndexSession(), f = false, v = false;
      return;
    }
    if (r) {
      try {
        await r.destroy();
      } catch {
      }
      r = null;
    }
  };
  St = function() {
    if (u()) {
      l().then((t) => {
        t.terminateTauriIndexRuntime();
      }), f = false, v = false;
      return;
    }
    if (r = null, d) {
      try {
        d.terminate();
      } catch {
      }
      d = null;
    }
  };
  Lt = async function() {
    if (!u()) return;
    await (await l()).tauriCancelIndex();
  };
});
export {
  W as LUCIVY_FIELDS,
  L as LUCIVY_OPFS_PATH,
  __tla,
  xt as buildContainsAndQuery,
  It as destroyLucivyIndex,
  q as ensureLucivyRuntime,
  ft as getLucivyIndex,
  dt as isLucivyNativeInPlace,
  lt as isLucivyOpen,
  wt as lucivyAdd,
  Lt as lucivyCancelNative,
  vt as lucivyCommit,
  _t as lucivyExportSnapshot,
  mt as lucivyRemove,
  ht as lucivySearch,
  pt as lucivyUpdate,
  yt as lucivyUpsertBatch,
  A as openOrCreateLucivyIndex,
  p as requireLucivyIndex,
  St as terminateLucivyRuntime
};
