const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DPH8WKK6.js","assets/vendor-react-BFxggocB.js","assets/vendor-md-editor-B7IajafM.js","assets/vendor-aws-CXsSaYOG.js","assets/vendor-lucide-BiQHrkcf.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-b8oTnHK_.js","assets/vendor-radix-ACO_3onn.js","assets/vendor-google-genai-DGp6lEvQ.js","assets/index-BEgvMMcm.css","assets/event-BsVJwEL-.js"])))=>i.map(i=>d[i]);
import { _ as m, __tla as __tla_0 } from "./vendor-md-editor-B7IajafM.js";
import { V as k, W as R, X as U, __tla as __tla_1 } from "./index-DPH8WKK6.js";
import { __tla as __tla_2 } from "./vendor-react-BFxggocB.js";
import "./vendor-aws-CXsSaYOG.js";
import "./vendor-lucide-BiQHrkcf.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-ACO_3onn.js";
import "./vendor-google-genai-DGp6lEvQ.js";
let z, h, wt, yt, X, ot, rt, ct, vt, dt, ft, lt, pt, ut, st, L, p, mt;
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
  let u = null, w = null, y = null, b = null;
  async function l() {
    return m(() => import("./index-DPH8WKK6.js").then(async (m2) => {
      await m2.__tla;
      return m2;
    }).then((t) => t.jh), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]));
  }
  async function C() {
    return m(() => import("./event-BsVJwEL-.js"), __vite__mapDeps([10,0,1,2,3,4,5,6,7,8,9]));
  }
  function g() {
    return k();
  }
  function O() {
    return u != null;
  }
  function D(t) {
    b = t;
  }
  async function P() {
    if (w && y) return;
    const { listen: t } = await C();
    w || (w = await t("as-index-log", (n) => {
      b == null ? void 0 : b(n.payload.level, n.payload.message);
    })), y || (y = await t("as-index-progress", () => {
    }));
  }
  function A(t) {
    const n = {
      title: t.title,
      body: t.body,
      path: t.path,
      kind: t.kind
    };
    return t.dateStr && (n.dateStr = t.dateStr), n;
  }
  async function E(t) {
    if (await P(), u) try {
      await T();
    } catch {
    }
    const { invoke: n } = await l(), i = await n("as_index_open", {
      snapshot: t && t.byteLength > 0 ? t : null
    });
    return u = i, i;
  }
  async function f() {
    return u || E(null);
  }
  async function T() {
    if (!u) return;
    const t = u;
    u = null;
    const { invoke: n } = await l();
    await n("as_index_close", {
      sessionId: t
    });
  }
  async function V(t, n) {
    const i = await f(), { invoke: e } = await l();
    await e("as_index_upsert_batch", {
      sessionId: i,
      docs: [
        {
          numericId: t,
          fields: A(n)
        }
      ]
    });
  }
  async function j(t) {
    if (t.length === 0) return 0;
    const n = await f(), { invoke: i } = await l();
    return i("as_index_upsert_batch", {
      sessionId: n,
      docs: t.map((e) => ({
        numericId: e.numericId,
        fields: A(e.fields)
      }))
    });
  }
  async function B(t) {
    const n = await f(), { invoke: i } = await l();
    await i("as_index_remove", {
      sessionId: n,
      numericId: t
    });
  }
  async function N() {
    const t = await f(), { invoke: n } = await l();
    await n("as_index_commit", {
      sessionId: t
    });
  }
  async function M() {
    const t = await f(), { invoke: n } = await l(), i = await n("as_index_export_snapshot", {
      sessionId: t
    });
    return new Uint8Array(i);
  }
  async function H(t, n, i = 50) {
    const e = await f(), { invoke: a } = await l();
    return (await a("as_index_search", {
      sessionId: e,
      field: t,
      terms: n,
      limit: i
    }) || []).map((_) => ({
      docId: Number(_.docId) || 0,
      score: Number(_.score) || 0
    }));
  }
  async function $(t) {
    const n = t || u;
    if (!n) return;
    const { invoke: i } = await l();
    await i("as_index_cancel", {
      sessionId: n
    });
  }
  function F() {
    const t = u;
    if (u = null, w) {
      try {
        w();
      } catch {
      }
      w = null;
    }
    if (y) {
      try {
        y();
      } catch {
      }
      y = null;
    }
    t && (async () => {
      try {
        const { invoke: n } = await l();
        await n("as_index_close", {
          sessionId: t
        });
      } catch {
      }
    })();
  }
  let Y;
  Y = Object.freeze(Object.defineProperty({
    __proto__: null,
    closeTauriIndexSession: T,
    isTauriIndexBackendAvailable: g,
    isTauriIndexOpen: O,
    openTauriIndexSession: E,
    requireTauriSessionId: f,
    setTauriIndexLogListener: D,
    tauriCancelIndex: $,
    tauriCommit: N,
    tauriExportSnapshot: M,
    tauriRemove: B,
    tauriSearchContainsAnd: H,
    tauriUpsertBatch: j,
    tauriUpsertDoc: V,
    terminateTauriIndexRuntime: F
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  h = "/s3haim-advanced-search";
  z = [
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
  let x = null, d = null, r = null, v = false;
  function o() {
    return g();
  }
  function Q() {
    const t = "/DocuHaim/".replace(/\/?$/, "/");
    return new URL(`${t}lucivy/js/lucivy-worker.js`, window.location.origin).href;
  }
  async function W() {
    return x || (x = await m(() => import("./lucivy-CvOwlpn0.js"), []), x);
  }
  async function s() {
    return m(() => Promise.resolve().then(() => Y), void 0);
  }
  rt = function() {
    return o() ? v : r != null;
  };
  X = async function() {
    if (o()) return null;
    if (!R()) throw new Error(U() || "Search isolation unavailable");
    if (d) return d;
    const t = await W();
    return d = new t.Lucivy(Q()), await d.ready, d;
  };
  L = async function(t) {
    if (o()) return await (await s()).openTauriIndexSession(t), v = true, r = null, null;
    const n = await X();
    if (!n) throw new Error("Lucivy runtime unavailable");
    if (r) {
      try {
        await r.close();
      } catch {
      }
      r = null;
    }
    if (t && t.byteLength > 0) return r = await n.importSnapshot(t, h), r;
    try {
      return r = await n.open(h), r;
    } catch {
      return r = await n.create(h, [
        ...z
      ], ""), r;
    }
  };
  ot = function() {
    return r;
  };
  p = async function() {
    return o() ? (v || await L(null), null) : r || L(null);
  };
  function I(t) {
    const n = {
      title: t.title,
      body: t.body,
      path: t.path,
      kind: t.kind
    };
    return t.dateStr && (n.dateStr = t.dateStr), n;
  }
  ct = async function(t, n) {
    if (o()) {
      await (await s()).tauriUpsertDoc(t, n);
      return;
    }
    const i = await p();
    if (!i) throw new Error("Lucivy index not open");
    await i.add(t, I(n));
  };
  ut = async function(t, n) {
    if (o()) {
      await (await s()).tauriUpsertDoc(t, n);
      return;
    }
    const i = await p();
    if (!i) throw new Error("Lucivy index not open");
    await i.update(t, I(n));
  };
  st = async function(t) {
    if (t.length === 0) return;
    if (o()) {
      await (await s()).tauriUpsertBatch(t.map((c) => ({
        numericId: c.numericId,
        fields: c.fields
      })));
      return;
    }
    const n = await p();
    if (!n) throw new Error("Lucivy index not open");
    const { yieldToMain: i } = await m(async () => {
      const { yieldToMain: a } = await import("./index-DPH8WKK6.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      }).then((c) => c.ji);
      return {
        yieldToMain: a
      };
    }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]));
    let e = 0;
    for (const a of t) {
      const c = I(a.fields);
      a.update ? await n.update(a.numericId, c) : await n.add(a.numericId, c), e += 1, e % 16 === 0 && await i();
    }
  };
  lt = async function(t) {
    if (o()) {
      await (await s()).tauriRemove(t);
      return;
    }
    const n = await p();
    if (!n) throw new Error("Lucivy index not open");
    await n.remove(t);
  };
  dt = async function() {
    if (o()) {
      await (await s()).tauriCommit();
      return;
    }
    const t = await p();
    if (!t) throw new Error("Lucivy index not open");
    await t.commit();
  };
  ft = async function() {
    if (o()) return (await s()).tauriExportSnapshot();
    const t = await p();
    if (!t) throw new Error("Lucivy index not open");
    const n = await t.exportSnapshot();
    return n instanceof Uint8Array ? n : new Uint8Array(n);
  };
  function G(t) {
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
        const c = a;
        if (String(c.type || "") !== "contains") continue;
        const _ = String(c.field || ""), S = String(c.value || "").trim();
        S && (e || (e = _), i.push(S));
      }
      if (e && i.length > 0) return {
        field: e,
        terms: i
      };
    }
    return null;
  }
  pt = async function(t, n = {}) {
    if (o()) {
      const a = G(t);
      return a ? (await s()).tauriSearchContainsAnd(a.field, a.terms, n.limit ?? 50) : [];
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
  wt = function(t, n) {
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
  yt = async function() {
    if (o()) {
      await (await s()).closeTauriIndexSession(), v = false;
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
  mt = function() {
    if (o()) {
      s().then((t) => {
        t.terminateTauriIndexRuntime();
      }), v = false;
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
  vt = async function() {
    if (!o()) return;
    await (await s()).tauriCancelIndex();
  };
});
export {
  z as LUCIVY_FIELDS,
  h as LUCIVY_OPFS_PATH,
  __tla,
  wt as buildContainsAndQuery,
  yt as destroyLucivyIndex,
  X as ensureLucivyRuntime,
  ot as getLucivyIndex,
  rt as isLucivyOpen,
  ct as lucivyAdd,
  vt as lucivyCancelNative,
  dt as lucivyCommit,
  ft as lucivyExportSnapshot,
  lt as lucivyRemove,
  pt as lucivySearch,
  ut as lucivyUpdate,
  st as lucivyUpsertBatch,
  L as openOrCreateLucivyIndex,
  p as requireLucivyIndex,
  mt as terminateLucivyRuntime
};
