import { j as t, r as i, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { A as on, m as We } from "./vendor-motion-Dw-WnPM7.js";
import { il as Je, im as zt, io as an, _ as ln, t as kr, H as dt, T as At, ip as wr, I as D, cV as Zo, cW as Yo, iq as ei, ir as ti, is as ni, it as ss, iu as rs, iv as yr, ah as os, b6 as mn, bE as si, iw as ri, j as Hn, b4 as oi, ix as ii, iy as Kn, iz as Ln, iA as ai, iB as Ze, iC as li, iD as ci, iE as vr, iF as Vn, iG as di, iH as Xn, iI as Et, iJ as ui, iK as mi, Y as Ne, iL as fi, p as at, a0 as is, b as as, e as Sr, cd as jr, ce as Cr, q as Nr, az as $r, aA as pi, L as Pr, a2 as zr, s as Nt, ca as xi, cb as On, cc as hi, c9 as gi, iM as Zn, a1 as bi, $ as Js, d as ki, iN as Yn, iO as yt, iP as wi, iQ as vt, iR as Pt, iS as $t, iT as yi, iU as vi, iV as Si, iW as Hs, iX as Vt, iY as ji, bf as Ci, f6 as Ni, c3 as $i, bi as Pi, bj as zi, S as Qn, R as Tn, ap as _n, iZ as St, i_ as Dn, i$ as Ei, j0 as Ii, j1 as Mi, bg as Ri, am as Ai, an as Li, j2 as Oi, j3 as Qi, j4 as Ti, j5 as _i, j6 as Di, j7 as Fi, j8 as qi, j9 as Bi, __tla as __tla_1 } from "./index-D-rnPSfB.js";
import { X as qe, L as fn, be as ls, y as Er, bf as It, a1 as Ui, S as Qe, j as Ks, k as es, a6 as Gi, bg as Vs, bh as Wi, H as Ji, z as Hi, bi as Ki, J as Vi, b5 as pn, bj as Ir, o as Mr, bk as Xi, bl as Rr, E as Zi, a2 as Yi, m as ea, e as Ar, ab as ta, bm as na, a as Xs, bn as sa } from "./vendor-lucide-Cix55NOo.js";
import { v as cs, r as ra } from "./resolveVaultFileNode-D_Y1mfp9.js";
import { h as Mt, a3 as oa, a4 as ia, i as Ee, j as Ie, k as Me, l as Re, A as Ae, b as aa, d as la, S as ca, g as da, t as ua, u as ma, v as fa, w as pa, I as Zs } from "./vendor-radix-DuLpLUUM.js";
import { __tla as __tla_2 } from "./mdEditorConfig-D0bPvcMg.js";
import { u as xa } from "./useDocumentTheme-BMtI1NZn.js";
import { u as ha } from "./useWikiImageHydration-DqXm74aY.js";
import { Q as Lr } from "./QuizLlmModelPicker-Ci3Gx5h1.js";
import { i as ga, g as Ys, e as ba, __tla as __tla_3 } from "./OpenAiCompatibleModelSelect-Zog96W84.js";
import { g as ka } from "./mlxVlmGenerateClient-CuJrVMjz.js";
import "./vendor-aws-Cvd3RhZI.js";
import { __tla as __tla_4 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./appMarkdownItPlugins-CRgW3aff.js";
import { __tla as __tla_5 } from "./vendor-md-editor-DI-Txwtj.js";
import "./vendor-codemirror-0YdHorwW.js";
import "./wikiImageResolver-KQtdcTCC.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./taskCheckboxStatus-DlXLsCJg.js";
import "./styleResolve-BdJ3qVQ3.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./LlamaCppModelSelect-1dpmWwRa.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./vendor-google-genai-BsKnVxxv.js";
let iu;
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
  const Or = i.createContext({
    hydrationEnabled: true
  });
  function wa({ value: e, children: n }) {
    return t.jsx(Or.Provider, {
      value: e,
      children: n
    });
  }
  function ya() {
    return i.useContext(Or);
  }
  function Te(e, n = 4) {
    if (e.kind !== "choice") return Je(n);
    const s = (e.options || []).filter((o) => String(o || "").trim()).length, r = Math.max(s, (e.options || []).length);
    return r >= zt ? Je(r) : Je(n);
  }
  function Qr(e, n = 4) {
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
  function er(e, n) {
    const s = Qr(n, e.choiceCount);
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
  function Tr() {
    const [e, n] = i.useState(() => an());
    return i.useEffect(() => {
      const s = () => n(an());
      return window.addEventListener(ln, s), () => window.removeEventListener(ln, s);
    }, []), e;
  }
  const _r = [
    0.32,
    0.72,
    0,
    1
  ], va = {
    duration: 0
  };
  function Sa(e) {
    return e ? {
      type: "spring",
      stiffness: 380,
      damping: 36
    } : {
      type: "tween",
      duration: 0.22,
      ease: _r
    };
  }
  const ja = kr() ? {
    type: "tween",
    duration: 0.2,
    ease: _r
  } : {
    type: "spring",
    stiffness: 420,
    damping: 34
  };
  function Ca(e, n = {}) {
    const { isResizing: s = false, edge: r = "right" } = n, o = n.useLayoutWidthAnim ?? an(), a = s ? va : Sa(o);
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
  function Na() {
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
      transition: ja
    };
  }
  function $a(e, n) {
    return n ?? an() ? {
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
    const u = Tr(), m = Ca(s, {
      isResizing: r,
      edge: o,
      useLayoutWidthAnim: u
    });
    return t.jsx(on, {
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
  const Pa = 360, za = At;
  function Ea(e) {
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
  function Ia(e) {
    return e && e.kind === "subjective" ? e.answerStyle === "essay" ? "subjective-essay" : "subjective-short" : "choice";
  }
  function Ma({ open: e, question: n, defaultChoiceCount: s, busy: r = false, onClose: o, onSubmit: a }) {
    const [c, d] = i.useState("choice"), [u, m] = i.useState(s), [f, h] = i.useState(""), { width: g, handleProps: x, isResizing: b } = dt({
      storageKey: "quiz-derived-question-dock-width",
      defaultWidth: Pa,
      minWidth: 280,
      maxWidth: 560,
      edge: "right"
    }), k = i.useMemo(() => n ? Te(n, s) : s, [
      s,
      n
    ]);
    i.useEffect(() => {
      e && (d(Ia(n)), m(k), h(""));
    }, [
      e,
      n,
      k
    ]);
    const { kind: E, answerStyle: C } = Ea(c), $ = (n == null ? void 0 : n.displayLabel) || (n == null ? void 0 : n.id) || "", y = () => {
      a({
        kind: E,
        choiceCount: Je(u),
        ...E === "subjective" ? {
          answerStyle: C
        } : {},
        ...f.trim() ? {
          userPrompt: f.trim()
        } : {}
      });
    }, z = e && n != null;
    return t.jsx(Lt, {
      motionKey: "quiz-derived-question-dock",
      open: z,
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
          t.jsx(za, {
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
                      ].map(([v, S]) => {
                        const I = c === v;
                        return t.jsx("button", {
                          type: "button",
                          disabled: r,
                          className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${I ? "border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-100" : "border-slate-200 bg-white text-slate-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`,
                          onClick: () => d(v),
                          children: S
                        }, v);
                      }),
                      E === "choice" ? t.jsxs("label", {
                        className: "ml-auto flex items-center gap-1.5 text-xs text-slate-600 dark:text-odp-muted",
                        children: [
                          "\uBCF4\uAE30",
                          t.jsx("select", {
                            className: "rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                            value: u,
                            disabled: r,
                            onChange: (v) => m(Number(v.target.value) || u),
                            children: Array.from({
                              length: wr - zt + 1
                            }, (v, S) => zt + S).map((v) => t.jsxs("option", {
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
                      r ? t.jsx(fn, {
                        size: 14,
                        className: "animate-spin",
                        "aria-hidden": true
                      }) : t.jsx(ls, {
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
  const Ra = i.memo(Ma), Aa = "z-100001 max-w-[min(92vw,420px)] break-all rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", La = "flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Oa = "inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Qa = "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-violet-600 dark:bg-odp-bgSoft dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500";
  function Ta({ path: e, isDock: n, onPreview: s, muted: r }) {
    const o = cs(e), a = n ? `min-w-0 flex-1 truncate text-left hover:underline${r ? " opacity-60" : ""}` : `min-w-0 max-w-full truncate hover:underline${r ? " opacity-60" : ""}`, c = s ? t.jsx("button", {
      type: "button",
      className: a,
      onClick: () => s(e),
      children: o
    }) : t.jsx("span", {
      className: a,
      children: o
    });
    return t.jsxs(Ee, {
      children: [
        t.jsx(Ie, {
          asChild: true,
          children: c
        }),
        t.jsx(Me, {
          children: t.jsxs(Re, {
            side: "top",
            sideOffset: 6,
            className: Aa,
            children: [
              e,
              t.jsx(Ae, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Dr({ paths: e, onRemove: n, onOpenPicker: s, onPreview: r, isPathEnabled: o, onToggleEnabled: a, label: c = "\uADFC\uAC70 \uBB38\uC11C", emptyHint: d = "\uC120\uD0DD\uB41C \uADFC\uAC70 \uBB38\uC11C \uC5C6\uC74C", layout: u = "chips" }) {
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
              const g = o ? o(h) : true, x = m ? `${La}${g ? "" : " opacity-70"}` : Oa;
              return t.jsxs("li", {
                className: x,
                children: [
                  f ? t.jsx(oa, {
                    className: Qa,
                    checked: g,
                    onCheckedChange: (b) => a == null ? void 0 : a(h, b === true),
                    "aria-label": `${h} ${g ? "\uC0AC\uC6A9 \uC911" : "\uC0AC\uC6A9 \uC548 \uD568"}`,
                    children: t.jsx(ia, {
                      className: "text-white",
                      children: t.jsx(Er, {
                        size: 10,
                        strokeWidth: 3
                      })
                    })
                  }) : null,
                  t.jsx(Ta, {
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
  function _a({ text: e, previewId: n, className: s = "", getPresignedUrl: r, currentNotePath: o }) {
    const a = xa(), c = i.useRef(null), d = i.useMemo(() => String(e || ""), [
      e
    ]), u = ya(), m = r ?? u.getPresignedUrl, f = o ?? u.currentNotePath ?? null, h = u.hydrationEnabled !== false;
    return ha(c, d, m, f, {
      enabled: h
    }), t.jsx("div", {
      ref: c,
      className: `quiz-md-preview markdown-content ${s}`,
      children: t.jsx(Zo, {
        id: n,
        modelValue: d,
        theme: a === "dark" ? "dark" : "light",
        previewTheme: "default",
        codeTheme: Yo,
        language: "ko-KR",
        showCodeRowNumber: false,
        noImgZoomIn: true,
        iconfontType: void 0,
        sanitize: (g) => g
      })
    });
  }
  const _e = i.memo(_a), Da = /\*\(\s*정답\s*\)\*|\(\s*정답\s*\)|\[\s*정답\s*\]|\*\s*정답\s*\*/;
  function Fa(e) {
    return e.replace(/\*\(\s*정답\s*\)\*/g, "").replace(/\(\s*정답\s*\)/g, "").replace(/\[\s*정답\s*\]/g, "").replace(/\*\s*정답\s*\*/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/__(.*?)__/g, "$1").trim();
  }
  function qa(e) {
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
  const tr = /\*{0,2}\s*📖\s*모범\s*답안\s*:?\s*\*{0,2}/, nr = /\*{0,2}\s*💡\s*접근\s*Point!?\s*\*{0,2}/, sr = /\*{0,2}\s*📖\s*해설\s*:?\s*\*{0,2}/, cn = /\*{0,2}\s*📚\s*근거\s*문서\s*:?\s*\*{0,2}/;
  function Ba(e) {
    const n = e.join(`
`);
    if (!cn.test(n) && !n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C")) return;
    const s = n.split(cn)[1] ?? "", r = [];
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
  function Xt(e) {
    return String(e || "").replace(/^\*+\s*/, "").replace(/\s*\*+$/, "").trim();
  }
  function Ua(e) {
    const n = e.join(`
`).trim();
    if (!n) return {
      point: "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.",
      explanation: "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
    };
    let s, r = n;
    if (tr.test(r)) {
      const d = r.split(tr), m = (d[1] || "").trim().split(/(?=\*{0,2}\s*(?:💡\s*접근\s*Point!?|📖\s*해설|📚\s*근거\s*문서))/);
      s = Xt(m[0] || ""), r = [
        d[0],
        ...m.slice(1)
      ].join(`
`).trim();
    }
    r = (r.split(cn)[0] || "").trim();
    let a = "", c = "";
    if (nr.test(r) || sr.test(r)) {
      const d = r.split(sr), u = d[0] || "";
      c = Xt(d.slice(1).join(`
`)), a = Xt(u.replace(nr, ""));
    } else c = Xt(r);
    return {
      point: a || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.",
      explanation: c || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",
      ...s ? {
        modelAnswer: s
      } : {}
    };
  }
  const Ga = /^<!--\s*quiz-q-meta\s+([\s\S]*?)-->\s*$/;
  function Wa(e) {
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
  function Ja(e) {
    var _a2, _b;
    const s = (_b = (_a2 = String(e || "").match(/^(.+)-(?:유사|파생)\d+$/)) == null ? void 0 : _a2[1]) == null ? void 0 : _b.trim();
    if (s) return {
      id: s,
      displayLabel: s
    };
  }
  function rr(e, n) {
    return !n && !e ? e : e ? `${e}
${n}` : n;
  }
  function Ha(e) {
    return /^1\.\s+/.test(e.trim());
  }
  function Ka(e) {
    const n = e.trim();
    return n.startsWith(">") || /^\*\*정답:\*\*/.test(n);
  }
  function rn(e) {
    return e.trim().replace(/^>\s?/, "");
  }
  function Va(e) {
    const n = rn(e);
    return cn.test(n) || n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C");
  }
  function Xa(e) {
    return e.trim().startsWith(">");
  }
  function Za(e, n) {
    const s = e.trim();
    if (!s || !/^#+/.test(s)) return null;
    const r = s.split(`
`);
    let o = String(n + 1), a = o, c = "", d = null;
    const u = [];
    let m = 1, f;
    const h = [];
    let g = "choice", x, b, k = false, E = false, C = false;
    for (const F of r) {
      const M = F.trim(), _ = M.match(Ga);
      if (_ == null ? void 0 : _[1]) {
        const P = Wa(_[1]);
        (P == null ? void 0 : P.similarOf) && (b = P.similarOf);
        continue;
      }
      const q = M.match(/^#+\s*(?:🔖\s*)?(\d+(?:-(?:유사|파생)\d+)?)\.?(.*)/);
      if (q) {
        a = (q[1] || "").trim(), o = a;
        const P = qa((q[2] || "").trim());
        g = P.kind, x = P.answerStyle, c = P.question, k = true, E = true, C = false;
        continue;
      }
      if (!k) continue;
      if (C) {
        if (Xa(M)) {
          h.push(rn(M));
          continue;
        }
        C = false;
      }
      if (E) {
        if (Va(M)) {
          E = false, C = true, h.push(rn(M));
          continue;
        }
        if (Ha(M)) E = false;
        else if (g === "subjective" && Ka(M)) E = false;
        else if (M.startsWith("![")) {
          c = rr(c, M);
          const P = M.match(/!\[.*?\]\((.*?)\)/);
          (P == null ? void 0 : P[1]) && !d && (d = P[1]);
          continue;
        } else {
          if (!M && !c) continue;
          if (E) {
            c = rr(c, M);
            continue;
          }
        }
      }
      if (M.startsWith("![")) {
        const P = M.match(/!\[.*?\]\((.*?)\)/);
        (P == null ? void 0 : P[1]) && (d = P[1]);
        continue;
      }
      const K = M.match(/^\*\*정답:\*\*\s*(.*)$/);
      if (K) {
        f = (K[1] || "").trim();
        continue;
      }
      if (/^\d+\.\s+/.test(M)) {
        const P = M.match(/^(\d+)\.\s+(.*)/);
        if (P) {
          const A = Number.parseInt(P[1] || "0", 10), W = (P[2] || "").trim(), T = Da.test(W);
          u.push(Fa(W)), T && (m = A);
        }
        continue;
      }
      M.startsWith(">") && h.push(rn(M));
    }
    const { point: $, explanation: y, modelAnswer: z } = Ua(h), v = Ba(h), S = f || z;
    let I = g, O = x;
    return I === "choice" && u.length === 0 && S && (I = "subjective", O = f ? "short" : "essay"), I === "choice" && u.length === 0 && !S || I === "subjective" && !c || I === "choice" && (!c || u.length === 0) ? null : (b || (b = Ja(a)), c = c.trimEnd(), {
      id: o,
      displayLabel: a,
      kind: I,
      question: c,
      image: d,
      point: $,
      explanation: y,
      ...I === "subjective" && O ? {
        answerStyle: O
      } : {},
      ...I === "choice" ? {
        options: u,
        answer: m
      } : {},
      ...I === "subjective" && S ? {
        modelAnswer: S
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
  function it(e) {
    const { config: n, body: s } = ei(e), { session: r, body: o } = ti(s), a = [];
    o.split(/(?=^#+\s*(?:🔖\s*)?\d+)/m).forEach((m, f) => {
      const h = Za(m, f);
      h && a.push(h);
    });
    const d = new Set(a.map((m) => m.id)), u = r && d.size > 0 ? ni(r, d, a) : r;
    return {
      config: rs(n),
      questions: a,
      session: u && !ss(u) ? u : null
    };
  }
  function Zt(e, n) {
    return (n == null ? void 0 : n.sourcePaths) && n.sourcePaths.length > 0 ? [
      ...n.sourcePaths
    ] : yr(e);
  }
  function ts(e) {
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
  function Fr(e, n) {
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
  function Ya(e) {
    if (!String(e.question || "").trim()) return "\uC9C8\uBB38 \uBCF8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.";
    if (e.kind === "choice") {
      const n = (e.options || []).map((o) => String(o || "").trim());
      if (n.filter(Boolean).length < 2) return "\uAC1D\uAD00\uC2DD\uC740 \uCD5C\uC18C 2\uAC1C \uC120\uD0DD\uC9C0\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.";
      const r = e.answer || 0;
      return r < 1 || r > n.length || !n[r - 1] ? "\uC815\uB2F5 \uC120\uD0DD\uC9C0\uB97C \uC9C0\uC815\uD558\uC138\uC694." : null;
    }
    return String(e.modelAnswer || "").trim() ? null : e.answerStyle === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694." : "\uC815\uB2F5\uC744 \uC785\uB825\uD558\uC138\uC694.";
  }
  function el(e, n) {
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
  function tl({ isOpen: e, onClose: n, styleTemplate: s, initial: r, nextLabel: o, onSubmit: a, onOpenSourcePicker: c, onFixWithAi: d }) {
    const u = !!r, [m, f] = i.useState((r == null ? void 0 : r.kind) || s.kind), [h, g] = i.useState((r == null ? void 0 : r.answerStyle) || s.answerStyle), [x, b] = i.useState(() => r ? Te(r, s.choiceCount) : s.choiceCount), [k, E] = i.useState((r == null ? void 0 : r.question) || ""), [C, $] = i.useState(() => Ye((r == null ? void 0 : r.options) || [], r ? Te(r, s.choiceCount) : s.choiceCount)), [y, z] = i.useState((r == null ? void 0 : r.answer) || 1), [v, S] = i.useState((r == null ? void 0 : r.modelAnswer) || ""), [I, O] = i.useState((r == null ? void 0 : r.point) || ""), [B, F] = i.useState((r == null ? void 0 : r.explanation) || ""), [M, _] = i.useState((r == null ? void 0 : r.sourcePaths) || []), [q, K] = i.useState(""), [P, A] = i.useState(false), [W, T] = i.useState(""), [le, He] = i.useState(false), nt = i.useCallback((Q) => {
      const j = Je(Q);
      b(j), $((ce) => Ye(ce, j)), z((ce) => Math.min(Math.max(1, ce), j));
    }, []);
    i.useEffect(() => {
      if (!e) {
        A(false), T(""), He(false), K("");
        return;
      }
      if (r) {
        const Q = Te(r, s.choiceCount);
        f(r.kind), g(r.answerStyle === "essay" ? "essay" : "short"), b(Q), E(r.question || ""), $(Ye(r.options || [], Q)), z(r.answer || 1), S(r.modelAnswer || ""), O(r.point || ""), F(r.explanation || ""), _(r.sourcePaths || []);
      } else f(s.kind), g(s.answerStyle), b(s.choiceCount), E(""), $(Ye([], s.choiceCount)), z(1), S(""), O(""), F(""), _([]);
      A(false), T(""), K("");
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
        sourcePaths: M
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
      M
    ]), Z = () => {
      const Q = Ya(V);
      if (Q) {
        K(Q);
        return;
      }
      const j = Fr(V, o);
      r && (j.id = r.id, j.displayLabel = r.displayLabel), a(j), n();
    }, ne = async () => {
      if (!(!d || le)) {
        K(""), He(true);
        try {
          const Q = await d({
            instructions: W,
            form: V
          });
          if (!Q) return;
          const j = el(Q, x);
          f(j.kind), g(j.answerStyle), b(j.choiceCount), E(j.question), $(j.options), z(j.answer), S(j.modelAnswer), O(j.point), F(j.explanation), A(false);
        } catch (Q) {
          K((Q instanceof Error ? Q.message : "") || "\uBB38\uC81C \uACE0\uCE58\uAE30\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
        } finally {
          He(false);
        }
      }
    };
    return t.jsx(os, {
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
                variant: P ? "primary" : "secondary",
                size: "sm",
                "aria-pressed": P,
                disabled: le,
                onClick: () => A((Q) => !Q),
                children: [
                  t.jsx(It, {
                    size: 14
                  }),
                  "\uBB38\uC81C \uACE0\uCE58\uAE30"
                ]
              }) : null
            ]
          }),
          u && P && d ? t.jsxs("div", {
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
                    le ? t.jsx(fn, {
                      size: 14,
                      className: "animate-spin",
                      "aria-hidden": true
                    }) : t.jsx(It, {
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
              ].map(([Q, j]) => {
                const ce = Q === "choice" ? m === "choice" : m === "subjective" && h === (Q === "subjective-short" ? "short" : "essay");
                return t.jsx("button", {
                  type: "button",
                  className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${ce ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100" : "border-gray-200 bg-white text-gray-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`,
                  onClick: () => {
                    Q === "choice" ? f("choice") : (f("subjective"), g(Q === "subjective-short" ? "short" : "essay"));
                  },
                  children: j
                }, Q);
              }),
              m === "choice" ? t.jsxs("label", {
                className: "ml-auto flex items-center gap-1.5 text-xs text-gray-600 dark:text-odp-muted",
                children: [
                  "\uBCF4\uAE30",
                  t.jsx("select", {
                    className: "rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                    value: x,
                    onChange: (Q) => nt(Number(Q.target.value) || x),
                    children: Array.from({
                      length: wr - zt + 1
                    }, (Q, j) => zt + j).map((Q) => t.jsxs("option", {
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
                onChange: (Q) => E(Q.target.value)
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
              C.map((Q, j) => t.jsxs("div", {
                className: "flex items-start gap-2",
                children: [
                  t.jsx("input", {
                    type: "radio",
                    name: "quiz-add-answer",
                    checked: y === j + 1,
                    onChange: () => z(j + 1),
                    className: "mt-2",
                    "aria-label": `${j + 1}\uBC88 \uC815\uB2F5`
                  }),
                  t.jsx("textarea", {
                    className: "min-h-10 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                    value: Q,
                    placeholder: `${j + 1}\uBC88`,
                    onChange: (ce) => {
                      const fe = [
                        ...C
                      ];
                      fe[j] = ce.target.value, $(fe);
                    }
                  })
                ]
              }, j))
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
                onChange: (Q) => S(Q.target.value)
              }) : t.jsx("input", {
                className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: v,
                onChange: (Q) => S(Q.target.value)
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
                onChange: (Q) => O(Q.target.value)
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
          t.jsx(Dr, {
            paths: M,
            onRemove: (Q) => _((j) => j.filter((ce) => ce !== Q)),
            onOpenPicker: () => c(M, (Q) => _(Q)),
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
                  u ? t.jsx(mn, {
                    size: 14
                  }) : t.jsx(si, {
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
  function nl(e, n) {
    const s = [
      ...e
    ];
    let r = Number.parseInt(ts(e), 10) || 1;
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
  function sl(e, n, s) {
    return s.mode === "replace" ? {
      config: s.mergeConfig !== false ? rs({
        ...e.config,
        ...n.config,
        sourcePaths: n.config.sourcePaths.length > 0 ? n.config.sourcePaths : e.config.sourcePaths
      }) : e.config,
      questions: n.questions.map((o) => ({
        ...o
      }))
    } : {
      config: e.config,
      questions: nl(e.questions, n.questions)
    };
  }
  const rl = `### 1. \uB9F5\uB9AC\uB4C0\uC2A4\uC5D0 \uB300\uD55C \uC124\uBA85\uC73C\uB85C \uAC00\uC7A5 \uC801\uC808\uD55C \uAC83\uC740?

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
  function ol({ isOpen: e, onClose: n, current: s, onApply: r }) {
    const [o, a] = i.useState(""), [c, d] = i.useState("append"), [u, m] = i.useState(""), [f, h] = i.useState(false), g = (b = false) => {
      const k = it(o);
      if (!k.questions.length) {
        m("\uD30C\uC2F1\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uD615\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      if (c === "replace" && !b) {
        h(true);
        return;
      }
      const E = sl(s, k, {
        mode: c,
        mergeConfig: c === "replace"
      });
      r(E, c), n();
    }, x = (b) => {
      if (!b) return;
      const k = new FileReader();
      k.onload = () => {
        a(String(k.result || "")), m("");
      }, k.readAsText(b, "UTF-8");
    };
    return t.jsxs(t.Fragment, {
      children: [
        t.jsx(os, {
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
                      t.jsx(ri, {
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
                      a(rl), m("");
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
                      t.jsx(mn, {
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
        t.jsx(Hn, {
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
  function or(e, n) {
    const s = [], r = (o) => {
      for (const a of o) if (a.type === "folder" && a.children) r(a.children);
      else if (a.type === "file") {
        if (!(a.path || a.name || "").toLowerCase().endsWith(".md") || n && a.path === n || ii(a.path) && n && a.path === n) continue;
        s.push(a);
      }
    };
    return r(e || []), s;
  }
  function il({ isOpen: e, onClose: n, tree: s, selected: r, excludePath: o, onConfirm: a, onExpandFolder: c, onDropHostChange: d, onRegisterDropPathsMerge: u }) {
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
        for (const z of C) y.add(z);
        return [
          ...y
        ].sort((z, v) => z.localeCompare(v));
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
            const z = C(y.children);
            if (z) return z;
          }
        }
        return null;
      };
      return ((_a2 = C(x)) == null ? void 0 : _a2.children) || [];
    }, [
      x,
      h
    ]), E = (C) => {
      f(($) => $.includes(C) ? $.filter((y) => y !== C) : [
        ...$,
        C
      ]);
    };
    return t.jsx(os, {
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
                        t.jsx(oi, {
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
                          onChange: () => E(C.path)
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
              or(x, o).length ? ` / vault md ${or(x, o).length}\uAC1C` : ""
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
                  t.jsx(mn, {
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
  function al(e) {
    switch (e) {
      case "running":
        return t.jsx(fn, {
          size: 13,
          className: "animate-spin text-violet-600 dark:text-violet-300"
        });
      case "done":
        return t.jsx(Er, {
          size: 13,
          className: "text-emerald-600 dark:text-emerald-400"
        });
      case "error":
        return t.jsx(qe, {
          size: 13,
          className: "text-rose-600 dark:text-rose-400"
        });
      case "skipped":
        return t.jsx(Gi, {
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
  function Yt({ title: e, body: n }) {
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
  function ll({ step: e }) {
    var _a2, _b, _c2, _d;
    return !!((_a2 = e.systemPrompt) == null ? void 0 : _a2.trim()) || !!((_b = e.llmInstruction) == null ? void 0 : _b.trim()) || !!((_c2 = e.llmResponse) == null ? void 0 : _c2.trim()) || !!((_d = e.error) == null ? void 0 : _d.trim()) ? t.jsxs("div", {
      className: "space-y-2",
      children: [
        t.jsx(Yt, {
          title: "System prompt",
          body: e.systemPrompt || ""
        }),
        t.jsx(Yt, {
          title: "Instruction / input",
          body: e.llmInstruction || ""
        }),
        t.jsx(Yt, {
          title: "Model response / artifact",
          body: e.llmResponse || ""
        }),
        e.error ? t.jsx(Yt, {
          title: "Error",
          body: e.error
        }) : null
      ]
    }) : t.jsx("p", {
      className: "text-[10px] text-slate-400 dark:text-odp-muted",
      children: "\uC800\uC7A5\uB41C \uD504\uB86C\uD504\uD2B8/\uC751\uB2F5 \uC5C6\uC74C"
    });
  }
  function cl({ step: e, showDetail: n }) {
    const s = e.error || e.detail;
    return t.jsxs("li", {
      className: "space-y-1.5 py-0.5",
      children: [
        t.jsxs("div", {
          className: "flex items-start gap-2",
          children: [
            t.jsx("span", {
              className: "mt-0.5 shrink-0",
              children: al(e.status)
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
          children: t.jsx(ll, {
            step: e
          })
        }) : null
      ]
    });
  }
  function dl({ job: e, detailOpen: n, onToggleDetail: s, onRemove: r }) {
    const o = e.kind === "similar" ? "\uC720\uC0AC\uBB38\uC81C" : e.kind === "derived" ? "\uD30C\uC0DD\uBB38\uC81C" : "\uADFC\uAC70 \uCD9C\uC81C", a = e.kind === "similar" ? t.jsx(It, {
      size: 14,
      className: "shrink-0 text-violet-600 dark:text-violet-300"
    }) : e.kind === "derived" ? t.jsx(ls, {
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
                  children: n ? t.jsx(Ks, {
                    size: 14
                  }) : t.jsx(es, {
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
              n ? t.jsx(Ks, {
                size: 14
              }) : t.jsx(es, {
                size: 14
              }),
              n ? "\uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30"
            ]
          })
        }),
        t.jsx("ul", {
          className: "space-y-0.5 border-t border-slate-100 pt-1.5 dark:border-odp-borderSoft",
          children: e.steps.map((c) => t.jsx(cl, {
            step: c,
            showDetail: n
          }, c.id))
        })
      ]
    });
  }
  function ul({ jobs: e, isOpen: n, size: s, onClose: r, onResize: o, onRemoveJob: a, onClearFinished: c, onUserEngage: d, onPointerEngageChange: u, onFocusEngageChange: m }) {
    const f = i.useRef(null), [h, g] = i.useState({}), x = i.useRef({
      mode: null,
      startX: 0,
      startY: 0,
      startW: 0,
      startH: 0
    }), b = (v) => {
      g((S) => {
        const I = {
          ...S
        };
        return I[v] ? delete I[v] : I[v] = true, I;
      });
    }, k = i.useCallback((v, S) => {
      S.preventDefault(), S.stopPropagation(), x.current = {
        mode: v,
        startX: S.clientX,
        startY: S.clientY,
        startW: s.width,
        startH: s.height
      };
      const I = (B) => {
        const F = x.current;
        if (!F.mode) return;
        const M = F.startX - B.clientX, _ = F.startY - B.clientY;
        let q = F.startW, K = F.startH;
        (F.mode === "width" || F.mode === "both") && (q = F.startW + M), (F.mode === "height" || F.mode === "both") && (K = F.startH + _), o({
          width: q,
          height: K
        });
      }, O = () => {
        x.current.mode = null, document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", O);
      };
      document.addEventListener("pointermove", I), document.addEventListener("pointerup", O);
    }, [
      o,
      s.height,
      s.width
    ]), E = e.filter((v) => v.status === "running").length, C = e.filter((v) => v.status === "done").length, $ = e.filter((v) => v.status === "error").length, y = e.some((v) => v.status !== "running"), z = Na();
    return t.jsx(on, {
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
        initial: z.initial,
        animate: z.animate,
        exit: z.exit,
        transition: z.transition,
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
                  t.jsx(Ui, {
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
            children: e.length === 0 ? "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131 \uC791\uC5C5\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : `\uC9C4\uD589 ${E} \xB7 \uC644\uB8CC ${C}${$ > 0 ? ` \xB7 \uC2E4\uD328 ${$}` : ""}`
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
                children: t.jsx(dl, {
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
                  t.jsx(mn, {
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
  const en = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function ml({ stopwatch: e, onRequestStart: n }) {
    const { displayMs: s, running: r, started: o, start: a, pause: c, resume: d, stop: u } = e, m = n ?? a;
    return o ? t.jsx(Mt, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: t.jsxs("div", {
        className: "flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
        children: [
          t.jsx(Vs, {
            size: 14,
            className: `shrink-0 ${r ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`,
            "aria-hidden": true
          }),
          t.jsx("span", {
            className: `min-w-[3.25rem] font-mono text-sm font-bold tabular-nums ${r ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-odp-fgStrong"}`,
            "aria-live": "polite",
            children: Kn(s)
          }),
          r ? t.jsxs(Ee, {
            children: [
              t.jsx(Ie, {
                asChild: true,
                children: t.jsx(D, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: c,
                  "aria-label": "\uC77C\uC2DC\uC815\uC9C0",
                  children: t.jsx(Wi, {
                    size: 14
                  })
                })
              }),
              t.jsx(Me, {
                children: t.jsxs(Re, {
                  side: "bottom",
                  sideOffset: 6,
                  className: en,
                  children: [
                    "\uC77C\uC2DC\uC815\uC9C0",
                    t.jsx(Ae, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          }) : t.jsxs(Ee, {
            children: [
              t.jsx(Ie, {
                asChild: true,
                children: t.jsx(D, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: d,
                  "aria-label": "\uC7AC\uAC1C",
                  children: t.jsx(Ji, {
                    size: 14
                  })
                })
              }),
              t.jsx(Me, {
                children: t.jsxs(Re, {
                  side: "bottom",
                  sideOffset: 6,
                  className: en,
                  children: [
                    "\uC7AC\uAC1C",
                    t.jsx(Ae, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          }),
          t.jsxs(Ee, {
            children: [
              t.jsx(Ie, {
                asChild: true,
                children: t.jsx(D, {
                  type: "button",
                  variant: "tertiary",
                  size: "sm",
                  onClick: u,
                  "aria-label": "\uC815\uC9C0",
                  children: t.jsx(Hi, {
                    size: 14
                  })
                })
              }),
              t.jsx(Me, {
                children: t.jsxs(Re, {
                  side: "bottom",
                  sideOffset: 6,
                  className: en,
                  children: [
                    "\uC815\uC9C0",
                    t.jsx(Ae, {
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
      children: t.jsxs(Ee, {
        children: [
          t.jsx(Ie, {
            asChild: true,
            children: t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: m,
              children: [
                t.jsx(Vs, {
                  size: 14
                }),
                t.jsx("span", {
                  className: "hidden md:inline",
                  children: "\uC2DC\uD5D8 \uC2A4\uD1B1\uC6CC\uCE58"
                })
              ]
            })
          }),
          t.jsx(Me, {
            children: t.jsxs(Re, {
              side: "bottom",
              sideOffset: 6,
              className: en,
              children: [
                "\uC2DC\uD5D8 \uC2DC\uAC04 \uCE21\uC815 \uC2DC\uC791",
                t.jsx(Ae, {
                  className: "fill-white dark:fill-odp-surface"
                })
              ]
            })
          })
        ]
      })
    });
  }
  function fl({ log: e }) {
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
                    children: ai[d.type]
                  }),
                  " \xB7 ",
                  t.jsx("span", {
                    className: "tabular-nums text-blue-600 dark:text-blue-400",
                    children: Kn(d.elapsedMs)
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
                  children: Kn(c.durationMs)
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
  const pl = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", xl = "\uC2DC\uD5D8\uC774 \uB05D\uB09C \uB4A4\uC5D0 \uC804\uCCB4 \uCC44\uC810\uC744 \uD574\uC8FC\uC138\uC694";
  function ir({ examInProgress: e, disabled: n, children: s, ...r }) {
    const o = !!n || e, a = t.jsx(D, {
      type: "button",
      ...r,
      disabled: o,
      children: s
    });
    return e ? t.jsxs(Ee, {
      children: [
        t.jsx(Ie, {
          asChild: true,
          children: t.jsx("span", {
            className: "inline-flex",
            children: a
          })
        }),
        t.jsx(Me, {
          children: t.jsxs(Re, {
            side: "top",
            sideOffset: 6,
            className: pl,
            children: [
              xl,
              t.jsx(Ae, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    }) : a;
  }
  const lt = `You analyze exam multiple-choice items for similar-question generation.
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
  function qr(e) {
    return e && typeof e == "object" ? e : {};
  }
  function hl(e) {
    if (typeof e == "number" && Number.isFinite(e)) return e;
    if (typeof e == "string" && e.trim()) return e.trim();
    const n = Number(e);
    return Number.isFinite(n) ? n : String(e ?? "").trim();
  }
  function gl(e, n) {
    const s = qr(e), r = String(s.id || s.name || `var${n + 1}`).trim();
    if (!r) return null;
    const o = String(s.description || s.label || r).trim() || r, a = hl(s.originalValue ?? s.value), c = Number(s.min), d = Number(s.max), u = Number.isFinite(c) ? c : 0, m = Number.isFinite(d) ? d : u, f = Number(s.step), h = Number.isFinite(f) && f > 0 ? f : 1, g = typeof s.unit == "string" && s.unit.trim() ? s.unit.trim() : void 0;
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
  function Br(e) {
    const n = qr(e), s = String(n.coreCategory || n.category || n.topic || "").trim() || "general concept", r = !!(n.isCalculation ?? n.isCalc ?? n.calculation), a = (Array.isArray(n.variables) ? n.variables : []).map((c, d) => gl(c, d)).filter((c) => c != null);
    return {
      coreCategory: s,
      isCalculation: r,
      variables: r ? a : []
    };
  }
  function bl(e, n, s, r) {
    const o = Math.min(e, n), a = Math.max(e, n), c = s > 0 ? s : 1, d = Math.floor((a - o) / c);
    if (d < 0 || d === 0) return o;
    let u = o, m = 0;
    do {
      const f = Math.floor(Math.random() * (d + 1));
      u = o + f * c, m += 1;
    } while (m < 24 && typeof r == "number" && Number.isFinite(r) && u === r && d > 0);
    return u;
  }
  function Ur(e) {
    return e.map((n) => {
      if (typeof n.originalValue == "number" && Number.isFinite(n.originalValue)) {
        const s = bl(n.min, n.max, n.step ?? 1, n.originalValue);
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
  function ct(e) {
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
  function Gr(e) {
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
  const kl = [
    "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694.",
    "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694."
  ], wl = [
    "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
  ], yl = 12, vl = 24;
  function ut(e) {
    const n = String(e || "").trim();
    return !n || n.length < yl ? true : kl.some((s) => n === s);
  }
  function mt(e) {
    const n = String(e || "").trim();
    return !n || n.length < vl ? true : wl.some((s) => n === s);
  }
  function dn(e) {
    return !ut(String(e.point || "")) && !mt(String(e.explanation || ""));
  }
  function Wr(e) {
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
  function Jr(e) {
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
  function Sl(e) {
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
  function Hr(e) {
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
  function jl(e) {
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
  function Cl({ question: e, busyKey: n, showContent: s = true, onGenerate: r }) {
    const o = ut(e.point || ""), a = mt(e.explanation || ""), c = o || a;
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
  const Nl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-200 bg-white text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100 dark:hover:bg-rose-950/50 dark:data-[state=checked]:border-rose-500 dark:data-[state=checked]:bg-rose-600", $l = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50 dark:data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-600";
  function Pl({ question: e, focusOption: n, onFocusOptionChange: s, wrongExps: r, busyKey: o, onOpenAnalysisDock: a }) {
    var _a2;
    const c = ((_a2 = e.options) == null ? void 0 : _a2.length) || 0;
    if (c <= 0) return null;
    const d = Ze(e.id, n), u = r[d], m = u !== void 0, f = o === d, h = n === e.answer, g = h ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D", x = h ? "mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : "mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100", b = h ? "font-bold text-emerald-800 dark:text-emerald-200" : "font-bold text-rose-800 dark:text-rose-200", k = h ? "text-[11px] font-semibold text-emerald-700 dark:text-emerald-200" : "text-[11px] font-semibold text-rose-700 dark:text-rose-200", E = h ? "text-[11px] text-emerald-700/90 dark:text-emerald-200/80" : "text-[11px] text-rose-700/90 dark:text-rose-200/80", C = h ? "text-[10px] font-medium text-emerald-500 dark:text-emerald-300" : "text-[10px] font-medium text-rose-500 dark:text-rose-300", $ = h ? "bg-emerald-500 dark:bg-emerald-300" : "bg-rose-500 dark:bg-rose-300", y = h ? "ring-emerald-50 dark:ring-emerald-950" : "ring-rose-50 dark:ring-rose-950";
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
            t.jsx(aa, {
              className: "flex flex-wrap items-center gap-1",
              value: String(n),
              onValueChange: (z) => {
                const v = Number.parseInt(z, 10);
                Number.isFinite(v) && v >= 1 && s(v);
              },
              "aria-label": `${e.displayLabel}\uBC88 \uBCF4\uAE30 \uC120\uD0DD`,
              children: Array.from({
                length: c
              }, (z, v) => {
                const S = v + 1, I = Ze(e.id, S), O = r[I] !== void 0 && String(r[I] || "").trim(), B = S === e.answer, F = B ? $l : Nl;
                return t.jsxs(la, {
                  value: String(S),
                  className: `${F} ${O ? "pr-2 pl-2" : ""}`,
                  "aria-label": `${S}\uBC88${B ? " (\uC815\uB2F5)" : ""}${O ? ", \uBD84\uC11D \uC800\uC7A5\uB428" : ""}`,
                  children: [
                    t.jsx("span", {
                      children: S
                    }),
                    O ? t.jsx("span", {
                      className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ${y}`,
                      "aria-hidden": true
                    }) : null
                  ]
                }, S);
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
                className: `${E} opacity-80`,
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
                    t.jsx(Ki, {
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
                    t.jsx(Vi, {
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
              className: E,
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
                }) : t.jsx(It, {
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
  function zl({ questionId: e, value: n, onSave: s }) {
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
              t.jsx(pn, {
                size: 14
              }),
              o ? "\uBA54\uBAA8\uC218\uC815" : "\uBA54\uBAA8\uC791\uC131"
            ]
          })
        ]
      })
    });
  }
  const El = 400;
  function Il(e, n, s) {
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
      }, El);
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
  const ns = "data-quiz-q-track", Ml = 0.12;
  function Rl({ scrollRootRef: e, questions: n, running: s, getElapsedMs: r, timeLog: o, onLogChange: a }) {
    const c = i.useRef(o), d = i.useRef(a), u = i.useRef(r), m = i.useRef(n), f = i.useRef(null), h = i.useRef(null), g = i.useRef(/* @__PURE__ */ new Map());
    c.current = o, d.current = a, u.current = r, m.current = n;
    const x = i.useCallback(($) => {
      const y = f.current;
      if (!y) return;
      f.current = null, h.current = null;
      const z = u.current(), v = Math.max(0, z - y.elapsedMs);
      if (v < li) return;
      const S = {
        questionId: y.questionId,
        displayLabel: y.displayLabel,
        at: y.at,
        endedAt: $ ?? (/* @__PURE__ */ new Date()).toISOString(),
        durationMs: v
      }, I = ci(c.current, S);
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
      for (const [z, v] of g.current) v > y && (y = v, $ = z);
      return y >= Ml ? $ : null;
    }, []), E = i.useCallback(($) => {
      if (!s || $ === h.current) return;
      if (x(), !$) {
        h.current = null;
        return;
      }
      const y = m.current.find((z) => z.id === $);
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
      E(k());
    }, [
      s,
      x,
      E,
      k
    ]);
    const C = n.map(($) => $.id).join("\0");
    i.useEffect(() => {
      const $ = e.current;
      if (!$ || !s) return;
      const y = new Set(m.current.map((S) => S.id));
      g.current = new Map([
        ...g.current.entries()
      ].filter(([S]) => y.has(S)));
      const z = new IntersectionObserver((S) => {
        for (const I of S) {
          const O = I.target.getAttribute(ns);
          O && g.current.set(O, I.intersectionRatio);
        }
        E(k());
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
      return $.querySelectorAll(`[${ns}]`).forEach((S) => z.observe(S)), () => {
        z.disconnect();
      };
    }, [
      e,
      C,
      s,
      E,
      k
    ]);
  }
  const ar = ns;
  function Al({ question: e, userAnswer: n, isSubmitted: s, isQuestionGraded: r, subjectiveGrade: o, showExplanation: a, wrongExpsForQuestion: c, wrongExpFocusOption: d, questionMemo: u, busyId: m, examInProgress: f, isFresh: h, onClearFresh: g, onAnswerCommit: x, onSelectOption: b, onEditQuestion: k, onGradeChoice: E, onGradeSubjective: C, onRetry: $, onToggleExplanation: y, onSimilar: z, onDerived: v, onGenerateSections: S, onWrongExpFocusChange: I, onOpenAnalysisDock: O, onMemoSave: B }) {
    const F = String(n ?? ""), { draft: M, handleChange: _, flush: q } = Il(e.id, F, x), K = n !== void 0 && String(n).trim() !== "", P = s || r, { isWrong: A, isCorrect: W, gradeLabel: T } = i.useMemo(() => {
      let V = false, Z = false, ne = null;
      if (e.kind === "choice" && P && K && (Z = n === e.answer, V = !Z), e.kind === "subjective" && P && (Z = (o == null ? void 0 : o.verdict) === "correct", V = (o == null ? void 0 : o.verdict) === "wrong"), P) if (e.kind === "choice") K ? Z ? ne = "\uC815\uB2F5" : ne = "\uC624\uB2F5" : ne = "\uBBF8\uCC44\uC810";
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
      P,
      e.answer,
      e.kind,
      o == null ? void 0 : o.verdict,
      n
    ]), le = n, He = [
      "relative rounded-2xl border bg-white p-5 pr-16 shadow-xs dark:bg-odp-surface",
      P ? W ? "border-emerald-300" : A ? "border-rose-300" : "border-slate-200 dark:border-odp-borderSoft" : "border-slate-200 dark:border-odp-borderSoft",
      e.isGenerated ? "border-purple-300 dark:border-purple-700" : "",
      h ? "ring-2 ring-purple-300/70 dark:ring-purple-500/50" : ""
    ].filter(Boolean).join(" "), nt = t.jsxs(t.Fragment, {
      children: [
        t.jsxs(D, {
          type: "button",
          variant: "tertiary",
          size: "sm",
          className: "absolute top-3 right-3 z-10",
          onClick: () => k(e),
          children: [
            t.jsx(pn, {
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
            const ne = Z + 1, Q = le === ne, j = P, ce = e.answer === ne;
            let fe = "border-slate-200 bg-white hover:bg-slate-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft";
            return Q && !j && (fe = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/30"), j && ce ? fe = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-950/30" : j && Q && !ce && (fe = "border-rose-400 bg-rose-50 dark:bg-rose-950/30"), t.jsxs("button", {
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
              value: M,
              disabled: P,
              onChange: (V) => _(V.target.value),
              onBlur: q,
              placeholder: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694"
            }) : t.jsx("input", {
              className: "quiz-body-field w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              value: M,
              disabled: P,
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
            P ? t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: () => $(e),
              children: [
                t.jsx(Mr, {
                  size: 14
                }),
                "\uB2E4\uC2DC\uD480\uAE30"
              ]
            }) : e.kind === "choice" ? t.jsxs(ir, {
              examInProgress: f,
              size: "sm",
              disabled: !K,
              onClick: () => E(e),
              className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700",
              children: [
                t.jsx(Ir, {
                  size: 14
                }),
                "\uCC44\uC810"
              ]
            }) : t.jsxs(ir, {
              examInProgress: f,
              size: "sm",
              disabled: m === e.id || !M.trim(),
              onClick: () => {
                q(), C(e, M);
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
                t.jsx(Xi, {
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
              onClick: () => z(e),
              children: [
                t.jsx(It, {
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
                t.jsx(ls, {
                  size: 14
                }),
                "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"
              ]
            })
          ]
        }),
        P ? t.jsx(Cl, {
          question: e,
          busyKey: m,
          showContent: a,
          onGenerate: (V) => S(e, V)
        }) : null,
        P && e.kind === "choice" ? t.jsx(Pl, {
          question: e,
          focusOption: d,
          onFocusOptionChange: (V) => I(e.id, V),
          wrongExps: c,
          busyKey: m,
          onOpenAnalysisDock: (V, Z) => O(e.id, V, Z)
        }) : null,
        t.jsx(zl, {
          questionId: e.id,
          value: u,
          onSave: (V) => B(e.id, V)
        })
      ]
    });
    return h ? t.jsx(We.div, {
      id: `q-card-${e.id}`,
      [ar]: e.id,
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
      children: nt
    }) : t.jsx("div", {
      id: `q-card-${e.id}`,
      [ar]: e.id,
      className: He,
      children: nt
    });
  }
  const Ll = i.memo(Al), Ol = 12;
  function Ql(e, n, s, r, o, a) {
    var _a2;
    const c = s[e.id] !== void 0 && String(s[e.id]).trim() !== "", d = !!(a || r[e.id]);
    if (n === "unanswered" && c) return false;
    if (n !== "wrong") return true;
    let u = false;
    return e.kind === "choice" && d && c && (u = s[e.id] !== e.answer), e.kind === "subjective" && d && (u = ((_a2 = o[e.id]) == null ? void 0 : _a2.verdict) === "wrong"), d && u;
  }
  function lr(e, n, s) {
    const r = document.getElementById(`q-card-${n}`);
    if (!r) return false;
    if (!e) return r.scrollIntoView({
      behavior: s,
      block: "start"
    }), true;
    const o = e.getBoundingClientRect(), a = r.getBoundingClientRect(), c = e.scrollTop + (a.top - o.top) - Ol;
    return e.scrollTo({
      top: Math.max(0, c),
      behavior: s
    }), true;
  }
  const Tl = i.memo(i.forwardRef(function({ questions: n, filter: s, scrollRef: r, userAnswers: o, graded: a, subjGrades: c, isSubmitted: d, expVisible: u, wrongExpsByQuestion: m, questionMemos: f, freshQuestionIds: h, busyId: g, examInProgress: x, resolveWrongExpFocusOption: b, onAnswerCommit: k, onSelectOption: E, onEditQuestion: C, onGradeChoice: $, onGradeSubjective: y, onRetry: z, onToggleExplanation: v, onSimilar: S, onDerived: I, onGenerateSections: O, onWrongExpFocusChange: B, onOpenAnalysisDock: F, onMemoSave: M, onClearFresh: _ }, q) {
    const K = i.useMemo(() => n.filter((A) => Ql(A, s, o, a, c, d)), [
      s,
      a,
      d,
      n,
      c,
      o
    ]), P = i.useCallback((A) => {
      if (!K.some((le) => le.id === A)) return false;
      const T = r.current;
      return lr(T, A, "smooth") || requestAnimationFrame(() => {
        lr(T, A, "smooth");
      }), true;
    }, [
      r,
      K
    ]);
    return i.useImperativeHandle(q, () => ({
      scrollToQuestionId: P
    }), [
      P
    ]), K.length === 0 ? null : t.jsx("div", {
      className: "space-y-4",
      children: K.map((A) => {
        const W = o[A.id], T = !!(d || a[A.id]);
        return t.jsx(Ll, {
          question: A,
          userAnswer: o[A.id],
          isSubmitted: d,
          isQuestionGraded: T,
          subjectiveGrade: c[A.id],
          showExplanation: !!u[A.id],
          wrongExpsForQuestion: m[A.id] ?? {},
          wrongExpFocusOption: b(A, typeof W == "number" ? W : void 0),
          questionMemo: f[A.id] || "",
          busyId: g,
          examInProgress: x,
          isFresh: !!h[A.id],
          onClearFresh: () => _(A.id),
          onAnswerCommit: k,
          onSelectOption: E,
          onEditQuestion: C,
          onGradeChoice: $,
          onGradeSubjective: y,
          onRetry: z,
          onToggleExplanation: v,
          onSimilar: S,
          onDerived: I,
          onGenerateSections: O,
          onWrongExpFocusChange: B,
          onOpenAnalysisDock: F,
          onMemoSave: M
        }, A.id);
      })
    });
  })), _l = 320, Dl = At;
  function Fl(e, n) {
    if (n === "followup") return "\uCD94\uAC00 \uC9C8\uBB38";
    const s = e ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D";
    return n === "regenerate" ? `${s} \uC7AC\uC0DD\uC131` : s;
  }
  function ql({ open: e, question: n, option: s, mode: r, existingAnalysis: o = "", llmProfiles: a, profileId: c, model: d, onProfileIdChange: u, onModelChange: m, busy: f, onClose: h, onGenerate: g }) {
    const [x, b] = i.useState(""), { width: k, handleProps: E, isResizing: C } = dt({
      storageKey: "quiz-choice-analysis-dock-width",
      defaultWidth: _l,
      minWidth: 260,
      maxWidth: 560,
      edge: "right"
    }), $ = n != null && s != null && s === n.answer, y = Fl($, r), z = $ ? "border-emerald-200 dark:border-emerald-900/60" : "border-rose-200 dark:border-rose-900/60", v = $ ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40", S = $ ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100", I = r === "followup", O = I, B = !f && (!O || x.trim().length > 0);
    i.useEffect(() => {
      e && b("");
    }, [
      e,
      n == null ? void 0 : n.id,
      s,
      r
    ]);
    const F = i.useCallback((_) => {
      f || O && !x.trim() || _.key !== "Enter" || !_.metaKey && !_.ctrlKey || (_.preventDefault(), g(x));
    }, [
      f,
      g,
      x,
      O
    ]), M = e && n != null && s != null;
    return t.jsx(Lt, {
      motionKey: "quiz-choice-analysis-dock",
      open: M,
      width: k,
      isResizing: C,
      "aria-label": y,
      className: `flex h-full shrink-0 flex-col overflow-hidden border-l bg-white shadow-lg dark:bg-odp-surface ${z}`,
      children: n != null && s != null ? t.jsxs("div", {
        className: "relative h-full min-h-0",
        style: {
          width: k
        },
        children: [
          t.jsx(Dl, {
            edge: "left",
            handleProps: E,
            isResizing: C,
            visibleOnHover: true,
            label: "\uBD84\uC11D \uD328\uB110 \uB108\uBE44 \uC870\uC808"
          }),
          t.jsxs("div", {
            className: "flex h-full min-h-0 flex-col",
            children: [
              t.jsxs("div", {
                className: `flex items-center justify-between border-b px-3 py-2.5 ${z}`,
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
                    className: `rounded-lg px-2.5 py-2 text-[11px] ${v} ${S}`,
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
                  t.jsx(Lr, {
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
                className: `flex gap-2 border-t p-3 ${z}`,
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
  const Bl = i.memo(ql);
  function Ul({ disabled: e = false, onGenerate: n }) {
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
  const Gl = i.memo(Ul);
  function Wl(e, n) {
    var _a2;
    if (!(n.isSubmitted || !!n.gradedQuestions[e.id])) return false;
    if (e.kind === "choice") {
      const r = n.userAnswers[e.id];
      return r != null && String(r).trim() !== "" && r !== e.answer;
    }
    return ((_a2 = n.subjectiveGrades[e.id]) == null ? void 0 : _a2.verdict) === "wrong";
  }
  function Jl(e) {
    return e.questions.filter((n) => Wl(n, e));
  }
  function Hl(e) {
    return e.map((n, s) => {
      const r = String(s + 1);
      return {
        ...n,
        id: r,
        displayLabel: r
      };
    });
  }
  function Kl(e, n) {
    const s = Jl({
      questions: e.questions,
      userAnswers: n.userAnswers,
      gradedQuestions: n.gradedQuestions,
      isSubmitted: n.isSubmitted,
      subjectiveGrades: n.subjectiveGrades
    });
    if (!s.length) return null;
    const r = Hl(s), o = rs({
      ...e.config,
      sourcePaths: [
        ...e.config.sourcePaths
      ]
    });
    return {
      markdown: vr(o, r, Vn),
      questions: r,
      config: o
    };
  }
  function Vl(e) {
    return e.toLowerCase().endsWith(Xn) ? e.slice(0, -Xn.length) : e.replace(/\.md$/i, "");
  }
  function cr(e, n) {
    const s = String(e || "").trim().replace(/\\/g, "/"), r = s.lastIndexOf("/"), o = r >= 0 ? s.slice(0, r + 1) : "", a = Vl(di(s)), c = n != null && n > 1 ? `-\uD2C0\uB9B0\uBB38\uC81C-${n}` : "-\uD2C0\uB9B0\uBB38\uC81C";
    return `${o}${a}${c}${Xn}`;
  }
  async function Xl(e, n) {
    const s = cr(e);
    if (!await n(s)) return s;
    for (let r = 2; r < 100; r += 1) {
      const o = cr(e, r);
      if (!await n(o)) return o;
    }
    throw new Error("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uD034\uC988 \uD30C\uC77C \uC774\uB984\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  }
  function un(e) {
    return e != null && String(e).trim() !== "";
  }
  function Fn(e) {
    const n = {};
    for (const s of e.questions) {
      const r = un(e.userAnswers[s.id]);
      (e.isSubmitted && s.kind === "choice" ? true : !!e.gradedQuestions[s.id]) ? n[s.id] = true : r && (n[s.id] = false);
    }
    return Et({
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
  function dr(e, n) {
    const s = Et(e ?? Vn), r = Et(n ?? Vn);
    return JSON.stringify(s) === JSON.stringify(r);
  }
  function Zl(e) {
    return e != null && !ss(e);
  }
  const Yl = 320, Kr = "s3haim_quiz_source_remove_confirm", ec = At, tc = (e) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400",
    e ? "border-violet-500 bg-violet-500 shadow-sm dark:border-violet-500 dark:bg-violet-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), nc = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Vr() {
    try {
      return localStorage.getItem(Kr) === "true";
    } catch {
      return false;
    }
  }
  function sc(e) {
    try {
      localStorage.setItem(Kr, String(e));
    } catch {
    }
  }
  function rc({ open: e, docConfig: n, sourcePathUsage: s, busyGenSources: r, onClose: o, onPreview: a, onRemove: c, onToggleEnabled: d, onOpenPicker: u, onGenerateFromTopic: m, onDropHostChange: f }) {
    const [h, g] = i.useState(Vr), { width: x, handleProps: b, isResizing: k } = dt({
      storageKey: "quiz-sources-dock-width",
      defaultWidth: Yl,
      minWidth: 240,
      maxWidth: 520,
      edge: "right"
    }), E = i.useCallback((C) => {
      g(C), sc(C);
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
          t.jsx(ec, {
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
                      t.jsx(Rr, {
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
                  t.jsx(ca, {
                    id: "quiz-source-remove-confirm",
                    className: tc(h),
                    checked: h,
                    onCheckedChange: E,
                    "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uC0AD\uC81C \uC2DC \uD655\uC778",
                    children: t.jsx(da, {
                      className: nc
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
              t.jsx(Dr, {
                layout: "dock",
                paths: n.sourcePaths,
                label: "\uC120\uD0DD\uB41C \uBB38\uC11C",
                onPreview: a,
                onRemove: c,
                isPathEnabled: (C) => ui(n, C),
                onToggleEnabled: d,
                onOpenPicker: u
              }),
              t.jsx(Gl, {
                disabled: r,
                onGenerate: m
              })
            ]
          })
        ]
      })
    });
  }
  const oc = i.memo(rc), qn = "h-full min-h-[240px] w-full resize-none border-0 bg-transparent p-3 font-mono text-xs text-slate-800 outline-none dark:text-odp-fgStrong";
  function ic(e) {
    return mi(e);
  }
  function ac({ payload: e, editMode: n, editContent: s, onEditContentChange: r }) {
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
      className: qn,
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
      className: qn,
      value: s,
      onChange: (c) => r(c.target.value),
      spellCheck: false
    }) : t.jsx("iframe", {
      title: e.currentFile.name,
      srcDoc: s,
      sandbox: "",
      className: "h-full min-h-[240px] w-full border-0 bg-white"
    }) : n ? t.jsx("textarea", {
      className: qn,
      value: s,
      onChange: (c) => r(c.target.value),
      spellCheck: false
    }) : t.jsx("pre", {
      className: "overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-slate-800 dark:text-odp-fgStrong",
      children: s
    });
  }
  const lc = At, jt = "z-100001 max-w-[min(92vw,420px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function cc({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o, embedded: a = false, width: c, resizeHandleProps: d, isResizing: u, resizeEdge: m = "right" }) {
    const [f, h] = i.useState(null), [g, x] = i.useState(true), [b, k] = i.useState(""), [E, C] = i.useState(false), [$, y] = i.useState(""), z = dt({
      storageKey: a ? void 0 : "vault-document-preview-panel-width",
      defaultWidth: 400,
      minWidth: 280,
      maxWidth: 640,
      edge: m === "left" ? "left" : "right"
    }), v = c ?? z.width, S = d ?? z.handleProps, I = u ?? z.isResizing;
    i.useEffect(() => {
      let M = false, _;
      return x(true), k(""), C(false), (async () => {
        var _a2;
        try {
          const q = await s(e);
          if (M) {
            (_a2 = q == null ? void 0 : q.revoke) == null ? void 0 : _a2.call(q);
            return;
          }
          _ = q == null ? void 0 : q.revoke, h(q), y((q == null ? void 0 : q.content) ?? ""), q || k("\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        } catch (q) {
          M || (h(null), y(""), k(q instanceof Error ? q.message : "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          M || x(false);
        }
      })(), () => {
        M = true, _ == null ? void 0 : _();
      };
    }, [
      e,
      s
    ]);
    const O = i.useCallback(() => {
      C((M) => !M);
    }, []), B = cs(e), F = f ? ic(f.currentFile.viewer) : false;
    return t.jsxs("aside", {
      className: `relative flex h-full flex-col overflow-hidden bg-white dark:bg-odp-surface ${a ? "min-w-0" : "shrink-0 border-r border-slate-200 dark:border-odp-borderSoft"}`,
      style: a ? void 0 : {
        width: v
      },
      "aria-label": "\uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30",
      children: [
        t.jsx(lc, {
          edge: m,
          handleProps: S,
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
              t.jsxs(Ee, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("div", {
                      className: "min-w-0 flex-1 truncate px-1 text-xs font-semibold text-slate-800 dark:text-odp-fgStrong",
                      children: B
                    })
                  }),
                  t.jsx(Me, {
                    children: t.jsxs(Re, {
                      side: "bottom",
                      sideOffset: 6,
                      className: jt,
                      children: [
                        e,
                        t.jsx(Ae, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }),
              F ? t.jsxs(Ee, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": E ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC",
                      onClick: O,
                      children: E ? t.jsx(Zi, {
                        size: 15
                      }) : t.jsx(pn, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Me, {
                    children: t.jsxs(Re, {
                      side: "bottom",
                      sideOffset: 6,
                      className: jt,
                      children: [
                        E ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC",
                        t.jsx(Ae, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              o ? t.jsxs(Ee, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": "\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30",
                      onClick: () => o(e),
                      children: t.jsx(Yi, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Me, {
                    children: t.jsxs(Re, {
                      side: "bottom",
                      sideOffset: 6,
                      className: jt,
                      children: [
                        "\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30",
                        t.jsx(Ae, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              r ? t.jsxs(Ee, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": "\uC774 \uBB38\uC11C \uC5F4\uAE30",
                      onClick: () => r(e),
                      children: t.jsx(ea, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Me, {
                    children: t.jsxs(Re, {
                      side: "bottom",
                      sideOffset: 6,
                      className: jt,
                      children: [
                        "\uC774 \uBB38\uC11C \uC5F4\uAE30",
                        t.jsx(Ae, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              t.jsxs(Ee, {
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
                  t.jsx(Me, {
                    children: t.jsxs(Re, {
                      side: "bottom",
                      sideOffset: 6,
                      className: jt,
                      children: [
                        "\uB2EB\uAE30",
                        t.jsx(Ae, {
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
              t.jsx(fn, {
                size: 16,
                className: "animate-spin",
                "aria-hidden": true
              }),
              "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            ]
          }) : b ? t.jsx("div", {
            className: "p-4 text-sm text-rose-600 dark:text-rose-400",
            children: b
          }) : f ? t.jsx(ac, {
            payload: f,
            editMode: E,
            editContent: $,
            onEditContentChange: y
          }) : null
        })
      ]
    });
  }
  const dc = 400;
  function uc({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o }) {
    const { width: a, handleProps: c, isResizing: d } = dt({
      storageKey: "quiz-source-preview-dock-width",
      defaultWidth: dc,
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
        children: t.jsx(cc, {
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
  const mc = i.memo(uc), ur = {
    correct: "bg-emerald-500",
    partial: "bg-amber-500",
    wrong: "bg-rose-500",
    ungraded: "bg-slate-400 dark:bg-slate-500"
  }, mr = {
    correct: "\uC815\uB2F5",
    partial: "\uBD80\uBD84",
    wrong: "\uC624\uB2F5",
    ungraded: "\uBBF8\uCC44\uC810"
  };
  function fc(e) {
    return e ? typeof e.score == "number" && Number.isFinite(e.score) ? Math.min(100, Math.max(0, e.score)) / 100 : e.verdict === "correct" ? 1 : e.verdict === "partial" ? 0.5 : 0 : null;
  }
  function pc(e) {
    var _a2;
    const { question: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e, c = o || r[n.id], d = un(s[n.id]);
    if (!c) return d ? "ungraded" : null;
    if (n.kind === "choice") return d ? s[n.id] === n.answer ? "correct" : "wrong" : null;
    const u = (_a2 = a[n.id]) == null ? void 0 : _a2.verdict;
    return u === "correct" ? "correct" : u === "partial" ? "partial" : u === "wrong" ? "wrong" : null;
  }
  function xc(e) {
    const { questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e;
    let c = 0, d = 0, u = 0, m = 0, f = 0, h = 0;
    for (const b of n) {
      const k = s[b.id] !== void 0 && s[b.id] !== null && String(s[b.id]).trim() !== "";
      if (k && (m += 1), !(o || r[b.id])) continue;
      if (b.kind === "choice") {
        h += 1, s[b.id] === b.answer ? (c += 1, f += 1) : k && (d += 1);
        continue;
      }
      const C = a[b.id], $ = fc(C);
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
  const hc = 288, gc = At, bc = [
    "ungraded",
    "correct",
    "partial",
    "wrong"
  ], kc = {
    ungraded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-600",
    correct: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800",
    partial: "bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800",
    wrong: "bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800"
  }, wc = "bg-slate-100 text-slate-400 ring-1 ring-transparent dark:bg-odp-bgSoft dark:text-odp-muted";
  function yc({ open: e, questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a, onClose: c, onNavigate: d }) {
    const [u, m] = i.useState({
      ungraded: true,
      correct: true,
      partial: true,
      wrong: true
    }), { width: f, handleProps: h, isResizing: g } = dt({
      storageKey: "quiz-toc-dock-width",
      defaultWidth: hc,
      minWidth: 220,
      maxWidth: 480,
      edge: "right"
    }), x = i.useCallback((k) => {
      m((E) => ({
        ...E,
        [k]: !E[k]
      }));
    }, []), b = Tr();
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
          t.jsx(gc, {
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
                      t.jsx(Ar, {
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
                children: bc.map((k) => {
                  const E = u[k];
                  return t.jsxs("button", {
                    type: "button",
                    "aria-pressed": E,
                    "aria-label": `\uBAA9\uCC28 ${mr[k]} ${E ? "\uD45C\uC2DC" : "\uC228\uAE40"}`,
                    className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${E ? kc[k] : wc}`,
                    onClick: () => x(k),
                    children: [
                      t.jsx("span", {
                        className: `h-2 w-2 shrink-0 rounded-full ${E ? ur[k] : "bg-slate-300 dark:bg-slate-600"}`,
                        "aria-hidden": true
                      }),
                      mr[k]
                    ]
                  }, k);
                })
              })
            ]
          }),
          t.jsx("ul", {
            className: "min-h-0 flex-1 space-y-1 overflow-y-auto p-3 text-xs",
            children: n.map((k, E) => {
              var _a2, _b;
              const C = !!k.similarOf, $ = /-파생\d+$/u.test(String(k.displayLabel || "")) ? "\uD30C\uC0DD\uBB38\uC81C" : "\uC720\uC0AC\uBB38\uC81C", y = pc({
                question: k,
                userAnswers: s,
                gradedQuestions: r,
                isSubmitted: o,
                subjectiveGrades: a
              });
              if (y && !u[y]) return null;
              const z = t.jsxs("button", {
                type: "button",
                className: `flex w-full items-center gap-2 rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${C ? "ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200" : "px-2"}`,
                title: C ? `${((_a2 = k.similarOf) == null ? void 0 : _a2.displayLabel) || ((_b = k.similarOf) == null ? void 0 : _b.id)}\uC758 ${$}` : void 0,
                onClick: () => d(k.id),
                children: [
                  t.jsx("span", {
                    className: "flex h-4 w-2 shrink-0 items-center justify-center",
                    "aria-hidden": true,
                    children: y ? t.jsx("span", {
                      className: `h-2 w-2 rounded-full ${ur[y]}`
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
              }), v = $a(E, b);
              return t.jsx(We.li, {
                initial: v.initial,
                animate: v.animate,
                transition: v.transition,
                children: z
              }, k.id);
            })
          })
        ]
      })
    });
  }
  const vc = i.memo(yc);
  async function Xr(e, n) {
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
  function Zr(e) {
    const n = [], s = /* @__PURE__ */ new Set();
    for (const r of e) {
      const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
      !o || s.has(o) || (s.add(o), n.push(o));
    }
    return n;
  }
  function Sc(e) {
    return String(e || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).map((n) => n.trim()).filter((n) => n.length >= 2).slice(0, 16);
  }
  function jc(e, n) {
    if (n.length === 0) return 1;
    const s = e.toLowerCase();
    let r = 0;
    for (const o of n) s.includes(o) && (r += 1);
    return r;
  }
  async function xn(e) {
    const n = Ne(), s = e.topK ?? n.ragTopK, r = e.maxChars ?? n.ragMaxChars, o = Zr(e.sourcePaths);
    if (o.length === 0) return {
      chunks: [],
      usedFallback: false
    };
    const a = await Xr(o, e.readText);
    if (a.length === 0) return {
      chunks: [],
      usedFallback: true
    };
    const c = Sc(e.query), d = [];
    for (const f of a) fi(f.text, 12e3).forEach((g, x) => {
      g.trim() && d.push({
        path: f.path,
        excerpt: g,
        chunkIndex: x,
        score: jc(g, c)
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
  function hn(e) {
    return e.length ? e.map((n) => `---
[${n.path}]
${n.excerpt}
`).join(`
`) : "";
  }
  async function Cc(e, n, s) {
    const r = Ne(), o = Math.max(4e3, s ?? Math.min(r.ragMaxChars, 2e5)), a = Zr(e);
    return a.length ? (await Xr(a, n)).map((d) => ({
      path: d.path,
      text: d.text.length > o ? `${d.text.slice(0, o)}

\u2026(truncated)` : d.text
    })) : [];
  }
  function Nc(e) {
    return e.kind === "subjective" ? e.answerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`;
  }
  function $c(e) {
    return `${Wr(e)}

[\uD30C\uC0DD\uBB38\uD56D \uC0DD\uC131 \u2014 \uCD94\uAC00 \uADDC\uCE59]
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 \uD559\uC2B5 \uBAA9\uD45C\xB7\uD575\uC2EC \uAC1C\uB150\uC744 \uC720\uC9C0\uD558\uB418, \uC9C0\uC815\uB41C **\uCD9C\uC81C \uC720\uD615**\uC5D0 \uB9DE\uB294 \uC0C8 \uBB38\uD56D\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uAC1D\uAD00\uC2DD \u2194 \uC8FC\uAD00\uC2DD \uBCC0\uD658\uC774 \uC694\uCCAD\uB418\uBA74, \uB3D9\uC77C \uAC1C\uB150\uC744 \uD574\uB2F9 \uC720\uD615\uC5D0 \uB9DE\uAC8C \uC7AC\uAD6C\uC131\uD558\uC138\uC694.
- \uC0AC\uC6A9\uC790 \uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBC18\uB4DC\uC2DC \uBC18\uC601\uD558\uC138\uC694.`;
  }
  function Pc(e) {
    var _a2;
    const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim(), r = String(e.target.userPrompt || "").trim(), o = Nc(e.target), a = e.sourceKind === "subjective" ? e.sourceAnswerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.options.length || e.target.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`, c = e.sourceKind === "choice" && e.options.length > 0 ? `\uBCF4\uAE30: ${e.options.map((m, f) => `${f + 1}. ${m}`).join(" | ")}
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
  function zc(e, n) {
    const s = String(n || "").trim().replace(/-(?:유사|파생)\d+$/u, "") || "1", r = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = new RegExp(`^${r}-\uD30C\uC0DD(\\d+)$`);
    let a = 0;
    for (const c of e) {
      const d = String(c.displayLabel || "").match(o);
      (d == null ? void 0 : d[1]) && (a = Math.max(a, Number.parseInt(d[1], 10)));
    }
    return `${s}-\uD30C\uC0DD${a + 1}`;
  }
  const fr = ".quiz", Ec = 96e3;
  function Yr(e) {
    return String(e || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
  }
  function Ic(e) {
    const s = Yr(e).replace(/\.quiz\.md$/i, "");
    return s ? `${fr}/${s}` : fr;
  }
  function Mc(e) {
    return String(e || "").trim().replace(/[^a-zA-Z0-9._-]+/g, "_") || "log";
  }
  function Rc(e, n) {
    return `${Ic(e)}/${Mc(n)}.md`;
  }
  function oe(e, n = Ec) {
    const s = String(e || "");
    return s.length <= n ? s : `${s.slice(0, n)}

\u2026 (${s.length - n} characters truncated)`;
  }
  function Bn(e, n) {
    const s = oe(n);
    return s.trim() ? `### ${e}

\`\`\`text
${s.replace(/```/g, "`\u200B``")}
\`\`\`
` : "";
  }
  function Ac(e, n) {
    const s = `- status: ${e.status}`, r = e.detail ? `- detail: ${e.detail}` : "", o = e.error ? `- error: ${e.error}` : "", a = [
      `## Step ${n + 1}: ${e.label} (${e.id})`,
      "",
      s,
      r,
      o,
      ""
    ];
    return e.systemPrompt && a.push(Bn("System prompt", e.systemPrompt)), e.llmInstruction && a.push(Bn("Instruction / input", e.llmInstruction)), e.llmResponse && a.push(Bn("Model response / artifact", e.llmResponse)), a.filter(Boolean).join(`
`);
  }
  function Lc(e, n) {
    const s = [
      "# Quiz generation log",
      "",
      `- quiz file: ${Yr(n)}`,
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
      s.push(Ac(r, o)), s.push("---", "");
    }), `${s.join(`
`).trimEnd()}
`;
  }
  async function Oc(e) {
    const n = Rc(e.quizFilePath, e.logKey), s = Lc(e.job, e.quizFilePath);
    return await e.writeText(n, s), n;
  }
  const Qc = /^\d+\.\s*[a-zA-Z]\.\s*/, Tc = /^(?:\(\s*\d+\s*\)|\d+\)|\d+\.)\s*/, _c = /^[a-zA-Z](?:\)|\.)\s*/, Dc = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫]\s*/u, Fc = /^[가나다라마바사아자차카타파하](?:\)|\.)\s*/u;
  function qc(e) {
    let n = String(e || "").trim();
    if (!n) return n;
    for (let s = 0; s < 4; s += 1) {
      const r = n;
      if (n = n.replace(Qc, "").replace(Tc, "").replace(_c, "").replace(Dc, "").replace(Fc, "").trim(), n === r) break;
    }
    return n;
  }
  const tn = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC6A9 \uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uAC00\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uAC1C\uB150\xB7\uC815\uC758\xB7\uACF5\uC2DD\xB7\uC808\uCC28\xB7\uC0AC\uB840\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC815\uB9AC\uD558\uC138\uC694.
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC0AC\uC2E4\uC744 \uB9CC\uB4E4\uC9C0 \uB9C8\uC138\uC694.
- \uC218\uC2DD\uC740 \uC6D0\uBB38 \uD45C\uAE30\uB97C \uC720\uC9C0\uD558\uC138\uC694 ($...$ / $$...$$).
- \uC751\uB2F5\uC740 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694. JSON\xB7\uCF54\uB4DC\uD39C\uC2A4\xB7\uC11C\uB450\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
  function Bc(e, n, s) {
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
  function Uc(e) {
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
  async function Gc(e, n) {
    var _a2, _b, _c2;
    const s = Ne(), r = Array.isArray(e) ? e : [], o = at(r, ((_a2 = n == null ? void 0 : n.profileId) == null ? void 0 : _a2.trim()) || s.profileId || is());
    if (!o) return {
      ready: false,
      message: "AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
    };
    const a = (((_b = n == null ? void 0 : n.model) == null ? void 0 : _b.trim()) || ((_c2 = s.modelId) == null ? void 0 : _c2.trim()) || as(o.id, o.kind)).trim();
    if (o.kind === Sr) {
      const c = jr(), d = await Cr(c);
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
    if (o.kind === Nr) {
      const c = $r();
      let d = [];
      try {
        const m = await pi(c);
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
    return o.kind === Pr ? (o.baseUrl || "").trim() ? a ? {
      ready: true,
      profile: o,
      model: a
    } : {
      ready: false,
      message: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
    } : {
      ready: false,
      message: "OpenAI \uD638\uD658 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uB610\uB294 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\uB97C \uD655\uC778\uD558\uC138\uC694."
    } : a ? ((o.apiKey || "").trim(), {
      ready: true,
      profile: o,
      model: a
    }) : {
      ready: false,
      message: "Gemini \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
    };
  }
  function Wc(e) {
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
  function Jc(e) {
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
  function nn(e, n) {
    const s = {
      ...e
    };
    return n.signal && (s.signal = n.signal), n.onChunk && (s.onChunk = n.onChunk), s;
  }
  async function ve(e) {
    var _a2, _b, _c2;
    const n = Ne(), s = Array.isArray(e.profiles) ? e.profiles : [], r = at(s, ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) || n.profileId || is());
    if (!r) throw new Error("AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
    const o = (((_b = e.model) == null ? void 0 : _b.trim()) || ((_c2 = n.modelId) == null ? void 0 : _c2.trim()) || as(r.id, r.kind)).trim(), a = (e.systemPrompt || n.systemPrompt || "").trim(), c = e.instruction.trim(), d = {
      temperature: typeof e.temperature == "number" ? e.temperature : n.temperature
    }, u = {};
    if (e.signal && (u.signal = e.signal), e.onChunk && (u.onChunk = e.onChunk), r.kind === Pr) {
      const m = (r.baseUrl || "").trim();
      if (!m) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return Nt(r.id, o), xi(o), On(r.id, () => r.apiKey || "", (f) => Ys(nn({
        baseUrl: m,
        apiKey: f,
        model: o,
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, u)), {
        allowEmpty: true,
        missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
      });
    }
    if (r.kind === Nr) {
      const m = $r(), f = await hi(m, e.signal ? {
        signal: e.signal
      } : {}), h = (r.baseUrl || f.baseUrl || "").trim();
      if (!h) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const g = o.trim() || m.selectedModelId || f.models[0] || "";
      if (!g) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return Nt(r.id, g), On(r.id, () => r.apiKey || m.apiKey || "no-key-required", (x) => Ys(nn({
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
      const m = jr(), f = await Cr(m);
      if (!f.running) throw new Error("MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
      const h = o.trim() || m.selectedModelId || f.models[0] || "";
      if (!h) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return Nt(r.id, h), ka(nn({
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, u));
    }
    if (ga(o)) throw new Error("\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return Nt(r.id, o), gi(o), On(r.id, () => r.apiKey || "", (m) => ba(nn({
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
    const a = Array.isArray(r.options) ? r.options.map((d) => qc(String(d || ""))).slice(0, n) : [];
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
  function Se(e, n, s, r, o) {
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
  function ds(e) {
    var _a2, _b;
    const n = {};
    return e.signal && (n.signal = e.signal), e.onChunk && (n.onChunk = e.onChunk), ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) && (n.profileId = e.profileId.trim()), ((_b = e.model) == null ? void 0 : _b.trim()) && (n.model = e.model.trim()), n.signal || n.onChunk || n.profileId || n.model ? n : void 0;
  }
  async function pr(e) {
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
{"verdict":"correct"|"partial"|"wrong","score":0,"feedback":"...","rationale":"..."}`, a = await ve(Se(e.profiles, o, "\uB2F9\uC2E0\uC740 \uACF5\uC815\uD55C \uC2DC\uD5D8 \uCC44\uC810\uC704\uC6D0\uC785\uB2C8\uB2E4. JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.", n.gradeTemperature, Fe(e.signal)));
    return Jc(De(a));
  }
  async function Hc(e) {
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
    return ve(Se(e.profiles, d, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uC791\uC131\uC790\uC785\uB2C8\uB2E4.", 0.5, ds({
      signal: e.signal,
      onChunk: e.onChunk,
      profileId: e.profileId,
      model: e.model
    })));
  }
  async function Kc(e) {
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
    return ve(Se(e.profiles, o, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uD29C\uD130\uC785\uB2C8\uB2E4. \uBB38\uC81C\uC640 \uAE30\uC874 \uBD84\uC11D \uB0B4\uC6A9\uB9CC \uADFC\uAC70\uB85C \uB2F5\uD558\uC138\uC694.", 0.5, ds({
      signal: e.signal,
      onChunk: e.onChunk,
      profileId: e.profileId,
      model: e.model
    })));
  }
  async function Vc(e) {
    const n = Ne(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = Math.floor(Math.random() * r) + 1, a = (s.options || []).map((S) => String(S || "")), c = s.answer && s.answer >= 1 ? s.answer : 1, d = (S) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, S);
    };
    let u = "";
    const m = e.sourcePaths || [];
    if (m.length > 0 && e.readText) {
      d({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const { chunks: S } = await xn({
        sourcePaths: m,
        query: `${s.question}
${s.point || ""}`,
        readText: e.readText
      });
      u = hn(S), d({
        step: "rag",
        status: "done",
        detail: S.length > 0 ? `${S.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C",
        llmInstruction: `query: ${s.question}`,
        llmResponse: oe(u || "(no excerpts)")
      });
    }
    const f = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", h = Jr({
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
      systemPrompt: lt
    });
    const x = await ve(Se(e.profiles, h, lt, g, Fe(e.signal))), b = Br(De(x));
    d({
      step: "analysis",
      status: "done",
      detail: `${b.coreCategory}${b.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`,
      llmInstruction: h,
      llmResponse: oe(x),
      systemPrompt: lt
    });
    const k = ct(b);
    let E = "";
    if (b.isCalculation && b.variables.length > 0) {
      d({
        step: "randomize",
        status: "running",
        detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026"
      });
      const S = Ur(b.variables);
      E = Gr(S);
      const I = S.map((O) => `${O.id}=${O.value}${O.unit ? O.unit : ""}`).join(", ");
      d({
        step: "randomize",
        status: "done",
        detail: I,
        llmInstruction: ct(b),
        llmResponse: oe(JSON.stringify({
          samples: S,
          variables: b.variables
        }, null, 2))
      });
    } else d({
      step: "randomize",
      status: "skipped",
      detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D",
      llmResponse: oe(ct(b))
    });
    const C = Sl({
      question: s.question,
      options: a,
      answer: c,
      point: s.point || "",
      explanation: s.explanation || "",
      choiceCount: r,
      targetAnswer: o,
      complexity: f,
      analysisBlock: k,
      sampledBlock: E,
      ...u ? {
        ragBlock: u
      } : {}
    }), $ = Wr(n.systemPrompt || zr);
    d({
      step: "generate",
      status: "running",
      detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: C,
      systemPrompt: $
    });
    const y = await ve(Se(e.profiles, C, $, n.temperature, Fe(e.signal))), z = De(y);
    d({
      step: "generate",
      status: "done",
      detail: `\uC815\uB2F5 ${o}\uBC88`,
      llmInstruction: C,
      llmResponse: oe(y),
      systemPrompt: $
    });
    let v = Rt(z, r, o);
    if (!dn(v)) {
      const S = ut(v.point), I = mt(v.explanation), O = Hr({
        question: v.question,
        options: v.options || [],
        answer: v.answer || o,
        analysisBlock: k,
        missingPoint: S,
        missingExplanation: I
      });
      d({
        step: "generate",
        status: "running",
        detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026",
        llmInstruction: O,
        systemPrompt: $
      });
      const B = await ve(Se(e.profiles, O, $, Math.min(n.temperature, 0.8), Fe(e.signal))), F = De(B), M = F && typeof F == "object" ? F : {};
      S && typeof M.point == "string" && M.point.trim() && (v = {
        ...v,
        point: String(M.point).trim()
      }), I && typeof M.explanation == "string" && M.explanation.trim() && (v = {
        ...v,
        explanation: String(M.explanation).trim()
      }), d({
        step: "generate",
        status: "done",
        detail: dn(v) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644",
        llmInstruction: O,
        llmResponse: oe(B),
        systemPrompt: $
      });
    }
    return {
      ...v,
      isGenerated: true
    };
  }
  async function Xc(e) {
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
`), { chunks: O } = await xn({
        sourcePaths: f,
        query: I,
        readText: e.readText
      });
      m = hn(O), u({
        step: "rag",
        status: "done",
        detail: O.length > 0 ? `${O.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C",
        llmInstruction: `query: ${I}`,
        llmResponse: oe(m || "(no excerpts)")
      });
    }
    const h = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", g = Jr({
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
      systemPrompt: lt
    });
    const b = await ve(Se(e.profiles, g, lt, x, Fe(e.signal))), k = Br(De(b));
    u({
      step: "analysis",
      status: "done",
      detail: `${k.coreCategory}${k.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`,
      llmInstruction: g,
      llmResponse: oe(b),
      systemPrompt: lt
    });
    const E = ct(k);
    let C = "";
    if (k.isCalculation && k.variables.length > 0) {
      u({
        step: "randomize",
        status: "running",
        detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026"
      });
      const I = Ur(k.variables);
      C = Gr(I);
      const O = I.map((B) => `${B.id}=${B.value}${B.unit ? B.unit : ""}`).join(", ");
      u({
        step: "randomize",
        status: "done",
        detail: O,
        llmInstruction: ct(k),
        llmResponse: oe(JSON.stringify({
          samples: I,
          variables: k.variables
        }, null, 2))
      });
    } else u({
      step: "randomize",
      status: "skipped",
      detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D",
      llmResponse: oe(ct(k))
    });
    const $ = Pc({
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
      analysisBlock: E,
      sampledBlock: C,
      ...e.target.kind === "choice" ? {
        targetAnswer: a
      } : {},
      ...m ? {
        ragBlock: m
      } : {}
    }), y = $c(n.systemPrompt || zr);
    u({
      step: "generate",
      status: "running",
      detail: "\uD30C\uC0DD \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: $,
      systemPrompt: y
    });
    const z = await ve(Se(e.profiles, $, y, n.temperature, Fe(e.signal))), v = De(z);
    u({
      step: "generate",
      status: "done",
      detail: e.target.kind === "choice" ? `\uC815\uB2F5 ${a}\uBC88 \xB7 ${o}\uC9C0\uC120\uB2E4` : e.target.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615",
      llmInstruction: $,
      llmResponse: oe(z),
      systemPrompt: y
    });
    let S = Rt(v, o, a);
    if (e.target.kind === "subjective" ? S = {
      kind: "subjective",
      answerStyle: e.target.answerStyle === "essay" ? "essay" : "short",
      question: S.question,
      modelAnswer: S.modelAnswer || "",
      point: S.point,
      explanation: S.explanation,
      isGenerated: true
    } : S = {
      kind: "choice",
      question: S.question,
      options: Ye(S.options || [], o),
      answer: Math.min(o, Math.max(1, S.answer || a)),
      point: S.point,
      explanation: S.explanation,
      isGenerated: true
    }, !dn(S)) {
      const I = ut(S.point), O = mt(S.explanation), B = Hr({
        question: S.question,
        options: S.kind === "choice" ? S.options || [] : [],
        answer: S.kind === "choice" && S.answer ? S.answer : a,
        analysisBlock: E,
        missingPoint: I,
        missingExplanation: O
      });
      u({
        step: "generate",
        status: "running",
        detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026",
        llmInstruction: B,
        systemPrompt: y
      });
      const F = await ve(Se(e.profiles, B, y, Math.min(n.temperature, 0.8), Fe(e.signal))), M = De(F), _ = M && typeof M == "object" ? M : {};
      I && typeof _.point == "string" && _.point.trim() && (S = {
        ...S,
        point: String(_.point).trim()
      }), O && typeof _.explanation == "string" && _.explanation.trim() && (S = {
        ...S,
        explanation: String(_.explanation).trim()
      }), u({
        step: "generate",
        status: "done",
        detail: dn(S) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644",
        llmInstruction: B,
        llmResponse: oe(F),
        systemPrompt: y
      });
    }
    return {
      ...S,
      isGenerated: true
    };
  }
  const Zc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124\xB7\uC811\uADFC Point \uC791\uC131\uC790\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uBB38\uD56D\uB9CC \uADFC\uAC70\uB85C \uC811\uADFC Point\uC640 \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uC811\uADFC Point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C. \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- \uD574\uC124: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- placeholder \uBB38\uAD6C\uB098 \uBE48 \uBB38\uC790\uC5F4\uB85C \uCC44\uC6B0\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 \uC694\uCCAD\uB41C JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
  async function Yc(e) {
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
`), { chunks: h } = await xn({
        sourcePaths: o,
        query: f,
        readText: e.readText
      });
      r = hn(h);
    }
    const a = jl({
      question: s,
      missingPoint: e.missingPoint,
      missingExplanation: e.missingExplanation,
      ...r ? {
        ragBlock: r
      } : {}
    }), c = await ve(Se(e.profiles, a, ((_a2 = n.systemPrompt) == null ? void 0 : _a2.trim()) || Zc, Math.min(n.temperature, 0.8), ds({
      signal: e.signal,
      profileId: e.profileId,
      model: e.model
    }))), d = De(c), u = d && typeof d == "object" && !Array.isArray(d) ? d : {}, m = {};
    return e.missingPoint && typeof u.point == "string" && u.point.trim() && !ut(u.point) && (m.point = String(u.point).trim()), e.missingExplanation && typeof u.explanation == "string" && u.explanation.trim() && !mt(u.explanation) && (m.explanation = String(u.explanation).trim()), m;
  }
  async function ed(e) {
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
    const m = await Cc(e.sourcePaths, e.readText, n.ragMaxChars);
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
    const f = Uc(s), h = [];
    let g = "";
    for (let y = 0; y < m.length; y += 1) {
      const z = m[y];
      if (!z) continue;
      if ((_b = e.signal) == null ? void 0 : _b.aborted) throw new DOMException("Aborted", "AbortError");
      const v = `\uBB38\uC11C \uC694\uC57D ${y + 1}/${m.length}: ${z.path}`, S = `[\uCD9C\uC81C \uCC38\uACE0 \uBB38\uD56D \uC608\uC2DC]
\uC81C\uC2DC\uB41C \uBB38\uD56D \uC2A4\uD0C0\uC77C\xB7\uAC1C\uB150 \uBC94\uC704\uB97C \uCC38\uACE0\uD574, \uC544\uB798 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uC815\uBCF4\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC0C1\uC138 \uC694\uC57D\uD558\uC138\uC694.

${f}

[\uC0AC\uC6A9\uC790 \uC8FC\uC81C]
${d || "(\uC608\uC2DC \uBB38\uD56D\xB7\uBB38\uC11C \uD575\uC2EC \uAC1C\uB150)"}

[\uADFC\uAC70 \uBB38\uC11C \uACBD\uB85C]
${z.path}

[\uADFC\uAC70 \uBB38\uC11C \uBCF8\uBB38]
${z.text}

\uC704 \uBCF8\uBB38\uC744 \uC8FC\uC81C\uBCC4 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uC73C\uB85C\uB9CC \uC791\uC131\uD558\uC138\uC694.`;
      u({
        step: "summarize",
        status: "running",
        detail: v,
        llmInstruction: S,
        systemPrompt: tn,
        ...g ? {
          llmResponse: g
        } : {}
      }), (_c2 = e.onProgress) == null ? void 0 : _c2.call(e, v);
      const I = await ve(Se(e.profiles, S, tn, Math.min(n.temperature, 0.7), Fe(e.signal))), O = String(I || "").trim();
      O && (h.push({
        path: z.path,
        summary: O
      }), g += `### ${z.path}

${oe(O, 24e3)}

---

`, u({
        step: "summarize",
        status: "running",
        detail: v,
        llmInstruction: S,
        systemPrompt: tn,
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
      systemPrompt: tn
    }), (_d = e.onProgress) == null ? void 0 : _d.call(e, "\uC694\uC57D\uBCF8\uC73C\uB85C \uBB38\uD56D \uC0DD\uC131 \uC911\u2026");
    const x = h.map((y, z) => `### \uC694\uC57D\uBCF8 ${z + 1}
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

JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694.`, k = Bc(c, o, a);
    u({
      step: "generate",
      status: "running",
      detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: b,
      systemPrompt: k
    });
    const E = await ve(Se(e.profiles, b, k, n.temperature, Fe(e.signal))), C = De(E), $ = Array.isArray(C) ? C : [
      C
    ];
    return u({
      step: "generate",
      status: "done",
      detail: `${Math.min($.length, a)}\uAC1C \uBB38\uD56D`,
      llmInstruction: b,
      llmResponse: oe(E),
      systemPrompt: k
    }), $.slice(0, a).map((y, z) => {
      if (c === "subjective") {
        const v = y && typeof y == "object" ? {
          ...y,
          kind: "subjective"
        } : {
          kind: "subjective"
        };
        return {
          ...Rt(v, o, z % o + 1),
          isGenerated: true
        };
      }
      return {
        ...Rt(y, o, z % o + 1),
        isGenerated: true
      };
    });
  }
  const td = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uBB38\uD56D \uD3B8\uC9D1\uC790\uC785\uB2C8\uB2E4. \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uBB38\uD56D\uC744 \uAD50\uC815\xB7\uC7AC\uC791\uC131\uD569\uB2C8\uB2E4.
- \uC0AC\uC2E4 \uAD00\uACC4\uB97C \uBC14\uB85C\uC7A1\uACE0, \uC9C0\uBB38\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\xB7\uD574\uC124\uC774 \uC2DC\uD5D8\uC5D0 \uC4F8 \uC218 \uC788\uC744 \uB9CC\uD07C \uC644\uACB0\uB418\uAC8C \uB9CC\uB4DC\uC138\uC694.
- \uC0AC\uC6A9\uC790\uAC00 \uBC29\uD5A5\uC744 \uC81C\uC2DC\uD558\uBA74 \uADF8\uC5D0 \uB9DE\uAC8C \uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\xB7\uD615\uC2DD\uC744 \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uADFC\uAC70 \uBC1C\uCDCC\uAC00 \uC788\uC73C\uBA74 \uADF8 \uBC94\uC704 \uC548\uC5D0\uC11C\uB9CC \uC0AC\uC2E4\uC744 \uC0AC\uC6A9\uD558\uC138\uC694. \uC5C6\uB294 \uB0B4\uC6A9\uC744 \uC9C0\uC5B4\uB0B4\uC9C0 \uB9C8\uC138\uC694.
- \uAC1D\uAD00\uC2DD \uC120\uD0DD\uC9C0 \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
- \uC751\uB2F5\uC740 JSON \uAC1D\uCCB4 \uD558\uB098\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
  function nd(e, n) {
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
  function sd(e) {
    const n = e.config.choiceCount || 4, s = e.question, r = String(e.userInstructions || "").trim(), o = s.kind === "subjective" ? `\uC8FC\uAD00\uC2DD(${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"})\uC744 \uC720\uC9C0\uD558\uC138\uC694. \uC0AC\uC6A9\uC790\uAC00 \uC720\uD615 \uBCC0\uACBD\uC744 \uBA85\uC2DC\uD558\uC9C0 \uC54A\uC558\uB2E4\uBA74 \uAC1D\uAD00\uC2DD\uC73C\uB85C \uBC14\uAFB8\uC9C0 \uB9C8\uC138\uC694.` : `\uAC1D\uAD00\uC2DD ${n}\uC9C0\uC120\uB2E4\uB97C \uC720\uC9C0\uD558\uC138\uC694. options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${n}, answer\uB294 1~${n} \uC815\uC218\uC785\uB2C8\uB2E4.`, a = s.kind === "subjective" ? '{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}' : `{"kind":"choice","question":"...","options":[${Array.from({
      length: n
    }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}`;
    return `\uB2E4\uC74C \uBB38\uD56D\uC740 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB2E4\uACE0 \uAC04\uC8FC\uB429\uB2C8\uB2E4. \uAD50\uC815\uB41C \uC644\uC131 \uBB38\uD56D\uC744 JSON\uC73C\uB85C \uBC18\uD658\uD558\uC138\uC694.

${nd(s, n)}

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
  async function rd(e) {
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
`), { chunks: x } = await xn({
        sourcePaths: d,
        query: g,
        readText: e.readText
      });
      c = hn(x), o({
        step: "rag",
        status: "done",
        detail: x.length > 0 ? `${x.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C"
      });
    } else o({
      step: "rag",
      status: "skipped",
      detail: "\uADFC\uAC70 \uC5C6\uC74C"
    });
    const u = sd({
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
    const m = await ve(Se(e.profiles, u, td, n.temperature, Fe(e.signal))), f = De(m), h = f && typeof f == "object" && !Array.isArray(f) ? f : Array.isArray(f) && f[0] ? f[0] : f;
    return o({
      step: "generate",
      status: "done",
      detail: "\uAD50\uC815 \uC644\uB8CC"
    }), Rt(h, r, a);
  }
  function od(e) {
    const n = Array.from({
      length: e
    }, (s, r) => r);
    for (let s = n.length - 1; s > 0; s -= 1) {
      const r = Math.floor(Math.random() * (s + 1)), o = n[s];
      n[s] = n[r], n[r] = o;
    }
    return n;
  }
  function id(e) {
    const n = /* @__PURE__ */ new Map();
    for (let s = 0; s < e.length; s += 1) {
      const r = e[s];
      n.set(r + 1, s + 1);
    }
    return n;
  }
  function ad(e, n) {
    if (e.kind !== "choice") return null;
    const s = e.options || [];
    if (s.length < 2) return null;
    const r = n ?? od(s.length);
    if (r.length !== s.length) return null;
    const o = r.map((m) => s[m] ?? ""), a = Math.max(0, (e.answer ?? 1) - 1), c = r.indexOf(a), d = c >= 0 ? c + 1 : e.answer, u = id(r);
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
  function ld(e, n) {
    if (typeof e != "number" || !Number.isFinite(e)) return e;
    const s = Math.round(e);
    return n.get(s) ?? e;
  }
  function cd(e, n) {
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
  function dd(e, n) {
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
  function ud(e) {
    const n = /* @__PURE__ */ new Map();
    let s = 0;
    const r = e.questions.map((u) => {
      var _a2;
      const m = ad(u, (_a2 = e.permutationByQuestionId) == null ? void 0 : _a2.get(u.id));
      return m ? (n.set(u.id, m.oldToNew), s += 1, m.question) : u;
    }), o = {
      ...e.userAnswers
    };
    for (const u of e.questions) {
      if (u.kind !== "choice") continue;
      const m = n.get(u.id);
      if (!m) continue;
      const f = ld(o[u.id], m);
      f !== void 0 && (o[u.id] = f);
    }
    const a = cd(e.wrongExps, n), c = dd(e.wrongExpFocus, n), d = Zn(a);
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
  function md(e, n, s) {
    const r = s.get(e);
    return r ? r.get(n) ?? null : n;
  }
  function xr(e, n, s) {
    const r = at(e, n);
    if (!r) return "";
    const o = String(s || "").trim();
    if (o) return o;
    const a = as(r.id, r.kind).trim();
    return a || ki(r.kind);
  }
  function fd(e) {
    const [n, s] = i.useState(""), [r, o] = i.useState(""), a = i.useCallback(() => {
      var _a2;
      const m = Ne(), h = ((_a2 = at(e, m.profileId || is())) == null ? void 0 : _a2.id) ?? "";
      s(h), o(xr(e, h, m.modelId));
    }, [
      e
    ]);
    i.useEffect(() => {
      a();
      const m = () => a();
      return window.addEventListener(ln, m), () => window.removeEventListener(ln, m);
    }, [
      a
    ]);
    const c = i.useCallback((m) => {
      const f = m.trim();
      s(f), bi(f);
      const h = at(e, f), g = h ? xr(e, h.id, null) : "";
      o(g), Js({
        profileId: f || null,
        modelId: g || null
      });
    }, [
      e
    ]), d = i.useCallback((m) => {
      const f = m.trim();
      o(f), Js({
        modelId: f || null
      });
      const h = at(e, n);
      h && Nt(h.id, f);
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
  const pd = 0.12;
  function hr(e, n, s, r = 0) {
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
          threshold: pd
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
  function xd({ profiles: e, profileId: n, model: s, onProfileIdChange: r, onModelChange: o, busy: a = false }) {
    return t.jsxs("section", {
      "aria-label": "\uD034\uC988 AI \uC81C\uACF5\uC790",
      className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface",
      children: [
        t.jsxs("div", {
          className: "mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-odp-fgStrong",
          children: [
            t.jsx(ta, {
              size: 14,
              className: "shrink-0 text-violet-600 dark:text-violet-400",
              "aria-hidden": true
            }),
            "AI \uC81C\uACF5\uC790"
          ]
        }),
        t.jsx(Lr, {
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
  const hd = i.memo(xd);
  function gd(e) {
    return eo(e).map((n) => n.id === "generate" ? {
      ...n,
      label: "\uD30C\uC0DD \uBB38\uD56D \uC0DD\uC131"
    } : n);
  }
  function eo(e) {
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
  function bd() {
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
  function sn(e, n = 72) {
    const s = String(e || "").replace(/\s+/g, " ").trim();
    return s.length <= n ? s : `${s.slice(0, n - 1)}\u2026`;
  }
  const to = "s3haim_quiz_gen_queue_panel_size", kd = 280, wd = 180, Un = 380, Gn = 320;
  function no(e) {
    const n = Math.min(window.innerWidth * 0.92, 720), s = Math.min(window.innerHeight * 0.72, 640);
    return {
      width: Math.min(n, Math.max(kd, Math.round(e.width))),
      height: Math.min(s, Math.max(wd, Math.round(e.height)))
    };
  }
  function yd() {
    try {
      const e = typeof window < "u" ? window.localStorage.getItem(to) : null;
      if (!e) return {
        width: Un,
        height: Gn
      };
      const n = JSON.parse(e);
      return no({
        width: Number(n.width) || Un,
        height: Number(n.height) || Gn
      });
    } catch {
      return {
        width: Un,
        height: Gn
      };
    }
  }
  function vd(e) {
    try {
      typeof window < "u" && window.localStorage.setItem(to, JSON.stringify(e));
    } catch {
    }
  }
  function Sd(e, n) {
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
  function Wn() {
    return `quiz-gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
  function jd() {
    const [e, n] = i.useState([]), s = i.useRef(e);
    s.current = e;
    const [r, o] = i.useState(false), [a, c] = i.useState(() => yd()), d = i.useRef(false), u = i.useRef(false), m = i.useRef(false), f = i.useRef(0), h = i.useCallback((P) => {
      const A = no(P);
      c(A), vd(A);
    }, []), g = i.useCallback(() => {
      d.current = true;
    }, []), x = i.useCallback((P) => {
      u.current = P;
    }, []), b = i.useCallback((P) => {
      m.current = P;
    }, []), k = i.useCallback(() => u.current || m.current, []), E = i.useCallback(() => {
      d.current = true, o(true);
    }, []), C = i.useCallback(() => {
      d.current = false, u.current = false, m.current = false, o(false);
    }, []), $ = i.useCallback(() => {
      o(true);
    }, []), y = i.useCallback((P) => s.current.find((A) => A.id === P) ?? null, []), z = i.useCallback((P) => {
      const A = Wn(), W = {
        id: A,
        kind: "similar",
        questionLabel: P.displayLabel,
        questionPreview: sn(P.preview),
        status: "running",
        steps: eo(P.hasRag),
        createdAt: Date.now()
      };
      return n((T) => [
        W,
        ...T
      ]), $(), A;
    }, [
      $
    ]), v = i.useCallback((P) => {
      const A = Wn(), W = {
        id: A,
        kind: "derived",
        questionLabel: P.displayLabel,
        questionPreview: sn(P.preview),
        status: "running",
        steps: gd(P.hasRag),
        createdAt: Date.now()
      };
      return n((T) => [
        W,
        ...T
      ]), $(), A;
    }, [
      $
    ]), S = i.useCallback((P) => {
      var _a2;
      const A = Wn(), W = ((_a2 = P.topic) == null ? void 0 : _a2.trim()) || sn(P.preview) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", T = {
        id: A,
        kind: "source",
        questionPreview: sn(W),
        status: "running",
        steps: bd(),
        createdAt: Date.now()
      };
      return n((le) => [
        T,
        ...le
      ]), $(), A;
    }, [
      $
    ]), I = i.useCallback((P, A) => {
      n((W) => W.map((T) => T.id === P ? Sd(T, A) : T));
    }, []), O = i.useCallback((P, A) => {
      n((W) => W.map((T) => T.id === P ? {
        ...T,
        logPath: A
      } : T));
    }, []), B = i.useCallback((P, A) => {
      n((W) => W.map((T) => T.id === P ? {
        ...T,
        resultQuestionId: A
      } : T));
    }, []), F = i.useCallback((P, A) => {
      n((W) => W.map((T) => T.id === P ? {
        ...T,
        status: "done",
        ...A ? {
          resultLabel: A
        } : {}
      } : T));
    }, []), M = i.useCallback((P, A) => {
      n((W) => W.map((T) => T.id === P ? {
        ...T,
        status: "error",
        error: A
      } : T));
    }, []), _ = i.useCallback((P) => {
      n((A) => A.filter((W) => W.id !== P));
    }, []), q = i.useCallback(() => {
      n((P) => P.filter((A) => A.status === "running"));
    }, []), K = e.some((P) => P.status === "running");
    return i.useEffect(() => {
      const P = e.filter((T) => T.status === "running").length, A = f.current > 0;
      if (f.current = P, !r || !A || P > 0 || d.current || k()) return;
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
      openPanel: E,
      closePanel: C,
      setPanelOpen: o,
      markPanelUserEngaged: g,
      markPanelPointerEngaged: x,
      markPanelFocusEngaged: b,
      getJob: y,
      createSimilarJob: z,
      createDerivedJob: v,
      createSourceJob: S,
      updateJobStep: I,
      setJobLogPath: O,
      setJobResultQuestionId: B,
      completeJob: F,
      failJob: M,
      removeJob: _,
      clearFinishedJobs: q,
      hasActiveJobs: K
    };
  }
  function Jn(e, n, s) {
    return !e || s == null ? n : n + Math.max(0, Date.now() - s);
  }
  function Cd({ initialLog: e, hydrateKey: n = 0, onLogChange: s }) {
    const [r, o] = i.useState(() => Yn(e ?? Pt())), [a, c] = i.useState(0), d = i.useRef(null), u = i.useRef(s), m = i.useRef(e);
    u.current = s, m.current = e;
    const f = yt(r), h = r.events.length > 0, g = wi(r), x = vt(r);
    i.useEffect(() => {
      const y = Yn(m.current ?? Pt());
      o(y), yt(y) ? d.current = Date.now() : d.current = null;
    }, [
      n
    ]), i.useEffect(() => {
      if (!f) return;
      const y = window.setInterval(() => c((z) => z + 1), 200);
      return () => window.clearInterval(y);
    }, [
      f
    ]);
    const b = i.useMemo(() => Jn(f, x, d.current), [
      f,
      x,
      a
    ]), k = i.useCallback(() => {
      d.current = Date.now(), o((y) => {
        var _a2;
        const z = $t(y, "start", 0);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, z), z;
      });
    }, []), E = i.useCallback(() => {
      o((y) => {
        var _a2;
        if (!yt(y)) return y;
        const z = Jn(true, vt(y), d.current);
        d.current = null;
        const v = $t(y, "pause", z);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, v), v;
      });
    }, []), C = i.useCallback(() => {
      o((y) => {
        var _a2;
        if (yt(y)) return y;
        const z = vt(y);
        d.current = Date.now();
        const v = $t(y, "resume", z);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, v), v;
      });
    }, []), $ = i.useCallback(() => {
      o((y) => {
        var _a2;
        const z = yt(y) ? Jn(true, vt(y), d.current) : vt(y);
        d.current = null;
        const v = $t(y, "stop", z);
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
      pause: E,
      resume: C,
      stop: $
    };
  }
  function Nd(e) {
    const n = e.lastIndexOf(".");
    return n >= 0 ? e.slice(n + 1).toLowerCase() : "";
  }
  function Ct(e) {
    if (e) try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }
  async function $d({ backend: e, storageType: n, path: s }) {
    var _a2, _b;
    if (!e || !s) return null;
    const r = cs(s), o = Nd(r), a = [
      ...yi
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
          Ct(g);
          const k = b.body instanceof Uint8Array ? b.body : new Uint8Array(b.body), E = k.buffer.slice(k.byteOffset, k.byteOffset + k.byteLength);
          g = await vi(new Blob([
            E
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
        revoke: () => Ct(g)
      };
    }
    if (o === "pdf" && e.readBytes) {
      const { body: g, contentLength: x } = await e.readBytes(s), b = g instanceof Uint8Array ? g : new Uint8Array(g), k = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), E = new Blob([
        k
      ], {
        type: "application/pdf"
      }), C = URL.createObjectURL(E);
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
        revoke: () => Ct(C)
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
        revoke: () => Ct(g)
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
        revoke: () => Ct(g)
      };
    }
    if (!e.readText) return null;
    const u = Si(s, r);
    if (u) {
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s), k = Hs(g, u.viewer);
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
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s), k = Hs(g, "json");
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
    if (o === "md" || o === "markdown" || o === "" || Vt(s) || Vt(r)) {
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s);
      if (Vt(s) || Vt(r)) {
        const k = await ji(s, g);
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
  const Pd = 2e4, gr = "flex h-6 max-h-6 min-w-0 items-center overflow-hidden", zd = "z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", br = "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg";
  iu = function({ content: e, onChange: n, onSave: s, currentFile: r, onResolveWikiImageUrl: o, llmProviderProfiles: a = [], isActiveFile: c = true, isSurfaceLive: d = true, registerToolbar: u, registerFileManagement: m }) {
    const { showToast: f } = Ci(), { showAlert: h } = Ni(), g = $i(), x = jd(), { storageMode: b, s3Tree: k, localTree: E, webdavTree: C, idbTree: $, localRootHandle: y, getBackendForType: z, loadLocalFolderChildren: v, loadWebdavFolderChildren: S, loadIdbFolderChildren: I } = Pi(), { openAdvancedSearchFile: O, selectFileRaw: B } = zi(), F = i.useCallback((l) => {
      g == null ? void 0 : g.openAssist(), f({
        message: l || "AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
        durationMs: 3500
      });
    }, [
      g,
      f
    ]), M = fd(a), _ = i.useCallback(async (l) => {
      const p = await Gc(a, {
        ...M.llmOpts,
        ...l
      });
      return p.ready ? true : (F(p.message), false);
    }, [
      a,
      F,
      M.llmOpts
    ]), q = i.useCallback((l, p, w) => {
      const N = (p instanceof Error ? p.message : "") || w;
      if (Wc(N)) {
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
    ]), K = i.useMemo(() => b === Qn ? E : b === Tn ? C : b === _n ? $ : k, [
      b,
      E,
      C,
      $,
      k
    ]), P = b === Qn ? "local" : b === Tn ? "webdav" : b === _n ? "idb" : "s3", A = P, W = i.useCallback(async (l) => {
      const p = z(P);
      return $d({
        backend: p,
        storageType: A,
        path: l
      });
    }, [
      z,
      P,
      A
    ]), T = i.useCallback((l) => {
      O(l);
    }, [
      O
    ]), le = i.useCallback(async (l) => {
      const p = await ra(l, {
        storageType: A,
        localTree: E,
        webdavTree: C,
        idbTree: $,
        s3Tree: k,
        localRootHandle: y
      });
      if (p) {
        await B(P, p, {
          background: true
        });
        return;
      }
      O(l);
    }, [
      A,
      E,
      C,
      $,
      k,
      y,
      B,
      P,
      O
    ]), He = i.useCallback((l) => {
      pt(true), xt(l);
    }, []), nt = i.useCallback(() => {
      pt(false), xt(null);
    }, []), V = i.useCallback(async (l) => {
      const p = z(P);
      if (!(p == null ? void 0 : p.readText)) return null;
      const { text: w } = await p.readText(l);
      return typeof w == "string" ? w : null;
    }, [
      z,
      P
    ]), Z = i.useCallback(async (l, p) => {
      const w = r == null ? void 0 : r.id;
      if (!w) return;
      await new Promise((R) => {
        window.setTimeout(R, 0);
      });
      const N = x.getJob(l);
      if (!N) return;
      const L = z(P);
      if (L == null ? void 0 : L.writeText) try {
        const R = await Oc({
          quizFilePath: w,
          logKey: p,
          job: N,
          writeText: (U, G) => L.writeText(U, G, "text/markdown; charset=utf-8")
        });
        x.setJobLogPath(l, R);
      } catch {
      }
    }, [
      r == null ? void 0 : r.id,
      x,
      z,
      P
    ]), ne = i.useCallback((l, p, w) => {
      x.updateJobStep(l, w), Z(l, p);
    }, [
      x,
      Z
    ]), Q = i.useCallback(async (l) => {
      b === Qn ? await (v == null ? void 0 : v(l)) : b === Tn ? await (S == null ? void 0 : S(l)) : b === _n && await (I == null ? void 0 : I(l));
    }, [
      b,
      v,
      S,
      I
    ]), [j, ce] = i.useState(() => it(e)), fe = i.useRef(e), gn = i.useRef(false), Ot = i.useRef(false), Le = i.useRef(null), de = i.useRef(j);
    de.current = j;
    const [se, Ke] = i.useState({}), [ie, Be] = i.useState({}), us = i.useRef(ie);
    us.current = ie;
    const [so, $e] = i.useState({}), [ae, bn] = i.useState({}), [Oe, ke] = i.useState({}), et = i.useRef(Oe);
    et.current = Oe;
    const [Qt, st] = i.useState({}), [ue, Ue] = i.useState(null), [me, tt] = i.useState({}), [pe, Tt] = i.useState(false), [kn, ft] = i.useState("all"), [wn, ms] = i.useState(false), [_t, pt] = i.useState(false), [ro, xt] = i.useState(null), [oo, yn] = i.useState(false), [ht, vn] = i.useState(null), [Ve, xe] = i.useState(null), [fs, Dt] = i.useState(false), [he, Ft] = i.useState(null), [rt, Sn] = i.useState(null), [ps, jn] = i.useState(false), [Ge, qt] = i.useState(null), [io, Bt] = i.useState({}), Cn = i.useRef(null), Nn = i.useRef(null), je = i.useRef(null), gt = i.useRef(null), xs = i.useRef(null), hs = i.useRef(null), [we, bt] = i.useState(() => Pt()), [ao, $n] = i.useState(0), re = Cd({
      initialLog: we,
      hydrateKey: ao,
      onLogChange: bt
    }), gs = i.useRef(() => 0);
    gs.current = () => re.displayMs;
    const lo = i.useMemo(() => j.questions.map((l) => ({
      id: l.id,
      displayLabel: l.displayLabel
    })), [
      j.questions
    ]);
    Rl({
      scrollRootRef: gt,
      questions: lo,
      running: re.running,
      getElapsedMs: () => gs.current(),
      timeLog: we,
      onLogChange: bt
    });
    const Xe = i.useCallback(() => Fn({
      questions: de.current.questions,
      userAnswers: se,
      gradedQuestions: ie,
      subjectiveGrades: me,
      isSubmitted: pe,
      ...Dn(we) ? {} : {
        timeLog: we
      },
      wrongChoiceExplanations: Zn(Oe),
      ...St(ae) ? {} : {
        questionMemos: ae
      }
    }), [
      se,
      ie,
      me,
      pe,
      we,
      Oe,
      ae
    ]), Ut = i.useCallback(() => {
      if (!Ot.current || !c) return false;
      const l = Xe();
      if (!Zl(l)) return false;
      const p = it(fe.current).session;
      if (!dr(l, p)) return true;
      const w = typeof (r == null ? void 0 : r.content) == "string" ? r.content : "";
      if (!w) return true;
      const N = it(w).session;
      return !dr(l, N);
    }, [
      Xe,
      r == null ? void 0 : r.content,
      c
    ]), Gt = i.useCallback((l) => {
      const p = Yn(l == null ? void 0 : l.timeLog);
      if (bt(p), $n((N) => N + 1), !l || ss(l)) {
        Ke({}), Be({}), $e({}), ke({}), st({}), Ue(null), bn({}), tt({}), Tt(false);
        return;
      }
      Ke({
        ...l.userAnswers
      }), Be({
        ...l.gradedQuestions
      }), tt({
        ...l.subjectiveGrades
      }), Tt(l.isSubmitted), ke(Ei(l.wrongChoiceExplanations)), bn({
        ...l.questionMemos ?? {}
      }), st({}), Ue(null);
      const w = {};
      for (const [N, L] of Object.entries(l.gradedQuestions)) L && (w[N] = true);
      $e(w);
    }, []), ge = i.useCallback((l, p) => {
      const w = vr(l.config, l.questions, p);
      gn.current = true, fe.current = w, n(w);
    }, [
      n
    ]), Wt = i.useCallback(() => {
      if (!Ot.current) return;
      Le.current != null && (clearTimeout(Le.current), Le.current = null);
      const l = Xe();
      ge(de.current, l);
    }, [
      Xe,
      ge
    ]), ot = i.useCallback(async (l) => {
      if (!(!Ne().autoSaveOnAiGenerate || typeof s != "function")) {
        if (l) {
          const p = Fn({
            questions: de.current.questions,
            userAnswers: se,
            gradedQuestions: ie,
            subjectiveGrades: me,
            isSubmitted: pe,
            ...Dn(we) ? {} : {
              timeLog: we
            },
            wrongChoiceExplanations: Zn(l),
            ...St(ae) ? {} : {
              questionMemos: ae
            }
          });
          ge(de.current, p);
        } else Wt();
        await s(null, {
          skipCoverChangeCheck: true,
          skipSuffixCheck: true,
          contentOverride: fe.current
        });
      }
    }, [
      Wt,
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
      if (fe.current = e, gn.current) {
        gn.current = false;
        return;
      }
      const l = it(e);
      ce(l), Gt(l.session);
    }, [
      e,
      Gt
    ]), i.useEffect(() => {
      const l = it(fe.current);
      Gt(l.session), Ot.current = true;
    }, [
      Gt
    ]), i.useEffect(() => {
      if (!Ot.current) return;
      const l = Xe();
      return Le.current != null && clearTimeout(Le.current), Le.current = setTimeout(() => {
        Le.current = null, ge(de.current, l);
      }, Pd), () => {
        Le.current != null && (clearTimeout(Le.current), Le.current = null);
      };
    }, [
      se,
      ie,
      me,
      pe,
      we,
      Oe,
      ae,
      Xe,
      ge
    ]);
    const bs = i.useCallback(async () => {
      const l = Kl(de.current, {
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
      const w = z(P);
      if (!(w == null ? void 0 : w.writeText)) {
        f({
          message: "\uC800\uC7A5\uC18C\uC5D0 \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 3e3
        });
        return;
      }
      try {
        const N = await Xl(p, async (L) => {
          if (!w.head) return false;
          try {
            return await w.head(L), true;
          } catch {
            return false;
          }
        });
        await w.writeText(N, l.markdown, "text/markdown; charset=utf-8"), await O(N), f({
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
      z,
      P,
      O,
      f,
      q
    ]);
    i.useEffect(() => {
      if (!c || kr()) return;
      const l = (p) => {
        Ut() && (p.preventDefault(), p.returnValue = "");
      };
      return window.addEventListener("beforeunload", l), () => window.removeEventListener("beforeunload", l);
    }, [
      c,
      Ut
    ]);
    const be = i.useCallback((l) => {
      const p = {
        ...l,
        config: er(l.config, l.questions)
      };
      de.current = p, ce(p);
      const w = Xe();
      ge(p, w);
    }, [
      Xe,
      ge
    ]), ks = i.useCallback(() => {
      const l = de.current, p = ud({
        questions: l.questions,
        userAnswers: se,
        wrongExps: Oe,
        wrongExpFocus: Qt
      });
      if (p.shuffledQuestionCount <= 0) {
        f({
          message: "\uC120\uD0DD\uC9C0\uAC00 2\uAC1C \uC774\uC0C1\uC778 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 2800
        });
        return;
      }
      Ke(p.userAnswers), ke(p.wrongExps), st(p.wrongExpFocus), Ue((L) => {
        if (!L) return null;
        const R = md(L.questionId, L.option, p.optionMapsByQuestionId);
        return R == null ? null : {
          ...L,
          option: R
        };
      });
      const w = {
        ...l,
        questions: p.questions,
        config: er(l.config, p.questions)
      };
      ce(w);
      const N = Fn({
        questions: w.questions,
        userAnswers: p.userAnswers,
        gradedQuestions: ie,
        subjectiveGrades: me,
        isSubmitted: pe,
        ...Dn(we) ? {} : {
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
      Oe,
      Qt,
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
        extractWrongQuestions: bs,
        shuffleChoiceOptions: ks,
        hasUnsavedProgress: Ut,
        flushBeforeSave: Wt
      }), () => m(null);
    }, [
      c,
      d,
      m,
      bs,
      ks,
      Ut,
      Wt
    ]);
    const Pn = i.useCallback((l) => {
      const p = de.current;
      be({
        ...p,
        config: Ii(p.config, l)
      }), xt((w) => w === l ? null : w);
    }, [
      be
    ]), co = i.useCallback((l, p) => {
      const w = de.current;
      be({
        ...w,
        config: Mi(w.config, l, p)
      });
    }, [
      be
    ]), uo = i.useCallback((l) => {
      if (Vr()) {
        vn(l);
        return;
      }
      Pn(l);
    }, [
      Pn
    ]), { setQuizSourceDropActive: zn, setQuizSourceDropHost: Jt, handleRegisterQuizSourceDrop: En } = Ri(), ws = i.useRef(null), ys = i.useRef(null), vs = i.useRef(null), Ss = i.useRef(null), js = i.useRef(Ge);
    js.current = Ge;
    const Ht = i.useCallback(() => {
      const l = ws.current ?? ys.current;
      vs.current !== l && (vs.current = l, Jt(l));
    }, [
      Jt
    ]), mo = i.useCallback((l) => {
      ws.current = l, Ht();
    }, [
      Ht
    ]), fo = i.useCallback((l) => {
      ys.current = l, Ht();
    }, [
      Ht
    ]);
    i.useEffect(() => () => Jt(null), [
      Jt
    ]);
    const Cs = i.useCallback((l, p) => l !== P ? null : Ai(K, p) || Li(K, p), [
      P,
      K
    ]), Ns = (r == null ? void 0 : r.id) || null, $s = i.useCallback((l) => {
      var _a2;
      if (!l.length) return;
      const p = js.current;
      if (p == null ? void 0 : p.onDone) {
        const L = new Set(p.paths);
        for (const R of l) L.add(R);
        p.onDone([
          ...L
        ].sort((R, U) => R.localeCompare(U))), f({
          message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        });
        return;
      }
      if (p) {
        (_a2 = Ss.current) == null ? void 0 : _a2.call(Ss, l), f({
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
      ].sort((L, R) => L.localeCompare(R));
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
    ]), Ps = i.useCallback((l) => {
      const p = Oi(l, Cs, {
        excludePath: Ns
      });
      p.length && $s(p);
    }, [
      Ns,
      Cs,
      $s
    ]);
    i.useEffect(() => (En(Ps), () => En(null)), [
      En,
      Ps
    ]), i.useEffect(() => (zn(c && d && (!!Ge || _t)), () => zn(false)), [
      c,
      d,
      Ge,
      _t,
      zn
    ]);
    const J = i.useMemo(() => xc({
      questions: j.questions,
      userAnswers: se,
      gradedQuestions: ie,
      isSubmitted: pe,
      subjectiveGrades: me
    }), [
      j.questions,
      se,
      ie,
      pe,
      me
    ]), zs = c && d && J.total > 0, po = hr(gt, xs, zs, j.questions.length), xo = hr(gt, hs, zs, j.questions.length), ho = i.useMemo(() => Qr(j.questions, j.config.choiceCount), [
      j.questions,
      j.config.choiceCount
    ]), Es = i.useMemo(() => Qi(j.config), [
      j.config.sourcePaths,
      j.config.disabledSourcePaths
    ]), go = i.useMemo(() => {
      const l = {};
      for (const [p, w] of Object.entries(Oe)) {
        const N = p.indexOf("_"), L = N >= 0 ? p.slice(0, N) : p, R = l[L] ?? (l[L] = {});
        R[p] = w;
      }
      return l;
    }, [
      Oe
    ]), Kt = i.useMemo(() => ue && j.questions.find((l) => l.id === ue.questionId) || null, [
      ue,
      j.questions
    ]), bo = i.useCallback((l, p, w) => {
      Ue({
        questionId: l,
        option: p,
        mode: w
      });
    }, []), ye = a, Is = i.useCallback(() => {
      Ke({}), Be({}), $e({}), ke({}), st({}), Ue(null), tt({}), Tt(false), bt(Pt()), $n((l) => l + 1), ge(de.current, Et({
        ...St(ae) ? {} : {
          questionMemos: ae
        }
      }));
    }, [
      ge,
      ae
    ]), ko = i.useCallback(() => {
      Ke({}), Be({}), $e({}), ke({}), st({}), Ue(null), tt({}), Tt(false);
      const l = $t(Pt(), "start", 0);
      bt(l), $n((p) => p + 1), ge(de.current, Et({
        timeLog: l,
        ...St(ae) ? {} : {
          questionMemos: ae
        }
      }));
    }, [
      ge,
      ae
    ]), Ms = i.useMemo(() => j.questions.some((l) => un(se[l.id])), [
      j.questions,
      se
    ]), Rs = i.useCallback(() => {
      if (Ms) {
        yn(true);
        return;
      }
      re.start();
    }, [
      Ms,
      re
    ]);
    i.useEffect(() => {
      if (!(!c || !d || !u)) return u(t.jsx(ml, {
        stopwatch: re,
        onRequestStart: Rs
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
      Rs
    ]);
    const wo = i.useCallback((l) => {
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
    }, []), yo = i.useCallback((l, p) => {
      us.current[l] || Ke((w) => ({
        ...w,
        [l]: p
      }));
    }, []), vo = i.useCallback((l) => {
      re.examInProgress || (Be((p) => ({
        ...p,
        [l.id]: true
      })), $e((p) => ({
        ...p,
        [l.id]: true
      })));
    }, [
      re.examInProgress
    ]), So = i.useCallback(async (l, p) => {
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
      xe(l.id), (_a2 = je.current) == null ? void 0 : _a2.abort();
      const N = new AbortController();
      je.current = N;
      try {
        const L = await pr({
          profiles: ye,
          question: l,
          userAnswer: w,
          signal: N.signal
        });
        tt((R) => ({
          ...R,
          [l.id]: L
        })), Be((R) => ({
          ...R,
          [l.id]: true
        })), $e((R) => ({
          ...R,
          [l.id]: true
        })), p !== void 0 && Ke((R) => ({
          ...R,
          [l.id]: p
        })), f({
          message: "\uC8FC\uAD00\uC2DD \uCC44\uC810 \uC644\uB8CC",
          durationMs: 2200
        });
      } catch (L) {
        q("\uCC44\uC810 \uC2E4\uD328", L, "\uCC44\uC810 \uC2E4\uD328");
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
    ]), jo = i.useCallback((l, p) => {
      Ke((w) => w[l] === p ? w : {
        ...w,
        [l]: p
      });
    }, []), Co = i.useCallback((l) => {
      Ft(l), Dt(true);
    }, []), No = i.useCallback((l) => {
      $e((p) => ({
        ...p,
        [l]: !p[l]
      }));
    }, []), $o = i.useCallback((l) => {
      Sn(l);
    }, []), Po = i.useCallback((l, p) => {
      st((w) => ({
        ...w,
        [l]: p
      }));
    }, []), zo = i.useCallback((l, p) => {
      bn((w) => {
        if (!p.trim()) {
          const { [l]: L, ...R } = w;
          return R;
        }
        return {
          ...w,
          [l]: p
        };
      });
    }, []), Eo = i.useCallback((l) => {
      Bt((p) => {
        if (!p[l]) return p;
        const w = {
          ...p
        };
        return delete w[l], w;
      });
    }, []), kt = i.useCallback((l) => {
      var _a2;
      ((_a2 = Cn.current) == null ? void 0 : _a2.scrollToQuestionId(l)) || (Nn.current = l);
    }, []);
    i.useEffect(() => {
      var _a2;
      const l = Nn.current;
      l && ((_a2 = Cn.current) == null ? void 0 : _a2.scrollToQuestionId(l)) && (Nn.current = null);
    }, [
      j.questions,
      kn,
      se,
      ie,
      pe,
      me
    ]);
    const Io = async () => {
      re.examInProgress && re.stop();
      const l = j.questions.filter((N) => !(!un(se[N.id]) || ie[N.id] || N.kind === "subjective" && me[N.id]));
      if (l.length === 0) {
        f({
          message: "\uCC44\uC810\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 2200
        });
        return;
      }
      const p = l.filter((N) => N.kind === "choice"), w = l.filter((N) => N.kind === "subjective");
      if (p.length > 0 && (Be((N) => {
        const L = {
          ...N
        };
        for (const R of p) L[R.id] = true;
        return L;
      }), $e((N) => {
        const L = {
          ...N
        };
        for (const R of p) L[R.id] = true;
        return L;
      })), w.length > 0) {
        if (!await _()) return;
        for (const N of w) {
          const L = String(se[N.id] || "").trim();
          if (L) try {
            const R = await pr({
              profiles: ye,
              question: N,
              userAnswer: L
            });
            tt((U) => ({
              ...U,
              [N.id]: R
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
    }, As = async (l) => {
      if (!await _()) return;
      xe(`sim-${l.id}`);
      const p = Zt(j.config, l), w = x.createSimilarJob({
        displayLabel: String(l.displayLabel || l.id),
        preview: l.question,
        hasRag: p.length > 0
      }), N = w;
      try {
        const L = await Vc({
          profiles: ye,
          question: l,
          config: j.config,
          sourcePaths: p,
          readText: V,
          onStep: (X) => ne(w, N, X)
        }), R = String(l.displayLabel || l.id).split("-\uC720\uC0AC")[0] || "1";
        let U = 0;
        const G = new RegExp(`^${R.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\uC720\uC0AC(\\d+)$`);
        for (const X of j.questions) {
          const Pe = String(X.displayLabel).match(G);
          (Pe == null ? void 0 : Pe[1]) && (U = Math.max(U, Number.parseInt(Pe[1], 10)));
        }
        const Y = `${R}-\uC720\uC0AC${U + 1}`, ee = {
          ...L,
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
        const H = j.questions.findIndex((X) => X.id === l.id), te = [
          ...j.questions
        ];
        te.splice(H + 1, 0, ee), ft("all"), Bt((X) => ({
          ...X,
          [ee.id]: true
        })), be({
          ...j,
          questions: te
        }), x.setJobResultQuestionId(w, ee.id), x.updateJobStep(w, {
          step: "finalize",
          status: "done",
          detail: Y,
          llmResponse: JSON.stringify(ee, null, 2)
        }), x.completeJob(w, Y), Z(w, ee.id), f({
          message: `${Y} \uC720\uC0AC\uBB38\uC81C \uCD94\uAC00`,
          durationMs: 2500
        }), await ot(), window.setTimeout(() => {
          kt(ee.id);
        }, 80);
      } catch (L) {
        const R = (L instanceof Error ? L.message : "") || "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(w, R), Z(w, N), q("\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", L, "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Ls = async (l, p) => {
      var _a2;
      const w = M.llmOpts;
      if (!await _(w)) return;
      const N = (p === "point" || p === "both") && ut(l.point || ""), L = (p === "explanation" || p === "both") && mt(l.explanation || "");
      if (!N && !L) {
        f({
          message: "\uC774\uBBF8 \uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC788\uC2B5\uB2C8\uB2E4.",
          durationMs: 2200
        });
        return;
      }
      const R = `sections-${l.id}`;
      xe(R), (_a2 = je.current) == null ? void 0 : _a2.abort();
      const U = new AbortController();
      je.current = U;
      try {
        const G = Zt(j.config, l), Y = await Yc({
          profiles: ye,
          question: l,
          missingPoint: N,
          missingExplanation: L,
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
        const ee = j.questions.map((te) => te.id !== l.id ? te : {
          ...te,
          ...Y.point ? {
            point: Y.point
          } : {},
          ...Y.explanation ? {
            explanation: Y.explanation
          } : {}
        });
        be({
          ...j,
          questions: ee
        }), $e((te) => ({
          ...te,
          [l.id]: true
        }));
        const H = [];
        Y.point && H.push("\uC811\uADFC Point"), Y.explanation && H.push("\uD574\uC124"), f({
          message: `${H.join("\xB7")} \uC0DD\uC131 \uC644\uB8CC`,
          durationMs: 2200
        }), await ot();
      } catch (G) {
        if (U.signal.aborted) return;
        q("\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131 \uC2E4\uD328", G, "\uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Os = async (l, p) => {
      if (!await _()) return;
      xe(`derived-${l.id}`);
      const w = Zt(j.config, l), N = x.createDerivedJob({
        displayLabel: String(l.displayLabel || l.id),
        preview: l.question,
        hasRag: w.length > 0
      }), L = N;
      try {
        const R = await Xc({
          profiles: ye,
          question: l,
          config: j.config,
          target: p,
          sourcePaths: w,
          readText: V,
          onStep: (H) => ne(N, L, H)
        }), U = zc(j.questions, String(l.displayLabel || l.id)), G = {
          ...R,
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
        const Y = j.questions.findIndex((H) => H.id === l.id), ee = [
          ...j.questions
        ];
        ee.splice(Y + 1, 0, G), ft("all"), Bt((H) => ({
          ...H,
          [G.id]: true
        })), be({
          ...j,
          questions: ee
        }), x.setJobResultQuestionId(N, G.id), x.updateJobStep(N, {
          step: "finalize",
          status: "done",
          detail: U,
          llmResponse: JSON.stringify(G, null, 2)
        }), x.completeJob(N, U), Z(N, G.id), Sn(null), f({
          message: `${U} \uD30C\uC0DD\uBB38\uC81C \uCD94\uAC00`,
          durationMs: 2500
        }), await ot(), window.setTimeout(() => {
          kt(G.id);
        }, 80);
      } catch (R) {
        const U = (R instanceof Error ? R.message : "") || "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(N, U), Z(N, L), q("\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", R, "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Mo = i.useCallback((l, p) => {
      var _a2;
      const w = Qt[l.id], N = ((_a2 = l.options) == null ? void 0 : _a2.length) || 0;
      return w != null && w >= 1 && w <= N ? w : p != null && p >= 1 && p <= N ? p : 1;
    }, [
      Qt
    ]), Qs = async (l, p, w, N = "create") => {
      var _a2, _b;
      const L = p === l.answer, R = M.llmOpts;
      if (N === "followup") {
        const H = String(w || "").trim();
        if (!H) {
          f({
            message: "\uCD94\uAC00 \uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.",
            durationMs: 2200
          });
          return;
        }
        if (!await _(R)) return;
        const te = Ze(l.id, p), X = String(et.current[te] || "").trim();
        if (!X) {
          f({
            message: "\uBA3C\uC800 \uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uC138\uC694.",
            durationMs: 2200
          });
          return;
        }
        xe(te), (_a2 = je.current) == null ? void 0 : _a2.abort();
        const Pe = new AbortController();
        je.current = Pe;
        const Ce = H.slice(0, 60);
        try {
          const ze = await Kc({
            profiles: ye,
            question: l,
            selectedOption: p,
            existingAnalysis: X,
            userQuestion: H,
            ...R,
            signal: Pe.signal,
            onChunk: (Ko) => {
              const Vo = Ti(X, Ko);
              ke((Xo) => ({
                ...Xo,
                [te]: Vo
              }));
            }
          }), wt = _i(ze, Ce), Ho = Di(X, wt, Ce), An = {
            ...et.current,
            [te]: Ho
          };
          et.current = An, ke(An), Ue(null), await ot(An);
        } catch (ze) {
          if (Pe.signal.aborted) return;
          ke((wt) => ({
            ...wt,
            [te]: X
          })), q("\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328", ze, "\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328");
        } finally {
          xe(null);
        }
        return;
      }
      const U = Fi(w, L);
      if (!await _(R)) return;
      const G = Ze(l.id, p), Y = N === "regenerate" ? String(et.current[G] || "").trim() : "";
      xe(G), N !== "regenerate" && ke((H) => ({
        ...H,
        [G]: ""
      })), (_b = je.current) == null ? void 0 : _b.abort();
      const ee = new AbortController();
      je.current = ee;
      try {
        const H = await Hc({
          profiles: ye,
          question: l,
          selectedOption: p,
          userInstructions: U,
          ...R,
          signal: ee.signal,
          onChunk: (Pe) => {
            const Ce = N === "regenerate" ? qi(Y, Pe) : Pe;
            ke((ze) => ({
              ...ze,
              [G]: Ce
            }));
          }
        }), te = N === "regenerate" ? Bi(Y, H) : H, X = {
          ...et.current,
          [G]: te
        };
        et.current = X, ke(X), Ue(null), await ot(X);
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
    }, Ts = async (l) => {
      var _a2, _b, _c2;
      const p = j.config.sourcePaths.length, w = yr(j.config);
      if (!p) {
        pt(true), f({
          message: "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C\uB97C \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.",
          durationMs: 2800
        });
        return;
      }
      if (!w.length) {
        pt(true), f({
          message: "\uC0AC\uC6A9 \uC911\uC778 \uADFC\uAC70 \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uBC15\uC2A4\uB85C \uADFC\uAC70\uB97C \uD65C\uC131\uD654\uD558\uC138\uC694.",
          durationMs: 3200
        });
        return;
      }
      if (!await _()) return;
      xe("gen-sources"), (_a2 = je.current) == null ? void 0 : _a2.abort();
      const N = new AbortController();
      je.current = N;
      const L = x.createSourceJob({
        preview: ((_b = j.questions[0]) == null ? void 0 : _b.question) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C",
        topic: l
      }), R = L;
      try {
        const U = await ed({
          profiles: ye,
          config: j.config,
          sourcePaths: w,
          topic: l,
          kind: "choice",
          count: 1,
          exampleQuestions: j.questions,
          readText: V,
          signal: N.signal,
          onStep: (Ce) => ne(L, R, Ce)
        });
        if (!U.length) throw new Error("\uC0DD\uC131\uB41C \uBB38\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
        const G = Number.parseInt(ts(j.questions), 10) || 1, Y = Date.now(), ee = U.map((Ce, ze) => ({
          ...Ce,
          id: `gen-src-${Y}-${ze}`,
          displayLabel: String(G + ze),
          isGenerated: true,
          ...w.length ? {
            sourcePaths: [
              ...w
            ]
          } : {}
        })), H = (_c2 = ee[0]) == null ? void 0 : _c2.id, te = ee.map((Ce) => Ce.displayLabel).join(", "), X = H || L;
        x.updateJobStep(L, {
          step: "finalize",
          status: "running",
          detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026"
        }), Z(L, X);
        const Pe = [
          ...j.questions,
          ...ee
        ];
        ft("all"), H && Bt((Ce) => {
          const ze = {
            ...Ce
          };
          for (const wt of ee) ze[wt.id] = true;
          return ze;
        }), be({
          ...j,
          questions: Pe
        }), H && x.setJobResultQuestionId(L, H), x.updateJobStep(L, {
          step: "finalize",
          status: "done",
          detail: te,
          llmResponse: JSON.stringify(ee, null, 2)
        }), x.completeJob(L, te), Z(L, X), f({
          message: `\uADFC\uAC70 \uAE30\uBC18 \uBB38\uC81C ${ee.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        }), await ot(), H && window.setTimeout(() => {
          kt(H);
        }, 80);
      } catch (U) {
        if (N.signal.aborted) {
          x.failJob(L, "\uCDE8\uC18C\uB428"), Z(L, R);
          return;
        }
        const G = (U instanceof Error ? U.message : "") || "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(L, G), Z(L, R), q("\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", U, "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, _s = i.useRef(Ts);
    _s.current = Ts;
    const Ro = i.useCallback((l) => {
      _s.current(l);
    }, []), Ao = i.useCallback(async ({ instructions: l, form: p }) => {
      var _a2, _b;
      if (!he || !await _()) return null;
      (_a2 = je.current) == null ? void 0 : _a2.abort();
      const w = new AbortController();
      je.current = w;
      const N = Fr(p, he.displayLabel);
      N.id = he.id, N.displayLabel = he.displayLabel, he.similarOf && (N.similarOf = he.similarOf), he.isGenerated && (N.isGenerated = he.isGenerated);
      const L = Zt(j.config, N);
      try {
        const R = await rd({
          profiles: ye,
          question: N,
          config: j.config,
          userInstructions: l,
          sourcePaths: L,
          readText: V,
          signal: w.signal
        }), U = Te(N, j.config.choiceCount), G = {
          kind: R.kind,
          displayLabel: he.displayLabel,
          question: R.question,
          point: R.point,
          explanation: R.explanation,
          ...((_b = p.sourcePaths) == null ? void 0 : _b.length) ? {
            sourcePaths: p.sourcePaths
          } : {}
        };
        if (R.kind === "subjective") G.answerStyle = R.answerStyle === "essay" ? "essay" : "short", G.modelAnswer = R.modelAnswer || "";
        else {
          const Y = [
            ...R.options || []
          ];
          G.options = Ye(Y, U), G.answer = R.answer && R.answer >= 1 ? R.answer : 1;
        }
        return f({
          message: "\uBB38\uD56D\uC744 \uAD50\uC815\uD588\uC2B5\uB2C8\uB2E4. \uB0B4\uC6A9\uC744 \uD655\uC778\uD55C \uB4A4 \uC800\uC7A5\uD558\uC138\uC694.",
          durationMs: 3200
        }), G;
      } catch (R) {
        return w.signal.aborted || q("\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328", R, "\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328"), null;
      }
    }, [
      j.config,
      he,
      _,
      ye,
      V,
      q,
      f
    ]), Lo = i.useMemo(() => ({
      getPresignedUrl: o,
      currentNotePath: (r == null ? void 0 : r.id) ?? null,
      hydrationEnabled: d
    }), [
      r == null ? void 0 : r.id,
      d,
      o
    ]), Ds = i.useRef(Qs);
    Ds.current = Qs;
    const Fs = i.useRef(As);
    Fs.current = As;
    const qs = i.useRef(Ls);
    qs.current = Ls;
    const Bs = i.useRef(Kt);
    Bs.current = Kt;
    const In = i.useRef(ue);
    In.current = ue;
    const Mn = i.useRef(rt);
    Mn.current = rt;
    const Us = i.useRef(Os);
    Us.current = Os;
    const Oo = i.useCallback((l) => {
      Fs.current(l);
    }, []), Qo = i.useCallback((l, p) => {
      qs.current(l, p);
    }, []), To = i.useCallback((l) => {
      const p = Bs.current, w = In.current;
      !p || !w || Ds.current(p, w.option, l, w.mode);
    }, []), _o = i.useCallback(() => {
      const l = In.current;
      if (!l) return;
      const p = Ze(l.questionId, l.option);
      Ve !== p && Ue(null);
    }, [
      Ve
    ]), Do = i.useCallback(() => {
      const l = Mn.current;
      l && Ve === `derived-${l.id}` || Sn(null);
    }, [
      Ve
    ]), Fo = i.useCallback((l) => {
      const p = Mn.current;
      p && Us.current(p, l);
    }, []), qo = i.useCallback(() => ms(false), []), Bo = i.useCallback((l) => {
      ft("all"), kt(l);
    }, [
      kt
    ]), Uo = i.useCallback(() => {
      qt({
        paths: de.current.config.sourcePaths,
        scope: "file"
      });
    }, []), Go = i.useCallback(() => {
      xt(null);
    }, []);
    if (!c) return t.jsx("div", {
      className: "quiz-pane flex flex-1 items-center justify-center text-sm text-gray-400",
      children: "\uD0ED\uC744 \uC120\uD0DD\uD558\uBA74 \uD034\uC988\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4"
    });
    const Rn = J.total > 0 ? Math.round(J.answered / J.total * 100) : 0, Gs = J.total > 0 && !po, Ws = J.total > 0 && !xo, Wo = re.examInProgress, Jo = t.jsxs("div", {
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
    return t.jsx(wa, {
      value: Lo,
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
                      t.jsx(na, {
                        className: "shrink-0 text-blue-600",
                        size: 18
                      }),
                      t.jsx("span", {
                        className: "shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                        children: "\uD034\uC988 \uBAA8\uB4DC"
                      }),
                      J.total > 0 ? t.jsx("div", {
                        className: `${gr} flex-1`,
                        "aria-hidden": !Gs,
                        children: t.jsx(on, {
                          initial: false,
                          children: Gs ? t.jsxs(We.div, {
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
                    className: `${gr} shrink-0`,
                    "aria-hidden": !Ws,
                    children: t.jsx(on, {
                      initial: false,
                      children: Ws ? t.jsx(We.div, {
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
                        children: Jo
                      }, "quiz-header-score") : null
                    })
                  }) : null,
                  t.jsxs(ua, {
                    children: [
                      t.jsx(ma, {
                        asChild: true,
                        children: t.jsxs(D, {
                          type: "button",
                          variant: "secondary",
                          size: "sm",
                          children: [
                            t.jsx(Xs, {
                              size: 14
                            }),
                            "\uBB38\uC81C \uCD94\uAC00",
                            t.jsx(es, {
                              size: 14,
                              className: "opacity-70",
                              "aria-hidden": true
                            })
                          ]
                        })
                      }),
                      t.jsx(fa, {
                        children: t.jsxs(pa, {
                          className: zd,
                          sideOffset: 6,
                          align: "start",
                          children: [
                            t.jsxs(Zs, {
                              className: br,
                              onSelect: () => {
                                Ft(null), Dt(true);
                              },
                              children: [
                                t.jsx(pn, {
                                  size: 14,
                                  "aria-hidden": true
                                }),
                                "\uC9C1\uC811\uCD94\uAC00"
                              ]
                            }),
                            t.jsxs(Zs, {
                              className: br,
                              onSelect: () => jn(true),
                              children: [
                                t.jsx(sa, {
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
                    onClick: Is,
                    children: [
                      t.jsx(Mr, {
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
                      Io();
                    },
                    children: [
                      t.jsx(Ir, {
                        size: 14
                      }),
                      "\uC804\uCCB4 \uCC44\uC810"
                    ]
                  }),
                  t.jsxs(D, {
                    type: "button",
                    variant: Es.active > 0 ? "primary" : "secondary",
                    size: "sm",
                    "aria-pressed": _t,
                    onClick: () => {
                      pt((l) => (l && xt(null), !l));
                    },
                    children: [
                      t.jsx(Rr, {
                        size: 14
                      }),
                      "\uADFC\uAC70"
                    ]
                  }),
                  t.jsx(D, {
                    type: "button",
                    variant: wn ? "primary" : "tertiary",
                    size: "sm",
                    "aria-label": "\uBAA9\uCC28",
                    "aria-pressed": wn,
                    onClick: () => ms((l) => !l),
                    children: t.jsx(Ar, {
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
                    ref: gt,
                    className: "h-full min-h-0 overflow-y-auto px-4 py-4",
                    children: t.jsxs("div", {
                      className: "mx-auto max-w-3xl space-y-4",
                      children: [
                        t.jsx(hd, {
                          profiles: ye,
                          profileId: M.profileId,
                          model: M.model,
                          onProfileIdChange: M.onProfileIdChange,
                          onModelChange: M.onModelChange
                        }),
                        t.jsxs("div", {
                          className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface",
                          children: [
                            t.jsxs("div", {
                              ref: xs,
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
                                      ref: hs,
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
                                    className: `rounded-lg px-2.5 py-1 font-medium ${kn === l ? "bg-white shadow-sm dark:bg-odp-surface" : "text-slate-600 dark:text-odp-muted"}`,
                                    onClick: () => ft(l),
                                    children: p
                                  }, l))
                                })
                              ]
                            }),
                            t.jsx(fl, {
                              log: we
                            })
                          ]
                        }),
                        j.questions.length === 0 ? t.jsxs("div", {
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
                                  onClick: () => Dt(true),
                                  children: [
                                    t.jsx(Xs, {
                                      size: 14
                                    }),
                                    "\uBB38\uC81C \uCD94\uAC00"
                                  ]
                                }),
                                t.jsx(D, {
                                  type: "button",
                                  variant: "secondary",
                                  onClick: () => jn(true),
                                  children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"
                                })
                              ]
                            })
                          ]
                        }) : null,
                        j.questions.length > 0 ? t.jsx(Tl, {
                          ref: Cn,
                          questions: j.questions,
                          filter: kn,
                          scrollRef: gt,
                          userAnswers: se,
                          graded: ie,
                          subjGrades: me,
                          isSubmitted: pe,
                          expVisible: so,
                          wrongExpsByQuestion: go,
                          questionMemos: ae,
                          freshQuestionIds: io,
                          busyId: Ve,
                          examInProgress: Wo,
                          resolveWrongExpFocusOption: Mo,
                          onAnswerCommit: jo,
                          onSelectOption: yo,
                          onEditQuestion: Co,
                          onGradeChoice: vo,
                          onGradeSubjective: So,
                          onRetry: wo,
                          onToggleExplanation: No,
                          onSimilar: Oo,
                          onDerived: $o,
                          onGenerateSections: Qo,
                          onWrongExpFocusChange: Po,
                          onOpenAnalysisDock: bo,
                          onMemoSave: zo,
                          onClearFresh: Eo
                        }) : null
                      ]
                    })
                  })
                }),
                t.jsx(Ra, {
                  open: rt != null,
                  question: rt,
                  defaultChoiceCount: j.config.choiceCount || 4,
                  busy: rt != null && Ve === `derived-${rt.id}`,
                  onClose: Do,
                  onSubmit: Fo
                }),
                t.jsx(Bl, {
                  open: !!(ue && Kt),
                  question: Kt,
                  option: (ue == null ? void 0 : ue.option) ?? null,
                  mode: (ue == null ? void 0 : ue.mode) ?? "create",
                  existingAnalysis: ue && ue.mode === "followup" ? String(Oe[Ze(ue.questionId, ue.option)] || "") : "",
                  llmProfiles: ye,
                  profileId: M.profileId,
                  model: M.model,
                  onProfileIdChange: M.onProfileIdChange,
                  onModelChange: M.onModelChange,
                  busy: ue != null && Ve === Ze(ue.questionId, ue.option),
                  onClose: _o,
                  onGenerate: To
                }),
                t.jsx(mc, {
                  path: ro,
                  onClose: Go,
                  loadDocument: W,
                  onOpenDocument: T,
                  onOpenInNewTab: le
                }),
                t.jsx(oc, {
                  open: _t,
                  docConfig: j.config,
                  sourcePathUsage: Es,
                  busyGenSources: Ve === "gen-sources",
                  onClose: nt,
                  onPreview: He,
                  onRemove: uo,
                  onToggleEnabled: co,
                  onOpenPicker: Uo,
                  onGenerateFromTopic: Ro,
                  onDropHostChange: fo
                }),
                t.jsx(vc, {
                  open: wn,
                  questions: j.questions,
                  userAnswers: se,
                  gradedQuestions: ie,
                  isSubmitted: pe,
                  subjectiveGrades: me,
                  onClose: qo,
                  onNavigate: Bo
                })
              ]
            }),
            fs ? t.jsx(tl, {
              isOpen: fs,
              onClose: () => {
                Dt(false), Ft(null);
              },
              styleTemplate: ho,
              initial: he,
              nextLabel: ts(j.questions),
              onSubmit: (l) => {
                be(he ? {
                  ...j,
                  questions: j.questions.map((p) => p.id === he.id ? l : p)
                } : {
                  ...j,
                  questions: [
                    ...j.questions,
                    l
                  ]
                }), Ft(null);
              },
              onOpenSourcePicker: (l, p) => qt({
                paths: l,
                scope: "question",
                onDone: p
              }),
              ...he ? {
                onFixWithAi: Ao
              } : {}
            }) : null,
            ps ? t.jsx(ol, {
              isOpen: ps,
              onClose: () => jn(false),
              current: j,
              onApply: (l, p) => {
                be(l), p === "replace" && Is(), f({
                  message: `\uBB38\uC81C ${l.questions.length}\uAC1C \uC801\uC6A9`,
                  durationMs: 2500
                });
              }
            }) : null,
            Ge ? t.jsx(il, {
              isOpen: true,
              onClose: () => qt(null),
              tree: K,
              selected: Ge.paths,
              excludePath: (r == null ? void 0 : r.id) || null,
              onExpandFolder: Q,
              onDropHostChange: mo,
              onRegisterDropPathsMerge: (l) => {
                Ss.current = l;
              },
              onConfirm: (l) => {
                Ge.onDone ? Ge.onDone(l) : Ge.scope === "file" && be({
                  ...j,
                  config: {
                    ...j.config,
                    sourcePaths: l
                  }
                }), qt(null);
              }
            }) : null,
            t.jsx(Hn, {
              isOpen: oo,
              title: "\uC2DC\uD5D8 \uC2DC\uC791",
              message: "\uCD08\uAE30\uD654\uD558\uACE0 \uC2DC\uD5D8\uC744 \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
              confirmLabel: "\uC2DC\uC791",
              cancelLabel: "\uCDE8\uC18C",
              variant: "danger",
              onConfirm: () => {
                yn(false), ko();
              },
              onCancel: () => yn(false)
            }),
            t.jsx(Hn, {
              isOpen: ht != null,
              title: "\uADFC\uAC70 \uBB38\uC11C \uC81C\uAC70",
              message: ht ? `\u300C${ht}\u300D\uC744(\uB97C) \uD30C\uC77C \uADFC\uAC70\uC5D0\uC11C \uC81C\uAC70\uD560\uAE4C\uC694?` : "",
              confirmLabel: "\uC81C\uAC70",
              cancelLabel: "\uCDE8\uC18C",
              variant: "danger",
              onConfirm: () => {
                ht && Pn(ht), vn(null);
              },
              onCancel: () => vn(null)
            }),
            t.jsx(ul, {
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
  iu as default
};
