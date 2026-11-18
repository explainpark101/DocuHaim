const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/webviewWindow-BUZMX_UD.js","assets/webview-BBbTmcoI.js","assets/window-DOx76Tv8.js","assets/core-BUhCcD2K.js","assets/event-Cs6lN1fb.js","assets/image-DfyZ6glJ.js"])))=>i.map(i=>d[i]);
import { _ as M } from "./vendor-aws-hJDgVEKM.js";
import { e as L, c as lt, __tla as __tla_0 } from "./bootSplash-Z2krRgC9.js";
import { r as o, j as e, a as lr, __tla as __tla_1 } from "./vendor-react-BPvvDyqO.js";
import { bF as We, R as dr, ae as cr, O as ur, bC as pr, eB as xr, h as ee, U as mr, g as te, L as dt, m as ct, x as ue, y as ut, i as pt, p as br, eC as gr, eD as fr, __tla as __tla_2 } from "./index-Cc1jKdr9.js";
import { u as hr, M as yr } from "./useLazyMermaidRender-BEGREvhj.js";
import { O as pe, M as xt, G as mt } from "./OpenAiCompatibleModelSelect-CNVPsjM1.js";
import { L as bt, a as gt } from "./LlamaCppModelSelect-CcvgaduJ.js";
import { aA as vr, W as ft, X as Ee, aB as kr, y as Ve, g as jr, aC as wr, T as ht, a9 as Ge, a as yt, V as vt, B as kt, aD as jt, ay as wt, N as Nr, _ as Sr, L as de, aE as Cr, aF as _r, aG as Lr, aH as Er, aI as Nt, x as St, aJ as Ar, w as Tr, S as Ye, m as Or, E as Rr, aK as qe, aL as Ir, aM as Dr, l as Pr, aN as zr, v as Mr, u as $r, J as Kr, ak as Ur, M as Fr } from "./vendor-lucide-BMfkLP2z.js";
import { p as Br, q as Wr, r as Vr, G as Gr, H as Yr, I as He, J as Je, v as Ct, _ as qr, a0 as Hr, a1 as Jr, a2 as Xr, a3 as Qr, a4 as Zr, a5 as ea, a6 as ta, w as xe, x as me, y as be, z as ge, A as fe, a7 as ra, a8 as aa, a9 as sa, aa as na, ab as oa, ac as ia, ad as la, ae as da, af as ca, ag as ua, ah as Xe } from "./vendor-radix-C_q1g830.js";
import { r as Se, a as pa, e as xa } from "./llmAssistImages-DG7rjEWr.js";
import { A as _t, m as Le } from "./vendor-motion-Bv-XITR_.js";
import { I as ma, a as ba } from "./ImageLightboxDownloadButton-BrJHusbw.js";
import { E as ie, j as ga, x as fa, y as ha, z as ya, A as va, b as ka, a as ja, k as wa, d as Na, h as Sa, G as Ca } from "./vendor-codemirror-V7b8BJE-.js";
import { f as J, r as le, h as X, p as Ce, n as Lt, j as Et, k as _a, m as La } from "./openaiCompatibleClient-DDjC_ayR.js";
let as, us, $s, Es, As, Bs, Fs, Us, k, Ls, _s, Vs, Ws, Ds, Rs, Is, Ks, zs, Ps, Ms, Ts, Os;
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
  const Ea = "size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-violet-500 data-[state=checked]:bg-violet-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", Aa = "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white";
  function Ta(t) {
    return t === dr ? "classification" : "regression";
  }
  function Qe({ label: t, file: r, onPick: a, onClear: s }) {
    const n = o.useRef(null);
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
                    return (_a2 = n.current) == null ? void 0 : _a2.click();
                  },
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(ft, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "CSV \uC120\uD0DD"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: s,
                  disabled: !r,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(Ee, {
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
          ref: n,
          type: "file",
          accept: ".csv,text/csv",
          className: "hidden",
          onChange: (i) => {
            var _a2;
            const l = ((_a2 = i.target.files) == null ? void 0 : _a2[0]) ?? null;
            a(l), i.target.value = "";
          }
        }),
        e.jsx("p", {
          className: "truncate rounded border border-dashed border-gray-300 bg-white/80 px-2 py-1.5 text-[11px] text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60 dark:text-odp-muted",
          children: r ? `${r.name} \xB7 ${(r.size / 1024).toFixed(1)} KB` : "\uC120\uD0DD\uB41C \uD30C\uC77C \uC5C6\uC74C"
        })
      ]
    });
  }
  _s = function(t = "classification") {
    return {
      trainFile: null,
      testFile: null,
      targetColumn: "target",
      outputType: t === "classification" ? "class" : "point"
    };
  };
  function Oa({ modelId: t, value: r, onChange: a }) {
    const s = o.useMemo(() => Ta(t), [
      t
    ]), n = s === "classification" ? [
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
    return o.useEffect(() => {
      (s === "classification" ? /* @__PURE__ */ new Set([
        "class",
        "probability"
      ]) : /* @__PURE__ */ new Set([
        "point",
        "full"
      ])).has(r.outputType) || a({
        ...r,
        outputType: s === "classification" ? "class" : "point"
      });
    }, [
      a,
      s,
      r.outputType
    ]), e.jsxs("div", {
      className: "space-y-2.5",
      children: [
        e.jsxs("section", {
          className: We("sky", {
            compact: true
          }),
          "aria-label": "EXAONE Tabular CSV",
          children: [
            e.jsxs("div", {
              className: "flex items-start gap-2",
              children: [
                e.jsx(vr, {
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
                        s
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
                            s
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
            e.jsx(Qe, {
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
            e.jsx(Qe, {
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
          className: We("violet", {
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
                e.jsx(Br, {
                  className: "flex flex-wrap items-center gap-3",
                  value: r.outputType,
                  onValueChange: (i) => {
                    n.some((l) => l.value === i) && a({
                      ...r,
                      outputType: i
                    });
                  },
                  "aria-label": "EXAONE Tabular output type",
                  children: n.map((i) => e.jsxs("label", {
                    className: "flex cursor-pointer items-center gap-1.5 text-[11px] text-gray-700 dark:text-odp-fg",
                    children: [
                      e.jsx(Wr, {
                        value: i.value,
                        className: Ea,
                        children: e.jsx(Vr, {
                          className: Aa
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
  let Z;
  Z = "s3haim-llm-assist";
  k = {
    READY: `${Z}:ready`,
    SYNC: `${Z}:sync`,
    ACTION: `${Z}:action`,
    PARENT_CLOSING: `${Z}:parent-closing`
  };
  function Ra(t) {
    return !!(t && typeof t.type == "string" && t.type.startsWith(Z));
  }
  function Ia() {
    if (L()) {
      const a = new URL(window.location.href);
      return a.hash = "#/llm-assist-popout", a.toString();
    }
    const r = `${"/DocuHaim/".replace(/\/$/, "") || "/"}/llm-assist-popout`.replace(/\/+/g, "/");
    return new URL(r, window.location.origin).toString();
  }
  const At = "s3haim-llm-assist", Tt = "popup=yes,width=480,height=820,menubar=no,toolbar=no,location=no,status=no,resizable=yes";
  function he(t, r, a = {}) {
    !t || t.closed || t.postMessage({
      type: r,
      ...a
    }, window.location.origin);
  }
  const re = At, Ot = "main";
  function Y(t) {
    if (!Ra(t)) return null;
    const r = t, a = {
      type: String(r.type)
    };
    return r.state && typeof r.state == "object" && (a.state = r.state), typeof r.action == "string" && (a.action = r.action), r.payload && typeof r.payload == "object" && (a.payload = r.payload), a;
  }
  function Da(t) {
    const r = {};
    for (const a of t.split(",")) {
      const [s, n] = a.trim().split("="), i = s == null ? void 0 : s.trim().toLowerCase(), l = n == null ? void 0 : n.trim();
      !i || !l || (i === "width" && (r.width = Number(l)), i === "height" && (r.height = Number(l)), i === "resizable" && (r.resizable = l === "yes" || l === "true" || l === "1"));
    }
    return r;
  }
  async function Ae() {
    const { WebviewWindow: t } = await M(async () => {
      const { WebviewWindow: r } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        WebviewWindow: r
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return t.getByLabel(re);
  }
  Ls = async function() {
    if (!L()) return false;
    const { getCurrentWebviewWindow: t } = await M(async () => {
      const { getCurrentWebviewWindow: r } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        getCurrentWebviewWindow: r
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return t().label === re;
  };
  Es = async function() {
    if (!L()) return true;
    const { WebviewWindow: t } = await M(async () => {
      const { WebviewWindow: a } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        WebviewWindow: a
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return await t.getByLabel(Ot) !== null;
  };
  async function Pa() {
    const { WebviewWindow: t } = await M(async () => {
      const { WebviewWindow: n } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        WebviewWindow: n
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), r = await t.getByLabel(re);
    if (r) return await r.setFocus(), true;
    const a = Da(Tt), s = new t(re, {
      url: "/#/llm-assist-popout",
      width: a.width ?? 480,
      height: a.height ?? 820,
      resizable: a.resizable ?? true,
      center: true,
      title: "AI \uB3C4\uC6B0\uBBF8"
    });
    return await new Promise((n) => {
      let i = false;
      const l = (u) => {
        i || (i = true, n(u));
      };
      s.once("tauri://created", () => l(true)), s.once("tauri://error", (u) => {
        console.warn("LLM assist Tauri popout failed:", u), l(false);
      }), window.setTimeout(() => l(true), 4e3);
    });
  }
  async function za() {
    const t = await Ae();
    t && await t.setFocus();
  }
  async function Ma() {
    return await Ae() !== null;
  }
  async function Rt() {
    const t = await Ae();
    if (t) try {
      await t.close();
    } catch {
    }
  }
  As = async function() {
    if (!L()) return;
    const { getCurrentWebviewWindow: t } = await M(async () => {
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
  function It(t, r = {}) {
    (async () => {
      try {
        const { emitTo: a } = await M(async () => {
          const { emitTo: s } = await import("./event-Cs6lN1fb.js");
          return {
            emitTo: s
          };
        }, __vite__mapDeps([4,3]));
        await a(re, t, r);
      } catch (a) {
        console.warn("LLM assist emit to popout failed:", a);
      }
    })();
  }
  function Dt(t, r = {}) {
    (async () => {
      try {
        const { emitTo: a } = await M(async () => {
          const { emitTo: s } = await import("./event-Cs6lN1fb.js");
          return {
            emitTo: s
          };
        }, __vite__mapDeps([4,3]));
        await a(Ot, t, r);
      } catch (a) {
        console.warn("LLM assist emit to main failed:", a);
      }
    })();
  }
  async function $a(t) {
    const { getCurrentWebviewWindow: r } = await M(async () => {
      const { getCurrentWebviewWindow: i } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        getCurrentWebviewWindow: i
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), a = r(), s = await a.listen(k.READY, (i) => {
      const l = Y({
        type: k.READY,
        ...i.payload
      });
      l && t(l);
    }), n = await a.listen(k.ACTION, (i) => {
      const l = Y({
        type: k.ACTION,
        ...i.payload
      });
      l && t(l);
    });
    return () => {
      s(), n();
    };
  }
  async function Ka(t) {
    const { getCurrentWebviewWindow: r } = await M(async () => {
      const { getCurrentWebviewWindow: i } = await import("./webviewWindow-BUZMX_UD.js");
      return {
        getCurrentWebviewWindow: i
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), a = r(), s = await a.listen(k.SYNC, (i) => {
      const l = Y({
        type: k.SYNC,
        ...i.payload
      });
      l && t(l);
    }), n = await a.listen(k.PARENT_CLOSING, (i) => {
      const l = Y({
        type: k.PARENT_CLOSING,
        ...i.payload
      });
      l && t(l);
    });
    return () => {
      s(), n();
    };
  }
  Ts = async function(t) {
    if (L()) {
      await za();
      return;
    }
    t && !t.closed && t.focus();
  };
  Os = async function() {
    if (L()) return await Pa() ? "tauri" : null;
    const t = Ia();
    return window.open(t, At, Tt);
  };
  Rs = async function(t) {
    if (L()) {
      await Rt();
      return;
    }
    if (t && !t.closed) try {
      t.close();
    } catch {
    }
  };
  Is = async function(t) {
    return L() ? Ma() : !!(t && !t.closed);
  };
  Ds = function(t, r) {
    if (L()) {
      It(k.SYNC, {
        state: r
      });
      return;
    }
    !t || t.closed || he(t, k.SYNC, {
      state: r
    });
  };
  Ps = function(t) {
    if (L()) {
      It(k.PARENT_CLOSING, {}), Rt();
      return;
    }
    if (!(!t || t.closed)) {
      he(t, k.PARENT_CLOSING);
      try {
        t.close();
      } catch {
      }
    }
  };
  zs = async function(t) {
    if (L()) return $a(t);
    const r = (a) => {
      if (a.origin !== window.location.origin) return;
      const s = Y(a.data);
      s && (s.type === k.READY || s.type === k.ACTION) && (s.source = a.source && typeof a.source.postMessage == "function" ? a.source : null, t(s));
    };
    return window.addEventListener("message", r), () => window.removeEventListener("message", r);
  };
  Ms = async function(t) {
    if (L()) return Ka(t);
    const r = (a) => {
      if (a.origin !== window.location.origin) return;
      const s = Y(a.data);
      s && (s.type === k.SYNC || s.type === k.PARENT_CLOSING) && t(s);
    };
    return window.addEventListener("message", r), () => window.removeEventListener("message", r);
  };
  $s = function() {
    if (L()) {
      Dt(k.READY, {});
      return;
    }
    !window.opener || window.opener.closed || he(window.opener, k.READY);
  };
  Ks = function(t, r = {}) {
    if (L()) {
      Dt(k.ACTION, {
        action: t,
        payload: r
      });
      return;
    }
    !window.opener || window.opener.closed || he(window.opener, k.ACTION, {
      action: t,
      payload: r
    });
  };
  function Ua({ value: t, onChange: r, className: a = "" }) {
    const s = o.useRef(null), n = o.useRef(null), i = o.useRef(r);
    return i.current = r, o.useEffect(() => {
      const l = s.current;
      if (!l) return;
      const u = new ie({
        parent: l,
        state: ga.create({
          doc: t,
          extensions: [
            ha(),
            ya(),
            va(),
            ka(),
            ja(),
            wa.of([
              ...Na,
              ...Sa
            ]),
            Ca(),
            fa,
            ie.lineWrapping,
            ie.updateListener.of((b) => {
              b.docChanged && i.current(b.state.doc.toString());
            }),
            ie.theme({
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
      return n.current = u, () => {
        u.destroy(), n.current = null;
      };
    }, []), o.useEffect(() => {
      const l = n.current;
      if (!l) return;
      const u = l.state.doc.toString();
      u !== t && l.dispatch({
        changes: {
          from: 0,
          to: u.length,
          insert: t
        }
      });
    }, [
      t
    ]), e.jsx("div", {
      ref: s,
      className: `min-h-0 overflow-hidden rounded border border-gray-700/80 ${a}`
    });
  }
  const Fa = [
    0.4,
    0,
    0.2,
    1
  ];
  function Te({ open: t, children: r, className: a = "" }) {
    return e.jsx(_t, {
      initial: false,
      children: t ? e.jsx(Le.div, {
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
          ease: Fa
        },
        className: `overflow-hidden ${a}`,
        children: r
      }, "llm-assist-collapse") : null
    });
  }
  const Ze = 80, Ba = 350;
  function et(t) {
    return JSON.stringify(t);
  }
  function tt(t) {
    try {
      const r = JSON.parse(t);
      return !r || typeof r != "object" || r.tab !== "fields" && r.tab !== "json" || !Array.isArray(r.entries) || typeof r.jsonText != "string" ? null : r;
    } catch {
      return null;
    }
  }
  function Wa(t) {
    return !Array.isArray(t) || t.length === 0 ? [] : t.length <= Ze ? t : t.slice(t.length - Ze);
  }
  function Va(t, r, a) {
    const s = Array.isArray(t) && t.length > 0 ? t : [];
    if (s.length === 0) return {
      stack: [
        a
      ],
      index: 0,
      changed: true
    };
    const n = Math.max(0, Math.min(r, s.length - 1));
    if (s[n] === a) return {
      stack: s,
      index: n,
      changed: false
    };
    const i = s.slice(0, n + 1);
    i.push(a);
    const l = Wa(i);
    return {
      stack: l,
      index: l.length - 1,
      changed: true
    };
  }
  function Ga({ enabled: t, historyKey: r, tab: a, entries: s, jsonText: n, applySnapshot: i }) {
    const l = o.useRef([]), u = o.useRef(0), b = o.useRef(false), _ = o.useRef(false), x = o.useRef(null), f = o.useRef(null), h = o.useRef(i);
    h.current = i;
    const [j, P] = o.useState(0), y = o.useCallback(() => P((g) => g + 1), []), N = o.useCallback(() => {
      x.current && (clearTimeout(x.current), x.current = null);
    }, []), T = o.useCallback(() => et({
      tab: a,
      entries: s,
      jsonText: n
    }), [
      s,
      n,
      a
    ]), w = o.useCallback(() => {
      N();
      const g = f.current;
      if (g == null) return;
      f.current = null;
      const v = Va(l.current, u.current, g);
      v.changed && (l.current = v.stack, u.current = v.index, y());
    }, [
      y,
      N
    ]);
    o.useEffect(() => {
      if (!t) {
        N(), f.current = null, l.current = [], u.current = 0, _.current = false, y();
        return;
      }
      if (r <= 0) return;
      N(), f.current = null;
      const g = et({
        tab: a,
        entries: s,
        jsonText: n
      });
      l.current = [
        g
      ], u.current = 0, _.current = true, y();
    }, [
      t,
      r,
      y,
      N
    ]), o.useEffect(() => {
      if (!t || !_.current || b.current) return;
      const g = T();
      if (l.current[u.current] !== g) return f.current = g, N(), x.current = setTimeout(() => {
        x.current = null, w();
      }, Ba), () => {
        N();
      };
    }, [
      N,
      T,
      t,
      w,
      s,
      n,
      a
    ]);
    const z = o.useCallback(() => {
      !t || !_.current || b.current || (f.current = T(), w());
    }, [
      T,
      t,
      w
    ]), S = o.useCallback(() => {
      if (w(), u.current <= 0) return false;
      u.current -= 1;
      const g = l.current[u.current], v = g ? tt(g) : null;
      return v ? (b.current = true, h.current({
        tab: v.tab,
        entries: v.entries.map((d) => ({
          ...d
        })),
        jsonText: v.jsonText
      }), y(), requestAnimationFrame(() => {
        b.current = false;
      }), true) : false;
    }, [
      y,
      w
    ]), O = o.useCallback(() => {
      if (w(), u.current >= l.current.length - 1) return false;
      u.current += 1;
      const g = l.current[u.current], v = g ? tt(g) : null;
      return v ? (b.current = true, h.current({
        tab: v.tab,
        entries: v.entries.map((d) => ({
          ...d
        })),
        jsonText: v.jsonText
      }), y(), requestAnimationFrame(() => {
        b.current = false;
      }), true) : false;
    }, [
      y,
      w
    ]), E = t && _.current && u.current > 0, A = t && _.current && u.current < l.current.length - 1;
    return {
      undo: S,
      redo: O,
      canUndo: E,
      canRedo: A,
      recordNow: z
    };
  }
  const Ya = {
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
  }, rt = {
    detail: "\uC81C\uC548 \uBAA9\uB85D\uC5D0 \uC5C6\uB294 key\uB3C4 OpenAI \uD638\uD658 \uC694\uCCAD \uBCF8\uBB38\uC5D0 \uADF8\uB300\uB85C \uD569\uCCD0\uC9D1\uB2C8\uB2E4. \uC11C\uBC84/\uBAA8\uB378\uC774 \uC9C0\uC6D0\uD558\uB294\uC9C0\uB294 \uC81C\uACF5\uC790 \uBB38\uC11C\uB97C \uD655\uC778\uD558\uC138\uC694. \uAC12\uC740 JSON \uB9AC\uD130\uB7F4(\uC22B\uC790, \uBD88\uB9AC\uC5B8, \uBC30\uC5F4, \uAC1D\uCCB4) \uB610\uB294 \uBB38\uC790\uC5F4\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
    valuePlaceholder: 'JSON \uAC12 (\uC608: 0.4, true, "text", [1,2])'
  }, qa = {
    summary: "\uC635\uC158 \uD0A4\uB97C \uC120\uD0DD\uD558\uAC70\uB098 \uC785\uB825\uD558\uC138\uC694.",
    detail: "\uC81C\uC548 \uBAA9\uB85D\uC5D0\uC11C key\uB97C \uACE0\uB974\uAC70\uB098 \uC9C1\uC811 \uC785\uB825\uD55C \uB4A4 value\uB97C \uC124\uC815\uD569\uB2C8\uB2E4. key\uAC00 \uBE44\uC5B4 \uC788\uC73C\uBA74 \uC694\uCCAD\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
    valuePlaceholder: "value (\uD0A4 \uC120\uD0DD \uD6C4 \uD615\uC2DD \uD45C\uC2DC)"
  };
  function ce(t) {
    const r = t.trim();
    if (!r) return qa;
    const a = Ya[r];
    return a || {
      summary: `\uC0AC\uC6A9\uC790 \uC815\uC758 \uC635\uC158 "${r}"\uC785\uB2C8\uB2E4.`,
      detail: `${rt.detail}

\uD604\uC7AC key: ${r}`,
      valuePlaceholder: rt.valuePlaceholder
    };
  }
  function Ha(t) {
    return ce(t).valuePlaceholder;
  }
  function Ja(t) {
    const r = t.trim(), a = r ? `OpenAI API ${r} parameter LLM` : "OpenAI chat completion API parameters";
    return `https://www.google.com/search?q=${encodeURIComponent(a)}`;
  }
  const at = "z-100010 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong", Xa = "z-100011 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong", Qa = "cursor-pointer rounded px-2 py-1 text-[11px] outline-none data-disabled:cursor-not-allowed data-disabled:opacity-40 data-highlighted:bg-violet-50 dark:data-highlighted:bg-violet-950/40", Za = "\uC81C\uC548 \uBAA9\uB85D\uC5D0 \uC5C6\uB294 key\uB97C \uC9C1\uC811 \uC785\uB825\uD569\uB2C8\uB2E4.", es = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800/80 dark:text-red-400 dark:hover:bg-red-950/40", st = "inline-flex flex-1 items-center justify-center gap-1 rounded px-2 py-1 text-[11px] font-medium outline-none transition data-[state=inactive]:text-gray-500 data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:data-[state=inactive]:text-odp-muted dark:data-[state=active]:text-white", ts = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft", W = "__custom__";
  function rs(t) {
    return t && Et.includes(t) ? t : W;
  }
  function nt(t) {
    try {
      return JSON.stringify(Lt(t));
    } catch {
      return "";
    }
  }
  function ot({ value: t, label: r, tip: a, dimmed: s = false }) {
    return e.jsxs(xe, {
      children: [
        e.jsx(me, {
          asChild: true,
          children: e.jsx(ra, {
            value: t,
            className: `${Qa}${s ? " opacity-40" : ""}`,
            children: e.jsx(aa, {
              children: r
            })
          })
        }),
        e.jsx(be, {
          children: e.jsxs(ge, {
            side: "left",
            sideOffset: 8,
            className: Xa,
            children: [
              a,
              e.jsx(fe, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Pt({ value: t, onChange: r }) {
    const [a, s] = o.useState(false), [n, i] = o.useState("fields"), [l, u] = o.useState(null), [b, _] = o.useState(0), [x, f] = o.useState(() => J(t)), [h, j] = o.useState(() => le(t)), [P, y] = o.useState(""), N = o.useRef(x);
    N.current = x, o.useEffect(() => {
      a && _((d) => d + 1);
    }, [
      a
    ]);
    const T = o.useCallback((d) => {
      if (i(d.tab), f(d.entries.map((m) => ({
        ...m
      }))), j(d.jsonText), d.tab === "fields") {
        const m = X(d.entries);
        y(""), r(m);
        return;
      }
      const p = Ce(d.jsonText);
      if (p.ok) {
        y(""), f(J(p.options)), r(p.options);
        return;
      }
      y(p.error), r(X(d.entries));
    }, [
      r
    ]), { undo: w, redo: z } = Ga({
      enabled: a,
      historyKey: b,
      tab: n,
      entries: x,
      jsonText: h,
      applySnapshot: T
    });
    o.useEffect(() => {
      const d = Lt(t), p = X(N.current);
      nt(d) !== nt(p) && (f(J(d)), j(le(d)), y(""), a && _((m) => m + 1));
    }, [
      t,
      a
    ]);
    const S = o.useMemo(() => new Set(x.map((d) => d.key.trim()).filter(Boolean)), [
      x
    ]), O = (d) => {
      f(d);
      const p = X(d);
      j(le(p)), y(""), r(p);
    }, E = (d) => {
      j(d);
      const p = Ce(d);
      if (!p.ok) {
        y(p.error);
        return;
      }
      y(""), f(J(p.options)), r(p.options);
    }, A = Object.keys(t || {}).length, g = l !== null ? ce(l) : null, v = l !== null && l.trim() ? l.trim() : "\uC635\uC158 \uD0A4";
    return o.useEffect(() => {
      if (!a || l !== null) return;
      const d = (p) => {
        if (!(p.metaKey || p.ctrlKey) || p.altKey) return;
        const C = p.key.toLowerCase(), R = C === "z" && !p.shiftKey, ae = C === "y" || C === "z" && p.shiftKey;
        if (!(!R && !ae)) {
          if (n === "json") {
            const se = p.target;
            if (se instanceof Element && se.closest(".cm-editor")) return;
          }
          p.preventDefault(), p.stopPropagation(), p.stopImmediatePropagation(), ae ? z() : w();
        }
      };
      return window.addEventListener("keydown", d, true), () => window.removeEventListener("keydown", d, true);
    }, [
      l,
      a,
      z,
      n,
      w
    ]), e.jsxs("div", {
      className: `rounded border border-gray-200 dark:border-odp-borderSoft ${a ? "" : "bg-slate-300/90 dark:bg-slate-950/40"}`,
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => s((d) => !d),
          className: `flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-1 px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${a ? "rounded-t bg-transparent" : "rounded"}`,
          "aria-expanded": a,
          children: [
            e.jsxs("span", {
              className: "shrink-0 whitespace-nowrap",
              children: [
                e.jsxs("span", {
                  className: "inline-flex items-center gap-1",
                  children: [
                    e.jsx(kr, {
                      size: 13,
                      className: "shrink-0 opacity-70",
                      "aria-hidden": true
                    }),
                    "\uACE0\uAE09 \uC124\uC815"
                  ]
                }),
                !a && A > 0 ? e.jsxs("span", {
                  className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                  children: [
                    "(",
                    A,
                    ")"
                  ]
                }) : null
              ]
            }),
            e.jsx(Ve, {
              size: 14,
              "aria-hidden": true,
              className: `shrink-0 opacity-70 transition-transform ${a ? "rotate-180" : ""}`
            })
          ]
        }),
        e.jsx(Te, {
          open: a,
          children: e.jsxs("div", {
            className: "space-y-2 border-t border-gray-200 px-2 pb-2 pt-2 dark:border-odp-borderSoft",
            children: [
              e.jsx("p", {
                className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
                children: "LLM \uC694\uCCAD\uC5D0 \uD569\uCCD0\uC9C0\uB294 \uC0DD\uC131 \uC635\uC158\uC785\uB2C8\uB2E4. \uC81C\uC548 \uBAA9\uB85D \uC678 key\uB3C4 \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
              }),
              e.jsxs(Gr, {
                value: n,
                onValueChange: (d) => {
                  const p = d === "json" ? "json" : "fields";
                  if (p === "json") j(le(X(x))), y("");
                  else {
                    const m = Ce(h);
                    m.ok && (f(J(m.options)), y(""));
                  }
                  i(p);
                },
                children: [
                  e.jsxs(Yr, {
                    className: "flex gap-1 rounded border border-gray-200 p-0.5 dark:border-odp-borderSoft",
                    children: [
                      e.jsxs(He, {
                        value: "fields",
                        className: st,
                        children: [
                          e.jsx(jr, {
                            size: 12,
                            "aria-hidden": true,
                            className: "opacity-80"
                          }),
                          "\uD544\uB4DC"
                        ]
                      }),
                      e.jsxs(He, {
                        value: "json",
                        className: st,
                        children: [
                          e.jsx(wr, {
                            size: 12,
                            "aria-hidden": true,
                            className: "opacity-80"
                          }),
                          "JSON"
                        ]
                      })
                    ]
                  }),
                  e.jsxs(Je, {
                    value: "fields",
                    className: "mt-2 space-y-2 outline-none",
                    children: [
                      e.jsx(Ct, {
                        delayDuration: 250,
                        skipDelayDuration: 0,
                        children: x.map((d) => {
                          const p = rs(d.key);
                          return e.jsxs("div", {
                            className: "space-y-1 rounded border border-gray-100 p-1.5 dark:border-odp-borderSoft/60",
                            children: [
                              e.jsxs("div", {
                                className: "flex flex-wrap items-start gap-x-1 gap-y-1",
                                children: [
                                  e.jsxs(qr, {
                                    value: p,
                                    onValueChange: (m) => {
                                      m !== W && S.has(m) && d.key !== m || O(x.map((C) => C.id !== d.id ? C : m === W ? {
                                        ...C,
                                        key: p === W ? C.key : ""
                                      } : {
                                        ...C,
                                        key: m
                                      }));
                                    },
                                    children: [
                                      e.jsxs(Hr, {
                                        className: "inline-flex h-7 min-w-[8rem] flex-1 items-center justify-between gap-1 rounded border border-gray-300 bg-white px-2 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                                        "aria-label": "\uC635\uC158 \uD0A4",
                                        children: [
                                          e.jsx(Jr, {
                                            placeholder: "key \uC120\uD0DD"
                                          }),
                                          e.jsx(Xr, {
                                            children: e.jsx(Ve, {
                                              size: 12,
                                              "aria-hidden": true
                                            })
                                          })
                                        ]
                                      }),
                                      e.jsx(Qr, {
                                        children: e.jsx(Zr, {
                                          className: "z-100010 max-h-64 overflow-auto rounded border border-gray-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
                                          position: "popper",
                                          sideOffset: 4,
                                          children: e.jsxs(ea, {
                                            className: "p-1",
                                            children: [
                                              Et.map((m) => e.jsx(ot, {
                                                value: m,
                                                label: m,
                                                tip: ce(m).summary,
                                                dimmed: S.has(m) && d.key !== m
                                              }, m)),
                                              e.jsx(ta, {
                                                className: "my-1 h-px bg-gray-200 dark:bg-odp-borderSoft"
                                              }),
                                              e.jsx(ot, {
                                                value: W,
                                                label: "\uC9C1\uC811 \uC785\uB825\u2026",
                                                tip: Za
                                              })
                                            ]
                                          })
                                        })
                                      })
                                    ]
                                  }),
                                  e.jsxs(xe, {
                                    children: [
                                      e.jsx(me, {
                                        asChild: true,
                                        children: e.jsx("button", {
                                          type: "button",
                                          onClick: () => {
                                            const m = x.filter((C) => C.id !== d.id);
                                            O(m.length ? m : _a());
                                          },
                                          className: es,
                                          "aria-label": "\uD589 \uC0AD\uC81C",
                                          children: e.jsx(ht, {
                                            size: 12,
                                            "aria-hidden": true
                                          })
                                        })
                                      }),
                                      e.jsx(be, {
                                        children: e.jsxs(ge, {
                                          side: "top",
                                          sideOffset: 4,
                                          className: at,
                                          children: [
                                            "\uD589 \uC0AD\uC81C",
                                            e.jsx(fe, {
                                              className: "fill-white dark:fill-odp-surface"
                                            })
                                          ]
                                        })
                                      })
                                    ]
                                  }),
                                  e.jsxs(xe, {
                                    children: [
                                      e.jsx(me, {
                                        asChild: true,
                                        children: e.jsx("button", {
                                          type: "button",
                                          onClick: () => u(d.key),
                                          className: ts,
                                          "aria-label": `${d.key.trim() || "\uC635\uC158"} \uC124\uBA85`,
                                          children: e.jsx(Ge, {
                                            size: 12,
                                            "aria-hidden": true
                                          })
                                        })
                                      }),
                                      e.jsx(be, {
                                        children: e.jsxs(ge, {
                                          side: "top",
                                          sideOffset: 4,
                                          className: at,
                                          children: [
                                            ce(d.key).summary,
                                            e.jsx(fe, {
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
                                value: d.key,
                                onChange: (m) => {
                                  const C = m.target.value;
                                  O(x.map((R) => R.id === d.id ? {
                                    ...R,
                                    key: C
                                  } : R));
                                },
                                placeholder: "custom key",
                                className: "w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                              }) : null,
                              e.jsx("input", {
                                type: "text",
                                value: d.valueText,
                                onChange: (m) => {
                                  const C = m.target.value;
                                  O(x.map((R) => R.id === d.id ? {
                                    ...R,
                                    valueText: C
                                  } : R));
                                },
                                placeholder: Ha(d.key),
                                className: "w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                              })
                            ]
                          }, d.id);
                        })
                      }),
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => O([
                          ...x,
                          La()
                        ]),
                        className: "inline-flex w-full items-center justify-center gap-1 rounded border border-dashed border-gray-300 px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                        children: [
                          e.jsx(yt, {
                            size: 12,
                            "aria-hidden": true
                          }),
                          "\uC635\uC158 \uCD94\uAC00"
                        ]
                      })
                    ]
                  }),
                  e.jsxs(Je, {
                    value: "json",
                    className: "mt-2 outline-none",
                    children: [
                      e.jsx("div", {
                        className: "h-40",
                        children: e.jsx(Ua, {
                          value: h,
                          onChange: E,
                          className: "h-full"
                        })
                      }),
                      P ? e.jsx("p", {
                        className: "mt-1 text-[10px] text-red-600 dark:text-red-400",
                        children: P
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
        e.jsx(cr, {
          isOpen: l !== null,
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
                  children: e.jsx(Ge, {
                    size: 24,
                    "aria-hidden": true
                  })
                })
              }),
              e.jsx("h2", {
                className: "mb-2 text-center text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
                children: v
              }),
              g ? e.jsx("p", {
                className: "mb-5 text-start text-sm leading-relaxed whitespace-pre-line break-keep text-gray-600 dark:text-gray-400",
                children: g.detail
              }) : null,
              e.jsxs("div", {
                className: "flex flex-wrap justify-center gap-2",
                children: [
                  e.jsxs(ur, {
                    variant: "secondary",
                    onClick: () => u(null),
                    children: [
                      e.jsx(pr, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "\uB2EB\uAE30"
                    ]
                  }),
                  e.jsxs("a", {
                    href: Ja(l ?? ""),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:bg-blue-600 dark:hover:bg-blue-700",
                    children: [
                      e.jsx(xr, {
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
  function _e(t) {
    return t ? [
      ...t.types
    ].includes("Files") : false;
  }
  as = function({ children: t, className: r = "", disabled: a = false, onFilesDrop: s }) {
    const [n, i] = o.useState(false), l = o.useRef(0);
    o.useEffect(() => {
      a && (l.current = 0, i(false));
    }, [
      a
    ]);
    const u = o.useCallback(() => {
      l.current = 0, i(false);
    }, []), b = o.useCallback((h) => {
      a || !_e(h.dataTransfer) || (h.preventDefault(), h.stopPropagation(), l.current += 1, i(true));
    }, [
      a
    ]), _ = o.useCallback((h) => {
      a || (h.preventDefault(), h.stopPropagation(), l.current = Math.max(0, l.current - 1), l.current === 0 && i(false));
    }, [
      a
    ]), x = o.useCallback((h) => {
      a || !_e(h.dataTransfer) || (h.preventDefault(), h.stopPropagation(), h.dataTransfer && (h.dataTransfer.dropEffect = "copy"), n || i(true));
    }, [
      a,
      n
    ]), f = o.useCallback((h) => {
      var _a2;
      if (a || !_e(h.dataTransfer)) return;
      h.preventDefault(), h.stopPropagation(), u();
      const j = (_a2 = h.dataTransfer) == null ? void 0 : _a2.files;
      (j == null ? void 0 : j.length) && s(j);
    }, [
      a,
      s,
      u
    ]);
    return e.jsxs("div", {
      className: `relative ${r}`.trim(),
      onDragEnter: b,
      onDragLeave: _,
      onDragOverCapture: x,
      onDropCapture: f,
      children: [
        t,
        n ? e.jsx("div", {
          className: "pointer-events-none absolute inset-0 z-90 flex items-center justify-center bg-violet-100/85 px-4 dark:bg-violet-950/90",
          "aria-hidden": true,
          children: e.jsxs("div", {
            className: "flex max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-violet-500 bg-white/95 px-8 py-7 text-center shadow-lg dark:border-violet-400 dark:bg-odp-bgSoft/95",
            children: [
              e.jsx("div", {
                className: "flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300",
                children: e.jsx(ft, {
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
                      e.jsx(vt, {
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
  const zt = [
    0.22,
    1,
    0.36,
    1
  ], ss = {
    duration: 0.2,
    ease: zt
  }, ns = {
    duration: 0.28,
    ease: zt
  }, os = {
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
  function is({ src: t, alt: r = "", open: a, onClose: s }) {
    const n = !!(a && t);
    return e.jsx(sa, {
      open: n,
      onOpenChange: (i) => {
        i || s();
      },
      children: e.jsx(_t, {
        children: n ? e.jsxs(na, {
          forceMount: true,
          children: [
            e.jsx(oa, {
              asChild: true,
              forceMount: true,
              children: e.jsx(Le.div, {
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
                transition: ss
              })
            }),
            e.jsx(ia, {
              asChild: true,
              forceMount: true,
              onOpenAutoFocus: (i) => i.preventDefault(),
              children: e.jsxs(Le.div, {
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
                transition: ns,
                children: [
                  e.jsx(la, {
                    className: "sr-only",
                    children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30"
                  }),
                  e.jsx(da, {
                    className: "sr-only",
                    children: "\uC785\uB825 \uC774\uBBF8\uC9C0\uB97C \uD655\uB300\uD574 \uBCF4\uB294 \uD654\uBA74\uC785\uB2C8\uB2E4. \uB2E4\uC6B4\uB85C\uB4DC\xB7\uBCF5\uC0AC \uBC84\uD2BC \uB610\uB294 Ctrl/Cmd+C\uB85C \uC774\uBBF8\uC9C0\uB97C \uC800\uC7A5\uD558\uAC70\uB098 \uBCF5\uC0AC\uD558\uACE0, Esc \uB610\uB294 \uB2EB\uAE30\uB85C \uC885\uB8CC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                  }),
                  e.jsx("button", {
                    type: "button",
                    className: "absolute inset-0 cursor-zoom-out",
                    "aria-label": "\uB2EB\uAE30",
                    onClick: () => s()
                  }),
                  e.jsx("div", {
                    className: "pointer-events-none relative z-1 flex min-h-0 min-w-0 flex-1 items-center justify-center p-4 sm:p-8",
                    children: t ? e.jsx("div", {
                      className: "pointer-events-auto max-h-full max-w-full overflow-hidden shadow-2xl",
                      style: os,
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
                      t ? e.jsx(ma, {
                        src: t
                      }) : null,
                      t ? e.jsx(ba, {
                        src: t
                      }) : null,
                      e.jsx(ca, {
                        asChild: true,
                        children: e.jsx("button", {
                          type: "button",
                          className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80",
                          "aria-label": "\uB2EB\uAE30",
                          children: e.jsx(Ee, {
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
  const ls = 400;
  function Q(t, r = false) {
    const a = o.useRef(t);
    a.current = t;
    const s = o.useRef(0), n = o.useCallback(() => {
      var _a2;
      if (r) return;
      const b = Date.now();
      b - s.current < ls || (s.current = b, (_a2 = a.current) == null ? void 0 : _a2.call(a));
    }, [
      r
    ]), i = o.useCallback((b) => {
      b.stopPropagation();
    }, []), l = o.useCallback((b) => {
      b.stopPropagation(), !(r || b.button !== 0) && (b.preventDefault(), n());
    }, [
      r,
      n
    ]), u = o.useCallback((b) => {
      b.stopPropagation(), b.detail === 0 && n();
    }, [
      n
    ]);
    return {
      onPointerDown: i,
      onMouseDown: l,
      onClick: u
    };
  }
  const ds = "llm-assist-result-preview", cs = "shrink-0 opacity-70";
  function U({ icon: t, children: r, className: a = "" }) {
    return e.jsxs("span", {
      className: `inline-flex items-center gap-1 font-semibold text-gray-700 dark:text-odp-fgStrong ${a}`,
      children: [
        t ? e.jsx(t, {
          size: 13,
          className: cs,
          "aria-hidden": true
        }) : null,
        r
      ]
    });
  }
  Us = function({ theme: t = "light", profiles: r = [], selectedProfileId: a = "", onSelectedProfileIdChange: s = () => {
  }, selectedProfile: n = null, model: i = "", onModelChange: l = () => {
  }, selectedText: u, onSelectedTextChange: b, onRefreshSelection: _, attachedImages: x = [], onAddImages: f, onRemoveImage: h, onClearImages: j, instruction: P, onInstructionChange: y, systemPrompt: N = "", onSystemPromptChange: T, requestOptions: w = {
    temperature: 0.4
  }, onRequestOptionsChange: z, result: S, onResultChange: O, resultViewMode: E = "text", onResultViewModeChange: A, loading: g = false, error: v = "", templates: d = [], selectedTemplateId: p = "", onLoadTemplate: m, templateName: C = "", onTemplateNameChange: R, editingTemplateId: ae = null, onSaveTemplate: se, onNewTemplate: $t, onDeleteTemplate: Kt, onRun: ye, onCancelGeneration: Ut, onApplyResult: Ft, onAppendResult: Bt, onCopyResult: Wt, onCreateNoteFromResult: Vt, presentation: ve = "floating", canInsertIntoDocument: Gt = true, remoteMode: Yt = false, modelSelectAutoLoad: q = true, enableImageDropZone: qt = true, exaoneTabular: Oe, onExaoneTabularChange: Re }) {
    const Ht = g || (Yt ? false : !S), F = (n == null ? void 0 : n.kind) === ee && mr(i), ke = o.useRef(null), Ie = o.useRef(null), ne = o.useRef(null), [De, B] = o.useState(""), [D, V] = o.useState(false), [H, Jt] = o.useState(false), [Xt, oe] = o.useState(false), [je, Pe] = o.useState(null), ze = o.useRef(0), Me = o.useCallback(() => {
      ze.current = Date.now() + 100;
    }, []), $ = o.useCallback(() => Date.now() < ze.current, []);
    o.useEffect(() => {
      g || oe(false);
    }, [
      g
    ]), hr(Ie, {
      layoutKey: `${t}|${S || ""}|${E}`
    });
    const $e = o.useCallback(async (c) => {
      if (!(!(c == null ? void 0 : c.length) || !f)) {
        B(""), V(true);
        try {
          const I = await Se(c);
          await f(I);
        } catch (I) {
          B(I instanceof Error ? I.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          V(false), ne.current && (ne.current.value = "");
        }
      }
    }, [
      f
    ]), Qt = o.useCallback(async () => {
      if (!(!f || D)) {
        B(""), V(true);
        try {
          const c = await pa();
          if (!c.length) {
            B("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. Ctrl/Cmd+V\uB85C \uBD99\uC5EC\uB123\uC744 \uC218\uB3C4 \uC788\uC2B5\uB2C8\uB2E4.");
            return;
          }
          const I = await Se(c);
          await f(I);
        } catch (c) {
          B(c instanceof Error ? c.message : "\uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uB97C \uBD99\uC5EC\uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          V(false);
        }
      }
    }, [
      f,
      D
    ]);
    o.useEffect(() => {
      const c = async (I) => {
        if (!f || !ke.current || !(I.target instanceof Node) || !ke.current.contains(I.target) || D) return;
        const Be = xa(I.clipboardData ?? null);
        if (Be.length) {
          I.preventDefault(), B(""), V(true);
          try {
            const Ne = await Se(Be);
            await f(Ne);
          } catch (Ne) {
            B((Ne == null ? void 0 : Ne.message) || "\uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uB97C \uBD99\uC5EC\uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          } finally {
            V(false);
          }
        }
      };
      return document.addEventListener("paste", c), () => document.removeEventListener("paste", c);
    }, [
      f,
      D
    ]);
    const we = N.trim() === te(), K = !S, Zt = Q(Ft, K), er = Q(Wt, K), tr = Q(Bt, K), rr = Q(Vt, K), G = Q(() => ye == null ? void 0 : ye(), !!(g || !n)), ar = o.useCallback((c) => {
      $() || G.onPointerDown(c);
    }, [
      $,
      G
    ]), sr = o.useCallback((c) => {
      $() || g || !n || c.button !== 0 || (Me(), G.onMouseDown(c));
    }, [
      $,
      Me,
      G,
      g,
      n
    ]), nr = o.useCallback((c) => {
      $() || G.onClick(c);
    }, [
      $,
      G
    ]), or = o.useCallback(() => {
      $() || oe(true);
    }, [
      $
    ]), ir = o.useCallback((c) => {
      c.key !== "Enter" || c.nativeEvent.isComposing || (c.metaKey || c.ctrlKey) && (c.preventDefault(), !(g || !n) && (ye == null ? void 0 : ye()));
    }, [
      g,
      ye,
      n
    ]), Ke = e.jsxs("button", {
      type: "button",
      disabled: we,
      onClick: () => T == null ? void 0 : T(te()),
      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:disabled:hover:bg-transparent",
      "aria-label": "\uAE30\uBCF8\uAC12\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30",
      children: [
        e.jsx(Mr, {
          size: 11,
          "aria-hidden": true
        }),
        "\uAE30\uBCF8\uAC12\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30"
      ]
    }), Ue = e.jsxs("div", {
      ref: ke,
      className: "space-y-3 text-xs",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block",
              children: e.jsx(U, {
                icon: kt,
                children: "\uC81C\uACF5\uC790"
              })
            }),
            e.jsx(bt, {
              profiles: r,
              value: a,
              onChange: s
            })
          ]
        }),
        n ? e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block",
              children: e.jsx(U, {
                icon: jt,
                children: "\uBAA8\uB378"
              })
            }),
            n.kind === dt || n.kind === ee ? e.jsx(pe, {
              reloadKey: `${n.id}:${ue(n)}`,
              getBaseUrl: () => ue(n),
              getApiKey: () => n.apiKey || "",
              ...n.kind === ee ? {
                listModels: ({ apiKey: c }) => ct(c),
                placeholder: "\uBAA8\uB378 ID (\uC608: k-exaone_v2.5)",
                helpText: "\uCC44\uD305(K-EXAONE) \uB610\uB294 Tabular \uBD84\uB958/\uD68C\uADC0 \uBAA8\uB378\uC744 \uACE0\uB974\uC138\uC694. \uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC62C \uC218 \uC788\uC2B5\uB2C8\uB2E4."
              } : {},
              value: i,
              onChange: l,
              autoLoad: q
            }, `${n.id}-${n.kind}`) : n.kind === ut ? lt() ? e.jsx(gt, {
              value: i,
              onChange: l,
              autoLoad: q
            }, `${n.id}-llama-cpp`) : e.jsx(pe, {
              reloadKey: `${n.id}:${n.baseUrl || ""}`,
              getBaseUrl: () => n.baseUrl || "",
              getApiKey: () => n.apiKey || "",
              value: i,
              onChange: l,
              autoLoad: q,
              aliasScope: "llama-cpp"
            }, `${n.id}-llama-cpp-remote`) : n.kind === pt ? e.jsx(xt, {
              value: i,
              onChange: l,
              autoLoad: q,
              autoLoadModelOnSelect: false
            }, `${n.id}-mlx`) : e.jsx(mt, {
              getGeminiApiKey: () => n.apiKey || "",
              profileId: n.id,
              value: i,
              onChange: l,
              autoLoad: q
            }, `${n.id}-gemini`)
          ]
        }) : null,
        F && Oe && Re ? e.jsx(Oa, {
          modelId: i,
          value: Oe,
          onChange: Re
        }) : null,
        F ? null : e.jsxs("div", {
          children: [
            e.jsxs("div", {
              className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsx(U, {
                    icon: wt,
                    children: "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8"
                  })
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: _,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(Nr, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0C8\uB85C\uACE0\uCE68"
                  ]
                })
              ]
            }),
            e.jsx("textarea", {
              readOnly: !b,
              value: u,
              onChange: (c) => b == null ? void 0 : b(c.target.value),
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
                  children: e.jsxs(U, {
                    icon: Sr,
                    children: [
                      "\uC785\uB825 \uC774\uBBF8\uC9C0",
                      x.length > 0 ? e.jsxs("span", {
                        className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                        children: [
                          "(",
                          x.length,
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
                        Qt();
                      },
                      disabled: D,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      children: [
                        D ? e.jsx(de, {
                          size: 12,
                          className: "animate-spin"
                        }) : e.jsx(Cr, {
                          size: 12
                        }),
                        "\uD074\uB9BD\uBCF4\uB4DC\uC5D0\uC11C \uBD99\uC5EC\uB123\uAE30"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        var _a2;
                        return (_a2 = ne.current) == null ? void 0 : _a2.click();
                      },
                      disabled: D,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      children: [
                        D ? e.jsx(de, {
                          size: 12,
                          className: "animate-spin"
                        }) : e.jsx(vt, {
                          size: 12
                        }),
                        "\uCD94\uAC00"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => j == null ? void 0 : j(),
                      disabled: !x.length || D,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      title: "\uCCA8\uBD80 \uC774\uBBF8\uC9C0 \uBAA8\uB450 \uC81C\uAC70",
                      children: [
                        e.jsx(_r, {
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
              ref: ne,
              type: "file",
              accept: "image/jpeg,image/png,image/webp,image/gif",
              multiple: true,
              className: "hidden",
              onChange: (c) => {
                $e(c.target.files);
              }
            }),
            e.jsx("div", {
              className: `rounded border border-dashed p-2 dark:border-odp-borderSoft ${x.length ? "border-gray-200 bg-gray-50/50 dark:bg-odp-bgSoft/40" : "border-gray-300 bg-gray-50 dark:bg-odp-bgSoft"}`,
              children: x.length ? e.jsx("div", {
                className: "grid grid-cols-2 gap-2",
                children: x.map((c) => e.jsxs("div", {
                  className: "relative overflow-hidden rounded border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => Pe(c),
                      className: "group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-violet-500",
                      "aria-label": `${c.name} \uD06C\uAC8C \uBCF4\uAE30`,
                      children: [
                        e.jsx("img", {
                          src: c.previewDataUrl,
                          alt: "",
                          className: "h-24 w-full object-cover"
                        }),
                        e.jsx("span", {
                          className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25",
                          "aria-hidden": true,
                          children: e.jsx(Lr, {
                            size: 22,
                            className: "text-white opacity-0 drop-shadow-md transition-opacity group-hover:opacity-100"
                          })
                        })
                      ]
                    }),
                    e.jsx("div", {
                      className: "truncate px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-odp-muted",
                      title: c.name,
                      children: c.name
                    }),
                    e.jsx("button", {
                      type: "button",
                      onClick: () => h == null ? void 0 : h(c.id),
                      className: "absolute right-1 top-1 z-1 rounded bg-black/55 p-0.5 text-white hover:bg-black/75",
                      title: "\uC774\uBBF8\uC9C0 \uC81C\uAC70",
                      "aria-label": "\uC774\uBBF8\uC9C0 \uC81C\uAC70",
                      children: e.jsx(Ee, {
                        size: 12
                      })
                    })
                  ]
                }, c.id))
              }) : e.jsxs("p", {
                className: "py-3 text-center text-[11px] text-gray-500 dark:text-odp-muted",
                children: [
                  "AI \uB3C4\uC6B0\uBBF8 \uC5B4\uB514\uC5D0\uB4E0 \uC774\uBBF8\uC9C0\uB97C \uB193\uAC70\uB098 \u300C\uCD94\uAC00\u300D\uB85C \uC120\uD0DD\uD558\uC138\uC694.",
                  e.jsx("br", {}),
                  "\u300C\uD074\uB9BD\uBCF4\uB4DC\uC5D0\uC11C \uBD99\uC5EC\uB123\uAE30\u300D\uB610\uB294 Ctrl+V\uB85C \uBD99\uC5EC\uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                ]
              })
            }),
            De && e.jsx("p", {
              className: "mt-1 text-[10px] text-red-600 dark:text-red-400",
              children: De
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
                  children: e.jsx(U, {
                    icon: Er,
                    children: "\uD15C\uD50C\uB9BF"
                  })
                }),
                e.jsxs("select", {
                  value: p,
                  onChange: (c) => m == null ? void 0 : m(c.target.value),
                  className: "min-w-0 flex-1 basis-48 rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                  children: [
                    e.jsx("option", {
                      value: "",
                      children: "\u2014 \uBD88\uB7EC\uC624\uAE30 \u2014"
                    }),
                    d.map((c) => e.jsx("option", {
                      value: c.id,
                      children: c.name
                    }, c.id))
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
              value: C,
              onChange: (c) => R == null ? void 0 : R(c.target.value),
              placeholder: "\uD15C\uD50C\uB9BF \uC774\uB984",
              className: "w-full rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsxs("div", {
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => Jt((c) => !c),
                  className: `mb-1 flex w-full items-center justify-between gap-x-2 gap-y-1 rounded px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${H ? "bg-transparent" : "bg-slate-300/90 dark:bg-slate-950/40"}`,
                  "aria-expanded": H,
                  children: [
                    e.jsxs("span", {
                      className: "min-w-0 shrink-0 whitespace-nowrap",
                      children: [
                        e.jsx(U, {
                          icon: Nt,
                          children: "\uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8"
                        }),
                        !H && N.trim() ? e.jsx("span", {
                          className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                          children: we ? "(\uAE30\uBCF8)" : "(\uC218\uC815\uB428)"
                        }) : null
                      ]
                    }),
                    e.jsx(St, {
                      size: 14,
                      "aria-hidden": true,
                      className: `shrink-0 opacity-70 transition-transform ${H ? "rotate-180" : ""}`
                    })
                  ]
                }),
                e.jsx(Te, {
                  open: H,
                  children: e.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      e.jsx("p", {
                        className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
                        children: "\uD15C\uD50C\uB9BF\uB9C8\uB2E4 \uB2E4\uB974\uAC8C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uBE44\uC6B0\uBA74 \uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8 \uC5C6\uC774 \uC2E4\uD589\uB429\uB2C8\uB2E4."
                      }),
                      e.jsx("textarea", {
                        value: N,
                        onChange: (c) => T == null ? void 0 : T(c.target.value),
                        rows: 10,
                        placeholder: te(),
                        className: "w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                      }),
                      e.jsx("div", {
                        className: "flex justify-end",
                        children: we ? e.jsx(Ct, {
                          delayDuration: 250,
                          skipDelayDuration: 0,
                          children: e.jsxs(xe, {
                            children: [
                              e.jsx(me, {
                                asChild: true,
                                children: e.jsx("span", {
                                  className: "inline-flex cursor-not-allowed",
                                  children: Ke
                                })
                              }),
                              e.jsx(be, {
                                children: e.jsxs(ge, {
                                  side: "top",
                                  sideOffset: 6,
                                  className: "z-100010 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong",
                                  children: [
                                    "\uC774\uBBF8 \uAE30\uBCF8\uAC12\uC785\uB2C8\uB2E4.",
                                    e.jsx(fe, {
                                      className: "fill-white dark:fill-odp-surface"
                                    })
                                  ]
                                })
                              })
                            ]
                          })
                        }) : Ke
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
                  children: e.jsx(U, {
                    icon: Ar,
                    children: "\uC9C0\uC2DC\uC0AC\uD56D"
                  })
                }),
                e.jsx("textarea", {
                  value: P,
                  onChange: (c) => y == null ? void 0 : y(c.target.value),
                  onKeyDown: ir,
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
                  onClick: $t,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(yt, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0C8 \uD15C\uD50C\uB9BF"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: se,
                  className: "inline-flex items-center gap-1 rounded bg-violet-600 px-2 py-1 text-[11px] text-white hover:bg-violet-700",
                  children: [
                    e.jsx(Tr, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uD15C\uD50C\uB9BF \uC800\uC7A5"
                  ]
                }),
                ae && e.jsxs("button", {
                  type: "button",
                  onClick: Kt,
                  className: "inline-flex items-center gap-1 rounded border border-red-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-400",
                  children: [
                    e.jsx(ht, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0AD\uC81C"
                  ]
                })
              ]
            }),
            e.jsx(Pt, {
              value: w,
              onChange: (c) => z == null ? void 0 : z(c)
            })
          ]
        }),
        g ? e.jsxs("button", {
          type: "button",
          onClick: or,
          disabled: !n,
          className: "flex w-full items-center justify-center gap-2 rounded bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60",
          "aria-label": F ? "\uC608\uCE21 \uC911 \u2014 \uD074\uB9AD\uD558\uC5EC \uCDE8\uC18C" : "\uC0DD\uC131 \uC911 \u2014 \uD074\uB9AD\uD558\uC5EC \uCDE8\uC18C",
          children: [
            e.jsx(de, {
              size: 16,
              className: "animate-spin",
              "aria-hidden": true
            }),
            F ? "\uC608\uCE21 \uC911\u2026" : "\uC0DD\uC131 \uC911\u2026"
          ]
        }) : e.jsxs("button", {
          type: "button",
          onPointerDown: ar,
          onMouseDown: sr,
          onClick: nr,
          disabled: !n,
          className: "flex w-full items-center justify-center gap-2 rounded bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60",
          children: [
            e.jsx(Ye, {
              size: 16,
              "aria-hidden": true
            }),
            F ? "Tabular \uC608\uCE21 \uC2E4\uD589" : "\uC2E4\uD589"
          ]
        }),
        typeof document < "u" ? lr.createPortal(e.jsx(br, {
          isOpen: Xt,
          title: "\uC0DD\uC131 \uCDE8\uC18C",
          message: "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131\uC744 \uCDE8\uC18C\uD560\uAE4C\uC694? \uC9C0\uAE08\uAE4C\uC9C0 \uBC1B\uC740 \uACB0\uACFC\uB294 \uC720\uC9C0\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uC0DD\uC131 \uCDE8\uC18C",
          cancelLabel: "\uACC4\uC18D \uC0DD\uC131",
          variant: "danger",
          onConfirm: () => {
            oe(false), Ut == null ? void 0 : Ut();
          },
          onCancel: () => oe(false)
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
                  children: e.jsx(U, {
                    icon: Ye,
                    children: "\uACB0\uACFC"
                  })
                }),
                e.jsxs("div", {
                  className: "inline-flex rounded border border-gray-300 dark:border-odp-borderStrong",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => A == null ? void 0 : A("text"),
                      className: `inline-flex items-center gap-1 px-2 py-0.5 text-[10px] ${E === "text" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100" : "text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`,
                      "aria-pressed": E === "text",
                      children: [
                        e.jsx(Or, {
                          size: 11,
                          "aria-hidden": true
                        }),
                        "\uD14D\uC2A4\uD2B8"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => A == null ? void 0 : A("preview"),
                      className: `inline-flex items-center gap-1 border-l border-gray-300 px-2 py-0.5 text-[10px] dark:border-odp-borderStrong ${E === "preview" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100" : "text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`,
                      "aria-pressed": E === "preview",
                      children: [
                        e.jsx(Rr, {
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
            E === "preview" ? e.jsx("div", {
              ref: Ie,
              className: "min-h-32 max-h-64 overflow-auto rounded border border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              children: S ? e.jsx(gr, {
                id: ds,
                theme: t === "dark" ? "dark" : "light",
                language: "ko-KR",
                codeTheme: fr,
                customIcon: yr,
                value: S,
                noMermaid: true,
                codeFoldable: false,
                showCodeRowNumber: false
              }) : e.jsx("p", {
                className: "px-2 py-3 text-[11px] text-gray-500 dark:text-odp-muted",
                children: "\uC2E4\uD589 \uD6C4 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }) : e.jsx("textarea", {
              readOnly: Ht,
              value: S,
              onChange: (c) => O == null ? void 0 : O(c.target.value),
              rows: 6,
              className: "w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
              placeholder: "\uC2E4\uD589 \uD6C4 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
            }),
            e.jsxs("div", {
              className: "mt-2 flex flex-wrap gap-1.5",
              children: [
                Gt ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsx("button", {
                      type: "button",
                      disabled: K,
                      ...Zt,
                      className: [
                        "inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[11px] font-medium disabled:cursor-not-allowed disabled:opacity-50",
                        ve !== "floating" ? u.trim() ? "border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60" : "border-sky-400 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-100 dark:hover:bg-sky-900/60" : "border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
                      ].join(" "),
                      children: ve !== "floating" ? u.trim() ? e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(qe, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uB300\uCCB4\uD558\uAE30"
                        ]
                      }) : e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(Ir, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uC0BD\uC785\uD558\uAE30"
                        ]
                      }) : e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(qe, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uC120\uD0DD \uC601\uC5ED \uBC14\uAFD4\uCE58\uAE30"
                        ]
                      })
                    }),
                    e.jsxs("button", {
                      type: "button",
                      disabled: K,
                      ...tr,
                      className: "inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60",
                      children: [
                        e.jsx(Dr, {
                          size: 14,
                          "aria-hidden": true
                        }),
                        "\uBB38\uC11C \uAC00\uC7A5 \uD558\uB2E8\uC5D0 \uC0BD\uC785"
                      ]
                    })
                  ]
                }) : null,
                ve !== "floating" ? e.jsxs("button", {
                  type: "button",
                  disabled: K,
                  ...er,
                  className: "inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60",
                  children: [
                    e.jsx(Pr, {
                      size: 14,
                      "aria-hidden": true
                    }),
                    "\uBCF5\uC0AC\uD558\uAE30"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  disabled: K,
                  ...rr,
                  className: "inline-flex items-center gap-1.5 rounded border border-emerald-400 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-800 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-100 dark:hover:bg-emerald-900/60",
                  children: [
                    e.jsx(zr, {
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
    }), Fe = e.jsx(is, {
      src: (je == null ? void 0 : je.previewDataUrl) ?? null,
      alt: (je == null ? void 0 : je.name) ?? "",
      open: !!je,
      onClose: () => Pe(null)
    });
    return qt ? e.jsxs(as, {
      className: "min-h-0",
      disabled: !f || D,
      onFilesDrop: (c) => {
        $e(c);
      },
      children: [
        Ue,
        Fe
      ]
    }) : e.jsxs(e.Fragment, {
      children: [
        Ue,
        Fe
      ]
    });
  };
  Fs = function({ profiles: t = [], selectedProfileId: r = "", onSelectedProfileIdChange: a = () => {
  }, selectedProfile: s = null, model: n = "", onModelChange: i = () => {
  }, systemPrompt: l = "", onSystemPromptChange: u, requestOptions: b = {
    temperature: 0.4
  }, onRequestOptionsChange: _, messages: x, draft: f, onDraftChange: h, loading: j = false, error: P = "", onSend: y, onCancel: N, onClearMessages: T, modelSelectAutoLoad: w = true }) {
    const z = o.useRef(null), [S, O] = o.useState(false), E = l.trim() === te();
    o.useEffect(() => {
      const d = z.current;
      d && (d.scrollTop = d.scrollHeight);
    }, [
      x,
      j
    ]);
    const A = !!s && f.trim().length > 0 && !j, g = o.useCallback((d) => {
      d == null ? void 0 : d.preventDefault(), A && (y == null ? void 0 : y());
    }, [
      A,
      y
    ]), v = o.useCallback((d) => {
      d.key !== "Enter" || d.nativeEvent.isComposing || (d.metaKey || d.ctrlKey) && (d.preventDefault(), A && (y == null ? void 0 : y()));
    }, [
      A,
      y
    ]);
    return e.jsxs("div", {
      className: "flex h-full min-h-0 flex-col gap-2 text-xs",
      children: [
        e.jsxs("div", {
          className: "shrink-0 space-y-2",
          children: [
            e.jsxs("div", {
              children: [
                e.jsxs("label", {
                  className: "mb-1 flex items-center gap-1 font-semibold text-gray-700 dark:text-odp-fgStrong",
                  children: [
                    e.jsx(kt, {
                      size: 13,
                      className: "opacity-70",
                      "aria-hidden": true
                    }),
                    "\uC81C\uACF5\uC790"
                  ]
                }),
                e.jsx(bt, {
                  profiles: t,
                  value: r,
                  onChange: a
                })
              ]
            }),
            s ? e.jsxs("div", {
              children: [
                e.jsxs("label", {
                  className: "mb-1 flex items-center gap-1 font-semibold text-gray-700 dark:text-odp-fgStrong",
                  children: [
                    e.jsx(jt, {
                      size: 13,
                      className: "opacity-70",
                      "aria-hidden": true
                    }),
                    "\uBAA8\uB378"
                  ]
                }),
                s.kind === dt || s.kind === ee ? e.jsx(pe, {
                  reloadKey: `${s.id}:${ue(s)}`,
                  getBaseUrl: () => ue(s),
                  getApiKey: () => s.apiKey || "",
                  ...s.kind === ee ? {
                    listModels: ({ apiKey: d }) => ct(d),
                    placeholder: "\uBAA8\uB378 ID (\uC608: k-exaone_v2.5)",
                    helpText: "\uCC44\uD305 \uBAA8\uB378\uC744 \uACE0\uB974\uC138\uC694. Tabular \uBAA8\uB378\uC740 \uCC44\uD305 \uBAA8\uB4DC\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
                  } : {},
                  value: n,
                  onChange: i,
                  autoLoad: w
                }, `${s.id}-${s.kind}`) : s.kind === ut ? lt() ? e.jsx(gt, {
                  value: n,
                  onChange: i,
                  autoLoad: w
                }, `${s.id}-llama-cpp`) : e.jsx(pe, {
                  reloadKey: `${s.id}:${s.baseUrl || ""}`,
                  getBaseUrl: () => s.baseUrl || "",
                  getApiKey: () => s.apiKey || "",
                  value: n,
                  onChange: i,
                  autoLoad: w,
                  aliasScope: "llama-cpp"
                }, `${s.id}-llama-cpp-remote`) : s.kind === pt ? e.jsx(xt, {
                  value: n,
                  onChange: i,
                  autoLoad: w,
                  autoLoadModelOnSelect: false
                }, `${s.id}-mlx`) : e.jsx(mt, {
                  getGeminiApiKey: () => s.apiKey || "",
                  profileId: s.id,
                  value: n,
                  onChange: i,
                  autoLoad: w
                }, `${s.id}-gemini`)
              ]
            }) : null,
            e.jsxs("div", {
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => O((d) => !d),
                  className: `mb-1 flex w-full items-center justify-between gap-x-2 gap-y-1 rounded px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${S ? "bg-transparent" : "bg-slate-300/90 dark:bg-slate-950/40"}`,
                  "aria-expanded": S,
                  children: [
                    e.jsxs("span", {
                      className: "inline-flex min-w-0 items-center gap-1 whitespace-nowrap",
                      children: [
                        e.jsx(Nt, {
                          size: 13,
                          className: "opacity-70",
                          "aria-hidden": true
                        }),
                        "\uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8",
                        !S && l.trim() ? e.jsx("span", {
                          className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                          children: E ? "(\uAE30\uBCF8)" : "(\uC218\uC815\uB428)"
                        }) : null
                      ]
                    }),
                    e.jsx(St, {
                      size: 14,
                      "aria-hidden": true,
                      className: `shrink-0 opacity-70 transition-transform ${S ? "rotate-180" : ""}`
                    })
                  ]
                }),
                e.jsx(Te, {
                  open: S,
                  children: e.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      e.jsx("textarea", {
                        value: l,
                        onChange: (d) => u == null ? void 0 : u(d.target.value),
                        rows: 3,
                        className: "w-full resize-y rounded border border-gray-200 bg-white px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
                      }),
                      e.jsx("button", {
                        type: "button",
                        disabled: E,
                        onClick: () => u == null ? void 0 : u(te()),
                        className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                        children: "\uAE30\uBCF8\uAC12\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30"
                      })
                    ]
                  })
                })
              ]
            }),
            e.jsx(Pt, {
              value: b,
              onChange: (d) => _ == null ? void 0 : _(d)
            })
          ]
        }),
        e.jsxs("div", {
          ref: z,
          className: "min-h-0 flex-1 space-y-2 overflow-y-auto rounded-md border border-violet-200/60 bg-violet-50/40 p-2 dark:border-violet-800/50 dark:bg-violet-950/20",
          "aria-live": "polite",
          children: [
            x.length === 0 && !j ? e.jsx("p", {
              className: "px-1 py-6 text-center text-[11px] text-gray-500 dark:text-odp-muted",
              children: "\uBA54\uC2DC\uC9C0\uB97C \uBCF4\uB0B4 \uB300\uD654\uB97C \uC2DC\uC791\uD558\uC138\uC694."
            }) : null,
            x.map((d) => {
              const p = d.role === "user";
              return e.jsx("div", {
                className: `flex ${p ? "justify-end" : "justify-start"}`,
                children: e.jsx("div", {
                  className: `max-w-[92%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${p ? "rounded-br-md bg-violet-600 text-white dark:bg-violet-500" : "rounded-bl-md border border-violet-200/70 bg-white text-gray-800 dark:border-violet-800/60 dark:bg-odp-surface dark:text-odp-fg"}`,
                  children: d.content
                })
              }, d.id);
            }),
            j ? e.jsxs("div", {
              className: "flex items-center gap-1.5 px-1 text-[11px] text-violet-700 dark:text-violet-300",
              children: [
                e.jsx(de, {
                  size: 12,
                  className: "animate-spin",
                  "aria-hidden": true
                }),
                "\uC751\uB2F5 \uC0DD\uC131 \uC911\u2026"
              ]
            }) : null
          ]
        }),
        P ? e.jsx("p", {
          className: "shrink-0 whitespace-pre-wrap rounded border border-red-300 bg-red-50 px-2 py-1.5 text-[11px] text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200",
          children: P
        }) : null,
        e.jsxs("form", {
          onSubmit: g,
          className: "shrink-0 space-y-1.5",
          children: [
            e.jsx("textarea", {
              value: f,
              onChange: (d) => h == null ? void 0 : h(d.target.value),
              onKeyDown: v,
              rows: 3,
              placeholder: "\uBA54\uC2DC\uC9C0 \uC785\uB825 (Ctrl/Cmd+Enter \uC804\uC1A1)",
              className: "w-full resize-y rounded border border-gray-200 bg-white px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
              disabled: j
            }),
            e.jsxs("div", {
              className: "flex flex-wrap items-center justify-between gap-1.5",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => T == null ? void 0 : T(),
                  disabled: j || x.length === 0,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx($r, {
                      size: 13,
                      "aria-hidden": true
                    }),
                    "\uB300\uD654 \uC9C0\uC6B0\uAE30"
                  ]
                }),
                j ? e.jsxs("button", {
                  type: "button",
                  onClick: () => N == null ? void 0 : N(),
                  className: "inline-flex items-center gap-1.5 rounded border border-red-400 bg-red-50 px-3 py-1.5 text-[11px] font-medium text-red-700 hover:bg-red-100 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-900/50",
                  children: [
                    e.jsx(Kr, {
                      size: 13,
                      "aria-hidden": true
                    }),
                    "\uC911\uB2E8"
                  ]
                }) : e.jsxs("button", {
                  type: "submit",
                  disabled: !A,
                  className: "inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60",
                  children: [
                    e.jsx(Ur, {
                      size: 13,
                      "aria-hidden": true
                    }),
                    "\uC804\uC1A1"
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  };
  const it = "relative inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium outline-none transition-colors text-violet-700/80 hover:text-violet-950 focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=on]:bg-white data-[state=on]:text-violet-950 data-[state=on]:shadow-sm dark:text-violet-200/85 dark:hover:text-violet-50 dark:focus-visible:ring-violet-500 dark:data-[state=on]:bg-violet-900/80 dark:data-[state=on]:text-violet-50";
  Bs = function({ value: t, onChange: r, className: a = "" }) {
    return e.jsxs(ua, {
      type: "single",
      value: t,
      onValueChange: (s) => {
        (s === "edit" || s === "chat") && r(s);
      },
      "aria-label": "AI \uB3C4\uC6B0\uBBF8 \uBAA8\uB4DC",
      className: `inline-flex shrink-0 items-center rounded-full bg-violet-200/70 p-0.5 dark:bg-violet-950/70 ${a}`,
      onPointerDown: (s) => s.stopPropagation(),
      onTouchStart: (s) => s.stopPropagation(),
      children: [
        e.jsxs(Xe, {
          value: "edit",
          className: it,
          "aria-label": "\uD3B8\uC9D1",
          children: [
            e.jsx(wt, {
              size: 12,
              "aria-hidden": true
            }),
            "\uD3B8\uC9D1"
          ]
        }),
        e.jsxs(Xe, {
          value: "chat",
          className: it,
          "aria-label": "\uCC44\uD305",
          children: [
            e.jsx(Fr, {
              size: 12,
              "aria-hidden": true
            }),
            "\uCC44\uD305"
          ]
        })
      ]
    });
  };
  const Mt = "s3haim-llm-assist-ui-mode";
  us = function(t) {
    return t === "edit" || t === "chat";
  };
  Ws = function() {
    try {
      const t = localStorage.getItem(Mt);
      if (us(t)) return t;
    } catch {
    }
    return "edit";
  };
  Vs = function(t) {
    try {
      localStorage.setItem(Mt, t);
    } catch {
    }
  };
});
export {
  as as L,
  __tla,
  us as a,
  $s as b,
  Es as c,
  As as d,
  Bs as e,
  Fs as f,
  Us as g,
  k as h,
  Ls as i,
  _s as j,
  Vs as k,
  Ws as l,
  Ds as m,
  Rs as n,
  Is as o,
  Ks as p,
  zs as q,
  Ps as r,
  Ms as s,
  Ts as t,
  Os as u
};
