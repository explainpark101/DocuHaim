const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-D9_B7hh1.js","assets/core-DhEqZVGG.js"])))=>i.map(i=>d[i]);
import { j as e, r as a, a as de, e as We, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { S as ve, a as Ce, b as we } from "./SettingsCollapsibleHeading-CE8tqQ8H.js";
import { cj as ie, t as Se, ck as qe, cl as Qe, cm as ce, cn as Xe, co as Je, cp as Ye, aC as W, cq as Ze, cr as ea, cs as pe, ct as aa, cu as ta, cv as sa, cw as la, I as T, cx as ra, cy as me, cz as na, cA as oa, cB as da, j as U, aB as Y, cC as Le, cD as ia, cE as ue, i as Ne, cF as Ae, cG as ca, cH as pa, cI as ma, cJ as ua, cK as xa, cL as ba, cM as fa, ag as ga, cN as ha, cO as ya, cP as ka, az as xe, cQ as ja, aA as va, aG as Ca, aH as wa, aJ as Sa, ax as La, cR as Na, aL as Aa, aM as be, cS as fe, aE as ge, cT as Ia, aD as Oa, __tla as __tla_1 } from "./index-DSkvkTCg.js";
import { _ as Pa } from "./vendor-aws-Cvd3RhZI.js";
import { L as Ea, M as he, a as Ie } from "./MlxVlmDownloadButtonContent-9CA68By9.js";
import { L as ye, g as Ma } from "./localLlmModelAliases-EglLH-3U.js";
import { T as Da, a4 as ke, n as Ba, H as Ta, z as za, L as V, a5 as je, a6 as _a, X as Ra, a7 as Fa, a8 as Ha } from "./vendor-lucide-BXdwsXhs.js";
import { R as Ga, T as $a, P as Ua, C as Va, x as Ka } from "./vendor-radix-DuLpLUUM.js";
import "./vendor-motion-Dw-WnPM7.js";
import { __tla as __tla_2 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
let vt;
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
  function F({ title: t, subtitle: n, open: l, onOpenChange: r, children: m, className: p = "", contentClassName: f = "space-y-3 p-3 pt-0" }) {
    return e.jsxs(ve, {
      contentKey: t,
      open: l,
      onOpenChange: r,
      className: [
        "rounded-md border border-sky-200/80 bg-white/60 dark:border-sky-900/40 dark:bg-odp-bgSoft/40",
        p
      ].filter(Boolean).join(" "),
      children: [
        e.jsx(Ce, {
          subtitle: n,
          align: "start",
          chevronSize: 14,
          titleAs: "span",
          className: "flex w-full items-start gap-2 px-3 py-2.5 text-left transition hover:bg-sky-50/60 dark:hover:bg-sky-950/20",
          titleClassName: "text-xs font-semibold text-gray-800 dark:text-odp-fgStrong",
          children: t
        }),
        e.jsx(we, {
          children: e.jsx("div", {
            className: f,
            children: m
          })
        })
      ]
    });
  }
  function Wa({ settings: t, disabled: n = false, onChange: l }) {
    return e.jsxs("div", {
      className: "space-y-4",
      children: [
        e.jsxs("div", {
          className: "grid gap-3 sm:grid-cols-2",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx("label", {
                  className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                  children: "Host"
                }),
                e.jsx("input", {
                  type: "text",
                  value: t.serverHost,
                  disabled: n,
                  onChange: (r) => l({
                    ...t,
                    serverHost: r.target.value
                  }),
                  placeholder: "127.0.0.1",
                  className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", {
                  className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                  children: "Port"
                }),
                e.jsx("input", {
                  type: "number",
                  min: 1,
                  max: 65535,
                  value: t.serverPort,
                  disabled: n,
                  onChange: (r) => l({
                    ...t,
                    serverPort: Number.parseInt(r.target.value, 10) || 8080
                  }),
                  className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
              children: "llama-server binary path (optional)"
            }),
            e.jsx("input", {
              type: "text",
              value: t.binaryPath,
              disabled: n,
              onChange: (r) => l({
                ...t,
                binaryPath: r.target.value
              }),
              placeholder: "/opt/homebrew/bin/llama-server",
              className: "w-full rounded border px-3 py-2 font-mono text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsx("p", {
              className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
              children: "Leave empty to auto-detect from PATH / Homebrew / ~/.local/bin."
            })
          ]
        }),
        e.jsxs("div", {
          className: "grid gap-3 sm:grid-cols-2",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx("label", {
                  className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                  children: "Context size (0 = model default)"
                }),
                e.jsx("input", {
                  type: "number",
                  min: 0,
                  value: t.ctxSize,
                  disabled: n,
                  onChange: (r) => l({
                    ...t,
                    ctxSize: Number.parseInt(r.target.value, 10) || 0
                  }),
                  className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", {
                  className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                  children: "GPU layers (-1 = auto)"
                }),
                e.jsx("input", {
                  type: "number",
                  value: t.nGpuLayers,
                  disabled: n,
                  onChange: (r) => l({
                    ...t,
                    nGpuLayers: Number.parseInt(r.target.value, 10) || -1
                  }),
                  className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
              children: "API key (optional)"
            }),
            e.jsx("input", {
              type: "password",
              value: t.apiKey,
              disabled: n,
              onChange: (r) => l({
                ...t,
                apiKey: r.target.value
              }),
              placeholder: "sk-\u2026",
              autoComplete: "off",
              spellCheck: false,
              className: "w-full rounded border px-3 py-2 font-mono text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsxs("p", {
              className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "Passed to ",
                e.jsx("code", {
                  className: "text-[10px]",
                  children: "--api-key"
                }),
                " when starting llama-server."
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
              children: "HF download workers (parallel threads)"
            }),
            e.jsx("input", {
              type: "number",
              min: 1,
              max: 32,
              value: t.hfDownloadMaxWorkers,
              disabled: n,
              onChange: (r) => l({
                ...t,
                hfDownloadMaxWorkers: Number.parseInt(r.target.value, 10) || 16
              }),
              className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsxs("p", {
              className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "Passed to ",
                e.jsx("code", {
                  className: "text-[10px]",
                  children: "hf download --max-workers"
                }),
                ". Default 16 (HF CLI default is 8). Range 1\u201332."
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
              children: "Hugging Face token (optional)"
            }),
            e.jsx("input", {
              type: "password",
              value: t.hfToken,
              disabled: n,
              onChange: (r) => l({
                ...t,
                hfToken: r.target.value
              }),
              placeholder: "hf_\u2026",
              autoComplete: "off",
              spellCheck: false,
              className: "w-full rounded border px-3 py-2 font-mono text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            })
          ]
        })
      ]
    });
  }
  function qa({ settings: t, onSettingsChange: n, downloadReady: l, disabled: r = false }) {
    const [m, p] = a.useState(""), [f, x] = a.useState([]), [y, k] = a.useState(false), [P, c] = a.useState(""), [b, j] = a.useState(""), [v, z] = a.useState(false), [S, h] = a.useState(""), [N, B] = a.useState(""), [E, C] = a.useState(null), [w, H] = a.useState(null), [A, _] = a.useState(""), [L, M] = a.useState(null), [i, d] = a.useState(""), [g, I] = a.useState(true), [R, $] = a.useState(true), [Pe, Ee] = a.useState(false), [Me, De] = a.useState(false), [Be, ae] = a.useState(false), [Te, ze] = a.useState(() => ie()), [dt, _e] = a.useState(0), [te, q] = a.useState({}), [Re, Q] = a.useState(false), se = a.useCallback(async () => {
      const s = t.installedModels;
      if (!s.length || !Se()) {
        q({}), Q(false);
        return;
      }
      Q(true);
      try {
        const o = await qe(s);
        q(o);
      } catch {
        q({});
      } finally {
        Q(false);
      }
    }, [
      t.installedModels
    ]);
    a.useEffect(() => {
      se();
    }, [
      se
    ]), a.useEffect(() => Qe(() => ze(ie())), []), a.useEffect(() => {
      const s = () => _e((o) => o + 1);
      return window.addEventListener(ye, s), () => window.removeEventListener(ye, s);
    }, []), a.useEffect(() => {
      const s = (o) => {
        const u = o.detail, O = String((u == null ? void 0 : u.modelId) || t.selectedModelId || "").trim();
        O && j(O);
      };
      return window.addEventListener(ce, s), () => window.removeEventListener(ce, s);
    }, [
      t.selectedModelId
    ]);
    const le = a.useCallback(async () => {
      const s = m.trim();
      if (!s) {
        x([]), c("");
        return;
      }
      k(true), c("");
      try {
        const o = await Xe(s, {
          limit: 20
        });
        x(o), o.length || c("\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      } catch (o) {
        c(o instanceof Error ? o.message : "Search failed."), x([]);
      } finally {
        k(false);
      }
    }, [
      m
    ]), X = a.useCallback((s) => {
      const o = String(s.id || "").trim();
      if (o) {
        if (v && S === o) {
          _(o);
          return;
        }
        v || (Je(o), H(s));
      }
    }, [
      v,
      S
    ]), Fe = a.useCallback(async () => {
      const s = w;
      if (!s) return;
      const o = s.id;
      H(null), z(true), h(o), C(null), ae(true);
      try {
        const u = await Ye(o, {
          onProgress: (D) => C(D)
        }), O = W({
          ...t,
          installedModels: [
            u,
            ...t.installedModels.filter((D) => D.id !== u.id)
          ]
        }, u.id);
        n(O);
      } catch (u) {
        Ze(u) || alert(u instanceof Error ? u.message : "Download failed.");
      } finally {
        z(false), h(""), B(""), C(null);
      }
    }, [
      n,
      w,
      t
    ]), He = a.useCallback(async () => {
      const s = A;
      if (_(""), !!s) {
        B(s);
        try {
          await ea(s);
        } catch (o) {
          B(""), alert(o instanceof Error ? o.message : "Failed to abort download.");
        }
      }
    }, [
      A
    ]), Ge = a.useCallback(() => {
      const s = pe(b);
      if (!s) {
        alert("Hugging Face repo URL \uB610\uB294 org/model \uD615\uC2DD\uC744 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      X({
        id: s
      });
    }, [
      b,
      X
    ]), $e = a.useCallback(() => {
      const s = i.trim();
      if (!s) return;
      const o = s.split(/[/\\]/).pop() || s, u = aa(t, {
        id: o,
        localPath: s,
        source: "local"
      });
      n(W(u, o)), d("");
    }, [
      i,
      n,
      t
    ]), Ue = a.useCallback(async () => {
      try {
        const { open: s } = await Pa(async () => {
          const { open: u } = await import("./index-D9_B7hh1.js");
          return {
            open: u
          };
        }, __vite__mapDeps([0,1])), o = await s({
          multiple: false,
          filters: [
            {
              name: "GGUF",
              extensions: [
                "gguf"
              ]
            }
          ]
        });
        typeof o == "string" && o.trim() && d(o);
      } catch {
      }
    }, []), Ve = a.useCallback(() => {
      if (!L) return;
      const s = ta(t, L.id);
      n(s), M(null);
    }, [
      n,
      L,
      t
    ]), re = w ? sa(w.id, {
      ..."diskBytes" in w && w.diskBytes != null ? {
        diskBytes: w.diskBytes
      } : {}
    }) : null, ne = L ? la(L.id) : null, G = pe(b) || "", K = !!(v && S && G && S === G), J = !!(N && G && N === G), oe = (E == null ? void 0 : E.label) || "";
    return e.jsxs("div", {
      className: "space-y-3",
      children: [
        e.jsx(F, {
          title: "\uC124\uCE58\uB41C \uBAA8\uB378",
          subtitle: `${t.installedModels.length}\uAC1C \xB7 ${t.selectedModelId.trim() ? "\uC120\uD0DD\uB428" : "\uBAA8\uB378 \uBBF8\uC120\uD0DD"}`,
          open: g,
          onOpenChange: I,
          children: e.jsxs("div", {
            className: "space-y-2",
            children: [
              t.selectedModelId.trim() ? e.jsx("div", {
                className: "flex justify-end",
                children: e.jsx(T, {
                  type: "button",
                  variant: "tertiary",
                  size: "sm",
                  disabled: r,
                  onClick: () => n(W(t, "")),
                  children: "\uC120\uD0DD \uD574\uC81C"
                })
              }) : null,
              t.installedModels.length === 0 ? e.jsx("p", {
                className: "text-[11px] text-gray-500 dark:text-odp-muted",
                children: "\uC544\uC9C1 \uC124\uCE58\uB41C GGUF \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
              }) : t.installedModels.map((s) => {
                const o = t.selectedModelId === s.id, u = Ma("llama-cpp", s.id), O = te[s.id] ?? te[s.repoId || ""] ?? 0, D = O > 0 ? ra(O) : Re ? null : "\u2014";
                return e.jsxs("div", {
                  className: [
                    "flex flex-wrap items-start justify-between gap-2 rounded border px-2 py-1.5 text-[11px]",
                    o ? "border-sky-400 bg-sky-50/80 dark:border-sky-700 dark:bg-sky-950/30" : "border-gray-200 dark:border-odp-borderStrong"
                  ].join(" "),
                  children: [
                    e.jsxs("div", {
                      className: "min-w-0 flex-1",
                      children: [
                        e.jsxs("button", {
                          type: "button",
                          disabled: r,
                          className: "w-full min-w-0 text-left",
                          onClick: () => n(W(t, o ? "" : s.id)),
                          children: [
                            e.jsx("span", {
                              className: "block truncate font-medium",
                              children: u || s.id
                            }),
                            u ? e.jsx("span", {
                              className: "block truncate text-[10px] text-gray-500 dark:text-odp-muted",
                              children: s.id
                            }) : null,
                            s.localPath ? e.jsx("span", {
                              className: "block truncate text-[10px] text-gray-500 dark:text-odp-muted",
                              children: s.localPath
                            }) : null
                          ]
                        }),
                        e.jsx("span", {
                          className: "mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",
                          children: D ? `\uC6A9\uB7C9 ${D}` : "\uC6A9\uB7C9 \uD655\uC778 \uC911\u2026"
                        }),
                        e.jsx(Ea, {
                          scope: "llama-cpp",
                          modelId: s.id,
                          disabled: r
                        })
                      ]
                    }),
                    e.jsx("div", {
                      className: "flex gap-1",
                      children: e.jsx(T, {
                        type: "button",
                        variant: "tertiary",
                        size: "sm",
                        disabled: r || v,
                        "aria-label": "\uC0AD\uC81C",
                        onClick: () => M(s),
                        children: e.jsx(Da, {
                          size: 14
                        })
                      })
                    })
                  ]
                }, s.id);
              })
            ]
          })
        }),
        e.jsx(F, {
          title: "\uB85C\uCEEC GGUF \uACBD\uB85C",
          open: R,
          onOpenChange: $,
          children: e.jsxs("div", {
            className: "flex flex-wrap gap-2",
            children: [
              e.jsx("input", {
                type: "text",
                value: i,
                disabled: r,
                onChange: (s) => d(s.target.value),
                placeholder: "/path/to/model.gguf",
                className: "min-w-0 flex-1 rounded border px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              }),
              e.jsxs(T, {
                type: "button",
                variant: "tertiary",
                size: "sm",
                disabled: r,
                onClick: () => {
                  Ue();
                },
                children: [
                  e.jsx(ke, {
                    size: 14
                  }),
                  "Browse"
                ]
              }),
              e.jsxs(T, {
                type: "button",
                variant: "secondary",
                size: "sm",
                disabled: r,
                onClick: $e,
                children: [
                  e.jsx(ke, {
                    size: 14
                  }),
                  "\uCD94\uAC00"
                ]
              })
            ]
          })
        }),
        e.jsxs(F, {
          title: "Hugging Face \uAC80\uC0C9",
          open: Pe,
          onOpenChange: Ee,
          children: [
            e.jsxs("div", {
              className: "flex flex-wrap gap-2",
              children: [
                e.jsx("input", {
                  type: "search",
                  value: m,
                  disabled: r || y,
                  onChange: (s) => p(s.target.value),
                  onKeyDown: (s) => {
                    s.key === "Enter" && (s.preventDefault(), !r && !y && le());
                  },
                  placeholder: "llama 3 gguf",
                  className: "min-w-0 flex-1 rounded border px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                }),
                e.jsxs(T, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  disabled: r || y || !m.trim(),
                  onClick: () => {
                    le();
                  },
                  children: [
                    e.jsx(Ba, {
                      size: 14
                    }),
                    "\uAC80\uC0C9"
                  ]
                })
              ]
            }),
            y ? e.jsx("p", {
              className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
              children: "Searching\u2026"
            }) : null,
            P ? e.jsx("p", {
              className: "mt-1 text-[11px] text-amber-700 dark:text-amber-300",
              children: P
            }) : null,
            e.jsx("ul", {
              className: "mt-2 space-y-1",
              children: f.map((s) => {
                const o = N === s.id, u = v && S === s.id, O = !u && !o && me(s.id, t.installedModels), D = na(s.diskBytes), Ke = o ? "aborting" : u ? "downloading" : O ? "downloaded" : "download";
                return e.jsxs("li", {
                  className: "flex flex-wrap items-center justify-between gap-2 rounded border px-2 py-1.5 text-[11px] dark:border-odp-borderStrong",
                  children: [
                    e.jsxs("div", {
                      className: "min-w-0 flex-1",
                      children: [
                        e.jsx("span", {
                          className: "block truncate font-medium",
                          children: s.id
                        }),
                        e.jsxs("span", {
                          className: "block text-[10px] text-gray-500 dark:text-odp-muted",
                          children: [
                            D ? `\uC6A9\uB7C9 ${D}` : s.downloads != null ? `${s.downloads.toLocaleString()} downloads` : "\uC6A9\uB7C9 \uC815\uBCF4 \uC5C6\uC74C",
                            D && s.downloads != null ? ` \xB7 ${s.downloads.toLocaleString()} downloads` : ""
                          ]
                        })
                      ]
                    }),
                    e.jsx(T, {
                      type: "button",
                      variant: O ? "tertiary" : "secondary",
                      size: "sm",
                      className: u ? "min-w-[9.5rem] font-mono tabular-nums transition-none" : O ? "text-emerald-700 transition-none dark:text-emerald-300" : "transition-none",
                      disabled: r || !l || o || v && !u,
                      onClick: () => X(s),
                      children: e.jsx(he, {
                        mode: Ke,
                        progressLabel: u && !o ? oe : ""
                      })
                    })
                  ]
                }, s.id);
              })
            })
          ]
        }),
        e.jsx(F, {
          title: "URL / repo id \uBD99\uC5EC\uB123\uAE30",
          open: Me,
          onOpenChange: De,
          children: e.jsxs("div", {
            className: "flex flex-wrap gap-2",
            children: [
              e.jsx("input", {
                type: "text",
                value: b,
                disabled: r,
                onChange: (s) => j(s.target.value),
                placeholder: "https://huggingface.co/org/model",
                className: "min-w-0 flex-1 rounded border px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              }),
              e.jsx(T, {
                type: "button",
                variant: "secondary",
                size: "sm",
                className: K ? "min-w-[9.5rem] font-mono tabular-nums transition-none" : "transition-none",
                disabled: r || !l || J || !K && (v || !oa(G)),
                onClick: Ge,
                children: e.jsx(he, {
                  mode: J ? "aborting" : K ? "downloading" : me(G, t.installedModels) ? "downloaded" : "download",
                  progressLabel: K && !J ? oe : "",
                  paste: true
                })
              })
            ]
          })
        }),
        e.jsx(Ie, {
          title: "\uB2E4\uC6B4\uB85C\uB4DC \uB85C\uADF8",
          lines: Te,
          emptyHint: "GGUF \uB2E4\uC6B4\uB85C\uB4DC \uC2DC huggingface-cli / uv \uCD9C\uB825\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
          open: Be,
          onOpenChange: ae,
          onClear: da
        }),
        e.jsx(U, {
          isOpen: !!w,
          title: (re == null ? void 0 : re.title) || "Download model",
          message: (re == null ? void 0 : re.message) || "",
          confirmLabel: "Download",
          cancelLabel: "Cancel",
          onConfirm: () => {
            Fe();
          },
          onCancel: () => H(null)
        }),
        e.jsx(U, {
          isOpen: !!A,
          title: "Abort download?",
          message: `Stop the in-progress download for "${A}"?`,
          confirmLabel: "Abort",
          cancelLabel: "Continue",
          variant: "danger",
          onConfirm: () => {
            He();
          },
          onCancel: () => _("")
        }),
        e.jsx(U, {
          isOpen: !!L,
          title: (ne == null ? void 0 : ne.title) || "Delete model",
          message: (ne == null ? void 0 : ne.message) || "",
          variant: "danger",
          confirmLabel: "Delete",
          cancelLabel: "Cancel",
          onConfirm: Ve,
          onCancel: () => M(null)
        })
      ]
    });
  }
  function Qa({ busy: t, cliAvailable: n, canStart: l, runtimeLoaded: r, serverRunning: m, loadedModels: p, onStart: f, onStop: x }) {
    const [y, k] = a.useState(false);
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsxs(T, {
              type: "button",
              variant: "primary",
              size: "sm",
              disabled: t || !n || !l || r,
              onClick: () => {
                f();
              },
              children: [
                e.jsx(Ta, {
                  size: 14
                }),
                "Start server"
              ]
            }),
            e.jsxs(T, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: t || !m,
              onClick: () => k(true),
              children: [
                e.jsx(za, {
                  size: 14
                }),
                "Stop server"
              ]
            })
          ]
        }),
        r && p[0] ? e.jsxs("p", {
          className: "mt-2 text-[11px] text-gray-600 dark:text-odp-muted",
          children: [
            "Loaded: ",
            e.jsx("code", {
              className: "text-[10px]",
              children: p[0]
            })
          ]
        }) : m ? e.jsx("p", {
          className: "mt-2 text-[11px] text-amber-700 dark:text-amber-300",
          children: "Server process running; waiting for health check\u2026"
        }) : null,
        e.jsx(U, {
          isOpen: y,
          title: "Stop llama.cpp server",
          message: "Stop the local llama-server started from this app?",
          confirmLabel: "Stop",
          cancelLabel: "Cancel",
          variant: "danger",
          onConfirm: () => {
            x();
          },
          onCancel: () => k(false)
        })
      ]
    });
  }
  function Xa() {
    const [t, n] = a.useState(() => ue());
    return a.useEffect(() => Le(() => n(ue())), []), t;
  }
  function Ja({ serverRunning: t, managedByApp: n, open: l, onOpenChange: r }) {
    const m = Xa(), [p, f] = a.useState(() => n || Y());
    a.useEffect(() => {
      f(n || Y());
    }, [
      n,
      t
    ]), a.useEffect(() => Le(() => {
      f(Y());
    }), []);
    const x = t ? p ? "\uC11C\uBC84 \uB85C\uADF8\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\u2026" : "\uC678\uBD80\uC5D0\uC11C \uC2E4\uD589 \uC911\uC778 \uC11C\uBC84\uB294 \uC774 \uC571\uC5D0\uC11C \uB85C\uADF8\uB97C \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : "Start server\uB97C \uC2E4\uD589\uD558\uBA74 llama-server raw \uCD9C\uB825\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.";
    return e.jsx(Ie, {
      title: "\uC11C\uBC84 \uB85C\uADF8",
      ...t ? {
        subtitle: p ? "\uC571 \uAD00\uB9AC server" : "\uC678\uBD80 \uD504\uB85C\uC138\uC2A4"
      } : {},
      lines: m,
      emptyHint: x,
      open: l,
      onOpenChange: r,
      onClear: ia
    });
  }
  const Ya = {
    brew: "brew install llama.cpp",
    official: "llama.app install.sh",
    scoop: "scoop install llama.cpp (versions)"
  };
  function Za({ open: t, minimized: n, action: l, heading: r, log: m, running: p, onMinimize: f, onExpand: x, onClose: y }) {
    const k = a.useRef(null), P = a.useRef(true);
    if (a.useEffect(() => {
      if (!t || n || !P.current) return;
      const b = k.current;
      b && (b.scrollTop = b.scrollHeight);
    }, [
      m,
      t,
      n
    ]), !t || typeof document > "u") return null;
    const c = r || (l ? Ya[l] : "llama.cpp install");
    return n ? de.createPortal(e.jsx("button", {
      type: "button",
      onClick: x,
      className: "fixed bottom-4 right-4 z-10050 flex size-11 items-center justify-center rounded-full border border-sky-300/80 bg-sky-950/95 text-sky-50 shadow-lg backdrop-blur-sm hover:bg-sky-900 dark:border-sky-700",
      title: p ? `${c} (running)` : c,
      "aria-label": p ? `Expand install log: ${c}` : "Expand install log",
      children: p ? e.jsx(V, {
        size: 18,
        className: "animate-spin"
      }) : e.jsx(je, {
        size: 18
      })
    }), document.body) : de.createPortal(e.jsxs("div", {
      className: "fixed bottom-4 right-4 z-10050 flex w-[min(92vw,440px)] flex-col overflow-hidden rounded-lg border border-sky-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-sky-700/60 dark:bg-odp-surface/95",
      role: "dialog",
      "aria-modal": "false",
      "aria-label": "llama.cpp install log",
      children: [
        e.jsxs("div", {
          className: "flex shrink-0 items-center justify-between gap-2 border-b border-sky-200/60 bg-sky-50/90 px-3 py-2 dark:border-sky-800/50 dark:bg-sky-950/40",
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-sky-900 dark:text-sky-100",
              children: [
                p ? e.jsx(V, {
                  size: 15,
                  className: "shrink-0 animate-spin",
                  "aria-hidden": true
                }) : e.jsx(je, {
                  size: 15,
                  className: "shrink-0",
                  "aria-hidden": true
                }),
                e.jsx("span", {
                  className: "truncate",
                  children: c
                })
              ]
            }),
            e.jsxs("div", {
              className: "flex shrink-0 items-center gap-0.5",
              children: [
                e.jsx("button", {
                  type: "button",
                  onClick: f,
                  className: "rounded p-1 text-sky-700 hover:bg-sky-100 dark:text-sky-200 dark:hover:bg-sky-900/50",
                  title: "Minimize",
                  "aria-label": "Minimize install log",
                  children: e.jsx(_a, {
                    size: 15
                  })
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: y,
                  disabled: p,
                  className: "rounded p-1 text-sky-700 hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-sky-200 dark:hover:bg-sky-900/50",
                  title: p ? "Wait until install finishes or abort first" : "Close",
                  "aria-label": "Close install log",
                  children: e.jsx(Ra, {
                    size: 15
                  })
                })
              ]
            })
          ]
        }),
        e.jsx("pre", {
          ref: k,
          onScroll: (b) => {
            const j = b.currentTarget;
            P.current = j.scrollHeight - j.scrollTop - j.clientHeight < 24;
          },
          className: "max-h-[min(40vh,320px)] min-h-40 overflow-auto bg-gray-950 px-3 py-2 font-mono text-[10px] leading-relaxed text-gray-100",
          children: m.trim() ? m : p ? `Starting\u2026
` : `No output yet.
`
        })
      ]
    }), document.body);
  }
  const et = "https://github.com/ggml-org/llama.cpp/releases", at = "z-100001 max-w-[min(92vw,360px)] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-[11px] leading-relaxed text-gray-700 shadow-md outline-none dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", tt = "inline-flex shrink-0 items-center justify-center rounded-full border border-sky-300/80 bg-white/80 p-1 text-sky-800 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 dark:border-sky-800/60 dark:bg-odp-bgSoft dark:text-sky-200 dark:hover:bg-sky-950/40", Z = "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft", ee = "mt-1.5 inline-flex items-center gap-1.5 rounded border border-sky-300/80 bg-sky-50 px-2 py-1 text-[10px] font-medium text-sky-900 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-100 dark:hover:bg-sky-950/60", st = {
    brew: "brew install llama.cpp",
    official: "official install script",
    scoop: "scoop install llama.cpp (versions)"
  }, lt = ka.map((t) => ({
    value: t.id,
    label: t.label
  }));
  function Oe() {
    return Ne() || Ae();
  }
  function rt({ toolkit: t, onRefresh: n }) {
    const [l, r] = a.useState(null), [m, p] = a.useState(null), [f, x] = a.useState(""), [y, k] = a.useState(false), [P, c] = a.useState(false), [b, j] = a.useState(null), [v, z] = a.useState(false), [S, h] = a.useState("auto"), [N, B] = a.useState(null), E = (t == null ? void 0 : t.binaryAvailable) === true, C = Ne(), w = Ae();
    a.useEffect(() => {
      if (!v || !w) return;
      let d = false;
      return ca().then((g) => {
        d || B(g);
      }), () => {
        d = true;
      };
    }, [
      v,
      w
    ]);
    const A = a.useMemo(() => pa(S, (N == null ? void 0 : N.cuda) ?? null), [
      S,
      N
    ])[0] ?? "llama.cpp-cpu", _ = (N == null ? void 0 : N.cuda) ? `CUDA ${ma(N.cuda)}` : (N == null ? void 0 : N.nvidiaSmiAvailable) ? "CUDA version unknown" : "CUDA not detected", L = a.useCallback(async (d, g) => {
      r(d), p(d), x(""), k(true), c(false);
      try {
        await g({
          onOutput: (I) => {
            x((R) => R + I);
          }
        }), x((I) => `${I}
[done] install finished.
`), await n();
      } catch (I) {
        if (ua(I)) {
          x(($) => `${$}
[aborted] install cancelled.
`);
          return;
        }
        const R = I instanceof Error ? I.message : "Install failed.";
        x(($) => `${$}${R}
`);
      } finally {
        r(null);
      }
    }, [
      n
    ]), M = a.useCallback((d, g) => {
      if (l) {
        l === d && (z(false), j(d));
        return;
      }
      L(d, g);
    }, [
      l,
      L
    ]), i = a.useCallback(async () => {
      const d = b;
      if (j(null), !!d) try {
        await xa(d);
      } catch (g) {
        const I = g instanceof Error ? g.message : "Failed to abort install.";
        x((R) => `${R}${I}
`);
      }
    }, [
      b
    ]);
    return Oe() ? e.jsxs(e.Fragment, {
      children: [
        e.jsxs(Ga, {
          open: v,
          onOpenChange: z,
          children: [
            e.jsx($a, {
              asChild: true,
              children: e.jsx("button", {
                type: "button",
                className: tt,
                "aria-label": "llama.cpp \uC124\uCE58 \uB3C4\uC6C0\uB9D0",
                children: e.jsx(Fa, {
                  size: 14
                })
              })
            }),
            e.jsx(Ua, {
              children: e.jsxs(Va, {
                side: "left",
                sideOffset: 8,
                className: at,
                onPointerDownOutside: (d) => {
                  const g = d.target;
                  g instanceof Element && g.closest("[data-radix-select-content]") && d.preventDefault();
                },
                onFocusOutside: (d) => {
                  const g = d.target;
                  g instanceof Element && g.closest("[data-radix-select-content]") && d.preventDefault();
                },
                children: [
                  e.jsx("p", {
                    className: "mb-2 font-semibold text-gray-800 dark:text-odp-fgStrong",
                    children: "llama-server \uC124\uCE58"
                  }),
                  e.jsxs("ol", {
                    className: "list-decimal space-y-2 pl-4",
                    children: [
                      C ? e.jsxs(e.Fragment, {
                        children: [
                          e.jsxs("li", {
                            children: [
                              "Homebrew",
                              e.jsx("pre", {
                                className: Z,
                                children: "brew install llama.cpp"
                              }),
                              !E || l === "brew" ? e.jsxs("button", {
                                type: "button",
                                className: ee,
                                disabled: l != null && l !== "brew",
                                onClick: () => M("brew", ba),
                                children: [
                                  l === "brew" ? e.jsx(V, {
                                    size: 12,
                                    className: "animate-spin"
                                  }) : null,
                                  l === "brew" ? "\uC124\uCE58 \uC911\u2026 (\uB2E4\uC2DC \uB204\uB974\uBA74 Abort)" : "brew\uB85C \uC124\uCE58"
                                ]
                              }) : e.jsxs("p", {
                                className: "mt-1 text-[10px] text-sky-700 dark:text-sky-300",
                                children: [
                                  "llama-server ready",
                                  (t == null ? void 0 : t.binaryPath) ? `: ${t.binaryPath}` : ""
                                ]
                              })
                            ]
                          }),
                          e.jsxs("li", {
                            children: [
                              "Official installer",
                              e.jsx("pre", {
                                className: Z,
                                children: "curl -LsSf https://llama.app/install.sh | sh"
                              }),
                              e.jsxs("p", {
                                className: "mt-1 text-[10px] text-gray-500 dark:text-odp-muted",
                                children: [
                                  "Installs ",
                                  e.jsx("code", {
                                    className: "rounded px-0.5",
                                    children: "llama-server"
                                  }),
                                  " into",
                                  " ",
                                  e.jsx("code", {
                                    className: "rounded px-0.5",
                                    children: "~/.local/bin"
                                  }),
                                  "."
                                ]
                              }),
                              !E || l === "official" ? e.jsxs("button", {
                                type: "button",
                                className: ee,
                                disabled: l != null && l !== "official",
                                onClick: () => M("official", fa),
                                children: [
                                  l === "official" ? e.jsx(V, {
                                    size: 12,
                                    className: "animate-spin"
                                  }) : null,
                                  l === "official" ? "\uC124\uCE58 \uC911\u2026 (\uB2E4\uC2DC \uB204\uB974\uBA74 Abort)" : "\uACF5\uC2DD \uC124\uCE58 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589"
                                ]
                              }) : null
                            ]
                          })
                        ]
                      }) : null,
                      w ? e.jsxs(e.Fragment, {
                        children: [
                          e.jsxs("li", {
                            children: [
                              "Scoop (versions bucket)",
                              e.jsxs("p", {
                                className: "mt-1 text-[10px] text-gray-500 dark:text-odp-muted",
                                children: [
                                  "extras\uC758 ",
                                  e.jsx("code", {
                                    className: "rounded px-0.5",
                                    children: "llama.cpp"
                                  }),
                                  "\uB294 \uB354 \uC774\uC0C1 \uC5C6\uC2B5\uB2C8\uB2E4. CUDA\uAC00 \uC788\uC73C\uBA74 ",
                                  e.jsx("code", {
                                    className: "rounded px-0.5",
                                    children: "llama.cpp-cuXX"
                                  }),
                                  ", \uC5C6\uC73C\uBA74",
                                  " ",
                                  e.jsx("code", {
                                    className: "rounded px-0.5",
                                    children: "llama.cpp-cpu"
                                  }),
                                  "\uB97C \uC124\uCE58\uD569\uB2C8\uB2E4."
                                ]
                              }),
                              e.jsxs("p", {
                                className: "mt-1 text-[10px] text-gray-600 dark:text-odp-fg",
                                children: [
                                  "\uAC10\uC9C0: ",
                                  _
                                ]
                              }),
                              e.jsxs("label", {
                                className: "mt-1.5 block text-[10px] font-medium text-gray-600 dark:text-odp-muted",
                                children: [
                                  "\uBC31\uC5D4\uB4DC",
                                  e.jsx(ga, {
                                    className: "mt-0.5 w-full",
                                    triggerClassName: "h-7 w-full text-[10px]",
                                    "aria-label": "llama.cpp scoop backend",
                                    value: S,
                                    options: lt,
                                    onValueChange: (d) => {
                                      ha(d) && h(d);
                                    }
                                  })
                                ]
                              }),
                              e.jsx("pre", {
                                className: Z,
                                children: `scoop bucket add versions
scoop install ${A}`
                              }),
                              !E || l === "scoop" ? e.jsxs("button", {
                                type: "button",
                                className: ee,
                                disabled: l != null && l !== "scoop",
                                onClick: () => M("scoop", (d) => ya({
                                  ...d,
                                  backend: S
                                })),
                                children: [
                                  l === "scoop" ? e.jsx(V, {
                                    size: 12,
                                    className: "animate-spin"
                                  }) : null,
                                  l === "scoop" ? "\uC124\uCE58 \uC911\u2026 (\uB2E4\uC2DC \uB204\uB974\uBA74 Abort)" : `scoop\uC73C\uB85C ${A} \uC124\uCE58`
                                ]
                              }) : e.jsxs("p", {
                                className: "mt-1 text-[10px] text-sky-700 dark:text-sky-300",
                                children: [
                                  "llama-server ready",
                                  (t == null ? void 0 : t.binaryPath) ? `: ${t.binaryPath}` : ""
                                ]
                              })
                            ]
                          }),
                          e.jsxs("li", {
                            children: [
                              "GitHub Releases",
                              e.jsxs("p", {
                                className: "mt-1 text-[10px]",
                                children: [
                                  "Download a Windows zip with",
                                  " ",
                                  e.jsx("code", {
                                    className: "rounded px-0.5",
                                    children: "llama-server.exe"
                                  }),
                                  ", extract it, and add the folder to PATH or set the binary path in Settings."
                                ]
                              }),
                              e.jsx("a", {
                                href: et,
                                className: "mt-1 inline-block text-[10px] font-medium text-sky-700 underline dark:text-sky-300",
                                target: "_blank",
                                rel: "noreferrer",
                                children: "ggml-org/llama.cpp releases"
                              })
                            ]
                          })
                        ]
                      }) : null
                    ]
                  }),
                  e.jsxs("p", {
                    className: "mt-2 text-[10px] text-gray-500 dark:text-odp-muted",
                    children: [
                      "Detected: ",
                      (t == null ? void 0 : t.binaryPath) || "none"
                    ]
                  }),
                  e.jsx("button", {
                    type: "button",
                    className: "mt-2 text-[10px] font-medium text-sky-700 underline dark:text-sky-300",
                    onClick: () => {
                      n();
                    },
                    children: "Re-probe binary"
                  }),
                  e.jsx(Ka, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        }),
        e.jsx(Za, {
          open: y,
          minimized: P,
          action: m,
          ...m === "scoop" ? {
            heading: `scoop install ${A}`
          } : {},
          log: f,
          running: l != null,
          onMinimize: () => c(true),
          onExpand: () => {
            c(false), k(true);
          },
          onClose: () => {
            l || (k(false), c(false), p(null));
          }
        }),
        e.jsx(U, {
          isOpen: !!b,
          title: "Abort install?",
          message: b ? `Stop the in-progress ${st[b]}?` : "",
          confirmLabel: "Abort",
          cancelLabel: "Continue",
          variant: "danger",
          onConfirm: () => {
            i();
          },
          onCancel: () => j(null)
        })
      ]
    }) : null;
  }
  function nt({ toolkit: t, cliAvailable: n, cliDetail: l, runtimeLoaded: r, loadedModel: m, serverRunning: p = false, baseUrl: f, onRefresh: x }) {
    const y = Oe();
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "mb-1 flex items-start justify-between gap-3",
          children: [
            e.jsxs("p", {
              className: "text-xs leading-relaxed text-gray-600 dark:text-odp-muted",
              children: [
                "Tauri desktop\uC5D0\uC11C ",
                e.jsx("code", {
                  className: "rounded bg-white/80 px-1 dark:bg-odp-bgSoft",
                  children: "llama-server"
                }),
                "\uB97C spawn\uD558\uACE0 OpenAI \uD638\uD658 ",
                e.jsx("code", {
                  className: "rounded bg-white/80 px-1 dark:bg-odp-bgSoft",
                  children: "/v1/chat/completions"
                }),
                "API\uB85C LLM Assist\uC5D0 \uC5F0\uACB0\uD569\uB2C8\uB2E4."
              ]
            }),
            y ? e.jsx(rt, {
              toolkit: t,
              onRefresh: x
            }) : null
          ]
        }),
        e.jsxs("div", {
          className: "flex flex-wrap items-center gap-2 text-[11px]",
          children: [
            e.jsxs("span", {
              className: [
                "rounded-full px-2 py-0.5 font-medium",
                n ? "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"
              ].join(" "),
              children: [
                "llama-server: ",
                n ? "ready" : "missing"
              ]
            }),
            e.jsxs("span", {
              className: [
                "rounded-full px-2 py-0.5 font-medium",
                r ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200" : p ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"
              ].join(" "),
              children: [
                "Runtime:",
                " ",
                r ? `running \xB7 ${m}` : p ? "starting" : "stopped"
              ]
            }),
            f ? e.jsx("span", {
              className: "rounded-full bg-gray-200 px-2 py-0.5 font-medium text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted",
              children: f
            }) : null
          ]
        }),
        !n && l ? e.jsxs("p", {
          className: "text-[11px] text-amber-700 dark:text-amber-300",
          children: [
            l,
            y ? e.jsxs(e.Fragment, {
              children: [
                " ",
                "\xB7 \uC6B0\uCE21 ",
                e.jsx("span", {
                  className: "font-medium",
                  children: "?"
                }),
                " \uB3C4\uC6C0\uB9D0\uC744 \uD655\uC778\uD558\uC138\uC694."
              ]
            }) : null
          ]
        }) : n && l ? e.jsx("p", {
          className: "text-[10px] text-gray-500 dark:text-odp-muted",
          children: l
        }) : null
      ]
    });
  }
  function ot() {
    return e.jsxs("span", {
      className: "flex min-w-0 items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
      children: [
        e.jsx(Ha, {
          size: 16
        }),
        "llama.cpp (Tauri desktop)"
      ]
    });
  }
  vt = function() {
    const t = We(), [n, l] = a.useState(false), [r, m] = a.useState(true), [p, f] = a.useState(true), [x, y] = a.useState(true), [k, P] = a.useState(true), [c, b] = a.useState(() => xe()), [j, v] = a.useState(null), [z, S] = a.useState(null), [h, N] = a.useState({
      loaded: false,
      serverRunning: false,
      models: [],
      running: false,
      baseUrl: null
    }), [B, E] = a.useState(false), C = a.useCallback(async () => {
      const [i, d] = await Promise.all([
        ja(c),
        va(c)
      ]);
      v(i), S({
        available: i.available,
        ...i.detail ? {
          detail: i.detail
        } : {}
      }), N(d);
    }, [
      c
    ]), w = a.useCallback(async () => {
      E(true), P(true);
      try {
        await Ca(c), wa();
      } catch (i) {
        Sa(i).suggestRedownload && (La(c.selectedModelId), l(true), f(true)), alert(Na(i, c.selectedModelId));
      } finally {
        E(false), await C();
      }
    }, [
      C,
      c
    ]), H = a.useCallback(async () => {
      E(true);
      try {
        await Aa();
      } catch (i) {
        alert(i instanceof Error ? i.message : "Failed to stop llama.cpp server.");
      } finally {
        E(false), await C();
      }
    }, [
      C
    ]);
    if (a.useEffect(() => {
      C();
      const i = window.setInterval(() => {
        C();
      }, 5e3);
      return () => window.clearInterval(i);
    }, [
      C
    ]), a.useEffect(() => {
      const i = () => b(xe());
      return window.addEventListener(be, i), () => window.removeEventListener(be, i);
    }, []), a.useEffect(() => {
      t.hash.replace(/^#/, "") === "settings-llama-cpp" && l(true);
    }, [
      t.hash
    ]), a.useEffect(() => {
      const i = (d) => {
        var _a2;
        ((_a2 = d.detail) == null ? void 0 : _a2.sectionId) === "settings-llama-cpp" && l(true);
      };
      return window.addEventListener(fe, i), () => window.removeEventListener(fe, i);
    }, []), !Se()) return null;
    const A = (j == null ? void 0 : j.available) === true, _ = (j == null ? void 0 : j.hfDownloadAvailable) === true, L = h.models[0] || ge(c) || "\uBAA8\uB378 \uBBF8\uC120\uD0DD", M = (i) => {
      Oa(i), b(i);
    };
    return e.jsxs(ve, {
      id: "settings-llama-cpp",
      contentKey: "settings-llama-cpp-panel",
      open: n,
      onOpenChange: l,
      tabIndex: -1,
      className: "scroll-mt-4 rounded-lg border border-sky-200 bg-sky-50/70 dark:border-sky-900/50 dark:bg-sky-950/25",
      children: [
        e.jsx(Ce, {
          unstyled: true,
          className: "flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-sky-100/50 dark:hover:bg-sky-950/30",
          children: e.jsx(ot, {})
        }),
        e.jsx(we, {
          children: e.jsxs("div", {
            className: "space-y-3 border-t border-sky-200/80 px-4 pb-4 pt-3 dark:border-sky-900/40",
            children: [
              e.jsx(nt, {
                toolkit: j,
                cliAvailable: A,
                ...(z == null ? void 0 : z.detail) ? {
                  cliDetail: z.detail
                } : {},
                runtimeLoaded: h.loaded,
                loadedModel: L,
                serverRunning: h.serverRunning,
                baseUrl: h.baseUrl,
                onRefresh: C
              }),
              e.jsx(F, {
                title: "\uC5F0\uACB0",
                subtitle: "host \xB7 port \xB7 binary \xB7 API key",
                open: r,
                onOpenChange: m,
                children: e.jsx(Wa, {
                  settings: c,
                  disabled: B || h.loaded,
                  onChange: M
                })
              }),
              e.jsx(F, {
                title: "\uBAA8\uB378",
                subtitle: "GGUF \xB7 \uAC80\uC0C9 \xB7 \uB2E4\uC6B4\uB85C\uB4DC",
                open: p,
                onOpenChange: f,
                children: e.jsx(qa, {
                  settings: c,
                  onSettingsChange: M,
                  downloadReady: _,
                  disabled: B
                })
              }),
              e.jsxs(F, {
                title: "\uB7F0\uD0C0\uC784",
                subtitle: h.loaded ? `running \xB7 ${L}` : h.serverRunning ? "starting" : "stopped",
                open: x,
                onOpenChange: y,
                children: [
                  e.jsx(Qa, {
                    busy: B,
                    cliAvailable: A,
                    canStart: !!ge(c),
                    runtimeLoaded: h.loaded,
                    serverRunning: h.serverRunning,
                    loadedModels: h.models,
                    onStart: w,
                    onStop: H
                  }),
                  e.jsx(Ja, {
                    serverRunning: h.serverRunning,
                    managedByApp: Ia(),
                    open: k,
                    onOpenChange: P
                  })
                ]
              })
            ]
          })
        })
      ]
    });
  };
});
export {
  __tla,
  vt as default
};
