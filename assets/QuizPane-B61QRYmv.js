import { j as t, r as i, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as an, m as We } from "./vendor-motion-Bv-XITR_.js";
import { j4 as Je, j5 as zt, j6 as ln, a6 as cn, J as ut, T as Ot, j7 as yr, K as D, dq as ti, dr as ni, j8 as si, j9 as ri, ja as oi, jb as os, jc as is, jd as vr, aj as as, bh as fn, bP as ii, je as ai, k as Kn, bf as li, jf as ci, jg as Vn, jh as Ln, ji as di, jj as Ze, jk as ui, jl as mi, jm as jr, jn as Xn, jo as fi, jp as Zn, jq as It, jr as pi, js as xi, a5 as Ne, jt as hi, q as lt, a8 as ls, b as cs, f as Sr, cp as Cr, cq as Nr, u as $r, aE as Er, aF as gi, L as Yn, e as nt, t as Pr, Q as zr, aa as Ir, s as $t, cm as bi, cn as Qn, co as ki, cl as wi, ju as es, a9 as yi, a7 as Ks, d as vi, jv as ts, jw as vt, jx as ji, jy as jt, jz as Pt, jA as Et, jB as Si, jC as Ci, jD as Ni, jE as Vs, jF as Xt, jG as $i, bq as Ei, fd as Pi, ce as zi, bt as Ii, bu as Ai, _ as Tn, $ as _n, au as Dn, jH as St, jI as Fn, jJ as Mi, jK as Ri, jL as Oi, br as Li, ar as Qi, as as Ti, jM as _i, jN as Di, jO as Fi, jP as qi, jQ as Bi, jR as Ui, jS as Gi, jT as Wi, __tla as __tla_1 } from "./index-BebLgvYF.js";
import { c as Ar, __tla as __tla_2 } from "./bootSplash-Z2krRgC9.js";
import { X as qe, L as pn, bj as ds, C as Mr, bk as At, a2 as Ji, S as Qe, w as Xs, x as ns, a7 as Hi, bl as Zs, bm as Ki, J as Vi, H as Xi, bn as Zi, K as Yi, aW as xn, bo as Rr, n as Or, bp as ea, bq as Lr, E as ta, a3 as na, l as sa, f as Qr, ad as ra, br as oa, a as Ys, bs as ia } from "./vendor-lucide-B8TfEQX9.js";
import { v as us, r as aa } from "./resolveVaultFileNode-CtdpK72R.js";
import { v as Mt, ah as la, ai as ca, w as ze, x as Ie, y as Ae, z as Me, A as Re, p as da, q as ua, S as ma, t as fa, J as pa, K as xa, M as ha, N as ga, O as er } from "./vendor-radix-CN5WtDh3.js";
import { __tla as __tla_3 } from "./mdEditorConfig-C7tbkmoa.js";
import { u as ba } from "./useDocumentTheme-D7IWL-1z.js";
import { u as ka } from "./useWikiImageHydration-Bg1x7nwK.js";
import { Q as Tr } from "./QuizLlmModelPicker-BkzF19gC.js";
import { i as wa, g as ya, __tla as __tla_4 } from "./OpenAiCompatibleModelSelect-BuEuB2ht.js";
import { g as tr } from "./openaiCompatibleClient-BOKYLH0M.js";
import { g as va } from "./mlxVlmGenerateClient-DDX6zbQN.js";
import "./vendor-aws-hJDgVEKM.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./appMarkdownItPlugins-I8vvO87V.js";
import { __tla as __tla_5 } from "./vendor-md-editor-1ccdjpui.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./wikiImageResolver-Kn2kiZoN.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-BBwWj-Nq.js";
import "./vendor-tiptap-MFDL-V7S.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./styleResolve-D_dchqAE.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./LlamaCppModelSelect-DP1c1DGV.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./vendor-google-genai-BsvcYwA0.js";
let fu;
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
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })()
]).then(async () => {
  const _r = i.createContext({
    hydrationEnabled: true
  });
  function ja({ value: e, children: n }) {
    return t.jsx(_r.Provider, {
      value: e,
      children: n
    });
  }
  function Sa() {
    return i.useContext(_r);
  }
  function Te(e, n = 4) {
    if (e.kind !== "choice") return Je(n);
    const s = (e.options || []).filter((o) => String(o || "").trim()).length, r = Math.max(s, (e.options || []).length);
    return r >= zt ? Je(r) : Je(n);
  }
  function Dr(e, n = 4) {
    const s = Je(n), r = e.length ? e[e.length - 1] : null;
    return r ? r.kind === "subjective" ? {
      kind: "subjective",
      answerStyle: r.answerStyle === "essay" ? "essay" : "short",
      choiceCount: s
    } : {
      kind: "choice",
      answerStyle: "short",
      choiceCount: Te(r, s)
    } : {
      kind: "choice",
      answerStyle: "short",
      choiceCount: s
    };
  }
  function nr(e, n) {
    const s = Dr(n, e.choiceCount);
    return {
      ...e,
      choiceCount: s.choiceCount
    };
  }
  function Ye(e, n) {
    const s = Je(n), r = [
      ...e
    ];
    for (; r.length < s; ) r.push("");
    return r.slice(0, s);
  }
  function Fr() {
    const [e, n] = i.useState(() => ln());
    return i.useEffect(() => {
      const s = () => n(ln());
      return window.addEventListener(cn, s), () => window.removeEventListener(cn, s);
    }, []), e;
  }
  const qr = [
    0.32,
    0.72,
    0,
    1
  ], Ca = {
    duration: 0
  };
  function Na(e) {
    return e ? {
      type: "spring",
      stiffness: 380,
      damping: 36
    } : {
      type: "tween",
      duration: 0.22,
      ease: qr
    };
  }
  const $a = Ar() ? {
    type: "tween",
    duration: 0.2,
    ease: qr
  } : {
    type: "spring",
    stiffness: 420,
    damping: 34
  };
  function Ea(e, n = {}) {
    const { isResizing: s = false, edge: r = "right" } = n, o = n.useLayoutWidthAnim ?? ln(), a = s ? Ca : Na(o);
    if (o) return {
      style: void 0,
      initial: {
        width: 0,
        opacity: 0.85
      },
      animate: {
        width: e,
        opacity: 1
      },
      exit: {
        width: 0,
        opacity: 0.85
      },
      transition: a
    };
    const c = r === "right" ? "100%" : "-100%";
    return {
      style: {
        width: e,
        flexShrink: 0,
        overflow: "hidden",
        willChange: "transform"
      },
      initial: {
        x: c,
        opacity: 0.92
      },
      animate: {
        x: 0,
        opacity: 1
      },
      exit: {
        x: c,
        opacity: 0.92
      },
      transition: a
    };
  }
  function Pa() {
    return {
      initial: {
        y: 48,
        opacity: 0,
        scale: 0.98
      },
      animate: {
        y: 0,
        opacity: 1,
        scale: 1
      },
      exit: {
        y: 48,
        opacity: 0,
        scale: 0.98
      },
      transition: $a
    };
  }
  function za(e, n) {
    return n ?? ln() ? {
      initial: {
        opacity: 0,
        x: 12
      },
      animate: {
        opacity: 1,
        x: 0
      },
      transition: {
        delay: Math.min(e, 12) * 0.03,
        duration: 0.18
      }
    } : {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        duration: 0.14,
        delay: Math.min(e, 8) * 0.02
      }
    };
  }
  function Lt({ motionKey: e, open: n, width: s, isResizing: r = false, edge: o = "right", className: a, "aria-label": c, children: d }) {
    const u = Fr(), m = Ea(s, {
      isResizing: r,
      edge: o,
      useLayoutWidthAnim: u
    });
    return t.jsx(an, {
      initial: false,
      children: n ? u ? t.jsx(We.aside, {
        role: "complementary",
        "aria-label": c,
        className: a,
        initial: m.initial,
        animate: m.animate,
        exit: m.exit,
        transition: m.transition,
        children: d
      }, e) : t.jsx(We.aside, {
        role: "complementary",
        "aria-label": c,
        className: a,
        style: {
          width: s,
          flexShrink: 0,
          overflow: "hidden",
          willChange: "transform"
        },
        initial: m.initial,
        animate: m.animate,
        exit: m.exit,
        transition: m.transition,
        children: d
      }, e) : null
    });
  }
  const Ia = 360, Aa = Ot;
  function Ma(e) {
    return e === "subjective-essay" ? {
      kind: "subjective",
      answerStyle: "essay"
    } : e === "subjective-short" ? {
      kind: "subjective",
      answerStyle: "short"
    } : {
      kind: "choice",
      answerStyle: "short"
    };
  }
  function Ra(e) {
    return e && e.kind === "subjective" ? e.answerStyle === "essay" ? "subjective-essay" : "subjective-short" : "choice";
  }
  function Oa({ open: e, question: n, defaultChoiceCount: s, busy: r = false, onClose: o, onSubmit: a }) {
    const [c, d] = i.useState("choice"), [u, m] = i.useState(s), [f, h] = i.useState(""), { width: g, handleProps: x, isResizing: b } = ut({
      storageKey: "quiz-derived-question-dock-width",
      defaultWidth: Ia,
      minWidth: 280,
      maxWidth: 560,
      edge: "right"
    }), k = i.useMemo(() => n ? Te(n, s) : s, [
      s,
      n
    ]);
    i.useEffect(() => {
      e && (d(Ra(n)), m(k), h(""));
    }, [
      e,
      n,
      k
    ]);
    const { kind: z, answerStyle: C } = Ma(c), $ = (n == null ? void 0 : n.displayLabel) || (n == null ? void 0 : n.id) || "", y = () => {
      a({
        kind: z,
        choiceCount: Je(u),
        ...z === "subjective" ? {
          answerStyle: C
        } : {},
        ...f.trim() ? {
          userPrompt: f.trim()
        } : {}
      });
    }, P = e && n != null;
    return t.jsx(Lt, {
      motionKey: "quiz-derived-question-dock",
      open: P,
      width: g,
      isResizing: b,
      "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131",
      className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-violet-200 bg-white shadow-lg dark:border-violet-900/60 dark:bg-odp-surface",
      children: n != null ? t.jsxs("div", {
        className: "relative h-full min-h-0",
        style: {
          width: g
        },
        children: [
          t.jsx(Aa, {
            edge: "left",
            handleProps: x,
            isResizing: b,
            visibleOnHover: true,
            label: "\uD30C\uC0DD\uBB38\uC81C \uD328\uB110 \uB108\uBE44 \uC870\uC808"
          }),
          t.jsxs("div", {
            className: "flex h-full min-h-0 flex-col",
            children: [
              t.jsxs("div", {
                className: "flex items-center justify-between border-b border-violet-200 px-3 py-2.5 dark:border-violet-900/60",
                children: [
                  t.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      t.jsx("div", {
                        className: "text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                        children: "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"
                      }),
                      $ ? t.jsxs("p", {
                        className: "text-[11px] text-slate-500 dark:text-odp-muted",
                        children: [
                          $,
                          "\uBC88 \uBB38\uD56D"
                        ]
                      }) : null
                    ]
                  }),
                  t.jsx("button", {
                    type: "button",
                    "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uD328\uB110 \uB2EB\uAE30",
                    className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg",
                    onClick: o,
                    disabled: r,
                    children: t.jsx(qe, {
                      size: 16
                    })
                  })
                ]
              }),
              t.jsxs("div", {
                className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3",
                children: [
                  t.jsxs("div", {
                    className: "rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-2 text-[11px] text-violet-950 dark:border-violet-800/70 dark:bg-violet-950/45 dark:text-violet-100",
                    children: [
                      t.jsx("p", {
                        className: "font-semibold",
                        children: "\uC6D0\uBCF8 \uBB38\uD56D"
                      }),
                      t.jsx("p", {
                        className: "mt-1 line-clamp-4 opacity-90",
                        children: n.question
                      })
                    ]
                  }),
                  t.jsx("p", {
                    className: "text-xs text-slate-600 dark:text-odp-muted",
                    children: "\uC6D0\uBCF8 \uBB38\uD56D\uC744 \uBC14\uD0D5\uC73C\uB85C \uC720\uD615\uC744 \uBC14\uAFB8\uAC70\uB098 \uC694\uAD6C\uC0AC\uD56D\uC744 \uCD94\uAC00\uD574 \uC0C8 \uD30C\uC0DD \uBB38\uD56D\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4."
                  }),
                  t.jsxs("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                      [
                        [
                          "choice",
                          "\uAC1D\uAD00\uC2DD"
                        ],
                        [
                          "subjective-short",
                          "\uB2E8\uB2F5\uD615"
                        ],
                        [
                          "subjective-essay",
                          "\uC11C\uC220\uD615"
                        ]
                      ].map(([v, j]) => {
                        const I = c === v;
                        return t.jsx("button", {
                          type: "button",
                          disabled: r,
                          className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${I ? "border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-100" : "border-slate-200 bg-white text-slate-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`,
                          onClick: () => d(v),
                          children: j
                        }, v);
                      }),
                      z === "choice" ? t.jsxs("label", {
                        className: "ml-auto flex items-center gap-1.5 text-xs text-slate-600 dark:text-odp-muted",
                        children: [
                          "\uBCF4\uAE30",
                          t.jsx("select", {
                            className: "rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                            value: u,
                            disabled: r,
                            onChange: (v) => m(Number(v.target.value) || u),
                            children: Array.from({
                              length: yr - zt + 1
                            }, (v, j) => zt + j).map((v) => t.jsxs("option", {
                              value: v,
                              children: [
                                v,
                                "\uC9C0\uC120\uB2E4"
                              ]
                            }, v))
                          })
                        ]
                      }) : null
                    ]
                  }),
                  t.jsxs("label", {
                    className: "block space-y-1.5",
                    children: [
                      t.jsxs("span", {
                        className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong",
                        children: [
                          "\uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D",
                          t.jsx("span", {
                            className: "ml-1 font-normal text-slate-500 dark:text-odp-muted",
                            children: "(\uC120\uD0DD)"
                          })
                        ]
                      }),
                      t.jsx("textarea", {
                        className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                        placeholder: "\uC608: \uACC4\uC0B0 \uC704\uC8FC\uB85C \uBC14\uAFB8\uACE0, \uC624\uB2F5 \uBCF4\uAE30\uB294 \uD5F7\uAC08\uB9AC\uAC8C \uAD6C\uC131\uD574 \uC8FC\uC138\uC694.",
                        value: f,
                        disabled: r,
                        onChange: (v) => h(v.target.value)
                      })
                    ]
                  })
                ]
              }),
              t.jsxs("div", {
                className: "flex gap-2 border-t border-violet-200 p-3 dark:border-violet-900/60",
                children: [
                  t.jsx(D, {
                    type: "button",
                    variant: "secondary",
                    size: "sm",
                    className: "flex-1",
                    disabled: r,
                    onClick: o,
                    children: "\uCDE8\uC18C"
                  }),
                  t.jsxs(D, {
                    type: "button",
                    variant: "primary",
                    size: "sm",
                    className: "flex-1",
                    disabled: r,
                    onClick: y,
                    children: [
                      r ? t.jsx(pn, {
                        size: 14,
                        className: "animate-spin",
                        "aria-hidden": true
                      }) : t.jsx(ds, {
                        size: 14
                      }),
                      r ? "\uC0DD\uC131 \uC911\u2026" : "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }) : null
    });
  }
  const La = i.memo(Oa), Qa = "z-100001 max-w-[min(92vw,420px)] break-all rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Ta = "flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", _a = "inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Da = "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-violet-600 dark:bg-odp-bgSoft dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500";
  function Fa({ path: e, isDock: n, onPreview: s, muted: r }) {
    const o = us(e), a = n ? `min-w-0 flex-1 truncate text-left hover:underline${r ? " opacity-60" : ""}` : `min-w-0 max-w-full truncate hover:underline${r ? " opacity-60" : ""}`, c = s ? t.jsx("button", {
      type: "button",
      className: a,
      onClick: () => s(e),
      children: o
    }) : t.jsx("span", {
      className: a,
      children: o
    });
    return t.jsxs(ze, {
      children: [
        t.jsx(Ie, {
          asChild: true,
          children: c
        }),
        t.jsx(Ae, {
          children: t.jsxs(Me, {
            side: "top",
            sideOffset: 6,
            className: Qa,
            children: [
              e,
              t.jsx(Re, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Br({ paths: e, onRemove: n, onOpenPicker: s, onPreview: r, isPathEnabled: o, onToggleEnabled: a, label: c = "\uADFC\uAC70 \uBB38\uC11C", emptyHint: d = "\uC120\uD0DD\uB41C \uADFC\uAC70 \uBB38\uC11C \uC5C6\uC74C", layout: u = "chips" }) {
    const m = u === "dock", f = m && !!a;
    return t.jsx(Mt, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: t.jsxs("div", {
        className: "space-y-1.5",
        children: [
          t.jsxs("div", {
            className: "flex flex-wrap items-center justify-between gap-2",
            children: [
              t.jsx("span", {
                className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                children: c
              }),
              s ? t.jsx(D, {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: s,
                children: "\uC120\uD0DD"
              }) : null
            ]
          }),
          e.length === 0 ? t.jsx("p", {
            className: "text-[11px] text-gray-500 dark:text-odp-muted",
            children: d
          }) : t.jsx("ul", {
            className: m ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5",
            children: e.map((h) => {
              const g = o ? o(h) : true, x = m ? `${Ta}${g ? "" : " opacity-70"}` : _a;
              return t.jsxs("li", {
                className: x,
                children: [
                  f ? t.jsx(la, {
                    className: Da,
                    checked: g,
                    onCheckedChange: (b) => a == null ? void 0 : a(h, b === true),
                    "aria-label": `${h} ${g ? "\uC0AC\uC6A9 \uC911" : "\uC0AC\uC6A9 \uC548 \uD568"}`,
                    children: t.jsx(ca, {
                      className: "text-white",
                      children: t.jsx(Mr, {
                        size: 10,
                        strokeWidth: 3
                      })
                    })
                  }) : null,
                  t.jsx(Fa, {
                    path: h,
                    isDock: m,
                    onPreview: r,
                    muted: f && !g
                  }),
                  n ? t.jsx("button", {
                    type: "button",
                    "aria-label": `${h} \uC81C\uAC70`,
                    className: m ? "ml-auto shrink-0 rounded-md p-1.5 hover:bg-violet-200/80 dark:hover:bg-violet-900" : "shrink-0 rounded p-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-900",
                    onClick: () => n(h),
                    children: t.jsx(qe, {
                      size: m ? 14 : 12
                    })
                  }) : null
                ]
              }, h);
            })
          })
        ]
      })
    });
  }
  function qa({ text: e, previewId: n, className: s = "", getPresignedUrl: r, currentNotePath: o }) {
    const a = ba(), c = i.useRef(null), d = i.useMemo(() => String(e || ""), [
      e
    ]), u = Sa(), m = r ?? u.getPresignedUrl, f = o ?? u.currentNotePath ?? null, h = u.hydrationEnabled !== false;
    return ka(c, d, m, f, {
      enabled: h
    }), t.jsx("div", {
      ref: c,
      className: `quiz-md-preview markdown-content ${s}`,
      children: t.jsx(ti, {
        id: n,
        modelValue: d,
        theme: a === "dark" ? "dark" : "light",
        previewTheme: "default",
        codeTheme: ni,
        language: "ko-KR",
        showCodeRowNumber: false,
        noImgZoomIn: true,
        iconfontType: void 0,
        sanitize: (g) => g
      })
    });
  }
  const _e = i.memo(qa), Ba = /\*\(\s*정답\s*\)\*|\(\s*정답\s*\)|\[\s*정답\s*\]|\*\s*정답\s*\*/;
  function Ua(e) {
    return e.replace(/\*\(\s*정답\s*\)\*/g, "").replace(/\(\s*정답\s*\)/g, "").replace(/\[\s*정답\s*\]/g, "").replace(/\*\s*정답\s*\*/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/__(.*?)__/g, "$1").trim();
  }
  function Ga(e) {
    let n = e.trim();
    const s = n.match(/^\[단답형\]\s*(.*)$/i);
    if (s) return {
      kind: "subjective",
      answerStyle: "short",
      question: (s[1] || "").trim()
    };
    const r = n.match(/^\[(?:주관식|서술형)\]\s*(.*)$/i);
    return r ? {
      kind: "subjective",
      answerStyle: "essay",
      question: (r[1] || "").trim()
    } : {
      kind: "choice",
      question: n
    };
  }
  const sr = /\*{0,2}\s*📖\s*모범\s*답안\s*:?\s*\*{0,2}/, rr = /\*{0,2}\s*💡\s*접근\s*Point!?\s*\*{0,2}/, or = /\*{0,2}\s*📖\s*해설\s*:?\s*\*{0,2}/, dn = /\*{0,2}\s*📚\s*근거\s*문서\s*:?\s*\*{0,2}/;
  function Wa(e) {
    const n = e.join(`
`);
    if (!dn.test(n) && !n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C")) return;
    const s = n.split(dn)[1] ?? "", r = [];
    for (const o of s.split(`
`)) {
      const a = o.trim().match(/^[-*]\s+(.+)$/);
      if (a == null ? void 0 : a[1]) {
        const c = a[1].trim().replace(/\\/g, "/").replace(/^\/+/, "");
        c && r.push(c);
      }
    }
    return r.length > 0 ? r : void 0;
  }
  function Zt(e) {
    return String(e || "").replace(/^\*+\s*/, "").replace(/\s*\*+$/, "").trim();
  }
  function Ja(e) {
    const n = e.join(`
`).trim();
    if (!n) return {
      point: "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.",
      explanation: "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
    };
    let s, r = n;
    if (sr.test(r)) {
      const d = r.split(sr), m = (d[1] || "").trim().split(/(?=\*{0,2}\s*(?:💡\s*접근\s*Point!?|📖\s*해설|📚\s*근거\s*문서))/);
      s = Zt(m[0] || ""), r = [
        d[0],
        ...m.slice(1)
      ].join(`
`).trim();
    }
    r = (r.split(dn)[0] || "").trim();
    let a = "", c = "";
    if (rr.test(r) || or.test(r)) {
      const d = r.split(or), u = d[0] || "";
      c = Zt(d.slice(1).join(`
`)), a = Zt(u.replace(rr, ""));
    } else c = Zt(r);
    return {
      point: a || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.",
      explanation: c || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",
      ...s ? {
        modelAnswer: s
      } : {}
    };
  }
  const Ha = /^<!--\s*quiz-q-meta\s+([\s\S]*?)-->\s*$/;
  function Ka(e) {
    try {
      const n = JSON.parse(e);
      if (!n || typeof n != "object") return null;
      const r = n.similarOf;
      if (!r || typeof r != "object") return {};
      const o = r, a = String(o.id || o.displayLabel || "").trim(), c = String(o.displayLabel || o.id || "").trim();
      return !a && !c ? {} : {
        similarOf: {
          id: a || c,
          displayLabel: c || a
        }
      };
    } catch {
      return null;
    }
  }
  function Va(e) {
    var _a2, _b;
    const s = (_b = (_a2 = String(e || "").match(/^(.+)-(?:유사|파생)\d+$/)) == null ? void 0 : _a2[1]) == null ? void 0 : _b.trim();
    if (s) return {
      id: s,
      displayLabel: s
    };
  }
  function ir(e, n) {
    return !n && !e ? e : e ? `${e}
${n}` : n;
  }
  function Xa(e) {
    return /^1\.\s+/.test(e.trim());
  }
  function Za(e) {
    const n = e.trim();
    return n.startsWith(">") || /^\*\*정답:\*\*/.test(n);
  }
  function on(e) {
    return e.trim().replace(/^>\s?/, "");
  }
  function Ya(e) {
    const n = on(e);
    return dn.test(n) || n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C");
  }
  function el(e) {
    return e.trim().startsWith(">");
  }
  function tl(e, n) {
    const s = e.trim();
    if (!s || !/^#+/.test(s)) return null;
    const r = s.split(`
`);
    let o = String(n + 1), a = o, c = "", d = null;
    const u = [];
    let m = 1, f;
    const h = [];
    let g = "choice", x, b, k = false, z = false, C = false;
    for (const F of r) {
      const A = F.trim(), _ = A.match(Ha);
      if (_ == null ? void 0 : _[1]) {
        const E = Ka(_[1]);
        (E == null ? void 0 : E.similarOf) && (b = E.similarOf);
        continue;
      }
      const q = A.match(/^#+\s*(?:🔖\s*)?(\d+(?:-(?:유사|파생)\d+)?)\.?(.*)/);
      if (q) {
        a = (q[1] || "").trim(), o = a;
        const E = Ga((q[2] || "").trim());
        g = E.kind, x = E.answerStyle, c = E.question, k = true, z = true, C = false;
        continue;
      }
      if (!k) continue;
      if (C) {
        if (el(A)) {
          h.push(on(A));
          continue;
        }
        C = false;
      }
      if (z) {
        if (Ya(A)) {
          z = false, C = true, h.push(on(A));
          continue;
        }
        if (Xa(A)) z = false;
        else if (g === "subjective" && Za(A)) z = false;
        else if (A.startsWith("![")) {
          c = ir(c, A);
          const E = A.match(/!\[.*?\]\((.*?)\)/);
          (E == null ? void 0 : E[1]) && !d && (d = E[1]);
          continue;
        } else {
          if (!A && !c) continue;
          if (z) {
            c = ir(c, A);
            continue;
          }
        }
      }
      if (A.startsWith("![")) {
        const E = A.match(/!\[.*?\]\((.*?)\)/);
        (E == null ? void 0 : E[1]) && (d = E[1]);
        continue;
      }
      const K = A.match(/^\*\*정답:\*\*\s*(.*)$/);
      if (K) {
        f = (K[1] || "").trim();
        continue;
      }
      if (/^\d+\.\s+/.test(A)) {
        const E = A.match(/^(\d+)\.\s+(.*)/);
        if (E) {
          const R = Number.parseInt(E[1] || "0", 10), W = (E[2] || "").trim(), T = Ba.test(W);
          u.push(Ua(W)), T && (m = R);
        }
        continue;
      }
      A.startsWith(">") && h.push(on(A));
    }
    const { point: $, explanation: y, modelAnswer: P } = Ja(h), v = Wa(h), j = f || P;
    let I = g, L = x;
    return I === "choice" && u.length === 0 && j && (I = "subjective", L = f ? "short" : "essay"), I === "choice" && u.length === 0 && !j || I === "subjective" && !c || I === "choice" && (!c || u.length === 0) ? null : (b || (b = Va(a)), c = c.trimEnd(), {
      id: o,
      displayLabel: a,
      kind: I,
      question: c,
      image: d,
      point: $,
      explanation: y,
      ...I === "subjective" && L ? {
        answerStyle: L
      } : {},
      ...I === "choice" ? {
        options: u,
        answer: m
      } : {},
      ...I === "subjective" && j ? {
        modelAnswer: j
      } : {},
      ...v ? {
        sourcePaths: v
      } : {},
      ...b ? {
        similarOf: b,
        isGenerated: true
      } : {}
    });
  }
  function at(e) {
    const { config: n, body: s } = si(e), { session: r, body: o } = ri(s), a = [];
    o.split(/(?=^#+\s*(?:🔖\s*)?\d+)/m).forEach((m, f) => {
      const h = tl(m, f);
      h && a.push(h);
    });
    const d = new Set(a.map((m) => m.id)), u = r && d.size > 0 ? oi(r, d, a) : r;
    return {
      config: is(n),
      questions: a,
      session: u && !os(u) ? u : null
    };
  }
  function Yt(e, n) {
    return (n == null ? void 0 : n.sourcePaths) && n.sourcePaths.length > 0 ? [
      ...n.sourcePaths
    ] : vr(e);
  }
  function ss(e) {
    let n = 0;
    for (const s of e) {
      const r = String(s.displayLabel || "").match(/^(\d+)/);
      if (r == null ? void 0 : r[1]) {
        const o = Number.parseInt(r[1], 10);
        Number.isFinite(o) && o > n && (n = o);
      }
    }
    return String(n + 1);
  }
  function Ur(e, n) {
    const s = String(e.displayLabel || n || "1").trim() || "1", r = String(e.point || "").trim() || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", o = String(e.explanation || "").trim() || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.", a = e.sourcePaths && e.sourcePaths.length > 0 ? [
      ...e.sourcePaths
    ] : void 0;
    if (e.kind === "subjective") {
      const d = e.answerStyle || "short";
      return {
        id: s,
        displayLabel: s,
        kind: "subjective",
        answerStyle: d,
        question: String(e.question || "").trim(),
        modelAnswer: String(e.modelAnswer || "").trim(),
        point: r,
        explanation: o,
        ...a ? {
          sourcePaths: a
        } : {}
      };
    }
    const c = (e.options || []).map((d) => String(d || "").trim());
    return {
      id: s,
      displayLabel: s,
      kind: "choice",
      question: String(e.question || "").trim(),
      options: c,
      answer: e.answer && e.answer >= 1 ? e.answer : 1,
      point: r,
      explanation: o,
      ...a ? {
        sourcePaths: a
      } : {}
    };
  }
  function nl(e) {
    if (!String(e.question || "").trim()) return "\uC9C8\uBB38 \uBCF8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.";
    if (e.kind === "choice") {
      const n = (e.options || []).map((o) => String(o || "").trim());
      if (n.filter(Boolean).length < 2) return "\uAC1D\uAD00\uC2DD\uC740 \uCD5C\uC18C 2\uAC1C \uC120\uD0DD\uC9C0\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.";
      const r = e.answer || 0;
      return r < 1 || r > n.length || !n[r - 1] ? "\uC815\uB2F5 \uC120\uD0DD\uC9C0\uB97C \uC9C0\uC815\uD558\uC138\uC694." : null;
    }
    return String(e.modelAnswer || "").trim() ? null : e.answerStyle === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694." : "\uC815\uB2F5\uC744 \uC785\uB825\uD558\uC138\uC694.";
  }
  function sl(e, n) {
    const s = e.kind || "choice", r = e.answerStyle === "essay" ? "essay" : "short", o = s === "choice" ? Je(Math.max(n, (e.options || []).filter(Boolean).length)) : n, a = s === "choice" ? Ye(e.options || [], o) : [];
    return {
      kind: s,
      answerStyle: r,
      question: e.question ?? "",
      options: a,
      answer: e.answer && e.answer >= 1 ? Math.min(o, e.answer) : 1,
      modelAnswer: e.modelAnswer ?? "",
      point: e.point ?? "",
      explanation: e.explanation ?? "",
      choiceCount: o
    };
  }
  function rl({ isOpen: e, onClose: n, styleTemplate: s, initial: r, nextLabel: o, onSubmit: a, onOpenSourcePicker: c, onFixWithAi: d }) {
    const u = !!r, [m, f] = i.useState((r == null ? void 0 : r.kind) || s.kind), [h, g] = i.useState((r == null ? void 0 : r.answerStyle) || s.answerStyle), [x, b] = i.useState(() => r ? Te(r, s.choiceCount) : s.choiceCount), [k, z] = i.useState((r == null ? void 0 : r.question) || ""), [C, $] = i.useState(() => Ye((r == null ? void 0 : r.options) || [], r ? Te(r, s.choiceCount) : s.choiceCount)), [y, P] = i.useState((r == null ? void 0 : r.answer) || 1), [v, j] = i.useState((r == null ? void 0 : r.modelAnswer) || ""), [I, L] = i.useState((r == null ? void 0 : r.point) || ""), [B, F] = i.useState((r == null ? void 0 : r.explanation) || ""), [A, _] = i.useState((r == null ? void 0 : r.sourcePaths) || []), [q, K] = i.useState(""), [E, R] = i.useState(false), [W, T] = i.useState(""), [le, He] = i.useState(false), st = i.useCallback((Q) => {
      const S = Je(Q);
      b(S), $((ce) => Ye(ce, S)), P((ce) => Math.min(Math.max(1, ce), S));
    }, []);
    i.useEffect(() => {
      if (!e) {
        R(false), T(""), He(false), K("");
        return;
      }
      if (r) {
        const Q = Te(r, s.choiceCount);
        f(r.kind), g(r.answerStyle === "essay" ? "essay" : "short"), b(Q), z(r.question || ""), $(Ye(r.options || [], Q)), P(r.answer || 1), j(r.modelAnswer || ""), L(r.point || ""), F(r.explanation || ""), _(r.sourcePaths || []);
      } else f(s.kind), g(s.answerStyle), b(s.choiceCount), z(""), $(Ye([], s.choiceCount)), P(1), j(""), L(""), F(""), _([]);
      R(false), T(""), K("");
    }, [
      e,
      r,
      s
    ]);
    const V = i.useMemo(() => {
      const Q = {
        kind: m,
        displayLabel: (r == null ? void 0 : r.displayLabel) || o,
        question: k,
        point: I,
        explanation: B,
        sourcePaths: A
      };
      return m === "subjective" ? {
        ...Q,
        answerStyle: h,
        modelAnswer: v
      } : {
        ...Q,
        options: Ye(C, x),
        answer: y
      };
    }, [
      m,
      h,
      r == null ? void 0 : r.displayLabel,
      o,
      k,
      C,
      x,
      y,
      v,
      I,
      B,
      A
    ]), Z = () => {
      const Q = nl(V);
      if (Q) {
        K(Q);
        return;
      }
      const S = Ur(V, o);
      r && (S.id = r.id, S.displayLabel = r.displayLabel), a(S), n();
    }, ne = async () => {
      if (!(!d || le)) {
        K(""), He(true);
        try {
          const Q = await d({
            instructions: W,
            form: V
          });
          if (!Q) return;
          const S = sl(Q, x);
          f(S.kind), g(S.answerStyle), b(S.choiceCount), z(S.question), $(S.options), P(S.answer), j(S.modelAnswer), L(S.point), F(S.explanation), R(false);
        } catch (Q) {
          K((Q instanceof Error ? Q.message : "") || "\uBB38\uC81C \uACE0\uCE58\uAE30\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
        } finally {
          He(false);
        }
      }
    };
    return t.jsx(as, {
      isOpen: e,
      onClose: n,
      contentClassName: "quiz-pane max-w-2xl max-h-[90vh]",
      children: t.jsxs("div", {
        className: "flex max-h-[min(80vh,720px)] flex-col gap-3 overflow-y-auto p-4 text-sm",
        children: [
          t.jsxs("div", {
            className: "flex flex-wrap items-start justify-between gap-2",
            children: [
              t.jsx("h2", {
                className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong",
                children: u ? "\uBB38\uC81C \uC218\uC815" : "\uBB38\uC81C \uCD94\uAC00"
              }),
              u && d ? t.jsxs(D, {
                type: "button",
                variant: E ? "primary" : "secondary",
                size: "sm",
                "aria-pressed": E,
                disabled: le,
                onClick: () => R((Q) => !Q),
                children: [
                  t.jsx(At, {
                    size: 14
                  }),
                  "\uBB38\uC81C \uACE0\uCE58\uAE30"
                ]
              }) : null
            ]
          }),
          u && E && d ? t.jsxs("div", {
            className: "space-y-2 rounded-xl border border-violet-200 bg-violet-50/80 p-3 dark:border-violet-900/60 dark:bg-violet-950/25",
            children: [
              t.jsx("p", {
                className: "text-xs text-violet-900 dark:text-violet-100",
                children: "\uD604\uC7AC \uBB38\uD56D\uC744 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uAC83\uC73C\uB85C \uBCF4\uACE0 AI\uAC00 \uAD50\uC815\uD569\uB2C8\uB2E4. \uC694\uAD6C\uC0AC\uD56D\uC744 \uC801\uC73C\uBA74 \uBB38\uD56D \uBC29\uD5A5\xB7\uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\uB97C \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
              }),
              t.jsxs("label", {
                className: "block space-y-1",
                children: [
                  t.jsx("span", {
                    className: "text-xs font-semibold text-violet-900 dark:text-violet-100",
                    children: "\uC218\uC815 \uC694\uAD6C\uC0AC\uD56D (\uC120\uD0DD)"
                  }),
                  t.jsx("textarea", {
                    className: "min-h-16 w-full rounded-lg border border-violet-200 bg-white p-2 text-xs dark:border-violet-800 dark:bg-odp-bgSoft",
                    placeholder: "\uC608: \uACC4\uC0B0 \uACFC\uC815\uC744 \uB2E8\uC21C\uD654\uD558\uACE0, \uC624\uB2F5 \uBCF4\uAE30\uB97C \uB354 \uADF8\uB7F4\uB4EF\uD558\uAC8C \uBC14\uAFD4 \uC8FC\uC138\uC694.",
                    value: W,
                    onChange: (Q) => T(Q.target.value),
                    disabled: le
                  })
                ]
              }),
              t.jsx("div", {
                className: "flex justify-end",
                children: t.jsxs(D, {
                  type: "button",
                  variant: "primary",
                  size: "sm",
                  disabled: le,
                  onClick: () => {
                    ne();
                  },
                  children: [
                    le ? t.jsx(pn, {
                      size: 14,
                      className: "animate-spin",
                      "aria-hidden": true
                    }) : t.jsx(At, {
                      size: 14
                    }),
                    le ? "\uACE0\uCE58\uB294 \uC911\u2026" : "AI\uB85C \uACE0\uCE58\uAE30"
                  ]
                })
              })
            ]
          }) : null,
          t.jsxs("div", {
            className: "flex flex-wrap items-center gap-2",
            children: [
              [
                [
                  "choice",
                  "\uAC1D\uAD00\uC2DD"
                ],
                [
                  "subjective-short",
                  "\uB2E8\uB2F5\uD615"
                ],
                [
                  "subjective-essay",
                  "\uC11C\uC220\uD615"
                ]
              ].map(([Q, S]) => {
                const ce = Q === "choice" ? m === "choice" : m === "subjective" && h === (Q === "subjective-short" ? "short" : "essay");
                return t.jsx("button", {
                  type: "button",
                  className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${ce ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100" : "border-gray-200 bg-white text-gray-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`,
                  onClick: () => {
                    Q === "choice" ? f("choice") : (f("subjective"), g(Q === "subjective-short" ? "short" : "essay"));
                  },
                  children: S
                }, Q);
              }),
              m === "choice" ? t.jsxs("label", {
                className: "ml-auto flex items-center gap-1.5 text-xs text-gray-600 dark:text-odp-muted",
                children: [
                  "\uBCF4\uAE30",
                  t.jsx("select", {
                    className: "rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                    value: x,
                    onChange: (Q) => st(Number(Q.target.value) || x),
                    children: Array.from({
                      length: yr - zt + 1
                    }, (Q, S) => zt + S).map((Q) => t.jsxs("option", {
                      value: Q,
                      children: [
                        Q,
                        "\uC9C0\uC120\uB2E4"
                      ]
                    }, Q))
                  })
                ]
              }) : null
            ]
          }),
          t.jsxs("label", {
            className: "block space-y-1",
            children: [
              t.jsx("span", {
                className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                children: "\uC9C8\uBB38 (Markdown)"
              }),
              t.jsx("textarea", {
                className: "min-h-24 w-full rounded-lg border border-gray-300 bg-white p-2 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: k,
                onChange: (Q) => z(Q.target.value)
              }),
              k.trim() ? t.jsx(_e, {
                text: k,
                previewId: "quiz-add-q-preview",
                className: "rounded border border-gray-100 p-2 text-xs dark:border-odp-borderSoft"
              }) : null
            ]
          }),
          m === "choice" ? t.jsxs("div", {
            className: "space-y-2",
            children: [
              t.jsxs("span", {
                className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                children: [
                  "\uC120\uD0DD\uC9C0 (",
                  x,
                  "\uC9C0\uC120\uB2E4)"
                ]
              }),
              C.map((Q, S) => t.jsxs("div", {
                className: "flex items-start gap-2",
                children: [
                  t.jsx("input", {
                    type: "radio",
                    name: "quiz-add-answer",
                    checked: y === S + 1,
                    onChange: () => P(S + 1),
                    className: "mt-2",
                    "aria-label": `${S + 1}\uBC88 \uC815\uB2F5`
                  }),
                  t.jsx("textarea", {
                    className: "min-h-10 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                    value: Q,
                    placeholder: `${S + 1}\uBC88`,
                    onChange: (ce) => {
                      const fe = [
                        ...C
                      ];
                      fe[S] = ce.target.value, $(fe);
                    }
                  })
                ]
              }, S))
            ]
          }) : t.jsxs("label", {
            className: "block space-y-1",
            children: [
              t.jsx("span", {
                className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                children: h === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548" : "\uC815\uB2F5"
              }),
              h === "essay" ? t.jsx("textarea", {
                className: "min-h-20 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: v,
                onChange: (Q) => j(Q.target.value)
              }) : t.jsx("input", {
                className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: v,
                onChange: (Q) => j(Q.target.value)
              })
            ]
          }),
          t.jsxs("label", {
            className: "block space-y-1",
            children: [
              t.jsx("span", {
                className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                children: "\uC811\uADFC Point (\uC120\uD0DD)"
              }),
              t.jsx("textarea", {
                className: "min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: I,
                onChange: (Q) => L(Q.target.value)
              })
            ]
          }),
          t.jsxs("label", {
            className: "block space-y-1",
            children: [
              t.jsx("span", {
                className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                children: "\uD574\uC124 (\uC120\uD0DD)"
              }),
              t.jsx("textarea", {
                className: "min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: B,
                onChange: (Q) => F(Q.target.value)
              })
            ]
          }),
          t.jsx(Br, {
            paths: A,
            onRemove: (Q) => _((S) => S.filter((ce) => ce !== Q)),
            onOpenPicker: () => c(A, (Q) => _(Q)),
            label: "\uBB38\uD56D \uADFC\uAC70 \uBB38\uC11C (\uC120\uD0DD)"
          }),
          q ? t.jsx("p", {
            className: "text-xs font-medium text-rose-600",
            children: q
          }) : null,
          t.jsxs("div", {
            className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft",
            children: [
              t.jsx(D, {
                type: "button",
                variant: "secondary",
                onClick: n,
                disabled: le,
                children: "\uCDE8\uC18C"
              }),
              t.jsxs(D, {
                type: "button",
                variant: "primary",
                onClick: Z,
                disabled: le,
                children: [
                  u ? t.jsx(fn, {
                    size: 14
                  }) : t.jsx(ii, {
                    size: 14
                  }),
                  u ? "\uC800\uC7A5" : "\uCD94\uAC00"
                ]
              })
            ]
          })
        ]
      })
    });
  }
  function ol(e, n) {
    const s = [
      ...e
    ];
    let r = Number.parseInt(ss(e), 10) || 1;
    for (const o of n) {
      const a = String(r);
      s.push({
        ...o,
        id: o.isGenerated ? o.id : a,
        displayLabel: a
      }), r += 1;
    }
    return s;
  }
  function il(e, n, s) {
    return s.mode === "replace" ? {
      config: s.mergeConfig !== false ? is({
        ...e.config,
        ...n.config,
        sourcePaths: n.config.sourcePaths.length > 0 ? n.config.sourcePaths : e.config.sourcePaths
      }) : e.config,
      questions: n.questions.map((o) => ({
        ...o
      }))
    } : {
      config: e.config,
      questions: ol(e.questions, n.questions)
    };
  }
  const al = `### 1. \uB9F5\uB9AC\uB4C0\uC2A4\uC5D0 \uB300\uD55C \uC124\uBA85\uC73C\uB85C \uAC00\uC7A5 \uC801\uC808\uD55C \uAC83\uC740?

1. Map \uB2E8\uACC4\uC5D0\uC11C \uD0A4-\uAC12 \uBCC0\uD658 \uD6C4 Reduce\uC5D0\uC11C \uC9D1\uACC4\uD55C\uB2E4. *(\uC815\uB2F5)*
2. \uC2E4\uC2DC\uAC04 \uC2A4\uD2B8\uB9AC\uBC0D \uC804\uC6A9\uC774\uB2E4.
3. Reduce\uAC00 Map\uBCF4\uB2E4 \uBA3C\uC800 \uC218\uD589\uB41C\uB2E4.
4. \uB2E8\uC77C \uC11C\uBC84\uC5D0\uC11C\uB9CC \uC2E4\uD589\uB41C\uB2E4.

> **\u{1F4A1} \uC811\uADFC Point!**
> Map \u2192 Shuffle \u2192 Reduce
>
> **\u{1F4D6} \uD574\uC124:**
> \uB9F5\uB9AC\uB4C0\uC2A4\uB294 \uBD84\uC0B0 \uCC98\uB9AC \uD504\uB85C\uADF8\uB798\uBC0D \uBAA8\uB378\uC774\uB2E4.
`;
  function ll({ isOpen: e, onClose: n, current: s, onApply: r }) {
    const [o, a] = i.useState(""), [c, d] = i.useState("append"), [u, m] = i.useState(""), [f, h] = i.useState(false), g = (b = false) => {
      const k = at(o);
      if (!k.questions.length) {
        m("\uD30C\uC2F1\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uD615\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      if (c === "replace" && !b) {
        h(true);
        return;
      }
      const z = il(s, k, {
        mode: c,
        mergeConfig: c === "replace"
      });
      r(z, c), n();
    }, x = (b) => {
      if (!b) return;
      const k = new FileReader();
      k.onload = () => {
        a(String(k.result || "")), m("");
      }, k.readAsText(b, "UTF-8");
    };
    return t.jsxs(t.Fragment, {
      children: [
        t.jsx(as, {
          isOpen: e,
          onClose: n,
          contentClassName: "quiz-pane max-w-3xl max-h-[90vh]",
          children: t.jsxs("div", {
            className: "flex max-h-[min(80vh,720px)] flex-col gap-3 p-4 text-sm",
            children: [
              t.jsx("h2", {
                className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong",
                children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"
              }),
              t.jsx("p", {
                className: "text-xs text-gray-600 dark:text-odp-muted",
                children: "`.quiz.md` \uBCF8\uBB38\uC744 \uBD99\uC5EC\uB123\uAC70\uB098 \uD30C\uC77C\uC744 \uBD88\uB7EC\uC624\uC138\uC694. \uC5EC\uB7EC \uBB38\uD56D\uC744 \uD55C \uBC88\uC5D0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
              }),
              t.jsxs("div", {
                className: "flex flex-wrap items-center gap-2 text-xs",
                children: [
                  t.jsxs(D, {
                    type: "button",
                    variant: "secondary",
                    onClick: () => {
                      var _a2;
                      return (_a2 = document.getElementById("quiz-bulk-file")) == null ? void 0 : _a2.click();
                    },
                    children: [
                      t.jsx(ai, {
                        size: 14
                      }),
                      "\uD30C\uC77C \uBD88\uB7EC\uC624\uAE30"
                    ]
                  }),
                  t.jsx("input", {
                    id: "quiz-bulk-file",
                    type: "file",
                    accept: ".md,.quiz.md,.txt,.markdown",
                    className: "hidden",
                    onChange: (b) => {
                      var _a2;
                      return x(((_a2 = b.target.files) == null ? void 0 : _a2[0]) || null);
                    }
                  }),
                  t.jsx(D, {
                    type: "button",
                    variant: "tertiary",
                    onClick: () => {
                      a(al), m("");
                    },
                    children: "\uC0D8\uD50C \uBD88\uB7EC\uC624\uAE30"
                  }),
                  t.jsxs("div", {
                    className: "ml-auto flex gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-odp-bgSoft",
                    children: [
                      t.jsx("button", {
                        type: "button",
                        className: `rounded-md px-2 py-1 font-semibold ${c === "append" ? "bg-white shadow-sm dark:bg-odp-surface" : "text-gray-600 dark:text-odp-muted"}`,
                        onClick: () => d("append"),
                        children: "\uCD94\uAC00"
                      }),
                      t.jsx("button", {
                        type: "button",
                        className: `rounded-md px-2 py-1 font-semibold ${c === "replace" ? "bg-white shadow-sm dark:bg-odp-surface" : "text-gray-600 dark:text-odp-muted"}`,
                        onClick: () => d("replace"),
                        children: "\uAD50\uCCB4"
                      })
                    ]
                  })
                ]
              }),
              t.jsx("textarea", {
                className: "min-h-64 w-full rounded-xl border border-gray-300 bg-slate-50 p-3 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: o,
                onChange: (b) => {
                  a(b.target.value), m("");
                },
                placeholder: "\uB9C8\uD06C\uB2E4\uC6B4 \uBB38\uC81C \uBAA9\uB85D\uC744 \uBD99\uC5EC\uB123\uC73C\uC138\uC694\u2026"
              }),
              u ? t.jsx("p", {
                className: "text-xs font-medium text-rose-600",
                children: u
              }) : null,
              t.jsxs("div", {
                className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft",
                children: [
                  t.jsx(D, {
                    type: "button",
                    variant: "secondary",
                    onClick: n,
                    children: "\uCDE8\uC18C"
                  }),
                  t.jsxs(D, {
                    type: "button",
                    variant: "primary",
                    onClick: () => g(false),
                    children: [
                      t.jsx(fn, {
                        size: 14
                      }),
                      "\uC801\uC6A9"
                    ]
                  })
                ]
              })
            ]
          })
        }),
        t.jsx(Kn, {
          isOpen: f,
          variant: "danger",
          title: "\uBB38\uD56D \uC804\uCCB4 \uAD50\uCCB4",
          message: "\uAE30\uC874 \uBB38\uD56D\uC744 \uBAA8\uB450 \uC9C0\uC6B0\uACE0 \uBD99\uC5EC\uB123\uC740 \uB0B4\uC6A9\uC73C\uB85C \uAD50\uCCB4\uD560\uAE4C\uC694? \uD480\uC774 \uC9C4\uD589 \uAE30\uB85D\uB3C4 \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uAD50\uCCB4",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            h(false), g(true);
          },
          onCancel: () => h(false)
        })
      ]
    });
  }
  function ar(e, n) {
    const s = [], r = (o) => {
      for (const a of o) if (a.type === "folder" && a.children) r(a.children);
      else if (a.type === "file") {
        if (!(a.path || a.name || "").toLowerCase().endsWith(".md") || n && a.path === n || ci(a.path) && n && a.path === n) continue;
        s.push(a);
      }
    };
    return r(e || []), s;
  }
  function cl({ isOpen: e, onClose: n, tree: s, selected: r, excludePath: o, onConfirm: a, onExpandFolder: c, onDropHostChange: d, onRegisterDropPathsMerge: u }) {
    const [m, f] = i.useState(r), [h, g] = i.useState(""), x = i.useMemo(() => Array.isArray(s) ? s : [], [
      s
    ]);
    i.useEffect(() => {
      e && f(r);
    }, [
      e,
      r
    ]);
    const b = i.useCallback((C) => {
      C.length && f(($) => {
        const y = new Set($);
        for (const P of C) y.add(P);
        return [
          ...y
        ].sort((P, v) => P.localeCompare(v));
      });
    }, []);
    i.useEffect(() => (u == null ? void 0 : u(b), () => u == null ? void 0 : u(null)), [
      b,
      u
    ]), i.useEffect(() => () => d == null ? void 0 : d(null), [
      d
    ]);
    const k = i.useMemo(() => {
      var _a2;
      if (!h) return x;
      const C = ($) => {
        for (const y of $) {
          if (y.path === h) return y;
          if (y.children) {
            const P = C(y.children);
            if (P) return P;
          }
        }
        return null;
      };
      return ((_a2 = C(x)) == null ? void 0 : _a2.children) || [];
    }, [
      x,
      h
    ]), z = (C) => {
      f(($) => $.includes(C) ? $.filter((y) => y !== C) : [
        ...$,
        C
      ]);
    };
    return t.jsx(as, {
      isOpen: e,
      onClose: n,
      contentClassName: "quiz-pane max-w-lg max-h-[90vh]",
      children: t.jsxs("div", {
        className: "flex max-h-[min(75vh,640px)] flex-col gap-3 p-4 text-sm",
        children: [
          t.jsx("h2", {
            className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong",
            children: "\uADFC\uAC70 \uBB38\uC11C \uC120\uD0DD"
          }),
          t.jsx("p", {
            className: "text-xs text-gray-600 dark:text-odp-muted",
            children: "vault\uC758 `.md` \uD30C\uC77C\uC744 \uB2E4\uC911 \uC120\uD0DD\uD558\uAC70\uB098, \uC0AC\uC774\uB4DC\uBC14\uC5D0\uC11C \uB04C\uC5B4\uB2E4 \uB193\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uD604\uC7AC quiz \uD30C\uC77C\uC740 \uC81C\uC678)"
          }),
          h ? t.jsx("button", {
            type: "button",
            className: "text-left text-xs text-blue-600 hover:underline",
            onClick: () => {
              const C = h.replace(/\/$/, "").split("/").filter(Boolean);
              C.pop(), g(C.length ? `${C.join("/")}/` : "");
            },
            children: "\u2190 \uC0C1\uC704 \uD3F4\uB354"
          }) : null,
          t.jsx("div", {
            ref: d,
            className: "relative min-h-48 flex-1",
            children: t.jsxs("ul", {
              className: "h-full min-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft",
              children: [
                k.map((C) => {
                  if (C.type === "folder") return t.jsx("li", {
                    children: t.jsxs("button", {
                      type: "button",
                      className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg",
                      onClick: async () => {
                        await (c == null ? void 0 : c(C)), g(C.path.endsWith("/") ? C.path : `${C.path}/`);
                      },
                      children: [
                        t.jsx(li, {
                          size: 14
                        }),
                        C.name
                      ]
                    })
                  }, C.path);
                  if (!(C.path || "").toLowerCase().endsWith(".md") || o && C.path === o) return null;
                  const y = m.includes(C.path);
                  return t.jsx("li", {
                    children: t.jsxs("label", {
                      className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg",
                      children: [
                        t.jsx("input", {
                          type: "checkbox",
                          checked: y,
                          onChange: () => z(C.path)
                        }),
                        t.jsx("span", {
                          className: "truncate",
                          children: C.name
                        })
                      ]
                    })
                  }, C.path);
                }),
                k.length === 0 ? t.jsx("li", {
                  className: "px-2 py-6 text-center text-xs text-gray-400",
                  children: "\uD56D\uBAA9 \uC5C6\uC74C"
                }) : null
              ]
            })
          }),
          t.jsxs("p", {
            className: "text-[11px] text-gray-500 dark:text-odp-muted",
            children: [
              m.length,
              "\uAC1C \uC120\uD0DD\uB428",
              ar(x, o).length ? ` / vault md ${ar(x, o).length}\uAC1C` : ""
            ]
          }),
          t.jsxs("div", {
            className: "flex justify-end gap-2",
            children: [
              t.jsx(D, {
                type: "button",
                variant: "secondary",
                onClick: n,
                children: "\uCDE8\uC18C"
              }),
              t.jsxs(D, {
                type: "button",
                variant: "primary",
                onClick: () => {
                  a(m), n();
                },
                children: [
                  t.jsx(fn, {
                    size: 14
                  }),
                  "\uC801\uC6A9"
                ]
              })
            ]
          })
        ]
      })
    });
  }
  function dl(e) {
    switch (e) {
      case "running":
        return t.jsx(pn, {
          size: 13,
          className: "animate-spin text-violet-600 dark:text-violet-300"
        });
      case "done":
        return t.jsx(Mr, {
          size: 13,
          className: "text-emerald-600 dark:text-emerald-400"
        });
      case "error":
        return t.jsx(qe, {
          size: 13,
          className: "text-rose-600 dark:text-rose-400"
        });
      case "skipped":
        return t.jsx(Hi, {
          size: 13,
          className: "text-slate-400 dark:text-odp-muted"
        });
      default:
        return t.jsx("span", {
          className: "inline-block h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600",
          "aria-hidden": true
        });
    }
  }
  function en({ title: e, body: n }) {
    return n.trim() ? t.jsxs("div", {
      className: "space-y-1",
      children: [
        t.jsx("p", {
          className: "text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-odp-muted",
          children: e
        }),
        t.jsx("pre", {
          className: "max-h-40 overflow-auto rounded border border-slate-200 bg-slate-50 p-2 font-mono text-[10px] leading-snug text-slate-800 dark:border-odp-borderSoft dark:bg-odp-bg dark:text-odp-fg",
          children: n
        })
      ]
    }) : null;
  }
  function ul({ step: e }) {
    var _a2, _b, _c2, _d;
    return !!((_a2 = e.systemPrompt) == null ? void 0 : _a2.trim()) || !!((_b = e.llmInstruction) == null ? void 0 : _b.trim()) || !!((_c2 = e.llmResponse) == null ? void 0 : _c2.trim()) || !!((_d = e.error) == null ? void 0 : _d.trim()) ? t.jsxs("div", {
      className: "space-y-2",
      children: [
        t.jsx(en, {
          title: "System prompt",
          body: e.systemPrompt || ""
        }),
        t.jsx(en, {
          title: "Instruction / input",
          body: e.llmInstruction || ""
        }),
        t.jsx(en, {
          title: "Model response / artifact",
          body: e.llmResponse || ""
        }),
        e.error ? t.jsx(en, {
          title: "Error",
          body: e.error
        }) : null
      ]
    }) : t.jsx("p", {
      className: "text-[10px] text-slate-400 dark:text-odp-muted",
      children: "\uC800\uC7A5\uB41C \uD504\uB86C\uD504\uD2B8/\uC751\uB2F5 \uC5C6\uC74C"
    });
  }
  function ml({ step: e, showDetail: n }) {
    const s = e.error || e.detail;
    return t.jsxs("li", {
      className: "space-y-1.5 py-0.5",
      children: [
        t.jsxs("div", {
          className: "flex items-start gap-2",
          children: [
            t.jsx("span", {
              className: "mt-0.5 shrink-0",
              children: dl(e.status)
            }),
            t.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [
                t.jsxs("p", {
                  className: `text-[11px] font-medium leading-snug ${e.status === "error" ? "text-rose-700 dark:text-rose-300" : e.status === "skipped" ? "text-slate-400 dark:text-odp-muted" : "text-slate-700 dark:text-odp-fg"}`,
                  children: [
                    e.label,
                    e.status === "running" ? t.jsx("span", {
                      className: "ml-1 font-normal text-violet-600 dark:text-violet-300",
                      children: "\uC9C4\uD589 \uC911"
                    }) : null
                  ]
                }),
                s ? t.jsx("p", {
                  className: `mt-0.5 truncate text-[10px] leading-snug ${e.status === "error" ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-odp-muted"}`,
                  title: s,
                  children: s
                }) : null
              ]
            })
          ]
        }),
        n ? t.jsx("div", {
          className: "ml-5 rounded-md border border-slate-100 bg-slate-50/80 p-2 dark:border-odp-borderSoft dark:bg-odp-bg/60",
          children: t.jsx(ul, {
            step: e
          })
        }) : null
      ]
    });
  }
  function fl({ job: e, detailOpen: n, onToggleDetail: s, onRemove: r }) {
    const o = e.kind === "similar" ? "\uC720\uC0AC\uBB38\uC81C" : e.kind === "derived" ? "\uD30C\uC0DD\uBB38\uC81C" : "\uADFC\uAC70 \uCD9C\uC81C", a = e.kind === "similar" ? t.jsx(At, {
      size: 14,
      className: "shrink-0 text-violet-600 dark:text-violet-300"
    }) : e.kind === "derived" ? t.jsx(ds, {
      size: 14,
      className: "shrink-0 text-violet-600 dark:text-violet-300"
    }) : t.jsx(Qe, {
      size: 14,
      className: "shrink-0 text-violet-600 dark:text-violet-300"
    });
    return t.jsxs("article", {
      className: `rounded-lg border px-2.5 py-2 ${e.status === "error" ? "border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/30" : e.status === "done" ? "border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20" : "border-slate-200 bg-white/90 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90"}`,
      children: [
        t.jsxs("div", {
          className: "mb-1.5 flex items-start gap-2",
          children: [
            a,
            t.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [
                t.jsxs("p", {
                  className: "text-xs font-bold text-slate-900 dark:text-odp-fgStrong",
                  children: [
                    o,
                    e.questionLabel ? t.jsxs("span", {
                      className: "font-semibold text-violet-700 dark:text-violet-300",
                      children: [
                        " ",
                        "\xB7 ",
                        e.questionLabel
                      ]
                    }) : null,
                    e.status === "running" ? t.jsx("span", {
                      className: "ml-1 text-[10px] font-medium text-violet-600 dark:text-violet-300",
                      children: "\uC9C4\uD589 \uC911"
                    }) : null,
                    e.status === "done" && e.resultLabel ? t.jsxs("span", {
                      className: "ml-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-300",
                      children: [
                        "\u2192 ",
                        e.resultLabel
                      ]
                    }) : null
                  ]
                }),
                t.jsx("p", {
                  className: "truncate text-[11px] text-slate-600 dark:text-odp-muted",
                  title: e.questionPreview,
                  children: e.questionPreview
                }),
                e.status === "error" && e.error ? t.jsx("p", {
                  className: "mt-1 text-[10px] leading-snug text-rose-700 dark:text-rose-300",
                  children: e.error
                }) : null,
                e.logPath ? t.jsxs("p", {
                  className: "mt-1 truncate font-mono text-[10px] text-slate-500 dark:text-odp-muted",
                  title: e.logPath,
                  children: [
                    "log: ",
                    e.logPath
                  ]
                }) : null
              ]
            }),
            t.jsxs("div", {
              className: "flex shrink-0 flex-col gap-0.5",
              children: [
                t.jsx("button", {
                  type: "button",
                  onClick: s,
                  className: "rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                  "aria-expanded": n,
                  "aria-label": n ? "\uC790\uC138\uD788 \uBCF4\uAE30 \uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30",
                  children: n ? t.jsx(Xs, {
                    size: 14
                  }) : t.jsx(ns, {
                    size: 14
                  })
                }),
                e.status !== "running" ? t.jsx("button", {
                  type: "button",
                  onClick: r,
                  className: "rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                  "aria-label": "\uBAA9\uB85D\uC5D0\uC11C \uC81C\uAC70",
                  children: t.jsx(qe, {
                    size: 14
                  })
                }) : null
              ]
            })
          ]
        }),
        t.jsx("div", {
          className: "mb-1.5 flex justify-end",
          children: t.jsxs(D, {
            type: "button",
            variant: "tertiary",
            size: "sm",
            onClick: s,
            children: [
              n ? t.jsx(Xs, {
                size: 14
              }) : t.jsx(ns, {
                size: 14
              }),
              n ? "\uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30"
            ]
          })
        }),
        t.jsx("ul", {
          className: "space-y-0.5 border-t border-slate-100 pt-1.5 dark:border-odp-borderSoft",
          children: e.steps.map((c) => t.jsx(ml, {
            step: c,
            showDetail: n
          }, c.id))
        })
      ]
    });
  }
  function pl({ jobs: e, isOpen: n, size: s, onClose: r, onResize: o, onRemoveJob: a, onClearFinished: c, onUserEngage: d, onPointerEngageChange: u, onFocusEngageChange: m }) {
    const f = i.useRef(null), [h, g] = i.useState({}), x = i.useRef({
      mode: null,
      startX: 0,
      startY: 0,
      startW: 0,
      startH: 0
    }), b = (v) => {
      g((j) => {
        const I = {
          ...j
        };
        return I[v] ? delete I[v] : I[v] = true, I;
      });
    }, k = i.useCallback((v, j) => {
      j.preventDefault(), j.stopPropagation(), x.current = {
        mode: v,
        startX: j.clientX,
        startY: j.clientY,
        startW: s.width,
        startH: s.height
      };
      const I = (B) => {
        const F = x.current;
        if (!F.mode) return;
        const A = F.startX - B.clientX, _ = F.startY - B.clientY;
        let q = F.startW, K = F.startH;
        (F.mode === "width" || F.mode === "both") && (q = F.startW + A), (F.mode === "height" || F.mode === "both") && (K = F.startH + _), o({
          width: q,
          height: K
        });
      }, L = () => {
        x.current.mode = null, document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", L);
      };
      document.addEventListener("pointermove", I), document.addEventListener("pointerup", L);
    }, [
      o,
      s.height,
      s.width
    ]), z = e.filter((v) => v.status === "running").length, C = e.filter((v) => v.status === "done").length, $ = e.filter((v) => v.status === "error").length, y = e.some((v) => v.status !== "running"), P = Pa();
    return t.jsx(an, {
      children: n ? t.jsxs(We.div, {
        ref: f,
        role: "dialog",
        "aria-modal": "false",
        "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4",
        className: "fixed bottom-4 right-4 z-10050 flex flex-col overflow-hidden rounded-xl border border-violet-300/60 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-800/50 dark:bg-odp-bgSoft/95",
        style: {
          width: s.width,
          height: s.height
        },
        initial: P.initial,
        animate: P.animate,
        exit: P.exit,
        transition: P.transition,
        onMouseEnter: () => u == null ? void 0 : u(true),
        onMouseLeave: () => u == null ? void 0 : u(false),
        onFocusCapture: () => m == null ? void 0 : m(true),
        onBlurCapture: (v) => {
          v.currentTarget.contains(v.relatedTarget) || (m == null ? void 0 : m(false));
        },
        onPointerDown: () => d == null ? void 0 : d(),
        children: [
          t.jsx("div", {
            className: "absolute left-0 top-0 z-20 h-3 w-3 cursor-nwse-resize touch-none",
            "aria-hidden": true,
            onPointerDown: (v) => k("both", v)
          }),
          t.jsx("div", {
            className: "absolute left-0 right-0 top-0 z-10 h-2 cursor-ns-resize touch-none",
            "aria-hidden": true,
            onPointerDown: (v) => k("height", v)
          }),
          t.jsx("div", {
            className: "absolute bottom-0 left-0 top-0 z-10 w-2 cursor-ew-resize touch-none",
            "aria-hidden": true,
            onPointerDown: (v) => k("width", v)
          }),
          t.jsxs("div", {
            className: "flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/70 bg-violet-50/90 px-3 py-2 dark:border-violet-900/40 dark:bg-violet-950/40",
            children: [
              t.jsxs("div", {
                className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-950 dark:text-violet-100",
                children: [
                  t.jsx(Ji, {
                    size: 16,
                    className: "shrink-0 opacity-50",
                    "aria-hidden": true
                  }),
                  t.jsx(Qe, {
                    size: 16,
                    className: "shrink-0",
                    "aria-hidden": true
                  }),
                  t.jsx("span", {
                    className: "truncate",
                    children: "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4"
                  })
                ]
              }),
              t.jsx("button", {
                type: "button",
                onClick: r,
                className: "rounded p-1 text-violet-900 hover:bg-violet-100 dark:text-violet-100 dark:hover:bg-violet-900/50",
                "aria-label": "\uD328\uB110 \uB2EB\uAE30",
                children: t.jsx(qe, {
                  size: 15
                })
              })
            ]
          }),
          t.jsx("div", {
            className: "shrink-0 border-b border-slate-200/80 px-3 py-1.5 text-[11px] text-slate-600 dark:border-odp-borderSoft dark:text-odp-muted",
            children: e.length === 0 ? "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131 \uC791\uC5C5\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : `\uC9C4\uD589 ${z} \xB7 \uC644\uB8CC ${C}${$ > 0 ? ` \xB7 \uC2E4\uD328 ${$}` : ""}`
          }),
          t.jsx("div", {
            className: "min-h-0 flex-1 overflow-y-auto p-3",
            children: e.length === 0 ? t.jsxs("p", {
              className: "py-6 text-center text-xs text-slate-500 dark:text-odp-muted",
              children: [
                "\uC720\uC0AC\uBB38\uC81C \uB610\uB294 \uADFC\uAC70 \uCD9C\uC81C\xB7\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131\uC744 \uC2E4\uD589\uD558\uBA74",
                t.jsx("br", {}),
                "\uB2E8\uACC4\uBCC4 \uC9C4\uD589 \uC0C1\uD669\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              ]
            }) : t.jsx("ul", {
              className: "space-y-2",
              children: e.map((v) => t.jsx("li", {
                children: t.jsx(fl, {
                  job: v,
                  detailOpen: !!h[v.id],
                  onToggleDetail: () => b(v.id),
                  onRemove: () => a(v.id)
                })
              }, v.id))
            })
          }),
          t.jsxs("div", {
            className: "flex shrink-0 justify-end gap-2 border-t border-slate-200/80 px-3 py-2 dark:border-odp-borderSoft",
            children: [
              y ? t.jsxs(D, {
                type: "button",
                variant: "tertiary",
                size: "sm",
                onClick: c,
                children: [
                  t.jsx(qe, {
                    size: 14
                  }),
                  "\uC644\uB8CC \uD56D\uBAA9 \uBE44\uC6B0\uAE30"
                ]
              }) : null,
              t.jsxs(D, {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: r,
                children: [
                  t.jsx(fn, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              })
            ]
          })
        ]
      }, "quiz-gen-queue-panel") : null
    });
  }
  const tn = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function xl({ stopwatch: e, onRequestStart: n }) {
    const { displayMs: s, running: r, started: o, start: a, pause: c, resume: d, stop: u } = e, m = n ?? a;
    return o ? t.jsx(Mt, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: t.jsxs("div", {
        className: "flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
        children: [
          t.jsx(Zs, {
            size: 14,
            className: `shrink-0 ${r ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`,
            "aria-hidden": true
          }),
          t.jsx("span", {
            className: `min-w-[3.25rem] font-mono text-sm font-bold tabular-nums ${r ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-odp-fgStrong"}`,
            "aria-live": "polite",
            children: Vn(s)
          }),
          r ? t.jsxs(ze, {
            children: [
              t.jsx(Ie, {
                asChild: true,
                children: t.jsx(D, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: c,
                  "aria-label": "\uC77C\uC2DC\uC815\uC9C0",
                  children: t.jsx(Ki, {
                    size: 14
                  })
                })
              }),
              t.jsx(Ae, {
                children: t.jsxs(Me, {
                  side: "bottom",
                  sideOffset: 6,
                  className: tn,
                  children: [
                    "\uC77C\uC2DC\uC815\uC9C0",
                    t.jsx(Re, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          }) : t.jsxs(ze, {
            children: [
              t.jsx(Ie, {
                asChild: true,
                children: t.jsx(D, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: d,
                  "aria-label": "\uC7AC\uAC1C",
                  children: t.jsx(Vi, {
                    size: 14
                  })
                })
              }),
              t.jsx(Ae, {
                children: t.jsxs(Me, {
                  side: "bottom",
                  sideOffset: 6,
                  className: tn,
                  children: [
                    "\uC7AC\uAC1C",
                    t.jsx(Re, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          }),
          t.jsxs(ze, {
            children: [
              t.jsx(Ie, {
                asChild: true,
                children: t.jsx(D, {
                  type: "button",
                  variant: "tertiary",
                  size: "sm",
                  onClick: u,
                  "aria-label": "\uC815\uC9C0",
                  children: t.jsx(Xi, {
                    size: 14
                  })
                })
              }),
              t.jsx(Ae, {
                children: t.jsxs(Me, {
                  side: "bottom",
                  sideOffset: 6,
                  className: tn,
                  children: [
                    "\uC815\uC9C0",
                    t.jsx(Re, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          })
        ]
      })
    }) : t.jsx(Mt, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: t.jsxs(ze, {
        children: [
          t.jsx(Ie, {
            asChild: true,
            children: t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: m,
              children: [
                t.jsx(Zs, {
                  size: 14
                }),
                t.jsx("span", {
                  className: "hidden md:inline",
                  children: "\uC2DC\uD5D8 \uC2A4\uD1B1\uC6CC\uCE58"
                })
              ]
            })
          }),
          t.jsx(Ae, {
            children: t.jsxs(Me, {
              side: "bottom",
              sideOffset: 6,
              className: tn,
              children: [
                "\uC2DC\uD5D8 \uC2DC\uAC04 \uCE21\uC815 \uC2DC\uC791",
                t.jsx(Re, {
                  className: "fill-white dark:fill-odp-surface"
                })
              ]
            })
          })
        ]
      })
    });
  }
  function hl({ log: e }) {
    const n = (e == null ? void 0 : e.events) ?? [], s = (e == null ? void 0 : e.questionEntries) ?? [], r = i.useMemo(() => {
      const o = [
        ...n.map((a) => ({
          kind: "event",
          at: a.at,
          data: a
        })),
        ...s.map((a) => ({
          kind: "question",
          at: a.at,
          data: a
        }))
      ];
      return o.sort((a, c) => a.at.localeCompare(c.at)), o;
    }, [
      n,
      s
    ]);
    return r.length ? t.jsxs("div", {
      className: "space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft",
      children: [
        t.jsx("h4", {
          className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong",
          children: "\uD480\uC774 \uC2DC\uAC04 \uAE30\uB85D"
        }),
        t.jsx("ol", {
          className: "max-h-40 space-y-1 overflow-y-auto text-[11px] text-slate-600 dark:text-odp-muted",
          children: r.map((o, a) => {
            if (o.kind === "event") {
              const d = o.data;
              return t.jsxs("li", {
                className: "font-mono leading-relaxed",
                children: [
                  t.jsx("span", {
                    className: "text-slate-500 dark:text-odp-muted",
                    children: Ln(d.at)
                  }),
                  " \xB7 ",
                  t.jsx("span", {
                    className: "font-semibold text-slate-700 dark:text-odp-fgStrong",
                    children: di[d.type]
                  }),
                  " \xB7 ",
                  t.jsx("span", {
                    className: "tabular-nums text-blue-600 dark:text-blue-400",
                    children: Vn(d.elapsedMs)
                  })
                ]
              }, `ev-${d.at}-${d.type}-${a}`);
            }
            const c = o.data;
            return t.jsxs("li", {
              className: "font-mono leading-relaxed",
              children: [
                t.jsx("span", {
                  className: "text-slate-500 dark:text-odp-muted",
                  children: Ln(c.at)
                }),
                " \xB7 ",
                t.jsxs("span", {
                  className: "font-semibold text-violet-700 dark:text-violet-300",
                  children: [
                    "\uBB38\uC81C ",
                    c.displayLabel
                  ]
                }),
                " \xB7 ",
                t.jsx("span", {
                  className: "tabular-nums text-blue-600 dark:text-blue-400",
                  children: Vn(c.durationMs)
                }),
                t.jsxs("span", {
                  className: "text-slate-400 dark:text-odp-muted",
                  children: [
                    " ",
                    "(~",
                    Ln(c.endedAt),
                    ")"
                  ]
                })
              ]
            }, `q-${c.questionId}-${c.at}-${a}`);
          })
        })
      ]
    }) : null;
  }
  const gl = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", bl = "\uC2DC\uD5D8\uC774 \uB05D\uB09C \uB4A4\uC5D0 \uC804\uCCB4 \uCC44\uC810\uC744 \uD574\uC8FC\uC138\uC694";
  function lr({ examInProgress: e, disabled: n, children: s, ...r }) {
    const o = !!n || e, a = t.jsx(D, {
      type: "button",
      ...r,
      disabled: o,
      children: s
    });
    return e ? t.jsxs(ze, {
      children: [
        t.jsx(Ie, {
          asChild: true,
          children: t.jsx("span", {
            className: "inline-flex",
            children: a
          })
        }),
        t.jsx(Ae, {
          children: t.jsxs(Me, {
            side: "top",
            sideOffset: 6,
            className: gl,
            children: [
              bl,
              t.jsx(Re, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    }) : a;
  }
  const ct = `You analyze exam multiple-choice items for similar-question generation.
Return JSON only. No markdown fences or extra text.

Schema:
{
  "coreCategory": "one-line core concept / topic category",
  "isCalculation": boolean,
  "variables": [
    {
      "id": "short id",
      "description": "what the parameter represents",
      "originalValue": number or string,
      "min": number,
      "max": number,
      "step": number (optional, default 1 for numeric),
      "unit": "optional unit label"
    }
  ]
}

Rules:
- coreCategory: the essential knowledge domain (not the full question text).
- isCalculation: true when solving requires numeric computation or formula application.
- When isCalculation is false, variables should be [].
- When isCalculation is true, list every key numeric/parameter value in the stem and options that should vary.
- min/max must be a plausible variation range that still keeps the item solvable; include originalValue within [min,max].
- Use numeric min/max/step for quantities; originalValue may be string only for non-numeric labels (then min/max may be ignored).`;
  function Gr(e) {
    return e && typeof e == "object" ? e : {};
  }
  function kl(e) {
    if (typeof e == "number" && Number.isFinite(e)) return e;
    if (typeof e == "string" && e.trim()) return e.trim();
    const n = Number(e);
    return Number.isFinite(n) ? n : String(e ?? "").trim();
  }
  function wl(e, n) {
    const s = Gr(e), r = String(s.id || s.name || `var${n + 1}`).trim();
    if (!r) return null;
    const o = String(s.description || s.label || r).trim() || r, a = kl(s.originalValue ?? s.value), c = Number(s.min), d = Number(s.max), u = Number.isFinite(c) ? c : 0, m = Number.isFinite(d) ? d : u, f = Number(s.step), h = Number.isFinite(f) && f > 0 ? f : 1, g = typeof s.unit == "string" && s.unit.trim() ? s.unit.trim() : void 0;
    return {
      id: r,
      description: o,
      originalValue: a,
      min: u,
      max: m,
      step: h,
      ...g ? {
        unit: g
      } : {}
    };
  }
  function Wr(e) {
    const n = Gr(e), s = String(n.coreCategory || n.category || n.topic || "").trim() || "general concept", r = !!(n.isCalculation ?? n.isCalc ?? n.calculation), a = (Array.isArray(n.variables) ? n.variables : []).map((c, d) => wl(c, d)).filter((c) => c != null);
    return {
      coreCategory: s,
      isCalculation: r,
      variables: r ? a : []
    };
  }
  function yl(e, n, s, r) {
    const o = Math.min(e, n), a = Math.max(e, n), c = s > 0 ? s : 1, d = Math.floor((a - o) / c);
    if (d < 0 || d === 0) return o;
    let u = o, m = 0;
    do {
      const f = Math.floor(Math.random() * (d + 1));
      u = o + f * c, m += 1;
    } while (m < 24 && typeof r == "number" && Number.isFinite(r) && u === r && d > 0);
    return u;
  }
  function Jr(e) {
    return e.map((n) => {
      if (typeof n.originalValue == "number" && Number.isFinite(n.originalValue)) {
        const s = yl(n.min, n.max, n.step ?? 1, n.originalValue);
        return {
          id: n.id,
          description: n.description,
          value: s,
          originalValue: n.originalValue,
          ...n.unit ? {
            unit: n.unit
          } : {}
        };
      }
      return {
        id: n.id,
        description: n.description,
        value: n.originalValue,
        originalValue: n.originalValue,
        ...n.unit ? {
          unit: n.unit
        } : {}
      };
    });
  }
  function dt(e) {
    const n = [
      "[\uBB38\uD56D \uBD84\uC11D \uACB0\uACFC]",
      `\uD575\uC2EC \uBC94\uC8FC: ${e.coreCategory}`,
      `\uACC4\uC0B0 \uBB38\uC81C: ${e.isCalculation ? "\uC608" : "\uC544\uB2C8\uC624"}`
    ];
    if (e.isCalculation && e.variables.length > 0) {
      n.push("\uD575\uC2EC \uBCC0\uC218:");
      for (const s of e.variables) {
        const r = s.unit ? ` ${s.unit}` : "";
        n.push(`- ${s.id} (${s.description}): \uC6D0\uBCF8=${String(s.originalValue)}${r}, \uBC94\uC704=${s.min}~${s.max}, step=${s.step ?? 1}`);
      }
    }
    return n.join(`
`);
  }
  function Hr(e) {
    if (!e.length) return "";
    const n = [
      "[\uBB34\uC791\uC704 \uC0D8\uD50C\uB9C1 \uBCC0\uC218 \u2014 \uC2E0\uADDC \uBB38\uD56D\uC5D0 \uBC18\uB4DC\uC2DC \uBC18\uC601]"
    ];
    for (const s of e) {
      const r = s.unit ? ` ${s.unit}` : "";
      n.push(`- ${s.id} (${s.description}): ${String(s.value)}${r} (\uC6D0\uBCF8: ${String(s.originalValue)}${r})`);
    }
    return n.join(`
`);
  }
  const vl = [
    "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694.",
    "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694."
  ], jl = [
    "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
  ], Sl = 12, Cl = 24;
  function mt(e) {
    const n = String(e || "").trim();
    return !n || n.length < Sl ? true : vl.some((s) => n === s);
  }
  function ft(e) {
    const n = String(e || "").trim();
    return !n || n.length < Cl ? true : jl.some((s) => n === s);
  }
  function un(e) {
    return !mt(String(e.point || "")) && !ft(String(e.explanation || ""));
  }
  function Kr(e) {
    return `${String(e || "").trim()}

[\uC720\uC0AC\uBB38\uD56D \uC0DD\uC131 \u2014 \uD544\uC218]
- \uC2E0\uADDC \uBB38\uD56D\uB9C8\uB2E4 point(\uC811\uADFC Point)\uC640 explanation(\uD574\uC124)\uC744 \uBC18\uB4DC\uC2DC \uD568\uAED8 \uC791\uC131\uD569\uB2C8\uB2E4. \uB458 \uC911 \uD558\uB098\uB77C\uB3C4 \uBE44\uC6B0\uAC70\uB098 placeholder\uB85C \uCC44\uC6B0\uBA74 \uC548 \uB429\uB2C8\uB2E4.
- point: \uC2E0\uADDC \uBB38\uD56D\uC758 \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C \uC791\uC131\uD569\uB2C8\uB2E4(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5).
  - \uC218\uD5D8\uC790\uAC00 \uC720\uC0AC\uD55C \uB2E4\uB978 \uBB38\uC81C\uB97C \uB9CC\uB098\uB354\uB77C\uB3C4, \uBB34\uC5C7\uC744 \uBA3C\uC800 \uD310\uBCC4\xB7\uC5F0\uACB0\xB7\uAC80\uD1A0\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC \uC9DA\uC2B5\uB2C8\uB2E4.
  - \uC804\uCCB4 \uD480\uC774 \uACFC\uC815\uC774\uB098 \uC815\uB2F5\uC744 \uADF8\uB300\uB85C \uB178\uCD9C\uD558\uC9C0 \uB9C8\uC138\uC694.
- explanation: \uC815\uB2F5 \uADFC\uAC70, \uC624\uB2F5 \uD568\uC815, \uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 point/\uD574\uC124\uC744 \uADF8\uB300\uB85C \uBCF5\uC0AC\uD558\uC9C0 \uB9D0\uACE0, \uC2E0\uADDC \uBB38\uD56D\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\uC5D0 \uB9DE\uAC8C \uC0C8\uB85C \uC791\uC131\uD569\uB2C8\uB2E4.
- options \uAC01 \uD56D\uBAA9\uC5D0\uB294 \uBCF4\uAE30 \uBC88\uD638 \uC811\uB450\uC0AC(1., 2., a., \uAC00. \uB4F1)\uB97C \uB123\uC9C0 \uB9C8\uC138\uC694. \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD569\uB2C8\uB2E4.`;
  }
  function Vr(e) {
    var _a2;
    const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim();
    return `${n ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${n}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((r, o) => `${o + 1}. ${r}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
\uC811\uADFC Point: ${e.point || ""}
${s ? `\uD574\uC124: ${s}
` : ""}
\uC704 \uBB38\uD56D\uC744 \uBD84\uC11D\uD558\uC5EC JSON \uC2A4\uD0A4\uB9C8\uC5D0 \uB9DE\uAC8C\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
  }
  function Nl(e) {
    var _a2;
    const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim();
    return `${n ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${n}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((r, o) => `${o + 1}. ${r}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
\uC811\uADFC Point: ${e.point || ""}
${s ? `\uD574\uC124: ${s}
` : ""}
${e.analysisBlock}

${e.sampledBlock}

${e.complexity}
\uBCF4\uAE30 \uAC1C\uC218: ${e.choiceCount}
\uC774\uBC88 \uC2E0\uADDC \uBB38\uC81C\uC758 \uC815\uB2F5 \uBC88\uD638\uB294 \uBC18\uB4DC\uC2DC ${e.targetAnswer}\uBC88\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.

\uB3D9\uC77C\uD55C \uD575\uC2EC \uBC94\uC8FC \uB0B4\uC5D0\uC11C \uC6D0\uBCF8\uACFC \uB2E4\uB978 \uC218\uCE58/\uC0AC\uB840/\uD45C\uD604\uC758 \uC720\uC0AC \uBB38\uD56D\uC744 \uC791\uC131\uD558\uC138\uC694.

[\uD544\uC218 \u2014 point / explanation]
- JSON\uC758 point\uC640 explanation\uC744 \uBC18\uB4DC\uC2DC \uD568\uAED8 \uCC44\uC6B0\uC138\uC694. \uB458 \uC911 \uD558\uB098\uB77C\uB3C4 \uBE44\uC6B0\uBA74 \uC548 \uB429\uB2C8\uB2E4.
- point(\uC811\uADFC Point): \uC2E0\uADDC \uBB38\uD56D\uC758 \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C \uC791\uC131\uD558\uC138\uC694.
  - \uC218\uD5D8\uC790\uAC00 \uC720\uC0AC\uD55C \uB2E4\uB978 \uBB38\uC81C\uB97C \uB9CC\uB098\uB354\uB77C\uB3C4 \uBB34\uC5C7\uC744 \uBA3C\uC800 \uD310\uBCC4\xB7\uC5F0\uACB0\xB7\uAC80\uD1A0\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC 1~3\uAC1C \uBD88\uB9BF(\uB610\uB294 1~2\uBB38\uC7A5)\uC73C\uB85C \uC81C\uC2DC\uD558\uC138\uC694.
  - \uC804\uCCB4 \uD480\uC774\uB098 \uC815\uB2F5\uC744 \uADF8\uB300\uB85C \uC801\uC9C0 \uB9C8\uC138\uC694. \uC6D0\uBCF8 \uC811\uADFC Point\uB97C \uBCF5\uC0AC\uD558\uC9C0 \uB9C8\uC138\uC694.
- explanation(\uD574\uC124): \uC815\uB2F5 \uADFC\uAC70, \uC624\uB2F5 \uD568\uC815, \uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124\uC744 \uC791\uC131\uD558\uC138\uC694.
- \uC6D0\uBCF8 \uD574\uC124/\uC811\uADFC Point\uB97C \uADF8\uB300\uB85C \uBCF5\uC0AC\uD558\uC9C0 \uB9D0\uACE0, \uC2E0\uADDC \uBB38\uD56D\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\uC5D0 \uB9DE\uAC8C \uC0C8\uB85C \uC791\uC131\uD558\uC138\uC694.
- options \uAC01 \uD56D\uBAA9\uC5D0\uB294 1., a. \uAC19\uC740 \uBC88\uD638\xB7\uAE30\uD638 \uC811\uB450\uC0AC \uC5C6\uC774 \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694.

JSON\uB9CC \uBC18\uD658:
{"question":"...","options":[${Array.from({
      length: e.choiceCount
    }, () => '"..."').join(",")}],"answer":${e.targetAnswer},"point":"...","explanation":"..."}`;
  }
  function Xr(e) {
    const n = [];
    return e.missingPoint && n.push("point(\uC811\uADFC Point)"), e.missingExplanation && n.push("explanation(\uD574\uC124)"), `[\uC2E0\uADDC \uC720\uC0AC \uBB38\uD56D]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((s, r) => `${r + 1}. ${s}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88

${e.analysisBlock}

\uC704 \uBB38\uD56D\uC5D0 \uB300\uD574 \uB204\uB77D\uB41C ${n.join(" \uBC0F ")}\uC744(\uB97C) \uC791\uC131\uD558\uC138\uC694.
- point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5). \uC720\uC0AC \uC720\uD615\uC5D0\uC11C \uBB34\uC5C7\uC744 \uBA3C\uC800 \uC0DD\uAC01\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- explanation: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124.

JSON\uB9CC \uBC18\uD658:
{"point":"...","explanation":"..."}`;
  }
  function $l(e) {
    var _a2;
    const n = e.question, s = [];
    e.missingPoint && s.push("point(\uC811\uADFC Point)"), e.missingExplanation && s.push("explanation(\uD574\uC124)");
    let r = "";
    if (n.kind === "choice") {
      const d = n.options || [];
      r = `\uC9C8\uBB38: ${n.question}
\uBCF4\uAE30: ${d.map((u, m) => `${m + 1}. ${u}`).join(" | ")}
\uC815\uB2F5: ${n.answer ?? 1}\uBC88`;
    } else r = `\uC9C8\uBB38: ${n.question}
${n.modelAnswer ? `\uBAA8\uBC94 \uB2F5\uC548: ${n.modelAnswer}
` : ""}`;
    const o = [];
    !e.missingPoint && String(n.point || "").trim() && o.push(`\uC811\uADFC Point: ${n.point}`), !e.missingExplanation && String(n.explanation || "").trim() && o.push(`\uD574\uC124: ${n.explanation}`);
    const a = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), c = o.length > 0 ? `
[\uAE30\uC874 \uB0B4\uC6A9 \u2014 \uADF8\uB300\uB85C \uC720\uC9C0]
${o.join(`
`)}
` : "";
    return `${a ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${a}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uBB38\uD56D]
${r}
${c}
\uC704 \uBB38\uD56D\uC5D0 \uB300\uD574 \uB204\uB77D\uB41C ${s.join(" \uBC0F ")}\uC744(\uB97C) \uC791\uC131\uD558\uC138\uC694.
- point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5). \uC720\uC0AC \uC720\uD615\uC5D0\uC11C \uBB34\uC5C7\uC744 \uBA3C\uC800 \uC0DD\uAC01\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC. \uC804\uCCB4 \uD480\uC774\uB098 \uC815\uB2F5\uC744 \uADF8\uB300\uB85C \uB178\uCD9C\uD558\uC9C0 \uB9C8\uC138\uC694.
- explanation: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.

JSON\uB9CC \uBC18\uD658:
{"point":"...","explanation":"..."}`;
  }
  function El({ question: e, busyKey: n, showContent: s = true, onGenerate: r }) {
    const o = mt(e.point || ""), a = ft(e.explanation || ""), c = o || a;
    if (!s && !c) return null;
    const d = `sections-${e.id}`, u = n === d, m = c ? t.jsxs("div", {
      className: "flex justify-end gap-2",
      children: [
        o && a ? t.jsxs(D, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: u,
          onClick: () => r("both"),
          children: [
            t.jsx(Qe, {
              size: 14
            }),
            u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131"
          ]
        }) : null,
        o && !a ? t.jsxs(D, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: u,
          onClick: () => r("point"),
          children: [
            t.jsx(Qe, {
              size: 14
            }),
            u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point \uC0DD\uC131"
          ]
        }) : null,
        a && !o ? t.jsxs(D, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: u,
          onClick: () => r("explanation"),
          children: [
            t.jsx(Qe, {
              size: 14
            }),
            u ? "\uC0DD\uC131 \uC911\u2026" : "\uD574\uC124 \uC0DD\uC131"
          ]
        }) : null
      ]
    }) : null;
    return s ? t.jsxs("div", {
      className: "mt-2 flex flex-col space-y-2 rounded-xl bg-slate-50 p-3 text-xs dark:bg-odp-bgSoft",
      children: [
        t.jsx("div", {
          className: "font-bold text-slate-800 dark:text-odp-fgStrong",
          children: "\uC811\uADFC Point \xB7 \uD574\uC124"
        }),
        t.jsxs("div", {
          children: [
            t.jsx("div", {
              className: "mb-1 font-bold text-amber-800",
              children: "\uC811\uADFC Point!"
            }),
            o ? t.jsx("p", {
              className: "text-[11px] italic text-slate-500 dark:text-odp-muted",
              children: "\uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
            }) : t.jsx(_e, {
              text: e.point,
              previewId: `qp-${e.id}`
            })
          ]
        }),
        t.jsxs("div", {
          children: [
            t.jsx("div", {
              className: "mb-1 font-bold text-slate-800 dark:text-odp-fgStrong",
              children: "\uD574\uC124"
            }),
            a ? t.jsx("p", {
              className: "text-[11px] italic text-slate-500 dark:text-odp-muted",
              children: "\uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
            }) : t.jsx(_e, {
              text: e.explanation,
              previewId: `qe-${e.id}`
            })
          ]
        }),
        e.kind === "subjective" && e.modelAnswer ? t.jsxs("div", {
          children: [
            t.jsx("div", {
              className: "mb-1 font-bold",
              children: "\uBAA8\uBC94 \uB2F5\uC548"
            }),
            t.jsx(_e, {
              text: e.modelAnswer,
              previewId: `qm-${e.id}`
            })
          ]
        }) : null,
        m
      ]
    }) : t.jsxs("div", {
      className: "mt-3 flex flex-col rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100",
      children: [
        t.jsx("div", {
          className: "mb-2 font-bold text-amber-800 dark:text-amber-200",
          children: "\uC811\uADFC Point \xB7 \uD574\uC124"
        }),
        t.jsx("p", {
          className: "mb-3 text-[11px] text-amber-700/90 dark:text-amber-200/80",
          children: o && a ? "\uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." : o ? "\uC811\uADFC Point\uAC00 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." : "\uD574\uC124\uC774 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
        }),
        m
      ]
    });
  }
  const Pl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-200 bg-white text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100 dark:hover:bg-rose-950/50 dark:data-[state=checked]:border-rose-500 dark:data-[state=checked]:bg-rose-600", zl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50 dark:data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-600";
  function Il({ question: e, focusOption: n, onFocusOptionChange: s, wrongExps: r, busyKey: o, onOpenAnalysisDock: a }) {
    var _a2;
    const c = ((_a2 = e.options) == null ? void 0 : _a2.length) || 0;
    if (c <= 0) return null;
    const d = Ze(e.id, n), u = r[d], m = u !== void 0, f = o === d, h = n === e.answer, g = h ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D", x = h ? "mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : "mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100", b = h ? "font-bold text-emerald-800 dark:text-emerald-200" : "font-bold text-rose-800 dark:text-rose-200", k = h ? "text-[11px] font-semibold text-emerald-700 dark:text-emerald-200" : "text-[11px] font-semibold text-rose-700 dark:text-rose-200", z = h ? "text-[11px] text-emerald-700/90 dark:text-emerald-200/80" : "text-[11px] text-rose-700/90 dark:text-rose-200/80", C = h ? "text-[10px] font-medium text-emerald-500 dark:text-emerald-300" : "text-[10px] font-medium text-rose-500 dark:text-rose-300", $ = h ? "bg-emerald-500 dark:bg-emerald-300" : "bg-rose-500 dark:bg-rose-300", y = h ? "ring-emerald-50 dark:ring-emerald-950" : "ring-rose-50 dark:ring-rose-950";
    return t.jsxs("div", {
      className: x,
      children: [
        t.jsxs("div", {
          className: "mb-2 flex flex-wrap items-center justify-between gap-2",
          children: [
            t.jsx("div", {
              className: b,
              children: g
            }),
            t.jsx(da, {
              className: "flex flex-wrap items-center gap-1",
              value: String(n),
              onValueChange: (P) => {
                const v = Number.parseInt(P, 10);
                Number.isFinite(v) && v >= 1 && s(v);
              },
              "aria-label": `${e.displayLabel}\uBC88 \uBCF4\uAE30 \uC120\uD0DD`,
              children: Array.from({
                length: c
              }, (P, v) => {
                const j = v + 1, I = Ze(e.id, j), L = r[I] !== void 0 && String(r[I] || "").trim(), B = j === e.answer, F = B ? zl : Pl;
                return t.jsxs(ua, {
                  value: String(j),
                  className: `${F} ${L ? "pr-2 pl-2" : ""}`,
                  "aria-label": `${j}\uBC88${B ? " (\uC815\uB2F5)" : ""}${L ? ", \uBD84\uC11D \uC800\uC7A5\uB428" : ""}`,
                  children: [
                    t.jsx("span", {
                      children: j
                    }),
                    L ? t.jsx("span", {
                      className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ${y}`,
                      "aria-hidden": true
                    }) : null
                  ]
                }, j);
              })
            })
          ]
        }),
        m ? t.jsxs("div", {
          children: [
            t.jsxs("div", {
              className: "mb-1.5 flex flex-wrap items-center gap-2",
              children: [
                t.jsxs("span", {
                  className: k,
                  children: [
                    n,
                    "\uBC88",
                    h ? " \xB7 \uC815\uB2F5 \uBCF4\uAE30" : " \xB7 \uC624\uB2F5 \uBCF4\uAE30"
                  ]
                }),
                f ? t.jsxs("span", {
                  className: `inline-flex items-center gap-1 ${C}`,
                  children: [
                    t.jsx("span", {
                      className: `h-1.5 w-1.5 animate-pulse rounded-full ${$}`
                    }),
                    "\uC0DD\uC131 \uC911"
                  ]
                }) : null
              ]
            }),
            t.jsx("div", {
              className: "[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent",
              children: u ? t.jsx(_e, {
                text: u,
                previewId: `wx-${e.id}-${n}`
              }) : t.jsx("p", {
                className: `${z} opacity-80`,
                children: "\uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uB294 \uC911\u2026"
              })
            }),
            t.jsxs("div", {
              className: "mt-2 flex flex-wrap gap-1.5",
              children: [
                t.jsxs(D, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  disabled: f,
                  onClick: () => a(n, "followup"),
                  children: [
                    t.jsx(Zi, {
                      size: 14
                    }),
                    "\uCD94\uAC00\uC9C8\uBB38"
                  ]
                }),
                t.jsxs(D, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  disabled: f,
                  onClick: () => a(n, "regenerate"),
                  children: [
                    t.jsx(Yi, {
                      size: 14
                    }),
                    "\uC7AC\uC0DD\uC131"
                  ]
                })
              ]
            })
          ]
        }) : t.jsxs("div", {
          className: "flex flex-wrap items-center justify-between gap-2",
          children: [
            t.jsxs("p", {
              className: z,
              children: [
                n,
                "\uBC88 \uBCF4\uAE30 \uBD84\uC11D\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4."
              ]
            }),
            t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: f,
              onClick: () => a(n, "create"),
              children: [
                f ? t.jsx(Qe, {
                  size: 14,
                  className: "animate-pulse"
                }) : t.jsx(At, {
                  size: 14
                }),
                "\uBD84\uC11D \uC0DD\uC131"
              ]
            })
          ]
        })
      ]
    });
  }
  function Al({ questionId: e, value: n, onSave: s }) {
    const r = String(n || ""), o = r.trim().length > 0, a = `qmemo-${e}`, [c, d] = i.useState(false), [u, m] = i.useState("");
    i.useEffect(() => {
      c || m(r);
    }, [
      r,
      c
    ]);
    const f = () => {
      m(""), d(true);
    }, h = () => {
      m(r), d(true);
    }, g = () => {
      s(u), d(false);
    };
    return t.jsx("div", {
      className: "mt-3 border-t border-slate-200 pt-3 dark:border-odp-borderSoft",
      children: c ? t.jsxs("div", {
        className: "space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
        children: [
          t.jsxs("label", {
            className: "block space-y-1.5",
            children: [
              t.jsxs("span", {
                className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong",
                children: [
                  "\uBA54\uBAA8",
                  t.jsx("span", {
                    className: "ml-1 font-normal text-slate-500 dark:text-odp-muted",
                    children: "(Markdown)"
                  })
                ]
              }),
              t.jsx("textarea", {
                className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                placeholder: "\uBB38\uC81C\uC5D0 \uB300\uD55C \uBA54\uBAA8\uB97C Markdown\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.",
                value: u,
                onChange: (x) => m(x.target.value),
                autoFocus: true
              })
            ]
          }),
          t.jsxs("div", {
            className: "flex flex-wrap gap-1.5",
            children: [
              t.jsx(D, {
                type: "button",
                variant: "primary",
                size: "sm",
                onClick: g,
                children: "\uC800\uC7A5\uD558\uAE30"
              }),
              t.jsx(D, {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => {
                  m(r), d(false);
                },
                children: "\uCDE8\uC18C"
              })
            ]
          })
        ]
      }) : t.jsxs(t.Fragment, {
        children: [
          o ? t.jsx("div", {
            className: "mb-2 rounded-lg border border-slate-200 bg-white p-2.5 text-sm dark:border-odp-borderSoft dark:bg-odp-bg",
            children: t.jsx(_e, {
              text: r,
              previewId: a
            })
          }) : null,
          t.jsxs(D, {
            type: "button",
            variant: "secondary",
            size: "sm",
            onClick: o ? h : f,
            children: [
              t.jsx(xn, {
                size: 14
              }),
              o ? "\uBA54\uBAA8\uC218\uC815" : "\uBA54\uBAA8\uC791\uC131"
            ]
          })
        ]
      })
    });
  }
  const Ml = 400;
  function Rl(e, n, s) {
    const [r, o] = i.useState(n), a = i.useRef(n), c = i.useRef(null);
    i.useEffect(() => {
      n !== a.current && (a.current = n, o(n));
    }, [
      n
    ]);
    const d = i.useCallback(() => {
      c.current != null && (clearTimeout(c.current), c.current = null), r !== a.current && (a.current = r, s(e, r));
    }, [
      r,
      s,
      e
    ]), u = i.useCallback((m) => {
      o(m), c.current != null && clearTimeout(c.current), c.current = setTimeout(() => {
        c.current = null, m !== a.current && (a.current = m, s(e, m));
      }, Ml);
    }, [
      s,
      e
    ]);
    return i.useEffect(() => () => {
      c.current != null && clearTimeout(c.current);
    }, []), {
      draft: r,
      handleChange: u,
      flush: d
    };
  }
  const rs = "data-quiz-q-track", Ol = 0.12;
  function Ll({ scrollRootRef: e, questions: n, running: s, getElapsedMs: r, timeLog: o, onLogChange: a }) {
    const c = i.useRef(o), d = i.useRef(a), u = i.useRef(r), m = i.useRef(n), f = i.useRef(null), h = i.useRef(null), g = i.useRef(/* @__PURE__ */ new Map());
    c.current = o, d.current = a, u.current = r, m.current = n;
    const x = i.useCallback(($) => {
      const y = f.current;
      if (!y) return;
      f.current = null, h.current = null;
      const P = u.current(), v = Math.max(0, P - y.elapsedMs);
      if (v < ui) return;
      const j = {
        questionId: y.questionId,
        displayLabel: y.displayLabel,
        at: y.at,
        endedAt: $ ?? (/* @__PURE__ */ new Date()).toISOString(),
        durationMs: v
      }, I = mi(c.current, j);
      d.current(I);
    }, []), b = i.useCallback(($, y) => {
      var _a2;
      ((_a2 = f.current) == null ? void 0 : _a2.questionId) !== $ && (f.current = {
        questionId: $,
        displayLabel: y,
        at: (/* @__PURE__ */ new Date()).toISOString(),
        elapsedMs: u.current()
      }, h.current = $);
    }, []), k = i.useCallback(() => {
      let $ = null, y = 0;
      for (const [P, v] of g.current) v > y && (y = v, $ = P);
      return y >= Ol ? $ : null;
    }, []), z = i.useCallback(($) => {
      if (!s || $ === h.current) return;
      if (x(), !$) {
        h.current = null;
        return;
      }
      const y = m.current.find((P) => P.id === $);
      y && b(y.id, y.displayLabel);
    }, [
      x,
      s,
      b
    ]);
    i.useEffect(() => {
      if (!s) {
        x(), g.current.clear();
        return;
      }
      z(k());
    }, [
      s,
      x,
      z,
      k
    ]);
    const C = n.map(($) => $.id).join("\0");
    i.useEffect(() => {
      const $ = e.current;
      if (!$ || !s) return;
      const y = new Set(m.current.map((j) => j.id));
      g.current = new Map([
        ...g.current.entries()
      ].filter(([j]) => y.has(j)));
      const P = new IntersectionObserver((j) => {
        for (const I of j) {
          const L = I.target.getAttribute(rs);
          L && g.current.set(L, I.intersectionRatio);
        }
        z(k());
      }, {
        root: $,
        threshold: [
          0,
          0.1,
          0.25,
          0.5,
          0.75,
          1
        ]
      });
      return $.querySelectorAll(`[${rs}]`).forEach((j) => P.observe(j)), () => {
        P.disconnect();
      };
    }, [
      e,
      C,
      s,
      z,
      k
    ]);
  }
  const cr = rs;
  function Ql({ question: e, userAnswer: n, isSubmitted: s, isQuestionGraded: r, subjectiveGrade: o, showExplanation: a, wrongExpsForQuestion: c, wrongExpFocusOption: d, questionMemo: u, busyId: m, examInProgress: f, isFresh: h, onClearFresh: g, onAnswerCommit: x, onSelectOption: b, onEditQuestion: k, onGradeChoice: z, onGradeSubjective: C, onRetry: $, onToggleExplanation: y, onSimilar: P, onDerived: v, onGenerateSections: j, onWrongExpFocusChange: I, onOpenAnalysisDock: L, onMemoSave: B }) {
    const F = String(n ?? ""), { draft: A, handleChange: _, flush: q } = Rl(e.id, F, x), K = n !== void 0 && String(n).trim() !== "", E = s || r, { isWrong: R, isCorrect: W, gradeLabel: T } = i.useMemo(() => {
      let V = false, Z = false, ne = null;
      if (e.kind === "choice" && E && K && (Z = n === e.answer, V = !Z), e.kind === "subjective" && E && (Z = (o == null ? void 0 : o.verdict) === "correct", V = (o == null ? void 0 : o.verdict) === "wrong"), E) if (e.kind === "choice") K ? Z ? ne = "\uC815\uB2F5" : ne = "\uC624\uB2F5" : ne = "\uBBF8\uCC44\uC810";
      else {
        const Q = o == null ? void 0 : o.verdict;
        Q === "correct" ? ne = "\uC815\uB2F5" : Q === "partial" ? ne = "\uBD80\uBD84\uC815\uB2F5" : Q === "wrong" && (ne = "\uC624\uB2F5");
      }
      return {
        isWrong: V,
        isCorrect: Z,
        gradeLabel: ne
      };
    }, [
      K,
      E,
      e.answer,
      e.kind,
      o == null ? void 0 : o.verdict,
      n
    ]), le = n, He = [
      "relative rounded-2xl border bg-white p-5 pr-16 shadow-xs dark:bg-odp-surface",
      E ? W ? "border-emerald-300" : R ? "border-rose-300" : "border-slate-200 dark:border-odp-borderSoft" : "border-slate-200 dark:border-odp-borderSoft",
      e.isGenerated ? "border-purple-300 dark:border-purple-700" : "",
      h ? "ring-2 ring-purple-300/70 dark:ring-purple-500/50" : ""
    ].filter(Boolean).join(" "), st = t.jsxs(t.Fragment, {
      children: [
        t.jsxs(D, {
          type: "button",
          variant: "tertiary",
          size: "sm",
          className: "absolute top-3 right-3 z-10",
          onClick: () => k(e),
          children: [
            t.jsx(xn, {
              size: 14
            }),
            "\uC218\uC815"
          ]
        }),
        t.jsx("div", {
          className: "mb-3",
          children: t.jsxs("h3", {
            className: "text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
            children: [
              t.jsxs("span", {
                className: "mr-1.5 inline-flex items-center gap-1.5 align-middle",
                children: [
                  t.jsxs("span", {
                    children: [
                      e.displayLabel,
                      "."
                    ]
                  }),
                  T ? t.jsx("span", {
                    className: `rounded-md px-2 py-0.5 text-[10px] font-bold ${T === "\uC815\uB2F5" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" : T === "\uC624\uB2F5" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200" : T === "\uBD80\uBD84\uC815\uB2F5" ? "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200" : "bg-slate-100 text-slate-700 dark:bg-odp-bgSoft dark:text-odp-muted"}`,
                    children: T
                  }) : null
                ]
              }),
              e.kind === "subjective" ? e.answerStyle === "essay" ? "[\uC8FC\uAD00\uC2DD] " : "[\uB2E8\uB2F5\uD615] " : "",
              t.jsx("span", {
                className: "font-medium",
                children: t.jsx(_e, {
                  text: e.question,
                  previewId: `qq-${e.id}`,
                  className: "inline"
                })
              })
            ]
          })
        }),
        e.kind === "choice" ? t.jsx("div", {
          className: "space-y-2",
          children: (e.options || []).map((V, Z) => {
            const ne = Z + 1, Q = le === ne, S = E, ce = e.answer === ne;
            let fe = "border-slate-200 bg-white hover:bg-slate-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft";
            return Q && !S && (fe = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/30"), S && ce ? fe = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-950/30" : S && Q && !ce && (fe = "border-rose-400 bg-rose-50 dark:bg-rose-950/30"), t.jsxs("button", {
              type: "button",
              className: `flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm ${fe}`,
              onClick: () => b(e.id, ne),
              children: [
                t.jsx("span", {
                  className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  children: ne
                }),
                t.jsx("div", {
                  className: "min-w-0 flex-1",
                  children: t.jsx(_e, {
                    text: V,
                    previewId: `qo-${e.id}-${ne}`
                  })
                })
              ]
            }, ne);
          })
        }) : t.jsxs("div", {
          className: "space-y-2",
          children: [
            e.answerStyle === "essay" ? t.jsx("textarea", {
              className: "quiz-body-field min-h-24 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              value: A,
              disabled: E,
              onChange: (V) => _(V.target.value),
              onBlur: q,
              placeholder: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694"
            }) : t.jsx("input", {
              className: "quiz-body-field w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              value: A,
              disabled: E,
              onChange: (V) => _(V.target.value),
              onBlur: q,
              placeholder: "\uB2E8\uB2F5 \uC785\uB825"
            }),
            o ? t.jsxs("div", {
              className: `rounded-xl border p-3 text-xs ${o.verdict === "correct" ? "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : o.verdict === "partial" ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100" : "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100"}`,
              children: [
                t.jsxs("div", {
                  className: "mb-1 font-bold",
                  children: [
                    o.verdict,
                    " \xB7 ",
                    o.score,
                    "\uC810"
                  ]
                }),
                t.jsx("div", {
                  className: "[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent",
                  children: t.jsx(_e, {
                    text: o.feedback || "",
                    previewId: `qg-${e.id}`
                  })
                })
              ]
            }) : null
          ]
        }),
        t.jsxs("div", {
          className: "mt-3 flex flex-wrap items-center gap-1.5",
          children: [
            E ? t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: () => $(e),
              children: [
                t.jsx(Or, {
                  size: 14
                }),
                "\uB2E4\uC2DC\uD480\uAE30"
              ]
            }) : e.kind === "choice" ? t.jsxs(lr, {
              examInProgress: f,
              size: "sm",
              disabled: !K,
              onClick: () => z(e),
              className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700",
              children: [
                t.jsx(Rr, {
                  size: 14
                }),
                "\uCC44\uC810"
              ]
            }) : t.jsxs(lr, {
              examInProgress: f,
              size: "sm",
              disabled: m === e.id || !A.trim(),
              onClick: () => {
                q(), C(e, A);
              },
              className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700",
              children: [
                t.jsx(Qe, {
                  size: 14
                }),
                "AI \uCC44\uC810"
              ]
            }),
            t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: () => y(e.id),
              children: [
                t.jsx(ea, {
                  size: 14
                }),
                a ? "\uD574\uC124 \uC811\uAE30" : "\uD574\uC124 \uBCF4\uAE30"
              ]
            }),
            e.kind === "choice" ? t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: m === `sim-${e.id}`,
              onClick: () => P(e),
              children: [
                t.jsx(At, {
                  size: 14
                }),
                "\uC720\uC0AC\uBB38\uC81C"
              ]
            }) : null,
            t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: m === `derived-${e.id}`,
              onClick: () => v(e),
              children: [
                t.jsx(ds, {
                  size: 14
                }),
                "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"
              ]
            })
          ]
        }),
        E ? t.jsx(El, {
          question: e,
          busyKey: m,
          showContent: a,
          onGenerate: (V) => j(e, V)
        }) : null,
        E && e.kind === "choice" ? t.jsx(Il, {
          question: e,
          focusOption: d,
          onFocusOptionChange: (V) => I(e.id, V),
          wrongExps: c,
          busyKey: m,
          onOpenAnalysisDock: (V, Z) => L(e.id, V, Z)
        }) : null,
        t.jsx(Al, {
          questionId: e.id,
          value: u,
          onSave: (V) => B(e.id, V)
        })
      ]
    });
    return h ? t.jsx(We.div, {
      id: `q-card-${e.id}`,
      [cr]: e.id,
      initial: {
        opacity: 0,
        y: 36,
        scale: 0.96
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1
      },
      transition: {
        type: "spring",
        stiffness: 340,
        damping: 26
      },
      onAnimationComplete: g,
      className: He,
      children: st
    }) : t.jsx("div", {
      id: `q-card-${e.id}`,
      [cr]: e.id,
      className: He,
      children: st
    });
  }
  const Tl = i.memo(Ql), _l = 12;
  function Dl(e, n, s, r, o, a) {
    var _a2;
    const c = s[e.id] !== void 0 && String(s[e.id]).trim() !== "", d = !!(a || r[e.id]);
    if (n === "unanswered" && c) return false;
    if (n !== "wrong") return true;
    let u = false;
    return e.kind === "choice" && d && c && (u = s[e.id] !== e.answer), e.kind === "subjective" && d && (u = ((_a2 = o[e.id]) == null ? void 0 : _a2.verdict) === "wrong"), d && u;
  }
  function dr(e, n, s) {
    const r = document.getElementById(`q-card-${n}`);
    if (!r) return false;
    if (!e) return r.scrollIntoView({
      behavior: s,
      block: "start"
    }), true;
    const o = e.getBoundingClientRect(), a = r.getBoundingClientRect(), c = e.scrollTop + (a.top - o.top) - _l;
    return e.scrollTo({
      top: Math.max(0, c),
      behavior: s
    }), true;
  }
  const Fl = i.memo(i.forwardRef(function({ questions: n, filter: s, scrollRef: r, userAnswers: o, graded: a, subjGrades: c, isSubmitted: d, expVisible: u, wrongExpsByQuestion: m, questionMemos: f, freshQuestionIds: h, busyId: g, examInProgress: x, resolveWrongExpFocusOption: b, onAnswerCommit: k, onSelectOption: z, onEditQuestion: C, onGradeChoice: $, onGradeSubjective: y, onRetry: P, onToggleExplanation: v, onSimilar: j, onDerived: I, onGenerateSections: L, onWrongExpFocusChange: B, onOpenAnalysisDock: F, onMemoSave: A, onClearFresh: _ }, q) {
    const K = i.useMemo(() => n.filter((R) => Dl(R, s, o, a, c, d)), [
      s,
      a,
      d,
      n,
      c,
      o
    ]), E = i.useCallback((R) => {
      if (!K.some((le) => le.id === R)) return false;
      const T = r.current;
      return dr(T, R, "smooth") || requestAnimationFrame(() => {
        dr(T, R, "smooth");
      }), true;
    }, [
      r,
      K
    ]);
    return i.useImperativeHandle(q, () => ({
      scrollToQuestionId: E
    }), [
      E
    ]), K.length === 0 ? null : t.jsx("div", {
      className: "space-y-4",
      children: K.map((R) => {
        const W = o[R.id], T = !!(d || a[R.id]);
        return t.jsx(Tl, {
          question: R,
          userAnswer: o[R.id],
          isSubmitted: d,
          isQuestionGraded: T,
          subjectiveGrade: c[R.id],
          showExplanation: !!u[R.id],
          wrongExpsForQuestion: m[R.id] ?? {},
          wrongExpFocusOption: b(R, typeof W == "number" ? W : void 0),
          questionMemo: f[R.id] || "",
          busyId: g,
          examInProgress: x,
          isFresh: !!h[R.id],
          onClearFresh: () => _(R.id),
          onAnswerCommit: k,
          onSelectOption: z,
          onEditQuestion: C,
          onGradeChoice: $,
          onGradeSubjective: y,
          onRetry: P,
          onToggleExplanation: v,
          onSimilar: j,
          onDerived: I,
          onGenerateSections: L,
          onWrongExpFocusChange: B,
          onOpenAnalysisDock: F,
          onMemoSave: A
        }, R.id);
      })
    });
  })), ql = 320, Bl = Ot;
  function Ul(e, n) {
    if (n === "followup") return "\uCD94\uAC00 \uC9C8\uBB38";
    const s = e ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D";
    return n === "regenerate" ? `${s} \uC7AC\uC0DD\uC131` : s;
  }
  function Gl({ open: e, question: n, option: s, mode: r, existingAnalysis: o = "", llmProfiles: a, profileId: c, model: d, onProfileIdChange: u, onModelChange: m, busy: f, onClose: h, onGenerate: g }) {
    const [x, b] = i.useState(""), { width: k, handleProps: z, isResizing: C } = ut({
      storageKey: "quiz-choice-analysis-dock-width",
      defaultWidth: ql,
      minWidth: 260,
      maxWidth: 560,
      edge: "right"
    }), $ = n != null && s != null && s === n.answer, y = Ul($, r), P = $ ? "border-emerald-200 dark:border-emerald-900/60" : "border-rose-200 dark:border-rose-900/60", v = $ ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40", j = $ ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100", I = r === "followup", L = I, B = !f && (!L || x.trim().length > 0);
    i.useEffect(() => {
      e && b("");
    }, [
      e,
      n == null ? void 0 : n.id,
      s,
      r
    ]);
    const F = i.useCallback((_) => {
      f || L && !x.trim() || _.key !== "Enter" || !_.metaKey && !_.ctrlKey || (_.preventDefault(), g(x));
    }, [
      f,
      g,
      x,
      L
    ]), A = e && n != null && s != null;
    return t.jsx(Lt, {
      motionKey: "quiz-choice-analysis-dock",
      open: A,
      width: k,
      isResizing: C,
      "aria-label": y,
      className: `flex h-full shrink-0 flex-col overflow-hidden border-l bg-white shadow-lg dark:bg-odp-surface ${P}`,
      children: n != null && s != null ? t.jsxs("div", {
        className: "relative h-full min-h-0",
        style: {
          width: k
        },
        children: [
          t.jsx(Bl, {
            edge: "left",
            handleProps: z,
            isResizing: C,
            visibleOnHover: true,
            label: "\uBD84\uC11D \uD328\uB110 \uB108\uBE44 \uC870\uC808"
          }),
          t.jsxs("div", {
            className: "flex h-full min-h-0 flex-col",
            children: [
              t.jsxs("div", {
                className: `flex items-center justify-between border-b px-3 py-2.5 ${P}`,
                children: [
                  t.jsx("div", {
                    className: "min-w-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                    children: y
                  }),
                  t.jsx("button", {
                    type: "button",
                    "aria-label": "\uBD84\uC11D \uD328\uB110 \uB2EB\uAE30",
                    className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg",
                    onClick: h,
                    disabled: f,
                    children: t.jsx(qe, {
                      size: 16
                    })
                  })
                ]
              }),
              t.jsxs("div", {
                className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3",
                children: [
                  t.jsxs("div", {
                    className: `rounded-lg px-2.5 py-2 text-[11px] ${v} ${j}`,
                    children: [
                      t.jsxs("div", {
                        className: "font-semibold",
                        children: [
                          n.displayLabel,
                          "\uBC88 \xB7 ",
                          s,
                          "\uBC88 \uBCF4\uAE30",
                          $ ? " (\uC815\uB2F5)" : ""
                        ]
                      }),
                      t.jsx("p", {
                        className: "mt-1 line-clamp-3 opacity-90",
                        children: n.question
                      })
                    ]
                  }),
                  I && o.trim() ? t.jsxs("div", {
                    className: "rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[10px] text-slate-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted",
                    children: [
                      t.jsx("div", {
                        className: "mb-1 font-semibold text-slate-700 dark:text-odp-fgStrong",
                        children: "\uAE30\uC874 \uBD84\uC11D"
                      }),
                      t.jsx("p", {
                        className: "line-clamp-6 whitespace-pre-wrap",
                        children: o.trim()
                      })
                    ]
                  }) : null,
                  t.jsx(Tr, {
                    profiles: a,
                    profileId: c,
                    model: d,
                    onProfileIdChange: u,
                    onModelChange: m,
                    disabled: f,
                    autoLoadModels: false
                  }),
                  t.jsxs("label", {
                    className: "block space-y-1.5",
                    children: [
                      t.jsxs("span", {
                        className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong",
                        children: [
                          I ? "\uCD94\uAC00 \uC9C8\uBB38" : "\uAD81\uAE08\uD55C \uC810",
                          t.jsx("span", {
                            className: "ml-1 font-normal text-slate-500 dark:text-odp-muted",
                            children: I ? "(\uD544\uC218)" : "(\uC120\uD0DD)"
                          })
                        ]
                      }),
                      t.jsx("textarea", {
                        className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                        placeholder: I ? "\uC608: \uC9C0\uB2C8 \uC9C0\uC218\uC640 \uC5D4\uD2B8\uB85C\uD53C\uC758 \uC218\uC2DD\uC801 \uCC28\uC774\uAC00 \uBB54\uAC00\uC694?" : $ ? "\uBE44\uC6CC \uB450\uBA74 \uC815\uB2F5/\uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: \uC65C \uC774 \uBCF4\uAE30\uAC00 \uC815\uB2F5\uC778\uC9C0\u2026" : "\uBE44\uC6CC \uB450\uBA74 \uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: 2\uBC88\uACFC 3\uBC88\uC758 \uCC28\uC774\u2026",
                        value: x,
                        disabled: f,
                        onChange: (_) => b(_.target.value),
                        onKeyDown: F
                      }),
                      t.jsxs("p", {
                        className: "text-[10px] text-slate-500 dark:text-odp-muted",
                        children: [
                          I ? "\uAE30\uC874 \uBD84\uC11D\uACFC \uBB38\uC81C \uB0B4\uC6A9\uC744 \uBC14\uD0D5\uC73C\uB85C \uB2F5\uBCC0\uD569\uB2C8\uB2E4." : "\uBE44\uC6CC \uB450\uACE0 \uC0DD\uC131\uD558\uBA74 \uAE30\uBCF8 \uD504\uB86C\uD504\uD2B8\uB85C \uC124\uBA85\uD569\uB2C8\uB2E4.",
                          " ",
                          t.jsx("kbd", {
                            className: "rounded border border-slate-300 bg-slate-100 px-1 py-px font-mono text-[9px] dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                            children: "\u2318/Ctrl+Enter"
                          }),
                          "\uB85C \uBC14\uB85C \uC0DD\uC131\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                        ]
                      })
                    ]
                  })
                ]
              }),
              t.jsxs("div", {
                className: `flex gap-2 border-t p-3 ${P}`,
                children: [
                  t.jsx(D, {
                    type: "button",
                    variant: "secondary",
                    size: "sm",
                    className: "flex-1",
                    disabled: f,
                    onClick: h,
                    children: "\uCDE8\uC18C"
                  }),
                  t.jsxs(D, {
                    type: "button",
                    variant: "primary",
                    size: "sm",
                    className: "flex-1",
                    disabled: !B,
                    onClick: () => g(x),
                    children: [
                      t.jsx(Qe, {
                        size: 14
                      }),
                      f ? "\uC0DD\uC131 \uC911\u2026" : I ? "\uB2F5\uBCC0 \uC0DD\uC131" : "\uC0DD\uC131"
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }) : null
    });
  }
  const Wl = i.memo(Gl);
  function Jl({ disabled: e = false, onGenerate: n }) {
    const [s, r] = i.useState("");
    return t.jsxs("div", {
      className: "space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft",
      children: [
        t.jsx("label", {
          htmlFor: "quiz-source-generate-topic",
          className: "block text-xs font-semibold text-slate-700 dark:text-odp-fgStrong",
          children: "\uADFC\uAC70\uB85C \uBB38\uC81C \uC0DD\uC131"
        }),
        t.jsx("input", {
          id: "quiz-source-generate-topic",
          className: "w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
          placeholder: "\uC8FC\uC81C (\uC120\uD0DD)",
          value: s,
          onChange: (o) => r(o.target.value)
        }),
        t.jsxs(D, {
          type: "button",
          variant: "secondary",
          size: "sm",
          className: "w-full",
          disabled: e,
          onClick: () => {
            n(s);
          },
          children: [
            t.jsx(Qe, {
              size: 14
            }),
            "\uADFC\uAC70\uB85C \uBB38\uC81C \uCD94\uAC00"
          ]
        })
      ]
    });
  }
  const Hl = i.memo(Jl);
  function Kl(e, n) {
    var _a2;
    if (!(n.isSubmitted || !!n.gradedQuestions[e.id])) return false;
    if (e.kind === "choice") {
      const r = n.userAnswers[e.id];
      return r != null && String(r).trim() !== "" && r !== e.answer;
    }
    return ((_a2 = n.subjectiveGrades[e.id]) == null ? void 0 : _a2.verdict) === "wrong";
  }
  function Vl(e) {
    return e.questions.filter((n) => Kl(n, e));
  }
  function Xl(e) {
    return e.map((n, s) => {
      const r = String(s + 1);
      return {
        ...n,
        id: r,
        displayLabel: r
      };
    });
  }
  function Zl(e, n) {
    const s = Vl({
      questions: e.questions,
      userAnswers: n.userAnswers,
      gradedQuestions: n.gradedQuestions,
      isSubmitted: n.isSubmitted,
      subjectiveGrades: n.subjectiveGrades
    });
    if (!s.length) return null;
    const r = Xl(s), o = is({
      ...e.config,
      sourcePaths: [
        ...e.config.sourcePaths
      ]
    });
    return {
      markdown: jr(o, r, Xn),
      questions: r,
      config: o
    };
  }
  function Yl(e) {
    return e.toLowerCase().endsWith(Zn) ? e.slice(0, -Zn.length) : e.replace(/\.md$/i, "");
  }
  function ur(e, n) {
    const s = String(e || "").trim().replace(/\\/g, "/"), r = s.lastIndexOf("/"), o = r >= 0 ? s.slice(0, r + 1) : "", a = Yl(fi(s)), c = n != null && n > 1 ? `-\uD2C0\uB9B0\uBB38\uC81C-${n}` : "-\uD2C0\uB9B0\uBB38\uC81C";
    return `${o}${a}${c}${Zn}`;
  }
  async function ec(e, n) {
    const s = ur(e);
    if (!await n(s)) return s;
    for (let r = 2; r < 100; r += 1) {
      const o = ur(e, r);
      if (!await n(o)) return o;
    }
    throw new Error("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uD034\uC988 \uD30C\uC77C \uC774\uB984\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  }
  function mn(e) {
    return e != null && String(e).trim() !== "";
  }
  function qn(e) {
    const n = {};
    for (const s of e.questions) {
      const r = mn(e.userAnswers[s.id]);
      (e.isSubmitted && s.kind === "choice" ? true : !!e.gradedQuestions[s.id]) ? n[s.id] = true : r && (n[s.id] = false);
    }
    return It({
      userAnswers: e.userAnswers,
      gradedQuestions: n,
      subjectiveGrades: e.subjectiveGrades,
      isSubmitted: e.isSubmitted,
      ...e.timeLog ? {
        timeLog: e.timeLog
      } : {},
      ...e.wrongChoiceExplanations ? {
        wrongChoiceExplanations: e.wrongChoiceExplanations
      } : {},
      ...e.questionMemos ? {
        questionMemos: e.questionMemos
      } : {}
    });
  }
  function mr(e, n) {
    const s = It(e ?? Xn), r = It(n ?? Xn);
    return JSON.stringify(s) === JSON.stringify(r);
  }
  function tc(e) {
    return e != null && !os(e);
  }
  const nc = 320, Zr = "s3haim_quiz_source_remove_confirm", sc = Ot, rc = (e) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400",
    e ? "border-violet-500 bg-violet-500 shadow-sm dark:border-violet-500 dark:bg-violet-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), oc = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Yr() {
    try {
      return localStorage.getItem(Zr) === "true";
    } catch {
      return false;
    }
  }
  function ic(e) {
    try {
      localStorage.setItem(Zr, String(e));
    } catch {
    }
  }
  function ac({ open: e, docConfig: n, sourcePathUsage: s, busyGenSources: r, onClose: o, onPreview: a, onRemove: c, onToggleEnabled: d, onOpenPicker: u, onGenerateFromTopic: m, onDropHostChange: f }) {
    const [h, g] = i.useState(Yr), { width: x, handleProps: b, isResizing: k } = ut({
      storageKey: "quiz-sources-dock-width",
      defaultWidth: nc,
      minWidth: 240,
      maxWidth: 520,
      edge: "right"
    }), z = i.useCallback((C) => {
      g(C), ic(C);
    }, []);
    return t.jsx(Lt, {
      motionKey: "quiz-sources-dock",
      open: e,
      width: x,
      isResizing: k,
      "aria-label": "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C",
      className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
      children: t.jsxs("div", {
        className: "relative flex h-full min-h-0 flex-col",
        style: {
          width: x
        },
        children: [
          t.jsx(sc, {
            edge: "left",
            handleProps: b,
            isResizing: k,
            visibleOnHover: true,
            label: "\uD30C\uC77C \uADFC\uAC70 \uD328\uB110 \uB108\uBE44 \uC870\uC808"
          }),
          t.jsxs("div", {
            className: "border-b border-slate-200 dark:border-odp-borderSoft",
            children: [
              t.jsxs("div", {
                className: "flex items-center justify-between px-3 py-2.5",
                children: [
                  t.jsxs("div", {
                    className: "flex min-w-0 items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                    children: [
                      t.jsx(Lr, {
                        size: 16,
                        className: "shrink-0 text-violet-600 dark:text-violet-400"
                      }),
                      t.jsx("span", {
                        className: "truncate",
                        children: "\uD30C\uC77C \uADFC\uAC70"
                      }),
                      s.total > 0 ? t.jsxs("span", {
                        className: "ml-0.5 inline-flex shrink-0 items-baseline gap-0.5 rounded-md bg-violet-100 px-1.5 py-0.5 text-[11px] font-bold tabular-nums dark:bg-violet-950/70",
                        "aria-label": `\uB4F1\uB85D ${s.total}\uAC1C \uC911 ${s.active}\uAC1C \uC0AC\uC6A9 \uC911`,
                        children: [
                          t.jsx("span", {
                            className: "text-violet-600 dark:text-violet-400",
                            children: s.active
                          }),
                          t.jsx("span", {
                            className: "font-medium text-slate-400",
                            children: "/"
                          }),
                          t.jsx("span", {
                            className: "text-slate-700 dark:text-slate-200",
                            children: s.total
                          }),
                          t.jsx("span", {
                            className: "ml-0.5 text-[9px] font-semibold text-violet-700 dark:text-violet-300",
                            children: "\uC0AC\uC6A9"
                          })
                        ]
                      }) : null
                    ]
                  }),
                  t.jsx("button", {
                    type: "button",
                    "aria-label": "\uADFC\uAC70 \uD328\uB110 \uB2EB\uAE30",
                    className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg",
                    onClick: o,
                    children: t.jsx(qe, {
                      size: 16
                    })
                  })
                ]
              }),
              t.jsxs("div", {
                className: "flex items-center justify-between gap-3 px-3 pb-2.5",
                children: [
                  t.jsx("label", {
                    htmlFor: "quiz-source-remove-confirm",
                    className: "text-[11px] font-medium text-slate-600 dark:text-odp-muted",
                    children: "\uC0AD\uC81C \uC2DC \uD655\uC778"
                  }),
                  t.jsx(ma, {
                    id: "quiz-source-remove-confirm",
                    className: rc(h),
                    checked: h,
                    onCheckedChange: z,
                    "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uC0AD\uC81C \uC2DC \uD655\uC778",
                    children: t.jsx(fa, {
                      className: oc
                    })
                  })
                ]
              })
            ]
          }),
          t.jsxs("div", {
            ref: f,
            className: "relative min-h-0 flex-1 space-y-4 overflow-y-auto p-3",
            children: [
              t.jsx(Br, {
                layout: "dock",
                paths: n.sourcePaths,
                label: "\uC120\uD0DD\uB41C \uBB38\uC11C",
                onPreview: a,
                onRemove: c,
                isPathEnabled: (C) => pi(n, C),
                onToggleEnabled: d,
                onOpenPicker: u
              }),
              t.jsx(Hl, {
                disabled: r,
                onGenerate: m
              })
            ]
          })
        ]
      })
    });
  }
  const lc = i.memo(ac), Bn = "h-full min-h-[240px] w-full resize-none border-0 bg-transparent p-3 font-mono text-xs text-slate-800 outline-none dark:text-odp-fgStrong";
  function cc(e) {
    return xi(e);
  }
  function dc({ payload: e, editMode: n, editContent: s, onEditContentChange: r }) {
    const o = e.currentFile.viewer, a = i.useMemo(() => `vault-preview-${e.currentFile.id.replace(/[^\w-]+/g, "-")}`, [
      e.currentFile.id
    ]);
    return e.needsEncMdPassword ? t.jsx("div", {
      className: "p-4 text-sm text-slate-600 dark:text-odp-muted",
      children: "\uC554\uD638\uD654\uB41C \uB178\uD2B8\uC785\uB2C8\uB2E4. \uBBF8\uB9AC\uBCF4\uAE30\uB97C \uBCF4\uB824\uBA74 \u300C\uC774 \uBB38\uC11C \uC5F4\uAE30\u300D\uB85C \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uC554\uD638\uB97C \uC785\uB825\uD558\uC138\uC694."
    }) : o === "image" && e.currentFile.objectUrl ? t.jsx("div", {
      className: "flex min-h-0 flex-1 items-center justify-center overflow-auto p-3",
      children: t.jsx("img", {
        src: e.currentFile.objectUrl,
        alt: e.currentFile.name,
        className: "max-h-full max-w-full object-contain"
      })
    }) : o === "pdf" && e.currentFile.objectUrl ? t.jsx("iframe", {
      title: e.currentFile.name,
      src: e.currentFile.objectUrl,
      className: "h-full min-h-[240px] w-full border-0"
    }) : o === "audio" && e.currentFile.objectUrl ? t.jsx("div", {
      className: "p-4",
      children: t.jsx("audio", {
        controls: true,
        className: "w-full",
        src: e.currentFile.objectUrl,
        children: "\uC624\uB514\uC624\uB97C \uC7AC\uC0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
      })
    }) : o === "video" && e.currentFile.objectUrl ? t.jsx("div", {
      className: "p-2",
      children: t.jsx("video", {
        controls: true,
        className: "max-h-full w-full",
        src: e.currentFile.objectUrl,
        children: "\uB3D9\uC601\uC0C1\uC744 \uC7AC\uC0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
      })
    }) : o === "markdown" ? n ? t.jsx("textarea", {
      className: Bn,
      value: s,
      onChange: (c) => r(c.target.value),
      spellCheck: false
    }) : t.jsx("div", {
      className: "markdown-content p-3",
      children: t.jsx(_e, {
        text: s,
        previewId: a
      })
    }) : o === "html" || o === "svg" ? n ? t.jsx("textarea", {
      className: Bn,
      value: s,
      onChange: (c) => r(c.target.value),
      spellCheck: false
    }) : t.jsx("iframe", {
      title: e.currentFile.name,
      srcDoc: s,
      sandbox: "",
      className: "h-full min-h-[240px] w-full border-0 bg-white"
    }) : n ? t.jsx("textarea", {
      className: Bn,
      value: s,
      onChange: (c) => r(c.target.value),
      spellCheck: false
    }) : t.jsx("pre", {
      className: "overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-slate-800 dark:text-odp-fgStrong",
      children: s
    });
  }
  const uc = Ot, Ct = "z-100001 max-w-[min(92vw,420px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function mc({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o, embedded: a = false, width: c, resizeHandleProps: d, isResizing: u, resizeEdge: m = "right" }) {
    const [f, h] = i.useState(null), [g, x] = i.useState(true), [b, k] = i.useState(""), [z, C] = i.useState(false), [$, y] = i.useState(""), P = ut({
      storageKey: a ? void 0 : "vault-document-preview-panel-width",
      defaultWidth: 400,
      minWidth: 280,
      maxWidth: 640,
      edge: m === "left" ? "left" : "right"
    }), v = c ?? P.width, j = d ?? P.handleProps, I = u ?? P.isResizing;
    i.useEffect(() => {
      let A = false, _;
      return x(true), k(""), C(false), (async () => {
        var _a2;
        try {
          const q = await s(e);
          if (A) {
            (_a2 = q == null ? void 0 : q.revoke) == null ? void 0 : _a2.call(q);
            return;
          }
          _ = q == null ? void 0 : q.revoke, h(q), y((q == null ? void 0 : q.content) ?? ""), q || k("\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        } catch (q) {
          A || (h(null), y(""), k(q instanceof Error ? q.message : "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          A || x(false);
        }
      })(), () => {
        A = true, _ == null ? void 0 : _();
      };
    }, [
      e,
      s
    ]);
    const L = i.useCallback(() => {
      C((A) => !A);
    }, []), B = us(e), F = f ? cc(f.currentFile.viewer) : false;
    return t.jsxs("aside", {
      className: `relative flex h-full flex-col overflow-hidden bg-white dark:bg-odp-surface ${a ? "min-w-0" : "shrink-0 border-r border-slate-200 dark:border-odp-borderSoft"}`,
      style: a ? void 0 : {
        width: v
      },
      "aria-label": "\uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30",
      children: [
        t.jsx(uc, {
          edge: m,
          handleProps: j,
          isResizing: I,
          visibleOnHover: true,
          label: "\uBBF8\uB9AC\uBCF4\uAE30 \uD328\uB110 \uB108\uBE44 \uC870\uC808"
        }),
        t.jsx("div", {
          className: "flex items-center gap-1 border-b border-slate-200 px-2 py-2 dark:border-odp-borderSoft",
          children: t.jsxs(Mt, {
            delayDuration: 250,
            skipDelayDuration: 0,
            children: [
              t.jsxs(ze, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("div", {
                      className: "min-w-0 flex-1 truncate px-1 text-xs font-semibold text-slate-800 dark:text-odp-fgStrong",
                      children: B
                    })
                  }),
                  t.jsx(Ae, {
                    children: t.jsxs(Me, {
                      side: "bottom",
                      sideOffset: 6,
                      className: Ct,
                      children: [
                        e,
                        t.jsx(Re, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }),
              F ? t.jsxs(ze, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC",
                      onClick: L,
                      children: z ? t.jsx(ta, {
                        size: 15
                      }) : t.jsx(xn, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Ae, {
                    children: t.jsxs(Me, {
                      side: "bottom",
                      sideOffset: 6,
                      className: Ct,
                      children: [
                        z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC",
                        t.jsx(Re, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              o ? t.jsxs(ze, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": "\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30",
                      onClick: () => o(e),
                      children: t.jsx(na, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Ae, {
                    children: t.jsxs(Me, {
                      side: "bottom",
                      sideOffset: 6,
                      className: Ct,
                      children: [
                        "\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30",
                        t.jsx(Re, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              r ? t.jsxs(ze, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": "\uC774 \uBB38\uC11C \uC5F4\uAE30",
                      onClick: () => r(e),
                      children: t.jsx(sa, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Ae, {
                    children: t.jsxs(Me, {
                      side: "bottom",
                      sideOffset: 6,
                      className: Ct,
                      children: [
                        "\uC774 \uBB38\uC11C \uC5F4\uAE30",
                        t.jsx(Re, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              t.jsxs(ze, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 \uB2EB\uAE30",
                      onClick: n,
                      children: t.jsx(qe, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Ae, {
                    children: t.jsxs(Me, {
                      side: "bottom",
                      sideOffset: 6,
                      className: Ct,
                      children: [
                        "\uB2EB\uAE30",
                        t.jsx(Re, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              })
            ]
          })
        }),
        t.jsx("div", {
          className: "min-h-0 flex-1 overflow-y-auto",
          children: g ? t.jsxs("div", {
            className: "flex h-full items-center justify-center gap-2 p-6 text-xs text-slate-500 dark:text-odp-muted",
            children: [
              t.jsx(pn, {
                size: 16,
                className: "animate-spin",
                "aria-hidden": true
              }),
              "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            ]
          }) : b ? t.jsx("div", {
            className: "p-4 text-sm text-rose-600 dark:text-rose-400",
            children: b
          }) : f ? t.jsx(dc, {
            payload: f,
            editMode: z,
            editContent: $,
            onEditContentChange: y
          }) : null
        })
      ]
    });
  }
  const fc = 400;
  function pc({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o }) {
    const { width: a, handleProps: c, isResizing: d } = ut({
      storageKey: "quiz-source-preview-dock-width",
      defaultWidth: fc,
      minWidth: 280,
      maxWidth: 640,
      edge: "left"
    });
    return t.jsx(Lt, {
      motionKey: "quiz-source-preview-dock",
      open: e != null,
      width: a,
      isResizing: d,
      "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30",
      className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
      children: e ? t.jsx("div", {
        className: "relative h-full min-h-0",
        style: {
          width: a
        },
        children: t.jsx(mc, {
          embedded: true,
          path: e,
          width: a,
          resizeHandleProps: c,
          isResizing: d,
          resizeEdge: "left",
          onClose: n,
          loadDocument: s,
          onOpenDocument: r,
          onOpenInNewTab: o
        })
      }) : null
    });
  }
  const xc = i.memo(pc), fr = {
    correct: "bg-emerald-500",
    partial: "bg-amber-500",
    wrong: "bg-rose-500",
    ungraded: "bg-slate-400 dark:bg-slate-500"
  }, pr = {
    correct: "\uC815\uB2F5",
    partial: "\uBD80\uBD84",
    wrong: "\uC624\uB2F5",
    ungraded: "\uBBF8\uCC44\uC810"
  };
  function hc(e) {
    return e ? typeof e.score == "number" && Number.isFinite(e.score) ? Math.min(100, Math.max(0, e.score)) / 100 : e.verdict === "correct" ? 1 : e.verdict === "partial" ? 0.5 : 0 : null;
  }
  function gc(e) {
    var _a2;
    const { question: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e, c = o || r[n.id], d = mn(s[n.id]);
    if (!c) return d ? "ungraded" : null;
    if (n.kind === "choice") return d ? s[n.id] === n.answer ? "correct" : "wrong" : null;
    const u = (_a2 = a[n.id]) == null ? void 0 : _a2.verdict;
    return u === "correct" ? "correct" : u === "partial" ? "partial" : u === "wrong" ? "wrong" : null;
  }
  function bc(e) {
    const { questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e;
    let c = 0, d = 0, u = 0, m = 0, f = 0, h = 0;
    for (const b of n) {
      const k = s[b.id] !== void 0 && s[b.id] !== null && String(s[b.id]).trim() !== "";
      if (k && (m += 1), !(o || r[b.id])) continue;
      if (b.kind === "choice") {
        h += 1, s[b.id] === b.answer ? (c += 1, f += 1) : k && (d += 1);
        continue;
      }
      const C = a[b.id], $ = hc(C);
      $ != null && (h += 1, f += $, (C == null ? void 0 : C.verdict) === "correct" ? c += 1 : (C == null ? void 0 : C.verdict) === "partial" ? u += 1 : d += 1);
    }
    const g = n.length, x = g > 0 && h > 0 ? Math.round(f / g * 100) : null;
    return {
      correct: c,
      wrong: d,
      partial: u,
      answered: m,
      total: g,
      scorePercent: x
    };
  }
  const kc = 288, wc = Ot, yc = [
    "ungraded",
    "correct",
    "partial",
    "wrong"
  ], vc = {
    ungraded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-600",
    correct: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800",
    partial: "bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800",
    wrong: "bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800"
  }, jc = "bg-slate-100 text-slate-400 ring-1 ring-transparent dark:bg-odp-bgSoft dark:text-odp-muted";
  function Sc({ open: e, questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a, onClose: c, onNavigate: d }) {
    const [u, m] = i.useState({
      ungraded: true,
      correct: true,
      partial: true,
      wrong: true
    }), { width: f, handleProps: h, isResizing: g } = ut({
      storageKey: "quiz-toc-dock-width",
      defaultWidth: kc,
      minWidth: 220,
      maxWidth: 480,
      edge: "right"
    }), x = i.useCallback((k) => {
      m((z) => ({
        ...z,
        [k]: !z[k]
      }));
    }, []), b = Fr();
    return t.jsx(Lt, {
      motionKey: "quiz-toc-dock",
      open: e,
      width: f,
      isResizing: g,
      "aria-label": "\uBB38\uC81C \uBAA9\uCC28",
      className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
      children: t.jsxs("div", {
        className: "relative flex h-full min-h-0 flex-col",
        style: {
          width: f
        },
        children: [
          t.jsx(wc, {
            edge: "left",
            handleProps: h,
            isResizing: g,
            visibleOnHover: true,
            label: "\uBAA9\uCC28 \uD328\uB110 \uB108\uBE44 \uC870\uC808"
          }),
          t.jsxs("div", {
            className: "border-b border-slate-200 dark:border-odp-borderSoft",
            children: [
              t.jsxs("div", {
                className: "flex items-center justify-between px-3 py-2.5",
                children: [
                  t.jsxs("div", {
                    className: "flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                    children: [
                      t.jsx(Qr, {
                        size: 16,
                        className: "text-slate-600 dark:text-odp-muted"
                      }),
                      "\uBB38\uC81C \uBAA9\uCC28"
                    ]
                  }),
                  t.jsx("button", {
                    type: "button",
                    "aria-label": "\uBAA9\uCC28 \uD328\uB110 \uB2EB\uAE30",
                    className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg",
                    onClick: c,
                    children: t.jsx(qe, {
                      size: 16
                    })
                  })
                ]
              }),
              t.jsx("div", {
                className: "flex flex-wrap items-center gap-1 px-3 pb-2.5",
                children: yc.map((k) => {
                  const z = u[k];
                  return t.jsxs("button", {
                    type: "button",
                    "aria-pressed": z,
                    "aria-label": `\uBAA9\uCC28 ${pr[k]} ${z ? "\uD45C\uC2DC" : "\uC228\uAE40"}`,
                    className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${z ? vc[k] : jc}`,
                    onClick: () => x(k),
                    children: [
                      t.jsx("span", {
                        className: `h-2 w-2 shrink-0 rounded-full ${z ? fr[k] : "bg-slate-300 dark:bg-slate-600"}`,
                        "aria-hidden": true
                      }),
                      pr[k]
                    ]
                  }, k);
                })
              })
            ]
          }),
          t.jsx("ul", {
            className: "min-h-0 flex-1 space-y-1 overflow-y-auto p-3 text-xs",
            children: n.map((k, z) => {
              var _a2, _b;
              const C = !!k.similarOf, $ = /-파생\d+$/u.test(String(k.displayLabel || "")) ? "\uD30C\uC0DD\uBB38\uC81C" : "\uC720\uC0AC\uBB38\uC81C", y = gc({
                question: k,
                userAnswers: s,
                gradedQuestions: r,
                isSubmitted: o,
                subjectiveGrades: a
              });
              if (y && !u[y]) return null;
              const P = t.jsxs("button", {
                type: "button",
                className: `flex w-full items-center gap-2 rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${C ? "ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200" : "px-2"}`,
                title: C ? `${((_a2 = k.similarOf) == null ? void 0 : _a2.displayLabel) || ((_b = k.similarOf) == null ? void 0 : _b.id)}\uC758 ${$}` : void 0,
                onClick: () => d(k.id),
                children: [
                  t.jsx("span", {
                    className: "flex h-4 w-2 shrink-0 items-center justify-center",
                    "aria-hidden": true,
                    children: y ? t.jsx("span", {
                      className: `h-2 w-2 rounded-full ${fr[y]}`
                    }) : null
                  }),
                  t.jsxs("span", {
                    className: "min-w-0 truncate",
                    children: [
                      C ? t.jsx("span", {
                        className: "mr-1 text-violet-400 dark:text-violet-500",
                        children: "\u21B3"
                      }) : null,
                      k.displayLabel,
                      ". ",
                      k.question.slice(0, 40)
                    ]
                  })
                ]
              }), v = za(z, b);
              return t.jsx(We.li, {
                initial: v.initial,
                animate: v.animate,
                transition: v.transition,
                children: P
              }, k.id);
            })
          })
        ]
      })
    });
  }
  const Cc = i.memo(Sc);
  async function eo(e, n) {
    const s = [];
    for (const r of e) {
      const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
      if (o) try {
        const a = await n(o);
        typeof a == "string" && a.length > 0 && s.push({
          path: o,
          text: a
        });
      } catch {
      }
    }
    return s;
  }
  function to(e) {
    const n = [], s = /* @__PURE__ */ new Set();
    for (const r of e) {
      const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
      !o || s.has(o) || (s.add(o), n.push(o));
    }
    return n;
  }
  function Nc(e) {
    return String(e || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).map((n) => n.trim()).filter((n) => n.length >= 2).slice(0, 16);
  }
  function $c(e, n) {
    if (n.length === 0) return 1;
    const s = e.toLowerCase();
    let r = 0;
    for (const o of n) s.includes(o) && (r += 1);
    return r;
  }
  async function hn(e) {
    const n = Ne(), s = e.topK ?? n.ragTopK, r = e.maxChars ?? n.ragMaxChars, o = to(e.sourcePaths);
    if (o.length === 0) return {
      chunks: [],
      usedFallback: false
    };
    const a = await eo(o, e.readText);
    if (a.length === 0) return {
      chunks: [],
      usedFallback: true
    };
    const c = Nc(e.query), d = [];
    for (const f of a) hi(f.text, 12e3).forEach((g, x) => {
      g.trim() && d.push({
        path: f.path,
        excerpt: g,
        chunkIndex: x,
        score: $c(g, c)
      });
    });
    d.sort((f, h) => (h.score || 0) - (f.score || 0));
    const u = [];
    let m = 0;
    for (const f of d) {
      if (u.length >= s) break;
      if (m + f.excerpt.length > r) {
        const h = r - m;
        if (h < 200) break;
        u.push({
          ...f,
          excerpt: f.excerpt.slice(0, h)
        });
        break;
      }
      u.push(f), m += f.excerpt.length;
    }
    return {
      chunks: u,
      usedFallback: true
    };
  }
  function gn(e) {
    return e.length ? e.map((n) => `---
[${n.path}]
${n.excerpt}
`).join(`
`) : "";
  }
  async function Ec(e, n, s) {
    const r = Ne(), o = Math.max(4e3, s ?? Math.min(r.ragMaxChars, 2e5)), a = to(e);
    return a.length ? (await eo(a, n)).map((d) => ({
      path: d.path,
      text: d.text.length > o ? `${d.text.slice(0, o)}

\u2026(truncated)` : d.text
    })) : [];
  }
  function Pc(e) {
    return e.kind === "subjective" ? e.answerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`;
  }
  function zc(e) {
    return `${Kr(e)}

[\uD30C\uC0DD\uBB38\uD56D \uC0DD\uC131 \u2014 \uCD94\uAC00 \uADDC\uCE59]
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 \uD559\uC2B5 \uBAA9\uD45C\xB7\uD575\uC2EC \uAC1C\uB150\uC744 \uC720\uC9C0\uD558\uB418, \uC9C0\uC815\uB41C **\uCD9C\uC81C \uC720\uD615**\uC5D0 \uB9DE\uB294 \uC0C8 \uBB38\uD56D\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uAC1D\uAD00\uC2DD \u2194 \uC8FC\uAD00\uC2DD \uBCC0\uD658\uC774 \uC694\uCCAD\uB418\uBA74, \uB3D9\uC77C \uAC1C\uB150\uC744 \uD574\uB2F9 \uC720\uD615\uC5D0 \uB9DE\uAC8C \uC7AC\uAD6C\uC131\uD558\uC138\uC694.
- \uC0AC\uC6A9\uC790 \uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBC18\uB4DC\uC2DC \uBC18\uC601\uD558\uC138\uC694.`;
  }
  function Ic(e) {
    var _a2;
    const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim(), r = String(e.target.userPrompt || "").trim(), o = Pc(e.target), a = e.sourceKind === "subjective" ? e.sourceAnswerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.options.length || e.target.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`, c = e.sourceKind === "choice" && e.options.length > 0 ? `\uBCF4\uAE30: ${e.options.map((m, f) => `${f + 1}. ${m}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
` : "";
    let d;
    if (e.target.kind === "subjective") d = `{"kind":"subjective","answerStyle":"${e.target.answerStyle === "essay" ? "essay" : "short"}","question":"...","modelAnswer":"...","point":"...","explanation":"..."}`;
    else {
      const m = e.target.choiceCount, f = e.targetAnswer ?? 1;
      d = `{"kind":"choice","question":"...","options":[${Array.from({
        length: m
      }, () => '"..."').join(",")}],"answer":${f},"point":"...","explanation":"..."}`;
    }
    const u = e.target.kind === "choice" && e.targetAnswer != null ? `\uC774\uBC88 \uC2E0\uADDC \uBB38\uC81C\uC758 \uC815\uB2F5 \uBC88\uD638\uB294 \uBC18\uB4DC\uC2DC ${e.targetAnswer}\uBC88\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.
` : "";
    return `${n ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${n}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C \u2014 ${a}]
\uC9C8\uBB38: ${e.question}
${c}\uC811\uADFC Point: ${e.point || ""}
${s ? `\uD574\uC124: ${s}
` : ""}
${e.analysisBlock}

${e.sampledBlock}

${e.complexity}

[\uD30C\uC0DD \uBB38\uD56D \uC694\uAD6C\uC0AC\uD56D]
- \uCD9C\uC81C \uC720\uD615: ${o}
${r ? `- \uC0AC\uC6A9\uC790 \uC694\uAD6C\uC0AC\uD56D:
${r}
` : ""}
\uC6D0\uBCF8\uACFC \uB2E4\uB978 \uC218\uCE58\xB7\uC0AC\uB840\xB7\uD45C\uD604\uC744 \uC0AC\uC6A9\uD558\uB418, \uB3D9\uC77C\uD55C \uD575\uC2EC \uD559\uC2B5 \uBAA9\uD45C\uB97C \uAC80\uC99D\uD558\uB294 \uD30C\uC0DD \uBB38\uD56D\uC744 \uC791\uC131\uD558\uC138\uC694.
${u}
[\uD544\uC218 \u2014 point / explanation]
- JSON\uC758 point\uC640 explanation\uC744 \uBC18\uB4DC\uC2DC \uD568\uAED8 \uCC44\uC6B0\uC138\uC694.
- point: \uC2E0\uADDC \uBB38\uD56D\uC758 \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5).
- explanation: \uC815\uB2F5 \uADFC\uAC70\uC640 \uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124.
- options \uAC01 \uD56D\uBAA9\uC5D0\uB294 1., a. \uAC19\uC740 \uBC88\uD638\xB7\uAE30\uD638 \uC811\uB450\uC0AC \uC5C6\uC774 \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694.

JSON\uB9CC \uBC18\uD658:
${d}`;
  }
  function Ac(e, n) {
    const s = String(n || "").trim().replace(/-(?:유사|파생)\d+$/u, "") || "1", r = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = new RegExp(`^${r}-\uD30C\uC0DD(\\d+)$`);
    let a = 0;
    for (const c of e) {
      const d = String(c.displayLabel || "").match(o);
      (d == null ? void 0 : d[1]) && (a = Math.max(a, Number.parseInt(d[1], 10)));
    }
    return `${s}-\uD30C\uC0DD${a + 1}`;
  }
  const xr = ".quiz", Mc = 96e3;
  function no(e) {
    return String(e || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
  }
  function Rc(e) {
    const s = no(e).replace(/\.quiz\.md$/i, "");
    return s ? `${xr}/${s}` : xr;
  }
  function Oc(e) {
    return String(e || "").trim().replace(/[^a-zA-Z0-9._-]+/g, "_") || "log";
  }
  function Lc(e, n) {
    return `${Rc(e)}/${Oc(n)}.md`;
  }
  function oe(e, n = Mc) {
    const s = String(e || "");
    return s.length <= n ? s : `${s.slice(0, n)}

\u2026 (${s.length - n} characters truncated)`;
  }
  function Un(e, n) {
    const s = oe(n);
    return s.trim() ? `### ${e}

\`\`\`text
${s.replace(/```/g, "`\u200B``")}
\`\`\`
` : "";
  }
  function Qc(e, n) {
    const s = `- status: ${e.status}`, r = e.detail ? `- detail: ${e.detail}` : "", o = e.error ? `- error: ${e.error}` : "", a = [
      `## Step ${n + 1}: ${e.label} (${e.id})`,
      "",
      s,
      r,
      o,
      ""
    ];
    return e.systemPrompt && a.push(Un("System prompt", e.systemPrompt)), e.llmInstruction && a.push(Un("Instruction / input", e.llmInstruction)), e.llmResponse && a.push(Un("Model response / artifact", e.llmResponse)), a.filter(Boolean).join(`
`);
  }
  function Tc(e, n) {
    const s = [
      "# Quiz generation log",
      "",
      `- quiz file: ${no(n)}`,
      `- job id: ${e.id}`,
      `- kind: ${e.kind}`,
      ...e.questionLabel ? [
        `- source label: ${e.questionLabel}`
      ] : [],
      ...e.resultLabel ? [
        `- result label: ${e.resultLabel}`
      ] : [],
      ...e.resultQuestionId ? [
        `- result question id: ${e.resultQuestionId}`
      ] : [],
      `- job status: ${e.status}`,
      `- created at: ${new Date(e.createdAt).toISOString()}`,
      ...e.error ? [
        `- job error: ${e.error}`
      ] : [],
      "",
      "## Question preview",
      "",
      oe(e.questionPreview, 4e3),
      "",
      "---",
      ""
    ];
    return e.steps.forEach((r, o) => {
      s.push(Qc(r, o)), s.push("---", "");
    }), `${s.join(`
`).trimEnd()}
`;
  }
  async function _c(e) {
    const n = Lc(e.quizFilePath, e.logKey), s = Tc(e.job, e.quizFilePath);
    return await e.writeText(n, s), n;
  }
  const Dc = /^\d+\.\s*[a-zA-Z]\.\s*/, Fc = /^(?:\(\s*\d+\s*\)|\d+\)|\d+\.)\s*/, qc = /^[a-zA-Z](?:\)|\.)\s*/, Bc = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫]\s*/u, Uc = /^[가나다라마바사아자차카타파하](?:\)|\.)\s*/u;
  function Gc(e) {
    let n = String(e || "").trim();
    if (!n) return n;
    for (let s = 0; s < 4; s += 1) {
      const r = n;
      if (n = n.replace(Dc, "").replace(Fc, "").replace(qc, "").replace(Bc, "").replace(Uc, "").trim(), n === r) break;
    }
    return n;
  }
  const nn = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC6A9 \uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uAC00\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uAC1C\uB150\xB7\uC815\uC758\xB7\uACF5\uC2DD\xB7\uC808\uCC28\xB7\uC0AC\uB840\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC815\uB9AC\uD558\uC138\uC694.
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC0AC\uC2E4\uC744 \uB9CC\uB4E4\uC9C0 \uB9C8\uC138\uC694.
- \uC218\uC2DD\uC740 \uC6D0\uBB38 \uD45C\uAE30\uB97C \uC720\uC9C0\uD558\uC138\uC694 ($...$ / $$...$$).
- \uC751\uB2F5\uC740 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694. JSON\xB7\uCF54\uB4DC\uD39C\uC2A4\xB7\uC11C\uB450\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
  function Wc(e, n, s) {
    return e === "subjective" ? `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC704\uC6D0\uC785\uB2C8\uB2E4. \uC81C\uACF5\uB41C \uADFC\uAC70 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC6A9\uD574 \uBB38\uD56D\uC744 \uB9CC\uB4DC\uB2C8\uB2E4.
\uC694\uC57D\uBCF8 \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.
\uC2A4\uD0A4\uB9C8:
[{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}]
\uC815\uD655\uD788 ${s}\uAC1C \uBB38\uD56D\uC744 \uBC18\uD658\uD558\uC138\uC694.` : `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC704\uC6D0\uC785\uB2C8\uB2E4. \uC81C\uACF5\uB41C \uADFC\uAC70 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC6A9\uD574 \uAC1D\uAD00\uC2DD \uBB38\uD56D\uC744 \uB9CC\uB4ED\uB2C8\uB2E4.
\uC694\uC57D\uBCF8 \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.
\uC120\uD0DD\uC9C0(options) \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
options \uAC01 \uD56D\uBAA9\uC5D0\uB294 \uBCF4\uAE30 \uBC88\uD638 \uC811\uB450\uC0AC(1., 2., a., \uAC00. \uB4F1)\uB97C \uB123\uC9C0 \uB9C8\uC138\uC694. \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD569\uB2C8\uB2E4.
\uC751\uB2F5\uC740 JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.
\uC2A4\uD0A4\uB9C8:
[{"question":"...","options":[${Array.from({
      length: n
    }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}]
- options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${n}
- answer\uB294 1~${n} \uC815\uC218
\uC815\uD655\uD788 ${s}\uAC1C \uBB38\uD56D\uC744 \uBC18\uD658\uD558\uC138\uC694.`;
  }
  function Jc(e) {
    return e.length ? e.slice(0, 8).map((n, s) => {
      const r = `${s + 1}. [${n.kind}${n.answerStyle ? `/${n.answerStyle}` : ""}] ${n.question}`;
      if (n.kind === "choice") {
        const o = (n.options || []).map((a, c) => `   ${c + 1}. ${a}${n.answer === c + 1 ? " (\uC815\uB2F5)" : ""}`).join(`
`);
        return `${r}
${o}
   Point: ${n.point || ""}`;
      }
      return `${r}
   \uBAA8\uBC94\uB2F5\uC548: ${n.modelAnswer || ""}
   Point: ${n.point || ""}`;
    }).join(`

`) : "(\uC81C\uC2DC \uBB38\uD56D \uC5C6\uC74C \u2014 \uBB38\uC11C\uC758 \uD575\uC2EC \uAC1C\uB150 \uC911\uC2EC\uC73C\uB85C \uC694\uC57D)";
  }
  async function Hc(e, n) {
    var _a2, _b, _c2;
    const s = Ne(), r = Array.isArray(e) ? e : [], o = lt(r, ((_a2 = n == null ? void 0 : n.profileId) == null ? void 0 : _a2.trim()) || s.profileId || ls());
    if (!o) return {
      ready: false,
      message: "AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
    };
    const a = (((_b = n == null ? void 0 : n.model) == null ? void 0 : _b.trim()) || ((_c2 = s.modelId) == null ? void 0 : _c2.trim()) || cs(o.id, o.kind)).trim();
    if (o.kind === Sr) {
      const c = Cr(), d = await Nr(c);
      if (!d.running) return {
        ready: false,
        message: "MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
      };
      const u = a || c.selectedModelId || d.models[0] || "";
      return u ? {
        ready: true,
        profile: o,
        model: u
      } : {
        ready: false,
        message: "\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."
      };
    }
    if (o.kind === $r) {
      const c = Er();
      let d = [];
      try {
        const m = await gi(c);
        if (d = Array.isArray(m.models) ? m.models : [], !m.running && !c.selectedModelId && !a) return {
          ready: false,
          message: "llama.cpp \uBAA8\uB378\uC774 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
        };
      } catch {
        if (!c.selectedModelId && !a) return {
          ready: false,
          message: "llama.cpp \uBAA8\uB378\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."
        };
      }
      const u = a || c.selectedModelId || d[0] || "";
      return u ? {
        ready: true,
        profile: o,
        model: u
      } : {
        ready: false,
        message: "\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."
      };
    }
    return o.kind === Yn || o.kind === nt ? Pr(o) ? o.kind === nt && !(o.apiKey || "").trim() ? {
      ready: false,
      message: "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
    } : a ? o.kind === nt && zr(a) ? {
      ready: false,
      message: "EXAONE Tabular\uB294 \uD034\uC988 \uC0DD\uC131\uC5D0 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. K-EXAONE \uCC44\uD305 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694."
    } : {
      ready: true,
      profile: o,
      model: a
    } : {
      ready: false,
      message: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
    } : {
      ready: false,
      message: o.kind === nt ? "EXAONE Endpoint\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC81C\uACF5\uC790\uB97C \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694." : "OpenAI \uD638\uD658 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uB610\uB294 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\uB97C \uD655\uC778\uD558\uC138\uC694."
    } : a ? ((o.apiKey || "").trim(), {
      ready: true,
      profile: o,
      model: a
    }) : {
      ready: false,
      message: "Gemini \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
    };
  }
  function Kc(e) {
    const n = String(e || "");
    return /제공자|프로필|모델을 선택|모델이 로드|모델이 준비|API 키|Endpoint URL|AI 도우미에서/i.test(n);
  }
  function De(e) {
    const n = String(e || "").trim();
    if (!n) throw new Error("\uBE48 LLM \uC751\uB2F5");
    try {
      return JSON.parse(n);
    } catch {
      const s = n.indexOf("{"), r = n.lastIndexOf("}");
      if (s >= 0 && r > s) return JSON.parse(n.slice(s, r + 1));
      const o = n.indexOf("["), a = n.lastIndexOf("]");
      if (o >= 0 && a > o) return JSON.parse(n.slice(o, a + 1));
      throw new Error("JSON \uD30C\uC2F1 \uC2E4\uD328");
    }
  }
  function Vc(e) {
    const n = e && typeof e == "object" ? e : {}, s = String(n.verdict || "wrong"), r = s === "correct" || s === "partial" ? s : "wrong", o = Math.min(100, Math.max(0, Number(n.score) || (r === "correct" ? 100 : r === "partial" ? 50 : 0))), a = String(n.feedback || "").trim() || "\uCC44\uC810 \uD53C\uB4DC\uBC31\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", c = String(n.rationale || "").trim();
    return c ? {
      verdict: r,
      score: o,
      feedback: a,
      rationale: c
    } : {
      verdict: r,
      score: o,
      feedback: a
    };
  }
  function sn(e, n) {
    const s = {
      ...e
    };
    return n.signal && (s.signal = n.signal), n.onChunk && (s.onChunk = n.onChunk), s;
  }
  async function ve(e) {
    var _a2, _b, _c2;
    const n = Ne(), s = Array.isArray(e.profiles) ? e.profiles : [], r = lt(s, ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) || n.profileId || ls());
    if (!r) throw new Error("AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
    const o = (((_b = e.model) == null ? void 0 : _b.trim()) || ((_c2 = n.modelId) == null ? void 0 : _c2.trim()) || cs(r.id, r.kind)).trim(), a = (e.systemPrompt || n.systemPrompt || "").trim(), c = e.instruction.trim(), d = {
      temperature: typeof e.temperature == "number" ? e.temperature : n.temperature
    }, u = {};
    if (e.signal && (u.signal = e.signal), e.onChunk && (u.onChunk = e.onChunk), r.kind === Yn || r.kind === nt) {
      if (r.kind === nt && zr(o)) throw new Error("EXAONE Tabular\uB294 \uD034\uC988 \uC0DD\uC131\uC5D0 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. K-EXAONE \uCC44\uD305 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      const m = Pr(r);
      if (!m) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return $t(r.id, o), bi(o), Qn(r.id, () => r.apiKey || "", (f) => tr(sn({
        baseUrl: m,
        apiKey: f,
        model: o,
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, u)), {
        allowEmpty: r.kind === Yn,
        missingKeyMessage: r.kind === nt ? "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." : "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
      });
    }
    if (r.kind === $r) {
      const m = Er(), f = await ki(m, e.signal ? {
        signal: e.signal
      } : {}), h = (r.baseUrl || f.baseUrl || "").trim();
      if (!h) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const g = o.trim() || m.selectedModelId || f.models[0] || "";
      if (!g) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return $t(r.id, g), Qn(r.id, () => r.apiKey || m.apiKey || "no-key-required", (x) => tr(sn({
        baseUrl: h,
        apiKey: x,
        model: g,
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, u)), {
        allowEmpty: true,
        missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      });
    }
    if (r.kind === Sr) {
      const m = Cr(), f = await Nr(m);
      if (!f.running) throw new Error("MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
      const h = o.trim() || m.selectedModelId || f.models[0] || "";
      if (!h) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return $t(r.id, h), va(sn({
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, u));
    }
    if (wa(o)) throw new Error("\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return $t(r.id, o), wi(o), Qn(r.id, () => r.apiKey || "", (m) => ya(sn({
      apiKey: m,
      model: o,
      instruction: c,
      systemPrompt: a,
      selectedText: "",
      requestOptions: d
    }, u)), {
      missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
    });
  }
  function Rt(e, n, s) {
    const r = e && typeof e == "object" ? e : {};
    if ((r.kind === "subjective" ? "subjective" : (Array.isArray(r.options), "choice")) === "subjective") return {
      kind: "subjective",
      answerStyle: r.answerStyle === "essay" ? "essay" : "short",
      question: String(r.question || "").trim(),
      modelAnswer: String(r.modelAnswer || r.answer || "").trim(),
      point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."),
      explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.")
    };
    const a = Array.isArray(r.options) ? r.options.map((d) => Gc(String(d || ""))).slice(0, n) : [];
    for (; a.length < Math.min(2, n); ) a.push("");
    const c = Number.parseInt(String(r.answer ?? s), 10) || s;
    return {
      kind: "choice",
      question: String(r.question || "").trim(),
      options: a,
      answer: Math.min(n, Math.max(1, c)),
      point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."),
      explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."),
      isGenerated: true
    };
  }
  function je(e, n, s, r, o) {
    var _a2, _b;
    const a = {
      profiles: e,
      instruction: n,
      systemPrompt: s,
      temperature: r
    };
    return (o == null ? void 0 : o.signal) && (a.signal = o.signal), (o == null ? void 0 : o.onChunk) && (a.onChunk = o.onChunk), ((_a2 = o == null ? void 0 : o.profileId) == null ? void 0 : _a2.trim()) && (a.profileId = o.profileId.trim()), ((_b = o == null ? void 0 : o.model) == null ? void 0 : _b.trim()) && (a.model = o.model.trim()), a;
  }
  function Fe(e) {
    return e ? {
      signal: e
    } : void 0;
  }
  function ms(e) {
    var _a2, _b;
    const n = {};
    return e.signal && (n.signal = e.signal), e.onChunk && (n.onChunk = e.onChunk), ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) && (n.profileId = e.profileId.trim()), ((_b = e.model) == null ? void 0 : _b.trim()) && (n.model = e.model.trim()), n.signal || n.onChunk || n.profileId || n.model ? n : void 0;
  }
  async function hr(e) {
    const n = Ne(), s = e.question, o = `\uB2E4\uC74C ${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"} \uC8FC\uAD00\uC2DD \uBB38\uD56D\uC758 \uC218\uD5D8\uC790 \uB2F5\uC548\uC744 \uCC44\uC810\uD558\uC138\uC694.

[\uBB38\uC81C]
${s.question}

[\uBAA8\uBC94 \uB2F5\uC548 / \uC815\uB2F5]
${s.modelAnswer || ""}

[\uC811\uADFC Point]
${s.point || ""}

[\uD574\uC124]
${s.explanation || ""}

[\uC218\uD5D8\uC790 \uB2F5\uC548]
${e.userAnswer}

\uCC44\uC810 \uADDC\uCE59:
- \uB2E8\uB2F5\uD615: \uB3D9\uC758\uC5B4\xB7\uD45C\uAE30 \uCC28\uC774(\uB300\uC18C\uBB38\uC790, \uACF5\uBC31, \uB2E8\uC704)\uB97C \uC778\uC815\uD558\uC138\uC694.
- \uC11C\uC220\uD615: \uBAA8\uBC94 \uB2F5\uC548\uACFC \uC811\uADFC Point\uC758 \uD575\uC2EC\uC774 \uD3EC\uD568\uB418\uBA74 partial \uC774\uC0C1\uC744 \uC8FC\uC138\uC694.
- score\uB294 0~100 (correct\u226590, partial 40~89, wrong<40).

JSON\uB9CC \uBC18\uD658:
{"verdict":"correct"|"partial"|"wrong","score":0,"feedback":"...","rationale":"..."}`, a = await ve(je(e.profiles, o, "\uB2F9\uC2E0\uC740 \uACF5\uC815\uD55C \uC2DC\uD5D8 \uCC44\uC810\uC704\uC6D0\uC785\uB2C8\uB2E4. JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.", n.gradeTemperature, Fe(e.signal)));
    return Vc(De(a));
  }
  async function Xc(e) {
    var _a2;
    const n = e.question, s = n.options || [], r = e.selectedOption, o = r === n.answer, a = ((_a2 = e.userInstructions) == null ? void 0 : _a2.trim()) ? `
[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userInstructions.trim()}
\uC704 \uC9C8\uBB38\uC5D0\uB3C4 \uB2F5\uBCC0\uD558\uC138\uC694.` : "", d = `${o ? `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88(\uC815\uB2F5)\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC815\uB2F5\uC778\uC9C0, \uB2E4\uB978 \uBCF4\uAE30\uAC00 \uC65C \uD2C0\uB838\uB294\uC9C0 \uC124\uBA85\uD558\uC138\uC694.` : `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC624\uB2F5\uC778\uC9C0 \uC124\uBA85\uD558\uC138\uC694.`}

[\uBB38\uC81C] ${n.question}
[\uBCF4\uAE30]
${s.map((u, m) => `${m + 1}. ${u}`).join(`
`)}
[\uC815\uB2F5] ${n.answer}\uBC88
[\uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${s[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${n.explanation || ""}
${a}

\uC124\uBA85 \uD14D\uC2A4\uD2B8\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
    return ve(je(e.profiles, d, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uC791\uC131\uC790\uC785\uB2C8\uB2E4.", 0.5, ms({
      signal: e.signal,
      onChunk: e.onChunk,
      profileId: e.profileId,
      model: e.model
    })));
  }
  async function Zc(e) {
    const n = e.question, s = n.options || [], r = e.selectedOption, o = `\uC218\uD5D8\uC790\uAC00 \uAC1D\uAD00\uC2DD \uBB38\uC81C \uD480\uC774 \uD6C4 \uC544\uB798 \uBD84\uC11D \uB0B4\uC6A9\uC744 \uC77D\uACE0 \uCD94\uAC00 \uC9C8\uBB38\uC744 \uD588\uC2B5\uB2C8\uB2E4. \uBB38\uC81C, \uBCF4\uAE30, \uAE30\uC874 \uBD84\uC11D\uB9CC \uADFC\uAC70\uB85C \uCD94\uAC00 \uC9C8\uBB38\uC5D0 \uB2F5\uD558\uC138\uC694.

[\uBB38\uC81C]
${n.question}

[\uBCF4\uAE30]
${s.map((a, c) => `${c + 1}. ${a}`).join(`
`)}

[\uC815\uB2F5] ${n.answer}\uBC88
[\uC218\uD5D8\uC790\uAC00 \uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${s[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${n.explanation || ""}

[\uAE30\uC874 \uC624\uB2F5/\uC815\uB2F5 \uBD84\uC11D]
${e.existingAnalysis.trim()}

[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userQuestion.trim()}

\uC751\uB2F5 \uD615\uC2DD (\uBC18\uB4DC\uC2DC \uC900\uC218):
- \uCCAB \uC904\uC740 \uBC18\uB4DC\uC2DC **[\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0: {\uC9C8\uBB38 \uC694\uC57D}]** \uD615\uC2DD (\uB9C8\uD06C\uB2E4\uC6B4 \uBCFC\uB4DC, \uD55C \uC904)
- \uC9C8\uBB38 \uC694\uC57D\uC740 \uC218\uD5D8\uC790 \uC9C8\uBB38\uC758 \uD575\uC2EC\uC744 \uC9E7\uAC8C \uC694\uC57D (\uC608: \uC9C0\uB2C8 \uC9C0\uC218\uC640 \uC5D4\uD2B8\uB85C\uD53C\uC758 \uC218\uC2DD\uC801 \uCC28\uC774)
- \uADF8 \uB2E4\uC74C \uC904\uBD80\uD130 \uB2F5\uBCC0 \uBCF8\uBB38 (\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uB2A5)
- \uC11C\uB450 \uC124\uBA85\uC774\uB098 JSON\uC740 \uB123\uC9C0 \uB9C8\uC138\uC694.`;
    return ve(je(e.profiles, o, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uD29C\uD130\uC785\uB2C8\uB2E4. \uBB38\uC81C\uC640 \uAE30\uC874 \uBD84\uC11D \uB0B4\uC6A9\uB9CC \uADFC\uAC70\uB85C \uB2F5\uD558\uC138\uC694.", 0.5, ms({
      signal: e.signal,
      onChunk: e.onChunk,
      profileId: e.profileId,
      model: e.model
    })));
  }
  async function Yc(e) {
    const n = Ne(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = Math.floor(Math.random() * r) + 1, a = (s.options || []).map((j) => String(j || "")), c = s.answer && s.answer >= 1 ? s.answer : 1, d = (j) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, j);
    };
    let u = "";
    const m = e.sourcePaths || [];
    if (m.length > 0 && e.readText) {
      d({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const { chunks: j } = await hn({
        sourcePaths: m,
        query: `${s.question}
${s.point || ""}`,
        readText: e.readText
      });
      u = gn(j), d({
        step: "rag",
        status: "done",
        detail: j.length > 0 ? `${j.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C",
        llmInstruction: `query: ${s.question}`,
        llmResponse: oe(u || "(no excerpts)")
      });
    }
    const f = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", h = Vr({
      question: s.question,
      options: a,
      answer: c,
      point: s.point || "",
      explanation: s.explanation || "",
      ...u ? {
        ragBlock: u
      } : {}
    }), g = Math.min(n.temperature, 0.6);
    d({
      step: "analysis",
      status: "running",
      detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026",
      llmInstruction: h,
      systemPrompt: ct
    });
    const x = await ve(je(e.profiles, h, ct, g, Fe(e.signal))), b = Wr(De(x));
    d({
      step: "analysis",
      status: "done",
      detail: `${b.coreCategory}${b.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`,
      llmInstruction: h,
      llmResponse: oe(x),
      systemPrompt: ct
    });
    const k = dt(b);
    let z = "";
    if (b.isCalculation && b.variables.length > 0) {
      d({
        step: "randomize",
        status: "running",
        detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026"
      });
      const j = Jr(b.variables);
      z = Hr(j);
      const I = j.map((L) => `${L.id}=${L.value}${L.unit ? L.unit : ""}`).join(", ");
      d({
        step: "randomize",
        status: "done",
        detail: I,
        llmInstruction: dt(b),
        llmResponse: oe(JSON.stringify({
          samples: j,
          variables: b.variables
        }, null, 2))
      });
    } else d({
      step: "randomize",
      status: "skipped",
      detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D",
      llmResponse: oe(dt(b))
    });
    const C = Nl({
      question: s.question,
      options: a,
      answer: c,
      point: s.point || "",
      explanation: s.explanation || "",
      choiceCount: r,
      targetAnswer: o,
      complexity: f,
      analysisBlock: k,
      sampledBlock: z,
      ...u ? {
        ragBlock: u
      } : {}
    }), $ = Kr(n.systemPrompt || Ir);
    d({
      step: "generate",
      status: "running",
      detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: C,
      systemPrompt: $
    });
    const y = await ve(je(e.profiles, C, $, n.temperature, Fe(e.signal))), P = De(y);
    d({
      step: "generate",
      status: "done",
      detail: `\uC815\uB2F5 ${o}\uBC88`,
      llmInstruction: C,
      llmResponse: oe(y),
      systemPrompt: $
    });
    let v = Rt(P, r, o);
    if (!un(v)) {
      const j = mt(v.point), I = ft(v.explanation), L = Xr({
        question: v.question,
        options: v.options || [],
        answer: v.answer || o,
        analysisBlock: k,
        missingPoint: j,
        missingExplanation: I
      });
      d({
        step: "generate",
        status: "running",
        detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026",
        llmInstruction: L,
        systemPrompt: $
      });
      const B = await ve(je(e.profiles, L, $, Math.min(n.temperature, 0.8), Fe(e.signal))), F = De(B), A = F && typeof F == "object" ? F : {};
      j && typeof A.point == "string" && A.point.trim() && (v = {
        ...v,
        point: String(A.point).trim()
      }), I && typeof A.explanation == "string" && A.explanation.trim() && (v = {
        ...v,
        explanation: String(A.explanation).trim()
      }), d({
        step: "generate",
        status: "done",
        detail: un(v) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644",
        llmInstruction: L,
        llmResponse: oe(B),
        systemPrompt: $
      });
    }
    return {
      ...v,
      isGenerated: true
    };
  }
  async function ed(e) {
    const n = Ne(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = e.target.kind === "choice" ? Je(e.target.choiceCount) : r, a = e.target.kind === "choice" ? Math.floor(Math.random() * o) + 1 : 1, c = (s.options || []).map((I) => String(I || "")), d = s.answer && s.answer >= 1 ? s.answer : 1, u = (I) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, I);
    };
    let m = "";
    const f = e.sourcePaths || [];
    if (f.length > 0 && e.readText) {
      u({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const I = [
        s.question,
        s.point || "",
        e.target.userPrompt || ""
      ].filter(Boolean).join(`
`), { chunks: L } = await hn({
        sourcePaths: f,
        query: I,
        readText: e.readText
      });
      m = gn(L), u({
        step: "rag",
        status: "done",
        detail: L.length > 0 ? `${L.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C",
        llmInstruction: `query: ${I}`,
        llmResponse: oe(m || "(no excerpts)")
      });
    }
    const h = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", g = Vr({
      question: s.question,
      options: c,
      answer: s.kind === "choice" ? d : 1,
      point: s.point || "",
      explanation: s.explanation || "",
      ...m ? {
        ragBlock: m
      } : {}
    }), x = Math.min(n.temperature, 0.6);
    u({
      step: "analysis",
      status: "running",
      detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026",
      llmInstruction: g,
      systemPrompt: ct
    });
    const b = await ve(je(e.profiles, g, ct, x, Fe(e.signal))), k = Wr(De(b));
    u({
      step: "analysis",
      status: "done",
      detail: `${k.coreCategory}${k.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`,
      llmInstruction: g,
      llmResponse: oe(b),
      systemPrompt: ct
    });
    const z = dt(k);
    let C = "";
    if (k.isCalculation && k.variables.length > 0) {
      u({
        step: "randomize",
        status: "running",
        detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026"
      });
      const I = Jr(k.variables);
      C = Hr(I);
      const L = I.map((B) => `${B.id}=${B.value}${B.unit ? B.unit : ""}`).join(", ");
      u({
        step: "randomize",
        status: "done",
        detail: L,
        llmInstruction: dt(k),
        llmResponse: oe(JSON.stringify({
          samples: I,
          variables: k.variables
        }, null, 2))
      });
    } else u({
      step: "randomize",
      status: "skipped",
      detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D",
      llmResponse: oe(dt(k))
    });
    const $ = Ic({
      question: s.question,
      options: c,
      answer: s.kind === "choice" ? d : 1,
      point: s.point || "",
      explanation: s.explanation || "",
      sourceKind: s.kind,
      ...s.answerStyle ? {
        sourceAnswerStyle: s.answerStyle
      } : {},
      target: e.target,
      complexity: h,
      analysisBlock: z,
      sampledBlock: C,
      ...e.target.kind === "choice" ? {
        targetAnswer: a
      } : {},
      ...m ? {
        ragBlock: m
      } : {}
    }), y = zc(n.systemPrompt || Ir);
    u({
      step: "generate",
      status: "running",
      detail: "\uD30C\uC0DD \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: $,
      systemPrompt: y
    });
    const P = await ve(je(e.profiles, $, y, n.temperature, Fe(e.signal))), v = De(P);
    u({
      step: "generate",
      status: "done",
      detail: e.target.kind === "choice" ? `\uC815\uB2F5 ${a}\uBC88 \xB7 ${o}\uC9C0\uC120\uB2E4` : e.target.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615",
      llmInstruction: $,
      llmResponse: oe(P),
      systemPrompt: y
    });
    let j = Rt(v, o, a);
    if (e.target.kind === "subjective" ? j = {
      kind: "subjective",
      answerStyle: e.target.answerStyle === "essay" ? "essay" : "short",
      question: j.question,
      modelAnswer: j.modelAnswer || "",
      point: j.point,
      explanation: j.explanation,
      isGenerated: true
    } : j = {
      kind: "choice",
      question: j.question,
      options: Ye(j.options || [], o),
      answer: Math.min(o, Math.max(1, j.answer || a)),
      point: j.point,
      explanation: j.explanation,
      isGenerated: true
    }, !un(j)) {
      const I = mt(j.point), L = ft(j.explanation), B = Xr({
        question: j.question,
        options: j.kind === "choice" ? j.options || [] : [],
        answer: j.kind === "choice" && j.answer ? j.answer : a,
        analysisBlock: z,
        missingPoint: I,
        missingExplanation: L
      });
      u({
        step: "generate",
        status: "running",
        detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026",
        llmInstruction: B,
        systemPrompt: y
      });
      const F = await ve(je(e.profiles, B, y, Math.min(n.temperature, 0.8), Fe(e.signal))), A = De(F), _ = A && typeof A == "object" ? A : {};
      I && typeof _.point == "string" && _.point.trim() && (j = {
        ...j,
        point: String(_.point).trim()
      }), L && typeof _.explanation == "string" && _.explanation.trim() && (j = {
        ...j,
        explanation: String(_.explanation).trim()
      }), u({
        step: "generate",
        status: "done",
        detail: un(j) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644",
        llmInstruction: B,
        llmResponse: oe(F),
        systemPrompt: y
      });
    }
    return {
      ...j,
      isGenerated: true
    };
  }
  const td = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124\xB7\uC811\uADFC Point \uC791\uC131\uC790\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uBB38\uD56D\uB9CC \uADFC\uAC70\uB85C \uC811\uADFC Point\uC640 \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uC811\uADFC Point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C. \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- \uD574\uC124: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- placeholder \uBB38\uAD6C\uB098 \uBE48 \uBB38\uC790\uC5F4\uB85C \uCC44\uC6B0\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 \uC694\uCCAD\uB41C JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
  async function nd(e) {
    var _a2;
    const n = Ne(), s = e.question;
    if (!e.missingPoint && !e.missingExplanation) return {};
    let r = "";
    const o = e.sourcePaths || [];
    if (o.length > 0 && e.readText) {
      const f = [
        s.question,
        s.point || "",
        s.explanation || ""
      ].filter(Boolean).join(`
`), { chunks: h } = await hn({
        sourcePaths: o,
        query: f,
        readText: e.readText
      });
      r = gn(h);
    }
    const a = $l({
      question: s,
      missingPoint: e.missingPoint,
      missingExplanation: e.missingExplanation,
      ...r ? {
        ragBlock: r
      } : {}
    }), c = await ve(je(e.profiles, a, ((_a2 = n.systemPrompt) == null ? void 0 : _a2.trim()) || td, Math.min(n.temperature, 0.8), ms({
      signal: e.signal,
      profileId: e.profileId,
      model: e.model
    }))), d = De(c), u = d && typeof d == "object" && !Array.isArray(d) ? d : {}, m = {};
    return e.missingPoint && typeof u.point == "string" && u.point.trim() && !mt(u.point) && (m.point = String(u.point).trim()), e.missingExplanation && typeof u.explanation == "string" && u.explanation.trim() && !ft(u.explanation) && (m.explanation = String(u.explanation).trim()), m;
  }
  async function sd(e) {
    var _a2, _b, _c2, _d;
    const n = Ne(), s = Array.isArray(e.exampleQuestions) ? e.exampleQuestions : [], r = [
      ...s
    ].reverse().find((y) => y.kind === "choice"), o = r ? Te(r, e.config.choiceCount || 4) : e.config.choiceCount || 4, a = Math.min(5, Math.max(1, e.count || 1)), c = e.kind || "choice", d = (e.topic || "").trim(), u = (y) => {
      var _a3;
      return (_a3 = e.onStep) == null ? void 0 : _a3.call(e, y);
    };
    u({
      step: "load_sources",
      status: "running",
      detail: "\uBB38\uC11C \uC77D\uAE30 \uC911\u2026"
    }), (_a2 = e.onProgress) == null ? void 0 : _a2.call(e, "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC \uC911\u2026");
    const m = await Ec(e.sourcePaths, e.readText, n.ragMaxChars);
    if (!m.length) throw u({
      step: "load_sources",
      status: "error",
      error: "\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
    }), new Error("\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    u({
      step: "load_sources",
      status: "done",
      detail: `${m.length}\uAC1C \uBB38\uC11C`,
      llmResponse: oe(m.map((y) => `- ${y.path} (${y.text.length.toLocaleString()} chars)`).join(`
`))
    });
    const f = Jc(s), h = [];
    let g = "";
    for (let y = 0; y < m.length; y += 1) {
      const P = m[y];
      if (!P) continue;
      if ((_b = e.signal) == null ? void 0 : _b.aborted) throw new DOMException("Aborted", "AbortError");
      const v = `\uBB38\uC11C \uC694\uC57D ${y + 1}/${m.length}: ${P.path}`, j = `[\uCD9C\uC81C \uCC38\uACE0 \uBB38\uD56D \uC608\uC2DC]
\uC81C\uC2DC\uB41C \uBB38\uD56D \uC2A4\uD0C0\uC77C\xB7\uAC1C\uB150 \uBC94\uC704\uB97C \uCC38\uACE0\uD574, \uC544\uB798 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uC815\uBCF4\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC0C1\uC138 \uC694\uC57D\uD558\uC138\uC694.

${f}

[\uC0AC\uC6A9\uC790 \uC8FC\uC81C]
${d || "(\uC608\uC2DC \uBB38\uD56D\xB7\uBB38\uC11C \uD575\uC2EC \uAC1C\uB150)"}

[\uADFC\uAC70 \uBB38\uC11C \uACBD\uB85C]
${P.path}

[\uADFC\uAC70 \uBB38\uC11C \uBCF8\uBB38]
${P.text}

\uC704 \uBCF8\uBB38\uC744 \uC8FC\uC81C\uBCC4 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uC73C\uB85C\uB9CC \uC791\uC131\uD558\uC138\uC694.`;
      u({
        step: "summarize",
        status: "running",
        detail: v,
        llmInstruction: j,
        systemPrompt: nn,
        ...g ? {
          llmResponse: g
        } : {}
      }), (_c2 = e.onProgress) == null ? void 0 : _c2.call(e, v);
      const I = await ve(je(e.profiles, j, nn, Math.min(n.temperature, 0.7), Fe(e.signal))), L = String(I || "").trim();
      L && (h.push({
        path: P.path,
        summary: L
      }), g += `### ${P.path}

${oe(L, 24e3)}

---

`, u({
        step: "summarize",
        status: "running",
        detail: v,
        llmInstruction: j,
        systemPrompt: nn,
        llmResponse: g
      }));
    }
    if (!h.length) throw u({
      step: "summarize",
      status: "error",
      error: "\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."
    }), new Error("\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    u({
      step: "summarize",
      status: "done",
      detail: `${h.length}\uAC1C \uC694\uC57D \uC644\uB8CC`,
      llmResponse: oe(g),
      systemPrompt: nn
    }), (_d = e.onProgress) == null ? void 0 : _d.call(e, "\uC694\uC57D\uBCF8\uC73C\uB85C \uBB38\uD56D \uC0DD\uC131 \uC911\u2026");
    const x = h.map((y, P) => `### \uC694\uC57D\uBCF8 ${P + 1}
\uACBD\uB85C: ${y.path}

${y.summary}`).join(`

---

`), b = `[\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uBCF8 (${h.length}\uAC1C)]
\uC544\uB798 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC2E4 \uADFC\uAC70\uB85C \uC0AC\uC6A9\uD558\uC138\uC694. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9\uC740 \uC4F0\uC9C0 \uB9C8\uC138\uC694.

${x}

[\uCD9C\uC81C \uC9C0\uC2DC]
\uC8FC\uC81C: ${d || "(\uC694\uC57D\uBCF8\uC758 \uD575\uC2EC \uAC1C\uB150)"}
\uBB38\uD56D \uC720\uD615: ${c === "subjective" ? "\uC8FC\uAD00\uC2DD" : `\uAC1D\uAD00\uC2DD ${o}\uC9C0\uC120\uB2E4`}
\uC0DD\uC131 \uAC1C\uC218: ${a}

\uAE30\uC874 \uBB38\uD56D \uC2A4\uD0C0\uC77C \uCC38\uACE0:
${f}

JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694.`, k = Wc(c, o, a);
    u({
      step: "generate",
      status: "running",
      detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: b,
      systemPrompt: k
    });
    const z = await ve(je(e.profiles, b, k, n.temperature, Fe(e.signal))), C = De(z), $ = Array.isArray(C) ? C : [
      C
    ];
    return u({
      step: "generate",
      status: "done",
      detail: `${Math.min($.length, a)}\uAC1C \uBB38\uD56D`,
      llmInstruction: b,
      llmResponse: oe(z),
      systemPrompt: k
    }), $.slice(0, a).map((y, P) => {
      if (c === "subjective") {
        const v = y && typeof y == "object" ? {
          ...y,
          kind: "subjective"
        } : {
          kind: "subjective"
        };
        return {
          ...Rt(v, o, P % o + 1),
          isGenerated: true
        };
      }
      return {
        ...Rt(y, o, P % o + 1),
        isGenerated: true
      };
    });
  }
  const rd = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uBB38\uD56D \uD3B8\uC9D1\uC790\uC785\uB2C8\uB2E4. \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uBB38\uD56D\uC744 \uAD50\uC815\xB7\uC7AC\uC791\uC131\uD569\uB2C8\uB2E4.
- \uC0AC\uC2E4 \uAD00\uACC4\uB97C \uBC14\uB85C\uC7A1\uACE0, \uC9C0\uBB38\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\xB7\uD574\uC124\uC774 \uC2DC\uD5D8\uC5D0 \uC4F8 \uC218 \uC788\uC744 \uB9CC\uD07C \uC644\uACB0\uB418\uAC8C \uB9CC\uB4DC\uC138\uC694.
- \uC0AC\uC6A9\uC790\uAC00 \uBC29\uD5A5\uC744 \uC81C\uC2DC\uD558\uBA74 \uADF8\uC5D0 \uB9DE\uAC8C \uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\xB7\uD615\uC2DD\uC744 \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uADFC\uAC70 \uBC1C\uCDCC\uAC00 \uC788\uC73C\uBA74 \uADF8 \uBC94\uC704 \uC548\uC5D0\uC11C\uB9CC \uC0AC\uC2E4\uC744 \uC0AC\uC6A9\uD558\uC138\uC694. \uC5C6\uB294 \uB0B4\uC6A9\uC744 \uC9C0\uC5B4\uB0B4\uC9C0 \uB9C8\uC138\uC694.
- \uAC1D\uAD00\uC2DD \uC120\uD0DD\uC9C0 \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
- \uC751\uB2F5\uC740 JSON \uAC1D\uCCB4 \uD558\uB098\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
  function od(e, n) {
    const s = [
      `[\uC720\uD615] ${e.kind}${e.kind === "subjective" ? ` / ${e.answerStyle || "short"}` : ""}`,
      `[\uC9C8\uBB38]
${e.question || "(\uBE44\uC5B4 \uC788\uC74C)"}`
    ];
    if (e.kind === "choice") {
      const r = e.options || [];
      s.push("[\uC120\uD0DD\uC9C0]");
      for (let o = 0; o < n; o += 1) {
        const a = r[o] || "(\uBE44\uC5B4 \uC788\uC74C)", c = e.answer === o + 1 ? " \u2190 \uD604\uC7AC \uC815\uB2F5" : "";
        s.push(`${o + 1}. ${a}${c}`);
      }
    } else s.push(`[\uBAA8\uBC94 \uB2F5\uC548 / \uC815\uB2F5]
${e.modelAnswer || "(\uBE44\uC5B4 \uC788\uC74C)"}`);
    return s.push(`[\uC811\uADFC Point]
${e.point || "(\uC5C6\uC74C)"}`), s.push(`[\uD574\uC124]
${e.explanation || "(\uC5C6\uC74C)"}`), s.join(`

`);
  }
  function id(e) {
    const n = e.config.choiceCount || 4, s = e.question, r = String(e.userInstructions || "").trim(), o = s.kind === "subjective" ? `\uC8FC\uAD00\uC2DD(${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"})\uC744 \uC720\uC9C0\uD558\uC138\uC694. \uC0AC\uC6A9\uC790\uAC00 \uC720\uD615 \uBCC0\uACBD\uC744 \uBA85\uC2DC\uD558\uC9C0 \uC54A\uC558\uB2E4\uBA74 \uAC1D\uAD00\uC2DD\uC73C\uB85C \uBC14\uAFB8\uC9C0 \uB9C8\uC138\uC694.` : `\uAC1D\uAD00\uC2DD ${n}\uC9C0\uC120\uB2E4\uB97C \uC720\uC9C0\uD558\uC138\uC694. options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${n}, answer\uB294 1~${n} \uC815\uC218\uC785\uB2C8\uB2E4.`, a = s.kind === "subjective" ? '{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}' : `{"kind":"choice","question":"...","options":[${Array.from({
      length: n
    }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}`;
    return `\uB2E4\uC74C \uBB38\uD56D\uC740 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB2E4\uACE0 \uAC04\uC8FC\uB429\uB2C8\uB2E4. \uAD50\uC815\uB41C \uC644\uC131 \uBB38\uD56D\uC744 JSON\uC73C\uB85C \uBC18\uD658\uD558\uC138\uC694.

${od(s, n)}

${r ? `[\uC0AC\uC6A9\uC790 \uC694\uAD6C\uC0AC\uD56D]
${r}
` : ""}${e.ragBlock ? `
[\uADFC\uAC70 \uBC1C\uCDCC]
${e.ragBlock}
` : ""}
\uADDC\uCE59:
- ${o}
- \uC9C8\uBB38\xB7\uD574\uC124\xB7Point\uB294 \uB9C8\uD06C\uB2E4\uC6B4\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uC0AC\uC6A9\uC790 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBB38\uD56D \uBC29\uD5A5\xB7\uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\uC5D0 \uBC18\uC601\uD558\uC138\uC694.
- \uC2A4\uD0A4\uB9C8: ${a}`;
  }
  async function ad(e) {
    const n = Ne(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = (g) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, g);
    }, a = s.kind === "choice" && s.answer && s.answer >= 1 ? Math.min(r, s.answer) : 1;
    let c = "";
    const d = e.sourcePaths || [];
    if (d.length > 0 && e.readText) {
      o({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const g = [
        s.question,
        s.point || "",
        String(e.userInstructions || "").trim()
      ].filter(Boolean).join(`
`), { chunks: x } = await hn({
        sourcePaths: d,
        query: g,
        readText: e.readText
      });
      c = gn(x), o({
        step: "rag",
        status: "done",
        detail: x.length > 0 ? `${x.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C"
      });
    } else o({
      step: "rag",
      status: "skipped",
      detail: "\uADFC\uAC70 \uC5C6\uC74C"
    });
    const u = id({
      question: s,
      config: e.config,
      ...String(e.userInstructions || "").trim() ? {
        userInstructions: String(e.userInstructions).trim()
      } : {},
      ...c ? {
        ragBlock: c
      } : {}
    });
    o({
      step: "generate",
      status: "running",
      detail: "\uBB38\uD56D \uAD50\uC815 \uC911\u2026"
    });
    const m = await ve(je(e.profiles, u, rd, n.temperature, Fe(e.signal))), f = De(m), h = f && typeof f == "object" && !Array.isArray(f) ? f : Array.isArray(f) && f[0] ? f[0] : f;
    return o({
      step: "generate",
      status: "done",
      detail: "\uAD50\uC815 \uC644\uB8CC"
    }), Rt(h, r, a);
  }
  function ld(e) {
    const n = Array.from({
      length: e
    }, (s, r) => r);
    for (let s = n.length - 1; s > 0; s -= 1) {
      const r = Math.floor(Math.random() * (s + 1)), o = n[s];
      n[s] = n[r], n[r] = o;
    }
    return n;
  }
  function cd(e) {
    const n = /* @__PURE__ */ new Map();
    for (let s = 0; s < e.length; s += 1) {
      const r = e[s];
      n.set(r + 1, s + 1);
    }
    return n;
  }
  function dd(e, n) {
    if (e.kind !== "choice") return null;
    const s = e.options || [];
    if (s.length < 2) return null;
    const r = n ?? ld(s.length);
    if (r.length !== s.length) return null;
    const o = r.map((m) => s[m] ?? ""), a = Math.max(0, (e.answer ?? 1) - 1), c = r.indexOf(a), d = c >= 0 ? c + 1 : e.answer, u = cd(r);
    return {
      question: {
        ...e,
        options: o,
        ...d != null ? {
          answer: d
        } : {}
      },
      oldToNew: u
    };
  }
  function ud(e, n) {
    if (typeof e != "number" || !Number.isFinite(e)) return e;
    const s = Math.round(e);
    return n.get(s) ?? e;
  }
  function md(e, n) {
    const s = {};
    for (const [r, o] of Object.entries(e)) {
      const a = r.lastIndexOf("_");
      if (a <= 0) continue;
      const c = r.slice(0, a), d = Number.parseInt(r.slice(a + 1), 10);
      if (!c || !Number.isFinite(d) || d < 1) continue;
      const u = n.get(c);
      if (!u) {
        s[r] = o;
        continue;
      }
      const m = u.get(d);
      m != null && (s[Ze(c, m)] = o);
    }
    return s;
  }
  function fd(e, n) {
    const s = {};
    for (const [r, o] of Object.entries(e)) {
      const a = n.get(r);
      if (!a) {
        s[r] = o;
        continue;
      }
      const c = a.get(o);
      c != null && (s[r] = c);
    }
    return s;
  }
  function pd(e) {
    const n = /* @__PURE__ */ new Map();
    let s = 0;
    const r = e.questions.map((u) => {
      var _a2;
      const m = dd(u, (_a2 = e.permutationByQuestionId) == null ? void 0 : _a2.get(u.id));
      return m ? (n.set(u.id, m.oldToNew), s += 1, m.question) : u;
    }), o = {
      ...e.userAnswers
    };
    for (const u of e.questions) {
      if (u.kind !== "choice") continue;
      const m = n.get(u.id);
      if (!m) continue;
      const f = ud(o[u.id], m);
      f !== void 0 && (o[u.id] = f);
    }
    const a = md(e.wrongExps, n), c = fd(e.wrongExpFocus, n), d = es(a);
    return {
      questions: r,
      userAnswers: o,
      wrongExps: a,
      wrongExpFocus: c,
      wrongChoiceExplanations: d,
      optionMapsByQuestionId: n,
      shuffledQuestionCount: s
    };
  }
  function xd(e, n, s) {
    const r = s.get(e);
    return r ? r.get(n) ?? null : n;
  }
  function gr(e, n, s) {
    const r = lt(e, n);
    if (!r) return "";
    const o = String(s || "").trim();
    if (o) return o;
    const a = cs(r.id, r.kind).trim();
    return a || vi(r.kind);
  }
  function hd(e) {
    const [n, s] = i.useState(""), [r, o] = i.useState(""), a = i.useCallback(() => {
      var _a2;
      const m = Ne(), h = ((_a2 = lt(e, m.profileId || ls())) == null ? void 0 : _a2.id) ?? "";
      s(h), o(gr(e, h, m.modelId));
    }, [
      e
    ]);
    i.useEffect(() => {
      a();
      const m = () => a();
      return window.addEventListener(cn, m), () => window.removeEventListener(cn, m);
    }, [
      a
    ]);
    const c = i.useCallback((m) => {
      const f = m.trim();
      s(f), yi(f);
      const h = lt(e, f), g = h ? gr(e, h.id, null) : "";
      o(g), Ks({
        profileId: f || null,
        modelId: g || null
      });
    }, [
      e
    ]), d = i.useCallback((m) => {
      const f = m.trim();
      o(f), Ks({
        modelId: f || null
      });
      const h = lt(e, n);
      h && $t(h.id, f);
    }, [
      e,
      n
    ]), u = i.useMemo(() => {
      const m = {}, f = n.trim(), h = r.trim();
      return f && (m.profileId = f), h && (m.model = h), m;
    }, [
      n,
      r
    ]);
    return {
      profileId: n,
      model: r,
      onProfileIdChange: c,
      onModelChange: d,
      llmOpts: u,
      syncFromSettings: a
    };
  }
  const gd = 0.12;
  function br(e, n, s, r = 0) {
    const [o, a] = i.useState(true), c = i.useRef(true);
    return i.useEffect(() => {
      if (!s) {
        c.current = true, a(true);
        return;
      }
      let d = 0, u = null;
      const m = (x) => {
        c.current !== x && (c.current = x, a(x));
      }, f = () => {
        u == null ? void 0 : u.disconnect();
        const x = e.current, b = n.current;
        !x || !b || (u = new IntersectionObserver(([k]) => {
          k && (cancelAnimationFrame(d), d = requestAnimationFrame(() => {
            m(k.isIntersecting);
          }));
        }, {
          root: x,
          threshold: gd
        }), u.observe(b));
      };
      f();
      const h = e.current, g = typeof ResizeObserver < "u" && h != null ? new ResizeObserver(() => {
        f();
      }) : null;
      return h != null && (g == null ? void 0 : g.observe(h)), () => {
        cancelAnimationFrame(d), u == null ? void 0 : u.disconnect(), g == null ? void 0 : g.disconnect();
      };
    }, [
      s,
      r,
      e,
      n
    ]), o;
  }
  function bd({ profiles: e, profileId: n, model: s, onProfileIdChange: r, onModelChange: o, busy: a = false }) {
    return t.jsxs("section", {
      "aria-label": "\uD034\uC988 AI \uC81C\uACF5\uC790",
      className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface",
      children: [
        t.jsxs("div", {
          className: "mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-odp-fgStrong",
          children: [
            t.jsx(ra, {
              size: 14,
              className: "shrink-0 text-violet-600 dark:text-violet-400",
              "aria-hidden": true
            }),
            "AI \uC81C\uACF5\uC790"
          ]
        }),
        t.jsx(Tr, {
          profiles: e,
          profileId: n,
          model: s,
          onProfileIdChange: r,
          onModelChange: o,
          disabled: a
        })
      ]
    });
  }
  const kd = i.memo(bd);
  function wd(e) {
    return so(e).map((n) => n.id === "generate" ? {
      ...n,
      label: "\uD30C\uC0DD \uBB38\uD56D \uC0DD\uC131"
    } : n);
  }
  function so(e) {
    const n = [];
    return e && n.push({
      id: "rag",
      label: "\uADFC\uAC70 \uBC1C\uCDCC",
      status: "pending"
    }), n.push({
      id: "analysis",
      label: "\uBB38\uD56D \uAD6C\uC870 \uBD84\uC11D",
      status: "pending"
    }, {
      id: "randomize",
      label: "\uBCC0\uC218 \uC0D8\uD50C\uB9C1",
      status: "pending"
    }, {
      id: "generate",
      label: "\uC720\uC0AC \uBB38\uD56D \uC0DD\uC131",
      status: "pending"
    }, {
      id: "finalize",
      label: "\uBB38\uD56D \uCD94\uAC00",
      status: "pending"
    }), n;
  }
  function yd() {
    return [
      {
        id: "load_sources",
        label: "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC",
        status: "pending"
      },
      {
        id: "summarize",
        label: "\uBB38\uC11C \uC694\uC57D",
        status: "pending"
      },
      {
        id: "generate",
        label: "\uBB38\uD56D \uC0DD\uC131",
        status: "pending"
      },
      {
        id: "finalize",
        label: "\uBB38\uD56D \uCD94\uAC00",
        status: "pending"
      }
    ];
  }
  function rn(e, n = 72) {
    const s = String(e || "").replace(/\s+/g, " ").trim();
    return s.length <= n ? s : `${s.slice(0, n - 1)}\u2026`;
  }
  const ro = "s3haim_quiz_gen_queue_panel_size", vd = 280, jd = 180, Gn = 380, Wn = 320;
  function oo(e) {
    const n = Math.min(window.innerWidth * 0.92, 720), s = Math.min(window.innerHeight * 0.72, 640);
    return {
      width: Math.min(n, Math.max(vd, Math.round(e.width))),
      height: Math.min(s, Math.max(jd, Math.round(e.height)))
    };
  }
  function Sd() {
    try {
      const e = typeof window < "u" ? window.localStorage.getItem(ro) : null;
      if (!e) return {
        width: Gn,
        height: Wn
      };
      const n = JSON.parse(e);
      return oo({
        width: Number(n.width) || Gn,
        height: Number(n.height) || Wn
      });
    } catch {
      return {
        width: Gn,
        height: Wn
      };
    }
  }
  function Cd(e) {
    try {
      typeof window < "u" && window.localStorage.setItem(ro, JSON.stringify(e));
    } catch {
    }
  }
  function Nd(e, n) {
    const s = e.steps.map((r) => {
      if (r.id !== n.step) return r;
      const o = {
        ...r,
        status: n.status
      };
      return n.detail !== void 0 && (o.detail = n.detail), n.error !== void 0 && (o.error = n.error), n.llmInstruction !== void 0 && (o.llmInstruction = n.llmInstruction), n.llmResponse !== void 0 && (o.llmResponse = n.llmResponse), n.systemPrompt !== void 0 && (o.systemPrompt = n.systemPrompt), n.status === "running" && delete o.error, o;
    });
    return {
      ...e,
      steps: s
    };
  }
  function Jn() {
    return `quiz-gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
  function $d() {
    const [e, n] = i.useState([]), s = i.useRef(e);
    s.current = e;
    const [r, o] = i.useState(false), [a, c] = i.useState(() => Sd()), d = i.useRef(false), u = i.useRef(false), m = i.useRef(false), f = i.useRef(0), h = i.useCallback((E) => {
      const R = oo(E);
      c(R), Cd(R);
    }, []), g = i.useCallback(() => {
      d.current = true;
    }, []), x = i.useCallback((E) => {
      u.current = E;
    }, []), b = i.useCallback((E) => {
      m.current = E;
    }, []), k = i.useCallback(() => u.current || m.current, []), z = i.useCallback(() => {
      d.current = true, o(true);
    }, []), C = i.useCallback(() => {
      d.current = false, u.current = false, m.current = false, o(false);
    }, []), $ = i.useCallback(() => {
      o(true);
    }, []), y = i.useCallback((E) => s.current.find((R) => R.id === E) ?? null, []), P = i.useCallback((E) => {
      const R = Jn(), W = {
        id: R,
        kind: "similar",
        questionLabel: E.displayLabel,
        questionPreview: rn(E.preview),
        status: "running",
        steps: so(E.hasRag),
        createdAt: Date.now()
      };
      return n((T) => [
        W,
        ...T
      ]), $(), R;
    }, [
      $
    ]), v = i.useCallback((E) => {
      const R = Jn(), W = {
        id: R,
        kind: "derived",
        questionLabel: E.displayLabel,
        questionPreview: rn(E.preview),
        status: "running",
        steps: wd(E.hasRag),
        createdAt: Date.now()
      };
      return n((T) => [
        W,
        ...T
      ]), $(), R;
    }, [
      $
    ]), j = i.useCallback((E) => {
      var _a2;
      const R = Jn(), W = ((_a2 = E.topic) == null ? void 0 : _a2.trim()) || rn(E.preview) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", T = {
        id: R,
        kind: "source",
        questionPreview: rn(W),
        status: "running",
        steps: yd(),
        createdAt: Date.now()
      };
      return n((le) => [
        T,
        ...le
      ]), $(), R;
    }, [
      $
    ]), I = i.useCallback((E, R) => {
      n((W) => W.map((T) => T.id === E ? Nd(T, R) : T));
    }, []), L = i.useCallback((E, R) => {
      n((W) => W.map((T) => T.id === E ? {
        ...T,
        logPath: R
      } : T));
    }, []), B = i.useCallback((E, R) => {
      n((W) => W.map((T) => T.id === E ? {
        ...T,
        resultQuestionId: R
      } : T));
    }, []), F = i.useCallback((E, R) => {
      n((W) => W.map((T) => T.id === E ? {
        ...T,
        status: "done",
        ...R ? {
          resultLabel: R
        } : {}
      } : T));
    }, []), A = i.useCallback((E, R) => {
      n((W) => W.map((T) => T.id === E ? {
        ...T,
        status: "error",
        error: R
      } : T));
    }, []), _ = i.useCallback((E) => {
      n((R) => R.filter((W) => W.id !== E));
    }, []), q = i.useCallback(() => {
      n((E) => E.filter((R) => R.status === "running"));
    }, []), K = e.some((E) => E.status === "running");
    return i.useEffect(() => {
      const E = e.filter((T) => T.status === "running").length, R = f.current > 0;
      if (f.current = E, !r || !R || E > 0 || d.current || k()) return;
      const W = window.requestAnimationFrame(() => {
        d.current || k() || C();
      });
      return () => window.cancelAnimationFrame(W);
    }, [
      C,
      k,
      e,
      r
    ]), {
      jobs: e,
      panelOpen: r,
      panelSize: a,
      setPanelSize: h,
      openPanel: z,
      closePanel: C,
      setPanelOpen: o,
      markPanelUserEngaged: g,
      markPanelPointerEngaged: x,
      markPanelFocusEngaged: b,
      getJob: y,
      createSimilarJob: P,
      createDerivedJob: v,
      createSourceJob: j,
      updateJobStep: I,
      setJobLogPath: L,
      setJobResultQuestionId: B,
      completeJob: F,
      failJob: A,
      removeJob: _,
      clearFinishedJobs: q,
      hasActiveJobs: K
    };
  }
  function Hn(e, n, s) {
    return !e || s == null ? n : n + Math.max(0, Date.now() - s);
  }
  function Ed({ initialLog: e, hydrateKey: n = 0, onLogChange: s }) {
    const [r, o] = i.useState(() => ts(e ?? Pt())), [a, c] = i.useState(0), d = i.useRef(null), u = i.useRef(s), m = i.useRef(e);
    u.current = s, m.current = e;
    const f = vt(r), h = r.events.length > 0, g = ji(r), x = jt(r);
    i.useEffect(() => {
      const y = ts(m.current ?? Pt());
      o(y), vt(y) ? d.current = Date.now() : d.current = null;
    }, [
      n
    ]), i.useEffect(() => {
      if (!f) return;
      const y = window.setInterval(() => c((P) => P + 1), 200);
      return () => window.clearInterval(y);
    }, [
      f
    ]);
    const b = i.useMemo(() => Hn(f, x, d.current), [
      f,
      x,
      a
    ]), k = i.useCallback(() => {
      d.current = Date.now(), o((y) => {
        var _a2;
        const P = Et(y, "start", 0);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, P), P;
      });
    }, []), z = i.useCallback(() => {
      o((y) => {
        var _a2;
        if (!vt(y)) return y;
        const P = Hn(true, jt(y), d.current);
        d.current = null;
        const v = Et(y, "pause", P);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, v), v;
      });
    }, []), C = i.useCallback(() => {
      o((y) => {
        var _a2;
        if (vt(y)) return y;
        const P = jt(y);
        d.current = Date.now();
        const v = Et(y, "resume", P);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, v), v;
      });
    }, []), $ = i.useCallback(() => {
      o((y) => {
        var _a2;
        const P = vt(y) ? Hn(true, jt(y), d.current) : jt(y);
        d.current = null;
        const v = Et(y, "stop", P);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, v), v;
      });
    }, []);
    return {
      log: r,
      displayMs: b,
      running: f,
      started: h,
      examInProgress: g,
      start: k,
      pause: z,
      resume: C,
      stop: $
    };
  }
  function Pd(e) {
    const n = e.lastIndexOf(".");
    return n >= 0 ? e.slice(n + 1).toLowerCase() : "";
  }
  function Nt(e) {
    if (e) try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }
  async function zd({ backend: e, storageType: n, path: s }) {
    var _a2, _b;
    if (!e || !s) return null;
    const r = us(s), o = Pd(r), a = [
      ...Si
    ], c = [
      "mp4",
      "webm",
      "ogv",
      "mov",
      "mkv"
    ], d = [
      "m4a",
      "mp3",
      "wav",
      "ogg",
      "aac",
      "flac",
      "weba"
    ];
    if (a.includes(o) && e.getObjectUrl) {
      let g = await e.getObjectUrl(s);
      if (o === "heic" || o === "heif") {
        const b = await ((_a2 = e.readBytes) == null ? void 0 : _a2.call(e, s));
        if (b == null ? void 0 : b.body) {
          Nt(g);
          const k = b.body instanceof Uint8Array ? b.body : new Uint8Array(b.body), z = k.buffer.slice(k.byteOffset, k.byteOffset + k.byteLength);
          g = await Ci(new Blob([
            z
          ]), r);
        }
      }
      const x = await ((_b = e.head) == null ? void 0 : _b.call(e, s));
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "image",
          objectUrl: g,
          size: (x == null ? void 0 : x.contentLength) ?? null
        },
        content: "",
        revoke: () => Nt(g)
      };
    }
    if (o === "pdf" && e.readBytes) {
      const { body: g, contentLength: x } = await e.readBytes(s), b = g instanceof Uint8Array ? g : new Uint8Array(g), k = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), z = new Blob([
        k
      ], {
        type: "application/pdf"
      }), C = URL.createObjectURL(z);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "pdf",
          objectUrl: C,
          size: x ?? null
        },
        content: "",
        revoke: () => Nt(C)
      };
    }
    if (d.includes(o) && e.getObjectUrl) {
      const g = await e.getObjectUrl(s);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "audio",
          objectUrl: g
        },
        content: "",
        revoke: () => Nt(g)
      };
    }
    if (c.includes(o) && e.getObjectUrl) {
      const g = await e.getObjectUrl(s);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "video",
          objectUrl: g
        },
        content: "",
        revoke: () => Nt(g)
      };
    }
    if (!e.readText) return null;
    const u = Ni(s, r);
    if (u) {
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s), k = Vs(g, u.viewer);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: u.viewer,
          content: k,
          ...x != null ? {
            size: x
          } : {},
          ...b != null ? {
            lastModified: b
          } : {}
        },
        content: k
      };
    }
    if (o === "json") {
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s), k = Vs(g, "json");
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "json",
          content: k,
          ...x != null ? {
            size: x
          } : {},
          ...b != null ? {
            lastModified: b
          } : {}
        },
        content: k
      };
    }
    if (o === "html" || o === "htm" || o === "svg") {
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: o === "svg" ? "svg" : "html",
          content: g,
          ...x != null ? {
            size: x
          } : {},
          ...b != null ? {
            lastModified: b
          } : {}
        },
        content: g
      };
    }
    if (o === "md" || o === "markdown" || o === "" || Xt(s) || Xt(r)) {
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s);
      if (Xt(s) || Xt(r)) {
        const k = await $i(s, g);
        return k.status === "need-password" ? {
          currentFile: {
            type: n,
            id: s,
            name: r,
            viewer: "markdown",
            content: "",
            ...x != null ? {
              size: x
            } : {},
            encMd: true,
            ...b != null ? {
              lastModified: b
            } : {}
          },
          content: "",
          needsEncMdPassword: true
        } : {
          currentFile: {
            type: n,
            id: s,
            name: r,
            viewer: "markdown",
            content: k.text,
            ...x != null ? {
              size: x
            } : {},
            encMd: true,
            ...b != null ? {
              lastModified: b
            } : {}
          },
          content: k.text
        };
      }
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "markdown",
          content: g,
          ...x != null ? {
            size: x
          } : {},
          ...b != null ? {
            lastModified: b
          } : {}
        },
        content: g
      };
    }
    const { text: m, contentLength: f, lastModified: h } = await e.readText(s);
    return {
      currentFile: {
        type: n,
        id: s,
        name: r,
        viewer: "raw",
        content: m,
        ...f != null ? {
          size: f
        } : {},
        ...h != null ? {
          lastModified: h
        } : {}
      },
      content: m
    };
  }
  const Id = 2e4, kr = "flex h-6 max-h-6 min-w-0 items-center overflow-hidden", Ad = "z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", wr = "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg";
  fu = function({ content: e, onChange: n, onSave: s, currentFile: r, onResolveWikiImageUrl: o, llmProviderProfiles: a = [], isActiveFile: c = true, isSurfaceLive: d = true, registerToolbar: u, registerFileManagement: m }) {
    const { showToast: f } = Ei(), { showAlert: h } = Pi(), g = zi(), x = $d(), { storageMode: b, s3Tree: k, localTree: z, webdavTree: C, idbTree: $, localRootHandle: y, getBackendForType: P, loadLocalFolderChildren: v, loadWebdavFolderChildren: j, loadIdbFolderChildren: I } = Ii(), { openAdvancedSearchFile: L, selectFileRaw: B } = Ai(), F = i.useCallback((l) => {
      g == null ? void 0 : g.openAssist(), f({
        message: l || "AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
        durationMs: 3500
      });
    }, [
      g,
      f
    ]), A = hd(a), _ = i.useCallback(async (l) => {
      const p = await Hc(a, {
        ...A.llmOpts,
        ...l
      });
      return p.ready ? true : (F(p.message), false);
    }, [
      a,
      F,
      A.llmOpts
    ]), q = i.useCallback((l, p, w) => {
      const N = (p instanceof Error ? p.message : "") || w;
      if (Kc(N)) {
        F(N);
        return;
      }
      if (N.length >= 48 || N.includes(`
`)) {
        h({
          title: l,
          message: N
        });
        return;
      }
      f({
        message: N,
        durationMs: 4e3
      });
    }, [
      F,
      h,
      f
    ]), K = i.useMemo(() => b === Tn ? z : b === _n ? C : b === Dn ? $ : k, [
      b,
      z,
      C,
      $,
      k
    ]), E = b === Tn ? "local" : b === _n ? "webdav" : b === Dn ? "idb" : "s3", R = E, W = i.useCallback(async (l) => {
      const p = P(E);
      return zd({
        backend: p,
        storageType: R,
        path: l
      });
    }, [
      P,
      E,
      R
    ]), T = i.useCallback((l) => {
      L(l);
    }, [
      L
    ]), le = i.useCallback(async (l) => {
      const p = await aa(l, {
        storageType: R,
        localTree: z,
        webdavTree: C,
        idbTree: $,
        s3Tree: k,
        localRootHandle: y
      });
      if (p) {
        await B(E, p, {
          background: true
        });
        return;
      }
      L(l);
    }, [
      R,
      z,
      C,
      $,
      k,
      y,
      B,
      E,
      L
    ]), He = i.useCallback((l) => {
      xt(true), ht(l);
    }, []), st = i.useCallback(() => {
      xt(false), ht(null);
    }, []), V = i.useCallback(async (l) => {
      const p = P(E);
      if (!(p == null ? void 0 : p.readText)) return null;
      const { text: w } = await p.readText(l);
      return typeof w == "string" ? w : null;
    }, [
      P,
      E
    ]), Z = i.useCallback(async (l, p) => {
      const w = r == null ? void 0 : r.id;
      if (!w) return;
      await new Promise((M) => {
        window.setTimeout(M, 0);
      });
      const N = x.getJob(l);
      if (!N) return;
      const O = P(E);
      if (O == null ? void 0 : O.writeText) try {
        const M = await _c({
          quizFilePath: w,
          logKey: p,
          job: N,
          writeText: (U, G) => O.writeText(U, G, "text/markdown; charset=utf-8")
        });
        x.setJobLogPath(l, M);
      } catch {
      }
    }, [
      r == null ? void 0 : r.id,
      x,
      P,
      E
    ]), ne = i.useCallback((l, p, w) => {
      x.updateJobStep(l, w), Z(l, p);
    }, [
      x,
      Z
    ]), Q = i.useCallback(async (l) => {
      b === Tn ? await (v == null ? void 0 : v(l)) : b === _n ? await (j == null ? void 0 : j(l)) : b === Dn && await (I == null ? void 0 : I(l));
    }, [
      b,
      v,
      j,
      I
    ]), [S, ce] = i.useState(() => at(e)), fe = i.useRef(e), bn = i.useRef(false), Qt = i.useRef(false), Oe = i.useRef(null), de = i.useRef(S);
    de.current = S;
    const [se, Ke] = i.useState({}), [ie, Be] = i.useState({}), fs = i.useRef(ie);
    fs.current = ie;
    const [io, $e] = i.useState({}), [ae, kn] = i.useState({}), [Le, ke] = i.useState({}), et = i.useRef(Le);
    et.current = Le;
    const [Tt, rt] = i.useState({}), [ue, Ue] = i.useState(null), [me, tt] = i.useState({}), [pe, _t] = i.useState(false), [wn, pt] = i.useState("all"), [yn, ps] = i.useState(false), [Dt, xt] = i.useState(false), [ao, ht] = i.useState(null), [lo, vn] = i.useState(false), [gt, jn] = i.useState(null), [Ve, xe] = i.useState(null), [xs, Ft] = i.useState(false), [he, qt] = i.useState(null), [ot, Sn] = i.useState(null), [hs, Cn] = i.useState(false), [Ge, Bt] = i.useState(null), [co, Ut] = i.useState({}), Nn = i.useRef(null), $n = i.useRef(null), Se = i.useRef(null), bt = i.useRef(null), gs = i.useRef(null), bs = i.useRef(null), [we, kt] = i.useState(() => Pt()), [uo, En] = i.useState(0), re = Ed({
      initialLog: we,
      hydrateKey: uo,
      onLogChange: kt
    }), ks = i.useRef(() => 0);
    ks.current = () => re.displayMs;
    const mo = i.useMemo(() => S.questions.map((l) => ({
      id: l.id,
      displayLabel: l.displayLabel
    })), [
      S.questions
    ]);
    Ll({
      scrollRootRef: bt,
      questions: mo,
      running: re.running,
      getElapsedMs: () => ks.current(),
      timeLog: we,
      onLogChange: kt
    });
    const Xe = i.useCallback(() => qn({
      questions: de.current.questions,
      userAnswers: se,
      gradedQuestions: ie,
      subjectiveGrades: me,
      isSubmitted: pe,
      ...Fn(we) ? {} : {
        timeLog: we
      },
      wrongChoiceExplanations: es(Le),
      ...St(ae) ? {} : {
        questionMemos: ae
      }
    }), [
      se,
      ie,
      me,
      pe,
      we,
      Le,
      ae
    ]), Gt = i.useCallback(() => {
      if (!Qt.current || !c) return false;
      const l = Xe();
      if (!tc(l)) return false;
      const p = at(fe.current).session;
      if (!mr(l, p)) return true;
      const w = typeof (r == null ? void 0 : r.content) == "string" ? r.content : "";
      if (!w) return true;
      const N = at(w).session;
      return !mr(l, N);
    }, [
      Xe,
      r == null ? void 0 : r.content,
      c
    ]), Wt = i.useCallback((l) => {
      const p = ts(l == null ? void 0 : l.timeLog);
      if (kt(p), En((N) => N + 1), !l || os(l)) {
        Ke({}), Be({}), $e({}), ke({}), rt({}), Ue(null), kn({}), tt({}), _t(false);
        return;
      }
      Ke({
        ...l.userAnswers
      }), Be({
        ...l.gradedQuestions
      }), tt({
        ...l.subjectiveGrades
      }), _t(l.isSubmitted), ke(Mi(l.wrongChoiceExplanations)), kn({
        ...l.questionMemos ?? {}
      }), rt({}), Ue(null);
      const w = {};
      for (const [N, O] of Object.entries(l.gradedQuestions)) O && (w[N] = true);
      $e(w);
    }, []), ge = i.useCallback((l, p) => {
      const w = jr(l.config, l.questions, p);
      bn.current = true, fe.current = w, n(w);
    }, [
      n
    ]), Jt = i.useCallback(() => {
      if (!Qt.current) return;
      Oe.current != null && (clearTimeout(Oe.current), Oe.current = null);
      const l = Xe();
      ge(de.current, l);
    }, [
      Xe,
      ge
    ]), it = i.useCallback(async (l) => {
      if (!(!Ne().autoSaveOnAiGenerate || typeof s != "function")) {
        if (l) {
          const p = qn({
            questions: de.current.questions,
            userAnswers: se,
            gradedQuestions: ie,
            subjectiveGrades: me,
            isSubmitted: pe,
            ...Fn(we) ? {} : {
              timeLog: we
            },
            wrongChoiceExplanations: es(l),
            ...St(ae) ? {} : {
              questionMemos: ae
            }
          });
          ge(de.current, p);
        } else Jt();
        await s(null, {
          skipCoverChangeCheck: true,
          skipSuffixCheck: true,
          contentOverride: fe.current
        });
      }
    }, [
      Jt,
      ie,
      pe,
      s,
      ge,
      me,
      we,
      se,
      ae
    ]);
    i.useEffect(() => {
      if (e === fe.current) return;
      if (fe.current = e, bn.current) {
        bn.current = false;
        return;
      }
      const l = at(e);
      ce(l), Wt(l.session);
    }, [
      e,
      Wt
    ]), i.useEffect(() => {
      const l = at(fe.current);
      Wt(l.session), Qt.current = true;
    }, [
      Wt
    ]), i.useEffect(() => {
      if (!Qt.current) return;
      const l = Xe();
      return Oe.current != null && clearTimeout(Oe.current), Oe.current = setTimeout(() => {
        Oe.current = null, ge(de.current, l);
      }, Id), () => {
        Oe.current != null && (clearTimeout(Oe.current), Oe.current = null);
      };
    }, [
      se,
      ie,
      me,
      pe,
      we,
      Le,
      ae,
      Xe,
      ge
    ]);
    const ws = i.useCallback(async () => {
      const l = Zl(de.current, {
        questions: de.current.questions,
        userAnswers: se,
        gradedQuestions: ie,
        isSubmitted: pe,
        subjectiveGrades: me
      });
      if (!l) {
        f({
          message: "\uCD94\uCD9C\uD560 \uD2C0\uB9B0 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCC44\uC810 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
          durationMs: 3500
        });
        return;
      }
      const p = r == null ? void 0 : r.id;
      if (!p) return;
      const w = P(E);
      if (!(w == null ? void 0 : w.writeText)) {
        f({
          message: "\uC800\uC7A5\uC18C\uC5D0 \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 3e3
        });
        return;
      }
      try {
        const N = await ec(p, async (O) => {
          if (!w.head) return false;
          try {
            return await w.head(O), true;
          } catch {
            return false;
          }
        });
        await w.writeText(N, l.markdown, "text/markdown; charset=utf-8"), await L(N), f({
          message: `\uD2C0\uB9B0 \uBB38\uC81C ${l.questions.length}\uAC1C\uB97C \uC0C8 \uD034\uC988\uB85C \uCD94\uCD9C\uD588\uC2B5\uB2C8\uB2E4.`,
          durationMs: 4e3
        });
      } catch (N) {
        q("\uD2C0\uB9B0\uBB38\uC81C \uCD94\uCD9C", N, "\uD30C\uC77C\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      se,
      ie,
      pe,
      me,
      r == null ? void 0 : r.id,
      P,
      E,
      L,
      f,
      q
    ]);
    i.useEffect(() => {
      if (!c || Ar()) return;
      const l = (p) => {
        Gt() && (p.preventDefault(), p.returnValue = "");
      };
      return window.addEventListener("beforeunload", l), () => window.removeEventListener("beforeunload", l);
    }, [
      c,
      Gt
    ]);
    const be = i.useCallback((l) => {
      const p = {
        ...l,
        config: nr(l.config, l.questions)
      };
      de.current = p, ce(p);
      const w = Xe();
      ge(p, w);
    }, [
      Xe,
      ge
    ]), ys = i.useCallback(() => {
      const l = de.current, p = pd({
        questions: l.questions,
        userAnswers: se,
        wrongExps: Le,
        wrongExpFocus: Tt
      });
      if (p.shuffledQuestionCount <= 0) {
        f({
          message: "\uC120\uD0DD\uC9C0\uAC00 2\uAC1C \uC774\uC0C1\uC778 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 2800
        });
        return;
      }
      Ke(p.userAnswers), ke(p.wrongExps), rt(p.wrongExpFocus), Ue((O) => {
        if (!O) return null;
        const M = xd(O.questionId, O.option, p.optionMapsByQuestionId);
        return M == null ? null : {
          ...O,
          option: M
        };
      });
      const w = {
        ...l,
        questions: p.questions,
        config: nr(l.config, p.questions)
      };
      ce(w);
      const N = qn({
        questions: w.questions,
        userAnswers: p.userAnswers,
        gradedQuestions: ie,
        subjectiveGrades: me,
        isSubmitted: pe,
        ...Fn(we) ? {} : {
          timeLog: we
        },
        wrongChoiceExplanations: p.wrongChoiceExplanations,
        ...St(ae) ? {} : {
          questionMemos: ae
        }
      });
      ge(w, N), f({
        message: `${p.shuffledQuestionCount}\uAC1C \uBB38\uD56D\uC758 \uC120\uD0DD\uC9C0 \uC21C\uC11C\uB97C \uBCC0\uACBD\uD588\uC2B5\uB2C8\uB2E4.`,
        durationMs: 3200
      });
    }, [
      se,
      Le,
      Tt,
      ie,
      me,
      pe,
      we,
      ae,
      ge,
      f
    ]);
    i.useEffect(() => {
      if (!(!c || !d || !m)) return m({
        extractWrongQuestions: ws,
        shuffleChoiceOptions: ys,
        hasUnsavedProgress: Gt,
        flushBeforeSave: Jt
      }), () => m(null);
    }, [
      c,
      d,
      m,
      ws,
      ys,
      Gt,
      Jt
    ]);
    const Pn = i.useCallback((l) => {
      const p = de.current;
      be({
        ...p,
        config: Ri(p.config, l)
      }), ht((w) => w === l ? null : w);
    }, [
      be
    ]), fo = i.useCallback((l, p) => {
      const w = de.current;
      be({
        ...w,
        config: Oi(w.config, l, p)
      });
    }, [
      be
    ]), po = i.useCallback((l) => {
      if (Yr()) {
        jn(l);
        return;
      }
      Pn(l);
    }, [
      Pn
    ]), { setQuizSourceDropActive: zn, setQuizSourceDropHost: Ht, handleRegisterQuizSourceDrop: In } = Li(), vs = i.useRef(null), js = i.useRef(null), Ss = i.useRef(null), Cs = i.useRef(null), Ns = i.useRef(Ge);
    Ns.current = Ge;
    const Kt = i.useCallback(() => {
      const l = vs.current ?? js.current;
      Ss.current !== l && (Ss.current = l, Ht(l));
    }, [
      Ht
    ]), xo = i.useCallback((l) => {
      vs.current = l, Kt();
    }, [
      Kt
    ]), ho = i.useCallback((l) => {
      js.current = l, Kt();
    }, [
      Kt
    ]);
    i.useEffect(() => () => Ht(null), [
      Ht
    ]);
    const $s = i.useCallback((l, p) => l !== E ? null : Qi(K, p) || Ti(K, p), [
      E,
      K
    ]), Es = (r == null ? void 0 : r.id) || null, Ps = i.useCallback((l) => {
      var _a2;
      if (!l.length) return;
      const p = Ns.current;
      if (p == null ? void 0 : p.onDone) {
        const O = new Set(p.paths);
        for (const M of l) O.add(M);
        p.onDone([
          ...O
        ].sort((M, U) => M.localeCompare(U))), f({
          message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        });
        return;
      }
      if (p) {
        (_a2 = Cs.current) == null ? void 0 : _a2.call(Cs, l), f({
          message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        });
        return;
      }
      const w = de.current, N = [
        .../* @__PURE__ */ new Set([
          ...w.config.sourcePaths,
          ...l
        ])
      ].sort((O, M) => O.localeCompare(M));
      be({
        ...w,
        config: {
          ...w.config,
          sourcePaths: N
        }
      }), f({
        message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
        durationMs: 2500
      });
    }, [
      be,
      f
    ]), zs = i.useCallback((l) => {
      const p = _i(l, $s, {
        excludePath: Es
      });
      p.length && Ps(p);
    }, [
      Es,
      $s,
      Ps
    ]);
    i.useEffect(() => (In(zs), () => In(null)), [
      In,
      zs
    ]), i.useEffect(() => (zn(c && d && (!!Ge || Dt)), () => zn(false)), [
      c,
      d,
      Ge,
      Dt,
      zn
    ]);
    const J = i.useMemo(() => bc({
      questions: S.questions,
      userAnswers: se,
      gradedQuestions: ie,
      isSubmitted: pe,
      subjectiveGrades: me
    }), [
      S.questions,
      se,
      ie,
      pe,
      me
    ]), Is = c && d && J.total > 0, go = br(bt, gs, Is, S.questions.length), bo = br(bt, bs, Is, S.questions.length), ko = i.useMemo(() => Dr(S.questions, S.config.choiceCount), [
      S.questions,
      S.config.choiceCount
    ]), As = i.useMemo(() => Di(S.config), [
      S.config.sourcePaths,
      S.config.disabledSourcePaths
    ]), wo = i.useMemo(() => {
      const l = {};
      for (const [p, w] of Object.entries(Le)) {
        const N = p.indexOf("_"), O = N >= 0 ? p.slice(0, N) : p, M = l[O] ?? (l[O] = {});
        M[p] = w;
      }
      return l;
    }, [
      Le
    ]), Vt = i.useMemo(() => ue && S.questions.find((l) => l.id === ue.questionId) || null, [
      ue,
      S.questions
    ]), yo = i.useCallback((l, p, w) => {
      Ue({
        questionId: l,
        option: p,
        mode: w
      });
    }, []), ye = a, Ms = i.useCallback(() => {
      Ke({}), Be({}), $e({}), ke({}), rt({}), Ue(null), tt({}), _t(false), kt(Pt()), En((l) => l + 1), ge(de.current, It({
        ...St(ae) ? {} : {
          questionMemos: ae
        }
      }));
    }, [
      ge,
      ae
    ]), vo = i.useCallback(() => {
      Ke({}), Be({}), $e({}), ke({}), rt({}), Ue(null), tt({}), _t(false);
      const l = Et(Pt(), "start", 0);
      kt(l), En((p) => p + 1), ge(de.current, It({
        timeLog: l,
        ...St(ae) ? {} : {
          questionMemos: ae
        }
      }));
    }, [
      ge,
      ae
    ]), Rs = i.useMemo(() => S.questions.some((l) => mn(se[l.id])), [
      S.questions,
      se
    ]), Os = i.useCallback(() => {
      if (Rs) {
        vn(true);
        return;
      }
      re.start();
    }, [
      Rs,
      re
    ]);
    i.useEffect(() => {
      if (!(!c || !d || !u)) return u(t.jsx(xl, {
        stopwatch: re,
        onRequestStart: Os
      })), () => u(null);
    }, [
      c,
      d,
      u,
      re.displayMs,
      re.running,
      re.started,
      re.start,
      re.pause,
      re.resume,
      re.stop,
      Os
    ]);
    const jo = i.useCallback((l) => {
      Be((p) => {
        const w = {
          ...p
        };
        return delete w[l.id], w;
      }), tt((p) => {
        const w = {
          ...p
        };
        return delete w[l.id], w;
      }), $e((p) => {
        const w = {
          ...p
        };
        return delete w[l.id], w;
      }), ke((p) => {
        const w = {
          ...p
        };
        for (const N of Object.keys(w)) (N === l.id || N.startsWith(`${l.id}_`)) && delete w[N];
        return w;
      });
    }, []), So = i.useCallback((l, p) => {
      fs.current[l] || Ke((w) => ({
        ...w,
        [l]: p
      }));
    }, []), Co = i.useCallback((l) => {
      re.examInProgress || (Be((p) => ({
        ...p,
        [l.id]: true
      })), $e((p) => ({
        ...p,
        [l.id]: true
      })));
    }, [
      re.examInProgress
    ]), No = i.useCallback(async (l, p) => {
      var _a2;
      if (re.examInProgress) return;
      const w = String(p ?? se[l.id] ?? "").trim();
      if (!w) {
        f({
          message: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694.",
          durationMs: 2200
        });
        return;
      }
      if (!await _()) return;
      xe(l.id), (_a2 = Se.current) == null ? void 0 : _a2.abort();
      const N = new AbortController();
      Se.current = N;
      try {
        const O = await hr({
          profiles: ye,
          question: l,
          userAnswer: w,
          signal: N.signal
        });
        tt((M) => ({
          ...M,
          [l.id]: O
        })), Be((M) => ({
          ...M,
          [l.id]: true
        })), $e((M) => ({
          ...M,
          [l.id]: true
        })), p !== void 0 && Ke((M) => ({
          ...M,
          [l.id]: p
        })), f({
          message: "\uC8FC\uAD00\uC2DD \uCC44\uC810 \uC644\uB8CC",
          durationMs: 2200
        });
      } catch (O) {
        q("\uCC44\uC810 \uC2E4\uD328", O, "\uCC44\uC810 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, [
      _,
      ye,
      q,
      f,
      re.examInProgress,
      se
    ]), $o = i.useCallback((l, p) => {
      Ke((w) => w[l] === p ? w : {
        ...w,
        [l]: p
      });
    }, []), Eo = i.useCallback((l) => {
      qt(l), Ft(true);
    }, []), Po = i.useCallback((l) => {
      $e((p) => ({
        ...p,
        [l]: !p[l]
      }));
    }, []), zo = i.useCallback((l) => {
      Sn(l);
    }, []), Io = i.useCallback((l, p) => {
      rt((w) => ({
        ...w,
        [l]: p
      }));
    }, []), Ao = i.useCallback((l, p) => {
      kn((w) => {
        if (!p.trim()) {
          const { [l]: O, ...M } = w;
          return M;
        }
        return {
          ...w,
          [l]: p
        };
      });
    }, []), Mo = i.useCallback((l) => {
      Ut((p) => {
        if (!p[l]) return p;
        const w = {
          ...p
        };
        return delete w[l], w;
      });
    }, []), wt = i.useCallback((l) => {
      var _a2;
      ((_a2 = Nn.current) == null ? void 0 : _a2.scrollToQuestionId(l)) || ($n.current = l);
    }, []);
    i.useEffect(() => {
      var _a2;
      const l = $n.current;
      l && ((_a2 = Nn.current) == null ? void 0 : _a2.scrollToQuestionId(l)) && ($n.current = null);
    }, [
      S.questions,
      wn,
      se,
      ie,
      pe,
      me
    ]);
    const Ro = async () => {
      re.examInProgress && re.stop();
      const l = S.questions.filter((N) => !(!mn(se[N.id]) || ie[N.id] || N.kind === "subjective" && me[N.id]));
      if (l.length === 0) {
        f({
          message: "\uCC44\uC810\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 2200
        });
        return;
      }
      const p = l.filter((N) => N.kind === "choice"), w = l.filter((N) => N.kind === "subjective");
      if (p.length > 0 && (Be((N) => {
        const O = {
          ...N
        };
        for (const M of p) O[M.id] = true;
        return O;
      }), $e((N) => {
        const O = {
          ...N
        };
        for (const M of p) O[M.id] = true;
        return O;
      })), w.length > 0) {
        if (!await _()) return;
        for (const N of w) {
          const O = String(se[N.id] || "").trim();
          if (O) try {
            const M = await hr({
              profiles: ye,
              question: N,
              userAnswer: O
            });
            tt((U) => ({
              ...U,
              [N.id]: M
            })), Be((U) => ({
              ...U,
              [N.id]: true
            })), $e((U) => ({
              ...U,
              [N.id]: true
            }));
          } catch {
          }
        }
      }
      f({
        message: `${l.length}\uAC1C \uD56D\uBAA9 \uCC44\uC810 \uC644\uB8CC`,
        durationMs: 2200
      });
    }, Ls = async (l) => {
      if (!await _()) return;
      xe(`sim-${l.id}`);
      const p = Yt(S.config, l), w = x.createSimilarJob({
        displayLabel: String(l.displayLabel || l.id),
        preview: l.question,
        hasRag: p.length > 0
      }), N = w;
      try {
        const O = await Yc({
          profiles: ye,
          question: l,
          config: S.config,
          sourcePaths: p,
          readText: V,
          onStep: (X) => ne(w, N, X)
        }), M = String(l.displayLabel || l.id).split("-\uC720\uC0AC")[0] || "1";
        let U = 0;
        const G = new RegExp(`^${M.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\uC720\uC0AC(\\d+)$`);
        for (const X of S.questions) {
          const Ee = String(X.displayLabel).match(G);
          (Ee == null ? void 0 : Ee[1]) && (U = Math.max(U, Number.parseInt(Ee[1], 10)));
        }
        const Y = `${M}-\uC720\uC0AC${U + 1}`, ee = {
          ...O,
          id: `gen-${Date.now()}`,
          displayLabel: Y,
          isGenerated: true,
          similarOf: {
            id: l.id,
            displayLabel: String(l.displayLabel || l.id)
          },
          ...p.length ? {
            sourcePaths: p
          } : {}
        };
        x.updateJobStep(w, {
          step: "finalize",
          status: "running",
          detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026"
        }), Z(w, ee.id);
        const H = S.questions.findIndex((X) => X.id === l.id), te = [
          ...S.questions
        ];
        te.splice(H + 1, 0, ee), pt("all"), Ut((X) => ({
          ...X,
          [ee.id]: true
        })), be({
          ...S,
          questions: te
        }), x.setJobResultQuestionId(w, ee.id), x.updateJobStep(w, {
          step: "finalize",
          status: "done",
          detail: Y,
          llmResponse: JSON.stringify(ee, null, 2)
        }), x.completeJob(w, Y), Z(w, ee.id), f({
          message: `${Y} \uC720\uC0AC\uBB38\uC81C \uCD94\uAC00`,
          durationMs: 2500
        }), await it(), window.setTimeout(() => {
          wt(ee.id);
        }, 80);
      } catch (O) {
        const M = (O instanceof Error ? O.message : "") || "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(w, M), Z(w, N), q("\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", O, "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Qs = async (l, p) => {
      var _a2;
      const w = A.llmOpts;
      if (!await _(w)) return;
      const N = (p === "point" || p === "both") && mt(l.point || ""), O = (p === "explanation" || p === "both") && ft(l.explanation || "");
      if (!N && !O) {
        f({
          message: "\uC774\uBBF8 \uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC788\uC2B5\uB2C8\uB2E4.",
          durationMs: 2200
        });
        return;
      }
      const M = `sections-${l.id}`;
      xe(M), (_a2 = Se.current) == null ? void 0 : _a2.abort();
      const U = new AbortController();
      Se.current = U;
      try {
        const G = Yt(S.config, l), Y = await nd({
          profiles: ye,
          question: l,
          missingPoint: N,
          missingExplanation: O,
          sourcePaths: G,
          readText: V,
          ...w,
          signal: U.signal
        });
        if (!Y.point && !Y.explanation) {
          f({
            message: "\uC0DD\uC131\uB41C \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
            durationMs: 2500
          });
          return;
        }
        const ee = S.questions.map((te) => te.id !== l.id ? te : {
          ...te,
          ...Y.point ? {
            point: Y.point
          } : {},
          ...Y.explanation ? {
            explanation: Y.explanation
          } : {}
        });
        be({
          ...S,
          questions: ee
        }), $e((te) => ({
          ...te,
          [l.id]: true
        }));
        const H = [];
        Y.point && H.push("\uC811\uADFC Point"), Y.explanation && H.push("\uD574\uC124"), f({
          message: `${H.join("\xB7")} \uC0DD\uC131 \uC644\uB8CC`,
          durationMs: 2200
        }), await it();
      } catch (G) {
        if (U.signal.aborted) return;
        q("\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131 \uC2E4\uD328", G, "\uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Ts = async (l, p) => {
      if (!await _()) return;
      xe(`derived-${l.id}`);
      const w = Yt(S.config, l), N = x.createDerivedJob({
        displayLabel: String(l.displayLabel || l.id),
        preview: l.question,
        hasRag: w.length > 0
      }), O = N;
      try {
        const M = await ed({
          profiles: ye,
          question: l,
          config: S.config,
          target: p,
          sourcePaths: w,
          readText: V,
          onStep: (H) => ne(N, O, H)
        }), U = Ac(S.questions, String(l.displayLabel || l.id)), G = {
          ...M,
          id: `gen-${Date.now()}`,
          displayLabel: U,
          isGenerated: true,
          similarOf: {
            id: l.id,
            displayLabel: String(l.displayLabel || l.id)
          },
          ...w.length ? {
            sourcePaths: w
          } : {}
        };
        x.updateJobStep(N, {
          step: "finalize",
          status: "running",
          detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026"
        }), Z(N, G.id);
        const Y = S.questions.findIndex((H) => H.id === l.id), ee = [
          ...S.questions
        ];
        ee.splice(Y + 1, 0, G), pt("all"), Ut((H) => ({
          ...H,
          [G.id]: true
        })), be({
          ...S,
          questions: ee
        }), x.setJobResultQuestionId(N, G.id), x.updateJobStep(N, {
          step: "finalize",
          status: "done",
          detail: U,
          llmResponse: JSON.stringify(G, null, 2)
        }), x.completeJob(N, U), Z(N, G.id), Sn(null), f({
          message: `${U} \uD30C\uC0DD\uBB38\uC81C \uCD94\uAC00`,
          durationMs: 2500
        }), await it(), window.setTimeout(() => {
          wt(G.id);
        }, 80);
      } catch (M) {
        const U = (M instanceof Error ? M.message : "") || "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(N, U), Z(N, O), q("\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", M, "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Oo = i.useCallback((l, p) => {
      var _a2;
      const w = Tt[l.id], N = ((_a2 = l.options) == null ? void 0 : _a2.length) || 0;
      return w != null && w >= 1 && w <= N ? w : p != null && p >= 1 && p <= N ? p : 1;
    }, [
      Tt
    ]), _s = async (l, p, w, N = "create") => {
      var _a2, _b;
      const O = p === l.answer, M = A.llmOpts;
      if (N === "followup") {
        const H = String(w || "").trim();
        if (!H) {
          f({
            message: "\uCD94\uAC00 \uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.",
            durationMs: 2200
          });
          return;
        }
        if (!await _(M)) return;
        const te = Ze(l.id, p), X = String(et.current[te] || "").trim();
        if (!X) {
          f({
            message: "\uBA3C\uC800 \uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uC138\uC694.",
            durationMs: 2200
          });
          return;
        }
        xe(te), (_a2 = Se.current) == null ? void 0 : _a2.abort();
        const Ee = new AbortController();
        Se.current = Ee;
        const Ce = H.slice(0, 60);
        try {
          const Pe = await Zc({
            profiles: ye,
            question: l,
            selectedOption: p,
            existingAnalysis: X,
            userQuestion: H,
            ...M,
            signal: Ee.signal,
            onChunk: (Zo) => {
              const Yo = Fi(X, Zo);
              ke((ei) => ({
                ...ei,
                [te]: Yo
              }));
            }
          }), yt = qi(Pe, Ce), Xo = Bi(X, yt, Ce), On = {
            ...et.current,
            [te]: Xo
          };
          et.current = On, ke(On), Ue(null), await it(On);
        } catch (Pe) {
          if (Ee.signal.aborted) return;
          ke((yt) => ({
            ...yt,
            [te]: X
          })), q("\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328", Pe, "\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328");
        } finally {
          xe(null);
        }
        return;
      }
      const U = Ui(w, O);
      if (!await _(M)) return;
      const G = Ze(l.id, p), Y = N === "regenerate" ? String(et.current[G] || "").trim() : "";
      xe(G), N !== "regenerate" && ke((H) => ({
        ...H,
        [G]: ""
      })), (_b = Se.current) == null ? void 0 : _b.abort();
      const ee = new AbortController();
      Se.current = ee;
      try {
        const H = await Xc({
          profiles: ye,
          question: l,
          selectedOption: p,
          userInstructions: U,
          ...M,
          signal: ee.signal,
          onChunk: (Ee) => {
            const Ce = N === "regenerate" ? Gi(Y, Ee) : Ee;
            ke((Pe) => ({
              ...Pe,
              [G]: Ce
            }));
          }
        }), te = N === "regenerate" ? Wi(Y, H) : H, X = {
          ...et.current,
          [G]: te
        };
        et.current = X, ke(X), Ue(null), await it(X);
      } catch (H) {
        if (ee.signal.aborted) return;
        ke((te) => {
          const X = {
            ...te
          };
          return N === "regenerate" && Y ? X[G] = Y : String(X[G] || "").trim() || delete X[G], X;
        }), q("\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328", H, "\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Ds = async (l) => {
      var _a2, _b, _c2;
      const p = S.config.sourcePaths.length, w = vr(S.config);
      if (!p) {
        xt(true), f({
          message: "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C\uB97C \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.",
          durationMs: 2800
        });
        return;
      }
      if (!w.length) {
        xt(true), f({
          message: "\uC0AC\uC6A9 \uC911\uC778 \uADFC\uAC70 \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uBC15\uC2A4\uB85C \uADFC\uAC70\uB97C \uD65C\uC131\uD654\uD558\uC138\uC694.",
          durationMs: 3200
        });
        return;
      }
      if (!await _()) return;
      xe("gen-sources"), (_a2 = Se.current) == null ? void 0 : _a2.abort();
      const N = new AbortController();
      Se.current = N;
      const O = x.createSourceJob({
        preview: ((_b = S.questions[0]) == null ? void 0 : _b.question) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C",
        topic: l
      }), M = O;
      try {
        const U = await sd({
          profiles: ye,
          config: S.config,
          sourcePaths: w,
          topic: l,
          kind: "choice",
          count: 1,
          exampleQuestions: S.questions,
          readText: V,
          signal: N.signal,
          onStep: (Ce) => ne(O, M, Ce)
        });
        if (!U.length) throw new Error("\uC0DD\uC131\uB41C \uBB38\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
        const G = Number.parseInt(ss(S.questions), 10) || 1, Y = Date.now(), ee = U.map((Ce, Pe) => ({
          ...Ce,
          id: `gen-src-${Y}-${Pe}`,
          displayLabel: String(G + Pe),
          isGenerated: true,
          ...w.length ? {
            sourcePaths: [
              ...w
            ]
          } : {}
        })), H = (_c2 = ee[0]) == null ? void 0 : _c2.id, te = ee.map((Ce) => Ce.displayLabel).join(", "), X = H || O;
        x.updateJobStep(O, {
          step: "finalize",
          status: "running",
          detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026"
        }), Z(O, X);
        const Ee = [
          ...S.questions,
          ...ee
        ];
        pt("all"), H && Ut((Ce) => {
          const Pe = {
            ...Ce
          };
          for (const yt of ee) Pe[yt.id] = true;
          return Pe;
        }), be({
          ...S,
          questions: Ee
        }), H && x.setJobResultQuestionId(O, H), x.updateJobStep(O, {
          step: "finalize",
          status: "done",
          detail: te,
          llmResponse: JSON.stringify(ee, null, 2)
        }), x.completeJob(O, te), Z(O, X), f({
          message: `\uADFC\uAC70 \uAE30\uBC18 \uBB38\uC81C ${ee.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        }), await it(), H && window.setTimeout(() => {
          wt(H);
        }, 80);
      } catch (U) {
        if (N.signal.aborted) {
          x.failJob(O, "\uCDE8\uC18C\uB428"), Z(O, M);
          return;
        }
        const G = (U instanceof Error ? U.message : "") || "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(O, G), Z(O, M), q("\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", U, "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Fs = i.useRef(Ds);
    Fs.current = Ds;
    const Lo = i.useCallback((l) => {
      Fs.current(l);
    }, []), Qo = i.useCallback(async ({ instructions: l, form: p }) => {
      var _a2, _b;
      if (!he || !await _()) return null;
      (_a2 = Se.current) == null ? void 0 : _a2.abort();
      const w = new AbortController();
      Se.current = w;
      const N = Ur(p, he.displayLabel);
      N.id = he.id, N.displayLabel = he.displayLabel, he.similarOf && (N.similarOf = he.similarOf), he.isGenerated && (N.isGenerated = he.isGenerated);
      const O = Yt(S.config, N);
      try {
        const M = await ad({
          profiles: ye,
          question: N,
          config: S.config,
          userInstructions: l,
          sourcePaths: O,
          readText: V,
          signal: w.signal
        }), U = Te(N, S.config.choiceCount), G = {
          kind: M.kind,
          displayLabel: he.displayLabel,
          question: M.question,
          point: M.point,
          explanation: M.explanation,
          ...((_b = p.sourcePaths) == null ? void 0 : _b.length) ? {
            sourcePaths: p.sourcePaths
          } : {}
        };
        if (M.kind === "subjective") G.answerStyle = M.answerStyle === "essay" ? "essay" : "short", G.modelAnswer = M.modelAnswer || "";
        else {
          const Y = [
            ...M.options || []
          ];
          G.options = Ye(Y, U), G.answer = M.answer && M.answer >= 1 ? M.answer : 1;
        }
        return f({
          message: "\uBB38\uD56D\uC744 \uAD50\uC815\uD588\uC2B5\uB2C8\uB2E4. \uB0B4\uC6A9\uC744 \uD655\uC778\uD55C \uB4A4 \uC800\uC7A5\uD558\uC138\uC694.",
          durationMs: 3200
        }), G;
      } catch (M) {
        return w.signal.aborted || q("\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328", M, "\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328"), null;
      }
    }, [
      S.config,
      he,
      _,
      ye,
      V,
      q,
      f
    ]), To = i.useMemo(() => ({
      getPresignedUrl: o,
      currentNotePath: (r == null ? void 0 : r.id) ?? null,
      hydrationEnabled: d
    }), [
      r == null ? void 0 : r.id,
      d,
      o
    ]), qs = i.useRef(_s);
    qs.current = _s;
    const Bs = i.useRef(Ls);
    Bs.current = Ls;
    const Us = i.useRef(Qs);
    Us.current = Qs;
    const Gs = i.useRef(Vt);
    Gs.current = Vt;
    const An = i.useRef(ue);
    An.current = ue;
    const Mn = i.useRef(ot);
    Mn.current = ot;
    const Ws = i.useRef(Ts);
    Ws.current = Ts;
    const _o = i.useCallback((l) => {
      Bs.current(l);
    }, []), Do = i.useCallback((l, p) => {
      Us.current(l, p);
    }, []), Fo = i.useCallback((l) => {
      const p = Gs.current, w = An.current;
      !p || !w || qs.current(p, w.option, l, w.mode);
    }, []), qo = i.useCallback(() => {
      const l = An.current;
      if (!l) return;
      const p = Ze(l.questionId, l.option);
      Ve !== p && Ue(null);
    }, [
      Ve
    ]), Bo = i.useCallback(() => {
      const l = Mn.current;
      l && Ve === `derived-${l.id}` || Sn(null);
    }, [
      Ve
    ]), Uo = i.useCallback((l) => {
      const p = Mn.current;
      p && Ws.current(p, l);
    }, []), Go = i.useCallback(() => ps(false), []), Wo = i.useCallback((l) => {
      pt("all"), wt(l);
    }, [
      wt
    ]), Jo = i.useCallback(() => {
      Bt({
        paths: de.current.config.sourcePaths,
        scope: "file"
      });
    }, []), Ho = i.useCallback(() => {
      ht(null);
    }, []);
    if (!c) return t.jsx("div", {
      className: "quiz-pane flex flex-1 items-center justify-center text-sm text-gray-400",
      children: "\uD0ED\uC744 \uC120\uD0DD\uD558\uBA74 \uD034\uC988\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4"
    });
    const Rn = J.total > 0 ? Math.round(J.answered / J.total * 100) : 0, Js = J.total > 0 && !go, Hs = J.total > 0 && !bo, Ko = re.examInProgress, Vo = t.jsxs("div", {
      className: "flex items-center gap-1.5 text-xs text-slate-500 dark:text-odp-muted",
      "aria-label": `\uC815\uB2F5 ${J.correct}, \uBD80\uBD84\uC815\uB2F5 ${J.partial}, \uC624\uB2F5 ${J.wrong}`,
      children: [
        t.jsxs("span", {
          children: [
            "\uC815\uB2F5",
            " ",
            t.jsx("span", {
              className: "font-bold tabular-nums text-emerald-600 dark:text-emerald-400",
              children: J.correct
            })
          ]
        }),
        t.jsx("span", {
          className: "text-slate-300 dark:text-odp-borderSoft",
          "aria-hidden": true,
          children: "|"
        }),
        t.jsxs("span", {
          children: [
            "\uBD80\uBD84",
            " ",
            t.jsx("span", {
              className: "font-bold tabular-nums text-amber-600 dark:text-amber-400",
              children: J.partial
            })
          ]
        }),
        t.jsx("span", {
          className: "text-slate-300 dark:text-odp-borderSoft",
          "aria-hidden": true,
          children: "|"
        }),
        t.jsxs("span", {
          children: [
            "\uC624\uB2F5",
            " ",
            t.jsx("span", {
              className: "font-bold tabular-nums text-rose-500 dark:text-rose-400",
              children: J.wrong
            })
          ]
        })
      ]
    });
    return t.jsx(ja, {
      value: To,
      children: t.jsx(Mt, {
        delayDuration: 250,
        skipDelayDuration: 0,
        children: t.jsxs("div", {
          className: `quiz-pane relative flex min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-odp-bg${d ? "" : " pointer-events-none"}`,
          ...d ? {} : {
            inert: true
          },
          "aria-hidden": d ? void 0 : true,
          children: [
            t.jsx("div", {
              className: "min-w-0 shrink-0 border-b border-slate-200 bg-white/90 px-4 py-3 dark:border-odp-borderSoft dark:bg-odp-surface",
              children: t.jsxs("div", {
                className: "flex min-w-0 flex-wrap items-center gap-2 overflow-hidden",
                children: [
                  t.jsxs("div", {
                    className: "mr-auto flex min-w-0 flex-1 basis-full items-center gap-2 sm:basis-auto sm:gap-3",
                    children: [
                      t.jsx(oa, {
                        className: "shrink-0 text-blue-600",
                        size: 18
                      }),
                      t.jsx("span", {
                        className: "shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                        children: "\uD034\uC988 \uBAA8\uB4DC"
                      }),
                      J.total > 0 ? t.jsx("div", {
                        className: `${kr} flex-1`,
                        "aria-hidden": !Js,
                        children: t.jsx(an, {
                          initial: false,
                          children: Js ? t.jsxs(We.div, {
                            className: "flex w-full min-w-0 items-center gap-2 overflow-hidden sm:gap-3",
                            initial: {
                              opacity: 0
                            },
                            animate: {
                              opacity: 1
                            },
                            exit: {
                              opacity: 0
                            },
                            transition: {
                              duration: 0.2,
                              ease: "easeOut"
                            },
                            children: [
                              t.jsxs("p", {
                                className: "hidden shrink-0 overflow-hidden text-xs whitespace-nowrap text-slate-600 dark:text-odp-muted md:inline",
                                children: [
                                  "\uCD1D",
                                  " ",
                                  t.jsx("span", {
                                    className: "font-semibold text-slate-800 dark:text-odp-fgStrong",
                                    children: J.total
                                  }),
                                  "\uBB38\uD56D \uC911",
                                  " ",
                                  t.jsx("span", {
                                    className: "font-semibold text-blue-600 dark:text-blue-400",
                                    children: J.answered
                                  }),
                                  "\uBB38\uD56D \uD480\uC774"
                                ]
                              }),
                              t.jsxs("span", {
                                className: "shrink-0 text-xs font-semibold whitespace-nowrap tabular-nums text-slate-600 dark:text-odp-muted md:hidden",
                                children: [
                                  J.answered,
                                  "/",
                                  J.total
                                ]
                              }),
                              t.jsx("div", {
                                className: "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft",
                                role: "progressbar",
                                "aria-valuenow": J.answered,
                                "aria-valuemin": 0,
                                "aria-valuemax": J.total,
                                "aria-label": `\uD480\uC774 \uC9C4\uD589 ${J.answered} / ${J.total}`,
                                children: t.jsx(We.div, {
                                  className: "h-full rounded-full bg-blue-500",
                                  initial: false,
                                  animate: {
                                    width: `${Rn}%`
                                  },
                                  transition: {
                                    duration: 0.3,
                                    ease: "easeOut"
                                  }
                                })
                              }),
                              t.jsxs("span", {
                                className: "shrink-0 text-[11px] font-medium whitespace-nowrap tabular-nums text-slate-500 dark:text-odp-muted",
                                children: [
                                  Rn,
                                  "%"
                                ]
                              })
                            ]
                          }, "quiz-header-progress") : null
                        })
                      }) : null
                    ]
                  }),
                  J.total > 0 ? t.jsx("div", {
                    className: `${kr} shrink-0`,
                    "aria-hidden": !Hs,
                    children: t.jsx(an, {
                      initial: false,
                      children: Hs ? t.jsx(We.div, {
                        initial: {
                          opacity: 0
                        },
                        animate: {
                          opacity: 1
                        },
                        exit: {
                          opacity: 0
                        },
                        transition: {
                          duration: 0.2,
                          ease: "easeOut"
                        },
                        className: "overflow-hidden whitespace-nowrap",
                        children: Vo
                      }, "quiz-header-score") : null
                    })
                  }) : null,
                  t.jsxs(pa, {
                    children: [
                      t.jsx(xa, {
                        asChild: true,
                        children: t.jsxs(D, {
                          type: "button",
                          variant: "secondary",
                          size: "sm",
                          children: [
                            t.jsx(Ys, {
                              size: 14
                            }),
                            "\uBB38\uC81C \uCD94\uAC00",
                            t.jsx(ns, {
                              size: 14,
                              className: "opacity-70",
                              "aria-hidden": true
                            })
                          ]
                        })
                      }),
                      t.jsx(ha, {
                        children: t.jsxs(ga, {
                          className: Ad,
                          sideOffset: 6,
                          align: "start",
                          children: [
                            t.jsxs(er, {
                              className: wr,
                              onSelect: () => {
                                qt(null), Ft(true);
                              },
                              children: [
                                t.jsx(xn, {
                                  size: 14,
                                  "aria-hidden": true
                                }),
                                "\uC9C1\uC811\uCD94\uAC00"
                              ]
                            }),
                            t.jsxs(er, {
                              className: wr,
                              onSelect: () => Cn(true),
                              children: [
                                t.jsx(ia, {
                                  size: 14,
                                  "aria-hidden": true
                                }),
                                "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"
                              ]
                            })
                          ]
                        })
                      })
                    ]
                  }),
                  t.jsxs(D, {
                    type: "button",
                    variant: "secondary",
                    size: "sm",
                    onClick: Ms,
                    children: [
                      t.jsx(Or, {
                        size: 14
                      }),
                      "\uCD08\uAE30\uD654"
                    ]
                  }),
                  t.jsxs(D, {
                    type: "button",
                    variant: "primary",
                    size: "sm",
                    onClick: () => {
                      Ro();
                    },
                    children: [
                      t.jsx(Rr, {
                        size: 14
                      }),
                      "\uC804\uCCB4 \uCC44\uC810"
                    ]
                  }),
                  t.jsxs(D, {
                    type: "button",
                    variant: As.active > 0 ? "primary" : "secondary",
                    size: "sm",
                    "aria-pressed": Dt,
                    onClick: () => {
                      xt((l) => (l && ht(null), !l));
                    },
                    children: [
                      t.jsx(Lr, {
                        size: 14
                      }),
                      "\uADFC\uAC70"
                    ]
                  }),
                  t.jsx(D, {
                    type: "button",
                    variant: yn ? "primary" : "tertiary",
                    size: "sm",
                    "aria-label": "\uBAA9\uCC28",
                    "aria-pressed": yn,
                    onClick: () => ps((l) => !l),
                    children: t.jsx(Qr, {
                      size: 14
                    })
                  })
                ]
              })
            }),
            t.jsxs("div", {
              className: "flex min-h-0 flex-1 overflow-hidden",
              children: [
                t.jsx("div", {
                  className: "relative min-h-0 min-w-0 flex-1",
                  children: t.jsx("div", {
                    ref: bt,
                    className: "h-full min-h-0 overflow-y-auto px-4 py-4",
                    children: t.jsxs("div", {
                      className: "mx-auto max-w-3xl space-y-4",
                      children: [
                        t.jsx(kd, {
                          profiles: ye,
                          profileId: A.profileId,
                          model: A.model,
                          onProfileIdChange: A.onProfileIdChange,
                          onModelChange: A.onModelChange
                        }),
                        t.jsxs("div", {
                          className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface",
                          children: [
                            t.jsxs("div", {
                              ref: gs,
                              children: [
                                t.jsxs("div", {
                                  className: "mb-2 flex justify-between text-xs font-semibold text-slate-600 dark:text-odp-muted",
                                  children: [
                                    t.jsx("span", {
                                      children: "\uD480\uC774 \uC9C4\uD589\uB960"
                                    }),
                                    t.jsxs("span", {
                                      children: [
                                        J.answered,
                                        " / ",
                                        J.total
                                      ]
                                    })
                                  ]
                                }),
                                t.jsx("div", {
                                  className: "mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft",
                                  children: t.jsx(We.div, {
                                    className: "h-full rounded-full bg-blue-500",
                                    initial: false,
                                    animate: {
                                      width: `${Rn}%`
                                    },
                                    transition: {
                                      duration: 0.3,
                                      ease: "easeOut"
                                    }
                                  })
                                })
                              ]
                            }),
                            t.jsxs("div", {
                              className: "flex flex-wrap items-center justify-between gap-3",
                              children: [
                                t.jsxs("div", {
                                  className: "flex gap-4 text-center text-xs",
                                  children: [
                                    t.jsxs("div", {
                                      children: [
                                        t.jsx("div", {
                                          className: "text-xl font-black text-slate-800 dark:text-odp-fgStrong",
                                          children: J.scorePercent != null ? `${J.scorePercent}\uC810` : "-"
                                        }),
                                        t.jsx("div", {
                                          className: "text-[10px] text-slate-400",
                                          children: "\uC810\uC218"
                                        })
                                      ]
                                    }),
                                    t.jsxs("div", {
                                      ref: bs,
                                      className: "flex gap-4 text-center text-xs",
                                      children: [
                                        t.jsxs("div", {
                                          children: [
                                            t.jsx("div", {
                                              className: "text-lg font-bold text-emerald-600",
                                              children: J.correct
                                            }),
                                            t.jsx("div", {
                                              className: "text-[10px] text-slate-400",
                                              children: "\uC815\uB2F5"
                                            })
                                          ]
                                        }),
                                        t.jsxs("div", {
                                          children: [
                                            t.jsx("div", {
                                              className: "text-lg font-bold text-amber-600",
                                              children: J.partial
                                            }),
                                            t.jsx("div", {
                                              className: "text-[10px] text-slate-400",
                                              children: "\uBD80\uBD84"
                                            })
                                          ]
                                        }),
                                        t.jsxs("div", {
                                          children: [
                                            t.jsx("div", {
                                              className: "text-lg font-bold text-rose-500",
                                              children: J.wrong
                                            }),
                                            t.jsx("div", {
                                              className: "text-[10px] text-slate-400",
                                              children: "\uC624\uB2F5"
                                            })
                                          ]
                                        })
                                      ]
                                    })
                                  ]
                                }),
                                t.jsx("div", {
                                  className: "flex gap-1 rounded-xl bg-slate-100 p-1 text-xs dark:bg-odp-bgSoft",
                                  children: [
                                    [
                                      "all",
                                      "\uC804\uCCB4"
                                    ],
                                    [
                                      "wrong",
                                      "\uC624\uB2F5\uB9CC"
                                    ],
                                    [
                                      "unanswered",
                                      "\uBBF8\uD480\uC774"
                                    ]
                                  ].map(([l, p]) => t.jsx("button", {
                                    type: "button",
                                    className: `rounded-lg px-2.5 py-1 font-medium ${wn === l ? "bg-white shadow-sm dark:bg-odp-surface" : "text-slate-600 dark:text-odp-muted"}`,
                                    onClick: () => pt(l),
                                    children: p
                                  }, l))
                                })
                              ]
                            }),
                            t.jsx(hl, {
                              log: we
                            })
                          ]
                        }),
                        S.questions.length === 0 ? t.jsxs("div", {
                          className: "rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-odp-borderSoft dark:bg-odp-surface",
                          children: [
                            t.jsx("p", {
                              className: "mb-3 text-sm font-semibold text-slate-700 dark:text-odp-fgStrong",
                              children: "\uB4F1\uB85D\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"
                            }),
                            t.jsxs("div", {
                              className: "flex flex-wrap justify-center gap-2",
                              children: [
                                t.jsxs(D, {
                                  type: "button",
                                  variant: "primary",
                                  onClick: () => Ft(true),
                                  children: [
                                    t.jsx(Ys, {
                                      size: 14
                                    }),
                                    "\uBB38\uC81C \uCD94\uAC00"
                                  ]
                                }),
                                t.jsx(D, {
                                  type: "button",
                                  variant: "secondary",
                                  onClick: () => Cn(true),
                                  children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"
                                })
                              ]
                            })
                          ]
                        }) : null,
                        S.questions.length > 0 ? t.jsx(Fl, {
                          ref: Nn,
                          questions: S.questions,
                          filter: wn,
                          scrollRef: bt,
                          userAnswers: se,
                          graded: ie,
                          subjGrades: me,
                          isSubmitted: pe,
                          expVisible: io,
                          wrongExpsByQuestion: wo,
                          questionMemos: ae,
                          freshQuestionIds: co,
                          busyId: Ve,
                          examInProgress: Ko,
                          resolveWrongExpFocusOption: Oo,
                          onAnswerCommit: $o,
                          onSelectOption: So,
                          onEditQuestion: Eo,
                          onGradeChoice: Co,
                          onGradeSubjective: No,
                          onRetry: jo,
                          onToggleExplanation: Po,
                          onSimilar: _o,
                          onDerived: zo,
                          onGenerateSections: Do,
                          onWrongExpFocusChange: Io,
                          onOpenAnalysisDock: yo,
                          onMemoSave: Ao,
                          onClearFresh: Mo
                        }) : null
                      ]
                    })
                  })
                }),
                t.jsx(La, {
                  open: ot != null,
                  question: ot,
                  defaultChoiceCount: S.config.choiceCount || 4,
                  busy: ot != null && Ve === `derived-${ot.id}`,
                  onClose: Bo,
                  onSubmit: Uo
                }),
                t.jsx(Wl, {
                  open: !!(ue && Vt),
                  question: Vt,
                  option: (ue == null ? void 0 : ue.option) ?? null,
                  mode: (ue == null ? void 0 : ue.mode) ?? "create",
                  existingAnalysis: ue && ue.mode === "followup" ? String(Le[Ze(ue.questionId, ue.option)] || "") : "",
                  llmProfiles: ye,
                  profileId: A.profileId,
                  model: A.model,
                  onProfileIdChange: A.onProfileIdChange,
                  onModelChange: A.onModelChange,
                  busy: ue != null && Ve === Ze(ue.questionId, ue.option),
                  onClose: qo,
                  onGenerate: Fo
                }),
                t.jsx(xc, {
                  path: ao,
                  onClose: Ho,
                  loadDocument: W,
                  onOpenDocument: T,
                  onOpenInNewTab: le
                }),
                t.jsx(lc, {
                  open: Dt,
                  docConfig: S.config,
                  sourcePathUsage: As,
                  busyGenSources: Ve === "gen-sources",
                  onClose: st,
                  onPreview: He,
                  onRemove: po,
                  onToggleEnabled: fo,
                  onOpenPicker: Jo,
                  onGenerateFromTopic: Lo,
                  onDropHostChange: ho
                }),
                t.jsx(Cc, {
                  open: yn,
                  questions: S.questions,
                  userAnswers: se,
                  gradedQuestions: ie,
                  isSubmitted: pe,
                  subjectiveGrades: me,
                  onClose: Go,
                  onNavigate: Wo
                })
              ]
            }),
            xs ? t.jsx(rl, {
              isOpen: xs,
              onClose: () => {
                Ft(false), qt(null);
              },
              styleTemplate: ko,
              initial: he,
              nextLabel: ss(S.questions),
              onSubmit: (l) => {
                be(he ? {
                  ...S,
                  questions: S.questions.map((p) => p.id === he.id ? l : p)
                } : {
                  ...S,
                  questions: [
                    ...S.questions,
                    l
                  ]
                }), qt(null);
              },
              onOpenSourcePicker: (l, p) => Bt({
                paths: l,
                scope: "question",
                onDone: p
              }),
              ...he ? {
                onFixWithAi: Qo
              } : {}
            }) : null,
            hs ? t.jsx(ll, {
              isOpen: hs,
              onClose: () => Cn(false),
              current: S,
              onApply: (l, p) => {
                be(l), p === "replace" && Ms(), f({
                  message: `\uBB38\uC81C ${l.questions.length}\uAC1C \uC801\uC6A9`,
                  durationMs: 2500
                });
              }
            }) : null,
            Ge ? t.jsx(cl, {
              isOpen: true,
              onClose: () => Bt(null),
              tree: K,
              selected: Ge.paths,
              excludePath: (r == null ? void 0 : r.id) || null,
              onExpandFolder: Q,
              onDropHostChange: xo,
              onRegisterDropPathsMerge: (l) => {
                Cs.current = l;
              },
              onConfirm: (l) => {
                Ge.onDone ? Ge.onDone(l) : Ge.scope === "file" && be({
                  ...S,
                  config: {
                    ...S.config,
                    sourcePaths: l
                  }
                }), Bt(null);
              }
            }) : null,
            t.jsx(Kn, {
              isOpen: lo,
              title: "\uC2DC\uD5D8 \uC2DC\uC791",
              message: "\uCD08\uAE30\uD654\uD558\uACE0 \uC2DC\uD5D8\uC744 \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
              confirmLabel: "\uC2DC\uC791",
              cancelLabel: "\uCDE8\uC18C",
              variant: "danger",
              onConfirm: () => {
                vn(false), vo();
              },
              onCancel: () => vn(false)
            }),
            t.jsx(Kn, {
              isOpen: gt != null,
              title: "\uADFC\uAC70 \uBB38\uC11C \uC81C\uAC70",
              message: gt ? `\u300C${gt}\u300D\uC744(\uB97C) \uD30C\uC77C \uADFC\uAC70\uC5D0\uC11C \uC81C\uAC70\uD560\uAE4C\uC694?` : "",
              confirmLabel: "\uC81C\uAC70",
              cancelLabel: "\uCDE8\uC18C",
              variant: "danger",
              onConfirm: () => {
                gt && Pn(gt), jn(null);
              },
              onCancel: () => jn(null)
            }),
            t.jsx(pl, {
              jobs: x.jobs,
              isOpen: x.panelOpen,
              size: x.panelSize,
              onClose: x.closePanel,
              onResize: x.setPanelSize,
              onRemoveJob: x.removeJob,
              onClearFinished: x.clearFinishedJobs,
              onUserEngage: x.markPanelUserEngaged,
              onPointerEngageChange: x.markPanelPointerEngaged,
              onFocusEngageChange: x.markPanelFocusEngaged
            }),
            !x.panelOpen && x.jobs.length > 0 ? t.jsxs("button", {
              type: "button",
              className: "fixed bottom-4 right-4 z-10049 flex items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-2 text-xs font-semibold text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 dark:border-violet-700/60",
              onClick: x.openPanel,
              onMouseEnter: () => x.markPanelPointerEngaged(true),
              onMouseLeave: () => x.markPanelPointerEngaged(false),
              onFocus: () => x.markPanelFocusEngaged(true),
              onBlur: () => x.markPanelFocusEngaged(false),
              "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4 \uC5F4\uAE30",
              children: [
                t.jsx(Qe, {
                  size: 14
                }),
                "\uC0DD\uC131 \uB300\uAE30\uC5F4",
                x.hasActiveJobs ? t.jsx("span", {
                  className: "rounded-full bg-violet-400/30 px-1.5 py-0.5 text-[10px] font-bold",
                  children: "\uC9C4\uD589"
                }) : null
              ]
            }) : null
          ]
        })
      })
    });
  };
});
export {
  __tla,
  fu as default
};
