const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BebLgvYF.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-lucide-B8TfEQX9.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-radix-CN5WtDh3.js","assets/index-DvXEXuwA.css","assets/index-D-iehpGj.js"])))=>i.map(i=>d[i]);
import { _ as E } from "./vendor-aws-hJDgVEKM.js";
import { X as r, __tla as __tla_0 } from "./index-BebLgvYF.js";
import { c as y, __tla as __tla_1 } from "./bootSplash-Z2krRgC9.js";
let W, G, q, I, v, Y, B;
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
  let g, c, O, d, w, R;
  g = "s3haim_open_with_app_cache_retention";
  c = {
    value: 3,
    unit: "month"
  };
  G = [
    {
      value: "hour",
      label: "\uC2DC\uAC04"
    },
    {
      value: "day",
      label: "\uC77C"
    },
    {
      value: "month",
      label: "\uC6D4"
    },
    {
      value: "year",
      label: "\uB144"
    }
  ];
  O = 3600 * 1e3;
  d = 24 * O;
  w = 30 * d;
  R = 365 * d;
  function M(t) {
    return t === "hour" || t === "day" || t === "month" || t === "year";
  }
  function A(t) {
    const n = t && typeof t == "object" ? t : null, a = M(n == null ? void 0 : n.unit) ? n.unit : c.unit, e = typeof (n == null ? void 0 : n.value) == "number" ? n.value : typeof (n == null ? void 0 : n.value) == "string" ? Number(n.value) : Number.NaN;
    return {
      value: Number.isFinite(e) && e > 0 ? e : c.value,
      unit: a
    };
  }
  I = function() {
    if (typeof window > "u") return {
      ...c
    };
    try {
      const t = window.localStorage.getItem(g);
      return t ? A(JSON.parse(t)) : {
        ...c
      };
    } catch {
      return {
        ...c
      };
    }
  };
  W = "s3haim-open-with-app-cache-retention";
  Y = function(t) {
    if (!(typeof window > "u")) try {
      const n = A(t);
      window.localStorage.setItem(g, JSON.stringify(n)), window.dispatchEvent(new CustomEvent(W, {
        detail: n
      }));
    } catch {
    }
  };
  function S(t) {
    const { value: n, unit: a } = A(t), e = Math.max(0, n);
    switch (a) {
      case "hour":
        return Math.round(e * O);
      case "day":
        return Math.round(e * d);
      case "month":
        return Math.round(e * w);
      case "year":
        return Math.round(e * R);
      default:
        return Math.round(e * w);
    }
  }
  q = function(t, n, a) {
    if (n === a) return t;
    const u = S({
      value: t,
      unit: n
    }) / (a === "hour" ? O : a === "day" ? d : a === "year" ? R : w), i = Math.round(u * 10) / 10;
    return i > 0 ? i : c.value;
  };
  const H = [
    "DocuHaim",
    "open-with-app"
  ];
  async function N() {
    return E(() => import("./index-BebLgvYF.js").then(async (m) => {
      await m.__tla;
      return m;
    }).then((t) => t.nI), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]));
  }
  async function F() {
    return E(() => import("./index-D-iehpGj.js"), __vite__mapDeps([11,0,1,2,3,4,5,6,7,8,9,10]));
  }
  async function D() {
    return E(() => import("./index-BebLgvYF.js").then(async (m) => {
      await m.__tla;
      return m;
    }).then((t) => t.nM), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]));
  }
  let h = null, p = null;
  async function T() {
    return h || (h = (async () => {
      const { join: t, tempDir: n } = await N(), { ensureTauriDir: a } = await D();
      let e = r(await n());
      for (const o of H) e = r(await t(e, o));
      return await a(e), e;
    })().catch((t) => {
      throw h = null, t;
    })), h;
  }
  function j(t) {
    const n = t.mtime ?? t.birthtime;
    if (n == null) return null;
    if (n instanceof Date) {
      const e = n.getTime();
      return Number.isFinite(e) ? e : null;
    }
    if (typeof n == "number" && Number.isFinite(n)) return n < 1e12 ? n * 1e3 : n;
    const a = new Date(String(n)).getTime();
    return Number.isFinite(a) ? a : null;
  }
  v = async function(t = Date.now()) {
    return y() ? p || (p = (async () => {
      const n = S(I());
      if (!(n > 0)) return 0;
      const { join: a } = await N(), { readDir: e, stat: o, remove: u } = await F(), i = await T(), l = await e(i);
      let s = 0;
      const f = t - n;
      for (const C of l) {
        const P = r(C.name || "");
        if (!P || C.isDirectory) continue;
        const _ = r(await a(i, P));
        try {
          const m = await o(_), b = j(m);
          if (b == null || b > f) continue;
          await u(_), s += 1;
        } catch (m) {
          console.warn("Failed to purge open-with-app cache entry:", _, m);
        }
      }
      return s;
    })().finally(() => {
      p = null;
    }), p) : 0;
  };
  async function L(t, n) {
    if (!y()) return {
      ok: false,
      savedName: r(String(n || "download"))
    };
    const { join: a } = await N(), { allocateUniqueTauriEntryName: e, writeBlobToTauriPath: o } = await D(), u = r(String(n || "download")), i = await T();
    v().catch((f) => {
      console.warn("Open-with-app cache purge failed:", f);
    });
    const l = await e(i, u), s = r(await a(i, l));
    return await o(s, t), {
      ok: true,
      savedPath: s,
      savedName: l
    };
  }
  function z() {
    y() && v().catch((t) => {
      console.warn("Open-with-app cache boot purge failed:", t);
    });
  }
  B = Object.freeze(Object.defineProperty({
    __proto__: null,
    initTauriOpenWithAppCacheCleanup: z,
    purgeExpiredOpenWithAppCache: v,
    resolveOpenWithAppCacheDir: T,
    writeBlobToOpenWithAppCache: L
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  W as O,
  __tla,
  G as a,
  q as c,
  I as l,
  v as p,
  Y as s,
  B as t
};
