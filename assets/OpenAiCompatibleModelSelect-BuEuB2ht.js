import { r as o, j as r, f as ve, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { G as Ee, A as Ne } from "./vendor-google-genai-BsvcYwA0.js";
import { cv as je, cw as Ae, b8 as Se, cn as Ie, cx as se, cl as Ce, cy as Ge, cz as Re, cA as _e, cp as Te, cB as Pe, cq as ne, cC as ae, cD as De, cE as Oe, cF as Ve, cG as Fe, cH as oe, cI as ie, k as Be, cm as Ue, __tla as __tla_1 } from "./index-BebLgvYF.js";
import { t as q, i as me, b as $e, s as Xe, d as ze, l as He } from "./openaiCompatibleClient-BOKYLH0M.js";
import { _ as qe } from "./vendor-aws-hJDgVEKM.js";
import { e as J, b as K, __tla as __tla_2 } from "./bootSplash-Z2krRgC9.js";
import { L as X, K as Y, D as Ke, C as We, H as Je, J as Qe } from "./vendor-lucide-B8TfEQX9.js";
import { r as T, L as W, l as Ze, w as ue, g as Ye } from "./localLlmModelAliases-EglLH-3U.js";
import { n as et, Q as tt, P as rt, C as st } from "./vendor-radix-CN5WtDh3.js";
let Vt, Ft, Bt, be, Ot, ee;
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
  const nt = /* @__PURE__ */ new Set([
    "gemini-2.0-flash-lite"
  ]);
  ee = function(e) {
    return nt.has(String(e || "").trim());
  };
  function fe(e) {
    const s = String(e || "").match(/retry in ([\d.]+)s/i);
    if (!s) return null;
    const n = Math.ceil(Number(s[1]));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  function at(e) {
    return /limit:\s*0/i.test(String(e || ""));
  }
  function ot({ status: e, detail: t, modelId: s }) {
    const n = s ? ` (${s})` : "", a = fe(t), i = at(t), l = s && ee(s);
    if (e === 429) {
      const c = [
        `\uC694\uCCAD \uD55C\uB3C4\uB97C \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4${n}.`
      ];
      return i || l ? c.push("", "\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uAC70\uB098 \uD560\uB2F9\uB7C9\uC774 0\uC785\uB2C8\uB2E4.", "Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash \uAC19\uC740 \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC720\uB8CC \uD50C\uB79C\xB7\uACB0\uC81C \uC815\uBCF4\uB294 Google AI Studio\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.") : c.push("", "\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098, \uB2E4\uB978 \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uBCF4\uC138\uC694.", "\uC0AC\uC6A9\uB7C9: https://ai.dev/rate-limit"), a && c.push("", `\uC57D ${a}\uCD08 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`), c.join(`
`);
    }
    return e === 403 ? `API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uAC70\uB098 \uC774 \uBAA8\uB378${n}\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.

${t}` : `Gemini API \uC624\uB958 (${e})${n}: ${t}`;
  }
  const pe = "https://generativelanguage.googleapis.com", H = "/api/gemini", it = "/v1beta", Z = typeof globalThis.fetch == "function" ? globalThis.fetch.bind(globalThis) : fetch;
  let le = false;
  function lt(e) {
    if (!(e.split("?")[0] ?? e).startsWith(`${it}/`)) throw new Error("Invalid Gemini API path.");
  }
  function dt(e) {
    const t = e instanceof Error ? e.message : String(e);
    return /failed to fetch|networkerror|load failed|cors/i.test(t) ? J() ? [
      "Gemini API\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      "",
      "\uB124\uD2B8\uC6CC\uD06C \uC5F0\uACB0\uC744 \uD655\uC778\uD558\uC138\uC694."
    ].join(`
`) : [
      "Gemini API\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      "",
      "Google AI Studio API \uD0A4\uC640 \uB124\uD2B8\uC6CC\uD06C \uC5F0\uACB0\uC744 \uD655\uC778\uD558\uC138\uC694.",
      "\uBE0C\uB77C\uC6B0\uC800 \uBCF4\uC548 \uC815\uCC45(CORS)\uC73C\uB85C \uCC28\uB2E8\uB41C \uACBD\uC6B0 Google API \uBB38\uC11C\uB97C \uD655\uC778\uD558\uC138\uC694."
    ].join(`
`) : t || "Gemini API \uB124\uD2B8\uC6CC\uD06C \uC624\uB958";
  }
  function ct(e) {
    return typeof e == "string" ? e : e instanceof URL ? e.href : e.url;
  }
  function mt(e, t) {
    var _a;
    if (!(e == null ? void 0 : e.headers)) return;
    const s = e.headers;
    if (s instanceof Headers) return s.get(t) ?? void 0;
    if (Array.isArray(s)) return (_a = s.find(([a]) => a.toLowerCase() === t.toLowerCase())) == null ? void 0 : _a[1];
    for (const [n, a] of Object.entries(s)) if (n.toLowerCase() === t.toLowerCase()) return a;
  }
  function ut(e) {
    var _a;
    try {
      const t = new URL(e, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost");
      return t.pathname === H || t.pathname.startsWith(`${H}/`);
    } catch {
      return e.startsWith(`${H}/`) || e.startsWith(`${H}?`);
    }
  }
  async function ft(e) {
    if (e == null ? void 0 : e.body) {
      if (typeof e.body == "string") return e.body;
      if (e.body instanceof Blob) return e.body.text();
    }
  }
  function pt() {
    var _a;
    const e = (_a = globalThis.location) == null ? void 0 : _a.origin;
    return typeof e == "string" && e.length > 0 ? e : "http://localhost";
  }
  function xt() {
    return J() ? `${pt()}${H}` : pe;
  }
  function ht() {
    le || !J() || (le = true, globalThis.fetch = Object.assign(async (e, t) => {
      var _a;
      const s = ct(e);
      if (!ut(s)) return Z(e, t);
      const n = new URL(s, ((_a = globalThis.location) == null ? void 0 : _a.origin) ?? "http://localhost"), a = `${n.pathname.replace(/^\/api\/gemini/, "")}${n.search}`, i = (t == null ? void 0 : t.method) ?? "GET", l = mt(t, "x-goog-api-key") ?? "", c = await ft(t);
      return bt(a, {
        method: i,
        apiKey: l,
        ...c ? {
          body: c
        } : {}
      });
    }, Z));
  }
  async function bt(e, t) {
    lt(e);
    const s = t.method ?? "GET";
    if (J()) {
      const { invoke: a } = await qe(async () => {
        const { invoke: c } = await import("./core-BUhCcD2K.js");
        return {
          invoke: c
        };
      }, []), i = await a("gemini_api_fetch", {
        path: e,
        method: s,
        apiKey: t.apiKey,
        body: t.body ?? null
      }), l = new Headers();
      return i.contentType && l.set("content-type", i.contentType), new Response(i.body, {
        status: i.status,
        headers: l
      });
    }
    const n = {
      "x-goog-api-key": t.apiKey
    };
    t.body && (n["Content-Type"] = "application/json");
    try {
      const a = {
        method: s,
        headers: n
      };
      return t.body && (a.body = t.body), await Z(`${pe}${e}`, a);
    } catch (a) {
      throw new Error(dt(a));
    }
  }
  const gt = 1;
  function yt(e) {
    return String(e || "").replace(/^models\//, "");
  }
  function xe(e) {
    return ht(), new Ee({
      apiKey: e,
      httpOptions: {
        baseUrl: xt()
      }
    });
  }
  function wt(e) {
    try {
      const t = JSON.parse(e.message);
      if (t && typeof t == "object") {
        const n = t.error;
        if (n && typeof n == "object") {
          const a = n.message;
          if (typeof a == "string" && a.trim()) return a;
        }
      }
    } catch {
    }
    return e.message;
  }
  function he(e, t) {
    if (e instanceof Ne) {
      const s = wt(e), n = new Error(ot({
        status: e.status,
        detail: s,
        modelId: t
      }));
      return n.status = e.status, n.retryAfterSec = fe(s), n;
    }
    return e instanceof Error ? e : new Error(String(e));
  }
  function Mt(e) {
    if ((e.supportedActions ?? []).includes("generateContent")) return true;
    const s = e.supportedGenerationMethods;
    return Array.isArray(s) && s.includes("generateContent");
  }
  async function Lt(e) {
    const t = xe(e), s = [], n = await t.models.list({
      config: {
        pageSize: 100
      }
    });
    for (; ; ) {
      for (const a of n.page) {
        if (!Mt(a)) continue;
        const i = yt(a.name);
        i && s.push({
          id: i,
          displayName: a.displayName || i
        });
      }
      if (!n.hasNextPage()) break;
      await n.nextPage();
    }
    return s.sort((a, i) => a.displayName.localeCompare(i.displayName, "ko"));
  }
  function kt({ instruction: e, selectedText: t, images: s }) {
    const n = Array.isArray(s) ? s : [], a = n.length > 0, i = n.map((l) => ({
      inlineData: {
        mimeType: l.mimeType,
        data: l.dataBase64
      }
    }));
    return i.push({
      text: $e({
        instruction: e,
        selectedText: t,
        hasImages: a
      })
    }), i;
  }
  async function vt(e, t, s, n = "", a = {}, i, l) {
    q(l);
    const c = xe(e), b = (n || "").trim(), u = ze(a), h = await c.models.generateContentStream({
      model: t,
      contents: [
        {
          role: "user",
          parts: s
        }
      ],
      config: {
        ...u,
        ...b ? {
          systemInstruction: b
        } : {},
        ...l ? {
          abortSignal: l
        } : {}
      }
    });
    let g = "";
    for await (const y of h) {
      q(l);
      const x = y.text;
      typeof x != "string" || !x || (g = Se(g, x), i == null ? void 0 : i(g));
    }
    q(l);
    const k = g.trim();
    if (!k) throw new Error("Gemini API\uAC00 \uBE48 \uC751\uB2F5\uC744 \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
    return k;
  }
  async function Et(e, t, s, n = "", a = {}, i, l) {
    let c = 0;
    for (; ; ) {
      q(l);
      let b = false;
      try {
        return await vt(e, t, s, n, a, (u) => {
          b = true, i == null ? void 0 : i(u);
        }, l);
      } catch (u) {
        if (me(u)) throw u;
        const h = he(u, t);
        if (!(!b && h.status === 429 && c < gt && h.retryAfterSec && h.retryAfterSec <= 120)) throw h;
        c += 1, await Xe((h.retryAfterSec ?? 1) * 1e3, l);
      }
    }
  }
  Ot = async function({ apiKey: e, model: t, instruction: s, systemPrompt: n, selectedText: a, images: i, requestOptions: l, onChunk: c, signal: b }) {
    const u = (t || je()).trim() || Ae, h = (s || "").trim(), g = (a || "").trim(), k = Array.isArray(i) ? i.filter((x) => (x == null ? void 0 : x.mimeType) && (x == null ? void 0 : x.dataBase64)) : [];
    if (!h) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
    q(b);
    const y = kt({
      instruction: h,
      selectedText: g,
      images: k
    });
    try {
      return await Et(e, u, y, (n || "").trim(), l || {}, c, b);
    } catch (x) {
      throw me(x) ? x : he(x, u);
    }
  };
  let Q = null, de = null, V = null;
  function Nt(e) {
    return ee(e.id) ? `${e.displayName} (\uBB34\uB8CC \uD50C\uB79C \uBBF8\uC9C0\uC6D0)` : e.displayName;
  }
  function $(e, t) {
    const s = /* @__PURE__ */ new Map();
    for (const n of e) s.set(n.id, n);
    return t && !s.has(t) && s.set(t, {
      id: t,
      displayName: t
    }), [
      ...s.values()
    ].sort((n, a) => n.displayName.localeCompare(a.displayName, "ko"));
  }
  Vt = function({ getGeminiApiKey: e, profileId: t = "gemini", value: s, onChange: n, autoLoad: a = false, className: i = "" }) {
    var _a;
    const l = o.useRef(e);
    l.current = e;
    const c = o.useRef(s);
    o.useEffect(() => {
      c.current = s;
    }, [
      s
    ]);
    const [b, u] = o.useState(() => $(se, s)), [h, g] = o.useState(false), [k, y] = o.useState(""), x = o.useCallback(async ({ force: m = false } = {}) => {
      var _a2;
      const M = l.current;
      if (typeof M != "function") {
        y("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const E = (_a2 = await Promise.resolve(M())) == null ? void 0 : _a2.trim();
      if (!E) {
        y("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
        return;
      }
      g(true), y("");
      try {
        if (!m && Q && de === E) {
          u($(Q, c.current));
          return;
        }
        if (V && V.key === E) {
          const G = await V.promise;
          u($(G, c.current));
          return;
        }
        const w = Ie(t, M, (G) => Lt(G));
        V = {
          key: E,
          promise: w
        };
        const N = await w;
        Q = N, de = E, u($(N, c.current));
      } catch (w) {
        y((w == null ? void 0 : w.message) || "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), u($(se, c.current));
      } finally {
        g(false), V && V.key === E && (V = null);
      }
    }, [
      t
    ]);
    o.useEffect(() => {
      u((m) => $(m, s));
    }, [
      s
    ]), o.useEffect(() => {
      a && x();
    }, [
      a,
      x
    ]);
    const S = (m) => {
      Ce(m), n == null ? void 0 : n(m);
    }, v = b.some((m) => m.id === s) ? s : ((_a = b[0]) == null ? void 0 : _a.id) ?? "";
    return r.jsxs("div", {
      className: i,
      children: [
        r.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            r.jsx("select", {
              value: v,
              onChange: (m) => S(m.target.value),
              className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: b.map((m) => r.jsx("option", {
                value: m.id,
                children: Nt(m)
              }, m.id))
            }),
            r.jsxs("button", {
              type: "button",
              onClick: () => {
                x({
                  force: true
                });
              },
              disabled: h,
              className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
              title: "AI Studio \uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68",
              children: [
                h ? r.jsx(X, {
                  size: 14,
                  className: "animate-spin"
                }) : r.jsx(Y, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            })
          ]
        }),
        k && r.jsx("p", {
          className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300",
          children: k
        }),
        ee(s) && r.jsx("p", {
          className: "mt-1.5 text-[11px] text-amber-700 dark:text-amber-300",
          children: "\uC774 \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uD560\uB2F9\uB7C9\uC774 0\uC77C \uC218 \uC788\uC2B5\uB2C8\uB2E4. Gemini 2.0 Flash \uC0AC\uC6A9\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4."
        })
      ]
    });
  };
  be = function({ value: e, onChange: t, onPick: s, onInputBlur: n, options: a, loading: i = false, placeholder: l = "", className: c = "", maxItems: b = 30, aliasScope: u }) {
    const [h, g] = o.useState(false), [k, y] = o.useState(false), [x, S] = o.useState(""), v = o.useRef(null), m = o.useMemo(() => T(u, e, a), [
      u,
      a,
      e
    ]), M = o.useMemo(() => a.find((d) => d.id === m), [
      m,
      a
    ]), E = (M == null ? void 0 : M.displayName) || m, w = k ? x : E, N = String(w || "").trim().toLowerCase(), G = o.useCallback((d) => {
      const f = T(u, d, a);
      return f !== m && (t == null ? void 0 : t(f)), f;
    }, [
      u,
      m,
      t,
      a
    ]), C = o.useMemo(() => (N ? a.filter((f) => {
      const F = (f.id || "").toLowerCase(), B = (f.displayName || "").toLowerCase();
      return F.includes(N) || B.includes(N);
    }) : [
      ...a
    ]).slice(0, Math.max(1, b)), [
      a,
      N,
      b
    ]), L = o.useCallback((d) => {
      const f = T(u, d, a);
      S(f), y(false), f !== m && (t == null ? void 0 : t(f)), s == null ? void 0 : s(f), g(false);
    }, [
      u,
      m,
      t,
      s,
      a
    ]), j = o.useCallback((d) => {
      var _a;
      return d instanceof Node ? !!((_a = v.current) == null ? void 0 : _a.contains(d)) : false;
    }, []), I = !i && (N ? C.length === 0 : a.length === 0), D = N ? "\uC77C\uCE58\uD558\uB294 \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.";
    return r.jsxs(et, {
      open: h,
      onOpenChange: g,
      modal: false,
      children: [
        r.jsx(tt, {
          asChild: true,
          children: r.jsx("input", {
            ref: v,
            type: "text",
            autoComplete: "off",
            spellCheck: false,
            value: w,
            onFocus: () => {
              y(true), S(m), g(true);
            },
            onChange: (d) => {
              S(d.target.value), h || g(true);
            },
            onBlur: () => {
              y(false), G(x), S(""), n == null ? void 0 : n();
            },
            placeholder: l,
            "aria-label": (M == null ? void 0 : M.displayName) && M.displayName !== m ? "\uBAA8\uB378" : "\uBAA8\uB378 ID",
            "aria-expanded": h,
            "aria-haspopup": "listbox",
            className: `min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft ${c}`.trim()
          })
        }),
        r.jsx(rt, {
          children: r.jsx(st, {
            className: "z-100050 max-h-72 min-w-48 overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            side: "bottom",
            align: "start",
            sideOffset: 4,
            onOpenAutoFocus: (d) => d.preventDefault(),
            onCloseAutoFocus: (d) => d.preventDefault(),
            onFocusOutside: (d) => {
              (document.activeElement === v.current || j(d.target)) && d.preventDefault();
            },
            onPointerDownOutside: (d) => {
              j(d.target) && d.preventDefault();
            },
            onInteractOutside: (d) => {
              j(d.target) && d.preventDefault();
            },
            children: i ? r.jsx("div", {
              className: "px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
              children: "\uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            }) : I ? r.jsx("div", {
              className: "cursor-default select-none rounded px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted",
              children: D
            }) : r.jsx("ul", {
              role: "listbox",
              "aria-label": "\uBAA8\uB378 \uBAA9\uB85D",
              children: C.map((d) => r.jsx("li", {
                children: r.jsx("button", {
                  type: "button",
                  role: "option",
                  "aria-selected": d.id === m,
                  onMouseDown: (f) => f.preventDefault(),
                  onClick: () => L(d.id),
                  className: "flex w-full cursor-pointer select-none items-center rounded px-2 py-1.5 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg",
                  children: d.displayName
                })
              }, d.id))
            })
          })
        })
      ]
    });
  };
  function jt({ error: e, modelId: t = "", suggestRedownload: s = true, className: n = "" }) {
    const a = ve(), i = t.trim(), l = s && Ge(e), c = () => {
      Re(i || void 0), a(_e);
    };
    return r.jsxs("div", {
      className: n,
      children: [
        r.jsx("p", {
          className: "text-[11px] text-red-600 dark:text-red-400",
          children: e
        }),
        l ? r.jsxs("div", {
          className: "mt-1.5 rounded border border-amber-200 bg-amber-50/80 p-2 dark:border-amber-900/50 dark:bg-amber-950/30",
          children: [
            r.jsxs("p", {
              className: "text-[11px] leading-relaxed text-amber-900 dark:text-amber-100",
              children: [
                "\uCE90\uC2DC\uAC00 \uC190\uC0C1\uB418\uC5C8\uAC70\uB098 \uB2E4\uC6B4\uB85C\uB4DC\uAC00 \uB04A\uACBC\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uBAA8\uB378\uC744",
                " ",
                r.jsx("strong", {
                  className: "font-semibold",
                  children: "\uB2E4\uC2DC \uB2E4\uC6B4\uB85C\uB4DC"
                }),
                "\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD574 \uBCF4\uC138\uC694.",
                i ? r.jsxs(r.Fragment, {
                  children: [
                    r.jsx("br", {}),
                    r.jsxs("span", {
                      className: "text-amber-800/90 dark:text-amber-200/90",
                      children: [
                        "\uBAA8\uB378: ",
                        i
                      ]
                    })
                  ]
                }) : null
              ]
            }),
            r.jsxs("button", {
              type: "button",
              onClick: c,
              className: "mt-1.5 inline-flex items-center gap-1 rounded border border-amber-300 bg-white px-2 py-1 text-[11px] font-medium text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100 dark:hover:bg-amber-950/70",
              children: [
                r.jsx(Ke, {
                  size: 12,
                  "aria-hidden": true
                }),
                "\uC124\uC815\uC5D0\uC11C \uBAA8\uB378 \uB2E4\uC2DC \uB2E4\uC6B4\uB85C\uB4DC"
              ]
            })
          ]
        }) : null
      ]
    });
  }
  function ce(e, t) {
    const s = /* @__PURE__ */ new Set();
    for (const n of e) {
      const a = String(n.repoId || n.id || "").trim();
      a && s.add(a);
    }
    for (const n of t) {
      const a = String(n || "").trim();
      a && s.add(a);
    }
    return ue("mlx-vlm", [
      ...s
    ].sort((n, a) => n.localeCompare(a)).map((n) => ({
      id: n,
      displayName: n
    })));
  }
  Ft = function({ value: e, onChange: t, autoLoad: s = true, autoLoadModelOnSelect: n = false, className: a = "" }) {
    const [i, l] = o.useState([]), [c, b] = o.useState(false), [u, h] = o.useState(false), [g, k] = o.useState(false), [y, x] = o.useState(""), [S, v] = o.useState(""), [m, M] = o.useState(""), [E, w] = o.useState(false), [N, G] = o.useState(false), C = o.useRef(0), L = o.useMemo(() => T("mlx-vlm", e, i), [
      i,
      e
    ]), j = o.useCallback((p) => {
      t == null ? void 0 : t(T("mlx-vlm", p, i));
    }, [
      t,
      i
    ]);
    o.useEffect(() => {
      !t || !L || L === e.trim() || t(L);
    }, [
      L,
      t,
      e
    ]);
    const I = o.useCallback(async () => {
      if (K()) {
        b(true), x("");
        try {
          const p = Te(), [{ models: A }, _] = await Promise.all([
            Pe(),
            ne(p)
          ]);
          M(_.models[0] || ""), w(ae());
          const R = ce(A, [
            p.selectedModelId,
            ..._.models
          ]), U = T("mlx-vlm", e, R);
          l(ce(A, [
            p.selectedModelId,
            U,
            ..._.models
          ])), !A.length && !p.selectedModelId.trim() && !U.trim() && x("\uC124\uCE58\uB41C MLX \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 > MLX-VLM\uC5D0\uC11C \uBAA8\uB378\uC744 \uCD94\uAC00\uD558\uC138\uC694.");
        } catch (p) {
          x(p instanceof Error ? p.message : "MLX \uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        } finally {
          b(false);
        }
      }
    }, [
      e
    ]), D = o.useCallback(async (p) => {
      if (!K()) return;
      const A = String(p || "").trim();
      if (!A) return;
      const _ = await ne();
      if (_.running && _.models[0] === A) {
        M(A), v("");
        return;
      }
      const R = C.current + 1;
      C.current = R, h(true), v("");
      try {
        const U = await De(A);
        if (C.current !== R) return;
        M(U.model), Oe(), await I();
      } catch (U) {
        if (C.current !== R) return;
        v(Ve(U).message);
      } finally {
        C.current === R && h(false);
      }
    }, [
      I
    ]), d = o.useCallback(async () => {
      if (K()) {
        k(true), v("");
        try {
          await Fe(), M(""), w(false), await I();
        } catch (p) {
          v(p instanceof Error ? p.message : "MLX-VLM \uBAA8\uB378\uC744 \uC5B8\uB85C\uB4DC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        } finally {
          k(false);
        }
      }
    }, [
      I
    ]), f = o.useCallback((p) => {
      n && D(p);
    }, [
      n,
      D
    ]);
    o.useEffect(() => {
      s && I();
    }, [
      s,
      I
    ]), o.useEffect(() => {
      const p = () => {
        I();
      };
      return window.addEventListener(oe, p), window.addEventListener(W, p), () => {
        window.removeEventListener(oe, p), window.removeEventListener(W, p);
      };
    }, [
      I
    ]), o.useEffect(() => {
      const p = (A) => {
        var _a;
        const _ = (_a = A.detail) == null ? void 0 : _a.modelId;
        if (_ == null) {
          M(""), w(false);
          return;
        }
        const R = String(_).trim();
        M(R), w(ae()), !e.trim() && R && (t == null ? void 0 : t(R));
      };
      return window.addEventListener(ie, p), () => window.removeEventListener(ie, p);
    }, [
      t,
      e
    ]), o.useEffect(() => {
      !m || e.trim() || (t == null ? void 0 : t(m));
    }, [
      m,
      t,
      e
    ]), o.useEffect(() => {
      if (!n || c || u) return;
      const p = L.trim();
      p && i.some((A) => A.id === p) && f(p);
    }, [
      n,
      c,
      u,
      f,
      i,
      L
    ]);
    const F = o.useCallback((p) => {
      const A = T("mlx-vlm", p, i);
      f(A);
    }, [
      f,
      i
    ]), B = o.useCallback(() => {
      f(L);
    }, [
      L,
      f
    ]), ge = o.useCallback(() => {
      G(false), d();
    }, [
      d
    ]);
    if (!K()) return r.jsx("p", {
      className: "text-[11px] text-gray-500 dark:text-odp-muted",
      children: "MLX-VLM\uC740 Tauri macOS \uBE4C\uB4DC\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
    });
    const ye = c || u || g, O = L.trim(), P = m.trim(), te = !!(O && P && O === P), re = !!(P && O && P !== O), we = !!(P && (te || re)), z = te && !!(P && E), Me = () => {
      if (z) {
        G(true);
        return;
      }
      D(O);
    }, Le = g || !z && !O, ke = z ? "Unload MLX model" : "Load MLX model";
    return r.jsxs("div", {
      className: a,
      children: [
        r.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            r.jsx(be, {
              value: L,
              options: i,
              loading: c,
              maxItems: 200,
              aliasScope: "mlx-vlm",
              onChange: j,
              onPick: F,
              onInputBlur: B,
              placeholder: "MLX model id",
              className: "min-w-0 flex-1"
            }),
            r.jsx("button", {
              type: "button",
              onClick: Me,
              disabled: Le,
              "aria-label": ke,
              className: [
                "group inline-flex shrink-0 items-center gap-1 rounded border px-2 py-1.5 text-[11px] font-medium",
                "disabled:cursor-not-allowed disabled:opacity-50",
                z ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:border-odp-borderStrong dark:hover:bg-odp-bgSoft dark:hover:text-odp-muted" : "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60"
              ].join(" "),
              children: g ? r.jsxs(r.Fragment, {
                children: [
                  r.jsx(X, {
                    size: 14,
                    className: "animate-spin",
                    "aria-hidden": true
                  }),
                  "\uC5B8\uB85C\uB4DC \uC911\u2026"
                ]
              }) : u ? r.jsxs(r.Fragment, {
                children: [
                  r.jsx(X, {
                    size: 14,
                    className: "animate-spin",
                    "aria-hidden": true
                  }),
                  "\uB85C\uB4DC \uC911\u2026"
                ]
              }) : z ? r.jsxs(r.Fragment, {
                children: [
                  r.jsxs("span", {
                    className: "inline-flex items-center gap-1 group-hover:hidden",
                    children: [
                      r.jsx(We, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "\uB85C\uB4DC\uB428"
                    ]
                  }),
                  r.jsxs("span", {
                    className: "hidden items-center gap-1 group-hover:inline-flex",
                    children: [
                      r.jsx(Je, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "\uC5B8\uB85C\uB4DC"
                    ]
                  })
                ]
              }) : r.jsxs(r.Fragment, {
                children: [
                  r.jsx(Qe, {
                    size: 14,
                    "aria-hidden": true
                  }),
                  "\uB85C\uB4DC"
                ]
              })
            }),
            r.jsx("button", {
              type: "button",
              onClick: () => {
                I();
              },
              disabled: ye,
              "aria-label": "Refresh MLX models",
              className: "inline-flex shrink-0 items-center justify-center rounded border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft",
              children: c ? r.jsx(X, {
                size: 14,
                className: "animate-spin"
              }) : r.jsx(Y, {
                size: 14
              })
            })
          ]
        }),
        y ? r.jsx("p", {
          className: "mt-1 text-[11px] text-amber-700 dark:text-amber-300",
          children: y
        }) : null,
        S ? r.jsx(jt, {
          className: "mt-1",
          error: S,
          modelId: O
        }) : null,
        u ? r.jsxs("p", {
          className: "mt-1 inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted",
          children: [
            r.jsx(X, {
              size: 12,
              className: "animate-spin",
              "aria-hidden": true
            }),
            "\uBAA8\uB378 \uB85C\uB4DC \uC911\u2026"
          ]
        }) : we ? r.jsxs("div", {
          className: "mt-1 space-y-0.5",
          children: [
            r.jsxs("p", {
              className: "text-[11px] text-emerald-700 dark:text-emerald-300",
              children: [
                "\uB85C\uB4DC\uB428 \xB7 ",
                Ze("mlx-vlm", P)
              ]
            }),
            re ? r.jsx("p", {
              className: "text-[11px] text-amber-700 dark:text-amber-300",
              children: "\uC120\uD0DD\uD55C \uBAA8\uB378\uACFC \uB2E4\uB985\uB2C8\uB2E4. \uB85C\uB4DC \uBC84\uD2BC\uC73C\uB85C \uC804\uD658\uD558\uC138\uC694."
            }) : null
          ]
        }) : P && !E ? r.jsx("p", {
          className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uC678\uBD80 MLX-VLM \uC6CC\uCEE4\uAC00 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC571\uC5D0\uC11C \uC2DC\uC791\uD55C \uBAA8\uB378\uB9CC \uC5B8\uB85C\uB4DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
        }) : r.jsx("p", {
          className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB85C\uB4DC \uBC84\uD2BC\uC744 \uB20C\uB7EC \uBA54\uBAA8\uB9AC\uC5D0 \uC62C\uB9AC\uC138\uC694."
        }),
        r.jsx(Be, {
          isOpen: N,
          title: "MLX-VLM \uBAA8\uB378 \uC5B8\uB85C\uB4DC",
          message: "\uB85C\uCEEC MLX-VLM \uC6CC\uCEE4\uC5D0\uC11C \uBAA8\uB378\uC744 \uBA54\uBAA8\uB9AC\uC5D0\uC11C \uB0B4\uB9B4\uAE4C\uC694?",
          confirmLabel: "\uC5B8\uB85C\uB4DC",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: ge,
          onCancel: () => G(false)
        })
      ]
    });
  };
  Bt = function({ getBaseUrl: e, getApiKey: t, value: s, onChange: n, autoLoad: a = false, reloadKey: i = "", aliasScope: l, listModels: c, emptyBaseUrlMessage: b = "Endpoint URL\uC744 \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694.", placeholder: u = "\uBAA8\uB378 ID \uC9C1\uC811 \uC785\uB825 (\uC608: gpt-4o-mini)", helpText: h = "\uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uC11C\uBC84 \uBAA8\uB378\uC744 \uAC00\uC838\uC624\uAC70\uB098, \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.", className: g = "" }) {
    const k = o.useRef(e), y = o.useRef(t), x = o.useRef(c);
    k.current = e, y.current = t, x.current = c;
    const [S, v] = o.useState([]), [m, M] = o.useState(false), [E, w] = o.useState(""), [N, G] = o.useState(0), C = o.useCallback(async () => {
      var _a, _b;
      const d = (_a = await Promise.resolve(k.current())) == null ? void 0 : _a.trim();
      if (!d) {
        w(b);
        return;
      }
      M(true), w("");
      try {
        const f = ((_b = await Promise.resolve(y.current())) == null ? void 0 : _b.trim()) ?? "", F = x.current, B = F ? await F({
          baseUrl: d,
          apiKey: f
        }) : await He(d, f);
        v(B), B.length || w("\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.");
      } catch (f) {
        w(f instanceof Error ? f.message : "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        M(false);
      }
    }, [
      b
    ]);
    o.useEffect(() => {
      v([]), w("");
    }, [
      i
    ]), o.useEffect(() => {
      a && C();
    }, [
      a,
      C,
      i
    ]), o.useEffect(() => {
      if (!l) return;
      const d = () => G((f) => f + 1);
      return window.addEventListener(W, d), () => window.removeEventListener(W, d);
    }, [
      l
    ]);
    const L = o.useMemo(() => l ? ue(l, S) : S, [
      l,
      N,
      S
    ]), j = o.useMemo(() => T(l, s, L), [
      l,
      L,
      s
    ]), I = o.useMemo(() => {
      if (!l) return "";
      const d = j;
      return d ? Ye(l, d) : "";
    }, [
      l,
      N,
      j
    ]), D = (d) => {
      const f = T(l, d, L);
      Ue(f), n == null ? void 0 : n(f);
    };
    return o.useEffect(() => {
      !n || !j || j === s.trim() || n(j);
    }, [
      j,
      n,
      s
    ]), r.jsxs("div", {
      className: g,
      children: [
        r.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            r.jsx(be, {
              value: j,
              onChange: D,
              options: L,
              loading: m,
              ...l ? {
                aliasScope: l
              } : {},
              placeholder: u
            }),
            r.jsxs("button", {
              type: "button",
              onClick: () => {
                C();
              },
              disabled: m,
              className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
              "aria-label": "\uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68",
              children: [
                m ? r.jsx(X, {
                  size: 14,
                  className: "animate-spin"
                }) : r.jsx(Y, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            })
          ]
        }),
        I ? r.jsxs("p", {
          className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            "\uC6D0\uBCF8 ID \xB7 ",
            j
          ]
        }) : null,
        r.jsx("p", {
          className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted",
          children: h
        }),
        E ? r.jsx("p", {
          className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300",
          children: E
        }) : null
      ]
    });
  };
});
export {
  Vt as G,
  Ft as M,
  Bt as O,
  __tla,
  be as a,
  Ot as g,
  ee as i
};
