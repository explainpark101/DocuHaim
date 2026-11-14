const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/webviewWindow-BUZMX_UD.js","assets/webview-BBbTmcoI.js","assets/window-DOx76Tv8.js","assets/core-BUhCcD2K.js","assets/event-Cs6lN1fb.js","assets/image-DfyZ6glJ.js"])))=>i.map(i=>d[i]);
import { _ as I } from "./vendor-aws-hJDgVEKM.js";
import { e as S, c as Bt, __tla as __tla_0 } from "./bootSplash-Z2krRgC9.js";
import { r as n, j as e, a as Vt, __tla as __tla_1 } from "./vendor-react-BPvvDyqO.js";
import { bj as Ke, O as Gt, aj as Yt, K as qt, bg as Ht, dp as Jt, e as ke, Q as Xt, g as ve, L as Zt, i as Qt, t as We, u as er, f as tr, k as rr, dq as ar, dr as sr, __tla as __tla_2 } from "./index-BebLgvYF.js";
import { u as nr, M as or } from "./useLazyMermaidRender-BEGREvhj.js";
import { O as Ue, M as ir, G as lr, __tla as __tla_3 } from "./OpenAiCompatibleModelSelect-BuEuB2ht.js";
import { L as dr, a as cr } from "./LlamaCppModelSelect-DP1c1DGV.js";
import { aa as ur, V as nt, X as Ce, ab as pr, x as Be, f as mr, ac as xr, T as ot, a8 as Ve, a as it, O as lt, ad as br, ae as fr, af as gr, K as hr, Z as yr, L as je, ag as kr, ah as vr, ai as jr, aj as wr, ak as Sr, w as Nr, al as _r, v as Cr, S as Ge, l as Lr, E as Ar, am as Ye, an as Er, ao as Tr, k as Or, ap as Pr, n as Rr } from "./vendor-lucide-B8TfEQX9.js";
import { p as Ir, q as Dr, r as Mr, E as zr, G as $r, H as qe, I as He, v as dt, V as Fr, W as Kr, X as Wr, Y as Ur, Z as Br, _ as Vr, a0 as Gr, a1 as Yr, w as le, x as de, y as ce, z as ue, A as pe, a2 as qr, a3 as Hr, a4 as Jr, a5 as Xr, a6 as Zr, a7 as Qr, a8 as ea, a9 as ta, aa as ra } from "./vendor-radix-CN5WtDh3.js";
import { r as we, a as aa, e as sa } from "./llmAssistImages-DG7rjEWr.js";
import { E as ne, j as na, x as oa, y as ia, z as la, A as da, b as ca, a as ua, k as pa, d as ma, h as xa, G as ba } from "./vendor-codemirror-V7b8BJE-.js";
import { A as ct, m as _e } from "./vendor-motion-Bv-XITR_.js";
import { e as J, r as oe, f as X, p as Se, n as ut, h as pt, j as fa, k as ga } from "./openaiCompatibleClient-BOKYLH0M.js";
import { I as ha, a as ya } from "./ImageLightboxDownloadButton-C0tAjkn5.js";
let Ha, Es, ks, vs, Os, k, hs, _s, Ss, ys, Ns, Ls, js, Cs, ws, Ts, As;
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
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })()
]).then(async () => {
  const ka = "size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-violet-500 data-[state=checked]:bg-violet-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", va = "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white";
  function ja(t) {
    return t === Gt ? "classification" : "regression";
  }
  function Je({ label: t, file: r, onPick: a, onClear: l }) {
    const s = n.useRef(null);
    return e.jsxs("div", {
      className: "space-y-1",
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap items-center justify-between gap-x-2 gap-y-1",
          children: [
            e.jsx("span", {
              className: "shrink-0 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
              children: t
            }),
            e.jsxs("div", {
              className: "flex min-w-0 flex-wrap items-center justify-end gap-1",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => {
                    var _a2;
                    return (_a2 = s.current) == null ? void 0 : _a2.click();
                  },
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(nt, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "CSV \uC120\uD0DD"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: l,
                  disabled: !r,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(Ce, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC9C0\uC6B0\uAE30"
                  ]
                })
              ]
            })
          ]
        }),
        e.jsx("input", {
          ref: s,
          type: "file",
          accept: ".csv,text/csv",
          className: "hidden",
          onChange: (i) => {
            var _a2;
            const o = ((_a2 = i.target.files) == null ? void 0 : _a2[0]) ?? null;
            a(o), i.target.value = "";
          }
        }),
        e.jsx("p", {
          className: "truncate rounded border border-dashed border-gray-300 bg-white/80 px-2 py-1.5 text-[11px] text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60 dark:text-odp-muted",
          children: r ? `${r.name} \xB7 ${(r.size / 1024).toFixed(1)} KB` : "\uC120\uD0DD\uB41C \uD30C\uC77C \uC5C6\uC74C"
        })
      ]
    });
  }
  hs = function(t = "classification") {
    return {
      trainFile: null,
      testFile: null,
      targetColumn: "target",
      outputType: t === "classification" ? "class" : "point"
    };
  };
  function wa({ modelId: t, value: r, onChange: a }) {
    const l = n.useMemo(() => ja(t), [
      t
    ]), s = l === "classification" ? [
      {
        value: "class",
        label: "class (\uB77C\uBCA8)"
      },
      {
        value: "probability",
        label: "probability (\uD655\uB960)"
      }
    ] : [
      {
        value: "point",
        label: "point (\uC810 \uC608\uCE21)"
      },
      {
        value: "full",
        label: "full (\uBD84\uC704\uC218 \uBD84\uD3EC)"
      }
    ];
    return n.useEffect(() => {
      (l === "classification" ? /* @__PURE__ */ new Set([
        "class",
        "probability"
      ]) : /* @__PURE__ */ new Set([
        "point",
        "full"
      ])).has(r.outputType) || a({
        ...r,
        outputType: l === "classification" ? "class" : "point"
      });
    }, [
      a,
      l,
      r.outputType
    ]), e.jsxs("div", {
      className: "space-y-2.5",
      children: [
        e.jsxs("section", {
          className: Ke("sky", {
            compact: true
          }),
          "aria-label": "EXAONE Tabular CSV",
          children: [
            e.jsxs("div", {
              className: "flex items-start gap-2",
              children: [
                e.jsx(ur, {
                  size: 14,
                  className: "mt-0.5 shrink-0 text-sky-700 dark:text-sky-300",
                  "aria-hidden": true
                }),
                e.jsxs("div", {
                  className: "min-w-0 space-y-1",
                  children: [
                    e.jsxs("p", {
                      className: "text-[11px] font-semibold text-sky-950 dark:text-sky-100",
                      children: [
                        "EXAONE Tabular \xB7 ",
                        l
                      ]
                    }),
                    e.jsxs("p", {
                      className: "text-[10px] leading-snug text-sky-900/80 dark:text-sky-100/80",
                      children: [
                        "\uD559\uC2B5 CSV\uC640 \uC608\uCE21 CSV\uB97C \uC5C5\uB85C\uB4DC\uD569\uB2C8\uB2E4. Bearer API \uD0A4\uB85C",
                        " ",
                        e.jsxs("code", {
                          className: "rounded bg-white/70 px-1 dark:bg-odp-bgSoft",
                          children: [
                            "/v1/tabular/",
                            l
                          ]
                        }),
                        " ",
                        "\uC744 \uD638\uCD9C\uD569\uB2C8\uB2E4."
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsx(Je, {
              label: "\uD559\uC2B5 CSV (train_file)",
              file: r.trainFile,
              onPick: (i) => a({
                ...r,
                trainFile: i
              }),
              onClear: () => a({
                ...r,
                trainFile: null
              })
            }),
            e.jsx(Je, {
              label: "\uC608\uCE21 CSV (test_file)",
              file: r.testFile,
              onPick: (i) => a({
                ...r,
                testFile: i
              }),
              onClear: () => a({
                ...r,
                testFile: null
              })
            })
          ]
        }),
        e.jsxs("section", {
          className: Ke("violet", {
            compact: true
          }),
          "aria-label": "EXAONE Tabular options",
          children: [
            e.jsxs("label", {
              className: "block space-y-1",
              children: [
                e.jsx("span", {
                  className: "text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
                  children: "\uD0C0\uAE43 \uCEEC\uB7FC (target_columns)"
                }),
                e.jsx("input", {
                  type: "text",
                  autoComplete: "off",
                  value: r.targetColumn,
                  onChange: (i) => a({
                    ...r,
                    targetColumn: i.target.value
                  }),
                  placeholder: "\uC608: churn, price",
                  className: "w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx("p", {
                  className: "mb-1.5 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
                  children: "\uCD9C\uB825 \uC720\uD615 (output_type)"
                }),
                e.jsx(Ir, {
                  className: "flex flex-wrap items-center gap-3",
                  value: r.outputType,
                  onValueChange: (i) => {
                    s.some((o) => o.value === i) && a({
                      ...r,
                      outputType: i
                    });
                  },
                  "aria-label": "EXAONE Tabular output type",
                  children: s.map((i) => e.jsxs("label", {
                    className: "flex cursor-pointer items-center gap-1.5 text-[11px] text-gray-700 dark:text-odp-fg",
                    children: [
                      e.jsx(Dr, {
                        value: i.value,
                        className: ka,
                        children: e.jsx(Mr, {
                          className: va
                        })
                      }),
                      e.jsx("span", {
                        children: i.label
                      })
                    ]
                  }, i.value))
                })
              ]
            }),
            e.jsxs("p", {
              className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
              children: [
                "\uCC38\uACE0:",
                " ",
                e.jsx("a", {
                  href: "https://docs.exaone.ai/ko/docs/exaone-tabular",
                  target: "_blank",
                  rel: "noreferrer",
                  className: "underline",
                  children: "EXAONE Tabular \uBB38\uC11C"
                })
              ]
            })
          ]
        })
      ]
    });
  }
  let Q;
  Q = "s3haim-llm-assist";
  k = {
    READY: `${Q}:ready`,
    SYNC: `${Q}:sync`,
    ACTION: `${Q}:action`,
    PARENT_CLOSING: `${Q}:parent-closing`
  };
  function Sa(t) {
    return !!(t && typeof t.type == "string" && t.type.startsWith(Q));
  }
  function Na() {
    if (S()) {
      const a = new URL(window.location.href);
      return a.hash = "#/llm-assist-popout", a.toString();
    }
    const r = `${"/DocuHaim/".replace(/\/$/, "") || "/"}/llm-assist-popout`.replace(/\/+/g, "/");
    return new URL(r, window.location.origin).toString();
  }
  const mt = "s3haim-llm-assist", xt = "popup=yes,width=480,height=820,menubar=no,toolbar=no,location=no,status=no,resizable=yes";
  function me(t, r, a = {}) {
    !t || t.closed || t.postMessage({
      type: r,
      ...a
    }, window.location.origin);
  }
  const ee = mt, bt = "main";
  function Y(t) {
    if (!Sa(t)) return null;
    const r = t, a = {
      type: String(r.type)
    };
    return r.state && typeof r.state == "object" && (a.state = r.state), typeof r.action == "string" && (a.action = r.action), r.payload && typeof r.payload == "object" && (a.payload = r.payload), a;
  }
  function _a(t) {
    const r = {};
    for (const a of t.split(",")) {
      const [l, s] = a.trim().split("="), i = l == null ? void 0 : l.trim().toLowerCase(), o = s == null ? void 0 : s.trim();
      !i || !o || (i === "width" && (r.width = Number(o)), i === "height" && (r.height = Number(o)), i === "resizable" && (r.resizable = o === "yes" || o === "true" || o === "1"));
    }
    return r;
  }
  async function Le() {
    const { WebviewWindow: t } = await I(async () => {
      const { WebviewWindow: r } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        WebviewWindow: r
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return t.getByLabel(ee);
  }
  ys = async function() {
    if (!S()) return false;
    const { getCurrentWebviewWindow: t } = await I(async () => {
      const { getCurrentWebviewWindow: r } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        getCurrentWebviewWindow: r
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return t().label === ee;
  };
  ks = async function() {
    if (!S()) return true;
    const { WebviewWindow: t } = await I(async () => {
      const { WebviewWindow: a } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        WebviewWindow: a
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return await t.getByLabel(bt) !== null;
  };
  async function Ca() {
    const { WebviewWindow: t } = await I(async () => {
      const { WebviewWindow: s } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        WebviewWindow: s
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), r = await t.getByLabel(ee);
    if (r) return await r.setFocus(), true;
    const a = _a(xt), l = new t(ee, {
      url: "/#/llm-assist-popout",
      width: a.width ?? 480,
      height: a.height ?? 820,
      resizable: a.resizable ?? true,
      center: true,
      title: "AI \uB3C4\uC6B0\uBBF8"
    });
    return await new Promise((s) => {
      let i = false;
      const o = (u) => {
        i || (i = true, s(u));
      };
      l.once("tauri://created", () => o(true)), l.once("tauri://error", (u) => {
        console.warn("LLM assist Tauri popout failed:", u), o(false);
      }), window.setTimeout(() => o(true), 4e3);
    });
  }
  async function La() {
    const t = await Le();
    t && await t.setFocus();
  }
  async function Aa() {
    return await Le() !== null;
  }
  async function ft() {
    const t = await Le();
    if (t) try {
      await t.close();
    } catch {
    }
  }
  vs = async function() {
    if (!S()) return;
    const { getCurrentWebviewWindow: t } = await I(async () => {
      const { getCurrentWebviewWindow: r } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        getCurrentWebviewWindow: r
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    try {
      await t().close();
    } catch {
    }
  };
  function gt(t, r = {}) {
    (async () => {
      try {
        const { emitTo: a } = await I(async () => {
          const { emitTo: l } = await import("./event-Cs6lN1fb.js");
          return {
            emitTo: l
          };
        }, __vite__mapDeps([4,3]));
        await a(ee, t, r);
      } catch (a) {
        console.warn("LLM assist emit to popout failed:", a);
      }
    })();
  }
  function ht(t, r = {}) {
    (async () => {
      try {
        const { emitTo: a } = await I(async () => {
          const { emitTo: l } = await import("./event-Cs6lN1fb.js");
          return {
            emitTo: l
          };
        }, __vite__mapDeps([4,3]));
        await a(bt, t, r);
      } catch (a) {
        console.warn("LLM assist emit to main failed:", a);
      }
    })();
  }
  async function Ea(t) {
    const { getCurrentWebviewWindow: r } = await I(async () => {
      const { getCurrentWebviewWindow: i } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        getCurrentWebviewWindow: i
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), a = r(), l = await a.listen(k.READY, (i) => {
      const o = Y({
        type: k.READY,
        ...i.payload
      });
      o && t(o);
    }), s = await a.listen(k.ACTION, (i) => {
      const o = Y({
        type: k.ACTION,
        ...i.payload
      });
      o && t(o);
    });
    return () => {
      l(), s();
    };
  }
  async function Ta(t) {
    const { getCurrentWebviewWindow: r } = await I(async () => {
      const { getCurrentWebviewWindow: i } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        getCurrentWebviewWindow: i
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), a = r(), l = await a.listen(k.SYNC, (i) => {
      const o = Y({
        type: k.SYNC,
        ...i.payload
      });
      o && t(o);
    }), s = await a.listen(k.PARENT_CLOSING, (i) => {
      const o = Y({
        type: k.PARENT_CLOSING,
        ...i.payload
      });
      o && t(o);
    });
    return () => {
      l(), s();
    };
  }
  js = async function(t) {
    if (S()) {
      await La();
      return;
    }
    t && !t.closed && t.focus();
  };
  ws = async function() {
    if (S()) return await Ca() ? "tauri" : null;
    const t = Na();
    return window.open(t, mt, xt);
  };
  Ss = async function(t) {
    if (S()) {
      await ft();
      return;
    }
    if (t && !t.closed) try {
      t.close();
    } catch {
    }
  };
  Ns = async function(t) {
    return S() ? Aa() : !!(t && !t.closed);
  };
  _s = function(t, r) {
    if (S()) {
      gt(k.SYNC, {
        state: r
      });
      return;
    }
    !t || t.closed || me(t, k.SYNC, {
      state: r
    });
  };
  Cs = function(t) {
    if (S()) {
      gt(k.PARENT_CLOSING, {}), ft();
      return;
    }
    if (!(!t || t.closed)) {
      me(t, k.PARENT_CLOSING);
      try {
        t.close();
      } catch {
      }
    }
  };
  Ls = async function(t) {
    if (S()) return Ea(t);
    const r = (a) => {
      if (a.origin !== window.location.origin) return;
      const l = Y(a.data);
      l && (l.type === k.READY || l.type === k.ACTION) && (l.source = a.source && typeof a.source.postMessage == "function" ? a.source : null, t(l));
    };
    return window.addEventListener("message", r), () => window.removeEventListener("message", r);
  };
  As = async function(t) {
    if (S()) return Ta(t);
    const r = (a) => {
      if (a.origin !== window.location.origin) return;
      const l = Y(a.data);
      l && (l.type === k.SYNC || l.type === k.PARENT_CLOSING) && t(l);
    };
    return window.addEventListener("message", r), () => window.removeEventListener("message", r);
  };
  Es = function() {
    if (S()) {
      ht(k.READY, {});
      return;
    }
    !window.opener || window.opener.closed || me(window.opener, k.READY);
  };
  Ts = function(t, r = {}) {
    if (S()) {
      ht(k.ACTION, {
        action: t,
        payload: r
      });
      return;
    }
    !window.opener || window.opener.closed || me(window.opener, k.ACTION, {
      action: t,
      payload: r
    });
  };
  function Oa({ value: t, onChange: r, className: a = "" }) {
    const l = n.useRef(null), s = n.useRef(null), i = n.useRef(r);
    return i.current = r, n.useEffect(() => {
      const o = l.current;
      if (!o) return;
      const u = new ne({
        parent: o,
        state: na.create({
          doc: t,
          extensions: [
            ia(),
            la(),
            da(),
            ca(),
            ua(),
            pa.of([
              ...ma,
              ...xa
            ]),
            ba(),
            oa,
            ne.lineWrapping,
            ne.updateListener.of((x) => {
              x.docChanged && i.current(x.state.doc.toString());
            }),
            ne.theme({
              "&": {
                height: "100%",
                fontSize: "12px"
              },
              ".cm-scroller": {
                overflow: "auto",
                fontFamily: "JetBrains Mono, D2Coding, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              },
              "&.cm-focused": {
                outline: "none"
              }
            })
          ]
        })
      });
      return s.current = u, () => {
        u.destroy(), s.current = null;
      };
    }, []), n.useEffect(() => {
      const o = s.current;
      if (!o) return;
      const u = o.state.doc.toString();
      u !== t && o.dispatch({
        changes: {
          from: 0,
          to: u.length,
          insert: t
        }
      });
    }, [
      t
    ]), e.jsx("div", {
      ref: l,
      className: `min-h-0 overflow-hidden rounded border border-gray-700/80 ${a}`
    });
  }
  const Pa = [
    0.4,
    0,
    0.2,
    1
  ];
  function yt({ open: t, children: r, className: a = "" }) {
    return e.jsx(ct, {
      initial: false,
      children: t ? e.jsx(_e.div, {
        initial: {
          height: 0,
          opacity: 0
        },
        animate: {
          height: "auto",
          opacity: 1
        },
        exit: {
          height: 0,
          opacity: 0
        },
        transition: {
          duration: 0.24,
          ease: Pa
        },
        className: `overflow-hidden ${a}`,
        children: r
      }, "llm-assist-collapse") : null
    });
  }
  const Xe = 80, Ra = 350;
  function Ze(t) {
    return JSON.stringify(t);
  }
  function Qe(t) {
    try {
      const r = JSON.parse(t);
      return !r || typeof r != "object" || r.tab !== "fields" && r.tab !== "json" || !Array.isArray(r.entries) || typeof r.jsonText != "string" ? null : r;
    } catch {
      return null;
    }
  }
  function Ia(t) {
    return !Array.isArray(t) || t.length === 0 ? [] : t.length <= Xe ? t : t.slice(t.length - Xe);
  }
  function Da(t, r, a) {
    const l = Array.isArray(t) && t.length > 0 ? t : [];
    if (l.length === 0) return {
      stack: [
        a
      ],
      index: 0,
      changed: true
    };
    const s = Math.max(0, Math.min(r, l.length - 1));
    if (l[s] === a) return {
      stack: l,
      index: s,
      changed: false
    };
    const i = l.slice(0, s + 1);
    i.push(a);
    const o = Ia(i);
    return {
      stack: o,
      index: o.length - 1,
      changed: true
    };
  }
  function Ma({ enabled: t, historyKey: r, tab: a, entries: l, jsonText: s, applySnapshot: i }) {
    const o = n.useRef([]), u = n.useRef(0), x = n.useRef(false), N = n.useRef(false), f = n.useRef(null), h = n.useRef(null), g = n.useRef(i);
    g.current = i;
    const [C, U] = n.useState(0), y = n.useCallback(() => U((b) => b + 1), []), w = n.useCallback(() => {
      f.current && (clearTimeout(f.current), f.current = null);
    }, []), P = n.useCallback(() => Ze({
      tab: a,
      entries: l,
      jsonText: s
    }), [
      l,
      s,
      a
    ]), _ = n.useCallback(() => {
      w();
      const b = h.current;
      if (b == null) return;
      h.current = null;
      const v = Da(o.current, u.current, b);
      v.changed && (o.current = v.stack, u.current = v.index, y());
    }, [
      y,
      w
    ]);
    n.useEffect(() => {
      if (!t) {
        w(), h.current = null, o.current = [], u.current = 0, N.current = false, y();
        return;
      }
      if (r <= 0) return;
      w(), h.current = null;
      const b = Ze({
        tab: a,
        entries: l,
        jsonText: s
      });
      o.current = [
        b
      ], u.current = 0, N.current = true, y();
    }, [
      t,
      r,
      y,
      w
    ]), n.useEffect(() => {
      if (!t || !N.current || x.current) return;
      const b = P();
      if (o.current[u.current] !== b) return h.current = b, w(), f.current = setTimeout(() => {
        f.current = null, _();
      }, Ra), () => {
        w();
      };
    }, [
      w,
      P,
      t,
      _,
      l,
      s,
      a
    ]);
    const B = n.useCallback(() => {
      !t || !N.current || x.current || (h.current = P(), _());
    }, [
      P,
      t,
      _
    ]), L = n.useCallback(() => {
      if (_(), u.current <= 0) return false;
      u.current -= 1;
      const b = o.current[u.current], v = b ? Qe(b) : null;
      return v ? (x.current = true, g.current({
        tab: v.tab,
        entries: v.entries.map((c) => ({
          ...c
        })),
        jsonText: v.jsonText
      }), y(), requestAnimationFrame(() => {
        x.current = false;
      }), true) : false;
    }, [
      y,
      _
    ]), R = n.useCallback(() => {
      if (_(), u.current >= o.current.length - 1) return false;
      u.current += 1;
      const b = o.current[u.current], v = b ? Qe(b) : null;
      return v ? (x.current = true, g.current({
        tab: v.tab,
        entries: v.entries.map((c) => ({
          ...c
        })),
        jsonText: v.jsonText
      }), y(), requestAnimationFrame(() => {
        x.current = false;
      }), true) : false;
    }, [
      y,
      _
    ]), T = t && N.current && u.current > 0, $ = t && N.current && u.current < o.current.length - 1;
    return {
      undo: L,
      redo: R,
      canUndo: T,
      canRedo: $,
      recordNow: B
    };
  }
  const za = {
    temperature: {
      summary: "\uCD9C\uB825 \uBB34\uC791\uC704\uC131(\uCC3D\uC758\uC131)\uC744 \uC870\uC808\uD569\uB2C8\uB2E4.",
      detail: "\uB0AE\uC744\uC218\uB85D \uACB0\uC815\uC801\uC774\uACE0 \uC77C\uAD00\uB41C \uB2F5\uBCC0, \uB192\uC744\uC218\uB85D \uB2E4\uC591\uD558\uACE0 \uCC3D\uC758\uC801\uC778 \uB2F5\uBCC0\uC774 \uB098\uC635\uB2C8\uB2E4. \uC77C\uBC18\uC801\uC73C\uB85C 0~2 \uBC94\uC704\uB97C \uC0AC\uC6A9\uD558\uBA70, top_p\uC640 \uB3D9\uC2DC\uC5D0 \uD06C\uAC8C \uC870\uC815\uD558\uC9C0 \uC54A\uB294 \uAC83\uC774 \uC88B\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.4)"
    },
    top_p: {
      summary: "\uB204\uC801 \uD655\uB960 \uC0C1\uC704 \uD1A0\uD070\uB9CC \uC0D8\uD50C\uB9C1\uD569\uB2C8\uB2E4.",
      detail: "nucleus sampling\uC73C\uB85C, \uB204\uC801 \uD655\uB960\uC774 top_p \uC774\uD558\uC778 \uD1A0\uD070 \uC9D1\uD569\uC5D0\uC11C\uB9CC \uB2E4\uC74C \uD1A0\uD070\uC744 \uACE0\uB985\uB2C8\uB2E4. 0~1 \uBC94\uC704\uC774\uBA70 temperature \uB300\uC2E0 \uC774 \uAC12\uB9CC \uC870\uC815\uD558\uB294 \uACBD\uC6B0\uAC00 \uB9CE\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.9)"
    },
    top_k: {
      summary: "\uC0C1\uC704 K\uAC1C \uD1A0\uD070\uB9CC \uD6C4\uBCF4\uB85C \uC81C\uD55C\uD569\uB2C8\uB2E4.",
      detail: "\uAC00\uC7A5 \uD655\uB960\uC774 \uB192\uC740 K\uAC1C \uD1A0\uD070\uB9CC \uB2E4\uC74C \uD1A0\uD070 \uD6C4\uBCF4\uB85C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. OpenAI \uACF5\uC2DD API\uC5D0\uB294 \uC5C6\uACE0 vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860 \uC11C\uBC84\uC5D0\uC11C \uD754\uD788 \uC9C0\uC6D0\uD569\uB2C8\uB2E4. 0 \uB610\uB294 -1\uC740 \uBE44\uD65C\uC131\uD654\uB97C \uC758\uBBF8\uD558\uB294 \uACBD\uC6B0\uAC00 \uB9CE\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 40)"
    },
    min_p: {
      summary: "\uCD5C\uACE0 \uD655\uB960 \uB300\uBE44 \uB0AE\uC740 \uD1A0\uD070\uC744 \uC81C\uC678\uD569\uB2C8\uB2E4.",
      detail: "\uCD5C\uACE0 \uD655\uB960 \uD1A0\uD070 \xD7 min_p\uBCF4\uB2E4 \uB0AE\uC740 \uD655\uB960\uC758 \uD1A0\uD070\uC744 \uD6C4\uBCF4\uC5D0\uC11C \uC81C\uAC70\uD569\uB2C8\uB2E4. vLLM \uB4F1\uC5D0\uC11C \uC9C0\uC6D0\uD558\uB294 \uCD5C\uC18C \uD655\uB960 \uC0D8\uD50C\uB9C1 \uBC29\uC2DD\uC785\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.05)"
    },
    typical_p: {
      summary: "typical sampling\uC73C\uB85C \uD754\uD55C \uD1A0\uD070\uC744 \uC120\uD638\uD569\uB2C8\uB2E4.",
      detail: "\uAC01 \uD1A0\uD070\uC758 \uC815\uBCF4 \uC774\uB860\uC801 \uAE30\uB300\uAC12\uACFC \uC2E4\uC81C \uD655\uB960 \uCC28\uC774\uB97C \uAE30\uC900\uC73C\uB85C \uC0D8\uD50C\uB9C1\uD569\uB2C8\uB2E4. \uB85C\uCEEC \uCD94\uB860 \uC5D4\uC9C4\uC5D0\uC11C \uC9C0\uC6D0\uD558\uB294 \uACBD\uC6B0\uAC00 \uC788\uC73C\uBA70, \uBAA8\uB378/\uC11C\uBC84\uB9C8\uB2E4 \uB3D9\uC791\uC774 \uB2E4\uB97C \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.95)"
    },
    max_tokens: {
      summary: "\uC0DD\uC131\uD560 \uCD5C\uB300 \uD1A0\uD070 \uC218\uB97C \uC81C\uD55C\uD569\uB2C8\uB2E4.",
      detail: "\uC644\uC131(completion)\uC5D0 \uD5C8\uC6A9\uB418\uB294 \uCD5C\uB300 \uD1A0\uD070 \uC218\uC785\uB2C8\uB2E4. OpenAI \uD638\uD658 API\uC5D0\uC11C \uAC00\uC7A5 \uD754\uD55C \uAE38\uC774 \uC81C\uD55C \uD544\uB4DC\uC774\uBA70, \uBE44\uC6A9\uACFC \uC751\uB2F5 \uAE38\uC774\uB97C \uC9C1\uC811 \uC81C\uC5B4\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1024)"
    },
    max_completion_tokens: {
      summary: "\uC644\uC131 \uD1A0\uD070 \uC0C1\uD55C(\uC2E0\uADDC OpenAI \uC2A4\uD0C0\uC77C)\uC785\uB2C8\uB2E4.",
      detail: "\uC77C\uBD80 \uCD5C\uC2E0 \uBAA8\uB378/API\uB294 max_tokens \uB300\uC2E0 max_completion_tokens\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uC11C\uBC84\uAC00 \uB458 \uC911 \uD558\uB098\uB9CC \uC778\uC2DD\uD560 \uC218 \uC788\uC73C\uBBC0\uB85C \uBB38\uC11C\uB97C \uD655\uC778\uD558\uC138\uC694.",
      valuePlaceholder: "number (\uC608: 1024)"
    },
    n: {
      summary: "\uD55C \uC694\uCCAD\uC5D0\uC11C \uC0DD\uC131\uD560 \uC751\uB2F5 \uAC1C\uC218\uC785\uB2C8\uB2E4.",
      detail: "\uAE30\uBCF8\uAC12\uC740 1\uC785\uB2C8\uB2E4. 1\uBCF4\uB2E4 \uD06C\uBA74 \uC5EC\uB7EC completion\uC744 \uBC18\uD658\uD558\uBA70, \uD1A0\uD070 \uC0AC\uC6A9\uB7C9\uACFC \uBE44\uC6A9\uC774 \uADF8\uB9CC\uD07C \uB298\uC5B4\uB0A9\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1)"
    },
    frequency_penalty: {
      summary: "\uC774\uBBF8 \uC790\uC8FC \uB098\uC628 \uD1A0\uD070\uC758 \uC7AC\uB4F1\uC7A5\uC744 \uC5B5\uC81C\uD569\uB2C8\uB2E4.",
      detail: "\uC0DD\uC131 \uD14D\uC2A4\uD2B8\uC5D0\uC11C \uB4F1\uC7A5 \uBE48\uB3C4\uAC00 \uB192\uC740 \uD1A0\uD070\uC5D0 \uD328\uB110\uD2F0\uB97C \uC90D\uB2C8\uB2E4. \uBC18\uBCF5 \uD45C\uD604\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.5)"
    },
    presence_penalty: {
      summary: "\uD55C \uBC88\uC774\uB77C\uB3C4 \uB098\uC628 \uD1A0\uD070\uC758 \uC7AC\uB4F1\uC7A5\uC744 \uC5B5\uC81C\uD569\uB2C8\uB2E4.",
      detail: "\uC774\uBBF8 \uB4F1\uC7A5\uD55C \uD1A0\uD070(\uC8FC\uC81C/\uB2E8\uC5B4)\uC758 \uC7AC\uC0AC\uC6A9\uC744 \uC904\uC5EC \uC0C8\uB85C\uC6B4 \uD45C\uD604\uC774\uB098 \uC8FC\uC81C\uB85C \uC774\uB3D9\uD558\uB3C4\uB85D \uC720\uB3C4\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.5)"
    },
    repetition_penalty: {
      summary: "\uBC18\uBCF5 \uD1A0\uD070\uC5D0 \uB300\uD55C \uC77C\uBC18 \uD328\uB110\uD2F0\uC785\uB2C8\uB2E4.",
      detail: "Hugging Face / vLLM \uC2A4\uD0C0\uC77C \uCD94\uB860\uC5D0\uC11C \uD754\uD569\uB2C8\uB2E4. 1.0\uC774\uBA74 \uD328\uB110\uD2F0 \uC5C6\uC74C, 1\uBCF4\uB2E4 \uD06C\uBA74 \uBC18\uBCF5\uC744 \uC5B5\uC81C\uD569\uB2C8\uB2E4. OpenAI \uD45C\uC900 \uD544\uB4DC\uB294 \uC544\uB2D9\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1.1)"
    },
    seed: {
      summary: "\uC0D8\uD50C\uB9C1 \uC2DC\uB4DC\uB85C \uC7AC\uD604\uC131\uC744 \uB192\uC785\uB2C8\uB2E4.",
      detail: "\uAC19\uC740 seed\uC640 \uB3D9\uC77C \uC870\uAC74\uC774\uBA74 \uBE44\uC2B7\uD55C \uACB0\uACFC\uB97C \uAE30\uB300\uD560 \uC218 \uC788\uC9C0\uB9CC, \uC11C\uBC84/\uBAA8\uB378/\uBCD1\uB82C \uCC98\uB9AC\uC5D0 \uB530\uB77C \uC644\uC804\uD55C \uC7AC\uD604\uC740 \uBCF4\uC7A5\uB418\uC9C0 \uC54A\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 42)"
    },
    min_tokens: {
      summary: "\uCD5C\uC18C \uC0DD\uC131 \uD1A0\uD070 \uC218\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4.",
      detail: "EOS\uB098 stop \uC870\uAC74\uC774 \uB098\uC624\uAE30 \uC804\uAE4C\uC9C0 \uCD5C\uC18C\uD55C \uC774 \uD1A0\uD070 \uC218\uB9CC\uD07C\uC740 \uC0DD\uC131\uD558\uB3C4\uB85D \uD569\uB2C8\uB2E4. vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860\uC5D0\uC11C \uC9C0\uC6D0\uD558\uB294 \uACBD\uC6B0\uAC00 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1)"
    },
    stop: {
      summary: "\uC9C0\uC815 \uBB38\uC790\uC5F4\uC774 \uB098\uC624\uBA74 \uC0DD\uC131\uC744 \uC911\uB2E8\uD569\uB2C8\uB2E4.",
      detail: "\uBB38\uC790\uC5F4 \uD558\uB098 \uB610\uB294 \uBC30\uC5F4\uC744 \uC9C0\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 \uC2DC\uD000\uC2A4\uAC00 \uCD9C\uB825\uB418\uBA74 \uC0DD\uC131\uC774 \uC885\uB8CC\uB429\uB2C8\uB2E4.",
      valuePlaceholder: 'string | string[] (\uC608: "\\n")'
    },
    stop_token_ids: {
      summary: "\uC9C0\uC815 \uD1A0\uD070 ID\uAC00 \uB098\uC624\uBA74 \uC0DD\uC131\uC744 \uC911\uB2E8\uD569\uB2C8\uB2E4.",
      detail: "\uBB38\uC790\uC5F4 stop \uB300\uC2E0 \uD1A0\uD070 ID\uB85C \uC911\uB2E8 \uC870\uAC74\uC744 \uC9C0\uC815\uD569\uB2C8\uB2E4. vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860 \uD655\uC7A5 \uC635\uC158\uC785\uB2C8\uB2E4.",
      valuePlaceholder: "number[] (\uC608: [128001])"
    },
    ignore_eos: {
      summary: "EOS \uD1A0\uD070\uC744 \uBB34\uC2DC\uD558\uACE0 \uACC4\uC18D \uC0DD\uC131\uD569\uB2C8\uB2E4.",
      detail: "\uBAA8\uB378\uC758 \uC885\uB8CC(EOS) \uD1A0\uD070\uC744 \uB9CC\uB098\uB3C4 \uB2E4\uB978 \uC911\uB2E8 \uC870\uAC74(max_tokens, stop \uB4F1)\uAE4C\uC9C0 \uC0DD\uC131\uC744 \uC774\uC5B4\uAC11\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: true)"
    },
    logprobs: {
      summary: "\uD1A0\uD070\uBCC4 \uB85C\uADF8 \uD655\uB960\uC744 \uBC18\uD658\uD569\uB2C8\uB2E4.",
      detail: "true\uC774\uBA74 \uAC01 \uCD9C\uB825 \uD1A0\uD070\uC758 log probability \uC815\uBCF4\uB97C \uC751\uB2F5\uC5D0 \uD3EC\uD568\uD569\uB2C8\uB2E4. \uB514\uBC84\uAE45\uC774\uB098 \uD655\uB960 \uBD84\uC11D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: true)"
    },
    top_logprobs: {
      summary: "\uAC01 \uC704\uCE58\uC5D0\uC11C \uC0C1\uC704 \uB300\uC548 \uD1A0\uD070 logprob\uB97C \uBC18\uD658\uD569\uB2C8\uB2E4.",
      detail: "logprobs\uAC00 \uCF1C\uC838 \uC788\uC744 \uB54C, \uAC01 \uD1A0\uD070 \uC704\uCE58\uB9C8\uB2E4 \uC0C1\uC704 N\uAC1C \uB300\uC548\uC758 log probability\uB97C \uD568\uAED8 \uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 5)"
    },
    prompt_logprobs: {
      summary: "\uD504\uB86C\uD504\uD2B8 \uD1A0\uD070\uC758 logprob\uB97C \uBC18\uD658\uD569\uB2C8\uB2E4.",
      detail: "\uC785\uB825 \uD504\uB86C\uD504\uD2B8 \uAC01 \uD1A0\uD070\uC5D0 \uB300\uD55C log probability\uB97C \uC751\uB2F5\uC5D0 \uD3EC\uD568\uD569\uB2C8\uB2E4. vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860 \uD655\uC7A5\uC785\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0)"
    },
    verbosity: {
      summary: "\uCD9C\uB825 \uC0C1\uC138\uB3C4 \uC218\uC900\uC744 \uC870\uC808\uD569\uB2C8\uB2E4.",
      detail: "\uC77C\uBD80 OpenAI \uBAA8\uB378\uC5D0\uC11C low / medium / high\uB85C \uC751\uB2F5 \uAE38\uC774\xB7\uC0C1\uC138\uB3C4\uB97C \uC870\uC808\uD569\uB2C8\uB2E4. \uC9C0\uC6D0 \uBAA8\uB378\uACFC \uAC12\uC740 \uC81C\uACF5\uC790\uB9C8\uB2E4 \uB2E4\uB985\uB2C8\uB2E4.",
      valuePlaceholder: '"low" | "medium" | "high"'
    },
    reasoning_effort: {
      summary: "\uCD94\uB860(\uC0AC\uACE0) \uBAA8\uB378\uC758 \uB178\uB825 \uC218\uC900\uC744 \uC124\uC815\uD569\uB2C8\uB2E4.",
      detail: "reasoning-capable \uBAA8\uB378\uC5D0\uC11C \uB0B4\uBD80 \uCD94\uB860 \uAE4A\uC774\uB97C none / low / medium / high \uB4F1\uC73C\uB85C \uC870\uC808\uD569\uB2C8\uB2E4. \uC815\uD655\uD55C \uAC12\uACFC \uC758\uBBF8\uB294 \uBAA8\uB378\xB7\uC81C\uACF5\uC790\uC5D0 \uB530\uB77C \uB2E4\uB985\uB2C8\uB2E4.",
      valuePlaceholder: '"none" | "low" | "medium" | "high"'
    },
    thinking_token_budget: {
      summary: "\uB0B4\uBD80 \uC0AC\uACE0(thinking) \uD1A0\uD070 \uC608\uC0B0\uC744 \uC9C0\uC815\uD569\uB2C8\uB2E4.",
      detail: "\uCD94\uB860/\uC0AC\uACE0 \uAD6C\uAC04\uC5D0 \uD560\uB2F9\uD560 \uCD5C\uB300 \uD1A0\uD070 \uC218\uC785\uB2C8\uB2E4. \uB85C\uCEEC \uCD94\uB860 \uC5D4\uC9C4\uC774\uB098 thinking \uBAA8\uB378\uC5D0\uC11C \uC9C0\uC6D0\uD558\uB294 \uACBD\uC6B0\uAC00 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1024)"
    },
    include_reasoning: {
      summary: "\uC751\uB2F5\uC5D0 \uCD94\uB860/\uC0AC\uACE0 \uB0B4\uC6A9\uC744 \uD3EC\uD568\uD560\uC9C0 \uC124\uC815\uD569\uB2C8\uB2E4.",
      detail: "\uBAA8\uB378\uC774 \uB0B4\uBD80 reasoning\uC744 \uBCC4\uB3C4 \uD544\uB4DC\uB85C \uBC18\uD658\uD558\uB3C4\uB85D \uC694\uCCAD\uD569\uB2C8\uB2E4. \uC81C\uACF5\uC790\xB7\uBAA8\uB378 \uC9C0\uC6D0 \uC5EC\uBD80\uC5D0 \uB530\uB77C \uB3D9\uC791\uC774 \uB2EC\uB77C\uC9D1\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: true)"
    },
    use_beam_search: {
      summary: "\uC0D8\uD50C\uB9C1 \uB300\uC2E0 \uBE54 \uC11C\uCE58\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      detail: "\uD655\uB960\uC801 \uC0D8\uD50C\uB9C1 \uB300\uC2E0 \uBE54 \uC11C\uCE58\uB85C \uC5EC\uB7EC \uD6C4\uBCF4 \uACBD\uB85C\uB97C \uD0D0\uC0C9\uD569\uB2C8\uB2E4. \uC8FC\uB85C vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860\uC5D0\uC11C \uC9C0\uC6D0\uD558\uBA70, \uC0DD\uC131 \uC18D\uB3C4\uC640 \uBE44\uC6A9\uC774 \uB2EC\uB77C\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: false)"
    },
    length_penalty: {
      summary: "\uBE54 \uC11C\uCE58 \uC2DC \uC2DC\uD000\uC2A4 \uAE38\uC774 \uD328\uB110\uD2F0\uB97C \uC801\uC6A9\uD569\uB2C8\uB2E4.",
      detail: "use_beam_search\uAC00 \uCF1C\uC838 \uC788\uC744 \uB54C \uAE34/\uC9E7\uC740 \uC2DC\uD000\uC2A4\uB97C \uC120\uD638\uD558\uB3C4\uB85D \uC810\uC218\uB97C \uC870\uC815\uD569\uB2C8\uB2E4. 1.0\uC774 \uC911\uB9BD\uC5D0 \uAC00\uAE5D\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1.0)"
    },
    response_format: {
      summary: "\uCD9C\uB825 \uD615\uC2DD(JSON \uB4F1)\uC744 \uC9C0\uC815\uD569\uB2C8\uB2E4.",
      detail: '\uC608: { "type": "text" }, { "type": "json_object" }, json_schema \uB4F1. \uAD6C\uC870\uD654\uB41C \uCD9C\uB825\uC774 \uD544\uC694\uD560 \uB54C \uC0AC\uC6A9\uD558\uBA70, \uBAA8\uB378\uC774 \uD574\uB2F9 \uD615\uC2DD\uC744 \uC9C0\uC6D0\uD574\uC57C \uD569\uB2C8\uB2E4.',
      valuePlaceholder: 'object (\uC608: {"type":"json_object"})'
    },
    user: {
      summary: "\uCD5C\uC885 \uC0AC\uC6A9\uC790 \uC2DD\uBCC4\uC790(\uC81C\uACF5\uC790 \uBA54\uD0C0\uB370\uC774\uD130)\uC785\uB2C8\uB2E4.",
      detail: "OpenAI \uD638\uD658 API\uC758 end-user ID \uD544\uB4DC\uC785\uB2C8\uB2E4. \uB0A8\uC6A9 \uBC29\uC9C0\xB7\uAC10\uC0AC \uBAA9\uC801\uC73C\uB85C \uC81C\uACF5\uC790\uAC00 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC73C\uBA70, \uC571 \uB3D9\uC791 \uC790\uCCB4\uB97C \uBC14\uAFB8\uC9C0\uB294 \uC54A\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: 'string (\uC608: "user-123")'
    },
    truncate_prompt_tokens: {
      summary: "\uD504\uB86C\uD504\uD2B8\uB97C \uCD5C\uB300 \uD1A0\uD070 \uC218\uB85C \uC798\uB77C\uB0C5\uB2C8\uB2E4.",
      detail: "\uCEE8\uD14D\uC2A4\uD2B8\uAC00 \uAE38 \uB54C \uC55E/\uB4A4\uB97C \uC798\uB77C \uBAA8\uB378 \uD55C\uB3C4\uC5D0 \uB9DE\uCDA5\uB2C8\uB2E4. -1\uC740 \uC798\uB77C\uB0B4\uC9C0 \uC54A\uC74C\uC744 \uC758\uBBF8\uD558\uB294 \uAD6C\uD604\uB3C4 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 4096)"
    },
    truncation_side: {
      summary: "\uD504\uB86C\uD504\uD2B8\uB97C \uC790\uB97C \uB54C left \uB610\uB294 right\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4.",
      detail: "truncate_prompt_tokens\uC640 \uD568\uAED8 \uC0AC\uC6A9\uD569\uB2C8\uB2E4. left\uB294 \uC55E\uBD80\uBD84\uC744, right\uB294 \uB4B7\uBD80\uBD84\uC744 \uC720\uC9C0\uD558\uB294 \uC2DD\uC73C\uB85C \uC798\uB77C\uB0C5\uB2C8\uB2E4.",
      valuePlaceholder: '"left" | "right"'
    },
    skip_special_tokens: {
      summary: "\uB514\uCF54\uB529 \uC2DC \uD2B9\uC218 \uD1A0\uD070\uC744 \uCD9C\uB825\uC5D0\uC11C \uC81C\uAC70\uD569\uB2C8\uB2E4.",
      detail: "BOS/EOS \uB4F1 \uD2B9\uC218 \uD1A0\uD070\uC744 \uCD5C\uC885 \uD14D\uC2A4\uD2B8\uC5D0 \uD3EC\uD568\uD558\uC9C0 \uC54A\uB3C4\uB85D \uD569\uB2C8\uB2E4. \uB85C\uCEEC \uCD94\uB860 \uC5D4\uC9C4\uC5D0\uC11C \uD754\uD55C \uC635\uC158\uC785\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: true)"
    },
    echo: {
      summary: "\uC785\uB825 \uD504\uB86C\uD504\uD2B8\uB97C \uC751\uB2F5\uC5D0 \uD568\uAED8 \uBC18\uD658\uD569\uB2C8\uB2E4.",
      detail: "completion API\uC5D0\uC11C \uD504\uB86C\uD504\uD2B8\uC640 \uC0DD\uC131 \uACB0\uACFC\uB97C \uD55C \uBC88\uC5D0 \uBC1B\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uCC44\uD305 API\uC5D0\uC11C\uB294 \uB35C \uD754\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: false)"
    }
  }, et = {
    detail: "\uC81C\uC548 \uBAA9\uB85D\uC5D0 \uC5C6\uB294 key\uB3C4 OpenAI \uD638\uD658 \uC694\uCCAD \uBCF8\uBB38\uC5D0 \uADF8\uB300\uB85C \uD569\uCCD0\uC9D1\uB2C8\uB2E4. \uC11C\uBC84/\uBAA8\uB378\uC774 \uC9C0\uC6D0\uD558\uB294\uC9C0\uB294 \uC81C\uACF5\uC790 \uBB38\uC11C\uB97C \uD655\uC778\uD558\uC138\uC694. \uAC12\uC740 JSON \uB9AC\uD130\uB7F4(\uC22B\uC790, \uBD88\uB9AC\uC5B8, \uBC30\uC5F4, \uAC1D\uCCB4) \uB610\uB294 \uBB38\uC790\uC5F4\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
    valuePlaceholder: 'JSON \uAC12 (\uC608: 0.4, true, "text", [1,2])'
  }, $a = {
    summary: "\uC635\uC158 \uD0A4\uB97C \uC120\uD0DD\uD558\uAC70\uB098 \uC785\uB825\uD558\uC138\uC694.",
    detail: "\uC81C\uC548 \uBAA9\uB85D\uC5D0\uC11C key\uB97C \uACE0\uB974\uAC70\uB098 \uC9C1\uC811 \uC785\uB825\uD55C \uB4A4 value\uB97C \uC124\uC815\uD569\uB2C8\uB2E4. key\uAC00 \uBE44\uC5B4 \uC788\uC73C\uBA74 \uC694\uCCAD\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
    valuePlaceholder: "value (\uD0A4 \uC120\uD0DD \uD6C4 \uD615\uC2DD \uD45C\uC2DC)"
  };
  function ie(t) {
    const r = t.trim();
    if (!r) return $a;
    const a = za[r];
    return a || {
      summary: `\uC0AC\uC6A9\uC790 \uC815\uC758 \uC635\uC158 "${r}"\uC785\uB2C8\uB2E4.`,
      detail: `${et.detail}

\uD604\uC7AC key: ${r}`,
      valuePlaceholder: et.valuePlaceholder
    };
  }
  function Fa(t) {
    return ie(t).valuePlaceholder;
  }
  function Ka(t) {
    const r = t.trim(), a = r ? `OpenAI API ${r} parameter LLM` : "OpenAI chat completion API parameters";
    return `https://www.google.com/search?q=${encodeURIComponent(a)}`;
  }
  const tt = "z-100010 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong", Wa = "z-100011 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong", Ua = "cursor-pointer rounded px-2 py-1 text-[11px] outline-none data-disabled:cursor-not-allowed data-disabled:opacity-40 data-highlighted:bg-violet-50 dark:data-highlighted:bg-violet-950/40", Ba = "\uC81C\uC548 \uBAA9\uB85D\uC5D0 \uC5C6\uB294 key\uB97C \uC9C1\uC811 \uC785\uB825\uD569\uB2C8\uB2E4.", Va = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800/80 dark:text-red-400 dark:hover:bg-red-950/40", rt = "inline-flex flex-1 items-center justify-center gap-1 rounded px-2 py-1 text-[11px] font-medium outline-none transition data-[state=inactive]:text-gray-500 data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:data-[state=inactive]:text-odp-muted dark:data-[state=active]:text-white", Ga = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft", W = "__custom__";
  function Ya(t) {
    return t && pt.includes(t) ? t : W;
  }
  function at(t) {
    try {
      return JSON.stringify(ut(t));
    } catch {
      return "";
    }
  }
  function st({ value: t, label: r, tip: a, dimmed: l = false }) {
    return e.jsxs(le, {
      children: [
        e.jsx(de, {
          asChild: true,
          children: e.jsx(qr, {
            value: t,
            className: `${Ua}${l ? " opacity-40" : ""}`,
            children: e.jsx(Hr, {
              children: r
            })
          })
        }),
        e.jsx(ce, {
          children: e.jsxs(ue, {
            side: "left",
            sideOffset: 8,
            className: Wa,
            children: [
              a,
              e.jsx(pe, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function qa({ value: t, onChange: r }) {
    const [a, l] = n.useState(false), [s, i] = n.useState("fields"), [o, u] = n.useState(null), [x, N] = n.useState(0), [f, h] = n.useState(() => J(t)), [g, C] = n.useState(() => oe(t)), [U, y] = n.useState(""), w = n.useRef(f);
    w.current = f, n.useEffect(() => {
      a && N((c) => c + 1);
    }, [
      a
    ]);
    const P = n.useCallback((c) => {
      if (i(c.tab), h(c.entries.map((m) => ({
        ...m
      }))), C(c.jsonText), c.tab === "fields") {
        const m = X(c.entries);
        y(""), r(m);
        return;
      }
      const p = Se(c.jsonText);
      if (p.ok) {
        y(""), h(J(p.options)), r(p.options);
        return;
      }
      y(p.error), r(X(c.entries));
    }, [
      r
    ]), { undo: _, redo: B } = Ma({
      enabled: a,
      historyKey: x,
      tab: s,
      entries: f,
      jsonText: g,
      applySnapshot: P
    });
    n.useEffect(() => {
      const c = ut(t), p = X(w.current);
      at(c) !== at(p) && (h(J(c)), C(oe(c)), y(""), a && N((m) => m + 1));
    }, [
      t,
      a
    ]);
    const L = n.useMemo(() => new Set(f.map((c) => c.key.trim()).filter(Boolean)), [
      f
    ]), R = (c) => {
      h(c);
      const p = X(c);
      C(oe(p)), y(""), r(p);
    }, T = (c) => {
      C(c);
      const p = Se(c);
      if (!p.ok) {
        y(p.error);
        return;
      }
      y(""), h(J(p.options)), r(p.options);
    }, $ = Object.keys(t || {}).length, b = o !== null ? ie(o) : null, v = o !== null && o.trim() ? o.trim() : "\uC635\uC158 \uD0A4";
    return n.useEffect(() => {
      if (!a || o !== null) return;
      const c = (p) => {
        if (!(p.metaKey || p.ctrlKey) || p.altKey) return;
        const j = p.key.toLowerCase(), A = j === "z" && !p.shiftKey, te = j === "y" || j === "z" && p.shiftKey;
        if (!(!A && !te)) {
          if (s === "json") {
            const re = p.target;
            if (re instanceof Element && re.closest(".cm-editor")) return;
          }
          p.preventDefault(), p.stopPropagation(), p.stopImmediatePropagation(), te ? B() : _();
        }
      };
      return window.addEventListener("keydown", c, true), () => window.removeEventListener("keydown", c, true);
    }, [
      o,
      a,
      B,
      s,
      _
    ]), e.jsxs("div", {
      className: `rounded border border-gray-200 dark:border-odp-borderSoft ${a ? "" : "bg-slate-300/90 dark:bg-slate-950/40"}`,
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => l((c) => !c),
          className: `flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-1 px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${a ? "rounded-t bg-transparent" : "rounded"}`,
          "aria-expanded": a,
          children: [
            e.jsxs("span", {
              className: "shrink-0 whitespace-nowrap",
              children: [
                e.jsxs("span", {
                  className: "inline-flex items-center gap-1",
                  children: [
                    e.jsx(pr, {
                      size: 13,
                      className: "shrink-0 opacity-70",
                      "aria-hidden": true
                    }),
                    "\uACE0\uAE09 \uC124\uC815"
                  ]
                }),
                !a && $ > 0 ? e.jsxs("span", {
                  className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                  children: [
                    "(",
                    $,
                    ")"
                  ]
                }) : null
              ]
            }),
            e.jsx(Be, {
              size: 14,
              "aria-hidden": true,
              className: `shrink-0 opacity-70 transition-transform ${a ? "rotate-180" : ""}`
            })
          ]
        }),
        e.jsx(yt, {
          open: a,
          children: e.jsxs("div", {
            className: "space-y-2 border-t border-gray-200 px-2 pb-2 pt-2 dark:border-odp-borderSoft",
            children: [
              e.jsx("p", {
                className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
                children: "LLM \uC694\uCCAD\uC5D0 \uD569\uCCD0\uC9C0\uB294 \uC0DD\uC131 \uC635\uC158\uC785\uB2C8\uB2E4. \uC81C\uC548 \uBAA9\uB85D \uC678 key\uB3C4 \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
              }),
              e.jsxs(zr, {
                value: s,
                onValueChange: (c) => {
                  const p = c === "json" ? "json" : "fields";
                  if (p === "json") C(oe(X(f))), y("");
                  else {
                    const m = Se(g);
                    m.ok && (h(J(m.options)), y(""));
                  }
                  i(p);
                },
                children: [
                  e.jsxs($r, {
                    className: "flex gap-1 rounded border border-gray-200 p-0.5 dark:border-odp-borderSoft",
                    children: [
                      e.jsxs(qe, {
                        value: "fields",
                        className: rt,
                        children: [
                          e.jsx(mr, {
                            size: 12,
                            "aria-hidden": true,
                            className: "opacity-80"
                          }),
                          "\uD544\uB4DC"
                        ]
                      }),
                      e.jsxs(qe, {
                        value: "json",
                        className: rt,
                        children: [
                          e.jsx(xr, {
                            size: 12,
                            "aria-hidden": true,
                            className: "opacity-80"
                          }),
                          "JSON"
                        ]
                      })
                    ]
                  }),
                  e.jsxs(He, {
                    value: "fields",
                    className: "mt-2 space-y-2 outline-none",
                    children: [
                      e.jsx(dt, {
                        delayDuration: 250,
                        skipDelayDuration: 0,
                        children: f.map((c) => {
                          const p = Ya(c.key);
                          return e.jsxs("div", {
                            className: "space-y-1 rounded border border-gray-100 p-1.5 dark:border-odp-borderSoft/60",
                            children: [
                              e.jsxs("div", {
                                className: "flex flex-wrap items-start gap-x-1 gap-y-1",
                                children: [
                                  e.jsxs(Fr, {
                                    value: p,
                                    onValueChange: (m) => {
                                      m !== W && L.has(m) && c.key !== m || R(f.map((j) => j.id !== c.id ? j : m === W ? {
                                        ...j,
                                        key: p === W ? j.key : ""
                                      } : {
                                        ...j,
                                        key: m
                                      }));
                                    },
                                    children: [
                                      e.jsxs(Kr, {
                                        className: "inline-flex h-7 min-w-[8rem] flex-1 items-center justify-between gap-1 rounded border border-gray-300 bg-white px-2 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                                        "aria-label": "\uC635\uC158 \uD0A4",
                                        children: [
                                          e.jsx(Wr, {
                                            placeholder: "key \uC120\uD0DD"
                                          }),
                                          e.jsx(Ur, {
                                            children: e.jsx(Be, {
                                              size: 12,
                                              "aria-hidden": true
                                            })
                                          })
                                        ]
                                      }),
                                      e.jsx(Br, {
                                        children: e.jsx(Vr, {
                                          className: "z-100010 max-h-64 overflow-auto rounded border border-gray-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
                                          position: "popper",
                                          sideOffset: 4,
                                          children: e.jsxs(Gr, {
                                            className: "p-1",
                                            children: [
                                              pt.map((m) => e.jsx(st, {
                                                value: m,
                                                label: m,
                                                tip: ie(m).summary,
                                                dimmed: L.has(m) && c.key !== m
                                              }, m)),
                                              e.jsx(Yr, {
                                                className: "my-1 h-px bg-gray-200 dark:bg-odp-borderSoft"
                                              }),
                                              e.jsx(st, {
                                                value: W,
                                                label: "\uC9C1\uC811 \uC785\uB825\u2026",
                                                tip: Ba
                                              })
                                            ]
                                          })
                                        })
                                      })
                                    ]
                                  }),
                                  e.jsxs(le, {
                                    children: [
                                      e.jsx(de, {
                                        asChild: true,
                                        children: e.jsx("button", {
                                          type: "button",
                                          onClick: () => {
                                            const m = f.filter((j) => j.id !== c.id);
                                            R(m.length ? m : fa());
                                          },
                                          className: Va,
                                          "aria-label": "\uD589 \uC0AD\uC81C",
                                          children: e.jsx(ot, {
                                            size: 12,
                                            "aria-hidden": true
                                          })
                                        })
                                      }),
                                      e.jsx(ce, {
                                        children: e.jsxs(ue, {
                                          side: "top",
                                          sideOffset: 4,
                                          className: tt,
                                          children: [
                                            "\uD589 \uC0AD\uC81C",
                                            e.jsx(pe, {
                                              className: "fill-white dark:fill-odp-surface"
                                            })
                                          ]
                                        })
                                      })
                                    ]
                                  }),
                                  e.jsxs(le, {
                                    children: [
                                      e.jsx(de, {
                                        asChild: true,
                                        children: e.jsx("button", {
                                          type: "button",
                                          onClick: () => u(c.key),
                                          className: Ga,
                                          "aria-label": `${c.key.trim() || "\uC635\uC158"} \uC124\uBA85`,
                                          children: e.jsx(Ve, {
                                            size: 12,
                                            "aria-hidden": true
                                          })
                                        })
                                      }),
                                      e.jsx(ce, {
                                        children: e.jsxs(ue, {
                                          side: "top",
                                          sideOffset: 4,
                                          className: tt,
                                          children: [
                                            ie(c.key).summary,
                                            e.jsx(pe, {
                                              className: "fill-white dark:fill-odp-surface"
                                            })
                                          ]
                                        })
                                      })
                                    ]
                                  })
                                ]
                              }),
                              p === W ? e.jsx("input", {
                                type: "text",
                                value: c.key,
                                onChange: (m) => {
                                  const j = m.target.value;
                                  R(f.map((A) => A.id === c.id ? {
                                    ...A,
                                    key: j
                                  } : A));
                                },
                                placeholder: "custom key",
                                className: "w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                              }) : null,
                              e.jsx("input", {
                                type: "text",
                                value: c.valueText,
                                onChange: (m) => {
                                  const j = m.target.value;
                                  R(f.map((A) => A.id === c.id ? {
                                    ...A,
                                    valueText: j
                                  } : A));
                                },
                                placeholder: Fa(c.key),
                                className: "w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                              })
                            ]
                          }, c.id);
                        })
                      }),
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => R([
                          ...f,
                          ga()
                        ]),
                        className: "inline-flex w-full items-center justify-center gap-1 rounded border border-dashed border-gray-300 px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                        children: [
                          e.jsx(it, {
                            size: 12,
                            "aria-hidden": true
                          }),
                          "\uC635\uC158 \uCD94\uAC00"
                        ]
                      })
                    ]
                  }),
                  e.jsxs(He, {
                    value: "json",
                    className: "mt-2 outline-none",
                    children: [
                      e.jsx("div", {
                        className: "h-40",
                        children: e.jsx(Oa, {
                          value: g,
                          onChange: T,
                          className: "h-full"
                        })
                      }),
                      U ? e.jsx("p", {
                        className: "mt-1 text-[10px] text-red-600 dark:text-red-400",
                        children: U
                      }) : e.jsx("p", {
                        className: "mt-1 text-[10px] text-gray-500 dark:text-odp-muted",
                        children: "\uC720\uD6A8\uD55C JSON \uAC1D\uCCB4\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4. \uC81C\uC548\uB418\uC9C0 \uC54A\uC740 key\uB3C4 \uADF8\uB300\uB85C \uC804\uC1A1\uB429\uB2C8\uB2E4."
                      })
                    ]
                  })
                ]
              })
            ]
          })
        }),
        e.jsx(Yt, {
          isOpen: o !== null,
          onClose: () => u(null),
          resizable: false,
          contentClassName: "max-w-md max-h-[90vh]",
          children: e.jsxs("div", {
            className: "p-6",
            children: [
              e.jsx("div", {
                className: "mb-3 flex justify-center",
                children: e.jsx("div", {
                  className: "flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300",
                  children: e.jsx(Ve, {
                    size: 24,
                    "aria-hidden": true
                  })
                })
              }),
              e.jsx("h2", {
                className: "mb-2 text-center text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
                children: v
              }),
              b ? e.jsx("p", {
                className: "mb-5 text-start text-sm leading-relaxed whitespace-pre-line break-keep text-gray-600 dark:text-gray-400",
                children: b.detail
              }) : null,
              e.jsxs("div", {
                className: "flex flex-wrap justify-center gap-2",
                children: [
                  e.jsxs(qt, {
                    variant: "secondary",
                    onClick: () => u(null),
                    children: [
                      e.jsx(Ht, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "\uB2EB\uAE30"
                    ]
                  }),
                  e.jsxs("a", {
                    href: Ka(o ?? ""),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:bg-blue-600 dark:hover:bg-blue-700",
                    children: [
                      e.jsx(Jt, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "Google\uC5D0\uC11C \uAC80\uC0C9"
                    ]
                  })
                ]
              })
            ]
          })
        })
      ]
    });
  }
  function Ne(t) {
    return t ? [
      ...t.types
    ].includes("Files") : false;
  }
  Ha = function({ children: t, className: r = "", disabled: a = false, onFilesDrop: l }) {
    const [s, i] = n.useState(false), o = n.useRef(0);
    n.useEffect(() => {
      a && (o.current = 0, i(false));
    }, [
      a
    ]);
    const u = n.useCallback(() => {
      o.current = 0, i(false);
    }, []), x = n.useCallback((g) => {
      a || !Ne(g.dataTransfer) || (g.preventDefault(), g.stopPropagation(), o.current += 1, i(true));
    }, [
      a
    ]), N = n.useCallback((g) => {
      a || (g.preventDefault(), g.stopPropagation(), o.current = Math.max(0, o.current - 1), o.current === 0 && i(false));
    }, [
      a
    ]), f = n.useCallback((g) => {
      a || !Ne(g.dataTransfer) || (g.preventDefault(), g.stopPropagation(), g.dataTransfer && (g.dataTransfer.dropEffect = "copy"), s || i(true));
    }, [
      a,
      s
    ]), h = n.useCallback((g) => {
      var _a2;
      if (a || !Ne(g.dataTransfer)) return;
      g.preventDefault(), g.stopPropagation(), u();
      const C = (_a2 = g.dataTransfer) == null ? void 0 : _a2.files;
      (C == null ? void 0 : C.length) && l(C);
    }, [
      a,
      l,
      u
    ]);
    return e.jsxs("div", {
      className: `relative ${r}`.trim(),
      onDragEnter: x,
      onDragLeave: N,
      onDragOverCapture: f,
      onDropCapture: h,
      children: [
        t,
        s ? e.jsx("div", {
          className: "pointer-events-none absolute inset-0 z-90 flex items-center justify-center bg-violet-100/85 px-4 dark:bg-violet-950/90",
          "aria-hidden": true,
          children: e.jsxs("div", {
            className: "flex max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-violet-500 bg-white/95 px-8 py-7 text-center shadow-lg dark:border-violet-400 dark:bg-odp-bgSoft/95",
            children: [
              e.jsx("div", {
                className: "flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300",
                children: e.jsx(nt, {
                  size: 24,
                  "aria-hidden": true
                })
              }),
              e.jsxs("div", {
                className: "space-y-1",
                children: [
                  e.jsx("p", {
                    className: "text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                    children: "\uC5EC\uAE30\uC5D0 \uB193\uAE30"
                  }),
                  e.jsxs("p", {
                    className: "flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400",
                    children: [
                      e.jsx(lt, {
                        size: 12,
                        "aria-hidden": true
                      }),
                      "AI \uC785\uB825 \uC774\uBBF8\uC9C0\uB85C \uCD94\uAC00\uB429\uB2C8\uB2E4"
                    ]
                  })
                ]
              })
            ]
          })
        }) : null
      ]
    });
  };
  const kt = [
    0.22,
    1,
    0.36,
    1
  ], Ja = {
    duration: 0.2,
    ease: kt
  }, Xa = {
    duration: 0.28,
    ease: kt
  }, Za = {
    backgroundColor: "#ffffff",
    backgroundImage: [
      "linear-gradient(45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)",
      "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"
    ].join(","),
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
  };
  function Qa({ src: t, alt: r = "", open: a, onClose: l }) {
    const s = !!(a && t);
    return e.jsx(Jr, {
      open: s,
      onOpenChange: (i) => {
        i || l();
      },
      children: e.jsx(ct, {
        children: s ? e.jsxs(Xr, {
          forceMount: true,
          children: [
            e.jsx(Zr, {
              asChild: true,
              forceMount: true,
              children: e.jsx(_e.div, {
                className: "fixed inset-0 z-100060 bg-black/85",
                initial: {
                  opacity: 0
                },
                animate: {
                  opacity: 1
                },
                exit: {
                  opacity: 0
                },
                transition: Ja
              })
            }),
            e.jsx(Qr, {
              asChild: true,
              forceMount: true,
              onOpenAutoFocus: (i) => i.preventDefault(),
              children: e.jsxs(_e.div, {
                className: "fixed inset-0 z-100061 flex flex-col outline-none",
                "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30",
                initial: {
                  opacity: 0,
                  scale: 0.98
                },
                animate: {
                  opacity: 1,
                  scale: 1
                },
                exit: {
                  opacity: 0,
                  scale: 0.98
                },
                transition: Xa,
                children: [
                  e.jsx(ea, {
                    className: "sr-only",
                    children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30"
                  }),
                  e.jsx(ta, {
                    className: "sr-only",
                    children: "\uC785\uB825 \uC774\uBBF8\uC9C0\uB97C \uD655\uB300\uD574 \uBCF4\uB294 \uD654\uBA74\uC785\uB2C8\uB2E4. \uB2E4\uC6B4\uB85C\uB4DC\xB7\uBCF5\uC0AC \uBC84\uD2BC \uB610\uB294 Ctrl/Cmd+C\uB85C \uC774\uBBF8\uC9C0\uB97C \uC800\uC7A5\uD558\uAC70\uB098 \uBCF5\uC0AC\uD558\uACE0, Esc \uB610\uB294 \uB2EB\uAE30\uB85C \uC885\uB8CC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                  }),
                  e.jsx("button", {
                    type: "button",
                    className: "absolute inset-0 cursor-zoom-out",
                    "aria-label": "\uB2EB\uAE30",
                    onClick: () => l()
                  }),
                  e.jsx("div", {
                    className: "pointer-events-none relative z-1 flex min-h-0 min-w-0 flex-1 items-center justify-center p-4 sm:p-8",
                    children: t ? e.jsx("div", {
                      className: "pointer-events-auto max-h-full max-w-full overflow-hidden shadow-2xl",
                      style: Za,
                      onClick: (i) => i.stopPropagation(),
                      children: e.jsx("img", {
                        src: t,
                        alt: r || "",
                        className: "block h-auto w-auto max-h-[min(88vh,100%)] max-w-full object-contain",
                        draggable: false
                      })
                    }) : null
                  }),
                  e.jsxs("div", {
                    className: "pointer-events-auto absolute right-3 top-3 z-2 flex items-center gap-2",
                    children: [
                      t ? e.jsx(ha, {
                        src: t
                      }) : null,
                      t ? e.jsx(ya, {
                        src: t
                      }) : null,
                      e.jsx(ra, {
                        asChild: true,
                        children: e.jsx("button", {
                          type: "button",
                          className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80",
                          "aria-label": "\uB2EB\uAE30",
                          children: e.jsx(Ce, {
                            size: 20
                          })
                        })
                      })
                    ]
                  })
                ]
              })
            })
          ]
        }, "llm-assist-image-lightbox") : null
      })
    });
  }
  const es = 400;
  function Z(t, r = false) {
    const a = n.useRef(t);
    a.current = t;
    const l = n.useRef(0), s = n.useCallback(() => {
      var _a2;
      if (r) return;
      const x = Date.now();
      x - l.current < es || (l.current = x, (_a2 = a.current) == null ? void 0 : _a2.call(a));
    }, [
      r
    ]), i = n.useCallback((x) => {
      x.stopPropagation();
    }, []), o = n.useCallback((x) => {
      x.stopPropagation(), !(r || x.button !== 0) && (x.preventDefault(), s());
    }, [
      r,
      s
    ]), u = n.useCallback((x) => {
      x.stopPropagation(), x.detail === 0 && s();
    }, [
      s
    ]);
    return {
      onPointerDown: i,
      onMouseDown: o,
      onClick: u
    };
  }
  const ts = "llm-assist-result-preview", rs = "shrink-0 opacity-70";
  function z({ icon: t, children: r, className: a = "" }) {
    return e.jsxs("span", {
      className: `inline-flex items-center gap-1 font-semibold text-gray-700 dark:text-odp-fgStrong ${a}`,
      children: [
        t ? e.jsx(t, {
          size: 13,
          className: rs,
          "aria-hidden": true
        }) : null,
        r
      ]
    });
  }
  Os = function({ theme: t = "light", profiles: r = [], selectedProfileId: a = "", onSelectedProfileIdChange: l = () => {
  }, selectedProfile: s = null, model: i = "", onModelChange: o = () => {
  }, selectedText: u, onSelectedTextChange: x, onRefreshSelection: N, attachedImages: f = [], onAddImages: h, onRemoveImage: g, onClearImages: C, instruction: U, onInstructionChange: y, systemPrompt: w = "", onSystemPromptChange: P, requestOptions: _ = {
    temperature: 0.4
  }, onRequestOptionsChange: B, result: L, onResultChange: R, resultViewMode: T = "text", onResultViewModeChange: $, loading: b = false, error: v = "", templates: c = [], selectedTemplateId: p = "", onLoadTemplate: m, templateName: j = "", onTemplateNameChange: A, editingTemplateId: te = null, onSaveTemplate: re, onNewTemplate: vt, onDeleteTemplate: jt, onRun: xe, onCancelGeneration: wt, onApplyResult: St, onAppendResult: Nt, onCopyResult: _t, onCreateNoteFromResult: Ct, presentation: be = "floating", canInsertIntoDocument: Lt = true, remoteMode: At = false, modelSelectAutoLoad: q = true, enableImageDropZone: Et = true, exaoneTabular: Ae, onExaoneTabularChange: Ee }) {
    const Tt = b || (At ? false : !L), F = (s == null ? void 0 : s.kind) === ke && Xt(i), fe = n.useRef(null), Te = n.useRef(null), ae = n.useRef(null), [Oe, K] = n.useState(""), [O, V] = n.useState(false), [H, Ot] = n.useState(false), [Pt, se] = n.useState(false), [ge, Pe] = n.useState(null), Re = n.useRef(0), Ie = n.useCallback(() => {
      Re.current = Date.now() + 100;
    }, []), D = n.useCallback(() => Date.now() < Re.current, []);
    n.useEffect(() => {
      b || se(false);
    }, [
      b
    ]), nr(Te, {
      layoutKey: `${t}|${L || ""}|${T}`
    });
    const De = n.useCallback(async (d) => {
      if (!(!(d == null ? void 0 : d.length) || !h)) {
        K(""), V(true);
        try {
          const E = await we(d);
          await h(E);
        } catch (E) {
          K(E instanceof Error ? E.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          V(false), ae.current && (ae.current.value = "");
        }
      }
    }, [
      h
    ]), Rt = n.useCallback(async () => {
      if (!(!h || O)) {
        K(""), V(true);
        try {
          const d = await aa();
          if (!d.length) {
            K("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. Ctrl/Cmd+V\uB85C \uBD99\uC5EC\uB123\uC744 \uC218\uB3C4 \uC788\uC2B5\uB2C8\uB2E4.");
            return;
          }
          const E = await we(d);
          await h(E);
        } catch (d) {
          K(d instanceof Error ? d.message : "\uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uB97C \uBD99\uC5EC\uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          V(false);
        }
      }
    }, [
      h,
      O
    ]);
    n.useEffect(() => {
      const d = async (E) => {
        if (!h || !fe.current || !(E.target instanceof Node) || !fe.current.contains(E.target) || O) return;
        const Fe = sa(E.clipboardData ?? null);
        if (Fe.length) {
          E.preventDefault(), K(""), V(true);
          try {
            const ye = await we(Fe);
            await h(ye);
          } catch (ye) {
            K((ye == null ? void 0 : ye.message) || "\uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uB97C \uBD99\uC5EC\uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          } finally {
            V(false);
          }
        }
      };
      return document.addEventListener("paste", d), () => document.removeEventListener("paste", d);
    }, [
      h,
      O
    ]);
    const he = w.trim() === ve(), M = !L, It = Z(St, M), Dt = Z(_t, M), Mt = Z(Nt, M), zt = Z(Ct, M), G = Z(() => xe == null ? void 0 : xe(), !!(b || !s)), $t = n.useCallback((d) => {
      D() || G.onPointerDown(d);
    }, [
      D,
      G
    ]), Ft = n.useCallback((d) => {
      D() || b || !s || d.button !== 0 || (Ie(), G.onMouseDown(d));
    }, [
      D,
      Ie,
      G,
      b,
      s
    ]), Kt = n.useCallback((d) => {
      D() || G.onClick(d);
    }, [
      D,
      G
    ]), Wt = n.useCallback(() => {
      D() || se(true);
    }, [
      D
    ]), Ut = n.useCallback((d) => {
      d.key !== "Enter" || d.nativeEvent.isComposing || (d.metaKey || d.ctrlKey) && (d.preventDefault(), !(b || !s) && (xe == null ? void 0 : xe()));
    }, [
      b,
      xe,
      s
    ]), Me = e.jsxs("button", {
      type: "button",
      disabled: he,
      onClick: () => P == null ? void 0 : P(ve()),
      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:disabled:hover:bg-transparent",
      "aria-label": "\uAE30\uBCF8\uAC12\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30",
      children: [
        e.jsx(Rr, {
          size: 11,
          "aria-hidden": true
        }),
        "\uAE30\uBCF8\uAC12\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30"
      ]
    }), ze = e.jsxs("div", {
      ref: fe,
      className: "space-y-3 text-xs",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block",
              children: e.jsx(z, {
                icon: br,
                children: "\uC81C\uACF5\uC790"
              })
            }),
            e.jsx(dr, {
              profiles: r,
              value: a,
              onChange: l
            })
          ]
        }),
        s ? e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block",
              children: e.jsx(z, {
                icon: fr,
                children: "\uBAA8\uB378"
              })
            }),
            s.kind === Zt || s.kind === ke ? e.jsx(Ue, {
              reloadKey: `${s.id}:${We(s)}`,
              getBaseUrl: () => We(s),
              getApiKey: () => s.apiKey || "",
              ...s.kind === ke ? {
                listModels: ({ apiKey: d }) => Qt(d),
                placeholder: "\uBAA8\uB378 ID (\uC608: k-exaone_v2.5)",
                helpText: "\uCC44\uD305(K-EXAONE) \uB610\uB294 Tabular \uBD84\uB958/\uD68C\uADC0 \uBAA8\uB378\uC744 \uACE0\uB974\uC138\uC694. \uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC62C \uC218 \uC788\uC2B5\uB2C8\uB2E4."
              } : {},
              value: i,
              onChange: o,
              autoLoad: q
            }, `${s.id}-${s.kind}`) : s.kind === er ? Bt() ? e.jsx(cr, {
              value: i,
              onChange: o,
              autoLoad: q
            }, `${s.id}-llama-cpp`) : e.jsx(Ue, {
              reloadKey: `${s.id}:${s.baseUrl || ""}`,
              getBaseUrl: () => s.baseUrl || "",
              getApiKey: () => s.apiKey || "",
              value: i,
              onChange: o,
              autoLoad: q,
              aliasScope: "llama-cpp"
            }, `${s.id}-llama-cpp-remote`) : s.kind === tr ? e.jsx(ir, {
              value: i,
              onChange: o,
              autoLoad: q,
              autoLoadModelOnSelect: false
            }, `${s.id}-mlx`) : e.jsx(lr, {
              getGeminiApiKey: () => s.apiKey || "",
              profileId: s.id,
              value: i,
              onChange: o,
              autoLoad: q
            }, `${s.id}-gemini`)
          ]
        }) : null,
        F && Ae && Ee ? e.jsx(wa, {
          modelId: i,
          value: Ae,
          onChange: Ee
        }) : null,
        F ? null : e.jsxs("div", {
          children: [
            e.jsxs("div", {
              className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsx(z, {
                    icon: gr,
                    children: "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8"
                  })
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: N,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(hr, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0C8\uB85C\uACE0\uCE68"
                  ]
                })
              ]
            }),
            e.jsx("textarea", {
              readOnly: !x,
              value: u,
              onChange: (d) => x == null ? void 0 : x(d.target.value),
              rows: 4,
              className: "w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
              placeholder: "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC5B4\uB3C4, \uC785\uB825\uD55C \uC9C0\uC2DC\uC0AC\uD56D\uC73C\uB85C \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
            })
          ]
        }),
        F ? null : e.jsxs("div", {
          children: [
            e.jsxs("div", {
              className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsxs(z, {
                    icon: yr,
                    children: [
                      "\uC785\uB825 \uC774\uBBF8\uC9C0",
                      f.length > 0 ? e.jsxs("span", {
                        className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                        children: [
                          "(",
                          f.length,
                          ")"
                        ]
                      }) : null
                    ]
                  })
                }),
                e.jsxs("div", {
                  className: "flex min-w-0 flex-wrap items-center justify-end gap-1",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        Rt();
                      },
                      disabled: O,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      children: [
                        O ? e.jsx(je, {
                          size: 12,
                          className: "animate-spin"
                        }) : e.jsx(kr, {
                          size: 12
                        }),
                        "\uD074\uB9BD\uBCF4\uB4DC\uC5D0\uC11C \uBD99\uC5EC\uB123\uAE30"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        var _a2;
                        return (_a2 = ae.current) == null ? void 0 : _a2.click();
                      },
                      disabled: O,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      children: [
                        O ? e.jsx(je, {
                          size: 12,
                          className: "animate-spin"
                        }) : e.jsx(lt, {
                          size: 12
                        }),
                        "\uCD94\uAC00"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => C == null ? void 0 : C(),
                      disabled: !f.length || O,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      title: "\uCCA8\uBD80 \uC774\uBBF8\uC9C0 \uBAA8\uB450 \uC81C\uAC70",
                      children: [
                        e.jsx(vr, {
                          size: 12,
                          "aria-hidden": true
                        }),
                        "\uCD08\uAE30\uD654"
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsx("input", {
              ref: ae,
              type: "file",
              accept: "image/jpeg,image/png,image/webp,image/gif",
              multiple: true,
              className: "hidden",
              onChange: (d) => {
                De(d.target.files);
              }
            }),
            e.jsx("div", {
              className: `rounded border border-dashed p-2 dark:border-odp-borderSoft ${f.length ? "border-gray-200 bg-gray-50/50 dark:bg-odp-bgSoft/40" : "border-gray-300 bg-gray-50 dark:bg-odp-bgSoft"}`,
              children: f.length ? e.jsx("div", {
                className: "grid grid-cols-2 gap-2",
                children: f.map((d) => e.jsxs("div", {
                  className: "relative overflow-hidden rounded border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => Pe(d),
                      className: "group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-violet-500",
                      "aria-label": `${d.name} \uD06C\uAC8C \uBCF4\uAE30`,
                      children: [
                        e.jsx("img", {
                          src: d.previewDataUrl,
                          alt: "",
                          className: "h-24 w-full object-cover"
                        }),
                        e.jsx("span", {
                          className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25",
                          "aria-hidden": true,
                          children: e.jsx(jr, {
                            size: 22,
                            className: "text-white opacity-0 drop-shadow-md transition-opacity group-hover:opacity-100"
                          })
                        })
                      ]
                    }),
                    e.jsx("div", {
                      className: "truncate px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-odp-muted",
                      title: d.name,
                      children: d.name
                    }),
                    e.jsx("button", {
                      type: "button",
                      onClick: () => g == null ? void 0 : g(d.id),
                      className: "absolute right-1 top-1 z-1 rounded bg-black/55 p-0.5 text-white hover:bg-black/75",
                      title: "\uC774\uBBF8\uC9C0 \uC81C\uAC70",
                      "aria-label": "\uC774\uBBF8\uC9C0 \uC81C\uAC70",
                      children: e.jsx(Ce, {
                        size: 12
                      })
                    })
                  ]
                }, d.id))
              }) : e.jsxs("p", {
                className: "py-3 text-center text-[11px] text-gray-500 dark:text-odp-muted",
                children: [
                  "AI \uB3C4\uC6B0\uBBF8 \uC5B4\uB514\uC5D0\uB4E0 \uC774\uBBF8\uC9C0\uB97C \uB193\uAC70\uB098 \u300C\uCD94\uAC00\u300D\uB85C \uC120\uD0DD\uD558\uC138\uC694.",
                  e.jsx("br", {}),
                  "\u300C\uD074\uB9BD\uBCF4\uB4DC\uC5D0\uC11C \uBD99\uC5EC\uB123\uAE30\u300D\uB610\uB294 Ctrl+V\uB85C \uBD99\uC5EC\uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                ]
              })
            }),
            Oe && e.jsx("p", {
              className: "mt-1 text-[10px] text-red-600 dark:text-red-400",
              children: Oe
            })
          ]
        }),
        F ? null : e.jsxs("div", {
          className: "space-y-2 rounded border border-gray-200 p-2 dark:border-odp-borderSoft",
          children: [
            e.jsxs("div", {
              className: "flex flex-wrap items-center gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsx(z, {
                    icon: wr,
                    children: "\uD15C\uD50C\uB9BF"
                  })
                }),
                e.jsxs("select", {
                  value: p,
                  onChange: (d) => m == null ? void 0 : m(d.target.value),
                  className: "min-w-0 flex-1 basis-48 rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                  children: [
                    e.jsx("option", {
                      value: "",
                      children: "\u2014 \uBD88\uB7EC\uC624\uAE30 \u2014"
                    }),
                    c.map((d) => e.jsx("option", {
                      value: d.id,
                      children: d.name
                    }, d.id))
                  ]
                })
              ]
            }),
            e.jsxs("p", {
              className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
              children: [
                "\uC6D0\uACA9 \uC800\uC7A5\uC18C",
                " ",
                e.jsx("code", {
                  className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft",
                  children: ".settings/llm-prompt-templates.json"
                }),
                "\uC5D0 \uB3D9\uAE30\uD654\uB429\uB2C8\uB2E4."
              ]
            }),
            e.jsx("input", {
              type: "text",
              value: j,
              onChange: (d) => A == null ? void 0 : A(d.target.value),
              placeholder: "\uD15C\uD50C\uB9BF \uC774\uB984",
              className: "w-full rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsxs("div", {
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => Ot((d) => !d),
                  className: `mb-1 flex w-full items-center justify-between gap-x-2 gap-y-1 rounded px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${H ? "bg-transparent" : "bg-slate-300/90 dark:bg-slate-950/40"}`,
                  "aria-expanded": H,
                  children: [
                    e.jsxs("span", {
                      className: "min-w-0 shrink-0 whitespace-nowrap",
                      children: [
                        e.jsx(z, {
                          icon: Sr,
                          children: "\uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8"
                        }),
                        !H && w.trim() ? e.jsx("span", {
                          className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                          children: he ? "(\uAE30\uBCF8)" : "(\uC218\uC815\uB428)"
                        }) : null
                      ]
                    }),
                    e.jsx(Nr, {
                      size: 14,
                      "aria-hidden": true,
                      className: `shrink-0 opacity-70 transition-transform ${H ? "rotate-180" : ""}`
                    })
                  ]
                }),
                e.jsx(yt, {
                  open: H,
                  children: e.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      e.jsx("p", {
                        className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
                        children: "\uD15C\uD50C\uB9BF\uB9C8\uB2E4 \uB2E4\uB974\uAC8C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uBE44\uC6B0\uBA74 \uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8 \uC5C6\uC774 \uC2E4\uD589\uB429\uB2C8\uB2E4."
                      }),
                      e.jsx("textarea", {
                        value: w,
                        onChange: (d) => P == null ? void 0 : P(d.target.value),
                        rows: 10,
                        placeholder: ve(),
                        className: "w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                      }),
                      e.jsx("div", {
                        className: "flex justify-end",
                        children: he ? e.jsx(dt, {
                          delayDuration: 250,
                          skipDelayDuration: 0,
                          children: e.jsxs(le, {
                            children: [
                              e.jsx(de, {
                                asChild: true,
                                children: e.jsx("span", {
                                  className: "inline-flex cursor-not-allowed",
                                  children: Me
                                })
                              }),
                              e.jsx(ce, {
                                children: e.jsxs(ue, {
                                  side: "top",
                                  sideOffset: 6,
                                  className: "z-100010 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong",
                                  children: [
                                    "\uC774\uBBF8 \uAE30\uBCF8\uAC12\uC785\uB2C8\uB2E4.",
                                    e.jsx(pe, {
                                      className: "fill-white dark:fill-odp-surface"
                                    })
                                  ]
                                })
                              })
                            ]
                          })
                        }) : Me
                      })
                    ]
                  })
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", {
                  className: "mb-1 block",
                  children: e.jsx(z, {
                    icon: _r,
                    children: "\uC9C0\uC2DC\uC0AC\uD56D"
                  })
                }),
                e.jsx("textarea", {
                  value: U,
                  onChange: (d) => y == null ? void 0 : y(d.target.value),
                  onKeyDown: Ut,
                  rows: 4,
                  placeholder: "\uC9C0\uC2DC\uC0AC\uD56D (\uC608: \uC774\uBBF8\uC9C0\uB97C \uC124\uBA85\uD558\uAC70\uB098, \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uB2E4\uC2DC \uC368 \uC8FC\uC138\uC694)",
                  className: "w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                })
              ]
            }),
            e.jsxs("div", {
              className: "flex flex-wrap gap-1.5 justify-end",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: vt,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(it, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0C8 \uD15C\uD50C\uB9BF"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: re,
                  className: "inline-flex items-center gap-1 rounded bg-violet-600 px-2 py-1 text-[11px] text-white hover:bg-violet-700",
                  children: [
                    e.jsx(Cr, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uD15C\uD50C\uB9BF \uC800\uC7A5"
                  ]
                }),
                te && e.jsxs("button", {
                  type: "button",
                  onClick: jt,
                  className: "inline-flex items-center gap-1 rounded border border-red-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-400",
                  children: [
                    e.jsx(ot, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0AD\uC81C"
                  ]
                })
              ]
            }),
            e.jsx(qa, {
              value: _,
              onChange: (d) => B == null ? void 0 : B(d)
            })
          ]
        }),
        b ? e.jsxs("button", {
          type: "button",
          onClick: Wt,
          disabled: !s,
          className: "flex w-full items-center justify-center gap-2 rounded bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60",
          "aria-label": F ? "\uC608\uCE21 \uC911 \u2014 \uD074\uB9AD\uD558\uC5EC \uCDE8\uC18C" : "\uC0DD\uC131 \uC911 \u2014 \uD074\uB9AD\uD558\uC5EC \uCDE8\uC18C",
          children: [
            e.jsx(je, {
              size: 16,
              className: "animate-spin",
              "aria-hidden": true
            }),
            F ? "\uC608\uCE21 \uC911\u2026" : "\uC0DD\uC131 \uC911\u2026"
          ]
        }) : e.jsxs("button", {
          type: "button",
          onPointerDown: $t,
          onMouseDown: Ft,
          onClick: Kt,
          disabled: !s,
          className: "flex w-full items-center justify-center gap-2 rounded bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60",
          children: [
            e.jsx(Ge, {
              size: 16,
              "aria-hidden": true
            }),
            F ? "Tabular \uC608\uCE21 \uC2E4\uD589" : "\uC2E4\uD589"
          ]
        }),
        typeof document < "u" ? Vt.createPortal(e.jsx(rr, {
          isOpen: Pt,
          title: "\uC0DD\uC131 \uCDE8\uC18C",
          message: "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131\uC744 \uCDE8\uC18C\uD560\uAE4C\uC694? \uC9C0\uAE08\uAE4C\uC9C0 \uBC1B\uC740 \uACB0\uACFC\uB294 \uC720\uC9C0\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uC0DD\uC131 \uCDE8\uC18C",
          cancelLabel: "\uACC4\uC18D \uC0DD\uC131",
          variant: "danger",
          onConfirm: () => {
            se(false), wt == null ? void 0 : wt();
          },
          onCancel: () => se(false)
        }), document.body) : null,
        v && e.jsx("p", {
          className: "rounded border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] whitespace-pre-line text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300",
          children: v
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("div", {
              className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsx(z, {
                    icon: Ge,
                    children: "\uACB0\uACFC"
                  })
                }),
                e.jsxs("div", {
                  className: "inline-flex rounded border border-gray-300 dark:border-odp-borderStrong",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => $ == null ? void 0 : $("text"),
                      className: `inline-flex items-center gap-1 px-2 py-0.5 text-[10px] ${T === "text" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100" : "text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`,
                      "aria-pressed": T === "text",
                      children: [
                        e.jsx(Lr, {
                          size: 11,
                          "aria-hidden": true
                        }),
                        "\uD14D\uC2A4\uD2B8"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => $ == null ? void 0 : $("preview"),
                      className: `inline-flex items-center gap-1 border-l border-gray-300 px-2 py-0.5 text-[10px] dark:border-odp-borderStrong ${T === "preview" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100" : "text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`,
                      "aria-pressed": T === "preview",
                      children: [
                        e.jsx(Ar, {
                          size: 11,
                          "aria-hidden": true
                        }),
                        "\uBBF8\uB9AC\uBCF4\uAE30"
                      ]
                    })
                  ]
                })
              ]
            }),
            T === "preview" ? e.jsx("div", {
              ref: Te,
              className: "min-h-32 max-h-64 overflow-auto rounded border border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              children: L ? e.jsx(ar, {
                id: ts,
                theme: t === "dark" ? "dark" : "light",
                language: "ko-KR",
                codeTheme: sr,
                customIcon: or,
                value: L,
                noMermaid: true,
                codeFoldable: false,
                showCodeRowNumber: false
              }) : e.jsx("p", {
                className: "px-2 py-3 text-[11px] text-gray-500 dark:text-odp-muted",
                children: "\uC2E4\uD589 \uD6C4 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }) : e.jsx("textarea", {
              readOnly: Tt,
              value: L,
              onChange: (d) => R == null ? void 0 : R(d.target.value),
              rows: 6,
              className: "w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
              placeholder: "\uC2E4\uD589 \uD6C4 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
            }),
            e.jsxs("div", {
              className: "mt-2 flex flex-wrap gap-1.5",
              children: [
                Lt ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsx("button", {
                      type: "button",
                      disabled: M,
                      ...It,
                      className: [
                        "inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[11px] font-medium disabled:cursor-not-allowed disabled:opacity-50",
                        be !== "floating" ? u.trim() ? "border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60" : "border-sky-400 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-100 dark:hover:bg-sky-900/60" : "border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
                      ].join(" "),
                      children: be !== "floating" ? u.trim() ? e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(Ye, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uB300\uCCB4\uD558\uAE30"
                        ]
                      }) : e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(Er, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uC0BD\uC785\uD558\uAE30"
                        ]
                      }) : e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(Ye, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uC120\uD0DD \uC601\uC5ED \uBC14\uAFD4\uCE58\uAE30"
                        ]
                      })
                    }),
                    e.jsxs("button", {
                      type: "button",
                      disabled: M,
                      ...Mt,
                      className: "inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60",
                      children: [
                        e.jsx(Tr, {
                          size: 14,
                          "aria-hidden": true
                        }),
                        "\uBB38\uC11C \uAC00\uC7A5 \uD558\uB2E8\uC5D0 \uC0BD\uC785"
                      ]
                    })
                  ]
                }) : null,
                be !== "floating" ? e.jsxs("button", {
                  type: "button",
                  disabled: M,
                  ...Dt,
                  className: "inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60",
                  children: [
                    e.jsx(Or, {
                      size: 14,
                      "aria-hidden": true
                    }),
                    "\uBCF5\uC0AC\uD558\uAE30"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  disabled: M,
                  ...zt,
                  className: "inline-flex items-center gap-1.5 rounded border border-emerald-400 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-800 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-100 dark:hover:bg-emerald-900/60",
                  children: [
                    e.jsx(Pr, {
                      size: 14,
                      "aria-hidden": true
                    }),
                    "\uC0C8 \uB178\uD2B8\uB85C"
                  ]
                })
              ]
            })
          ]
        })
      ]
    }), $e = e.jsx(Qa, {
      src: (ge == null ? void 0 : ge.previewDataUrl) ?? null,
      alt: (ge == null ? void 0 : ge.name) ?? "",
      open: !!ge,
      onClose: () => Pe(null)
    });
    return Et ? e.jsxs(Ha, {
      className: "min-h-0",
      disabled: !h || O,
      onFilesDrop: (d) => {
        De(d);
      },
      children: [
        ze,
        $e
      ]
    }) : e.jsxs(e.Fragment, {
      children: [
        ze,
        $e
      ]
    });
  };
});
export {
  Ha as L,
  __tla,
  Es as a,
  ks as b,
  vs as c,
  Os as d,
  k as e,
  hs as f,
  _s as g,
  Ss as h,
  ys as i,
  Ns as j,
  Ls as k,
  js as l,
  Cs as n,
  ws as o,
  Ts as p,
  As as s
};
