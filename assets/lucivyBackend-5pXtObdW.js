import { _ as s, __tla as __tla_0 } from "./vendor-md-editor-CyUZNHY0.js";
import { f1 as y, f2 as m, __tla as __tla_1 } from "./index-DZXxTXv9.js";
import { __tla as __tla_2 } from "./vendor-react-SY5QCjFA.js";
import "./vendor-aws-BNw5jQBi.js";
import "./vendor-lucide-CLhpI-Mc.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-radix--fTcLYkF.js";
import "./vendor-zip-Bez6qchM.js";
let f, l, H, V, v, U, g, k, O, P, E, D, C, x, c, j;
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
  l = "/s3haim-advanced-search";
  f = [
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
  let u = null, a = null, e = null;
  function p() {
    const t = "/DocuHaim/".replace(/\/?$/, "/");
    return new URL(`${t}lucivy/js/lucivy-worker.js`, window.location.origin).href;
  }
  async function w() {
    return u || (u = await s(() => import("./lucivy-CvOwlpn0.js"), []), u);
  }
  g = function() {
    return e != null;
  };
  v = async function() {
    if (!y()) throw new Error(m() || "Search isolation unavailable");
    if (a) return a;
    const t = await w();
    return a = new t.Lucivy(p()), await a.ready, a;
  };
  x = async function(t) {
    const n = await v();
    if (e) {
      try {
        await e.close();
      } catch {
      }
      e = null;
    }
    if (t && t.byteLength > 0) return e = await n.importSnapshot(t, l), e;
    try {
      return e = await n.open(l), e;
    } catch {
      return e = await n.create(l, [
        ...f
      ], ""), e;
    }
  };
  U = function() {
    return e;
  };
  c = async function() {
    return e || x(null);
  };
  function d(t) {
    const n = {
      title: t.title,
      body: t.body,
      path: t.path,
      kind: t.kind
    };
    return t.dateStr && (n.dateStr = t.dateStr), n;
  }
  k = async function(t, n) {
    await (await c()).add(t, d(n));
  };
  C = async function(t, n) {
    await (await c()).update(t, d(n));
  };
  E = async function(t) {
    await (await c()).remove(t);
  };
  O = async function() {
    await (await c()).commit();
  };
  P = async function() {
    const n = await (await c()).exportSnapshot();
    return n instanceof Uint8Array ? n : new Uint8Array(n);
  };
  D = async function(t, n = {}) {
    const i = await (await c()).search(t, {
      limit: n.limit ?? 50,
      fields: n.fields ?? false
    });
    return Array.isArray(i) ? i.map((o) => ({
      docId: Number(o.docId) || 0,
      score: Number(o.score) || 0,
      ...o.fields ? {
        fields: o.fields
      } : {}
    })) : [];
  };
  H = function(t, n) {
    const r = n.map((i) => String(i || "").trim()).filter((i) => i.length >= 1);
    return r.length === 0 ? null : r.length === 1 ? {
      type: "contains",
      field: t,
      value: r[0]
    } : {
      type: "boolean",
      must: r.map((i) => ({
        type: "contains",
        field: t,
        value: i
      }))
    };
  };
  V = async function() {
    if (e) {
      try {
        await e.destroy();
      } catch {
      }
      e = null;
    }
  };
  j = function() {
    if (e = null, a) {
      try {
        a.terminate();
      } catch {
      }
      a = null;
    }
  };
});
export {
  f as LUCIVY_FIELDS,
  l as LUCIVY_OPFS_PATH,
  __tla,
  H as buildContainsAndQuery,
  V as destroyLucivyIndex,
  v as ensureLucivyRuntime,
  U as getLucivyIndex,
  g as isLucivyOpen,
  k as lucivyAdd,
  O as lucivyCommit,
  P as lucivyExportSnapshot,
  E as lucivyRemove,
  D as lucivySearch,
  C as lucivyUpdate,
  x as openOrCreateLucivyIndex,
  c as requireLucivyIndex,
  j as terminateLucivyRuntime
};
